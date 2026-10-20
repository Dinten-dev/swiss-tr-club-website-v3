<?php
declare(strict_types=1);

namespace SwissTRClub\Core\Integrations\Fairgate;

/** Notifications are hints only. All values are re-read through the authenticated API. */
final class FairgateWebhook
{
    public const QUEUE = 'strc_fairgate_webhook_queue';
    public const STATUS = 'strc_fairgate_webhook_status';
    public const WORK = 'strc_fairgate_webhook_work';
    public const WATCH = 'strc_fairgate_webhook_watch';

    public function __construct(private readonly FairgateStagingImport $import) {}

    public static function enabled(): bool
    {
        return defined('STRC_FAIRGATE_WEBHOOK_ENABLED') && STRC_FAIRGATE_WEBHOOK_ENABLED === true
            && self::validKey(defined('STRC_FAIRGATE_WEBHOOK_SECRET') ? STRC_FAIRGATE_WEBHOOK_SECRET : '')
            && FairgateStagingImport::enabled();
    }

    public static function validKey(mixed $key): bool
    {
        return is_string($key) && preg_match('/^[a-f0-9]{64}$/D', $key) === 1;
    }

    public function registerHooks(): void
    {
        add_action('rest_api_init', function(): void {
            register_rest_route('strc/v1', '/fairgate/events/(?P<key>[a-f0-9]{64})', [
                'methods' => 'POST', 'permission_callback' => [$this, 'authorize'], 'callback' => [$this, 'receive'],
            ]);
        });
        add_filter('cron_schedules', static function(array $schedules): array {
            $schedules['strc_minute'] = ['interval' => 60, 'display' => 'STRC minute'];
            return $schedules;
        });
        add_action('init', static function(): void {
            if (self::enabled() && !wp_next_scheduled(self::WATCH)) wp_schedule_event(time() + 60, 'strc_minute', self::WATCH);
            if (!self::enabled()) {
                wp_clear_scheduled_hook(self::WATCH);
                wp_clear_scheduled_hook(self::WORK);
            }
        });
        add_action(self::WORK, [$this, 'process']);
        add_action(self::WATCH, [$this, 'process']);
    }

    public function authorize(\WP_REST_Request $request): bool|\WP_Error
    {
        // Read the route parameter only: query/body fields cannot replace the URL capability.
        $key = $request->get_url_params()['key'] ?? '';
        if (!self::enabled() || !self::validKey($key) || !hash_equals(STRC_FAIRGATE_WEBHOOK_SECRET, $key)) {
            return new \WP_Error('strc_webhook_forbidden', 'Forbidden', ['status' => 403]);
        }
        return true;
    }

    public function receive(\WP_REST_Request $request): \WP_REST_Response|\WP_Error
    {
        $allowed = $this->authorize($request);
        if (is_wp_error($allowed)) return $allowed;
        if (strlen($request->get_body()) > 65536) return new \WP_Error('strc_webhook_size', 'Payload too large', ['status' => 413]);
        try {
            self::locked(static function(): void {
                $queue = get_option(self::QUEUE, []);
                if (!is_array($queue)) $queue = [];
                $queue['revision'] = bin2hex(random_bytes(16));
                $queue['receivedAt'] = gmdate(DATE_ATOM);
                $queue['nextAt'] = max(time(), (int)($queue['nextAt'] ?? 0));
                $queue['attempts'] = (int)($queue['attempts'] ?? 0);
                if (!update_option(self::QUEUE, $queue, false)) throw new \RuntimeException('Queue unavailable');
                if (!wp_next_scheduled(self::WORK)) wp_schedule_single_event($queue['nextAt'], self::WORK);
                $status = get_option(self::STATUS, []);
                update_option(self::STATUS, ['lastReceivedAt' => $queue['receivedAt']] + (is_array($status) ? $status : []), false);
            });
        } catch (\Throwable) {
            return new \WP_Error('strc_webhook_busy', 'Please retry', ['status' => 503]);
        }
        // Close the response before dispatching an authenticated cron loopback.
        // The worker runs in cron context, never with the caller's permissions.
        add_action('shutdown', function(): void {
            if (function_exists('fastcgi_finish_request')) fastcgi_finish_request();
            if (!wp_doing_cron()) spawn_cron(time());
        }, 20);
        $response = new \WP_REST_Response(['accepted' => true], 202);
        $response->header('Cache-Control', 'no-store');
        $response->header('Referrer-Policy', 'no-referrer');
        return $response;
    }

    public function process(): void
    {
        if (!self::enabled() || !wp_doing_cron()) return;
        global $wpdb;
        $lock = 'strc-fairgate-webhook-worker';
        if ('1' !== (string)$wpdb->get_var($wpdb->prepare('SELECT GET_LOCK(%s, 0)', $lock))) return;
        try {
            $job = self::locked(static fn() => get_option(self::QUEUE, []));
            if (!is_array($job) || empty($job['revision']) || (int)($job['nextAt'] ?? 0) > time()) return;
            try {
                // No member accounts are created by a notification, and no webhook values are used.
                $result = $this->import->apply($this->import->fetch(), true);
                if (array_filter($result, static fn(array $r): bool => $r['action'] === 'error')) throw new \RuntimeException('Synchronization incomplete');
                self::locked(static function() use ($job, $result): void {
                    $current = get_option(self::QUEUE, []);
                    if (($current['revision'] ?? '') === $job['revision']) delete_option(self::QUEUE);
                    else if (is_array($current)) {
                        $current['attempts'] = 0;
                        $current['nextAt'] = time() + 30;
                        update_option(self::QUEUE, $current, false);
                        if (!wp_next_scheduled(self::WORK)) wp_schedule_single_event($current['nextAt'], self::WORK);
                    }
                    $status = get_option(self::STATUS, []);
                    update_option(self::STATUS, ['lastCompletedAt' => gmdate(DATE_ATOM), 'lastErrorAt' => null,
                        'updatedMembers' => count(array_filter($result, static fn(array $r): bool => $r['action'] === 'update'))]
                        + (is_array($status) ? $status : []), false);
                });
            } catch (\Throwable) {
                self::locked(static function() use ($job): void {
                    $current = get_option(self::QUEUE, $job);
                    if (!is_array($current)) $current = $job;
                    $current['attempts'] = min(10, (int)($current['attempts'] ?? 0) + 1);
                    $current['nextAt'] = time() + min(3600, 60 * (2 ** min(6, $current['attempts'] - 1)));
                    update_option(self::QUEUE, $current, false);
                    if (!wp_next_scheduled(self::WORK)) wp_schedule_single_event($current['nextAt'], self::WORK);
                    $status = get_option(self::STATUS, []);
                    update_option(self::STATUS, ['lastErrorAt' => gmdate(DATE_ATOM)] + (is_array($status) ? $status : []), false);
                });
            }
        } catch (\Throwable) {
            // Keep the persistent queue; the watchdog retries without disclosing payloads or secrets.
        } finally {
            $wpdb->get_var($wpdb->prepare('SELECT RELEASE_LOCK(%s)', $lock));
        }
    }

    public static function status(): array
    {
        $status = get_option(self::STATUS, []);
        $queue = get_option(self::QUEUE, []);
        return ['enabled' => self::enabled(), 'pending' => !empty($queue),
            'lastReceivedAt' => is_array($status) ? ($status['lastReceivedAt'] ?? null) : null,
            'lastCompletedAt' => is_array($status) ? ($status['lastCompletedAt'] ?? null) : null,
            'lastErrorAt' => is_array($status) ? ($status['lastErrorAt'] ?? null) : null,
            'updatedMembers' => is_array($status) ? (int)($status['updatedMembers'] ?? 0) : 0,
            'attempts' => is_array($queue) ? (int)($queue['attempts'] ?? 0) : 0];
    }

    private static function locked(callable $work): mixed
    {
        global $wpdb;
        $lock = 'strc-fairgate-webhook-queue';
        if ('1' !== (string)$wpdb->get_var($wpdb->prepare('SELECT GET_LOCK(%s, 1)', $lock))) throw new \RuntimeException('Queue busy');
        try {
            // Another request may have changed these options while this worker fetched contacts.
            wp_cache_delete(self::QUEUE, 'options');
            wp_cache_delete(self::STATUS, 'options');
            wp_cache_delete('notoptions', 'options');
            return $work();
        }
        finally { $wpdb->get_var($wpdb->prepare('SELECT RELEASE_LOCK(%s)', $lock)); }
    }
}

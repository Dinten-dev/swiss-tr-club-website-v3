<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Mail;

use SwissTRClub\Core\Members\MembershipRepository;
use SwissTRClub\Core\Forms\FormStore;

final class NewsletterEndpoint
{
    public function registerHooks(): void
    {
        add_action('wp_ajax_strc_newsletter', array($this, 'respond'));
        add_action('wp_ajax_nopriv_strc_newsletter', array($this, 'respond'));
        add_action('strc_newsletter_sync_pending', array($this, 'syncPending'));
        if (! wp_next_scheduled('strc_newsletter_sync_pending')) {
            wp_schedule_event(time() + 300, 'hourly', 'strc_newsletter_sync_pending');
        }
    }

    public function respond(): void
    {
        nocache_headers();
        $operationInput = wp_unslash($_REQUEST['operation'] ?? '');
        $operation = is_string($operationInput) ? sanitize_key($operationInput) : '';
        if ('confirm' === $operation || 'unsubscribe' === $operation) {
            $this->processLink($operation);
        }
        if ('subscribe' !== $operation || 'POST' !== ($_SERVER['REQUEST_METHOD'] ?? 'GET')) {
            wp_send_json_error(array('message' => 'Ungültige Anfrage.'), 400);
        }
        $origin = rtrim(sanitize_url(wp_unslash($_SERVER['HTTP_ORIGIN'] ?? '')), '/');
        $allowed = array(rtrim(home_url(), '/'));
        if (defined('STRC_FRONTEND_ORIGIN')) {
            $allowed[] = rtrim((string) STRC_FRONTEND_ORIGIN, '/');
        }
        if ($origin && ! in_array($origin, $allowed, true)) {
            wp_send_json_error(array('message' => 'Anfrage nicht erlaubt.'), 403);
        }
        $input = wp_unslash($_POST);
        if (! empty($input['website'])) {
            wp_send_json_success(array('message' => 'Bitte E-Mail prüfen und Anmeldung bestätigen.'));
        }
        $emailInput = $input['email'] ?? '';
        $nameInput = $input['name'] ?? '';
        $email = is_string($emailInput) ? sanitize_email($emailInput) : '';
        $name = is_string($nameInput) ? sanitize_text_field($nameInput) : '';
        $consent = $input['consent'] ?? '';
        if (! is_email($email) || mb_strlen($name) > 190 || ! is_string($consent) || '1' !== $consent) {
            wp_send_json_error(array('message' => 'Bitte E-Mail-Adresse und Einwilligung prüfen.'), 422);
        }
        $email = strtolower($email);
        $ip = sanitize_text_field(wp_unslash($_SERVER['REMOTE_ADDR'] ?? ''));
        foreach (array('email-' . $email, 'ip-' . $ip) as $key) {
            $transient = 'strc_newsletter_' . hash('sha256', $key);
            $count = (int) get_transient($transient);
            if ($count >= 5) {
                wp_send_json_error(array('message' => 'Bitte später erneut versuchen.'), 429);
            }
            set_transient($transient, $count + 1, HOUR_IN_SECONDS);
        }

        global $wpdb;
        $table = $wpdb->prefix . 'strc_newsletter_subscribers';
        $token = bin2hex(random_bytes(32));
        $unsubscribe = bin2hex(random_bytes(32));
        $userId = 0;
        $user = get_user_by('email', $email);
        if ($user) {
            $membership = (new MembershipRepository())->findForUser((int) $user->ID);
            if ($membership && 'active' === ($membership['status'] ?? '')) {
                $userId = (int) $user->ID;
            }
        }
        $request = array(
            'user_id' => $userId ?: null,
            'display_name' => $name,
            'confirmation_hash' => hash('sha256', $token),
            'unsubscribe_hash' => hash('sha256', $unsubscribe),
            'requested_at' => current_time('mysql'),
        );
        try {
            $send = FormStore::locked('newsletter-' . $email, static function () use ($wpdb, $table, $email, $request): bool {
                $existing = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$table} WHERE email = %s", $email), ARRAY_A);
                // An unverified request never changes an effective consent, name or unsubscribe token.
                if ($existing && $existing['status'] === 'confirmed') return false;
                if ($existing && !in_array($existing['status'], ['pending', 'unsubscribed'], true)) throw new \RuntimeException('Unknown newsletter state.');
                $pending = wp_json_encode($request);
                if ($existing) {
                    $saved = $wpdb->update($table, ['pending_request' => $pending], ['id' => (int) $existing['id']]);
                } else {
                    $saved = $wpdb->insert($table, array_merge($request, [
                        'email' => $email, 'status' => 'pending', 'confirmation_hash' => null,
                        'pending_request' => $pending, 'consent_source' => 'website-form',
                        'confirmed_at' => null, 'unsubscribed_at' => null,
                        'brevo_status' => 'idle', 'brevo_attempts' => 0, 'brevo_updated_at' => null,
                    ]));
                }
                if ($saved === false) throw new \RuntimeException('Newsletter request could not be saved.');
                return true;
            });
        } catch (\RuntimeException $e) {
            wp_send_json_error(array('message' => 'Anmeldung konnte nicht gespeichert werden. Bitte erneut versuchen.'), 503);
        }
        if (!$send) wp_send_json_success(array('message' => 'Bitte bestätige deine Anmeldung über den Link in der E-Mail.'));

        $confirmUrl = add_query_arg(array('action' => 'strc_newsletter', 'operation' => 'confirm', 'email' => $email, 'token' => $token), admin_url('admin-ajax.php'));
        $unsubscribeUrl = add_query_arg(array('action' => 'strc_newsletter', 'operation' => 'unsubscribe', 'email' => $email, 'token' => $unsubscribe), admin_url('admin-ajax.php'));
        $subject = 'Bitte bestätige deine Anmeldung zum Swiss TR-Club Newsletter';
        $body = '<p>Guten Tag' . ($name ? ' ' . esc_html($name) : '') . ',</p><p>Du hast dich für den Newsletter des Swiss TR-Club angemeldet. Bitte bestätige deine Anmeldung:</p><p><a href="' . esc_url($confirmUrl) . '">Newsletter-Anmeldung bestätigen</a></p><p>Die Bestätigung ist einmalig und kann jederzeit widerrufen werden. Falls du dich nicht angemeldet hast, kannst du diese Nachricht ignorieren.</p><p><a href="' . esc_url($unsubscribeUrl) . '">Anmeldung widerrufen</a></p>';
        \SwissTRClub\Core\Mail\MailLog::context('Newsletter: Bestätigung');
        if (! wp_mail($email, $subject, $body, array('Content-Type: text/html; charset=UTF-8'))) {
            wp_send_json_error(array('message' => 'Bestätigungsnachricht konnte nicht versendet werden. Bitte später erneut versuchen.'), 503);
        }
        wp_send_json_success(array('message' => 'Bitte bestätige deine Anmeldung über den Link in der E-Mail.'));
    }

    private function processLink(string $operation): never
    {
        global $wpdb;
        $emailInput = wp_unslash($_GET['email'] ?? '');
        $tokenInput = wp_unslash($_GET['token'] ?? '');
        $email = is_string($emailInput) ? strtolower(sanitize_email($emailInput)) : '';
        $token = is_string($tokenInput) ? sanitize_text_field($tokenInput) : '';
        $table = $wpdb->prefix . 'strc_newsletter_subscribers';
        if (! is_email($email) || ! preg_match('/^[a-f0-9]{64}$/D', $token)) {
            $this->redirect('invalid');
        }
        $hash = hash('sha256', $token);
        try {
            $result = FormStore::locked('newsletter-' . $email, function () use ($wpdb, $table, $email, $operation, $hash): string {
                $row = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$table} WHERE email = %s", $email), ARRAY_A);
                if (!$row) return 'invalid';
                $request = $this->pendingRequest($row);
                // Legacy pending confirmation links remain valid until replaced or withdrawn.
                if (!$request && empty($row['pending_request']) && $row['status'] === 'pending') $request = $row;
                if ($operation === 'confirm' && in_array($row['status'], ['pending', 'unsubscribed'], true)
                    && $request && hash_equals((string) $request['confirmation_hash'], $hash)) {
                    $removing = $row['brevo_status'] === 'remove_pending';
                    $saved = $wpdb->update($table, [
                        'status' => 'confirmed', 'confirmation_hash' => null, 'pending_request' => null,
                        'user_id' => $request['user_id'], 'display_name' => $request['display_name'],
                        'unsubscribe_hash' => $request['unsubscribe_hash'], 'requested_at' => $request['requested_at'],
                        'consent_source' => 'website-form', 'confirmed_at' => current_time('mysql'), 'unsubscribed_at' => null,
                        // Complete a queued removal before adding the newly confirmed subscription.
                        'brevo_status' => $removing ? 'remove_pending' : 'pending',
                        'brevo_attempts' => $removing ? (int) $row['brevo_attempts'] : 0,
                    ], ['id' => (int) $row['id']]);
                    return $saved === false ? 'invalid' : 'confirmed';
                }
                if ($operation === 'unsubscribe' && in_array($row['status'], ['pending', 'confirmed', 'unsubscribed'], true)
                    && (hash_equals((string) $row['unsubscribe_hash'], $hash) || ($request && hash_equals((string) $request['unsubscribe_hash'], $hash)))) {
                    $values = ['confirmation_hash' => null, 'pending_request' => null];
                    if ($row['status'] !== 'unsubscribed') $values += [
                        'status' => 'unsubscribed', 'unsubscribed_at' => current_time('mysql'),
                        'brevo_status' => 'remove_pending', 'brevo_attempts' => 0,
                    ];
                    $saved = $wpdb->update($table, $values, ['id' => (int) $row['id']]);
                    return $saved === false ? 'invalid' : 'unsubscribed';
                }
                return 'invalid';
            });
        } catch (\RuntimeException $e) {
            $this->redirect('invalid');
        }
        if ($result !== 'invalid') wp_schedule_single_event(time() + 15, 'strc_newsletter_sync_pending');
        $this->redirect($result);
    }

    private function pendingRequest(array $row): ?array
    {
        $request = json_decode((string) ($row['pending_request'] ?? ''), true);
        if (!is_array($request)) return null;
        foreach (['confirmation_hash', 'unsubscribe_hash'] as $key) {
            if (!is_string($request[$key] ?? null) || !preg_match('/^[a-f0-9]{64}$/D', $request[$key])) return null;
        }
        if (!array_key_exists('user_id', $request) || ($request['user_id'] !== null && (!is_int($request['user_id']) || $request['user_id'] < 1))
            || !is_string($request['display_name'] ?? null) || mb_strlen($request['display_name']) > 190
            || !is_string($request['requested_at'] ?? null) || !preg_match('/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/D', $request['requested_at'])) return null;
        return $request;
    }

    private function redirect(string $status): never
    {
        wp_safe_redirect(add_query_arg('newsletter', $status, home_url('/')));
        exit;
    }

    public function syncPending(): void
    {
        $apiKey = defined('STRC_BREVO_API_KEY') ? (string) STRC_BREVO_API_KEY : (string) getenv('STRC_BREVO_API_KEY');
        $listId = defined('STRC_BREVO_LIST_ID') ? absint(STRC_BREVO_LIST_ID) : absint(getenv('STRC_BREVO_LIST_ID'));
        if ('' === $apiKey || $listId < 1) {
            return;
        }
        global $wpdb;
        $table = $wpdb->prefix . 'strc_newsletter_subscribers';
        $rows = $wpdb->get_results("SELECT id, email FROM {$table} WHERE (status = 'confirmed' AND brevo_status = 'pending') OR brevo_status = 'remove_pending' ORDER BY id ASC LIMIT 25", ARRAY_A);
        foreach (is_array($rows) ? $rows : array() as $row) {
            $email = strtolower(sanitize_email((string) $row['email']));
            try {
                // Serialise workers separately: remote I/O must never block a consent link.
                FormStore::locked('newsletter-sync-' . $email, static function () use ($wpdb, $table, $row, $email, $apiKey, $listId): void {
                    $row = FormStore::locked('newsletter-' . $email, static fn() => $wpdb->get_row($wpdb->prepare("SELECT * FROM {$table} WHERE id = %d AND email = %s", $row['id'], $email), ARRAY_A));
                    if (!$row || !($row['brevo_status'] === 'remove_pending' || ($row['status'] === 'confirmed' && $row['brevo_status'] === 'pending'))) return;
                    $remove = $row['brevo_status'] === 'remove_pending';
                    $path = $remove ? '/v3/contacts/lists/' . $listId . '/contacts/remove' : '/v3/contacts';
                    $body = $remove ? array('emails' => array($email)) : array('email' => $email, 'listIds' => array($listId), 'updateEnabled' => true);
                    $response = wp_remote_post('https://api.brevo.com' . $path, array(
                        'timeout' => 12,
                        'headers' => array('api-key' => $apiKey, 'Content-Type' => 'application/json', 'Accept' => 'application/json'),
                        'body' => wp_json_encode($body),
                    ));
                    $code = is_wp_error($response) ? 0 : (int) wp_remote_retrieve_response_code($response);
                    FormStore::locked('newsletter-' . $email, static fn() => $wpdb->update($table, array(
                        'brevo_status' => $code >= 200 && $code < 300 ? ($remove ? ($row['status'] === 'confirmed' ? 'pending' : 'removed') : 'synced') : $row['brevo_status'],
                        'brevo_attempts' => (int) $row['brevo_attempts'] + 1,
                        'brevo_updated_at' => current_time('mysql'),
                    ), array('id' => (int) $row['id'], 'status' => $row['status'], 'brevo_status' => $row['brevo_status'], 'brevo_attempts' => (int) $row['brevo_attempts'])));
                    if ($remove && $row['status'] === 'confirmed' && $code >= 200 && $code < 300) wp_schedule_single_event(time() + 15, 'strc_newsletter_sync_pending');
                });
            } catch (\RuntimeException $e) {
                // A concurrent consent operation owns the lock; retain the queue for a later run.
                continue;
            }
        }
    }
}

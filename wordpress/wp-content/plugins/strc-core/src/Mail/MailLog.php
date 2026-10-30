<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Mail;

use SwissTRClub\Core\Forms\FormStore;

/**
 * Versandprotokoll (Entscheid Redaktion 29.10.2026): Datum, Art, Empfänger und Erfolg/Fehler – keine Inhalte.
 * Einträge werden nach 90 Tagen gelöscht; sichtbar nur für STRC-Admin und Superadmin.
 */
final class MailLog
{
    public const OPTION = 'strc_mail_log';
    private const DAYS = 90;
    private const MAX = 3000;
    private static string $context = '';
    private static float $contextAt = 0.0;

    public function registerHooks(): void
    {
        add_action('wp_mail_succeeded', array($this, 'succeeded'));
        add_action('wp_mail_failed', array($this, 'failed'));
        add_action('strc_mail_log_prune', array(self::class, 'prune'));
        add_action('init', static function (): void {
            if (! wp_next_scheduled('strc_mail_log_prune')) wp_schedule_event(time() + HOUR_IN_SECONDS, 'daily', 'strc_mail_log_prune');
        });
    }

    /** Art der nächsten Mail festlegen (Vorlagenschlüssel oder Bezeichnung). Gilt für genau einen Versand. */
    public static function context(string $context): void
    {
        self::$context = $context;
        self::$contextAt = microtime(true);
    }

    public function succeeded(array $mail): void
    {
        $this->write($mail['to'] ?? array(), 'ok', '');
    }

    public function failed($error): void
    {
        $data = $error instanceof \WP_Error ? (array) $error->get_error_data() : array();
        // Transport errors may contain message contents or credentials; never persist them here.
        $this->write($data['to'] ?? array(), 'failed', 'Der Maildienst hat den Versand nicht bestätigt.');
    }

    private function write($to, string $status, string $error): void
    {
        $recipients = array_values(array_filter(array_map(static fn ($address): string => sanitize_email(is_string($address) ? (string) preg_replace('/^.*<([^>]+)>.*$/', '$1', $address) : ''), is_array($to) ? $to : explode(',', (string) $to))));
        $context = microtime(true) - self::$contextAt < 5 ? self::$context : '';
        self::$context = '';
        $art = $context !== '' ? (isset(MailTemplates::registry()[$context]) ? MailTemplates::label($context) : $context) : 'Andere Systemmail';
        $row = array('at' => gmdate(DATE_ATOM), 'type' => $art, 'to' => implode(', ', $recipients), 'status' => $status, 'error' => $error);
        self::change(static function (array $log) use ($row): array { array_unshift($log, $row); return array_slice($log, 0, self::MAX); });
    }

    private static function fresh(array $log): array
    {
        $limit = time() - self::DAYS * DAY_IN_SECONDS;
        return array_values(array_filter($log, static fn ($row): bool => is_array($row) && strtotime((string) ($row['at'] ?? '')) >= $limit));
    }

    public static function prune(): void
    {
        self::change(static fn (array $log): array => $log);
    }

    private static function change(callable $change): void
    {
        try {
            FormStore::locked('mail-log', static function () use ($change): void {
                wp_cache_delete(self::OPTION, 'options');
                wp_cache_delete('alloptions', 'options');
                $log = get_option(self::OPTION, array());
                update_option(self::OPTION, self::fresh($change(is_array($log) ? $log : array())), false);
            });
        } catch (\Throwable) {
            // A logging failure must never turn a successful send into a retry/duplicate.
            error_log('STRC mail log could not be updated.');
        }
    }

    /** Neueste Einträge, optional gefiltert nach Empfänger oder Art. */
    public static function entries(string $search = '', int $limit = 200): array
    {
        $log = get_option(self::OPTION, array());
        $log = is_array($log) ? self::fresh($log) : array();
        $search = mb_strtolower(trim($search));
        if ($search !== '') $log = array_values(array_filter($log, static fn ($row): bool => str_contains(mb_strtolower(($row['to'] ?? '') . ' ' . ($row['type'] ?? '')), $search)));
        return array_slice($log, 0, $limit);
    }
}

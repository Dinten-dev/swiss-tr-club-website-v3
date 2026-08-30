<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Mail;

final class BulkMailer
{
    public const CRON_HOOK = 'strc_process_bulk_mail';

    public function registerHooks(): void
    {
        add_action(self::CRON_HOOK, array($this, 'processQueue'));
    }

    public function queue(string $subject, string $body, int $createdBy): int
    {
        global $wpdb;

        $wpdb->insert(
            $wpdb->prefix . 'strc_mailings',
            array('subject' => $subject, 'body' => $body, 'status' => 'queued', 'created_by' => $createdBy, 'created_at' => current_time('mysql')),
            array('%s', '%s', '%s', '%d', '%s')
        );
        $mailingId = (int) $wpdb->insert_id;
        $memberships = $wpdb->prefix . 'strc_memberships';
        $users = $wpdb->get_results(
            "SELECT u.ID, u.user_email FROM {$wpdb->users} u
             INNER JOIN {$memberships} m ON m.user_id = u.ID
             WHERE m.status = 'active' ORDER BY u.ID ASC"
        );

        foreach ($users as $user) {
            if (! is_email($user->user_email)) {
                continue;
            }
            $wpdb->insert(
                $wpdb->prefix . 'strc_mailing_recipients',
                array('mailing_id' => $mailingId, 'user_id' => $user->ID, 'email' => $user->user_email, 'status' => 'queued'),
                array('%d', '%d', '%s', '%s')
            );
        }

        if (! wp_next_scheduled(self::CRON_HOOK)) {
            wp_schedule_single_event(time() + 5, self::CRON_HOOK);
        }

        return $mailingId;
    }

    public function processQueue(): void
    {
        global $wpdb;

        $table = $wpdb->prefix . 'strc_mailing_recipients';
        $mailings = $wpdb->prefix . 'strc_mailings';
        $rows = $wpdb->get_results(
            "SELECT r.*, m.subject, m.body FROM {$table} r
             INNER JOIN {$mailings} m ON m.id = r.mailing_id
             WHERE r.status = 'queued' ORDER BY r.id ASC LIMIT 20",
            ARRAY_A
        );

        foreach ($rows as $row) {
            $sent = wp_mail((string) $row['email'], (string) $row['subject'], wpautop((string) $row['body']), array('Content-Type: text/html; charset=UTF-8'));
            $wpdb->update(
                $table,
                array('status' => $sent ? 'sent' : 'failed', 'attempts' => (int) $row['attempts'] + 1, 'sent_at' => $sent ? current_time('mysql') : null, 'last_error' => $sent ? '' : 'wp_mail failed'),
                array('id' => (int) $row['id']),
                array('%s', '%d', '%s', '%s'),
                array('%d')
            );
        }

        $remaining = (int) $wpdb->get_var("SELECT COUNT(*) FROM {$table} WHERE status = 'queued'");
        if ($remaining > 0) {
            wp_schedule_single_event(time() + 60, self::CRON_HOOK);
        }
    }
}

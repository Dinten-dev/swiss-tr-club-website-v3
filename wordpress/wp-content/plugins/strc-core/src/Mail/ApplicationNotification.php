<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Mail;

use SwissTRClub\Core\Forms\FormStore;
use SwissTRClub\Core\Members\ApplicationAdmission;

/** Intake notification only; never approves applicants or writes to Fairgate. */
final class ApplicationNotification
{
    public const META_KEY = 'strc_application_notification';
    private const CRON_HOOK = 'strc_application_notify';

    private static function recipient(): string
    {
        // Entscheid Redaktion 1.11.2026: neue Anträge gehen an den Aktuar.
        $recipient = sanitize_email(\SwissTRClub\Core\Members\MembershipFee::aktuar());
        return is_email($recipient) ? $recipient : '';
    }

    public function registerHooks(): void
    {
        add_action('strc_application_received', [$this, 'enqueue']);
        add_action(self::CRON_HOOK, [$this, 'notify']);
        add_action('admin_post_strc_application_notify', [$this, 'retry']);
    }

    public static function status(int $id): array
    {
        $value = get_post_meta($id, self::META_KEY, true);
        return is_array($value) ? $value : [];
    }

    private function save(int $id, array $status): void
    {
        if (self::status($id) !== $status && !update_post_meta($id, self::META_KEY, $status)) {
            throw new \RuntimeException('Benachrichtigungsstatus konnte nicht gespeichert werden.');
        }
    }

    public function enqueue(int $id): void
    {
        try {
            FormStore::locked('application-notification-'.$id, function () use ($id): void {
                ApplicationAdmission::record($id);
                $status = self::status($id);
                if (!$status) {
                    $status = ['state'=>'pending', 'recipient'=>self::recipient(), 'attempts'=>0, 'createdAt'=>gmdate(DATE_ATOM)];
                    $this->save($id, $status);
                }
                if ($status['state'] === 'pending' && !wp_next_scheduled(self::CRON_HOOK, [$id])) {
                    wp_schedule_single_event(time()+60, self::CRON_HOOK, [$id]);
                }
            });
            // Cron remains as a fallback if the intake request stops before this call.
            $this->notify($id);
        } catch (\Throwable $error) {
            error_log('STRC application notification #'.$id.' requires review.');
        }
    }

    public function notify(int $id): void
    {
        try {
            FormStore::locked('application-notification-'.$id, function () use ($id): void {
                $post = ApplicationAdmission::record($id);
                $status = self::status($id);
                if (($status['state'] ?? '') === 'sending') {
                    $status['state'] = 'uncertain';
                    $this->save($id, $status);
                    return; // Never replay an interrupted mail automatically.
                }
                if (($status['state'] ?? '') !== 'pending') return;
                $data = FormStore::data($post);
                $payload = $data['payload'] ?? [];
                if (!is_array($payload) || empty($payload['person'])) throw new \RuntimeException('Antragsdaten fehlen.');
                $recipient = self::recipient();
                if ($recipient === '') {
                    $status['state'] = 'failed';
                    $status['lastError'] = 'Keine gültige Administrator-E-Mail konfiguriert.';
                    $this->save($id, $status);
                    wp_clear_scheduled_hook(self::CRON_HOOK, [$id]);
                    return;
                }
                $base = rtrim(defined('STRC_FRONTEND_ORIGIN') ? STRC_FRONTEND_ORIGIN : home_url(), '/');
                $mail = \SwissTRClub\Core\Mail\MailTemplates::render('internal.application', 'de', array('link' => $base . '/#antraege'));
                $body = $mail['body'] . "\n";
                $headers = ['Content-Type: text/plain; charset=UTF-8', 'From: Swiss TR-Club <no-reply@swisstrclub.ch>'];
                $status['state'] = 'sending';
                $status['attempts'] = (int)($status['attempts'] ?? 0)+1;
                $status['attemptedAt'] = gmdate(DATE_ATOM);
                $status['payloadHash'] = hash('sha256', wp_json_encode($payload));
                $this->save($id, $status); // Persist before invoking the transport.
                try {
                    \SwissTRClub\Core\Mail\MailLog::context('internal.application');
                    $accepted = wp_mail($recipient, $mail['subject'], $body, $headers);
                    $status['state'] = $accepted ? 'accepted' : 'failed';
                    if ($accepted) $status['acceptedAt'] = gmdate(DATE_ATOM);
                } catch (\Throwable $error) {
                    $status['state'] = 'uncertain';
                }
                $this->save($id, $status);
                wp_clear_scheduled_hook(self::CRON_HOOK, [$id]);
            });
        } catch (\Throwable $error) {
            error_log('STRC application notification #'.$id.' requires review.');
        }
    }

    public function retry(): void
    {
        if (!current_user_can('strc_manage_members')) wp_die('Kein Zugriff.', '', ['response'=>403]);
        if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') wp_die('Bitte das Formular verwenden.', '', ['response'=>405]);
        $id = absint($_POST['id'] ?? 0);
        check_admin_referer('strc_application_notify_'.$id);
        try {
            FormStore::locked('application-notification-'.$id, function () use ($id): void {
                ApplicationAdmission::record($id);
                $status = self::status($id);
                $state = $status['state'] ?? '';
                if (!in_array($state, ['', 'failed', 'uncertain'], true)) throw new \RuntimeException('Die Benachrichtigung wurde bereits versandt oder wird verarbeitet.');
                if ($state === 'uncertain' && ($_POST['confirm_resend'] ?? '') !== '1') throw new \RuntimeException('Bitte zuerst den bisherigen Versand prüfen und den erneuten Versand bestätigen.');
                $status = array_merge($status, ['state'=>'pending', 'recipient'=>self::recipient(), 'requestedAt'=>gmdate(DATE_ATOM), 'requestedBy'=>get_current_user_id()]);
                $this->save($id, $status);
            });
            $this->enqueue($id);
        } catch (\Throwable $error) {
            wp_die(esc_html($error->getMessage()));
        }
        wp_safe_redirect(admin_url('admin.php?page=strc-forms'));
        exit;
    }

    public static function renderStatus(int $id): void
    {
        if (!current_user_can('strc_manage_members')) return;
        $status = self::status($id);
        $state = $status['state'] ?? '';
        $labels = ['pending'=>'Versand ausstehend', 'sending'=>'Versand läuft / Ergebnis prüfen', 'accepted'=>'Vom Maildienst angenommen; Posteingang nicht bestätigt', 'failed'=>'Versand fehlgeschlagen', 'uncertain'=>'Versandergebnis unklar'];
        echo '<p>Benachrichtigung an '.esc_html(self::recipient() ?: 'Keine gültige Administrator-E-Mail konfiguriert').': '.esc_html($labels[$state] ?? 'Noch nicht versandt').'</p>';
        if (!empty($status['attemptedAt'])) echo '<p>Letzter Versandversuch: '.esc_html($status['attemptedAt']).'</p>';
        if (!in_array($state, ['', 'failed', 'uncertain'], true)) return;
        echo '<form method="post" action="'.esc_url(admin_url('admin-post.php')).'">';
        wp_nonce_field('strc_application_notify_'.$id);
        echo '<input type="hidden" name="action" value="strc_application_notify"><input type="hidden" name="id" value="'.$id.'">';
        if ($state === 'uncertain') echo '<p><label><input type="checkbox" name="confirm_resend" value="1" required> Bisherigen Versand geprüft; möglichen Doppelversand bestätigen.</label></p>';
        echo '<button class="button">'.($state === '' ? 'Benachrichtigung senden' : 'Benachrichtigung erneut senden').'</button></form>';
    }
}

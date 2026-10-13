<?php
declare(strict_types=1);
namespace SwissTRClub\Core\Admin;

use SwissTRClub\Core\Members\MemberSetupPreparation;

final class MemberSetupPage
{
    public function __construct(private readonly MemberSetupPreparation $preparation) {}

    public function registerHooks(): void
    {
        add_action('admin_menu', function (): void {
            add_submenu_page('strc-club', 'Website-Einrichtung', 'Website-Einrichtung', 'strc_manage_platform', 'strc-member-setup', [$this,'render']);
        });
        add_action('admin_post_strc_prepare_member_setup', [$this,'handle']);
    }

    public function handle(): void
    {
        MemberSetupPreparation::guard();
        if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') wp_die('Bitte das Formular verwenden.', '', ['response'=>405]);
        check_admin_referer('strc_prepare_member_setup');
        try {
            $result = $this->preparation->prepare();
            $notice = $result['summary']['addresses'].' persönliche E-Mail-Adressen vorbereitet. Es wurden keine E-Mails versandt und keine Passwortlinks erzeugt.';
        } catch (\Throwable $error) {
            $notice = 'Vorbereitung fehlgeschlagen. Fairgate-Verbindung und Mitgliedszuordnung prüfen; die bisherige Vorschau bleibt erhalten.';
        }
        set_transient('strc_setup_notice_'.get_current_user_id(), $notice, 120);
        wp_safe_redirect(admin_url('admin.php?page=strc-member-setup'));
        exit;
    }

    public function render(): void
    {
        MemberSetupPreparation::guard();
        nocache_headers();
        $draft = get_option(MemberSetupPreparation::OPTION, []);
        echo '<div class="wrap"><h1>Website-Einrichtung für Mitglieder</h1><div class="notice notice-info inline"><p><strong>Versand gesperrt.</strong> Diese Seite bereitet ausschliesslich die Empfängerliste und Mailtexte vor. Persönliche Passwortlinks werden erst beim später freigegebenen Versand erstellt.</p></div>';
        $notice = get_transient('strc_setup_notice_'.get_current_user_id());
        if ($notice) {
            delete_transient('strc_setup_notice_'.get_current_user_id());
            echo '<div class="notice notice-info"><p>'.esc_html($notice).'</p></div>';
        }
        echo '<p>Gewünschter Absender: <strong>'.esc_html($draft['sender'] ?? 'no-reply@swisstrclub.ch').'</strong> · Swiss TR-Club. Absender und SMTP-Versand müssen vor Freigabe eingerichtet und geprüft werden.</p><p>Die persönliche Primäradresse wird aus Fairgate gelesen und gegen das bereits verknüpfte aktive Website-Konto geprüft. Fehlende Adressen, Firmenkontakte und unklare Zuordnungen werden zurückgehalten. Fairgate-Passwörter bleiben unverändert.</p>';
        echo '<form method="post" action="'.esc_url(admin_url('admin-post.php')).'">';
        wp_nonce_field('strc_prepare_member_setup');
        echo '<input type="hidden" name="action" value="strc_prepare_member_setup"><button class="button button-primary">Empfängervorschau aus Fairgate aktualisieren</button></form>';
        if ($draft) {
            echo '<h2>Vorbereitete Empfänger</h2><p>'.esc_html($draft['createdAt']).' · '.esc_html((string)$draft['summary']['addresses']).' persönliche Adressen · '.esc_html((string)$draft['summary']['ready']).' mit bestätigter Mail-Sprache DE/FR.</p>';
            echo '<table class="widefat striped"><thead><tr><th scope="col">Name</th><th scope="col">Persönliche E-Mail</th><th scope="col">Sprache</th><th scope="col">Vorbereitung</th></tr></thead><tbody>';
            foreach ($draft['recipients'] as $row) {
                echo '<tr><td>'.esc_html($row['name']).'</td><td>'.esc_html($row['email']).'</td><td>'.esc_html(strtoupper($row['language']) ?: 'Offen').'</td><td>'.esc_html($row['ready'] ? 'Vorbereitet – noch nicht versandt' : $row['reviewReason']).'</td></tr>';
            }
            echo '</tbody></table>';
            if ($draft['review']) {
                echo '<h2>Noch zu klären</h2><table class="widefat striped"><thead><tr><th scope="col">Name</th><th scope="col">Fairgate-ID</th><th scope="col">Hinweis</th></tr></thead><tbody>';
                foreach ($draft['review'] as $row) echo '<tr><td>'.esc_html($row['name']).'</td><td>'.esc_html($row['contactId']).'</td><td>'.esc_html($row['reason']).'</td></tr>';
                echo '</tbody></table>';
            }
        }
        echo '<h2>Mailvorschau</h2><p>Die Vorschau enthält Platzhalter. Es gibt noch keine gültigen Einrichtungslinks; sie würden sonst vor dem Start ablaufen. Jede spätere Nachricht wird einzeln adressiert.</p>';
        foreach (['de'=>'Deutsch', 'fr'=>'Français'] as $language=>$label) {
            $mail = MemberSetupPreparation::template($language);
            echo '<details><summary>'.esc_html($label).'</summary><h3>'.esc_html($mail['subject']).'</h3><pre style="white-space:pre-wrap;max-width:80ch">'.esc_html($mail['body']).'</pre></details>';
        }
        echo '<p><button class="button" type="button" disabled>Versand noch nicht freigegeben</button></p></div>';
    }
}

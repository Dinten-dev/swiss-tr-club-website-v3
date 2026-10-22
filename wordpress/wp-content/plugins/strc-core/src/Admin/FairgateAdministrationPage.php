<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Admin;

use SwissTRClub\Core\Integrations\Fairgate\FairgateConfiguration;
use SwissTRClub\Core\Integrations\Fairgate\FairgateGateway;
use SwissTRClub\Core\Integrations\Fairgate\FairgateMemberSync;
use SwissTRClub\Core\Integrations\Fairgate\FairgateApplicationSettings;

final class FairgateAdministrationPage
{
    public function __construct(private readonly FairgateConfiguration $configuration, private readonly FairgateGateway $gateway, private readonly FairgateMemberSync $sync)
    {
    }

    public function registerHooks(): void
    {
        add_action('admin_menu', array($this, 'registerMenu'));
        add_action('admin_post_strc_fairgate_check', array($this, 'handle'));
    }

    public function registerMenu(): void
    {
        add_menu_page(
            __('STRC Clubverwaltung', 'strc-core'),
            __('Clubverwaltung', 'strc-core'),
            // Mitgliederverwaltung (fachlich) oder Webmaster (technischer Abgleich).
            current_user_can('strc_manage_members') ? 'strc_manage_members' : 'strc_manage_platform',
            'strc-club',
            array($this, 'render'),
            'dashicons-groups',
            3
        );
    }

    public function handle(): void
    {
        if (!current_user_can('strc_manage_members') && !current_user_can('strc_manage_platform')) wp_die('Kein Zugriff.', '', array('response'=>403));
        if (($_SERVER['REQUEST_METHOD'] ?? '')!=='POST') wp_die('Bitte das Formular verwenden.', '', array('response'=>405));
        check_admin_referer('strc_fairgate_check');
        try {
            if (($_POST['operation'] ?? '')==='sync') {
                if (($_POST['verified'] ?? '')!=='1') throw new \RuntimeException('Bitte die Zuordnung zum Mitglied bestätigen.');
                $id=trim(sanitize_text_field(wp_unslash($_POST['contactId'] ?? '')));
                $this->sync->synchronize(absint($_POST['userId'] ?? 0), $id!==''?$id:null);
                $message='Das verknüpfte Mitglied wurde abgeglichen.';
            } else { $this->gateway->connectionCheck(true); $message='Die Anmeldung an der Fairgate API funktioniert. Feldzuordnung und Schreibrechte sind damit noch nicht bestätigt.'; }
        } catch (\Throwable $error) { $message=$error instanceof \SwissTRClub\Core\Integrations\Fairgate\FairgateApiException ? $error->getMessage() : 'Prüfung fehlgeschlagen. Zuordnung und Eingaben prüfen.'; }
        set_transient('strc_fg_notice_'.get_current_user_id(), $message, 120);
        wp_safe_redirect(admin_url('admin.php?page=strc-club')); exit;
    }

    public function render(): void
    {
        if (! current_user_can('strc_manage_members') && ! current_user_can('strc_manage_platform')) {
            wp_die(esc_html__('Kein Zugriff.', 'strc-core'));
        }
        ?>
        <div class="wrap">
            <h1><?php echo esc_html__('Clubverwaltung mit Fairgate', 'strc-core'); ?></h1>
            <p><?php echo esc_html__('Fairgate ist das führende System für Mitglieder, Mitgliedschaften, Rechnungen, Zahlungen und Clubkommunikation.', 'strc-core'); ?></p>
            <table class="widefat striped" role="presentation">
                <tbody>
                    <tr><th scope="row"><?php echo esc_html__('Contacts API', 'strc-core'); ?></th><td><?php echo esc_html($this->configuration->isConfigured() ? __('Konfiguriert', 'strc-core') : __('Noch nicht konfiguriert', 'strc-core')); ?></td></tr>
                    <tr><th scope="row"><?php echo esc_html__('WordPress-Mitgliedsdaten', 'strc-core'); ?></th><td><?php echo esc_html__('Minimierter, schreibgeschützter Synchronisationsbestand', 'strc-core'); ?></td></tr>
                    <tr><th scope="row"><?php echo esc_html__('WordPress-Login', 'strc-core'); ?></th><td><?php echo esc_html__('Bleibt getrennt von Fairgate', 'strc-core'); ?></td></tr>
                </tbody>
            </table>
            <?php if ('' !== $this->configuration->administrationUrl()) : ?>
                <p><a class="button button-primary" href="<?php echo esc_url($this->configuration->administrationUrl()); ?>" target="_blank" rel="noopener noreferrer"><?php echo esc_html__('Fairgate öffnen', 'strc-core'); ?></a></p>
            <?php else : ?>
                <div class="notice notice-warning inline"><p><?php echo esc_html__('STRC_FAIRGATE_ADMIN_URL muss in der Serverkonfiguration gesetzt werden.', 'strc-core'); ?></p></div>
            <?php endif; ?>
            <?php $notice=get_transient('strc_fg_notice_'.get_current_user_id()); if ($notice) { delete_transient('strc_fg_notice_'.get_current_user_id()); echo '<div class="notice notice-info inline"><p>'.esc_html($notice).'</p></div>'; } ?>
            <h2>Verbindung und Mitgliedsabgleich</h2>
            <p>Online-Anträge: <strong><?php echo get_option('strc_membership_intake_enabled', true) ? 'Annahme zur Prüfung geöffnet' : 'Geschlossen'; ?></strong>. Zugangsdaten und Feldzuordnungen werden ausschliesslich serverseitig konfiguriert.</p>
            <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
                <?php wp_nonce_field('strc_fairgate_check'); ?><input type="hidden" name="action" value="strc_fairgate_check"><input type="hidden" name="operation" value="check">
                <button class="button" <?php disabled(!$this->configuration->isConfigured()); ?>>Verbindung prüfen</button>
            </form>
            <p>Der Abgleich verwendet eine ausdrücklich zugeordnete Fairgate Contact ID. Konten werden nicht anhand gleicher E-Mail-Adressen verknüpft. Fehlende oder unbekannte Statuswerte ändern den bisherigen Zugang nicht.</p>
            <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
                <?php wp_nonce_field('strc_fairgate_check'); ?><input type="hidden" name="action" value="strc_fairgate_check"><input type="hidden" name="operation" value="sync">
                <p><label>WordPress-Benutzer-ID <input name="userId" type="number" min="1" required></label></p>
                <p><label>Fairgate Contact ID <input name="contactId" inputmode="numeric" pattern="[1-9][0-9]*"></label> Leer lassen, wenn bereits verknüpft.</p>
                <p><label><input name="verified" type="checkbox" value="1" required> Ich habe geprüft, dass beide IDs dieselbe Person bezeichnen.</label></p>
                <button class="button" <?php disabled(!$this->configuration->isConfigured() || !$this->sync->ready()); ?>>Mitglied abgleichen</button>
            </form>
            <h2>Mitgliedsanfragen</h2><p><a href="<?php echo esc_url(admin_url('admin.php?page=strc-forms')); ?>">Formularpostfach und Prüfung öffnen →</a></p>
            <p>Bei «Prüfung erforderlich» zuerst in Fairgate nachsehen. Ein Timeout kann trotz angelegtem Kontakt auftreten. Es erfolgt kein automatischer Neuversand. Erfolgreiche Anfragen werden nach 30 Tagen lokal gelöscht.</p>
            <table class="widefat striped"><thead><tr><th>Datum</th><th>Anfrage</th><th>Status</th><th>Fairgate-ID</th></tr></thead><tbody>
            <?php
            $requestPage=max(1,absint($_GET['requests_page'] ?? 1));
            $requests=get_posts(array('post_type'=>'strc_application','post_status'=>'private','numberposts'=>50,'offset'=>($requestPage-1)*50));
            foreach ($requests as $request) {
                $data=json_decode($request->post_content,true) ?: array(); $payload=$data['payload'] ?? array();
                $person=$payload['person']??$payload; $state=$data['state'] ?? 'processing'; $labels=array('pending_review'=>'Prüfung offen','approved_pending_sync'=>'Geprüft – Fairgate-Übernahme offen','clarification'=>'Rückfrage erforderlich','delivered'=>'An Fairgate übermittelt','rejected'=>'Abgelehnt – Konfiguration/Angaben prüfen','uncertain'=>'Prüfung erforderlich','processing'=>'Prüfung erforderlich');
                echo '<tr><td>'.esc_html($request->post_date).'</td><td>'.esc_html(($person['first_name'] ?? '').' '.($person['last_name'] ?? '')).'<br><small>'.esc_html($data['reference'] ?? '').'</small><details><summary>Angaben ansehen</summary><pre>'.esc_html(wp_json_encode($payload,JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE)).'</pre></details></td><td>'.esc_html($labels[$state] ?? 'Prüfung erforderlich').'</td><td>'.esc_html((string)($data['contactId'] ?? '–')).'</td></tr>';
            }
            if (!$requests) echo '<tr><td colspan="4">Noch keine Anfragen vorhanden.</td></tr>';
            ?></tbody></table>
            <p><?php if ($requestPage>1) echo '<a class="button" href="'.esc_url(admin_url('admin.php?page=strc-club&requests_page='.($requestPage-1))).'">Vorherige Anfragen</a> '; if (count($requests)===50) echo '<a class="button" href="'.esc_url(admin_url('admin.php?page=strc-club&requests_page='.($requestPage+1))).'">Weitere Anfragen</a>'; ?></p>
            <h2><?php echo esc_html__('Systemgrenze', 'strc-core'); ?></h2>
            <ul>
                <li><?php echo esc_html__('Fairgate: Mitglieder, Beiträge, Rechnungen, Zahlungen, Rundmails', 'strc-core'); ?></li>
                <li><?php echo esc_html__('WordPress: Website, Login, Profile, Events und Community', 'strc-core'); ?></li>
            </ul>
        </div>
        <?php
    }
}

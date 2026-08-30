<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Admin;

use Exception;
use SwissTRClub\Core\Finance\CamtImporter;
use SwissTRClub\Core\Finance\InvoiceRepository;
use SwissTRClub\Core\Finance\QrInvoicePdf;
use SwissTRClub\Core\Mail\BulkMailer;
use SwissTRClub\Core\Members\MemberCsvImporter;
use SwissTRClub\Core\Members\MembershipRepository;

final class ClubManagementPage
{
    public function __construct(
        private readonly MembershipRepository $memberships,
        private readonly InvoiceRepository $invoices,
        private readonly CamtImporter $camtImporter,
        private readonly BulkMailer $mailer,
        private readonly QrInvoicePdf $pdf,
        private readonly MemberCsvImporter $memberImporter
    ) {
    }

    public function registerHooks(): void
    {
        add_action('admin_menu', array($this, 'registerMenu'));
        add_action('admin_init', array($this, 'handleActions'));
        add_action('admin_post_strc_invoice_pdf', array($this, 'downloadInvoice'));
    }

    public function registerMenu(): void
    {
        add_menu_page('STRC Clubverwaltung', 'Clubverwaltung', 'strc_manage_members', 'strc-club', array($this, 'render'), 'dashicons-groups', 3);
    }

    public function handleActions(): void
    {
        if ('POST' !== ($_SERVER['REQUEST_METHOD'] ?? '') || empty($_POST['strc_action'])) {
            return;
        }
        $action = sanitize_key(wp_unslash($_POST['strc_action']));
        check_admin_referer('strc_club_action', 'strc_nonce');

        try {
            match ($action) {
                'update_member' => $this->updateMember(),
                'generate_invoices' => $this->generateInvoices(),
                'save_billing' => $this->saveBilling(),
                'import_camt' => $this->importCamt(),
                'queue_mailing' => $this->queueMailing(),
                'send_invoice' => $this->sendInvoice(),
                'import_members' => $this->importMembers(),
                default => throw new Exception('Unbekannte Aktion.'),
            };
        } catch (Exception $exception) {
            $this->notice('error', $exception->getMessage());
        }

        wp_safe_redirect(wp_get_referer() ?: admin_url('admin.php?page=strc-club'));
        exit;
    }

    public function render(): void
    {
        if (! current_user_can('strc_manage_members')) {
            wp_die(esc_html__('Kein Zugriff.', 'strc-core'));
        }
        $tab = sanitize_key(wp_unslash($_GET['tab'] ?? 'members'));
        $notice = get_transient('strc_notice_' . get_current_user_id());
        delete_transient('strc_notice_' . get_current_user_id());
        ?>
        <div class="wrap"><h1>STRC Clubverwaltung</h1>
            <?php if (is_array($notice)) : ?><div class="notice notice-<?php echo esc_attr($notice[0]); ?> is-dismissible"><p><?php echo esc_html($notice[1]); ?></p></div><?php endif; ?>
            <nav class="nav-tab-wrapper">
                <?php foreach (array('members' => 'Mitglieder', 'invoices' => 'Rechnungen', 'payments' => 'Zahlungsabgleich', 'mailings' => 'Rundmails', 'settings' => 'Einstellungen') as $key => $label) : ?>
                    <a class="nav-tab <?php echo $tab === $key ? 'nav-tab-active' : ''; ?>" href="<?php echo esc_url(admin_url('admin.php?page=strc-club&tab=' . $key)); ?>"><?php echo esc_html($label); ?></a>
                <?php endforeach; ?>
            </nav>
            <?php
            match ($tab) {
                'invoices' => $this->renderInvoices(),
                'payments' => $this->renderPayments(),
                'mailings' => $this->renderMailings(),
                'settings' => $this->renderSettings(),
                default => $this->renderMembers(),
            };
            ?>
        </div>
        <?php
    }

    public function downloadInvoice(): void
    {
        if (! current_user_can('strc_manage_finance')) {
            wp_die(esc_html__('Kein Zugriff.', 'strc-core'));
        }
        $invoiceId = absint($_GET['invoice_id'] ?? 0);
        check_admin_referer('strc_invoice_pdf_' . $invoiceId);
        $invoice = $this->invoices->find($invoiceId);
        $user = $invoice ? get_userdata((int) $invoice['user_id']) : false;
        if (! $invoice || ! $user) {
            wp_die(esc_html__('Rechnung nicht gefunden.', 'strc-core'));
        }

        try {
            $content = $this->pdf->generate($invoice, $user);
        } catch (Exception $exception) {
            wp_die(esc_html($exception->getMessage()));
        }
        nocache_headers();
        header('Content-Type: application/pdf');
        header('Content-Disposition: attachment; filename="' . sanitize_file_name((string) $invoice['invoice_number']) . '.pdf"');
        echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
        exit;
    }

    private function updateMember(): void
    {
        $this->requireCapability('strc_manage_members');
        $this->memberships->update(absint($_POST['membership_id'] ?? 0), sanitize_key(wp_unslash($_POST['status'] ?? 'pending')), sanitize_text_field(wp_unslash($_POST['region'] ?? '')), (float) ($_POST['annual_fee'] ?? 0));
        $this->notice('success', 'Mitgliedschaft aktualisiert.');
    }

    private function generateInvoices(): void
    {
        $this->requireCapability('strc_manage_finance');
        global $wpdb;
        $created = 0;
        $year = gmdate('Y');
        foreach ($this->memberships->all() as $membership) {
            if ('active' !== $membership['status']) {
                continue;
            }
            $exists = $wpdb->get_var($wpdb->prepare("SELECT id FROM {$wpdb->prefix}strc_invoices WHERE user_id = %d AND invoice_number LIKE %s", (int) $membership['user_id'], 'STRC-' . $year . '-%'));
            if ($exists) {
                continue;
            }
            $this->invoices->create((int) $membership['user_id'], (int) $membership['id'], (float) $membership['annual_fee'], gmdate('Y-m-d', strtotime('+30 days')));
            ++$created;
        }
        $this->notice('success', $created . ' Mitgliederrechnungen erstellt.');
    }

    private function saveBilling(): void
    {
        $this->requireCapability('strc_manage_finance');
        $fields = array('creditor_name', 'street', 'house_number', 'postcode', 'city', 'qr_iban');
        $settings = array();
        foreach ($fields as $field) {
            $settings[$field] = sanitize_text_field(wp_unslash($_POST[$field] ?? ''));
        }
        update_option('strc_billing_settings', $settings, false);
        update_option('strc_default_membership_fee', number_format(max(0, (float) ($_POST['default_fee'] ?? 0)), 2, '.', ''), false);
        $this->notice('success', 'Rechnungseinstellungen gespeichert.');
    }

    private function importCamt(): void
    {
        $this->requireCapability('strc_manage_finance');
        $file = $_FILES['camt_file'] ?? null;
        if (! is_array($file) || UPLOAD_ERR_OK !== ($file['error'] ?? UPLOAD_ERR_NO_FILE) || ($file['size'] ?? 0) > 5_000_000) {
            throw new Exception('CAMT-Datei fehlt oder ist zu gross.');
        }
        if ('xml' !== strtolower(pathinfo((string) ($file['name'] ?? ''), PATHINFO_EXTENSION))) {
            throw new Exception('Es sind nur CAMT-XML-Dateien erlaubt.');
        }
        $xml = file_get_contents((string) $file['tmp_name']);
        if (false === $xml) {
            throw new Exception('CAMT-Datei konnte nicht gelesen werden.');
        }
        $result = $this->camtImporter->import($xml);
        $this->notice('success', sprintf('%d Zahlungen importiert, %d automatisch zugeordnet, %d offen.', $result['imported'], $result['matched'], $result['unmatched']));
    }

    private function queueMailing(): void
    {
        $this->requireCapability('strc_send_bulk_mail');
        $subject = sanitize_text_field(wp_unslash($_POST['subject'] ?? ''));
        $body = wp_kses_post(wp_unslash($_POST['body'] ?? ''));
        if ('' === $subject || '' === trim($body)) {
            throw new Exception('Betreff und Nachricht sind erforderlich.');
        }
        $mailingId = $this->mailer->queue($subject, $body, get_current_user_id());
        $this->notice('success', 'Rundmail #' . $mailingId . ' wurde sicher eingereiht.');
    }

    private function sendInvoice(): void
    {
        $this->requireCapability('strc_manage_finance');
        $invoice = $this->invoices->find(absint($_POST['invoice_id'] ?? 0));
        $user = $invoice ? get_userdata((int) $invoice['user_id']) : false;
        if (! $invoice || ! $user) {
            throw new Exception('Rechnung nicht gefunden.');
        }
        $temporary = wp_tempnam((string) $invoice['invoice_number']);
        if (! $temporary || false === file_put_contents($temporary, $this->pdf->generate($invoice, $user))) {
            throw new Exception('Temporäre PDF-Datei konnte nicht erstellt werden.');
        }
        $sent = wp_mail($user->user_email, 'Mitgliederrechnung ' . $invoice['invoice_number'], 'Im Anhang befindet sich Ihre Mitgliederrechnung.', array(), array($temporary));
        wp_delete_file($temporary);
        if (! $sent) {
            throw new Exception('Rechnungs-E-Mail konnte nicht versendet werden.');
        }
        $this->notice('success', 'Rechnung wurde an ' . $user->user_email . ' versendet.');
    }

    private function importMembers(): void
    {
        $this->requireCapability('strc_manage_members');
        $file = $_FILES['members_file'] ?? null;
        if (! is_array($file) || UPLOAD_ERR_OK !== ($file['error'] ?? UPLOAD_ERR_NO_FILE) || ($file['size'] ?? 0) > 5_000_000) {
            throw new Exception('Mitglieder-CSV fehlt oder ist zu gross.');
        }
        if ('csv' !== strtolower(pathinfo((string) ($file['name'] ?? ''), PATHINFO_EXTENSION))) {
            throw new Exception('Es sind nur CSV-Dateien erlaubt.');
        }
        $content = file_get_contents((string) $file['tmp_name']);
        if (false === $content) {
            throw new Exception('CSV-Datei konnte nicht gelesen werden.');
        }

        $dryRun = 'commit' !== sanitize_key(wp_unslash($_POST['import_mode'] ?? 'dry_run'));
        $report = $this->memberImporter->import($content, $dryRun);
        $message = sprintf(
            '%s: %d gelesen, %d neu, %d aktualisiert, %d übersprungen, %d Fehler.',
            $dryRun ? 'Prüflauf' : 'Import',
            $report['read'],
            $report['created'],
            $report['updated'],
            $report['skipped'],
            count($report['errors'])
        );
        if ($report['errors']) {
            $message .= ' ' . implode(' ', array_slice($report['errors'], 0, 3));
        }
        $this->notice($report['errors'] ? 'warning' : 'success', $message);
    }

    private function renderMembers(): void
    {
        echo '<h2>Mitglieder</h2><p><a class="button button-primary" href="' . esc_url(admin_url('user-new.php')) . '">Mitglied anlegen</a></p>';
        echo '<details><summary><strong>Mitglieder per CSV importieren</strong></summary><p>Pflichtspalten: <code>email;first_name;last_name</code>. Optional: <code>member_number;status;region;membership_type;annual_fee;phone;street;house_number;postcode;city;country;vehicle</code>.</p><form method="post" enctype="multipart/form-data"><input type="hidden" name="strc_action" value="import_members"><input type="file" name="members_file" accept=".csv,text/csv" required> <select name="import_mode"><option value="dry_run">Nur prüfen</option><option value="commit">Verbindlich importieren</option></select> ';
        wp_nonce_field('strc_club_action', 'strc_nonce');
        submit_button('CSV verarbeiten', 'secondary', 'submit', false);
        echo '</form></details><hr><table class="widefat striped"><thead><tr><th>Nummer</th><th>Name</th><th>E-Mail</th><th>Status</th><th>Region</th><th>Beitrag</th><th></th></tr></thead><tbody>';
        foreach ($this->memberships->all() as $member) {
            echo '<tr><form method="post"><td>' . esc_html((string) $member['member_number']) . '</td><td><a href="' . esc_url(admin_url('user-edit.php?user_id=' . $member['user_id'])) . '">' . esc_html((string) $member['display_name']) . '</a></td><td>' . esc_html((string) $member['user_email']) . '</td><td><select name="status">';
            foreach (array('pending', 'active', 'grace', 'inactive') as $status) {
                echo '<option value="' . esc_attr($status) . '" ' . selected($member['status'], $status, false) . '>' . esc_html($status) . '</option>';
            }
            echo '</select></td><td><input name="region" value="' . esc_attr((string) $member['region']) . '" size="12"></td><td><input name="annual_fee" type="number" step="0.05" value="' . esc_attr((string) $member['annual_fee']) . '" size="7"></td><td><input type="hidden" name="strc_action" value="update_member"><input type="hidden" name="membership_id" value="' . esc_attr((string) $member['id']) . '">';
            wp_nonce_field('strc_club_action', 'strc_nonce');
            submit_button('Speichern', 'small', 'submit', false);
            echo '</td></form></tr>';
        }
        echo '</tbody></table>';
    }

    private function renderInvoices(): void
    {
        echo '<h2>Mitgliederrechnungen</h2><form method="post"><input type="hidden" name="strc_action" value="generate_invoices">';
        wp_nonce_field('strc_club_action', 'strc_nonce');
        submit_button('Jahresrechnungen erzeugen', 'primary', 'submit', false);
        echo '</form><table class="widefat striped"><thead><tr><th>Rechnung</th><th>Mitglied</th><th>Betrag</th><th>Fällig</th><th>Status</th><th>Referenz</th><th>Aktionen</th></tr></thead><tbody>';
        foreach ($this->invoices->all() as $invoice) {
            $pdfUrl = wp_nonce_url(admin_url('admin-post.php?action=strc_invoice_pdf&invoice_id=' . $invoice['id']), 'strc_invoice_pdf_' . $invoice['id']);
            echo '<tr><td>' . esc_html((string) $invoice['invoice_number']) . '</td><td>' . esc_html((string) $invoice['display_name']) . '</td><td>CHF ' . esc_html(number_format((float) $invoice['amount'], 2)) . '</td><td>' . esc_html((string) $invoice['due_on']) . '</td><td>' . esc_html((string) $invoice['status']) . '</td><td><code>' . esc_html((string) $invoice['qr_reference']) . '</code></td><td><a class="button" href="' . esc_url($pdfUrl) . '">PDF</a> <form method="post" style="display:inline"><input type="hidden" name="strc_action" value="send_invoice"><input type="hidden" name="invoice_id" value="' . esc_attr((string) $invoice['id']) . '">';
            wp_nonce_field('strc_club_action', 'strc_nonce');
            submit_button('Senden', 'secondary', 'submit', false);
            echo '</form></td></tr>';
        }
        echo '</tbody></table>';
    }

    private function renderPayments(): void
    {
        global $wpdb;
        echo '<h2>CAMT-Zahlungsabgleich</h2><p>Unterstützt camt.053 und camt.054. Referenz und Betrag werden automatisch abgeglichen.</p><form method="post" enctype="multipart/form-data"><input type="hidden" name="strc_action" value="import_camt"><input type="file" name="camt_file" accept=".xml,text/xml" required> ';
        wp_nonce_field('strc_club_action', 'strc_nonce');
        submit_button('Zahlungen importieren', 'primary', 'submit', false);
        echo '</form><table class="widefat striped"><thead><tr><th>Datum</th><th>Betrag</th><th>Referenz</th><th>Zahler</th><th>Status</th></tr></thead><tbody>';
        $rows = $wpdb->get_results("SELECT * FROM {$wpdb->prefix}strc_payments ORDER BY id DESC LIMIT 200", ARRAY_A);
        foreach ($rows as $payment) {
            echo '<tr><td>' . esc_html((string) $payment['booking_date']) . '</td><td>' . esc_html((string) $payment['currency'] . ' ' . $payment['amount']) . '</td><td><code>' . esc_html((string) $payment['reference']) . '</code></td><td>' . esc_html((string) $payment['debtor_name']) . '</td><td>' . esc_html((string) $payment['status']) . '</td></tr>';
        }
        echo '</tbody></table>';
    }

    private function renderMailings(): void
    {
        echo '<h2>Rundmail an aktive Mitglieder</h2><p>Der Versand erfolgt stapelweise über die Mail-Warteschlange.</p><form method="post"><input type="hidden" name="strc_action" value="queue_mailing"><table class="form-table"><tr><th><label for="subject">Betreff</label></th><td><input class="regular-text" id="subject" name="subject" required></td></tr><tr><th><label for="body">Nachricht</label></th><td><textarea class="large-text" rows="12" id="body" name="body" required></textarea></td></tr></table>';
        wp_nonce_field('strc_club_action', 'strc_nonce');
        submit_button('Rundmail einreihen');
        echo '</form>';
    }

    private function renderSettings(): void
    {
        $settings = get_option('strc_billing_settings', array());
        $fields = array('creditor_name' => 'Clubname', 'street' => 'Strasse', 'house_number' => 'Hausnummer', 'postcode' => 'Postleitzahl', 'city' => 'Ort', 'qr_iban' => 'QR-IBAN');
        echo '<h2>QR-Rechnung</h2><form method="post"><input type="hidden" name="strc_action" value="save_billing"><table class="form-table">';
        foreach ($fields as $key => $label) {
            echo '<tr><th><label for="' . esc_attr($key) . '">' . esc_html($label) . '</label></th><td><input class="regular-text" id="' . esc_attr($key) . '" name="' . esc_attr($key) . '" value="' . esc_attr((string) ($settings[$key] ?? '')) . '"></td></tr>';
        }
        echo '<tr><th><label for="default_fee">Standard-Jahresbeitrag</label></th><td><input id="default_fee" name="default_fee" type="number" step="0.05" value="' . esc_attr((string) get_option('strc_default_membership_fee', '120.00')) . '"> CHF</td></tr></table>';
        wp_nonce_field('strc_club_action', 'strc_nonce');
        submit_button('Einstellungen speichern');
        echo '</form>';
    }

    private function requireCapability(string $capability): void
    {
        if (! current_user_can($capability)) {
            throw new Exception('Keine Berechtigung für diese Aktion.');
        }
    }

    private function notice(string $type, string $message): void
    {
        set_transient('strc_notice_' . get_current_user_id(), array($type, $message), 60);
    }
}

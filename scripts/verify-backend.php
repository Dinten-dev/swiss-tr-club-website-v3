<?php

use SwissTRClub\Core\Finance\CamtImporter;
use SwissTRClub\Core\Finance\InvoiceRepository;
use SwissTRClub\Core\Finance\QrInvoicePdf;
use SwissTRClub\Core\Mail\BulkMailer;

if (! defined('ABSPATH')) {
    fwrite(STDERR, "Run this file through WP-CLI eval-file.\n");
    exit(1);
}

/** @param mixed $condition */
function strc_assert($condition, string $message): void
{
    if (! $condition) {
        throw new RuntimeException($message);
    }
}

global $wpdb;

foreach (array('memberships', 'invoices', 'payments', 'mailings', 'mailing_recipients') as $suffix) {
    $table = $wpdb->prefix . 'strc_' . $suffix;
    strc_assert($wpdb->get_var($wpdb->prepare('SHOW TABLES LIKE %s', $table)) === $table, "Missing table: {$table}");
}

$requiredCapabilities = array(
    'strc_member' => 'strc_access_member_area',
    'strc_editor' => 'strc_edit_website_content',
    'strc_administrator' => 'strc_manage_members',
    'strc_developer' => 'strc_manage_platform',
);
foreach ($requiredCapabilities as $roleName => $capability) {
    $role = get_role($roleName);
    strc_assert($role && $role->has_cap($capability), "Role capability missing: {$roleName}/{$capability}");
}

$member = $wpdb->get_row(
    "SELECT m.*, u.user_email FROM {$wpdb->prefix}strc_memberships m
     INNER JOIN {$wpdb->users} u ON u.ID = m.user_id
     WHERE m.status = 'active' ORDER BY m.id ASC LIMIT 1",
    ARRAY_A
);
strc_assert(is_array($member), 'No active membership found.');
$user = get_userdata((int) $member['user_id']);
strc_assert($user instanceof WP_User, 'Member account not found.');
strc_assert(user_can($user, 'strc_access_member_area'), 'Active member access denied.');

$oldBilling = get_option('strc_billing_settings', null);
$metaKeys = array('strc_street', 'strc_house_number', 'strc_postcode', 'strc_city', 'strc_country');
$oldMeta = array();
foreach ($metaKeys as $key) {
    $oldMeta[$key] = get_user_meta($user->ID, $key, true);
}

$invoiceId = 0;
$mailingId = 0;
$eventIds = array();
try {
    $publishedEventId = wp_insert_post(array(
        'post_type' => 'strc_event',
        'post_status' => 'publish',
        'post_title' => 'STRC Endpoint-Verifikation',
        'post_excerpt' => 'Öffentlicher Testtermin.',
        'post_content' => 'Synthetischer Integrationstest.',
    ));
    $draftEventId = wp_insert_post(array(
        'post_type' => 'strc_event',
        'post_status' => 'draft',
        'post_title' => 'STRC Versteckter Entwurf',
    ));
    strc_assert(is_int($publishedEventId) && $publishedEventId > 0, 'Published event creation failed.');
    strc_assert(is_int($draftEventId) && $draftEventId > 0, 'Draft event creation failed.');
    $eventIds = array($publishedEventId, $draftEventId);
    update_post_meta($publishedEventId, 'strc_start_at', gmdate(DATE_ATOM, strtotime('+10 days')));
    update_post_meta($publishedEventId, 'strc_location', 'Testort');
    rest_get_server();
    $eventRequest = new WP_REST_Request('GET', '/strc/v1/events');
    $eventRequest->set_param('view', 'all');
    $eventResponse = rest_do_request($eventRequest);
    $eventData = $eventResponse->get_data();
    strc_assert(200 === $eventResponse->get_status(), 'Public event endpoint failed.');
    strc_assert(is_array($eventData), 'Public event response is invalid.');
    $publicEventIds = array_map('intval', array_column($eventData['events'] ?? array(), 'id'));
    strc_assert(in_array($publishedEventId, $publicEventIds, true), 'Published event is missing publicly.');
    strc_assert(! in_array($draftEventId, $publicEventIds, true), 'Draft event leaked publicly.');

    update_option('strc_billing_settings', array(
        'creditor_name' => 'Swiss TR-Club',
        'street' => 'Teststrasse',
        'house_number' => '1',
        'postcode' => '8000',
        'city' => 'Zürich',
        'qr_iban' => 'CH4431999123000889012',
    ));
    update_user_meta($user->ID, 'strc_street', 'Testweg');
    update_user_meta($user->ID, 'strc_house_number', '2');
    update_user_meta($user->ID, 'strc_postcode', '3000');
    update_user_meta($user->ID, 'strc_city', 'Bern');
    update_user_meta($user->ID, 'strc_country', 'CH');

    $invoices = new InvoiceRepository();
    $invoiceId = $invoices->create($user->ID, (int) $member['id'], 12.34, gmdate('Y-m-d', strtotime('+30 days')));
    $invoice = $invoices->find($invoiceId);
    strc_assert(is_array($invoice), 'Invoice creation failed.');
    $pdf = (new QrInvoicePdf())->generate($invoice, $user);
    strc_assert(str_starts_with($pdf, '%PDF-'), 'QR invoice is not a PDF.');

    $reference = (string) $invoice['qr_reference'];
    $xml = '<?xml version="1.0" encoding="UTF-8"?>'
        . '<Document><BkToCstmrDbtCdtNtfctn><Ntfctn><Ntry>'
        . '<Amt Ccy="CHF">12.34</Amt><CdtDbtInd>CRDT</CdtDbtInd><BookgDt><Dt>2026-08-30</Dt></BookgDt>'
        . '<AcctSvcrRef>STRC-VERIFY-' . $invoiceId . '</AcctSvcrRef><NtryDtls><TxDtls><RltdPties><Dbtr><Nm>Integration Test</Nm></Dbtr></RltdPties>'
        . '<RmtInf><Strd><CdtrRefInf><Ref>' . esc_html($reference) . '</Ref></CdtrRefInf></Strd></RmtInf>'
        . '</TxDtls></NtryDtls></Ntry></Ntfctn></BkToCstmrDbtCdtNtfctn></Document>';
    $importer = new CamtImporter($invoices);
    $firstImport = $importer->import($xml);
    $secondImport = $importer->import($xml);
    strc_assert(1 === $firstImport['matched'], 'CAMT payment was not matched.');
    strc_assert(1 === $secondImport['duplicates'], 'CAMT duplicate was not detected.');
    strc_assert('paid' === ($invoices->find($invoiceId)['status'] ?? ''), 'Invoice was not marked paid.');

    $mailer = new BulkMailer();
    $mailingId = $mailer->queue('STRC Backend-Verifikation', 'Lokaler Versandtest', 1);
    $mailer->processQueue();
    $failed = (int) $wpdb->get_var($wpdb->prepare(
        "SELECT COUNT(*) FROM {$wpdb->prefix}strc_mailing_recipients WHERE mailing_id = %d AND status <> 'sent'",
        $mailingId
    ));
    strc_assert(0 === $failed, 'Bulk mailing delivery failed.');
} finally {
    foreach ($eventIds as $eventId) {
        wp_delete_post($eventId, true);
    }
    if ($mailingId > 0) {
        $wpdb->delete($wpdb->prefix . 'strc_mailing_recipients', array('mailing_id' => $mailingId), array('%d'));
        $wpdb->delete($wpdb->prefix . 'strc_mailings', array('id' => $mailingId), array('%d'));
    }
    if ($invoiceId > 0) {
        $wpdb->delete($wpdb->prefix . 'strc_payments', array('invoice_id' => $invoiceId), array('%d'));
        $wpdb->delete($wpdb->prefix . 'strc_invoices', array('id' => $invoiceId), array('%d'));
    }
    if (null === $oldBilling) {
        delete_option('strc_billing_settings');
    } else {
        update_option('strc_billing_settings', $oldBilling);
    }
    foreach ($oldMeta as $key => $value) {
        if ('' === $value) {
            delete_user_meta($user->ID, $key);
        } else {
            update_user_meta($user->ID, $key, $value);
        }
    }
    wp_clear_scheduled_hook(BulkMailer::CRON_HOOK);
}

echo "STRC backend verification: PASS\n";

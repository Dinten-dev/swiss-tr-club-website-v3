<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Shop;

use SwissTRClub\Core\Finance\ClubDocument;

/**
 * Rechnung mit QR-Zahlteil für Shop-Bestellungen auf Rechnung (Weg A, Vorstandsentscheid 25.10.2026).
 * Mitgliederbeiträge bleiben in der Fairgate-FiBu (ADR 0002); Shop-Rechnungen stellt die Website aus,
 * die Zahlung erreicht über die QR-IBAN das Clubkonto und wird in Fairgate verbucht.
 */
final class ShopInvoice
{
    public const GATEWAY = 'strc_invoice';

    public function registerHooks(): void
    {
        add_action('woocommerce_order_status_on-hold', array($this, 'issue'), 20);
        add_action('admin_post_strc_shop_invoice', array($this, 'download'));
        add_action('woocommerce_order_details_after_order_table', array($this, 'customerLink'));
        add_action('woocommerce_admin_order_data_after_billing_address', array($this, 'customerLink'));
    }

    public function issue(int $orderId): void
    {
        self::create($orderId, false);
    }

    /**
     * Rechnung erstellen und versenden. Automatisch (Status «Rechnung offen») oder auf Knopfdruck durch die Shopverwaltung ($manual):
     * dann auch ohne Freischaltzeitpunkt und ohne E-Mail (nur Download). Ergebnis mit Grund, falls keine Rechnung entsteht.
     * @return array{number:string,url:string,sent:bool,reason:string}
     */
    public static function create(int $orderId, bool $manual): array
    {
        $result = array('number' => '', 'url' => '', 'sent' => false, 'reason' => '');
        if (! function_exists('wc_get_order')) return array('reason' => 'WooCommerce ist nicht aktiv.') + $result;
        try {
            \SwissTRClub\Core\Forms\FormStore::locked('shop-invoice-' . $orderId, function () use ($orderId, $manual, &$result): void {
                $order = wc_get_order($orderId);
                if (! $order instanceof \WC_Order || $order->get_payment_method() !== self::GATEWAY) { $result['reason'] = 'Die Bestellung ist keine Bestellung auf Rechnung.'; return; }
                if ($order->get_meta('_strc_invoice_sent')) { $result = self::state($order) + $result; return; }
                if (! $manual && !ClubDocument::eligible($order->get_date_created()?->getTimestamp() ?? 0)) return;
                if ($order->get_currency() !== 'CHF' || (float)$order->get_total() <= 0) { $result['reason'] = 'Rechnungen gibt es nur für positive CHF-Beträge.'; return; }
                if ($manual ? $order->has_status(array('cancelled', 'refunded', 'failed')) : (!$order->has_status('on-hold') || !is_email($order->get_billing_email()))) { $result['reason'] = 'Für diese Bestellung wird keine Rechnung erstellt (Status).'; return; }
                if (! ClubDocument::ready()) { $order->add_order_note('Rechnung nicht erstellt: Rechnungssteller oder QR-IBAN fehlen.'); $result['reason'] = 'Rechnungssteller, QR-IBAN oder PDF-Bibliothek fehlen in der Konfiguration (Webmaster).'; return; }
                if (! $order->get_meta('_strc_invoice_number')) {
                    $sequence = ClubDocument::next('shop');
                    $order->update_meta_data('_strc_invoice_number', ClubDocument::number('shop', $sequence));
                    $order->update_meta_data('_strc_invoice_reference', ClubDocument::reference('shop', $sequence));
                    $order->update_meta_data('_strc_invoice_date', wp_date('Y-m-d'));
                    $order->save();
                }
                $lang = self::language($order);
                $number = (string) $order->get_meta('_strc_invoice_number');
                $document = self::pdf($order);
                if (!$order->get_meta('_strc_invoice_pdf')) {
                    $archive = ClubDocument::archive('shop', $orderId, $document);
                    $order->update_meta_data('_strc_invoice_pdf', $archive);
                    $order->save();
                    if (wc_get_order($orderId)->get_meta('_strc_invoice_pdf') !== $archive) throw new \RuntimeException('Rechnung konnte nicht archiviert werden.');
                }
                if (! is_email($order->get_billing_email())) { $order->add_order_note('Rechnung ' . $number . ' erstellt (ohne E-Mail-Adresse, nur zum Herunterladen).'); $result = self::state($order) + $result; return; }
                $file = ClubDocument::temporaryFile($document, 'Rechnung-' . $number . '.pdf');
                try {
                    $copies = ClubDocument::treasury();
                    $headers = array('Content-Type: text/plain; charset=UTF-8');
                    foreach ($copies as $copy) $headers[] = 'Bcc: ' . $copy;
                    $mail = \SwissTRClub\Core\Mail\MailTemplates::render('shop.invoice', $lang, array('vorname' => $order->get_billing_first_name(), 'geschlecht' => \SwissTRClub\Core\Mail\MailTemplates::orderGender($order), 'rechnungsnummer' => $number, 'bestellnummer' => $order->get_order_number(), 'betrag' => number_format((float) $order->get_total(), 2, '.', "'")));
                    $subject = $mail['subject'];
                    $body = $mail['body'] . "\n";
                    if (is_email($order->get_billing_email()) && wp_mail($order->get_billing_email(), $subject, $body, $headers, array($file))) {
                        $order->update_meta_data('_strc_invoice_sent', gmdate(DATE_ATOM));
                        $order->save();
                        $order->add_order_note('Rechnung ' . $number . ' an ' . $order->get_billing_email() . ' gesendet' . ($copies ? ' (Kopie Kasse).' : '.'));
                    } else $order->add_order_note('Rechnung ' . $number . ' konnte nicht per E-Mail gesendet werden.');
                } finally {
                    if (is_file($file)) unlink($file);
                }
                $result = self::state(wc_get_order($orderId)) + $result;
            });
        } catch (\Throwable $error) {
            error_log('STRC shop invoice failed for order ' . $orderId . ': ' . $error->getMessage());
            $result['reason'] = 'Rechnung konnte nicht erstellt werden. Bitte Konfiguration und Archiv prüfen.';
        }
        return $result;
    }

    /** Rechnungsnummer, Download-Link und Versandstand einer Bestellung. */
    public static function state(\WC_Order $order): array
    {
        $number = (string) $order->get_meta('_strc_invoice_number');
        if ($number === '') return array();
        $stored = $order->get_meta('_strc_invoice_pdf');
        try {
            if (! $stored) throw new \RuntimeException('Archive missing.');
            ClubDocument::archived((array) $stored);
        } catch (\Throwable) {
            return array('number' => $number, 'url' => '', 'sent' => (bool) $order->get_meta('_strc_invoice_sent'), 'reason' => 'Das archivierte Rechnungs-PDF ist nicht verfügbar.');
        }
        $sent = (bool) $order->get_meta('_strc_invoice_sent');
        return array('number' => $number, 'url' => self::url($order), 'sent' => $sent, 'reason' => $sent ? '' : (is_email($order->get_billing_email()) ? 'PDF erstellt; Mailversand noch nicht bestätigt. Erneut versuchen ist möglich.' : 'PDF erstellt; ohne gültige E-Mail-Adresse nur zum Herunterladen.'));
    }

    public static function url(\WC_Order $order): string
    {
        return wp_nonce_url(admin_url('admin-post.php?action=strc_shop_invoice&order=' . $order->get_id()), 'strc_shop_invoice_' . $order->get_id());
    }

    public static function canDownload(\WC_Order $order): bool { return self::allowed($order); }

    private static function language(\WC_Order $order): string
    {
        return CustomerLanguage::language($order);
    }

    public static function pdf(\WC_Order $order): string
    {
        $stored = $order->get_meta('_strc_invoice_pdf');
        if ($stored) return ClubDocument::archived((array)$stored);
        if ($order->get_currency() !== 'CHF' || (float)$order->get_total() <= 0) throw new \InvalidArgumentException('Rechnung erfordert einen positiven CHF-Betrag.');
        $lang = self::language($order);
        $number = (string) $order->get_meta('_strc_invoice_number');
        $reference = (string) $order->get_meta('_strc_invoice_reference');
        if ($number === '' || $reference === '') throw new \RuntimeException('Rechnungsnummer fehlt.');
        $date = (string) $order->get_meta('_strc_invoice_date') ?: wp_date('Y-m-d');
        $due = gmdate('d.m.Y', strtotime($date . ' +' . ClubDocument::PAYMENT_DAYS . ' days'));
        $name = trim($order->get_billing_first_name() . ' ' . $order->get_billing_last_name());
        $street = trim($order->get_billing_address_1() . ' ' . $order->get_billing_address_2());
        $country = $order->get_billing_country() ?: 'CH';
        $recipient = array($order->get_billing_company(), $name, $street, trim($order->get_billing_postcode() . ' ' . $order->get_billing_city()), $country !== 'CH' ? (WC()->countries->countries[$country] ?? $country) : '');
        $pdf = ClubDocument::start(ClubDocument::label('Rechnung', $lang), $recipient, array(
            ClubDocument::label('Rechnungsnummer', $lang) => $number,
            ClubDocument::label('Datum', $lang) => gmdate('d.m.Y', strtotime($date)),
            ClubDocument::label('Bestellung', $lang) => '#' . $order->get_order_number(),
            ClubDocument::label('Zahlbar bis', $lang) => $due,
        ), $lang, true);
        $rows = array();
        foreach ($order->get_items() as $item) {
            $meta = array();
            foreach ($item->get_formatted_meta_data() as $entry) $meta[] = wp_strip_all_tags($entry->display_key . ': ' . $entry->display_value);
            $quantity = max(1, (int) $item->get_quantity());
            $line = (float) $item->get_total() + (float) $item->get_total_tax();
            $rows[] = array($item->get_name() . ($meta ? "\n" . implode(' · ', $meta) : ''), $quantity, $line / $quantity, $line);
        }
        $shipping = (float) $order->get_shipping_total() + (float) $order->get_shipping_tax();
        if ($shipping > 0) $rows[] = array(ClubDocument::label('Versand', $lang) . ($order->get_shipping_method() ? ': ' . $order->get_shipping_method() : ''), 1, $shipping, $shipping);
        foreach ($order->get_fees() as $fee) $rows[] = array($fee->get_name(), 1, (float) $fee->get_total() + (float)$fee->get_total_tax(), (float) $fee->get_total() + (float)$fee->get_total_tax());
        ClubDocument::table($pdf, $rows, (float) $order->get_total(), $lang,
            ClubDocument::label('Bitte bezahle den Betrag mit dem QR-Einzahlungsschein bis zum Fälligkeitsdatum. Vielen Dank für deinen Einkauf im TR-Shop.', $lang));
        ClubDocument::paymentPart($pdf, array('name' => $order->get_billing_company() ?: $name, 'street' => $street, 'postcode' => $order->get_billing_postcode(), 'city' => $order->get_billing_city(), 'country' => $country),
            (float) $order->get_total(), $reference, ClubDocument::label('Rechnung', $lang) . ' ' . $number . ' · TR-Shop #' . $order->get_order_number(), $lang);
        return $pdf->Output('Rechnung-' . $number . '.pdf', 'S');
    }

    private static function allowed(\WC_Order $order): bool
    {
        if ((int) $order->get_customer_id() === get_current_user_id() && get_current_user_id() > 0) return true;
        return current_user_can('strc_manage_finance') || current_user_can('strc_manage_shop') || current_user_can('strc_manage_content_roles') || current_user_can('manage_woocommerce');
    }

    public function download(): void
    {
        $orderId = absint($_GET['order'] ?? 0);
        check_admin_referer('strc_shop_invoice_' . $orderId);
        $order = function_exists('wc_get_order') ? wc_get_order($orderId) : null;
        if (! $order instanceof \WC_Order || ! $order->get_meta('_strc_invoice_number') || ! self::allowed($order)) wp_die(esc_html__('Rechnung nicht gefunden.', 'strc-core'), '', array('response' => 404));
        try { $content = ClubDocument::archived((array) $order->get_meta('_strc_invoice_pdf')); } catch (\Throwable) { wp_die(esc_html__('Rechnungs-PDF nicht verfügbar.', 'strc-core'), '', array('response' => 404)); }
        nocache_headers();
        header('Content-Type: application/pdf');
        header('Content-Disposition: inline; filename="Rechnung-' . sanitize_file_name((string) $order->get_meta('_strc_invoice_number')) . '.pdf"');
        echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
        exit;
    }

    public function customerLink($order): void
    {
        if (! $order instanceof \WC_Order || ! $order->get_meta('_strc_invoice_number') || ! self::allowed($order)) return;
        $url = self::state($order)['url'] ?? '';
        if ($url === '') return;
        echo '<p class="strc-invoice-link"><a class="button" href="' . esc_url($url) . '" target="_blank" rel="noopener">' . esc_html((self::language($order) === 'fr' ? 'Facture ' : 'Rechnung ') . $order->get_meta('_strc_invoice_number') . ' (PDF)') . '</a></p>';
    }
}

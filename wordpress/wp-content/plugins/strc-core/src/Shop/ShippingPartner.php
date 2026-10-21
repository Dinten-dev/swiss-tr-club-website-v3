<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Shop;

use TCPDF;

/**
 * Versand über einen externen Speditionsdienstleister (ohne Fairgate):
 * - Bei jeder Versandbestellung (auch auf Rechnung) geht ein PDF-Lieferschein an den Versandpartner, Kopie an die Shopmanager.
 * - Das Konto mit der Rolle «Versandpartner» (strc_shipping) sieht unter «Mein Konto» die offenen Aufträge und den Lagerbestand
 *   und meldet den Versand zurück. Danach erhält der Besteller eine Versandbestätigung per E-Mail und im Dashboard.
 *
 * Empfänger: STRC_SHIPPING_PARTNER_EMAIL (Standard kundenauftrag1@brunau.ch). Auf Staging geht der Lieferschein nur an die
 * Shopmanager, ausser die Konstante ist ausdrücklich gesetzt.
 */
final class ShippingPartner
{
    public const CAPABILITY = 'strc_shipping';
    public const DEFAULT_EMAIL = 'kundenauftrag1@brunau.ch';
    private const OPEN = array('on-hold', 'processing');

    public function registerHooks(): void
    {
        add_action('woocommerce_order_status_on-hold', array($this, 'deliveryNote'), 30);
        add_action('woocommerce_order_status_processing', array($this, 'deliveryNote'), 30);
        add_action('admin_post_strc_delivery_note', array($this, 'download'));
        add_action('admin_post_strc_mark_shipped', array($this, 'markShipped'));
        add_action('woocommerce_account_dashboard', array($this, 'renderAccount'), 5);
        add_filter('woocommerce_account_menu_items', array($this, 'menu'), 99);
        add_filter('woocommerce_email_enabled_customer_completed_order', array($this, 'suppressCompletedMail'), 10, 2);
        add_filter('login_redirect', array($this, 'loginRedirect'), 40, 3);
        add_filter('woocommerce_login_redirect', array($this, 'shopLoginRedirect'), 40, 2);
    }

    public static function partnerEmail(): string
    {
        if (defined('STRC_SHIPPING_PARTNER_EMAIL') && is_email((string) STRC_SHIPPING_PARTNER_EMAIL)) return (string) STRC_SHIPPING_PARTNER_EMAIL;
        if (function_exists('wp_get_environment_type') && wp_get_environment_type() === 'staging') return '';
        return self::DEFAULT_EMAIL;
    }

    /** Versandbestellung = Versandposition vorhanden, keine Abholung an einem Anlass. */
    public static function needsShipping(\WC_Order $order): bool
    {
        if ((int) $order->get_meta('_strc_pickup_event')) return false;
        $lines = $order->get_items('shipping');
        if (! $lines) return false;
        foreach ($lines as $line) if (str_starts_with((string) $line->get_method_id(), 'local_pickup')) return false;
        return true;
    }

    private static function shopManagers(): array
    {
        $emails = array();
        foreach (get_users(array('role__in' => array('strc_shop_manager'), 'fields' => array('user_email'))) as $user) if (is_email($user->user_email)) $emails[] = $user->user_email;
        return array_values(array_unique($emails));
    }

    public function deliveryNote(int $orderId): void
    {
        if (! function_exists('wc_get_order')) return;
        $order = wc_get_order($orderId);
        if (! $order instanceof \WC_Order || ! self::needsShipping($order)) return;
        // Pro Bestellung genau einmal (auch wenn on-hold und processing nacheinander ausgelöst werden).
        if ($order->get_meta('_strc_delivery_note_sent') || ! add_post_meta($orderId, '_strc_delivery_note_lock', time(), true)) return;
        $partner = self::partnerEmail();
        $copies = self::shopManagers();
        $to = $partner !== '' ? array($partner) : $copies;
        if (! $to) { $order->add_order_note('Lieferschein nicht versandt: kein Versandpartner und kein Shopmanager hinterlegt.'); return; }
        $file = wp_tempnam('lieferschein-' . $order->get_order_number() . '.pdf');
        try {
            file_put_contents($file, self::pdf($order));
            $pdfPath = dirname($file) . '/Lieferschein-' . $order->get_order_number() . '.pdf';
            rename($file, $pdfPath);
            $address = self::address($order);
            $body = "Guten Tag\n\nIm TR-Shop des Swiss TR-Club ist eine Versandbestellung eingegangen. Der Lieferschein liegt als PDF bei.\n\n"
                . 'Bestellung: #' . $order->get_order_number() . "\n"
                . 'Lieferadresse: ' . implode(', ', array_filter($address)) . "\n\n"
                . "Nach dem Versand bitte unter «Mein Konto» → Versandaufträge «Versand melden» wählen:\n" . wc_get_page_permalink('myaccount') . "\n\nFreundliche Grüsse\nSwiss TR-Club\n";
            $headers = array('Content-Type: text/plain; charset=UTF-8');
            if ($partner !== '') foreach ($copies as $copy) $headers[] = 'Cc: ' . $copy;
            $accepted = wp_mail($to, 'Lieferschein Swiss TR-Club – Bestellung #' . $order->get_order_number(), $body, $headers, array($pdfPath));
            if ($accepted) {
                $order->update_meta_data('_strc_delivery_note_sent', gmdate(DATE_ATOM));
                $order->add_order_note('Lieferschein per E-Mail an ' . implode(', ', $to) . ($partner !== '' && $copies ? ' (Kopie Shopmanager)' : '') . ' gesendet.');
                $order->save();
            } else {
                delete_post_meta($orderId, '_strc_delivery_note_lock');
                $order->add_order_note('Lieferschein konnte nicht per E-Mail gesendet werden.');
            }
            @unlink($pdfPath);
        } catch (\Throwable $error) {
            delete_post_meta($orderId, '_strc_delivery_note_lock');
            error_log('STRC delivery note failed for order ' . $orderId . '.');
            if (is_file($file)) @unlink($file);
        }
    }

    /** @return array{0:string,1:string,2:string,3:string,4:string} Name, Firma, Strasse, PLZ Ort, Land */
    private static function address(\WC_Order $order): array
    {
        $shipping = trim($order->get_shipping_address_1() . $order->get_shipping_city()) !== '';
        $get = static fn (string $field): string => (string) ($shipping ? $order->{'get_shipping_' . $field}() : $order->{'get_billing_' . $field}());
        return array(
            trim($get('first_name') . ' ' . $get('last_name')),
            $get('company'),
            trim($get('address_1') . ' ' . $get('address_2')),
            trim($get('postcode') . ' ' . $get('city')),
            $get('country') && $get('country') !== 'CH' ? (WC()->countries->countries[$get('country')] ?? $get('country')) : '',
        );
    }

    public static function pdf(\WC_Order $order): string
    {
        if (! class_exists(TCPDF::class)) throw new \RuntimeException('PDF-Bibliothek fehlt.');
        $pdf = new TCPDF('P', 'mm', 'A4', true, 'UTF-8');
        $pdf->setPrintHeader(false); $pdf->setPrintFooter(false);
        $pdf->SetMargins(20, 18, 20); $pdf->SetAutoPageBreak(true, 18);
        $pdf->AddPage();
        $logo = get_template_directory() . '/build/strc-logo.png';
        if (is_file($logo)) $pdf->Image($logo, 170, 14, 22, 22, 'PNG');
        $pdf->SetFont('helvetica', '', 10);
        $e = static fn (string $value): string => esc_html($value);
        $address = array_filter(self::address($order));
        $date = $order->get_date_created() ? $order->get_date_created()->date_i18n('d.m.Y') : wp_date('d.m.Y');
        $rows = '';
        foreach ($order->get_items() as $item) {
            $product = $item->get_product();
            $meta = array();
            foreach ($item->get_formatted_meta_data('') as $entry) $meta[] = wp_strip_all_tags($entry->display_key . ': ' . $entry->display_value);
            $rows .= '<tr><td width="18%">' . $e($product ? (string) $product->get_sku() : '') . '</td><td width="64%"><strong>' . $e($item->get_name()) . '</strong>' . ($meta ? '<br><span style="color:#555">' . $e(implode(' · ', $meta)) . '</span>' : '') . '</td><td width="18%" align="right">' . (int) $item->get_quantity() . '</td></tr>';
        }
        $note = trim((string) $order->get_customer_note());
        $html = '<h1 style="color:#114973;font-size:20pt">Lieferschein</h1>'
            . '<p style="font-size:9pt;color:#555">Swiss TR-Club · TR-Shop</p>'
            . '<table cellpadding="3"><tr><td width="55%"><strong>Lieferadresse</strong><br>' . implode('<br>', array_map($e, $address)) . ($order->get_billing_phone() ? '<br>Tel. ' . $e($order->get_billing_phone()) : '') . '</td>'
            . '<td width="45%"><strong>Bestellung</strong> #' . $e($order->get_order_number()) . '<br><strong>Datum</strong> ' . $e($date) . '<br><strong>Versandart</strong> ' . $e($order->get_shipping_method()) . '</td></tr></table><br>'
            . '<table cellpadding="5" border="0" style="border-collapse:collapse"><tr style="background-color:#e7f0f8;font-weight:bold"><td width="18%">Artikel-Nr.</td><td width="64%">Artikel</td><td width="18%" align="right">Anzahl</td></tr>' . $rows . '</table>'
            . ($note !== '' ? '<p><strong>Bemerkung des Bestellers</strong><br>' . nl2br($e($note)) . '</p>' : '')
            . '<p style="font-size:9pt;color:#555">Bitte den Versand nach dem Verschicken unter «Mein Konto» &gt; Versandaufträge melden.</p>';
        $pdf->writeHTML($html);
        return $pdf->Output('Lieferschein-' . $order->get_order_number() . '.pdf', 'S');
    }

    private static function openOrders(): array
    {
        $orders = wc_get_orders(array('status' => self::OPEN, 'limit' => 100, 'orderby' => 'date', 'order' => 'ASC'));
        return array_values(array_filter($orders, static fn ($order) => $order instanceof \WC_Order && self::needsShipping($order) && ! $order->get_meta('_strc_shipped_at')));
    }

    private static function recentShipped(): array
    {
        $orders = wc_get_orders(array('status' => array('on-hold', 'processing', 'completed'), 'limit' => 15, 'orderby' => 'modified', 'order' => 'DESC', 'meta_query' => array(array('key' => '_strc_shipped_at', 'compare' => 'EXISTS'))));
        return array_values(array_filter($orders, static fn ($order) => $order instanceof \WC_Order && $order->get_meta('_strc_shipped_at')));
    }

    private static function allowedOrder(int $id): \WC_Order
    {
        if (! current_user_can(self::CAPABILITY) && ! current_user_can('strc_manage_shop')) wp_die('Kein Zugriff.', '', array('response' => 403));
        $order = function_exists('wc_get_order') ? wc_get_order($id) : null;
        if (! $order instanceof \WC_Order || ! self::needsShipping($order)) wp_die('Bestellung nicht gefunden.', '', array('response' => 404));
        return $order;
    }

    public function download(): void
    {
        $id = absint($_GET['order'] ?? 0);
        check_admin_referer('strc_delivery_note_' . $id);
        $order = self::allowedOrder($id);
        nocache_headers();
        header('Content-Type: application/pdf');
        header('Content-Disposition: attachment; filename="Lieferschein-' . $order->get_order_number() . '.pdf"');
        echo self::pdf($order); // Binärdaten, kein HTML
        exit;
    }

    public function markShipped(): void
    {
        $id = absint($_POST['order'] ?? 0);
        check_admin_referer('strc_mark_shipped_' . $id);
        $order = self::allowedOrder($id);
        $back = wc_get_page_permalink('myaccount');
        if ($order->get_meta('_strc_shipped_at') || ! in_array($order->get_status(), self::OPEN, true)) { wp_safe_redirect(add_query_arg('strc_shipped', 'already', $back)); exit; }
        $tracking = substr(sanitize_text_field(wp_unslash($_POST['tracking'] ?? '')), 0, 60);
        $order->update_meta_data('_strc_shipped_at', gmdate(DATE_ATOM));
        $order->update_meta_data('_strc_shipped_by', get_current_user_id());
        if ($tracking !== '') $order->update_meta_data('_strc_tracking', $tracking);
        $order->save();
        $order->add_order_note('Versand gemeldet durch ' . wp_get_current_user()->display_name . ($tracking !== '' ? ' · Sendungsnummer ' . $tracking : '') . '.');
        self::notifyCustomer($order, $tracking);
        // Bezahlte Bestellungen sind damit abgeschlossen; Rechnungsbestellungen bleiben «in Wartestellung», bis die Zahlung abgestimmt ist.
        if ($order->get_status() === 'processing') $order->update_status('completed', 'Versand gemeldet.');
        wp_safe_redirect(add_query_arg('strc_shipped', $order->get_order_number(), $back));
        exit;
    }

    private static function notifyCustomer(\WC_Order $order, string $tracking): void
    {
        $email = $order->get_billing_email();
        $lines = array();
        foreach ($order->get_items() as $item) $lines[] = '<li>' . esc_html($item->get_name()) . ' × ' . (int) $item->get_quantity() . '</li>';
        $body = '<p>' . esc_html(sprintf('Hallo %s', $order->get_billing_first_name())) . '</p><p>Deine Bestellung #' . esc_html($order->get_order_number()) . ' ist unterwegs.</p><ul>' . implode('', $lines) . '</ul>'
            . ($tracking !== '' ? '<p><strong>Sendungsnummer:</strong> ' . esc_html($tracking) . '</p>' : '')
            . '<p>Vielen Dank für deine Bestellung im TR-Shop.<br>Swiss TR-Club</p>';
        if (is_email($email)) {
            $mailer = function_exists('WC') ? WC()->mailer() : null;
            $subject = 'Deine Bestellung #' . $order->get_order_number() . ' ist unterwegs';
            if ($mailer) $mailer->send($email, $subject, $mailer->wrap_message('Deine Bestellung ist unterwegs', $body), array('Content-Type: text/html; charset=UTF-8'));
            else wp_mail($email, $subject, wp_strip_all_tags($body));
            $order->update_meta_data('_strc_shipping_mail_sent', gmdate(DATE_ATOM));
            $order->save();
        }
        $user = (int) $order->get_customer_id();
        if ($user > 0) {
            $notifications = (array) get_user_meta($user, 'strc_notifications', true);
            $notifications[] = array('id' => 'shipped-' . $order->get_id(), 'title' => 'Deine Bestellung #' . $order->get_order_number() . ' ist unterwegs' . ($tracking !== '' ? ' (Sendung ' . $tracking . ')' : ''), 'url' => $order->get_view_order_url(), 'at' => gmdate(DATE_ATOM));
            update_user_meta($user, 'strc_notifications', array_slice($notifications, -50));
        }
    }

    /** Die eigene Versandbestätigung ersetzt die WooCommerce-Mail «Bestellung abgeschlossen». */
    public function suppressCompletedMail(mixed $enabled, mixed $order): bool
    {
        return $order instanceof \WC_Order && $order->get_meta('_strc_shipping_mail_sent') ? false : (bool) $enabled;
    }

    private static function partner(): bool
    {
        return is_user_logged_in() && current_user_can(self::CAPABILITY) && ! current_user_can('strc_access_member_area');
    }

    public function menu(array $items): array
    {
        return self::partner() ? array('dashboard' => 'Versandaufträge', 'customer-logout' => $items['customer-logout'] ?? 'Abmelden') : $items;
    }

    public function loginRedirect(string $redirect, string $requested, mixed $user): string
    {
        return $user instanceof \WP_User && user_can($user, self::CAPABILITY) && ! user_can($user, 'strc_access_member_area') && function_exists('wc_get_page_permalink') ? wc_get_page_permalink('myaccount') : $redirect;
    }

    public function shopLoginRedirect(mixed $redirect, mixed $user): string
    {
        return $user instanceof \WP_User && user_can($user, self::CAPABILITY) && ! user_can($user, 'strc_access_member_area') ? wc_get_page_permalink('myaccount') : (is_string($redirect) ? $redirect : '');
    }

    public function renderAccount(): void
    {
        if (! current_user_can(self::CAPABILITY) || ! function_exists('wc_get_orders')) return;
        $done = sanitize_text_field(wp_unslash($_GET['strc_shipped'] ?? ''));
        echo '<section class="strc-shipping">';
        if ($done === 'already') echo '<p class="woocommerce-info">Dieser Auftrag war bereits als versandt gemeldet.</p>';
        elseif ($done !== '') echo '<p class="woocommerce-message">Versand für Bestellung #' . esc_html($done) . ' gemeldet. Der Besteller wird benachrichtigt.</p>';
        $open = self::openOrders();
        echo '<h2>Offene Versandaufträge (' . count($open) . ')</h2>';
        if (! $open) echo '<p>Zurzeit sind keine Versandaufträge offen.</p>';
        foreach ($open as $order) {
            $id = $order->get_id();
            $items = array();
            foreach ($order->get_items() as $item) {
                $meta = array();
                foreach ($item->get_formatted_meta_data('') as $entry) $meta[] = wp_strip_all_tags($entry->display_value);
                $items[] = '<li>' . (int) $item->get_quantity() . ' × ' . esc_html($item->get_name()) . ($meta ? ' <small>(' . esc_html(implode(', ', $meta)) . ')</small>' : '') . '</li>';
            }
            $download = wp_nonce_url(admin_url('admin-post.php?action=strc_delivery_note&order=' . $id), 'strc_delivery_note_' . $id);
            echo '<article class="strc-shipping-order"><header><h3>Bestellung #' . esc_html($order->get_order_number()) . '</h3><span>' . esc_html($order->get_date_created() ? $order->get_date_created()->date_i18n('d.m.Y') : '') . '</span></header>'
                . '<div class="strc-shipping-grid"><p><strong>Lieferadresse</strong><br>' . implode('<br>', array_map('esc_html', array_filter(self::address($order)))) . ($order->get_billing_phone() ? '<br>Tel. ' . esc_html($order->get_billing_phone()) : '') . '</p><ul>' . implode('', $items) . '</ul></div>'
                . '<form method="post" action="' . esc_url(admin_url('admin-post.php')) . '" class="strc-shipping-form">' . wp_nonce_field('strc_mark_shipped_' . $id, '_wpnonce', true, false)
                . '<input type="hidden" name="action" value="strc_mark_shipped"><input type="hidden" name="order" value="' . (int) $id . '">'
                . '<label>Sendungsnummer (optional)<input type="text" name="tracking" maxlength="60" autocomplete="off"></label>'
                . '<a class="button" href="' . esc_url($download) . '">Lieferschein (PDF)</a> <button type="submit" class="button alt">Versand melden</button></form></article>';
        }
        $shipped = self::recentShipped();
        if ($shipped) {
            echo '<details class="strc-shipping-done"><summary>Zuletzt versandt (' . count($shipped) . ')</summary><ul>';
            foreach ($shipped as $order) echo '<li>#' . esc_html($order->get_order_number()) . ' · ' . esc_html(wp_date('d.m.Y', strtotime((string) $order->get_meta('_strc_shipped_at')))) . ($order->get_meta('_strc_tracking') ? ' · ' . esc_html((string) $order->get_meta('_strc_tracking')) : '') . '</li>';
            echo '</ul></details>';
        }
        echo '<h2>Lager</h2><table class="shop_table strc-shipping-stock"><thead><tr><th>Artikel</th><th>Art.-Nr.</th><th>Bestand</th></tr></thead><tbody>';
        foreach (wc_get_products(array('limit' => 200, 'status' => array('publish'), 'orderby' => 'menu_order', 'order' => 'ASC')) as $product) {
            $rows = $product->is_type('variable') ? array_filter(array_map('wc_get_product', $product->get_children())) : array($product);
            foreach ($rows as $row) {
                $quantity = $row->managing_stock() ? (string) (int) $row->get_stock_quantity() : ($row->is_in_stock() ? 'an Lager' : 'ausverkauft');
                echo '<tr><td>' . esc_html($row->get_name()) . '</td><td>' . esc_html((string) $row->get_sku()) . '</td><td>' . esc_html($quantity) . '</td></tr>';
            }
        }
        echo '</tbody></table></section>';
    }
}

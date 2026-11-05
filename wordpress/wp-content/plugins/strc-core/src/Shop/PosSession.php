<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Shop;

use SwissTRClub\Core\Forms\FormStore;

/**
 * Kasse für den Direktverkauf (Ablauf Redaktion 3.11.2026):
 * - Kasse öffnen: Die Shopverwaltung wählt den Verkäufer (Mitglied), der für das Bargeld verantwortlich ist.
 * - Verkäufe an der Kasse: bar oder TWINT/Karte über zahls.ch (QR-Code), keine Rechnung.
 * - Kasse schliessen: Die Bareinnahmen werden dem Verkäufer mit QR-Rechnung (und optional zahls.ch-Link) per E-Mail
 *   in Rechnung gestellt; im Dashboard des Verkäufers und in der Abrechnung bleiben sie bis zur Einzahlung offen.
 */
final class PosSession
{
    private const OPTION = 'strc_pos_sessions';
    public const SETTLEMENT = 'strc_pos_settlement';

    public function registerHooks(): void
    {
        add_action('woocommerce_order_status_processing', array($this, 'paid'), 30);
        add_action('woocommerce_order_status_completed', array($this, 'paid'), 30);
        add_filter('user_has_cap', array($this, 'payCapability'), 10, 4);
        // Kassenabrechnungen: eigene Mail mit QR-Rechnung statt WooCommerce-Bestellmails.
        foreach (array('new_order', 'customer_on_hold_order', 'customer_processing_order', 'customer_completed_order', 'customer_invoice') as $email) add_filter('woocommerce_email_enabled_' . $email, static fn($enabled, $order = null) => self::isSettlement($order) ? false : $enabled, 30, 2);
        add_filter('woocommerce_order_email_verification_required', static fn($required, $order = null) => $order instanceof \WC_Order && self::isPosPayment($order) ? false : $required, 10, 2);
    }

    /** @return array<string,array> */
    private static function all(): array
    {
        wp_cache_delete(self::OPTION, 'options');
        $sessions = get_option(self::OPTION, array());
        return is_array($sessions) ? $sessions : array();
    }

    private static function store(array $sessions): void
    {
        // Abgeschlossene Kassen bleiben 2 Jahre in der Übersicht; offene immer.
        $limit = time() - 2 * YEAR_IN_SECONDS;
        $sessions = array_filter($sessions, static fn($row) => ($row['status'] ?? '') !== 'settled' || strtotime((string) ($row['closedAt'] ?? '')) > $limit);
        if (! update_option(self::OPTION, $sessions, false) && get_option(self::OPTION) !== $sessions) throw new \RuntimeException('Kasse konnte nicht gespeichert werden.');
    }

    /** Offene Kasse der angemeldeten Shopverwaltung (eine Kasse pro Gerät/Person). */
    public static function current(int $actor): ?array
    {
        foreach (self::all() as $session) if (($session['status'] ?? '') === 'open' && (int) $session['actor'] === $actor) return $session;
        return null;
    }

    public static function sellerName(array $session): string
    {
        $user = get_userdata((int) $session['seller']);
        return $user ? $user->display_name : 'Verkäufer #' . (int) $session['seller'];
    }

    public static function open(array $input): array
    {
        return FormStore::locked('shop-pos-sessions', static function () use ($input): array {
            $actor = get_current_user_id();
            if (self::current($actor)) throw new \InvalidArgumentException('Deine Kasse ist bereits geöffnet.');
            $seller = absint($input['seller'] ?? 0);
            if (! $seller || ! user_can($seller, 'strc_access_member_area')) throw new \InvalidArgumentException('Bitte den Verkäufer aus der Mitgliederliste wählen.');
            $label = sanitize_text_field($input['label'] ?? '');
            $sessions = self::all();
            $id = wp_generate_uuid4();
            $sessions[$id] = array('id' => $id, 'seller' => $seller, 'actor' => $actor, 'label' => mb_substr($label, 0, 120), 'openedAt' => gmdate(DATE_ATOM), 'status' => 'open');
            self::store($sessions);
            return self::state($actor);
        });
    }

    /** Verkäufe einer Kasse mit Summen nach Zahlungsart. */
    private static function sales(string $id): array
    {
        $rows = array(); $cash = 0.0; $online = 0.0; $pending = 0;
        foreach (wc_get_orders(array('limit' => -1, 'type' => 'shop_order', 'meta_query' => array(array('key' => '_strc_pos_session', 'value' => $id)), 'orderby' => 'date', 'order' => 'ASC')) as $order) {
            $status = $order->get_status(); $method = $order->get_payment_method(); $amount = (float) $order->get_total();
            $paid = in_array($status, array('processing', 'completed'), true);
            if ($method === 'strc_cash' && $paid) $cash += $amount;
            elseif ($method !== 'strc_cash' && $paid) $online += $amount;
            if ($status === 'pending') $pending++;
            $items = array(); foreach ($order->get_items() as $item) { $options = array(); foreach ($item->get_formatted_meta_data() as $meta) $options[] = wp_strip_all_tags((string) $meta->display_value); $items[] = $item->get_name() . ($options && ! str_contains($item->get_name(), ' – ') ? ' (' . implode(', ', $options) . ')' : '') . ' × ' . $item->get_quantity(); }
            $rows[] = array('id' => $order->get_id(), 'number' => $order->get_order_number(), 'customer' => trim($order->get_billing_first_name() . ' ' . $order->get_billing_last_name()), 'items' => $items, 'total' => wc_format_decimal($amount, 2), 'method' => $method === 'strc_cash' ? 'cash' : 'zahls', 'status' => $status);
        }
        return array('orders' => $rows, 'cash' => round($cash, 2), 'online' => round($online, 2), 'pending' => $pending);
    }

    public static function state(int $actor): ?array
    {
        $session = self::current($actor);
        if (! $session || ! function_exists('wc_get_orders')) return $session;
        return $session + array('sellerName' => self::sellerName($session)) + self::sales($session['id']);
    }

    /** Kasse schliessen: Bareinnahmen dem Verkäufer in Rechnung stellen. */
    public static function close(array $input): array
    {
        return FormStore::locked('shop-pos-sessions', static function () use ($input): array {
            $session = self::current(get_current_user_id());
            if (! $session || $session['id'] !== (string) ($input['session'] ?? '')) throw new \InvalidArgumentException('Diese Kasse ist nicht mehr geöffnet.');
            $sales = self::sales($session['id']);
            if ($sales['pending']) throw new \InvalidArgumentException('Es gibt noch unbestätigte TWINT-/Kartenzahlungen. Bitte abwarten oder den Verkauf stornieren.');
            $session['closedAt'] = gmdate(DATE_ATOM); $session['closedBy'] = get_current_user_id();
            $session['cash'] = $sales['cash']; $session['online'] = $sales['online']; $session['count'] = count(array_filter($sales['orders'], static fn($row) => $row['status'] !== 'cancelled'));
            $message = 'Kasse geschlossen. ';
            if ($sales['cash'] > 0) {
                $order = self::settlementOrder($session);
                $session['settlement'] = $order->get_id(); $session['status'] = 'closed';
                $invoice = ShopInvoice::create($order->get_id(), true);
                $message .= 'Bareinnahmen CHF ' . number_format($sales['cash'], 2, '.', "'") . ($invoice['url'] !== '' ? ': Abrechnung ' . $invoice['number'] . ($invoice['sent'] ? ' an ' . $order->get_billing_email() . ' gesendet.' : ' erstellt; bitte herunterladen und übergeben.') : '. Abrechnung nicht erstellt: ' . $invoice['reason']);
            } else {
                $session['status'] = 'settled'; $session['settledAt'] = gmdate(DATE_ATOM);
                $message .= 'Keine Bareinnahmen, nichts abzurechnen.';
            }
            $sessions = self::all(); $sessions[$session['id']] = $session; self::store($sessions);
            return array('message' => $message, 'session' => self::row($session));
        });
    }

    private static function settlementOrder(array $session): \WC_Order
    {
        $seller = (int) $session['seller'];
        $order = wc_create_order(array('customer_id' => $seller, 'created_via' => self::SETTLEMENT));
        if (is_wp_error($order)) throw new \RuntimeException('Kassenabrechnung konnte nicht angelegt werden.');
        $address = ShopOperations::memberAddress($seller);
        $order->set_address($address, 'billing');
        $order->set_currency('CHF');
        $fee = new \WC_Order_Item_Fee();
        $date = wp_date('d.m.Y', strtotime((string) $session['openedAt']));
        $fee->set_name('Bareinnahmen Kasse vom ' . $date . ($session['label'] ? ' (' . $session['label'] . ')' : ''));
        $fee->set_amount((string) $session['cash']); $fee->set_total((string) $session['cash']); $fee->set_tax_status('none');
        $order->add_item($fee);
        $order->set_payment_method(ShopInvoice::GATEWAY); $order->set_payment_method_title('Kassenabrechnung');
        $order->update_meta_data('_strc_pos_settlement', $session['id']);
        $order->update_meta_data('_strc_transaction_kind', 'settlement');
        $order->calculate_totals(false); $order->save();
        $order->add_order_note('Kassenabrechnung für ' . self::sellerName($session) . ', geschlossen durch ' . wp_get_current_user()->display_name . '.');
        $order->update_status('on-hold');
        return wc_get_order($order->get_id());
    }

    public static function isSettlement(mixed $order): bool
    {
        return $order instanceof \WC_Order && $order->get_meta('_strc_pos_settlement') !== '';
    }

    /** Verkauf an der Kasse, der online bezahlt wird (QR-Code). */
    public static function isPosPayment(\WC_Order $order): bool
    {
        return $order->get_meta('_strc_pos_session') !== '' && $order->get_payment_method() !== 'strc_cash';
    }

    /** Zahlungsweg für die Kasse: Link und QR-Code-Ziel einer zahls.ch-Zahlung. */
    public static function payment(\WC_Order $order): array
    {
        if (! self::isPosPayment($order)) return array();
        return array('payUrl' => $order->needs_payment() ? $order->get_checkout_payment_url() : '', 'status' => $order->get_status());
    }

    public static function zahlsGateway(): string
    {
        if (! function_exists('WC') || ! WC() || ! WC()->payment_gateways()) return '';
        foreach (WC()->payment_gateways()->payment_gateways() as $gateway) if (str_contains(strtolower((string) $gateway->id), 'zahls') && 'yes' === ($gateway->enabled ?? 'no')) return (string) $gateway->id;
        return '';
    }

    /** Der Kunde zahlt am Stand auf dem eigenen Handy, meist ohne Anmeldung: Zahlungsseite über den Bestellschlüssel erlauben. */
    public function payCapability(array $all, array $caps, array $args, $user): array
    {
        if (($args[0] ?? '') !== 'pay_for_order' || empty($args[2]) || ! function_exists('wc_get_order')) return $all;
        $order = wc_get_order((int) $args[2]);
        if ($order instanceof \WC_Order && self::isPosPayment($order) && $order->needs_payment() && hash_equals($order->get_order_key(), (string) wp_unslash($_GET['key'] ?? ''))) $all['pay_for_order'] = true;
        return $all;
    }

    /** QR-Code (SVG) mit dem Zahlungslink eines Kassenverkaufs; der Kunde scannt ihn mit dem eigenen Handy. */
    public static function qr(int $id): never
    {
        $order = wc_get_order($id);
        if (! $order instanceof \WC_Order || ! self::isPosPayment($order) || ! $order->needs_payment()) \SwissTRClub\Core\Http\AjaxRequest::fail('Für diesen Verkauf ist keine Zahlung offen.', 404);
        if (! class_exists(\Endroid\QrCode\Builder\Builder::class)) \SwissTRClub\Core\Http\AjaxRequest::fail('Die QR-Code-Bibliothek ist nicht verfügbar.', 503);
        $result = (new \Endroid\QrCode\Builder\Builder(writer: new \Endroid\QrCode\Writer\SvgWriter(), data: $order->get_checkout_payment_url(), size: 480, margin: 16))->build();
        header('Content-Type: image/svg+xml; charset=utf-8');
        header('Cache-Control: private, no-store, max-age=0');
        header('X-Content-Type-Options: nosniff');
        echo $result->getString(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
        exit;
    }

    /** Zahlungsstand eines Kassenverkaufs (für die Anzeige am Stand). */
    public static function saleStatus(array $input): array
    {
        $order = wc_get_order(absint($input['id'] ?? 0));
        if (! $order instanceof \WC_Order || $order->get_meta('_strc_pos_session') === '') throw new \InvalidArgumentException('Verkauf nicht gefunden.');
        return array('id' => $order->get_id(), 'status' => $order->get_status(), 'paid' => in_array($order->get_status(), array('processing', 'completed'), true));
    }

    /** Unbezahlten TWINT-/Kartenverkauf stornieren; WooCommerce bucht den Bestand zurück. */
    public static function cancelSale(array $input): array
    {
        $order = wc_get_order(absint($input['id'] ?? 0));
        $session = self::current(get_current_user_id());
        if (! $order instanceof \WC_Order || ! $session || $order->get_meta('_strc_pos_session') !== $session['id']) throw new \InvalidArgumentException('Verkauf nicht gefunden.');
        if (! $order->has_status('pending')) throw new \InvalidArgumentException('Nur unbezahlte Verkäufe lassen sich hier stornieren.');
        $order->update_status('cancelled', 'An der Kasse storniert durch ' . wp_get_current_user()->display_name . '.');
        return array('message' => 'Verkauf #' . $order->get_order_number() . ' storniert; Bestand zurückgebucht.');
    }

    /** Zahlung eingegangen: Kassenverkauf zur Übergabe abschliessen bzw. Kassenabrechnung als beglichen markieren. */
    public function paid(int $orderId): void
    {
        $order = wc_get_order($orderId);
        if (! $order instanceof \WC_Order) return;
        if (self::isPosPayment($order) && $order->has_status('processing') && $order->get_meta('_strc_fulfilment') === 'handover') { $order->update_status('completed', 'Am Stand übergeben.'); return; }
        if (! self::isSettlement($order)) return;
        FormStore::locked('shop-pos-sessions', static function () use ($order): void {
            $sessions = self::all(); $id = (string) $order->get_meta('_strc_pos_settlement');
            if (! isset($sessions[$id]) || $sessions[$id]['status'] === 'settled') return;
            $sessions[$id]['status'] = 'settled'; $sessions[$id]['settledAt'] = gmdate(DATE_ATOM);
            self::store($sessions);
        });
    }

    /** Kassier bzw. Shopverwaltung bestätigt die Einzahlung der Bareinnahmen. */
    public static function markPaid(array $input): array
    {
        $sessions = self::all(); $id = (string) ($input['session'] ?? '');
        $session = $sessions[$id] ?? null;
        if (! $session || ($session['status'] ?? '') !== 'closed') throw new \InvalidArgumentException('Diese Kassenabrechnung ist nicht offen.');
        $order = wc_get_order((int) ($session['settlement'] ?? 0));
        if (! $order instanceof \WC_Order) throw new \InvalidArgumentException('Abrechnung nicht gefunden.');
        $reference = sanitize_text_field($input['reference'] ?? '');
        $order->set_date_paid(time()); $order->save();
        $order->update_status('completed', 'Einzahlung bestätigt durch ' . wp_get_current_user()->display_name . ($reference !== '' ? ' (' . $reference . ')' : '') . '.');
        return array('message' => 'Einzahlung von ' . self::sellerName($session) . ' bestätigt.');
    }

    private static function row(array $session): array
    {
        $order = ! empty($session['settlement']) && function_exists('wc_get_order') ? wc_get_order((int) $session['settlement']) : null;
        $invoice = $order instanceof \WC_Order ? ShopInvoice::state($order) : array();
        return array(
            'id' => $session['id'], 'seller' => (int) $session['seller'], 'sellerName' => self::sellerName($session), 'label' => (string) ($session['label'] ?? ''),
            'openedAt' => $session['openedAt'], 'closedAt' => $session['closedAt'] ?? '', 'settledAt' => $session['settledAt'] ?? '', 'status' => $session['status'],
            'cash' => (float) ($session['cash'] ?? 0), 'online' => (float) ($session['online'] ?? 0), 'count' => (int) ($session['count'] ?? 0),
            'invoice' => $invoice ?: null, 'payUrl' => $order instanceof \WC_Order && ShopEndpoint::zahlsReady() && $order->needs_payment() ? $order->get_checkout_payment_url() : '',
        );
    }

    /** Alle Kassen für die Abrechnung, neueste zuerst. */
    public static function overview(): array
    {
        $rows = array_map(array(self::class, 'row'), array_values(self::all()));
        usort($rows, static fn($a, $b) => strcmp((string) $b['openedAt'], (string) $a['openedAt']));
        return $rows;
    }

    /** Offene Kassenabrechnungen eines Mitglieds (Dashboard). */
    public static function openFor(int $userId): array
    {
        if (! function_exists('wc_get_order')) return array();
        $rows = array();
        foreach (self::all() as $session) if ((int) $session['seller'] === $userId && ($session['status'] ?? '') === 'closed') $rows[] = self::row($session);
        return $rows;
    }
}

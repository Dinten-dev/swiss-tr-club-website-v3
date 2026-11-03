<?php
// Kasse für den Direktverkauf (Ablauf Redaktion 3.11.2026): öffnen, Summen, Schliessen mit Abrechnung an den Verkäufer, Einzahlung.
declare(strict_types=1);

namespace SwissTRClub\Core\Forms { final class FormStore { public static function locked(string $key, callable $work): mixed { return $work(); } } }
namespace SwissTRClub\Core\Http { final class AjaxRequest { public static function fail(string $message, int $status = 400): never { throw new \RuntimeException($message); } } }
namespace SwissTRClub\Core\Shop {
    final class ShopInvoice { public const GATEWAY = 'strc_invoice'; public static array $created = array();
        public static function create(int $id, bool $manual): array { self::$created[] = $id; return array('number' => 'S-2026-0100', 'url' => '/invoice/' . $id, 'sent' => true, 'reason' => ''); }
        public static function state(\WC_Order $order): array { return in_array($order->get_id(), self::$created, true) ? array('number' => 'S-2026-0100', 'url' => '/invoice/' . $order->get_id(), 'sent' => true, 'reason' => '') : array(); } }
    final class ShopOperations { public static function memberAddress(int $id): array { return array('first_name' => 'Vera', 'last_name' => 'Verkauf', 'email' => 'vera@example.ch', 'address_1' => 'Weg 1', 'postcode' => '3000', 'city' => 'Bern', 'country' => 'CH'); } }
    final class ShopEndpoint { public static function zahlsReady(): bool { return true; } }
}
namespace {
    const YEAR_IN_SECONDS = 31536000;
    $options = array(); $orders = array(); $current = 7; $passed = array(); $failed = array();
    function check(bool $ok, string $label): void { global $passed, $failed; if ($ok) $passed[] = $label; else $failed[] = $label; }
    function rejects(callable $work, string $label): void { try { $work(); check(false, $label); } catch (\Throwable) { check(true, $label); } }
    function get_option(string $key, $default = false) { global $options; return $options[$key] ?? $default; }
    function update_option(string $key, $value, $autoload = null): bool { global $options; $options[$key] = $value; return true; }
    function wp_cache_delete(...$args): bool { return true; }
    function get_current_user_id(): int { global $current; return $current; }
    function wp_get_current_user(): object { return (object) array('display_name' => 'Shop Moderation'); }
    function get_userdata(int $id) { return in_array($id, array(7, 21, 22), true) ? (object) array('display_name' => $id === 21 ? 'Vera Verkauf' : 'Mitglied ' . $id) : false; }
    function user_can($user, string $cap): bool { return in_array((int) $user, array(7, 21, 22), true); }
    function wp_generate_uuid4(): string { static $n = 0; $n++; return sprintf('00000000-0000-4000-8000-%012d', $n); }
    function sanitize_text_field($value): string { return trim((string) $value); }
    function absint($value): int { return abs((int) $value); }
    function wc_format_decimal($value, $places = 2): string { return number_format((float) $value, (int) $places, '.', ''); }
    function wp_date(string $format, ?int $time = null): string { return gmdate($format, $time ?? time()); }
    function wp_unslash($value) { return $value; }
    function is_wp_error($value): bool { return false; }
    function add_action(...$args): void {} function add_filter(...$args): void {}
    class WC_Order_Item_Fee { public array $data = array(); public function set_name($v): void { $this->data['name'] = $v; } public function set_amount($v): void {} public function set_total($v): void { $this->data['total'] = $v; } public function set_tax_status($v): void {} public function get_name(): string { return $this->data['name']; } }
    class WC_Order {
        public array $data;
        public function __construct(int $id, array $data = array()) { $this->data = $data + array('id' => $id, 'status' => 'pending', 'meta' => array(), 'total' => 0, 'payment' => '', 'customer' => 0, 'fees' => array(), 'key' => 'wc_order_key' . $id, 'first' => 'Kunde', 'last' => '', 'items' => array()); }
        public function get_id(): int { return $this->data['id']; }
        public function get_status(): string { return $this->data['status']; }
        public function has_status($status): bool { return in_array($this->data['status'], (array) $status, true); }
        public function get_payment_method(): string { return $this->data['payment']; }
        public function get_total(): float { return (float) $this->data['total']; }
        public function get_meta(string $key) { return $this->data['meta'][$key] ?? ''; }
        public function update_meta_data(string $key, $value): void { $this->data['meta'][$key] = $value; }
        public function get_order_number(): string { return (string) $this->data['id']; }
        public function get_billing_first_name(): string { return $this->data['first']; }
        public function get_billing_last_name(): string { return $this->data['last']; }
        public function get_billing_email(): string { return 'vera@example.ch'; }
        public function get_items(): array { return $this->data['items']; }
        public function get_order_key(): string { return $this->data['key']; }
        public function needs_payment(): bool { return in_array($this->data['status'], array('pending', 'on-hold', 'failed'), true) && $this->data['total'] > 0; }
        public function get_checkout_payment_url(): string { return 'https://example.ch/pay/' . $this->data['id']; }
        public function set_address(array $address, string $type): void { $this->data['address'] = $address; }
        public function set_currency(string $currency): void {}
        public function add_item($item): void { $this->data['fees'][] = $item; $this->data['total'] += (float) $item->data['total']; }
        public function set_payment_method(string $method): void { $this->data['payment'] = $method; }
        public function set_payment_method_title(string $title): void {}
        public function calculate_totals($taxes = true): void {}
        public function save(): int { return $this->data['id']; }
        public function add_order_note(string $note): void {}
        public function set_date_paid($time): void {}
        public function update_status(string $status, string $note = ''): void { global $hooks; $this->data['status'] = $status; if (in_array($status, array('processing', 'completed'), true)) foreach ($hooks as $hook) $hook($this->data['id']); }
    }
    $hooks = array();
    function wc_get_order(int $id) { global $orders; return $orders[$id] ?? false; }
    function wc_get_orders(array $args): array { global $orders; $id = $args['meta_query'][0]['value']; return array_values(array_filter($orders, static fn($order) => $order->get_meta('_strc_pos_session') === $id)); }
    function wc_create_order(array $args): WC_Order { global $orders; $id = 500 + count($orders); $orders[$id] = new WC_Order($id, array('customer' => $args['customer_id'])); return $orders[$id]; }

    require dirname(__DIR__, 2) . '/wordpress/wp-content/plugins/strc-core/src/Shop/PosSession.php';
    use SwissTRClub\Core\Shop\PosSession;
    $pos = new PosSession(); $hooks[] = array($pos, 'paid');

    rejects(fn() => PosSession::open(array('seller' => '99')), 'Seller must be an active member');
    $state = PosSession::open(array('seller' => '21', 'label' => 'Herbsttreffen'));
    check($state['seller'] === 21 && $state['sellerName'] === 'Vera Verkauf' && $state['status'] === 'open', 'Opening the till records seller and label');
    rejects(fn() => PosSession::open(array('seller' => '22')), 'Only one open till per operator');
    $id = $state['id'];
    $orders[11] = new WC_Order(11, array('status' => 'completed', 'payment' => 'strc_cash', 'total' => 30, 'meta' => array('_strc_pos_session' => $id)));
    $orders[12] = new WC_Order(12, array('status' => 'processing', 'payment' => 'zahls', 'total' => 20, 'meta' => array('_strc_pos_session' => $id, '_strc_fulfilment' => 'shipping')));
    $orders[13] = new WC_Order(13, array('status' => 'pending', 'payment' => 'zahls', 'total' => 15, 'meta' => array('_strc_pos_session' => $id, '_strc_fulfilment' => 'handover')));
    $state = PosSession::state(7);
    check($state['cash'] === 30.0 && $state['online'] === 20.0 && $state['pending'] === 1 && count($state['orders']) === 3, 'Till totals separate cash, online and pending payments');
    $_GET['key'] = 'wc_order_key13';
    check(($pos->payCapability(array(), array(), array('pay_for_order', 0, 13), null)['pay_for_order'] ?? false) === true, 'Customer can pay a till sale via its order key without login');
    $_GET['key'] = 'wrong';
    check(! isset($pos->payCapability(array(), array(), array('pay_for_order', 0, 13), null)['pay_for_order']), 'Wrong order key never grants payment access');
    $_GET['key'] = 'wc_order_key11';
    check(! isset($pos->payCapability(array(), array(), array('pay_for_order', 0, 11), null)['pay_for_order']), 'Cash sales never open the payment page');
    check(PosSession::payment($orders[13])['payUrl'] === 'https://example.ch/pay/13' && PosSession::payment($orders[11]) === array(), 'Only online till sales carry a payment link');
    rejects(fn() => PosSession::close(array('session' => $id)), 'Closing is blocked while a TWINT/card payment is pending');
    $orders[13]->update_status('processing');
    check($orders[13]->get_status() === 'completed', 'Paid handover sale is completed automatically');
    $orders[13]->data['status'] = 'cancelled';
    rejects(fn() => PosSession::close(array('session' => 'other')), 'Closing requires the current till id');
    $closed = PosSession::close(array('session' => $id));
    $settlement = null; foreach ($orders as $order) if ($order->get_meta('_strc_pos_settlement') === $id) $settlement = $order;
    check($settlement && $settlement->data['customer'] === 21 && $settlement->get_total() === 30.0 && $settlement->get_status() === 'on-hold' && $settlement->get_payment_method() === 'strc_invoice', 'Closing invoices the cash takings to the seller');
    check($closed['session']['status'] === 'closed' && $closed['session']['cash'] === 30.0 && str_contains($closed['message'], 'gesendet'), 'Closed till stays open for settlement and reports the mail');
    check(PosSession::current(7) === null, 'Operator can open a new till after closing');
    $open = PosSession::openFor(21);
    check(count($open) === 1 && $open[0]['cash'] === 30.0 && $open[0]['invoice']['url'] !== '' && $open[0]['payUrl'] !== '', 'Seller dashboard shows the open settlement with PDF and online payment');
    check(PosSession::openFor(22) === array(), 'Other members do not see the settlement');
    $result = PosSession::markPaid(array('session' => $id));
    check($settlement->get_status() === 'completed' && PosSession::openFor(21) === array() && str_contains($result['message'], 'Vera Verkauf'), 'Treasurer confirmation settles the till');
    rejects(fn() => PosSession::markPaid(array('session' => $id)), 'Settled till cannot be confirmed twice');
    $empty = PosSession::open(array('seller' => '22'));
    $done = PosSession::close(array('session' => $empty['id']));
    check($done['session']['status'] === 'settled' && str_contains($done['message'], 'Keine Bareinnahmen'), 'Till without cash closes without invoice');
    $overview = PosSession::overview();
    check(count($overview) === 2 && $overview[0]['status'] === 'settled', 'Overview lists every till');
    echo json_encode(array('passed' => count($passed), 'failed' => $failed, 'checks' => $passed), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), "\n";
    exit($failed ? 1 : 0);
}

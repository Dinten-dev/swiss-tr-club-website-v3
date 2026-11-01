<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Members;

/**
 * Beitragsrechnung für neue Mitglieder (Entscheid Redaktion 1.11.2026):
 * bis 15.7. voller Jahresbeitrag des laufenden Jahres, ab 16.7. Beitrag für das Folgejahr.
 * Die Mitgliedschaft beginnt mit dem Zahlungseingang. Die Rechnung ist eine WooCommerce-Bestellung
 * (QR-Rechnung über ShopInvoice, Online-Zahlung über den Zahlungslink, sobald zahls.ch bereit ist).
 */
final class MembershipFee
{
    /** Jahresbeiträge ab 2027 in CHF. */
    public const FEES = array('single' => 120, 'couple' => 160, 'young' => 50);
    public const CREATED_VIA = 'strc_membership';

    public static function year(?int $time = null): int
    {
        $time ??= time();
        $zone = new \DateTimeZone('Europe/Zurich');
        $date = (new \DateTimeImmutable('@' . $time))->setTimezone($zone);
        $year = (int) $date->format('Y');
        return $date->format('m-d') <= '07-15' ? $year : $year + 1;
    }

    public static function amount(string $type): int
    {
        return self::FEES[$type] ?? 0;
    }

    public static function typeLabel(string $type, string $language): string
    {
        $labels = array(
            'de' => array('single' => 'Einzelmitgliedschaft', 'couple' => 'Paarmitgliedschaft', 'young' => 'Jungmitgliedschaft'),
            'fr' => array('single' => 'affiliation individuelle', 'couple' => 'affiliation en couple', 'young' => 'affiliation jeune'),
        );
        return $labels[$language === 'fr' ? 'fr' : 'de'][$type] ?? $type;
    }

    public static function lineLabel(string $type, string $language, int $year): string
    {
        return $language === 'fr'
            ? 'Cotisation ' . $year . ' – ' . self::typeLabel($type, 'fr')
            : 'Mitgliederbeitrag ' . $year . ' – ' . self::typeLabel($type, 'de');
    }

    public static function aktuar(): string
    {
        return defined('STRC_AKTUAR_EMAIL') && is_email((string) STRC_AKTUAR_EMAIL) ? (string) STRC_AKTUAR_EMAIL : 'aktuar@swisstrclub.ch';
    }

    public static function kassier(): string
    {
        return defined('STRC_KASSIER_EMAIL') && is_email((string) STRC_KASSIER_EMAIL) ? (string) STRC_KASSIER_EMAIL : 'kassier@swisstrclub.ch';
    }

    public static function isMembershipOrder(mixed $order): bool
    {
        return $order instanceof \WC_Order && (int) $order->get_meta('_strc_admission_id') > 0;
    }

    /** Bestellung «Mitgliederbeitrag» für den Antrag anlegen (einmalig; bestehende offene Bestellung wird wiederverwendet). */
    public static function order(int $applicationId, array $payload): \WC_Order
    {
        if (! function_exists('wc_create_order')) throw new \RuntimeException('WooCommerce ist für die Beitragsrechnung nicht aktiv.');
        $type = (string) ($payload['membershipType'] ?? '');
        $amount = self::amount($type);
        if ($amount <= 0) throw new \RuntimeException('Für diese Mitgliedschaftsart ist kein Beitrag hinterlegt.');
        $person = (array) ($payload['person'] ?? array());
        $language = ($person['language'] ?? 'de') === 'fr' ? 'fr' : 'de';
        $year = self::year();
        $order = wc_create_order(array('customer_id' => 0, 'created_via' => self::CREATED_VIA));
        if (is_wp_error($order)) throw new \RuntimeException('Beitragsrechnung konnte nicht angelegt werden.');
        $address = array(
            'first_name' => (string) ($person['first_name'] ?? ''), 'last_name' => (string) ($person['last_name'] ?? ''),
            'email' => (string) ($person['email'] ?? ''), 'phone' => (string) ($person['phone'] ?? ''),
            'address_1' => (string) ($person['street'] ?? ''), 'postcode' => (string) ($person['postcode'] ?? ''),
            'city' => (string) ($person['city'] ?? ''), 'country' => (string) (($person['country'] ?? '') ?: 'CH'),
        );
        $order->set_address($address, 'billing');
        $order->set_currency('CHF');
        $fee = new \WC_Order_Item_Fee();
        $fee->set_name(self::lineLabel($type, $language, $year));
        $fee->set_amount((string) $amount);
        $fee->set_total((string) $amount);
        $fee->set_tax_status('none');
        $order->add_item($fee);
        $order->set_payment_method('strc_invoice');
        $order->set_payment_method_title($language === 'fr' ? 'Facture' : 'Rechnung');
        $order->update_meta_data('_strc_admission_id', $applicationId);
        $order->update_meta_data('_strc_membership_year', $year);
        $order->update_meta_data('_strc_membership_type', $type);
        $order->update_meta_data('_strc_customer_language', $language);
        $order->calculate_totals(false);
        $order->set_status('pending');
        $order->save();
        $order->add_order_note('Beitragsrechnung für Mitgliedsantrag #' . $applicationId . ' angelegt.');
        return $order;
    }

    /** Zahlungslink für die Bestätigungsmail, nur wenn die Online-Zahlung eingerichtet ist. */
    public static function onlinePayment(\WC_Order $order, string $language): string
    {
        if (! \SwissTRClub\Core\Shop\ShopEndpoint::zahlsReady() || ! $order->needs_payment()) return '';
        $url = $order->get_checkout_payment_url();
        return $language === 'fr' ? 'Ou payer simplement en ligne (TWINT/carte) : ' . $url : 'Oder bequem online bezahlen (TWINT/Karte): ' . $url;
    }
}

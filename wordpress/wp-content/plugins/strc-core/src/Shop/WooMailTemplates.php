<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Shop;

use SwissTRClub\Core\Mail\MailTemplates;

/** WooCommerce-Kundenmails über die Mailvorlagen der Redaktion: Betreff, Überschrift und Zusatztext; leer = WooCommerce-Standard. */
final class WooMailTemplates
{
    private const EMAILS = array('customer_on_hold_order' => 'shop.woo_on_hold', 'customer_processing_order' => 'shop.woo_processing', 'customer_completed_order' => 'shop.woo_completed');

    public function registerHooks(): void
    {
        foreach (self::EMAILS as $id => $key) {
            add_filter('woocommerce_email_subject_' . $id, fn ($value, $order = null) => $this->apply($key, 'subject', $value, $order), 30, 2);
            add_filter('woocommerce_email_heading_' . $id, fn ($value, $order = null) => $this->apply($key, 'heading', $value, $order), 30, 2);
            add_filter('woocommerce_email_additional_content_' . $id, fn ($value, $order = null) => $this->apply($key, 'body', $value, $order), 30, 2);
        }
    }

    private function apply(string $key, string $field, mixed $value, mixed $order): mixed
    {
        if (! $order instanceof \WC_Order) return $value;
        $rendered = MailTemplates::render($key, CustomerLanguage::language($order), array(
            'vorname' => $order->get_billing_first_name(), 'bestellnummer' => $order->get_order_number(),
            'betrag' => number_format((float) $order->get_total(), 2, '.', "'"),
        ));
        return $rendered[$field] !== '' ? $rendered[$field] : $value;
    }
}

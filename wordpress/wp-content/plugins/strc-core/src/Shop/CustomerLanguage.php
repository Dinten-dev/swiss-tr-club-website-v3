<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Shop;

use SwissTRClub\Core\Events\RegionDirectory;

/** Customer order mail language; independent of the administrator/browser locale. */
final class CustomerLanguage
{
    private array $registered = array();
    private array $switched = array();

    public function registerHooks(): void
    {
        add_filter('woocommerce_email_classes', array($this, 'emails'));
        add_filter('woocommerce_allow_restoring_email_locale', array($this, 'restore'), 20, 2);
        add_action('woocommerce_checkout_create_order', array($this, 'remember'));
        add_action('woocommerce_store_api_checkout_update_order_meta', array($this, 'remember'));
    }

    public static function language(\WC_Order $order): string
    {
        $stored = (string) $order->get_meta('_strc_customer_language');
        if (in_array($stored, array('de', 'fr'), true)) return $stored;
        $id = (int) $order->get_customer_id();
        if (!$id && $order->get_billing_email()) $id = (int) (get_user_by('email', $order->get_billing_email())->ID ?? 0);
        if ($id) {
            $official = strtolower(str_replace('-', '_', (string) get_user_meta($id, 'strc_language', true)));
            if (preg_match('/^(de|fr)(?:_|$)/', $official, $match)) return $match[1];
            $household = \SwissTRClub\Core\Members\MemberProfile::household($id);
            $region = RegionDirectory::canonicalName($household['membership']['region'] ?? null);
            if ($region !== null) return $region === 'Suisse Romande' ? 'fr' : 'de';
            $selected = (string) get_user_meta($id, 'strc_ui_language', true);
            if (in_array($selected, array('de', 'fr'), true)) return $selected;
            return str_starts_with(get_user_locale($id), 'fr') ? 'fr' : 'de';
        }
        return 'de';
    }

    public function remember(\WC_Order $order): void
    {
        if ($order->get_meta('_strc_customer_language')) return;
        $language = self::language($order);
        if (!$order->get_customer_id() && !get_user_by('email', $order->get_billing_email())) {
            $language = ($_COOKIE['strc_language'] ?? '') === 'fr' ? 'fr' : 'de';
        }
        $order->update_meta_data('_strc_customer_language', $language);
    }

    public function emails(array $emails): array
    {
        foreach ($emails as $email) {
            if (!$email instanceof \WC_Email || !$email->is_customer_email() || isset($this->registered[$email->id])) continue;
            $this->registered[$email->id] = true;
            // Recipient resolution runs after the order is assigned, before subject/body rendering,
            // including manually resent invoices. setup_locale() runs too early for this.
            add_filter('woocommerce_email_recipient_' . $email->id, array($this, 'recipient'), PHP_INT_MAX, 3);
            add_filter('woocommerce_email_additional_content_' . $email->id, array($this, 'closing'), 20, 3);
        }
        return $emails;
    }

    public function recipient(mixed $recipient, mixed $order, mixed $email): mixed
    {
        if (!$order instanceof \WC_Order || !$email instanceof \WC_Email || !$email->is_customer_email()) return $recipient;
        $key = spl_object_id($email);
        if (!isset($this->switched[$key])) {
            $this->switched[$key] = switch_to_locale(self::language($order) === 'fr' ? 'fr_FR' : 'de_CH');
            if ($order->get_date_created()) $email->placeholders['{order_date}'] = wc_format_datetime($order->get_date_created());
        }
        return $recipient;
    }

    public function restore(mixed $restore, mixed $email): mixed
    {
        if ($email instanceof \WC_Email) {
            $key = spl_object_id($email);
            if (!empty($this->switched[$key])) restore_previous_locale();
            unset($this->switched[$key]);
        }
        return $restore;
    }

    public function closing(string $content, mixed $order, mixed $email): string
    {
        if (!$order instanceof \WC_Order || !$email instanceof \WC_Email) return $content;
        $settings = (array) get_option('woocommerce_' . $email->id . '_settings', array());
        // Preserve editorial customizations. Woo caches untranslated defaults at construction time.
        if (isset($settings['additional_content']) && trim((string)$settings['additional_content']) !== '') return $content;
        return $email->format_string(self::language($order) === 'fr'
            ? 'Pour toute question concernant ta commande, contacte-nous à {store_email}.'
            : 'Bei Fragen zu deiner Bestellung erreichst du uns unter {store_email}.');
    }
}

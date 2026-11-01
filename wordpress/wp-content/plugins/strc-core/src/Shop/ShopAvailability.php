<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Shop;

/**
 * Verfügbarkeit im Shop (Wunsch Redaktion 1.11.2026):
 * - «Nur auf Bestellung»: keine Lagerführung, immer bestellbar, Hinweis «Auf Bestellung».
 * - Lager mit «Wenn nicht an Lager: auf Bestellung»: bei Bestand 0 weiter bestellbar (WooCommerce-Nachbestellung).
 * - Lager mit «Wenn nicht an Lager: auf Anfrage»: bei Bestand 0 sichtbar, aber nicht bestellbar; Link zum Kontaktformular.
 * Französische Artikelnamen und Beschreibungen erscheinen auf der französischen Artikelseite.
 */
final class ShopAvailability
{
    public function registerHooks(): void
    {
        add_filter('woocommerce_product_backorders_allowed', array($this, 'backordersAllowed'), 20, 3);
        add_filter('woocommerce_is_purchasable', array($this, 'purchasable'), 20, 2);
        add_filter('woocommerce_variation_is_purchasable', array($this, 'purchasable'), 20, 2);
        add_filter('woocommerce_get_availability_text', array($this, 'availabilityText'), 20, 2);
        add_filter('woocommerce_get_stock_html', array($this, 'stockHtml'), 20, 2);
        add_filter('woocommerce_product_get_name', array($this, 'name'), 20, 2);
        add_filter('woocommerce_product_get_description', array($this, 'description'), 20, 2);
        add_filter('the_title', array($this, 'title'), 20, 2);
    }

    private static function parent(\WC_Product $product): \WC_Product
    {
        if (! $product->is_type('variation')) return $product;
        $parent = wc_get_product($product->get_parent_id());
        return $parent instanceof \WC_Product ? $parent : $product;
    }

    public static function setting(\WC_Product $product): string
    {
        $parent = self::parent($product);
        if ($parent->get_meta('_strc_stock_mode') === 'order') return 'order';
        $out = (string) $parent->get_meta('_strc_out_of_stock');
        return in_array($out, array('backorder', 'request'), true) ? $out : 'none';
    }

    /** Auf Anfrage und nicht an Lager: sichtbar, aber nicht bestellbar. */
    public static function blocked(\WC_Product $product): bool
    {
        return self::setting($product) === 'request' && $product->managing_stock() && (int) $product->get_stock_quantity() <= 0;
    }

    private static function french(): bool
    {
        return function_exists('get_locale') && get_locale() === 'fr_FR';
    }

    public function backordersAllowed(bool $allowed, int $productId, mixed $product = null): bool
    {
        // «Auf Anfrage» nutzt die Nachbestellung nur, damit der Artikel bei Bestand 0 sichtbar bleibt. Verkauft wird höchstens der Bestand.
        return $product instanceof \WC_Product && self::setting($product) === 'request' ? false : $allowed;
    }

    public function purchasable(bool $purchasable, mixed $product): bool
    {
        return $purchasable && ! ($product instanceof \WC_Product && self::blocked($product));
    }

    public function availabilityText(string $text, mixed $product): string
    {
        if (! $product instanceof \WC_Product) return $text;
        if (self::blocked($product)) return self::french() ? 'Sur demande' : 'Auf Anfrage';
        if ($product->get_stock_status() === 'onbackorder') return self::french() ? 'Sur commande – délai de livraison plus long' : 'Auf Bestellung – längere Lieferzeit';
        return $text;
    }

    public function stockHtml(string $html, mixed $product): string
    {
        if (! $product instanceof \WC_Product || ! self::blocked($product)) return $html;
        $parent = self::parent($product);
        $label = $parent->get_name('edit');
        if ($product->is_type('variation')) {
            $values = array_filter(array_map('strval', $product->get_attributes()));
            if ($values) $label .= ' (' . implode(', ', $values) . ')';
        }
        $front = rtrim(defined('STRC_FRONTEND_ORIGIN') ? (string) STRC_FRONTEND_ORIGIN : home_url(), '/');
        $url = add_query_arg(array('anfrage' => rawurlencode($label)), $front . '/') . '#kontakt';
        $text = self::french() ? 'Envoyer une demande' : 'Anfrage senden';
        return $html . '<p class="strc-shop-enquiry"><a class="button" href="' . esc_url($url) . '">' . esc_html($text) . '</a></p>';
    }

    public function name(string $name, mixed $product): string
    {
        if (! self::french() || ! $product instanceof \WC_Product) return $name;
        $fr = trim((string) $product->get_meta('_strc_name_fr'));
        return $fr !== '' ? $fr : $name;
    }

    public function description(string $description, mixed $product): string
    {
        if (! self::french() || ! $product instanceof \WC_Product) return $description;
        $fr = trim((string) $product->get_meta('_strc_description_fr'));
        return $fr !== '' ? $fr : $description;
    }

    /** Titel der Artikelseite (WordPress-Titel des Produkts) ebenfalls auf Französisch. */
    public function title(string $title, mixed $id = 0): string
    {
        if (! self::french() || ! $id || get_post_type((int) $id) !== 'product' || is_admin()) return $title;
        $fr = trim((string) get_post_meta((int) $id, '_strc_name_fr', true));
        return $fr !== '' ? esc_html($fr) : $title;
    }

    /** Französische Namen für die Shop-Übersicht der Website (Store-API liefert nur die Hauptsprache). */
    public static function frenchNames(): array
    {
        $names = array();
        if (! function_exists('wc_get_products')) return $names;
        foreach (wc_get_products(array('limit' => 200, 'status' => 'publish')) as $product) {
            $fr = trim((string) $product->get_meta('_strc_name_fr'));
            $mode = self::setting($product);
            $row = array();
            if ($fr !== '') $row['nameFr'] = $fr;
            if ($mode !== 'none') $row['availability'] = $mode;
            if ($row) $names[(string) $product->get_id()] = $row;
        }
        return $names;
    }
}

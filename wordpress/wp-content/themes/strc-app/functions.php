<?php

declare(strict_types=1);

add_action('after_setup_theme', static function (): void {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('woocommerce');
});

// The app provides its own navigation; keep WordPress tools in wp-admin.
add_filter('show_admin_bar', static fn (bool $show): bool => is_front_page() ? false : $show);

/**
 * Hausschrift "STRC Sans": Latin-Teilmenge von Carlito (SIL Open Font License 1.1, siehe build/fonts/LICENSE-Carlito-OFL.txt).
 * Wegen des reservierten Schriftnamens trägt die verkleinerte Fassung einen eigenen Namen.
 * Carlito ist metrisch identisch mit Calibri; size-adjust 109 % gleicht die kleinere x-Höhe gegenüber Arial aus,
 * damit alle bisherigen Schriftgrössen optisch gleich gross bleiben.
 */
function strc_app_font_faces(string $uri): string
{
    $css = '';
    foreach (array(array('Regular', 400, 'normal'), array('Bold', 700, 'normal'), array('Italic', 400, 'italic'), array('BoldItalic', 700, 'italic')) as $face) {
        $css .= sprintf('@font-face{font-family:"STRC Sans";src:url("%s/build/fonts/StrcSans-%s.ttf") format("truetype");font-weight:%d;font-style:%s;font-display:swap;size-adjust:109%%}', esc_url_raw($uri), $face[0], $face[1], $face[2]);
    }
    return $css;
}

add_action('wp_enqueue_scripts', static function (): void {
    $directory = get_template_directory();
    $uri = get_template_directory_uri();
    $shopPage = function_exists('is_woocommerce') && (is_woocommerce() || is_cart() || is_checkout() || is_account_page());
    if ($shopPage && is_file($directory . '/build/app.css')) {
        wp_enqueue_style('strc-app', $uri . '/build/app.css', array(), (string) filemtime($directory . '/build/app.css'));
        wp_add_inline_style('strc-app', strc_app_font_faces($uri));
    }
    if (! is_front_page()) {
        return;
    }
    if (is_file($directory . '/build/app.js')) {
        wp_enqueue_style('strc-app', $uri . '/build/app.css', array(), (string) filemtime($directory . '/build/app.css'));
        wp_add_inline_style('strc-app', strc_app_font_faces($uri));
        wp_enqueue_script_module('strc-app', $uri . '/build/app.js', array(), (string) filemtime($directory . '/build/app.js'));
    }
});

// Die zwei meistgebrauchten Schnitte früh laden, damit der Text nicht sichtbar von Arial auf STRC Sans wechselt.
add_action('wp_head', static function (): void {
    if (! is_front_page() || ! is_file(get_template_directory() . '/build/fonts/StrcSans-Regular.ttf')) {
        return;
    }
    foreach (array('Regular', 'Bold') as $style) {
        printf('<link rel="preload" href="%s" as="font" type="font/ttf" crossorigin>' . "\n", esc_url(get_template_directory_uri() . '/build/fonts/StrcSans-' . $style . '.ttf'));
    }
}, 1);

/**
 * Artikelseite im Shop: ruhiger Aufbau statt WooCommerce-Standard.
 * Beschreibung direkt unter dem Artikel (keine Reiter, keine Rezensionen),
 * Artikelnummer und Kategorie ohne «Uncategorized», ähnliche Artikel kompakt.
 */
add_action('wp', static function (): void {
    if (! function_exists('is_product') || ! is_product()) {
        return;
    }
    remove_action('woocommerce_after_single_product_summary', 'woocommerce_output_product_data_tabs', 10);
    add_action('woocommerce_after_single_product_summary', static function (): void {
        global $post;
        $content = $post ? apply_filters('the_content', $post->post_content) : '';
        if (trim(wp_strip_all_tags($content)) === '') {
            return;
        }
        echo '<section class="strc-product-description"><h2>' . esc_html(get_locale() === 'fr_FR' ? 'Description' : 'Beschreibung') . '</h2>' . $content . '</section>'; // Inhalt aus dem Editor, von the_content gefiltert
    }, 10);
    remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_meta', 40);
    add_action('woocommerce_single_product_summary', static function (): void {
        global $product;
        if (! $product instanceof WC_Product) {
            return;
        }
        $fr = get_locale() === 'fr_FR';
        $parts = array();
        if ($product->get_sku()) {
            $parts[] = '<span>' . esc_html($fr ? 'N° d’article' : 'Artikelnummer') . ': ' . esc_html($product->get_sku()) . '</span>';
        }
        $default = (int) get_option('default_product_cat');
        $terms = array_filter((array) get_the_terms($product->get_id(), 'product_cat'), static fn ($term): bool => $term instanceof WP_Term && (int) $term->term_id !== $default && $term->slug !== 'uncategorized');
        if ($terms) {
            $parts[] = '<span>' . esc_html($fr ? 'Catégorie' : 'Kategorie') . ': ' . esc_html(implode(', ', array_map(static fn ($term): string => $term->name, $terms))) . '</span>';
        }
        if ($parts) {
            echo '<p class="strc-product-meta">' . implode(' · ', $parts) . '</p>'; // Teile einzeln escaped
        }
    }, 40);
    add_filter('woocommerce_product_related_products_heading', static fn (): string => get_locale() === 'fr_FR' ? 'Vous aimerez aussi' : 'Das könnte dich auch interessieren');
    add_filter('woocommerce_output_related_products_args', static function (array $args): array {
        $args['posts_per_page'] = 4;
        $args['columns'] = 4;
        return $args;
    });
});

// Warenkorb: kein Versandkosten-Rechner (Versand nur Schweiz oder Abholung); Hinweistext zum Bezahlvorgang ausblenden.
add_filter('woocommerce_shipping_show_shipping_calculator', '__return_false');
add_filter('woocommerce_shipping_may_be_available_html', '__return_empty_string');

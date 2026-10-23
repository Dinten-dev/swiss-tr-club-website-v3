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

/**
 * Kasse: kein Gutscheinhinweis (Gutschein im Warenkorb), Adresse aus dem Mitgliederprofil vorausgefüllt
 * (überschreibbar), PLZ und Ort nebeneinander, kein Kanton, Mobilnummer Pflicht, Abholfeld nur bei Abholung.
 */
remove_action('woocommerce_before_checkout_form', 'woocommerce_checkout_coupon_form', 10);
add_filter('woocommerce_checkout_get_value', static function ($value, string $input) {
    if ($value !== null && $value !== '' || ! is_user_logged_in()) {
        return $value;
    }
    $user = wp_get_current_user();
    $map = array(
        'billing_first_name' => (string) get_user_meta($user->ID, 'first_name', true),
        'billing_last_name' => (string) get_user_meta($user->ID, 'last_name', true),
        'billing_address_1' => (string) get_user_meta($user->ID, 'strc_street', true),
        'billing_postcode' => (string) get_user_meta($user->ID, 'strc_postcode', true),
        'billing_city' => (string) get_user_meta($user->ID, 'strc_city', true),
        'billing_phone' => (string) get_user_meta($user->ID, 'strc_phone', true),
        'billing_email' => (string) $user->user_email,
    );
    return isset($map[$input]) && $map[$input] !== '' ? $map[$input] : $value;
}, 10, 2);
add_filter('woocommerce_get_country_locale', static function (array $locale): array {
    $locale['CH']['state'] = array('required' => false, 'hidden' => true);
    $locale['CH']['postcode'] = array_merge($locale['CH']['postcode'] ?? array(), array('priority' => 60, 'class' => array('form-row-first')));
    $locale['CH']['city'] = array_merge($locale['CH']['city'] ?? array(), array('priority' => 61, 'class' => array('form-row-last')));
    return $locale;
});
add_filter('woocommerce_billing_fields', static function (array $fields): array {
    unset($fields['billing_state'], $fields['billing_company']);
    if (isset($fields['billing_phone'])) {
        $fields['billing_phone']['required'] = true;
        $fields['billing_phone']['label'] = get_locale() === 'fr_FR' ? 'Mobile (pour les questions)' : 'Mobilnummer (für Rückfragen)';
        $fields['billing_phone']['priority'] = 95;
    }
    return $fields;
});
add_filter('woocommerce_shipping_fields', static function (array $fields): array {
    unset($fields['shipping_state'], $fields['shipping_company']);
    return $fields;
});
// Kein langer (englischer) Datenschutzabsatz an der Kasse; der Datenschutz ist im Footer verlinkt.
add_filter('woocommerce_get_privacy_policy_text', static fn ($text, $type = '') => $type === 'checkout' ? '' : $text, 10, 2);
// Mobilnummer verbindlich, auch wenn die WooCommerce-Einstellung «Telefon optional» lautet (die Einstellung greift nach woocommerce_billing_fields).
add_filter('woocommerce_checkout_fields', static function (array $fields): array {
    if (isset($fields['billing']['billing_phone'])) {
        $fields['billing']['billing_phone']['required'] = true;
        $fields['billing']['billing_phone']['label'] = get_locale() === 'fr_FR' ? 'Mobile (pour les questions)' : 'Mobilnummer (für Rückfragen)';
        $fields['billing']['billing_phone']['priority'] = 95;
    }
    return $fields;
}, 1000);
// Staging 23.10.: Ein anderes Plugin bzw. die WooCommerce-Einstellung setzt das Telefon nach allen Feldfiltern wieder auf optional.
// Darum direkt beim Darstellen des Feldes und zusätzlich bei der Prüfung der Bestellung.
add_filter('woocommerce_form_field_args', static function (array $args, string $key): array {
    if ($key === 'billing_phone') {
        $args['required'] = true;
        $args['label'] = get_locale() === 'fr_FR' ? 'Mobile (pour les questions)' : 'Mobilnummer (für Rückfragen)';
    }
    return $args;
}, 1000, 2);
add_action('woocommerce_after_checkout_validation', static function (array $data, \WP_Error $errors): void {
    if (trim((string) ($data['billing_phone'] ?? '')) === '' && ! $errors->get_error_message('billing_phone_required')) {
        $errors->add('billing_phone_required', get_locale() === 'fr_FR' ? 'Merci d’indiquer un numéro de mobile pour les questions.' : 'Bitte eine Mobilnummer für Rückfragen angeben.', array('id' => 'billing_phone'));
    }
}, 10, 2);
add_action('wp_footer', static function (): void {
    if (! function_exists('is_checkout') || ! is_checkout()) {
        return;
    }
    ?>
<script>
(function(){
  function toggle(){
    var field=document.getElementById('strc_pickup_event_field');if(!field)return;
    var chosen=document.querySelector('input[name^="shipping_method"]:checked')||document.querySelector('select[name^="shipping_method"]');
    var pickup=!!chosen&&/^local_pickup/.test(chosen.value);
    field.style.display=pickup?'':'none';
  }
  document.addEventListener('change',function(e){if(e.target&&/^shipping_method/.test(e.target.name||''))toggle();});
  if(window.jQuery)window.jQuery(document.body).on('updated_checkout',toggle);
  toggle();
})();
</script>
    <?php
});

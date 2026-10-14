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

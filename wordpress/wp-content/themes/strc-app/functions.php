<?php

declare(strict_types=1);

add_action('after_setup_theme', static function (): void {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('woocommerce');
});

// The app provides its own navigation; keep WordPress tools in wp-admin.
add_filter('show_admin_bar', static fn (bool $show): bool => is_front_page() ? false : $show);

add_action('wp_enqueue_scripts', static function (): void {
    $directory = get_template_directory();
    $uri = get_template_directory_uri();
    $shopPage = function_exists('is_woocommerce') && (is_woocommerce() || is_cart() || is_checkout() || is_account_page());
    if ($shopPage && is_file($directory . '/build/app.css')) {
        wp_enqueue_style('strc-app', $uri . '/build/app.css', array(), (string) filemtime($directory . '/build/app.css'));
    }
    if (! is_front_page()) {
        return;
    }
    if (is_file($directory . '/build/app.js')) {
        wp_enqueue_style('strc-app', $uri . '/build/app.css', array(), (string) filemtime($directory . '/build/app.css'));
        wp_enqueue_script_module('strc-app', $uri . '/build/app.js', array(), (string) filemtime($directory . '/build/app.js'));
    }
});

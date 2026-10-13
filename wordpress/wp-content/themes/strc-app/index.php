<?php declare(strict_types=1);
if(!is_front_page()&&function_exists('is_woocommerce')&&(is_woocommerce()||is_cart()||is_checkout()||is_account_page())){
    get_header();echo '<main class="strc-store-page">';
    while(have_posts()){the_post();echo '<h1>'.esc_html(get_the_title()).'</h1>';the_content();}
    echo '</main>';get_footer();return;
}
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Der Schweizer Club für Triumph TR-Sportwagen, gemeinsame Ausfahrten und technische Leidenschaft.">
    <link rel="icon" href="<?php echo esc_url(get_template_directory_uri() . '/build/strc-logo.png'); ?>">
    <?php if (is_front_page()) : ?>
    <script>window.strcSettings = <?php echo wp_json_encode(array(
        'wordpressUrl' => untrailingslashit(site_url()),
        'siteUrl' => untrailingslashit(home_url()),
        'assetBase' => get_template_directory_uri() . '/build',
    ), JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT); ?>;</script>
    <?php endif; ?>
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<?php if (is_front_page() && is_file(get_template_directory() . '/build/app.js')) : ?>
    <div id="strc-app"></div>
    <noscript>Bitte JavaScript aktivieren, um die Clubplattform zu nutzen.</noscript>
<?php else : ?>
    <main style="max-width:70rem;margin:3rem auto;padding:0 1.5rem;font-family:sans-serif">
        <a href="<?php echo esc_url(home_url('/')); ?>">Swiss TR-Club – Startseite</a>
        <?php while (have_posts()) : the_post(); ?>
            <article><h1><?php the_title(); ?></h1><?php the_content(); ?></article>
        <?php endwhile; ?>
    </main>
<?php endif; ?>
<?php wp_footer(); ?>
</body>
</html>

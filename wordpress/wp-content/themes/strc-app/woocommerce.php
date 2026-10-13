<?php declare(strict_types=1); get_header(); ?>
<main class="strc-store-page"><?php
if(is_cart()||is_checkout()||is_account_page()){
    while(have_posts()){the_post();echo '<h1>'.esc_html(get_the_title()).'</h1>';the_content();}
}else{woocommerce_content();}
?></main>
<?php get_footer(); ?>

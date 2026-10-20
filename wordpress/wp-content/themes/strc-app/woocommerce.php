<?php declare(strict_types=1); get_header(); ?>
<main class="strc-store-page"><?php
if(is_cart()||is_checkout()||is_account_page()){
    $strcFr=get_locale()==='fr_FR';
    while(have_posts()){the_post();
        $title=is_account_page()?($strcFr?'Mon compte boutique':'Mein Shop-Konto'):get_the_title();
        echo '<h1>'.esc_html($title).'</h1>';
        if(is_account_page()&&is_user_logged_in())printf('<p class="strc-store-back"><a href="%s">← %s</a></p>',esc_url(rtrim(defined('STRC_FRONTEND_ORIGIN')?(string)STRC_FRONTEND_ORIGIN:home_url(),'/').'/#mitglieder'),esc_html($strcFr?'Retour à mon tableau de bord':'Zurück zu meinem Dashboard'));
        the_content();}
}else{woocommerce_content();}
?></main>
<?php get_footer(); ?>

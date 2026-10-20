<?php declare(strict_types=1); ?>
<!doctype html><html <?php language_attributes(); ?>><head><meta charset="<?php bloginfo('charset'); ?>"><meta name="viewport" content="width=device-width, initial-scale=1"><?php wp_head(); ?></head><body <?php body_class('strc-native-page'); ?>><?php wp_body_open(); ?>
<?php
$strcFr=get_locale()==='fr_FR';$strcBase=rtrim(defined('STRC_FRONTEND_ORIGIN')?(string)STRC_FRONTEND_ORIGIN:home_url(),'/');
$strcMain=[['','Home','Accueil'],['club','Club','Club'],['agenda','Agenda','Agenda'],['regionen','Regionen','Régions'],['marktplatz','Marktplatz','Marché'],['mitglieder',is_user_logged_in()?'Mitgliederbereich':'Mitglieder-Login',is_user_logged_in()?'Espace membres':'Connexion membres']];
?>
<header class="strc-store-header"><a class="strc-store-brand" href="<?php echo esc_url($strcBase.'/'); ?>"><img src="<?php echo esc_url(get_template_directory_uri().'/build/strc-logo.png'); ?>" alt="Swiss TR-Club" width="62" height="62"><span>Swiss TR-Club</span></a>
<nav class="strc-store-main" aria-label="<?php echo $strcFr?'Navigation principale':'Hauptnavigation'; ?>"><?php foreach($strcMain as $item){printf('<a href="%s"%s>%s</a>',esc_url($strcBase.'/'.($item[0]!==''?'#'.$item[0]:'')),$item[0]==='mitglieder'?' class="is-members"':'',esc_html($strcFr?$item[2]:$item[1]));} ?></nav>
<nav class="strc-store-shop" aria-label="<?php echo $strcFr?'Boutique':'Shop'; ?>"><a href="<?php echo esc_url($strcBase.'/#tr-shop'); ?>">TR-Shop</a><a href="<?php echo esc_url(wc_get_cart_url()); ?>"><?php echo $strcFr?'Panier':'Warenkorb'; ?></a><?php if(is_user_logged_in()): ?><a href="<?php echo esc_url(wc_get_account_endpoint_url('orders')); ?>"><?php echo $strcFr?'Mes commandes':'Meine Bestellungen'; ?></a><?php endif; ?></nav></header>

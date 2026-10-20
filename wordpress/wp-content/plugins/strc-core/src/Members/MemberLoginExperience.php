<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Members;

/**
 * Login im Look der Clubseite; Mitglieder landen nach dem Login (auch nach «Passwort vergessen»)
 * im eigenen Dashboard statt in wp-admin oder im Shop-Konto.
 */
final class MemberLoginExperience
{
    public function registerHooks(): void
    {
        add_filter('login_redirect',[$this,'loginRedirect'],30,3);
        add_filter('woocommerce_login_redirect',[$this,'shopLoginRedirect'],30,2);
        add_action('template_redirect',[$this,'accountDashboard']);
        add_action('login_enqueue_scripts',[$this,'loginStyles']);
        add_filter('login_headerurl',static fn():string=>self::dashboard(false));
        add_filter('login_headertext',static fn():string=>'Swiss TR-Club');
        add_filter('login_message',[$this,'loginMessage']);
    }

    public static function dashboard(bool $members=true): string
    {
        return rtrim(defined('STRC_FRONTEND_ORIGIN')?(string)STRC_FRONTEND_ORIGIN:home_url(),'/').'/'.($members?'#mitglieder':'');
    }

    private static function member(mixed $user): bool
    {
        return $user instanceof \WP_User && user_can($user,'strc_access_member_area');
    }

    /** Ohne ausdrückliches Ziel (oder mit dem WordPress-Standard wp-admin) geht ein Mitglied ins Dashboard. Administratoren behalten wp-admin. */
    public function loginRedirect(string $redirect,string $requested,mixed $user): string
    {
        if(!self::member($user)||user_can($user,'manage_options'))return $redirect;
        $default=$requested===''||untrailingslashit($requested)===untrailingslashit(admin_url())||str_contains($requested,'/my-account');
        return $default?self::dashboard():$redirect;
    }

    /** WooCommerce-Login (Mein Konto / Passwort zurückgesetzt) → Dashboard, ausser es ging um Warenkorb oder Kasse. */
    public function shopLoginRedirect(mixed $redirect,mixed $user): string
    {
        $redirect=is_string($redirect)?$redirect:'';
        if(!self::member($user))return $redirect;
        if(function_exists('wc_get_cart_url')&&(str_starts_with($redirect,wc_get_cart_url())||str_starts_with($redirect,wc_get_checkout_url())))return $redirect;
        return self::dashboard();
    }

    /** Die Startseite «Mein Konto» des Shops ersetzt für Mitglieder das Club-Dashboard; Bestellungen, Adressen usw. bleiben erreichbar. */
    public function accountDashboard(): void
    {
        if(!function_exists('is_account_page')||!is_account_page()||!is_user_logged_in()||!self::member(wp_get_current_user()))return;
        if(function_exists('WC')&&WC()->query&&WC()->query->get_current_endpoint()!=='')return;
        if(!empty($_GET))return; // z. B. ?password-reset=true oder Formularrückmeldungen
        wp_redirect(self::dashboard(),302,'Swiss TR-Club');
        exit;
    }

    public function loginMessage(string $message): string
    {
        $action=sanitize_key($_REQUEST['action']??'login');
        if(!in_array($action,['login',''],true)||!empty($_GET['checkemail']))return $message;
        return $message.'<div class="strc-login-intro"><h2>Mitglieder-Login</h2><p>Melde dich mit deiner E-Mail-Adresse an. Beim ersten Mal wählst du «Passwort vergessen?» und setzt ein eigenes Passwort.</p></div>';
    }

    public function loginStyles(): void
    {
        $theme=get_template_directory_uri();
        $font=function_exists('strc_app_font_faces')?strc_app_font_faces($theme):'';
        $logo=esc_url($theme.'/build/strc-logo.png');
        $css=$font.<<<CSS
body.login{background:#eef1f4;font-family:"STRC Sans",Arial,Helvetica,sans-serif;color:#13202b}
body.login::before{content:"";position:fixed;inset:0 0 auto 0;height:96px;background:#114973;box-shadow:inset 0 -10px 0 #bd2028;z-index:-1}
#login{width:min(400px,calc(100% - 32px));padding:28px 0 40px}
.login h1.wp-login-logo a,.login h1 a{background-image:url("{$logo}");background-size:contain;width:104px;height:104px;margin:0 auto 18px;border-radius:50%;box-shadow:0 2px 10px rgba(0,0,0,.18)}
.login form{border:1px solid #d5dde4;border-radius:10px;box-shadow:0 2px 14px rgba(10,37,63,.08);padding:24px 26px;margin-top:14px}
.login label{font-size:15px;font-weight:700;color:#0a253f}
.login input[type=text],.login input[type=password],.login input[type=email]{border:1px solid #9fb3c2;border-radius:6px;font-size:17px;padding:8px 12px;min-height:46px}
.login input:focus{border-color:#114973;box-shadow:0 0 0 2px rgba(17,73,115,.25)}
.login .button-primary,.wp-core-ui .button-primary{background:#bd2028;border-color:#bd2028;border-radius:6px;font-size:16px;font-weight:700;min-height:44px;padding:0 22px;text-shadow:none;box-shadow:none}
.login .button-primary:hover,.login .button-primary:focus{background:#971a20;border-color:#971a20}
.login .button.wp-hide-pw .dashicons{color:#114973}
.login #nav,.login #backtoblog{font-size:15px;text-align:center;padding:0}
.login #nav a,.login #backtoblog a{color:#114973;text-decoration:underline}
.login .message,.login .notice,.login #login_error{border-left-color:#114973;border-radius:6px}
.login #login_error{border-left-color:#bd2028}
.strc-login-intro{text-align:center;margin:0 0 6px}
.strc-login-intro h2{font:400 30px/1.15 Georgia,serif;color:#0a253f;margin:0 0 8px}
.strc-login-intro p{margin:0;font-size:15px;line-height:1.5;color:#3c4a55}
.login .privacy-policy-page-link,.language-switcher{display:none}
CSS;
        echo '<style id="strc-login">'.$css.'</style>'; // statisches CSS, nur Logo-URL ist dynamisch und escaped
    }
}

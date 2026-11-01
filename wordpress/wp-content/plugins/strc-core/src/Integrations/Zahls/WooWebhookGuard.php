<?php
declare(strict_types=1);
namespace SwissTRClub\Core\Integrations\Zahls;

/** Verify the WooCommerce webhook before passing it to the gateway plugin. */
final class WooWebhookGuard
{
    public static function valid(string $method,string $contentType,string $body,string $signature,string $key): bool
    {
        return $method==='POST' && trim(strtolower(explode(';',$contentType,2)[0]))==='application/x-www-form-urlencoded'
            && strlen($body)<=65536 && $key!=='' && preg_match('/^[a-f0-9]{64}$/D',$signature)===1
            && hash_equals(hash_hmac('sha256',$body,$key),$signature);
    }
    public function registerHooks(): void
    {
        add_action('woocommerce_api_wc_zahls_gateway',[$this,'guard'],1);
    }
    public function guard(): void
    {
        if(wp_get_environment_type()!=='staging')return;
        $key=defined('STRC_ZAHLS_WOO_WEBHOOK_KEY')?(string)constant('STRC_ZAHLS_WOO_WEBHOOK_KEY'):(string)getenv('STRC_ZAHLS_WOO_WEBHOOK_KEY');
        if(!self::valid((string)($_SERVER['REQUEST_METHOD']??''),(string)($_SERVER['CONTENT_TYPE']??''),(string)file_get_contents('php://input'),(string)($_SERVER['HTTP_X_WEBHOOK_SIGNATURE']??''),$key)){
            status_header(401);header('Content-Type: application/json; charset=utf-8');echo wp_json_encode(['error'=>'Webhook authentication failed']);exit;
        }
    }
}

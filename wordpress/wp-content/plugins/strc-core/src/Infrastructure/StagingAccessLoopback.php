<?php
declare(strict_types=1);
namespace SwissTRClub\Core\Infrastructure;

/** Keep WordPress cron working behind the staging-only server password. */
final class StagingAccessLoopback
{
    public static function registerHooks(): void
    {
        add_filter('cron_request',static function(array $request):array{
            if(wp_get_environment_type()!=='staging')return $request;
            $url=$request['url']??'';
            if(!is_string($url)||parse_url($url,PHP_URL_SCHEME)!=='https'||parse_url($url,PHP_URL_HOST)!==parse_url(home_url(),PHP_URL_HOST)||parse_url($url,PHP_URL_PORT)!==parse_url(home_url(),PHP_URL_PORT)||!str_ends_with(parse_url($url,PHP_URL_PATH)??'','/wp-cron.php'))return $request;
            $file=dirname(rtrim(ABSPATH,'/')).'/.strc-b-test-access/credentials.json';
            if(!is_readable($file))return $request;
            $credentials=json_decode((string)file_get_contents($file),true);
            if(!is_array($credentials)||!is_string($credentials['username']??null)||!is_string($credentials['password']??null))return $request;
            $request['args']['headers']['Authorization']='Basic '.base64_encode($credentials['username'].':'.$credentials['password']);
            $request['args']['redirection']=0;
            $request['args']['sslverify']=true;
            return $request;
        });
    }
}

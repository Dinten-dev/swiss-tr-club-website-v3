<?php
declare(strict_types=1);
require dirname(__DIR__,2).'/wordpress/wp-content/plugins/strc-core/src/Integrations/Zahls/WooWebhookGuard.php';
use SwissTRClub\Core\Integrations\Zahls\WooWebhookGuard;
$body='transaction%5Bid%5D=42&transaction%5Bstatus%5D=confirmed';$key='fixture-signing-key';$sig=hash_hmac('sha256',$body,$key);$checks=[];
function verifyWebhook(bool $actual,bool $expected,string $label):void{global $checks;if($actual!==$expected)throw new RuntimeException($label);$checks[]=$label;}
verifyWebhook(WooWebhookGuard::valid('POST','application/x-www-form-urlencoded',$body,$sig,$key),true,'Signed form callback accepted');
verifyWebhook(WooWebhookGuard::valid('POST','application/x-www-form-urlencoded; charset=UTF-8',$body,$sig,$key),true,'Charset accepted');
verifyWebhook(WooWebhookGuard::valid('POST','application/x-www-form-urlencoded',$body.'x',$sig,$key),false,'Changed body rejected');
verifyWebhook(WooWebhookGuard::valid('POST','application/x-www-form-urlencoded',$body,$sig,''),false,'Missing secret rejected');
verifyWebhook(WooWebhookGuard::valid('POST','application/x-www-form-urlencoded',$body,'',$key),false,'Missing signature rejected');
verifyWebhook(WooWebhookGuard::valid('POST','application/x-www-form-urlencoded',$body,str_repeat('a',64),$key),false,'Wrong signature rejected');
verifyWebhook(WooWebhookGuard::valid('GET','application/x-www-form-urlencoded',$body,$sig,$key),false,'GET rejected');
verifyWebhook(WooWebhookGuard::valid('POST','multipart/form-data; boundary=fixture',$body,$sig,$key),false,'Unsupported multipart body rejected');
verifyWebhook(WooWebhookGuard::valid('POST','application/json',$body,$sig,$key),false,'Unexpected content type rejected');
verifyWebhook(WooWebhookGuard::valid('POST','application/x-www-form-urlencoded',str_repeat('x',65537),$sig,$key),false,'Oversized body rejected');
echo json_encode(['passed'=>count($checks),'checks'=>$checks])."\n";

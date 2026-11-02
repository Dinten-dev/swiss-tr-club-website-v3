<?php
/** Isolated gateway configuration contract. No WordPress, network or real credentials. */
declare(strict_types=1);
if(defined('ABSPATH'))throw new RuntimeException('Run without WordPress');
define('STRC_ZAHLS_MODE','TEST');
define('STRC_ZAHLS_SHOP_ENABLED',!in_array('--disabled',$_SERVER['argv']??[],true));
$environment='staging';$gateways=[];$runtimeAvailable=true;$checks=[];
function wp_get_environment_type():string{return $GLOBALS['environment'];}
function WC():?object{if(!$GLOBALS['runtimeAvailable'])return null;return new class{public function payment_gateways():object{return new class{public function payment_gateways():array{return $GLOBALS['gateways'];}};}};}
function gateway(array $options,string $id='zahls',string $enabled='yes'):object{return new class($options,$id,$enabled){public function __construct(private array $options,public string $id,public string $enabled){}public function get_option(string $key):mixed{return $this->options[$key]??'';}};}
function verify(bool $expected,string $label):void{global $checks;$method=new ReflectionMethod(SwissTRClub\Core\Shop\ShopEndpoint::class,'zahlsReady');$actual=$method->invoke(null);if($actual!==$expected)throw new RuntimeException($label);$checks[]=$label;}
require dirname(__DIR__,2).'/wordpress/wp-content/plugins/strc-core/src/Shop/ShopEndpoint.php';
$gateways=[gateway(['instance'=>'fixture','sid'=>'fixture-key'])];
if(!STRC_ZAHLS_SHOP_ENABLED){verify(false,'Explicit shop release remains required');echo json_encode(['passed'=>count($checks),'checks'=>$checks])."\n";exit;}
verify(true,'Installed plugin legacy sid credential is recognized');
$gateways=[gateway(['instance'=>'fixture','apiKey'=>'fixture-key'])];verify(true,'Installed plugin apiKey credential is recognized');
$gateways=[gateway(['instance'=>'fixture','api_key'=>'fixture-key'])];verify(true,'Underscore credential remains compatible');
$gateways=[gateway(['instance'=>'fixture','apiKey'=>'  ','sid'=>'fixture-key'])];verify(true,'Empty preferred credential falls back to legacy sid');
$gateways=[gateway(['instance'=>'fixture'])];verify(false,'Missing credential stays disabled');
$gateways=[gateway(['instance'=>'  ','sid'=>'fixture-key'])];verify(false,'Missing instance stays disabled');
$gateways=[gateway(['instance'=>'fixture','sid'=>'fixture-key'],'zahls','no')];verify(false,'Disabled gateway stays disabled');
$gateways=[gateway(['instance'=>'fixture','sid'=>'fixture-key'],'other')];verify(false,'Unrelated gateway is never accepted');
$gateways=[gateway(['instance'=>'fixture','sid'=>'fixture-key'])];$environment='production';verify(false,'TEST configuration cannot enable production payments');
$environment='staging';$runtimeAvailable=false;verify(false,'Missing WooCommerce runtime stays disabled');
echo json_encode(['passed'=>count($checks),'checks'=>$checks])."\n";

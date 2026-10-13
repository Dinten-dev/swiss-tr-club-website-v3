<?php
if (wp_get_environment_type()!=='local') return;
define('STRC_ZAHLS_ENABLED','1');define('STRC_ZAHLS_INSTANCE','strc-test');define('STRC_ZAHLS_API_KEY','local-fixture-key');define('STRC_ZAHLS_WEBHOOK_KEY','local-fixture-webhook');define('STRC_ZAHLS_MODE','TEST');define('STRC_EVENT_TREASURY_EMAIL','treasury@example.test');
add_filter('pre_wp_mail',function($value,$mail){$rows=get_option('strc_payment_qa_mail',[]);$rows[]=$mail;update_option('strc_payment_qa_mail',$rows,false);return true;},10,2);
add_filter('pre_http_request',function($value,$args,$url){
 if(str_contains($url,'api.zahls.ch')){
  $requests=get_option('strc_payment_qa_http',[]);$requests[]=['method'=>$args['method'],'url'=>$url,'body'=>json_decode($args['body']??'null',true)];update_option('strc_payment_qa_http',$requests,false);
  if(get_option('strc_payment_qa_timeout'))return new WP_Error('timeout','Simulated timeout');
  return ['headers'=>[],'response'=>['code'=>200],'body'=>json_encode(['data'=>[['id'=>count($requests),'link'=>'https://strc-test.zahls.ch/?payment=fixture-'.count($requests)]]])];
 }
 return $value;
},10,3);

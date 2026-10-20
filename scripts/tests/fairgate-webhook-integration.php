<?php
/** Run against isolated candidate code with --skip-plugins=strc-core; no external requests. */
if(wp_get_environment_type()!=='staging'||home_url()!=='https://staging.swisstrclub.ch')throw new RuntimeException('Staging required');
if(class_exists('SwissTRClub\\Core\\Plugin',false))throw new RuntimeException('Skip canonical plugin');
require rtrim(getenv('STRC_QA_PLUGIN'),'/').'/strc-core.php';
if(!defined('DOING_CRON'))define('DOING_CRON',true);
define('STRC_FAIRGATE_WEBHOOK_ENABLED',true);
define('STRC_FAIRGATE_WEBHOOK_SECRET',bin2hex(random_bytes(32)));
use SwissTRClub\Core\Integrations\Fairgate\{FairgateClient,FairgateConfiguration,FairgateGateway,FairgateStagingImport,FairgateWebhook};
use SwissTRClub\Core\Members\MembershipRepository;
global$wpdb,$checks;$checks=[];$id=0;$mail=0;$network=0;$api=[];$failure=false;$concurrent=false;
function hook_check(bool$ok,string$name):void{global$checks;$checks[]=$name;if(!$ok)throw new RuntimeException($name);}
function hook_request(string$key,string$body='{}'):WP_REST_Request{$r=new WP_REST_Request('POST','/strc/v1/fairgate/events/'.$key);$r->set_url_params(['key'=>$key]);$r->set_body($body);return$r;}
$keys=[FairgateWebhook::QUEUE,FairgateWebhook::STATUS,'strc_fairgate_import_report'];$old=[];foreach($keys as$k)$old[$k]=get_option($k,null);
add_filter('pre_wp_mail',static function()use(&$mail){$mail++;return true;});
add_filter('pre_http_request',static function()use(&$network){$network++;return new WP_Error('blocked','External request blocked');});
$before=(int)$wpdb->get_var("SELECT COUNT(*) FROM {$wpdb->prefix}strc_memberships");
$config=new FairgateConfiguration('webhook-fixture','not-a-real-key');
try{
 foreach($keys as$k)if($k!== 'strc_fairgate_import_report')delete_option($k);
 $prefix='strc_hook_qa_'.bin2hex(random_bytes(5));$email=$prefix.'@example.invalid';
 $id=wp_insert_user(['user_login'=>$prefix,'user_email'=>$email,'user_pass'=>wp_generate_password(40,true,true),'first_name'=>'Test','last_name'=>'Webhook','role'=>'strc_member']);if(is_wp_error($id))throw new RuntimeException('Fixture failed');
 (new MembershipRepository())->syncUser($id);
 $contactId='99998761';hook_check(!$wpdb->get_var($wpdb->prepare("SELECT user_id FROM {$wpdb->prefix}strc_memberships WHERE fairgate_contact_id=%s",$contactId)),'Fixture Contact ID is unused');
 $wpdb->update($wpdb->prefix.'strc_memberships',['fairgate_contact_id'=>$contactId],['user_id'=>$id]);
 update_user_meta($id,'strc_fairgate_import_source','fairgate-readonly');update_user_meta($id,'strc_fairgate_contact_id',$contactId);update_user_meta($id,'strc_member_directory_visible','0');
 $roles=get_userdata($id)->roles;
 $contact=['basefields'=>['contact_id'=>$contactId,'contact_type'=>'singleperson','first_name'=>'Test','last_name'=>'Webhook','gender'=>'female','correspondence_language'=>'fr'],'communication'=>['primary_email'=>$email,'mobile'=>'+41790000000'],'membership'=>['membership'=>'Einzelmitglied','first_joining_date'=>'2010-02-03'],'status'=>'active','corr_address'=>['street'=>'QA 1','postale_code'=>'3000','city'=>'Bern','country'=>'Schweiz']];
 $new=$contact;$new['basefields']['contact_id']='99998762';$new['communication']['primary_email']=$prefix.'_new@example.invalid';
 $client=new FairgateClient($config,static function(string$method,string$url,array$options)use(&$api,&$failure,&$concurrent,&$receiver,&$contact,&$new):array{
  $api[]=$method;hook_check($method==='GET'||str_contains($url,'/auth/create/'),'Worker never writes contact data');
  if($failure)return['status'=>503,'body'=>'private upstream failure'];
  if(str_contains($url,'/auth/create/'))return['status'=>200,'body'=>'{"access_token":"fixture-token","expires_in":300}'];
  hook_check($method==='GET'&&str_contains($url,'/contacts/extended?pageNo=1&pageLimit=100'),'Worker fetches authenticated complete contact snapshot');
  if($concurrent){$concurrent=false;$r=$receiver->receive(hook_request(STRC_FAIRGATE_WEBHOOK_SECRET,'{"concurrent":true}'));hook_check($r instanceof WP_REST_Response&&$r->get_status()===202,'Concurrent notification accepted during fetch');}
  return['status'=>200,'body'=>wp_json_encode(['contacts'=>[$contact,$new],'pageNo'=>1,'totalPages'=>1,'totalRecords'=>2])];
 });
 $receiver=new FairgateWebhook(new FairgateStagingImport(new FairgateGateway($client,$config)));wp_set_current_user(0);
 hook_check(FairgateWebhook::enabled(),'Receiver enabled independently of member login');
 hook_check(!FairgateWebhook::validKey('short')&&!FairgateWebhook::validKey(['x']),'Invalid key shapes rejected');
 $bad=hook_request(str_repeat('0',64));$bad->set_body_params(['key'=>STRC_FAIRGATE_WEBHOOK_SECRET]);
 $r=$receiver->authorize($bad);hook_check(is_wp_error($r)&&$r->get_error_data()['status']===403,'Body cannot override invalid route capability');
 $r=$receiver->receive($bad);hook_check(is_wp_error($r)&&!get_option(FairgateWebhook::QUEUE),'Unauthorized message creates no job');
 $r=$receiver->receive(hook_request(STRC_FAIRGATE_WEBHOOK_SECRET,str_repeat('x',65537)));hook_check(is_wp_error($r)&&$r->get_error_data()['status']===413,'Oversized message rejected');
 $r=$receiver->receive(hook_request(STRC_FAIRGATE_WEBHOOK_SECRET,'{"language":"de","status":"inactive","contact_id":1}'));
 hook_check($r instanceof WP_REST_Response&&$r->get_status()===202,'Authenticated notification returns 202');
 hook_check(count($api)===0,'HTTP acknowledgement performs no Fairgate fetch');
 $job=get_option(FairgateWebhook::QUEUE);hook_check(!str_contains(wp_json_encode($job),'contact_id')&&!str_contains(wp_json_encode($job),STRC_FAIRGATE_WEBHOOK_SECRET),'Payload and URL secret never enter queue');
 $receiver->receive(hook_request(STRC_FAIRGATE_WEBHOOK_SECRET));hook_check(count(wp_get_scheduled_event(FairgateWebhook::WORK)->args)===0,'Burst notifications share one scheduled job');
 $receiver->process();hook_check(!get_option(FairgateWebhook::QUEUE),'Successful worker drains queue');
 hook_check(get_user_meta($id,'strc_gender',true)==='female'&&get_user_meta($id,'strc_language',true)==='fr','Values come from authenticated API rather than forged payload');
 hook_check(substr($wpdb->get_var($wpdb->prepare("SELECT started_on FROM {$wpdb->prefix}strc_memberships WHERE user_id=%d",$id)),0,10)==='2010-02-03','Actual membership date synchronized');
 hook_check((int)$wpdb->get_var("SELECT COUNT(*) FROM {$wpdb->prefix}strc_memberships")===$before+1,'Webhook never provisions unknown members');
 hook_check(get_userdata($id)->roles===$roles&&get_user_meta($id,'strc_member_directory_visible',true)==='0','Roles and directory opt-out survive refresh');
 $calls=count($api);$receiver->process();hook_check(count($api)===$calls,'Empty queue never replays work');
 $receiver->receive(hook_request(STRC_FAIRGATE_WEBHOOK_SECRET));$failure=true;$receiver->process();$job=get_option(FairgateWebhook::QUEUE);
 hook_check($job['attempts']===1&&$job['nextAt']>time(),'Upstream outage retains job with retry backoff');
 hook_check(get_user_meta($id,'strc_language',true)==='fr','Upstream outage preserves existing profile');
 $calls=count($api);$receiver->process();hook_check(count($api)===$calls,'Backoff prevents immediate repeated requests');
 $failure=false;$job['nextAt']=time()-1;update_option(FairgateWebhook::QUEUE,$job,false);$concurrent=true;$receiver->process();
 hook_check(!empty(get_option(FairgateWebhook::QUEUE)),'Notification received during fetch is not lost');
 $job=get_option(FairgateWebhook::QUEUE);$job['nextAt']=time()-1;update_option(FairgateWebhook::QUEUE,$job,false);$receiver->process();
 hook_check(!get_option(FairgateWebhook::QUEUE)&&FairgateWebhook::status()['lastErrorAt']===null,'Recovery clears queue and error state');
 hook_check(!str_contains(wp_json_encode(FairgateWebhook::status()),STRC_FAIRGATE_WEBHOOK_SECRET),'Diagnostics contain no URL capability');
 try{$client->updateContact('fixture-token',$contactId,['gender'=>'male']);throw new RuntimeException('Write unexpectedly allowed');}catch(SwissTRClub\Core\Integrations\Fairgate\FairgateApiException$e){hook_check(str_contains($e->getMessage(),'schreibgeschützt'),'Staging contact writes remain blocked');}
 hook_check($mail===0&&$network===0,'No real email or external HTTP requests');
 echo wp_json_encode(['passed'=>count($checks),'checks'=>$checks,'externalRequests'=>$network,'mails'=>$mail]);
}finally{
 wp_clear_scheduled_hook(FairgateWebhook::WORK);wp_clear_scheduled_hook(FairgateWebhook::WATCH);delete_transient($config->cacheKey());
 foreach($old as$k=>$v){if($v===null)delete_option($k);else update_option($k,$v,false);}
 if(is_int($id)&&$id){$wpdb->delete($wpdb->prefix.'strc_memberships',['user_id'=>$id]);require_once ABSPATH.'wp-admin/includes/user.php';wp_delete_user($id);}
}

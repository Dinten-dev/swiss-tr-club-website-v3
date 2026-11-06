<?php
if(home_url()!=='https://staging.swisstrclub.ch'||wp_get_environment_type()!=='staging')throw new RuntimeException('Wrong environment');
if(class_exists('SwissTRClub\\Core\\Plugin',false))throw new RuntimeException('Use --skip-plugins=strc-core');
require rtrim(getenv('STRC_QA_PLUGIN'),'/').'/strc-core.php';
use SwissTRClub\Core\Members\MembershipRepository;
use SwissTRClub\Core\Members\MemberProfile;
use SwissTRClub\Core\Forms\FormStore;
use SwissTRClub\Core\Integrations\Fairgate\FairgateConfiguration;
global $wpdb,$checks;$prefix='strc_copilot_qa_'.bin2hex(random_bytes(5));$uid=0;$calls=[];$checks=[];$httpStatus=200;
function copilot_check(bool $ok,string $label):void{global $checks;$checks[]=['check'=>$label,'passed'=>$ok];if(!$ok)throw new RuntimeException($label);}
add_filter('pre_wp_mail',static fn()=>true,1);
add_filter('pre_http_request',static function($pre,$args,$url)use(&$calls,&$httpStatus){$calls[]=['method'=>$args['method']??'GET','body'=>json_decode($args['body']??'',true)];return ['headers'=>[],'body'=>'{"data":{}}','response'=>['code'=>$httpStatus,'message'=>'synthetic'],'cookies'=>[]];},1,3);
$config=FairgateConfiguration::fromConstants();add_filter('pre_transient_'.$config->cacheKey(),static fn()=>['token'=>'synthetic-token','expires_at'=>time()+600],1);
FormStore::register();
try{
 $id=wp_insert_user(['user_login'=>$prefix,'user_pass'=>wp_generate_password(40,true,true),'user_email'=>$prefix.'@example.invalid','first_name'=>'QA','last_name'=>'Fixture','role'=>'strc_member']);if(is_wp_error($id))throw new RuntimeException('Synthetic user failed');$uid=(int)$id;(new MembershipRepository())->syncUser($uid);$table=$wpdb->prefix.'strc_memberships';$fakeContact='999999991';$wpdb->update($table,['fairgate_contact_id'=>$fakeContact,'membership_type'=>'individual','status'=>'active'],['user_id'=>$uid]);
 foreach(['street'=>'QA 1','postcode'=>'3000','city'=>'Bern','country'=>'CH']as$k=>$v)update_user_meta($uid,'strc_'.$k,$v);
 $cp=['first_name'=>'Test','last_name'=>'Copilot','gender'=>'female','birth_date'=>'1990-02-28','email'=>$prefix.'_copilot@example.invalid','phone'=>'+41790000001','street'=>'QA 1','postcode'=>'3000','city'=>'Bern','country'=>'CH','language'=>'fr','salutation'=>'Frau'];
 $profile=MemberProfile::create();$profile->savePerson($uid,$cp,true);
 $keyset=array_keys($calls[0]['body']['configured_fields']??[]);sort($keyset);$expected=['co_pilot_in_email','co_pilot_in_handy','co_pilot_in_nachname','co_pilot_in_vorname'];sort($expected);
 copilot_check(count($calls)===1&&$calls[0]['method']==='PUT'&&$keyset===$expected,'Only the four approved fields are sent to the intercepted transport');
 copilot_check(!empty(get_user_meta($uid,'strc_copilot',true)['pendingSync']),'Unmapped values remain pending');
 $forms=FormStore::find('strc_form',$uid);copilot_check(count($forms)===1&&FormStore::data($forms[0])['payload']['birth_date']==='1990-02-28','The manual request retains the birth date');
 $profile->requestCouple($uid);copilot_check(!empty(get_user_meta($uid,'strc_copilot',true)['pendingSync']),'The couple request does not erase pending values');
 copilot_check(count($calls)===2,'Both requests remained inside the intercepted transport');
 $httpStatus=403;$cp['phone']='+41790000002';$result=$profile->savePerson($uid,$cp,true);copilot_check(count($calls)===3&&!empty(get_user_meta($uid,'strc_copilot',true)['pendingSync'])&&str_contains($result['message'],'Mitgliederverwaltung'),'Denied Fairgate writes remain pending for manual handling');
}finally{
 wp_set_current_user(0);if($uid){$u=get_userdata($uid);if(!$u||$u->user_login!==$prefix)throw new RuntimeException('Fixture identity changed');foreach(FormStore::find('strc_form',$uid)as$p)wp_delete_post($p->ID,true);$wpdb->delete($wpdb->prefix.'strc_memberships',['user_id'=>$uid]);require_once ABSPATH.'wp-admin/includes/user.php';wp_delete_user($uid);}
}
echo wp_json_encode(['checks'=>$checks,'syntheticUserRemoved'=>!get_user_by('login',$prefix),'networkIntercepted'=>true]);

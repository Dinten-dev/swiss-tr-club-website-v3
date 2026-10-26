<?php
/** Isolated WordPress regression checks; never send mail or contact external APIs. */
if(home_url()!=='https://staging.swisstrclub.ch'||wp_get_environment_type()!=='staging')throw new RuntimeException('Staging required');
if(class_exists('SwissTRClub\\Core\\Plugin',false))throw new RuntimeException('Use --skip-plugins=strc-core');
require rtrim(getenv('STRC_QA_PLUGIN'),'/').'/strc-core.php';
if(!defined('DOING_AJAX'))define('DOING_AJAX',true);
use SwissTRClub\Core\Members\MemberProfile;
use SwissTRClub\Core\Members\MembershipRepository;
use SwissTRClub\Core\Forms\FormStore;
use SwissTRClub\Core\Roles\RoleAssignments;
use SwissTRClub\Core\Community\LibraryPolicy;
global $wpdb,$checks;
$checks=[];$users=[];$posts=[];$mail=[];$network=0;$prefix='strc_oct20_qa_'.bin2hex(random_bytes(5));
function oct_check(bool $ok,string $name):void{global $checks;$checks[]=['check'=>$name,'passed'=>$ok];if(!$ok)throw new RuntimeException($name);}
function oct_call(object $object,string $method,...$args):mixed{return (new ReflectionMethod($object,$method))->invoke($object,...$args);}
function oct_user(int $id):void{wp_set_current_user(0);wp_set_current_user($id);}
function oct_capture(callable $run):array{ob_start();try{$value=$run();ob_end_clean();return ['value'=>$value];}catch(RuntimeException $e){$body=ob_get_clean();if($e->getMessage()==='OCT QA stop')return json_decode($body,true)?:[];throw $e;}}
function oct_throws(callable $run,int $code):bool{try{$run();return false;}catch(RuntimeException $e){return $e->getCode()===$code;}}
add_filter('wp_die_ajax_handler',static fn()=>static function(){throw new RuntimeException('OCT QA stop');});
add_filter('wp_die_handler',static fn()=>static function(){throw new RuntimeException('OCT QA stop');});
add_filter('pre_wp_mail',static function($return,$attributes)use(&$mail){$mail[]=$attributes;return true;},10,2);
add_filter('pre_http_request',static function()use(&$network){$network++;return new WP_Error('qa','External HTTP blocked');});
SwissTRClub\Core\Roles\RoleManager::install();FormStore::register();
foreach(['strc_ad','strc_album','strc_document','strc_topic','strc_event']as$type)if(!post_type_exists($type))register_post_type($type,['public'=>false]);
try{
 foreach(['owner'=>['strc_member'],'other'=>['strc_member'],'staff'=>['strc_member','strc_marketplace_moderator','strc_gallery_moderator','strc_forum_moderator','strc_library_administrator','strc_registration_moderator','strc_event_organiser'],'admin'=>['strc_member','strc_administrator']]as$name=>$roles){
  $id=wp_insert_user(['user_login'=>$prefix.'_'.$name,'user_pass'=>wp_generate_password(40,true,true),'user_email'=>$prefix.'_'.$name.'@example.invalid','first_name'=>'QA','last_name'=>$name,'role'=>'strc_member']);if(is_wp_error($id))throw new RuntimeException('Fixture creation failed');$users[$name]=(int)$id;foreach($roles as$role)(new WP_User($id))->add_role($role);(new MembershipRepository())->syncUser($id);
  foreach(['phone'=>'+41790000000','street'=>'QA 1','postcode'=>'3000','city'=>'Bern','country'=>'Schweiz','language'=>'de']as$key=>$value)update_user_meta($id,'strc_'.$key,$value);
 }
 add_action('pre_get_users',static function($query)use(&$users){$query->set('include',array_values($users));});
 foreach(['add_user_metadata','update_user_metadata','delete_user_metadata']as$hook)add_filter($hook,static fn($value,$id)=>in_array((int)$id,$users,true)?$value:true,10,2);
 $owner=$users['owner'];$other=$users['other'];$staff=$users['staff'];$admin=$users['admin'];oct_user($owner);
 $profile=MemberProfile::create();$read=$profile->read($owner);oct_check($read['mode']==='single'&&$read['canEdit']&&!$read['fairgateWrite'],'Single profile editable and Fairgate writes disabled on staging');
 $person=['email'=>get_userdata($owner)->user_email,'phone'=>'+41790000000','street'=>'QA 1','postcode'=>'3000','city'=>'Basel','country'=>'Schweiz','language'=>'fr','salutation'=>'Herr','first_name'=>'FORGED','birth_date'=>'2099-01-01'];
 $profile->savePerson($owner,$person,false);$read=$profile->read($owner);oct_check($read['person']['values']['city']==='Basel'&&$read['person']['pending']!==null,'Profile changes remain visible while awaiting Fairgate');
 oct_check(get_user_meta($owner,'first_name',true)==='QA'&&$read['person']['values']['first_name']==='QA','Locked identity cannot be changed through profile payload');
 $person['city']='Luzern';$profile->savePerson($owner,$person,false);$forms=FormStore::find('strc_form',$owner);$states=array_map(static fn($p)=>FormStore::data($p)['state'],$forms);oct_check(count(array_filter($states,static fn($s)=>$s==='pending_review'))===1&&in_array('superseded',$states,true),'New profile request supersedes stale pending request');
 $person['city']='Bern';$person['language']='de';$person['salutation']='';$profile->savePerson($owner,$person,false);oct_check($profile->read($owner)['person']['values']['city']==='Bern','Reverting profile does not resurrect an older requested address');
 $cp=['first_name'=>'Test','last_name'=>'Copilot','gender'=>'female','birth_date'=>'1990-02-28','email'=>$prefix.'_copilot@example.invalid','phone'=>'+41790000001','street'=>'QA 1','postcode'=>'3000','city'=>'Bern','country'=>'Schweiz','language'=>'fr','salutation'=>'Frau'];
 $profile->savePerson($owner,$cp,true);$read=$profile->read($owner);oct_check($read['copilot']['kind']==='guest'&&$read['copilot']['values']['phone']===$cp['phone'],'Guest copilot persists complete contact details');
 oct_check(MemberProfile::eventCopilot($owner)===['firstName'=>'Test','lastName'=>'Copilot'],'Event registration receives guest copilot prefill');
 $before=count($mail);$profile->requestCouple($owner);oct_check(MemberProfile::coupleRequest($owner)['state']==='pending'&&count($mail)===$before+1,'Couple request persists and emits one intercepted Aktuar email');
 oct_check(oct_throws(fn()=>$profile->requestCouple($owner),409),'Duplicate couple request rejected');
 update_user_meta($owner,'strc_copilot_fairgate',$cp);MemberProfile::guestCopilot($owner);oct_check(get_user_meta($owner,'strc_copilot',true)['pendingSync']===false,'Completed Fairgate copilot sync clears pending override');
 $cp['city']='Lausanne';update_user_meta($owner,'strc_copilot_fairgate',$cp);oct_check(MemberProfile::guestCopilot($owner)['values']['city']==='Lausanne','Subsequent Fairgate copilot changes remain authoritative');
 $wpdb->update($wpdb->prefix.'strc_memberships',['membership_type'=>'couple_primary','partner_user_id'=>$other],['user_id'=>$owner]);$wpdb->update($wpdb->prefix.'strc_memberships',['membership_type'=>'couple_partner','partner_user_id'=>$owner],['user_id'=>$other]);
 oct_check($profile->read($owner)['couple']['state']==='active','Reciprocal active couple links activate the request');oct_check($profile->read($other)['mode']==='partner'&&!$profile->read($other)['canEdit'],'Partner profile remains read-only');
 oct_check(oct_throws(fn()=>$profile->savePerson($other,$person,false),403),'Partner cannot bypass read-only profile through API');
 $wpdb->update($wpdb->prefix.'strc_memberships',['membership_type'=>'individual'],['user_id'=>$other]);oct_check(MemberProfile::household($owner)['mode']==='single','Inconsistent household does not reveal an unrelated member as copilot');
 $wpdb->update($wpdb->prefix.'strc_memberships',['membership_type'=>'individual','partner_user_id'=>0],['user_id'=>$owner]);$wpdb->update($wpdb->prefix.'strc_memberships',['partner_user_id'=>0],['user_id'=>$other]);
 $dashboard=new SwissTRClub\Core\Dashboard\MemberDashboardEndpoint();$wanted=['print'=>'0','newsletter'=>'1'];oct_call($dashboard,'requestSubscriptions',$wanted);oct_call($dashboard,'requestSubscriptions',$wanted);
 $subscriptions=array_filter(FormStore::find('strc_form',$owner),static fn($p)=>(FormStore::data($p)['kind']??'')==='subscription');oct_check(count($subscriptions)===1,'Repeated subscription change does not duplicate inbox request');
 oct_call($dashboard,'requestSubscriptions',['print'=>'1','newsletter'=>'1']);oct_check(!get_user_meta($owner,'strc_subscription_request',true)&&FormStore::data(get_post(reset($subscriptions)->ID))['state']==='superseded','Cancelling subscription change prevents stale inbox processing');
 $ads=new SwissTRClub\Core\Marketplace\MarketplaceEndpoint();$input=['title'=>$prefix.' parts','description'=>'Fixture','price'=>'100','category'=>'Teile','condition'=>'Gut','location'=>'Bern','model'=>'TR6'];$_FILES=[];
 $ad=$ads->createAd($input,[]);oct_check(!is_wp_error($ad)&&$ad['status']==='publish','Ordinary parts advertisement publishes immediately');$posts[]=$ad['id'];
 $car=$input;$car['category']='Fahrzeuge';$car['title']=$prefix.' car';$car['year']='1972';$ad=$ads->createAd($car,[]);oct_check(!is_wp_error($ad)&&$ad['status']==='pending','Ordinary vehicle advertisement requires review');$posts[]=$ad['id'];
 $denied=$ads->createAd($car+['onBehalfOf'=>(string)$other],[]);oct_check(is_wp_error($denied),'Ordinary member cannot create a service advertisement');
 oct_user($staff);$service=$ads->createAd($car+['onBehalfOf'=>(string)$owner],[]);oct_check(!is_wp_error($service)&&$service['status']==='publish'&&(int)get_post($service['id'])->post_author===$owner,'Marketplace service publishes reviewed car for selected member');$posts[]=$service['id'];
 oct_check((int)get_post_meta($service['id'],'strc_ad_expires_at',true)>time()+89*DAY_IN_SECONDS&&get_post_meta($service['id'],'strc_ad_service',true)['by']===$staff,'Service ownership audit and ninety-day expiry preserved');
 oct_user($other);$view=oct_call($ads,'present',$service['id']);oct_check($view['service']==='','Service actor identity hidden from unrelated members');
 oct_user($owner);$view=oct_call($ads,'present',$service['id']);oct_check($view['mine']&&$view['service']!=='','Selected member owns service ad and sees service audit');
 oct_check(!is_wp_error(oct_call($ads,'changeAd','withdraw',['id'=>$service['id']])),'Selected member can withdraw service ad');
 oct_user($staff);$wpdb->delete($wpdb->prefix.'strc_memberships',['user_id'=>$other]);$denied=$ads->createAd($car+['onBehalfOf'=>(string)$other],[]);oct_check(is_wp_error($denied),'Service target must have an active membership record');(new MembershipRepository())->syncUser($other);
 $community=new SwissTRClub\Core\Community\CommunityEndpoint();oct_user($owner);$result=oct_capture(fn()=>oct_call($community,'savePortrait',['owner'=>'QA','vehicle'=>'TR6']));oct_check(($result['success']??true)===false,'Member portrait creation restricted to gallery editorial team');
 oct_user($admin);$rows=[['role'=>'strc_board_member','regions'=>[],'assignedEvents'=>[],'areas'=>[],'libraryAccess'=>'restricted']];$assigned=oct_capture(fn()=>RoleAssignments::save($other,['revision'=>RoleAssignments::revision($other),'assignments'=>wp_json_encode($rows)]));oct_check(isset($assigned['value'])&&user_can($other,'strc_access_board_documents'),'Administrator may assign board document role');
 oct_user($other);oct_check(in_array('restricted',LibraryPolicy::classes(),true),'Board role grants board document tier');
 oct_user($staff);oct_check(in_array('limited',LibraryPolicy::classes(),true)&&!in_array('restricted',LibraryPolicy::classes(),true),'Operational function grants moderator tier without board access');
 $event=wp_insert_post(['post_type'=>'strc_event','post_status'=>'publish','post_title'=>$prefix.' event','post_author'=>$staff]);$posts[]=$event;update_post_meta($event,'strc_start_at',gmdate('c',time()+30*DAY_IN_SECONDS));update_post_meta($event,'strc_registration_required',true);
 oct_user($owner);$settings=SwissTRClub\Core\Forms\EventRegistration::settings($event);$settings=array_replace($settings,['vehicle'=>false,'fee'=>10000,'copilotFee'=>9000,'guestFee'=>12000,'guestCopilotFee'=>11000]);$registration=new SwissTRClub\Core\Forms\EventRegistration();
 $crew=[['copilot'=>['type'=>'guest','firstName'=>'Test','lastName'=>'Copilot']],['pilot'=>['firstName'=>'Extra','lastName'=>'Guest'],'copilot'=>['type'=>'guest','firstName'=>'Extra','lastName'=>'Copilot']]];
 $submission=oct_call($registration,'submission',get_post($event),$settings,['crews'=>wp_json_encode($crew)]);oct_check($submission['total']===44000&&$submission['headcount']===4,'Crew pricing distinguishes member guest and both copilot rates');
 $settings['weekend']=true;$settings['feeDouble']=7000;$settings['guestCopilotFeeDouble']=8000;$crew=[['room'=>'double','copilot'=>['type'=>'guest','firstName'=>'Test','lastName'=>'Copilot']]];$submission=oct_call($registration,'submission',get_post($event),$settings,['crews'=>wp_json_encode($crew)]);oct_check($submission['total']===15000&&$submission['room']==='Doppelzimmer','Weekend double-room pricing applied per person');
 $submission=oct_call($registration,'submission',get_post($event),$settings,['crews'=>'[{}]']);oct_check($submission['total']===10000&&$submission['room']==='Einzelzimmer','Single member receives single-room pricing');
 $writer=new SwissTRClub\Core\Integrations\Fairgate\FairgateProfileWriter(['enabled'=>true,'fields'=>['phone'=>'mobile']]);oct_check(!$writer->write('123','fields',['phone'=>'+41790000000'])&&$network===0,'Even enabled profile writer cannot write to Fairgate on staging');
 oct_check(oct_call(new SwissTRClub\Core\Community\ForumSettings(),'notifyWhatsApp',$staff,'test','Fixture',home_url('/#forum'),false)==='disabled'&&$network===0,'Unconfigured WhatsApp stays disabled without external requests');
 $directory=new SwissTRClub\Core\Members\MemberDirectoryEndpoint();update_user_meta($owner,'strc_website_preferences',['directory'=>false]);oct_check(!oct_call($directory,'visible',$owner),'Existing directory opt-out is respected');
 oct_user($owner);$_FILES=[];oct_call(new SwissTRClub\Core\Forms\FormsEndpoint(),'preferences',[]);oct_check(get_user_meta($owner,'strc_website_preferences',true)['directory']===false,'Saving a profile photo keeps the stored preference unchanged');
 $contactId=(string)(99000000+$owner);$wpdb->update($wpdb->prefix.'strc_memberships',['fairgate_contact_id'=>$contactId],['user_id'=>$owner]);
 $original=FormStore::save('strc_vehicle',['model'=>'TR6','year'=>'1972','status'=>'roadworthy','chassisNumber'=>'QA-VIN-1','notes'=>'Preserve website edit','file'=>['key'=>'fixture-original-photo']],$owner);$posts[]=$original;$originalHash=FormStore::revision(get_post($original));
 $import=new SwissTRClub\Core\Integrations\Fairgate\FairgateVehicleImport([['model'=>'/cars/0/model','year'=>'/cars/0/year','chassisNumber'=>'/cars/0/chassis'],['model'=>'/cars/1/model','year'=>'/cars/1/year','chassisNumber'=>'/cars/1/chassis']]);
 $contacts=[['basefields'=>['contact_id'=>$contactId],'cars'=>[['model'=>'TR6','year'=>'1972','chassis'=>'QA-VIN-1'],['model'=>'TR4','year'=>'1965','chassis'=>'QA-VIN-2']]]];$plan=$import->plan($contacts);oct_check(array_column($plan,'action')===['matching-existing','create'],'Fairgate vehicle preview skips existing VIN and plans only a new vehicle');
 oct_user($staff);$applied=$import->apply($contacts);foreach($applied as$row)if(isset($row['postId']))$posts[]=$row['postId'];oct_check(FormStore::revision(get_post($original))===$originalHash,'Additive vehicle import preserves website data and photo');
 $again=$import->apply($contacts);oct_check(!in_array('create',array_column($again,'action'),true)&&count(FormStore::find('strc_vehicle',$owner))===2,'Repeating vehicle import creates no duplicate');
 $bad=$contacts;unset($bad[0]['cars'][1]['chassis']);oct_check(in_array('missing-fields',array_column($import->plan($bad),'action'),true),'Unavailable vehicle API fields are reported explicitly');
 $wpdb->update($wpdb->prefix.'strc_memberships',['membership_type'=>'couple_primary','partner_user_id'=>$other],['user_id'=>$owner]);$wpdb->update($wpdb->prefix.'strc_memberships',['membership_type'=>'couple_partner','partner_user_id'=>$owner],['user_id'=>$other]);
 update_user_meta($owner,'strc_fairgate_import_source','fairgate-readonly');update_user_meta($owner,'strc_fairgate_contact_id',$contactId);
 $configuration=SwissTRClub\Core\Integrations\Fairgate\FairgateConfiguration::fromConstants();$gateway=new SwissTRClub\Core\Integrations\Fairgate\FairgateGateway(new SwissTRClub\Core\Integrations\Fairgate\FairgateClient($configuration),$configuration);$memberImport=new SwissTRClub\Core\Integrations\Fairgate\FairgateStagingImport($gateway);
 oct_call($memberImport,'persist',['id'=>$contactId,'email'=>get_userdata($owner)->user_email,'first_name'=>'QA','last_name'=>'owner','name'=>'QA owner','label'=>'Einzelmitglied','type'=>'individual','status'=>'active','profile'=>[]]);oct_check(MemberProfile::household($owner)['mode']==='primary','Read-only Fairgate refresh preserves a manually verified couple household');
}finally{
 wp_set_current_user(0);foreach($posts as$id)wp_delete_post($id,true);require_once ABSPATH.'wp-admin/includes/user.php';foreach($users as$id){foreach(FormStore::find('strc_form',$id)as$p)wp_delete_post($p->ID,true);$wpdb->delete($wpdb->prefix.'strc_memberships',['user_id'=>$id]);wp_delete_user($id);}
}
echo wp_json_encode(['checks'=>$checks,'fixtureUsersRemoved'=>count($users),'interceptedEmails'=>count($mail),'externalRequests'=>$network]);

<?php
/** Disposable Staging fixtures only. All mail and external HTTP are intercepted. */
if (!defined('WP_CLI') || !WP_CLI || wp_get_environment_type() !== 'staging') throw new RuntimeException('Staging QA only');
if (class_exists('SwissTRClub\\Core\\Plugin', false)) throw new RuntimeException('Skip canonical core');
define('DOING_AJAX', true);
require getenv('STRC_QA_PLUGIN').'/strc-core.php';
require __DIR__.'/role-overlay.php';
require getenv('STRC_QA_THEME').'/functions.php';
use SwissTRClub\Core\Forms\{FormStore,EventFinance,EventRegistration};
use SwissTRClub\Core\Members\{MembershipRepository,MemberProfile,MemberDirectoryEndpoint};
use SwissTRClub\Core\Integrations\Fairgate\{FairgateClient,FairgateConfiguration,FairgateGateway,FairgateStagingImport,FairgateVehicleImport};
final class P37Halt extends Error {}
global $checks; $checks=[];$users=[];$posts=[];$fixtureImportLogins=[];$mails=[];$network=0;$prefix='strc_pr3237_qa_'.bin2hex(random_bytes(4));global $wpdb;
function p37check(bool $ok,string $label): void { global $checks;if(!$ok)throw new RuntimeException($label);$checks[]=$label; }
function p37user(int $id): void { wp_set_current_user(0);wp_set_current_user($id); }
function p37capture(callable $fn): array { ob_start();try{$result=$fn();ob_end_clean();return ['value'=>$result];}catch(P37Halt $e){$raw=ob_get_clean();return json_decode($raw,true,512,JSON_THROW_ON_ERROR);} }
function p37contact(int $id,string $email,string $label='Einzelmitglied',string $number=''): array {
    return ['basefields'=>['contact_id'=>$id,'contact_type'=>'singleperson','first_name'=>'QA','last_name'=>'Fixture','gender'=>'male','correspondence_language'=>'de'],'communication'=>['primary_email'=>$email,'mobile'=>'+41790000000'],'membership'=>['membership'=>$label,'first_joining_date'=>'2020-01-01'],'status'=>'active','corr_address'=>['city'=>'Bern','street'=>'QA 1','postale_code'=>'3000','country'=>'Schweiz'],'configured_fields'=>['mitglieder_nummer'=>$number,'region'=>'Bern','geburtsdatum'=>'1980-02-29','t_r_magazin'=>'Nein','e_newsletter'=>'','co_pilot_in_vorname'=>'Anna','co_pilot_in_nachname'=>'Fixture','co_pilot_in_geburtsdatum'=>'1982-01-01']];
}
add_filter('wp_die_ajax_handler',static fn()=>static function(){throw new P37Halt();});
add_filter('wp_die_handler',static fn()=>static function(){throw new P37Halt();});
add_filter('pre_wp_mail',static function($return,$attributes)use(&$mails){$mails[]=$attributes;return true;},10,2);
add_filter('pre_http_request',static function()use(&$network){$network++;return new WP_Error('qa','Blocked');});
SwissTRClub\Core\Roles\RoleManager::install();FormStore::register();
if(!post_type_exists('strc_event'))register_post_type('strc_event',['public'=>false]);
try {
    foreach(['member'=>[],'partner'=>[],'other'=>[],'finance'=>['strc_treasurer'],'staff'=>['strc_registration_moderator'],'web'=>['strc_developer']] as $name=>$roles){
        $id=wp_insert_user(['user_login'=>$prefix.'_'.$name,'user_email'=>$prefix.'_'.$name.'@example.invalid','user_pass'=>wp_generate_password(40),'first_name'=>'QA','last_name'=>$name,'role'=>'strc_member']);
        if(is_wp_error($id))throw new RuntimeException('Fixture failed');$users[$name]=(int)$id;foreach($roles as$r)(new WP_User($id))->add_role($r);(new MembershipRepository())->syncUser($id);
    }
    add_action('pre_get_users',static function($q)use(&$users){$q->set('include',array_values($users));});
    foreach(['add_user_metadata','update_user_metadata','delete_user_metadata']as$hook)add_filter($hook,static function($return,$id)use(&$users,$prefix,$wpdb,&$fixtureImportLogins){$login=(string)$wpdb->get_var($wpdb->prepare("SELECT user_login FROM {$wpdb->users} WHERE ID=%d",$id));return in_array((int)$id,$users,true)||str_starts_with($login,$prefix)||in_array($login,$fixtureImportLogins,true)?$return:true;},10,2);
    $table=$wpdb->prefix.'strc_memberships';$owner=$users['member'];$partner=$users['partner'];$repo=new MembershipRepository();p37user($users['staff']);
    $base=990370000+$owner;$contact=p37contact($base,get_userdata($owner)->user_email,'Einzelmitglied','QA37-'.$owner);
    $wpdb->update($table,['fairgate_contact_id'=>(string)$base],['user_id'=>$owner]);update_user_meta($owner,'strc_fairgate_contact_id',(string)$base);update_user_meta($owner,'strc_fairgate_import_source','fairgate-readonly');update_user_meta($owner,'strc_fairgate_verified_existing_user',(string)$owner);
    $cfg=FairgateConfiguration::fromConstants();$import=new FairgateStagingImport(new FairgateGateway(new FairgateClient($cfg),$cfg));$plan=$import->plan([$contact]);
    p37check($plan[0]['action']==='update'&&$plan[0]['member_number']==='QA37-'.$owner,'Verified existing member and official number are previewed');
    p37check($plan[0]['region']==='Bern'&&$plan[0]['extras']['person']['birth_date']==='1980-02-29','Region and birthday use confirmed fields');
    p37check($plan[0]['extras']['print']===false&&!isset($plan[0]['extras']['newsletter']),'Explicit magazine No mapped; empty newsletter stays unknown');
    p37check($plan[0]['extras']['copilot']['birth_date']==='1982-01-01','Co-pilot birthday mapped');
    $duplicate=p37contact($base+1,$prefix.'_new@example.invalid','Einzelmitglied','QA37-'.$owner);$dup=$import->plan([$contact,$duplicate]);
    p37check(!isset($dup[0]['member_number'],$dup[1]['member_number'])&&isset($dup[0]['memberNumberIssue'],$dup[1]['memberNumberIssue']),'Duplicate source numbers detected before writes');
    $result=$import->apply([$contact],true);$row=$repo->findForUser($owner);
    p37check($result[0]['action']==='update'&&$row['member_number']==='QA37-'.$owner&&$row['region']==='Bern','Previewed official number and region persist');
    p37check(get_user_meta($owner,'strc_subscription_print',true)==='0'&&get_user_meta($owner,'strc_birth_date',true)==='1980-02-29','Mapped subscription and birthday persist');
    foreach([$base+2,$base+3]as$fixtureContact){$login='strc_fg_'.$fixtureContact;if(username_exists($login))throw new RuntimeException('Fixture import login exists');$fixtureImportLogins[]=$login;}
    $new=p37contact($base+2,$prefix.'_import@example.invalid','Paarmitglied','');
    $new['basefields']['contact_id']=$base+2;
    $newResult=$import->apply([$new]);$newId=(int)$newResult[0]['userId'];$users['imported']=$newId;
    update_user_meta($newId,'strc_fairgate_import_source','fairgate-readonly');update_user_meta($newId,'strc_fairgate_contact_id',(string)($base+2));
    p37check($repo->findForUser($newId)['membership_type']==='couple_primary'&&MemberProfile::household($newId)['mode']==='single','Unlinked Fairgate couple contact receives no guessed partner');
    p37check(get_user_meta($newId,'strc_fairgate_number_pending',true)==='1','Missing official number retains pending marker');
    $newNumber=p37contact($base+3,$prefix.'_number@example.invalid','Einzelmitglied','QA37-NEW-'.$owner);$r=$import->apply([$newNumber]);$users['numbered']=(int)$r[0]['userId'];
    p37check($repo->findForUser($users['numbered'])['member_number']==='QA37-NEW-'.$owner,'New official number is used instead of placeholder');
    p37check(MemberProfile::household($owner)['mode']==='single'&&count($mails)===0,'Import without an approved pair request sends no mail or shares data');
    $original=FormStore::save('strc_vehicle',['model'=>'TR6','year'=>'1972','status'=>'roadworthy','chassisNumber'=>'QA37-VIN','notes'=>'Keep website edit','file'=>['key'=>'fixture-photo']],$owner);$posts[]=$original;$hash=FormStore::revision(get_post($original));
    $vehicles=new FairgateVehicleImport([['model'=>'/car/model','year'=>'/car/year','chassisNumber'=>'/car/vin']]);$car=$contact;$car['car']=['model'=>'TR4A IRS','year'=>'196?','vin'=>'QA37-NEW-VIN'];
    $vehiclePlan=$vehicles->plan([$car]);p37check($vehiclePlan[0]['action']==='create'&&$vehiclePlan[0]['vehicle']['model']==='TR4A'&&$vehiclePlan[0]['vehicle']['year']==='','Vehicle preview normalizes variant and unknown year');
    $applied=$vehicles->apply([$car]);$posts[]=(int)$applied[0]['postId'];$again=$vehicles->apply([$car]);
    p37check($again[0]['action']==='already-imported'&&FormStore::revision(get_post($original))===$hash,'Vehicle import is idempotent and preserves website edits/photos');
    $car['car']=['model'=>'kein TR','year'=>'','vin'=>''];$no=$vehicles->apply([$car]);p37check($no[0]['action']==='no-tr'&&(bool)get_user_meta($owner,'strc_fairgate_no_tr',true),'No TR stored as member note without deleting vehicles');
    $car['car']['model']='MGB';$review=$vehicles->apply([$car]);p37check($review[0]['action']==='review'&&count(FormStore::find('strc_vehicle',$owner))===2,'Unknown model stays for review without deleting existing vehicles');
    update_user_meta($owner,'strc_website_preferences',['directory'=>false]);p37check(!MemberDirectoryEndpoint::visible($owner),'Prior directory opt-out remains effective');
    $request=['state'=>'pending','formId'=>0];$form=FormStore::intake('couple',['member'=>['name'=>'QA Member'],'copilot'=>['first_name'=>'Anna','last_name'=>'Fixture','email'=>get_userdata($partner)->user_email],'fee'=>'CHF 160.–'],wp_generate_uuid4(),$owner);$posts[]=$form;$request['formId']=$form;update_user_meta($owner,'strc_couple_request',$request);
    MemberProfile::activateCouple($owner,$request);p37check(get_user_meta($owner,'strc_couple_request',true)['state']==='pending'&&count($mails)===0,'Individual membership cannot activate pair request');
    $wpdb->update($table,['membership_type'=>'couple_primary'],['user_id'=>$owner]);$wpdb->update($table,['membership_type'=>'couple_partner'],['user_id'=>$partner]);
    MemberProfile::activateCouple($owner,$request);$house=MemberProfile::household($owner);
    p37check($house['mode']==='primary'&&$house['partner']===$partner&&MemberProfile::household($partner)['primary']===$owner,'Both confirmed couple records link reciprocally');
    p37check(FormStore::data(get_post($form))['state']==='completed'&&get_user_meta($owner,'strc_couple_request',true)['state']==='active','Pair request completes after confirmed membership change');
    p37check(count($mails)===2,'Member and treasurer notifications intercepted exactly once');
    MemberProfile::activateCouple($owner,$request);p37check(count($mails)===2,'Repeated synchronization does not send duplicate confirmations');
    p37check(!$repo->linkCouple($owner,$users['other'])&&MemberProfile::household($owner)['partner']===$partner,'Existing partner cannot be replaced by another account');
    $wrong=$request;$wrong['formId']=$form;MemberProfile::activateCouple($users['other'],$wrong);p37check(!get_user_meta($users['other'],'strc_couple_request',true),'Other account cannot activate someone else’s pair request');
    $event=wp_insert_post(['post_type'=>'strc_event','post_status'=>'publish','post_author'=>$users['staff'],'post_title'=>$prefix.' event']);$posts[]=$event;update_post_meta($event,'strc_registration_required','1');update_post_meta($event,'strc_start_at',gmdate(DATE_ATOM,time()+86400));
    $_SERVER['REQUEST_METHOD']='GET';$_GET=['operation'=>'events'];p37user($owner);$denied=p37capture(fn()=>(new EventFinance())->respond());p37check(($denied['success']??true)===false,'Ordinary member denied treasury event lists');
    p37user($users['web']);$denied=p37capture(fn()=>(new EventFinance())->respond());p37check(($denied['success']??true)===false,'Technical webmaster denied treasury event lists');
    p37user($users['finance']);$_GET=['operation'=>'events','search'=>$prefix];$events=p37capture(fn()=>(new EventFinance())->respond());p37check(($events['success']??false)&&count($events['data']['events'])===1,'Treasurer can read filtered registration event list');
    $_GET=['operation'=>'list','eventId'=>(string)$event];$list=p37capture(fn()=>(new EventFinance())->respond());p37check(($list['success']??false)&&$list['data']['canReconcile']&&!$list['data']['canPromote'],'Treasurer reads/reconciles without becoming event organiser');
    $_SERVER['REQUEST_METHOD']='POST';$_POST=['operation'=>'promote','eventId'=>(string)$event,'nonce'=>wp_create_nonce('strc_event_finance')];$denied=p37capture(fn()=>(new EventFinance())->respond());p37check(($denied['success']??true)===false,'Treasurer cannot promote the organiser’s waiting list');
    $locale=apply_filters('woocommerce_get_country_locale_default',[]);$locales=apply_filters('woocommerce_get_country_locale',[]);
    p37check(($locale['phone']['required']??false)&&($locales['CH']['phone']['required']??false),'WooCommerce JS locale keeps phone required for default and CH');
    p37check(str_contains($locale['phone']['label'],'Mobilnummer'),'JS locale preserves mobile label');
    p37check(!FairgateClient::copilotWriteAllowed(['configured_fields'=>['co_pilot_in_email'=>'test@example.invalid']]),'Staging Fairgate writes remain disabled without explicit switch');
    p37check($network===0,'No external API or message requests were made');
    echo wp_json_encode(['passed'=>count($checks),'checks'=>$checks,'interceptedMails'=>count($mails),'externalRequests'=>$network]);
} finally {
    wp_set_current_user(0);$_POST=[];$_GET=[];
    foreach($posts as$id)wp_delete_post($id,true);
    $fixtureIds=$wpdb->get_col($wpdb->prepare("SELECT ID FROM {$wpdb->users} WHERE user_login LIKE %s",$wpdb->esc_like($prefix).'%'));
    foreach($fixtureImportLogins as$login){$fixture=get_user_by('login',$login);if($fixture)$fixtureIds[]=$fixture->ID;}
    foreach(array_unique($fixtureIds) as$id){$wpdb->delete($wpdb->prefix.'strc_memberships',['user_id'=>$id]);require_once ABSPATH.'wp-admin/includes/user.php';wp_delete_user($id);}
}

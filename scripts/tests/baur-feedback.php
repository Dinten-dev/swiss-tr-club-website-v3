<?php
/** Isolated behavioral regression checks. No WordPress bootstrap, network, mail or club data. */
declare(strict_types=1);
namespace {if(defined('ABSPATH'))throw new \RuntimeException('Run this fixture without WordPress.');}
namespace SwissTRClub\Core\Editorial { final class EditorialAccess {public static function area(string $area):bool{return !empty($GLOBALS['capabilities']['review-'.$area]);}public static function html(string $html):string{return $html;}} }
namespace SwissTRClub\Core\Marketplace { final class AdDocuments {public static function present(int $id):array{return [];}} }
namespace SwissTRClub\Core\Community {
 final class LibraryPolicy {public static function canRead(int $id):bool{return $GLOBALS['libraryRead'];}public static function classification(int $id):string{return 'open';}}
 final class PrivateUploadStore {public function stream(array $file):never{throw new \StreamedFile($file['key']);}}
}
namespace SwissTRClub\Core\Http {final class AjaxRequest {public static function fail(string $message,int $code=400):never{throw new \RuntimeException($message,$code);}}}
namespace SwissTRClub\Core\Forms {final class FormStore {
 public static function find(string $type,int $owner=0,int $parent=0):array{return $GLOBALS['registrations'];}
 public static function data(object $post):array{return $GLOBALS['registrationData'][$post->ID];}
 public static function quota():void{}
 public static function locked(string $key,callable $callback):mixed{return $callback();}
}}
namespace SwissTRClub\Core\Members {final class MembershipRepository {public function findForUser(int $id):?array{return $GLOBALS['memberships'][$id]??null;}}}
namespace {
 if(defined('ABSPATH'))throw new RuntimeException('Run this fixture without WordPress.');
 const ARRAY_A='ARRAY_A';const DAY_IN_SECONDS=86400;
 class WP_Post {public function __construct(public int $ID,public string $post_type,public string $post_status='publish',public int $post_author=1,public string $post_title='QA',public string $post_content='') {}}
 class WP_Error {public function __construct(public string $code,public string $message,public array $data=[]){}public function get_error_message():string{return $this->message;}}
 class StreamedFile extends RuntimeException {}
 function is_wp_error(mixed $value):bool{return $value instanceof WP_Error;}
 function get_current_user_id():int{return $GLOBALS['currentUser'];}
 function current_user_can(string $cap):bool{return !empty($GLOBALS['capabilities'][$cap]);}
 function user_can(mixed $user,string $cap):bool{$id=is_object($user)?$user->ID:$user;return !empty($GLOBALS['users'][$id]->active);}
 function get_userdata(int $id):object|false{return $GLOBALS['users'][$id]??false;}
 function wp_get_current_user():object{return get_userdata(get_current_user_id())?: (object)['ID'=>0,'user_email'=>''];}
 function get_user_locale(int $id):string{return 'de_CH';}
 function get_user_meta(int $id,string $key,bool $single=true):mixed{return $GLOBALS['userMeta'][$id][$key]??'';}
 function get_posts(array $args):array{if(($args['meta_key']??'')==='strc_ad_request'){foreach($GLOBALS['meta'] as $id=>$values)if(($values['strc_ad_request']??'')===($args['meta_value']??null))return [$id];}return [];}
 function get_terms(array $args):array{return [(object)['slug'=>'bern','name'=>'Bern'],(object)['slug'=>'triungsters','name'=>'TRiungsters']];}
 function is_email(string $v):bool{return (bool)filter_var($v,FILTER_VALIDATE_EMAIL);}
 function sanitize_email(string $v):string{return $v;}
 function get_post(int $id):?WP_Post{return $GLOBALS['posts'][$id]??null;}
 function get_post_type(int $id):string{return get_post($id)->post_type;}
 function get_post_status(int $id):string{return get_post($id)->post_status;}
 function get_post_meta(int $id,string $key,bool $single=true):mixed{return $GLOBALS['meta'][$id][$key]??'';}
 function update_post_meta(int $id,string $key,mixed $value):bool{$GLOBALS['meta'][$id][$key]=$value;return true;}
 function delete_post_meta(int $id,string $key):bool{unset($GLOBALS['meta'][$id][$key]);return true;}
 function wp_update_post(array $values,bool $error=false):int{foreach($values as $key=>$value)if($key!=='ID')$GLOBALS['posts'][$values['ID']]->$key=$value;return $values['ID'];}
 function wp_trash_post(int $id):WP_Post|false{$post=get_post($id);if($post->post_status==='trash')return false;update_post_meta($id,'_wp_trash_meta_status',$post->post_status);$post->post_status='trash';return $post;}
 function wp_untrash_post(int $id):WP_Post|false{$post=get_post($id);if($post->post_status!=='trash')return false;$post->post_status='draft';delete_post_meta($id,'_wp_trash_meta_status');return $post;}
 function sanitize_textarea_field(string $text):string{return strip_tags($text);}
 function sanitize_text_field(string $text):string{return strip_tags($text);}
 function wp_strip_all_tags(string $text):string{return strip_tags($text);}
 function wpautop(string $text):string{return $text;}
 function wp_get_attachment_image_url(int $id,string $size):false{return false;}
 function get_post_time(string $format,bool $gmt,mixed $post):string{return '2026-10-27T12:00:00Z';}
 function get_the_title(int $id):string{return get_post($id)->post_title;}
 function absint(mixed $v):int{return abs((int)$v);}
 function home_url(string $path=''):string{return 'https://qa.invalid'.$path;}
 function wp_mail(mixed ...$args):bool{$GLOBALS['mails'][]=$args;return $GLOBALS['mailSuccess'];}
 function get_transient(string $key):mixed{return $GLOBALS['transients'][$key]??false;}
 function set_transient(string $key,mixed $value,int $ttl):bool{$GLOBALS['transients'][$key]=$value;return true;}
 $GLOBALS['currentUser']=1;$GLOBALS['libraryRead']=true;$GLOBALS['mailSuccess']=true;$GLOBALS['mails']=[];$GLOBALS['transients']=[];
 $GLOBALS['capabilities']=['strc_access_member_area'=>true,'review-library'=>true];$GLOBALS['posts']=[];$GLOBALS['meta']=[];$GLOBALS['registrations']=[];$GLOBALS['registrationData']=[];
 foreach([1=>'Alice',2=>'Bob',3=>'Chloe',4=>'David'] as $id=>$name){$GLOBALS['users'][$id]=(object)['ID'=>$id,'display_name'=>$name.' Test','active'=>true,'first_name'=>$name,'user_email'=>'qa'.$id.'@example.invalid'];$GLOBALS['userMeta'][$id]=['first_name'=>$name,'last_name'=>'Test'];$GLOBALS['memberships'][$id]=['user_id'=>$id,'member_number'=>(string)(100+$id),'membership_type'=>'single','status'=>'active'];}
 $wpdb=new class {public string $prefix='qa_';public string $users='qa_users';public string $usermeta='qa_usermeta';private array $args=[];
  public function prepare(string $sql,mixed ...$args):string{$this->args=$args;return $sql;}
  public function esc_like(string $v):string{return addcslashes($v,'_%');}
  public function get_row(string $sql,string $format):?array{foreach($GLOBALS['memberships'] as $row)if($row['member_number']===($this->args[0]??null)&&in_array($row['status'],['active','grace'],true))return ['user_id'=>$row['user_id']];return null;}
  public function get_results(string $sql,string $format):array{return array_map(fn($row)=>$row+['display_name'=>get_userdata($row['user_id'])->display_name],array_values($GLOBALS['memberships']));}
 };
 $base=dirname(__DIR__,2).'/wordpress/wp-content/plugins/strc-core/src/';
 foreach(['Http/UserLanguage.php','Forms/FormFields.php','Members/MembershipTypePolicy.php','Forms/EventPayments.php','Forms/EventRegistration.php','Community/CommunityEndpoint.php','Marketplace/MarketplaceEndpoint.php','Events/RegionDirectory.php','Integrations/Fairgate/FairgateApplications.php']as$file)require $base.$file;
 function invoke(object $object,string $method,mixed ...$args):mixed{return (new ReflectionMethod($object,$method))->invoke($object,...$args);}
 $checks=[];
 function check(bool $condition,string $label):void{if(!$condition)throw new RuntimeException('FAILED: '.$label);$GLOBALS['checks'][]=$label;}
 function rejects(callable $run,string $label,int $code=0):void{try{$run();}catch(RuntimeException|InvalidArgumentException $error){check(!$code||$error->getCode()===$code,$label);return;}throw new RuntimeException('FAILED (accepted): '.$label);}
 $market=new \SwissTRClub\Core\Marketplace\MarketplaceEndpoint();$posts[10]=new WP_Post(10,'strc_ad');$meta[10]=['strc_ad_public_approved'=>'1','strc_ad_expires_at'=>time()+3600];
 $currentUser=0;$capabilities=[];check($market->getAd(10)['id']===10,'Guest can open a public current ad');
 foreach(['pending','draft','trash']as$status){$posts[10]->post_status=$status;check(is_wp_error($market->getAd(10)),'Guest cannot read '.$status.' ad');}
 $posts[10]->post_status='draft';$currentUser=1;$capabilities=['strc_access_member_area'=>true];check($market->getAd(10)['mine'],'Owner can open own draft');$currentUser=2;check(is_wp_error($market->getAd(10)),'Other member cannot read draft');$capabilities['review-market']=true;check($market->getAd(10)['canReview'],'Moderator can open draft');unset($capabilities['review-market']);
 $posts[10]->post_status='publish';$meta[10]['strc_ad_expires_at']=time()-1;check(is_wp_error($market->getAd(10)),'Expired ad is private');$meta[10]['strc_ad_expires_at']=time()+3600;$meta[10]['strc_ad_sold']='1';check(is_wp_error($market->getAd(10)),'Sold ad is private');
 $currentUser=1;$capabilities=['strc_access_member_area'=>true,'review-library'=>true];$community=new \SwissTRClub\Core\Community\CommunityEndpoint();
 foreach(['publish','pending','draft']as$status){$posts[20]=new WP_Post(20,'strc_document',$status);$meta[20]=[];invoke($community,'status','trash',20);invoke($community,'status','restore',20);check($posts[20]->post_status===$status,'Restore preserves '.$status);}
 $posts[20]->post_status='trash';$meta[20]=[];invoke($community,'status','restore',20);check($posts[20]->post_status==='pending','Unknown historic status returns to review');
 $posts[20]->post_status='trash';$meta[20]=['strc_pre_archive_status'=>'publish','strc_review'=>['state'=>'reject']];invoke($community,'status','restore',20);check($posts[20]->post_status==='draft','Rejected document never auto-publishes');
 $posts[20]->post_status='trash';$meta[20]['strc_private_files']=[['key'=>'qa-pdf','mime'=>'application/pdf']];try{invoke($community,'file',20,'qa-pdf');}catch(StreamedFile){check(true,'Authorized archive PDF is streamed');}
 $libraryRead=false;rejects(fn()=>invoke($community,'file',20,'qa-pdf'),'Archive classification remains protected',404);$libraryRead=true;
 $posts[30]=new WP_Post(30,'strc_event');$meta[30]=['strc_registration_required'=>true,'strc_start_at'=>gmdate(DATE_ATOM,time()+86400)];$events=new \SwissTRClub\Core\Forms\EventRegistration();$settings=\SwissTRClub\Core\Forms\EventRegistration::settings(30);$settings=array_replace($settings,['vehicle'=>false,'fee'=>1000,'guestFee'=>2000,'copilotFee'=>500,'guestCopilotFee'=>1500,'feeDouble'=>800,'guestFeeDouble'=>1600,'copilotFeeDouble'=>400,'guestCopilotFeeDouble'=>1200]);
 $member=fn($id)=>['type'=>'member','firstName'=>$userMeta[$id]['first_name'],'lastName'=>'Test','memberNumber'=>(string)(100+$id)];$guest=['type'=>'guest','firstName'=>'Guest','lastName'=>'Test'];
 foreach([false,true]as$meeting)foreach([false,true]as$weekend)foreach(['guest','member']as$pilot)foreach(['guest','member']as$copilot){$s=array_replace($settings,['meeting'=>$meeting,'weekend'=>$weekend]);$input=['crews'=>json_encode([['room'=>'single'],['pilot'=>$pilot==='member'?$member(2):$guest,'copilot'=>$copilot==='member'?$member(3):$guest,'room'=>'double']])];$out=invoke($events,'submission',$posts[30],$s,$input);$expected=1000+($pilot==='member'?($weekend?800:1000):($weekend?1600:2000))+($copilot==='member'?($weekend?400:500):($weekend?1200:1500));check($out['total']===$expected&&$out['headcount']===3,"Tariffs meeting=$meeting weekend=$weekend $pilot/$copilot");}
 $legacy=['crews'=>json_encode([[],['pilot'=>['firstName'=>'Legacy','lastName'=>'Guest']]])];check(invoke($events,'submission',$posts[30],$settings,$legacy)['participants'][1]['kind']==='guest','Old crew input remains a guest');
 $duplicate=['crews'=>json_encode([[],['pilot'=>$member(1)]])];rejects(fn()=>invoke($events,'submission',$posts[30],$settings,$duplicate),'Duplicate member within booking rejected');
 $duplicate=['crews'=>json_encode([[],['pilot'=>$member(2),'copilot'=>$member(2)]])];rejects(fn()=>invoke($events,'submission',$posts[30],$settings,$duplicate),'Duplicate member across roles rejected');
 $GLOBALS['registrations']=[new WP_Post(40,'strc_registration','private',4)];$GLOBALS['registrationData'][40]=['state'=>'confirmed','participants'=>[['userId'=>2]]];$input=['crews'=>json_encode([[],['pilot'=>$member(2)]])];rejects(fn()=>invoke($events,'submission',$posts[30],$settings,$input),'Member in another active booking rejected',409);
 $GLOBALS['registrationData'][40]['state']='cancelled';check(invoke($events,'submission',$posts[30],$settings,$input)['headcount']===2,'Cancelled booking does not block rebooking');
 $memberships[2]['status']='inactive';rejects(fn()=>invoke($events,'memberPerson',$member(2)),'Inactive membership rejected');$memberships[2]['status']='active';$forged=$member(2);$forged['firstName']='Forged';rejects(fn()=>invoke($events,'memberPerson',$forged),'Forged member identity rejected');
 $search=invoke($events,'searchMembers','Te');check(array_keys($search['members'][0])===['name','firstName','lastName','memberNumber'],'Member search exposes names and membership numbers only');check(invoke($events,'searchMembers','T')['members']===[],'Member search requires two characters');
 $mailSuccess=false;check(invoke($market,'receipt',10)!=='','Failed receipt returns a visible warning');$mailSuccess=true;check(invoke($market,'receipt',10)==='','Successful receipt has no warning');

 $capabilities=['strc_access_member_area'=>true,'edit_strc_ads'=>true];$meta[10]['strc_ad_request']='1:00000000-0000-4000-8000-000000000001';$meta[10]['strc_ad_sold']='';$posts[10]->post_status='publish';
 $before=count($mails);$saved=invoke($market,'createOnce',['requestId'=>'00000000-0000-4000-8000-000000000001'],[]);check($saved['id']===10&&count($mails)===$before,'Lost creation response returns existing ad without another receipt');
 $currentUser=2;$request=['requestId'=>'00000000-0000-4000-8000-000000000002','name'=>'QA','email'=>'qa@example.invalid','message'=>'Synthetic request'];$before=count($mails);$result=invoke($market,'contactOnce',10,$request);check($result['sent']===true&&count($mails)===$before+2,'Contact delivers seller mail and sender receipt');invoke($market,'contactOnce',10,$request);check(count($mails)===$before+2,'Repeated contact response never duplicates messages');
 $request['requestId']='00000000-0000-4000-8000-000000000003';$mailSuccess=false;$result=invoke($market,'contactOnce',10,$request);check(is_wp_error($result),'Failed seller delivery is reported as failure');$mailSuccess=true;
 $applications=(new ReflectionClass(\SwissTRClub\Core\Integrations\Fairgate\FairgateApplications::class))->newInstanceWithoutConstructor();$regions=invoke($applications,'regions');check(array_column($regions,'slug')===['bern'],'Membership intake excludes TRiungsters from geography');check(in_array('triungsters',array_column(\SwissTRClub\Core\Events\RegionDirectory::terms(),'slug'),true),'TRiungsters remains available for other club features');
 // Combined Peter/Baur contracts: canonical member receipts, guest receipts, localized creation and archive protection.
 $currentUser=2;$mailSuccess=true;$request['requestId']='00000000-0000-4000-8000-000000000004';$request['name']='QA "name"';
 $before=count($mails);invoke($market,'contactOnce',10,$request);
 check($mails[$before+1][0]===$users[2]->user_email,'Member receipt uses account address');
 check(in_array('Reply-To: QA name <qa@example.invalid>',$mails[$before][3],true),'Reply-To strips header punctuation');
 check(in_array('Content-Type: text/plain; charset=UTF-8',$mails[$before][3],true),'Contact mail has UTF-8 header');
 check(in_array('From: Swiss TR-Club <no-reply@swisstrclub.ch>',$mails[$before+1][3],true),'Receipt has club sender');
 $currentUser=0;$request['requestId']='00000000-0000-4000-8000-000000000005';$before=count($mails);invoke($market,'contactOnce',10,$request);
 check(count($mails)===$before+2&&$mails[$before+1][0]===$request['email'],'Guest still receives one confirmation');
 $userMeta[1]['strc_ui_language']='fr';$posts[10]->post_status='pending';invoke($market,'receipt',10);
 check(str_contains(end($mails)[1],'a été reçue')&&str_contains(end($mails)[2],'#marktplatz/meine/10'),'French pending receipt includes direct ad link');
 $currentUser=1;$capabilities=['strc_access_member_area'=>true,'review-library'=>true];$posts[20]->post_status='publish';
 foreach(['magazine','newsletter'] as $type){$meta[20]['strc_document_type']=$type;rejects(fn()=>invoke($community,'status','trash',20),'Periodical cannot be archived: '.$type,422);}
 check(\SwissTRClub\Core\Community\CommunityEndpoint::portraitModel('TR6 PI 1973')==='TR6 PI','Portrait filter chooses longest matching model');
 echo json_encode(['passed'=>count($checks),'checks'=>$checks],JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE);
}

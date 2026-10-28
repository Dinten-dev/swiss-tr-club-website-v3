<?php
declare(strict_types=1);
use SwissTRClub\Core\Forms\FormStore;
use SwissTRClub\Core\Forms\EventFinance;
use SwissTRClub\Core\Community\CommunityEndpoint;
use SwissTRClub\Core\Community\LibraryPolicy;
use SwissTRClub\Core\Community\SubmissionNotifications;
use SwissTRClub\Core\Roles\RoleAssignments;
use SwissTRClub\Core\Mail\NewsletterEndpoint;
if(!defined('WP_CLI')||!WP_CLI)throw new RuntimeException('Run only with Staging WP-CLI.');
if(home_url()!=='https://staging.swisstrclub.ch'||wp_get_environment_type()!=='staging')throw new RuntimeException('Wrong target');
class SecurityJsonEnd extends Exception {}
class SecurityRedirectEnd extends Exception {public function __construct(public string $url){parent::__construct('captured redirect');}}
global $checks,$mails,$http,$statusCode,$duringHttp;
$checks=[];$userIds=[];$postIds=[];$mails=[];$http=[];$statusCode=200;$duringHttp=null;
$tag='securityqa_20261028_'.strtolower(wp_generate_password(8,false,false));$originalUser=get_current_user_id();
function qaCheck(string $label,bool $ok):void{global $checks;$checks[]=['test'=>$label,'passed'=>$ok];if(!$ok)throw new RuntimeException('FAILED: '.$label);}
function qaPrivate(object $object,string $method,mixed ...$args):mixed{return(new ReflectionMethod($object,$method))->invoke($object,...$args);}
function qaAttempt(callable $work):array{
 global $statusCode;$statusCode=200;$level=ob_get_level();ob_start();
 try{$value=$work();ob_end_clean();return['success'=>true,'data'=>$value,'status'=>200];}
 catch(SecurityJsonEnd){$raw=ob_get_clean();$data=json_decode($raw,true,512,JSON_THROW_ON_ERROR);return $data+['status'=>$statusCode];}
 finally{while(ob_get_level()>$level)ob_end_clean();}
}
function qaDenied(string $label,callable $work,int $status=403):void{$r=qaAttempt($work);qaCheck($label,empty($r['success'])&&$r['status']===$status);}
function qaAjax(object $endpoint,int $user,array $input):array{wp_set_current_user($user);$_SERVER['REQUEST_METHOD']='POST';$_POST=array_map(static fn($v)=>(string)$v,$input);$_POST['nonce']=wp_create_nonce('strc_event_finance');$_REQUEST=$_POST;$_GET=[];return qaAttempt(fn()=>$endpoint->respond());}
function qaNewsletter(NewsletterEndpoint $endpoint,string $email,string $name):array{wp_set_current_user(0);$_SERVER['REQUEST_METHOD']='POST';$_SERVER['REMOTE_ADDR']='192.0.2.128';$_SERVER['HTTP_ORIGIN']='https://staging.swisstrclub.ch';$_GET=[];$_POST=['operation'=>'subscribe','email'=>$email,'name'=>$name,'consent'=>'1'];$_REQUEST=$_POST;return qaAttempt(fn()=>$endpoint->respond());}
function qaLink(NewsletterEndpoint $endpoint,string $email,string $op,string $token):string{$_GET=['email'=>$email,'token'=>$token];try{qaPrivate($endpoint,'processLink',$op);}catch(SecurityRedirectEnd $e){parse_str(parse_url($e->url,PHP_URL_QUERY),$query);return$query['newsletter']??'';}throw new RuntimeException('Expected captured redirect');}
function qaTokens():array{global $mails;$body=end($mails)['message'];preg_match_all('/token=([a-f0-9]{64})/',$body,$matches);return$matches[1];}
$die=static fn()=>static function(){throw new SecurityJsonEnd();};
add_filter('wp_doing_ajax','__return_true',PHP_INT_MAX);
foreach(['wp_die_handler','wp_die_ajax_handler','wp_die_json_handler']as$hook)add_filter($hook,$die,PHP_INT_MAX);
add_filter('status_header',static function($header,$code)use(&$statusCode){$statusCode=(int)$code;return$header;},PHP_INT_MAX,2);
add_filter('wp_redirect',static function($url){throw new SecurityRedirectEnd($url);},PHP_INT_MAX);
add_filter('pre_wp_mail',static function($return,$atts)use(&$mails){$mails[]=$atts;return true;},PHP_INT_MAX,2);
add_filter('pre_http_request',static function($return,$args,$url)use(&$http,&$duringHttp){
 $http[]=['host'=>parse_url($url,PHP_URL_HOST),'path'=>parse_url($url,PHP_URL_PATH)];
 if(parse_url($url,PHP_URL_HOST)==='api.brevo.com'){if($duringHttp)$duringHttp();return['headers'=>[],'body'=>'{}','response'=>['code'=>204,'message'=>'No Content'],'cookies'=>[]];}
 return new WP_Error('security_qa_network','External integrations blocked during synthetic QA');
},PHP_INT_MAX,3);
if(!defined('STRC_BREVO_API_KEY'))putenv('STRC_BREVO_API_KEY=isolated-staging-fixture');
if(!defined('STRC_BREVO_LIST_ID'))putenv('STRC_BREVO_LIST_ID=1');
global $wpdb;
foreach([$wpdb->users,$wpdb->usermeta,$wpdb->posts,$wpdb->postmeta,$wpdb->options,$wpdb->prefix.'strc_memberships',$wpdb->prefix.'strc_newsletter_subscribers']as$table){$row=$wpdb->get_row($wpdb->prepare('SHOW TABLE STATUS LIKE %s',$wpdb->esc_like($table)),ARRAY_A);qaCheck('Transactional table '.$table,strtoupper($row['Engine']??'')==='INNODB');}
$wpdb->query('START TRANSACTION');$failure=null;
try{
 $admin=get_user_by('email','traver.dinten@outlook.com');qaCheck('Existing account retains all requested specialist rights',user_can($admin,'strc_manage_finance')&&user_can($admin,'strc_manage_library')&&user_can($admin,'strc_access_board_documents')&&user_can($admin,'strc_assign_admins'));
 foreach(['owner','member','organiser','finance','board','library','board_library']as$label){
  $id=wp_insert_user(['user_login'=>$tag.'_'.$label,'user_pass'=>wp_generate_password(40,true,true),'user_email'=>$tag.'_'.$label.'@example.invalid','display_name'=>'Security QA '.$label,'role'=>'strc_member']);
  qaCheck('Create synthetic '.$label,is_int($id));$users[$label]=$id;$userIds[]=$id;(new \SwissTRClub\Core\Members\MembershipRepository())->syncUser($id);
  qaCheck('Synthetic active membership '.$label,(new \SwissTRClub\Core\Members\MembershipRepository())->findForUser($id)['status']==='active');
 }
 wp_set_current_user($admin->ID);
 $event=wp_insert_post(['post_type'=>'strc_event','post_status'=>'publish','post_title'=>$tag.' Event','post_author'=>$users['owner']]);qaCheck('Synthetic event created',is_int($event)&&$event>0);$postIds[]=$event;
 update_post_meta($event,'strc_start_at','2099-01-01T10:00:00Z');update_post_meta($event,'strc_registration_required','1');update_post_meta($event,'strc_capacity',10);
 foreach(['organiser'=>['strc_event_organiser'],'finance'=>['strc_treasurer'],'board'=>['strc_board_member'],'library'=>['strc_library_administrator'],'board_library'=>['strc_board_member','strc_library_administrator']]as$label=>$roles){
  $rows=[];foreach($roles as$role)$rows[]=['role'=>$role,'regions'=>[],'libraryAccess'=>$role==='strc_board_member'?'restricted':'open','assignedEvents'=>$role==='strc_event_organiser'?[$event]:[],'areas'=>[]];
  $saved=RoleAssignments::save($users[$label],['revision'=>RoleAssignments::revision($users[$label]),'assignments'=>wp_json_encode($rows)]);
  clean_user_cache($users[$label]);$reloaded=get_userdata($users[$label]);qaCheck('Assignment saved and reloaded '.$label,!empty($saved['saved'])&&!array_diff($roles,$reloaded->roles));
 }
 $row=['eventTitle'=>'Synthetic security event','conditions'=>'Synthetic QA only','state'=>'confirmed','paymentMethod'=>'invoice','paymentStatus'=>'outstanding','total'=>100,'headcount'=>1,'participants'=>[['name'=>'Security QA','kind'=>'member']],'financeAudit'=>[]];
 $registration=FormStore::save('strc_registration',$row,$users['owner'],$event);$postIds[]=$registration;
 $finance=new EventFinance();$response=qaAjax($finance,$users['organiser'],['operation'=>'list','eventId'=>$event]);
 qaCheck('Assigned organiser sees roster and promotion only',!empty($response['success'])&&count($response['data']['rows'])===1&&$response['data']['canPromote']&&!$response['data']['canReconcile']);
 $before=get_post($registration)->post_content;$beforeMail=count($mails);
 foreach(['paid','outstanding','partially_paid','waived','refund_pending','refunded']as$state){
  $result=qaAjax($finance,$users['organiser'],['operation'=>'reconcile','eventId'=>$event,'id'=>$registration,'revision'=>FormStore::revision(get_post($registration)),'status'=>$state,'note'=>'Synthetic request']);
  qaCheck('Organiser cannot reconcile '.$state,empty($result['success'])&&$result['status']===403&&get_post($registration)->post_content===$before&&count($mails)===$beforeMail);
 }
 $response=qaAjax($finance,$users['member'],['operation'=>'list','eventId'=>$event]);qaCheck('Unassigned member cannot inspect roster',empty($response['success'])&&$response['status']===403);
 $response=qaAjax($finance,$users['finance'],['operation'=>'reconcile','eventId'=>$event,'id'=>$registration,'revision'=>FormStore::revision(get_post($registration)),'status'=>'paid','note'=>'Synthetic treasury control']);
 $updated=FormStore::data(get_post($registration));qaCheck('Treasury changes payment with atomic audit',!empty($response['success'])&&$updated['paymentStatus']==='paid'&&count($updated['financeAudit'])===1&&$updated['financeAudit'][0]['by']===$users['finance']);
 $waiting=$row;$waiting['state']='waiting';$waiting['paymentMethod']='none';$waiting['total']=0;$waiting['paymentStatus']='not_required';
 $waitId=FormStore::save('strc_registration',$waiting,$users['owner'],$event);$postIds[]=$waitId;
 $response=qaAjax($finance,$users['finance'],['operation'=>'promote','eventId'=>$event,'id'=>$waitId,'revision'=>FormStore::revision(get_post($waitId))]);qaCheck('Treasury alone cannot promote',empty($response['success'])&&$response['status']===403);
 $response=qaAjax($finance,$users['organiser'],['operation'=>'promote','eventId'=>$event,'id'=>$waitId,'revision'=>FormStore::revision(get_post($waitId))]);qaCheck('Organiser still promotes waiting member',!empty($response['success'])&&FormStore::data(get_post($waitId))['state']==='confirmed');
 $community=new CommunityEndpoint();
 wp_set_current_user($admin->ID);
 $doc=wp_insert_post(['post_type'=>'strc_document','post_status'=>'publish','post_title'=>$tag.' Restricted','post_content'=>'Original restricted content','post_author'=>$users['owner']]);$postIds[]=$doc;
 $classification=['documentType'=>'board-finance','access'=>'restricted','language'=>'de'];update_post_meta($doc,'strc_form_classification',$classification);LibraryPolicy::index($doc,$classification);
 wp_set_current_user($users['member']);qaDenied('Ordinary member cannot read board document',fn()=>qaPrivate($community,'post',$doc,true),404);
 wp_set_current_user($users['board']);
 qaCheck('Board reads without edit or review',qaPrivate($community,'post',$doc,true)->ID===$doc&&!qaPrivate($community,'canEdit',get_post($doc))&&!qaPrivate($community,'canReview',get_post($doc)));
 qaCheck('Board is not assigned review notifications',!SubmissionNotifications::reviews(get_userdata($users['board']),'library',true));
 foreach(['approve','reject','trash','restore']as$op){$before=get_post($doc);$beforeMeta=get_post_meta($doc);qaDenied('Board reader denied '.$op,fn()=>qaPrivate($community,'status',$op,$doc));qaCheck('Denied '.$op.' preserves content and metadata',get_post($doc)==$before&&get_post_meta($doc)===$beforeMeta);}
 qaDenied('Board reader cannot edit foreign document',fn()=>qaPrivate($community,'edit',['id'=>(string)$doc,'title'=>'Altered','documentType'=>'board-finance','access'=>'open','language'=>'de']));
 $wpdb->update($wpdb->posts,['post_status'=>'trash'],['ID'=>$doc]);clean_post_cache($doc);
 qaCheck('Board can still open archived document',qaPrivate($community,'post',$doc,true)->ID===$doc);
 $archive=qaPrivate($community,'listing',['kind'=>'library','group'=>'board','trash'=>'1','search'=>$tag]);$found=array_values(array_filter($archive['items'],fn($item)=>$item['id']===$doc));
 qaCheck('Board archive keeps read-only UI flags',count($found)===1&&!$found[0]['canReview']&&!$found[0]['canEdit']);
 $openDraft=wp_insert_post(['post_type'=>'strc_document','post_status'=>'draft','post_title'=>$tag.' Foreign open draft','post_author'=>$users['owner']]);$postIds[]=$openDraft;
 update_post_meta($openDraft,'strc_form_classification',['documentType'=>'technical','access'=>'open']);LibraryPolicy::index($openDraft,['documentType'=>'technical','access'=>'open']);
 qaDenied('Board cannot read foreign ordinary draft',fn()=>qaPrivate($community,'post',$openDraft),404);
 // A stale denormalised index must never override the canonical class.
 update_post_meta($openDraft,'strc_document_access','restricted');
 $listing=qaPrivate($community,'listing',['kind'=>'library','search'=>$tag]);qaCheck('Board listing excludes ordinary draft with stale restricted index',!in_array($openDraft,array_column($listing['items'],'id'),true));
 $wpdb->update($wpdb->posts,['post_status'=>'publish'],['ID'=>$doc]);clean_post_cache($doc);
 wp_set_current_user($users['library']);qaDenied('Library moderator without board cannot read restricted',fn()=>qaPrivate($community,'post',$doc,true),404);
 wp_set_current_user($users['owner']);qaDenied('Ordinary author cannot lower restricted class',fn()=>qaPrivate($community,'classification',['id'=>(string)$doc,'documentType'=>'technical','language'=>'de','access'=>'open'],'library',get_post($doc)));
 // Give the owner board-read access through the same role-assignment workflow.
 wp_set_current_user($admin->ID);RoleAssignments::save($users['owner'],['revision'=>RoleAssignments::revision($users['owner']),'assignments'=>wp_json_encode([['role'=>'strc_board_member','regions'=>[],'libraryAccess'=>'restricted','assignedEvents'=>[],'areas'=>[]]])]);clean_user_cache($users['owner']);wp_set_current_user($users['owner']);
 $edit=qaPrivate($community,'edit',['id'=>(string)$doc,'title'=>$tag.' Edited own document','description'=>'Owner edit','documentType'=>'board-finance','language'=>'de','access'=>'restricted']);qaCheck('Board author edits own content and resubmits',get_post_status($doc)==='pending'&&get_post_meta($doc,'strc_form_classification',true)['access']==='restricted');
 qaDenied('Board author cannot downgrade via category change',fn()=>qaPrivate($community,'classification',['id'=>(string)$doc,'documentType'=>'technical','language'=>'de','access'=>'open'],'library',get_post($doc)));
 qaDenied('New board category cannot use open class',fn()=>qaPrivate($community,'classification',['documentType'=>'board-finance','language'=>'de','access'=>'open'],'library'),422);
 wp_set_current_user($users['board_library']);qaCheck('Moderator plus board reads and reviews',qaPrivate($community,'canReview',get_post($doc))&&SubmissionNotifications::reviews(get_userdata($users['board_library']),'library',true));
 qaPrivate($community,'status','approve',$doc);qaCheck('Actual moderator approves document',get_post_status($doc)==='publish');
 qaPrivate($community,'status','trash',$doc);qaCheck('Actual moderator archives document',get_post_status($doc)==='trash');
 qaPrivate($community,'status','restore',$doc);qaCheck('Actual moderator restores original status',get_post_status($doc)==='publish');
 $newsletter=new NewsletterEndpoint();$table=$wpdb->prefix.'strc_newsletter_subscribers';$email=$tag.'@example.invalid';
 $oldUnsubscribe=str_repeat('b',64);$legacyConfirmation=str_repeat('a',64);
 $wpdb->insert($table,['email'=>$email,'display_name'=>'Original consent','status'=>'confirmed','confirmation_hash'=>hash('sha256',$legacyConfirmation),'unsubscribe_hash'=>hash('sha256',$oldUnsubscribe),'consent_source'=>'website-form','requested_at'=>'2025-01-01 10:00:00','confirmed_at'=>'2025-01-01 11:00:00','brevo_status'=>'synced']);
 $fetch=static fn()=>$wpdb->get_row($wpdb->prepare("SELECT * FROM $table WHERE email=%s",$email),ARRAY_A);
 $before=$fetch();$mailCount=count($mails);$response=qaNewsletter($newsletter,$email,'Unverified change');qaCheck('Public subscribe preserves confirmed consent and token',!empty($response['success'])&&$fetch()===$before&&count($mails)===$mailCount);
 $wpdb->update($table,['status'=>'unsubscribed','unsubscribed_at'=>'2025-01-02 10:00:00','brevo_status'=>'remove_pending'],['id'=>$before['id']]);$before=$fetch();
 $response=qaNewsletter($newsletter,$email,'Pending new consent');[$token,$newUnsubscribe]=qaTokens();$after=$fetch();$pending=$after['pending_request'];unset($after['pending_request']);$original=$before;unset($original['pending_request']);qaCheck('Pending request preserves withdrawal and removal queue',!empty($response['success'])&&$after===$original&&is_string($pending)&&$pending!=='');
 qaCheck('Wrong DOI cannot restore consent',qaLink($newsletter,$email,'confirm',str_repeat('c',64))==='invalid'&&$fetch()['status']==='unsubscribed');
 qaCheck('Old unsubscribe link still cancels pending DOI',qaLink($newsletter,$email,'unsubscribe',$oldUnsubscribe)==='unsubscribed'&&$fetch()['pending_request']===null&&$fetch()['brevo_status']==='remove_pending');
 qaCheck('Cancelled DOI stays invalid',qaLink($newsletter,$email,'confirm',$token)==='invalid');
 qaNewsletter($newsletter,$email,'Confirmed replacement');[$token,$newUnsubscribe]=qaTokens();qaCheck('Current DOI adopts new consent without losing removal',qaLink($newsletter,$email,'confirm',$token)==='confirmed'&&$fetch()['display_name']==='Confirmed replacement'&&$fetch()['brevo_status']==='remove_pending');
 qaCheck('Confirmed DOI cannot be replayed',qaLink($newsletter,$email,'confirm',$token)==='invalid');
 $workerReady=(defined('STRC_BREVO_API_KEY')?(string)STRC_BREVO_API_KEY:(string)getenv('STRC_BREVO_API_KEY'))!==''&&(defined('STRC_BREVO_LIST_ID')?(int)STRC_BREVO_LIST_ID:(int)getenv('STRC_BREVO_LIST_ID'))>0;
 qaCheck('Isolated Brevo worker can use mocked transport',$workerReady);
 $newsletter->syncPending();qaCheck('Real MariaDB queue removes before re-adding',$fetch()['brevo_status']==='pending'&&str_ends_with(end($http)['path'],'/remove'));
 $newsletter->syncPending();qaCheck('Confirmed subscription is re-added after removal',$fetch()['brevo_status']==='synced'&&end($http)['path']==='/v3/contacts');
 $wpdb->update($table,['brevo_status'=>'pending','brevo_attempts'=>0],['id'=>$before['id']]);
 $duringHttp=static function()use($newsletter,$email,$newUnsubscribe){qaCheck('Valid withdrawal succeeds during remote wait',qaLink($newsletter,$email,'unsubscribe',$newUnsubscribe)==='unsubscribed');};
 $newsletter->syncPending();$duringHttp=null;qaCheck('Stale worker cannot overwrite withdrawal',$fetch()['status']==='unsubscribed'&&$fetch()['brevo_status']==='remove_pending');
 $legacyEmail=$tag.'_legacy@example.invalid';$wpdb->insert($table,['email'=>$legacyEmail,'display_name'=>'Legacy pending','status'=>'pending','confirmation_hash'=>hash('sha256',$legacyConfirmation),'unsubscribe_hash'=>hash('sha256',str_repeat('d',64)),'requested_at'=>'2025-01-01 10:00:00','brevo_status'=>'idle']);
 qaCheck('Pre-migration pending DOI still confirms',qaLink($newsletter,$legacyEmail,'confirm',$legacyConfirmation)==='confirmed');
}catch(Throwable $e){$failure=['type'=>get_class($e),'message'=>$e->getMessage(),'line'=>$e->getLine()];}
finally{
 foreach($userIds as$id)clean_user_cache($id);foreach($postIds as$id)clean_post_cache($id);$wpdb->query('ROLLBACK');wp_cache_delete('cron','options');wp_set_current_user($originalUser);
}
$remainingUsers=(int)$wpdb->get_var($wpdb->prepare("SELECT COUNT(*) FROM {$wpdb->users} WHERE user_login LIKE %s",$wpdb->esc_like($tag).'%'));
$remainingPosts=(int)$wpdb->get_var($wpdb->prepare("SELECT COUNT(*) FROM {$wpdb->posts} WHERE post_title LIKE %s",$wpdb->esc_like($tag).'%'));
$remainingSubscriptions=(int)$wpdb->get_var($wpdb->prepare("SELECT COUNT(*) FROM {$wpdb->prefix}strc_newsletter_subscribers WHERE email LIKE %s",$wpdb->esc_like($tag).'%'));
$clean=$remainingUsers===0&&$remainingPosts===0&&$remainingSubscriptions===0;
echo wp_json_encode(['target'=>home_url(),'php'=>PHP_VERSION,'database'=>$wpdb->db_version(),'checks'=>$checks,'passed'=>count(array_filter($checks,fn($c)=>$c['passed'])),'failure'=>$failure,'rolledBack'=>true,'syntheticDataRemoved'=>$clean,'capturedMailCount'=>count($mails),'realMailCount'=>0,'mockHttpCount'=>count($http),'realExternalRequests'=>0],JSON_UNESCAPED_UNICODE)."\n";
if($failure||!$clean)throw new RuntimeException('Staging security acceptance failed');

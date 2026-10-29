<?php
/** Isolated endpoint regressions: real policies, locks and CAS; SQLite data, mocked transport. */
declare(strict_types=1);
namespace { if (defined('ABSPATH')) throw new \RuntimeException('Do not run this fixture inside WordPress.'); }
namespace SwissTRClub\Core\Roles {
 final class RoleAssignments {
  public static function areas(int $id):array{return $GLOBALS['areas'][$id]??[];}
  public static function events(int $id):array{return $GLOBALS['assigned'][$id]??[];}
  public static function regions(int $id):array{return [];}
  public static function agendaRegions(int $id):array{return [];}
  public static function limited(int $id):bool{return false;}
 }
}
namespace SwissTRClub\Core\Forms {
 final class EventPayments {
  public static function notify(int $id):void{$GLOBALS['notifications'][]=$id;}
  public static function present(object $post,array $data):array{return $data;}
 }
 final class EventInvoice {public static function downloadUrl(int $id):string{return '/invoice/'.$id;}}
 final class EventRegistration {public static function occupied(int $id):int{return 0;}}
}
namespace SwissTRClub\Core\Integrations\Zahls {final class ZahlsClient {public static function ready():bool{return false;}}}
namespace SwissTRClub\Core\Members {final class MembershipRepository {public function findForUser(int $id):?array{return ['status'=>'active'];}}}
namespace SwissTRClub\Core\Community {final class PrivateUploadStore {public function stream(array $file):never{throw new \Streamed();}}}
namespace {
 const ARRAY_A='ARRAY_A';const HOUR_IN_SECONDS=3600;
 const STRC_BREVO_API_KEY='isolated-fake-key';const STRC_BREVO_LIST_ID=1;
 class JsonExit extends Exception {public function __construct(public array $data,public int $status=200){parent::__construct('json',$status);}}
 class RedirectExit extends Exception {public function __construct(public string $url){parent::__construct('redirect');}}
 class Streamed extends Exception {}
 class WP_User {public function __construct(public int $ID,public string $display_name='Test',public string $user_email='person@example.invalid'){}}
 class WP_Post {public function __construct(public int $ID,public string $post_type,public string $post_status='publish',public int $post_author=2,public int $post_parent=0,public string $post_content='',public string $post_title='Test'){}}
 class WP_Error {}
 function is_wp_error(mixed $v):bool{return $v instanceof WP_Error;}
 function get_current_user_id():int{return 1;}
 function current_user_can(string $cap):bool{return user_can(1,$cap);}
 function user_can(mixed $user,string $cap):bool{return !empty($GLOBALS['caps'][is_object($user)?$user->ID:$user][$cap]);}
 function get_userdata(int $id):WP_User{return new WP_User($id);}
 function get_user_by(string $key,string $value):false{return false;}
 function get_user_meta(int $id,string $key,bool $single=true):mixed{return '';}
 function get_post(int $id):?WP_Post {
  $row=$GLOBALS['wpdb']->db->query('SELECT * FROM qa_posts WHERE ID='.(int)$id)->fetch(PDO::FETCH_ASSOC);
  return $row?new WP_Post((int)$row['ID'],$row['post_type'],$row['post_status'],(int)$row['post_author'],(int)$row['post_parent'],$row['post_content'],$row['post_title']):null;
 }
 function get_post_type(int $id):string{return get_post($id)?->post_type??'';}
 function get_post_status(int $id):string{return get_post($id)?->post_status??'';}
 function get_posts(array $args):array{return array_values(array_filter(array_map('get_post',$GLOBALS['wpdb']->db->query('SELECT ID FROM qa_posts')->fetchAll(PDO::FETCH_COLUMN)),fn($p)=>$p->post_type===($args['post_type']??'')&&(empty($args['post_parent'])||$p->post_parent===$args['post_parent'])));}
 function get_post_meta(int $id,string $key,bool $single=true):mixed{return $GLOBALS['meta'][$id][$key]??'';}
 function update_post_meta(int $id,string $key,mixed $value):bool{$GLOBALS['meta'][$id][$key]=$value;return true;}
 function delete_post_meta(int $id,string $key):void{unset($GLOBALS['meta'][$id][$key]);}
 function wp_update_post(array $values,bool $error=false):int{$id=$values['ID'];unset($values['ID']);$GLOBALS['wpdb']->update('qa_posts',$values,['ID'=>$id]);return $id;}
 function wp_trash_post(int $id):bool{update_post_meta($id,'_wp_trash_meta_status',get_post_status($id));wp_update_post(['ID'=>$id,'post_status'=>'trash']);return true;}
 function wp_untrash_post(int $id):bool{wp_update_post(['ID'=>$id,'post_status'=>'draft']);return true;}
 function clean_post_cache(int $id):void{}
 function get_option(string $key):false{return false;}
 function wp_get_object_terms(mixed ...$args):array{return [];}
 function wp_unslash(mixed $v):mixed{return $v;}
 function sanitize_text_field(string $v):string{return strip_tags($v);}
 function sanitize_textarea_field(string $v):string{return strip_tags($v);}
 function sanitize_url(string $v):string{return $v;}
 function sanitize_key(string $v):string{return $v;}
 function sanitize_email(string $v):string{return $v;}
 function is_email(string $v):string|false{return filter_var($v,FILTER_VALIDATE_EMAIL);}
 function wp_verify_nonce(string $v,string $action):bool{return $v==='valid';}
 function wp_create_nonce(string $action):string{return 'valid';}
 function wp_send_json_error(array $data,int $status=200):never{throw new JsonExit(['success'=>false]+$data,$status);}
 function wp_send_json_success(array $data):never{throw new JsonExit(['success'=>true]+$data);}
 function nocache_headers():void{}
 function absint(mixed $v):int{return abs((int)$v);}
 function current_time(string $kind,bool $gmt=false):string{return '2026-10-28 12:00:00';}
 function wp_json_encode(mixed $v):string{return json_encode($v,JSON_THROW_ON_ERROR);}
 function home_url(string $path=''):string{return 'https://example.invalid'.$path;}
 function admin_url(string $path):string{return home_url('/wp-admin/'.$path);}
 function add_query_arg(mixed $key,mixed $value,mixed $url=null):string{return is_array($key)?$value.'?'.http_build_query($key):$url.'?'.http_build_query([$key=>$value]);}
 function esc_html(string $v):string{return htmlspecialchars($v);}
 function esc_url(string $v):string{return htmlspecialchars($v);}
 function wp_safe_redirect(string $url):never{throw new RedirectExit($url);}
 function get_transient(string $key):mixed{return $GLOBALS['transients'][$key]??false;}
 function set_transient(string $key,mixed $value,int $ttl):bool{$GLOBALS['transients'][$key]=$value;return true;}
 function wp_mail(mixed ...$args):bool{$GLOBALS['mails'][]=$args;return $GLOBALS['mailOK'];}
 function wp_schedule_single_event(mixed ...$args):void{$GLOBALS['scheduled'][]=$args;}
 function wp_remote_post(string $url,array $args):array{$GLOBALS['http'][]=[$url,$args];if(is_callable($GLOBALS['duringHTTP']??null))($GLOBALS['duringHTTP'])();return ['code'=>$GLOBALS['httpCode']];}
 function wp_remote_retrieve_response_code(array $r):int{return $r['code'];}
 final class FixtureDB {
  public string $prefix='qa_';public string $posts='qa_posts';public string $last_error='';public PDO $db;public bool $busy=false;public bool $fail=false;public array $locks=[];private array $held=[];
  public function __construct(){
   $this->db=new PDO('sqlite::memory:');$this->db->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
   $this->db->exec('CREATE TABLE qa_posts(ID INTEGER PRIMARY KEY,post_type TEXT,post_status TEXT,post_author INTEGER,post_parent INTEGER,post_content TEXT,post_title TEXT,post_modified TEXT,post_modified_gmt TEXT)');
   $this->db->exec('CREATE TABLE qa_strc_newsletter_subscribers(id INTEGER PRIMARY KEY,email TEXT UNIQUE,user_id INTEGER,display_name TEXT,status TEXT,confirmation_hash TEXT,pending_request TEXT,unsubscribe_hash TEXT,consent_source TEXT,requested_at TEXT,confirmed_at TEXT,unsubscribed_at TEXT,brevo_status TEXT,brevo_attempts INTEGER,brevo_updated_at TEXT)');
  }
  public function prepare(string $sql,mixed ...$args):string {foreach($args as $arg)$sql=preg_replace('/%[sd]/',is_int($arg)?(string)$arg:$this->db->quote((string)$arg),$sql,1);return $sql;}
  public function get_var(string $sql):mixed{if(preg_match("/(GET_LOCK|RELEASE_LOCK)\\('([^']+)'/",$sql,$match)){[$all,$op,$key]=$match;if($op==='RELEASE_LOCK'){unset($this->held[$key]);return 1;}$this->locks[]=$key;if($this->busy||isset($this->held[$key]))return 0;$this->held[$key]=true;return 1;}return $this->db->query($sql)->fetchColumn();}
  public function get_row(string $sql,string $format):?array{return $this->db->query($sql)->fetch(PDO::FETCH_ASSOC)?:null;}
  public function get_results(string $sql,string $format):array{return $this->db->query($sql)->fetchAll(PDO::FETCH_ASSOC);}
  public function query(string $sql):int|false{return $this->fail?false:$this->db->exec(str_replace('BINARY ','',$sql));}
  public function insert(string $table,array $values):int|false{if($this->fail)return false;$stmt=$this->db->prepare('INSERT INTO '.$table.' ('.implode(',',array_keys($values)).') VALUES ('.implode(',',array_fill(0,count($values),'?')).')');$stmt->execute(array_values($values));return $stmt->rowCount();}
  public function update(string $table,array $values,array $where):int|false{if($this->fail)return false;$stmt=$this->db->prepare('UPDATE '.$table.' SET '.implode(',',array_map(fn($k)=>$k.'=?',array_keys($values))).' WHERE '.implode(' AND ',array_map(fn($k)=>$k.'=?',array_keys($where))));$stmt->execute([...array_values($values),...array_values($where)]);return $stmt->rowCount();}
 }
 $base=dirname(__DIR__,2).'/wordpress/wp-content/plugins/strc-core/src/';
 foreach(['Mail/MailLog.php','Http/AjaxRequest.php','Forms/FormFields.php','Forms/FormStore.php','Editorial/EditorialAccess.php','Events/RegionalEventAccess.php','Forms/EventFinance.php','Community/LibraryPolicy.php','Community/CommunityEndpoint.php','Community/SubmissionNotifications.php','Mail/NewsletterEndpoint.php']as$file)require $base.$file;
 function callPrivate(object $target,string $method,mixed ...$args):mixed{return (new ReflectionMethod($target,$method))->invoke($target,...$args);}
 $checks=[];
 function check(bool $pass,string $label):void{if(!$pass)throw new RuntimeException('FAILED: '.$label);$GLOBALS['checks'][]=$label;}
 function denied(callable $call,int $code,string $label):void{try{$call();}catch(JsonExit $e){check($e->status===$code&&!$e->data['success'],$label);return;}throw new RuntimeException('FAILED accepted: '.$label);}
 function jsonCall(object $endpoint,array $data):JsonExit {$_SERVER=['REQUEST_METHOD'=>'POST','REMOTE_ADDR'=>'127.0.0.1'];$_GET=[];$_POST=$data;$_REQUEST=$data;try{$endpoint->respond();}catch(JsonExit $e){return $e;}throw new RuntimeException('Expected JSON');}
 function resetFixture():void{$GLOBALS['wpdb']=new FixtureDB();$GLOBALS['caps']=[1=>['strc_access_member_area'=>true],2=>['strc_access_member_area'=>true]];$GLOBALS['assigned']=[];$GLOBALS['areas']=[];$GLOBALS['meta']=[];$GLOBALS['notifications']=[];$GLOBALS['transients']=[];$GLOBALS['mails']=[];$GLOBALS['mailOK']=true;$GLOBALS['http']=[];$GLOBALS['httpCode']=204;$GLOBALS['scheduled']=[];$GLOBALS['duringHTTP']=null;}
 function seedPost(int $id,string $type,string $status='publish',array $data=[],int $parent=0):void{$GLOBALS['wpdb']->insert('qa_posts',['ID'=>$id,'post_type'=>$type,'post_status'=>$status,'post_author'=>2,'post_parent'=>$parent,'post_content'=>wp_json_encode($data),'post_title'=>'Test']);}
 $section=getenv('SECURITY_SECTION')?:'all';
 if(in_array($section,['all','finance'],true)){
  resetFixture();$caps[1]['strc_manage_assigned_events']=true;$assigned[1]=[10];seedPost(10,'strc_event');
  $registration=['state'=>'confirmed','paymentMethod'=>'invoice','paymentStatus'=>'outstanding','total'=>100,'headcount'=>1,'participants'=>[['name'=>'Test']],'financeAudit'=>[]];seedPost(11,'strc_registration','private',$registration,10);
  $finance=new \SwissTRClub\Core\Forms\EventFinance();$response=jsonCall($finance,['operation'=>'list','eventId'=>'10']);
  $original=get_post(11)->post_content;
  foreach(['paid','outstanding','partially_paid','waived','refund_pending','refunded']as$status){$r=jsonCall($finance,['operation'=>'reconcile','eventId'=>'10','id'=>'11','nonce'=>'valid','revision'=>hash('sha256',$original),'status'=>$status,'note'=>'Test']);check($r->status===403&&get_post(11)->post_content===$original&&!$notifications,'Organiser cannot reconcile '.$status);}
  check($response->data['canPromote']&&!$response->data['canReconcile']&&count($response->data['rows'])===1,'Assigned organiser retains roster and waiting-list access without reconciliation');
  $caps[1]['strc_manage_finance']=true;
  $r=jsonCall($finance,['operation'=>'reconcile','eventId'=>'10','id'=>'11','nonce'=>'invalid','revision'=>hash('sha256',$original),'status'=>'paid','note'=>'Test']);check($r->status===403&&get_post(11)->post_content===$original,'Treasury still requires nonce');
  $r=jsonCall($finance,['operation'=>'reconcile','eventId'=>'10','id'=>'11','nonce'=>'valid','revision'=>'stale','status'=>'paid','note'=>'Test']);check($r->status===409&&get_post(11)->post_content===$original&&!$notifications,'Treasury stale revision retains data');
  $r=jsonCall($finance,['operation'=>'reconcile','eventId'=>'10','id'=>'11','nonce'=>'valid','revision'=>hash('sha256',$original),'status'=>'paid','note'=>'Test']);$saved=\SwissTRClub\Core\Forms\FormStore::data(get_post(11));check($r->data['success']&&$saved['paymentStatus']==='paid'&&count($saved['financeAudit'])===1&&$notifications===[11],'Treasury reconciliation retains atomic audit and notification');
  unset($caps[1]['strc_manage_finance']);$wpdb->update('qa_posts',['post_content'=>wp_json_encode($registration+[])],['ID'=>11]);$waiting=$registration;$waiting['state']='waiting';$wpdb->update('qa_posts',['post_content'=>wp_json_encode($waiting)],['ID'=>11]);$meta[10]=['strc_start_at'=>'2099-01-01','strc_capacity'=>5];
  $r=jsonCall($finance,['operation'=>'promote','eventId'=>'10','id'=>'11','nonce'=>'valid','revision'=>\SwissTRClub\Core\Forms\FormStore::revision(get_post(11))]);check($r->data['success']&&\SwissTRClub\Core\Forms\FormStore::data(get_post(11))['state']==='confirmed','Organiser can still promote waiting participant');
  $caps[1]=['strc_access_member_area'=>true,'strc_manage_finance'=>true];$r=jsonCall($finance,['operation'=>'promote','eventId'=>'10','id'=>'11','nonce'=>'valid']);check($r->status===403,'Finance alone cannot promote');
 }
 if(in_array($section,['all','library'],true)){
  resetFixture();$caps[1]['strc_access_board_documents']=true;seedPost(20,'strc_document');$meta[20]=['strc_form_classification'=>['documentType'=>'board-finance','access'=>'restricted'],'strc_private_files'=>[['key'=>'pdf','mime'=>'application/pdf']]];
  $community=new \SwissTRClub\Core\Community\CommunityEndpoint();
  foreach(['publish','pending','draft','trash']as$status){$wpdb->update('qa_posts',['post_status'=>$status],['ID'=>20]);check(callPrivate($community,'post',20,true)->ID===20,'Board still reads restricted '.$status);try{callPrivate($community,'file',20,'pdf');}catch(Streamed){check(true,'Board still downloads restricted '.$status);}}
  foreach(['approve','reject','trash','restore']as$operation){$before=get_post(20);$beforeMeta=$meta;denied(fn()=>callPrivate($community,'status',$operation,20),403,'Board-only '.$operation.' denied');check(get_post(20)==$before&&$meta===$beforeMeta,'Denied '.$operation.' preserves status, files and metadata');}
  check(!callPrivate($community,'canEdit',get_post(20))&&!callPrivate($community,'canReview',get_post(20)),'Board reader has no editing or moderation authority');
  $wpdb->update('qa_posts',['post_status'=>'publish'],['ID'=>20]);denied(fn()=>callPrivate($community,'edit',['id'=>'20','title'=>'Changed']),403,'Board cannot edit another document');
  check(!\SwissTRClub\Core\Community\SubmissionNotifications::reviews(new WP_User(1),'library',true),'Board reader receives no review assignment');
  $wpdb->update('qa_posts',['post_author'=>1],['ID'=>20]);check(callPrivate($community,'canEdit',get_post(20))&&!callPrivate($community,'canReview',get_post(20)),'Board author keeps content editing only');
  $input=['id'=>'20','documentType'=>'board-finance','language'=>'de'];
  check(callPrivate($community,'classification',$input,'library',get_post(20))['access']==='restricted','Author omitted class preserves restricted access');
  denied(fn()=>callPrivate($community,'classification',$input+['access'=>'open'],'library',get_post(20)),403,'Author cannot downgrade board access');
  denied(fn()=>callPrivate($community,'classification',array_replace($input,['documentType'=>'technical','access'=>'open']),'library',get_post(20)),403,'Changing category cannot bypass author class protection');
  denied(fn()=>callPrivate($community,'classification',['documentType'=>'board-finance','language'=>'de','access'=>'open'],'library'),422,'Fresh board document enforces category minimum');
  check(callPrivate($community,'classification',['documentType'=>'board-finance','language'=>'de'],'library')['access']==='restricted','Board author still submits restricted documents');
  $caps[1]['strc_manage_library']=true;check(callPrivate($community,'canReview',get_post(20))&&\SwissTRClub\Core\Community\SubmissionNotifications::reviews(new WP_User(1),'library',true),'Actual library moderator can review restricted document');
  check(callPrivate($community,'classification',array_replace($input,['documentType'=>'technical','access'=>'limited']),'library',get_post(20))['access']==='limited','Moderator may explicitly reclassify permitted category');
  denied(fn()=>callPrivate($community,'classification',$input+['access'=>'open'],'library',get_post(20)),422,'Moderator cannot undercut restricted category');
  unset($caps[1]['strc_access_board_documents']);denied(fn()=>callPrivate($community,'post',20,true),404,'Library moderator without board access cannot read restricted document');
  check(!\SwissTRClub\Core\Community\SubmissionNotifications::reviews(new WP_User(1),'library',true)&&\SwissTRClub\Core\Community\SubmissionNotifications::reviews(new WP_User(1),'library'),'Review notification keeps classification boundary');
 }
 function subscriber():?array{return $GLOBALS['wpdb']->get_row("SELECT * FROM qa_strc_newsletter_subscribers WHERE email='victim@example.invalid'",ARRAY_A);}
 function seedSubscriber(string $status):array{$row=['email'=>'victim@example.invalid','user_id'=>2,'display_name'=>'Original','status'=>$status,'confirmation_hash'=>hash('sha256',str_repeat('a',64)),'unsubscribe_hash'=>hash('sha256',str_repeat('b',64)),'consent_source'=>'website-form','requested_at'=>'2025-01-01 10:00:00','confirmed_at'=>'2025-01-01 11:00:00','unsubscribed_at'=>$status==='unsubscribed'?'2025-01-02 10:00:00':null,'brevo_status'=>$status==='unsubscribed'?'remove_pending':'synced','brevo_attempts'=>2];$GLOBALS['wpdb']->insert('qa_strc_newsletter_subscribers',$row);return subscriber();}
 function subscribe(object $endpoint,string $name='Attacker'):JsonExit{$GLOBALS['transients']=[];return jsonCall($endpoint,['operation'=>'subscribe','email'=>'victim@example.invalid','name'=>$name,'consent'=>'1']);}
 function newsletterLink(object $endpoint,string $operation,string $token):string{$_GET=['email'=>'victim@example.invalid','token'=>$token];try{callPrivate($endpoint,'processLink',$operation);}catch(RedirectExit $e){parse_str(parse_url($e->url,PHP_URL_QUERY),$q);return $q['newsletter'];}throw new RuntimeException('Expected redirect');}
 function mailTokens():array{$body=end($GLOBALS['mails'])[2];preg_match_all('/token=([a-f0-9]{64})/',$body,$matches);return $matches[1];}
 if(in_array($section,['all','newsletter'],true)){
  $newsletter=new \SwissTRClub\Core\Mail\NewsletterEndpoint();
  resetFixture();$before=seedSubscriber('confirmed');$r=subscribe($newsletter);check($r->data['success']&&subscriber()===$before&&!$mails,'Unauthenticated resubscription preserves confirmed row and sends no replacement');
  resetFixture();$before=seedSubscriber('unsubscribed');subscribe($newsletter);$after=subscriber();unset($after['pending_request']);$control=$before;unset($control['pending_request']);check($after===$control,'Unconfirmed request preserves withdrawn consent, identity, old unsubscribe token and removal queue');
  [$token,$withdraw]=mailTokens();check(newsletterLink($newsletter,'confirm',str_repeat('c',64))==='invalid'&&subscriber()['status']==='unsubscribed','Wrong DOI leaves withdrawn consent');
  check(newsletterLink($newsletter,'unsubscribe',str_repeat('b',64))==='unsubscribed'&&subscriber()['pending_request']===null&&subscriber()['brevo_status']==='remove_pending','Old unsubscribe token cancels new pending request without losing removal');
  check(newsletterLink($newsletter,'confirm',$token)==='invalid','Unsubscription invalidates current DOI');
  subscribe($newsletter,'New name');[$first]=mailTokens();subscribe($newsletter,'Final name');[$latest,$withdraw]=mailTokens();check(newsletterLink($newsletter,'confirm',$first)==='invalid','Superseded DOI token cannot confirm');
  check(newsletterLink($newsletter,'confirm',$latest)==='confirmed'&&subscriber()['display_name']==='Final name'&&subscriber()['brevo_status']==='remove_pending'&&subscriber()['pending_request']===null,'Only latest DOI adopts identity while retaining prior removal');
  check(newsletterLink($newsletter,'confirm',$latest)==='invalid','DOI replay cannot change state');
  $newsletter->syncPending();check(count($http)===1&&str_ends_with($http[0][0],'/remove')&&subscriber()['brevo_status']==='pending','Confirmed resubscription removes old external membership first');
  $newsletter->syncPending();check(count($http)===2&&str_ends_with($http[1][0],'/contacts')&&subscriber()['brevo_status']==='synced','Subsequent worker adds only confirmed membership');
  check(newsletterLink($newsletter,'unsubscribe',$withdraw)==='unsubscribed','Confirmed user can still withdraw');
  $httpCode=500;$newsletter->syncPending();check(subscriber()['brevo_status']==='remove_pending','Failed external removal remains queued');
  $httpCode=204;$newsletter->syncPending();check(subscriber()['brevo_status']==='removed','Retried external removal succeeds');
  resetFixture();subscribe($newsletter,'Fresh');[$token,$withdraw]=mailTokens();check(subscriber()['status']==='pending'&&newsletterLink($newsletter,'confirm',$token)==='confirmed','Fresh subscription still requires and accepts DOI');
  resetFixture();seedSubscriber('pending');check(newsletterLink($newsletter,'confirm',str_repeat('a',64))==='confirmed','Existing pre-migration pending DOI link remains valid');
  resetFixture();seedSubscriber('pending');$wpdb->update('qa_strc_newsletter_subscribers',['pending_request'=>'{"bad":true}'],['id'=>1]);check(newsletterLink($newsletter,'confirm',str_repeat('a',64))==='invalid','Malformed pending payload cannot fall back to stale legacy DOI');
  resetFixture();$before=seedSubscriber('unsubscribed');$mailOK=false;check(subscribe($newsletter)->status===503&&subscriber()['status']==='unsubscribed'&&subscriber()['unsubscribe_hash']===$before['unsubscribe_hash']&&subscriber()['brevo_status']==='remove_pending','Mail failure preserves effective consent and removal');
  resetFixture();$before=seedSubscriber('unsubscribed');$wpdb->busy=true;check(subscribe($newsletter)->status===503&&subscriber()===$before&&!$mails,'Busy consent lock fails closed without mail');
  resetFixture();$before=seedSubscriber('unsubscribed');$wpdb->fail=true;check(subscribe($newsletter)->status===503&&subscriber()===$before&&!$mails,'Failed write fails closed without mail');
  resetFixture();seedSubscriber('unsubscribed');subscribe($newsletter);[$token,$withdraw]=mailTokens();check(newsletterLink($newsletter,'unsubscribe',$withdraw)==='unsubscribed'&&newsletterLink($newsletter,'confirm',$token)==='invalid','Pending email withdrawal invalidates DOI');
  resetFixture();seedSubscriber('confirmed');$wpdb->update('qa_strc_newsletter_subscribers',['brevo_status'=>'pending','brevo_attempts'=>0],['id'=>1]);$duringHTTP=static function()use($newsletter){check(newsletterLink($newsletter,'unsubscribe',str_repeat('b',64))==='unsubscribed','Valid withdrawal succeeds during worker HTTP wait');};$newsletter->syncPending();check(subscriber()['status']==='unsubscribed'&&subscriber()['brevo_status']==='remove_pending','Stale worker response cannot overwrite subsequent withdrawal');
  resetFixture();check(subscribe($newsletter,str_repeat('x',191))->status===422&&!subscriber()&&!$mails,'Overlong identity is rejected before DOI storage');
 }
 echo json_encode(['passed'=>count($checks),'checks'=>$checks],JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE)."\n";
}

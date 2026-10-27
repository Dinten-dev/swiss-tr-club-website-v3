<?php
/** Disposable staging fixtures; no real messages, external writes, or scheduled cleanup. */
if(!defined('WP_CLI')||!WP_CLI||wp_get_environment_type()!=='staging')throw new RuntimeException('Staging QA only');
if(!defined('DOING_AJAX'))define('DOING_AJAX',true);
if(class_exists('SwissTRClub\\Core\\Plugin',false))throw new RuntimeException('Skip canonical core');
require getenv('STRC_QA_PLUGIN').'/strc-core.php';require __DIR__.'/role-overlay.php';
use SwissTRClub\Core\Community\{CommunityEndpoint,LibraryPolicy};
use SwissTRClub\Core\Content\{HomepageStats,HomepageActivity,HomepageHighlights};
use SwissTRClub\Core\Infrastructure\PublicNamePrivacy;
use SwissTRClub\Core\Events\{EventPostType,EventManagementEndpoint};
global $wpdb,$checks;$checks=[];$users=[];$posts=[];$mails=0;$network=0;$prefix='strc5254qa_'.bin2hex(random_bytes(5));$cache=get_transient('strc_homepage_stats_v2');
final class P54Stop extends Error {}
function p54check(bool $ok,string $label):void{global$checks;if(!$ok)throw new RuntimeException($label);$checks[]=$label;}
function p54call(object $object,string $method,mixed ...$args):mixed{return(new ReflectionMethod($object,$method))->invoke($object,...$args);}
function p54denied(callable $fn,string $label):void{ob_start();try{$fn();ob_end_clean();throw new RuntimeException('Expected denial: '.$label);}catch(P54Stop){$body=json_decode(ob_get_clean(),true);p54check(($body['success']??true)===false&&!empty($body['data']['message']),$label);}}
add_filter('wp_die_ajax_handler',static fn()=>static function(){throw new P54Stop();});add_filter('wp_die_handler',static fn()=>static function(){throw new P54Stop();});
add_filter('pre_wp_mail',static function()use(&$mails){$mails++;return true;});add_filter('pre_http_request',static function()use(&$network){$network++;return new WP_Error('qa','Blocked');});
$community=new CommunityEndpoint();$community->registerHooks();(new EventPostType())->register();
foreach(['strc_document','strc_topic','strc_album']as$type)if(!post_type_exists($type))register_post_type($type,['public'=>false]);
try{
 foreach(['member','library','admin']as$name){$id=wp_insert_user(['user_login'=>$prefix.$name,'user_email'=>$prefix.$name.'@example.invalid','user_pass'=>wp_generate_password(40),'role'=>'strc_member']);if(is_wp_error($id))throw new RuntimeException('Fixture failed');$users[$name]=(int)$id;}
 (new WP_User($users['library']))->add_cap('strc_manage_library');(new WP_User($users['admin']))->add_cap('list_users');
 $document=static function(string $status='publish',string $access='open')use(&$posts,$users,$prefix):int{$id=wp_insert_post(['post_type'=>'strc_document','post_status'=>$status,'post_title'=>$prefix.' document','post_author'=>$users['member']]);$posts[]=$id;LibraryPolicy::index($id,['documentType'=>'technical','access'=>$access,'language'=>'de','models'=>[]]);update_post_meta($id,'strc_form_classification',['documentType'=>'technical','access'=>$access,'language'=>'de']);return $id;};
 $old=$document();$new=$document('pending');update_post_meta($new,'strc_replaces',$old);
 $key=bin2hex(random_bytes(20));$store=new SwissTRClub\Core\Community\PrivateUploadStore();$directory=p54call($store,'directory');$file=$directory.'/'.$key;file_put_contents($file,'Synthetic library preservation fixture');$fileHash=hash_file('sha256',$file);update_post_meta($old,'strc_private_files',[['key'=>$key,'name'=>'QA.pdf','mime'=>'application/pdf','size'=>filesize($file)]]);
 wp_set_current_user($users['member']);p54denied(fn()=>p54call($community,'status','trash',$old),'Members cannot archive even their own library document');p54denied(fn()=>p54call($community,'listing',['kind'=>'library','trash'=>'1']),'Members cannot read the library archive');
 wp_set_current_user($users['library']);p54call($community,'status','approve',$new);
 p54check(get_post_status($new)==='publish'&&get_post_status($old)==='trash'&&(int)get_post_meta($old,'strc_replaced_by',true)===$new,'Approval publishes replacement and archives predecessor');p54check(hash_file('sha256',$file)===$fileHash,'Archiving preserves original document file');
 $other=$document('pending');update_post_meta($other,'strc_replaces',$old);p54denied(fn()=>p54call($community,'status','approve',$other),'Concurrent second replacement cannot silently approve');p54check(get_post_status($other)==='pending','Conflicting replacement remains pending');
 global$wp_current_filter;$wp_current_filter[]='wp_scheduled_delete';try{$decision=apply_filters('pre_delete_post',null,get_post($old),true);}finally{array_pop($wp_current_filter);}p54check($decision===false,'Scheduled deletion retains archived library documents');
 p54call($community,'status','restore',$old);p54check(get_post_status($old)==='publish'&&!get_post_meta($old,'strc_replaced_by',true),'Reviewer restore publishes and clears replacement marker');
 $blocked=$document();$pending=$document('pending');update_post_meta($pending,'strc_replaces',$blocked);$block=static fn($result,$post)=>$post->ID===$blocked?false:$result;add_filter('pre_trash_post',$block,10,2);try{p54denied(fn()=>p54call($community,'status','approve',$pending),'Failed archive reports failure instead of false success');}finally{remove_filter('pre_trash_post',$block,10);}p54check(get_post_status($pending)==='pending'&&get_post_status($blocked)==='publish'&&!get_post_meta($blocked,'strc_replaced_by',true),'Archive failure preserves original and rolls back new publication');
 $restricted=$document('publish','restricted');$unpublished=$document('draft');
 wp_set_current_user($users['member']);p54check(p54call($community,'link',$restricted)===null&&p54call($community,'link',$unpublished)===null,'Document references conceal restricted and unpublished titles');
 wp_set_current_user($users['library']);$attempt=$document('pending');update_post_meta($attempt,'strc_replaces',$restricted);p54denied(fn()=>p54call($community,'status','approve',$attempt),'Library moderation cannot replace unreadable board document');
 p54denied(fn()=>p54call($community,'create',['kind'=>'library','title'=>'QA','description'=>'QA','documentType'=>'technical','language'=>'de','access'=>'open','rights'=>'1','replaces'=>$restricted]),'Replacement upload validates target before storing files');
 p54check(get_post_status($restricted)==='publish'&&get_post_status($attempt)==='pending','Restricted original and pending candidate preserved');
 $privacy=new PublicNamePrivacy();$routes=['/wp/v2/users'=>[],'/wp/v2/users/(?P<id>[\\d]+)'=>[],'/strc/v1/example'=>[]];wp_set_current_user(0);p54check(array_keys($privacy->restEndpoints($routes))===['/strc/v1/example'],'Public WordPress user routes removed');wp_set_current_user($users['member']);p54check(array_keys($privacy->restEndpoints($routes))===['/strc/v1/example'],'Member cannot enumerate WordPress users');wp_set_current_user($users['admin']);p54check($privacy->restEndpoints($routes)===$routes,'Authorized user administration retains REST routes');
 wp_set_current_user(0);$previousAuthor=$_GET['author']??null;$previousQuery=$GLOBALS['wp_query'];$GLOBALS['wp_query']=new WP_Query();$_GET['author']='1';try{$privacy->authorArchives();p54check(is_404()&&apply_filters('redirect_canonical','https://example.invalid/author/qa','https://example.invalid/?author=1')===false,'Author enumeration is blocked before canonical slug redirect');}finally{$GLOBALS['wp_query']=$previousQuery;if($previousAuthor===null)unset($_GET['author']);else $_GET['author']=$previousAuthor;remove_filter('redirect_canonical','__return_false');}
 $event=wp_insert_post(['post_type'=>'strc_event','post_status'=>'draft','post_title'=>$prefix.' meeting','post_author'=>$users['library']]);$posts[]=$event;wp_set_object_terms($event,'meeting','strc_event_type');$payload=p54call(new EventManagementEndpoint(),'present',$event);p54check($payload['eventType']==='meeting','Meeting retains its own event type when editing');wp_set_object_terms($event,$payload['eventType'],'strc_event_type');p54check(wp_get_object_terms($event,'strc_event_type',['fields'=>'slugs'])===['meeting'],'Roundtrip never changes Meeting to Weekend Meeting');
 wp_set_current_user(0);delete_transient('strc_homepage_stats_v2');$stats=(new HomepageStats())->summary();p54check(array_keys($stats)===['members','vehicles','youth','regions'],'Homepage statistics expose only aggregate fields');p54check(!in_array('triungsters',array_column($stats['regions'],'slug'),true)&&count($stats['regions'])===7,'Homepage map lists seven geographic club regions');
 $item=p54call(new HomepageActivity(),'item',$event,'gallery','QA','2026-10-27',$users['member'],2);p54check(($item['author']??'')==='','Homepage activity never includes member names');
 p54check($network===0&&$mails===0,'No external calls or messages during focused PR checks');echo wp_json_encode(['passed'=>count($checks),'checks'=>$checks]);
}finally{
 if(isset($file)&&is_file($file))unlink($file);
 foreach(array_reverse($posts)as$id)wp_delete_post($id,true);
 require_once ABSPATH.'wp-admin/includes/user.php';foreach($users as$id)wp_delete_user($id);
 if($cache!==false)set_transient('strc_homepage_stats_v2',$cache,30*MINUTE_IN_SECONDS);else delete_transient('strc_homepage_stats_v2');wp_set_current_user(0);
}

<?php
/** Isolated editorial regressions. No WordPress, real uploads, database or transport. */
declare(strict_types=1);
namespace { if(defined('ABSPATH'))throw new \RuntimeException('Run without WordPress.'); }
namespace SwissTRClub\Core\Editorial {
 final class EditorialAccess {public static function area(string $area):bool{return !empty($GLOBALS['areas'][$area]);}}
}
namespace SwissTRClub\Core\Http {
 final class AjaxRequest {public static function fail(string $message,int $code=400):never{throw new \RuntimeException($message,$code);}}
}
namespace SwissTRClub\Core\Community {
 final class PrivateUploadStore {
  public function webCopy(array $file):array{$GLOBALS['copies'][]=$file['key'];return [];}
  public function expireOriginal(array $file):bool{$GLOBALS['expired'][]=$file['key'];return true;}
 }
}
namespace {
 class WP_Post {
  public string $post_date='2026-01-01 00:00:00';public string $post_date_gmt='2026-01-01 00:00:00';
  public function __construct(public int $ID,public string $post_type,public string $post_status='publish',public int $post_author=2,public string $post_title='Fixture',public string $post_content=''){}
 }
 function get_current_user_id():int{return 1;}
 function current_user_can(string $cap):bool{return !empty($GLOBALS['caps'][$cap]);}
 function user_can(int $id,string $cap):bool{return current_user_can($cap);}
 function get_option(string $key):mixed{return $GLOBALS['options'][$key]??false;}
 function update_option(string $key,mixed $value,mixed ...$args):bool{$GLOBALS['options'][$key]=$value;return true;}
 function get_post(int $id):?WP_Post{return $GLOBALS['posts'][$id]??null;}
 function get_post_meta(int $id,string $key,bool $single=true):mixed{return $GLOBALS['meta'][$id][$key]??'';}
 function update_post_meta(int $id,string $key,mixed $value):bool{$GLOBALS['meta'][$id][$key]=$value;return true;}
 function get_posts(array $args):array{
  $rows=array_filter($GLOBALS['posts'],static function($post)use($args):bool{
   if($post->post_type!==$args['post_type']||!in_array($post->post_status,(array)$args['post_status'],true))return false;
   foreach($args['meta_query']??[] as $condition)if(is_array($condition)&&($condition['compare']??'')==='IN'&&!in_array(get_post_meta($post->ID,$condition['key'],true),$condition['value'],true))return false;
   return true;
  });
  $rows=array_values($rows);if(($args['posts_per_page']??-1)>0)$rows=array_slice($rows,0,$args['posts_per_page']);
  return ($args['fields']??'')==='ids'?array_column($rows,'ID'):$rows;
 }
 function wp_update_post(array $data):int{foreach($data as $key=>$value)if($key!=='ID')$GLOBALS['posts'][$data['ID']]->$key=$value;return $data['ID'];}
 function wp_delete_post(int $id,bool $force=false):bool{$GLOBALS['deleted'][]=$id;unset($GLOBALS['posts'][$id]);return true;}
 function sanitize_text_field(string $value):string{return strip_tags($value);}
 function wp_strip_all_tags(string $value):string{return strip_tags($value);}
 function add_action(string $hook,callable $callback,mixed ...$args):void{$GLOBALS['hooks'][$hook][]=$callback;}
 function add_filter(mixed ...$args):void{}
 function get_user_meta(mixed ...$args):string{return '';}
 function check(bool $result,string $label):void{if(!$result)throw new RuntimeException('FAILED: '.$label);$GLOBALS['checks'][]=$label;}
 function invoke(object $object,string $method,mixed ...$args):mixed{return (new ReflectionMethod($object,$method))->invoke($object,...$args);}
 function denied(callable $callback,int $code,string $label):void{try{$callback();}catch(RuntimeException $error){check($error->getCode()===$code,$label);return;}throw new RuntimeException('Unexpected permission: '.$label);}
 $checks=[];$posts=[];$meta=[];$options=[];$hooks=[];$deleted=[];$copies=[];$expired=[];$caps=['strc_access_member_area'=>true];$areas=[];
 $base=dirname(__DIR__,2).'/wordpress/wp-content/plugins/strc-core/src/Community/';
 foreach(['LibraryPolicy.php','CommunityEndpoint.php','GalleryRetention.php'] as $file)require $base.$file;
 $options['strc_library_types']=[['key'=>'board','group'=>'board','access'=>'restricted'],['key'=>'confidential','group'=>'board','access'=>'restricted'],['key'=>'custom','label'=>'Custom','group'=>'technical','access'=>'open','fields'=>[]]];
 for($id=1;$id<=205;$id++){
  $posts[$id]=new WP_Post($id,'strc_document',$id%2?'trash':'pending');
  $meta[$id]=['strc_document_type'=>$id%2?'board':'confidential','strc_document_access'=>'open','strc_form_classification'=>['documentType'=>$id%2?'board':'confidential','model'=>'TR6','access'=>'restricted'],'strc_private_files'=>[['key'=>'unchanged','name'=>'Minutes.pdf']]];
 }
 \SwissTRClub\Core\Community\LibraryPolicy::migrateBoardTypes();
 check(!get_option('strc_board_types_v1')&&$meta[200]['strc_document_type']==='board-finance'&&$meta[201]['strc_document_type']==='board','Board migration processes a bounded batch');
 \SwissTRClub\Core\Community\LibraryPolicy::migrateBoardTypes();
 check(get_option('strc_board_types_v1')===1&&$meta[205]['strc_document_type']==='board-meetings','Next batch completes migration');
 check($meta[1]['strc_document_access']==='restricted'&&$meta[1]['strc_form_classification']['access']==='restricted','Canonical and search access remain restricted');
 check($meta[1]['strc_form_classification']['model']==='TR6'&&$meta[1]['strc_private_files'][0]['key']==='unchanged'&&$posts[1]->post_status==='trash','Migration preserves metadata, files and archived status');
 check(str_contains($meta[1]['strc_document_search'],'board-meetings')&&str_contains($meta[2]['strc_document_search'],'board-finance'),'Search index uses migrated categories');
 check(in_array('custom',array_column($options['strc_library_types'],'key'),true)&&!in_array('board',array_column($options['strc_library_types'],'key'),true),'Custom types survive legacy category removal');
 check(\SwissTRClub\Core\Community\LibraryPolicy::type('confidential')==='board-finance','Legacy category resolves throughout migration');
 $snapshot=$meta;\SwissTRClub\Core\Community\LibraryPolicy::migrateBoardTypes();check($snapshot===$meta,'Completed migration is idempotent');
 $community=new \SwissTRClub\Core\Community\CommunityEndpoint();$caps['strc_access_board_documents']=true;
 check(invoke($community,'post',1,true)->ID===1&&!invoke($community,'canEdit',$posts[1])&&!invoke($community,'canReview',$posts[1]),'Board readers can open archives without moderation');
 denied(fn()=>invoke($community,'deleteTopic',1),403,'Board access never grants permanent deletion');
 $areas['library']=true;denied(fn()=>invoke($community,'deleteTopic',1),403,'Moderation cannot delete board archives');
 $posts[300]=new WP_Post(300,'strc_document','publish');$meta[300]=['strc_document_type'=>'custom','strc_form_classification'=>['access'=>'open']];
 denied(fn()=>invoke($community,'deleteTopic',300),422,'Published document cannot be permanently deleted');
 $posts[300]->post_status='trash';$posts[300]->post_author=1;$areas=[];
 denied(fn()=>invoke($community,'deleteTopic',300),403,'Document owner cannot permanently delete without moderation');
 $areas['library']=true;check(invoke($community,'deleteTopic',300)['deleted']&&$deleted===[300],'Moderator can permanently delete ordinary archived document');
 require dirname($base).'/Roles/RoleDefinitions.php';
 foreach(['strc_administrator','strc_superadmin'] as $role){
  $caps=\SwissTRClub\Core\Roles\RoleDefinitions::all()[$role]['capabilities'];$areas=['library'=>true];
  check(!isset($caps['strc_access_board_documents'])&&in_array('restricted',\SwissTRClub\Core\Community\LibraryPolicy::classes(),true),'Admin role overrides board classification: '.$role);
  check(invoke($community,'post',1,true)->ID===1&&invoke($community,'canEdit',$posts[1])&&invoke($community,'canReview',$posts[1]),'Admin role maintains archived board documents: '.$role);
  denied(fn()=>invoke($community,'deleteTopic',1),403,'Admin still cannot permanently delete board archives: '.$role);
 }
 $posts=[];$meta=[];$options=[];$areas=[];$caps=['strc_access_member_area'=>true];$hooks=[];
 foreach([400=>'pending',401=>'draft',402=>'trash',403=>'publish'] as $id=>$status){$posts[$id]=new WP_Post($id,'strc_album',$status);$meta[$id]['strc_private_files']=[['key'=>'photo'.$id,'reviewStatus'=>$id===403?'rejected':'pending','submittedBy'=>2,'retainOriginal'=>true]];}
 $community->registerHooks();$galleryMigration=end($hooks['init']);$galleryMigration();
 check($posts[400]->post_status==='publish'&&$meta[400]['strc_private_files'][0]['reviewStatus']==='approved','Waiting gallery becomes visible without prior review');
 check($posts[401]->post_status==='draft'&&$meta[401]['strc_private_files'][0]['reviewStatus']==='pending','Rejected draft album is not republished');
 check($posts[402]->post_status==='trash'&&$meta[403]['strc_private_files'][0]['reviewStatus']==='rejected','Archived albums and hidden photos remain hidden');
 check($meta[400]['strc_private_files'][0]['retainOriginal']===true,'Gallery migration preserves retention choice');
 $snapshot=$meta;$galleryMigration();check($meta===$snapshot,'Gallery migration is idempotent');
 $posts=[500=>new WP_Post(500,'strc_album')];$meta=[500=>['strc_private_files'=>[
  ['key'=>'protected','mime'=>'image/jpeg','uploadedAt'=>gmdate('c',strtotime('-6 months')),'retainOriginal'=>true],
  ['key'=>'young','mime'=>'image/jpeg','uploadedAt'=>gmdate('c',strtotime('-1 month'))],
  ['key'=>'old','mime'=>'image/jpeg','uploadedAt'=>gmdate('c',strtotime('-6 months'))],
  ['key'=>'unknown','mime'=>'image/jpeg'],
 ]]];
 (new \SwissTRClub\Core\Community\GalleryRetention())->run();
 check($expired===['protected','old','unknown']&&$copies===['protected','old','unknown'],'Four-month limit applies without retention exception; unknown dates count from album creation');
 check(!empty($meta[500]['strc_private_files'][0]['originalExpired'])&&empty($meta[500]['strc_private_files'][1]['originalExpired'])&&!empty($meta[500]['strc_private_files'][3]['originalExpired']),'Legacy retention flag no longer extends the limit');
 $posts=[501=>new WP_Post(501,'strc_album')];$meta=[501=>['strc_portrait'=>['vehicle'=>'TR6'],'strc_private_files'=>[['key'=>'portrait','mime'=>'image/jpeg','uploadedAt'=>gmdate('c',strtotime('-6 months'))]]]];$expired=[];$copies=[];
 (new \SwissTRClub\Core\Community\GalleryRetention())->run();
 check($expired===[]&&empty($meta[501]['strc_private_files'][0]['originalExpired']),'Member portraits are not gallery uploads and keep their image');
 echo json_encode(['passed'=>count($checks),'checks'=>$checks],JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE)."\n";
}

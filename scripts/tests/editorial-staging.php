<?php
/** Staging-only migration/retention acceptance. Synthetic records roll back; no mail or HTTP. */
declare(strict_types=1);
use SwissTRClub\Core\Community\LibraryPolicy;
use SwissTRClub\Core\Community\GalleryRetention;
use SwissTRClub\Core\Community\PrivateUploadStore;
if(!defined('WP_CLI')||!WP_CLI||home_url()!=='https://staging.swisstrclub.ch'||wp_get_environment_type()!=='staging')throw new RuntimeException('Staging WP-CLI required');
global $wpdb;
$checks=[];$posts=[];$paths=[];$options=[];$failure=null;$prefix='editorialqa_'.bin2hex(random_bytes(8));
$check=static function(bool $ok,string $label)use(&$checks):void{$checks[]=['test'=>$label,'passed'=>$ok];if(!$ok)throw new RuntimeException($label);};
add_filter('pre_wp_mail','__return_true',PHP_INT_MAX);
add_filter('pre_http_request',static fn()=>new WP_Error('qa','External transport blocked'),PHP_INT_MAX);
if(wp_using_ext_object_cache())throw new RuntimeException('This transaction fixture requires process-local object caching');
foreach([$wpdb->posts,$wpdb->postmeta,$wpdb->options]as$table){$row=$wpdb->get_row($wpdb->prepare('SHOW TABLE STATUS LIKE %s',$wpdb->esc_like($table)),ARRAY_A);$check(strtoupper($row['Engine']??'')==='INNODB','Transactional fixture table '.$table);}
$wpdb->query('START TRANSACTION');
try{
 $existingLegacy=get_posts(['post_type'=>'strc_document','post_status'=>['publish','pending','private','draft','trash'],'posts_per_page'=>1,'fields'=>'ids','meta_query'=>[['key'=>'strc_document_type','value'=>['board','confidential'],'compare'=>'IN']]]);
 $check(!$existingLegacy,'Deployed board migration is complete before synthetic test');
 update_option('strc_board_types_v1',false,false);
 $types=LibraryPolicy::types();$types[]=['key'=>'board','label'=>'Old board','group'=>'board','access'=>'restricted','fields'=>[]];$types[]=['key'=>'confidential','label'=>'Old confidential','group'=>'board','access'=>'restricted','fields'=>[]];update_option('strc_library_types',$types,false);
 foreach(['publish','pending','draft','trash']as$index=>$status){
  $id=wp_insert_post(['post_type'=>'strc_document','post_status'=>$status,'post_title'=>$prefix.' '.$status]);if(is_wp_error($id)||!$id)throw new RuntimeException('Fixture document failed');$posts[]=$id;
  $legacy=$index%2?'confidential':'board';update_post_meta($id,'strc_document_type',$legacy);update_post_meta($id,'strc_document_access','restricted');update_post_meta($id,'strc_form_classification',['documentType'=>$legacy,'access'=>'restricted','version'=>'fixture']);
 }
 LibraryPolicy::migrateBoardTypes();
 foreach($posts as$index=>$id){$data=get_post_meta($id,'strc_form_classification',true);$expected=$index%2?'board-finance':'board-meetings';$check(get_post_meta($id,'strc_document_type',true)===$expected&&$data['documentType']===$expected&&$data['access']==='restricted'&&$data['version']==='fixture'&&get_post_meta($id,'strc_document_access',true)==='restricted','Migration keeps canonical/indexed restricted access '.$index);$check(get_post_status($id)===['publish','pending','draft','trash'][$index],'Migration preserves original status '.$index);}
 $check((int)get_option('strc_board_types_v1')===1,'Board migration completes');
 $store=new PrivateUploadStore();$directory=(new ReflectionMethod($store,'directory'))->invoke($store);if(!is_dir($directory)&&!wp_mkdir_p($directory))throw new RuntimeException('Private fixture directory unavailable');
 $albums=[];$files=[];
 foreach(['old-retained','young','unknown-date','portrait','missing-copy']as$label){
  $id=wp_insert_post(['post_type'=>'strc_album','post_status'=>'publish','post_title'=>$prefix.' '.$label,'post_date'=>gmdate('Y-m-d H:i:s',strtotime('-6 months')),'post_date_gmt'=>gmdate('Y-m-d H:i:s',strtotime('-6 months'))]);if(!$id||is_wp_error($id))throw new RuntimeException('Fixture album failed');$posts[]=$id;$albums[]=$id;
  $key=bin2hex(random_bytes(20));$copy=bin2hex(random_bytes(20));$originalPath=$directory.'/'.$key;$bytes='Synthetic original '.$prefix.' '.$label;file_put_contents($originalPath,$bytes);chmod($originalPath,0600);$paths[$originalPath]=hash('sha256',$bytes);
  $file=['key'=>$key,'name'=>'fixture.jpg','mime'=>'image/jpeg','size'=>strlen($bytes),'retainOriginal'=>true];if($label!=='unknown-date')$file['uploadedAt']=gmdate('c',strtotime($label==='young'?'-1 month':'-6 months'));
  if($label!=='missing-copy'){$copyPath=$directory.'/'.$copy;$copyBytes='Synthetic web copy '.$prefix;file_put_contents($copyPath,$copyBytes);chmod($copyPath,0600);$paths[$copyPath]=hash('sha256',$copyBytes);$option='strc_web_image_'.$key;$options[]=$option;update_option($option,['key'=>$copy,'name'=>'fixture.jpg','mime'=>'image/jpeg','size'=>strlen($copyBytes)],false);}
  if($label==='portrait')update_post_meta($id,'strc_portrait',['vehicle'=>'TR6']);update_post_meta($id,'strc_private_files',[$file]);$files[$label]=['id'=>$id,'original'=>$originalPath,'copy'=>$label==='missing-copy'?null:$directory.'/'.$copy];
 }
 $restrict=static function($query)use($albums):void{if($query->get('post_type')==='strc_album')$query->set('post__in',$albums);};add_action('pre_get_posts',$restrict,PHP_INT_MAX);
 try{(new GalleryRetention())->run();}finally{remove_action('pre_get_posts',$restrict,PHP_INT_MAX);}
 foreach(['old-retained','unknown-date']as$label){$f=$files[$label];$check(!is_file($f['original'])&&is_file($f['copy'])&&!empty(get_post_meta($f['id'],'strc_private_files',true)[0]['originalExpired']),'Eligible original expires while web copy survives '.$label);}
 foreach(['young','portrait','missing-copy']as$label){$f=$files[$label];$check(is_file($f['original'])&&empty(get_post_meta($f['id'],'strc_private_files',true)[0]['originalExpired']),'Original remains where required '.$label);}
}catch(Throwable $error){$failure=['message'=>$error->getMessage(),'line'=>$error->getLine()];}
finally{
 $wpdb->query('ROLLBACK');foreach($posts as$id)clean_post_cache($id);foreach($options as$option)wp_cache_delete($option,'options');wp_cache_delete('alloptions','options');wp_cache_delete('notoptions','options');
 foreach($paths as$path=>$hash)if(is_file($path)){if(hash_file('sha256',$path)!==$hash)throw new RuntimeException('Unexpected fixture file content');unlink($path);}
}
$remaining=(int)$wpdb->get_var($wpdb->prepare("SELECT COUNT(*) FROM {$wpdb->posts} WHERE post_title LIKE %s",$wpdb->esc_like($prefix).'%'));
$check($remaining===0&&!array_filter(array_keys($paths),'is_file'),'All synthetic records and files removed');
echo wp_json_encode(['target'=>home_url(),'checks'=>$checks,'passed'=>count(array_filter($checks,static fn($item)=>$item['passed'])),'failure'=>$failure,'rolledBack'=>true,'fixtureFilesRemoved'=>count($paths),'realMailCount'=>0,'realExternalRequests'=>0])."\n";
if($failure)throw new RuntimeException('Editorial staging acceptance failed');

<?php
/** Run through WP-CLI eval-file. Default: inspect; STRC_APPLY_BAUR_CONTENT=1 applies exact corrections. */
if(!defined('WP_CLI')||!WP_CLI)throw new RuntimeException('WP-CLI required');
$key='strc_content_agenda';$before=get_option($key,[]);$after=$before;$changes=[];
foreach(['published','draft'] as $state){
 foreach(['intro','landingBody','body','text'] as $field){
  $text=$after[$state][$field]??null;if(!is_string($text))continue;
  $fixed=preg_replace(['/\bunserm\b/u','/\babwechlungsreichen\b/u'],['unserem','abwechslungsreichen'],$text);
  if($fixed!==$text){$after[$state][$field]=$fixed;$changes[]=['state'=>$state,'field'=>$field,'before'=>$text,'after'=>$fixed];}
 }
}
$hash=hash('sha256',serialize($before));
if(getenv('STRC_APPLY_BAUR_CONTENT')==='1'&&$changes){
 if(!hash_equals($hash,(string)getenv('STRC_BAUR_CONTENT_HASH')))throw new RuntimeException('Inspect current content first and pass its hash.');
 $backup='strc_baur_agenda_backup_'.substr($hash,0,16);if(!add_option($backup,$before,'',false)&&get_option($backup)!==$before)throw new RuntimeException('Backup failed');
 $after['revision']=(int)($before['revision']??0)+1;
 global $wpdb;
 $saved=$wpdb->query($wpdb->prepare("UPDATE {$wpdb->options} SET option_value=%s WHERE option_name=%s AND BINARY option_value=BINARY %s",maybe_serialize($after),$key,maybe_serialize($before)));
 if($saved!==1)throw new RuntimeException('Content changed concurrently; nothing applied');
 wp_cache_delete($key,'options');
}
echo wp_json_encode(['hash'=>$hash,'applied'=>getenv('STRC_APPLY_BAUR_CONTENT')==='1'&&count($changes)>0,'changes'=>$changes],JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE);

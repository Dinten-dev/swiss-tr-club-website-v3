<?php
/** Run without WordPress. Exercises the real migration against an in-memory options store. */
declare(strict_types=1);
if(defined('ABSPATH'))throw new RuntimeException('Isolated fixture required');
define('WP_CLI',true);
$original=['revision'=>7,'published'=>['landingBody'=>'In unserm abwechlungsreichen Jahresprogramm.','landingImage'=>'/original.png'],'draft'=>['intro'=>'In unserm Club.','landingBody'=>'Entwurf bleibt erhalten.'],'history'=>[['at'=>'previous']],'custom'=>'preserve'];
$options=['strc_content_agenda'=>$original];$checks=[];
function get_option(string $key,mixed $default=false):mixed{return $GLOBALS['options'][$key]??$default;}
function add_option(string $key,mixed $value,mixed $deprecated='',bool $autoload=false):bool{if(isset($GLOBALS['options'][$key]))return false;$GLOBALS['options'][$key]=$value;return true;}
function maybe_serialize(mixed $value):string{return serialize($value);}
function wp_cache_delete(string $key,string $group):void{}
function wp_json_encode(mixed $value,int $flags=0):string{return json_encode($value,$flags);}
$wpdb=new class {
 public string $options='qa_options';public bool $concurrent=false;private string $sql='';private array $args=[];
 public function prepare(string $sql,mixed ...$args):string{$this->sql=$sql;$this->args=$args;return $sql;}
 public function query(string $sql):int{
  [$next,$key,$previous]=$this->args;
  if($this->concurrent)$GLOBALS['options'][$key]['published']['landingBody']='In Unserm abwechlungsreichen Jahresprogramm.';
  $actual=serialize($GLOBALS['options'][$key]);$binary=str_contains($this->sql,'BINARY option_value=BINARY');
  if($binary?$actual!==$previous:strcasecmp($actual,$previous)!==0)return 0;
  $GLOBALS['options'][$key]=unserialize($next);return 1;
 }
};
function runMigration():array{ob_start();try{require dirname(__DIR__).'/apply-baur-agenda-copy.php';return json_decode(ob_get_contents(),true);}finally{ob_end_clean();}}
function verify(bool $value,string $label):void{if(!$value)throw new RuntimeException($label);$GLOBALS['checks'][]=$label;}
putenv('STRC_APPLY_BAUR_CONTENT');putenv('STRC_BAUR_CONTENT_HASH');
$preview=runMigration();verify(!$preview['applied']&&$options['strc_content_agenda']===$original,'Dry run never writes content');verify(count($preview['changes'])===2,'Preview contains exactly the two affected text fields');
putenv('STRC_APPLY_BAUR_CONTENT=1');putenv('STRC_BAUR_CONTENT_HASH=stale');try{runMigration();throw new LogicException('Stale hash was accepted');}catch(RuntimeException){verify($options['strc_content_agenda']===$original,'Stale review hash blocks all writes');}
putenv('STRC_BAUR_CONTENT_HASH='.$preview['hash']);$result=runMigration();$saved=$options['strc_content_agenda'];verify($result['applied']&&$saved['revision']===8&&$saved['published']['landingBody']==='In unserem abwechslungsreichen Jahresprogramm.','Approved correction updates exact words and revision');
verify($saved['published']['landingImage']==='/original.png'&&$saved['draft']['landingBody']===$original['draft']['landingBody']&&$saved['history']===$original['history']&&$saved['custom']==='preserve','Images, unrelated draft text and history are preserved');
verify($options['strc_baur_agenda_backup_'.substr($preview['hash'],0,16)]===$original,'Full original option is retained as backup');
putenv('STRC_APPLY_BAUR_CONTENT');$again=runMigration();verify(!$again['changes'],'Repeated preview is empty');
$options['strc_content_agenda']=$original;$wpdb->concurrent=true;
putenv('STRC_APPLY_BAUR_CONTENT=1');putenv('STRC_BAUR_CONTENT_HASH='.$preview['hash']);
try{runMigration();throw new LogicException('Concurrent case-only change was overwritten');}catch(RuntimeException $error){verify($error->getMessage()==='Content changed concurrently; nothing applied'&&$options['strc_content_agenda']['published']['landingBody']==='In Unserm abwechlungsreichen Jahresprogramm.','Concurrent case-only editorial change blocks migration');}
putenv('STRC_APPLY_BAUR_CONTENT');putenv('STRC_BAUR_CONTENT_HASH');
echo json_encode(['passed'=>count($checks),'checks'=>$checks],JSON_PRETTY_PRINT);

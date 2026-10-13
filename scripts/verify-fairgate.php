<?php
/** Standalone contract tests with HTTP/WordPress/database test doubles; no real API calls. */
declare(strict_types=1);
if (defined('ABSPATH')) throw new RuntimeException('Run outside WordPress.');
define('ARRAY_A','ARRAY_A');
final class FgResponse extends RuntimeException { public function __construct(public mixed $data,public int $status=200) {parent::__construct('Response');} }
$GLOBALS['fg_cache']=array();$GLOBALS['fg_posts']=array();$GLOBALS['fg_members']=array();$GLOBALS['fg_meta']=array();$GLOBALS['fg_save_fail']=false;
function get_option($key,$default=false){return $GLOBALS['fg_options'][$key]??$default;}
function get_terms($args){return [(object)['slug'=>'bern','name'=>'Bern']];}
function sanitize_textarea_field($v){return strip_tags($v);}
function is_email($v){return filter_var($v,FILTER_VALIDATE_EMAIL);}
function get_transient($key){return $GLOBALS['fg_cache'][$key] ?? false;}
function set_transient($key,$value,$ttl){$GLOBALS['fg_cache'][$key]=$value;return true;}
function delete_transient($key){unset($GLOBALS['fg_cache'][$key]);return true;}
function wp_json_encode($v,$flags=0){return json_encode($v,$flags);}
function wp_slash($v){return $v;}
function wp_unslash($v){return $v;}
function wp_salt($scheme){return 'test-only-salt';}
function home_url(){return 'https://club.test';}
function sanitize_url($v){return $v;}
function nocache_headers(){}
function wp_create_nonce($action){return 'valid';}
function wp_verify_nonce($nonce,$action){return $nonce==='valid';}
function wp_send_json_success($data){throw new FgResponse($data);}
function wp_send_json_error($data,$status){throw new FgResponse($data,$status);}
function current_time($format){return '2026-09-20 12:00:00';}
function update_user_meta($user,$key,$value){$GLOBALS['fg_meta'][$user][$key]=$value;return true;}
function is_wp_error($v){return false;}
function wp_insert_post($data,$error=false){$id=count($GLOBALS['fg_posts'])+1;$GLOBALS['fg_posts'][$id]=$data;return $id;}
function wp_update_post($data,$error=false){if($GLOBALS['fg_save_fail'])return 0;$GLOBALS['fg_posts'][$data['ID']]=array_merge($GLOBALS['fg_posts'][$data['ID']],$data);return $data['ID'];}
function get_posts($query){return array_slice($GLOBALS['fg_cleanup_posts']??array(),$query['offset']??0,$query['numberposts']);}
function wp_delete_post($id,$force){$GLOBALS['fg_deleted'][]=$id;return true;}
function register_post_type($type,$args){$GLOBALS['fg_type']=$args;}
$GLOBALS['wpdb']=new class {
 public string $prefix='wp_'; public string $posts='wp_posts'; public bool $locked=true;
 public function prepare($sql,...$args){return array($sql,$args);}
 public function get_var($q){[$sql,$args]=$q;if(str_contains($sql,'GET_LOCK'))return $this->locked?'1':'0';if(str_contains($sql,'RELEASE_LOCK'))return '1';if(str_contains($sql,'SELECT ID')){foreach($GLOBALS['fg_posts'] as $id=>$post)if(($post['post_excerpt']??'')===$args[0])return $id;}return null;}
 public function get_row($q,$format){return $GLOBALS['fg_members'][$q[1][0]]??null;}
 public function update($table,$fields,$where){foreach($GLOBALS['fg_members'] as &$row)if($row['id']===$where['id']){$row=array_merge($row,$fields);return 1;}return false;}
};
$src=(is_dir(dirname(__DIR__).'/wordpress')?dirname(__DIR__).'/wordpress':dirname(__DIR__)).'/wp-content/plugins/strc-core/src/';
require $src.'Http/AjaxRequest.php';
require $src.'Forms/FormFields.php';
foreach(array('FairgateApiException','FairgateConfiguration','FairgateClient','FairgateGateway','FairgateApplicationSettings','FairgateApplications','FairgateMemberMapping','FairgateMemberSync') as $file)require $src.'Integrations/Fairgate/'.$file.'.php';
use SwissTRClub\Core\Integrations\Fairgate\{FairgateApiException,FairgateConfiguration,FairgateClient,FairgateGateway,FairgateApplicationSettings,FairgateApplications,FairgateMemberMapping,FairgateMemberSync};
$count=0;
function ok($condition,$label){global $count;if(!$condition)throw new RuntimeException('FAIL '.$label);$count++;echo 'PASS '.$label."\n";}
function rejects(callable $fn,$label,$status=null){try{$fn();}catch(FairgateApiException $e){ok($status===null||$e->httpStatus===$status,$label);return;}throw new RuntimeException('FAIL '.$label);}
$config=new FairgateConfiguration('test-oid','test-secret');
$requests=array();$answers=array();
$transport=function($method,$url,$options)use(&$requests,&$answers){$requests[]=array($method,$url,$options);if(!$answers)throw new RuntimeException('Unexpected HTTP request');$result=array_shift($answers);if($result instanceof Throwable)throw $result;return $result;};
function response($data,$status=200){return array('status'=>$status,'body'=>json_encode($data));}
$client=new FairgateClient($config,$transport);$gateway=new FairgateGateway($client,$config);
$answers[]=response(array('success'=>true,'data'=>array('token'=>'official-token','refresh_token'=>'refresh')));
ok($client->createAccessToken()==='official-token','Official data.token response accepted');
ok($requests[0][0]==='POST'&&!str_contains($requests[0][1],'test-secret'),'Access key stays out of URL');
$answers[]=response(array('access_token'=>'legacy-token'));
ok($client->createAccessToken()==='legacy-token','Support-guide access_token format remains compatible');
$answers[]=response(array('success'=>true,'data'=>array('contacts'=>array(),'pageNo'=>1,'totalPages'=>1)));
ok($client->listContacts('token')['contacts']===array(),'List response is unwrapped');
ok(str_contains(end($requests)[1],'pageNo=1&pageLimit=100'),'Required pagination retained');
$answers[]=response(array('success'=>false,'code'=>422,'message'=>'PRIVATE remote details'));
rejects(fn()=>$client->createAccessToken(),'HTTP 200 with success=false rejected',422);
$answers[]=array('status'=>200,'body'=>'not-json');rejects(fn()=>$client->createAccessToken(),'Invalid JSON rejected');
$answers[]=array('status'=>429,'body'=>'private','retryAfter'=>120);
try{$client->createAccessToken();}catch(FairgateApiException $e){ok($e->retryAfter===120&&!str_contains($e->getMessage(),'private'),'429 retains delay without remote body');}
rejects(fn()=>(new FairgateClient(new FairgateConfiguration('id','secret','','http://fsa.fairgate.ch'),$transport))->createAccessToken(),'HTTP API destination blocked');
rejects(fn()=>(new FairgateClient(new FairgateConfiguration('id','secret','','https://attacker.test'),$transport))->createAccessToken(),'Unapproved API destination blocked');
ok((new FairgateConfiguration('id','key','','https://fsa-test.fairgate.ch'))->isConfigured(),'Official test environment supported');
$answers[]=response(array('success'=>true,'data'=>array('token'=>'cached','refresh_token'=>'r1','expires_in'=>600)));
$before=count($requests);$gateway->connectionCheck();$gateway->connectionCheck();ok(count($requests)===$before+1,'Access token reused server-side');
$GLOBALS['fg_cache'][$config->cacheKey()]['expires_at']=time()-1;
$answers[]=response(array('success'=>true,'data'=>array('token'=>'renewed','refresh_token'=>'r2','expires_in'=>600)));
$gateway->connectionCheck();ok(str_contains(end($requests)[1],'/auth/refresh/')&&end($requests)[2]['json']['refresh_token']==='r1','Expired access token refreshed');
$answers[]=response(array(),401);$answers[]=response(array('data'=>array('token'=>'reauthed','expires_in'=>600)));$answers[]=response(array('data'=>array('basefields'=>array('contact_id'=>42))));
ok($gateway->contact('42')['basefields']['contact_id']===42,'401 read reauthenticates once');
$answers[]=response(array(),503);$before=count($requests);rejects(fn()=>$gateway->createContact(array('contactType'=>'single_person')),'Failed create is surfaced',503);ok(count($requests)===$before+1,'Create is never automatically replayed');
$settings=new FairgateApplicationSettings(true,array('email'=>'Email tenant field','phone'=>'Phone tenant field'));
ok(!(new FairgateApplicationSettings(false,array('email'=>'x')))->ready(),'Explicit enable flag required');
ok(!(new FairgateApplicationSettings(true,array()))->ready(),'Email field mapping required');
ok(!(new FairgateApplicationSettings(true,array('email'=>'x','phone'=>'x')))->ready(),'Duplicate field destinations blocked');
$input=array('first_name'=>'Test','last_name'=>'Person','email'=>'test@example.test','phone'=>'123','consent'=>'1','requestId'=>'00000000-0000-4000-8000-000000000001');
$payload=$settings->payload($input);
ok($payload['contactType']==='single_person'&&$payload['configured_fields']['Email tenant field']==='test@example.test','Application maps only configured tenant fields');
rejects(fn()=>$settings->payload(array_merge($input,array('consent'=>'0'))),'Consent required',422);
rejects(fn()=>$settings->payload(array_merge($input,array('email'=>'invalid'))),'Email validated',422);
rejects(fn()=>$settings->payload(array_merge($input,array('first_name'=>'<script>'))),'Unsafe name rejected',422);
$app=new FairgateApplications($gateway,$config,$settings);
$app->registerType();ok($GLOBALS['fg_type']['public']===false&&$GLOBALS['fg_type']['show_in_rest']===false&&$GLOBALS['fg_type']['capabilities']['read_private_posts']==='strc_manage_members','Application records private and capability restricted');
function callApp($app,$operation,$input=array(),$method='POST',$server=array()){
 $_SERVER=array_merge(array('REQUEST_METHOD'=>$method,'REMOTE_ADDR'=>'192.0.2.1','HTTP_ORIGIN'=>'https://club.test'),$server);$_POST=$_GET=array_merge(array('operation'=>$operation,'nonce'=>'valid'),$input);
 try{$app->respond();}catch(FgResponse $r){return $r;}throw new RuntimeException('No response');
}
$input=array_merge($input,['phone'=>'12345','membership_type'=>'single','street'=>'Test 1','postcode'=>'3000','city'=>'Bern','country'=>'Schweiz','region'=>'bern','statutes'=>'1','privacy'=>'1','vehicles'=>json_encode([['model'=>'TR6','registration'=>'BE 12345']])]);
$GLOBALS['fg_options']['strc_membership_intake_enabled']=false;
$disabled=new FairgateApplications($gateway,$config,new FairgateApplicationSettings(false,array()));
$r=callApp($disabled,'config',array(),'GET');ok(!$r->data['available']&&$r->data['nonce']==='','Disabled form exposes no submit nonce');
ok(callApp($disabled,'submit',$input)->status===503,'Disabled server rejects direct submission');
$GLOBALS['fg_options']['strc_membership_intake_enabled']=true;
ok(callApp($app,'submit',$input,'GET')->status===405,'GET cannot submit');
ok(callApp($app,'submit',array_merge($input,array('nonce'=>'wrong')))->status===403,'Invalid nonce rejected');
ok(callApp($app,'submit',$input,'POST',array('HTTP_ORIGIN'=>'https://other.test'))->status===403,'Foreign origin rejected');
ok(callApp($app,'submit',array_merge($input,array('website'=>'bot')))->status===422,'Honeypot rejected');
ok(callApp($app,'submit',$input,'POST',array('CONTENT_LENGTH'=>20001))->status===413,'Oversized submission rejected');
$before=count($requests);
$r=callApp($app,'submit',$input);ok($r->status===200&&$r->data['received'],'Application received');
$data=json_decode($GLOBALS['fg_posts'][1]['post_content'],true);ok($data['state']==='pending_review'&&count($requests)===$before,'New application stays pending without external write');
$r=callApp($app,'submit',array_merge($input,array('requestId'=>'00000000-0000-4000-8000-000000000002')));ok($r->status===200&&count($requests)===$before&&count($GLOBALS['fg_posts'])===1,'Same email across request IDs cannot duplicate application');
$r=callApp($app,'submit',array_merge($input,array('email'=>'second@example.test')));ok($r->status===200,'Another application safely retained');
ok(json_decode($GLOBALS['fg_posts'][2]['post_content'],true)['state']==='pending_review','Review state retained independently of API availability');
callApp($app,'submit',array_merge($input,array('email'=>'second@example.test')));ok(count($requests)===$before,'Retry never transfers unreviewed application');
callApp($app,'submit',array_merge($input,array('email'=>'third@example.test')));ok(json_decode($GLOBALS['fg_posts'][3]['post_content'],true)['state']==='pending_review','All new applications require review');
ok(callApp($app,'submit',array_merge($input,array('email'=>'fourth@example.test')))->status===429&&count($requests)===$before,'Sixth request blocked server-side before Fairgate');
$mapping=new FairgateMemberMapping(array('contactId'=>'/basefields/contact_id','status'=>'/membership/membership','region'=>'/configured_fields/Region'),array('approved-member'=>'active','former-member'=>'inactive'));
$contact=array('basefields'=>array('contact_id'=>42),'membership'=>array('membership'=>'approved-member'),'configured_fields'=>array('Region'=>'Bern'));
ok($mapping->map($contact,'42')['status']==='active','Explicit membership value mapped');
rejects(fn()=>$mapping->map($contact,'43'),'Mismatched Contact ID rejected');
rejects(fn()=>$mapping->map(array_merge($contact,array('membership'=>array('membership'=>'unrecognized'))),'42'),'Unknown membership status rejected');
rejects(fn()=>$mapping->map(array('basefields'=>array('contact_id'=>42),'status'=>'active'),'42'),'Contact active alone cannot grant membership');
$sync=new FairgateMemberSync($gateway,$mapping);$GLOBALS['fg_members'][9]=array('id'=>1,'user_id'=>9,'fairgate_contact_id'=>null,'status'=>'pending','annual_fee'=>'120.00','partner_user_id'=>10);
$answers[]=response(array('data'=>$contact));$sync->synchronize(9,'42');ok($GLOBALS['fg_members'][9]['status']==='active'&&$GLOBALS['fg_members'][9]['fairgate_contact_id']==='42','Explicit existing account linked and synchronized');
ok($GLOBALS['fg_members'][9]['annual_fee']==='120.00'&&$GLOBALS['fg_members'][9]['partner_user_id']===10,'Synchronization preserves fees and relationships');
$old=$GLOBALS['fg_members'][9];$answers[]=response(array(),503);rejects(fn()=>$sync->synchronize(9),'Outage is reported');ok($GLOBALS['fg_members'][9]===$old,'Outage preserves existing access');
rejects(fn()=>$sync->synchronize(9,'43'),'Existing identity link cannot silently change');
$contact['membership']['membership']='former-member';$answers[]=response(array('data'=>$contact));$sync->synchronize(9);ok($GLOBALS['fg_members'][9]['status']==='inactive','Confirmed former membership revokes access');
$answers[]=response(array('data'=>array('token'=>'forced','expires_in'=>600)));$before=count($requests);$gateway->connectionCheck(true);ok(count($requests)===$before+1,'Administrator connection check bypasses token cache');
$GLOBALS['fg_cleanup_posts']=array();
for($i=1;$i<=101;$i++)$GLOBALS['fg_cleanup_posts'][]=(object)array('ID'=>$i,'post_content'=>json_encode(array('state'=>$i===101?'delivered':'uncertain')));
$app->cleanup();ok($GLOBALS['fg_deleted']===array(101),'Cleanup scans past unresolved requests and preserves them');
ok(!$answers,'All expected HTTP responses consumed');
echo "TOTAL $count checks passed\n";

<?php
/** Synthetic regression: no WordPress, external requests, or messages. */
declare(strict_types=1);
namespace SwissTRClub\Core\Integrations\Fairgate {
 final class FairgateProfileWriter {
  public static array $calls=[]; public static bool $succeeds=true;
  public function __construct(array $config=[]) {}
  public function withCurrent(array $values): self { return $this; }
  public function mappedOnly(string $part,array $values): array {return array_filter(array_intersect_key($values,array_flip(['first_name','last_name','email','phone'])),static fn($v)=>(string)$v!=='');}
  public function write(string $id,string $part,array $values): bool {self::$calls[]=$values;return self::$succeeds;}
 }
}
namespace SwissTRClub\Core\Forms {
 final class FormFields {public static function contact(array $input,string $prefix,bool $guest,bool $required):array{return $input;}}
 final class FormStore {public static array $forms=[];public static function find(string $type,int $id):array{return [];}public static function intake(string $kind,array $payload,string $uuid,int $id):int{self::$forms[]=['kind'=>$kind,'payload'=>$payload];return count(self::$forms);}}
}
namespace SwissTRClub\Core\Members {
 final class MembershipRepository {public function findForUser(int $id):array{return ['user_id'=>$id,'membership_type'=>'individual','status'=>'active','fairgate_contact_id'=>'123','member_number'=>'42'];}}
 final class MembershipTypePolicy {public static function normalize(string $s):string{return $s;}}
}
namespace SwissTRClub\Core\Mail {final class MailTemplates {public static function render(string $key,string $lang,array $vars):array{return ['subject'=>'fixture','body'=>'fixture'];}}}
namespace {
 $meta=[];$users=[1=>(object)['ID'=>1,'display_name'=>'Fixture Member','user_email'=>'member@example.invalid']];
 function get_userdata(int $id):?object{return $GLOBALS['users'][$id]??null;}
 function get_user_meta(int $id,string $key,bool $single):mixed{return $GLOBALS['meta'][$id][$key]??'';}
 function update_user_meta(int $id,string $key,mixed $value):void{$GLOBALS['meta'][$id][$key]=$value;}
 function update_post_meta(int $id,string $key,mixed $value):void{}
 function wp_generate_uuid4():string{return '00000000-0000-4000-8000-000000000000';}
 function get_users(array $args):array{return [];}
 function is_email(string $email):bool{return (bool)filter_var($email,FILTER_VALIDATE_EMAIL);}
 function user_can(mixed $user,string $cap):bool{return false;}
 function home_url():string{return 'https://example.invalid';}
 function wp_mail(mixed $to,string $subject,string $message,array $headers=[]):bool{return true;}
 require __DIR__.'/../../wordpress/wp-content/plugins/strc-core/src/Members/MemberProfile.php';
 use SwissTRClub\Core\Members\MemberProfile;
 use SwissTRClub\Core\Integrations\Fairgate\FairgateProfileWriter as Writer;
 use SwissTRClub\Core\Forms\FormStore;
 function check(bool $condition,string $label):void{if(!$condition)throw new \RuntimeException($label);$GLOBALS['checks'][]=$label;}
 function reset_fixture():void{$GLOBALS['meta']=[];Writer::$calls=[];Writer::$succeeds=true;FormStore::$forms=[];foreach(['street'=>'Example 1','postcode'=>'3000','city'=>'Bern','country'=>'CH']as$k=>$v)update_user_meta(1,'strc_'.$k,$v);}
 $checks=[];$cp=['first_name'=>'Alex','last_name'=>'Example','gender'=>'female','birth_date'=>'1990-01-01','email'=>'copilot@example.invalid','phone'=>'+41000000000','street'=>'Example 1','postcode'=>'3000','city'=>'Bern','country'=>'CH','language'=>'de','salutation'=>'Frau'];
 reset_fixture();$p=new MemberProfile(new Writer());$out=$p->savePerson(1,$cp,true);
 check(count(Writer::$calls)===1&&array_keys(Writer::$calls[0])===['first_name','last_name','email','phone'],'Mapped fields are sent even when other fields are present');
 check(get_user_meta(1,'strc_copilot',true)['pendingSync']===true&&count(FormStore::$forms)===1,'Unmapped fields remain pending for manual review');
 check(FormStore::$forms[0]['payload']['birth_date']==='1990-01-01'&&str_contains($out['message'],'übrigen Angaben'),'Pending request keeps remaining data and reports partial success');
 $p->requestCouple(1);check(get_user_meta(1,'strc_copilot',true)['pendingSync']===true,'Couple request cannot clear partially pending data');
 check(FormStore::$forms[1]['payload']['copilotInFairgate']===true,'Couple request reports the mapped field transfer');
 reset_fixture();Writer::$succeeds=false;$p=new MemberProfile(new Writer());$p->savePerson(1,$cp,true);
 check(count(Writer::$calls)===1&&get_user_meta(1,'strc_copilot',true)['pendingSync']===true&&count(FormStore::$forms)===1,'Failed write keeps all data pending');
 reset_fixture();$existing=$cp;update_user_meta(1,'strc_copilot',['values'=>$existing,'pendingSync'=>false]);$cp['city']='Basel';$p=new MemberProfile(new Writer());$p->savePerson(1,$cp,true);
 check(count(Writer::$calls)===0&&get_user_meta(1,'strc_copilot',true)['pendingSync']===true,'Unmapped-only changes do not trigger a write');
 reset_fixture();$cp['city']='Bern';update_user_meta(1,'strc_copilot_fairgate',$cp);$cp['phone']='+41000000001';$p=new MemberProfile(new Writer());$out=$p->savePerson(1,$cp,true);
 check(count(Writer::$calls)===1&&get_user_meta(1,'strc_copilot',true)['pendingSync']===true&&count(FormStore::$forms)===0&&MemberProfile::guestCopilot(1)['values']['phone']==='+41000000001','Mapped-only changes remain visible until read-back');
 update_user_meta(1,'strc_copilot_fairgate',$cp);MemberProfile::guestCopilot(1);check(get_user_meta(1,'strc_copilot',true)['pendingSync']===false,'Matching read-back clears the local override');
 reset_fixture();$old=$cp;$old['city']='Lausanne';update_user_meta(1,'strc_copilot_fairgate',$cp);update_user_meta(1,'strc_copilot',['values'=>$old,'pendingSync'=>true]);$old['phone']='+41000000002';$p=new MemberProfile(new Writer());$p->savePerson(1,$old,true);
 check(get_user_meta(1,'strc_copilot',true)['pendingSync']===true&&count(FormStore::$forms)===1,'Earlier pending fields remain pending after mapped-only changes');
 echo json_encode(['passed'=>count($checks),'checks'=>$checks])."\n";
}

<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Forms;
use SwissTRClub\Core\Http\AjaxRequest;
use SwissTRClub\Core\Members\MembershipRepository;
use SwissTRClub\Core\Members\MembershipTypePolicy;
use SwissTRClub\Core\Community\PrivateUploadStore;

final class FormsEndpoint
{
    public const SHOP_EMAIL='shop@swisstrclub.ch';
    public function registerHooks(): void
    {
        add_action('init',[FormStore::class,'register']);
        add_action('wp_ajax_strc_forms',[$this,'respond']);
        add_action('wp_ajax_nopriv_strc_forms',[$this,'respond']);
        (new FormsAdministration())->registerHooks();
    }
    public function respond(): void
    {
        [$operation,$input]=AjaxRequest::read('strc_forms',['contact','profile','copilot-save','couple-request','vehicle-save','vehicle-remove','preferences']);
        try {
            if ((int)($_SERVER['CONTENT_LENGTH']??0)>22*1024*1024) throw new \RuntimeException('Bitte höchstens ein Bild mit 20 MB hochladen.',413);
            if ($operation==='config') wp_send_json_success(['nonce'=>wp_create_nonce('strc_forms'),'shopUrl'=>function_exists('wc_get_page_permalink')&&get_post_status((int)get_option('woocommerce_shop_page_id'))==='publish'?wc_get_page_permalink('shop'):'']);
            if ($operation==='contact') {
                $origin=rtrim($_SERVER['HTTP_ORIGIN']??'','/');$allowed=[rtrim(home_url(),'/')];if(defined('STRC_FRONTEND_ORIGIN'))$allowed[]=rtrim(STRC_FRONTEND_ORIGIN,'/');
                if($origin&&!in_array($origin,$allowed,true))throw new \RuntimeException('Anfrage nicht erlaubt.',403);
                if(!empty($input['website']))throw new \InvalidArgumentException('Die Anfrage konnte nicht verarbeitet werden.');
                $data=['name'=>FormFields::text($input,'name',160,true),'email'=>FormFields::text($input,'email',200,true),'phone'=>FormFields::text($input,'phone',40),'subject'=>FormFields::choice($input,'subject',['Allgemeine Frage','Mitgliedschaft','Regionen','Veranstaltungen','TR-Shop','Website']),'message'=>FormFields::text($input,'message',5000,true)];
                if(!is_email($data['email']))throw new \InvalidArgumentException('Bitte eine gültige E-Mail-Adresse eingeben.');
                FormStore::quota();$record=FormStore::intake('contact',$data,$input['requestId']??'',get_current_user_id());
                if($data['subject']==='TR-Shop')self::notifyShop($record,$data);
                wp_send_json_success(['message'=>'Ihre Nachricht ist im Clubpostfach eingegangen. Der Club wird Ihre Anfrage bearbeiten.']);
            }
            if(!current_user_can('strc_access_member_area')) throw new \RuntimeException('Bitte mit einem aktiven Mitgliedskonto anmelden.',403);
            $result=match($operation){
                'list','profile-read'=>$this->profile(),
                'profile'=>FormStore::locked('profile-'.get_current_user_id(),fn()=>\SwissTRClub\Core\Members\MemberProfile::create()->savePerson(get_current_user_id(),$input,false)),
                'copilot-save'=>FormStore::locked('profile-'.get_current_user_id(),fn()=>\SwissTRClub\Core\Members\MemberProfile::create()->savePerson(get_current_user_id(),$input,true)),
                'couple-request'=>FormStore::locked('couple-'.get_current_user_id(),fn()=>\SwissTRClub\Core\Members\MemberProfile::create()->requestCouple(get_current_user_id())),
                'vehicle-save'=>FormStore::locked('vehicle-save-'.get_current_user_id(),fn()=>$this->vehicleSave($input)),
                'vehicle-remove'=>$this->vehicleRemove($input),
                'preferences'=>$this->preferences($input),
                'photo'=>$this->photo($input),
                default=>throw new \InvalidArgumentException('Unbekannte Anfrage.')
            };
            wp_send_json_success($result);
        }catch(\InvalidArgumentException $e){AjaxRequest::fail($e->getMessage(),422);}catch(\RuntimeException $e){AjaxRequest::fail($e->getMessage(),in_array($e->getCode(),[403,404,409,413,429,503],true)?$e->getCode():503);}
    }
    public static function vehicleOwner(): int
    {
        $id=get_current_user_id();$membership=(new MembershipRepository())->findForUser($id);
        if(MembershipTypePolicy::normalize($membership['membership_type']??'')==='couple_partner'){
            $partner=(int)($membership['partner_user_id']??0);$primary=$partner?(new MembershipRepository())->findForUser($partner):null;
            if(!$primary || MembershipTypePolicy::normalize($primary['membership_type'])!=='couple_primary' || (int)$primary['partner_user_id']!==$id) return 0;
            return $partner;
        }
        return $id;
    }
    public static function vehicles(): array
    {
        $owner=self::vehicleOwner();if(!$owner)return [];
        return array_map(static function($post){$data=FormStore::data($post);unset($data['file']);return $data+['id'=>(int)$post->ID,'revision'=>FormStore::revision($post),'photo'=>!empty(FormStore::data($post)['file'])?add_query_arg(['action'=>'strc_forms','operation'=>'photo','id'=>$post->ID],admin_url('admin-ajax.php')):''];},FormStore::find('strc_vehicle',$owner));
    }
    private function profile(): array
    {
        $user=wp_get_current_user();$contact=['email'=>$user->user_email];
        foreach(['phone','street','postcode','city','country']as$key)$contact[$key]=(string)get_user_meta($user->ID,'strc_'.$key,true);
        $requests=FormStore::find('strc_form',$user->ID);$pending=[];
        foreach($requests as $post){$data=FormStore::data($post);if(($data['kind']??'')==='profile'&&in_array($data['state']??'',['pending_review','clarification','approved_pending_sync'],true))$pending[]=['id'=>$post->ID,'submittedAt'=>$data['createdAt'],'values'=>$data['payload'],'state'=>$data['state']];}
        $photo=get_user_meta($user->ID,'strc_profile_photo',true);
        return \SwissTRClub\Core\Members\MemberProfile::create()->read($user->ID)+['noTr'=>(bool)get_user_meta((int)(\SwissTRClub\Core\Members\MemberProfile::household($user->ID)['primary']?:$user->ID),'strc_fairgate_no_tr',true),'subscriptions'=>\SwissTRClub\Core\Dashboard\MemberDashboardEndpoint::subscriptions($user->ID),'dashboardNonce'=>wp_create_nonce('strc_dashboard'),'nonce'=>wp_create_nonce('strc_forms'),'name'=>$user->display_name,'contact'=>$contact,'pending'=>$pending,'membership'=>array_intersect_key((new MembershipRepository())->findForUser($user->ID)??[],array_flip(['member_number','membership_type','status','region','started_on'])),'vehicles'=>self::vehicles(),'canEditVehicles'=>self::vehicleOwner()===$user->ID,'legacyVehicle'=>(string)get_user_meta($user->ID,'strc_vehicle',true),'preferences'=>get_user_meta($user->ID,'strc_website_preferences',true)?:['directory'=>true], 'photo'=>$photo?add_query_arg(['action'=>'strc_forms','operation'=>'photo','profile'=>'1'],admin_url('admin-ajax.php')):''];
    }
    private function vehicleSave(array $input): array
    {
        $owner=self::vehicleOwner();if($owner!==get_current_user_id())throw new \RuntimeException('Fahrzeuge werden vom Hauptmitglied gepflegt.',403);
        $data=FormFields::vehicle($input);$id=absint($input['id']??0);$post=$id?get_post($id):null;
        if($id&&(!$post||$post->post_type!=='strc_vehicle'||$post->post_status!=='private'||(int)$post->post_author!==$owner))throw new \RuntimeException('Fahrzeug nicht gefunden.',404);
        $reference=$input['requestId']??'';
        if(!$id){
            if(!preg_match('/^[a-f0-9-]{36}$/D',$reference))throw new \InvalidArgumentException('Bitte das Fahrzeugformular neu öffnen.');
            foreach(FormStore::find('strc_vehicle',$owner) as $previous)if((FormStore::data($previous)['requestId']??'')===$reference)return ['message'=>'Fahrzeug bereits gespeichert.','vehicles'=>self::vehicles()];
        }
        $data['requestId']=$post?(FormStore::data($post)['requestId']??$reference):$reference;
        $old=$post?(FormStore::data($post)['file']??null):null;$data['file']=$old;
        $store=new PrivateUploadStore();$files=$store->save($_FILES['photo']??[],true);if(is_wp_error($files))throw new \InvalidArgumentException($files->get_error_message());
        if(count($files)>1){$store->remove($files);throw new \InvalidArgumentException('Bitte ein Fahrzeugbild auswählen.');}
        if($files)$data['file']=$files[0];elseif(($input['removePhoto']??'')==='1')$data['file']=null;
        try{FormStore::save('strc_vehicle',$data,$owner,0,$post,$input['revision']??'');}catch(\Throwable $e){$store->remove($files);throw $e;}
        if($old&&$old!==$data['file'])$store->remove([$old]);
        return ['message'=>'Fahrzeug gespeichert.','vehicles'=>self::vehicles()];
    }
    private function vehicleRemove(array $input): array
    {
        $post=get_post(absint($input['id']??0));
        if(!$post||$post->post_type!=='strc_vehicle'||$post->post_status!=='private'||(int)$post->post_author!==get_current_user_id()||self::vehicleOwner()!==get_current_user_id())throw new \RuntimeException('Fahrzeug nicht gefunden.',404);
        FormStore::locked('vehicle-'.$post->ID,static function()use($post,$input){
            if(!hash_equals(FormStore::revision(get_post($post->ID)),$input['revision']??''))throw new \RuntimeException('Fahrzeug wurde inzwischen geändert. Bitte neu laden.',409);
            if(!wp_trash_post($post->ID))throw new \RuntimeException('Fahrzeug konnte nicht entfernt werden.',503);
        });
        return ['message'=>'Fahrzeug entfernt. Bereits erfasste Veranstaltungsanmeldungen bleiben bestehen.'];
    }
    private function preferences(array $input): array
    {
        $id=get_current_user_id();$store=new PrivateUploadStore();$files=$store->save($_FILES['photo']??[],true);if(is_wp_error($files))throw new \InvalidArgumentException($files->get_error_message());
        if(count($files)>1){$store->remove($files);throw new \InvalidArgumentException('Bitte ein Profilbild auswählen.');}
        $old=get_user_meta($id,'strc_profile_photo',true);$next=$files[0]??(($input['removePhoto']??'')==='1'?[]:$old);
        if($next!==$old&&!update_user_meta($id,'strc_profile_photo',$next)){$store->remove($files);throw new \RuntimeException('Profilbild konnte nicht gespeichert werden.',503);}
        if($old&&$old!==$next)$store->remove([$old]);
        $stored=get_user_meta($id,'strc_website_preferences',true);
        $preferences=is_array($stored)?$stored:['directory'=>true];
        if(isset($input['directory']))$preferences['directory']=$input['directory']==='1';
        if(get_user_meta($id,'strc_website_preferences',true)!==$preferences&&!update_user_meta($id,'strc_website_preferences',$preferences))throw new \RuntimeException('Einstellungen konnten nicht gespeichert werden.',503);
        return ['message'=>'Profilbild gespeichert.'];
    }
    private function photo(array $input): never
    {
        if(($input['profile']??'')==='1')$file=get_user_meta(get_current_user_id(),'strc_profile_photo',true);
        else{$post=get_post(absint($input['id']??0));if(!$post||$post->post_type!=='strc_vehicle'||$post->post_status!=='private'||(int)$post->post_author!==self::vehicleOwner())throw new \RuntimeException('Bild nicht gefunden.',404);$file=FormStore::data($post)['file']??null;}
        if(!$file)throw new \RuntimeException('Bild nicht gefunden.',404);
        (new PrivateUploadStore())->stream($file);
    }

    /** Anfragen mit Betreff «TR-Shop» gehen zusätzlich an das Shop-Postfach; Antwort direkt an die anfragende Person. Einmal pro Anfrage. */
    private static function notifyShop(int $record,array $data): void
    {
        if(!$record||!add_post_meta($record,'_strc_shop_notified',time(),true))return;
        $mail=\SwissTRClub\Core\Mail\MailTemplates::render('internal.shop_enquiry','de',['name'=>$data['name'],'email'=>$data['email'],'telefon'=>$data['phone']?:'–','nachricht'=>$data['message']]);
        $replyTo=str_replace(["\r","\n",'<','>'],'',$data['name']).' <'.sanitize_email($data['email']).'>';
        try{wp_mail(self::SHOP_EMAIL,$mail['subject'],$mail['body'],['Content-Type: text/plain; charset=UTF-8','From: Swiss TR-Club <no-reply@swisstrclub.ch>','Reply-To: '.$replyTo]);}catch(\Throwable $error){error_log('STRC shop enquiry mail: '.$error->getMessage());}
    }
}

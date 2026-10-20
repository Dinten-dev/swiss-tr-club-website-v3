<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Members;

use SwissTRClub\Core\Forms\FormFields;
use SwissTRClub\Core\Forms\FormStore;
use SwissTRClub\Core\Integrations\Fairgate\FairgateProfileWriter;

/**
 * Mitgliedschafts-Profil: Hauptmitglied links, Co-Pilot rechts.
 * Vorname, Name, Geschlecht und Geburtsdatum kommen aus Fairgate und sind gesperrt.
 * Änderungen gehen direkt nach Fairgate, sofern freigegeben; sonst als Anfrage ins Formularpostfach.
 */
final class MemberProfile
{
    public const FIELDS=['salutation','first_name','last_name','gender','birth_date','language','email','phone','street','postcode','city','country'];
    public const LOCKED=['first_name','last_name','gender','birth_date'];
    private const PENDING=['pending_review','clarification','approved_pending_sync'];

    public function __construct(private readonly FairgateProfileWriter $writer=new FairgateProfileWriter([])) {}

    public static function create(): self { return new self(FairgateProfileWriter::fromConstants()); }

    /** @return array{mode:string,primary:int,partner:int,membership:?array} */
    public static function household(int $id): array
    {
        $repo=new MembershipRepository();$m=$repo->findForUser($id);$type=MembershipTypePolicy::normalize((string)($m['membership_type']??''));
        if($type==='couple_primary'&&!empty($m['partner_user_id'])){$p=$repo->findForUser((int)$m['partner_user_id']);if($p&&(int)$p['partner_user_id']===$id&&MembershipTypePolicy::normalize((string)$p['membership_type'])==='couple_partner'&&in_array($p['status'],['active','grace'],true))return ['mode'=>'primary','primary'=>$id,'partner'=>(int)$p['user_id'],'membership'=>$m];}
        if($type==='couple_partner'&&!empty($m['partner_user_id'])){$p=$repo->findForUser((int)$m['partner_user_id']);if($p&&(int)$p['partner_user_id']===$id&&MembershipTypePolicy::normalize((string)$p['membership_type'])==='couple_primary')return ['mode'=>'partner','primary'=>(int)$p['user_id'],'partner'=>$id,'membership'=>$p];}
        return ['mode'=>'single','primary'=>$id,'partner'=>0,'membership'=>$m];
    }

    /** Aktuelle Werte eines Website-Kontos; eine offene Änderungsanfrage wird überlagert. */
    public static function person(int $userId): array
    {
        $user=get_userdata($userId);if(!$user)return ['values'=>array_fill_keys(self::FIELDS,''),'pending'=>null];
        $values=[];
        foreach(self::FIELDS as $field)$values[$field]=match($field){'first_name','last_name'=>(string)get_user_meta($userId,$field,true),'email'=>(string)$user->user_email,default=>(string)get_user_meta($userId,'strc_'.$field,true)};
        if($values['country']==='')$values['country']='Schweiz';
        $pending=null;
        foreach(FormStore::find('strc_form',$userId) as $post){
            $data=FormStore::data($post);
            if(($data['kind']??'')!=='profile'||!in_array($data['state']??'',self::PENDING,true)||!is_array($data['payload']??null))continue;
            $requested=array_intersect_key($data['payload'],array_flip(FairgateProfileWriter::MEMBER_FIELDS));
            if(!array_diff_assoc(array_map('strval',$requested),array_intersect_key($values,$requested)))break; // latest request already matches; do not resurrect older requests
            $pending=['at'=>(string)($data['createdAt']??''),'id'=>(int)$post->ID];$values=array_merge($values,array_map('strval',$requested));break;
        }
        return ['values'=>$values,'pending'=>$pending];
    }

    /** Nicht-Mitglied-Co-Pilot (lokal erfasst oder aus Fairgate). */
    public static function guestCopilot(int $userId): array
    {
        $fairgate=get_user_meta($userId,'strc_copilot_fairgate',true);$fairgate=is_array($fairgate)?$fairgate:[];
        $local=get_user_meta($userId,'strc_copilot',true);$local=is_array($local)?$local:[];
        $values=array_fill_keys(self::FIELDS,'');
        if($fairgate&&!empty($local['pendingSync'])&&!array_diff_assoc(array_map('strval',(array)($local['values']??[])),array_replace($values,array_map('strval',$fairgate)))){
            $local['pendingSync']=false;update_user_meta($userId,'strc_copilot',$local);
        }
        // Direkt nach Fairgate geschrieben oder bereits abgeglichen: Fairgate ist führend; sonst gilt die lokale Erfassung.
        $preferFairgate=empty($local['pendingSync']);
        foreach(self::FIELDS as $field){$own=$local['values'][$field]??null;$official=$fairgate[$field]??null;$values[$field]=(string)($preferFairgate?($official??$own??''):($own??$official??''));}
        if(!$local&&!$fairgate)return ['values'=>$values,'source'=>'','locked'=>[],'pending'=>null];
        $locked=array_values(array_filter(self::LOCKED,static fn($field)=>($fairgate[$field]??'')!==''));
        foreach($locked as $field)$values[$field]=(string)$fairgate[$field];
        $pending=!empty($local['pendingSync'])&&array_diff_assoc(array_filter(array_map('strval',(array)($local['values']??[]))),array_map('strval',$fairgate))?['at'=>(string)($local['updatedAt']??'')]:null;
        return ['values'=>$values,'source'=>$fairgate?'fairgate':'website','locked'=>$locked,'pending'=>$pending];
    }

    public static function coupleRequest(int $userId): array
    {
        $request=get_user_meta($userId,'strc_couple_request',true);
        if(!is_array($request))return ['state'=>''];
        if(($request['state']??'')==='pending'&&!empty($request['formId'])){$post=get_post((int)$request['formId']);if($post&&(FormStore::data($post)['state']??'')==='rejected'){$request['state']='rejected';update_user_meta($userId,'strc_couple_request',$request);}}
        if(($request['state']??'')==='pending'&&self::household($userId)['mode']==='primary'){
            $request['state']='active';$request['activatedAt']=gmdate(DATE_ATOM);update_user_meta($userId,'strc_couple_request',$request);
        }
        return ['state'=>(string)($request['state']??''),'at'=>(string)($request['at']??''),'activatedAt'=>(string)($request['activatedAt']??'')];
    }

    public function read(int $id): array
    {
        $house=self::household($id);$m=$house['membership'];$type=MembershipTypePolicy::normalize((string)($m['membership_type']??''));
        $number=(string)($m['member_number']??'');if(str_starts_with($number,'FG:'))$number='';
        $left=self::person($house['primary']);
        $result=['mode'=>$house['mode'],'canEdit'=>$house['mode']!=='partner'&&$m!==null,'fairgateWrite'=>$this->writer->available('fields'),
            'membership'=>['number'=>$number,'type'=>$type,'typeLabel'=>(string)get_user_meta($house['primary'],'strc_fairgate_membership_label',true)?:(MembershipTypePolicy::labels()[$type]??''),'region'=>(string)($m['region']??''),'since'=>!empty($m['started_on'])?substr((string)$m['started_on'],0,4):'','status'=>(string)($m['status']??'')],
            'person'=>['values'=>$left['values'],'locked'=>self::LOCKED,'pending'=>$left['pending']]];
        if($house['partner']){
            $partner=self::person($house['partner']);$pm=(new MembershipRepository())->findForUser($house['partner']);$pn=(string)($pm['member_number']??'');
            $result['copilot']=['kind'=>'member','values'=>$partner['values'],'locked'=>self::LOCKED,'pending'=>$partner['pending'],'memberNumber'=>str_starts_with($pn,'FG:')?'':$pn];
        }else{
            $guest=self::guestCopilot($house['primary']);
            $result['copilot']=['kind'=>$guest['source']?'guest':'none','values'=>$guest['values'],'locked'=>$guest['locked'],'pending'=>$guest['pending'],'memberNumber'=>''];
        }
        $result['couple']=self::coupleRequest($house['primary'])+['available'=>$house['mode']==='single'&&in_array($type,['individual','youth'],true),'fee'=>'CHF 160.–'];
        return $result;
    }

    /** Eigene Daten oder (als Hauptmitglied) die des Paar-Co-Piloten speichern. */
    public function savePerson(int $actor,array $input,bool $copilot): array
    {
        $house=self::household($actor);
        if($house['mode']==='partner'||$house['membership']===null)throw new \RuntimeException('Die Profildaten werden vom Hauptmitglied gepflegt.',403);
        if($copilot&&!$house['partner'])return $this->saveGuestCopilot($house['primary'],$input);
        $target=$copilot?$house['partner']:$house['primary'];
        $data=FormFields::contact($input,'',false,true);
        $data['salutation']=FormFields::choice($input,'salutation',['','Frau','Herr','Ohne Anrede']);
        $data['language']=FormFields::choice($input,'language',['de','fr'],'de');
        $current=self::person($target)['values'];
        $changes=array_diff_assoc($data,array_intersect_key($current,$data));
        if(!$changes)return ['message'=>'Keine Änderungen.'];
        $emailChanged=isset($changes['email']);
        $contactId=(string)(((new MembershipRepository())->findForUser($target))['fairgate_contact_id']??'');
        if(!$emailChanged&&$this->writer->write($contactId,'fields',$changes)){
            foreach($changes as $field=>$value)update_user_meta($target,'strc_'.$field,$value);
            return ['message'=>'Gespeichert und in Fairgate übernommen.'];
        }
        $payload=$data+($copilot?['forMember'=>get_userdata($target)->display_name,'changedBy'=>get_userdata($actor)->display_name]:[]);
        FormStore::intake('profile',$payload,wp_generate_uuid4(),$target);
        return ['message'=>$emailChanged?'Gespeichert. Eine neue E-Mail-Adresse ändert auch das Login; die Mitgliederverwaltung übernimmt sie in Fairgate.':'Gespeichert. Die Mitgliederverwaltung übernimmt die Änderung in Fairgate.'];
    }

    private function saveGuestCopilot(int $owner,array $input): array
    {
        $guest=self::guestCopilot($owner);
        $data=FormFields::contact(array_merge($input,array_intersect_key($guest['values'],array_flip($guest['locked']))),'',true,true);
        $data=array_intersect_key($data+['salutation'=>'','language'=>'de','gender'=>'','birth_date'=>''],array_flip(self::FIELDS));
        if(strcasecmp($data['email'],(string)get_userdata($owner)->user_email)===0)throw new \InvalidArgumentException('Für den Co-Piloten ist eine eigene E-Mail-Adresse erforderlich.');
        $changes=array_diff_assoc($data,$guest['values']);
        if(!$changes&&$guest['source'])return ['message'=>'Keine Änderungen.'];
        $contactId=(string)(((new MembershipRepository())->findForUser($owner))['fairgate_contact_id']??'');
        $written=$changes&&$this->writer->withCurrent($data)->write($contactId,'copilot',$changes);
        update_user_meta($owner,'strc_copilot',['values'=>$data,'updatedAt'=>gmdate(DATE_ATOM),'pendingSync'=>!$written]);
        if($written)return ['message'=>'Co-Pilot gespeichert und in Fairgate übernommen.'];
        FormStore::intake('copilot',$data+['forMember'=>get_userdata($owner)->display_name],wp_generate_uuid4(),$owner);
        return ['message'=>'Co-Pilot gespeichert. Die Mitgliederverwaltung übernimmt die Angaben in Fairgate.'];
    }

    /** Wechsel zur Paarmitgliedschaft beantragen: Formularpostfach, E-Mail an den Aktuar, Aufgabe im Dashboard. */
    public function requestCouple(int $actor): array
    {
        $house=self::household($actor);$m=$house['membership'];
        if($house['mode']!=='single'||!$m||!in_array(MembershipTypePolicy::normalize((string)$m['membership_type']),['individual','youth'],true))throw new \RuntimeException('Der Wechsel zur Paarmitgliedschaft ist für dieses Konto nicht möglich.',409);
        if(in_array(self::coupleRequest($actor)['state'],['pending','active'],true))throw new \RuntimeException('Der Wechsel wurde bereits beantragt.',409);
        $copilot=self::guestCopilot($actor)['values'];
        foreach(['first_name','last_name','email','phone','street','postcode','city','country'] as $field)if(trim($copilot[$field])==='')throw new \InvalidArgumentException('Bitte zuerst die Angaben des Co-Piloten vollständig erfassen und speichern.');
        $user=get_userdata($actor);$number=(string)$m['member_number'];if(str_starts_with($number,'FG:'))$number='';
        $payload=['member'=>['name'=>$user->display_name,'memberNumber'=>$number,'email'=>$user->user_email,'fairgateContactId'=>(string)($m['fairgate_contact_id']??'')],'copilot'=>$copilot,'newMembership'=>'Paarmitgliedschaft','fee'=>'CHF 160.–','task'=>'In Fairgate über «Haushalt» verbinden und beide als Paarmitglied führen.'];
        $form=FormStore::intake('couple',$payload,wp_generate_uuid4(),$actor);
        update_user_meta($actor,'strc_couple_request',['state'=>'pending','at'=>gmdate(DATE_ATOM),'formId'=>$form]);
        self::notifyAktuar($form,$user->display_name,trim($copilot['first_name'].' '.$copilot['last_name']));
        return ['message'=>'Wechsel zur Paarmitgliedschaft beantragt. Der Aktuar verbindet euch in Fairgate; danach ist die Paarmitgliedschaft hier aktiv.'];
    }

    public static function aktuarRecipients(): array
    {
        $list=[defined('STRC_AKTUAR_EMAIL')&&is_email((string)STRC_AKTUAR_EMAIL)?(string)STRC_AKTUAR_EMAIL:'aktuar@swisstrclub.ch'];
        foreach(get_users(['role'=>'strc_registration_moderator','fields'=>['user_email']]) as $user)if(is_email($user->user_email))$list[]=$user->user_email;
        return array_values(array_unique(array_map('strtolower',$list)));
    }

    private static function notifyAktuar(int $form,string $member,string $copilot): void
    {
        $status=['state'=>'sending','attemptedAt'=>gmdate(DATE_ATOM),'recipients'=>self::aktuarRecipients()];
        update_post_meta($form,'strc_couple_notification',$status);
        $base=rtrim(defined('STRC_FRONTEND_ORIGIN')?STRC_FRONTEND_ORIGIN:home_url(),'/');
        $body="Neuer Antrag: Wechsel zur Paarmitgliedschaft\n\nMitglied: {$member}\nCo-Pilot: {$copilot}\n\nBitte die beiden in Fairgate über den Eintrag «Haushalt» verbinden und als Paarmitglied führen. Nach dem nächsten Abgleich ist die Paarmitgliedschaft auf der Website aktiv.\n\nBearbeiten unter «Anträge bearbeiten» → Paarmitgliedschaften:\n{$base}/#antraege/paar\n\nSwiss TR-Club\n";
        try{$accepted=wp_mail($status['recipients'],'Swiss TR-Club: Wechsel zur Paarmitgliedschaft',$body,['Content-Type: text/plain; charset=UTF-8','From: Swiss TR-Club <no-reply@swisstrclub.ch>']);$status['state']=$accepted?'accepted':'failed';}
        catch(\Throwable $error){$status['state']='uncertain';}
        update_post_meta($form,'strc_couple_notification',$status);
    }

    /** Offene Paar-Wechsel für die Moderationsaufgaben im Dashboard. */
    public static function openCoupleRequests(): int
    {
        $count=0;
        foreach(get_posts(['post_type'=>'strc_form','post_status'=>'private','posts_per_page'=>300,'orderby'=>'ID','order'=>'DESC']) as $post){$data=FormStore::data($post);if(($data['kind']??'')==='couple'&&in_array($data['state']??'',['pending_review','clarification'],true))$count++;}
        return $count;
    }

    /** Vorausfüllung der Anlass-Anmeldung: Co-Pilot als Nicht-Mitglied. */
    public static function eventCopilot(int $userId): ?array
    {
        if(self::household($userId)['mode']!=='single')return null;
        $values=self::guestCopilot($userId)['values'];
        return $values['first_name']!==''&&$values['last_name']!==''?['firstName'=>$values['first_name'],'lastName'=>$values['last_name']]:null;
    }
}

<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Forms;
use SwissTRClub\Core\Http\AjaxRequest;
use SwissTRClub\Core\Events\RegionalEventAccess;
use SwissTRClub\Core\Members\MembershipRepository;
use SwissTRClub\Core\Members\MembershipTypePolicy;

final class EventRegistration
{
    public function registerHooks(): void {add_action('wp_ajax_strc_registration',[$this,'respond']);add_action('wp_ajax_nopriv_strc_registration',[$this,'respond']);}
    public static function settings(int $id): array
    {
        $saved=get_post_meta($id,'strc_registration_form',true);
        $settings=(is_array($saved)?$saved:[])+['guests'=>2,'copilot'=>true,'vehicle'=>true,'waitlist'=>false,'fee'=>0,'guestFee'=>0,'copilotFee'=>0,'guestCopilotFee'=>null,'feeDouble'=>0,'copilotFeeDouble'=>0,'guestFeeDouble'=>0,'guestCopilotFeeDouble'=>0,'weekend'=>false,'meals'=>'','rooms'=>'','conditions'=>'Kostenfreie Abmeldung bis vier Tage vor Veranstaltungsbeginn. Danach bleibt der Teilnahmebeitrag grundsätzlich geschuldet.','cancelAt'=>'','externalUrl'=>'','organiser'=>'','organiserEmail'=>'','organiserMobile'=>'','organiserUserId'=>0,'organiserMemberNumber'=>'','organiserFree'=>false,'program'=>'','agenda'=>'','programImage'=>'','agendaImage'=>''];
        // Ältere Termine kannten nur einen Gästepreis; er gilt dann auch für den Co-Piloten (Gast).
        if($settings['guestCopilotFee']===null)$settings['guestCopilotFee']=(int)$settings['guestFee'];
        return $settings;
    }
    /** Preis pro Person je Buchungsart; bei Weekend-Anlässen je nach Zimmer (single = Einzelzimmer, double = Doppelzimmer). */
    public const ROLE_FEES=['member'=>'fee','copilot'=>'copilotFee','guest'=>'guestFee','guest-copilot'=>'guestCopilotFee'];
    public static function roleFee(array $settings,string $role,string $room): int
    {
        $key=self::ROLE_FEES[$role]??'guestFee';
        return (int)($settings[!empty($settings['weekend'])&&$room==='double'?$key.'Double':$key]??0);
    }
    public static function validateSettings(array $input): array
    {
        $data=[];
        // Nominierte Veranstaltungsleitung (Mitglied): ihr wird ein allfälliger Erlass des Grundbeitrags automatisch gutgeschrieben.
        $data['organiserUserId']=absint($input['reg_organiserUserId']??0);
        if($data['organiserUserId']&&!user_can($data['organiserUserId'],'strc_access_member_area'))throw new \InvalidArgumentException('Bitte ein aktives Mitglied als Veranstaltungsleitung wählen.');
        foreach(['organiser','organiserEmail','organiserMobile','organiserMemberNumber','externalUrl','cancelAt','meals','rooms','conditions','program','agenda','programImage','agendaImage']as$key)$data[$key]=FormFields::text($input,'reg_'.$key,in_array($key,['meals','rooms','conditions','program','agenda'],true)?5000:($key==='organiserMobile'?40:2000),in_array($key,['organiser','organiserEmail','organiserMobile'],true));
        foreach(['programImage','agendaImage'] as $key)if($data[$key]&&!preg_match('~^https?://~i',$data[$key]))throw new \InvalidArgumentException('Bitte eine gültige Bildadresse wählen.');
        if(!is_email($data['organiserEmail']))throw new \InvalidArgumentException('Bitte eine gültige Kontaktadresse der Veranstaltungsleitung angeben.');
        if(!preg_match('/^[+0-9() .\/-]{7,40}$/D',$data['organiserMobile'])||strlen(preg_replace('/\D/','',$data['organiserMobile']))<7)throw new \InvalidArgumentException('Bitte eine gültige Mobilnummer der Veranstaltungsleitung angeben.');
        if($data['externalUrl']&&(!filter_var($data['externalUrl'],FILTER_VALIDATE_URL)||!in_array(strtolower(parse_url($data['externalUrl'],PHP_URL_SCHEME)?:''),['https','http'],true)))throw new \InvalidArgumentException('Bitte eine gültige externe Anmelde-Adresse angeben.');
        if($data['cancelAt']&&!self::validDate($data['cancelAt']))throw new \InvalidArgumentException('Bitte eine gültige Abmeldefrist angeben.');
        foreach(['vehicle','copilot','waitlist','organiserFree']as$key)$data[$key]=($input['reg_'.$key]??'')==='1';
        $guests=$input['reg_guests']??'2';if(!ctype_digit($guests)||(int)$guests>2)throw new \InvalidArgumentException('Zusätzliche Gast-Buchungen: 0 bis 2.');$data['guests']=(int)$guests;
        $data['weekend']=in_array($input['eventType']??'',['weekend','weekend-meeting'],true);
        if($data['organiserFree']&&!$data['organiserUserId']&&!$data['organiserMemberNumber'])throw new \InvalidArgumentException('Für den Beitragserlass bitte die Veranstaltungsleitung als Mitglied auswählen.');
        foreach(['fee','copilotFee','guestFee','guestCopilotFee','feeDouble','copilotFeeDouble','guestFeeDouble','guestCopilotFeeDouble']as$key){$value=str_replace(',','.',trim($input['reg_'.$key]??'0'));if(!preg_match('/^\d{1,5}(\.\d{1,2})?$/D',$value))throw new \InvalidArgumentException('Bitte Gebühren als CHF-Betrag mit höchstens zwei Nachkommastellen eingeben.');$data[$key]=(int)round((float)$value*100);}
        foreach(['meals','rooms']as$key)self::options($data[$key]);
        return $data;
    }
    public static function validDate(string $value): bool
    {
        if(!preg_match('/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/D',$value))return false;
        try{new \DateTimeImmutable($value);$errors=\DateTimeImmutable::getLastErrors();return !$errors||(!$errors['warning_count']&&!$errors['error_count']);}catch(\Exception){return false;}
    }
    public static function options(string $value): array
    {
        $options=[];foreach(explode("\n",$value)as$line){$line=trim($line);if(!$line)continue;$parts=explode('|',$line);$label=trim($parts[0]);$price=trim($parts[1]??'0');if(count($parts)>2||mb_strlen($label)>120||!preg_match('/^\d{1,5}(?:[.,]\d{1,2})?$/D',$price)||isset($options[$label]))throw new \InvalidArgumentException('Optionen: je Zeile eine eindeutige Bezeichnung | Preis in CHF.');$options[$label]=(int)round((float)str_replace(',','.',$price)*100);}return $options;
    }
    public function respond(): void
    {
        [$op,$input]=AjaxRequest::read('strc_registration',['preview','submit','cancel','invoice']);
        try{
            if(!current_user_can('strc_access_member_area'))throw new \RuntimeException('Bitte mit einem aktiven Mitgliedskonto anmelden.',403);
            if($op==='mine'){wp_send_json_success(['registrations'=>array_map(fn($p)=>$this->present($p),FormStore::find('strc_registration',get_current_user_id())),'nonce'=>wp_create_nonce('strc_registration')]);}
            $id=absint($input['eventId']??0);$event=get_post($id);
            if(!$event||$event->post_type!=='strc_event'||$event->post_status!=='publish'||$event->post_password)throw new \RuntimeException('Veranstaltung nicht verfügbar.',404);
            if($op==='participants'){
                if(!RegionalEventAccess::canEdit($id))throw new \RuntimeException('Kein Zugriff auf die Teilnehmerliste.',403);
                wp_send_json_success(['registrations'=>array_map(fn($p)=>$this->present($p),FormStore::find('strc_registration',0,$id)),'canReconcile'=>current_user_can('strc_manage_finance')||current_user_can('manage_options')]);
            }
            if($op==='roster'){
                $people=[];
                foreach(FormStore::find('strc_registration',0,$id) as $post){
                    $row=FormStore::data($post);if(EventPayments::participationState($row)!=='confirmed')continue;
                    $vehicle=array_intersect_key($row['vehicle']??[],array_flip(['model','year','color']));
                    foreach($row['participants']??[] as $person)$people[]=['name'=>$person['name'],'vehicle'=>$vehicle];
                }
                wp_send_json_success(['participants'=>$people]);
            }
            $settings=self::settings($id);
            if($op==='config')wp_send_json_success($this->config($event,$settings));
            if(!in_array($op,['preview','submit','cancel','invoice'],true))throw new \InvalidArgumentException('Unbekannte Anfrage.');
            $result=FormStore::locked('event-'.$id,function()use($event,$settings,$input,$op){
                if($op==='invoice'){
                    $post=get_post(absint($input['id']??0));
                    if(!$post||$post->post_type!=='strc_registration'||(int)$post->post_parent!==$event->ID||(int)$post->post_author!==get_current_user_id())throw new \RuntimeException('Anmeldung nicht gefunden.',404);
                    EventPayments::invoice($post,$input['revision']??'');
                    return ['message'=>'Teilnahme bestätigt. Die Rechnung folgt separat; der Zahlungsstatus bleibt offen.','registration'=>$this->present(get_post($post->ID))];
                }
                if($op==='cancel')return $this->cancel($event,$settings,$input);
                $editing=null;
                if(!empty($input['id'])){
                    $editing=get_post(absint($input['id']));
                    if(!$editing||$editing->post_type!=='strc_registration'||$editing->post_status!=='private'||(int)$editing->post_author!==get_current_user_id()||(int)$editing->post_parent!==$event->ID||(FormStore::data($editing)['state']??'')==='cancelled')throw new \RuntimeException('Anmeldung nicht gefunden.',404);
                    if(!hash_equals(FormStore::revision($editing),$input['revision']??''))throw new \RuntimeException('Die Anmeldung wurde inzwischen geändert. Bitte neu laden.',409);
                }
                if($editing&&in_array(FormStore::data($editing)['state']??'',['pending_payment','payment_review','expired'],true))throw new \RuntimeException('Bitte zuerst den Zahlungsstand klären oder die Reservierung abmelden.',409);
                $data=$this->submission($event,$settings,$input);
                if($editing){$data['registrationId']=(int)$editing->ID;$data['previousRevision']=FormStore::revision($editing);}

                if($op==='preview')return ['preview'=>$data,'reviewToken'=>$this->reviewToken($event,$settings,$data)];
                if(!hash_equals($this->reviewToken($event,$settings,$data),$input['reviewToken']??''))throw new \RuntimeException('Veranstaltung oder Auswahl wurde geändert. Bitte erneut prüfen.',409);
                if(($input['conditions']??'')!=='1')throw new \InvalidArgumentException('Bitte die Teilnahme- und Abmeldebedingungen bestätigen.');
                $old=FormStore::find('strc_registration',get_current_user_id(),$event->ID)[0]??null;
                if(!$editing&&$old&&!in_array($this->present($old)['state']??'',['cancelled','expired'],true))return ['message'=>'Ihre Anmeldung ist bereits gespeichert.','registration'=>$this->present($old)];
                $capacity=(int)get_post_meta($event->ID,'strc_capacity',true);$used=self::occupied((int)$event->ID);
                $previous=$editing?FormStore::data($editing):[];
                if(EventPayments::occupies($previous))$used-=(int)$previous['headcount'];
                $full=($previous['state']??'')==='waiting'||($capacity>0&&$used+$data['headcount']>$capacity);
                if($full&&!$settings['waitlist'])throw new \RuntimeException('Die verfügbaren Plätze reichen nicht mehr aus. Ihre Anmeldung wurde nicht gespeichert.',409);
                $method=$data['total']>0?($input['paymentMethod']??'invoice'):'none';
                if($data['total']>0&&!in_array($method,EventPayments::methods(),true))throw new \InvalidArgumentException('Bitte eine verfügbare Zahlungsart wählen.');
                $data+=['state'=>$full?'waiting':'confirmed','paymentStatus'=>$data['total']>0?($full?'not_due':'outstanding'):'not_required','paymentMethod'=>$data['total']>0?'invoice':'none','createdAt'=>gmdate(DATE_ATOM),'conditions'=>$settings['conditions'],'cancelAt'=>$this->cancelAt($event,$settings),'canCancel'=>time()<strtotime($this->cancelAt($event,$settings))];
                if(!$editing&&!$full&&in_array($method,['twint','card'],true)){
                    $data['state']='pending_payment';$data['paymentStatus']='pending';$data['paymentMethod']=$method;
                    $data['holdUntil']=time()+\SwissTRClub\Core\Integrations\Zahls\ZahlsClient::minutes()*60;
                }
                $data['paymentWorkflow']=2;
                if($editing){
                    $data['state']=EventPayments::participationState($previous);
                    foreach(['paymentMethod','paymentStatus','paymentAttemptId','financeAudit'] as $key)if(isset($previous[$key]))$data[$key]=$previous[$key];
                    $data['updatedAt']=gmdate(DATE_ATOM);$data['createdAt']=$previous['createdAt'];if($data['total']!==$previous['total']&&($data['total']>0||$previous['total']>0))$data['paymentStatus']='review_required';unset($data['previousRevision'],$data['registrationId']);}
                $saved=FormStore::save('strc_registration',$data,get_current_user_id(),$event->ID,$editing,$input['revision']??'');
                if(!$editing&&$data['state']==='pending_payment')EventPayments::start($saved,$method);
                EventPayments::notify($saved);
                return ['message'=>in_array($data['state'],['pending_payment','reserved'],true)?'Ihre Teilnahme ist reserviert. Die Bestätigung folgt nach Zahlungseingang.':($full?'Sie stehen auf der Warteliste.':'Ihre Teilnahme ist bestätigt.'),'registration'=>$this->present(get_post($saved))];
            });wp_send_json_success($result);
        }catch(\InvalidArgumentException $e){AjaxRequest::fail($e->getMessage(),422);}catch(\RuntimeException $e){AjaxRequest::fail($e->getMessage(),in_array($e->getCode(),[403,404,409,503],true)?$e->getCode():503);}
    }
    private function config(object $event,array $settings): array
    {
        $copilot=$this->copilot();return ['descriptionHtml'=>\SwissTRClub\Core\Editorial\EditorialAccess::html(wpautop($event->post_content)), 'canEdit'=>\SwissTRClub\Core\Events\RegionalEventAccess::canEdit((int)$event->ID), 'paymentMethods'=>EventPayments::methods(),'eventTitle'=>get_the_title($event->ID),'eventStart'=>get_post_meta($event->ID,'strc_start_at',true),'nonce'=>wp_create_nonce('strc_registration'),'settings'=>$settings,'meals'=>self::options($settings['meals']),'rooms'=>self::options($settings['rooms']),'name'=>wp_get_current_user()->display_name,'copilot'=>$copilot?get_userdata($copilot)->display_name:null,'copilotGuest'=>$copilot?null:\SwissTRClub\Core\Members\MemberProfile::eventCopilot(get_current_user_id()),'firstName'=>(string)get_user_meta(get_current_user_id(),'first_name',true),'lastName'=>(string)get_user_meta(get_current_user_id(),'last_name',true),'email'=>wp_get_current_user()->user_email,'fairgateLinked'=>!empty((new MembershipRepository())->findForUser(get_current_user_id())['fairgate_contact_id']),'fairgateSyncedAt'=>(string)get_user_meta(get_current_user_id(),'strc_fairgate_synced_at',true),'vehicles'=>array_values(array_filter(FormsEndpoint::vehicles(),static fn($v)=>$v['status']==='roadworthy')),'registration'=>isset(FormStore::find('strc_registration',get_current_user_id(),$event->ID)[0])?$this->present(FormStore::find('strc_registration',get_current_user_id(),$event->ID)[0]):null,'open'=>$this->open($event),'cancelAt'=>$this->cancelAt($event,$settings),'canCancel'=>time()<strtotime($this->cancelAt($event,$settings))];
    }
    private function open(object $event): bool
    {
        if(!(bool)get_post_meta($event->ID,'strc_registration_required',true))return false;
        $open=strtotime((string)get_post_meta($event->ID,'strc_registration_open_at',true));$close=strtotime((string)get_post_meta($event->ID,'strc_registration_close_at',true));$start=strtotime((string)get_post_meta($event->ID,'strc_start_at',true));
        return (!$open||time()>=$open)&&(!$close||time()<=$close)&&$start&&time()<$start;
    }
    private function copilot(): int
    {
        $m=(new MembershipRepository())->findForUser(get_current_user_id());if(!$m||MembershipTypePolicy::normalize($m['membership_type'])!=='couple_primary')return 0;
        $p=(new MembershipRepository())->findForUser((int)$m['partner_user_id']);return $p&&(int)$p['partner_user_id']===get_current_user_id()&&MembershipTypePolicy::normalize($p['membership_type'])==='couple_partner'&&in_array($p['status'],['active','grace'],true)?(int)$p['user_id']:0;
    }
    private function submission(object $event,array $settings,array $input): array
    {
        if(!$this->open($event)||$settings['externalUrl'])throw new \RuntimeException('Die Online-Anmeldung ist für diese Veranstaltung geschlossen.',409);
        // Buchungen (Fahrzeugbesatzungen): 1. die eigene (Mitglied als Pilot), danach bis zu `guests` Zusatzbuchungen für Gäste.
        // Konstellationen: Mitglied allein · Mitglied + Co-Pilot Mitglied · Mitglied + Co-Pilot Gast · Gast allein · Gast + Co-Pilot Gast.
        $crews=json_decode($input['crews']??'',true);
        if(!is_array($crews)||!array_is_list($crews)||!$crews||count($crews)>1+min(2,(int)$settings['guests']))throw new \InvalidArgumentException('Bitte die zugelassene Anzahl Buchungen beachten.');
        $participants=[];$total=0;$rooms=[];
        foreach($crews as $index=>$crew){
            if(!is_array($crew))throw new \InvalidArgumentException('Bitte die Buchungsangaben prüfen.');
            $own=$index===0;$copilot=is_array($crew['copilot']??null)?$crew['copilot']:null;
            $room=empty($settings['weekend'])?'':($copilot?FormFields::choice($crew,'room',['double','single']):'single');
            $rooms[]=$room;
            if($own){
                $person=['name'=>wp_get_current_user()->display_name,'kind'=>'member','role'=>'Mitglied','userId'=>get_current_user_id(),'crew'=>1,'room'=>$room];
                $person['fee']=$this->participantFee(get_current_user_id(),$settings,self::roleFee($settings,'member',$room));
            }else{
                $person=$this->guestPerson($crew['pilot']??null)+['kind'=>'guest','role'=>'Gast','crew'=>$index+1,'room'=>$room];
                $model=FormFields::text(is_array($crew['pilot']??null)?$crew['pilot']:[],'vehicle',80);
                if($model)$person['vehicle']=$model;
                $person['fee']=self::roleFee($settings,'guest',$room);
            }
            $participants[]=$person;$total+=$person['fee'];
            if(!$copilot)continue;
            if(empty($settings['copilot']))throw new \InvalidArgumentException('Für diese Veranstaltung sind keine Co-Piloten vorgesehen.');
            $type=$copilot['type']??'';
            if($own&&$type==='partner'){
                $partner=$this->copilot();if(!$settings['copilot']||!$partner)throw new \InvalidArgumentException('Kein berechtigter Co-Pilot verknüpft.');
                $person=['name'=>get_userdata($partner)->display_name,'kind'=>'copilot','role'=>'Co-Pilot Mitglied','userId'=>$partner,'isMember'=>true];
                $person['fee']=$this->participantFee($partner,$settings,self::roleFee($settings,'copilot',$room));
            }elseif($own&&$type==='member'){
                $person=$this->guestPerson($copilot);$number=FormFields::text($copilot,'memberNumber',32,true);
                global $wpdb;
                $member=$wpdb->get_row($wpdb->prepare("SELECT user_id FROM {$wpdb->prefix}strc_memberships WHERE member_number=%s AND status IN ('active','grace')",$number),ARRAY_A);
                $user=$member?get_userdata((int)$member['user_id']):false;
                $match=$user?trim((string)get_user_meta($user->ID,'first_name',true).' '.(string)get_user_meta($user->ID,'last_name',true)):'';
                if(!$user||mb_strtolower($person['name'])!==mb_strtolower($match?:$user->display_name))throw new \InvalidArgumentException('Mitgliedsnummer und Name des Co-Piloten stimmen nicht überein.');
                $person+=['kind'=>'copilot','role'=>'Co-Pilot Mitglied','userId'=>(int)$user->ID,'memberNumber'=>$number,'isMember'=>true];
                $person['fee']=$this->participantFee((int)$user->ID,$settings,self::roleFee($settings,'copilot',$room));
            }elseif($type==='guest'){
                $person=$this->guestPerson($copilot)+['kind'=>$own?'copilot-guest':'guest-copilot','role'=>'Co-Pilot Gast'];
                $person['fee']=self::roleFee($settings,'guest-copilot',$room);
            }else throw new \InvalidArgumentException('Bitte die Art des Co-Piloten wählen.');
            $person+=['crew'=>$index+1,'room'=>$room];
            $participants[]=$person;$total+=$person['fee'];
        }
        $selectedIds=array_filter(array_column($participants,'userId'));
        if(count($selectedIds)!==count(array_unique($selectedIds)))throw new \InvalidArgumentException('Eine Person darf nur einmal angemeldet werden.');
        // A linked co-pilot cannot also occupy a separate active registration.
        $ids=array_filter(array_column($participants,'userId'));
        foreach(FormStore::find('strc_registration',0,$event->ID)as$post){$row=FormStore::data($post);if((int)$post->post_author===get_current_user_id()||in_array($row['state']??'',['cancelled','expired','payment_review'],true)||(($row['state']??'')==='pending_payment'&&!EventPayments::occupies($row)))continue;if(array_intersect($ids,array_column($row['participants']??[],'userId')))throw new \RuntimeException('Eine ausgewählte Person ist bereits für diese Veranstaltung angemeldet.',409);}
        $selections=json_decode($input['selections']??'[]',true);if(!is_array($selections))throw new \InvalidArgumentException('Bitte die Auswahl prüfen.');
        $meals=self::options($settings['meals']);$roomOptions=!empty($settings['weekend'])?[]:self::options($settings['rooms']);
        foreach($participants as$i=>&$person){if($meals){$meal=FormFields::choice(is_array($selections[$i]??null)?$selections[$i]:[],'meal',array_keys($meals));$person['meal']=$meal;$total+=$meals[$meal];}}unset($person);
        $room='';
        if(!empty($settings['weekend'])){$labels=[];foreach($rooms as$i=>$type){$size=count(array_filter($participants,static fn($p)=>($p['crew']??0)===$i+1));$labels[]=($size>1&&$type==='single'?'2 × Einzelzimmer':($type==='double'?'Doppelzimmer':'Einzelzimmer')).(count($rooms)>1?' (Buchung '.($i+1).')':'');}$room=implode(' · ',$labels);}
        elseif($roomOptions){$room=FormFields::choice($input,'room',array_keys($roomOptions));$total+=$roomOptions[$room];}
        $vehicle=null;if($settings['vehicle']){$selection=$input['vehicle']??'';if(in_array($selection,['other','modern','none'],true))$vehicle=['model'=>['other'=>'Anderes Fahrzeug','modern'=>'Modernes Fahrzeug','none'=>'Ohne Fahrzeug'][$selection]];elseif(str_starts_with($selection,'model:')){$model=substr($selection,6);if(!in_array($model,FormFields::MODELS,true))throw new \InvalidArgumentException('Bitte ein gültiges Triumph-Modell wählen.');$vehicle=['model'=>$model];}else{foreach(FormsEndpoint::vehicles()as$v)if((string)$v['id']===$selection&&$v['status']==='roadworthy'){$vehicle=array_intersect_key($v,array_flip(['id','model','details','year','registration','color']));break;}if(!$vehicle)throw new \InvalidArgumentException('Bitte ein fahrbereites Fahrzeug oder eine Alternative wählen.');}}
        return ['eventTitle'=>get_the_title($event->ID),'eventStart'=>get_post_meta($event->ID,'strc_start_at',true),'participants'=>$participants,'headcount'=>count($participants),'vehicle'=>$vehicle,'room'=>$room,'total'=>$total,'notes'=>FormFields::text($input,'notes',1000)];
    }
    private function guestPerson(mixed $data): array
    {
        if(!is_array($data))throw new \InvalidArgumentException('Bitte Vor- und Nachname angeben.');
        $first=FormFields::text($data,'firstName',80,true);$last=FormFields::text($data,'lastName',80,true);
        return ['name'=>trim($first.' '.$last),'firstName'=>$first,'lastName'=>$last];
    }
    private function participantFee(int $userId,array $settings,int $fee): int
    {
        if(empty($settings['organiserFree']))return $fee;
        if(!empty($settings['organiserUserId']))return (int)$settings['organiserUserId']===$userId?0:$fee;
        if(empty($settings['organiserMemberNumber']))return $fee;
        $member=(new MembershipRepository())->findForUser($userId);
        return $member&&hash_equals((string)$settings['organiserMemberNumber'],(string)$member['member_number'])?0:$fee;
    }
    private function reviewToken(object $event,array $settings,array $data): string {return hash_hmac('sha256',wp_json_encode([$event->ID,$settings,$data,get_post_meta($event->ID,'strc_capacity',true)]),wp_salt('nonce'));}
    public static function headcount(int $eventId): int {$total=0;foreach(FormStore::find('strc_registration',0,$eventId)as$post){$data=FormStore::data($post);if(EventPayments::participationState($data)==='confirmed')$total+=(int)($data['headcount']??0);}return $total;}
    public static function occupied(int $eventId): int {$total=0;foreach(FormStore::find('strc_registration',0,$eventId)as$post){$row=FormStore::data($post);if(EventPayments::occupies($row))$total+=(int)($row['headcount']??0);}return $total;}
    private function cancelAt(object $event,array $settings): string {return $settings['cancelAt']?:gmdate(DATE_ATOM,(strtotime((string)get_post_meta($event->ID,'strc_start_at',true))?:time())-4*86400);}
    private function cancel(object $event,array $settings,array $input): array
    {
        $post=get_post(absint($input['id']??0));if(!$post||$post->post_type!=='strc_registration'||$post->post_status!=='private'||(int)$post->post_author!==get_current_user_id()||(int)$post->post_parent!==$event->ID)throw new \RuntimeException('Anmeldung nicht gefunden.',404);
        $data=FormStore::data($post);if($data['state']==='cancelled')return ['message'=>'Sie sind bereits abgemeldet.'];
        if(time()>strtotime($this->cancelAt($event,$settings)))throw new \RuntimeException('Die Abmeldefrist ist abgelaufen. Bitte kontaktieren Sie die Veranstaltungsleitung.',409);
        $data['state']='cancelled';$data['cancelledAt']=gmdate(DATE_ATOM);$data['paymentStatus']=$data['total']>0?($data['paymentStatus']==='paid'?'refund_pending':'review_required'):'not_required';
        FormStore::save('strc_registration',$data,get_current_user_id(),$event->ID,$post,$input['revision']??'');EventPayments::notify((int)$post->ID);return ['message'=>'Ihre Abmeldung ist gespeichert. Allfällige Zahlungen werden durch die Veranstaltungsleitung geklärt.'];
    }
    private function present(object $post): array{return EventPayments::present($post,FormStore::data($post))+['id'=>(int)$post->ID,'eventId'=>(int)$post->post_parent,'revision'=>FormStore::revision($post)];}
}

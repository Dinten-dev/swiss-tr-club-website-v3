<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Members;

use SwissTRClub\Core\Forms\FormStore;
use SwissTRClub\Core\Integrations\Fairgate\{FairgateGateway,FairgateConfiguration,FairgateOnboardingSettings};

/** Persist intent before every external write; an uncertain write is never replayed. */
final class ApplicationAdmission
{
    public function __construct(private readonly FairgateGateway $gateway,private readonly FairgateConfiguration $configuration,private readonly FairgateOnboardingSettings $settings) {}
    public function registerHooks(): void
    {
        add_action('strc_admission_step',[$this,'run']);
        add_filter('login_redirect',static function($redirect,$requested,$user){
            if($user instanceof \WP_User&&in_array('strc_member',$user->roles,true)&&get_user_meta($user->ID,'strc_admission_id',true)&&($requested===''||str_starts_with($requested,admin_url()))){
                return rtrim(defined('STRC_FRONTEND_ORIGIN')?STRC_FRONTEND_ORIGIN:home_url(),'/').'/#mitglieder';
            }
            return $redirect;
        },20,3);
    }
    public function ready(array $payload): bool
    {
        if (wp_get_environment_type()==='staging' || (defined('STRC_FAIRGATE_READ_ONLY') && STRC_FAIRGATE_READ_ONLY)) return false;
        return $this->configuration->isConfigured()&&$this->settings->ready($payload);
    }
    public static function record(int $id): object
    {
        $post=get_post($id);
        if(!$post||$post->post_type!=='strc_application'||$post->post_status!=='private')throw new \RuntimeException('Antrag nicht gefunden.',404);
        return $post;
    }
    private function save(int $id,array $data): void
    {
        $post=self::record($id);FormStore::save('strc_application',$data,(int)$post->post_author,0,$post,FormStore::revision($post));
    }
    private function schedule(int $id): void
    {
        if(!wp_next_scheduled('strc_admission_step',[$id]))wp_schedule_single_event(time()+1,'strc_admission_step',[$id]);
    }
    public function review(int $id,string $revision,string $operation,string $note,array $ids=[]): void
    {
        FormStore::locked('admission-'.$id,function()use($id,$revision,$operation,$note,$ids){
            $post=self::record($id);$d=FormStore::data($post);
            if(!hash_equals(FormStore::revision($post),$revision))throw new \RuntimeException('Antrag inzwischen geändert. Bitte neu laden.',409);
            $state=$d['state']??'';
            if(in_array($operation,['clarification','rejected'],true)){
                if(!in_array($state,['pending_review','clarification','approved_pending_sync','awaiting_configuration','queued'],true)||!empty($d['contacts']))throw new \RuntimeException('Übernahme bereits begonnen. Bitte zuerst mit Fairgate abgleichen.',409);
                $d['state']=$operation;
                $this->releaseEmails($id,$d);
            }elseif($operation==='approve'){
                if(!in_array($state,['pending_review','clarification','approved_pending_sync','awaiting_configuration'],true))throw new \RuntimeException('Dieser Antrag wurde bereits bearbeitet.',409);
                if(empty($d['payload']['declarations']['statutes'])||empty($d['payload']['declarations']['privacy']))throw new \RuntimeException('Erforderliche Bestätigungen fehlen.');
                $this->checkEmails($id,$d);
                $this->reserveEmails($id,$d);
                $d['state']=$this->ready($d['payload'])?'queued':'awaiting_configuration';$d['approvedAt']=gmdate(DATE_ATOM);$d['approvedBy']=get_current_user_id();
            }elseif($operation==='reconcile'){
                if(!in_array($state,['needs_reconciliation','sync_error'],true)||empty($d['approvedAt']))throw new \RuntimeException('Ein Abgleich ist hier nicht möglich.',409);
                foreach($this->settings->slots($d['payload']) as $slot){
                    $provided=trim($ids[$slot]??'');$existing=$d['contacts'][$slot]['contactId']??'';
                    if($provided!==''&&(!preg_match('/^[1-9][0-9]*$/D',$provided)||($existing&&$provided!==$existing)))throw new \RuntimeException('Bereits zugeordnete Contact IDs dürfen nicht ersetzt werden.');
                    if($provided!=='')$d['contacts'][$slot]['contactId']=$provided;
                    if(empty($d['contacts'][$slot]['contactId']))throw new \RuntimeException('Bitte alle Kontakte zuerst in Fairgate abgleichen und die Contact IDs eintragen.');
                    // Read-only reconciliation. Never silently resend an interrupted create/link request.
                    $d['contacts'][$slot]['phase']='linked';unset($d['contacts'][$slot]['official']);
                }
                $d['state']='queued';unset($d['error']);
            }elseif($operation==='retry_mail'){
                if(!in_array($state,['mail_error','mail_uncertain'],true))throw new \RuntimeException('Kein offener Mailversand.');
                foreach($d['contacts'] as &$record)if(($record['mailState']??'')!=='sent')$record['mailState']='pending';unset($record);
                $d['state']='mail_pending';unset($d['error']);
            }else throw new \RuntimeException('Unbekannte Aktion.');
            $d['reviewNote']=$note;$d['reviewedAt']=gmdate(DATE_ATOM);$d['reviewedBy']=get_current_user_id();
            $d['audit'][]=['action'=>$operation,'at'=>gmdate(DATE_ATOM),'by'=>get_current_user_id()];
            $this->save($id,$d);if(in_array($d['state'],['queued','mail_pending'],true))$this->schedule($id);
        });
    }
    private function checkEmails(int $id,array $d): void
    {
        foreach($this->settings->slots($d['payload']) as $slot){
            $email=$d['payload'][$slot]['email']??'';
            if(!is_email($email))throw new \RuntimeException('Gültige E-Mail-Adresse fehlt.');
            $user=get_user_by('email',$email);
            if($user&&(int)get_user_meta($user->ID,'strc_admission_id',true)!==$id)throw new \RuntimeException('Für diese E-Mail besteht bereits ein Konto. Bitte die Identität und Fairgate-Zuordnung zuerst klären.');
        }
    }
    private function emailKeys(array $d): array
    {
        return array_map(fn($slot)=>'strc_admission_email_'.hash_hmac('sha256',strtolower(trim($d['payload'][$slot]['email'])),wp_salt('auth')),$this->settings->slots($d['payload']));
    }
    private function reserveEmails(int $id,array $d): void
    {
        FormStore::locked('admission-email-claims',function()use($id,$d){
            $added=[];
            try{foreach($this->emailKeys($d) as $key){
                if(add_option($key,$id,'',false))$added[]=$key;
                elseif((int)get_option($key)!==$id)throw new \RuntimeException('Für eine dieser E-Mail-Adressen wird bereits ein anderer Antrag bearbeitet. Bitte zuerst abgleichen.');
            }}catch(\Throwable $e){foreach($added as $key)delete_option($key);throw $e;}
        });
    }
    private function releaseEmails(int $id,array $d): void
    {
        FormStore::locked('admission-email-claims',function()use($id,$d){foreach($this->emailKeys($d) as $key)if((int)get_option($key)===$id)delete_option($key);});
    }
    public function run(int $id): void
    {
        try{FormStore::locked('admission-'.$id,function()use($id){
            $d=FormStore::data(self::record($id));
            if(!in_array($d['state']??'',['queued','syncing','provisioning','mail_pending'],true))return;
            try{
                if(empty($d['approvedAt']))throw new \RuntimeException('Die dokumentierte Freigabe fehlt.');
                if($d['state']==='mail_pending'){
                    if (! \SwissTRClub\Core\Mail\WelcomeMailSettings::enabled()) {
                        foreach ($d['contacts'] as &$contact) $contact['mailState'] = 'disabled';
                        unset($contact);
                        $d['state'] = 'accepted_no_mail';
                        $d['mailDisabledAt'] = gmdate(DATE_ATOM);
                        $d['completedAt'] = gmdate(DATE_ATOM);
                        unset($d['error']);
                        $this->save($id, $d);
                        return;
                    }
                    $this->sendNextMail($id,$d);return;
                }
                if(!$this->ready($d['payload'])){$d['state']='awaiting_configuration';$this->save($id,$d);return;}
                $this->checkEmails($id,$d);$this->reserveEmails($id,$d);$slots=$this->settings->slots($d['payload']);
                foreach($slots as $slot){
                    $record=$d['contacts'][$slot]??[];
                    if(empty($record['contactId'])){
                        if(($record['phase']??'')==='creating')throw new \RuntimeException('Antwort auf Kontaktanlage unklar. Kontakt zuerst in Fairgate abgleichen.');
                        $payload=$this->settings->payload($d['payload'],$slot);
                        $d['contacts'][$slot]=['phase'=>'creating'];$d['state']='syncing';$this->save($id,$d);
                        $created=$this->gateway->createContact($payload);$contactId=(string)($created['contactId']??'');
                        if(!preg_match('/^[1-9][0-9]*$/D',$contactId))throw new \RuntimeException('Fairgate hat keine eindeutige Contact ID zurückgegeben.');
                        $d['contacts'][$slot]=['phase'=>'created','contactId'=>$contactId];$this->save($id,$d);$this->schedule($id);return;
                    }
                }
                $contactIds=array_column($d['contacts'],'contactId');
                if(count(array_unique($contactIds))!==count($slots))throw new \RuntimeException('Beide Personen benötigen unterschiedliche Fairgate-Kontakte.');
                foreach($slots as $slot){
                    $record=$d['contacts'][$slot];$partner=count($slots)===2?$d['contacts'][$slot==='person'?'copilot':'person']['contactId']:null;
                    if($partner!==null&&($record['phase']??'')==='created'){
                        $d['contacts'][$slot]['phase']='linking';$this->save($id,$d);
                        $this->gateway->updateContact($record['contactId'],$this->settings->partnerPayload($partner));
                        $d['contacts'][$slot]['phase']='linked';$this->save($id,$d);$this->schedule($id);return;
                    }
                    if(($record['phase']??'')==='linking')throw new \RuntimeException('Paarverknüpfung unklar. Bitte in Fairgate prüfen.');
                    if(empty($record['official'])){
                        $official=$this->settings->verify($this->gateway->contact($record['contactId']),$d['payload'],$slot,$record['contactId'],$partner);
                        $d['contacts'][$slot]['official']=$official;$this->save($id,$d);$this->schedule($id);return;
                    }
                }
                $numbers=array_map(static fn($r)=>$r['official']['member_number'],$d['contacts']);
                if(count(array_unique($numbers))!==count($slots))throw new \RuntimeException('Jede Person benötigt eine eigene offizielle Mitgliedsnummer.');
                // Re-read stale snapshots before activation; a resumed job cannot use old entitlements.
                foreach($slots as $slot)if(strtotime($d['contacts'][$slot]['official']['verifiedAt'])<time()-300){unset($d['contacts'][$slot]['official']);$this->save($id,$d);$this->schedule($id);return;}
                $d['state']='provisioning';$this->save($id,$d);
                FormStore::locked('admission-accounts',function()use($id,&$d){$this->provision($id,$d);});
                $d['state']='mail_pending';$d['activatedAt']=gmdate(DATE_ATOM);$this->save($id,$d);$this->schedule($id);
            }catch(\Throwable $e){
                // Refetch durable progress. Never erase a Contact ID or replay an uncertain write.
                $d=FormStore::data(self::record($id));$uncertain=false;
                foreach($d['contacts']??[] as $r)if(in_array($r['phase']??'',['creating','linking'],true))$uncertain=true;
                $d['state']=$uncertain?'needs_reconciliation':'sync_error';$d['error']=$e instanceof \SwissTRClub\Core\Integrations\Fairgate\FairgateApiException?'Fairgate-Übernahme konnte nicht bestätigt werden. Bitte Verbindung und Kontaktdaten prüfen.':$e->getMessage();
                $d['failedAt']=gmdate(DATE_ATOM);$this->save($id,$d);
            }
        });}catch(\Throwable $e){error_log('STRC admission step '.$id.' requires review.');}
    }
    private function provision(int $id,array &$d): void
    {
        global $wpdb;$table=$wpdb->prefix.'strc_memberships';$this->checkEmails($id,$d);$slots=$this->settings->slots($d['payload']);
        foreach($slots as $slot){
            $r=&$d['contacts'][$slot];$official=$r['official'];$p=$d['payload'][$slot];$login='strc_fg_'.$r['contactId'];
            $user=get_user_by('login',$login);
            if($user&&((int)get_user_meta($user->ID,'strc_admission_id',true)!==$id||get_user_meta($user->ID,'strc_fairgate_contact_id',true)!==$r['contactId']))throw new \RuntimeException('Das Fairgate-Konto ist bereits anderweitig zugeordnet.');
            if(!$user){
                $uid=wp_insert_user(['user_login'=>$login,'user_pass'=>wp_generate_password(64,true,true),'user_email'=>$p['email'],'first_name'=>$p['first_name'],'last_name'=>$p['last_name'],'display_name'=>$p['first_name'].' '.$p['last_name'],'role'=>'','meta_input'=>['strc_admission_id'=>$id,'strc_fairgate_contact_id'=>$r['contactId']]]);
                if(is_wp_error($uid))throw new \RuntimeException('Das Website-Konto konnte nicht erstellt werden. Bestehende Konten bitte prüfen.');
                $user=get_user_by('id',$uid);
            }
            if(strcasecmp($user->user_email,$p['email'])!==0)throw new \RuntimeException('Die Konto-E-Mail stimmt nicht mehr mit dem Antrag überein.');
            foreach(['phone','street','postcode','city','country'] as $field)update_user_meta($user->ID,'strc_'.$field,$official['profile'][$field]);
            $r['userId']=(int)$user->ID;$this->save($id,$d);
            $existing=$wpdb->get_row($wpdb->prepare("SELECT * FROM {$table} WHERE user_id=%d OR fairgate_contact_id=%s OR member_number=%s",$user->ID,$r['contactId'],$official['member_number']),ARRAY_A);
            if($existing&&((int)$existing['user_id']!==(int)$user->ID||$existing['fairgate_contact_id']!==$r['contactId']||$existing['member_number']!==$official['member_number']))throw new \RuntimeException('Die offizielle Mitgliedsnummer oder Contact ID ist bereits zugeordnet.');
            if(!$existing&&$wpdb->insert($table,['user_id'=>$user->ID,'fairgate_contact_id'=>$r['contactId'],'member_number'=>$official['member_number'],'membership_type'=>$official['membership_type'],'status'=>'pending','region'=>$official['region'],'created_at'=>current_time('mysql'),'updated_at'=>current_time('mysql')])!==1)throw new \RuntimeException('Mitgliedszuordnung konnte nicht gespeichert werden.');
            unset($r);
        }
        foreach($d['payload']['vehicles']??[] as $index=>$vehicle){
            $reference='admission-'.$id.'-'.$index;$owner=$d['contacts']['person']['userId'];$exists=false;
            foreach(FormStore::find('strc_vehicle',$owner) as $post)if((FormStore::data($post)['requestId']??'')===$reference)$exists=true;
            if(!$exists)FormStore::save('strc_vehicle',$vehicle+['requestId'=>$reference,'file'=>null],$owner);
        }
        // Activate all official rows in a single statement after both accounts exist.
        foreach($slots as $slot){
            $r=$d['contacts'][$slot];$partner=count($slots)===2?$d['contacts'][$slot==='person'?'copilot':'person']['userId']:null;
            if($wpdb->update($table,['partner_user_id'=>$partner,'membership_type'=>$r['official']['membership_type'],'region'=>$r['official']['region']],['user_id'=>$r['userId']])===false)throw new \RuntimeException('Paarzuordnung konnte nicht gespeichert werden.');
        }
        $userIds=array_map(static fn($r)=>(int)$r['userId'],$d['contacts']);
        if($wpdb->query("UPDATE {$table} SET status='active' WHERE user_id IN (".implode(',',$userIds).")")===false)throw new \RuntimeException('Aktivierung konnte nicht gespeichert werden.');
        foreach($slots as $slot){$user=new \WP_User($d['contacts'][$slot]['userId']);$user->add_role('strc_member');}
    }
    private function sendNextMail(int $id,array $d): void
    {
        foreach($d['contacts'] as $slot=>$r){
            if(($r['mailState']??'')==='sent')continue;
            if(($r['mailState']??'')==='sending'){$d['state']='mail_uncertain';$d['error']='Versandergebnis unklar. Vor erneutem Versand bitte Mailprotokoll prüfen.';$this->save($id,$d);return;}
            $user=get_user_by('id',$r['userId']);$membership=(new MembershipRepository())->findForUser($r['userId']);
            if(!$user||strcasecmp($user->user_email,$d['payload'][$slot]['email'])!==0||!$membership||$membership['status']!=='active'||$membership['fairgate_contact_id']!==$r['contactId']||$membership['member_number']!==$r['official']['member_number']){
                $d['state']='mail_error';$d['error']='Mitgliedsstatus, Konto oder E-Mail wurden inzwischen geändert. Bitte vor dem Versand prüfen.';$this->save($id,$d);return;
            }
            $key=get_password_reset_key($user);
            if(!$user||!is_string($key)){$d['state']='mail_error';$d['error']='Passwort-Einladung konnte nicht erstellt werden.';$this->save($id,$d);return;}
            $p=$d['payload'][$slot];$url=network_site_url('wp-login.php?action=rp&key='.rawurlencode($key).'&login='.rawurlencode($user->user_login),'login');
            $base=defined('STRC_FRONTEND_ORIGIN')?rtrim(STRC_FRONTEND_ORIGIN,'/'):rtrim(home_url(),'/');
            $fr=$p['language']==='fr';$number=$r['official']['member_number'];
            $message=\SwissTRClub\Core\Mail\WelcomeMailSettings::render($fr?'fr':'de',array(
                'first_name'=>$p['first_name'],'member_number'=>$number,'region'=>$d['payload']['region'],'password_url'=>$url,
                'dashboard_url'=>$base.'/#mitglieder','profile_url'=>$base.'/#profil','agenda_url'=>$base.'/#agenda',
                'regions_url'=>$base.'/#regionen','forum_url'=>$base.'/#forum','gallery_url'=>$base.'/#galerie',
                'library_url'=>$base.'/#bibliothek','marketplace_url'=>$base.'/#marktplatz','contact_url'=>$base.'/#kontakt',
            ));
            $d['contacts'][$slot]['mailState']='sending';$this->save($id,$d);
            try{$sent=wp_mail($p['email'],$message['subject'],$message['body'],['Content-Type: text/plain; charset=UTF-8']);}catch(\Throwable $e){$d['state']='mail_uncertain';$d['error']='Mailversand unterbrochen. Bitte Mailprotokoll prüfen.';$this->save($id,$d);return;}
            $d['contacts'][$slot]['mailState']=$sent?'sent':'failed';
            if($sent)$d['contacts'][$slot]['mailAcceptedAt']=gmdate(DATE_ATOM);
            else{$d['state']='mail_error';$d['error']='Willkommensmail wurde nicht vom Maildienst angenommen. Bitte erneut senden.';}
            $this->save($id,$d);if($sent)$this->schedule($id);return;
        }
        $d['state']='accepted';$d['completedAt']=gmdate(DATE_ATOM);unset($d['error']);$this->save($id,$d);
    }
}

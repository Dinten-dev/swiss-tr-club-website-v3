<?php
declare(strict_types=1);
namespace SwissTRClub\Core\Integrations\Fairgate;

use SwissTRClub\Core\Forms\FormStore;
use SwissTRClub\Core\Integrations\Fairgate\FairgateMemberMapping;

/** One-way import, enabled in server configuration. No Fairgate writes or mail. */
final class FairgateStagingImport
{
    private const TYPES = ['Einzelmitglied'=>'individual','TRiungster   (Jungmitglied bis 35 Jahre)'=>'youth','Ehrenmitglied'=>'honorary'];
    public function __construct(private readonly FairgateGateway $gateway) {}

    /** Fairgate-Label der Paarmitgliedschaft (für Hauptmitglied und Co-Pilot gleich); per STRC_FAIRGATE_COUPLE_LABELS anpassbar. */
    public static function isCoupleLabel(string $label): bool
    {
        $labels=defined('STRC_FAIRGATE_COUPLE_LABELS')&&is_array(STRC_FAIRGATE_COUPLE_LABELS)?STRC_FAIRGATE_COUPLE_LABELS:['Paarmitglied','Paarmitgliedschaft','Paarmitglieder'];
        $needle=mb_strtolower(preg_replace('/\s+/u',' ',trim($label)));
        foreach($labels as $candidate)if(is_string($candidate)&&mb_strtolower(preg_replace('/\s+/u',' ',trim($candidate)))===$needle)return true;
        return false;
    }

    public static function enabled(): bool
    {
        return defined('STRC_FAIRGATE_IMPORT_ENABLED') && STRC_FAIRGATE_IMPORT_ENABLED===true && defined('STRC_FAIRGATE_READ_ONLY') && STRC_FAIRGATE_READ_ONLY===true;
    }

    public function registerHooks(): void
    {
        add_action('strc_fairgate_member_refresh',[$this,'refresh']);
        add_action('init',static function(){
            if(self::enabled() && !wp_next_scheduled('strc_fairgate_member_refresh'))wp_schedule_event(time()+DAY_IN_SECONDS,'daily','strc_fairgate_member_refresh');
            if(!self::enabled() && wp_next_scheduled('strc_fairgate_member_refresh'))wp_clear_scheduled_hook('strc_fairgate_member_refresh');
        });
    }

    public function refresh(): void
    {
        if(!wp_doing_cron() || !self::enabled())return;
        try{$this->apply($this->fetch());delete_option('strc_fairgate_import_error');}
        catch(\Throwable $e){update_option('strc_fairgate_import_error',['at'=>gmdate(DATE_ATOM),'message'=>'Fairgate-Abgleich fehlgeschlagen; bestehende Konten wurden nicht pauschal gesperrt.'],false);}
    }

    public static function guard(): void
    {
        $env=wp_get_environment_type();
        if (!self::enabled() && !($env==='local' && defined('STRC_FAIRGATE_IMPORT_TESTING') && STRC_FAIRGATE_IMPORT_TESTING)) throw new FairgateApiException('Der schreibgeschützte Mitgliederimport ist nicht freigegeben.');
        if (!wp_doing_cron() && !current_user_can('strc_manage_members') && !current_user_can('strc_manage_platform')) throw new FairgateApiException('Kein Zugriff auf den Mitgliederimport.');
    }

    /** Fetch the complete list before writing anything, so shared emails are detectable. */
    public function fetch(): array
    {
        self::guard();$all=[];$seen=[];$total=null;$pages=null;
        for($page=1;$page<=100;$page++){
            $r=$this->gateway->contactsPage($page);
            if (!isset($r['contacts'],$r['totalRecords'],$r['totalPages'],$r['pageNo']) || !is_array($r['contacts']) || !array_is_list($r['contacts']) || (int)$r['pageNo']!==$page) throw new FairgateApiException('Unvollständige Fairgate-Liste; kein Import.');
            $total??=(int)$r['totalRecords'];$pages??=(int)$r['totalPages'];
            if($total!==(int)$r['totalRecords'] || $pages!==(int)$r['totalPages'] || $pages>100 || count($r['contacts'])>100) throw new FairgateApiException('Fairgate-Liste hat sich geändert oder ist zu gross; erneut lesen.');
            foreach($r['contacts'] as $c){
                $id=(string)($c['basefields']['contact_id']??'');
                if(!preg_match('/^[1-9][0-9]*$/D',$id)||isset($seen[$id]))throw new FairgateApiException('Fehlende oder doppelte Contact ID; kein Import.');
                $seen[$id]=true;$all[]=$c;
            }
            if($page>=max(1,$pages))break;
        }
        if(count($all)!==$total)throw new FairgateApiException('Kontaktliste ist unvollständig; kein Import.');
        return $all;
    }

    public function plan(array $contacts): array
    {
        self::guard();$emails=[];$ids=[];$plan=[];
        foreach($contacts as $c){$email=strtolower(trim((string)($c['communication']['primary_email']??'')));if($email!=='')$emails[$email]=($emails[$email]??0)+1;}
        foreach($contacts as $c){
            $id=(string)($c['basefields']['contact_id']??'');
            if(!preg_match('/^[1-9][0-9]*$/D',$id)||isset($ids[$id]))throw new FairgateApiException('Ungültige oder doppelte Contact ID.');$ids[$id]=true;
            $label=(string)($c['membership']['membership']??'');
            // Explicit user boundary: contacts without a membership are not imported or updated.
            if(trim($label)===''){$plan[]=['id'=>$id,'action'=>'skip','reason'=>'Keine Mitgliedschaft'];continue;}
            $r=['id'=>$id,'name'=>sanitize_text_field(trim(($c['basefields']['first_name']??'').' '.($c['basefields']['last_name']??''))),'label'=>$label,'action'=>'skip'];
            try {
                $couple=self::isCoupleLabel($label);
                if(!$couple&&!isset(self::TYPES[$label]))throw new FairgateApiException('Unbekannte Mitgliedschaft');
                if(($c['basefields']['contact_type']??'')!=='singleperson')throw new FairgateApiException('Firmenkontakt: persönliches Login separat klären');
                $email=trim((string)($c['communication']['primary_email']??''));
                if(!is_email($email))throw new FairgateApiException('Gültige persönliche E-Mail fehlt');
                if(($emails[strtolower($email)]??0)!==1)throw new FairgateApiException('E-Mail gehört zu mehreren Fairgate-Kontakten');
                $status=match($c['status']??''){'active'=>'active','archived'=>'inactive',default=>throw new FairgateApiException('Unbekannter Kontaktstatus')};
                $first=sanitize_text_field($c['basefields']['first_name']??'');$last=sanitize_text_field($c['basefields']['last_name']??'');
                if($first===''||$last==='')throw new FairgateApiException('Vorname oder Nachname fehlt');
                $address=$c['corr_address']??[];$comm=$c['communication']??[];
                $r+=['email'=>$email,'first_name'=>$first,'last_name'=>$last,'status'=>$status,'type'=>$couple?'couple':self::TYPES[$label],
                    'profile'=>['phone'=>sanitize_text_field($comm['mobile']??''),'street'=>sanitize_text_field($address['street']??''),'postcode'=>sanitize_text_field($address['postale_code']??''),'city'=>sanitize_text_field($address['city']??''),'country'=>sanitize_text_field($address['country']??'')]];
                $r['extras']=FairgateMemberMapping::fromConstants()->extras($c);
                $region=FairgateMemberMapping::fromConstants()->regionName($c);
                if($region!==null)$r['region']=$region;
                $r['action']=$this->target($r)?'update':($status==='active'?'create':'skip');
                if($r['action']==='skip')$r['reason']='Inaktiver Kontakt ohne Website-Konto';
            }catch(FairgateApiException $e){$r['reason']=$e->getMessage();}
            $plan[]=$r;
        }
        return $plan;
    }

    /** Never merge by email, change an existing login email, or take over an admin. */
    private function target(array $r): ?\WP_User
    {
        global $wpdb;$table=$wpdb->prefix.'strc_memberships';
        $linked=$wpdb->get_row($wpdb->prepare("SELECT * FROM {$table} WHERE fairgate_contact_id=%s",$r['id']),ARRAY_A);
        $u=$linked?get_user_by('id',(int)$linked['user_id']):get_user_by('login','strc_fg_'.$r['id']);
        if($u){
            if(get_user_meta($u->ID,'strc_fairgate_import_source',true)!=='fairgate-readonly' || (string)get_user_meta($u->ID,'strc_fairgate_contact_id',true)!==$r['id'])throw new FairgateApiException('Vorhandenes Konto: Zuordnung manuell bestätigen');
            $verifiedExisting=(string)get_user_meta($u->ID,'strc_fairgate_verified_existing_user',true)===(string)$u->ID;
            if(array_diff($u->roles,['strc_member']) && !$verifiedExisting)throw new FairgateApiException('Konto mit zusätzlichen Rollen bleibt unverändert');
            if(strcasecmp($u->user_email,$r['email'])!==0)throw new FairgateApiException('E-Mail geändert: Identität vor Kontoänderung prüfen');
            if($linked && (int)$linked['user_id']!==$u->ID)throw new FairgateApiException('Abweichende Verknüpfung');
        }
        $emailOwner=email_exists($r['email']);
        if($emailOwner && (!$u || (int)$emailOwner!==$u->ID))throw new FairgateApiException('E-Mail bereits auf Website vorhanden: keine automatische Verknüpfung');
        return $u?:null;
    }

    public function apply(array $contacts, bool $existingOnly = false): array
    {
        self::guard();
        return FormStore::locked('fairgate-staging-import',function()use($contacts,$existingOnly){
            $result=[];
            foreach($this->plan($contacts)as $r){
                if($existingOnly && $r['action']==='create'){$result[]=['id'=>$r['id'],'action'=>'skip','reason'=>'Neues Konto benötigt einen geprüften Import'];continue;}
                if($r['action']==='skip'){$result[]=['id'=>$r['id'],'name'=>$r['name']??'','action'=>'skip','reason'=>$r['reason']];continue;}
                try{$uid=$this->persist($r);$result[]=['id'=>$r['id'],'name'=>$r['name'],'action'=>$r['action'],'userId'=>$uid];}
                catch(\Throwable $e){$result[]=['id'=>$r['id'],'name'=>$r['name'],'action'=>'error','reason'=>$e instanceof FairgateApiException?$e->getMessage():'Lokale Speicherung fehlgeschlagen; erneut prüfen'];}
            }
            update_option('strc_fairgate_import_report',['at'=>gmdate(DATE_ATOM),'results'=>$result],false);
            return $result;
        });
    }

    private function persist(array $r): int
    {
        global $wpdb;$table=$wpdb->prefix.'strc_memberships';$u=$this->target($r);$new=!$u;
        if(!$u){
            // No usable shared password, and no notification hooks are called.
            $id=wp_insert_user(['user_login'=>'strc_fg_'.$r['id'],'user_pass'=>wp_generate_password(64,true,true),'user_email'=>$r['email'],'first_name'=>$r['first_name'],'last_name'=>$r['last_name'],'display_name'=>$r['name'],'role'=>'',
                'meta_input'=>['strc_fairgate_import_source'=>'fairgate-readonly','strc_fairgate_contact_id'=>$r['id']]]);
            if(is_wp_error($id))throw new FairgateApiException('Website-Konto konnte nicht erstellt werden');
            $u=get_user_by('id',$id);
        }
        $existing=$wpdb->get_row($wpdb->prepare("SELECT * FROM {$table} WHERE user_id=%d",$u->ID),ARRAY_A);
        if($existing && (string)$existing['fairgate_contact_id']!==$r['id'])throw new FairgateApiException('Vorhandene Mitgliedschaft bleibt unverändert');
        $type=$r['type'];
        if($type==='couple'){
            // Rolle im Paar: bestehende Verknüpfung bleibt; ein neu erfasster Co-Pilot wird über die E-Mail im Paar-Antrag erkannt.
            $previous=$existing?\SwissTRClub\Core\Members\MembershipTypePolicy::normalize((string)$existing['membership_type']):'';
            $type=in_array($previous,['couple_primary','couple_partner'],true)?$previous:(\SwissTRClub\Core\Members\MemberProfile::requesterForCopilotEmail($r['email'])?'couple_partner':'couple_primary');
        }
        $fields=['membership_type'=>$type,'status'=>$r['status'],'updated_at'=>current_time('mysql')];
        // Until Fairgate households are explicitly mapped, preserve a verified local couple link.
        if($existing&&\SwissTRClub\Core\Members\MembershipTypePolicy::isCouple((string)$existing['membership_type'])&&\SwissTRClub\Core\Members\MemberProfile::household((int)$u->ID)['mode']!=='single')$fields['membership_type']=$existing['membership_type'];
        if(isset($r['region']))$fields['region']=$r['region'];
        if(isset($r['extras']['started_on']))$fields['started_on']=$r['extras']['started_on'];
        if(!$existing){
            // Internal unique key only. Never present it as an official member number.
            $fields+=['user_id'=>$u->ID,'fairgate_contact_id'=>$r['id'],'member_number'=>'FG:'.$r['id'],'region'=>$r['region']??'','created_at'=>current_time('mysql')];
            $saved=$wpdb->insert($table,$fields);
            if($saved!==false)update_user_meta($u->ID,'strc_fairgate_number_pending','1');
        }else $saved=$wpdb->update($table,$fields,['user_id'=>$u->ID]);
        if($saved===false){
            if($new){require_once ABSPATH.'wp-admin/includes/user.php';wp_delete_user($u->ID);}
            throw new FairgateApiException('Mitgliedschaft konnte nicht gespeichert werden');
        }
        foreach($r['profile']as $key=>$value)update_user_meta($u->ID,'strc_'.$key,$value);
        update_user_meta($u->ID,'strc_fairgate_membership_label',$r['label']);
        update_user_meta($u->ID,'strc_fairgate_synced_at',gmdate(DATE_ATOM));
        FairgateMemberMapping::storeExtras((int)$u->ID,$r['extras']??[]);
        // Existing passwords, names, website preferences, vehicles and roles are retained.
        $verifiedExisting=(string)get_user_meta($u->ID,'strc_fairgate_verified_existing_user',true)===(string)$u->ID;
        if(!$verifiedExisting && !in_array('strc_member',$u->roles,true))$u->add_role('strc_member');
        // Paar-Antrag: Aktivierung, Verknüpfung und Benachrichtigung von Mitglied und Kassier (einmalig).
        if($r['type']==='couple'){try{\SwissTRClub\Core\Members\MemberProfile::fairgateSynced((int)$u->ID);}catch(\Throwable $e){error_log('STRC couple activation failed for user '.$u->ID.'.');}}
        return $u->ID;
    }
}

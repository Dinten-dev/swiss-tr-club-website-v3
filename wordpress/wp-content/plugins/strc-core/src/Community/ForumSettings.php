<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Community;
use SwissTRClub\Core\Http\AjaxRequest;
use SwissTRClub\Core\Forms\FormFields;
use SwissTRClub\Core\Members\MembershipRepository;

final class ForumSettings
{
    private const WHATSAPP_CONSENT_VERSION = '2026-10-11-v1';

    public function registerHooks(): void { add_action('wp_ajax_strc_forum_settings',[$this,'respond']); }
    public static function preferences(int $id): array
    {
        return (array)get_user_meta($id,'strc_forum_preferences',true)+['interests'=>[],'email'=>true,'website'=>true,'whatsapp'=>false,'whatsappConsentAt'=>'','whatsappConsentVersion'=>'','expertNotifications'=>false];
    }
    private static function combinations(string $raw,int $max=30): array
    {
        $rows=json_decode($raw,true);
        if(!is_array($rows)||!array_is_list($rows)||count($rows)>$max)AjaxRequest::fail('Bitte gültige Interessen wählen.',422);
        $result=[];
        foreach($rows as $row){
            if(!is_array($row))AjaxRequest::fail('Ungültige Zuordnung.',422);
            $model=sanitize_text_field($row['model']??'');$component=sanitize_text_field($row['component']??'');$area=sanitize_text_field($row['area']??'');
            if(($model&&!in_array($model,FormFields::MODELS,true))||($component&&!in_array($component,CatalogSettings::components(),true))||($area&&!in_array($area,CatalogSettings::areas(),true))||(!$model&&!$component&&!$area))AjaxRequest::fail('Bitte gültige Bereiche wählen.',422);
            $result[wp_json_encode([$model,$component,$area])]=compact('model','component','area');
        }
        return array_values($result);
    }
    public function respond(): void
    {
        [$op,$input]=AjaxRequest::read('strc_forum_settings',['save','expert-save','whatsapp-test']);
        if(!current_user_can('strc_access_member_area'))AjaxRequest::fail('Aktiver Mitgliederzugang erforderlich.',403);
        $manage=\SwissTRClub\Core\Editorial\EditorialAccess::area('forum');$id=get_current_user_id();
        if($op==='save'){
            $previous=self::preferences($id);$whatsapp=($input['whatsapp']??'')==='1';
            $consentAt=$whatsapp?(!empty($previous['whatsapp'])?(string)($previous['whatsappConsentAt']??''):gmdate(DATE_ATOM)):'';
            $consentVersion=$whatsapp?(!empty($previous['whatsapp'])?(string)($previous['whatsappConsentVersion']??''):self::WHATSAPP_CONSENT_VERSION):'';
            update_user_meta($id,'strc_forum_preferences',[
                'interests'=>self::combinations($input['interests']??'[]',60),
                'email'=>($input['email']??'')==='1','website'=>($input['website']??'')==='1','whatsapp'=>$whatsapp,
                'whatsappConsentAt'=>$consentAt,'whatsappConsentVersion'=>$consentVersion,
                'expertNotifications'=>($input['expertNotifications']??'')==='1',
            ]);
        }
        elseif($op==='expert-save'){
            if(!$manage)AjaxRequest::fail('Keine Forumsmoderation.',403);
            $target=absint($input['id']??0);$member=(new MembershipRepository())->findForUser($target);
            if(!$member||!in_array($member['status'],['active','grace'],true)||!user_can($target,'strc_access_member_area'))AjaxRequest::fail('Aktives Mitglied nicht gefunden.',404);
            update_user_meta($target,'strc_forum_expertise',self::combinations($input['expertise']??'[]',200));
        }elseif($op==='whatsapp-status'||$op==='whatsapp-test'){
            if(!$manage)AjaxRequest::fail('Keine Forumsmoderation.',403);
            $result=$op==='whatsapp-test'?['test'=>self::notifyWhatsApp($id,'test-'.wp_generate_uuid4(),'Testnachricht des Swiss TR-Club',home_url('/#forum'),\SwissTRClub\Core\Http\UserLanguage::french($id))]:[];
            wp_send_json_success($result+['status'=>self::whatsappStatus($id),'nonce'=>wp_create_nonce('strc_forum_settings')]);
        }elseif($op!=='list')AjaxRequest::fail('Unbekannte Anfrage.',400);
        $members=[];
        if($manage){$search=mb_strtolower(sanitize_text_field($input['search']??''));foreach((new MembershipRepository())->all() as $member){$target=(int)$member['user_id'];if(!in_array($member['status'],['active','grace'],true)||!user_can($target,'strc_access_member_area'))continue;$user=get_userdata($target);$expertise=(array)get_user_meta($target,'strc_forum_expertise',true);if(($search&&str_contains(mb_strtolower($user->display_name),$search))||(!$search&&$expertise))$members[]=['id'=>$target,'name'=>$user->display_name,'expertise'=>$expertise];} $members=array_slice($members,0,50);}
        $preferences=self::preferences($id);unset($preferences['whatsappConsentAt']);
        wp_send_json_success(['nonce'=>wp_create_nonce('strc_forum_settings'),'preferences'=>$preferences,'expertise'=>(array)get_user_meta($id,'strc_forum_expertise',true),'canManage'=>$manage,'members'=>$members]);
    }
    private static function matches(array $rows,array $classification): bool
    {
        foreach($rows as $row){$match=true;foreach(['model','component','area'] as $key)if(!empty($row[$key])&&$row[$key]!==($classification[$key]??''))$match=false;if($match)return true;}
        return false;
    }
    public static function notifyNewTopic(\WP_Post $post): void
    {
        $classification=(array)get_post_meta($post->ID,'strc_form_classification',true);
        foreach((new MembershipRepository())->all() as $member){$id=(int)$member['user_id'];if($id===get_current_user_id()||!user_can($id,'strc_access_member_area'))continue;$prefs=self::preferences($id);$expertise=(array)get_user_meta($id,'strc_forum_expertise',true);if(self::matches($prefs['interests'],$classification)||($prefs['expertNotifications']&&self::matches($expertise,$classification)))self::notify($id,'topic-'.$post->ID,'Neues Thema: '.$post->post_title,home_url('/#forum/'.$post->ID));}
    }
    public static function notify(int $id,string $key,string $title,string $url): void
    {
        $fr=\SwissTRClub\Core\Http\UserLanguage::french($id);
        if($fr){foreach(['Neues Thema: '=>'Nouveau sujet : ','Neue Antwort: '=>'Nouvelle réponse : '] as $de=>$translation)if(str_starts_with($title,$de)){$title=$translation.substr($title,strlen($de));break;}}
        $prefs=self::preferences($id);
        if($prefs['website']){$activity=(array)get_user_meta($id,'strc_notifications',true);$activity[]=['id'=>$key,'title'=>$title,'url'=>$url,'at'=>gmdate(DATE_ATOM)];update_user_meta($id,'strc_notifications',array_slice($activity,-50));}
        if($prefs['email']){$user=get_userdata($id);wp_mail($user->user_email,'TR-Club Forum',$title."\n".$url."\n".($fr?'Les notifications peuvent être modifiées dans le forum.':'Benachrichtigungen können im Forum angepasst werden.'));}
        self::notifyWhatsApp($id,$key,$title,$url,$fr);
    }

    private static function notifyWhatsApp(int $id,string $key,string $title,string $url,bool $french): string
    {
        if(!defined('STRC_MAKE_WHATSAPP_ENABLED')||STRC_MAKE_WHATSAPP_ENABLED!==true)return 'disabled';
        if(!defined('STRC_MAKE_WHATSAPP_WEBHOOK')||!defined('STRC_WHATSAPP_TEMPLATE_DE')||!defined('STRC_WHATSAPP_TEMPLATE_FR'))return 'incomplete-config';
        $preferences=self::preferences($id);
        if(empty($preferences['whatsapp'])||empty($preferences['whatsappConsentAt'])||$preferences['whatsappConsentVersion']!==self::WHATSAPP_CONSENT_VERSION)return 'no-consent';
        $member=(new MembershipRepository())->findForUser($id);
        if(!$member||!in_array($member['status'],['active','grace'],true))return 'inactive';
        $user=get_userdata($id);if(!$user)return 'inactive';
        $raw=(string)get_user_meta($id,'strc_phone',true);$digits=preg_replace('/\D+/','',$raw);
        if(str_starts_with($digits,'00'))$digits=substr($digits,2);
        elseif(str_starts_with($digits,'0'))$digits='41'.substr($digits,1);
        if(!preg_match('/^[1-9][0-9]{7,14}$/D',$digits))return 'no-phone';
        $webhook=(string)STRC_MAKE_WHATSAPP_WEBHOOK;$parts=wp_parse_url($webhook);
        if(($parts['scheme']??'')!=='https'||!preg_match('/(^|\.)make\.com$/i',(string)($parts['host']??'')))return 'bad-webhook';
        $template=sanitize_key($french?STRC_WHATSAPP_TEMPLATE_FR:STRC_WHATSAPP_TEMPLATE_DE);
        if($template==='')return 'no-template';
        $eventKey=hash_hmac('sha256',$id.'|'.$key,wp_salt('auth'));
        $deliveryKey='strc_whatsapp_delivery_'.$eventKey;
        if(!add_option($deliveryKey,['state'=>'sending','at'=>gmdate(DATE_ATOM)],'',false))return 'duplicate';
        $language=$french?'fr':'de';
        $bodyTemplate=$french?'Nouvelle activité du forum : {{title}} — {{url}}':'Neue Aktivität im Forum: {{title}} — {{url}}';
        $payload=[
            'event'=>'forum.notification','event_key'=>$eventKey,
            'recipient'=>['phone'=>'+'.$digits],
            'consent'=>['granted'=>true,'recorded_at'=>$preferences['whatsappConsentAt'],'version'=>$preferences['whatsappConsentVersion']],
            'template'=>['name'=>$template,'language'=>$language,'body'=>$bodyTemplate,'parameters'=>['title'=>$title,'url'=>$url]],
        ];
        $response=wp_remote_post($webhook,['timeout'=>8,'redirection'=>0,'sslverify'=>true,'headers'=>['Content-Type'=>'application/json'],'body'=>wp_json_encode($payload)]);
        $state=is_wp_error($response)?'uncertain':((int)wp_remote_retrieve_response_code($response)>=200&&(int)wp_remote_retrieve_response_code($response)<300?'accepted':'failed');
        update_option($deliveryKey,['state'=>$state,'at'=>gmdate(DATE_ATOM),'code'=>is_wp_error($response)?0:(int)wp_remote_retrieve_response_code($response)],false);
        return $state;
    }

    /** Diagnose für die Forumsmoderation: Konfiguration (ohne geheime Webhook-Adresse), eigene Voraussetzungen, letzte Zustellungen. */
    private static function whatsappStatus(int $id): array
    {
        global $wpdb;
        $webhook=defined('STRC_MAKE_WHATSAPP_WEBHOOK')?(string)STRC_MAKE_WHATSAPP_WEBHOOK:'';$host=(string)(wp_parse_url($webhook)['host']??'');
        $prefs=self::preferences($id);$digits=preg_replace('/\D+/','',(string)get_user_meta($id,'strc_phone',true));
        $rows=$wpdb->get_col("SELECT option_value FROM {$wpdb->options} WHERE option_name LIKE 'strc\\_whatsapp\\_delivery\\_%' ORDER BY option_id DESC LIMIT 10");
        return [
            'enabled'=>defined('STRC_MAKE_WHATSAPP_ENABLED')&&STRC_MAKE_WHATSAPP_ENABLED===true,
            'webhookHost'=>$host,'webhookValid'=>str_starts_with($webhook,'https://')&&(bool)preg_match('/(^|\.)make\.com$/i',$host),
            'templateDe'=>defined('STRC_WHATSAPP_TEMPLATE_DE')?(string)STRC_WHATSAPP_TEMPLATE_DE:'','templateFr'=>defined('STRC_WHATSAPP_TEMPLATE_FR')?(string)STRC_WHATSAPP_TEMPLATE_FR:'',
            'myConsent'=>!empty($prefs['whatsapp'])&&($prefs['whatsappConsentVersion']??'')===self::WHATSAPP_CONSENT_VERSION,
            'myPhone'=>strlen($digits)>=8?str_repeat('•',max(0,strlen($digits)-4)).substr($digits,-4):'',
            'subscribers'=>(int)$wpdb->get_var("SELECT COUNT(*) FROM {$wpdb->usermeta} WHERE meta_key='strc_forum_preferences' AND meta_value LIKE '%s:8:\"whatsapp\";b:1;%'"),
            'deliveries'=>array_map(static function($raw){$row=maybe_unserialize($raw);return is_array($row)?['state'=>(string)($row['state']??''),'at'=>(string)($row['at']??''),'code'=>(int)($row['code']??0)]:[];},$rows),
        ];
    }
}

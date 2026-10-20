<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Forms;
use SwissTRClub\Core\Http\AjaxRequest;
use SwissTRClub\Core\Members\ApplicationAdmission;

final class ApplicationInbox
{
    public function __construct(private readonly ApplicationAdmission $admission) {}
    public function registerHooks(): void
    {
        add_action('wp_ajax_strc_applications',[$this,'respond']);
        add_action('wp_ajax_nopriv_strc_applications',[$this,'respond']);
    }
    public function respond(): void
    {
        [$operation,$input]=AjaxRequest::read('strc_applications',['approve','clarification','rejected','reconcile','retry_mail','process','couple-state']);
        if(!current_user_can('strc_manage_members'))AjaxRequest::fail('Nur die zuständige Clubverwaltung kann Anträge einsehen.',403);
        try{
            $id=absint($input['id']??0);
            if($operation==='list'){
                $page=max(1,absint($input['page']??1));$query=new \WP_Query(['post_type'=>'strc_application','post_status'=>'private','posts_per_page'=>20,'paged'=>$page,'orderby'=>'ID','order'=>'DESC']);
                $items=array_map(function($post){$d=FormStore::data($post);$p=$d['payload']['person']??[];return ['id'=>(int)$post->ID,'name'=>trim(($p['first_name']??'').' '.($p['last_name']??'')),'state'=>$d['state']??'unknown','date'=>$post->post_date,'type'=>$d['payload']['membershipType']??''];},$query->posts);
                wp_send_json_success(['items'=>$items,'page'=>$page,'pages'=>(int)$query->max_num_pages,'otherInboxUrl'=>admin_url('admin.php?page=strc-forms')]);
            }
            if($operation==='couples')wp_send_json_success(['items'=>self::couples()]);
            if($operation==='couple-state'){self::coupleState($id,sanitize_key($input['state']??''),FormFields::text($input,'note',2000),(string)($input['revision']??''));wp_send_json_success(['items'=>self::couples(),'message'=>'Bearbeitungsstand gespeichert.']);}
            if($operation==='process')$this->admission->run($id);
            elseif($operation!=='detail')$this->admission->review($id,$input['revision']??'',$operation,FormFields::text($input,'note',2000),['person'=>$input['personId']??'','copilot'=>$input['copilotId']??'']);
            $post=ApplicationAdmission::record($id);$d=FormStore::data($post);
            wp_send_json_success(['application'=>$d+['id'=>$id,'revision'=>FormStore::revision($post),'date'=>$post->post_date,'ready'=>$this->admission->ready($d['payload']??[]),'mailEnabled'=>\SwissTRClub\Core\Mail\WelcomeMailSettings::enabled()]]);
        }catch(\Throwable $e){AjaxRequest::fail($e->getMessage(),in_array($e->getCode(),[403,404,409],true)?$e->getCode():422);}
    }

    public const COUPLE_STATES=['pending_review','clarification','approved_pending_sync','rejected'];

    /** Wechsel zur Paarmitgliedschaft (Formularpostfach, Art «couple»): offene zuerst, danach die letzten erledigten. */
    public static function couples(): array
    {
        $open=[];$done=[];
        foreach(get_posts(['post_type'=>'strc_form','post_status'=>'private','posts_per_page'=>300,'orderby'=>'ID','order'=>'DESC']) as $post){
            $d=FormStore::data($post);if(($d['kind']??'')!=='couple')continue;
            $p=$d['payload']??[];$c=$p['copilot']??[];
            $row=['id'=>(int)$post->ID,'revision'=>FormStore::revision($post),'date'=>$post->post_date,'state'=>(string)($d['state']??''),'note'=>(string)($d['reviewNote']??''),
                'member'=>['name'=>(string)($p['member']['name']??''),'memberNumber'=>(string)($p['member']['memberNumber']??''),'email'=>(string)($p['member']['email']??''),'fairgateContactId'=>(string)($p['member']['fairgateContactId']??'')],
                'copilot'=>array_map('strval',array_intersect_key(is_array($c)?$c:[],array_flip(['salutation','first_name','last_name','gender','birth_date','email','phone','street','postcode','city','country']))),
                'fee'=>(string)($p['fee']??''),'task'=>(string)($p['task']??'')];
            if(in_array($row['state'],['pending_review','clarification'],true))$open[]=$row;elseif(count($done)<10)$done[]=$row;
        }
        return array_merge($open,$done);
    }

    private static function coupleState(int $id,string $state,string $note,string $revision): void
    {
        $post=get_post($id);
        if(!$post||$post->post_type!=='strc_form'||$post->post_status!=='private')throw new \RuntimeException('Anfrage nicht gefunden.',404);
        $data=FormStore::data($post);
        if(($data['kind']??'')!=='couple')throw new \RuntimeException('Anfrage nicht gefunden.',404);
        if(!in_array($state,self::COUPLE_STATES,true))throw new \InvalidArgumentException('Ungültiger Status.');
        if(!in_array($data['state']??'',self::COUPLE_STATES,true))throw new \RuntimeException('Diese Anfrage kann nicht mehr geändert werden.',409);
        $data['state']=$state;$data['reviewedAt']=gmdate(DATE_ATOM);$data['reviewedBy']=get_current_user_id();$data['reviewNote']=$note;
        FormStore::save('strc_form',$data,(int)$post->post_author,0,$post,$revision);
    }
}

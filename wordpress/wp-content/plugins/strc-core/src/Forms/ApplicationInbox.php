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
        [$operation,$input]=AjaxRequest::read('strc_applications',['approve','clarification','rejected','reconcile','retry_mail','process']);
        if(!current_user_can('strc_manage_members'))AjaxRequest::fail('Nur die zuständige Clubverwaltung kann Anträge einsehen.',403);
        try{
            $id=absint($input['id']??0);
            if($operation==='list'){
                $page=max(1,absint($input['page']??1));$query=new \WP_Query(['post_type'=>'strc_application','post_status'=>'private','posts_per_page'=>20,'paged'=>$page,'orderby'=>'ID','order'=>'DESC']);
                $items=array_map(function($post){$d=FormStore::data($post);$p=$d['payload']['person']??[];return ['id'=>(int)$post->ID,'name'=>trim(($p['first_name']??'').' '.($p['last_name']??'')),'state'=>$d['state']??'unknown','date'=>$post->post_date,'type'=>$d['payload']['membershipType']??''];},$query->posts);
                wp_send_json_success(['items'=>$items,'page'=>$page,'pages'=>(int)$query->max_num_pages,'otherInboxUrl'=>admin_url('admin.php?page=strc-forms')]);
            }
            if($operation==='process')$this->admission->run($id);
            elseif($operation!=='detail')$this->admission->review($id,$input['revision']??'',$operation,FormFields::text($input,'note',2000),['person'=>$input['personId']??'','copilot'=>$input['copilotId']??'']);
            $post=ApplicationAdmission::record($id);$d=FormStore::data($post);
            wp_send_json_success(['application'=>$d+['id'=>$id,'revision'=>FormStore::revision($post),'date'=>$post->post_date,'ready'=>$this->admission->ready($d['payload']??[]),'mailEnabled'=>\SwissTRClub\Core\Mail\WelcomeMailSettings::enabled()]]);
        }catch(\Throwable $e){AjaxRequest::fail($e->getMessage(),in_array($e->getCode(),[403,404,409],true)?$e->getCode():422);}
    }
}

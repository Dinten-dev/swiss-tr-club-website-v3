<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Members;

use SwissTRClub\Core\Http\AjaxRequest;
use SwissTRClub\Core\Forms\FormStore;
use SwissTRClub\Core\Community\PrivateUploadStore;

final class MemberDirectoryEndpoint
{
    public function registerHooks(): void
    {
        add_action('wp_ajax_strc_directory',[$this,'respond']);
        add_action('wp_ajax_nopriv_strc_directory',[$this,'respond']);
    }

    public static function visible(int $id): bool
    {
        if(!user_can($id,'strc_access_member_area'))return false;
        $membership=(new MembershipRepository())->findForUser($id);
        if(!$membership||!in_array($membership['status'],['active','grace'],true))return false;
        $preferences=get_user_meta($id,'strc_website_preferences',true);
        return !is_array($preferences)||!array_key_exists('directory',$preferences)||!empty($preferences['directory']);
    }

    private function member(int $id,bool $detail=false): array
    {
        $user=get_userdata($id);$membership=(new MembershipRepository())->findForUser($id);
        $photo=get_user_meta($id,'strc_profile_photo',true);
        $owner=$id;
        if(($membership['membership_type']??'')==='couple_partner'){
            $candidate=(int)($membership['partner_user_id']??0);$primary=(new MembershipRepository())->findForUser($candidate);
            if($primary&&($primary['membership_type']??'')==='couple_primary'&&(int)$primary['partner_user_id']===$id)$owner=$candidate;else $owner=0;
        }
        $vehicles=$owner?array_map(static function($post)use($id){
            $data=FormStore::data($post);
            return array_intersect_key($data,array_flip(['model','details','year','colour','registration','status']))+['id'=>(int)$post->ID,'photo'=>!empty($data['file'])?add_query_arg(['action'=>'strc_directory','operation'=>'vehicle-photo','id'=>$id,'vehicle'=>$post->ID],admin_url('admin-ajax.php')):''];
        },FormStore::find('strc_vehicle',$owner)):[];
        $result=['id'=>$id,'name'=>$user->display_name,'firstName'=>(string)get_user_meta($id,'first_name',true),'lastName'=>(string)get_user_meta($id,'last_name',true),'city'=>(string)get_user_meta($id,'strc_city',true),'postcode'=>(string)get_user_meta($id,'strc_postcode',true),'country'=>(string)get_user_meta($id,'strc_country',true),'region'=>(string)($membership['region']??''),'photo'=>$photo?add_query_arg(['action'=>'strc_directory','operation'=>'photo','id'=>$id],admin_url('admin-ajax.php')):'','vehicles'=>$vehicles];
        if($detail){$result['email']=$user->user_email;$result['phone']=(string)get_user_meta($id,'strc_phone',true);}
        return $result;
    }

    public function respond(): void
    {
        [$operation,$input]=AjaxRequest::read('strc_directory',[]);
        if(!current_user_can('strc_access_member_area'))AjaxRequest::fail('Bitte mit einem aktiven Mitgliederkonto anmelden.',403);
        if($operation==='location'){
            $postcode=sanitize_text_field($input['postcode']??'');
            if(!preg_match('/^[1-9][0-9]{3}$/D',$postcode))wp_send_json_success(['position'=>null]);
            $key='strc_postcode_position_'.$postcode;$position=get_transient($key);
            if($position===false){
                $response=wp_remote_get('https://api3.geo.admin.ch/rest/services/ech/SearchServer?'.http_build_query(['type'=>'locations','origins'=>'zipcode','searchText'=>$postcode,'sr'=>4326,'limit'=>10]),['timeout'=>6]);
                $position=null;
                if(!is_wp_error($response)&&wp_remote_retrieve_response_code($response)===200){
                    $body=json_decode(wp_remote_retrieve_body($response),true);
                    foreach($body['results']??[] as $item){$attrs=$item['attrs']??[];
                        if(($attrs['origin']??'')==='zipcode'&&preg_match('/\b'.preg_quote($postcode,'/').'\b/u',wp_strip_all_tags($attrs['label']??''))&&isset($attrs['lat'],$attrs['lon'])){$position=[round((float)$attrs['lat'],3),round((float)$attrs['lon'],3)];break;}
                    }
                }
                set_transient($key,$position?:[], $position?180*DAY_IN_SECONDS:300);
            }
            wp_send_json_success(['position'=>$position?:null]);
        }
        if(in_array($operation,['detail','photo','vehicle-photo'],true)){
            $id=absint($input['id']??0);if(!self::visible($id))AjaxRequest::fail('Mitglied nicht gefunden.',404);
            $member=$this->member($id,true);
            if($operation==='detail')wp_send_json_success($member);
            if($operation==='photo')$file=get_user_meta($id,'strc_profile_photo',true);
            else{
                $vehicle=absint($input['vehicle']??0);
                if(!in_array($vehicle,array_column($member['vehicles'],'id'),true))AjaxRequest::fail('Bild nicht gefunden.',404);
                $file=FormStore::data(get_post($vehicle))['file']??[];
            }
            if(!$file)AjaxRequest::fail('Bild nicht gefunden.',404);
            $store=new PrivateUploadStore();$copy=$store->webCopy($file);if(is_wp_error($copy))AjaxRequest::fail($copy->get_error_message(),503);$store->stream($copy);
        }
        if($operation!=='list')AjaxRequest::fail('Unbekannte Anfrage.');
        $search=mb_strtolower(sanitize_text_field($input['search']??''));$region=sanitize_text_field($input['region']??'');$model=sanitize_text_field($input['model']??'');
        $members=[];$regions=[];$vehicleStatus=sanitize_text_field($input['vehicleStatus']??'');
        foreach((new MembershipRepository())->all() as $membership){
            $id=(int)$membership['user_id'];if(!self::visible($id))continue;
            $member=$this->member($id);if($member['region'])$regions[]=$member['region'];
            if($vehicleStatus&&!in_array($vehicleStatus,array_column($member['vehicles'],'status'),true))continue;
            if($region&&$member['region']!==$region)continue;
            if($model&&!in_array($model,array_column($member['vehicles'],'model'),true))continue;
            $terms=implode(' ',[$member['name'],$member['firstName'],$member['lastName'],$member['city'],$member['postcode'],$member['region']]);
            foreach($member['vehicles'] as $vehicle)$terms.=' '.implode(' ',array_filter([$vehicle['model']??'',$vehicle['details']??'',$vehicle['registration']??'']));
            if($search&&!str_contains(mb_strtolower($terms),$search))continue;
            $members[]=$member;
        }
        $sort=in_array($input['sort']??'',['lastName','city','region'],true)?$input['sort']:'lastName';
        usort($members,static fn($a,$b)=>strnatcasecmp(($a[$sort]?:$a['name']).' '.$a['name'],($b[$sort]?:$b['name']).' '.$b['name']));
        $total=count($members);$page=max(1,absint($input['page']??1));
        wp_send_json_success(['mapMembers'=>array_map(static fn($member)=>array_intersect_key($member,array_flip(['id','name','postcode','city','country'])),$members),'members'=>array_slice($members,($page-1)*50,50),'total'=>$total,'pages'=>(int)ceil($total/50),'regions'=>array_values(array_unique($regions))]);
    }
}

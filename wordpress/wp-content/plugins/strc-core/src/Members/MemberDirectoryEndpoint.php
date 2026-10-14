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
        $youth=($membership['membership_type']??'')==='youth';
        $region=$youth?'TRiungsters':(\SwissTRClub\Core\Events\RegionDirectory::canonicalName((string)($membership['region']??''))??'');
        $result=['id'=>$id,'name'=>$user->display_name,'firstName'=>(string)get_user_meta($id,'first_name',true),'lastName'=>(string)get_user_meta($id,'last_name',true),'city'=>(string)get_user_meta($id,'strc_city',true),'postcode'=>(string)get_user_meta($id,'strc_postcode',true),'country'=>(string)get_user_meta($id,'strc_country',true),'region'=>$region,'photo'=>$photo?add_query_arg(['action'=>'strc_directory','operation'=>'photo','id'=>$id],admin_url('admin-ajax.php')):'','vehicles'=>$vehicles];
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
        $regionNames=array_merge(array_map(static fn($term)=>$term->name,\SwissTRClub\Core\Events\RegionDirectory::terms()),['TRiungsters']);
        $geocoded=0;
        $search=mb_strtolower(sanitize_text_field($input['search']??''));$region=sanitize_text_field($input['region']??'');$model=sanitize_text_field($input['model']??'');
        $members=[];$vehicleStatus=sanitize_text_field($input['vehicleStatus']??'');
        foreach((new MembershipRepository())->all() as $membership){
            $id=(int)$membership['user_id'];if(!self::visible($id))continue;
            $member=$this->member($id);
            if($vehicleStatus&&!in_array($vehicleStatus,array_column($member['vehicles'],'status'),true))continue;
            if($region&&$member['region']!==$region)continue;
            if($model&&!in_array($model,array_column($member['vehicles'],'model'),true))continue;
            // Freie Suche nur im Namen (Vor- und Nachname).
            $terms=implode(' ',[$member['name'],$member['firstName'],$member['lastName']]);
            if($search&&!str_contains(mb_strtolower($terms),$search))continue;
            $members[]=$member;
        }
        $sort=in_array($input['sort']??'',['lastName','firstName','postcode','city','region','vehicle'],true)?$input['sort']:'lastName';
        $value=static fn(array $member):string=>$sort==='vehicle'?(string)($member['vehicles'][0]['model']??'~'):(string)($member[$sort]?:'~');
        usort($members,static fn($a,$b)=>strnatcasecmp($value($a).' '.$a['lastName'].' '.$a['firstName'],$value($b).' '.$b['lastName'].' '.$b['firstName']));
        $total=count($members);$page=max(1,absint($input['page']??1));
        $map=($input['map']??'')==='1';
        $mapMembers=$map?array_map(function(array $member)use(&$geocoded):array{
            return ['id'=>$member['id'],'firstName'=>$member['firstName']?:$member['name'],'postcode'=>$member['postcode'],'city'=>$member['city'],'country'=>$member['country'],'vehicle'=>(string)($member['vehicles'][0]['model']??''),'position'=>$this->streetPosition((int)$member['id'],$geocoded)];
        },$members):[];
        wp_send_json_success(['mapMembers'=>$mapMembers,'members'=>array_slice($members,($page-1)*50,50),'total'=>$total,'pages'=>(int)ceil($total/50),'regions'=>$regionNames]);
    }

    /**
     * Ungefähre Position für die Mitgliederkarte (B-Test: Opt-out im Profil).
     * Die Wohnadresse wird nur serverseitig geokodiert und nie ausgeliefert. Der Pin steht auf einem anderen,
     * real existierenden Gebäude (GWR) 100–250 m entfernt mit derselben Postleitzahl – also nie im See oder Wald.
     * Die Wahl ist pro Mitglied fest (kein Springen bei jedem Laden). Ohne passendes Gebäude: null (Pin nach PLZ).
     */
    private function streetPosition(int $id,int &$geocoded): ?array
    {
        $preferences=get_user_meta($id,'strc_website_preferences',true);
        if(is_array($preferences)&&array_key_exists('mapStreet',$preferences)&&!$preferences['mapStreet'])return null;
        $street=trim((string)get_user_meta($id,'strc_street',true));
        $postcode=(string)get_user_meta($id,'strc_postcode',true);
        if($street===''||!preg_match('/^[1-9][0-9]{3}$/D',$postcode))return null;
        $key='v2:'.md5(mb_strtolower($street).'|'.$postcode);$cached=get_user_meta($id,'strc_map_street_position',true);
        if(is_array($cached)&&($cached['key']??'')===$key)return $cached['position']?:null;
        if($geocoded>=10)return null;
        $geocoded++;$position=null;$home=null;
        $response=wp_remote_get('https://api3.geo.admin.ch/rest/services/ech/SearchServer?'.http_build_query(['type'=>'locations','origins'=>'address','searchText'=>$street.' '.$postcode,'sr'=>4326,'limit'=>5]),['timeout'=>6]);
        if(!is_wp_error($response)&&wp_remote_retrieve_response_code($response)===200){
            $body=json_decode(wp_remote_retrieve_body($response),true);
            foreach($body['results']??[] as $item){$attrs=$item['attrs']??[];
                if(str_contains(wp_strip_all_tags((string)($attrs['label']??'')),$postcode)&&isset($attrs['lat'],$attrs['lon'])){$home=[(float)$attrs['lat'],(float)$attrs['lon']];break;}
            }
        }
        if($home){
            $d=0.0035;$envelope=implode(',',[$home[1]-$d,$home[0]-$d,$home[1]+$d,$home[0]+$d]);
            $buildings=wp_remote_get('https://api3.geo.admin.ch/rest/services/api/MapServer/identify?'.http_build_query(['geometryType'=>'esriGeometryEnvelope','geometry'=>$envelope,'imageDisplay'=>'1000,1000,96','mapExtent'=>$envelope,'tolerance'=>0,'layers'=>'all:ch.bfs.gebaeude_wohnungs_register','sr'=>4326,'returnGeometry'=>'true','limit'=>200]),['timeout'=>8]);
            if(!is_wp_error($buildings)&&wp_remote_retrieve_response_code($buildings)===200){
                $candidates=[];
                foreach(json_decode(wp_remote_retrieve_body($buildings),true)['results']??[] as $feature){
                    $x=$feature['geometry']['x']??null;$y=$feature['geometry']['y']??null;
                    if(!is_numeric($x)||!is_numeric($y)||(string)($feature['attributes']['dplz4']??'')!==$postcode)continue;
                    $meters=sqrt((((float)$y-$home[0])*111320)**2+(((float)$x-$home[1])*111320*cos(deg2rad($home[0])))**2);
                    if($meters>=100&&$meters<=250)$candidates[round((float)$y,4).','.round((float)$x,4)]=[round((float)$y,4),round((float)$x,4)];
                }
                ksort($candidates);$candidates=array_values($candidates);
                if($candidates)$position=$candidates[hexdec(substr(hash_hmac('sha256',(string)$id,wp_salt('auth')),0,8))%count($candidates)];
            }
        }
        update_user_meta($id,'strc_map_street_position',['key'=>$key,'position'=>$position?:[]]);
        return $position;
    }
}

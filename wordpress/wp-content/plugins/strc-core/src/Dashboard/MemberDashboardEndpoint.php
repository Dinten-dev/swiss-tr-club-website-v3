<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Dashboard;

use SwissTRClub\Core\Http\AjaxRequest;
use SwissTRClub\Core\Forms\FormStore;
use SwissTRClub\Core\Community\LibraryPolicy;
use SwissTRClub\Core\Editorial\EditorialAccess;

final class MemberDashboardEndpoint
{
    public function registerHooks(): void
    {
        add_action('wp_ajax_strc_dashboard',[$this,'respond']);
        add_action('wp_ajax_nopriv_strc_dashboard',[$this,'respond']);
    }
    public function respond(): void
    {
        [, $input] = AjaxRequest::read('strc_dashboard',[]);
        if(!current_user_can('strc_access_member_area'))AjaxRequest::fail('Bitte mit einem aktiven Mitgliederkonto anmelden.',403);
        $language = $input['language'] ?? 'de';
        if (!in_array($language, ['de', 'fr'], true)) AjaxRequest::fail('Bitte eine gültige Sprache wählen.', 422);
        $eventTitle = static function(int $eventId) use ($language): string {
            $translated = $language === 'fr' ? (string)get_post_meta($eventId, 'strc_title_fr', true) : '';
            return $translated !== '' ? $translated : get_the_title($eventId);
        };
        $id=get_current_user_id();$registrations=[];$registered=[];
        foreach(FormStore::find('strc_registration',$id) as $post){
            $row=FormStore::data($post);$state=\SwissTRClub\Core\Forms\EventPayments::participationState($row);
            $registrations[]=['id'=>(int)$post->ID,'title'=>$eventTitle((int)$post->post_parent),'startAt'=>(string)get_post_meta($post->post_parent,'strc_start_at',true),'state'=>$state,'paymentStatus'=>$row['paymentStatus']??'','url'=>'#veranstaltung/'.$post->post_parent];
            if(!in_array($state,['cancelled','expired'],true))$registered[]=(int)$post->post_parent;
        }
        $upcoming=[];
        foreach(get_posts(['post_type'=>'strc_event','post_status'=>'publish','posts_per_page'=>100,'meta_key'=>'strc_start_at','meta_query'=>[['key'=>'strc_start_at','value'=>gmdate('Y-m-d'),'compare'=>'>=']],'orderby'=>'meta_value','order'=>'ASC']) as $post){
            $start=(string)get_post_meta($post->ID,'strc_start_at',true);
            if(!$start||strtotime($start)<time())continue;
            $required=(bool)get_post_meta($post->ID,'strc_registration_required',true);
            $upcoming[]=['id'=>(int)$post->ID,'title'=>$eventTitle((int)$post->ID),'startAt'=>$start,'location'=>(string)get_post_meta($post->ID,'strc_location',true),'registered'=>in_array((int)$post->ID,$registered,true),'url'=>($required?'#veranstaltung/':'#agenda/').$post->ID];
            if(count($upcoming)>=6)break;
        }
        $uploads=[];
        global $wpdb;
        $mine=static function(string $where,\WP_Query $query)use($id,$wpdb):string{
            if(!$query->get('strc_dashboard_mine'))return $where;
            return $where.$wpdb->prepare(" AND ({$wpdb->posts}.post_author=%d OR ({$wpdb->posts}.post_type='strc_album' AND EXISTS(SELECT 1 FROM {$wpdb->postmeta} sub WHERE sub.post_id={$wpdb->posts}.ID AND sub.meta_key='strc_album_submitters' AND sub.meta_value LIKE %s)))",$id,'%|'.$id.'|%');
        };
        add_filter('posts_where',$mine,10,2);
        $mineQuery=new \WP_Query(['post_type'=>['strc_topic','strc_album','strc_document','strc_ad'],'post_status'=>['publish','pending','draft'],'posts_per_page'=>12,'strc_dashboard_mine'=>true]);
        remove_filter('posts_where',$mine,10);
        foreach($mineQuery->posts as $post){
            if($post->post_type==='strc_document'&&!LibraryPolicy::canRead((int)$post->ID))continue;
            $route=['strc_topic'=>'forum','strc_album'=>'galerie','strc_document'=>'bibliothek','strc_ad'=>'marktplatz'][$post->post_type];
            $uploads[]=['id'=>(int)$post->ID,'title'=>$post->post_title,'status'=>$post->post_status,'url'=>'#'.$route.'/'.($route==='marktplatz'?'':$post->ID)];
        }
        $queues=[];
        foreach(['forum'=>'strc_topic','gallery'=>'strc_album','library'=>'strc_document','market'=>'strc_ad'] as $area=>$type){
            if(!EditorialAccess::area($area))continue;
            $args=['post_type'=>$type,'post_status'=>'pending','posts_per_page'=>1,'fields'=>'ids'];
            if($area==='gallery'){$args['post_status']=['pending','publish'];$args['meta_query']=[['key'=>'strc_gallery_pending_count','value'=>0,'compare'=>'>','type'=>'NUMERIC']];}
            if($area==='library')$args['meta_query']=[LibraryPolicy::filter()];
            $query=new \WP_Query($args);
            $queues[]=['title'=>EditorialAccess::AREAS[$area],'count'=>(int)$query->found_posts,'url'=>'#'.['forum'=>'forum','gallery'=>'galerie','library'=>'bibliothek','market'=>'marktplatz'][$area]];
        }
        $orders=[];
        if(function_exists('wc_get_orders'))foreach(wc_get_orders(['customer_id'=>$id,'limit'=>8,'orderby'=>'date','order'=>'DESC']) as $order)$orders[]=['id'=>$order->get_id(),'title'=>'Bestellung #'.$order->get_order_number(),'status'=>wc_get_order_status_name($order->get_status()),'total'=>wp_strip_all_tags($order->get_formatted_order_total()),'url'=>$order->get_view_order_url()];
        $magazine=null;$query=new \WP_Query(['post_type'=>'strc_document','post_status'=>'publish','posts_per_page'=>1,'meta_query'=>['relation'=>'AND',LibraryPolicy::filter(),['key'=>'strc_document_type','value'=>'magazine'],'year'=>['key'=>'strc_document_year','type'=>'NUMERIC'],'issue'=>['key'=>'strc_document_issue','type'=>'NUMERIC']],'orderby'=>['year'=>'DESC','issue'=>'DESC']]);
        if($query->posts){$post=$query->posts[0];$magazine=['title'=>$post->post_title,'url'=>'#bibliothek/'.$post->ID];}
        $featured=(new \SwissTRClub\Core\Content\MagazineEndpoint())->preview($language);
        if($featured&&!empty($featured['canRead'])&&LibraryPolicy::canRead((int)$featured['id']))$magazine=['title'=>$featured['title'],'url'=>'#bibliothek/'.$featured['id']];
        wp_send_json_success(['region'=>(string)((new \SwissTRClub\Core\Members\MembershipRepository())->findForUser($id)['region']??''),'displayName'=>wp_get_current_user()->display_name,'firstName'=>(string)get_user_meta($id,'first_name',true),'vehicles'=>\SwissTRClub\Core\Forms\FormsEndpoint::vehicles(),'upcoming'=>$upcoming,'registrations'=>array_slice($registrations,0,12),'uploads'=>$uploads,'orders'=>$orders,'queues'=>$queues,'notifications'=>array_reverse((array)get_user_meta($id,'strc_notifications',true)),'magazine'=>$magazine,'magazineIssue'=>$featured,'isBoard'=>current_user_can('strc_access_board_documents')]);
    }
}

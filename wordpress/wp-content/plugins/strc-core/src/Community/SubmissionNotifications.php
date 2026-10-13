<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Community;
final class SubmissionNotifications
{
    public static function send(int $id,string $area): void
    {
        $post=get_post($id);if(!$post)return;
        $cap=['gallery'=>'strc_gallery_moderator','library'=>'strc_manage_library','market'=>'strc_marketplace_moderator'][$area]??'';
        $restricted=$area==='library'&&LibraryPolicy::classification($id)==='restricted';
        foreach(get_users() as $user){if($user->ID===get_current_user_id()||!user_can($user,'strc_access_member_area'))continue;
            $review=$restricted?user_can($user,'strc_access_board_documents'):(user_can($user,'strc_manage_community')||($cap&&user_can($user,$cap))||(user_can($user,'strc_moderate')&&in_array($area,(array)get_user_meta($user->ID,'strc_moderation_areas',true),true)));
            if(!$review)continue;
            $fr=\SwissTRClub\Core\Http\UserLanguage::french((int)$user->ID);
            $route=['gallery'=>'galerie','library'=>'bibliothek','market'=>'marktplatz'][$area];$title=($fr?'Nouvelle contribution : ':'Neue Einreichung: ').$post->post_title;$url=home_url('/#'.$route.'/'.$id);
            $notifications=(array)get_user_meta($user->ID,'strc_notifications',true);$notifications[]=['id'=>'submission-'.$id.'-'.time(),'title'=>$title,'url'=>$url,'at'=>gmdate(DATE_ATOM)];update_user_meta($user->ID,'strc_notifications',array_slice($notifications,-50));
            wp_mail($user->user_email,$fr?'TR-Club : contribution à valider':'TR-Club: Einreichung zur Prüfung',$title."\n".$url);
        }
    }
}

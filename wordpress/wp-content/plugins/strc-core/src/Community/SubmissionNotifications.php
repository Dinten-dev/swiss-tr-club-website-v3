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
            $review=$restricted?user_can($user,'strc_access_board_documents'):(user_can($user,'strc_manage_community')||($cap&&user_can($user,$cap))||(user_can($user,'strc_moderate')&&in_array($area,\SwissTRClub\Core\Roles\RoleAssignments::areas((int)$user->ID),true)));
            if(!$review)continue;
            $fr=\SwissTRClub\Core\Http\UserLanguage::french((int)$user->ID);
            $route=['gallery'=>'galerie','library'=>'bibliothek','market'=>'marktplatz'][$area];$title=($fr?'Nouvelle contribution : ':'Neue Einreichung: ').$post->post_title;$url=home_url('/#'.$route.'/'.$id);
            $notifications=(array)get_user_meta($user->ID,'strc_notifications',true);$notifications[]=['id'=>'submission-'.$id.'-'.time(),'title'=>$title,'url'=>$url,'at'=>gmdate(DATE_ATOM)];update_user_meta($user->ID,'strc_notifications',array_slice($notifications,-50));
            wp_mail($user->user_email,$fr?'TR-Club : contribution à valider':'TR-Club: Einreichung zur Prüfung',$title."\n".$url);
        }
    }

    /** Tell the author how the review ended (dashboard notification and e-mail). */
    public static function decided(int $id,string $area,bool $approved): void
    {
        $post=get_post($id);if(!$post)return;$author=get_userdata((int)$post->post_author);if(!$author||$author->ID===get_current_user_id())return;
        $fr=\SwissTRClub\Core\Http\UserLanguage::french((int)$author->ID);
        $route=['gallery'=>'galerie','library'=>'bibliothek','market'=>'marktplatz'][$area]??'mitglieder';$url=home_url('/#'.($area==='market'?'marktplatz/meine':$route));
        $title=$approved?($fr?'Publié : ':'Freigegeben: ').$post->post_title:($fr?'Non publié : ':'Nicht freigegeben: ').$post->post_title;
        $notifications=(array)get_user_meta($author->ID,'strc_notifications',true);$notifications[]=['id'=>'decision-'.$id.'-'.time(),'title'=>$title,'url'=>$url,'at'=>gmdate(DATE_ATOM)];update_user_meta($author->ID,'strc_notifications',array_slice($notifications,-50));
        $body=$approved
            ?($fr?"Bonjour,\n\nVotre annonce « {$post->post_title} » a été vérifiée et est maintenant publiée.\n\n{$url}\n\nSwiss TR-Club":"Guten Tag\n\nIhr Inserat «{$post->post_title}» wurde geprüft und ist jetzt veröffentlicht.\n\n{$url}\n\nSwiss TR-Club")
            :($fr?"Bonjour,\n\nVotre annonce « {$post->post_title} » n’a pas pu être publiée sous cette forme. Vous pouvez la modifier et la soumettre à nouveau.\n\n{$url}\n\nSwiss TR-Club":"Guten Tag\n\nIhr Inserat «{$post->post_title}» konnte in dieser Form nicht veröffentlicht werden. Sie können es bearbeiten und erneut absenden.\n\n{$url}\n\nSwiss TR-Club");
        wp_mail($author->user_email,$approved?($fr?'TR-Club : annonce publiée':'TR-Club: Ihr Inserat ist veröffentlicht'):($fr?'TR-Club : annonce non publiée':'TR-Club: Ihr Inserat wurde nicht veröffentlicht'),$body);
    }
}

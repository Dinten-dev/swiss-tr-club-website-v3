<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Community;
use SwissTRClub\Core\Http\AjaxRequest;

/** Moderation: E-Mail-Benachrichtigungen zu neuen Mitgliederbeiträgen (Galerie, Bibliothek, Marktplatz) ein-/ausschalten und umleiten. */
final class ReviewNotificationSettings
{
    public function registerHooks(): void { add_action('wp_ajax_strc_review_notifications',[$this,'respond']); }
    public function respond(): void
    {
        [$op,$input]=AjaxRequest::read('strc_review_notifications',['save']);
        $user=wp_get_current_user();
        if(!$user->ID||!user_can($user,'strc_access_member_area'))AjaxRequest::fail('Aktiver Mitgliederzugang erforderlich.',403);
        $reviewer=SubmissionNotifications::reviewsAny($user);
        if($op==='save'){
            if(!$reviewer)AjaxRequest::fail('Keine Prüfberechtigung.',403);
            $address=sanitize_email($input['address']??'');
            if(trim((string)($input['address']??''))!==''&&!is_email($address))AjaxRequest::fail('Bitte eine gültige E-Mail-Adresse angeben.',422);
            SubmissionNotifications::savePreferences((int)$user->ID,($input['email']??'')==='1',$address);
        }elseif($op!=='list')AjaxRequest::fail('Unbekannte Anfrage.',400);
        wp_send_json_success(['nonce'=>wp_create_nonce('strc_review_notifications'),'reviewer'=>$reviewer,'accountEmail'=>$reviewer?$user->user_email:'','preferences'=>$reviewer?SubmissionNotifications::preferences((int)$user->ID):null]);
    }
}

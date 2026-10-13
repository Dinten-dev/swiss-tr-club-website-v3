<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Integrations\Fairgate;

use SwissTRClub\Core\Http\AjaxRequest;

final class FairgateApplications
{
    public function __construct(private readonly FairgateGateway $gateway, private readonly FairgateConfiguration $configuration, private readonly FairgateApplicationSettings $settings) {}

    public function registerHooks(): void
    {
        add_action('init',array($this,'registerType'));
        add_action('wp_ajax_strc_membership_application',array($this,'respond'));
        add_action('wp_ajax_nopriv_strc_membership_application',array($this,'respond'));
        add_action('strc_fairgate_cleanup',array($this,'cleanup'));
        add_action('init',static function(): void { if (!wp_next_scheduled('strc_fairgate_cleanup')) wp_schedule_event(time()+3600,'daily','strc_fairgate_cleanup'); });
    }

    public function registerType(): void
    {
        register_post_type('strc_application',array('public'=>false,'show_ui'=>false,'show_in_rest'=>false,'rewrite'=>false,'query_var'=>false,'supports'=>array(), 'capability_type'=>array('strc_application','strc_applications'), 'map_meta_cap'=>true, 'capabilities'=>array('edit_posts'=>'strc_manage_members','edit_others_posts'=>'strc_manage_members','read_private_posts'=>'strc_manage_members','delete_posts'=>'strc_manage_members','delete_private_posts'=>'strc_manage_members','delete_others_posts'=>'strc_manage_members','edit_private_posts'=>'strc_manage_members','publish_posts'=>'strc_manage_members','create_posts'=>'do_not_allow')));
    }

    public function available(): bool { return (bool) get_option('strc_membership_intake_enabled', true); }

    public function respond(): void
    {
        if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0)>20000) AjaxRequest::fail('Die Anfrage ist zu gross.',413);
        [$operation,$input]=AjaxRequest::read('strc_membership_application',array('submit'));
        if ($operation==='list' || $operation==='config') {
            wp_send_json_success(array('available'=>$this->available(),'regions'=>$this->regions(), 'nonce'=>$this->available()?wp_create_nonce('strc_membership_application'):''));
        }
        if ($operation!=='submit') AjaxRequest::fail('Unbekannte Anfrage.');
        if (!$this->available()) AjaxRequest::fail('Online-Anträge sind noch nicht freigeschaltet.',503);
        $origin=rtrim((string)($_SERVER['HTTP_ORIGIN'] ?? ''),'/');
        $allowed=array(rtrim(home_url(),'/'));
        if (defined('STRC_FRONTEND_ORIGIN')) $allowed[]=rtrim(STRC_FRONTEND_ORIGIN,'/');
        if ($origin && !in_array($origin,$allowed,true)) AjaxRequest::fail('Anfrage nicht erlaubt.',403);
        if (!empty($input['website'])) AjaxRequest::fail('Anfrage konnte nicht verarbeitet werden.',422);
        if (!preg_match('/^[a-f0-9-]{36}$/D',$input['requestId'] ?? '')) AjaxRequest::fail('Bitte das Formular neu laden.',422);
        try { $payload=\SwissTRClub\Core\Forms\FormFields::application($input, array_column($this->regions(), 'slug')); }
        catch (\InvalidArgumentException $error) { AjaxRequest::fail($error->getMessage(),422); }
        $ip=$_SERVER['REMOTE_ADDR'] ?? 'unknown'; // Never trust client-supplied forwarding headers.
        if (!$this->takeQuota($ip)) AjaxRequest::fail('Zu viele Versuche. Bitte später erneut versuchen.',429);
        $emailKey=hash_hmac('sha256',strtolower(trim($input['email'])).'|'.$this->configuration->organisationId(),wp_salt('auth'));
        global $wpdb;
        $lock='strc-app-'.substr($emailKey,0,48);
        if ('1'!==(string)$wpdb->get_var($wpdb->prepare('SELECT GET_LOCK(%s, 1)',$lock))) AjaxRequest::fail('Anfrage wird bereits verarbeitet. Bitte kurz warten.',409);
        $failure=null;$postId=0;
        try {
            // Persistent deduplication also survives a lost response or a new browser tab.
            // Unresolved applications stay protected beyond the normal retention period.
            $existing=$wpdb->get_var($wpdb->prepare("SELECT ID FROM {$wpdb->posts} WHERE post_type = 'strc_application' AND post_status = 'private' AND post_excerpt = %s LIMIT 1",$emailKey));
            if (!$existing) {
                $postId=wp_insert_post(wp_slash(array('post_type'=>'strc_application','post_status'=>'private','post_title'=>'Mitgliedsanfrage','post_name'=>$input['requestId'],'post_excerpt'=>$emailKey,'post_content'=>wp_json_encode(array('payload'=>$payload,'reference'=>$input['requestId'],'consentAt'=>gmdate(DATE_ATOM),'state'=>'pending_review')))),true);
                if (is_wp_error($postId) || !$postId) throw new \RuntimeException('Anfrage konnte nicht gespeichert werden.');
                // Approval and a verified Fairgate mapping are required before any external write.
                // Intake never provisions a WordPress account or changes membership access.
            }
        } catch (\Throwable $error) { $failure='Deine Anfrage konnte nicht abschliessend bestätigt werden. Bitte kontaktiere den Club, bevor du erneut sendest.'; }
        finally { $wpdb->get_var($wpdb->prepare('SELECT RELEASE_LOCK(%s)',$lock)); }
        if ($failure) AjaxRequest::fail($failure,503);
        if ($postId > 0) do_action('strc_application_received', (int)$postId);
        // Same response for duplicates prevents disclosure of a previous applicant's delivery state.
        wp_send_json_success(array('received'=>true,'message'=>'Deine Anfrage wurde erfasst. Der Club prüft die Angaben und die weitere Aufnahme. Eine Mitgliedschaft oder Zahlung ist damit noch nicht bestätigt.'));
    }

    private function regions(): array
    {
        $terms=\SwissTRClub\Core\Events\RegionDirectory::terms();
        return array_values(array_map(static fn($term)=>['slug'=>$term->slug,'name'=>$term->name], $terms));
    }

    private function takeQuota(string $ip): bool
    {
        global $wpdb;
        $key='strc_fg_rate_'.hash_hmac('sha256',$ip,wp_salt('auth'));
        $lock=substr($key,0,64);
        if ('1'!==(string)$wpdb->get_var($wpdb->prepare('SELECT GET_LOCK(%s, 1)',$lock))) return false;
        try {
            $quota=get_transient($key);
            if (!is_array($quota) || ($quota['until'] ?? 0)<=time()) $quota=array('count'=>0,'until'=>time()+3600);
            if ($quota['count']>=5) return false;
            $quota['count']++;
            return (bool)set_transient($key,$quota,max(1,$quota['until']-time()));
        } finally { $wpdb->get_var($wpdb->prepare('SELECT RELEASE_LOCK(%s)',$lock)); }
    }

    public function cleanup(): void
    {
        $ids=array();$offset=0;
        do {
            $posts=get_posts(array('post_type'=>'strc_application','post_status'=>'private','numberposts'=>100,'offset'=>$offset,'orderby'=>'ID','order'=>'ASC','date_query'=>array(array('before'=>'30 days ago'))));
            foreach ($posts as $post) {
                $data=json_decode($post->post_content,true);
                if (($data['state'] ?? '')==='delivered') $ids[]=$post->ID;
            }
            $offset+=count($posts);
        } while (count($posts)===100);
        // Delete after scanning so unresolved old requests cannot starve cleanup or shift offsets.
        foreach ($ids as $id) wp_delete_post($id,true);
    }
}

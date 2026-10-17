<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Forms;

final class FormsAdministration
{
    public function registerHooks(): void
    {
        add_action('admin_menu',function(){add_submenu_page('strc-club','Formularpostfach','Formularpostfach','strc_manage_members','strc-forms',[$this,'render']);});
        add_action('admin_post_strc_form_review',[$this,'review']);
    }
    public function review(): void
    {
        if(!current_user_can('strc_manage_members'))wp_die('Kein Zugriff.','',['response'=>403]);
        if(($_SERVER['REQUEST_METHOD']??'')!=='POST')wp_die('Bitte das Formular verwenden.','',['response'=>405]);
        check_admin_referer('strc_form_review');
        $post=get_post(absint($_POST['id']??0));
        if(!$post||!in_array($post->post_type,['strc_form','strc_application'],true)||$post->post_status!=='private')wp_die('Anfrage nicht gefunden.');
        if($post->post_type==='strc_application')wp_die('Mitgliedsanträge bitte in der Webübersicht unter «Anträge» prüfen und bestätigen.');
        try{
            $data=FormStore::data($post);$state=sanitize_key($_POST['state']??'');
            $allowed=$post->post_type==='strc_application'||in_array($data['kind']??'',['profile','subscription'],true)?['pending_review','clarification','approved_pending_sync','rejected']:['pending_review','clarification','resolved'];
            if(!in_array($state,$allowed,true))throw new \RuntimeException('Ungültiger Status.');
            if(!in_array($data['state']??'',$allowed,true))throw new \RuntimeException('Bereits übertragene oder unklare Altanfragen zuerst in Fairgate abgleichen.');
            $data['state']=$state;$data['reviewedAt']=gmdate(DATE_ATOM);$data['reviewedBy']=get_current_user_id();$data['reviewNote']=FormFields::text(wp_unslash($_POST),'note',2000);
            FormStore::save($post->post_type,$data,(int)$post->post_author,0,$post,sanitize_text_field($_POST['revision']??''));
        }catch(\Throwable $e){wp_die(esc_html($e->getMessage()));}
        wp_safe_redirect(admin_url('admin.php?page=strc-forms'));exit;
    }
    public function render(): void
    {
        if(!current_user_can('strc_manage_members'))wp_die('Kein Zugriff.');
        $page=max(1,absint($_GET['paged']??1));$query=new \WP_Query(['post_type'=>['strc_form','strc_application'],'post_status'=>'private','posts_per_page'=>20,'paged'=>$page,'orderby'=>'ID','order'=>'DESC']);
        echo '<div class="wrap"><h1>Formularpostfach</h1><p>Anträge, Kontaktanfragen, Profil- und Abo-Änderungen. Eine Freigabe vermerkt die Prüfung; sie überträgt noch keine Daten nach Fairgate und erstellt kein Mitgliedskonto. Rückfragen erfolgen persönlich durch die zuständige Person.</p>';
        if(!$query->posts)echo '<p>Keine Anfragen vorhanden.</p>';
        $labels=['pending_review'=>'Prüfung offen','clarification'=>'Rückfrage erforderlich','approved_pending_sync'=>'Geprüft – Fairgate-Übernahme offen','rejected'=>'Abgelehnt','resolved'=>'Erledigt'];
        foreach($query->posts as $post){
            $data=FormStore::data($post);$kind=$post->post_type==='strc_application'?'Mitgliedsantrag':(['profile'=>'Kontaktänderung','contact'=>'Kontaktanfrage','subscription'=>'Abo-Änderung (Magazin / eNewsletter)'][$data['kind']??'']??'Anfrage');
            if($post->post_type==='strc_application'){
                echo '<section class="card"><h2>Mitgliedsantrag #'.(int)$post->ID.'</h2><p><a href="'.esc_url((defined('STRC_FRONTEND_ORIGIN')?STRC_FRONTEND_ORIGIN:home_url()).'/#antraege').'">In der Webübersicht prüfen, annehmen oder ablehnen</a></p>';
                \SwissTRClub\Core\Mail\ApplicationNotification::renderStatus((int)$post->ID);
                echo '</section>';continue;
            }
            echo '<section class="card" style="max-width:900px"><h2>'.esc_html($kind.' #'.$post->ID).'</h2><p>'.esc_html($post->post_date.' · '.($labels[$data['state']??'']??($data['state']??''))).'</p><details><summary>Angaben ansehen</summary>';
            $this->table($data['payload']??[]);echo '</details>';
            $allowed=$kind==='Kontaktanfrage'?['pending_review','clarification','resolved']:['pending_review','clarification','approved_pending_sync','rejected'];
            if(in_array($data['state']??'',$allowed,true)){
                echo '<form method="post" action="'.esc_url(admin_url('admin-post.php')).'">';wp_nonce_field('strc_form_review');
                echo '<input type="hidden" name="action" value="strc_form_review"><input type="hidden" name="id" value="'.(int)$post->ID.'"><input type="hidden" name="revision" value="'.esc_attr(FormStore::revision($post)).'"><p><label>Bearbeitungsstand <select name="state">';
                foreach($allowed as $state)echo '<option value="'.esc_attr($state).'" '.selected($data['state'],$state,false).'>'.esc_html($labels[$state]).'</option>';
                echo '</select></label></p><p><label>Interne Notiz<br><textarea name="note" rows="3" cols="65" maxlength="2000">'.esc_textarea($data['reviewNote']??'').'</textarea></label></p><button class="button button-primary">Bearbeitungsstand speichern</button></form>';
            }echo '</section>';
        }
        echo '<p>'.wp_kses_post(paginate_links(['base'=>add_query_arg('paged','%#%'),'format'=>'','current'=>$page,'total'=>$query->max_num_pages])).'</p></div>';
    }
    private function table(array $data): void
    {
        $labels=['membershipType'=>'Mitgliedschaft','person'=>'Antragsteller/in','copilot'=>'Co-Pilot','first_name'=>'Vorname','last_name'=>'Nachname','salutation'=>'Anrede','language'=>'Sprache','email'=>'E-Mail','phone'=>'Telefon','street'=>'Strasse','postcode'=>'PLZ','city'=>'Ort','country'=>'Land','region'=>'Region','vehicles'=>'Fahrzeuge','model'=>'Modell','year'=>'Baujahr','colour'=>'Farbe','registration'=>'Kennzeichen','status'=>'Status','notes'=>'Bemerkungen','declarations'=>'Bestätigungen','statutes'=>'Statuten','privacy'=>'Datenschutz','name'=>'Name','subject'=>'Betreff','message'=>'Nachricht'];
        echo '<table class="widefat striped"><tbody>';foreach($data as $key=>$value){echo '<tr><th>'.esc_html($labels[$key]??(string)$key).'</th><td>';if(is_array($value))$this->table($value);else echo nl2br(esc_html(is_bool($value)?($value?'Ja':'Nein'):(string)$value));echo '</td></tr>';}echo '</tbody></table>';
    }
}

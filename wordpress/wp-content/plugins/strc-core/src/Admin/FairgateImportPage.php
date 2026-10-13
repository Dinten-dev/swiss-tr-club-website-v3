<?php
declare(strict_types=1);
namespace SwissTRClub\Core\Admin;
use SwissTRClub\Core\Integrations\Fairgate\FairgateStagingImport;

final class FairgateImportPage
{
    public function __construct(private readonly FairgateStagingImport $import) {}
    public function registerHooks(): void
    {
        if(!FairgateStagingImport::enabled())return;
        add_action('admin_menu',function(){add_submenu_page('strc-club','Fairgate-Mitglieder','Mitglieder übernehmen','strc_manage_members','strc-fairgate-import',[$this,'render']);});
        add_action('admin_post_strc_fairgate_import',[$this,'handle']);
    }
    public function handle(): void
    {
        FairgateStagingImport::guard();
        if(($_SERVER['REQUEST_METHOD']??'')!=='POST')wp_die('Bitte das Formular verwenden.','',['response'=>405]);
        check_admin_referer('strc_fairgate_import');
        $key='strc_fg_preview_'.get_current_user_id();
        try{
            $contacts=$this->import->fetch();$plan=$this->import->plan($contacts);$hash=hash('sha256',wp_json_encode($plan));
            if(($_POST['operation']??'')==='apply'){
                $previous=get_transient($key);
                if(!is_array($previous)||!hash_equals($previous['hash'],$hash))throw new \RuntimeException('Die Vorschau ist abgelaufen oder Daten haben sich geändert. Bitte erneut prüfen.');
                $this->import->apply($contacts);delete_transient($key);$notice='Übernahme abgeschlossen. Ergebnisse unten prüfen. Es wurden keine E-Mails versandt.';
            }else{
                // Cache only the minimized review rows, never the complete Fairgate response.
                $rows=array_map(static fn($r)=>array_intersect_key($r,array_flip(['id','name','label','action','reason'])),$plan);
                set_transient($key,['hash'=>$hash,'rows'=>$rows],600);$notice='Vorschau geladen. Noch keine Website-Konten geändert.';
            }
        }catch(\Throwable $e){$notice=$e instanceof \SwissTRClub\Core\Integrations\Fairgate\FairgateApiException||$e instanceof \RuntimeException?$e->getMessage():'Übernahme fehlgeschlagen. Bitte später erneut prüfen.';}
        set_transient('strc_fg_import_notice_'.get_current_user_id(),$notice,120);
        wp_safe_redirect(admin_url('admin.php?page=strc-fairgate-import'));exit;
    }
    public function render(): void
    {
        FairgateStagingImport::guard();nocache_headers();
        echo '<div class="wrap"><h1>Fairgate-Mitglieder für die Website</h1><p>Fairgate wird ausschliesslich gelesen. Übernommen werden persönliche Konten mit zugeordneter Mitgliedschaft und eindeutiger E-Mail. Firmenkontakte und unklare Zuordnungen bleiben zur Prüfung offen.</p><p>Bestehende Passwörter und redaktionelle Inhalte bleiben erhalten. Es werden keine Einladungen automatisch verschickt.</p>';
        $n=get_transient('strc_fg_import_notice_'.get_current_user_id());if($n){delete_transient('strc_fg_import_notice_'.get_current_user_id());echo '<div class="notice notice-info"><p>'.esc_html($n).'</p></div>';}
        echo '<form method="post" action="'.esc_url(admin_url('admin-post.php')).'">';wp_nonce_field('strc_fairgate_import');echo '<input type="hidden" name="action" value="strc_fairgate_import"><button class="button" name="operation" value="preview">Fairgate lesen und Vorschau prüfen</button></form>';
        $p=get_transient('strc_fg_preview_'.get_current_user_id());
        if(is_array($p)){
            echo '<h2>Vorschau</h2>'; $this->table($p['rows']);
            echo '<form method="post" action="'.esc_url(admin_url('admin-post.php')).'">';wp_nonce_field('strc_fairgate_import');echo '<input type="hidden" name="action" value="strc_fairgate_import"><button class="button button-primary" name="operation" value="apply">Geprüfte Mitglieder übernehmen</button></form>';
        }
        $next=wp_next_scheduled('strc_fairgate_member_refresh');echo '<p>Täglicher Abgleich: '.esc_html($next?wp_date('d.m.Y H:i',$next):'Noch nicht geplant').'</p>';
        $error=get_option('strc_fairgate_import_error');if($error)echo '<div class="notice notice-warning"><p>'.esc_html($error['message']).'</p></div>';
        $r=get_option('strc_fairgate_import_report',[]);
        if($r){echo '<h2>Letzte Übernahme</h2><p>'.esc_html($r['at']).'</p>'; $this->table($r['results']);}
        echo '<h2>Website-Passwort einrichten</h2><p>Importierte Mitglieder können mit ihrer persönlichen E-Mail über „Passwort vergessen“ ein eigenes Website-Passwort setzen. Fairgate-Passwörter werden weder gelesen noch verändert. Vorhandene Website-Passwörter bleiben gültig.</p><p><a href="'.esc_url(wp_lostpassword_url()).'">Passwort selbst einrichten</a></p><p>Offizielle Mitgliedsnummern und Regionen sind in der aktuellen API-Antwort noch nicht freigegeben. Diese Angaben werden nicht erfunden.</p></div>';
    }
    private function table(array $rows): void
    {
        $counts=array_count_values(array_column($rows,'action'));echo '<p>'.esc_html(implode(' · ',array_map(static fn($k,$v)=>$k.': '.$v,array_keys($counts),$counts))).'</p><table class="widefat striped"><thead><tr><th>Fairgate-ID</th><th>Name</th><th>Ergebnis</th><th>Hinweis</th></tr></thead><tbody>';
        $labels=['create'=>'Neues Konto','update'=>'Verknüpft / aktualisiert','skip'=>'Nicht übernommen','error'=>'Prüfung nötig'];
        foreach($rows as $r){if(($r['reason']??'')==='Keine Mitgliedschaft')continue;echo '<tr><td>'.esc_html($r['id']).'</td><td>'.esc_html($r['name']??'').'</td><td>'.esc_html($labels[$r['action']]??$r['action']).'</td><td>'.esc_html($r['reason']??'').'</td></tr>';}
        echo '</tbody></table>';
    }
}

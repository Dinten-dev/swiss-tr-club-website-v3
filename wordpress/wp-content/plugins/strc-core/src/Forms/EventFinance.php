<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Forms;
use SwissTRClub\Core\Events\RegionalEventAccess;
use SwissTRClub\Core\Http\AjaxRequest;

final class EventFinance
{
    public function registerHooks(): void { add_action('wp_ajax_strc_event_finance',[$this,'respond']); }
    public function respond(): void
    {
        [$op,$input]=AjaxRequest::read('strc_event_finance',['reconcile','promote']);
        try {
            $finance=current_user_can('strc_manage_finance');
            // Kasse: Übersicht aller Anlässe mit Anmeldung (Lesezugriff auf Teilnehmerlisten, Vorstandsentscheid 25.10.2026).
            if($op==='events'){
                if(!$finance||!current_user_can('strc_access_member_area'))throw new \RuntimeException('Kein Zugriff auf die Anlässe der Kasse.',403);
                wp_send_json_success(self::events(FormFields::text($input,'search',100),max(1,absint($input['page']??1))));
            }
            $eventId=absint($input['eventId']??0);
            if (!$eventId || get_post_type($eventId)!=='strc_event' || (!$finance&&!RegionalEventAccess::canEdit($eventId))) throw new \RuntimeException('Kein Zugriff auf diese Veranstaltung.',403);
            if($op==='promote'){
                if(!RegionalEventAccess::canEdit($eventId))throw new \RuntimeException('Nur die zuständige Veranstaltungsleitung darf die Warteliste bestätigen.',403);
                FormStore::locked('event-'.$eventId,static function()use($eventId,$input){
                    $post=get_post(absint($input['id']??0));if(!$post||$post->post_type!=='strc_registration'||(int)$post->post_parent!==$eventId)throw new \RuntimeException('Anmeldung nicht gefunden.',404);
                    $row=FormStore::data($post);if(($row['state']??'')!=='waiting'||get_post_status($eventId)!=='publish'||strtotime((string)get_post_meta($eventId,'strc_start_at',true))<time()||!user_can((int)$post->post_author,'strc_access_member_area'))throw new \RuntimeException('Diese Anmeldung kann nicht bestätigt werden.',409);
                    $capacity=(int)get_post_meta($eventId,'strc_capacity',true);if($capacity>0&&EventRegistration::occupied($eventId)+(int)$row['headcount']>$capacity)throw new \RuntimeException('Es sind noch nicht genügend Plätze frei.',409);
                    $row['state']='confirmed';$row['paymentMethod']=$row['total']>0?'invoice':'none';$row['paymentStatus']=$row['total']>0?'outstanding':'not_required';$row['financeAudit'][]=['at'=>gmdate(DATE_ATOM),'by'=>get_current_user_id(),'from'=>'waiting','to'=>'confirmed','note'=>'Warteliste durch Veranstaltungsleitung bestätigt.'];
                    FormStore::save('strc_registration',$row,(int)$post->post_author,$eventId,$post,$input['revision']??'');EventPayments::notify((int)$post->ID);
                });wp_send_json_success(['message'=>'Teilnahme bestätigt. Ein Teilnahmebeitrag wird separat in Rechnung gestellt.']);
            }
            if ($op==='reconcile') {
                if (!$finance&&!RegionalEventAccess::canEdit($eventId)) throw new \RuntimeException('Nur die Kasse darf Zahlungen abstimmen.',403);
                FormStore::locked('event-'.$eventId, static function () use ($input,$eventId) {
                    $post=get_post(absint($input['id']??0));
                    if (!$post||$post->post_type!=='strc_registration'||(int)$post->post_parent!==$eventId) throw new \RuntimeException('Anmeldung nicht gefunden.',404);
                    $row=FormStore::data($post);
                    if ($row['paymentMethod']!=='invoice') throw new \RuntimeException('Onlinezahlungen werden im Zahlungsdienst bearbeitet.',409);
                    $status=FormFields::choice($input,'status',['outstanding','partially_paid','paid','waived','refund_pending','refunded']);
                    $note=FormFields::text($input,'note',500,true);
                    $old=$row['paymentStatus']; $row['paymentStatus']=$status;
                    if(in_array($row['state'],['confirmed','reserved'],true)) {
                        if(in_array($status,['paid','waived'],true)) {
                            $row['state']='confirmed';
                            $row['confirmationAfterPayment']=true;
                        } elseif(in_array($status,['outstanding','partially_paid'],true)) $row['state']='confirmed';
                    }
                    // Audit and state live in the same CAS-protected record.
                    $row['financeAudit'][]=['at'=>gmdate(DATE_ATOM),'by'=>get_current_user_id(),'from'=>$old,'to'=>$status,'note'=>$note];
                    FormStore::save('strc_registration',$row,(int)$post->post_author,$eventId,$post,$input['revision']??'');
                    EventPayments::notify((int)$post->ID);
                });
                wp_send_json_success(['message'=>'Zahlungsstand gespeichert.']);
            }
            if ($op!=='list') throw new \InvalidArgumentException('Unbekannte Anfrage.');
            $rows=[];
            foreach (FormStore::find('strc_registration',0,$eventId) as $post) {
                $data=EventPayments::present($post,FormStore::data($post)); $member=get_userdata($post->post_author);
                $rows[]=['id'=>(int)$post->ID,'revision'=>FormStore::revision($post),'name'=>$member?$member->display_name:'','email'=>$member?$member->user_email:'','phone'=>$member?(string)get_user_meta($member->ID,'strc_phone',true):'','participants'=>implode(', ',array_column($data['participants'],'name')),'vehicle'=>$data['vehicle']??null,'room'=>$data['room']??'','notes'=>$data['notes']??'','meals'=>array_values(array_filter(array_map(static fn($p)=>empty($p['meal'])?'':$p['name'].': '.$p['meal'],$data['participants']))),'total'=>$data['total'],'state'=>$data['state'],'paymentMethod'=>$data['paymentMethod'],'paymentStatus'=>$data['paymentStatus'],'financeAudit'=>$finance?(FormStore::data($post)['financeAudit']??[]):[],'invoiceNumber'=>(string)get_post_meta($post->ID,'strc_invoice_number',true),'invoiceUrl'=>EventInvoice::downloadUrl((int)$post->ID)];
            }
            wp_send_json_success(['rows'=>$rows,'canPromote'=>RegionalEventAccess::canEdit($eventId),'canReconcile'=>$finance||RegionalEventAccess::canEdit($eventId),'onlineReady'=>\SwissTRClub\Core\Integrations\Zahls\ZahlsClient::ready(),'treasuryReady'=>is_email(defined('STRC_EVENT_TREASURY_EMAIL')?(string)STRC_EVENT_TREASURY_EMAIL:(string)getenv('STRC_EVENT_TREASURY_EMAIL'))!==false,'nonce'=>wp_create_nonce('strc_event_finance')]);
        } catch (\InvalidArgumentException $e) { AjaxRequest::fail($e->getMessage(),422); }
          catch (\RuntimeException $e) { AjaxRequest::fail($e->getMessage(),in_array($e->getCode(),[403,404,409],true)?$e->getCode():503); }
    }

    /** @return array{events:list<array<string,mixed>>,pages:int} */
    private static function events(string $search,int $page): array
    {
        $query=new \WP_Query(['post_type'=>'strc_event','post_status'=>['publish','trash'],'posts_per_page'=>20,'paged'=>$page,'s'=>$search,'meta_key'=>'strc_start_at','orderby'=>'meta_value','order'=>'DESC','meta_query'=>[['key'=>'strc_registration_required','value'=>'1']],'no_found_rows'=>false]);
        $events=[];
        foreach($query->posts as $post){
            $active=0;$open=0;
            foreach(FormStore::find('strc_registration',0,(int)$post->ID) as $registration){
                $row=FormStore::data($registration);if(in_array($row['state']??'',['cancelled','expired'],true))continue;
                $active++;if(in_array($row['paymentStatus']??'',['outstanding','partially_paid','pending','review_required','refund_pending'],true))$open++;
            }
            $events[]=['id'=>(int)$post->ID,'title'=>get_the_title($post),'startAt'=>(string)get_post_meta($post->ID,'strc_start_at',true),'location'=>(string)get_post_meta($post->ID,'strc_location',true),'archived'=>$post->post_status==='trash','registrations'=>$active,'openPayments'=>$open];
        }
        return ['events'=>$events,'pages'=>(int)$query->max_num_pages];
    }
}

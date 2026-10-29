<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Forms;
use SwissTRClub\Core\Integrations\Zahls\ZahlsClient;

/** Event lock protects both seat allocation and payment transitions. */
final class EventPayments
{
    public function registerHooks(): void
    {
        add_action('rest_api_init', function () {
            register_rest_route('strc/v1', '/payments/zahls', ['methods'=>'POST', 'permission_callback'=>'__return_true', 'callback'=>[$this,'webhook']]);
        });
        add_action('strc_event_payment_maintenance', [$this,'maintenance']);
        add_action('init', static function () {
            if (!wp_next_scheduled('strc_event_payment_maintenance')) wp_schedule_event(time()+60, 'hourly', 'strc_event_payment_maintenance');
        });
    }
    /** Legacy unpaid invoice records are reservations without rewriting saved data. */
    public static function participationState(array $row): string
    {
        $state=(string)($row['state']??'');
        if ($state==='reserved' && ($row['paymentMethod']??'')==='invoice') return 'confirmed';
        return $state;
    }
    public static function occupies(array $row): bool
    {
        return in_array($row['state']??'',['confirmed','reserved'],true) || (($row['state']??'')==='pending_payment' && (int)($row['holdUntil']??0)>time());
    }
    public static function methods(): array { return ZahlsClient::ready() ? ['invoice','twint','card'] : ['invoice']; }
    public static function start(int $id, string $method): void
    {
        $post = get_post($id); $row = FormStore::data($post);
        $attempt = ['reference'=>wp_generate_uuid4(), 'amount'=>(int)$row['total'], 'currency'=>'CHF', 'method'=>$method,
            'instance'=>ZahlsClient::setting('INSTANCE'), 'mode'=>ZahlsClient::setting('MODE','TEST'), 'status'=>'creating', 'createdAt'=>gmdate(DATE_ATOM)];
        $attemptId = FormStore::save('strc_payment', $attempt, (int)$post->post_author, $id);
        update_post_meta($attemptId, 'strc_payment_reference', $attempt['reference']);
        $row['paymentAttemptId']=$attemptId;
        FormStore::save('strc_registration',$row,(int)$post->post_author,(int)$post->post_parent,$post,FormStore::revision($post));
        try { $attempt += (new ZahlsClient())->create($attempt,(int)$post->post_parent); $attempt['status']='pending'; }
        catch (\RuntimeException) { $attempt['status']='unknown'; }
        $saved=get_post($attemptId);
        FormStore::save('strc_payment',$attempt,(int)$post->post_author,$id,$saved,FormStore::revision($saved));
        wp_schedule_single_event((int)$row['holdUntil']+1,'strc_event_payment_maintenance');
    }
    /** Owner can reuse the same gateway or invalidate it before changing to invoice. */
    public static function invoice(object $post, string $revision): void
    {
        if (!hash_equals(FormStore::revision($post),$revision)) throw new \RuntimeException('Bitte den aktuellen Zahlungsstand laden.',409);
        $row=FormStore::data($post);
        if (($row['state']??'')!=='pending_payment' || !self::occupies($row)) throw new \RuntimeException('Die Reservierung ist nicht mehr offen.',409);
        $attemptPost=get_post((int)($row['paymentAttemptId']??0));
        $attempt=$attemptPost ? FormStore::data($attemptPost) : [];
        if (empty($attempt['gatewayId'])) throw new \RuntimeException('Der Zahlungsstatus muss zuerst durch die Kasse geklärt werden. Bitte den Ablauf der Reservierung abwarten.',409);
        (new ZahlsClient())->revoke($attempt['gatewayId']);
        $attempt['status']='revoked';
        FormStore::save('strc_payment',$attempt,(int)$post->post_author,(int)$post->ID,$attemptPost,FormStore::revision($attemptPost));
        $row['state']='confirmed'; $row['paymentMethod']='invoice'; $row['paymentStatus']='outstanding'; unset($row['holdUntil']);
        FormStore::save('strc_registration',$row,(int)$post->post_author,(int)$post->post_parent,$post,$revision);
        self::notify((int)$post->ID);
    }
    public static function present(object $post, array $row): array
    {
        $row['state']=self::participationState($row);
        if (($row['state']??'')==='pending_payment' && !self::occupies($row)) { $row['state']='expired'; $row['paymentStatus']='expired'; }
        $attemptId=(int)($row['paymentAttemptId']??0); unset($row['paymentAttemptId'],$row['financeAudit']);
        if ($attemptId && (int)$post->post_author===get_current_user_id() && $row['state']==='pending_payment') {
            $attempt=get_post($attemptId); $data=$attempt ? FormStore::data($attempt) : [];
            $row['checkoutUrl']=$data['checkoutUrl']??'';
            $row['canInvoice']=!empty($data['gatewayId']);
        }
        return $row;
    }
    public function webhook(\WP_REST_Request $request): \WP_REST_Response|\WP_Error
    {
        $raw=$request->get_body(); $signature=$request->get_header('x-webhook-signatur'); $key=ZahlsClient::setting('WEBHOOK_KEY');
        if ($key==='' || strlen($raw)>65536 || !preg_match('/^[a-f0-9]{64}$/D',$signature) || !hash_equals(hash_hmac('sha256',$raw,$key),$signature)) return new \WP_Error('payment_signature','Ungültige Signatur.',['status'=>401]);
        $payload=json_decode($raw,true); $tx=$payload['transaction']??null;
        if (!is_array($tx)) return new \WP_Error('payment_payload','Ungültige Zahlung.',['status'=>400]);
        $reference=$tx['referenceId']??$tx['invoice']['referenceId']??'';
        if (!is_string($reference) || !preg_match('/^[a-f0-9-]{36}$/D',$reference)) return new \WP_REST_Response(['received'=>true],200);
        $matches=get_posts(['post_type'=>'strc_payment','post_status'=>'private','meta_key'=>'strc_payment_reference','meta_value'=>$reference,'posts_per_page'=>1]);
        if (!$matches) return new \WP_REST_Response(['received'=>true],200); // Shared merchant may also serve WooCommerce.
        $attemptPost=$matches[0]; $registration=get_post($attemptPost->post_parent);
        if (!$registration) return new \WP_Error('payment_registration','Zuordnung fehlt.',['status'=>409]);
        try {
            FormStore::locked('event-'.$registration->post_parent, function () use ($attemptPost,$registration,$tx) {
                $attemptPost=get_post($attemptPost->ID); $registration=get_post($registration->ID);
                $attempt=FormStore::data($attemptPost); $row=FormStore::data($registration);
                $invoice=$tx['invoice']??[]; $state=str_replace('-','_', (string)($tx['status']??''));
                $amount=$invoice['originalAmount']??$tx['amount']??null;
                if (($tx['instance']['name']??'')!==$attempt['instance'] || ($tx['mode']??'')!==$attempt['mode']
                    || ($invoice['currency']??'')!=='CHF' || !is_int($amount) || $amount!==$attempt['amount']
                    || ($state==='confirmed' && ($tx['amount']??null)!==$attempt['amount'])
                    || empty($tx['id']) || !ctype_digit((string)$tx['id'])) throw new \InvalidArgumentException('Zahlungsdaten stimmen nicht überein.');
                if (isset($invoice['referenceId']) && $invoice['referenceId']!==$attempt['reference']) throw new \InvalidArgumentException('Referenz stimmt nicht überein.');
                $transaction=(string)($tx['originalTransactionId']??$tx['id']);
                if (!empty($attempt['transactionId']) && $attempt['transactionId']!==$transaction) throw new \RuntimeException('Mehrere Transaktionen benötigen eine Prüfung.',409);
                $paidStates=['paid','partially_refunded','refunded','refund_pending','chargeback','disputed'];
                if ($state==='confirmed') {
                    if (in_array($attempt['status'],$paidStates,true)) return;
                    $attempt['transactionId']=$transaction; $attempt['status']='paid'; $attempt['paidAt']=gmdate(DATE_ATOM);
                    if ((int)($row['paymentAttemptId']??0)===(int)$attemptPost->ID) {
                        // Never acquire seats after timeout, cancellation or invoice switch.
                        $valid=($row['state']==='pending_payment' && self::occupies($row) && $row['paymentMethod']!=='invoice') || ($row['state']==='confirmed' && $row['paymentStatus']==='paid');
                        $row['state']=$valid?'confirmed':($row['state']==='cancelled'?'cancelled':'payment_review');
                        $row['paymentStatus']=$valid?'paid':'refund_pending';
                        if($valid)$row['confirmationAfterPayment']=true;
                        unset($row['holdUntil']);
                    }
                } elseif (in_array($state,['partially_refunded','refunded','refund_pending'],true)) {
                    if (empty($attempt['transactionId'])) throw new \RuntimeException('Ursprüngliche Zahlung fehlt.',409);
                    if ($attempt['status']==='refunded') return;
                    $refunded=$invoice['refundedAmount']??0;
                    if (!is_int($refunded)||$refunded<0||$refunded>$attempt['amount']||$refunded<($attempt['refundedAmount']??0)) throw new \InvalidArgumentException('Rückerstattungsbetrag ungültig.');
                    if ($state==='refunded' && $refunded!==$attempt['amount']) throw new \InvalidArgumentException('Rückerstattung unvollständig.');
                    $attempt['status']=$state; $attempt['refundedAmount']=$refunded;
                    if ((int)($row['paymentAttemptId']??0)===(int)$attemptPost->ID) $row['paymentStatus']=$state;
                } elseif (in_array($state,['declined','cancelled','expired','error'],true)) {
                    if (in_array($attempt['status'],$paidStates,true)) return;
                    $attempt['status']=$state; // Keep seats until the fixed deadline, including failed payment.
                } elseif (in_array($state,['chargeback','disputed'],true)) {
                    $attempt['status']=$state;
                    if ((int)($row['paymentAttemptId']??0)===(int)$attemptPost->ID) $row['paymentStatus']='review_required';
                } else { return; } // waiting, authorized and reserved are not payments.
                $attempt['updatedAt']=gmdate(DATE_ATOM);
                // Persist registration first: duplicate callbacks can repair an interrupted second write.
                FormStore::save('strc_registration',$row,(int)$registration->post_author,(int)$registration->post_parent,$registration,FormStore::revision($registration));
                FormStore::save('strc_payment',$attempt,(int)$attemptPost->post_author,(int)$registration->ID,$attemptPost,FormStore::revision($attemptPost));
                self::notify((int)$registration->ID);
            });
        } catch (\InvalidArgumentException $e) { return new \WP_Error('payment_mismatch',$e->getMessage(),['status'=>422]); }
          catch (\RuntimeException $e) { return new \WP_Error('payment_busy',$e->getMessage(),['status'=>409]); }
        return new \WP_REST_Response(['received'=>true],200);
    }
    /** Called under the event lock. wp_mail acceptance is tracked; delivery is not claimed. */
    public static function notify(int $id): void
    {
        $post=get_post($id); $row=FormStore::data($post); $user=get_userdata($post->post_author);
        $row['state']=self::participationState($row);
        if (!$user || !in_array($row['state'],['confirmed','reserved','waiting','payment_review','cancelled'],true)) return;
        $link=home_url('/').'#veranstaltung/'.$post->post_parent;
        $amount=number_format($row['total']/100,2,'.',"'").' CHF';
        $review=!in_array($row['state'],['confirmed','reserved','waiting'],true)||in_array($row['paymentStatus'],['refund_pending','review_required'],true);
        $treasury=defined('STRC_EVENT_TREASURY_EMAIL')?(string)STRC_EVENT_TREASURY_EMAIL:(string)getenv('STRC_EVENT_TREASURY_EMAIL');
        $fr=\SwissTRClub\Core\Http\UserLanguage::french((int)$user->ID);
        $messages=[];
        // Mitglieder-Mails aus den Mailvorlagen der Redaktion (DE/FR); interne Mails unten unverändert.
        $lang=$fr?'fr':'de';
        $translatedTitle=$fr?(string)get_post_meta((int)$post->post_parent,'strc_title_fr',true):'';
        $eventTitle=trim($translatedTitle)!==''?$translatedTitle:$row['eventTitle'];
        $memberMail=static function(string $key,array $values)use($lang,$user):array{$mail=\SwissTRClub\Core\Mail\MailTemplates::render($key,$lang,$values);return ['to'=>$user->user_email,'subject'=>$mail['subject'],'body'=>$mail['body'],'template'=>$key];};
        if (!$review && $row['state']==='reserved' && ($row['paymentWorkflow']??0)>=2) $messages['member_reserved']=$memberMail('event.reserved',['anlass'=>$eventTitle,'betrag'=>$amount,'link'=>$link]);
        if (!$review && $row['state']==='confirmed'){
            $paid=($row['paymentStatus']??'')==='paid';
            $hint=$row['paymentStatus']==='waived'?($fr?'La participation financière a été dispensée.':'Der Beitrag wurde erlassen.'):($row['total']>0?($paid?($fr?'La réception du paiement est confirmée.':'Der Zahlungseingang ist bestätigt.'):($fr?'La participation est confirmée. La facture suivra séparément ; le paiement reste en attente.':'Die Teilnahme ist bestätigt. Die Rechnung folgt separat; die Zahlung ist noch offen.')):($fr?'Aucun paiement n’est requis.':'Es ist keine Zahlung erforderlich.'));
            $messages[!empty($row['confirmationAfterPayment'])?'member_settled':'member']=$memberMail('event.confirmed',['anlass'=>$eventTitle,'teilnehmende'=>implode(', ',array_column($row['participants'],'name')),'betrag'=>$amount,'zahlungshinweis'=>$hint,'bedingungen'=>(string)($row['conditions']??''),'link'=>$link]);
        }
        if($row['state']==='waiting')$messages['member_waiting']=$memberMail('event.waiting',['anlass'=>$eventTitle,'link'=>$link]);
        $organizer=EventRegistration::settings((int)$post->post_parent)['organiserEmail'];
        if(is_email($organizer))$messages['organizer_'.$row['state']]=['to'=>$organizer,'subject'=>'Anmeldestatus: '.$row['eventTitle'],'body'=>"Anmeldung #".$id."\nTeilnehmende: ".implode(', ',array_column($row['participants'],'name'))."\nStatus: ".$row['state']."\n".$link];
        // Weg A (25.10.2026): Rechnung mit QR-Zahlteil direkt an das Mitglied, Kopie an die Kasse; die Kasse muss sie nicht mehr selbst erstellen.
        $invoiced=!$review&&$row['paymentMethod']==='invoice'&&$row['state']==='confirmed'&&(int)$row['total']>0&&in_array($row['paymentStatus']??'',['outstanding','partially_paid'],true)&&EventInvoice::send($id);
        if ($review || (!$invoiced&&$row['paymentMethod']==='invoice'&&$row['state']!=='waiting')) $messages[$review?'review':'invoice']=['to'=>$treasury,'subject'=>($review?'Zahlung prüfen: ':'Rechnung erstellen: ').$row['eventTitle'],'body'=>"Anmeldung #$id\nMitglied: ".$user->display_name."\nE-Mail: ".$user->user_email."\nBetrag: ".$amount."\nZahlungsstand: ".$row['paymentStatus']."\n".($review?'Bitte in zahls.ch prüfen. Keine automatische Rückerstattung.':'Bitte die Rechnung in Fairgate erstellen und versenden.')."\n".$link];
        foreach ($messages as $kind=>$mail) {
            $key='strc_payment_mail_'.$kind;
            if (get_post_meta($id,$key,true) || !is_email($mail['to'])) continue;
            if(\SwissTRClub\Core\Http\UserLanguage::frenchEmail($mail['to']) && str_starts_with($kind,'organizer_'))$mail=['to'=>$mail['to'],'subject'=>'Statut d’inscription : '.$row['eventTitle'],'body'=>"Inscription #".$id."\nParticipants : ".implode(', ',array_column($row['participants'],'name'))."\nStatut : ".$row['state']."\n".$link];
            if(\SwissTRClub\Core\Http\UserLanguage::frenchEmail($mail['to']) && in_array($kind,['review','invoice'],true))$mail=['to'=>$mail['to'],'subject'=>($review?'Vérifier le paiement : ':'Créer une facture : ').$row['eventTitle'],'body'=>"Inscription #$id\nMembre : ".$user->display_name."\nE-mail : ".$user->user_email."\nMontant : ".$amount."\nStatut de paiement : ".$row['paymentStatus']."\n".($review?'Vérifier dans zahls.ch. Aucun remboursement automatique.':'Créer et envoyer la facture dans Fairgate.')."\n".$link];
            \SwissTRClub\Core\Mail\MailLog::context($mail['template']??(str_starts_with($kind,'organizer_')?'Anlässe: Anmeldestatus an Organisator':($kind==='review'?'Anlässe: Zahlung prüfen (Kasse)':'Anlässe: Rechnung erstellen (Kasse)')));
            if (wp_mail($mail['to'],$mail['subject'],$mail['body'])) update_post_meta($id,$key,gmdate(DATE_ATOM));
        }
    }
    public function maintenance(): void
    {
        foreach (FormStore::find('strc_registration') as $post) {
            try { FormStore::locked('event-'.$post->post_parent, static function () use ($post) {
                $post=get_post($post->ID); $row=FormStore::data($post);
                if (($row['state']??'')==='pending_payment' && !self::occupies($row)) {
                    $row['state']='expired'; $row['paymentStatus']='expired';
                    FormStore::save('strc_registration',$row,(int)$post->post_author,(int)$post->post_parent,$post,FormStore::revision($post));
                }
                // Legacy registrations are not mailed retroactively.
                if (!empty($row['paymentWorkflow'])) self::notify((int)$post->ID);
            }); } catch (\RuntimeException) { /* Next scheduled run retries without changing capacity. */ }
        }
    }
}

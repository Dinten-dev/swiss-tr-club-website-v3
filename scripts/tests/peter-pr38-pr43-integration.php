<?php
/** Disposable fixtures. No real messages, payments, or remote writes. */
if (!defined('WP_CLI') || !WP_CLI || wp_get_environment_type() !== 'staging') throw new RuntimeException('Staging QA only');
if (class_exists('SwissTRClub\\Core\\Plugin', false)) throw new RuntimeException('Skip canonical core');
require getenv('STRC_QA_PLUGIN').'/strc-core.php';
require __DIR__.'/role-overlay.php';
use SwissTRClub\Core\Finance\ClubDocument;
use SwissTRClub\Core\Forms\{FormStore,EventInvoice,EventRegistration};
use SwissTRClub\Core\Shop\ShopInvoice;
use SwissTRClub\Core\Infrastructure\MacRomanRepair;
use SwissTRClub\Core\Community\{CatalogSettings,SubmissionNotifications};
global $wpdb,$checks;
$checks=[];$users=[];$posts=[];$orders=[];$mails=[];$network=0;$prefix='strc_pr3843_qa_'.bin2hex(random_bytes(4));
$optionNames=['strc_invoice_automation_from','strc_document_sequence_shop','strc_document_sequence_event','strc_forum_components','strc_forum_components_verdecke','strc_macroman_repair_v1'];$options=[];
foreach($optionNames as$name)$options[$name]=[get_option($name,null),get_option($name,null)!==null];
function p43check(bool $ok,string $label): void {global $checks;if(!$ok)throw new RuntimeException($label);$checks[]=$label;}
add_filter('pre_wp_mail',static function($value,$args)use(&$mails){$mails[]=$args;return true;},10,2);
add_filter('pre_http_request',static function()use(&$network){$network++;return new WP_Error('qa','Network blocked');});
SwissTRClub\Core\Roles\RoleManager::install();FormStore::register();
try{
 foreach(['de','fr','other','reviewer']as$name){$id=wp_insert_user(['user_login'=>$prefix.'_'.$name,'user_email'=>$prefix.'_'.$name.'@example.invalid','user_pass'=>wp_generate_password(40),'first_name'=>'QA','last_name'=>'Test','display_name'=>'QA Test','role'=>'strc_member']);if(is_wp_error($id))throw new RuntimeException('Fixture user');$users[$name]=(int)$id;(new SwissTRClub\Core\Members\MembershipRepository())->syncUser($id);foreach(['strc_street'=>'Teststrasse 7','strc_postcode'=>'3000','strc_city'=>'Bern','strc_country'=>'Schweiz']as$k=>$v)update_user_meta($id,$k,$v);}
 update_user_meta($users['fr'],'strc_ui_language','fr');
 add_action('pre_get_users',static function($q)use(&$users){$q->set('include',array_values($users));});
 update_option('strc_invoice_automation_from',time()-3600,false);
 p43check(!ClubDocument::eligible(time()-7200),'Existing orders and registrations are excluded from automatic rollout');
 p43check(ClubDocument::ready(),'PDF libraries and creditor configuration available');
 p43check(ClubDocument::reference('shop',1)!==ClubDocument::reference('event',1),'Separate shop/event QR references');
 $caught=false;try{ClubDocument::next('unknown');}catch(InvalidArgumentException){$caught=true;}p43check($caught,'Unknown document sequence rejected');
 update_option('strc_document_sequence_shop',910000,false);update_option('strc_document_sequence_event',910000,false);
 $blockSequence=static fn($new,$old)=>$old;add_filter('pre_update_option_strc_document_sequence_shop',$blockSequence,10,2);$failed=false;try{ClubDocument::next('shop');}catch(RuntimeException){$failed=true;}remove_filter('pre_update_option_strc_document_sequence_shop',$blockSequence,10);p43check($failed,'Sequence persistence failure blocks invoice issuance');
 // Order fixtures have no real customer/address and never trigger a gateway.
 foreach(['de','fr']as$lang){
  $order=wc_create_order(['customer_id'=>$users[$lang]]);$orders[]=$order->get_id();$order->set_currency('CHF');$order->set_payment_method(ShopInvoice::GATEWAY);$order->set_billing_first_name('QA');$order->set_billing_last_name('Test');$order->set_billing_email(get_userdata($users[$lang])->user_email);$order->set_billing_address_1('Teststrasse 7');$order->set_billing_postcode('3000');$order->set_billing_city('Bern');$order->set_billing_country('CH');
  $item=new WC_Order_Item_Product();$item->set_name('TR-Club Testartikel');$item->set_quantity(2);$item->set_subtotal('100');$item->set_total('100');$order->add_item($item);$order->set_total('100');$order->set_status('on-hold');$order->save();
  $before=count($mails);(new ShopInvoice())->issue($order->get_id());$order=wc_get_order($order->get_id());
  p43check((bool)$order->get_meta('_strc_invoice_sent')&&count($mails)===$before+1,'Shop '.$lang.' invoice generated and mail intercepted once');
  $pdf=ShopInvoice::pdf($order);file_put_contents(getenv('STRC_QA_OUTPUT').'/shop-'.$lang.'.pdf',$pdf);$hash=hash('sha256',$pdf);
  (new ShopInvoice())->issue($order->get_id());p43check(count($mails)===$before+1,'Repeated shop invoice sends no duplicate');
  $order->set_total('999');$order->save();p43check(hash('sha256',ShopInvoice::pdf($order))===$hash,'Issued shop invoice stays unchanged after order edit');
  $method=new ReflectionMethod(ShopInvoice::class,'allowed');wp_set_current_user($users['other']);p43check(!$method->invoke(null,$order),'Other member cannot read shop invoice');wp_set_current_user($users[$lang]);p43check($method->invoke(null,$order),'Owner can read shop invoice');
 }
 $order=wc_create_order();$orders[]=$order->get_id();$order->set_currency('EUR');$order->set_total(50);$order->set_payment_method(ShopInvoice::GATEWAY);$order->set_billing_email('qa@example.invalid');$order->set_status('on-hold');$order->save();$before=count($mails);(new ShopInvoice())->issue($order->get_id());$order=wc_get_order($order->get_id());p43check(!$order->get_meta('_strc_invoice_number')&&count($mails)===$before,'Foreign currency never creates a CHF invoice');
 $event=wp_insert_post(['post_type'=>'strc_event','post_title'=>'QA Alpenfahrt','post_status'=>'draft']);$posts[]=$event;update_post_meta($event,'strc_title_fr','QA Sortie alpine');
 foreach(['de','fr']as$lang){$row=['state'=>'confirmed','paymentMethod'=>'invoice','paymentStatus'=>'outstanding','eventTitle'=>'QA Alpenfahrt','eventStart'=>'2026-12-10T09:00:00Z','total'=>12000,'conditions'=>'QA Bedingungen','participants'=>[['name'=>'QA Test','role'=>'Mitglied','fee'=>12000]]];$id=FormStore::save('strc_registration',$row,$users[$lang],$event);$posts[]=$id;$before=count($mails);p43check(EventInvoice::send($id)&&count($mails)===$before+1,'Event '.$lang.' invoice generated with intercepted mail');$pdf=EventInvoice::pdf($id);file_put_contents(getenv('STRC_QA_OUTPUT').'/event-'.$lang.'.pdf',$pdf);p43check(EventInvoice::send($id)&&count($mails)===$before+1,'Event invoice is idempotent');$post=get_post($id);$row['total']=99900;FormStore::save('strc_registration',$row,$users[$lang],$event,$post,FormStore::revision($post));p43check(EventInvoice::pdf($id)===$pdf,'Issued event invoice stays unchanged after registration edit');}
 $id=FormStore::save('strc_registration',['state'=>'waiting','paymentMethod'=>'invoice','paymentStatus'=>'outstanding','total'=>10000],$users['de'],$event);$posts[]=$id;p43check(!EventInvoice::send($id)&&!get_post_meta($id,'strc_invoice_number',true),'Waiting list creates no invoice');
 $pdf=ClubDocument::start('Rechnung',['QA Test','Teststrasse 7','3000 Bern'],['Rechnungsnummer'=>'QA-LONG'],'de',true);$rows=[];for($i=1;$i<=65;$i++)$rows[]=['Testposition '.$i.' – ausführliche Artikelbeschreibung',1,1,1];ClubDocument::table($pdf,$rows,65,'de');ClubDocument::paymentPart($pdf,['name'=>'QA Test','street'=>'Teststrasse 7','postcode'=>'3000','city'=>'Bern','country'=>'CH'],65,ClubDocument::reference('shop',919999),'QA LONG','de');file_put_contents(getenv('STRC_QA_OUTPUT').'/invoice-long.pdf',$pdf->Output('QA.pdf','S'));
 update_user_meta($users['de'],'strc_city',"M\u{9F}nchenstein");$repair=new MacRomanRepair();$plan=$repair->preview();p43check(count($plan['changes'])===1&&get_user_meta($users['de'],'strc_city',true)!=='Münchenstein','Text repair preview does not mutate records');p43check($repair->repairStoredOnce()===0,'Unreviewed text migration does nothing');$bad=false;try{$repair->repairStoredOnce(str_repeat('0',64));}catch(RuntimeException){$bad=true;}p43check($bad,'Stale text preview rejected');p43check($repair->repairStoredOnce($plan['hash'])===1&&get_user_meta($users['de'],'strc_city',true)==='Münchenstein','Reviewed text correction applies exactly once');p43check(!$repair->preview()['changes'],'Repeated text preview empty');
 update_option('strc_forum_components',['Custom','Innenausstattung','Motor'],false);delete_option('strc_forum_components_verdecke');p43check(CatalogSettings::components()===['Custom','Innenausstattung','Verdecke','Motor'],'Verdecke adds once preserving custom categories');update_option('strc_forum_components',['Custom','Motor'],false);p43check(CatalogSettings::components()===['Custom','Motor'],'Later catalog choices remain editable');
 $reviewer=new WP_User($users['reviewer']);$reviewer->add_cap('strc_gallery_moderator');$post=wp_insert_post(['post_type'=>'strc_album','post_title'=>'QA Einreichung','post_status'=>'draft']);$posts[]=$post;wp_set_current_user($users['de']);SubmissionNotifications::savePreferences($reviewer->ID,false,'');$before=count($mails);SubmissionNotifications::send($post,'gallery');p43check(count($mails)===$before&&(bool)get_user_meta($reviewer->ID,'strc_notifications',true),'Reviewer mail opt-out preserves dashboard notification');SubmissionNotifications::savePreferences($reviewer->ID,true,'qa-alternate@example.invalid');SubmissionNotifications::send($post,'gallery');p43check(end($mails)['to']==='qa-alternate@example.invalid','Reviewer alternate notification address respected');
 $reviewer->remove_cap('strc_gallery_moderator');$reviewer->add_cap('strc_access_board_documents');p43check(SubmissionNotifications::reviewsAny($reviewer),'Board-only document reviewer can configure notification preferences');
 p43check(EventRegistration::meetingRole('Co-Pilot Mitglied')==='Begleitung Mitglied'&&EventRegistration::meetingRole('Mitglied')==='Mitglied','Meeting labels preserve member semantics');p43check($network===0,'No external requests');
 echo wp_json_encode(['passed'=>count($checks),'checks'=>$checks,'interceptedMails'=>count($mails),'externalRequests'=>$network]);
}finally{
 foreach($orders as$id){$order=wc_get_order($id);if($order){$archive=$order->get_meta('_strc_invoice_pdf');if(is_array($archive)&&isset($archive['key']))@unlink(ClubDocument::archiveDirectory().'/'.$archive['key']);$order->delete(true);}}
 foreach($posts as$id){$archive=get_post_meta($id,'strc_invoice_pdf',true);if(is_array($archive)&&isset($archive['key']))@unlink(ClubDocument::archiveDirectory().'/'.$archive['key']);wp_delete_post($id,true);}
 require_once ABSPATH.'wp-admin/includes/user.php';foreach($users as$id){$wpdb->delete($wpdb->prefix.'strc_memberships',['user_id'=>$id]);wp_delete_user($id);}
 foreach($options as$name=>[$value,$exists]){if($exists)update_option($name,$value,false);else delete_option($name);}
 wp_set_current_user(0);
}

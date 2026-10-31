<?php
/** Staging acceptance against real WordPress, WooCommerce and InnoDB. Synthetic records only. */
declare(strict_types=1);
use SwissTRClub\Core\Shop\ShopOperations;
use SwissTRClub\Core\Shop\ShopInvoice;
use SwissTRClub\Core\Finance\ClubDocument;
use SwissTRClub\Core\Forms\EventRegistration;
use SwissTRClub\Core\Forms\FormStore;
use SwissTRClub\Core\Mail\MailTemplates;
use SwissTRClub\Core\Mail\MailTemplatesEndpoint;
use SwissTRClub\Core\Members\MembershipRepository;
if(!defined('WP_CLI')||!WP_CLI||home_url()!=='https://staging.swisstrclub.ch'||wp_get_environment_type()!=='staging')throw new RuntimeException('Staging WP-CLI required');
if(wp_using_ext_object_cache())throw new RuntimeException('Fixture requires process-local object caching');
global $checks;
$checks=[];$productIds=[];$userIds=[];$postIds=[];$orderIds=[];$paths=[];$captured=[];$mailSuccess=true;$failure=null;$skipped=[];
$prefix='integrationqa_'.bin2hex(random_bytes(8));$originalUser=get_current_user_id();
function prCheck(bool $ok,string $label):void{global $checks;$checks[]=['test'=>$label,'passed'=>$ok];if(!$ok)throw new RuntimeException($label);}
function prInvoke(object $object,string $method,mixed ...$args):mixed{return(new ReflectionMethod($object,$method))->invoke($object,...$args);}
function prReject(callable $work,string $label):void{try{$work();}catch(InvalidArgumentException|RuntimeException){prCheck(true,$label);return;}throw new RuntimeException('Unexpected acceptance: '.$label);}
function prProduct(int $id):WC_Product{clean_post_cache($id);wc_delete_product_transients($id);$product=wc_get_product($id);if(!$product)throw new RuntimeException('Missing fixture product');return $product;}
add_filter('pre_wp_mail',static function($result,$args)use(&$captured,&$mailSuccess){$captured[]=$args;return $mailSuccess;},PHP_INT_MAX,2);
add_filter('pre_http_request',static fn()=>new WP_Error('integration_qa','External traffic blocked'),PHP_INT_MAX);
global $wpdb;
try{
 $admin=get_user_by('email','traver.dinten@outlook.com');if(!$admin)throw new RuntimeException('Acceptance account missing');wp_set_current_user($admin->ID);
 prCheck(MailTemplates::canManage(),'Requested account can manage mail templates');
 foreach([$wpdb->posts,$wpdb->postmeta,$wpdb->options,$wpdb->users,$wpdb->usermeta,$wpdb->prefix.'strc_memberships',$wpdb->prefix.'wc_product_meta_lookup']as$table){$row=$wpdb->get_row($wpdb->prepare('SHOW TABLE STATUS LIKE %s',$wpdb->esc_like($table)),ARRAY_A);prCheck(strtoupper($row['Engine']??'')==='INNODB','Transactional table '.$table);}
 // Template writes and legacy registrations are contained in one rolled-back transaction.
 $oldOptions=[];foreach(['strc_mail_templates','strc_member_welcome_mail']as$key)$oldOptions[$key]=get_option($key,null);
 $wpdb->query('START TRANSACTION');
 try{
  $endpoint=new MailTemplatesEndpoint();$list=prInvoke($endpoint,'listing');prCheck(count($list['templates'])>10,'Mail editor lists deployed templates');
  $template=current(array_filter($list['templates'],static fn($row)=>$row['key']==='marketplace.contact.sender'));if(!$template)$template=current(array_filter($list['templates'],static fn($row)=>empty($row['woo'])&&empty($row['welcome'])));
  $values=['de'=>$template['de'],'fr'=>$template['fr']];$values['de']['subject']=$prefix.' '.$values['de']['subject'];
  $input=['key'=>$template['key'],'revision'=>$template['revision'],'values'=>wp_json_encode($values)];
  $saved=prInvoke($endpoint,'save',$input);prCheck(str_starts_with(MailTemplates::template($template['key'],'de')['subject'],$prefix),'Native template CAS saves German text');
  prReject(fn()=>prInvoke($endpoint,'save',$input),'Stale native template revision rejected');
  $preview=prInvoke($endpoint,'preview',$input,false);prCheck(!empty($preview['html'])&&str_contains($preview['html'],'data-strc-mail'),'Template preview uses club HTML layout');
  for($i=0;$i<3;$i++){$id=wp_insert_user(['user_login'=>$prefix.'_'.$i,'user_pass'=>wp_generate_password(40,true,true),'user_email'=>$prefix.'_'.$i.'@example.invalid','first_name'=>'Fixture'.$i,'last_name'=>'Member','display_name'=>'Fixture'.$i.' Member','role'=>'strc_member']);if(is_wp_error($id))throw new RuntimeException('Fixture member failed');$userIds[]=$id;(new MembershipRepository())->syncUser($id);}
  wp_set_current_user($userIds[0]);
  $event=wp_insert_post(['post_type'=>'strc_event','post_status'=>'publish','post_title'=>$prefix.' Event','post_author'=>$userIds[0]]);$postIds[]=$event;update_post_meta($event,'strc_start_at','2099-01-01T12:00:00Z');update_post_meta($event,'strc_registration_required','1');
  $settings=array_replace(EventRegistration::settings($event),['vehicle'=>false,'fee'=>1000,'copilotFee'=>500,'guestFee'=>2000,'guestCopilotFee'=>1500]);$registration=new EventRegistration();
  $member=static function($id):array{$row=(new MembershipRepository())->findForUser($id);return ['type'=>'member','memberNumber'=>$row['member_number'],'firstName'=>get_user_meta($id,'first_name',true),'lastName'=>'Member'];};
  $guest=['type'=>'guest','firstName'=>'Guest','lastName'=>'Fixture'];
  $input=['crews'=>wp_json_encode([['copilot'=>$member($userIds[1])],['pilot'=>$guest,'copilot'=>$guest]])];$data=prInvoke($registration,'submission',get_post($event),$settings,$input);
  prCheck($data['headcount']===4&&$data['total']===5000,'Real membership lookup and 2+2 tariffs are correct');
  $invalid=['crews'=>wp_json_encode([[],['pilot'=>$member($userIds[1])]])];prReject(fn()=>prInvoke($registration,'submission',get_post($event),$settings,$invalid),'New extra member is rejected against native membership data');
  $legacy=['state'=>'confirmed','participants'=>[['kind'=>'member','name'=>'Fixture0 Member','userId'=>$userIds[0],'crew'=>1],['kind'=>'guest','name'=>'Old Guest','crew'=>2],['kind'=>'member','name'=>'Fixture1 Member','userId'=>$userIds[1],'crew'=>3],['kind'=>'copilot','name'=>'Fixture2 Member','userId'=>$userIds[2],'crew'=>3]]];
  $id=FormStore::save('strc_registration',$legacy,$userIds[0],$event);$postIds[]=$id;
  $edited=prInvoke($registration,'submission',get_post($event),$settings,['crews'=>wp_json_encode([[],['existingCrew'=>3,'pilot'=>$member($userIds[1]),'copilot'=>$member($userIds[2])]])],get_post($id));
  prCheck(array_column($edited['participants'],'userId')===$userIds&&$edited['total']===2500,'Legacy member mapping survives removal of an earlier guest crew');
 }finally{$wpdb->query('ROLLBACK');foreach($userIds as$id)clean_user_cache($id);foreach($postIds as$id)clean_post_cache($id);foreach(array_keys($oldOptions)as$key)wp_cache_delete($key,'options');wp_cache_delete('alloptions','options');wp_cache_delete('notoptions','options');wp_set_current_user($admin->ID);}
 foreach($oldOptions as$key=>$value)prCheck(get_option($key,null)===$value,'Template option restored: '.$key);
 // Product operations commit internally; create private fixtures and delete their exact IDs in finally.
 $product=new WC_Product_Variable();$product->set_name($prefix.' Shirt');$product->set_status('private');
 $size=new WC_Product_Attribute();$size->set_name('Grösse');$size->set_options(['M','L']);$size->set_visible(true);$size->set_variation(true);
 $brand=new WC_Product_Attribute();$brand->set_name('Hersteller');$brand->set_options(['Club']);$brand->set_visible(true);$brand->set_variation(false);$product->set_attributes([$size,$brand]);$id=$product->save();$productIds[]=$id;
 foreach(['M','L']as$i=>$value){$variant=new WC_Product_Variation();$variant->set_parent_id($id);$variant->set_status($i?'publish':'private');$variant->set_attributes([sanitize_title('Grösse')=>$value]);$variant->set_regular_price('20');$variant->set_manage_stock(true);$variant->set_stock_quantity(5);$productIds[]=$variant->save();}
 WC_Product_Variable::sync($id);$detail=ShopOperations::productDetail(['id'=>$id]);prCheck(count($detail['variants'])===2,'Native product detail includes both variation statuses');
 $input=['id'=>(string)$id,'revision'=>$detail['revision'],'title'=>$prefix.' Updated','description'=>'Synthetic acceptance','status'=>'private','sku'=>'','cost'=>'10','variants'=>wp_json_encode(array_map(static fn($row)=>array_replace($row,['price'=>'25','stock'=>'4','cost'=>'10']),$detail['variants']))];
 ShopOperations::updateProduct($input);$fresh=prProduct($id);prCheck($fresh->get_status()==='private'&&isset($fresh->get_attributes()['hersteller']),'Native edit preserves private status and unrelated attributes');
 prCheck(prProduct($productIds[1])->get_status()==='private'&&prProduct($productIds[2])->get_status()==='publish','Native edit preserves variation statuses');
 prReject(fn()=>ShopOperations::updateProduct($input),'Native stale product revision rejected');
 $detail=ShopOperations::productDetail(['id'=>$id]);$input['revision']=$detail['revision'];$input['variants']=wp_json_encode($detail['variants']);$input['title']=$prefix.' Must roll back';
 $before=[];foreach($productIds as$target)$before[$target]=[$wpdb->get_row($wpdb->prepare("SELECT post_title,post_status FROM {$wpdb->posts} WHERE ID=%d",$target),ARRAY_A),get_post_meta($target)];
 $failId=$productIds[2];$failureReached=false;$fail=static function($object)use($failId,&$failureReached){if($object->get_id()===$failId){$failureReached=true;throw new RuntimeException('Synthetic variation storage failure');}};add_action('woocommerce_before_product_object_save',$fail,PHP_INT_MAX);
 try{prReject(fn()=>ShopOperations::updateProduct($input),'Native late variation failure aborts update');}finally{remove_action('woocommerce_before_product_object_save',$fail,PHP_INT_MAX);}
 prCheck($failureReached,'Native failure occurs during later variation persistence');
 foreach($before as$target=>$row){clean_post_cache($target);prCheck([$wpdb->get_row($wpdb->prepare("SELECT post_title,post_status FROM {$wpdb->posts} WHERE ID=%d",$target),ARRAY_A),get_post_meta($target)]===$row,'Native transaction restores product row and metadata '.$target);}
 if(ClubDocument::ready()){
  $order=wc_create_order(['status'=>'pending']);if(is_wp_error($order))throw new RuntimeException('Fixture order failed');$orderIds[]=$order->get_id();$order->set_created_via($prefix);$order->set_currency('CHF');$order->set_payment_method(ShopInvoice::GATEWAY);$order->set_billing_first_name('Synthetic');$order->set_billing_last_name('Acceptance');$order->set_billing_address_1('Teststrasse 1');$order->set_billing_postcode('8000');$order->set_billing_city('Zürich');$order->set_billing_country('CH');$order->set_billing_email($prefix.'@example.invalid');$order->set_total('25');$order->update_meta_data('_strc_invoice_number','QA-'.$order->get_id());$order->update_meta_data('_strc_invoice_reference',ClubDocument::reference('shop',98765));$order->update_meta_data('_strc_invoice_date',wp_date('Y-m-d'));$order->save();
  $pdf=ShopInvoice::pdf($order);prCheck(str_starts_with($pdf,'%PDF-')&&strlen($pdf)>1000,'Native invoice generates a QR PDF');$archive=ClubDocument::archive('shop',$order->get_id(),$pdf);$path=ClubDocument::archiveDirectory().'/'.$archive['key'];$paths[$path]=$archive['sha256'];$order->update_meta_data('_strc_invoice_pdf',$archive);$order->save();
  prCheck(ShopInvoice::state($order)['url']!==''&&ShopInvoice::pdf($order)===$pdf,'Native invoice download reuses the verified archive');
  $mailSuccess=false;$result=ShopInvoice::create($order->get_id(),true);prCheck(!$result['sent']&&$result['url']!==''&&$result['reason']!=='','Invoice send failure remains retryable with same PDF');
  $mailSuccess=true;$result=ShopInvoice::create($order->get_id(),true);$mailCount=count($captured);prCheck($result['sent']&&hash_file('sha256',$path)===$archive['sha256'],'Invoice retry succeeds without replacing archived PDF');ShopInvoice::create($order->get_id(),true);prCheck(count($captured)===$mailCount,'Already-sent native invoice is not mailed twice');
 }else $skipped[]='QR PDF generation: issuer, QR-IBAN or PDF library not configured';
}catch(Throwable $error){$failure=['message'=>$error->getMessage(),'file'=>basename($error->getFile()),'line'=>$error->getLine(),'fixtureVariants'=>$detail['variants']??[]];}
finally{
 foreach(array_reverse($orderIds)as$id){$order=wc_get_order($id);if($order&&$order->get_created_via()===$prefix)$order->delete(true);}
 foreach(array_reverse($productIds)as$id){$post=get_post($id);if($post&&($post->post_parent===($productIds[0]??0)||str_starts_with($post->post_title,$prefix)))wp_delete_post($id,true);}
 foreach($paths as$path=>$hash)if(is_file($path)){if(hash_file('sha256',$path)!==$hash)throw new RuntimeException('Unexpected fixture archive change');unlink($path);}
 wp_set_current_user($originalUser);
}
$remaining=(int)$wpdb->get_var($wpdb->prepare("SELECT COUNT(*) FROM {$wpdb->posts} WHERE post_title LIKE %s",$wpdb->esc_like($prefix).'%'));$remainingUsers=(int)$wpdb->get_var($wpdb->prepare("SELECT COUNT(*) FROM {$wpdb->users} WHERE user_login LIKE %s",$wpdb->esc_like($prefix).'%'));$clean=$remaining===0&&$remainingUsers===0&&!array_filter($orderIds,'wc_get_order')&&!array_filter(array_keys($paths),'is_file');prCheck($clean,'All synthetic users, products, orders and PDFs removed');
echo wp_json_encode(['target'=>home_url(),'checks'=>$checks,'passed'=>count(array_filter($checks,static fn($row)=>$row['passed'])),'failure'=>$failure,'skipped'=>$skipped,'realMailCount'=>0,'realExternalRequests'=>0,'syntheticDataRemoved'=>$clean])."\n";
if($failure)throw new RuntimeException('PR integration acceptance failed');

<?php
/** Synthetic candidate integration checks; real contacts, orders and role definitions remain untouched. */
if(home_url()!=='https://staging.swisstrclub.ch'||wp_get_environment_type()!=='staging')throw new RuntimeException('Staging required');
if(class_exists('SwissTRClub\\Core\\Plugin',false))throw new RuntimeException('Skip canonical plugin');
if(!defined('DOING_AJAX'))define('DOING_AJAX',true);
require rtrim(getenv('STRC_QA_PLUGIN'),'/').'/strc-core.php';
require __DIR__.'/role-overlay.php';
use SwissTRClub\Core\Roles\{RoleManager,RoleAssignments,RoleDefinitions};
use SwissTRClub\Core\Shop\{ShippingPartner,ShopOperations};
use SwissTRClub\Core\Members\{MembershipRepository,MemberLoginExperience};
use SwissTRClub\Core\Forms\FormStore;
use SwissTRClub\Core\Community\LibraryPolicy;
global$wpdb,$checks;$checks=[];$users=[];$posts=[];$orders=[];$mails=[];$acceptMail=true;$network=0;$prefix='strc_oct22_qa_'.bin2hex(random_bytes(4));
function p22_check(bool$ok,string$name):void{global$checks;$checks[]=$name;if(!$ok)throw new RuntimeException($name);}
function p22_call(object$o,string$m,...$args):mixed{return(new ReflectionMethod($o,$m))->invoke($o,...$args);}
function p22_user(int$id):void{wp_set_current_user(0);wp_set_current_user($id);}
function p22_capture(callable$f):array{ob_start();try{$v=$f();ob_end_clean();return['value'=>$v];}catch(RuntimeException$e){$body=ob_get_clean();if($e->getMessage()==='P22 stop')return json_decode($body,true)?:['denied'=>true];throw$e;}}
add_filter('wp_die_ajax_handler',static fn()=>static function(){throw new RuntimeException('P22 stop');});add_filter('wp_die_handler',static fn()=>static function(){throw new RuntimeException('P22 stop');});
add_filter('pre_wp_mail',static function($return,$attributes)use(&$mails,&$acceptMail){$mails[]=$attributes;return$acceptMail;},10,2);
add_filter('pre_http_request',static function()use(&$network){$network++;return new WP_Error('qa','External requests blocked');});
RoleManager::install();FormStore::register();(new SwissTRClub\Core\Editorial\EditorialEndpoint())->registerHooks();
foreach(['strc_event','strc_topic','strc_document','strc_ad']as$type)if(!post_type_exists($type))register_post_type($type,['public'=>false]);
if(!taxonomy_exists('strc_region'))register_taxonomy('strc_region','strc_event');
try{
 foreach(['ordinary'=>['strc_member'],'member'=>['strc_member'],'web'=>['strc_member','strc_developer'],'super'=>['strc_member','strc_superadmin'],'admin'=>['strc_member','strc_administrator'],'finance'=>['strc_member','strc_treasurer'],'regional'=>['strc_member','strc_regional_manager'],'board'=>['strc_member','strc_board_member'],'shipping'=>['strc_shipping_partner'],'shop'=>['strc_member','strc_shop_manager'],'legacy'=>['strc_member','strc_editor']]as$key=>$roles){
  $id=wp_insert_user(['user_login'=>$prefix.'_'.$key,'user_pass'=>wp_generate_password(40,true,true),'user_email'=>$prefix.'_'.$key.'@example.invalid','first_name'=>'QA','last_name'=>$key,'display_name'=>'Test '.ucfirst($key),'role'=>'']);if(is_wp_error($id))throw new RuntimeException('Fixture user failed');$users[$key]=(int)$id;foreach($roles as$role)(new WP_User($id))->add_role($role);if($key!=='shipping')(new MembershipRepository())->syncUser($id);
 }
 add_action('pre_get_users',static function($q)use(&$users){$q->set('include',array_values($users));});
 foreach(['add_user_metadata','update_user_metadata','delete_user_metadata']as$hook)add_filter($hook,static fn($value,$id)=>in_array((int)$id,$users,true)?$value:true,10,2);
 p22_user($users['web']);$opts=RoleAssignments::options();p22_check(isset($opts['strc_superadmin'],$opts['strc_developer'])&&!isset($opts['strc_administrator'],$opts['strc_registration_moderator']),'Webmaster assigns only platform tier');
 p22_check(!current_user_can('strc_manage_members')&&!current_user_can('strc_manage_finance')&&!current_user_can('strc_edit_website_content'),'Webmaster has no automatic operational powers');
 $old=[['role'=>'strc_regional_manager','regions'=>[],'libraryAccess'=>'limited','assignedEvents'=>[],'areas'=>[]]];update_user_meta($users['regional'],RoleAssignments::KEY,$old);
 $row=['role'=>'strc_superadmin','regions'=>[],'libraryAccess'=>'open','assignedEvents'=>[],'areas'=>[]];RoleAssignments::save($users['regional'],['revision'=>RoleAssignments::revision($users['regional']),'assignments'=>wp_json_encode([$row])]);
 p22_check(user_can($users['regional'],'strc_assign_admins')&&in_array('strc_regional_manager',get_userdata($users['regional'])->roles,true),'Webmaster assignment preserves existing regional function');
 $forged=['role'=>'strc_registration_moderator','regions'=>[],'libraryAccess'=>'open','assignedEvents'=>[],'areas'=>[]];$r=p22_capture(fn()=>RoleAssignments::save($users['member'],['revision'=>RoleAssignments::revision($users['member']),'assignments'=>wp_json_encode([$forged])]));p22_check(($r['success']??null)===false,'Webmaster cannot grant exclusive member management through lower-tier assignment');
 p22_user($users['super']);p22_check(isset(RoleAssignments::options()['strc_administrator'])&&!isset(RoleAssignments::options()['strc_superadmin']),'Superadmin may assign Admin but not Webmaster tier');
 p22_check(!current_user_can('strc_manage_members')&&!current_user_can('strc_manage_finance'),'Superadmin retains exclusive member and finance boundaries');
 $row['role']='strc_administrator';$result=RoleAssignments::save($users['member'],['revision'=>RoleAssignments::revision($users['member']),'assignments'=>wp_json_encode([$row])]);p22_check(user_can($users['member'],'strc_manage_content_roles'),'Superadmin assigns Admin and persistence survives reread');
 $r=p22_capture(fn()=>RoleAssignments::save($users['member'],['revision'=>'stale','assignments'=>'[]']));p22_check(($r['success']??null)===false,'Stale role revision cannot overwrite a newer assignment');
 p22_user($users['admin']);p22_check(!RoleAssignments::canEditAccount(get_userdata($users['super']))&&!RoleAssignments::canEditAccount(get_userdata($users['web'])),'Admin cannot edit higher-tier accounts');
 $row['role']='strc_board_member';RoleAssignments::save($users['finance'],['revision'=>RoleAssignments::revision($users['finance']),'assignments'=>wp_json_encode(array_merge(RoleAssignments::rows($users['finance']),[$row]))]);p22_check(user_can($users['finance'],'strc_access_board_documents')&&user_can($users['finance'],'strc_manage_finance'),'Board assignment preserves exclusive treasury function');
 p22_check(LibraryPolicy::classes()===['open','limited'],'Admin gets Regional documents without Board documents');p22_user($users['board']);p22_check(LibraryPolicy::classes()===['open','limited','restricted'],'Explicit Board role grants Board documents');p22_user($users['shipping']);p22_check(LibraryPolicy::classes()===[]&&!current_user_can('strc_access_member_area'),'Shipping partner has no member or document access');
 p22_user($users['web']);p22_check(LibraryPolicy::classes()===['open'],'Webmaster member has no Regional or Board documents by default');
 RoleManager::install();p22_check(in_array('strc_administrator',get_userdata($users['legacy'])->roles,true)&&!in_array('strc_editor',get_userdata($users['legacy'])->roles,true),'Legacy editor migration persists new Admin role');p22_check(get_user_meta($users['legacy'],'strc_role_migration_20261021_before',true)['roles']===['strc_member','strc_editor'],'Legacy migration preserves exact prior role list');
 $login=new MemberLoginExperience();p22_check($login->loginRedirect(admin_url(),'',get_userdata($users['member']))===MemberLoginExperience::dashboard(),'Member login targets club dashboard');p22_check($login->loginRedirect(admin_url(),'',get_userdata($users['web']))===admin_url(),'Technical webmaster keeps admin destination');p22_check($login->shopLoginRedirect(wc_get_checkout_url(),get_userdata($users['member']))===wc_get_checkout_url(),'Checkout destination survives shop login');
 $directory=new SwissTRClub\Core\Members\MemberDirectoryEndpoint();update_user_meta($users['member'],'strc_website_preferences',['directory'=>false]);p22_check(!p22_call($directory,'visible',$users['member']),'Directory opt-out survives new profile layout');
 $market=new SwissTRClub\Core\Marketplace\MarketplaceEndpoint();$input=['title'=>'Fixture','description'=>'Test','price'=>'100','category'=>'Fahrzeuge','condition'=>'Fahrbereit','location'=>'Bern','model'=>'TR6','year'=>'1972','mfk'=>'2025-02-30'];p22_check(is_wp_error(p22_call($market,'validateFields',$input)),'Nonexistent MFK calendar date rejected');$input['mfk']='2024-02-29';p22_check(!is_wp_error(p22_call($market,'validateFields',$input)),'Valid leap-day MFK accepted');
 $product=new WC_Product_Simple();$product->set_name($prefix.' product');$product->set_regular_price('10');$product->set_status('publish');$product->set_sku($prefix);$product->set_manage_stock(true);$product->set_stock_quantity(20);$product->save();$posts[]=$product->get_id();
 p22_user($users['shop']);ShopOperations::sortProducts(['ids'=>wp_json_encode([$product->get_id()])]);p22_check((int)get_post_field('menu_order',$product->get_id())===1,'Shop order persists on own fixture product');
 $shipping=new ShippingPartner();
 foreach(['invoice'=>'on-hold','paid'=>'processing','pickup'=>'on-hold']as$key=>$status){$o=wc_create_order(['customer_id'=>$users['member'],'status'=>'pending']);$orders[$key]=$o->get_id();$o->set_address(['first_name'=>'QA','last_name'=>'Customer','address_1'=>'Test 1','postcode'=>'3000','city'=>'Bern','country'=>'CH','email'=>$prefix.'_customer@example.invalid','phone'=>'+41790000000'],'billing');$o->add_product($product,1);$line=new WC_Order_Item_Shipping();$line->set_method_id($key==='pickup'?'local_pickup':'flat_rate');$line->set_method_title($key==='pickup'?'Abholung':'Versand');$o->add_item($line);$o->calculate_totals();$o->set_status($status);$o->save();}
 p22_check(ShippingPartner::needsShipping(wc_get_order($orders['invoice']))&&!ShippingPartner::needsShipping(wc_get_order($orders['pickup'])),'Only delivery orders enter shipping workflow');
 $pdf=ShippingPartner::pdf(wc_get_order($orders['invoice']));p22_check(str_starts_with($pdf,'%PDF-')&&strlen($pdf)>1000,'Delivery note is a real PDF');file_put_contents(getenv('STRC_QA_PDF'),$pdf);
 p22_check(ShippingPartner::partnerEmail()==='','Staging default never contacts external partner');
 $start=count($mails);$acceptMail=false;$shipping->deliveryNote($orders['invoice']);p22_check(!wc_get_order($orders['invoice'])->get_meta('_strc_delivery_note_sent'),'Failed mail does not claim successful delivery note');
 $acceptMail=true;$shipping->deliveryNote($orders['invoice']);$sent=count($mails);p22_check((bool)wc_get_order($orders['invoice'])->get_meta('_strc_delivery_note_sent')&&$sent>$start,'Delivery note retries successfully after failed transport');$shipping->deliveryNote($orders['invoice']);p22_check(count($mails)===$sent,'Repeated order hooks do not duplicate delivery note');
 p22_user($users['ordinary']);$r=p22_capture(fn()=>$shipping->confirmShipment($orders['invoice'],'FORGED'));p22_check(isset($r['denied']),'Ordinary member cannot mark other shipments');
 p22_user($users['shipping']);$shipping->registerHooks();$before=count($mails);p22_check($shipping->confirmShipment($orders['invoice'],'QA-TRACK'),'Shipping partner confirms invoice shipment');p22_check(wc_get_order($orders['invoice'])->get_status()==='on-hold','Shipping invoice does not falsely confirm payment');$after=count($mails);p22_check(!$shipping->confirmShipment($orders['invoice'],'DUPLICATE')&&count($mails)===$after,'Repeated shipment confirmation cannot duplicate customer email');
 p22_check($shipping->confirmShipment($orders['paid'])&&wc_get_order($orders['paid'])->get_status()==='completed','Paid shipment completes order');p22_check($shipping->suppressCompletedMail(true,wc_get_order($orders['paid']))===false,'Shipping email suppresses duplicate completion email');
 $notes=(array)get_user_meta($users['member'],'strc_notifications',true);p22_check(count(array_filter($notes,static fn($n)=>($n['id']??'')==='shipped-'.$orders['invoice']))===1,'Shipment produces one dashboard notification');
 p22_check(array_keys($shipping->menu(['dashboard'=>'Dashboard','orders'=>'Orders','customer-logout'=>'Logout']))===['dashboard','customer-logout'],'Partner menu exposes shipping and logout only');
 p22_check($shipping->loginRedirect(home_url(),'',get_userdata($users['shipping']))===wc_get_page_permalink('myaccount'),'Shipping login stays outside member dashboard');
 p22_check(!array_filter($mails,static fn($m)=>str_contains(wp_json_encode($m['to']??''),'brunau.ch')),'Tests never address real external shipping partner');
 p22_user($users['super']);$people=p22_call(new SwissTRClub\Core\Editorial\EditorialEndpoint(),'people');file_put_contents(dirname(getenv('STRC_QA_PDF')).'/ui-people.json',wp_json_encode(['success'=>true,'data'=>$people]));
 echo wp_json_encode(['passed'=>count($checks),'checks'=>$checks,'interceptedMails'=>count($mails),'externalRequests'=>$network]);
}finally{
 foreach($orders as$id){$o=wc_get_order($id);if($o)$o->delete(true);}foreach($posts as$id)wp_delete_post($id,true);
 require_once ABSPATH.'wp-admin/includes/user.php';foreach($users as$id){$wpdb->delete($wpdb->prefix.'strc_memberships',['user_id'=>$id]);wp_delete_user($id);}
}

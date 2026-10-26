<?php
/** Disposable staging fixtures only. Mail/HTTP intercepted; existing records never changed. */
if (!defined('WP_CLI') || !WP_CLI || wp_get_environment_type() !== 'staging') throw new RuntimeException('Staging QA only');
if (class_exists('SwissTRClub\\Core\\Plugin', false)) throw new RuntimeException('Skip canonical core');
require getenv('STRC_QA_PLUGIN').'/strc-core.php';
require __DIR__.'/role-overlay.php';
use SwissTRClub\Core\Shop\{CustomerLanguage,ShopInvoice,ShippingPartner};
use SwissTRClub\Core\Members\MembershipRepository;
use SwissTRClub\Core\Forms\FormStore;
use SwissTRClub\Core\Integrations\Fairgate\FairgateVehicleImport;
global $wpdb,$checks;
$checks=[];$users=[];$orders=[];$posts=[];$mails=[];$network=0;$prefix='strc_vehicle_mail_qa_'.bin2hex(random_bytes(4));
function vmcheck(bool $ok,string $label): void {global $checks;if(!$ok)throw new RuntimeException($label);$checks[]=$label;}
add_filter('pre_wp_mail',static function($return,$args)use(&$mails){$mails[]=$args;return true;},10,2);
add_filter('pre_http_request',static function()use(&$network){$network++;return new WP_Error('qa','Blocked');});
// Reproduce the public site's browser-locale filter without booting migrations.
add_filter('determine_locale',[SwissTRClub\Core\Plugin::class,'locale']);
$language=new CustomerLanguage();$language->registerHooks();
$emails=WC()->mailer()->get_emails();$language->emails($emails);
FormStore::register();
try {
    $switcher=$GLOBALS['wp_locale_switcher'];
    try { unset($GLOBALS['wp_locale_switcher']);$earlyLocale=SwissTRClub\Core\Plugin::locale('de_DE'); }
    finally { $GLOBALS['wp_locale_switcher']=$switcher; }
    vmcheck($earlyLocale==='de_CH','Locale filter is safe before WordPress constructs its locale switcher');
    foreach(['de','fr','romandie','bern','fallback','guest']as$name){
        $id=wp_insert_user(['user_login'=>$prefix.'_'.$name,'user_email'=>$prefix.'_'.$name.'@example.invalid','user_pass'=>wp_generate_password(40),'first_name'=>'QA','last_name'=>'Fixture','role'=>'strc_member']);
        if(is_wp_error($id))throw new RuntimeException('Fixture creation');$users[$name]=(int)$id;(new MembershipRepository())->syncUser($id);
    }
    update_user_meta($users['de'],'strc_language','de');update_user_meta($users['de'],'strc_ui_language','fr');
    update_user_meta($users['fr'],'strc_language','fr');update_user_meta($users['fr'],'strc_ui_language','de');
    update_user_meta($users['fallback'],'strc_ui_language','fr');
    foreach(['de'=>'Suisse Romande','fr'=>'Bern','romandie'=>'Suisse Romande','bern'=>'Bern']as$name=>$region)$wpdb->update($wpdb->prefix.'strc_memberships',['region'=>$region],['user_id'=>$users[$name]]);
    foreach(['de','fr','romandie','bern','fallback']as$name){
        $o=wc_create_order(['customer_id'=>$users[$name]]);$orders[]=$o->get_id();$o->set_billing_email(get_userdata($users[$name])->user_email);$o->set_billing_first_name('QA');$o->set_currency('CHF');$o->set_payment_method(ShopInvoice::GATEWAY);$o->set_total('20');$o->save();$fixtures[$name]=$o;
    }
    vmcheck(CustomerLanguage::language($fixtures['de'])==='de'&&CustomerLanguage::language($fixtures['fr'])==='fr','Official language overrides region and browser preference');
    vmcheck(CustomerLanguage::language($fixtures['romandie'])==='fr'&&CustomerLanguage::language($fixtures['bern'])==='de','Region fallback covers Romandie and German regions');
    vmcheck(CustomerLanguage::language($fixtures['fallback'])==='fr','Saved user preference is final member fallback');
    $wpdb->update($wpdb->prefix.'strc_memberships',['membership_type'=>'couple_primary','partner_user_id'=>$users['bern']],['user_id'=>$users['romandie']]);
    $wpdb->update($wpdb->prefix.'strc_memberships',['membership_type'=>'couple_partner','partner_user_id'=>$users['romandie'],'region'=>''],['user_id'=>$users['bern']]);
    vmcheck(CustomerLanguage::language($fixtures['bern'])==='fr','Co-pilot inherits verified household region when official language missing');
    foreach(['bern','romandie']as$name)$wpdb->update($wpdb->prefix.'strc_memberships',['membership_type'=>'individual','partner_user_id'=>null,'region'=>$name==='bern'?'Bern':'Suisse Romande'],['user_id'=>$users[$name]]);
    $_COOKIE['strc_language']='de';
    $baseline=get_locale();
    $admin=$emails['WC_Email_New_Order'];$admin->enabled='yes';$admin->recipient='qa-admin@example.invalid';$admin->trigger($fixtures['de']->get_id(),$fixtures['de']);$adminSubject=end($mails)['subject'];
    foreach(['WC_Email_Customer_On_Hold_Order','WC_Email_Customer_Processing_Order','WC_Email_Customer_Completed_Order','WC_Email_Customer_Invoice']as$class){
        foreach(['fr','de','romandie']as$name){
            $email=$emails[$class];$email->enabled='yes';$email->settings['subject']='';$email->settings['heading']='';
            $before=count($mails);$email->trigger($fixtures[$name]->get_id(),$fixtures[$name]);
            vmcheck(count($mails)===$before+1,$class.' '.$name.' sends one intercepted message');
            $mail=end($mails);$plain=html_entity_decode(strip_tags($mail['message']),ENT_QUOTES|ENT_HTML5,'UTF-8');
            file_put_contents(getenv('STRC_QA_OUTPUT').'/'.$class.'-'.$name.'.html',$mail['message']);
            vmcheck($mail['to']===$fixtures[$name]->get_billing_email(),'Recipient unchanged');
            if($name==='de')vmcheck((str_contains(mb_strtolower($mail['subject']),'bestell')||str_contains(mb_strtolower($mail['subject']),'rechnung'))&&str_contains(mb_strtolower($plain),'bestellung')&&!str_contains(mb_strtolower($mail['subject']),'commande'),$class.' German subject and body');
            else vmcheck((str_contains(mb_strtolower($mail['subject']),'commande')||str_contains(mb_strtolower($mail['subject']),'facture'))&&str_contains(mb_strtolower($plain),'commande')&&!str_contains(mb_strtolower($mail['subject']),'bestellung'),$class.' French subject and body');
            vmcheck(!str_contains($plain,'Thanks again!')&&!str_contains($plain,'Thanks for using'),'No cached English closing');
            vmcheck(get_locale()===$baseline,'Locale restored after '.$class.' '.$name);
        }
    }
    // Admin emails keep the store language after customer mail switched to French.
    $fixtures['de']->set_new_order_email_sent(false);$fixtures['de']->save();
    $admin->trigger($fixtures['de']->get_id(),$fixtures['de']);
    vmcheck(end($mails)['subject']===$adminSubject&&get_locale()===$baseline,'Admin notification language unchanged');
    do_action('woocommerce_checkout_create_order',$fixtures['fr']);
    vmcheck($fixtures['fr']->get_meta('_strc_customer_language')==='fr','Classic checkout snapshots member language');
    update_user_meta($users['fr'],'strc_language','de');
    vmcheck(CustomerLanguage::language($fixtures['fr'])==='fr','Order language stays stable after profile change');
    $guest=new WC_Order();$guest->set_billing_email('unregistered-qa@example.invalid');$_COOKIE['strc_language']='fr';
    do_action('woocommerce_store_api_checkout_update_order_meta',$guest);
    vmcheck($guest->get_meta('_strc_customer_language')==='fr','Store API guest checkout snapshots selected French language');
    $pdfLanguage=new ReflectionMethod(ShopInvoice::class,'language');vmcheck($pdfLanguage->invoke(null,$fixtures['fr'])==='fr','Invoice/PDF uses same order language');
    $shipping=new ReflectionMethod(ShippingPartner::class,'notifyCustomer');
    foreach(['fr','de']as$name){$before=count($mails);$shipping->invoke(null,$fixtures[$name],'QA-TRACK');vmcheck(count($mails)===$before+1,'Shipping mail intercepted');$mail=end($mails);vmcheck(str_contains($mail['subject'],$name==='fr'?'commande':'Bestellung')&&str_contains($mail['message'],$name==='fr'?'Numéro de suivi':'Sendungsnummer'),'Shipping message translated '.$name);vmcheck(get_locale()===$baseline,'Shipping locale restored');}
    // Vehicle fixtures: detail fallback, exact VIN duplicate, unknown model, foreign car,
    // placeholder-only slot, registration-only slot, and preserved existing photo metadata.
    $owner=$users['guest'];$contactId=990000000+$owner;
    $wpdb->update($wpdb->prefix.'strc_memberships',['fairgate_contact_id'=>(string)$contactId],['user_id'=>$owner]);
    $existing=FormStore::save('strc_vehicle',['model'=>'TR4','year'=>'1964','chassisNumber'=>'QAEXIST123','photos'=>[['id'=>999999,'url'=>'private-qa-photo']],'notes'=>'Keep exactly'],$owner);$posts[]=$existing;
    $original=get_post($existing,ARRAY_A);$originalMeta=get_post_meta($existing);$originalUserMeta=get_user_meta($owner);
    $slots=[];for($i=1;$i<=3;$i++)foreach(['model','details','year','exteriorColour','chassisNumber','registration']as$field)$slots[$i-1][$field]='/cars/'.($i-1).'/'.$field;
    $import=new FairgateVehicleImport($slots);
    $car=static fn($model,$details,$year,$vin)=>['model'=>$model,'details'=>$details,'year'=>$year,'exteriorColour'=>'rot','chassisNumber'=>$vin,'registration'=>''];
    $contact=['basefields'=>['contact_id'=>$contactId],'cars'=>[$car('other','Vitesse Mk2 Cabriolet','1970','QANEW12345'),$car('','','1970','QANEW12345'),$car('','','1959','TS 12345 LO')]];
    $plan=$import->plan([$contact]);vmcheck(array_column($plan,'action')===['create','matching-existing','review'],'New recognized vehicle deduplicates missing-type slot by exact chassis only');
    wp_set_current_user(1);
    $result=$import->apply([$contact],[$contactId.':1']);foreach($result as$row)if(isset($row['postId']))$posts[]=$row['postId'];
    vmcheck(count($posts)===2&&get_post($existing,ARRAY_A)===$original&&get_post_meta($existing)===$originalMeta,'Additive reviewed import preserves existing vehicle and photos');
    vmcheck(get_user_meta($owner)===$originalUserMeta,'Partial reviewed import never changes member metadata');
    vmcheck(!in_array('create',array_column($import->plan([$contact]),'action'),true),'Repeat import creates no duplicates');
    vmcheck($network===0,'No external HTTP requests');
    echo wp_json_encode(['passed'=>count($checks),'checks'=>$checks,'interceptedMails'=>count($mails),'externalRequests'=>$network]);
} finally {
    foreach($orders as$id){$o=wc_get_order($id);if($o)$o->delete(true);}
    foreach($posts as$id)wp_delete_post($id,true);
    require_once ABSPATH.'wp-admin/includes/user.php';foreach($users as$id){$wpdb->delete($wpdb->prefix.'strc_memberships',['user_id'=>$id]);wp_delete_user($id);}
    wp_set_current_user(0);
}

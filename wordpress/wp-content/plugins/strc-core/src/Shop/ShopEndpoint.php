<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Shop;

use SwissTRClub\Core\Http\AjaxRequest;

final class ShopEndpoint
{
    public function registerHooks(): void
    {
        add_action('wp_ajax_strc_shop', array($this, 'respond'));
        add_action('wp_ajax_nopriv_strc_shop', array($this, 'respond'));
        add_filter('user_has_cap', array($this, 'grantProductCapabilities'), 30, 4);
        add_filter('woocommerce_is_purchasable', array($this, 'purchasable'), 10, 2);
        add_filter('woocommerce_available_payment_gateways', array($this, 'availablePaymentGateways'));
        add_filter('woocommerce_add_to_cart_validation', array($this, 'validateAddToCart'), 10, 3);
        add_filter('woocommerce_shipping_method_add_rate_args',[$this,'shippingPrice'],10,2);
        add_filter('woocommerce_checkout_fields',[$this,'pickupField']);
        add_action('woocommerce_checkout_create_order',[$this,'savePickup'],10,2);
        add_filter('woocommerce_payment_gateways',static function(array $gateways):array{if(class_exists('WC_Payment_Gateway'))$gateways[]=InvoiceGateway::class;return $gateways;});
        add_action('woocommerce_order_status_on-hold',array($this,'notifyShopManagers'),20);
        add_action('woocommerce_checkout_process', array($this, 'validateCheckout'));
        add_filter('woocommerce_package_rates',function(array $rates):array{if(!$this->pickupEvents())foreach($rates as $key=>$rate)if($rate->get_method_id()==='local_pickup')unset($rates[$key]);return $rates;});
        add_action('admin_init',static function():void{if(!wp_doing_ajax()&&($_GET['page']??'')==='wc-settings'&&!current_user_can('manage_options'))wp_die('Technische Shop-Einstellungen verwaltet der Webmaster.',403);});
        add_filter('rest_pre_dispatch',static function($response,$server,$request){if(!current_user_can('manage_options')&&preg_match('~^/(?:wc/v[123]/(?:settings|payment_gateways)|wc-admin/(?:settings|options)|wc-analytics/settings)(?:/|$)~',$request->get_route()))return new \WP_Error('strc_settings','Nur Webmaster dürfen technische Shop-Einstellungen verwalten.',['status'=>403]);return $response;},10,3);
        // Sortiment überall in der von der Shop-Moderation festgelegten Reihenfolge (menu_order).
        add_filter('woocommerce_default_catalog_orderby',static fn():string=>'menu_order');
        add_action('woocommerce_payment_complete', array($this, 'notifyShopManagers'), 20);
        add_action('woocommerce_order_status_processing', array($this, 'notifyShopManagers'), 20);
        add_action('woocommerce_order_status_completed', array($this, 'notifyShopManagers'), 20);
    }

    public function respond(): void
    {
        [$operation,$input] = AjaxRequest::read('strc_shop', array('product-save','product-update','order-save','product-order','invoice-issue'));
        if(in_array($operation,['product-save','product-update','product-list','product-detail','order-save','order-options','product-order'],true)){
            if(!self::canManageShop()||!function_exists('wc_get_product'))AjaxRequest::fail('Keine Shopberechtigung.',403);
            try{wp_send_json_success(match($operation){'product-save'=>ShopOperations::saveProduct($input),'product-update'=>ShopOperations::updateProduct($input),'product-list'=>ShopOperations::productList(),'product-detail'=>ShopOperations::productDetail($input),'order-save'=>ShopOperations::order($input),'product-order'=>ShopOperations::sortProducts($input),default=>ShopOperations::choices()});}
            catch(\InvalidArgumentException $e){AjaxRequest::fail($e->getMessage(),422);}
            catch(\Throwable $e){error_log('STRC shop operation: '.$e->getMessage());AjaxRequest::fail('Vorgang konnte nicht abgeschlossen werden. Bitte Bestand und Angaben neu prüfen.',409);}
        }
        if($operation==='invoice-issue'){
            // Rechnung auf Knopfdruck erstellen bzw. erneut abrufen (Shopverwaltung und Kasse).
            if(!current_user_can('strc_access_member_area')||!(self::canManageShop()||current_user_can('strc_manage_finance'))||!function_exists('wc_get_order'))AjaxRequest::fail('Keine Berechtigung für Rechnungen.',403);
            $order=wc_get_order(absint($input['id']??0));if(!$order instanceof \WC_Order)AjaxRequest::fail('Bestellung nicht gefunden.',404);
            $result=ShopInvoice::create($order->get_id(),true);
            if($result['url']==='')AjaxRequest::fail($result['reason']?:'Rechnung konnte nicht erstellt werden.',422);
            wp_send_json_success($result+['message'=>'Rechnung '.$result['number'].($result['sent']?' erstellt und vom Maildienst angenommen.':' erstellt. '.$result['reason'])]);
        }
        if($operation==='reports')$this->reports($input);
        if ('config' !== $operation) AjaxRequest::fail('Unbekannte Shop-Anfrage.', 400);

        $shopId = (int) get_option('woocommerce_shop_page_id');
        $shopUrl = function_exists('wc_get_page_permalink') && $shopId && 'publish' === get_post_status($shopId)
            ? (string) wc_get_page_permalink('shop') : '';
        $isMember = current_user_can('strc_access_member_area');
        $canManage = self::canManageShop();
        wp_send_json_success(array(
            'storeReady' => '' !== $shopUrl && function_exists('wc_get_product'),
            'shopUrl' => $shopUrl,'cartUrl'=>function_exists('wc_get_cart_url')?wc_get_cart_url():'',
            'isMember' => $isMember,
            'canManage' => $canManage,'canInspect'=>self::canInspect(),
            'productEditorUrl' => $canManage && post_type_exists('product') ? admin_url('post-new.php?post_type=product') : '',
            'loginUrl' => wp_login_url(home_url('/#tr-shop')),
            'zahlsReady' => self::zahlsReady(),'checkoutReady'=>self::invoiceReady()||self::zahlsReady(),'nonce'=>$canManage?wp_create_nonce('strc_shop'):null,'ordersUrl'=>$canManage?admin_url('admin.php?page=wc-orders'):'','myOrdersUrl'=>function_exists('wc_get_account_endpoint_url')?wc_get_account_endpoint_url('orders'):'',
        ));
    }

    public function grantProductCapabilities(array $allcaps, array $caps, array $args, \WP_User $user): array
    {
        $canManage = ShopAccessPolicy::canManage(
            ! empty($allcaps['manage_options']),
            ! empty($allcaps['strc_manage_content_roles']) || (! empty($allcaps['strc_access_member_area']) && ! empty($allcaps['strc_manage_shop'])),
            ! empty($allcaps['strc_access_member_area']),
            ! empty($allcaps['strc_moderate']),
            \SwissTRClub\Core\Roles\RoleAssignments::areas((int)$user->ID)
        );
        if(!empty($allcaps['strc_access_member_area'])&&!empty($allcaps['strc_manage_finance']))$allcaps['view_woocommerce_reports']=true;
        return ShopAccessPolicy::withProductCapabilities($allcaps, $canManage);
    }

    public function purchasable(bool $purchasable, mixed $product): bool
    {
        return $purchasable && ShopAccessPolicy::canPurchase(
            current_user_can('strc_access_member_area'),
            self::zahlsReady(),self::invoiceReady()
        );
    }

    public function availablePaymentGateways(array $gateways): array
    {
        $online=self::zahlsReady();
        return array_filter($gateways,static fn($gateway):bool=>$gateway->id==='strc_invoice'||($online&&str_contains(strtolower((string)$gateway->id),'zahls')));
    }

    public function validateAddToCart(bool $passed, int $productId, int $quantity): bool
    {
        if (! $passed) return false;
        if (! self::zahlsReady()&&!self::invoiceReady()) {
            wc_add_notice('Der Online-Checkout wird eingerichtet. Bestellungen sind momentan noch nicht möglich.', 'error');
            return false;
        }
        return true;
    }

    public function validateCheckout(): void
    {
        $methods=WC()->session?WC()->session->get('chosen_shipping_methods',[]):[];
        if(array_filter($methods,static fn($method)=>str_starts_with($method,'local_pickup:'))){$event=absint($_POST['strc_pickup_event']??0);if(!$event||get_post_type($event)!=='strc_event'||get_post_status($event)!=='publish'||strtotime((string)get_post_meta($event,'strc_start_at',true))<time())wc_add_notice('Bitte eine kommende Veranstaltung für die Abholung wählen.','error');}
        if (! self::zahlsReady()&&!self::invoiceReady()) wc_add_notice('Die Zahlungsarten sind momentan nicht verfügbar.', 'error');
    }

    public function shippingPrice(array $args,\WC_Shipping_Method $method): array
    {
        if($method->id==='flat_rate'&&(int)$method->instance_id===(int)get_option('strc_shop_shipping_instance')){
            $scheduled=get_option('woocommerce_flat_rate_'.$method->instance_id.'_settings',[]);
            if(current_time('Y-m-d')>='2027-01-01'&&($scheduled['cost']??'')==='10'&&get_option('strc_shop_shipping_2027_applied')!=='1'){
                $scheduled['cost']='12';update_option('woocommerce_flat_rate_'.$method->instance_id.'_settings',$scheduled);update_option('strc_shop_shipping_2027_applied','1',false);$args['cost']='12';
            }
        }
        return $args;
    }
    private static function canInspect(): bool { return (current_user_can('strc_access_member_area')&&(current_user_can('strc_manage_finance')||self::canManageShop())); }
    private function pickupEvents(): array
    {
        return array_values(array_filter(get_posts(['post_type'=>'strc_event','post_status'=>'publish','posts_per_page'=>100,'meta_key'=>'strc_start_at','orderby'=>'meta_value','order'=>'ASC']),static fn($post)=>strtotime((string)get_post_meta($post->ID,'strc_start_at',true))>=time()));
    }
    private function reports(array $input): never
    {
        if(!self::canInspect()||!function_exists('wc_get_orders'))AjaxRequest::fail('Keine Shop-Auswertungsberechtigung.',403);
        $page=max(1,absint($input['page']??1));$event=absint($input['event']??0);
        $args=['type'=>'shop_order','limit'=>50,'page'=>$page,'paginate'=>true,'orderby'=>'date','order'=>'DESC'];
        if($event)$args['meta_query']=[['key'=>'_strc_pickup_event','value'=>$event]];
        $result=wc_get_orders($args);$orders=[];
        foreach($result->orders as $order){$pickup=(int)$order->get_meta('_strc_pickup_event');$orders[]=['id'=>$order->get_id(),'number'=>$order->get_order_number(),'date'=>$order->get_date_created()?->date(DATE_ATOM),'status'=>$order->get_status(),'customer'=>trim($order->get_billing_first_name().' '.$order->get_billing_last_name()),'total'=>$order->get_total(),'currency'=>$order->get_currency(),'paymentMethod'=>$order->get_payment_method_title(),'pickupEvent'=>$pickup?get_the_title($pickup):'','shippedAt'=>(string)$order->get_meta('_strc_shipped_at'),'tracking'=>(string)$order->get_meta('_strc_tracking'),'items'=>array_values(array_map(static fn($item)=>$item->get_name().' × '.$item->get_quantity(),$order->get_items())),'invoice'=>$order->get_payment_method()===ShopInvoice::GATEWAY?(ShopInvoice::state($order)?:['number'=>'','url'=>'','sent'=>false,'reason'=>'']):null];}
        $stock=[];$products=wc_get_products(['limit'=>50,'page'=>max(1,absint($input['stockPage']??1)),'paginate'=>true,'status'=>['publish','draft','private']]);
        foreach($products->products as $product){$stock[]=['id'=>$product->get_id(),'name'=>$product->get_name(),'sku'=>$product->get_sku(),'quantity'=>$product->get_stock_quantity(),'stockStatus'=>$product->get_stock_status(),'type'=>$product->get_type()];if($product->is_type('variable'))foreach($product->get_children() as $variantId){$variant=wc_get_product($variantId);if($variant)$stock[]=['id'=>$variantId,'name'=>$variant->get_name(),'sku'=>$variant->get_sku(),'quantity'=>$variant->get_stock_quantity(),'stockStatus'=>$variant->get_stock_status(),'type'=>'variation'];}}
        $summary=null;
        if(($input['summary']??'')==='1'){
            // Abrechnung: alle Bestellungen ohne stornierte, erstattete und fehlgeschlagene.
            $summary=['count'=>0,'total'=>0.0,'paid'=>0.0,'open'=>0.0,'currency'=>function_exists('get_woocommerce_currency')?get_woocommerce_currency():'CHF','byMethod'=>[],'byPickup'=>[],'byStatus'=>[]];
            $byMethod=[];$byPickup=[];$byStatus=[];
            foreach(wc_get_orders(['limit'=>-1,'status'=>['pending','on-hold','processing','completed'],'type'=>'shop_order']) as $order){
                $amount=(float)$order->get_total();$status=$order->get_status();$summary['count']++;$summary['total']+=$amount;
                if(in_array($status,['processing','completed'],true))$summary['paid']+=$amount;else $summary['open']+=$amount;
                $method=$order->get_payment_method_title()?:'Ohne Zahlungsart';$pickup=(int)$order->get_meta('_strc_pickup_event');$place=$pickup?'Abholung: '.get_the_title($pickup):'Versand';
                $add=static function(array &$bucket,string $key,float $amount):void{$bucket[$key]['count']=($bucket[$key]['count']??0)+1;$bucket[$key]['total']=round(($bucket[$key]['total']??0)+$amount,2);};
                $add($byMethod,$method,$amount);$add($byPickup,$place,$amount);$add($byStatus,$status,$amount);
            }
            foreach($byMethod as $label=>$row)$summary['byMethod'][]=['label'=>$label]+$row;
            foreach($byPickup as $label=>$row)$summary['byPickup'][]=['label'=>$label]+$row;
            foreach($byStatus as $label=>$row)$summary['byStatus'][]=['status'=>$label]+$row;
            $summary['total']=round($summary['total'],2);$summary['paid']=round($summary['paid'],2);$summary['open']=round($summary['open'],2);
        }
        wp_send_json_success(['summary'=>$summary,'orders'=>$orders,'total'=>$result->total,'pages'=>$result->max_num_pages,'stock'=>$stock,'stockPages'=>$products->max_num_pages,'events'=>array_map(static fn($post)=>['id'=>(int)$post->ID,'title'=>$post->post_title],$this->pickupEvents())]);
    }

    public function pickupField(array $fields): array
    {
        $options=[''=>'Bitte Veranstaltung wählen'];
        foreach($this->pickupEvents() as $post)$options[$post->ID]=$post->post_title;
        $fields['order']['strc_pickup_event']=['type'=>'select','label'=>'Abholung an welcher Veranstaltung? *','options'=>$options,'required'=>false,'priority'=>50];
        return $fields;
    }
    public function savePickup(\WC_Order $order,array $data): void
    {
        $methods=WC()->session?WC()->session->get('chosen_shipping_methods',[]):[];
        if(array_filter($methods,static fn($method)=>str_starts_with($method,'local_pickup:'))){$event=absint($data['strc_pickup_event']??$_POST['strc_pickup_event']??0);$order->update_meta_data('_strc_pickup_event',$event);$order->add_order_note('Abholung: '.get_the_title($event));}
    }

    public function notifyShopManagers(int $orderId): void
    {
        if (! function_exists('wc_get_order') || ! function_exists('wc_get_product')) return;
        $order = wc_get_order($orderId);
        if (! $order || !in_array($order->get_status(),['on-hold','processing','completed'],true) || ! add_post_meta($orderId, '_strc_shop_notification_lock', time(), true)) return;

        try {
            $sent = (array) $order->get_meta('_strc_shop_notifications_sent', true);
            $recipients = array();
            foreach ($order->get_items() as $item) {
                $productId = (int) $item->get_product_id();
                $product = $productId ? get_post($productId) : null;
                $user = $product ? get_userdata((int) $product->post_author) : false;
                $recipient = $user && is_email($user->user_email) ? $user->user_email : get_option('admin_email');
                $key = sanitize_email($recipient);
                if (! $key || isset($sent[$key])) continue;
                $recipients[$key]['email'] = $recipient;
                $amount = (float) $item->get_total() + (float) $item->get_total_tax();
                $recipients[$key]['items'][] = sprintf('%s × %d — %s', $item->get_name(), $item->get_quantity(), wp_strip_all_tags(wc_price($amount, array('currency' => $order->get_currency()))));
            }

            foreach ($recipients as $key => $recipient) {
                $mail = \SwissTRClub\Core\Mail\MailTemplates::render('internal.shop_order', 'de', array('bestellnummer' => $order->get_order_number(), 'status' => $order->get_status(), 'artikel' => implode("\n", $recipient['items']), 'betrag' => wp_strip_all_tags(wc_price((float) $order->get_total(), array('currency' => $order->get_currency()))), 'kunde' => trim($order->get_billing_first_name() . ' ' . $order->get_billing_last_name()), 'email' => $order->get_billing_email(), 'lieferadresse' => self::shippingAddress($order), 'telefon' => ((method_exists($order, 'get_shipping_phone') ? $order->get_shipping_phone() : '') ?: $order->get_billing_phone() ?: 'nicht angegeben')));
                $subject = $mail['subject'];
                $body = array($mail['body']);
                if (wp_mail($recipient['email'], $subject, implode("\n", $body), array('Content-Type: text/plain; charset=UTF-8'))) {
                    $sent[$key] = current_time('mysql', true);
                    $order->update_meta_data('_strc_shop_notifications_sent', $sent);
                    $order->save();
                }
            }
        } finally {
            delete_post_meta($orderId, '_strc_shop_notification_lock');
        }
    }

    private static function shippingAddress(\WC_Order $order): string
    {
        $parts = array_filter(array(
            $order->get_shipping_first_name() . ' ' . $order->get_shipping_last_name(),
            $order->get_shipping_company(),
            $order->get_shipping_address_1(),
            $order->get_shipping_address_2(),
            trim($order->get_shipping_postcode() . ' ' . $order->get_shipping_city()),
            $order->get_shipping_country(),
        ), static fn (string $part): bool => '' !== trim($part));
        if (! $parts) {
            $parts = array_filter(array(
                $order->get_billing_first_name() . ' ' . $order->get_billing_last_name(),
                $order->get_billing_company(),
                $order->get_billing_address_1(),
                $order->get_billing_address_2(),
                trim($order->get_billing_postcode() . ' ' . $order->get_billing_city()),
                $order->get_billing_country(),
            ), static fn (string $part): bool => '' !== trim($part));
        }
        return implode(', ', $parts) ?: 'Keine Lieferadresse hinterlegt.';
    }

    private static function invoiceReady(): bool
    {
        if(!function_exists('WC')||!WC()||!WC()->payment_gateways())return false;
        foreach(WC()->payment_gateways()->payment_gateways() as $gateway)if($gateway->id==='strc_invoice'&&$gateway->enabled==='yes')return true;
        return false;
    }

    private static function zahlsReady(): bool
    {
        if (! function_exists('WC') || ! WC() || ! WC()->payment_gateways()) return false;
        $requiredMode = 'production' === wp_get_environment_type() ? 'LIVE' : 'TEST';
        if (! defined('STRC_ZAHLS_MODE') || $requiredMode !== STRC_ZAHLS_MODE) return false;
        if (! defined('STRC_ZAHLS_SHOP_ENABLED') || ! in_array(STRC_ZAHLS_SHOP_ENABLED, array(true, 1, '1'), true)) return false;
        foreach (WC()->payment_gateways()->payment_gateways() as $gateway) {
            if (! str_contains(strtolower((string) $gateway->id), 'zahls') || 'yes' !== ($gateway->enabled ?? 'no')) continue;
            $instance = method_exists($gateway, 'get_option') ? trim((string) $gateway->get_option('instance')) : '';
            $apiKey = method_exists($gateway, 'get_option') ? trim((string) $gateway->get_option('api_key')) : '';
            if ('' !== $instance && '' !== $apiKey) return true;
        }
        return false;
    }

    private static function canManageShop(): bool
    {
        // Webmaster (nur Technik) verwaltet das Sortiment nicht über die Website; WooCommerce-Admin bleibt technisch erreichbar.
        return ShopAccessPolicy::canManage(
            false,
            current_user_can('strc_manage_content_roles') || (current_user_can('strc_access_member_area') && current_user_can('strc_manage_shop')),
            current_user_can('strc_access_member_area'),
            current_user_can('strc_moderate'),
            \SwissTRClub\Core\Roles\RoleAssignments::areas(get_current_user_id())
        );
    }
}

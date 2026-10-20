<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Shop;
use SwissTRClub\Core\Http\AjaxRequest;
use SwissTRClub\Core\Forms\FormStore;

/** A small interface to normal WooCommerce products and orders. */
final class ShopOperations
{
    private static function money(string $value): string
    {
        $value=str_replace(',','.',trim($value));
        if(!preg_match('/^\d{1,6}(?:\.\d{1,2})?$/D',$value))throw new \InvalidArgumentException('Bitte einen gültigen CHF-Betrag angeben.');
        return wc_format_decimal($value,2);
    }
    private static function photo(string $field): int
    {
        if(empty($_FILES[$field]['name']))return 0;
        if(($_FILES[$field]['error']??UPLOAD_ERR_NO_FILE)!==UPLOAD_ERR_OK||($_FILES[$field]['size']??0)>20*1024*1024)throw new \InvalidArgumentException('Das Produktbild konnte nicht hochgeladen werden (maximal 20 MB).');
        $check=wp_check_filetype_and_ext($_FILES[$field]['tmp_name'],$_FILES[$field]['name'],['jpg|jpeg'=>'image/jpeg','png'=>'image/png','webp'=>'image/webp']);
        if(empty($check['type']))throw new \InvalidArgumentException('Bitte JPG, PNG oder WebP als Produktbild verwenden.');
        require_once ABSPATH.'wp-admin/includes/file.php';require_once ABSPATH.'wp-admin/includes/media.php';require_once ABSPATH.'wp-admin/includes/image.php';
        $id=media_handle_upload($field,0);
        if(is_wp_error($id))throw new \RuntimeException('Produktbild konnte nicht gespeichert werden.');
        return (int)$id;
    }
    /** Reihenfolge im Sortiment: ids als JSON-Liste in der gewünschten Reihenfolge, gespeichert als menu_order 1…n. */
    public static function sortProducts(array $input): array
    {
        $ids=json_decode((string)($input['ids']??'[]'),true);
        if(!is_array($ids)||!$ids||count($ids)>200)throw new \InvalidArgumentException('Bitte die Reihenfolge der Artikel angeben.');
        $ids=array_values(array_unique(array_map('absint',$ids)));
        foreach($ids as $id)if(!$id||get_post_type($id)!=='product')throw new \InvalidArgumentException('Unbekannter Artikel in der Reihenfolge.');
        foreach($ids as $index=>$id)if((int)get_post_field('menu_order',$id)!==$index+1)wp_update_post(['ID'=>$id,'menu_order'=>$index+1]);
        if(function_exists('wc_delete_product_transients'))wc_delete_product_transients();
        return ['message'=>'Reihenfolge gespeichert.'];
    }

    public static function saveProduct(array $input): array
    {
        return FormStore::locked('shop-products',static function()use($input):array{
            $request=$input['requestId']??wp_generate_uuid4();if(!preg_match('/^[a-f0-9-]{36}$/D',$request))throw new \InvalidArgumentException('Ungültige Artikelanfrage.');
            $requestKey='strc_product_'.hash('sha256',get_current_user_id().':'.$request);$existing=(int)get_option($requestKey);if($existing&&wc_get_product($existing))return ['id'=>$existing,'message'=>'Dieser Artikelentwurf ist bereits gespeichert.','editUrl'=>admin_url('post.php?post='.$existing.'&action=edit')];
            $title=sanitize_text_field($input['title']??'');if(!$title||mb_strlen($title)>160)throw new \InvalidArgumentException('Bitte einen Artikelnamen angeben.');
            $price=self::money($input['price']??'');$stock=$input['stock']??'0';if(!ctype_digit($stock)||(int)$stock>999999)throw new \InvalidArgumentException('Bitte einen gültigen Lagerbestand angeben.');
            $rows=json_decode($input['variants']??'[]',true);if(!is_array($rows)||!array_is_list($rows)||count($rows)>30)throw new \InvalidArgumentException('Bitte höchstens 30 gültige Varianten angeben.');
            $sizes=[];foreach($rows as &$row){if(!is_array($row)||empty($row['size'])||mb_strlen($row['size'])>50||in_array($row['size'],$sizes,true)||!ctype_digit((string)($row['stock']??''))||(int)$row['stock']>999999)throw new \InvalidArgumentException('Varianten benötigen eindeutige Grössen, Preise und Lagerbestände.');$row['size']=sanitize_text_field($row['size']);$row['price']=self::money((string)($row['price']??''));$sizes[]=$row['size'];}unset($row);
            $ids=[];$images=[];
            try{
                $image=self::photo('image');if($image)$images[]=$image;
                $product=$rows?new \WC_Product_Variable():new \WC_Product_Simple();
                $product->update_meta_data('_strc_cost_price',trim($input['cost']??'')!==''?self::money($input['cost']):'');$product->set_name($title);$product->set_description(wp_kses_post($input['description']??''));$product->set_status('draft');$product->set_image_id($image);$product->set_sku(sanitize_text_field($input['sku']??''));
                if($rows){$attribute=new \WC_Product_Attribute();$attribute->set_name('Grösse');$attribute->set_options($sizes);$attribute->set_visible(true);$attribute->set_variation(true);$product->set_attributes([$attribute]);$product->set_manage_stock(false);}else{$product->set_regular_price($price);$product->set_manage_stock(true);$product->set_stock_quantity((int)$stock);$product->set_backorders('no');}
                $id=$product->save();$ids[]=$id;wp_update_post(['ID'=>$id,'post_author'=>get_current_user_id()]);
                foreach($rows as $index=>$row){$variant=new \WC_Product_Variation();$variant->set_parent_id($id);$variant->set_attributes([sanitize_title('Grösse')=>$row['size']]);$variant->set_regular_price($row['price']);$variant->update_meta_data('_strc_cost_price',trim($row['cost']??'')!==''?self::money((string)$row['cost']):'');$variant->set_manage_stock(true);$variant->set_stock_quantity((int)$row['stock']);$variant->set_backorders('no');$variantImage=self::photo('variant_image_'.$index);if($variantImage)$images[]=$variantImage;$variant->set_image_id($variantImage?:$image);$ids[]=$variant->save();}
                if($rows)\WC_Product_Variable::sync($id);update_option($requestKey,$id,false);
                return ['id'=>$id,'message'=>'Artikelentwurf mit Bildern und Varianten gespeichert. Veröffentlichung und weitere Pflege erfolgen in der Artikelverwaltung.','editUrl'=>admin_url('post.php?post='.$id.'&action=edit')];
            }catch(\Throwable $e){foreach(array_reverse($ids) as $id)wp_delete_post($id,true);foreach($images as $id)wp_delete_attachment($id,true);throw $e;}
        });
    }
    public static function choices(): array
    {
        $items=[];foreach(wc_get_products(['limit'=>-1,'status'=>'publish','orderby'=>'title','order'=>'ASC'])as$product){
            $choices=$product->is_type('variable')?array_filter(array_map('wc_get_product',$product->get_children())):[$product];
            foreach($choices as $choice)if($choice->is_in_stock()&&$choice->get_price()!=='')$items[]=['id'=>$choice->get_id(),'name'=>$choice->get_name(),'price'=>$choice->get_price(),'stock'=>$choice->get_stock_quantity()];
        }
        $members=[];foreach(get_users(['number'=>2000,'orderby'=>'display_name'])as$user)if(user_can($user,'strc_access_member_area'))$members[]=['id'=>(int)$user->ID,'name'=>$user->display_name,'board'=>user_can($user,'strc_access_board_documents')];
        $events=array_map(static fn($post)=>['id'=>(int)$post->ID,'title'=>$post->post_title],array_filter(get_posts(['post_type'=>'strc_event','post_status'=>'publish','posts_per_page'=>100]),static fn($post)=>strtotime((string)get_post_meta($post->ID,'strc_start_at',true))>=time()));
        return ['products'=>$items,'members'=>$members,'events'=>array_values($events)];
    }
    public static function order(array $input): array
    {
        $token=$input['requestId']??'';if(!preg_match('/^[a-f0-9-]{36}$/D',$token))throw new \InvalidArgumentException('Ungültige Bestellanfrage.');
        return FormStore::locked('shop-direct-orders',static function()use($input,$token):array{
            $key='strc_pos_'.hash('sha256',get_current_user_id().':'.$token);$existing=wc_get_order((int)get_option($key));if($existing)return ['id'=>$existing->get_id(),'message'=>'Diese Bestellung ist bereits gespeichert.','url'=>$existing->get_edit_order_url()];
            $kind=$input['kind']??'direct';if(!in_array($kind,['direct','manual','board','gift'],true))throw new \InvalidArgumentException('Bitte eine gültige Transaktionsart wählen.');
            $customer=absint($input['customerId']??0);if($customer&&!user_can($customer,'strc_access_member_area'))throw new \InvalidArgumentException('Bitte ein aktives Mitglied wählen.');
            if($kind==='board'&&(!$customer||!user_can($customer,'strc_access_board_documents')))throw new \InvalidArgumentException('Bitte einen berechtigten Empfänger für die Vorstandsabgabe wählen.');
            $reason=sanitize_text_field($input['reason']??'');if(in_array($kind,['board','gift'],true)&&!$reason)throw new \InvalidArgumentException('Bitte den Grund der Gratisabgabe angeben.');
            $method=$input['payment']??'invoice';if(!in_array($method,['invoice','cash','external'],true))throw new \InvalidArgumentException('Bitte Rechnung oder eine bereits eingegangene Zahlung wählen.');
            if($method==='external'&&!trim($input['reference']??''))throw new \InvalidArgumentException('Bitte den Beleg der externen Zahlung angeben.');
            $items=json_decode($input['items']??'[]',true);if(!is_array($items)||!array_is_list($items)||!$items||count($items)>30)throw new \InvalidArgumentException('Bitte Artikel und Mengen auswählen.');
            $selected=[];$seen=[];foreach($items as $row){if(!is_array($row))throw new \InvalidArgumentException('Ungültiger Artikel.');$id=absint($row['id']??0);$quantity=(string)($row['quantity']??'');if(!ctype_digit($quantity)||(int)$quantity<1||(int)$quantity>9999||isset($seen[$id]))throw new \InvalidArgumentException('Artikel müssen eindeutig sein und eine gültige Menge haben.');$seen[$id]=true;$product=wc_get_product($id);$parent=$product&&$product->is_type('variation')?wc_get_product($product->get_parent_id()):$product;if(!$product||!$parent||$parent->get_status()!=='publish'||$product->is_type('variable')||$product->get_price()===''||!$product->is_in_stock())throw new \InvalidArgumentException('Ein ausgewählter Artikel ist nicht verfügbar.');if($product->managing_stock()&&(!$product->has_enough_stock((int)$quantity)||$product->get_stock_quantity()-wc_get_held_stock_quantity($product)<(int)$quantity))throw new \InvalidArgumentException('Der Lagerbestand reicht für die ausgewählte Menge nicht aus.');$selected[]=[$product,(int)$quantity];}
            $fulfilment=$input['fulfilment']??'handover';if(!in_array($fulfilment,['handover','pickup','shipping'],true))throw new \InvalidArgumentException('Bitte eine gültige Übergabeart wählen.');
            $event=absint($input['eventId']??0);if($fulfilment==='pickup'&&(!$event||get_post_type($event)!=='strc_event'||get_post_status($event)!=='publish'||strtotime((string)get_post_meta($event,'strc_start_at',true))<time()))throw new \InvalidArgumentException('Bitte eine kommende Abholveranstaltung wählen.');
            $email=sanitize_email($input['email']??'');if($email&&!is_email($email))throw new \InvalidArgumentException('Bitte eine gültige E-Mail-Adresse angeben.');
            if($fulfilment==='shipping'&&(!trim($input['street']??'')||!trim($input['postcode']??'')||!trim($input['city']??'')))throw new \InvalidArgumentException('Für den Versand bitte die Lieferadresse ergänzen.');
            $free=in_array($kind,['board','gift'],true);$total=0;$regular=0;
            foreach($selected as [$product,$quantity]){$regular+=(float)$product->get_price()*$quantity;if(!$free)$total+=(float)$product->get_price()*$quantity;}
            if($fulfilment==='shipping'&&!$free)$total+=(float)self::money($input['shipping']??'');
            $review=hash_hmac('sha256',wp_json_encode([$customer,$kind,$method,$reason,$fulfilment,$event,$items,$email,$input['firstName']??'',$input['lastName']??'',$input['street']??'',$input['postcode']??'',$input['city']??'',$input['reference']??'',$total,$regular]),wp_salt('auth'));
            if(($input['preview']??'')==='1')return ['total'=>wc_format_decimal($total,2),'regular'=>wc_format_decimal($regular,2),'reviewToken'=>$review];
            if(!hash_equals($review,$input['reviewToken']??''))throw new \InvalidArgumentException('Artikel, Preis oder Angaben wurden geändert. Bitte nochmals prüfen.');
            $order=null;
            try{
                $order=wc_create_order(['customer_id'=>$customer,'created_via'=>'strc_direct']);if(is_wp_error($order))throw new \RuntimeException('Bestellung konnte nicht angelegt werden.');
                $address=['first_name'=>sanitize_text_field($input['firstName']??''),'last_name'=>sanitize_text_field($input['lastName']??''),'email'=>$email,'address_1'=>sanitize_text_field($input['street']??''),'postcode'=>sanitize_text_field($input['postcode']??''),'city'=>sanitize_text_field($input['city']??''),'country'=>'CH'];
                if($customer){$user=get_userdata($customer);$address['email']=$user->user_email;$address['first_name']=(string)get_user_meta($customer,'first_name',true);$address['last_name']=(string)get_user_meta($customer,'last_name',true);}
                $order->set_address($address,'billing');$order->set_address($address,'shipping');$order->set_currency('CHF');$free=in_array($kind,['board','gift'],true);$regular=0;$cost=0;$costKnown=true;
                foreach($selected as [$product,$quantity]){$regular+=(float)$product->get_price()*$quantity;$unitCost=$product->get_meta('_strc_cost_price');if($unitCost==='')$costKnown=false;else$cost+=(float)$unitCost*$quantity;$order->add_product($product,$quantity,$free?['subtotal'=>0,'total'=>0]:[]);}
                if($fulfilment==='shipping'){$shipping=new \WC_Order_Item_Shipping();$shipping->set_method_title('DHL · Schweiz');$shipping->set_method_id('flat_rate');$shipping->set_total($free?'0':self::money($input['shipping']??''));$order->add_item($shipping);}
                if($fulfilment==='pickup')$order->update_meta_data('_strc_pickup_event',$event);
                $order->update_meta_data('_strc_transaction_kind',$kind);$order->update_meta_data('_strc_fulfilment',$fulfilment);$order->update_meta_data('_strc_regular_value',$regular);$order->update_meta_data('_strc_cost_value',$costKnown?$cost:'');$order->update_meta_data('_strc_pos_actor',get_current_user_id());$order->update_meta_data('_strc_reconciliation','pending');$order->update_meta_data('_strc_issue_reason',$reason);$order->update_meta_data('_strc_payment_reference',sanitize_text_field($input['reference']??''));
                $order->set_payment_method($free?'strc_complimentary':($method==='invoice'?'strc_invoice':'strc_'.$method));$order->set_payment_method_title($free?'Gratisabgabe':(['invoice'=>'Rechnung','cash'=>'Barzahlung erhalten','external'=>'Externe Zahlung bestätigt'][$method]));$order->calculate_totals();$order->save();
                wc_reserve_stock_for_order($order);
                $order->add_order_note('Erfasst durch '.wp_get_current_user()->display_name.'. '.$reason);
                $order->update_status($free||$method!=='invoice'?($fulfilment==='handover'?'completed':'processing'):'on-hold');wc_reduce_stock_levels($order->get_id());wc_release_stock_for_order($order);
                if(!$free&&$method!=='invoice'){$order->set_date_paid(time());$order->save();}
                update_option($key,$order->get_id(),false);
                return ['id'=>$order->get_id(),'message'=>'Bestellung #'.$order->get_order_number().' gespeichert; Lagerbestand aktualisiert.','url'=>$order->get_edit_order_url()];
            }catch(\Throwable $e){if($order instanceof \WC_Order){wc_maybe_increase_stock_levels($order->get_id());wc_release_stock_for_order($order);$order->delete(true);}throw $e;}
        });
    }
}

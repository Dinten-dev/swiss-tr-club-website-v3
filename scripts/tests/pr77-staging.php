<?php
/** Native shop acceptance using disposable private products; no checkout or external traffic. */
declare(strict_types=1);
use SwissTRClub\Core\Shop\ShopOperations;
use SwissTRClub\Core\Shop\ShopAvailability;
if(!defined('WP_CLI')||!WP_CLI||home_url()!=='https://staging.swisstrclub.ch'||wp_get_environment_type()!=='staging')throw new RuntimeException('Staging WP-CLI required');
if(wp_using_ext_object_cache())throw new RuntimeException('Process-local cache required');
global $checks;
$checks=[];$failure=null;$parentIds=[];$attachmentIds=[];$prefix='shopqa_'.bin2hex(random_bytes(8));$oldUser=get_current_user_id();$mailCount=0;
function shop77Check(bool $ok,string $message):void{global $checks;$checks[]=['test'=>$message,'passed'=>$ok];if(!$ok)throw new RuntimeException($message);}
function shop77Product(int $id):WC_Product{clean_post_cache($id);wc_delete_product_transients($id);$product=wc_get_product($id);if(!$product)throw new RuntimeException('Fixture product missing');return $product;}
function shop77Input(int $id):array{$detail=ShopOperations::productDetail(['id'=>$id]);return ['id'=>(string)$id,'revision'=>$detail['revision'],'title'=>$detail['title'],'titleFr'=>$detail['titleFr'],'description'=>$detail['description'],'descriptionFr'=>$detail['descriptionFr'],'status'=>'private','price'=>$detail['price'],'cost'=>$detail['cost'],'stock'=>$detail['stock'],'stockMode'=>$detail['stockMode'],'outOfStock'=>$detail['outOfStock'],'attributes'=>wp_json_encode($detail['attributes']),'combinations'=>wp_json_encode($detail['combinations'])];}
add_filter('pre_wp_mail',static function()use(&$mailCount){$mailCount++;return false;},PHP_INT_MAX);
add_filter('pre_http_request',static fn()=>new WP_Error('shop_qa','External traffic blocked'),PHP_INT_MAX);
global $wpdb;
try{
 $user=get_user_by('email','traver.dinten@outlook.com');if(!$user)throw new RuntimeException('Acceptance account missing');wp_set_current_user($user->ID);
 $product=new WC_Product_Simple();$product->set_name($prefix.' Polo');$product->set_regular_price('29');$product->set_manage_stock(true);$product->set_stock_quantity(4);$product->set_status('private');$parent=$product->save();$parentIds[]=$parent;
 $manual=wp_insert_attachment(['post_title'=>$prefix.' manual image','post_mime_type'=>'image/png','post_status'=>'inherit']);$attachmentIds[]=$manual;
 $product->set_gallery_image_ids([$manual]);$product->save();
 $attributes=[['name'=>'Farbe','values'=>['Navy','Weiss']],['name'=>'Grösse','values'=>['S','M']],['name'=>'Logo','values'=>['Ärmel','Brust']]];
 $combos=ShopOperations::combinations($attributes);$settings=array_map(static fn($values)=>['values'=>$values,'enabled'=>true,'stock'=>'3'],$combos);$settings[0]['stock']='0';$settings[1]['enabled']=false;
 $input=shop77Input($parent);$input['attributes']=wp_json_encode($attributes);$input['combinations']=wp_json_encode($settings);$input['titleFr']=$prefix.' Polo français';$input['outOfStock']='request';ShopOperations::updateProduct($input);
 $product=shop77Product($parent);$children=$product->get_children();shop77Check($product->is_type('variable')&&count($children)===8,'Native simple-to-variable conversion creates all eight combinations');
 shop77Check($product->get_gallery_image_ids()===[$manual],'Native editing preserves manually assigned gallery images');
 $detail=ShopOperations::productDetail(['id'=>$parent]);shop77Check(count($detail['combinations'])===8&&count(array_filter($detail['combinations'],static fn($row)=>!$row['enabled']))===1,'Native editor retains disabled combination and exact stock settings');
 $empty=null;$stocked=null;foreach($children as$id){$child=shop77Product($id);if($child->get_status()==='private')continue;if($child->get_stock_quantity()===0)$empty=$child;else $stocked=$child;}
 shop77Check($empty instanceof WC_Product&&$stocked instanceof WC_Product,'Native stock settings map to the intended combinations');
 shop77Check(!$empty->is_purchasable()&&!$empty->backorders_allowed(),'Native out-of-stock request combination cannot be bought or backordered');
 shop77Check(!$stocked->backorders_allowed()&&!$stocked->has_enough_stock(4),'Native request combination never sells beyond its actual stock');
 $html=wc_get_stock_html($empty);shop77Check(str_contains($html,'#kontakt')&&str_contains($html,'Anfrage senden'),'Native variation availability exposes the enquiry action');
 preg_match('/href="([^"]+)"/',$html,$match);$url=html_entity_decode($match[1]??'');parse_str((string)parse_url($url,PHP_URL_QUERY),$query);
 shop77Check(str_contains($query['anfrage']??'','Polo')&&str_contains($query['anfrage']??'','Ärmel')&&!str_contains($query['anfrage']??'','%'),'Enquiry URL round-trips names and umlauts without double encoding');
 $localeFilter=static fn()=>'fr_FR';add_filter('locale',$localeFilter,PHP_INT_MAX);
 try{shop77Check(str_starts_with($stocked->get_name(),$prefix.' Polo français'),'Native WooCommerce variation-name filter uses French parent text');shop77Check(str_contains(wc_get_stock_html($empty),'Envoyer une demande'),'Native French availability exposes translated enquiry action');}finally{remove_filter('locale',$localeFilter,PHP_INT_MAX);}
 $input=shop77Input($parent);$input['stockMode']='order';ShopOperations::updateProduct($input);$product=shop77Product($parent);
 foreach($product->get_children()as$id){$child=shop77Product($id);shop77Check(!$child->managing_stock()&&$child->get_stock_status()==='onbackorder','Native on-order combination does not track stock: '.$id);}
 $input=shop77Input($parent);$input['stockMode']='stock';$input['outOfStock']='backorder';ShopOperations::updateProduct($input);$product=shop77Product($parent);
 foreach($product->get_children()as$id){$child=shop77Product($id);if($child->get_status()==='private')continue;shop77Check($child->backorders_allowed(),'Native backorder mode allows ordering beyond stock: '.$id);}
 $idsBefore=$product->get_children();$input=shop77Input($parent);$input['attributes']=wp_json_encode([$attributes[2],$attributes[0],$attributes[1]]);$rows=json_decode($input['combinations'],true);foreach($rows as&$row)$row['values']=[$row['values'][2],$row['values'][0],$row['values'][1]];unset($row);$input['combinations']=wp_json_encode($rows);ShopOperations::updateProduct($input);
 shop77Check(shop77Product($parent)->get_children()===$idsBefore,'Native attribute reordering preserves all variation IDs');
 $valueImage=wp_insert_attachment(['post_title'=>$prefix.' value image','post_mime_type'=>'image/png','post_status'=>'inherit']);$attachmentIds[]=$valueImage;$product=shop77Product($parent);$product->update_meta_data('_strc_value_images',['Logo'=>['Ärmel'=>$valueImage]]);$product->save();
 $input=shop77Input($parent);$renamed=json_decode($input['attributes'],true);$renamed[0]['previousName']=$renamed[0]['name'];$renamed[0]['name']='Logo-Position';$input['attributes']=wp_json_encode($renamed);ShopOperations::updateProduct($input);shop77Check(shop77Product($parent)->get_children()===$idsBefore,'Native attribute label rename preserves every variation identity');shop77Check((shop77Product($parent)->get_meta('_strc_value_images')['Logo-Position']['Ärmel']??0)===$valueImage,'Native renamed attribute preserves existing value images');
 $input=shop77Input($parent);$input['attributes']='[]';$input['combinations']='[]';$input['stock']='7';ShopOperations::updateProduct($input);$product=shop77Product($parent);
 shop77Check($product->is_type('simple')&&$product->get_stock_quantity()===7,'Native variable-to-simple conversion restores simple stock management');
 foreach($idsBefore as$id)shop77Check(get_post_status($id)==='trash','Removed native variation remains recoverable: '.$id);
 shop77Check(!$product->get_children()&&$product->get_gallery_image_ids()===[$manual],'Native conversion preserves gallery and removes active child combinations');
 // An interrupted new product must leave no partial rows or successful request marker.
 $token=wp_generate_uuid4();$key='strc_product_'.hash('sha256',$user->ID.':'.$token);$reached=false;
 $fail=static function($object)use(&$reached){if($object instanceof WC_Product_Variation){$reached=true;throw new RuntimeException('Synthetic creation failure');}};add_action('woocommerce_before_product_object_save',$fail,PHP_INT_MAX);
 $thrown=false;try{ShopOperations::saveProduct(['requestId'=>$token,'title'=>$prefix.' Interrupted','price'=>'10','attributes'=>wp_json_encode($attributes),'combinations'=>'[]']);}catch(RuntimeException){$thrown=true;}finally{remove_action('woocommerce_before_product_object_save',$fail,PHP_INT_MAX);}
 shop77Check($thrown&&$reached&&!get_option($key),'Native failed creation rolls back the request marker');
 shop77Check(!(int)$wpdb->get_var($wpdb->prepare("SELECT COUNT(*) FROM {$wpdb->posts} WHERE post_title=%s",$prefix.' Interrupted')),'Native failed creation leaves no parent product');
}catch(Throwable $error){$failure=['message'=>$error->getMessage(),'line'=>$error->getLine()];}
finally{
 foreach($parentIds as$id){$post=get_post($id);if(!$post||!str_starts_with($post->post_title,$prefix))throw new RuntimeException('Unexpected fixture identity');$childIds=$wpdb->get_col($wpdb->prepare("SELECT ID FROM {$wpdb->posts} WHERE post_parent=%d AND post_type='product_variation'",$id));foreach($childIds as$child)wp_delete_post((int)$child,true);wp_delete_post($id,true);}
 foreach($attachmentIds as$id){$post=get_post($id);if($post&&str_starts_with($post->post_title,$prefix))wp_delete_attachment($id,true);}
 wp_set_current_user($oldUser);
}
$remaining=(int)$wpdb->get_var($wpdb->prepare("SELECT COUNT(*) FROM {$wpdb->posts} WHERE post_title LIKE %s",$wpdb->esc_like($prefix).'%'));
shop77Check($remaining===0,'All native shop acceptance records removed');
echo wp_json_encode(['passed'=>count(array_filter($checks,static fn($row)=>$row['passed'])),'checks'=>$checks,'failure'=>$failure,'realMailCount'=>0,'realExternalRequests'=>0,'syntheticDataRemoved'=>$remaining===0])."\n";
if($failure)throw new RuntimeException('Native shop acceptance failed');

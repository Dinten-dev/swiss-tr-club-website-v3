<?php
/** Isolated WooCommerce contract doubles. Never loads WordPress or sends mail. */
declare(strict_types=1);
namespace {if(defined('ABSPATH'))throw new \RuntimeException('Run without WordPress.');}
namespace SwissTRClub\Core\Forms {final class FormStore {public static function locked(string $key,callable $work):mixed{return $work();}}}
namespace SwissTRClub\Core\Mail {final class MailTemplates {public static function render(...$args):array{return ['subject'=>'Invoice','body'=>'Fixture'];}}}
namespace SwissTRClub\Core\Finance {
 final class ClubDocument {
  public static function archived(array $stored):string{if(empty($stored['valid']))throw new \RuntimeException('PRIVATE archive path');return '%PDF-fixture';}
  public static function eligible(int $time):bool{return true;}
  public static function ready():bool{return true;}
  public static function treasury():array{return [];}
  public static function temporaryFile(string $pdf,string $name):string{$path=__DIR__.'/strc-invoice-test-'.bin2hex(random_bytes(8)).'.pdf';file_put_contents($path,$pdf);return $path;}
 }
}
namespace SwissTRClub\Core\Shop {final class CustomerLanguage {public static function language($order):string{return 'de';}}}
namespace {
 $products=[];$checks=[];$writes=0;$failVariant=false;$concurrent=null;$mailResult=false;$mailCount=0;$failQuery='';
 function check(bool $ok,string $label):void{if(!$ok)throw new RuntimeException('FAILED: '.$label);$GLOBALS['checks'][]=$label;}
 function rejects(callable $work,string $label):void{try{$work();}catch(InvalidArgumentException|RuntimeException){check(true,$label);return;}throw new RuntimeException('FAILED (accepted): '.$label);}
 function absint(mixed $value):int{return abs((int)$value);}
 function sanitize_text_field(string $value):string{return trim(strip_tags($value));}
 function sanitize_title(string $value):string{return strtolower(str_replace('ö','o',$value));}
 function wp_kses_post(string $value):string{return $value;}
 function wc_format_decimal(mixed $value,int $precision):string{return number_format((float)$value,$precision,'.','');}
 function wp_json_encode(mixed $value):string{return json_encode($value,JSON_THROW_ON_ERROR);}
 function clean_post_cache(int $id):void{}
 function wc_delete_product_transients(int $id):void{}
 function wp_delete_attachment(int $id,bool $force):void{}
 function wc_get_product(int $id):WC_Product|false{return isset($GLOBALS['products'][$id])?unserialize(serialize($GLOBALS['products'][$id])):false;}
 function wc_get_product_id_by_sku(string $sku):int{return 0;}
 function wp_get_attachment_image_url(int $id,string $size):string{return '/image/'.$id;}
 function get_permalink(int $id):string{return '/product/'.$id;}

 class MockDatabase {public string $posts='posts';public string $postmeta='postmeta';public function query(string $sql):int|false{if($sql===$GLOBALS['failQuery'])return false;if($sql==='START TRANSACTION'){if($GLOBALS['concurrent']){$work=$GLOBALS['concurrent'];$GLOBALS['concurrent']=null;$work();}$GLOBALS['snapshot']=serialize($GLOBALS['products']);}elseif($sql==='ROLLBACK')$GLOBALS['products']=unserialize($GLOBALS['snapshot']);return 1;}}
 $wpdb=new MockDatabase();
 class WC_Product_Attribute {
  public function __construct(public string $name='Grösse',public bool $variation=true,public array $options=['S'],public bool $taxonomy=false){}
  public function get_variation():bool{return $this->variation;}public function is_taxonomy():bool{return $this->taxonomy;}public function get_name():string{return $this->name;}public function set_options(array $options):void{$this->options=$options;}
 }
 class WC_Product {
  public array $data;
  public function __construct(int $id=0,string $type='simple'){$this->data=['id'=>$id,'type'=>$type,'status'=>'publish','name'=>'Original','description'=>'','sku'=>'','regular_price'=>'10.00','stock_quantity'=>20,'manage_stock'=>true,'image_id'=>0,'attributes'=>[],'default_attributes'=>[],'meta'=>[]];}
  public function __call(string $method,array $args):mixed{if(str_starts_with($method,'get_'))return $this->data[substr($method,4)]??'';if(str_starts_with($method,'set_')){$this->data[substr($method,4)]=$args[0];return null;}throw new RuntimeException('Unknown product method '.$method);}
  public function get_data():array{return $this->data;}
  public function get_meta(string $key):mixed{return $this->data['meta'][$key]??'';}
  public function update_meta_data(string $key,mixed $value):void{$this->data['meta'][$key]=$value;}
  public function is_type(string $type):bool{return $this->data['type']===$type;}
  public function managing_stock():bool{return $this->data['manage_stock'];}
  public function get_children():array{return array_keys(array_filter($GLOBALS['products'],fn($p)=>($p->data['parent_id']??0)===$this->data['id']&&$p->data['status']!=='trash'));}
  public function save():int{if($this->is_type('variation')&&$GLOBALS['failVariant'])throw new RuntimeException('Synthetic variation failure');if(!$this->data['id'])$this->data['id']=max(array_keys($GLOBALS['products']))+1;$GLOBALS['products'][$this->data['id']]=unserialize(serialize($this));$GLOBALS['writes']++;return $this->data['id'];}
  public function delete(bool $force):bool{$this->data['status']='trash';$this->save();return true;}
 }
 class WC_Product_Variation extends WC_Product {public function __construct(int $id=0){parent::__construct($id,'variation');}}
 class WC_Product_Variable extends WC_Product {public static function sync(int $id):void{}}
 require dirname(__DIR__,2).'/wordpress/wp-content/plugins/strc-core/src/Shop/ShopOperations.php';
 use SwissTRClub\Core\Shop\ShopOperations;
 $products[1]=new WC_Product(1);$detail=ShopOperations::productDetail(['id'=>'1']);
 $input=['id'=>'1','revision'=>$detail['revision'],'title'=>'Edited','sku'=>'','status'=>'private','price'=>'12.50','stock'=>'18','cost'=>'5.00'];
 ShopOperations::updateProduct($input);check($products[1]->get_name()==='Edited'&&$products[1]->get_stock_quantity()===18&&$products[1]->get_status()==='private','Simple article saves validated values and private status');
 $before=serialize($products);rejects(fn()=>ShopOperations::updateProduct($input),'Stale edit rejected');check(serialize($products)===$before,'Rejected stale edit leaves products unchanged');
 $input['revision']=ShopOperations::productDetail(['id'=>'1'])['revision'];$input['cost']='invalid';$beforeWrites=$writes;rejects(fn()=>ShopOperations::updateProduct($input),'Invalid cost rejected before product writes');check($writes===$beforeWrites,'Invalid cost causes no partial save');$input['cost']='5';
 $concurrent=static function(){ $GLOBALS['products'][1]->data['stock_quantity']=17; };rejects(fn()=>ShopOperations::updateProduct($input),'Stock change during upload detected after row lock');check($products[1]->get_stock_quantity()===17,'Rejected edit preserves the concurrently reduced stock');
 $input['revision']=ShopOperations::productDetail(['id'=>'1'])['revision'];
 foreach(['START TRANSACTION','COMMIT'] as $query){$before=serialize($products);$failQuery=$query;rejects(fn()=>ShopOperations::updateProduct($input),'Transaction failure rejected: '.$query);$failQuery='';check(serialize($products)===$before,'Transaction failure preserves stored article: '.$query);}
 $products[2]=new WC_Product(2,'variable');$products[2]->data['manage_stock']=false;$products[2]->data['attributes']=['size'=>new WC_Product_Attribute(),'material'=>new WC_Product_Attribute('Material',false,['Cotton'])];
 $products[3]=new WC_Product_Variation(3);$products[3]->data['parent_id']=2;$products[3]->data['attributes']=['grosse'=>'S'];
 $row=['id'=>3,'size'=>'M','price'=>'15','stock'=>'10','cost'=>'7'];$detail=ShopOperations::productDetail(['id'=>'2']);$input=['id'=>'2','revision'=>$detail['revision'],'title'=>'Shirt','status'=>'publish','cost'=>'','variants'=>json_encode([$row])];
 ShopOperations::updateProduct($input);check($products[2]->get_attributes()['material']->options===['Cotton']&&$products[3]->get_attributes()===['grosse'=>'M'],'Editing sizes preserves unrelated product attributes');
 $input['revision']=ShopOperations::productDetail(['id'=>'2'])['revision'];$row['id']=3;$input['variants']=json_encode([$row,$row]);rejects(fn()=>ShopOperations::updateProduct($input),'Duplicate variation IDs rejected');
 $row2=$row;$row2['id']=0;$row2['size']='<b>M</b>';$input['variants']=json_encode([$row,$row2]);rejects(fn()=>ShopOperations::updateProduct($input),'Sizes duplicated after sanitizing rejected');
 $input['variants']=json_encode([$row]);$input['title']='Must roll back';$before=serialize($products);$failVariant=true;rejects(fn()=>ShopOperations::updateProduct($input),'Variation persistence failure rolls back article');$failVariant=false;check(serialize($products)===$before,'Article and existing variations survive rollback unchanged');
 $products[2]->data['attributes']['color']=new WC_Product_Attribute('Color',true,['Red']);rejects(fn()=>ShopOperations::productDetail(['id'=>'2']),'Multi-attribute products cannot be silently converted to size-only');
 class WC_Order {
  public array $meta=['_strc_invoice_number'=>'S-1','_strc_invoice_pdf'=>['valid'=>true]];public array $notes=[];
  public function get_meta($key):mixed{return $this->meta[$key]??'';}public function update_meta_data($key,$value):void{$this->meta[$key]=$value;}
  public function get_id():int{return 9;}public function get_payment_method():string{return 'strc_invoice';}public function get_currency():string{return 'CHF';}public function get_total():string{return '20';}public function has_status($status):bool{return is_array($status)?in_array('on-hold',$status,true):$status==='on-hold';}
  public function get_billing_email():string{return 'fixture@example.invalid';}public function get_billing_first_name():string{return 'Fixture';}public function get_order_number():string{return '9';}public function save():void{}public function add_order_note(string $note):void{$this->notes[]=$note;}
 }
 function wc_get_order(int $id):WC_Order{return $GLOBALS['order'];}
 function is_email(string $email):bool{return (bool)filter_var($email,FILTER_VALIDATE_EMAIL);}
 function wp_nonce_url(string $url,string $nonce):string{return $url;}
 function admin_url(string $path):string{return 'https://example.invalid/'.$path;}
 function wp_mail(...$args):bool{$GLOBALS['mailCount']++;return $GLOBALS['mailResult'];}
 require dirname(__DIR__,2).'/wordpress/wp-content/plugins/strc-core/src/Members/MembershipFee.php';
 require dirname(__DIR__,2).'/wordpress/wp-content/plugins/strc-core/src/Shop/ShopInvoice.php';
 use SwissTRClub\Core\Shop\ShopInvoice;
 $order=new WC_Order();$result=ShopInvoice::create(9,true);check($result['url']!==''&&!$result['sent']&&$result['reason']!==''&&$mailCount===1,'Failed invoice mail retains downloadable archived PDF and explicit failure');
 $mailResult=true;$result=ShopInvoice::create(9,true);check($result['sent']&&$mailCount===2,'Failed send can retry the same archived invoice');ShopInvoice::create(9,true);check($mailCount===2,'Already sent invoice is never resent by retry');
 unset($order->meta['_strc_invoice_pdf']);$state=ShopInvoice::state($order);check($state['url']===''&&$state['reason']!=='','Invoice number alone never advertises an unavailable PDF');
 $order->meta['_strc_invoice_pdf']=['valid'=>false];$state=ShopInvoice::state($order);check($state['url']===''&&!str_contains($state['reason'],'PRIVATE'),'Invalid archive suppresses link without exposing private paths');
 echo json_encode(['passed'=>count($checks),'checks'=>$checks],JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE)."\n";
}

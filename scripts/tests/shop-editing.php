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

 class MockDatabase {public string $posts='posts';public string $postmeta='postmeta';public function query(string $sql):int|false{if($sql===$GLOBALS['failQuery'])return false;if($sql==='START TRANSACTION'){if($GLOBALS['concurrent']){$work=$GLOBALS['concurrent'];$GLOBALS['concurrent']=null;$work();}$GLOBALS['snapshot']=serialize($GLOBALS['products']);$GLOBALS['snapshotOptions']=$GLOBALS['options'];$GLOBALS['snapshotMenu']=$GLOBALS['menuOrder'];}elseif($sql==='ROLLBACK'){$GLOBALS['products']=unserialize($GLOBALS['snapshot']);$GLOBALS['options']=$GLOBALS['snapshotOptions'];$GLOBALS['menuOrder']=$GLOBALS['snapshotMenu'];}return 1;}}
 $wpdb=new MockDatabase();
 class WC_Product_Attribute {
  public int $position=0;public bool $visible=false;
  public function __construct(public string $name='Grösse',public bool $variation=true,public array $options=['S'],public bool $taxonomy=false){}
  public function get_variation():bool{return $this->variation;}public function is_taxonomy():bool{return $this->taxonomy;}public function get_name():string{return $this->name;}public function get_options():array{return $this->options;}
  public function set_options(array $options):void{$this->options=$options;}public function set_name(string $name):void{$this->name=$name;}public function set_position(int $position):void{$this->position=$position;}public function set_visible(bool $visible):void{$this->visible=$visible;}public function set_variation(bool $variation):void{$this->variation=$variation;}
 }
 class WC_Product {
  public array $data;
  public function __construct(int $id=0,string $type='simple'){$this->data=['id'=>$id,'type'=>$type,'status'=>'publish','name'=>'Original','description'=>'','sku'=>'','regular_price'=>'10.00','stock_quantity'=>20,'manage_stock'=>true,'image_id'=>0,'gallery_image_ids'=>[],'attributes'=>[],'default_attributes'=>[],'meta'=>[]];}
  public function __call(string $method,array $args):mixed{if(str_starts_with($method,'get_'))return $this->data[substr($method,4)]??'';if(str_starts_with($method,'set_')){$this->data[substr($method,4)]=$args[0];return null;}throw new RuntimeException('Unknown product method '.$method);}
  public function get_data():array{return $this->data;}
  public function get_meta(string $key):mixed{return $this->data['meta'][$key]??'';}
  public function update_meta_data(string $key,mixed $value):void{$this->data['meta'][$key]=$value;}
  public function is_type(string $type):bool{return $this->data['type']===$type;}
  public function managing_stock():bool{return $this->data['manage_stock'];}
  public function backorders_allowed():bool{return ($this->data['backorders']??'no')!=='no';}
  public function get_children():array{return array_keys(array_filter($GLOBALS['products'],fn($p)=>($p->data['parent_id']??0)===$this->data['id']&&$p->data['status']!=='trash'));}
  public function save():int{if($this->is_type('variation')&&$GLOBALS['failVariant'])throw new RuntimeException('Synthetic variation failure');if(!$this->data['id'])$this->data['id']=max(array_keys($GLOBALS['products']))+1;$GLOBALS['products'][$this->data['id']]=unserialize(serialize($this));$GLOBALS['writes']++;return $this->data['id'];}
  public function delete(bool $force):bool{$GLOBALS['deletions'][]=['id'=>$this->data['id'],'force'=>$force];$this->data['status']='trash';$this->save();return true;}
 }
 class WC_Product_Variation extends WC_Product {public function __construct(int $id=0){parent::__construct($id,'variation');$this->data['attributes']=[];}}
 class WC_Product_Variable extends WC_Product {public function __construct(int $id=0){parent::__construct($id,'variable');if($id&&isset($GLOBALS['products'][$id])){$this->data=$GLOBALS['products'][$id]->data;$this->data['type']='variable';}}public static function sync(int $id):void{}}
 class WC_Product_Simple extends WC_Product {public function __construct(int $id=0){parent::__construct($id,'simple');if($id&&isset($GLOBALS['products'][$id])){$this->data=$GLOBALS['products'][$id]->data;$this->data['type']='simple';}}}
 class WC_Product_Factory {public static function get_product_classname(int $id,string $type):string{return $type==='variable'?WC_Product_Variable::class:WC_Product_Simple::class;}}
 function wp_set_object_terms(int $id,string $type,string $taxonomy):void{}
 $menuOrder=[];$options=[];
 function get_post_field(string $field,int $id):int{return $GLOBALS['menuOrder'][$id]??0;}
 function get_post_type(int $id):string{return isset($GLOBALS['products'][$id])?'product':'';}
 function wp_update_post(array $post):void{if(isset($post['menu_order']))$GLOBALS['menuOrder'][$post['ID']]=$post['menu_order'];}
 function wc_get_products(array $args):array{return array_values(array_filter($GLOBALS['products'],fn($p)=>in_array($p->data['type'],['simple','variable'],true)&&$p->data['status']!=='trash'));}
 function get_option(string $key):mixed{return $GLOBALS['options'][$key]??false;}
 function update_option(string $key,mixed $value,bool $autoload=false):void{$GLOBALS['options'][$key]=$value;}
 function get_current_user_id():int{return 5;}
 function wp_delete_post(int $id,bool $force):void{unset($GLOBALS['products'][$id]);}
 function get_locale():string{return $GLOBALS['locale']??'de_CH';}
 function esc_html(string $text):string{return htmlspecialchars($text,ENT_QUOTES);}
 function esc_url(string $url):string{return $url;}
 function home_url(string $path=''):string{return 'https://club.invalid'.$path;}
 function add_query_arg(array $args,string $url):string{return $url.'?'.http_build_query($args);}
 require dirname(__DIR__,2).'/wordpress/wp-content/plugins/strc-core/src/Shop/ShopOperations.php';
 use SwissTRClub\Core\Shop\ShopOperations;
 require dirname(__DIR__,2).'/wordpress/wp-content/plugins/strc-core/src/Shop/ShopAvailability.php';
 use SwissTRClub\Core\Shop\ShopAvailability;
 $products[1]=new WC_Product(1);$detail=ShopOperations::productDetail(['id'=>'1']);
 $input=['id'=>'1','revision'=>$detail['revision'],'title'=>'Edited','sku'=>'','status'=>'private','price'=>'12.50','stock'=>'18','cost'=>'5.00'];
 ShopOperations::updateProduct($input);check($products[1]->get_name()==='Edited'&&$products[1]->get_stock_quantity()===18&&$products[1]->get_status()==='private','Simple article saves validated values and private status');
 $before=serialize($products);rejects(fn()=>ShopOperations::updateProduct($input),'Stale edit rejected');check(serialize($products)===$before,'Rejected stale edit leaves products unchanged');
 $input['revision']=ShopOperations::productDetail(['id'=>'1'])['revision'];$input['cost']='invalid';$beforeWrites=$writes;rejects(fn()=>ShopOperations::updateProduct($input),'Invalid cost rejected before product writes');check($writes===$beforeWrites,'Invalid cost causes no partial save');$input['cost']='5';
 $concurrent=static function(){ $GLOBALS['products'][1]->data['stock_quantity']=17; };rejects(fn()=>ShopOperations::updateProduct($input),'Stock change during upload detected after row lock');check($products[1]->get_stock_quantity()===17,'Rejected edit preserves the concurrently reduced stock');
 $input['revision']=ShopOperations::productDetail(['id'=>'1'])['revision'];
 foreach(['START TRANSACTION','COMMIT'] as $query){$before=serialize($products);$failQuery=$query;rejects(fn()=>ShopOperations::updateProduct($input),'Transaction failure rejected: '.$query);$failQuery='';check(serialize($products)===$before,'Transaction failure preserves stored article: '.$query);}
 // Bestehender Artikel mit Grössen (alt) und einem beschreibenden Merkmal ohne Varianten.
 $products[2]=new WC_Product(2,'variable');$products[2]->data['manage_stock']=false;$products[2]->data['regular_price']='';$products[2]->data['attributes']=['grosse'=>new WC_Product_Attribute(),'material'=>new WC_Product_Attribute('Material',false,['Cotton'])];
 $products[3]=new WC_Product_Variation(3);$products[3]->data['parent_id']=2;$products[3]->data['attributes']=['grosse'=>'S'];$products[3]->data['regular_price']='15.00';
 $detail=ShopOperations::productDetail(['id'=>'2']);check($detail['attributes'][0]['name']==='Grösse'&&$detail['combinations'][0]['values']===['S']&&$detail['price']==='15.00','Existing size articles load as one attribute with their price');
 $input=['id'=>'2','revision'=>$detail['revision'],'title'=>'Shirt','status'=>'publish','price'=>'15','cost'=>'','attributes'=>json_encode([['name'=>'Grösse','values'=>['S','M']]]),'combinations'=>json_encode([['values'=>['S'],'enabled'=>true,'stock'=>'4'],['values'=>['M'],'enabled'=>true,'stock'=>'10']])];
 ShopOperations::updateProduct($input);$children=$products[2]->get_children();
 check($products[2]->get_attributes()['material']->options===['Cotton'],'Editing attributes preserves unrelated descriptive attributes');
 check(in_array(3,$children,true)&&$products[3]->get_attributes()===['grosse'=>'S']&&$products[3]->get_stock_quantity()===4&&count($children)===2,'Existing combination keeps its ID; new combination is added');
 // Polo: Farbe × Grösse × Logo, Lager pro Kombination, eine ausgeschaltet.
 $detail=ShopOperations::productDetail(['id'=>'2']);
 $attributes=[['name'=>'Farbe','values'=>['Navy','Weiss']],['name'=>'Grösse','values'=>['S','M']],['name'=>'Logo','values'=>['Ärmel','Brust']]];
 $input=['id'=>'2','revision'=>$detail['revision'],'title'=>'Polo','status'=>'publish','price'=>'29','cost'=>'12','stockMode'=>'stock','outOfStock'=>'backorder','attributes'=>json_encode($attributes),'combinations'=>json_encode([['values'=>['Weiss','M','Brust'],'enabled'=>false,'stock'=>'0'],['values'=>['Navy','S','Ärmel'],'enabled'=>true,'stock'=>'3']])];
 ShopOperations::updateProduct($input);$variations=array_map(fn($id)=>$products[$id],$products[2]->get_children());
 check(count($variations)===8,'Three attributes create every combination');
 check(!array_filter($variations,fn($v)=>$v->get_regular_price()!=='29.00'),'One price applies to all combinations');
 $off=array_values(array_filter($variations,fn($v)=>$v->get_attributes()===['farbe'=>'Weiss','grosse'=>'M','logo'=>'Brust']));check(count($off)===1&&$off[0]->get_status()==='private','Disabled combination is kept but hidden');
 $navy=array_values(array_filter($variations,fn($v)=>$v->get_attributes()===['farbe'=>'Navy','grosse'=>'S','logo'=>'Ärmel']));check($navy[0]->get_stock_quantity()===3&&$navy[0]->get_backorders()==='notify','Stock per combination with backorder setting');
 check(!isset($products[3])||$products[3]->get_status()==='trash','Combinations of removed attributes are removed');
 // Pyjama: nur auf Bestellung.
 $detail=ShopOperations::productDetail(['id'=>'2']);$input['revision']=$detail['revision'];$input['stockMode']='order';
 ShopOperations::updateProduct($input);$variations=array_map(fn($id)=>$products[$id],$products[2]->get_children());
 check(count($variations)===8&&!array_filter($variations,fn($v)=>$v->get_manage_stock()||$v->get_stock_status()!=='onbackorder'),'On-order articles keep no stock and are always orderable');
 check(ShopOperations::productDetail(['id'=>'2'])['stockMode']==='order','On-order setting is shown again when editing');
 // Auf Anfrage: sichtbar, bei Bestand 0 nicht bestellbar, nie mehr als der Bestand.
 $detail=ShopOperations::productDetail(['id'=>'2']);$input['revision']=$detail['revision'];$input['stockMode']='stock';$input['outOfStock']='request';
 ShopOperations::updateProduct($input);$availability=new ShopAvailability();$variations=array_map(fn($id)=>$products[$id],$products[2]->get_children());
 $empty=array_values(array_filter($variations,fn($v)=>$v->get_stock_quantity()===0&&$v->get_status()==='publish'))[0];$stocked=array_values(array_filter($variations,fn($v)=>$v->get_stock_quantity()===3))[0];
 check(ShopAvailability::blocked($empty)&&!$availability->purchasable(true,$empty)&&$availability->purchasable(true,$stocked),'On-request combination without stock is not purchasable');
 check(!$availability->backordersAllowed(true,0,$stocked),'On-request articles never sell beyond stock');
 check($availability->availabilityText('x',$empty)==='Auf Anfrage'&&str_contains($availability->stockHtml('',$empty),'#kontakt'),'On-request shows a contact link instead of the basket');
 $locale='fr_FR';check($availability->availabilityText('x',$empty)==='Sur demande','On-request text is French on French pages');$locale='de_CH';
 // Prüfungen vor dem Speichern.
 $detail=ShopOperations::productDetail(['id'=>'2']);$input['revision']=$detail['revision'];$beforeWrites=$writes;
 $input['attributes']=json_encode([['name'=>'Farbe','values'=>range(1,20)],['name'=>'Grösse','values'=>range(1,6)]]);rejects(fn()=>ShopOperations::updateProduct($input),'Non-text values rejected');
 $input['attributes']=json_encode([['name'=>'Farbe','values'=>array_map('strval',range(1,20))],['name'=>'Grösse','values'=>array_map('strval',range(1,6))]]);rejects(fn()=>ShopOperations::updateProduct($input),'More than 100 combinations rejected');
 $input['attributes']=json_encode([['name'=>'Farbe','values'=>['Rot','rot']]]);rejects(fn()=>ShopOperations::updateProduct($input),'Duplicate values rejected');
 $input['attributes']=json_encode([['name'=>'Farbe','values'=>['Rot']],['name'=>'farbe','values'=>['Blau']]]);rejects(fn()=>ShopOperations::updateProduct($input),'Duplicate attribute names rejected');
 $input['attributes']=json_encode([['name'=>'Farbe','values'=>['Rot']]]);$input['combinations']=json_encode([['values'=>['Rot'],'enabled'=>false,'stock'=>'0']]);rejects(fn()=>ShopOperations::updateProduct($input),'At least one combination must be offered');
 check($writes===$beforeWrites,'Rejected forms cause no writes');
 $input['combinations']='[]';$input['title']='Must roll back';$before=serialize($products);$failVariant=true;rejects(fn()=>ShopOperations::updateProduct($input),'Variation persistence failure rolls back article');$failVariant=false;check(serialize($products)===$before,'Article and existing variations survive rollback unchanged');
 // Einfacher Artikel erhält Merkmale; französischer Name nur auf der französischen Seite.
 $detail=ShopOperations::productDetail(['id'=>'1']);$input=['id'=>'1','revision'=>$detail['revision'],'title'=>'Cap','titleFr'=>'Casquette','status'=>'publish','price'=>'29','attributes'=>json_encode([['name'=>'Farbe','values'=>['Rot','Blau']]]),'combinations'=>'[]'];
 ShopOperations::updateProduct($input);check($products[1]->is_type('variable')&&count($products[1]->get_children())===2,'Simple article can receive attributes');
 check($availability->name('Cap',$products[1])==='Cap','German page keeps the German name');$locale='fr_FR';check($availability->name('Cap',$products[1])==='Casquette','French page shows the French name');$locale='de_CH';
 $products[4]=new WC_Product(4,'variable');$products[4]->data['manage_stock']=false;$products[4]->data['attributes']=['pa_color'=>new WC_Product_Attribute('pa_color',true,['Red'],true)];rejects(fn()=>ShopOperations::productDetail(['id'=>'4']),'Articles with global WooCommerce attributes stay in WooCommerce');unset($products[4]);
 // Neue Artikel kommen an die erste Stelle, die bestehende Reihenfolge bleibt.
 $menuOrder=[1=>1,2=>2];$result=ShopOperations::saveProduct(['requestId'=>'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','title'=>'Neu','price'=>'10','stock'=>'2']);
 check($menuOrder[$result['id']]<1&&$menuOrder[1]===1&&$menuOrder[2]===2&&$products[$result['id']]->get_status()==='draft','New article is placed first without reordering others');
 // Additional integration protections: malformed data never silently changes stock or identity.
 $detail=ShopOperations::productDetail(['id'=>'2']);$stable=['id'=>'2','revision'=>$detail['revision'],'title'=>'Polo','status'=>'publish','price'=>'29','stockMode'=>'stock','outOfStock'=>'request','attributes'=>json_encode($attributes),'combinations'=>json_encode($detail['combinations'])];
 foreach([
  [['values'=>['Unknown','S','Ärmel'],'enabled'=>true,'stock'=>'3']],
  [['values'=>['Navy'],'enabled'=>true,'stock'=>'3']],
  [['values'=>['Navy','S','Ärmel'],'enabled'=>'false','stock'=>'3']],
  [['values'=>['Navy','S','Ärmel'],'stock'=>'3'],['values'=>['Navy','S','Ärmel'],'stock'=>'4']],
 ]as$bad){$before=serialize($products);$invalid=$stable;$invalid['combinations']=json_encode($bad);rejects(fn()=>ShopOperations::updateProduct($invalid),'Malformed or duplicate combination is rejected');check(serialize($products)===$before,'Invalid combination never changes stored stock');}
 $products[2]->data['gallery_image_ids']=[91,92];$products[2]->data['default_attributes']=['farbe'=>'Navy'];
 $stable['revision']=ShopOperations::productDetail(['id'=>'2'])['revision'];ShopOperations::updateProduct($stable);
 check($products[2]->get_gallery_image_ids()===[91,92],'Existing manual gallery images survive editing');
 check($products[2]->get_default_attributes()===['farbe'=>'Navy'],'Valid default variation selection survives editing');
 $oldIds=$products[2]->get_children();$reordered=[$attributes[2],$attributes[0],$attributes[1]];$stable['attributes']=json_encode($reordered);
 $rows=ShopOperations::productDetail(['id'=>'2'])['combinations'];foreach($rows as&$row)$row['values']=[$row['values'][2],$row['values'][0],$row['values'][1]];unset($row);
 $stable['revision']=ShopOperations::productDetail(['id'=>'2'])['revision'];$stable['combinations']=json_encode($rows);ShopOperations::updateProduct($stable);
 check($products[2]->get_children()===$oldIds,'Reordering attributes retains every existing variation ID');
 $products[2]->data['meta']['_strc_value_images']=['Logo'=>['Ärmel'=>93]];
 $renamed=$reordered;$renamed[0]['previousName']='Logo';$renamed[0]['name']='Logo-Position';$stable['revision']=ShopOperations::productDetail(['id'=>'2'])['revision'];$stable['attributes']=json_encode($renamed);ShopOperations::updateProduct($stable);check($products[2]->get_children()===$oldIds,'Renaming an attribute label preserves existing variation IDs');check(($products[2]->get_meta('_strc_value_images')['Logo-Position']['Ärmel']??0)===93,'Renamed attributes retain their existing value images');
 $oldStocks=array_map(fn($id)=>$products[$id]->get_stock_quantity(),$oldIds);check(in_array(3,$oldStocks,true),'Reordering attributes keeps stock attached to the same combination');
 $products[2]->data['meta']['_strc_name_fr']='Polo français';$locale='fr_FR';check(str_starts_with($availability->name('German variation',$products[$oldIds[0]]),'Polo français – '),'French variation name includes translated parent and its options');$locale='de_CH';
 $detail=ShopOperations::productDetail(['id'=>'2']);$simple=['id'=>'2','revision'=>$detail['revision'],'title'=>'Polo','status'=>'publish','price'=>'29','stock'=>'7','attributes'=>'[]','combinations'=>'[]'];ShopOperations::updateProduct($simple);
 check($products[2]->is_type('simple')&&!array_filter($products[2]->get_attributes(),fn($a)=>$a->get_variation()),'Variable-to-simple conversion removes only variation attributes');
 check(isset($products[2]->get_attributes()['material'])&&$products[2]->get_gallery_image_ids()===[91,92],'Conversion preserves unrelated attributes and gallery images');
 check(!array_filter($deletions,fn($row)=>$row['force']),'Removed combinations are recoverable in the trash');
 $new=['requestId'=>'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb','title'=>'Atomic new product','price'=>'10','attributes'=>json_encode([['name'=>'Farbe','values'=>['Rot','Blau']]]),'combinations'=>'[]'];
 $before=serialize([$products,$options,$menuOrder]);$failVariant=true;rejects(fn()=>ShopOperations::saveProduct($new),'New variation failure aborts complete creation');$failVariant=false;check(serialize([$products,$options,$menuOrder])===$before,'Failed creation leaves no products, request marker or changed ordering');
 $failQuery='COMMIT';rejects(fn()=>ShopOperations::saveProduct($new),'New product commit failure is rejected');$failQuery='';check(serialize([$products,$options,$menuOrder])===$before,'Commit failure rolls back new product and its combinations');
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
 require dirname(__DIR__,2).'/wordpress/wp-content/plugins/strc-core/src/Shop/ShopInvoice.php';
 use SwissTRClub\Core\Shop\ShopInvoice;
 $order=new WC_Order();$result=ShopInvoice::create(9,true);check($result['url']!==''&&!$result['sent']&&$result['reason']!==''&&$mailCount===1,'Failed invoice mail retains downloadable archived PDF and explicit failure');
 $mailResult=true;$result=ShopInvoice::create(9,true);check($result['sent']&&$mailCount===2,'Failed send can retry the same archived invoice');ShopInvoice::create(9,true);check($mailCount===2,'Already sent invoice is never resent by retry');
 unset($order->meta['_strc_invoice_pdf']);$state=ShopInvoice::state($order);check($state['url']===''&&$state['reason']!=='','Invoice number alone never advertises an unavailable PDF');
 $order->meta['_strc_invoice_pdf']=['valid'=>false];$state=ShopInvoice::state($order);check($state['url']===''&&!str_contains($state['reason'],'PRIVATE'),'Invalid archive suppresses link without exposing private paths');
 echo json_encode(['passed'=>count($checks),'checks'=>$checks],JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE)."\n";
}

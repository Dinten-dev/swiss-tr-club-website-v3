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
    private static function cost(string $value): string
    {
        return trim($value) === '' ? '' : self::money($value);
    }
    public const MAX_ATTRIBUTES=3;
    public const MAX_VALUES=20;
    public const MAX_COMBINATIONS=100;
    private const STOCK_MODES=['stock','order'];
    private const OUT_OF_STOCK=['none','backorder','request'];

    /** Merkmale (z. B. Farbe, Grösse, Logo): höchstens drei, je bis 20 eindeutige Werte. */
    private static function attributes(string $json): array
    {
        $rows=json_decode($json,true);
        if(!is_array($rows)||!array_is_list($rows)||count($rows)>self::MAX_ATTRIBUTES)throw new \InvalidArgumentException('Bitte höchstens drei Merkmale angeben.');
        $result=[];$names=[];
        foreach($rows as $row){
            if(!is_array($row)||!is_string($row['name']??null)||!is_array($row['values']??null)||!array_is_list($row['values']))throw new \InvalidArgumentException('Bitte gültige Merkmale angeben.');
            $name=sanitize_text_field($row['name']);$slug=sanitize_title($name);
            if($name===''||mb_strlen($name)>40||$slug===''||in_array($slug,$names,true))throw new \InvalidArgumentException('Jedes Merkmal braucht einen eindeutigen Namen (z. B. Farbe, Grösse, Logo).');
            $values=[];$seen=[];
            foreach($row['values'] as $value){
                if(!is_string($value))throw new \InvalidArgumentException('Bitte gültige Werte angeben.');
                $value=sanitize_text_field($value);$key=mb_strtolower($value);
                if($value===''||mb_strlen($value)>50||str_contains($value,'|')||str_contains($value,',')||isset($seen[$key]))throw new \InvalidArgumentException('Die Werte von «'.$name.'» müssen eindeutig sein (ohne «|», höchstens 50 Zeichen).');
                $seen[$key]=true;$values[]=$value;
            }
            if(!$values||count($values)>self::MAX_VALUES)throw new \InvalidArgumentException('Das Merkmal «'.$name.'» braucht 1 bis 20 Werte.');
            $previous=$row['previousName']??'';if(!is_string($previous)||mb_strlen($previous)>40)throw new \InvalidArgumentException('Ungültige Zuordnung eines Merkmals.');
            $names[]=$slug;$result[]=['name'=>$name,'slug'=>$slug,'values'=>$values,'previousName'=>$previous];
        }
        if(self::count($result)>self::MAX_COMBINATIONS)throw new \InvalidArgumentException('Höchstens 100 Kombinationen pro Artikel. Bitte weniger Werte angeben.');
        return $result;
    }
    private static function count(array $attributes): int
    {
        return $attributes?array_product(array_map(static fn($attribute)=>count($attribute['values']),$attributes)):0;
    }
    /** Alle Kombinationen in Anzeigereihenfolge, z. B. [[Navy,S,Ärmel],[Navy,S,Brust],…]. */
    public static function combinations(array $attributes): array
    {
        $result=[[]];
        foreach($attributes as $attribute){$next=[];foreach($result as $prefix)foreach($attribute['values'] as $value)$next[]=[...$prefix,$value];$result=$next;}
        return $attributes?$result:[];
    }
    private static function comboKey(array $attributes,array $values): string
    {
        $parts=[];foreach($attributes as $index=>$attribute)$parts[$attribute['slug']]=mb_strtolower((string)($values[$index]??''));
        ksort($parts);return wp_json_encode($parts);
    }
    /** Angaben je Kombination (angeboten, Lagerbestand); fehlende Kombinationen sind angeboten mit Bestand 0. */
    private static function comboSettings(string $json,array $attributes): array
    {
        $rows=json_decode($json,true);if(!is_array($rows)||!array_is_list($rows)||count($rows)>self::MAX_COMBINATIONS)throw new \InvalidArgumentException('Bitte gültige Kombinationen angeben.');
        $settings=[];
        foreach($rows as $row){
            if(!is_array($row)||!is_array($row['values']??null)||!array_is_list($row['values'])||count($row['values'])!==count($attributes)||!is_bool($row['enabled']??true))throw new \InvalidArgumentException('Bitte gültige Kombinationen angeben.');
            foreach($attributes as $index=>$attribute)if(!is_string($row['values'][$index])||!in_array($row['values'][$index],$attribute['values'],true))throw new \InvalidArgumentException('Eine Kombination enthält unbekannte Werte.');
            $stock=(string)($row['stock']??'0');if(!ctype_digit($stock)||(int)$stock>999999)throw new \InvalidArgumentException('Bitte gültige Lagerbestände angeben.');
            $key=self::comboKey($attributes,$row['values']);if(isset($settings[$key]))throw new \InvalidArgumentException('Eine Kombination wurde doppelt angegeben.');
            $settings[$key]=['enabled'=>($row['enabled']??true),'stock'=>(int)$stock];
        }
        $result=[];
        foreach(self::combinations($attributes) as $values){$key=self::comboKey($attributes,$values);$result[$key]=['values'=>$values]+($settings[$key]??['enabled'=>true,'stock'=>0]);}
        if($result&&!array_filter($result,static fn($row)=>$row['enabled']))throw new \InvalidArgumentException('Mindestens eine Kombination muss angeboten werden.');
        return $result;
    }
    /** Alle Eingaben prüfen, bevor etwas hochgeladen oder gespeichert wird. */
    private static function form(array $input,bool $create): array
    {
        $title=sanitize_text_field($input['title']??'');if(!$title||mb_strlen($title)>160)throw new \InvalidArgumentException('Bitte einen Artikelnamen angeben.');
        $titleFr=sanitize_text_field($input['titleFr']??'');if(mb_strlen($titleFr)>160)throw new \InvalidArgumentException('Der französische Artikelname ist zu lang.');
        $description=(string)($input['description']??'');$descriptionFr=(string)($input['descriptionFr']??'');if(mb_strlen($description)>10000||mb_strlen($descriptionFr)>10000)throw new \InvalidArgumentException('Die Beschreibung ist zu lang.');
        $status=$create?'draft':(string)($input['status']??'');if(!in_array($status,['publish','draft','pending','private'],true))throw new \InvalidArgumentException('Bitte einen gültigen Status wählen.');
        $mode=(string)($input['stockMode']??'stock');$out=(string)($input['outOfStock']??'none');
        if(!in_array($mode,self::STOCK_MODES,true)||!in_array($out,self::OUT_OF_STOCK,true))throw new \InvalidArgumentException('Bitte die Lagerführung wählen.');
        $attributes=self::attributes((string)($input['attributes']??'[]'));
        $stock=(string)($input['stock']??'0');if(!$attributes&&$mode==='stock'&&(!ctype_digit($stock)||(int)$stock>999999))throw new \InvalidArgumentException('Bitte einen gültigen Lagerbestand angeben.');
        $remove=json_decode((string)($input['removeValueImages']??'[]'),true);if(!is_array($remove)||!array_is_list($remove))throw new \InvalidArgumentException('Ungültige Bildangaben.');
        $removeCombo=json_decode((string)($input['removeComboImages']??'[]'),true);if(!is_array($removeCombo)||!array_is_list($removeCombo))throw new \InvalidArgumentException('Ungültige Bildangaben.');
        return [
            'title'=>$title,'titleFr'=>$titleFr,'description'=>wp_kses_post($description),'descriptionFr'=>wp_kses_post($descriptionFr),
            'sku'=>sanitize_text_field($input['sku']??''),'status'=>$status,'price'=>self::money((string)($input['price']??'')),'cost'=>self::cost((string)($input['cost']??'')),
            'mode'=>$mode,'out'=>$mode==='order'?'none':$out,'stock'=>(int)$stock,'attributes'=>$attributes,
            'combos'=>self::comboSettings((string)($input['combinations']??'[]'),$attributes),
            'removeImage'=>($input['removeImage']??'')==='1','removeValueImages'=>array_values(array_filter($remove,'is_array')),
            'removeComboImages'=>array_values(array_filter($removeCombo,'is_array')),
        ];
    }
    /** Bilder hochladen: Produktbild und optional ein Bild pro Merkmalswert (Feld value_image_{Merkmal}_{Wert}). */
    private static function uploads(array $form): array
    {
        $images=['main'=>0,'values'=>[],'combos'=>[],'all'=>[]];
        try{
            $images['main']=self::photo('image');if($images['main'])$images['all'][]=$images['main'];
            foreach($form['attributes'] as $a=>$attribute)foreach($attribute['values'] as $v=>$value){$id=self::photo('value_image_'.$a.'_'.$v);if($id){$images['values'][$attribute['name']][$value]=$id;$images['all'][]=$id;}}
            // Kombinationsbilder: Wert eines weiteren Merkmals je Wert von Merkmal 1 (Feld combo_image_{Merkmal}_{Wert}_{Wert Merkmal 1}), z. B. Ärmel · Navy.
            $base=$form['attributes'][0]['values']??[];
            foreach($form['attributes'] as $a=>$attribute)if($a>0)foreach($attribute['values'] as $v=>$value)foreach($base as $b=>$baseValue){$id=self::photo('combo_image_'.$a.'_'.$v.'_'.$b);if($id){$images['combos'][$attribute['name']][$value][$baseValue]=$id;$images['all'][]=$id;}}
        }catch(\Throwable $e){foreach($images['all'] as $id)wp_delete_attachment($id,true);throw $e;}
        return $images;
    }
    /** Lagerführung auf einen einfachen Artikel oder eine Kombination anwenden. */
    private static function stock(\WC_Product $item,array $form,int $quantity): void
    {
        if($form['mode']==='order'){$item->set_manage_stock(false);$item->set_backorders('no');$item->set_stock_status('onbackorder');return;}
        $item->set_manage_stock(true);$item->set_stock_quantity($quantity);$item->set_backorders($form['out']==='none'?'no':'notify');
    }
    private static function retype(\WC_Product $product,string $type): \WC_Product
    {
        if($product->is_type($type))return $product;
        if($product->is_type('variable'))foreach($product->get_children() as $child){$old=wc_get_product($child);if($old&&!$old->delete(false))throw new \RuntimeException('Kombination konnte nicht entfernt werden.');}
        wp_set_object_terms($product->get_id(),$type,'product_type');
        $class=\WC_Product_Factory::get_product_classname($product->get_id(),$type);
        return new $class($product->get_id());
    }
    /** Schlüssel einer bestehenden Kombination aus ihren gespeicherten Merkmalswerten. */
    private static function childKey(array $attributes,\WC_Product $variation): string
    {
        $stored=$variation->get_attributes();$values=[];
        foreach($attributes as $attribute)$values[]=(string)($stored[sanitize_title(($attribute['previousName']??'')?:$attribute['name'])]??$stored[$attribute['slug']]??'');
        return self::comboKey($attributes,$values);
    }
    /** Gemeinsamer Schreibteil für neue und bestehende Artikel. Gibt alle berührten IDs zurück. */
    private static function write(\WC_Product $product,array $form,array $images,array &$touched): void
    {
        $product->set_name($form['title']);$product->set_description($form['description']);$product->set_sku($form['sku']);
        $product->update_meta_data('_strc_cost_price',$form['cost']);$product->update_meta_data('_strc_name_fr',$form['titleFr']);$product->update_meta_data('_strc_description_fr',$form['descriptionFr']);
        $product->update_meta_data('_strc_stock_mode',$form['mode']);$product->update_meta_data('_strc_out_of_stock',$form['out']);
        // Bilder pro Merkmalswert: bestehende behalten, neue ergänzen, entfernte löschen, Werte ohne Merkmal verwerfen.
        $valueImages=(array)$product->get_meta('_strc_value_images');$keep=[];
        foreach($form['attributes'] as $attribute)foreach($attribute['values'] as $value){$id=(int)($images['values'][$attribute['name']][$value]??($valueImages[$attribute['previousName']?:$attribute['name']][$value]??0));foreach($form['removeValueImages'] as $pair)if(($pair[0]??null)===$attribute['name']&&($pair[1]??null)===$value&&empty($images['values'][$attribute['name']][$value]))$id=0;if($id)$keep[$attribute['name']][$value]=$id;}
        $product->update_meta_data('_strc_value_images',$keep);
        // Bilder pro Kombination (weiteres Merkmal × Wert von Merkmal 1): ersetzen bei dieser Kombination das Bild des Leitmerkmals.
        $comboImages=(array)$product->get_meta('_strc_combo_images');$keepCombo=[];$base=$form['attributes'][0]['values']??[];
        foreach($form['attributes'] as $index=>$attribute){if($index===0)continue;$old=(array)($comboImages[$attribute['previousName']?:$attribute['name']]??[]);
            foreach($attribute['values'] as $value)foreach($base as $baseValue){
                $new=(int)($images['combos'][$attribute['name']][$value][$baseValue]??0);$id=$new?:(int)($old[$value][$baseValue]??0);
                if(!$new)foreach($form['removeComboImages'] as $row)if(($row[0]??null)===$attribute['name']&&($row[1]??null)===$value&&($row[2]??null)===$baseValue)$id=0;
                if($id)$keepCombo[$attribute['name']][$value][$baseValue]=$id;
            }}
        $product->update_meta_data('_strc_combo_images',$keepCombo);
        // Leitmerkmal = erstes Merkmal mit Bildern (meist Farbe): bestimmt das Bild jeder Kombination. Bilder weiterer Merkmale (z. B. Logo) kommen in die Galerie.
        $lead=null;foreach($form['attributes'] as $index=>$attribute)if(!empty($keep[$attribute['name']])){$lead=$index;break;}
        $managedImages=[];foreach($valueImages as $values)foreach((array)$values as $image)$managedImages[]=(int)$image;
        $gallery=array_values(array_diff($product->get_gallery_image_ids(),$managedImages));foreach($form['attributes'] as $index=>$attribute)if($index!==$lead)foreach($attribute['values'] as $value)if(!empty($keep[$attribute['name']][$value]))$gallery[]=$keep[$attribute['name']][$value];
        $main=$images['main']?:($form['removeImage']?0:(int)$product->get_image_id());
        if(!$main&&$lead!==null){$first=$form['attributes'][$lead];foreach($first['values'] as $value)if(!empty($keep[$first['name']][$value])){$main=$keep[$first['name']][$value];break;}}
        $product->set_image_id($main);$product->set_gallery_image_ids(array_values(array_unique($gallery)));
        if(!$form['attributes']){
            $product->set_attributes(array_filter($product->get_attributes(),static fn($attribute)=>!$attribute->get_variation()));$product->set_default_attributes([]);
            $product->set_regular_price($form['price']);self::stock($product,$form,$form['stock']);
            $product->set_status($form['status']);$saved=$product->save();if(!$saved)throw new \RuntimeException('Artikel konnte nicht gespeichert werden.');$touched[]=$saved;return;
        }
        // Load variation attributes before renaming parent attributes; WooCommerce filters them by the current parent schema.
        $existing=[];foreach($product->get_children() as $child){$variation=wc_get_product($child);if($variation&&count($variation->get_attributes())===count($form['attributes']))$existing[self::childKey($form['attributes'],$variation)]=$variation;}
        $kept=[];foreach($product->get_attributes() as $key=>$attribute)if(!$attribute->get_variation())$kept[$key]=$attribute;
        foreach($form['attributes'] as $position=>$row){$attribute=new \WC_Product_Attribute();$attribute->set_name($row['name']);$attribute->set_options($row['values']);$attribute->set_position($position);$attribute->set_visible(true);$attribute->set_variation(true);$kept[$row['slug']]=$attribute;}
        $defaults=$product->get_default_attributes();foreach($defaults as $slug=>$value){$attribute=current(array_filter($form['attributes'],static fn($row)=>$row['slug']===$slug));if(!$attribute||!in_array($value,$attribute['values'],true))unset($defaults[$slug]);}
        $product->set_attributes($kept);$product->set_default_attributes($defaults);$product->set_manage_stock(false);$product->set_status($form['status']);$id=$product->save();if(!$id)throw new \RuntimeException('Artikel konnte nicht gespeichert werden.');$touched[]=$id;
        $used=[];
        foreach($form['combos'] as $key=>$combo){
            $variation=$existing[$key]??new \WC_Product_Variation();if(!isset($existing[$key]))$variation->set_parent_id($id);
            $attributes=[];foreach($form['attributes'] as $index=>$row)$attributes[$row['slug']]=$combo['values'][$index];
            $variation->set_attributes($attributes);$variation->set_regular_price($form['price']);$variation->update_meta_data('_strc_cost_price',$form['cost']);
            self::stock($variation,$form,$combo['stock']);$variation->set_status($combo['enabled']?'publish':'private');
            $image=0;foreach($form['attributes'] as $index=>$row)if($index>0&&!empty($keepCombo[$row['name']][$combo['values'][$index]][$combo['values'][0]])){$image=(int)$keepCombo[$row['name']][$combo['values'][$index]][$combo['values'][0]];break;}
            if(!$image&&$lead!==null)$image=(int)($keep[$form['attributes'][$lead]['name']][$combo['values'][$lead]]??0);
            if($lead!==null||$keepCombo)$variation->set_image_id($image);elseif(!isset($existing[$key]))$variation->set_image_id(0);
            $saved=$variation->save();if(!$saved)throw new \RuntimeException('Kombination konnte nicht gespeichert werden.');$touched[]=$saved;$used[]=$saved;
        }
        foreach($product->get_children() as $child)if(!in_array((int)$child,$used,true)){$old=wc_get_product($child);if($old&&!$old->delete(false))throw new \RuntimeException('Kombination konnte nicht entfernt werden.');$touched[]=(int)$child;}
        \WC_Product_Variable::sync($id);
    }
    private static function editable(\WC_Product $product): void
    {
        if (!$product->is_type('variable')) return;
        $variationAttributes = array_filter($product->get_attributes(), static fn($attribute) => $attribute->get_variation());
        $global = array_filter($variationAttributes, static fn($attribute) => $attribute->is_taxonomy());
        $seen=[];foreach($product->get_children() as $child){$variation=wc_get_product($child);if(!$variation)continue;$values=$variation->get_attributes();ksort($values);$key=wp_json_encode($values);if(count($values)!==count($variationAttributes)||in_array('',array_values($values),true)||isset($seen[$key]))throw new \InvalidArgumentException('Dieser Artikel verwendet offene oder doppelte Kombinationen. Bitte in WooCommerce bearbeiten.');$seen[$key]=true;}
        if (!$variationAttributes || $global || count($variationAttributes) > self::MAX_ATTRIBUTES || $product->managing_stock()) throw new \InvalidArgumentException('Dieser Artikel verwendet globale Merkmale oder gemeinsamen Bestand. Bitte in WooCommerce bearbeiten.');
    }
    private static function attributeSources(\WC_Product $product,array $attributes): void
    {
        $existing=[];foreach($product->get_attributes() as $attribute)if($attribute->get_variation())$existing[]=$attribute->get_name();
        $seen=[];foreach($attributes as $attribute){$source=$attribute['previousName'];if($source==='')continue;if(!in_array($source,$existing,true)||in_array($source,$seen,true))throw new \InvalidArgumentException('Ein Merkmal wurde inzwischen geändert. Bitte den Artikel erneut öffnen.');$seen[]=$source;}
    }
    private static function revision(\WC_Product $product): string
    {
        $data = [$product->get_data()];
        if ($product->is_type('variable')) foreach ($product->get_children() as $id) $data[] = wc_get_product($id)?->get_data();
        return hash('sha256', wp_json_encode($data));
    }
    private static function clearProducts(array $ids): void
    {
        foreach (array_unique($ids) as $id) { clean_post_cache($id); wc_delete_product_transients($id); if(class_exists('WC_Cache_Helper'))\WC_Cache_Helper::invalidate_cache_group('product_'.$id); }
    }
    /**
     * Reihenfolge im Sortiment: ids als JSON-Liste in der gewünschten Reihenfolge, gespeichert als menu_order 1…n.
     * Nicht aufgeführte Artikel (Entwürfe, ausgeblendete) bleiben in ihrer Reihenfolge davor, damit sie nach dem
     * Veröffentlichen vorne erscheinen und von dort an ihren Platz geschoben werden können.
     */
    public static function sortProducts(array $input): array
    {
        $ids=json_decode((string)($input['ids']??'[]'),true);
        if(!is_array($ids)||!$ids||count($ids)>200)throw new \InvalidArgumentException('Bitte die Reihenfolge der Artikel angeben.');
        $ids=array_values(array_unique(array_map('absint',$ids)));
        foreach($ids as $id)if(!$id||get_post_type($id)!=='product')throw new \InvalidArgumentException('Unbekannter Artikel in der Reihenfolge.');
        $others=array_values(array_filter(array_map(static fn($product)=>$product->get_id(),wc_get_products(['limit'=>200,'status'=>['publish','draft','pending','private'],'orderby'=>'menu_order','order'=>'ASC'])),static fn($id)=>!in_array($id,$ids,true)));
        foreach($others as $index=>$id)if((int)get_post_field('menu_order',$id)!==$index-count($others))wp_update_post(['ID'=>$id,'menu_order'=>$index-count($others)]);
        foreach($ids as $index=>$id)if((int)get_post_field('menu_order',$id)!==$index+1)wp_update_post(['ID'=>$id,'menu_order'=>$index+1]);
        if(function_exists('wc_delete_product_transients'))wc_delete_product_transients();
        return ['message'=>'Reihenfolge gespeichert.'];
    }
    /** Neue Artikel kommen an die erste Stelle; die bestehende Reihenfolge bleibt unverändert. */
    private static function firstPosition(): int
    {
        $positions=array_map(static fn($product)=>(int)get_post_field('menu_order',$product->get_id()),wc_get_products(['limit'=>200,'status'=>['publish','draft','pending','private'],'orderby'=>'menu_order','order'=>'ASC']));
        return $positions?min($positions)-1:0;
    }

    public static function saveProduct(array $input): array
    {
        return FormStore::locked('shop-products',static function()use($input):array{
            $request=$input['requestId']??wp_generate_uuid4();if(!preg_match('/^[a-f0-9-]{36}$/D',$request))throw new \InvalidArgumentException('Ungültige Artikelanfrage.');
            $requestKey='strc_product_'.hash('sha256',get_current_user_id().':'.$request);$existing=(int)get_option($requestKey);if($existing&&wc_get_product($existing))return ['id'=>$existing,'message'=>'Dieser Artikelentwurf ist bereits gespeichert.','editUrl'=>''];
            $form=self::form($input,true);foreach($form['attributes'] as $attribute)if($attribute['previousName']!=='')throw new \InvalidArgumentException('Neue Artikel haben keine bisherigen Merkmale.');
            if($form['sku']!==''&&function_exists('wc_get_product_id_by_sku')&&(int)wc_get_product_id_by_sku($form['sku']))throw new \InvalidArgumentException('Diese SKU wird bereits von einem anderen Artikel verwendet.');
            global $wpdb;
            $images=self::uploads($form);$ids=[];$transaction=false;
            try{
                if($wpdb->query('START TRANSACTION')===false)throw new \RuntimeException('Artikelentwurf konnte nicht gestartet werden.');$transaction=true;
                $product=$form['attributes']?new \WC_Product_Variable():new \WC_Product_Simple();$product->set_status('draft');
                $id=$product->save();if(!$id)throw new \RuntimeException('Artikelentwurf konnte nicht gespeichert werden.');$ids[]=$id;
                wp_update_post(['ID'=>$id,'post_author'=>get_current_user_id(),'menu_order'=>self::firstPosition()]);
                self::write($product,$form,$images,$ids);
                update_option($requestKey,$id,false);
                if((int)get_option($requestKey)!==$id)throw new \RuntimeException('Artikelentwurf konnte nicht bestätigt werden.');
                if($wpdb->query('COMMIT')===false)throw new \RuntimeException('Artikelentwurf konnte nicht bestätigt werden.');$transaction=false;
                self::clearProducts($ids);
                return ['id'=>$id,'message'=>'Artikelentwurf gespeichert. Er steht in der Liste ganz vorne; unter «Bestehende Artikel» prüfen und veröffentlichen.','editUrl'=>''];
            }catch(\Throwable $e){if($transaction)$wpdb->query('ROLLBACK');self::clearProducts($ids);if(function_exists('wp_cache_delete')){wp_cache_delete($requestKey,'options');wp_cache_delete('alloptions','options');wp_cache_delete('notoptions','options');}foreach($images['all'] as $id)wp_delete_attachment($id,true);throw $e;}
        });
    }
    /** Alle Artikel (auch Entwürfe) für die Artikelpflege auf der Website. */
    public static function productList(): array
    {
        $rows=[];
        foreach(wc_get_products(['limit'=>200,'type'=>['simple','variable'],'status'=>['publish','draft','pending','private'],'orderby'=>'menu_order','order'=>'ASC'])as$product){
            $image=$product->get_image_id()?wp_get_attachment_image_url($product->get_image_id(),'thumbnail'):'';
            $order=$product->get_meta('_strc_stock_mode')==='order';
            $stock=$order?null:($product->is_type('variable')?array_sum(array_map(static fn($id)=>(int)(wc_get_product($id)?->get_stock_quantity()??0),$product->get_children())):$product->get_stock_quantity());
            $rows[]=['id'=>$product->get_id(),'name'=>$product->get_name('edit'),'status'=>$product->get_status(),'type'=>$product->get_type(),'price'=>$product->get_price(),'stock'=>$stock,'onOrder'=>$order,'combinations'=>$product->is_type('variable')?count($product->get_children()):0,'image'=>$image?:''];
        }
        return ['products'=>$rows];
    }
    private static function product(int $id): \WC_Product
    {
        $product=wc_get_product($id);
        if(!$product||!in_array($product->get_type(),['simple','variable'],true)||!in_array($product->get_status(),['publish','draft','pending','private'],true))throw new \InvalidArgumentException('Artikel nicht gefunden.');
        return $product;
    }
    public static function productDetail(array $input): array
    {
        $product=self::product(absint($input['id']??0));self::editable($product);
        $valueImages=(array)$product->get_meta('_strc_value_images');$comboImages=(array)$product->get_meta('_strc_combo_images');$attributes=[];$combinations=[];$price=$product->get_regular_price();$cost=(string)$product->get_meta('_strc_cost_price');
        if($product->is_type('variable')){
            foreach($product->get_attributes() as $attribute)if($attribute->get_variation()){$name=$attribute->get_name();$images=[];foreach($attribute->get_options() as $value)if(!empty($valueImages[$name][$value]))$images[$value]=(string)wp_get_attachment_image_url((int)$valueImages[$name][$value],'thumbnail');$combos=[];foreach((array)($comboImages[$name]??[]) as $value=>$row){$urls=[];foreach((array)$row as $baseValue=>$id)if($id)$urls[(string)$baseValue]=(string)wp_get_attachment_image_url((int)$id,'thumbnail');if($urls)$combos[(string)$value]=(object)$urls;}$attributes[]=['name'=>$name,'slug'=>sanitize_title($name),'values'=>array_values(array_map('strval',$attribute->get_options())),'images'=>(object)$images,'comboImages'=>(object)$combos];}
            foreach($product->get_children() as $childId){$variation=wc_get_product($childId);if(!$variation)continue;$stored=$variation->get_attributes();$values=[];foreach($attributes as $attribute)$values[]=(string)($stored[sanitize_title(($attribute['previousName']??'')?:$attribute['name'])]??$stored[$attribute['slug']]??'');$combinations[]=['values'=>$values,'enabled'=>$variation->get_status()!=='private','stock'=>(string)(int)$variation->get_stock_quantity()];if($price==='')$price=$variation->get_regular_price();if($cost==='')$cost=(string)$variation->get_meta('_strc_cost_price');}
            $attributes=array_map(static function(array $attribute):array{unset($attribute['slug']);return $attribute;},$attributes);
        }
        $mode=$product->get_meta('_strc_stock_mode')==='order'||(!$product->is_type('variable')&&!$product->managing_stock())?'order':'stock';$out=(string)$product->get_meta('_strc_out_of_stock');
        if($out===''&&$product->backorders_allowed())$out='backorder';
        return ['revision'=>self::revision($product),'id'=>$product->get_id(),'type'=>$product->get_type(),'status'=>$product->get_status(),'title'=>$product->get_name('edit'),'titleFr'=>(string)$product->get_meta('_strc_name_fr'),'description'=>$product->get_description('edit'),'descriptionFr'=>(string)$product->get_meta('_strc_description_fr'),'sku'=>$product->get_sku(),'price'=>(string)$price,'stock'=>$product->is_type('variable')?'':(string)(int)$product->get_stock_quantity(),'cost'=>$cost,'stockMode'=>$mode,'outOfStock'=>in_array($out,self::OUT_OF_STOCK,true)?$out:'none','image'=>$product->get_image_id()?(string)wp_get_attachment_image_url($product->get_image_id(),'medium'):'','attributes'=>$attributes,'combinations'=>$combinations,'permalink'=>$product->get_status()==='publish'?get_permalink($product->get_id()):''];
    }
    /** Bestehenden Artikel auf der Website pflegen: Texte, Preis, Merkmale, Kombinationen, Bestand, Bilder und Veröffentlichung. */
    public static function updateProduct(array $input): array
    {
        return FormStore::locked('shop-products',static function()use($input):array{
            global $wpdb;
            $product=self::product(absint($input['id']??0));self::editable($product);$id=$product->get_id();
            if($product->is_type('variable')&&!array_key_exists('attributes',$input))throw new \InvalidArgumentException('Bitte die Seite neu laden und den Artikel erneut öffnen.');
            if(!hash_equals(self::revision($product),(string)($input['revision']??'')))throw new \InvalidArgumentException('Artikel oder Bestand wurden inzwischen geändert. Bitte den aktuellen Artikel neu öffnen und vergleichen.');
            $form=self::form($input,false);self::attributeSources($product,$form['attributes']);
            if($form['sku']!==''&&function_exists('wc_get_product_id_by_sku')){$other=(int)wc_get_product_id_by_sku($form['sku']);if($other&&$other!==$id)throw new \InvalidArgumentException('Diese SKU wird bereits von einem anderen Artikel verwendet.');}
            $children=$product->is_type('variable')?array_map('intval',$product->get_children()):[];
            $touched=[$id,...$children];$transaction=false;
            // Alle Bilder zuerst speichern; ein ungültiges Bild darf keinen halb gespeicherten Artikel hinterlassen.
            $images=self::uploads($form);
            try{
                if($wpdb->query('START TRANSACTION')===false)throw new \RuntimeException('Artikeländerung konnte nicht gestartet werden.');$transaction=true;
                // WooCommerce schreibt den Bestand in dieselben Zeilen. Erst nach dem Sperren neu lesen.
                $ids=implode(',',array_map('intval',$touched));
                if($wpdb->query("SELECT ID FROM {$wpdb->posts} WHERE ID IN ($ids) ORDER BY ID FOR UPDATE")===false || $wpdb->query("SELECT meta_id FROM {$wpdb->postmeta} WHERE post_id IN ($ids) ORDER BY meta_id FOR UPDATE")===false)throw new \RuntimeException('Artikel konnte nicht gesperrt werden.');
                self::clearProducts($touched);$product=self::product($id);
                if(!hash_equals(self::revision($product),(string)($input['revision']??'')))throw new \InvalidArgumentException('Artikel oder Bestand wurden inzwischen geändert. Bitte den aktuellen Artikel neu öffnen und vergleichen.');
                $product=self::retype($product,$form['attributes']?'variable':'simple');
                self::write($product,$form,$images,$touched);
                if($wpdb->query('COMMIT')===false)throw new \RuntimeException('Artikeländerung konnte nicht bestätigt werden.');$transaction=false;self::clearProducts($touched);
                return ['id'=>$id,'message'=>$form['status']==='publish'?'Artikel gespeichert und veröffentlicht.':'Artikel gespeichert.'];
            }catch(\Throwable $e){if($transaction)$wpdb->query('ROLLBACK');self::clearProducts($touched);foreach($images['all'] as $imageId)wp_delete_attachment($imageId,true);throw $e;}
        });
    }
    public static function choices(): array
    {
        $items=[];foreach(wc_get_products(['limit'=>-1,'status'=>'publish','orderby'=>'title','order'=>'ASC'])as$product){
            $choices=$product->is_type('variable')?array_filter(array_map('wc_get_product',$product->get_children())):[$product];
            $names=[];foreach($product->get_attributes() as $slug=>$attribute)$names[$slug]=$attribute->get_name();
            foreach($choices as $choice)if($choice->get_status()!=='private'&&!ShopAvailability::blocked($choice)&&$choice->is_in_stock()&&$choice->get_price()!=='')$items[]=['id'=>$choice->get_id(),'parent'=>$product->get_id(),'name'=>$choice->get_name(),'price'=>$choice->get_price(),'stock'=>$choice->get_stock_quantity(),'attributes'=>(object)($choice->is_type('variation')?array_combine(array_map(static fn($slug)=>$names[$slug]??$slug,array_keys($choice->get_attributes())),array_values(array_map('strval',$choice->get_attributes()))):[])];
        }
        $members=[];foreach(get_users(['number'=>2000,'orderby'=>'display_name'])as$user)if(user_can($user,'strc_access_member_area'))$members[]=['id'=>(int)$user->ID,'name'=>$user->display_name,'city'=>(string)get_user_meta($user->ID,'strc_city',true),'board'=>user_can($user,'strc_access_board_documents')];
        $events=array_map(static fn($post)=>['id'=>(int)$post->ID,'title'=>$post->post_title],array_filter(get_posts(['post_type'=>'strc_event','post_status'=>'publish','posts_per_page'=>100]),static fn($post)=>strtotime((string)get_post_meta($post->ID,'strc_start_at',true))>=time()));
        return ['products'=>$items,'members'=>$members,'events'=>array_values($events),'session'=>PosSession::state(get_current_user_id()),'zahlsReady'=>ShopEndpoint::zahlsReady()];
    }
    /**
     * Direktverkauf an der Kasse, Telefonbestellung oder Geschenk (Ablauf Redaktion 3.11.2026):
     * - Direktverkauf: nur mit geöffneter Kasse, Zahlung bar oder zahls.ch (QR-Code am Stand), keine Rechnung; Versand optional gratis.
     * - Telefonbestellung: immer Rechnung; Versand oder Abholung am Anlass nach Zahlung.
     * - Geschenk: Clubzweck Vorstand, Preisvergabe oder Anderes (mit Angabe), ohne Zahlung.
     */
    public static function order(array $input): array
    {
        $token=$input['requestId']??'';if(!preg_match('/^[a-f0-9-]{36}$/D',$token))throw new \InvalidArgumentException('Ungültige Bestellanfrage.');
        return FormStore::locked('shop-direct-orders',static function()use($input,$token):array{
            $key='strc_pos_'.hash('sha256',get_current_user_id().':'.$token);$existing=wc_get_order((int)get_option($key));if($existing)return ['id'=>$existing->get_id(),'message'=>'Diese Bestellung ist bereits gespeichert.','url'=>$existing->get_edit_order_url()]+PosSession::payment($existing);
            $kind=$input['kind']??'direct';$purpose=(string)($input['purpose']??'');
            if($kind==='board'){$kind='gift';$purpose='board';}
            if(!in_array($kind,['direct','manual','gift'],true))throw new \InvalidArgumentException('Bitte eine gültige Transaktionsart wählen.');
            $session=null;if($kind==='direct'){$session=PosSession::current(get_current_user_id());if(!$session)throw new \InvalidArgumentException('Bitte zuerst die Kasse öffnen und den Verkäufer wählen.');}
            $customer=absint($input['customerId']??0);if($customer&&!user_can($customer,'strc_access_member_area'))throw new \InvalidArgumentException('Bitte ein aktives Mitglied wählen.');
            if($kind==='gift'){
                if(!in_array($purpose,['board','prize','other'],true))throw new \InvalidArgumentException('Bitte den Clubzweck des Geschenks wählen.');
                if($purpose==='board'&&(!$customer||!user_can($customer,'strc_access_board_documents')))throw new \InvalidArgumentException('Bitte ein Vorstandsmitglied als Empfänger wählen.');
            }
            $reason=sanitize_text_field($input['reason']??'');if($kind==='gift'&&$purpose==='other'&&!$reason)throw new \InvalidArgumentException('Bitte den Clubzweck angeben.');
            $purposeLabel=['board'=>'Vorstand','prize'=>'Preisvergabe','other'=>'Anderer Clubzweck'][$purpose]??'';
            $method=$kind==='manual'?'invoice':($kind==='gift'?'none':(string)($input['payment']??'cash'));
            if($kind==='direct'&&!in_array($method,['cash','zahls'],true))throw new \InvalidArgumentException('Bitte bar oder TWINT/Karte (zahls.ch) wählen.');
            $gateway='';if($method==='zahls'){$gateway=PosSession::zahlsGateway();if($gateway===''||!ShopEndpoint::zahlsReady())throw new \InvalidArgumentException('TWINT/Karte über zahls.ch ist noch nicht eingerichtet. Bitte bar kassieren.');}
            $items=json_decode($input['items']??'[]',true);if(!is_array($items)||!array_is_list($items)||!$items||count($items)>30)throw new \InvalidArgumentException('Bitte Artikel und Mengen auswählen.');
            $selected=[];$seen=[];foreach($items as $row){if(!is_array($row))throw new \InvalidArgumentException('Ungültiger Artikel.');$id=absint($row['id']??0);$quantity=(string)($row['quantity']??'');if(!ctype_digit($quantity)||(int)$quantity<1||(int)$quantity>9999||isset($seen[$id]))throw new \InvalidArgumentException('Artikel müssen eindeutig sein und eine gültige Menge haben.');$seen[$id]=true;$product=wc_get_product($id);$parent=$product&&$product->is_type('variation')?wc_get_product($product->get_parent_id()):$product;if(!$product||!$parent||$parent->get_status()!=='publish'||$product->is_type('variable')||$product->get_status()==='private'||$product->get_price()===''||!$product->is_in_stock()||ShopAvailability::blocked($product))throw new \InvalidArgumentException('Ein ausgewählter Artikel ist nicht verfügbar.');if($product->managing_stock()&&!$product->backorders_allowed()&&(!$product->has_enough_stock((int)$quantity)||$product->get_stock_quantity()-wc_get_held_stock_quantity($product)<(int)$quantity))throw new \InvalidArgumentException('Der Lagerbestand reicht für die ausgewählte Menge nicht aus.');$selected[]=[$product,(int)$quantity];}
            $fulfilment=$input['fulfilment']??'handover';if(!in_array($fulfilment,['handover','pickup','shipping'],true))throw new \InvalidArgumentException('Bitte eine gültige Übergabeart wählen.');
            if($kind==='manual'&&$fulfilment==='handover')throw new \InvalidArgumentException('Telefonbestellungen werden versendet oder an einem Anlass abgegeben.');
            $freeShipping=$fulfilment==='shipping'&&$kind==='direct'&&($input['freeShipping']??'')==='1';
            $event=absint($input['eventId']??0);if($fulfilment==='pickup'&&(!$event||get_post_type($event)!=='strc_event'||get_post_status($event)!=='publish'||strtotime((string)get_post_meta($event,'strc_start_at',true))<time()))throw new \InvalidArgumentException('Bitte eine kommende Abholveranstaltung wählen.');
            $email=sanitize_email($input['email']??'');if($email&&!is_email($email))throw new \InvalidArgumentException('Bitte eine gültige E-Mail-Adresse angeben.');
            // Adresse: Mitglied aus dem Profil (Eingaben übersteuern), Gast mit Name und Wohnort; Versand und Rechnung mit vollständiger Adresse.
            $address=['first_name'=>sanitize_text_field($input['firstName']??''),'last_name'=>sanitize_text_field($input['lastName']??''),'email'=>$email,'phone'=>sanitize_text_field($input['phone']??''),'address_1'=>sanitize_text_field($input['street']??''),'postcode'=>sanitize_text_field($input['postcode']??''),'city'=>sanitize_text_field($input['city']??''),'country'=>'CH'];
            if($customer){$member=self::memberAddress($customer);foreach($address as $field=>$value)if($value===''||in_array($field,['first_name','last_name','email'],true))$address[$field]=$member[$field]??$value;}
            if(!$customer&&$kind!=='gift'&&(!$address['first_name']||!$address['last_name']||!$address['city']))throw new \InvalidArgumentException('Bitte Vorname, Nachname und Wohnort des Gastes angeben.');
            if(($fulfilment==='shipping'||$kind==='manual')&&(!$address['address_1']||!$address['postcode']||!$address['city']))throw new \InvalidArgumentException($kind==='manual'?'Für die Rechnung bitte die vollständige Adresse angeben.':'Für den Versand bitte die Lieferadresse ergänzen.');
            if($kind==='manual'&&!is_email($address['email']))throw new \InvalidArgumentException('Für die Rechnung bitte eine E-Mail-Adresse angeben.');
            $free=$kind==='gift';$total=0;$regular=0;
            foreach($selected as [$product,$quantity]){$regular+=(float)$product->get_price()*$quantity;if(!$free)$total+=(float)$product->get_price()*$quantity;}
            $shippingCost=$fulfilment==='shipping'&&!$free&&!$freeShipping?self::money($input['shipping']??''):'0';
            $total+=(float)$shippingCost;
            $review=hash_hmac('sha256',wp_json_encode([$customer,$kind,$purpose,$method,$reason,$fulfilment,$freeShipping,$event,$items,$address,$input['reference']??'',$session['id']??'',$total,$regular]),wp_salt('auth'));
            if(($input['preview']??'')==='1')return ['total'=>wc_format_decimal($total,2),'regular'=>wc_format_decimal($regular,2),'reviewToken'=>$review,'address'=>$address];
            if(!hash_equals($review,$input['reviewToken']??''))throw new \InvalidArgumentException('Artikel, Preis oder Angaben wurden geändert. Bitte nochmals prüfen.');
            $order=null;
            try{
                $order=wc_create_order(['customer_id'=>$customer,'created_via'=>'strc_direct']);if(is_wp_error($order))throw new \RuntimeException('Bestellung konnte nicht angelegt werden.');
                $order->set_address($address,'billing');$order->set_address($address,'shipping');$order->set_currency('CHF');$regular=0;$cost=0;$costKnown=true;
                foreach($selected as [$product,$quantity]){$regular+=(float)$product->get_price()*$quantity;$unitCost=$product->get_meta('_strc_cost_price');if($unitCost==='')$costKnown=false;else$cost+=(float)$unitCost*$quantity;$order->add_product($product,$quantity,$free?['subtotal'=>0,'total'=>0]:[]);}
                if($fulfilment==='shipping'){$shipping=new \WC_Order_Item_Shipping();$shipping->set_method_title($freeShipping?'Gratisversand (Direktverkauf)':'DHL · Schweiz');$shipping->set_method_id('flat_rate');$shipping->set_total($shippingCost);$order->add_item($shipping);}
                if($fulfilment==='pickup')$order->update_meta_data('_strc_pickup_event',$event);
                $order->update_meta_data('_strc_transaction_kind',$kind);$order->update_meta_data('_strc_fulfilment',$fulfilment);$order->update_meta_data('_strc_regular_value',$regular);$order->update_meta_data('_strc_cost_value',$costKnown?$cost:'');$order->update_meta_data('_strc_pos_actor',get_current_user_id());$order->update_meta_data('_strc_reconciliation','pending');$order->update_meta_data('_strc_issue_reason',trim($purposeLabel.($reason!==''?': '.$reason:''),': '));$order->update_meta_data('_strc_payment_reference',sanitize_text_field($input['reference']??''));
                if($purpose)$order->update_meta_data('_strc_gift_purpose',$purpose);
                if($freeShipping)$order->update_meta_data('_strc_free_shipping',1);
                if($session){$order->update_meta_data('_strc_pos_session',$session['id']);$order->update_meta_data('_strc_pos_seller',(int)$session['seller']);}
                $titles=['cash'=>'Barzahlung (Kasse)','zahls'=>'TWINT/Karte (zahls.ch, Kasse)','invoice'=>'Rechnung'];
                $order->set_payment_method($free?'strc_complimentary':($method==='invoice'?'strc_invoice':($method==='zahls'?$gateway:'strc_cash')));$order->set_payment_method_title($free?'Geschenk · '.$purposeLabel:$titles[$method]);$order->calculate_totals();$order->save();
                wc_reserve_stock_for_order($order);
                $order->add_order_note('Erfasst durch '.wp_get_current_user()->display_name.($session?' an der Kasse von '.PosSession::sellerName($session):'').'. '.trim($purposeLabel.' '.$reason));
                $status=match(true){$free,$method==='cash'=>$fulfilment==='handover'?'completed':'processing',$method==='zahls'=>'pending',default=>'on-hold'};
                $order->update_status($status);wc_reduce_stock_levels($order->get_id());wc_release_stock_for_order($order);
                if($method==='cash'){$order->set_date_paid(time());$order->save();}
                update_option($key,$order->get_id(),false);
                $message='Bestellung #'.$order->get_order_number().' gespeichert; Lagerbestand aktualisiert.';$invoice=null;
                if($method==='zahls')$message='Bestellung #'.$order->get_order_number().' erfasst. Bitte den QR-Code scannen lassen; die Zahlung wird automatisch bestätigt.';
                if($method==='invoice'){$invoice=ShopInvoice::create($order->get_id(),true);$message.=$invoice['url']!==''?' Rechnung '.$invoice['number'].($invoice['sent']?' erstellt und an '.$order->get_billing_email().' gesendet.':' erstellt (bitte herunterladen).'):' Keine Rechnung: '.$invoice['reason'];}
                return ['id'=>$order->get_id(),'message'=>$message,'url'=>$order->get_edit_order_url(),'invoiceUrl'=>$invoice['url']??'']+PosSession::payment($order);
            }catch(\Throwable $e){if($order instanceof \WC_Order){wc_maybe_increase_stock_levels($order->get_id());wc_release_stock_for_order($order);$order->delete(true);}throw $e;}
        });
    }

    /** Adresse eines Mitglieds aus dem Profil (Fairgate-Abgleich). */
    public static function memberAddress(int $userId): array
    {
        $user=get_userdata($userId);if(!$user)return [];
        $meta=static fn(string $key):string=>(string)get_user_meta($userId,$key,true);
        return ['first_name'=>$meta('first_name'),'last_name'=>$meta('last_name'),'email'=>(string)$user->user_email,'phone'=>$meta('strc_phone'),'address_1'=>$meta('strc_street'),'postcode'=>$meta('strc_postcode'),'city'=>$meta('strc_city'),'country'=>preg_match('/^[A-Z]{2}$/',strtoupper($meta('strc_country')))?strtoupper($meta('strc_country')):'CH'];
    }
}

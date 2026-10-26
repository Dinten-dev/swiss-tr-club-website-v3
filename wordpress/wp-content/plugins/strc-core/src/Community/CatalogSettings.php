<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Community;

use SwissTRClub\Core\Http\AjaxRequest;

final class CatalogSettings
{
    public static function parts(): array {return get_option('strc_parts_categories')?:['Motor','Getriebe / Overdrive','Antrieb','Fahrwerk / Lenkung','Bremsen','Elektrik','Karosserie','Innenausstattung','Räder / Reifen','Zubehör','Literatur / Automobilia','Werkzeug / Werkstatt','Verschiedenes','Garagenräumung'];}
    public static function areas(): array {return get_option('strc_forum_areas')?:['Fahrzeuge','Technik','Restaurationen','Teile gesucht','Garagen / Spezialisten','Events & Reisen','Clubleben'];}
    public static function components(): array
    {
        $saved=get_option('strc_forum_components');
        // Einmalig «Verdecke» in eine bereits gespeicherte Liste aufnehmen (danach in «Kategorien verwalten» frei änderbar).
        if(is_array($saved)&&$saved&&!get_option('strc_forum_components_verdecke')){
            if(!in_array('Verdecke',$saved,true)){$at=array_search('Innenausstattung',$saved,true);array_splice($saved,$at===false?count($saved):(int)$at+1,0,['Verdecke']);update_option('strc_forum_components',$saved,false);}
            update_option('strc_forum_components_verdecke','1',false);
        }
        return $saved?:['Motor','Kraftstoff / Vergaser','Einspritzung','Kühlung','Auspuff','Getriebe','Overdrive','Getriebe / Overdrive','Kupplung','Antrieb','Fahrwerk','Lenkung','Bremsen','Elektrik','Zündung','Chassis','Karosserie','Innenausstattung','Verdecke','Räder / Reifen','Instrumente','Sonstiges'];
    }
    public function registerHooks(): void
    {
        add_action('wp_ajax_strc_catalog',[$this,'respond']);
        add_action('wp_ajax_nopriv_strc_catalog',[$this,'respond']);
    }
    public function respond(): void
    {
        [$operation,$input]=AjaxRequest::read('strc_catalog',['save']);
        if($operation==='save'){
            if(!current_user_can('manage_options'))AjaxRequest::fail('Nur Webmaster dürfen Kategorien verwalten.',403);
            $catalog=json_decode($input['catalog']??'',true);
            if(!is_array($catalog))AjaxRequest::fail('Ungültige Kategorien.',422);
            foreach(['parts','areas','components'] as $key){
                $values=$catalog[$key]??null;
                if(!is_array($values)||!array_is_list($values)||!$values||count($values)>100)AjaxRequest::fail('Bitte gültige Kategorien angeben.',422);
                foreach($values as $value)if(!is_string($value)||!trim($value)||mb_strlen($value)>100)AjaxRequest::fail('Ungültige Kategorie.',422);
            }
            $types=$catalog['libraryTypes']??LibraryPolicy::types();
            if(!is_array($types)||!array_is_list($types)||count($types)>100)AjaxRequest::fail('Ungültige Dokumentarten.',422);
            foreach($types as &$type){if(!is_array($type)||!preg_match('/^[a-z][a-z0-9_-]{0,63}$/D',$type['key']??'')||empty($type['label'])||mb_strlen($type['label'])>100||!in_array($type['access']??'',['open','limited','restricted'],true))AjaxRequest::fail('Ungültige Dokumentart.',422);if(isset($type['group'])&&!array_key_exists($type['group'],LibraryPolicy::GROUPS)&&$type['group']!=='')AjaxRequest::fail('Ungültige Bibliotheksgruppe.',422);$type['label']=sanitize_text_field($type['label']);$type['fields']=array_values(array_intersect((array)($type['fields']??[]),['model','issue','year','component','occasion','date','version','region','start','end','distance','drivingTime','duration']));}unset($type);
            if(count(array_unique(array_column($types,'key')))!==count($types))AjaxRequest::fail('Dokumentarten müssen eindeutig sein.',422);
            if(array_diff(array_column(LibraryPolicy::types(),'key'),array_column($types,'key')))AjaxRequest::fail('Bestehende Dokumentarten bleiben zur Zuordnung erhalten.',422);
            update_option('strc_library_types',$types,false);
            foreach(['parts'=>'strc_parts_categories','areas'=>'strc_forum_areas','components'=>'strc_forum_components'] as $key=>$option)update_option($option,array_values(array_unique(array_map('sanitize_text_field',$catalog[$key]))),false);
        }elseif($operation!=='list')AjaxRequest::fail('Unbekannte Anfrage.');
        wp_send_json_success(['parts'=>self::parts(),'areas'=>self::areas(),'components'=>self::components(),'libraryTypes'=>LibraryPolicy::types(),'canManage'=>current_user_can('manage_options'),'nonce'=>current_user_can('manage_options')?wp_create_nonce('strc_catalog'):null]);
    }
}

<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Integrations\Fairgate;

use SwissTRClub\Core\Forms\FormFields;
use SwissTRClub\Core\Forms\FormStore;
use SwissTRClub\Core\Members\MemberProfile;

/** Additive import: existing website vehicles and photos are never overwritten. «kein TR» wird als Vermerk beim Mitglied gespeichert. */
final class FairgateVehicleImport
{
    public function __construct(private readonly array $slots) {}

    public static function fromConstants(): self
    {
        return new self(defined('STRC_FAIRGATE_VEHICLE_FIELDS')&&is_array(STRC_FAIRGATE_VEHICLE_FIELDS)?STRC_FAIRGATE_VEHICLE_FIELDS:[]);
    }

    public function ready(): bool
    {
        if(!$this->slots||count($this->slots)>3)return false;
        foreach($this->slots as$slot){
            if(!is_array($slot)||empty($slot['model']))return false;
            foreach($slot as$key=>$path)if(!in_array($key,['model','year','exteriorColour','interiorColour','chassisNumber','registration','notes','details'],true)||!is_string($path)||!str_starts_with($path,'/'))return false;
        }
        return true;
    }

    /** A missing API field is an error, never an invented empty vehicle. */
    public function plan(array $contacts): array
    {
        if(!$this->ready())throw new FairgateApiException('Die Fairgate-Feldzuordnung für Fahrzeuge fehlt. Bestehende Fahrzeuge bleiben unverändert.');
        $seen=[];$out=[];
        foreach($contacts as$contact){
            $id=(string)($contact['basefields']['contact_id']??'');
            if(!preg_match('/^[1-9][0-9]*$/D',$id)||isset($seen[$id]))throw new FairgateApiException('Ungültige oder doppelte Fairgate Contact ID.');
            $seen[$id]=true;
        }
        global $wpdb;$members=$wpdb->get_results("SELECT user_id,fairgate_contact_id,status FROM {$wpdb->prefix}strc_memberships WHERE fairgate_contact_id IS NOT NULL",ARRAY_A);$links=[];
        foreach($members as$member)if(in_array($member['status'],['active','grace'],true)&&!empty($member['fairgate_contact_id']))$links[(string)$member['fairgate_contact_id']]=(int)$member['user_id'];
        foreach($contacts as$contact){
            $contactId=(string)$contact['basefields']['contact_id'];$user=$links[$contactId]??0;if(!$user)continue;
            $house=MemberProfile::household($user);$owner=$house['primary'];$existing=array_map([FormStore::class,'data'],FormStore::find('strc_vehicle',$owner));
            foreach(array_values($this->slots)as$index=>$mapping){
                $source=$contactId.':'.($index+1);$input=[];$missing=false;
                foreach($mapping as$key=>$pointer){$value=$contact;foreach(explode('/',substr($pointer,1))as$part){$part=str_replace(['~1','~0'],['/','~'],$part);if(!is_array($value)||!array_key_exists($part,$value)){$missing=true;break;}$value=$value[$part];}if(!is_scalar($value)&&$value!==null)$missing=true;$input[$key]=is_scalar($value)?trim((string)$value):'';}
                $base=['userId'=>$owner,'source'=>$source];
                if($missing){$out[]=$base+['action'=>'missing-fields'];continue;}
                // Fairgate-Angaben in den Modellkatalog bringen (siehe FairgateVehicleNormalizer).
                $normalized=FairgateVehicleNormalizer::normalize($input);
                if($normalized['result']==='empty')continue;
                if($normalized['result']==='no-tr'){$out[]=$base+['action'=>'no-tr'];continue;}
                if($normalized['result']==='review'){$out[]=$base+['action'=>'review','reason'=>$normalized['reason'],'fairgate'=>$input];continue;}
                try{$vehicle=FormFields::vehicle($normalized['input']);}catch(\InvalidArgumentException$e){$out[]=$base+['action'=>'invalid','reason'=>$e->getMessage(),'fairgate'=>$input];continue;}
                $action='create';
                foreach($existing as$row){
                    if(($row['fairgateSource']??'')===$source){$action='already-imported';break;}
                    if(self::same($vehicle,$row)){$action='matching-existing';break;}
                }
                $out[]=$base+['action'=>$action,'vehicle'=>$vehicle];
                if($action==='create')$existing[]=$vehicle+['fairgateSource'=>$source];
            }
        }
        return $out;
    }

    public function apply(array $contacts): array
    {
        FairgateStagingImport::guard();
        return FormStore::locked('fairgate-additive-vehicles',function()use($contacts){
            $plan=$this->plan($contacts);
            // Fehlende API-Felder brechen ab. Einzelne nicht erkannte Einträge («review»/«invalid») werden nur aufgelistet
            // und blockieren die übrigen Fahrzeuge nicht mehr; die Mitgliederverwaltung klärt sie von Hand.
            if(array_filter($plan,static fn($r)=>$r['action']==='missing-fields'))throw new FairgateApiException('Fahrzeugfelder fehlen in der Fairgate-Antwort; keine Fahrzeuge importiert.');
            foreach($plan as&$row){
                if($row['action']==='create')$row['postId']=FormStore::save('strc_vehicle',$row['vehicle']+['fairgateSource'=>$row['source'],'fairgateImportedAt'=>gmdate(DATE_ATOM),'requestId'=>wp_generate_uuid4()],$row['userId']);
                if($row['action']==='no-tr')update_user_meta($row['userId'],'strc_fairgate_no_tr',gmdate(DATE_ATOM));
            }
            unset($row);return $plan;
        });
    }

    private static function same(array $a,array $b): bool
    {
        $key=static fn($v)=>preg_replace('/[^A-Z0-9]/','',strtoupper((string)$v));
        $vinA=$key($a['chassisNumber']??'');$vinB=$key($b['chassisNumber']??'');
        if($vinA!==''&&$vinB!=='')return $vinA===$vinB;
        return ($a['model']??'')===($b['model']??'')&&($a['year']??'')===($b['year']??'')&&($key($a['registration']??'')===$key($b['registration']??'')||empty($a['registration'])||empty($b['registration']));
    }
}

<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Integrations\Fairgate;

use SwissTRClub\Core\Events\RegionDirectory;

/** Tenant paths are explicit JSON Pointers into the unwrapped V2 contact data. */
final class FairgateMemberMapping
{
    public function __construct(private readonly array $paths, private readonly array $statuses) {}

    public static function fromConstants(): self
    {
        return new self(defined('STRC_FAIRGATE_SYNC_FIELDS') && is_array(STRC_FAIRGATE_SYNC_FIELDS)?STRC_FAIRGATE_SYNC_FIELDS:array(),
            defined('STRC_FAIRGATE_STATUS_VALUES') && is_array(STRC_FAIRGATE_STATUS_VALUES)?STRC_FAIRGATE_STATUS_VALUES:array());
    }

    public function ready(): bool
    {
        if (empty($this->paths['contactId']) || empty($this->paths['status']) || !$this->statuses) return false;
        foreach ($this->paths as $path) if (!is_string($path) || !str_starts_with($path,'/')) return false;
        foreach ($this->statuses as $status) if (!in_array($status,array('active','grace','inactive','pending'),true)) return false;
        return true;
    }

    public function map(array $contact, string $expectedId): array
    {
        if (!$this->ready()) throw new FairgateApiException('Die Fairgate-Feldzuordnung fehlt.');
        $id=$this->value($contact,$this->paths['contactId']);
        if (!is_scalar($id) || (string)$id!==$expectedId) throw new FairgateApiException('Die Fairgate Contact ID stimmt nicht überein.');
        $source=$this->value($contact,$this->paths['status']);
        if (!is_scalar($source) || !isset($this->statuses[(string)$source])) throw new FairgateApiException('Unbekannter Mitgliedschaftsstatus; der bisherige Zugang bleibt erhalten.');
        $row=array('status'=>$this->statuses[(string)$source]);
        // Region: leer oder unbekannt → lokale Region bleiben lassen (Fairgate-Feld wird schrittweise befüllt).
        if (isset($this->paths['region'])) { $region=$this->regionName($contact); if ($region!==null) $row['region']=$region; }
        foreach (array('member_number') as $field) {
            if (!isset($this->paths[$field])) continue;
            $value=$this->value($contact,$this->paths[$field]);
            if (!is_string($value) || trim($value)==='' || mb_strlen($value)>32) throw new FairgateApiException('Ein zugeordnetes Mitgliedsfeld fehlt oder ist ungültig.');
            $row[$field]=$value;
        }
        return $row;
    }

    /**
     * Optionale Zusatzfelder (nur wenn in STRC_FAIRGATE_SYNC_FIELDS zugeordnet):
     * startedOn → Mitglied seit, printMagazine → TR-Magazin Print, eNewsletter → eNewsletter.
     * Unbekannte oder leere Werte werden ausgelassen (die Website zeigt dann «abonniert»).
     * @return array{started_on?:string,print?:bool,newsletter?:bool}
     */
    public function extras(array $contact): array
    {
        $out=array();
        if (is_string($this->paths['startedOn']??null)) {
            $value=$this->value($contact,$this->paths['startedOn']);
            if (is_scalar($value) && preg_match('/^(\d{4})(?:-(\d{2})-(\d{2}))?(?:$|T| )/',(string)$value,$m)) {
                $date=$m[1].'-'.($m[2]??'01').'-'.($m[3]??'01');
                if(self::validCalendarDate($date))$out['started_on']=$date;
            }
        }
        foreach (array('printMagazine'=>'print','eNewsletter'=>'newsletter') as $key=>$name) {
            if (!is_string($this->paths[$key]??null)) continue;
            $flag=self::flag($this->value($contact,$this->paths[$key]));
            if ($flag!==null) $out[$name]=$flag;
        }
        $person=$this->personFields($contact,'',array('gender'=>array('basefields','gender'),'birth_date'=>array('basefields','date_of_birth'),'salutation'=>array('basefields','salutation'),'language'=>array('basefields',isset($contact['basefields']['correspondence_language'])?'correspondence_language':'correspondence_lang')));
        if ($person) $out['person']=$person;
        $copilot=$this->personFields($contact,'copilot',array());
        // Fairgate führt den Co-Piloten als ein Feld «Copilot Vorname Name».
        if ((empty($copilot['first_name']) || empty($copilot['last_name'])) && is_string($this->paths['copilotFullName']??null)) {
            $split=self::splitName(self::normalize('name',$this->value($contact,$this->paths['copilotFullName'])));
            if ($split) $copilot=$split+$copilot;
        }
        if (!empty($copilot['first_name']) && !empty($copilot['last_name'])) $out['copilot']=$copilot;
        return $out;
    }

    /**
     * Persönliche Zusatzangaben. Zuordnung über STRC_FAIRGATE_SYNC_FIELDS, z. B. 'gender'=>'/basefields/gender'
     * oder für den in Fairgate erfassten Co-Piloten 'copilotFirstName'=>'/fields/123'.
     * Ohne Zuordnung werden für das Mitglied gängige Fairgate-Grundfelder gelesen, falls vorhanden.
     */
    private function personFields(array $contact,string $prefix,array $fallback): array
    {
        $keys=$prefix===''?array('gender','birth_date','salutation','language'):FairgateProfileWriter::COPILOT_FIELDS;
        $out=array();
        foreach ($keys as $field) {
            $name=$prefix===''?lcfirst(str_replace('_','',ucwords($field,'_'))):$prefix.str_replace('_','',ucwords($field,'_'));
            $value=is_string($this->paths[$name]??null)?$this->value($contact,$this->paths[$name]):null;
            if ($value===null && isset($fallback[$field])) {$value=$contact;foreach($fallback[$field] as $part){$value=is_array($value)&&array_key_exists($part,$value)?$value[$part]:null;}}
            $clean=self::normalize($field,$value);
            if ($clean!=='') $out[$field]=$clean;
        }
        return $out;
    }

    /** «Monika Muster» → Vorname Monika, Name Muster; mehrteilige Vornamen bleiben beim Vornamen. */
    public static function splitName(string $full): array
    {
        $parts=preg_split('/\s+/u',trim($full))?:array();
        if (count($parts)<2) return array();
        $last=array_pop($parts);
        return array('first_name'=>implode(' ',$parts),'last_name'=>$last);
    }

    public static function normalize(string $field,mixed $value): string
    {
        if (!is_scalar($value)) return '';
        $text=trim(function_exists('sanitize_text_field')?sanitize_text_field((string)$value):strip_tags((string)$value));
        if ($text==='') return '';
        $lower=mb_strtolower($text);
        $clean=match($field){
            'gender'=>in_array($lower,array('m','male','mann','männlich','masculin','herr'),true)?'male':(in_array($lower,array('f','w','female','frau','weiblich','féminin','feminin'),true)?'female':(in_array($lower,array('d','other','divers','diverse','x'),true)?'other':'')),
            'birth_date'=>preg_match('/^(\d{4})-(\d{2})-(\d{2})/',$text,$m)?$m[1].'-'.$m[2].'-'.$m[3]:(preg_match('/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/',$text,$m)?sprintf('%04d-%02d-%02d',$m[3],$m[2],$m[1]):''),
            'salutation'=>in_array($lower,array('frau','madame','mme','ms','mrs'),true)?'Frau':(in_array($lower,array('herr','monsieur','m.','mr'),true)?'Herr':''),
            'language'=>in_array(substr($lower,0,2),array('de','fr'),true)?substr($lower,0,2):'',
            default=>mb_substr($text,0,200),
        };
        if($field==='birth_date'&&(!self::validCalendarDate($clean)||$clean>gmdate('Y-m-d')))return '';
        return $clean;
    }

    private static function validCalendarDate(string $value): bool
    {
        $date=\DateTimeImmutable::createFromFormat('!Y-m-d',$value);
        return $date&&$date->format('Y-m-d')===$value;
    }

    public static function flag(mixed $value): ?bool
    {
        if (is_bool($value)) return $value;
        if (!is_scalar($value)) return null;
        $text=mb_strtolower(trim((string)$value));
        if (in_array($text,array('1','true','ja','yes','oui','x','abonniert'),true)) return true;
        if (in_array($text,array('0','false','nein','no','non','nicht abonniert'),true)) return false;
        return null;
    }

    /** Abonnemente als Benutzermeta speichern (Quelle Fairgate). */
    public static function storeExtras(int $userId,array $extras): void
    {
        foreach (array('print','newsletter') as $name) if (isset($extras[$name])) update_user_meta($userId,'strc_subscription_'.$name,$extras[$name]?'1':'0');
        foreach (($extras['person']??array()) as $field=>$value) update_user_meta($userId,'strc_'.$field,$value);
        if (isset($extras['copilot'])) update_user_meta($userId,'strc_copilot_fairgate',$extras['copilot']);
        // Gemeldete Änderung ist erledigt, sobald Fairgate denselben Stand liefert.
        $request=get_user_meta($userId,'strc_subscription_request',true);
        if (is_array($request)) {
            $current=static fn(string $name):bool=>get_user_meta($userId,'strc_subscription_'.$name,true)!=='0';
            if (($request['print']??null)===$current('print') && ($request['newsletter']??null)===$current('newsletter')) delete_user_meta($userId,'strc_subscription_request');
        }
    }

    /** Offizielle Mitgliedsnummer über STRC_FAIRGATE_SYNC_FIELDS['memberNumber'] (nur der Mitgliederimport liest diesen Schlüssel). */
    public function memberNumber(array $contact): ?string
    {
        $path=$this->paths['memberNumber']??null;
        if(!is_string($path)||!str_starts_with($path,'/'))return null;
        $value=$this->value($contact,$path);
        if(is_int($value)||is_float($value))$value=(string)(int)$value;
        if(!is_string($value))return null;
        $value=trim($value);
        return preg_match('/^[A-Za-z0-9][A-Za-z0-9.\/-]{0,31}$/D',$value)&&!str_starts_with($value,'FG:')?$value:null;
    }

    public function regionName(array $contact): ?string
    {
        $path = $this->paths['region'] ?? null;
        if (! is_string($path) || ! str_starts_with($path, '/')) {
            return null;
        }

        $value = $this->value($contact, $path);
        $region = is_scalar($value) ? RegionDirectory::canonicalName((string) $value) : null;
        // TRiungsters ist eine Mitgliedschaftsform/Gruppe, keine Region: nur die 7 Regionen werden übernommen.
        return $region === RegionDirectory::REGIONS['triungsters'] ? null : $region;
    }

    private function value(array $data,string $pointer): mixed
    {
        $value=$data;
        foreach (explode('/',substr($pointer,1)) as $part) {
            $key=str_replace(array('~1','~0'),array('/','~'),$part);
            if (!is_array($value) || !array_key_exists($key,$value)) return null;
            $value=$value[$key];
        }
        return $value;
    }
}

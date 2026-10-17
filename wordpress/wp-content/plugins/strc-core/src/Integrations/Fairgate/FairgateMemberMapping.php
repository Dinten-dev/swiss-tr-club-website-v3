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
        foreach (array('region','member_number') as $field) {
            if (!isset($this->paths[$field])) continue;
            $value=$this->value($contact,$this->paths[$field]);
            if (!is_string($value) || trim($value)==='' || mb_strlen($value)>($field==='region'?64:32)) throw new FairgateApiException('Ein zugeordnetes Mitgliedsfeld fehlt oder ist ungültig.');
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
            if (is_scalar($value) && preg_match('/^(\d{4})(?:-(\d{2})-(\d{2}))?/',(string)$value,$m)) $out['started_on']=$m[1].'-'.($m[2]??'01').'-'.($m[3]??'01');
        }
        foreach (array('printMagazine'=>'print','eNewsletter'=>'newsletter') as $key=>$name) {
            if (!is_string($this->paths[$key]??null)) continue;
            $flag=self::flag($this->value($contact,$this->paths[$key]));
            if ($flag!==null) $out[$name]=$flag;
        }
        return $out;
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
    }

    public function regionName(array $contact): ?string
    {
        $path = $this->paths['region'] ?? null;
        if (! is_string($path) || ! str_starts_with($path, '/')) {
            return null;
        }

        $value = $this->value($contact, $path);
        return is_scalar($value) ? RegionDirectory::canonicalName((string) $value) : null;
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

<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Integrations\Fairgate;

final class FairgateApplicationSettings
{
    public const LABELS = array('email'=>'E-Mail', 'phone'=>'Telefon', 'street'=>'Strasse und Hausnummer', 'postcode'=>'Postleitzahl', 'city'=>'Ort', 'region'=>'Gewünschte Region', 'vehicle'=>'Triumph-Fahrzeug');

    public function __construct(public readonly bool $enabled, public readonly array $fields) {}

    public static function fromConstants(): self
    {
        return new self(defined('STRC_FAIRGATE_APPLICATION_ENABLED') && STRC_FAIRGATE_APPLICATION_ENABLED === true,
            defined('STRC_FAIRGATE_APPLICATION_FIELDS') && is_array(STRC_FAIRGATE_APPLICATION_FIELDS) ? STRC_FAIRGATE_APPLICATION_FIELDS : array());
    }

    public function ready(): bool
    {
        if (!$this->enabled || empty($this->fields['email']) || count(array_unique(array_values($this->fields), SORT_REGULAR))!==count($this->fields)) return false;
        foreach ($this->fields as $key=>$target) if (!isset(self::LABELS[$key]) || !is_string($target) || !trim($target) || strlen($target)>160) return false;
        return true;
    }

    public function payload(array $input): array
    {
        if (!$this->ready()) throw new FairgateApiException('Der Mitgliedsantrag ist noch nicht freigeschaltet.');
        $payload=array('contactType'=>'single_person','correspondence_lang'=>'de');
        foreach (array('first_name','last_name') as $key) {
            $value=trim((string)($input[$key] ?? ''));
            if (!$value || mb_strlen($value)>160 || preg_match('/[\x00-\x1f<>]/u',$value)) throw new FairgateApiException('Bitte Vorname und Nachname prüfen.',422);
            $payload[$key]=$value;
        }
        if (($input['consent'] ?? '')!=='1') throw new FairgateApiException('Bitte die Datenschutzhinweise bestätigen.',422);
        $configured=array();
        foreach ($this->fields as $key=>$target) {
            $value=trim((string)($input[$key] ?? ''));
            if (mb_strlen($value)>200 || preg_match('/[\x00-\x1f<>]/u',$value)) throw new FairgateApiException('Bitte die Eingabefelder prüfen.',422);
            if ($key==='email' && !filter_var($value,FILTER_VALIDATE_EMAIL)) throw new FairgateApiException('Bitte eine gültige E-Mail-Adresse eingeben.',422);
            if ($value!=='') $configured[$target]=$value;
        }
        $payload['configured_fields']=$configured;
        return $payload;
    }
}

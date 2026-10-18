<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Integrations\Fairgate;

/**
 * Schreibt Profiländerungen (Mitglied und Co-Pilot) direkt nach Fairgate.
 *
 * Nur aktiv, wenn STRC_FAIRGATE_PROFILE_WRITE['enabled']===true, die Fairgate-Zugangsdaten gesetzt sind
 * und die Umgebung Schreibzugriffe erlaubt (nicht Staging, nicht STRC_FAIRGATE_READ_ONLY).
 * Feldschlüssel sind die Fairgate-«configured_fields»; 'language' wird als correspondence_lang gesendet.
 * Ohne Freigabe gehen Änderungen als Anfrage ins Formularpostfach.
 *
 * Beispiel:
 * define('STRC_FAIRGATE_PROFILE_WRITE',['enabled'=>true,
 *   'fields'=>['salutation'=>'…','email'=>'…','phone'=>'…','street'=>'…','postcode'=>'…','city'=>'…','country'=>'…'],
 *   'copilot'=>['full_name'=>'… (Copilot Vorname Name)','gender'=>'…','birth_date'=>'…'] oder einzeln ['salutation'=>'…','first_name'=>'…','last_name'=>'…','gender'=>'…','birth_date'=>'…','language'=>'…','email'=>'…','phone'=>'…','street'=>'…','postcode'=>'…','city'=>'…','country'=>'…']]);
 */
final class FairgateProfileWriter
{
    public const MEMBER_FIELDS=['salutation','language','email','phone','street','postcode','city','country'];
    public const COPILOT_FIELDS=['salutation','first_name','last_name','gender','birth_date','language','email','phone','street','postcode','city','country'];

    private array $current=[];

    public function __construct(private readonly array $config) {}

    /** Bisherige Werte, damit ein zusammengesetztes Namensfeld vollständig geschrieben wird. */
    public function withCurrent(array $values): self { $copy=clone $this;$copy->current=$values;return $copy; }

    public static function fromConstants(): self
    {
        return new self(defined('STRC_FAIRGATE_PROFILE_WRITE')&&is_array(STRC_FAIRGATE_PROFILE_WRITE)?STRC_FAIRGATE_PROFILE_WRITE:[]);
    }

    public function available(string $part='fields'): bool
    {
        if(($this->config['enabled']??false)!==true)return false;
        if((function_exists('wp_get_environment_type')&&wp_get_environment_type()==='staging')||(defined('STRC_FAIRGATE_READ_ONLY')&&STRC_FAIRGATE_READ_ONLY))return false;
        if(!FairgateConfiguration::fromConstants()->isConfigured())return false;
        $fields=$this->config[$part]??null;
        if(!is_array($fields)||!$fields)return false;
        foreach($fields as $key=>$name)if(!is_string($key)||!is_string($name)||!preg_match('/^[a-zA-Z0-9_.-]+$/D',$name))return false;
        return true;
    }

    /** Nur Felder, die geändert wurden und zugeordnet sind. */
    public function payload(string $part,array $changes): array
    {
        $map=$this->config[$part]??[];$configured=[];$payload=[];
        foreach($changes as $field=>$value){
            if($part==='fields'&&$field==='language'&&!isset($map['language'])){$payload['correspondence_lang']=$value;continue;}
            if(isset($map[$field]))$configured[$map[$field]]=$value;
        }
        // Co-Pilot in Fairgate als ein Feld «Copilot Vorname Name» ('full_name').
        if($part==='copilot'&&isset($map['full_name'])&&(isset($changes['first_name'])||isset($changes['last_name'])))$configured[$map['full_name']]=trim(($changes['first_name']??$this->current['first_name']??'').' '.($changes['last_name']??$this->current['last_name']??''));
        if($configured)$payload['configured_fields']=$configured;
        return $payload;
    }

    /** true = in Fairgate gespeichert; false = nicht verfügbar oder fehlgeschlagen (Aufrufer nutzt das Formularpostfach). */
    public function write(string $contactId,string $part,array $changes): bool
    {
        if(!$this->available($part)||!preg_match('/^[1-9][0-9]*$/D',$contactId))return false;
        $payload=$this->payload($part,$changes);
        if(!$payload)return false;
        $configuration=FairgateConfiguration::fromConstants();
        try{
            (new FairgateGateway(new FairgateClient($configuration),$configuration))->updateContact($contactId,$payload);
            return true;
        }catch(\Throwable $error){
            error_log('STRC Fairgate profile write failed for contact '.$contactId.'.');
            return false;
        }
    }
}

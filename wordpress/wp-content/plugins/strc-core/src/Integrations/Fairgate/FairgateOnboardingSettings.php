<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Integrations\Fairgate;

/** Opt-in only after the club's writable fields and official membership process are verified. */
final class FairgateOnboardingSettings
{
    public function __construct(private readonly array $config) {}
    public static function fromConstants(): self
    {
        return new self(defined('STRC_FAIRGATE_ONBOARDING') && is_array(STRC_FAIRGATE_ONBOARDING) ? STRC_FAIRGATE_ONBOARDING : []);
    }
    public function ready(array $application): bool
    {
        $c=$this->config;$type=$application['membershipType']??'';$region=$application['region']??'';
        if (($c['verified']??false)!==true || empty($c['statusValue']) || !isset($c['regions'][$region])) return false;
        foreach (['email','phone','street','postcode','city','country','membershipType','status','region'] as $field) if (empty($c['writeFields'][$field])) return false;
        $fields=$c['writeFields']??[];
        foreach ($fields as $key) if (!is_string($key)||!preg_match('/^[a-zA-Z0-9_.-]+$/D',$key)) return false;
        if(count(array_unique($fields))!==count($fields))return false;
        foreach(['contactId','member_number','status','membershipType','region','email','first_name','last_name','phone','street','postcode','city','country'] as $field) if (empty($c['readFields'][$field])||!is_string($c['readFields'][$field])||!str_starts_with($c['readFields'][$field],'/'))return false;
        foreach($this->slots($application) as $slot)if(!isset($c['types'][$this->type($application,$slot)]))return false;
        if($type==='couple'&&(empty($fields['partner'])||empty($c['readFields']['partner'])))return false;
        if($type==='young'&&(empty($fields['triungster'])||empty($c['readFields']['triungster'])||!isset($c['triungsterValue'])))return false;
        return in_array($type,['single','couple','young'],true);
    }
    public function slots(array $a): array {return ($a['membershipType']??'')==='couple'?['person','copilot']:['person'];}
    public function type(array $a,string $slot): string {return match($a['membershipType']){'couple'=>$slot==='person'?'couple_primary':'couple_partner','young'=>'youth',default=>'individual'};}
    public function payload(array $a,string $slot): array
    {
        if(!$this->ready($a))throw new \RuntimeException('Fairgate-Feldzuordnung und Schreibfreigabe sind noch nicht bestätigt.');
        $p=$a[$slot];$c=$this->config;$values=[];
        foreach(['email','phone','street','postcode','city','country'] as $field)$values[$c['writeFields'][$field]]=$p[$field];
        $values[$c['writeFields']['membershipType']]=$c['types'][$this->type($a,$slot)];
        $values[$c['writeFields']['status']]=$c['statusValue'];$values[$c['writeFields']['region']]=$c['regions'][$a['region']];
        if($a['membershipType']==='young')$values[$c['writeFields']['triungster']]=$c['triungsterValue'];
        return ['contactType'=>'single_person','first_name'=>$p['first_name'],'last_name'=>$p['last_name'],'correspondence_lang'=>$p['language'],'configured_fields'=>$values];
    }
    public function partnerPayload(string $partner): array {return ['configured_fields'=>[$this->config['writeFields']['partner']=>$partner]];}
    private function value(array $data,string $key): mixed
    {
        $path=$this->config['readFields'][$key]??'';if(!$path)return null;
        foreach(explode('/',substr($path,1)) as $part){$part=str_replace(['~1','~0'],['/','~'],$part);if(!is_array($data)||!array_key_exists($part,$data))return null;$data=$data[$part];}
        return $data;
    }
    private function equal(mixed $a,mixed $b): bool {return is_scalar($a)&&is_scalar($b)&&(string)$a===(string)$b;}
    public function verify(array $contact,array $a,string $slot,string $id,?string $partner): array
    {
        $c=$this->config;
        if(!$this->ready($a)||!$this->equal($this->value($contact,'contactId'),$id))throw new \RuntimeException('Fairgate-Zuordnung konnte nicht bestätigt werden.');
        $number=$this->value($contact,'member_number');
        if(!is_scalar($number)||trim((string)$number)===''||mb_strlen((string)$number)>32)throw new \RuntimeException('Die offizielle Mitgliedsnummer fehlt in Fairgate.');
        if(!$this->equal($this->value($contact,'status'),$c['statusValue'])||!$this->equal($this->value($contact,'membershipType'),$c['types'][$this->type($a,$slot)])||!$this->equal($this->value($contact,'region'),$c['regions'][$a['region']]))throw new \RuntimeException('Mitgliedschaft, Status oder Region sind in Fairgate noch nicht bestätigt.');
        $email=$this->value($contact,'email');
        if(!is_string($email)||strcasecmp(trim($email),$a[$slot]['email'])!==0)throw new \RuntimeException('Die offizielle E-Mail-Adresse stimmt nicht mit dem Antrag überein.');
        $profile=['email'=>$email];
        foreach(['first_name','last_name','phone','street','postcode','city','country'] as $field){
            $value=$this->value($contact,$field);
            if(!is_scalar($value)||trim((string)$value)!==trim($a[$slot][$field]))throw new \RuntimeException('Name oder Kontaktangaben wurden in Fairgate nicht vollständig bestätigt.');
            $profile[$field]=(string)$value;
        }
        if($partner!==null&&!$this->equal($this->value($contact,'partner'),$partner))throw new \RuntimeException('Die Paarverknüpfung ist in Fairgate noch nicht bestätigt.');
        if($a['membershipType']==='young'&&!$this->equal($this->value($contact,'triungster'),$c['triungsterValue']))throw new \RuntimeException('Die TRiungster-Zuordnung fehlt in Fairgate.');
        return ['contactId'=>$id,'member_number'=>(string)$number,'status'=>'active','membership_type'=>$this->type($a,$slot),'region'=>$a['region'],'profile'=>$profile,'verifiedAt'=>gmdate(DATE_ATOM)];
    }
}

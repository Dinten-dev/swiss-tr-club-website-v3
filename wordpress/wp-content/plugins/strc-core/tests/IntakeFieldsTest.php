<?php
declare(strict_types=1);
namespace { if(!function_exists('sanitize_textarea_field')){function sanitize_textarea_field($value){return trim(strip_tags($value));}function is_email($value){return filter_var($value,FILTER_VALIDATE_EMAIL);}} }
namespace SwissTRClub\Core\Tests {
use PHPUnit\Framework\TestCase;
use SwissTRClub\Core\Forms\FormFields;
require_once dirname(__DIR__).'/src/Forms/FormFields.php';
final class IntakeFieldsTest extends TestCase
{
    private function input():array{return ['membership_type'=>'single','first_name'=>'Test','last_name'=>'Member','email'=>'member@example.invalid','phone'=>'079 123 45 67','street'=>'Test 1','postcode'=>'3000','city'=>'Bern','country'=>'Schweiz','gender'=>'other','birth_date'=>'1990-03-21','region'=>'bern','vehicles'=>json_encode([['model'=>'TR6','year'=>'1972','exteriorColour'=>'Rot','interiorColour'=>'Schwarz','chassisNumber'=>'CR123','status'=>'roadworthy']]),'statutes'=>'1','privacy'=>'1'];}
    public function testIntakeKeepsNewPersonalAndVehicleFields():void{$payload=FormFields::application($this->input(),['bern']);self::assertSame('1990-03-21',$payload['person']['birth_date']);self::assertSame('other',$payload['person']['gender']);self::assertSame('CR123',$payload['vehicles'][0]['chassisNumber']);self::assertSame('Schwarz',$payload['vehicles'][0]['interiorColour']);}
    public function testInvalidCalendarDateIsRejected():void{$input=$this->input();$input['birth_date']='2020-02-30';$this->expectException(\InvalidArgumentException::class);FormFields::application($input,['bern']);}
    public function testIntakeRequiresVehicleYear():void{$input=$this->input();$input['vehicles']='[{"model":"TR6"}]';$this->expectException(\InvalidArgumentException::class);FormFields::application($input,['bern']);}
    public function testExistingVehiclePayloadStillAccepted():void{$vehicle=FormFields::vehicle(['model'=>'TR6','colour'=>'Rot','details'=>'PI']);self::assertSame('Rot',$vehicle['colour']);self::assertSame('PI',$vehicle['details']);self::assertSame('',$vehicle['chassisNumber']);}
    public function testPairKeepsSeparatePersonalFields():void{$input=$this->input();$input['membership_type']='couple';foreach(['first_name','last_name','phone','street','postcode','city','country'] as $key)$input['copilot_'.$key]=$input[$key];$input['copilot_email']='copilot@example.invalid';$input['copilot_birth_date']='1991-05-13';$input['copilot_gender']='female';$input['copilot_confirm']='1';$result=FormFields::application($input,['bern']);self::assertSame('1990-03-21',$result['person']['birth_date']);self::assertSame('1991-05-13',$result['copilot']['birth_date']);self::assertSame('female',$result['copilot']['gender']);}
    public function testPairRequiresDistinctEmailAndCopilotConsent():void{$input=$this->input();$input['membership_type']='couple';foreach(['first_name','last_name','email','phone','street','postcode','city','country','birth_date','gender']as$key)$input['copilot_'.$key]=$input[$key];$input['copilot_confirm']='1';$this->expectException(\InvalidArgumentException::class);FormFields::application($input,['bern']);}
}
}

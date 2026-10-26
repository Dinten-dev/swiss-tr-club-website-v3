<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Tests;

use PHPUnit\Framework\TestCase;
use SwissTRClub\Core\Integrations\Fairgate\FairgateMemberMapping;

final class FairgateMemberExtrasTest extends TestCase
{
    public function testExtrasReadMappedFields(): void
    {
        $mapping = new FairgateMemberMapping(
            array('contactId'=>'/id','status'=>'/status','startedOn'=>'/entry','printMagazine'=>'/fields/print','eNewsletter'=>'/fields/newsletter'),
            array('Aktiv'=>'active')
        );
        $extras = $mapping->extras(array('id'=>1,'entry'=>'1998','fields'=>array('print'=>'Nein','newsletter'=>true)));
        self::assertSame(array('started_on'=>'1998-01-01','print'=>false,'newsletter'=>true), $extras);
    }

    public function testUnmappedOrUnknownValuesAreSkipped(): void
    {
        $mapping = new FairgateMemberMapping(array('contactId'=>'/id','status'=>'/status','printMagazine'=>'/print'), array('Aktiv'=>'active'));
        self::assertSame(array(), $mapping->extras(array('id'=>1,'print'=>'vielleicht')));
        self::assertTrue(FairgateMemberMapping::flag('abonniert'));
        self::assertNull(FairgateMemberMapping::flag(null));
    }

    public function testPersonAndCopilotFieldsAreNormalized(): void
    {
        $mapping = new FairgateMemberMapping(
            array('contactId'=>'/id','status'=>'/status','copilotFirstName'=>'/cp/first','copilotLastName'=>'/cp/last','copilotGender'=>'/cp/g','copilotBirthDate'=>'/cp/dob'),
            array('Aktiv'=>'active')
        );
        $extras = $mapping->extras(array('id'=>1,'basefields'=>array('gender'=>'Männlich','date_of_birth'=>'03.07.1956','correspondence_lang'=>'FR'),'cp'=>array('first'=>'Monika','last'=>'Muster','g'=>'w','dob'=>'1960-02-01')));
        self::assertSame(array('gender'=>'male','birth_date'=>'1956-07-03','language'=>'fr'), $extras['person']);
        self::assertSame(array('first_name'=>'Monika','last_name'=>'Muster','gender'=>'female','birth_date'=>'1960-02-01'), $extras['copilot']);
        self::assertSame('', FairgateMemberMapping::normalize('gender','unbekannt'));
    }

    public function testCopilotFullNameIsSplit(): void
    {
        $mapping = new FairgateMemberMapping(array('contactId'=>'/id','status'=>'/status','copilotFullName'=>'/cp'), array('Aktiv'=>'active'));
        self::assertSame(array('first_name'=>'Anna Maria','last_name'=>'Muster'), $mapping->extras(array('id'=>1,'cp'=>'Anna Maria Muster'))['copilot']);
        self::assertArrayNotHasKey('copilot', $mapping->extras(array('id'=>1,'cp'=>'Anna')));
    }

    public function testRealCorrespondenceKeyAndInvalidDates(): void
    {
        $mapping=new FairgateMemberMapping(['startedOn'=>'/membership/first_joining_date'],[]);
        self::assertSame(['started_on'=>'1998-01-01','person'=>['language'=>'fr']], $mapping->extras(['membership'=>['first_joining_date'=>'1998-01-01'],'basefields'=>['correspondence_language'=>'fr']]));
        self::assertSame([], $mapping->extras(['membership'=>['first_joining_date'=>'1998-13-01']]));
        self::assertSame('', FairgateMemberMapping::normalize('birth_date','1990-02-30'));
        self::assertSame('', FairgateMemberMapping::normalize('birth_date','2990-01-01'));
        self::assertSame('1960-02-29', FairgateMemberMapping::normalize('birth_date','29.02.1960'));
    }

    public function testMemberNumberIsReadOnlyWhenMappedAndPlausible(): void
    {
        $mapping = new FairgateMemberMapping(array('contactId'=>'/id','status'=>'/status','memberNumber'=>'/configured_fields/mitglieder_nummer'), array('Aktiv'=>'active'));
        self::assertSame('1234', $mapping->memberNumber(array('configured_fields'=>array('mitglieder_nummer'=>' 1234 '))));
        self::assertSame('1234', $mapping->memberNumber(array('configured_fields'=>array('mitglieder_nummer'=>1234))));
        self::assertNull($mapping->memberNumber(['configured_fields'=>['mitglieder_nummer'=>1234.5]]));
        self::assertSame(null, $mapping->memberNumber(array('configured_fields'=>array('mitglieder_nummer'=>''))));
        self::assertSame(null, $mapping->memberNumber(array('configured_fields'=>array('mitglieder_nummer'=>'FG:12'))));
        self::assertSame(null, (new FairgateMemberMapping(array(), array()))->memberNumber(array('configured_fields'=>array('mitglieder_nummer'=>'1234'))));
    }
}

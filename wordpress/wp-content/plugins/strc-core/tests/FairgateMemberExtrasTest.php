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
}

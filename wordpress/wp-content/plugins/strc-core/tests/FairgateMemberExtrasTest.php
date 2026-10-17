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
}

<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Tests;

use PHPUnit\Framework\TestCase;
use SwissTRClub\Core\Events\RegionDirectory;
use SwissTRClub\Core\Integrations\Fairgate\FairgateMemberMapping;

final class RegionDirectoryTest extends TestCase
{
    public function testNormalizesFairgateRegionNamesAndKnownLegacyValues(): void
    {
        self::assertSame('TRiungsters', RegionDirectory::canonicalName('TRiungsters'));
        self::assertSame('Zürich', RegionDirectory::canonicalName('Zürich'));
        self::assertSame('Zürich', RegionDirectory::canonicalName('Zurich'));
        self::assertSame('Innerschweiz', RegionDirectory::canonicalName('Zentralschweiz'));
        self::assertSame('Suisse Romande', RegionDirectory::canonicalName('Suisse-Romandie'));
    }

    public function testUnknownRegionIsNotAssignedByGuessing(): void
    {
        self::assertNull(RegionDirectory::canonicalName('Wallis'));
        self::assertNull(RegionDirectory::canonicalName(''));
    }

    public function testFairgateRegionRequiresAnExplicitJsonPointerMapping(): void
    {
        $mapping = new FairgateMemberMapping(
            array('region' => '/configured_fields/Region'),
            array()
        );

        self::assertSame('Bern', $mapping->regionName(array('configured_fields' => array('Region' => 'Bern'))));
        self::assertNull($mapping->regionName(array('configured_fields' => array('Region' => 'Wallis'))));
        self::assertNull((new FairgateMemberMapping(array(), array()))->regionName(array('configured_fields' => array('Region' => 'Bern'))));
    }

    public function testWebhookMappingKeepsLocalRegionWhenFairgateRegionIsEmpty(): void
    {
        $mapping = new FairgateMemberMapping(array('contactId'=>'/id','status'=>'/status','region'=>'/configured_fields/region'), array('active'=>'active'));
        self::assertSame(array('status'=>'active'), $mapping->map(array('id'=>5,'status'=>'active','configured_fields'=>array('region'=>'')), '5'));
        self::assertSame(array('status'=>'active','region'=>'Innerschweiz'), $mapping->map(array('id'=>5,'status'=>'active','configured_fields'=>array('region'=>'Zentralschweiz')), '5'));
        self::assertSame(array('status'=>'active'), $mapping->map(array('id'=>5,'status'=>'active','configured_fields'=>array('region'=>'TRiungsters')), '5'));
    }
}

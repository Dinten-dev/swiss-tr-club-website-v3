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
}

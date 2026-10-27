<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Tests;

use PHPUnit\Framework\TestCase;
use SwissTRClub\Core\Integrations\Fairgate\FairgateStagingImport;

final class FairgateMembershipLabelTest extends TestCase
{
    public function testRecognisesTheFourClubMemberships(): void
    {
        self::assertSame('individual', FairgateStagingImport::membershipType('Einzelmitglied'));
        self::assertSame('honorary', FairgateStagingImport::membershipType('Ehrenmitglied'));
        self::assertSame('couple', FairgateStagingImport::membershipType('Paarmitglied'));
        self::assertSame('youth', FairgateStagingImport::membershipType('TRiungster'));
    }

    public function testIgnoresSpacingCaseAndAdditions(): void
    {
        self::assertSame('youth', FairgateStagingImport::membershipType('TRiungster   (Jungmitglied bis 35 Jahre)'));
        self::assertSame('youth', FairgateStagingImport::membershipType('  triungsters '));
        self::assertSame('couple', FairgateStagingImport::membershipType('Paarmitgliedschaft'));
        self::assertSame('individual', FairgateStagingImport::membershipType('EINZELMITGLIED (Schweiz)'));
        self::assertSame('honorary', FairgateStagingImport::membershipType("Membre d’honneur"));
        self::assertTrue(FairgateStagingImport::isCoupleLabel('Paarmitglieder'));
        self::assertFalse(FairgateStagingImport::isCoupleLabel('Einzelmitglied'));
    }

    public function testUnknownOrEmptyLabelsStayUnassigned(): void
    {
        self::assertNull(FairgateStagingImport::membershipType(''));
        self::assertNull(FairgateStagingImport::membershipType('Gönner'));
        self::assertNull(FairgateStagingImport::membershipType('Einzelmitgliedschaftsantrag'));
    }
}

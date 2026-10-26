<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Tests;

use PHPUnit\Framework\TestCase;
use SwissTRClub\Core\Integrations\Fairgate\FairgateVehicleNormalizer as N;

require_once dirname(__DIR__) . '/src/Forms/FormFields.php';
require_once dirname(__DIR__) . '/src/Integrations/Fairgate/FairgateVehicleNormalizer.php';

final class FairgateVehicleNormalizerTest extends TestCase
{
    private static function vehicle(array $input): array
    {
        $result = N::normalize($input);
        self::assertSame('vehicle', $result['result'], json_encode($input));
        return $result['input'];
    }

    public function testCatalogModelsStayUnchanged(): void
    {
        $v = self::vehicle(['model' => 'TR6', 'year' => '1972', 'details' => '']);
        self::assertSame('TR6', $v['model']);
        self::assertSame('', $v['details']);
        self::assertSame('TR6 PI', self::vehicle(['model' => 'tr6 pi'])['model']);
        self::assertSame('TR250', self::vehicle(['model' => 'TR250'])['model']);
    }

    public function testVariantsMapToCatalogAndKeepOriginal(): void
    {
        $v = self::vehicle(['model' => 'TR4A IRS', 'details' => 'Overdrive']);
        self::assertSame('TR4A', $v['model']);
        self::assertSame('TR4A IRS · Overdrive', $v['details']);
        self::assertSame('TR6', self::vehicle(['model' => 'TR6 RHD'])['model']);
        self::assertSame('TR250', self::vehicle(['model' => 'TR250 US'])['model']);
    }

    public function testTr3FamilyIsNotGuessed(): void
    {
        $v = self::vehicle(['model' => 'TR3/A/B']);
        self::assertSame('TR3', $v['model']);
        self::assertStringContainsString('Untermodell unbekannt', $v['details']);
    }

    public function testSpitfireAndOtherTriumphsAreAndererTriumph(): void
    {
        self::assertSame('Anderer Triumph', self::vehicle(['model' => 'Spitfire'])['model']);
        $v = self::vehicle(['model' => 'Spitfire IV']);
        self::assertSame('Anderer Triumph', $v['model']);
        self::assertSame('Spitfire IV', $v['details']);
        self::assertSame('Anderer Triumph', self::vehicle(['model' => 'Triumph Herald'])['model']);
        self::assertSame('GT6', self::vehicle(['model' => 'GT6'])['model']);
    }

    public function testNoTrIsAMemberNoteNotAVehicle(): void
    {
        self::assertSame('no-tr', N::normalize(['model' => 'kein TR'])['result']);
        self::assertSame('no-tr', N::normalize(['model' => 'Kein TR mehr', 'details' => ''])['result']);
    }

    public function testUnknownYearMovesToNotes(): void
    {
        $v = self::vehicle(['model' => 'TR4', 'year' => '196?']);
        self::assertSame('', $v['year']);
        self::assertSame('Baujahr laut Fairgate: 196?', $v['notes']);
    }

    public function testEmptyTypeAndForeignCarsGoToReview(): void
    {
        self::assertSame('review', N::normalize(['model' => '', 'details' => 'rot'])['result']);
        self::assertSame('review', N::normalize(['model' => 'MGB'])['result']);
        self::assertSame('empty', N::normalize(['model' => '', 'year' => ''])['result']);
    }
}

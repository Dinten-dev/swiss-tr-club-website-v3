<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Tests;

use PHPUnit\Framework\TestCase;
use SwissTRClub\Core\Infrastructure\MacRomanRepair;

final class MacRomanRepairTest extends TestCase
{
    public function testRepairsMacRomanUmlauts(): void
    {
        self::assertSame('Münchenstein', MacRomanRepair::text("M\u{9F}nchenstein"));
        self::assertSame('Oberägeri', MacRomanRepair::text("Ober\u{8A}geri"));
        self::assertSame('Dürnten', MacRomanRepair::text("D\u{9F}rnten"));
        self::assertSame('Pfäffikon ZH', MacRomanRepair::text("Pf\u{8A}ffikon ZH"));
        self::assertSame('Genève', MacRomanRepair::text("Gen\u{8F}ve"));
    }

    public function testLeavesCorrectTextUntouched(): void
    {
        self::assertSame('Zürich · Genève', MacRomanRepair::text('Zürich · Genève'));
        self::assertSame('', MacRomanRepair::text(''));
    }
}

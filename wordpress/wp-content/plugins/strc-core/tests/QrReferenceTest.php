<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Tests;

use InvalidArgumentException;
use PHPUnit\Framework\TestCase;
use SwissTRClub\Core\Finance\QrReference;

final class QrReferenceTest extends TestCase
{
    public function testReferenceContainsExactlyTwentySevenDigits(): void
    {
        $reference = QrReference::fromInvoiceId(1, '42');

        self::assertSame('000000000000000000000004211', $reference);
        self::assertMatchesRegularExpression('/^\d{27}$/', $reference);
    }

    public function testReferenceUsesRecursiveModuloTenCheckDigit(): void
    {
        self::assertSame('000002100003139471430009014', QrReference::fromInvoiceId(313947143000901, '210000'));
    }

    public function testNormalizeRemovesFormatting(): void
    {
        self::assertSame('2100003139', QrReference::normalize('21 0000-3139'));
    }

    public function testInvoiceIdMustBePositive(): void
    {
        $this->expectException(InvalidArgumentException::class);
        QrReference::fromInvoiceId(0);
    }
}

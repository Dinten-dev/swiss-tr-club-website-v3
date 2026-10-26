<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Tests;

use PHPUnit\Framework\TestCase;
use SwissTRClub\Core\Finance\ClubDocument;
use SwissTRClub\Core\Finance\QrReference;

final class ClubDocumentReferenceTest extends TestCase
{
    public function testCheckDigitMatchesFairgateInvoice(): void
    {
        // Referenz einer echten Fairgate-Rechnung (Shop, CHF 49.00).
        self::assertSame('225480000000004380026004274', QrReference::withCheckDigit('22548000000000438002600427'));
    }

    public function testWebsiteReferencesUseTheirOwnRange(): void
    {
        $shop = ClubDocument::reference('shop', 12);
        $event = ClubDocument::reference('event', 7);
        self::assertSame('225480910000000000000000123', $shop);
        self::assertSame('225480920000000000000000079', $event);
        // Fairgate lässt Stelle 7 immer auf 0; die Website verwendet 9 → keine Überschneidung.
        self::assertSame('9', $shop[6]);
        self::assertSame(QrReference::withCheckDigit(substr($shop, 0, 26)), $shop);
    }

    public function testInvoiceNumbers(): void
    {
        self::assertSame('S-00012', ClubDocument::number('shop', 12));
        self::assertSame('E-00007', ClubDocument::number('event', 7));
    }
}

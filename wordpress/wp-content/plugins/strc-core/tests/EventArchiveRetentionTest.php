<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Tests;

use PHPUnit\Framework\TestCase;
use SwissTRClub\Core\Events\EventArchiveRetention;

final class EventArchiveRetentionTest extends TestCase
{
    public function testArchivedEventsRemainRecoverable(): void
    {
        $archivedAt = strtotime('2025-01-15 12:00:00 UTC');
        self::assertNull(EventArchiveRetention::deleteAfter($archivedAt));
        self::assertTrue(EventArchiveRetention::shouldRetain($archivedAt, strtotime('2035-01-01 UTC')));
    }

    public function testMissingArchiveTimestampFailsSafe(): void
    {
        self::assertNull(EventArchiveRetention::deleteAfter(0));
        self::assertTrue(EventArchiveRetention::shouldRetain(0, time()));
    }
}

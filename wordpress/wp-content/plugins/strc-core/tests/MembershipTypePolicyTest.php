<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Tests;

use PHPUnit\Framework\TestCase;
use SwissTRClub\Core\Members\MembershipTypePolicy;

final class MembershipTypePolicyTest extends TestCase
{
    public function testSupportsRequiredMembershipTypes(): void
    {
        self::assertSame(
            array('individual', 'couple_primary', 'couple_partner', 'youth'),
            array_keys(MembershipTypePolicy::labels())
        );
    }

    public function testNormalizesLegacyAndImportAliases(): void
    {
        self::assertSame('individual', MembershipTypePolicy::normalize('standard'));
        self::assertSame('couple_primary', MembershipTypePolicy::normalize('primary'));
        self::assertSame('couple_partner', MembershipTypePolicy::normalize('co-pilot'));
    }

    public function testRecognizesOnlyCoupleTypes(): void
    {
        self::assertTrue(MembershipTypePolicy::isCouple('couple_primary'));
        self::assertTrue(MembershipTypePolicy::isCouple('couple_partner'));
        self::assertFalse(MembershipTypePolicy::isCouple('individual'));
        self::assertFalse(MembershipTypePolicy::isAllowed('unknown'));
        self::assertTrue(MembershipTypePolicy::formsCouple('couple_primary', 'couple_partner'));
        self::assertFalse(MembershipTypePolicy::formsCouple('couple_primary', 'couple_primary'));
    }
}

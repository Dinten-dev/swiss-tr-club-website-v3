<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Tests;

use PHPUnit\Framework\TestCase;
use SwissTRClub\Core\Members\MembershipAccessPolicy;

final class MembershipAccessPolicyTest extends TestCase
{
    public function testOnlyActiveMembershipGrantsAccess(): void
    {
        self::assertTrue(MembershipAccessPolicy::grantsMemberAccess('active'));
        self::assertTrue(MembershipAccessPolicy::grantsMemberAccess('grace'));
        self::assertFalse(MembershipAccessPolicy::grantsMemberAccess('pending'));
        self::assertFalse(MembershipAccessPolicy::grantsMemberAccess('inactive'));
        self::assertFalse(MembershipAccessPolicy::grantsMemberAccess(null));
    }

    public function testPublishingCapabilitiesAreRestricted(): void
    {
        self::assertContains('strc_access_member_area', MembershipAccessPolicy::restrictedCapabilities());
        self::assertContains('publish_strc_ads', MembershipAccessPolicy::restrictedCapabilities());
        self::assertContains('publish_strc_topics', MembershipAccessPolicy::restrictedCapabilities());
    }
}

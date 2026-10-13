<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Tests;

use PHPUnit\Framework\TestCase;
use SwissTRClub\Core\Shop\ShopAccessPolicy;

final class ShopAccessPolicyTest extends TestCase
{
    public function testShopAreaIsRequiredForModeratorManagement(): void
    {
        self::assertTrue(ShopAccessPolicy::canManage(false, false, true, true, array('shop')));
        self::assertFalse(ShopAccessPolicy::canManage(false, false, true, true, array('events')));
        self::assertFalse(ShopAccessPolicy::canManage(false, false, false, true, array('shop')));
        self::assertTrue(ShopAccessPolicy::canManage(false, true, false, false, array()));
    }

    public function testMembersAndGuestsCanUseConfiguredPaymentMethods(): void
    {
        self::assertTrue(ShopAccessPolicy::canPurchase(true, true));
        self::assertTrue(ShopAccessPolicy::canPurchase(false, true));
        self::assertTrue(ShopAccessPolicy::canPurchase(false, false, true));
        self::assertFalse(ShopAccessPolicy::canPurchase(false, false, false));
        self::assertFalse(ShopAccessPolicy::canPurchase(true, false));
    }

    public function testUnrelatedUsersDoNotReceiveProductCapabilities(): void
    {
        $original = array('read' => true);
        self::assertSame($original, ShopAccessPolicy::withProductCapabilities($original, false));
        self::assertTrue(ShopAccessPolicy::withProductCapabilities($original, true)['edit_products']);
    }
}

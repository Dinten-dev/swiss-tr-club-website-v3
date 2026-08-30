<?php

declare(strict_types=1);

namespace SwissTRClub\Core;

use SwissTRClub\Core\Admin\SystemStatusPage;
use SwissTRClub\Core\Content\ContentPostTypes;
use SwissTRClub\Core\Dashboard\DashboardShortcode;
use SwissTRClub\Core\Events\EventPostType;
use SwissTRClub\Core\Roles\RoleManager;

final class Plugin
{
    private static bool $booted = false;

    public static function boot(): void
    {
        if (self::$booted) {
            return;
        }

        self::$booted = true;

        (new RoleManager())->registerHooks();
        (new EventPostType())->registerHooks();
        (new ContentPostTypes())->registerHooks();
        (new DashboardShortcode())->registerHooks();
        (new SystemStatusPage())->registerHooks();
    }
}

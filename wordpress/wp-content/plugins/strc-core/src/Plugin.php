<?php

declare(strict_types=1);

namespace SwissTRClub\Core;

use SwissTRClub\Core\Admin\FairgateAdministrationPage;
use SwissTRClub\Core\Admin\SystemStatusPage;
use SwissTRClub\Core\Content\ContentPostTypes;
use SwissTRClub\Core\Dashboard\DashboardShortcode;
use SwissTRClub\Core\Events\EventPostType;
use SwissTRClub\Core\Events\EventPublicEndpoint;
use SwissTRClub\Core\Mail\MailConfiguration;
use SwissTRClub\Core\Integrations\Fairgate\FairgateConfiguration;
use SwissTRClub\Core\Members\MemberProfileFields;
use SwissTRClub\Core\Members\MemberSessionEndpoint;
use SwissTRClub\Core\Members\MembershipAccessGuard;
use SwissTRClub\Core\Members\MembershipRepository;
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
        (new EventPublicEndpoint())->registerHooks();
        (new ContentPostTypes())->registerHooks();
        (new DashboardShortcode())->registerHooks();
        $fairgate = FairgateConfiguration::fromConstants();
        (new SystemStatusPage($fairgate))->registerHooks();
        (new FairgateAdministrationPage($fairgate))->registerHooks();
        (new MemberProfileFields())->registerHooks();
        (new MailConfiguration())->registerHooks();

        $memberships = new MembershipRepository();
        (new MembershipAccessGuard($memberships))->registerHooks();
        (new MemberSessionEndpoint($memberships))->registerHooks();
    }
}

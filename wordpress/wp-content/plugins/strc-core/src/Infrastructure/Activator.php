<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Infrastructure;

use SwissTRClub\Core\Content\ContentPostTypes;
use SwissTRClub\Core\Events\EventPostType;
use SwissTRClub\Core\Roles\RoleManager;

final class Activator
{
    public static function activate(): void
    {
        RoleManager::install();
        Schema::install();

        $events = new EventPostType();
        $events->register();
        $events->seedTaxonomies();
        (new ContentPostTypes())->register();

        update_option('strc_core_version', STRC_CORE_VERSION, false);
        flush_rewrite_rules();
    }
}

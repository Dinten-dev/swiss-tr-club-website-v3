<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Members;

final class MembershipAccessPolicy
{
    /** @return list<string> */
    public static function restrictedCapabilities(): array
    {
        return array(
            'strc_access_member_area',
            'strc_manage_own_profile',
            'strc_manage_own_vehicles',
            'strc_register_for_events',
            'edit_strc_ads',
            'publish_strc_ads',
            'delete_strc_ads',
            'edit_strc_topics',
            'publish_strc_topics',
            'delete_strc_topics',
        );
    }

    public static function grantsMemberAccess(?string $status): bool
    {
        return in_array($status, array('active', 'grace'), true);
    }
}

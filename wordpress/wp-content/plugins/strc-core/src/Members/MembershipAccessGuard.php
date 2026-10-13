<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Members;

use WP_User;

final class MembershipAccessGuard
{
    public function __construct(private readonly MembershipRepository $memberships)
    {
    }

    public function registerHooks(): void
    {
        add_filter('user_has_cap', array($this, 'filterCapabilities'), 20, 4);
    }

    /**
     * @param array<string, bool> $allCapabilities
     * @param list<string> $requiredCapabilities
     * @param array<int, mixed> $arguments
     * @return array<string, bool>
     */
    public function filterCapabilities(array $allCapabilities, array $requiredCapabilities, array $arguments, WP_User $user): array
    {
        unset($requiredCapabilities, $arguments);

        $functionalRoles = array_merge(array_diff(array_keys(\SwissTRClub\Core\Roles\RoleDefinitions::assignable()), array('strc_developer')), array('strc_moderator'));
        $hasMemberRole = in_array('strc_member', $user->roles, true);
        if (! $hasMemberRole && ! array_intersect($functionalRoles, $user->roles)) {
            return $allCapabilities;
        }
        if ($hasMemberRole && MembershipAccessPolicy::grantsMemberAccess($this->memberships->statusForUser($user->ID))) {
            return $allCapabilities;
        }

        foreach (MembershipAccessPolicy::restrictedCapabilities() as $capability) {
            $allCapabilities[$capability] = false;
        }

        return $allCapabilities;
    }
}

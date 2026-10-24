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
        // A reviewed Fairgate link is a membership, even when this account also serves as webmaster.
        // Never link by email here and never grant any administrative or functional role.
        if (! $hasMemberRole) {
            $membership = $this->memberships->findForUser($user->ID);
            $contact = (string) get_user_meta($user->ID, 'strc_fairgate_contact_id', true);
            $reviewed = (string) get_user_meta($user->ID, 'strc_fairgate_verified_existing_user', true) === (string) $user->ID;
            $imported = $user->user_login === 'strc_fg_'.$contact;
            if ($membership && MembershipAccessPolicy::grantsMemberAccess($membership['status'])
                && preg_match('/^[1-9][0-9]*$/D', $contact)
                && (string) $membership['fairgate_contact_id'] === $contact
                && get_user_meta($user->ID, 'strc_fairgate_import_source', true) === 'fairgate-readonly'
                && ($reviewed || $imported)) {
                return array_merge($allCapabilities, \SwissTRClub\Core\Roles\RoleDefinitions::all()['strc_member']['capabilities']);
            }
        }
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

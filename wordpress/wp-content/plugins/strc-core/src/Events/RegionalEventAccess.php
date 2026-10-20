<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Events;

final class RegionalEventAccess
{
    public static function isGlobal(): bool
    {
        return current_user_can('strc_manage_events') || \SwissTRClub\Core\Editorial\EditorialAccess::area('events');
    }

    public static function isOrganiser(): bool
    {
        return current_user_can('strc_access_member_area') && current_user_can('strc_manage_assigned_events');
    }

    /** @return list<int> */
    public static function assignedEvents(?int $userId = null): array
    {
        $stored = \SwissTRClub\Core\Roles\RoleAssignments::events($userId ?? get_current_user_id());
        if (! is_array($stored)) return array();
        return array_values(array_filter(array_unique(array_map('absint', $stored)), static fn (int $id): bool => 'strc_event' === get_post_type($id)));
    }

    /** @return list<int> */
    public static function regions(?int $userId = null): array
    {
        $stored = \SwissTRClub\Core\Roles\RoleAssignments::regions($userId ?? get_current_user_id());
        if (! is_array($stored)) {
            return array();
        }
        return array_values(array_filter(array_unique(array_map('absint', $stored)), static function (int $id): bool {
            return RegionDirectory::visibleTerm($id);
        }));
    }

    public static function canManage(): bool
    {
        return self::isGlobal() || self::isOrganiser() || (current_user_can('strc_access_member_area') && count(self::regions()) > 0);
    }

    public static function canEdit(int $postId): bool
    {
        if ('strc_event' !== get_post_type($postId)) {
            return false;
        }
        if (self::isGlobal()) {
            return true;
        }
        if (self::isOrganiser() && in_array($postId, self::assignedEvents(), true)) return true;
        if (! self::canManage()) {
            return false;
        }
        $regions = wp_get_object_terms($postId, 'strc_region', array('fields' => 'ids'));
        $scopes = wp_get_object_terms($postId, 'strc_event_scope', array('fields' => 'slugs'));
        return ! is_wp_error($regions) && ! is_wp_error($scopes)
            && array('region') === $scopes && 1 === count($regions)
            && in_array((int) $regions[0], self::regions(), true);
    }

    public function registerHooks(): void
    {
        add_action('show_user_profile', array($this, 'renderProfile'));
        add_action('edit_user_profile', array($this, 'renderProfile'));
        add_action('personal_options_update', array($this, 'saveProfile'));
        add_action('edit_user_profile_update', array($this, 'saveProfile'));
    }

    public function renderProfile(\WP_User $user): void
    {
        if (! self::isGlobal() || ! current_user_can('edit_user', $user->ID)) {
            return;
        }
        if(\SwissTRClub\Core\Roles\RoleAssignments::scoped((int)$user->ID)){echo '<h2>Regionale Agenda-Verwaltung</h2><p>Funktionszuständigkeiten verwaltest du unter Rollen und Zuständigkeiten in der Redaktion.</p>';return;}
        echo '<h2>Regionale Agenda-Verwaltung</h2><p>Mit aktivem Mitgliederzugang darf diese Person die Termine der gewählten Regionen verwalten.</p>';
        wp_nonce_field('strc_regions_' . $user->ID, 'strc_regions_nonce');
        $regions = RegionDirectory::terms();
        foreach ($regions as $region) {
            echo '<label style="display:block"><input type="checkbox" name="strc_managed_regions[]" value="' . esc_attr((string) $region->term_id) . '" ' . checked(in_array((int) $region->term_id, self::regions($user->ID), true), true, false) . '> ' . esc_html($region->name) . '</label>';
        }
    }

    public function saveProfile(int $userId): void
    {
        if (! self::isGlobal() || ! current_user_can('edit_user', $userId)) {
            return;
        }
        if(\SwissTRClub\Core\Roles\RoleAssignments::scoped($userId)){if(isset($_POST['strc_regions_nonce']))wp_die('Zuständigkeiten bitte über die Rollenverwaltung ändern.','Zuweisung geändert',['response'=>409]);return;}
        $nonce = $_POST['strc_regions_nonce'] ?? '';
        if (! is_string($nonce) || ! wp_verify_nonce(wp_unslash($nonce), 'strc_regions_' . $userId)) {
            return;
        }
        $ids = $_POST['strc_managed_regions'] ?? array();
        if (! is_array($ids) || array_filter($ids, 'is_array')) {
            return;
        }
        update_user_meta($userId, 'strc_managed_regions', array_values(array_unique(array_filter(array_map('absint', $ids), static fn (int $id): bool => RegionDirectory::visibleTerm($id)))));
    }
}

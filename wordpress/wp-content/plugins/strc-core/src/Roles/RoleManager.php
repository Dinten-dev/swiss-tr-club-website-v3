<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Roles;

use SwissTRClub\Core\Infrastructure\Schema;

final class RoleManager
{
    private const ROLE_VERSION = '20261021-1';

    public function registerHooks(): void
    {
        add_action('admin_init', array($this, 'upgradeIfRequired'));
    }

    public function upgradeIfRequired(): void
    {
        $schemaRequired = get_option('strc_core_version') !== STRC_CORE_VERSION;
        $rolesRequired = get_option('strc_roles_version') !== self::ROLE_VERSION;
        if (! $schemaRequired && ! $rolesRequired) {
            return;
        }

        self::install();
        if ($schemaRequired) {
            Schema::install();
            update_option('strc_core_version', STRC_CORE_VERSION, false);
        }
        if ($rolesRequired) update_option('strc_roles_version', self::ROLE_VERSION, false);
    }

    public static function install(): void
    {
        $managed = array_merge(RoleDefinitions::allManagedCapabilities(), RoleDefinitions::platformCapabilities(), array('strc_access_board_documents' => true));
        foreach (RoleDefinitions::all() as $slug => $definition) {
            $role = get_role($slug);
            if (! $role) {
                add_role($slug, $definition['name'], $definition['capabilities']);
                continue;
            }
            foreach ($definition['capabilities'] as $capability => $granted) {
                if ($granted) $role->add_cap($capability);
            }
            // Rechte, die eine Rolle laut Definition nicht (mehr) hat, werden entfernt, z. B. Mitgliederverwaltung beim Admin.
            if (! in_array($slug, RoleDefinitions::LEGACY_ADMIN_ROLES, true)) {
                foreach (array_keys($role->capabilities) as $capability) {
                    if (isset($managed[$capability]) && empty($definition['capabilities'][$capability])) $role->remove_cap($capability);
                }
            }
        }

        // Content administrators cannot turn themselves into technical administrators.
        foreach (RoleDefinitions::ADMIN_ROLES as $slug) {
            $contentAdmin = get_role($slug);
            if ($contentAdmin) foreach (array('create_users','promote_users','delete_users','remove_users') as $capability) $contentAdmin->remove_cap($capability);
        }

        // WordPress-Administratoren sind technisch zuständig (Webmaster): keine Fach- und Redaktionsrechte des Clubs.
        $administrator = get_role('administrator');
        if ($administrator) {
            foreach (array_keys(RoleDefinitions::operationalCapabilities()) as $capability) {
                if (str_starts_with($capability, 'strc_') || str_contains($capability, '_strc_')) $administrator->remove_cap($capability);
            }
            $administrator->remove_cap('strc_access_board_documents');
            foreach (array_keys(RoleDefinitions::platformCapabilities()) as $capability) $administrator->add_cap($capability);
        }

        self::migrateLegacyAdmins();
    }

    /** Frühere Rollen «Redaktor» / «Administrator / Editor» werden zu «Admin». */
    private static function migrateLegacyAdmins(): void
    {
        foreach (get_users(array('role__in' => RoleDefinitions::LEGACY_ADMIN_ROLES, 'fields' => 'all')) as $user) {
            $user->add_role('strc_administrator');
            foreach (RoleDefinitions::LEGACY_ADMIN_ROLES as $legacy) $user->remove_role($legacy);
            $rows = get_user_meta($user->ID, RoleAssignments::KEY, true);
            if (is_array($rows)) {
                $clean = array(); $seen = array();
                foreach ($rows as $row) {
                    if (! is_array($row) || ! isset($row['role'])) continue;
                    if (in_array($row['role'], RoleDefinitions::LEGACY_ADMIN_ROLES, true)) $row['role'] = 'strc_administrator';
                    if (isset($seen[$row['role']])) continue;
                    $seen[$row['role']] = true; $clean[] = $row;
                }
                update_user_meta($user->ID, RoleAssignments::KEY, $clean);
            }
            update_user_meta($user->ID, 'strc_role_migration_20261021', array('from' => 'legacy-admin', 'at' => gmdate(DATE_ATOM)));
        }
    }
}

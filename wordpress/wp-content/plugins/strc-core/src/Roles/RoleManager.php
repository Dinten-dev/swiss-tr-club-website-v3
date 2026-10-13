<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Roles;

use SwissTRClub\Core\Infrastructure\Schema;

final class RoleManager
{
    private const ROLE_VERSION = '20261011-1';

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
        foreach (RoleDefinitions::all() as $slug => $definition) {
            $role = get_role($slug);

            if (! $role) {
                add_role($slug, $definition['name'], $definition['capabilities']);
                continue;
            }

            foreach ($definition['capabilities'] as $capability => $granted) {
                if ($granted) {
                    $role->add_cap($capability);
                }
            }
        }

        // Content administrators cannot turn themselves into technical administrators.
        $contentAdmin = get_role('strc_administrator');
        if ($contentAdmin) {
            foreach (array('create_users','promote_users','delete_users','remove_users') as $capability) $contentAdmin->remove_cap($capability);
        }

        $administrator = get_role('administrator');
        if (! $administrator) {
            return;
        }

        foreach (RoleDefinitions::allManagedCapabilities() as $capability => $granted) {
            if ($granted) {
                $administrator->add_cap($capability);
            }
        }

        $developer = get_role('strc_developer');
        if (! $developer) {
            return;
        }

        $developer->remove_cap('strc_access_board_documents');
        foreach ($administrator->capabilities as $capability => $granted) {
            if($capability==='strc_access_board_documents')continue;
            if ($granted) {
                $developer->add_cap($capability);
            }
        }
    }
}

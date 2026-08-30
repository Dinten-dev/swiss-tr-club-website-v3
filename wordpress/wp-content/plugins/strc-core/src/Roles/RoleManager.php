<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Roles;

use SwissTRClub\Core\Infrastructure\Schema;

final class RoleManager
{
    public function registerHooks(): void
    {
        add_action('admin_init', array($this, 'upgradeIfRequired'));
    }

    public function upgradeIfRequired(): void
    {
        if (get_option('strc_core_version') === STRC_CORE_VERSION) {
            return;
        }

        self::install();
        Schema::install();
        update_option('strc_core_version', STRC_CORE_VERSION, false);
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

        foreach ($administrator->capabilities as $capability => $granted) {
            if ($granted) {
                $developer->add_cap($capability);
            }
        }
    }
}

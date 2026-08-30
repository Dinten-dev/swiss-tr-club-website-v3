<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Roles;

final class RoleDefinitions
{
    /** @return array<string, array{name: string, capabilities: array<string, bool>}> */
    public static function all(): array
    {
        $roles = self::baseRoles();
        $roles['strc_developer'] = array(
            'name' => 'STRC Developer',
            'capabilities' => array_merge(
                self::caps('read', 'manage_options', 'edit_theme_options', 'activate_plugins', 'install_plugins', 'update_plugins', 'delete_plugins', 'list_users', 'edit_users', 'upload_files', 'strc_manage_platform'),
                self::allManagedCapabilities()
            ),
        );

        return $roles;
    }

    /** @return array<string, bool> */
    public static function allManagedCapabilities(): array
    {
        $capabilities = array();

        foreach (self::baseRoles() as $role) {
            $capabilities = array_merge($capabilities, $role['capabilities']);
        }

        return array_merge(
            $capabilities,
            self::caps(
                'edit_others_strc_events', 'delete_others_strc_events', 'delete_private_strc_events', 'delete_published_strc_events', 'edit_private_strc_events', 'edit_published_strc_events',
                'edit_others_strc_drives', 'delete_others_strc_drives', 'delete_private_strc_drives', 'delete_published_strc_drives', 'edit_private_strc_drives', 'edit_published_strc_drives',
                'edit_others_strc_ads', 'delete_others_strc_ads', 'edit_others_strc_topics', 'delete_others_strc_topics', 'strc_manage_platform'
            )
        );
    }

    /** @return array<string, array{name: string, capabilities: array<string, bool>}> */
    private static function baseRoles(): array
    {
        return array(
            'strc_member' => array(
                'name' => 'STRC Nutzer',
                'capabilities' => self::caps(
                    'read', 'strc_access_member_area', 'strc_manage_own_profile', 'strc_manage_own_vehicles', 'strc_register_for_events',
                    'edit_strc_ads', 'publish_strc_ads', 'delete_strc_ads',
                    'edit_strc_topics', 'publish_strc_topics', 'delete_strc_topics'
                ),
            ),
            'strc_editor' => array(
                'name' => 'STRC Redaktor',
                'capabilities' => self::caps('read', 'upload_files', 'edit_posts', 'edit_others_posts', 'edit_published_posts', 'publish_posts', 'delete_posts', 'delete_published_posts', 'strc_edit_website_content'),
            ),
            'strc_administrator' => array(
                'name' => 'STRC Administrator',
                'capabilities' => self::caps(
                    'read', 'upload_files', 'list_users', 'create_users', 'edit_users', 'promote_users', 'delete_users', 'remove_users',
                    'edit_strc_events', 'publish_strc_events', 'delete_strc_events', 'read_private_strc_events', 'edit_others_strc_events', 'delete_others_strc_events', 'edit_private_strc_events', 'delete_private_strc_events', 'edit_published_strc_events', 'delete_published_strc_events',
                    'edit_strc_drives', 'publish_strc_drives', 'delete_strc_drives', 'read_private_strc_drives', 'edit_others_strc_drives', 'delete_others_strc_drives', 'edit_private_strc_drives', 'delete_private_strc_drives', 'edit_published_strc_drives', 'delete_published_strc_drives',
                    'strc_manage_events', 'strc_manage_drives', 'strc_manage_members', 'strc_manage_finance', 'strc_send_bulk_mail'
                ),
            ),
        );
    }

    /** @return array<string, bool> */
    private static function caps(string ...$capabilities): array
    {
        return array_fill_keys($capabilities, true);
    }
}

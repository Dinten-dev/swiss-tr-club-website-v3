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
            'name' => 'STRC Webmaster',
            'capabilities' => array_merge(
                self::caps('read', 'manage_options', 'edit_theme_options', 'activate_plugins', 'install_plugins', 'update_plugins', 'delete_plugins', 'list_users', 'edit_users', 'upload_files', 'strc_manage_platform'),
                self::allManagedCapabilities()
            ),
        );

        return $roles;
    }

    /** Functional responsibilities from Appendix B; the Member role is retained separately. */
    public static function assignable(): array
    {
        $roles = self::all();
        $slugs = array(
            'strc_registration_moderator', 'strc_event_organiser', 'strc_regional_manager',
            'strc_forum_moderator', 'strc_gallery_moderator', 'strc_marketplace_moderator',
            'strc_library_administrator', 'strc_shop_manager', 'strc_treasurer',
            'strc_administrator_editor', 'strc_board_member', 'strc_developer',
        );
        return array_intersect_key($roles, array_fill_keys($slugs, true));
    }

    /** Operational admins may assign club functions including the board role, never platform access. */
    public static function assignableFor(bool $canManagePlatform): array
    {
        $roles = self::assignable();
        if (! $canManagePlatform) {
            // Die Rolle Vorstand teilen die Administratoren zu; Webmaster-Konten bleiben dem Webmaster vorbehalten.
            unset($roles['strc_developer']);
        }
        return $roles;
    }

    /** @return array<string, bool> */
    public static function allManagedCapabilities(): array
    {
        $capabilities = array();

        foreach (self::baseRoles() as $role) {
            $capabilities = array_merge($capabilities, $role['capabilities']);
        }
        unset($capabilities['strc_access_board_documents']);

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
            'strc_moderator' => array(
                'name' => 'STRC Moderator',
                'capabilities' => self::caps('read', 'strc_access_member_area', 'strc_moderate'),
            ),
            'strc_registration_moderator' => array(
                'name' => 'STRC Registration Moderator',
                'capabilities' => self::caps('read', 'strc_manage_members'),
            ),
            'strc_event_organiser' => array(
                'name' => 'STRC Event Organiser',
                'capabilities' => self::caps('read', 'strc_manage_assigned_events'),
            ),
            'strc_regional_manager' => array(
                'name' => 'STRC Regional Manager',
                'capabilities' => self::caps('read'),
            ),
            'strc_forum_moderator' => array(
                'name' => 'STRC Forum Moderator',
                'capabilities' => self::caps('read', 'strc_moderate', 'strc_forum_moderator'),
            ),
            'strc_gallery_moderator' => array(
                'name' => 'STRC Gallery Moderator',
                'capabilities' => self::caps('read', 'strc_moderate', 'strc_gallery_moderator'),
            ),
            'strc_marketplace_moderator' => array(
                'name' => 'STRC Marketplace Moderator',
                'capabilities' => self::caps('read', 'strc_moderate', 'strc_marketplace_moderator'),
            ),
            'strc_library_administrator' => array(
                'name' => 'STRC Library Administrator',
                'capabilities' => self::caps('read', 'strc_manage_library'),
            ),
            'strc_shop_manager' => array(
                'name' => 'STRC Shop Manager',
                'capabilities' => self::caps('read', 'strc_manage_shop'),
            ),
            'strc_treasurer' => array(
                'name' => 'STRC Treasurer',
                'capabilities' => self::caps('read', 'strc_manage_finance'),
            ),
            'strc_administrator_editor' => array(
                'name' => 'STRC Administrator / Editor',
                'capabilities' => self::caps('read', 'upload_files', 'edit_posts', 'edit_others_posts', 'edit_published_posts', 'publish_posts', 'delete_posts', 'delete_published_posts', 'strc_edit_website_content'),
            ),
            'strc_board_member' => array(
                'name' => 'STRC Board Member',
                'capabilities' => self::caps('read', 'strc_access_board_documents'),
            ),
            'strc_editor' => array(
                'name' => 'STRC Redaktor',
                'capabilities' => self::caps('read', 'upload_files', 'edit_posts', 'edit_others_posts', 'edit_published_posts', 'publish_posts', 'delete_posts', 'delete_published_posts', 'strc_edit_website_content'),
            ),
            'strc_administrator' => array(
                'name' => 'STRC Administrator',
                'capabilities' => self::caps(
                    'edit_strc_ads', 'publish_strc_ads', 'delete_strc_ads', 'strc_edit_website_content', 'strc_manage_content_roles', 'strc_manage_member_welcome_mail', 'edit_posts', 'edit_others_posts', 'edit_published_posts', 'publish_posts',
                    'read', 'upload_files', 'list_users', 'edit_users',
                    'edit_strc_events', 'publish_strc_events', 'delete_strc_events', 'read_private_strc_events', 'edit_others_strc_events', 'delete_others_strc_events', 'edit_private_strc_events', 'delete_private_strc_events', 'edit_published_strc_events', 'delete_published_strc_events',
                    'edit_strc_drives', 'publish_strc_drives', 'delete_strc_drives', 'read_private_strc_drives', 'edit_others_strc_drives', 'delete_others_strc_drives', 'edit_private_strc_drives', 'delete_private_strc_drives', 'edit_published_strc_drives', 'delete_published_strc_drives',
                    'strc_access_member_area', 'strc_manage_community', 'strc_manage_events', 'strc_manage_drives', 'strc_manage_members', 'strc_manage_finance', 'strc_send_bulk_mail'
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

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
                self::caps('read', 'manage_options', 'edit_theme_options', 'activate_plugins', 'install_plugins', 'update_plugins', 'delete_plugins', 'list_users', 'edit_users', 'upload_files'),
                self::platformCapabilities()
            ),
        );

        return $roles;
    }

    /**
     * Rollenhierarchie des Clubs:
     * Webmaster (nur Technik) · Superadmin (alle Admin-Rechte, ernennt Admins) · Admin (volle Administration)
     * · Moderatoren (Fachrollen im zugeteilten Bereich) · Mitglieder. Vorstand ist eine Dokumentstufe.
     * Mitgliederverwaltung und Kassier sind exklusiv: Admins erhalten diese Rechte nur mit der Rolle.
     */
    public const MODERATOR_ROLES = array(
        'strc_registration_moderator', 'strc_agenda_moderator', 'strc_event_organiser', 'strc_regional_manager',
        'strc_forum_moderator', 'strc_gallery_moderator', 'strc_marketplace_moderator',
        'strc_library_administrator', 'strc_shop_manager', 'strc_treasurer',
    );
    public const ADMIN_ROLES = array('strc_administrator', 'strc_superadmin');
    public const PLATFORM_ROLES = array('strc_superadmin', 'strc_developer');
    /** Frühere Admin-/Redaktionsrollen; ihre Konten werden beim Update zu «Admin». */
    public const LEGACY_ADMIN_ROLES = array('strc_administrator_editor', 'strc_editor');

    /** Alle zuteilbaren Rollen (Moderatoren, Vorstand, Admin, Superadmin, Webmaster). */
    public static function assignable(): array
    {
        $slugs = array_merge(self::MODERATOR_ROLES, array('strc_board_member', 'strc_administrator', 'strc_superadmin', 'strc_developer'));
        return array_intersect_key(self::all(), array_fill_keys($slugs, true));
    }

    /**
     * Was eine Person zuteilen darf:
     * Webmaster → Superadmin und Webmaster; Superadmin → Admin, Moderatoren, Vorstand; Admin → Moderatoren, Vorstand.
     */
    public static function assignableBy(bool $platform, bool $superadmin, bool $admin): array
    {
        $slugs = array();
        if ($admin || $superadmin) $slugs = array_merge(self::MODERATOR_ROLES, array('strc_board_member'));
        if ($superadmin) $slugs[] = 'strc_administrator';
        if ($platform) $slugs = array_merge($slugs, self::PLATFORM_ROLES);
        return array_intersect_key(self::assignable(), array_fill_keys($slugs, true));
    }

    /** Rückwärtskompatibel: true = Webmaster. */
    public static function assignableFor(bool $canManagePlatform): array
    {
        return $canManagePlatform ? self::assignableBy(true, false, false) : self::assignableBy(false, false, true);
    }

    /** Technische Rechte des Webmasters (und der WordPress-Administratoren): keine Fach- oder Redaktionsrechte. */
    public static function platformCapabilities(): array
    {
        return self::caps('read', 'strc_manage_platform', 'strc_assign_superadmin');
    }

    /** Fach- und Redaktionsrechte, die WordPress-Administratoren und Webmaster nicht mehr automatisch erhalten. */
    public static function operationalCapabilities(): array
    {
        $capabilities = self::allManagedCapabilities();
        foreach (array_keys(self::platformCapabilities()) as $capability) unset($capabilities[$capability]);
        return $capabilities;
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
                'edit_others_strc_ads', 'delete_others_strc_ads', 'edit_others_strc_topics', 'delete_others_strc_topics', 'strc_manage_platform', 'strc_assign_superadmin'
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
                'capabilities' => self::caps('read', 'strc_manage_members', 'strc_manage_member_welcome_mail'),
            ),
            'strc_agenda_moderator' => array(
                'name' => 'STRC Agenda-Moderator',
                'capabilities' => self::caps('read', 'strc_agenda_moderator'),
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
            // Externer Speditionsdienstleister: kein Mitglied, sieht nur Versandaufträge und Lager unter «Mein Konto».
            'strc_shipping_partner' => array(
                'name' => 'STRC Versandpartner',
                'capabilities' => self::caps('read', 'strc_shipping'),
            ),
            'strc_board_member' => array(
                'name' => 'STRC Board Member',
                'capabilities' => self::caps('read', 'strc_access_board_documents'),
            ),
            'strc_editor' => array(
                'name' => 'STRC Redaktor',
                'capabilities' => self::caps('read', 'upload_files', 'edit_posts', 'edit_others_posts', 'edit_published_posts', 'publish_posts', 'delete_posts', 'delete_published_posts', 'strc_edit_website_content'),
            ),
            // Admin: volle Administration ohne Mitgliederverwaltung und Kassier (exklusive Fachrollen).
            'strc_administrator' => array(
                'name' => 'STRC Admin',
                'capabilities' => self::caps(
                    'edit_strc_ads', 'publish_strc_ads', 'delete_strc_ads', 'strc_edit_website_content', 'strc_manage_content_roles', 'edit_posts', 'edit_others_posts', 'edit_published_posts', 'publish_posts', 'delete_posts', 'delete_published_posts',
                    'read', 'upload_files', 'list_users', 'edit_users',
                    'edit_strc_events', 'publish_strc_events', 'delete_strc_events', 'read_private_strc_events', 'edit_others_strc_events', 'delete_others_strc_events', 'edit_private_strc_events', 'delete_private_strc_events', 'edit_published_strc_events', 'delete_published_strc_events',
                    'edit_strc_drives', 'publish_strc_drives', 'delete_strc_drives', 'read_private_strc_drives', 'edit_others_strc_drives', 'delete_others_strc_drives', 'edit_private_strc_drives', 'delete_private_strc_drives', 'edit_published_strc_drives', 'delete_published_strc_drives',
                    'edit_others_strc_ads', 'delete_others_strc_ads', 'edit_others_strc_topics', 'delete_others_strc_topics',
                    'strc_access_member_area', 'strc_manage_community', 'strc_moderate', 'strc_forum_moderator', 'strc_gallery_moderator', 'strc_marketplace_moderator', 'strc_manage_library', 'strc_manage_shop', 'strc_manage_events', 'strc_manage_drives', 'strc_send_bulk_mail'
                ),
            ),
            // Superadmin (Redaktor): alle Admin-Rechte und ernennt die Admins; keine Webmasterbefugnis.
            'strc_superadmin' => array(
                'name' => 'STRC Superadmin',
                'capabilities' => self::caps(
                    'edit_strc_ads', 'publish_strc_ads', 'delete_strc_ads', 'strc_edit_website_content', 'strc_manage_content_roles', 'edit_posts', 'edit_others_posts', 'edit_published_posts', 'publish_posts', 'delete_posts', 'delete_published_posts',
                    'read', 'upload_files', 'list_users', 'edit_users',
                    'edit_strc_events', 'publish_strc_events', 'delete_strc_events', 'read_private_strc_events', 'edit_others_strc_events', 'delete_others_strc_events', 'edit_private_strc_events', 'delete_private_strc_events', 'edit_published_strc_events', 'delete_published_strc_events',
                    'edit_strc_drives', 'publish_strc_drives', 'delete_strc_drives', 'read_private_strc_drives', 'edit_others_strc_drives', 'delete_others_strc_drives', 'edit_private_strc_drives', 'delete_private_strc_drives', 'edit_published_strc_drives', 'delete_published_strc_drives',
                    'edit_others_strc_ads', 'delete_others_strc_ads', 'edit_others_strc_topics', 'delete_others_strc_topics',
                    'strc_access_member_area', 'strc_manage_community', 'strc_moderate', 'strc_forum_moderator', 'strc_gallery_moderator', 'strc_marketplace_moderator', 'strc_manage_library', 'strc_manage_shop', 'strc_manage_events', 'strc_manage_drives', 'strc_send_bulk_mail', 'strc_assign_admins'
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

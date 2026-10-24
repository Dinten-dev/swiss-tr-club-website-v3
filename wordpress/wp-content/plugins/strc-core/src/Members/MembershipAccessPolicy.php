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
            'strc_manage_members',
            'strc_manage_assigned_events',
            'strc_agenda_moderator',
            'strc_forum_moderator',
            'strc_gallery_moderator',
            'strc_marketplace_moderator',
            'strc_manage_library',
            'strc_manage_shop',
            'strc_manage_finance',
            'strc_access_board_documents',
            'strc_moderate',
            'strc_edit_website_content',
            'strc_manage_content_roles',
            'strc_assign_admins',
            'strc_manage_events',
            'strc_manage_drives',
            'strc_manage_community',
            'strc_send_bulk_mail',
            'edit_posts',
            'edit_others_posts',
            'edit_published_posts',
            'publish_posts',
            'delete_posts',
            'delete_published_posts',
            'upload_files',
            'edit_products',
            'publish_products',
            'read_private_products',
            'delete_products',
            'assign_product_terms',
            'edit_product_terms',
            'manage_product_terms',
            'delete_product_terms',
        );
    }

    public static function grantsMemberAccess(?string $status): bool
    {
        return in_array($status, array('active', 'grace'), true);
    }
}

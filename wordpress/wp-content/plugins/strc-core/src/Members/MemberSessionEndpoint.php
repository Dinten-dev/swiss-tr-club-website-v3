<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Members;

final class MemberSessionEndpoint
{
    public function __construct(private readonly MembershipRepository $memberships)
    {
    }

    public function registerHooks(): void
    {
        add_action('wp_ajax_strc_session', array($this, 'respond'));
        add_action('wp_ajax_nopriv_strc_session', array($this, 'respond'));
    }

    public function respond(): void
    {
        $this->sendCorsHeaders();
        nocache_headers();

        if (! is_user_logged_in()) {
            wp_send_json(array('authenticated' => false, 'memberAccess' => false));
        }

        $user = wp_get_current_user();
        $membership = $this->memberships->findForUser($user->ID);
        $memberAccess = current_user_can('strc_access_member_area');
        wp_send_json(array(
            'authenticated' => true,
            'isBoard' => current_user_can('strc_access_board_documents'),
            'canManageRoles' => current_user_can('strc_manage_content_roles') || current_user_can('strc_assign_superadmin'),
            'memberAccess' => $memberAccess,
            'marketplaceNonce' => $memberAccess ? wp_create_nonce('strc_marketplace') : null,
            'communityNonce' => $memberAccess ? wp_create_nonce('strc_community') : null,
            'formsInboxUrl'=>current_user_can('strc_manage_members')?admin_url('admin.php?page=strc-forms'):null,
            'applicationsNonce'=>current_user_can('strc_manage_members')?wp_create_nonce('strc_applications'):null,
            'canEditContent' => \SwissTRClub\Core\Editorial\EditorialAccess::available(),
            'editorialNonce' => \SwissTRClub\Core\Editorial\EditorialAccess::available() ? wp_create_nonce('strc_editorial') : null,
            'editableDocuments' => array_values(array_filter(array_keys(\SwissTRClub\Core\Editorial\EditorialEndpoint::schema()), array(\SwissTRClub\Core\Editorial\EditorialAccess::class, 'document'))),
            'logoutUrl' => html_entity_decode(wp_logout_url(home_url('/')), ENT_QUOTES, 'UTF-8'),
            'canManageEvents' => \SwissTRClub\Core\Events\RegionalEventAccess::canManage(),
            'eventsNonce' => \SwissTRClub\Core\Events\RegionalEventAccess::canManage() ? wp_create_nonce('strc_events') : null,
            'canAssignRegions' => \SwissTRClub\Core\Events\RegionalEventAccess::isGlobal() && current_user_can('edit_users'),
            'canCreateAd' => $memberAccess && current_user_can('publish_strc_ads'),
            'displayName' => $user->display_name,
            'membership' => $membership ? array(
                'memberNumber' => (string) $membership['member_number'],
                'status' => (string) $membership['status'],
                'type' => MembershipTypePolicy::normalize((string) $membership['membership_type']),
                'region' => (string) $membership['region'],
                'startedOn' => (string) $membership['started_on'],
            ) : null,
            'vehicle' => (string) get_user_meta($user->ID, 'strc_vehicle', true),
        ));
    }

    private function sendCorsHeaders(): void
    {
        $allowedOrigin = defined('STRC_FRONTEND_ORIGIN') ? (string) STRC_FRONTEND_ORIGIN : '';
        $origin = sanitize_url(wp_unslash($_SERVER['HTTP_ORIGIN'] ?? ''));
        if ('' !== $allowedOrigin && hash_equals($allowedOrigin, $origin)) {
            header('Access-Control-Allow-Origin: ' . $allowedOrigin);
            header('Access-Control-Allow-Credentials: true');
            header('Vary: Origin');
        }
    }
}

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
            'memberAccess' => $memberAccess,
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

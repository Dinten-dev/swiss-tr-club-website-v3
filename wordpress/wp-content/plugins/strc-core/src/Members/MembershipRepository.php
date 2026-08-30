<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Members;

final class MembershipRepository
{
    public function registerHooks(): void
    {
        add_action('user_register', array($this, 'syncUser'));
        add_action('set_user_role', array($this, 'syncUser'));
    }

    public function syncUser(int $userId): void
    {
        $user = get_userdata($userId);
        if (! $user || ! in_array('strc_member', $user->roles, true)) {
            return;
        }

        global $wpdb;
        $table = $wpdb->prefix . 'strc_memberships';
        $existing = $wpdb->get_var($wpdb->prepare("SELECT id FROM {$table} WHERE user_id = %d", $userId));
        if ($existing) {
            return;
        }

        $now = current_time('mysql');
        $wpdb->insert(
            $table,
            array(
                'user_id' => $userId,
                'member_number' => sprintf('STRC-%05d', $userId),
                'membership_type' => 'standard',
                'status' => 'active',
                'region' => '',
                'started_on' => current_time('Y-m-d'),
                'annual_fee' => (string) get_option('strc_default_membership_fee', '120.00'),
                'created_at' => $now,
                'updated_at' => $now,
            ),
            array('%d', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')
        );
    }

    /** @return list<array<string, mixed>> */
    public function all(): array
    {
        global $wpdb;

        $memberships = $wpdb->prefix . 'strc_memberships';
        $users = $wpdb->users;
        $rows = $wpdb->get_results(
            "SELECT m.*, u.display_name, u.user_email
             FROM {$memberships} m
             INNER JOIN {$users} u ON u.ID = m.user_id
             ORDER BY u.display_name ASC",
            ARRAY_A
        );

        return is_array($rows) ? $rows : array();
    }

    public function update(int $membershipId, string $status, string $region, float $annualFee): void
    {
        global $wpdb;

        $allowed = array('pending', 'active', 'grace', 'inactive');
        $safeStatus = in_array($status, $allowed, true) ? $status : 'pending';
        $wpdb->update(
            $wpdb->prefix . 'strc_memberships',
            array(
                'status' => $safeStatus,
                'region' => sanitize_text_field($region),
                'annual_fee' => number_format(max(0, $annualFee), 2, '.', ''),
                'updated_at' => current_time('mysql'),
            ),
            array('id' => $membershipId),
            array('%s', '%s', '%s', '%s'),
            array('%d')
        );
    }
}

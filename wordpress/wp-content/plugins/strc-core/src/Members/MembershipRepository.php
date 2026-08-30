<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Members;

final class MembershipRepository
{
    /** @var array<int, string|null> */
    private array $statusCache = array();

    public function registerHooks(): void
    {
        add_action('user_register', array($this, 'syncUser'));
        add_action('set_user_role', array($this, 'syncUser'));
        add_action('add_user_role', array($this, 'syncUser'));
        add_action('remove_user_role', array($this, 'syncUser'));
    }

    public function syncUser(int $userId): void
    {
        unset($this->statusCache[$userId]);
        $user = get_userdata($userId);
        if (! $user) {
            return;
        }

        global $wpdb;
        $table = $wpdb->prefix . 'strc_memberships';
        $existing = $wpdb->get_var($wpdb->prepare("SELECT id FROM {$table} WHERE user_id = %d", $userId));
        if ($existing && ! in_array('strc_member', $user->roles, true)) {
            $wpdb->update($table, array('status' => 'inactive', 'updated_at' => current_time('mysql')), array('id' => (int) $existing), array('%s', '%s'), array('%d'));
            return;
        }
        if ($existing || ! in_array('strc_member', $user->roles, true)) {
            return;
        }

        $now = current_time('mysql');
        $wpdb->insert(
            $table,
            array(
                'user_id' => $userId,
                'member_number' => sprintf('STRC-%05d', $userId),
                'membership_type' => 'individual',
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

    public function update(int $membershipId, string $status, string $region, float $annualFee, string $membershipType, ?int $partnerUserId): void
    {
        global $wpdb;

        $allowed = array('pending', 'active', 'grace', 'inactive');
        $safeStatus = in_array($status, $allowed, true) ? $status : 'pending';
        $safeType = MembershipTypePolicy::normalize($membershipType);
        if (! MembershipTypePolicy::isAllowed($safeType)) {
            throw new \RuntimeException('Ungültiger Mitgliedschaftstyp.');
        }
        $membership = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$wpdb->prefix}strc_memberships WHERE id = %d", $membershipId), ARRAY_A);
        if (! is_array($membership)) {
            throw new \RuntimeException('Mitgliedschaft wurde nicht gefunden.');
        }
        $userId = (int) $membership['user_id'];
        $partnerUserId = MembershipTypePolicy::isCouple($safeType) && $partnerUserId ? $partnerUserId : null;
        if ($partnerUserId === $userId) {
            throw new \RuntimeException('Ein Mitglied kann nicht sein eigener Partner sein.');
        }
        if ($partnerUserId) {
            $partnerMembership = $this->membershipForUser($partnerUserId);
            if (! $partnerMembership) {
                throw new \RuntimeException('Das Partnerkonto besitzt keine Mitgliedschaft.');
            }
            if (! MembershipTypePolicy::formsCouple($safeType, (string) $partnerMembership['membership_type'])) {
                throw new \RuntimeException('Eine Paarmitgliedschaft benötigt Primary und Co-Pilot.');
            }
        }
        $wpdb->update(
            $wpdb->prefix . 'strc_memberships',
            array(
                'membership_type' => $safeType,
                'partner_user_id' => $partnerUserId,
                'status' => $safeStatus,
                'region' => sanitize_text_field($region),
                'annual_fee' => number_format(max(0, $annualFee), 2, '.', ''),
                'updated_at' => current_time('mysql'),
            ),
            array('id' => $membershipId),
            array('%s', '%d', '%s', '%s', '%s', '%s'),
            array('%d')
        );
        $this->synchronizePartnerLink($userId, $partnerUserId);
        $this->statusCache = array();
    }

    public function statusForUser(int $userId): ?string
    {
        if (array_key_exists($userId, $this->statusCache)) {
            return $this->statusCache[$userId];
        }
        global $wpdb;

        $status = $wpdb->get_var($wpdb->prepare("SELECT status FROM {$wpdb->prefix}strc_memberships WHERE user_id = %d", $userId));

        $this->statusCache[$userId] = is_string($status) ? $status : null;

        return $this->statusCache[$userId];
    }

    /** @param array<string, string> $row */
    public function importUpdate(int $userId, array $row): void
    {
        global $wpdb;

        $table = $wpdb->prefix . 'strc_memberships';
        $membership = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$table} WHERE user_id = %d", $userId), ARRAY_A);
        if (! is_array($membership)) {
            throw new \RuntimeException('Mitgliedschaft konnte nicht angelegt werden.');
        }

        $memberNumber = sanitize_text_field($row['member_number'] ?? (string) $membership['member_number']);
        $duplicate = $wpdb->get_var($wpdb->prepare("SELECT id FROM {$table} WHERE member_number = %s AND user_id <> %d", $memberNumber, $userId));
        if ($duplicate) {
            throw new \RuntimeException('Mitgliedsnummer ist bereits vergeben.');
        }

        $wpdb->update(
            $table,
            array(
                'member_number' => $memberNumber,
                'membership_type' => MembershipTypePolicy::normalize($row['membership_type'] ?? (string) $membership['membership_type']),
                'status' => sanitize_key($row['status'] ?? (string) $membership['status']),
                'region' => sanitize_text_field($row['region'] ?? (string) $membership['region']),
                'annual_fee' => $row['annual_fee'] ?? (string) $membership['annual_fee'],
                'updated_at' => current_time('mysql'),
            ),
            array('id' => (int) $membership['id']),
            array('%s', '%s', '%s', '%s', '%s', '%s'),
            array('%d')
        );
        unset($this->statusCache[$userId]);
    }

    public function linkByMemberNumbers(string $memberNumber, string $partnerMemberNumber): void
    {
        global $wpdb;

        $table = $wpdb->prefix . 'strc_memberships';
        $membership = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$table} WHERE member_number = %s", $memberNumber), ARRAY_A);
        $partner = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$table} WHERE member_number = %s", $partnerMemberNumber), ARRAY_A);
        if (! is_array($membership) || ! is_array($partner)) {
            throw new \RuntimeException('Paarbeziehung verweist auf unbekannte Mitgliedsnummer.');
        }
        if (! MembershipTypePolicy::formsCouple((string) $membership['membership_type'], (string) $partner['membership_type'])) {
            throw new \RuntimeException('Eine Paarmitgliedschaft benötigt Primary und Co-Pilot.');
        }
        $this->updatePartner((int) $membership['user_id'], (int) $partner['user_id']);
        $this->updatePartner((int) $partner['user_id'], (int) $membership['user_id']);
    }

    /** @return array<string, mixed>|null */
    private function membershipForUser(int $userId): ?array
    {
        global $wpdb;

        $membership = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$wpdb->prefix}strc_memberships WHERE user_id = %d", $userId), ARRAY_A);

        return is_array($membership) ? $membership : null;
    }

    private function synchronizePartnerLink(int $userId, ?int $partnerUserId): void
    {
        global $wpdb;

        $wpdb->query($wpdb->prepare("UPDATE {$wpdb->prefix}strc_memberships SET partner_user_id = NULL WHERE partner_user_id = %d AND user_id <> %d", $userId, $partnerUserId ?: 0));
        if ($partnerUserId) {
            $this->updatePartner($partnerUserId, $userId);
        }
    }

    private function updatePartner(int $userId, int $partnerUserId): void
    {
        global $wpdb;

        $wpdb->update(
            $wpdb->prefix . 'strc_memberships',
            array('partner_user_id' => $partnerUserId, 'updated_at' => current_time('mysql')),
            array('user_id' => $userId),
            array('%d', '%s'),
            array('%d')
        );
    }
}

<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Members;

use RuntimeException;
use Throwable;
use WP_User;

final class MemberCsvImporter
{
    public function __construct(
        private readonly MembershipRepository $memberships,
        private readonly MemberCsvReader $reader
    ) {
    }

    /** @return array{read: int, created: int, updated: int, skipped: int, errors: list<string>} */
    public function import(string $content, bool $dryRun): array
    {
        $parsed = $this->reader->read($content);
        $report = array('read' => count($parsed['rows']), 'created' => 0, 'updated' => 0, 'skipped' => 0, 'errors' => $parsed['errors']);

        foreach ($parsed['rows'] as $index => $row) {
            try {
                $existing = get_user_by('email', $row['email']);
                if ($dryRun) {
                    $existing ? ++$report['updated'] : ++$report['created'];
                    continue;
                }

                $user = $existing instanceof WP_User ? $existing : $this->createUser($row);
                $this->updateUser($user, $row);
                $this->memberships->syncUser($user->ID);
                $this->memberships->importUpdate($user->ID, $row);
                $existing ? ++$report['updated'] : ++$report['created'];
            } catch (Throwable $throwable) {
                ++$report['skipped'];
                $report['errors'][] = 'Datensatz ' . ($index + 1) . ': ' . $throwable->getMessage();
            }
        }

        if (! $dryRun) {
            foreach ($parsed['rows'] as $index => $row) {
                $partnerNumber = trim($row['partner_member_number'] ?? '');
                $memberNumber = trim($row['member_number'] ?? '');
                if ('' === $partnerNumber || '' === $memberNumber) {
                    continue;
                }
                try {
                    $this->memberships->linkByMemberNumbers($memberNumber, $partnerNumber);
                } catch (Throwable $throwable) {
                    $report['errors'][] = 'Paarbeziehung ' . ($index + 1) . ': ' . $throwable->getMessage();
                }
            }
        }

        return $report;
    }

    /** @param array<string, string> $row */
    private function createUser(array $row): WP_User
    {
        $base = sanitize_user(strstr($row['email'], '@', true) ?: 'mitglied', true) ?: 'mitglied';
        $login = $base;
        $suffix = 1;
        while (username_exists($login)) {
            $login = $base . $suffix;
            ++$suffix;
        }

        $userId = wp_insert_user(array(
            'user_login' => $login,
            'user_email' => $row['email'],
            'user_pass' => wp_generate_password(32, true, true),
            'first_name' => $row['first_name'],
            'last_name' => $row['last_name'],
            'display_name' => trim($row['first_name'] . ' ' . $row['last_name']),
            'role' => 'strc_member',
        ));
        if (is_wp_error($userId)) {
            throw new RuntimeException($userId->get_error_message());
        }

        $user = get_userdata((int) $userId);
        if (! $user) {
            throw new RuntimeException('WordPress-Konto konnte nicht geladen werden.');
        }

        return $user;
    }

    /** @param array<string, string> $row */
    private function updateUser(WP_User $user, array $row): void
    {
        if (! in_array('strc_member', $user->roles, true)) {
            $user->add_role('strc_member');
        }
        $result = wp_update_user(array(
            'ID' => $user->ID,
            'first_name' => $row['first_name'],
            'last_name' => $row['last_name'],
            'display_name' => trim($row['first_name'] . ' ' . $row['last_name']),
        ));
        if (is_wp_error($result)) {
            throw new RuntimeException($result->get_error_message());
        }

        $fields = array('phone', 'street', 'house_number', 'postcode', 'city', 'country', 'vehicle');
        foreach ($fields as $field) {
            if (array_key_exists($field, $row)) {
                update_user_meta($user->ID, 'strc_' . $field, sanitize_text_field($row[$field]));
            }
        }
    }
}

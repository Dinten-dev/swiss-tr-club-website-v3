<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Finance;

use RuntimeException;

final class InvoiceRepository
{
    public function create(int $userId, int $membershipId, float $amount, string $dueOn): int
    {
        global $wpdb;

        $table = $wpdb->prefix . 'strc_invoices';
        $now = current_time('mysql');
        $temporaryReference = QrReference::fromInvoiceId(random_int(1, 999999999), (string) $userId);
        $inserted = $wpdb->insert(
            $table,
            array(
                'invoice_number' => 'PENDING-' . wp_generate_uuid4(),
                'user_id' => $userId,
                'membership_id' => $membershipId,
                'amount' => number_format($amount, 2, '.', ''),
                'currency' => 'CHF',
                'due_on' => $dueOn,
                'status' => 'open',
                'qr_reference' => $temporaryReference,
                'issued_at' => $now,
            ),
            array('%s', '%d', '%d', '%s', '%s', '%s', '%s', '%s', '%s')
        );

        if (false === $inserted) {
            throw new RuntimeException('Invoice could not be created.');
        }

        $invoiceId = (int) $wpdb->insert_id;
        $invoiceNumber = sprintf('STRC-%s-%06d', gmdate('Y'), $invoiceId);
        $reference = QrReference::fromInvoiceId($invoiceId, (string) $userId);
        $wpdb->update(
            $table,
            array('invoice_number' => $invoiceNumber, 'qr_reference' => $reference),
            array('id' => $invoiceId),
            array('%s', '%s'),
            array('%d')
        );

        return $invoiceId;
    }

    /** @return array<string, mixed>|null */
    public function findByReference(string $reference): ?array
    {
        global $wpdb;

        $table = $wpdb->prefix . 'strc_invoices';
        $result = $wpdb->get_row(
            $wpdb->prepare("SELECT * FROM {$table} WHERE qr_reference = %s LIMIT 1", QrReference::normalize($reference)),
            ARRAY_A
        );

        return is_array($result) ? $result : null;
    }

    /** @return array<string, mixed>|null */
    public function find(int $invoiceId): ?array
    {
        global $wpdb;

        $table = $wpdb->prefix . 'strc_invoices';
        $result = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$table} WHERE id = %d", $invoiceId), ARRAY_A);

        return is_array($result) ? $result : null;
    }

    /** @return list<array<string, mixed>> */
    public function all(): array
    {
        global $wpdb;

        $invoices = $wpdb->prefix . 'strc_invoices';
        $users = $wpdb->users;
        $rows = $wpdb->get_results(
            "SELECT i.*, u.display_name, u.user_email FROM {$invoices} i
             INNER JOIN {$users} u ON u.ID = i.user_id ORDER BY i.id DESC LIMIT 500",
            ARRAY_A
        );

        return is_array($rows) ? $rows : array();
    }

    public function markPaid(int $invoiceId, string $paidAt): void
    {
        global $wpdb;

        $wpdb->update(
            $wpdb->prefix . 'strc_invoices',
            array('status' => 'paid', 'paid_at' => $paidAt),
            array('id' => $invoiceId),
            array('%s', '%s'),
            array('%d')
        );
    }
}

<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Finance;

use InvalidArgumentException;

final class QrReference
{
    /** @var array<int, int> */
    private const TABLE = array(0, 9, 4, 6, 8, 2, 7, 1, 3, 5);

    public static function fromInvoiceId(int $invoiceId, string $customerId = ''): string
    {
        if ($invoiceId < 1) {
            throw new InvalidArgumentException('Invoice ID must be positive.');
        }

        $digits = preg_replace('/\D/', '', $customerId . (string) $invoiceId) ?? '';
        $payload = str_pad(substr($digits, -26), 26, '0', STR_PAD_LEFT);
        $carry = 0;

        foreach (str_split($payload) as $digit) {
            $carry = self::TABLE[($carry + (int) $digit) % 10];
        }

        return $payload . (string) ((10 - $carry) % 10);
    }

    public static function normalize(string $reference): string
    {
        return preg_replace('/\D/', '', $reference) ?? '';
    }
}

<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Members;

final class MembershipTypePolicy
{
    /** @return array<string, string> */
    public static function labels(): array
    {
        return array(
            'individual' => 'Einzelmitglied',
            'couple_primary' => 'Paarmitglied Primary',
            'couple_partner' => 'Paarmitglied Co-Pilot',
            'youth' => 'Jungmitglied',
        );
    }

    public static function normalize(string $type): string
    {
        $type = strtolower(trim($type));
        $type = str_replace(array(' ', '-'), '_', $type);
        $aliases = array(
            'standard' => 'individual',
            'single' => 'individual',
            'pair_primary' => 'couple_primary',
            'primary' => 'couple_primary',
            'pair_partner' => 'couple_partner',
            'copilot' => 'couple_partner',
            'co_pilot' => 'couple_partner',
            'young' => 'youth',
        );

        return $aliases[$type] ?? $type;
    }

    public static function isAllowed(string $type): bool
    {
        return array_key_exists(self::normalize($type), self::labels());
    }

    public static function isCouple(string $type): bool
    {
        return in_array(self::normalize($type), array('couple_primary', 'couple_partner'), true);
    }

    public static function formsCouple(string $firstType, string $secondType): bool
    {
        $types = array(self::normalize($firstType), self::normalize($secondType));
        sort($types);

        return array('couple_partner', 'couple_primary') === $types;
    }
}

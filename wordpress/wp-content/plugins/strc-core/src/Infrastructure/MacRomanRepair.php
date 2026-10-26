<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Infrastructure;

/**
 * Repariert Umlaute aus Mac-kodierten Quelldaten (Mac Roman), die als ISO-8859-1 gelesen wurden:
 * «ü» (Mac 0x9F) steht dann als Steuerzeichen U+009F im Text, z. B. «M\u{9F}nchenstein».
 * Steuerzeichen U+0080–U+009F kommen in echten Texten nie vor; nur sie werden ersetzt.
 */
final class MacRomanRepair
{
    private const MAP = ['Ä','Å','Ç','É','Ñ','Ö','Ü','á','à','â','ä','ã','å','ç','é','è','ê','ë','í','ì','î','ï','ñ','ó','ò','ô','ö','õ','ú','ù','û','ü'];
    private const OPTION = 'strc_macroman_repair_v1';
    private const META = ['first_name','last_name','nickname','strc_street','strc_postcode','strc_city','strc_country'];

    public static function text(string $value): string
    {
        if (! preg_match('/[\x{80}-\x{9F}]/u', $value)) return $value;
        return (string) preg_replace_callback('/[\x{80}-\x{9F}]/u', static fn(array $m): string => self::MAP[mb_ord($m[0], 'UTF-8') - 0x80], $value);
    }

    public function registerHooks(): void
    {
        // Stored records are changed only by an explicitly reviewed preview.
    }

    /** @return array{changes:array,hash:string} */
    public function preview(): array
    {
        $changes = [];
        foreach (get_users(['fields' => ['ID', 'display_name'], 'orderby' => 'ID', 'order' => 'ASC']) as $user) {
            foreach (array_merge(self::META, ['display_name']) as $key) {
                $value = $key === 'display_name' ? (string)$user->display_name : (string)get_user_meta((int)$user->ID, $key, true);
                $clean = self::text($value);
                if ($value !== $clean) $changes[] = ['userId' => (int)$user->ID, 'field' => $key, 'before' => $value, 'after' => $clean];
            }
        }
        return ['changes' => $changes, 'hash' => hash('sha256', wp_json_encode($changes))];
    }

    public function repairStoredOnce(string $reviewedHash = ''): int
    {
        if ($reviewedHash === '' || (!current_user_can('manage_options') && !(defined('WP_CLI') && WP_CLI))) return 0;
        $plan = $this->preview();
        if (!hash_equals($plan['hash'], $reviewedHash)) throw new \RuntimeException('Mitgliederdaten wurden inzwischen geändert. Neue Vorschau erforderlich.');
        foreach ($plan['changes'] as $change) {
            $saved = $change['field'] === 'display_name'
                ? wp_update_user(['ID' => $change['userId'], 'display_name' => $change['after']])
                : update_user_meta($change['userId'], $change['field'], $change['after'], $change['before']);
            if (!$saved || is_wp_error($saved)) throw new \RuntimeException('Textkorrektur konnte nicht gespeichert werden.');
        }
        update_option(self::OPTION, gmdate(DATE_ATOM) . ' · ' . count($plan['changes']), false);
        return count($plan['changes']);
    }
}

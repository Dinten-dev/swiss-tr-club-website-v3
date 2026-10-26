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
        add_action('admin_init', [$this, 'repairStoredOnce']);
    }

    /** Einmalig: bereits gespeicherte Mitgliederangaben bereinigen (danach erledigt der Fairgate-Abgleich das laufend). */
    public function repairStoredOnce(): void
    {
        if (get_option(self::OPTION) || ! current_user_can('manage_options')) return;
        $fixed = 0;
        foreach (get_users(['fields' => ['ID', 'display_name']]) as $user) {
            foreach (self::META as $key) {
                $value = (string) get_user_meta((int) $user->ID, $key, true);
                $clean = self::text($value);
                if ($clean !== $value) { update_user_meta((int) $user->ID, $key, $clean); $fixed++; }
            }
            $clean = self::text((string) $user->display_name);
            if ($clean !== $user->display_name) { wp_update_user(['ID' => (int) $user->ID, 'display_name' => $clean]); $fixed++; }
        }
        update_option(self::OPTION, gmdate(DATE_ATOM) . ' · ' . $fixed, false);
    }
}

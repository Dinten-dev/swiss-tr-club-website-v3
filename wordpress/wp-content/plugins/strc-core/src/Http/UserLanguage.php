<?php
declare(strict_types=1);
namespace SwissTRClub\Core\Http;

final class UserLanguage
{
    public static function rememberSelection(): void
    {
        $language = $_COOKIE['strc_language'] ?? '';
        $id = get_current_user_id();
        if ($id && in_array($language, array('de','fr'), true) && get_user_meta($id, 'strc_ui_language', true) !== $language) update_user_meta($id, 'strc_ui_language', $language);
    }

    public static function french(int $id): bool
    {
        $language = (string) get_user_meta($id, 'strc_ui_language', true);
        return $language === 'fr' || ($language === '' && str_starts_with(get_user_locale($id), 'fr'));
    }

    public static function frenchEmail(string $email): bool
    {
        $user = get_user_by('email', $email);
        return $user && self::french((int) $user->ID);
    }
}

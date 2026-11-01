<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Mail;

final class WelcomeMailSettings
{
    private const OPTION = 'strc_member_welcome_mail';

    public static function defaults(): array
    {
        return array(
            'enabled' => false,
            'de' => array(
                'subject' => 'Du bist jetzt Mitglied im Swiss TR-Club!',
                'body' => "{{anrede}}\n\nHerzlich willkommen im Swiss TR-Club – du bist jetzt Mitglied! Danke, dass du unsere Leidenschaft für Triumph teilst. Wir freuen uns auf gemeinsame Ausfahrten und Begegnungen.\n\nDeine Mitgliedsnummer: {{member_number}}\nRegion: {{region}}\n\nLege hier dein persönliches Passwort fest. Der Link ist zeitlich begrenzt und nur einmal verwendbar:\n{{password_url}}\n\nSo findest du dich auf unserer Website zurecht:\n\nDashboard: {{dashboard_url}}\nProfil und Triumphs: {{profile_url}}\nAgenda und Anmeldungen: {{agenda_url}}\nRegionen und Stammtische: {{regions_url}}\nForum: {{forum_url}}\nGalerie: {{gallery_url}}\nBibliothek: {{library_url}}\nMarktplatz: {{marketplace_url}}\n\nMitgliederbeiträge und Rechnungen erhältst du separat über die Clubverwaltung.\nFragen oder Unterstützung: {{contact_url}}\n\nBis bald!\nDein Swiss TR-Club",
            ),
            'fr' => array(
                'subject' => 'Bienvenue au Swiss TR-Club !',
                'body' => "{{anrede}}\n\nBienvenue au Swiss TR-Club ! Ton adhésion est confirmée. Merci de partager notre passion pour les Triumph.\n\nTon numéro de membre : {{member_number}}\nRégion : {{region}}\n\nChoisis ton mot de passe avec ce lien personnel à usage unique :\n{{password_url}}\n\nPour commencer :\n\nTableau de bord : {{dashboard_url}}\nProfil et mes Triumph : {{profile_url}}\nAgenda et inscriptions : {{agenda_url}}\nRégions et rencontres : {{regions_url}}\nForum : {{forum_url}}\nGalerie : {{gallery_url}}\nBibliothèque : {{library_url}}\nPetites annonces : {{marketplace_url}}\n\nLes cotisations et factures sont gérées séparément par le club.\nDes questions ? {{contact_url}}\n\nÀ bientôt !\nTon Swiss TR-Club",
            ),
        );
    }

    public static function all(): array
    {
        $settings = get_option(self::OPTION, array());
        if (! is_array($settings)) $settings = array();
        $defaults = self::defaults();
        $result = array('enabled' => ! empty($settings['enabled']));
        foreach (array('de', 'fr') as $language) {
            $section = is_array($settings[$language] ?? null) ? $settings[$language] : array();
            $result[$language] = array(
                'subject' => is_string($section['subject'] ?? null) && $section['subject'] !== '' ? $section['subject'] : $defaults[$language]['subject'],
                'body' => is_string($section['body'] ?? null) && $section['body'] !== '' ? $section['body'] : $defaults[$language]['body'],
            );
        }
        return $result;
    }

    public static function enabled(): bool
    {
        return self::all()['enabled'];
    }

    public static function placeholders(): array
    {
        return array('anrede', 'first_name', 'member_number', 'region', 'password_url', 'dashboard_url', 'profile_url', 'agenda_url', 'regions_url', 'forum_url', 'gallery_url', 'library_url', 'marketplace_url', 'contact_url');
    }

    public static function render(string $language, array $values): array
    {
        $language = $language === 'fr' ? 'fr' : 'de';
        $section = self::all()[$language];
        if (! isset($values['anrede'])) $values['anrede'] = MailTemplates::greeting($language, (string) ($values['first_name'] ?? ''), (string) ($values['gender'] ?? ''));
        $replace = array();
        foreach (self::placeholders() as $key) {
            $value = (string) ($values[$key] ?? '');
            $replace['{{' . $key . '}}'] = wp_strip_all_tags($value);
        }
        return array(
            'subject' => strtr($section['subject'], $replace),
            'body' => strtr($section['body'], $replace),
        );
    }
}

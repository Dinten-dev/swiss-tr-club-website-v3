<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Mail;

/**
 * Mailvorlagen der Redaktion (Entscheid 29.10.2026): Betreff und Text je Mail auf Deutsch und Französisch,
 * mit Platzhaltern {{name}}. Ohne gespeicherte Anpassung gelten die hier hinterlegten Standardtexte.
 * Technische Bestandteile (Anhänge, Inseratdetails, Absender) setzt die Website weiterhin selbst.
 */
final class MailTemplates
{
    public const OPTION = 'strc_mail_templates';

    /** @return array<string,array<string,mixed>> */
    public static function registry(): array
    {
        $sign = "\n\nSwiss TR-Club";
        return array(
            'market.received' => array(
                'group' => 'Marktplatz', 'label' => 'Inserat eingegangen (Fahrzeug, wird geprüft)', 'recipient' => 'Inserent',
                'placeholders' => array('vorname', 'titel', 'link'), 'required' => array('link'),
                'de' => array('subject' => 'Swiss TR-Club: Dein Inserat ist eingegangen', 'body' => "Hallo {{vorname}}\n\nVielen Dank für dein Inserat «{{titel}}».\n\nFahrzeuginserate prüft das Marktplatz-Team. Du erhältst eine Nachricht, sobald es freigegeben ist.\n\nMeine Inserate verwalten: {{link}}" . $sign),
                'fr' => array('subject' => 'Swiss TR-Club : ton annonce a été reçue', 'body' => "Bonjour {{vorname}}\n\nMerci pour ton annonce «{{titel}}».\n\nLes annonces de véhicules sont vérifiées par l’équipe du marché. Tu recevras un message dès qu’elle sera publiée.\n\nGérer mes annonces : {{link}}" . $sign),
            ),
            'market.online' => array(
                'group' => 'Marktplatz', 'label' => 'Inserat ist online', 'recipient' => 'Inserent',
                'placeholders' => array('vorname', 'titel', 'link'), 'required' => array('link'),
                'de' => array('subject' => 'Swiss TR-Club: Dein Inserat ist online', 'body' => "Hallo {{vorname}}\n\nVielen Dank für dein Inserat «{{titel}}».\n\nEs ist ab sofort während 90 Tagen im Marktplatz sichtbar.\n\nMeine Inserate verwalten: {{link}}" . $sign),
                'fr' => array('subject' => 'Swiss TR-Club : ton annonce est en ligne', 'body' => "Bonjour {{vorname}}\n\nMerci pour ton annonce «{{titel}}».\n\nElle est désormais visible sur le marché pendant 90 jours.\n\nGérer mes annonces : {{link}}" . $sign),
            ),
            'market.service' => array(
                'group' => 'Marktplatz', 'label' => 'Inserat durch den Marktplatz-Service erstellt', 'recipient' => 'Inserent',
                'placeholders' => array('vorname', 'titel', 'link'), 'required' => array('link'),
                'de' => array('subject' => 'Swiss TR-Club: Dein Inserat ist online', 'body' => "Hallo {{vorname}}\n\nDer Marktplatz-Service des Swiss TR-Club hat in deinem Namen ein Inserat erstellt:\n«{{titel}}»\n\nKontaktanfragen von Interessierten erhältst du an diese E-Mail-Adresse. Unter «Meine Inserate» kannst du das Inserat bearbeiten, als verkauft markieren oder zurückziehen:\n{{link}}" . $sign),
                'fr' => array('subject' => 'Swiss TR-Club : ton annonce est en ligne', 'body' => "Bonjour {{vorname}}\n\nLe service du marché du Swiss TR-Club a publié une annonce en ton nom :\n«{{titel}}»\n\nLes demandes des personnes intéressées arrivent à cette adresse e-mail. Sous « Mes annonces », tu peux modifier l’annonce, la marquer comme vendue ou la retirer :\n{{link}}" . $sign),
            ),
            'market.contact_seller' => array(
                'group' => 'Marktplatz', 'label' => 'Anfrage zu einem Inserat', 'recipient' => 'Verkäufer',
                'placeholders' => array('nummer', 'titel', 'preis', 'name'), 'required' => array(),
                'note' => 'Inseratdetails, Bild, Angaben und Nachricht der anfragenden Person werden automatisch unter dem Text angefügt.',
                'de' => array('subject' => 'Anfrage zu Inserat #{{nummer}}: {{titel}} ({{preis}})', 'body' => 'Du hast eine Anfrage zu deinem Inserat erhalten. Antworte einfach auf diese E-Mail, um die interessierte Person direkt zu erreichen.'),
                'fr' => array('subject' => 'Demande pour l’annonce n° {{nummer}} : {{titel}} ({{preis}})', 'body' => 'Tu as reçu une demande pour ton annonce. Réponds simplement à cet e-mail pour contacter directement la personne intéressée.'),
            ),
            'market.contact_receipt' => array(
                'group' => 'Marktplatz', 'label' => 'Bestätigung an die anfragende Person', 'recipient' => 'Anfragende Person',
                'placeholders' => array('nummer', 'titel', 'preis', 'name'), 'required' => array(),
                'note' => 'Inseratdetails und eine Kopie der Nachricht werden automatisch unter dem Text angefügt.',
                'de' => array('subject' => 'Swiss TR-Club: Deine Anfrage zu Inserat #{{nummer}} – {{titel}}', 'body' => 'Danke für deine Anfrage. Sie wurde an die Person weitergeleitet, die das Inserat aufgegeben hat. Sie meldet sich direkt bei dir.'),
                'fr' => array('subject' => 'Swiss TR-Club : ta demande pour l’annonce n° {{nummer}} – {{titel}}', 'body' => 'Merci pour ta demande. Elle a été transmise à la personne qui a publié l’annonce; elle te répondra directement.'),
            ),
            'shop.invoice' => array(
                'group' => 'Shop', 'label' => 'Rechnung mit QR-Einzahlungsschein', 'recipient' => 'Käufer (Kopie Kasse)',
                'placeholders' => array('vorname', 'rechnungsnummer', 'bestellnummer', 'betrag'), 'required' => array(),
                'note' => 'Die Rechnung wird als PDF angehängt.',
                'de' => array('subject' => 'Swiss TR-Club: Rechnung {{rechnungsnummer}} – Bestellung #{{bestellnummer}}', 'body' => "Hallo {{vorname}}\n\nVielen Dank für deine Bestellung im TR-Shop. Die Rechnung mit QR-Einzahlungsschein liegt als PDF bei.\nBetrag: CHF {{betrag}}\n\nFreundliche Grüsse\nSwiss TR-Club"),
                'fr' => array('subject' => 'Swiss TR-Club : facture {{rechnungsnummer}} – commande #{{bestellnummer}}', 'body' => "Bonjour {{vorname}}\n\nMerci pour ta commande au TR-Shop. Tu trouveras la facture avec le bulletin de versement QR en pièce jointe.\nMontant : CHF {{betrag}}\n\nMeilleures salutations\nSwiss TR-Club"),
            ),
            'shop.woo_on_hold' => self::woo('Bestellung erhalten (Zahlung offen / Rechnung)'),
            'shop.woo_processing' => self::woo('Bestellung in Bearbeitung (bezahlt)'),
            'shop.woo_completed' => self::woo('Bestellung abgeschlossen / versandt'),
            'event.reserved' => array(
                'group' => 'Anlässe', 'label' => 'Teilnahme reserviert (Zahlung ausstehend)', 'recipient' => 'Anmeldendes Mitglied',
                'placeholders' => array('anlass', 'betrag', 'link'), 'required' => array('anlass'),
                'de' => array('subject' => 'Reservierung: {{anlass}}', 'body' => "Deine Teilnahme ist reserviert. Die Bestätigung folgt nach Zahlungseingang.\n\n{{anlass}}\nBetrag: {{betrag}}\nDie Kasse sendet dir die Rechnung separat.\n\n{{link}}"),
                'fr' => array('subject' => 'Réservation : {{anlass}}', 'body' => "Ta participation est réservée. La confirmation suivra après réception du paiement.\n\n{{anlass}}\nMontant : {{betrag}}\nLa trésorerie t’enverra la facture séparément.\n\n{{link}}"),
            ),
            'event.confirmed' => array(
                'group' => 'Anlässe', 'label' => 'Anmeldebestätigung', 'recipient' => 'Anmeldendes Mitglied',
                'placeholders' => array('anlass', 'teilnehmende', 'betrag', 'zahlungshinweis', 'bedingungen', 'link'), 'required' => array('anlass'),
                'note' => '{{zahlungshinweis}} lautet je nach Fall z. B. «Der Zahlungseingang ist bestätigt.» oder «Die Rechnung folgt separat …».',
                'de' => array('subject' => 'Anmeldebestätigung: {{anlass}}', 'body' => "Deine Teilnahme ist bestätigt.\n\n{{anlass}}\n{{teilnehmende}}\nBetrag: {{betrag}}\n{{zahlungshinweis}}\n\n{{bedingungen}}\n\nAnmeldung und Kalender: {{link}}"),
                'fr' => array('subject' => 'Confirmation d’inscription : {{anlass}}', 'body' => "Ta participation est confirmée.\n\n{{anlass}}\n{{teilnehmende}}\nMontant : {{betrag}}\n{{zahlungshinweis}}\n\n{{bedingungen}}\n\nInscription et calendrier : {{link}}"),
            ),
            'event.waiting' => array(
                'group' => 'Anlässe', 'label' => 'Warteliste', 'recipient' => 'Anmeldendes Mitglied',
                'placeholders' => array('anlass', 'link'), 'required' => array('anlass'),
                'de' => array('subject' => 'Warteliste: {{anlass}}', 'body' => "Deine Anmeldung steht auf der Warteliste. Es ist noch keine Zahlung fällig.\n{{link}}"),
                'fr' => array('subject' => 'Liste d’attente : {{anlass}}', 'body' => "Ton inscription figure sur la liste d’attente. Aucun paiement n’est encore dû.\n{{link}}"),
            ),
            'event.invoice' => array(
                'group' => 'Anlässe', 'label' => 'Rechnung für die Teilnahme', 'recipient' => 'Anmeldendes Mitglied (Kopie Kasse)',
                'placeholders' => array('vorname', 'rechnungsnummer', 'anlass', 'betrag'), 'required' => array(),
                'note' => 'Die Rechnung wird als PDF angehängt.',
                'de' => array('subject' => 'Rechnung {{rechnungsnummer}}: {{anlass}}', 'body' => "Hallo {{vorname}}\n\nIm Anhang findest du die Rechnung mit QR-Einzahlungsschein für deine Teilnahme.\n\n{{anlass}}\nBetrag: CHF {{betrag}}\n\nFreundliche Grüsse\nSwiss TR-Club"),
                'fr' => array('subject' => 'Facture {{rechnungsnummer}} : {{anlass}}', 'body' => "Bonjour {{vorname}}\n\nTu trouveras en pièce jointe la facture avec le bulletin de versement QR pour ta participation.\n\n{{anlass}}\nMontant : CHF {{betrag}}\n\nMeilleures salutations\nSwiss TR-Club"),
            ),
            'member.welcome' => array(
                'group' => 'Mitgliedschaft', 'label' => 'Willkommen nach der Aufnahme', 'recipient' => 'Neues Mitglied',
                'placeholders' => WelcomeMailSettings::placeholders(), 'required' => array('password_url'), 'welcome' => true,
                'note' => 'Wird nur versendet, wenn «Willkommensmail aktiv» eingeschaltet ist.',
                'de' => WelcomeMailSettings::defaults()['de'], 'fr' => WelcomeMailSettings::defaults()['fr'],
            ),
            'member.activation' => array(
                'group' => 'Mitgliedschaft', 'label' => 'Konto aktivieren (Passwort festlegen)', 'recipient' => 'Mitglied',
                'placeholders' => array('name', 'link'), 'required' => array('link'),
                'de' => array('subject' => 'Ihr Konto beim Swiss TR-Club aktivieren', 'body' => "Guten Tag {{name}}\n\nIhr Konto beim Swiss TR-Club ist vorbereitet. Legen Sie über folgenden sicheren Link Ihr persönliches Passwort fest:\n\n{{link}}\n\nDer Link ist zeitlich begrenzt und nur einmal verwendbar."),
                'fr' => array('subject' => 'Activer votre compte au Swiss TR-Club', 'body' => "Bonjour {{name}}\n\nVotre compte au Swiss TR-Club est prêt. Définissez votre mot de passe personnel via ce lien sécurisé :\n\n{{link}}\n\nLe lien est limité dans le temps et utilisable une seule fois."),
            ),
        );
    }

    private static function woo(string $label): array
    {
        return array(
            'group' => 'Shop', 'label' => 'WooCommerce: ' . $label, 'recipient' => 'Käufer', 'woo' => true,
            'placeholders' => array('vorname', 'bestellnummer', 'betrag'), 'required' => array(),
            'note' => 'Leer lassen = WooCommerce-Standardtext. Die Bestellübersicht fügt WooCommerce automatisch ein; «Text» erscheint unter der Bestellung.',
            'de' => array('subject' => '', 'heading' => '', 'body' => ''),
            'fr' => array('subject' => '', 'heading' => '', 'body' => ''),
        );
    }

    /** Gespeicherte Anpassungen (nur Werte, die von der Vorgabe abweichen). */
    public static function saved(): array
    {
        $saved = get_option(self::OPTION, array());
        return is_array($saved) ? $saved : array();
    }

    /** Aktuelle Vorlage (Anpassung oder Vorgabe) für eine Sprache. */
    public static function template(string $key, string $language): array
    {
        $registry = self::registry();
        if (! isset($registry[$key])) return array('subject' => '', 'body' => '', 'heading' => '');
        $language = $language === 'fr' ? 'fr' : 'de';
        if (! empty($registry[$key]['welcome'])) {
            $all = WelcomeMailSettings::all();
            return $all[$language] + array('heading' => '');
        }
        $default = $registry[$key][$language] + array('heading' => '');
        $custom = self::saved()[$key][$language] ?? array();
        $result = array();
        foreach (array('subject', 'heading', 'body') as $field) {
            $value = is_array($custom) && is_string($custom[$field] ?? null) && trim((string) $custom[$field]) !== '' ? (string) $custom[$field] : (string) ($default[$field] ?? '');
            $result[$field] = $value;
        }
        return $result;
    }

    /** Vorlage mit Werten füllen. Unbekannte Platzhalter werden entfernt. */
    public static function render(string $key, string $language, array $values): array
    {
        MailLog::context($key);
        $template = self::template($key, $language);
        $replace = array();
        foreach ($values as $name => $value) $replace['{{' . $name . '}}'] = wp_strip_all_tags((string) $value);
        $fill = static fn (string $text): string => trim((string) preg_replace('/\{\{[a-z_]+\}\}/', '', strtr($text, $replace)));
        $body = (string) preg_replace("/\n{3,}/", "\n\n", $fill($template['body']));
        return array('subject' => $fill($template['subject']), 'heading' => $fill($template['heading'] ?? ''), 'body' => $body);
    }

    public static function label(string $key): string
    {
        $entry = self::registry()[$key] ?? null;
        return $entry ? $entry['group'] . ': ' . $entry['label'] : $key;
    }

    /** Beispielwerte für Vorschau und Testmail. */
    public static function sample(string $key): array
    {
        $base = rtrim(defined('STRC_FRONTEND_ORIGIN') ? STRC_FRONTEND_ORIGIN : home_url(), '/');
        return array(
            'vorname' => 'Monika', 'name' => 'Monika Muster', 'titel' => 'TR6 Hardtop', 'nummer' => '123', 'preis' => 'CHF 1’200', 'link' => $base . '/#marktplatz/meine/123',
            'rechnungsnummer' => 'S-2026-0007', 'bestellnummer' => '1042', 'betrag' => "89.00",
            'anlass' => 'Herbstausfahrt Jura', 'teilnehmende' => 'Monika Muster, Peter Muster', 'zahlungshinweis' => 'Die Teilnahme ist bestätigt. Die Rechnung folgt separat; die Zahlung ist noch offen.', 'bedingungen' => 'Abmeldung bis 7 Tage vor dem Anlass kostenlos.',
            'first_name' => 'Monika', 'member_number' => '1234', 'region' => 'Zürich', 'password_url' => $base . '/wp-login.php?action=rp', 'dashboard_url' => $base . '/#mitglieder', 'profile_url' => $base . '/#profil', 'agenda_url' => $base . '/#agenda', 'regions_url' => $base . '/#regionen', 'forum_url' => $base . '/#forum', 'gallery_url' => $base . '/#galerie', 'library_url' => $base . '/#bibliothek', 'marketplace_url' => $base . '/#marktplatz', 'contact_url' => $base . '/#kontakt',
        );
    }

    public static function canManage(): bool
    {
        return current_user_can('strc_access_member_area') && current_user_can('strc_manage_content_roles');
    }
}

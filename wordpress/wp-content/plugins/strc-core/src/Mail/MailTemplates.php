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
                'placeholders' => array('anrede', 'vorname', 'titel', 'link'), 'required' => array('link'),
                'de' => array('subject' => 'Swiss TR-Club: Dein Inserat ist eingegangen', 'body' => "{{anrede}}\n\nVielen Dank für dein Inserat «{{titel}}».\n\nFahrzeuginserate prüft das Marktplatz-Team. Du erhältst eine Nachricht, sobald es freigegeben ist.\n\nMeine Inserate verwalten: {{link}}" . $sign),
                'fr' => array('subject' => 'Swiss TR-Club : ton annonce a été reçue', 'body' => "{{anrede}}\n\nMerci pour ton annonce «{{titel}}».\n\nLes annonces de véhicules sont vérifiées par l’équipe du marché. Tu recevras un message dès qu’elle sera publiée.\n\nGérer mes annonces : {{link}}" . $sign),
            ),
            'market.online' => array(
                'group' => 'Marktplatz', 'label' => 'Inserat ist online', 'recipient' => 'Inserent',
                'placeholders' => array('anrede', 'vorname', 'titel', 'link'), 'required' => array('link'),
                'de' => array('subject' => 'Swiss TR-Club: Dein Inserat ist online', 'body' => "{{anrede}}\n\nVielen Dank für dein Inserat «{{titel}}».\n\nEs ist ab sofort während 90 Tagen im Marktplatz sichtbar.\n\nMeine Inserate verwalten: {{link}}" . $sign),
                'fr' => array('subject' => 'Swiss TR-Club : ton annonce est en ligne', 'body' => "{{anrede}}\n\nMerci pour ton annonce «{{titel}}».\n\nElle est désormais visible sur le marché pendant 90 jours.\n\nGérer mes annonces : {{link}}" . $sign),
            ),
            'market.service' => array(
                'group' => 'Marktplatz', 'label' => 'Inserat durch den Marktplatz-Service erstellt', 'recipient' => 'Inserent',
                'placeholders' => array('anrede', 'vorname', 'titel', 'link'), 'required' => array('link'),
                'de' => array('subject' => 'Swiss TR-Club: Dein Inserat ist online', 'body' => "{{anrede}}\n\nDer Marktplatz-Service des Swiss TR-Club hat in deinem Namen ein Inserat erstellt:\n«{{titel}}»\n\nKontaktanfragen von Interessierten erhältst du an diese E-Mail-Adresse. Unter «Meine Inserate» kannst du das Inserat bearbeiten, als verkauft markieren oder zurückziehen:\n{{link}}" . $sign),
                'fr' => array('subject' => 'Swiss TR-Club : ton annonce est en ligne', 'body' => "{{anrede}}\n\nLe service du marché du Swiss TR-Club a publié une annonce en ton nom :\n«{{titel}}»\n\nLes demandes des personnes intéressées arrivent à cette adresse e-mail. Sous « Mes annonces », tu peux modifier l’annonce, la marquer comme vendue ou la retirer :\n{{link}}" . $sign),
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
                'placeholders' => array('anrede', 'vorname', 'rechnungsnummer', 'bestellnummer', 'betrag'), 'required' => array(),
                'note' => 'Die Rechnung wird als PDF angehängt.',
                'de' => array('subject' => 'Swiss TR-Club: Rechnung {{rechnungsnummer}} – Bestellung #{{bestellnummer}}', 'body' => "{{anrede}}\n\nVielen Dank für deine Bestellung im TR-Shop. Die Rechnung mit QR-Einzahlungsschein liegt als PDF bei.\nBetrag: {{betrag}}\n\nFreundliche Grüsse\nSwiss TR-Club"),
                'fr' => array('subject' => 'Swiss TR-Club : facture {{rechnungsnummer}} – commande #{{bestellnummer}}', 'body' => "{{anrede}}\n\nMerci pour ta commande au TR-Shop. Tu trouveras la facture avec le bulletin de versement QR en pièce jointe.\nMontant : {{betrag}}\n\nMeilleures salutations\nSwiss TR-Club"),
            ),
            'shop.woo_on_hold' => self::woo('Bestellung erhalten (Zahlung offen / Rechnung)'),
            'shop.woo_processing' => self::woo('Bestellung in Bearbeitung (bezahlt)'),
            'shop.woo_completed' => self::woo('Bestellung abgeschlossen / versandt'),
            'event.reserved' => array(
                'group' => 'Anlässe', 'label' => 'Teilnahme reserviert (Zahlung ausstehend)', 'recipient' => 'Anmeldendes Mitglied',
                'placeholders' => array('anrede', 'vorname', 'anlass', 'betrag', 'link'), 'required' => array('anlass'),
                'de' => array('subject' => 'Reservierung: {{anlass}}', 'body' => "{{anrede}}\n\nDeine Teilnahme am Anlass «{{anlass}}» ist reserviert. Die Bestätigung folgt nach Zahlungseingang.\n\nBetrag: {{betrag}}\nDie Kasse sendet dir die Rechnung separat.\n\nAnmeldung und Kalender: {{link}}\n\nSwiss TR-Club"),
                'fr' => array('subject' => 'Réservation : {{anlass}}', 'body' => "{{anrede}}\n\nTa participation à « {{anlass}} » est réservée. La confirmation suivra après réception du paiement.\n\nMontant : {{betrag}}\nLa trésorerie t’enverra la facture séparément.\n\nInscription et calendrier : {{link}}\n\nSwiss TR-Club"),
            ),
            'event.confirmed' => array(
                'group' => 'Anlässe', 'label' => 'Anmeldebestätigung', 'recipient' => 'Anmeldendes Mitglied',
                'placeholders' => array('anrede', 'vorname', 'anlass', 'teilnehmende', 'betrag', 'zahlungshinweis', 'bedingungen', 'link'), 'required' => array('anlass'),
                'note' => '{{bedingungen}} stammt aus dem Anlass (Agenda verwalten → Anlass → Abschnitt «Teilnahme & Abmeldung» → Bedingungen). {{zahlungshinweis}} setzt die Website je nach Zahlungsstand: «Der Zahlungseingang ist bestätigt.», «Die Rechnung folgt separat …», «Der Beitrag wurde erlassen.» oder «Es ist keine Zahlung erforderlich.».',
                'de' => array('subject' => 'Anmeldebestätigung: {{anlass}}', 'body' => "{{anrede}}\n\nDie Teilnahme am Anlass «{{anlass}}» ist bestätigt für:\n{{teilnehmende}}\n\nBetrag: {{betrag}}\n{{zahlungshinweis}}\n\n{{bedingungen}}\n\nAnmeldung und Kalender: {{link}}\n\nSwiss TR-Club"),
                'fr' => array('subject' => 'Confirmation d’inscription : {{anlass}}', 'body' => "{{anrede}}\n\nLa participation à « {{anlass}} » est confirmée pour :\n{{teilnehmende}}\n\nMontant : {{betrag}}\n{{zahlungshinweis}}\n\n{{bedingungen}}\n\nInscription et calendrier : {{link}}\n\nSwiss TR-Club"),
            ),
            'event.waiting' => array(
                'group' => 'Anlässe', 'label' => 'Warteliste', 'recipient' => 'Anmeldendes Mitglied',
                'placeholders' => array('anrede', 'vorname', 'anlass', 'link'), 'required' => array('anlass'),
                'de' => array('subject' => 'Warteliste: {{anlass}}', 'body' => "Deine Anmeldung steht auf der Warteliste. Es ist noch keine Zahlung fällig.\n{{link}}"),
                'fr' => array('subject' => 'Liste d’attente : {{anlass}}', 'body' => "Ton inscription figure sur la liste d’attente. Aucun paiement n’est encore dû.\n{{link}}"),
            ),
            'event.invoice' => array(
                'group' => 'Anlässe', 'label' => 'Rechnung für die Teilnahme', 'recipient' => 'Anmeldendes Mitglied (Kopie Kasse)',
                'placeholders' => array('anrede', 'vorname', 'rechnungsnummer', 'anlass', 'betrag'), 'required' => array(),
                'note' => 'Die Rechnung wird als PDF angehängt.',
                'de' => array('subject' => 'Rechnung {{rechnungsnummer}}: {{anlass}}', 'body' => "{{anrede}}\n\nIm Anhang findest du die Rechnung mit QR-Einzahlungsschein für deine Teilnahme.\n\n{{anlass}}\nBetrag: {{betrag}}\n\nFreundliche Grüsse\nSwiss TR-Club"),
                'fr' => array('subject' => 'Facture {{rechnungsnummer}} : {{anlass}}', 'body' => "{{anrede}}\n\nTu trouveras en pièce jointe la facture avec le bulletin de versement QR pour ta participation.\n\n{{anlass}}\nMontant : {{betrag}}\n\nMeilleures salutations\nSwiss TR-Club"),
            ),
            'member.welcome' => array(
                'group' => 'Mitgliedschaft', 'label' => 'Willkommen nach der Aufnahme', 'recipient' => 'Neues Mitglied',
                'placeholders' => WelcomeMailSettings::placeholders(), 'required' => array('password_url'), 'welcome' => true,
                'note' => 'Wird nur versendet, wenn «Willkommensmail aktiv» eingeschaltet ist.',
                'de' => WelcomeMailSettings::defaults()['de'], 'fr' => WelcomeMailSettings::defaults()['fr'],
            ),
            'market.decision_approved' => array(
                'group' => 'Marktplatz', 'label' => 'Inserat nach Prüfung veröffentlicht', 'recipient' => 'Inserent',
                'placeholders' => array('titel', 'link'), 'required' => array(),
                'de' => array('subject' => 'TR-Club: Ihr Inserat ist veröffentlicht', 'body' => "Guten Tag\n\nIhr Inserat «{{titel}}» wurde geprüft und ist jetzt veröffentlicht.\n\n{{link}}\n\nSwiss TR-Club"),
                'fr' => array('subject' => 'TR-Club : annonce publiée', 'body' => "Bonjour,\n\nTon annonce « {{titel}} » a été vérifiée et est maintenant publiée.\n\n{{link}}\n\nSwiss TR-Club"),
            ),
            'market.decision_rejected' => array(
                'group' => 'Marktplatz', 'label' => 'Inserat nach Prüfung nicht veröffentlicht', 'recipient' => 'Inserent',
                'placeholders' => array('titel', 'link'), 'required' => array(),
                'de' => array('subject' => 'TR-Club: Ihr Inserat wurde nicht veröffentlicht', 'body' => "Guten Tag\n\nIhr Inserat «{{titel}}» konnte in dieser Form nicht veröffentlicht werden. Sie können es bearbeiten und erneut absenden.\n\n{{link}}\n\nSwiss TR-Club"),
                'fr' => array('subject' => 'TR-Club : annonce non publiée', 'body' => "Bonjour,\n\nTon annonce « {{titel}} » n’a pas pu être publiée sous cette forme. Tu peux la modifier et la soumettre à nouveau.\n\n{{link}}\n\nSwiss TR-Club"),
            ),
            'shop.shipped' => array(
                'group' => 'Shop', 'label' => 'Bestellung ist unterwegs (Versand gemeldet)', 'recipient' => 'Käufer',
                'placeholders' => array('anrede', 'vorname', 'bestellnummer', 'artikel', 'sendungsnummer'), 'required' => array(),
                'note' => '{{sendungsnummer}} ist leer, wenn der Versandpartner keine Nummer erfasst hat.',
                'de' => array('subject' => 'Deine Bestellung #{{bestellnummer}} ist unterwegs', 'body' => "{{anrede}}\n\nDeine Bestellung #{{bestellnummer}} ist unterwegs.\n\n{{artikel}}\n\nSendungsnummer: {{sendungsnummer}}\n\nVielen Dank für deine Bestellung im TR-Shop.\nSwiss TR-Club"),
                'fr' => array('subject' => 'Ta commande #{{bestellnummer}} est en route', 'body' => "{{anrede}}\n\nTa commande #{{bestellnummer}} est en route.\n\n{{artikel}}\n\nNuméro de suivi : {{sendungsnummer}}\n\nMerci pour ta commande au TR-Shop.\nSwiss TR-Club"),
            ),
            'member.couple_active' => array(
                'group' => 'Mitgliedschaft', 'label' => 'Paarmitgliedschaft ist aktiv', 'recipient' => 'Hauptmitglied',
                'placeholders' => array('anrede', 'vorname', 'copilot', 'beitrag', 'link'), 'required' => array(),
                'de' => array('subject' => 'Swiss TR-Club: Paarmitgliedschaft aktiv', 'body' => "{{anrede}}\n\nEure Paarmitgliedschaft mit {{copilot}} ist jetzt aktiv. Neuer Jahresbeitrag: {{beitrag}}. Die Rechnung folgt separat.\n\nProfil: {{link}}\n\nSwiss TR-Club"),
                'fr' => array('subject' => 'Swiss TR-Club : affiliation en couple active', 'body' => "{{anrede}}\n\nTon affiliation en couple avec {{copilot}} est désormais active. Nouvelle cotisation annuelle : {{beitrag}}. La facture suit séparément.\n\nProfil : {{link}}\n\nSwiss TR-Club"),
            ),
            'internal.submission' => array(
                'group' => 'Intern', 'label' => 'Neue Einreichung zur Prüfung', 'recipient' => 'Moderation (Galerie, Bibliothek, Marktplatz)',
                'placeholders' => array('titel', 'link'), 'required' => array('link'),
                'de' => array('subject' => 'TR-Club: Einreichung zur Prüfung', 'body' => "Neue Einreichung: {{titel}}\n{{link}}\n\nDiese E-Mails können im Dashboard unter «Administration» ausgeschaltet oder umgeleitet werden."),
                'fr' => array('subject' => 'TR-Club : contribution à valider', 'body' => "Nouvelle contribution : {{titel}}\n{{link}}\n\nCes e-mails peuvent être désactivés ou redirigés dans le tableau de bord (Administration)."),
            ),
            'internal.forum' => array(
                'group' => 'Intern', 'label' => 'Forum: neuer Beitrag (Abonnenten)', 'recipient' => 'Abonnierende Mitglieder',
                'placeholders' => array('titel', 'link'), 'required' => array('link'),
                'de' => array('subject' => 'TR-Club Forum', 'body' => "{{titel}}\n{{link}}\nBenachrichtigungen können im Forum angepasst werden."),
                'fr' => array('subject' => 'TR-Club Forum', 'body' => "{{titel}}\n{{link}}\nLes notifications peuvent être modifiées dans le forum."),
            ),
            'internal.shop_order' => array(
                'group' => 'Intern', 'label' => 'Shop: neue Bestellung', 'recipient' => 'Shopverantwortliche / Kasse',
                'placeholders' => array('bestellnummer', 'status', 'artikel', 'betrag', 'kunde', 'email', 'lieferadresse', 'telefon'), 'required' => array('bestellnummer'),
                'de' => array('subject' => 'Neue Bestellung im TR-Shop: #{{bestellnummer}}', 'body' => "Eine Bestellung ist im TR-Shop eingegangen. Zahlungsstatus: {{status}}\n\nBestellung: #{{bestellnummer}}\nArtikel: {{artikel}}\nGesamtbetrag: {{betrag}}\nBestellt von: {{kunde}}\nE-Mail: {{email}}\n\nLieferadresse:\n{{lieferadresse}}\nTelefon: {{telefon}}\n\nBitte Versand und Übergabe des Artikels veranlassen."),
                'fr' => array('subject' => 'Nouvelle commande au TR-Shop : #{{bestellnummer}}', 'body' => "Une commande est arrivée au TR-Shop. Statut de paiement : {{status}}\n\nCommande : #{{bestellnummer}}\nArticles : {{artikel}}\nMontant total : {{betrag}}\nCommandé par : {{kunde}}\nE-mail : {{email}}\n\nAdresse de livraison :\n{{lieferadresse}}\nTéléphone : {{telefon}}\n\nMerci d’organiser l’envoi et la remise de l’article."),
            ),
            'internal.delivery_note' => array(
                'group' => 'Intern', 'label' => 'Shop: Lieferschein an Versandpartner', 'recipient' => 'Versandpartner',
                'placeholders' => array('bestellnummer', 'lieferadresse', 'link'), 'required' => array('bestellnummer'),
                'note' => 'Der Lieferschein wird als PDF angehängt.',
                'de' => array('subject' => 'Lieferschein Swiss TR-Club – Bestellung #{{bestellnummer}}', 'body' => "Guten Tag\n\nIm TR-Shop des Swiss TR-Club ist eine Versandbestellung eingegangen. Der Lieferschein liegt als PDF bei.\n\nBestellung: #{{bestellnummer}}\nLieferadresse: {{lieferadresse}}\n\nNach dem Versand bitte unter «Mein Konto» → Versandaufträge «Versand melden» wählen:\n{{link}}\n\nFreundliche Grüsse\nSwiss TR-Club"),
                'fr' => array('subject' => 'Bon de livraison Swiss TR-Club – commande #{{bestellnummer}}', 'body' => "Bonjour\n\nUne commande à expédier est arrivée au TR-Shop du Swiss TR-Club. Le bon de livraison est joint en PDF.\n\nCommande : #{{bestellnummer}}\nAdresse de livraison : {{lieferadresse}}\n\nAprès l’envoi, merci de choisir « Annoncer l’envoi » sous « Mon compte » → Commandes à expédier :\n{{link}}\n\nMeilleures salutations\nSwiss TR-Club"),
            ),
            'internal.event_organizer' => array(
                'group' => 'Intern', 'label' => 'Anlass: Anmeldestatus an Organisator', 'recipient' => 'Organisator des Anlasses',
                'placeholders' => array('anlass', 'nummer', 'teilnehmende', 'status', 'link'), 'required' => array(),
                'de' => array('subject' => 'Anmeldestatus: {{anlass}}', 'body' => "Anmeldung #{{nummer}}\nTeilnehmende: {{teilnehmende}}\nStatus: {{status}}\n{{link}}"),
                'fr' => array('subject' => 'Statut d’inscription : {{anlass}}', 'body' => "Inscription #{{nummer}}\nParticipants : {{teilnehmende}}\nStatut : {{status}}\n{{link}}"),
            ),
            'internal.event_treasury' => array(
                'group' => 'Intern', 'label' => 'Anlass: Rechnung erstellen / Zahlung prüfen', 'recipient' => 'Kasse',
                'placeholders' => array('auftrag', 'anlass', 'nummer', 'mitglied', 'email', 'betrag', 'zahlungsstand', 'hinweis', 'link'), 'required' => array(),
                'note' => '{{auftrag}} lautet «Rechnung erstellen» oder «Zahlung prüfen»; {{hinweis}} enthält die passende Anweisung.',
                'de' => array('subject' => '{{auftrag}}: {{anlass}}', 'body' => "Anmeldung #{{nummer}}\nMitglied: {{mitglied}}\nE-Mail: {{email}}\nBetrag: {{betrag}}\nZahlungsstand: {{zahlungsstand}}\n{{hinweis}}\n{{link}}"),
                'fr' => array('subject' => '{{auftrag}} : {{anlass}}', 'body' => "Inscription #{{nummer}}\nMembre : {{mitglied}}\nE-mail : {{email}}\nMontant : {{betrag}}\nStatut de paiement : {{zahlungsstand}}\n{{hinweis}}\n{{link}}"),
            ),
            'internal.application' => array(
                'group' => 'Intern', 'label' => 'Mitgliedschaft: neuer Antrag', 'recipient' => 'Mitgliederverwaltung',
                'placeholders' => array('link'), 'required' => array('link'),
                'de' => array('subject' => 'Swiss TR-Club: Neue Anmeldung', 'body' => "Sie haben eine neue Anmeldung erhalten.\n\nBitte prüfen Sie die Anmeldung im Clubportal und bestätigen Sie die Aufnahme.\n\nZum Clubportal:\n{{link}}\n\nSwiss TR-Club"),
                'fr' => array('subject' => 'Swiss TR-Club : nouvelle demande d’adhésion', 'body' => "Tu as reçu une nouvelle demande d’adhésion.\n\nMerci de la vérifier dans le portail du club et de confirmer l’admission.\n\nVers le portail :\n{{link}}\n\nSwiss TR-Club"),
            ),
            'internal.couple_switch' => array(
                'group' => 'Intern', 'label' => 'Mitgliedschaft: Antrag Wechsel zur Paarmitgliedschaft', 'recipient' => 'Aktuar',
                'placeholders' => array('mitglied', 'copilot', 'hinweis', 'link'), 'required' => array('link'),
                'note' => '{{hinweis}} sagt, ob die Co-Pilot-Angaben bereits in Fairgate stehen.',
                'de' => array('subject' => 'Swiss TR-Club: Wechsel zur Paarmitgliedschaft', 'body' => "Neuer Antrag: Wechsel zur Paarmitgliedschaft\n\nMitglied: {{mitglied}}\nCo-Pilot: {{copilot}}\n\n{{hinweis}} Beim nächsten Abgleich wird die Paarmitgliedschaft auf der Website aktiv; das Mitglied und der Kassier werden dann automatisch informiert.\n\nAlle Angaben und Rückfragen unter «Anträge bearbeiten» → Paarmitgliedschaften:\n{{link}}\n\nSwiss TR-Club"),
                'fr' => array('subject' => 'Swiss TR-Club : passage à l’affiliation en couple', 'body' => "Nouvelle demande : passage à l’affiliation en couple\n\nMembre : {{mitglied}}\nCo-pilote : {{copilot}}\n\n{{hinweis}} Lors de la prochaine synchronisation, l’affiliation en couple sera active sur le site; le membre et le caissier seront alors informés automatiquement.\n\nToutes les données et questions sous « Traiter les demandes » → Affiliations en couple :\n{{link}}\n\nSwiss TR-Club"),
            ),
            'internal.couple_fee' => array(
                'group' => 'Intern', 'label' => 'Mitgliedschaft: neue Paarmitgliedschaft – Beitrag anpassen', 'recipient' => 'Kassier',
                'placeholders' => array('mitglied', 'angaben', 'copilot', 'beitrag', 'datum'), 'required' => array(),
                'de' => array('subject' => 'Swiss TR-Club: Neue Paarmitgliedschaft – Beitrag anpassen', 'body' => "Neue Paarmitgliedschaft\n\nDer Aktuar hat den Co-Piloten in Fairgate als Paarmitglied verbunden; die Paarmitgliedschaft ist jetzt aktiv.\n\nHauptmitglied: {{mitglied}}\n{{angaben}}\nCo-Pilot (neues Paarmitglied): {{copilot}}\nNeuer Jahresbeitrag: {{beitrag}}\nAktiv seit: {{datum}}\n\nBitte den Beitrag für die Rechnungsstellung berücksichtigen.\n\nSwiss TR-Club"),
                'fr' => array('subject' => 'Swiss TR-Club : nouvelle affiliation en couple – adapter la cotisation', 'body' => "Nouvelle affiliation en couple\n\nLe secrétaire a lié le co-pilote comme membre couple dans Fairgate; l’affiliation en couple est maintenant active.\n\nMembre principal : {{mitglied}}\n{{angaben}}\nCo-pilote (nouveau membre couple) : {{copilot}}\nNouvelle cotisation annuelle : {{beitrag}}\nActive depuis : {{datum}}\n\nMerci de tenir compte de la cotisation pour la facturation.\n\nSwiss TR-Club"),
            ),
            'member.activation' => array(
                'group' => 'Mitgliedschaft', 'label' => 'Konto aktivieren (Passwort festlegen)', 'recipient' => 'Mitglied',
                'placeholders' => array('name', 'link'), 'required' => array('link'),
                'de' => array('subject' => 'Ihr Konto beim Swiss TR-Club aktivieren', 'body' => "Guten Tag {{name}}\n\nIhr Konto beim Swiss TR-Club ist vorbereitet. Legen Sie über folgenden sicheren Link Ihr persönliches Passwort fest:\n\n{{link}}\n\nDer Link ist zeitlich begrenzt und nur einmal verwendbar."),
                'fr' => array('subject' => 'Active ton compte au Swiss TR-Club', 'body' => "Bonjour {{name}}\n\nTon compte au Swiss TR-Club est prêt. Définis ton mot de passe personnel via ce lien sécurisé :\n\n{{link}}\n\nLe lien est limité dans le temps et utilisable une seule fois."),
            ),
        );
    }

    private static function woo(string $label): array
    {
        return array(
            'group' => 'Shop', 'label' => 'WooCommerce: ' . $label, 'recipient' => 'Käufer', 'woo' => true,
            'placeholders' => array('anrede', 'vorname', 'bestellnummer', 'betrag'), 'required' => array(),
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
    /** Anrede nach Geschlecht (Wunsch Redaktion 1.11.2026): «Liebe Monika», «Lieber Peter», sonst «Hallo Alex». */
    public static function greeting(string $language, string $firstName, string $gender): string
    {
        $firstName = trim($firstName);
        if ($language === 'fr') return ($gender === 'female' ? 'Chère' : ($gender === 'male' ? 'Cher' : 'Bonjour')) . ($firstName !== '' ? ' ' . $firstName : '');
        return ($gender === 'female' ? 'Liebe' : ($gender === 'male' ? 'Lieber' : 'Hallo')) . ($firstName !== '' ? ' ' . $firstName : '');
    }

    /** Geschlecht aus dem Mitgliederprofil (female/male), über Konto-ID oder E-Mail-Adresse. */
    public static function gender(int $userId = 0, string $email = ''): string
    {
        if (! $userId && $email !== '' && function_exists('get_user_by')) { $user = get_user_by('email', $email); $userId = $user ? (int) $user->ID : 0; }
        $gender = $userId && function_exists('get_user_meta') ? (string) get_user_meta($userId, 'strc_gender', true) : '';
        return in_array($gender, array('female', 'male'), true) ? $gender : '';
    }

    public static function orderGender(mixed $order): string
    {
        return $order instanceof \WC_Order ? self::gender((int) $order->get_customer_id(), (string) $order->get_billing_email()) : '';
    }

    public static function render(string $key, string $language, array $values): array
    {
        MailLog::context($key);
        if (array_key_exists('vorname', $values) && ! isset($values['anrede'])) $values['anrede'] = self::greeting($language, (string) $values['vorname'], (string) ($values['geschlecht'] ?? ''));
        unset($values['geschlecht']);
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
        $sample = array(
            'vorname' => 'Monika', 'anrede' => 'Liebe Monika', 'name' => 'Monika Muster', 'titel' => 'TR6 Hardtop', 'nummer' => '123', 'preis' => 'CHF 1’200', 'link' => $base . '/#marktplatz/meine/123',
            'rechnungsnummer' => 'S-2026-0007', 'bestellnummer' => '1042', 'betrag' => "89.00",
            'anlass' => 'Herbstausfahrt Jura', 'teilnehmende' => 'Monika Muster, Peter Muster', 'zahlungshinweis' => 'Die Teilnahme ist bestätigt. Die Rechnung folgt separat; die Zahlung ist noch offen.', 'bedingungen' => 'Abmeldung bis 7 Tage vor dem Anlass kostenlos.',
            'artikel' => "Jacke (Hoody) Herren – M × 1", 'sendungsnummer' => '99.00.123456.78', 'copilot' => 'Peter Muster', 'beitrag' => 'CHF 160.–', 'status' => 'on-hold', 'kunde' => 'Monika Muster', 'email' => 'monika@example.ch', 'lieferadresse' => "Monika Muster\nBeispielweg 1\n8000 Zürich", 'telefon' => '079 000 00 00', 'auftrag' => 'Rechnung erstellen', 'mitglied' => 'Monika Muster', 'zahlungsstand' => 'outstanding', 'hinweis' => 'Bitte die Rechnung in Fairgate erstellen und versenden.', 'angaben' => "Mitgliedsnummer: 1234\nFairgate-ID: 173", 'datum' => '29.10.2026', 'first_name' => 'Monika', 'member_number' => '1234', 'region' => 'Zürich', 'password_url' => $base . '/wp-login.php?action=rp', 'dashboard_url' => $base . '/#mitglieder', 'profile_url' => $base . '/#profil', 'agenda_url' => $base . '/#agenda', 'regions_url' => $base . '/#regionen', 'forum_url' => $base . '/#forum', 'gallery_url' => $base . '/#galerie', 'library_url' => $base . '/#bibliothek', 'marketplace_url' => $base . '/#marktplatz', 'contact_url' => $base . '/#kontakt',
        );
        // Beispiel-Link passend zur Vorlage (Vorschau und Testmail).
        $links = array('event.' => '/#veranstaltung/42', 'shop.' => '/#tr-shop', 'member.' => '/#mitglieder', 'internal.application' => '/#antraege', 'internal.forum' => '/#forum/42');
        foreach ($links as $prefix => $path) if (str_starts_with($key, $prefix)) { $sample['link'] = $base . $path; break; }
        if ($key === 'member.welcome') $sample += array('first_name' => 'Monika', 'member_number' => '1234', 'region' => 'Zürich', 'regional_contact' => 'Max Muster (Regionalleiter), zuerich@swisstrclub.ch, 079 123 45 67', 'password_url' => $base . '/wp-login.php?action=rp', 'dashboard_url' => $base . '/#mitglieder', 'profile_url' => $base . '/#profil', 'agenda_url' => $base . '/#agenda', 'regions_url' => $base . '/#regionen', 'forum_url' => $base . '/#forum', 'gallery_url' => $base . '/#galerie', 'library_url' => $base . '/#bibliothek', 'marketplace_url' => $base . '/#marktplatz', 'contact_url' => $base . '/#kontakt');
        if (str_starts_with($key, 'event.')) { $sample['betrag'] = 'CHF 89.00'; $sample['bedingungen'] = 'Eine Abmeldung ist bis 4 Tage vor dem Anlass kostenlos.'; }
        return $sample;
    }

    public static function canManage(): bool
    {
        return current_user_can('strc_access_member_area') && current_user_can('strc_manage_content_roles');
    }
}

# Staging-Stand vom 13. Oktober 2026

`deployment/staging/manifest.json` beschreibt den unveränderten Ausgangsstand von https://staging.swisstrclub.ch/. `main` enthält darauf aufbauend die unten dokumentierte, veröffentlichte Integration:

- vollständiges STRC-Core-Plugin und STRC-App-Theme;
- ausgeliefertes Frontend inklusive zusätzlicher Bundle-Anpassungen, Bilder und PDF-Ressourcen;
- vorhandene React-/TypeScript-Quellen, Abhängigkeiten und Tests;
- Dateiprüfsummen in `deployment/staging/manifest.json`;
- WordPress 7.1.3, WooCommerce 11.1.2 und zahls.ch-Gateway 2.0.7 als dokumentierte Laufzeitversionen.

Die gesicherten Programmdateien wurden ausschließlich vom Server gelesen. Die Datenbank, redaktionelle Beiträge, Mitgliederdaten, Uploads, erzeugte Importkataloge und Zugangsdaten gehören zum bestehenden Serverbestand und werden durch diesen Repository-Abgleich nicht verändert oder veröffentlicht. Composer-Abhängigkeiten werden mit `composer install` anhand des vorhandenen Lockfiles hergestellt. WordPress und die beiden Drittanbieter-Plugins werden in den oben genannten Versionen installiert.

## Reproduzieren und prüfen

```sh
cd frontend
npm ci
npm run lint
npm run build:wordpress
cd ..
node scripts/verify-staging-snapshot.mjs --manifest=deployment/staging/release.manifest.json
```

Die Anpassungen, die auf Staging zunächst direkt im ausgelieferten JavaScript vorgenommen wurden (Mitglieder-Dashboard, TR-Magazin-Flipbook, Bibliothek, Marktplatz-Fahrzeugformular, Dankestext der Anmeldung), sind in die React-/TypeScript-Quellen übernommen. Die frühere Delta-Datei `deployment/staging/app.bundle.delta.json` entfällt.

`npm run build:wordpress` baut die zusammengeführten Quellen und erzeugt `deployment/staging/release.manifest.json` für alle Programmdateien des Core-Plugins und App-Themes. Das ursprüngliche `manifest.json` bleibt als historischer Staging-Nachweis vom 13. Oktober erhalten. Der neue Build benötigt keine Delta-Datei und keine CSS-Injektion. Ältere Chunks und Peters vorhandene Bilder/PDF-Ressourcen bleiben erhalten. Neue Prüfsummen weisen Dateiintegrität nach; das Erhalten der Funktionen wird separat geprüft.

Peters Originalcommit `b25e0ef` und seine nachfolgende Manifest-Korrektur `89dfc9e` bleiben Teil der Versionsgeschichte. Das ursprüngliche Snapshot-Manifest wird als historischer Nachweis erhalten; das Veröffentlichungsmanifest erfasst auch `site-content.json` vollständig. Neue Funktionen ergänzen seine Quellcode-Übernahme. Ein Kandidatenmanifest ist kein Veröffentlichungsnachweis: vor dem Upload werden die betroffenen Serverdateien erneut gegen die gesicherte Ausgangsbasis geprüft. Abweichungen stoppen die Veröffentlichung bis zur Zusammenführung.

`npm run build:wordpress:source` baut ausschließlich die React-/TypeScript-Quellen, ohne Manifest-Aktualisierung.

## Konfiguration und Veröffentlichung

Eine persönliche Empfängeradresse war im Staging-Code der Antragsbenachrichtigung fest eingetragen. Im Repository wird dafür die WordPress-Einstellung `admin_email` verwendet. Auf Staging wurde lesend bestätigt, dass beide Empfänger identisch sind. Das Manifest kennzeichnet diese reine Konfigurationsnormalisierung und enthält die ursprüngliche Dateiprüfsumme, aber keine persönliche Adresse.

Die fertigen Programmdateien liegen unter `wordpress/wp-content/plugins/strc-core/` und `wordpress/wp-content/themes/strc-app/`. Eine spätere Veröffentlichung darf nur diese Programmdateien austauschen. Sie darf weder die Datenbank importieren noch vorhandene Beiträge, Einstellungen, Mitgliederdaten oder Uploads ersetzen. Am 13. Oktober wurden ausschliesslich die unten geprüften Programmdateien auf Staging veröffentlicht. Fairgate-Schreibzugriffe und echte Testnachrichten wurden nicht ausgeführt.


## Nachgewiesene Übernahme von Peters Änderungen

Der unveränderte Quellstand `8240a73` wurde separat neu gebaut. Sein JavaScript entspricht exakt der Basisprüfsumme der ehemaligen Delta-Datei; sein CSS entspricht bytegenau dem ursprünglichen Staging-CSS (210777 Bytes). Alle 44 zusätzlichen JavaScript-Änderungsblöcke wurden gegen Peters Quellcode-Patch eingeordnet:

| Änderung | Blöcke | Erhaltene Umsetzung |
|---|---:|---|
| Dankestext | 1 | Redaktionelle Felder, bestehende veröffentlichte Werte |
| Marktplatz | 6 | Formularanordnung, Kilometerstand, Darstellung und Preis |
| Dashboard | 18 | Pastellkästen, Magazineinstieg, Aufgaben und Administration |
| Bibliothek | 17 | Reihenfolge, Filter und Titelliste |
| Entfernte Dashboard-Texte | 1 | Entfernung und korrigierte Navigation |
| CSS-Injektion | 1 | Entsprechende Styles im regulären CSS |

Die Delta-Datei wurde nach diesem Abgleich entfernt. Neue Funktionen ergänzen Peters Gestaltung. Redaktionelle Werte werden nicht aus dem Quellcode in vorhandene veröffentlichte Inhalte zurückgeschrieben.

## Umsetzung und Abnahme am 13. Oktober

| Bereich | Verifizierter Stand |
|---|---|
| Quellen und Build | Vite-Build, TypeScript und ESLint erfolgreich |
| PHP | 101 Dateien syntaktisch geprüft; 51 Tests, 159 Assertions erfolgreich |
| Rollen | 20 WordPress-Integrationsprüfungen erfolgreich; Revisionen, getrennte Zuständigkeiten, Vorstandsschutz und alte Schnittstellen geprüft |
| HTTP | 26 Prüfungen erfolgreich; Login, PDF-Berechtigung, Uploadfehler, Kilometerstand, Antrag und persistente Doppelsendungssperre |
| Antrag | Beide Geburtsdaten sowie neue Fahrzeugangaben gespeichert; drei Sendungen erzeugen genau einen Antrag |
| Originalmagazin | Ausgabe 3/2026: 31 PDF-Seiten, 60 Magazinseiten; Einzel-/Doppelseiten, Pfeiltasten, Wischbewegung, Volltextsuche und Download geprüft |
| Download | 27681344 Bytes; heruntergeladene Datei byteidentisch mit dem Original |
| Darstellung | Desktop und 390-Pixel-Ansicht; neue Antragsfelder und französische Formular-/Magazinbeschriftungen geprüft |
| Tabulator | Echter Tabulator bleibt durch WordPress-HTML-Bereinigung erhalten; Editor und Darstellung verwenden acht Zeichen breite Tabstopps |
| Datenbestand | Alle 35 redaktionellen Optionen inklusive Entwürfen unverändert; 284 Mitgliedschaften erhalten; keine echten Funktionszuweisungen geändert |
| Bibliothek | Reiseberichte additiv ergänzt; individueller Katalog erhalten |
| Testschutz | Homepage, Schnittstellen, JavaScript, CSS und direkte Bilder liefern ohne Testpasswort HTTP 401 |
| Mitgliederlogin | Gemeinsames Testpasswort gewährt selbst keinen Mitgliederzugang |
| Cron | Zugangsdaten nur für eigenen HTTPS-Cron-Endpunkt; keine Weiterleitungen; TLS-Prüfung aktiv |
| Veröffentlichung | Alle 396 Programmdateien gegen das Veröffentlichungsmanifest geprüft |

Die Magazinprüfung verwendete eine lokale Kopie der ausgewählten Originaldatei und synthetische Dashboard-Daten. Die HTTP-Prüfungen liefen auf Staging mit temporären Konten; sämtliche E-Mail-Transporte wurden abgefangen. Testkonten, Anträge und Inserate wurden entfernt. Es erfolgte kein echter Aufnahme-, Zahlungs- oder Fairgate-Schreibtest. Eine physische Mobilgeräteabnahme wurde nicht durchgeführt.

Beim lesenden Fairgate-Abgleich wurden 522 Kontakte erfasst: 284 bestehende Website-Verknüpfungen, 226 Kontakte ohne Mitgliedschaft, neun Kontakte ohne gültige persönliche E-Mail und drei Firmenkontakte mit ungeklärtem persönlichem Login. Doppelte Fairgate-Verknüpfungen wurden nicht gefunden. Es gibt keine zusätzlichen eindeutigen Importkandidaten; der bestehende Import bleibt für gezielte Aktualisierungen verfügbar. Die zwölf ungeklärten Kontakte benötigen eine Datenklärung.

## Rückkehr und weitere Änderungen

Die vollständige Sicherung mit ursprünglichen Prüfsummen und Dateiberechtigungen liegt lokal unter `.private/staging-release-2026-10-13/`. Alle 375 ursprünglichen Programmdateien hatten Berechtigung 0644. Testzugangsdaten liegen ausschliesslich in `.private/staging-b-test-2026-10-13.json`; beides bleibt ausserhalb von Git.

Auf dem Server enthalten folgende private Verzeichnisse die geänderten Originaldateien und `rollback.json`:

1. `/private/strc-peter-release-20261013173600` – 39 Programmdateien.
2. `/private/strc-peter-release-20261013174255` – drei Übersetzungs-/Build-Dateien.
3. `/private/strc-peter-release-20261013175339` – abschliessende Du-Form der Fehlermeldung.

Eine Rückkehr erfolgt in umgekehrter Reihenfolge. Vor jeder Wiederherstellung muss die aktuelle Prüfsumme dem jeweiligen `installedSha256` entsprechen; andere Änderungen werden zuerst zusammengeführt. Neue Dateien werden nur bei übereinstimmender Prüfsumme entfernt. Die ursprüngliche `.htaccess` liegt in der lokalen Sicherung. Individuelle Rollenmigrationen sichern ihre bisherigen Metadaten vor dem ersten Speichern.

Vor jedem weiteren Upload prüft `scripts/deploy-staging.py` sämtliche Dateien der angegebenen Ausgangsbasis und unmittelbar vor dem Austausch nochmals die betroffene Datei. Abweichungen stoppen den Upload. Atomare Dateiersetzungen und eine geschützte Rückkehrliste begrenzen einen abgebrochenen Upload. Uploads, redaktionelle Optionen, Mitgliederdaten und WordPress-Konfiguration werden nicht durch dieses Programm ersetzt.

## Peters Pull Requests und Veröffentlichung am 14. Oktober

Die Pull Requests [#5](https://github.com/Dinten-dev/swiss-tr-club-website-v3/pull/5), [#6](https://github.com/Dinten-dev/swiss-tr-club-website-v3/pull/6), [#7](https://github.com/Dinten-dev/swiss-tr-club-website-v3/pull/7), [#8](https://github.com/Dinten-dev/swiss-tr-club-website-v3/pull/8), [#9](https://github.com/Dinten-dev/swiss-tr-club-website-v3/pull/9) und der während der Prüfung hinzugekommene [#10](https://github.com/Dinten-dev/swiss-tr-club-website-v3/pull/10) sind zusammengeführt. Peters Originalcommits bleiben in der Geschichte erhalten. Die beiden abschliessenden Integrationsstände `6c55eec` und `dfeef02` bestanden alle GitHub-Prüfungen; `35792ed` enthält beide Zusammenführungen.

Der Nutzer bestätigte ausdrücklich: Die Mitgliederkarte verwendet weiterhin PLZ-Pins und übermittelt keine Wohnadressen zur Geokodierung. Die viermonatige Aufbewahrung gilt auch für vorhandene Galerieoriginale; ausdrückliche Aufbewahrungsausnahmen bleiben erhalten. Forumsthemen inklusive Antworten und Anhängen können Verfasser und berechtigte Forumsmoderation endgültig löschen. Zum Prüfzeitpunkt waren keine vorhandenen Originale nach der neuen Frist zur Löschung fällig. Es wurde keine manuelle Löschung echter Originale ausgeführt.

| Prüfung und Korrektur | Nachweis |
|---|---|
| Bibliotheksrechte | Gefälschte IDs umgehen keine reservierten Dokumentarten; bestehende eigene Dokumente bleiben bearbeitbar |
| Magazin-Upload | Ein echtes PDF bis 25 MB; mehrere PDFs und übergrosse Dateien werden zurückgewiesen |
| Galerie-Upload | Formular und Server akzeptieren 2–10 MB; das widersprüchliche alte 2,5-MB-Limit wurde korrigiert |
| Geschützte Bilder | Webkopien höchstens 2.000.000 Bytes; Originaldownloads nur mit Berechtigung; ungeprüfte Bilder bleiben geschützt |
| Galerieübersicht | Letzte fünf begonnene Veranstaltungen, bestehende ältere Alben und ursprüngliche Fotografen bleiben erhalten |
| Benachrichtigungen | Wiederholte Freigabe erzeugt keine zweite Entscheidungsmeldung |
| Magazinansicht | Originalausgabe mit 60 Magazinseiten, integrierte Suche mit Treffern und Seitensprung, Einzel-/Doppelseite und Vollbild geprüft; Lade- und Vollbildfehler behandeln sichtbare Hinweise |
| Hausschrift | Vier selbst gehostete STRC-Sans-Schnitte und Lizenzdatei enthalten; tatsächliche TrueType-Dateien korrekt als `.ttf` eingebunden; keine Google-Schriftabfrage |
| Darstellung | Desktop mit 1280 Pixeln und mobile Ansicht mit 390 Pixeln geprüft; neue Galerie- und Verzeichnisbeschriftungen auf Französisch ergänzt |
| Automatische Prüfungen | Build, ESLint, TypeScript und Struktur erfolgreich; 51 PHP-Tests mit 159 Assertions; 101 Plugin-Dateien und Theme-Schriftcode syntaktisch geprüft |
| WordPress-Integration | 18 gezielte Prüfungen erfolgreich, darunter Rechte, Löschen, Aufbewahrung, Fotografen, Zukunftsfilter und fehlende Adressabfragen |
| HTTP | 17 zusätzliche Prüfungen erfolgreich; Galeriegrössen, Webkopie, Originalberechtigung und Magazin-PDF-Verträge |
| Datenbestand | 35 redaktionelle Optionen unverändert, SHA-256 `fd0d99618d0a0e028ad131e25b1538dba795beca8615264eb6cc84d4e18d76ff`; 284 Mitgliedschaften erhalten |
| Veröffentlichung | 26 geänderte/neue Programmdateien veröffentlicht; anschliessend alle 409 Programmdateien ohne Abweichung verifiziert |
| Testschutz | Startseite, Sitzungsschnittstelle, JavaScript, CSS und Schrift ohne Passwort HTTP 401, mit Testzugang HTTP 200; Testzugang allein gewährt keinen Mitgliederzugriff |

Die Bildschirmprüfung verwendete synthetische Testdaten und eine lokale Kopie des Originalmagazins. Die neuen HTTP-Prüfungen verwendeten isolierten Kandidatencode auf Staging und temporäre Konten. E-Mail-Transporte, externe HTTP-Anfragen und Änderungen an Nicht-Testkonten wurden abgefangen. Testkonten und Testuploads sind entfernt. Sechs eindeutig eigene Hinweise zu bereits entfernten Testinseraten vom Vortag wurden nach privater Sicherung gezielt entfernt; echte Benachrichtigungen blieben erhalten. Keine Fairgate-Schreiboperation wurde ausgeführt. Eine physische Mobilgeräteabnahme und ein echter Zahlungsdurchlauf wurden nicht durchgeführt.

Vor der Veröffentlichung entsprachen alle 396 gesicherten Ausgangsdateien noch der Ausgangsbasis. Die Veröffentlichung prüfte sie erneut und ersetzte jede betroffene Datei nur bei passender ursprünglicher Prüfsumme. Alte Build-Chunks bleiben für bereits geöffnete Ansichten verfügbar. Datenbank, Uploadbestand und redaktionelle Inhalte wurden nicht ersetzt.

Die vollständige Ausgangssicherung, Prüfergebnisse und das zusätzliche lokale Rückkehrpaket liegen ausserhalb von Git unter `.private/peter-prs-2026-10-14/`. Die unveränderten Testzugangsdaten bleiben in `.private/staging-b-test-2026-10-13.json`. Das serverseitige Rückkehrpaket für diese Veröffentlichung liegt unter `/private/strc-peter-release-20261014130025` und enthält die ursprünglichen geänderten Dateien sowie `rollback.json`. Für eine Rückkehr gilt weiterhin der oben beschriebene Abgleich von `installedSha256`, damit spätere Änderungen erhalten bleiben.

## Peters Oktober-Aufträge: Veröffentlichung am 20. Oktober 2026

Die Pull Requests #11–#19 sind vollständig enthalten. #11–#15 waren bereits auf GitHub zusammengeführt, aber noch nicht auf Staging veröffentlicht. Der geprüfte Stand `1f16f066b9e5306ca95941e8aaba4f6d452fd394` wurde über [PR #19](https://github.com/Dinten-dev/swiss-tr-club-website-v3/pull/19) in `main` übernommen (`7583ecf`). Die darin enthaltenen PRs #16–#18 sind ebenfalls als zusammengeführt markiert; zum Abschluss waren keine offenen Pull Requests vorhanden. Peters Originalcommits und Gestaltung bleiben erhalten.

| Bereich | Ausgelieferter Stand |
|---|---|
| Startseite und Regionen | Grauer Trenner, Georgia-Titel, direkte Redaktion, öffentliche PDFs mit Titel/Bearbeitung |
| Veranstaltungen | Vier Preisarten, Weekend EZ/DZ, nominierte Veranstaltungsleitung mit Funktionsprüfung |
| Dashboard | Mitgliedschaftskopf, Abowünsche, eigene Anlässe und Prüflisten |
| Rollen | Tabelle und Vorstandszuteilung durch Administratoren; Vorstandsdokumente weiterhin explizit geschützt |
| Mitgliederverwaltung | Bestehende Zuordnung ausschliesslich an Aktuar/Kasse geprüft und erhalten |
| Mitgliedergalerie | Redaktionelle Steckbriefe, geschützt gespeichertes Bild, Fakten und Einwilligung |
| Mobilnavigation | Hamburger-Menü, Escape schliesst und stellt Fokus wieder her |
| Mitgliedschaftsprofil | Zwei Spalten, Co-Pilot, Paarantrag, gesperrte Fairgate-Identität, lokal erhaltene Änderungsanfragen |
| Marktplatz | Ersatzteile sofort sichtbar; Fahrzeuge geprüft; Service-Inserat im Namen eines aktiven Mitglieds |
| Mitgliederverzeichnis | Frühere Abmeldungen ausdrücklich respektiert; Fotoänderung aktiviert niemanden erneut |
| Fairgate-Fahrzeuge | Additiver, konfigurierbarer Import mit Duplikatprüfung implementiert; realer Import mangels API-Feldern nicht ausgeführt |

Die Prüfung korrigierte verlorene Paarverknüpfungen beim Fairgate-Abgleich, unvollständig bestätigte Profilübertragungen, wiederauflebende alte Änderungsanfragen, doppelte Abowünsche und unberechtigte Service-Empfänger. Bestätigte lokale Paarhaushalte bleiben bei späteren Importen erhalten. Fehlende Feldzuordnungen ergeben einen vollständigen lokalen Antrag statt einer fälschlich erfolgreichen Teilübertragung. PDF-Titel werden vor dem Anlegen eines Anhangs geprüft. Neue Ansichten und Beschriftungen wurden auf Französisch ergänzt.

### Prüfungen und Datenbestand

| Nachweis | Ergebnis |
|---|---|
| Quellen und Build | TypeScript, ESLint, Vite und Strukturprüfung erfolgreich; GitHub-Prüfungen für exakt `1f16f06` grün |
| PHP | 107 Plugin-Dateien syntaktisch geprüft; 60 Tests mit 185 Assertions erfolgreich |
| WordPress | 42 Oktober-Integrationsprüfungen und 18 bisherige Integrationsprüfungen erfolgreich |
| HTTP | 41 Prüfungen erfolgreich: Profile, Anfragen, Rechte, Porträts, Service-Inserate, Veranstaltungen, regionale PDFs |
| Darstellung | Desktop 1280 px und Mobil 390 px: Profilspalten, Menü, Porträts, Rollen und Service-Auswahl geprüft |
| Fairgate-Zusatzdaten | 285 Mitgliedschaften geprüft; 285 Eintrittsdaten und Geschlechtsangaben sowie 282 Sprachen gezielt aktualisiert |
| Erhaltung | Alle anderen Mitgliedschaftsspalten, reale Benutzerrollen, 35 redaktionelle Optionen und das vorhandene Website-Fahrzeug unverändert |
| Veröffentlichung | 409 Ausgangsdateien vor Austausch erneut geprüft; 32 Programmdateien veröffentlicht; alle 419 Manifest-Dateien anschliessend ohne Abweichung geprüft |
| Testschutz | Startseite, Sitzungsschnittstelle, JavaScript, CSS und Schrift ohne Passwort 401, mit Testzugang 200 |
| Trennung der Zugänge | Gemeinsames Testpasswort allein gewährt weiterhin keinen Mitgliederzugriff; Zugangsdaten unverändert |

Die Datenkorrektur übernahm ausschliesslich die tatsächlich lesbaren Fairgate-Eintrittsdaten, Geschlechtsangaben und Korrespondenzsprachen in bestehende Website-Verknüpfungen. Vorwerte wurden gesichert, konkurrierende Änderungen geprüft und sämtliche Ergebnisse erneut gelesen. Es wurden keine Konten, Rollen oder Mitgliedschaftstypen ausgetauscht. Alle 285 Mitgliedschaften bleiben erhalten. Kein Datenbankimport und kein Fairgate-Schreibzugriff wurden ausgeführt.

Die HTTP- und WordPress-Prüfungen verwendeten isolierten Kandidatencode auf dem Staging-Server mit temporären Konten und eigenen Testdateien. E-Mail-Transporte und externe Anfragen wurden abgefangen; keine echten Nachrichten wurden gesendet. Testkonten und Testuploads sind entfernt. Die Browserprüfung verwendete den echten Build mit synthetischen Daten. Nach dem Upload wurden Dateiintegrität und Zugriffsschutz direkt auf Staging geprüft. Physisches Mobilgerät, echter Zahlungsdurchlauf und echter WhatsApp-Versand: nicht durchgeführt. Die gemeinsame Rollenabnahme mit Alain bleibt eine manuelle Abnahme, es wurde niemand kontaktiert.

### Konfiguration und externe Voraussetzungen

Die nicht geheimen Vorgaben stehen versioniert in `deployment/staging/options.php`. Auf Staging werden sie aus `/private/strc-october-2026.php` vor WordPress geladen. Die bestehende Konfiguration erhielt nur diesen Include; vorhandene Geheimnisse wurden erhalten. Bereits gesetzte Konstanten werden nicht überschrieben.

| Funktion | Verifizierter Stand / verbleibende Voraussetzung |
|---|---|
| Fairgate-Grundzuordnung | Kontakt-ID, Status, Eintrittsdatum, Geschlecht und Korrespondenzsprache anhand tatsächlicher API-Antworten zugeordnet |
| Fairgate-Sonderfelder | Alle 524 lesbaren Kontakte und zusätzliche Detailantworten geprüft; Fahrzeuge, Geburtstage, Co-Pilot und Abos werden vom aktuellen API-Zugang nicht geliefert |
| Fahrzeugübernahme | Benötigt freigegebene Fahrzeugfelder und deren JSON-Pointer für `STRC_FAIRGATE_VEHICLE_FIELDS`; danach Vorschau prüfen und nur fehlende Fahrzeuge ergänzen |
| Co-Pilot/Haushalt | Feldfreigabe und Haushaltzuordnung fehlen; bestehende lokale Partnerverknüpfungen bleiben wirksam |
| Fairgate-Feldpflege | Umbenennung, Migration und Löschung alter Felder wurde nicht ohne gesicherte Zuordnung durchgeführt |
| Profiländerungen | Fairgate-Schreibfunktion deaktiviert; Änderungen bleiben als nachvollziehbare Anfragen im Formularpostfach |
| WhatsApp | Vorlagen `tr_forum_de` / `tr_forum_fr` gesetzt; Versand deaktiviert, Make-Webhook fehlt |
| zahls.ch | Deaktiviert, Modus `TEST`; Instanz und API-/Webhook-Schlüssel fehlen |
| Newsletter | Brevo bleibt ungenutzt; der Club verwendet Fairgate |

### Sicherung und Rückkehr

Die vollständige Ausgangssicherung, Konfiguration, Prüfergebnisse und Datenvorwerte liegen ausschliesslich privat unter `.private/peter-2026-10-20/`. `release-receipt.json` enthält die Konfigurationsprüfsummen; `extra-fields-before.json` enthält die gezielt geänderten Datenvorwerte. `server-rollback.tar.gz` wurde zusätzlich lokal gesichert und auf Vollständigkeit geprüft. Keine Zugangsdaten oder Personenexporte wurden eingecheckt.

Serverseitiges Rückkehrpaket: `/private/strc-peter-release-20261020063832`. Es enthält ursprüngliche Programmdateien, `rollback.json`, ursprüngliche WordPress-Konfiguration, installierte nicht geheime Optionen und Zusatzdatenvorwerte. Dateiberechtigungen der Ausgangsbasis bleiben lokal dokumentiert.

Bei Rückkehr zuerst spätere Änderungen ausschliessen: Programmdateien nur bei passender `installedSha256` wiederherstellen; neue Dateien nur bei passender Prüfsumme entfernen. Die WordPress-Konfiguration nur bei passender installierter Prüfsumme aus dem Receipt ersetzen und ihre dokumentierten Rechte erhalten. Den privaten Options-Include anschliessend entfernen, wenn die wiederhergestellte Konfiguration ihn nicht mehr verwendet. Datenfelder nur zurücksetzen, wenn sie noch dem im Plan gesicherten `after`-Wert entsprechen. Andere redaktionelle Inhalte, Uploads, Rollen und Mitgliedsdaten nicht zurückspielen. Der unveränderte historische Staging-Snapshot bleibt Vergleichsbasis; das Veröffentlichungsmanifest dokumentiert den tatsächlichen neuen Stand.

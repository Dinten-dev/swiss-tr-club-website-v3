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

## Fairgate-Webhook-Fix am Abend des 20. Oktober

[PR #22](https://github.com/Dinten-dev/swiss-tr-club-website-v3/pull/22), geprüfter Commit `17cd3e26edef66df03687cd1547b466ab0e3339d`, wurde über `7342bc8` zusammengeführt und auf Staging veröffentlicht. Sechs Programmdateien wurden unter erneutem Abgleich der 419 Ausgangsdateien ersetzt oder ergänzt. Anschliessend stimmten sämtliche 420 Manifest-Dateien mit dem ausgelieferten Stand überein. 285 Mitgliedschaften, alle realen Benutzerrollen und sämtliche 35 redaktionellen Optionen bleiben erhalten. Temporäre Testkonten wurden entfernt.

Der Empfänger, persistente Warteschlange, Cron-Verarbeitung, Wiederholungen und geheimnisfreie Diagnose sind implementiert. Der Worker übernimmt keine Kontaktwerte aus Meldungen, sondern liest die Daten authentifiziert neu. Meldungen können keine neuen Konten anlegen. 108 PHP-Dateien wurden syntaktisch geprüft; 63 PHPUnit-Tests mit 192 Assertions und 33 isolierte WordPress-Prüfungen bestanden. Fehlerbehandlung, wartende Wiederholungen, parallel eintreffende Meldungen, gefälschte Nutzdaten, fehlende Berechtigung, Verzeichnis-Abmeldungen und gesperrte Fairgate-Kontaktschreibzugriffe sind abgedeckt. Echte externe Nachrichten oder Kontaktschreibtests wurden nicht ausgeführt. Build und GitHub-Prüfungen bestanden für den genauen Commit.

**Nach ausdrücklicher Nutzerfreigabe aktiviert:** Der Nutzer genehmigte ausschliesslich POST auf die exakte geheime Fairgate-Callback-URL. Die private Empfangskonfiguration und die begrenzte Webserver-Ausnahme sind installiert. Eine zunächst inkompatible Apache-Ausdruckssyntax wurde umgehend auf den gesicherten Schutz zurückgesetzt und anschliessend kompatibel korrigiert. Der Passwortschutz für andere Pfade und Methoden wurde danach direkt geprüft.

Vier tatsächlich verfügbare Ereignisse sind registriert und durch erneutes Lesen bestätigt: `contact.data.updated`, `contact.created`, `contact.deleted` und `contact.job.complete`. Fremde Abonnements existierten zuvor nicht und wurden nicht verändert. Die Registrierung betrifft Benachrichtigungseinstellungen; Fairgate-Kontaktdaten wurden nicht geschrieben.

17 reale HTTP-Prüfungen bestanden: Startseite, Sitzung, JavaScript, CSS und Schrift bleiben ohne Testpasswort mit 401 geschützt und mit Testzugang erreichbar. GET auf die korrekte Callback-URL, falsche Schlüssel und andere Pfade sind ebenfalls geschützt. Ungültiges JSON und übergrosse Nachrichten werden abgewiesen. Die gültige Testmeldung erhielt HTTP 202 nach 1,319 Sekunden. Der echte Cron-Worker aktualisierte anschliessend alle 285 bestehenden Mitglieder durch authentifizierten Fairgate-Abruf; Warteschlange leer, kein Fehler. Letzter geprüfter Abschluss: 20.10.2026, 20:15:41 Uhr Europe/Zurich. Dieser Durchlauf wurde durch eine eigene Testmeldung ausgelöst; eine absichtlich erzeugte Fairgate-Kontaktänderung wurde nicht vorgenommen. Alle 420 Programmdateien, 35 redaktionellen Optionen und realen Rollenzuweisungen wurden nach dem Abgleich erneut geprüft und sind erhalten.

Der aktuelle lesende Fairgate-Abgleich bestätigte erneut 524 Kontakte. Verfügbar sind vier Notification-Ereignisse; vor Einrichtung existierten keine Abonnements. Die API liefert weiterhin ausschliesslich die konfigurierten Grundfelder, keine Fahrzeuge, Geburtstage, Co-Pilot- oder Abofelder. Deren Freigabe kann die WordPress-Implementierung nicht ersetzen. Staging schreibt weiterhin keine Fairgate-Kontaktdaten.

Betrieb und Vorbereitung sind in [fairgate-webhooks.md](fairgate-webhooks.md) dokumentiert. Vollständige private Ausgangssicherung, Prüfergebnisse, Konfigurationsvorbereitung und lokales Rückkehrpaket: `.private/fairgate-webhook-2026-10-20/`. Serverseitiges Rückkehrpaket: `/private/strc-peter-release-20261020173307`. Die Rückkehr erfolgt ausschliesslich nach Abgleich der aktuell installierten Prüfsummen; keine Datenbank, Inhalte oder Uploads zurückspielen.

## Peters Pushes vom 22. Oktober 2026

[PR #26](https://github.com/Dinten-dev/swiss-tr-club-website-v3/pull/26) integriert Peters PRs #20, #21, #23, #24 und #25 einschliesslich ihrer ursprünglichen Commits. Geprüfter Integrationsstand: `8c1d359`, zusammengeführt als `dd61c6f`. Sämtliche sechs Pull Requests sind zusammengeführt; Peters Branches bleiben erhalten.

Übernommen: Mitgliederlogin zum Dashboard, Profil- und Mobilgestaltung, regionale Banner, Forumübersicht, Paaranfragen im Antragspostfach, Shopgestaltung und Produktsortierung, Fahrzeugfelder sowie Rollen- und Versandablauf. Ergänzende Korrekturen erhalten Verzeichnis-Abmeldungen und bestehende Inserat-PDFs, validieren das MFK-Kalenderdatum und sichern Rollenwechsel gegen veraltete Speicherstände. Die neue Rollenhierarchie trennt technische Webmasterrechte, Superadmin, Administration und operative Funktionen. Mitgliederverwaltung und Finanzen bleiben exklusiv; Vorstandsdokumente benötigen eine ausdrückliche Vorstandsrolle.

Versand verwendet eine Bestellsperre, wiederholbaren Mailtransport und einmalige Versandbestätigung. Versand bestätigt keine Rechnungszahlung. Private Bestellmetadaten erscheinen nicht auf dem Lieferschein. Der Versandpartner besitzt keinen Mitglieder- oder allgemeinen Shopverwaltungszugang. Es wurden kein reales Versandkonto eingerichtet, keine Versandrolle vergeben und kein externer Empfänger konfiguriert. Eine spätere Aktivierung benötigt die ausdrückliche Freigabe für Konto, Empfänger und tatsächliche Auftragsweitergabe. Es wurden keine echten Bestellungen oder E-Mails ausgelöst.

| Prüfung | Ergebnis |
|---|---|
| Quellcode und CI | TypeScript, ESLint, Build, Struktur und GitHub-Prüfungen für exakt `8c1d359` erfolgreich |
| PHP | 110 Dateien syntaktisch geprüft; 66 PHPUnit-Tests mit 285 Assertions bestanden |
| WordPress | 99 isolierte Integrationsprüfungen bestanden; 10 Testmails abgefangen, keine externen Anfragen |
| Rollen nach Veröffentlichung | 170 definierte Rechte und exklusive Grenzen geprüft; Rollenstand `20261021-2` |
| Darstellung | Synthetische Profil-/Rollenansichten Desktop 1280 px und Mobil 390 px; französische Profiltexte; Lieferschein als PDF gerendert und geprüft |
| Veröffentlichung | 420 Ausgangsdateien erneut abgeglichen; 37 Programmdateien veröffentlicht; alle 426 Manifest-Dateien ohne Abweichung |
| Datenerhaltung | 285 Mitgliedschaften, alle 286 Benutzerzuweisungen samt Zuständigkeits-/Datenschutzwerten, 35 redaktionelle Optionen und vorhandene Fahrzeugdaten unverändert |
| HTTP und Schutz | 24 direkte Prüfungen bestanden: Ressourcen, Login, Shop, Warenkorb, Checkout und begrenzte Webhook-Ausnahme |
| Testbereinigung | Keine temporären Benutzer oder Bestellungen verbleiben |

`STRC_FRONTEND_ORIGIN` wurde als einzige Konfigurationszeile von der alten Plesk-Adresse auf `https://staging.swisstrclub.ch` korrigiert. Vor Austausch wurde die unveränderte Konfiguration anhand der gesicherten Prüfsumme bestätigt; Berechtigung 0600 bleibt erhalten. Webhook-Geheimnis, bestehende Includes, Zugangsdaten und `.htaccess` bleiben erhalten. Der Webhook bleibt aktiv. Fairgate-Kontaktschreibzugriff und fehlende Sonderfeldfreigaben wurden nicht verändert oder als vorhanden dargestellt.

Die Rolleninstallation hat die vorherigen Definitionen einmalig gesichert. Reale Benutzerrollenzuweisungen blieben unverändert; niemand wurde automatisch zum Superadmin oder Versandpartner. Die Browserprüfungen verwendeten synthetische Daten; die anschliessenden Datei-, Daten-, Rechte- und HTTP-Prüfungen erfolgten direkt auf Staging. Physisches Mobilgerät, echter Zahlungsdurchlauf und externe Versandabwicklung wurden nicht getestet.

Private Nachweise und vollständige Ausgangssicherung: `.private/peter-2026-10-22/`. Serverseitiges Rückkehrpaket: `/private/strc-peter-release-20261022104212`; lokal zusätzlich `server-rollback.tar.gz`. Es enthält ursprüngliche Programmdateien, `rollback.json`, ursprüngliche Konfiguration, frühere Rollendefinitionen und Benutzerzuweisungen. Programmdateien nur bei unveränderter installierter Prüfsumme zurücksetzen, neu hinzugefügte Dateien nur bei passender Prüfsumme entfernen. Konfiguration nur bei der dokumentierten installierten Prüfsumme aus `origin-change.json` zurücksetzen, Berechtigung 0600 erhalten. Rollendefinitionen und Versionsoption nur zurücksetzen, wenn sie noch dem gesicherten installierten Rollenstand entsprechen; spätere Zuweisungen und Daten niemals pauschal überschreiben. Der historische Snapshot bleibt unverändert.

## PR #27: Shop-Korrekturen am 23. Oktober 2026

[PR #27](https://github.com/Dinten-dev/swiss-tr-club-website-v3/pull/27), geprüfter Commit `b889111044f0fefc5d90cd32d2e9664a73c20946`, wurde als `6d2c669` zusammengeführt und auf Staging veröffentlicht. Zwei PHP-Dateien wurden ersetzt: `functions.php` und `index.php`. Der bestehende Frontend-Build blieb unverändert. Die normale Seitenausgabe verwendet nun das WooCommerce-Template mit deutschen/französischen Titeln und dem bereits vorhandenen Dashboard-Link im angemeldeten Shop-Konto. Mobilnummer bleibt auch bei der WooCommerce-Einstellung «optional» verpflichtend; der englische Checkout-Datenschutzabsatz wird über den korrekten Filter entfernt. Andere Datenschutzhinweise bleiben erhalten.

Vor Veröffentlichung wurden alle 426 Ausgangsdateien mit dem bisherigen Veröffentlichungsmanifest verglichen und vollständig privat gesichert. Nach Veröffentlichung stimmen sämtliche 426 Dateien mit dem neuen Manifest überein. Eine bereits bestehende PHP-Startwarnung des serverseitigen i360-Moduls verhinderte zunächst das automatische Einlesen der erfolgreichen Veröffentlichungsantwort. Es erfolgte kein zweiter Upload: Das vorhandene Rückkehrprotokoll und jede ausgelieferte Datei wurden unabhängig geprüft, danach wurde der tatsächliche Veröffentlichungsstand dokumentiert. Die Warnung wurde nicht unterdrückt und keine Schutzkonfiguration geändert.

16 isolierte WordPress-/WooCommerce-Prüfungen bestanden: Vorbelegung von Name, Adresse, Mobilnummer und E-Mail aus einem synthetischen Mitgliedsprofil; geänderte Eingaben bleiben erhalten; Telefonpflicht trotz optionaler Einstellung; deutsche/französische Beschriftung; Checkout-Datenschutzfilter ohne Änderung des Registrierungshinweises; Passwort-Reset mit gültigem Schlüssel, neuem funktionierendem Passwort und abgewiesenem Wiederverwenden des Schlüssels. Testmails wurden abgefangen, keine Bestellung angelegt, alle Testkonten entfernt. Beide geänderten PHP-Dateien wurden syntaktisch geprüft; alle GitHub-Prüfungen des exakten PR-Commits bestanden. Ein zusätzlicher vollständiger Frontend-Neubau war für diese beiden PHP-Änderungen nicht erforderlich.

26 reale HTTP-Prüfungen bestanden, darunter Passwortschutz von Seiten und Ressourcen, Erreichbarkeit mit Testzugang, Shop-Routen, die Überschriften «Warenkorb» und «Mein Shop-Konto» sowie die bestehende begrenzte Webhook-Ausnahme. Alle 286 realen Benutzerrollen und Zuständigkeits-/Datenschutzwerte, die 35 redaktionellen Optionen, sämtliche Mitgliedschaftsdatensätze, WordPress-Konfiguration und `.htaccess` bleiben unverändert. Peters am selben Tag ausdrücklich zugewiesene Superadmin-Rolle bleibt bestehen. Keine echten Bestellungen oder E-Mails wurden für diese Prüfung ausgelöst.

Zum Mitglieder-Erstzugang: 285 Website-Mitgliedschaften sind bereits mit Fairgate verknüpft. Ein bestehendes importiertes Konto kann sein Website-Passwort über «Passwort vergessen» setzen; die Funktion legt kein neues Konto an und übernimmt kein altes Website-/Fairgate-Passwort. Die hinterlegte E-Mail muss zum importierten Konto passen. Adresse ist bei 284 Mitgliedern vorhanden. Regionsangaben fehlen aktuell bei allen 285 Mitgliedschaften; diese Einschränkung wird durch einen Passwort-Reset nicht behoben. Fairgate muss die Regionsdaten liefern und die Zuordnung muss freigegeben werden. Geburtstage, Fahrzeuge, Co-Pilot und Abofelder bleiben ebenfalls von den zuvor dokumentierten Feldfreigaben abhängig. Ein neuer, noch nicht importierter Fairgate-Kontakt wird durch den Webhook nicht automatisch als Website-Konto angelegt.

Private Sicherung und Nachweise: `.private/pr27-2026-10-23/`. Serverseitiges Rückkehrpaket: `/private/strc-peter-release-20261023075630`, zusätzlich lokal als `server-rollback.tar.gz` gesichert. Es enthält ausschliesslich die beiden vorherigen Programmdateien und deren `rollback.json`. Bei Rückkehr jede aktuelle Datei zuerst gegen `installedSha256` prüfen; nur bei unverändertem Stand den jeweiligen Vorwert wiederherstellen. Mitgliederdaten, Inhalte, Uploads, Rollen und Konfiguration nicht zurückspielen.

## PR #28 und #29: Kasse und Kosmetik am 24. Oktober 2026

Peters [PR #28](https://github.com/Dinten-dev/swiss-tr-club-website-v3/pull/28) (`88e18ca9926f8cc52b52e795d176a817c70e97b6`) und [PR #29](https://github.com/Dinten-dev/swiss-tr-club-website-v3/pull/29) (`d08098bafa5047fabdc22d1c736e4e79a1a97974`) wurden mit ihren ursprünglichen Commits in [PR #30](https://github.com/Dinten-dev/swiss-tr-club-website-v3/pull/30) integriert. Geprüfter Integrationsstand `8549dfa`, zusammengeführt als `5650f9b`. Alle drei Pull Requests sind zusammengeführt; Peters Branches bleiben erhalten.

Übernommen: Mobilnummerpflicht bei Darstellung und serverseitiger Kassenprüfung; neue Reihenfolge und Titel der Regionalseiten; Titelbilder in allen Bibliotheksgruppen; Abmelden im Navigationsbalken; eigene Kontaktdaten zur Marktplatz-Vorbelegung; Moderation veröffentlichter Inserate und wiederherstellbares Entfernen; Galeriealbum als eigene Seite mit horizontaler Navigation und gezieltem Foto-Hinzufügen; normalisierte Forum-Expertisen; neue Bestellkarten, Direktverkauf und Shop-Abrechnung.

Die Prüfung ergänzte vier Erhaltungskorrekturen: Unveränderte ältere Albumbeschreibungen über 250 Zeichen bleiben bearbeitbar; abgeschlossene Foto-Uploads hinterlassen kein altes Albumziel; die Bestellliste fragt ausdrücklich nur `shop_order` ab und stürzt nicht mehr an Rückerstattungsobjekten ab; die Marktplatz-Bestätigung benennt den wiederherstellbaren Papierkorb korrekt. Französische Beschriftungen wurden ergänzt. Der CSV-Knopf bezeichnet ausdrücklich die aktuelle Seite; Zahlungsfilter und Export beziehen sich auf die aktuell geladene Bestellseite. Keine bestehenden Inhalte wurden gekürzt oder migriert.

| Prüfung | Verifiziertes Ergebnis |
|---|---|
| Frontend | TypeScript, ESLint, Build und Manifestprüfung bestanden; letzte Build-Ausgabe unverändert veröffentlicht |
| GitHub | Alle Prüfungen für exakt `8549dfa` bestanden |
| PHP | 110 Plugin-Dateien syntaktisch geprüft; 66 Unit-Tests mit 285 Assertions bestanden; geänderte Theme-Datei zusätzlich bei Veröffentlichung syntaktisch geprüft |
| Neue Integration | 31 Prüfungen für Kontaktdatenschutz, Telefonfeld/Validierung, DE/FR, Expertisen, alte Albumtexte, Moderationsrechte, Papierkorb und Shop-Summen bestanden |
| Bestehende Integration | Weitere 99 Rollen-, Profil-, Datenschutz-, Bibliotheks-, Formular- und Versandprüfungen bestanden |
| Browser | Synthetische Albumseite bei 1280 px und 390 px: Navigation zum zweiten Bild und Zielalbum im Uploadformular geprüft; Shop-Abrechnung/-karten und französische Labels geprüft; kein horizontaler Seitenüberlauf bei 390 px |
| Browsergrenze | Weitere Filterbedienung wurde wegen eines zeitweiligen Browser-Prüfdienst-Timeouts nicht abgeschlossen. Kein echtes Touchgerät und kein vollständiger Bezahl-/Bestellvorgang getestet. |
| Veröffentlichung | Alle 426 Ausgangsdateien unmittelbar vor Austausch unverändert; 11 Programmdateien ersetzt/ergänzt; anschliessend alle 428 Manifest-Dateien ohne Abweichung |
| HTTP | 26 direkte Zugriffsprüfungen bestanden: Seiten, Ressourcen, Shop-Routen und bestehende Webhook-Ausnahme |
| Tatsächliche Kasse | Acht zusätzliche Prüfungen im echten PHP-Webserver bestanden: Mobilnummer im HTML Pflicht statt optional, fehlende Nummer serverseitig abgewiesen, vorhandene Nummer akzeptiert, Name/Adresse aus einem bestehenden Mitgliederprofil korrekt vorbelegt |
| Datenerhaltung | Alle 286 realen Benutzerrollenzuweisungen samt Zuständigkeiten/Datenschutzwerten, 35 redaktionelle Optionen, sämtliche Mitgliedschaftsdatensätze, Konfiguration und `.htaccess` unverändert; 285 Mitgliedschaften erhalten |
| Bereinigung | Eigene temporäre Konten, Inserate, Alben, Testbestellungen, Testdateien und Prüfendpunkt entfernt; keine echten Nachrichten, Fairgate-Kontaktschreibzugriffe oder Zahlungen ausgelöst |

Die aktuelle WooCommerce-Einstellung «Telefonfeld» wurde nicht überschrieben. Die neue Darstellung und Validierung sind trotz des bisherigen Werts `optional` direkt im Webserver bestätigt. Peters zuletzt vergebene Rollen und sein Superadmin-Zugang bleiben erhalten. Fairgate-Zuordnungen und die getrennt dokumentierten noch offenen Feld-/Datenfragen wurden bei diesem Release nicht verändert.

Die Veröffentlichungsquittung wird jetzt trotz vorangestellter PHP-Startwarnungen eindeutig anhand des erwarteten Rückkehrverzeichnisses und der Dateianzahl erkannt. Unklare Quittungen führen weiterhin zum Abbruch mit ausdrücklicher Prüfaufforderung; es erfolgt kein automatischer zweiter Upload. Staging-Passwortschutz und Webhook-Ausnahme wurden nicht angepasst.

Private vollständige Ausgangssicherung und Nachweise: `.private/pr28-pr29-2026-10-24/`. Serverseitiges Rückkehrpaket `/private/strc-peter-release-20261024090642`, lokal zusätzlich `server-rollback.tar.gz`. Es enthält die ersetzten Programmdateien und `rollback.json`. Vor Rückkehr jede aktuelle Datei mit `installedSha256` vergleichen; nur unveränderte installierte Dateien aus dem jeweiligen Vorwert wiederherstellen, neue Dateien nur bei passender Prüfsumme entfernen. Keine Inhalte, Uploads, Rollen, Mitgliedschaften oder Konfiguration zurückspielen. Spätere Änderungen von Peter zuerst einlesen und zusammenführen.

## Mitgliederzugang, TRiungsters und Agenda-Rollen am 24. Oktober 2026

[PR #31](https://github.com/Dinten-dev/swiss-tr-club-website-v3/pull/31), geprüfter Commit `431dc2f5353b269e150d970a0311fdbc7957f571`, wurde als `4d3ced1` zusammengeführt und ausschliesslich auf Staging veröffentlicht. Die Ursache des gemeldeten Zugangsfehlers war eine vorhandene aktive Fairgate-Mitgliedschaft bei einem Konto mit ausschliesslich technischer Webmaster-Rolle. Der Berechtigungsfilter berücksichtigt nun solche Mitgliedschaften, wenn Kontakt-ID und Mitgliedschaft übereinstimmen und die bestehende Verknüpfung durch den Import oder eine ausdrückliche Prüfung bestätigt ist. Die technische Rolle bleibt erhalten; administrative oder fachliche Funktionen werden dadurch nicht vergeben. Eine E-Mail-Adresse oder das blosse Vorhandensein eines beliebigen Fairgate-Kontakts reicht weiterhin nicht aus. Passwort und Passwort-Reset wurden nicht geändert.

TRiungsters ist zusätzlich als Zuständigkeit auswählbar. Die bestehenden sieben Regionen und ihre IDs bleiben erhalten; die öffentliche Jugendseite wird nicht dupliziert. Die neue Rolle Agenda-Moderator erlaubt Veranstaltungen für ausgewählte Regionen oder, ohne Regionsauswahl, die Clubagenda. Sie verleiht keine Bearbeitungsrechte für Regionalseiten, Mitgliederverwaltung, Finanzen oder Vorstandsunterlagen. Peters bestehende Mitglieds- und Superadmin-Rollen wurden auf ausdrücklichen Auftrag um Vorstand ergänzt. Die bestehende Sperre gegen eigenständige Rechteerhöhung bleibt erhalten.

Das freigegebene Portrait wurde als neues WordPress-Medium beim vorhandenen Eintrag Traver Dinten / Webmaster unter Organisation / Weitere Funktionen eingefügt. Alle anderen Portraits, Texte, Bildausschnitte, Sprachvarianten und Einstellungen blieben erhalten. Die redaktionelle Revision wurde von 17 auf 18 erhöht und der vorherige Stand in der bestehenden Historie gesichert. Das Portrait wurde nicht ins Quellcode-Repository aufgenommen.

Validierung: 67 PHP-Tests mit 297 Assertions, 36 neue Integrationsprüfungen und 99 bestehende Regressionen bestanden. 110 Plugin-Dateien syntaktisch geprüft; Frontend-Lint, TypeScript, Build und Manifestprüfung erfolgreich. Die neuen Rollen und Regionsauswahl wurden in der Browseransicht auf Deutsch und Französisch geprüft. Kein vollständiger persönlicher Browser-Login mit dem Passwort des Nutzers wurde ausgeführt. Im tatsächlichen PHP-Webserver wurden zehn Zugangs-/Rollenprüfungen bestätigt: Traver erhält Mitgliederzugang und behält Webmaster-Rechte ohne Vorstandsrechte; alle 285 aktiven Mitgliedschaften besitzen Zugang, keine unerwartete Ablehnung oder Freigabe inaktiver Mitgliedschaften; Peter besitzt weiterhin Superadmin und zusätzlich Vorstand; acht Zuständigkeiten und neue Agenda-Rolle verfügbar.

Alle 428 Ausgangsdateien wurden unmittelbar vor Veröffentlichung mit der gesicherten Ausgangsbasis verglichen. 15 Programmdateien wurden gezielt ersetzt/ergänzt; anschliessend stimmen alle 430 Manifest-Dateien mit den ausgelieferten Dateien überein. Zusätzlich bestanden 26 HTTP-Prüfungen für Seiten, Ressourcen, Shop-Routen und die bestehende Webhook-Ausnahme. Das neue Portrait ist ohne Testzugang geschützt und mit Testzugang erreichbar; die veröffentlichte Inhaltsantwort enthält seine neue Adresse.

Datenerhaltung: 286 echte Benutzerkonten, 285 Mitgliedschaften, 35 redaktionelle Optionen und keine echten Bestellungen. Nur Peters ausdrücklich freigegebene Vorstandszuweisung sowie der gezielte Portraitwechsel mit Historie/Revision wurden verändert. Alle anderen Rollen, Zuständigkeiten, Datenschutzwerte und Inhalte sowie sämtliche Mitgliedschaftsdatensätze, Konfiguration und `.htaccess` sind unverändert. Die bestehenden Rollendefinitionen bleiben identisch; die neue Rolle wurde ergänzt und die Rollenversion auf `20261024-1` gesetzt. Keine Testmails wurden tatsächlich versandt, keine Fairgate-Kontakte geschrieben und keine Zahlungen ausgelöst.

Private Sicherung und Nachweise: `.private/roles-triungsters-2026-10-24/`. Serverseitiges Rückkehrpaket: `/private/strc-peter-release-20261024110100`, lokal zusätzlich `server-rollback.tar.gz`. Programmdateien nur bei passender installierter Prüfsumme zurücksetzen. `migration-before.json` und `migration-after.json` sichern Rollenstand und Peters gezielte Zuweisung; vor einer Rückkehr die aktuelle Rollenrevision mit dem installierten Stand vergleichen. `portrait-result.json` enthält den vollständigen vorherigen und neuen Organisationsstand sowie die neue Medien-ID. Eine Inhaltsrückkehr ist nur bei unverändertem installierten Optionshash zulässig; spätere Änderungen müssen einzeln zusammengeführt werden. Das neue Medium erst entfernen, wenn keine Inhalte mehr darauf verweisen; bestehende Uploads niemals überschreiben. Der historische Snapshot bleibt unverändert.

## PR #32–#37, Fairgate-Daten und Make am 26. Oktober 2026

Die sechs angeforderten Pull Requests #32–#37 wurden gemeinsam in [PR #44](https://github.com/Dinten-dev/swiss-tr-club-website-v3/pull/44) geprüft und als `f345bfe` integriert. [PR #45](https://github.com/Dinten-dev/swiss-tr-club-website-v3/pull/45), Merge `08ee3e6`, begrenzt die anschliessend ausdrücklich freigegebene Co-Pilot-Schreibausnahme unabhängig von weiteren Konfigurationen auf Vorname, Nachname, E-Mail und Mobilnummer. Andere Fairgate-Profilfelder und Kontakterstellung bleiben schreibgeschützt. Ein fehlender Newsletter-Wert schliesst keine offene Abo-Änderungsanfrage ab.

Übernommen sind WooCommerce-Telefonpflicht auch nach JavaScript-Lokalisierung, Fahrzeugnormalisierung und additiver Import, Kassen-Teilnehmerlisten, mobile Darstellung, Paar-Antragsbearbeitung sowie bestätigte Feldpfade für Mitgliedsnummern, Hauptregionen, Geburtstage, Co-Pilot und Printmagazin. PR #34 wurde entsprechend der früheren ausdrücklichen Entscheidung angepasst: Bestehende Verzeichnis-Abmeldungen bleiben wirksam; keine Person wurde gegen ihre gespeicherte Abwahl wieder eingeblendet. Bestehende Paarpartner werden nicht ersetzt; die gegenseitige Verknüpfung ist gemeinsam gesichert. Automatische Abgleiche erzeugen keine ungeprüften neuen Konten.

Der tatsächliche API-Abruf lieferte 524 Kontakte. Zuerst wurde eine rein lesende Vorschau erstellt, geprüft und vor Übernahme frisch bestätigt: 284 Aktualisierungen, zwei neue eindeutig identifizierte Mitgliedskonten und 238 ausgelassene Kontakte. Auslassungen: 227 ohne Mitgliedschaftsbezeichnung, acht ohne gültige persönliche E-Mail, drei Firmenkontakte. Keine doppelte offizielle Mitgliedsnummer in der geprüften Vorschau. Ein bestehender verknüpfter Datensatz ohne aktuelle Mitgliedschaftsbezeichnung wurde unverändert gelassen und benötigt eine fachliche Prüfung; keine automatische Löschung oder Sperrung aus einem fehlenden Feld.

Nach Übernahme bestehen 288 Benutzerkonten und 287 Mitgliedschaften. 278 Hauptregionen, 237 Geburtstage und 214 offizielle Mitgliedsnummern sind verfügbar. Bei den übrigen Nummern bleiben Platzhalter als ausstehend markiert. Der allgemeine Anredestil «Formal/Informal» wurde nicht als persönliche Anrede «Herr/Frau» umgedeutet. Das eNewsletter-Feld ist bei allen 524 Kontakten leer; es wurden daraus keine neuen Abo-Werte erfunden.

Die erste Fahrzeugvorschau zeigte 304 Ergänzungen, drei bereits passende Fahrzeuge, zwölf «kein TR»-Vermerke und 27 Prüfungsfälle. Nach den zwei geprüften Kontoergänzungen wurde die Fahrzeugvorschau erneut geprüft: Ein Fahrzeug des neu erkannten Paarmitglieds kam hinzu. Insgesamt wurden 305 Fahrzeuge ergänzt. Wiederholte Vorschau zeigt null weitere Neuanlagen. Bestehende Fahrzeuge und Fotos wurden nicht überschrieben oder entfernt. Die 27 unklaren Angaben verbleiben zur manuellen Prüfung; unbekannte Baujahre bleiben mit Originalangabe als Notiz erhalten.

Validierung: 79 PHP-Tests / 352 Assertions, 34 neue WordPress-/WooCommerce-Integrationstests und 99 bestehende Regressionen bestanden. 112 PHP-Dateien syntaktisch geprüft; Frontend-Lint, TypeScript und Build erfolgreich. Kassenliste und Teilnehmerdialog bei 390 und 768 Pixeln, DE/FR sowie fehlender horizontaler Seitenüberlauf geprüft. Im tatsächlichen PHP-Webserver bestanden zehn zusätzliche Kassenprüfungen einschliesslich JavaScript-Locale für Standard und CH. Weitere 26 HTTP-Prüfungen bestätigten Seiten, Ressourcen, Shop-Routen und die bestehende Fairgate-Webhook-Ausnahme. Alle 287 aktiven Mitgliedschaften besitzen serverseitig Mitgliederzugang.

Datenerhalt wurde gegenüber dem vollständigen Ausgangsstand nachgewiesen: Alle bisherigen Benutzer-/Passwortdatensätze, Rollenzuweisungen, Zuständigkeiten, Datenschutzpräferenzen, redaktionellen Inhalte, bisherigen privaten Formulare/Fahrzeuge und deren Metadaten blieben erhalten. Nur die geprüften Mitgliedsfelder, zwei neue Mitgliedskonten und 305 zusätzliche Fahrzeuge wurden geändert. Eine bestehende Shopbestellung bleibt vorhanden; keine Testbestellung oder Zahlung wurde ausgelöst. Während der echten Übernahme wurden weder Mails noch externe API-Schreibanfragen ausgelöst.

Die im neu bereitgestellten WhatsApp-Chat enthaltene Make-Adresse vom 9. Oktober wurde privat hinterlegt. Die Vorlagen `tr_forum_de` / `tr_forum_fr` werden korrekt erkannt. Nach gesonderter ausdrücklicher Freigabe wurde der Versand ausschliesslich für aktive Mitglieder mit dokumentierter WhatsApp-Einwilligung aktiviert. Keine Testnachricht wurde durch den Agenten gesendet. Peter kann den vorhandenen Knopf unter Forum → Fachexperten & WhatsApp → «Testnachricht an mich senden» verwenden. Zustellung durch Make/Meta ist erst nach diesem echten Test bestätigt; die Konfigurationsprüfung allein bestätigt keine WhatsApp-Zustellung.

Private Sicherung, Originalantworten, Vorschauen, Importquittungen und Nachweise: `.private/peter-2026-10-26/`. Vollständiger Programm-Ausgangsstand: 434 veröffentlichte Dateien nach der Integration. Rückkehrpakete: `/private/strc-peter-release-20261026185534` (23 Programmdateien) und `/private/strc-peter-release-20261026191013` (drei zusätzliche geprüfte PHP-Dateien). Ursprüngliche und installierte Konfigurationshashes samt serverseitigen Sicherungspfaden sind in den privaten Quittungen dokumentiert. Bei Rückkehr zuerst die aktuelle installierte Prüfsumme beziehungsweise den Datensatzstand abgleichen; spätere Änderungen einzeln erhalten. Keine pauschale Datenbankrückkehr, keine bisherigen Uploads löschen und keine späteren Mitgliedsänderungen zurücksetzen. Die geheime Make-Adresse und Zugangsdaten sind nicht Teil von Git oder diesem Bericht.

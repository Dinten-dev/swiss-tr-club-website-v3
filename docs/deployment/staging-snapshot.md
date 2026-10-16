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

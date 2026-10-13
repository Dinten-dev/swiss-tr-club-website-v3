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

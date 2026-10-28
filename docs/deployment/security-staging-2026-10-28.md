# Sicherheitskorrekturen und Staging-Abnahme vom 28.10.2026

Die drei gemeldeten Sicherheitsfehler sind behoben und auf
https://staging.swisstrclub.ch veröffentlicht. Die Veröffentlichung wurde
ausdrücklich freigegeben. Produktion wurde nicht verändert.

## Änderungen

| Bereich | Verhalten nach der Korrektur |
|---|---|
| Zahlungen | Nur die Kasse darf Zahlungsstände ändern. Zugewiesene Organisatoren behalten Teilnehmerlisten und Wartelistenbestätigung. Nonce, Revision und Audit bleiben verbindlich. |
| Dokumente | Vorstandsleserechte erlauben keine fremden Änderungen oder Freigaben. Zugriffsklassen dürfen nur durch die Bibliotheksmoderation geändert werden; die Dokumentart bestimmt die Mindestklasse. Eigene Änderungen werden erneut eingereicht. |
| Dokumentenarchiv | Berechtigte Vorstandsleser sehen fremde eingeschränkte Dokumente auch in der Archivübersicht, ohne Moderationsaktionen. Ein veralteter Suchindex kann keine fremden gewöhnlichen Entwürfe sichtbar machen. |
| Newsletter | Öffentliche Neuanfragen überschreiben weder bestätigte Einwilligungen noch vorgemerkte Abmeldungen. Erst ein gültiger aktueller Bestätigungslink übernimmt neue Angaben. Widerruf verwirft offene Bestätigungsanfragen. |
| Synchronisierung | Eine vorgemerkte externe Entfernung erfolgt vor einer erneuten Aufnahme. Netzwerkwarten blockiert keine Einwilligungslinks; veraltete Rückmeldungen überschreiben keinen Widerruf. |

Vorhandene Farben, Fotogrenzen und übrige Baur-/Peter-Funktionen bleiben erhalten.
Bestehende Originaldateien wurden nicht verändert.

## Sicherung und Veröffentlichung

Vor dem ersten Austausch wurden das vollständige Staging-Webverzeichnis samt
Konfiguration und Uploads sowie die Datenbank gesichert. Die Sicherung bleibt
zugriffsbeschränkt auf demselben Server, ausserhalb des öffentlichen
Webverzeichnisses. Zusätzliche externe Originalverzeichnisse sind nicht Teil
dieser Sicherung und wurden nicht verändert.

Sicherungsverzeichnis: `/private/strc-staging-backups/20261028T174627Z-security`.

| Datei | Bytes | SHA-256 |
|---|---:|---|
| `database.sql` | 4’315’454 | `3ff63d5cf5abe3a9044d51952c53e545e4c29a5eb328f27c4beeee200ebe83b8` |
| `files.tar.gz` | 387’744’089 | `855c6a47e1d578a93f7e4cad276df8e9494d8a7a6ba0d19351dbb637cb26f8ed` |

Gzip-Lesbarkeit und Prüfsummen wurden bestätigt. Sieben unterschiedliche
Programmdateien wurden ersetzt. Die in der Abnahme gefundene Archiv-Leselücke
erforderte einen weiteren Austausch derselben PHP-Datei, insgesamt acht
Dateiaustausche. Alle 460 endgültigen Programmdateien stimmen mit
[`release.manifest.json`](../../deployment/staging/release.manifest.json) überein.

## Datenbank und Rollen

Die reale WordPress-Migration setzt die Schema-Version auf `20261028-1` und
ergänzt `pending_request` als nullable `LONGTEXT`. Vorhandene Indexdefinitionen
blieben erhalten. Die Newslettertabelle war vor der Migration leer.

Zusätzlich wurde das tatsächliche `dbDelta` mit drei synthetischen Altzuständen
in einer eigenen Tabelle geprüft: ausstehend, bestätigt und abgemeldet.
Alle bisherigen Werte und Token blieben erhalten; die neue Spalte blieb `NULL`.
Die Testtabelle wurde anschliessend entfernt.

Rollen wurden über die tatsächliche Zuweisungsschnittstelle gespeichert und
erneut geladen. Geprüft wurden Mitglied, zugewiesene Organisation, Kasse,
Vorstand sowie Bibliotheksmoderation mit und ohne Vorstandsleserecht.
Das bestehende Administrationskonto behält seine Rollen, Funktionszuordnungen
und sein Passwort unverändert.

## Prüfungen

| Prüfung | Ergebnis |
|---|---|
| Native PHP-Pakettests, PHP 8.3.36 | 93 Tests, 403 Assertions bestanden |
| Isolierte Sicherheitsregressionen | 65 Prüfungen bestanden |
| Bestehende Baur-/Kombinationsregressionen | 58 Prüfungen bestanden |
| Echte WordPress-/MariaDB-Rollen- und Funktionstests | 77 Prüfungen bestanden |
| Migration mit synthetischen Altzuständen | 10 Prüfungen bestanden |
| Abschliessende HTTPS-Stichproben | Sieben bestanden |
| Syntax, Lint, Typprüfung und Builds | Bestanden |
| Vollständiger Programmvergleich | 460 Dateien, keine Abweichung |

Die Rollen- und Funktionstests umfassen insbesondere alle sechs unzulässigen
Zahlungsänderungen durch Organisatoren, berechtigte Kassenaktionen,
Dokumentenfreigaben und Archivaktionen, Klassensenkungen, falsche und veraltete
Bestätigungslinks sowie Widerruf während einer laufenden Synchronisierung.
Vier Testmails und drei externe HTTP-Aufrufe wurden abgefangen.
Es wurden keine echten Nachrichten versandt oder Newsletterkontakte verändert.

Die Tests liefen in einer zurückgerollten Datenbanktransaktion. Ein frischer
WordPress-Aufruf bestätigt: keine Testkonten, Testbeiträge oder Testabonnenten.
Es wurden keine öffentlichen Prüfskripte angelegt.

Automatische Regressionen:
[`security-boundaries.php`](../../scripts/tests/security-boundaries.php),
zusätzlich im Quality-Workflow ausgeführt.
Der reale Staging-Test liegt in
[`security-staging.php`](../../scripts/tests/security-staging.php).
Er darf nur innerhalb des Staging-WordPress per WP-CLI ausgeführt werden.
Für eine zuverlässige HTTP-Statusmessung müssen PHP-Startmeldungen bereits
beim Prozessstart auf stderr gehen, beispielsweise mit
`php -d display_errors=stderr /usr/bin/wp --skip-themes eval-file --use-include <Testdatei>`.
Das verändert keine Website-Konfiguration.

## Rückfall und Grenzen

Die ausgetauschten Dateien liegen unter `rollback`, die zusätzliche
Archivkorrektur unter `archive-read-fix/rollback` im Sicherungsverzeichnis.
Ein gezielter Dateirückfall erfolgt in umgekehrter Reihenfolge und nur nach
Prüfsummenvergleich. Die additive Datenbankspalte kann bestehen bleiben.
Keine pauschale Datenbankrücksetzung: parallele Anmeldungen und Inhalte erhalten.
Ein vollständiger Rückfall auf den vorherigen Programmstand würde die
bekannten Sicherheitsfehler reaktivieren.

Die Abnahme betrifft die drei gemeldeten Fehler und ihre Kompatibilität.
Sie ersetzt keinen vollständigen Sicherheits- oder Hosting-Audit.
Die abgefangenen Mail-/HTTP-Aufrufe beweisen das Anwendungsverhalten,
keine neue reale Zustellung oder Änderung beim Newsletteranbieter.

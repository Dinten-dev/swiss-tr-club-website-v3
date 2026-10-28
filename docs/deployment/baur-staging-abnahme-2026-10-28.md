# Baur-Feedback: Staging-Veröffentlichung und Abnahme

| Punkt | Ergebnis |
|---|---|
| Ziel | https://staging.swisstrclub.ch |
| Freigabe | Vom Benutzer ausdrücklich für Staging erteilt |
| Veröffentlichung | 28. Oktober 2026; zunächst elf Programmdateien, danach gezielte Direktlink-Korrektur in einer bereits veröffentlichten Datei |
| Abschlusskontrolle | Alle 455 Programmdateien stimmen mit dem lokalen Release-Manifest überein |
| Produktion | Nicht verändert; keine Produktionsfreigabe erteilt |
| Browser | Safari und Chromium; Firefox nicht verwendet |

## Sicherung und Rückfall

Vor der ersten Veröffentlichung wurde der vollständige Staging-Stand gesichert. Geschütztes Serververzeichnis: `/private/strc-staging-backups/20261028T070914Z-baur`.

| Sicherung | Umfang | Prüfung |
|---|---|---|
| `files.tar.gz` | 2’241’620’828 Bytes; gesamtes Webverzeichnis einschliesslich Konfiguration und Uploads sowie beide privaten Dokumentverzeichnisse | Archivprüfung und SHA-256 bestanden |
| `database.sql` | 4’566’966 Bytes; vollständiger Datenbankexport | SHA-256 geprüft; zusätzliche lokale Kopie mit identischem Hash |
| `private-config.tar.gz` | Vier ausserhalb des Webverzeichnisses eingebundene Konfigurationsdateien | Archivprüfung und SHA-256 bestanden |

Dateien und Verzeichnisse der Sicherung sind zugriffsbeschränkt. Zugangsdaten und Datenbankinhalte bleiben ausserhalb der öffentlichen Dokumentation.

Zusätzliche Sicherungen der ausgetauschten Programmdateien:

- Erste Veröffentlichung: `/private/strc-peter-release-20261028071530`
- Direktlink-Korrektur: `/private/strc-peter-release-20261028090238`

Beide enthalten die vorherigen Dateien und ein `rollback.json`. Ein Rückfall muss die installierten Prüfsummen und zwischenzeitliche Änderungen prüfen. Die erste Korrektur kann unabhängig zurückgenommen werden; für den vollständigen ursprünglichen Programmstand sind beide Veröffentlichungen in umgekehrter Reihenfolge zu berücksichtigen. Keine pauschale Datenbankwiederherstellung über inzwischen bearbeitete Inhalte. Ein vollständiger Wiederherstellungslauf in eine separate Serverumgebung wurde nicht durchgeführt.

## Prüfungen auf dem tatsächlichen Zielsystem

| Bereich | Nachweis |
|---|---|
| Serverintegration | 64 Funktionsprüfungen und 57 Prüfungen der transaktionsfähigen Tabellen bestanden; PHP 8.3.36 / MariaDB 10.11.19 |
| Inserate | Speicherung, Statusfreigaben, öffentliche Leserechte, Eigentümer-/Moderationsrechte, ungefilterte Teileliste, Suchfilter und offene Prüfliste |
| Wiederholungen | Erneute Erstellungs- und Kontaktanfragen erzeugen keine doppelten Inserate beziehungsweise Nachrichten |
| Dokumente | Archivieren und Wiederherstellen von veröffentlichten Dokumenten, offenen Einreichungen und Entwürfen; unbekannter Altstatus bleibt „In Prüfung“; berechtigte Archivansicht und geschützte Vorstandsunterlagen |
| Eventanmeldungen | 16 Kombinationen aus Mitglied/Gast und Begleitung bei vier Veranstaltungsarten; korrekte Gebühren; Altanmeldungen; Identitätsprüfung; inaktive und doppelt angemeldete Mitglieder |
| Mitgliedersuche | Nur Namen und Mitgliedsnummern; inaktive Mitglieder ausgeschlossen; öffentliche Zugriffe auf beide geschützten Suchschnittstellen verweigert |
| Passwort-Reset | Gültige und ungültige Tokens serverseitig; auf Staging in Safari und Chromium zunächst leer und verdeckt, Speichern bei leerem Feld deaktiviert |
| Echte Datenbanksperren | Gleichzeitiger Aufruf erhält nach drei Sekunden eine Sperrmeldung; nach Freigabe und nach einer Ausnahme ist erneuter Zugriff möglich |
| Gleichzeitige Inseraterstellung | Zwei konkurrierende Anfragen mit derselben Anfrage-ID liefern dieselbe Inserat-ID; genau eine abgefangene Bestätigung; anschliessende Entfernung des Testinserats nachgewiesen |
| Öffentliche HTTP-Aufrufe | Acht Prüfungen bestanden: Startseite, ausgelieferte JS-/CSS-Prüfsummen, ungefilterte Teileliste, einzelner Direktaufruf, unbekanntes Inserat und zwei geschützte Suchen |
| Safari-Dateiauswahl | Titel eingegeben, nativen Dateidialog geöffnet und „Abbrechen“ gewählt: Uploaddialog und Titel bleiben erhalten |
| Mitgliederoberfläche | Mitgliedsnummer, Profilzugang und Mitgliedermenü auf Desktop sowie 390 × 844 Pixel geprüft |
| Clubheft | Aus Blätteransicht Seite 2–3 zur passenden PDF-Seite 2 gewechselt; Zoom 100 → 125 Prozent; ein Schliessen führt direkt zur Übersicht |
| Eventnavigation | Vom Dashboard geöffneter Anlass bietet die direkte Rückkehr zum Mitgliederbereich; keine echte Anmeldung abgesendet |
| Browserkonsole | In den geprüften Abläufen keine Fehler oder Warnungen festgestellt |

Die umfangreichen Funktionsprüfungen liefen mit synthetischen Datensätzen innerhalb einer Datenbanktransaktion und wurden zurückgerollt. Externe Integrationsaufrufe waren dabei abgefangen. Kurzzeitig gespeicherte Testkonten und Inserate für die Browser-/Parallelprüfungen wurden separat mit exakter Identitätsprüfung entfernt. Auch sechs zugehörige Testhinweise in Moderations-Dashboards wurden gezielt entfernt; die vorherigen Benachrichtigungsdaten stimmen anschliessend wieder mit den Ausgangsprüfsummen überein. Temporäre HTTP-Testskripte sind entfernt.

## Ergänzte Direktlink-Korrektur

Die zusätzliche Prüfung zeigte einen Sonderfall: Wechselte nur die Inserat-ID innerhalb `#marktplatz/meine/…`, blieb die bisherige Marktplatzansicht erhalten. Die ursprüngliche Korrektur des fehlenden Backend-Aufrufs allein deckte diesen Wechsel nicht ab.

`frontend/app/page.tsx` berücksichtigt jetzt die vollständige Marktplatzadresse beim Aufbau der Detailansicht. Der ergänzte Quelldiff umfasst zwei eingefügte Zeilen und eine geänderte Zeile. Lint, Typprüfung und WordPress-Build bestanden. Auf dem Server änderte sich ausschliesslich `app.js`; der unmittelbar vorherige Programmstand wurde erneut geprüft und die bisherige Datei gesichert.

Nach Veröffentlichung wurde der zuvor fehlerhafte Wechsel direkt von einer fremden Inserat-ID zu einem eigenen ungeprüften Testinserat wiederholt. Die passende Detailansicht erschien ohne Neuladen oder „Erneut versuchen“. Das Testinserat und das zweite temporäre Konto wurden anschliessend entfernt.

Der genaue Zusatzdiff liegt unter `docs/reviews/baur-feedback-2026-10-27/staging-route-correction.patch`. Das ursprüngliche freigegebene Prüfpaket bleibt als historische Grundlage erhalten.

## Mailzustellung

Drei echte Nachrichten wurden über den Webserver ausschliesslich an die freigegebene Testadresse versendet und in Apple Mail gefunden:

1. Bestätigung der Inseraterstellung mit Veröffentlichungsstatus.
2. Kontaktanfrage an den Anbieter.
3. Eingangsbestätigung an die anfragende Person.

Alle drei liegen im Spamordner. Die geprüften empfangenen Kopfzeilen melden SPF, DKIM und DMARC jeweils als bestanden. Erfolgreicher Versand und Empfang sind damit belegt; eine zuverlässige Zustellung im Posteingang ist noch nicht belegt. Absenderdarstellung und Zustellbarkeit bleiben ein Punkt vor der Produktionsfreigabe. Es wurden keine Mailregeln oder DNS-Einstellungen geändert.

Die Konsolenumgebung des Hosters kann die native Mailfunktion nicht verwenden. Deshalb wurde der Versand über die tatsächliche Webserver-Umgebung geprüft. Versandfehler und Warnungen wurden zusätzlich gezielt getestet; die Inseratspeicherung blieb dabei erhalten.

## Daten und redaktionelle Inhalte

Unmittelbar nach der ersten Veröffentlichung stimmten alle 19’097 erfassten nicht flüchtigen Datenbankzeilen mit dem Zustand vor Veröffentlichung überein. Die Korrektur verändert ausschliesslich Programmdateien.

Die abschliessende Prüfung findet keine Testkonten, Testinserate oder temporären Web-Testskripte mehr. Originalzeilen wurden nicht gelöscht. Originale Mitgliedschaften und Benachrichtigungsdaten stimmen wieder mit dem Ausgangszustand überein.

Während der Abnahme wurden vier bereits vorhandene Dokumente in anderen Sitzungen archiviert. Diese Änderungen sowie deren Archivmetadaten wurden erhalten. Auch normale WooCommerce-Hintergrundaufgaben und anonyme Sitzungen wurden nicht zurückgesetzt. Deshalb ist der gesamte Datenbestand nach der mehrstündigen Abnahme bewusst nicht bytegleich zur Anfangssicherung.

Die Agenda-Inhaltsmigration wurde auf dem aktuellen Serverinhalt als Vorschau ausgeführt: keine betroffenen Textfelder. Es war keine redaktionelle Änderung erforderlich.

## Verbleibende Grenzen und Beobachtungen

- Ein tatsächlich gespeichertes Passwort aus Schlüsselbund oder Passwortmanager wurde nicht ausgewählt oder gespeichert. Anfangszustand auf Staging ist geprüft; spätes Autofill bleibt durch die bestehenden simulierten Regressionen abgedeckt.
- Die drei Testmails wurden im Spamordner zugestellt. Posteingangszustellung bleibt offen.
- Bei neu angelegten ungeprüften Testinseraten fiel ausserhalb der 33 dokumentierten Rückmeldungen eine Datumsanzeige „1.1.1970“ auf. Dieser zusätzliche Fall wurde nicht als Teil der Direktlink-Korrektur geändert und sollte separat untersucht werden.
- Die früheren lokalen Foto-/Fehlerstapel- und vollständigen Safari-Validierungsprüfungen bleiben gültig; diese wurden nicht nochmals als grosse Uploadstapel auf Staging wiederholt.

## Nachweise

Die ursprüngliche Zuordnung aller 33 Rückmeldungen und die lokalen Tests stehen in `docs/deployment/baur-feedback-2026-10-27.md`. Detaillierte Serverprotokolle und Sicherungsbelege liegen geschützt unter `.private/baur-staging-2026-10-28/`.

Bildnachweise liegen in `docs/reviews/baur-feedback-2026-10-27/`:

- `staging-mobile-dashboard.png`
- `staging-safari-reset.png`
- `staging-chromium-reset.png`
- `staging-safari-upload-cancel.png`
- `staging-magazine-zoom.png`
- `staging-directlink.png`
- `staging-final-ersatzteile.png`

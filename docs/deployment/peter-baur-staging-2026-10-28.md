# Peter/Baur: Staging-Veröffentlichung vom 28.10.2026

Ziel: ausschliesslich https://staging.swisstrclub.ch. Vollständige Sicherung vor Veröffentlichung; Staging und die zusätzlichen Benutzerrechte wurden ausdrücklich freigegeben. Produktion wurde nicht verändert. Kein Firefox verwendet.

## Umfang und Herkunft

Die [besprochene Gegenüberstellung](peter-baur-integration-2026-10-28.md) ordnet jede ausgewählte Ergänzung Peters PRs 60–64 bzw. dem freigegebenen Baur-Paket zu. Die kumulativen PRs werden durch einen gemeinsamen Integrations-PR ersetzt. Automatische Fotofreigabe, Löschung ohne Aufbewahrungsausnahme, endgültiges Dokumentlöschen, Umklassifizierung alter Vorstandsdokumente und wechselnder Einstiegstext wurden bewusst nicht übernommen.

Peters ausdrücklich benötigte 16 MB für das Magazin-Depot sind jetzt berücksichtigt:

- JPG, PNG und WebP bis einschliesslich **16’777’216 Bytes** und höchstens 40 Megapixel bleiben bytegleich erhalten, auch oberhalb von 4’000 Pixeln Kantenlänge.
- Eingaben bis 50 MB bleiben möglich. Oberhalb der unveränderten Uploadgrenze bzw. der bestehenden 40-Megapixel-Servergrenze erfolgt die Optimierung: höchstens 4’000 Pixel Kantenlänge, JPEG-Qualität zunächst 90 Prozent, Ergebnis höchstens 16 MB.
- Keine Mindestdateigrösse; sequenzielle Verarbeitung, Einzelfehler und Wiederholung bleiben erhalten. Optimierte Dateien sind ausdrücklich gekennzeichnet.
- Freigabe und Aufbewahrung bleiben bestehen. Die UI nennt korrekt die bereits bestehenden **vier Monate mit Aufbewahrungsausnahme**. Es wurde keine Aufbewahrungsdauer geändert.

## Sicherung und Rückfall

Vorheriger Programmstand: 455 Dateien, vollständig ohne Abweichungen vom zuletzt veröffentlichten Manifest.

Sicherung: `/private/strc-staging-backups/20261028T154336Z-peter-baur-16mb`.

| Datei | Bytes | SHA-256 |
|---|---:|---|
| database.sql | 4’304’442 | `f7edc78396fb3e3cb8fc7562a3d1798cc583bacb3e376d118b7f76dbf6c38c2b` |
| files.tar.gz | 2’254’813’852 | `1ac915510a832ba64e385fa57f0f2ebe734ce502df7e320d24a373ae3ad395ed` |

Die Dateisicherung umfasst Website, private Foto-/Inseratedateien und vorhandene externe Konfiguration. Gzip-Lesbarkeit und beide Prüfsummen wurden bestätigt. Datenbankexport mit konsistenter Transaktion. Zugangsdaten und persönliche Nachweise bleiben ausschliesslich geschützt unter `.private/` bzw. ausserhalb des öffentlichen Serververzeichnisses.

Erster Austausch: 13 Dateien. Anschliessende Textkorrektur: drei Build-Dateien, davon zwei neue Teile. Insgesamt **15 unterschiedliche Serverpfade**, keine Löschungen. Austausch über temporäre Dateien und Umbenennen; ältere veröffentlichte Build-Teile bleiben für bereits offene Browser verfügbar. Alle **460 endgültigen Programmdateien** stimmen mit `deployment/staging/release.manifest.json` überein.

Gezielter Rückfall in umgekehrter Reihenfolge:

1. Textkorrektur: Sicherung unter `retention-copy/rollback` innerhalb des Sicherungsverzeichnisses; nur die drei im zugehörigen Installationsbeleg genannten Pfade zurücksetzen bzw. neu hinzugefügte Teile entfernen.
2. Integration: Sicherung unter `rollback`; nur die 13 im ursprünglichen Installationsbeleg genannten Pfade zurücksetzen bzw. hinzugefügte Teile entfernen.
3. Dateiprüfsummen kontrollieren und Browser neu laden. Bestehende redaktionelle Änderungen und Anmeldungen erhalten; keine pauschale Datenbank-Rücksetzung.

Die rein abgeleiteten Porträtindizes können bei einem Programm-Rückfall bestehen bleiben; der alte Code ignoriert sie.

## Benutzerrechte

Das ausdrücklich genannte bestehende Konto erhielt zusätzlich Mitglied und Superadmin. Weil die bestehenden Rollen Vorstand, Mitgliederverwaltung und Finanzen separat schützen, wurden diese drei Fachrollen ebenfalls ergänzt. Der bisherige technische Administrator bleibt erhalten. Globale Rollendefinitionen wurden nicht erweitert; andere Konten erhalten keine zusätzlichen Rechte.

Die Rollen wurden konsistent mit den Funktionszuordnungen und einem Auditnachweis gespeichert. Ein frischer WordPress-Aufruf bestätigt nach erneutem Laden: Mitgliederzugriff, Vorstandsdokumente, Mitgliederverwaltung, Finanzen, Community, Events und Rollenvergabe sowie sämtliche sechs Redaktionsbereiche. Passwort und bestehende aktive Mitgliedschaft blieben bei der Zuweisung unverändert. Vorherige Rollen und Zuordnungen liegen im geschützten Kontobeleg der Sicherung.

## Prüfungen des veröffentlichten Pakets

| Prüfung | Ergebnis |
|---|---|
| Frontend-Lint, Typprüfung, regulärer Frontend-Build | Bestanden |
| WordPress-Build, Struktur, vollständiges Manifest | Bestanden; 460 Dateien |
| Upload-/Reset-Regressionen | 10 Node-Tests bestanden; in GitHub Quality ergänzt |
| Native Server-PHP-Tests | PHP 8.3.36: 93 Tests, 403 Assertions bestanden |
| Baur-/Kombinationsregressionen | 58 Prüfungen unter nativem Server-PHP bestanden |
| Echtes Staging-WordPress/MariaDB | 138 Prüfungen bestanden, synthetische Datensätze vollständig zurückgerollt |
| Foto-Original, Erstellen | Exakt 16 MB akzeptiert und unverändert gespeichert; Prüfstatus bleibt offen |
| Foto-Original, Anhängen | Exakt 16 MB akzeptiert und unverändert gespeichert; Prüfstatus bleibt offen |
| Grössengrenze | 16 MB plus ein Byte serverseitig abgelehnt |
| Kleines/beschädigtes Bild | Gültiges 74-Byte-Bild akzeptiert; unvollständiges 62-Byte-Bild abgelehnt |
| Tatsächliche PHP-FPM-Grenzen | Upload und POST jeweils 256 MB; GD/Imagick vorhanden, keine Konfigurationsänderung erforderlich |
| HTTPS-Stichproben | Acht Prüfungen: Startseite, exakte JS/CSS-Prüfsummen, Ersatzteile ohne Filter, sofortiger Inserate-Direktaufruf, unbekanntes Inserat und geschützte Mitgliedersuchen |
| Echte MariaDB-Sperren | Konflikt erkannt; nach Abschluss und nach Ausnahme wieder frei |
| Konkurrierende Inseraterstellung | Zwei gleichzeitige Anfragen: ein Inserat und eine abgefangene Bestätigung; exakt dieses Testinserat anschliessend entfernt |
| Rollen nach erneutem Laden | Alle gewünschten Bereiche zugänglich; fachliche Zugriffstrennung für andere Benutzer erhalten |
| Testbereinigung | Keine synthetischen Konten/Beiträge oder öffentlichen Prüfskripte verblieben |
| Vorhandene Originale und Konfiguration | 1’181 Dateien, 2’243’595’399 Bytes exakt gegen die Sicherung verglichen; keine Abweichung |

Die 138 Integrationsprüfungen umfassen u. a. Sichtbarkeit als Gast/Mitglied/Eigentümer/Moderator, Dokumentstatus beim Archivieren und Wiederherstellen, acht geschützte Vorstandsrubriken, Foto-Prüfstatus und Aufbewahrungsflag, aktuelle Mitteilungen, Bildausschnitt, Mitglied-/Gastkombinationen aller vier Eventtypen, Gebühren, Dubletten, Altanmeldungen sowie Versandfehler und Wiederholungen.

Der zeilenweise Datenvergleich wurde zusätzlich feldweise gegen den ursprünglichen SQL-Export geprüft. An bestehenden Mitgliedschaften änderten sich ausschliesslich 286 Synchronisationszeitstempel; Mitgliedsnummern, Status, Verknüpfungen und fachliche Daten blieben gleich. Hinzu kamen die freigegebenen Rollen des eigenen Kontos und vier abgeleitete Indexwerte für zwei bestehende Porträts. Parallel entstand eine reguläre Anmeldung mit Rechnungsmetadaten; bei einem anderen Konto änderten sich Passwort und begleitende Kontometadaten. Diese parallel entstandenen Vorgänge sowie Fairgate-/Webhook-Status, Sequenzzähler und WooCommerce-Sitzungen wurden erhalten und nicht zurückgesetzt. Alle übrigen ursprünglichen Inhalts-, Kommentar-, Bestell- und Metadatenzeilen blieben unverändert. Personenbezogene Vergleichsbelege bleiben geschützt.

## Mail- und Browsergrenze

Genau drei gekennzeichnete echte Testmails wurden ausschliesslich an die freigegebene Adresse transportiert. WordPress meldet drei Transporterfolge und keinen Mailfehler; Wiederholungen erzeugten keine zusätzlichen Mails. Andere Testbenachrichtigungen wurden abgefangen.

**Noch offen:** Empfang dieser drei neuen Mails in Apple Mail und erneute native Safari-Sichtprüfung des endgültigen Staging-Pakets. Der Mac war gesperrt; die Bitte zum Entsperren ist gestellt. Frühere lokale Safari-/Chromium-Nachweise stehen im Integrationsbericht, ersetzen aber diese letzten Live-Prüfungen nicht. Ein Transporterfolg belegt keinen Posteingangsempfang.

## GitHub und getrennte Änderungen

Quellen, erzeugte Website-Dateien, Tests und dieses Protokoll gehören zum gemeinsamen Integrationsstand. Die Herkunft und bewussten Abweichungen gegenüber PRs 60–64 bleiben nachvollziehbar; diese PRs sollen nach erfolgreicher Integration mit Ersatzverweis geschlossen werden. Die Quality-Prüfungen führen nun auch die zehn Upload-/Reset-Tests aus. GitHub-Veröffentlichung und Prüfergebnisse werden im zugehörigen Integrations-PR geführt.

Die bereits vorhandene fremde Änderung in `docs/deployment/peter-pr56-pr58-2026-10-27.md` bleibt lokal erhalten und wird nicht in diesen Commit aufgenommen.

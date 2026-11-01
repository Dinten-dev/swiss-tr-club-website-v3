# Shopmerkmale und Verfügbarkeit: Integration von PR #77

Stand: 01.11.2026. Ausgangspunkt: `main` bei `55bb97be0bfaa837d97d0c2d266ce48d742f240f`.
Quelle: [PR #77](https://github.com/Dinten-dev/swiss-tr-club-website-v3/pull/77), geprüft bei `c31cd357ed6aa9cc1749a1ce7b6077a8a4fe07c7`. Arbeitszweig: `integration/shop-attributes-pr77`.

## Peters Änderungen

- Ein Artikel mit bis zu drei frei benannten Merkmalen, jeweils höchstens 20 Werten und insgesamt höchstens 100 Kombinationen. Ein gemeinsamer Preis und Einstandspreis gelten für alle Kombinationen.
- Lagerführung pro Kombination oder Herstellung auf Bestellung. Bei fehlendem Bestand: nicht verfügbar, nachbestellbar oder nur anfragbar. Nicht angebotene Kombinationen bleiben privat erhalten.
- Bilder pro Merkmalswert, zusätzliches Produktbild und Galerie; optionale französische Namen und Beschreibungen. Eine Karte pro Produkt zeigt die Merkmale und Verfügbarkeit.
- Einfache und variable Artikel lassen sich ineinander umwandeln. Neue Artikel stehen vorne; die Sortierung berücksichtigt auch Entwürfe.
- Eine Anfrage führt mit vorausgefülltem Artikel und Merkmalen zum Kontaktformular und dem Betreff «TR-Shop».

## Zusätzliche Korrekturen

- Ungültige, unvollständige oder doppelte Kombinationsangaben werden vor Schreibzugriffen abgelehnt. Die Oberfläche begrenzt die Berechnung vor dem Erzeugen grosser Kombinationsmengen.
- Umordnen und Umbenennen von Merkmalen erhält die IDs und Bestände bestehender Kombinationen. Zugehörige Wertbilder bleiben erhalten. Dazu werden die alten Varianten vor der Änderung des übergeordneten Artikels geladen; WooCommerce filtert Variantenattribute sonst bereits nach den neuen Bezeichnungen.
- Bestehende manuell gepflegte Galeriebilder, beschreibende Merkmale und weiterhin gültige Vorauswahlen bleiben erhalten. Bei der Umwandlung in einen einfachen Artikel werden nur Variantenmerkmale entfernt.
- Entfernte Kombinationen werden in den Papierkorb verschoben. Bestehende Bestellungen bleiben erhalten. Globale WooCommerce-Merkmale, gemeinsamer Variantenbestand sowie offene oder doppelte Alt-Kombinationen bleiben zur sicheren Pflege in WooCommerce.
- Auch das Anlegen eines Artikels ist vollständig transaktional. Spätere Variantenfehler und fehlgeschlagene Bestätigungen hinterlassen weder halbe Artikel noch erfolgreiche Wiederholungskennungen. Nach einem Abbruch werden Produkt- und Optionscaches bereinigt.
- Französische Variantenbezeichnungen nutzen den französischen Produktnamen mit den gewählten Werten. Bestandsgeführte Anfrageartikel erlauben keine Nachbestellung über den Bestand hinaus; ausdrücklich nachbestellbare Artikel funktionieren auch im manuellen Verkauf.
- Alte, bereits geöffnete Variantenformulare müssen nach dem Schnittstellenwechsel neu geladen werden. So können fehlende neue Merkmalsangaben keine bestehenden Varianten entfernen.

## Prüfungen

- 37 JavaScript-Prüfungen erfolgreich, einschliesslich Begrenzung der Kombinationsberechnung und stabiler Zuordnung bei umbenannten Merkmalen.
- 298 isolierte PHP-Regressionen erfolgreich, davon 65 Shopprüfungen. PHPUnit: 93 Tests mit 403 Assertions erfolgreich mit lokalem PHP 8.3.33 über WebAssembly; der prozessisolierte Test wurde in einem separaten lokalen Prozess ausgeführt.
- ESLint, TypeScript, Anwendungsbuild, WordPress-Build und Strukturprüfung erfolgreich. PHP-Syntax: 150 Dateien erfolgreich. Bekannte Buildhinweise zur Chunkgrösse und statischen Routenerkennung bleiben bestehen.
- 43 native WooCommerce-Prüfungen mit dem Kandidaten auf Staging erfolgreich: acht Kombinationen, Lagerregeln, Anfrage-Link inklusive Umlauten, französische Varianten, Umordnen/Umbenennen, Wertbilder, Galerie, Typwechsel, wiederherstellbare Kombinationen und vollständiger Abbruch einer Neuanlage. Zusätzlich: manueller Verkauf mit erlaubten Nachbestellungen und Ablehnung von Anfrageartikeln bei unzureichendem Bestand.
- Die nativen Testartikel waren privat; der Veröffentlichungsstatus für zwei manuelle Verkaufsvorschauen wurde nur innerhalb einer zurückgerollten Datenbanktransaktion geändert. Testdatensätze wurden vollständig entfernt; echte Mails und externe Anfragen waren abgefangen. Bestehende Clubartikel wurden nicht zum Testen verändert.
- GitHub-CI des ersten Integrationsstands erfolgreich: Frontend, WordPress-Plugin, Struktur und Geheimnisprüfung.
- Nach der Veröffentlichung: insgesamt 486 native PHP-Prüfungen auf Staging erfolgreich, zusätzlich sechs HTTP-Prüfungen. Alle 483 Programmdateien entsprechen dem freigegebenen Manifest.
- Safari: öffentliche Shopübersicht mit Artikeln, Merkmalen und Preisen lädt. Die Prüfung des angemeldeten Artikeleditors wartet auf die macOS-Bestätigung für das gespeicherte Passwort. Firefox wurde nicht verwendet.

## Sicherung und Veröffentlichung

Der Nutzer hat GitHub und Staging ausdrücklich freigegeben. Produktion ist nicht betroffen.

Vorbereitung: Die 480 bisherigen Programmdateien auf Staging stimmen mit dem Ausgangsstand überein. Datenbank, vollständige Website und alle privaten Ablagen sind gesichert unter `/private/strc-staging-backups/20261101T080802Z-pr77`. Die Archive wurden entpackt und vollständig mit dem Serverbestand verglichen: 14’223 Website-Dateien und 330 private Dateien stimmen überein. Ein während der Sicherung neu hinzugekommener Clubdatensatz wurde erhalten; danach wurde die Datenbank nochmals bei stabilem Datenbestand exportiert (`database-current-1.sql`, 4’456’120 Bytes). Diese aktuelle SQL-Sicherung ist für eine Datenbankwiederherstellung massgeblich. Ein Datenbank-Neuimport wurde nicht durchgeführt.

Veröffentlicht am 01.11.2026: neun Programmdateien, mit Dateiprüfsummen und atomaren Dateiumbenennungen kontrolliert. Rückfallbestand: `/private/strc-peter-release-20261101082747`. Das Release-Manifest ist als `published` markiert.

Der abschliessende Vergleich bestätigt unveränderte Konten, Passwörter, Rollen, Funktionszuordnungen, 276 bestehende Inhalts-/Anmelde-/Produktdatensätze, Mailvorlagen, Löschprotokoll und alle 330 privaten Dateien. Datenbankschema und bestehende Migrationsstände bleiben unverändert. Vor einer Rücksetzung müssen spätere fremde Änderungen abgeglichen werden. Private Sicherungen, Zugangsdaten und detaillierte Testbelege werden nicht auf GitHub gespeichert.

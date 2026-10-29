# Redaktionsentscheid vom 29.10.2026: PR 69

Diese Freigabe setzt Peters fachliche Vorgaben um. Die vorherigen
Integrationsnotizen zu PR 66 und 67 beschreiben einen historischen Zwischenschritt.

## Verbindliches Verhalten

- Galerieoriginale laufen vier Monate nach dem Upload ab, unabhängig von alten
  Verlängerungsmarkierungen. Fehlt das Uploaddatum, zählt das Erstellungsdatum
  des Albums. Der Verlängerungsschalter entfällt.
- Mitgliederporträts sind Profilinhalt und bleiben ausgenommen.
- Vor dem Löschen wird eine Webkopie angefordert. Ohne vorhandene Webkopie
  verweigert der Dateispeicher das Löschen des Originals.
- Der Agenda-Slider erhält keinen zusätzlichen Pause-Knopf. Bei Mauszeiger,
  Tastaturfokus, verborgenem Browser-Tab oder reduzierter Bewegung pausiert er
  weiterhin. Die Plakatvergrösserung bleibt erhalten.
- STRC Admin und Superadmin übersteuern die Vorstandsstufe. Vorstand allein
  gewährt Leserechte; Bibliotheksmoderation allein gewährt keinen Vorstandszugriff.
  Vorstand plus Bibliotheksmoderation darf die Dokumente pflegen.
- Endgültiges Löschen von Vorstandsunterlagen bleibt auch für Admins gesperrt.
- Die 16-MB-Fotogrenze und die übrigen Sicherheitskorrekturen bleiben erhalten.

## Integration und Prüfungen

- Keine fachliche Umgestaltung gegenüber PR 69. Ergänzt werden Regressionen
  für die tatsächlichen Admin-Rollen und ihre Archivaktionen.
- Tests umfassen 18 Upload-/Passwort-/Sliderprüfungen, die native PHP-Suite,
  65 Sicherheitsprüfungen, 63 Baur-/Mailprüfungen und Redaktionstests.
- Lint, TypeScript, Anwendungs- und WordPress-Build sowie Strukturprüfung.
- Quelle und erzeugte Website-Dateien werden zusammen versioniert.
- PR 70 ist nicht Teil dieses Freigabepakets.

## Staging

Ziel ist ausschliesslich https://staging.swisstrclub.ch. Vor der Veröffentlichung
werden Datenbank und vollständiges Staging-Webverzeichnis serverseitig und
zugriffsbeschränkt gesichert. Prüfsummen und Archivlesbarkeit werden geprüft.
Der aktuelle Serverstand wurde mit dem letzten verifizierten Release verglichen.
Beim Vorabcheck fiel kein vorhandenes Fotooriginal unter die neue Löschfrist.

Nach der Veröffentlichung werden Programmdateien, Vorstandsrubriken,
Dokumentstatus und Rollenrechte auf dem echten Staging-Backend geprüft.
Synthetische Rollenprüfungen laufen in einer zurückgerollten Transaktion;
Testmails und externe Aufrufe werden abgefangen. Das ist kein Zustellnachweis.
Die zusätzliche Abnahme in `scripts/tests/editorial-staging.php` verwendet
ausschliesslich eigene Testdokumente und Testdateien. Sie prüft die Migration
aller Dokumentstatus, Originalablauf, Webkopien, junge Bilder und Porträts.

Die Aussage «Keine Veröffentlichung auf Staging oder Produktion in diesem
Arbeitsschritt» in früheren Notizen bezeichnet nur die damalige
GitHub-Zusammenführung. Sie verbietet keine spätere, freigegebene Veröffentlichung.

Produktion ist nicht freigegeben und bleibt unverändert. Bei einem Rückfall
werden nur die ausgetauschten Programmdateien nach Prüfsummenvergleich
wiederhergestellt; eine pauschale Datenbankrücksetzung würde parallele Inhalte
überschreiben und ist deshalb nicht vorgesehen.

## Veröffentlichung und abgeschlossene Abnahme

Am 29.10.2026 um 11:39 Uhr Schweizer Zeit wurden die freigegebenen PRs 66–69
gemeinsam auf Staging veröffentlicht. Anwendungsstand:
`bfbee5605f2c6bf4c9bf5884d31684fa7b7bf0bc`. Es wurden 22 Programmdateien
ersetzt beziehungsweise ergänzt; alle 472 Programmdateien stimmen mit dem
veröffentlichten Release-Manifest überein.

Sicherung vor Veröffentlichung:
`/private/strc-staging-backups/20261029T103207Z-pr69`.

| Sicherung | Bytes | SHA-256 |
|---|---:|---|
| `database.sql` | 4’305’306 | `32152ac010e57de978a314e232a5c688e58733e8b41576463545c9d1f6b0a75e` |
| `files.tar.gz` | 387’372’795 | `72fe9a45439fbab4603095f7ec6711e627c178cfdefd3ad856623236336a9f24` |

Archivlesbarkeit und Prüfsummen sind bestätigt. Der gezielte Dateirückfall liegt
unter `/private/strc-peter-release-20261029103939`.

| Prüfung | Ergebnis |
|---|---|
| GitHub Quality vor Zusammenführung | Alle Prüfungen erfolgreich |
| Isolierte PHP-Regressionen auf Staging, PHP 8.3.36 | 65 Sicherheits-, 63 Baur-/Mail- und 28 Redaktionstests bestanden |
| Echte WordPress-/MariaDB-Rollenabnahme | 89 Prüfungen bestanden |
| Echte Migration und Fotoablauf mit Testdateien | 19 Prüfungen bestanden |
| HTTPS-Dateien, Plakate, Inserate und Gastgrenzen | 15 Prüfungen bestanden |
| Vorher-/Nachher-Vergleich und Programmmanifest | 462 Prüfungen bestanden |
| Safari auf Staging | Sechs Plakate, direkte Auswahl, Vergrösserung und fehlender Pause-Knopf bestätigt |

Die zwei redaktionellen Migrationen sind abgeschlossen. Bei den 219 vorhandenen
Dokumenten blieben Status, Klassifikation und Dateiverweise erhalten. Alle sechs
Alben und ihre vorhandenen Originaldateien blieben erhalten, einschliesslich
zweier Mitgliederporträts. Ausschliesslich die vorgesehene Galerie-Freigabe wurde
angewendet. Beim bestehenden Administrationskonto blieben Rollen und Passwort
unverändert; seine tatsächlichen Funktionszuordnungen stimmen zusätzlich exakt
mit der Datenbanksicherung überein.

Die Rollenfixtures bilden aktive Mitglieder mit zusätzlicher Admin- beziehungsweise
Superadmin-Funktion ab. Der bestehende Mitgliedschaftsschutz wird dadurch nicht
umgangen oder verändert.

Sämtliche synthetischen Datensätze wurden zurückgerollt; neun selbst erzeugte
Testdateien wurden entfernt. Vier Testmails und drei HTTP-Aufrufe wurden abgefangen.
Es wurden keine echten Mails versandt oder Newsletterkontakte extern verändert.
Die abschliessende frische Prüfung bestätigte unveränderte echte Daten und
übereinstimmende Programmdateien. Produktion bleibt unverändert; PR 70 ist separat.

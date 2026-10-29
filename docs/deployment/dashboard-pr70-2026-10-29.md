# Dashboard-Cockpit: PR 70

## Freigegebene Änderung

Auf Wunsch von Peter erhält der blaue Willkommensbereich des Mitglieder-Dashboards
eine helle TR4A-Cockpitzeichnung. Auf Mobilgeräten erscheint sie dezenter; im
Druck entfällt sie. Die Zeichnung liegt hinter den Inhalten und fängt keine
Klicks ab. Profilbearbeitung und Fahrzeugvorschau bleiben unverändert.

PR 70 wurde konfliktfrei mit dem aktuellen Hauptstand einschliesslich der
Sicherheitskorrekturen und Redaktionsentscheide aus PR 69 verbunden. Es gibt
keine Änderungen an Backend, Datenbankmigrationen, Rollen oder Mitgliedsdaten.

## Prüfungen vor Veröffentlichung

- Frontend-Lint, TypeScript und Anwendungsbuild erfolgreich.
- WordPress-Build und Manifestprüfung erfolgreich: 473 Programmdateien.
- Strukturprüfung und 18 bestehende Frontend-Regressionen erfolgreich.
- Aktueller Staging-Programmstand entspricht vollständig dem vorherigen Release.
- Nur drei Serverdateien ändern sich: `build/app.js`, `build/app.css` und
  `build/club/cockpit-tr4a.png` im Theme `strc-app`.
- Fremde lokale Dokumentationsänderungen bleiben ausserhalb dieser Freigabe.

## Veröffentlichung

Der Benutzer hat die Veröffentlichung auf https://staging.swisstrclub.ch
freigegeben. Vor dem Austausch werden Datenbank und vollständiges Webverzeichnis
privat gesichert und auf Lesbarkeit und Prüfsummen geprüft. Die Veröffentlichung
prüft sämtliche bisherigen Programmdateien erneut und stoppt bei Serveränderungen.
Neue Bilder werden vor den darauf verweisenden Anwendungsdateien installiert.
Ein gezielter Dateirückfall bleibt verfügbar. Produktion bleibt unverändert.

Am 29.10.2026 um 12:17 Uhr Schweizer Zeit wurde der geprüfte Anwendungsstand
`9ef552b0ae514cee125707136279aed0d09ceb03` aus PR 70 direkt auf Staging
veröffentlicht. PR 70 bleibt offen; `main` wurde nicht verändert.

Sicherung: `/private/strc-staging-backups/20261029T111419Z-pr70`.

| Datei | Bytes | SHA-256 |
|---|---:|---|
| `database.sql` | 4’305’915 | `a07da9c737afa1ac823f7e9b38cbf35c2dd91f527f522c62b8c28a9fa85f059a` |
| `files.tar.gz` | 388’852’498 | `e8bb4794a86bb8e6d05ff5a2044f1ac7c0e9026585144579fc3dcdb77506039f` |

Archivlesbarkeit und Prüfsummen sind bestätigt. Der gezielte Dateirückfall liegt
unter `/private/strc-peter-release-20261029111711`.

| Prüfung | Ergebnis |
|---|---|
| GitHub-Prüfungen auf dem veröffentlichten Anwendungsstand | Alle sieben erfolgreich |
| Vollständiger Programmvergleich | 473 Dateien, keine Abweichung |
| HTTPS-Prüfungen | 16 bestanden, einschliesslich Cockpitbild, JS und CSS |
| Vorher-/Nachher-Vergleich | 462 Prüfungen bestanden |
| Safari im echten Staging-Mitgliederbereich | Cockpit sichtbar, Name und Mitgliedsnummer lesbar |
| Profilnavigation im Cockpitbereich | Öffnen und Rückkehr erfolgreich |
| Safari-Druckvorschau, Hintergründe eingeschaltet | Cockpitzeichnung ausgeblendet |

Alle 219 Dokumente, sechs Alben und ihre Originaldateien blieben unverändert.
Passwörter, Rollen und tatsächliche Funktionszuordnungen sämtlicher bestehender
Konten stimmen mit dem Vorherstand überein. Beide vorhandenen redaktionellen
Migrationen bleiben abgeschlossen; PR 70 benötigt keine Migration.

Für die Sichtprüfung wurde ein eindeutig markiertes Testmitglied ohne Adminrechte
verwendet. Es wurde abgemeldet und mitsamt Mitgliedschaft und Sitzungsdaten entfernt.
Es wurden keine Testpasswörter gespeichert und keine Druckaufträge ausgelöst.
Der eigene Safari-Testtab wurde geschlossen; vorhandene Tabs bleiben erhalten.

Eine separate Smartphone-Sichtprüfung und die Fahrzeugfoto-Vorschau wurden in
diesem Schritt nicht erneut ausgeführt. Die mobilen und druckspezifischen Regeln
sind Bestandteil des geprüften Builds. Die bisherigen Sicherheits- und
Redaktionsprüfungen bleiben erfolgreich. Produktion wurde nicht verändert.

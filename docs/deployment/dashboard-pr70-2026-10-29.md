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

Der endgültige Sicherungsnachweis und die Staging-Abnahme werden nach der
Veröffentlichung ergänzt.

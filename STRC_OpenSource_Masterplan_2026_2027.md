# Swiss TR-Club Website V3 - Open-Source-Masterplan 2026-2027

Version: 1.0  
Stand: 30. August 2026  
Status: Arbeits- und Entscheidungsgrundlage  
Zweck: Verbindliche Reihenfolge für Planung, KI-Umsetzung, Tests und Abnahme

## 1. Ziel dieses Plans

Dieser Plan übersetzt die bisherigen Spezifikationen und das Update vom 30. August 2026 in eine umsetzbare, kostengünstige Open-Source-Roadmap.

Er ist so geschrieben, dass:

- ein starkes Planungsmodell die Arbeitspakete verfeinern kann;
- ein Codierungsmodell jeweils genau ein Ticket umsetzt;
- der Club nach jedem Inkrement kontrolliert Feedback geben kann;
- keine KI selbstständig Produktionsdaten oder Produktion verändert;
- technische und fachliche Abnahmen nachvollziehbar bleiben;
- wiederkehrende Lizenzkosten möglichst vermieden werden;
- WordPress als vorgeschriebene Plattform erhalten bleibt;
- Fairgate kontrolliert und nicht unkoordiniert abgelöst wird.

## 2. Quellen und Rangfolge

| Rang | Quelle | Bedeutung |
|---:|---|---|
| 1 | E-Mail-Update vom 30. August 2026 | Neue Zielrichtung und Termine |
| 2 | Functional Specifications V1 | Fachliche Sollfunktionen |
| 3 | Solution Architecture Guide V1.0 | Technische Grundprinzipien |
| 4 | Bestehende Website swisstrclub.ch | Inhalts- und Migrationsquelle |
| 5 | React-Mockup im Repository | UX-Prototyp, kein Produktionssystem |

Bei einem Widerspruch gilt:

1. Das Update ändert die langfristige Fairgate-Zielrichtung.
2. WordPress bleibt das zentrale CMS.
3. Fachliche Regeln bleiben gültig, sofern nicht geändert.
4. Architekturabweichungen werden als ADR dokumentiert.
5. Unklare Punkte werden nicht stillschweigend angenommen.

## 3. Interpretation des Updates

### 3.1 Neu erlaubt

- Open-Source-Lösungen dürfen Fairgate-Funktionen ersetzen.
- CiviCRM oder gleichwertige Lösungen dürfen geprüft werden.
- Club-spezifische Funktionen dürfen im STRC-Core entstehen.
- Wiederkehrende Plugins sollen weitgehend vermieden werden.
- Lifetime-Lizenzen sind bei klarem Nutzen akzeptabel.
- Transaktionskosten bleiben zulässig.
- Hetzner oder anderer WordPress-fähiger Hoster ist möglich.

### 3.2 Noch nicht automatisch entschieden

- Der Vorstand muss den produktiven Cutover bestätigen.
- Die Finanzbuchhaltung benötigt eine separate Fachprüfung.
- STRC-Core-Mitgliederverwaltung benötigt Integrationstests und Fachabnahme.
- Produktivmigration benötigt Clubfreigabe und Datenschutzprüfung.
- Kündigungen dürfen erst nach einem belastbaren Go/No-Go erfolgen.

### 3.3 Übergangsarchitektur

STRC Core ersetzt Mitgliedschaft, Beiträge, Rechnungen, Rundmails und Zahlungsstatus. Fairgate dient nur als befristete Migrationsquelle. Der Cutover erfolgt nach CSV-Prüflauf, Fachabgleich, Backup, Rückrollprobe und Vorstandsbeschluss. CiviCRM bleibt höchstens ein späterer, optionaler Migrationsträger.

## 4. Harte Termine und Entscheidungstore

| Datum | Ereignis | Verbindliches Ergebnis |
|---|---|---|
| 4. September 2026 | Architekturentscheid | Übergang und Open-Source-Zielbild bestätigt |
| 11. September 2026 | UX-Review | Anmeldung, Events, DocLib, Dashboard klickbar |
| 18. September 2026 | Hostingentscheid | Staging, Backup, Domain, E-Mail beschlossen |
| 2. Oktober 2026 | Technologie-Gate | STRC Core, Events, DocLib, Zahlung bewertet |
| 16. Oktober 2026 | Kündigungs-Gate | Entscheid über Fairgate-Weblizenzen |
| 30. Oktober 2026 | Stage-Gate | Hauptfunktionen auf Staging testbar |
| 13. November 2026 | Release-Gate R1 | Minimalwebsite produktionsbereit |
| 16. November 2026 | Lizenzablauf | Fairgate-Webmodul kann entfallen |
| 1. Januar 2027 | Release R2 | Paarmitgliedschaft und DocLib produktiv |
| 20. Januar 2027 | Release R3 | Definierte Webmodule produktiv oder abgenommenes Restbacklog |
| 16. November 2027 | Release R4 | Restliche Fairgate-Funktionen abgelöst oder bewusst verlängert |

Der 20. Januar ist für eine Einzelperson trotz KI sehr ambitioniert. Er ist nur haltbar, wenn:

- der Umfang strikt priorisiert bleibt;
- der Club wöchentlich abnimmt;
- reale Testdaten früh verfügbar sind;
- keine neue Finanzbuchhaltung bis Januar verlangt wird;
- optionale Detailfunktionen später folgen dürfen;
- mindestens ein unabhängiger Tester verfügbar ist.

## 5. Release-Schnitt

### R0 - Entscheidungsfähiger Prototyp

Zieldatum: 11. September 2026

Enthält:

- responsive öffentliche Startseite;
- Navigation für Desktop und Mobile;
- UX-Prototyp Mitgliedsanmeldung;
- UX-Prototyp Eventdetail und Anmeldung;
- UX-Prototyp Dokumentbibliothek;
- UX-Prototyp persönliches Dashboard;
- Designsystem und Komponentenübersicht;
- offene Fragen direkt am jeweiligen Prozess.

Nicht enthalten:

- echte Mitgliederdaten;
- produktive Zahlungen;
- produktive E-Mails;
- Schreibzugriff auf produktive Mitgliederdaten;
- Produktionsfreigabe.

### R1 - Minimaler Ersatz des Fairgate-Webmoduls

Zieldatum: 13. November 2026

Muss enthalten:

- öffentliche Clubseiten;
- News und Regionen;
- Agenda und Eventdetails;
- sichere WordPress-Anmeldung;
- Passwort-Zurücksetzung;
- Mitglieder-Grundimport per CSV;
- lokaler Mitgliedsstatus für Zugriffsprüfung;
- einfaches Dashboard;
- optional einfache Eventanmeldung;
- DE/FR für Systemoberflächen und nationale Kerninhalte;
- responsive PC-, Tablet- und Mobile-Darstellung;
- Backups, Monitoring und Rollback.

Kann später folgen:

- komplexe Eventoptionen;
- Onlinezahlung;
- vollständiger Shop;
- Forum, Galerie und Marketplace;
- historische Mitgliederdatenmigration.

### R2 - Mitgliedschaft und Dokumentbibliothek

Zieldatum: 1. Januar 2027

Muss enthalten:

- Einzel-, Paar- und Jungmitgliedschaft;
- zwei getrennte Konten bei Paarmitgliedschaft;
- Primary Member und Co-Pilot;
- Mitgliedsprofil;
- My Triumphs ohne Drei-Fahrzeuge-Limit;
- Mitgliederverzeichnis mit Sichtbarkeitsregeln;
- geschützte Dokumentbibliothek;
- Open-, Limited- und Restricted-Zugriff;
- TR-Magazin und Newsletter-Archiv;
- Roadbooks und technische Dokumente;
- sichere Downloads ohne direkte öffentliche Dateipfade;
- Dashboard-Integration.

### R3 - Vollständige Webplattform

Zieldatum: 20. Januar 2027

Zielumfang:

- vollständige Events und Teilnehmerverwaltung;
- Eventzahlungen und Rechnungsstatus;
- Forum und Wissensklassifikation;
- Galerie, Moderation und Originaldepot;
- Marketplace;
- WooCommerce-Shop;
- rollenabhängiges Dashboard;
- Benachrichtigungen;
- Administration und Dokumentation.

Falls der Termin gefährdet ist, gilt diese Reihenfolge:

1. Sicherheit und korrekte Zugriffsrechte.
2. Mitgliedschaft und DocLib.
3. Events und Zahlungen.
4. Dashboard.
5. Shop.
6. Marketplace.
7. Forum.
8. Galerie-Komfortfunktionen.

### R4 - Fairgate-Ablösung

Zieldatum: spätestens 16. November 2027

Enthält:

- STRC Core als bestätigtes Mitglieder-System of Record;
- Beitrags- und Rechnungslösung;
- geprüfte Paarmitgliedschaften;
- kontrollierte Finanzübergabe;
- historische Datenmigration;
- Abschaltung der verbleibenden Fairgate-Module;
- vollständige Betriebs- und Wiederherstellungsdokumentation.

## 6. Empfohlenes Zielbild

### 6.1 Grundsatz

WordPress bleibt CMS, Benutzeroberfläche und Authentifizierung. Club-spezifische Logik liegt ausschliesslich im STRC-Core-Plugin. Standardmodule bleiben updatefähig. STRC Core ist das Zielsystem für Mitgliedschaft, Beiträge, QR-Rechnungen, Rundmails und Zahlungsabgleich.

### 6.2 Datenverantwortung während des Übergangs

| Datenbereich | Bis Cutover | Nach bestätigtem Cutover |
|---|---|---|
| Öffentliche Inhalte | WordPress | WordPress |
| Benutzerkonto und Passwort | WordPress | WordPress |
| Mitgliedstammdaten | Fairgate-CSV/STRC Core | STRC Core |
| Mitgliedsstatus | Fairgate-CSV/STRC Core | STRC Core |
| Paarbeziehung | Fairgate-CSV/STRC Core | STRC Core |
| Website-Rollen | WordPress | WordPress |
| Fahrzeuge | STRC Core | STRC Core |
| Events | WordPress/STRC Core | WordPress/STRC Core |
| Shop | WooCommerce | WooCommerce |
| Marketplace | STRC Core | STRC Core |
| Forum | wpForo | wpForo |
| Galerie | WordPress/STRC Core | WordPress/STRC Core |
| Dokumentbibliothek | STRC Core | STRC Core |
| Beiträge und Rechnungen | Fairgate-CSV/STRC Core | STRC Core |
| Finanzbuchhaltung | Bestehender Export | Noch zu wählendes Finanzsystem |

### 6.3 Empfohlene Komponenten

| Bereich | Empfehlung | Kostenstrategie | Entscheid |
|---|---|---|---|
| CMS | WordPress Core | Open Source | verbindlich |
| Editor | Gutenberg/Site Editor | Core statt Elementor | ADR erforderlich |
| Theme | leichtes STRC Block Theme | im Club-Repository | empfohlen |
| Mehrsprachigkeit | Polylang Free | Premium nur nach Fit-Gap | Spike |
| Mitgliedschaft | STRC-Core-Modul | Open Source | verbindlich |
| Formulare | Forminator Free | generische Formulare | empfohlen |
| Events | STRC Core + WordPress | Open Source | verbindlich |
| Shop | WooCommerce Core | Open Source | verbindlich |
| Zahlung | zahls.ch oder gleichwertig | nur Transaktionskosten | Spike |
| Forum | wpForo Free | Open Source | Spike |
| Marketplace | STRC-Core-Modul | keine Lizenz | empfohlen |
| Galerie | WP Media + STRC Workflow | keine Pro-Lizenz | Spike |
| DocLib | STRC-Core-Modul | keine Pro-Lizenz | empfohlen |
| PDF-Anzeige | PDF.js | Open Source | empfohlen |
| Karten | Leaflet + OSM-kompatibel | Providerregeln prüfen | Spike |
| SMTP | FluentSMTP | Open Source | empfohlen |
| Audit | Simple History | Free/Open Source | empfohlen |
| SEO | schlankes Free-Plugin | keine Pro-Funktion | später entscheiden |
| Backup | restic serverseitig | kein Backup-Plugin nötig | empfohlen |
| Cache | Nginx/FastCGI + Redis | serverseitig | empfohlen |
| Monitoring | Uptime Kuma/Healthchecks | Open Source/Freemium | empfohlen |

### 6.4 Bewusste Abweichungen vom alten Guide

| Alt | Neu | Begründung |
|---|---|---|
| Elementor bevorzugt | Gutenberg bevorzugt | weniger Abhängigkeiten und Lizenzdruck |
| Eventin bevorzugt | STRC-Core-Events | einheitliche Rollen und Datenhaltung |
| NextGEN bevorzugt | WordPress plus STRC-Workflow | Pro-Funktionen vermeiden |
| kommerzielle DocLib möglich | eigenes schmales DocLib-Modul | Zugriffsmodell ist club-spezifisch |
| UpdraftPlus | restic ausserhalb WordPress | unabhängig vom funktionierenden CMS |
| Fairgate dauerhaft System of Record | STRC Core als Zielsystem | neues Update vom 30. August |

Jede Abweichung erhält ein Architecture Decision Record unter `docs/adr/`.

## 7. Hosting- und Betriebsarchitektur

### 7.1 Hetzner ist geeignet

WordPress muss nicht bei WordPress.com gehostet werden. Ein Hetzner-Server kann WordPress, PHP, MariaDB und die benötigten Dienste betreiben. Entscheidend sind Betrieb, Updates, Backups und Überwachung.

### 7.2 Empfohlener Aufbau

- Linux LTS auf einem Hetzner-Cloud-Server;
- Nginx oder Caddy als Reverse Proxy;
- PHP-FPM in unterstützter Version;
- MariaDB in unterstützter Version;
- Redis für Object Cache und Locks;
- WordPress mit eingeschränktem Datenbankbenutzer;
- Staging und Produktion logisch getrennt;
- Uploads und private Dokumente auf getrennten Volumes;
- Backups verschlüsselt auf externem Backupziel;
- TLS über Let's Encrypt;
- DNS optional über Cloudflare Free;
- E-Mail über externen SMTP-Dienst;
- keine normale Mailbox-Zustellung direkt vom Webserver.

### 7.3 Mindestressourcen

Die kleinste Instanz darf erst nach Lasttest gewählt werden. Der Spike misst:

- PHP-Speicherbedarf;
- Datenbankantwortzeiten;
- Importdauer für Mitglieder;
- Dashboard-Antwortzeit;
- parallele Eventanmeldungen;
- PDF- und Galerieverarbeitung;
- Backup- und Restore-Dauer.

### 7.4 Umgebungen

| Umgebung | Daten | E-Mail | Zahlung | Indexierung |
|---|---|---|---|---|
| Local | synthetisch | Mailpit | Sandbox | aus |
| CI | synthetisch | deaktiviert | Mock | aus |
| Staging | anonymisiert | Testempfänger | Sandbox | blockiert |
| Production | echt | produktiv | produktiv | öffentlich nach Regeln |

### 7.5 Backup-Zielwerte

- tägliches Datenbankbackup;
- tägliches inkrementelles Dateibackup;
- wöchentliches Vollbackup;
- verschlüsselte externe Speicherung;
- mindestens 30 tägliche Wiederherstellungspunkte;
- monatlicher Restore-Test auf separater Umgebung;
- RPO maximal 24 Stunden;
- RTO Ziel maximal 4 Stunden;
- Restore-Anleitung ohne Wissen des Entwicklers nutzbar.

### 7.6 Budget-Grenzen

Die E-Mail nennt als aktuelle Richtwerte:

- Hosting/E-Mail/Backup: CHF 130 jährlich;
- Domain: CHF 15 jährlich;
- Fairgate Contacts API: CHF 140 jährlich;
- zusätzliche Plugins: maximal CHF 200 jährlich;
- Transaktionskosten: nutzungsabhängig.

Diese Beträge sind keine aktuellen Anbieterangebote. Vor Bestellung wird eine Kostenliste mit Datum, Mehrwertsteuer, Kündigungsfrist und Folgekosten erstellt.

Ziel nach Fairgate-Ablösung:

- höchstens CHF 400 wiederkehrende Fixkosten jährlich;
- höchstens CHF 200 jährliche Plugin-Abonnements;
- bevorzugt CHF 0 Plugin-Abonnements;
- keine Lizenz ohne dokumentierten Open-Source-Vergleich;
- keine Lifetime-Lizenz ohne Update- und Sicherheitsbewertung.

## 8. Repository-Zielstruktur

Der vorhandene Prototyp bleibt erhalten und wird nicht als WordPress-Produktionscode missverstanden.

- `frontend/` - produktives, responsives Web-Frontend;
- `wordpress/` - reproduzierbare WordPress-Anwendung;
- `wordpress/wp-content/themes/strc/` - STRC Block Theme;
- `wordpress/wp-content/plugins/strc-core/` - Clublogik;
- `infra/` - lokale und Server-Konfiguration;
- `scripts/` - Migration, Deployment und Wartung;
- `tests/` - Integrations-, E2E- und Sicherheitsprüfungen;
- `docs/adr/` - Architekturentscheide;
- `docs/data/` - Feldmapping und Datenwörterbuch;
- `docs/runbooks/` - Betrieb, Restore und Incident Response;
- `docs/acceptance/` - Abnahmeskripte;
- `docs/licenses/` - Plugin-, Lizenz- und Kostenregister.

Nicht ins Repository gehören:

- echte Mitgliederdaten;
- Fairgate-Exporte;
- Datenbank-Dumps;
- API-Schlüssel;
- SMTP-Passwörter;
- Zahlungsgeheimnisse;
- Produktions-Uploads;
- private Dokumente.

## 9. STRC-Core-Architektur

### 9.1 Modulgrenzen

Das Plugin wird modular aufgebaut:

- `Members` - Mitgliedschaft, Status und CSV-Migration;
- `Roles` - Rollen und Capabilities;
- `Vehicles` - My Triumphs;
- `Directory` - Mitgliederverzeichnis;
- `Map` - approximierte Member Map;
- `EventsBridge` - Event-Erweiterungen;
- `Marketplace` - Inserate;
- `GalleryWorkflow` - Upload und Moderation;
- `DocumentLibrary` - Metadaten und Zugriff;
- `Dashboard` - Aggregation ohne Duplikate;
- `Notifications` - interne und externe Ereignisse;
- `Audit` - Club-spezifische Audit-Ereignisse;
- `Migration` - versionierte Migrationen;
- `AdminHealth` - Diagnose und Warteschlangen.

### 9.2 Verbindliche Regeln

- WordPress Core wird nie verändert.
- Fremdplugins werden nie direkt verändert.
- Jede Tabelle besitzt eine Schema-Version.
- Migrationen sind wiederholbar und protokolliert.
- Services kommunizieren über definierte Interfaces.
- Externe Calls laufen über Adapter.
- Schreibvorgänge sind idempotent, wo Wiederholung möglich ist.
- Fehlerzustände bleiben sichtbar und wiederholbar.
- Mitgliederdaten werden nur zweckgebunden gespeichert.
- Autorisierung wird serverseitig geprüft.
- Nonces ersetzen keine Rollenprüfung.
- Dateidownloads prüfen Rechte bei jeder Anfrage.

### 9.3 Eigene Tabellen

Eigene Tabellen sind sinnvoll für:

- mehrere Fahrzeuge pro Mitglied;
- Paarbeziehungs-Referenzen im Übergang;
- Synchronisationsjobs und Fehler;
- Event-spezifische Zusatzdaten;
- sichere Dokumentmetadaten und Dateireferenzen;
- Benachrichtigungsereignisse;
- Migrationsprotokolle.

Posts und Taxonomien sind sinnvoll für:

- öffentliche Inhalte;
- News;
- Regionen;
- Marketplace-Inserate;
- Galerie-Alben;
- Roadbooks;
- Dokumenteinträge, falls Zugriff sicher gekapselt bleibt.

## 10. Datenschutz und Sicherheit

### 10.1 KI-Sicherheitsregel

KI-Agenten erhalten niemals unbeaufsichtigt:

- Produktionsdaten;
- vollständige Mitglieder-CSV;
- echte Passwörter;
- Zahlungsdaten;
- produktive API-Schlüssel;
- private Clubdokumente.

Für Entwicklung werden synthetische oder irreversibel anonymisierte Daten verwendet.

### 10.2 Datenschutzaufgaben

- Verzeichnis aller Personendaten erstellen;
- Zweck und System of Record dokumentieren;
- Aufbewahrungsfristen je Datentyp festlegen;
- Rollenbasierte Sichtbarkeit dokumentieren;
- Einwilligungen und Clubgrundlagen prüfen;
- Datenschutzinformation aktualisieren;
- Export- und Löschprozess definieren;
- Backup-Löschgrenzen dokumentieren;
- Bildrechte und Uploadhinweise bestätigen;
- rechtliche Prüfung durch Clubverantwortliche durchführen.

### 10.3 Technische Sicherheitskontrollen

- HTTPS-only und HSTS nach Einführungsphase;
- sichere Session-Cookies;
- Zwei-Faktor-Authentifizierung für privilegierte Rollen;
- Rate Limiting für Login und Formulare;
- starke Passwortregeln mit WordPress-Standard;
- Least-Privilege-Capabilities;
- Admin-Aktivitätsprotokoll;
- automatische Betriebssystem-Sicherheitsupdates;
- monatliches kontrolliertes Plugin-Updatefenster;
- Abhängigkeits- und Schwachstellenscan;
- Datei-Upload-Validierung;
- Malware-Prüfung für Uploads;
- Content Security Policy stufenweise einführen;
- Secrets nur in Umgebungs-/Secret-Verwaltung;
- kein Debug-Output in Produktion;
- Security-Header automatisiert testen.

### 10.4 Private Dokumente

Limited- und Restricted-Dateien dürfen nicht durch Kenntnis einer URL abrufbar sein.

Verbindlicher Ansatz:

- Datei ausserhalb öffentlicher Uploadpfade speichern;
- Download nur über autorisierten Controller;
- Rechte vor jeder Übertragung prüfen;
- direkte Pfade nicht an Suchmaschinen ausgeben;
- `X-Accel-Redirect` oder gleichwertig verwenden;
- Audit für sensible Downloads vorsehen;
- Cache-Header für private Inhalte korrekt setzen;
- Tests für erratene und alte URLs schreiben.

## 11. Responsive UX und Barrierefreiheit

### 11.1 Zielgeräte

Jede Kernfunktion wird mindestens geprüft bei:

- 320 Pixel Breite;
- 375 Pixel Breite;
- 768 Pixel Breite;
- 1024 Pixel Breite;
- 1440 Pixel Breite;
- aktuelles iOS Safari;
- aktuelles Android Chrome;
- aktuelles Desktop Chrome, Firefox, Safari und Edge.

### 11.2 Senior-freundliche Regeln

- Basistext mindestens 18 Pixel;
- Touchziele mindestens 44 mal 44 Pixel;
- verständliche Textlabels statt nur Icons;
- maximal eine primäre Aktion pro Bereich;
- keine Hover-only-Funktion;
- kurze Formulare mit klaren Gruppen;
- Fehler direkt beim betreffenden Feld;
- eingegebene Daten bleiben nach Fehler erhalten;
- Status immer als Text, nicht nur Farbe;
- Tabellen auf Mobile durch Karten ersetzen;
- Bestätigung vor irreversiblen Aktionen;
- Sprache und Begriffe modulübergreifend identisch.

### 11.3 Accessibility-Gate

- Ziel WCAG 2.2 AA;
- vollständige Tastaturbedienung;
- sichtbare Fokusmarkierung;
- korrekte Überschriftenhierarchie;
- sinnvolle Formlabels und Fehlermeldungen;
- ausreichend Kontrast;
- Screenreader-Test kritischer Flows;
- keine erzwungene Animation;
- `prefers-reduced-motion` respektieren;
- Zoom bis 200 Prozent ohne Funktionsverlust.

### 11.4 3D-TR6 im Produktionssystem

Das vorhandene Modell ist ein visueller Zusatz, keine Kernfunktion.

- normales Seitenrendering darf nicht darauf warten;
- optimiertes Modell statt 30-MB-Quelldatei verwenden;
- Zielgrösse nach Optimierung maximal 3-5 MB;
- Bildposter sofort anzeigen;
- Modell erst nach Hauptinhalt laden;
- auf Data Saver und schwachen Geräten deaktivieren;
- bei Reduced Motion statisches Bild zeigen;
- auf Mobile dezent im Hintergrund verwenden;
- Textkontrast darf nie vom Modell abhängen;
- Web-Vitals vor und nach Aktivierung vergleichen.

## 12. Qualitätsbudgets

### 12.1 Performance

- LCP Ziel höchstens 2,5 Sekunden;
- INP Ziel höchstens 200 Millisekunden;
- CLS Ziel höchstens 0,1;
- kein render-blockierendes 3D-Modell;
- Startseite ohne 3D unter 1,5 MB initial;
- serverseitiges WebP/AVIF für Fotos;
- responsive Bildgrössen;
- keine unnötigen Page-Builder-Bundles;
- Cache-Hit-Rate und langsame Queries überwachen.

### 12.2 Zuverlässigkeit

- keine Transaktion gilt ohne bestätigte Speicherung als erfolgreich;
- Zahlungsstatus nur durch verifizierte Providerantwort;
- wiederholte Webhooks erzeugen keine Duplikate;
- externe Ausfälle blockieren keine unabhängigen Module;
- Warteschlangen haben Retry und Dead-Letter-Ansicht;
- Administratoren sehen offene Fehler;
- Backup-Restore wird praktisch getestet.

## 13. Detaillierte Umsetzungsphasen

### Phase A - Projekt-Baseline und Entscheide

Zeitraum: 31. August bis 4. September 2026

Tickets:

- `STRC-A001` Quellenbaseline und Änderungslog anlegen.
- `STRC-A002` Product Owner und Abnehmer benennen.
- `STRC-A003` R1/R2/R3-Umfang formell bestätigen.
- `STRC-A004` Fairgate-Kündigungsentscheid vorbereiten.
- `STRC-A005` Datenschutzverantwortung benennen.
- `STRC-A006` Architektur-ADR für Open-Source-Zielbild schreiben.
- `STRC-A007` Lizenz- und Kostenregister erstellen.
- `STRC-A008` Risiko- und Entscheidungslog erstellen.

Gate:

- Club bestätigt Termine, Verantwortliche und System-of-Record-Übergang.

### Phase B - UX-Prototyp und Inhaltsinventar

Zeitraum: 31. August bis 11. September 2026

Tickets:

- `STRC-B001` bestehende Website vollständig crawlen.
- `STRC-B002` URL-, Seiten- und Medieninventar erstellen.
- `STRC-B003` DE/FR-Inhaltsstatus erfassen.
- `STRC-B004` responsive Navigation finalisieren.
- `STRC-B005` Mitgliedsanmeldung prototypisieren.
- `STRC-B006` Eventanmeldung prototypisieren.
- `STRC-B007` DocLib und Rechte sichtbar prototypisieren.
- `STRC-B008` Dashboard mobil und Desktop prototypisieren.
- `STRC-B009` Usability-Test mit älteren Mitgliedern durchführen.
- `STRC-B010` Mockup-Freigabe protokollieren.

Gate:

- Peter und Fachverantwortliche bestätigen UX und Informationshierarchie.

### Phase C - Technische Spikes

Zeitraum: 7. September bis 2. Oktober 2026

Tickets:

- `STRC-C001` STRC-Core-Mitgliederverwaltung lokal installieren.
- `STRC-C002` Einzel-, Paar- und Jungmitgliedschaft modellieren.
- `STRC-C003` zwei WordPress-Konten je Paar testen.
- `STRC-C004` Mitgliedsstatus und WordPress-Rollen prüfen.
- `STRC-C005` 400 synthetische Mitglieder importieren.
- `STRC-C006` STRC-Core-Events gegen Anforderungen testen.
- `STRC-C007` Zahlungs-Sandbox und Webhooks testen.
- `STRC-C008` Polylang mit Theme und WooCommerce testen.
- `STRC-C009` wpForo Rollen und Klassifikationen testen.
- `STRC-C010` DocLib-Zugriffsschutz als Vertikalschnitt bauen.
- `STRC-C011` Galerie-Originaldepot testen.
- `STRC-C012` Hostinglast und Backup-Restore messen.

Gate-Kriterien:

- Fit-Gap-Tabelle je Komponente;
- nachgewiesene Upgradefähigkeit;
- dokumentierte jährliche Kosten;
- keine unbeherrschte Sicherheitslücke;
- klare Entscheidung Standard, Custom oder Verschiebung.

### Phase D - WordPress-Fundament

Zeitraum: 14. September bis 9. Oktober 2026

Tickets:

- `STRC-D001` lokale reproduzierbare Entwicklungsumgebung erstellen.
- `STRC-D002` WordPress, PHP und MariaDB pinnen.
- `STRC-D003` STRC Block Theme erstellen.
- `STRC-D004` STRC-Core-Grundstruktur erstellen.
- `STRC-D005` Rollen und Capabilities definieren.
- `STRC-D006` GitHub-CI für PHP, JS und Tests erstellen.
- `STRC-D007` Staging automatisch bereitstellen.
- `STRC-D008` Secrets und Konfiguration trennen.
- `STRC-D009` SMTP, Audit und Monitoring einrichten.
- `STRC-D010` Backup und Restore automatisieren.
- `STRC-D011` Deployment und Rollback dokumentieren.

Gate:

- frische Umgebung lässt sich dokumentiert reproduzieren.

### Phase E - Öffentliche Website und Migration

Zeitraum: 21. September bis 23. Oktober 2026

Tickets:

- `STRC-E001` Sitemap und Navigation umsetzen.
- `STRC-E002` Home, Club und Regionen umsetzen.
- `STRC-E003` News und regionale Inhalte umsetzen.
- `STRC-E004` TR-Modellseiten migrieren.
- `STRC-E005` Beitritt und Kontakt umsetzen.
- `STRC-E006` Agenda und Eventdetail öffentlich umsetzen.
- `STRC-E007` alte Medien bereinigen und migrieren.
- `STRC-E008` DE/FR-Kerninhalte migrieren.
- `STRC-E009` alte URLs auf neue Ziele abbilden.
- `STRC-E010` SEO-Metadaten und Sitemap konfigurieren.
- `STRC-E011` responsive und Accessibility-Test durchführen.

Gate:

- öffentliche Site ist inhaltlich vollständig für R1.

### Phase F - Login und Mitglieder-Grundzugang

Zeitraum: 5. Oktober bis 30. Oktober 2026

Tickets:

- `STRC-F001` CSV-Feldmapping definieren.
- `STRC-F002` anonymisierten Testexport importieren.
- `STRC-F003` Dublettenregeln definieren.
- `STRC-F004` WordPress-Konten idempotent erzeugen.
- `STRC-F005` Aktivierungs- und Reset-Flow umsetzen.
- `STRC-F006` lokalen Mitgliedsstatus speichern.
- `STRC-F007` inaktive Mitglieder sicher sperren.
- `STRC-F008` Basis-Dashboard umsetzen.
- `STRC-F009` Importbericht und Fehlerliste erzeugen.
- `STRC-F010` Kontenaktivierung mit Testgruppe durchführen.

Gate:

- keine echten Passwörter werden migriert;
- jedes Mitglied besitzt höchstens ein aktives Konto;
- Fehler sind wiederholbar und nachvollziehbar.

### Phase G - Events für R1/R3

Zeitraum: 12. Oktober bis 18. Dezember 2026

Tickets:

- `STRC-G001` Eventtypen und Scope modellieren.
- `STRC-G002` Eventstatus und Registrierungsstatus trennen.
- `STRC-G003` einfache kostenlose Anmeldung umsetzen.
- `STRC-G004` Co-Pilot, Gäste und Fahrzeuge ergänzen.
- `STRC-G005` Kapazität und Warteliste ergänzen.
- `STRC-G006` Eventoptionen und Preisberechnung ergänzen.
- `STRC-G007` Zahlung, Rechnung und Status ergänzen.
- `STRC-G008` Änderung und Stornierung ergänzen.
- `STRC-G009` Teilnehmerverwaltung und Export ergänzen.
- `STRC-G010` Organisator-Kommunikation ergänzen.
- `STRC-G011` Dashboard-Integration ergänzen.
- `STRC-G012` Event-Finanzabgleich testen.

Gate:

- Registrierung, Zahlung und Stornierung bleiben getrennte Zustände.

### Phase H - Produktionsfreigabe R1

Zeitraum: 2. bis 13. November 2026

Tickets:

- `STRC-H001` Testmigration wiederholen.
- `STRC-H002` Rollenmatrix vollständig testen.
- `STRC-H003` Security- und Uploadtests durchführen.
- `STRC-H004` Mobile-Gerätematrix testen.
- `STRC-H005` Backup-Restore praktisch durchführen.
- `STRC-H006` Content Freeze und finalen Export planen.
- `STRC-H007` DNS-TTL reduzieren.
- `STRC-H008` Produktionsbackup der alten Website erstellen.
- `STRC-H009` finale Migration durchführen.
- `STRC-H010` Smoke-Test und Freigabe durchführen.
- `STRC-H011` Rückrollpunkt dokumentieren.

Gate:

- Product Owner erteilt schriftliche Go-Live-Freigabe.

### Phase I - Paarmitgliedschaft und My Triumphs

Zeitraum: 16. November bis 11. Dezember 2026

Tickets:

- `STRC-I001` Pair/Household-Datenmodell finalisieren.
- `STRC-I002` Primary Member und Co-Pilot importieren.
- `STRC-I003` getrennte Konten und Präferenzen sicherstellen.
- `STRC-I004` gemeinsame Fahrzeugauswahl ermöglichen.
- `STRC-I005` My Triumphs CRUD umsetzen.
- `STRC-I006` Fahrzeugtaxonomie übernehmen.
- `STRC-I007` Verzeichnis und Suche umsetzen.
- `STRC-I008` Sichtbarkeitsregeln umsetzen.
- `STRC-I009` approximierte Member Map umsetzen.
- `STRC-I010` Statuswechsel und Reaktivierung testen.

Gate:

- Paarmitglieder bleiben zwei eigenständige Personen.

### Phase J - Document Library

Zeitraum: 16. November bis 23. Dezember 2026

Tickets:

- `STRC-J001` Kategorien und Metadaten umsetzen.
- `STRC-J002` Open/Limited/Restricted umsetzen.
- `STRC-J003` geschützten Downloadcontroller umsetzen.
- `STRC-J004` TR-Magazin-Archiv importieren.
- `STRC-J005` Newsletter-Archiv importieren.
- `STRC-J006` technische Dokumente klassifizieren.
- `STRC-J007` Roadbooks umsetzen.
- `STRC-J008` PDF.js-Viewer integrieren.
- `STRC-J009` zugriffsabhängige Suche umsetzen.
- `STRC-J010` Member-Upload und Moderation umsetzen.
- `STRC-J011` Board-Self-Service umsetzen.
- `STRC-J012` direkte URL-Angriffe testen.

Gate:

- Unberechtigte sehen weder Datei noch Metadaten.

### Phase K - Weitere Module

Zeitraum: 7. Dezember 2026 bis 20. Januar 2027

Tickets:

- `STRC-K001` wpForo und SSO konfigurieren.
- `STRC-K002` Fahrzeug-/Komponentenklassifikation ergänzen.
- `STRC-K003` Experten und Interessen ergänzen.
- `STRC-K004` Galerie-Alben und Lightbox umsetzen.
- `STRC-K005` Mehrfachupload und Moderation umsetzen.
- `STRC-K006` Originaldepot und 12-Monats-Regel umsetzen.
- `STRC-K007` Marketplace-CPT und Kategorien umsetzen.
- `STRC-K008` Inserate, Moderation und Ablauf umsetzen.
- `STRC-K009` Verkäufer-Kontaktformular absichern.
- `STRC-K010` WooCommerce konfigurieren.
- `STRC-K011` Versand und Eventabholung konfigurieren.
- `STRC-K012` Rechnung und Zahlungen konfigurieren.
- `STRC-K013` Dashboard-Aggregation vervollständigen.
- `STRC-K014` rollenabhängige Dashboardkarten ergänzen.
- `STRC-K015` Benachrichtigungszentrum ergänzen.

Gate:

- jedes Modul erfüllt seine eigene Abnahmeliste.

### Phase L - Fairgate-Ablösung 2027

Zeitraum: Februar bis November 2027

Tickets:

- `STRC-L001` vollständiges Fairgate-Dateninventar erstellen.
- `STRC-L002` STRC-Core-Datenmodell formell abnehmen.
- `STRC-L003` Beiträge und Rechnungen pilotieren.
- `STRC-L004` Buchhaltungsanforderungen aufnehmen.
- `STRC-L005` Open-Source-Finanzlösung evaluieren.
- `STRC-L006` Schattenbetrieb und Monatsabgleich starten.
- `STRC-L007` Differenzen automatisch berichten.
- `STRC-L008` historische Daten testmigrieren.
- `STRC-L009` Jahresabschluss-/Revisionsanforderungen prüfen.
- `STRC-L010` Cutover-Generalprobe durchführen.
- `STRC-L011` Vorstandsfremigabe dokumentieren.
- `STRC-L012` Fairgate final migrieren und archivieren.
- `STRC-L013` Restlizenzen kündigen.

Gate:

- Buchhaltung und Mitgliedschaft sind fachlich abgenommen.

## 14. Abnahmekriterien je Modul

### Mitgliedschaft

- Einzel-, Paar- und Jungmitglied funktionieren.
- Paarmitglieder besitzen getrennte Konten.
- Passwörter werden nie im Klartext verarbeitet.
- Aktivierung ist zeitlich begrenzt und einmalig.
- inaktiver Status entfernt Member-Zugriff.
- Reaktivierung erzeugt kein zweites Konto.
- Fahrzeuge bleiben WordPress-Daten.
- Sync-/Importfehler sind sichtbar und wiederholbar.

### Events

- Event und Registrierung besitzen getrennte Stati.
- kostenfreie und kostenpflichtige Events funktionieren.
- Co-Pilot, Gast und Fahrzeugauswahl funktionieren.
- Preise werden vor Bestätigung vollständig gezeigt.
- Registrierung ist nicht automatisch Zahlung.
- wiederholte Zahlungswebhooks erzeugen keine Duplikate.
- Organisatoren sehen nur zugewiesene Events.
- Exporte enthalten erforderliche, nicht unnötige Daten.

### Document Library

- Suche zeigt nur erlaubte Dokumente.
- verbotene Dokumenttitel bleiben unsichtbar.
- direkte Download-URLs umgehen keine Rechte.
- Open/Limited/Restricted werden einzeln getestet.
- Board-Zugriff verleiht keine Adminrechte.
- Dateien können ersetzt werden.
- Metadaten bleiben erhalten.
- öffentliche Suchmaschinen indexieren nichts Geschütztes.

### Forum

- nur berechtigte Mitglieder erhalten Zugriff.
- WordPress-Identität wird wiederverwendet.
- Fahrzeug und Komponente sind kombinierbar.
- Expertenstatus ist keine Adminrolle.
- Moderation funktioniert ohne Webmaster.
- private Profildaten erscheinen nicht automatisch.

### Galerie

- maximal 20 Dateien je Einreichung.
- fehlerhafte Dateien werden verständlich bezeichnet.
- Uploads sind vor Freigabe unsichtbar.
- Webversion und Original sind getrennt.
- Originaldepot ist privilegiert.
- 12-Monats-Regel ist automatisiert und prüfbar.
- öffentliche Auswahl erfolgt explizit.

### Marketplace

- öffentlich lesbar, nur Mitglieder schreiben.
- maximal fünf Bilder je Inserat.
- kein Checkout oder interne Zahlungsabwicklung.
- Wanted verweist ins Forum.
- Ablauf, Verlängerung und Rückzug funktionieren.
- Verkäuferadresse wird nicht offengelegt.

### Shop

- Gäste und Mitglieder können bestellen.
- Rechnung ist verfügbar.
- Versandpreis ist administrativ änderbar.
- Eventabholung ist filterbar.
- Lager reduziert sich korrekt.
- direkte Verkäufe sind mobil erfassbar.
- Rückerstattungen nutzen Standardfunktionen.
- Finanzexport ist nachvollziehbar.

### Dashboard

- personalisiert statt reine Linkliste.
- Status stammen aus den Quellmodulen.
- bereits Angemeldete sehen nicht erneut Anmelden.
- Action Required ist klar erkennbar.
- Rollenfunktionen sind additiv.
- leere Zustände helfen weiter.
- Mobile zeigt wichtigste Aktionen zuerst.

## 15. Teststrategie

### 15.1 Automatisierte Tests

- PHPUnit für STRC-Core-Domainlogik;
- WordPress-Integrationstests;
- REST-API- und Capability-Tests;
- Playwright für kritische End-to-End-Flows;
- Snapshottests nur für stabile Strukturen;
- Migrationstests mit synthetischen Daten;
- Importtests auf Wiederholung;
- Download-Autorisierungstests;
- Zahlungswebhook-Idempotenztests;
- Link- und Redirecttests;
- Lighthouse CI für Performance und Accessibility.

### 15.2 Manuelle Abnahmeskripte

Für jedes Release existieren schriftliche Schritte für:

- Gast;
- normales Mitglied;
- Paarmitglied Primary;
- Paarmitglied Co-Pilot;
- inaktives Mitglied;
- Event Organiser;
- Registration Moderator;
- Library Administrator;
- Board Member;
- Shop Manager;
- Treasurer;
- Webmaster.

### 15.3 Release-Blocker

Ein Release wird blockiert bei:

- kritischer oder hoher Sicherheitslücke;
- Datenverlust;
- falscher Rollenfreigabe;
- öffentlichem Zugriff auf private Dokumente;
- doppelten Zahlungen oder Mitgliedern;
- fehlgeschlagenem Restore;
- nicht bedienbarem Login auf Mobile;
- nicht dokumentiertem Produktions-Rollback.

## 16. Datenmigration

### 16.1 Website-Inhalte

1. vollständige URL-Liste erstellen;
2. Seitentyp und Eigentümer erfassen;
3. veraltete Inhalte markieren;
4. Zielseite und Sprache zuordnen;
5. Medienrechte prüfen;
6. Inhalte in Staging migrieren;
7. interne Links aktualisieren;
8. 301-Redirect-Matrix testen;
9. alte Website unverändert archivieren.

### 16.2 Mitglieder

1. Datenwörterbuch anfordern;
2. CSV-Testexport erzeugen;
3. Pflichtfelder und Identifier prüfen;
4. Dubletten und gemeinsame E-Mails klären;
5. Paarbeziehungen explizit mappen;
6. Regionen und Mitgliedstypen mappen;
7. Fahrzeuge separat transformieren;
8. Testimport mit Bericht durchführen;
9. Fachabgleich durch Club;
10. finale Migration nach Freeze;
11. Aktivierungs-E-Mails kontrolliert versenden.

Passwörter werden nicht migriert. Mitglieder aktivieren ihr WordPress-Konto über einen sicheren Link.

### 16.3 Qualitätsbericht

Jeder Import berichtet:

- gelesene Datensätze;
- neu erstellte Datensätze;
- aktualisierte Datensätze;
- unveränderte Datensätze;
- übersprungene Datensätze;
- Dubletten;
- Fehler;
- fehlende Beziehungen;
- Prüfsumme der Quelldatei;
- Importversion und Zeitpunkt.

## 17. Definition of Ready

Ein Coding-Ticket darf erst beginnen, wenn:

- eindeutige Ticket-ID vorhanden ist;
- fachliche Quelle genannt ist;
- Ziel und Nicht-Ziel beschrieben sind;
- Abhängigkeiten erfüllt sind;
- erlaubte Dateien/Module genannt sind;
- Datenklassifikation bekannt ist;
- Akzeptanzkriterien testbar sind;
- Testdaten verfügbar sind;
- Rollback beschrieben ist;
- offene Produktentscheidung geschlossen ist.

## 18. Definition of Done

Ein Ticket ist erst fertig, wenn:

- Akzeptanzkriterien erfüllt sind;
- automatisierte Tests bestehen;
- relevante manuelle Tests dokumentiert sind;
- Rollen und Fehlerfälle geprüft sind;
- Mobile und Tastatur geprüft sind;
- DE/FR-Systemtexte vorhanden sind;
- keine Secrets oder Echtdaten committed wurden;
- Migrationen wiederholbar sind;
- Dokumentation aktualisiert ist;
- Changelog ergänzt ist;
- Code Review erfolgt ist;
- Product Owner bei Fachfunktion abgenommen hat.

## 19. Arbeitsvertrag für KI-Agenten

### 19.1 Rollen

Planungsmodell, empfohlen Sol 5.6 High:

- zerlegt eine Phase in Tickets;
- prüft Anforderungen und Abhängigkeiten;
- erstellt ADR-Vorschläge;
- formuliert Akzeptanzkriterien;
- identifiziert Risiken und Testfälle;
- verändert ohne Auftrag keinen Produktionscode.

Codierungsmodell, empfohlen Sol 5.6 Medium:

- bearbeitet genau ein freigegebenes Ticket;
- erweitert den Umfang nicht selbstständig;
- liest zuerst Plan, Ticket und relevante ADRs;
- arbeitet nur mit synthetischen Daten;
- implementiert Tests zusammen mit Code;
- meldet Blocker statt Annahmen zu erfinden;
- commitet nur zusammengehörige Änderungen.

Reviewmodell, empfohlen Sol 5.6 High:

- vergleicht Ergebnis mit Ticket und Quellen;
- sucht Rechte-, Daten- und Migrationsfehler;
- prüft Tests und fehlende Negativfälle;
- klassifiziert Findings nach Schweregrad;
- implementiert nicht gleichzeitig den eigenen Review.

### 19.2 Verbindlicher Ticketkopf

Jedes KI-Ticket enthält:

- Ticket-ID;
- Ziel;
- fachliche Quellenabschnitte;
- Voraussetzungen;
- erlaubte Dateien/Module;
- ausdrücklich ausgeschlossene Arbeiten;
- Datenklassifikation;
- Umsetzungsschritte;
- Akzeptanzkriterien;
- Testbefehle;
- manuelle Prüfschritte;
- Migrationswirkung;
- Sicherheitswirkung;
- Rollback;
- erwartete Dokumentationsänderung.

### 19.3 Prompt für Sol 5.6 High

> Du bist Planungs- und Architekturagent für die Swiss-TR-Club-Website. Lies vollständig den Open-Source-Masterplan, die referenzierten Fachanforderungen, alle relevanten ADRs und den aktuellen Repository-Status. Zerlege ausschliesslich die genannte Phase in kleine, voneinander prüfbare Tickets. Jedes Ticket muss Definition of Ready, Ziel, Nicht-Ziele, Abhängigkeiten, erlaubte Dateien, Datenklassifikation, Akzeptanzkriterien, Negativtests, Rollback und Definition of Done enthalten. Markiere Annahmen und Entscheide separat. Erfinde keine Clubregeln. Verwende keine Produktionsdaten und ändere keinen Code, sofern nicht ausdrücklich beauftragt.

### 19.4 Prompt für Sol 5.6 Medium

> Implementiere ausschliesslich Ticket [ID]. Lies zuerst den Open-Source-Masterplan, das vollständige Ticket, relevante ADRs und die aktuelle Implementierung. Prüfe den Git-Status und erhalte fremde Änderungen. Verwende nur synthetische Daten. Ändere keine fremden Plugins oder WordPress Core. Implementiere Code, Migration, automatisierte Tests und notwendige Dokumentation gemeinsam. Führe die im Ticket genannten Tests aus. Melde PASS, FAIL und NOT RUN getrennt. Bei fehlender Produktentscheidung oder Echtdatenbedarf stoppe und melde den konkreten Blocker. Erweitere den Scope nicht.

### 19.5 Prompt für Sol 5.6 High Review

> Prüfe die Umsetzung von Ticket [ID] unabhängig gegen Fachquelle, ADR, Akzeptanzkriterien und Definition of Done. Priorisiere Datenverlust, unzulässige Zugriffe, fehlende serverseitige Autorisierung, Migration, Idempotenz, Datenschutz, Mobile, Accessibility und fehlende Negativtests. Liefere zuerst Findings mit Schweregrad und exakter Fundstelle. Nenne danach bestandene Prüfungen, nicht ausgeführte Prüfungen und Restrisiken. Ändere keinen Code.

### 19.6 Empfohlener Agentenzyklus

1. High erstellt oder verfeinert ein Ticket.
2. Mensch bestätigt Scope und offene Entscheide.
3. Medium implementiert genau dieses Ticket.
4. Medium führt lokale Tests aus.
5. High reviewt unabhängig.
6. Medium behebt bestätigte Findings.
7. CI prüft erneut.
8. Club testet Staging.
9. Product Owner nimmt fachlich ab.
10. Ticket wird geschlossen.

## 20. Git- und Releaseprozess

- `main` bleibt freigabefähig;
- ein Branch pro Ticket;
- Branchname `codex/STRC-ID-kurzbeschreibung`;
- kleine Commits mit Ticket-ID;
- kein Direktcommit auf Produktion;
- Pull Request benötigt Tests und Review;
- Datenbankmigrationen besitzen Vorwärts- und Rollbackhinweis;
- Release Candidate wird auf Staging markiert;
- Freigabe erzeugt signiertes Tag;
- Deployment nutzt exakt den freigegebenen Commit;
- Hotfix folgt demselben Prozess mit verkürzter Abnahme.

## 21. Plugin-Auswahlprozess

Kein Plugin wird allein aufgrund einer Funktionsliste installiert.

Bewertet werden:

- Open-Source-Lizenz;
- aktive Wartung;
- Sicherheitsverlauf;
- WordPress-/PHP-Kompatibilität;
- Datenexport und Exit-Strategie;
- benötigte Pro-Funktionen;
- jährliche und Lifetime-Kosten;
- Barrierefreiheit;
- Mehrsprachigkeit;
- Rollenmodell;
- API, Hooks und Tests;
- Performance;
- Qualität der Dokumentation;
- Migrations- und Deinstallationsverhalten.

Jeder Pluginentscheid dokumentiert:

- geprüfte Version;
- Prüftag;
- verantwortliche Person;
- Alternativen;
- Fit-Gap;
- Kosten;
- Lizenz;
- gespeicherte Daten;
- Deinstallationsfolgen;
- Ersatzstrategie.

## 22. Hauptrisiken

| Risiko | Wirkung | Gegenmassnahme |
|---|---|---|
| Vorstand bestätigt Cutover nicht | Migration blockiert | Fairgate nur lesend weiterführen |
| STRC Core deckt Fachfälle nicht | Betrieb und UX leiden | frühe Integrations- und Fachtests |
| Januar-Scope ist zu gross | Qualität sinkt | harte Priorisierung, gestaffelte Releases |
| Paarbeziehungen sind fehlerhaft | falsche Konten/Fahrzeuge | Datenmodell- und Importtests |
| private Dokumente liegen öffentlich | Datenschutzvorfall | private Storage- und URL-Tests |
| Polylang/Woo benötigt Premium | Budgetüberschreitung | Fit-Gap und bewusste Ausnahme |
| Zahlungen werden doppelt verarbeitet | finanzieller Schaden | Idempotenzschlüssel und Webhooktests |
| Self-Hosting wird unterschätzt | Ausfälle/Sicherheitslücken | automatisierter Betrieb, Runbooks |
| KI erweitert unkontrolliert Scope | inkonsistenter Code | ein Ticket je Agentenlauf |
| KI erhält Echtdaten | Datenschutzrisiko | synthetische Daten, Secret-Regeln |
| 3D-Modell verschlechtert Mobile | schlechte UX | Lazy Load und statischer Fallback |
| alte URLs gehen verloren | SEO/Bookmarks brechen | vollständige Redirect-Matrix |
| SMTP fällt aus | fehlende Bestätigungen | Queue, Logging und Fallback |
| Restore wurde nie geprobt | Backup unbrauchbar | monatlicher Restore-Test |

## 23. Vorstand- und Clubentscheide

Vor Vollentwicklung müssen beantwortet sein:

1. Wird STRC Core produktiv als Zielsystem abgenommen?
2. Bleibt Fairgate-Buchhaltung bis November 2027?
3. Welche Funktionen sind am 20. Januar wirklich zwingend?
4. Sind Deutsch und Französisch für alle Systemtexte verbindlich?
5. Welche nationalen Inhalte müssen zweisprachig sein?
6. Wer darf Restricted-Dokumente sehen?
7. Wer ist Product Owner und finale Abnahmeinstanz?
8. Wer übernimmt Serverupdates und Bereitschaft?
9. Welcher SMTP- und Zahlungsanbieter wird verwendet?
10. Welche realen Daten dürfen auf Staging verwendet werden?
11. Welche alten Inhalte und Magazine dürfen migriert werden?
12. Welche Kündigung wird bis 16. Oktober ausgelöst?

## 24. Erste unmittelbar ausführbare Tickets

Die nächste KI-Sitzung soll nicht mit dem Gesamtprojekt beginnen. Sie soll nacheinander diese Tickets bearbeiten:

1. `STRC-A001` Quellenbaseline und Änderungslog.
2. `STRC-A006` ADR Open-Source-Zielbild.
3. `STRC-B001` Crawl- und Inhaltsinventar-Konzept.
4. `STRC-L001` anonymisierten Mitgliederexport definieren.
5. `STRC-L002` CSV-Prüflauf und Qualitätsbericht abnehmen.
6. `STRC-C010` geschützte DocLib-Probe.
7. `STRC-D001` lokale WordPress-Umgebung.
8. `STRC-F007` inaktive Mitglieder sicher sperren.

Komponenten werden nach Integrations-, Sicherheits- und Fachtests eingefroren.

## 25. Erfolgskriterien

Das Projekt ist erfolgreich, wenn:

- WordPress die öffentliche und geschützte Plattform bildet;
- Mobile und Desktop gleichwertig nutzbar sind;
- ältere Mitglieder Kernprozesse selbstständig bedienen können;
- der Club Quellcode und Daten vollständig kontrolliert;
- keine private Datei öffentlich auffindbar ist;
- Paarmitgliedschaften korrekt abgebildet sind;
- Module keine widersprüchlichen Statuskopien pflegen;
- Fairgate kontrolliert und rückrollbar abgelöst wird;
- wiederkehrende Fixkosten das freigegebene Budget einhalten;
- ein anderer Entwickler das System mit Dokumentation betreiben kann;
- Backup und Restore praktisch funktionieren;
- alle Produktivänderungen abgenommen und nachvollziehbar sind.

## 26. Referenzen

Projektquellen:

- `Swiss TRClub Webseite.pdf`, E-Mail-Update vom 30. August 2026;
- `STRC - Website 3 - Functional Specifications V1.pdf`;
- `STRC Webseite V3 - Solution Architecture and Development Guide V1.0.pdf`;
- bestehende Website: <https://swisstrclub.ch/>;
- produktives Frontend: `frontend/`.

Technische Primärquellen:

- WordPress Anforderungen: <https://wordpress.org/about/requirements/>;
- Polylang: <https://wordpress.org/plugins/polylang/>;
- CiviCRM für WordPress: <https://civicrm.org/wordpress>;
- CiviCRM Projekt und Lizenz: <https://civicrm.org/about>;
- CiviCRM Systemanforderungen: <https://docs.civicrm.org/installation/en/latest/requirements/>;
- CiviCRM Member Sync: <https://civicrm.org/extensions/civicrm-wordpress-member-sync>;
- CiviCRM Relationships: <https://docs.civicrm.org/user/en/latest/organising-your-data/relationships/>;
- WooCommerce Dokumentation: <https://woocommerce.com/documentation/woocommerce/>;
- WooCommerce Entwicklerdokumentation: <https://developer.woocommerce.com/docs>;
- wpForo Dokumentation: <https://wpforo.com/documentation/>;
- FluentSMTP: <https://wordpress.org/plugins/fluent-smtp/>;
- Simple History: <https://wordpress.org/plugins/simple-history/>;
- Hetzner Cloud: <https://www.hetzner.com/cloud/>.

## 27. Änderungsprotokoll

| Version | Datum | Änderung |
|---|---|---|
| 1.1 | 30.08.2026 | STRC Core als Fairgate-Ersatz verbindlich festgelegt |
| 1.0 | 30.08.2026 | Open-Source-Zielbild und KI-Ausführungsplan erstellt |

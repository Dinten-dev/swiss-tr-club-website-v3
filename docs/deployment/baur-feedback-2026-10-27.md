# Baur Feedback Umsetzung und Abnahme

Stand: 28. Oktober 2026. Alle 33 Dokumentpunkte sind in der Umsetzung erfasst und nach ausdrücklicher Freigabe auf Staging veröffentlicht. Serverprüfungen, Sicherung und verbleibende Grenzen: [Staging-Abnahme](baur-staging-abnahme-2026-10-28.md). Produktion blieb unverändert. Firefox wurde auf ausdrücklichen Wunsch nicht verwendet. Der bestehende fremde Änderungsstand in `peter-pr56-pr58-2026-10-27.md` ist gegenüber der Ausgangssicherung unverändert.

## Vereinbarter Umfang

Dokumentiertes Feedback, bestehende Farben und Inserate-Freigaben. Einheitliche serifenlose Seitentypografie; die Club-Wortmarke bleibt separat gestaltet. Automatische Fotoverkleinerung. Weitere Mitglieder und Mitglied-/Gastbegleitungen bei allen Eventtypen. Bestehende Dateien, Rollen, Preise, Personenlimits, Fahrzeug- und Zimmerregeln bleiben erhalten.

## Nachweis je Feedbackpunkt

Die Nummerierung folgt den 33 Tabellenzeilen des Dokuments „Feedback Website TR Club Baur.docx“.

| Nr. | Rückmeldung | Änderung | Lokaler Nachweis / offene Abnahme |
|---|---|---|---|
| 1 | TRiungsters als Region | Aufnahmeformular und Serverauswahl auf geografische Regionen begrenzt; Gruppe bleibt bestehen. | PHP-Regression bestanden. |
| 2 | Safari-Zustimmungsfelder | Native Validierungspopover für Pflichtcheckboxen unterdrückt; Fehlermeldung und direkter Fokus. | Vollständiger Antrag mit gültigen übrigen Feldern in Safari und Chromium geprüft: nach fehlgeschlagener Validierung reagieren Statuten und Datenschutz jeweils auf den ersten Klick. |
| 3 | Jahresprogramm zu klein | Bild öffnet vergrösserbare Ansicht mit Zoom und Originaldateilink. | Chromium: Bilddialog öffnet, Zoom 100 % → 125 %, Originaldateilink vorhanden. |
| 4 | Agenda-Schreibfehler | Eng begrenzte, wiederholbare Inhaltskorrektur mit Sicherung und Versionsprüfung vorbereitet. | Acht Regressionen und fünf Prüfungen mit echten lokalen WordPress-Optionen bestanden. Auch gleichzeitige Änderungen nur der Grossschreibung blockieren das Überschreiben. Staging-Vorschau: keine betroffenen Textfelder; keine redaktionelle Änderung erforderlich. |
| 5 | Unterschiedliche Schriften | Vorhandene STRC Sans für Titel, Untertitel und Text; Logo-Wortmarke ausgenommen. | Lokale visuelle Prüfung; Farben unverändert. |
| 6 | Vergangene Events unbegrenzt | Zwölf Monate als Standard; Zeitraumwahl; serverseitig 20 Einträge pro Seite. | Chromium bestätigt Standard „Letzte zwölf Monate“ und Zeitraumwahl; PHP-Syntax bestanden. |
| 7 | Keine Ersatzteile ohne Filter | Standardliste zeigt alle verfügbaren Teile; bestehende Filter/Paginierung bleiben. | Chromium-Vorschau zeigt Inserat ohne Filter. |
| 8 | Kontaktbestätigung fehlt | Verkäuferanfrage plus Bestätigung an Absender; getrennte Fehlermeldungen; Anfrage-ID verhindert doppelte Nachrichten. | Echtes `wp_mail` mit PHPMailer und lokalem SMTP-Testpostfach: beide Nachrichten, Verkäuferfehler, reiner Bestätigungsfehler und Wiederholung geprüft. Staging: alle drei echten Testmails in Apple Mail empfangen, jedoch im Spamordner; SPF/DKIM/DMARC bestanden. |
| 9 | Zahl 496 unklar | Beschriftung „Mitgliedsnummer“. | Chromium bestätigt sichtbare Beschriftung. |
| 10 | Albumauswahl unkenntlich | Sichtbare Kontur, Abstand, Beschriftung und Fokuszustand. | Quellcode und Build geprüft. |
| 11 | Download und Fotooptionen unklar | Dateiversion erklärt; Einstellungen von Downloadaktionen getrennt. | Lokale Galerieansicht; Rollenrechte bleiben serverseitig geschützt. |
| 12 | Bildbeschreibung doppelt | Einmalige Anzeige; Bearbeitungsfeld erst nach explizitem Öffnen. | Typprüfung und Build bestanden. |
| 13 | Mehrere gleiche Downloadlinks | Einzel-Webdownload, ausgewählte Bilder und berechtigte Upload-/Originalversion klar bezeichnet; wiederholte Bildanhanglinks entfernt. | Lokale Galerieansicht. |
| 14 | 10 MB Uploadgrenze | Eingabe bis 50 MB; sequenziell höchstens 4’000 Pixel, JPEG zunächst 90 %, maximal 10 MB; kleine Dateien unverändert; einzelne Fehler wiederholbar. | Chromium: PNG 37’552’867 Bytes → JPEG 5’806’987 Bytes; PNG 105 Bytes unverändert; beschädigtes JPG bleibt als einziger Fehlversuch. |
| 15 | Nur Schnellzugriffe | Eigenes Mitgliedermenü mit Profil, Forum, Galerie, Bibliothek und eigenen Inseraten. | Chromium und Safari zeigen zusätzliche Navigation. |
| 16 | Finder-Abbruch schliesst Upload | Dialog reagiert nur auf seine eigenen Abbruchereignisse. | Safari: Finder „Abbrechen“ erhält Uploaddialog und eingegebenen Titel. |
| 17 | Wiederherstellen genehmigt | Archivierung merkt vorherigen Zustand; Wiederherstellung erhält ihn. Unbekannt → Prüfung, abgelehnt → Entwurf. | Regressionen bestanden; zusätzlich echtes WordPress-Archivieren/-Wiederherstellen für veröffentlicht, ausstehend, Entwurf und unbekannten Altstatus geprüft. |
| 18 | Dokument zweimal schliessen | PDF-Leser ersetzt die Detailansicht innerhalb eines Dialogs. Vollbild separat benannt. | Chromium: Schliessen führt direkt zurück zur Liste. |
| 19 | Archivdokument unlesbar | Geschützter Dateiaufruf akzeptiert berechtigte Archivzugriffe. | PHP: berechtigter Zugriff gestreamt, unberechtigter Zugriff abgewiesen. |
| 20 | Prüfmail ohne Aktionen | Dokument-Detailansicht bietet Freigabe/Ablehnung nach Berechtigung. Bestehendes Login-Ziel bleibt erhalten. | Chromium-Direktlink zeigt beide Aktionen. |
| 21 | Meine Inserate nicht auffindbar | Dauerhafter Marktplatzlink sowie Eintrag im Mitgliedermenü. | Chromium-Vorschau geprüft. |
| 22 | Inseratbestätigung fehlt | Statusbestätigung nach Speicherung; Fehlerwarnung bei gespeichertem Inserat; gespeicherte Anfrage-ID verhindert Doppelanlage. | Echte lokale WordPress-Speicherung und SMTP-Übertragung geprüft. Wiederholung liefert dieselbe ID ohne weitere Mail; Mailfehler erhält das gespeicherte Inserat und die Warnung. |
| 23 | Inserate-Workflow unklar | Öffentliche Sichtbarkeit, Prüfung und privater Entwurf erklärt; Moderation separat beschriftet. Teile weiterhin automatisch öffentlich, Fahrzeuge zunächst in Prüfung; bestehender Service bleibt. | Regressionen und reale lokale WordPress-Rollen geprüft: Gast, Eigentümer, anderes Mitglied, inaktives Mitglied und Moderator. Technische Administration erhält keine Clubdokumentrechte. |
| 24 | Einreichungen fehlen | Prüfliste ohne zusätzliche Kategorien-/Fahrzeugauswahl; eigene Beiträge über gesonderte Ansicht. Vorstand darf berechtigte Dokumente in der Prüfliste sehen. | Chromium zeigt Dokument in ungefilterter Prüfliste; serverseitige Dokumentklassen bleiben geschützt. |
| 25 | Dashboard-Inserat erst nach Retry | Fehlenden geschützten `get`-Aufruf ergänzt; Prüfmail für Inserate führt ebenfalls zur passenden Ansicht. | PHP-Regression bestanden; Chromium öffnet gültigen Direktlink ohne Retry. |
| 26 | Weitere Personen nur Gäste | Zusätzliche Personen und Begleitungen können Mitglieder/Gäste sein; bestehende Buchungsgrenzen erhalten. | 16 PHP-Tarifkombinationen für Treffen/Ausfahrt und normale/Weekend-Tarife bestanden. |
| 27 | Begleitmitglied suchen | Geschützte Namens-/Nummernsuche; kanonische Identität, aktiver Status und Doppelanmeldungen serverseitig geprüft. | Mobile Chromium-Prüfung mit realer lokaler WordPress-Sitzung übernimmt Mitglied 102. Zwei Mitglieder ergeben CHF 20.00 in der verbindlichkeitsfreien Prüfung. PHP lehnt falsche, inaktive und doppelte Mitglieder ab. |
| 28 | Prüfen und Schliessen verwechselt | Primäre Anmeldeaktion und separate sekundäre Schliessaktion mit Abstand. | Build und Quellprüfung; endgültiger Erfolg bleibt an verbindliches Speichern gebunden. |
| 29 | Falscher Zurück-Link | Rückkehrziel pro Event aus Agenda/Mitgliederübersicht; direkter Link standardmässig Agenda. | Chromium: Agenda-Aufruf zeigt „← Zur Agenda“. Reale lokale WordPress-Sitzung: Dashboard-Aufruf zeigt „← Mitgliederbereich“ und führt dorthin zurück. |
| 30 | Clubheft ohne Zoom | „Lesen und zoomen“ öffnet PDF-Leseansicht auf der entsprechenden Original-PDF-Seite. | Chromium: Magazinseite 2 → PDF-Seite 2; Zoom 100 % → 125 %. |
| 31 | Profil schwer erreichbar | Expliziter Profilbearbeitungslink und klickbarer Avatar; zusätzlich Mitgliedermenü. | Chromium bestätigt beide Links. |
| 32 | Vorgegebenes Resetpasswort | Automatische WordPress-Generierung vor der Initialisierung unterdrücken; bewusste Generierung bleibt möglich. Feld anfangs leer und verdeckt mit `new-password`; spätere Eingaben werden nicht beim Laden gelöscht. | Safari und Chromium mit WordPress 7.1.3: auch nach verzögertem Laden leer/verdeckt, leeres Speichern gesperrt. Fünf echte Reset-HTTP-Prüfungen und drei JavaScript-Regressionen für automatische/bewusste Generierung und simuliertes spätes Autofill bestanden. Kein echtes Clubkonto geändert. |
| 33 | Logo oben/unten verschieden | Gleiche Bildquelle, Wortmarkenschrift und Tagline; redaktionellen Footertext zusätzlich erhalten. | Quellprüfung; lokale Ansicht. |

## Tests

- TypeScript-Prüfung und ESLint ohne Fehler/Warnungen.
- Acht zusätzliche Migrationstests bestätigen Vorschau, Hashschutz, Sicherung, Erhalt fremder Felder, Wiederholbarkeit und Schutz gleichzeitiger Änderungen der Grossschreibung.
- 49 zusätzliche synthetische Backend-Prüfungen in `scripts/tests/baur-feedback.php` bestanden.
- Vorhandene PHPUnit-Tests: 79 Tests / 367 Assertions bestanden; weitere 10 Fairgate-Tests / 30 Assertions in jeweils eigener PHP-Instanz bestanden.
- Testlaufzeit: PHP 8.3.33 als lokale WebAssembly-Laufzeit. Separate native Unterprozesse werden dort nicht unterstützt; die zehn Fairgate-Tests wurden mit unveränderten Assertions einzeln isoliert ausgeführt. Die Prozessattribute wurden ausschliesslich in einer temporären Testkopie entfernt.
- Zehn geänderte/neue PHP-Dateien mit dem PHP-Parser syntaktisch geprüft.
- WordPress-Build und Prüfsummenabgleich des lokalen Release-Kandidaten bestanden.
- Drei zusätzliche JavaScript-Regressionen prüfen den korrigierten Reset mit später Initialisierung, bewusster Maus-/Tastaturaktivierung und simuliertem spätem Autofill.
- Zusätzlich 40 Prüfungen mit echtem WordPress 7.1.3, dem aktuellen Clubplugin und ausschliesslich synthetischen lokalen Konten bestanden. Darunter Speicherung, reale Rollen, Archivzustände, Wiederholungen, Mailfehler, Resetfunktionen und fünf Inhaltsmigrationsfälle.
- Weitere fünf HTTP-Prüfungen am tatsächlichen WordPress-Resetformular: HttpOnly-Token-Cookie, gültiger Formularaufruf, abweichender übermittelter Token, erfolgreiche Rücksetzung eines synthetischen Kontos und Schutz gegen Tokenwiederverwendung.
- SMTP wurde tatsächlich über eine lokale Verbindung angesprochen; alle Empfänger gehörten zur synthetischen Domain `example.invalid`. Keine externe Nachricht gesendet.
- Das lokale WordPress verwendet SQLite Database Integration 3.1.1. Für sequentielle Formularprüfungen wurde ausschliesslich in der lokalen Testumgebung ein Adapter für MySQL-Advisory-Locks verwendet. Damit ist keine MySQL-Parallelitätsprüfung nachgewiesen.
- Frühere Vorschauprüfungen mit simulierten API-Antworten bleiben als solche gekennzeichnet. Die ergänzten WordPress-Prüfungen ersetzen diese Simulation für die ausdrücklich genannten Fälle.
- Native Safari-Prüfung bestätigt Finder-Abbruch, Pflichtcheckboxen im vollständigen Antrag und leeren, verdeckten Reset nach vollständigem Laden.
- Chromium: Mitgliedermenü, Mitgliedersuche und Anmeldeprüfung mit realer lokaler WordPress-Sitzung geprüft. Event-Prüfansicht bei 320, 390, 768 und 1280 Pixeln ohne horizontalen Überlauf; mobile Mitgliederübersicht und Aufnahmeformular ebenfalls ohne Überlauf.
- Tastatur: sichtbarer Fokus in der mobilen Navigation; Inseratdialog fokussiert „Fenster schliessen“, Escape schliesst und gibt den Fokus an das auslösende Inserat zurück.
- Firefox wurde nach Nutzeranweisung ausgelassen.
- Autofill ist im JavaScript-Regressionstest simuliert. Ein gespeichertes Passwort aus Safari/Schlüsselbund oder einem externen Passwortmanager wurde nicht verwendet.

## Ergänzungen aus der Schlussprüfung

Die vollständige WordPress-Prüfung zeigte eine zweite automatische Passwortgenerierung: WordPress betätigt seinen Generierungsknopf beim Laden selbst, zusätzlich zur Initialisierung über `data-reveal`. Ein blosses Leeren bei `window.load` konnte deshalb später überschrieben werden. Die Korrektur läuft vor dem WordPress-Skript, unterdrückt dessen synthetischen Generierungsklick und erhält echte Maus-/Tastaturklicks sowie die normale Stärkerückmeldung. Es gibt kein nachträgliches Leeren bei `load` mehr.

Die Inhaltsmigration vergleicht den gespeicherten Ausgangsinhalt nun ausdrücklich binär. Damit kann die übliche MySQL-Sortierung keine zwischenzeitliche Änderung nur der Grossschreibung übersehen. Der Hilfetext für weitere Personen bei Treffen nennt Mitglieder und Gäste gleichermassen.

## Ergänzte Staging-Abnahme

Die lokalen Prüfungen und die inzwischen freigegebene Staging-Veröffentlichung sind abgeschlossen. Die ursprünglich offenen Nachweise haben folgenden Stand:

| Nachweis | Grenze |
|---|---|
| Externer Mailversand | Drei echte Testmails über den Webserver versendet und in Apple Mail empfangen. Alle im Spamordner; Posteingangszustellung bleibt offen. |
| MySQL/MariaDB unter Parallelzugriff | Echte Sperren, Zeitüberschreitung, Freigabe nach Ausnahme und konkurrierende Inseraterstellung auf Staging bestanden. |
| Gespeicherte Browserpasswörter | Leerer, verdeckter Anfangszustand auch auf Staging in Safari und Chromium geprüft. Echtes gespeichertes Passwort weiterhin nicht ausgewählt. |
| Redaktionelle Agenda auf dem Zielserver | Vorschau auf aktuellen Serverdaten ausgeführt: keine betroffenen Textfelder, keine Änderung erforderlich. |

Die verbleibenden Grenzen sind im separaten Staging-Abnahmebericht ausdrücklich aufgeführt. Staging wurde freigegeben und veröffentlicht; Produktion wurde nicht verändert.

## Schnittstellen und Kompatibilität

- Marktplatz: lesendes `get` mit ID und identischen Sichtbarkeitsgrenzen. Erstellen und Kontakt senden verwenden stabile `requestId`-Werte; Bestätigungswarnungen werden als erfolgreiche Speicherung/Zustellung mit zusätzlicher `warning` zurückgegeben.
- Eventanmeldung: lesende, nur aktiven Mitgliedern zugängliche Operation `members` mit Event-ID und Suchtext. Antwort enthält ausschliesslich Namensangaben und Mitgliedsnummer.
- `crews[].pilot` akzeptiert zusätzlich `type: member|guest` und `memberNumber`; ohne Typ bleibt eine bisherige Zusatzperson Gast. Mitgliederbegleitungen sind bei jeder Besatzung möglich. Gespeicherte Teilnehmerrollen bleiben mit Rechnungen und Listen kompatibel.
- Events: optionale Filter `months` (0, 12, 24) und `scope`; bisherige Clients behalten ihre Standardantworten.
- Galerie: optionale `optimized`-Kennzeichnung. Bestehende Dateien ohne Flag gelten weiterhin als ursprüngliche Uploadversion. Keine Migration bestehender Bilder, keine Änderung der Aufbewahrung.
- Dokumente: Metadatum `strc_pre_archive_status`; ältere Archive nutzen den vorhandenen WordPress-Archivstatus beziehungsweise den sicheren Prüfstatus.

## Inhaltskorrektur nach Freigabe

`scripts/apply-baur-agenda-copy.php` wird über WP-CLI ausgeführt und zeigt standardmässig nur die betroffenen Agenda-Felder sowie ihren aktuellen Hash. Es korrigiert ausschliesslich die zwei genannten Schreibfehler in vorhandenen deutschen Textfeldern von Entwurf/veröffentlichtem Inhalt. Eine Anwendung benötigt `STRC_APPLY_BAUR_CONTENT=1` und den zuvor geprüften `STRC_BAUR_CONTENT_HASH`. Vorheriger Optionsinhalt wird gesichert; gleichzeitige redaktionelle Änderungen werden durch Vergleich des gespeicherten Zustands erkannt. Auf Staging als Vorschau ausgeführt: keine betroffenen Textfelder; auf Produktion nicht ausgeführt.

## Veröffentlichung und Rückfall

Ausgangssicherung: `/tmp/trclub-baur-before-20261027.tar.gz` enthält die ursprünglichen Quellen, Tests und Dokumentation einschliesslich des bereits vorhandenen fremden Dokumentationsdeltas. Vor einer Serververöffentlichung zusätzlich den dann aktuellen vollständigen Server-/Datenbankstand sichern.

Erzeugte Programmdateien stehen im lokalen Theme-Build; der lokale Release-Kandidat enthält passende Prüfsummen. Der exakte Änderungsumfang wurde gemeinsam geprüft, Staging ausdrücklich freigegeben und am 28. Oktober veröffentlicht. Eine während der Serverabnahme gefundene Direktlink-Korrektur ist im Abnahmebericht dokumentiert. Produktion benötigt eine weitere ausdrückliche Freigabe. Alte Frontend-Chunks bleiben für bereits geöffnete Sitzungen verfügbar. Ein Rückfall darf fremde Änderungen und zwischenzeitlich erfasste Mitgliederdaten nicht überschreiben.

## Vollständiger Dateiänderungsumfang

32 Dateien gehören zu diesem Änderungspaket. Ausgangspunkt ist `e91899486f98bbb3f668242e5fb45fa5f12476bd`. Die 19 gesicherten geänderten Quelldateien entsprachen vor Arbeitsbeginn diesem Git-Stand. Die bereits fremd geänderte Datei `docs/deployment/peter-pr56-pr58-2026-10-27.md` ist ausdrücklich ausgeschlossen.

| Datei | Zustand | Änderung |
|---|---|---|
| `deployment/staging/release.manifest.json` | Geändert | Prüfsummen des lokalen Release-Kandidaten |
| `docs/deployment/baur-feedback-2026-10-27.md` | Neu | 33 Feedbackpunkte, Nachweise und Abnahmegrenzen |
| `frontend/app/components/AgendaPage.tsx` | Geändert | Vergangene Events und Zeitraumfilter |
| `frontend/app/components/Community.tsx` | Geändert | Dokumentdialoge, Moderation, Galerie und Downloads |
| `frontend/app/components/GalleryUpload.ts` | Neu | Sequenzielle Fotooptimierung vor dem Upload |
| `frontend/app/components/LandingIntroduction.tsx` | Geändert | Vergrösserbares Jahresprogrammbild |
| `frontend/app/components/MagazineReader.tsx` | Geändert | PDF-Seite, Zoom und Rückkehr |
| `frontend/app/components/Marketplace.tsx` | Geändert | Direktlinks, Sichtbarkeit, Quittungen und Dialogabbruch |
| `frontend/app/components/MemberDashboard.tsx` | Geändert | Mitgliedsnummer und Profilzugänge |
| `frontend/app/components/MembershipApplication.tsx` | Geändert | Geografische Regionen und Safari-Pflichtfelder |
| `frontend/app/components/RegistrationForm.tsx` | Geändert | Mitglied-/Gastpersonen und bestehende Anmeldungen |
| `frontend/app/components/RegistrationMemberSearch.tsx` | Neu | Geschützte Suche nach Name oder Mitgliedsnummer |
| `frontend/app/components/StrcFlipbook.tsx` | Geändert | Wechsel zum PDF-Leser auf richtiger Seite |
| `frontend/app/components/ZoomImage.tsx` | Neu | Vergrösserbarer Bilddialog |
| `frontend/app/components/ui-fr.json` | Geändert | Französische Übersetzungen der neuen Beschriftungen |
| `frontend/app/globals.css` | Geändert | Einheitliche Schrift, Fokus, Abstände und Formulare |
| `frontend/app/page.tsx` | Geändert | Mitgliedermenü, Event-Rückwege und einheitliche Wortmarke |
| `scripts/apply-baur-agenda-copy.php` | Neu | Gesicherte Inhaltskorrektur mit binärem Versionsvergleich |
| `scripts/tests/baur-agenda-migration.php` | Neu | Acht Regressionen der Inhaltsmigration |
| `scripts/tests/baur-feedback.php` | Neu | 49 Backend-Regressionen |
| `scripts/tests/baur-reset-password.cjs` | Neu | Drei Regressionen zur Passwortinitialisierung |
| `wordpress/wp-content/plugins/strc-core/src/Community/CommunityEndpoint.php` | Geändert | Archivzustände, Leserechte, Prüflisten und optimierte Bilder |
| `wordpress/wp-content/plugins/strc-core/src/Community/SubmissionNotifications.php` | Geändert | Passende Direktlinks aus Inserate-Prüfmails |
| `wordpress/wp-content/plugins/strc-core/src/Events/EventPublicEndpoint.php` | Geändert | Zeitraum, Bereich und paginierte Rückblicke |
| `wordpress/wp-content/plugins/strc-core/src/Forms/EventRegistration.php` | Geändert | Mitgliedersuche, Personenprüfung, Dubletten und Tarife |
| `wordpress/wp-content/plugins/strc-core/src/Integrations/Fairgate/FairgateApplications.php` | Geändert | Nur geografische Regionen im Aufnahmeformular |
| `wordpress/wp-content/plugins/strc-core/src/Marketplace/MarketplaceEndpoint.php` | Geändert | Geschütztes Lesen, Quittungen und wiederholbare Anfragen |
| `wordpress/wp-content/plugins/strc-core/src/Members/MemberLoginExperience.php` | Geändert | Leerer verdeckter Reset ohne spätere automatische Generierung |
| `wordpress/wp-content/themes/strc-app/build/MagazineReader-S9Ek31tr.js` | Neu | Aus den aktuellen Quellen erzeugte Website-Datei |
| `wordpress/wp-content/themes/strc-app/build/UILanguage-CMbyVmHt.js` | Neu | Aus den aktuellen Quellen erzeugte Website-Datei |
| `wordpress/wp-content/themes/strc-app/build/app.css` | Geändert | Aus den aktuellen Quellen erzeugte Website-Datei |
| `wordpress/wp-content/themes/strc-app/build/app.js` | Geändert | Aus den aktuellen Quellen erzeugte Website-Datei |

Der vollständige Diff einschliesslich erzeugter Dateien und aller neuen Dateien sowie ein lesbarer Quelldiff liegen im lokalen internen [Prüfpaket](../reviews/baur-feedback-2026-10-27/README.md). Das Prüfpaket enthält auch Dateiprüfsummen, Testergebnisse und Bildschirmnachweise. Es wird nicht veröffentlicht.

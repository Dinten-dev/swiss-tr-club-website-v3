# Shop, Community und Mailvorlagen: Integration von PR #71–#75

Stand: 30.10.2026. Ausgangspunkt: `main` bei `acaf47ffb921593b4d924f47a10eb1313cc304cb`.
Arbeitszweig: `integration/editorial-pr75`. Lokal vorbereitet; keine Veröffentlichung.

## Peters Änderungen

| PR | Im Integrationsstand enthalten |
|---|---|
| [#71](https://github.com/Dinten-dev/swiss-tr-club-website-v3/pull/71) | Shopartikel auf der Website bearbeiten, Varianten und Bilder pflegen, Rechnungs-PDFs über Shopverwaltung/Kasse, Profilbild im Dashboard. |
| [#72](https://github.com/Dinten-dev/swiss-tr-club-website-v3/pull/72) | Vorstandsunterlagen erfordern die tatsächliche Vorstandsrolle. Admin-/Superadmin-Rechte allein ersetzen diese nicht. Pflege erfordert zusätzlich passende Bearbeitungsrechte. |
| [#73](https://github.com/Dinten-dev/swiss-tr-club-website-v3/pull/73) | Rückweg mit Scrollposition, anklickbare Forumsadressen, beschriftete Linkfunktion, einklappbare Forumshilfe, übersichtlicheres Teilegesuch, Schliessen nach Dokumentfreigabe; endgültiges Löschen archivierter Vorstandsunterlagen mit Vorstand plus Bibliotheksverwaltung und Löschprotokoll. |
| [#74](https://github.com/Dinten-dev/swiss-tr-club-website-v3/pull/74) | Vereinfachte Galerie-Downloads, klarere Original-ZIP-Aktion, Startseitenauswahl direkt am Bild, zuletzt ausgewählte öffentliche Bilder zuerst, aufgeräumte Mitgliedernavigation, vorausgewählte verknüpfte Begleitung und klarere Mitgliedersuche; neue Anmeldungen mit eigener Besatzung und höchstens einer zusätzlichen Gastbesatzung. |
| [#75](https://github.com/Dinten-dev/swiss-tr-club-website-v3/pull/75) | Zentral bearbeitbare deutsche/französische Mailvorlagen, Vorschau, Testmail an die eigene Adresse, Versandprotokoll, gemeinsames Maildesign und Anbindung der Club- und WooCommerce-Mails. |

Die PRs bilden einen kumulativen Stapel. Der Stand von #75 enthält #71–#74; die Integration übernimmt diese Änderungen einmalig. Die fünf Quellstände wurden nach der Bearbeitung nochmals gegen GitHub geprüft und waren unverändert.

## Anmeldungen, Dokumentrechte und erhaltene Vorgaben

- Neue Anmeldungen: eigenes Mitglied mit optionaler Begleitung (Mitglied oder Gast), dazu höchstens eine Gast-Buchung mit optionaler Gastbegleitung. Der Organisator kann zusätzliche Gast-Buchungen ausschalten. Eine frühere Einstellung «2» wirkt für neue Anmeldungen als «1». Gäste sollen ihre Teilnahme mit der Veranstaltungsleitung abstimmen; die Oberfläche behauptet keine nicht vorhandene separate Genehmigungsstufe.
- Vorstandsunterlagen: endgültiges Löschen nur aus dem Archiv, mit tatsächlicher Vorstandsrolle **und** Bibliotheksverwaltung. Admin-/Superadmin allein ersetzen die Vorstandsrolle nicht. Die bestehende ausdrückliche Bestätigung im Formular bleibt erhalten.
- Das bestehende 16-MB-Limit für Magazin-Originalbilder bleibt erhalten.
- Bestehende Farben bleiben erhalten; es erfolgt kein allgemeiner Farbumbau.
- Eine bereits vorhandene, sachfremde Dokumentänderung wurde unverändert erhalten und nicht in die Integration aufgenommen.

Die frühere Rückstellung dieser beiden Regeln ist mit dem erneuten Auftrag zur vollständigen Integration aufgehoben. Die Umsetzung übernimmt Peters fachliche Vorgaben und ergänzt Schutz für bestehende Daten und fehlgeschlagene Speichervorgänge.

## Zusätzliche technische Korrekturen

- **Altanmeldungen:** vorhandene zusätzliche Mitglieder und weitere Besatzungen bleiben beim Bearbeiten erhalten. Identitäten bestehender zusätzlicher Mitglieder sind im Formular schreibgeschützt. Entfernte vorhergehende Buchungen verschieben keine Mitgliedszuordnung; Essensauswahlen bleiben ebenfalls an die jeweilige Person gebunden. Gespeicherte Besatzungsreferenzen werden serverseitig gegen die bereits authentifizierte, passende Anmeldung geprüft. Fremde, abgemeldete oder veranstaltungsfremde Anmeldungen sowie erfundene oder doppelte Referenzen geben keine Ausnahme. Mitglieder lassen sich nicht durch andere Mitgliedsidentitäten ersetzen. Mitgliedsstatus, Tarife, Doppelanmeldungen, Kapazität, Fahrzeuge und Zimmer werden weiterhin serverseitig geprüft.
- **Vorstandslöschung:** eine Dokumentrevision bindet die Bestätigung an Titel, Inhalt, Status, Dokumentart, Zugriffszuordnung und Dateien. Dokumentaktionen und Protokollschreibvorgänge werden serialisiert. Vor jeder endgültigen Löschung muss ein Protokolleintrag mit Dokument, ausführender Person und Zeit gespeichert und zurückgelesen werden; scheitert dies, bleibt das Dokument erhalten. Scheitert die Löschung oder deren Abschlussprotokoll, bleibt der Versuch nachweisbar und der Zustand sichtbar. Physisch entfernte Dateien werden dadurch nicht als wiederherstellbar dargestellt. Aufbewahrung: maximal 200 Protokolleinträge, letzte 50 im Vorstandsarchiv sichtbar; keine Dokumentinhalte im Protokoll.

- **Artikelspeicherung:** alle Varianten, Einstandspreise und bereinigten Grössen vor dem ersten Speichern prüfen. Doppelte Varianten-IDs und nach Bereinigung gleiche Grössen ablehnen. Sämtliche neuen Bilder werden vor den Artikeländerungen verarbeitet.
- **Gleichzeitige Bearbeitung:** Artikelrevision prüfen, relevante Datenbankzeilen sperren und unmittelbar vor dem Speichern erneut lesen. Artikel und Varianten werden innerhalb einer geprüften Transaktion geändert; Start-/Commitfehler und spätere Variantenfehler brechen sicher ab.
- **WooCommerce-Kompatibilität:** vorhandene Zusatzattribute, private Prüfstände und bestehende Variantenstatus erhalten. Produkte mit anderen oder mehreren Variantenattributen beziehungsweise gemeinsamem Variantenbestand werden nicht stillschweigend in Grössenartikel umgewandelt; für diese bleibt WooCommerce zuständig.
- **Rechnungen:** Download erst bei vorhandenem, prüfbarem Archiv-PDF anbieten. Fehlgeschlagener Mailversand bleibt sichtbar und kann mit demselben PDF wiederholt werden. Bereits als versendet gespeicherte Rechnungen werden dabei nicht erneut verschickt. Interne Pfade erscheinen nicht in Fehlermeldungen.
- **Mailvorlagen:** Revisionen und atomarer Vergleich beim Speichern verhindern das Überschreiben gleichzeitiger Änderungen. Änderungen verschiedener Vorlagen bleiben erhalten. Ungültige/unvollständige Platzhalter werden abgelehnt; Vorschauen erfordern ebenfalls POST und Nonce.
- **Mailbedienung:** Eingaben bleiben bei Konflikten erhalten. Während einer Anfrage ist das Formular gesperrt; interne Vorlagen-/Protokollwechsel und das Schliessen des Browserdokuments warnen vor ungespeicherten Eingaben. Das Zurücksetzen von Texten schaltet einen aktivierten Willkommensmail-Versand nicht aus.
- **Maildesign:** die konkrete WooCommerce-Nachricht wird erkannt, statt zeitweise die nächste beliebige Mail auszunehmen. Wiederverwendete Mailer übernehmen keine Textfassung einer früheren Nachricht. Grundlage ist der offizielle [WooCommerce-Mailablauf](https://woocommerce.github.io/code-reference/files/woocommerce-includes-emails-class-wc-email.html).
- **Versandprotokoll:** konkurrierende Schreibvorgänge werden serialisiert; Aufbewahrung bleibt 90 Tage, maximal 3’000 Einträge. Transportfehler werden ohne Nachrichteninhalt oder Zugangsdaten protokolliert. Ein Protokollfehler darf einen erfolgreichen Versand nicht als fehlgeschlagen erscheinen lassen. „Vom Maildienst angenommen“ bedeutet keine Zustellbestätigung.
- **Rückweg:** tatsächliche Browser-Historieneinträge unterscheiden Zurück, Vorwärts und neue Links auf früher besuchte Seiten. Neue Navigation oder Benutzereingaben stoppen verzögerte Scrollkorrekturen. Interne URL-Ersetzungen erhalten den Verlauf und fremde History-Daten.
- **Galerie:** ältere öffentliche Bilder ohne Auswahlzeitpunkt werden nach dem Albumdatum eingeordnet. Sie verdrängen keine frisch ausgewählten Bilder durch eine fehlerhafte Zeichenfolgensortierung. Ausgeblendete Bilder bleiben ausgeschlossen.

## Prüfungen

| Prüfung | Ergebnis / Grenze |
|---|---|
| ESLint und TypeScript | Erfolgreich. |
| JavaScript-Verhaltenstests | 32 erfolgreich: Passwort-Reset, Fotoupload, Agenda-Slider, Rückweg, Maileditor und Anmeldebedienung. Die fünf neuen Anmeldetests sind auch im GitHub-Workflow eingebunden. |
| Isolierte PHP-Regressionen | 255 erfolgreich: 65 Sicherheitsgrenzen, 86 Baur-/Anmeldeprüfungen, 51 Dokument-/Galerieprüfungen, 31 Mailvorlagen, 22 Shop-/Rechnungsprüfungen. Keine echten Mails oder Mitgliederdaten. |
| PHPUnit | 93 Tests, 403 Assertions erfolgreich mit lokalem PHP 8.3.33 über WebAssembly. 92 Tests regulär; der Test mit Prozessisolierung wurde in einem separaten lokalen Prozess ausgeführt. Die eigentliche CI-Konfiguration bleibt unverändert prozessisoliert. |
| PHP-Syntax | 147 PHP-Dateien erfolgreich geprüft. |
| Anwendungsbuild und WordPress-Build | Erfolgreich. Bekannte Hinweise zu Chunkgrösse und statischer Routenerkennung bleiben bestehen. |
| Struktur und Patchformat | Erfolgreich. |
| Safari, lokale synthetische Oberfläche | Privater Artikelstatus erhalten; Variantenformular ergänzbar; Escape schliesst den Dialog. Mailformular sichtbar; Verlassen warnt; Abbrechen erhält den Entwurf; Speichern bestätigt. Zusätzlich Altanmeldung mit zwei zusätzlichen Besatzungen geöffnet; frühere Gastbuchung entfernt, bestehende Mitgliedszuordnungen und Hinweise erhalten. Vorstandsarchiv zeigt Wiederherstellen, Löschbestätigung und Protokollzustände. Testtab danach geschlossen. |
| In-App-Browser, lokale Oberfläche | Mailübersicht und Formular sichtbar. Der anschliessende native Bestätigungsdialog blockierte die Browsersteuerung; keine vollständige Chromium-Abnahme behauptet. |
| Firefox | Nicht verwendet. |
| Native GitHub-CI | Für diesen lokalen Integrationszweig noch nicht gestartet. |
| Reale WooCommerce-/Datenbank-/Rollenabnahme | Nach Review und Freigabe auf Staging erforderlich; lokale Testdoubles ersetzen diese nicht. |
| Mobilansicht und vollständige Tastatur-/Fokusprüfung | Noch offen. |

## Nächste Veröffentlichung

Quellcode und erzeugte Website-Dateien sind gemeinsam vorbereitet; das Release-Manifest ist als `candidate` gekennzeichnet. Main, Staging und Produktion wurden nicht verändert. Vor einer Veröffentlichung: den Integrationsdiff gemeinsam prüfen, native GitHub-Checks ausführen und Staging separat freigeben. Die erneute Umsetzung hat lokal stattgefunden; der zwischenzeitliche Stopp wurde nicht als neue Deployment-Freigabe ausgelegt. Vor einem Staging-Upload sind der dann aktuelle Serverstand, Datenbank und externe private Dateiablagen neu zu sichern. Der Deployment-Helfer kann den lokalen Kandidaten mit `--dry-run` ohne Serververbindung prüfen. Sein Empfängerschutz berücksichtigt sowohl die frühere feste Adresse als auch den bereits vorhandenen dynamischen Adressresolver, dessen unveränderter Quelltext kontrolliert wird. Die synthetische Staging-Rollenprüfung wurde um Löschrechte und Löschprotokoll erweitert; diese Erweiterung wurde noch nicht auf dem Server ausgeführt.

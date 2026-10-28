# Peter und Baur: kombinierte Änderungen vor Staging

Historischer Prüfstand vor Freigabe: 28.10.2026. Die nachfolgenden Tabellen dokumentieren den damals besprochenen Kandidaten.

**Nachtrag nach ausdrücklicher Freigabe:** Das kombinierte Paket wurde auf Staging veröffentlicht. Auf Peters und deine Klarstellung hin bleiben passende Magazin-Originale bis 16 MB unverändert; grössere Eingaben werden weiterhin automatisch optimiert. Die bestehenden vier Monate mit Aufbewahrungsausnahme bleiben erhalten; lediglich der abweichende Oberflächentext wurde berichtigt. Der endgültige Stand umfasst 460 Dateien. Sicherung, aktuelle Grenztests, Benutzerrechte und offene Abnahmegrenzen stehen im [Veröffentlichungsprotokoll](peter-baur-staging-2026-10-28.md). Die unten genannten 10 MB, 458 Dateien und Freigabegrenzen beschreiben ausschliesslich den vorherigen Kandidaten.

„Deine Änderungen“ bezeichnet hier dein freigegebenes Baur-Paket einschließlich der bisherigen Umsetzung und Staging-Korrektur. Es bedeutet nicht, dass jede ursprüngliche Rückmeldung von dir stammt. Mehrere Punkte wurden sowohl von Baur als auch von Peter gemeldet.

## Was von Peter kommt

| Ergänzung | Herkunft | Jetzt umgesetzt |
|---|---|---|
| Klarerer Dashboard-Kopf | PR 60, 61, 63 | Grössere Begrüssung; Mitgliedschaft, Mitgliedsnummer und Profilaktion zusammen. Mobil untereinander. |
| Verständliche Mitgliedschaftsbezeichnung | PR 60 | Clubbezeichnung statt Fairgate-Rohtext; übersetzt. |
| Aktueller Mitteilungsstatus | PR 60 | Pro Einreichung nur die neueste Mitteilung; aktueller Prüfstatus. Offene Galeriefotos bleiben Prüfaufgaben. |
| Fahrzeugvorschau | PR 63 | Fahrzeugplakette öffnet ein Bild; Bedienung per Maus, Tippen und Tastatur. |
| Bildausschnitt | PR 63 | 16:9-Ausschnitt im Fahrzeugformular; Ziehen und Pfeiltasten. Darstellung in Profil, Mitgliederliste und Dashboard. Server validiert Koordinaten. |
| Französische Korrekturen | PR 62, Ergänzungen 60–64 | Sprachkorrekturen in Wörterbuch, JSON und betroffenen Komponenten. Bestehende gleichwertige Übersetzungen bleiben bei Überschneidungen erhalten. Redaktionelle Seiteninhalte werden nicht überschrieben. |
| Galerie-Kacheln | PR 64 | Vier Kategorien mit Anzahl veröffentlichter Alben; anschliessend Kategorie öffnen. Ladefehler bleiben sichtbar und wiederholbar. |
| Einfachere Bildauswahl | PR 64 | Auswahlkästchen direkt an Vorschaubildern. Einzelbild und Bildauswahl getrennt; keine zweite Download-Bildreihe. |
| Fotografennennung | PR 64 | Album nennt Beitragende sichtbarer, freigegebener Bilder; Grossansicht nennt Fotograf/in. |
| Längerer Albumtext | PR 64 | Bis 800 Zeichen mit Zähler, auch serverseitig geprüft. |
| Porträt aus Mitgliederprofil | PR 64 | Geschützte Redaktionssuche übernimmt Name, Ort, Region und Fahrzeugdaten. Fahrzeugbild wird unabhängig kopiert; eigenes Bild bleibt möglich. Einwilligungsabfrage bleibt. |
| Porträtfilter | PR 64 | Region und Fahrzeugmodell; längster passender Modellname gewinnt, beispielsweise TR6 PI vor TR6. |
| Vorstandsrubriken | PR 63 | Acht zusätzliche geschützte Rubriken. Bestehende Kategorien und Zuordnungen bleiben bestehen. |
| Vorstand-Archiv | PR 63 | Berechtigte Vorstandsmitglieder finden auch archivierte Unterlagen anderer Autoren. |
| Magazin/Newsletter | PR 63 | Kein zusätzliches Archivieren dieser bereits als Archiv geführten Publikationen. |
| Erkennung abgebrochener Bilddateien | PR 63 | Zusätzliche JPEG-/PNG-Endmarken- und WebP-Längenprüfung. Vorhandene Format- und Grössenprüfung bleibt. |

Die acht neuen Vorstandsrubriken: Vorstandssitzungen, Jahresplan, Finanzen, Generalversammlung, Medien, Clubadministration, Verträge und Entwurfsbox. Alle bleiben `restricted`. „Intern“ und „Vertraulich“ bleiben für bisherige Dokumente verfügbar.

## Was aus deinem freigegebenen Paket erhalten bleibt

| Bereich | Erhaltene Umsetzung |
|---|---|
| Mitgliedsantrag | TRiungsters nur als Mitgliedschaft; geografische Regionsprüfung in Frontend und Backend. Bereits geprüfte Safari-Validierung bleibt. |
| Foto-Upload | JPG, PNG, WebP; Albumauswahl bis 1’000 Bilder, Eingabe bis 50 MB je Bild, Verkleinerung auf höchstens 4’000 Pixel und 10 MB. Keine 2-MB-Mindestgrösse. Kleinere passende Bilder unverändert. |
| Upload-Fortschritt | Sequenzielle Verarbeitung, einzelne Fehler und gezieltes Wiederholen. Optimierte Uploadversionen ausdrücklich gekennzeichnet. |
| Fotos aufbewahren | Bestehende Originale und Aufbewahrungsoption bleiben. Keine Verkürzung auf vier Monate ohne Ausnahme. |
| Galeriefreigabe | Neue Mitgliederfotos bleiben zunächst in Prüfung. Bestehende wartende Bilder werden nicht automatisch freigegeben. |
| Eventanmeldung | Weitere Personen und Begleitungen jeweils Mitglied oder Gast; geschützte Namens-/Mitgliedsnummernsuche, Serverprüfung, Dublettenprüfung, Tarife und Altanmeldungen. Fahrzeug-, Zimmer- und Teilnehmerregeln bleiben. |
| Inserate | Direkter Detailaufruf, Rechteprüfung, ungefilterte Ersatzteilliste und dauerhaft auffindbare eigene Inserate. Auch Wechsel zwischen zwei eigenen Inseraten funktioniert. |
| Bestätigungsmails | Je eine Bestätigung bei Erstellung und Kontakt. Sichtbare Versandfehler; Wiederholen erzeugt keine doppelten Inserate oder Nachrichten. Gäste erhalten weiterhin eine Kontaktbestätigung. |
| Dokumentenarchiv | Vorherigen Status exakt wiederherstellen; unbekannt bedeutet Prüfung, abgelehnt bleibt Entwurf. Berechtigte Archivzugriffe bleiben. |
| Dokumentenprüfung | Direktlinks mit Aktionen, erhaltenes Anmeldeziel und gemeinsame Leseansicht. Schliessen führt zur Übersicht. |
| Dateiauswahl | Abbrechen im Finder schliesst den Uploaddialog nicht; Eingaben bleiben erhalten. |
| Navigation | Mitgliedermenü, Profilaktion, eigene Beiträge und Inserate sowie nachvollziehbare Event-Rückkehr. |
| Agenda | Vergrösserbares Jahresprogramm; zwölf Monate Rückblick, Zeitraumwahl und Nachladen. |
| Passwort-Reset | Websiteeigene Vorbelegung entfernt; Feld leer und verdeckt. Token- und Stärkeprüfung bleiben. |
| Gestaltung | Bestehende Farben bleiben; serifenlose Inhaltsschrift und übereinstimmende Wortmarke in Kopf/Fuss. Kein allgemeiner Farbumbau. |

Der eigene Bild-Upload im redaktionellen Porträtformular bleibt wie zuvor auf 20 MB begrenzt; die 50-MB-Optimierung betrifft den Album-Fotoupload.

## Bewusst kombiniert

| Bereich | Entscheidung aus Software- und Nutzersicht |
|---|---|
| Mails | Peters DE/FR-Text und bereinigte UTF-8-/Absender-/Reply-To-Header, aber nur ein Versandpfad mit deinen Fehler- und Wiederholungsschutzfunktionen. Bei angemeldeten Anfragenden geht die Bestätigung an die Konto-Adresse; bei Gästen an die angegebene Adresse. |
| Clubheft | Peters 100–300-%-Zoom in der Blätteransicht zusätzlich zu deiner PDF-Leseansicht. Die aktuelle Blätterseite führt weiterhin zur richtigen physischen PDF-Seite. |
| Event-Rückkehr | Deine pro Event gespeicherte Herkunft zusätzlich um Startseite und Regionen erweitert. Direkte Links ohne Herkunft führen zur Agenda. |
| Fotoeinstellungen | Einstellungen aufklappbar; Webdownload getrennt von verfügbaren Uploaddateien. Optimierte Dateien werden nicht als unveränderte Kameraoriginale bezeichnet. Aufbewahrung und öffentliche Auswahl bleiben einstellbar. |
| Beschriftung | Einmalige Anzeige; separates Öffnen der Bearbeitung. Bildwechsel beendet die Bearbeitung der vorherigen Beschriftung. |
| Vorstandsrubriken | Neue Rubriken werden beim Lesen ergänzt. Keine automatische Umklassifizierung vorhandener Dokumente oder Überschreibung gespeicherter Katalogeinstellungen. |
| Porträtfilter | Bestehende Porträts erhalten ausschliesslich abgeleitete Modell-/Regionsindizes, höchstens 100 pro Durchlauf. Bilder, Inhalte, Freigaben und Zugriffsklassen bleiben gleich. |

## Bewusst nicht übernommen

| Vorschlag aus Peters PRs | Grund |
|---|---|
| Alle Galeriefotos sofort veröffentlichen und wartende Fotos nachträglich freigeben | Widerspricht deinem geprüften Freigabeablauf. |
| Originale nach vier Monaten ohne Aufbewahrungsausnahme löschen | Würde bestehende Aufbewahrungsentscheidungen übergehen. |
| 2-MB-Mindestgrösse, 16-MB-Eingabegrenze und 20er-Auswahl | Deine automatische Optimierung ist für Nutzer einfacher und leistungsfähiger. |
| Bestehende Webfassungen automatisch neu rechnen und ersetzen | Zusätzliche Bestandsverarbeitung ist für die Bedienungsverbesserungen nicht erforderlich. Bestehende Webfassungen bleiben. |
| Dokumente endgültig löschen | Das wiederherstellbare Archiv bleibt der vorgesehene Weg. Bestehende Forum-/Porträtfunktionen wurden dadurch nicht erweitert. |
| Alte Vorstandsdokumente automatisch anderen Rubriken zuordnen | Bestehende Zuordnungen bleiben nachvollziehbar. Neue Rubriken stehen zusätzlich bereit. |
| Automatisch wechselnder Einstiegs-/Leitbildtext | Stabile Texte sind besser lesbar; vorhandener Einstieg und Leitbild bleiben. |
| Eigenständige zweite Safari-Formularvalidierung | Deine bereits native geprüfte Lösung bleibt; kein paralleler Validierungsweg. |
| Nur eingeloggten Kontaktanfragenden Bestätigung senden | Deine zugesagte Gastbestätigung bleibt erhalten. |

Die PRs werden deshalb **nicht pauschal gemergt**. PR 63 enthält bereits 60–62; PR 64 baut darauf auf. Die ausgewählten Änderungen wurden gegen deinen lokalen, auf Staging veröffentlichten Stand integriert. GitHub-Merge-Fähigkeit allein hätte die lokalen Überschneidungen nicht abgesichert.

## Was geprüft wurde

| Prüfung | Ergebnis |
|---|---|
| Vollständiger Frontend-Lint und Typprüfung | Bestanden |
| WordPress-Build und Prüfsummen | Bestanden; vollständiger Kandidat 458 Dateien |
| PHP-Syntax | 15 geänderte/neue PHP-Dateien bestanden |
| Bestehende PHP-Tests plus Bildprüfung | 83 Tests / 373 Assertions bestanden |
| Fairgate-Tests | Weitere 10 Tests / 30 Assertions, jeweils frische isolierte PHP-Instanz |
| Baur-/Kombinationsregressionen | 58 Prüfungen bestanden, einschliesslich Konto-/Gastbestätigung, Header, FR-Mail und Archivschutz |
| Agenda-Inhaltsmigration | 8 Prüfungen bestanden |
| Passwort-Reset | 3 Prüfungen bestanden |
| Isoliertes echtes WordPress | 24 Prüfungen: Rechte, Altbestände, Foto-Prüfstatus, Aufbewahrung, Rubriken, Archiv, Mitteilungen, Bildausschnitt und Porträtindex |
| Echtes WordPress mit lokalem SMTP | 21 Prüfungen: Erstellung, Inseraterechte, Ersatzteile, Bestätigungen, Versandfehler und Wiederholungen |
| Chromium | Dashboard/Fahrzeugvorschau, Galerieauswahl, Uploadversionen, Beschriftung, Porträtsuche/-übernahme, Ausschnitt per Pfeiltaste, beide Zoomansichten, PDF-Seitenzuordnung, Event-Rückkehr, FR-Oberfläche |
| Mobile Chromium-Ansicht | 390 × 844; kein horizontaler Überlauf |
| Native Safari | Galerieauswahl zählt korrekt; Fotoeinstellungen per Tastatur erreichbar; Blätterzoom auf 150 % |
| Browsermeldungen | Keine erfassten Warnungen oder Fehler im geprüften Chromium-Tab |
| Fremde Änderungen | Vorhandenes Dokument `peter-pr56-pr58-2026-10-27.md` bytegleich erhalten |

Kein Firefox verwendet. PHP läuft lokal als vorhandene PHP-8.3.33-WebAssembly-Laufzeit. Lokales WordPress verwendet SQLite; echte konkurrierende MariaDB-Sperren werden dadurch nicht erneut belegt. Der frühere Staging-Nachweis gilt für das bisher veröffentlichte Paket. Das kombinierte Paket benötigt eine eigene Staging-Abnahme.

Die Browseransichten verwenden synthetische lokale Beispieldaten. Die zusätzlichen 24 bzw. 21 Integrationsprüfungen verwenden echtes lokales WordPress und ein ausschliesslich lokales Testpostfach. Es wurden für diese Integration keine externen Testmails versendet.

## Wie das Paket nach deiner Freigabe auf Staging kommt

1. Ausschliesslich `staging.swisstrclub.ch` prüfen. Aktuellen Serverstand erneut mit dem zuletzt veröffentlichten Manifest vergleichen. Zwischenzeitliche Änderungen zuerst abgleichen; keine stillen Überschreibungen.
2. **Aktuelle vollständige Datei- und Datenbanksicherung** inklusive Konfiguration ausserhalb des öffentlichen Webverzeichnisses anlegen. Prüfsummen und Lesbarkeit bestätigen. Zusätzlich die 13 betroffenen Ziele samt bisherigem Vorhandensein für einen gezielten Rückfall sichern.
3. Genau das hier geprüfte Paket übertragen. PHP-Erweiterungen und neue Build-Teile zuerst, anschliessend `app.js`/`app.css`; Austausch jeweils über temporäre Datei und Umbenennen. Alte veröffentlichte Build-Teile bleiben für offene Tabs erhalten.
4. Alle 458 Kandidatdateien gegen das Manifest prüfen. Keine Uploadverzeichnisse, Mitgliederdaten, Passwörter oder Serverkonfiguration ersetzen. Keine PRs ungeprüft nachladen.
5. Die rein abgeleiteten Porträtindizes kontrollieren. Vorhandene Foto-Prüfstatus, Aufbewahrung und Dokumentklassifikation davor/danach vergleichen.
6. Staging mit Safari und Chromium prüfen: Berechtigungen, Galerieauswahl/-upload, grosse/kleine/beschädigte Bilder, Porträt-/Fahrzeugbilder, Vorstandsrubriken/-archiv, PDF-Zoom, direkte Inserate, Event-Mitglied/Gast-Kombinationen und Wiederholungen. Echte MariaDB-Sperren erneut prüfen.
7. Erlaubte Testmails ausschliesslich an `traver.dinten@outlook.com`; Apple Mail zur Empfangskontrolle. Versandfehler separat abfangen. Beim bisherigen Paket landeten die Testmails im Spam; Posteingangszustellung ist weiterhin nicht bewiesen.
8. Ergebnis und genaue Rückfallpfade dokumentieren. Bei Fehlern die betroffenen Dateien zurücksetzen; laufende redaktionelle Änderungen nicht durch pauschales Datenbank-Zurückspielen verlieren. Abgeleitete Indizes können bestehen bleiben, da der alte Code sie ignoriert. Nach Rückfall offene Tabs neu laden.

**Freigabegrenze:** Noch kein Upload dieses kombinierten Pakets. Keine Produktion und kein GitHub-Merge ausgeführt.

## Paket und vollständiger Vergleich

- [Dateiliste und Prüfsummen](../reviews/peter-baur-2026-10-28/release-plan.json)
- [Zusätzlicher Quellcodevergleich gegenüber deinem freigegebenen Stand](../reviews/peter-baur-2026-10-28/integration.patch)
- [Dashboard-Vorschau](../reviews/peter-baur-2026-10-28/dashboard-desktop.png)
- [Mobile Vorschau](../reviews/peter-baur-2026-10-28/dashboard-mobile.png)
- [Album-Vorschau](../reviews/peter-baur-2026-10-28/album-desktop.png)

Das Übertragungspaket liegt lokal in `.private/peter-baur-integration-20261028/staging-candidate.tar.gz`. SHA-256: `b37f83960ad2d5666df971fb20fd3335f7e3fc988248d58a20869d5ad2f8d8da`.

13 Serverdateien unterscheiden sich gegenüber dem veröffentlichten 455-Dateien-Stand: sieben PHP-Funktionsdateien, eine neue PHP-Testdatei, Shop-Fusszeile, CSS, Haupt-JavaScript und zwei Build-Teile. Keine Löschungen. Der vollständige Kandidat umfasst 458 Dateien. Der zusätzliche Quellcodevergleich umfasst 23 Dateien; deine bereits veröffentlichten übrigen Änderungen bleiben enthalten.

Geprüfte PR-Stände:

| PR | Unveränderlicher Stand |
|---|---|
| [60](https://github.com/Dinten-dev/swiss-tr-club-website-v3/pull/60) | `afdec06b6084814c7b17ec9b1ec791145816b938` |
| [61](https://github.com/Dinten-dev/swiss-tr-club-website-v3/pull/61) | `ba68a32d736ef21f14321a554a864b477a0fb36e` |
| [62](https://github.com/Dinten-dev/swiss-tr-club-website-v3/pull/62) | `cb24f17bdc30fc43bafe8871f9058cae6dd9bf16` |
| [63](https://github.com/Dinten-dev/swiss-tr-club-website-v3/pull/63) | `fd5decdeae2f79e9985acc56732235339cb7e608` |
| [64](https://github.com/Dinten-dev/swiss-tr-club-website-v3/pull/64) | `28ee12a446f0b9d2034997b7130e9c96cb2e05df` |

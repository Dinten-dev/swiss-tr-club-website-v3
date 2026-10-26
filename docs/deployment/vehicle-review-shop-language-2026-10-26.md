# Fahrzeugprüfung und Sprache der Shop-Mails, 26.10.2026

## Fahrzeugprüfung

Die aktuelle, lesend abgerufene Fairgate-Antwort enthält alle eingerichteten Fahrzeugfelder. Von 27 bisherigen Prüffällen sind fünf anhand ausdrücklicher Modellangaben eindeutig importierbar. Eine weitere Position ist eine Dublette mit identischer Chassisnummer im selben Haushalt. Zwei Positionen enthalten nur Platzhalter beziehungsweise das gemeinsame Kennzeichen. Sie erzeugen keine zusätzlichen Fahrzeuge.

Zwölf Positionen benötigen einen vom Mitglied/Peter bestätigten Fahrzeugtyp. Sieben weitere betreffen andere Fabrikate und bleiben ausserhalb des Triumph-Katalogs. Keine Typableitung allein aus Jahrgang, Chassisnummer oder ähnlichen Fahrzeugen desselben Mitglieds.

Die Vorschau mit unverändertem Datenbestand ergibt: 305 bereits importierte Fahrzeuge, fünf Ergänzungen, vier Übereinstimmungen (einschliesslich der neu erkannten Dublette), 19 weiterhin gelistete Prüffälle und zwölf «kein TR»-Vermerke. Ein auf explizit geprüfte Quellen begrenzter Import ergänzt ausschliesslich Fahrzeuge; er verändert keine bisherigen Fahrzeuge, Bilder oder Mitgliedermetadaten. Fairgate selbst bleibt unverändert. Personenbezogene Einzelfälle und Korrekturanweisungen liegen ausschliesslich im privaten Prüfbericht.

## Sprache der Kundenmails

Sprachreihenfolge: Bestellsnapshot, offizielle Mitgliedersprache aus Fairgate, verifizierte Haushaltsregion (Suisse Romande: Französisch; andere Clubregionen: Deutsch), gespeicherte Benutzerpräferenz und Benutzer-Locale. Nicht zugeordnete Gäste übernehmen beim Checkout die gewählte Website-Sprache; Standard ist Deutsch.

Klassischer Checkout und Store API speichern die ermittelte Sprache ausschliesslich auf der neuen Bestellung. Bestehende Bestellungen werden nicht nachträglich verändert. Bestellbestätigung, Bearbeitung, Abschluss, manuell versandte Bestelldetails, eigene Shop-Rechnung samt PDF sowie Versandbestätigung verwenden diese Sprache. Redaktionell konfigurierte Zusatztexte bleiben erhalten; der bisher beim Initialisieren zwischengespeicherte englische Standard-Abschluss wird lokalisiert.

WooCommerce weist die Bestellung erst nach `setup_locale()` zu. Deshalb erfolgt die kundenspezifische Sprachumschaltung bei der Empfängerauflösung vor Betreff und Inhalt. Anschliessend wird die vorherige Sprache wiederhergestellt. Der Website-Sprachfilter respektiert laufende WordPress-Sprachumschaltungen. Administrative Benachrichtigungen behalten ihre bisherige Sprache.

## Prüfung und Veröffentlichung

- PHP-Syntax: 120 Dateien fehlerfrei; PHPUnit: 86 Tests, 383 Assertions.
- Integration: 80 Prüfungen mit isolierten Staging-Datensätzen; 16 Mails abgefangen, keine externen HTTP-Anfragen.
- DE/FR: echte WooCommerce-Vorlagen für vier Kundennachrichten, Betreff/Inhalt/Abschluss, Regionsrückfall, Co-Pilot-Haushalt, Sprachrücksetzung, Checkout-Snapshot, Rechnungssprache und Versandbestätigung.
- Fahrzeuge: eindeutige Details, keine Fremdfabrikat-Umdeutung, Chassis-Dublette, fehlender Typ, gemeinsames Kennzeichen, Platzhalter, Wiederholbarkeit und Schutz vorhandener Fahrzeuge/Bildmetadaten.
- Sicherung: Programmdateien, Prüfsummen, Benutzer/Metadaten, Mitgliedschaften, private Datensätze, Bestellungen, redaktionelle Optionen, Rollen, Konfigurationshashes und alle drei vorhandenen Fahrzeugbilder.
- Staging-Veröffentlichung nur nach erneutem Prüfsummenvergleich; Rückkehrdateien werden serverseitig aufgezeichnet. Produktion bleibt unverändert.

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
- Integration: 81 Prüfungen mit isolierten Staging-Datensätzen; 16 Mails abgefangen, keine externen HTTP-Anfragen.
- DE/FR: echte WooCommerce-Vorlagen für vier Kundennachrichten, Betreff/Inhalt/Abschluss, Regionsrückfall, Co-Pilot-Haushalt, Sprachrücksetzung, Checkout-Snapshot, Rechnungssprache und Versandbestätigung.
- Fahrzeuge: eindeutige Details, keine Fremdfabrikat-Umdeutung, Chassis-Dublette, fehlender Typ, gemeinsames Kennzeichen, Platzhalter, Wiederholbarkeit und Schutz vorhandener Fahrzeuge/Bildmetadaten.
- Sicherung: Programmdateien, Prüfsummen, Benutzer/Metadaten, Mitgliedschaften, private Datensätze, Bestellungen, redaktionelle Optionen, Rollen, Konfigurationshashes und alle drei vorhandenen Fahrzeugbilder.
- Staging-Veröffentlichung nur nach erneutem Prüfsummenvergleich; Rückkehrdateien werden serverseitig aufgezeichnet. Produktion bleibt unverändert.

Die erste Veröffentlichung wurde nach einem Fehler beim frühen WordPress-Boot vollständig per Prüfsummenabgleich zurückgenommen. Die korrigierte Locale-Methode prüft vor dem Zugriff, ob WordPress seinen Locale-Switcher bereits initialisiert hat. Ein zusätzlicher Integrationstest deckt ausdrücklich den Aufruf vor dieser Initialisierung ab. Vor dem erneuten Release sind keine Fahrzeugdaten übernommen worden.

## Bestätigtes Ergebnis auf Staging

PR #50 und Frühstart-Korrektur #51 sind zusammengeführt. Sieben geänderte/neue Programmdateien wurden nach erneutem Abgleich aller 445 Ausgangsdateien veröffentlicht. Danach stimmen alle 446 aktuellen Programmdateien mit dem Veröffentlichungsmanifest überein. Der vollständige WordPress-Start registriert die Sprachauflösung bei zwölf Kundennachrichtentypen. Zwölf HTTP-Prüfungen für Website, Login, Shop und Ressourcen bestehen; der gemeinsame Testschutz bleibt aktiv.

Die unmittelbar vor Übernahme frisch abgerufene Fairgate-Vorschau bestätigte genau die fünf geprüften Ergänzungen. Alle fünf wurden additiv gespeichert: jetzt 313 Fahrzeuge, darunter 310 Fairgate-Importe. Wiederholungsvorschau: keine weiteren Ergänzungen; 19 Einträge bleiben zur fachlichen Prüfung sichtbar (zwölf fehlende Typen, sieben andere Fabrikate). Beim Import wurden keine E-Mails oder externen Anfragen ausgelöst.

Nachvergleich: alle 288 Benutzer, 287 Mitgliedschaften mit Mitgliederzugriff, 334 bisherigen privaten Datensätze, eine bestehende Bestellung, 35 redaktionellen Optionen sowie Rollen, Passwörter, Einstellungen, Konfiguration und Bilddateien erhalten. Ein bestehender WooCommerce-Aktivitätszeitstempel wurde während der Prüfung regulär fortgeschrieben; sämtliche anderen Benutzer-Metadaten sind unverändert. Alle drei vorhandenen Fahrzeugbilder sind anhand SHA-256 identisch.

Privater Einzelfallbericht und Importbelege: `.private/vehicle-review-2026-10-26/` (nicht versioniert). Rückkehrpaket serverseitig: `/private/strc-rollback-20261026-vehicles-mail.tar.gz`, SHA-256 `4cc34b844183b75475ed2c4408cf3237158d0a1bd3d1112fc2fbcd8746b9c761`. Programm-Rückkehrumfang: `/private/strc-peter-release-20261026204951`. Fahrzeug-Rückkehrumfang enthält ausschliesslich die fünf neuen IDs samt Quellen und Inhaltsprüfsummen; spätere Änderungen müssen vor einer Rücknahme erhalten werden.

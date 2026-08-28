# Projektplan Swiss TR-Club Website V3

## 1. Ausgangslage und Ziel

Dieser Plan übersetzt die vorhandenen Unterlagen in ein umsetzbares Vorgehen.

| Quelle | Verwendung im Projekt |
|---|---|
| Functional Specifications V1 | Fachlicher Anforderungskatalog |
| Architecture Guide V1.0 | Technischer Rahmen und Lieferobjekte |
| HTML-Mockup v2_20_10 | UX-Referenz, kein Produktionscode |

Vor Entwicklungsbeginn werden Widersprüche dokumentiert und entschieden.

## 2. Empfohlenes Projektmodell

Iterative Entwicklung mit zweiwöchigen Sprints und Abnahme je Funktionspaket.

| Ebene | Rhythmus | Ergebnis |
|---|---:|---|
| Lenkungsausschuss | monatlich | Budget-, Termin- und Scope-Entscheide |
| Product-Workshop | zweiwöchentlich | Prioritäten und Abnahmen |
| Entwicklungssprint | zweiwöchentlich | Testbares Inkrement auf Staging |
| Technischer Review | je Inkrement | Architektur-, Sicherheits- und Qualitätsprüfung |
| Release-Gate | je Meilenstein | Formelle Freigabe |

## 3. Projektphasen

### Phase 0 - Projektstart

**Dauer:** 1 Woche

**Arbeiten:**

- Projektrollen und Entscheider festlegen
- GitHub, Tickets und Entscheidungsprotokoll einrichten
- Dokumentversionen als Ausgangsbasis einfrieren
- Definition-of-Done und Änderungsprozess vereinbaren
- Staging-, Test- und Produktionsverantwortung klären

**Gate:** Projektauftrag und Arbeitsweise sind freigegeben.

### Phase 1 - Discovery und Anforderungsbereinigung

**Dauer:** 2-3 Wochen

**Arbeiten:**

- Anforderungen in priorisierten Backlog überführen
- Muss-, Soll- und Später-Anforderungen kennzeichnen
- Rollen- und Berechtigungsmatrix validieren
- Hauptprozesse mit Club-Verantwortlichen durchspielen
- Bestehende Inhalte und Daten inventarisieren
- Datenschutz, Aufbewahrung und Bildrechte klären
- Messbare Qualitätsziele definieren
- Abnahmekriterien jeder User Story ergänzen

**Offene Entscheide:**

- Nur Deutsch/Französisch oder zusätzlich Englisch
- Umfang des ersten produktiven Releases
- Bestehende Datenmigration und Archivumfang
- Hosting, Supportmodell und Betriebsverantwortung
- Lizenzbudget und akzeptierte Folgekosten

**Gate:** Backlog, Scope und Abnahmekriterien sind freigegeben.

### Phase 2 - Technische Machbarkeitsprüfung

**Dauer:** 2-3 Wochen

Diese Phase reduziert die grössten Projektrisiken vor Vollentwicklung.

| Spike | Nachweis |
|---|---|
| Fairgate Contacts API V2 | Felder, Rechte, Limits, Testdaten funktionieren |
| Mitgliedersynchronisation | Wiederholung, Fehlerfall, Konfliktregel funktionieren |
| Eventin | Anmelde-, Teilnehmer- und Rollenmodell genügt |
| zahls.ch | TWINT/Karte, Webhooks, Rückerstattung funktionieren |
| Polylang | Theme, Builder und Module sind kompatibel |
| wpForo | Rollen, Moderation und Profile genügen |
| NextGEN | Upload, Freigabe und Depot funktionieren |
| Dokumentbibliothek | Suche, Rechte und Metadaten funktionieren |
| WooCommerce | Kasse, Bestand und Abgleich funktionieren |
| E-Mail/SMTP | Zustellung, Fehlerprotokoll und Wiederholung funktionieren |

**Ergebnisse:**

- Verifizierter Technologieentscheid
- Plugin-, Editions- und Lizenzliste
- Fairgate-Feld- und Datenflussmatrix
- Entscheid über notwendige Eigenentwicklung
- Aktualisierte Aufwandsschätzung

**Gate:** Architektur und Integrationen erhalten Go/No-Go.

### Phase 3 - UX, Informationsarchitektur und Designsystem

**Dauer:** 3-4 Wochen, teilweise parallel

Das HTML-Mockup wird als Gesprächsgrundlage weiterentwickelt.

**Arbeiten:**

- Sitemap und Navigationsmodell bestätigen
- Responsive Ansichten ausarbeiten
- Seniorengerechte Bedienmuster definieren
- Formulare und Fehlermeldungen standardisieren
- DE/FR-Sprachwechsel vollständig gestalten
- Wiederverwendbare Komponenten spezifizieren
- Kritische Abläufe klickbar prototypisieren
- Barrierefreiheit nach WCAG 2.2 AA prüfen

**Zwingende Prototypen:**

- Mitgliedsantrag und Aktivierung
- Login und Passwort-Wiederherstellung
- Profiländerung mit Synchronisationsfehler
- Eventanmeldung mit Zahlung
- Dashboard auf Mobilgeräten
- Moderations- und Administrationsabläufe

**Gate:** UX und Komponentenbibliothek sind abgenommen.

### Phase 4 - Technisches Fundament

**Dauer:** 2-3 Wochen

**Arbeiten:**

- WordPress auf Staging installieren
- Theme und Child-Theme konfigurieren
- STRC-Core-Plugin als Modulrahmen erstellen
- Konfiguration und Geheimnisse trennen
- Rollen und Capabilities grundlegend anlegen
- Logging, SMTP und Backups einrichten
- Deployment- und Rollbackprozess automatisieren
- Sicherheits- und Qualitätsprüfungen integrieren

**Gate:** Reproduzierbare Staging-Bereitstellung funktioniert.

### Phase 5 - Risikoreicher End-to-End-Vertikalschnitt

**Dauer:** 3-5 Wochen

Zuerst wird eine vollständige Mitgliederreise umgesetzt.

**Ablauf:**

1. Antrag wird in WordPress gespeichert.
2. Moderator prüft den Antrag.
3. Fairgate-Kontakt wird kontrolliert erstellt.
4. WordPress-Konto wird verknüpft.
5. Mitglied setzt das Passwort.
6. Mitglied meldet sich an.
7. Profiländerung wird synchronisiert.
8. Fehler bleibt sichtbar und wiederholbar.
9. Dashboard zeigt personalisierte Informationen.

**Zusätzliche Prüfungen:**

- Doppelte Fairgate-Kontakte verhindern
- Fairgate-Ausfall sicher behandeln
- Personen einer Paarmitgliedschaft trennen
- Mitgliedsstatus periodisch abgleichen
- Datenschutz und Datensparsamkeit prüfen

**Gate:** Der vollständige Vertikalschnitt ist abgenommen.

### Phase 6 - Funktionspakete

Jedes Paket enthält Konfiguration, Entwicklung, Administration, Dokumentation und Tests.

| Paket | Inhalt | Dauer |
|---|---|---:|
| A | Öffentliche Website, Regionen, News, Mehrsprachigkeit | 3-4 Wochen |
| B | Events, Anmeldung, Zahlung, Teilnehmerverwaltung | 4-6 Wochen |
| C | Mitgliederverzeichnis, Fahrzeuge, Karte, Datenschutz | 3-4 Wochen |
| D | Forum, Experten, Moderation, Benachrichtigungen | 3-4 Wochen |
| E | Galerie, Upload, Depot, Freigabe, Rechte | 3-4 Wochen |
| F | Bibliothek, Magazin, Roadbooks, Zugriffsstufen | 3-4 Wochen |
| G | Marktplatz, Inserate, Ablauf, Kontakt, Moderation | 3-4 Wochen |
| H | Shop, Bestand, Zahlung, Versand, Abgleich | 4-5 Wochen |
| I | Dashboard, Aktivitäten, Rollenfunktionen | 2-3 Wochen |

Pakete D-H können bei genügender Teamgrösse parallel laufen.

**Abnahme je Paket:**

- Fachprozess funktioniert vollständig
- Rollen und Rechte sind geprüft
- Externe Fehlerfälle sind geprüft
- Mobile Bedienung ist geprüft
- Deutsche und französische Inhalte funktionieren
- Administration ist dokumentiert
- Regressionstests laufen erfolgreich

### Phase 7 - Migration und Inhaltsaufbau

**Dauer:** 3-6 Wochen, parallel zur Entwicklung

**Arbeiten:**

- Inhalte, Mitgliederbezüge und Medien inventarisieren
- Zielmodell und Feldmapping definieren
- Daten bereinigen und Dubletten behandeln
- Testmigration mehrfach durchführen
- Dateirechte und Bildrechte verifizieren
- Übersetzungsstatus dokumentieren
- URL-Weiterleitungen vorbereiten
- Finale Migration zeitlich planen

**Gate:** Testmigration ist vollständig nachvollziehbar.

### Phase 8 - Systemtest und Club-Abnahme

**Dauer:** 3-4 Wochen

**Testbereiche:**

- Funktions- und Regressionstests
- Fairgate-, Zahlungs- und E-Mail-Integration
- Rollen- und Berechtigungsmatrix
- Datenschutz und Datensparsamkeit
- Sicherheits- und Schwachstellenprüfung
- Performance und Lastverhalten
- WCAG- und Tastaturbedienung
- Mobil-, Browser- und Gerätetests
- Backup-Wiederherstellung und Notfallablauf
- Benutzerabnahme mit realistischen Clubfällen

**Empfohlene Abnahmegruppen:**

- Ältere Clubmitglieder
- Regionalleitende
- Eventorganisierende
- Moderierende
- Shop- und Finanzverantwortliche
- Vorstand und Webmaster

**Gate:** Kritische Fehler sind behoben.

### Phase 9 - Einführung

**Dauer:** 1-2 Wochen

**Arbeiten:**

- Inhalts- und Datenfreeze kommunizieren
- Finale Migration durchführen
- DNS, E-Mail und Zahlungsdienste umstellen
- Smoke-Tests auf Produktion durchführen
- Alte Website rollbackfähig erhalten
- Clubmitglieder gezielt informieren
- Supportkanal und Eskalation aktivieren

**Gate:** Produktionsfreigabe durch Swiss TR-Club.

### Phase 10 - Hypercare und Übergabe

**Dauer:** 2-4 Wochen

**Arbeiten:**

- Betrieb eng überwachen
- Produktionsprobleme priorisiert beheben
- Administratoren und Webmaster schulen
- Dokumentation finalisieren
- Quellcode und Zugänge übergeben
- Wartungs- und Updateplan vereinbaren
- Verbesserungsbacklog priorisieren

**Gate:** Formelle Projektabnahme und Betriebsübergabe.

## 4. Empfohlene Release-Strategie

Die Gesamtspezifikation ist für einen einzigen Big-Bang zu umfangreich.

| Release | Empfohlener Umfang |
|---|---|
| MVP | Fundament, öffentliche Website, Mitglieder, Events, Zahlungen |
| Release 2 | Verzeichnis, Karte, Dashboard, Forum, Galerie |
| Release 3 | Bibliothek, Marktplatz, Shop, Optimierungen |

Diese Staffelung ändert den vertraglichen Gesamtumfang nicht.

## 5. Realistische Planung

| Szenario | Kalenderdauer | Voraussetzung |
|---|---:|---|
| Kleines Parallelteam | 6-8 Monate | Zwei Entwickler plus Spezialisten |
| Einzelentwickler | 12-18 Monate | Begrenzte Parallelisierung |
| Nur MVP | 4-5 Monate | Verbindlich reduzierter Erstumfang |

Die belastbare Schätzung folgt erst nach Phase 2.

## 6. Empfohlene Kernbesetzung

| Rolle | Richtwert |
|---|---:|
| Product Owner Swiss TR-Club | 20-30 Prozent |
| Projektleitung/Business Analyse | 40-60 Prozent |
| UX/UI und Accessibility | 30-50 Prozent, phasenweise |
| WordPress-Entwicklung | 100-200 Prozent |
| Integration/Backend | 60-100 Prozent |
| QA/Test | 40-80 Prozent |
| DevOps/Security | 10-30 Prozent, phasenweise |
| Inhalte/Übersetzung | Clubseitig, kontinuierlich |

## 7. Kritische Projektentscheidungen

Diese Punkte müssen vor grösserer Entwicklung entschieden sein.

| Entscheidung | Spätester Zeitpunkt |
|---|---|
| Finaler MVP-Umfang | Ende Phase 1 |
| DE/FR oder zusätzlich EN | Ende Phase 1 |
| Fairgate-Feldmapping | Ende Phase 2 |
| Plugins und Editionen | Ende Phase 2 |
| Hosting und Betriebsmodell | Ende Phase 2 |
| Datenschutz- und Aufbewahrungsregeln | Ende Phase 3 |
| Migrationsumfang | Ende Phase 3 |
| Abnahmekriterien | Vor Phase 4 |

## 8. Hauptrisiken und Gegenmassnahmen

| Risiko | Gegenmassnahme |
|---|---|
| Fairgate-API deckt Felder nicht ab | Früher Spike mit echten Testdaten |
| Plugins erfüllen Detailprozesse nicht | Fit-Gap-Demo vor Lizenzentscheid |
| Zu viel Eigenentwicklung | Standard-First und Änderungsfreigabe |
| Mehrsprachigkeit wird unterschätzt | Inhalte und Workflows früh testen |
| Rollen werden zu breit vergeben | Matrixbasierte Least-Privilege-Tests |
| Migration enthält schlechte Daten | Mehrere bereinigte Testmigrationen |
| E-Mails oder Webhooks gehen verloren | Queue, Logging und Wiederholung |
| Umfang wächst während Umsetzung | Formeller Change-Request-Prozess |
| Clubabnahmen erfolgen zu spät | Abnahme je Funktionspaket |
| Big-Bang erzeugt Betriebsrisiko | Gestaffelte Releases und Rollback |

## 9. Definition of Done

Eine Funktion gilt erst als fertig, wenn:

- Abnahmekriterien erfüllt sind
- Automatisierte Tests erfolgreich laufen
- Rollen und Fehlerfälle geprüft sind
- Mobilansicht und Tastatur funktionieren
- DE/FR-Inhalte vollständig funktionieren
- Logging und Datenschutz geprüft sind
- Administratorablauf dokumentiert ist
- Product Owner abgenommen hat

## 10. Nächste konkrete Schritte

1. Club benennt Product Owner und Entscheider.
2. Unterlagen werden als Baseline bestätigt.
3. MVP-Workshop wird durchgeführt.
4. Fairgate-Testzugang wird bereitgestellt.
5. Plugin-Spikes werden beauftragt.
6. Backlog und Aufwand werden aktualisiert.
7. Erst danach beginnt Vollentwicklung.

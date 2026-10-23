# Fehlende Fairgate-Feldfreigaben – 23. Oktober 2026

## Aktuell verifiziert

Der vorhandene Website-API-Zugang funktioniert. Die aktuelle lesende V2-Abfrage liefert 524 Kontakte, aber keine Regionen, Fahrzeugfelder, Geburtsdaten, Co-Pilot-Felder oder Abonnementwerte. `group_assignments` ist bei allen 524 Kontakten leer. In `configured_fields` sind nur `company`, `correspondence_lang`, `first_name`, `gender`, `last_name` und `salutation` verfügbar. Eintrittsdatum, Geschlecht und Korrespondenzsprache sind bereits zugeordnet. Drei zusätzliche Kontaktstichproben über die V2-Extended- und V2-Daten-Endpunkte bestätigen die fehlenden Feldgruppen. Die fehlenden fünf Feldgruppen wurden nicht durch erfundene IDs, leere Platzhalter oder PLZ-Schätzungen ersetzt.

Die Website unterstützt die geforderten Zuordnungen bereits über `STRC_FAIRGATE_SYNC_FIELDS` und `STRC_FAIRGATE_VEHICLE_FIELDS`. Diese Einstellungen können erst um echte, durch die API bestätigte Pfade ergänzt werden. Staging bleibt lesend. Website-Superadmin und Fairgate-Administrator sind voneinander unabhängige Berechtigungen.

## Was Peter beziehungsweise ein Fairgate-Administrator tun muss

1. In der **Fairgate-Verwaltung des Swiss TR-Clubs** anmelden. Die genaue vereinsinterne Verwaltungsadresse und ein angemeldeter Fairgate-Administratorzugang stehen dieser Arbeitsumgebung nicht zur Verfügung.
2. **Einstellungen → FSA Service → Contacts API** öffnen; neuere Oberflächen nennen den Reiter **Kontakte-/Events-API**. Den bereits für die Website verwendeten Zugang beibehalten. API ist bereits aktiviert; kein zusätzliches Modul buchen und keinen bestehenden Schlüssel ersetzen.
3. **Einstellungen → FSA → Zusatzfelder** öffnen. Dort die folgenden bereits vorhandenen Kontaktfelder für die API aktivieren. Falls Lese-/Schreibfreigaben getrennt angeboten werden, reicht für Staging **Lesen**. Schreibzugriff nicht aktivieren.

| Bereich | Vorhandene Daten für die API bereitstellen | Website-Zuordnung nach tatsächlicher API-Prüfung |
|---|---|---|
| Region | Heimatregion / Stamm als eindeutige Hauptregion | `STRC_FAIRGATE_SYNC_FIELDS['region']` |
| Geburtstag | Geburtsdatum des Mitglieds | `birthDate` |
| Co-Pilot | Vorname, Nachname, Geschlecht, Geburtsdatum, Anrede, E-Mail, Mobilnummer; falls vorhanden Sprache und Adresse | `copilotFirstName`, `copilotLastName`, `copilotGender`, `copilotBirthDate`, `copilotSalutation`, `copilotEmail`, `copilotPhone`, `copilotLanguage`, `copilotStreet`, `copilotPostcode`, `copilotCity`, `copilotCountry` |
| Bisheriger Co-Pilot-Gesamtname | Bestehendes Feld «Copilot Vorname Name», wenn getrennte Namen noch fehlen | `copilotFullName`; vorhandenes Feld kann vorläufig weiterverwendet werden |
| Abos | Vorhandener tatsächlicher Bezug «TR Magazin» als Printabo und tatsächliches eNewsletter-Abo; ausdrückliche Ja-/Nein-Werte | `printMagazine`, `eNewsletter` |
| Fahrzeuge 1–3 | Je Fahrzeug Modell/Ausführung und Baujahr; soweit geführt Aussenfarbe, Innenfarbe, Chassisnummer, Kennzeichen, Bemerkungen | Je Eintrag in `STRC_FAIRGATE_VEHICLE_FIELDS`: `model`, `year`, `exteriorColour`, `interiorColour`, `chassisNumber`, `registration`, `notes` bzw. `details` |

Die Menüpunkte für Zusatzfelder sind durch die [offizielle Integrator-Anleitung, Abschnitt 4.1](https://support.fairgate.ch/de/kb/articles/contacts-api-hilfe-fur-integratoren) dokumentiert. Der neuere API-Reiter ist in der [Fairgate-Anleitung vom 13.10.2026](https://support.fairgate.ch/de/kb/articles/fsa-api-v20-fur-entwickler-und-integratoren) beschrieben. Die konkrete vereinsinterne Oberfläche wurde nicht eingesehen; die Menübezeichnung kann entsprechend abweichen.

### Falls ein Feld nicht in der API-Auswahl angeboten wird

- **Regionen als Gruppen:** Nicht die Hauptregion aus Adresse oder beliebigen Gruppen ableiten. Fairgate-Support muss bestätigen, wie die bestehenden Stamm-/Regionszuordnungen im V2-Extended-Kontakt für den vorhandenen Zugang verfügbar werden. Benötigt werden Gruppenkennung, Gruppenname und die Unterscheidung der Hauptregion von weiteren Gruppenzugehörigkeiten. Eine Gruppenliste ist noch kein einzelner `region`-JSON-Pointer; falls nur Zuordnungen geliefert werden, benötigt die Website anschliessend einen geprüften Adapter. Keine zweite parallele Regionendatenbank anlegen.
- **eNewsletter als Systemeinstellung:** Die reale Newsletter-Einstellung bereitstellen lassen. Nicht lediglich ein gleichnamiges, unverbundenes Zusatzfeld erstellen. Bei einer Negativlogik wie «abgemeldet» muss die Zuordnung ausdrücklich invertieren; nicht ungeprüft als positives Abo behandeln.
- **Geburtsdatum als Systemfeld:** Für den API-Zugang freigeben lassen; kein zweites Geburtstagsfeld anlegen.
- **Fehlendes Co-Pilot-Handy:** Unter **Kontakte → Kontaktfelder → Verwaltung** das individuelle Feld ergänzen. Bestehende Co-Pilot-Felder vor einer späteren Umbenennung/Migration sichern. Keine alten Felder löschen, bevor die übertragenen Werte und API-Feldschlüssel geprüft wurden. Die [Kontaktfeldverwaltung](https://support.fairgate.ch/de/kb/articles/kontaktfelder-3) beschreibt individuelle Kontaktfelder.
- **Fahrzeuge als komplexes Feld:** Falls Fairgate Fahrzeuge nicht als einzelne skalare Kontaktfelder, sondern als Liste liefert, muss nach Freigabe die reale Struktur geprüft werden. Die vorhandene Fahrzeugzuordnung unterstützt bis drei explizite Fahrzeugplätze; ein Adapter darf erst anhand bestätigter Listenelemente ergänzt werden.

## Was Peter zurückmelden muss

«Freigaben gespeichert» genügt, damit der vorhandene Website-Zugang erneut lesend geprüft werden kann. Zusätzlich sind nötig, sofern nicht aus der Antwort ersichtlich: welches Feld die verbindliche Hauptregion ist; welche Felder das echte Print-/Newsletter-Abo repräsentieren; ob fehlend/leer «nein» oder «unbekannt» bedeutet; bei Auswahlfeldern die Bedeutung der zurückgegebenen Werte/IDs. Für eine Prüfung müssen einige bestehende Datensätze die jeweiligen Felder tatsächlich enthalten. Keine Personenexporte, Passwörter, API-Schlüssel oder geheimen Callback-URLs per Chat oder Mail schicken.

Falls Peter keine Fairgate-Administratorrechte besitzt, muss der zuständige Vereinsadministrator diese Freigaben vornehmen oder Fairgate-Support einschalten. Die Website-Rolle kann diese Freigabe nicht ersetzen.

## Danach auf der Website

Tatsächliche V2-Feldpfade und Datentypen prüfen, bestehende Konfiguration und betroffene lokale Werte sichern, Zuordnung ergänzen und Änderungsvorschau erstellen. Mehrdeutige Region-/Abowerte und fehlende Fahrzeugfelder blockieren die jeweilige Übernahme. Erst nach bestandener Vorschau gezielt auf Staging anwenden. Website-Fahrzeuge nur ergänzen, bestehende Fahrzeuge/Fotos nicht überschreiben. Anschliessend Profil, Hauptregion, Co-Pilot, Abos, Geburtstage, Fahrzeug-Dubletten und Rechte erneut prüfen. Fairgate-Kontaktdaten werden nicht geschrieben.

## Nachweise

Private API-Abfrage und geheimnisfreier Strukturbericht: `.private/fairgate-fields-2026-10-23/`. Keine Zugangs- oder Kontaktdaten sind Teil dieses Dokuments. Für die fehlenden fünf Feldgruppen ist noch keine zusätzliche Konfiguration installiert.

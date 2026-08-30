# STRC-E006 - Öffentliche Agenda und Eventdetail

## Ziel

Veröffentlichte WordPress-Events speisen Startseite, Agenda und Eventdetail.

## Quellen

- Functional Specifications 5.1, 5.3, 5.5-5.7, 5.10
- Masterplan Phase E, Ticket STRC-E006
- ADR 0001

## Voraussetzungen

- `strc_event` und Taxonomien sind registriert.
- WordPress und Frontend sind lokal erreichbar.

## Erlaubte Dateien

- STRC-Core Events-Modul und Bootstrap
- Frontend-Seite und gemeinsame Styles
- lokale Seed-, Test- und Betriebsdokumentation

## Nicht-Ziele

- Eventanmeldung, Zahlung oder Warteliste
- Teilnehmerdaten oder Organisatorenverwaltung
- produktive Clubinhalte oder Produktionsdeployment

## Datenklassifikation

Nur veröffentlichte öffentliche Eventdaten und synthetische lokale Inhalte.

## Akzeptanzkriterien

- Entwurfsevents erscheinen niemals im öffentlichen Endpunkt.
- Startseite und Agenda verwenden dieselben WordPress-Datensätze.
- Datum, Typ, Scope, Region, Ort und Beschreibung erscheinen.
- Lade-, Leer- und Fehlerzustände sind verständlich.
- Keine Schaltfläche behauptet eine gespeicherte Anmeldung.
- Desktop und Mobile bleiben ohne horizontales Überlaufen.

## Negativtests

- Entwurf wird über die REST-Route nicht ausgeliefert.
- Nicht erreichbares WordPress zeigt einen Fehlerzustand.
- Fehlende optionale Metadaten beschädigen die Darstellung nicht.

## Rollback

Endpunktregistrierung und Frontend-Abfrage gemeinsam zurücknehmen. Eventdaten bleiben unverändert.

## Definition of Done

Automatisierte Tests, Integrationsprüfung, Dokumentation und GitHub-CI bestehen.

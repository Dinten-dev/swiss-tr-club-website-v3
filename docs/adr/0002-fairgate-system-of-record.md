# ADR 0002: Fairgate als führendes Clubsystem

Status: Accepted  
Date: 2026-09-02  
Supersedes: ADR 0001

## Kontext

Die Clubverwaltung muss dauerhaft in Fairgate verbleiben. Die ursprünglichen Fach- und Architekturunterlagen definieren Fairgate für offizielle Mitgliederdaten, Mitgliedschaften und Buchhaltung als führendes System. WordPress bildet die öffentliche Website und die Mitgliederplattform.

## Entscheid

- Fairgate führt Mitgliederdaten, Mitgliedschaften und Buchhaltung.
- Fairgate führt Mitgliederrechnungen, Zahlungen und Rundmails.
- WordPress authentifiziert Website-Benutzer weiterhin selbst.
- WordPress speichert nur benötigte synchronisierte Mitgliedsdaten.
- Die Fairgate Contact ID ist die dauerhafte Systemreferenz.
- STRC Core kapselt die Fairgate Contacts API V2.
- Direkter Zugriff auf Fairgate-Datenbanken ist untersagt.
- Events, Shop und Community bleiben WordPress-Fachmodule.
- Fairgate-Ausfälle sperren bestehende Logins nicht automatisch.
- Bestätigte inaktive Mitgliedschaften entziehen Mitgliederzugriff.

## Datenfluss

1. Fairgate liefert freigegebene Kontaktdaten über FSA.
2. STRC Core synchronisiert einen minimierten lokalen Bestand.
3. WordPress verwendet diesen Bestand ohne Live-Abhängigkeit.
4. Erlaubte Profiländerungen werden kontrolliert zurückgeschrieben.
5. Fehler verbleiben idempotent in einer Wiederholungswarteschlange.

## Konsequenzen

- Die lokale STRC-Finanzverwaltung wird nicht mehr gestartet.
- Die lokale Mitgliederverwaltung ist kein führendes System.
- Bestehende lokale Tabellen bleiben vorläufig rückrollbar erhalten.
- Feldmapping benötigt eine Prüfung am echten Fairgate-Mandanten.
- Access-Key und OID liegen nur in Serverkonfigurationen.

## Nicht entschieden

- Das endgültige Fairgate-Feldmapping.
- Synchronisationsintervalle und Webhook-Auswahl.
- Produktive OID und Zugangsdaten.
- Buchhaltungsübergaben aus Events und WooCommerce.

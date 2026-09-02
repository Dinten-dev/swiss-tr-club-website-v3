# STRC-A007 - Fairgate-Integrationsfundament

## Ziel

Fairgate wieder als führendes System für Mitglieder und Buchhaltung festlegen und die lokale Doppelverwaltung deaktivieren.

## Enthalten

- ADR 0002 und Architekturdokumentation
- serverseitige Fairgate-Konfiguration
- Contacts-API-Client für Token und Kontaktabfragen
- schreibgeschützte Fairgate-Clubverwaltungsseite
- Konfigurationsanzeige ohne Geheimnisse
- automatisierte Client- und Konfigurationstests

## Nicht enthalten

- produktive Zugangsdaten
- mandantenspezifisches Feldmapping
- Kontaktimport oder Rücksynchronisation
- Event- oder WooCommerce-Finanzübergabe
- Löschen vorhandener lokaler Tabellen

## Akzeptanzkriterien

- STRC Core startet keine lokale Finanzverwaltung.
- STRC Core erzeugt keine Mitgliedschaft beim Rollenwechsel.
- Administratoren sehen Fairgate als führendes System.
- Zugangsdaten erscheinen nicht in Statusseiten oder URLs.
- API-Aufrufe verwenden offizielle FSA-Endpunkte.
- Fehlende Konfiguration erzeugt einen kontrollierten Fehler.

## Negativtests

- leere OID oder Access-Key blockieren API-Aufrufe.
- ungültiges JSON wird abgelehnt.
- Nicht-2xx-Antworten werden kontrolliert gemeldet.

## Rollback

Plugin-Bootstrap auf die vorherige ClubManagementPage zurücksetzen. Bestehende Tabellen bleiben unverändert erhalten.

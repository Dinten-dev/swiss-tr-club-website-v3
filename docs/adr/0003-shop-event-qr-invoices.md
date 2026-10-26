# ADR 0003: QR-Rechnungen für Shop und Anlässe aus der Website

Status: Accepted  
Date: 2026-10-25  
Ergänzt: ADR 0002

## Kontext

Shop-Bestellungen und Anlass-Anmeldungen auf Rechnung lösten bisher nur eine Mail an die Kasse aus («Rechnung erstellen»); die Rechnung wurde von Hand in der Fairgate-FiBu erstellt. Das Fairgate Standard API (FSA) umfasst nur das Kontaktmodul und bietet keine Endpunkte für Rechnungen, FiBu, Debitoren oder Zahlungen. Eine automatische Rechnungsstellung in Fairgate ist deshalb nicht möglich.

## Entscheid (Vorstand, 25.10.2026, «Weg A»)

- Die Website stellt **Shop- und Anlassrechnungen** selbst aus: PDF im Club-CD mit Schweizer QR-Zahlteil (SPC 0200, QR-Referenz).
- **Mitgliederbeiträge bleiben in Fairgate** (ADR 0002 unverändert).
- Website-Rechnungen verwenden dieselbe QR-IBAN wie Fairgate. Die Referenzen beginnen mit `2254809` (Fairgate: `225480` + `0` an Stelle 7), gefolgt von der Dokumentart (`1` Shop, `2` Anlass) und einer laufenden Nummer. Die Nummernkreise überschneiden sich nie.
- Rechnungsnummern: `S-00001` (Shop), `E-00001` (Anlass).
- Versand automatisch per Mail an Besteller bzw. Mitglied, Blindkopie an die Kasse (`STRC_TREASURY_EMAIL`, sonst `STRC_EVENT_TREASURY_EMAIL`, sowie Konten mit `strc_manage_finance`).
- Der Lieferschein (Versandpartner) erhält dasselbe Layout und einen QR-Code mit der Bestellnummer, ohne Zahlteil.

## Konsequenzen

- Zahlungen gehen auf das Clubkonto und werden in der Fairgate-FiBu verbucht; die Kasse ordnet sie über die Referenz zu.
- Offene Posten für Shop und Anlässe stehen auf der Website (Bestellung bzw. Anmeldung), nicht als Debitoren in Fairgate.
- Rechnungssteller und QR-IBAN stehen in `STRC_BILLING_CREDITOR` (nicht geheim, sie stehen auf jeder Rechnung).
- Fehlt die Konfiguration, wird keine Rechnung erstellt; die Kasse erhält wie bisher die Mail «Rechnung erstellen».

## Integrationsschutz (26.10.2026)

- `strc_invoice_automation_from` wird beim Staging-Rollout einmal gesetzt. Ältere Bestellungen und Anmeldungen lösen keine rückwirkenden Rechnungen aus. Ohne Freischaltzeitpunkt bleibt die automatische Rechnungsstellung gesperrt.
- Ausgestellte PDFs bleiben mit Prüfsumme ausserhalb des Webroots archiviert. Download und Wiederholung verwenden dieselbe Datei, auch nach späteren Bestell- oder Profiländerungen. Bestehende Download-Berechtigungen bleiben erforderlich.
- Nicht-CHF-Bestellungen und fehlgeschlagene Nummernspeicherung stellen keine Rechnung aus. Wartelisten werden nicht fakturiert.
- Testrechnungen verwenden ausschliesslich wegwerfbare Daten; alle Nachrichten werden abgefangen. Ein erfolgreicher PDF-Test bestätigt keine Bankbuchung.

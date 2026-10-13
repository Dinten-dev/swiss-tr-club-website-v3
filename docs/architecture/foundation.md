# Technisches Fundament

## Produktionsbausteine

| Baustein | Verantwortung |
|---|---|
| React/Vinext | Bestehende responsive Benutzeroberfläche |
| WordPress | Inhalte, Benutzer, Rollen und REST-API |
| STRC Core | Fairgate-Integration und Website-Fachlogik |
| Fairgate | Mitglieder, Mitgliedschaften und Buchhaltung |
| MariaDB | Website-Daten und minimierter Mitgliedercache |
| Redis | Cache und Sitzungsentlastung |
| Nginx | TLS, Routing und statische Dateien |
| Mailpit | Lokaler E-Mail-Test |

## Berechtigungsmodell

Aktueller Staging-Stand vom 5. Oktober 2026: Mitgliedschaft und Funktionsrollen werden getrennt behandelt. Zwölf additive Funktionsrollen sind visuell zuweisbar; Regionen und Veranstaltungen begrenzen Zuständigkeiten. Moderationsrechte sind modulbezogen.

Die [Rollenmatrix](../reviews/spec-completion-2026-10-05/roles-matrix.md) beschreibt die aktuelle Zuordnung. Webmaster und technische WordPress-Verwaltung erhalten keinen automatischen Zugriff auf vertrauliche Vorstandsdokumente. Restricted benötigt die separat vergebene Vorstandsrolle.

Der [Prüfbericht](../reviews/spec-completion-2026-10-05/README.md) enthält getestete Grenzen und offene Fairgate-/Zahlungsprozesse. Die folgenden Produktionsbausteine beschreiben die Zielarchitektur; sie bestätigen keine Aktivierung aller Bausteine auf Staging.

## Datenhoheit

- Fairgate: Mitgliederdaten, Mitgliedschaften, Rechnungen, Zahlungen
- WordPress: Website-Login, Inhalte, Events, Community, Fahrzeuge
- WooCommerce: Produkte, Bestellungen und Lager
- STRC-Mitgliedsdaten sind ein minimierter Synchronisationsbestand

## WordPress-Datenobjekte

- `strc_event`: Veranstaltungen mit Anmeldung und Kapazität
- `strc_drive`: Clubfahrten und regionale Ausfahrten
- `strc_ad`: Nutzerinserate im Marktplatz
- `strc_topic`: Forumsbeiträge mit Kommentaren

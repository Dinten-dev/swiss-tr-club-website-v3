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

| Rolle | Darf |
|---|---|
| Nutzer | Eigene Inserate und Themen verwalten |
| Redaktor | Blogbeiträge publizieren |
| Administrator | Inhalte, Events und Fairgate-Zugänge verwalten |
| Developer | Alle WordPress- und STRC-Funktionen |

WordPress-Administratoren erhalten alle STRC-Berechtigungen.

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

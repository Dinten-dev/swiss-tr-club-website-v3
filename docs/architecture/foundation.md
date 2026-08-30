# Technisches Fundament

## Produktionsbausteine

| Baustein | Verantwortung |
|---|---|
| React/Vinext | Bestehende responsive Benutzeroberfläche |
| WordPress | Inhalte, Benutzer, Rollen und REST-API |
| STRC Core | Events, Fahrten, Inserate und Forum |
| MariaDB | Persistente Clubdaten |
| Redis | Cache und Sitzungsentlastung |
| Nginx | TLS, Routing und statische Dateien |
| Mailpit | Lokaler E-Mail-Test |

## Berechtigungsmodell

| Rolle | Darf |
|---|---|
| Nutzer | Eigene Inserate und Themen verwalten |
| Redaktor | Blogbeiträge publizieren |
| Administrator | Events und Fahrten verwalten |
| Developer | Alle WordPress- und STRC-Funktionen |

WordPress-Administratoren erhalten alle STRC-Berechtigungen.

## Datenobjekte

- `strc_event`: Veranstaltungen mit Anmeldung und Kapazität
- `strc_drive`: Clubfahrten und regionale Ausfahrten
- `strc_ad`: Nutzerinserate im Marktplatz
- `strc_topic`: Forumsbeiträge mit Kommentaren

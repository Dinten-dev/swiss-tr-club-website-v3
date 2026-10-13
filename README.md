# Swiss TR-Club Website V3

WordPress-Website und Clubplattform des Swiss TR-Clubs mit Fairgate-Integration.

## Architektur

- `frontend/`: responsive öffentliche Website und Mitgliederoberfläche
- `wordpress/`: WordPress-Backend, STRC-Core und Fallback-Theme
- `compose.yaml`: MariaDB, Redis, WordPress, Nginx, Mailpit
- `infra/`: Server- und PHP-Konfiguration
- `scripts/`: lokale Installation und Betrieb
- `docs/`: Architekturentscheide und Runbooks

## Rollen

| Rolle | Berechtigungen |
|---|---|
| STRC Nutzer | Eigene Inserate und Forumsbeiträge |
| STRC Redaktor | Blogbeiträge und redaktionelle Inhalte |
| STRC Administrator | Inhalte, Events und Fairgate-Clubverwaltung |
| STRC Developer | Vollständiger Plattformzugriff |

## Clubverwaltung und Datenhoheit

- Veröffentlichte WordPress-Events speisen Startseite und Agenda
- Fairgate führt Mitglieder, Mitgliedschaften und Buchhaltung
- Fairgate verwaltet Rechnungen, Zahlungen und Rundmails
- Contacts API V2 liefert benötigte Mitgliederdaten
- WordPress speichert einen minimierten Synchronisationsbestand
- WordPress-Login bleibt von Fairgate getrennt
- Inaktive Mitgliedschaften verlieren geschützte Berechtigungen
- Fairgate Contact IDs verknüpfen beide Systeme dauerhaft

## Frontend starten

```bash
cd frontend
npm install
npm run dev
```

Frontend: `http://localhost:3000`

## WordPress starten

```bash
cp .env.example .env
./scripts/bootstrap-local.sh
```

WordPress: `http://localhost:8080`
Mailpit: `http://localhost:8025`

Administration: `WordPress → Clubverwaltung`

Optionale lokale Demo-Zugangsdaten werden in `.env` gesetzt:

```dotenv
STRC_DEMO_USER=strc_demo
STRC_DEMO_EMAIL=member@example.test
STRC_DEMO_PASSWORD=change-me
STRC_SEED_LOCAL_CONTENT=1
STRC_FAIRGATE_OID=
STRC_FAIRGATE_ACCESS_KEY=
STRC_FAIRGATE_ADMIN_URL=
```

## Qualität

```bash
cd frontend
npm run lint
npm run build
```

```bash
cd wordpress/wp-content/plugins/strc-core
composer install
composer test
composer lint
```

```bash
docker-compose --profile tools run --rm wpcli wp eval-file scripts/verify-backend.php
```

## Dokumentation

- [Überholter Open-Source-Masterplan](STRC_OpenSource_Masterplan_2026_2027.md)
- [Aktueller Architekturentscheid](docs/adr/0002-fairgate-system-of-record.md)

## Lizenz

Quellcode: MIT. Clubmarke und bereitgestellte Medien ausgenommen.

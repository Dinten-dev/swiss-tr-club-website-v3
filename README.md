# Swiss TR-Club Website V3

Open-Source-Website und Clubplattform des Swiss TR-Clubs.

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
| STRC Administrator | Events und Fahrten verwalten |
| STRC Developer | Vollständiger Plattformzugriff |

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

## Dokumentation

- [Open-Source-Masterplan](STRC_OpenSource_Masterplan_2026_2027.md)
- [Architekturentscheid](docs/adr/0001-open-source-wordpress-architecture.md)

## Lizenz

Quellcode: MIT. Clubmarke und bereitgestellte Medien ausgenommen.

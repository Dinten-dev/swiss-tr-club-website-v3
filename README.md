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
| STRC Administrator | Mitglieder, Finanzen, Rundmails, Events, Fahrten |
| STRC Developer | Vollständiger Plattformzugriff |

## Clubverwaltung

- Veröffentlichte WordPress-Events speisen Startseite und Agenda
- Mitgliederstatus, Region und Jahresbeitrag verwalten
- Jahresrechnungen gesammelt erzeugen und versenden
- Schweizer QR-Rechnungen als PDF generieren
- camt.053- und camt.054-Zahlungen automatisch zuordnen
- Rundmails warteschlangengesteuert an aktive Mitglieder senden
- Eigenständige Datenhaltung im STRC-Core
- CSV-Prüflauf und kontrollierter Mitgliederimport
- Inaktive Mitgliedschaften verlieren geschützte Berechtigungen
- Einzel-, Paar- und Jungmitgliedschaften verwalten
- Primary und Co-Pilot als getrennte Konten verknüpfen
- Zeitlich begrenzte Aktivierungslinks sicher versenden

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

- [Open-Source-Masterplan](STRC_OpenSource_Masterplan_2026_2027.md)
- [Architekturentscheid](docs/adr/0001-open-source-wordpress-architecture.md)

## Lizenz

Quellcode: MIT. Clubmarke und bereitgestellte Medien ausgenommen.

# Lokale Entwicklung

## Voraussetzungen

- Docker mit Compose
- Node.js 22 oder neuer
- Git

## Vollständiges Backend

```bash
cp .env.example .env
./scripts/bootstrap-local.sh
```

- Website: `http://localhost:8080`
- Mailpit: `http://localhost:8025`

Die Zugangsdaten stammen ausschliesslich aus `.env`.

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend: `http://localhost:3000`

## Stoppen

```bash
./scripts/stop-local.sh
```

## Vollständig zurücksetzen

Volumes nur nach expliziter Datenfreigabe entfernen.

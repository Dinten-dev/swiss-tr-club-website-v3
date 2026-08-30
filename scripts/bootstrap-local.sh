#!/usr/bin/env sh
set -eu

project_root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
cd "$project_root"

if [ ! -f .env ]; then
    cp .env.example .env
    echo "Created .env from .env.example. Change local passwords when needed."
fi

set -a
. ./.env
set +a

docker compose up -d database redis wordpress web mailpit

if ! docker compose --profile tools run --rm wpcli core is-installed >/dev/null 2>&1; then
    docker compose --profile tools run --rm wpcli core install \
        --url="${STRC_SITE_URL:-http://localhost:8080}" \
        --title="${STRC_SITE_TITLE:-Swiss TR-Club}" \
        --admin_user="${STRC_ADMIN_USER:-strc_admin}" \
        --admin_password="${STRC_ADMIN_PASSWORD:-local-admin-change-me}" \
        --admin_email="${STRC_ADMIN_EMAIL:-admin@example.test}" \
        --skip-email
fi

docker compose --profile tools run --rm wpcli theme activate strc
docker compose --profile tools run --rm wpcli plugin activate strc-core
docker compose --profile tools run --rm wpcli option update permalink_structure '/%postname%/'
docker compose --profile tools run --rm wpcli rewrite flush --hard

echo "Website: ${STRC_SITE_URL:-http://localhost:8080}"
echo "Mailpit: http://localhost:${STRC_MAILPIT_PORT:-8025}"

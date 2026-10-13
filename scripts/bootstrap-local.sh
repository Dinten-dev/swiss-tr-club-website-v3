#!/usr/bin/env sh
set -eu

project_root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
cd "$project_root"

if docker compose version >/dev/null 2>&1; then
    compose() { docker compose "$@"; }
elif command -v docker-compose >/dev/null 2>&1; then
    compose() { docker-compose "$@"; }
else
    echo "Docker Compose is required."
    exit 1
fi

if [ ! -f .env ]; then
    cp .env.example .env
    echo "Created .env from .env.example. Change local passwords when needed."
fi

set -a
. ./.env
set +a

compose up -d database redis wordpress web mailpit
compose exec --user root -T wordpress sh -c \
    'mkdir -p /var/www/html/wp-content/uploads && chown -R www-data:www-data /var/www/html/wp-content/uploads'
compose --profile tools run --rm composer install --no-interaction --prefer-dist \
    --ignore-platform-req=ext-bcmath \
    --ignore-platform-req=ext-gd

if ! compose --profile tools run --rm wpcli wp core is-installed >/dev/null 2>&1; then
    compose --profile tools run --rm wpcli wp core install \
        --url="${STRC_SITE_URL:-http://localhost:8080}" \
        --title="${STRC_SITE_TITLE:-Swiss TR-Club}" \
        --admin_user="${STRC_ADMIN_USER:-strc_admin}" \
        --admin_password="${STRC_ADMIN_PASSWORD:-local-admin-change-me}" \
        --admin_email="${STRC_ADMIN_EMAIL:-admin@example.test}" \
        --skip-email
fi

compose --profile tools run --rm wpcli wp theme activate strc
compose --profile tools run --rm wpcli wp plugin activate strc-core
compose --profile tools run --rm wpcli wp eval \
    '\SwissTRClub\Core\Roles\RoleManager::install(); \SwissTRClub\Core\Infrastructure\Schema::install(); update_option("strc_core_version", STRC_CORE_VERSION, false);'

if [ -n "${STRC_DEMO_EMAIL:-}" ] && [ -n "${STRC_DEMO_PASSWORD:-}" ]; then
    if demo_user_id=$(compose --profile tools run --rm wpcli wp user get "$STRC_DEMO_EMAIL" --field=ID 2>/dev/null); then
        compose --profile tools run --rm wpcli wp user update "$demo_user_id" \
            --user_pass="$STRC_DEMO_PASSWORD" \
            --first_name="Traver" \
            --last_name="Dinten" \
            --display_name="Traver Dinten"
    else
        demo_user_id=$(compose --profile tools run --rm wpcli wp user create \
            "${STRC_DEMO_USER:-strc_demo}" \
            "$STRC_DEMO_EMAIL" \
            --user_pass="$STRC_DEMO_PASSWORD" \
            --first_name="Traver" \
            --last_name="Dinten" \
            --display_name="Traver Dinten" \
            --role=strc_member \
            --porcelain)
    fi
    compose --profile tools run --rm wpcli wp user set-role "$demo_user_id" strc_member
    echo "Local demo member: $STRC_DEMO_EMAIL"
fi

if [ "${STRC_SEED_LOCAL_CONTENT:-0}" = "1" ]; then
    compose --profile tools run --rm wpcli wp eval-file scripts/seed-local-content.php
fi

compose --profile tools run --rm wpcli wp option update permalink_structure '/%postname%/'
compose --profile tools run --rm wpcli wp rewrite flush --hard

echo "Website: ${STRC_SITE_URL:-http://localhost:8080}"
echo "Mailpit: http://localhost:${STRC_MAILPIT_PORT:-8025}"

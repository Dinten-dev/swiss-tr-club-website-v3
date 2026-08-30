FROM wordpress:7.1-php8.3-fpm

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        libicu-dev \
        libzip-dev \
        unzip \
    && docker-php-ext-install -j"$(nproc)" bcmath intl zip \
    && rm -rf /var/lib/apt/lists/*

COPY infra/docker/wordpress/uploads.ini /usr/local/etc/php/conf.d/strc-uploads.ini

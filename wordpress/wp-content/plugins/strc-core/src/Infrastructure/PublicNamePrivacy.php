<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Infrastructure;

/**
 * Keine Mitgliedernamen über WordPress-Standardwege: Die REST-Benutzerliste (/wp/v2/users) und
 * Autorenarchive (?author=1) verraten sonst öffentlich Namen und Login-Kürzel der Autorinnen und Autoren.
 */
final class PublicNamePrivacy
{
    public function registerHooks(): void
    {
        add_filter('rest_endpoints', [$this, 'restEndpoints']);
        add_action('template_redirect', [$this, 'authorArchives']);
    }

    /** @param array<string,mixed> $endpoints */
    public function restEndpoints(array $endpoints): array
    {
        if (current_user_can('list_users') || current_user_can('edit_posts')) return $endpoints;
        foreach (array_keys($endpoints) as $route) if (str_starts_with((string) $route, '/wp/v2/users')) unset($endpoints[$route]);
        return $endpoints;
    }

    public function authorArchives(): void
    {
        if ((is_author() || isset($_GET['author'])) && ! current_user_can('list_users')) {
            global $wp_query;
            $wp_query->set_404();
            status_header(404);
            nocache_headers();
        }
    }
}

<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Events;

use WP_Query;
use WP_REST_Request;
use WP_REST_Response;

final class EventPublicEndpoint
{
    public function registerHooks(): void
    {
        add_action('rest_api_init', array($this, 'registerRoute'));
    }

    public function registerRoute(): void
    {
        register_rest_route(
            'strc/v1',
            '/events',
            array(
                'methods' => 'GET',
                'callback' => array($this, 'listEvents'),
                'permission_callback' => '__return_true',
                'args' => array(
                    'view' => array(
                        'default' => 'upcoming',
                        'sanitize_callback' => 'sanitize_key',
                        'validate_callback' => static fn (mixed $value): bool => in_array($value, array('upcoming', 'past', 'all'), true),
                    ),
                    'limit' => array(
                        'default' => 20,
                        'sanitize_callback' => 'absint',
                        'validate_callback' => static fn (mixed $value): bool => (int) $value >= 1 && (int) $value <= 100,
                    ),
                ),
            )
        );
    }

    public function listEvents(WP_REST_Request $request): WP_REST_Response
    {
        $view = (string) $request->get_param('view');
        $queryArgs = array(
            'post_type' => EventPostType::POST_TYPE,
            'post_status' => 'publish',
            'posts_per_page' => (int) $request->get_param('limit'),
            'meta_key' => 'strc_start_at',
            'orderby' => 'meta_value',
            'order' => 'past' === $view ? 'DESC' : 'ASC',
            'no_found_rows' => true,
        );

        if ('all' !== $view) {
            $queryArgs['meta_query'] = array(array(
                'key' => 'strc_start_at',
                'value' => current_time(DATE_ATOM),
                'compare' => 'past' === $view ? '<' : '>=',
                'type' => 'CHAR',
            ));
        }

        $query = new WP_Query($queryArgs);
        $events = array_map(fn ($post): array => $this->present((int) $post->ID), $query->posts);

        return new WP_REST_Response(array('events' => $events), 200);
    }

    /** @return array<string, mixed> */
    private function present(int $postId): array
    {
        $startAt = (string) get_post_meta($postId, 'strc_start_at', true);
        $registrationRequired = (bool) get_post_meta($postId, 'strc_registration_required', true);
        $registrationOpenAt = (string) get_post_meta($postId, 'strc_registration_open_at', true);
        $registrationCloseAt = (string) get_post_meta($postId, 'strc_registration_close_at', true);

        return array(
            'id' => $postId,
            'title' => get_the_title($postId),
            'summary' => wp_strip_all_tags((string) get_the_excerpt($postId)),
            'description' => wp_strip_all_tags((string) get_post_field('post_content', $postId)),
            'startAt' => $startAt,
            'endAt' => (string) get_post_meta($postId, 'strc_end_at', true),
            'location' => (string) get_post_meta($postId, 'strc_location', true),
            'eventType' => $this->term($postId, 'strc_event_type'),
            'scope' => $this->term($postId, 'strc_event_scope'),
            'region' => $this->term($postId, 'strc_region'),
            'registrationRequired' => $registrationRequired,
            'registrationStatus' => $this->registrationStatus($registrationRequired, $registrationOpenAt, $registrationCloseAt),
            'registrationOpenAt' => $registrationOpenAt,
            'registrationCloseAt' => $registrationCloseAt,
            'capacity' => (int) get_post_meta($postId, 'strc_capacity', true),
            'image' => get_the_post_thumbnail_url($postId, 'large') ?: '',
        );
    }

    /** @return array{name: string, slug: string}|null */
    private function term(int $postId, string $taxonomy): ?array
    {
        $terms = get_the_terms($postId, $taxonomy);
        if (! is_array($terms) || ! isset($terms[0])) {
            return null;
        }

        return array('name' => $terms[0]->name, 'slug' => $terms[0]->slug);
    }

    private function registrationStatus(bool $required, string $opensAt, string $closesAt): string
    {
        if (! $required) {
            return 'information';
        }

        $now = current_time('timestamp');
        $opens = '' !== $opensAt ? strtotime($opensAt) : false;
        $closes = '' !== $closesAt ? strtotime($closesAt) : false;
        if (false !== $opens && $now < $opens) {
            return 'scheduled';
        }
        if (false !== $closes && $now > $closes) {
            return 'closed';
        }

        return 'open';
    }
}

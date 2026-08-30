<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Events;

use DateTimeImmutable;
use Exception;

final class EventPostType
{
    public const POST_TYPE = 'strc_event';

    public function registerHooks(): void
    {
        add_action('init', array($this, 'register'));
    }

    public function register(): void
    {
        register_post_type(
            self::POST_TYPE,
            array(
                'labels' => array(
                    'name' => __('Events', 'strc-core'),
                    'singular_name' => __('Event', 'strc-core'),
                    'add_new_item' => __('Event erstellen', 'strc-core'),
                    'edit_item' => __('Event bearbeiten', 'strc-core'),
                    'view_item' => __('Event ansehen', 'strc-core'),
                    'search_items' => __('Events durchsuchen', 'strc-core'),
                ),
                'public' => true,
                'show_in_rest' => true,
                'has_archive' => 'agenda',
                'rewrite' => array('slug' => 'agenda'),
                'menu_icon' => 'dashicons-calendar-alt',
                'supports' => array('title', 'editor', 'excerpt', 'thumbnail', 'author', 'revisions'),
                'capability_type' => array('strc_event', 'strc_events'),
                'map_meta_cap' => true,
            )
        );

        $this->registerTaxonomies();
        $this->registerMeta();
    }

    public function seedTaxonomies(): void
    {
        $this->registerTaxonomies();

        $terms = array(
            'strc_event_type' => array('Run', 'Meeting', 'Multi-day Tour', 'Workshop', 'AGM', 'Other Club Event', 'External Event'),
            'strc_event_scope' => array('Club / National', 'Region', 'External'),
            'strc_region' => array('Zürich', 'Zentralschweiz', 'Nordwestschweiz', 'Bern', 'Ostschweiz', 'Romandie', 'Tessin', 'Wallis', 'Outside Switzerland'),
        );

        foreach ($terms as $taxonomy => $names) {
            foreach ($names as $name) {
                if (! term_exists($name, $taxonomy)) {
                    wp_insert_term($name, $taxonomy);
                }
            }
        }
    }

    private function registerTaxonomies(): void
    {
        $taxonomies = array(
            'strc_event_type' => array('Event Types', 'Event Type'),
            'strc_event_scope' => array('Event Scopes', 'Event Scope'),
            'strc_region' => array('Regions', 'Region'),
        );

        foreach ($taxonomies as $taxonomy => $labels) {
            register_taxonomy(
                $taxonomy,
                array(self::POST_TYPE),
                array(
                    'labels' => array('name' => __($labels[0], 'strc-core'), 'singular_name' => __($labels[1], 'strc-core')),
                    'public' => true,
                    'show_in_rest' => true,
                    'hierarchical' => true,
                    'show_admin_column' => true,
                )
            );
        }
    }

    private function registerMeta(): void
    {
        $stringFields = array('strc_start_at', 'strc_end_at', 'strc_location', 'strc_registration_open_at', 'strc_registration_close_at');

        foreach ($stringFields as $field) {
            register_post_meta(
                self::POST_TYPE,
                $field,
                array(
                    'type' => 'string',
                    'single' => true,
                    'show_in_rest' => true,
                    'sanitize_callback' => str_ends_with($field, '_at') ? array($this, 'sanitizeDateTime') : 'sanitize_text_field',
                    'auth_callback' => array($this, 'canEditMeta'),
                )
            );
        }

        register_post_meta(
            self::POST_TYPE,
            'strc_registration_required',
            array(
                'type' => 'boolean',
                'single' => true,
                'default' => false,
                'show_in_rest' => true,
                'sanitize_callback' => 'rest_sanitize_boolean',
                'auth_callback' => array($this, 'canEditMeta'),
            )
        );

        register_post_meta(
            self::POST_TYPE,
            'strc_capacity',
            array(
                'type' => 'integer',
                'single' => true,
                'default' => 0,
                'show_in_rest' => true,
                'sanitize_callback' => 'absint',
                'auth_callback' => array($this, 'canEditMeta'),
            )
        );
    }

    public function canEditMeta(bool $allowed, string $metaKey, int $postId): bool
    {
        unset($allowed, $metaKey);

        return current_user_can('edit_strc_event', $postId);
    }

    public function sanitizeDateTime(mixed $value): string
    {
        if (! is_string($value) || '' === trim($value)) {
            return '';
        }

        try {
            return (new DateTimeImmutable($value))->format(DATE_ATOM);
        } catch (Exception) {
            return '';
        }
    }
}

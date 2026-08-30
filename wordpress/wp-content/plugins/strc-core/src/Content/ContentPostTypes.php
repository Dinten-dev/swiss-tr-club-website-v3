<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Content;

final class ContentPostTypes
{
    public function registerHooks(): void
    {
        add_action('init', array($this, 'register'));
    }

    public function register(): void
    {
        $this->registerType('strc_drive', 'Fahrten', 'Fahrt', 'fahrten', 'dashicons-location-alt', array('strc_drive', 'strc_drives'));
        $this->registerType('strc_ad', 'Inserate', 'Inserat', 'marktplatz', 'dashicons-megaphone', array('strc_ad', 'strc_ads'));
        $this->registerType('strc_topic', 'Forum', 'Forumsbeitrag', 'forum', 'dashicons-format-chat', array('strc_topic', 'strc_topics'), true);
    }

    /** @param array{0: string, 1: string} $capabilityType */
    private function registerType(
        string $postType,
        string $plural,
        string $singular,
        string $slug,
        string $icon,
        array $capabilityType,
        bool $comments = false
    ): void {
        $supports = array('title', 'editor', 'excerpt', 'thumbnail', 'author', 'revisions');
        if ($comments) {
            $supports[] = 'comments';
        }

        register_post_type(
            $postType,
            array(
                'labels' => array(
                    'name' => $plural,
                    'singular_name' => $singular,
                    'add_new_item' => $singular . ' erstellen',
                    'edit_item' => $singular . ' bearbeiten',
                    'view_item' => $singular . ' ansehen',
                    'search_items' => $plural . ' durchsuchen',
                ),
                'public' => true,
                'show_in_rest' => true,
                'has_archive' => $slug,
                'rewrite' => array('slug' => $slug),
                'menu_icon' => $icon,
                'supports' => $supports,
                'capability_type' => $capabilityType,
                'map_meta_cap' => true,
            )
        );
    }
}

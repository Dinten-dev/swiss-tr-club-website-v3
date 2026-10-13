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
        $this->registerType('strc_album', 'Galerie', 'Album', 'galerie', 'dashicons-format-gallery', array('strc_topic', 'strc_topics'));
        $this->registerType('strc_document', 'Bibliothek', 'Dokument', 'bibliothek', 'dashicons-media-document', array('strc_topic', 'strc_topics'));
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
        $private = in_array($postType, array('strc_topic', 'strc_album', 'strc_document'), true);
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
                'public' => ! $private && $postType !== 'strc_ad',
                'publicly_queryable' => ! $private && $postType !== 'strc_ad',
                'exclude_from_search' => $private,
                'show_ui' => ! $private,
                'show_in_rest' => ! $private && $postType !== 'strc_ad',
                'has_archive' => $private ? false : $slug,
                'rewrite' => $private ? false : array('slug' => $slug),
                'menu_icon' => $icon,
                'supports' => $supports,
                'capability_type' => $capabilityType,
                'map_meta_cap' => true,
            )
        );
    }
}

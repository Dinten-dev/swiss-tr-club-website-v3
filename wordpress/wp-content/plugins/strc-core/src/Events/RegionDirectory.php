<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Events;

final class RegionDirectory
{
    public const REGIONS = array(
        'zuerich' => 'Zürich',
        'bern' => 'Bern',
        'ostschweiz' => 'Ostschweiz',
        'mittelland' => 'Mittelland',
        'innerschweiz' => 'Innerschweiz',
        'nordwestschweiz' => 'Nordwestschweiz',
        'suisse-romande' => 'Suisse Romande',
        'triungsters' => 'TRiungsters',
    );

    /** @return list<object> */
    public static function terms(): array
    {
        $terms = get_terms(array('taxonomy' => 'strc_region', 'hide_empty' => false));
        if (! is_array($terms)) {
            return array();
        }

        $terms = array_values(array_filter($terms, static fn ($term): bool => isset(self::REGIONS[$term->slug])));
        usort($terms, static fn ($left, $right): int => array_search($left->slug, array_keys(self::REGIONS), true) <=> array_search($right->slug, array_keys(self::REGIONS), true));
        return $terms;
    }

    public static function includes(mixed $term): bool
    {
        return is_object($term) && isset($term->slug) && isset(self::REGIONS[$term->slug]);
    }

    public static function canonicalName(mixed $value): ?string
    {
        if (! is_string($value) || '' === trim($value)) {
            return null;
        }

        $fold = static function (string $text): string {
            $text = strtr(mb_strtolower(trim($text)), array('ä' => 'ae', 'ö' => 'oe', 'ü' => 'ue', 'é' => 'e', 'è' => 'e', 'à' => 'a', 'â' => 'a', 'ç' => 'c'));
            return preg_replace('/[^a-z0-9]/', '', $text) ?? '';
        };
        $key = $fold($value);
        $aliases = array(
            'zuerich' => 'zuerich', 'zurich' => 'zuerich',
            'triungsters' => 'triungsters',
            'bern' => 'bern', 'ostschweiz' => 'ostschweiz', 'mittelland' => 'mittelland',
            'innerschweiz' => 'innerschweiz', 'zentralschweiz' => 'innerschweiz',
            'nordwestschweiz' => 'nordwestschweiz',
            'suisseromande' => 'suisse-romande', 'suisseromandie' => 'suisse-romande', 'romandie' => 'suisse-romande',
        );
        $slug = $aliases[$key] ?? '';
        return isset(self::REGIONS[$slug]) ? self::REGIONS[$slug] : null;
    }

    public static function visibleTerm(int $termId): bool
    {
        $term = get_term($termId, 'strc_region');
        return self::includes($term);
    }

    /** Rename compatible legacy groups, add Mittelland, and retire obsolete groups. */
    public static function synchronize(): void
    {
        if ((int) get_option('strc_region_directory_version', 0) >= 1) {
            // Add the new assignment scope without rerunning historical region retirement.
            if (! get_term_by('slug', 'triungsters', 'strc_region')) wp_insert_term('TRiungsters', 'strc_region', ['slug'=>'triungsters']);
            return;
        }

        $aliases = array(
            'zentralschweiz' => 'innerschweiz',
            'romandie' => 'suisse-romande',
        );
        foreach ($aliases as $oldSlug => $newSlug) {
            if (! self::renameOrMerge($oldSlug, $newSlug, self::REGIONS[$newSlug])) {
                return;
            }
        }

        foreach (self::REGIONS as $slug => $name) {
            if (! get_term_by('slug', $slug, 'strc_region')) {
                $created = wp_insert_term($name, 'strc_region', array('slug' => $slug));
                if (is_wp_error($created)) {
                    return;
                }
            }
        }

        $suisseRomande = get_term_by('slug', 'suisse-romande', 'strc_region');
        $terms = get_terms(array('taxonomy' => 'strc_region', 'hide_empty' => false));
        if (! is_array($terms)) {
            return;
        }

        foreach ($terms as $term) {
            if (self::includes($term)) {
                continue;
            }

            // Peter's source places Valais within Suisse Romande.
            if ('wallis' === $term->slug && $suisseRomande && ! is_wp_error($suisseRomande)) {
                $posts = get_objects_in_term((int) $term->term_id, 'strc_region');
                foreach (is_array($posts) ? $posts : array() as $postId) {
                    if (is_wp_error(wp_set_object_terms((int) $postId, array((int) $suisseRomande->term_id), 'strc_region', true))) {
                        return;
                    }
                }
            }
            // Keep the old editorial data, but remove obsolete region assignments.
            if (is_wp_error(wp_delete_term((int) $term->term_id, 'strc_region'))) {
                return;
            }
        }
        update_option('strc_region_directory_version', 1, false);
    }

    private static function renameOrMerge(string $oldSlug, string $newSlug, string $newName): bool
    {
        $old = get_term_by('slug', $oldSlug, 'strc_region');
        if (! $old || is_wp_error($old)) {
            return true;
        }
        $target = get_term_by('slug', $newSlug, 'strc_region');
        if ($target && ! is_wp_error($target)) {
            $posts = get_objects_in_term((int) $old->term_id, 'strc_region');
            foreach (is_array($posts) ? $posts : array() as $postId) {
                if (is_wp_error(wp_set_object_terms((int) $postId, array((int) $target->term_id), 'strc_region', true))) {
                    return false;
                }
            }
            if ('' === (string) $target->description && '' !== (string) $old->description) {
                if (is_wp_error(wp_update_term((int) $target->term_id, 'strc_region', array('description' => $old->description)))) {
                    return false;
                }
            }
            foreach (get_term_meta((int) $old->term_id) as $key => $values) {
                if ('' === get_term_meta((int) $target->term_id, (string) $key, true)) {
                    foreach ($values as $value) {
                        add_term_meta((int) $target->term_id, (string) $key, maybe_unserialize($value));
                    }
                }
            }
            if (is_wp_error(wp_delete_term((int) $old->term_id, 'strc_region'))) {
                return false;
            }
            self::copyEditorialOption($oldSlug, $newSlug);
            return true;
        }

        if (is_wp_error(wp_update_term((int) $old->term_id, 'strc_region', array('name' => $newName, 'slug' => $newSlug)))) {
            return false;
        }
        self::copyEditorialOption($oldSlug, $newSlug);
        return true;
    }

    private static function copyEditorialOption(string $oldSlug, string $newSlug): void
    {
        $oldKey = 'strc_content_region-' . $oldSlug;
        $newKey = 'strc_content_region-' . $newSlug;
        $legacy = get_option($oldKey, null);
        if (null !== $legacy && false === get_option($newKey, false)) {
            add_option($newKey, $legacy, '', false);
        }
    }
}

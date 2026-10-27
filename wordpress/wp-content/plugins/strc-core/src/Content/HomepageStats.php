<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Content;

use SwissTRClub\Core\Events\RegionDirectory;

/** Aggregated, anonymous club figures for the public homepage ("Der Club in Zahlen"). */
final class HomepageStats
{
    private const CACHE = 'strc_homepage_stats_v2';

    public function summary(): array
    {
        $cached = get_transient(self::CACHE);
        if (is_array($cached)) return $cached;
        global $wpdb;
        $memberships = $wpdb->prefix . 'strc_memberships';
        $members = (int) $wpdb->get_var("SELECT COUNT(DISTINCT user_id) FROM {$memberships} WHERE status IN ('active','grace')");
        $youth = (int) $wpdb->get_var("SELECT COUNT(DISTINCT user_id) FROM {$memberships} WHERE status IN ('active','grace') AND membership_type IN ('youth','young')");
        $vehicles = (int) $wpdb->get_var(
            "SELECT COUNT(DISTINCT p.ID) FROM {$wpdb->posts} p INNER JOIN {$memberships} m ON m.user_id = p.post_author AND m.status IN ('active','grace')"
            . " WHERE p.post_type = 'strc_vehicle' AND p.post_status = 'private'"
        );
        $regions = array();
        foreach (RegionDirectory::terms() as $term) {
            if ($term->slug === 'triungsters') continue;
            $regions[] = array('name' => html_entity_decode($term->name, ENT_QUOTES | ENT_HTML5, 'UTF-8'), 'slug' => $term->slug);
        }
        $summary = array(
            'members' => $members > 0 ? $members : null,
            'vehicles' => $vehicles > 0 ? $vehicles : null,
            'youth' => $youth > 0 ? $youth : null,
            'regions' => $regions,
        );
        set_transient(self::CACHE, $summary, 30 * MINUTE_IN_SECONDS);
        return $summary;
    }
}

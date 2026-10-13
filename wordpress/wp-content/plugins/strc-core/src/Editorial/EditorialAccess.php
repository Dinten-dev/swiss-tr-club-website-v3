<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Editorial;

use SwissTRClub\Core\Events\RegionalEventAccess;

final class EditorialAccess
{
    public const AREAS = array('news' => 'Neuigkeiten', 'events' => 'Agenda aller Regionen', 'forum' => 'Forum', 'gallery' => 'Galerie', 'library' => 'Bibliothek und Magazin', 'market' => 'Marktplatz', 'triungsters' => 'TRiungsters', 'shop' => 'TR-Shop');

    public static function global(): bool
    {
        return current_user_can('strc_edit_website_content') || current_user_can('manage_options');
    }

    public static function area(string $area): bool
    {
        if (self::global() && in_array($area, array('news','triungsters'), true)) return true;
        if (! current_user_can('strc_access_member_area')) return false;
        if ('events' === $area && current_user_can('strc_manage_events')) return true;
        if (in_array($area, array('forum','gallery','library','market'), true) && current_user_can('strc_manage_community')) return true;
        $roleCapabilities = array(
            'forum' => 'strc_forum_moderator',
            'gallery' => 'strc_gallery_moderator',
            'market' => 'strc_marketplace_moderator',
            'library' => 'strc_manage_library',
            'shop' => 'strc_manage_shop',
        );
        if (isset($roleCapabilities[$area]) && current_user_can($roleCapabilities[$area])) return true;
        return current_user_can('strc_moderate')
            && in_array($area, (array) get_user_meta(get_current_user_id(), 'strc_moderation_areas', true), true);
    }

    public static function region(int $id): bool
    {
        return self::global() || (current_user_can('strc_access_member_area') && in_array($id, RegionalEventAccess::regions(), true));
    }

    public static function available(): bool
    {
        $editorialAreas = array_diff(array_keys(self::AREAS), array('shop'));
        return self::global() || (current_user_can('strc_access_member_area') && (RegionalEventAccess::regions() || array_filter($editorialAreas, array(self::class, 'area'))));
    }

    public static function document(string $key): bool
    {
        if (self::global()) return true;
        if (str_starts_with($key, 'region-')) {
            $term = get_term_by('slug', substr($key, 7), 'strc_region');
            return $term && self::region((int) $term->term_id);
        }
        if ('triungsters' === $key) return self::area('triungsters');
        return in_array($key, array('forum','gallery','library','market','agenda'), true) && self::area('agenda' === $key ? 'events' : $key);
    }

    /** Only supported formatting, links and public inline images; no scripts, styles or embeds. */
    public static function html(string $html): string
    {
        return wp_kses($html, array(
            'p'=>array(), 'br'=>array(), 'strong'=>array(), 'b'=>array(), 'em'=>array(), 'i'=>array(),
            'u'=>array(), 's'=>array(), 'h2'=>array(), 'h3'=>array(), 'h4'=>array(),
            'ul'=>array(), 'ol'=>array(), 'li'=>array(), 'blockquote'=>array(),
            'a'=>array('href'=>true,'title'=>true),
            'img'=>array('src'=>true,'alt'=>true,'width'=>true,'height'=>true),
            'table'=>array(), 'thead'=>array(), 'tbody'=>array(), 'tr'=>array(), 'th'=>array(), 'td'=>array(),
        ), array('http','https','mailto','tel'));
    }
}

<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Content;

use SwissTRClub\Core\Editorial\EditorialAccess;
use SwissTRClub\Core\Http\AjaxRequest;

/** A curated, access-filtered pool. Rotation never changes publication or permissions. */
final class HomepageHighlights
{
    private const OPTION = 'strc_homepage_highlights';
    private const TYPES = ['post'=>'news', 'strc_event'=>'event', 'strc_topic'=>'forum'];

    private function state(): array
    {
        $stored = get_option(self::OPTION, []);
        return array_replace(['revision'=>0, 'mode'=>'automatic', 'ids'=>[], 'history'=>[]], is_array($stored) ? $stored : []);
    }

    private function allowed(\WP_Post $post): bool
    {
        if ($post->post_status !== 'publish' || $post->post_password !== '' || !isset(self::TYPES[$post->post_type])) return false;
        if ($post->post_type === 'post') return has_category('club-news', $post);
        if ($post->post_type === 'strc_topic') return current_user_can('strc_access_member_area') && !get_post_meta($post->ID, 'strc_topic_merged_into', true);
        $start = strtotime((string)get_post_meta($post->ID, 'strc_start_at', true));
        return $start !== false && $start >= time();
    }

    private function candidates(int $limit): array
    {
        $posts = [];
        foreach (self::TYPES as $type => $kind) {
            if ($kind === 'forum' && !current_user_can('strc_access_member_area')) continue;
            $args = ['post_type'=>$type, 'post_status'=>'publish', 'has_password'=>false, 'numberposts'=>$limit, 'orderby'=>['modified'=>'DESC', 'ID'=>'DESC']];
            if ($kind === 'news') $args['category_name'] = 'club-news';
            if ($kind === 'event') $args['meta_query'] = [['key'=>'strc_start_at', 'value'=>current_time(DATE_ATOM), 'compare'=>'>=']];
            foreach (get_posts($args) as $post) if ($this->allowed($post)) $posts[$post->ID] = $post;
        }
        uasort($posts, static fn($a, $b) => [$b->post_modified_gmt, $b->ID] <=> [$a->post_modified_gmt, $a->ID]);
        return $posts;
    }

    public function settings(): array
    {
        if (!EditorialAccess::area('news')) AjaxRequest::fail('Kein Zugriff auf die Startseitenübersicht.', 403);
        $state = $this->state();
        $posts = $this->candidates(50);
        foreach ($state['ids'] as $id) {
            $post = get_post((int)$id);
            if ($post && $this->allowed($post)) $posts[$post->ID] = $post;
        }
        return [
            'revision'=>(int)$state['revision'], 'mode'=>$state['mode'], 'ids'=>$state['ids'],
            'items'=>array_values(array_map(static fn($p)=>['id'=>(int)$p->ID, 'kind'=>self::TYPES[$p->post_type], 'title'=>html_entity_decode(wp_strip_all_tags($p->post_title), ENT_QUOTES | ENT_HTML5, 'UTF-8'), 'date'=>get_post_modified_time(DATE_ATOM, true, $p)], $posts)),
        ];
    }

    public function save(array $input): array
    {
        $current = $this->settings();
        if (!isset($input['revision']) || (string)$current['revision'] !== $input['revision']) AjaxRequest::fail('Die Auswahl wurde inzwischen geändert. Bitte neu laden.', 409);
        $mode = $input['mode'] ?? '';
        $ids = json_decode($input['ids'] ?? '', true);
        if (!in_array($mode, ['automatic','selected'], true) || !is_array($ids) || !array_is_list($ids) || count($ids) > 12) AjaxRequest::fail('Bitte höchstens zwölf Beiträge auswählen.', 422);
        foreach ($ids as $id) {
            if (!is_int($id) || $id < 1) AjaxRequest::fail('Ungültige Beitragsauswahl.', 422);
            $post = get_post($id);
            if (!$post || !$this->allowed($post)) AjaxRequest::fail('Ein ausgewählter Beitrag ist nicht mehr verfügbar. Bitte die Auswahl aktualisieren.', 422);
        }
        $old = get_option(self::OPTION, null);
        $next = $this->state();
        array_unshift($next['history'], ['at'=>gmdate(DATE_ATOM), 'by'=>get_current_user_id(), 'mode'=>$next['mode'], 'ids'=>$next['ids']]);
        $next['history'] = array_slice($next['history'], 0, 10);
        $next['revision']++;
        $next['mode'] = $mode;
        $next['ids'] = array_values(array_unique($ids));
        global $wpdb;
        if ($old === null) $saved = add_option(self::OPTION, $next, '', false);
        else {
            $saved = $wpdb->update($wpdb->options, ['option_value'=>maybe_serialize($next)], ['option_name'=>self::OPTION, 'option_value'=>maybe_serialize($old)], ['%s'], ['%s','%s']);
            wp_cache_delete(self::OPTION, 'options');
        }
        if (!$saved) AjaxRequest::fail('Die Auswahl wurde gleichzeitig geändert. Bitte neu laden.', 409);
        return $this->settings();
    }

    public function overview(string $language, int $cycle): array
    {
        $state = $this->state();
        if ($state['mode'] === 'selected') {
            $posts = [];
            foreach ($state['ids'] as $id) {
                $post = get_post((int)$id);
                if ($post && $this->allowed($post)) $posts[$post->ID] = $post;
            }
            uasort($posts, static fn($a, $b) => [$b->post_modified_gmt, $b->ID] <=> [$a->post_modified_gmt, $a->ID]);
        } else $posts = array_slice($this->candidates(12), 0, 12);
        $posts = array_values($posts);
        $count = count($posts);
        $items = [];
        for ($i = 0; $i < min(3, $count); $i++) {
            $post = $posts[(($cycle % max(1, $count)) * 3 + $i) % $count];
            $kind = self::TYPES[$post->post_type];
            $title = $post->post_title;
            $body = $post->post_content;
            $excerpt = $post->post_excerpt;
            if ($language === 'fr' && $kind !== 'forum') {
                $title = get_post_meta($post->ID, 'strc_title_fr', true) ?: $title;
                $translated = (string)get_post_meta($post->ID, $kind === 'event' ? 'strc_description_fr' : 'strc_body_fr', true);
                if ($translated !== '') { $body = $translated; $excerpt = ''; }
                if ($kind === 'event') $excerpt = get_post_meta($post->ID, 'strc_excerpt_fr', true) ?: $excerpt;
                if ($kind === 'news') $excerpt = get_post_meta($post->ID, 'strc_excerpt_fr', true) ?: $excerpt;
            }
            $items[] = [
                'id'=>(int)$post->ID, 'kind'=>$kind, 'title'=>$this->text($title),
                'excerpt'=>$this->text($excerpt ?: wp_trim_words($body, 24)),
                'bodyHtml'=>$kind === 'news' ? EditorialAccess::html(wpautop($body)) : '',
                'date'=>get_post_modified_time(DATE_ATOM, true, $post),
                'eventDate'=>$kind === 'event' ? (string)get_post_meta($post->ID, 'strc_start_at', true) : '',
                'image'=>$kind === 'news' ? (get_the_post_thumbnail_url($post, 'large') ?: '') : '',
                'href'=>['news'=>'#neuigkeiten', 'event'=>'#agenda/', 'forum'=>'#forum/'][$kind] . ($kind === 'news' ? '' : $post->ID),
            ];
        }
        return ['items'=>$items, 'total'=>$count];
    }

    private function text(string $value): string
    {
        return html_entity_decode(wp_strip_all_tags($value), ENT_QUOTES | ENT_HTML5, 'UTF-8');
    }
}

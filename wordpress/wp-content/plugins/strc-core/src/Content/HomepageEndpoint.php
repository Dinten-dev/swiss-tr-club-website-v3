<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Content;

use SwissTRClub\Core\Http\AjaxRequest;

final class HomepageEndpoint
{
    public function registerHooks(): void
    {
        add_action('wp_ajax_strc_homepage', array($this, 'respond'));
        add_action('wp_ajax_nopriv_strc_homepage', array($this, 'respond'));
    }

    public function respond(): void
    {
        [$operation, $input] = AjaxRequest::read('strc_homepage', array());
        if (!in_array($operation, ['list','overview'], true)) AjaxRequest::fail('Unbekannte Anfrage.', 400);
        $language = $input['language'] ?? 'de';
        if (!in_array($language, ['de', 'fr'], true)) AjaxRequest::fail('Bitte eine gültige Sprache wählen.', 422);
        $page = max(1, min(10000, absint($input['page'] ?? 1)));
        header('Cache-Control: private, no-store, max-age=0');
        header('Vary: Cookie, Origin');
        $query = new \WP_Query(array(
            'post_type' => 'post', 'post_status' => 'publish', 'has_password' => false,
            'category_name' => 'club-news', 'posts_per_page' => 3, 'paged' => $page,
            'orderby' => array('date' => 'DESC', 'ID' => 'DESC'),
        ));
        $news = $query->posts;
        $member = current_user_can('strc_access_member_area');
        $activities = array();
        if ($member) {
            $kinds = array('strc_topic' => 'forum', 'strc_album' => 'gallery', 'strc_document' => 'library', 'strc_ad' => 'market');
            $posts = get_posts(array(
                'post_type' => array_keys($kinds), 'post_status' => 'publish', 'has_password' => false,
                'posts_per_page' => 5, 'orderby' => 'date', 'order' => 'DESC',
            ));
            foreach ($posts as $post) {
                if ($post->post_type === 'strc_document' && !\SwissTRClub\Core\Community\LibraryPolicy::canRead((int)$post->ID)) continue;
                $activities[] = array(
                    'id' => $post->ID, 'kind' => $kinds[$post->post_type],
                    'title' => $this->text($post->post_title),
                    'date' => get_post_time(DATE_ATOM, true, $post),
                );
            }
        }
        $latestForum = null;
        if ($member) {
            $topic = get_posts(array('post_type' => 'strc_topic', 'post_status' => 'publish', 'has_password' => false, 'posts_per_page' => 1, 'orderby' => 'date', 'order' => 'DESC'));
            if ($topic) {
                $latestForum = array(
                    'id' => (int) $topic[0]->ID,
                    'title' => $this->text($topic[0]->post_title),
                    'excerpt' => $this->text($topic[0]->post_excerpt ?: wp_trim_words($topic[0]->post_content, 24)),
                );
            }
        }
        $overview = $operation === 'overview' ? (new HomepageHighlights())->overview($language, max(0, min(2147483647, absint($input['cycle'] ?? 0)))) : null;
        wp_send_json_success(array(
            'news' => array_map(function ($post) use ($language): array {
                $title = $language === 'fr' ? (string)get_post_meta($post->ID, 'strc_title_fr', true) : '';
                $body = $language === 'fr' ? (string)get_post_meta($post->ID, 'strc_body_fr', true) : '';
                $excerpt = $language === 'fr' ? (string)get_post_meta($post->ID, 'strc_excerpt_fr', true) : '';
                $body = $body !== '' ? $body : $post->post_content;
                return array(
                'id' => $post->ID, 'title' => $this->text($title !== '' ? $title : $post->post_title),
                'excerpt' => $this->text($excerpt !== '' ? $excerpt : ($language === 'fr' ? wp_trim_words($body, 30) : ($post->post_excerpt ?: wp_trim_words($body, 30)))),
                'body' => $this->text($body),
                'bodyHtml' => \SwissTRClub\Core\Editorial\EditorialAccess::html(wpautop($body)),
                'date' => get_post_time(DATE_ATOM, true, $post),
                'image' => get_the_post_thumbnail_url($post, 'large') ?: '',
                );
            }, $news),
            'memberAccess' => $member, 'activities' => $operation === 'overview' ? (new HomepageActivity())->latest() : $activities, 'latestForum' => $latestForum,
            'highlights' => $overview,
            'stats' => $operation === 'overview' ? (new HomepageStats())->summary() : null,
            'newsPage' => $page, 'newsPages' => (int) $query->max_num_pages,
            'magazine' => (new MagazineEndpoint())->preview($language),
            'staging' => 'staging' === wp_get_environment_type(),
        ));
    }

    private function text(string $value): string
    {
        return html_entity_decode(wp_strip_all_tags($value), ENT_QUOTES | ENT_HTML5, 'UTF-8');
    }
}

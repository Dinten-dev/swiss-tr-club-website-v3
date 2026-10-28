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
        register_rest_route('strc/v1', '/regions', array(
            'methods' => 'GET',
            'permission_callback' => '__return_true',
            'callback' => function (): WP_REST_Response {
                $terms = RegionDirectory::terms();
                if (! $terms) {
                    return new WP_REST_Response(array('message' => 'Regionen konnten nicht geladen werden.'), 503);
                }
                global $wpdb;
                $membershipTable = $wpdb->prefix . 'strc_memberships';
                $activeMembers = (int) $wpdb->get_var("SELECT COUNT(DISTINCT user_id) FROM {$membershipTable} WHERE status IN ('active','grace')");
                $assignedMembers = 0;
                $regionCounts = array();
                $regionalMembers = (int) $wpdb->get_var("SELECT COUNT(DISTINCT user_id) FROM {$membershipTable} WHERE status IN ('active','grace') AND membership_type <> 'youth'");
                $youthTotal = (int) $wpdb->get_var("SELECT COUNT(DISTINCT user_id) FROM {$membershipTable} WHERE status IN ('active','grace') AND membership_type = 'youth'");
                $counts = $wpdb->get_results("SELECT region, COUNT(DISTINCT user_id) AS member_count FROM {$membershipTable} WHERE status IN ('active','grace') AND membership_type <> 'youth' AND TRIM(region) <> '' GROUP BY region", ARRAY_A);
                foreach (is_array($counts) ? $counts : array() as $row) {
                    $canonical = RegionDirectory::canonicalName((string) $row['region']);
                    if ($canonical === null) {
                        continue;
                    }
                    $key = sanitize_title($canonical);
                    $regionCounts[$key] = ($regionCounts[$key] ?? 0) + (int) $row['member_count'];
                    $assignedMembers += (int) $row['member_count'];
                }
                $membershipsComplete = $activeMembers > 0 && $regionalMembers + $youthTotal === $activeMembers && $regionalMembers === $assignedMembers;
                $youthCount = $membershipsComplete || $youthTotal > 0 ? $youthTotal : null;
                $regions = array();
                foreach ($terms as $term) {
                    if ($term->slug === 'triungsters') continue; // Returned separately with the youth member count.
                    $key = sanitize_title($term->name);
                    $hasCount = array_key_exists($key, $regionCounts);
                    $regions[] = array('name' => $term->name, 'slug' => $term->slug, 'description' => wp_strip_all_tags($term->description), 'memberCount' => $membershipsComplete || $hasCount ? ($regionCounts[$key] ?? 0) : null);
                }
                return new WP_REST_Response(array('regions' => $regions, 'triungstersMemberCount' => $youthCount), 200);
            },
        ));
        register_rest_route('strc/v1', '/information', array(
            'methods' => 'GET',
            'permission_callback' => '__return_true',
            'callback' => function (WP_REST_Request $request): WP_REST_Response {
                $paths = array('contact' => 'kontakt', 'privacy' => 'datenschutz', 'statutes' => 'statuten');
                $path = $paths[(string) $request->get_param('section')] ?? '';
                $page = '' !== $path ? get_page_by_path($path) : null;
                $visible = $page && 'publish' === $page->post_status && '' === $page->post_password;
                return new WP_REST_Response(array('content' => $visible ? wp_strip_all_tags(strip_shortcodes($page->post_content)) : ''), 200);
            },
        ));
        register_rest_route(
            'strc/v1',
            '/events',
            array(
                'methods' => 'GET',
                'callback' => array($this, 'listEvents'),
                'permission_callback' => '__return_true',
                'args' => array(
                    'language'=>array('default'=>'de','sanitize_callback'=>'sanitize_key','validate_callback'=>static fn(mixed $value):bool=>in_array($value,array('de','fr'),true)),
                    'months'=>['default'=>0,'sanitize_callback'=>'absint','validate_callback'=>static fn(mixed $v):bool=>in_array((int)$v,[0,12,24],true)],
                    'scope'=>['default'=>'','sanitize_callback'=>'sanitize_key','validate_callback'=>static fn(mixed $v):bool=>in_array($v,['','club-national','region','external'],true)],
                    'view' => array(
                        'default' => 'upcoming',
                        'sanitize_callback' => 'sanitize_key',
                        'validate_callback' => static fn (mixed $value): bool => in_array($value, array('upcoming', 'past', 'all'), true),
                    ),
                    'page'=>array('default'=>1,'sanitize_callback'=>'absint','validate_callback'=>static fn(mixed $v):bool=>(int)$v>=1&&(int)$v<=1000),
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
            'has_password'=>false,
            'paged'=>max(1,(int)$request->get_param('page')),
            'no_found_rows' => false,
        );

        if ('all' !== $view) {
            $queryArgs['meta_query'] = array(array(
                'key' => 'strc_start_at',
                'value' => current_time(DATE_ATOM),
                'compare' => 'past' === $view ? '<' : '>=',
                'type' => 'CHAR',
            ));
        }

        if($view==='past'&&(int)$request->get_param('months')>0){
            $cutoff=(new \DateTimeImmutable(current_time(DATE_ATOM)))->modify('-'.(int)$request->get_param('months').' months')->format(DATE_ATOM);
            $queryArgs['meta_query'][]=['key'=>'strc_start_at','value'=>$cutoff,'compare'=>'>=','type'=>'CHAR'];
        }
        if($request->get_param('scope'))$queryArgs['tax_query']=[['taxonomy'=>'strc_event_scope','field'=>'slug','terms'=>(string)$request->get_param('scope')]];
        $query = new WP_Query($queryArgs);
        $events = array_map(fn ($post): array => $this->present((int) $post->ID, (string) $request->get_param('language')), $query->posts);

        return new WP_REST_Response(array('events' => $events,'pages'=>(int)$query->max_num_pages,'total'=>(int)$query->found_posts), 200);
    }

    /** @return array<string, mixed> */
    private function present(int $postId, string $language = 'de'): array
    {
        $startAt = (string) get_post_meta($postId, 'strc_start_at', true);
        $registrationRequired = (bool) get_post_meta($postId, 'strc_registration_required', true);
        $registrationOpenAt = (string) get_post_meta($postId, 'strc_registration_open_at', true);
        $registrationCloseAt = (string) get_post_meta($postId, 'strc_registration_close_at', true);
        $titleFr = (string) get_post_meta($postId, 'strc_title_fr', true);
        $descriptionFr = (string) get_post_meta($postId, 'strc_description_fr', true);
        $title = $language === 'fr' && trim($titleFr) !== '' ? $titleFr : get_the_title($postId);
        $description = $language === 'fr' && trim(wp_strip_all_tags($descriptionFr)) !== '' ? $descriptionFr : (string) get_post_field('post_content', $postId);

        return array(
            'id' => $postId,
            'title' => html_entity_decode($title, ENT_QUOTES | ENT_HTML5, 'UTF-8'),
            'summary' => html_entity_decode(wp_strip_all_tags($language === 'fr' && (string) get_post_meta($postId, 'strc_excerpt_fr', true) !== '' ? (string) get_post_meta($postId, 'strc_excerpt_fr', true) : ($language === 'fr' && trim(wp_strip_all_tags($descriptionFr)) !== '' ? wp_trim_words($descriptionFr,20) : (string) get_the_excerpt($postId))), ENT_QUOTES | ENT_HTML5, 'UTF-8'),
            'description' => html_entity_decode(wp_strip_all_tags($description), ENT_QUOTES | ENT_HTML5, 'UTF-8'),
            'descriptionHtml' => \SwissTRClub\Core\Editorial\EditorialAccess::html(wpautop($description)),
            'startAt' => $startAt,
            'endAt' => (string) get_post_meta($postId, 'strc_end_at', true),
            'location' => (string) get_post_meta($postId, 'strc_location', true),
            'eventType' => $this->term($postId, 'strc_event_type'),
            'scope' => $this->term($postId, 'strc_event_scope'),
            'region' => $this->term($postId, 'strc_region'),
            'registrationRequired' => $registrationRequired,
            'externalRegistrationUrl'=>\SwissTRClub\Core\Forms\EventRegistration::settings($postId)['externalUrl'],
            'registrationStatus' => $this->eventRegistrationStatus($postId,$registrationRequired,$registrationOpenAt,$registrationCloseAt),
            'registrationOpenAt' => $registrationOpenAt,
            'registrationCloseAt' => $registrationCloseAt,
            'participantCount'=>\SwissTRClub\Core\Forms\EventRegistration::headcount($postId),
            'occupiedCount'=>\SwissTRClub\Core\Forms\EventRegistration::occupied($postId),
            'capacityUnit'=>'Personen',
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

    private function eventRegistrationStatus(int $id,bool $required,string $opens,string $closes): string
    {
        $status=$this->registrationStatus($required,$opens,$closes);
        if($status!=='open')return $status;
        $start=strtotime((string)get_post_meta($id,'strc_start_at',true));
        if($start&&time()>=$start)return 'closed';
        $capacity=(int)get_post_meta($id,'strc_capacity',true);
        if($capacity>0&&\SwissTRClub\Core\Forms\EventRegistration::occupied($id)>=$capacity)return \SwissTRClub\Core\Forms\EventRegistration::settings($id)['waitlist']?'waiting':'full';
        return $status;
    }

    private function registrationStatus(bool $required, string $opensAt, string $closesAt): string
    {
        if (! $required) {
            return 'information';
        }

        $now = time();
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

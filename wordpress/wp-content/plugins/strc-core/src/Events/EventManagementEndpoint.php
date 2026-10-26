<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Events;

use SwissTRClub\Core\Http\AjaxRequest;
use WP_Query;

final class EventManagementEndpoint
{
    public function registerHooks(): void
    {
        add_action('wp_ajax_strc_events', array($this, 'respond'));
        add_action('wp_ajax_nopriv_strc_events', array($this, 'respond'));
    }

    public function respond(): void
    {
        list($operation, $input) = AjaxRequest::read('strc_events', array('save', 'trash', 'restore', 'assign','upload'));
        if (! RegionalEventAccess::canManage()) {
            AjaxRequest::fail('Kein Zugriff auf die Agenda-Verwaltung.', 403);
        }
        $result = match ($operation) {
            'upload' => $this->upload($input),
            'list' => $this->listing($input),
            'get' => $this->readEvent(absint($input['id']??0)),
            'save' => \SwissTRClub\Core\Forms\FormStore::locked('event-'.absint($input['id']??0),fn()=>$this->save($input)),
            'trash', 'restore' => $this->changeStatus($operation, absint($input['id'] ?? 0)),
            'settings' => $this->settings(),
            'admins' => $this->admins(),
            'assign' => $this->assign($input),
            default => AjaxRequest::fail('Unbekannte Anfrage.'),
        };
        wp_send_json_success($result);
    }

    private function upload(array $input): array
    {
        $id=absint($input['id']??0);
        if($id&&!RegionalEventAccess::canEdit($id))AjaxRequest::fail('Kein Zugriff auf diesen Termin.',403);
        return \SwissTRClub\Core\Editorial\PublicImageUpload::receive();
    }

    private function settings(): array
    {
        $regions = RegionDirectory::terms();
        return array(
            'global' => RegionalEventAccess::isGlobal() || RegionalEventAccess::isOrganiser(),
            'organisers'=>array_values(array_map(static fn($user)=>['id'=>(int)$user->ID,'name'=>$user->display_name],array_filter(get_users(['number'=>2000,'orderby'=>'display_name']),static fn($user)=>user_can($user,'strc_access_member_area')))),
            'editorName' => (string) (wp_get_current_user()->display_name ?: wp_get_current_user()->user_login),
            'eventTypes'=>array_map(static fn($slug,$name)=>['slug'=>$slug,'name'=>$name],array_keys(array_diff_key(EventPostType::EVENT_TYPES,['weekend-meeting'=>true])),array_values(array_diff_key(EventPostType::EVENT_TYPES,['weekend-meeting'=>true]))),
            'regions' => array_values(array_map(static fn ($term): array => array('id' => (int) $term->term_id, 'name' => $term->name, 'slug' => $term->slug), array_filter($regions, static fn ($term): bool => RegionalEventAccess::isGlobal() || RegionalEventAccess::isOrganiser() || in_array((int) $term->term_id, RegionalEventAccess::regions(), true)))),
        );
    }

    private function listing(array $input): array
    {
        $archived = '1' === ($input['trash'] ?? '');
        $args = array('post_type' => 'strc_event', 'post_status' => $archived ? 'trash' : array('publish', 'draft', 'pending'), 'posts_per_page' => 24, 'paged' => max(1, absint($input['page'] ?? 1)), 's' => sanitize_text_field($input['search'] ?? ''), 'orderby' => $archived ? 'meta_value_num' : array('date' => 'DESC', 'ID' => 'DESC'));
        if ($archived) {
            $args['meta_key'] = '_wp_trash_meta_time';
        }
        $mixedScopes = false;
        if (! RegionalEventAccess::isGlobal()) {
            $regions = RegionalEventAccess::regions();
            if (RegionalEventAccess::isOrganiser() && $regions) {
                $mixedScopes = true;
                $args['posts_per_page'] = -1;
                $args['no_found_rows'] = true;
                unset($args['paged']);
            } elseif (RegionalEventAccess::isOrganiser()) {
                $args['post__in'] = RegionalEventAccess::assignedEvents() ?: array(0);
            } else {
                $args['tax_query'] = array('relation' => 'AND', array('taxonomy' => 'strc_region', 'terms' => $regions), array('taxonomy' => 'strc_event_scope', 'field' => 'slug', 'terms' => array('region')));
            }
        }
        $query = new WP_Query($args);
        $posts = array_filter($query->posts, static fn ($post): bool => RegionalEventAccess::canEdit((int) $post->ID));
        $pages = $mixedScopes ? (int) ceil(count($posts) / 24) : (int) $query->max_num_pages;
        if ($mixedScopes) $posts = array_slice(array_values($posts), (max(1, absint($input['page'] ?? 1)) - 1) * 24, 24);
        return array('events' => array_values(array_map(fn ($post): array => $this->present((int) $post->ID), $posts)), 'pages' => $pages);
    }

    private function readEvent(int $id): array
    {
        if(get_post_type($id)!=='strc_event'||!RegionalEventAccess::canEdit($id))AjaxRequest::fail('Kein Zugriff auf diesen Termin.',403);
        return $this->present($id);
    }

    private function present(int $id): array
    {
        $post = get_post($id);
        $regions = wp_get_object_terms($id, 'strc_region', array('fields' => 'ids'));
        $scopes = wp_get_object_terms($id, 'strc_event_scope', array('fields' => 'slugs'));
        $archivedAt = 'trash' === $post->post_status ? (int) get_post_meta($id, '_wp_trash_meta_time', true) : 0;
        $deleteAfter = EventArchiveRetention::deleteAfter($archivedAt);
        $eventType = wp_get_object_terms($id, 'strc_event_type', array('fields' => 'slugs'))[0] ?? '';
        $typeAliases = array('run' => 'tagesausfahrt', 'meeting' => 'weekend-meeting', 'multi-day-tour' => 'weekend-meeting', 'workshop' => 'workshops', 'agm' => 'andere', 'other-club-event' => 'andere', 'external-event' => 'andere');
        $editorId = absint(get_post_meta($id, 'strc_event_editor_id', true)) ?: (int) $post->post_author;
        $editorName = (string) get_the_author_meta('display_name', $editorId);
        if ('' === $editorName) {
            $editorName = (string) get_the_author_meta('user_login', $editorId);
        }
        return array(
            'id' => $id,
            'title' => html_entity_decode($post->post_title, ENT_QUOTES | ENT_HTML5, 'UTF-8'),
            'description' => wp_strip_all_tags($post->post_content),
            'descriptionHtml' => \SwissTRClub\Core\Editorial\EditorialAccess::html(wpautop($post->post_content)),
            'titleFr' => (string) get_post_meta($id, 'strc_title_fr', true),
            'descriptionFr' => (string) get_post_meta($id, 'strc_description_fr', true),
            // null = noch nie gesetzt (älterer Termin); das Formular schlägt dann die bisherige Beschreibung vor.
            'summary' => metadata_exists('post', $id, 'strc_short_description') ? (string) get_post_meta($id, 'strc_short_description', true) : null,
            'summaryFr' => (string) get_post_meta($id, 'strc_excerpt_fr', true),
            'startAt' => get_post_meta($id, 'strc_start_at', true),
            'endAt' => get_post_meta($id, 'strc_end_at', true),
            'location' => get_post_meta($id, 'strc_location', true),
            'regionId' => (int) ($regions[0] ?? 0),
            'scope' => $scopes[0] ?? 'region',
            'status' => $post->post_status,
            'archivedAt' => $archivedAt ? gmdate(DATE_ATOM, $archivedAt) : '',
            'deleteAfter' => $deleteAfter ? gmdate(DATE_ATOM, $deleteAfter) : '',
            'editorName' => $editorName,
            'registration' => \SwissTRClub\Core\Forms\EventRegistration::settings($id),
            'registrationRequired' => (bool) get_post_meta($id, 'strc_registration_required', true),
            'registrationOpenAt' => (string) get_post_meta($id, 'strc_registration_open_at', true),
            'registrationCloseAt' => (string) get_post_meta($id, 'strc_registration_close_at', true),
            'capacity' => (int) get_post_meta($id, 'strc_capacity', true),
            'eventType' => $typeAliases[$eventType] ?? $eventType,
        );
    }

    private function date(string $value, bool $required = false): string
    {
        if ('' === $value && ! $required) {
            return '';
        }
        if (! preg_match('/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/', $value)) {
            AjaxRequest::fail('Bitte ein gültiges Datum mit Uhrzeit angeben.');
        }
        try {
            $date = new \DateTimeImmutable($value);
            $errors = \DateTimeImmutable::getLastErrors();
            if ($errors && ($errors['warning_count'] || $errors['error_count'])) {
                AjaxRequest::fail('Das Datum ist ungültig.');
            }
            return $date->setTimezone(wp_timezone())->format(DATE_ATOM);
        } catch (\Exception) {
            AjaxRequest::fail('Das Datum ist ungültig.');
        }
    }

    private function save(array $input): array
    {
        if (get_current_user_id() < 1) {
            AjaxRequest::fail('Bitte mit einem Editor-Konto anmelden.', 401);
        }
        $id = absint($input['id'] ?? 0);
        if ($id && ! RegionalEventAccess::canEdit($id)) {
            AjaxRequest::fail('Dieser Termin gehört nicht zu Ihrer Region.', 403);
        }
        if ($id && 'trash' === get_post_status($id)) {
            AjaxRequest::fail('Den Termin zuerst wiederherstellen.', 409);
        }
        $title = sanitize_text_field($input['title'] ?? '');
        $description = \SwissTRClub\Core\Editorial\EditorialAccess::html($input['description'] ?? '');
        $titleFr = sanitize_text_field($input['titleFr'] ?? ($id ? get_post_meta($id, 'strc_title_fr', true) : ''));
        $descriptionFr = \SwissTRClub\Core\Editorial\EditorialAccess::html($input['descriptionFr'] ?? ($id ? get_post_meta($id, 'strc_description_fr', true) : ''));
        if (mb_strlen($titleFr) > 160 || mb_strlen($descriptionFr) > 10000) AjaxRequest::fail('Die französische Fassung ist zu lang.');
        $summary = trim(preg_replace('/\s+/u', ' ', sanitize_textarea_field($input['summary'] ?? ($id ? get_post_meta($id, 'strc_short_description', true) : ''))));
        $summaryFr = trim(preg_replace('/\s+/u', ' ', sanitize_textarea_field($input['summaryFr'] ?? ($id ? get_post_meta($id, 'strc_excerpt_fr', true) : ''))));
        if (mb_strlen($summary) > 120 || mb_strlen($summaryFr) > 120) AjaxRequest::fail('Der Kurzbeschrieb darf höchstens 120 Zeichen lang sein.', 422);
        if ('' === $title || mb_strlen($title) > 160 || mb_strlen($description) > 10000) {
            AjaxRequest::fail('Titel fehlt oder Text ist zu lang.');
        }
        $scope = $input['scope'] ?? 'region';
        $status = $input['status'] ?? 'publish';
        if (! in_array($scope, array('region', 'club-national', 'external'), true) || ! in_array($status, array('publish', 'draft'), true)) {
            AjaxRequest::fail('Ungültiger Bereich oder Status.');
        }
        $regionId = $scope==='club-national'?0:absint($input['regionId'] ?? 0);
        $region = $regionId ? get_term($regionId, 'strc_region') : null;
        if (($regionId && ! RegionDirectory::includes($region)) || ('region' === $scope && ! $regionId)) {
            AjaxRequest::fail('Bitte eine gültige Region wählen.');
        }
        if (! RegionalEventAccess::isGlobal() && ! RegionalEventAccess::isOrganiser() && ('region' !== $scope || ! in_array($regionId, RegionalEventAccess::regions(), true))) {
            AjaxRequest::fail('Sie können nur Termine Ihrer zugewiesenen Regionen verwalten.', 403);
        }
        if (!RegionalEventAccess::isGlobal() && RegionalEventAccess::isOrganiser() && \SwissTRClub\Core\Roles\RoleAssignments::scoped(get_current_user_id()) && RegionalEventAccess::regions() && !($id && in_array($id,RegionalEventAccess::assignedEvents(),true)) && ('region' !== $scope || !in_array($regionId,RegionalEventAccess::regions(),true))) AjaxRequest::fail('Bitte einen Termin der zugewiesenen Regionen wählen.',403);
        $start = $this->date($input['startAt'] ?? '', true);
        $end = $this->date($input['endAt'] ?? '');
        if ('' !== $end && strtotime($end) < strtotime($start)) {
            AjaxRequest::fail('Das Ende muss nach dem Beginn liegen.');
        }
        try {$registration=\SwissTRClub\Core\Forms\EventRegistration::validateSettings($input);} catch (\InvalidArgumentException $e) {AjaxRequest::fail($e->getMessage(),422);}
        $required=($input['registrationRequired']??'')==='1';
        $opens=$this->date($input['registrationOpenAt']??'');$closes=$this->date($input['registrationCloseAt']??'');
        if($required&&$opens&&strtotime($opens)>=strtotime($start))AjaxRequest::fail('Anmeldung ab: Der Zeitpunkt muss vor dem Veranstaltungsbeginn liegen.',422);
        if($required&&$opens&&$closes&&strtotime($opens)>=strtotime($closes))AjaxRequest::fail('Anmeldung bis: Der Anmeldeschluss muss nach «Anmeldung ab» liegen.',422);
        if($required&&$closes&&strtotime($closes)>strtotime($start))AjaxRequest::fail('Anmeldung bis: Der Anmeldeschluss darf nicht nach dem Veranstaltungsbeginn liegen.',422);
        if($registration['cancelAt']&&strtotime($registration['cancelAt'])>strtotime($start))AjaxRequest::fail('Die Abmeldefrist darf nicht nach dem Veranstaltungsbeginn liegen.');
        $capacity=$input['capacity']??'0';if(!ctype_digit($capacity)||(int)$capacity>100000)AjaxRequest::fail('Bitte eine gültige Teilnehmerkapazität angeben.');
        if($id&&(int)$capacity>0&&(int)$capacity<\SwissTRClub\Core\Forms\EventRegistration::occupied($id))AjaxRequest::fail('Die Kapazität darf nicht unter die bereits bestätigten oder reservierten Personenplätze fallen.');
        $eventType=$input['eventType']??'';
        if(!is_string($eventType)||!array_key_exists($eventType,EventPostType::EVENT_TYPES)||!get_term_by('slug',$eventType,'strc_event_type'))AjaxRequest::fail('Bitte eine gültige Veranstaltungsart wählen.');
        if(!$id&&$eventType==='weekend-meeting')AjaxRequest::fail('Bitte Weekend oder Meeting getrennt wählen.',422);
        if($scope==='external'&&$required&&!$registration['externalUrl'])AjaxRequest::fail('Für externe Veranstaltungen bitte den externen Anmeldelink angeben.');
        // Write the region and dates before making a new event public.
        $post = array('post_type' => 'strc_event', 'post_title' => $title, 'post_content' => $description, 'post_excerpt' => '' !== $summary ? $summary : wp_trim_words($description, 20), 'post_status' => 'draft');
        if ($id) {
            $post['ID'] = $id;
        } else {
            $post['post_author'] = get_current_user_id();
        }
        $saved = $id ? wp_update_post(wp_slash($post), true) : wp_insert_post(wp_slash($post), true);
        if (is_wp_error($saved)) {
            AjaxRequest::fail('Termin konnte nicht gespeichert werden.', 500);
        }
        update_post_meta((int) $saved, 'strc_short_description', $summary);
        if ('' !== $summaryFr) update_post_meta((int) $saved, 'strc_excerpt_fr', $summaryFr); else delete_post_meta((int) $saved, 'strc_excerpt_fr');
        if (! $id && RegionalEventAccess::isOrganiser() && ! RegionalEventAccess::isGlobal()) {
            if(!\SwissTRClub\Core\Roles\RoleAssignments::createdEvent(get_current_user_id(),(int)$saved)){wp_delete_post((int)$saved,true);AjaxRequest::fail('Die Funktionszuweisung wurde inzwischen geändert. Bitte neu laden.',409);}
        }
        // Die nominierte Veranstaltungsleitung erhält Zugriff auf diesen Termin (Bearbeiten, Teilnehmerliste), sofern sie die Funktion Event-Organisation hat.
        $nominated=(int)$registration['organiserUserId'];
        if($nominated&&$nominated!==get_current_user_id()&&user_can($nominated,'strc_manage_assigned_events'))\SwissTRClub\Core\Roles\RoleAssignments::createdEvent($nominated,(int)$saved);
        update_post_meta($saved, 'strc_event_editor_id', get_current_user_id());
        update_post_meta($saved, 'strc_title_fr', $titleFr);
        update_post_meta($saved, 'strc_description_fr', $descriptionFr);
        wp_set_object_terms($saved, $regionId ? array($regionId) : array(), 'strc_region');
        wp_set_object_terms($saved, $scope, 'strc_event_scope');
        wp_set_object_terms($saved,$eventType?[$eventType]:[],'strc_event_type');
        foreach(['strc_registration_required'=>$required?1:0,'strc_registration_open_at'=>$opens,'strc_registration_close_at'=>$closes,'strc_capacity'=>(int)$capacity,'strc_registration_form'=>$registration]as$key=>$value)update_post_meta($saved,$key,$value);
        foreach (array('strc_start_at' => $start, 'strc_end_at' => $end, 'strc_location' => sanitize_text_field($input['location'] ?? '')) as $key => $value) {
            update_post_meta($saved, $key, $value);
        }
        $published = wp_update_post(array('ID' => $saved, 'post_status' => $status), true);
        if (is_wp_error($published)) {
            AjaxRequest::fail('Termin gespeichert, aber Veröffentlichung fehlgeschlagen.', 500);
        }
        return $this->present((int) $saved);
    }

    private function changeStatus(string $operation, int $id): array
    {
        if (! RegionalEventAccess::canEdit($id)) {
            AjaxRequest::fail('Kein Zugriff auf diesen Termin.', 403);
        }
        $result = 'trash' === $operation ? wp_trash_post($id) : wp_untrash_post($id);
        if (! $result) {
            AjaxRequest::fail('Status konnte nicht geändert werden.', 409);
        }
        if($operation==='restore')update_post_meta($id,'strc_archive_restored',gmdate(DATE_ATOM));
        return array('id' => $id);
    }

    private function admins(): array
    {
        if (! RegionalEventAccess::isGlobal() || ! current_user_can('edit_users')) {
            AjaxRequest::fail('Nur der Clubadmin darf Regionsrechte zuweisen.', 403);
        }
        $users = get_users(array('orderby' => 'display_name', 'number' => 1000));
        return array('users' => array_map(static fn ($user): array => array('id' => (int) $user->ID, 'name' => $user->display_name, 'regions' => RegionalEventAccess::regions((int) $user->ID)), $users));
    }

    private function assign(array $input): array
    {
        $id = absint($input['userId'] ?? 0);
        if (! RegionalEventAccess::isGlobal() || ! current_user_can('edit_users') || ! current_user_can('edit_user', $id)) {
            AjaxRequest::fail('Nur der Clubadmin darf Regionsrechte zuweisen.', 403);
        }
        if (! get_user_by('id', $id)) {
            AjaxRequest::fail('Person nicht gefunden.', 404);
        }
        if(\SwissTRClub\Core\Roles\RoleAssignments::scoped($id))AjaxRequest::fail('Zuständigkeiten bitte über die Rollenverwaltung ändern.',409);
        $ids = '' === ($input['regions'] ?? '') ? array() : array_values(array_unique(array_map('absint', explode(',', $input['regions']))));
        foreach ($ids as $regionId) {
            $term = get_term($regionId, 'strc_region');
            if (! $term || is_wp_error($term) || 'outside-switzerland' === $term->slug) {
                AjaxRequest::fail('Ungültige Region.');
            }
        }
        update_user_meta($id, 'strc_managed_regions', $ids);
        return array('userId' => $id, 'regions' => $ids);
    }
}

<?php

use SwissTRClub\Core\Events\EventPostType;

if (! defined('ABSPATH') || 'local' !== wp_get_environment_type()) {
    fwrite(STDERR, "Local WordPress environment required.\n");
    exit(1);
}

$events = array(
    array(
        'slug' => 'grilltag-schwaderloch-2026',
        'title' => 'Grilltag Schwaderloch',
        'excerpt' => 'Geselliger Grilltag am Rhein mit gemeinsamer Anfahrt.',
        'content' => 'Gemeinsame Ausfahrt nach Schwaderloch mit anschliessendem Grilltag und Zeit für persönliche Gespräche.',
        'start' => '2026-09-12T10:00:00+02:00',
        'end' => '2026-09-12T17:00:00+02:00',
        'location' => 'Schwaderloch',
        'type' => 'Meeting',
        'scope' => 'Region',
        'region' => 'Nordwestschweiz',
        'registration' => true,
    ),
    array(
        'slug' => 'tr-club-weekend-solothurn-2026',
        'title' => 'TR-Club Weekend Solothurn',
        'excerpt' => 'Gemeinsames Clubwochenende mit Ausfahrten und Abendprogramm.',
        'content' => 'Ein Wochenende für Mitglieder aus allen Regionen mit gemeinsamen Fahrten, Austausch und Clubprogramm.',
        'start' => '2026-09-25T14:00:00+02:00',
        'end' => '2026-09-27T15:00:00+02:00',
        'location' => 'Solothurn',
        'type' => 'Multi-day Tour',
        'scope' => 'Club / National',
        'region' => 'Bern',
        'registration' => true,
    ),
    array(
        'slug' => 'techniktag-tr6-2026',
        'title' => 'Techniktag TR6',
        'excerpt' => 'Praxiswissen zu Wartung und zuverlässigem Betrieb.',
        'content' => 'Erfahrungsaustausch und praktische Hinweise rund um Wartung, Elektrik und Fehlersuche am Triumph TR6.',
        'start' => '2026-10-17T09:30:00+02:00',
        'end' => '2026-10-17T16:00:00+02:00',
        'location' => 'Zürich',
        'type' => 'Workshop',
        'scope' => 'Club / National',
        'region' => 'Zürich',
        'registration' => true,
    ),
    array(
        'slug' => 'international-tr-meeting-2026',
        'title' => 'Internationales TR-Treffen',
        'excerpt' => 'Begegnung mit Triumph-Clubs aus dem europäischen Ausland.',
        'content' => 'Hinweis auf ein extern organisiertes Treffen für Fahrerinnen und Fahrer klassischer Triumph-Sportwagen.',
        'start' => '2026-11-07T10:00:00+01:00',
        'end' => '2026-11-08T16:00:00+01:00',
        'location' => 'Basel',
        'type' => 'External Event',
        'scope' => 'External',
        'region' => 'Outside Switzerland',
        'registration' => false,
    ),
);

(new EventPostType())->seedTaxonomies();

foreach ($events as $event) {
    $existing = get_page_by_path($event['slug'], OBJECT, EventPostType::POST_TYPE);
    $postId = wp_insert_post(array(
        'ID' => $existing ? $existing->ID : 0,
        'post_type' => EventPostType::POST_TYPE,
        'post_status' => 'publish',
        'post_name' => $event['slug'],
        'post_title' => $event['title'],
        'post_excerpt' => $event['excerpt'],
        'post_content' => $event['content'],
    ), true);
    if (is_wp_error($postId)) {
        throw new RuntimeException($postId->get_error_message());
    }

    update_post_meta($postId, 'strc_start_at', $event['start']);
    update_post_meta($postId, 'strc_end_at', $event['end']);
    update_post_meta($postId, 'strc_location', $event['location']);
    update_post_meta($postId, 'strc_registration_required', $event['registration']);
    update_post_meta($postId, 'strc_registration_open_at', '2026-08-30T08:00:00+02:00');
    update_post_meta($postId, 'strc_registration_close_at', $event['start']);
    wp_set_object_terms($postId, $event['type'], 'strc_event_type');
    wp_set_object_terms($postId, $event['scope'], 'strc_event_scope');
    wp_set_object_terms($postId, $event['region'], 'strc_region');
}

echo "Local event content: PASS\n";

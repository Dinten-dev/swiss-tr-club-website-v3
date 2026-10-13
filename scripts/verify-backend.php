<?php

use SwissTRClub\Core\Integrations\Fairgate\FairgateConfiguration;

if (! defined('ABSPATH')) {
    fwrite(STDERR, "Run this file through WP-CLI eval-file.\n");
    exit(1);
}

/** @param mixed $condition */
function strc_assert($condition, string $message): void
{
    if (! $condition) {
        throw new RuntimeException($message);
    }
}

global $wpdb;

foreach (array('memberships') as $suffix) {
    $table = $wpdb->prefix . 'strc_' . $suffix;
    strc_assert($wpdb->get_var($wpdb->prepare('SHOW TABLES LIKE %s', $table)) === $table, "Missing table: {$table}");
}

$requiredCapabilities = array(
    'strc_member' => 'strc_access_member_area',
    'strc_editor' => 'strc_edit_website_content',
    'strc_administrator' => 'strc_manage_members',
    'strc_developer' => 'strc_manage_platform',
);
foreach ($requiredCapabilities as $roleName => $capability) {
    $role = get_role($roleName);
    strc_assert($role && $role->has_cap($capability), "Role capability missing: {$roleName}/{$capability}");
}

$member = $wpdb->get_row(
    "SELECT m.*, u.user_email FROM {$wpdb->prefix}strc_memberships m
     INNER JOIN {$wpdb->users} u ON u.ID = m.user_id
     WHERE m.status = 'active' ORDER BY m.id ASC LIMIT 1",
    ARRAY_A
);
strc_assert(is_array($member), 'No active membership found.');
$user = get_userdata((int) $member['user_id']);
strc_assert($user instanceof WP_User, 'Member account not found.');
strc_assert(user_can($user, 'strc_access_member_area'), 'Active member access denied.');

$fairgate = FairgateConfiguration::fromConstants();
strc_assert(is_bool($fairgate->isConfigured()), 'Fairgate configuration state is invalid.');
strc_assert(false === has_action('strc_process_bulk_mail'), 'Legacy bulk mail processor is still active.');

$eventIds = array();
try {
    $publishedEventId = wp_insert_post(array(
        'post_type' => 'strc_event',
        'post_status' => 'publish',
        'post_title' => 'STRC Endpoint-Verifikation',
        'post_excerpt' => 'Öffentlicher Testtermin.',
        'post_content' => 'Synthetischer Integrationstest.',
    ));
    $draftEventId = wp_insert_post(array(
        'post_type' => 'strc_event',
        'post_status' => 'draft',
        'post_title' => 'STRC Versteckter Entwurf',
    ));
    strc_assert(is_int($publishedEventId) && $publishedEventId > 0, 'Published event creation failed.');
    strc_assert(is_int($draftEventId) && $draftEventId > 0, 'Draft event creation failed.');
    $eventIds = array($publishedEventId, $draftEventId);
    update_post_meta($publishedEventId, 'strc_start_at', gmdate(DATE_ATOM, strtotime('+10 days')));
    update_post_meta($publishedEventId, 'strc_location', 'Testort');
    rest_get_server();
    $eventRequest = new WP_REST_Request('GET', '/strc/v1/events');
    $eventRequest->set_param('view', 'all');
    $eventResponse = rest_do_request($eventRequest);
    $eventData = $eventResponse->get_data();
    strc_assert(200 === $eventResponse->get_status(), 'Public event endpoint failed.');
    strc_assert(is_array($eventData), 'Public event response is invalid.');
    $publicEventIds = array_map('intval', array_column($eventData['events'] ?? array(), 'id'));
    strc_assert(in_array($publishedEventId, $publicEventIds, true), 'Published event is missing publicly.');
    strc_assert(! in_array($draftEventId, $publicEventIds, true), 'Draft event leaked publicly.');

} finally {
    foreach ($eventIds as $eventId) {
        wp_delete_post($eventId, true);
    }
}

echo "STRC backend verification: PASS\n";

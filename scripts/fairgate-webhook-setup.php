<?php
/** wp --user=<webmaster> eval-file scripts/fairgate-webhook-setup.php [activate] */
if (!defined('WP_CLI') || !WP_CLI || !current_user_can('strc_manage_platform')) throw new RuntimeException('Webmaster-Zugriff erforderlich.');

use SwissTRClub\Core\Integrations\Fairgate\FairgateClient;
use SwissTRClub\Core\Integrations\Fairgate\FairgateConfiguration;
use SwissTRClub\Core\Integrations\Fairgate\FairgateWebhook;

$config = FairgateConfiguration::fromConstants();
$client = new FairgateClient($config);
$token = $client->createAccessToken();
$available = $client->notificationEvents($token);
$subscribed = $client->notificationEvents($token, true);
if (!array_is_list($available) || !array_is_list($subscribed)) throw new RuntimeException('Unbekanntes Subscription-Format.');
$events = array_values(array_intersect(['contact.data.updated','contact.created','contact.deleted','contact.job.complete'], array_column($available, 'event')));
if (!in_array('contact.data.updated', $events, true)) throw new RuntimeException('Änderungsereignis nicht verfügbar.');
if (($args[0] ?? '') === 'activate') {
    if (!FairgateWebhook::enabled()) throw new RuntimeException('Empfänger zuerst konfigurieren.');
    $endpoint = home_url('/wp-json/strc/v1/fairgate/events/'.STRC_FAIRGATE_WEBHOOK_SECRET);
    foreach ($subscribed as $entry) {
        if (in_array($entry['event'] ?? '', $events, true) && ($entry['endpoint'] ?? '') !== $endpoint) throw new RuntimeException('Bestehenden fremden Callback zuerst klären.');
    }
    $existing = array_column($subscribed, 'event');
    $missing = array_values(array_diff($events, $existing));
    if ($missing) $client->subscribeNotifications($token, $missing, $endpoint);
    $verified = $client->notificationEvents($token, true);
    foreach ($events as $event) {
        $matches = array_filter($verified, static fn(array $r): bool => ($r['event'] ?? '') === $event && ($r['endpoint'] ?? '') === $endpoint);
        if (count($matches) !== 1) throw new RuntimeException('Registrierung nicht bestätigt; vor Wiederholung Abonnements prüfen.');
    }
    echo wp_json_encode(['registeredEvents' => $events, 'verified' => true]);
} else {
    echo wp_json_encode(['availableEvents' => array_column($available, 'event'), 'subscribedEvents' => array_column($subscribed, 'event'), 'receiver' => FairgateWebhook::status()]);
}

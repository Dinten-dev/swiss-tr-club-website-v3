<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Mail;

use SwissTRClub\Core\Members\MembershipRepository;

final class NewsletterEndpoint
{
    public function registerHooks(): void
    {
        add_action('wp_ajax_strc_newsletter', array($this, 'respond'));
        add_action('wp_ajax_nopriv_strc_newsletter', array($this, 'respond'));
        add_action('strc_newsletter_sync_pending', array($this, 'syncPending'));
        if (! wp_next_scheduled('strc_newsletter_sync_pending')) {
            wp_schedule_event(time() + 300, 'hourly', 'strc_newsletter_sync_pending');
        }
    }

    public function respond(): void
    {
        nocache_headers();
        $operationInput = wp_unslash($_REQUEST['operation'] ?? '');
        $operation = is_string($operationInput) ? sanitize_key($operationInput) : '';
        if ('confirm' === $operation || 'unsubscribe' === $operation) {
            $this->processLink($operation);
        }
        if ('subscribe' !== $operation || 'POST' !== ($_SERVER['REQUEST_METHOD'] ?? 'GET')) {
            wp_send_json_error(array('message' => 'Ungültige Anfrage.'), 400);
        }
        $origin = rtrim(sanitize_url(wp_unslash($_SERVER['HTTP_ORIGIN'] ?? '')), '/');
        $allowed = array(rtrim(home_url(), '/'));
        if (defined('STRC_FRONTEND_ORIGIN')) {
            $allowed[] = rtrim((string) STRC_FRONTEND_ORIGIN, '/');
        }
        if ($origin && ! in_array($origin, $allowed, true)) {
            wp_send_json_error(array('message' => 'Anfrage nicht erlaubt.'), 403);
        }
        $input = wp_unslash($_POST);
        if (! empty($input['website'])) {
            wp_send_json_success(array('message' => 'Bitte E-Mail prüfen und Anmeldung bestätigen.'));
        }
        $emailInput = $input['email'] ?? '';
        $nameInput = $input['name'] ?? '';
        $email = is_string($emailInput) ? sanitize_email($emailInput) : '';
        $name = is_string($nameInput) ? sanitize_text_field($nameInput) : '';
        $consent = $input['consent'] ?? '';
        if (! is_email($email) || ! is_string($consent) || '1' !== $consent) {
            wp_send_json_error(array('message' => 'Bitte E-Mail-Adresse und Einwilligung prüfen.'), 422);
        }
        $email = strtolower($email);
        $ip = sanitize_text_field(wp_unslash($_SERVER['REMOTE_ADDR'] ?? ''));
        foreach (array('email-' . $email, 'ip-' . $ip) as $key) {
            $transient = 'strc_newsletter_' . hash('sha256', $key);
            $count = (int) get_transient($transient);
            if ($count >= 5) {
                wp_send_json_error(array('message' => 'Bitte später erneut versuchen.'), 429);
            }
            set_transient($transient, $count + 1, HOUR_IN_SECONDS);
        }

        global $wpdb;
        $table = $wpdb->prefix . 'strc_newsletter_subscribers';
        $token = bin2hex(random_bytes(32));
        $unsubscribe = bin2hex(random_bytes(32));
        $userId = 0;
        $user = get_user_by('email', $email);
        if ($user) {
            $membership = (new MembershipRepository())->findForUser((int) $user->ID);
            if ($membership && 'active' === ($membership['status'] ?? '')) {
                $userId = (int) $user->ID;
            }
        }
        $record = array(
            'user_id' => $userId ?: null,
            'display_name' => $name,
            'status' => 'pending',
            'confirmation_hash' => hash('sha256', $token),
            'unsubscribe_hash' => hash('sha256', $unsubscribe),
            'consent_source' => 'website-form',
            'requested_at' => current_time('mysql'),
            'confirmed_at' => null,
            'unsubscribed_at' => null,
            'brevo_status' => 'idle',
            'brevo_attempts' => 0,
            'brevo_updated_at' => null,
        );
        $existing = $wpdb->get_var($wpdb->prepare("SELECT id FROM {$table} WHERE email = %s", $email));
        if ($existing) {
            $wpdb->update($table, $record, array('id' => (int) $existing));
        } else {
            $wpdb->insert($table, array_merge(array('email' => $email), $record));
        }
        if ($wpdb->last_error) {
            wp_send_json_error(array('message' => 'Anmeldung konnte nicht gespeichert werden. Bitte erneut versuchen.'), 503);
        }

        $confirmUrl = add_query_arg(array('action' => 'strc_newsletter', 'operation' => 'confirm', 'email' => $email, 'token' => $token), admin_url('admin-ajax.php'));
        $unsubscribeUrl = add_query_arg(array('action' => 'strc_newsletter', 'operation' => 'unsubscribe', 'email' => $email, 'token' => $unsubscribe), admin_url('admin-ajax.php'));
        $subject = 'Bitte bestätige deine Anmeldung zum Swiss TR-Club Newsletter';
        $body = '<p>Guten Tag' . ($name ? ' ' . esc_html($name) : '') . ',</p><p>Du hast dich für den Newsletter des Swiss TR-Club angemeldet. Bitte bestätige deine Anmeldung:</p><p><a href="' . esc_url($confirmUrl) . '">Newsletter-Anmeldung bestätigen</a></p><p>Die Bestätigung ist einmalig und kann jederzeit widerrufen werden. Falls du dich nicht angemeldet hast, kannst du diese Nachricht ignorieren.</p><p><a href="' . esc_url($unsubscribeUrl) . '">Anmeldung widerrufen</a></p>';
        if (! wp_mail($email, $subject, $body, array('Content-Type: text/html; charset=UTF-8'))) {
            wp_send_json_error(array('message' => 'Bestätigungsnachricht konnte nicht versendet werden. Bitte später erneut versuchen.'), 503);
        }
        wp_send_json_success(array('message' => 'Bitte bestätige deine Anmeldung über den Link in der E-Mail.'));
    }

    private function processLink(string $operation): never
    {
        global $wpdb;
        $emailInput = wp_unslash($_GET['email'] ?? '');
        $tokenInput = wp_unslash($_GET['token'] ?? '');
        $email = is_string($emailInput) ? strtolower(sanitize_email($emailInput)) : '';
        $token = is_string($tokenInput) ? sanitize_text_field($tokenInput) : '';
        $table = $wpdb->prefix . 'strc_newsletter_subscribers';
        $row = $wpdb->get_row($wpdb->prepare("SELECT id, status, confirmation_hash, unsubscribe_hash FROM {$table} WHERE email = %s", $email), ARRAY_A);
        if (! $row || ! preg_match('/^[a-f0-9]{64}$/D', $token)) {
            $this->redirect('invalid');
        }
        $hash = hash('sha256', $token);
        if ('confirm' === $operation && 'pending' === $row['status'] && hash_equals((string) $row['confirmation_hash'], $hash)) {
            $wpdb->update($table, array('status' => 'confirmed', 'confirmation_hash' => null, 'confirmed_at' => current_time('mysql'), 'brevo_status' => 'pending', 'brevo_attempts' => 0), array('id' => (int) $row['id']));
            wp_schedule_single_event(time() + 15, 'strc_newsletter_sync_pending');
            $this->redirect('confirmed');
        }
        if ('unsubscribe' === $operation && in_array($row['status'], array('pending', 'confirmed'), true) && hash_equals((string) $row['unsubscribe_hash'], $hash)) {
            $wpdb->update($table, array('status' => 'unsubscribed', 'unsubscribed_at' => current_time('mysql'), 'brevo_status' => 'remove_pending', 'brevo_attempts' => 0), array('id' => (int) $row['id']));
            wp_schedule_single_event(time() + 15, 'strc_newsletter_sync_pending');
            $this->redirect('unsubscribed');
        }
        $this->redirect('invalid');
    }

    private function redirect(string $status): never
    {
        wp_safe_redirect(add_query_arg('newsletter', $status, home_url('/')));
        exit;
    }

    public function syncPending(): void
    {
        $apiKey = defined('STRC_BREVO_API_KEY') ? (string) STRC_BREVO_API_KEY : (string) getenv('STRC_BREVO_API_KEY');
        $listId = defined('STRC_BREVO_LIST_ID') ? absint(STRC_BREVO_LIST_ID) : absint(getenv('STRC_BREVO_LIST_ID'));
        if ('' === $apiKey || $listId < 1) {
            return;
        }
        global $wpdb;
        $table = $wpdb->prefix . 'strc_newsletter_subscribers';
        $rows = $wpdb->get_results("SELECT id, email, status, brevo_status, brevo_attempts FROM {$table} WHERE (status = 'confirmed' AND brevo_status = 'pending') OR (status = 'unsubscribed' AND brevo_status = 'remove_pending') ORDER BY id ASC LIMIT 25", ARRAY_A);
        foreach (is_array($rows) ? $rows : array() as $row) {
            $email = sanitize_email((string) $row['email']);
            $remove = 'unsubscribed' === $row['status'];
            $path = $remove ? '/v3/contacts/lists/' . $listId . '/contacts/remove' : '/v3/contacts';
            $body = $remove ? array('emails' => array($email)) : array('email' => $email, 'listIds' => array($listId), 'updateEnabled' => true);
            $response = wp_remote_post('https://api.brevo.com' . $path, array(
                'timeout' => 12,
                'headers' => array('api-key' => $apiKey, 'Content-Type' => 'application/json', 'Accept' => 'application/json'),
                'body' => wp_json_encode($body),
            ));
            $code = is_wp_error($response) ? 0 : (int) wp_remote_retrieve_response_code($response);
            $wpdb->update($table, array(
                'brevo_status' => $code >= 200 && $code < 300 ? ($remove ? 'removed' : 'synced') : $row['brevo_status'],
                'brevo_attempts' => (int) $row['brevo_attempts'] + 1,
                'brevo_updated_at' => current_time('mysql'),
            ), array('id' => (int) $row['id']));
        }
    }
}

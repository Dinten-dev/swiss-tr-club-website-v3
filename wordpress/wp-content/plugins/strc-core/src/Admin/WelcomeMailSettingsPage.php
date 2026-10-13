<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Admin;

use SwissTRClub\Core\Mail\WelcomeMailSettings;

final class WelcomeMailSettingsPage
{
    public function registerHooks(): void
    {
        add_options_page('Willkommensmail', 'Willkommensmail', 'strc_manage_member_welcome_mail', 'strc-welcome-mail', array($this, 'render'));
        add_action('admin_post_strc_welcome_mail_save', array($this, 'save'));
    }

    public function save(): void
    {
        if (! current_user_can('strc_manage_member_welcome_mail')) wp_die('Keine Berechtigung.', '', array('response' => 403));
        check_admin_referer('strc_welcome_mail_save');
        $settings = array('enabled' => isset($_POST['enabled']));
        foreach (array('de', 'fr') as $language) {
            $subjectRaw = $_POST['subject_' . $language] ?? '';
            $bodyRaw = $_POST['body_' . $language] ?? '';
            if (! is_string($subjectRaw) || ! is_string($bodyRaw)) wp_die('Ungültige Vorlage.', '', array('response' => 422));
            $subject = sanitize_text_field(wp_unslash($subjectRaw));
            $body = sanitize_textarea_field(wp_unslash($bodyRaw));
            if ($subject === '' || $body === '' || mb_strlen($subject) > 200 || mb_strlen($body) > 12000) {
                wp_die('Betreff und Text müssen ausgefüllt sein. Maximal 200 beziehungsweise 12 000 Zeichen.', '', array('response' => 422));
            }
            preg_match_all('/\{\{([a-z_]+)\}\}/', $subject . "\n" . $body, $matches);
            if (array_diff(array_unique($matches[1]), WelcomeMailSettings::placeholders())) {
                wp_die('Die Vorlage enthält einen unbekannten Platzhalter.', '', array('response' => 422));
            }
            $settings[$language] = array('subject' => $subject, 'body' => $body);
        }
        update_option('strc_member_welcome_mail', $settings, false);
        wp_safe_redirect(add_query_arg(array('page' => 'strc-welcome-mail', 'updated' => '1'), admin_url('options-general.php')));
        exit;
    }

    public function render(): void
    {
        if (! current_user_can('strc_manage_member_welcome_mail')) wp_die('Keine Berechtigung.', '', array('response' => 403));
        $settings = WelcomeMailSettings::all();
        echo '<div class="wrap"><h1>Willkommensmail</h1><p>Diese Vorlage wird nach der bestätigten Aufnahme verwendet. Sie bleibt standardmässig deaktiviert; beim Speichern ohne aktiviertes Kästchen wird keine Willkommensmail versandt.</p>';
        if (isset($_GET['updated'])) echo '<div class="notice notice-success"><p>Vorlage gespeichert.</p></div>';
        echo '<form method="post" action="' . esc_url(admin_url('admin-post.php')) . '">';
        wp_nonce_field('strc_welcome_mail_save');
        echo '<input type="hidden" name="action" value="strc_welcome_mail_save">';
        echo '<p><label><input type="checkbox" name="enabled" value="1" ' . checked($settings['enabled'], true, false) . '> Versand bei neuen bestätigten Mitgliedschaften aktivieren</label></p>';
        echo '<p>Platzhalter: <code>{{first_name}}</code>, <code>{{member_number}}</code>, <code>{{region}}</code>, <code>{{password_url}}</code>, <code>{{dashboard_url}}</code>, <code>{{profile_url}}</code>, <code>{{agenda_url}}</code>, <code>{{regions_url}}</code>, <code>{{forum_url}}</code>, <code>{{gallery_url}}</code>, <code>{{library_url}}</code>, <code>{{marketplace_url}}</code>, <code>{{contact_url}}</code>.</p>';
        foreach (array('de' => 'Deutsch', 'fr' => 'Français') as $language => $label) {
            echo '<h2>' . esc_html($label) . '</h2><p><label>Betreff<br><input class="large-text" type="text" maxlength="200" name="subject_' . esc_attr($language) . '" value="' . esc_attr($settings[$language]['subject']) . '"></label></p>';
            echo '<p><label>Nachricht<br><textarea class="large-text" rows="18" maxlength="12000" name="body_' . esc_attr($language) . '">' . esc_textarea($settings[$language]['body']) . '</textarea></label></p>';
        }
        submit_button('Vorlage speichern');
        echo '</form></div>';
    }
}

<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Mail;

use SwissTRClub\Core\Http\AjaxRequest;

/** Redaktion: Mailvorlagen bearbeiten, Vorschau, Testmail an sich selbst und Versandprotokoll (nur STRC-Admin/Superadmin). */
final class MailTemplatesEndpoint
{
    public function registerHooks(): void
    {
        add_action('wp_ajax_strc_mail_templates', array($this, 'respond'));
    }

    public function respond(): void
    {
        [$operation, $input] = AjaxRequest::read('strc_mail_templates', array('save', 'reset', 'test'));
        if (! MailTemplates::canManage()) AjaxRequest::fail('Mailvorlagen verwalten nur STRC-Admins und Superadmins.', 403);
        header('Cache-Control: private, no-store, max-age=0');
        try {
            wp_send_json_success(match ($operation) {
                'list' => $this->listing(),
                'save' => $this->save($input),
                'reset' => $this->reset($input),
                'preview' => $this->preview($input, false),
                'test' => $this->preview($input, true),
                'log' => array('entries' => MailLog::entries((string) ($input['search'] ?? ''))),
                default => AjaxRequest::fail('Unbekannte Anfrage.', 400),
            });
        } catch (\InvalidArgumentException $error) {
            AjaxRequest::fail($error->getMessage(), 422);
        }
    }

    private function listing(): array
    {
        $saved = MailTemplates::saved();
        $rows = array();
        foreach (MailTemplates::registry() as $key => $entry) {
            $row = array('key' => $key, 'group' => $entry['group'], 'label' => $entry['label'], 'recipient' => $entry['recipient'], 'placeholders' => array_values($entry['placeholders']), 'required' => array_values($entry['required']), 'note' => (string) ($entry['note'] ?? ''), 'woo' => ! empty($entry['woo']), 'welcome' => ! empty($entry['welcome']));
            foreach (array('de', 'fr') as $language) {
                $row[$language] = MailTemplates::template($key, $language);
                $row['default'][$language] = ($entry[$language] ?? array()) + array('heading' => '');
            }
            $row['customized'] = ! empty($entry['welcome']) ? (bool) get_option('strc_member_welcome_mail') : isset($saved[$key]);
            if (! empty($entry['welcome'])) $row['enabled'] = WelcomeMailSettings::enabled();
            $rows[] = $row;
        }
        return array('templates' => $rows, 'nonce' => wp_create_nonce('strc_mail_templates'), 'email' => wp_get_current_user()->user_email);
    }

    /** @return array{0:string,1:array} */
    private function entry(array $input): array
    {
        $key = (string) ($input['key'] ?? '');
        $registry = MailTemplates::registry();
        if (! isset($registry[$key])) throw new \InvalidArgumentException('Unbekannte Mailvorlage.');
        return array($key, $registry[$key]);
    }

    private function values(array $input, array $entry): array
    {
        $values = json_decode((string) ($input['values'] ?? ''), true);
        if (! is_array($values)) throw new \InvalidArgumentException('Bitte die Vorlage prüfen.');
        $clean = array();
        foreach (array('de', 'fr') as $language) {
            foreach (array('subject', 'heading', 'body') as $field) {
                $value = $values[$language][$field] ?? '';
                if (! is_string($value) || mb_strlen($value) > ($field === 'body' ? 8000 : 200)) throw new \InvalidArgumentException('Text zu lang oder ungültig.');
                $value = str_replace("\r\n", "\n", sanitize_textarea_field($value));
                if ($field !== 'body') $value = sanitize_text_field($value);
                $clean[$language][$field] = $value;
            }
            if (empty($entry['woo'])) {
                if (trim($clean[$language]['subject']) === '' || trim($clean[$language]['body']) === '') throw new \InvalidArgumentException('Betreff und Text dürfen nicht leer sein (' . strtoupper($language) . ').');
                foreach ($entry['required'] as $required) {
                    if (! str_contains($clean[$language]['subject'] . $clean[$language]['body'], '{{' . $required . '}}')) throw new \InvalidArgumentException('Der Platzhalter {{' . $required . '}} fehlt (' . strtoupper($language) . ').');
                }
            }
            preg_match_all('/\{\{([a-z_]+)\}\}/', implode(' ', $clean[$language]), $found);
            $unknown = array_diff(array_unique($found[1]), $entry['placeholders']);
            if ($unknown) throw new \InvalidArgumentException('Unbekannter Platzhalter: {{' . reset($unknown) . '}} (' . strtoupper($language) . ').');
        }
        return $clean;
    }

    private function save(array $input): array
    {
        [$key, $entry] = $this->entry($input);
        $clean = $this->values($input, $entry);
        if (! empty($entry['welcome'])) {
            update_option('strc_member_welcome_mail', array('enabled' => ($input['enabled'] ?? '') === '1', 'de' => array('subject' => $clean['de']['subject'], 'body' => $clean['de']['body']), 'fr' => array('subject' => $clean['fr']['subject'], 'body' => $clean['fr']['body'])), false);
        } else {
            $saved = MailTemplates::saved();
            $saved[$key] = $clean;
            update_option(MailTemplates::OPTION, $saved, false);
        }
        return array('message' => 'Vorlage gespeichert.') + $this->listing();
    }

    private function reset(array $input): array
    {
        [$key, $entry] = $this->entry($input);
        if (! empty($entry['welcome'])) delete_option('strc_member_welcome_mail');
        else {
            $saved = MailTemplates::saved();
            unset($saved[$key]);
            update_option(MailTemplates::OPTION, $saved, false);
        }
        return array('message' => 'Standardtext wiederhergestellt.') + $this->listing();
    }

    /** Vorschau mit Beispieldaten aus dem Formularinhalt (noch nicht gespeichert); Testmail nur an die eigene Adresse. */
    private function preview(array $input, bool $send): array
    {
        [$key, $entry] = $this->entry($input);
        $clean = $this->values($input, $entry);
        $language = ($input['language'] ?? 'de') === 'fr' ? 'fr' : 'de';
        $replace = array();
        foreach (MailTemplates::sample($key) as $name => $value) $replace['{{' . $name . '}}'] = $value;
        $subject = strtr($clean[$language]['subject'], $replace);
        $body = strtr($clean[$language]['body'], $replace);
        if (! empty($entry['note'])) $body .= "\n\n[" . ($language === 'fr' ? 'Exemple' : 'Beispiel') . '] ' . $entry['note'];
        if (! $send) return array('subject' => $subject, 'heading' => strtr($clean[$language]['heading'], $replace), 'body' => $body, 'html' => empty($entry['woo']) ? MailLayout::layout($subject, MailLayout::textToHtml($body)) : '');
        $email = wp_get_current_user()->user_email;
        if (! is_email($email)) throw new \InvalidArgumentException('Für dein Konto ist keine gültige E-Mail-Adresse hinterlegt.');
        MailLog::context('Testmail: ' . MailTemplates::label($key));
        $sent = wp_mail($email, '[Test] ' . ($subject !== '' ? $subject : MailTemplates::label($key)), $body, array('Content-Type: text/plain; charset=UTF-8', 'From: Swiss TR-Club <no-reply@swisstrclub.ch>'));
        if (! $sent) throw new \InvalidArgumentException('Die Testmail konnte nicht versendet werden.');
        return array('message' => 'Testmail an ' . $email . ' gesendet.');
    }
}

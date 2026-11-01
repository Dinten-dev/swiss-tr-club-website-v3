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
        [$operation, $input] = AjaxRequest::read('strc_mail_templates', array('save', 'reset', 'preview', 'test'));
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
        } catch (\RuntimeException $error) {
            AjaxRequest::fail($error->getMessage(), 409);
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
            $row['customized'] = ! empty($entry['welcome']) ? ($row['de'] != $row['default']['de'] || $row['fr'] != $row['default']['fr']) : isset($saved[$key]);
            $row['revision'] = self::revision(! empty($entry['welcome']) ? get_option('strc_member_welcome_mail', null) : ($saved[$key] ?? null));
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
            $text = implode(' ', $clean[$language]);
            preg_match_all('/\{\{([^{}]*)\}\}/', $text, $found);
            $unknown = array_diff(array_unique($found[1]), $entry['placeholders']);
            if ($unknown) throw new \InvalidArgumentException('Unbekannter Platzhalter: {{' . reset($unknown) . '}} (' . strtoupper($language) . ').');
            if (str_contains(str_replace($found[0], '', $text), '{{') || str_contains(str_replace($found[0], '', $text), '}}')) throw new \InvalidArgumentException('Bitte die Platzhalter vollständig mit {{ und }} schreiben.');
        }
        return $clean;
    }

    private function save(array $input): array
    {
        [$key, $entry] = $this->entry($input);
        $clean = $this->values($input, $entry);
        $value = ! empty($entry['welcome']) ? array('enabled' => ($input['enabled'] ?? '') === '1', 'de' => array('subject' => $clean['de']['subject'], 'body' => $clean['de']['body']), 'fr' => array('subject' => $clean['fr']['subject'], 'body' => $clean['fr']['body'])) : $clean;
        $this->store($key, $entry, $input, $value);
        return array('message' => 'Vorlage gespeichert.') + $this->listing();
    }

    private function reset(array $input): array
    {
        [$key, $entry] = $this->entry($input);
        $this->store($key, $entry, $input, null);
        return array('message' => 'Standardtext wiederhergestellt.') + $this->listing();
    }

    private static function revision($value): string
    {
        return hash('sha256', serialize($value));
    }

    /** Compare the edited template, then atomically replace the option; unrelated edits can retry. */
    private function store(string $key, array $entry, array $input, ?array $value): void
    {
        global $wpdb;
        $welcome = ! empty($entry['welcome']);
        $option = $welcome ? 'strc_member_welcome_mail' : MailTemplates::OPTION;
        for ($attempt = 0; $attempt < 3; $attempt++) {
            wp_cache_delete($option, 'options');
            wp_cache_delete('alloptions', 'options');
            $old = get_option($option, null);
            $current = $welcome ? $old : (is_array($old) ? ($old[$key] ?? null) : null);
            if (! hash_equals(self::revision($current), (string) ($input['revision'] ?? ''))) throw new \RuntimeException('Diese Vorlage wurde inzwischen geändert. Deine Eingabe bleibt erhalten. Bitte die aktuelle Vorlage in einem zweiten Fenster vergleichen.', 409);
            // Reset the wording, never silently switch the welcome-mail delivery off.
            $next = $welcome ? ($value ?? array('enabled' => is_array($old) && ! empty($old['enabled']))) : (is_array($old) ? $old : array());
            if (! $welcome) { if ($value === null) unset($next[$key]); else $next[$key] = $value; }
            if ($next === $old) return;
            if ($old === null) $saved = $next === null || add_option($option, $next, '', false);
            elseif ($next === null) $saved = $wpdb->query($wpdb->prepare("DELETE FROM {$wpdb->options} WHERE option_name = %s AND option_value = %s", $option, maybe_serialize($old))) === 1;
            else $saved = $wpdb->update($wpdb->options, array('option_value' => maybe_serialize($next)), array('option_name' => $option, 'option_value' => maybe_serialize($old))) === 1;
            wp_cache_delete($option, 'options');
            wp_cache_delete('alloptions', 'options');
            wp_cache_delete('notoptions', 'options');
            if ($saved) return;
        }
        throw new \RuntimeException('Die Vorlage konnte nicht gespeichert werden. Deine Eingabe bleibt erhalten. Bitte erneut versuchen.', 409);
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
        $heading = strtr($clean[$language]['heading'], $replace);
        $note = ! empty($entry['note']) ? '[' . ($language === 'fr' ? 'Exemple' : 'Beispiel') . '] ' . $entry['note'] : '';
        // WooCommerce-Mails: Überschrift, Bestellübersicht (Beispiel) und Zusatztext wie in der echten Mail zeigen.
        $inner = ! empty($entry['woo']) ? self::wooSample($heading, $body, $language) : MailLayout::textToHtml($body);
        if ($note !== '') $inner .= '<p style="margin:18px 0 0;color:#6b7c88;font-size:13px">' . esc_html($note) . '</p>';
        if (! $send) return array('subject' => $subject, 'heading' => $heading, 'body' => $body . ($note !== '' ? "\n\n" . $note : ''), 'html' => MailLayout::layout($subject, $inner, MailLayout::logoData()));
        $email = wp_get_current_user()->user_email;
        if (! is_email($email)) throw new \InvalidArgumentException('Für dein Konto ist keine gültige E-Mail-Adresse hinterlegt.');
        MailLog::context('Testmail: ' . MailTemplates::label($key));
        $title = '[Test] ' . ($subject !== '' ? $subject : MailTemplates::label($key));
        $sent = wp_mail($email, $title, MailLayout::layout($title, $inner), array('Content-Type: text/html; charset=UTF-8', 'From: Swiss TR-Club <no-reply@swisstrclub.ch>'));
        if (! $sent) throw new \InvalidArgumentException('Die Testmail konnte nicht versendet werden.');
        return array('message' => 'Testmail an ' . $email . ' gesendet.');
    }

    /** Beispiel einer WooCommerce-Bestellmail: Überschrift, Bestellübersicht und Zusatztext (Vorschau und Testmail). */
    private static function wooSample(string $heading, string $body, string $language): string
    {
        $fr = $language === 'fr';
        $cell = 'padding:8px;border:1px solid #e3eaf0;text-align:left';
        $html = '<h2 style="margin:0 0 14px;font:700 20px/1.3 Arial,Helvetica,sans-serif;color:' . MailLayout::BLUE . '">' . esc_html($heading !== '' ? $heading : ($fr ? '(titre WooCommerce)' : '(WooCommerce-Überschrift)')) . '</h2>';
        $html .= '<p style="margin:0 0 8px;color:#6b7c88;font-size:13px">' . esc_html($fr ? '[Exemple] WooCommerce insère ici la commande :' : '[Beispiel] Hier fügt WooCommerce die Bestellung ein:') . '</p>';
        $html .= '<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin:0 0 16px;font-size:14px">'
            . '<tr><th style="' . $cell . '">' . ($fr ? 'Produit' : 'Produkt') . '</th><th style="' . $cell . '">' . ($fr ? 'Quantité' : 'Anzahl') . '</th><th style="' . $cell . '">' . ($fr ? 'Prix' : 'Preis') . '</th></tr>'
            . '<tr><td style="' . $cell . '">TR-Club Polo – Navy, M, ' . ($fr ? 'Manche' : 'Ärmel') . '</td><td style="' . $cell . '">1</td><td style="' . $cell . '">CHF 29.00</td></tr>'
            . '<tr><td style="' . $cell . '">TR-Club Cap</td><td style="' . $cell . '">2</td><td style="' . $cell . '">CHF 58.00</td></tr>'
            . '<tr><th style="' . $cell . '" colspan="2">' . ($fr ? 'Total' : 'Gesamtsumme') . '</th><th style="' . $cell . '">CHF 87.00</th></tr></table>'
            . '<p style="margin:0 0 16px;color:#6b7c88;font-size:13px">' . esc_html($fr ? '[Exemple] Adresses de facturation et de livraison' : '[Beispiel] Rechnungs- und Lieferadresse') . '</p>';
        return $html . ($body !== '' ? MailLayout::textToHtml($body) : '<p style="color:#6b7c88">' . esc_html($fr ? '(texte WooCommerce standard)' : '(WooCommerce-Standardtext)') . '</p>');
    }
}

<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Content;

use SwissTRClub\Core\Community\PrivateUploadStore;
use SwissTRClub\Core\Community\LibraryPolicy;
use SwissTRClub\Core\Http\AjaxRequest;

/** An explicitly selected library PDF; public preview text is entered separately. */
final class MagazineEndpoint
{
    private const OPTION = 'strc_homepage_magazine';

    public function registerHooks(): void
    {
        add_action('wp_ajax_strc_magazine', array($this, 'respond'));
        add_action('wp_ajax_nopriv_strc_magazine', array($this, 'respond'));
        add_action('admin_menu', function (): void {
            add_options_page('TR-Magazin', 'TR-Magazin', 'read', 'strc-magazine', array($this, 'adminPage'));
        });
    }

    private function selection(): ?array
    {
        $settings = get_option(self::OPTION, array());
        if (! is_array($settings) || empty($settings['title'])) {
            return null;
        }
        $post = get_post(absint($settings['document'] ?? 0));
        if (! $post || 'strc_document' !== $post->post_type || 'publish' !== $post->post_status || '' !== $post->post_password) {
            return null;
        }
        if(LibraryPolicy::classification((int)$post->ID)!=='open')return null;
        $files = get_post_meta($post->ID, 'strc_private_files', true);
        foreach (is_array($files) ? $files : array() as $file) {
            if (($file['key'] ?? '') === ($settings['key'] ?? '') && 'application/pdf' === ($file['mime'] ?? '')) {
                return array('settings' => $settings, 'file' => $file, 'id' => $post->ID);
            }
        }
        return null;
    }

    public function preview(string $language = 'de'): ?array
    {
        $selection = $this->selection();
        if (! $selection) {
            return null;
        }
        $settings = $selection['settings'];
        $pageIds = array_slice(array_values(array_unique(array_filter(array_map('absint', (array) ($settings['preview_pages'] ?? array())), 'wp_attachment_is_image'))), 0, 6);
        $pages = array_values(array_filter(array_map(static fn (int $id) => wp_get_attachment_image_url($id, 'large'), $pageIds)));
        $allowed = ! empty($settings['public']) || current_user_can('strc_access_member_area');
        $return = add_query_arg('magazine', $selection['id'], home_url('/'));
        return array(
            'id' => $selection['id'], 'title' => $language === 'fr' && !empty($settings['title_fr']) ? $settings['title_fr'] : $settings['title'],
            'teaser' => $language === 'fr' && !empty($settings['teaser_fr']) ? $settings['teaser_fr'] : ($settings['teaser'] ?? ''),
            'cover' => wp_get_attachment_image_url(absint($settings['cover'] ?? 0), 'large') ?: '',
            'previewPages' => count($pages) >= 3 ? $pages : array(),
            'previewCaptions'=>array_map(static fn($id)=>sanitize_text_field(get_post($id)->post_excerpt),$pageIds),
            'previewKind'=>count($pages)===3?'spreads':'pages',
            'public' => ! empty($settings['public']), 'canRead' => $allowed,
            'fileUrl' => $allowed ? add_query_arg(array('action' => 'strc_magazine', 'operation' => 'file', 'id' => $selection['id']), admin_url('admin-ajax.php')) : '',
            'loginUrl' => wp_login_url($return),
        );
    }

    public function respond(): void
    {
        [$operation, $input] = AjaxRequest::read('strc_magazine', array());
        header('Cache-Control: private, no-store, max-age=0');
        header('Vary: Cookie, Origin');
        if ('qr' === $operation) {
            $selection = $this->selection();
            if (! $selection || absint($input['id'] ?? 0) !== $selection['id']) {
                AjaxRequest::fail('Diese Ausgabe ist nicht mehr verfügbar.', 404);
            }
            if (! class_exists(\Endroid\QrCode\Builder\Builder::class)) {
                AjaxRequest::fail('Die QR-Code-Bibliothek ist nicht verfügbar.', 503);
            }
            $url = add_query_arg('magazine', $selection['id'], home_url('/'));
            $result = (new \Endroid\QrCode\Builder\Builder(
                writer: new \Endroid\QrCode\Writer\SvgWriter(),
                data: $url,
                size: 900,
                margin: 24,
                errorCorrectionLevel: \Endroid\QrCode\ErrorCorrectionLevel::High,
            ))->build();
            header('Content-Type: image/svg+xml; charset=utf-8');
            header('Content-Disposition: attachment; filename="swiss-tr-club-magazin-' . $selection['id'] . '-qr.svg"');
            echo $result->getString();
            exit;
        }
        if ('file' === $operation) {
            $selection = $this->selection();
            if (! $selection || absint($input['id'] ?? 0) !== $selection['id']) {
                AjaxRequest::fail('Diese Ausgabe ist nicht mehr verfügbar.', 404);
            }
            if (empty($selection['settings']['public']) && ! current_user_can('strc_access_member_area')) {
                AjaxRequest::fail('Bitte als Clubmitglied anmelden, um diese Ausgabe zu lesen.', 403);
            }
            (new PrivateUploadStore())->stream($selection['file']);
        }
        if ('list' !== $operation) {
            AjaxRequest::fail('Diese Anfrage ist nicht erlaubt.', 400);
        }
        $language = $input['language'] ?? 'de';
        if (!in_array($language, ['de','fr'], true)) AjaxRequest::fail('Bitte eine gültige Sprache wählen.', 422);
        wp_send_json_success(array('magazine' => $this->preview($language)));
    }

    public function adminPage(): void
    {
        if (! \SwissTRClub\Core\Editorial\EditorialAccess::area('library')) {
            return;
        }
        $message = '';
        $documents = get_posts(array('post_type' => 'strc_document', 'post_status' => 'publish', 'has_password' => false, 'numberposts' => -1, 'orderby' => 'title', 'order' => 'ASC'));
        $choices = array();
        foreach ($documents as $document) {
            if(LibraryPolicy::classification((int)$document->ID)!=='open')continue;
            $files = get_post_meta($document->ID, 'strc_private_files', true);
            foreach (is_array($files) ? $files : array() as $file) {
                if ('application/pdf' === ($file['mime'] ?? '')) {
                    $choices[$document->ID . ':' . $file['key']] = $document->post_title . ' – ' . $file['name'];
                }
            }
        }
        if ('POST' === ($_SERVER['REQUEST_METHOD'] ?? 'GET')) {
            check_admin_referer('strc_magazine_settings');
            $selected = sanitize_text_field(wp_unslash($_POST['pdf'] ?? ''));
            $title = sanitize_text_field(wp_unslash($_POST['title'] ?? ''));
            $previewPages = array_values(array_unique(array_filter(array_map('absint', explode(',', sanitize_text_field(wp_unslash($_POST['preview_pages'] ?? '')))))));
            if ('' === $selected) {
                delete_option(self::OPTION);
                $message = 'Die Ausgabe wurde von der Startseite entfernt. Die Datei bleibt in der Bibliothek.';
            } elseif (! isset($choices[$selected]) || '' === $title) {
                $message = 'Bitte eine vorhandene PDF-Datei auswählen und die Ausgabenbezeichnung ergänzen.';
            } elseif ($previewPages && (count($previewPages) < 3 || count($previewPages) > 6 || count(array_filter($previewPages, 'wp_attachment_is_image')) !== count($previewPages))) {
                $message = 'Bitte drei Doppelseiten oder vier bis sechs Einzelseiten Bilder für die öffentliche Vorschau auswählen oder die Vorschau entfernen. Die bisherigen Einstellungen bleiben erhalten.';
            } else {
                [$id, $key] = explode(':', $selected, 2);
                $cover = absint($_POST['cover'] ?? 0);
                update_option(self::OPTION, array(
                    'document' => (int) $id, 'key' => $key, 'title' => $title,
                    'teaser' => sanitize_textarea_field(wp_unslash($_POST['teaser'] ?? '')),
                    'title_fr' => sanitize_text_field(wp_unslash($_POST['title_fr'] ?? '')),
                    'teaser_fr' => sanitize_textarea_field(wp_unslash($_POST['teaser_fr'] ?? '')),
                    'cover' => wp_attachment_is_image($cover) ? $cover : 0,
                    'preview_pages' => $previewPages,
                    'public' => isset($_POST['public']),
                ), false);
                $message = 'Die Magazin-Ausgabe wurde gespeichert.';
            }
        }
        $settings = get_option(self::OPTION, array());
        wp_enqueue_media();
        wp_add_inline_script('media-editor', <<<'JS'
jQuery(function($){$('#strc-cover-pick').on('click',function(){const frame=wp.media({title:'Magazin-Cover auswählen',library:{type:'image'},multiple:false,button:{text:'Als Cover verwenden'}});frame.on('select',function(){const item=frame.state().get('selection').first().toJSON();$('#strc-cover').val(item.id);$('#strc-cover-preview').attr('src',item.url).show();});frame.open();});$('#strc-cover-clear').on('click',function(){$('#strc-cover').val('0');$('#strc-cover-preview').hide();});});
jQuery(function($){$('#strc-pages-pick').on('click',function(){const frame=wp.media({title:'Drei Doppelseiten oder vier bis sechs Einzelseiten öffentliche Vorschauseiten auswählen',library:{type:'image'},multiple:true,button:{text:'Als öffentliche Vorschau verwenden'}});frame.on('select',function(){const pages=frame.state().get('selection').toJSON();if(pages.length<3||pages.length>6){$('#strc-pages-status').text('Bitte drei Doppelseiten oder vier bis sechs Einzelseiten Seiten auswählen. Die bisherige Auswahl bleibt erhalten.');return;}$('#strc-pages').val(pages.map(page=>page.id).join(','));$('#strc-pages-preview').empty();pages.forEach(function(page,index){$('<img>',{src:page.url,alt:'Vorschauseite '+(index+1),style:'width:90px;height:126px;object-fit:contain;margin:8px 8px 0 0;'}).appendTo('#strc-pages-preview');});$('#strc-pages-status').text(pages.length+' Seiten ausgewählt. Zum Veröffentlichen Magazin speichern.');});frame.open();});$('#strc-pages-clear').on('click',function(){$('#strc-pages').val('');$('#strc-pages-preview').empty();$('#strc-pages-status').text('Vorschau entfernt. Zum Übernehmen Magazin speichern.');});});
JS
        );
        echo '<div class="wrap"><h1>TR-Magazin auf der Startseite</h1>';
        if ($message) {
            echo '<div class="notice notice-info"><p>' . esc_html($message) . '</p></div>';
        }
        echo '<p>Lade die Magazin-PDF zuerst im Mitgliederbereich unter Bibliothek hoch. Wähle sie anschliessend hier aus. Cover, Ausgabenbezeichnung und Kurztext sind öffentlich sichtbar; die PDF ist standardmässig nur für Mitglieder lesbar.</p><form method="post">';
        wp_nonce_field('strc_magazine_settings');
        echo '<table class="form-table"><tr><th><label for="strc-pdf">Magazin-PDF</label></th><td><select id="strc-pdf" name="pdf"><option value="">Noch keine Ausgabe anzeigen</option>';
        foreach ($choices as $value => $label) {
            echo '<option value="' . esc_attr($value) . '" ' . selected(($settings['document'] ?? '') . ':' . ($settings['key'] ?? ''), $value, false) . '>' . esc_html($label) . '</option>';
        }
        echo '</select></td></tr><tr><th><label for="strc-issue">Ausgabenbezeichnung</label></th><td><input class="regular-text" id="strc-issue" name="title" value="' . esc_attr($settings['title'] ?? '') . '"></td></tr><tr><th><label for="strc-teaser">Öffentlicher Kurztext</label></th><td><textarea class="large-text" rows="4" id="strc-teaser" name="teaser">' . esc_textarea($settings['teaser'] ?? '') . '</textarea></td></tr><tr><th>Öffentliches Cover</th><td><input type="hidden" id="strc-cover" name="cover" value="' . absint($settings['cover'] ?? 0) . '"><button type="button" class="button" id="strc-cover-pick">Cover auswählen / hochladen</button> <button type="button" class="button" id="strc-cover-clear">Cover entfernen</button><p><img id="strc-cover-preview" alt="Ausgewähltes Cover" style="max-width:180px;' . (empty($settings['cover']) ? 'display:none' : '') . '" src="' . esc_url(wp_get_attachment_image_url(absint($settings['cover'] ?? 0), 'medium') ?: '') . '"></p></td></tr><tr><th>Zugriff auf die PDF</th><td><label><input type="checkbox" name="public" value="1" ' . checked(! empty($settings['public']), true, false) . '> Diese vollständige Ausgabe ausdrücklich für alle Besucher freigeben</label><p class="description">Ohne Häkchen bleibt die PDF ausschliesslich für Clubmitglieder zugänglich.</p></td></tr></table>';
        echo '<h2>Französische Vorschautexte</h2><p>Die Inhalte der PDF werden nicht übersetzt. Diese Texte beschreiben den öffentlichen Magazin-Zugang.</p><p><label for="strc-issue-fr">Ausgabenbezeichnung (FR)</label><br><input class="regular-text" id="strc-issue-fr" name="title_fr" value="'.esc_attr($settings['title_fr'] ?? '').'"></p><p><label for="strc-teaser-fr">Öffentlicher Kurztext (FR)</label><br><textarea class="large-text" rows="3" id="strc-teaser-fr" name="teaser_fr">'.esc_textarea($settings['teaser_fr'] ?? '').'</textarea></p>';
        echo '<h2>Öffentliche Leseprobe</h2><p>Wähle drei Doppelseiten oder vier bis sechs Einzelseiten ausdrücklich freigegebene Seiten als JPG- oder PNG-Bilder, in der gewünschten Reihenfolge. Diese Bilder sind für alle Besucher sichtbar. Die vollständige PDF behält die oben eingestellte Zugriffsregel.</p><input type="hidden" id="strc-pages" name="preview_pages" value="' . esc_attr(implode(',', array_map('absint', (array) ($settings['preview_pages'] ?? array())))) . '"><button type="button" class="button" id="strc-pages-pick">Vorschauseiten auswählen / hochladen</button> <button type="button" class="button" id="strc-pages-clear">Vorschau entfernen</button><p id="strc-pages-status" role="status"></p><div id="strc-pages-preview">';
        foreach ((array) ($settings['preview_pages'] ?? array()) as $index => $pageId) {
            echo '<img src="' . esc_url(wp_get_attachment_image_url(absint($pageId), 'thumbnail') ?: '') . '" alt="Vorschauseite ' . ((int) $index + 1) . '" style="width:90px;height:126px;object-fit:contain;margin:8px 8px 0 0;">';
        }
        echo '</div>';
        $selection = $this->selection();
        if ($selection) {
            $qrUrl = add_query_arg(array('action' => 'strc_magazine', 'operation' => 'qr', 'id' => $selection['id']), admin_url('admin-ajax.php'));
            $readerUrl = add_query_arg('magazine', $selection['id'], home_url('/'));
            echo '<h2>QR-Code für das Magazin</h2><p>Der QR-Code öffnet die stabile Magazinseite. Dort bleibt die Vorschau öffentlich und die vollständige PDF folgt der gewählten Zugriffseinstellung.</p><p><a class="button button-secondary" href="' . esc_url($qrUrl) . '">Druckfertigen QR-Code als SVG herunterladen</a> <a href="' . esc_url($readerUrl) . '" target="_blank" rel="noopener">Magazinseite öffnen</a></p>';
        }
        submit_button('Magazin speichern');
        echo '</form></div>';
    }
}

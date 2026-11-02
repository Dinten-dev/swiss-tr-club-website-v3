<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Mail;

/**
 * Einheitliches Erscheinungsbild aller Club-Mails (Wunsch Redaktion 29.10.2026): blauer Balken mit Logo oben,
 * Inhalt, schlichte Fusszeile. Reine Textmails werden in HTML mit Textfassung (AltBody) umgewandelt.
 * WooCommerce-Mails behalten ihre Vorlage, erhalten aber Clubblau und Logo.
 */
final class MailLayout
{
    public const BLUE = '#114973';
    private static string $alternative = '';
    private const WOO_MARKER = '<!-- strc-woocommerce-mail -->';

    public function registerHooks(): void
    {
        add_filter('wp_mail', array($this, 'wrap'), 50);
        add_action('phpmailer_init', array($this, 'alternative'), 5);
        add_filter('woocommerce_mail_content', static fn ($message) => self::woocommerce((string) $message), 50);
        add_filter('option_woocommerce_email_base_color', static fn () => self::BLUE);
    }

    /** Logo als Datei im Theme; wird in jede Mail eingebettet (cid), damit es auch ohne Bildfreigabe und auf Staging erscheint. */
    public static function logoFile(): string
    {
        $file = (defined('WP_CONTENT_DIR') ? WP_CONTENT_DIR : '') . '/themes/strc-app/build/strc-logo.png';
        return is_readable($file) ? $file : '';
    }

    /** Logo als Daten-URL für die Vorschau im Browser (ohne Zugriff auf den passwortgeschützten Server). */
    public static function logoData(): string
    {
        $file = self::logoFile();
        return $file !== '' ? 'data:image/png;base64,' . base64_encode((string) file_get_contents($file)) : self::logo();
    }

    public static function logo(): string
    {
        return content_url('/themes/strc-app/build/strc-logo.png');
    }

    /** @param array{to:mixed,subject:string,message:string,headers:mixed,attachments:mixed} $args */
    public function wrap(array $args): array
    {
        self::$alternative = '';
        $headers = $args['headers'] ?? array();
        $headers = is_array($headers) ? $headers : preg_split('/\r\n|\n/', (string) $headers);
        $headers = array_values(array_filter(array_map('trim', (array) $headers)));
        $html = false;
        foreach ($headers as $header) if (preg_match('/^content-type:\s*text\/html/i', $header)) $html = true;
        $message = (string) ($args['message'] ?? '');
        if (str_contains($message, self::WOO_MARKER)) {
            $args['message'] = str_replace(self::WOO_MARKER, '', $message);
            return $args;
        }
        if (str_contains($message, 'data-strc-mail')) return $args;
        if ($html) {
            $inner = preg_match('/<body[^>]*>(.*)<\/body>/is', $message, $match) ? $match[1] : $message;
            $text = '';
        } else {
            $inner = self::textToHtml($message);
            $text = $message;
        }
        $args['message'] = self::layout((string) ($args['subject'] ?? ''), $inner);
        $headers = array_values(array_filter($headers, static fn ($header) => ! preg_match('/^content-type:/i', $header)));
        $headers[] = 'Content-Type: text/html; charset=UTF-8';
        $args['headers'] = $headers;
        self::$alternative = $text;
        return $args;
    }

    /** Textfassung für Mailprogramme ohne HTML (nur bei ursprünglich reinen Textmails). */
    public function alternative($mailer): void
    {
        if (is_object($mailer)) $mailer->AltBody = self::$alternative;
        self::$alternative = '';
        if (is_object($mailer) && isset($mailer->Body) && str_contains((string) $mailer->Body, 'cid:strc-logo') && self::logoFile() !== '' && method_exists($mailer, 'addEmbeddedImage')) {
            $mailer->addEmbeddedImage(self::logoFile(), 'strc-logo', 'strc-logo.png', 'base64', 'image/png');
        }
    }

    /** Recognise the actual WooCommerce HTML message, never the next unrelated mail. */
    public static function woocommerce(string $message): string
    {
        return preg_match('/<(?:html|body|table)\b/i', $message) ? self::WOO_MARKER . $message : $message;
    }

    public static function textToHtml(string $text): string
    {
        $escaped = esc_html(str_replace("\r\n", "\n", trim($text)));
        $linked = (string) preg_replace_callback('~https?://[^\s<>"]+?(?=[.,;:!?)\]]*(?:\s|$|&lt;|&gt;))~u', static fn ($m) => '<a href="' . esc_url(html_entity_decode($m[0], ENT_QUOTES)) . '" style="color:' . self::BLUE . '">' . $m[0] . '</a>', $escaped);
        $paragraphs = preg_split("/\n{2,}/", $linked) ?: array($linked);
        return implode('', array_map(static fn ($paragraph) => '<p style="margin:0 0 14px">' . nl2br($paragraph) . '</p>', $paragraphs));
    }

    public static function layout(string $subject, string $inner, ?string $logo = null): string
    {
        $logo ??= self::logoFile() !== '' ? 'cid:strc-logo' : self::logo();
        $logoSrc = str_starts_with($logo, 'cid:') || str_starts_with($logo, 'data:image/') ? esc_attr($logo) : esc_url($logo);
        $site = esc_url(rtrim(defined('STRC_FRONTEND_ORIGIN') ? STRC_FRONTEND_ORIGIN : home_url(), '/'));
        return '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' . esc_html($subject) . '</title></head>'
            . '<body style="margin:0;padding:0;background:#eef2f5" data-strc-mail="1">'
            . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef2f5"><tr><td align="center" style="padding:24px 12px">'
            . '<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:8px;overflow:hidden">'
            . '<tr><td style="background:' . self::BLUE . ';padding:16px 24px"><table role="presentation" cellpadding="0" cellspacing="0"><tr>'
            . '<td style="padding-right:12px"><img src="' . $logoSrc . '" width="48" height="48" alt="" style="display:block;border:0"></td>'
            . '<td style="font:700 20px/1.2 Arial,Helvetica,sans-serif;color:#ffffff">Swiss TR-Club<br><span style="font:400 11px/1.6 Arial,Helvetica,sans-serif;letter-spacing:2px;color:#cfe3f1">PASSION SINCE 1975</span></td>'
            . '</tr></table></td></tr>'
            . '<tr><td style="padding:24px;font:15px/1.55 Arial,Helvetica,sans-serif;color:#13202b">' . $inner . '</td></tr>'
            . '<tr><td style="padding:14px 24px;background:#f5f7f9;border-top:1px solid #e3eaf0;font:12px/1.5 Arial,Helvetica,sans-serif;color:#5a6b78">Swiss TR-Club · <a href="' . $site . '" style="color:#5a6b78">' . esc_html((string) preg_replace('~^https?://~', '', $site)) . '</a></td></tr>'
            . '</table></td></tr></table></body></html>';
    }
}

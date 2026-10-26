<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Forms;

use SwissTRClub\Core\Finance\ClubDocument;

/**
 * Rechnung mit QR-Zahlteil für bestätigte Anlass-Anmeldungen auf Rechnung (Weg A, Vorstandsentscheid 25.10.2026).
 * Ersetzt die Mail «Rechnung erstellen» an die Kasse; die Kasse erhält stattdessen eine Kopie der versandten Rechnung.
 */
final class EventInvoice
{
    public function registerHooks(): void
    {
        add_action('admin_post_strc_event_invoice', array($this, 'download'));
    }

    /** Rechnung erstellen und versenden (einmalig). Wird unter der Anlass-Sperre aus EventPayments::notify aufgerufen. */
    public static function send(int $id): bool
    {
        try { return (bool)FormStore::locked('event-invoice-' . $id, static fn(): bool => self::sendLocked($id)); }
        catch (\Throwable) { error_log('STRC event invoice lock failed for registration ' . $id . '.'); return false; }
    }

    private static function sendLocked(int $id): bool
    {
        if (get_post_meta($id, 'strc_invoice_sent', true)) return true;
        if (! ClubDocument::ready()) return false;
        $post = get_post($id);
        $user = $post ? get_userdata((int) $post->post_author) : false;
        if (! $post || $post->post_type !== 'strc_registration' || ! $user || ! is_email($user->user_email)) return false;
        if (!ClubDocument::eligible((int)strtotime($post->post_date_gmt . ' UTC'))) return false;
        $row = FormStore::data($post);
        if (EventPayments::participationState($row) !== 'confirmed' || ($row['paymentMethod'] ?? '') !== 'invoice' || (int)($row['total'] ?? 0) <= 0 || !in_array($row['paymentStatus'] ?? '', ['outstanding', 'partially_paid'], true)) return false;
        try {
            if (! get_post_meta($id, 'strc_invoice_number', true)) {
                $sequence = ClubDocument::next('event');
                update_post_meta($id, 'strc_invoice_number', ClubDocument::number('event', $sequence));
                update_post_meta($id, 'strc_invoice_reference', ClubDocument::reference('event', $sequence));
                update_post_meta($id, 'strc_invoice_date', wp_date('Y-m-d'));
            }
            $number = (string) get_post_meta($id, 'strc_invoice_number', true);
            $lang = \SwissTRClub\Core\Http\UserLanguage::french((int) $user->ID) ? 'fr' : 'de';
            $row = FormStore::data($post);
            $title = self::title($post, $row, $lang);
            $document = self::pdf($id);
            if (!get_post_meta($id, 'strc_invoice_pdf', true) && !update_post_meta($id, 'strc_invoice_pdf', ClubDocument::archive('event', $id, $document))) throw new \RuntimeException('Rechnung konnte nicht archiviert werden.');
            $file = ClubDocument::temporaryFile($document, 'Rechnung-' . $number . '.pdf');
            try {
                $headers = array('Content-Type: text/plain; charset=UTF-8');
                foreach (ClubDocument::treasury() as $copy) $headers[] = 'Bcc: ' . $copy;
                $amount = number_format(((int) $row['total']) / 100, 2, '.', "'");
                $subject = $lang === 'fr' ? 'Facture ' . $number . ' : ' . $title : 'Rechnung ' . $number . ': ' . $title;
                $body = $lang === 'fr'
                    ? "Bonjour " . ($user->first_name ?: $user->display_name) . "\n\nTu trouveras en pièce jointe la facture avec le bulletin de versement QR pour ta participation.\n\n" . $title . "\nMontant : CHF " . $amount . "\n\nMeilleures salutations\nSwiss TR-Club\n"
                    : "Hallo " . ($user->first_name ?: $user->display_name) . "\n\nIm Anhang findest du die Rechnung mit QR-Einzahlungsschein für deine Teilnahme.\n\n" . $title . "\nBetrag: CHF " . $amount . "\n\nFreundliche Grüsse\nSwiss TR-Club\n";
                if (! wp_mail($user->user_email, $subject, $body, $headers, array($file))) return false;
                update_post_meta($id, 'strc_invoice_sent', gmdate(DATE_ATOM));
                return true;
            } finally {
                if (is_file($file)) unlink($file);
            }
        } catch (\Throwable) {
            error_log('STRC event invoice failed for registration ' . $id . '.');
            return false;
        }
    }

    private static function title(object $post, array $row, string $lang): string
    {
        $fr = $lang === 'fr' ? trim((string) get_post_meta((int) $post->post_parent, 'strc_title_fr', true)) : '';
        return $fr !== '' ? $fr : (string) ($row['eventTitle'] ?? get_the_title((int) $post->post_parent));
    }

    /** Positionen aus der Anmeldung; stimmt die Summe nicht exakt, eine Sammelposition. @return list<array{0:string,1:int,2:float,3:float}> */
    public static function rows(array $row, array $settings, string $lang = 'de'): array
    {
        $rows = array(); $sum = 0;
        $meals = EventRegistration::options((string) ($settings['meals'] ?? ''));
        $rooms = ! empty($settings['weekend']) ? array() : EventRegistration::options((string) ($settings['rooms'] ?? ''));
        $roles = $lang === 'fr' ? array('Mitglied' => 'membre', 'Gast' => 'invité', 'Co-Pilot Mitglied' => 'copilote membre', 'Co-Pilot Gast' => 'copilote invité', 'Co-Pilot (Gast)' => 'copilote invité', 'Begleitung Mitglied' => 'accompagnant·e membre', 'Begleitung Gast' => 'accompagnant·e invité·e', 'Weitere Person' => 'personne supplémentaire') : array();
        foreach ((array) ($row['participants'] ?? array()) as $person) {
            $fee = (int) ($person['fee'] ?? 0); $sum += $fee;
            $role = (string) ($person['role'] ?? '');
            $room = ! empty($settings['weekend']) ? (($person['room'] ?? '') === 'double' ? ($lang === 'fr' ? 'chambre double' : 'Doppelzimmer') : ($lang === 'fr' ? 'chambre simple' : 'Einzelzimmer')) : '';
            $rows[] = array(trim((string) ($person['name'] ?? '')) . ($role !== '' ? ' (' . ($roles[$role] ?? $role) . ')' : '') . ($room !== '' ? ' · ' . $room : ''), 1, $fee / 100, $fee / 100);
            $meal = (string) ($person['meal'] ?? '');
            if ($meal !== '' && isset($meals[$meal])) { $sum += $meals[$meal]; $rows[] = array(($lang === 'fr' ? 'Menu ' : 'Menü ') . ($person['name'] ?? '') . ': ' . $meal, 1, $meals[$meal] / 100, $meals[$meal] / 100); }
        }
        $room = (string) ($row['room'] ?? '');
        if ($room !== '' && isset($rooms[$room])) { $sum += $rooms[$room]; $rows[] = array($room, 1, $rooms[$room] / 100, $rooms[$room] / 100); }
        $total = (int) ($row['total'] ?? 0);
        if ($sum !== $total || ! $rows) return array(array(($lang === 'fr' ? 'Participation' : 'Teilnahme') . ': ' . implode(', ', array_column((array) ($row['participants'] ?? array()), 'name')), 1, $total / 100, $total / 100));
        return $rows;
    }

    /** «Schweiz», «Suisse», «CH» … → ISO-Code für den QR-Zahlteil. */
    public static function countryCode(string $value): string
    {
        $key = mb_strtolower(trim($value));
        $map = array('schweiz' => 'CH', 'suisse' => 'CH', 'svizzera' => 'CH', 'switzerland' => 'CH', 'deutschland' => 'DE', 'allemagne' => 'DE', 'germany' => 'DE',
            'frankreich' => 'FR', 'france' => 'FR', 'österreich' => 'AT', 'autriche' => 'AT', 'austria' => 'AT', 'italien' => 'IT', 'italie' => 'IT', 'italy' => 'IT',
            'liechtenstein' => 'LI', 'niederlande' => 'NL', 'belgien' => 'BE', 'luxemburg' => 'LU', 'grossbritannien' => 'GB', 'vereinigtes königreich' => 'GB');
        if (isset($map[$key])) return $map[$key];
        return preg_match('/^[a-z]{2}$/', $key) ? strtoupper($key) : ($key === '' ? 'CH' : '');
    }

    public static function pdf(int $id): string
    {
        $stored = get_post_meta($id, 'strc_invoice_pdf', true);
        if ($stored) return ClubDocument::archived((array)$stored);
        $post = get_post($id);
        $user = $post ? get_userdata((int) $post->post_author) : false;
        $number = (string) get_post_meta($id, 'strc_invoice_number', true);
        $reference = (string) get_post_meta($id, 'strc_invoice_reference', true);
        if (! $post || ! $user || $number === '' || $reference === '') throw new \RuntimeException('Rechnung fehlt.');
        $lang = \SwissTRClub\Core\Http\UserLanguage::french((int) $user->ID) ? 'fr' : 'de';
        $row = FormStore::data($post);
        $settings = EventRegistration::settings((int) $post->post_parent);
        $date = (string) get_post_meta($id, 'strc_invoice_date', true) ?: wp_date('Y-m-d');
        $start = strtotime((string) ($row['eventStart'] ?? ''));
        $dueTime = strtotime($date . ' +' . ClubDocument::PAYMENT_DAYS . ' days');
        // Fällig spätestens am Vortag des Anlasses, aber nie vor dem Rechnungsdatum.
        if ($start && $start - DAY_IN_SECONDS < $dueTime) $dueTime = max(strtotime($date), $start - DAY_IN_SECONDS);
        $m = static fn (string $key): string => (string) get_user_meta($user->ID, $key, true);
        $name = trim($m('first_name') . ' ' . $m('last_name')) ?: $user->display_name;
        $country = self::countryCode($m('strc_country'));
        $title = self::title($post, $row, $lang);
        $pdf = ClubDocument::start(ClubDocument::label('Rechnung', $lang), array($name, $m('strc_street'), trim($m('strc_postcode') . ' ' . $m('strc_city'))), array(
            ClubDocument::label('Rechnungsnummer', $lang) => $number,
            ClubDocument::label('Datum', $lang) => gmdate('d.m.Y', strtotime($date)),
            ClubDocument::label('Anlass', $lang) => mb_strimwidth($title, 0, 40, '…'),
            ClubDocument::label('Zahlbar bis', $lang) => gmdate('d.m.Y', $dueTime),
        ), $lang, true);
        $intro = $title . ($start ? ' · ' . wp_date('d.m.Y', $start) : '');
        $pdf->SetFont('helvetica', 'B', 10); $pdf->SetTextColor(17, 73, 115); $pdf->MultiCell(0, 6, $intro, 0, 'L'); $pdf->Ln(1); $pdf->SetFont('helvetica', '', 10);
        ClubDocument::table($pdf, self::rows($row, $settings, $lang), ((int) $row['total']) / 100, $lang,
            ClubDocument::label('Bitte bezahle den Betrag mit dem QR-Einzahlungsschein bis zum Fälligkeitsdatum. Wir freuen uns auf deine Teilnahme.', $lang) . "\n" . (string) ($row['conditions'] ?? ''));
        ClubDocument::paymentPart($pdf, array('name' => $name, 'street' => $m('strc_street'), 'postcode' => $m('strc_postcode'), 'city' => $m('strc_city'), 'country' => $country),
            ((int) $row['total']) / 100, $reference, ClubDocument::label('Rechnung', $lang) . ' ' . $number . ' · ' . mb_strimwidth($title, 0, 80, '…'), $lang);
        return $pdf->Output('Rechnung-' . $number . '.pdf', 'S');
    }

    public function download(): void
    {
        $id = absint($_GET['registration'] ?? 0);
        check_admin_referer('strc_event_invoice_' . $id);
        $post = get_post($id);
        $allowed = $post && $post->post_type === 'strc_registration' && (
            (int) $post->post_author === get_current_user_id() || current_user_can('strc_manage_finance') || \SwissTRClub\Core\Events\RegionalEventAccess::canEdit((int) $post->post_parent));
        if (! $allowed || ! get_post_meta($id, 'strc_invoice_number', true)) wp_die(esc_html__('Rechnung nicht gefunden.', 'strc-core'), '', array('response' => 404));
        try { $content = self::pdf($id); } catch (\Throwable) { wp_die(esc_html__('Rechnung konnte nicht erstellt werden.', 'strc-core')); }
        nocache_headers();
        header('Content-Type: application/pdf');
        header('Content-Disposition: inline; filename="Rechnung-' . sanitize_file_name((string) get_post_meta($id, 'strc_invoice_number', true)) . '.pdf"');
        echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
        exit;
    }

    public static function downloadUrl(int $id): string
    {
        return get_post_meta($id, 'strc_invoice_number', true) ? wp_nonce_url(admin_url('admin-post.php?action=strc_event_invoice&registration=' . $id), 'strc_event_invoice_' . $id) : '';
    }
}

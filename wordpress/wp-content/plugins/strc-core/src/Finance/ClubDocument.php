<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Finance;

use Sprain\SwissQrBill as QrBill;
use Sprain\SwissQrBill\PaymentPart\Output\DisplayOptions;
use Sprain\SwissQrBill\PaymentPart\Output\TcPdfOutput\TcPdfOutput;
use TCPDF;

/**
 * Gemeinsames Club-CD für Rechnungen und Lieferscheine (Shop, Events).
 *
 * Rechnungen der Website laufen auf dieselbe QR-IBAN wie die Fairgate-FiBu. Fairgate-Referenzen beginnen mit
 * «225480» und haben an Stelle 7 immer eine 0; die Website verwendet «2254809» (STRC_QR_REFERENCE_PREFIX) plus eine
 * Ziffer für die Dokumentart, damit sich die Nummernkreise nie überschneiden (Vorstandsentscheid 25.10.2026, Weg A).
 */
final class ClubDocument
{
    public const KINDS = array('shop' => '1', 'event' => '2');
    private const NUMBER_PREFIX = array('shop' => 'S', 'event' => 'E');
    public const PAYMENT_DAYS = 30;

    /** @return array{name:string,street:string,house_number:string,postcode:string,city:string,country:string,qr_iban:string,email:string,web:string} */
    public static function creditor(): array
    {
        $saved = function_exists('get_option') ? get_option('strc_billing_settings', array()) : array();
        $constant = defined('STRC_BILLING_CREDITOR') && is_array(STRC_BILLING_CREDITOR) ? STRC_BILLING_CREDITOR : array();
        $value = static fn (string $key, string $legacy = ''): string => trim((string) ($constant[$key] ?? ($saved[$legacy !== '' ? $legacy : $key] ?? '')));
        return array(
            'name' => $value('name', 'creditor_name'), 'street' => $value('street'), 'house_number' => $value('house_number'),
            'postcode' => $value('postcode'), 'city' => $value('city'), 'country' => strtoupper($value('country') ?: 'CH'),
            'qr_iban' => preg_replace('/\s+/', '', $value('qr_iban')) ?? '', 'email' => $value('email'), 'web' => $value('web'),
        );
    }

    public static function ready(): bool
    {
        $c = self::creditor();
        foreach (array('name', 'street', 'postcode', 'city', 'qr_iban') as $key) if ($c[$key] === '') return false;
        return class_exists(TCPDF::class) && class_exists(QrBill\QrBill::class);
    }

    /** 27-stellige QR-Referenz: Präfix + Dokumentart + laufende Nummer + Prüfziffer (Modulo 10 rekursiv). */
    public static function reference(string $kind, int $sequence): string
    {
        if (! isset(self::KINDS[$kind]) || $sequence < 1) throw new \InvalidArgumentException('Ungültige Dokumentart oder Nummer.');
        $prefix = preg_replace('/\D/', '', defined('STRC_QR_REFERENCE_PREFIX') ? (string) STRC_QR_REFERENCE_PREFIX : '2254809') ?? '';
        $head = $prefix . self::KINDS[$kind];
        $length = 26 - strlen($head);
        if ($length < 6 || strlen((string) $sequence) > $length) throw new \InvalidArgumentException('Referenzbereich erschöpft.');
        return QrReference::withCheckDigit($head . str_pad((string) $sequence, $length, '0', STR_PAD_LEFT));
    }

    public static function number(string $kind, int $sequence): string
    {
        return self::NUMBER_PREFIX[$kind] . '-' . str_pad((string) $sequence, 5, '0', STR_PAD_LEFT);
    }

    /** Nächste laufende Nummer je Dokumentart, unter Sperre (keine Doppelvergabe bei gleichzeitigen Bestellungen). */
    public static function next(string $kind): int
    {
        return (int) \SwissTRClub\Core\Forms\FormStore::locked('strc-document-sequence-' . $kind, static function () use ($kind): int {
            $option = 'strc_document_sequence_' . $kind;
            wp_cache_delete($option, 'options');
            $next = max(1, (int) get_option($option, 0) + 1);
            update_option($option, $next, false);
            return $next;
        });
    }

    /** Kasse: STRC_TREASURY_EMAIL, sonst STRC_EVENT_TREASURY_EMAIL, plus alle Konten mit Kassier-Rolle. @return list<string> */
    public static function treasury(): array
    {
        $list = array();
        foreach (array('STRC_TREASURY_EMAIL', 'STRC_EVENT_TREASURY_EMAIL') as $name) {
            $value = defined($name) ? (string) constant($name) : (string) getenv($name);
            if (is_email($value)) { $list[] = strtolower($value); break; }
        }
        foreach (get_users(array('capability' => 'strc_manage_finance')) as $user) if (is_email($user->user_email)) $list[] = strtolower($user->user_email);
        return array_values(array_unique($list));
    }

    public static function label(string $key, string $lang): string
    {
        $fr = array(
            'Rechnung' => 'Facture', 'Lieferschein' => 'Bulletin de livraison', 'Rechnungsnummer' => 'N° de facture', 'Datum' => 'Date',
            'Zahlbar bis' => 'Payable jusqu’au', 'Bestellung' => 'Commande', 'Anlass' => 'Manifestation', 'Position' => 'Désignation',
            'Anzahl' => 'Quantité', 'Preis' => 'Prix', 'Betrag' => 'Montant', 'Total' => 'Total', 'Versand' => 'Frais d’envoi',
            'Artikel-Nr.' => 'N° d’article', 'Artikel' => 'Article', 'Lieferadresse' => 'Adresse de livraison', 'Versandart' => 'Mode d’envoi',
            'Referenz' => 'Référence', 'Kunde' => 'Client',
            'Bitte bezahle den Betrag mit dem QR-Einzahlungsschein bis zum Fälligkeitsdatum. Vielen Dank für deinen Einkauf im TR-Shop.' => 'Merci de régler le montant avec le bulletin de versement QR jusqu’à l’échéance. Merci pour ton achat au TR-Shop.',
            'Bitte bezahle den Betrag mit dem QR-Einzahlungsschein bis zum Fälligkeitsdatum. Wir freuen uns auf deine Teilnahme.' => 'Merci de régler le montant avec le bulletin de versement QR jusqu’à l’échéance. Nous nous réjouissons de ta participation.',
        );
        return $lang === 'fr' ? ($fr[$key] ?? $key) : $key;
    }

    /**
     * Neue A4-Seite im Club-CD: Logo und Absender oben, Empfängeradresse im rechten Fenster (C5/C6), Titel und Kopfdaten.
     * @param list<string> $recipient Adresszeilen
     * @param array<string,string> $facts Beschriftung → Wert (rechts neben dem Titel)
     */
    public static function start(string $title, array $recipient, array $facts, string $lang = 'de', bool $paymentPart = false): TCPDF
    {
        if (! class_exists(TCPDF::class)) throw new \RuntimeException('PDF-Bibliothek fehlt.');
        $c = self::creditor();
        $pdf = new TCPDF('P', 'mm', 'A4', true, 'UTF-8');
        $pdf->SetCreator('Swiss TR-Club'); $pdf->SetAuthor($c['name'] ?: 'Swiss TR-Club'); $pdf->SetTitle($title);
        $pdf->setPrintHeader(false); $pdf->setPrintFooter(false);
        $pdf->SetMargins(20, 18, 20); $pdf->SetAutoPageBreak(true, 22);
        $pdf->AddPage();
        // Kopfband im neuen CD: dunkelblau über die ganze Breite, Schrift weiss, roter Abschlussstreifen (wie der Website-Header).
        $pdf->Rect(0, 0, 210, 38, 'F', array(), array(17, 73, 115));
        $pdf->Rect(0, 38, 210, 1.6, 'F', array(), array(189, 32, 40));
        $logo = function_exists('get_template_directory') ? get_template_directory() . '/build/strc-logo.png' : '';
        if ($logo !== '' && is_file($logo)) $pdf->Image($logo, 20, 9, 20, 20, 'PNG');
        $pdf->SetTextColor(255, 255, 255);
        $pdf->SetFont('times', 'B', 17); $pdf->SetXY(44, 11); $pdf->Cell(0, 8, 'Swiss TR-Club', 0, 1);
        $pdf->SetFont('helvetica', '', 8); $pdf->SetTextColor(214, 228, 240); $pdf->SetX(44);
        $pdf->Cell(0, 5, 'PASSION SINCE 1975 · ' . trim($c['street'] . ' ' . $c['house_number']) . ' · ' . trim($c['postcode'] . ' ' . $c['city']), 0, 1);
        // Absenderzeile und Empfänger im Fenster rechts (Schweizer Couvert C5, Fenster rechts).
        $pdf->SetFont('helvetica', '', 7); $pdf->SetTextColor(85, 98, 110); $pdf->SetDrawColor(160, 170, 180); $pdf->SetLineWidth(0.2);
        $pdf->SetXY(118, 47); $pdf->Cell(72, 4, ($c['name'] ?: 'Swiss TR-Club') . ', ' . trim($c['postcode'] . ' ' . $c['city']), 'B', 1);
        $pdf->SetFont('helvetica', '', 10.5); $pdf->SetTextColor(20, 30, 40);
        $pdf->SetXY(118, 53); $pdf->MultiCell(72, 5, implode("\n", array_filter(array_map('trim', $recipient), static fn ($line) => $line !== '')), 0, 'L');
        // Titel und Kopfdaten links.
        $pdf->SetXY(20, 50); $pdf->SetFont('times', 'B', 20); $pdf->SetTextColor(17, 73, 115); $pdf->Cell(90, 9, $title, 0, 1);
        $pdf->SetFont('helvetica', '', 9); $pdf->SetTextColor(20, 30, 40);
        foreach ($facts as $label => $value) {
            $pdf->SetX(20); $pdf->SetTextColor(85, 98, 110); $pdf->Cell(32, 5, $label, 0, 0);
            $pdf->SetTextColor(20, 30, 40); $pdf->Cell(58, 5, $value, 0, 1);
        }
        $pdf->SetY(max($pdf->GetY(), 82) + 6);
        self::footer($pdf, $paymentPart);
        return $pdf;
    }

    /** Fusszeile; auf Seiten mit QR-Zahlteil oberhalb der Trennlinie (der Zahlteil belegt die unteren 105 mm). */
    private static function footer(TCPDF $pdf, bool $abovePaymentPart = false): void
    {
        $c = self::creditor();
        $parts = array_filter(array($c['name'] ?: 'Swiss TR-Club', trim($c['street'] . ' ' . $c['house_number']), trim($c['postcode'] . ' ' . $c['city']), $c['email'], $c['web']));
        $y = $pdf->GetY(); $x = $pdf->GetX(); $break = $pdf->getAutoPageBreak();
        $pdf->SetAutoPageBreak(false);
        $pdf->SetFont('helvetica', '', 7); $pdf->SetTextColor(85, 98, 110);
        $pdf->SetXY(20, $abovePaymentPart ? 186 : 287); $pdf->Cell(170, 4, implode(' · ', $parts), 0, 0, 'C');
        $pdf->SetAutoPageBreak($break, 22); $pdf->SetXY($x, $y);
    }

    /**
     * Positionstabelle. @param list<array{0:string,1:string|int|float,2:float|null,3:float}> $rows Bezeichnung, Anzahl, Einzelpreis, Betrag
     */
    public static function table(TCPDF $pdf, array $rows, float $total, string $lang = 'de', ?string $note = null): void
    {
        $e = static fn ($v): string => htmlspecialchars((string) $v, ENT_QUOTES, 'UTF-8');
        $chf = static fn (float $v): string => number_format($v, 2, '.', "'");
        $html = '<table cellpadding="4" style="font-size:9.5pt"><tr style="background-color:#114973;color:#ffffff;font-weight:bold">'
            . '<td width="56%">' . $e(self::label('Position', $lang)) . '</td><td width="12%" align="right">' . $e(self::label('Anzahl', $lang)) . '</td>'
            . '<td width="16%" align="right">' . $e(self::label('Preis', $lang)) . '</td><td width="16%" align="right">' . $e(self::label('Betrag', $lang)) . ' CHF</td></tr>';
        foreach ($rows as $i => $row) {
            $html .= '<tr style="background-color:' . ($i % 2 ? '#f3f6f8' : '#ffffff') . '"><td width="56%">' . nl2br($e($row[0])) . '</td><td width="12%" align="right">' . $e($row[1])
                . '</td><td width="16%" align="right">' . ($row[2] === null ? '' : $chf((float) $row[2])) . '</td><td width="16%" align="right">' . $chf((float) $row[3]) . '</td></tr>';
        }
        $html .= '<tr><td colspan="3" align="right" style="border-top:1.2px solid #bd2028"><b>' . $e(self::label('Total', $lang)) . ' CHF</b></td><td align="right" style="border-top:1.2px solid #bd2028"><b>' . $chf($total) . '</b></td></tr></table>';
        if ($note !== null && $note !== '') $html .= '<p style="font-size:9pt;color:#37474f">' . nl2br($e($note)) . '</p>';
        $pdf->SetTextColor(20, 30, 40);
        $pdf->writeHTML($html, true, false, true, false, '');
    }

    /** QR-Zahlteil unten auf der Seite (bei zu wenig Platz auf einer neuen Seite). @param array{name:string,street:string,postcode:string,city:string,country:string} $debtor */
    public static function paymentPart(TCPDF $pdf, array $debtor, float $amount, string $reference, string $message, string $lang = 'de'): void
    {
        $c = self::creditor();
        $bill = QrBill\QrBill::create();
        $bill->setCreditor(QrBill\DataGroup\Element\StructuredAddress::createWithStreet($c['name'], $c['street'], $c['house_number'] !== '' ? $c['house_number'] : null, $c['postcode'], $c['city'], $c['country']));
        $bill->setCreditorInformation(QrBill\DataGroup\Element\CreditorInformation::create($c['qr_iban']));
        $country = strtoupper(trim($debtor['country'] ?? '')) ?: 'CH';
        if (! preg_match('/^[A-Z]{2}$/', $country)) $country = 'CH';
        if (trim($debtor['name']) !== '' && trim($debtor['postcode']) !== '' && trim($debtor['city']) !== '') {
            $bill->setUltimateDebtor(trim($debtor['street']) !== ''
                ? QrBill\DataGroup\Element\StructuredAddress::createWithStreet(mb_substr(trim($debtor['name']), 0, 70), mb_substr(trim($debtor['street']), 0, 70), null, trim($debtor['postcode']), trim($debtor['city']), $country)
                : QrBill\DataGroup\Element\StructuredAddress::createWithoutStreet(mb_substr(trim($debtor['name']), 0, 70), trim($debtor['postcode']), trim($debtor['city']), $country));
        }
        $bill->setPaymentAmountInformation(QrBill\DataGroup\Element\PaymentAmountInformation::create('CHF', round($amount, 2)));
        $bill->setPaymentReference(QrBill\DataGroup\Element\PaymentReference::create(QrBill\DataGroup\Element\PaymentReference::TYPE_QR, $reference));
        $bill->setAdditionalInformation(QrBill\DataGroup\Element\AdditionalInformation::create(mb_substr($message, 0, 140)));
        if ($pdf->GetY() > 182) { $pdf->AddPage(); self::footer($pdf, true); }
        $options = (new DisplayOptions())->setPrintable(false)->setDisplayTextDownArrows(false)->setDisplayScissors(true);
        (new TcPdfOutput($bill, $lang === 'fr' ? 'fr' : 'de', $pdf))->setDisplayOptions($options)->getPaymentPart();
    }

    /** Datei-Anhang für wp_mail: temporäre Datei, die der Aufrufer nach dem Versand löscht. */
    public static function temporaryFile(string $pdf, string $name): string
    {
        $temporary = wp_tempnam($name);
        if (! $temporary) throw new \RuntimeException('Temporärer PDF-Speicher fehlt.');
        $file = $temporary . '.pdf';
        if (! rename($temporary, $file) || file_put_contents($file, $pdf) === false) { @unlink($temporary); throw new \RuntimeException('PDF konnte nicht gespeichert werden.'); }
        return $file;
    }
}

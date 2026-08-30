<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Finance;

use RuntimeException;
use Sprain\SwissQrBill as QrBill;
use Sprain\SwissQrBill\PaymentPart\Output\DisplayOptions;
use Sprain\SwissQrBill\PaymentPart\Output\TcPdfOutput\TcPdfOutput;
use TCPDF;
use WP_User;

final class QrInvoicePdf
{
    /** @param array<string, mixed> $invoice */
    public function generate(array $invoice, WP_User $user): string
    {
        if (! class_exists(QrBill\QrBill::class) || ! class_exists(TCPDF::class)) {
            throw new RuntimeException('QR-PDF-Abhängigkeiten fehlen. Composer installieren.');
        }

        $settings = get_option('strc_billing_settings', array());
        foreach (array('creditor_name', 'street', 'house_number', 'postcode', 'city', 'qr_iban') as $required) {
            if (empty($settings[$required])) {
                throw new RuntimeException('Rechnungssteller und QR-IBAN müssen konfiguriert werden.');
            }
        }

        $qrBill = QrBill\QrBill::create();
        $qrBill->setCreditor(QrBill\DataGroup\Element\StructuredAddress::createWithStreet(
            (string) $settings['creditor_name'], (string) $settings['street'], (string) $settings['house_number'],
            (string) $settings['postcode'], (string) $settings['city'], 'CH'
        ));
        $qrBill->setCreditorInformation(QrBill\DataGroup\Element\CreditorInformation::create((string) $settings['qr_iban']));
        $qrBill->setUltimateDebtor(QrBill\DataGroup\Element\StructuredAddress::createWithStreet(
            $user->display_name,
            (string) get_user_meta($user->ID, 'strc_street', true),
            (string) get_user_meta($user->ID, 'strc_house_number', true),
            (string) get_user_meta($user->ID, 'strc_postcode', true),
            (string) get_user_meta($user->ID, 'strc_city', true),
            (string) (get_user_meta($user->ID, 'strc_country', true) ?: 'CH')
        ));
        $qrBill->setPaymentAmountInformation(QrBill\DataGroup\Element\PaymentAmountInformation::create('CHF', (float) $invoice['amount']));
        $qrBill->setPaymentReference(QrBill\DataGroup\Element\PaymentReference::create(QrBill\DataGroup\Element\PaymentReference::TYPE_QR, (string) $invoice['qr_reference']));
        $qrBill->setAdditionalInformation(QrBill\DataGroup\Element\AdditionalInformation::create('Mitgliederbeitrag ' . $invoice['invoice_number']));

        $pdf = new TCPDF('P', 'mm', 'A4', true, 'UTF-8');
        $pdf->setPrintHeader(false);
        $pdf->setPrintFooter(false);
        $pdf->SetMargins(20, 18, 20);
        $pdf->AddPage();
        $pdf->SetFont('helvetica', '', 11);
        $pdf->writeHTML(sprintf(
            '<h1>Swiss TR-Club</h1><h2>Mitgliederrechnung %s</h2><p>%s<br>%s %s<br>%s %s</p><p><strong>Betrag:</strong> CHF %s<br><strong>Fällig:</strong> %s</p>',
            esc_html((string) $invoice['invoice_number']), esc_html($user->display_name),
            esc_html((string) get_user_meta($user->ID, 'strc_street', true)), esc_html((string) get_user_meta($user->ID, 'strc_house_number', true)),
            esc_html((string) get_user_meta($user->ID, 'strc_postcode', true)), esc_html((string) get_user_meta($user->ID, 'strc_city', true)),
            esc_html(number_format((float) $invoice['amount'], 2, '.', "'")), esc_html((string) $invoice['due_on'])
        ));

        $options = (new DisplayOptions())->setPrintable(false)->setDisplayTextDownArrows(false)->setDisplayScissors(false);
        (new TcPdfOutput($qrBill, 'de', $pdf))->setDisplayOptions($options)->getPaymentPart();

        return $pdf->Output((string) $invoice['invoice_number'] . '.pdf', 'S');
    }
}

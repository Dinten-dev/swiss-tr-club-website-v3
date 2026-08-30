<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Finance;

use RuntimeException;
use SimpleXMLElement;

final class CamtImporter
{
    public function __construct(private readonly InvoiceRepository $invoices)
    {
    }

    /** @return array{imported: int, matched: int, duplicates: int, unmatched: int} */
    public function import(string $xml): array
    {
        libxml_use_internal_errors(true);
        $document = simplexml_load_string($xml, SimpleXMLElement::class, LIBXML_NONET | LIBXML_COMPACT);
        if (! $document) {
            throw new RuntimeException('Ungültige CAMT-XML-Datei.');
        }

        $entries = $document->xpath('//*[local-name()="Ntry"]') ?: array();
        $result = array('imported' => 0, 'matched' => 0, 'duplicates' => 0, 'unmatched' => 0);

        foreach ($entries as $entry) {
            $creditDebit = $this->first($entry, './*[local-name()="CdtDbtInd"]');
            if ('CRDT' !== strtoupper($creditDebit)) {
                continue;
            }

            $amountNodes = $entry->xpath('./*[local-name()="Amt"]') ?: array();
            $amountNode = $amountNodes[0] ?? null;
            $amount = $amountNode ? (float) $amountNode : 0.0;
            $currency = $amountNode ? strtoupper((string) $amountNode['Ccy']) : 'CHF';
            $bookingDate = $this->first($entry, './/*[local-name()="BookgDt"]/*[local-name()="Dt"]');
            if ('' === $bookingDate) {
                $bookingDate = substr($this->first($entry, './/*[local-name()="BookgDt"]/*[local-name()="DtTm"]'), 0, 10);
            }

            $reference = $this->findQrReference($entry);
            $debtor = $this->first($entry, './/*[local-name()="Dbtr"]/*[local-name()="Nm"]');
            $bankReference = $this->first($entry, './*[local-name()="AcctSvcrRef"]');
            if ('' === $bankReference) {
                $bankReference = $this->first($entry, './*[local-name()="NtryRef"]');
            }
            $transactionKey = hash('sha256', $bankReference . '|' . $bookingDate . '|' . $amount . '|' . $currency . '|' . $reference . '|' . $entry->asXML());

            $invoice = '' !== $reference ? $this->invoices->findByReference($reference) : null;
            $matched = $invoice && abs((float) $invoice['amount'] - $amount) < 0.005 && $currency === $invoice['currency'];
            $invoiceId = $invoice ? (int) $invoice['id'] : null;
            $status = $matched ? 'matched' : ($invoice ? 'amount_mismatch' : 'unmatched');

            if (! $this->insertPayment($transactionKey, $bookingDate, $amount, $currency, $reference, $debtor, $invoiceId, $status)) {
                ++$result['duplicates'];
                continue;
            }

            ++$result['imported'];
            if ($matched && $invoiceId) {
                $this->invoices->markPaid($invoiceId, $bookingDate . ' 00:00:00');
                ++$result['matched'];
            } else {
                ++$result['unmatched'];
            }
        }

        return $result;
    }

    private function findQrReference(SimpleXMLElement $entry): string
    {
        $nodes = $entry->xpath('.//*[local-name()="CdtrRefInf"]/*[local-name()="Ref"] | .//*[local-name()="Ustrd"]') ?: array();
        foreach ($nodes as $node) {
            $normalized = QrReference::normalize((string) $node);
            if (preg_match('/\d{27}/', $normalized, $match)) {
                return $match[0];
            }
        }

        return '';
    }

    private function first(SimpleXMLElement $node, string $query): string
    {
        $results = $node->xpath($query) ?: array();

        return trim((string) ($results[0] ?? ''));
    }

    private function insertPayment(string $key, string $date, float $amount, string $currency, string $reference, string $debtor, ?int $invoiceId, string $status): bool
    {
        global $wpdb;

        $inserted = $wpdb->query(
            $wpdb->prepare(
                "INSERT IGNORE INTO {$wpdb->prefix}strc_payments
                (transaction_key, booking_date, amount, currency, reference, debtor_name, invoice_id, status, imported_at)
                VALUES (%s, %s, %s, %s, %s, %s, %d, %s, %s)",
                $key,
                $date ?: current_time('Y-m-d'),
                number_format($amount, 2, '.', ''),
                $currency,
                $reference,
                $debtor,
                $invoiceId ?: 0,
                $status,
                current_time('mysql')
            )
        );

        return 1 === $inserted;
    }
}

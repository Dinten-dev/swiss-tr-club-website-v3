<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Members;

final class MemberCsvReader
{
    private const REQUIRED = array('email', 'first_name', 'last_name');
    private const STATUSES = array('pending', 'active', 'grace', 'inactive');

    /** @return array{rows: list<array<string, string>>, errors: list<string>} */
    public function read(string $content): array
    {
        $content = preg_replace('/^\xEF\xBB\xBF/', '', $content) ?? $content;
        $lines = preg_split('/\R/', trim($content)) ?: array();
        if (count($lines) < 2) {
            return array('rows' => array(), 'errors' => array('Die CSV-Datei enthält keine Datensätze.'));
        }

        $delimiter = substr_count($lines[0], ';') >= substr_count($lines[0], ',') ? ';' : ',';
        $header = array_map(array($this, 'normalizeHeader'), str_getcsv(array_shift($lines), $delimiter, '"', ''));
        $missing = array_diff(self::REQUIRED, $header);
        if ($missing) {
            return array('rows' => array(), 'errors' => array('Fehlende Spalten: ' . implode(', ', $missing)));
        }

        $rows = array();
        $errors = array();
        $emails = array();
        foreach ($lines as $index => $line) {
            if ('' === trim($line)) {
                continue;
            }
            $values = str_getcsv($line, $delimiter, '"', '');
            if (count($values) !== count($header)) {
                $errors[] = 'Zeile ' . ($index + 2) . ': Spaltenanzahl stimmt nicht.';
                continue;
            }
            $row = array_combine($header, array_map('trim', $values));
            if (! is_array($row)) {
                continue;
            }
            $email = strtolower($row['email'] ?? '');
            if (! filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $errors[] = 'Zeile ' . ($index + 2) . ': ungültige E-Mail-Adresse.';
                continue;
            }
            if (isset($emails[$email])) {
                $errors[] = 'Zeile ' . ($index + 2) . ': doppelte E-Mail-Adresse.';
                continue;
            }
            $status = strtolower($row['status'] ?? 'active');
            if (! in_array($status, self::STATUSES, true)) {
                $errors[] = 'Zeile ' . ($index + 2) . ': ungültiger Mitgliedsstatus.';
                continue;
            }
            $fee = str_replace(',', '.', $row['annual_fee'] ?? '0');
            if (! is_numeric($fee) || (float) $fee < 0) {
                $errors[] = 'Zeile ' . ($index + 2) . ': ungültiger Jahresbeitrag.';
                continue;
            }
            $membershipType = MembershipTypePolicy::normalize($row['membership_type'] ?? 'individual');
            if (! MembershipTypePolicy::isAllowed($membershipType)) {
                $errors[] = 'Zeile ' . ($index + 2) . ': ungültiger Mitgliedschaftstyp.';
                continue;
            }

            $emails[$email] = true;
            $row['email'] = $email;
            $row['status'] = $status;
            $row['annual_fee'] = number_format((float) $fee, 2, '.', '');
            $row['membership_type'] = $membershipType;
            $rows[] = $row;
        }

        return array('rows' => $rows, 'errors' => $errors);
    }

    private function normalizeHeader(string $header): string
    {
        $normalized = strtolower(trim($header));
        $normalized = str_replace(array(' ', '-'), '_', $normalized);
        $aliases = array('e_mail' => 'email', 'vorname' => 'first_name', 'nachname' => 'last_name', 'mitgliederstatus' => 'status', 'jahresbeitrag' => 'annual_fee');

        return $aliases[$normalized] ?? $normalized;
    }
}

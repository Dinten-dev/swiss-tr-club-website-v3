<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Integrations\Fairgate;

use SwissTRClub\Core\Forms\FormFields;

/**
 * Bringt Fahrzeugangaben aus Fairgate in den Modellkatalog der Website (Entscheid Alain, 24.10.2026).
 * Die Originalangabe bleibt in «details» erhalten, sobald sie vom Katalognamen abweicht.
 *
 * - «kein TR»: kein Fahrzeug, sondern ein Vermerk beim Mitglied (Mitglied hat zurzeit keinen TR).
 * - Katalogmodell mit Zusatz («TR4A IRS», «TR6 RHD»): Katalogmodell, Zusatz in den Details.
 * - «TR3/A/B»: TR3, Untermodell unbekannt (Hinweis in den Details).
 * - Spitfire und andere Triumph (Herald, Vitesse, Dolomite …): «Anderer Triumph».
 * - Leerer/generischer Typ: nur eindeutige Modellangaben aus den Details ergänzen.
 * - Fremdfahrzeuge und unbestimmte Typen: zur Prüfung auflisten; keine Typen erraten.
 * - Baujahr mit «?» oder ungültig: leer; die Fairgate-Angabe steht in den Notizen.
 */
final class FairgateVehicleNormalizer
{
    private const OTHER_TRIUMPH = '/\b(spitfire|herald|vitesse|dolomite|toledo|acclaim|triumph|italia)\b/i';

    /** @return array{result:'vehicle'|'no-tr'|'review'|'empty',input?:array<string,string>,reason?:string} */
    public static function normalize(array $input): array
    {
        $input = array_map(static fn ($value): string => trim((string) $value), $input);
        // A shared number plate does not establish another vehicle; '?' is not vehicle data.
        $identity = array_diff_key($input, array('registration' => true));
        if (!array_filter($identity, static fn ($value): bool => $value !== '' && !preg_match('/^(?:\?+|tbd)$/iD', $value))) return array('result' => 'empty');
        $raw = $input['model'] ?? '';
        if (preg_match('/^kein\s*-?\s*tr\b/i', $raw)) return array('result' => 'no-tr');
        $model = self::model($raw);
        if ($model === null && ($raw === '' || preg_match('/^(?:other|andere|anderer triumph)$/iD', $raw))) {
            $model = self::model($input['details'] ?? '');
        }
        if ($model === null) {
            return array('result' => 'review', 'reason' => $raw === '' ? 'Typ fehlt in Fairgate' : 'Kein Triumph-Modell erkannt: «' . $raw . '»');
        }
        $notes = array();
        $original = $raw;
        if ($model['note'] !== '') $original .= ' – ' . $model['note'];
        if ($raw !== '' && self::key($raw) !== self::key($model['model'])) {
            $input['details'] = trim($original . (($input['details'] ?? '') !== '' ? ' · ' . $input['details'] : ''));
        }
        $input['model'] = $model['model'];
        $year = $input['year'] ?? '';
        if ($year !== '' && (! preg_match('/^\d{4}$/D', $year) || (int) $year < 1900 || (int) $year > (int) gmdate('Y') + 1)) {
            $notes[] = 'Baujahr laut Fairgate: ' . $year;
            $input['year'] = '';
        }
        if ($notes) $input['notes'] = trim(implode(' · ', $notes) . (($input['notes'] ?? '') !== '' ? ' · ' . $input['notes'] : ''));
        return array('result' => 'vehicle', 'input' => $input);
    }

    /** @return array{model:string,note:string}|null */
    private static function model(string $raw): ?array
    {
        if ($raw === '') return null;
        $key = self::key($raw);
        if (preg_match('/^(?:TRIUMPH)?2500MK(?:2|II)PI$/D', $key)) return array('model' => '2.5 PI', 'note' => '');
        if (preg_match('/^(?:TRIUMPH)?ROADSTER(?:1800|2000)$/D', $key)) return array('model' => 'Anderer Triumph', 'note' => '');
        if (preg_match('/^TR3\/?A\/?B$/', strtoupper(preg_replace('/\s+/', '', $raw)))) return array('model' => 'TR3', 'note' => 'Untermodell unbekannt');
        foreach (FormFields::MODELS as $model) if ($key === self::key($model)) return array('model' => $model === 'Spitfire' ? 'Anderer Triumph' : $model, 'note' => '');
        // Längste Katalognamen zuerst, damit «TR250» nicht als «TR2» und «TR6 PI» nicht als «TR6» erkannt wird.
        $models = FormFields::TR_MODELS;
        usort($models, static fn ($a, $b): int => strlen(self::key($b)) <=> strlen(self::key($a)));
        foreach ($models as $model) {
            $candidate = self::key($model);
            if (str_starts_with($key, $candidate) && ! ctype_digit(substr($key, strlen($candidate), 1))) return array('model' => $model, 'note' => '');
        }
        foreach (array('GT6', 'Stag', '2.5 PI') as $model) if (str_starts_with($key, self::key($model))) return array('model' => $model, 'note' => '');
        if (preg_match(self::OTHER_TRIUMPH, $raw)) return array('model' => 'Anderer Triumph', 'note' => '');
        return null;
    }

    private static function key(string $value): string
    {
        return preg_replace('/[^A-Z0-9]/', '', strtoupper($value)) ?? '';
    }
}

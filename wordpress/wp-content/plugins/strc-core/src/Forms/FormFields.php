<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Forms;

/** Shared server-side rules; every form accepts only explicitly listed fields. */
final class FormFields
{
    public const MODELS = ['TR2','TR3','TR3A','TR3B','TR4','TR4A','TR5','TR250','TR6','TR6 PI','TR7','TR8','GT6','Spitfire','Stag','2000','2.5 PI','Anderer Triumph'];
    public const TR_MODELS = ['TR2','TR3','TR3A','TR3B','TR4','TR4A','TR5','TR250','TR6','TR6 PI','TR7','TR8'];
    public static function text(array $input, string $key, int $max = 200, bool $required = false): string
    {
        if (isset($input[$key]) && !is_string($input[$key])) throw new \InvalidArgumentException('Bitte die Eingaben prüfen.');
        $value = trim(sanitize_textarea_field($input[$key] ?? ''));
        if (($required && $value === '') || mb_strlen($value) > $max) throw new \InvalidArgumentException('Bitte alle Pflichtfelder ausfüllen und die erlaubte Textlänge beachten.');
        return $value;
    }
    public static function choice(array $input, string $key, array $choices, string $default = ''): string
    {
        $value = self::text($input, $key);
        if ($value === '') $value = $default;
        if (!in_array($value, $choices, true)) throw new \InvalidArgumentException('Bitte eine gültige Auswahl treffen.');
        return $value;
    }
    public static function contact(array $input, string $prefix = '', bool $names = true, bool $mobileRequired = false): array
    {
        $result = [];
        foreach (['email','phone','street','postcode','city','country'] as $key) $result[$key] = self::text($input, $prefix.$key, 200, $key !== 'phone');
        if (!is_email($result['email'])) throw new \InvalidArgumentException('Bitte eine gültige E-Mail-Adresse eingeben.');
        if ($result['phone'] !== '' && !preg_match('/^[+0-9() .\/-]{5,40}$/D', $result['phone'])) throw new \InvalidArgumentException('Bitte eine gültige Telefonnummer eingeben.');
        if ($mobileRequired && ($result['phone'] === '' || strlen(preg_replace('/\D/', '', $result['phone'])) < 5)) throw new \InvalidArgumentException($prefix === '' ? 'Bitte deine Mobilnummer angeben.' : 'Bitte die Mobilnummer des Co-Piloten angeben.');
        if ($names) {
            foreach (['first_name','last_name'] as $key) $result[$key] = self::text($input, $prefix.$key, 160, true);
            $result['salutation'] = self::choice($input, $prefix.'salutation', ['', 'Frau','Herr','Ohne Anrede']);
            $result['language'] = self::choice($input, $prefix.'language', ['de','fr'], 'de');
            $result['gender'] = self::choice($input, $prefix.'gender', ['', 'female', 'male', 'other']);
            $result['birth_date'] = self::text($input, $prefix.'birth_date', 10);
            if ($result['birth_date'] !== '') {
                $date = \DateTimeImmutable::createFromFormat('!Y-m-d', $result['birth_date']);
                if (!$date || $date->format('Y-m-d') !== $result['birth_date'] || $result['birth_date'] > gmdate('Y-m-d')) throw new \InvalidArgumentException('Bitte ein gültiges Geburtsdatum angeben.');
            }
        }
        return $result;
    }
    public static function vehicle(array $input): array
    {
        $result = ['model'=>self::choice($input, 'model', self::MODELS), 'status'=>self::choice($input, 'status', ['roadworthy','restoration'], 'roadworthy')];
        foreach (['details','year','colour','exteriorColour','interiorColour','chassisNumber','registration','notes'] as $key) $result[$key] = self::text($input, $key, $key === 'notes' ? 1000 : 160);
        // Bildausschnitt des Fahrzeugbilds («cover|x|y» in Prozent); alles andere wird verworfen.
        $frame = is_string($input['photoFrame'] ?? null) ? trim($input['photoFrame']) : '';
        $result['photoFrame'] = preg_match('/^(cover|contain)\|(100|[1-9]?\d)\|(100|[1-9]?\d)$/D', $frame) ? $frame : '';
        if ($result['year'] !== '' && (!preg_match('/^\d{4}$/D', $result['year']) || (int)$result['year'] < 1900 || (int)$result['year'] > (int)gmdate('Y')+1)) throw new \InvalidArgumentException('Bitte ein gültiges Baujahr eingeben.');
        return $result;
    }
    public static function application(array $input, array $regions): array
    {
        $type = self::choice($input, 'membership_type', ['single','couple','young']);
        $result = ['membershipType'=>$type, 'person'=>self::contact($input, '', true, true), 'region'=>self::choice($input, 'region', $regions), 'notes'=>self::text($input, 'notes', 2000), 'vehicles'=>[]];
        if ($type === 'couple') {
            $result['copilot'] = self::contact($input, 'copilot_', true, true);
            if (strcasecmp($result['person']['email'], $result['copilot']['email']) === 0) throw new \InvalidArgumentException('Für beide Personen ist eine eigene E-Mail-Adresse erforderlich.');
        }
        if (isset($input['vehicles']) && !is_string($input['vehicles'])) throw new \InvalidArgumentException('Bitte die Fahrzeugangaben prüfen.');
        $vehicles = json_decode($input['vehicles'] ?? '[]', true);
        if (!is_array($vehicles) || !array_is_list($vehicles)) throw new \InvalidArgumentException('Bitte die Fahrzeugangaben prüfen.');
        if (!$vehicles) throw new \InvalidArgumentException('Bitte mindestens einen Triumph TR angeben.');
        foreach ($vehicles as $vehicle) {
            if (!is_array($vehicle)) throw new \InvalidArgumentException('Bitte die Fahrzeugangaben prüfen.');
            $parsed = self::vehicle($vehicle);
            if ($parsed['year'] === '') throw new \InvalidArgumentException('Bitte das Baujahr angeben.');
            $result['vehicles'][] = $parsed;
        }
        if (!array_intersect(array_column($result['vehicles'], 'model'), self::TR_MODELS)) throw new \InvalidArgumentException('Bitte mindestens einen Triumph TR angeben. Weitere Triumph-Modelle kannst du zusätzlich erfassen.');
        if (($input['statutes'] ?? '') !== '1' || ($input['privacy'] ?? '') !== '1') throw new \InvalidArgumentException('Bitte Statuten und Datenschutzhinweise bestätigen.');
        if ($type === 'couple' && ($input['copilot_confirm'] ?? '') !== '1') throw new \InvalidArgumentException('Bitte die Zustimmung der zweiten Person bestätigen.');
        $result['declarations'] = ['statutes'=>true, 'privacy'=>true, 'copilot'=>$type === 'couple', 'version'=>'2026-09-21'];
        return $result;
    }
}

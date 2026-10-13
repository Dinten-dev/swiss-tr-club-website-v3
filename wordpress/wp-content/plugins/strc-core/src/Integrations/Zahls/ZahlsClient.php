<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Integrations\Zahls;

/** Server-only gateway adapter. API contract: official zahls/zahls-php, v1.15. */
final class ZahlsClient
{
    public static function setting(string $key, string $default = ''): string
    {
        $name = 'STRC_ZAHLS_'.$key;
        return defined($name) ? (string)constant($name) : ((string)getenv($name) ?: $default);
    }
    public static function ready(): bool
    {
        return self::setting('ENABLED') === '1'
            && preg_match('/^[a-z0-9][a-z0-9-]{0,62}$/D', self::setting('INSTANCE'))
            && self::setting('API_KEY') !== '' && self::setting('WEBHOOK_KEY') !== ''
            && in_array(self::setting('MODE', 'TEST'), ['TEST','LIVE'], true)
            && (wp_get_environment_type() === 'production' || self::setting('MODE', 'TEST') === 'TEST');
    }
    public static function minutes(): int { return max(5, min(30, (int)self::setting('HOLD_MINUTES', '15'))); }
    public function create(array $attempt, int $eventId): array
    {
        if (!self::ready()) throw new \RuntimeException('Online-Zahlung ist noch nicht eingerichtet.', 503);
        $return = home_url('/').'#veranstaltung/'.$eventId;
        $result = $this->request('POST', '0', [
            'amount'=>$attempt['amount'], 'currency'=>'CHF', 'referenceId'=>$attempt['reference'],
            'purpose'=>'Swiss TR-Club · Veranstaltung '.$eventId,
            'pm'=>$attempt['method']==='twint' ? ['twint'] : ['visa','mastercard'],
            'validity'=>self::minutes(), 'successRedirectUrl'=>$return,
            'failedRedirectUrl'=>$return, 'cancelRedirectUrl'=>$return,
        ]);
        $gateway = $result['data'][0] ?? null;
        $host = is_array($gateway) ? parse_url((string)($gateway['link']??''), PHP_URL_HOST) : '';
        if (!is_array($gateway) || empty($gateway['id']) || !is_string($host)
            || !preg_match('/(?:^|\.)zahls\.ch$/D', $host)
            || parse_url((string)$gateway['link'], PHP_URL_SCHEME) !== 'https') {
            throw new \RuntimeException('Zahlung konnte nicht sicher zugeordnet werden. Bitte die Veranstaltungsleitung kontaktieren.', 503);
        }
        return ['gatewayId'=>(string)$gateway['id'], 'checkoutUrl'=>$gateway['link']];
    }
    public function revoke(string $id): void
    {
        if (!self::ready() || !preg_match('/^[0-9]+$/D', $id)) throw new \RuntimeException('Zahlungslink konnte nicht aufgehoben werden.', 503);
        $this->request('DELETE', $id);
    }
    private function request(string $method, string $id, ?array $body = null): array
    {
        $response = wp_remote_request('https://api.zahls.ch/v1.15/Gateway/'.$id.'/?'.http_build_query(['instance'=>self::setting('INSTANCE')], '', '&', PHP_QUERY_RFC3986), [
            'method'=>$method, 'timeout'=>8, 'redirection'=>0,
            'headers'=>['x-api-key'=>self::setting('API_KEY'), 'Content-Type'=>'application/json', 'Accept'=>'application/json'],
            'body'=>$body === null ? null : wp_json_encode($body),
        ]);
        // Never retry creation automatically: a timed-out request may have created a gateway.
        if (is_wp_error($response) || wp_remote_retrieve_response_code($response) < 200 || wp_remote_retrieve_response_code($response) >= 300) {
            throw new \RuntimeException('Der Zahlungsdienst ist momentan nicht erreichbar. Ihre Reservierung bleibt bis zum Ablauf erhalten.', 503);
        }
        return json_decode(wp_remote_retrieve_body($response), true) ?: [];
    }
}

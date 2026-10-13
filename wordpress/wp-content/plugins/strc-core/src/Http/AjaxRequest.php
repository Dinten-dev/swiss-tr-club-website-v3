<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Http;

final class AjaxRequest
{
    /** @return array{0:string,1:array<string,string>} */
    public static function read(string $nonceAction, array $writes): array
    {
        $origin = sanitize_url(wp_unslash($_SERVER['HTTP_ORIGIN'] ?? ''));
        if (defined('STRC_FRONTEND_ORIGIN') && '' !== $origin && hash_equals((string) STRC_FRONTEND_ORIGIN, $origin)) {
            header('Access-Control-Allow-Origin: ' . $origin);
            header('Access-Control-Allow-Credentials: true');
            header('Vary: Origin');
        }
        nocache_headers();
        $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
        if (! in_array($method, array('GET', 'POST'), true)) {
            self::fail('Diese Anfrage ist nicht erlaubt.', 405);
        }
        $input = wp_unslash('POST' === $method ? $_POST : $_GET);
        foreach ($input as $value) {
            if (! is_string($value)) {
                self::fail('Ungültige Eingabe.', 400);
            }
        }
        $operation = $input['operation'] ?? 'list';
        if (in_array($operation, $writes, true)) {
            if ('POST' !== $method) {
                self::fail('Bitte das Formular verwenden.', 405);
            }
            if (! wp_verify_nonce($input['nonce'] ?? '', $nonceAction)) {
                self::fail('Sitzung abgelaufen. Bitte neu laden und erneut anmelden.', 403);
            }
        }
        return array($operation, $input);
    }

    public static function fail(string $message, int $status = 400): never
    {
        wp_send_json_error(array('message' => $message), $status);
        exit;
    }
}

<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Integrations\Fairgate;

use Closure;

final class FairgateClient
{
    /** @var Closure(string, string, array<string, mixed>): array{status: int, body: string} */
    private readonly Closure $transport;

    public function __construct(
        private readonly FairgateConfiguration $configuration,
        ?callable $transport = null
    ) {
        $this->transport = null === $transport
            ? Closure::fromCallable(array($this, 'wordpressTransport'))
            : Closure::fromCallable($transport);
    }

    public function createAccessToken(): string
    {
        $this->requireConfiguration();
        $response = $this->request(
            'POST',
            '/fsa/v1.1/auth/create/' . rawurlencode($this->configuration->organisationId()) . '/token',
            array('json' => array('access_key' => $this->configuration->accessKey()))
        );
        $token = $response['token'] ?? $response['access_token'] ?? null;
        if (! is_string($token) || '' === $token) {
            throw new FairgateApiException('Fairgate lieferte kein gültiges Zugriffstoken.');
        }

        return $token;
    }

    /** @return array<string, mixed> */
    public function tokens(?string $refreshToken = null): array
    {
        $this->requireConfiguration();
        $kind = $refreshToken ? 'refresh' : 'create';
        return $this->request('POST', '/fsa/v1.1/auth/'.$kind.'/'.rawurlencode($this->configuration->organisationId()).'/token',
            array('json' => $refreshToken ? array('refresh_token'=>$refreshToken) : array('access_key'=>$this->configuration->accessKey())));
    }

    /** @param array<string,mixed> $payload */
    public function createContact(string $accessToken, array $payload): array
    {
        $this->requireWrites();
        $this->requireConfiguration();
        return $this->request('POST', '/fsa/v2.0/contact/'.rawurlencode($this->configuration->organisationId()).'/data', array('token'=>$accessToken, 'json'=>$payload));
    }

    public function updateContact(string $accessToken, string $contactId, array $payload): array
    {
        $this->requireWrites();
        $this->requireConfiguration();
        if (!preg_match('/^[1-9][0-9]*$/D', $contactId)) throw new FairgateApiException('Ungültige Fairgate Contact ID.');
        return $this->request('PUT', '/fsa/v2.0/contact/'.rawurlencode($this->configuration->organisationId()).'/data/'.$contactId, ['token'=>$accessToken, 'json'=>$payload]);
    }

    public function extendedContact(string $accessToken, string $contactId): array
    {
        $this->requireConfiguration();
        if (! preg_match('/^[1-9][0-9]*$/D', $contactId)) throw new FairgateApiException('Ungültige Fairgate Contact ID.');
        return $this->request('GET', '/fsa/v2.0/contact/'.rawurlencode($this->configuration->organisationId()).'/contacts/'.$contactId.'/extended', array('token'=>$accessToken));
    }

    /** The staging member import uses the documented V2 list, not legacy V1 data. */
    public function listExtendedContactsV2(string $accessToken, int $page = 1): array
    {
        $this->requireConfiguration();
        if ($page < 1 || $page > 100) throw new FairgateApiException('Ungültige Importseite.');
        return $this->request('GET', '/fsa/v2.0/contact/'.rawurlencode($this->configuration->organisationId()).'/contacts/extended?pageNo='.$page.'&pageLimit=100', ['token'=>$accessToken]);
    }

    private function requireWrites(): void
    {
        if ((function_exists('wp_get_environment_type') && wp_get_environment_type()==='staging') || (defined('STRC_FAIRGATE_READ_ONLY') && STRC_FAIRGATE_READ_ONLY)) {
            throw new FairgateApiException('Fairgate ist schreibgeschützt. Änderungen bitte direkt in Fairgate vornehmen.');
        }
    }

    /** @return array<string, mixed> */
    public function listContacts(string $accessToken, int $pageNumber = 1, int $pageLimit = 100, bool $extended = true): array
    {
        $this->requireConfiguration();
        $pageNumber = max(1, $pageNumber);
        $pageLimit = min(100, max(1, $pageLimit));
        $resource = $extended ? 'contacts/extended' : 'contacts';
        $path = sprintf(
            '/fsa/v1.1/contact/%s/%s?pageNo=%d&pageLimit=%d',
            rawurlencode($this->configuration->organisationId()),
            $resource,
            $pageNumber,
            $pageLimit
        );

        return $this->request('GET', $path, array('token' => $accessToken));
    }

    /** @return array<string, mixed> */
    public function contact(string $accessToken, string $contactId): array
    {
        $this->requireConfiguration();
        if ('' === trim($contactId)) {
            throw new FairgateApiException('Die Fairgate Contact ID fehlt.');
        }

        return $this->request(
            'GET',
            '/fsa/v2.0/contact/' . rawurlencode($this->configuration->organisationId()) . '/data/' . rawurlencode($contactId),
            array('token' => $accessToken)
        );
    }

    /** @param array<string, mixed> $options
     *  @return array<string, mixed>
     */
    private function request(string $method, string $path, array $options): array
    {
        $response = ($this->transport)($method, $this->configuration->endpoint($path), $options);
        if ($response['status'] < 200 || $response['status'] >= 300) {
            throw new FairgateApiException('Fairgate-Anfrage fehlgeschlagen (HTTP ' . $response['status'] . ').', $response['status'], (int)($response['retryAfter'] ?? 0));
        }
        $decoded = json_decode($response['body'], true);
        if (! is_array($decoded)) {
            throw new FairgateApiException('Fairgate lieferte eine ungültige JSON-Antwort.');
        }

        if (($decoded['success'] ?? true) === false || (isset($decoded['code']) && (int)$decoded['code'] >= 400)) {
            throw new FairgateApiException('Fairgate hat die Anfrage abgelehnt.', (int)($decoded['code'] ?? 422));
        }
        $data = $decoded['data'] ?? $decoded;
        if (! is_array($data)) throw new FairgateApiException('Fairgate lieferte ein ungültiges Datenformat.');
        return $data;
    }

    private function requireConfiguration(): void
    {
        if (! $this->configuration->isConfigured()) {
            throw new FairgateApiException('Fairgate Contacts API ist nicht konfiguriert.');
        }
    }

    /** @param array<string, mixed> $options
     *  @return array{status: int, body: string}
     */
    private function wordpressTransport(string $method, string $url, array $options): array
    {
        $headers = array('Accept' => 'application/json');
        if (isset($options['token']) && is_string($options['token'])) {
            $headers['Authorization'] = 'Bearer ' . $options['token'];
        }
        $args = array(
            'method' => $method,
            'headers' => $headers,
            'timeout' => 20,
            'sslverify' => true,
            'redirection' => 0,
            'limit_response_size' => 5 * 1024 * 1024,
        );
        if (isset($options['json'])) {
            $args['headers']['Content-Type'] = 'application/json';
            $args['body'] = wp_json_encode($options['json']);
        }
        $response = wp_remote_request($url, $args);
        if (is_wp_error($response)) {
            throw new FairgateApiException('Fairgate ist momentan nicht erreichbar.');
        }

        return array(
            'status' => (int) wp_remote_retrieve_response_code($response),
            'body' => (string) wp_remote_retrieve_body($response),
            'retryAfter' => is_numeric(wp_remote_retrieve_header($response, 'retry-after')) ? min(86400, max(0, (int)wp_remote_retrieve_header($response, 'retry-after'))) : 0,
        );
    }
}

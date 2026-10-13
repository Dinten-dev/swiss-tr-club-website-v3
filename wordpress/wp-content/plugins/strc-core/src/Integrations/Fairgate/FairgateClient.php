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
        $token = $response['access_token'] ?? null;
        if (! is_string($token) || '' === $token) {
            throw new FairgateApiException('Fairgate lieferte kein gültiges Zugriffstoken.');
        }

        return $token;
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
            throw new FairgateApiException('Fairgate-Anfrage fehlgeschlagen (HTTP ' . $response['status'] . ').');
        }
        $decoded = json_decode($response['body'], true);
        if (! is_array($decoded)) {
            throw new FairgateApiException('Fairgate lieferte eine ungültige JSON-Antwort.');
        }

        return $decoded;
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
        );
    }
}

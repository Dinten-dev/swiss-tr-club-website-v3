<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Tests;

use PHPUnit\Framework\TestCase;
use SwissTRClub\Core\Integrations\Fairgate\FairgateApiException;
use SwissTRClub\Core\Integrations\Fairgate\FairgateClient;
use SwissTRClub\Core\Integrations\Fairgate\FairgateConfiguration;

final class FairgateClientTest extends TestCase
{
    public function testCreatesAccessTokenWithoutExposingKeyInUrl(): void
    {
        $request = array();
        $client = new FairgateClient(
            new FairgateConfiguration('strc', 'top-secret'),
            static function (string $method, string $url, array $options) use (&$request): array {
                $request = compact('method', 'url', 'options');

                return array('status' => 200, 'body' => '{"access_token":"token-123","refresh_token":"refresh"}');
            }
        );

        self::assertSame('token-123', $client->createAccessToken());
        self::assertSame('POST', $request['method']);
        self::assertSame('https://fsa.fairgate.ch/fsa/v1.1/auth/create/strc/token', $request['url']);
        self::assertStringNotContainsString('top-secret', $request['url']);
        self::assertSame('top-secret', $request['options']['json']['access_key']);
    }

    public function testListsExtendedContactsWithRequiredPagination(): void
    {
        $requestUrl = '';
        $client = new FairgateClient(
            new FairgateConfiguration('strc', 'secret'),
            static function (string $method, string $url, array $options) use (&$requestUrl): array {
                $requestUrl = $url;
                self::assertSame('GET', $method);
                self::assertSame('token-123', $options['token']);

                return array('status' => 200, 'body' => '{"pageNo":1,"totalPages":1,"contacts":[]}');
            }
        );

        $result = $client->listContacts('token-123');

        self::assertSame(array(), $result['contacts']);
        self::assertStringContainsString('/contacts/extended?pageNo=1&pageLimit=100', $requestUrl);
    }

    public function testRejectsUnconfiguredRequests(): void
    {
        $client = new FairgateClient(new FairgateConfiguration('', ''));

        $this->expectException(FairgateApiException::class);
        $client->createAccessToken();
    }

    public function testRejectsInvalidJson(): void
    {
        $client = new FairgateClient(
            new FairgateConfiguration('strc', 'secret'),
            static fn (): array => array('status' => 200, 'body' => 'not-json')
        );

        $this->expectException(FairgateApiException::class);
        $client->createAccessToken();
    }

    public function testRejectsFailedHttpResponse(): void
    {
        $client = new FairgateClient(
            new FairgateConfiguration('strc', 'secret'),
            static fn (): array => array('status' => 401, 'body' => '{"error":"unauthorized"}')
        );

        $this->expectException(FairgateApiException::class);
        $this->expectExceptionMessage('HTTP 401');
        $client->createAccessToken();
    }
}

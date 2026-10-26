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

    public function testNotificationConfigurationUsesSeparateEndpoints(): void
    {
        $requests = [];
        $client = new FairgateClient(new FairgateConfiguration('strc', 'secret'),
            static function(string $method, string $url, array $options) use (&$requests): array {
                $requests[] = compact('method', 'url', 'options');
                return ['status' => 200, 'body' => $method === 'GET' ? '[]' : '{"message":"Events subscribed successfully"}'];
            });
        $client->notificationEvents('token');
        $client->notificationEvents('token', true);
        $endpoint = 'https://staging.example.test/wp-json/strc/v1/fairgate/events/'.str_repeat('a', 64);
        $client->subscribeNotifications('token', ['contact.data.updated'], $endpoint);
        self::assertSame('https://fsa.fairgate.ch/fsa/v2.0/subscription/strc', $requests[0]['url']);
        self::assertSame('https://fsa.fairgate.ch/fsa/v2.0/subscription/strc/events', $requests[1]['url']);
        self::assertSame('POST', $requests[2]['method']);
        self::assertSame(['events' => ['contact.data.updated'], 'endpoint' => $endpoint], $requests[2]['options']['json']);
        self::assertStringNotContainsString(str_repeat('a', 64), $requests[2]['url']);
    }

    public function testRejectsUnsafeCallbackBeforeNetworkAccess(): void
    {
        $client = new FairgateClient(new FairgateConfiguration('strc', 'secret'), static function(): array {
            self::fail('Invalid callback must not reach the network');
        });
        $this->expectException(FairgateApiException::class);
        $client->subscribeNotifications('token', ['contact.data.updated'], 'http://example.test/webhook');
    }

    public function testRejectsUnknownNotificationEvent(): void
    {
        $client = new FairgateClient(new FairgateConfiguration('strc', 'secret'), static function(): array {
            self::fail('Unknown event must not reach the network');
        });
        $this->expectException(FairgateApiException::class);
        $client->subscribeNotifications('token', ['contact.admin.delete'], 'https://example.test/wp-json/strc/v1/fairgate/events/'.str_repeat('a', 64));
    }

    public function testCopilotWriteExceptionIsOffWithoutExplicitSwitch(): void
    {
        self::assertFalse(FairgateClient::copilotWriteAllowed(['configured_fields'=>['copilot_name'=>'Anna Muster']]));
        self::assertFalse(FairgateClient::copilotWriteAllowed(['basefields'=>['first_name'=>'Anna']]));
    }
    #[\PHPUnit\Framework\Attributes\RunInSeparateProcess]
    #[\PHPUnit\Framework\Attributes\PreserveGlobalState(false)]
    public function testStagingExceptionPermitsOnlyFourCopilotFields(): void
    {
        define('STRC_FAIRGATE_STAGING_COPILOT_WRITE', true);
        define('STRC_FAIRGATE_READ_ONLY', true);
        define('STRC_FAIRGATE_PROFILE_WRITE', ['enabled'=>true,'copilot'=>[
            'first_name'=>'cp_first','last_name'=>'cp_last','email'=>'cp_email','phone'=>'cp_phone',
            'birth_date'=>'cp_birth',
        ]]);
        self::assertTrue(FairgateClient::copilotWriteAllowed(['configured_fields'=>['cp_email'=>'qa@example.invalid']]));
        self::assertFalse(FairgateClient::copilotWriteAllowed(['configured_fields'=>['cp_birth'=>'1980-01-01']]));
        self::assertFalse(FairgateClient::copilotWriteAllowed(['configured_fields'=>['cp_first'=>'QA','member_email'=>'qa@example.invalid']]));
        self::assertFalse(FairgateClient::copilotWriteAllowed(['configured_fields'=>['cp_first'=>'QA'],'correspondence_lang'=>'fr']));
        $requests=[];
        $client=new FairgateClient(new FairgateConfiguration('fixture','fixture-key'),static function($method,$url,$options)use(&$requests){
            $requests[]=[$method,$url,$options];return ['status'=>200,'body'=>'{"success":true,"data":{}}'];
        });
        $client->updateContact('fixture-token','123',['configured_fields'=>['cp_first'=>'QA','cp_last'=>'Fixture','cp_email'=>'qa@example.invalid','cp_phone'=>'+41790000000']]);
        self::assertCount(1,$requests);
        self::assertSame('PUT',$requests[0][0]);
        try {$client->updateContact('fixture-token','123',['configured_fields'=>['cp_birth'=>'1980-01-01']]);self::fail('Birthday write allowed');}catch(FairgateApiException $e){self::assertCount(1,$requests);}
        try {$client->createContact('fixture-token',['basefields'=>['first_name'=>'QA']]);self::fail('Contact creation allowed');}catch(FairgateApiException $e){self::assertCount(1,$requests);}
    }
}

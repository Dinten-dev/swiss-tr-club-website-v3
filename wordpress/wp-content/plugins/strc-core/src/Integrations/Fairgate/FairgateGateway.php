<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Integrations\Fairgate;

/** Tokens never leave the server. Writes are deliberately never auto-replayed. */
final class FairgateGateway
{
    public function __construct(private readonly FairgateClient $client, private readonly FairgateConfiguration $configuration) {}

    public function connectionCheck(bool $force = false): void { if ($force) delete_transient($this->configuration->cacheKey()); $this->token(); }

    public function contact(string $id): array
    {
        try { return $this->client->extendedContact($this->token(), $id); }
        catch (FairgateApiException $error) {
            if ($error->httpStatus !== 401) throw $error;
            delete_transient($this->configuration->cacheKey());
            return $this->client->extendedContact($this->token(), $id);
        }
    }

    public function createContact(array $payload): array
    {
        // A timeout may happen after Fairgate created the contact. No automatic retry.
        return $this->client->createContact($this->token(), $payload);
    }

    public function contactsPage(int $page): array
    {
        try { return $this->client->listExtendedContactsV2($this->token(), $page); }
        catch (FairgateApiException $error) {
            if ($error->httpStatus !== 401) throw $error;
            delete_transient($this->configuration->cacheKey());
            return $this->client->listExtendedContactsV2($this->token(), $page);
        }
    }

    public function updateContact(string $id, array $payload): array
    {
        return $this->client->updateContact($this->token(), $id, $payload);
    }

    private function token(): string
    {
        $key=$this->configuration->cacheKey();
        $cached=get_transient($key);
        if (is_array($cached) && ($cached['expires_at'] ?? 0)>time()+60) return $cached['token'];
        try { $result=$this->client->tokens(is_array($cached) ? ($cached['refresh_token'] ?? null) : null); }
        catch (FairgateApiException $error) {
            if (!is_array($cached) || !in_array($error->httpStatus,array(400,401,403),true)) throw $error;
            $result=$this->client->tokens();
        }
        $token=$result['token'] ?? $result['access_token'] ?? '';
        if (!is_string($token) || !$token) throw new FairgateApiException('Fairgate lieferte kein gültiges Zugriffstoken.');
        $expires=time()+300;
        if (isset($result['expires_in']) && is_numeric($result['expires_in'])) $expires=time()+max(0,min(86400,(int)$result['expires_in']));
        else {
            // exp is only a cache hint from the TLS-protected token endpoint, not an authorization decision.
            $part=explode('.',$token)[1] ?? '';
            $claims=json_decode((string)base64_decode(strtr($part,'-_','+/')),true);
            if (is_array($claims) && is_numeric($claims['exp'] ?? null)) $expires=min(time()+86400,(int)$claims['exp']);
        }
        set_transient($key,array('token'=>$token,'refresh_token'=>$result['refresh_token'] ?? null,'expires_at'=>$expires),max(300,$expires-time()+3600));
        return $token;
    }
}

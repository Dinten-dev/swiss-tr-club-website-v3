<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Integrations\Fairgate;

final class FairgateConfiguration
{
    public function __construct(
        private readonly string $organisationId,
        private readonly string $accessKey,
        private readonly string $administrationUrl = '',
        private readonly string $apiBaseUrl = 'https://fsa.fairgate.ch'
    ) {
    }

    public static function fromConstants(): self
    {
        return new self(
            defined('STRC_FAIRGATE_OID') ? trim((string) STRC_FAIRGATE_OID) : '',
            defined('STRC_FAIRGATE_ACCESS_KEY') ? trim((string) STRC_FAIRGATE_ACCESS_KEY) : '',
            defined('STRC_FAIRGATE_ADMIN_URL') ? trim((string) STRC_FAIRGATE_ADMIN_URL) : '',
            defined('STRC_FAIRGATE_API_BASE_URL') ? trim((string) STRC_FAIRGATE_API_BASE_URL) : 'https://fsa.fairgate.ch'
        );
    }

    public function isConfigured(): bool
    {
        return '' !== $this->organisationId && '' !== $this->accessKey;
    }

    public function organisationId(): string
    {
        return $this->organisationId;
    }

    public function accessKey(): string
    {
        return $this->accessKey;
    }

    public function administrationUrl(): string
    {
        return $this->administrationUrl;
    }

    public function endpoint(string $path): string
    {
        return rtrim($this->apiBaseUrl, '/') . '/' . ltrim($path, '/');
    }
}

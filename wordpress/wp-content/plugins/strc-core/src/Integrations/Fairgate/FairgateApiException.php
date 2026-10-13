<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Integrations\Fairgate;

final class FairgateApiException extends \RuntimeException
{
    public function __construct(string $message, public readonly int $httpStatus = 0, public readonly int $retryAfter = 0)
    {
        parent::__construct($message);
    }
}

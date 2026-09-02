<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Tests;

use PHPUnit\Framework\TestCase;
use SwissTRClub\Core\Integrations\Fairgate\FairgateConfiguration;

final class FairgateConfigurationTest extends TestCase
{
    public function testRequiresOrganisationAndAccessKey(): void
    {
        self::assertFalse((new FairgateConfiguration('', ''))->isConfigured());
        self::assertFalse((new FairgateConfiguration('club', ''))->isConfigured());
        self::assertTrue((new FairgateConfiguration('club', 'secret'))->isConfigured());
    }

    public function testBuildsApiEndpointWithoutDoubleSlash(): void
    {
        $configuration = new FairgateConfiguration('club', 'secret', '', 'https://fsa.fairgate.ch/');

        self::assertSame('https://fsa.fairgate.ch/fsa/v1.1/test', $configuration->endpoint('/fsa/v1.1/test'));
    }
}

<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Tests;

use PHPUnit\Framework\TestCase;
use SwissTRClub\Core\Mail\WelcomeMailSettings;

final class WelcomeMailSettingsTest extends TestCase
{
    public function testWelcomeMailIsDisabledByDefault(): void
    {
        self::assertFalse(WelcomeMailSettings::defaults()['enabled']);
    }

    public function testEditableTemplatesExposeOnlySupportedPlaceholders(): void
    {
        self::assertContains('member_number', WelcomeMailSettings::placeholders());
        self::assertContains('password_url', WelcomeMailSettings::placeholders());
        self::assertContains('contact_url', WelcomeMailSettings::placeholders());
    }
}

<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Tests;

use PHPUnit\Framework\TestCase;
use SwissTRClub\Core\Forms\EventRegistration;

final class EventRegistrationFeesTest extends TestCase
{
    private const SETTINGS = array(
        'fee'=>18000, 'copilotFee'=>17000, 'guestFee'=>21000, 'guestCopilotFee'=>20000,
        'feeDouble'=>14000, 'copilotFeeDouble'=>13000, 'guestFeeDouble'=>16500, 'guestCopilotFeeDouble'=>16000,
    );

    public function testNormalEventUsesOnePricePerBookingType(): void
    {
        $settings = self::SETTINGS + array('weekend'=>false);
        self::assertSame(18000, EventRegistration::roleFee($settings, 'member', ''));
        self::assertSame(17000, EventRegistration::roleFee($settings, 'copilot', 'double'));
        self::assertSame(21000, EventRegistration::roleFee($settings, 'guest', ''));
        self::assertSame(20000, EventRegistration::roleFee($settings, 'guest-copilot', ''));
    }

    public function testWeekendUsesSingleOrDoubleRoomPricePerPerson(): void
    {
        $settings = self::SETTINGS + array('weekend'=>true);
        // Mitglied allein: Einzelzimmer.
        self::assertSame(18000, EventRegistration::roleFee($settings, 'member', 'single'));
        // Mitglied + Co-Pilot Gast im Doppelzimmer.
        self::assertSame(14000 + 16000, EventRegistration::roleFee($settings, 'member', 'double') + EventRegistration::roleFee($settings, 'guest-copilot', 'double'));
        // Gast + Co-Pilot Gast mit 2 × Einzelzimmer.
        self::assertSame(21000 + 20000, EventRegistration::roleFee($settings, 'guest', 'single') + EventRegistration::roleFee($settings, 'guest-copilot', 'single'));
    }
}

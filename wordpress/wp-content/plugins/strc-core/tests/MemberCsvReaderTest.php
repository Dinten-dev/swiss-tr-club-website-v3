<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Tests;

use PHPUnit\Framework\TestCase;
use SwissTRClub\Core\Members\MemberCsvReader;

final class MemberCsvReaderTest extends TestCase
{
    public function testReadsSemicolonSeparatedFairgateStyleExport(): void
    {
        $csv = "E-Mail;Vorname;Nachname;Mitgliederstatus;Jahresbeitrag\nanna@example.test;Anna;Muster;active;125,50";

        $result = (new MemberCsvReader())->read($csv);

        self::assertSame(array(), $result['errors']);
        self::assertSame('anna@example.test', $result['rows'][0]['email']);
        self::assertSame('Anna', $result['rows'][0]['first_name']);
        self::assertSame('125.50', $result['rows'][0]['annual_fee']);
        self::assertSame('individual', $result['rows'][0]['membership_type']);
    }

    public function testRejectsDuplicateEmailAddresses(): void
    {
        $csv = "email,first_name,last_name\na@example.test,A,A\na@example.test,B,B";

        $result = (new MemberCsvReader())->read($csv);

        self::assertCount(1, $result['rows']);
        self::assertStringContainsString('doppelte E-Mail-Adresse', $result['errors'][0]);
    }

    public function testRejectsMissingRequiredColumns(): void
    {
        $result = (new MemberCsvReader())->read("email;first_name\na@example.test;Anna");

        self::assertSame(array(), $result['rows']);
        self::assertStringContainsString('last_name', $result['errors'][0]);
    }

    public function testRejectsInvalidMembershipStatus(): void
    {
        $result = (new MemberCsvReader())->read("email;first_name;last_name;status\na@example.test;Anna;Muster;unknown");

        self::assertSame(array(), $result['rows']);
        self::assertStringContainsString('Mitgliedsstatus', $result['errors'][0]);
    }

    public function testRejectsInvalidMembershipType(): void
    {
        $result = (new MemberCsvReader())->read("email;first_name;last_name;membership_type\na@example.test;Anna;Muster;unknown");

        self::assertSame(array(), $result['rows']);
        self::assertStringContainsString('Mitgliedschaftstyp', $result['errors'][0]);
    }
}

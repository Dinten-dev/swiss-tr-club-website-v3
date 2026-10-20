<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Tests;

use PHPUnit\Framework\TestCase;
use SwissTRClub\Core\Integrations\Fairgate\FairgateProfileWriter;

final class FairgateProfileWriterTest extends TestCase
{
    public function testIncompleteMappingDoesNotReportPartialSuccess(): void
    {
        $writer=new FairgateProfileWriter(['fields'=>['phone'=>'mobile']]);
        self::assertSame([], $writer->payload('fields',['phone'=>'+41790000000','city'=>'Bern']));
        self::assertSame([], $writer->payload('fields',['first_name'=>'Changed']));
        self::assertEquals(['configured_fields'=>['mobile'=>'+41790000000'],'correspondence_lang'=>'fr'], $writer->payload('fields',['phone'=>'+41790000000','language'=>'fr']));
    }

    public function testCombinedCopilotNameRetainsTheOtherName(): void
    {
        $writer=(new FairgateProfileWriter(['copilot'=>['full_name'=>'copilot_name']]))->withCurrent(['first_name'=>'Anna Maria','last_name'=>'Muster']);
        self::assertSame(['configured_fields'=>['copilot_name'=>'Anna Maria Beispiel']], $writer->payload('copilot',['last_name'=>'Beispiel']));
        self::assertSame([], $writer->payload('copilot',['last_name'=>'Beispiel','phone'=>'+41790000000']));
    }
}

<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Tests;

use PHPUnit\Framework\TestCase;
use SwissTRClub\Core\Roles\RoleDefinitions;

final class RoleDefinitionsTest extends TestCase
{
    public function testEveryRoleCanRead(): void
    {
        foreach (RoleDefinitions::all() as $definition) {
            self::assertTrue($definition['capabilities']['read'] ?? false, $definition['name']);
        }
    }

    public function testMemberCanPublishOwnAdvertsAndTopics(): void
    {
        $member = RoleDefinitions::all()['strc_member']['capabilities'];

        self::assertTrue($member['publish_strc_ads']);
        self::assertTrue($member['publish_strc_topics']);
        self::assertArrayNotHasKey('edit_others_strc_ads', $member);
    }

    public function testForumExpertIsNotAnAdministrativeRole(): void
    {
        self::assertArrayNotHasKey('strc_forum_expert', RoleDefinitions::all());
    }

    public function testAdministratorCanManageEventsAndDrives(): void
    {
        $administrator = RoleDefinitions::all()['strc_administrator']['capabilities'];

        self::assertTrue($administrator['publish_strc_events']);
        self::assertTrue($administrator['publish_strc_drives']);
    }

    public function testEditorCannotManageEvents(): void
    {
        $editor = RoleDefinitions::all()['strc_editor']['capabilities'];

        self::assertTrue($editor['publish_posts']);
        self::assertArrayNotHasKey('publish_strc_events', $editor);
    }

    public function testDeveloperHasPlatformAccess(): void
    {
        $developer = RoleDefinitions::all()['strc_developer']['capabilities'];

        self::assertTrue($developer['manage_options']);
        self::assertTrue($developer['publish_strc_events']);
        self::assertTrue($developer['publish_strc_ads']);
    }
}

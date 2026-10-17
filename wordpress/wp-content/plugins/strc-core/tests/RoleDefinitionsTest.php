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
        self::assertTrue($administrator['strc_manage_members']);
        self::assertTrue($administrator['strc_manage_finance']);
        self::assertTrue($administrator['strc_send_bulk_mail']);
        self::assertTrue($administrator['strc_manage_content_roles']);
        self::assertTrue($administrator['strc_manage_member_welcome_mail']);
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

    public function testFunctionalRolesAreAdditiveWithoutMemberAccess(): void
    {
        foreach (RoleDefinitions::assignable() as $slug => $definition) {
            if ($slug === 'strc_developer') continue;
            self::assertArrayNotHasKey('strc_access_member_area', $definition['capabilities'], $slug);
        }
        self::assertArrayHasKey('strc_manage_assigned_events', RoleDefinitions::all()['strc_event_organiser']['capabilities']);
        self::assertArrayNotHasKey('strc_manage_events', RoleDefinitions::all()['strc_event_organiser']['capabilities']);
    }

    public function testClubAdminsCanAssignOperationalAndBoardRolesButNotPlatformRoles(): void
    {
        $roles = RoleDefinitions::assignableFor(false);

        self::assertArrayHasKey('strc_regional_manager', $roles);
        self::assertArrayHasKey('strc_treasurer', $roles);
        self::assertArrayNotHasKey('strc_developer', $roles);
        self::assertArrayHasKey('strc_board_member', $roles);
        self::assertArrayHasKey('strc_developer', RoleDefinitions::assignableFor(true));
        self::assertArrayHasKey('strc_board_member', RoleDefinitions::assignableFor(true));
    }

    public function testBoardDocumentsDoNotFollowTechnicalAdministration(): void
    {
        self::assertArrayHasKey('strc_access_board_documents', RoleDefinitions::all()['strc_board_member']['capabilities']);
        self::assertArrayNotHasKey('strc_access_board_documents', RoleDefinitions::allManagedCapabilities());
        self::assertArrayNotHasKey('strc_access_board_documents', RoleDefinitions::all()['strc_developer']['capabilities']);
    }
}

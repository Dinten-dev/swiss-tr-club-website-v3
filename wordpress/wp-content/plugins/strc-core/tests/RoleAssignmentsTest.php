<?php
declare(strict_types=1);
namespace { if(!function_exists('get_user_meta')){function get_user_meta($id,$key,$single=true){return $GLOBALS['strc_test_meta'][$id][$key]??'';}function get_user_by($field,$id){return $GLOBALS['strc_test_users'][$id]??false;}} }
namespace SwissTRClub\Core\Tests {
use PHPUnit\Framework\TestCase;
use SwissTRClub\Core\Roles\RoleAssignments;
require_once dirname(__DIR__).'/src/Roles/RoleAssignments.php';
final class RoleAssignmentsTest extends TestCase
{
    protected function setUp():void{$GLOBALS['strc_test_meta']=[];$GLOBALS['strc_test_users']=[9=>(object)['roles'=>['strc_member','strc_forum_moderator','strc_event_organiser']]];}
    public function testLegacyLibraryRoleKeepsItsImplicitDocumentAccess():void{$GLOBALS['strc_test_users'][9]->roles=['strc_member','strc_library_administrator'];self::assertSame('limited',RoleAssignments::rows(9)[0]['libraryAccess']);}
    public function testMembershipIsNotAResponsibility():void{$GLOBALS['strc_test_users'][9]->roles=['strc_member'];self::assertSame([],RoleAssignments::rows(9));}
    public function testLegacyScopesRemainAvailableWithoutMutation():void{$GLOBALS['strc_test_meta'][9]=['strc_managed_regions'=>[3],'strc_assigned_events'=>[15],'strc_library_access'=>'limited'];$rows=RoleAssignments::rows(9);self::assertSame([3],$rows[0]['regions']);self::assertSame([15],RoleAssignments::events(9));self::assertFalse(RoleAssignments::scoped(9));}
    public function testRegionScopesDoNotLeakFromClubWideFunctions():void{$GLOBALS['strc_test_meta'][9][RoleAssignments::KEY]=[['role'=>'strc_forum_moderator','regions'=>[2],'assignedEvents'=>[11],'areas'=>[],'libraryAccess'=>'open'],['role'=>'strc_event_organiser','regions'=>[4],'assignedEvents'=>[12],'areas'=>[],'libraryAccess'=>'limited']];self::assertSame([4],RoleAssignments::regions(9));self::assertSame([12],RoleAssignments::events(9));self::assertTrue(RoleAssignments::limited(9));}
    public function testRevokedFunctionAccessIsNotInheritedFromLegacyMetadata():void{$GLOBALS['strc_test_meta'][9]=['strc_library_access'=>'limited',RoleAssignments::KEY=>[]];self::assertFalse(RoleAssignments::limited(9));self::assertSame([],RoleAssignments::regions(9));$GLOBALS['strc_test_meta'][9]['strc_moderation_areas']=['shop'];self::assertSame([],RoleAssignments::areas(9));}
}
}

<?php
declare(strict_types=1);
namespace SwissTRClub\Core\Roles;

use SwissTRClub\Core\Editorial\EditorialAccess;
use SwissTRClub\Core\Events\RegionDirectory;
use SwissTRClub\Core\Forms\FormStore;
use SwissTRClub\Core\Http\AjaxRequest;

/** Each function owns its scope. Legacy metadata remains untouched until reviewed. */
final class RoleAssignments
{
    public const KEY = 'strc_function_assignments_v1';
    public const PROTECTED = ['strc_administrator','strc_developer'];
    public static function options(bool $platform): array { $roles=RoleDefinitions::assignableFor($platform);if($platform)$roles['strc_administrator']=RoleDefinitions::all()['strc_administrator'];return $roles; }
    private static function listMeta(int $id,string $key): array { $value=get_user_meta($id,$key,true);return is_array($value)?array_values($value):[]; }
    public static function rows(int $id): array
    {
        $stored = get_user_meta($id,self::KEY,true);
        if (is_array($stored)) return $stored;
        $user = get_user_by('id',$id);
        if (!$user) return [];
        $rows = [];
        foreach (array_intersect($user->roles,array_keys(self::options(true))) as $role) {
            $rows[] = ['role'=>$role,'regions'=>self::listMeta($id,'strc_managed_regions'),
                'libraryAccess'=>(get_user_meta($id,'strc_library_access',true)?:'open')==='open'&&in_array($role,['strc_library_administrator','strc_developer'],true)?'limited':(get_user_meta($id,'strc_library_access',true)?:'open'),
                'assignedEvents'=>self::listMeta($id,'strc_assigned_events'), 'areas'=>[]];
        }
        $areas = self::listMeta($id,'strc_moderation_areas');
        $regions = self::listMeta($id,'strc_managed_regions');
        if ($areas || $regions) $rows[] = ['role'=>'strc_moderator','regions'=>array_values($regions),'libraryAccess'=>'open','assignedEvents'=>[],'areas'=>array_values($areas)];
        return $rows;
    }
    public static function revision(int $id): string
    {
        $user = get_user_by('id',$id);
        return hash_hmac('sha256',wp_json_encode([self::rows($id),$user?$user->roles:[],get_user_meta($id,'strc_library_access',true)]),wp_salt('auth'));
    }
    public static function scoped(int $id): bool { return is_array(get_user_meta($id,self::KEY,true)); }
    public static function regions(int $id): array
    {
        if (!self::scoped($id)) return self::listMeta($id,'strc_managed_regions');
        $regions = [];
        foreach(self::rows($id) as $row) if (in_array($row['role'],['strc_regional_manager','strc_event_organiser','strc_moderator'],true)) $regions=array_merge($regions,$row['regions']);
        return array_values(array_unique($regions));
    }
    public static function events(int $id): array
    {
        if (!self::scoped($id)) return self::listMeta($id,'strc_assigned_events');
        $events=[];
        foreach(self::rows($id) as $row) if ($row['role']==='strc_event_organiser') $events=array_merge($events,$row['assignedEvents']);
        return array_values(array_unique($events));
    }
    public static function createdEvent(int $id,int $event): bool
    {
        return FormStore::locked('function-assignments-'.$id,static function()use($id,$event):bool{
            if(!self::scoped($id)){update_user_meta($id,'strc_assigned_events',array_values(array_unique(array_merge(self::events($id),[$event]))));return true;}
            $rows=self::rows($id);
            foreach($rows as &$row)if($row['role']==='strc_event_organiser'){$row['assignedEvents']=array_values(array_unique(array_merge($row['assignedEvents'],[$event])));update_user_meta($id,self::KEY,$rows);return true;}
            return false;
        });
    }
    /** Jede zugeteilte Clubfunktion (auch Vorstand) öffnet die Dokumentstufe «Moderator». */
    public static function limited(int $id): bool
    {
        return self::rows($id)!==[];
    }
    public static function areas(int $id): array
    {
        if (!self::scoped($id)) return self::listMeta($id,'strc_moderation_areas');
        $areas=[];
        foreach(self::rows($id) as $row) if ($row['role']==='strc_moderator') $areas=array_merge($areas,$row['areas']??[]);
        return array_values(array_unique($areas));
    }
    public static function save(int $id,array $input): array
    {
        return FormStore::locked('function-assignments-'.$id,static function()use($id,$input):array{
            if (!current_user_can('strc_manage_content_roles') || !current_user_can('edit_user',$id)) AjaxRequest::fail('Keine Berechtigung für Rollenverwaltung.',403);
            $user=get_user_by('id',$id);$platform=current_user_can('manage_options');
            if (!$user || $id===get_current_user_id() || in_array('administrator',$user->roles,true) || (!$platform && array_intersect($user->roles,['strc_administrator','strc_developer']))) AjaxRequest::fail('Dieses Konto verwaltet der Webmaster.',403);
            if (!is_string($input['revision']??null) || !hash_equals(self::revision($id),$input['revision'])) AjaxRequest::fail('Die Zuweisung wurde inzwischen geändert. Bitte neu laden.',409);
            if (!is_string($input['assignments']??null)) AjaxRequest::fail('Bitte die neue Rollenoberfläche laden.',422);
            $rows=json_decode($input['assignments'],true);$allowed=array_keys(self::options($platform));
            $previous=self::rows($id);
            // Existing legacy scopes can be reviewed without silently dropping responsibilities.
            if (array_filter($previous,static fn($row)=>$row['role']==='strc_moderator')) $allowed[]='strc_moderator';
            if (!is_array($rows)||!array_is_list($rows)||count($rows)>30) AjaxRequest::fail('Ungültige Funktionszuweisungen.',422);
            $seen=[];$clean=[];
            foreach($rows as $row){
                if (!is_array($row)||!is_string($row['role']??null)) AjaxRequest::fail('Ungültige Funktion.',422);
                $role=$row['role'];
                if (!$platform && in_array($role,self::PROTECTED,true)) {
                    $old=array_values(array_filter($previous,static fn($p)=>$p['role']===$role));
                    if (count($old)!==1 || $old[0]!==$row) AjaxRequest::fail('Diese Funktion verwaltet der Webmaster.',403);
                    $clean[]=$row;continue;
                }
                if (!in_array($role,$allowed,true)||isset($seen[$role])) AjaxRequest::fail('Ungültige oder doppelte Funktion.',422);
                $seen[$role]=true;
                foreach(['regions','assignedEvents','areas'] as $key) if (!isset($row[$key])||!is_array($row[$key])||!array_is_list($row[$key])) AjaxRequest::fail('Ungültige Zuständigkeit.',422);
                foreach($row['regions'] as $region) if (!is_int($region)||!RegionDirectory::visibleTerm($region)) AjaxRequest::fail('Ungültige Region.',422);
                foreach($row['assignedEvents'] as $event) if (!is_int($event)||get_post_type($event)!=='strc_event') AjaxRequest::fail('Ungültige Veranstaltung.',422);
                foreach($row['areas'] as $area) if (!is_string($area)||!isset(EditorialAccess::AREAS[$area])) AjaxRequest::fail('Ungültiger Bereich.',422);
                // Die Dokumentstufe ergibt sich aus der Rolle: Vorstand → Vorstandsdokumente, jede andere Clubfunktion → Moderator-Dokumente.
                $access=$role==='strc_board_member'?'restricted':'limited';
                // Non-regional functions retain legacy scopes, but cannot acquire unrelated new scopes.
                if (!in_array($role,['strc_regional_manager','strc_event_organiser','strc_moderator'],true) && $row['regions']) {
                    $old=array_values(array_filter($previous,static fn($p)=>$p['role']===$role));
                    if (!$old || $old[0]['regions']!==$row['regions']) AjaxRequest::fail('Diese Funktion ist clubweit.',422);
                }
                $clean[]=['role'=>$role,'regions'=>array_values(array_unique($row['regions'])),'libraryAccess'=>$access,'assignedEvents'=>$role==='strc_event_organiser'?array_values(array_unique($row['assignedEvents'])):[],'areas'=>$role==='strc_moderator'?array_values(array_unique($row['areas'])):[]];
            }
            if (!$platform) foreach($previous as $row) if(in_array($row['role'],self::PROTECTED,true)&&!array_filter($clean,static fn($r)=>$r['role']===$row['role'])) $clean[]=$row;
            if ($clean && !in_array('strc_member',$user->roles,true)) AjaxRequest::fail('Funktionsrollen benötigen ein Mitgliedskonto.',403);
            if (!metadata_exists('user',$id,'strc_assignment_legacy_backup')) update_user_meta($id,'strc_assignment_legacy_backup',['roles'=>$user->roles,'regions'=>get_user_meta($id,'strc_managed_regions',true),'areas'=>get_user_meta($id,'strc_moderation_areas',true),'libraryAccess'=>get_user_meta($id,'strc_library_access',true),'events'=>get_user_meta($id,'strc_assigned_events',true),'verifiedImport'=>get_user_meta($id,'strc_fairgate_verified_existing_user',true)]);
            update_user_meta($id,self::KEY,$clean);
            foreach($allowed as $role) { if(array_filter($clean,static fn($r)=>$r['role']===$role))$user->add_role($role);else $user->remove_role($role); }
            // Reviewed functions must not make a previously imported account fall out of the read-only refresh.
            $contact=(string)get_user_meta($id,'strc_fairgate_contact_id',true);
            if (get_user_meta($id,'strc_fairgate_import_source',true)==='fairgate-readonly' && preg_match('/^[1-9][0-9]*$/D',$contact) && $user->user_login==='strc_fg_'.$contact) {
                $membership=(new \SwissTRClub\Core\Members\MembershipRepository())->findForUser($id);
                if ($membership && (string)$membership['fairgate_contact_id']===$contact) update_user_meta($id,'strc_fairgate_verified_existing_user',(string)$id);
            }
            update_user_meta($id,'strc_assignment_audit',['by'=>get_current_user_id(),'at'=>gmdate(DATE_ATOM)]);
            return ['saved'=>true,'revision'=>self::revision($id),'assignments'=>$clean];
        });
    }
}

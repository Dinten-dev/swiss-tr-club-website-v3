<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Community;

/** Document classes are independent of category; every read path uses this policy. */
final class LibraryPolicy
{
    public static function registerHooks(): void
    {
        add_action('init', static function(): void {
            if (get_option('strc_travel_report_v1')) return;
            $types = get_option('strc_library_types');
            if (is_array($types) && !in_array('travel-report', array_column($types,'key'),true)) {
                $types[] = ['key'=>'travel-report','label'=>'Reiseberichte','group'=>'travel','access'=>'open','fields'=>['region','year']];
                update_option('strc_library_types',$types,false);
            }
            update_option('strc_travel_report_v1',1,false);
        });
        // The native WordPress editor must enforce the same document boundaries.
        add_filter('map_meta_cap',static function(array $caps,string $cap,int $userId,array $args):array{
            if(in_array($cap,['read_post','edit_post','delete_post'],true)&&!empty($args[0])&&get_post_type((int)$args[0])==='strc_document'&&!in_array(self::classification((int)$args[0]),self::classesForUser($userId),true))return ['do_not_allow'];
            return $caps;
        },10,4);
        add_action('pre_get_posts',static function(\WP_Query $query):void{
            if(is_admin()&&$query->is_main_query()&&$query->get('post_type')==='strc_document'&&!(defined('WP_CLI')&&WP_CLI)){
                $meta=$query->get('meta_query')?:[];$query->set('meta_query',['relation'=>'AND',$meta,self::filter()]);
            }
        });
    }
    public static function types(): array { return get_option('strc_library_types')?:json_decode((string)file_get_contents(__DIR__.'/library-types.json'),true); }
    public const GROUPS = [
        'magazine'=>'TR-Magazin', 'newsletter'=>'TR-Newsletter',
        'technical'=>'Technische Dokumente', 'travel'=>'Reiseberichte',
        'club'=>'Clubdokumente', 'operations'=>'Operative Reglemente',
        'board'=>'Vorstandsunterlagen',
    ];
    public static function groupForType(array $type): string
    {
        $defaults=['magazine'=>'magazine','newsletter'=>'newsletter','manual'=>'technical','parts'=>'technical','technical'=>'technical','vehicle'=>'technical','roadbook'=>'travel','regional'=>'travel','statutes'=>'club','club'=>'club','agm'=>'club','operations'=>'operations','board'=>'board','confidential'=>'board'];
        return $type['group']??($defaults[$type['key']]??'');
    }
    public static function groups(): array
    {
        $groups=[];
        foreach(self::GROUPS as $key=>$label){
            $types=array_values(array_map(static fn($type)=>$type['key'],array_filter(self::types(),static fn($type)=>self::groupForType($type)===$key&&in_array($type['access'],self::classes(),true))));
            if($types)$groups[]=['key'=>$key,'label'=>$label,'types'=>$types];
        }
        return $groups;
    }
    public static function classesForImport(): array { return ['open','limited','restricted']; }
    public static function type(string $value): string
    {
        if(in_array($value,array_column(self::types(),'key'),true))return $value;
        return ['TR-Magazin'=>'magazine','Technik / Anleitung'=>'technical'][$value]??'legacy';
    }
    public static function classes(): array { return self::classesForUser(get_current_user_id()); }
    private static function classesForUser(int $userId): array
    {
        if(!user_can($userId,'strc_access_member_area'))return [];
        // Stufen: Mitglied (alle Mitglieder) · Regional (Regionalleitungen, Admins, Bibliotheksverwaltung) · Vorstand (Rolle Vorstand, sieht alles).
        if(user_can($userId,'strc_access_board_documents'))return ['open','limited','restricted'];
        $regional=\SwissTRClub\Core\Roles\RoleAssignments::limited($userId)
            ||user_can($userId,'strc_manage_content_roles')||user_can($userId,'strc_manage_library');
        return $regional?['open','limited']:['open'];
    }
    public static function classification(int $id): string
    {
        $data=get_post_meta($id,'strc_form_classification',true);
        return is_array($data)&&isset($data['access'])?(string)$data['access']:'open';
    }
    public static function canRead(int $id): bool { return in_array(self::classification($id),self::classes(),true); }
    public static function filter(): array
    {
        // Empty legacy classification has always been member-visible. Invalid classes fail closed.
        if(!self::classes())return ['key'=>'strc_document_access','value'=>'__none__'];
        return ['key'=>'strc_document_access','value'=>self::classes(),'compare'=>'IN'];
    }
    public static function index(int $id,array $data,string $title='',string $description='',array $files=[]): void
    {
        $models=$data['models']??[];
        if(!is_array($models))$models=[];
        if(!$models&&!empty($data['model']))$models=[$data['model']];
        $models=array_values(array_unique(array_filter(array_map('sanitize_text_field',$models))));
        update_post_meta($id,'strc_document_access',$data['access']??'open');
        update_post_meta($id,'strc_document_type',self::type($data['documentType']??''));
        update_post_meta($id,'strc_document_model',$models[0]??'');
        update_post_meta($id,'strc_document_models','|'.implode('|',$models).'|');
        update_post_meta($id,'strc_document_duration',$data['duration']??'');
        update_post_meta($id,'strc_document_year',$data['year']??'');
        update_post_meta($id,'strc_document_issue',$data['issue']??'');
        update_post_meta($id,'strc_document_language',$data['language']??'');
        update_post_meta($id,'strc_document_region',$data['region']??'');
        $type=self::type($data['documentType']??'');
        $typeLabels=array_column(self::types(),'label','key');
        $terms=[$title,wp_strip_all_tags($description),$type,$typeLabels[$type]??''];
        foreach($data as $value){
            foreach(is_array($value)?$value:[$value] as $term)if(is_scalar($term))$terms[]=(string)$term;
        }
        foreach($files as $file)if(!empty($file['name']))$terms[]=(string)$file['name'];
        update_post_meta($id,'strc_document_search',sanitize_text_field(implode(' ',array_filter($terms))));
    }
    public static function migrate(): void
    {
        if(get_option('strc_library_index_v4'))return;
        $ids=get_posts(['post_type'=>'strc_document','post_status'=>['publish','pending','private','draft','trash'],'posts_per_page'=>100,'fields'=>'ids','meta_query'=>['relation'=>'OR',['key'=>'strc_document_duration','compare'=>'NOT EXISTS'],['key'=>'strc_document_access','compare'=>'NOT EXISTS']]]);
        foreach($ids as $id){$post=get_post((int)$id);$data=get_post_meta($id,'strc_form_classification',true);self::index((int)$id,is_array($data)?$data:[],$post?$post->post_title:'',$post?$post->post_content:'',get_post_meta($id,'strc_private_files',true)?:[]);}
        if(count($ids)<100)add_option('strc_library_index_v4',1,'',false);
    }
}

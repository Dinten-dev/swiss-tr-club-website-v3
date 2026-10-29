<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Community;

use SwissTRClub\Core\Http\AjaxRequest;
use WP_Query;

final class CommunityEndpoint
{
    private const TYPES = array('forum' => 'strc_topic', 'gallery' => 'strc_album', 'library' => 'strc_document');

    public function registerHooks(): void
    {
        LibraryPolicy::registerHooks();
        add_filter('pre_delete_post',static function($delete,$post){if(in_array($post->post_type,self::TYPES,true)&&$post->post_status==='trash'&&doing_action('wp_scheduled_delete'))return false;return $delete;},10,2);
        add_action('init', [LibraryPolicy::class,'migrate']);
        add_action('init',static function():void{
            foreach(get_posts(['post_type'=>'strc_album','post_status'=>['publish','pending','draft','trash'],'posts_per_page'=>100,'meta_query'=>[['key'=>'strc_album_date','compare'=>'NOT EXISTS']]])as$post){
                $data=get_post_meta($post->ID,'strc_form_classification',true);
                update_post_meta($post->ID,'strc_album_date',!empty($data['date'])?$data['date']:substr($post->post_date,0,10));
            }
        });
        add_action('init',static function():void{
            if(get_option('strc_portrait_filters_v1'))return;
            $posts=get_posts(['post_type'=>'strc_album','post_status'=>['publish','draft','pending','trash'],'posts_per_page'=>100,'meta_query'=>['relation'=>'AND',['key'=>'strc_portrait','compare'=>'EXISTS'],['key'=>'strc_portrait_model','compare'=>'NOT EXISTS']]]);
            foreach($posts as $post){$portrait=self::portrait((int)$post->ID);update_post_meta($post->ID,'strc_portrait_model',self::portraitModel((string)($portrait['vehicle']??'')));update_post_meta($post->ID,'strc_portrait_region',(string)($portrait['region']??''));}
            if(count($posts)<100)update_option('strc_portrait_filters_v1',1,false);
        });
        // Galerie ohne Vorabprüfung (Entscheid Redaktion 28.10.2026): wartende Fotos einmalig freigeben.
        add_action('init',function():void{
            if(get_option('strc_gallery_no_review_v1'))return;
            foreach(get_posts(['post_type'=>'strc_album','post_status'=>['publish','pending'],'posts_per_page'=>-1])as$post){
                $files=$this->files((int)$post->ID);$changed=false;
                foreach($files as &$file)if(($file['reviewStatus']??'pending')==='pending'){$file['reviewStatus']='approved';$changed=true;}unset($file);
                if($changed){update_post_meta($post->ID,'strc_private_files',$files);$this->albumState($post,$files);}
            }
            update_option('strc_gallery_no_review_v1',1,false);
        });
        add_action('wp_ajax_strc_community', array($this, 'respond'));
        add_action('wp_ajax_nopriv_strc_community', array($this, 'respond'));
        add_action('before_delete_post', array($this, 'deleteFiles'));
        add_filter('comment_feed_where', array($this, 'excludePrivateComments'));
        add_filter('comments_clauses', array($this, 'protectCommentQueries'),10,2);
    }

    public function excludePrivateComments(string $where): string
    {
        global $wpdb;
        return $where . " AND NOT EXISTS (SELECT 1 FROM {$wpdb->posts} strc_private_post WHERE strc_private_post.ID = {$wpdb->comments}.comment_post_ID AND strc_private_post.post_type IN ('strc_topic', 'strc_album', 'strc_document'))";
    }

    public function protectCommentQueries(array $clauses, ?\WP_Comment_Query $query=null): array
    {
        if ((defined('WP_CLI') && WP_CLI) || (is_admin() && current_user_can('strc_access_member_area'))) {
            return $clauses;
        }
        $id=absint($query?->query_vars['post_id']??0);
        if($id&&current_user_can('strc_access_member_area')){ $post=get_post($id);if($post&&in_array($post->post_type,self::TYPES,true)&&($post->post_status==='publish'||$this->canEdit($post)||$this->canReadBoardDocument($post))&&($post->post_type!=='strc_document'||LibraryPolicy::canRead($id)))return $clauses; }
        $clauses['where'] = $this->excludePrivateComments($clauses['where'] ?: '1=1');
        return $clauses;
    }

    public function deleteFiles(int $id): void
    {
        if (in_array(get_post_type($id), self::TYPES, true)) {
            (new PrivateUploadStore())->remove($this->files($id));
        }
    }

    private function files(int $id): array
    {
        $files = get_post_meta($id, 'strc_private_files', true);
        return is_array($files) ? $files : array();
    }

    private function originals(): bool { return current_user_can('strc_access_member_area')&&(\SwissTRClub\Core\Editorial\EditorialAccess::area('gallery')||current_user_can('strc_edit_website_content')); }
    private function ownPhotos(\WP_Post $post): bool { foreach($this->files((int)$post->ID) as $file)if((int)($file['submittedBy']??$post->post_author)===get_current_user_id())return true;return false; }
    private function approved(array $file,\WP_Post $post): bool { return ($file['reviewStatus']??($post->post_status==='publish'?'approved':'pending'))==='approved'; }
    private function visibleFiles(\WP_Post $post): array
    {
        $files=$this->files((int)$post->ID);
        if($post->post_type!=='strc_album')return $files;
        return array_values(array_filter($files,fn($file)=>$this->originals()||$this->approved($file,$post)||(int)($file['submittedBy']??$post->post_author)===get_current_user_id()));
    }
    private function albumState(\WP_Post $post,array $files): void
    {
        $hasApproved=false;$hasPending=false;$submitters=[];
        foreach($files as $file){if($this->approved($file,$post))$hasApproved=true;if(($file['reviewStatus']??'pending')==='pending')$hasPending=true;$submitters[]=(int)($file['submittedBy']??$post->post_author);}
        update_post_meta($post->ID,'strc_gallery_pending_count',count(array_filter($files,static fn($file)=>($file['reviewStatus']??'pending')==='pending')));
        update_post_meta($post->ID,'strc_album_submitters','|'.implode('|',array_unique($submitters)).'|');
        $status=$hasApproved?'publish':($hasPending?'pending':'draft');wp_update_post(['ID'=>$post->ID,'post_status'=>$status]);
    }
    private function reviewPhotos(string $operation,array $input): array
    {
        $post=$this->post(absint($input['id']??0));if($post->post_type!=='strc_album'||!$this->canReview($post))AjaxRequest::fail('Keine Galerieberechtigung.',403);
        $keys=json_decode($input['keys']??'[]',true);if(!is_array($keys)||!array_is_list($keys)||!$keys||array_filter($keys,static fn($key)=>!is_string($key)||!preg_match('/^[a-f0-9]{40}$/D',$key)))AjaxRequest::fail('Bitte Bilder auswählen.',422);
        return \SwissTRClub\Core\Forms\FormStore::locked('gallery-review',function()use($post,$keys,$operation,$input){
            $files=$this->files((int)$post->ID);$selected=array_values(array_filter($files,static fn($file)=>in_array($file['key'],$keys,true)));if(count($selected)!==count(array_unique($keys)))AjaxRequest::fail('Bild nicht gefunden.',404);
            if($operation==='cover'){if(count($keys)!==1||!$this->approved($selected[0],$post))AjaxRequest::fail('Ein freigegebenes Titelbild wählen.',422);update_post_meta($post->ID,'strc_album_cover',$keys[0]);}
            elseif($operation==='photos-move'){
                $target=$this->post(absint($input['target']??0));if($target->ID===$post->ID||$target->post_type!=='strc_album')AjaxRequest::fail('Bitte ein anderes Album wählen.',422);
                $old=$this->files((int)$target->ID);$next=array_merge($old,$selected);update_post_meta($target->ID,'strc_private_files',$next);
                if(get_post_meta($target->ID,'strc_private_files',true)!==$next)AjaxRequest::fail('Zielalbum konnte nicht gespeichert werden.',503);
                $remaining=array_values(array_filter($files,static fn($file)=>!in_array($file['key'],$keys,true)));update_post_meta($post->ID,'strc_private_files',$remaining);
                if(get_post_meta($post->ID,'strc_private_files',true)!==$remaining){update_post_meta($target->ID,'strc_private_files',$old);AjaxRequest::fail('Verschieben konnte nicht abgeschlossen werden.',503);}
                $this->albumState($target,$next);$this->albumState($post,$remaining);
            }else{
                $state=$input['state']??'';if(!in_array($state,['approved','rejected'],true))AjaxRequest::fail('Ungültige Freigabe.',422);
                foreach($files as &$file)if(in_array($file['key'],$keys,true)){$file['reviewStatus']=$state;$file['reviewedBy']=get_current_user_id();$file['reviewedAt']=gmdate(DATE_ATOM);if($state!=='approved')$file['public']=false;}unset($file);
                update_post_meta($post->ID,'strc_private_files',$files);$this->albumState($post,$files);
            }
            return ['id'=>(int)$post->ID];
        });
    }

    public function respond(): void
    {
        list($operation, $input) = AjaxRequest::read('strc_community', array('create', 'reply', 'trash', 'restore', 'edit', 'append', 'captions', 'approve', 'reject', 'subscribe', 'close', 'pin', 'merge', 'reply-edit', 'reply-hide', 'photos-review', 'cover', 'photos-move', 'image-policy', 'delete', 'portrait', 'portrait-delete'));
        if($operation==='teasers')wp_send_json_success($this->teasers());
        if($operation==='teaser-file')$this->teaserFile(absint($input['id']??0),$input['key']??'');
        if (! current_user_can('strc_access_member_area')) {
            AjaxRequest::fail('Bitte mit einem aktiven Mitgliederkonto anmelden.', 403);
        }
        header('Cache-Control: private, no-store, max-age=0');
        $result = match ($operation) {
            'list' => $this->listing($input),
            'albums' => $this->albumOptions(),
            'detail' => $this->detail(absint($input['id'] ?? 0), max(1, absint($input['page'] ?? 1))),
            'create' => \SwissTRClub\Core\Forms\FormStore::locked('community-create-'.get_current_user_id(),fn()=>$this->create($input)),
            'append' => \SwissTRClub\Core\Forms\FormStore::locked('community-album-'.absint($input['id']??0),fn()=>$this->append($input)),
            'reply' => $this->reply($input),
            'edit' => $this->edit($input),
            'captions' => $this->captions($input),
            'trash', 'restore', 'approve', 'reject' => $this->status($operation, absint($input['id'] ?? 0)),
            'delete' => $this->deleteTopic(absint($input['id'] ?? 0)),
            'photos-review','cover','photos-move'=>$this->reviewPhotos($operation,$input),
            'gallery-recent'=>$this->galleryRecent(),
            'gallery-events'=>$this->galleryEvents(($input['recent']??'')==='1'),
            'image-policy'=>$this->imagePolicy($input),
            'portrait'=>\SwissTRClub\Core\Forms\FormStore::locked('community-portrait',fn()=>$this->savePortrait($input)),
            'portrait-delete'=>$this->deletePortrait(absint($input['id']??0)),
            'portrait-member'=>$this->portraitMembers((string)($input['search']??'')),
            'portrait-vehicle-photo'=>$this->portraitVehiclePhoto(absint($input['vehicle']??0)),
            'pin','merge','reply-edit','reply-hide'=>$this->moderateTopic($operation,$input),
            'subscribe', 'close' => $this->topicAction($operation, $input),
            'file' => $this->file(absint($input['id'] ?? 0), $input['key'] ?? ''),
            default => AjaxRequest::fail('Unbekannte Anfrage.'),
        };
        wp_send_json_success($result);
    }

    /** Veranstaltungen für Galerie-Uploads; `recent`: die letzten fünf bereits begonnenen Veranstaltungen (nach Datum). */
    private function galleryEvents(bool $recent): array
    {
        $events=get_posts(['post_type'=>'strc_event','post_status'=>'publish','posts_per_page'=>-1,'meta_key'=>'strc_start_at','orderby'=>'meta_value','order'=>'DESC']);
        if($recent)$events=array_slice(array_values(array_filter($events,static fn($event)=>($start=strtotime((string)get_post_meta($event->ID,'strc_start_at',true)))!==false&&$start<=time())),0,5);
        return array_map(static fn($event)=>['id'=>(int)$event->ID,'title'=>$event->post_title,'date'=>substr((string)get_post_meta($event->ID,'strc_start_at',true),0,10)],$events);
    }

    /** Latest five begun events with a published album, including legacy event-linked albums. */
    private function galleryRecent(): array
    {
        $albums=[];
        foreach(get_posts(['post_type'=>'strc_album','post_status'=>'publish','posts_per_page'=>-1,'orderby'=>'ID','order'=>'DESC'])as$post){
            $classification=get_post_meta($post->ID,'strc_form_classification',true);$id=(int)($classification['eventId']??0);
            if(!$id||get_post_type($id)!=='strc_event'||get_post_status($id)!=='publish'||isset($albums[$id]))continue;
            $start=strtotime((string)get_post_meta($id,'strc_start_at',true));if($start===false||$start>time())continue;
            $albums[$id]=['post'=>$post,'start'=>$start];
        }
        uasort($albums,static fn($a,$b)=>$b['start']<=>$a['start']);
        return ['items'=>array_map(function($row){$item=$this->present($row['post']);$item['classification']['date']=substr((string)get_post_meta((int)$item['classification']['eventId'],'strc_start_at',true),0,10);return $item;},array_slice(array_values($albums),0,5))];
    }

    /** Forumsthema endgültig löschen: durch den Verfasser oder die Forumsmoderation (Dateien werden mitgelöscht). */
    private function deleteTopic(int $id): array
    {
        $post=$this->post($id,true);
        if($post->post_type==='strc_document'){
            // Bibliothek: endgültig löschen nur aus dem Archiv, nur durch die Bibliotheks-Moderation, nie bei Vorstandsunterlagen.
            $typeKey=(string)get_post_meta($id,'strc_document_type',true);$type=null;foreach(LibraryPolicy::types() as $candidate)if(($candidate['key']??'')===$typeKey)$type=$candidate;
            $group=$type?LibraryPolicy::groupForType($type):'';
            if($post->post_status!=='trash')AjaxRequest::fail('Nur archivierte Dokumente können endgültig gelöscht werden.',422);
            $boardDocument=$group==='board'||in_array($typeKey,['board','confidential'],true)||LibraryPolicy::classification($id)==='restricted';
            // Vorstandsunterlagen (Entscheid Redaktion 29.10.2026): nur Vorstand plus Bibliotheksverwalter/Admin/Superadmin (strc_manage_library), mit Löschprotokoll.
            if($boardDocument&&!self::canPurgeBoard())AjaxRequest::fail('Vorstandsunterlagen löschen nur Vorstandsmitglieder mit Bibliotheksverwaltung.',403);
            if(!$boardDocument&&!$this->canReview($post))AjaxRequest::fail('Keine Berechtigung zum Löschen.',403);
            $title=html_entity_decode($post->post_title,ENT_QUOTES|ENT_HTML5,'UTF-8');$label=$type['label']??$typeKey;
            if(!wp_delete_post($id,true))AjaxRequest::fail('Dokument konnte nicht gelöscht werden.',503);
            if($boardDocument){$log=get_option('strc_board_deletion_log',[]);$log=is_array($log)?$log:[];array_unshift($log,['title'=>$title,'type'=>(string)$label,'by'=>wp_get_current_user()->display_name,'byId'=>get_current_user_id(),'at'=>gmdate(DATE_ATOM)]);update_option('strc_board_deletion_log',array_slice($log,0,200),false);}
            return ['id'=>$id,'deleted'=>true];
        }
        if($post->post_type!=='strc_topic')AjaxRequest::fail('Nur Forumsthemen können gelöscht werden.',422);
        if((int)$post->post_author!==get_current_user_id()&&!$this->canReview($post))AjaxRequest::fail('Keine Berechtigung zum Löschen.',403);
        if(!wp_delete_post($id,true))AjaxRequest::fail('Thema konnte nicht gelöscht werden.',503);
        return ['id'=>$id,'deleted'=>true];
    }

    private function post(int $id, bool $allowTrash = false): \WP_Post
    {
        $post = get_post($id);
        if (! $post || ! in_array($post->post_type, self::TYPES, true) || ! in_array($post->post_status, $allowTrash ? array('publish', 'pending', 'draft', 'trash') : array('publish', 'pending', 'draft'), true)) {
            AjaxRequest::fail('Beitrag nicht gefunden.', 404);
        }
        if ($post->post_status !== 'publish' && !$this->canEdit($post)&&!$this->canReadBoardDocument($post)&&!($post->post_type==='strc_album'&&($this->originals()||$this->ownPhotos($post)))) AjaxRequest::fail('Beitrag nicht gefunden.',404);
        if ($post->post_type==='strc_document'&&!LibraryPolicy::canRead($id)) AjaxRequest::fail('Dokument nicht verfügbar.',404);
        return $post;
    }

    private function canEdit(\WP_Post $post): bool
    {
        return (int) $post->post_author === get_current_user_id() || current_user_can('strc_manage_community') || \SwissTRClub\Core\Editorial\EditorialAccess::area((string) array_search($post->post_type, self::TYPES, true));
    }

    /** Vorstandsunterlagen endgültig löschen: Rolle Vorstand und Bibliotheksverwaltung (Bibliotheksverwalter, STRC-Admin, STRC-Superadmin). */
    private static function canPurgeBoard(): bool
    {
        return current_user_can('strc_access_member_area')&&current_user_can('strc_access_board_documents')&&current_user_can('strc_manage_library');
    }

    private function canReview(\WP_Post $post): bool
    {
        return \SwissTRClub\Core\Editorial\EditorialAccess::area((string)array_search($post->post_type,self::TYPES,true));
    }

    /** Board access includes unpublished/archive reads, never editing or moderation. */
    private function canReadBoardDocument(\WP_Post $post): bool
    {
        return $post->post_type==='strc_document'&&current_user_can('strc_access_member_area')&&current_user_can('strc_access_board_documents')&&LibraryPolicy::classification((int)$post->ID)==='restricted';
    }

    private function setSubscription(int $id,bool $subscribe): void
    {
        $ids=array_map('intval',(array)get_user_meta(get_current_user_id(),'strc_topic_subscriptions',true));
        $ids=array_values(array_diff($ids,[$id]));if($subscribe)$ids[]=$id;
        update_user_meta(get_current_user_id(),'strc_topic_subscriptions',$ids);
    }

    private function topicAction(string $operation,array $input): array
    {
        $post=$this->post(absint($input['id']??0));
        if($post->post_type!=='strc_topic')AjaxRequest::fail('Thema nicht gefunden.',404);
        if($operation==='subscribe')$this->setSubscription((int)$post->ID,($input['subscribe']??'')==='1');
        else{
            if(!$this->canReview($post))AjaxRequest::fail('Keine Moderationsberechtigung.',403);
            update_post_meta($post->ID,'strc_topic_closed',($input['closed']??'')==='1');
        }
        return ['id'=>(int)$post->ID];
    }

    private function moderateTopic(string $operation,array $input): array
    {
        $post=$this->post(absint($input['id']??0));
        if($post->post_type!=='strc_topic'||!$this->canReview($post))AjaxRequest::fail('Keine Forumsmoderation.',403);
        if($operation==='pin')update_post_meta($post->ID,'strc_topic_pinned',($input['pinned']??'')==='1');
        elseif($operation==='merge'){
            $target=$this->post(absint($input['target']??0));
            if($target->ID===$post->ID||$target->post_type!=='strc_topic'||$target->post_status!=='publish'||$post->post_status!=='publish'||get_post_meta($target->ID,'strc_topic_merged_into',true)||get_post_meta($post->ID,'strc_topic_merged_into',true))AjaxRequest::fail('Bitte zwei eigenständige veröffentlichte Themen wählen.',409);
            \SwissTRClub\Core\Forms\FormStore::locked('forum-merge',function()use($post,$target){
                if(get_post_meta($post->ID,'strc_topic_merged_into',true))AjaxRequest::fail('Dieses Thema wurde bereits zusammengeführt.',409);
                foreach(get_comments(['post_id'=>$post->ID,'status'=>'all']) as $comment)wp_update_comment(['comment_ID'=>$comment->comment_ID,'comment_post_ID'=>$target->ID]);
                $author=get_userdata((int)$post->post_author);
                wp_insert_comment(['comment_post_ID'=>$target->ID,'user_id'=>(int)$post->post_author,'comment_author'=>$author?$author->display_name:'Clubmitglied','comment_content'=>'Zusammengeführtes Thema: '.$post->post_title."\n".wp_strip_all_tags($post->post_content),'comment_date_gmt'=>$post->post_date_gmt,'comment_approved'=>1]);
                // Both source discussion and files remain available through the retained topic.
                update_post_meta($post->ID,'strc_topic_merged_into',$target->ID);update_post_meta($post->ID,'strc_topic_closed',true);
                foreach(get_users(['meta_key'=>'strc_topic_subscriptions']) as $user){$ids=(array)get_user_meta($user->ID,'strc_topic_subscriptions',true);if(in_array((int)$post->ID,$ids,true)){ $ids[]=(int)$target->ID;update_user_meta($user->ID,'strc_topic_subscriptions',array_values(array_unique($ids)));}}
            });
        }else{
            $comment=get_comment(absint($input['reply']??0));if(!$comment||(int)$comment->comment_post_ID!==(int)$post->ID)AjaxRequest::fail('Antwort nicht gefunden.',404);
            add_comment_meta($comment->comment_ID,'strc_moderation_history',['text'=>$comment->comment_content,'status'=>$comment->comment_approved,'by'=>get_current_user_id(),'at'=>gmdate(DATE_ATOM)]);
            if($operation==='reply-hide')wp_set_comment_status($comment->comment_ID,'hold');
            else{$text=sanitize_textarea_field($input['text']??'');if(!$text||mb_strlen($text)>5000)AjaxRequest::fail('Bitte eine gültige Antwort eingeben.',422);wp_update_comment(['comment_ID'=>$comment->comment_ID,'comment_content'=>$text]);}
        }
        return ['id'=>(int)$post->ID];
    }

    private function notifySubscribers(\WP_Post $post,int $replyId): void
    {
        foreach(get_users(['meta_key'=>'strc_topic_subscriptions','fields'=>'all']) as $user){
            if($user->ID===get_current_user_id()||!user_can($user,'strc_access_member_area')||!in_array((int)$post->ID,(array)get_user_meta($user->ID,'strc_topic_subscriptions',true),true))continue;
            ForumSettings::notify((int)$user->ID,'reply-'.$replyId,'Neue Antwort: '.$post->post_title,home_url('/#forum/'.$post->ID));
        }
    }

    /** Verweis auf ein anderes Bibliotheksdokument (Ersatz/Vorgänger), nur Titel und ID. */
    private function link(int $id): ?array
    {
        if($id<1)return null;$post=get_post($id);
        return $post&&$post->post_type==='strc_document'&&LibraryPolicy::canRead($id)&&($post->post_status==='publish'||$this->canReview($post)||$this->canReadBoardDocument($post))?['id'=>$id,'title'=>html_entity_decode($post->post_title,ENT_QUOTES|ENT_HTML5,'UTF-8')]:null;
    }

    /** Alle, die sichtbare Bilder zum Album beigetragen haben (Ersteller/in zuerst). */
    private function albumAuthors(\WP_Post $post,string $creator): string
    {
        $names=[$creator];
        foreach($this->files((int)$post->ID) as $file){
            if(!$this->approved($file,$post))continue;
            $name=(string)($file['photographer']??'');
            if($name===''&&!empty($file['submittedBy'])){$user=get_userdata((int)$file['submittedBy']);$name=$user?$user->display_name:'';}
            if($name!==''&&!in_array($name,$names,true))$names[]=$name;
        }
        return implode(', ',$names);
    }

    private function present(\WP_Post $post): array
    {
        $author = get_userdata((int) $post->post_author);
        return array('id' => (int) $post->ID, 'kind' => array_search($post->post_type, self::TYPES, true), 'title' => html_entity_decode($post->post_title, ENT_QUOTES | ENT_HTML5, 'UTF-8'), 'description' => html_entity_decode(wp_strip_all_tags($post->post_content), ENT_QUOTES | ENT_HTML5, 'UTF-8'), 'descriptionHtml' => \SwissTRClub\Core\Editorial\EditorialAccess::html(wpautop($post->post_content)), 'author' => $post->post_type==='strc_album'?$this->albumAuthors($post,$author?$author->display_name:'Clubmitglied'):($author?$author->display_name:'Clubmitglied'), 'createdAt' => get_post_time(DATE_ATOM, true, $post), 'canEdit' => $this->canEdit($post), 'canReview'=>$this->canReview($post),'replacedBy'=>$this->link((int)get_post_meta($post->ID,'strc_replaced_by',true)),'replaces'=>$this->link((int)get_post_meta($post->ID,'strc_replaces',true)),'subscribed'=>in_array((int)$post->ID,(array)get_user_meta(get_current_user_id(),'strc_topic_subscriptions',true),true),'pinned'=>(bool)get_post_meta($post->ID,'strc_topic_pinned',true),'mergedInto'=>(int)get_post_meta($post->ID,'strc_topic_merged_into',true),'closed'=>(bool)get_post_meta($post->ID,'strc_topic_closed',true),'status' => $post->post_status, 'classification'=>get_post_meta($post->ID,'strc_form_classification',true)?:[], 'replyCount' => (int) get_comments(array('post_id' => $post->ID, 'status' => 'approve', 'count' => true)), 'files' => array_map(fn ($file): array => array('key' => $file['key'], 'name' => $file['name'], 'mime' => $file['mime'], 'size' => $file['size'], 'optimized'=>(bool)($file['optimized']??false),'caption' => $file['caption'] ?? '', 'photographer' => $file['photographer'] ?? '', 'public'=>(bool)($file['public']??false),'retainOriginal'=>(bool)($file['retainOriginal']??false),'reviewStatus'=>$file['reviewStatus']??($post->post_status==='publish'?'approved':'pending'),'canCaption'=>$this->canReview($post)||(int)($file['submittedBy']??$post->post_author)===get_current_user_id(),'originalUrl'=>get_post_type($post->ID)==='strc_album'&&$this->originals()&&empty($file['originalExpired'])?add_query_arg(['action'=>'strc_community','operation'=>'file','id'=>$post->ID,'key'=>$file['key'],'original'=>'1'],admin_url('admin-ajax.php')):'', 'url' => add_query_arg(array('action' => 'strc_community', 'operation' => 'file', 'id' => $post->ID, 'key' => $file['key']), admin_url('admin-ajax.php'))), $this->visibleFiles($post)), 'coverKey'=>(string)get_post_meta($post->ID,'strc_album_cover',true),'portrait'=>self::portrait((int)$post->ID))+('strc_topic'===$post->post_type?$this->topicStats($post):array());
    }

    /** Forum-Statistik wie in einem klassischen Forum: Aufrufe, letzte Antwort und Beitragszahl des Autors. */
    private function topicStats(\WP_Post $post): array
    {
        $last=get_comments(array('post_id'=>$post->ID,'status'=>'approve','number'=>1,'orderby'=>'comment_ID','order'=>'DESC'));
        $lastReply=null;
        if($last){$user=get_userdata((int)$last[0]->user_id);$lastReply=array('author'=>$user?$user->display_name:'Clubmitglied','createdAt'=>$last[0]->comment_date_gmt.'Z');}
        return array('views'=>(int)get_post_meta($post->ID,'strc_topic_views',true),'lastReply'=>$lastReply,'authorPosts'=>self::forumPosts((int)$post->post_author));
    }

    /** Anzahl Themen und Antworten eines Mitglieds im Forum (pro Anfrage zwischengespeichert). */
    private static function forumPosts(int $userId): int
    {
        static $cache=array();
        if($userId<=0)return 0;
        if(!isset($cache[$userId]))$cache[$userId]=(int)count_user_posts($userId,'strc_topic',true)+(int)get_comments(array('user_id'=>$userId,'status'=>'approve','post_type'=>'strc_topic','count'=>true));
        return $cache[$userId];
    }

    /** Ein Aufruf pro Mitglied und Stunde; eigene Themen zählen nicht. */
    private function countView(\WP_Post $post): void
    {
        $user=get_current_user_id();
        if($user<=0||(int)$post->post_author===$user||'publish'!==$post->post_status)return;
        $key='strc_tv_'.$post->ID.'_'.$user;
        if(get_transient($key))return;
        set_transient($key,1,HOUR_IN_SECONDS);
        update_post_meta($post->ID,'strc_topic_views',(int)get_post_meta($post->ID,'strc_topic_views',true)+1);
    }

    private function albumOptions(): array
    {
        $args = array('post_type' => 'strc_album', 'post_status' => ['publish','pending','draft'], 'posts_per_page' => -1, 'orderby' => 'date', 'order' => 'DESC');
        $filter=null;
        if (! current_user_can('strc_manage_community') && ! \SwissTRClub\Core\Editorial\EditorialAccess::area('gallery')) {
            global $wpdb;
            $filter=static function(string $where,WP_Query $query)use($wpdb):string{
                if($query->get('post_type')!=='strc_album')return $where;
                return $where.$wpdb->prepare(" AND ({$wpdb->posts}.post_status='publish' OR {$wpdb->posts}.post_author=%d OR EXISTS(SELECT 1 FROM {$wpdb->postmeta} sub WHERE sub.post_id={$wpdb->posts}.ID AND sub.meta_key='strc_album_submitters' AND sub.meta_value LIKE %s))",get_current_user_id(),'%|'.get_current_user_id().'|%');
            };
            add_filter('posts_where',$filter,10,2);
        }
        $query = new WP_Query($args);
        if($filter)remove_filter('posts_where',$filter,10);
        $posts=array_filter($query->posts,static fn($post)=>!self::portrait((int)$post->ID));
        return array_values(array_map(static fn ($post): array => array('id' => (int) $post->ID, 'title' => html_entity_decode($post->post_title, ENT_QUOTES | ENT_HTML5, 'UTF-8'), 'eventId' => (int) (((array) get_post_meta($post->ID,'strc_form_classification',true))['eventId'] ?? 0)), $posts));
    }

    private function listing(array $input): array
    {
        $type = self::TYPES[$input['kind'] ?? ''] ?? '';
        if (! $type) {
            AjaxRequest::fail('Ungültiger Bereich.');
        }
        $trash = '1' === ($input['trash'] ?? '');
        if($type==='strc_document'&&$trash&&!\SwissTRClub\Core\Editorial\EditorialAccess::area('library')&&!current_user_can('strc_access_board_documents'))AjaxRequest::fail('Nur die Bibliotheks-Moderation kann das Archiv einsehen.',403);
        $search=sanitize_text_field($input['search']??'');
        $args=['post_type'=>$type,'post_status'=>$trash?'trash':['publish','pending','draft'],'posts_per_page'=>24,'paged'=>max(1,absint($input['page']??1)),
            's'=>'',
            'author'=>($trash&&!current_user_can('strc_manage_community')&&!\SwissTRClub\Core\Editorial\EditorialAccess::area($input['kind'])&&!($type==='strc_document'&&current_user_can('strc_access_board_documents')))||('1'===($input['mine']??'')&&$type!=='strc_album')?get_current_user_id():'',
            'orderby'=>['date'=>'DESC','ID'=>'DESC']];
        $searchFilter=null;
        // Prüfliste der Moderation (#forum/pruefung usw.): nur eingereichte Beiträge, ohne Bereichs- oder Gruppenfilter.
        $reviewOnly='1'===($input['review']??'')&&(\SwissTRClub\Core\Editorial\EditorialAccess::area($input['kind'])||($type==='strc_album'&&$this->originals()));
        if($reviewOnly){
            foreach(['group','documentType','model','component','area','galleryCategory','year','language','duration','region'] as $key)unset($input[$key]);
            $search='';$args['post_status']='pending';
            if($type==='strc_album'){$args['post_status']=['pending','publish'];$args['meta_query']=[['key'=>'strc_gallery_pending_count','value'=>0,'compare'=>'>','type'=>'NUMERIC']];}
        }
        if($type==='strc_document'){
            $args['meta_query']=['relation'=>'AND',LibraryPolicy::filter()];
            if(!empty($input['group'])){
                $groups=array_column(LibraryPolicy::groups(),null,'key');
                if(!isset($groups[$input['group']]))AjaxRequest::fail('Bibliotheksgruppe nicht verfügbar.',403);
                $args['meta_query'][]=['key'=>'strc_document_type','value'=>$groups[$input['group']]['types'],'compare'=>'IN'];
            }
            if(!empty($input['documentType']))$args['meta_query'][]=['key'=>'strc_document_type','value'=>LibraryPolicy::type(sanitize_text_field($input['documentType']))];
            if(!empty($input['model']))$args['meta_query'][]=['key'=>'strc_document_models','value'=>'|'.sanitize_text_field($input['model']).'|','compare'=>'LIKE'];
            foreach(['year'=>'strc_document_year','language'=>'strc_document_language']as$key=>$metaKey)if(!empty($input[$key]))$args['meta_query'][]=['key'=>$metaKey,'value'=>sanitize_text_field($input[$key])];
            if(!empty($input['duration']))$args['meta_query'][]=['key'=>'strc_document_duration','value'=>sanitize_text_field($input['duration']),'compare'=>'LIKE'];
            if(!empty($input['region']))$args['meta_query'][]=['key'=>'strc_document_region','value'=>sanitize_text_field($input['region']),'compare'=>'LIKE'];
            if(in_array($input['documentType']??'', ['magazine','newsletter'], true)){
                $args['meta_query']['year_order']=['key'=>'strc_document_year','type'=>'NUMERIC'];
                $args['meta_query']['issue_order']=['key'=>'strc_document_issue','type'=>'NUMERIC'];
                $args['orderby']=['year_order'=>'DESC','issue_order'=>'DESC','date'=>'DESC'];
            }
            if($search!==''){
                global $wpdb;
                $searchFilter=static function(string $where,WP_Query $query)use($search,$wpdb):string{
                    if($query->get('post_type')!=='strc_document')return $where;
                    $like='%'.$wpdb->esc_like($search).'%';
                    return $where.$wpdb->prepare(" AND ({$wpdb->posts}.post_title LIKE %s OR {$wpdb->posts}.post_content LIKE %s OR EXISTS (SELECT 1 FROM {$wpdb->postmeta} strc_library_search WHERE strc_library_search.post_id={$wpdb->posts}.ID AND strc_library_search.meta_key='strc_document_search' AND strc_library_search.meta_value LIKE %s))",$like,$like,$like);
                };
                add_filter('posts_where',$searchFilter,10,2);
            }
        }
        if($type==='strc_album'&&!empty($input['galleryCategory']))$args['meta_query']=[['key'=>'strc_form_classification','value'=>'"galleryCategory";s:'.strlen(sanitize_text_field($input['galleryCategory'])).':"'.sanitize_text_field($input['galleryCategory']).'";','compare'=>'LIKE']];
        if($type==='strc_album'&&($input['galleryCategory']??'')==='portraits'){
            if(!empty($input['portraitRegion']))$args['meta_query'][]=['key'=>'strc_portrait_region','value'=>sanitize_text_field($input['portraitRegion'])];
            if(!empty($input['portraitModel']))$args['meta_query'][]=['key'=>'strc_portrait_model','value'=>sanitize_text_field($input['portraitModel'])];
        }
        if($type==='strc_topic'){
            $args['meta_query']=['relation'=>'AND'];
            foreach(['area','model','component'] as $key)if(!empty($input[$key]))$args['meta_query'][]=['key'=>'strc_form_classification','value'=>'"'.$key.'";s:'.strlen(sanitize_text_field($input[$key])).':"'.sanitize_text_field($input[$key]).'";','compare'=>'LIKE'];
        }
        if($type!=='strc_document'&&$search!==''){
            global $wpdb;
            $searchFilter=static function(string $where,WP_Query $query)use($type,$search,$wpdb):string{
                if($query->get('post_type')!==$type)return $where;
                $like='%'.$wpdb->esc_like($search).'%';
                return $where.$wpdb->prepare(" AND ({$wpdb->posts}.post_title LIKE %s OR {$wpdb->posts}.post_content LIKE %s OR EXISTS (SELECT 1 FROM {$wpdb->postmeta} m WHERE m.post_id={$wpdb->posts}.ID AND m.meta_key='strc_form_classification' AND m.meta_value LIKE %s) OR EXISTS (SELECT 1 FROM {$wpdb->comments} c WHERE c.comment_post_ID={$wpdb->posts}.ID AND c.comment_approved='1' AND c.comment_content LIKE %s))",$like,$like,$like,$like);
            };
            add_filter('posts_where',$searchFilter,10,2);
        }
        global $wpdb;
        $canReview=\SwissTRClub\Core\Editorial\EditorialAccess::area($input['kind'])||($type==='strc_album'&&$this->originals());
        $visibility=static function(string $where,WP_Query $query)use($type,$canReview,$wpdb,$input):string{
            if($query->get('post_type')!==$type)return $where;
            if($type==='strc_album'&&'1'===($input['mine']??''))return $where.$wpdb->prepare(" AND ({$wpdb->posts}.post_author=%d OR EXISTS(SELECT 1 FROM {$wpdb->postmeta} sub WHERE sub.post_id={$wpdb->posts}.ID AND sub.meta_key='strc_album_submitters' AND sub.meta_value LIKE %s))",get_current_user_id(),'%|'.get_current_user_id().'|%');
            if($canReview)return $where;
            if($type==='strc_document'&&current_user_can('strc_access_board_documents'))return $where.$wpdb->prepare(" AND ({$wpdb->posts}.post_status='publish' OR {$wpdb->posts}.post_author=%d OR EXISTS(SELECT 1 FROM {$wpdb->postmeta} board_document WHERE board_document.post_id={$wpdb->posts}.ID AND board_document.meta_key='strc_document_access' AND board_document.meta_value='restricted'))",get_current_user_id());
            if($type==='strc_album')return $where.$wpdb->prepare(" AND ({$wpdb->posts}.post_status='publish' OR {$wpdb->posts}.post_author=%d OR EXISTS(SELECT 1 FROM {$wpdb->postmeta} sub WHERE sub.post_id={$wpdb->posts}.ID AND sub.meta_key='strc_album_submitters' AND sub.meta_value LIKE %s))",get_current_user_id(),'%|'.get_current_user_id().'|%');
            return $where.$wpdb->prepare(" AND ({$wpdb->posts}.post_status='publish' OR {$wpdb->posts}.post_author=%d)",get_current_user_id());
        };
        add_filter('posts_where',$visibility,10,2);
        $pinnedOrder=static function(string $order,WP_Query $query)use($type,$wpdb):string{
            if($type==='strc_album'&&$query->get('post_type')===$type)return "COALESCE((SELECT NULLIF(d.meta_value,'') FROM {$wpdb->postmeta} d WHERE d.post_id={$wpdb->posts}.ID AND d.meta_key='strc_album_date' LIMIT 1),DATE({$wpdb->posts}.post_date)) DESC, {$wpdb->posts}.ID DESC";
            return $type==='strc_topic'&&$query->get('post_type')===$type?"COALESCE((SELECT CAST(pin.meta_value AS UNSIGNED) FROM {$wpdb->postmeta} pin WHERE pin.post_id={$wpdb->posts}.ID AND pin.meta_key='strc_topic_pinned' LIMIT 1),0) DESC, ".$order:$order;};
        add_filter('posts_orderby',$pinnedOrder,10,2);
        $query=new WP_Query($args);
        $areaCounts=[];
        if($type==='strc_topic'&&empty($input['area'])&&!$trash){
            foreach(CatalogSettings::areas() as $areaName){$countQuery=new WP_Query(['post_type'=>'strc_topic','post_status'=>'publish','posts_per_page'=>1,'fields'=>'ids','no_found_rows'=>false,'meta_query'=>[['key'=>'strc_form_classification','value'=>'"area";s:'.strlen($areaName).':"'.$areaName.'";','compare'=>'LIKE']]]);$areaCounts[$areaName]=(int)$countQuery->found_posts;}
        }
        $galleryCounts=[];
        if($type==='strc_album'&&empty($input['galleryCategory'])&&!$trash){
            foreach(['events','portraits','restorations','history'] as $category){$countQuery=new WP_Query(['post_type'=>'strc_album','post_status'=>'publish','posts_per_page'=>1,'fields'=>'ids','meta_query'=>[['key'=>'strc_form_classification','value'=>'"galleryCategory";s:'.strlen($category).':"'.$category.'";','compare'=>'LIKE']]]);$galleryCounts[$category]=(int)$countQuery->found_posts;}
        }
        remove_filter('posts_orderby',$pinnedOrder,10);
        remove_filter('posts_where',$visibility,10);
        if($searchFilter)remove_filter('posts_where',$searchFilter,10);
        $posts=$type==='strc_document'?array_filter($query->posts,fn($p)=>LibraryPolicy::canRead((int)$p->ID)&&($p->post_status==='publish'||$this->canEdit($p)||$this->canReadBoardDocument($p))):$query->posts;
        $boardLog=$type==='strc_document'&&($input['group']??'')==='board'&&$trash&&current_user_can('strc_access_board_documents')?array_map(static fn($row)=>array_intersect_key($row,array_flip(['title','type','by','at'])),array_slice((array)get_option('strc_board_deletion_log',[]),0,50)):null;
        return ['boardDeletions'=>$boardLog,'canPurgeBoard'=>self::canPurgeBoard(),'areaCounts'=>$areaCounts,'galleryCounts'=>$galleryCounts,'items'=>array_values(array_map(fn($post)=>$this->present($post),$posts)),'pages'=>(int)$query->max_num_pages,'total'=>(int)$query->found_posts,'accessClasses'=>LibraryPolicy::classes(),'libraryGroups'=>$type==='strc_document'?LibraryPolicy::groups():[],'canReview'=>\SwissTRClub\Core\Editorial\EditorialAccess::area($input['kind'])];
    }

    private function detail(int $id, int $page): array
    {
        $post = $this->post($id, true);
        $result = $this->present($post);
        $result['replies'] = array();
        $result['replyPages'] = 0;
        if ('strc_topic' === $post->post_type) {
            if(1===$page){$this->countView($post);$result['views']=(int)get_post_meta($post->ID,'strc_topic_views',true);}
            $comments = get_comments(array('post_id' => $id, 'status' => 'approve', 'number' => 20, 'offset' => ($page - 1) * 20, 'orderby' => 'comment_ID', 'order' => 'ASC'));
            $result['replies'] = array_map(static function ($comment): array {
                $user = get_userdata((int) $comment->user_id);
                return array('id' => (int) $comment->comment_ID, 'author' => $user ? $user->display_name : 'Clubmitglied', 'authorPosts' => self::forumPosts((int) $comment->user_id), 'text' => html_entity_decode(wp_strip_all_tags($comment->comment_content), ENT_QUOTES | ENT_HTML5, 'UTF-8'), 'createdAt' => $comment->comment_date_gmt . 'Z');
            }, $comments);
            $result['replyPages'] = (int) ceil($result['replyCount'] / 20);
        }
        return $result;
    }

    private function texts(array $input): array
    {
        $title = sanitize_text_field($input['title'] ?? '');
        $description = \SwissTRClub\Core\Editorial\EditorialAccess::html($input['description'] ?? '');
        if ('' === $title || mb_strlen($title) > 160 || mb_strlen($description) > 10000) {
            AjaxRequest::fail('Bitte einen Titel angeben und die Textlänge prüfen.');
        }
        // Neue Albumtexte begrenzen; unveränderte ältere Beschreibungen bleiben bearbeitbar.
        $existing = ($input['operation'] ?? '') === 'edit' ? get_post(absint($input['id'] ?? 0)) : null;
        $album = ($input['kind'] ?? '') === 'gallery' || ($existing && $existing->post_type === 'strc_album');
        if ($album && ($input['operation'] ?? '') !== 'portrait' && mb_strlen(trim(wp_strip_all_tags($description))) > 800) {
            if (! $existing || $existing->post_type !== 'strc_album' || $description !== \SwissTRClub\Core\Editorial\EditorialAccess::html($existing->post_content)) {
                AjaxRequest::fail('Der Albumtext darf höchstens 800 Zeichen lang sein.');
            }
        }
        return array($title, $description);
    }

    private function classification(array $input, string $kind, ?\WP_Post $existing = null): array
    {
        $data=[];
        try {
            foreach(['model','component','area','occasion','date','photographer','galleryCategory','eventId','documentType','language','source','year','issue','version','region','start','end','distance','drivingTime','duration']as$key)$data[$key]=\SwissTRClub\Core\Forms\FormFields::text($input,$key,160);
            if($data['model']&&!in_array($data['model'],\SwissTRClub\Core\Forms\FormFields::MODELS,true))throw new \InvalidArgumentException('Bitte ein gültiges Fahrzeugmodell wählen.');
            if($kind==='library'&&(!$data['documentType']||!in_array($data['language'],['de','fr','en','multi','other'],true)))throw new \InvalidArgumentException('Bitte Dokumentart und Sprache auswählen.');
            if($kind==='gallery'&&$data['galleryCategory']&&!in_array($data['galleryCategory'],['events','portraits','restorations','history'],true))throw new \InvalidArgumentException('Bitte eine gültige Galerie-Kategorie wählen.');
            if($kind==='gallery'&&$data['galleryCategory']==='portraits'&&(($existing?(get_post_meta($existing->ID,'strc_form_classification',true)['galleryCategory']??''):'')!=='portraits'))throw new \InvalidArgumentException('Die Mitgliedergalerie wird von der Redaktion über das Porträtformular gepflegt.');
            if($kind==='gallery'&&$data['eventId']&&(get_post_type((int)$data['eventId'])!=='strc_event'||get_post_status((int)$data['eventId'])!=='publish'))throw new \InvalidArgumentException('Veranstaltung nicht verfügbar.');
            if($kind==='gallery')$data['photographer']=$existing?((get_post_meta($existing->ID,'strc_form_classification',true)['photographer']??'')?:get_the_author_meta('display_name',$existing->post_author)):wp_get_current_user()->display_name;
            if($kind==='library'){
                $rawModels=$input['models']??'[]';
                if(is_string($rawModels))$rawModels=json_decode($rawModels,true);
                if(!is_array($rawModels)||!array_is_list($rawModels))throw new \InvalidArgumentException('Bitte Fahrzeugmodelle gültig auswählen.');
                $models=array_values(array_unique(array_filter(array_map(static fn($model):string=>is_string($model)?sanitize_text_field($model):'', $rawModels))));
                foreach($models as $model)if(!in_array($model,\SwissTRClub\Core\Forms\FormFields::MODELS,true))throw new \InvalidArgumentException('Bitte gültige Fahrzeugmodelle auswählen.');
                if(!$models&&$data['model'])$models=[$data['model']];
                $data['models']=$models;
                $data['model']=$models[0]??'';
                $type=LibraryPolicy::type($data['documentType']);
                if($type==='legacy'&&empty($input['id']))throw new \InvalidArgumentException('Bitte eine gültige Dokumentart auswählen.');
                $data['documentType']=$type;
                // Magazin und Newsletter lädt die Redaktion hoch, Clubdokumente der Vorstand (oder die Bibliotheksverwaltung).
                $libraryEditor=\SwissTRClub\Core\Editorial\EditorialAccess::area('library');
                if((!$existing||LibraryPolicy::type((string)(get_post_meta($existing->ID,'strc_form_classification',true)['documentType']??''))!==$type)&&in_array($type,['magazine','newsletter'],true)&&!$libraryEditor)throw new \InvalidArgumentException('TR-Magazin und Newsletter werden von der Redaktion hochgeladen.');
                if((!$existing||LibraryPolicy::type((string)(get_post_meta($existing->ID,'strc_form_classification',true)['documentType']??''))!==$type)&&in_array($type,['statutes','club','agm'],true)&&!$libraryEditor&&!current_user_can('strc_access_board_documents'))throw new \InvalidArgumentException('Clubdokumente werden vom Vorstand hochgeladen.');
                if(in_array($type,['magazine','newsletter'],true)&&(!$data['issue']||!$data['year']))throw new \InvalidArgumentException('Bitte Ausgabe und Erscheinungsjahr angeben.');
                $types=array_column(LibraryPolicy::types(),null,'key');
                if(isset($types[$type])&&!in_array($types[$type]['access'],LibraryPolicy::classes(),true))throw new \InvalidArgumentException('Für diese Dokumentart fehlt die Berechtigung.');
                $minimum=$types[$type]['access']??'open';
                $data['access']=\SwissTRClub\Core\Forms\FormFields::text($input,'access',20)?:($existing?LibraryPolicy::classification((int)$existing->ID):$minimum);
                if(!in_array($data['access'],LibraryPolicy::classes(),true))throw new \InvalidArgumentException('Für diese Zugriffsklasse fehlt die Berechtigung.');
                if($existing&&$data['access']!==LibraryPolicy::classification((int)$existing->ID)&&!$libraryEditor)AjaxRequest::fail('Nur die Bibliotheksverwaltung darf die Zugriffsklasse ändern.',403);
                $ranks=['open'=>0,'limited'=>1,'restricted'=>2];
                if(($ranks[$data['access']]??-1)<($ranks[$minimum]??2))throw new \InvalidArgumentException('Die Zugriffsklasse darf den Schutz der Dokumentart nicht unterschreiten.');
            }
            if($data['date']&&!preg_match('/^\d{4}-\d{2}-\d{2}$/D',$data['date']))throw new \InvalidArgumentException('Bitte ein gültiges Aufnahmedatum angeben.');
            if($data['year']&&!preg_match('/^\d{4}$/D',$data['year']))throw new \InvalidArgumentException('Bitte ein vierstelliges Erscheinungsjahr angeben.');
        }catch(\InvalidArgumentException $e){AjaxRequest::fail($e->getMessage(),422);}
        return $data;
    }

    private function create(array $input): array
    {
        $kind = $input['kind'] ?? '';
        $type = self::TYPES[$kind] ?? '';
        if (! $type) {
            AjaxRequest::fail('Ungültiger Bereich.');
        }
        $request=$input['requestId']??'';$token=$input['fileToken']??'';if(($request&&!preg_match('/^[a-f0-9-]{36}$/D',$request))||($kind==='gallery'&&$request&&!preg_match('/^[a-f0-9-]{36}$/D',$token)))AjaxRequest::fail('Ungültige Upload-Anfrage.',422);
        $requests=(array)get_user_meta(get_current_user_id(),'strc_upload_requests',true);
        if($request&&!empty($requests[$request])){ $existing=$this->post((int)$requests[$request]);if($kind==='gallery')return $this->append($input+['id'=>(string)$existing->ID]);return $this->present($existing); }
        list($title, $description) = $this->texts($input);
        $classification=$this->classification($input,$kind);
        $replaces=$kind==='library'?absint($input['replaces']??0):0;
        if($replaces){$old=get_post($replaces);if(!$old||$old->post_type!=='strc_document'||$old->post_status!=='publish'||!LibraryPolicy::canRead($replaces)||!$this->canReview($old))AjaxRequest::fail('Das zu ersetzende Dokument ist nicht verfügbar oder nicht freigegeben.',403);}
        if(($kind!=='forum'||!empty($_FILES['files']['name']))&&($input['rights']??'')!=='1')AjaxRequest::fail('Bitte die Berechtigung zum Teilen des Materials bestätigen.',422);
        if ('forum' === $kind && '' === $description) {
            AjaxRequest::fail('Bitte einen Beitragstext eingeben.');
        }
        $magazine=$kind==='library'&&$classification['documentType']==='magazine';
        if($magazine&&(!is_array($_FILES['files']['name']??null)||count($_FILES['files']['name'])!==1||!is_uploaded_file($_FILES['files']['tmp_name'][0]??'')||(new \finfo(FILEINFO_MIME_TYPE))->file($_FILES['files']['tmp_name'][0])!=='application/pdf'))AjaxRequest::fail('Bitte ein PDF-Dokument bis 25 MB auswählen.',422);
        $savedFiles = (new PrivateUploadStore())->save($_FILES['files'] ?? array(), 'gallery' === $kind, 'library' === $kind, 'gallery' === $kind ? 20 : 6, 0, 'gallery' === $kind ? 16777216 : 20971520, $magazine ? 25*1024*1024 : 100*1024*1024);
        if (is_wp_error($savedFiles)) {
            AjaxRequest::fail($savedFiles->get_error_message());
        }
        if ('forum' !== $kind && ! $savedFiles) {
            AjaxRequest::fail('Bitte mindestens eine Datei auswählen.');
        }
        $id = wp_insert_post(wp_slash(array('post_type' => $type, 'post_status' => 'draft', 'post_title' => $title, 'post_content' => $description, 'post_author' => get_current_user_id(), 'comment_status' => 'closed')), true);
        if (is_wp_error($id)) {
            (new PrivateUploadStore())->remove($savedFiles);
            AjaxRequest::fail('Beitrag konnte nicht gespeichert werden.', 500);
        }
        if($kind==='gallery')foreach($savedFiles as &$file){$file['optimized']=($input['optimized']??'')==='1';$file['caption']=sanitize_text_field($input['caption']??'');$file['photographer']=$classification['photographer'];$file['uploadedAt']=gmdate(DATE_ATOM);$file['submittedBy']=get_current_user_id();$file['reviewStatus']='approved';}unset($file);
        update_post_meta($id, 'strc_private_files', $savedFiles);
        update_post_meta($id,'strc_form_classification',$classification);
        if($kind==='gallery')update_post_meta($id,'strc_album_date',$classification['date']?:substr(get_post($id)->post_date,0,10));
        if($kind==='library')LibraryPolicy::index((int)$id,$classification,$title,$description,$savedFiles);
        // «Ersetzt Dokument …» (nur Prüfende): das alte Dokument wird bei der Freigabe des neuen archiviert.
        if($replaces)update_post_meta($id,'strc_replaces',$replaces);
        update_post_meta($id,'strc_material_rights_at',gmdate(DATE_ATOM));
        $published = wp_update_post(array('ID' => $id, 'post_status' => $kind==='forum'?'publish':'pending'), true);
        if($kind==='forum'){$this->setSubscription((int)$id,true);if(!is_wp_error($published))ForumSettings::notifyNewTopic(get_post((int)$id));}
        if (is_wp_error($published)) {
            wp_delete_post($id, true);
            AjaxRequest::fail('Veröffentlichung fehlgeschlagen.', 500);
        }
        if($request){$requests[$request]=(int)$id;update_user_meta(get_current_user_id(),'strc_upload_requests',array_slice($requests,-50,null,true));}
        // Galerie ohne Vorabprüfung (Entscheid Redaktion 28.10.2026): nur die Bibliothek meldet neue Einreichungen.
        if($kind==='library')SubmissionNotifications::send((int)$id,$kind);
        if($kind==='gallery')$this->albumState(get_post((int)$id),$savedFiles);
        if($kind==='gallery'&&$request&&!empty($input['fileToken']))update_post_meta($id,'strc_upload_tokens',[$input['fileToken']=>$request]);
        return $this->present(get_post($id));
    }

    private function edit(array $input): array
    {
        $post = $this->post(absint($input['id'] ?? 0));
        if (! $this->canEdit($post)) {
            AjaxRequest::fail('Sie können nur eigene Beiträge bearbeiten.', 403);
        }
        if (self::portrait((int)$post->ID)) AjaxRequest::fail('Mitgliederporträts bitte im Porträtformular bearbeiten.',422);
        list($title, $description) = $this->texts($input);
        $classification=$this->classification($input,(string)array_search($post->post_type,self::TYPES,true),$post);
        if ('strc_topic' === $post->post_type && '' === $description) {
            AjaxRequest::fail('Bitte einen Beitragstext eingeben.');
        }
        $result = wp_update_post(wp_slash(array('ID' => $post->ID, 'post_title' => $title, 'post_content' => $description,'post_status'=>$post->post_type==='strc_topic'||$this->canReview($post)?$post->post_status:'pending')), true);
        if (is_wp_error($result)) {
            AjaxRequest::fail('Änderungen konnten nicht gespeichert werden.', 500);
        }
        update_post_meta($post->ID,'strc_form_classification',$classification);
        if($post->post_type==='strc_album')update_post_meta($post->ID,'strc_album_date',$classification['date']?:substr($post->post_date,0,10));
        if($post->post_type==='strc_document')LibraryPolicy::index((int)$post->ID,$classification,$title,$description,$this->files((int)$post->ID));
        return $this->present(get_post($post->ID));
    }

    private function append(array $input): array
    {
        $post = $this->post(absint($input['id'] ?? 0));
        if ('strc_album' !== $post->post_type || ($post->post_status!=='publish'&&!$this->canEdit($post)&&!$this->ownPhotos($post))) {
            AjaxRequest::fail('Sie können dieses Album nicht bearbeiten.', 403);
        }
        if (self::portrait((int)$post->ID)) AjaxRequest::fail('Zu einem Mitgliederporträt gehört genau ein Bild.',422);
        $request=$input['requestId']??'';$token=$input['fileToken']??'';$tokens=(array)get_post_meta($post->ID,'strc_upload_tokens',true);
        if(($request&&(!preg_match('/^[a-f0-9-]{36}$/D',$request)||!preg_match('/^[a-f0-9-]{36}$/D',$token)))||($token&&!preg_match('/^[a-f0-9-]{36}$/D',$token)))AjaxRequest::fail('Ungültige Upload-Anfrage.',422);
        if($token&&isset($tokens[$token]))return $this->present($post);
        if($request&&count(array_filter($tokens,static fn($batch)=>$batch===$request))>=20)AjaxRequest::fail('Höchstens 20 Bilder pro Upload.',422);
        if (($input['rights'] ?? '') !== '1') {
            AjaxRequest::fail('Bitte die Berechtigung zum Teilen des Materials bestätigen.', 422);
        }
        // Fotograf/in ist immer die hochladende Person.
        $photographer = wp_get_current_user()->display_name;
        $uploads = (new PrivateUploadStore())->save($_FILES['files'] ?? array(), true, false, 20, 0, 16777216);
        if (is_wp_error($uploads)) {
            AjaxRequest::fail($uploads->get_error_message());
        }
        if (! $uploads) {
            AjaxRequest::fail('Bitte mindestens ein Foto auswählen.');
        }
        foreach ($uploads as &$upload) {
            $upload['optimized']=($input['optimized']??'')==='1';$upload['caption']=sanitize_text_field($input['caption']??'');$upload['photographer'] = $photographer;
            $upload['uploadedAt']=gmdate(DATE_ATOM);$upload['submittedBy']=get_current_user_id();$upload['reviewStatus']='approved';
        }
        unset($upload);
        $existing=$this->files((int)$post->ID);foreach($existing as &$file){$file['reviewStatus']=$file['reviewStatus']??($post->post_status==='publish'?'approved':'pending');$file['submittedBy']=$file['submittedBy']??(int)$post->post_author;}unset($file);$next=array_merge($existing,$uploads);update_post_meta($post->ID,'strc_private_files',$next);$this->albumState($post,$next);
        if($token){$tokens[$token]=$request;update_post_meta($post->ID,'strc_upload_tokens',$tokens);}
        update_post_meta($post->ID, 'strc_material_rights_at', gmdate(DATE_ATOM));
        
        return $this->present(get_post($post->ID));
    }

    private function captions(array $input): array
    {
        $post = $this->post(absint($input['id'] ?? 0));
        if ('strc_album' !== $post->post_type) {
            AjaxRequest::fail('Sie können dieses Album nicht bearbeiten.', 403);
        }
        $key = is_string($input['key'] ?? null) ? $input['key'] : '';
        $caption = sanitize_textarea_field($input['caption'] ?? '');
        if (mb_strlen($caption) > 240) {
            AjaxRequest::fail('Bildbeschreibungen dürfen höchstens 240 Zeichen umfassen.', 422);
        }
        $files = $this->files((int) $post->ID);
        foreach ($files as $index => $file) {
            if (is_string($file['key'] ?? null) && hash_equals($file['key'], $key)) {
                if(!$this->canReview($post)&&(int)($file['submittedBy']??$post->post_author)!==get_current_user_id())AjaxRequest::fail('Keine Bildberechtigung.',403);
                $files[$index]['caption'] = $caption;
                update_post_meta($post->ID, 'strc_private_files', $files);$this->albumState($post,$files);
                return array('id' => (int) $post->ID, 'key' => $key, 'caption' => $caption);
            }
        }
        AjaxRequest::fail('Bild nicht gefunden.', 404);
    }

    private function reply(array $input): array
    {
        $post = $this->post(absint($input['id'] ?? 0));
        if(get_post_meta($post->ID,'strc_topic_closed',true))AjaxRequest::fail('Dieses Thema ist geschlossen.',409);
        $text = sanitize_textarea_field($input['text'] ?? '');
        if ('strc_topic' !== $post->post_type || '' === $text || mb_strlen($text) > 5000) {
            AjaxRequest::fail('Bitte eine Antwort mit höchstens 5000 Zeichen eingeben.');
        }
        $user = wp_get_current_user();
        $id = wp_insert_comment(array('comment_post_ID' => $post->ID, 'user_id' => $user->ID, 'comment_author' => $user->display_name, 'comment_content' => $text, 'comment_approved' => 1));
        if (! $id) {
            AjaxRequest::fail('Antwort konnte nicht gespeichert werden.', 500);
        }
        $this->notifySubscribers($post,(int)$id);
        return array('id' => (int) $id);
    }

    private function status(string $operation, int $id, bool $locked = false): array
    {
        $post = $this->post($id, true);
        if (! $this->canEdit($post)) {
            AjaxRequest::fail('Sie können nur eigene Beiträge verwalten.', 403);
        }
        if(in_array($operation,['approve','reject'],true)){
            if(!$this->canReview($post))AjaxRequest::fail('Keine Freigabeberechtigung.',403);
            $oldId=$operation==='approve'&&$post->post_type==='strc_document'?absint(get_post_meta($id,'strc_replaces',true)):0;
            if($oldId&&!$locked)return \SwissTRClub\Core\Forms\FormStore::locked('library-replacement-'.$oldId,fn()=>$this->status($operation,$id,true));
            if($oldId){$old=get_post($oldId);if(!$old||$oldId===$id||$old->post_type!=='strc_document'||!LibraryPolicy::canRead($oldId)||!$this->canReview($old))AjaxRequest::fail('Keine Berechtigung zum Ersetzen dieses Dokuments.',403);if($old->post_status!=='publish'&&!($old->post_status==='trash'&&(int)get_post_meta($oldId,'strc_replaced_by',true)===$id))AjaxRequest::fail('Das ursprüngliche Dokument wurde inzwischen archiviert. Bitte die Zuordnung prüfen.',409);}
            if($post->post_type==='strc_album'){$files=$this->files($id);foreach($files as &$file){$file['reviewStatus']=$operation==='approve'?'approved':'rejected';if($operation==='reject')$file['public']=false;}unset($file);update_post_meta($id,'strc_private_files',$files);}
            $result=wp_update_post(['ID'=>$id,'post_status'=>$operation==='approve'?'publish':'draft'],true);
            if(is_wp_error($result))AjaxRequest::fail('Freigabe konnte nicht gespeichert werden.',503);
            if($post->post_type==='strc_album')$this->albumState(get_post($id),$this->files($id));
            if($oldId&&$old->post_status==='publish'){
                update_post_meta($oldId,'strc_pre_archive_status',$old->post_status);
                if(!wp_trash_post($oldId)){wp_update_post(['ID'=>$id,'post_status'=>$post->post_status]);AjaxRequest::fail('Das bisherige Dokument konnte nicht archiviert werden. Die Freigabe wurde zurückgenommen.',503);}
                update_post_meta($oldId,'strc_replaced_by',$id);
            }
            update_post_meta($id,'strc_review',['by'=>get_current_user_id(),'at'=>gmdate(DATE_ATOM),'state'=>$operation]);
            return ['id'=>$id];
        }
        if($operation==='trash'&&$post->post_type==='strc_album')AjaxRequest::fail('Galeriealben bleiben in der Galerie erhalten.',422);
        // Bibliothek: archivieren und wiederherstellen nur durch Admin bzw. Bibliotheks-Moderation.
        if($post->post_type==='strc_document'&&!$this->canReview($post))AjaxRequest::fail('Nur die Bibliotheks-Moderation kann Dokumente archivieren.',403);
        $previousArchiveStatus=(string)get_post_meta($id,'strc_pre_archive_status',true)?:((string)get_post_meta($id,'_wp_trash_meta_status',true));
        if($operation==='trash'&&$post->post_status!=='trash')update_post_meta($id,'strc_pre_archive_status',$post->post_status);
        if($operation==='trash'&&$post->post_type==='strc_document'&&in_array((string)get_post_meta($id,'strc_document_type',true),['magazine','newsletter'],true))AjaxRequest::fail('TR-Magazin und TR-Newsletter sind bereits ein Archiv.',422);
                $result = 'trash' === $operation ? wp_trash_post($id) : wp_untrash_post($id);
        if (! $result) {
            AjaxRequest::fail('Status konnte nicht geändert werden.', 409);
        }
        if ('restore' === $operation) {
            if($post->post_type==='strc_document') {
                $previous=$previousArchiveStatus;
                if(!in_array($previous,['publish','pending','draft'],true))$previous=(string)get_post_meta($id,'_wp_trash_meta_status',true);
                $review=(array)get_post_meta($id,'strc_review',true);
                if(($review['state']??'')==='reject')$previous='draft';
                $restored=in_array($previous,['publish','pending','draft'],true)?$previous:'pending';
            } else $restored=$post->post_type==='strc_topic'?'publish':'pending';
            $restoredResult=wp_update_post(['ID'=>$id,'post_status'=>$restored],true);
            if(is_wp_error($restoredResult))AjaxRequest::fail('Wiederherstellung konnte nicht abgeschlossen werden.',503);
            if($post->post_type==='strc_document')delete_post_meta($id,'strc_replaced_by');
        }
        return array('id' => $id);
    }

    private function imagePolicy(array $input): array
    {
        $post=$this->post(absint($input['id']??0));
        if($post->post_type!=='strc_album'||(!$this->canReview($post)&&!$this->originals()))AjaxRequest::fail('Keine Galerieberechtigung.',403);
        $files=$this->files((int)$post->ID);$found=false;
        foreach($files as &$file)if(hash_equals($file['key'],$input['key']??'')){
            if(!$this->canReview($post)&&(($input['public']??'')==='1')!==(bool)($file['public']??false))AjaxRequest::fail('Nur Galerie-Moderatoren wählen öffentliche Bilder.',403);
            if($this->canReview($post)){$public=($input['public']??'')==='1';if($public&&empty($file['public']))$file['publicAt']=gmdate(DATE_ATOM);$file['public']=$public;}$found=true;
        }unset($file);
        if(!$found)AjaxRequest::fail('Bild nicht gefunden.',404);
        update_post_meta($post->ID,'strc_private_files',$files);return $this->present(get_post($post->ID));
    }
    private function teasers(): array
    {
        // Für die Startseite ausgewählte Albumbilder, zuletzt ausgewählte zuerst (ältere Auswahl ohne Zeitpunkt nach Albumdatum).
        $images=[];
        foreach(get_posts(['post_type'=>'strc_album','post_status'=>'publish','posts_per_page'=>-1]) as $post)foreach($this->files((int)$post->ID) as $file)if(!empty($file['public'])&&$this->approved($file,$post)){
            $images[]=['url'=>add_query_arg(['action'=>'strc_community','operation'=>'teaser-file','id'=>$post->ID,'key'=>$file['key']],admin_url('admin-ajax.php')),'caption'=>$file['caption']??'','sort'=>(string)($file['publicAt']??'').'|'.$post->post_date_gmt];
        }
        usort($images,static fn($a,$b)=>strcmp($b['sort'],$a['sort']));
        return array_map(static fn($image)=>['url'=>$image['url'],'caption'=>$image['caption']],array_slice($images,0,24));
    }
    private function teaserFile(int $id,string $key): never
    {
        if(get_post_type($id)!=='strc_album'||get_post_status($id)!=='publish')AjaxRequest::fail('Bild nicht gefunden.',404);
        foreach($this->files($id) as $file)if(hash_equals($file['key'],$key)&&!empty($file['public'])&&$this->approved($file,get_post($id))){
            $view=(new PrivateUploadStore())->webCopy($file);if(is_wp_error($view))AjaxRequest::fail('Bild momentan nicht verfügbar.',503);
            (new PrivateUploadStore())->stream($view);
        }
        AjaxRequest::fail('Bild nicht gefunden.',404);
    }

    private function file(int $id, string $key): never
    {
        $post=$this->post($id,true);
        foreach ($this->visibleFiles($post) as $file) {
            if (hash_equals($file['key'], $key)) {
                if(get_post_type($id)==='strc_album'){
                    if(($_GET['original']??'')==='1'){
                        if(!$this->originals())AjaxRequest::fail('Kein Zugriff auf Originalbilder.',403);
                    }else{
                        $view=(new PrivateUploadStore())->webCopy($file);
                        if(is_wp_error($view))AjaxRequest::fail($view->get_error_message(),503);
                        $file=$view;
                    }
                }
                (new PrivateUploadStore())->stream($file);
            }
        }
        AjaxRequest::fail('Datei nicht gefunden.', 404);
    }

    /** Steckbrief der Mitgliedergalerie (leer = normales Album). */
    public const PORTRAIT_FIELDS=['vehicle'=>60,'chassis'=>40,'year'=>4,'note'=>60,'features'=>300,'owner'=>80,'place'=>80,'region'=>40];
    public static function portrait(int $id): array
    {
        $data=get_post_meta($id,'strc_portrait',true);
        return is_array($data)?$data:[];
    }

    /** Mitgliedergalerie: nur Redaktion (Galerie). Ein Bild, Steckbrief, Text bis 800 Zeichen; sofort veröffentlicht. */
    private function savePortrait(array $input): array
    {
        if(!\SwissTRClub\Core\Editorial\EditorialAccess::area('gallery'))AjaxRequest::fail('Die Mitgliedergalerie wird von der Redaktion gepflegt.',403);
        $portrait=[];
        foreach(self::PORTRAIT_FIELDS as $key=>$max){
            $value=$key==='features'?sanitize_textarea_field((string)($input[$key]??'')):sanitize_text_field((string)($input[$key]??''));
            $value=trim(preg_replace("/\n{2,}/","\n",str_replace("\r",'',$value)));
            if(mb_strlen($value)>$max)AjaxRequest::fail('Bitte die Länge des Feldes «'.$key.'» prüfen (max. '.$max.' Zeichen).',422);
            $portrait[$key]=$value;
        }
        if($portrait['vehicle']===''||$portrait['owner']==='')AjaxRequest::fail('Bitte Fahrzeug und Besitzer/in angeben.',422);
        if($portrait['region']!==''){$region=\SwissTRClub\Core\Events\RegionDirectory::canonicalName($portrait['region']);if($region===null||$region==='TRiungsters')AjaxRequest::fail('Bitte eine gültige Region wählen.',422);$portrait['region']=$region;}
        if($portrait['year']!==''&&!preg_match('/^(19|20)\d{2}$/D',$portrait['year']))AjaxRequest::fail('Bitte ein vierstelliges Baujahr angeben.',422);
        $text=trim(str_replace("\r",'',sanitize_textarea_field((string)($input['text']??''))));
        if(mb_strlen($text)>800)AjaxRequest::fail('Der Text darf höchstens 800 Zeichen lang sein.',422);
        if(($input['consent']??'')!=='1')AjaxRequest::fail('Bitte bestätigen, dass das Mitglied mit der Veröffentlichung einverstanden ist.',422);
        $title=$portrait['owner'].' · '.$portrait['vehicle'];
        $id=absint($input['id']??0);$post=$id?$this->post($id):null;
        if($post&&!self::portrait((int)$post->ID))AjaxRequest::fail('Dieser Beitrag ist kein Mitgliederporträt.',422);
        $hasFile=!empty($_FILES['files']['name'][0]??'');
        // Ohne eigenes Bild: Fahrzeugbild aus dem Mitgliederprofil übernehmen (Kopie, das Profilbild bleibt unverändert).
        $vehicleFile=!$hasFile?$this->portraitVehicleFile(absint($input['vehiclePhoto']??0)):null;
        if(!$post&&!$hasFile&&!$vehicleFile)AjaxRequest::fail('Bitte ein Bild auswählen.',422);
        $saved=[];
        if($hasFile||$vehicleFile){
            $saved=$hasFile?(new PrivateUploadStore())->save($_FILES['files'],true,false,1,0,20971520):(new PrivateUploadStore())->duplicate($vehicleFile);
            if(is_wp_error($saved))AjaxRequest::fail($saved->get_error_message(),422);
            foreach($saved as &$file){$file['caption']=$title;$file['photographer']=wp_get_current_user()->display_name;$file['uploadedAt']=gmdate(DATE_ATOM);$file['submittedBy']=get_current_user_id();$file['reviewStatus']='approved';$file['reviewedBy']=get_current_user_id();$file['reviewedAt']=gmdate(DATE_ATOM);$file['retainOriginal']=true;}unset($file);
        }
        $content=wp_slash(['post_title'=>$title,'post_content'=>esc_html($text),'post_status'=>'publish']);
        if($post){$result=wp_update_post($content+['ID'=>$post->ID],true);$id=(int)$post->ID;}
        else{$result=wp_insert_post($content+['post_type'=>'strc_album','post_author'=>get_current_user_id(),'comment_status'=>'closed'],true);$id=is_wp_error($result)?0:(int)$result;}
        if(is_wp_error($result)){if($saved)(new PrivateUploadStore())->remove($saved);AjaxRequest::fail('Porträt konnte nicht gespeichert werden.',500);}
        $classification=['galleryCategory'=>'portraits','model'=>in_array($portrait['vehicle'],\SwissTRClub\Core\Forms\FormFields::MODELS,true)?$portrait['vehicle']:'','photographer'=>wp_get_current_user()->display_name,'date'=>$post?(string)(get_post_meta($id,'strc_form_classification',true)['date']??gmdate('Y-m-d')):gmdate('Y-m-d')];
        update_post_meta($id,'strc_form_classification',$classification);
        update_post_meta($id,'strc_album_date',$classification['date']);
        update_post_meta($id,'strc_portrait',$portrait);
        update_post_meta($id,'strc_portrait_region',$portrait['region']);update_post_meta($id,'strc_portrait_model',self::portraitModel($portrait['vehicle']));
        update_post_meta($id,'strc_material_rights_at',gmdate(DATE_ATOM));
        if($saved){$old=$this->files($id);update_post_meta($id,'strc_private_files',$saved);update_post_meta($id,'strc_album_cover',$saved[0]['key']);if($old)(new PrivateUploadStore())->remove($old);}
        update_post_meta($id,'strc_gallery_pending_count',0);
        update_post_meta($id,'strc_album_submitters','|'.get_current_user_id().'|');
        return $this->present(get_post($id));
    }

    /** Modell für den Filter der Mitgliedergalerie: längster passender Modellname («TR6 PI» vor «TR6»). */
    public static function portraitModel(string $vehicle): string
    {
        $vehicle=mb_strtoupper(trim($vehicle));$best='';
        foreach(\SwissTRClub\Core\Forms\FormFields::MODELS as $model){$upper=mb_strtoupper($model);if(($vehicle===$upper||str_starts_with($vehicle,$upper.' '))&&mb_strlen($model)>mb_strlen($best))$best=$model;}
        return $best;
    }

    /** Mitgliedersuche für das Porträtformular (nur Redaktion Galerie): Name, Region, Ort und erfasste Fahrzeuge. */
    private function portraitMembers(string $search): array
    {
        if(!\SwissTRClub\Core\Editorial\EditorialAccess::area('gallery'))AjaxRequest::fail('Die Mitgliedergalerie wird von der Redaktion gepflegt.',403);
        $search=trim(sanitize_text_field($search));if(mb_strlen($search)<2)return ['members'=>[]];
        $users=array_merge(get_users(['search'=>'*'.$search.'*','search_columns'=>['display_name'],'number'=>30]),get_users(['number'=>30,'meta_query'=>['relation'=>'OR',['key'=>'first_name','value'=>$search,'compare'=>'LIKE'],['key'=>'last_name','value'=>$search,'compare'=>'LIKE']]]));
        $repo=new \SwissTRClub\Core\Members\MembershipRepository();$rows=[];
        foreach($users as $user){
            if(isset($rows[$user->ID])||!user_can($user,'strc_access_member_area'))continue;
            $membership=$repo->findForUser((int)$user->ID);if(!$membership||!in_array($membership['status'],['active','grace'],true))continue;
            $owner=(int)(\SwissTRClub\Core\Members\MemberProfile::household((int)$user->ID)['primary']?:$user->ID);
            $vehicles=array_map(static function($post):array{$data=\SwissTRClub\Core\Forms\FormStore::data($post);return ['id'=>(int)$post->ID,'model'=>(string)($data['model']??''),'details'=>(string)($data['details']??''),'year'=>(string)($data['year']??''),'chassis'=>(string)($data['chassisNumber']??''),'notes'=>(string)($data['notes']??''),'photo'=>!empty($data['file'])?add_query_arg(['action'=>'strc_community','operation'=>'portrait-vehicle-photo','vehicle'=>$post->ID],admin_url('admin-ajax.php')):''];},\SwissTRClub\Core\Forms\FormStore::find('strc_vehicle',$owner));
            $place=trim((string)get_user_meta($user->ID,'strc_postcode',true).' '.(string)get_user_meta($user->ID,'strc_city',true));
            $rows[$user->ID]=['id'=>(int)$user->ID,'name'=>$user->display_name,'region'=>(string)(\SwissTRClub\Core\Events\RegionDirectory::canonicalName($membership['region']??'')??''),'place'=>$place,'vehicles'=>$vehicles];
            if(count($rows)>=15)break;
        }
        return ['members'=>array_values($rows)];
    }

    /** Gespeicherte Bilddatei eines Mitgliederfahrzeugs (nur für die Redaktion Galerie). */
    private function portraitVehicleFile(int $vehicleId): ?array
    {
        if($vehicleId<1||!\SwissTRClub\Core\Editorial\EditorialAccess::area('gallery'))return null;
        $post=get_post($vehicleId);if(!$post||$post->post_type!=='strc_vehicle')return null;
        $file=\SwissTRClub\Core\Forms\FormStore::data($post)['file']??null;
        return is_array($file)&&!empty($file['key'])?$file:null;
    }

    private function portraitVehiclePhoto(int $vehicleId): never
    {
        $file=$this->portraitVehicleFile($vehicleId);if(!$file)AjaxRequest::fail('Bild nicht gefunden.',404);
        $store=new PrivateUploadStore();$copy=$store->webCopy($file);if(is_wp_error($copy))AjaxRequest::fail($copy->get_error_message(),503);$store->stream($copy);
    }

    private function deletePortrait(int $id): array
    {
        if(!\SwissTRClub\Core\Editorial\EditorialAccess::area('gallery'))AjaxRequest::fail('Die Mitgliedergalerie wird von der Redaktion gepflegt.',403);
        $post=$this->post($id);if(!self::portrait((int)$post->ID))AjaxRequest::fail('Dieser Beitrag ist kein Mitgliederporträt.',422);
        wp_delete_post($post->ID,true);
        return ['id'=>$id];
    }
}

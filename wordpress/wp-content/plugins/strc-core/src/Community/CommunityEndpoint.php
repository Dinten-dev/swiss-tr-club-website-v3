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
        if($id&&current_user_can('strc_access_member_area')){ $post=get_post($id);if($post&&in_array($post->post_type,self::TYPES,true)&&($post->post_status==='publish'||$this->canEdit($post))&&($post->post_type!=='strc_document'||LibraryPolicy::canRead($id)))return $clauses; }
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
        list($operation, $input) = AjaxRequest::read('strc_community', array('create', 'reply', 'trash', 'restore', 'edit', 'append', 'captions', 'approve', 'reject', 'subscribe', 'close', 'pin', 'merge', 'reply-edit', 'reply-hide', 'photos-review', 'cover', 'photos-move', 'image-policy', 'delete'));
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
        if ($post->post_status !== 'publish' && !$this->canEdit($post)&&!($post->post_type==='strc_album'&&($this->originals()||$this->ownPhotos($post)))) AjaxRequest::fail('Beitrag nicht gefunden.',404);
        if ($post->post_type==='strc_document'&&!LibraryPolicy::canRead($id)) AjaxRequest::fail('Dokument nicht verfügbar.',404);
        return $post;
    }

    private function canEdit(\WP_Post $post): bool
    {
        return ($post->post_type==='strc_document'&&LibraryPolicy::classification((int)$post->ID)==='restricted'&&current_user_can('strc_access_board_documents')) || (int) $post->post_author === get_current_user_id() || current_user_can('strc_manage_community') || \SwissTRClub\Core\Editorial\EditorialAccess::area((string) array_search($post->post_type, self::TYPES, true));
    }

    private function canReview(\WP_Post $post): bool
    {
        return ($post->post_type==='strc_document'&&LibraryPolicy::classification((int)$post->ID)==='restricted'&&current_user_can('strc_access_board_documents'))||\SwissTRClub\Core\Editorial\EditorialAccess::area((string)array_search($post->post_type,self::TYPES,true));
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

    private function present(\WP_Post $post): array
    {
        $author = get_userdata((int) $post->post_author);
        return array('id' => (int) $post->ID, 'kind' => array_search($post->post_type, self::TYPES, true), 'title' => html_entity_decode($post->post_title, ENT_QUOTES | ENT_HTML5, 'UTF-8'), 'description' => html_entity_decode(wp_strip_all_tags($post->post_content), ENT_QUOTES | ENT_HTML5, 'UTF-8'), 'descriptionHtml' => \SwissTRClub\Core\Editorial\EditorialAccess::html(wpautop($post->post_content)), 'author' => $author ? $author->display_name : 'Clubmitglied', 'createdAt' => get_post_time(DATE_ATOM, true, $post), 'canEdit' => $this->canEdit($post), 'canReview'=>$this->canReview($post),'subscribed'=>in_array((int)$post->ID,(array)get_user_meta(get_current_user_id(),'strc_topic_subscriptions',true),true),'pinned'=>(bool)get_post_meta($post->ID,'strc_topic_pinned',true),'mergedInto'=>(int)get_post_meta($post->ID,'strc_topic_merged_into',true),'closed'=>(bool)get_post_meta($post->ID,'strc_topic_closed',true),'status' => $post->post_status, 'classification'=>get_post_meta($post->ID,'strc_form_classification',true)?:[], 'replyCount' => (int) get_comments(array('post_id' => $post->ID, 'status' => 'approve', 'count' => true)), 'files' => array_map(fn ($file): array => array('key' => $file['key'], 'name' => $file['name'], 'mime' => $file['mime'], 'size' => $file['size'], 'caption' => $file['caption'] ?? '', 'photographer' => $file['photographer'] ?? '', 'public'=>(bool)($file['public']??false),'retainOriginal'=>(bool)($file['retainOriginal']??false),'reviewStatus'=>$file['reviewStatus']??($post->post_status==='publish'?'approved':'pending'),'canCaption'=>$this->canReview($post)||(int)($file['submittedBy']??$post->post_author)===get_current_user_id(),'originalUrl'=>get_post_type($post->ID)==='strc_album'&&$this->originals()?add_query_arg(['action'=>'strc_community','operation'=>'file','id'=>$post->ID,'key'=>$file['key'],'original'=>'1'],admin_url('admin-ajax.php')):'', 'url' => add_query_arg(array('action' => 'strc_community', 'operation' => 'file', 'id' => $post->ID, 'key' => $file['key']), admin_url('admin-ajax.php'))), $this->visibleFiles($post)), 'coverKey'=>(string)get_post_meta($post->ID,'strc_album_cover',true));
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
        return array_values(array_map(static fn ($post): array => array('id' => (int) $post->ID, 'title' => html_entity_decode($post->post_title, ENT_QUOTES | ENT_HTML5, 'UTF-8'), 'eventId' => (int) (((array) get_post_meta($post->ID,'strc_form_classification',true))['eventId'] ?? 0)), $query->posts));
    }

    private function listing(array $input): array
    {
        $type = self::TYPES[$input['kind'] ?? ''] ?? '';
        if (! $type) {
            AjaxRequest::fail('Ungültiger Bereich.');
        }
        $trash = '1' === ($input['trash'] ?? '');
        $search=sanitize_text_field($input['search']??'');
        $args=['post_type'=>$type,'post_status'=>$trash?'trash':['publish','pending','draft'],'posts_per_page'=>24,'paged'=>max(1,absint($input['page']??1)),
            's'=>'',
            'author'=>($trash&&!current_user_can('strc_manage_community')&&!\SwissTRClub\Core\Editorial\EditorialAccess::area($input['kind']))||('1'===($input['mine']??'')&&$type!=='strc_album')?get_current_user_id():'',
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
        remove_filter('posts_orderby',$pinnedOrder,10);
        remove_filter('posts_where',$visibility,10);
        if($searchFilter)remove_filter('posts_where',$searchFilter,10);
        $posts=$type==='strc_document'?array_filter($query->posts,static fn($p)=>LibraryPolicy::canRead((int)$p->ID)):$query->posts;
        return ['areaCounts'=>$areaCounts,'items'=>array_values(array_map(fn($post)=>$this->present($post),$posts)),'pages'=>(int)$query->max_num_pages,'total'=>(int)$query->found_posts,'accessClasses'=>LibraryPolicy::classes(),'libraryGroups'=>$type==='strc_document'?LibraryPolicy::groups():[],'canReview'=>\SwissTRClub\Core\Editorial\EditorialAccess::area($input['kind'])];
    }

    private function detail(int $id, int $page): array
    {
        $post = $this->post($id, true);
        $result = $this->present($post);
        $result['replies'] = array();
        $result['replyPages'] = 0;
        if ('strc_topic' === $post->post_type) {
            $comments = get_comments(array('post_id' => $id, 'status' => 'approve', 'number' => 20, 'offset' => ($page - 1) * 20, 'orderby' => 'comment_ID', 'order' => 'ASC'));
            $result['replies'] = array_map(static function ($comment): array {
                $user = get_userdata((int) $comment->user_id);
                return array('id' => (int) $comment->comment_ID, 'author' => $user ? $user->display_name : 'Clubmitglied', 'text' => html_entity_decode(wp_strip_all_tags($comment->comment_content), ENT_QUOTES | ENT_HTML5, 'UTF-8'), 'createdAt' => $comment->comment_date_gmt . 'Z');
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
                $data['access']=\SwissTRClub\Core\Forms\FormFields::text($input,'access',20)?:($types[$type]['access']??'open');
                if(!in_array($data['access'],LibraryPolicy::classes(),true))throw new \InvalidArgumentException('Für diese Zugriffsklasse fehlt die Berechtigung.');
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
        if(($kind!=='forum'||!empty($_FILES['files']['name']))&&($input['rights']??'')!=='1')AjaxRequest::fail('Bitte die Berechtigung zum Teilen des Materials bestätigen.',422);
        if ('forum' === $kind && '' === $description) {
            AjaxRequest::fail('Bitte einen Beitragstext eingeben.');
        }
        $magazine=$kind==='library'&&$classification['documentType']==='magazine';
        if($magazine&&(!is_array($_FILES['files']['name']??null)||count($_FILES['files']['name'])!==1||!is_uploaded_file($_FILES['files']['tmp_name'][0]??'')||(new \finfo(FILEINFO_MIME_TYPE))->file($_FILES['files']['tmp_name'][0])!=='application/pdf'))AjaxRequest::fail('Bitte ein PDF-Dokument bis 25 MB auswählen.',422);
        $savedFiles = (new PrivateUploadStore())->save($_FILES['files'] ?? array(), 'gallery' === $kind, 'library' === $kind, 'gallery' === $kind ? 20 : 6, 'gallery' === $kind ? 2000000 : 0, 'gallery' === $kind ? 10485760 : 20971520, $magazine ? 25*1024*1024 : 100*1024*1024);
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
        if($kind==='gallery')foreach($savedFiles as &$file){$file['caption']=sanitize_text_field($input['caption']??'');$file['photographer']=$classification['photographer'];$file['uploadedAt']=gmdate(DATE_ATOM);$file['submittedBy']=get_current_user_id();$file['reviewStatus']='pending';}unset($file);
        update_post_meta($id, 'strc_private_files', $savedFiles);
        update_post_meta($id,'strc_form_classification',$classification);
        if($kind==='gallery')update_post_meta($id,'strc_album_date',$classification['date']?:substr(get_post($id)->post_date,0,10));
        if($kind==='library')LibraryPolicy::index((int)$id,$classification,$title,$description,$savedFiles);
        update_post_meta($id,'strc_material_rights_at',gmdate(DATE_ATOM));
        $published = wp_update_post(array('ID' => $id, 'post_status' => $kind==='forum'?'publish':'pending'), true);
        if($kind==='forum'){$this->setSubscription((int)$id,true);if(!is_wp_error($published))ForumSettings::notifyNewTopic(get_post((int)$id));}
        if (is_wp_error($published)) {
            wp_delete_post($id, true);
            AjaxRequest::fail('Veröffentlichung fehlgeschlagen.', 500);
        }
        if($request){$requests[$request]=(int)$id;update_user_meta(get_current_user_id(),'strc_upload_requests',array_slice($requests,-50,null,true));}
        if(in_array($kind,['gallery','library'],true))SubmissionNotifications::send((int)$id,$kind);
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
        $request=$input['requestId']??'';$token=$input['fileToken']??'';$tokens=(array)get_post_meta($post->ID,'strc_upload_tokens',true);
        if(($request&&(!preg_match('/^[a-f0-9-]{36}$/D',$request)||!preg_match('/^[a-f0-9-]{36}$/D',$token)))||($token&&!preg_match('/^[a-f0-9-]{36}$/D',$token)))AjaxRequest::fail('Ungültige Upload-Anfrage.',422);
        if($token&&isset($tokens[$token]))return $this->present($post);
        if($request&&count(array_filter($tokens,static fn($batch)=>$batch===$request))>=20)AjaxRequest::fail('Höchstens 20 Bilder pro Upload.',422);
        if (($input['rights'] ?? '') !== '1') {
            AjaxRequest::fail('Bitte die Berechtigung zum Teilen des Materials bestätigen.', 422);
        }
        // Fotograf/in ist immer die hochladende Person.
        $photographer = wp_get_current_user()->display_name;
        $uploads = (new PrivateUploadStore())->save($_FILES['files'] ?? array(), true, false, 20, 2000000, 10485760);
        if (is_wp_error($uploads)) {
            AjaxRequest::fail($uploads->get_error_message());
        }
        if (! $uploads) {
            AjaxRequest::fail('Bitte mindestens ein Foto auswählen.');
        }
        foreach ($uploads as &$upload) {
            $upload['caption']=sanitize_text_field($input['caption']??'');$upload['photographer'] = $photographer;
            $upload['uploadedAt']=gmdate(DATE_ATOM);$upload['submittedBy']=get_current_user_id();$upload['reviewStatus']='pending';
        }
        unset($upload);
        $existing=$this->files((int)$post->ID);foreach($existing as &$file){$file['reviewStatus']=$file['reviewStatus']??($post->post_status==='publish'?'approved':'pending');$file['submittedBy']=$file['submittedBy']??(int)$post->post_author;}unset($file);$next=array_merge($existing,$uploads);update_post_meta($post->ID,'strc_private_files',$next);$this->albumState($post,$next);SubmissionNotifications::send((int)$post->ID,'gallery');
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
                if(!$this->canReview($post)){$files[$index]['reviewStatus']='pending';$files[$index]['public']=false;}
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

    private function status(string $operation, int $id): array
    {
        $post = $this->post($id, true);
        if (! $this->canEdit($post)) {
            AjaxRequest::fail('Sie können nur eigene Beiträge verwalten.', 403);
        }
        if(in_array($operation,['approve','reject'],true)){
            if(!$this->canReview($post))AjaxRequest::fail('Keine Freigabeberechtigung.',403);
            if($post->post_type==='strc_album'){$files=$this->files($id);foreach($files as &$file){$file['reviewStatus']=$operation==='approve'?'approved':'rejected';if($operation==='reject')$file['public']=false;}unset($file);update_post_meta($id,'strc_private_files',$files);}
            $result=wp_update_post(['ID'=>$id,'post_status'=>$operation==='approve'?'publish':'draft'],true);
            if(is_wp_error($result))AjaxRequest::fail('Freigabe konnte nicht gespeichert werden.',503);
            if($post->post_type==='strc_album')$this->albumState(get_post($id),$this->files($id));
            update_post_meta($id,'strc_review',['by'=>get_current_user_id(),'at'=>gmdate(DATE_ATOM),'state'=>$operation]);
            return ['id'=>$id];
        }
        if($operation==='trash'&&$post->post_type==='strc_album')AjaxRequest::fail('Galeriealben bleiben in der Galerie erhalten.',422);
        $result = 'trash' === $operation ? wp_trash_post($id) : wp_untrash_post($id);
        if (! $result) {
            AjaxRequest::fail('Status konnte nicht geändert werden.', 409);
        }
        if ('restore' === $operation) {
            wp_update_post(array('ID' => $id, 'post_status' => $post->post_type==='strc_topic'?'publish':'pending'));
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
            if($this->canReview($post))$file['public']=($input['public']??'')==='1';$file['retainOriginal']=($input['retainOriginal']??'')==='1';$found=true;
        }unset($file);
        if(!$found)AjaxRequest::fail('Bild nicht gefunden.',404);
        update_post_meta($post->ID,'strc_private_files',$files);return $this->present(get_post($post->ID));
    }
    private function teasers(): array
    {
        $images=[];
        foreach(get_posts(['post_type'=>'strc_album','post_status'=>'publish','posts_per_page'=>-1]) as $post)foreach($this->files((int)$post->ID) as $file)if(!empty($file['public'])&&$this->approved($file,$post)){
            $images[]=['url'=>add_query_arg(['action'=>'strc_community','operation'=>'teaser-file','id'=>$post->ID,'key'=>$file['key']],admin_url('admin-ajax.php')),'caption'=>$file['caption']??''];
            if(count($images)>=24)return $images;
        }
        return $images;
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
        $post=$this->post($id);
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
}

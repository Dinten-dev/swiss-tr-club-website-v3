<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Editorial;

use SwissTRClub\Core\Events\RegionalEventAccess;
use SwissTRClub\Core\Http\AjaxRequest;
use SwissTRClub\Core\Community\LibraryPolicy;

final class EditorialEndpoint
{
    private const TYPES = array('news'=>'post','forum'=>'strc_topic','gallery'=>'strc_album','library'=>'strc_document','market'=>'strc_ad');

    public function registerHooks(): void
    {
        add_action('init', array($this, 'seedDrafts'));
        add_filter('map_meta_cap', static function (array $caps, string $cap, int $userId, array $args): array {
            if (in_array($cap,array('edit_user','delete_user','promote_user'),true) && isset($args[0]) && $userId !== (int)$args[0]) {
                $actor=get_userdata($userId); $target=get_userdata((int)$args[0]);
                if ($actor && empty($actor->allcaps['manage_options']) && $target && array_intersect(array('administrator','strc_developer','strc_administrator'),$target->roles)) return array('do_not_allow');
            }
            return $caps;
        }, 10, 4);
        add_action('wp_ajax_strc_editorial', array($this,'respond'));
        add_action('wp_ajax_nopriv_strc_editorial', array($this,'respond'));
        add_action('wp_enqueue_scripts', static function (): void {
            if (EditorialAccess::available() || current_user_can('strc_access_member_area')) wp_enqueue_editor();
        });
    }

    public static function schema(): array
    {
        $schema = json_decode((string) file_get_contents(__DIR__.'/site-content.json'), true);
        foreach (array('contact'=>'kontakt','privacy'=>'datenschutz','statutes'=>'statuten') as $key=>$slug) {
            $page = get_page_by_path($slug);
            if ($page && 'publish' === $page->post_status && '' === $page->post_password) {
                $schema[$key]['fields'][1]['default'] = EditorialAccess::html(wpautop($page->post_content));
            }
        }
        $regions = \SwissTRClub\Core\Events\RegionDirectory::terms();
        foreach ($regions as $term) {
            $schema['region-'.$term->slug] = array('title'=>'Region '.$term->name, 'route'=>'#regionen/'.$term->slug, 'fields'=>array(
                array('key'=>'intro','label'=>'Kurzbeschreibung','type'=>'text','default'=>'Lokale Treffen, persönliche Kontakte und gemeinsame Ausfahrten.'),
                array('key'=>'body','label'=>'Region, Treffpunkt und Kontakt','type'=>'rich','default'=>EditorialAccess::html(wpautop($term->description ?: 'Informationen zu Treffpunkt und Ansprechperson sind für diese Region noch nicht hinterlegt.'))),
            ));
            $schema['region-'.$term->slug]['fields']=self::regionalLayout(array_merge($schema['region-'.$term->slug]['fields'],json_decode((string)file_get_contents(__DIR__.'/regional-fields.json'),true)));
        }
        if (isset($schema['triungsters'])) $schema['triungsters']['fields'] = self::regionalLayout($schema['triungsters']['fields'], true);
        // Empty French fields preserve existing content until an editor supplies a translation.
        foreach ($schema as &$definition) {
            $translations = array();
            foreach ($definition['fields'] as $field) {
                if (! empty($field['legacy']) || ! in_array($field['type'], array('text','textarea','rich'), true)) continue;
                if (preg_match('/(?:Email|Phone|Scale|Url)$/', $field['key'])) continue;
                $translations[] = array_replace($field, array('key'=>$field['key'].'__fr', 'label'=>$field['label'].' (FR)', 'default'=>'', 'translationOf'=>$field['key']));
            }
            $definition['fields'] = array_merge($definition['fields'], $translations);
        }
        unset($definition);
        return $schema;
    }

    /**
     * Regionalseiten und TRiungsters: Die Regionalleitung bearbeitet nur a) Treffpunkt, b) Regionale Informationen,
     * c) Regionale Neuigkeiten und d) Regionale Veranstaltungen. Alle übrigen Felder sind Administration.
     */
    private static function regionalLayout(array $fields, bool $triungsters = false): array
    {
        $moderated = array(
            'meetName' => array('a', 'Treffpunkt: Name'),
            'meetAddress' => array('a', 'Treffpunkt: Adresse'),
            'meetSchedule' => array('a', 'Treffpunkt: Rhythmus und Zeit (zwei Zeilen möglich)'),
            'meetDates' => array('a', 'Nächste Treffen'),
            'body' => array('b', $triungsters ? 'Regionale Informationen (Über die TRiungsters)' : 'Regionale Informationen'),
            'news' => array('c', 'Regionale Neuigkeiten'),
            'eventBody' => array('d', 'Regionale Veranstaltungen: Text über der Terminliste'),
        );
        $ordered = array();
        foreach ($moderated as $key => [$section, $label]) {
            foreach ($fields as $field) {
                if ($field['key'] === $key) $ordered[] = array_replace($field, array('label'=>$label, 'section'=>$section));
            }
        }
        foreach ($fields as $field) {
            if (! isset($moderated[$field['key']])) $ordered[] = $field + array('section'=>'admin', 'adminOnly'=>true);
        }
        return $ordered;
    }

    private static function defaults(array $schema): array
    {
        return array_column($schema['fields'], 'default', 'key');
    }

    /** Add new page drafts once; never replace existing editorial work. */
    public function seedDrafts(): void
    {
        foreach (self::schema() as $key => $definition) {
            if (($definition['initialStatus'] ?? '') !== 'draft') continue;
            add_option('strc_content_'.$key, array(
                'draft' => self::defaults($definition), 'published' => array(),
                'isPublished' => false, 'revision' => 0, 'history' => array(),
            ), '', false);
        }
    }

    private function document(string $key, array $schema): array
    {
        $stored = get_option('strc_content_'.$key, array());
        $draftPage = ($schema['initialStatus'] ?? '') === 'draft';
        $isPublished = $stored['isPublished'] ?? (! $draftPage || ! empty($stored['published']));
        $published = $isPublished ? array_replace(self::defaults($schema), $stored['published'] ?? array()) : array();
        if(str_starts_with($key,'model-')&&$isPublished)$published=$this->editableFacts($published,$stored['published']??[]);
        $values=array_replace(self::defaults($schema), $stored['draft'] ?? $published);
        if(str_starts_with($key,'model-'))$values=$this->editableFacts($values,$stored['draft']??$stored['published']??[]);
        return array('key'=>$key,'schema'=>$schema,'revision'=>(int) ($stored['revision'] ?? 0),'canAdminister'=>EditorialAccess::global(),
            'values'=>$values,
            'published'=>$published, 'isPublished'=>$isPublished,
            'hasDraft'=>isset($stored['draft']) || ($draftPage && ! $isPublished), 'history'=>$stored['history'] ?? array());
    }

    /** Derive the new editable fact box without writing or replacing any saved content. */
    private function editableFacts(array $values,array $source): array
    {
        if(array_key_exists('factsBody',$source))return $values;
        $html='';
        foreach(['years'=>'Bauzeit','engine'=>'Motor','displacement'=>'Hubraum','power'=>'Leistung','transmission'=>'Getriebe','production'=>'Stückzahl'] as $key=>$label){
            if(!empty($values[$key]))$html.='<p><strong>'.$label.'</strong><br>'.esc_html($values[$key]).'</p>';
        }
        $values['factsBody']=$html.($values['factsNote']??'');
        return $values;
    }
    private function frame(mixed $value,string $default='contain|50|50'): string
    {
        $value=$value??$default;
        if(!is_string($value)||!preg_match('/^(contain|cover)\|(100|[0-9]{1,2})\|(100|[0-9]{1,2})$/D',$value))AjaxRequest::fail('Bitte gültige Bildpositionen zwischen 0 und 100 wählen.');
        return $value;
    }

    public function respond(): void
    {
        [$operation,$input] = AjaxRequest::read('strc_editorial', array('save','preview','post-save','upload','upload-document','delete-document','rename-document','assign','highlights-save'));
        $schema = self::schema();
        if ('public' === $operation) {
            $values = $published = array();
            foreach ($schema as $key=>$definition) {
                $document = $this->document($key,$definition);
                $values[$key] = $document['published'];
                $published[$key] = $document['isPublished'];
            }
            wp_send_json_success(array('values'=>$values, 'published'=>$published));
        }
        if ('public-documents' === $operation) {
            $key = $input['key'] ?? '';
            if (! isset($schema[$key]) || ! (str_starts_with($key,'region-') || 'triungsters' === $key)) AjaxRequest::fail('Seite nicht gefunden.',404);
            wp_send_json_success(PublicDocumentUpload::listing($key));
        }
        if (! EditorialAccess::available()) AjaxRequest::fail('Kein Zugriff auf die Redaktion.',403);
        $result = match ($operation) {
            'highlights' => (new \SwissTRClub\Core\Content\HomepageHighlights())->settings(),
            'highlights-save' => (new \SwissTRClub\Core\Content\HomepageHighlights())->save($input),
            'list' => $this->listing($schema),
            'document' => $this->readDocument($input,$schema),
            'save' => $this->save($input,$schema),
            'preview' => array('values'=>$this->cleanValues(json_decode($input['values'] ?? '',true),$this->readDocument($input,$schema)['schema'])),
            'posts' => $this->posts($input),
            'post-save' => $this->savePost($input),
            'upload' => $this->upload($input,$schema),
            'documents','upload-document' => $this->documents($input,$schema,$operation==='upload-document'),
            'rename-document' => PublicDocumentUpload::rename($this->readDocument($input,$schema)['key'], absint($input['id'] ?? 0), (string) ($input['title'] ?? '')),
            'delete-document' => PublicDocumentUpload::delete($this->readDocument($input,$schema)['key'], absint($input['id'] ?? 0)),
            'people' => $this->people(),
            'assign' => $this->assign($input),
            default => AjaxRequest::fail('Unbekannte Anfrage.'),
        };
        wp_send_json_success($result);
    }

    private function listing(array $schema): array
    {
        $documents = array();
        foreach ($schema as $key=>$definition) {
            if (! EditorialAccess::document($key)) continue;
            $state = $this->document($key,$definition);
            $documents[] = array('key'=>$key,'title'=>$definition['title'],'route'=>$definition['route'],'hasDraft'=>$state['hasDraft']);
        }
        return array('documents'=>$documents,'areas'=>array_keys(array_filter(EditorialAccess::AREAS,static fn ($label,$key)=>EditorialAccess::area($key), ARRAY_FILTER_USE_BOTH)),
            'canAssign'=>current_user_can('strc_manage_content_roles'),
            'magazineUrl'=>EditorialAccess::area('library') ? admin_url('options-general.php?page=strc-magazine') : '');
    }

    private function readDocument(array $input,array $schema): array
    {
        $key = $input['key'] ?? '';
        if (! isset($schema[$key])) AjaxRequest::fail('Seite nicht gefunden.',404);
        if (! EditorialAccess::document($key)) AjaxRequest::fail('Diese Seite gehört nicht zu Ihrem Verantwortungsbereich.',403);
        return $this->document($key,$schema[$key]);
    }

    private function cleanValues(mixed $values,array $schema): array
    {
        if (! is_array($values)) AjaxRequest::fail('Ungültiger Inhalt.');
        $clean = array();
        foreach ($schema['fields'] as $field) {
            $value = $values[$field['key']] ?? $field['default'];
            if (in_array($field['type'],array('images','partners','storyImages','people'),true)) {
                if (! is_array($value) || count($value)>($field['maxItems'] ?? 30)) AjaxRequest::fail('Zu viele Einträge für '.$field['label'].'.');
                $clean[$field['key']] = array();
                foreach ($value as $item) {
                    if (! is_array($item)) AjaxRequest::fail('Ungültiger Bildeintrag.');
                    $row = array();
                    foreach (match ($field['type']) {'images','storyImages'=>array('url','alt'),'people'=>array('image','name','role'),default=>array('image','name','url')} as $prop) {
                        if (! is_string($item[$prop] ?? null)) AjaxRequest::fail('Unvollständiger Bildeintrag.');
                        $row[$prop] = in_array($prop,array('url','image'),true) ? $this->url($item[$prop]) : sanitize_text_field($item[$prop]);
                    }
                    if($field['type']!=='partners')$row['frame']=$this->frame($item['frame']??null,in_array($field['type'],['people','images'],true)?'cover|50|50':'contain|50|50');
                    if ($field['key']==='photos') {
                        $group=$item['group']??'';
                        if(!in_array($group,['','tr','trips'],true))AjaxRequest::fail('Bitte einen gültigen Bildstreifen wählen.');
                        $row['group']=$group;
                    }
                    if($field['type']==='people'){
                        $email=$item['email']??'';
                        if(!is_string($email)||($email!==''&&!is_email($email)))AjaxRequest::fail('Bitte eine gültige E-Mail-Adresse beim Porträt eingeben.');
                        $row['email']=sanitize_email($email);
                    }
                    foreach ($field['type']==='people' ? ['roleFr','nameFr'] : (in_array($field['type'],['images','storyImages'],true) ? ['altFr'] : []) as $translated) {
                        if (!is_string($item[$translated]??'') || mb_strlen($item[$translated]??'')>500) AjaxRequest::fail('Bitte die französische Beschreibung prüfen.');
                        $row[$translated]=sanitize_text_field($item[$translated]??'');
                    }
                    if ('storyImages' === $field['type']) {
                        $position=$item['position'] ?? (string)((count($clean[$field['key']])+1)*2);
                        if (!is_string($position) || !preg_match('/^\d{1,3}$/',$position)) AjaxRequest::fail('Bitte eine Bildposition zwischen 0 und 999 wählen.');
                        $row['position']=$position;
                    }
                    $clean[$field['key']][] = $row;
                }
            } else {
                if (! is_string($value) || mb_strlen($value)>50000) AjaxRequest::fail('Der Text ist zu lang.');
                $clean[$field['key']] = match ($field['type']) {
                    'textarea'=>sanitize_textarea_field($value), 'imageFrame'=>$this->frame($value), 'rich'=>EditorialAccess::html($value), 'image','url'=>$this->url($value), default=>sanitize_text_field($value),
                };
            }
        }
        return $clean;
    }

    private function url(string $url): string
    {
        if (str_starts_with($url,'/') && ! str_starts_with($url,'//')) return esc_url_raw($url);
        $clean = esc_url_raw($url,array('https','http'));
        if ($url && (! $clean || ! preg_match('~^https?://~i',$clean))) AjaxRequest::fail('Bitte eine vollständige http-/https-Adresse angeben.');
        return $clean;
    }

    private function save(array $input,array $schema): array
    {
        global $wpdb;
        $current = $this->readDocument($input,$schema);
        $key = $current['key'];
        if ((int) ($input['revision'] ?? -1) !== $current['revision']) AjaxRequest::fail('Jemand hat diese Seite inzwischen geändert. Ihre Eingaben bleiben erhalten. Bitte den aktuellen Stand neu laden und abgleichen.',409);
        if (! in_array($input['mode'] ?? '',array('draft','publish'),true)) AjaxRequest::fail('Ungültiger Speicherstatus.');
        $submitted=json_decode($input['values']??'',true);
        if(!is_array($submitted))AjaxRequest::fail('Ungültiger Inhalt.');
        foreach ($submitted as $field=>&$rows) {
            if (!is_array($rows) || !is_array($current['values'][$field]??null)) continue;
            foreach ($rows as $index=>&$row) {
                $existing=$current['values'][$field][$index]??[];
                if (!is_array($row) || !is_array($existing)) continue;
                if (($row['url']??$row['image']??'')!==($existing['url']??$existing['image']??'') || ($row['name']??'')!==($existing['name']??'')) continue;
                foreach (['altFr','roleFr','nameFr'] as $translated) if (!array_key_exists($translated,$row)&&isset($existing[$translated])) $row[$translated]=$existing[$translated];
            }
            unset($row);
        }
        unset($rows);
        // Administrationsfelder (Kontakt, WhatsApp usw.) kann nur die globale Redaktion ändern.
        if (! EditorialAccess::global()) foreach ($schema[$key]['fields'] as $field) if (! empty($field['adminOnly'])) unset($submitted[$field['key']]);
        // Older open editor tabs must not erase newly introduced fields.
        $clean = $this->cleanValues(array_replace($current['values'],$submitted),$schema[$key]);
        if ('publish' === $input['mode'] && !empty($clean['landingImage']) && empty(trim($clean['landingImageAlt'] ?? ''))) AjaxRequest::fail('Bitte das Bild der Landingpage beschreiben.');
        if ('publish' === $input['mode'] && isset($schema[$key]['template'])) {
            if ('' === trim($clean['title'] ?? '')) AjaxRequest::fail('Bitte einen Seitentitel ergänzen.');
            if (! empty($clean['image']) && '' === trim($clean['imageAlt'] ?? '')) AjaxRequest::fail('Bitte das Titelbild für Menschen mit Sehbehinderung beschreiben.');
        }
        $name = 'strc_content_'.$key;
        $old = get_option($name,null);
        $next = is_array($old) ? $old : array('published'=>$current['published']);
        $history = $next['history'] ?? array();
        array_unshift($history,array('at'=>current_time(DATE_ATOM),'by'=>wp_get_current_user()->display_name,'values'=>$current['values']));
        $next['history'] = array_slice($history,0,10);
        $next['revision'] = $current['revision']+1;
        if ('publish' === $input['mode']) { $next['published']=$clean; $next['isPublished']=true; unset($next['draft']); }
        else $next['draft']=$clean;
        // Compare-and-swap also rejects a second simultaneous save at the database boundary.
        if (null === $old) $saved = add_option($name,$next,'',false);
        else {
            $saved = $wpdb->update($wpdb->options,array('option_value'=>maybe_serialize($next)),array('option_name'=>$name,'option_value'=>maybe_serialize($old)),array('%s'),array('%s','%s'));
            wp_cache_delete($name,'options');
        }
        if (! $saved) AjaxRequest::fail('Der Inhalt wurde gleichzeitig geändert. Bitte neu laden; Ihre Eingaben sind noch im Formular.',409);
        return $this->document($key,$schema[$key]);
    }

    private function kind(array $input): string
    {
        $kind = $input['kind'] ?? '';
        if (! isset(self::TYPES[$kind]) || ! EditorialAccess::area($kind)) AjaxRequest::fail('Kein Zugriff auf diesen Inhaltsbereich.',403);
        return $kind;
    }

    private function postVersion(\WP_Post $post): string
    {
        return hash('sha256',serialize(array($post->post_title,$post->post_content,$post->post_excerpt,$post->post_status,get_post_meta($post->ID))));
    }

    private function presentPost(\WP_Post $post): array
    {
        return array('id'=>$post->ID,'title'=>$post->post_title,'body'=>EditorialAccess::html(wpautop($post->post_content)),
            'excerpt'=>$post->post_excerpt,'status'=>$post->post_status,'version'=>$this->postVersion($post),
            'titleFr'=>(string)get_post_meta($post->ID,'strc_title_fr',true),'bodyFr'=>(string)get_post_meta($post->ID,'strc_body_fr',true),'excerptFr'=>(string)get_post_meta($post->ID,'strc_excerpt_fr',true),
            'image'=>get_the_post_thumbnail_url($post,'large') ?: '', 'imageId'=>get_post_thumbnail_id($post),
            'price'=>(string) get_post_meta($post->ID,'strc_ad_price',true));
    }

    private function posts(array $input): array
    {
        $kind = $this->kind($input);
        $args = array('post_type'=>self::TYPES[$kind],'post_status'=>array('publish','draft','pending','trash'),'posts_per_page'=>20,'paged'=>max(1,absint($input['page'] ?? 1)),'s'=>sanitize_text_field($input['search'] ?? ''),'orderby'=>'modified','order'=>'DESC');
        if ('news' === $kind) $args['category_name']='club-news';
        if($kind==='library')$args['meta_query']=[LibraryPolicy::filter()];
        $query = new \WP_Query($args);
        return array('items'=>array_map(fn ($post)=>$this->presentPost($post),$query->posts),'pages'=>$query->max_num_pages);
    }

    private function savePost(array $input): array
    {
        global $wpdb;
        $kind=$this->kind($input); $id=absint($input['id'] ?? 0);
        if (! $id && 'news' !== $kind) AjaxRequest::fail('Neue Beiträge bitte im jeweiligen Clubbereich anlegen.');
        $lock='strc-edit-'.hash('sha256',$wpdb->prefix.':'.$id);
        $lock=substr($lock,0,64);
        if ('1' !== (string) $wpdb->get_var($wpdb->prepare('SELECT GET_LOCK(%s, 2)',$lock))) AjaxRequest::fail('Dieser Beitrag wird gerade gespeichert. Bitte erneut versuchen.',409);
        try {
            $post=$id ? get_post($id) : null;
            if ($id && (! $post || self::TYPES[$kind] !== $post->post_type || ('news' === $kind && ! has_category('club-news',$id)))) AjaxRequest::fail('Beitrag nicht gefunden.',404);
            if($kind==='library'&&$post&&!LibraryPolicy::canRead((int)$post->ID))AjaxRequest::fail('Dokument nicht verfügbar.',404);
            if ($post && ! hash_equals($this->postVersion($post),$input['version'] ?? '')) AjaxRequest::fail('Der Beitrag wurde inzwischen geändert. Bitte neu laden und Ihre Eingaben abgleichen.',409);
            $title=sanitize_text_field($input['title'] ?? ''); $body=EditorialAccess::html($input['body'] ?? ''); $status=$input['status'] ?? 'draft';
            if (! $title || mb_strlen($title)>160 || mb_strlen($body)>50000 || ! in_array($status,array('draft','publish','trash'),true)) AjaxRequest::fail('Bitte Titel, Textlänge und Status prüfen.');
            if ('market' === $kind && ! preg_match('/^\d{1,7}(?:\.\d{1,2})?$/',$input['price'] ?? '')) AjaxRequest::fail('Bitte einen gültigen Preis angeben.');
            $french=[];
            if ('news' === $kind) foreach (['titleFr'=>['strc_title_fr',160],'bodyFr'=>['strc_body_fr',50000],'excerptFr'=>['strc_excerpt_fr',5000]] as $field=>[$meta,$limit]) {
                if (!array_key_exists($field,$input)) continue;
                $value=$field==='bodyFr'?EditorialAccess::html($input[$field]):sanitize_textarea_field($input[$field]);
                if (mb_strlen($value)>$limit) AjaxRequest::fail('Le texte français est trop long.',422);
                $french[$meta]=$value;
            }
            $data=array('post_type'=>self::TYPES[$kind],'post_title'=>$title,'post_content'=>$body,'post_excerpt'=>sanitize_textarea_field($input['excerpt'] ?? ''),'post_status'=>$status);
            if ($id) { $data['ID']=$id; wp_save_post_revision($id); }
            else { $category=get_category_by_slug('club-news'); if (! $category) AjaxRequest::fail('News-Kategorie fehlt.',409); $data['post_category']=array($category->term_id); $data['post_author']=get_current_user_id(); }
            $saved=$id ? wp_update_post(wp_slash($data),true) : wp_insert_post(wp_slash($data),true);
            if (is_wp_error($saved)) AjaxRequest::fail('Speichern fehlgeschlagen.',500);
            if ('news' === $kind) {
                foreach ($french as $meta=>$value) update_post_meta($saved,$meta,$value);
                $image=absint($input['imageId'] ?? 0);
                if ($image && wp_attachment_is_image($image)) set_post_thumbnail($saved,$image);
                elseif (! $image) delete_post_thumbnail($saved);
            }
            if ('market' === $kind) update_post_meta($saved,'strc_ad_price',$input['price']);
            return $this->presentPost(get_post($saved));
        } finally { $wpdb->get_var($wpdb->prepare('SELECT RELEASE_LOCK(%s)',$lock)); }
    }

    private function documents(array $input,array $schema,bool $upload): array
    {
        $document=$this->readDocument($input,$schema);
        return $upload?PublicDocumentUpload::receive($document['key']):PublicDocumentUpload::listing($document['key']);
    }

    private function upload(array $input,array $schema): array
    {
        if ('news' === ($input['kind'] ?? '')) $this->kind($input);
        else $this->readDocument($input,$schema);
        return PublicImageUpload::receive();
    }

    private function people(): array
    {
        if (! current_user_can('strc_manage_content_roles')) AjaxRequest::fail('Nur Administratoren dürfen Zuständigkeiten vergeben.',403);
        $users=get_users(array('number'=>1000,'orderby'=>'display_name'));
        $webmaster=current_user_can('manage_options');
        $users=array_filter($users,static fn ($user)=>$user->ID!==get_current_user_id() && ! in_array('administrator',$user->roles,true) && ($webmaster || ! in_array('strc_developer',$user->roles,true)));
        $regions=\SwissTRClub\Core\Events\RegionDirectory::terms();
        $roleOptions=array_map(static fn ($definition)=>$definition['name'], \SwissTRClub\Core\Roles\RoleAssignments::options(current_user_can('manage_options')));
        $events=$roleOptions ? get_posts(array('post_type'=>'strc_event','post_status'=>array('publish','draft','pending','private'),'posts_per_page'=>500,'orderby'=>'title','order'=>'ASC')) : array();
        return array('users'=>array_values(array_map(static fn ($user)=>array('id'=>$user->ID,'name'=>$user->display_name,'city'=>(string)get_user_meta($user->ID,'strc_city',true),'revision'=>\SwissTRClub\Core\Roles\RoleAssignments::revision($user->ID),'assignments'=>\SwissTRClub\Core\Roles\RoleAssignments::rows($user->ID),'isMember'=>user_can($user,'strc_access_member_area'),'regions'=>RegionalEventAccess::regions($user->ID),'areas'=>(array)get_user_meta($user->ID,'strc_moderation_areas',true),'libraryOnly'=>(bool)array_intersect(['strc_administrator','strc_editor'],$user->roles),'libraryAccess'=>get_user_meta($user->ID,'strc_library_access',true)?:'open','roles'=>array_values(array_intersect($user->roles,array_keys(\SwissTRClub\Core\Roles\RoleDefinitions::assignable()))),'assignedEvents'=>RegionalEventAccess::assignedEvents($user->ID)), $users)),
            'regions'=>array_values(array_map(static fn ($term)=>array('id'=>$term->term_id,'name'=>$term->name),$regions)), 'areas'=>EditorialAccess::AREAS,'roleOptions'=>$roleOptions,
            'events'=>array_values(array_map(static fn ($post)=>array('id'=>(int)$post->ID,'title'=>$post->post_title),$events)));
    }

    private function assign(array $input): array
    {
        $this->people();
        return \SwissTRClub\Core\Roles\RoleAssignments::save(absint($input['userId']??0),$input);
    }
}

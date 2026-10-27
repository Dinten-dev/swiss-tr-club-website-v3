<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Marketplace;

use WP_Error;
use WP_Query;

final class MarketplaceEndpoint
{
    private const CATEGORIES = array('Teile', 'Fahrzeuge', 'Zubehör', 'Sonstiges');
    private const MIMES = array('jpg|jpeg|jpe' => 'image/jpeg', 'png' => 'image/png', 'webp' => 'image/webp');

    public function registerHooks(): void
    {
        add_action('before_delete_post',static function(int $id):void{if(get_post_type($id)==='strc_ad'){ $files=get_post_meta($id,'strc_ad_documents',true);AdDocuments::remove(is_array($files)?$files:[]); }});
        add_action('wp_ajax_strc_marketplace', array($this, 'respond'));
        add_action('wp_ajax_nopriv_strc_marketplace', array($this, 'respond'));
    }

    public function respond(): void
    {
        $origin = sanitize_url(wp_unslash($_SERVER['HTTP_ORIGIN'] ?? ''));
        if (defined('STRC_FRONTEND_ORIGIN') && '' !== $origin && hash_equals((string) STRC_FRONTEND_ORIGIN, $origin)) {
            header('Access-Control-Allow-Origin: ' . $origin);
            header('Access-Control-Allow-Credentials: true');
            header('Vary: Origin');
        }
        nocache_headers();
        $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
        $input = wp_unslash('POST' === $method ? $_POST : $_GET);
        $operation = $input['operation'] ?? 'list';
        if (! is_string($operation)) {
            wp_send_json_error(array('message' => 'Ungültige Anfrage.'), 400);
        }
        if (in_array($operation, array('create', 'edit', 'sold', 'withdraw', 'renew', 'approve', 'reject', 'contact', 'delete'), true)) {
            if ('POST' !== $method) {
                wp_send_json_error(array('message' => 'Bitte das Formular verwenden.'), 405);
            }
            $nonce = $input['nonce'] ?? '';
            if (! is_string($nonce) || ! wp_verify_nonce($nonce, 'strc_marketplace')) {
                wp_send_json_error(array('message' => 'Sitzung abgelaufen. Bitte die Seite neu laden und erneut anmelden.'), 403);
            }
        }
        if ($operation==='file') { if(!is_string($input['key']??null))wp_send_json_error(['message'=>'Ungültige Datei.'],400);AdDocuments::download(absint($input['id']??0),$input['key']); }
        $result = match ($operation) {
            'config'=>['nonce'=>wp_create_nonce('strc_marketplace'),'canReview'=>\SwissTRClub\Core\Editorial\EditorialAccess::area('market'),'partCategories'=>\SwissTRClub\Core\Community\CatalogSettings::parts()],
            'list' => $this->listAds($input),
            'members' => $this->serviceMembers((string)($input['q']??'')),
            'create' => $this->createAd($input, $_FILES),
            'approve','reject','withdraw','renew','edit'=>$this->changeAd($operation,$input),
            'delete'=>$this->deleteAd($input),
            'sold' => $this->markSold(absint($input['id'] ?? 0)),
            'contact' => $this->contact(absint($input['id'] ?? 0), $input),
            default => new WP_Error('invalid_operation', 'Ungültige Anfrage.', array('status' => 400)),
        };
        if (is_wp_error($result)) {
            wp_send_json_error(array('message' => $result->get_error_message()), $result->get_error_data()['status'] ?? 400);
        }
        wp_send_json_success($result);
    }

    public function listAds(array $input): array|WP_Error
    {
        $mine = '1' === ($input['mine'] ?? '');
        if ($mine && ! current_user_can('strc_access_member_area')) {
            return $this->denied();
        }
        $category = is_string($input['category'] ?? null) ? $input['category'] : '';
        $meta = array('relation' => 'AND');
        $review=\SwissTRClub\Core\Editorial\EditorialAccess::area('market');
        // Prüfliste für das Marktplatz-Team: nur eingereichte, noch nicht freigegebene Inserate aller Kategorien.
        $pendingOnly=$review&&'1'===($input['review']??'');
        if ($pendingOnly) $category='';
        if (!$mine&&!$review) {
            $meta[]=['key'=>'strc_ad_public_approved','value'=>'1'];
            $meta[]=['key'=>'strc_ad_expires_at','value'=>time(),'compare'=>'>','type'=>'NUMERIC'];
            $meta[] = array('relation' => 'OR',
                array('key' => 'strc_ad_sold', 'compare' => 'NOT EXISTS'),
                array('key' => 'strc_ad_sold', 'value' => '1', 'compare' => '!='),
            );
        }
        if ($category === 'parts') {
            $meta[] = array('key' => 'strc_ad_category', 'value' => array('Teile', 'Zubehör', 'Sonstiges'), 'compare' => 'IN');
        } elseif (in_array($category, self::CATEGORIES, true)) {
            $meta[] = array('key' => 'strc_ad_category', 'value' => $category);
        }
        $model = is_string($input['model'] ?? null) ? sanitize_text_field($input['model']) : '';
        if ($model !== '') {
            if (! in_array($model, \SwissTRClub\Core\Forms\FormFields::MODELS, true)) {
                return new WP_Error('invalid_model', 'Bitte ein gültiges Triumph-Modell wählen.', array('status' => 400));
            }
            // Existing advertisements keep their model inside the serialized details array.
            $meta[]=['relation'=>'OR',['key'=>'strc_ad_details','value'=>'s:5:"model";s:'.strlen($model).':"'.$model.'";','compare'=>'LIKE'],['key'=>'strc_ad_models','value'=>'|'.$model.'|','compare'=>'LIKE']];
        }
        $partCategory=is_string($input['partCategory']??null)?sanitize_text_field($input['partCategory']):'';
        if($partCategory!=='')$meta[]=['key'=>'strc_ad_details','value'=>'s:12:"partCategory";s:'.strlen($partCategory).':"'.$partCategory.'";','compare'=>'LIKE'];
        $search=sanitize_text_field(is_string($input['search']??null)?$input['search']:'');
        global $wpdb;
        $searchFilter=static function(string $where,WP_Query $query)use($search,$wpdb):string{
            if($search===''||$query->get('post_type')!=='strc_ad')return $where;
            $like='%'.$wpdb->esc_like($search).'%';
            return $where.$wpdb->prepare(" AND ({$wpdb->posts}.post_title LIKE %s OR {$wpdb->posts}.post_content LIKE %s OR {$wpdb->posts}.post_excerpt LIKE %s OR EXISTS (SELECT 1 FROM {$wpdb->postmeta} m WHERE m.post_id={$wpdb->posts}.ID AND m.meta_key='strc_ad_details' AND m.meta_value LIKE %s))",$like,$like,$like,$like);
        };
        add_filter('posts_where',$searchFilter,10,2);
        $query = new WP_Query(array(
            'post_type' => 'strc_ad', 'post_status' => $pendingOnly?'pending':($mine||$review?['publish','pending','draft']:'publish'),
            'posts_per_page' => 24, 'paged' => max(1, absint($input['page'] ?? 1)),
            'orderby' => array('date' => 'DESC', 'ID' => 'DESC'),
            'author' => $mine ? get_current_user_id() : '',
            's' => '',
            'meta_query' => $meta,
        ));
        remove_filter('posts_where',$searchFilter,10);
        return array(
            'ads' => array_map(fn ($post): array => $this->present((int) $post->ID), $query->posts),
            'total' => (int) $query->found_posts,
            'pages' => (int) $query->max_num_pages,
        );
    }

    private function validateFields(array $input): array|WP_Error
    {
        foreach (array('title', 'description', 'price', 'category','offerType','priceMode','partCategory','model','condition','location','year','colour','exteriorColour','interiorColour','restoration','parts','models','mileage','mfk') as $key) {
            if (isset($input[$key]) && ! is_string($input[$key])) {
                return new WP_Error('invalid_fields', 'Bitte alle Felder prüfen.');
            }
        }
        $title = sanitize_text_field($input['title'] ?? '');
        $description = sanitize_textarea_field($input['description'] ?? '');
        $price = str_replace(',', '.', trim($input['price'] ?? ''));
        $category = $input['category'] ?? 'Sonstiges';
        if ('' === $title || mb_strlen($title) > 100 || '' === $description || mb_strlen($description) > 5000) {
            return new WP_Error('invalid_text', 'Bitte Titel (max. 100 Zeichen) und Beschreibung (max. 5000 Zeichen) ausfüllen.');
        }
        $offerType=$input['offerType']??'sale';$priceMode=$input['priceMode']??'fixed';
        if(!in_array($offerType,['sale','swap','free'],true)||!in_array($priceMode,['fixed','negotiable','request'],true))return new WP_Error('invalid_offer','Bitte Angebotsart und Preisangabe prüfen.');
        if($offerType!=='sale'||$priceMode==='request')$price='0';
        if (! preg_match('/^\d{1,7}(\.\d{1,2})?$/D', $price) || (float) $price > 1000000) {
            return new WP_Error('invalid_price', 'Bitte einen Preis zwischen CHF 0 und CHF 1’000’000 mit höchstens zwei Nachkommastellen eingeben.');
        }
        if (! in_array($category, self::CATEGORIES, true)) {
            return new WP_Error('invalid_category', 'Bitte eine gültige Kategorie wählen.');
        }
        try {
            $details=['offerType'=>$offerType,'priceMode'=>$priceMode];
            foreach(['partCategory','model','condition','location','year','colour','exteriorColour','interiorColour','restoration','mileage','mfk']as$key)$details[$key]=\SwissTRClub\Core\Forms\FormFields::text($input,$key,$key==='restoration'?2000:160,in_array($key,['condition','location'],true));
            if ($details['mfk']!==''&&(!preg_match('/^\d{4}-\d{2}-\d{2}$/D',$details['mfk'])||!checkdate((int)substr($details['mfk'],5,2),(int)substr($details['mfk'],8,2),(int)substr($details['mfk'],0,4))||$details['mfk']>gmdate('Y-m-d')))throw new \InvalidArgumentException('Bitte ein gültiges MFK-Datum angeben.');
            if ($details['mileage']!=='' && !preg_match('/^[0-9]{1,9}$/D',$details['mileage'])) throw new \InvalidArgumentException('Bitte einen gültigen Kilometerstand angeben.');
            $parts = [];
            if ($category === 'Teile') {
                $partsText = \SwissTRClub\Core\Forms\FormFields::text($input, 'parts', 2000);
                $parts = array_values(array_unique(array_filter(array_map('trim', preg_split('/\R/u', $partsText) ?: []))));
                if (count($parts) > 20 || array_filter($parts, static fn (string $part): bool => mb_strlen($part) > 100)) {
                    throw new \InvalidArgumentException('Bitte höchstens 20 Teile mit maximal 100 Zeichen pro Zeile erfassen.');
                }
            }
            $details['parts'] = $parts;
            $models=json_decode($input['models']??'[]',true);
            if(!is_array($models)||!array_is_list($models)||array_diff($models,\SwissTRClub\Core\Forms\FormFields::MODELS))throw new \InvalidArgumentException('Bitte gültige Modelle auswählen.');
            $details['models']=$category==='Fahrzeuge'?array_filter([$details['model']]):array_values(array_unique($models?:array_filter([$details['model']])));
            $details['model']=$details['models'][0]??'';
            if($details['model']&&!in_array($details['model'],\SwissTRClub\Core\Forms\FormFields::MODELS,true))throw new \InvalidArgumentException('Bitte ein gültiges Modell wählen.');
            if($category==='Fahrzeuge'&&(!$details['model']||!$details['year']))throw new \InvalidArgumentException('Bei Fahrzeugen bitte Modell und Baujahr angeben.');
            if($details['year']&&(!preg_match('/^\d{4}$/D',$details['year'])||(int)$details['year']<1900||(int)$details['year']>(int)gmdate('Y')+1))throw new \InvalidArgumentException('Bitte ein gültiges Baujahr angeben.');
        }catch(\InvalidArgumentException $e){return new WP_Error('invalid_details',$e->getMessage());}
        return [$title,$description,$price,$category,$details,$parts];
    }

    public function createAd(array $input, array $files): array|WP_Error
    {
        if (! current_user_can('strc_access_member_area') || ! current_user_can('publish_strc_ads')) {
            return $this->denied();
        }
        // Service: Marktplatz-Moderation oder Admin erstellt das Inserat im Namen eines Mitglieds.
        $owner=get_current_user_id();$service=absint($input['onBehalfOf']??0);
        if($service){
            if(!\SwissTRClub\Core\Editorial\EditorialAccess::area('market'))return $this->denied();
            $member=get_userdata($service);
            $membership=(new \SwissTRClub\Core\Members\MembershipRepository())->findForUser($service);
            if(!$member||$service===$owner||!$membership||!in_array($membership['status'],['active','grace'],true)||!user_can($member,'strc_access_member_area'))return new WP_Error('member','Bitte ein aktives Mitglied auswählen.',['status'=>422]);
            $owner=$service;
        }
        $validated=$this->validateFields($input);if(is_wp_error($validated))return $validated;
        [$title,$description,$price,$category,$details,$parts]=$validated;
        $images = $files['images'] ?? array();
        $names = $images['name'] ?? array();
        if (! is_array($names) || count($names) > 5) {
            return new WP_Error('invalid_images', 'Bitte höchstens 5 Bilder auswählen.');
        }
        $uploads = array();
        foreach ($names as $index => $name) {
            $upload = array();
            foreach (array('name', 'type', 'tmp_name', 'error', 'size') as $key) {
                $value = $images[$key][$index] ?? null;
                if (! is_scalar($value)) {
                    return new WP_Error('invalid_image', 'Ein Bild konnte nicht gelesen werden.');
                }
                $upload[$key] = $value;
            }
            if (UPLOAD_ERR_OK !== (int) $upload['error'] || (int) $upload['size'] > 20 * MB_IN_BYTES || (int) $upload['size'] < 1) {
                return new WP_Error('invalid_image', 'Jedes Bild darf höchstens 20 MB gross sein. Bitte den Upload prüfen.');
            }
            $size = wp_getimagesize($upload['tmp_name']);
            $checked = wp_check_filetype_and_ext($upload['tmp_name'], $upload['name'], self::MIMES);
            if (! $size || $size[0] * $size[1] > 40000000 || ! in_array($checked['type'], self::MIMES, true)) {
                return new WP_Error('invalid_image_type', 'Bitte JPG-, PNG- oder WebP-Bilder mit höchstens 40 Megapixeln verwenden.');
            }
            $uploads[] = $upload;
        }
        require_once ABSPATH . 'wp-admin/includes/file.php';
        require_once ABSPATH . 'wp-admin/includes/media.php';
        require_once ABSPATH . 'wp-admin/includes/image.php';
        if($category==='Fahrzeuge'&&count(array_filter((array)($files['documents']['error']??[]),static fn($error)=>$error!==UPLOAD_ERR_NO_FILE))>1)return new WP_Error('pdf_count','Bei Fahrzeugen ist ein PDF möglich.');
        $documents=AdDocuments::save($files['documents']??[]);if(is_wp_error($documents))return $documents;
        // Publish only once every upload has succeeded; failed uploads leave no partial ad.
        $postId = wp_insert_post(wp_slash(array(
            'post_type' => 'strc_ad', 'post_status' => 'draft',
            'post_author' => $owner, 'post_title' => $title, 'post_content' => $description,
            'post_excerpt' => implode(', ', $parts),
        )), true);
        if (is_wp_error($postId)) {
            AdDocuments::remove($documents);
            return new WP_Error('save_failed', 'Das Inserat konnte nicht gespeichert werden. Bitte erneut versuchen.');
        }
        update_post_meta($postId,'strc_ad_documents',$documents);
        $attachments = array();
        foreach ($uploads as $upload) {
            $_FILES['strc_ad_image'] = $upload;
            $attachment = media_handle_upload('strc_ad_image', $postId, array(), array('test_form' => false, 'mimes' => self::MIMES));
            unset($_FILES['strc_ad_image']);
            if (is_wp_error($attachment)) {
                $this->rollback($postId, $attachments);
                return new WP_Error('upload_failed', 'Ein Bild konnte nicht gespeichert werden. Bitte erneut versuchen.');
            }
            $attachments[] = $attachment;
        }
        update_post_meta($postId, 'strc_ad_price', number_format((float) $price, 2, '.', ''));
        update_post_meta($postId, 'strc_ad_category', $category);
        update_post_meta($postId,'strc_ad_details',$details);update_post_meta($postId,'strc_ad_models','|'.implode('|',$details['models']??[]).'|');
        update_post_meta($postId, 'strc_ad_images', $attachments);
        if ($attachments) {
            set_post_thumbnail($postId, $attachments[0]);
        }
        if($service){
            // Von der Moderation erfasst = bereits geprüft, auch bei Fahrzeugen.
            update_post_meta($postId,'strc_ad_service',['by'=>get_current_user_id(),'at'=>gmdate(DATE_ATOM)]);
            update_post_meta($postId,'strc_ad_public_approved','1');update_post_meta($postId,'strc_ad_expires_at',time()+90*DAY_IN_SECONDS);
            update_post_meta($postId,'strc_review',['by'=>get_current_user_id(),'at'=>gmdate(DATE_ATOM),'service'=>true]);
            $status='publish';
        }else $status=$this->settle((int)$postId,true);
        $published = wp_update_post(array('ID' => $postId, 'post_status' => $status), true);
        if (is_wp_error($published)) {
            $this->rollback($postId, $attachments);
            return new WP_Error('publish_failed', 'Das Inserat konnte nicht veröffentlicht werden. Bitte erneut versuchen.');
        }
        if($status==='pending')\SwissTRClub\Core\Community\SubmissionNotifications::send((int)$postId,'market');
        if($service)$this->notifyServiceOwner((int)$postId);
        return $this->present($postId);
    }

    /** Mitgliedersuche für das Service-Inserat (nur Marktplatz-Moderation / Admin). */
    private function serviceMembers(string $search): array|WP_Error
    {
        if(!\SwissTRClub\Core\Editorial\EditorialAccess::area('market'))return $this->denied();
        $search=trim(sanitize_text_field($search));
        if(mb_strlen($search)<2)return ['members'=>[]];
        $users=get_users(['search'=>'*'.$search.'*','search_columns'=>['display_name','user_email','user_login'],'number'=>40,'orderby'=>'display_name']);
        $byName=get_users(['number'=>40,'meta_query'=>['relation'=>'OR',['key'=>'first_name','value'=>$search,'compare'=>'LIKE'],['key'=>'last_name','value'=>$search,'compare'=>'LIKE']]]);
        $rows=[];$repo=new \SwissTRClub\Core\Members\MembershipRepository();
        foreach(array_merge($users,$byName) as $user){
            if(isset($rows[$user->ID])||!user_can($user,'strc_access_member_area'))continue;
            $membership=$repo->findForUser((int)$user->ID);
            if(!$membership||!in_array($membership['status'],['active','grace'],true)||(int)$user->ID===get_current_user_id())continue;
            $number=(string)($membership['member_number']??'');
            $rows[$user->ID]=['id'=>(int)$user->ID,'name'=>$user->display_name,'memberNumber'=>str_starts_with($number,'FG:')?'':$number,'city'=>(string)get_user_meta($user->ID,'strc_city',true)];
            if(count($rows)>=20)break;
        }
        return ['members'=>array_values($rows)];
    }

    /** Das Mitglied erfährt, dass in seinem Namen ein Inserat online ist (Kontaktanfragen gehen an seine E-Mail). */
    private function notifyServiceOwner(int $id): void
    {
        $post=get_post($id);$owner=$post?get_userdata((int)$post->post_author):null;
        if(!$owner||!is_email($owner->user_email))return;
        $base=rtrim(defined('STRC_FRONTEND_ORIGIN')?STRC_FRONTEND_ORIGIN:home_url(),'/');
        $body="Hallo ".($owner->first_name?:$owner->display_name)."\n\nDer Marktplatz-Service des Swiss TR-Club hat in deinem Namen ein Inserat erstellt:\n«".$post->post_title."»\n\nKontaktanfragen von Interessierten erhältst du an diese E-Mail-Adresse. Unter «Meine Inserate» kannst du das Inserat bearbeiten, als verkauft markieren oder zurückziehen:\n{$base}/#marktplatz/meine\n\nSwiss TR-Club\n";
        try{wp_mail($owner->user_email,'Swiss TR-Club: Dein Inserat ist online',$body,['Content-Type: text/plain; charset=UTF-8','From: Swiss TR-Club <no-reply@swisstrclub.ch>']);}catch(\Throwable $error){error_log('STRC marketplace service mail failed for ad '.$id.'.');}
    }

    public function markSold(int $id): array|WP_Error
    {
        $post = get_post($id);
        if (! current_user_can('strc_access_member_area') || ! current_user_can('edit_strc_ads') || ! $post ||
            'strc_ad' !== $post->post_type || 'publish' !== $post->post_status || (int) $post->post_author !== get_current_user_id()) {
            return $this->denied();
        }
        update_post_meta($id, 'strc_ad_sold', '1');
        return $this->present($id);
    }

    public function contact(int $id, array $input): array|WP_Error
    {
        if(!empty($input['website']))return new WP_Error('contact','Anfrage nicht erlaubt.');
        try { \SwissTRClub\Core\Forms\FormStore::quota(); }catch(\RuntimeException $e){return new WP_Error('rate',$e->getMessage(),['status'=>429]);}
        $post = get_post($id);
        if (! $post || 'strc_ad' !== $post->post_type || 'publish' !== $post->post_status || get_post_meta($id, 'strc_ad_sold', true)||get_post_meta($id,'strc_ad_public_approved',true)!=='1'||(int)get_post_meta($id,'strc_ad_expires_at',true)<=time()) {
            return new WP_Error('not_found', 'Dieses Inserat ist nicht mehr verfügbar.', array('status' => 404));
        }
        $seller = get_userdata((int) $post->post_author);
        if (! $seller || ! is_email($seller->user_email)) {
            return new WP_Error('seller_email', 'Der Verkäufer kann momentan nicht per E-Mail erreicht werden.');
        }
        if ($seller->ID === get_current_user_id()) {
            return new WP_Error('own_ad', 'Sie können keine Anfrage zu Ihrem eigenen Inserat senden.');
        }
        $name = sanitize_text_field($input['name'] ?? '');
        $email = sanitize_email($input['email'] ?? '');
        $phone = sanitize_text_field($input['phone'] ?? '');
        $message = sanitize_textarea_field($input['message'] ?? '');
        if ('' === $name || mb_strlen($name) > 120 || ! is_email($email) || mb_strlen($email) > 254 || mb_strlen($phone) > 40 || '' === $message || mb_strlen($message) > 2000) {
            return new WP_Error('invalid_contact', 'Bitte Name, gültige E-Mail-Adresse und Nachricht prüfen.');
        }
        $subject = sprintf('Anfrage zu Inserat #%d: %s', $id, sanitize_text_field($post->post_title));
        $body = "Inserat: #{$id} – " . sanitize_text_field($post->post_title) . "\n\n" .
            "Name: {$name}\nE-Mail: {$email}\n" . ($phone !== '' ? "Telefon: {$phone}\n" : '') .
            "\nNachricht:\n{$message}";
        $sent = wp_mail($seller->user_email, $subject, $body, array('Reply-To: ' . $name . ' <' . $email . '>'));
        if (! $sent) {
            return new WP_Error('mail_failed', 'Die Anfrage konnte nicht gesendet werden. Bitte später erneut versuchen.');
        }
        return array('sent' => true);
    }

    private function changeAd(string $operation,array $input): array|WP_Error
    {
        if(!current_user_can('strc_access_member_area'))return $this->denied();
        $id=absint($input['id']??0);$post=get_post($id);
        if(!$post||$post->post_type!=='strc_ad'||!in_array($post->post_status,['publish','pending','draft'],true))return new WP_Error('missing','Inserat nicht gefunden.',['status'=>404]);
        $reviewChanged=$post->post_status!==($operation==='approve'?'publish':'draft')||($operation==='approve'&&get_post_meta($id,'strc_ad_public_approved',true)!=='1');
        $review=\SwissTRClub\Core\Editorial\EditorialAccess::area('market');
        if(in_array($operation,['approve','reject'],true)&&!$review)return $this->denied();
        if(!$review&&(int)$post->post_author!==get_current_user_id())return $this->denied();
        if($operation==='approve'){
            update_post_meta($id,'strc_ad_public_approved','1');update_post_meta($id,'strc_ad_expires_at',time()+90*DAY_IN_SECONDS);
            update_post_meta($id,'strc_review',['by'=>get_current_user_id(),'at'=>gmdate(DATE_ATOM)]);$status='publish';
        }elseif(in_array($operation,['reject','withdraw'],true)){$status='draft';delete_post_meta($id,'strc_ad_public_approved');}
        else{
            $status='pending';
            if($operation==='edit'){
                $validated=$this->validateFields($input);if(is_wp_error($validated))return $validated;
                [$title,$description,$price,$category,$details,$parts]=$validated;
                $oldImages=array_map('intval',(array)get_post_meta($id,'strc_ad_images',true));
                if(isset($input['retainedImageIds'])&&!is_string($input['retainedImageIds']))return new WP_Error('invalid_images','Ungültige Bildauswahl.');
                $retained=json_decode($input['retainedImageIds']??wp_json_encode($oldImages),true);
                if(!is_array($retained)||!array_is_list($retained)||array_diff($retained,$oldImages))return new WP_Error('invalid_images','Ungültige Bildauswahl.');
                $retained=array_values(array_unique(array_map('intval',$retained)));
                $names=$_FILES['images']['name']??[];
                if(!is_array($names)||count($retained)+count($names)>5)return new WP_Error('invalid_images','Bitte höchstens 5 Bilder auswählen.');
                $uploads=[];
                foreach($names as $index=>$name){
                    $upload=[];foreach(['name','type','tmp_name','error','size'] as $key){$value=$_FILES['images'][$key][$index]??null;if(!is_scalar($value))return new WP_Error('invalid_image','Ein Bild konnte nicht gelesen werden.');$upload[$key]=$value;}
                    $size=wp_getimagesize($upload['tmp_name']);$checked=wp_check_filetype_and_ext($upload['tmp_name'],$upload['name'],self::MIMES);
                    if((int)$upload['error']!==UPLOAD_ERR_OK||(int)$upload['size']<1||(int)$upload['size']>20*MB_IN_BYTES||!$size||$size[0]*$size[1]>40000000||!in_array($checked['type'],self::MIMES,true))return new WP_Error('invalid_image','Bitte JPG, PNG oder WebP bis 20 MB und 40 Megapixeln verwenden.');
                    $uploads[]=$upload;
                }
                $oldDocuments=get_post_meta($id,'strc_ad_documents',true);$oldDocuments=is_array($oldDocuments)?$oldDocuments:[];
                if(isset($input['retainedDocumentKeys'])&&!is_string($input['retainedDocumentKeys']))return new WP_Error('pdf_keys','Ungültige PDF-Auswahl.');
                $documentKeys=json_decode($input['retainedDocumentKeys']??wp_json_encode(array_column($oldDocuments,'key')),true);
                if(!is_array($documentKeys)||!array_is_list($documentKeys)||array_filter($documentKeys,static fn($key)=>!is_string($key))||array_diff($documentKeys,array_column($oldDocuments,'key')))return new WP_Error('pdf_keys','Ungültige PDF-Auswahl.');
                $keptDocuments=array_values(array_filter($oldDocuments,static fn($file)=>in_array($file['key'],$documentKeys,true)));
                if($category==='Fahrzeuge'&&count($keptDocuments)+count(array_filter((array)($_FILES['documents']['error']??[]),static fn($error)=>$error!==UPLOAD_ERR_NO_FILE))>max(1,count($oldDocuments)))return new WP_Error('pdf_count','Bei Fahrzeugen ist ein PDF möglich.');
                $newDocuments=AdDocuments::save($_FILES['documents']??[],count($keptDocuments));if(is_wp_error($newDocuments))return $newDocuments;
                require_once ABSPATH.'wp-admin/includes/file.php';require_once ABSPATH.'wp-admin/includes/media.php';require_once ABSPATH.'wp-admin/includes/image.php';
                $newImages=[];
                foreach($uploads as $upload){$_FILES['strc_ad_image']=$upload;$attachment=media_handle_upload('strc_ad_image',$id,[],['test_form'=>false,'mimes'=>self::MIMES]);unset($_FILES['strc_ad_image']);if(is_wp_error($attachment)){AdDocuments::remove($newDocuments);foreach($newImages as $newId)wp_delete_attachment($newId,true);return new WP_Error('upload_failed','Bilder konnten nicht gespeichert werden. Bestehendes Inserat bleibt erhalten.');}$newImages[]=$attachment;}
                $result=wp_update_post(wp_slash(['ID'=>$id,'post_title'=>$title,'post_content'=>$description,'post_excerpt'=>implode(', ',$parts),'post_status'=>'pending']),true);
                if(is_wp_error($result)){AdDocuments::remove($newDocuments);foreach($newImages as $newId)wp_delete_attachment($newId,true);return $result;}
                update_post_meta($id,'strc_ad_documents',array_merge($keptDocuments,$newDocuments));
                AdDocuments::remove(array_values(array_filter($oldDocuments,static fn($file)=>!in_array($file['key'],$documentKeys,true))));
                $images=array_merge($retained,$newImages);
                update_post_meta($id,'strc_ad_price',number_format((float)$price,2,'.',''));update_post_meta($id,'strc_ad_category',$category);update_post_meta($id,'strc_ad_details',$details);update_post_meta($id,'strc_ad_models','|'.implode('|',$details['models']??[]).'|');update_post_meta($id,'strc_ad_images',$images);
                if($images)set_post_thumbnail($id,$images[0]);else delete_post_thumbnail($id);
                delete_post_meta($id,'strc_ad_sold');
            }
        }
        // Admin/Marktplatz-Moderation korrigiert ein veröffentlichtes Inserat: es bleibt online (keine erneute Prüfung).
        if($status==='pending'&&$operation==='edit'&&$review&&$post->post_status==='publish'&&(int)$post->post_author!==get_current_user_id()){$status='publish';update_post_meta($id,'strc_review',['by'=>get_current_user_id(),'at'=>gmdate(DATE_ATOM),'edited'=>true]);}
        if($status==='pending')$status=$this->settle($id,$operation==='renew');
        $result=wp_update_post(['ID'=>$id,'post_status'=>$status],true);if(is_wp_error($result))return $result;
        if($status!=='publish')delete_post_meta($id,'strc_ad_public_approved');
        if($status==='pending')\SwissTRClub\Core\Community\SubmissionNotifications::send($id,'market');
        if($reviewChanged&&in_array($operation,['approve','reject'],true))\SwissTRClub\Core\Community\SubmissionNotifications::decided($id,'market',$operation==='approve');
        return $this->present($id);
    }

    /**
     * Nur Fahrzeuginserate werden vom Marktplatz-Team geprüft. Ersatzteile, Zubehör und Sonstiges
     * gehen direkt online (90 Tage Laufzeit, bei «renew» oder abgelaufener Laufzeit neu ab heute).
     */
    private function settle(int $id,bool $extend): string
    {
        if(get_post_meta($id,'strc_ad_category',true)==='Fahrzeuge')return 'pending';
        update_post_meta($id,'strc_ad_public_approved','1');
        if($extend||(int)get_post_meta($id,'strc_ad_expires_at',true)<time())update_post_meta($id,'strc_ad_expires_at',time()+90*DAY_IN_SECONDS);
        update_post_meta($id,'strc_review',['by'=>0,'at'=>gmdate(DATE_ATOM),'automatic'=>true]);
        return 'publish';
    }

    private function present(int $id): array
    {
        $post = get_post($id);
        $imageIds = get_post_meta($id, 'strc_ad_images', true);
        $seller = get_userdata((int) $post->post_author);
        return array(
            'id' => $id, 'title' => $post->post_title, 'description' => wp_strip_all_tags($post->post_content),
            'descriptionHtml' => \SwissTRClub\Core\Editorial\EditorialAccess::html(wpautop($post->post_content)),
            'details'=>get_post_meta($id,'strc_ad_details',true)?:[],
            'price' => (string) get_post_meta($id, 'strc_ad_price', true),
            'category' => get_post_meta($id, 'strc_ad_category', true) ?: 'Sonstiges',
            'documents'=>AdDocuments::present($id),
            'imageIds'=>array_values(array_map('intval',is_array($imageIds)?$imageIds:[])),
            'images' => array_values(array_filter(array_map(static fn ($imageId) => wp_get_attachment_image_url((int) $imageId, 'large'), is_array($imageIds) ? $imageIds : array()))),
            // Name nur für das Prüfteam und den Inserenten selbst – nie öffentlich ausliefern.
            'seller' => (\SwissTRClub\Core\Editorial\EditorialAccess::area('market') || (get_current_user_id() > 0 && (int) $post->post_author === get_current_user_id())) && $seller ? $seller->display_name : '',
            'createdAt' => get_post_time(DATE_ATOM, true, $id),
            'status'=>$post->post_status,'canReview'=>\SwissTRClub\Core\Editorial\EditorialAccess::area('market'),'expiresAt'=>get_post_meta($id,'strc_ad_expires_at',true)?gmdate(DATE_ATOM,(int)get_post_meta($id,'strc_ad_expires_at',true)):'',
            'mine' => get_current_user_id() > 0 && (int) $post->post_author === get_current_user_id(),
            'service' => (get_current_user_id()>0&&((int)$post->post_author===get_current_user_id()||\SwissTRClub\Core\Editorial\EditorialAccess::area('market')))&&is_array(get_post_meta($id,'strc_ad_service',true))?(string)(get_userdata((int)(get_post_meta($id,'strc_ad_service',true)['by']??0))->display_name??'Marktplatz-Service'):'',
            'sold' => (bool) get_post_meta($id, 'strc_ad_sold', true),
        );
    }

    /** Admin und Marktplatz-Moderation entfernen ein Inserat (Papierkorb, wiederherstellbar in wp-admin). */
    private function deleteAd(array $input): array|WP_Error
    {
        if(!current_user_can('strc_access_member_area')||!\SwissTRClub\Core\Editorial\EditorialAccess::area('market'))return $this->denied();
        $id=absint($input['id']??0);$post=get_post($id);
        if(!$post||$post->post_type!=='strc_ad'||$post->post_status==='trash')return new WP_Error('missing','Inserat nicht gefunden.',['status'=>404]);
        update_post_meta($id,'strc_review',['by'=>get_current_user_id(),'at'=>gmdate(DATE_ATOM),'deleted'=>true]);
        if(!wp_trash_post($id))return new WP_Error('delete_failed','Inserat konnte nicht entfernt werden.',['status'=>500]);
        return ['deleted'=>true,'id'=>$id];
    }

    private function denied(): WP_Error
    {
        return new WP_Error('forbidden', 'Bitte mit einem berechtigten Mitgliedskonto anmelden.', array('status' => 403));
    }

    private function rollback(int $postId, array $attachments): void
    {
        foreach ($attachments as $id) {
            wp_delete_attachment($id, true);
        }
        wp_delete_post($postId, true);
    }
}

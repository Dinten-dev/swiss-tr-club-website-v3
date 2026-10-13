<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Forms;
use SwissTRClub\Core\Http\AjaxRequest;

final class FormStore
{
    public static function register(): void
    {
        foreach (['strc_form','strc_vehicle','strc_registration','strc_payment'] as $type) register_post_type($type, ['public'=>false,'show_ui'=>false,'show_in_rest'=>false,'rewrite'=>false,'query_var'=>false,'supports'=>[], 'capabilities'=>['edit_posts'=>'do_not_allow','read_private_posts'=>'do_not_allow','create_posts'=>'do_not_allow'], 'map_meta_cap'=>false]);
    }
    public static function data(object $post): array {return json_decode($post->post_content,true) ?: [];}
    public static function revision(object $post): string {return hash('sha256',$post->post_content);}
    public static function find(string $type, int $owner = 0, int $parent = 0): array
    {
        $args=['post_type'=>$type,'post_status'=>'private','posts_per_page'=>-1,'orderby'=>'ID','order'=>'DESC'];
        if ($owner) $args['author']=$owner;
        if ($parent) $args['post_parent']=$parent;
        return get_posts($args);
    }
    public static function save(string $type, array $data, int $owner, int $parent = 0, ?object $post = null, string $revision = ''): int
    {
        $json=wp_json_encode($data);
        if ($post) {
            global $wpdb;
            if (!hash_equals(self::revision($post),$revision)) throw new \RuntimeException('Die Angaben wurden inzwischen geändert. Bitte neu laden.',409);
            if ($post->post_content === $json) return (int)$post->ID;
            $updated=$wpdb->query($wpdb->prepare("UPDATE {$wpdb->posts} SET post_content=%s, post_modified=%s, post_modified_gmt=%s WHERE ID=%d AND BINARY post_content=BINARY %s",$json,current_time('mysql'),current_time('mysql',true),$post->ID,$post->post_content));
            if ($updated!==1) throw new \RuntimeException('Speichern fehlgeschlagen oder inzwischen geändert. Bitte neu laden.',409);
            clean_post_cache($post->ID);
            return (int)$post->ID;
        }
        $id=wp_insert_post(wp_slash(['post_type'=>$type,'post_status'=>'private','post_title'=>'Clubformular','post_content'=>$json,'post_author'=>$owner,'post_parent'=>$parent,'comment_status'=>'closed','ping_status'=>'closed']),true);
        if (is_wp_error($id)||!$id) throw new \RuntimeException('Speichern fehlgeschlagen. Ihre Eingaben bleiben im Formular.',503);
        return (int)$id;
    }
    public static function locked(string $key, callable $work): mixed
    {
        global $wpdb;$key='strc-form-'.substr(hash('sha256',$key),0,50);
        if ('1'!==(string)$wpdb->get_var($wpdb->prepare('SELECT GET_LOCK(%s, 3)',$key))) throw new \RuntimeException('Anfrage wird verarbeitet. Bitte kurz warten.',409);
        try {return $work();} finally {$wpdb->get_var($wpdb->prepare('SELECT RELEASE_LOCK(%s)',$key));}
    }
    public static function intake(string $kind, array $data, string $reference, int $owner = 0): int
    {
        if (!preg_match('/^[a-f0-9-]{36}$/D',$reference)) throw new \InvalidArgumentException('Bitte das Formular neu laden.');
        return self::locked($kind.'-'.$owner.'-'.$reference,static function()use($kind,$data,$reference,$owner){
            global $wpdb;
            $key=hash_hmac('sha256',$kind.'|'.$owner.'|'.$reference,wp_salt('auth'));
            $existing=$wpdb->get_var($wpdb->prepare("SELECT ID FROM {$wpdb->posts} WHERE post_type='strc_form' AND post_status='private' AND post_excerpt=%s LIMIT 1",$key));
            if ($existing) return (int)$existing;
            $record=['kind'=>$kind,'state'=>'pending_review','createdAt'=>gmdate(DATE_ATOM),'reference'=>$reference,'payload'=>$data];
            $id=wp_insert_post(wp_slash(['post_type'=>'strc_form','post_status'=>'private','post_title'=>'Clubanfrage','post_content'=>wp_json_encode($record),'post_excerpt'=>$key,'post_author'=>$owner,'comment_status'=>'closed','ping_status'=>'closed']),true);
            if(is_wp_error($id)||!$id) throw new \RuntimeException('Die Anfrage konnte nicht gespeichert werden.',503);
            return (int)$id;
        });
    }
    public static function quota(): void
    {
        self::locked('public-'.($_SERVER['REMOTE_ADDR']??''),static function(){
            $key='strc_forms_rate_'.hash_hmac('sha256',$_SERVER['REMOTE_ADDR']??'unknown',wp_salt('auth'));
            $quota=get_transient($key);if(!is_array($quota)||$quota['until']<time())$quota=['count'=>0,'until'=>time()+3600];
            if($quota['count']>=8)throw new \RuntimeException('Zu viele Anfragen. Bitte später erneut versuchen.',429);
            $quota['count']++;if(!set_transient($key,$quota,max(1,$quota['until']-time())))throw new \RuntimeException('Bitte später erneut versuchen.',503);
        });
    }
}

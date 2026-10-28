<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Community;

final class GalleryRetention
{
    /** Hi-Res-Originale im Depot: 4 Monate ab Upload, ohne Verlängerung (Entscheid Redaktion 28.10.2026). */
    public const MONTHS = 4;

    public function registerHooks(): void
    {
        add_action('init',static function(){if(!wp_next_scheduled('strc_gallery_retention'))wp_schedule_event(time()+DAY_IN_SECONDS,'daily','strc_gallery_retention');});
        add_action('strc_gallery_retention',[$this,'run']);
    }
    public function run(): void
    {
        $store=new PrivateUploadStore();
        foreach(get_posts(['post_type'=>'strc_album','post_status'=>['publish','pending','draft'],'posts_per_page'=>-1]) as $post){
            $files=get_post_meta($post->ID,'strc_private_files',true);if(!is_array($files))continue;$changed=false;
            foreach($files as &$file){
                $uploaded=strtotime($file['uploadedAt']??'')?:strtotime($post->post_date_gmt.' UTC');
                if(!$uploaded||!empty($file['originalExpired'])||strtotime('+'.self::MONTHS.' months',$uploaded)>time())continue;
                // Erst die Webfassung sichern, dann das Original löschen.
                if(!get_option('strc_web_image_'.($file['key']??'')))$store->webCopy($file);
                if($store->expireOriginal($file)){$file['originalExpired']=true;$changed=true;}
            }unset($file);
            if($changed)update_post_meta($post->ID,'strc_private_files',$files);
        }
    }
}

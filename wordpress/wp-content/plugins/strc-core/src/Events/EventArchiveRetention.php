<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Events;

use DateTimeImmutable;

final class EventArchiveRetention
{
    public const MONTHS = 12;

    public static function registerHooks(): void
    {
        add_action('init',static function():void{
            if(!wp_next_scheduled('strc_archive_old_events'))wp_schedule_event(time()+3600,'daily','strc_archive_old_events');
        });
        add_action('strc_archive_old_events',[self::class,'archiveExpired']);
    }
    public static function archiveExpired(): void
    {
        foreach(get_posts(['post_type'=>'strc_event','post_status'=>'publish','posts_per_page'=>-1,'fields'=>'ids'])as$id){
            // A manually restored event is not immediately archived again.
            if(get_post_meta($id,'strc_archive_restored',true))continue;
            $end=get_post_meta($id,'strc_end_at',true)?:get_post_meta($id,'strc_start_at',true);
            if(!$end||!\SwissTRClub\Core\Forms\EventRegistration::validDate($end))continue;
            if((new DateTimeImmutable($end))->modify('+'.self::MONTHS.' months')->getTimestamp()<=time())wp_trash_post($id);
        }
    }

    public static function deleteAfter(int $archivedAt): ?int
    {
        return null; // Historical events and registrations are retained.
    }

    public static function shouldRetain(int $archivedAt, int $now): bool
    {
        $deleteAfter = self::deleteAfter($archivedAt);

        return null === $deleteAfter || $now < $deleteAfter;
    }
}

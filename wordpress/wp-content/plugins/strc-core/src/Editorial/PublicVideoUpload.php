<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Editorial;
use SwissTRClub\Core\Http\AjaxRequest;

/**
 * Öffentliche Kurzvideos für die Startseite (Wunsch Redaktion 7.11.2026: Video in «Momente aus dem Clubleben»).
 * Nur MP4, damit alle Browser und Handys es ohne Umwandlung abspielen. Der Aufrufer prüft Redaktionsbereich und Nonce.
 */
final class PublicVideoUpload
{
    public const MAX_BYTES = 40 * 1024 * 1024;

    public static function receive(): array
    {
        $file=$_FILES['file']??null;
        if(!is_array($file)||!is_string($file['tmp_name']??null)||!is_uploaded_file($file['tmp_name'])||(int)($file['error']??1)!==UPLOAD_ERR_OK||(int)($file['size']??0)>self::MAX_BYTES)AjaxRequest::fail('Bitte ein MP4-Video bis 40 MB wählen.');
        if(!self::isMp4($file['tmp_name'],(string)($file['name']??'')))AjaxRequest::fail('Die Datei ist kein gültiges MP4-Video.');
        $mimes=['mp4|m4v'=>'video/mp4'];
        require_once ABSPATH.'wp-admin/includes/file.php';require_once ABSPATH.'wp-admin/includes/media.php';require_once ABSPATH.'wp-admin/includes/image.php';
        $id=media_handle_upload('file',0,[],['test_form'=>false,'mimes'=>$mimes]);
        if(is_wp_error($id))AjaxRequest::fail('Das Video konnte nicht hochgeladen werden. Bitte erneut versuchen.');
        return ['id'=>$id,'url'=>wp_get_attachment_url($id)];
    }

    /** MP4/ISO-Container: Endung .mp4/.m4v und «ftyp» ab Byte 4. */
    public static function isMp4(string $path, string $name): bool
    {
        if(!preg_match('/\.(mp4|m4v)$/i',$name))return false;
        $head=@file_get_contents($path,false,null,0,12);
        return is_string($head)&&strlen($head)===12&&substr($head,4,4)==='ftyp';
    }
}

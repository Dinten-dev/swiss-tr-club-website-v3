<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Editorial;
use SwissTRClub\Core\Http\AjaxRequest;

final class PublicImageUpload
{
    /** Call only after the endpoint has checked the actor, scope and nonce. */
    public static function receive(): array
    {
        $file=$_FILES['file']??null;
        if(!is_array($file)||!is_string($file['tmp_name']??null)||!is_uploaded_file($file['tmp_name'])||(int)($file['error']??1)!==UPLOAD_ERR_OK||(int)($file['size']??0)>20*1024*1024)AjaxRequest::fail('Bitte ein JPG-, PNG- oder WebP-Bild bis 20 MB wählen.');
        $mimes=['jpg|jpeg'=>'image/jpeg','png'=>'image/png','webp'=>'image/webp'];
        $valid=wp_check_filetype_and_ext($file['tmp_name'],$file['name'],$mimes);
        $dimensions=@getimagesize($file['tmp_name']);
        if(!$valid['type']||!$dimensions||$dimensions[0]*$dimensions[1]>40000000)AjaxRequest::fail('Bitte ein gültiges Bild bis 40 Megapixel wählen.');
        require_once ABSPATH.'wp-admin/includes/file.php';require_once ABSPATH.'wp-admin/includes/media.php';require_once ABSPATH.'wp-admin/includes/image.php';
        $id=media_handle_upload('file',0,[],['test_form'=>false,'mimes'=>$mimes]);
        if(is_wp_error($id))AjaxRequest::fail('Bild konnte nicht hochgeladen werden. Bitte erneut versuchen.');
        return ['id'=>$id,'url'=>wp_get_attachment_url($id)];
    }
}

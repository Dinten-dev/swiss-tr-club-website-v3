<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Editorial;
use SwissTRClub\Core\Http\AjaxRequest;

/** Public documents only. The caller checks editorial scope and the upload nonce. */
final class PublicDocumentUpload
{
    public static function listing(string $key): array
    {
        $files=get_posts(['post_type'=>'attachment','post_status'=>'inherit','post_mime_type'=>'application/pdf','posts_per_page'=>100,'meta_key'=>'strc_public_document_page','meta_value'=>$key,'orderby'=>'date','order'=>'DESC']);
        return ['documents'=>array_map(static fn($file)=>['id'=>$file->ID,'title'=>get_the_title($file),'url'=>wp_get_attachment_url($file->ID)],$files)];
    }

    public static function receive(string $key): array
    {
        $file=$_FILES['file']??null;
        if(!is_array($file)||!is_string($file['tmp_name']??null)||!is_uploaded_file($file['tmp_name'])||(int)($file['error']??1)!==UPLOAD_ERR_OK||(int)($file['size']??0)>50*1024*1024)AjaxRequest::fail('Bitte ein PDF bis 50 MB wählen.');
        $mimes=['pdf'=>'application/pdf'];
        $valid=wp_check_filetype_and_ext($file['tmp_name'],$file['name'],$mimes);
        $mime=(new \finfo(FILEINFO_MIME_TYPE))->file($file['tmp_name']);
        if(($valid['type']??'')!=='application/pdf'||$mime!=='application/pdf'||file_get_contents($file['tmp_name'],false,null,0,5)!=='%PDF-')AjaxRequest::fail('Die Datei ist kein gültiges PDF.');
        require_once ABSPATH.'wp-admin/includes/file.php';
        require_once ABSPATH.'wp-admin/includes/media.php';
        require_once ABSPATH.'wp-admin/includes/image.php';
        $id=media_handle_upload('file',0,[],['test_form'=>false,'mimes'=>$mimes]);
        if(is_wp_error($id))AjaxRequest::fail('Das PDF konnte nicht hochgeladen werden. Bitte erneut versuchen.');
        if(!add_post_meta($id,'strc_public_document_page',$key,true)){wp_delete_attachment($id,true);AjaxRequest::fail('Das PDF konnte nicht zugeordnet werden.');}
        $title=self::title($_POST['title']??'');
        if($title!=='')wp_update_post(['ID'=>$id,'post_title'=>$title]);
        return ['id'=>$id,'title'=>get_the_title($id),'url'=>wp_get_attachment_url($id)];
    }

    /** Nur PDFs dieser Seite; das Dokument wird endgültig aus der Mediathek entfernt. */
    public static function delete(string $key, int $id): array
    {
        $file = get_post($id);
        if (! $file || 'attachment' !== $file->post_type || 'application/pdf' !== $file->post_mime_type || get_post_meta($id,'strc_public_document_page',true) !== $key) AjaxRequest::fail('Dokument nicht gefunden.',404);
        if (! wp_delete_attachment($id,true)) AjaxRequest::fail('Das PDF konnte nicht gelöscht werden. Bitte erneut versuchen.');
        return self::listing($key);
    }

    /** Lesbarer Titel, z. B. «Leitfaden für die Organisation von Veranstaltungen». */
    public static function rename(string $key, int $id, string $title): array
    {
        $file=get_post($id);$title=self::title($title);
        if(!$file||'attachment'!==$file->post_type||get_post_meta($id,'strc_public_document_page',true)!==$key)AjaxRequest::fail('Dokument nicht gefunden.',404);
        if($title==='')AjaxRequest::fail('Bitte einen Titel eingeben.');
        wp_update_post(['ID'=>$id,'post_title'=>$title]);
        return self::listing($key);
    }

    private static function title(mixed $value): string
    {
        $title=is_string($value)?trim(sanitize_text_field(wp_unslash($value))):'';
        if(mb_strlen($title)>160)AjaxRequest::fail('Der Titel ist zu lang (höchstens 160 Zeichen).');
        return $title;
    }
}

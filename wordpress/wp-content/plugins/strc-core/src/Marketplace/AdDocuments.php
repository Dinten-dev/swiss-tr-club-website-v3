<?php
declare(strict_types=1);
namespace SwissTRClub\Core\Marketplace;

/** PDFs never get a public Media Library URL. */
final class AdDocuments
{
    private static function directory(): string {return dirname(rtrim(ABSPATH,'/')).'/private/strc-ad-documents-'.substr(hash('sha256',home_url()),0,16);}
    public static function validate(string $name,string $tmp,int $error): void
    {
        $size=is_file($tmp)?filesize($tmp):0;
        if ($error!==UPLOAD_ERR_OK||!is_uploaded_file($tmp)||!$size||$size>10*1024*1024||strtolower(pathinfo($name,PATHINFO_EXTENSION))!=='pdf'||(new \finfo(FILEINFO_MIME_TYPE))->file($tmp)!=='application/pdf'||file_get_contents($tmp,false,null,0,5)!=='%PDF-') throw new \InvalidArgumentException('Bitte gültige PDF-Dateien bis 10 MB auswählen.');
    }
    public static function save(array $files,int $retainedCount=0): array|\WP_Error
    {
        if (!$files) return [];
        if (!isset($files['name'])||!is_array($files['name'])||count($files['name'])+$retainedCount>3) return new \WP_Error('pdf_count','Bitte höchstens drei PDFs auswählen.');
        $checked=[];
        try {
            foreach($files['name'] as $index=>$name){
                $tmp=$files['tmp_name'][$index]??null;$error=$files['error'][$index]??null;
                if(!is_string($name)||!is_string($tmp)||!is_int($error)) throw new \InvalidArgumentException('Ungültiger PDF-Upload.');
                if($error===UPLOAD_ERR_NO_FILE)continue;
                self::validate($name,$tmp,$error);
                $checked[]=['name'=>sanitize_file_name($name),'tmp'=>$tmp,'mime'=>'application/pdf','size'=>filesize($tmp),'key'=>bin2hex(random_bytes(20))];
            }
        }catch(\InvalidArgumentException $error){return new \WP_Error('pdf_invalid',$error->getMessage());}
        if(!$checked)return [];
        $directory=self::directory();if(!is_dir($directory)&&!wp_mkdir_p($directory))return new \WP_Error('pdf_storage','PDF-Speicher nicht verfügbar.');chmod($directory,0700);
        $saved=[];
        foreach($checked as $file){
            if(!move_uploaded_file($file['tmp'],$directory.'/'.$file['key'])){self::remove($saved);return new \WP_Error('pdf_storage','PDF konnte nicht gespeichert werden.');}
            chmod($directory.'/'.$file['key'],0600);unset($file['tmp']);$saved[]=$file;
        }
        return $saved;
    }
    public static function remove(array $files): void
    {
        foreach($files as $file)if(is_string($file['key']??null)&&preg_match('/^[a-f0-9]{40}$/D',$file['key'])) { $path=self::directory().'/'.$file['key'];if(is_file($path))unlink($path); }
    }
    public static function present(int $id): array
    {
        $files=get_post_meta($id,'strc_ad_documents',true);
        return array_map(static fn($file)=>['key'=>$file['key'],'name'=>$file['name'],'size'=>$file['size'],'url'=>add_query_arg(['action'=>'strc_marketplace','operation'=>'file','id'=>$id,'key'=>$file['key']],admin_url('admin-ajax.php'))],is_array($files)?$files:[]);
    }
    public static function download(int $id,string $key): never
    {
        $post=get_post($id);$allowed=current_user_can('strc_access_member_area')&&$post&&$post->post_type==='strc_ad'&&(
            (int)$post->post_author===get_current_user_id()||\SwissTRClub\Core\Editorial\EditorialAccess::area('market')||($post->post_status==='publish'&&get_post_meta($id,'strc_ad_public_approved',true)==='1'&&(int)get_post_meta($id,'strc_ad_expires_at',true)>time()&&!get_post_meta($id,'strc_ad_sold',true)));
        if(!$allowed)wp_send_json_error(['message'=>'Kein Zugriff auf dieses PDF.'],403);
        $files=get_post_meta($id,'strc_ad_documents',true);$file=null;
        foreach(is_array($files)?$files:[] as $candidate)if(hash_equals($candidate['key'],$key))$file=$candidate;
        if(!$file||!preg_match('/^[a-f0-9]{40}$/D',$key)||!is_file(self::directory().'/'.$key))wp_send_json_error(['message'=>'PDF nicht gefunden.'],404);
        nocache_headers();header('Cache-Control: private, no-store');header('X-Content-Type-Options: nosniff');header('Content-Type: application/pdf');header('Content-Disposition: attachment; filename="'.sanitize_file_name($file['name']).'"');header('Content-Length: '.filesize(self::directory().'/'.$key));readfile(self::directory().'/'.$key);exit;
    }
}

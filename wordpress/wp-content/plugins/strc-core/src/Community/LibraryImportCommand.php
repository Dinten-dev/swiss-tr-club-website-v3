<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Community;

/** Idempotent WP-CLI importer for the reviewed, metadata-only archive manifest. */
final class LibraryImportCommand
{
    public static function register(): void
    {
        \WP_CLI::add_command('strc-library-import', [self::class, 'run']);
    }

    /** @param array<int,string> $args @param array<string,mixed> $options */
    public static function run(array $args,array $options): void
    {
        if(!defined('WP_CLI')||!WP_CLI)\WP_CLI::error('Dieser Import ist nur über WP-CLI verfügbar.');
        if(!class_exists(\ZipArchive::class))\WP_CLI::error('PHP ZipArchive ist nicht installiert.');
        if(count($args)!==2)\WP_CLI::error('Aufruf: wp strc-library-import MANIFEST.json ARCHIV_ORDNER --author=ID [--publish]');
        $manifestPath=realpath($args[0]);$archiveDirectory=realpath($args[1]);$authorId=absint($options['author']??0);
        if(!$manifestPath||!is_file($manifestPath)||!$archiveDirectory||!is_dir($archiveDirectory))\WP_CLI::error('Manifest oder Archivordner wurde nicht gefunden.');
        if(!$authorId||(!user_can($authorId,'strc_manage_library')&&!user_can($authorId,'manage_options')))\WP_CLI::error('Die angegebene Person braucht Bibliotheksverwaltung.');
        $manifest=json_decode((string)file_get_contents($manifestPath),true);
        if(!is_array($manifest)||($manifest['schemaVersion']??null)!==1||!is_array($manifest['records']??null))\WP_CLI::error('Das Bibliotheksmanifest ist ungültig.');
        $publish=!empty($options['publish']);$dryRun=!$publish&&!isset($options['import']);$archives=[];$created=0;$updated=0;$skipped=0;$filesImported=0;
        foreach($manifest['records'] as $record){
            if(!is_array($record)||empty($record['sourceKey'])||empty($record['title'])||empty($record['files'])||!is_array($record['files']))\WP_CLI::error('Ein Bibliothekseintrag im Manifest ist unvollständig.');
            $classification=$record['classification']??[];
            if(empty($record['reviewed'])){$skipped++;continue;}
            if(!is_array($classification))\WP_CLI::error('Metadaten sind ungültig: '.(string)$record['title']);
            $category=LibraryPolicy::type((string)($classification['documentType']??''));
            if($category==='legacy'||!in_array($classification['access']??'',LibraryPolicy::classesForImport(),true))\WP_CLI::error('Ungültige Kategorie oder Zugriffsklasse: '.(string)$record['title']);
            $sources=[];
            foreach($record['files'] as $entry){
                $archiveName=(string)($entry['archive']??'');$member=(string)($entry['path']??'');
                if($archiveName===''||basename($archiveName)!==$archiveName||$member===''||!str_ends_with(strtolower((string)($entry['name']??'')),'.pdf'))\WP_CLI::error('Ungültiger PDF-Verweis im Manifest.');
                $path=$archiveDirectory.DIRECTORY_SEPARATOR.$archiveName;
                if(!isset($archives[$path])){
                    $zip=new \ZipArchive();
                    if($zip->open($path)!==true)\WP_CLI::error('Archiv konnte nicht geöffnet werden: '.$archiveName);
                    $archives[$path]=$zip;
                }
                $zip=$archives[$path];$stat=$zip->statName($member);
                if(!is_array($stat)||(int)$stat['size']!==(int)$entry['size']||sprintf('%08x',(int)$stat['crc'])!==strtolower((string)$entry['crc32']))\WP_CLI::error('Archivinhalt weicht vom Manifest ab: '.$archiveName.' · '.(string)$entry['name']);
                $sources[]=$entry;
            }
            $existing=get_posts(['post_type'=>'strc_document','post_status'=>['publish','pending','draft','private','trash'],'posts_per_page'=>1,'fields'=>'ids','meta_key'=>'strc_library_import_key','meta_value'=>(string)$record['sourceKey']]);
            $postId=(int)($existing[0]??0);$storedFiles=$postId?get_post_meta($postId,'strc_private_files',true):[];$oldFiles=is_array($storedFiles)?$storedFiles:[];
            if($postId&&get_post_status($postId)==='trash'){$skipped++;continue;}
            if($postId){$ranks=['open'=>0,'limited'=>1,'restricted'=>2];$oldClass=LibraryPolicy::classification($postId);if(($ranks[$oldClass]??2)>($ranks[$classification['access']]??0))$classification['access']=$oldClass;}
            $replace=$postId&&!self::sameFiles($oldFiles,$sources);
            if($dryRun){
                if(!$postId){$created++;$filesImported+=count($sources);}elseif($replace){$updated++;$filesImported+=count($sources);}else{$skipped++;}
                continue;
            }
            if($postId&&!$replace){
                // Repeat imports preserve manual titles, classification and publication decisions.
                $skipped++;
                continue;
            }
            if($postId){$stored=get_post_meta($postId,'strc_form_classification',true);if(is_array($stored))$classification=$stored;}
            $newFiles=[];
            foreach($sources as $entry){
                $zipPath=$archiveDirectory.DIRECTORY_SEPARATOR.$entry['archive'];$stream=$archives[$zipPath]->getStream((string)$entry['path']);
                if(!$stream){(new PrivateUploadStore())->remove($newFiles);\WP_CLI::error('PDF konnte nicht aus dem Archiv gelesen werden: '.(string)$entry['name']);}
                $stored=(new PrivateUploadStore())->importPdfStream($stream,(string)$entry['name'],(int)$entry['size'],strtolower((string)$entry['crc32']));
                fclose($stream);
                if(is_wp_error($stored)){(new PrivateUploadStore())->remove($newFiles);\WP_CLI::error($stored->get_error_message().' · '.(string)$entry['name']);}
                $stored['sourceArchive']=$entry['archive'];$stored['sourcePath']=$entry['path'];$stored['sourceCrc32']=$entry['crc32'];$newFiles[]=$stored;
            }
            $status=$postId?get_post_status($postId):($publish?'publish':'draft');
            if($postId){
                $result=wp_update_post(['ID'=>$postId,'post_status'=>$status],true);
            }else{
                $postIdResult=wp_insert_post(wp_slash(['post_type'=>'strc_document','post_status'=>'draft','post_title'=>sanitize_text_field((string)$record['title']),'post_content'=>wp_kses_post((string)($record['description']??'')),'post_author'=>$authorId,'comment_status'=>'closed']),true);
                $result=$postIdResult;
                if(!is_wp_error($result))$postId=(int)$result;
            }
            if(is_wp_error($result)){
                (new PrivateUploadStore())->remove($newFiles);
                \WP_CLI::error('Bibliothekseintrag konnte nicht gespeichert werden: '.(string)$record['title']);
            }
            update_post_meta($postId,'strc_private_files',$newFiles);
            self::saveMetadata($postId,$record,$classification,$newFiles,!$existing&&$publish);
            (new PrivateUploadStore())->remove($oldFiles);
            if($postId&&!$existing&&!$publish)wp_update_post(['ID'=>$postId,'post_status'=>'draft']);
            if($existing)$updated++;else$created++;
            $filesImported+=count($newFiles);
        }
        foreach($archives as $zip)$zip->close();
        \WP_CLI::success(($dryRun?'Vorschau':'Import abgeschlossen').': '.$created.' neue, '.$updated.' aktualisierte, '.$skipped.' unveränderte Einträge; '.$filesImported.' PDFs.'.($dryRun?' Keine Daten geändert.':''));
    }

    private static function sameFiles(array $stored,array $sources): bool
    {
        if(count($stored)!==count($sources))return false;
        $existing=[];$incoming=[];
        foreach($stored as $file)$existing[]=implode('|',[(string)($file['name']??''),(string)($file['sourceArchive']??''),(string)($file['sourcePath']??''),(string)($file['sourceCrc32']??''),(string)($file['size']??'')]);
        foreach($sources as $file)$incoming[]=implode('|',[(string)$file['name'],(string)$file['archive'],(string)$file['path'],(string)$file['crc32'],(string)$file['size']]);
        sort($existing);sort($incoming);
        return $existing===$incoming;
    }

    private static function saveMetadata(int $postId,array $record,array $classification,array $files,bool $published): void
    {
        update_post_meta($postId,'strc_form_classification',$classification);
        update_post_meta($postId,'strc_private_files',$files);
        update_post_meta($postId,'strc_library_import_key',(string)$record['sourceKey']);
        update_post_meta($postId,'strc_library_imported_at',gmdate(DATE_ATOM));
        LibraryPolicy::index($postId,$classification,(string)$record['title'],(string)($record['description']??''),$files);
        if($published&&get_post_status($postId)!=='publish'){
            $result=wp_update_post(['ID'=>$postId,'post_status'=>'publish'],true);
            if(is_wp_error($result))\WP_CLI::error('Bibliothekseintrag konnte nicht veröffentlicht werden: '.(string)$record['title']);
        }
    }
}

<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Community;

use WP_Error;

final class PrivateUploadStore
{
    private function directory(): string
    {
        // Outside the document root: files are streamed only after membership checks.
        return dirname(rtrim(ABSPATH, '/')) . '/private/strc-community-' . substr(hash('sha256', home_url()), 0, 16);
    }

    /** @return array<int,array<string,mixed>>|WP_Error */
    public function save(array $files, bool $imagesOnly, bool $library = false, int $maxFiles = 6, int $minImageBytes = 0, int $maxImageBytes = 20971520, int $maxPdfBytes = 104857600, bool $office = false): array|WP_Error
    {
        if (! $files) {
            return array();
        }
        if (! isset($files['name'], $files['tmp_name'], $files['error'], $files['size']) || ! is_array($files['name']) || count($files['name']) > $maxFiles) {
            return new WP_Error('files', $imagesOnly && $maxFiles === 20 ? 'Bitte höchstens 20 Galeriebilder auswählen.' : 'Bitte höchstens sechs Dateien auswählen.');
        }
        $checked = array(); $total = 0;
        foreach ($files['name'] as $index => $name) {
            $tmp = $files['tmp_name'][$index] ?? null;
            $error = $files['error'][$index] ?? null;
            if (UPLOAD_ERR_NO_FILE === $error) {
                continue;
            }
            if (! is_string($name) || ! is_string($tmp) || UPLOAD_ERR_OK !== $error || ! is_uploaded_file($tmp)) {
                return new WP_Error('upload', 'Datei konnte nicht hochgeladen werden. Bitte Dateigrösse prüfen.');
            }
            $size = filesize($tmp);
            if (false === $size || $size < 1 || $size > ($library ? $maxPdfBytes : 20 * 1024 * 1024)) {
                return new WP_Error('size', 'Bilder dürfen höchstens 20 MB, Bibliotheks-PDFs höchstens 100 MB gross sein.');
            }
            $mime = (new \finfo(FILEINFO_MIME_TYPE))->file($tmp);
            $allowed = array('image/jpeg' => array('jpg', 'jpeg'), 'image/png' => array('png'), 'image/webp' => array('webp'));
            if (! $imagesOnly) {
                $allowed['application/pdf'] = array('pdf');
            }
            // Vorstandsunterlagen: Office-Dokumente im neuen Format, ohne Makros (Wunsch Redaktion 2.11.2026).
            $extension = strtolower(pathinfo($name, PATHINFO_EXTENSION));
            if ($office && isset(self::OFFICE[$extension])) {
                if (! self::validOffice($tmp, $extension)) {
                    return new WP_Error('office', 'Das Office-Dokument ist ungültig oder enthält Makros. Bitte als .docx, .xlsx oder .pptx ohne Makros speichern.');
                }
                $mime = self::OFFICE[$extension];
                $allowed[$mime] = array($extension);
            }
            $total += $size;
            if ($total > 120 * 1024 * 1024 || (str_starts_with((string)$mime,'image/') && $size > 20 * 1024 * 1024)) return new WP_Error('size','Bilder: maximal 20 MB; alle Dateien zusammen: maximal 120 MB.');
            if (! isset($allowed[$mime]) || ! in_array($extension, $allowed[$mime], true)) {
                return new WP_Error('type', $imagesOnly ? 'Nur JPG, PNG oder WebP sind erlaubt.' : ($office ? 'Nur PDF, Word (.docx), Excel (.xlsx), PowerPoint (.pptx), JPG, PNG oder WebP sind erlaubt.' : 'Nur JPG, PNG, WebP oder PDF sind erlaubt.'));
            }
            if ($imagesOnly && ($size < $minImageBytes || $size > $maxImageBytes)) {
                return new WP_Error('size', sprintf('Jedes Galeriebild muss zwischen %s und %s MB gross sein (Originalfoto, nicht aus WhatsApp).', number_format_i18n($minImageBytes/1000000,0), number_format_i18n($maxImageBytes/1048576,0)));
            }
            if (str_starts_with($mime, 'image/')) {
                $dimensions = @getimagesize($tmp);
                if (! $dimensions || ($dimensions['mime'] ?? '') !== $mime || $dimensions[0] * $dimensions[1] > 40000000) {
                    return new WP_Error('image', 'Bild ist ungültig oder überschreitet 40 Megapixel.');
                }
                if (! self::completeImage($tmp, $mime, (int) $size)) {
                    return new WP_Error('image', 'Das Bild ist unvollständig übertragen oder beschädigt. Bitte erneut hochladen, wenn möglich über WLAN.');
                }
            } elseif ($mime === 'application/pdf' && file_get_contents($tmp, false, null, 0, 5) !== '%PDF-') {
                return new WP_Error('pdf', 'Die PDF-Datei ist ungültig.');
            }
            $checked[] = array('tmp' => $tmp, 'name' => sanitize_file_name($name), 'mime' => $mime, 'size' => $size, 'key' => bin2hex(random_bytes(20)));
        }
        if (! $checked) {
            return array();
        }
        $directory = $this->directory();
        if (! is_dir($directory) && ! wp_mkdir_p($directory)) {
            return new WP_Error('storage', 'Der geschützte Uploadspeicher ist noch nicht verfügbar.');
        }
        chmod($directory, 0700);
        $saved = array();
        foreach ($checked as $file) {
            $destination = $directory . '/' . $file['key'];
            if (! move_uploaded_file($file['tmp'], $destination)) {
                $this->remove($saved);
                return new WP_Error('storage', 'Datei konnte nicht gespeichert werden. Bitte erneut versuchen.');
            }
            chmod($destination, 0600);
            unset($file['tmp']);
            $saved[] = $file;
        }
        return $saved;
    }

    /** Erkennt abgebrochene Übertragungen: Ein vollständiges Bild endet mit der Schlussmarke seines Formats. */
    public const OFFICE = array(
        'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'xlsx' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'pptx' => 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    );
    private const OFFICE_PARTS = array('docx' => 'word/document.xml', 'xlsx' => 'xl/workbook.xml', 'pptx' => 'ppt/presentation.xml');

    /** Echtes Office-Open-XML-Paket des erwarteten Typs (ZIP mit Hauptteil), ohne Makroprojekt. */
    public static function validOffice(string $path, string $extension): bool
    {
        if (! isset(self::OFFICE_PARTS[$extension]) || file_get_contents($path, false, null, 0, 4) !== "PK\x03\x04") {
            return false;
        }
        $detected = (string) (new \finfo(FILEINFO_MIME_TYPE))->file($path);
        if (! in_array($detected, array(self::OFFICE[$extension], 'application/zip', 'application/octet-stream'), true)) {
            return false;
        }
        if (! class_exists('ZipArchive')) {
            $content = (string) file_get_contents($path);
            return str_contains($content, '[Content_Types].xml') && str_contains($content, self::OFFICE_PARTS[$extension]) && ! str_contains($content, 'vbaProject.bin');
        }
        $zip = new \ZipArchive();
        if ($zip->open($path, \ZipArchive::RDONLY) !== true) {
            return false;
        }
        $valid = $zip->locateName('[Content_Types].xml') !== false && $zip->locateName(self::OFFICE_PARTS[$extension]) !== false;
        for ($index = 0; $valid && $index < $zip->numFiles; $index++) {
            $entry = (string) $zip->getNameIndex($index);
            if (str_contains(strtolower($entry), 'vbaproject') || str_starts_with($entry, '/') || str_contains($entry, '..')) {
                $valid = false;
            }
        }
        $types = $valid ? (string) $zip->getFromName('[Content_Types].xml') : '';
        $zip->close();
        return $valid && ! str_contains(strtolower($types), 'macroenabled');
    }

    public static function completeImage(string $path, string $mime, int $size): bool
    {
        if($size<16)return false;
        $handle = @fopen($path, 'rb');
        if (! $handle) return false;
        $head = (string) fread($handle, 12);
        fseek($handle, max(0, $size - 4096));
        $tail = (string) fread($handle, 4096);
        fclose($handle);
        return match ($mime) {
            // JPEG: Endmarke FF D9; manche Kameras hängen danach noch Füllbytes an.
            'image/jpeg' => str_contains($tail, "\xFF\xD9"),
            'image/png' => str_contains($tail, "IEND\xAE\x42\x60\x82"),
            // WebP: Die RIFF-Längenangabe muss zur Dateigrösse passen (plus 8 Byte Kopf, ggf. ein Füllbyte).
            'image/webp' => str_starts_with($head, 'RIFF') && in_array($size - (unpack('V', substr($head, 4, 4))[1] ?? -1) - 8, [0, 1], true),
            default => true,
        };
    }

    /** Eigenständige Kopie einer gespeicherten Datei (z. B. Fahrzeugbild als Porträtbild). */
    public function duplicate(array $file): array|WP_Error
    {
        $key=$file['key']??'';if(!is_string($key)||!preg_match('/^[a-f0-9]{40}$/D',$key))return new WP_Error('image','Bild nicht gefunden.');
        $source=$this->directory().'/'.$key;$mime=(string)($file['mime']??'image/jpeg');if(!is_file($source)||is_link($source)){$web=get_option('strc_web_image_'.$key);$source=is_array($web)?$this->directory().'/'.$web['key']:'';$mime='image/jpeg';}
        if($source===''||!is_file($source))return new WP_Error('image','Fahrzeugbild nicht mehr verfügbar.');
        $copyKey=bin2hex(random_bytes(20));$destination=$this->directory().'/'.$copyKey;
        if(!copy($source,$destination))return new WP_Error('storage','Bild konnte nicht übernommen werden.');
        chmod($destination,0600);
        return [['key'=>$copyKey,'name'=>sanitize_file_name((string)($file['name']??'fahrzeug.jpg')),'mime'=>$mime,'size'=>(int)filesize($destination)]];
    }

    public function remove(array $files): void
    {
        foreach ($files as $file) {
            $key = $file['key'] ?? '';
            if (is_string($key) && preg_match('/^[a-f0-9]{40}$/', $key)) {
                $copy=get_option('strc_web_image_'.$key);if(is_array($copy)&&isset($copy['key'])){delete_option('strc_web_image_'.$key);$this->remove([$copy]);}
                $path = $this->directory() . '/' . $key;
                if (is_file($path)) {
                    unlink($path);
                }
            }
        }
    }

    /** Store one verified archive member from the protected library importer. */
    public function importPdfStream(mixed $input,string $name,int $expectedSize,string $expectedCrc32): array|WP_Error
    {
        if(!defined('WP_CLI')||!WP_CLI||!is_resource($input))return new WP_Error('import','Der Bibliotheksimport ist nur über WP-CLI verfügbar.');
        if($expectedSize<1||$expectedSize>100*1024*1024)return new WP_Error('size','Bibliotheks-PDFs dürfen höchstens 100 MB gross sein.');
        $header=fread($input,5);
        if($header!=='%PDF-')return new WP_Error('pdf','Die Archivdatei ist kein gültiges PDF.');
        $directory=$this->directory();
        if(!is_dir($directory)&&!wp_mkdir_p($directory))return new WP_Error('storage','Der geschützte Bibliotheksspeicher ist nicht verfügbar.');
        chmod($directory,0700);
        $key=bin2hex(random_bytes(20));
        $destination=$directory.'/'.$key;
        $output=fopen($destination,'xb');
        if(!$output)return new WP_Error('storage','PDF konnte nicht gespeichert werden.');
        chmod($destination,0600);
        $hash=hash_init('crc32b');$copied=fwrite($output,$header);
        if($copied!==strlen($header)){fclose($output);@unlink($destination);return new WP_Error('storage','PDF konnte nicht vollständig gespeichert werden.');}
        hash_update($hash,$header);
        while(!feof($input)){
            $chunk=fread($input,1024*1024);
            if($chunk===false||$chunk==='')break;
            $copied+=strlen($chunk);
            if($copied>$expectedSize||fwrite($output,$chunk)!==strlen($chunk))break;
            hash_update($hash,$chunk);
        }
        fclose($output);
        if($copied!==$expectedSize||hash_final($hash)!==strtolower($expectedCrc32)){@unlink($destination);return new WP_Error('size','PDF-Grösse oder Prüfsumme stimmt nicht mit dem Archiv überein.');}
        return ['key'=>$key,'name'=>sanitize_file_name($name),'mime'=>'application/pdf','size'=>$copied];
    }

    /** Independent gallery rendition; original bytes are never rewritten. */
    public function webCopy(array $original): array|WP_Error
    {
        $key=$original['key']??'';
        if(!is_string($key)||!preg_match('/^[a-f0-9]{40}$/D',$key))return new WP_Error('image','Bild nicht gefunden.');
        return \SwissTRClub\Core\Forms\FormStore::locked('gallery-copy-'.$key,function()use($key,$original){
            $saved=get_option('strc_web_image_'.$key);
            if(is_array($saved)&&is_file($this->directory().'/'.$saved['key'])&&filesize($this->directory().'/'.$saved['key'])<=2000000)return $saved;
            $source=$this->directory().'/'.$key;if(!is_file($source)&&is_array($saved)&&is_file($this->directory().'/'.$saved['key']))$source=$this->directory().'/'.$saved['key'];
            if(!is_file($source)||is_link($source))return new WP_Error('image','Originalbild nicht verfügbar.');
            $editor=wp_get_image_editor($source);
            if(is_wp_error($editor))return new WP_Error('image','Bildansicht konnte nicht erstellt werden.');
            $dimensions=$editor->get_size();
            if($dimensions["width"]>1920||$dimensions["height"]>1920){$result=$editor->resize(1920,1920,false);if(is_wp_error($result))return $result;}
            $copyKey=bin2hex(random_bytes(20));$destination=$this->directory().'/'.$copyKey;
            for($quality=85;$quality>=35;$quality-=10){
                $editor->set_quality($quality);
                $result=$editor->save($destination,'image/jpeg');
                if(is_wp_error($result))return $result;
                // Some WP editors append the image extension to a key-only path.
                $actual=$result['path'];
                clearstatcache(true,$actual);
                if(filesize($actual)<=2000000)break; // Galerie- und Downloadgrösse höchstens 2 MB
            }
            for($edge=1600;filesize($actual)>2000000&&$edge>=400;$edge-=200){
                $resized=$editor->resize($edge,$edge,false);if(is_wp_error($resized)){@unlink($actual);return $resized;}
                $result=$editor->save($destination,'image/jpeg');if(is_wp_error($result)){@unlink($actual);return $result;}$actual=$result['path'];clearstatcache(true,$actual);
            }
            if(filesize($actual)>2000000){@unlink($actual);return new WP_Error('image','Bildansicht überschreitet 2 MB.');}
            if($actual!==$destination&&!rename($actual,$destination)){@unlink($actual);return new WP_Error('image','Bildansicht konnte nicht gespeichert werden.');}
            chmod($destination,0600);
            $copy=['key'=>$copyKey,'name'=>pathinfo($original['name'],PATHINFO_FILENAME).'.jpg','mime'=>'image/jpeg','size'=>filesize($destination)];
            if(!update_option('strc_web_image_'.$key,$copy,false)){@unlink($destination);return new WP_Error('image','Bildansicht konnte nicht gespeichert werden.');}
            return $copy;
        });
    }

    public function expireOriginal(array $file): bool
    {
        $copy=get_option('strc_web_image_'.($file['key']??''));
        if(!is_array($copy)||!is_file($this->directory().'/'.$copy['key']))return false;
        if(!preg_match('/^[a-f0-9]{40}$/D',$file['key']??''))return false;
        $path=$this->directory().'/'.$file['key'];
        return !is_file($path)||(!is_link($path)&&unlink($path));
    }

    public function stream(array $file): never
    {
        $key = $file['key'] ?? '';
        if (! is_string($key) || ! preg_match('/^[a-f0-9]{40}$/', $key)) {
            \SwissTRClub\Core\Http\AjaxRequest::fail('Datei nicht gefunden.', 404);
        }
        $path = $this->directory() . '/' . $key;
        if (! is_file($path) || is_link($path)) {
            \SwissTRClub\Core\Http\AjaxRequest::fail('Datei nicht gefunden.', 404);
        }
        $image = str_starts_with($file['mime'], 'image/');
        $pdf = ($file['mime']??'')==='application/pdf';
        $office = in_array($file['mime'] ?? '', self::OFFICE, true);
        header('Content-Type: ' . ($image ? $file['mime'] : ($pdf ? 'application/pdf' : ($office ? $file['mime'] : 'application/octet-stream'))));
        $length=(int)filesize($path);
        header('Accept-Ranges: bytes');
        header('Content-Disposition: ' . ($image||$pdf ? 'inline' : 'attachment') . '; filename="' . sanitize_file_name($file['name']) . '"');
        header('X-Content-Type-Options: nosniff');
        header("Content-Security-Policy: default-src 'none'; sandbox");
        header('Cache-Control: private, no-store, max-age=0');
        $range=$_SERVER['HTTP_RANGE']??'';
        if($range!==''){
            if(!preg_match('/^bytes=(\d*)-(\d*)$/D',$range,$match)||($match[1]===''&&$match[2]==='')){status_header(416);header('Content-Range: bytes */'.$length);exit;}
            $start=$match[1]!==''?(int)$match[1]:max(0,$length-(int)$match[2]);
            $end=$match[1]!==''&&$match[2]!==''?min($length-1,(int)$match[2]):$length-1;
            if($start>$end||$start>=$length){status_header(416);header('Content-Range: bytes */'.$length);exit;}
            status_header(206);header('Content-Range: bytes '.$start.'-'.$end.'/'.$length);header('Content-Length: '.($end-$start+1));
            $input=fopen($path,'rb');fseek($input,$start);$remaining=$end-$start+1;
            while($remaining>0&&!feof($input)){ $chunk=fread($input,min(65536,$remaining));if($chunk===false||$chunk==='')break;echo $chunk;$remaining-=strlen($chunk); }fclose($input);
        }else{header('Content-Length: '.$length);readfile($path);}
        exit;
    }
}

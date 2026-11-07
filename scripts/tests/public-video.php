<?php
// Video in «Momente aus dem Clubleben» (Wunsch Redaktion 7.11.2026): nur echte MP4-Dateien.
declare(strict_types=1);
namespace SwissTRClub\Core\Http { final class AjaxRequest { public static function fail(string $m,int $s=400): never { throw new \RuntimeException($m); } } }
namespace {
require dirname(__DIR__,2).'/wordpress/wp-content/plugins/strc-core/src/Editorial/PublicVideoUpload.php';
use SwissTRClub\Core\Editorial\PublicVideoUpload;
$passed=[];$failed=[];
function check(bool $ok,string $label):void{global $passed,$failed;if($ok)$passed[]=$label;else $failed[]=$label;}
$dir=sys_get_temp_dir().'/strc-video-'.bin2hex(random_bytes(4));mkdir($dir);
file_put_contents("$dir/a.mp4","\0\0\0\x18ftypmp42\0\0\0\0isommp42");
file_put_contents("$dir/b.mp4","%PDF-1.7 not a video");
file_put_contents("$dir/c.mp4","\0\0");
check(PublicVideoUpload::isMp4("$dir/a.mp4",'Weekend.mp4'),'MP4 container accepted');
check(PublicVideoUpload::isMp4("$dir/a.mp4",'clip.M4V'),'M4V extension accepted');
check(!PublicVideoUpload::isMp4("$dir/b.mp4",'fake.mp4'),'Non-video renamed to .mp4 rejected');
check(!PublicVideoUpload::isMp4("$dir/c.mp4",'short.mp4'),'Truncated file rejected');
check(!PublicVideoUpload::isMp4("$dir/a.mp4",'clip.mov'),'Other video formats rejected');
check(!PublicVideoUpload::isMp4("$dir/a.mp4",'clip.mp4.php'),'Double extension rejected');
$schema=json_decode((string)file_get_contents(dirname(__DIR__,2).'/wordpress/wp-content/plugins/strc-core/src/Editorial/site-content.json'),true);
$types=array_column($schema['home']['fields'],'type','key');
check(($types['wallVideo']??'')==='video'&&($types['wallVideoPoster']??'')==='image'&&($types['wallVideoTitle']??'')==='text','Homepage offers video, poster and title fields');
$video=0;foreach($schema as $key=>$doc)foreach($doc['fields']??[] as $f)if($f['type']==='video')$video++;
check($video===1,'Video upload is limited to the homepage photo wall');
array_map('unlink',glob("$dir/*"));rmdir($dir);
echo json_encode(['passed'=>count($passed),'failed'=>$failed,'checks'=>$passed],JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE),"\n";
exit($failed?1:0);
}

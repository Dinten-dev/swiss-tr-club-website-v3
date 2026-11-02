<?php
// Office-Dokumente in den Vorstandsunterlagen (Wunsch Redaktion 2.11.2026): nur echte .docx/.xlsx/.pptx ohne Makros.
declare(strict_types=1);
require dirname(__DIR__,2).'/wordpress/wp-content/plugins/strc-core/src/Community/PrivateUploadStore.php';
use SwissTRClub\Core\Community\PrivateUploadStore;
$passed=[];$failed=[];
function check(bool $ok,string $label):void{global $passed,$failed;if($ok)$passed[]=$label;else $failed[]=$label;}
$dir=sys_get_temp_dir().'/strc-office-'.bin2hex(random_bytes(4));mkdir($dir);
function package(string $path,array $entries,string $types='<Types/>'):string{$zip=new ZipArchive();$zip->open($path,ZipArchive::CREATE|ZipArchive::OVERWRITE);$zip->addFromString('[Content_Types].xml',$types);foreach($entries as $name)$zip->addFromString($name,'<x/>');$zip->close();return $path;}
check(PrivateUploadStore::validOffice(package("$dir/a.docx",['word/document.xml']),'docx'),'Word document accepted');
check(PrivateUploadStore::validOffice(package("$dir/b.xlsx",['xl/workbook.xml']),'xlsx'),'Excel workbook accepted');
check(PrivateUploadStore::validOffice(package("$dir/c.pptx",['ppt/presentation.xml']),'pptx'),'PowerPoint presentation accepted');
check(!PrivateUploadStore::validOffice(package("$dir/d.docx",['xl/workbook.xml']),'docx'),'Workbook renamed to .docx rejected');
check(!PrivateUploadStore::validOffice(package("$dir/e.xlsx",['xl/workbook.xml','xl/vbaProject.bin']),'xlsx'),'Workbook with macro project rejected');
check(!PrivateUploadStore::validOffice(package("$dir/f.docx",['word/document.xml'],'<Types><Override ContentType="application/vnd.ms-word.document.macroEnabled.main+xml"/></Types>'),'docx'),'Macro-enabled content type rejected');
file_put_contents("$dir/g.docx",'%PDF-1.7 not office');check(!PrivateUploadStore::validOffice("$dir/g.docx",'docx'),'Non-ZIP file with Office extension rejected');
check(!PrivateUploadStore::validOffice(package("$dir/h.doc",['word/document.xml']),'doc'),'Legacy .doc extension rejected');
check(count(PrivateUploadStore::OFFICE)===3,'Only the three new Office formats are allowed');
array_map('unlink',glob("$dir/*"));rmdir($dir);
echo json_encode(['passed'=>count($passed),'failed'=>$failed,'checks'=>$passed],JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE),"\n";
exit($failed?1:0);

<?php
/** Isolated checks for editorial mail templates and the delivery log. No WordPress, mail or club data. */
declare(strict_types=1);
namespace { if(defined('ABSPATH'))throw new \RuntimeException('Run without WordPress.'); }
namespace SwissTRClub\Core\Http {
 final class AjaxRequest {public static function read(string $a,array $w):array{return [$GLOBALS['operation'],$GLOBALS['input']];} public static function fail(string $message,int $code=400):never{throw new \RuntimeException($message,$code);}}
}
namespace {
 const DAY_IN_SECONDS=86400;const HOUR_IN_SECONDS=3600;
 $options=[];$checks=[];$caps=[];
 function get_option(string $key,mixed $default=false):mixed{return $GLOBALS['options'][$key]??$default;}
 function update_option(string $key,mixed $value,mixed ...$args):bool{$GLOBALS['options'][$key]=$value;return true;}
 function delete_option(string $key):bool{unset($GLOBALS['options'][$key]);return true;}
 function wp_strip_all_tags(string $text):string{return strip_tags($text);}
 function sanitize_text_field(string $text):string{return trim(preg_replace('/[\r\n\t]+/',' ',strip_tags($text)));}
 function sanitize_textarea_field(string $text):string{return trim(strip_tags($text));}
 function sanitize_email(string $email):string{return filter_var($email,FILTER_VALIDATE_EMAIL)?$email:'';}
 function home_url(string $path=''):string{return 'https://qa.invalid'.$path;}
 function content_url(string $path=''):string{return 'https://qa.invalid/wp-content'.$path;}
 function esc_html(string $text):string{return htmlspecialchars($text,ENT_QUOTES,'UTF-8');}
 function esc_url(string $url):string{return htmlspecialchars($url,ENT_QUOTES,'UTF-8');}
 function add_filter(...$args):bool{return true;} function add_action(...$args):bool{return true;}
 function current_user_can(string $cap):bool{return !empty($GLOBALS['caps'][$cap]);}
 function check(bool $result,string $label):void{if(!$result)throw new RuntimeException('FAILED: '.$label);$GLOBALS['checks'][]=$label;}
 function rejects(callable $run,string $label,int $code=0):void{try{$run();}catch(RuntimeException|InvalidArgumentException $error){check(!$code||$error->getCode()===$code,$label);return;}throw new RuntimeException('FAILED (accepted): '.$label);}
 $base=dirname(__DIR__,2).'/wordpress/wp-content/plugins/strc-core/src/';
 foreach(['Mail/WelcomeMailSettings.php','Mail/MailLog.php','Mail/MailTemplates.php','Mail/MailTemplatesEndpoint.php','Mail/MailLayout.php'] as $file)require $base.$file;
 use SwissTRClub\Core\Mail\{MailTemplates,MailLog,MailTemplatesEndpoint,MailLayout};

 $mail=MailTemplates::render('market.online','de',['vorname'=>'Monika','titel'=>'TR6 <b>Hardtop</b>','link'=>'https://qa.invalid/#marktplatz/meine/7']);
 check($mail['subject']==='Swiss TR-Club: Dein Inserat ist online'&&str_contains($mail['body'],'Hallo Monika')&&str_contains($mail['body'],'«TR6 Hardtop»')&&str_contains($mail['body'],'#marktplatz/meine/7'),'Default template renders with values and strips markup');
 check(!str_contains(MailTemplates::render('event.confirmed','fr',['anlass'=>'Jura'])['body'],'{{'),'Missing values leave no placeholders behind');
 $options[MailTemplates::OPTION]=['market.online'=>['de'=>['subject'=>'Online: {{titel}}','heading'=>'','body'=>"Hoi {{vorname}}\n{{link}}"],'fr'=>['subject'=>'','heading'=>'','body'=>'']]];
 $mail=MailTemplates::render('market.online','de',['vorname'=>'Monika','titel'=>'TR6','link'=>'L']);check($mail['subject']==='Online: TR6'&&$mail['body']==="Hoi Monika\nL",'Customized German template overrides default');
 check(MailTemplates::render('market.online','fr',['titel'=>'TR6'])['subject']==='Swiss TR-Club : ton annonce est en ligne','Empty French field falls back to default');
 check(MailTemplates::render('shop.woo_processing','de',[])['subject']==='','WooCommerce templates default to WooCommerce text');

 $endpoint=new MailTemplatesEndpoint();$values=new ReflectionMethod($endpoint,'values');$entry=MailTemplates::registry()['market.online'];
 $ok=['de'=>['subject'=>'S','heading'=>'','body'=>'{{link}}'],'fr'=>['subject'=>'S','heading'=>'','body'=>'{{link}}']];
 check($values->invoke($endpoint,['values'=>json_encode($ok)],$entry)['de']['body']==='{{link}}','Valid template accepted');
 $bad=$ok;$bad['fr']['body']='ohne Link';rejects(fn()=>$values->invoke($endpoint,['values'=>json_encode($bad)],$entry),'Required placeholder enforced per language');
 $bad=$ok;$bad['de']['body']='{{link}} {{passwort}}';rejects(fn()=>$values->invoke($endpoint,['values'=>json_encode($bad)],$entry),'Unknown placeholder rejected');
 $bad=$ok;$bad['de']['subject']='';rejects(fn()=>$values->invoke($endpoint,['values'=>json_encode($bad)],$entry),'Empty subject rejected');
 $woo=MailTemplates::registry()['shop.woo_on_hold'];$empty=['de'=>['subject'=>'','heading'=>'','body'=>''],'fr'=>['subject'=>'','heading'=>'','body'=>'']];
 check($values->invoke($endpoint,['values'=>json_encode($empty)],$woo)['de']['subject']==='','WooCommerce template may stay empty');

 $GLOBALS['operation']='list';$GLOBALS['input']=[];$caps=['strc_access_member_area'=>true,'strc_manage_library'=>true];
 rejects(fn()=>$endpoint->respond(),'Editors without admin role cannot manage templates',403);

 $log=new MailLog();MailLog::context('market.online');$log->succeeded(['to'=>['Monika <monika@example.invalid>']]);
 $row=$options[MailLog::OPTION][0];check($row['type']==='Marktplatz: Inserat ist online'&&$row['to']==='monika@example.invalid'&&$row['status']==='ok'&&!isset($row['subject']),'Log stores type, recipient and result without content');
 $log->succeeded(['to'=>['x@example.invalid']]);check($options[MailLog::OPTION][0]['type']==='Andere Systemmail','Context applies to one mail only');
 $options[MailLog::OPTION][]=['at'=>gmdate(DATE_ATOM,time()-91*DAY_IN_SECONDS),'type'=>'Alt','to'=>'old@example.invalid','status'=>'ok','error'=>''];MailLog::prune();
 check(count($options[MailLog::OPTION])===2&&MailLog::entries('monika')[0]['to']==='monika@example.invalid','Entries older than 90 days are removed and search works');
 $layout=new MailLayout();$out=$layout->wrap(['to'=>'a@example.invalid','subject'=>'Test','message'=>"Hallo <Monika>\n\nLink: https://qa.invalid/#marktplatz/meine/7.\nEnde",'headers'=>['From: Swiss TR-Club <no-reply@swisstrclub.ch>'],'attachments'=>[]]);
 check(str_contains($out['message'],'data-strc-mail')&&str_contains($out['message'],'background:#114973')&&str_contains($out['message'],'Hallo &lt;Monika&gt;')&&str_contains($out['message'],'href="https://qa.invalid/#marktplatz/meine/7"')&&!str_contains($out['message'],'/7.</a>'),'Plain text mail gets blue header, escaped text and clickable link without trailing dot');
 check(in_array('Content-Type: text/html; charset=UTF-8',$out['headers'],true)&&in_array('From: Swiss TR-Club <no-reply@swisstrclub.ch>',$out['headers'],true),'HTML content type set, other headers kept');
 $mailer=new stdClass();$mailer->AltBody='';$layout->alternative($mailer);check(str_starts_with($mailer->AltBody,'Hallo <Monika>'),'Original text becomes the plain-text alternative');
 $again=$layout->wrap($out);check(substr_count($again['message'],'data-strc-mail')===1,'Already wrapped mail is not wrapped twice');
 $html=$layout->wrap(['to'=>'a','subject'=>'S','message'=>'<html><body><p>Inhalt</p></body></html>','headers'=>"Content-Type: text/html; charset=UTF-8",'attachments'=>[]]);check(str_contains($html['message'],'<p>Inhalt</p>')&&substr_count($html['message'],'<body')===1,'HTML mail body is placed inside the layout');
 echo json_encode(['passed'=>count($checks),'checks'=>$checks],JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE)."\n";
}

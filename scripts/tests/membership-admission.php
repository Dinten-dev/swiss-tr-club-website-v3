<?php
/** Isolated checks for the membership fee rules and admission mails. No WordPress, WooCommerce or mail. */
declare(strict_types=1);
namespace { if(defined('ABSPATH'))throw new \RuntimeException('Run without WordPress.'); }
namespace {
 $checks=[];$options=[];
 function check(bool $ok,string $label):void{if(!$ok)throw new RuntimeException('FAILED: '.$label);$GLOBALS['checks'][]=$label;}
 function is_email(string $email):bool{return (bool)filter_var($email,FILTER_VALIDATE_EMAIL);}
 function get_option(string $key,mixed $default=false):mixed{return $GLOBALS['options'][$key]??$default;}
 function wp_strip_all_tags(string $text):string{return strip_tags($text);}
 function home_url(string $path=''):string{return 'https://qa.invalid'.$path;}
 $base=dirname(__DIR__,2).'/wordpress/wp-content/plugins/strc-core/src/';
 foreach(['Mail/WelcomeMailSettings.php','Mail/MailLog.php','Mail/MailTemplates.php','Members/MembershipFee.php'] as $file)require $base.$file;
 use SwissTRClub\Core\Members\MembershipFee;use SwissTRClub\Core\Mail\MailTemplates;
 $at=static fn(string $local):int=>(new DateTimeImmutable($local,new DateTimeZone('Europe/Zurich')))->getTimestamp();
 check(MembershipFee::year($at('2026-07-15 23:30'))===2026,'Until 15 July the current year is invoiced (Zurich time)');
 check(MembershipFee::year($at('2026-07-16 00:10'))===2027,'From 16 July the following year is invoiced');
 check(MembershipFee::year($at('2026-11-01 10:00'))===2027&&MembershipFee::year($at('2027-01-10 10:00'))===2027,'Autumn and January applications pay for the same year');
 check(MembershipFee::amount('single')===120&&MembershipFee::amount('couple')===160&&MembershipFee::amount('young')===50&&MembershipFee::amount('other')===0,'Annual fees per membership type');
 check(MembershipFee::lineLabel('couple','de',2027)==='Mitgliederbeitrag 2027 – Paarmitgliedschaft'&&MembershipFee::lineLabel('single','fr',2027)==='Cotisation 2027 – affiliation individuelle','Invoice line in the applicant language');
 check(MembershipFee::aktuar()==='aktuar@swisstrclub.ch'&&MembershipFee::kassier()==='kassier@swisstrclub.ch','Default recipients for applications and payments');
 $mail=MailTemplates::render('member.application_rejected','de',['vorname'=>'Monika','grund'=>'Wir nehmen nur Halter eines TR auf.']);
 check(str_contains($mail['body'],'Hallo Monika')&&str_contains($mail['body'],'nur Halter eines TR'),'Rejection mail contains the reason');
 $mail=MailTemplates::render('member.application_question','fr',['vorname'=>'Luc','frage'=>'Quelle année ?']);
 check(str_contains($mail['body'],'Bonjour Luc')&&str_contains($mail['body'],'Quelle année ?'),'Question mail in French');
 $mail=MailTemplates::render('member.application_approved','de',['vorname'=>'Monika','mitgliedschaft'=>'Einzelmitgliedschaft','jahr'=>'2027','betrag'=>'120.00','rechnungsnummer'=>'S-2026-0009','onlinezahlung'=>'']);
 check(str_contains($mail['body'],'Rechnung S-2026-0009')&&str_contains($mail['body'],'CHF 120.00')&&!str_contains($mail['body'],"\n\n\n")&&!str_contains($mail['body'],'{{'),'Approval mail without online payment leaves no empty gap');
 foreach(['member.application_question','member.application_rejected','member.application_approved','internal.membership_paid'] as $key)check(isset(MailTemplates::registry()[$key]),'Template editable by the editors: '.$key);
 echo json_encode(['passed'=>count($checks),'checks'=>$checks],JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE)."\n";
}

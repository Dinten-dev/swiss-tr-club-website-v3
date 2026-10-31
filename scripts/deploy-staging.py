#!/usr/bin/env python3
"""Publish a checked candidate only while the captured staging files are unchanged."""
import argparse,hashlib,json,pathlib,shlex,subprocess,tarfile,tempfile,datetime

parser=argparse.ArgumentParser()
parser.add_argument('--baseline',type=pathlib.Path,required=True)
parser.add_argument('--ssh-host',required=True)
parser.add_argument('--ssh-port',default='2121')
parser.add_argument('--ssh-key',required=True)
parser.add_argument('--known-hosts',required=True)
parser.add_argument('--site-path',required=True)
parser.add_argument('--dry-run',action='store_true',help='Verify the local candidate and list changes without contacting the server')
args=parser.parse_args()
root=pathlib.Path(__file__).resolve().parents[1]
manifest_path=root/'deployment/staging/release.manifest.json'
manifest=json.loads(manifest_path.read_text())
baseline=json.loads(args.baseline.read_text())
old={item['path']:item for item in baseline}
changed=[]
for item in manifest['files']:
    path=item['path'].removeprefix('wordpress/')
    actual=(root/item['path']).read_bytes()
    if hashlib.sha256(actual).hexdigest()!=item['sha256']:raise SystemExit('Candidate changed after its build: '+path)
    if path not in old or old[path]['sha256']!=item['sha256']:changed.append({**item,'path':path})
if args.dry_run:
    print(json.dumps({'changedFiles':len(changed),'paths':[item['path'] for item in changed],'target':args.site_path}))
    raise SystemExit(0)
ssh=['ssh','-p',args.ssh_port,'-i',args.ssh_key,'-o','IdentitiesOnly=yes','-o','BatchMode=yes','-o','StrictHostKeyChecking=yes','-o','UserKnownHostsFile='+args.known_hosts,args.ssh_host]
release='/private/strc-peter-release-'+datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%d%H%M%S')
with tempfile.TemporaryDirectory(prefix='strc-release-') as temporary:
    archive=pathlib.Path(temporary)/'release.tar.gz'
    with tarfile.open(archive,'w:gz') as bundle:
        for item in changed:bundle.add(root/'wordpress'/item['path'],arcname=item['path'])
    with archive.open('rb') as stream:
        subprocess.run(ssh+['umask 077; mkdir -p '+shlex.quote(release+'/candidate')+'; tar xzf - -C '+shlex.quote(release+'/candidate')],stdin=stream,check=True,timeout=180)
    payload=json.dumps({'site':args.site_path,'release':release,'baseline':baseline,'changed':changed})
    source='''<?php
$c=json_decode(file_get_contents(__DIR__.'/configuration.json'),true);$site=$c['site'];$release=$c['release'];
$fail=static function($message)use($release,$site){
 if(is_file($release.'/rollback.json'))foreach(array_reverse(json_decode(file_get_contents($release.'/rollback.json'),true))as$f){$target=$site.'/'.$f['path'];if(!is_file($target)||hash_file('sha256',$target)!==$f['installedSha256'])continue;if($f['existed']){copy($release.'/before/'.$f['path'],$target);chmod($target,0644);}else unlink($target);}
 fwrite(STDERR,$message."\\n");exit(1);
};
foreach($c['baseline'] as $f){$p=$site.'/'.$f['path'];if(!is_file($p)||hash_file('sha256',$p)!==$f['sha256'])$fail('Staging changed: '.$f['path']);}
$baseline=array_column($c['baseline'],null,'path');
if(!defined('ABSPATH'))require $site.'/wp-load.php';if(wp_get_environment_type()!=='staging'||home_url()!=='https://staging.swisstrclub.ch')$fail('Wrong deployment target');
foreach($c['changed'] as $f){$p=$site.'/'.$f['path'];if(!isset($baseline[$f['path']])&&file_exists($p))$fail('New staging file must be merged first: '.$f['path']);if(hash_file('sha256',$release.'/candidate/'.$f['path'])!==$f['sha256'])$fail('Upload checksum mismatch');}
foreach($c['changed'] as $f)if(str_ends_with($f['path'],'.php')){exec(escapeshellarg(PHP_BINARY).' -l '.escapeshellarg($release.'/candidate/'.$f['path']),$lintOutput,$lintStatus);if($lintStatus!==0)$fail('PHP syntax failed: '.$f['path']);}
// Existing recipient normalization must keep the same configured destination.
foreach($c['changed'] as $f)if(str_ends_with($f['path'],'/Mail/ApplicationNotification.php')){
 $original=file_get_contents($site.'/'.$f['path']);preg_match("/public\\s+const\\s+RECIPIENT\\s*=\\s*'([^']+)'/",$original,$matches);
 if(!empty($matches[1])){if($matches[1]!==get_option('admin_email'))$fail('Recipient normalization needs review');}
 else {
  // Newer releases already resolve the recipient from admin_email. Require the resolver to stay identical.
  $candidate=file_get_contents($release.'/candidate/'.$f['path']);
  $pattern='/private\\s+static\\s+function\\s+recipient\\(\\):\\s*string\\s*\\{(.*?)\\n    \\}/s';
  if(!preg_match($pattern,$original,$beforeRecipient)||!preg_match($pattern,$candidate,$afterRecipient)||trim($beforeRecipient[1])!==trim($afterRecipient[1]))$fail('Recipient resolver changed; review destination first');
 }
}
$ordered=$c['changed'];usort($ordered,static function($a,$b)use($baseline){
 $priority=static fn($f)=>!isset($baseline[$f['path']])?0:(str_ends_with($f['path'],'/strc-core.php')?1:(str_contains($f['path'],'/build/')?(str_ends_with($f['path'],'/app.js')?4:3):2));
 return $priority($a)<=>$priority($b);
});
$rollback=[];
foreach($ordered as $f){
 $target=$site.'/'.$f['path'];$backup=$release.'/before/'.$f['path'];$existed=is_file($target);
 if($existed){if(!is_dir(dirname($backup)))mkdir(dirname($backup),0700,true);if(!copy($target,$backup))$fail('Backup failed');chmod($backup,0600);}
 $rollback[]=['path'=>$f['path'],'existed'=>$existed,'installedSha256'=>$f['sha256'],'previousSha256'=>$baseline[$f['path']]['sha256']??null];
 file_put_contents($release.'/rollback.json',json_encode($rollback,JSON_PRETTY_PRINT));chmod($release.'/rollback.json',0600);
 if(!is_dir(dirname($target)))mkdir(dirname($target),0755,true);
 $temporary=$target.'.strc-new';if(!copy($release.'/candidate/'.$f['path'],$temporary))$fail('Copy failed');chmod($temporary,0644);
 // Protect changes made after the full initial check as well.
 if($existed&&hash_file('sha256',$target)!==$baseline[$f['path']]['sha256']){unlink($temporary);$fail('Concurrent edit; stop and reconcile: '.$f['path']);}
 if(!$existed&&file_exists($target)){unlink($temporary);$fail('Concurrent new file; stop and reconcile');}
 if(!rename($temporary,$target))$fail('Atomic replacement failed');
}
foreach($c['changed'] as $f)if(hash_file('sha256',$site.'/'.$f['path'])!==$f['sha256'])$fail('Published checksum mismatch: '.$f['path']);
echo json_encode(['publishedFiles'=>count($c['changed']),'rollbackDirectory'=>$release]);
'''
    subprocess.run(ssh+['cat > '+shlex.quote(release+'/configuration.json')],input=payload.encode(),check=True,timeout=60)
    remote_script=release+'/publish.php'
    subprocess.run(ssh+['cat > '+shlex.quote(remote_script)],input=source.encode(),check=True,timeout=60)
    result=subprocess.run(ssh+['cd '+shlex.quote(args.site_path)+' && PATH=/opt/php83/bin:$PATH wp --skip-themes eval-file --use-include '+shlex.quote(remote_script)],capture_output=True,timeout=180)
    if result.returncode:raise SystemExit(result.stderr.decode()[-2000:])
    # PHP startup diagnostics may precede the one-line publication receipt.
    receipts=[]
    for line in result.stdout.decode().splitlines():
        try: receipt=json.loads(line)
        except json.JSONDecodeError: continue
        if isinstance(receipt,dict) and receipt.get('rollbackDirectory')==release and receipt.get('publishedFiles')==len(changed): receipts.append(receipt)
    if len(receipts)!=1: raise SystemExit('Publication receipt unclear; inspect the remote release and checksums before retrying: '+release)
    status=receipts[0]
    manifest['status']='published';manifest['publishedOn']=datetime.datetime.now(datetime.timezone.utc).isoformat()
    manifest['publishedFiles']=status['publishedFiles']
    manifest_path.write_text(json.dumps(manifest,indent=2)+'\n')
    print(json.dumps(status))

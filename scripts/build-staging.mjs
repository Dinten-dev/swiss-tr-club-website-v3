import {readFileSync,writeFileSync,mkdtempSync,readdirSync,cpSync,rmSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {tmpdir} from 'node:os';
import {resolve,join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root=fileURLToPath(new URL('../',import.meta.url));
const frontend=resolve(root,'frontend');
const output=resolve(root,'wordpress/wp-content/themes/strc-app/build');
const baseline=JSON.parse(readFileSync(resolve(root,'deployment/staging/manifest.json'),'utf8'));
const temporary=mkdtempSync(join(tmpdir(),'strc-source-build-'));
const sha256=data=>createHash('sha256').update(data).digest('hex');
try {
  execFileSync(process.execPath,[resolve(frontend,'node_modules/vite/bin/vite.js'),'build','--config','vite.wordpress.config.ts'],{cwd:frontend,env:{...process.env,STRC_BUILD_DIR:temporary},stdio:'inherit'});
  // Old chunks and Peter's retained assets remain available to already-open clients.
  cpSync(temporary,output,{recursive:true});
  const files=[];
  function collect(directory){
    for(const entry of readdirSync(directory,{withFileTypes:true})){
      if(['vendor','.phpunit.cache','data'].includes(entry.name))continue;
      const path=join(directory,entry.name);
      if(entry.isDirectory())collect(path);
      else if(entry.isFile()){
        const data=readFileSync(path);
        files.push({path:path.slice(root.length),bytes:data.length,sha256:sha256(data)});
      }
    }
  }
  collect(resolve(root,'wordpress/wp-content/plugins/strc-core'));
  collect(resolve(root,'wordpress/wp-content/themes/strc-app'));
  files.sort((a,b)=>a.path.localeCompare(b.path,'en'));
  const release={...baseline,status:'candidate',builtOn:new Date().toISOString(),baselineCapturedOn:baseline.capturedOn,files};
  const manifest=resolve(root,'deployment/staging/release.manifest.json');
  writeFileSync(manifest,JSON.stringify(release,null,2)+'\n');
  execFileSync(process.execPath,[resolve(root,'scripts/verify-staging-snapshot.mjs'),'--manifest=deployment/staging/release.manifest.json'],{stdio:'inherit'});
}finally{rmSync(temporary,{recursive:true,force:true});}

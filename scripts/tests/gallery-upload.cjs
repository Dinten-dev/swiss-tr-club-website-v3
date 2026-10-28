const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const ts=require('../../frontend/node_modules/typescript');
const source=fs.readFileSync(require('node:path').join(__dirname,'../../frontend/app/components/GalleryUpload.ts'),'utf8');
function runtime(width=6000,height=4000,output=12*1024*1024){
 const state={draws:0,revoked:0,canvas:null};
 const canvas={width:0,height:0,getContext:()=>({fillRect(){},drawImage(){state.draws++;state.edge=Math.max(canvas.width,canvas.height)},set fillStyle(v){}}),toBlob(callback){callback(new Blob([new Uint8Array(output)],{type:'image/jpeg'}))}};
 const context={exports:{},File,Blob,URL:{createObjectURL:()=> 'blob:qa',revokeObjectURL(){state.revoked++}},window:{Image:class {naturalWidth=width;naturalHeight=height;async decode(){}}},document:{createElement:()=>canvas},Promise,Error,Math};
 vm.runInNewContext(ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.CommonJS}}).outputText,context);
 state.canvas=canvas;return {...state,run:context.exports.prepareGalleryPhoto,state};
}
const photo=size=>({name:'magazin.png',size,type:'image/png',lastModified:1});
for(const size of [1024,12*1024*1024,16*1024*1024])test(`Magazine original ${size} bytes remains unchanged`,async()=>{const qa=runtime();const file=photo(size);const result=await qa.run(file);assert.equal(result.file,file);assert.equal(result.optimized,false);assert.equal(qa.state.draws,0);assert.equal(qa.state.revoked,1)});
test('Over 16 MB is optimized to at most 4000 pixels and 16 MB',async()=>{const qa=runtime();const result=await qa.run(photo(16*1024*1024+1));assert.equal(result.optimized,true);assert.ok(result.file.size<=16*1024*1024);assert.equal(result.file.type,'image/jpeg');assert.equal(result.file.name,'magazin.jpg');assert.ok(qa.state.draws>0);assert.ok(qa.state.edge<=4000);assert.equal(qa.state.revoked,1)});
test('Over the server 40 megapixel limit is optimized despite small size',async()=>{const qa=runtime(9000,5000);assert.equal((await qa.run(photo(4*1024*1024))).optimized,true)});
test('Over 50 MB input is rejected',async()=>{const qa=runtime();await assert.rejects(qa.run(photo(50*1024*1024+1)),/50 MB/)});
test('Unreadable image is rejected and resources are released',async()=>{const qa=runtime(0,0);await assert.rejects(qa.run(photo(1024)),/ungültig/);assert.equal(qa.state.revoked,1);assert.equal(qa.state.canvas.width,1)});

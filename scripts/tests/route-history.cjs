const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const ts=require('../../frontend/node_modules/typescript');
const source=fs.readFileSync(require('node:path').join(__dirname,'../../frontend/app/components/RouteHistory.ts'),'utf8');
const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
function fixture(){
 const events={};const timers=new Map();let timer=0;let cursor=0;
 const entries=[{hash:'#',state:{foreign:'preserved'}}];const scrolls=[];
 const browser={crypto:{randomUUID:()=> 'session'},location:{hash:'#'},scrollY:0,history:{get state(){return entries[cursor].state;},replaceState(value,title,url){entries[cursor].state=value;if(url){entries[cursor].hash=url;browser.location.hash=url;}}},addEventListener(name,callback){(events[name]??=[]).push(callback);},setTimeout(callback){timers.set(++timer,callback);return timer;},clearTimeout:id=>timers.delete(id),scrollTo(value){browser.scrollY=value.top;scrolls.push(value.top);emit('scroll');}};
 const emit=name=>events[name]?.forEach(callback=>callback());
 const module={exports:{}};vm.runInNewContext(compiled,{module,exports:module.exports});const route=module.exports.createRouteHistory(browser);
 const visit=hash=>{entries.splice(cursor+1);entries.push({hash,state:entries[cursor].state});cursor++;browser.location.hash=hash;emit('hashchange');};
 const travel=delta=>{cursor+=delta;browser.location.hash=entries[cursor].hash;emit('popstate');emit('hashchange');};
 return {route,visit,travel,browser,scrolls,entries,timers,emit,scroll:y=>{browser.scrollY=y;emit('scroll');},flush(){for(const [id,callback]of [...timers]){timers.delete(id);callback();}}};
}
test('Back and forward restore the right entry, preserving foreign history state',()=>{
 const f=fixture();assert.equal(f.route.previous(),'');assert.equal(f.entries[0].state.foreign,'preserved');f.scroll(620);f.visit('#club');f.scroll(190);f.visit('#triungsters');assert.equal(f.route.previous(),'#club');
 f.travel(-1);f.flush();assert.equal(f.browser.scrollY,190);assert.equal(f.route.previous(),'#');f.travel(-1);f.flush();assert.equal(f.browser.scrollY,620);assert.equal(f.route.previous(),'');f.travel(1);f.flush();assert.equal(f.browser.scrollY,190);assert.equal(f.route.previous(),'#');
});
test('A link to an earlier hash creates a new visit rather than pretending back',()=>{
 const f=fixture();f.visit('#club');f.visit('#forum');f.visit('#club');assert.equal(f.route.previous(),'#forum');f.travel(-1);assert.equal(f.route.previous(),'#club');
});
test('New navigation cancels delayed scroll restoration',()=>{
 const f=fixture();f.scroll(620);f.visit('#club');f.travel(-1);f.visit('#agenda');f.flush();assert.deepEqual(f.scrolls,[]);
});
test('User input cancels restoration without trapping user scrolling',()=>{
 const f=fixture();f.scroll(620);f.visit('#club');f.travel(-1);f.emit('wheel');f.scroll(90);f.flush();assert.deepEqual(f.scrolls,[]);assert.equal(f.browser.scrollY,90);
});
test('Navigating after back drops obsolete forward entries',()=>{
 const f=fixture();f.visit('#club');f.visit('#forum');f.travel(-1);f.visit('#agenda');assert.equal(f.entries.length,3);assert.equal(f.route.previous(),'#club');f.travel(-1);assert.equal(f.route.previous(),'#');
});

test('Replacing a detail/tab URL updates the same history entry',()=>{
 const f=fixture();f.scroll(420);f.visit('#galerie');f.route.replace('#galerie/21');assert.equal(f.route.previous(),'#');f.visit('#forum');assert.equal(f.route.previous(),'#galerie/21');f.travel(-1);f.flush();assert.equal(f.route.previous(),'#');assert.equal(f.browser.location.hash,'#galerie/21');
});

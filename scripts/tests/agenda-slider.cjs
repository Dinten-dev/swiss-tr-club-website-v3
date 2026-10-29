const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const ts=require('../../frontend/node_modules/typescript');
const source=fs.readFileSync(path.join(__dirname,'../../frontend/app/components/AgendaSlider.tsx'),'utf8');
const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2022}}).outputText;
function fixture(){
 const state={reduced:false,hidden:false,slides:Array.from({length:6},(_,i)=>({url:`/poster-${i}.jpg`,alt:`Poster ${i}`,altFr:`Affiche ${i}`})),language:'de'};
 const hooks=[];const timers=new Map();let cursor=0;let nextTimer=0;let effects=[];let tree;
 const jsx=(type,props)=>({type,props});
 const react={
  useState(initial){const i=cursor++;if(!(i in hooks))hooks[i]=initial;return [hooks[i],value=>{hooks[i]=typeof value==='function'?value(hooks[i]):value;}];},
  useRef(initial){const i=cursor++;return hooks[i]??(hooks[i]={current:initial});},
  useSyncExternalStore(subscribe,snapshot){return snapshot();},
  useEffect(callback,deps){const i=cursor++;const old=hooks[i];if(!old||deps.some((v,n)=>!Object.is(v,old.deps[n]))){effects.push(()=>{old?.cleanup?.();hooks[i]={deps,cleanup:callback()};});}},
 };
 const module={exports:{}};
 vm.runInNewContext(compiled,{module,exports:module.exports,matchMedia:()=>({matches:state.reduced}),document:{get hidden(){return state.hidden;}},window:{setTimeout(callback,delay){assert.equal(delay,6000);timers.set(++nextTimer,callback);return nextTimer;},clearTimeout:id=>timers.delete(id)},require(name){
  if(name==='react')return react;
  if(name==='react/jsx-runtime')return {jsx,jsxs:jsx};
  if(name==='next/image')return {__esModule:true,default:'img'};
  if(name==='./UILanguage')return {t:v=>v,useUILanguage:()=>({language:state.language})};
  if(name==='./SiteContent')return {useSiteContent:()=>({values:{agenda:{slides:state.slides}}}),assetUrl:v=>v};
  throw new Error(`Unexpected dependency ${name}`);
 }});
 function render(){cursor=0;effects=[];tree=module.exports.default();for(const run of effects)run();return tree;}
 function nodes(node){if(!node)return [];if(Array.isArray(node))return node.flatMap(nodes);return typeof node==='object'?[node,...nodes(node.props?.children)]:[];}
 const active=()=>nodes(tree).find(n=>n.type==='figure'&&n.props['aria-hidden']===false)?.props['aria-label'];
 const toggle=()=>nodes(tree).find(n=>n.type==='button'&&'aria-pressed' in n.props);
 render();return {state,timers,render,nodes:()=>nodes(tree),active,toggle,get tree(){return tree;}};
}
test('Slides rotate after six seconds and wrap with keyboard navigation',()=>{
 const f=fixture();assert.equal(f.active(),'1 / 6');assert.equal(f.timers.size,1);[...f.timers.values()][0]();f.render();assert.equal(f.active(),'2 / 6');
 for(let i=0;i<2;i++){f.tree.props.onKeyDown({key:'ArrowLeft',preventDefault(){}});f.render();}assert.equal(f.active(),'6 / 6');
});
test('Mouse leaving does not resume rotation while keyboard focus remains',()=>{
 const f=fixture();f.tree.props.onMouseEnter();f.render();f.tree.props.onFocusCapture();f.render();f.tree.props.onMouseLeave();f.render();assert.equal(f.timers.size,0);
 f.tree.props.onBlurCapture({currentTarget:{contains:()=>false},relatedTarget:null});f.render();assert.equal(f.timers.size,1);
});
test('No permanent pause button (Redaktion 29.10.2026)',()=>{
 const f=fixture();assert.equal(f.toggle(),undefined);f.tree.props.onMouseEnter();f.render();assert.equal(f.timers.size,0);f.tree.props.onMouseLeave();f.render();assert.equal(f.timers.size,1);
});
test('Reduced motion and hidden documents stop automatic changes',()=>{
 const f=fixture();f.state.reduced=true;f.render();assert.equal(f.timers.size,0);
 f.state.reduced=false;f.state.hidden=true;f.render();assert.equal(f.timers.size,0);f.state.hidden=false;f.render();assert.equal(f.timers.size,1);
});
test('Swipe captures the pointer and moves only beyond the threshold',()=>{
 const f=fixture();let captured=0;const stage=()=>f.nodes().find(n=>n.props?.className==='agenda-slider-stage');
 const down=x=>stage().props.onPointerDown({isPrimary:true,button:0,clientX:x,pointerId:7,target:{closest:()=>null},currentTarget:{setPointerCapture:id=>{captured=id;}}});
 down(150);stage().props.onPointerUp({clientX:130});f.render();assert.equal(f.active(),'1 / 6');assert.equal(captured,7);
 down(150);stage().props.onPointerUp({clientX:60});f.render();assert.equal(f.active(),'2 / 6');
});
test('Button presses do not start a swipe',()=>{
 const f=fixture();const stage=f.nodes().find(n=>n.props?.className==='agenda-slider-stage');
 stage.props.onPointerDown({isPrimary:true,button:0,target:{closest:()=>({})}});stage.props.onPointerUp({clientX:0});f.render();assert.equal(f.active(),'1 / 6');
});
test('Current poster opens as full image and follows manual selection',()=>{
 const f=fixture();f.tree.props.onKeyDown({key:'ArrowRight',preventDefault(){}});f.render();const link=f.nodes().find(n=>n.type==='a');assert.equal(link.props.href,'/poster-1.jpg');assert.equal(link.props.target,'_blank');assert.equal(link.props.rel,'noopener noreferrer');
 f.state.language='fr';f.render();assert.equal(f.nodes().find(n=>n.type==='img'&&n.props.src==='/poster-1.jpg').props.alt,'Affiche 1');
});
test('Changing editorial slide count remains valid and empty data removes timers',()=>{
 const f=fixture();f.tree.props.onKeyDown({key:'ArrowLeft',preventDefault(){}});f.render();f.state.slides=f.state.slides.slice(0,2);f.render();assert.equal(f.active(),'2 / 2');f.state.slides=[];f.render();assert.equal(f.tree,null);assert.equal(f.timers.size,0);
});

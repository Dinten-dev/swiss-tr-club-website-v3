const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const ts=require('../../frontend/node_modules/typescript');
const source=fs.readFileSync(path.join(__dirname,'../../frontend/app/components/MailTemplatesEditor.tsx'),'utf8');
const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2022}}).outputText+'\nexports.TemplateForm=TemplateForm;';
function fixture(){
 const text={subject:'Subject',heading:'',body:'Body {{link}}'};
 let template={key:'welcome',revision:'v1',welcome:true,enabled:true,customized:true,group:'Members',label:'Welcome',recipient:'Member',placeholders:['link'],required:['link'],de:{...text},fr:{...text}};
 const hooks=[];let cursor=0,effects=[],tree;const requests=[];
 let reply=async()=>({message:'Saved'});
 const jsx=(type,props)=>({type,props});
 const react={useState(initial){const i=cursor++;if(!(i in hooks))hooks[i]=typeof initial==='function'?initial():initial;return [hooks[i],value=>{hooks[i]=typeof value==='function'?value(hooks[i]):value;}];},useEffect(callback,deps){const i=cursor++,old=hooks[i];if(!old||deps.some((value,n)=>!Object.is(value,old.deps[n])))effects.push(()=>{old?.cleanup?.();hooks[i]={deps,cleanup:callback()};});}};
 const module={exports:{}};
 vm.runInNewContext(compiled,{module,exports:module.exports,window:{confirm:()=>true,addEventListener(){},removeEventListener(){}},require(name){if(name==='react')return react;if(name==='react/jsx-runtime')return {jsx,jsxs:jsx};if(name==='./UILanguage')return {t:v=>v};if(name==='./ClubApi')return {fields:v=>v,mutate:async(action,nonce,values)=>{requests.push(values);return reply(values);}};throw new Error(name);}});
 const onDirty=()=>{};
 function render(){cursor=0;effects=[];tree=module.exports.TemplateForm({template,nonce:'test',email:'test@example.invalid',back(){},onDirty,saved(list){template=list[0];}});effects.forEach(run=>run());return tree;}
 function nodes(node){if(!node)return [];if(Array.isArray(node))return node.flatMap(n=>nodes(n));return typeof node==='object'?[node,...nodes(node.props?.children)]:[];}
 const button=label=>nodes(tree).find(n=>n.type==='button'&&n.props.children===label);
 render();return {render,nodes:()=>nodes(tree),button,requests,setReply(callback){reply=callback;},template:()=>template};
}
const settle=()=>new Promise(resolve=>setImmediate(resolve));
test('Welcome reset synchronizes enabled state and revision before another save',async()=>{
 const f=fixture();f.setReply(async()=>({templates:[{...f.template(),revision:'v2',enabled:false,de:{subject:'Default',heading:'',body:'Default {{link}}'},fr:{subject:'Default',heading:'',body:'Default {{link}}'}}]}));
 f.button('Standardtext wiederherstellen').props.onClick();await settle();f.render();assert.equal(f.nodes().find(n=>n.type==='input'&&n.props.type==='checkbox').props.checked,false);
 f.setReply(async()=>({message:'Saved'}));f.button('Speichern').props.onClick();await settle();assert.equal(f.requests[1].enabled,'0');assert.equal(f.requests[1].revision,'v2');assert.equal(JSON.parse(f.requests[1].values).de.subject,'Default');
});
test('Conflicting save preserves edits and displays the server error',async()=>{
 const f=fixture();f.nodes().find(n=>n.type==='input'&&n.props.maxLength===200).props.onChange({target:{value:'Unsaved subject'}});f.render();f.setReply(async()=>{throw new Error('Changed elsewhere');});f.button('Speichern').props.onClick();await settle();f.render();assert.equal(f.nodes().find(n=>n.type==='input'&&n.props.maxLength===200).props.value,'Unsaved subject');assert.ok(f.nodes().some(n=>n.props?.role==='alert'&&n.props.children==='Changed elsewhere'));
});
test('The whole editor is disabled while a request is pending',async()=>{
 const f=fixture();let release;f.setReply(()=>new Promise(resolve=>{release=resolve;}));f.button('Vorschau').props.onClick();f.render();assert.equal(f.nodes().find(n=>n.type==='fieldset').props.disabled,true);release({subject:'S',body:'B'});await settle();f.render();assert.equal(f.nodes().find(n=>n.type==='fieldset').props.disabled,false);
});

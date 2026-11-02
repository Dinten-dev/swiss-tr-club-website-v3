const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const ts=require('../../frontend/node_modules/typescript');
const source=fs.readFileSync(path.join(__dirname,'../../frontend/app/components/RegistrationForm.tsx'),'utf8');
const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2022}}).outputText;
const settle=()=>new Promise(resolve=>setImmediate(resolve));
async function fixture(registration=null){
 const settings={guests:1,copilot:true,vehicle:false,weekend:true,fee:1000,copilotFee:500,guestFee:2000,guestCopilotFee:1500,feeDouble:800,copilotFeeDouble:400,guestFeeDouble:1600,guestCopilotFeeDouble:1200};
 const config={settings,registration,eventTitle:'Test event',eventStart:'2027-02-12T12:00:00Z',name:'Own Member',firstName:'Own',lastName:'Member',email:'qa@example.invalid',vehicles:[],nonce:'qa',open:true,canCancel:false,meals:{Vegetarisch:100,Fleisch:200},rooms:{},paymentMethods:['invoice']};
 const hooks=[];let cursor=0,effects=[],tree;const requests=[];
 const jsx=(type,props)=>({type,props});
 const react={Fragment:'Fragment',useState(initial){const i=cursor++;if(!(i in hooks))hooks[i]=typeof initial==='function'?initial():initial;return [hooks[i],value=>{hooks[i]=typeof value==='function'?value(hooks[i]):value;}];},useRef(initial){const i=cursor++;return hooks[i]??=( {current:initial});},useEffect(callback,deps){const i=cursor++,old=hooks[i];if(!old||deps.some((value,n)=>!Object.is(value,old.deps[n])))effects.push(()=>{old?.cleanup?.();hooks[i]={deps,cleanup:callback()};});}};
 class Data{constructor(){this.values=new Map();}set(k,v){this.values.set(k,v);}get(k){return this.values.get(k);}}
 const module={exports:{}};
 vm.runInNewContext(compiled,{module,exports:module.exports,AbortController,FormData:Data,require(name){if(name==='react')return react;if(name==='react/jsx-runtime')return {jsx,jsxs:jsx};if(name==='./UILanguage')return {t:v=>v};if(name==='./ClubApi')return {fields:v=>v,query:async()=>config,mutate:async(action,nonce,data)=>{requests.push(Object.fromEntries(data.values));return {preview:{...registration,participants:[],total:0},reviewToken:'review'};}};if(name==='./FormFields')return {FormSection:'FormSection',FormNotice:'FormNotice',vehicleModels:[]};return new Proxy({},{get:(_,key)=>String(key)});}});
 function render(){cursor=0;effects=[];tree=module.exports.default({eventId:30,memberAccess:true});effects.forEach(run=>run());return tree;}
 function nodes(node){if(!node)return [];if(Array.isArray(node))return node.flatMap(nodes);return typeof node==='object'?[node,...nodes(node.props?.children)]:[];}
 const all=()=>nodes(tree),button=label=>all().find(n=>n.type==='button'&&n.props.children===label);
 render();await settle();render();return {render,nodes:all,button,requests,submit(){all().find(n=>n.type==='form').props.onSubmit({preventDefault(){},currentTarget:{}});}};
}
const legacy={id:50,eventId:30,revision:'v1',state:'confirmed',total:4000,paymentMethod:'invoice',paymentStatus:'outstanding',participants:[{kind:'member',userId:1,name:'Own Member',crew:1,room:'single',meal:'Vegetarisch'},{kind:'guest',name:'Old Guest',firstName:'Old',lastName:'Guest',crew:2,meal:'Fleisch'},{kind:'member',name:'Bob Test',firstName:'Bob',lastName:'Test',memberNumber:'102',userId:2,crew:3,room:'double',meal:'Vegetarisch'},{kind:'copilot',name:'Chloe Test',firstName:'Chloe',lastName:'Test',memberNumber:'103',userId:3,crew:3,meal:'Fleisch'}],notes:'Existing notes'};
test('New booking offers one guest crew and member choice only for own companion',async()=>{
 const f=await fixture();f.button('＋ Weitere Person (Gast)').props.onClick();f.render();assert.equal(f.button('＋ Weitere Person (Gast)'),undefined);
 const selects=f.nodes().filter(n=>n.type==='select');const members=selects.filter(n=>JSON.stringify(n).includes('Anderes Mitglied'));assert.equal(members.length,1);
});
test('Legacy members are flagged for removal; saved notes stay',async()=>{
 const f=await fixture(legacy);f.button('Anmeldung ändern').props.onClick();f.render();assert.ok(f.nodes().some(n=>n.type==='strong'&&n.props.children==='Bob Test'));
 assert.ok(f.nodes().some(n=>n.type==='p'&&JSON.stringify(n.props.children).includes('Mitglieder melden sich neu selbst an')));assert.equal(f.nodes().find(n=>n.type==='textarea').props.defaultValue,'Existing notes');
});
test('Removing an earlier legacy guest preserves remaining crew identity and edit revision',async()=>{
 const f=await fixture(legacy);f.button('Anmeldung ändern').props.onClick();f.render();f.nodes().find(n=>n.type==='button'&&n.props.children==='Weitere Person entfernen').props.onClick();f.render();f.submit();await settle();
 const request=f.requests[0],crews=JSON.parse(request.crews);assert.equal(request.id,'50');assert.equal(request.revision,'v1');assert.equal(crews[1].existingCrew,3);assert.equal(crews[1].pilot.memberNumber,'102');assert.equal(crews[1].copilot.memberNumber,'103');assert.equal(crews[1].room,'double');
});
test('Cancelling a legacy edit restores the summary without submitting changes',async()=>{
 const f=await fixture(legacy);f.button('Anmeldung ändern').props.onClick();f.render();f.button('Änderung abbrechen').props.onClick();f.render();assert.ok(f.button('Anmeldung ändern'));assert.equal(f.nodes().some(n=>n.type==='form'),false);assert.equal(f.requests.length,0);
});

test('Removing an earlier crew keeps meals attached to the remaining people',async()=>{
 const f=await fixture(legacy);f.button('Anmeldung ändern').props.onClick();f.render();f.nodes().find(n=>n.type==='button'&&n.props.children==='Weitere Person entfernen').props.onClick();f.render();
 const meals=f.nodes().filter(n=>n.type==='select'&&n.props.name?.startsWith('meal_'));assert.deepEqual(meals.map(n=>n.props.value),['Vegetarisch','Vegetarisch','Fleisch']);
 meals[1].props.onChange({target:{value:'Fleisch'}});f.render();f.submit();await settle();assert.deepEqual(JSON.parse(f.requests[0].selections),[{meal:'Vegetarisch'},{meal:'Fleisch'},{meal:'Fleisch'}]);
});

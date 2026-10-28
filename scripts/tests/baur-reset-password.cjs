const {test}=require('node:test');
const assert=require('node:assert/strict');
const {readFileSync}=require('node:fs');
const {resolve}=require('node:path');
const vm=require('node:vm');

// Exercise the production inline scripts against both automatic generation paths
// in WordPress 7.1.3, without a browser, credentials or a real account.
const source=readFileSync(resolve(__dirname,'../../wordpress/wp-content/plugins/strc-core/src/Members/MemberLoginExperience.php'),'utf8');
const scripts=[...source.matchAll(/<<<'JS'\n([\s\S]*?)\nJS, '(before|after)'/g)];
assert.equal(scripts.length,2,'Both WordPress inline-script phases are required');

function fixture(){
 const pass={value:'',type:'password',attributes:{'data-reveal':'1'},setAttribute(key,value){this.attributes[key]=value;}};
 const second={value:''},submit={disabled:false};
 const icon={classList:{remove(){},add(){}}};
 const toggle={setAttribute(){},querySelector(){return icon;}};
 const ready=[],handlers=[],data=new Map(),scheduled=[];let generated=0,strengthUpdates=0;
 const button={};
 function click(originalEvent){
  const event={originalEvent,stopped:false,stopImmediatePropagation(){this.stopped=true;}};
  for(const handler of handlers){handler.call(button,event);if(event.stopped)break;}
 }
 function generate(){scheduled.push(()=>{generated++;pass.value='generated-fixture';pass.type='text';});}
 function jquery(target){
  if(typeof target==='function'){ready.push(target);return;}
  return {
   data(key,value){if(arguments.length===2){data.set(key,value);return this;}return data.has(key)?data.get(key):pass.attributes['data-'+key];},
   on(event,handler){assert.equal(target,'#resetpassform .wp-generate-pw');handlers.push(handler);return this;},
   trigger(event){assert.equal(target,pass);assert.equal(event,'pwupdate');strengthUpdates++;return this;},
  };
 }
 const context=vm.createContext({window:{jQuery:jquery},document:{getElementById(id){return {pass1:pass,pass2:second,'wp-submit':submit}[id];},querySelector(selector){return selector==='.wp-hide-pw'?toggle:null;}}});
 vm.runInContext(scripts.find(match=>match[2]==='before')[1],context);
 // Core binds the same button, then unconditionally triggers a synthetic click.
 if(Number(jquery(pass).data('reveal'))===1)generate();
 handlers.push(generate);click(undefined);
 vm.runInContext(scripts.find(match=>match[2]==='after')[1],context);
 return {pass,second,submit,click,ready,scheduled,stats:()=>({generated,strengthUpdates})};
}

test('Delayed WordPress initialization never generates or reveals a password',()=>{
 const state=fixture();state.ready.forEach(callback=>callback());state.scheduled.forEach(callback=>callback());
 assert.equal(state.stats().generated,0);assert.equal(state.pass.value,'');assert.equal(state.pass.type,'password');
 assert.equal(state.submit.disabled,true);assert.equal(state.stats().strengthUpdates,1);
});

test('Explicit mouse and keyboard activation still generate a password',()=>{
 for(const originalEvent of [{type:'click',detail:1},{type:'click',detail:0}]){
  const state=fixture();state.ready.forEach(callback=>callback());state.click(originalEvent);state.scheduled.forEach(callback=>callback());
  assert.equal(state.stats().generated,1);assert.equal(state.pass.value,'generated-fixture');
 }
});

test('Late autofill survives the strength refresh and delayed initialization',()=>{
 const state=fixture();state.pass.value='synthetic-autofill-value';state.second.value='synthetic-autofill-value';
 state.ready.forEach(callback=>callback());state.scheduled.forEach(callback=>callback());
 assert.equal(state.pass.value,'synthetic-autofill-value');assert.equal(state.second.value,'synthetic-autofill-value');
 assert.equal(state.pass.type,'password');assert.equal(state.stats().generated,0);assert.equal(state.stats().strengthUpdates,1);
});

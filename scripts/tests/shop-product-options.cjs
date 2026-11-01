const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm'),ts=require('../../frontend/node_modules/typescript');
const source=fs.readFileSync(require('node:path').join(__dirname,'../../frontend/app/components/ShopProductOptions.ts'),'utf8');
const code=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const moduleFixture={exports:{}};vm.runInNewContext(code,{module:moduleFixture,exports:moduleFixture.exports});
const {combinations,comboKey,combinationCount}=moduleFixture.exports;
const attribute=(name,values)=>({key:name,name,valuesText:values.join(', '),images:{}});
test('Product options generate a bounded Cartesian product',()=>{const options=[attribute('Farbe',['Navy','Weiss']),attribute('Grösse',['S','M']),attribute('Logo',['Ärmel','Brust'])];assert.equal(combinations(options).length,8);assert.equal(combinationCount(options),8);});
test('Large option sets are rejected before allocating combinations',()=>{const values=Array.from({length:5000},(_,i)=>String(i));const options=[attribute('Farbe',values),attribute('Grösse',values),attribute('Logo',values)];assert.equal(combinations(options).length,0);assert.equal(combinationCount(options),125000000000);});
test('A single attribute also respects the twenty-value limit',()=>{assert.equal(combinations([attribute('Modell',Array.from({length:21},(_,i)=>String(i)))]).length,0);});
test('Combination identity survives reordered attributes without delimiter collisions',()=>{const a=attribute('Farbe',['Navy']),b=attribute('Logo',['Brust']);assert.equal(comboKey([a,b],['Navy','Brust']),comboKey([b,a],['Brust','Navy']));assert.notEqual(comboKey([a,b],['Navy=Brust','X']),comboKey([a,b],['Navy','Brust=X']));});

test('Renaming an existing attribute label retains pending stock settings',()=>{const a=attribute('Farbe',['Navy']);const renamed={...a,name:'Farbton',originalName:'Farbe'};assert.equal(comboKey([a],['Navy']),comboKey([renamed],['Navy']));});

export type Attribute={key:string;name:string;originalName?:string;valuesText:string;images:Record<string,string>};
export type Combo={values:string[];enabled:boolean;stock:string};
export const valuesOf=(attribute:Attribute)=>{const seen=new Set<string>();return attribute.valuesText.split(',').map(value=>value.trim()).filter(value=>{const key=value.toLowerCase();if(!value||seen.has(key))return false;seen.add(key);return true;});};
export const comboKey=(attributes:Attribute[],values:string[])=>JSON.stringify(Object.fromEntries(attributes.map((attribute,index)=>[(attribute.originalName||attribute.name).trim().toLowerCase(),(values[index]||'').toLowerCase()]).sort(([a],[b])=>a.localeCompare(b))));
export const combinationCount=(attributes:Attribute[])=>attributes.length?attributes.reduce((count,attribute)=>count*valuesOf(attribute).length,1):0;
export function combinations(attributes:Attribute[]):string[][]{
 const lists=attributes.map(valuesOf);
 if(!lists.length||lists.some(list=>!list.length||list.length>20)||combinationCount(attributes)>100)return [];
 return lists.reduce<string[][]>((result,list)=>result.flatMap(prefix=>list.map(value=>[...prefix,value])),[[]]);
}

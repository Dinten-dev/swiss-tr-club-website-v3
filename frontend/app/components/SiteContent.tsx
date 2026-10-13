'use client';

import {t,useUILanguage} from './UILanguage';
import {createContext,useContext,useEffect,useState,useCallback,type ReactNode,type CSSProperties} from 'react';
import definitions from '../../../wordpress/wp-content/plugins/strc-core/src/Editorial/site-content.json';
import {query} from './ClubApi';

export type ContentImage={url:string;alt:string;altFr?:string;position?:string;frame?:string;group?:'tr'|'trips'|''};
export type ContentPartner={url:string;name:string;image:string};
export type ContentPerson={image:string;name:string;nameFr?:string;role:string;roleFr?:string;email?:string;frame?:string};
export type ContentValue=string|ContentImage[]|ContentPartner[]|ContentPerson[];
export type ContentValues=Record<string,ContentValue>;
type ContentMap=Record<string,ContentValues>;
export const contentDefinitions = definitions;
export const defaultContent:ContentMap=Object.fromEntries(Object.entries(definitions).map(([key,doc])=>[key,'initialStatus' in doc&&doc.initialStatus==='draft'?{}:Object.fromEntries(doc.fields.map(field=>[field.key,field.default]))]));
const defaultPublished=Object.fromEntries(Object.entries(definitions).map(([key,doc])=>[key,!('initialStatus' in doc&&doc.initialStatus==='draft')]));
type PublicContent={values:ContentMap;published?:Record<string,boolean>};
function mergeValues(values:ContentMap):ContentMap{return Object.fromEntries(Object.keys({...defaultContent,...values}).map(key=>[key,{...defaultContent[key],...values[key]}]));}
const Context=createContext({values:defaultContent,published:defaultPublished,loading:true,refresh:async()=>{},error:''});
export function SiteContentProvider({children}:{children:ReactNode}) {
 const [values,setValues]=useState(defaultContent);const [error,setError]=useState('');const [published,setPublished]=useState(defaultPublished);const [loading,setLoading]=useState(true);
 const refresh=useCallback(async()=>{try{const result=await query<PublicContent>('strc_editorial',{operation:'public'});setValues(mergeValues(result.values));setPublished({...defaultPublished,...result.published});setError('');}catch{setError('Inhalte konnten nicht aktualisiert werden. Bitte erneut laden.');}finally{setLoading(false);}},[]);
 useEffect(()=>{const controller=new AbortController();query<PublicContent>('strc_editorial',{operation:'public'},controller.signal).then(result=>{setValues(mergeValues(result.values));setPublished({...defaultPublished,...result.published});setError('');setLoading(false);}).catch(()=>{if(!controller.signal.aborted){setError('Inhalte konnten nicht geladen werden.');setLoading(false);}});return()=>controller.abort();},[]);
 return <Context.Provider value={{values,published,loading,refresh,error}}>{children}</Context.Provider>;
}
export function localizedContent(values:ContentValues,language:string):ContentValues{
 if(language!=='fr')return values;
 const localized={...values};
 for(const [key,value] of Object.entries(values))if(key.endsWith('__fr')&&typeof value==='string'&&value.replace(/<[^>]*>/g,'').replace(/&nbsp;/g,'').trim())localized[key.slice(0,-4)]=value;
 for(const [key,value] of Object.entries(values))if(Array.isArray(value)&&value.length){
  if('alt' in value[0])localized[key]=(value as ContentImage[]).map(photo=>({...photo,alt:photo.altFr||photo.alt}));
  else if('role' in value[0])localized[key]=(value as ContentPerson[]).map(person=>({...person,name:person.nameFr||person.name,role:person.roleFr||person.role}));
 }
 return localized;
}
export function useSiteContent(){const context=useContext(Context);const {language}=useUILanguage();const values=Object.fromEntries(Object.entries(context.values).map(([key,value])=>[key,localizedContent(value,language)]));return {...context,error:t(context.error),values,text:(key:string,fallback='')=>{const [doc,field]=key.split('.');const value=values[doc]?.[field];return typeof value==='string'?t(value):t(fallback);}};}
export function RichHtml({html,className=''}:{html:string;className?:string}){return <div className={`rich-content ${className}`} dangerouslySetInnerHTML={{__html:html}}/>;}
export function ContentBlock({id,className=''}:{id:string;className?:string}){const {text}=useSiteContent();return <RichHtml html={text(id)} className={className}/>;}
export function assetUrl(url:string){return url.startsWith('/')&&!url.startsWith('//')?`${process.env.NEXT_PUBLIC_ASSET_BASE??''}${url}`:url;}
export function regionalLandscape(slug:string){const key=slug.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');const images:Record<string,string>={'zuerich':'00000325-Zuerich_Grossmuenster_4x3.png','bern':'00000328-Bern_Zytglogge_4x3.png','ostschweiz':'00000330-St_Gallen_Kathedrale_4x3.png','innerschweiz':'00000329-Luzern_Kapellbruecke_4x3.png','zentralschweiz':'00000329-Luzern_Kapellbruecke_4x3.png','nordwestschweiz':'00000327-Basel_Muenster_4x3.png','mittelland':'00000326-Aarau_Obertorturm_4x3.png','romandie':'00000332-Waadt_Schloss_Chillon_4x3.png','swiss-romande':'00000332-Waadt_Schloss_Chillon_4x3.png','suisse-romande':'00000332-Waadt_Schloss_Chillon_4x3.png','triungsters':'00000331-TRiungsters_TR_Roadster_4x3.png'};return assetUrl(images[key]?`/regions/${images[key]}`:'/regions/00000326-Aarau_Obertorturm_4x3.png');}
export function regionalCardBackground(slug:string):CSSProperties {
 const image=`url("${regionalLandscape(slug)}")`;
 return {backgroundImage:image,backgroundSize:'cover',backgroundPosition:'center 65%',backgroundRepeat:'no-repeat'};
}

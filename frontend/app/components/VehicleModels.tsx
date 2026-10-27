'use client';
import {t} from './UILanguage';
import {useState,type MouseEvent} from 'react';
import Image from 'next/image';
import {imageFrameStyle} from './ImageFrame';
import {Dialog} from './Marketplace';
import {useSiteContent,contentDefinitions,assetUrl,RichHtml,type ContentValues} from './SiteContent';

export const trModels=['TR2','TR3','TR3A','TR4','TR4A','TR5','TR250','TR6','TR7','TR8'];
export const vehicleFacts=[['years','Bauzeit'],['engine','Motor'],['displacement','Hubraum'],['power','Leistung'],['transmission','Getriebe'],['production','Stückzahl']];
const text=(values:ContentValues,key:string)=>typeof values[key]==='string'?values[key] as string:'';
function defaults(key:string):ContentValues {const doc=contentDefinitions[key as keyof typeof contentDefinitions];return doc?Object.fromEntries(doc.fields.map(f=>[f.key,f.default])):{};}
export function Placeholder({model}:{model:string}){return <div className="vehicle-placeholder"><span className="vehicle-placeholder-model" aria-hidden="true">{model}</span><svg viewBox="0 0 300 110" fill="none" aria-hidden="true"><path d="M27 76h18m40 0h128m41 0h19l-4-20-33-9-31-21h-62l-34 22-60 9-16 9-6 10Z"/><path d="m119 47 28-17h54l23 17H119Zm-17 5 139-1M92 61h111"/><circle cx="65" cy="77" r="19"/><circle cx="234" cy="77" r="19"/><circle cx="65" cy="77" r="10"/><circle cx="234" cy="77" r="10"/></svg><span className="vehicle-placeholder-label">{t("Bild folgt")}</span></div>;}
export function VehicleDetails({values,model,unpublished=false,preview=false}:{values:ContentValues;model:string;unpublished?:boolean;preview?:boolean}){
 const image=text(values,'image');const note=text(values,'exampleNote');return <div className="vehicle-detail-content">
 {preview&&<h2>{text(values,'title')||model}</h2>}{(unpublished||note)&&<p className="vehicle-example-note">{unpublished?t('Beispielansicht · redaktioneller Inhalt noch nicht veröffentlicht'):note}</p>}
 <figure className="vehicle-detail-cover">{image?<Image src={assetUrl(image)} alt={text(values,'imageAlt')||model} width={1000} height={600} style={imageFrameStyle(values.imageFrame)}/>:<Placeholder model={model}/>} {text(values,'imageCaption')&&<figcaption>{text(values,'imageCaption')}</figcaption>}</figure>
 {text(values,'intro')&&<p className="vehicle-detail-intro">{text(values,'intro')}</p>}
 <div className="vehicle-detail-layout"><article className={`vehicle-detail-copy${text(values,'bodySecondary').replace(/<[^>]*>/g,'').trim()?' two-columns':''}`}>{text(values,'body')&&<RichHtml html={text(values,'body')}/>} {text(values,'bodySecondary')&&<RichHtml html={text(values,'bodySecondary')}/>}</article><aside className="vehicle-factbox"><h3>{text(values,'factsTitle')||t('Fahrzeugdaten')}</h3>{typeof values.factsBody==='string'?<RichHtml html={values.factsBody}/>:<><dl>{vehicleFacts.filter(([key])=>text(values,key)).map(([key,label])=><div key={key}><dt>{t(label)}</dt><dd>{text(values,key)}</dd></div>)}</dl>{text(values,'factsNote')&&<RichHtml html={text(values,'factsNote')}/>}</>}</aside></div>
 </div>;
}
export function ModelCards({compact=false,initialSelected='',canEdit=false}:{compact?:boolean;initialSelected?:string;canEdit?:boolean}){
 const {values,published,error,refresh}=useSiteContent();const initial=trModels.find(m=>m.toLowerCase()===initialSelected.toLowerCase())||'';const [selected,setSelected]=useState(initial);
 function content(model:string){const key='model-'+model.toLowerCase();return published[key]?values[key]||{}:defaults(key);}
 function open(e:MouseEvent<HTMLAnchorElement>,model:string){if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.button!==0)return;e.preventDefault();e.currentTarget.focus();setSelected(model);}
 function close(){setSelected('');if(initial)window.location.hash='tr-modelle';}
 const modelKey='model-'+selected.toLowerCase();
 return <>{error&&<p role="alert">{t("Die aktuellen Modellinhalte konnten nicht geladen werden.")} <button className="home-text-link" onClick={()=>void refresh()}>{t('Erneut laden')}</button></p>}<nav className={`vehicle-model-grid${compact?' compact':''}`} aria-label={t("Triumph-Modelle und Fahrzeugdaten")}>{trModels.map(model=>{const data=content(model);return <a key={model} className="vehicle-model-card" href={'#tr-modelle/'+model.toLowerCase()} aria-haspopup="dialog" onClick={e=>open(e,model)}>{text(data,'image')?<div className="vehicle-card-image"><Image src={assetUrl(text(data,'image'))} alt={text(data,'imageAlt')||model} width={600} height={360} style={imageFrameStyle(data.imageFrame)}/></div>:<Placeholder model={model}/>}<div className="vehicle-card-caption"><strong>{text(data,'title')||model}</strong></div>{!compact&&<p>{t(published['model-'+model.toLowerCase()]&&!text(data,'exampleNote')?'Porträt & Fahrzeugdaten':'Beispielansicht · Bild und Daten folgen')}</p>}</a>;})}</nav>
 {selected&&<Dialog title={text(content(selected),'title')||selected} close={close}><VehicleDetails values={content(selected)} model={selected} unpublished={!published[modelKey]}/>{canEdit&&<a className="vehicle-edit-link" href={'#redaktion/'+modelKey}>{t("Bild, Texte und Fahrzeugdaten bearbeiten →")}</a>}</Dialog>}</>;
}
export function VehicleGallery({selected='',canEdit=false}:{selected?:string;canEdit?:boolean}){return <><section className="page-hero"><p className="eyebrow">{t("Unsere Leidenschaft")}</p><h1>{t("Die Triumph TR-Modelle")}</h1><p>{t("Jeder TR hat seinen eigenen Charakter. Entdecke die Modelle und ihre Fahrzeugdaten.")}</p></section><section className="page-content vehicle-gallery"><a className="page-back" href="#club">{t("← Zum Club")}</a><ModelCards initialSelected={selected} canEdit={canEdit}/></section></>;}

'use client';
import {useEffect,useState} from 'react';
import {t} from './UILanguage';
import {query,mutate,fields} from './ClubApi';
import {useCatalog} from './ClubCatalog';
import {vehicleModels} from './FormFields';

// Forum: Anzeige-Namen, Beschreibungen, Icons und Farben der Bereiche (gespeicherte Bereichsnamen bleiben unverändert).
export const forumAreaLabels:Record<string,string>={'Teile gesucht':'Ersatzteilsuche','Garagen / Spezialisten':'TR-Spezialisten'};
const areaInfo:Record<string,[string,string]>={
  'Fahrzeuge':['🚗','TR2–TR3A · TR4–TR4A · TR5–TR6 · TR7–TR8 · andere Triumphs'],
  'Technik':['🔧','Motor · Vergaser/Einspritzung · Elektrik · Fahrwerk · Karosserie · Getriebe/Overdrive'],
  'Restaurationen':['🛠','Projekte und Erfahrungen'],
  'Teile gesucht':['🔩','Gesucht · Bezugsquellen · Identifikation'],
  'Garagen / Spezialisten':['🏠','Werkstätten · Spezialisten · Sattler · Lackierer'],
  'Events & Reisen':['🗺','Reiseberichte · Roadbooks · Hoteltipps'],
  'Clubleben':['🏛','Fragen zum Club · Ideen & Vorschläge'],
};
const palette=['#e7f0f8','#e9f4ec','#fbf1e4','#f6e8ea','#f1edf7','#e6f4f3','#fdf6dc','#eef1f3'];
export const forumAreaLabel=(area:string)=>forumAreaLabels[area]||area;
export const forumAreaIcon=(area:string)=>areaInfo[area]?.[0]||'💬';
export const forumAreaText=(area:string)=>areaInfo[area]?.[1]||'';
export const forumAreaColor=(index:number)=>palette[index%palette.length];

type Combination={model:string;component:string;area:string};
export type ForumSettings={nonce:string;preferences:{interests:Combination[];email:boolean;website:boolean;whatsapp:boolean;expertNotifications:boolean};expertise:Combination[];canManage:boolean;members:{id:number;name:string;expertise:Combination[]}[]};

export function useForumSettings(enabled=true){
  const [settings,setSettings]=useState<ForumSettings|null>(null);const [revision,setRevision]=useState(0);
  useEffect(()=>{if(!enabled)return;const controller=new AbortController();query<ForumSettings>('strc_forum_settings',{},controller.signal).then(setSettings).catch(()=>{});return()=>controller.abort();},[revision,enabled]);
  async function save(preferences:ForumSettings['preferences']){
    if(!settings)return;
    await mutate('strc_forum_settings',settings.nonce,fields({operation:'save',interests:JSON.stringify(preferences.interests),email:preferences.email?'1':'0',website:preferences.website?'1':'0',whatsapp:preferences.whatsapp?'1':'0',expertNotifications:preferences.expertNotifications?'1':'0'}));
    setSettings({...settings,preferences});
  }
  const subscribed=(area:string)=>!!settings?.preferences.interests.some(row=>row.area===area&&!row.model&&!row.component);
  return {settings,save,subscribed,reload:()=>setRevision(v=>v+1)};
}

/** Abo eines Forumsbereichs: Hinweis im Dashboard ist Standard, WhatsApp optional. */
export function ForumSubscribe({area,forum}:{area:string;forum:ReturnType<typeof useForumSettings>}){
  const [busy,setBusy]=useState(false);const [message,setMessage]=useState('');
  const {settings,save,subscribed}=forum;
  if(!settings)return null;
  const active=subscribed(area);const prefs=settings.preferences;
  async function change(next:Partial<ForumSettings['preferences']>,text:string){setBusy(true);setMessage('');try{await save({...prefs,...next});setMessage(text);}catch(error){setMessage((error as Error).message);}finally{setBusy(false);}}
  const toggle=()=>change({website:true,interests:active?prefs.interests.filter(row=>!(row.area===area&&!row.model&&!row.component)):[...prefs.interests,{model:'',component:'',area}]},active?t('Abo beendet.'):t('Abonniert: Neue Beiträge erscheinen in Ihrem Dashboard.'));
  return <div className="forum-subscribe">
    <button type="button" className={active?'club-secondary is-subscribed':'market-primary'} disabled={busy} aria-pressed={active} onClick={()=>void toggle()}>{active?'✓ '+t('Abonniert'):'＋ '+t('Abonnieren')}</button>
    {active&&<label className="forum-whatsapp"><input type="checkbox" checked={prefs.whatsapp} disabled={busy} onChange={e=>void change({whatsapp:e.target.checked},e.target.checked?t('WhatsApp-Hinweise eingeschaltet.'):t('WhatsApp-Hinweise ausgeschaltet.'))}/>{t('Zusätzlich per WhatsApp informieren (an meine Mobilnummer im Profil, jederzeit widerrufbar)')}</label>}
    {message&&<span role="status" className="forum-subscribe-status">{message}</span>}
  </div>;
}

/** Moderation: Fachexperten zuteilen (Mehrfachauswahl Fahrzeuge × Technikbereiche). */
/** Karosserie & Ausstattung: in der Expertenzuteilung als eigene Gruppe «Sonstiges» neben den Technikbereichen. */
const OTHER_COMPONENTS=['Chassis','Karosserie','Räder / Reifen','Innenausstattung','Verdecke','Instrumente','Sonstiges'];
export function ExpertAssignment({forum}:{forum:ReturnType<typeof useForumSettings>}){
  const catalog=useCatalog();
  // Gleiche Bedienung wie «Rollen und Zuständigkeiten»: links suchen und ankreuzen, rechts «Wer ist Experte wofür».
  const [search,setSearch]=useState('');const [results,setResults]=useState<ForumSettings['members']>([]);const [experts,setExperts]=useState<ForumSettings['members']>([]);const [selected,setSelected]=useState<ForumSettings['members'][number]|null>(null);
  const [models,setModels]=useState<string[]>([]);const [components,setComponents]=useState<string[]>([]);const [busy,setBusy]=useState(false);const [message,setMessage]=useState('');const [filter,setFilter]=useState('');
  useEffect(()=>{const controller=new AbortController();query<ForumSettings>('strc_forum_settings',{search:''},controller.signal).then(result=>setExperts(result.members.filter(member=>member.expertise.some(row=>row.model||row.component)))).catch(()=>{});return()=>controller.abort();},[]);
  useEffect(()=>{if(search.trim().length<2)return;const controller=new AbortController();const timer=setTimeout(()=>{query<ForumSettings>('strc_forum_settings',{search},controller.signal).then(result=>setResults(result.members.slice(0,8))).catch(()=>{});},200);return()=>{clearTimeout(timer);controller.abort();};},[search]);
  if(!forum.settings?.canManage)return <p role="alert">{t('Nur für Administration und Forumsmoderation.')}</p>;
  const original=selected?JSON.stringify([[...new Set(selected.expertise.map(row=>row.model).filter(Boolean))].sort(),[...new Set(selected.expertise.map(row=>row.component).filter(Boolean))].sort()]):'';
  const dirty=!!selected&&JSON.stringify([[...models].sort(),[...components].sort()])!==original;
  function pick(member:ForumSettings['members'][number]){if(dirty&&!window.confirm(t('Ungespeicherte Änderungen verwerfen?')))return;setSearch('');setSelected(member);setModels([...new Set(member.expertise.map(row=>row.model).filter(Boolean))]);setComponents([...new Set(member.expertise.map(row=>row.component).filter(Boolean))]);setMessage('');}
  async function save(){
    if(!selected||!forum.settings)return;
    const rows=(models.length?models:['']).flatMap(model=>(components.length?components:['']).map(component=>({model,component,area:''}))).filter(row=>row.model||row.component);
    setBusy(true);setMessage('');
    try{await mutate('strc_forum_settings',forum.settings.nonce,fields({operation:'expert-save',id:String(selected.id),expertise:JSON.stringify(rows)}));const saved={...selected,expertise:rows};setSelected(saved);setMessage(t('Gespeichert.'));setExperts(list=>[...list.filter(member=>member.id!==saved.id),...(rows.length?[saved]:[])].sort((a,b)=>a.name.localeCompare(b.name,'de-CH')));}
    catch(error){setMessage((error as Error).message);}finally{setBusy(false);}
  }
  const toggle=(list:string[],value:string)=>list.includes(value)?list.filter(item=>item!==value):[...list,value];
  const summary=(member:ForumSettings['members'][number])=>{const m=[...new Set(member.expertise.map(row=>row.model).filter(Boolean))];const c=[...new Set(member.expertise.map(row=>row.component).filter(Boolean))];return {m,c};};
  const shown=experts.filter(member=>!filter||member.expertise.some(row=>row.model===filter||row.component===filter));
  const chips=(values:string[],list:string[],set:(next:string[])=>void,label:(v:string)=>string)=>{const all=values.length>0&&values.every(value=>list.includes(value));return <div className="role-scope-chips"><button type="button" className={'role-scope-all'+(all?' is-on':'')} aria-pressed={all} onClick={()=>set(all?list.filter(item=>!values.includes(item)):[...new Set([...list,...values])])}>{t('Alle')}</button>{values.map(value=><label key={value} className={list.includes(value)?'is-on':''}><input type="checkbox" checked={list.includes(value)} onChange={()=>set(toggle(list,value))}/>{label(value)}</label>)}</div>;};
  const otherComponents=catalog.components.filter(value=>OTHER_COMPONENTS.includes(value));const techComponents=catalog.components.filter(value=>!OTHER_COMPONENTS.includes(value));
  return <><WhatsAppStatus/><section className="role-assignment-panel forum-experts">
    <header className="role-head"><div><h2>{t('Fachexperten zuteilen')}</h2><p className="club-hint">{t('Mitglied suchen, Fahrzeuge und Technikbereiche ankreuzen, speichern. Ohne Fahrzeug gilt der Bereich für alle Modelle. Fachexperte ist keine Rolle, sondern eine Einstufung für Benachrichtigungen.')}</p></div></header>
    <div className="role-layout">
     <div className="role-editor">
      <div className="role-search"><label>{t('Mitglied suchen')}<input type="search" value={search} placeholder={t('Name, mind. 2 Zeichen')} onChange={e=>setSearch(e.target.value)}/></label>
       {search.trim().length>=2&&<ul className="role-search-results">{results.length?results.map(member=><li key={member.id}><button type="button" onClick={()=>pick(member)}><strong>{member.name}</strong>{member.expertise.some(row=>row.model||row.component)&&<em>{t('Fachexperte')}</em>}</button></li>):<li className="is-empty">{t('Keine passenden Personen gefunden.')}</li>}</ul>}
      </div>
      {!selected?<div className="role-empty"><p>{t('Wähle ein Mitglied über die Suche oder rechts in der Übersicht.')}</p></div>:<div className="role-person">
       <div className="role-person-head"><span className="role-avatar" aria-hidden="true">{selected.name.split(/\s+/).slice(0,2).map(part=>part[0]).join('')}</span><div><h3>{selected.name}</h3><p>{models.length||components.length?`${models.length} ${t('Fahrzeuge')} · ${components.length} ${t('Technikbereiche')}`:t('Noch keine Zuteilung')}</p></div><button type="button" className="market-text-button" onClick={()=>{if(!dirty||window.confirm(t('Ungespeicherte Änderungen verwerfen?'))){setSelected(null);setMessage('');}}}>{t('Schliessen')}</button></div>
       <section className="role-group"><h4>{t('Fahrzeuge')}</h4>{chips(vehicleModels,models,setModels,value=>value)}</section>
       <section className="role-group"><h4>{t('Technikbereiche')}</h4>{chips(techComponents,components,setComponents,value=>t(value))}</section>
       {otherComponents.length>0&&<section className="role-group"><h4>{t('Sonstiges')}</h4>{chips(otherComponents,components,setComponents,value=>t(value))}</section>}
       <div className="role-actions"><span role="status">{message?'✓ '+message:dirty?t('Ungespeicherte Änderungen'):''}</span>{(models.length>0||components.length>0)&&<button type="button" className="club-secondary" disabled={busy} onClick={()=>{setModels([]);setComponents([]);}}>{t('Alle entfernen')}</button>}<button type="button" className="market-primary" disabled={busy||!dirty} onClick={()=>void save()}>{busy?t('Wird gespeichert …'):t('Speichern')}</button></div>
      </div>}
     </div>
     <aside className="role-overview"><div className="role-overview-head"><h3>{t('Wer ist Experte wofür')} · {experts.length}</h3><select aria-label={t('Nach Thema filtern')} value={filter} onChange={e=>setFilter(e.target.value)}><option value="">{t('Alle Themen')}</option><optgroup label={t('Fahrzeuge')}>{vehicleModels.filter(model=>experts.some(member=>member.expertise.some(row=>row.model===model))).map(model=><option key={model} value={model}>{model}</option>)}</optgroup><optgroup label={t('Technikbereiche')}>{catalog.components.filter(component=>experts.some(member=>member.expertise.some(row=>row.component===component))).map(component=><option key={component} value={component}>{t(component)}</option>)}</optgroup></select></div>
      {shown.length?<ul className="expert-overview">{shown.map(member=>{const {m,c}=summary(member);return <li key={member.id}><button type="button" className={selected?.id===member.id?'is-selected':''} onClick={()=>pick(member)}><strong>{member.name}</strong><span className="role-chips">{m.map(model=><span key={model} className="role-chip">{model}</span>)}{c.map(component=><span key={component} className="role-chip is-members">{t(component)}</span>)}{!m.length&&c.length>0&&<span className="role-chip is-admin">{t('alle Modelle')}</span>}</span></button></li>;})}</ul>:<p className="club-hint">{t(filter?'Für dieses Thema ist noch niemand eingeteilt.':'Noch keine Fachexperten zugeteilt.')}</p>}
     </aside>
    </div>
  </section></>;
}

type WhatsAppInfo={enabled:boolean;webhookHost:string;webhookValid:boolean;templateDe:string;templateFr:string;myConsent:boolean;myPhone:string;subscribers:number;deliveries:{state:string;at:string;code:number}[]};
const testResults:Record<string,string>={accepted:'Make hat die Testnachricht angenommen. Sie sollte in Kürze auf Ihrem Handy eintreffen; sonst im Make-Verlauf nachsehen.',failed:'Make hat die Nachricht abgelehnt (siehe Code unten). Bitte Webhook und Szenario in Make prüfen.',uncertain:'Make war nicht erreichbar oder hat nicht rechtzeitig geantwortet.',disabled:'Der WhatsApp-Versand ist auf dem Server ausgeschaltet (STRC_MAKE_WHATSAPP_ENABLED).','incomplete-config':'Auf dem Server fehlen Webhook oder Vorlagennamen.','no-consent':'Für den Test bitte zuerst einen Forumsbereich abonnieren und «Zusätzlich per WhatsApp informieren» anhaken.',inactive:'Ihr Mitgliederkonto ist nicht aktiv.','no-phone':'In Ihrem Profil fehlt eine gültige Mobilnummer.','bad-webhook':'Die Webhook-Adresse ist ungültig (muss https://…make.com sein).','no-template':'Der Vorlagenname ist leer.',duplicate:'Diese Nachricht wurde bereits gesendet.'};
const deliveryStates:Record<string,string>={accepted:'angenommen',failed:'abgelehnt',uncertain:'unklar',sending:'wird gesendet'};

/** Forumsmoderation: Zustand der WhatsApp-Benachrichtigung über Make und Testnachricht an sich selbst. */
export function WhatsAppStatus(){
  const [info,setInfo]=useState<WhatsAppInfo|null>(null);const [nonce,setNonce]=useState('');const [busy,setBusy]=useState(false);const [result,setResult]=useState('');const [error,setError]=useState('');
  useEffect(()=>{const controller=new AbortController();query<{status:WhatsAppInfo;nonce:string}>('strc_forum_settings',{operation:'whatsapp-status'},controller.signal).then(value=>{setInfo(value.status);setNonce(value.nonce);}).catch(reason=>{if(!controller.signal.aborted)setError((reason as Error).message);});return()=>controller.abort();},[]);
  async function test(){setBusy(true);setResult('');setError('');try{const value=await mutate<{status:WhatsAppInfo;test:string;nonce:string}>('strc_forum_settings',nonce,fields({operation:'whatsapp-test'}));setInfo(value.status);setNonce(value.nonce);setResult(value.test);}catch(reason){setError((reason as Error).message);}finally{setBusy(false);}}
  if(error&&!info)return <p role="alert">{error}</p>;if(!info)return null;
  const check=(ok:boolean,label:string,detail='')=><li className={ok?'is-ok':'is-missing'}><span aria-hidden="true">{ok?'✓':'✗'}</span>{t(label)}{detail&&<small> · {detail}</small>}</li>;
  return <section className="whatsapp-status form-section"><h2>{t('WhatsApp-Benachrichtigung (Make)')}</h2>
    <ul>{check(info.enabled,'Versand auf dem Server eingeschaltet')}{check(info.webhookValid,'Make-Webhook hinterlegt',info.webhookHost)}{check(!!info.templateDe&&!!info.templateFr,'WhatsApp-Vorlagen DE / FR',[info.templateDe,info.templateFr].filter(Boolean).join(' / '))}{check(info.myConsent,'Ihre WhatsApp-Einwilligung im Forum')}{check(!!info.myPhone,'Ihre Mobilnummer im Profil',info.myPhone)}</ul>
    <p className="club-hint">{info.subscribers} {t('Mitglieder haben WhatsApp-Hinweise eingeschaltet.')}</p>
    <div className="club-actions"><button type="button" className="market-primary" disabled={busy} onClick={()=>void test()}>{t(busy?'Wird gesendet …':'Testnachricht an mich senden')}</button></div>
    {result&&<p role="status" className={result==='accepted'?'club-notice':'collection-state error'}>{t(testResults[result]||result)}</p>}{error&&<p role="alert">{error}</p>}
    {info.deliveries.length>0&&<><h3>{t('Letzte Zustellungen an Make')}</h3><table className="whatsapp-deliveries"><tbody>{info.deliveries.map((row,i)=><tr key={i}><td>{row.at?new Date(row.at).toLocaleString('de-CH'):''}</td><td>{t(deliveryStates[row.state]||row.state)}</td><td>{row.code?`HTTP ${row.code}`:''}</td></tr>)}</tbody></table></>}
  </section>;
}

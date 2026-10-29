'use client';
import {useEffect,useState} from 'react';
import {t} from './UILanguage';
import {fields,mutate,query} from './ClubApi';

type Text={subject:string;heading:string;body:string};
type Template={key:string;group:string;label:string;recipient:string;placeholders:string[];required:string[];note:string;woo:boolean;welcome:boolean;customized:boolean;enabled?:boolean;de:Text;fr:Text;default:{de:Text;fr:Text}};
type LogEntry={at:string;type:string;to:string;status:string;error:string};
const action='strc_mail_templates';

/** Redaktion: Mailvorlagen (DE/FR) mit Platzhaltern, Vorschau, Testmail an sich selbst und Versandprotokoll. Nur STRC-Admin/Superadmin. */
export default function MailTemplatesEditor(){
 const [templates,setTemplates]=useState<Template[]|null>(null);const [nonce,setNonce]=useState('');const [email,setEmail]=useState('');
 const [selected,setSelected]=useState('');const [tab,setTab]=useState<'templates'|'log'>('templates');const [error,setError]=useState('');const [revision,setRevision]=useState(0);
 useEffect(()=>{const controller=new AbortController();query<{templates:Template[];nonce:string;email:string}>(action,{operation:'list'},controller.signal).then(data=>{setTemplates(data.templates);setNonce(data.nonce);setEmail(data.email);}).catch(reason=>{if(!controller.signal.aborted)setError((reason as Error).message);});return()=>controller.abort();},[revision]);
 const current=templates?.find(row=>row.key===selected);
 const groups=templates?[...new Set(templates.map(row=>row.group))]:[];
 return <section className="mail-templates">
  <h2>{t('E-Mail-Vorlagen')}</h2>
  <p className="club-hint">{t('Betreff und Text der automatischen Mails auf Deutsch und Französisch. Platzhalter wie {{vorname}} füllt die Website beim Versand. Ohne Anpassung gelten die Standardtexte.')}</p>
  <div className="shop-tabs mail-tabs" role="tablist"><button type="button" role="tab" aria-selected={tab==='templates'} onClick={()=>setTab('templates')}>{t('Vorlagen')}</button><button type="button" role="tab" aria-selected={tab==='log'} onClick={()=>setTab('log')}>{t('Versandprotokoll')}</button></div>
  {error&&<p role="alert" className="collection-state error">{error}</p>}
  {tab==='log'?<MailLogView/>:!templates?!error&&<p role="status">{t('Vorlagen werden geladen …')}</p>
   :current?<TemplateForm key={current.key+':'+revision} template={current} nonce={nonce} email={email} back={()=>setSelected('')} saved={list=>{setTemplates(list);}}/>
   :groups.map(group=><div key={group} className="mail-group"><h3>{t(group)}</h3><ul className="mail-list">{templates.filter(row=>row.group===group).map(row=><li key={row.key}><button type="button" className="editorial-card" onClick={()=>setSelected(row.key)}><strong>{t(row.label)}</strong><span>{t('An')}: {t(row.recipient)}{row.customized?' · '+t('angepasst'):''}{row.welcome&&row.enabled===false?' · '+t('nicht aktiv'):''}</span></button></li>)}</ul></div>)}
  {current&&tab==='templates'&&<p><button type="button" className="market-text-button" onClick={()=>{setSelected('');setRevision(value=>value+1);}}>{t('← Alle Vorlagen')}</button></p>}
 </section>;
}

function TemplateForm({template,nonce,email,back,saved}:{template:Template;nonce:string;email:string;back:()=>void;saved:(list:Template[])=>void}){
 const [values,setValues]=useState<{de:Text;fr:Text}>({de:{...template.de},fr:{...template.fr}});const [enabled,setEnabled]=useState(!!template.enabled);
 const [language,setLanguage]=useState<'de'|'fr'>('de');const [busy,setBusy]=useState(false);const [notice,setNotice]=useState('');const [error,setError]=useState('');const [preview,setPreview]=useState<(Text&{html?:string})|null>(null);
 const text=values[language];
 const change=(field:keyof Text,value:string)=>{setValues(current=>({...current,[language]:{...current[language],[field]:value}}));setPreview(null);setNotice('');};
 const missing=template.woo?[]:template.required.filter(name=>!(text.subject+text.body).includes('{{'+name+'}}'));
 async function call(operation:'save'|'reset'|'preview'|'test'){
  setBusy(true);setError('');setNotice('');
  try{
   const result=await mutate<{message?:string;templates?:Template[];subject?:string;heading?:string;body?:string;html?:string}>(action,nonce,fields({operation,key:template.key,language,values:JSON.stringify(values),enabled:enabled?'1':'0'}));
   if(operation==='preview'){setPreview({subject:result.subject||'',heading:result.heading||'',body:result.body||'',html:result.html||''});return;}
   if(result.templates){saved(result.templates);const next=result.templates.find(row=>row.key===template.key);if(next&&operation==='reset')setValues({de:{...next.de},fr:{...next.fr}});}
   setNotice(result.message||'');
  }catch(reason){setError((reason as Error).message);}finally{setBusy(false);}
 }
 const insert=(name:string)=>change('body',text.body+(text.body.endsWith(' ')||!text.body?'':' ')+'{{'+name+'}}');
 return <div className="mail-form">
  <p className="eyebrow">{t(template.group)}</p><h3>{t(template.label)}</h3><p className="club-hint">{t('An')}: {t(template.recipient)}</p>
  {template.note&&<p className="club-hint">{t(template.note)}</p>}
  {template.welcome&&<label className="application-consent"><input type="checkbox" checked={enabled} onChange={e=>setEnabled(e.target.checked)}/>{t('Willkommensmail aktiv')}</label>}
  <div className="mail-language" role="group" aria-label={t('Sprache')}>{(['de','fr'] as const).map(code=><button key={code} type="button" className={language===code?'market-primary':'club-secondary'} aria-pressed={language===code} onClick={()=>{setLanguage(code);setPreview(null);}}>{code==='de'?'Deutsch':'Français'}</button>)}</div>
  <label>{t('Betreff')}<input value={text.subject} maxLength={200} onChange={e=>change('subject',e.target.value)} placeholder={template.woo?t('leer = WooCommerce-Standard'):''}/></label>
  {template.woo&&<label>{t('Überschrift in der Mail')}<input value={text.heading} maxLength={200} onChange={e=>change('heading',e.target.value)} placeholder={t('leer = WooCommerce-Standard')}/></label>}
  <label>{t(template.woo?'Text unter der Bestellung':'Text')}<textarea rows={12} value={text.body} maxLength={8000} onChange={e=>change('body',e.target.value)} placeholder={template.woo?t('leer = WooCommerce-Standard'):''}/></label>
  <p className="mail-placeholders">{t('Platzhalter (anklicken zum Einfügen)')}: {template.placeholders.map(name=><button key={name} type="button" className={'mail-chip'+(template.required.includes(name)?' is-required':'')} onClick={()=>insert(name)}>{'{{'+name+'}}'}</button>)}</p>
  {missing.length>0&&<p role="alert" className="club-notice">{t('Pflichtplatzhalter fehlt')}: {missing.map(name=>'{{'+name+'}}').join(', ')}</p>}
  <div className="club-actions"><button type="button" className="market-primary" disabled={busy||missing.length>0} onClick={()=>void call('save')}>{t(busy?'Wird gespeichert …':'Speichern')}</button><button type="button" className="club-secondary" disabled={busy} onClick={()=>void call('preview')}>{t('Vorschau')}</button><button type="button" className="club-secondary" disabled={busy||missing.length>0||!email} onClick={()=>void call('test')}>{t('Testmail an mich')}</button>{template.customized&&<button type="button" className="market-text-button" disabled={busy} onClick={()=>{if(window.confirm(t('Standardtext wiederherstellen? Deine Anpassung (DE und FR) wird verworfen.')))void call('reset');}}>{t('Standardtext wiederherstellen')}</button>}<button type="button" className="market-text-button" onClick={back}>{t('Abbrechen')}</button></div>
  {email&&<p className="club-hint">{t('Die Testmail geht nur an')} {email}.</p>}
  {notice&&<p role="status" className="club-notice">{t(notice)}</p>}{error&&<p role="alert" className="collection-state error">{error}</p>}
  {preview&&<div className="mail-preview" aria-label={t('Vorschau')}><p><strong>{t('Betreff')}:</strong> {preview.subject||t('(WooCommerce-Standard)')}</p>{template.woo&&<p><strong>{t('Überschrift')}:</strong> {preview.heading||t('(WooCommerce-Standard)')}</p>}{preview.html?<iframe className="mail-preview-frame" title={t('Vorschau')} sandbox="" srcDoc={preview.html}/>:<pre>{preview.body||t('(WooCommerce-Standard)')}</pre>}</div>}
 </div>;
}

function MailLogView(){
 const [entries,setEntries]=useState<LogEntry[]|null>(null);const [search,setSearch]=useState('');const [error,setError]=useState('');
 useEffect(()=>{const controller=new AbortController();const timer=setTimeout(()=>{query<{entries:LogEntry[]}>(action,{operation:'log',search},controller.signal).then(data=>setEntries(data.entries)).catch(reason=>{if(!controller.signal.aborted)setError((reason as Error).message);});},250);return()=>{clearTimeout(timer);controller.abort();};},[search]);
 return <div className="mail-log"><p className="club-hint">{t('Datum, Art, Empfänger und Ergebnis der letzten 90 Tage – ohne Inhalte. Ältere Einträge werden automatisch gelöscht.')}</p>
  <label className="market-search">{t('Suche nach Empfänger oder Art')}<input type="search" value={search} onChange={e=>setSearch(e.target.value)}/></label>
  {error&&<p role="alert">{error}</p>}{!entries&&!error&&<p role="status">{t('Wird geladen …')}</p>}
  {entries&&(entries.length?<div className="mail-log-table"><table><thead><tr><th scope="col">{t('Datum')}</th><th scope="col">{t('Art')}</th><th scope="col">{t('Empfänger')}</th><th scope="col">{t('Ergebnis')}</th></tr></thead><tbody>{entries.map((row,index)=><tr key={index} className={row.status==='ok'?'':'is-failed'}><td>{new Date(row.at).toLocaleString('de-CH',{dateStyle:'short',timeStyle:'short'})}</td><td>{t(row.type)}</td><td>{row.to}</td><td>{row.status==='ok'?t('versendet'):t('Fehler')+(row.error?': '+row.error:'')}</td></tr>)}</tbody></table></div>:<p className="collection-state">{t('Keine Einträge.')}</p>)}
 </div>;
}

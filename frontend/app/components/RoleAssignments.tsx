'use client';
import {useEffect,useMemo,useRef,useState} from 'react';
import {fields,mutate,query} from './ClubApi';
import {t} from './UILanguage';

type Assignment={role:string;regions:number[];libraryAccess:string;assignedEvents:number[];areas:string[]};
type Person={id:number;name:string;city:string;isMember:boolean;revision:string;assignments:Assignment[]};
type Data={users:Person[];regions:{id:number;name:string}[];roleOptions:Record<string,string>;areas:Record<string,string>;events:{id:number;title:string}[]};

const labels:Record<string,string>={strc_registration_moderator:'Mitgliederverwaltung',strc_event_organiser:'Veranstaltungsorganisator',strc_regional_manager:'Regionalleiter',strc_forum_moderator:'Forum-Moderator',strc_gallery_moderator:'Galerie-Moderator',strc_marketplace_moderator:'Marktplatz-Moderator',strc_library_administrator:'Bibliotheksverwalter',strc_shop_manager:'Shopmanager',strc_treasurer:'Kassier',strc_administrator_editor:'Admin (bisher Redaktor)',strc_administrator:'Admin',strc_superadmin:'Superadmin (Redaktor)',strc_board_member:'Vorstand',strc_developer:'Webmaster',strc_moderator:'Bisherige Bereichszuständigkeit'};
const descriptions:Record<string,string>={
 strc_superadmin:'Alle Admin-Rechte und ernennt die Admins.',
 strc_administrator:'Redaktion, Agenda, Forum, Galerie, Marktplatz, Bibliothek und Shop.',
 strc_developer:'Nur Technik: Konfiguration, Plugins, Fairgate-Abgleich.',
 strc_board_member:'Sieht alle Dokumente, auch Protokolle und Vorstandsunterlagen.',
 strc_registration_moderator:'Mitgliedsanträge, Paarmitgliedschaften, Willkommensmail.',
 strc_treasurer:'Zahlungen und Abrechnung der Anlässe, Shop-Kontrolle.',
 strc_regional_manager:'Regionalseite und Anlässe der gewählten Region.',
 strc_event_organiser:'Nur die zugewiesenen Anlässe und ihre Anmeldungen.',
 strc_forum_moderator:'Themen prüfen, anheften, zusammenführen, Fachexperten.',
 strc_gallery_moderator:'Fotos prüfen, Alben und Mitgliederporträts pflegen.',
 strc_marketplace_moderator:'Inserate prüfen und bereinigen.',
 strc_library_administrator:'Dokumente prüfen, einordnen und ersetzen.',
 strc_shop_manager:'Artikel, Lager, Bestellungen und Direktverkäufe.',
 strc_moderator:'Frühere Zuteilung nach Bereichen; bitte durch eine Rolle ersetzen.',
};
const groups:{title:string;hint?:string;roles:string[]}[]=[
 {title:'Administration',roles:['strc_superadmin','strc_administrator','strc_developer']},
 {title:'Dokumentzugang',roles:['strc_board_member']},
 {title:'Mitglieder und Finanzen',hint:'Nur mit eigener Rolle, auch für Admins.',roles:['strc_registration_moderator','strc_treasurer']},
 {title:'Agenda und Regionen',roles:['strc_regional_manager','strc_event_organiser']},
 {title:'Community und Shop',roles:['strc_forum_moderator','strc_gallery_moderator','strc_marketplace_moderator','strc_library_administrator','strc_shop_manager']},
];
const order=groups.flatMap(group=>group.roles);
const regional=(role:string)=>['strc_regional_manager','strc_event_organiser','strc_moderator'].includes(role);
// Dokumentstufe aus der Rolle (siehe RoleAssignments::limited): Vorstand → alle; Regionalleitung, Admin, Superadmin, Bibliothek → Regional; sonst Mitglied.
const regionalDocs=['strc_regional_manager','strc_administrator','strc_superadmin','strc_library_administrator'];
const libraryAccess=(role:string)=>role==='strc_board_member'?'restricted':regionalDocs.includes(role)?'limited':'open';
const documentLevel=(rows:Assignment[])=>rows.some(row=>row.role==='strc_board_member')?'Vorstand':rows.some(row=>regionalDocs.includes(row.role))?'Regional':'Mitglied';
const higher=(options:Record<string,string>)=>options.strc_superadmin?[]:options.strc_administrator?['strc_superadmin','strc_developer']:['strc_administrator','strc_superadmin','strc_developer'];
const lockText=(role:string)=>role==='strc_administrator'?'Teilt der Superadmin zu':['strc_superadmin','strc_developer'].includes(role)?'Teilt der Webmaster zu':'Nicht zuteilbar';
const roleColors:Record<string,string>={strc_board_member:'is-board',strc_administrator:'is-admin',strc_superadmin:'is-admin',strc_developer:'is-admin',strc_registration_moderator:'is-members',strc_treasurer:'is-members'};
const copy=(user:Person):Person=>({...user,assignments:user.assignments.map(row=>({...row,regions:[...row.regions],areas:[...row.areas],assignedEvents:[...row.assignedEvents]}))});
const normal=(rows:Assignment[])=>JSON.stringify([...rows].sort((a,b)=>a.role.localeCompare(b.role)).map(row=>({...row,regions:[...row.regions].sort(),assignedEvents:[...row.assignedEvents].sort(),areas:[...row.areas].sort()})));

export default function RoleAssignments({nonce}:{nonce:string}){
 const [data,setData]=useState<Data|null>(null),[person,setPerson]=useState<Person|null>(null),[original,setOriginal]=useState(''),[search,setSearch]=useState(''),[revision,setRevision]=useState(0),[busy,setBusy]=useState(false),[filter,setFilter]=useState(''),[error,setError]=useState(''),[notice,setNotice]=useState(''),[eventSearch,setEventSearch]=useState('');
 const editor=useRef<HTMLDivElement>(null);
 useEffect(()=>{const controller=new AbortController();query<Data>('strc_editorial',{operation:'people'},controller.signal).then(result=>{setData(result);setPerson(null);setError('');}).catch(reason=>{if(!controller.signal.aborted)setError(reason.message);});return()=>controller.abort();},[revision]);
 const dirty=!!person&&normal(person.assignments)!==original;
 function select(user:Person){if(dirty&&!window.confirm(t('Ungespeicherte Änderungen verwerfen?')))return;setSearch('');setPerson(copy(user));setOriginal(normal(user.assignments));setNotice('');setError('');setEventSearch('');requestAnimationFrame(()=>editor.current?.scrollIntoView({behavior:'smooth',block:'start'}));}
 function update(role:string,value:Partial<Assignment>){if(person)setPerson({...person,assignments:person.assignments.map(row=>row.role===role?{...row,...value}:row)});}
 function toggle(role:string,on:boolean){if(!person)return;setNotice('');setPerson({...person,assignments:on?[...person.assignments,{role,regions:[],libraryAccess:libraryAccess(role),assignedEvents:[],areas:[]}]:person.assignments.filter(row=>row.role!==role)});}
 async function save(){if(!person)return;const missing=person.assignments.find(row=>row.role==='strc_regional_manager'&&!row.regions.length);if(missing){setError(t('Bitte für den Regionalleiter eine Region wählen.'));return;}setBusy(true);setError('');setNotice('');try{const result=await mutate<{assignments:Assignment[];revision:string}>('strc_editorial',nonce,fields({operation:'assign',userId:String(person.id),revision:person.revision,assignments:JSON.stringify(person.assignments)}));const saved={...person,...result};setPerson(copy(saved));setOriginal(normal(saved.assignments));setData(value=>value?{...value,users:value.users.map(user=>user.id===saved.id?saved:user)}:value);setNotice('Gespeichert.');}catch(reason){setError((reason as Error).message);}finally{setBusy(false);}}
 const term=search.trim().toLocaleLowerCase('de-CH');
 const matches=useMemo(()=>term.length<2||!data?[]:data.users.filter(user=>`${user.name} ${user.city}`.toLocaleLowerCase('de-CH').includes(term)).slice(0,8),[term,data]);
 const assigned=useMemo(()=>(data?.users.filter(user=>user.assignments.length>0)||[]).sort((x,y)=>x.name.localeCompare(y.name,'de-CH')),[data]);
 const byRole=useMemo(()=>{const map:Record<string,Person[]>={};for(const user of assigned)for(const row of user.assignments)(map[row.role]||=[]).push(user);return map;},[assigned]);
 const regionName=(id:number)=>data?.regions.find(region=>region.id===id)?.name||String(id);
 if(!data)return <section className="role-assignment-panel"><h2>{t('Rollen und Zuständigkeiten')}</h2>{error?<p role="alert">{t(error)} <button type="button" className="club-secondary" onClick={()=>setRevision(value=>value+1)}>{t('Neu laden')}</button></p>:<p role="status">{t('Mitglieder werden geladen …')}</p>}</section>;
 const accountEditable=!!person&&!person.assignments.some(row=>higher(data.roleOptions).includes(row.role));
 const has=(role:string)=>!!person?.assignments.some(row=>row.role===role);
 const legacy=person?.assignments.filter(row=>!order.includes(row.role))||[];
 const roleCard=(role:string)=>{
  const row=person?.assignments.find(entry=>entry.role===role);const allowed=!!data.roleOptions[role];
  if(!allowed&&!row)return <li key={role} className="role-option is-locked"><span className="role-option-check" aria-hidden="true">🔒</span><span><strong>{t(labels[role]||role)}</strong><small>{t(descriptions[role]||'')}</small><em>{t(lockText(role))}</em></span></li>;
  const events=data.events.filter(event=>!eventSearch||event.title.toLocaleLowerCase('de-CH').includes(eventSearch.toLocaleLowerCase('de-CH')));
  return <li key={role} className={'role-option'+(row?' is-on':'')}>
   <label><input type="checkbox" checked={!!row} disabled={!allowed||busy||!accountEditable||(!row&&!person?.isMember)} onChange={event=>toggle(role,event.target.checked)}/><span><strong>{t(labels[role]||role)}</strong><small>{t(descriptions[role]||'')}</small>{!allowed&&row&&<em>{t(lockText(role))}</em>}</span></label>
   {row&&regional(role)&&<fieldset className="role-scope" disabled={!allowed||busy||!accountEditable}><legend>{t(role==='strc_regional_manager'?'Region *':'Region (optional)')}</legend><div className="role-scope-chips">{data.regions.map(region=><label key={region.id} className={row.regions.includes(region.id)?'is-on':''}><input type="checkbox" checked={row.regions.includes(region.id)} onChange={event=>update(role,{regions:event.target.checked?[...row.regions,region.id]:row.regions.filter(id=>id!==region.id)})}/>{region.name}</label>)}</div></fieldset>}
   {row&&role==='strc_event_organiser'&&<fieldset className="role-scope" disabled={!allowed||busy||!accountEditable}><legend>{t('Zugewiesene Anlässe')} ({row.assignedEvents.length})</legend>{data.events.length>8&&<input type="search" placeholder={t('Anlass suchen')} value={eventSearch} onChange={event=>setEventSearch(event.target.value)}/>}<div className="role-scope-list">{events.map(event=><label key={event.id}><input type="checkbox" checked={row.assignedEvents.includes(event.id)} onChange={change=>update(role,{assignedEvents:change.target.checked?[...row.assignedEvents,event.id]:row.assignedEvents.filter(id=>id!==event.id)})}/>{event.title}</label>)}</div><small>{t('Selbst erstellte Anlässe werden automatisch zugewiesen.')}</small></fieldset>}
  </li>;
 };
 return <section className="role-assignment-panel">
  <header className="role-head"><div><h2>{t('Rollen und Zuständigkeiten')}</h2><p className="club-hint">{t('Mitglied suchen, Rollen ankreuzen, speichern. Ein Mitglied kann mehrere Rollen haben.')}</p></div>
   <ol className="role-ladder" aria-label={t('Stufen')}>{[['Webmaster','Technik'],['Superadmin','ernennt Admins'],['Admin','Administration'],['Moderatoren','eigener Bereich'],['Mitglieder','eigenes Profil']].map(([name,text])=><li key={name}><strong>{t(name)}</strong><span>{t(text)}</span></li>)}</ol>
  </header>
  {error&&<p className="club-notice is-error" role="alert">{t(error)} <button type="button" className="market-text-button" onClick={()=>{setError('');setRevision(value=>value+1);}} disabled={busy}>{t('Neu laden')}</button></p>}
  <div className="role-layout">
   <div className="role-editor" ref={editor}>
    <div className="role-search"><label>{t('Mitglied suchen')}<input type="search" value={search} placeholder={t('Name oder Ort, mind. 2 Zeichen')} onChange={event=>setSearch(event.target.value)} disabled={busy}/></label>
     {term.length>=2&&<ul className="role-search-results">{matches.length?matches.map(user=><li key={user.id}><button type="button" onClick={()=>select(user)}><strong>{user.name}</strong>{user.city&&<span>{user.city}</span>}{user.assignments.length>0&&<em>{user.assignments.length} {t(user.assignments.length===1?'Rolle':'Rollen')}</em>}</button></li>):<li className="is-empty">{t('Keine passenden Personen gefunden.')}</li>}</ul>}
    </div>
    {!person?<div className="role-empty"><p>{t('Wähle ein Mitglied über die Suche oder rechts in der Übersicht.')}</p></div>:<div className="role-person">
     <div className="role-person-head"><span className="role-avatar" aria-hidden="true">{person.name.split(/\s+/).slice(0,2).map(part=>part[0]).join('')}</span><div><h3>{person.name}</h3><p>{person.city}{person.city?' · ':''}{t('Bibliothek')}: <strong>{t(documentLevel(person.assignments))}</strong></p></div><button type="button" className="market-text-button" onClick={()=>{if(!dirty||window.confirm(t('Ungespeicherte Änderungen verwerfen?'))){setPerson(null);setNotice('');}}}>{t('Schliessen')}</button></div>
     {!person.isMember&&<p className="club-notice">{t('Kein aktives Mitgliedskonto: Rollen können erst mit Mitgliedschaft zugeteilt werden.')}</p>}
     {!accountEditable&&<p className="club-notice">{t('Die Rollen dieses Kontos verwaltet eine höhere Stufe (Superadmin oder Webmaster).')}</p>}
     {groups.map(group=><section key={group.title} className="role-group"><h4>{t(group.title)}{group.hint&&<small>{t(group.hint)}</small>}</h4><ul>{group.roles.map(roleCard)}</ul></section>)}
     {legacy.length>0&&<section className="role-group"><h4>{t('Bisherige Zuteilungen')}</h4><ul>{legacy.map(row=><li key={row.role} className="role-option is-on"><label><input type="checkbox" checked disabled={busy||!accountEditable} onChange={()=>toggle(row.role,false)}/><span><strong>{t(labels[row.role]||row.role)}</strong><small>{t(descriptions[row.role]||'Bitte durch eine aktuelle Rolle ersetzen.')}</small>{row.areas.length>0&&<small>{row.areas.map(area=>t(data.areas[area]||area)).join(', ')}</small>}</span></label></li>)}</ul></section>}
     <div className="role-actions"><span role="status">{notice?'✓ '+t(notice):dirty?t('Ungespeicherte Änderungen'):''}</span><button type="button" className="club-secondary" disabled={!dirty||busy} onClick={()=>{const user=data.users.find(value=>value.id===person.id);if(user){setPerson(copy(user));setNotice('');}}}>{t('Verwerfen')}</button><button type="button" className="market-primary" disabled={!dirty||busy||!accountEditable} onClick={()=>void save()}>{busy?t('Wird gespeichert …'):t('Speichern')}</button></div>
    </div>}
   </div>
   <aside className="role-overview"><div className="role-overview-head"><h3>{t('Wer macht was')} · {assigned.length}</h3><select aria-label={t('Rolle filtern')} value={filter} onChange={event=>setFilter(event.target.value)}><option value="">{t('Alle Rollen')}</option>{order.filter(role=>byRole[role]).map(role=><option key={role} value={role}>{t(labels[role]||role)} ({byRole[role].length})</option>)}</select></div>
    {[...order,...Object.keys(byRole).filter(role=>!order.includes(role))].filter(role=>byRole[role]&&(!filter||filter===role)).map(role=><section key={role} className="role-overview-group"><h4><span className={'role-chip '+(roleColors[role]||'')}>{t(labels[role]||role)}</span><small>{byRole[role].length}</small></h4><ul>{byRole[role].map(user=>{const row=user.assignments.find(entry=>entry.role===role)!;return <li key={user.id}><button type="button" className={person?.id===user.id?'is-selected':''} onClick={()=>select(user)}><strong>{user.name}</strong><span>{[row.regions.length?row.regions.map(regionName).join(', '):'',row.assignedEvents.length?`${row.assignedEvents.length} ${t(row.assignedEvents.length===1?'Anlass':'Anlässe')}`:'',user.city].filter(Boolean).join(' · ')}</span></button></li>;})}</ul></section>)}
    {!assigned.length&&<p className="club-hint">{t('Noch keine Rollen zugeteilt.')}</p>}
    <p className="club-hint role-docs-hint">{t('Bibliothek: Mitglieder sehen alle Dokumente ausser «Regional» und «Vorstand». Regionalleitungen, Admins und die Bibliotheksverwaltung sehen zusätzlich «Regional». Nur der Vorstand sieht alles.')}</p>
   </aside>
  </div>
 </section>;
}

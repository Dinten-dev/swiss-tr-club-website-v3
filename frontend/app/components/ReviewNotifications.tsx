'use client';
import {useEffect,useState} from 'react';
import {t} from './UILanguage';
import {fields,mutate,query} from './ClubApi';
import {Dialog} from './Marketplace';

type Settings={nonce:string;reviewer:boolean;accountEmail:string;preferences:{email:boolean;address:string}|null};

/** Nur für Prüfende (Galerie, Bibliothek, Marktplatz): E-Mails zu neuen Einreichungen ein-/ausschalten und an eine eigene Adresse senden. */
export default function ReviewNotifications(){
 const [data,setData]=useState<Settings|null>(null);const [email,setEmail]=useState(true);const [address,setAddress]=useState('');const [busy,setBusy]=useState(false);const [message,setMessage]=useState('');const [open,setOpen]=useState(false);
 useEffect(()=>{const controller=new AbortController();query<Settings>('strc_review_notifications',{},controller.signal).then(result=>{setData(result);if(result.preferences){setEmail(result.preferences.email);setAddress(result.preferences.address);}}).catch(()=>{});return()=>controller.abort();},[]);
 if(!data?.reviewer||!data.preferences)return null;
 const dirty=email!==data.preferences.email||address.trim()!==data.preferences.address;
 async function save(){if(!data)return;setBusy(true);setMessage('');try{const result=await mutate<Settings>('strc_review_notifications',data.nonce,fields({operation:'save',email:email?'1':'0',address:address.trim()}));setData(result);setMessage(t('Gespeichert.'));}catch(error){setMessage((error as Error).message);}finally{setBusy(false);}}
 const close=()=>{setOpen(false);setMessage('');if(data.preferences){setEmail(data.preferences.email);setAddress(data.preferences.address);}};
 return <><button type="button" className="club-secondary" onClick={()=>setOpen(true)}>{t('Benachrichtigungen')}{!data.preferences.email&&<span className="db-badge-off">{' · '}{t('aus')}</span>}</button>
 {open&&<Dialog title={t('Benachrichtigungen zu neuen Mitgliederbeiträgen')} close={close}><div className="review-notifications">
  <p className="club-hint">{t('Neue Einreichungen (Galerie, Bibliothek, Marktplatz) erscheinen immer hier im Dashboard. Die E-Mail dazu kannst du ausschalten oder an eine andere Adresse senden lassen.')}</p>
  <label className="application-consent"><input type="checkbox" checked={email} disabled={busy} onChange={e=>setEmail(e.target.checked)}/><span>{t('E-Mail-Benachrichtigung senden')}</span></label>
  {email&&<label className="review-address">{t('E-Mail-Adresse für diese Benachrichtigungen (optional)')}<input type="email" maxLength={200} value={address} placeholder={data.accountEmail} disabled={busy} onChange={e=>setAddress(e.target.value)}/><small>{t('Leer = Adresse deines Kontos')}</small></label>}
  <div className="club-actions"><button type="button" className="club-secondary" onClick={close}>{t('Schliessen')}</button><button type="button" className="market-primary" disabled={busy||!dirty} onClick={()=>void save()}>{busy?t('Wird gespeichert …'):t('Speichern')}</button>{message&&<span role="status">{message}</span>}</div>
 </div></Dialog>}</>;
}

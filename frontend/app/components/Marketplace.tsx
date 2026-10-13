'use client';
import {t} from './UILanguage';
import {query as clubQuery,mutate as clubMutate} from './ClubApi';
import {useCatalog} from './ClubCatalog';
import {vehicleModels} from './FormFields';
import LandingIntroduction from './LandingIntroduction';
import {RichHtml,useSiteContent} from './SiteContent';

import { useEffect, useRef, useState, useId, type ReactNode } from 'react';
import Image from 'next/image';

export type MarketplaceSession = {
  authenticated: boolean;
  memberAccess: boolean;
  canCreateAd?: boolean;
  marketplaceNonce?: string | null;
};
type Ad = {
  id: number; title: string; description: string; descriptionHtml?:string; price: string;
  category: string; images: string[]; imageIds:number[]; seller: string; createdAt: string; status:string; canReview:boolean; expiresAt:string;
  mine: boolean; sold: boolean; details:Record<string,string|string[]>;
};
type Collection = { ads: Ad[]; total: number; pages: number };
const categories = ['Teile', 'Fahrzeuge', 'Zubehör', 'Sonstiges'];
const listedParts=(ad:Ad):string[]=>Array.isArray(ad.details?.parts)&&ad.details.parts.length?ad.details.parts:[ad.title];
function priceLabel(ad:Ad){return ad.details?.offerType==='free'?'Kostenlos':ad.details?.offerType==='swap'?'Tausch':ad.details?.priceMode==='request'?'Preis auf Anfrage':currency.format(Number(ad.price))+(ad.details?.priceMode==='negotiable'?' VB':'');}
const currency = new Intl.NumberFormat('de-CH', { style: 'currency', currency: 'CHF' });
const wordpressUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL ?? 'http://localhost:8080';
const frontendUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
const loginUrl = `${wordpressUrl}/wp-login.php?redirect_to=${encodeURIComponent(`${frontendUrl}/#marktplatz`)}`;

function query<T>(parameters:Record<string,string>,signal?:AbortSignal){return clubQuery<T>('strc_marketplace',parameters,signal);}
function mutate<T>(form:FormData,nonce:string){return clubMutate<T>('strc_marketplace',nonce,form);}

export function Dialog({ title, close, busy = false, children }: { title: string; close: () => void; busy?: boolean; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);const titleId=useId();
  useEffect(() => {
    const dialog = ref.current;
    const previousFocus = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = 'hidden';
    return () => { dialog?.close(); document.body.style.overflow = overflow; previousFocus?.focus(); };
  }, []);
  return <dialog ref={ref} className="market-dialog" aria-labelledby={titleId} onCancel={event => { event.preventDefault(); if (!busy) close(); }}>
    <div className="market-dialog-heading"><h2 id={titleId}>{title}</h2><button type="button" className="market-close" aria-label={t("Fenster schliessen")} disabled={busy} onClick={close}>×</button></div>
    {children}
  </dialog>;
}

export default function Marketplace({ section, session, notify }: { section:string; session: MarketplaceSession | null; notify: (message: string) => void }) {
  const {text:c}=useSiteContent();
  const area=section==='ersatzteile'?'parts':section==='fahrzeuge'?'cars':'landing';
  const [collection, setCollection] = useState<Collection>({ ads: [], total: 0, pages: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [model, setModel] = useState('');
  const [mine]=useState(section==='meine');
  const [page, setPage] = useState(1);
  const [revision, setRevision] = useState(0);
  const [creating, setCreating] = useState(false);const [editing,setEditing]=useState<Ad|null>(null);
  const [selected, setSelected] = useState<Ad | null>(null);
  const createButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if(area==='landing')return;
    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      setLoading(true); setError('');
      query<Collection>({ operation: 'list', mine:mine?'1':'0', search, category:area==='parts'?'parts':'Fahrzeuge', model:area==='parts'?model:'', page: String(page) }, controller.signal)
        .then(result => { if (!controller.signal.aborted) setCollection(result); })
        .catch(reason => { if (!controller.signal.aborted) setError(reason.message); })
        .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    }, 200);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [area, search, model, mine, session?.memberAccess, page, revision]);

  function refresh() { setLoading(true); setRevision(value => value + 1); }
  function changeFilter(change: () => void) { setLoading(true); change(); setPage(1); }

  if(area==='landing')return <><section className="page-hero"><p className="eyebrow">{t('Marktplatz')}</p><h1>{c('market.title')}</h1><p>{c('market.intro')}</p></section><LandingIntroduction documentKey="market"/><section className="page-content marketplace market-entry" aria-label="Marktplatzbereiche"><div className="landing-grid landing-grid-three market-landing"><a className="landing-card" href="#tr-shop"><h2>{c('market.shopTitle')}</h2><p>{c('market.shopText')}</p><span className="landing-card-link">TR-Shop öffnen</span></a><a className="landing-card" href="#marktplatz/ersatzteile"><h2>{c('market.partsTitle')}</h2><p>{c('market.partsText')}</p><span className="landing-card-link">Ersatzteile ansehen</span></a><a className="landing-card" href="#marktplatz/fahrzeuge"><h2>{c('market.carsTitle')}</h2><p>{c('market.carsText')}</p><span className="landing-card-link">Fahrzeuge ansehen</span></a></div></section></>;

  const parts=area==='parts';
  const title=parts?c('market.partsTitle'):c('market.carsTitle');

  return <>
    <section className="page-hero"><p className="eyebrow">{t('Marktplatz')}</p><h1>{title}</h1><p>{parts?c('market.partsText'):c('market.carsText')}</p></section>
    <section className="page-content marketplace market-section" aria-label={title}>
      <a className="market-back" href="#marktplatz">Marktplatz-Übersicht</a>
      <div className="market-toolbar"><div><h2>{parts?'Ersatzteile finden':'Fahrzeuge entdecken'}</h2><p>{parts?c('market.partsGuide'): 'Entdecke Triumphs aus dem Club und öffne ein Inserat für Bilder und Details.'}</p></div>{session?.canCreateAd&&<button ref={createButton} className="market-primary" onClick={() => setCreating(true)}>＋ Inserat erstellen</button>}</div>
      <a className="page-back" href="#marktplatz">{t("← Zur Marktplatzübersicht")}</a><div className="market-filters market-part-filters">{section==='meine'&&<p>{t('Meine Inserate')}</p>}{parts&&<label className="market-search">Triumph-Modell<select value={model} onChange={event=>changeFilter(()=>setModel(event.target.value))}><option value="">{t('Alle Modelle')}</option>{vehicleModels.map(value=><option key={value} value={value}>{value}</option>)}</select></label>}<label className="market-search">{parts?'Teil oder Stichwort':'Fahrzeug suchen'}<input type="search" placeholder={parts?'z. B. Einspritzung':'z. B. TR6'} value={search} onChange={event => changeFilter(() => setSearch(event.target.value))}/></label></div>
      {loading ? <p className="collection-state" role="status">{t("Inserate werden geladen …")}</p> : error ? <div className="collection-state error" role="alert">{error}<button className="market-text-button" onClick={refresh}>{t('Erneut versuchen')}</button></div> : <>
        <p className="market-count" role="status">{collection.total} {collection.total === 1 ? 'Inserat' : 'Inserate'}{parts?' mit verfügbaren Teilen':' mit Fahrzeugen'}</p>
        {!collection.ads.length ? <div className="market-empty"><span aria-hidden="true">◇</span><h3>Keine passenden Inserate.</h3><p>{search||model?'Versuche ein anderes Modell oder Stichwort.':'Sobald Clubmitglieder etwas anbieten, erscheint es hier.'}</p></div> : parts ? <ul className="market-parts-list" aria-label="Verfügbare Teile">{collection.ads.flatMap(ad=>listedParts(ad).map((part,index)=><li key={`${ad.id}-${index}`}><button type="button" onClick={()=>setSelected(ad)} aria-label={`${part}, Inserat ${ad.title} ansehen`}><span className="market-part-thumb">{ad.images[0]?<Image unoptimized src={ad.images[0]} alt="" width={112} height={80}/>:<span aria-hidden="true">◇</span>}</span><span className="market-part-copy"><strong>{part}</strong><small>{listedParts(ad).length>1?`${listedParts(ad).length} Teile in einem Inserat · `:''}{ad.details?.model||ad.category} · {ad.title}</small></span><span className="market-part-price">{priceLabel(ad)}{listedParts(ad).length>1&&<small>für das Inserat</small>}</span></button></li>))}</ul> : <div className="market-grid">{collection.ads.map(ad => <article className="market-card" key={ad.id}>
          <button className="market-card-open" onClick={() => setSelected(ad)} aria-label={`${ad.title}, ${priceLabel(ad)}, Details ansehen`}>
            <div className="market-card-image">{ad.images[0] ? <Image unoptimized src={ad.images[0]} alt={ad.title} width={600} height={420}/> : <span>Ohne Bild</span>}{ad.sold && <b className="market-sold">Verkauft</b>}</div>
            <div className="market-card-copy"><p className="eyebrow">{ad.category}{ad.mine ? ' · Ihr Inserat' : ''}</p><h3>{ad.title}</h3><strong>{priceLabel(ad)}</strong><p className="market-excerpt">{ad.description}</p></div>
          </button><div className="market-card-footer">{ad.seller} · {new Date(ad.createdAt).toLocaleDateString('de-CH')}</div>
        </article>)}</div>}
        {collection.pages > 1 && <div className="market-pagination"><button disabled={page === 1} onClick={() => { setLoading(true); setPage(page - 1); }}>{t('Zurück')}</button><span>{t("Seite")} {page} {t("von")} {collection.pages}</span><button disabled={page >= collection.pages} onClick={() => { setLoading(true); setPage(page + 1); }}>{t("Weiter")}</button></div>}
      </>}
    </section>
    {creating && <CreateDialog session={session} initialCategory={parts?'Teile':'Fahrzeuge'} close={() => setCreating(false)} created={() => { setCreating(false); setSearch(''); setModel(''); setPage(1); refresh(); notify('Ihr Inserat wurde zur Prüfung eingereicht.'); requestAnimationFrame(() => createButton.current?.focus()); }}/>}
    {editing&&<CreateDialog ad={editing} session={session} initialCategory={editing.category==='Fahrzeuge'?'Fahrzeuge':'Teile'} close={()=>setEditing(null)} created={()=>{setEditing(null);refresh();notify('Änderungen wurden zur Prüfung eingereicht.');}}/>}
    {selected && <AdDialog edit={()=>{setEditing(selected);setSelected(null);}} ad={selected} session={session} close={() => setSelected(null)} sold={() => { setSelected(null); refresh(); notify('Inserat gespeichert.'); requestAnimationFrame(() => createButton.current?.focus()); }}/>}
  </>;
}

function CreateDialog({ ad,session, initialCategory, close, created }: {ad?:Ad; session: MarketplaceSession | null; initialCategory:'Teile'|'Fahrzeuge'; close: () => void; created: () => void }) {
  const catalog=useCatalog();
  const [title, setTitle] = useState(ad?.title||'');
  const [price, setPrice] = useState(ad?.price||'');
  const [offerType,setOfferType]=useState(String(ad?.details.offerType||'sale'));const [priceMode,setPriceMode]=useState(String(ad?.details.priceMode||'fixed'));
  const [description, setDescription] = useState(ad?.description||'');
  const [category, setCategory] = useState<string>(ad?.category||initialCategory);
  const [parts,setParts]=useState(Array.isArray(ad?.details.parts)?ad.details.parts.join('\n'):'');const [retained,setRetained]=useState(ad?.imageIds||[]);
  const [images, setImages] = useState<{ file: File; url: string }[]>([]);
  const imageUrls = useRef(new Set<string>());
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const submitting = useRef(false);
  const [error, setError] = useState('');
  const [imageError, setImageError] = useState('');
  const [discard, setDiscard] = useState(false);
  const errorRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => { const urls = imageUrls.current; return () => { urls.forEach(url => URL.revokeObjectURL(url)); }; }, []);

  function requestClose() {
    if (title || price || description || parts || images.length) setDiscard(true);
    else close();
  }
  function addImages(files: File[]) {
    setImageError('');
    if (retained.length + images.length + files.length > 5) { setImageError('Bitte höchstens 5 Bilder auswählen.'); return; }
    if (files.some(file => !['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || !file.size || file.size > 20 * 1024 * 1024)) {
      setImageError('Bitte JPG, PNG oder WebP verwenden, maximal 20 MB pro Bild.'); return;
    }
    setImages(current => [...current, ...files.map(file => { const url = URL.createObjectURL(file); imageUrls.current.add(url); return { file, url }; })]);
  }

  return <Dialog title={t(ad?"Inserat bearbeiten":"Inserat erstellen")} close={requestClose} busy={busy}>
    {!session ? <p role="status">Anmeldung wird geprüft …</p> : !session?.canCreateAd || !session.marketplaceNonce ? <div className="market-login"><p>Mit Ihrem Mitgliedskonto können Sie ein Inserat veröffentlichen. Titel, Preis, Beschreibung und Bilder sind öffentlich sichtbar. Ihre E-Mail-Adresse sehen nur angemeldete Mitglieder.</p><a className="market-primary" href={loginUrl}>{t('Mitglieder-Login')}</a></div> : <form className="market-form" onSubmit={async event => {
      event.preventDefault();
      if (submitting.current) return;
      if (offerType==='sale'&&priceMode!=='request'&&(!/^\d{1,7}([.,]\d{1,2})?$/.test(price.trim()) || Number(price.replace(',', '.')) > 1000000)) { setError('Bitte einen Preis von CHF 0 bis CHF 1’000’000 mit höchstens zwei Nachkommastellen eingeben.'); return; }
      submitting.current = true; setBusy(true); setError('');
      const form = new FormData(event.currentTarget);
      form.set('offerType',offerType);form.set('priceMode',priceMode);form.set('operation',ad?'edit':'create');if(ad){form.set('id',String(ad.id));form.set('retainedImageIds',JSON.stringify(retained));} form.set('title', title); form.set('price', price); form.set('description', description); form.set('category', category);
      form.set('parts',parts);form.set('models',JSON.stringify(form.getAll('models[]')));form.delete('models[]');
      images.forEach(image => form.append('images[]', image.file));
      try { await mutate<Ad>(form, session.marketplaceNonce!); created(); }
      catch (reason) { setError(reason instanceof Error ? reason.message : 'Speichern fehlgeschlagen.'); requestAnimationFrame(() => errorRef.current?.focus()); }
      finally { submitting.current = false; setBusy(false); }
    }}>
      <p className="market-form-intro">In wenigen Schritten online. Pflichtfelder sind mit * markiert. Gesuche gehören ins Forum.</p>
      <fieldset disabled={busy}>
        <legend className="market-sr-only">Angaben zum Inserat</legend>
        <div className={`market-dropzone ${dragging ? 'is-dragging' : ''}`} onDragOver={event => { event.preventDefault(); if (!busy) setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={event => { event.preventDefault(); setDragging(false); if (!busy) addImages(Array.from(event.dataTransfer.files)); }}>
          <span className="market-drop-icon" aria-hidden="true">＋</span><strong>Bilder hier hineinziehen</strong><span>{t("oder vom Gerät auswählen")}</span><input id="ad-images" type="file" accept="image/jpeg,image/png,image/webp" multiple aria-label="Bilder auswählen" aria-describedby="ad-images-hint" onChange={event => { addImages(Array.from(event.target.files || [])); event.target.value = ''; }}/><small id="ad-images-hint">Optional · bis zu 5 Bilder · JPG, PNG, WebP · je 20 MB</small>
        </div>
        {imageError && <p className="market-error" role="alert">{imageError}</p>}
        {ad&&<div className="market-image-previews">{ad.imageIds.map((id,index)=>retained.includes(id)&&<div key={id}><Image unoptimized src={ad.images[index]} alt={ad.title} width={180} height={140}/><button type="button" aria-label={t('Bild entfernen')} onClick={()=>setRetained(current=>current.filter(value=>value!==id))}>×</button></div>)}</div>}
        {!!images.length && <div className="market-image-previews">{images.map((image, index) => <div key={image.url}><Image unoptimized src={image.url} alt={`Vorschau: ${image.file.name}`} width={180} height={140}/><span>{index === 0 ? 'Titelbild' : `Bild ${index + 1}`}</span><button type="button" aria-label={`${image.file.name} entfernen`} onClick={() => { URL.revokeObjectURL(image.url); imageUrls.current.delete(image.url); setImages(current => current.filter(item => item.url !== image.url)); setImageError(''); }}>×</button></div>)}</div>}
        <div className="market-form-row"><div><label>{t('Angebotsart')}<select value={offerType} onChange={e=>setOfferType(e.target.value)}><option value="sale">{t('Verkauf')}</option><option value="swap">{t('Tausch')}</option><option value="free">{t('Kostenlos abzugeben')}</option></select></label></div><div><label>{t('Preisangabe')}<select value={priceMode} onChange={e=>setPriceMode(e.target.value)} disabled={offerType!=='sale'}><option value="fixed">{t('Festpreis')}</option><option value="negotiable">{t('Verhandlungsbasis')}</option><option value="request">{t('Preis auf Anfrage')}</option></select></label></div></div><label htmlFor="ad-title">{t('Inserat-Titel *')}</label><input id="ad-title" name="title" value={title} onChange={event => setTitle(event.target.value)} required maxLength={100} placeholder="z. B. Speichenräder für Triumph TR6"/>
        <div className="market-form-row"><div><label htmlFor="ad-price">{t("Preis in CHF")}{offerType==='sale'&&priceMode!=='request'?' *':' (nicht erforderlich)'}</label><input id="ad-price" name="price" inputMode="decimal" value={price} onChange={event => setPrice(event.target.value)} required={offerType==='sale'&&priceMode!=='request'} disabled={offerType!=='sale'||priceMode==='request'} maxLength={11} placeholder="z. B. 250.00"/><small>CHF 0 = kostenlos abzugeben</small></div><div><label htmlFor="ad-category">{t("Kategorie")}</label><select id="ad-category" value={category} onChange={event => setCategory(event.target.value)}>{(initialCategory==='Fahrzeuge'?['Fahrzeuge']:categories.filter(value=>value!=='Fahrzeuge')).map(value => <option key={value} value={value}>{t(value)}</option>)}</select></div></div>
        <div className="market-form-row"><div><label>{t('Standort *')}<input name="location" defaultValue={String(ad?.details.location||'')} required maxLength={160} placeholder="Ort / Region"/></label></div><div><label>{t('Zustand *')}<select name="condition" defaultValue={String(ad?.details.condition||'')} required><option value="">{t('Bitte wählen')}</option>{['Neu','Neuwertig','Gebraucht – gut','Gebraucht – mit Mängeln','Restaurierungsbedürftig','Fahrbereit','In Restauration'].map(v=><option key={v} value={v}>{t(v)}</option>)}</select></label></div></div>{category==='Fahrzeuge'?<label>{t('Modell *')}<select name="model" defaultValue={String(ad?.details.model||'')} required><option value="">{t('Bitte wählen')}</option>{vehicleModels.map(v=><option key={v} value={v}>{v}</option>)}</select></label>:<fieldset className="market-model-options"><legend>{t('Passende Modelle (optional)')}</legend>{vehicleModels.map(v=><label key={v}><input type="checkbox" name="models[]" value={v} defaultChecked={(Array.isArray(ad?.details.models)?ad.details.models:[ad?.details.model]).includes(v)}/>{v}</label>)}</fieldset>}{category==='Fahrzeuge'?<><div className="market-form-row"><div><label>{t('Baujahr *')}<input name="year" defaultValue={String(ad?.details.year||'')} type="number" required min={1900} max={new Date().getFullYear()+1}/></label></div><div><label>{t('Aussenfarbe (optional)')}<input name="exteriorColour" defaultValue={String(ad?.details.exteriorColour||'')} maxLength={160}/></label></div></div><label>{t('Innenfarbe (optional)')}<input name="interiorColour" defaultValue={String(ad?.details.interiorColour||'')} maxLength={160}/></label><label>Restaurationsarbeiten und Zeitpunkt (optional)<textarea name="restoration" defaultValue={String(ad?.details.restoration||'')} maxLength={2000} rows={3}/></label></>:<label>{t('Teilebereich (optional)')}<select name="partCategory" defaultValue={String(ad?.details.partCategory||'')}><option value="">{t('Bitte wählen')}</option>{catalog.parts.map(v=><option key={v} value={v}>{t(v)}</option>)}</select></label>}
        {category==='Teile'&&<label htmlFor="ad-parts">Enthaltene Teile (optional)<textarea id="ad-parts" name="parts" value={parts} onChange={event=>setParts(event.target.value)} rows={4} maxLength={2000} placeholder={'Kurbelwelle\nEinspritzanlage\nScheinwerfer'}/><small>Ein Teil pro Zeile, maximal 20. Alle Teile erscheinen einzeln in der Kurzliste; der Preis gilt für das gesamte Inserat.</small></label>}
        <label htmlFor="ad-description">{t('Beschreibung *')}</label><textarea id="ad-description" name="description" value={description} onChange={event => setDescription(event.target.value)} rows={5} required maxLength={5000} placeholder="Was bieten Sie an? Zustand, passende Modelle, Abholung oder Versand …"/><small>{description.length}/5000 Zeichen</small>
      </fieldset>
      <p className="market-privacy">Interessenten erreichen Sie über das Kontaktformular im Inserat. Ihre persönlichen Kontaktdaten werden nicht öffentlich angezeigt.</p>
      {error && <p ref={errorRef} tabIndex={-1} className="market-error" role="alert">{error}</p>}
      {discard ? <div className="market-discard"><p>Ungespeichertes Inserat verwerfen?</p><button type="button" onClick={() => setDiscard(false)}>Weiter bearbeiten</button><button type="button" onClick={close}>Verwerfen</button></div> : <div className="market-form-actions"><button type="button" className="market-cancel" disabled={busy} onClick={requestClose}>{t('Abbrechen')}</button><button className="market-primary" type="submit" disabled={busy}>{busy ? 'Wird eingereicht …' : 'Zur Prüfung einreichen'}</button></div>}
    </form>}
  </Dialog>;
}

function AdDialog({ ad, session, close, sold,edit }: {edit:()=>void; ad: Ad; session: MarketplaceSession | null; close: () => void; sold: () => void }) {
  const [activeImage, setActiveImage] = useState(0);
  const [contactSent, setContactSent] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [confirmSold, setConfirmSold] = useState(false);
  return <Dialog title={ad.title} close={close} busy={busy}>
    {!!ad.images.length && <div className="market-gallery"><div className="market-gallery-stage"><Image unoptimized className="market-detail-image" src={ad.images[activeImage]} alt={`${ad.title}, Bild ${activeImage + 1} von ${ad.images.length}`} width={900} height={600}/>{ad.images.length>1&&<div className="market-gallery-controls"><button type="button" aria-label={t("Vorheriges Inseratbild")} onClick={()=>setActiveImage(index=>(index-1+ad.images.length)%ad.images.length)}>‹</button><span aria-live="polite">{activeImage+1} / {ad.images.length}</span><button type="button" aria-label={t("Nächstes Inseratbild")} onClick={()=>setActiveImage(index=>(index+1)%ad.images.length)}>›</button></div>}</div>{ad.images.length > 1 && <div className="market-thumbnails" aria-label="Alle Inseratbilder">{ad.images.map((url, index) => <button type="button" key={`${url}-${index}`} aria-label={`Bild ${index + 1} anzeigen`} aria-pressed={index === activeImage} onClick={() => setActiveImage(index)}><Image unoptimized src={url} alt="" width={100} height={80}/></button>)}</div>}</div>}
    <div className="market-detail-meta"><span>{ad.category}{ad.sold ? ' · Verkauft' : ''}</span><strong>{priceLabel(ad)}</strong></div>
    {ad.category==='Teile'&&Array.isArray(ad.details?.parts)&&ad.details.parts.length>0&&<section className="market-detail-parts"><h3>Enthaltene Teile</h3><ul>{ad.details.parts.map((part,index)=><li key={`${part}-${index}`}>{part}</li>)}</ul>{ad.details.parts.length>1&&<p>Der angezeigte Preis gilt für das gesamte Inserat.</p>}</section>}
    {ad.details&&<dl className="profile-facts">{Object.entries({location:'Standort',condition:'Zustand',model:'Modell',year:'Baujahr',exteriorColour:'Aussenfarbe',interiorColour:'Innenfarbe',colour:'Farbe',partCategory:'Teilebereich',restoration:'Restaurationsarbeiten'}).map(([key,label])=>ad.details[key]?<div key={key}><dt>{label}</dt><dd>{key==='model'&&Array.isArray(ad.details.models)?ad.details.models.join(', '):ad.details[key]}</dd></div>:null)}</dl>}{ad.descriptionHtml?<RichHtml html={ad.descriptionHtml}/>:<p className="market-description">{ad.description}</p>}<p className="market-seller">Angeboten von {ad.seller} · {new Date(ad.createdAt).toLocaleDateString('de-CH')}</p>
    {ad.status!=='publish'&&<p className="club-notice">{ad.status==='pending'?'In Prüfung':'Entwurf / zurückgezogen'}</p>}
    {ad.mine&&<button className="club-secondary" disabled={busy} onClick={edit}>{t('Inserat bearbeiten')}</button>}{ad.expiresAt&&<p>{t(new Date(ad.expiresAt)<new Date()?'Abgelaufen am':'Gültig bis')} {new Date(ad.expiresAt).toLocaleDateString('de-CH')}</p>}
    {(ad.canReview||ad.mine)&&<div className="club-actions">{(ad.canReview?['approve','reject']:['withdraw','renew']).map(operation=><button key={operation} disabled={busy} className="club-secondary" onClick={async()=>{setBusy(true);try{const data=new FormData();data.set('operation',operation);data.set('id',String(ad.id));await mutate(data,session?.marketplaceNonce||'');sold();}catch(reason){setError((reason as Error).message);}finally{setBusy(false);}}}>{({approve:'Öffentlich freigeben',reject:'Ablehnen',withdraw:'Zurückziehen',renew:'Erneut zur Prüfung einreichen'} as Record<string,string>)[operation]}</button>)}</div>}
    {error && <p className="market-error" role="alert">{error}</p>}
    {!ad.sold && ad.status==='publish' && (ad.mine ? <div className="market-sale-actions">{confirmSold ? <><p>Als verkauft markieren? Das Inserat bleibt unter «Nur meine Inserate» sichtbar.</p><button className="market-cancel" disabled={busy} onClick={() => setConfirmSold(false)}>{t('Zurück')}</button><button className="market-primary" disabled={busy} onClick={async () => {
      setBusy(true); setError(''); const form = new FormData(); form.set('operation', 'sold'); form.set('id', String(ad.id));
      try { await mutate<Ad>(form, session?.marketplaceNonce || ''); sold(); } catch (reason) { setError(reason instanceof Error ? reason.message : 'Speichern fehlgeschlagen.'); } finally { setBusy(false); }
    }}>{busy ? 'Wird gespeichert …' : 'Verkauf bestätigen'}</button></> : <button className="market-primary" onClick={() => setConfirmSold(true)}>{t('Als verkauft markieren')}</button>}</div> : <form className="market-seller-contact" onSubmit={async event=>{event.preventDefault();setBusy(true);setError('');const form=new FormData(event.currentTarget);form.set('operation','contact');form.set('id',String(ad.id));try{const contactNonce=session?.marketplaceNonce||await query<{nonce:string}>({operation:'config'}).then(v=>v.nonce);await mutate<{sent:boolean}>(form,contactNonce||'');setContactSent(true);}catch(reason){setError(reason instanceof Error?reason.message:'Anfrage konnte nicht gesendet werden.');}finally{setBusy(false);}}}><h3>{t('Verkäufer kontaktieren')}</h3><input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="market-sr-only"/>{contactSent?<p role="status">{t("Ihre Anfrage wurde an den Verkäufer gesendet.")}</p>:<><label>{t('Name *')}<input name="name" required maxLength={120} autoComplete="name"/></label><label>{t('E-Mail-Adresse *')}<input name="email" type="email" required maxLength={254} autoComplete="email"/></label><label>{t('Telefon (optional)')}<input name="phone" type="tel" maxLength={40} autoComplete="tel"/></label><label>{t('Nachricht *')}<textarea name="message" required maxLength={2000} rows={4}/></label><button className="market-primary" disabled={busy}>{busy?'Wird gesendet …':'Anfrage senden'}</button></>}</form>)}
  </Dialog>;
}

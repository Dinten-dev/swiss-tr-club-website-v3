'use client';
// Kasse für den Direktverkauf (Ablauf Redaktion 3.11.2026): Kasse öffnen (Verkäufer), Artikel aus dem Sortiment
// in die Kasse legen, Kunde aus der Mitgliederliste oder Gast, bar oder TWINT/Karte (QR-Code), Kasse schliessen.
import {useEffect,useRef,useState} from 'react';
import {t} from './UILanguage';
import {Dialog} from './Marketplace';
import {mutate,query,fields,wordpressUrl} from './ClubApi';

export type PosItem={id:number;parent:number;name:string;price:string;stock:number|null;attributes:Record<string,string>};
export type PosMember={id:number;name:string;city:string;board:boolean};
export type PosSale={id:number;number:string;customer:string;items:string[];total:string;method:'cash'|'zahls';status:string};
export type PosSession={id:string;seller:number;sellerName:string;label:string;openedAt:string;orders:PosSale[];cash:number;online:number;pending:number};
export type PosOptions={products:PosItem[];members:PosMember[];events:{id:number;title:string}[];session:PosSession|null;zahlsReady:boolean};
export type CartRow={id:number;name:string;price:string;quantity:number};

const chf=(value:number|string)=>`CHF ${Number(value).toLocaleString('de-CH',{minimumFractionDigits:2,maximumFractionDigits:2})}`;
const CART_KEY='strc-pos-cart';

/** Inhalt der Kasse; bleibt beim Wechsel zwischen Sortiment und Kasse und beim Neuladen auf diesem Gerät erhalten. */
export function usePosCart(){
 const [cart,setCart]=useState<CartRow[]>(()=>{if(typeof window==='undefined')return [];try{const stored=JSON.parse(window.localStorage.getItem(CART_KEY)||'[]');return Array.isArray(stored)?stored.filter(row=>row&&typeof row.id==='number'&&typeof row.quantity==='number'):[];}catch{return [];}});
 useEffect(()=>{try{window.localStorage.setItem(CART_KEY,JSON.stringify(cart));}catch{/* Speicher nicht verfügbar: Kasse bleibt nur im Speicher */}},[cart]);
 const add=(item:PosItem,quantity:number)=>setCart(rows=>{const found=rows.find(row=>row.id===item.id);return found?rows.map(row=>row.id===item.id?{...row,quantity:row.quantity+quantity}:row):[...rows,{id:item.id,name:item.name,price:item.price,quantity}];});
 return {cart,setCart,add};
}

/** «In die Kasse» auf der Sortimentskarte: Optionen wie im Online-Shop wählen. */
export function PosAddButton({productId,items,add}:{productId:number;items:PosItem[];add:(item:PosItem,quantity:number)=>void}){
 const choices=items.filter(item=>item.parent===productId);const [open,setOpen]=useState(false);const [picked,setPicked]=useState<Record<string,string>>({});const [quantity,setQuantity]=useState(1);const [added,setAdded]=useState('');
 if(!choices.length)return <span className="shop-purchase-unavailable" aria-disabled="true">{t('Nicht an Lager')}</span>;
 const names=Array.from(new Set(choices.flatMap(item=>Object.keys(item.attributes))));
 const valuesFor=(name:string)=>Array.from(new Set(choices.filter(item=>names.every(other=>other===name||!picked[other]||item.attributes[other]===picked[other])).map(item=>item.attributes[name]).filter(Boolean)));
 const match=names.length?choices.find(item=>names.every(name=>item.attributes[name]===picked[name])):choices[0];
 const put=(item:PosItem)=>{add(item,quantity);setAdded(item.name);setOpen(false);setPicked({});setQuantity(1);};
 return <>{added&&<small className="pos-added" role="status">✓ {t('In der Kasse')}</small>}<button type="button" className="market-primary shop-product-link pos-add" onClick={()=>{setAdded('');if(!names.length&&choices[0])put(choices[0]);else setOpen(true);}}>{t('In die Kasse')} ＋</button>
  {open&&<Dialog title={t('In die Kasse')} close={()=>setOpen(false)}><div className="club-form pos-add-form">{names.map(name=><label key={name}>{t(name)}<select value={picked[name]||''} onChange={e=>setPicked(current=>({...current,[name]:e.target.value}))}><option value="">{t('Bitte wählen')}</option>{valuesFor(name).map(value=><option key={value} value={value}>{value}</option>)}</select></label>)}<label>{t('Menge')}<input type="number" min={1} max={99} value={quantity} onChange={e=>setQuantity(Math.max(1,Math.min(99,Number(e.target.value)||1)))}/></label>
   {match?<p className="pos-match">{match.name} · {chf(match.price)}{match.stock!==null?` · ${t('Bestand')} ${match.stock}`:''}</p>:<p className="club-hint">{t('Bitte alle Optionen wählen.')}</p>}
   <div className="club-actions"><button type="button" className="club-secondary" onClick={()=>setOpen(false)}>{t('Abbrechen')}</button><button type="button" className="market-primary" disabled={!match} onClick={()=>match&&put(match)}>{t('In die Kasse legen')}</button></div></div></Dialog>}</>;
}

/** Mitgliedersuche mit Shortlist (ab zwei Buchstaben). */
function MemberSearch({members,value,change,label,filter}:{members:PosMember[];value:number;change:(id:number)=>void;label:string;filter?:(member:PosMember)=>boolean}){
 const [text,setText]=useState('');const selected=members.find(member=>member.id===value);
 const needle=text.trim().toLowerCase();
 const shortlist=needle.length<2?[]:members.filter(member=>(!filter||filter(member))&&(member.name.toLowerCase().includes(needle)||member.city.toLowerCase().includes(needle))).slice(0,8);
 if(selected)return <div className="pos-member-chip"><span>{label}: <strong>{selected.name}</strong>{selected.city?` · ${selected.city}`:''}</span><button type="button" className="market-text-button" onClick={()=>{change(0);setText('');}}>{t('Ändern')}</button></div>;
 return <div className="pos-member-search"><label>{label}<input type="search" value={text} autoComplete="off" placeholder={t('Name oder Ort eingeben …')} onChange={e=>setText(e.target.value)}/></label>{shortlist.length>0&&<ul className="pos-shortlist" role="listbox">{shortlist.map(member=><li key={member.id}><button type="button" onClick={()=>{change(member.id);setText('');}}><strong>{member.name}</strong>{member.city&&<small>{member.city}</small>}</button></li>)}</ul>}{needle.length>=2&&!shortlist.length&&<p className="club-hint">{t('Kein Mitglied gefunden.')}</p>}</div>;
}

type Review={total:string;regular:string;reviewToken:string;address:{first_name:string;last_name:string;address_1:string;postcode:string;city:string;email:string}};
type Result={id:number;message:string;url:string;invoiceUrl?:string;payUrl?:string;status?:string};

/** Ansicht «Direktverkauf»: Kasse öffnen/schliessen, Verkauf, Telefonbestellung oder Geschenk erfassen. */
export function ShopPos({nonce,options,reload,cart,setCart}:{nonce:string;options:PosOptions|null;reload:()=>void;cart:CartRow[];setCart:(update:(rows:CartRow[])=>CartRow[])=>void}){
 const [kind,setKind]=useState<'direct'|'manual'|'gift'>('direct');const [customer,setCustomer]=useState(0);const [guest,setGuest]=useState(false);
 const [fulfilment,setFulfilment]=useState('handover');const [freeShipping,setFreeShipping]=useState(false);const [payment,setPayment]=useState<'cash'|'zahls'>('cash');const [purpose,setPurpose]=useState('');
 const [review,setReview]=useState<Review|null>(null);const [result,setResult]=useState<Result|null>(null);const [paid,setPaid]=useState(false);const [busy,setBusy]=useState(false);const [error,setError]=useState('');const [notice,setNotice]=useState('');
 const [seller,setSeller]=useState(0);const [label,setLabel]=useState('');const [closing,setClosing]=useState(false);const [pick,setPick]=useState('');
 const request=useRef(crypto.randomUUID());const form=useRef<HTMLFormElement>(null);
 const session=options?.session||null;const effectiveFulfilment=kind==='manual'&&fulfilment==='handover'?'shipping':fulfilment;
 // TWINT/Karte: Zahlungseingang abfragen, bis zahls.ch die Zahlung bestätigt.
 useEffect(()=>{if(!result?.payUrl||paid)return;const timer=window.setInterval(()=>{query<{paid:boolean;status:string}>('strc_shop',{operation:'pos-sale',id:String(result.id)}).then(state=>{if(state.paid){setPaid(true);reload();}else if(state.status==='cancelled'||state.status==='failed')setError(t('Die Zahlung wurde abgebrochen.'));}).catch(()=>{});},3000);return()=>window.clearInterval(timer);},[result,paid,reload]);
 if(!options)return <p role="status">{t('Kasse wird geladen …')}</p>;
 const total=cart.reduce((sum,row)=>sum+Number(row.price)*row.quantity,0);
 const reset=()=>{setReview(null);setResult(null);setPaid(false);setCustomer(0);setGuest(false);setFulfilment('handover');setFreeShipping(false);setPurpose('');setError('');request.current=crypto.randomUUID();form.current?.reset();};
 async function run(operation:string,values:Record<string,string>,done:(data:{message?:string})=>void){setBusy(true);setError('');try{const data=await mutate<{message?:string}>('strc_shop',nonce,fields({operation,...values}));done(data);}catch(reason){setError((reason as Error).message);}finally{setBusy(false);}}
 async function submit(){if(!form.current||busy)return;if(!cart.length){setError(t('Die Kasse ist leer. Artikel im Sortiment mit «In die Kasse» hinzufügen.'));return;}setBusy(true);setError('');
  const data=new FormData(form.current);data.set('operation','order-save');data.set('requestId',request.current);data.set('kind',kind);data.set('fulfilment',effectiveFulfilment);data.set('items',JSON.stringify(cart.map(row=>({id:row.id,quantity:String(row.quantity)}))));data.set('customerId',guest?'0':String(customer));data.set('payment',payment);data.set('purpose',purpose);data.set('freeShipping',freeShipping?'1':'0');data.set('preview',review?'0':'1');if(review)data.set('reviewToken',review.reviewToken);
  try{if(!review){setReview(await mutate<Review>('strc_shop',nonce,data));}else{const saved=await mutate<Result>('strc_shop',nonce,data);setResult(saved);setReview(null);setCart(()=>[]);if(!saved.payUrl)reload();}}catch(reason){setError((reason as Error).message);setReview(null);}finally{setBusy(false);}}
 const kinds:[typeof kind,string][]=[['direct','Direktverkauf (Kasse)'],['manual','Telefonbestellung'],['gift','Geschenk']];
 const changed=()=>{setReview(null);setError('');};
 return <div className="pos">
  {/* Kasse */}
  <section className={'pos-session'+(session?' is-open':'')}>{session?<><div><p className="eyebrow">{t('Kasse geöffnet')}</p><h3>{t('Verkäufer')}: {session.sellerName}</h3><p>{session.label?`${session.label} · `:''}{t('seit')} {new Date(session.openedAt).toLocaleString('de-CH',{dateStyle:'short',timeStyle:'short'})} · {session.orders.length} {t('Verkäufe')} · {t('Bar')} {chf(session.cash)} · {t('TWINT/Karte')} {chf(session.online)}</p></div>
   {closing?<div className="pos-close-confirm"><p>{t('Kasse schliessen?')} {session.cash>0?<>{t('Die Bareinnahmen von')} <strong>{chf(session.cash)}</strong> {t('werden')} {session.sellerName} {t('per E-Mail mit QR-Einzahlungsschein in Rechnung gestellt.')}</>:t('Es gibt keine Bareinnahmen abzurechnen.')}</p><div className="club-actions"><button type="button" className="club-secondary" onClick={()=>setClosing(false)}>{t('Abbrechen')}</button><button type="button" className="market-primary" disabled={busy} onClick={()=>void run('pos-close',{session:session.id},data=>{setClosing(false);setNotice(data.message||'');reload();})}>{t('Kasse jetzt schliessen')}</button></div></div>:<button type="button" className="club-secondary" disabled={busy||session.pending>0} title={session.pending>0?t('Zuerst offene TWINT-/Kartenzahlungen abschliessen.'):''} onClick={()=>setClosing(true)}>{t('Kasse schliessen')}</button>}
   {session.orders.length>0&&<details className="pos-sales"><summary>{t('Verkäufe dieser Kasse')}</summary><ul>{session.orders.map(sale=><li key={sale.id}><span>#{sale.number} · {sale.customer||t('Gast')}</span><span>{sale.items.join(', ')}</span><strong>{chf(sale.total)} · {t(sale.method==='cash'?'Bar':'TWINT/Karte')}{sale.status==='pending'?` · ${t('Zahlung offen')}`:sale.status==='cancelled'?` · ${t('Storniert')}`:''}</strong>{sale.status==='pending'&&<button type="button" className="market-text-button" disabled={busy} onClick={()=>void run('pos-cancel',{id:String(sale.id)},data=>{setNotice(data.message||'');reload();})}>{t('Stornieren')}</button>}</li>)}</ul></details>}</>
   :<><div><p className="eyebrow">{t('Kasse geschlossen')}</p><h3>{t('Kasse öffnen')}</h3><p className="club-hint">{t('Wähle das Mitglied, das am Stand verkauft und die Bareinnahmen abrechnet.')}</p></div><div className="club-form"><MemberSearch members={options.members} value={seller} change={setSeller} label={t('Verkäufer/in')}/><label>{t('Anlass oder Ort (optional)')}<input value={label} onChange={e=>setLabel(e.target.value)} maxLength={120} placeholder={t('z. B. Herbsttreffen Jura')}/></label><button type="button" className="market-primary" disabled={!seller||busy} onClick={()=>void run('pos-open',{seller:String(seller),label},()=>{setSeller(0);setLabel('');setKind('direct');reload();})}>{t('Kasse öffnen')}</button></div></>}
  </section>
  {notice&&<p className="club-notice" role="status">{t(notice)}</p>}
  {/* Ergebnis des letzten Verkaufs */}
  {result?<section className="pos-result" aria-live="polite">{result.payUrl&&!paid?<><h3>{t('Bitte bezahlen: TWINT oder Karte')}</h3><p>{t('Der Kunde scannt den QR-Code mit dem Handy und bezahlt dort. Die Bestätigung erscheint hier automatisch.')}</p>
     {/* eslint-disable-next-line @next/next/no-img-element -- QR-Code als SVG direkt vom Server */}
     <img className="pos-qr" src={`${wordpressUrl}/wp-admin/admin-ajax.php?action=strc_shop&operation=pos-qr&id=${result.id}`} alt={t('QR-Code zur Zahlung')} width={240} height={240}/>
     <p><a href={result.payUrl} target="_blank" rel="noopener noreferrer">{t('Zahlungsseite auf diesem Gerät öffnen')}</a></p>{error&&<p role="alert">{error}</p>}
     <div className="club-actions"><button type="button" className="club-secondary" disabled={busy} onClick={()=>void run('pos-cancel',{id:String(result.id)},data=>{setNotice(data.message||'');reset();reload();})}>{t('Verkauf stornieren')}</button></div></>
    :<><h3>✓ {paid?t('Bezahlt'):t('Gespeichert')}</h3><p>{paid?t('Die Zahlung ist eingegangen.'):t(result.message)}</p><div className="club-actions">{result.invoiceUrl&&<a className="club-secondary" href={result.invoiceUrl} target="_blank" rel="noopener noreferrer">{t('Rechnung (PDF)')}</a>}<button type="button" className="market-primary" onClick={reset}>{t('Nächster Verkauf')}</button></div></>}</section>
  :<form ref={form} className="club-form pos-checkout" onChange={changed} onSubmit={e=>{e.preventDefault();void submit();}}><fieldset disabled={busy}>
   <div className="pos-kinds" role="radiogroup" aria-label={t('Transaktionsart')}>{kinds.map(([key,label])=><label key={key}><input type="radio" name="kindChoice" checked={kind===key} onChange={()=>{setKind(key);setFulfilment(key==='manual'?'shipping':'handover');changed();}}/>{t(label)}</label>)}</div>
   {kind==='direct'&&!session&&<p className="club-notice" role="alert">{t('Für den Direktverkauf zuerst oben die Kasse öffnen.')}</p>}
   {/* Warenkorb der Kasse */}
   <section className="pos-cart"><h3>{t('Kasse')} ({cart.reduce((sum,row)=>sum+row.quantity,0)})</h3>{cart.length?<ul>{cart.map(row=><li key={row.id}><span>{row.name}</span><input type="number" min={1} max={99} aria-label={t('Menge')} value={row.quantity} onChange={e=>{const quantity=Math.max(1,Math.min(99,Number(e.target.value)||1));setCart(rows=>rows.map(item=>item.id===row.id?{...item,quantity}:item));changed();}}/><strong>{chf(Number(row.price)*row.quantity)}</strong><button type="button" className="market-text-button" onClick={()=>{setCart(rows=>rows.filter(item=>item.id!==row.id));changed();}}>{t('Entfernen')}</button></li>)}</ul>:<p className="club-hint">{t('Noch leer. Im Sortiment bei einem Artikel «In die Kasse» wählen oder hier einen Artikel hinzufügen.')}</p>}
    <div className="pos-pick"><select value={pick} aria-label={t('Artikel hinzufügen')} onChange={e=>setPick(e.target.value)}><option value="">{t('Artikel hinzufügen …')}</option>{options.products.map(item=><option key={item.id} value={item.id}>{item.name} · {chf(item.price)}</option>)}</select><button type="button" className="club-secondary" disabled={!pick} onClick={()=>{const item=options.products.find(row=>String(row.id)===pick);if(item){setCart(rows=>{const found=rows.find(row=>row.id===item.id);return found?rows.map(row=>row.id===item.id?{...row,quantity:row.quantity+1}:row):[...rows,{id:item.id,name:item.name,price:item.price,quantity:1}];});setPick('');changed();}}}>＋</button></div>
    {cart.length>0&&kind!=='gift'&&<p className="pos-total">{t('Total Artikel')}: <strong>{chf(total)}</strong></p>}</section>
   {/* Kunde */}
   <section><h3>{t(kind==='gift'?'Empfänger':'Kunde')}</h3><div className="pos-kinds"><label><input type="radio" name="customerType" checked={!guest} onChange={()=>{setGuest(false);changed();}}/>{t('Mitglied')}</label><label><input type="radio" name="customerType" checked={guest} onChange={()=>{setGuest(true);setCustomer(0);changed();}}/>{t(kind==='gift'?'Externe Person':'Gast (nicht Mitglied)')}</label></div>
    {!guest?<><MemberSearch members={options.members} value={customer} change={id=>{setCustomer(id);changed();}} label={t('Mitglied suchen')} filter={kind==='gift'&&purpose==='board'?member=>member.board:undefined}/>{customer>0&&<p className="club-hint">{t('Name, E-Mail und Adresse werden aus dem Mitgliederprofil übernommen; leere Felder unten ergänzen das Profil nur für diese Bestellung.')}</p>}</>
    :<div className="club-form-row"><label>{t('Vorname *')}<input name="firstName" required maxLength={100}/></label><label>{t('Nachname *')}<input name="lastName" required maxLength={100}/></label><label>{t(kind==='manual'?'E-Mail *':'E-Mail (optional)')}<input name="email" type="email" required={kind==='manual'} maxLength={200}/></label></div>}
    {(guest||effectiveFulfilment==='shipping'||kind==='manual')&&<div className="club-form-row">{(effectiveFulfilment==='shipping'||kind==='manual')&&<label>{t(guest?'Strasse *':'Strasse (falls abweichend)')}<input name="street" required={guest} maxLength={200}/></label>}<label>{t(guest&&(effectiveFulfilment==='shipping'||kind==='manual')?'PLZ *':'PLZ')}<input name="postcode" required={guest&&(effectiveFulfilment==='shipping'||kind==='manual')} maxLength={15}/></label><label>{t(guest?'Wohnort *':'Ort (falls abweichend)')}<input name="city" required={guest&&kind!=='gift'} maxLength={100}/></label></div>}</section>
   {/* Geschenk */}
   {kind==='gift'&&<section><h3>{t('Clubzweck')}</h3><div className="pos-kinds">{([['board','Vorstand'],['prize','Preisvergabe'],['other','Anderes']] as [string,string][]).map(([key,label])=><label key={key}><input type="radio" name="purposeChoice" checked={purpose===key} onChange={()=>{setPurpose(key);changed();}}/>{t(label)}</label>)}</div><label>{t(purpose==='other'?'Clubzweck angeben *':'Bemerkung (optional)')}<input name="reason" required={purpose==='other'} maxLength={500}/></label></section>}
   {/* Übergabe */}
   <section><h3>{t('Übergabe')}</h3><div className="pos-kinds">{(kind==='manual'?[['shipping','Versand nach Zahlung'],['pickup','An einem Anlass abgeben']]:[['handover','Nimmt den Artikel gleich mit'],['shipping','Versand'],['pickup','Abholung an einem Anlass']]).map(([key,label])=><label key={key}><input type="radio" name="fulfilmentChoice" checked={effectiveFulfilment===key} onChange={()=>{setFulfilment(key);changed();}}/>{t(label)}</label>)}</div>
    {effectiveFulfilment==='shipping'&&kind==='direct'&&<label className="application-consent"><input type="checkbox" checked={freeShipping} onChange={e=>{setFreeShipping(e.target.checked);changed();}}/>{t('Gratisversand (nur beim Direktverkauf)')}</label>}
    {effectiveFulfilment==='shipping'&&kind!=='gift'&&!freeShipping&&<label>{t('Versandkosten CHF *')}<input name="shipping" required inputMode="decimal" defaultValue={new Date().getFullYear()>=2027?'12.00':'10.00'}/></label>}
    {effectiveFulfilment==='shipping'&&<p className="club-hint">{t('Der Lieferschein geht wie bei Online-Bestellungen an Brunau.')}</p>}
    {effectiveFulfilment==='pickup'&&<label>{t('Veranstaltung *')}<select name="eventId" required><option value="">{t('Bitte wählen')}</option>{options.events.map(event=><option key={event.id} value={event.id}>{event.title}</option>)}</select></label>}</section>
   {/* Zahlung */}
   {kind==='direct'&&<section><h3>{t('Zahlung')}</h3><div className="pos-kinds"><label><input type="radio" name="paymentChoice" checked={payment==='cash'} onChange={()=>{setPayment('cash');changed();}}/>{t('Bar')}</label><label className={options.zahlsReady?'':'is-disabled'}><input type="radio" name="paymentChoice" disabled={!options.zahlsReady} checked={payment==='zahls'} onChange={()=>{setPayment('zahls');changed();}}/>{t('TWINT / Karte (zahls.ch)')}</label></div>{!options.zahlsReady&&<p className="club-hint">{t('TWINT und Karte sind verfügbar, sobald zahls.ch eingerichtet ist.')}</p>}</section>}
   {kind==='manual'&&<p className="club-hint">{t('Telefonbestellungen werden immer mit Rechnung (QR-Einzahlungsschein) per E-Mail abgewickelt. Versand bzw. Abgabe erfolgt nach der Zahlung.')}</p>}
   </fieldset>
   {review&&<div className="form-review"><h3>{t('Bitte prüfen')}</h3><p>{[review.address.first_name,review.address.last_name].filter(Boolean).join(' ')}{review.address.address_1?`, ${review.address.address_1}`:''}{review.address.city?`, ${review.address.postcode} ${review.address.city}`:''}{review.address.email?` · ${review.address.email}`:''}</p><p>{t('Gesamtbetrag')}: <strong>{chf(review.total)}</strong>{kind==='gift'&&<> · {t('Regulärer Warenwert')}: {chf(review.regular)}</>}</p><p className="club-hint">{t(effectiveFulfilment==='handover'?'Beim Speichern wird der Lagerbestand reduziert.':'Beim Speichern wird der Lagerbestand reserviert und reduziert.')}</p></div>}
   {error&&<p role="alert">{error}</p>}
   <div className="club-actions">{review&&<button type="button" className="club-secondary" onClick={()=>setReview(null)}>{t('Zurück')}</button>}<button className="market-primary" disabled={busy||(kind==='direct'&&!session)||!cart.length}>{t(busy?'Wird verarbeitet …':review?(kind==='direct'&&payment==='zahls'?'Speichern und QR-Code anzeigen':'Verbindlich speichern'):'Prüfen')}</button></div>
  </form>}
 </div>;
}

type Overview={id:string;sellerName:string;label:string;openedAt:string;closedAt:string;settledAt:string;status:'open'|'closed'|'settled';cash:number;online:number;count:number;invoice:{number:string;url:string}|null};
/** Abrechnung: Kassen mit offenen und beglichenen Bareinnahmen. */
export function PosOverview({nonce}:{nonce:string}){
 const [rows,setRows]=useState<Overview[]|null>(null);const [error,setError]=useState('');const [revision,setRevision]=useState(0);const [busy,setBusy]=useState('');const [notice,setNotice]=useState('');
 useEffect(()=>{const controller=new AbortController();query<Overview[]>('strc_shop',{operation:'pos-overview'},controller.signal).then(setRows).catch(reason=>{if(!controller.signal.aborted)setError((reason as Error).message);});return()=>controller.abort();},[revision]);
 async function confirm(row:Overview){setBusy(row.id);try{const data=await mutate<{message:string}>('strc_shop',nonce,fields({operation:'pos-paid',session:row.id}));setNotice(data.message);setRevision(value=>value+1);}catch(reason){setNotice((reason as Error).message);}finally{setBusy('');}}
 const labels={open:['Kasse offen','is-open'],closed:['Bareinnahmen zu begleichen','is-open'],settled:['Beglichen','is-paid']} as const;
 return <section className="form-section pos-overview"><h3>{t('Kassen und Bareinnahmen')}</h3>{error&&<p role="alert">{error}</p>}{notice&&<p className="club-notice" role="status">{t(notice)}</p>}
  {!rows&&!error?<p role="status">{t('Wird geladen …')}</p>:rows&&!rows.length?<p className="club-hint">{t('Noch keine Kasse geöffnet.')}</p>:rows&&<div className="table-scroll"><table><thead><tr><th>{t('Kasse')}</th><th>{t('Verkäufer')}</th><th>{t('Verkäufe')}</th><th>{t('Bar')}</th><th>{t('TWINT/Karte')}</th><th>{t('Stand')}</th><th></th></tr></thead><tbody>{rows.map(row=><tr key={row.id}><td>{new Date(row.openedAt).toLocaleDateString('de-CH')}{row.label?` · ${row.label}`:''}</td><td>{row.sellerName}</td><td>{row.count||'–'}</td><td>{chf(row.cash)}</td><td>{chf(row.online)}</td><td><span className={'shop-order-state '+labels[row.status][1]}>{t(labels[row.status][0])}</span>{row.settledAt&&<small> {new Date(row.settledAt).toLocaleDateString('de-CH')}</small>}</td><td>{row.invoice?.url&&<a href={row.invoice.url} target="_blank" rel="noopener noreferrer">{row.invoice.number} · PDF</a>}{row.status==='closed'&&<button type="button" className="market-text-button" disabled={busy===row.id} onClick={()=>void confirm(row)}>{t('Einzahlung bestätigen')}</button>}</td></tr>)}</tbody></table></div>}
 </section>;
}

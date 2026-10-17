'use client';
import {t} from './UILanguage';
import RegionalContent from './RegionalContent';

import Image from 'next/image';
import {imageFrameStyle} from './ImageFrame';
import {StoryText,PortraitGroup} from './ArticleMedia';
import {ModelCards,VehicleDetails,vehicleFacts} from './VehicleModels';
import ShopAccess from './ShopAccess';
import MembershipApplication from './MembershipApplication';
import LandingIntroduction from './LandingIntroduction';
import {ContentBlock, RichHtml, assetUrl, contentDefinitions, useSiteContent, regionalLandscape, type ContentImage, type ContentPerson, type ContentValues} from './SiteContent';

export function isStaticDocument(key:string){return key in contentDefinitions && 'template' in contentDefinitions[key as keyof typeof contentDefinitions];}

export function LandingCard({href,title,text}:{href:string;title:string;text:string;action?:boolean}) {
 return <a className="landing-card" href={href}><h2>{title}</h2><p>{text}</p></a>;
}

export function ClubLanding({canEdit=false,memberAccess=false}:{canEdit?:boolean;memberAccess?:boolean}) {
 const {text:c}=useSiteContent();
 return <><section className="page-hero club-page-hero"><div className="club-page-hero-copy"><p className="eyebrow">{c('club.eyebrow')}</p><h1>{c('club.title')}</h1><p>{c('club.intro')}</p></div></section>
 <div className="club-overview-layout"><div><section className="page-content club-intro-row"><LandingIntroduction documentKey="club" contained/><aside className="club-join-card"><p className="eyebrow">{c('club.joinEyebrow')||'Mitglied werden'}</p><h2>{c('club.joinTitle')||'Mitglied werden'}</h2><ContentBlock id="club.joinText"/><a className="market-primary" href="#anmeldung">{c('club.joinButton')||'Zur Anmeldung'} <span aria-hidden="true">→</span></a></aside></section>
 <section className="page-content landing-layout club-landing-cards"><div className="landing-grid">
 {[
  ['organisation','Organisation','organisationText'],['leitbild','Leitbild','missionText'],
  ['regionen','Regionen','regionsText'],['triungsters','TRiungsters','triungstersText'],
 ].map(([route,title,field])=><LandingCard key={route} href={'#'+route} title={c('club.'+({organisation:'organisationTitle',leitbild:'missionCardTitle',regionen:'regionsTitle',triungsters:'triungstersTitle'}[route]||''),title)} text={c('club.'+field)} action/>)}
 <div className="club-history-card"><LandingCard href="#club-geschichte" title={c('club.historyTitle')} text={c('club.historyText')} action/></div>
 </div></section></div><aside className="landing-sidebar club-models-sidebar"><p className="eyebrow">{t("Unsere Leidenschaft")}</p><h2>{c('club.modelsTitle')}</h2><p>{c('club.modelsText')}</p><ModelCards compact canEdit={canEdit}/>{!memberAccess&&<a className="market-primary club-login-entry" href="#mitglieder">{t('Mitglieder-Login')}</a>}</aside></div>
</>;

}

export function MissionPage() {
 const {text:c}=useSiteContent();
 return <><section className="page-hero"><p className="eyebrow">{c('club.missionLabel')}</p><h1>{c('club.missionTitle')}</h1></section><section className="page-content"><a className="page-back" href="#club">{t("← Zur Clubübersicht")}</a><div className="landing-layout"><article className="static-copy"><ContentBlock id="club.body"/></article><aside className="mission-picture">{c('club.missionImage')?<Image src={assetUrl(c('club.missionImage'))} alt={c('club.missionImageAlt')||t('Clubleben im Swiss TR-Club')} width={600} height={800} style={imageFrameStyle(c('club.missionImageFrame'))}/>:<div className="static-image-placeholder">{t("Ein Bild aus unserem Clubleben folgt.")}</div>}</aside></div></section></>;
}

export function StaticPage({documentKey,canEdit=false}:{documentKey:string;canEdit?:boolean}) {
 const {values,published,loading,error,refresh}=useSiteContent();
 const definition=contentDefinitions[documentKey as keyof typeof contentDefinitions];
 if(!definition||!isStaticDocument(documentKey))return <section className="page-content"><h1>{t("Seite nicht gefunden")}</h1><a className="page-back" href="#club">{t("Zur Clubübersicht")}</a></section>;
 if(documentKey==='shop')return <><section className="page-hero shop-page-hero"><p className="eyebrow">{t("Swiss TR-Club · Zubehör und Clubartikel")}</p><h1>{t('TR-Shop')}</h1><p>{t("Artikel für TR-Freunde: Entdecke Clubkleidung, Zubehör und ausgewählte Artikel.")}</p></section><section className="page-content"><a className="page-back" href="#marktplatz">{t("← Zum Marktplatz")}</a><ShopAccess/></section></>;
 if(documentKey==='triungsters'&&!loading&&!error)return <><section className="page-hero regional-hero" style={{backgroundImage:`linear-gradient(90deg,rgba(10,37,63,.91),rgba(10,37,63,.66)),url("${regionalLandscape('triungsters')}")`,backgroundSize:'cover',backgroundPosition:'center'}}><p className="eyebrow">{t("Lokal präsent – lokal aktiv")}</p><h1>{t("TRiungsters")}</h1><p>{published[documentKey]?String(values[documentKey]?.intro||''):''}</p></section><section className="page-content"><RegionalContent documentKey={documentKey} canEdit={canEdit} values={published[documentKey]?values[documentKey]:{}}/></section></>;
 if(loading||error||!published[documentKey])return <><section className="page-hero"><p className="eyebrow">{t("Swiss TR-Club")}</p><h1>{t(definition.title)}</h1></section><section className="page-content"><a className="page-back" href={documentKey==='shop'?'#marktplatz':'#club'}>{t("← Zur Übersicht")}</a>{loading?<p role="status">{t("Inhalt wird geladen …")}</p>:error?<p role="alert">{error} <button className="club-secondary" onClick={()=>void refresh()}>{t('Erneut laden')}</button></p>:<div className="collection-state"><p>{t("Diese Seite wird vorbereitet. Der Inhalt ist noch nicht veröffentlicht.")}</p></div>}{documentKey==='membership'&&<MembershipApplication/>}{documentKey==='shop'&&<ShopAccess/>}</section></>;
 return <StaticPageLayout documentKey={documentKey} values={values[documentKey]}/>;
}

/** One layout for the public page and the authenticated editorial preview. */
export function StaticPageLayout({documentKey,values,preview=false}:{documentKey:string;values:ContentValues;preview?:boolean}) {
 const text=(key:string)=>typeof values[key]==='string'?values[key] as string:'';
 const vehicle=documentKey.startsWith('model-');
 const hasText=(html:string)=>Boolean(html.replace(/<[^>]*>/g,'').replace(/&nbsp;/g,'').trim()||/<img\b/i.test(html));
 if(documentKey==='triungsters')return <RegionalContent documentKey={documentKey} values={values}/>;
 if(vehicle)return <VehicleDetails values={values} model={text('title')||documentKey.replace('model-','').toUpperCase()} preview={preview}/>;
 const secondary=hasText(text('bodySecondary'));
 const history=documentKey==='history';
 const photos=history&&Array.isArray(values.photos)?values.photos as ContentImage[]:[];
 const facts=vehicleFacts.filter(([key])=>text(key));
 return <article className={`static-page${history?' history-page':''}`}>
 <section className="page-hero"><p className="eyebrow">{t(vehicle?'Die Triumph TR-Modelle':'Swiss TR-Club')}</p>{preview?<h2 className="static-preview-title">{text('title')}</h2>:<h1>{text('title')}</h1>}{text('intro')&&<p>{text('intro')}</p>}</section>
 <div className="page-content">
 {!preview&&<a className="page-back" href={documentKey==='shop'?'#marktplatz':'#club'}>← {t(documentKey==='shop'?'Zum Marktplatz':'Zur Clubübersicht')}</a>}
 {documentKey==='organisation'&&text('lead')&&<RichHtml className="organisation-lead" html={text('lead')}/>}
 {!history&&(text('image')?<figure className="static-cover"><Image src={assetUrl(text('image'))} alt={text('imageAlt')} width={1440} height={800} style={imageFrameStyle(text('imageFrame'))}/>{text('imageCaption')&&<figcaption>{text('imageCaption')}</figcaption>}</figure>:preview&&<div className="static-image-placeholder">{t("Hier erscheint das ausgewählte Titelbild.")}</div>)}
 <div className={`static-layout ${history?'history-text-layout':''} ${vehicle||text('sidebar')||preview?'has-sidebar':''}`}>
 {history&&<div className="history-logos">{[['image','imageAlt'],['secondaryLogo','secondaryLogoAlt']].map(([image,alt],index)=>text(image)?<span className="history-logo-frame" key={image}><Image src={assetUrl(text(image))} alt={text(alt)||`${t('Club-Logo')} ${index+1}`} width={180} height={180} style={{transform:`scale(${Math.max(100,Math.min(150,Number(text(index===0?"logoScale":"secondaryLogoScale"))||(index===0?120:100)))/100})`}}/></span>:preview?<div className="history-logo-placeholder" key={image}>{t("Logo")} {index+1}</div>:null)}</div>}
 <div className={`static-copy ${secondary?'two-columns':''}`}><div>{hasText(text('body'))?(history?<StoryText html={text('body')} photos={photos}/>:<RichHtml html={text('body')}/>):preview&&<p className="club-hint">{t("Hier steht später der Text der ersten Spalte.")}</p>}</div>{secondary&&<RichHtml html={text('bodySecondary')}/>}</div>
 {vehicle&&(facts.length>0||preview)&&<aside className="landing-sidebar vehicle-facts"><h2>{t("Fahrzeugdaten")}</h2><dl>{(preview?vehicleFacts:facts).map(([key,label])=><div key={key}><dt>{t(label)}</dt><dd>{text(key)||t('Noch ergänzen')}</dd></div>)}</dl>{text('factsNote')&&<RichHtml html={text('factsNote')}/>}</aside>}
 {!vehicle&&(text('sidebar')||preview)&&<aside className="landing-sidebar"><h2>{text('sidebarTitle')||t('Auf einen Blick')}</h2>{text('sidebar')?<RichHtml html={text('sidebar')}/>:<p>{t("Platz für Kontakte und weitere Informationen.")}</p>}</aside>}
 </div>
 {documentKey==='organisation'&&<>{['board','functions'].map(group=><PortraitGroup key={group} title={text(group+'Title')} people={Array.isArray(values[group+'Portraits'])?values[group+'Portraits'] as ContentPerson[]:[]} preview={preview} slots={group==='board'?7:5}/>)}</>}

 {documentKey==='membership'&&!preview&&<MembershipApplication/>}{documentKey==='shop'&&!preview&&<ShopAccess/>}
 </div></article>;
}

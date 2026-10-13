'use client';
import {t} from './UILanguage';
import Image from 'next/image';
import {imageFrameStyle} from './ImageFrame';
import {ContentBlock,assetUrl,useSiteContent} from './SiteContent';

/** Optional editorial content, shared by the existing landing pages. */
export default function LandingIntroduction({documentKey,contained=false}:{documentKey:string;contained?:boolean}) {
 const {text}=useSiteContent();const image=text(documentKey+'.landingImage');const body=text(documentKey+'.landingBody');
 if(!image&&!body)return null;
 const imageBlock=image?<figure className="static-cover"><Image src={assetUrl(image)} alt={text(documentKey+'.landingImageAlt')} width={1440} height={800} style={imageFrameStyle(text(documentKey+'.landingImageFrame'))}/>{text(documentKey+'.landingImageCaption')&&<figcaption>{text(documentKey+'.landingImageCaption')}</figcaption>}</figure>:null;
 if(contained)return <div className="landing-introduction" aria-label={t("Weitere Informationen")}>{imageBlock}{body&&<ContentBlock id={documentKey+'.landingBody'}/>}</div>;
 return <section className="page-content landing-introduction" aria-label={t("Weitere Informationen")}>{imageBlock}{body&&<ContentBlock id={documentKey+'.landingBody'}/>}</section>;
}

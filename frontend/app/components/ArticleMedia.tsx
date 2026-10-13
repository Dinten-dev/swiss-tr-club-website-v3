'use client';
import {t} from './UILanguage';
import Image from 'next/image';
import {imageFrameStyle} from './ImageFrame';
import {assetUrl,RichHtml,type ContentImage,type ContentPerson} from './SiteContent';

/** Keep complete top-level HTML blocks intact, including nested lists/tables. */
export function articleBlocks(html:string):string[]{
 const blocks:string[]=[];let start=0;let depth=0;
 const tags=/<\/?([a-z][\w-]*)\b[^>]*>/gi;let match:RegExpExecArray|null;
 while((match=tags.exec(html))){
  const tag=match[1].toLowerCase();const closing=match[0].startsWith('</');
  if(!closing&&!['img','br','hr','wbr','input','source'].includes(tag)&&!match[0].endsWith('/>'))depth++;
  if(closing)depth=Math.max(0,depth-1);
  if(depth===0){const end=tags.lastIndex;blocks.push(html.slice(start,end));start=end;}
 }
 if(start<html.length)blocks.push(html.slice(start));
 return blocks.filter(block=>block.trim());
}
export function StoryText({html,photos}:{html:string;photos:ContentImage[]}){
 const blocks=articleBlocks(html);
 const imageGroups=new Map<number,ContentImage[]>();
 photos.filter(photo=>photo.url).forEach((photo,index)=>{const raw=Number(photo.position??(index+1)*2);const position=Math.min(blocks.length,Math.max(0,Number.isFinite(raw)?raw:blocks.length));imageGroups.set(position,[...(imageGroups.get(position)||[]),photo]);});
 const pictures=(position:number)=>imageGroups.get(position)?.map((photo,index)=><figure className="history-inline-photo" key={position+':'+index}><Image src={assetUrl(photo.url)} alt={photo.alt} width={900} height={600} style={imageFrameStyle(photo.frame)}/>{photo.alt&&<figcaption>{photo.alt}</figcaption>}</figure>);
 return <div className="history-story">{pictures(0)}{blocks.map((block,index)=><div className="history-text-block" key={index}><RichHtml html={block}/>{pictures(index+1)}</div>)}</div>;
}
export function PortraitGroup({title,people,preview=false,slots=0}:{title:string;people:ContentPerson[];preview?:boolean;slots?:number}){
 const entries=(slots?Array.from({length:Math.max(slots,people.length)},(_,index)=>people[index]||{image:'',name:'',role:''}):preview?people:people.filter(person=>person.name||person.image||person.role)).filter(person=>person.name||person.image||person.role||person.email);
 if(!entries.length)return null;
 return <section className="organisation-people"><h2>{title}</h2><div className="portrait-grid">{entries.map((person,index)=><article className="portrait-card" key={index}>{person.image&&<Image src={assetUrl(person.image)} alt={person.name?`${t('Porträt von')} ${person.name}`:t('Porträt')} width={400} height={500} style={imageFrameStyle(person.frame,'cover')}/>}<h3>{person.name||t('Mitglied')}</h3>{person.role&&<p>{person.role}</p>}{person.email&&<a className="portrait-email" href={'mailto:'+encodeURIComponent(person.email)}>{person.email}</a>}</article>)}</div></section>;
}

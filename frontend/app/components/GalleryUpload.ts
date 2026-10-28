/** Preserve magazine originals up to 16 MB; optimize larger photos sequentially. */
export async function prepareGalleryPhoto(file:File):Promise<{file:File;optimized:boolean}>{
 if(!['image/jpeg','image/png','image/webp'].includes(file.type)||!file.size||file.size>50*1024*1024)throw new Error('Bitte JPG, PNG oder WebP bis 50 MB auswählen.');
 const url=URL.createObjectURL(file),image=new window.Image();
 const canvas=document.createElement('canvas');
 try{
  image.src=url;try{await image.decode();}catch{throw new Error('Das Bild konnte nicht gelesen werden. Bitte eine gültige Bilddatei auswählen.');}
  const width=image.naturalWidth,height=image.naturalHeight;
  if(!width||!height||width*height>100_000_000)throw new Error('Das Bild ist ungültig oder überschreitet 100 Megapixel.');
  if(file.size<=16*1024*1024&&width*height<=40_000_000)return {file,optimized:false};
  let factor=Math.min(1,4000/Math.max(width,height)),quality=.9;
  for(let attempt=0;attempt<9;attempt++){
   canvas.width=Math.max(1,Math.round(width*factor));canvas.height=Math.max(1,Math.round(height*factor));
   const ctx=canvas.getContext('2d');if(!ctx)throw new Error('Die Bildverarbeitung ist in diesem Browser nicht verfügbar.');
   ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(image,0,0,canvas.width,canvas.height);
   const blob=await new Promise<Blob|null>(resolve=>canvas.toBlob(resolve,'image/jpeg',quality));
   if(!blob)throw new Error('Das Bild konnte nicht verkleinert werden.');
   if(blob.size<=16*1024*1024)return {file:new File([blob],file.name.replace(/\.[^.]+$/,'')+'.jpg',{type:'image/jpeg',lastModified:file.lastModified}),optimized:true};
   if(quality>.6)quality=Math.max(.6,quality-.1);else factor*=.8;
  }
  throw new Error('Das Bild konnte nicht auf 16 MB verkleinert werden.');
 }finally{URL.revokeObjectURL(url);image.src='';canvas.width=canvas.height=1;}
}

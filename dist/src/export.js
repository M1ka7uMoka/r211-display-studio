export function download(blob,name){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),5000)}
export function canvasBlob(canvas,type='image/png'){return new Promise((resolve,reject)=>canvas.toBlob(b=>b&&b.type===type?resolve(b):reject(Error(`${type} encoding is unavailable in this browser.`)),type,1))}
// Record exactly one ordered cycle, independently of preview loop settings.
export async function recordedVideo(renderer,project,scale,options={},progress=()=>{}){
 if(typeof MediaRecorder==='undefined')throw Error('Video export is unavailable in this browser.');
 const mimeType=['video/mp4;codecs=avc1.420033','video/mp4','video/webm;codecs=vp9','video/webm;codecs=vp8','video/webm'].find(t=>MediaRecorder.isTypeSupported(t));
 if(!mimeType)throw Error('This browser has no supported video encoder.');
 let buffer=renderer.exportFrame(project,project.frames[0],scale,options);
 const canvas=document.createElement('canvas');canvas.width=buffer.width+buffer.width%2;canvas.height=buffer.height+buffer.height%2;
 if(!canvas.captureStream)throw Error('Canvas video export is unavailable in this browser.');
 const ctx=canvas.getContext('2d');const draw=()=>{ctx.fillStyle=options.backgroundColor||'#080c10';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(buffer,0,0);};draw();
 const stream=canvas.captureStream(30);let recorder,tick,advance;
 try{
  recorder=new MediaRecorder(stream,{mimeType,videoBitsPerSecond:24000000});
  const chunks=[];
  return await new Promise((resolve,reject)=>{
   let i=0,deadline;
   const cleanup=()=>{clearInterval(tick);clearTimeout(advance);};
   recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};
   recorder.onerror=e=>{cleanup();reject(e.error||Error('Video encoding failed.'));};
   recorder.onstop=()=>{cleanup();const type=recorder.mimeType||mimeType,blob=new Blob(chunks,{type});if(!blob.size)reject(Error('The video encoder returned an empty file.'));else resolve({blob,extension:type.includes('mp4')?'mp4':'webm'});};
   const step=()=>{progress(i+1,project.frames.length);draw();deadline+=(project.frames[i].duration??project.defaultDuration)*1000;advance=setTimeout(()=>{i++;if(i===project.frames.length){recorder.stop();return;}buffer=renderer.exportFrame(project,project.frames[i],scale,options);step();},Math.max(0,deadline-performance.now()));};
   recorder.onstart=()=>{deadline=performance.now();tick=setInterval(draw,1000/30);step();};
   recorder.start(1000);
  });
 }finally{clearInterval(tick);clearTimeout(advance);if(recorder?.state==='recording')recorder.stop();stream.getTracks().forEach(t=>t.stop());}
}

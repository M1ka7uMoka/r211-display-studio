import {SHAPE_ROUTE_BITMAPS} from './shape-route-bitmaps.js?v=24';
import {ROUTE_DIGITS,ROUTE_DIGITS_SINGLE} from './route-digits.js?v=20';
import {REFERENCE_ROUTE_BITMAPS} from './reference-route-bitmaps.js?v=20';
// Route masks are independent of the destination library. A follows the 4064 photo.
const a=['000000011110000000','000000011110000000','000000111111000000','000000111111000000','000001110011100000','000001110011100000','000001110011100000','000011100001110000','000011100001110000','000111000000111000','000111000000111000','000111000000111000','001111111111111100','001111111111111100','001111111111111100','011100000000001110','011100000000001110','011100000000001110','111000000000000111','111000000000000111'];
const strokes={B:[[[2,1],[10,1],[15,3],[15,7],[10,9],[2,9]],[[10,9],[16,12],[16,16],[12,18],[2,18],[2,1]]],D:[[[2,1],[9,1],[16,5],[16,14],[9,18],[2,18],[2,1]]],E:[[[16,1],[2,1],[2,18],[16,18]],[[2,9],[14,9]]],F:[[[16,1],[2,1],[2,18]],[[2,9],[14,9]]],H:[[[2,1],[2,18]],[[16,1],[16,18]],[[2,9],[16,9]]],I:[[[3,1],[15,1]],[[9,1],[9,18]],[[3,18],[15,18]]],J:[[[16,1],[16,14],[13,18],[6,18],[2,14]]],K:[[[2,1],[2,18]],[[16,1],[2,11],[16,18]]],L:[[[2,1],[2,18],[16,18]]],M:[[[2,18],[2,1],[9,12],[16,1],[16,18]]],N:[[[2,18],[2,1],[16,18],[16,1]]],P:[[[2,18],[2,1],[11,1],[16,4],[16,8],[11,11],[2,11]]],R:[[[2,18],[2,1],[11,1],[16,4],[16,8],[11,11],[2,11]],[[10,11],[16,18]]],S:[[[16,3],[12,1],[5,1],[2,4],[2,7],[5,9],[13,11],[16,13],[16,16],[12,18],[5,18],[2,16]]],T:[[[1,1],[17,1]],[[9,1],[9,18]]],U:[[[2,1],[2,14],[5,18],[13,18],[16,14],[16,1]]],V:[[[1,1],[9,18],[17,1]]],W:[[[1,1],[4,18],[9,8],[14,18],[17,1]]],X:[[[2,1],[16,18]],[[16,1],[2,18]]],Y:[[[2,1],[9,10],[16,1]],[[9,10],[9,18]]],Z:[[[2,1],[16,1],[2,18],[16,18]]],'1':[[[5,5],[9,1],[9,18]]],'2':[[[2,4],[5,1],[12,1],[16,4],[16,7],[2,18],[16,18]]],'3':[[[2,1],[12,1],[16,4],[16,7],[11,9],[6,9]],[[11,9],[16,12],[16,15],[12,18],[2,18]]],'4':[[[12,18],[12,1],[2,13],[17,13]]],'5':[[[16,1],[2,1],[2,9],[12,9],[16,12],[16,15],[12,18],[2,18]]],'6':[[[15,1],[6,1],[2,5],[2,15],[6,18],[12,18],[16,15],[16,11],[12,8],[2,8]]],'7':[[[1,1],[17,1],[7,18]]],'8':[[[6,1],[12,1],[16,4],[16,6],[12,9],[6,9],[2,6],[2,4],[6,1]],[[6,9],[2,12],[2,15],[6,18],[12,18],[16,15],[16,12],[12,9]]],'9':[[[16,11],[6,11],[2,8],[2,4],[6,1],[12,1],[16,4],[16,15],[12,18],[3,18]]]};

// Independently constructed, three-dot strokes on the original 18 x 20 grid.
// Public R211-specific previews inform weight/proportion; no third-party font data is embedded.
const curved={
 B:[[[2,18],[2,1],[10,1],[16,1,16,9,10,9],[2,9]],[[10,9],[17,9,17,18,10,18],[2,18]]],
 D:[[[2,18],[2,1],[8,1],[18,1,18,18,8,18],[2,18]]],
 J:[[[16,1],[16,13],[16,20,2,20,2,13]]],
 P:[[[2,18],[2,1],[10,1],[18,1,18,10,10,10],[2,10]]],
 R:[[[2,18],[2,1],[10,1],[18,1,18,10,10,10],[2,10]],[[10,10],[16,18]]],
 S:[[[16,3],[13,-1,2,-1,2,5],[2,8,5,9,9,9.5],[13,10,16,11,16,14],[16,20,5,20,2,16]]],
 U:[[[2,1],[2,13],[2,20,16,20,16,13],[16,1]]],
 '2':[[[2,5],[2,-1,16,-1,16,5],[16,8,13,10,10,12],[2,18],[16,18]]],
 '3':[[[2,3],[7,-1,16,0,16,5],[16,9,12,9,8,9]],[[8,9],[18,9,18,19,9,18],[5,18,3,17,2,16]]],
 '5':[[[16,1],[3,1],[2,9],[6,7,16,7,16,13],[16,20,5,20,2,16]]],
 '6':[[[15,2],[7,-2,2,3,2,12],[2,20,16,20,16,13],[16,6,6,6,2,11]]],
 '8':[[[9,1],[0,1,0,9,9,9],[18,9,18,1,9,1]],[[9,9],[0,9,0,18,9,18],[18,18,18,9,9,9]]],
 '9':[[[9,1],[0,1,0,11,9,11],[18,11,18,1,9,1]],[[16,6],[16,12],[16,20,9,20,3,17]]]
};
function flatten(path){const out=[path[0]];for(const part of path.slice(1)){if(part.length===2){out.push(part);continue;}const p=out.at(-1);for(let i=1;i<=40;i++){const t=i/40,u=1-t;out.push([u*u*u*p[0]+3*u*u*t*part[0]+3*u*t*t*part[2]+t*t*t*part[4],u*u*u*p[1]+3*u*u*t*part[1]+3*u*t*t*part[3]+t*t*t*part[5]]);}}return out;}
for(const [ch,paths] of Object.entries(curved))strokes[ch]=paths.map(flatten);
strokes.I=[[[9,1],[9,18]]];
strokes.W=[[[1,1],[5,18],[9,11],[13,18],[17,1]]];
export const ROUTE_CHARACTERS='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
export const normalizeRouteLabel=value=>{const cleaned=String(value).toUpperCase().replace(/[^A-Z0-9]/g,'');return /^[A-Z]/.test(cleaned)?cleaned[0]:cleaned.replace(/[^0-9]/g,'').slice(0,2);};
export const isSupportedRouteLabel=value=>typeof value==='string'&&/^(?:[A-Z]|[0-9]{1,2})$/.test(value);
function segmentDistance(x,y,p,q){const dx=q[0]-p[0],dy=q[1]-p[1],len=dx*dx+dy*dy;const t=len?Math.max(0,Math.min(1,((x-p[0])*dx+(y-p[1])*dy)/len)):0;return Math.hypot(x-p[0]-t*dx,y-p[1]-t*dy);}
function reconstruct(ch){if(ch==='A')return a;return Array.from({length:20},(_,y)=>Array.from({length:18},(_,x)=>{let lit=false;if(['C','G','O','Q','0'].includes(ch)){const rx=ch==='0'?5.5:7,dx=x-8.5,dy=y-9.5,rad=Math.sqrt((dx/rx)**2+(dy/8.5)**2);const angle=Math.atan2(dy/8.5,dx/rx);lit=Math.abs(rad-1)*rx<=1.4&&(!['C','G'].includes(ch)||Math.abs(angle)>.65);if(ch==='G')lit||=segmentDistance(x,y,[9,10],[16,10])<=1.5||segmentDistance(x,y,[16,10],[16,15])<=1.5;if(ch==='Q')lit||=segmentDistance(x,y,[10,13],[16,18])<=1.5;}else for(const path of strokes[ch]??[])for(let i=1;i<path.length;i++)if(segmentDistance(x,y,path[i-1],path[i])<=1.5)lit=true;return lit?'1':'0'}).join(''));}
// Supplied reference masks retain their original column/row counts.
// Unpictured characters retain provisional masks for custom A-Z/0-9 labels.
// Geometry is sampled once; display layout never stretches width independently of height.
export const R211_SIDE_ROUTE_GLYPHS=Object.fromEntries([...ROUTE_CHARACTERS].map(ch=>[ch,{confidence:REFERENCE_ROUTE_BITMAPS[ch]?'reference':'provisional',bitmap:REFERENCE_ROUTE_BITMAPS[ch]??ROUTE_DIGITS[ch]??reconstruct(ch)}]));
// Add a center column to odd-width letters so their body can sit on the
// panel's half-cell center. I retains a slim two-column upright.
export function evenLetterBitmap(bitmap,ch){
 const xs=[];bitmap.forEach(row=>[...row].forEach((v,x)=>{if(v==='1')xs.push(x);}));
 const left=Math.min(...xs),right=Math.max(...xs),body=bitmap.map(row=>row.slice(left,right+1));
 if(body[0].length%2===0)return bitmap;
 if(ch==='I')return body.map(row=>row.slice(0,-1));
 const middle=Math.floor(body[0].length/2);
 return body.map(row=>row.slice(0,middle)+row[middle]+row.slice(middle));
}
for(const ch of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ')R211_SIDE_ROUTE_GLYPHS[ch].bitmap=evenLetterBitmap(R211_SIDE_ROUTE_GLYPHS[ch].bitmap,ch);
function compose(label,gap,shape){let offset=0;const points=[];const combined=label==='SI'?(shape==='diamond'?'SI_DIAMOND':'SI'):label==='F'&&shape==='diamond'?'F_DIAMOND':null;for(const ch of combined?[combined]:label){const bitmap=combined?(ch==='F_DIAMOND'?evenLetterBitmap(REFERENCE_ROUTE_BITMAPS[ch],'F'):REFERENCE_ROUTE_BITMAPS[ch]):R211_SIDE_ROUTE_GLYPHS[ch]?.bitmap;if(!bitmap)continue;const lit=[];bitmap.forEach((row,y)=>[...row].forEach((v,x)=>{if(v==='1')lit.push([x,y]);}));if(!lit.length)continue;const minX=Math.min(...lit.map(p=>p[0])),maxX=Math.max(...lit.map(p=>p[0]));points.push(...lit.map(([x,y])=>[offset+x-minX,y]));offset+=maxX-minX+1+gap;}return points;}
export function routeMask(label,s,shape='circle'){const {cols,rows}=s.routeMatrix,out=new Uint8ClampedArray(cols*rows*4);const shapeBitmap=SHAPE_ROUTE_BITMAPS[shape]?.[label];if(shapeBitmap){const x0=Math.round(s.routeBullet.centerX-(shapeBitmap[0].length-1)/2),y0=Math.round(s.routeBullet.centerY-(shapeBitmap.length-1)/2);shapeBitmap.forEach((row,y)=>[...row].forEach((v,x)=>{if(v==='1'&&x0+x>=0&&x0+x<cols&&y0+y>=0&&y0+y<rows)out[((y0+y)*cols+x0+x)*4+3]=255;}));return centerSampledMask(out,s,shape,label);}const numeralDots=routeNumeralDots(label,s,shape);if(numeralDots){for(const [x,y]of numeralDots)out[(y*cols+x)*4+3]=255;return centerSampledMask(out,s,shape,label);}const points=compose(label,s.routeGlyph.gap,shape);if(!points.length)return out;const minX=Math.min(...points.map(p=>p[0])),maxX=Math.max(...points.map(p=>p[0])),minY=Math.min(...points.map(p=>p[1])),maxY=Math.max(...points.map(p=>p[1]));const cx=(minX+maxX)/2,cy=(minY+maxY)/2;const clearance=s.routeGlyph.clearance??1.5,r=s.routeBullet.diameter/2-clearance;const metric=(x,y)=>shape==='diamond'?Math.abs(x)+Math.abs(y):Math.hypot(x,y);let extent=0;for(const [x,y] of points)for(const dx of [-.5,.5])for(const dy of [-.5,.5])extent=Math.max(extent,metric(x-cx+dx,y-cy+dy));const maxWidth=label.length===1?s.routeGlyph.width:s.routeBullet.diameter-2*clearance;const scale=Math.max(.05,Math.min(1,s.routeGlyph.height/(maxY-minY+1),maxWidth/(maxX-minX+1),r/extent));const lit=new Set(points.map(([x,y])=>`${x},${y}`));for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){const dx=x-s.routeBullet.centerX,dy=y-s.routeBullet.centerY;if(metric(dx,dy)>r)continue;const nx=Math.round(dx/scale+cx),ny=Math.round(dy/scale+cy);if(lit.has(`${nx},${ny}`))out[(y*cols+x)*4+3]=255;}return centerSampledMask(out,s,shape,label);}

// Snap only after sampling. Move complete lit cells, preserving the supplied bitmaps.
function centerSampledMask(mask,s,shape,label){
 const {cols,rows}=s.routeMatrix,points=[];
 for(let y=0;y<rows;y++)for(let x=0;x<cols;x++)if(mask[(y*cols+x)*4+3])points.push([x,y]);
 if(!points.length)return mask;
 const xs=points.map(p=>p[0]),ys=points.map(p=>p[1]),left=Math.min(...xs),right=Math.max(...xs),top=Math.min(...ys),bottom=Math.max(...ys);
 // Center the complete lit bounds; ink mass must not shift wide pairs.
 const opticalX=(left+right)/2;
 const bodyY=label==='Q'?(top+bottom-1)/2:(top+bottom)/2;
 const radius=s.routeBullet.diameter/2-(s.routeGlyph.clearance??.5);
 const metric=(x,y)=>shape==='diamond'?Math.abs(x)+Math.abs(y):Math.hypot(x,y);
 let best={dx:0,dy:0,score:Infinity};
 for(let dy=-2;dy<=2;dy++)for(let dx=-2;dx<=2;dx++){
  if(points.some(([x,y])=>x+dx<0||x+dx>=cols||y+dy<0||y+dy>=rows||metric(x+dx-s.routeBullet.centerX,y+dy-s.routeBullet.centerY)>radius))continue;
  const score=(opticalX+dx-s.routeBullet.centerX)**2+(bodyY+dy-s.routeBullet.centerY)**2+.0001*(Math.abs(dx)+Math.abs(dy));
  if(score<best.score)best={dx,dy,score};
 }
 const out=new Uint8ClampedArray(mask.length);
 for(const [x,y]of points)out[((y+best.dy)*cols+x+best.dx)*4+3]=255;
 return out;
}

// Single numerals are explicit 20-row, three-cell-stroke masks.
export const ROUTE_DIGITS_WIDE=ROUTE_DIGITS_SINGLE;
export function routeNumeralDots(label,s,shape='circle'){
 if(!/^[0-9]{1,2}$/.test(label))return null;
 const bitmaps=[...label].map(ch=>label.length===1?ROUTE_DIGITS_WIDE[ch]:ROUTE_DIGITS[ch]);
 const h=bitmaps[0].length,bodyWidth=bitmaps.reduce((n,b)=>n+b[0].length,0);
 // Even combined widths can center exactly on the panel's half-cell axis.
 // A diamond uses the narrower gap so the reference masks fit unchanged.
 let gap=label.length===2?Math.max(0,Math.round(shape==='diamond'?0:s.routeGlyph.gap)):0;
 if(label.length===2&&(bodyWidth+gap)%2)gap++;
 const width=bodyWidth+gap,dots=[];
 let x0=Math.round(s.routeBullet.centerX-(width-1)/2);
 const y0=Math.round(s.routeBullet.centerY-(h-1)/2);
 for(const bitmap of bitmaps){bitmap.forEach((row,y)=>[...row].forEach((v,x)=>{if(v==='1')dots.push([x0+x,y0+y]);}));x0+=bitmap[0].length+gap;}
 return dots;
}

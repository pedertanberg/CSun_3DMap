import{gJ as Le,gG as Ae,gH as ze,bz as qe,jH as We,cV as Ge,cv as he,jI as Be,jJ as je,jK as Q,F as Je,aK as fe,jL as ke,jM as Ke,jN as Ye,r as C,jO as ce,t as V,jP as _e,jQ as Xe,jR as Qe,jS as Ze,ab as et,bb as tt,jT as it,jU as nt,jV as rt,jW as st,eY as at,gI as j,jX as me,bw as W,gy as $,j0 as ot,j1 as lt,jY as ct,iT as H,jZ as ut,j_ as dt,j$ as z,gL as Oe,df as se,s as ht,k0 as ft,k1 as _t,aQ as mt,ci as pt,z as pe,e as ae,f as oe,k as gt}from"./index.d2d38865.js";import{t as N,M as ge}from"./GeometryUtils.12948ca8.js";import{e as yt}from"./rasterizingUtils.08b3e51e.js";import{n as ue,l as A,r as J,i as Ne,a as ee,b as ye}from"./StyleRepository.0d3ce524.js";import{h as vt,I as q}from"./TileInfoView.f5379421.js";import{Z as O,_ as Ve,$ as ve}from"./enums.6b5e3ac2.js";import{M as ne}from"./number.30628ef2.js";import{n as xt}from"./LayerView3D.69b4d800.js";import{c as wt}from"./TiledLayerView3D.08b18fea.js";import{u as bt}from"./LayerView.74f87dba.js";import"./colorUtils.bb6424b7.js";import"./Geometry.d049a63c.js";class St{constructor(e,i){this._lockedSchemaPixelSize=e,this._isGCS=i}getLevelRowColumn(e){return this._isGCS?[e[0],e[1]>>1,e[2]>>1]:this._lockedSchemaPixelSize===256&&e[0]>0?[e[0]-1,e[1]>>1,e[2]>>1]:e}adjustLevel(e){return this._isGCS?e:this._lockedSchemaPixelSize===256?e>0?e-1:0:e}getShift(e,i){let t=0,n=0;return(this._lockedSchemaPixelSize===256||this._isGCS)&&(e[2]%2&&(t=i),e[1]%2&&(n=i)),[t,n]}getScale(e){if(this._isGCS){if(this._lockedSchemaPixelSize===512)return 4}else if(this._lockedSchemaPixelSize===256&&e===0)return 1;return 2}}class te{constructor(e,i){this._width=0,this._height=0,this._free=[],this._width=e,this._height=i,this._free.push(new N(0,0,e,i))}get width(){return this._width}get height(){return this._height}allocate(e,i){if(e>this._width||i>this._height)return new N;let t=null,n=-1;for(let r=0;r<this._free.length;++r){const s=this._free[r];e<=s.width&&i<=s.height&&(t===null||s.y<=t.y&&s.x<=t.x)&&(t=s,n=r)}return t===null?new N:(this._free.splice(n,1),t.width<t.height?(t.width>e&&this._free.push(new N(t.x+e,t.y,t.width-e,i)),t.height>i&&this._free.push(new N(t.x,t.y+i,t.width,t.height-i))):(t.width>e&&this._free.push(new N(t.x+e,t.y,t.width-e,t.height)),t.height>i&&this._free.push(new N(t.x,t.y+i,e,t.height-i))),new N(t.x,t.y,e,i))}release(e){for(let i=0;i<this._free.length;++i){const t=this._free[i];if(t.y===e.y&&t.height===e.height&&t.x+t.width===e.x)t.width+=e.width;else if(t.x===e.x&&t.width===e.width&&t.y+t.height===e.y)t.height+=e.height;else if(e.y===t.y&&e.height===t.height&&e.x+e.width===t.x)t.x=e.x,t.width+=e.width;else{if(e.x!==t.x||e.width!==t.width||e.y+e.height!==t.y)continue;t.y=e.y,t.height+=e.height}this._free.splice(i,1),this.release(e)}this._free.push(e)}}class xe{constructor(e,i,t){this.width=0,this.height=0,this._dirties=[],this._glyphData=[],this._currentPage=0,this._glyphIndex={},this._textures=[],this._rangePromises=new Map,this.width=e,this.height=i,this._glyphSource=t,this._binPack=new te(e-4,i-4),this._glyphData.push(new Uint8Array(e*i)),this._dirties.push(!0),this._textures.push(void 0)}getGlyphItems(e,i){const t=[],n=this._glyphSource,r=new Set,s=1/256;for(const a of i){const l=Math.floor(a*s);r.add(l)}const o=[];return r.forEach(a=>{if(a<=256){const l=e+a;if(this._rangePromises.has(l))o.push(this._rangePromises.get(l));else{const d=n.getRange(e,a).then(()=>{this._rangePromises.delete(l)},()=>{this._rangePromises.delete(l)});this._rangePromises.set(l,d),o.push(d)}}}),Promise.all(o).then(()=>{let a=this._glyphIndex[e];a||(a={},this._glyphIndex[e]=a);for(const l of i){const d=a[l];if(d){t[l]={sdf:!0,rect:d.rect,metrics:d.metrics,page:d.page,code:l};continue}const f=n.getGlyph(e,l);if(!f||!f.metrics)continue;const h=f.metrics;let c;if(h.width===0)c=new N(0,0,0,0);else{const m=h.width+6,g=h.height+2*3;let y=m%4?4-m%4:4,_=g%4?4-g%4:4;y===1&&(y=5),_===1&&(_=5),c=this._binPack.allocate(m+y,g+_),c.isEmpty&&(this._dirties[this._currentPage]||(this._glyphData[this._currentPage]=null),this._currentPage=this._glyphData.length,this._glyphData.push(new Uint8Array(this.width*this.height)),this._dirties.push(!0),this._textures.push(void 0),this._binPack=new te(this.width-4,this.height-4),c=this._binPack.allocate(m+y,g+_));const I=this._glyphData[this._currentPage],P=f.bitmap;let v,b;if(P)for(let S=0;S<g;S++){v=m*S,b=this.width*(c.y+S+1)+c.x;for(let x=0;x<m;x++)I[b+x+1]=P[v+x]}}a[l]={rect:c,metrics:h,tileIDs:null,page:this._currentPage},t[l]={sdf:!0,rect:c,metrics:h,page:this._currentPage,code:l},this._dirties[this._currentPage]=!0}return t})}removeGlyphs(e){for(const i in this._glyphIndex){const t=this._glyphIndex[i];if(!t)continue;let n;for(const r in t)if(n=t[r],n.tileIDs.delete(e),n.tileIDs.size===0){const s=this._glyphData[n.page],o=n.rect;let a,l;for(let d=0;d<o.height;d++)for(a=this.width*(o.y+d)+o.x,l=0;l<o.width;l++)s[a+l]=0;delete t[r],this._dirties[n.page]=!0}}}bind(e,i,t,n=0){this._textures[t]||(this._textures[t]=new Le(e,{pixelFormat:Ae.ALPHA,dataType:ze.UNSIGNED_BYTE,width:this.width,height:this.height},new Uint8Array(this.width*this.height)));const r=this._textures[t];r.setSamplingMode(i),this._dirties[t]&&r.setData(this._glyphData[t]),e.bindTexture(r,n),this._dirties[t]=!1}dispose(){this._binPack=null;for(const e of this._textures)e&&e.dispose();this._textures.length=0}}class le{constructor(e){if(this._metrics=[],this._bitmaps=[],e)for(;e.next();)switch(e.tag()){case 1:{const i=e.getMessage();for(;i.next();)switch(i.tag()){case 3:{const t=i.getMessage();let n,r,s,o,a,l,d;for(;t.next();)switch(t.tag()){case 1:n=t.getUInt32();break;case 2:r=t.getBytes();break;case 3:s=t.getUInt32();break;case 4:o=t.getUInt32();break;case 5:a=t.getSInt32();break;case 6:l=t.getSInt32();break;case 7:d=t.getUInt32();break;default:t.skip()}t.release(),n&&(this._metrics[n]={width:s,height:o,left:a,top:l,advance:d},this._bitmaps[n]=r);break}default:i.skip()}i.release();break}default:e.skip()}}getMetrics(e){return this._metrics[e]}getBitmap(e){return this._bitmaps[e]}}class Tt{constructor(){this._ranges=[]}getRange(e){return this._ranges[e]}addRange(e,i){this._ranges[e]=i}}class we{constructor(e){this._glyphInfo={},this._baseURL=e}getRange(e,i){const t=this._getFontStack(e);if(t.getRange(i))return Promise.resolve();const n=256*i,r=n+255;if(this._baseURL){const s=this._baseURL.replace("{fontstack}",e).replace("{range}",n+"-"+r);return qe(s,{responseType:"array-buffer"}).then(o=>{t.addRange(i,new le(new We(new Uint8Array(o.data),new DataView(o.data))))}).catch(()=>{t.addRange(i,new le)})}return t.addRange(i,new le),Promise.resolve()}getGlyph(e,i){const t=this._getFontStack(e);if(!t)return;const n=Math.floor(i/256);if(n>256)return;const r=t.getRange(n);return r?{metrics:r.getMetrics(i),bitmap:r.getBitmap(i)}:void 0}_getFontStack(e){let i=this._glyphInfo[e];return i||(i=this._glyphInfo[e]=new Tt),i}}const Pt="dasharray-";class ie{constructor(e,i,t=0){this._size=[],this._mosaicsData=[],this._textures=[],this._dirties=[],this._maxItemSize=0,this._currentPage=0,this._pageWidth=0,this._pageHeight=0,this._mosaicRects={},this.pixelRatio=1,(e<=0||i<=0)&&console.error("Sprites mosaic defaultWidth and defaultHeight must be greater than zero!"),this._pageWidth=e,this._pageHeight=i,t>0&&(this._maxItemSize=t),this._binPack=new te(e-4,i-4)}dispose(){this._binPack=null,this._mosaicRects={};for(const e of this._textures)e&&e.dispose();this._textures.length=0}getWidth(e){return e>=this._size.length?-1:this._size[e][0]}getHeight(e){return e>=this._size.length?-1:this._size[e][1]}getPageSize(e){return e>=this._size.length?null:this._size[e]}setSpriteSource(e){if(this.dispose(),this.pixelRatio=e.devicePixelRatio,this._mosaicsData.length===0){this._binPack=new te(this._pageWidth-4,this._pageHeight-4);const i=Math.floor(this._pageWidth),t=Math.floor(this._pageHeight),n=new Uint32Array(i*t);this._mosaicsData[0]=n,this._dirties.push(!0),this._size.push([this._pageWidth,this._pageHeight]),this._textures.push(void 0)}this._sprites=e}getSpriteItem(e,i=!1){let t,n,r=this._mosaicRects[e];if(r)return r;if(!this._sprites||this._sprites.loadStatus!=="loaded"||(e&&e.startsWith(Pt)?([t,n]=this._rasterizeDash(e),i=!0):t=this._sprites.getSpriteInfo(e),!t||!t.width||!t.height||t.width<0||t.height<0))return null;const s=t.width,o=t.height,[a,l,d]=this._allocateImage(s,o);return a.width<=0?null:(this._copy(a,t,l,d,i,n),r={rect:a,width:s,height:o,sdf:t.sdf,simplePattern:!1,pixelRatio:t.pixelRatio,page:l},this._mosaicRects[e]=r,r)}getSpriteItems(e){const i={};for(const t of e)i[t.name]=this.getSpriteItem(t.name,t.repeat);return i}getMosaicItemPosition(e,i){const t=this.getSpriteItem(e,i),n=t&&t.rect;if(!n)return null;n.width=t.width,n.height=t.height;const r=t.width,s=t.height,o=2;return{tl:[n.x+o,n.y+o],br:[n.x+o+r,n.y+o+s],page:t.page}}bind(e,i,t=0,n=0){if(t>=this._size.length||t>=this._mosaicsData.length)return;this._textures[t]||(this._textures[t]=new Le(e,{pixelFormat:Ae.RGBA,dataType:ze.UNSIGNED_BYTE,wrapMode:Ge.CLAMP_TO_EDGE,width:this._size[t][0],height:this._size[t][1]},new Uint8Array(this._mosaicsData[t].buffer)));const r=this._textures[t];r.setSamplingMode(i),this._dirties[t]&&r.setData(new Uint8Array(this._mosaicsData[t].buffer)),e.bindTexture(r,n),this._dirties[t]=!1}static _copyBits(e,i,t,n,r,s,o,a,l,d,f){let h=n*i+t,c=a*s+o;if(f){c-=s;for(let p=-1;p<=d;p++,h=((p+d)%d+n)*i+t,c+=s)for(let m=-1;m<=l;m++)r[c+m]=e[h+(m+l)%l]}else for(let p=0;p<d;p++){for(let m=0;m<l;m++)r[c+m]=e[h+m];h+=i,c+=s}}_copy(e,i,t,n,r,s){if(!this._sprites||this._sprites.loadStatus!=="loaded"||t>=this._mosaicsData.length)return;const o=new Uint32Array(s?s.buffer:this._sprites.image.buffer),a=this._mosaicsData[t];a&&o||console.error("Source or target images are uninitialized!");const l=2,d=s?i.width:this._sprites.width;ie._copyBits(o,d,i.x,i.y,a,n[0],e.x+l,e.y+l,i.width,i.height,r),this._dirties[t]=!0}_allocateImage(e,i){e+=2,i+=2;const t=Math.max(e,i);if(this._maxItemSize&&this._maxItemSize<t){const o=new N(0,0,e,i);return this._mosaicsData.push(new Uint32Array(e*i)),this._dirties.push(!0),this._size.push([e,i]),this._textures.push(void 0),[o,this._mosaicsData.length-1,[e,i]]}let n=e%4?4-e%4:4,r=i%4?4-i%4:4;n===1&&(n=5),r===1&&(r=5);const s=this._binPack.allocate(e+n,i+r);return s.width<=0?(this._dirties[this._currentPage]||(this._mosaicsData[this._currentPage]=null),this._currentPage=this._mosaicsData.length,this._mosaicsData.push(new Uint32Array(this._pageWidth*this._pageHeight)),this._dirties.push(!0),this._size.push([this._pageWidth,this._pageHeight]),this._textures.push(void 0),this._binPack=new te(this._pageWidth-4,this._pageHeight-4),this._allocateImage(e,i)):[s,this._currentPage,[this._pageWidth,this._pageHeight]]}_rasterizeDash(e){const i=/\[(.*?)\]/,t=e.match(i);if(!t)return null;const n=t[1].split(",").map(Number),r=e.slice(e.lastIndexOf("-")+1),[s,o,a]=yt(n,r);return[{x:0,y:0,width:o,height:a,sdf:!0,pixelRatio:1},new Uint8Array(s.buffer)]}}class It{constructor(e,i,t){this._layer=e,this._styleRepository=i,this.devicePixelRatio=t,this._spriteMosaic=null,this._glyphMosaic=null,this._connection=null}destroy(){this._connection&&(this._connection.close(),this._connection=null),this._styleRepository=null,this._layer=null,this._spriteMosaic&&(this._spriteMosaic=null),this._glyphMosaic&&(this._glyphMosaic=null)}get spriteMosaic(){return this._spriteSourcePromise.then(()=>this._spriteMosaic)}get glyphMosaic(){return this._glyphMosaic}async start(e){this._spriteSourcePromise=this._layer.loadSpriteSource(this.devicePixelRatio,e),this._spriteSourcePromise.then(t=>{this._spriteMosaic=new ie(1024,1024,250),this._spriteMosaic.setSpriteSource(t)});const i=new we(this._layer.currentStyleInfo.glyphsUrl?he(this._layer.currentStyleInfo.glyphsUrl,{...this._layer.customParameters,token:this._layer.apiKey}):null);this._glyphMosaic=new xe(1024,1024,i),this._broadcastPromise=Be("WorkerTileHandler",{client:this,schedule:e.schedule,signal:e.signal}).then(t=>{if(this._connection=t,this._layer&&!this._connection.closed){const n=t.broadcast("setStyle",this._layer.currentStyleInfo.style,e);Promise.all(n).catch(r=>je(r))}})}async updateStyle(e){return await this._broadcastPromise,this._broadcastPromise=Promise.all(this._connection.broadcast("updateStyle",e)),this._broadcastPromise}setSpriteSource(e){const i=new ie(1024,1024,250);return i.setSpriteSource(e),this._spriteMosaic=i,this._spriteSourcePromise=Promise.resolve(e),i}async setStyle(e,i){await this._broadcastPromise,this._styleRepository=e,this._spriteSourcePromise=this._layer.loadSpriteSource(this.devicePixelRatio,null),this._spriteSourcePromise.then(n=>{this._spriteMosaic=new ie(1024,1024,250),this._spriteMosaic.setSpriteSource(n)});const t=new we(this._layer.currentStyleInfo.glyphsUrl?he(this._layer.currentStyleInfo.glyphsUrl,{...this._layer.customParameters,token:this._layer.apiKey}):null);return this._glyphMosaic=new xe(1024,1024,t),this._broadcastPromise=Promise.all(this._connection.broadcast("setStyle",i)),this._broadcastPromise}fetchTileData(e,i){return this._getRefKeys(e,i).then(t=>{const n=this._layer.sourceNameToSource,r=[];for(const s in n)r.push(s);return this._getSourcesData(r,t,i)})}parseTileData(e,i){const t=e&&e.data;if(!t)return Promise.resolve(null);const{sourceName2DataAndRefKey:n,transferList:r}=t;return Object.keys(n).length===0?Promise.resolve(null):this._broadcastPromise.then(()=>this._connection.invoke("createTileAndParse",{key:e.key.id,sourceName2DataAndRefKey:n,styleLayerUIDs:e.styleLayerUIDs},{...i,transferList:r}))}async getSprites(e){return await this._spriteSourcePromise,this._spriteMosaic.getSpriteItems(e)}getGlyphs(e){return this._glyphMosaic.getGlyphItems(e.font,e.codePoints)}async _getTilePayload(e,i,t){const n=Q.pool.acquire(e.id),r=this._layer.sourceNameToSource[i],{level:s,row:o,col:a}=n;Q.pool.release(n);try{return{protobuff:await r.requestTile(s,o,a,t),sourceName:i}}catch(l){if(Je(l))throw l;return{protobuff:null,sourceName:i}}}_getRefKeys(e,i){const t=this._layer.sourceNameToSource,n=new Array;for(const r in t){const s=t[r].getRefKey(e,i);n.push(s)}return fe(n)}_getSourcesData(e,i,t){const n=[];for(let r=0;r<i.length;r++)if(i[r].value==null||e[r]==null)n.push(null);else{const s=this._getTilePayload(i[r].value,e[r],t);n.push(s)}return fe(n).then(r=>{const s={},o=[];for(let a=0;a<r.length;a++)if(r[a].value&&r[a].value&&r[a].value.protobuff&&r[a].value.protobuff.byteLength>0){const l=i[a].value.id;s[r[a].value.sourceName]={refKey:l,protobuff:r[a].value.protobuff},o.push(r[a].value.protobuff)}return{sourceName2DataAndRefKey:s,transferList:o}})}}function Mt(u,e,i,t,n,r){const{iconRotationAlignment:s,textRotationAlignment:o,iconTranslate:a,iconTranslateAnchor:l,textTranslate:d,textTranslateAnchor:f}=t;let h=0;for(const c of u.colliders){const[p,m]=c.partIndex===0?a:d,g=c.partIndex===0?l:f,y=c.minLod<=r&&r<=c.maxLod;h+=y?0:1,c.enabled=y,c.xScreen=c.xTile*n[0]+c.yTile*n[3]+n[6],c.yScreen=c.xTile*n[1]+c.yTile*n[4]+n[7],g===J.MAP?(c.xScreen+=i*p-e*m,c.yScreen+=e*p+i*m):(c.xScreen+=p,c.yScreen+=m),A.VIEWPORT===(c.partIndex===0?s:o)?(c.dxScreen=c.dxPixels,c.dyScreen=c.dyPixels):(c.dxScreen=i*(c.dxPixels+c.width/2)-e*(c.dyPixels+c.height/2)-c.width/2,c.dyScreen=e*(c.dxPixels+c.width/2)+i*(c.dyPixels+c.height/2)-c.height/2)}u.colliders.length>0&&h===u.colliders.length&&(u.unique.show=!1)}class Rt{constructor(e,i,t,n,r,s){this._symbols=e,this._styleRepository=n,this._zoom=r,this._currentLayerCursor=0,this._currentSymbolCursor=0,this._styleProps=new Map,this._allNeededMatrices=new Map,this._gridIndex=new ke(i,t,Ke),this._si=Math.sin(Math.PI*s/180),this._co=Math.cos(Math.PI*s/180);for(const o of e)for(const a of o.symbols)this._allNeededMatrices.has(a.tile)||this._allNeededMatrices.set(a.tile,Ye(a.tile.transforms.tileUnitsToPixels))}work(e){const i=this._gridIndex;function t(r){const s=r.xScreen+r.dxScreen,o=r.yScreen+r.dyScreen,a=s+r.width,l=o+r.height,[d,f,h,c]=i.getCellSpan(s,o,a,l);for(let p=f;p<=c;p++)for(let m=d;m<=h;m++){const g=i.cells[p][m];for(const y of g){const _=y.xScreen+y.dxScreen,I=y.yScreen+y.dyScreen,P=_+y.width,v=I+y.height;if(!(a<_||s>P||l<I||o>v))return!0}}return!1}const n=performance.now();for(;this._currentLayerCursor<this._symbols.length;this._currentLayerCursor++,this._currentSymbolCursor=0){const r=this._symbols[this._currentLayerCursor],s=this._getProperties(r.styleLayerUID);for(;this._currentSymbolCursor<r.symbols.length;this._currentSymbolCursor++){if(this._currentSymbolCursor%100==99&&performance.now()-n>e)return!1;const o=r.symbols[this._currentSymbolCursor];if(!o.unique.show)continue;Mt(o,this._si,this._co,s,this._allNeededMatrices.get(o.tile),this._zoom);const a=o.unique;if(!a.show)continue;const{iconAllowOverlap:l,iconIgnorePlacement:d,textAllowOverlap:f,textIgnorePlacement:h}=s;for(const c of o.colliders){if(!c.enabled)continue;const p=a.parts[c.partIndex];!p.show||!(c.partIndex?f:l)&&t(c)&&(c.hard?a.show=!1:p.show=!1)}if(a.show)for(const c of o.colliders){if(!c.enabled||(c.partIndex?h:d)||!a.parts[c.partIndex].show)continue;const p=c.xScreen+c.dxScreen,m=c.yScreen+c.dyScreen,g=p+c.width,y=m+c.height,[_,I,P,v]=this._gridIndex.getCellSpan(p,m,g,y);for(let b=I;b<=v;b++)for(let S=_;S<=P;S++)this._gridIndex.cells[b][S].push(c)}}}return!0}_getProperties(e){const i=this._styleProps.get(e);if(i)return i;const t=this._zoom,n=this._styleRepository.getStyleLayerByUID(e),r=n.getLayoutValue("symbol-placement",t)!==ue.POINT;let s=n.getLayoutValue("icon-rotation-alignment",t);s===A.AUTO&&(s=r?A.MAP:A.VIEWPORT);let o=n.getLayoutValue("text-rotation-alignment",t);o===A.AUTO&&(o=r?A.MAP:A.VIEWPORT);const a=n.getPaintValue("icon-translate",t),l=n.getPaintValue("icon-translate-anchor",t),d=n.getPaintValue("text-translate",t),f=n.getPaintValue("text-translate-anchor",t),h={iconAllowOverlap:n.getLayoutValue("icon-allow-overlap",t),iconIgnorePlacement:n.getLayoutValue("icon-ignore-placement",t),textAllowOverlap:n.getLayoutValue("text-allow-overlap",t),textIgnorePlacement:n.getLayoutValue("text-ignore-placement",t),iconRotationAlignment:s,textRotationAlignment:o,iconTranslateAnchor:l,iconTranslate:a,textTranslateAnchor:f,textTranslate:d};return this._styleProps.set(e,h),h}}function Dt(u,e){if(u.priority-e.priority)return u.priority-e.priority;const i=u.tile.key,t=e.tile.key;return i.world-t.world?i.world-t.world:i.level-t.level?i.level-t.level:i.row-t.row?i.row-t.row:i.col-t.col?i.col-t.col:u.xTile-e.xTile?u.xTile-e.xTile:u.yTile-e.yTile}class Ct{constructor(e,i,t,n,r,s){this._visibleTiles=e,this._symbolRepository=i,this._createCollisionJob=t,this._assignTileSymbolsOpacity=n,this._symbolLayerSorter=r,this._isLayerVisible=s,this._selectionJob=null,this._selectionJobCompleted=!1,this._collisionJob=null,this._collisionJobCompleted=!1,this._opacityJob=null,this._opacityJobCompleted=!1,this._running=!0}get running(){return this._running}setScreenSize(e,i){this._screenWidth===e&&this._screenHeight===i||this.restart(),this._screenWidth=e,this._screenHeight=i}restart(){this._selectionJob=null,this._selectionJobCompleted=!1,this._collisionJob=null,this._collisionJobCompleted=!1,this._opacityJob=null,this._opacityJobCompleted=!1,this._running=!0}continue(e){if(this._selectionJob||(this._selectionJob=this._createSelectionJob()),!this._selectionJobCompleted){const i=performance.now();if(!this._selectionJob.work(e)||(this._selectionJobCompleted=!0,(e=Math.max(0,e-(performance.now()-i)))===0))return!1}if(this._collisionJob||(this._collisionJob=this._createCollisionJob(this._selectionJob.sortedSymbols,this._screenWidth,this._screenHeight)),!this._collisionJobCompleted){const i=performance.now();if(!this._collisionJob.work(e)||(this._collisionJobCompleted=!0,(e=Math.max(0,e-(performance.now()-i)))===0))return!1}if(this._opacityJob||(this._opacityJob=this._createOpacityJob()),!this._opacityJobCompleted){const i=performance.now();if(!this._opacityJob.work(e)||(this._opacityJobCompleted=!0,(e=Math.max(0,e-(performance.now()-i)))===0))return!1}return this._running=!1,!0}_createSelectionJob(){const e=this._symbolRepository.uniqueSymbols;for(let a=0;a<e.length;a++){const l=e[a];for(let d=0;d<l.uniqueSymbols.length;d++){const f=l.uniqueSymbols[d];for(const h of f.tileSymbols)h.selectedForRendering=!1}}const i=[];let t=0,n=0;const r=this._isLayerVisible;function s(a){let l;const d=performance.now();for(;n<e.length;n++,t=0){const f=e[n],h=f.styleLayerUID;if(!r(h)){i[n]||(i[n]={styleLayerUID:h,symbols:[]});continue}i[n]=i[n]||{styleLayerUID:h,symbols:[]};const c=i[n];for(;t<f.uniqueSymbols.length;t++){if(l=f.uniqueSymbols[t],t%100==99&&performance.now()-d>a)return!1;let p=null,m=!1,g=!1;for(const y of l.tileSymbols)if(!g||!m){const _=y.tile;(!p||_.isCoverage||_.neededForCoverage&&!m)&&(p=y,(_.neededForCoverage||_.isCoverage)&&(g=!0),_.isCoverage&&(m=!0))}if(p.selectedForRendering=!0,g){c.symbols.push(p),l.show=!0;for(const y of l.parts)y.show=!0}else l.show=!1}}for(const f of i)f.symbols.sort(Dt);return!0}const o=this._symbolLayerSorter;return{work:s,get sortedSymbols(){return i.sort(o)}}}_createOpacityJob(){const e=this._assignTileSymbolsOpacity,i=this._visibleTiles;let t=0;function n(r,s){const o=r.symbols;for(const[a,l]of o)Et(l,s);e(r,s);for(const a of r.childrenTiles)n(a,s)}return{work(r){const s=performance.now();for(;t<i.length;t++){if(performance.now()-s>r)return!1;const o=i[t];C(o.parentTile)||n(o,performance.now())}return!0}}}}function Et(u,e){for(const i of u){const t=i.unique;for(const n of t.parts){const r=n.targetOpacity>.5?1:-1;n.startOpacity+=r*((e-n.startTime)/ce),n.startOpacity=Math.min(Math.max(n.startOpacity,0),1),n.startTime=e,n.targetOpacity=t.show&&n.show?1:0}}}const Ut=32,Lt=8,At=64;class zt{constructor(e,i,t){this.tileCoordRange=e,this._visibleTiles=i,this._createUnique=t,this._tiles=new Map,this._uniqueSymbolsReferences=new Map}get uniqueSymbols(){return V(this._uniqueSymbolLayerArray)&&(this._uniqueSymbolLayerArray=this._createUniqueSymbolLayerArray()),this._uniqueSymbolLayerArray}add(e,i){this._uniqueSymbolLayerArray=null;let t=this._tiles.get(e.id);t||(t={symbols:new Map},this._tiles.set(e.id,t));const n=new Map;if(i)for(const o of i)t.symbols.has(o)&&(n.set(o,t.symbols.get(o)),t.symbols.delete(o));else for(const[o,a]of e.layerData)t.symbols.has(o)&&(n.set(o,t.symbols.get(o)),t.symbols.delete(o));this._removeSymbols(n);const r=e.symbols,s=new Map;for(const[o,a]of r){let l=a.length;if(l>=Ut){let d=this.tileCoordRange;do d/=2,l/=4;while(l>Lt&&d>At);const f=new ke(this.tileCoordRange,this.tileCoordRange,d);s.set(o,{flat:a,index:f}),t.symbols.set(o,{flat:a,index:f});for(const h of a)f.getCell(h.xTile,h.yTile).push(h)}else s.set(o,{flat:a}),t.symbols.set(o,{flat:a})}this._addSymbols(e.key,r)}deleteStyleLayers(e){this._uniqueSymbolLayerArray=null;for(const[i,t]of this._tiles){const n=new Map;for(const r of e)t.symbols.has(r)&&(n.set(r,t.symbols.get(r)),t.symbols.delete(r));this._removeSymbols(n),t.symbols.size===0&&this._tiles.delete(i)}}removeTile(e){this._uniqueSymbolLayerArray=null;const i=this._tiles.get(e.id);if(!i)return;const t=new Map;for(const[n,r]of e.symbols)i.symbols.has(n)&&(t.set(n,i.symbols.get(n)),i.symbols.delete(n));this._removeSymbols(t),i.symbols.size===0&&this._tiles.delete(e.id)}_removeSymbols(e){for(const[i,{flat:t}]of e)for(const n of t){const r=n.unique,s=r.tileSymbols,o=s.length-1;for(let a=0;a<o;a++)if(s[a]===n){s[a]=s[o];break}if(s.length=o,o===0){const a=this._uniqueSymbolsReferences.get(i);a.delete(r),a.size===0&&this._uniqueSymbolsReferences.delete(i)}n.unique=null}}_addSymbols(e,i){if(i.size===0)return;const t=this._visibleTiles;for(const n of t)n.parentTile||n.key.world!==e.world||n.key.level===e.level&&!n.key.equals(e)||this._matchSymbols(n,e,i);for(const[n,r]of i)for(const s of r)if(V(s.unique)){const o=this._createUnique();s.unique=o,o.tileSymbols.push(s);let a=this._uniqueSymbolsReferences.get(n);a||(a=new Set,this._uniqueSymbolsReferences.set(n,a)),a.add(o)}}_matchSymbols(e,i,t){if(e.key.level>i.level){const r=e.key.level-i.level;if(e.key.row>>r!==i.row||e.key.col>>r!==i.col)return}if(i.level>e.key.level){const r=i.level-e.key.level;if(i.row>>r!==e.key.row||i.col>>r!==e.key.col)return}if(i.equals(e.key)){for(const r of e.childrenTiles)this._matchSymbols(r,i,t);return}const n=new Map;for(const[r,s]of t){const o=[];for(const f of s){const h=_e(this.tileCoordRange,f.xTile,i.level,i.col,e.key.level,e.key.col),c=_e(this.tileCoordRange,f.yTile,i.level,i.row,e.key.level,e.key.row);h>=0&&h<this.tileCoordRange&&c>=0&&c<this.tileCoordRange&&o.push({symbol:f,xTransformed:h,yTransformed:c})}const a=[],l=e.key.level<i.level?1:1<<e.key.level-i.level,d=this._tiles.get(e.id).symbols.get(r);if(d){const f=d.flat;for(const h of o){let c,p=!1;const m=h.xTransformed,g=h.yTransformed;c=C(d.index)?d.index.getCell(m,g):f;const y=h.symbol,_=y.hash;for(const I of c)if(_===I.hash&&Math.abs(m-I.xTile)<=l&&Math.abs(g-I.yTile)<=l){const P=I.unique;y.unique=P,P.tileSymbols.push(y),p=!0;break}p||a.push(y)}}a.length>0&&n.set(r,a)}for(const r of e.childrenTiles)this._matchSymbols(r,i,n)}_createUniqueSymbolLayerArray(){const e=this._uniqueSymbolsReferences,i=new Array(e.size);let t,n=0;for(const[r,s]of e){const o=new Array(s.size);t=0;for(const a of s)o[t++]=a;i[n]={styleLayerUID:r,uniqueSymbols:o},n++}return i}}function kt(u,e){const i=[],t=new zt(4096,i,()=>{const r=new Qe;return r.show=!1,r.parts.push({startTime:0,startOpacity:0,targetOpacity:0,show:!1}),r.parts.push({startTime:0,startOpacity:0,targetOpacity:0,show:!1}),r}),n=new Ct(i,t,(r,s,o)=>new Rt(r,s,o,u.styleRepository,u.key.level,0),(r,s)=>{Xe(r,s,!1)},()=>0,r=>{const s=e.getStyleLayerByUID(r).getLayoutProperty("visibility");return!s||s.getValue()!==Ne.NONE});i.push(u),t.add(u),n.setScreenSize(512,512),n.continue(1/0)}class Ot extends vt{constructor(){super(...arguments),this._fullCacheLodInfos=null,this._levelByScale={}}getTileParentId(e){const i=Q.pool.acquire(e),t=i.level===0?null:Q.getId(i.level-1,i.row>>1,i.col>>1,i.world);return Q.pool.release(i),t}getTileCoverage(e,i,t){const n=super.getTileCoverage(e,i,t);if(!n)return n;const r=1<<n.lodInfo.level;return n.spans=n.spans.filter(s=>s.row>=0&&s.row<r),n}scaleToLevel(e){if(this._fullCacheLodInfos||this._initializeFullCacheLODs(this._lodInfos),this._levelByScale[e])return this._levelByScale[e];{const i=this._fullCacheLodInfos;if(e>i[0].scale)return i[0].level;let t,n;for(let r=0;r<i.length-1;r++)if(n=i[r+1],e>n.scale)return t=i[r],t.level+(t.scale-e)/(t.scale-n.scale);return i[i.length-1].level}}_initializeFullCacheLODs(e){let i;if(e[0].level===0)i=e.map(t=>({level:t.level,resolution:t.resolution,scale:t.scale}));else{const t=this.tileInfo.size[0],n=this.tileInfo.spatialReference;i=Ze.create({size:t,spatialReference:n}).lods.map(r=>({level:r.level,resolution:r.resolution,scale:r.scale}))}for(let t=0;t<i.length;t++)this._levelByScale[i[t].scale]=i[t].level;this._fullCacheLodInfos=i}}class be extends It{constructor(e,i,t,n,r){super(e,i,t),this._memCache=n,this._loader=r,this._ongoingTileRequests=new Map,this._ongoingRequestToController=new Map,this._tileInfoView=new Ot(e.tileInfo,e.fullExtent)}destroy(){super.destroy(),this._ongoingRequestToController.forEach(e=>e.abort()),this._ongoingRequestToController.clear(),this._ongoingTileRequests.clear()}async getVectorTile(e,i,t,n){const r=new Q(e,i,t,0);let s=this._memCache.get(r.id);if(C(s))return s.retain(),s;const o=await this._getVectorTileData(r);if(et(n),!this._layer)return null;if(s=this._memCache.get(r.id),C(s))return s.retain(),s;const a=this._layer.tileInfo.getTileBounds(tt(),r),l=this._tileInfoView.getTileResolution(e);return s=new it(r,l,a[0],a[3],512,512,this._styleRepository,this._memCache),C(o)?(s.setData(o),s.retain(),this._memCache.put(r.id,s,s.memoryUsage*s.referenced,nt)):s.setData(null),s.neededForCoverage=!0,s.transforms.tileUnitsToPixels=rt(1/8,0,0,0,1/8,0,0,0,1),kt(s,this._styleRepository),s}_getVectorTileData(e){const i=e.id;if(this._ongoingTileRequests.has(i))return this._ongoingTileRequests.get(i);const t=new AbortController,n={signal:t.signal},r=this._getParsedVectorTileData(e,n).then(s=>(this._ongoingTileRequests.delete(i),this._ongoingRequestToController.delete(i),s)).catch(()=>(this._ongoingTileRequests.delete(i),this._ongoingRequestToController.delete(i),null));return this._ongoingTileRequests.set(i,r),this._ongoingRequestToController.set(i,t),r}_getParsedVectorTileData(e,i){return this.fetchTileData(e,i).then(t=>this.parseTileData({key:e,data:t},i))}request(e,i){return this._loader.request(e,"binary",i)}}class re{constructor(){this.name=this.constructor.name||"UnnamedBrush",this.brushEffect=null}prepareState(e,i){}draw(e,i,t){}drawMany(e,i,t){for(const n of i)n.visible&&this.draw(e,n,t)}}class Nt extends re{constructor(){super(...arguments),this._color=st(1,0,0,1),this._patternMatrix=at(),this._programOptions={id:!1,pattern:!1}}dispose(){this._vao&&(this._vao.dispose(),this._vao=null)}drawMany(e,i){const{context:t,painter:n,styleLayerUID:r,requestRender:s,allowDelayedRender:o}=e;this._loadWGLResources(e);const a=e.displayLevel,l=e.styleLayer,d=l.backgroundMaterial,f=n.vectorTilesMaterialManager,h=l.getPaintValue("background-color",a),c=l.getPaintValue("background-opacity",a),p=l.getPaintValue("background-pattern",a),m=p!==void 0,g=h[3]*c,y=1|window.devicePixelRatio,_=e.spriteMosaic;let I,P;const v=y>Ve?2:1,b=e.drawPhase===q.HITTEST,S=this._programOptions;S.id=b,S.pattern=m;const x=f.getMaterialProgram(t,d,S);if(o&&C(s)&&!x.isCompiled)s();else{if(t.bindVAO(this._vao),t.useProgram(x),m){const w=_.getMosaicItemPosition(p,!0);if(C(w)){const{tl:M,br:T,page:D}=w;I=T[0]-M[0],P=T[1]-M[1];const R=_.getPageSize(D);C(R)&&(_.bind(t,j.LINEAR,D,O),x.setUniform4f("u_tlbr",M[0],M[1],T[0],T[1]),x.setUniform2fv("u_mosaicSize",R),x.setUniform1i("u_texture",O))}x.setUniform1f("u_opacity",c)}else this._color[0]=g*h[0],this._color[1]=g*h[1],this._color[2]=g*h[2],this._color[3]=g,x.setUniform4fv("u_color",this._color);if(x.setUniform1f("u_depth",l.z||0),b){const w=ne(r+1);x.setUniform4fv("u_id",w)}for(const w of i){if(x.setUniform1f("u_coord_range",w.rangeX),x.setUniformMatrix3fv("u_dvsMat3",w.transforms.dvs),m){const M=Math.max(2**(Math.round(a)-w.key.level),1),T=v*w.width*M,D=T/me(I),R=T/me(P);this._patternMatrix[0]=D,this._patternMatrix[4]=R,x.setUniformMatrix3fv("u_pattern_matrix",this._patternMatrix)}t.setStencilFunction(W.EQUAL,0,255),t.drawArrays($.TRIANGLE_STRIP,0,4)}}}_loadWGLResources(e){if(this._vao)return;const{context:i,styleLayer:t}=e,n=t.backgroundMaterial,r=new Int8Array([0,0,1,0,0,1,1,1]),s=ot.createVertex(i,lt.STATIC_DRAW,r),o=new ct(i,n.getAttributeLocations(),n.getLayoutInfo(),{geometry:s});this._vao=o}}class Vt extends re{constructor(){super(...arguments),this._programOptions={id:!1}}dispose(){}drawMany(e,i){const{context:t,displayLevel:n,requiredLevel:r,state:s,drawPhase:o,painter:a,spriteMosaic:l,styleLayerUID:d,requestRender:f,allowDelayedRender:h}=e;if(!i.some(S=>{var x,w;return(w=(x=S.layerData.get(d))==null?void 0:x.circleIndexCount)!=null?w:!1}))return;const c=e.styleLayer,p=c.circleMaterial,m=a.vectorTilesMaterialManager,g=1.2,y=c.getPaintValue("circle-translate",n),_=c.getPaintValue("circle-translate-anchor",n),I=o===q.HITTEST,P=this._programOptions;P.id=I;const v=m.getMaterialProgram(t,p,P);if(h&&C(f)&&!v.isCompiled)return void f();t.useProgram(v),v.setUniformMatrix3fv("u_displayMat3",_===J.VIEWPORT?s.displayMat3:s.displayViewMat3),v.setUniform2fv("u_circleTranslation",y),v.setUniform1f("u_depth",c.z),v.setUniform1f("u_antialiasingWidth",g);let b=-1;if(I){const S=ne(d+1);v.setUniform4fv("u_id",S)}for(const S of i){if(!S.layerData.has(d))continue;S.key.level!==b&&(b=S.key.level,p.setDataUniforms(v,n,c,b,l));const x=S.layerData.get(d);if(!x.circleIndexCount)continue;x.prepareForRendering(t);const w=x.circleVertexArrayObject;V(w)||(t.bindVAO(w),v.setUniformMatrix3fv("u_dvsMat3",S.transforms.dvs),r!==S.key.level?t.setStencilFunction(W.EQUAL,S.stencilRef,255):t.setStencilFunction(W.GREATER,255,255),t.drawElements($.TRIANGLES,x.circleIndexCount,H.UNSIGNED_INT,Uint32Array.BYTES_PER_ELEMENT*x.circleIndexStart),S.triangleCount+=x.circleIndexCount/3)}}}const Se=1/65536;class $t extends re{constructor(){super(...arguments),this._fillProgramOptions={id:!1,pattern:!1},this._outlineProgramOptions={id:!1}}dispose(){}drawMany(e,i){const{displayLevel:t,drawPhase:n,renderPass:r,spriteMosaic:s,styleLayerUID:o}=e;let a=!1;for(const v of i)if(v.layerData.has(o)){const b=v.layerData.get(o);if(b.fillIndexCount>0||b.outlineIndexCount>0){a=!0;break}}if(!a)return;const l=e.styleLayer,d=l.getPaintProperty("fill-pattern"),f=d!==void 0,h=f&&d.isDataDriven;let c;if(f&&!h){const v=d.getValue(t);c=s.getMosaicItemPosition(v,!0)}const p=!f&&l.getPaintValue("fill-antialias",t);let m=!0,g=1;if(!f){const v=l.getPaintProperty("fill-color"),b=l.getPaintProperty("fill-opacity");if(!(v!=null&&v.isDataDriven)&&!(b!=null&&b.isDataDriven)){const S=l.getPaintValue("fill-color",t);g=l.getPaintValue("fill-opacity",t)*S[3],g>=1&&(m=!1)}}if(m&&r==="opaque")return;let y;n===q.HITTEST&&(y=ne(o+1));const _=l.getPaintValue("fill-translate",t),I=l.getPaintValue("fill-translate-anchor",t);(m||r!=="translucent")&&this._drawFill(e,o,l,i,_,I,f,c,h,y);const P=!l.hasDataDrivenOutlineColor&&l.outlineUsesFillColor&&g<1;p&&r!=="opaque"&&!P&&this._drawOutline(e,o,l,i,_,I,y)}_drawFill(e,i,t,n,r,s,o,a,l,d){if(o&&!l&&V(a))return;const{context:f,displayLevel:h,state:c,drawPhase:p,painter:m,pixelRatio:g,spriteMosaic:y,requestRender:_,allowDelayedRender:I}=e,P=t.fillMaterial,v=m.vectorTilesMaterialManager,b=g>Ve?2:1,S=p===q.HITTEST,x=this._fillProgramOptions;x.id=S,x.pattern=o;const w=v.getMaterialProgram(f,P,x);if(I&&C(_)&&!w.isCompiled)return void _();if(f.useProgram(w),C(a)){const{page:T}=a,D=y.getPageSize(T);C(D)&&(y.bind(f,j.LINEAR,T,O),w.setUniform2fv("u_mosaicSize",D),w.setUniform1i("u_texture",O))}w.setUniformMatrix3fv("u_displayMat3",s===J.VIEWPORT?c.displayMat3:c.displayViewMat3),w.setUniform2fv("u_fillTranslation",r),w.setUniform1f("u_depth",t.z+Se),S&&w.setUniform4fv("u_id",d);let M=-1;for(const T of n){if(!T.layerData.has(i))continue;T.key.level!==M&&(M=T.key.level,P.setDataUniforms(w,h,t,M,y));const D=T.layerData.get(i);if(!D.fillIndexCount)continue;D.prepareForRendering(f);const R=D.fillVertexArrayObject;if(!V(R)){if(f.bindVAO(R),w.setUniformMatrix3fv("u_dvsMat3",T.transforms.dvs),f.setStencilFunction(W.EQUAL,T.stencilRef,255),o){const L=Math.max(2**(Math.round(h)-T.key.level),1),E=T.rangeX/(b*T.width*L);w.setUniform1f("u_patternFactor",E)}if(l){const L=D.patternMap;if(!L)continue;for(const[E,G]of L){const B=y.getPageSize(E);C(B)&&(y.bind(f,j.LINEAR,E,O),w.setUniform2fv("u_mosaicSize",B),w.setUniform1i("u_texture",O),f.drawElements($.TRIANGLES,G[1],H.UNSIGNED_INT,Uint32Array.BYTES_PER_ELEMENT*G[0]))}}else f.drawElements($.TRIANGLES,D.fillIndexCount,H.UNSIGNED_INT,Uint32Array.BYTES_PER_ELEMENT*D.fillIndexStart);T.triangleCount+=D.fillIndexCount/3}}}_drawOutline(e,i,t,n,r,s,o){const{context:a,displayLevel:l,state:d,drawPhase:f,painter:h,pixelRatio:c,spriteMosaic:p,requestRender:m,allowDelayedRender:g}=e,y=t.outlineMaterial,_=h.vectorTilesMaterialManager,I=.75/c,P=f===q.HITTEST,v=this._outlineProgramOptions;v.id=P;const b=_.getMaterialProgram(a,y,v);if(g&&C(m)&&!b.isCompiled)return void m();a.useProgram(b),b.setUniformMatrix3fv("u_displayMat3",s===J.VIEWPORT?d.displayMat3:d.displayViewMat3),b.setUniform2fv("u_fillTranslation",r),b.setUniform1f("u_depth",t.z+Se),b.setUniform1f("u_outline_width",I),P&&b.setUniform4fv("u_id",o);let S=-1;for(const x of n){if(!x.layerData.has(i))continue;x.key.level!==S&&(S=x.key.level,y.setDataUniforms(b,l,t,S,p));const w=x.layerData.get(i);if(w.prepareForRendering(a),!w.outlineIndexCount)continue;const M=w.outlineVertexArrayObject;V(M)||(a.bindVAO(M),b.setUniformMatrix3fv("u_dvsMat3",x.transforms.dvs),a.setStencilFunction(W.EQUAL,x.stencilRef,255),a.drawElements($.TRIANGLES,w.outlineIndexCount,H.UNSIGNED_INT,Uint32Array.BYTES_PER_ELEMENT*w.outlineIndexStart),x.triangleCount+=w.outlineIndexCount/3)}}}class Ft extends re{constructor(){super(...arguments),this._programOptions={id:!1,pattern:!1,sdf:!1}}dispose(){}drawMany(e,i){const{context:t,displayLevel:n,state:r,drawPhase:s,painter:o,pixelRatio:a,spriteMosaic:l,styleLayerUID:d,requestRender:f,allowDelayedRender:h}=e;if(!i.some(R=>{var L,E;return(E=(L=R.layerData.get(d))==null?void 0:L.lineIndexCount)!=null?E:!1}))return;const c=e.styleLayer,p=c.lineMaterial,m=o.vectorTilesMaterialManager,g=c.getPaintValue("line-translate",n),y=c.getPaintValue("line-translate-anchor",n),_=c.getPaintProperty("line-pattern"),I=_!==void 0,P=I&&_.isDataDriven;let v,b;if(I&&!P){const R=_.getValue(n);v=l.getMosaicItemPosition(R)}let S=!1;if(!I){const R=c.getPaintProperty("line-dasharray");if(b=R!==void 0,S=b&&R.isDataDriven,b&&!S){const L=R.getValue(n),E=c.getDashKey(L,c.getLayoutValue("line-cap",n));v=l.getMosaicItemPosition(E)}}const x=1/a,w=s===q.HITTEST,M=this._programOptions;M.id=w,M.pattern=I,M.sdf=b;const T=m.getMaterialProgram(t,p,M);if(h&&C(f)&&!T.isCompiled)return void f();if(t.useProgram(T),T.setUniformMatrix3fv("u_displayViewMat3",r.displayViewMat3),T.setUniformMatrix3fv("u_displayMat3",y===J.VIEWPORT?r.displayMat3:r.displayViewMat3),T.setUniform2fv("u_lineTranslation",g),T.setUniform1f("u_depth",c.z),T.setUniform1f("u_antialiasing",x),w){const R=ne(d+1);T.setUniform4fv("u_id",R)}if(v&&C(v)){const{page:R}=v,L=l.getPageSize(R);C(L)&&(l.bind(t,j.LINEAR,R,O),T.setUniform2fv("u_mosaicSize",L),T.setUniform1i("u_texture",O))}let D=-1;for(const R of i){if(!R.layerData.has(d))continue;R.key.level!==D&&(D=R.key.level,p.setDataUniforms(T,n,c,D,l));const L=2**(n-D)/a;T.setUniform1f("u_zoomFactor",L);const E=R.layerData.get(d);if(!E.lineIndexCount)continue;E.prepareForRendering(t);const G=E.lineVertexArrayObject;if(!V(G)){if(t.bindVAO(G),T.setUniformMatrix3fv("u_dvsMat3",R.transforms.dvs),t.setStencilFunction(W.EQUAL,R.stencilRef,255),P||S){const B=E.patternMap;if(!B)continue;for(const[Z,U]of B){const Y=l.getPageSize(Z);C(Y)&&(l.bind(t,j.LINEAR,Z,O),T.setUniform2fv("u_mosaicSize",Y),T.setUniform1i("u_texture",O),t.drawElements($.TRIANGLES,U[1],H.UNSIGNED_INT,Uint32Array.BYTES_PER_ELEMENT*U[0]))}}else t.drawElements($.TRIANGLES,E.lineIndexCount,H.UNSIGNED_INT,Uint32Array.BYTES_PER_ELEMENT*E.lineIndexStart);R.triangleCount+=E.lineIndexCount/3}}}}const Ht=1/65536;class qt extends re{constructor(){super(...arguments),this._iconProgramOptions={id:!1,sdf:!1},this._sdfProgramOptions={id:!1},this._spritesTextureSize=ut()}dispose(){}drawMany(e,i){const{drawPhase:t,styleLayerUID:n}=e,r=e.styleLayer;let s;t===q.HITTEST&&(s=ne(n+1)),this._drawIcons(e,r,i,s),this._drawText(e,r,i,s)}_drawIcons(e,i,t,n){const{context:r,displayLevel:s,drawPhase:o,painter:a,spriteMosaic:l,state:d,styleLayerUID:f,requestRender:h,allowDelayedRender:c}=e,p=i.iconMaterial,m=a.vectorTilesMaterialManager;let g,y=!1;for(const D of t)if(D.layerData.has(f)&&(g=D.layerData.get(f),g.iconPerPageElementsMap.size>0)){y=!0;break}if(!y)return;const _=i.getPaintValue("icon-translate",s),I=i.getPaintValue("icon-translate-anchor",s);let P=i.getLayoutValue("icon-rotation-alignment",s);P===A.AUTO&&(P=i.getLayoutValue("symbol-placement",s)===ue.POINT?A.VIEWPORT:A.MAP);const v=P===A.MAP,b=i.getLayoutValue("icon-keep-upright",s)&&v,S=g.isIconSDF,x=o===q.HITTEST,w=this._iconProgramOptions;w.id=x,w.sdf=S;const M=m.getMaterialProgram(r,p,w);if(c&&C(h)&&!M.isCompiled)return void h();r.useProgram(M),M.setUniformMatrix3fv("u_displayViewMat3",P===A.MAP?d.displayViewMat3:d.displayMat3),M.setUniformMatrix3fv("u_displayMat3",I===J.VIEWPORT?d.displayMat3:d.displayViewMat3),M.setUniform2fv("u_iconTranslation",_),M.setUniform1f("u_depth",i.z),M.setUniform1f("u_mapRotation",ge(d.rotation)),M.setUniform1f("u_keepUpright",b?1:0),M.setUniform1f("u_level",10*s),M.setUniform1i("u_texture",O),M.setUniform1f("u_fadeDuration",ce/1e3),x&&M.setUniform4fv("u_id",n);let T=-1;for(const D of t){if(!D.layerData.has(f)||(D.key.level!==T&&(T=D.key.level,p.setDataUniforms(M,s,i,T,l)),g=D.layerData.get(f),g.iconPerPageElementsMap.size===0))continue;g.prepareForRendering(r),g.updateOpacityInfo();const R=g.iconVertexArrayObject;if(!V(R)){r.bindVAO(R),M.setUniformMatrix3fv("u_dvsMat3",D.transforms.dvs),M.setUniform1f("u_time",(performance.now()-g.lastOpacityUpdate)/1e3);for(const[L,E]of g.iconPerPageElementsMap)this._renderIconRange(e,M,E,L,D)}}}_renderIconRange(e,i,t,n,r){const{context:s,spriteMosaic:o}=e;this._spritesTextureSize[0]=o.getWidth(n)/4,this._spritesTextureSize[1]=o.getHeight(n)/4,i.setUniform2fv("u_mosaicSize",this._spritesTextureSize),o.bind(s,j.LINEAR,n,O),s.setStencilTestEnabled(!0),s.setStencilFunction(W.GREATER,255,255),s.setStencilWriteMask(0),s.drawElements($.TRIANGLES,t[1],H.UNSIGNED_INT,Uint32Array.BYTES_PER_ELEMENT*t[0]),r.triangleCount+=t[1]/3}_drawText(e,i,t,n){const{context:r,displayLevel:s,drawPhase:o,glyphMosaic:a,painter:l,pixelRatio:d,spriteMosaic:f,state:h,styleLayerUID:c,requestRender:p,allowDelayedRender:m}=e,g=i.textMaterial,y=l.vectorTilesMaterialManager;let _,I=!1;for(const F of t)if(F.layerData.has(c)&&(_=F.layerData.get(c),_.glyphPerPageElementsMap.size>0)){I=!0;break}if(!I)return;const P=i.getPaintProperty("text-opacity");if(P&&!P.isDataDriven&&P.getValue(s)===0)return;const v=i.getPaintProperty("text-color"),b=!v||v.isDataDriven||v.getValue(s)[3]>0,S=i.getPaintProperty("text-halo-width"),x=i.getPaintProperty("text-halo-color"),w=(!S||S.isDataDriven||S.getValue(s)>0)&&(!x||x.isDataDriven||x.getValue(s)[3]>0);if(!b&&!w)return;const M=24/8;let T=i.getLayoutValue("text-rotation-alignment",s);T===A.AUTO&&(T=i.getLayoutValue("symbol-placement",s)===ue.POINT?A.VIEWPORT:A.MAP);const D=T===A.MAP,R=i.getLayoutValue("text-keep-upright",s)&&D,L=o===q.HITTEST,E=.8*M/d;this._glyphTextureSize||(this._glyphTextureSize=dt(a.width/4,a.height/4));const G=i.getPaintValue("text-translate",s),B=i.getPaintValue("text-translate-anchor",s),Z=this._sdfProgramOptions;Z.id=L;const U=y.getMaterialProgram(r,g,Z);if(m&&C(p)&&!U.isCompiled)return void p();r.useProgram(U),U.setUniformMatrix3fv("u_displayViewMat3",T===A.MAP?h.displayViewMat3:h.displayMat3),U.setUniformMatrix3fv("u_displayMat3",B===J.VIEWPORT?h.displayMat3:h.displayViewMat3),U.setUniform2fv("u_textTranslation",G),U.setUniform1f("u_depth",i.z+Ht),U.setUniform2fv("u_mosaicSize",this._glyphTextureSize),U.setUniform1f("u_mapRotation",ge(h.rotation)),U.setUniform1f("u_keepUpright",R?1:0),U.setUniform1f("u_level",10*s),U.setUniform1i("u_texture",ve),U.setUniform1f("u_antialiasingWidth",E),U.setUniform1f("u_fadeDuration",ce/1e3),L&&U.setUniform4fv("u_id",n);let Y=-1;for(const F of t){if(!F.layerData.has(c)||(F.key.level!==Y&&(Y=F.key.level,g.setDataUniforms(U,s,i,Y,f)),_=F.layerData.get(c),_.glyphPerPageElementsMap.size===0))continue;_.prepareForRendering(r),_.updateOpacityInfo();const de=_.textVertexArrayObject;if(V(de))continue;r.bindVAO(de),U.setUniformMatrix3fv("u_dvsMat3",F.transforms.dvs),r.setStencilTestEnabled(!0),r.setStencilFunction(W.GREATER,255,255),r.setStencilWriteMask(0);const $e=(performance.now()-_.lastOpacityUpdate)/1e3;U.setUniform1f("u_time",$e),_.glyphPerPageElementsMap.forEach((Fe,He)=>{this._renderGlyphRange(r,Fe,He,a,U,w,b,F)})}}_renderGlyphRange(e,i,t,n,r,s,o,a){n.bind(e,j.LINEAR,t,ve),s&&(r.setUniform1f("u_halo",1),e.drawElements($.TRIANGLES,i[1],H.UNSIGNED_INT,Uint32Array.BYTES_PER_ELEMENT*i[0]),a.triangleCount+=i[1]/3),o&&(r.setUniform1f("u_halo",0),e.drawElements($.TRIANGLES,i[1],H.UNSIGNED_INT,Uint32Array.BYTES_PER_ELEMENT*i[0]),a.triangleCount+=i[1]/3)}}const Wt={vtlBackground:Nt,vtlFill:$t,vtlLine:Ft,vtlCircle:Vt,vtlSymbol:qt},Gt={background:{"background.frag":`#ifdef PATTERN
uniform lowp float u_opacity;
uniform lowp sampler2D u_texture;
varying mediump vec4 v_tlbr;
varying mediump vec2 v_tileTextureCoord;
#else
uniform lowp vec4 u_color;
#endif
#ifdef ID
varying mediump vec4 v_id;
#endif
void main() {
#ifdef PATTERN
mediump vec2 normalizedTextureCoord = mod(v_tileTextureCoord, 1.0);
mediump vec2 samplePos = mix(v_tlbr.xy, v_tlbr.zw, normalizedTextureCoord);
lowp vec4 color = texture2D(u_texture, samplePos);
gl_FragColor = u_opacity * color;
#else
gl_FragColor = u_color;
#endif
#ifdef ID
if (gl_FragColor.a < 1.0 / 255.0) {
discard;
}
gl_FragColor = v_id;
#endif
}`,"background.vert":`precision mediump float;
attribute vec2 a_pos;
#ifdef ID
uniform mediump vec4 u_id;
varying mediump vec4 v_id;
#endif
uniform highp mat3 u_dvsMat3;
uniform mediump float u_coord_range;
uniform mediump float u_depth;
#ifdef PATTERN
uniform mediump mat3 u_pattern_matrix;
varying mediump vec2 v_tileTextureCoord;
uniform mediump vec4 u_tlbr;
uniform mediump vec2 u_mosaicSize;
varying mediump vec4 v_tlbr;
#endif
void main() {
gl_Position = vec4((u_dvsMat3 * vec3(u_coord_range * a_pos, 1.0)).xy, u_depth, 1.0);
#ifdef PATTERN
v_tileTextureCoord = (u_pattern_matrix * vec3(a_pos, 1.0)).xy;
v_tlbr             = u_tlbr / u_mosaicSize.xyxy;
#endif
#ifdef ID
v_id = u_id / 255.0;
#endif
}`},circle:{"circle.frag":`precision lowp float;
varying lowp vec4 v_color;
varying lowp vec4 v_stroke_color;
varying mediump float v_blur;
varying mediump float v_stroke_width;
varying mediump float v_radius;
varying mediump vec2 v_offset;
#ifdef ID
varying mediump vec4 v_id;
#endif
void main()
{
mediump float dist = length(v_offset);
mediump float alpha = smoothstep(0.0, -v_blur, dist - 1.0);
lowp float color_mix_ratio = v_stroke_width < 0.01 ? 0.0 : smoothstep(-v_blur, 0.0, dist - v_radius / (v_radius + v_stroke_width));
gl_FragColor = alpha * mix(v_color, v_stroke_color, color_mix_ratio);
#ifdef ID
if (gl_FragColor.a < 1.0 / 255.0) {
discard;
}
gl_FragColor = v_id;
#endif
}`,"circle.vert":`precision mediump float;
attribute vec2 a_pos;
#pragma header
varying lowp vec4 v_color;
varying lowp vec4 v_stroke_color;
varying mediump float v_blur;
varying mediump float v_stroke_width;
varying mediump float v_radius;
varying mediump vec2 v_offset;
#ifdef ID
uniform mediump vec4 u_id;
varying mediump vec4 v_id;
#endif
uniform highp mat3 u_dvsMat3;
uniform highp mat3 u_displayMat3;
uniform mediump vec2 u_circleTranslation;
uniform mediump float u_depth;
uniform mediump float u_antialiasingWidth;
void main()
{
#pragma main
v_color = color * opacity;
v_stroke_color = stroke_color * stroke_opacity;
v_stroke_width = stroke_width;
v_radius = radius;
v_blur = max(blur, u_antialiasingWidth / (radius + stroke_width));
mediump vec2 offset = vec2(mod(a_pos, 2.0) * 2.0 - 1.0);
v_offset = offset;
#ifdef ID
v_id = u_id / 255.0;
#endif
mediump vec3 pos = u_dvsMat3 * vec3(a_pos * 0.5, 1.0) + u_displayMat3 * vec3((v_radius + v_stroke_width) * offset + u_circleTranslation, 0.0);
gl_Position = vec4(pos.xy, u_depth, 1.0);
}`},fill:{"fill.frag":`precision lowp float;
#ifdef PATTERN
uniform lowp sampler2D u_texture;
varying mediump vec2 v_tileTextureCoord;
varying mediump vec4 v_tlbr;
#endif
#ifdef ID
varying mediump vec4 v_id;
#endif
varying lowp vec4 v_color;
vec4 mixColors(vec4 color1, vec4 color2) {
float compositeAlpha = color2.a + color1.a * (1.0 - color2.a);
vec3 compositeColor = color2.rgb + color1.rgb * (1.0 - color2.a);
return vec4(compositeColor, compositeAlpha);
}
void main()
{
#ifdef PATTERN
mediump vec2 normalizedTextureCoord = fract(v_tileTextureCoord);
mediump vec2 samplePos = mix(v_tlbr.xy, v_tlbr.zw, normalizedTextureCoord);
lowp vec4 color = texture2D(u_texture, samplePos);
gl_FragColor = v_color[3] * color;
#else
gl_FragColor = v_color;
#endif
#ifdef ID
if (gl_FragColor.a < 1.0 / 255.0) {
discard;
}
gl_FragColor = v_id;
#endif
}`,"fill.vert":`precision mediump float;
attribute vec2 a_pos;
#pragma header
uniform highp mat3 u_dvsMat3;
uniform highp mat3 u_displayMat3;
uniform mediump float u_depth;
uniform mediump vec2 u_fillTranslation;
#ifdef PATTERN
#include <util/util.glsl>
uniform mediump vec2 u_mosaicSize;
uniform mediump float u_patternFactor;
varying mediump vec2 v_tileTextureCoord;
varying mediump vec4 v_tlbr;
#endif
#ifdef ID
uniform mediump vec4 u_id;
varying mediump vec4 v_id;
#endif
varying lowp vec4 v_color;
void main()
{
#pragma main
v_color = color * opacity;
#ifdef ID
v_id = u_id / 255.0;
#endif
#ifdef PATTERN
float patternWidth = nextPOT(tlbr.z - tlbr.x);
float patternHeight = nextPOT(tlbr.w - tlbr.y);
float scaleX = 1.0 / (patternWidth * u_patternFactor);
float scaleY = 1.0 / (patternHeight * u_patternFactor);
mat3 patterMat = mat3(scaleX, 0.0,    0.0,
0.0,    -scaleY, 0.0,
0.0,    0.0,    1.0);
v_tileTextureCoord = (patterMat * vec3(a_pos, 1.0)).xy;
v_tlbr             = tlbr / u_mosaicSize.xyxy;
#endif
vec3 pos = u_dvsMat3 * vec3(a_pos, 1.0) + u_displayMat3 * vec3(u_fillTranslation, 0.0);
gl_Position = vec4(pos.xy, u_depth, 1.0);
}`},icon:{"icon.frag":`precision mediump float;
uniform lowp sampler2D u_texture;
#ifdef SDF
uniform lowp vec4 u_color;
uniform lowp vec4 u_outlineColor;
#endif
varying mediump vec2 v_tex;
varying lowp float v_opacity;
varying mediump vec2 v_size;
varying lowp vec4 v_color;
#ifdef SDF
varying mediump flaot v_halo_width;
#endif
#ifdef ID
varying mediump vec4 v_id;
#endif
#include <util/encoding.glsl>
vec4 mixColors(vec4 color1, vec4 color2) {
float compositeAlpha = color2.a + color1.a * (1.0 - color2.a);
vec3 compositeColor = color2.rgb + color1.rgb * (1.0 - color2.a);
return vec4(compositeColor, compositeAlpha);
}
void main()
{
#ifdef SDF
lowp vec4 fillPixelColor = v_color;
float d = rgba2float(texture2D(u_texture, v_tex)) - 0.5;
const float softEdgeRatio = 0.248062016;
float size = max(v_size.x, v_size.y);
float dist = d * softEdgeRatio * size;
fillPixelColor *= clamp(0.5 - dist, 0.0, 1.0);
if (v_halo_width > 0.25) {
lowp vec4 outlinePixelColor = u_outlineColor;
const float outlineLimitRatio = (16.0 / 86.0);
float clampedOutlineSize = softEdgeRatio * min(v_halo_width, outlineLimitRatio * max(v_size.x, v_size.y));
outlinePixelColor *= clamp(0.5 - (abs(dist) - clampedOutlineSize), 0.0, 1.0);
gl_FragColor = v_opacity * mixColors(fillPixelColor, outlinePixelColor);
}
else {
gl_FragColor = v_opacity * fillPixelColor;
}
#else
lowp vec4 texColor = texture2D(u_texture, v_tex);
gl_FragColor = v_opacity * texColor;
#endif
#ifdef ID
if (gl_FragColor.a < 1.0 / 255.0) {
discard;
}
gl_FragColor = v_id;
#endif
}`,"icon.vert":`attribute vec2 a_pos;
attribute vec2 a_vertexOffset;
attribute vec4 a_texAngleRange;
attribute vec4 a_levelInfo;
attribute float a_opacityInfo;
#pragma header
#ifdef ID
uniform mediump vec4 u_id;
varying mediump vec4 v_id;
#endif
varying lowp vec4 v_color;
#ifdef SDF
varying mediump float v_halo_width;
#endif
uniform highp mat3 u_dvsMat3;
uniform highp mat3 u_displayMat3;
uniform highp mat3 u_displayViewMat3;
uniform mediump vec2 u_iconTranslation;
uniform vec2 u_mosaicSize;
uniform mediump float u_depth;
uniform mediump float u_mapRotation;
uniform mediump float u_level;
uniform lowp float u_keepUpright;
uniform mediump float u_fadeDuration;
varying mediump vec2 v_tex;
varying lowp float v_opacity;
varying mediump vec2 v_size;
const float C_OFFSET_PRECISION = 1.0 / 8.0;
const float C_256_TO_RAD = 3.14159265359 / 128.0;
const float C_DEG_TO_RAD = 3.14159265359 / 180.0;
const float tileCoordRatio = 1.0 / 8.0;
uniform highp float u_time;
void main()
{
#pragma main
v_color = color;
v_opacity = opacity;
#ifdef SDF
v_halo_width = halo_width;
#endif
float modded = mod(a_opacityInfo, 128.0);
float targetOpacity = (a_opacityInfo - modded) / 128.0;
float startOpacity = modded / 127.0;
float interpolatedOpacity = clamp(startOpacity + 2.0 * (targetOpacity - 0.5) * u_time / u_fadeDuration, 0.0, 1.0);
v_opacity *= interpolatedOpacity;
mediump float a_angle         = a_levelInfo[1];
mediump float a_minLevel      = a_levelInfo[2];
mediump float a_maxLevel      = a_levelInfo[3];
mediump vec2 a_tex            = a_texAngleRange.xy;
mediump float delta_z = 0.0;
mediump float rotated = mod(a_angle + u_mapRotation, 256.0);
delta_z += (1.0 - step(u_keepUpright, 0.0)) * step(64.0, rotated) * (1.0 - step(192.0, rotated));
delta_z += 1.0 - step(a_minLevel, u_level);
delta_z += step(a_maxLevel, u_level);
delta_z += step(v_opacity, 0.0);
vec2 offset = C_OFFSET_PRECISION * a_vertexOffset;
v_size = abs(offset);
#ifdef SDF
offset = (120.0 / 86.0) * offset;
#endif
mediump vec3 pos = u_dvsMat3 * vec3(a_pos, 1.0) + u_displayViewMat3 * vec3(size * offset, 0.0) + u_displayMat3 * vec3(u_iconTranslation, 0.0);
gl_Position = vec4(pos.xy, u_depth + delta_z, 1.0);
#ifdef ID
v_id = u_id / 255.0;
#endif
v_tex = a_tex.xy / u_mosaicSize;
}`},line:{"line.frag":`precision lowp float;
varying mediump vec2 v_normal;
varying highp float v_accumulatedDistance;
varying mediump float v_lineHalfWidth;
varying lowp vec4 v_color;
varying mediump float v_blur;
#if defined (PATTERN) || defined(SDF)
varying mediump vec4 v_tlbr;
varying mediump vec2 v_patternSize;
varying mediump float v_widthRatio;
uniform sampler2D u_texture;
uniform mediump float u_antialiasing;
#endif
#ifdef SDF
#include <util/encoding.glsl>
#endif
#ifdef ID
varying mediump vec4 v_id;
#endif
void main()
{
mediump float fragDist = length(v_normal) * v_lineHalfWidth;
lowp float alpha = clamp((v_lineHalfWidth - fragDist) / v_blur, 0.0, 1.0);
#ifdef PATTERN
mediump float relativeTexX = fract(v_accumulatedDistance / (v_patternSize.x * v_widthRatio));
mediump float relativeTexY = 0.5 + v_normal.y * v_lineHalfWidth / (v_patternSize.y * v_widthRatio);
mediump vec2 texCoord = mix(v_tlbr.xy, v_tlbr.zw, vec2(relativeTexX, relativeTexY));
lowp vec4 color = texture2D(u_texture, texCoord);
gl_FragColor = alpha * v_color[3] * color;
#elif defined(SDF)
mediump float relativeTexX = fract((v_accumulatedDistance * 0.5) / (v_patternSize.x * v_widthRatio));
mediump float relativeTexY =  0.5 + 0.25 * v_normal.y;
mediump vec2 texCoord = mix(v_tlbr.xy, v_tlbr.zw, vec2(relativeTexX, relativeTexY));
mediump float d = rgba2float(texture2D(u_texture, texCoord)) - 0.5;
float dist = d * (v_lineHalfWidth + u_antialiasing / 2.0);
gl_FragColor = alpha * clamp(0.5 - dist, 0.0, 1.0) * v_color;
#else
gl_FragColor = alpha * v_color;
#endif
#ifdef ID
if (gl_FragColor.a < 1.0 / 255.0) {
discard;
}
gl_FragColor = v_id;
#endif
}`,"line.vert":`precision mediump float;
attribute vec2 a_pos;
attribute vec4 a_extrude_offset;
attribute vec4 a_dir_normal;
attribute vec2 a_accumulatedDistance;
#pragma header
uniform highp mat3 u_dvsMat3;
uniform highp mat3 u_displayMat3;
uniform highp mat3 u_displayViewMat3;
uniform mediump float u_zoomFactor;
uniform mediump vec2 u_lineTranslation;
uniform mediump float u_antialiasing;
uniform mediump float u_depth;
varying mediump vec2 v_normal;
varying highp float v_accumulatedDistance;
const float scale = 1.0 / 31.0;
const mediump float tileCoordRatio = 8.0;
#if defined (SDF)
const mediump float sdfPatternHalfWidth = 15.5;
#endif
#if defined (PATTERN) || defined(SDF)
uniform mediump vec2 u_mosaicSize;
varying mediump vec4 v_tlbr;
varying mediump vec2 v_patternSize;
varying mediump float v_widthRatio;
#endif
#ifdef ID
uniform mediump vec4 u_id;
varying mediump vec4 v_id;
#endif
varying lowp vec4 v_color;
varying mediump float v_lineHalfWidth;
varying mediump float v_blur;
void main()
{
#pragma main
v_color = color * opacity;
v_blur = blur + u_antialiasing;
v_normal = a_dir_normal.zw * scale;
#if defined (PATTERN) || defined(SDF)
v_tlbr          = tlbr / u_mosaicSize.xyxy;
v_patternSize   = vec2(tlbr.z - tlbr.x, tlbr.y - tlbr.w);
#if defined (PATTERN)
v_widthRatio = width / v_patternSize.y;
#else
v_widthRatio = width / sdfPatternHalfWidth / 2.0;
#endif
#endif
v_lineHalfWidth = (width + u_antialiasing) * 0.5;
mediump vec2 dir = a_dir_normal.xy * scale;
mediump vec2 offset_ = a_extrude_offset.zw * scale * offset;
mediump vec2 dist = v_lineHalfWidth * scale * a_extrude_offset.xy;
mediump vec3 pos = u_dvsMat3 * vec3(a_pos + offset_ * tileCoordRatio / u_zoomFactor, 1.0) + u_displayViewMat3 * vec3(dist, 0.0) + u_displayMat3 * vec3(u_lineTranslation, 0.0);
gl_Position = vec4(pos.xy, u_depth, 1.0);
#if defined (PATTERN) || defined(SDF)
v_accumulatedDistance = a_accumulatedDistance.x * u_zoomFactor / tileCoordRatio + dot(dir, dist + offset_);
#endif
#ifdef ID
v_id = u_id / 255.0;
#endif
}`},outline:{"outline.frag":`varying lowp vec4 v_color;
varying mediump vec2 v_normal;
#ifdef ID
varying mediump vec4 v_id;
#endif
void main()
{
lowp float dist = abs(v_normal.y);
lowp float alpha = smoothstep(1.0, 0.0, dist);
gl_FragColor = alpha * v_color;
#ifdef ID
if (gl_FragColor.a < 1.0 / 255.0) {
discard;
}
gl_FragColor = v_id;
#endif
}`,"outline.vert":`attribute vec2 a_pos;
attribute vec2 a_offset;
attribute vec2 a_xnormal;
#pragma header
varying lowp vec4 v_color;
#ifdef ID
uniform mediump vec4 u_id;
varying mediump vec4 v_id;
#endif
uniform highp mat3 u_dvsMat3;
uniform highp mat3 u_displayMat3;
uniform mediump vec2 u_fillTranslation;
uniform mediump float u_depth;
uniform mediump float u_outline_width;
varying lowp vec2 v_normal;
const float scale = 1.0 / 15.0;
void main()
{
#pragma main
v_color = color * opacity;
#ifdef ID
v_id = u_id / 255.0;
#endif
v_normal = a_xnormal;
mediump vec2 dist = u_outline_width * scale * a_offset;
mediump vec3 pos = u_dvsMat3 * vec3(a_pos, 1.0) + u_displayMat3 * vec3(dist + u_fillTranslation, 0.0);
gl_Position = vec4(pos.xy, u_depth, 1.0);
}`},text:{"text.frag":`uniform lowp sampler2D u_texture;
varying lowp vec2 v_tex;
varying lowp vec4 v_color;
varying mediump float v_edgeWidth;
varying mediump float v_edgeDistance;
#ifdef ID
varying mediump vec4 v_id;
#endif
void main()
{
lowp float dist = texture2D(u_texture, v_tex).a;
mediump float alpha = smoothstep(v_edgeDistance - v_edgeWidth, v_edgeDistance + v_edgeWidth, dist);
gl_FragColor = alpha * v_color;
#ifdef ID
if (gl_FragColor.a < 1.0 / 255.0) {
discard;
}
gl_FragColor = v_id;
#endif
}`,"text.vert":`attribute vec2 a_pos;
attribute vec2 a_vertexOffset;
attribute vec4 a_texAngleRange;
attribute vec4 a_levelInfo;
attribute float a_opacityInfo;
#pragma header
varying lowp vec4 v_color;
#ifdef ID
uniform mediump vec4 u_id;
varying mediump vec4 v_id;
#endif
uniform highp mat3 u_dvsMat3;
uniform highp mat3 u_displayMat3;
uniform highp mat3 u_displayViewMat3;
uniform mediump vec2 u_textTranslation;
uniform vec2 u_mosaicSize;
uniform mediump float u_depth;
uniform mediump float u_mapRotation;
uniform mediump float u_level;
uniform lowp float u_keepUpright;
uniform mediump float u_fadeDuration;
varying lowp vec2 v_tex;
const float offsetPrecision = 1.0 / 8.0;
const mediump float edgePos = 0.75;
uniform mediump float u_antialiasingWidth;
varying mediump float v_edgeDistance;
varying mediump float v_edgeWidth;
uniform lowp float u_halo;
const float sdfFontScale = 1.0 / 24.0;
const float sdfPixel = 3.0;
uniform highp float u_time;
void main()
{
#pragma main
if (u_halo > 0.5)
{
v_color = halo_color * opacity;
halo_width *= sdfPixel;
halo_blur *= sdfPixel;
}
else
{
v_color = color * opacity;
halo_width = 0.0;
halo_blur = 0.0;
}
float modded = mod(a_opacityInfo, 128.0);
float targetOpacity = (a_opacityInfo - modded) / 128.0;
float startOpacity = modded / 127.0;
float interpolatedOpacity = clamp(startOpacity + 2.0 * (targetOpacity - 0.5) * u_time / u_fadeDuration, 0.0, 1.0);
v_color *= interpolatedOpacity;
mediump float a_angle       = a_levelInfo[1];
mediump float a_minLevel    = a_levelInfo[2];
mediump float a_maxLevel    = a_levelInfo[3];
mediump vec2 a_tex          = a_texAngleRange.xy;
mediump float a_visMinAngle    = a_texAngleRange.z;
mediump float a_visMaxAngle    = a_texAngleRange.w;
mediump float delta_z = 0.0;
mediump float angle = mod(a_angle + u_mapRotation, 256.0);
if (a_visMinAngle < a_visMaxAngle)
{
delta_z += (1.0 - step(u_keepUpright, 0.0)) * (step(a_visMaxAngle, angle) + (1.0 - step(a_visMinAngle, angle)));
}
else
{
delta_z += (1.0 - step(u_keepUpright, 0.0)) * (step(a_visMaxAngle, angle) * (1.0 - step(a_visMinAngle, angle)));
}
delta_z += 1.0 - step(a_minLevel, u_level);
delta_z += step(a_maxLevel, u_level);
delta_z += step(v_color[3], 0.0);
v_tex = a_tex.xy / u_mosaicSize;
#ifdef ID
v_id = u_id / 255.0;
#endif
v_edgeDistance = edgePos - halo_width / size;
v_edgeWidth = (u_antialiasingWidth + halo_blur) / size;
mediump vec3 pos = u_dvsMat3 * vec3(a_pos, 1.0) + sdfFontScale * u_displayViewMat3 * vec3(offsetPrecision * size * a_vertexOffset, 0.0) + u_displayMat3 * vec3(u_textTranslation, 0.0);
gl_Position = vec4(pos.xy, u_depth + delta_z, 1.0);
}`},util:{"encoding.glsl":`const vec4 rgba2float_factors = vec4(
255.0 / (256.0),
255.0 / (256.0 * 256.0),
255.0 / (256.0 * 256.0 * 256.0),
255.0 / (256.0 * 256.0 * 256.0 * 256.0)
);
float rgba2float(vec4 rgba) {
return dot(rgba, rgba2float_factors);
}`,"util.glsl":`float nextPOT(in float x) {
return pow(2.0, ceil(log2(abs(x))));
}`}};class Bt{constructor(e){this._readFile=e}resolveIncludes(e){return this._resolve(e)}_resolve(e,i=new Map){if(i.has(e))return i.get(e);const t=this._read(e);if(!t)throw new Error(`cannot find shader file ${e}`);const n=/^[^\S\n]*#include\s+<(\S+)>[^\S\n]?/gm;let r=n.exec(t);const s=[];for(;r!=null;)s.push({path:r[1],start:r.index,length:r[0].length}),r=n.exec(t);let o=0,a="";return s.forEach(l=>{a+=t.slice(o,l.start),a+=i.has(l.path)?"":this._resolve(l.path,i),o=l.start+l.length}),a+=t.slice(o),i.set(e,a),a}_read(e){return this._readFile(e)}}function jt(u){let e=Gt;return u.split("/").forEach(i=>{e&&(e=e[i])}),e}const Jt=new Bt(jt);function k(u){return Jt.resolveIncludes(u)}function Kt(u){const{options:e,value:i}=u;return typeof e[i]=="number"}function K(u){let e="";for(const i in u){const t=u[i];if(typeof t=="boolean")t&&(e+=`#define ${i}
`);else if(typeof t=="number")e+=`#define ${i} ${t.toFixed()}
`;else if(typeof t=="object")if(Kt(t)){const{value:n,options:r,namespace:s}=t,o=s?`${s}_`:"";for(const a in r)e+=`#define ${o}${a} ${r[a].toFixed()}
`;e+=`#define ${i} ${o}${n}
`}else{const n=t.options;let r=0;for(const s in n)e+=`#define ${n[s]} ${(r++).toFixed()}
`;e+=`#define ${i} ${n[t.value]}
`}}return e}const Te=u=>K({ID:u.id,PATTERN:u.pattern}),Yt={shaders:u=>({vertexShader:Te(u)+k("background/background.vert"),fragmentShader:Te(u)+k("background/background.frag")})},Pe=u=>K({ID:u.id}),Xt={shaders:u=>({vertexShader:Pe(u)+k("circle/circle.vert"),fragmentShader:Pe(u)+k("circle/circle.frag")})},Ie=u=>K({ID:u.id,PATTERN:u.pattern}),Qt={shaders:u=>({vertexShader:Ie(u)+k("fill/fill.vert"),fragmentShader:Ie(u)+k("fill/fill.frag")})},Me=u=>K({ID:u.id}),Zt={shaders:u=>({vertexShader:Me(u)+k("outline/outline.vert"),fragmentShader:Me(u)+k("outline/outline.frag")})},Re=u=>K({ID:u.id,SDF:u.sdf}),ei={shaders:u=>({vertexShader:Re(u)+k("icon/icon.vert"),fragmentShader:Re(u)+k("icon/icon.frag")})},De=u=>K({ID:u.id,PATTERN:u.pattern,SDF:u.sdf}),ti={shaders:u=>({vertexShader:De(u)+k("line/line.vert"),fragmentShader:De(u)+k("line/line.frag")})},Ce=u=>K({ID:u.id}),ii={shaders:u=>({vertexShader:Ce(u)+k("text/text.vert"),fragmentShader:Ce(u)+k("text/text.frag")})};class ni{constructor(){this._programByKey=new Map}dispose(){this._programByKey.forEach(e=>e.dispose()),this._programByKey.clear()}getMaterialProgram(e,i,t){const n=i.key<<3|this._getMaterialOptionsValue(i.type,t);if(this._programByKey.has(n))return this._programByKey.get(n);const r=this._getProgramTemplate(i.type),{shaders:s}=r,{vertexShader:o,fragmentShader:a}=s(t),l=i.getShaderHeader(),d=i.getShaderMain(),f=o.replace("#pragma header",l).replace("#pragma main",d),h=e.programCache.acquire(f,a,i.getAttributeLocations());return this._programByKey.set(n,h),h}_getMaterialOptionsValue(e,i){switch(e){case z.BACKGROUND:{const t=i;return(t.pattern?1:0)<<1|(t.id?1:0)}case z.FILL:{const t=i;return(t.pattern?1:0)<<1|(t.id?1:0)}case z.OUTLINE:return i.id?1:0;case z.LINE:{const t=i;return(t.sdf?1:0)<<2|(t.pattern?1:0)<<1|(t.id?1:0)}case z.ICON:{const t=i;return(t.sdf?1:0)<<1|(t.id?1:0)}case z.CIRCLE:return i.id?1:0;case z.TEXT:return i.id?1:0;default:return 0}}_getProgramTemplate(e){switch(e){case z.BACKGROUND:return Yt;case z.CIRCLE:return Xt;case z.FILL:return Qt;case z.ICON:return ei;case z.LINE:return ti;case z.OUTLINE:return Zt;case z.TEXT:return ii;default:return null}}}const Ee=1e-6;class Ue{constructor(e,i){this.spriteMosaic=e,this.glyphMosaic=i,this._brushCache=new Map,this._vtlMaterialManager=new ni}dispose(){this._brushCache&&(this._brushCache.forEach(e=>e.dispose()),this._brushCache=null),this._vtlMaterialManager=Oe(this._vtlMaterialManager),this.spriteMosaic.dispose(),this.glyphMosaic.dispose()}get vectorTilesMaterialManager(){return this._vtlMaterialManager}drawTile(e,i,t){const{context:n}=e,r=t.layers;t.backgroundBucketIds.length>0&&(e.renderPass="background",t.backgroundBucketIds.forEach(s=>this._renderStyleLayer(t.getLayerById(s),e,i,!0))),n.setBlendingEnabled(!1),n.setDepthTestEnabled(!0),n.setDepthWriteEnabled(!0),n.setDepthFunction(W.LEQUAL),e.renderPass="opaque";for(let s=r.length-1;s>=0;s--)this._renderStyleLayer(r[s],e,i,!1);n.setDepthWriteEnabled(!1),n.setBlendingEnabled(!0),n.setBlendFunctionSeparate(se.ONE,se.ONE_MINUS_SRC_ALPHA,se.ONE,se.ONE_MINUS_SRC_ALPHA),e.renderPass="translucent";for(let s=0;s<r.length;s++)this._renderStyleLayer(r[s],e,i,!1);n.setDepthTestEnabled(!1),n.bindVAO()}_renderStyleLayer(e,i,t,n=!1){if(!(n||e&&t.layerData.has(e.uid)))return;const r=e.getLayoutProperty("visibility");if(r&&r.getValue()===Ne.NONE)return;const{renderPass:s}=i;let o;switch(e.type){case ee.BACKGROUND:if(s!=="background")return;o="vtlBackground";break;case ee.FILL:if(s!=="opaque"&&i.renderPass!=="translucent")return;o="vtlFill";break;case ee.LINE:if(s!=="translucent")return;o="vtlLine";break;case ee.CIRCLE:if(s!=="translucent")return;o="vtlCircle";break;case ee.SYMBOL:if(s!=="translucent")return;o="vtlSymbol"}const a=i.displayLevel;e.minzoom!==void 0&&e.minzoom>a+Ee||e.maxzoom!==void 0&&e.maxzoom<=a-Ee||(i.styleLayerUID=e.uid,i.styleLayer=e,this._drawWithBrush(i,t,o))}_drawWithBrush(e,i,t){if(!this._brushCache.has(t)){const n=Wt[t];this._brushCache.set(t,new n)}this._brushCache.get(t).drawMany(e,[i])}}let X=class extends wt(xt(bt)){constructor(){super(...arguments),this.type="vector-tile-3d"}initialize(){if(V(this.layer.fullExtent))return void this.addResolvingPromise(Promise.reject(new ht("vectortilelayerview:full-extent-undefined","This layer view's layer does not define a fullExtent.")));const{basemapTerrain:u,spatialReference:e,state:i,viewingMode:t}=this.view,{pixelRatio:n}=i,r=t==="local"&&!ft(e)||_t.force512VTL,s=this.layer.tileInfo.spatialReference.isGeographic,o=r?this.layer.tileInfo:this.layer.tileInfo.getOrCreateCompatible(256,s?1:2),a=this._getTileInfoSupportError(o,this.layer.fullExtent);if(C(a))return this.addResolvingPromise(Promise.reject(a));const l=mt(()=>{var _,I;return(I=(_=this.view)==null?void 0:_.basemapTerrain)==null?void 0:I.tilingSchemeLocked}).then(()=>{const _=u.tilingScheme,I=_.pixelSize;let P;if(this.schemaHelper=new St(I,C(u.spatialReference)&&u.spatialReference.isGeographic),I===256){const b=this.layer.tileInfo.spatialReference.isGeographic;P=this.layer.tileInfo.getOrCreateCompatible(256,b?1:2)}else P=this.view.spatialReference.isGeographic?this.layer.tileInfo.getOrCreateCompatible(512,.5):this.layer.tileInfo;const v=this._getTileInfoCompatibilityError(P,_);if(v)throw v;this.tileInfo=P});this._tileHandlerController=new AbortController;const d=this.view.resourceController;this._memCache=d.memoryController.newCache(this.layer.uid,_=>{_.release()});const f=new ye(this.layer.currentStyleInfo.style),h=u.mapTileRequester;this._tileHandler=new be(this.layer,f,n,this._memCache,h);const c=this._tileHandlerController.signal,p=_=>d.schedule(_),m=this._tileHandler.start({signal:c,schedule:p}),g=this._tileHandler.spriteMosaic;g.then(_=>{!pt(c)&&this._tileHandler&&(this.painter=new Ue(_,this._tileHandler.glyphMosaic))}),m.then(()=>this._tileHandlerController=null),this.updatingHandles.add(()=>{var _;return{style:this.layer.currentStyleInfo.style,newPixelRatio:(_=this.view.state)==null?void 0:_.pixelRatio}},({style:_})=>{this._tileHandlerController&&this._tileHandlerController.abort(),this._tileHandlerController=new AbortController,this._memCache.clear();const I=new ye(_),P=new be(this.layer,I,n,this._memCache,h),v=P.start({signal:this._tileHandlerController.signal,schedule:p}),b=P.spriteMosaic;v.then(()=>this._tileHandlerController=null),this.updatingHandles.addPromise(Promise.all([v,b]).then(([,S])=>{const x=this._tileHandler,w=this.painter;this.painter=new Ue(S,P.glyphMosaic),this._tileHandler=P,this.emit("data-changed"),x.destroy(),w&&w.dispose()}))});const y=Promise.all([l,m,g]);this.addResolvingPromise(y)}destroy(){this.painter=Oe(this.painter),this._tileHandlerController&&(this._tileHandlerController.abort(),this._tileHandlerController=null),pe(this._tileHandler),this._memCache=pe(this._memCache),this._tileHandler=null}get dataLevelRange(){const u=this.tileInfo.lods,e=u[0].scale,i=u[u.length-1].scale,t=this.levelRangeFromScaleRange(e,i);return t.minLevel===1&&this.tileInfo.size[0]===256&&(t.minLevel=0),t}async fetchTile(u,e,i,t){return this._tileHandler.getVectorTile(u,e,i,t)}};ae([oe()],X.prototype,"layer",void 0),ae([oe()],X.prototype,"dataLevelRange",null),ae([oe()],X.prototype,"updatingProgressValue",void 0),X=ae([gt("esri.views.3d.layers.VectorTileLayerView3D")],X);const pi=X;export{pi as default};

import{re as S,rG as w,rf as I,nw as O,nx as $,ny as E,nz as T,rg as M,rj as L,rD as P,cG as j,r as F,c3 as J,sb as b,io as g,ia as N,bz as f,at as R,id as U,rk as q,rU as k,s as v,F as A,e as i,f as n,dX as z,g9 as _,nC as G,k as V,J as B,dY as C}from"./index.f489a479.js";import{E as D,y as H,z as K}from"./SublayersOwner.464da273.js";import{c as W}from"./ExportImageParameters.610e8695.js";import{n as x}from"./sublayerUtils.18630733.js";import"./floorFilterUtils.05eb8c6a.js";let s=class extends S(w(I(D(H(O($(E(T(M(L(P(j(B))))))))))))){constructor(...e){super(...e),this.datesInUnknownTimezone=!1,this.dpi=96,this.gdbVersion=null,this.imageFormat="png24",this.imageMaxHeight=2048,this.imageMaxWidth=2048,this.imageTransparency=!0,this.isReference=null,this.labelsVisible=!1,this.operationalLayerType="ArcGISMapServiceLayer",this.sourceJSON=null,this.sublayers=null,this.type="map-image",this.url=null}normalizeCtorArgs(e,r){return typeof e=="string"?{url:e,...r}:e}load(e){const r=F(e)?e.signal:null;return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["Map Service"]},e).catch(J).then(()=>this._fetchService(r))),Promise.resolve(this)}readImageFormat(e,r){const p=r.supportedImageFormatTypes;return p&&p.includes("PNG32")?"png32":"png24"}writeSublayers(e,r,p,t){if(!this.loaded||!e)return;const o=e.slice().reverse().flatten(({sublayers:a})=>a&&a.toArray().reverse()).toArray();let l=!1;if(this.capabilities&&this.capabilities.operations.supportsExportMap&&this.capabilities.exportMap.supportsDynamicLayers){const a=b(t.origin);if(a===g.PORTAL_ITEM){const h=this.createSublayersForOrigin("service").sublayers;l=x(o,h,g.SERVICE)}else if(a>g.PORTAL_ITEM){const h=this.createSublayersForOrigin("portal-item");l=x(o,h.sublayers,b(h.origin))}}const c=[],m={writeSublayerStructure:l,...t};let y=l;o.forEach(a=>{const h=a.write({},m);c.push(h),y=y||a.originOf("visible")==="user"}),c.some(a=>Object.keys(a).length>1)&&(r.layers=c),y&&(r.visibleLayers=o.filter(a=>a.visible).map(a=>a.id))}createExportImageParameters(e,r,p,t){const o=t&&t.pixelRatio||1;e&&this.version>=10&&(e=e.clone().shiftCentralMeridian());const l=new W({layer:this,floors:t==null?void 0:t.floors,scale:N({extent:e,width:r})*o}),c=l.toJSON();l.destroy();const m=!t||!t.rotation||this.version<10.3?{}:{rotation:-t.rotation},y=e&&e.spatialReference,a=y.wkid||JSON.stringify(y.toJSON());c.dpi*=o;const h={};if(t!=null&&t.timeExtent){const{start:u,end:d}=t.timeExtent.toJSON();h.time=u&&d&&u===d?""+u:`${u!=null?u:"null"},${d!=null?d:"null"}`}else this.timeInfo&&!this.timeInfo.hasLiveData&&(h.time="null,null");return{bbox:e&&e.xmin+","+e.ymin+","+e.xmax+","+e.ymax,bboxSR:a,imageSR:a,size:r+","+p,...c,...m,...h}}async fetchImage(e,r,p,t){return this._fetchImage("image",e,r,p,t)}async fetchImageBitmap(e,r,p,t){const o=await this._fetchImage("blob",e,r,p,t);return createImageBitmap(o)}async fetchRecomputedExtents(e={}){const r={...e,query:{returnUpdates:!0,f:"json",...this.customParameters,token:this.apiKey}},{data:p}=await f(this.url,r),{extent:t,fullExtent:o,timeExtent:l}=p,c=t||o;return{fullExtent:c&&R.fromJSON(c),timeExtent:l&&U.fromJSON({start:l[0],end:l[1]})}}loadAll(){return q(this,e=>{e(this.allSublayers)})}serviceSupportsSpatialReference(e){return k(this,e)}async _fetchImage(e,r,p,t,o){var m;const l={responseType:e,signal:(m=o==null?void 0:o.signal)!=null?m:null,query:{...this.parsedUrl.query,...this.createExportImageParameters(r,p,t,o),f:"image",...this.refreshParameters,...this.customParameters,token:this.apiKey}},c=this.parsedUrl.path+"/export";if(l.query.dynamicLayers!=null&&!this.capabilities.exportMap.supportsDynamicLayers)throw new v("mapimagelayer:dynamiclayer-not-supported",`service ${this.url} doesn't support dynamic layers, which is required to be able to change the sublayer's order, rendering, labeling or source.`,{query:l.query});try{const{data:y}=await f(c,l);return y}catch(y){throw A(y)?y:new v("mapimagelayer:image-fetch-error",`Unable to load image: ${c}`,{error:y})}}async _fetchService(e){if(this.sourceJSON)return void this.read(this.sourceJSON,{origin:"service",url:this.parsedUrl});const{data:r,ssl:p}=await f(this.parsedUrl.path,{query:{f:"json",...this.parsedUrl.query,...this.customParameters,token:this.apiKey},signal:e});p&&(this.url=this.url.replace(/^http:/i,"https:")),this.sourceJSON=r,this.read(r,{origin:"service",url:this.parsedUrl})}};i([n({type:Boolean})],s.prototype,"datesInUnknownTimezone",void 0),i([n()],s.prototype,"dpi",void 0),i([n()],s.prototype,"gdbVersion",void 0),i([n()],s.prototype,"imageFormat",void 0),i([z("imageFormat",["supportedImageFormatTypes"])],s.prototype,"readImageFormat",null),i([n({json:{origins:{service:{read:{source:"maxImageHeight"}}}}})],s.prototype,"imageMaxHeight",void 0),i([n({json:{origins:{service:{read:{source:"maxImageWidth"}}}}})],s.prototype,"imageMaxWidth",void 0),i([n()],s.prototype,"imageTransparency",void 0),i([n({type:Boolean,json:{read:!1,write:{enabled:!0,overridePolicy:()=>({enabled:!1})}}})],s.prototype,"isReference",void 0),i([n({json:{read:!1,write:!1}})],s.prototype,"labelsVisible",void 0),i([n({type:["ArcGISMapServiceLayer"]})],s.prototype,"operationalLayerType",void 0),i([n({json:{read:!1,write:!1}})],s.prototype,"popupEnabled",void 0),i([n()],s.prototype,"sourceJSON",void 0),i([n({json:{write:{ignoreOrigin:!0}}})],s.prototype,"sublayers",void 0),i([_("sublayers",{layers:{type:[K]},visibleLayers:{type:[C]}})],s.prototype,"writeSublayers",null),i([n({type:["show","hide","hide-children"]})],s.prototype,"listMode",void 0),i([n({json:{read:!1},readOnly:!0,value:"map-image"})],s.prototype,"type",void 0),i([n(G)],s.prototype,"url",void 0),s=i([V("esri.layers.MapImageLayer")],s);const te=s;export{te as default};
import{e as n,f as d,k as f,m as x,t as o,b$ as g,b7 as T,ip as z,i as M,r as l,C as O,D as C,cO as G,O as S,aF as H,gj as I,cT as u,dU as P,iq as V,ho as $,cM as b,cN as h,cX as A,h7 as L,h5 as p,cU as N,cV as D,ir as U}from"./index.d2d38865.js";import{a as B}from"./normalizeUtilsSync.4e23169b.js";import{n as F}from"./LayerView3D.69b4d800.js";import{p as W}from"./ImageMaterial.62e90caa.js";import{u as j}from"./LayerView.74f87dba.js";let i=class extends x{constructor(e){super(e)}get bounds(){const e=this.coords;return o(e)||o(e.extent)?null:g(e.extent)}get coords(){var t;const e=(t=T(this.element.georeference))==null?void 0:t.coords;return z(e,this.spatialReference).geometry}get normalizedCoords(){return M.fromJSON(B(this.coords))}get normalizedBounds(){const e=l(this.normalizedCoords)?this.normalizedCoords.extent:null;return l(e)?g(e):null}};n([d()],i.prototype,"spatialReference",void 0),n([d()],i.prototype,"element",void 0),n([d()],i.prototype,"bounds",null),n([d()],i.prototype,"coords",null),n([d()],i.prototype,"normalizedCoords",null),n([d()],i.prototype,"normalizedBounds",null),i=n([f("esri.layers.support.media.MediaElementView")],i);let m=class extends F(j){constructor(){super(...arguments),this.type="media-3d",this.drapeSourceType=O.RasterImage,this.updatePolicy=C.ASYNC,this._uidToElement=new Map,this._renderedElements=new Map,this._lastDrapingExtent=null,this._update=G(async(e,t,r)=>{const a=await this._collectMediaElements(e,t,r);this._synchronizeRenderElements(a)},0)}initialize(){this._renderer=this.view.basemapTerrain.overlayManager.registerGeometryDrapeSource(this),this.handles.add([S(()=>this.view.basemapTerrain.overlayManager.unregisterDrapeSource(this)),H(()=>this.layer.source,"refresh",()=>this._updateWithLastDrapingExtent())]),this.updatingHandles.add(()=>this.suspended,()=>this._updateWithLastDrapingExtent())}setDrapingExtent(e,t){this._lastDrapingExtent={overlays:e,spatialReference:t},this._updateWithLastDrapingExtent()}getHit(e){const t=this._uidToElement.get(e);return t?{type:"media",element:t,layer:this.layer}:null}_updateWithLastDrapingExtent(){if(o(this._lastDrapingExtent)||this.suspended)return void(this._renderer&&this._synchronizeRenderElements(new Set));const{overlays:e,spatialReference:t}=this._lastDrapingExtent;this.updatingHandles.addPromise(this._update(e,t).catch(()=>{}))}async _collectMediaElements(e,t,r){const a=this.layer.source;return o(a)?new Set:new Set((await Promise.all(e.map(s=>a.queryElements(I(s.extent,t),{signal:r})))).flat())}_synchronizeRenderElements(e){this._synchronizeRenderElementsRemove(e),this._synchronizeRenderElementsAdd(e)}_synchronizeRenderElementsRemove(e){const t=new Set,r=[];this._renderedElements.forEach((a,s)=>{e.has(s)||(t.add(s),l(a.renderData)&&r.push(a.renderData.renderGeometry),this._removeElement(s,a))}),this._renderer.removeGeometries(r,u.REMOVE)}_synchronizeRenderElementsAdd(e){for(const t of e)this._renderedElements.has(t)||this._createRenderElement(t)}_removeElement(e,{renderData:t,handle:r}){this._destroyRenderData(t),this._renderedElements.delete(e),this._uidToElement.delete(e.uid),r.remove()}async _createRenderElement(e){const t=new i({spatialReference:this.view.spatialReference,element:e}),r={renderData:null,handle:P([this.updatingHandles.add(()=>e.opacity,a=>{l(r.renderData)&&r.renderData.material.setParameters({opacity:a})}),this.updatingHandles.add(()=>t.coords,a=>{l(r.renderData)?this._updateGeometry(r,r.renderData,a):this._initializeRenderData(t,r)}),this.updatingHandles.add(()=>e.content,()=>this._initializeRenderData(t,r)),V(t)])};this._renderedElements.set(e,r),this._uidToElement.set(e.uid,e),this.updatingHandles.addPromise(e.load().catch(()=>{})),this._initializeRenderData(t,r)}_initializeRenderData(e,t){const{coords:r,element:a}=e;if(o(r)||o(a.content))return void(t.renderData=this._destroyRenderData(t.renderData));if(l(t.renderData))return;const s=this._createTexture(a.content);this.view._stage.add(s);const c=this.view._stage.loadImmediate(s);$(c)&&this.updatingHandles.addPromise(c);const y=new W({initTextureTransparent:!0,textureId:s.id,opacity:a.opacity,transparent:!0}),v=this._positionVertexBufferFromCoordinates(r),R=[0,0,1,0,1,1,0,1],_=[0,1,2,0,2,3],w=new b([[h.POSITION,{data:v,size:3,exclusive:!0}],[h.UV0,{data:R,size:2,exclusive:!0}]],[[h.POSITION,_],[h.UV0,_]]),E=new A(w,y,{layerUid:this.layer.uid,graphicUid:a.uid});this._renderer.addGeometries([E],u.ADD),t.renderData={renderGeometry:E,texture:s,material:y}}_updateGeometry(e,t,r){if(o(r))return void(e.renderData=this._destroyRenderData(e.renderData));const a=this._positionVertexBufferFromCoordinates(r);t.renderGeometry.vertexAttributes.get(h.POSITION).data=a,this._renderer.modifyGeometries([t.renderGeometry],L.VERTEXATTRS)}_positionVertexBufferFromCoordinates(e){const[t,r,a,s]=e.rings[0];return new Float64Array([t[0],t[1],p,s[0],s[1],p,a[0],a[1],p,r[0],r[1],p])}_destroyRenderData(e){return o(e)||(this.view._stage.remove(e.texture),this._renderer.removeGeometries([e.renderGeometry],u.REMOVE),e.material.dispose()),null}_createTexture(e){const t=e instanceof HTMLImageElement?e.naturalWidth:e.width,r=e instanceof HTMLImageElement?e.naturalHeight:e.height;return new N(e,{wrap:{s:D.CLAMP_TO_EDGE,t:D.CLAMP_TO_EDGE},preMultiplyAlpha:!0,width:t,height:r,mipmap:!0,powerOfTwoResizeMode:U.STRETCH,updateCallback:()=>this.view.basemapTerrain.overlayManager.setDrawTexturesDirty()})}get test(){const e=this;return{get numberOfElements(){return e._renderedElements.size}}}};n([d({readOnly:!0})],m.prototype,"type",void 0),n([d()],m.prototype,"layer",void 0),m=n([f("esri.views.3d.layers.MediaLayerView3D")],m);const K=m;export{K as default};
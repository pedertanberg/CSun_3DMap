import{x as p,e,f as t,k as i,z as a,r as c,A as n,m as h}from"./index.f489a479.js";import{A as l}from"./GraphicsProcessor.2d99696b.js";import"./Graphics3DObjectStates.9bb5ffee.js";import"./optimizedFeatureQueryEngineAdapter.f814a5c4.js";import"./centroid.89d2dd00.js";import"./PooledRBush.a59c47c2.js";import"./quickselect.3948ea39.js";const d=r=>{let s=class extends p(r){constructor(){super(...arguments),this.graphics=null,this.renderer=null}};return e([t()],s.prototype,"graphics",void 0),e([t()],s.prototype,"renderer",void 0),e([t()],s.prototype,"updating",void 0),e([t()],s.prototype,"view",void 0),s=e([i("esri.views.layers.GraphicsView")],s),s};let o=class extends d(h){constructor(r){super(r),this.processor=null,this.slicePlaneEnabled=!1,this.layer=new u}initialize(){this._set("processor",new l({owner:this}))}destroy(){this._set("processor",a(this.processor))}get graphics(){return this.view.graphics}get loadedGraphics(){return this.graphics}get updating(){var r;return!!((r=this.processor)!=null&&r.updating)}get symbolUpdateType(){return this.processor.graphicsCore.symbolUpdateType}getHit(r){return this.processor.getHit(r)}whenGraphicBounds(r,s){return this.processor.whenGraphicBounds(r,s)}graphicChanged(r){this.processor.graphicsCore.graphicUpdateHandler(r)}get updatePolicy(){return this.processor.graphicsCore.effectiveUpdatePolicy}async queryGraphics(){return this.loadedGraphics}async fetchPopupFeatures(r,s){return c(s)?s.clientGraphics:null}highlight(r){return this.processor.highlight(r)}maskOccludee(r){return this.processor.maskOccludee(r)}};e([t({readOnly:!0})],o.prototype,"graphics",null),e([t()],o.prototype,"loadedGraphics",null),e([t({readOnly:!0})],o.prototype,"updating",null),e([t({constructOnly:!0})],o.prototype,"view",void 0),e([t()],o.prototype,"processor",void 0),e([t({type:Boolean})],o.prototype,"slicePlaneEnabled",void 0),e([t()],o.prototype,"layer",void 0),o=e([i("esri.views.3d.layers.GraphicsView3D")],o);class u extends n{constructor(){super(),this.type="graphics-view-3d-dummy",this.id=this.uid}}const x=o;export{x as default};
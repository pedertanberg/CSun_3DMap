import{e as l,f as n,cD as u,cE as g,k as d,t as y,s as o,r as f,aQ as v,cF as w}from"./index.bd80e406.js";const b=c=>{let r=class extends c{get imageFormatIsOpaque(){return!1}get fullExtent(){return this.layer.fullExtent}get isOpaque(){return this.fullOpacity>=1&&this.imageFormatIsOpaque}get dataLevelRange(){const e=this.tileInfo.lods,i=e[0].scale,t=e[e.length-1].scale;return this.levelRangeFromScaleRange(i,t)}get displayLevelRange(){const e=this.tileInfo.lods,i=this.layer.minScale||e[0].scale,t=this.layer.maxScale||e[e.length-1].scale,a=this.levelRangeFromScaleRange(i,t);return this.layer.maxScale&&a.maxLevel++,a}getTileUrl(e,i,t){return this.layer.getTileUrl(e,i,t)}_addTilingSchemeMatchPromise(){if(y(this.fullExtent))return this.addResolvingPromise(Promise.reject(new o("tilingscheme:extent-not-defined","This layer doesn't define a fullExtent.")));const e=this._getTileInfoSupportError(this.tileInfo,this.fullExtent);if(f(e))return this.addResolvingPromise(Promise.reject(e));const i=v(()=>{var t,a;return(a=(t=this.view)==null?void 0:t.basemapTerrain)==null?void 0:a.tilingSchemeLocked}).then(()=>{const t=this.view.basemapTerrain.tilingScheme,a=this._getTileInfoCompatibilityError(this.tileInfo,t);if(a)throw a});this.addResolvingPromise(i)}_getTileInfoSupportError(e,i){const t=w(e,i,this.view.spatialReference,this.view.state.viewingMode);if(t){const a={layer:this.layer,error:t};let s;switch(t.name){case"tilingscheme:spatial-reference-mismatch":case"tilingscheme:global-unsupported-spatial-reference":case"tilingscheme:local-unsupported-spatial-reference":s=new o("layerview:spatial-reference-incompatible","The spatial reference of this layer does not meet the requirements of the view",a);break;default:s=new o("layerview:tiling-scheme-unsupported","The tiling scheme of this layer is not supported by SceneView",a)}return s}return null}_getTileInfoCompatibilityError(e,i){return i.compatibleWith(e)?null:new o("layerview:tiling-scheme-incompatible","The tiling scheme of this layer is incompatible with the tiling scheme of the surface")}levelRangeFromScaleRange(e,i){const t={minLevel:0,maxLevel:1/0},a=this.view&&this.view.basemapTerrain&&this.view.basemapTerrain.tilingScheme;if(!a)return t;const s=a.levels[0],p=m=>{const h=Math.log(s.scale/m)/Math.LN2;return .5-Math.abs(.5-h%1)<1e-9?Math.round(h):Math.ceil(h)};return e!=null&&e>0&&(t.minLevel=Math.max(0,p(e))),i!=null&&i>0&&(t.maxLevel=Math.max(0,p(i))),t}isUpdating(){return!!(this.view&&this.view.basemapTerrain&&this.view.basemapTerrain.updating)}};return l([n({readOnly:!0})],r.prototype,"imageFormatIsOpaque",null),l([n({readOnly:!0})],r.prototype,"updating",void 0),l([n(u)],r.prototype,"updatingProgress",void 0),l([n(g)],r.prototype,"updatingProgressValue",void 0),l([n()],r.prototype,"fullExtent",null),l([n({readOnly:!0})],r.prototype,"isOpaque",null),l([n({readOnly:!0})],r.prototype,"dataLevelRange",null),l([n({readOnly:!0})],r.prototype,"displayLevelRange",null),l([n()],r.prototype,"layer",void 0),l([n()],r.prototype,"tileInfo",void 0),r=l([d("esri.views.3d.layers.TiledLayerView3D")],r),r};export{b as c};
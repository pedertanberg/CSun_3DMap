import{k4 as m,r as a,j as f,ak as h,aQ as p,t as c,e as o,f as n,k as g}from"./index.bd80e406.js";import{n as u}from"./LayerView3D.a3a76aef.js";import{c as I}from"./TiledLayerView3D.cd8d9f63.js";import{u as y}from"./LayerView.3c9ee51e.js";import{i as x}from"./RefreshableLayerView.befc29a9.js";let r=class extends x(I(u(y))){constructor(){super(...arguments),this.type="wmts-3d"}get hasMixedImageFormats(){return!0}_getCompatibleTileInfoMatrixSet(t,e=!1){const i=m(this.layer);if(a(i)){if(f.isCollection(i))return i.find(d=>{const s=t(d);return a(s)&&(e?h.getLogger(this.declaredClass).error("The selected tile matrix set is not compatible with the view",s):this.addResolvingPromise(Promise.reject(s))),s==null});const l=t(i);return a(l)&&(e?h.getLogger(this.declaredClass).error("The selected tile matrix set is not compatible with the view",l):this.addResolvingPromise(Promise.reject(l))),i}return null}initialize(){this._getCompatibleTileInfoMatrixSet(e=>this._getTileInfoSupportError(e.tileInfo,e.fullExtent));const t=p(()=>{var e,i;return(i=(e=this.view)==null?void 0:e.basemapTerrain)==null?void 0:i.tilingSchemeLocked}).then(()=>{const e=this._getCompatibleTileInfoMatrixSet(i=>this._getTileInfoSupportError(i.tileInfo,i.fullExtent)||this._getTileInfoCompatibilityError(i.tileInfo,this.view.basemapTerrain.tilingScheme));c(e)||(this.layer.activeLayer.tileMatrixSetId!==e.id&&(this.layer.activeLayer.tileMatrixSetId=e.id),this.tileInfo=e.tileInfo,this.layer.fullExtent=e.fullExtent)});this.addResolvingPromise(t),this.when(()=>this._postInitialize())}refresh(){this.emit("data-changed")}canResume(){if(!super.canResume())return!1;const t=this.layer.activeLayer.tileMatrixSet;return t&&!this._getTileInfoError(t.tileInfo,t.fullExtent)}async doRefresh(){this.suspended||this.emit("data-changed")}_postInitialize(){this.updatingHandles.add(()=>{var t,e;return(e=(t=this.layer)==null?void 0:t.activeLayer)==null?void 0:e.styleId},()=>this.refresh()),this.updatingHandles.add(()=>{var t;return(t=this.layer)==null?void 0:t.activeLayer},t=>{const e=this._getCompatibleTileInfoMatrixSet(i=>this._getTileInfoSupportError(i.tileInfo,i.fullExtent)||this._getTileInfoCompatibilityError(i.tileInfo,this.view.basemapTerrain.tilingScheme),!0);a(e)&&t.tileMatrixSetId!==e.id&&(this.layer.activeLayer.tileMatrixSetId=e.id),this.notifyChange("suspended"),this.canResume()&&this.refresh()})}_getTileInfoError(t,e){return this._getTileInfoSupportError(t,e)||this._getTileInfoCompatibilityError(t,this.view.basemapTerrain.tilingScheme)}};o([n({readOnly:!0})],r.prototype,"hasMixedImageFormats",null),o([n()],r.prototype,"layer",void 0),o([n()],r.prototype,"suspended",void 0),r=o([g("esri.views.3d.layers.WMTSLayerView3d")],r);const w=r;export{w as default};
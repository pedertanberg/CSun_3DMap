import{cG as b,m as E,r as l,h as _,G as k,dT as F,ab as c,t as h,gq as C,bY as $,i as A,h8 as f,b2 as G,bZ as R,hm as I,a7 as P,gp as x,e as a,f as p,k as Z,c2 as H,eq as O}from"./index.d2d38865.js";import{p as z}from"./normalizeUtilsSync.4e23169b.js";import{u as L}from"./FeatureStore.5647dd66.js";import{Y as M}from"./QueryEngine.2f3d4eae.js";import{y as q,E as W}from"./elevationInfoUtils.6a873162.js";import{b as T,h as j}from"./DimensionAnalysisView3D.1568182d.js";import{r as B,a as U}from"./queryEngineUtils.084ddf42.js";import{r as v,a as D,n as S}from"./symbologySnappingCandidates.993dd706.js";import"./PooledRBush.5dcc5719.js";import"./quickselect.3948ea39.js";import"./optimizedFeatureQueryEngineAdapter.b4468b97.js";import"./centroid.d50027e7.js";import"./QueryEngineResult.76a93f5c.js";import"./WhereClause.8e0050bd.js";import"./utils.212ec07c.js";import"./generateRendererUtils.6f50fd73.js";import"./json.879c9adc.js";import"./QueryEngineCapabilities.78217f95.js";import"./LineVisualElement.c1761bad.js";import"./LengthDimension.5c37379d.js";import"./Segment.28ee3f20.js";import"./analysisViewUtils.05b8035f.js";import"./ImageMaterial.62e90caa.js";import"./Factory.f12fe02f.js";import"./PointVisualElement.733bb765.js";import"./RightAngleQuadVisualElement.babb64ab.js";import"./colorUtils.bb6424b7.js";import"./EditGeometryOperations.fb76af61.js";import"./dehydratedFeatureComparison.5fc825e3.js";import"./RenderTexture.89786619.js";import"./VertexSnappingCandidate.f9cfe7c2.js";const w="graphics-collections";let n=class extends b(E){constructor(e){super(e),this.availability=1,this._sources={multipoint:null,point:null,polygon:null,polyline:null},this._loadedWkids=new Set,this._loadedWkts=new Set,this._pendingAdds=[],this._extrudedPolygonSymbolsCount=0}get updating(){return this.updatingHandles.updating}get _hasZ(){const e=this.view;return l(e)&&e.type==="3d"&&this.layerSource.layer.type!=="map-notes"}get _snappingElevationAligner(){const{view:e}=this,{layer:t}=this.layerSource,i=l(e)&&e.type==="3d";if(!i||t.type==="map-notes")return v();const s=async(o,r)=>(await H(e.whenLayerView(t),r)).elevationAlignPointsInFeatures(o,r);return v(i,{elevationInfo:t.elevationInfo,alignPointsInFeatures:s,spatialReference:e.spatialReference})}get _snappingElevationFilter(){const{view:e}=this,t=l(e)&&e.type==="3d"&&this.layerSource.layer.type!=="map-notes";return D(t)}get _symbologySnappingFetcher(){const{view:e}=this,{layer:t}=this.layerSource,i=l(e)&&e.type==="3d",s=this._extrudedPolygonSymbolsCount>0;return i&&t.type!=="map-notes"&&s?S(s,async(o,r)=>{const d=await e.whenLayerView(t);return c(r),d.queryForSymbologySnapping({candidates:o,spatialReference:e.spatialReference},r)}):S()}destroy(){for(const e of this._pendingAdds)e.task.abort();this._pendingAdds.length=0,this._mapSources(e=>this._destroySource(e))}initialize(){this.updatingHandles.add(()=>this.getGraphicsLayers(),i=>{this.updatingHandles.removeHandles(w);for(const s of i)this._addMany(s.graphics.toArray()),this.handles.add([s.on("graphic-update",o=>this._onGraphicUpdate(o)),this.updatingHandles.addOnCollectionChange(()=>s.graphics,o=>this._onGraphicsChanged(o))],w)},_);const{view:e}=this,{layer:t}=this.layerSource;l(e)&&e.type==="3d"&&t.type!=="map-notes"&&this.addHandles([e.elevationProvider.on("elevation-change",({context:i})=>{q(i,t.elevationInfo)&&this._snappingElevationAligner.notifyElevationSourceChange()}),k(()=>t.elevationInfo,()=>this._snappingElevationAligner.notifyElevationSourceChange(),_)])}async fetchCandidates(e,t){const{point:i,coordinateHelper:s,elevationInfo:o}=e,r=await F(this._mapSources(g=>this._fetchCandidatesForSource(g,e,t)));c(t);const d=s.hasZ()?W:o,y=this._getGroundElevation,m=r.flat().map(g=>B(g,s,d,y));return T(i,m,s),m}get _getGroundElevation(){return U(this.view)}async _fetchCandidatesForSource(e,t,i){const s=j(t),o=await e.queryEngine.executeQueryForSnapping(s,i);c(i);const r=await this._snappingElevationAligner.alignCandidates(o.candidates,i);c(i);const d=await this._symbologySnappingFetcher.fetch(r,i);c(i);const y=d.length===0?r:[...r,...d];return this._snappingElevationFilter.filter(s,y)}refresh(){}_onGraphicUpdate(e){if(this.getGraphicsLayers().some(t=>t.graphics.includes(e.graphic)))switch(e.property){case"geometry":case"visible":this._remove(e.graphic),this._addMany([e.graphic])}}_onGraphicsChanged(e){for(const t of e.removed)this._remove(t);this._addMany(e.added)}_addMany(e){const t=[],i=new Map;for(const s of e)h(s.geometry)||(this._needsInitializeProjection(s.geometry.spatialReference)?(t.push(s.geometry.spatialReference),i.set(s.uid,s)):this._add(s));this._createPendingAdd(t,i)}_createPendingAdd(e,t){if(!e.length)return;const i=C(async r=>{await $(e.map(d=>({source:d,dest:this.spatialReference})),{signal:r}),this._markLoadedSpatialReferences(e);for(const[,d]of t)this._add(d)});this.updatingHandles.addPromise(i.promise);const s={task:i,graphics:t},o=()=>O(this._pendingAdds,s);i.promise.then(o,o),this._pendingAdds.push(s)}_markLoadedSpatialReferences(e){for(const t of e)t.wkid!=null&&this._loadedWkids.add(t.wkid),t.wkt!=null&&this._loadedWkts.add(t.wkt)}_add(e){if(h(e.geometry)||!e.visible)return;let t=e.geometry;if(t.type==="mesh")return;t.type==="extent"&&(t=A.fromExtent(t));const i=this._ensureSource(t.type);if(h(i))return;const s=this._createOptimizedFeature(e.uid,t);h(s)||(i.featureStore.add(s),f(e.symbol)&&this._extrudedPolygonSymbolsCount++)}_needsInitializeProjection(e){return(e.wkid==null||!this._loadedWkids.has(e.wkid))&&(e.wkt==null||!this._loadedWkts.has(e.wkt))&&!G(e,this.spatialReference)}_createOptimizedFeature(e,t){const i=R(z(t),this.spatialReference);if(!i)return null;const s=this._ensureGeometryHasZ(i),o=I(s,this._hasZ,!1);return new P(o,{[u]:e},null,e)}_ensureGeometryHasZ(e){var s;if(!this._hasZ)return e;const t=o=>{for(;o.length<3;)o.push(0)},i=e.clone();switch(i.hasZ=!0,i.type){case"point":i.z=(s=i.z)!=null?s:0;break;case"multipoint":i.points.forEach(t);break;case"polyline":i.paths.forEach(o=>o.forEach(t));break;case"polygon":i.rings.forEach(o=>o.forEach(t))}return i}_ensureSource(e){const t=this._sources[e];if(l(t))return t;const i=this._createSource(e);return this._sources[e]=i,i}_createSource(e){const t=x.toJSON(e),i=this._hasZ,s=new L({geometryType:t,hasZ:i,hasM:!1});return{featureStore:s,queryEngine:new M({featureStore:s,fields:[{name:u,type:"esriFieldTypeOID",alias:u}],geometryType:t,hasM:!1,hasZ:i,objectIdField:u,spatialReference:this.spatialReference,scheduler:l(this.view)&&this.view.type==="3d"?this.view.resourceController.scheduler:null}),type:e}}_remove(e){this._mapSources(t=>this._removeFromSource(t,e));for(const t of this._pendingAdds)t.graphics.delete(e.uid),t.graphics.size===0&&t.task.abort()}_removeFromSource(e,t){const i=t.uid;e.featureStore.has(i)&&(e.featureStore.removeById(t.uid),f(t.symbol)&&this._extrudedPolygonSymbolsCount--)}_destroySource(e){e.queryEngine.destroy(),this._sources[e.type]=null}_mapSources(e){const{point:t,polygon:i,polyline:s,multipoint:o}=this._sources,r=[];return l(t)&&r.push(e(t)),l(i)&&r.push(e(i)),l(s)&&r.push(e(s)),l(o)&&r.push(e(o)),r}};a([p()],n.prototype,"getGraphicsLayers",void 0),a([p({constructOnly:!0})],n.prototype,"layerSource",void 0),a([p({constructOnly:!0})],n.prototype,"spatialReference",void 0),a([p({constructOnly:!0})],n.prototype,"view",void 0),a([p({readOnly:!0})],n.prototype,"updating",null),a([p({readOnly:!0})],n.prototype,"availability",void 0),a([p()],n.prototype,"_hasZ",null),a([p()],n.prototype,"_snappingElevationAligner",null),a([p()],n.prototype,"_snappingElevationFilter",null),a([p()],n.prototype,"_symbologySnappingFetcher",null),a([p()],n.prototype,"_extrudedPolygonSymbolsCount",void 0),a([p()],n.prototype,"_getGroundElevation",null),n=a([Z("esri.views.interactive.snapping.featureSources.GraphicsSnappingSource")],n);const u="OBJECTID";export{n as GraphicsSnappingSource};
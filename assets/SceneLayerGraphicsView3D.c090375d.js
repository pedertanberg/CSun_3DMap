import{eo as z,jr as K,h as R,G as W,br as Z,cR as G,D as Y,js as J,jt as X,aH as ee,z as b,eN as te,K as re,t as M,r as h,ju as se,ak as N,be as V,jv as ie,aS as oe,jw as ae,aT as ne,g as L,en as $,b7 as de,ge as le,eM as he,jx as ue,M as P,e as d,f as l,dP as ce,cD as pe,k as ge,f1 as _e,aq as me}from"./index.f2e9cdcf.js";import{s as ye,I as fe,t as be}from"./I3SOverrides.287cfad1.js";import{n as ve}from"./LayerView3D.f2d8f7fb.js";import{F as xe,p as Ee}from"./FeatureLikeLayerView3D.8d03354f.js";import{c as Ie,i as we,u as Se,b as De,E as Ce}from"./SceneLayerView.154e8813.js";import{t as Ae}from"./DefinitionExpressionSceneLayerView.ac6b97d5.js";import{c as Oe}from"./PopupSceneLayerView.00666114.js";import"./I3SNode.6ed789fb.js";import"./RenderTexture.b346685b.js";import"./FeatureLayerView3D.d1d96945.js";import"./FeatureLayerViewBase3D.69bc1127.js";import"./EventedSet.721b5841.js";import"./floorFilterUtils.05eb8c6a.js";import"./LayerView.ac2ac8f9.js";import"./RefreshableLayerView.2fd26a3e.js";import"./dehydratedFeatureComparison.e2438592.js";import"./queryForSymbologySnapping.91d874a2.js";import"./elevationInfoUtils.6c1a0147.js";import"./hash.e6424875.js";import"./Graphics3DObjectStates.4cc50011.js";import"./optimizedFeatureQueryEngineAdapter.dd97429a.js";import"./centroid.6c3feae8.js";import"./PooledRBush.1b0cf616.js";import"./quickselect.3948ea39.js";import"./QueryEngine.57019395.js";import"./QueryEngineResult.ddb48b00.js";import"./WhereClause.7bb0c466.js";import"./utils.2fc37d0a.js";import"./generateRendererUtils.50aae7ff.js";import"./json.879c9adc.js";import"./QueryEngineCapabilities.78217f95.js";import"./FeatureStore.8c331557.js";import"./projectExtentUtils.5ff0d6ae.js";class H extends z{constructor(t){super("SceneLayerWorker","dracoDecompressPointCloudData",{dracoDecompressPointCloudData:s=>[s.geometryBuffer]},t,{hasInitialize:!0})}}const q=De();let n=class extends Ae(Oe(ve(Ce))){constructor(){super(...arguments),this.type="scene-layer-graphics-3d",this._nodesAddedToStage=new Map,this._queryEngine=null,this._memCache=null,this._interactiveEditingSessions=new Map,this.loadedGraphics=new ye,this.holeFilling="always",this.progressiveLoadFactor=1,this.supportsHeightUnitConversion=!0,this._coordinatesOutsideExtentErrors=0,this._maxCoordinatesOutsideExtentErrors=20}initialize(){var t,s;const e=this.layer;this.addResolvingPromise(e.indexInfo),this._i3sOverrides=new fe({view:this.view,layer:this.layer,memoryController:(t=this.view.resourceController)==null?void 0:t.memoryController}),K(e,this.view.spatialReference,this.view.viewingMode),this._fieldsHelper=new Ie({layerView:this}),this.updatingHandles.add(()=>e.rangeInfos,r=>this._rangeInfosChanged(r),R),this.updatingHandles.add(()=>e.renderer,(r,i)=>this._rendererChange(r,i)),this.updatingHandles.add(()=>[this.parsedDefinitionExpression,this._excludeObjectIdsSorted],()=>this._filterChange()),this.handles.add(W(()=>G.I3S_TREE_SHOW_TILES,r=>{if(r&&!this._treeDebugger){const i=this._controller.crsIndex;Z(()=>import("./I3STreeDebugger.a1757ca5.js"),["assets/I3STreeDebugger.a1757ca5.js","assets/index.f2e9cdcf.js","assets/index.785c8c13.css","assets/TileTreeDebugger.4ad16e6f.js"]).then(({I3STreeDebugger:o})=>{!this._treeDebugger&&G.I3S_TREE_SHOW_TILES&&(this._treeDebugger=new o({lv:this,view:this.view,nodeSR:i}))})}else r||!this._treeDebugger||G.I3S_TREE_SHOW_TILES||(this._treeDebugger.destroy(),this._treeDebugger=null)},R)),this._set("processor",new xe({owner:this,preferredUpdatePolicy:Y.ASYNC,scaleVisibilityEnabled:!0,filterVisibilityEnabled:!0,timeExtentEnabled:!1,frustumVisibilityEnabled:!1,elevationAlignmentEnabled:!0,elevationFeatureExpressionEnabled:!1,setUidToIdOnAdd:!1,dataExtent:e.fullExtent,updateClippingExtent:r=>this._updateClippingExtent(r)})),(s=this.processor.elevationAlignment)==null||s.events.on("invalidate-elevation",r=>this._controller.updateElevationChanged(r.extent,r.spatialReference)),this.supportsHeightUnitConversion&&(this._verticalScale=J("point",e.spatialReference,this.view.spatialReference)),this.addResolvingPromise(this.processor.initializePromise),this._memCache=this.view.resourceController.memoryController.newCache(e.uid),this._controller=new be({layerView:this,scaleVisibilityEnabled:!1}),X(this.layer.geometryDefinitions)&&(this._worker=new H(r=>this.view.resourceController.schedule(r))),this.handles.add(this.layer.on("apply-edits",r=>this.updatingHandles.addPromise(r.result))),this.handles.add(this.layer.on("edits",r=>this._handleEdits(r))),this.when(()=>{const r=()=>this.processor.featureStore;this._queryEngine=new Ee({context:{spatialReference:this.view.spatialReference,layer:this.layer,scheduler:this.view.resourceController.scheduler,get featureStore(){return r()},hasZ:this.hasZ,hasM:this.hasM},priority:ee.FEATURE_QUERY_ENGINE}),this.updatingHandles.add(()=>this.maximumNumberOfFeatures,i=>this._controller.featureTarget=i,R),this.updatingHandles.add(()=>this.suspended,i=>{i&&this._removeAllNodeData()})})}destroy(){this._treeDebugger=b(this._treeDebugger),this._i3sOverrides=b(this._i3sOverrides),this._set("processor",b(this.processor)),this._controller=b(this._controller),this._queryEngine=b(this._queryEngine),this._worker=b(this._worker),this._memCache=b(this._memCache),this._nodesAddedToStage.clear(),this._fieldsHelper=b(this._fieldsHelper)}get i3slayer(){return this.layer}get updatingProgressValue(){var e,t;return(t=(e=this._controller)==null?void 0:e.updatingProgress)!=null?t:1}get requiredFields(){var e,t;return(t=(e=this._fieldsHelper)==null?void 0:e.requiredFields)!=null?t:[]}get maximumNumberOfFeatures(){var t,s,r;const e=(s=(t=this.processor)==null?void 0:t.graphicsCore)==null?void 0:s.displayFeatureLimit;return(r=e==null?void 0:e.maximumNumberOfFeatures)!=null?r:0}set maximumNumberOfFeatures(e){e!=null?(this._override("maximumNumberOfFeatures",e),this._controller.fixedFeatureTarget=!0):(this._clearOverride("maximumNumberOfFeatures"),this._controller.fixedFeatureTarget=!1)}get maximumNumberOfFeaturesExceeded(){var e;return!this.suspended&&!!((e=this._controller)!=null&&e.useMaximumNumberOfFeatures)&&!this._controller.leavesReached}get _excludeObjectIdsSorted(){const e=this.layer.excludeObjectIds;return e.length?e.toArray().sort((t,s)=>t-s):null}get lodFactor(){return this.layer.semantic==="Labels"?1:this.view.qualitySettings.sceneService.point.lodFactor}get hasM(){return!1}get hasZ(){return!0}async whenGraphicAttributes(e,t){return te(this.layer,e,this._getObjectIdField(),t,()=>[...this._nodesAddedToStage.values()])}getHit(e){if(!this.loadedGraphics)return null;const t=re(this.loadedGraphics.find(r=>r.uid===e),this.layer),s=this._getObjectIdField();return t&&t.attributes&&t.attributes[s]?(t.layer=this.layer,t.sourceLayer=this.layer,{type:"graphic",graphic:t,layer:t.layer}):null}whenGraphicBounds(e,t){return this.processor.whenGraphicBounds(e,t)}computeAttachmentOrigin(e,t){return this.processor.computeAttachmentOrigin(e,t)}canResume(){return super.canResume()&&(!this._controller||this._controller.rootNodeVisible)}isUpdating(){var e,t,s;return!!(((e=this._controller)==null?void 0:e.updating)||((t=this.processor)==null?void 0:t.updating)||((s=this._fieldsHelper)==null?void 0:s.updating)||this.layerFilterUpdating)}highlight(e){return this.processor.highlight(e,this.layer.objectIdField)}get updatePolicy(){return this.processor.graphicsCore.effectiveUpdatePolicy}createInteractiveEditSession(e){return we(this._attributeEditingContext,e)}async _extractBinaryPointData(e,t){const s={geometryBuffer:e.geometryBuffer};return M(this._worker)&&(this._worker=new H(r=>this.view.resourceController.schedule(r))),this._worker.invoke(s,t).then(r=>{if(h(r))return{positionData:r.positions,featureIds:r.featureIds};throw new Error("Failed to decompress Draco point data")})}_checkExtent(e,t){e&&!se(e,t)&&(this._coordinatesOutsideExtentErrors<this._maxCoordinatesOutsideExtentErrors&&N.getLogger(this.declaredClass).error("Service Error: Coordinates outside of layer extent"),this._coordinatesOutsideExtentErrors+1===this._maxCoordinatesOutsideExtentErrors&&N.getLogger(this.declaredClass).error("Maximum number of errors reached. Further errors are ignored."),this._coordinatesOutsideExtentErrors++)}async addNode(e,t,s){if(!Q(t)&&!U(t))throw new Error;if(this._nodesAddedToStage.has(e.index))return void N.getLogger(this.declaredClass).error("I3S node "+e.id+" already added");const r=h(this.layer.fullExtent)?Fe(this.layer.fullExtent.clone(),.5):null,i=this._controller.crsVertex,o=[],a={graphics:null,featureIds:null,attributeInfo:t.attributeDataInfo,node:e};if(Q(t)?await this._addNodeBinaryPointData(e,a,t,r,o,s):U(t)&&this._addNodeLegacyPointData(e,a,t,r,o),await this._i3sOverrides.apply(a.featureIds,t.attributeDataInfo,s),e.numFeatures=a.graphics.length,this._updateNodeMemory(e),k(a),o.length>0&&(this._computeObb(e,o,i),this._controller.updateVisibility(e.index)),!this._controller.isGeometryVisible(e))return void this._cacheNodeData(a);if(h(this._verticalScale))for(const u of a.graphics)this._verticalScale(u.geometry);const c=this.view._stage.renderView._objectAndLayerIdRenderHelper;if(c)for(let u=0;u<a.featureIds.length;u++){const x=a.featureIds[u];c.setUidToObjectAndLayerId(x,a.graphics[u].uid,this.layer.id,this.layer.uid,this.layer.popupEnabled,a.node.resources.attributes,u)}this._nodesAddedToStage.set(e.index,a),this.loadedGraphics.addMany(a.graphics),this._controller.updateLoadStatus(e.index,!0),this._filterNode(a),this._treeDebugger&&this._treeDebugger.update()}_computeObb(e,t,s){const r=this._controller.crsIndex,i=r.isGeographic?this.view.renderSpatialReference:r;V(t,s,0,t,i,0,t.length/3);const o={data:t,size:3};e.serviceObb=ie(o),r.isGeographic&&oe(e.serviceObb.center,i,e.serviceObb.center,r)}isNodeLoaded(e){return this._nodesAddedToStage.has(e)}isNodeReloading(){return!1}updateNodeState(){}async _addNodeBinaryPointData(e,t,s,r,i,o){const a=await this._extractBinaryPointData(s,o);if(a==null)throw new Error;const c=this._getObjectIdField(),u=this._controller.crsVertex,x=this.view.spatialReference,C=this.processor.graphicsCore,{positionData:m,featureIds:S}=a,E=3,A=m.length/E,g=new Array,O=h(e.serviceObb)?e.serviceObb.center:[0,0,0],T=Math.abs(O[2])*2**-20;for(let y=0;y<A;y++){const I=y*E,p=ae(m[I+0],m[I+1],m[I+2]);ne(p,p,O),Math.abs(p[2])<T&&(p[2]=0),e.serviceObb||i.push(p[0],p[1],p[2]),h(r)&&this._checkExtent(r,p);const w=S[y],F={};w!=null&&(F[c]=w);const f=w!=null?w:L.generateUID();V(p,u,0,v,x,0,1);const j=$(v[0],v[1],v[2],x),D=this.loadedGraphics.get(f);if(h(D))D.level<e.level&&(_.property="geometry",_.graphic=D,_.oldValue=de(D.geometry),_.newValue=j,D.geometry=j,C.graphicUpdateHandler(_)),g.push(D);else{const B=L.generateUID();g.push({objectId:f,uid:B,geometry:j,attributes:F,visible:!0,level:e.level})}}t.graphics=g,t.featureIds=Array.from(S)}_addNodeLegacyPointData(e,t,s,r,i){const o=this._getObjectIdField(),a=this._controller.crsVertex,c=this.view.spatialReference,u=[0,0,0],x=new Array,C=new Array;for(const m of s.pointData){const S=m.featureDataPosition,E=S.length,A=m.geometries&&m.geometries[0]||Ne[E],g=m.featureIds[0];if(A.params.type!=="points")continue;h(r)&&this._checkExtent(r,S);const O={};g!=null&&(O[o]=g);const T=g!=null?g:L.generateUID();let y;A.type==="Embedded"&&(y=A.params.vertexAttributes.position);for(let I=0;I<y.length;I+=E){for(let f=0;f<E;f++)u[f]=S[f]+y[I+f];const p=E===3;e.serviceObb||i.push(u[0],u[1],p?u[2]:0),V(u,a,0,v,c,0,1);const w=$(v[0],v[1],p?v[2]:void 0,c),F=this.loadedGraphics.get(T);h(F)?C.push(F):C.push({objectId:T,uid:L.generateUID(),geometry:w,attributes:O,visible:!0})}x.push(g)}t.graphics=C,t.featureIds=x}_updateNodeMemory(e){e.memory=4096+(h(e.numFeatures)?e.numFeatures*this.processor.graphicsCore.usedMemoryPerGraphic:0)}_cacheNodeData(e){const t=e.graphics.reduce((s,r)=>le(r)+s,512+8*e.featureIds.length+1024);this._memCache.put(this._getMemCacheKey(e.node),e,t)}_getMemCacheKey(e){return`${e.index}`}_removeAllNodeData(){this._nodesAddedToStage.forEach((e,t)=>{if(e){const s=e.node;this._updateNodeMemory(s),this._cacheNodeData(e)}this._controller.updateLoadStatus(t,!1)}),this._nodesAddedToStage.clear(),this._treeDebugger&&this._treeDebugger.update(),this.loadedGraphics.clear()}removeNode(e){const t=this._removeNodeStageData(e);t&&(this._updateNodeMemory(t.node),this._cacheNodeData(t))}_removeNodeStageData(e){const t=this._nodesAddedToStage.get(e);return t?(this._controller.updateLoadStatus(e,!1),this.loadedGraphics.removeMany(t.graphics),this._nodesAddedToStage.delete(e),this._treeDebugger&&this._treeDebugger.update(),t):null}async loadCachedNodeData(e){return this._memCache.pop(this._getMemCacheKey(e))}async addCachedNodeData(e,t,s,r){this._nodesAddedToStage.has(e.index)?N.getLogger(this.declaredClass).error("I3S node "+e.id+" already added"):(this.loadedGraphics.addMany(t.graphics),this._nodesAddedToStage.set(e.index,t),this._controller.updateLoadStatus(e.index,!0),this._updateNodeMemory(e),await this.updateAttributes(e.index,s,r),this._filterNode(t),this._treeDebugger&&this._treeDebugger.update())}getLoadedNodeIds(){const e=[];return this._nodesAddedToStage.forEach(t=>e.push(t.node.id)),e.sort()}getVisibleNodes(){const e=new Array;return this._nodesAddedToStage.forEach(t=>e.push(t.node)),e}getLoadedNodeIndices(e){this._nodesAddedToStage.forEach((t,s)=>e.push(s))}getLoadedAttributes(e){const t=this._nodesAddedToStage.get(e);if(t&&h(t.attributeInfo))return t.attributeInfo.loadedAttributes}getAttributeData(e){const t=this._nodesAddedToStage.get(e);if(t&&h(t.attributeInfo))return t.attributeInfo.attributeData}_setAttributeData(e,t){const s=this._nodesAddedToStage.get(e);s&&!M(s.attributeInfo)&&(s.attributeInfo.attributeData=t,this._attributeValuesChanged(s))}async updateAttributes(e,t,s){const r=this._nodesAddedToStage.get(e);r&&(await this._i3sOverrides.apply(r.featureIds,t,s),r.attributeInfo=t,this._attributeValuesChanged(r))}_attributeValuesChanged(e){if(k(e),this._filterNode(e),this.processor.graphicsCore.labelsEnabled){const t=e.graphics.map(s=>s.uid);this.processor.graphicsCore.updateLabelingInfo(t)}}_updateClippingExtent(e){return this._controller&&this._controller.updateClippingArea(e),!1}_getObjectIdField(){return this.layer.objectIdField||he}async _rendererChange(e,t){const{layer:{fieldsIndex:s}}=this,r=new Set;let i,o;e?(await e.collectRequiredFields(r,s),i=Array.from(r).sort()):i=[],r.clear(),t?(await t.collectRequiredFields(r,s),o=Array.from(r).sort()):o=[],i.length===o.length&&i.every((a,c)=>i[c]===o[c])||this._reloadAllNodes()}_rangeInfosChanged(e){e!=null&&e.length>0&&N.getLogger(this.declaredClass).warn("Unsupported property: rangeInfos are currently only serialized to and from web scenes but do not affect rendering.")}_filterChange(){this._nodesAddedToStage.forEach(e=>this._filterNode(e))}_reloadAllNodes(){this._removeAllNodeData(),this._controller&&this._controller.restartNodeLoading()}_filterNode(e){const t=this.parsedDefinitionExpression,s=this._excludeObjectIdsSorted,r=this._getObjectIdField();for(const i of e.graphics){const o=i.visible,a=!t||this._evaluateClause(t,i),c=M(s)||ue(s,i.attributes[r])<0;i.visible=a&&c,o!==i.visible&&(_.graphic=i,_.property="visible",_.oldValue=o,_.newValue=i.visible,this.processor.graphicsCore.graphicUpdateHandler(_))}}createQuery(){const e={outFields:["*"],returnGeometry:!0,outSpatialReference:this.view.spatialReference};return h(this.filter)?this.filter.createQuery(e):new P(e)}queryFeatures(e,t){return this._queryEngine.executeQuery(this._ensureQuery(e),t==null?void 0:t.signal)}queryObjectIds(e,t){return this._queryEngine.executeQueryForIds(this._ensureQuery(e),t==null?void 0:t.signal)}queryFeatureCount(e,t){return this._queryEngine.executeQueryForCount(this._ensureQuery(e),t==null?void 0:t.signal)}queryExtent(e,t){return this._queryEngine.executeQueryForExtent(this._ensureQuery(e),t==null?void 0:t.signal)}_ensureQuery(e){return this._addDefinitionExpressionToQuery(M(e)?this.createQuery():P.from(e))}getUsedMemory(){var e,t,s;return(s=(t=(e=this.processor)==null?void 0:e.graphicsCore)==null?void 0:t.usedMemory)!=null?s:0}getUnloadedMemory(){var e,t,s,r,i;return .8*(((t=(e=this._controller)==null?void 0:e.unloadedMemoryEstimate)!=null?t:0)+((i=(r=(s=this.processor)==null?void 0:s.graphicsCore)==null?void 0:r.unprocessedMemoryEstimate)!=null?i:0))}ignoresMemoryFactor(){return this._controller&&this._controller.fixedFeatureTarget}_handleEdits(e){Se(this._attributeEditingContext,e)}get _attributeEditingContext(){const e=this._getObjectIdField();return{sessions:this._interactiveEditingSessions,fieldsIndex:this.layer.fieldsIndex,objectIdField:e,forEachNode:t=>this._nodesAddedToStage.forEach(s=>t(s.node,s.featureIds)),attributeStorageInfo:this.i3slayer.attributeStorageInfo,i3sOverrides:this._i3sOverrides,getAttributeData:t=>this.getAttributeData(t),setAttributeData:(t,s,r)=>{this._setAttributeData(t,s);const i=this._nodesAddedToStage.get(t);if(h(r)){const o=this.loadedGraphics.get(r.attributes[e]);h(o)&&this.processor.graphicsCore.recreateGraphics([o])}else h(i)&&this.processor.graphicsCore.recreateGraphics(i.graphics)},clearMemCache:()=>{}}}get performanceInfo(){const e={displayedNumberOfFeatures:this.loadedGraphics.length,maximumNumberOfFeatures:this.maximumNumberOfFeatures,totalNumberOfFeatures:-1,nodes:this._nodesAddedToStage.size,core:this.processor.graphicsCore.performanceInfo};return this._controller&&this._controller.updateStats(e),e}get test(){return{controller:this._controller,numNodes:this._nodesAddedToStage.size,loadedGraphics:this.loadedGraphics}}};d([l()],n.prototype,"processor",void 0),d([l({type:ce})],n.prototype,"filter",void 0),d([l()],n.prototype,"loadedGraphics",void 0),d([l()],n.prototype,"i3slayer",null),d([l()],n.prototype,"_controller",void 0),d([l()],n.prototype,"updating",void 0),d([l()],n.prototype,"suspended",void 0),d([l()],n.prototype,"holeFilling",void 0),d([l(pe)],n.prototype,"updatingProgress",void 0),d([l()],n.prototype,"updatingProgressValue",null),d([l(q.requiredFields)],n.prototype,"requiredFields",null),d([l(q.availableFields)],n.prototype,"availableFields",void 0),d([l()],n.prototype,"_fieldsHelper",void 0),d([l({type:Number})],n.prototype,"maximumNumberOfFeatures",null),d([l({readOnly:!0})],n.prototype,"maximumNumberOfFeaturesExceeded",null),d([l()],n.prototype,"_excludeObjectIdsSorted",null),d([l({readOnly:!0})],n.prototype,"lodFactor",null),d([l({readOnly:!0})],n.prototype,"hasM",null),d([l({readOnly:!0})],n.prototype,"hasZ",null),n=d([ge("esri.views.3d.layers.SceneLayerGraphicsView3D")],n);const ut=n;function U(e){return"pointData"in e}function Q(e){return"geometryBuffer"in e&&e.geometryBuffer!==null}function k(e){const t=e.attributeInfo;for(let s=0;s<e.graphics.length;s++){const r=e.graphics[s];if(r.attributes||(r.attributes={}),h(t)&&h(t.loadedAttributes))for(const{name:i}of t.loadedAttributes)t.attributeData[i]&&(r.attributes[i]=_e(t.attributeData[i],s))}}function Fe(e,t){return e.xmin-=t,e.ymin-=t,e.xmax+=t,e.ymax+=t,e.hasZ&&(e.zmin-=t,e.zmax+=t),e.hasM&&(e.mmin-=t,e.mmax+=t),e}const Ne={2:{type:"Embedded",params:{type:"points",vertexAttributes:{position:[0,0]}}},3:{type:"Embedded",params:{type:"points",vertexAttributes:{position:[0,0,0]}}}},v=me(),_={graphic:null,property:null,oldValue:null,newValue:null};export{ut as default};
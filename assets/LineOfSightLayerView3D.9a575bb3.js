import{G as w,N as d,r as a,s as o,gq as V,z as _,dR as c,t as p,ci as A,br as u,e as t,f as l,k as f}from"./index.f489a479.js";import{n as v}from"./LayerView3D.af0dc625.js";import{u as m}from"./LayerView.0083e383.js";const h="analysis-view-handles";let i=class extends v(m){constructor(s){super(s),this.type="line-of-sight-3d",this._analysisModule=null}initialize(){this.handles.add(w(()=>this.layer.analysis,s=>{this._destroyAnalysisView(),a(s)&&this._createAnalysisView(s)},d),h)}destroy(){this.handles.remove(h),this._destroyAnalysisView()}async whenAnalysisView(){if(a(this.analysisView))return this.analysisView;if(a(this._createAnalysisViewTask))return this._createAnalysisViewTask.promise;throw new o("layerview:no-analysisview-for-analysis","The analysis has not been set on the LineOfSightLayer of this layer view")}isUpdating(){return a(this._createAnalysisViewTask)||a(this.analysisView)&&this.analysisView.updating}_createAnalysisView(s){const n=V(async e=>(this.analysisView=await this._createAnalysisViewPromise(s,e),this._createAnalysisViewTask===n&&(this._createAnalysisViewTask=null),this.analysisView));this._createAnalysisViewTask=n}_destroyAnalysisView(){this.analysisView=_(this.analysisView),this._createAnalysisViewTask=c(this._createAnalysisViewTask)}async _createAnalysisViewPromise(s,n){let e=this._analysisModule;if(p(e)){const y=await this._loadAnalysisModule();this._analysisModule=y,e=y}const r=new e.default({analysis:s,view:this.view,parent:this});if(await r.when(),A(n))throw r.destroy(),new o("layerview:no-analysisview-for-analysis","The analysis has not been added to the LineOfSightLayer of this layer view",{analysis:s});return r}_loadAnalysisModule(){return u(()=>import("./LineOfSightAnalysisView3D.7889bec7.js"),["assets/LineOfSightAnalysisView3D.7889bec7.js","assets/index.f489a479.js","assets/index.785c8c13.css","assets/LineVisualElement.e1071f16.js","assets/LineOfSightAnalysisTarget.b87df04b.js","assets/elevationInfoUtils.a305fe10.js","assets/analysisViewUtils.02c74237.js","assets/ImageMaterial.fd21e937.js","assets/PointVisualElement.3e2bc313.js"])}};t([l()],i.prototype,"type",void 0),t([l()],i.prototype,"layer",void 0),t([l()],i.prototype,"analysisView",void 0),t([l()],i.prototype,"_createAnalysisViewTask",void 0),i=t([f("esri.views.3d.layers.LineOfSightLayerView3D")],i);const L=i;export{L as default};
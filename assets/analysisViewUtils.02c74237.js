import{lN as Be,lO as Ge,iU as qe,aV as Z,m9 as He,eu as ee,aq as M,lD as N,a3 as Qe,lo as ze,kL as Xe,ma as Je,kM as Ye,lB as ue,r as F,mb as Ze,aT as K,mc as Ke,gt as et,md as se,t as y,eX as pe,em as _e,l8 as ge,me as ve,et as I,mf as tt,lP as fe,lr as R,aU as le,mg as me,an as be,kO as it,fR as st,mh as at,gS as nt,aJ as rt,D as ot,b2 as lt,a5 as ct,mi as ht,aj as Q,kl as ae,lF as O,b7 as ne,kN as dt,aR as ce,fg as Ce,mj as ut,eV as ye,bn as pt,mk as _t,ml as gt,kk as we,lI as vt,mm as ft,mn as mt,d9 as Se,d5 as T,d0 as bt,bt as S,d2 as yt,d6 as wt,db as St,d1 as Et,kq as Ee,cN as u,mo as $t,d7 as Tt,mp as At,mq as Ot,dc as G,fr as Lt,dd as Rt,br as Mt,e as l,dg as L,dh as q,di as jt,dj as Ft,dl as Pt,gx as Dt,dm as zt,dn as Ct,bw as re,dq as xt,dr as It,ds as Nt,mr as kt,dx as Wt,dy as Vt,dA as $e,bu as V,gT as Ut,dE as Bt,e_ as H,k8 as he,gP as Gt,ms as qt,mt as Ht,mu as Qt,gU as Xt,aP as Jt,mv as Yt,jw as Zt,mw as Kt,k9 as xe,mx as ei,kt as de,lE as Te,kQ as ti,my as ii,lW as si,mz as ai,cM as ni,y as ri,j as oi,f as m,k as Ie,m as li,mA as P,cg as ci,ak as hi,G as Ne,N as ke,ch as di,gq as ui,aQ as pi,aI as _i}from"./index.f489a479.js";import{p as gi}from"./ImageMaterial.fd21e937.js";class We{constructor(e){this._camera=new He,this._elevation={offset:0,override:null},this.collisionType={type:"point"},this.collisionPriority=0,this._renderObjects=[],this.autoScaleRenderObjects=!0,this._available=!0,this._noDisplayCount=0,this._radius=10,this._worldSized=!1,this.focusMultiplier=2,this.touchMultiplier=2.5,this.worldOriented=!1,this._modelTransform=ee(),this._worldFrame=null,this._renderLocation=M(),this._renderLocationDirty=!0,this._location=new Z({x:0,y:0,z:0}),this._elevationAlignedLocation=new Z,this._elevationAlignedLocationDirty=!0,this.interactive=!0,this.selectable=!1,this.grabbable=!0,this.cursor=null,this.grabCursor=null,this._grabbing=!1,this.dragging=!1,this._hovering=!1,this._selected=!1,this._state=N.None,this._focused=!1,this.events=new Qe.EventEmitter,this._screenLocation={screenPointArray:ze(),renderScreenPointArray:Xe(),pixelSize:0},this._screenLocationDirty=!0,this._applyObjectTransform=null,this._engineResourcesAddedToStage=!1,this._engineResources=null,this._attached=!1,this._engineLayer=null,this._materialIdReferences=null,this._location.spatialReference=e.view.spatialReference;for(const t in e)this[t]=e[t];this.view.state&&this.view.state.camera&&this._camera.copyFrom(this.view.state.camera)}destroy(){this._removeResourcesFromStage(),this._engineResources=null,this.view=null,this._camera=null}get elevationInfo(){return this._elevationInfo}set elevationInfo(e){this._elevationInfo=e,this._elevationAlignedLocationDirty=!0,this._renderLocationDirty=!0,this._updateEngineObject()}get renderObjects(){return this._renderObjects}set renderObjects(e){this._removeResourcesFromStage(),this._engineResources=null,this._renderObjects=e.slice(),this._updateEngineObject()}set available(e){e!==this._available&&(this._available=e,this._updateEngineObject())}get available(){return this._available}disableDisplay(){return this._noDisplayCount++,this._noDisplayCount===1&&this._updateEngineObject(),{remove:Je(()=>{this._noDisplayCount--,this._noDisplayCount===0&&this._updateEngineObject()})}}set radius(e){e!==this._radius&&(this._radius=e,this._updateEngineObject())}get radius(){return this._radius}set worldSized(e){e!==this._worldSized&&(this._worldSized=e,this._updateEngineObject())}get worldSized(){return this._worldSized}get modelTransform(){return this._modelTransform}set modelTransform(e){Ae(e)&&(this._screenLocationDirty=!0),Ye(this._modelTransform,e),this._updateEngineObject()}get renderLocation(){return this._renderLocationDirty&&(this._renderLocationDirty=!1,this.view.renderCoordsHelper.toRenderCoords(this.elevationAlignedLocation,this._renderLocation),this.worldOriented?(this._worldFrame||(this._worldFrame=ee()),vi(this.view,this._renderLocation,this._worldFrame)):this._worldFrame&&(this._worldFrame=null)),this._renderLocation}set renderLocation(e){this.view.renderCoordsHelper.fromRenderCoords(e,this._location),this.elevationAlignedLocation=this._location}get location(){return this._location}set location(e){ue(e,this._location),this._renderLocationDirty=!0,this._screenLocationDirty=!0,this._elevationAlignedLocationDirty=!0,this._updateEngineObject(),this.events.emit("location-update",{location:this._location})}get elevationAlignedLocation(){return this._elevationAlignedLocationDirty?(this._evaluateElevationAlignment(),this._updateElevationAlignedLocation(),this._elevationAlignedLocation):this._elevationAlignedLocation}set elevationAlignedLocation(e){ue(e,this._location),this._evaluateElevationAlignment(),this._location.z-=this._elevation.offset,this._updateElevationAlignedLocation(),this._updateEngineObject(),this.events.emit("location-update",{location:this._location})}_updateElevationAlignedLocation(){this._elevationAlignedLocation.x=this.location.x,this._elevationAlignedLocation.y=this.location.y;const e=F(this._elevation.override)?this._elevation.override:this.location.z||0;this._elevationAlignedLocation.z=e+this._elevation.offset,this._elevationAlignedLocation.spatialReference=Ze(this.location.spatialReference),this._renderLocationDirty=!0,this._screenLocationDirty=!0,this._elevationAlignedLocationDirty=!1}grabbableForEvent(){return!0}get grabbing(){return this._grabbing}set grabbing(e){e!==this._grabbing&&(this._grabbing=e,this._setFocused(this._hovering||this._grabbing),this._updateEngineObject())}get hovering(){return this._hovering}set hovering(e){e!==this._hovering&&(this._hovering=e,this._setFocused(this._hovering||this._grabbing),this._updateEngineObject())}get selected(){return this._selected}set selected(e){e!==this._selected&&(this._selected=e,this._updateEngineObject(),this.events.emit("select-changed",{action:e?"select":"deselect"}))}get state(){return this._state}set state(e){e!==this._state&&(this._state=e,this._updateEngineObject())}updateStateEnabled(e,t){t?this.state|=e:this.state&=~e}_setFocused(e){e!==this._focused&&(this._focused=e,this.events.emit("focus-changed",{action:e===!0?"focus":"unfocus"}))}get focused(){return this._focused}get screenLocation(){return this._ensureScreenLocation(),this._screenLocation}_ensureScreenLocation(){if(!this._screenLocationDirty)return;this._screenLocation.pixelSize=this._camera.computeScreenPixelSizeAt(this.renderLocation),this._screenLocationDirty=!1;let e;if(Ae(this._modelTransform)){const t=this._calculateModelTransformOffset(bi);e=K(t,t,this.renderLocation)}else e=this.renderLocation;this._camera.projectToRenderScreen(e,this._screenLocation.renderScreenPointArray),this._camera.renderToScreen(this._screenLocation.renderScreenPointArray,this._screenLocation.screenPointArray)}get applyObjectTransform(){return this._applyObjectTransform}set applyObjectTransform(e){this._applyObjectTransform=e,this._screenLocationDirty=!0,this._updateEngineObject()}get attached(){return this._attached}intersectionDistance(e,t){var r;if(!this.available)return null;const i=Ke(e,fi),a=this._getCollisionRadius(t),n=-1*this.collisionPriority;switch(this.collisionType.type){case"point":if(nt(this.screenLocation.screenPointArray,i)<a*a)return this.screenLocation.renderScreenPointArray[2]+n;break;case"line":{const o=this.collisionType.paths,d=this._getWorldToScreenObjectScale(),_=this._calculateObjectTransform(d,X),c=a*this.screenLocation.pixelSize,p=se(this._camera,i,oe);if(y(p))return null;for(const h of o){if(h.length===0)continue;const f=I(B,h[0],_);for(let b=1;b<h.length;b++){const g=I(Re,h[b],_),E=at(fe(f,g,Oe),p);if(E!=null&&E<c*c){const $=K(R.get(),f,g);le($,$,.5);const j=me(R.get());return this._camera.projectToRenderScreen($,j),j[2]+n}be(f,g)}}break}case"disc":{const o=this.collisionType.direction,d=(r=this.collisionType.offset)!=null?r:it,_=this._getWorldToScreenObjectScale(),c=this._calculateObjectTransform(_,X),p=a*this.screenLocation.pixelSize,h=se(this._camera,i,oe);if(y(h))return null;const f=pe(Le,c),b=_e(je,o,f),g=I(Fe,d,c);ge(g,b,J);const E=Me;if(ve(J,h,E)&&st(E,g)<p*p)return this.screenLocation.renderScreenPointArray[2]+n;break}case"ribbon":{const{paths:o,direction:d}=this.collisionType,_=this._getWorldToScreenObjectScale(),c=this._calculateObjectTransform(_,X),p=a*this._camera.computeScreenPixelSizeAt(this.renderLocation),h=se(this._camera,i,oe);if(y(h))return null;const f=pe(Le,c),b=_e(je,d,f),g=this._calculateModelTransformPosition(Fe);ge(g,b,J);const E=Me;if(!ve(J,h,E))break;for(const $ of o){if($.length===0)continue;const j=I(B,$[0],c);for(let C=1;C<$.length;C++){const x=I(Re,$[C],c),k=tt(fe(j,x,Oe),E);if(k!=null&&k<p*p){const w=K(R.get(),j,x);le(w,w,.5);const W=me(R.get());return this._camera.projectToRenderScreen(w,W),W[2]+n}be(j,x)}}break}default:et(this.collisionType)}return null}attach(e={manipulator3D:{}}){var i;if(!this.view._stage)return;const t=e.manipulator3D;if(y(t.engineLayerId)){const a=new rt({isPickable:!1,updatePolicy:ot.SYNC});this.view._stage.add(a),t.engineLayerId=a.id,this._engineLayer=a}else(i=this.view._stage)!=null&&i.getObject&&(this._engineLayer=this.view._stage.getObject(t.engineLayerId));t.engineLayerReferences=(t.engineLayerReferences||0)+1,this._materialIdReferences=t.materialIdReferences,y(this._materialIdReferences)&&(this._materialIdReferences=new Map,t.materialIdReferences=this._materialIdReferences),this._camera.copyFrom(this.view.state.camera),this._attached=!0,this._updateEngineObject(),lt(this._location.spatialReference,this.view.spatialReference)||(this.location=new Z({x:0,y:0,z:0,spatialReference:this.view.spatialReference}))}detach(e={manipulator3D:{}}){const t=e.manipulator3D;t.engineLayerReferences--;const i=t.engineLayerReferences===0;i&&(t.engineLayerId=null),this._removeResourcesFromStage(i),this._engineResources=null,this._engineLayer=null,this._materialIdReferences=null,this._attached=!1}onViewChange(){this._camera.copyFrom(this.view.state.camera),this._screenLocationDirty=!0,this._updateEngineObject()}onElevationChange(e){ct(this.location,Pe,e.spatialReference),ht(e.extent,Pe)&&(this.location=this._location)}_evaluateElevationAlignment(e=this.location){if(y(this.elevationInfo))return!1;let t=null,i=0;const a=Q(this.elevationInfo.offset,0);switch(this.elevationInfo.mode){case"on-the-ground":t=Q(ae(this.view.elevationProvider,e,"ground"),0);break;case"relative-to-ground":i=Q(ae(this.view.elevationProvider,e,"ground"),0)+a;break;case"relative-to-scene":i=Q(ae(this.view.elevationProvider,e,"scene"),0)+a;break;case"absolute-height":i=a}return(i!==this._elevation.offset||t!==this._elevation.override)&&(this._elevation.offset=i,this._elevation.override=t,!0)}_updateEngineObject(){if(!this._attached)return;if(!this.available)return void this._removeResourcesFromStage();const e=this._getWorldToScreenObjectScale(),t=X;if(this.autoScaleRenderObjects===!0){const r=this._getFocusedSize(this._radius,this.focused)*e;this._calculateObjectTransform(r,t)}else this._calculateObjectTransform(e,t);const{objectsByState:i}=this._ensureEngineResources(),a=(this.focused?O.Focused:O.Unfocused)|(this.selected?O.Selected:O.Unselected),n=this._noDisplayCount>0;for(const{stateMask:r,objects:o}of i){if(n){for(const h of o)h.setVisible(!1);continue}const d=(r&O.All)!==O.None,_=(r&N.All)!==N.None,c=!d||(a&r)==(r&O.All),p=!_||(this.state&r)==(r&N.All);if(c&&p)for(const h of o)h.setVisible(!0),h.transformation=t;else for(const h of o)h.setVisible(!1)}}_ensureEngineResources(){if(y(this._engineResources)){const e=ne(this._engineLayer),t=[],i=new Set;this.renderObjects.forEach(({material:o})=>{i.has(o)||(t.push(o),i.add(o))});const a=(o,d)=>{const{geometry:_,material:c,transform:p}=d;Array.isArray(_)?_.forEach(h=>o.addGeometry(h,c,p)):o.addGeometry(_,c,p)},n=new Map;this._renderObjects.forEach(o=>{const d=new dt({castShadow:!1});a(d,o);const _=o.stateMask||0,c=n.get(_)||[];c.push(d),n.set(_,c)});const r=[];n.forEach((o,d)=>r.push({stateMask:d,objects:o})),this._engineResources={objectsByState:r,layer:e,materials:t}}return this._addResourcesToStage(),this._engineResources}_addResourcesToStage(){if(this._engineResourcesAddedToStage||y(this._engineResources))return;const{objectsByState:e,layer:t,materials:i}=this._engineResources;i.forEach(a=>{const n=ne(this._materialIdReferences),r=n.get(a.id)||0;r===0&&this.view._stage.add(a),n.set(a.id,r+1)}),e.forEach(({objects:a})=>{t.addMany(a),this.view._stage.addMany(a)}),this._engineResourcesAddedToStage=!0}_removeResourcesFromStage(e=!1){if(!this._engineResourcesAddedToStage||y(this._engineResources)||!this.view._stage)return;const{objectsByState:t,layer:i,materials:a}=this._engineResources;t.forEach(({objects:n})=>{i.removeMany(n),this.view._stage.removeMany(n)}),a.forEach(n=>{const r=ne(this._materialIdReferences),o=r.get(n.id);o===1?(this.view._stage.remove(n),r.delete(n.id)):r.set(n.id,o-1)}),e&&this.view._stage.remove(i),this._engineResourcesAddedToStage=!1}_getCollisionRadius(e){return this._getFocusedSize(this.radius,!0)*(e==="touch"?this.touchMultiplier:1)}_getFocusedSize(e,t){return e*(t?this.focusMultiplier:1)}_getWorldToScreenObjectScale(){return this._worldSized?1:this.screenLocation.pixelSize}_calculateModelTransformPosition(e){const t=this._getWorldToScreenObjectScale(),i=this._calculateObjectTransform(t,mi);return ce(e,i[12],i[13],i[14])}_calculateModelTransformOffset(e){const t=this._calculateModelTransformPosition(e);return Ce(e,t,this.renderLocation)}_calculateObjectTransform(e,t){return ut(t,e,0,0,0,0,e,0,0,0,0,e,0,0,0,0,1),this._worldFrame&&ye(t,t,this._worldFrame),ye(t,t,this._modelTransform),t[12]+=this.renderLocation[0],t[13]+=this.renderLocation[1],t[14]+=this.renderLocation[2],t[15]=1,F(this._applyObjectTransform)&&this._applyObjectTransform(t),t}get test(){let e=!1;if(F(this._engineResources))for(const t in this._engineResources.objectsByState){const i=this._engineResources.objectsByState[t];for(const a of i.objects)if(a.isVisible){e=!0;break}if(e)break}return{areAnyResourcesVisible:e}}}function Ae(s){return s[12]!==0||s[13]!==0||s[14]!==0}function vi(s,e,t){switch(s.viewingMode){case"local":return vt(t),!0;case"global":{const i=pt(s.renderCoordsHelper.spatialReference);return _t(e,0,B,0,i.radius),gt(we(B[0]),we(B[1]),t),!0}}}const fi=ze(),Oe=Be(),oe=Ge(),Le=ft(),mi=ee(),X=ee(),J=qe(),B=M(),Re=M(),Me=M(),je=M(),Fe=M(),bi=M(),Pe=new Z({x:0,y:0,z:0,spatialReference:null});function yi(s,e){if(!e.screenSizeEnabled)return;const t=s.vertex;mt(t,e),t.uniforms.add(new Se("perScreenPixelRatio",(i,a)=>a.camera.perScreenPixelRatio)),t.uniforms.add(new Se("screenSizeScale",i=>i.screenSizeScale)),t.code.add(T`float computeRenderPixelSizeAt( vec3 pWorld ){
vec3 viewForward = - vec3(view[0][2], view[1][2], view[2][2]);
float viewDirectionDistance = abs(dot(viewForward, pWorld - cameraPosition));
return viewDirectionDistance * perScreenPixelRatio;
}
vec3 screenSizeScaling(vec3 position, vec3 anchor){
return position * screenSizeScale * computeRenderPixelSizeAt(anchor) + anchor;
}`)}function wi(s){const e=new bt,t=s.hasMultipassTerrain&&(s.output===S.Color||s.output===S.Alpha);e.include(yt,s),e.include(yi,s),e.include(wt,s);const{vertex:i,fragment:a}=e;return a.include(St),Et(i,s),a.uniforms.add(new Ee("uColor",n=>n.color)),e.attributes.add(u.POSITION,"vec3"),e.varyings.add("vWorldPosition","vec3"),t&&e.varyings.add("depth","float"),s.screenSizeEnabled&&e.attributes.add(u.OFFSET,"vec3"),s.shadingEnabled&&($t(i),e.attributes.add(u.NORMAL,"vec3"),e.varyings.add("vViewNormal","vec3")),i.code.add(T`
    void main(void) {
      vWorldPosition = ${s.screenSizeEnabled?"screenSizeScaling(offset, position)":"position"};
  `),s.shadingEnabled&&i.code.add(T`vec3 worldNormal = normal;
vViewNormal = (viewNormal * vec4(worldNormal, 1)).xyz;`),i.code.add(T`
    ${t?"depth = (view * vec4(vWorldPosition, 1.0)).z;":""}
    gl_Position = transformPosition(proj, view, vWorldPosition);
  }
  `),t&&e.include(Tt,s),a.code.add(T`
    void main() {
      discardBySlice(vWorldPosition);
      ${t?"terrainDepthTest(gl_FragCoord, depth);":""}
    `),s.shadingEnabled?(a.uniforms.add(new At("shadingDirection",n=>n.shadingDirection)),a.uniforms.add(new Ee("shadedColor",n=>Si(n.shadingTint,n.color))),a.code.add(T`vec3 viewNormalNorm = normalize(vViewNormal);
float shadingFactor = 1.0 - clamp(-dot(viewNormalNorm, shadingDirection), 0.0, 1.0);
vec4 finalColor = mix(uColor, shadedColor, shadingFactor);`)):a.code.add(T`vec4 finalColor = uColor;`),a.code.add(T`
      if (finalColor.a < ${T.float(Ot)}) {
        discard;
      }
      ${s.output===S.Alpha?T`gl_FragColor = vec4(finalColor.a);`:""}

      ${s.output===S.Color?T`gl_FragColor = highlightSlice(finalColor, vWorldPosition); ${s.transparencyPassType===G.Color?"gl_FragColor = premultiplyAlpha(gl_FragColor);":""}`:""}
    }
    `),e}function Si(s,e){const t=1-s[3],i=s[3]+e[3]*t;return i===0?(D[3]=i,D):(D[0]=(s[0]*s[3]+e[0]*e[3]*t)/i,D[1]=(s[1]*s[3]+e[1]*e[3]*t)/i,D[2]=(s[2]*s[3]+e[2]*e[3]*t)/i,D[3]=e[3],D)}const D=Lt(),Ei=Object.freeze(Object.defineProperty({__proto__:null,build:wi},Symbol.toStringTag,{value:"Module"}));class ie extends jt{initializeProgram(e){return new Ft(e.rctx,ie.shader.get().build(this.configuration),Ve)}_setPipelineState(e){const t=this.configuration,i=e===G.NONE,a=e===G.FrontFace;return Pt({blending:t.output!==S.Color&&t.output!==S.Alpha||!t.transparent?null:i?Dt:zt(e),culling:Ct(t.cullFace),depthTest:{func:a?re.LESS:t.shadingEnabled?re.LEQUAL:re.LESS},depthWrite:i?t.writeDepth&&xt:It(e),colorWrite:Nt,polygonOffset:i||a?null:kt})}initializePipeline(){return this._setPipelineState(this.configuration.transparencyPassType)}}ie.shader=new Rt(Ei,()=>Mt(()=>import("./ShadedColorMaterial.glsl.d4c863b7.js"),["assets/ShadedColorMaterial.glsl.d4c863b7.js","assets/index.f489a479.js","assets/index.785c8c13.css","assets/ImageMaterial.fd21e937.js"]));class A extends Wt{constructor(){super(...arguments),this.output=S.Color,this.cullFace=q.None,this.transparencyPassType=G.NONE,this.hasSlicePlane=!1,this.transparent=!1,this.writeDepth=!0,this.screenSizeEnabled=!0,this.shadingEnabled=!0,this.hasMultipassTerrain=!1,this.cullAboveGround=!1}}l([L({count:S.COUNT})],A.prototype,"output",void 0),l([L({count:q.COUNT})],A.prototype,"cullFace",void 0),l([L({count:G.COUNT})],A.prototype,"transparencyPassType",void 0),l([L()],A.prototype,"hasSlicePlane",void 0),l([L()],A.prototype,"transparent",void 0),l([L()],A.prototype,"writeDepth",void 0),l([L()],A.prototype,"screenSizeEnabled",void 0),l([L()],A.prototype,"shadingEnabled",void 0),l([L()],A.prototype,"hasMultipassTerrain",void 0),l([L()],A.prototype,"cullAboveGround",void 0);const Ve=new Map([[u.POSITION,0],[u.NORMAL,1],[u.OFFSET,2]]);class $i extends Vt{constructor(e){super(e,new Ai),this.supportsEdges=!0,this._configuration=new A,this._vertexAttributeLocations=Ve}getConfiguration(e,t){return this._configuration.output=e,this._configuration.cullFace=this.parameters.cullFace,this._configuration.hasSlicePlane=this.parameters.hasSlicePlane,this._configuration.transparent=this.parameters.transparent,this._configuration.writeDepth=this.parameters.writeDepth,this._configuration.screenSizeEnabled=this.parameters.screenSizeEnabled,this._configuration.shadingEnabled=this.parameters.shadingEnabled,this._configuration.transparencyPassType=t.transparencyPassType,this._configuration.hasMultipassTerrain=t.multipassTerrain.enabled,this._configuration.cullAboveGround=t.multipassTerrain.cullAboveGround,this._configuration}intersect(e,t,i,a,n,r,o){if(this.parameters.screenSizeEnabled){const d=e.vertexAttributes.get(u.OFFSET);$e(e,t,a,n,r,{applyToVertex:(c,p,h,f)=>{const b=ce(De,d.data[3*f+0],d.data[3*f+1],d.data[3*f+2]),g=ce(Li,c,p,h);return le(b,b,this.parameters.screenSizeScale*a.camera.computeRenderPixelSizeAt(b)),K(g,g,b),[g[0],g[1],g[2]]},applyToAabb:c=>{const p=Jt(c,De);return Yt(c,this.parameters.screenSizeScale*a.camera.computeRenderPixelSizeAt(p))}},o)}else $e(e,t,a,n,r,void 0,o)}requiresSlot(e,t){if(t===S.Highlight)return e===V.OPAQUE_MATERIAL;if(t===S.Color||t===S.Alpha||t===S.ObjectAndLayerIdColor){let i=V.OPAQUE_MATERIAL;return this.parameters.transparent&&(i=this.parameters.writeDepth?V.TRANSPARENT_MATERIAL:V.TRANSPARENT_DEPTH_WRITE_DISABLED_MATERIAL),e===i||e===V.DRAPED_MATERIAL}return!1}createGLMaterial(e){return new Ti(e)}createBufferWriter(){return new Oi(this.parameters.screenSizeEnabled)}}class Ti extends Ut{beginSlot(e){return this.ensureTechnique(ie,e)}}class Ai extends Bt{constructor(){super(...arguments),this.color=H(1,1,1,1),this.shadingTint=H(0,0,0,.25),this.shadingDirection=he(M(),[.5,-.5,-.5]),this.screenSizeScale=14,this.transparent=!1,this.writeDepth=!0,this.hasSlicePlane=!1,this.cullFace=q.None,this.screenSizeEnabled=!1,this.shadingEnabled=!0}}class Oi{constructor(e){this.screenSizeEnabled=e;const t=Gt().vec3f(u.POSITION).vec3f(u.NORMAL);this.screenSizeEnabled&&t.vec3f(u.OFFSET),this.vertexBufferLayout=t}allocate(e){return this.vertexBufferLayout.createBuffer(e)}elementCount(e){return e.indices.get(u.POSITION).length}write(e,t,i,a,n){if(qt(i,this.vertexBufferLayout,e,t,a,n),this.screenSizeEnabled){if(!i.vertexAttributes.has(u.OFFSET))throw new Error(`${u.OFFSET} vertex attribute required for screenSizeEnabled ShadedColorMaterial`);{const r=i.vertexAttributes.get(u.OFFSET),o=i.indices.get(u.OFFSET);Ht(r.size===3);const d=a.getField(u.OFFSET,Qt);if(!d)throw new Error("unable to acquire view for "+u.OFFSET);Xt(o,r.data,t,d,n)}}}}const De=M(),Li=M();function Ri(s,e=de.OccludeAndTransparent,t=!0){const i=H(s[0],s[1],s[2],s.length>3?s[3]:1),a=s[3]<1;return t?new $i({color:i,transparent:a,writeDepth:!0,cullFace:q.Back,renderOccluded:e}):new ai({color:i,transparent:a,writeDepth:!0,cullFace:q.Back,renderOccluded:e})}const U=Object.freeze({calloutLength:40,calloutWidth:1,discRadius:27,focusMultiplier:1.1,calloutColor:Zt(1,.5,0)});function Ii(s,e){const t=new We({view:s,autoScaleRenderObjects:!1,collisionPriority:1,metadata:e.metadata});return Mi(t,e),t}function Mi(s,e){var b,g,E,$,j,C,x,k;const t=(g=e.material)!=null?g:new gi({transparent:!0,writeDepth:!1,textureId:(b=e.texture)==null?void 0:b.id,renderOccluded:de.Opaque}),i=(E=e.focusMultiplier)!=null?E:U.focusMultiplier,a=($=e.calloutLength)!=null?$:U.calloutLength,n=U.discRadius*((j=e.discScale)!=null?j:1),r=n*i,o=w=>{const W=[0,1,2,2,3,0];return new ni([[u.POSITION,{size:3,data:[a-w,-w,0,a+w,-w,0,a+w,w,0,a-w,w,0],exclusive:!0}],[u.UV0,{size:2,data:[0,0,1,0,1,1,0,1]}]],[[u.POSITION,W],[u.UV0,W]])},d=Te([[0,0,0],[a-n,0,0]]),_=Te([[0,0,0],[a-r,0,0]]),c=U.calloutColor,p=(C=e.calloutWidth)!=null?C:U.calloutWidth,h=new(p>1?ti:ii)({width:p,color:H(c[0],c[1],c[2],(x=e.calloutOpacity)!=null?x:1),renderOccluded:de.OccludeAndTransparent}),f=(k=e.customStateMask)!=null?k:N.None;s.collisionType={type:"disc",direction:[0,0,1],offset:[a,0,0]},s.focusMultiplier=i,s.metadata=e.metadata,s.radius=n,s.renderObjects=[{geometry:o(n),material:t,stateMask:O.Unfocused|f},{geometry:d,material:h,stateMask:O.Unfocused|f},{geometry:o(r),material:t,stateMask:O.Focused|f},{geometry:_,material:h,stateMask:O.Focused|f}]}function Ni(s,e,t,i=N.None){return new We({view:s,renderObjects:[{geometry:si(1,32,32),material:Ri(H(e[0],e[1],e[2],t!=null?t:1)),stateMask:i}]})}const ki=Object.freeze({autoScaleRenderObjects:!1,worldSized:!0});function Wi(s,e,t,i){const a=Ce(R.get(),s,t),n=ji(a,xe(R.get(),i,a),t,Kt.get());ei(n,n);const r=I(R.get(),e,n);return Math.atan2(r[1],r[0])}function ji(s,e,t,i){const a=he(R.get(),s),n=he(R.get(),e),r=xe(R.get(),a,n);return i[0]=a[0],i[1]=a[1],i[2]=a[2],i[3]=0,i[4]=n[0],i[5]=n[1],i[6]=n[2],i[7]=0,i[8]=r[0],i[9]=r[1],i[10]=r[2],i[11]=0,i[12]=t[0],i[13]=t[1],i[14]=t[2],i[15]=1,i}function Fi(s,e){let t=null,i=null;return a=>{if(a.action==="cancel")return void(F(i)&&(i.execute({action:"cancel"}),t=null,i=null));const n={action:a.action,screenStart:a.start,screenEnd:a.screenPoint};a.action==="start"&&y(t)&&(t=new te,i=new te,e(s,t,i,a.pointerType,n)),F(t)&&t.execute(n),a.action==="end"&&F(t)&&(t=null,i=null)}}function Vi(s,e){return s.events.on("drag",Fi(s,e))}function Ui(s,e){const t=new Map;for(const i of e)t.set(i,ri(s[i]));return i=>(t.forEach((a,n)=>{s[n]=a}),i)}class te{constructor(){this.execute=()=>{}}next(e,t=new te){return F(e)&&(this.execute=i=>{const a=e(i);F(a)&&t.execute(a)}),t}}var z;(function(s){s[s.WhenToolEditable=0]="WhenToolEditable",s[s.WhenToolNotEditable=1]="WhenToolNotEditable",s[s.Always=2]="Always"})(z||(z={}));class Pi{constructor(){this._isToolEditable=!0,this._manipulators=new oi,this._resourceContexts={manipulator3D:{}},this._attached=!1}set isToolEditable(e){this._isToolEditable=e}get length(){return this._manipulators.length}add(e,t=z.WhenToolEditable){this.addMany([e],t)}addMany(e,t=z.WhenToolEditable){for(const i of e){const a={manipulator:i,visibilityPredicate:t,attached:!1};this._manipulators.add(a),this._attached&&this._updateManipulatorAttachment(a)}}remove(e){for(let t=0;t<this._manipulators.length;t++)if(this._manipulators.getItemAt(t).manipulator===e){const i=this._manipulators.splice(t,1)[0];this._detachManipulator(i);break}}removeAll(){this._manipulators.forEach(e=>{this._detachManipulator(e)}),this._manipulators.removeAll()}attach(){this._manipulators.forEach(e=>{this._updateManipulatorAttachment(e)}),this._attached=!0}detach(){this._manipulators.forEach(e=>{this._detachManipulator(e)}),this._attached=!1}destroy(){this.detach(),this._manipulators.forEach(({manipulator:e})=>{e.destroy&&e.destroy()}),this._manipulators.destroy(),this._resourceContexts=null}on(e,t){return this._manipulators.on(e,i=>{t(i)})}forEach(e){for(const t of this._manipulators.items)e(t)}some(e){return this._manipulators.items.some(e)}toArray(){const e=[];return this.forEach(t=>e.push(t.manipulator)),e}intersect(e,t){let i=null,a=Number.MAX_VALUE;return this._manipulators.forEach(({manipulator:n,attached:r})=>{if(!r||!n.interactive)return;const o=n.intersectionDistance(e,t);F(o)&&o<a&&(a=o,i=n)}),i}_updateManipulatorAttachment(e){this._isManipulatorItemVisible(e)?this._attachManipulator(e):this._detachManipulator(e)}_attachManipulator(e){e.attached||(e.manipulator.attach&&e.manipulator.attach(this._resourceContexts),e.attached=!0)}_detachManipulator(e){if(!e.attached)return;const t=e.manipulator;t.grabbing=!1,t.dragging=!1,t.hovering=!1,t.selected=!1,t.detach&&t.detach(this._resourceContexts),e.attached=!1}_isManipulatorItemVisible(e){return e.visibilityPredicate===z.Always||(this._isToolEditable?e.visibilityPredicate===z.WhenToolEditable:e.visibilityPredicate===z.WhenToolNotEditable)}}let v=class extends li{constructor(s){super(s),this.manipulators=new Pi,this.automaticManipulatorSelection=!0,this.hasGrabbedManipulators=!1,this.hasHoveredManipulators=!1,this.firstGrabbedManipulator=null,this.created=!1,this.removeIncompleteOnCancel=!0,this._editableFlags=new Map([[P.MANAGER,!0],[P.USER,!0]]),this._creationFinishedResolver=ci()}get active(){return this.view!=null&&this.view.activeTool===this}set visible(s){this._get("visible")!==s&&(this._set("visible",s),this._syncVisible())}get editable(){return this.getEditableFlag(P.USER)}set editable(s){this.setEditableFlag(P.USER,s)}get updating(){return!1}get cursor(){return null}get hasFocusedManipulators(){return this.hasGrabbedManipulators||this.hasHoveredManipulators}destroy(){this.manipulators.destroy(),this._set("view",null)}onAdd(){this._syncVisible()}activate(){y(this.view)?hi.getLogger(this.declaredClass).error("Can't activate tool if view is not defined."):(this.view.focus(),this.onActivate())}deactivate(){this.onDeactivate()}handleInputEvent(s){this.onInputEvent(s)}handleInputEventAfter(s){this.onInputEventAfter(s)}setEditableFlag(s,e){this._editableFlags.set(s,e),this.manipulators.isToolEditable=this.internallyEditable,this._updateManipulatorAttachment(),s===P.USER&&this.notifyChange("editable"),this.onEditableChange(),this.onManipulatorSelectionChanged()}getEditableFlag(s){return this._editableFlags.get(s)}whenCreated(){return this._creationFinishedResolver.promise}onManipulatorSelectionChanged(){}onActivate(){}onDeactivate(){}onShow(){}onHide(){}onEditableChange(){}onInputEvent(s){}onInputEventAfter(s){}get internallyEditable(){return this.getEditableFlag(P.USER)&&this.getEditableFlag(P.MANAGER)}finishToolCreation(){this.created||this._creationFinishedResolver.resolve(this),this._set("created",!0)}_syncVisible(){if(this.initialized){if(this.visible)this._show();else if(this._hide(),this.active)return void(this.view.activeTool=null)}}_show(){this._updateManipulatorAttachment(),this.onShow()}_hide(){this._updateManipulatorAttachment(),this.onHide()}_updateManipulatorAttachment(){this.visible?this.manipulators.attach():this.manipulators.detach()}};l([m({constructOnly:!0})],v.prototype,"view",void 0),l([m({readOnly:!0})],v.prototype,"active",null),l([m({value:!0})],v.prototype,"visible",null),l([m({value:!0})],v.prototype,"editable",null),l([m({readOnly:!0})],v.prototype,"manipulators",void 0),l([m({readOnly:!0})],v.prototype,"updating",null),l([m()],v.prototype,"cursor",null),l([m({readOnly:!0})],v.prototype,"automaticManipulatorSelection",void 0),l([m()],v.prototype,"hasFocusedManipulators",null),l([m()],v.prototype,"hasGrabbedManipulators",void 0),l([m()],v.prototype,"hasHoveredManipulators",void 0),l([m()],v.prototype,"firstGrabbedManipulator",void 0),l([m({readOnly:!0})],v.prototype,"created",void 0),l([m({readOnly:!0})],v.prototype,"removeIncompleteOnCancel",void 0),v=l([Ie("esri.views.interactive.InteractiveToolBase")],v);let Y=class extends v{constructor(s){super(s)}initialize(){this.addHandles(Ne(()=>this.analysisViewData.visible,s=>this.visible=s,ke))}deactivate(){this.onDeactivate(),this.created||this.analysis.clear()}resetCreated(){this._set("created",!1)}};l([m({constructOnly:!0})],Y.prototype,"analysis",void 0),l([m()],Y.prototype,"analysisViewData",void 0),Y=l([Ie("esri.views.interactive.AnalysisToolBase")],Y);function Bi(s,e){s.interactive=!0;const{tool:t,view:i}=s;i.activeTool=t;let a=di(e,()=>{i.activeTool===t&&(i.activeTool=null)});return ui(async n=>{await pi(()=>y(t)||!t.active,n),a=_i(a)},e)}function Gi(s,e){return Ne(()=>s.interactive,()=>Di(s,e),ke)}function Di(s,e){s.interactive?zi(s,e):Ue(s)}function zi(s,e){Ue(s);const{view:t,analysis:i}=s,a=new e({view:t,analysis:i,analysisViewData:s});return s.tool=a,t.tools.add(a),a}function Ue(s){const{view:e,tool:t}=s;y(t)||(e.tools.remove(t),s.tool=null)}export{Ri as A,ji as D,te as G,Ii as R,Mi as T,Ni as U,Y as a,wi as b,Bi as c,Vi as d,We as i,Ue as m,Gi as s,$i as v,Ui as w,ki as x,Wi as z};
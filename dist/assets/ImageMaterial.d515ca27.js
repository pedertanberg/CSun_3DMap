import{dL as y,dM as $,dN as O,dx as g,dO as S,r as v,dP as x,dQ as u,dR as A,dS as C,dT as E,dU as w,co as o,dV as T,dW as F,dX as p,dY as b,_ as N,dZ as D,d_ as f,P as n,d$ as l,e0 as _,e1 as M,e2 as R,e3 as I,e4 as L,e5 as U,e6 as W,e7 as B,e8 as G,e9 as j,ea as z,eb as H,ec as Q,ed as V,ee as q,ef as k,eg as X,eh as Y,ei as Z,cp as c,ej as J,ek as K,el as ee,em as te}from"./index.347f2ee6.js";function ae(a){const e=new y,{vertex:t,fragment:s}=e;return $(t,a),e.include(O,a),e.attributes.add(g.POSITION,"vec3"),e.attributes.add(g.UV0,"vec2"),e.varyings.add("vpos","vec3"),a.hasMultipassTerrain&&e.varyings.add("depth","float"),t.uniforms.add(new S("textureCoordinateScaleFactor",r=>v(r.texture)&&v(r.texture.descriptor.textureCoordinateScaleFactor)?r.texture.descriptor.textureCoordinateScaleFactor:x)),t.code.add(u`
    void main(void) {
      vpos = position;
      ${a.hasMultipassTerrain?"depth = (view * vec4(vpos, 1.0)).z;":""}
      vTexCoord = uv0 * textureCoordinateScaleFactor;
      gl_Position = transformPosition(proj, view, vpos);
    }
  `),e.include(A,a),e.include(C,a),s.uniforms.add([new E("tex",r=>r.texture),new w("opacity",r=>r.opacity)]),e.varyings.add("vTexCoord","vec2"),a.output===o.Alpha?s.code.add(u`
    void main() {
      discardBySlice(vpos);
      ${a.hasMultipassTerrain?"terrainDepthTest(gl_FragCoord, depth);":""}

      float alpha = texture2D(tex, vTexCoord).a * opacity;
      if (alpha  < ${u.float(T)}) {
        discard;
      }

      gl_FragColor = vec4(alpha);
    }
    `):(s.include(F),s.code.add(u`
    void main() {
      discardBySlice(vpos);
      ${a.hasMultipassTerrain?"terrainDepthTest(gl_FragCoord, depth);":""}
      gl_FragColor = texture2D(tex, vTexCoord) * opacity;

      if (gl_FragColor.a < ${u.float(T)}) {
        discard;
      }

      gl_FragColor = highlightSlice(gl_FragColor, vpos);
      ${a.transparencyPassType===p.Color?"gl_FragColor = premultiplyAlpha(gl_FragColor);":""}
    }
    `)),e}const se=Object.freeze(Object.defineProperty({__proto__:null,build:ae},Symbol.toStringTag,{value:"Module"}));class d extends M{initializeProgram(e){return new R(e.rctx,d.shader.get().build(this.configuration),I)}_setPipelineState(e,t){const s=this.configuration,r=e===p.NONE,h=e===p.FrontFace;return L({blending:s.output!==o.Color&&s.output!==o.Alpha||!s.transparent?null:r?re:U(e),culling:W(s.cullFace),depthTest:{func:B(e)},depthWrite:r?s.writeDepth&&G:j(e),colorWrite:z,stencilWrite:s.hasOccludees?H:null,stencilTest:s.hasOccludees?t?Q:V:null,polygonOffset:r||h?null:q(s.enableOffset)})}initializePipeline(){return this._occludeePipelineState=this._setPipelineState(this.configuration.transparencyPassType,!0),this._setPipelineState(this.configuration.transparencyPassType,!1)}getPipelineState(e,t){return t?this._occludeePipelineState:super.getPipelineState(e,t)}}d.shader=new b(se,()=>N(()=>import("./ImageMaterial.glsl.491fa866.js"),["assets/ImageMaterial.glsl.491fa866.js","assets/index.347f2ee6.js","assets/index.a651de9c.css"]));const re=D(f.ONE,f.ONE_MINUS_SRC_ALPHA);class i extends k{constructor(){super(...arguments),this.output=o.Color,this.cullFace=_.None,this.hasSlicePlane=!1,this.transparent=!1,this.enableOffset=!0,this.writeDepth=!0,this.hasOccludees=!1,this.transparencyPassType=p.NONE,this.hasMultipassTerrain=!1,this.cullAboveGround=!1}}n([l({count:o.COUNT})],i.prototype,"output",void 0),n([l({count:_.COUNT})],i.prototype,"cullFace",void 0),n([l()],i.prototype,"hasSlicePlane",void 0),n([l()],i.prototype,"transparent",void 0),n([l()],i.prototype,"enableOffset",void 0),n([l()],i.prototype,"writeDepth",void 0),n([l()],i.prototype,"hasOccludees",void 0),n([l({count:p.COUNT})],i.prototype,"transparencyPassType",void 0),n([l()],i.prototype,"hasMultipassTerrain",void 0),n([l()],i.prototype,"cullAboveGround",void 0);class le extends X{constructor(e){super(e,new oe),this.supportsEdges=!0,this._configuration=new i}getConfiguration(e,t){return this._configuration.output=e,this._configuration.cullFace=this.parameters.cullFace,this._configuration.hasSlicePlane=this.parameters.hasSlicePlane,this._configuration.transparent=this.parameters.transparent,this._configuration.writeDepth=this.parameters.writeDepth,this._configuration.hasOccludees=this.parameters.hasOccludees,this._configuration.transparencyPassType=t.transparencyPassType,this._configuration.enableOffset=t.camera.relativeElevation<Y,this._configuration.hasMultipassTerrain=t.multipassTerrain.enabled,this._configuration.cullAboveGround=t.multipassTerrain.cullAboveGround,this._configuration}intersect(e,t,s,r,h,P,m){Z(e,t,r,h,P,void 0,m)}requiresSlot(e,t){return t===o.Color||t===o.Alpha||t===o.Highlight?e===c.DRAPED_MATERIAL?!0:t===o.Highlight?e===c.OPAQUE_MATERIAL:e===(this.parameters.transparent?this.parameters.writeDepth?c.TRANSPARENT_MATERIAL:c.TRANSPARENT_DEPTH_WRITE_DISABLED_MATERIAL:c.OPAQUE_MATERIAL):!1}createGLMaterial(e){return new ie(e)}createBufferWriter(){return new J(K)}}class ie extends ee{constructor(e){super({...e,...e.material.parameters})}_updateParameters(e){return this.updateTexture(this._material.parameters.textureId),this._material.setParameters(this.textureBindParameters),this.ensureTechnique(d,e)}_updateOccludeeState(e){e.hasOccludees!==this._material.parameters.hasOccludees&&(this._material.setParameters({hasOccludees:e.hasOccludees}),this._updateParameters(e))}beginSlot(e){return this._output!==o.Color&&this._output!==o.Alpha||this._updateOccludeeState(e),this._updateParameters(e)}}class oe extends te{constructor(){super(...arguments),this.transparent=!1,this.writeDepth=!0,this.hasSlicePlane=!1,this.cullFace=_.None,this.hasOccludees=!1,this.opacity=1,this.textureId=null,this.initTextureTransparent=!0}}export{ae as f,le as p};

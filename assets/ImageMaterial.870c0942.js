import{d0 as y,d1 as $,d2 as O,cN as _,d3 as x,r as v,d4 as A,d5 as d,d6 as S,d7 as C,d8 as E,d9 as b,bt as o,da as T,db as w,dc as c,dd as F,br as D,de as N,df as f,e as n,dg as l,dh as g,di as M,dj as R,dk as I,dl as L,dm as U,dn as B,dp as W,dq as z,dr as G,ds as j,dt as H,du as q,dv as Q,dw as V,dx as k,dy as J,dz as K,dA as X,bu as u,dB as Y,dC as Z,dD as ee,dE as te}from"./index.bd80e406.js";function ae(a){const e=new y,{vertex:t,fragment:s}=e;return $(t,a),e.include(O,a),e.attributes.add(_.POSITION,"vec3"),e.attributes.add(_.UV0,"vec2"),e.varyings.add("vpos","vec3"),a.hasMultipassTerrain&&e.varyings.add("depth","float"),t.uniforms.add(new x("textureCoordinateScaleFactor",r=>v(r.texture)&&v(r.texture.descriptor.textureCoordinateScaleFactor)?r.texture.descriptor.textureCoordinateScaleFactor:A)),t.code.add(d`
    void main(void) {
      vpos = position;
      ${a.hasMultipassTerrain?"depth = (view * vec4(vpos, 1.0)).z;":""}
      vTexCoord = uv0 * textureCoordinateScaleFactor;
      gl_Position = transformPosition(proj, view, vpos);
    }
  `),e.include(S,a),e.include(C,a),s.uniforms.add([new E("tex",r=>r.texture),new b("opacity",r=>r.opacity)]),e.varyings.add("vTexCoord","vec2"),a.output===o.Alpha?s.code.add(d`
    void main() {
      discardBySlice(vpos);
      ${a.hasMultipassTerrain?"terrainDepthTest(gl_FragCoord, depth);":""}

      float alpha = texture2D(tex, vTexCoord).a * opacity;
      if (alpha  < ${d.float(T)}) {
        discard;
      }

      gl_FragColor = vec4(alpha);
    }
    `):(s.include(w),s.code.add(d`
    void main() {
      discardBySlice(vpos);
      ${a.hasMultipassTerrain?"terrainDepthTest(gl_FragCoord, depth);":""}
      gl_FragColor = texture2D(tex, vTexCoord) * opacity;

      if (gl_FragColor.a < ${d.float(T)}) {
        discard;
      }

      gl_FragColor = highlightSlice(gl_FragColor, vpos);
      ${a.transparencyPassType===c.Color?"gl_FragColor = premultiplyAlpha(gl_FragColor);":""}
    }
    `)),e}const se=Object.freeze(Object.defineProperty({__proto__:null,build:ae},Symbol.toStringTag,{value:"Module"}));class p extends M{initializeProgram(e){return new R(e.rctx,p.shader.get().build(this.configuration),I)}_setPipelineState(e,t){const s=this.configuration,r=e===c.NONE,h=e===c.FrontFace;return L({blending:s.output!==o.Color&&s.output!==o.Alpha||!s.transparent?null:r?re:U(e),culling:B(s.cullFace),depthTest:{func:W(e)},depthWrite:r?s.writeDepth&&z:G(e),colorWrite:j,stencilWrite:s.hasOccludees?H:null,stencilTest:s.hasOccludees?t?q:Q:null,polygonOffset:r||h?null:V(s.enableOffset)})}initializePipeline(){return this._occludeePipelineState=this._setPipelineState(this.configuration.transparencyPassType,!0),this._setPipelineState(this.configuration.transparencyPassType,!1)}getPipelineState(e,t){return t?this._occludeePipelineState:super.getPipelineState(e,t)}}p.shader=new F(se,()=>D(()=>import("./ImageMaterial.glsl.25868b12.js"),["assets/ImageMaterial.glsl.25868b12.js","assets/index.bd80e406.js","assets/index.785c8c13.css"]));const re=N(f.ONE,f.ONE_MINUS_SRC_ALPHA);class i extends k{constructor(){super(...arguments),this.output=o.Color,this.cullFace=g.None,this.hasSlicePlane=!1,this.transparent=!1,this.enableOffset=!0,this.writeDepth=!0,this.hasOccludees=!1,this.transparencyPassType=c.NONE,this.hasMultipassTerrain=!1,this.cullAboveGround=!1}}n([l({count:o.COUNT})],i.prototype,"output",void 0),n([l({count:g.COUNT})],i.prototype,"cullFace",void 0),n([l()],i.prototype,"hasSlicePlane",void 0),n([l()],i.prototype,"transparent",void 0),n([l()],i.prototype,"enableOffset",void 0),n([l()],i.prototype,"writeDepth",void 0),n([l()],i.prototype,"hasOccludees",void 0),n([l({count:c.COUNT})],i.prototype,"transparencyPassType",void 0),n([l()],i.prototype,"hasMultipassTerrain",void 0),n([l()],i.prototype,"cullAboveGround",void 0);class le extends J{constructor(e){super(e,new oe),this.supportsEdges=!0,this._configuration=new i}getConfiguration(e,t){return this._configuration.output=e,this._configuration.cullFace=this.parameters.cullFace,this._configuration.hasSlicePlane=this.parameters.hasSlicePlane,this._configuration.transparent=this.parameters.transparent,this._configuration.writeDepth=this.parameters.writeDepth,this._configuration.hasOccludees=this.parameters.hasOccludees,this._configuration.transparencyPassType=t.transparencyPassType,this._configuration.enableOffset=t.camera.relativeElevation<K,this._configuration.hasMultipassTerrain=t.multipassTerrain.enabled,this._configuration.cullAboveGround=t.multipassTerrain.cullAboveGround,this._configuration}intersect(e,t,s,r,h,m,P){X(e,t,r,h,m,void 0,P)}requiresSlot(e,t){return t===o.Color||t===o.Alpha||t===o.Highlight?e===u.DRAPED_MATERIAL?!0:t===o.Highlight?e===u.OPAQUE_MATERIAL:e===(this.parameters.transparent?this.parameters.writeDepth?u.TRANSPARENT_MATERIAL:u.TRANSPARENT_DEPTH_WRITE_DISABLED_MATERIAL:u.OPAQUE_MATERIAL):!1}createGLMaterial(e){return new ie(e)}createBufferWriter(){return new Y(Z)}}class ie extends ee{constructor(e){super({...e,...e.material.parameters})}_updateParameters(e){return this.updateTexture(this._material.parameters.textureId),this._material.setParameters(this.textureBindParameters),this.ensureTechnique(p,e)}_updateOccludeeState(e){e.hasOccludees!==this._material.parameters.hasOccludees&&(this._material.setParameters({hasOccludees:e.hasOccludees}),this._updateParameters(e))}beginSlot(e){return this._output!==o.Color&&this._output!==o.Alpha||this._updateOccludeeState(e),this._updateParameters(e)}}class oe extends te{constructor(){super(...arguments),this.transparent=!1,this.writeDepth=!0,this.hasSlicePlane=!1,this.cullFace=g.None,this.hasOccludees=!1,this.opacity=1,this.textureId=null,this.initTextureTransparent=!0}}export{ae as f,le as p};

import{en as C,ea as q,aC as z,aD as F,ab as x,t as m,i4 as G,fH as O,i5 as $,r as E,b6 as H}from"./index.bd80e406.js";import{a as P}from"./elevationInfoUtils.a285b3d7.js";async function B(t,p,f,I,o){const{elevationProvider:g,renderCoordsHelper:r,spatialReference:w}=t,{elevationInfo:y}=p,b=z(y,!0),v=await F(b,w,o);x(o);const c=[],u=new Set,l=new Set;for(const{objectId:i,points:e}of I){const n=f(i);if(m(n)){for(const a of e)c.push(a[2]);u.add(i);continue}n.isDraped&&l.add(i);const s=n.graphic.geometry;j.setFromElevationInfo(P(s,y)),j.updateFeatureExpressionInfoContext(v,n.graphic,p),h.spatialReference=t.spatialReference;for(const{x:a,y:d,z:S}of e)h.x=a,h.y=d,h.z=S!=null?S:0,G(h,g,j,r,D),c.push(D.z)}return{elevations:c,drapedObjectIds:l,failedObjectIds:u}}const j=new O,h=C(0,0,0,q.WGS84),D=new $;async function W(t,p,f){var i;if(m(t)||p.candidates.length===0)return R;const I=(i=t.graphics3DGraphicsByObjectID)!=null?i:t.graphics3DGraphics,o=[],g=[],{renderer:r}=t,w=E(r)&&"arcadeRequired"in r&&r.arcadeRequired?H():null,y=async(e,{graphic:n,graphics3DSymbol:s})=>{const a=await w,d=await t.getRenderingInfoAsync(n,r,a,{signal:f});return m(d)?[]:s.queryForSnapping(e,v,d,f)},{candidates:b,spatialReference:v}=p;for(let e=0;e<b.length;++e){const n=b[e],{objectId:s}=n,a=typeof s=="number"?I.get(s):void 0;if(m(a))continue;const{graphics3DSymbol:d}=a;d.symbologySnappingSupported&&(o.push(y(n,a)),g.push(e))}if(o.length===0)return R;const c=await Promise.all(o);x(f);const u=[],l=[];for(let e=0;e<c.length;++e){const n=c[e],s=g[e];for(const a of n)u.push(a),l.push(s)}return{candidates:u,sourceCandidateIndices:l}}const R={candidates:[],sourceCandidateIndices:[]};export{W as a,B as m};
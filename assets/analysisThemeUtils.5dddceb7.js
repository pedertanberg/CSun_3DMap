import{l as y,kF as tt,s as D,kz as et,kG as g,hz as nt,kH as at,kI as st,ea as it,aR as rt,aT as ot,aU as ct,kJ as ut,kK as ht,kL as j,c1 as G,cq as C}from"./index.bd80e406.js";function lt(t){let{r:e,g:n,b:a,a:s}=t;return s<1&&(e=Math.round(s*e+255*(1-s)),n=Math.round(s*n+255*(1-s)),a=Math.round(s*a+255*(1-s))),new y({r:e,g:n,b:a})}function ft(t){const{r:e,g:n,b:a}=lt(t);return .2126*e+.7152*n+.0722*a}const kt={readOnly:!0,get(){return tt(this.view)}};var T;(function(t){t[t.Auto=0]="Auto",t[t.Euclidean=1]="Euclidean",t[t.Geodesic=2]="Geodesic"})(T||(T={}));function I(t){if(!t)return null;if(nt(t)&&t.wkid){const e=at[t.wkid];if(e)return e}if(t.wkt){const e=Mt(t.wkt);if(e)return e}return null}function Mt(t){const e=st.exec(t);if(!e||e.length!==2)return null;const n=e[1].split(",");if(!n||n.length<3)return null;const a=parseFloat(n[1]),s=parseFloat(n[2]);return isNaN(a)||isNaN(s)?null:{a,f:s===0?0:1/s}}function dt(t){const e=I(t!=null?t:it.WGS84);if(pt(e))return e;const n=e.a*(1-e.f);return Object.assign(e,{b:n,eSq:1-(n/e.a)**2,radius:(2*e.a+n)/3,densificationRatio:1e4/((2*e.a+n)/3)})}function pt(t){return t!=null&&"b"in t&&"eSq"in t&&"radius"in t}function mt(t){return I(t)!==null}function bt(t,e="meters"){if(!t)throw new D("geodesic-lengths:invalid-geometries","the input geometries type is not supported");if(t.some(a=>!mt(a.spatialReference)))throw new D("geodesic-lengths:invalid-spatial-reference","the input geometries spatial reference is not supported");const n=[];for(let a=0;a<t.length;a++){const s=t[a],{spatialReference:m}=s,$=s.type==="polyline"?s.paths:s.rings;let r=0;for(let v=0;v<$.length;v++){const o=$[v];let f=0;for(let M=1;M<o.length;M++){const z=o[M-1][0],R=o[M][0],_=o[M-1][1],u=o[M][1];if(_!==u||z!==R){const c=new gt;$t(c,[z,_],[R,u],m),f+=c.distance}}r+=f}r=et(r,"meters",e),n.push(r)}return n}class gt{constructor(e=0,n,a){this.distance=e,this.azimuth=n,this.reverseAzimuth=a}}function $t(t,e,n,a){const s=e[0]*g,m=e[1]*g,$=n[0]*g,r=n[1]*g,{a:v,b:o,f,radius:M}=dt(a),z=$-s,R=Math.atan((1-f)*Math.tan(m)),_=Math.atan((1-f)*Math.tan(r)),u=Math.sin(R),c=Math.cos(R),w=Math.sin(_),h=Math.cos(_);let F,k,d,i,b,q,A,U,N,P,S=1e3,l=z;do{if(A=Math.sin(l),U=Math.cos(l),d=Math.sqrt(h*A*(h*A)+(c*w-u*h*U)*(c*w-u*h*U)),d===0)return t.distance=0,t.azimuth=void 0,t.reverseAzimuth=void 0,t;b=u*w+c*h*U,q=Math.atan2(d,b),N=c*h*A/d,k=1-N*N,i=b-2*u*w/k,isNaN(i)&&(i=0),P=f/16*k*(4+f*(4-3*k)),F=l,l=z+(1-P)*f*N*(q+P*d*(i+P*b*(2*i*i-1)))}while(Math.abs(l-F)>1e-12&&--S>0);if(S===0){const Q=M,V=Math.acos(Math.sin(m)*Math.sin(r)+Math.cos(m)*Math.cos(r)*Math.cos($-s))*Q,x=$-s,X=Math.sin(x)*Math.cos(r),Y=Math.cos(m)*Math.sin(r)-Math.sin(m)*Math.cos(r)*Math.cos(x),Z=Math.atan2(X,Y);return t.azimuth=Z/g,t.distance=V,t.reverseAzimuth=void 0,t}const p=k*(v*v-o*o)/(o*o),E=p/1024*(256+p*(p*(74-47*p)-128)),L=o*(1+p/16384*(4096+p*(p*(320-175*p)-768)))*(q-E*d*(i+E/4*(b*(2*i*i-1)-E/6*i*(4*d*d-3)*(4*i*i-3)))),W=Math.atan2(h*Math.sin(l),c*w-u*h*Math.cos(l)),B=Math.atan2(c*Math.sin(l),c*w*Math.cos(l)-u*h);return t.azimuth=W/g,t.distance=L,t.reverseAzimuth=B/g,t}function At(t,e){if(rt(e,0,0,0),t.length>0){for(let n=0;n<t.length;++n)ot(e,e,t[n]);ct(e,e,1/t.length)}}function Ut(t,e,n,a){a.projectToRenderScreen(t,O),a.projectToRenderScreen(e,H),ut(n,wt,vt),ht(n,n)}const O=j(),vt=O,H=j(),wt=H;class Nt{constructor(e=null){this.spatialReference=e}get spatialReference(){return this._spatialReference}set spatialReference(e){e!==this._spatialReference&&(this._spatialReference=e,this._updateNormalizationFactors())}normalizeDistance(e){return e*this._metersPerDistanceUnit}normalizeElevation(e){return e*this._metersPerElevationUnit}normalizeArea(e){return e*this._squareMetersPerAreaUnit}_updateNormalizationFactors(){this._metersPerDistanceUnit=G(this._spatialReference,1),this._metersPerElevationUnit=G(this._spatialReference,1),this._squareMetersPerAreaUnit=this._metersPerDistanceUnit*this._metersPerDistanceUnit}}function J(t,e){const n=t.a*e;return ft(t)>225?new y([0,0,0,n]):new y([255,255,255,n])}function K(t,e){const n=new y(t);return n.a*=e,n}function zt(t=1){return K(C.analysisTheme.accentColor,t)}function Pt(t=1){return J(zt(),t)}function Rt(t=1){return K(C.analysisTheme.textColor,t)}function yt(t=1){return J(Rt(),t)}export{mt as M,Rt as a,$t as b,At as c,T as e,Ut as f,zt as i,kt as r,yt as s,Nt as t,Pt as u,gt as v,bt as y};
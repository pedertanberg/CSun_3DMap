import{V as N,y as v,K as A,ah as Z,J as L,P,t as p,e as y,L as z,Y as x,c as _,w as C,E as j,ai as he,F as Fe,r as H,h as Ie,aj as Ee,ak as q,a1 as X,al as Q}from"./arcadeUtils.a209ba2f.js";import{D as G,q as fe,e as ce,v as De,G as ue,d as be,c as de,a as Ne,b as Ae,f as xe,F as $,k as ve,N as Se,C as Le,x as k,E as Te,W as B,A as T,g as ee}from"./featureSetUtils.5333b58d.js";import{u as Pe,w as me}from"./SpatialFilter.85aeab3f.js";import{ho as Re,e1 as ne,hM as W}from"./index.bd80e406.js";import{WhereClause as E}from"./WhereClause.1de2b7ed.js";import"./number.1d52302c.js";import"./hash.e6424875.js";import"./executeForIds.4bbba337.js";import"./geometryEngineAsync.b7201272.js";function Oe(s,n,r,m){if(m.length===1){if(x(m[0]))return Q(s,m[0],-1);if(j(m[0]))return Q(s,m[0].toArray(),-1)}return Q(s,m,-1)}async function te(s,n,r){const m=s.getVariables();if(m.length>0){const h=[];for(let i=0;i<m.length;i++){const a={name:m[i]};h.push(await n.evaluateIdentifier(r,a))}const e={};for(let i=0;i<m.length;i++)e[m[i]]=h[i];return s.parameters=e,s}return s}function u(s,n,r=null){for(const m in s)if(m.toLowerCase()===n.toLowerCase())return s[m];return r}function pe(s){if(s===null)return null;const n={type:u(s,"type",""),name:u(s,"name","")};if(n.type==="range")n.range=u(s,"range",[]);else{n.codedValues=[];for(const r of u(s,"codedValues",[]))n.codedValues.push({name:u(r,"name",""),code:u(r,"code",null)})}return n}function ie(s){if(s===null)return null;const n={},r=u(s,"wkt",null);r!==null&&(n.wkt=r);const m=u(s,"wkid",null);return m!==null&&(n.wkid=m),n}function ye(s){if(s===null)return null;const n={hasZ:u(s,"hasz",!1),hasM:u(s,"hasm",!1)},r=u(s,"spatialreference",null);r&&(n.spatialReference=ie(r));const m=u(s,"x",null);if(m!==null)return n.x=m,n.y=u(s,"y",null),n;const h=u(s,"rings",null);if(h!==null)return n.rings=h,n;const e=u(s,"paths",null);if(e!==null)return n.paths=e,n;const i=u(s,"points",null);if(i!==null)return n.points=i,n;for(const a of["xmin","xmax","ymin","ymax","zmin","zmax","mmin","mmax"]){const f=u(s,a,null);f!==null&&(n[a]=f)}return n}function Ce(s,n){for(const r of n)if(r===s)return!0;return!1}function Me(s){return!!s.layerDefinition&&!!s.featureSet&&Ce(s.layerDefinition.geometryType,["","esriGeometryPoint","esriGeometryPolyline","esriGeometryPolygon","esriGeometryMultipoint","esriGeometryEnvelope"])!==!1&&s.layerDefinition.objectIdField!==null&&s.layerDefinition.objectIdField!==""&&x(s.layerDefinition.fields)!==!1&&x(s.featureSet.features)!==!1}function Be(s){s.mode==="async"&&(s.functions.getuser=function(n,r){return s.standardFunctionAsync(n,r,async(m,h,e)=>{N(e,0,2,n,r);let i=v(e[1],""),a=i===!0;if(i=i===!0||i===!1?"":A(i),e.length===0||e[0]instanceof Z){let d=null;n.services&&n.services.portal&&(d=n.services.portal),e.length>0&&(d=G(e[0],d));const o=await fe(d,i,a);if(o){const t=JSON.parse(JSON.stringify(o));for(const l of["lastLogin","created","modified"])t[l]!==void 0&&t[l]!==null&&(t[l]=new Date(t[l]));return L.convertObjectToArcadeDictionary(t)}return null}let f=null;if(P(e[0])&&(f=e[0]),f){if(a=!1,i)return null;await f.load();const d=await f.getOwningSystemUrl();if(!d){if(!i){const l=await f.getIdentityUser();return l?L.convertObjectToArcadeDictionary({username:l}):null}return null}let o=null;n.services&&n.services.portal&&(o=n.services.portal),o=G(new Z(d),o);const t=await fe(o,i,a);if(t){const l=JSON.parse(JSON.stringify(t));for(const c of["lastLogin","created","modified"])l[c]!==void 0&&l[c]!==null&&(l[c]=new Date(l[c]));return L.convertObjectToArcadeDictionary(l)}return null}throw new p(n,y.InvalidParameter,r)})},s.signatures.push({name:"getuser",min:1,max:2}),s.functions.featuresetbyid=function(n,r){return s.standardFunctionAsync(n,r,(m,h,e)=>{if(N(e,2,4,n,r),e[0]instanceof ce){const i=A(e[1]);let a=v(e[2],null);const f=z(v(e[3],!0));if(a===null&&(a=["*"]),x(a)===!1)throw new p(n,y.InvalidParameter,r);return e[0].featureSetById(i,f,a)}throw new p(n,y.InvalidParameter,r)})},s.signatures.push({name:"featuresetbyid",min:2,max:4}),s.functions.getfeatureset=function(n,r){return s.standardFunctionAsync(n,r,(m,h,e)=>{if(N(e,1,2,n,r),_(e[0])){let i=v(e[1],"datasource");return i===null&&(i="datasource"),i=A(i).toLowerCase(),De(e[0].fullSchema(),i,n.lrucache,n.interceptor,n.spatialReference)}throw new p(n,y.InvalidParameter,r)})},s.signatures.push({name:"getfeatureset",min:1,max:2}),s.functions.featuresetbyportalitem=function(n,r){return s.standardFunctionAsync(n,r,(m,h,e)=>{if(N(e,2,5,n,r),e[0]===null)throw new p(n,y.PortalRequired,r);if(e[0]instanceof Z){const o=A(e[1]),t=A(e[2]);let l=v(e[3],null);const c=z(v(e[4],!0));if(l===null&&(l=["*"]),x(l)===!1)throw new p(n,y.InvalidParameter,r);let F=null;return n.services&&n.services.portal&&(F=n.services.portal),F=G(e[0],F),ue(o,t,n.spatialReference,l,c,F,n.lrucache,n.interceptor)}if(C(e[0])===!1)throw new p(n,y.PortalRequired,r);const i=A(e[0]),a=A(e[1]);let f=v(e[2],null);const d=z(v(e[3],!0));if(f===null&&(f=["*"]),x(f)===!1)throw new p(n,y.InvalidParameter,r);if(n.services&&n.services.portal)return ue(i,a,n.spatialReference,f,d,n.services.portal,n.lrucache,n.interceptor);throw new p(n,y.PortalRequired,r)})},s.signatures.push({name:"featuresetbyportalitem",min:2,max:5}),s.functions.featuresetbyname=function(n,r){return s.standardFunctionAsync(n,r,(m,h,e)=>{if(N(e,2,4,n,r),e[0]instanceof ce){const i=A(e[1]);let a=v(e[2],null);const f=z(v(e[3],!0));if(a===null&&(a=["*"]),x(a)===!1)throw new p(n,y.InvalidParameter,r);return e[0].featureSetByName(i,f,a)}throw new p(n,y.InvalidParameter,r)})},s.signatures.push({name:"featuresetbyname",min:2,max:4}),s.functions.featureset=function(n,r){return s.standardFunction(n,r,(m,h,e)=>{N(e,1,1,n,r);let i=e[0];const a={layerDefinition:{geometryType:"",objectIdField:"",globalIdField:"",typeIdField:"",fields:[]},featureSet:{geometryType:"",features:[]}};if(C(i))i=JSON.parse(i),i.layerDefinition!==void 0?(a.layerDefinition=i.layerDefinition,a.featureSet=i.featureSet,i.layerDefinition.spatialReference&&(a.layerDefinition.spatialReference=i.layerDefinition.spatialReference)):(a.featureSet.features=i.features,a.featureSet.geometryType=i.geometryType,a.layerDefinition.geometryType=a.featureSet.geometryType,a.layerDefinition.objectIdField=i.objectIdFieldName,a.layerDefinition.typeIdField=i.typeIdFieldName,a.layerDefinition.globalIdField=i.globalIdFieldName,a.layerDefinition.fields=i.fields,i.spatialReference&&(a.layerDefinition.spatialReference=i.spatialReference));else{if(!(e[0]instanceof L))throw new p(n,y.InvalidParameter,r);{i=JSON.parse(e[0].castToText(!0));const f=u(i,"layerdefinition");if(f!==null){a.layerDefinition.geometryType=u(f,"geometrytype",""),a.featureSet.geometryType=a.layerDefinition.geometryType,a.layerDefinition.globalIdField=u(f,"globalidfield",""),a.layerDefinition.objectIdField=u(f,"objectidfield",""),a.layerDefinition.typeIdField=u(f,"typeidfield","");const d=u(f,"spatialreference",null);d&&(a.layerDefinition.spatialReference=ie(d));for(const t of u(f,"fields",[])){const l={name:u(t,"name",""),alias:u(t,"alias",""),type:u(t,"type",""),nullable:u(t,"nullable",!0),editable:u(t,"editable",!0),length:u(t,"length",null),domain:pe(u(t,"domain"))};a.layerDefinition.fields.push(l)}const o=u(i,"featureset",null);if(o){const t={};for(const l of a.layerDefinition.fields)t[l.name.toLowerCase()]=l.name;for(const l of u(o,"features",[])){const c={},F=u(l,"attributes",{});for(const b in F)c[t[b.toLowerCase()]]=F[b];a.featureSet.features.push({attributes:c,geometry:ye(u(l,"geometry",null))})}}}else{a.layerDefinition.geometryType=u(i,"geometrytype",""),a.featureSet.geometryType=a.layerDefinition.geometryType,a.layerDefinition.objectIdField=u(i,"objectidfieldname",""),a.layerDefinition.typeIdField=u(i,"typeidfieldname","");const d=u(i,"spatialreference",null);d&&(a.layerDefinition.spatialReference=ie(d));for(const t of u(i,"fields",[])){const l={name:u(t,"name",""),alias:u(t,"alias",""),type:u(t,"type",""),nullable:u(t,"nullable",!0),editable:u(t,"editable",!0),length:u(t,"length",null),domain:pe(u(t,"domain"))};a.layerDefinition.fields.push(l)}const o={};for(const t of a.layerDefinition.fields)o[t.name.toLowerCase()]=t.name;for(const t of u(i,"features",[])){const l={},c=u(t,"attributes",{});for(const F in c)l[o[F.toLowerCase()]]=c[F];a.featureSet.features.push({attributes:l,geometry:ye(u(t,"geometry",null))})}}}}if(Me(a)===!1)throw new p(n,y.InvalidParameter,r);return be.create(a,n.spatialReference)})},s.signatures.push({name:"featureset",min:1,max:1}),s.functions.filter=function(n,r){return s.standardFunctionAsync(n,r,async(m,h,e)=>{if(N(e,2,2,n,r),x(e[0])||j(e[0])){const i=[];let a=e[0];a instanceof he&&(a=a.toArray());let f=null;if(!Fe(e[1]))throw new p(n,y.InvalidParameter,r);f=e[1].createFunction(n);for(const d of a){const o=f(d);Re(o)?await o===!0&&i.push(d):o===!0&&i.push(d)}return i}if(P(e[0])){const i=await e[0].load(),a=E.create(e[1],i.getFieldsIndex()),f=a.getVariables();if(f.length>0){const d=[];for(let t=0;t<f.length;t++){const l={name:f[t]};d.push(await s.evaluateIdentifier(n,l))}const o={};for(let t=0;t<f.length;t++)o[f[t]]=d[t];return a.parameters=o,new de({parentfeatureset:e[0],whereclause:a})}return new de({parentfeatureset:e[0],whereclause:a})}throw new p(n,y.InvalidParameter,r)})},s.signatures.push({name:"filter",min:2,max:2}),s.functions.orderby=function(n,r){return s.standardFunctionAsync(n,r,async(m,h,e)=>{if(N(e,2,2,n,r),P(e[0])){const i=new Ne(e[1]);return new Ae({parentfeatureset:e[0],orderbyclause:i})}throw new p(n,y.InvalidParameter,r)})},s.signatures.push({name:"orderby",min:2,max:2}),s.functions.top=function(n,r){return s.standardFunctionAsync(n,r,async(m,h,e)=>{if(N(e,2,2,n,r),P(e[0]))return new xe({parentfeatureset:e[0],topnum:e[1]});if(x(e[0]))return H(e[1])>=e[0].length?e[0].slice(0):e[0].slice(0,H(e[1]));if(j(e[0]))return H(e[1])>=e[0].length()?e[0].slice(0):e[0].slice(0,H(e[1]));throw new p(n,y.InvalidParameter,r)})},s.signatures.push({name:"top",min:2,max:2}),s.functions.first=function(n,r){return s.standardFunctionAsync(n,r,async(m,h,e)=>{if(N(e,1,1,n,r),P(e[0])){const i=await e[0].first(m.abortSignal);if(i!==null){const a=Ie.createFromGraphicLikeObject(i.geometry,i.attributes,e[0]);return a._underlyingGraphic=i,a}return i}return x(e[0])?e[0].length===0?null:e[0][0]:j(e[0])?e[0].length()===0?null:e[0].get(0):null})},s.signatures.push({name:"first",min:1,max:1}),s.functions.attachments=function(n,r){return s.standardFunctionAsync(n,r,async(m,h,e)=>{N(e,1,2,n,r);const i={minsize:-1,maxsize:-1,types:null,returnMetadata:!1};if(e.length>1){if(e[1]instanceof L){if(e[1].hasField("minsize")&&(i.minsize=H(e[1].field("minsize"))),e[1].hasField("metadata")&&(i.returnMetadata=z(e[1].field("metadata"))),e[1].hasField("maxsize")&&(i.maxsize=H(e[1].field("maxsize"))),e[1].hasField("types")){const a=Ee(e[1].field("types"),!1);a.length>0&&(i.types=a)}}else if(e[1]!==null)throw new p(n,y.InvalidParameter,r)}if(_(e[0])){let a=e[0]._layer;return a instanceof ne&&(a=$(a,n.spatialReference,["*"],!0,n.lrucache,n.interceptor)),a===null?[]:P(a)===!1?[]:(await a.load(),a.queryAttachments(e[0].field(a.objectIdField),i.minsize,i.maxsize,i.types,i.returnMetadata))}if(e[0]===null)return[];throw new p(n,y.InvalidParameter,r)})},s.signatures.push({name:"attachments",min:1,max:2}),s.functions.featuresetbyrelationshipname=function(n,r){return s.standardFunctionAsync(n,r,async(m,h,e)=>{N(e,2,4,n,r);const i=e[0],a=A(e[1]);let f=v(e[2],null);const d=z(v(e[3],!0));if(f===null&&(f=["*"]),x(f)===!1)throw new p(n,y.InvalidParameter,r);if(e[0]===null)return null;if(!_(e[0]))throw new p(n,y.InvalidParameter,r);let o=i._layer;if(o instanceof ne&&(o=$(o,n.spatialReference,["*"],!0,n.lrucache,n.interceptor)),o===null||P(o)===!1)return null;o=await o.load();const t=o.relationshipMetaData().filter(I=>I.name===a);if(t.length===0)return null;if(t[0].relationshipTableId!==void 0&&t[0].relationshipTableId!==null&&t[0].relationshipTableId>-1)return ve(o,t[0],i.field(o.objectIdField),o.spatialReference,f,d,n.lrucache,n.interceptor);let l=o.serviceUrl();if(!l)return null;l=l.charAt(l.length-1)==="/"?l+t[0].relatedTableId.toString():l+"/"+t[0].relatedTableId.toString();const c=await Se(l,o.spatialReference,f,d,n.lrucache,n.interceptor);await c.load();let F=c.relationshipMetaData();if(F=F.filter(I=>I.id===t[0].id),i.hasField(t[0].keyField)===!1||i.field(t[0].keyField)===null){const I=await o.getFeatureByObjectId(i.field(o.objectIdField),[t[0].keyField]);if(I){const D=E.create(F[0].keyField+"= @id",c.getFieldsIndex());return D.parameters={id:I.attributes[t[0].keyField]},c.filter(D)}return new Pe({parentfeatureset:c})}const b=E.create(F[0].keyField+"= @id",c.getFieldsIndex());return b.parameters={id:i.field(t[0].keyField)},c.filter(b)})},s.signatures.push({name:"featuresetbyrelationshipname",min:2,max:4}),s.functions.featuresetbyassociation=function(n,r){return s.standardFunctionAsync(n,r,async(m,h,e)=>{N(e,2,3,n,r);const i=e[0],a=A(v(e[1],"")).toLowerCase(),f=C(e[2])?A(e[2]):null;if(e[0]===null)return null;if(!_(e[0]))throw new p(n,y.InvalidParameter,r);let d=i._layer;if(d instanceof ne&&(d=$(d,n.spatialReference,["*"],!0,n.lrucache,n.interceptor)),d===null||P(d)===!1)return null;await d.load();const o=d.serviceUrl(),t=await Le(o,n.spatialReference);let l=null,c=null,F=!1;if(f!==null&&f!==""&&f!==void 0){for(const w of t.terminals)w.terminalName===f&&(c=w.terminalId);c===null&&(F=!0)}const b=t.associations.getFieldsIndex(),I=b.get("TOGLOBALID").name,D=b.get("FROMGLOBALID").name,U=b.get("TOTERMINALID").name,K=b.get("FROMTERMINALID").name,J=b.get("FROMNETWORKSOURCEID").name,V=b.get("TONETWORKSOURCEID").name,M=b.get("ASSOCIATIONTYPE").name,ge=b.get("ISCONTENTVISIBLE").name,we=b.get("OBJECTID").name;for(const w of d.fields)if(w.type==="global-id"){l=i.field(w.name);break}let R=null,ae=new k(new W({name:"percentalong",alias:"percentalong",type:"double"}),E.create("0",t.associations.getFieldsIndex())),re=new k(new W({name:"side",alias:"side",type:"string"}),E.create("''",t.associations.getFieldsIndex()));const S="globalid",se="globalId",le={};for(const w in t.lkp)le[w]=t.lkp[w].sourceId;const O=new Te(new W({name:"classname",alias:"classname",type:"string"}),null,le);let g="";switch(a){case"midspan":{g=`((${I}='${l}') OR ( ${D}='${l}')) AND (${M} IN (5))`,O.codefield=E.create(`CASE WHEN (${I}='${l}') THEN ${J} ELSE ${V} END`,t.associations.getFieldsIndex());const w=X(T.findField(t.associations.fields,D));w.name=S,w.alias=S,R=new k(w,E.create(`CASE WHEN (${D}='${l}') THEN ${I} ELSE ${D} END`,t.associations.getFieldsIndex())),ae=t.unVersion>=4?new ee(T.findField(t.associations.fields,b.get("PERCENTALONG").name)):new k(new W({name:"percentalong",alias:"percentalong",type:"double"}),E.create("0",t.associations.getFieldsIndex()));break}case"junctionedge":{g=`((${I}='${l}') OR ( ${D}='${l}')) AND (${M} IN (4,6))`,O.codefield=E.create(`CASE WHEN (${I}='${l}') THEN ${J} ELSE ${V} END`,t.associations.getFieldsIndex());const w=X(T.findField(t.associations.fields,D));w.name=S,w.alias=S,R=new k(w,E.create(`CASE WHEN (${D}='${l}') THEN ${I} ELSE ${D} END`,t.associations.getFieldsIndex())),re=new k(new W({name:"side",alias:"side",type:"string"}),E.create(`CASE WHEN (${M}=4) THEN 'from' ELSE 'to' END`,t.associations.getFieldsIndex()));break}case"connected":{let w=`${I}='@T'`,oe=`${D}='@T'`;c!==null&&(w+=` AND ${U}=@A`,oe+=` AND ${K}=@A`),g="(("+w+") OR ("+oe+"))",g=q(g,"@T",l!=null?l:""),w=q(w,"@T",l!=null?l:""),c!==null&&(w=q(w,"@A",c.toString()),g=q(g,"@A",c.toString())),O.codefield=E.create("CASE WHEN "+w+` THEN ${J} ELSE ${V} END`,t.associations.getFieldsIndex());const Y=X(T.findField(t.associations.fields,D));Y.name=S,Y.alias=S,R=new k(Y,E.create("CASE WHEN "+w+` THEN ${D} ELSE ${I} END`,t.associations.getFieldsIndex()));break}case"container":g=`${I}='${l}' AND ${M} = 2`,c!==null&&(g+=` AND ${U} = `+c.toString()),O.codefield=J,g="( "+g+" )",R=new B(T.findField(t.associations.fields,D),S,S);case"content":g=`(${D}='${l}' AND ${M} = 2)`,c!==null&&(g+=` AND ${K} = `+c.toString()),O.codefield=V,g="( "+g+" )",R=new B(T.findField(t.associations.fields,I),S,S);break;case"structure":g=`(${I}='${l}' AND ${M} = 3)`,c!==null&&(g+=` AND ${U} = `+c.toString()),O.codefield=J,g="( "+g+" )",R=new B(T.findField(t.associations.fields,D),S,se);break;case"attached":g=`(${D}='${l}' AND ${M} = 3)`,c!==null&&(g+=` AND ${K} = `+c.toString()),O.codefield=V,g="( "+g+" )",R=new B(T.findField(t.associations.fields,I),S,se);break;default:throw new p(n,y.InvalidParameter,r)}return F&&(g="1 <> 1"),new T({parentfeatureset:t.associations,adaptedFields:[new ee(T.findField(t.associations.fields,we)),new ee(T.findField(t.associations.fields,ge)),R,re,O,ae],extraFilter:g?E.create(g,t.associations.getFieldsIndex()):null})})},s.signatures.push({name:"featuresetbyassociation",min:2,max:6}),s.functions.groupby=function(n,r){return s.standardFunctionAsync(n,r,async(m,h,e)=>{if(N(e,3,3,n,r),!P(e[0]))throw new p(n,y.InvalidParameter,r);const i=await e[0].load(),a=[],f=[];let d=!1,o=[];if(C(e[1]))o.push(e[1]);else if(e[1]instanceof L)o.push(e[1]);else if(x(e[1]))o=e[1];else{if(!j(e[1]))throw new p(n,y.InvalidParameter,r);o=e[1].toArray()}for(const t of o)if(C(t)){const l=E.create(A(t),i.getFieldsIndex()),c=me(l)===!0?A(t):"%%%%FIELDNAME";a.push({name:c,expression:l}),c==="%%%%FIELDNAME"&&(d=!0)}else{if(!(t instanceof L))throw new p(n,y.InvalidParameter,r);{const l=t.hasField("name")?t.field("name"):"%%%%FIELDNAME",c=t.hasField("expression")?t.field("expression"):"";if(l==="%%%%FIELDNAME"&&(d=!0),!l)throw new p(n,y.InvalidParameter,r);a.push({name:l,expression:E.create(c||l,i.getFieldsIndex())})}}if(o=[],C(e[2]))o.push(e[2]);else if(x(e[2]))o=e[2];else if(j(e[2]))o=e[2].toArray();else{if(!(e[2]instanceof L))throw new p(n,y.InvalidParameter,r);o.push(e[2])}for(const t of o){if(!(t instanceof L))throw new p(n,y.InvalidParameter,r);{const l=t.hasField("name")?t.field("name"):"",c=t.hasField("statistic")?t.field("statistic"):"",F=t.hasField("expression")?t.field("expression"):"";if(!l||!c||!F)throw new p(n,y.InvalidParameter,r);f.push({name:l,statistic:c.toLowerCase(),expression:E.create(F,i.getFieldsIndex())})}}if(d){const t={};for(const c of i.fields)t[c.name.toLowerCase()]=1;for(const c of a)c.name!=="%%%%FIELDNAME"&&(t[c.name.toLowerCase()]=1);for(const c of f)c.name!=="%%%%FIELDNAME"&&(t[c.name.toLowerCase()]=1);let l=0;for(const c of a)if(c.name==="%%%%FIELDNAME"){for(;t["field_"+l.toString()]===1;)l++;t["field_"+l.toString()]=1,c.name="FIELD_"+l.toString()}}for(const t of a)await te(t.expression,s,n);for(const t of f)await te(t.expression,s,n);return e[0].groupby(a,f)})},s.signatures.push({name:"groupby",min:3,max:3}),s.functions.distinct=function(n,r){return s.standardFunctionAsync(n,r,async(m,h,e)=>{if(P(e[0])){N(e,2,2,n,r);const i=await e[0].load(),a=[];let f=[];if(C(e[1]))f.push(e[1]);else if(e[1]instanceof L)f.push(e[1]);else if(x(e[1]))f=e[1];else{if(!j(e[1]))throw new p(n,y.InvalidParameter,r);f=e[1].toArray()}let d=!1;for(const o of f)if(C(o)){const t=E.create(A(o),i.getFieldsIndex()),l=me(t)===!0?A(o):"%%%%FIELDNAME";a.push({name:l,expression:t}),l==="%%%%FIELDNAME"&&(d=!0)}else{if(!(o instanceof L))throw new p(n,y.InvalidParameter,r);{const t=o.hasField("name")?o.field("name"):"%%%%FIELDNAME",l=o.hasField("expression")?o.field("expression"):"";if(t==="%%%%FIELDNAME"&&(d=!0),!t)throw new p(n,y.InvalidParameter,r);a.push({name:t,expression:E.create(l||t,i.getFieldsIndex())})}}if(d){const o={};for(const l of i.fields)o[l.name.toLowerCase()]=1;for(const l of a)l.name!=="%%%%FIELDNAME"&&(o[l.name.toLowerCase()]=1);let t=0;for(const l of a)if(l.name==="%%%%FIELDNAME"){for(;o["field_"+t.toString()]===1;)t++;o["field_"+t.toString()]=1,l.name="FIELD_"+t.toString()}}for(const o of a)await te(o.expression,s,n);return e[0].groupby(a,[])}return Oe("distinct",m,h,e)})})}export{Be as registerFunctions};
import{a7 as o,t as r,a6 as i}from"./index.d2d38865.js";import{e as s}from"./centroid.d50027e7.js";const b={getObjectId:t=>t.objectId,getAttributes:t=>t.attributes,getAttribute:(t,e)=>t.attributes[e],cloneWithGeometry:(t,e)=>new o(e,t.attributes,null,t.objectId),getGeometry:t=>t.geometry,getCentroid:(t,e)=>(r(t.centroid)&&(t.centroid=s(new i,t.geometry,e.hasZ,e.hasM)),t.centroid)};export{b as i};
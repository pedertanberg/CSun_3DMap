import{at as f,r as o,c1 as c}from"./index.bd80e406.js";function R(n,s,e,a=new f){let i;if(e.type==="2d")i=s*e.resolution;else if(e.type==="3d"){const y=e.overlayPixelSizeInMapUnits(n),t=e.basemapSpatialReference;i=o(t)&&!t.equals(e.spatialReference)?c(t)/c(e.spatialReference):s*y}const r=n.x-i,l=n.y-i,m=n.x+i,p=n.y+i,{spatialReference:x}=e;return a.xmin=Math.min(r,m),a.ymin=Math.min(l,p),a.xmax=Math.max(r,m),a.ymax=Math.max(l,p),a.spatialReference=x,a}new f;export{R as a};
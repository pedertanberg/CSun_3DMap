import{G as i,h as a,r as t,i as n,gj as l,e as o,k as p}from"./index.bd80e406.js";import{b as m}from"./TileTreeDebugger.3f4f1391.js";let s=class extends m{constructor(e){super(e),this.enablePolygons=!1}initialize(){i(()=>this.enabled,e=>this.view.basemapTerrain.renderPatchBorders=e,a)}getTiles(){const e=t(this.view.basemapTerrain.spatialReference)?this.view.basemapTerrain.spatialReference:null;return this.view.basemapTerrain.test.getRenderedTiles().map(r=>({...r,geometry:n.fromExtent(l(r.extent,e))}))}};s=o([p("esri.views.3d.layers.support.TerrainTileTree3DDebugger")],s);export{s as TerrainTileTree3DDebugger};
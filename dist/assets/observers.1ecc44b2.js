import{bL as o}from"./index.bd80e406.js";/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */function b(r,n,i){if(!o.isBrowser)return;const e=u(r);return new e(n,i)}function u(r){class n extends window.MutationObserver{constructor(e){super(e),this.observedEntry=[],this.callback=e}observe(e,t){return this.observedEntry.push({target:e,options:t}),super.observe(e,t)}unobserve(e){const t=this.observedEntry.filter(s=>s.target!==e);this.observedEntry=[],this.callback(super.takeRecords(),this),this.disconnect(),t.forEach(s=>this.observe(s.target,s.options))}}return function(){return r==="intersection"?window.IntersectionObserver:r==="mutation"?n:window.ResizeObserver}()}export{b as c};

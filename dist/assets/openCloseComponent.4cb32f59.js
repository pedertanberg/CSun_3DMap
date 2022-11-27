/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */const s=new WeakMap;function r(t){t.propertyName===this.openTransitionProp&&t.target===this.transitionEl&&(this.open?this.onBeforeOpen():this.onBeforeClose())}function o(t){t.propertyName===this.openTransitionProp&&t.target===this.transitionEl&&(this.open?this.onOpen():this.onClose())}function d(t){if(a(t),t.transitionEl){const n=r.bind(t),i=o.bind(t);s.set(t,[t.transitionEl,n,i]),t.transitionEl.addEventListener("transitionstart",n),t.transitionEl.addEventListener("transitionend",i)}}function a(t){if(!s.has(t))return;const[n,i,e]=s.get(t);n.removeEventListener("transitionstart",i),n.removeEventListener("transitionend",e),s.delete(t)}export{d as c,a as d};

/**
 * Copyright (c) 2014-2024 The xterm.js authors. All rights reserved.
 * @license MIT
 *
 * Copyright (c) 2012-2013, Christopher Jeffrey (MIT License)
 * @license MIT
 *
 * Originally forked from (with the author's permission):
 *   Fabrice Bellard's javascript vt100 for jslinux:
 *   http://bellard.org/jslinux/
 *   Copyright (c) 2011 Fabrice Bellard
 */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
function s(t){return t[0]==='"'&&t[t.length-1]==='"'||t[0]==="'"&&t[t.length-1]==="'"?t.slice(1,-1):t}function u(t){let n=t.match(/([-_a-zA-Z0-9\xA0-\u{10FFFF}]+)/u);return!t.match(/^(-?\d|--)/m)&&n&&n[1]===t?t:`"${t.replace(/"/g,'\\"')}"`}function f(t){return t?t.split(",").map(n=>s(n.trim())):[]}function d(t){return t.map(u).join(", ")}function m(t){return JSON.stringify([s(t.family),t.stretch,t.style,t.unicodeRange,t.weight])}function l(t){let n=Array.from(document.fonts);if(!t||!t.length)return Promise.all(n.map(e=>e.load()));let r=[],a=n.map(e=>m(e));for(let e of t)if(e instanceof FontFace){let i=m(e),o=a.indexOf(i);o===-1?(document.fonts.add(e),n.push(e),a.push(i),r.push(e)):r.push(n[o])}else{let i=n.filter(o=>e===s(o.family));if(r=r.concat(i),!i.length)return Promise.reject(`font family "${e}" not registered in document.fonts`)}return Promise.all(r.map(e=>e.load()))}function F(t){return document.fonts.ready.then(()=>l(t))}var c=class{constructor(n=!0){this.initialRelayout=n}dispose(){this._term=void 0}activate(n){this._term=n,this.initialRelayout&&document.fonts.ready.then(()=>this.relayout())}loadFonts(n){return F(n)}async relayout(){if(!this._term)return;await document.fonts.ready;let n=this._term.options.fontFamily,r=f(n),a=Array.from(new Set(Array.from(document.fonts).map(o=>s(o.family)))),e=[],i=[];for(let o of r)(a.indexOf(o)!==-1?e:i).push(o);e.length&&(await l(e),this._term&&(this._term.options.fontFamily=i.length?d(i):"monospace",this._term.options.fontFamily=n))}};export{c as WebFontsAddon,F as loadFonts};
//# sourceMappingURL=addon-web-fonts.mjs.map

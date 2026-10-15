var Qy=Object.create;var Gl=Object.defineProperty;var Zy=Object.getOwnPropertyDescriptor;var eb=Object.getOwnPropertyNames;var tb=Object.getPrototypeOf,rb=Object.prototype.hasOwnProperty;var Gp=(t,e)=>()=>{try{return e||t((e={exports:{}}).exports,e),e.exports}catch(r){throw e=0,r}},Gt=(t,e)=>{for(var r in e)Gl(t,r,{get:e[r],enumerable:!0})},nb=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of eb(e))!rb.call(t,o)&&o!==r&&Gl(t,o,{get:()=>e[o],enumerable:!(n=Zy(e,o))||n.enumerable});return t};var Fa=(t,e,r)=>(r=t!=null?Qy(tb(t)):{},nb(e||!t||!t.__esModule?Gl(r,"default",{value:t,enumerable:!0}):r,t));var Ql=Gp(ri=>{"use strict";var Kb="[object ArrayBuffer]",Br=class t{static isArrayBuffer(e){return Object.prototype.toString.call(e)===Kb}static toArrayBuffer(e){return this.isArrayBuffer(e)?e:e.byteLength===e.buffer.byteLength||e.byteOffset===0&&e.byteLength===e.buffer.byteLength?e.buffer:this.toUint8Array(e.buffer).slice(e.byteOffset,e.byteOffset+e.byteLength).buffer}static toUint8Array(e){return this.toView(e,Uint8Array)}static toView(e,r){if(e.constructor===r)return e;if(this.isArrayBuffer(e))return new r(e);if(this.isArrayBufferView(e))return new r(e.buffer,e.byteOffset,e.byteLength);throw new TypeError("The provided value is not of type '(ArrayBuffer or ArrayBufferView)'")}static isBufferSource(e){return this.isArrayBufferView(e)||this.isArrayBuffer(e)}static isArrayBufferView(e){return ArrayBuffer.isView(e)||e&&this.isArrayBuffer(e.buffer)}static isEqual(e,r){let n=t.toUint8Array(e),o=t.toUint8Array(r);if(n.length!==o.byteLength)return!1;for(let i=0;i<n.length;i++)if(n[i]!==o[i])return!1;return!0}static concat(...e){let r;Array.isArray(e[0])&&!(e[1]instanceof Function)||Array.isArray(e[0])&&e[1]instanceof Function?r=e[0]:e[e.length-1]instanceof Function?r=e.slice(0,e.length-1):r=e;let n=0;for(let a of r)n+=a.byteLength;let o=new Uint8Array(n),i=0;for(let a of r){let c=this.toUint8Array(a);o.set(c,i),i+=c.length}return e[e.length-1]instanceof Function?this.toView(o,e[e.length-1]):o.buffer}},Jl="string",Wb=/^[0-9a-f\s]+$/i,Fb=/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/,zb=/^[a-zA-Z0-9-_]+$/,ec=class{static fromString(e){let r=unescape(encodeURIComponent(e)),n=new Uint8Array(r.length);for(let o=0;o<r.length;o++)n[o]=r.charCodeAt(o);return n.buffer}static toString(e){let r=Br.toUint8Array(e),n="";for(let i=0;i<r.length;i++)n+=String.fromCharCode(r[i]);return decodeURIComponent(escape(n))}},St=class{static toString(e,r=!1){let n=Br.toArrayBuffer(e),o=new DataView(n),i="";for(let a=0;a<n.byteLength;a+=2){let c=o.getUint16(a,r);i+=String.fromCharCode(c)}return i}static fromString(e,r=!1){let n=new ArrayBuffer(e.length*2),o=new DataView(n);for(let i=0;i<e.length;i++)o.setUint16(i*2,e.charCodeAt(i),r);return n}},tc=class t{static isHex(e){return typeof e===Jl&&Wb.test(e)}static isBase64(e){return typeof e===Jl&&Fb.test(e)}static isBase64Url(e){return typeof e===Jl&&zb.test(e)}static ToString(e,r="utf8"){let n=Br.toUint8Array(e);switch(r.toLowerCase()){case"utf8":return this.ToUtf8String(n);case"binary":return this.ToBinary(n);case"hex":return this.ToHex(n);case"base64":return this.ToBase64(n);case"base64url":return this.ToBase64Url(n);case"utf16le":return St.toString(n,!0);case"utf16":case"utf16be":return St.toString(n);default:throw new Error(`Unknown type of encoding '${r}'`)}}static FromString(e,r="utf8"){if(!e)return new ArrayBuffer(0);switch(r.toLowerCase()){case"utf8":return this.FromUtf8String(e);case"binary":return this.FromBinary(e);case"hex":return this.FromHex(e);case"base64":return this.FromBase64(e);case"base64url":return this.FromBase64Url(e);case"utf16le":return St.fromString(e,!0);case"utf16":case"utf16be":return St.fromString(e);default:throw new Error(`Unknown type of encoding '${r}'`)}}static ToBase64(e){let r=Br.toUint8Array(e);if(typeof btoa<"u"){let n=this.ToString(r,"binary");return btoa(n)}else return Buffer.from(r).toString("base64")}static FromBase64(e){let r=this.formatString(e);if(!r)return new ArrayBuffer(0);if(!t.isBase64(r))throw new TypeError("Argument 'base64Text' is not Base64 encoded");return typeof atob<"u"?this.FromBinary(atob(r)):new Uint8Array(Buffer.from(r,"base64")).buffer}static FromBase64Url(e){let r=this.formatString(e);if(!r)return new ArrayBuffer(0);if(!t.isBase64Url(r))throw new TypeError("Argument 'base64url' is not Base64Url encoded");return this.FromBase64(this.Base64Padding(r.replace(/\-/g,"+").replace(/\_/g,"/")))}static ToBase64Url(e){return this.ToBase64(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/\=/g,"")}static FromUtf8String(e,r=t.DEFAULT_UTF8_ENCODING){switch(r){case"ascii":return this.FromBinary(e);case"utf8":return ec.fromString(e);case"utf16":case"utf16be":return St.fromString(e);case"utf16le":case"usc2":return St.fromString(e,!0);default:throw new Error(`Unknown type of encoding '${r}'`)}}static ToUtf8String(e,r=t.DEFAULT_UTF8_ENCODING){switch(r){case"ascii":return this.ToBinary(e);case"utf8":return ec.toString(e);case"utf16":case"utf16be":return St.toString(e);case"utf16le":case"usc2":return St.toString(e,!0);default:throw new Error(`Unknown type of encoding '${r}'`)}}static FromBinary(e){let r=e.length,n=new Uint8Array(r);for(let o=0;o<r;o++)n[o]=e.charCodeAt(o);return n.buffer}static ToBinary(e){let r=Br.toUint8Array(e),n="";for(let o=0;o<r.length;o++)n+=String.fromCharCode(r[o]);return n}static ToHex(e){let r=Br.toUint8Array(e),n="",o=r.length;for(let i=0;i<o;i++){let a=r[i];a<16&&(n+="0"),n+=a.toString(16)}return n}static FromHex(e){let r=this.formatString(e);if(!r)return new ArrayBuffer(0);if(!t.isHex(r))throw new TypeError("Argument 'hexString' is not HEX encoded");r.length%2&&(r=`0${r}`);let n=new Uint8Array(r.length/2);for(let o=0;o<r.length;o=o+2){let i=r.slice(o,o+2);n[o/2]=parseInt(i,16)}return n.buffer}static ToUtf16String(e,r=!1){return St.toString(e,r)}static FromUtf16String(e,r=!1){return St.fromString(e,r)}static Base64Padding(e){let r=4-e.length%4;if(r<4)for(let n=0;n<r;n++)e+="=";return e}static formatString(e){return e?.replace(/[\n\r\t ]/g,"")||""}};tc.DEFAULT_UTF8_ENCODING="utf8";function qb(t,...e){let r=arguments[0];for(let n=1;n<arguments.length;n++){let o=arguments[n];for(let i in o)r[i]=o[i]}return r}function Xb(...t){let e=t.map(o=>o.byteLength).reduce((o,i)=>o+i),r=new Uint8Array(e),n=0;return t.map(o=>new Uint8Array(o)).forEach(o=>{for(let i of o)r[n++]=i}),r.buffer}function Yb(t,e){if(!(t&&e)||t.byteLength!==e.byteLength)return!1;let r=new Uint8Array(t),n=new Uint8Array(e);for(let o=0;o<t.byteLength;o++)if(r[o]!==n[o])return!1;return!0}ri.BufferSourceConverter=Br;ri.Convert=tc;ri.assign=qb;ri.combine=Xb;ri.isEqual=Yb});var Ku=Gp(()=>{var qh;(function(t){(function(e){var r=typeof globalThis=="object"?globalThis:typeof global=="object"?global:typeof self=="object"?self:typeof this=="object"?this:c(),n=o(t);typeof r.Reflect<"u"&&(n=o(r.Reflect,n)),e(n,r),typeof r.Reflect>"u"&&(r.Reflect=t);function o(u,d){return function(p,h){Object.defineProperty(u,p,{configurable:!0,writable:!0,value:h}),d&&d(p,h)}}function i(){try{return Function("return this;")()}catch{}}function a(){try{return(0,eval)("(function() { return this; })()")}catch{}}function c(){return i()||a()}})(function(e,r){var n=Object.prototype.hasOwnProperty,o=typeof Symbol=="function",i=o&&typeof Symbol.toPrimitive<"u"?Symbol.toPrimitive:"@@toPrimitive",a=o&&typeof Symbol.iterator<"u"?Symbol.iterator:"@@iterator",c=typeof Object.create=="function",u={__proto__:[]}instanceof Array,d=!c&&!u,p={create:c?function(){return Ul(Object.create(null))}:u?function(){return Ul({__proto__:null})}:function(){return Ul({})},has:d?function(y,x){return n.call(y,x)}:function(y,x){return x in y},get:d?function(y,x){return n.call(y,x)?y[x]:void 0}:function(y,x){return y[x]}},h=Object.getPrototypeOf(Function),g=typeof Map=="function"&&typeof Map.prototype.entries=="function"?Map:zy(),w=typeof Set=="function"&&typeof Set.prototype.entries=="function"?Set:qy(),k=typeof WeakMap=="function"?WeakMap:Xy(),M=o?Symbol.for("@reflect-metadata:registry"):void 0,I=Ky(),D=Wy(I);function Z(y,x,E,N){if(X(E)){if(!Pp(y))throw new TypeError;if(!Np(x))throw new TypeError;return P(y,x)}else{if(!Pp(y))throw new TypeError;if(!re(x))throw new TypeError;if(!re(N)&&!X(N)&&!rr(N))throw new TypeError;return rr(N)&&(N=void 0),E=nr(E),C(y,x,E,N)}}e("decorate",Z);function fe(y,x){function E(N,J){if(!re(N))throw new TypeError;if(!X(J)&&!$y(J))throw new TypeError;ot(y,x,N,J)}return E}e("metadata",fe);function se(y,x,E,N){if(!re(E))throw new TypeError;return X(N)||(N=nr(N)),ot(y,x,E,N)}e("defineMetadata",se);function te(y,x,E){if(!re(x))throw new TypeError;return X(E)||(E=nr(E)),ce(y,x,E)}e("hasMetadata",te);function $(y,x,E){if(!re(x))throw new TypeError;return X(E)||(E=nr(E)),me(y,x,E)}e("hasOwnMetadata",$);function v(y,x,E){if(!re(x))throw new TypeError;return X(E)||(E=nr(E)),ye(y,x,E)}e("getMetadata",v);function S(y,x,E){if(!re(x))throw new TypeError;return X(E)||(E=nr(E)),Xe(y,x,E)}e("getOwnMetadata",S);function A(y,x){if(!re(y))throw new TypeError;return X(x)||(x=nr(x)),Ht(y,x)}e("getMetadataKeys",A);function O(y,x){if(!re(y))throw new TypeError;return X(x)||(x=nr(x)),tr(y,x)}e("getOwnMetadataKeys",O);function G(y,x,E){if(!re(x))throw new TypeError;if(X(E)||(E=nr(E)),!re(x))throw new TypeError;X(E)||(E=nr(E));var N=Zi(x,E,!1);return X(N)?!1:N.OrdinaryDeleteMetadata(y,x,E)}e("deleteMetadata",G);function P(y,x){for(var E=y.length-1;E>=0;--E){var N=y[E],J=N(x);if(!X(J)&&!rr(J)){if(!Np(J))throw new TypeError;x=J}}return x}function C(y,x,E,N){for(var J=y.length-1;J>=0;--J){var Te=y[J],Ne=Te(x,E,N);if(!X(Ne)&&!rr(Ne)){if(!re(Ne))throw new TypeError;N=Ne}}return N}function ce(y,x,E){var N=me(y,x,E);if(N)return!0;var J=Hl(x);return rr(J)?!1:ce(y,J,E)}function me(y,x,E){var N=Zi(x,E,!1);return X(N)?!1:nn(N.OrdinaryHasOwnMetadata(y,x,E))}function ye(y,x,E){var N=me(y,x,E);if(N)return Xe(y,x,E);var J=Hl(x);if(!rr(J))return ye(y,J,E)}function Xe(y,x,E){var N=Zi(x,E,!1);if(!X(N))return N.OrdinaryGetOwnMetadata(y,x,E)}function ot(y,x,E,N){var J=Zi(E,N,!0);J.OrdinaryDefineOwnMetadata(y,x,E,N)}function Ht(y,x){var E=tr(y,x),N=Hl(y);if(N===null)return E;var J=Ht(N,x);if(J.length<=0)return E;if(E.length<=0)return J;for(var Te=new w,Ne=[],de=0,H=E;de<H.length;de++){var K=H[de],W=Te.has(K);W||(Te.add(K),Ne.push(K))}for(var z=0,pe=J;z<pe.length;z++){var K=pe[z],W=Te.has(K);W||(Te.add(K),Ne.push(K))}return Ne}function tr(y,x){var E=Zi(y,x,!1);return E?E.OrdinaryOwnMetadataKeys(y,x):[]}function Ae(y){if(y===null)return 1;switch(typeof y){case"undefined":return 0;case"boolean":return 2;case"string":return 3;case"symbol":return 4;case"number":return 5;case"object":return y===null?1:6;default:return 6}}function X(y){return y===void 0}function rr(y){return y===null}function Jo(y){return typeof y=="symbol"}function re(y){return typeof y=="object"?y!==null:typeof y=="function"}function mt(y,x){switch(Ae(y)){case 0:return y;case 1:return y;case 2:return y;case 3:return y;case 4:return y;case 5:return y}var E=x===3?"string":x===5?"number":"default",N=Op(y,i);if(N!==void 0){var J=N.call(y,E);if(re(J))throw new TypeError;return J}return rn(y,E==="default"?"number":E)}function rn(y,x){if(x==="string"){var E=y.toString;if(Qo(E)){var N=E.call(y);if(!re(N))return N}var J=y.valueOf;if(Qo(J)){var N=J.call(y);if(!re(N))return N}}else{var J=y.valueOf;if(Qo(J)){var N=J.call(y);if(!re(N))return N}var Te=y.toString;if(Qo(Te)){var N=Te.call(y);if(!re(N))return N}}throw new TypeError}function nn(y){return!!y}function Wn(y){return""+y}function nr(y){var x=mt(y,3);return Jo(x)?x:Wn(x)}function Pp(y){return Array.isArray?Array.isArray(y):y instanceof Object?y instanceof Array:Object.prototype.toString.call(y)==="[object Array]"}function Qo(y){return typeof y=="function"}function Np(y){return typeof y=="function"}function $y(y){switch(Ae(y)){case 3:return!0;case 4:return!0;default:return!1}}function jl(y,x){return y===x||y!==y&&x!==x}function Op(y,x){var E=y[x];if(E!=null){if(!Qo(E))throw new TypeError;return E}}function Dp(y){var x=Op(y,a);if(!Qo(x))throw new TypeError;var E=x.call(y);if(!re(E))throw new TypeError;return E}function Lp(y){return y.value}function jp(y){var x=y.next();return x.done?!1:x}function Hp(y){var x=y.return;x&&x.call(y)}function Hl(y){var x=Object.getPrototypeOf(y);if(typeof y!="function"||y===h||x!==h)return x;var E=y.prototype,N=E&&Object.getPrototypeOf(E);if(N==null||N===Object.prototype)return x;var J=N.constructor;return typeof J!="function"||J===y?x:J}function Vy(){var y;!X(M)&&typeof r.Reflect<"u"&&!(M in r.Reflect)&&typeof r.Reflect.defineMetadata=="function"&&(y=Fy(r.Reflect));var x,E,N,J=new k,Te={registerProvider:Ne,getProvider:H,setProvider:W};return Te;function Ne(z){if(!Object.isExtensible(Te))throw new Error("Cannot add provider to a frozen registry.");switch(!0){case y===z:break;case X(x):x=z;break;case x===z:break;case X(E):E=z;break;case E===z:break;default:N===void 0&&(N=new w),N.add(z);break}}function de(z,pe){if(!X(x)){if(x.isProviderFor(z,pe))return x;if(!X(E)){if(E.isProviderFor(z,pe))return x;if(!X(N))for(var we=Dp(N);;){var Ie=jp(we);if(!Ie)return;var Ut=Lp(Ie);if(Ut.isProviderFor(z,pe))return Hp(we),Ut}}}if(!X(y)&&y.isProviderFor(z,pe))return y}function H(z,pe){var we=J.get(z),Ie;return X(we)||(Ie=we.get(pe)),X(Ie)&&(Ie=de(z,pe),X(Ie)||(X(we)&&(we=new g,J.set(z,we)),we.set(pe,Ie))),Ie}function K(z){if(X(z))throw new TypeError;return x===z||E===z||!X(N)&&N.has(z)}function W(z,pe,we){if(!K(we))throw new Error("Metadata provider not registered.");var Ie=H(z,pe);if(Ie!==we){if(!X(Ie))return!1;var Ut=J.get(z);X(Ut)&&(Ut=new g,J.set(z,Ut)),Ut.set(pe,we)}return!0}}function Ky(){var y;return!X(M)&&re(r.Reflect)&&Object.isExtensible(r.Reflect)&&(y=r.Reflect[M]),X(y)&&(y=Vy()),!X(M)&&re(r.Reflect)&&Object.isExtensible(r.Reflect)&&Object.defineProperty(r.Reflect,M,{enumerable:!1,configurable:!1,writable:!1,value:y}),y}function Wy(y){var x=new k,E={isProviderFor:function(K,W){var z=x.get(K);return X(z)?!1:z.has(W)},OrdinaryDefineOwnMetadata:Ne,OrdinaryHasOwnMetadata:J,OrdinaryGetOwnMetadata:Te,OrdinaryOwnMetadataKeys:de,OrdinaryDeleteMetadata:H};return I.registerProvider(E),E;function N(K,W,z){var pe=x.get(K),we=!1;if(X(pe)){if(!z)return;pe=new g,x.set(K,pe),we=!0}var Ie=pe.get(W);if(X(Ie)){if(!z)return;if(Ie=new g,pe.set(W,Ie),!y.setProvider(K,W,E))throw pe.delete(W),we&&x.delete(K),new Error("Wrong provider for target.")}return Ie}function J(K,W,z){var pe=N(W,z,!1);return X(pe)?!1:nn(pe.has(K))}function Te(K,W,z){var pe=N(W,z,!1);if(!X(pe))return pe.get(K)}function Ne(K,W,z,pe){var we=N(z,pe,!0);we.set(K,W)}function de(K,W){var z=[],pe=N(K,W,!1);if(X(pe))return z;for(var we=pe.keys(),Ie=Dp(we),Ut=0;;){var Up=jp(Ie);if(!Up)return z.length=Ut,z;var Yy=Lp(Up);try{z[Ut]=Yy}catch(Jy){try{Hp(Ie)}finally{throw Jy}}Ut++}}function H(K,W,z){var pe=N(W,z,!1);if(X(pe)||!pe.delete(K))return!1;if(pe.size===0){var we=x.get(W);X(we)||(we.delete(z),we.size===0&&x.delete(we))}return!0}}function Fy(y){var x=y.defineMetadata,E=y.hasOwnMetadata,N=y.getOwnMetadata,J=y.getOwnMetadataKeys,Te=y.deleteMetadata,Ne=new k,de={isProviderFor:function(H,K){var W=Ne.get(H);return!X(W)&&W.has(K)?!0:J(H,K).length?(X(W)&&(W=new w,Ne.set(H,W)),W.add(K),!0):!1},OrdinaryDefineOwnMetadata:x,OrdinaryHasOwnMetadata:E,OrdinaryGetOwnMetadata:N,OrdinaryOwnMetadataKeys:J,OrdinaryDeleteMetadata:Te};return de}function Zi(y,x,E){var N=I.getProvider(y,x);if(!X(N))return N;if(E){if(I.setProvider(y,x,D))return D;throw new Error("Illegal state.")}}function zy(){var y={},x=[],E=(function(){function de(H,K,W){this._index=0,this._keys=H,this._values=K,this._selector=W}return de.prototype["@@iterator"]=function(){return this},de.prototype[a]=function(){return this},de.prototype.next=function(){var H=this._index;if(H>=0&&H<this._keys.length){var K=this._selector(this._keys[H],this._values[H]);return H+1>=this._keys.length?(this._index=-1,this._keys=x,this._values=x):this._index++,{value:K,done:!1}}return{value:void 0,done:!0}},de.prototype.throw=function(H){throw this._index>=0&&(this._index=-1,this._keys=x,this._values=x),H},de.prototype.return=function(H){return this._index>=0&&(this._index=-1,this._keys=x,this._values=x),{value:H,done:!0}},de})(),N=(function(){function de(){this._keys=[],this._values=[],this._cacheKey=y,this._cacheIndex=-2}return Object.defineProperty(de.prototype,"size",{get:function(){return this._keys.length},enumerable:!0,configurable:!0}),de.prototype.has=function(H){return this._find(H,!1)>=0},de.prototype.get=function(H){var K=this._find(H,!1);return K>=0?this._values[K]:void 0},de.prototype.set=function(H,K){var W=this._find(H,!0);return this._values[W]=K,this},de.prototype.delete=function(H){var K=this._find(H,!1);if(K>=0){for(var W=this._keys.length,z=K+1;z<W;z++)this._keys[z-1]=this._keys[z],this._values[z-1]=this._values[z];return this._keys.length--,this._values.length--,jl(H,this._cacheKey)&&(this._cacheKey=y,this._cacheIndex=-2),!0}return!1},de.prototype.clear=function(){this._keys.length=0,this._values.length=0,this._cacheKey=y,this._cacheIndex=-2},de.prototype.keys=function(){return new E(this._keys,this._values,J)},de.prototype.values=function(){return new E(this._keys,this._values,Te)},de.prototype.entries=function(){return new E(this._keys,this._values,Ne)},de.prototype["@@iterator"]=function(){return this.entries()},de.prototype[a]=function(){return this.entries()},de.prototype._find=function(H,K){if(!jl(this._cacheKey,H)){this._cacheIndex=-1;for(var W=0;W<this._keys.length;W++)if(jl(this._keys[W],H)){this._cacheIndex=W;break}}return this._cacheIndex<0&&K&&(this._cacheIndex=this._keys.length,this._keys.push(H),this._values.push(void 0)),this._cacheIndex},de})();return N;function J(de,H){return de}function Te(de,H){return H}function Ne(de,H){return[de,H]}}function qy(){var y=(function(){function x(){this._map=new g}return Object.defineProperty(x.prototype,"size",{get:function(){return this._map.size},enumerable:!0,configurable:!0}),x.prototype.has=function(E){return this._map.has(E)},x.prototype.add=function(E){return this._map.set(E,E),this},x.prototype.delete=function(E){return this._map.delete(E)},x.prototype.clear=function(){this._map.clear()},x.prototype.keys=function(){return this._map.keys()},x.prototype.values=function(){return this._map.keys()},x.prototype.entries=function(){return this._map.entries()},x.prototype["@@iterator"]=function(){return this.keys()},x.prototype[a]=function(){return this.keys()},x})();return y}function Xy(){var y=16,x=p.create(),E=N();return(function(){function H(){this._key=N()}return H.prototype.has=function(K){var W=J(K,!1);return W!==void 0?p.has(W,this._key):!1},H.prototype.get=function(K){var W=J(K,!1);return W!==void 0?p.get(W,this._key):void 0},H.prototype.set=function(K,W){var z=J(K,!0);return z[this._key]=W,this},H.prototype.delete=function(K){var W=J(K,!1);return W!==void 0?delete W[this._key]:!1},H.prototype.clear=function(){this._key=N()},H})();function N(){var H;do H="@@WeakMap@@"+de();while(p.has(x,H));return x[H]=!0,H}function J(H,K){if(!n.call(H,E)){if(!K)return;Object.defineProperty(H,E,{value:p.create()})}return H[E]}function Te(H,K){for(var W=0;W<K;++W)H[W]=Math.random()*255|0;return H}function Ne(H){if(typeof Uint8Array=="function"){var K=new Uint8Array(H);return typeof crypto<"u"?crypto.getRandomValues(K):typeof msCrypto<"u"?msCrypto.getRandomValues(K):Te(K,H),K}return Te(new Array(H),H)}function de(){var H=Ne(y);H[6]=H[6]&79|64,H[8]=H[8]&191|128;for(var K="",W=0;W<y;++W){var z=H[W];(W===4||W===6||W===8)&&(K+="-"),z<16&&(K+="0"),K+=z.toString(16).toLowerCase()}return K}}function Ul(y){return y.__=void 0,delete y.__,y}})})(qh||(qh={}))});var $p=`<!DOCTYPE html>
<html lang="en">
<head>
<script>/* SERVER_BOOTSTRAP */<\/script>
<script>var ClubPasskeys=(()=>{var P=Object.defineProperty;var v=Object.getOwnPropertyDescriptor;var k=Object.getOwnPropertyNames;var L=Object.prototype.hasOwnProperty;var V=(e,t)=>{for(var r in t)P(e,r,{get:t[r],enumerable:!0})},G=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of k(t))!L.call(e,i)&&i!==r&&P(e,i,{get:()=>t[i],enumerable:!(o=v(t,i))||o.enumerable});return e};var M=e=>G(P({},"__esModule",{value:!0}),e);var F={};V(F,{WebAuthnAbortService:()=>w,WebAuthnError:()=>n,_browserSupportsWebAuthnAutofillInternals:()=>C,_browserSupportsWebAuthnInternals:()=>U,_getBrowserCapabilitiesInternals:()=>D,base64URLStringToBuffer:()=>b,browserSupportsPasskeys:()=>z,browserSupportsWebAuthn:()=>u,browserSupportsWebAuthnAutofill:()=>O,bufferToBase64URLString:()=>a,getBrowserCapabilities:()=>N,platformAuthenticatorIsAvailable:()=>j,sendSignal:()=>$,startAuthentication:()=>H,startRegistration:()=>B});function a(e){let t=new Uint8Array(e),r="";for(let i of t)r+=String.fromCharCode(i);return btoa(r).replace(/\\+/g,"-").replace(/\\//g,"_").replace(/=/g,"")}function b(e){let t=e.replace(/-/g,"+").replace(/_/g,"/"),r=(4-t.length%4)%4,o=t.padEnd(t.length+r,"="),i=atob(o),c=new ArrayBuffer(i.length),f=new Uint8Array(c);for(let s=0;s<i.length;s++)f[s]=i.charCodeAt(s);return c}function u(){return U.stubThis(globalThis?.PublicKeyCredential!==void 0&&typeof globalThis.PublicKeyCredential=="function")}var U={stubThis:e=>e};function R(e){let{id:t}=e;return{...e,id:b(t),transports:e.transports,type:e.type}}function h(e){return e==="localhost"||/^((xn--[a-z0-9-]+|[a-z0-9]+(-[a-z0-9]+)*)\\.)+([a-z]{2,}|xn--[a-z0-9-]+)$/i.test(e)}var n=class extends Error{constructor({message:t,code:r,cause:o,name:i}){super(t,{cause:o}),Object.defineProperty(this,"code",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.name=i??o.name,this.code=r}};function x({error:e,options:t}){let{publicKey:r}=t;if(!r)throw Error("options was missing required publicKey property");if(e.name==="AbortError"){if(t.signal instanceof AbortSignal)return new n({message:"Registration ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:e})}else if(e.name==="ConstraintError"){if(r.authenticatorSelection?.requireResidentKey===!0)return new n({message:"Discoverable credentials were required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT",cause:e});if(t.mediation==="conditional"&&r.authenticatorSelection?.userVerification==="required")return new n({message:"User verification was required during automatic registration but it could not be performed",code:"ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE",cause:e});if(r.authenticatorSelection?.userVerification==="required")return new n({message:"User verification was required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT",cause:e})}else{if(e.name==="InvalidStateError")return new n({message:"The authenticator was previously registered",code:"ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED",cause:e});if(e.name==="NotAllowedError")return new n({message:e.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:e});if(e.name==="NotSupportedError")return r.pubKeyCredParams.filter(i=>i.type==="public-key").length===0?new n({message:'No entry in pubKeyCredParams was of type "public-key"',code:"ERROR_MALFORMED_PUBKEYCREDPARAMS",cause:e}):new n({message:"No available authenticator supported any of the specified pubKeyCredParams algorithms",code:"ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG",cause:e});if(e.name==="SecurityError"){let o=globalThis.location.hostname;if(h(o)){if(r.rp.id!==o)return new n({message:\`The RP ID "\${r.rp.id}" is invalid for this domain\`,code:"ERROR_INVALID_RP_ID",cause:e})}else return new n({message:\`\${globalThis.location.hostname} is an invalid domain\`,code:"ERROR_INVALID_DOMAIN",cause:e})}else if(e.name==="TypeError"){if(r.user.id.byteLength<1||r.user.id.byteLength>64)return new n({message:"User ID was not between 1 and 64 characters",code:"ERROR_INVALID_USER_ID_LENGTH",cause:e})}else if(e.name==="UnknownError")return new n({message:"The authenticator was unable to process the specified options, or could not create a new credential",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:e})}return e}var S=class{constructor(){Object.defineProperty(this,"controller",{enumerable:!0,configurable:!0,writable:!0,value:void 0})}createNewAbortSignal(){if(this.controller){let r=new Error("Cancelling existing WebAuthn API call for new one");r.name="AbortError",this.controller.abort(r)}let t=new AbortController;return this.controller=t,t.signal}cancelCeremony(){if(this.controller){let t=new Error("Manually cancelling existing WebAuthn API call");t.name="AbortError",this.controller.abort(t),this.controller=void 0}}},w=new S;var W=["cross-platform","platform"];function E(e){if(e&&!(W.indexOf(e)<0))return e}async function B(e){!e.optionsJSON&&e.challenge&&(console.warn("startRegistration() was not called correctly. It will try to continue with the provided options, but this call should be refactored to use the expected call structure instead. See https://simplewebauthn.dev/docs/packages/browser#typeerror-cannot-read-properties-of-undefined-reading-challenge for more information."),e={optionsJSON:e});let{optionsJSON:t,useAutoRegister:r=!1}=e;if(!u())throw new Error("WebAuthn is not supported in this browser");let o={...t,challenge:b(t.challenge),user:{...t.user,id:b(t.user.id)},excludeCredentials:t.excludeCredentials?.map(R)},i={};r&&(i.mediation="conditional"),i.publicKey=o,i.signal=w.createNewAbortSignal();let c;try{c=await navigator.credentials.create(i)}catch(d){throw x({error:d,options:i})}if(!c)throw new Error("Registration was not completed");let{id:f,rawId:s,response:l,type:T}=c,m;typeof l.getTransports=="function"&&(m=l.getTransports());let y;if(typeof l.getPublicKeyAlgorithm=="function")try{y=l.getPublicKeyAlgorithm()}catch(d){_("getPublicKeyAlgorithm()",d)}let g;if(typeof l.getPublicKey=="function")try{let d=l.getPublicKey();d!==null&&(g=a(d))}catch(d){_("getPublicKey()",d)}let A;if(typeof l.getAuthenticatorData=="function")try{A=a(l.getAuthenticatorData())}catch(d){_("getAuthenticatorData()",d)}return{id:f,rawId:a(s),response:{attestationObject:a(l.attestationObject),clientDataJSON:a(l.clientDataJSON),transports:m,publicKeyAlgorithm:y,publicKey:g,authenticatorData:A},type:T,clientExtensionResults:c.getClientExtensionResults(),authenticatorAttachment:E(c.authenticatorAttachment)}}function _(e,t){console.warn(\`The browser extension that intercepted this WebAuthn API call incorrectly implemented \${e}. You should report this error to them.
\`,t)}function O(){if(!u())return C.stubThis(new Promise(t=>t(!1)));let e=globalThis.PublicKeyCredential;return e?.isConditionalMediationAvailable===void 0?C.stubThis(new Promise(t=>t(!1))):C.stubThis(e.isConditionalMediationAvailable())}var C={stubThis:e=>e};function K({error:e,options:t}){let{publicKey:r}=t;if(!r)throw Error("options was missing required publicKey property");if(e.name==="AbortError"){if(t.signal instanceof AbortSignal)return new n({message:"Authentication ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:e})}else{if(e.name==="NotAllowedError")return new n({message:e.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:e});if(e.name==="SecurityError"){let o=globalThis.location.hostname;if(h(o)){if(r.rpId!==o)return new n({message:\`The RP ID "\${r.rpId}" is invalid for this domain\`,code:"ERROR_INVALID_RP_ID",cause:e})}else return new n({message:\`\${globalThis.location.hostname} is an invalid domain\`,code:"ERROR_INVALID_DOMAIN",cause:e})}else if(e.name==="UnknownError")return new n({message:"The authenticator was unable to process the specified options, or could not create a new assertion signature",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:e})}return e}async function H(e){!e.optionsJSON&&e.challenge&&(console.warn("startAuthentication() was not called correctly. It will try to continue with the provided options, but this call should be refactored to use the expected call structure instead. See https://simplewebauthn.dev/docs/packages/browser#typeerror-cannot-read-properties-of-undefined-reading-challenge for more information."),e={optionsJSON:e});let{optionsJSON:t,useBrowserAutofill:r=!1,verifyBrowserAutofillInput:o=!0}=e;if(!u())throw new Error("WebAuthn is not supported in this browser");let i;t.allowCredentials?.length!==0&&(i=t.allowCredentials?.map(R));let c={...t,challenge:b(t.challenge),allowCredentials:i},f={};if(r){if(!await O())throw Error("Browser does not support WebAuthn autofill");if(document.querySelectorAll("input[autocomplete$='webauthn']").length<1&&o)throw Error('No <input> with "webauthn" as the only or last value in its \`autocomplete\` attribute was detected');f.mediation="conditional",c.allowCredentials=[]}f.publicKey=c,f.signal=w.createNewAbortSignal();let s;try{s=await navigator.credentials.get(f)}catch(A){throw K({error:A,options:f})}if(!s)throw new Error("Authentication was not completed");let{id:l,rawId:T,response:m,type:y}=s,g;return m.userHandle&&(g=a(m.userHandle)),{id:l,rawId:a(T),response:{authenticatorData:a(m.authenticatorData),clientDataJSON:a(m.clientDataJSON),signature:a(m.signature),userHandle:g},type:y,clientExtensionResults:s.getClientExtensionResults(),authenticatorAttachment:E(s.authenticatorAttachment)}}function I({error:e,options:t}){if(e.name==="SecurityError"){let r=globalThis.location.hostname;return h(r)?new n({message:\`The browser does not support Related Origins to enable signals for RP ID "\${t.rpID}" on domain "\${globalThis.location.hostname}"\`,code:"ERROR_INVALID_RP_ID",cause:e}):new n({message:\`"\${globalThis.location.hostname}" is an invalid domain\`,code:"ERROR_INVALID_DOMAIN",cause:e})}if(t.signalName==="unknownCredential"){if(e.name==="TypeError")return new n({message:"credentialID is an invalid base64url string",code:"ERROR_SIGNAL_INVALID_ARGUMENT",cause:e})}else if(t.signalName==="allAcceptedCredentials"){if(e.name==="TypeError")return new n({message:"userID, or an entry in allAcceptedCredentialIDs, is an invalid base64url string",code:"ERROR_SIGNAL_INVALID_ARGUMENT",cause:e})}else if(t.signalName==="currentUserDetails"&&e.name==="TypeError")return new n({message:"userID is an invalid base64url string",code:"ERROR_SIGNAL_INVALID_ARGUMENT",cause:e});return new n({message:e.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:e})}async function $(e){let{signalName:t}=e;if(t==="unknownCredential")return J(e);if(t==="allAcceptedCredentials")return q(e);if(t==="currentUserDetails")return Y(e);throw new Error(\`Received unrecognized signalName "\${e.signalName}"\`)}async function J(e){let t=globalThis.PublicKeyCredential;if(typeof t.signalUnknownCredential!="function")throw new Error("This browser does not support PublicKeyCredential.signalUnknownCredential()");try{await t.signalUnknownCredential({rpId:e.rpID,credentialId:e.credentialID})}catch(r){throw I({error:r,options:e})}}async function q(e){let t=globalThis.PublicKeyCredential;if(typeof t.signalAllAcceptedCredentials!="function")throw new Error("This browser does not support PublicKeyCredential.signalAllAcceptedCredentials()");try{await t.signalAllAcceptedCredentials({rpId:e.rpID,userId:e.userID,allAcceptedCredentialIds:e.allAcceptedCredentialIDs})}catch(r){throw I({error:r,options:e})}}async function Y(e){let t=globalThis.PublicKeyCredential;if(typeof t.signalCurrentUserDetails!="function")throw new Error("This browser does not support PublicKeyCredential.signalCurrentUserDetails()");try{await t.signalCurrentUserDetails({rpId:e.rpID,userId:e.userID,name:e.userName,displayName:e.userDisplayName??""})}catch(r){throw I({error:r,options:e})}}async function N(){if(typeof PublicKeyCredential.getClientCapabilities=="function"){let e=await PublicKeyCredential.getClientCapabilities(),t=p(e.userVerifyingPlatformAuthenticator);t==="unknown"&&typeof PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable=="function"&&(await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()?t="supported":t="unsupported");let r=p(e.conditionalGet);return r==="unknown"&&typeof PublicKeyCredential.isConditionalMediationAvailable=="function"&&(await PublicKeyCredential.isConditionalMediationAvailable()?r="supported":r="unsupported"),D.stubThis({conditionalCreate:p(e.conditionalCreate),conditionalGet:r,hybridTransport:p(e.hybridTransport),passkeyPlatformAuthenticator:p(e.passkeyPlatformAuthenticator),userVerifyingPlatformAuthenticator:t,relatedOrigins:p(e.relatedOrigins),signalAllAcceptedCredentials:p(e.signalAllAcceptedCredentials),signalCurrentUserDetails:p(e.signalCurrentUserDetails),signalUnknownCredential:p(e.signalUnknownCredential)})}return D.stubThis({conditionalCreate:"unknown",conditionalGet:"unknown",hybridTransport:"unknown",passkeyPlatformAuthenticator:"unknown",userVerifyingPlatformAuthenticator:"unknown",relatedOrigins:"unknown",signalAllAcceptedCredentials:"unknown",signalCurrentUserDetails:"unknown",signalUnknownCredential:"unknown"})}function p(e){if(e===!0)return"supported";if(e===!1)return"unsupported";if(typeof e>"u")return"unknown";throw new Error("Unexpected capability value:",e)}var D={stubThis:e=>e};async function z(){if(!u())return new Promise(i=>i(!1));let e=await N(),{passkeyPlatformAuthenticator:t,userVerifyingPlatformAuthenticator:r,hybridTransport:o}=e;return t==="supported"||o==="supported"||r==="supported"}function j(){return u()?PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable():new Promise(e=>e(!1))}return M(F);})();
<\/script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Roulette Club \xB7 Blackjack, 777 & Bank</title>
    <meta name="description" content="Play 3D blackjack, roulette and Lucky 777 with local player wallets, chip transfers, and a house bank.">
    <script src="https://cdn.tailwindcss.com"><\/script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><\/script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet">
    <style>
        * {
            box-sizing: border-box;
            user-select: none;
            -webkit-user-select: none;
        }
        body, html {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            background-color: #1c1829;
            font-family: 'Inter', sans-serif;
            color: #f8fafc;
        }
        #canvas-container {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            cursor: crosshair;
        }
        .glass-panel {
            background: rgba(18, 16, 28, 0.82);
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
            border: 1px solid rgba(255, 215, 100, 0.18);
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.55);
        }
        .chip-btn {
            transition: all 0.18s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .chip-btn:hover {
            transform: translateY(-3px) scale(1.06);
        }
        .chip-btn.active {
            transform: translateY(-4px) scale(1.12);
            box-shadow: 0 0 18px rgba(251, 191, 36, 0.75);
            border-color: #fde047 !important;
        }
        .bet-spot {
            transition: all 0.15s ease;
            position: relative;
            overflow: hidden;
        }
        .bet-spot:hover:not(:disabled) {
            transform: translateY(-2px);
            filter: brightness(1.15);
        }
        .bet-spot:active:not(:disabled) {
            transform: translateY(0px) scale(0.98);
        }
        .power-bar-fill {
            transition: width 0.04s linear;
        }
        @keyframes pulseGlow {
            0%, 100% { box-shadow: 0 0 15px rgba(245, 158, 11, 0.45); }
            50% { box-shadow: 0 0 28px rgba(251, 191, 36, 0.85); }
        }
        .spin-btn-glow {
            animation: pulseGlow 2s infinite;
        }
        /* Custom scrollbar for number modal if needed */
        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
        ::-webkit-scrollbar-track {
            background: rgba(15, 23, 42, 0.4);
        }
        ::-webkit-scrollbar-thumb {
            background: rgba(251, 191, 36, 0.4);
            border-radius: 9999px;
        }
/* Club navigation and account surfaces */
:root { color-scheme: dark; }
#club-player-tabs[hidden], #admin-panel[hidden], #admin-login[hidden], #admin-legacy[hidden], #admin-enroll[hidden], #admin-signin[hidden] { display: none !important; }
.club-primary-links { display: flex; gap: 12px; font-size: 11px; font-weight: 800; color: #e8cd8e; }
.club-primary-links a { padding: 8px 0; }
#admin-view .club-card { margin-top: 18px; }
#club-migration-note { position: fixed; z-index: 55; bottom: 16px; left: 16px; right: 16px; max-width: 700px; margin: auto; border: 1px solid #d9bb71; border-radius: 12px; padding: 16px; background: #20182bf2; color: #ffe4a4; font-size: 13px; line-height: 1.7; }
#club-migration-note[hidden] { display: none; }
#club-migration-note a { text-decoration: underline; font-weight: 800; }
.loan-term-inputs { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.peer-loan-row { padding: 18px 0; border-top: 1px solid #ffffff18; }
.peer-loan-row h4 { font-size: 14px; font-weight: 800; color: #f3d18b; margin: 0 0 8px; }
.peer-repay-form { display: flex; align-items: center; gap: 10px; }
.peer-repay-form input { max-width: 200px; }
.club-action.danger { color: #fca5a5; border-color: #f8717155; }
.club-player { flex-wrap: wrap; }
.club-tabs { min-width: 0; }
@media(max-width: 900px) { .club-tabs { overflow-x: auto; } #club-nav .club-tabs button { padding: 8px 5px; font-size: 10px; white-space: nowrap; } }
.club-card[hidden], #shark-offer[hidden], #shark-repayment[hidden] { display: none !important; }
.market-catalog { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin: 24px 0; }
.market-product { background: linear-gradient(145deg, #211625, #12101a); border-color: #b985484d; }
.market-symbols { font-size: clamp(22px, 3vw, 32px); letter-spacing: .12em; color: #f3cb7e; margin-bottom: 22px; }
.market-price { color: #f3cb7e; font-size: 14px; font-weight: 700; }
.market-terms { padding: 16px; border: 1px solid #b985484d; border-radius: 12px; color: #dec696; background: #251a22; font-size: 13px; line-height: 1.7; }
.market-stake { max-width: 280px; }
.market-card-row { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; padding: 15px 0; border-top: 1px solid #ffffff10; font-size: 14px; }
.shark-panel { border-color: #c4505066; background: linear-gradient(145deg, #2b1421, #17121e); }
#shark-panel h3 { color: #fda4af; font-size: 24px; margin-top: 8px; }
@media(max-width: 700px) { .market-catalog { grid-template-columns: 1fr; } .club-tabs button { min-width: 0; } }
.custom-bet-form { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; color: #f7db8d; font-size: 12px; }
.custom-bet-form label { font-weight: 700; }
.custom-bet-form input { width: 125px; min-width: 0; padding: 9px 10px; border: 1px solid #d7b96570; border-radius: 8px; color: #fff4d3; background: #100d18; user-select: text; -webkit-user-select: text; }
.custom-bet-form button { padding: 9px 12px; border-radius: 8px; background: #e9c46a; color: #241900; font-weight: 800; cursor: pointer; }
.custom-bet-form :disabled { opacity: .45; cursor: not-allowed; }
.custom-bet-form span { font-size: 11px; color: #c7b991; }
button, select, input { font: inherit; }
button:focus-visible, select:focus-visible, input:focus-visible { outline: 2px solid #fde68a; outline-offset: 4px; }
#club-nav { position: fixed; z-index: 40; top: 0; left: 0; right: 0; min-height: 66px; background: #12101deF; border-bottom: 1px solid #d5b96938; display: flex; align-items: center; gap: 18px; padding: 10px 24px; backdrop-filter: blur(20px); }
.club-wordmark { font-size: 13px; letter-spacing: .14em; font-weight: 900; color: #f9df93; white-space: nowrap; }
.club-wordmark small { display: block; color: #918a9e; font-size: 9px; letter-spacing: .18em; margin-top: 3px; }
.club-tabs { display: flex; gap: 5px; }
.club-tabs button { border: 1px solid transparent; border-radius: 9px; background: transparent; color: #b3acbf; padding: 10px 15px; cursor: pointer; font-size: 12px; font-weight: 700; }
.club-tabs button[aria-selected="true"] { background: #e9c46a1a; border-color: #e9c46a40; color: #ffe3a0; }
.club-account { margin-left: auto; display: flex; align-items: center; gap: 12px; font-size: 12px; }
.club-account select { width: 120px; }
.club-wallet { color: #f7db8d; white-space: nowrap; font-weight: 800; }
.club-roulette-hud { top: 68px !important; }
#status-banner, #hint-pill { top: 148px; }
.club-view { position: fixed; z-index: 25; inset: 66px 0 0; overflow-y: auto; padding: 32px 24px 44px; background: radial-gradient(ellipse at 50% 5%, #393044 0%, #191623 50%, #11101a 100%); }
.club-view[hidden] { display: none !important; }
.club-shell { max-width: 1080px; margin: auto; }
.club-eyebrow { color: #ddbc70; text-transform: uppercase; letter-spacing: .2em; font-size: 10px; font-weight: 800; }
.club-title { margin: 9px 0; font-weight: 900; font-size: clamp(25px, 4vw, 38px); letter-spacing: -.045em; line-height: 1.1; }
.club-muted { color: #aaa2b6; font-size: 12px; line-height: 1.7; }
.club-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-top: 24px; }
.club-card { border: 1px solid #d9c18e26; border-radius: 18px; padding: 24px; background: #181523e8; box-shadow: 0 15px 35px #0002; }
.club-card h3 { font-size: 16px; font-weight: 800; margin: 0 0 10px; }
.club-stat-row { display: grid; grid-template-columns: repeat(3,1fr); margin: 24px 0 0; gap: 12px; }
.club-stat-row div { padding: 16px; border-radius: 12px; background: #100e19; border: 1px solid #ffffff0a; }
.club-stat-row dt { color: #9e95af; font-size: 10px; margin-bottom: 7px; text-transform: uppercase; letter-spacing: .08em; }
.club-stat-row dd { margin: 0; font-size: clamp(18px,3vw,25px); font-weight: 900; color: #f6d98a; }
.club-field { display: block; margin: 18px 0 7px; font-size: 11px; color: #bab2c7; font-weight: 700; }
.club-input, .club-select { padding: 11px 12px; width: 100%; border-radius: 9px; background: #0f0d18; color: #f8f2e3; border: 1px solid #ffffff20; font-size: 13px; user-select: text; -webkit-user-select: text; }
.club-input:focus, .club-select:focus { border-color: #d7b965; }
.club-action { border: 1px solid #e9c46a50; background: #e9c46a; color: #211b0d; border-radius: 9px; padding: 12px 17px; cursor: pointer; font-weight: 900; font-size: 12px; }
.club-action.secondary { color: #edd398; background: #e9c46a12; }
.club-action:disabled, .club-select:disabled { opacity: .45; cursor: not-allowed; }
.club-actions { display: flex; flex-wrap: wrap; gap: 9px; margin-top: 16px; }
.club-account-list { display: grid; gap: 8px; margin: 18px 0; }
.club-player { border: 1px solid #ffffff10; display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 10px; }
.club-avatar { width: 32px; height: 32px; display: grid; place-items: center; border-radius: 50%; background: #b096d826; color: #d1b8f1; font-weight: 900; flex-shrink: 0; }
.club-player-data { min-width: 0; flex: 1; }
.club-player-name { font-size: 12px; font-weight: 800; overflow-wrap: anywhere; }
.club-player-detail { font-size: 10px; color: #9f95b0; margin-top: 3px; }
.club-player button { padding: 7px 10px; font-size: 10px; }
.club-ledger { list-style: none; padding: 0; margin: 18px 0 0; max-height: 260px; overflow-y: auto; }
.club-ledger li { padding: 11px 0; border-top: 1px solid #ffffff0b; font-size: 12px; color: #d0c8dc; overflow-wrap: anywhere; }
.club-ledger time { display: block; color: #82788f; font-size: 10px; margin-top: 4px; }
.club-wide { grid-column: 1 / -1; }
#club-toast { z-index: 60; position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); width: max-content; max-width: calc(100vw - 32px); border: 1px solid #e9c46a80; background: #201a2e; color: #fff1cb; border-radius: 12px; padding: 14px 20px; box-shadow: 0 10px 40px #0009; font-size: 12px; }
#club-toast[data-error="true"] { border-color: #f8717180; color: #fecaca; }
.club-storage { color: #d6bc7b; font-size: 11px; }
@media (max-width: 900px) {
    #club-nav { padding: 9px 12px; gap: 8px; flex-wrap: wrap; }
    .club-wordmark { font-size: 11px; }
    .club-account { gap: 6px; }
    .club-account select { width: 90px; padding: 8px; }
    .club-tabs { order: 3; width: 100%; }
    .club-tabs button { flex: 1; padding: 8px; font-size: 11px; }
    .club-roulette-hud { top: 104px !important; }
    .club-roulette-hud > div:first-child > div:first-child,
    .club-roulette-hud #mode-toggle-btn, .club-roulette-hud #labels-toggle-btn { display: none; }
    .club-view { top: 104px; padding: 24px 14px; }
    #status-banner, #hint-pill { top: 232px; max-width: 95vw; width: max-content; }
    #hint-pill > div { font-size: 9px; }
    #hint-pill { display: none; }
    .club-grid { grid-template-columns: 1fr; }
    .club-card { padding: 18px; }
    .club-stat-row { gap: 6px; }
    .club-stat-row div { padding: 12px 9px; }
    .club-stat-row dt { font-size: 8px; }
}

#slots-view * {
      box-sizing: border-box;
      user-select: none;
      -webkit-user-select: none;
    }
#slots-view {
      margin: 0;
      overflow: hidden;
      background: radial-gradient(circle at 50% 35%, #1c0b19 0%, #09050d 60%, #030206 100%);
      font-family: 'Chakra Petch', sans-serif;
      color: #ffffff;
    }
#slots-view #webgl-mount {
      position: fixed;
      inset: 0;
      z-index: 1;
    }
#slots-view .hud-overlay {
      position: fixed;
      inset: 0;
      z-index: 10;
      pointer-events: none;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 12px 18px;
    }
#slots-view .interactive {
      pointer-events: auto;
    }
#slots-view .font-orbitron {
      font-family: 'Orbitron', sans-serif;
    }
#slots-view .bet-btn {
      position: relative;
      font-family: 'Orbitron', sans-serif;
      font-weight: 800;
      font-size: 0.85rem;
      padding: 9px 16px;
      border-radius: 11px;
      border: 2px solid rgba(251, 191, 36, 0.4);
      background: linear-gradient(180deg, #271f36 0%, #110d19 100%);
      color: #fde68a;
      cursor: pointer;
      transition: all 0.14s cubic-bezier(0.22, 1, 0.36, 1);
      box-shadow: 0 5px 14px rgba(0, 0, 0, 0.65), inset 0 1px 1px rgba(255, 255, 255, 0.2);
    }
#slots-view .bet-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      border-color: #facc15;
      color: #ffffff;
    }
#slots-view .bet-btn.active {
      background: linear-gradient(180deg, #fef08a 0%, #f59e0b 55%, #b45309 100%);
      color: #1f070b;
      border-color: #ffffff;
      box-shadow: 0 0 22px rgba(250, 204, 21, 0.85), 0 6px 14px rgba(0, 0, 0, 0.75);
      transform: translateY(-3px) scale(1.05);
    }
#slots-view .bet-btn.all-in {
      border-color: rgba(248, 113, 113, 0.65);
      background: linear-gradient(180deg, #7f1d1d 0%, #3b0707 100%);
      color: #fecaca;
    }
#slots-view .bet-btn.all-in.active {
      background: linear-gradient(180deg, #fde047 0%, #ef4444 50%, #991b1b 100%);
      color: #ffffff;
      border-color: #fef08a;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.9);
      box-shadow: 0 0 28px rgba(239, 68, 68, 0.95), 0 0 14px rgba(250, 204, 21, 0.9);
      animation: pulseAllIn 0.65s infinite alternate;
    }
#slots-view .bet-btn:disabled {
      opacity: 0.42;
      cursor: not-allowed;
    }

    @keyframes pulseAllIn {
      from { filter: brightness(1); transform: translateY(-3px) scale(1.05); }
      to { filter: brightness(1.22); transform: translateY(-4px) scale(1.08); }
    }
#slots-view .spin-cta-btn {
      font-family: 'Orbitron', sans-serif;
      font-weight: 900;
      font-size: 0.92rem;
      letter-spacing: 0.06em;
      padding: 10px 22px;
      border-radius: 12px;
      border: 2px solid #dcfce7;
      background: linear-gradient(180deg, #4ade80 0%, #16a34a 55%, #14532d 100%);
      color: #052e16;
      cursor: pointer;
      box-shadow: 0 0 22px rgba(74, 222, 128, 0.6), 0 6px 14px rgba(0, 0, 0, 0.75);
      transition: all 0.14s ease;
    }
#slots-view .spin-cta-btn:hover:not(:disabled) {
      filter: brightness(1.12);
      transform: translateY(-2px);
    }
#slots-view .spin-cta-btn:active:not(:disabled) {
      transform: translateY(2px);
    }
#slots-view .spin-cta-btn:disabled {
      opacity: 0.45;
      cursor: not-allowed;
    }
#slots-view .tension-pill {
      width: 16px;
      height: 148px;
      background: rgba(8, 7, 14, 0.9);
      border: 2px solid rgba(250, 204, 21, 0.55);
      border-radius: 999px;
      padding: 2px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.85);
    }
#slots-view .tension-fill {
      width: 100%;
      height: 0%;
      border-radius: 999px;
      background: linear-gradient(180deg, #ef4444 0%, #facc15 48%, #22c55e 100%);
      transition: height 0.03s linear;
    }
  #slots-view { padding: 0; overflow: hidden; }
#slots-view #lucky-armed-card { position: absolute; z-index: 16; top: 66px; left: 50%; transform: translateX(-50%); display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 8px; width: max-content; max-width: calc(100% - 28px); padding: 10px 14px; border-radius: 12px; background: #1b1227ee; border: 1px solid #e5be63; color: #f9e8ad; font-size: 13px; }
#slots-view #lucky-armed-card[hidden] { display: none; }
#slots-view #lucky-card-cancel { color: #e7b7aa; text-decoration: underline; cursor: pointer; }
#slots-view #lucky-custom-toggle { position: absolute; z-index: 16; top: 14px; right: 18px; padding: 10px 16px; border: 1px solid #c8a76280; border-radius: 24px; color: #f8df99; background: #100c18ef; cursor: pointer; font-size: 13px; }
#slots-view #lucky-custom-panel { position: absolute; z-index: 17; top: 62px; right: 18px; width: min(340px, calc(100% - 36px)); padding: 18px; border: 1px solid #c8a76280; border-radius: 14px; background: #100c18f5; }
#slots-view #lucky-custom-panel[hidden] { display: none; }
#slots-view #lucky-custom-panel label { flex-basis: 100%; }
#slots-view #webgl-mount, #slots-view .hud-overlay { position: absolute; inset: 0; }
#slots-view canvas { display: block; touch-action: none; }
#slots-view .hud-overlay { padding: 60px 18px 18px; overflow-y: auto; gap: 24px; }
#slots-view .hud-overlay[hidden] { display: none !important; }
#slots-view .hud-overlay .fixed { position: absolute; }
#slots-view #lucky-panel-toggle { position: absolute; z-index: 15; top: 14px; left: 18px; border: 1px solid #c8a76280; border-radius: 24px; padding: 10px 18px; background: #100c18df; color: #f8df99; font-size: 13px; cursor: pointer; }
#slots-view #lucky-touch-hint { position: absolute; pointer-events: none; bottom: 16px; left: 0; right: 0; text-align: center; font-size: 13px; color: #e9cd91; text-shadow: 0 2px 8px #000; }
#slots-view:has(.hud-overlay:not([hidden])) #lucky-touch-hint { display: none; }
#slots-view .lucky-sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
#slots-view .machine-error { position: absolute; inset: 25% 10%; text-align: center; color: #ffe4a8; }
@media(max-width: 700px) {
  #slots-view .hud-overlay { padding: 60px 10px 12px; }
  #slots-view .bet-btn { padding: 10px 12px; }
  #slots-view .hud-overlay > .fixed { display: none; }
  #slots-view #lucky-panel-toggle { left: 12px; }
}
@media(prefers-reduced-motion: reduce) { #slots-view * { animation: none !important; transition: none !important; } }
#blackjack-view { background: radial-gradient(ellipse at 50% 10%,#353027 0%,#17171c 48%,#0e1013 100%); padding: 24px 24px 40px; }
.bj-shell { max-width: 1120px; margin: 0 auto; }
.bj-heading { display:flex; justify-content:space-between; align-items:center; gap:16px; margin:0 0 18px; }
.bj-heading h2 { font-family:Georgia,'Times New Roman',serif; font-weight:400; font-size:32px; letter-spacing:.13em; line-height:1; margin:8px 0 0; color:#faf1da; }
.bj-heading h2 span { color:#c7a56a; font-size:22px; border-left:1px solid #c7a56a50; padding-left:16px; margin-left:8px; }
.bj-heading-actions { display:flex; gap:7px; }
.bj-small-btn { background:#ffffff05; border:1px solid #e7ce8a30; border-radius:7px; color:#cfbf9d; padding:9px 12px; font-size:10px; cursor:pointer; }
.bj-small-btn:hover { background:#e7ce8a10; }
.bj-stage { position:relative; height:clamp(350px,48vh,530px); border:1px solid #c7a56a40; border-radius:22px 22px 0 0; overflow:hidden; background:radial-gradient(ellipse at center,#123e35,#0b1718 70%); box-shadow:0 25px 55px #0005; }
#bj-scene { position:absolute; inset:0; }
#bj-scene canvas { display:block; width:100%; height:100%; touch-action:pan-y; }
.bj-dealer-label { position:absolute; top:18px; left:50%; transform:translateX(-50%); text-align:center; pointer-events:none; text-shadow:0 2px 5px #000; }
.bj-dealer-label span { display:block; color:#c5ab72; font-size:9px; letter-spacing:.25em; font-weight:800; }
.bj-dealer-label strong { display:block; color:#eee4ca; font-size:12px; margin-top:6px; font-weight:600; }
.bj-shoe-label { position:absolute; right:18px; top:20px; font-size:8px; letter-spacing:.12em; color:#bea57799; pointer-events:none; }
.bj-seat-label { position:absolute; bottom:18px; left:50%; transform:translateX(-50%); padding:6px 15px; border:1px solid #cab37940; border-radius:99px; color:#e6ce9f; background:#09251c80; font-size:9px; letter-spacing:.16em; white-space:nowrap; pointer-events:none; }
.bj-render-note { position:absolute; bottom:40%; left:15%; width:70%; font-size:12px; line-height:1.6; color:#ead9b8; text-align:center; }
.bj-console { position:relative; border:1px solid #c7a56a30; border-top:0; border-radius:0 0 18px 18px; background:linear-gradient(130deg,#211f24,#191a1d); padding:20px 24px 16px; box-shadow:0 20px 45px #0003; }
.bj-status-row { display:flex; align-items:center; justify-content:space-between; gap:16px; }
.bj-kicker { color:#c8a76b; font-size:9px; font-weight:800; letter-spacing:.18em; }
#bj-status { margin:6px 0 0; color:#f2eadc; font-size:14px; line-height:1.5; font-weight:600; }
.bj-round-stake { text-align:right; flex-shrink:0; }
.bj-round-stake span { display:block; color:#968c7d; font-size:8px; letter-spacing:.13em; }
.bj-round-stake strong { display:block; color:#e4c68b; font-size:20px; margin-top:5px; }
.bj-hands { display:flex; gap:10px; margin-top:15px; }
.bj-hand-summary { flex:1; min-width:0; border:1px solid #ffffff12; border-radius:10px; padding:10px 12px; background:#0c111280; }
.bj-hand-summary.active { border-color:#e3c17c; box-shadow:0 0 12px #d3b57512; }
.bj-hand-summary header { display:flex; justify-content:space-between; align-items:center; gap:6px; color:#cfc3ad; font-size:10px; margin-bottom:7px; }
.bj-hand-summary header strong { color:#f4d899; font-size:13px; }
.bj-mini-cards { display:flex; flex-wrap:wrap; gap:4px; }
.bj-mini-card { display:inline-block; background:#f5f0e7; color:#202326; min-width:28px; text-align:center; padding:5px 4px; border-radius:3px; font-family:Georgia,serif; font-size:13px; font-weight:700; box-shadow:0 2px 4px #0004; }
.bj-mini-card.red { color:#b62c33; }
.bj-mini-card.back { color:#d9c898; background:repeating-linear-gradient(45deg,#642833 0 2px,#853543 2px 4px); border:1px solid #d9c89880; }
.bj-dealer-access { display:flex; align-items:center; flex-wrap:wrap; gap:4px; margin-top:10px; color:#a9a191; font-size:10px; }
.bj-dealer-access > span:first-child { margin-right:6px; }
.bj-controls { display:grid; grid-template-columns:220px 1fr; gap:28px; align-items:end; margin-top:18px; padding-top:18px; border-top:1px solid #ffffff0b; }
.bj-betting > label { color:#a49a86; font-size:8px; letter-spacing:.18em; font-weight:800; }
.bj-wager-row { display:flex; align-items:center; gap:7px; margin-top:7px; }
.bj-step { width:31px; height:32px; background:#ffffff06; color:#cab992; border:1px solid #ffffff1c; border-radius:5px; cursor:pointer; }
#bj-wager { min-width:0; width:100%; height:34px; padding:4px 8px; border:1px solid #c7a56a35; border-radius:5px; background:#0b1113; color:#ecd5aa; font-weight:800; text-align:center; user-select:text; }
.bj-chips { display:flex; gap:9px; margin-top:12px; padding:0 4px 4px; }
.bj-chips button { width:34px; height:34px; background:linear-gradient(150deg,#2774b0,#173d63); color:white; border:3px dashed #e7ebef; outline:2px solid #19466b; border-radius:50%; font-size:9px; font-weight:800; box-shadow:0 3px 0 #10141b,0 5px 8px #0008; cursor:pointer; }
.bj-chips button[data-bj-chip="50"] { background:linear-gradient(150deg,#bf4d51,#73272c); outline-color:#73272c; }
.bj-chips button[data-bj-chip="100"] { background:linear-gradient(150deg,#48484b,#171a1c); outline-color:#48484b; }
.bj-chips button[data-bj-chip="500"] { background:linear-gradient(150deg,#a16cba,#4b2b68); outline-color:#4b2b68; }
.bj-deal { display:flex; align-items:center; justify-content:center; gap:25px; padding:13px; width:100%; border-radius:7px; border:1px solid #f8e2ad80; background:linear-gradient(160deg,#e3c18a,#b78d51); box-shadow:inset 0 1px 0 #fff5,0 3px 0 #6b5334; color:#2a241b; font-size:12px; font-weight:900; letter-spacing:.1em; cursor:pointer; }
.bj-play-actions { display:grid; grid-template-columns:repeat(4,1fr); gap:7px; margin-top:11px; }
.bj-play-actions button { background:#ffffff06; border:1px solid #d6bc8630; color:#e7dcc8; padding:11px 8px; border-radius:6px; cursor:pointer; font-size:10px; font-weight:800; }
.bj-play-actions button:not(:disabled):hover { background:#c9a46b22; border-color:#c9a46b; }
.bj-play-actions kbd { margin-left:5px; color:#938a7b; font-size:8px; font-family:inherit; }
#blackjack-view button:disabled { opacity:.35; cursor:not-allowed; }
.bj-rules { margin-top:18px; color:#938c7d; font-size:10px; line-height:1.8; }
.bj-rules summary { cursor:pointer; color:#b6aa92; }
.bj-rules p { margin:10px 0 0; }
@media(max-width:800px) {
    #blackjack-view { padding:18px 10px 28px; }
    .bj-heading { flex-wrap:wrap; gap:12px; }
    .bj-heading h2 { font-size:26px; }
    .bj-heading-actions { margin-left:auto; }
    .bj-stage { height:360px; }
    .bj-shoe-label { display:none; }
    .bj-console { padding:16px 13px; }
    .bj-controls { grid-template-columns:1fr; gap:16px; }
    .bj-betting { display:grid; grid-template-columns:1fr 1fr; gap:8px 16px; align-items:center; }
    .bj-betting > label { grid-column:1 / -1; }
    .bj-wager-row, .bj-chips { margin-top:0; }
    .bj-chips { justify-content:flex-end; gap:7px; }
    .bj-chips button { width:30px; height:30px; }
    #bj-status { font-size:12px; }
    .bj-play-actions kbd { display:none; }
    .bj-play-actions button { padding:13px 6px; }
    .bj-hand-summary { padding:9px; }
}
@media(prefers-reduced-motion:reduce) { #blackjack-view * { scroll-behavior:auto; } }

    </style>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@600;800;900&family=Chakra+Petch:wght@600;700&display=swap" rel="stylesheet">
</head>
<body>
<nav id="club-nav" aria-label="Casino navigation">
    <div class="club-wordmark">PLAYER<small>\u6E38\u620F \xB7 \u8D60\u9001 \xB7 \u501F\u8D37 \xB7 \u94F6\u884C</small></div>
    <div id="club-player-tabs" class="club-tabs" role="tablist" aria-label="Games and bank">
        <button id="tab-roulette" type="button" role="tab" aria-controls="canvas-container" aria-selected="true" data-view="roulette">Roulette</button>
        <button id="tab-slots" type="button" role="tab" aria-controls="slots-view" aria-selected="false" data-view="slots">777 Slots</button>
        <button id="tab-blackjack" type="button" role="tab" aria-controls="blackjack-view" aria-selected="false" data-view="blackjack">Blackjack</button>
        <button id="tab-bank" type="button" role="tab" aria-controls="bank-view" aria-selected="false" data-view="bank">\u94F6\u884C</button>
        <button id="tab-players" type="button" role="tab" aria-controls="players-view" aria-selected="false" data-view="players">\u73A9\u5BB6</button>
        <button id="tab-market" type="button" role="tab" aria-controls="market-view" aria-selected="false" data-view="market">\u9ED1\u5E02\u5546\u4EBA</button>
    </div>
    <div class="club-primary-links"><a href="/player">PLAYER</a><a href="/admin">ADMIN</a></div><div class="club-account"><span class="club-wallet" id="club-wallet">1,000 \u20B5</span><label for="club-user" class="sr-only">Active player</label><select id="club-user" class="club-select" aria-label="Active player"></select></div>
</nav>
<div id="club-migration-note" hidden>\u68C0\u6D4B\u5230\u6B64\u524D\u7684\u672C\u5730\u73A9\u5BB6\u5B58\u6863\u3002\u8BF7\u5148<a href="/admin">\u8FDB\u5165 ADMIN\uFF0C\u8BBE\u7F6E\u901A\u884C\u5BC6\u94A5\u5E76\u5BFC\u5165</a>\uFF0C\u4EE5\u4FDD\u7559\u539F\u6709\u4F59\u989D\u3001\u6B20\u6B3E\u548C\u5361\u5305\u3002</div>
<section id="slots-view" class="club-view" role="tabpanel" aria-labelledby="tab-slots" hidden>

  <!-- 3D WebGL Viewport -->
  <div id="webgl-mount"></div>

  <!-- Crisp Non-Intrusive HUD -->
  <div class="hud-overlay" id="lucky-panels" hidden>

    <!-- Top Bar -->
    <div class="flex flex-wrap items-center justify-between gap-2">
      <!-- Live Readout Pill -->
      <div class="interactive flex items-center gap-3 bg-black/80 backdrop-blur-md border border-amber-400/45 rounded-2xl px-4 py-2 shadow-2xl">
        <div class="pr-3 border-r border-white/15">
          <div class="text-[10px] uppercase tracking-widest text-amber-300/90">Credits</div>
          <div id="uiCredits" class="font-orbitron text-lg sm:text-xl font-black text-emerald-400">1,000</div>
        </div>
        <div class="pr-3 border-r border-white/15">
          <div class="text-[10px] uppercase tracking-widest text-amber-300/90">Active Bet</div>
          <div id="uiBet" class="font-orbitron text-lg sm:text-xl font-black text-yellow-300">100</div>
        </div>
        <div>
          <div class="text-[10px] uppercase tracking-widest text-amber-300/90">Last Win</div>
          <div id="uiWin" class="font-orbitron text-lg sm:text-xl font-black text-amber-400">0</div>
        </div>
        <button id="rebuyBtn" data-machine-action="rebuyCredits()" class="hidden ml-2 px-3 py-1.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black font-orbitron font-black text-xs shadow-lg transition">
          Players & Bank
        </button>
      </div>

      <!-- Center Status Ticker -->
      <div id="statusTicker" role="status" aria-live="polite" class="bg-black/80 backdrop-blur-md border border-amber-400/40 rounded-full px-5 py-2 text-xs sm:text-sm font-bold text-yellow-200 shadow-xl text-center">
        \u{1F579}\uFE0F Grab & pull down the 3D Red Joystick on the right (or press SPACE / SPIN)!
      </div>

      <!-- Camera & Test Controls -->
      <div class="interactive flex items-center gap-2">
        <div class="flex bg-black/80 border border-amber-400/40 rounded-full p-1 text-xs">
          <button id="camPlay" data-machine-action="setCameraView('play')" class="px-3 py-1 rounded-full bg-amber-400 text-black font-bold transition">Play view</button>
          <button id="camLever" data-machine-action="setCameraView('lever')" class="px-3 py-1 rounded-full text-amber-200 hover:bg-white/10 transition">Joystick View</button>
          <button id="camFront" data-machine-action="setCameraView('front')" class="px-3 py-1 rounded-full text-amber-200 hover:bg-white/10 transition">Front</button>
        </div>
        <button type="button" data-machine-action="openBlackMarket()" class="px-3 py-1.5 rounded-full bg-red-950 border border-amber-400 text-xs text-amber-200">\u9ED1\u5E02\u5546\u4EBA</button>
        <button id="muteBtn" data-machine-action="toggleMute()" class="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-xs font-semibold transition">
          \u{1F50A} SFX
        </button>
      </div>
    </div>

    <!-- Right-Side Joystick Tension Meter -->
    <div class="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 pointer-events-none">
      <div class="text-[10px] font-orbitron font-bold tracking-wider text-yellow-300 uppercase bg-black/80 px-2 py-0.5 rounded border border-yellow-500/40">
        Arm Pull
      </div>
      <div class="tension-pill">
        <div id="tensionFill" class="tension-fill"></div>
      </div>
      <div id="tensionPct" class="font-orbitron text-xs font-black text-amber-300">0%</div>
    </div>

    <!-- Bottom Dock: Paytable Reference + 6 Bet Options (10, 50, 100, 500, 1000, ALL IN) -->
    <div class="flex flex-col items-center gap-2">
      <div class="flex flex-wrap justify-center gap-2.5 text-[11px] bg-black/75 backdrop-blur-md border border-amber-400/35 rounded-full px-4 py-1 text-amber-100 shadow-lg">
        <span><b class="text-red-400">777</b> = 50\xD7</span>
        <span>\u2022</span>
        <span><b class="text-sky-300">DIAMOND\xD73</b> = 25\xD7</span>
        <span>\u2022</span>
        <span><b class="text-yellow-300">BAR\xD73</b> = 20\xD7</span>
        <span>\u2022</span>
        <span><b class="text-amber-300">BELL\xD73</b> = 15\xD7</span>
        <span>\u2022</span>
        <span><b class="text-emerald-300">CLOVER\xD73</b> = 10\xD7</span>
        <span>\u2022</span>
        <span><b class="text-rose-400">CHERRY</b> = 5\xD7 / 2\xD7 / 1\xD7</span>
      </div>

      <div class="interactive flex flex-wrap items-center justify-center gap-2 bg-black/85 backdrop-blur-md border-2 border-amber-400/55 rounded-2xl px-3.5 py-2 shadow-2xl">
        <span class="text-[11px] font-orbitron uppercase tracking-wider text-amber-300 mr-1">BET:</span>
        <button class="bet-btn" data-bet="10" data-machine-action="setBetMode(10)">10</button>
        <button class="bet-btn" data-bet="50" data-machine-action="setBetMode(50)">50</button>
        <button class="bet-btn active" data-bet="100" data-machine-action="setBetMode(100)">100</button>
        <button class="bet-btn" data-bet="500" data-machine-action="setBetMode(500)">500</button>
        <button class="bet-btn" data-bet="1000" data-machine-action="setBetMode(1000)">1000</button>
        <button class="bet-btn all-in" data-bet="ALL_IN" data-machine-action="setBetMode('ALL_IN')">\u{1F525} ALL IN</button>
        <div class="h-6 w-[1px] bg-white/20 mx-1"></div>
        <button id="uiSpinBtn" class="spin-cta-btn" data-machine-action="QuickPullAndSpin()">PULL LEVER / SPIN</button>
      </div>
    </div>

  </div>

  <button id="lucky-panel-toggle" type="button" aria-controls="lucky-panels" aria-expanded="false">Show controls</button><button id="lucky-custom-toggle" type="button" aria-controls="lucky-custom-panel" aria-expanded="false">Custom bet</button><div id="lucky-custom-panel" hidden><form id="lucky-custom-form" class="custom-bet-form" novalidate><label for="lucky-custom-amount">Custom bet \xB7 1\u20131,000,000 chips</label><input id="lucky-custom-amount" type="number" min="1" max="1000000" step="1" inputmode="numeric" value="100" required><button id="lucky-custom-apply" type="submit">Use amount</button></form></div><div id="lucky-armed-card" hidden><span id="lucky-card-label"></span><button id="lucky-card-cancel" type="button">\u53D6\u6D88\u88C5\u5907</button></div><p id="lucky-touch-hint">Tap a bet button \xB7 Pull the red lever</p><p id="lucky-accessible-result" class="lucky-sr-only" role="status" aria-live="polite"></p></section>
<section id="blackjack-view" class="club-view" role="tabpanel" aria-labelledby="tab-blackjack" hidden>
    <div class="bj-shell">
        <header class="bj-heading"><div><div class="club-eyebrow">The Reserve \xB7 Six-deck classic</div><h2>BLACKJACK <span>21</span></h2></div><div class="bj-heading-actions"><button type="button" id="bj-camera" class="bj-small-btn">View: Player</button><button type="button" id="bj-sound" class="bj-small-btn" aria-pressed="false">Sound: On</button><button type="button" class="bj-small-btn" data-go-bank>Bank \u2197</button></div></header>
        <div class="bj-stage">
            <div id="bj-scene" aria-hidden="true"></div>
            <div class="bj-dealer-label"><span>DEALER</span><strong id="bj-dealer-total">Waiting for the deal</strong></div>
            <div class="bj-shoe-label">6 DECKS \xB7 SHUFFLED SHOE</div>
            <div class="bj-seat-label" id="bj-seat-name">YOUR SEAT</div>
            <p id="bj-render-note" class="bj-render-note" hidden></p>
        </div>
        <div class="bj-console">
            <div class="bj-status-row"><div><span class="bj-kicker" id="bj-turn">PLACE YOUR BET</span><p id="bj-status" role="status" aria-live="polite" aria-atomic="true">Choose your chips, then deal yourself in.</p></div><div class="bj-round-stake"><span>ON THE TABLE</span><strong id="bj-stake">0 \u20B5</strong></div></div>
            <div class="bj-hands" id="bj-hands" aria-label="Your blackjack hands"></div>
            <div class="bj-dealer-access" id="bj-dealer-access" aria-label="Dealer cards"></div>
            <div class="bj-controls">
                <div class="bj-betting"><label for="bj-wager">CUSTOM BET / CHIPS</label><div class="bj-wager-row"><button type="button" id="bj-bet-minus" class="bj-step" aria-label="Decrease wager by 10">\u2212</button><input type="number" id="bj-wager" min="1" max="1000000" step="1" inputmode="numeric" value="50" aria-label="Blackjack wager in chips"><button type="button" id="bj-bet-plus" class="bj-step" aria-label="Increase wager by 10">+</button></div><p class="club-muted">Enter any whole amount \xB7 1\u20131,000,000 chips</p><div class="bj-chips" aria-label="Add chips to your wager"><button type="button" data-bj-chip="10">10</button><button type="button" data-bj-chip="50">50</button><button type="button" data-bj-chip="100">100</button><button type="button" data-bj-chip="500">500</button></div></div>
                <div class="bj-moves"><button type="button" id="bj-deal" class="bj-deal">DEAL CARDS <span>\u2192</span></button><div class="bj-play-actions"><button type="button" id="bj-hit" disabled>HIT <kbd>H</kbd></button><button type="button" id="bj-stand" disabled>STAND <kbd>S</kbd></button><button type="button" id="bj-double" disabled>DOUBLE <kbd>D</kbd></button><button type="button" id="bj-split" disabled>SPLIT <kbd>P</kbd></button></div></div>
            </div>
            <details class="bj-rules"><summary>Table rules & payouts</summary><p>Blackjack pays 3:2. Other wins pay 1:1; ties return your stake. Dealer stands on all 17s, including soft 17, and checks for blackjack on the deal. Double on any first two cards, including after a split. Split equal-value cards once into two hands. Split aces receive one card each. A split-hand 21 pays 1:1. No insurance or surrender. Custom bets: 1\u20131,000,000 whole chips. Odd blackjack wagers round half-chip payouts down.</p><p>Winnings are credited to your player wallet. Leave and return to resume an unfinished hand.</p></details>
        </div>
    </div>
</section>

<section id="market-view" class="club-view" role="tabpanel" aria-labelledby="tab-market" hidden>
    <div class="club-shell">
        <div class="club-eyebrow">The back room \xB7 \u9ED1\u5E02</div><h2 class="club-title">\u9ED1\u5E02\u5546\u4EBA</h2>
        <p class="club-muted">\u82B1\u9AD8\u4EF7\u4E70\u786E\u5B9A\u7684\u7ED3\u679C\u3002\u6BCF\u5F20\u5361\u53EA\u7528\u4E00\u6B21\uFF0C\u7ED1\u5B9A\u8D2D\u4E70\u65F6\u7684\u4E0B\u6CE8\u91D1\u989D\uFF1B\u88C5\u5907\u540E\uFF0C\u4E0B\u4E00\u6B21 777 \u65CB\u8F6C\u81EA\u52A8\u4F7F\u7528\u3002</p>
        <div class="market-terms"><strong>\u5361\u4EF7\u4E0D\u5305\u542B\u4E0B\u6CE8\u3002</strong> \u4F7F\u7528\u65F6\u4ECD\u9700\u652F\u4ED8\u7ED1\u5B9A\u4E0B\u6CE8\u3002\u4EF7\u683C\u4F4E\u4E8E\u4FDD\u5E95\u6D3E\u5F69\uFF0C\u80FD\u83B7\u5F97\u51C0\u6536\u76CA\uFF1B\u6BCF\u4F4D\u73A9\u5BB6\u8D2D\u4E70\u4EFB\u610F\u5361\u540E\u51B7\u5374 15 \u5206\u949F\uFF0C\u8D2D\u4E70\u65F6\u987B\u7559\u8DB3\u4E0B\u6CE8\u7B79\u7801\u3002</div>
        <label class="club-field" for="market-stake">\u5361\u7247\u7ED1\u5B9A\u4E0B\u6CE8 / \u7B79\u7801</label>
        <input id="market-stake" class="club-input market-stake" type="number" min="1" max="1000000" step="1" value="100" inputmode="numeric" aria-describedby="market-price-note">
        <p id="market-price-note" class="club-muted">\u8F93\u5165\u91D1\u989D\u540E\u67E5\u770B\u5361\u4EF7\u548C\u6D3E\u5F69\u3002\u4F8B\uFF1A\u7ED1\u5B9A 100 \u7684 777 \u5361\u552E\u4EF7 3,500\uFF0C\u53E6\u6263 100 \u4E0B\u6CE8\u540E\u8FD4\u56DE 5,000\uFF0C\u51C0\u8D5A 1,400\u3002</p>
        <p id="market-cooldown" class="club-muted" role="status"></p><div id="market-catalog" class="market-catalog" aria-label="\u51FA\u552E\u4E2D\u7684\u4FDD\u5E95\u5361"></div>
        <div class="club-card market-inventory"><h3>\u6211\u7684\u5361\u5305</h3><p class="club-muted">\u5361\u7247\u5F52\u5F53\u524D\u73A9\u5BB6\u6240\u6709\uFF0C\u5237\u65B0\u540E\u4FDD\u7559\u3002\u672A\u6210\u529F\u5F00\u5C40\u4E0D\u4F1A\u6D88\u8017\u5361\u7247\u3002</p><div id="market-inventory" aria-live="polite"></div></div>
    </div>
</section>

<section id="admin-view" class="club-view" aria-label="\u7BA1\u7406\u5458\u5165\u53E3" hidden>
  <div class="club-shell"><div class="club-eyebrow">ADMIN \xB7 \u4EC5\u7BA1\u7406\u5458</div><h2 class="club-title">\u73A9\u5BB6\u7BA1\u7406</h2>
    <p class="club-muted">\u6DFB\u52A0\u3001\u5220\u9664\u73A9\u5BB6\u548C\u589E\u51CF\u7B79\u7801\u5747\u7531\u670D\u52A1\u5668\u9A8C\u8BC1\u7BA1\u7406\u6743\u9650\u3002\u4F7F\u7528 Windows Hello \u901A\u884C\u5BC6\u94A5\u89E3\u9501\uFF0C\u7BA1\u7406\u4F1A\u8BDD 15 \u5206\u949F\u540E\u5230\u671F\u3002</p>
    <div class="club-card" id="admin-login"><h3>Windows Hello \u9A8C\u8BC1</h3><p id="admin-auth-status" class="club-muted" role="status">\u6B63\u5728\u68C0\u67E5\u7BA1\u7406\u72B6\u6001\u2026</p>
      <div class="club-actions"><button id="admin-enroll" type="button" class="club-action" hidden>\u9996\u6B21\u8BBE\u7F6E Windows Hello \u901A\u884C\u5BC6\u94A5</button><button id="admin-signin" type="button" class="club-action" hidden>\u4F7F\u7528 Windows Hello \u89E3\u9501</button></div>
      <p class="club-muted">\u7CFB\u7EDF\u4F1A\u8981\u6C42\u6307\u7EB9\u3001\u4EBA\u8138\u6216\u8BBE\u5907 PIN\u3002\u7F51\u7AD9\u4E0D\u4F1A\u8BFB\u53D6\u6216\u4FDD\u5B58 Windows \u5BC6\u7801\u3001PIN \u6216\u751F\u7269\u8BC6\u522B\u4FE1\u606F\u3002</p>
    </div>
    <p id="admin-message" role="status" class="club-storage"></p>
    <div id="admin-panel" hidden>
      <div class="club-actions"><button type="button" class="club-action secondary" id="admin-lock">\u9501\u5B9A\u7BA1\u7406\u5165\u53E3</button><a class="club-action secondary" href="/player">\u8FD4\u56DE PLAYER</a></div>
      <div id="admin-legacy" class="club-card" hidden><h3>\u5BFC\u5165\u65E7\u73A9\u5BB6\u5B58\u6863</h3><p class="club-muted">\u53D1\u73B0\u6B64\u524D\u4FDD\u5B58\u5728\u6B64\u6D4F\u89C8\u5668\u7684\u73A9\u5BB6\u6570\u636E\u3002\u5BFC\u5165\u4F1A\u4FDD\u7559\u539F\u672C\u5730\u5907\u4EFD\uFF0C\u5E76\u53EA\u5728\u670D\u52A1\u5668\u5C1A\u672A\u4EA7\u751F\u65B0\u8BB0\u5F55\u65F6\u5141\u8BB8\u6267\u884C\u3002</p><button id="admin-import" type="button" class="club-action">\u5BFC\u5165\u5F53\u524D\u6D4F\u89C8\u5668\u65E7\u5B58\u6863</button></div>
      <div class="club-grid">
        <form id="admin-adjust-form" class="club-card"><h3>\u589E\u52A0 / \u6263\u9664\u7B79\u7801</h3>
          <label for="admin-adjust-player" class="club-field">\u76EE\u6807\u73A9\u5BB6</label><select id="admin-adjust-player" class="club-select" required></select>
          <label for="admin-adjust-mode" class="club-field">\u8C03\u6574\u65B9\u5F0F</label><select id="admin-adjust-mode" class="club-select"><option value="add">\u589E\u52A0\u7B79\u7801</option><option value="remove">\u6263\u9664\u7B79\u7801</option></select>
          <label for="admin-adjust-amount" class="club-field">\u91D1\u989D / \u7B79\u7801</label><input id="admin-adjust-amount" type="number" class="club-input" min="1" max="1000000000" step="1" inputmode="numeric" required>
          <label for="admin-adjust-reason" class="club-field">\u5907\u6CE8\uFF08\u53EF\u9009\uFF09</label><input id="admin-adjust-reason" class="club-input" type="text" maxlength="120" placeholder="\u4F8B\u5982\u5956\u52B1\u3001\u4FEE\u6B63\u4F59\u989D">
          <div class="club-actions"><button type="submit" class="club-action" data-admin-action>\u786E\u8BA4\u8C03\u6574\u5E76\u8BB0\u5F55</button></div>
        </form>
        <form id="player-form" class="club-card"><h3>\u6DFB\u52A0\u73A9\u5BB6</h3><p class="club-muted">\u65B0\u73A9\u5BB6\u521D\u59CB 1,000 \u7B79\u7801\uFF1B\u53EF\u518D\u901A\u8FC7\u4F59\u989D\u8C03\u6574\u4FEE\u6539\u3002\u6700\u591A 12 \u4F4D\u73A9\u5BB6\u3002</p><label class="club-field" for="player-name">\u65B0\u73A9\u5BB6\u540D\u79F0</label><input id="player-name" class="club-input" type="text" maxlength="24" required placeholder="\u73A9\u5BB6\u540D\u79F0"><div class="club-actions"><button type="submit" class="club-action" data-admin-action>\u6DFB\u52A0\u73A9\u5BB6</button></div></form>
        <div class="club-card club-wide"><h3>\u73A9\u5BB6\u5217\u8868</h3><p class="club-muted">\u5220\u9664\u9700\u8981\u518D\u6B21\u786E\u8BA4\u3002\u5B58\u5728\u672A\u6E05\u6B20\u6B3E\u3001\u501F\u51FA\u6B3E\u3001\u5F85\u786E\u8BA4\u534F\u8BAE\u6216\u672A\u7ED3\u7B97\u6E38\u620F\u65F6\u987B\u5148\u5904\u7406\uFF0C\u6700\u540E\u4E00\u540D\u73A9\u5BB6\u4E0D\u80FD\u5220\u9664\u3002</p><div class="club-account-list" id="club-player-list"></div></div>
      </div>
    </div>
  </div>
</section>

<section id="players-view" class="club-view" role="tabpanel" aria-labelledby="tab-players" hidden>
  <div class="club-shell"><div class="club-eyebrow">Players \xB7 \u73A9\u5BB6</div><h2 id="players-greeting" class="club-title">\u73A9\u5BB6\u5F80\u6765</h2>
    <p class="club-muted">\u8D60\u9001\u76F4\u63A5\u5230\u8D26\uFF1B\u501F\u6B3E\u7531\u51FA\u501F\u4EBA\u8BBE\u5B9A\u6761\u6B3E\u3001\u501F\u6B3E\u4EBA\u786E\u8BA4\u540E\u624D\u8F6C\u8D26\u3002\u53CC\u65B9\u901A\u8FC7\u53F3\u4E0A\u89D2\u9009\u62E9\u73A9\u5BB6\u5206\u522B\u64CD\u4F5C\uFF1B\u8D26\u6237\u53D8\u66F4\u7531\u670D\u52A1\u5668\u4FDD\u5B58\u3002\u73A9\u5BB6\u7BA1\u7406\u4EC5\u5728 ADMIN \u5165\u53E3\u5F00\u653E\u3002</p>
    <dl class="club-stat-row"><div><dt>\u94B1\u5305</dt><dd id="players-wallet">0</dd></div><div><dt>\u6B20\u5176\u4ED6\u73A9\u5BB6</dt><dd id="peer-debt">0</dd></div><div><dt>\u5E94\u6536\u501F\u6B3E</dt><dd id="peer-receivable">0</dd></div></dl>
    <div class="club-grid">
      <form id="transfer-form" class="club-card"><h3>\u8D60\u9001\u7B79\u7801</h3><p class="club-muted">\u8FD9\u662F\u8D60\u9001\uFF0C\u4E0D\u4EA7\u751F\u6B20\u6B3E\uFF0C\u786E\u8BA4\u8D60\u9001\u540E\u7ACB\u5373\u8F6C\u5165\u5BF9\u65B9\u94B1\u5305\u3002</p>
        <label class="club-field" for="transfer-user">\u6536\u6B3E\u73A9\u5BB6</label><select id="transfer-user" class="club-select" required></select>
        <label class="club-field" for="transfer-amount">\u8D60\u9001\u91D1\u989D</label><input id="transfer-amount" class="club-input" type="number" min="1" max="1000000" step="1" inputmode="numeric" required placeholder="\u4F8B\u5982 100">
        <div class="club-actions"><button type="submit" class="club-action" data-idle-only>\u786E\u8BA4\u8D60\u9001 \u2192</button></div>
      </form>
      <form id="peer-loan-form" class="club-card"><h3>\u5411\u73A9\u5BB6\u51FA\u501F</h3><p class="club-muted">\u5F53\u524D\u73A9\u5BB6\u4E3A\u51FA\u501F\u4EBA\u3002\u8BBE\u5B9A\u91D1\u989D\u3001\u5468\u671F\u53CA\u5229\u7387\u540E\u53D1\u51FA\u534F\u8BAE\uFF1B\u5BF9\u65B9\u63A5\u53D7\u524D\u4E0D\u6263\u6B3E\u3001\u4E0D\u8BA1\u606F\u3002\u63A5\u53D7\u65F6\u91CD\u65B0\u68C0\u67E5\u53CC\u65B9\u4F59\u989D\u3002</p>
        <label class="club-field" for="peer-loan-user">\u501F\u6B3E\u4EBA</label><select id="peer-loan-user" class="club-select" required></select>
        <label class="club-field" for="peer-loan-amount">\u501F\u6B3E\u91D1\u989D</label><input id="peer-loan-amount" class="club-input" type="number" min="1" max="1000000" step="1" required inputmode="numeric" placeholder="\u4F8B\u5982 1,000">
        <div class="loan-term-inputs"><div><label class="club-field" for="peer-loan-minutes">\u6BCF\u9694\u591A\u5C11\u5206\u949F</label><input id="peer-loan-minutes" class="club-input" type="number" min="1" max="1440" step="1" value="10" required></div><div><label class="club-field" for="peer-loan-rate">\u6BCF\u671F\u5229\u7387 / %</label><input id="peer-loan-rate" class="club-input" type="number" min="0" max="100" step="0.01" value="1" required></div></div>
        <div class="club-actions"><button type="submit" class="club-action" data-idle-only>\u53D1\u51FA\u501F\u6B3E\u534F\u8BAE</button></div>
      </form>
      <div class="club-card club-wide"><h3>\u501F\u6B3E\u534F\u8BAE\u4E0E\u8FD8\u6B3E</h3><p class="club-muted">\u5207\u6362\u5230\u501F\u6B3E\u4EBA\u540E\u53EF\u63A5\u53D7\u6216\u62D2\u7EDD\u3002\u751F\u6548\u540E\u6309\u73B0\u5B9E\u65F6\u95F4\u590D\u5229\u8BA1\u606F\uFF0C\u79BB\u7EBF\u4E5F\u8BA1\u606F\uFF1B\u8FD8\u6B3E\u76F4\u63A5\u8FDB\u5165\u51FA\u501F\u4EBA\u94B1\u5305\u3002</p><div id="peer-loan-list" aria-live="polite"></div></div>

    </div>
  </div>
</section>
<section id="bank-view" class="club-view" role="tabpanel" aria-labelledby="tab-bank" hidden>
  <div class="club-shell"><div class="club-eyebrow">Bank \xB7 \u5F53\u524D\u73A9\u5BB6\u8D26\u6237</div><h2 class="club-title" id="bank-greeting">\u94F6\u884C</h2>
    <p class="club-muted">\u5F53\u524D\u73A9\u5BB6\u7684\u94F6\u884C\u501F\u8FD8\u6B3E\u4E0E\u9AD8\u5229\u8D37\u3002\u5229\u606F\u6309\u73B0\u5B9E\u65F6\u95F4\u8BA1\u7B97\uFF0C\u79BB\u7EBF\u65F6\u7EE7\u7EED\u7D2F\u8BA1\uFF0C\u91CD\u65B0\u6253\u5F00\u65F6\u7ED3\u7B97\uFF1B\u672C\u91D1\u4E0E\u5229\u606F\u5747\u6309\u6574\u679A\u7B79\u7801\u8BA1\uFF0C\u6BCF\u671F\u5229\u606F\u5411\u4E0A\u53D6\u6574\u3002</p><p class="club-storage" id="club-storage-note" role="status"></p>
    <dl class="club-stat-row"><div><dt>\u94B1\u5305 / \u7B79\u7801</dt><dd id="bank-wallet">1,000</dd></div><div><dt>\u94F6\u884C\u6B20\u6B3E</dt><dd id="bank-debt">0</dd></div><div><dt>\u94F6\u884C\u53EF\u501F\u989D\u5EA6</dt><dd id="bank-credit">100,000</dd></div></dl>
    <p class="club-muted">\u94F6\u884C + \u9AD8\u5229\u8D37\u603B\u6B20\u6B3E\uFF1A<strong id="bank-total-debt">0</strong> \u7B79\u7801\u3002\u5229\u606F\u52A0\u5165\u6B20\u6B3E\uFF0C\u53EF\u80FD\u8D85\u8FC7\u501F\u6B3E\u4E0A\u9650\u3002</p>
    <div class="club-grid">
      <form id="bank-form" class="club-card club-wide"><h3>\u94F6\u884C\u501F\u6B3E\u4E0E\u8FD8\u6B3E</h3><p class="club-muted">\u501F\u6B3E\u989D\u5EA6 100,000\uFF1B\u6BCF 30 \u5206\u949F\uFF0C\u672A\u8FD8\u6B20\u6B3E\u52A0 0.5%\u3002\u8FD8\u6B3E\u6062\u590D\u53EF\u501F\u989D\u5EA6\u3002</p><p id="bank-interest-progress" class="club-muted"></p>
        <label class="club-field" for="bank-amount">\u91D1\u989D / \u7B79\u7801</label><input id="bank-amount" class="club-input" type="number" min="1" max="1000000000" step="1" inputmode="numeric" required placeholder="\u4F8B\u5982 500">
        <div class="club-actions"><button id="bank-borrow" type="submit" class="club-action" value="borrow" data-idle-only>\u5411\u94F6\u884C\u501F\u6B3E</button><button type="submit" class="club-action secondary" value="repay" data-idle-only>\u507F\u8FD8\u94F6\u884C\u6B20\u6B3E</button></div>
      </form>
      <div id="shark-panel" class="club-card shark-panel club-wide" hidden><div class="club-eyebrow">\u6700\u540E\u7684\u7B79\u7801</div><h3>\u9AD8\u5229\u8D37</h3><p class="club-muted">\u6700\u591A\u501F 1,500,000\uFF1B\u6BCF 5 \u5206\u949F\uFF0C\u672A\u8FD8\u6B20\u6B3E\u52A0 10%\u3002\u53EA\u6709\u94F6\u884C\u989D\u5EA6\u8017\u5C3D\u3001\u94B1\u5305 \u2264 0 \u4E14\u65E0\u672A\u7ED3\u7B97\u4E0B\u6CE8\u65F6\u5F00\u653E\u501F\u6B3E\u3002</p><p>\u9AD8\u5229\u8D37\u6B20\u6B3E\uFF1A<strong id="shark-debt">0</strong> \xB7 \u5269\u4F59\u989D\u5EA6\uFF1A<strong id="shark-credit">1,500,000</strong></p><p id="shark-progress" class="club-muted"></p>
        <div id="shark-offer" hidden><form id="shark-borrow-form"><label class="club-field" for="shark-borrow-amount">\u501F\u5165\u91D1\u989D</label><input id="shark-borrow-amount" class="club-input" type="number" min="1" max="1500000" step="1" required inputmode="numeric" placeholder="\u6700\u591A 1,500,000"><div class="club-actions"><button type="submit" class="club-action" data-idle-only>\u501F\u5165\u9AD8\u5229\u8D37 \xB7 \u6BCF 5 \u5206\u949F 10%</button></div></form></div>
        <div id="shark-repayment" hidden><form id="shark-repay-form"><label class="club-field" for="shark-repay-amount">\u507F\u8FD8\u9AD8\u5229\u8D37</label><input id="shark-repay-amount" class="club-input" type="number" min="1" max="1000000000" step="1" required inputmode="numeric" placeholder="\u8FD8\u6B3E\u91D1\u989D"><div class="club-actions"><button type="submit" class="club-action secondary" data-idle-only>\u507F\u8FD8\u9AD8\u5229\u8D37</button></div></form></div>
      </div>
      <div class="club-card club-wide"><h3>\u8D26\u6237\u6D3B\u52A8</h3><ol id="club-ledger" class="club-ledger" aria-label="Table activity"></ol></div>
    </div>
  </div>
</section>
<div id="club-toast" role="status" aria-live="polite" aria-atomic="true" hidden></div>


    <!-- 3D Scene Container -->
    <div id="canvas-container"></div>

    <!-- Top HUD Bar -->
    <div class="club-roulette-hud fixed top-0 left-0 right-0 z-20 p-2.5 sm:p-4 pointer-events-none flex flex-wrap items-center justify-between gap-2">
        <!-- Left: Brand & Visual Mode Toggle -->
        <div class="flex flex-wrap items-center gap-2 pointer-events-auto">
            <div class="glass-panel px-3.5 py-2 rounded-xl flex items-center gap-2.5">
                <div class="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_10px_#fbbf24]"></div>
                <div>
                    <h1 class="text-xs sm:text-sm font-black tracking-wider uppercase text-amber-300 leading-none">VR Low-Poly Roulette</h1>
                    <p class="text-[10px] text-slate-400 mt-0.5">Flick Golden Turret or Hold Spin</p>
                </div>
            </div>

            <!-- Mode Toggle: Image Mode vs Classic Mode -->
            <button id="mode-toggle-btn" class="glass-panel px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:border-amber-400/50 transition">
                <span class="w-2.5 h-2.5 rounded-full bg-red-500" id="mode-dot"></span>
                <span id="mode-label">Image Mode (23 Red Frames / 1 Green)</span>
            </button>

            <!-- Camera View Toggle -->
            <button id="camera-toggle-btn" class="glass-panel px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-amber-300 hover:border-amber-400/50 transition flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
                <span id="camera-label">View: Screenshot Angle</span>
            </button>

            <!-- Labels 3D Toggle -->
            <button id="labels-toggle-btn" class="glass-panel px-2.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-amber-300 transition">
                <span id="labels-label"># Numbers: ON</span>
            </button>

            <!-- Audio Toggle -->
            <button id="audio-toggle-btn" class="glass-panel px-2.5 py-2 rounded-xl text-xs font-semibold text-amber-300 hover:border-amber-400/50 transition" title="Toggle Sound Effects">
                <span id="audio-label">\u{1F50A} SFX</span>
            </button>
        </div>

        <!-- Right: History Ribbon -->
        <div class="glass-panel px-3 py-1.5 rounded-xl flex items-center gap-2 pointer-events-auto">
            <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">History</span>
            <div id="history-ribbon" class="flex items-center gap-1.5 min-w-[120px] justify-end">
                <span class="text-xs text-slate-500 italic">No spins yet</span>
            </div>
        </div>
    </div>

    <!-- Center Result Banner / Live Spin Telemetry -->
    <div id="status-banner" class="fixed top-16 sm:top-20 left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-all duration-300 opacity-0 scale-95">
        <div class="glass-panel px-6 py-3 rounded-2xl border-amber-400/40 text-center flex flex-col items-center gap-1 shadow-2xl">
            <div id="banner-badge" class="px-3 py-0.5 rounded-full text-xs font-extrabold uppercase tracking-widest bg-amber-500/20 text-amber-300">
                Spin Result
            </div>
            <div id="banner-title" class="text-xl sm:text-2xl font-black text-white tracking-tight">
                POCKET 0 - GREEN
            </div>
            <div id="banner-subtitle" class="text-xs sm:text-sm font-semibold text-emerald-400">
                +240 CHIPS WON!
            </div>
        </div>
    </div>

    <!-- Interactive Hint Pill -->
    <div id="hint-pill" class="fixed top-16 sm:top-20 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <div class="bg-black/45 backdrop-blur-md border border-white/10 px-3.5 py-1 rounded-full text-[11px] text-amber-200/90 flex items-center gap-2 shadow-lg">
            <span class="inline-block w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            <span id="hint-text">Grab & flick the glowing golden cross in 3D, or hold the SPIN button below!</span>
        </div>
    </div>

    <!-- Number Picker Modal (24 Pockets) -->
    <div id="number-modal" class="fixed inset-0 z-30 bg-black/65 backdrop-blur-sm hidden items-center justify-center p-4">
        <div class="glass-panel max-w-lg w-full rounded-2xl p-4 sm:p-5 border border-amber-400/30 shadow-2xl">
            <div class="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                <div>
                    <h2 class="text-sm sm:text-base font-black text-amber-300 uppercase tracking-wider">Straight-Up Pocket Bets (24x Payout)</h2>
                    <p class="text-xs text-slate-400">Click any pocket number (0\u201323) to place your selected chip</p>
                </div>
                <button id="close-number-modal" class="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200">
                    Done \u2715
                </button>
            </div>
            <div id="number-grid" class="grid grid-cols-6 gap-2 max-h-[60vh] overflow-y-auto p-1">
                <!-- Populated by JS -->
            </div>
        </div>
    </div>

    <!-- Bottom Betting & Control HUD -->
    <div id="roulette-controls" class="fixed bottom-0 left-0 right-0 z-20 p-2 sm:p-3.5 pointer-events-none flex justify-center">
        <div class="glass-panel w-full max-w-5xl rounded-2xl p-2.5 sm:p-3.5 pointer-events-auto flex flex-col gap-2.5">
            
            <!-- Top Row: Balance, Chip Selector, Action Buttons -->
            <div class="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2">
                <!-- Balance & Total Bet -->
                <div class="flex items-center gap-3">
                    <div class="bg-slate-950/70 border border-amber-500/30 px-3 py-1.5 rounded-xl flex items-center gap-2">
                        <div class="w-5 h-5 rounded-full bg-gradient-to-br from-amber-300 to-amber-600 flex items-center justify-center text-[10px] font-black text-slate-950 shadow">\u20B5</div>
                        <div>
                            <div class="text-[9px] uppercase tracking-wider text-slate-400 font-bold leading-none">Chips Balance</div>
                            <div id="balance-display" class="text-sm sm:text-base font-black text-amber-300 leading-tight">1,000</div>
                        </div>
                        <button id="reset-chips-btn" class="ml-1 px-1.5 py-0.5 rounded bg-amber-500/20 hover:bg-amber-500/35 text-amber-300 text-[10px] font-bold transition" title="Refill to 1,000 Chips">
                            +Reset
                        </button>
                    </div>

                    <div class="bg-slate-950/70 border border-white/10 px-3 py-1.5 rounded-xl">
                        <div class="text-[9px] uppercase tracking-wider text-slate-400 font-bold leading-none">Active Bet</div>
                        <div id="current-bet-display" class="text-sm sm:text-base font-black text-white leading-tight">0</div>
                    </div>
                </div>

                <!-- Chip Selector -->
                <div class="flex items-center gap-1.5 sm:gap-2">
                    <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 hidden md:inline mr-1">Chip:</span>
                    <button data-chip="10" class="chip-btn active w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-b from-blue-500 to-blue-700 border-2 border-dashed border-white/80 text-[11px] font-black text-white shadow flex items-center justify-center">10</button>
                    <button data-chip="50" class="chip-btn w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-b from-emerald-500 to-emerald-700 border-2 border-dashed border-white/80 text-[11px] font-black text-white shadow flex items-center justify-center">50</button>
                    <button data-chip="100" class="chip-btn w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-b from-rose-500 to-rose-700 border-2 border-dashed border-white/80 text-[11px] font-black text-white shadow flex items-center justify-center">100</button>
                    <button data-chip="500" class="chip-btn w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-b from-purple-500 to-purple-800 border-2 border-dashed border-white/80 text-[11px] font-black text-white shadow flex items-center justify-center">500</button>
                    <button data-chip="ALL" class="chip-btn px-2.5 h-8 sm:h-9 rounded-full bg-gradient-to-b from-amber-400 to-amber-600 border-2 border-white text-[10px] font-black text-slate-950 shadow flex items-center justify-center">ALL IN</button>
                </div>

                <form id="roulette-custom-form" class="custom-bet-form" novalidate>
                    <label for="roulette-custom-amount">Custom bet</label>
                    <input id="roulette-custom-amount" type="number" min="1" max="1000000" step="1" inputmode="numeric" placeholder="Amount" required aria-describedby="roulette-custom-selected">
                    <button id="roulette-custom-apply" type="submit">Use amount</button>
                    <span id="roulette-custom-selected">1\u20131,000,000 chips per bet</span>
                </form>
                <!-- Clear / Rebet -->
                <div class="flex items-center gap-1.5">
                    <button id="rebet-btn" class="px-2.5 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-white/10 text-xs font-bold text-slate-200 transition">
                        \u21BB Rebet
                    </button>
                    <button id="clear-bets-btn" class="px-2.5 py-1.5 rounded-xl bg-slate-800/90 hover:bg-rose-950/80 border border-white/10 hover:border-rose-500/40 text-xs font-bold text-slate-300 hover:text-rose-200 transition">
                        \u2715 Clear
                    </button>
                </div>
            </div>

            <!-- Bottom Row: Betting Spots + Hold-to-Spin Power Button -->
            <div class="grid grid-cols-2 sm:grid-cols-7 gap-2 items-stretch">
                <!-- RED BET -->
                <button data-bet="RED" class="bet-spot group rounded-xl bg-gradient-to-b from-red-600/90 to-red-800/95 border border-red-400/40 p-2 flex flex-col justify-between items-center text-center shadow">
                    <div class="flex items-center justify-between w-full">
                        <span class="text-[10px] font-extrabold uppercase tracking-wider text-red-200">Red</span>
                        <span id="red-odds-label" class="text-[10px] font-bold bg-black/30 px-1.5 py-0.5 rounded text-amber-300">2x</span>
                    </div>
                    <div class="text-xs sm:text-sm font-black text-white my-0.5">RED POCKETS</div>
                    <div id="bet-badge-RED" class="hidden px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black shadow">0</div>
                </button>

                <!-- BLACK / DARK BET -->
                <button data-bet="BLACK" class="bet-spot group rounded-xl bg-gradient-to-b from-zinc-700/90 to-zinc-900/95 border border-zinc-400/30 p-2 flex flex-col justify-between items-center text-center shadow">
                    <div class="flex items-center justify-between w-full">
                        <span class="text-[10px] font-extrabold uppercase tracking-wider text-zinc-300">Black / Dark</span>
                        <span class="text-[10px] font-bold bg-black/40 px-1.5 py-0.5 rounded text-amber-300">2x</span>
                    </div>
                    <div class="text-xs sm:text-sm font-black text-white my-0.5">DARK / EVEN</div>
                    <div id="bet-badge-BLACK" class="hidden px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black shadow">0</div>
                </button>

                <!-- GREEN ZERO BET -->
                <button data-bet="GREEN" class="bet-spot group rounded-xl bg-gradient-to-b from-emerald-600/90 to-emerald-800/95 border border-emerald-400/40 p-2 flex flex-col justify-between items-center text-center shadow">
                    <div class="flex items-center justify-between w-full">
                        <span class="text-[10px] font-extrabold uppercase tracking-wider text-emerald-200">Zero</span>
                        <span class="text-[10px] font-bold bg-black/30 px-1.5 py-0.5 rounded text-amber-300">24x</span>
                    </div>
                    <div class="text-xs sm:text-sm font-black text-white my-0.5">GREEN (0)</div>
                    <div id="bet-badge-GREEN" class="hidden px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black shadow">0</div>
                </button>

                <!-- ODD BET -->
                <button data-bet="ODD" class="bet-spot group rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-white/15 p-2 flex flex-col justify-between items-center text-center shadow">
                    <div class="flex items-center justify-between w-full">
                        <span class="text-[10px] font-extrabold uppercase tracking-wider text-slate-300">1, 3, 5...</span>
                        <span class="text-[10px] font-bold bg-black/30 px-1.5 py-0.5 rounded text-amber-300">2x</span>
                    </div>
                    <div class="text-xs sm:text-sm font-black text-white my-0.5">ODD</div>
                    <div id="bet-badge-ODD" class="hidden px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black shadow">0</div>
                </button>

                <!-- EVEN BET -->
                <button data-bet="EVEN" class="bet-spot group rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-white/15 p-2 flex flex-col justify-between items-center text-center shadow">
                    <div class="flex items-center justify-between w-full">
                        <span class="text-[10px] font-extrabold uppercase tracking-wider text-slate-300">2, 4, 6...</span>
                        <span class="text-[10px] font-bold bg-black/30 px-1.5 py-0.5 rounded text-amber-300">2x</span>
                    </div>
                    <div class="text-xs sm:text-sm font-black text-white my-0.5">EVEN</div>
                    <div id="bet-badge-EVEN" class="hidden px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black shadow">0</div>
                </button>

                <!-- PICK INDIVIDUAL POCKET NUMBER -->
                <button id="open-number-modal-btn" class="bet-spot group rounded-xl bg-indigo-950/90 hover:bg-indigo-900/90 border border-indigo-400/35 p-2 flex flex-col justify-between items-center text-center shadow">
                    <div class="flex items-center justify-between w-full">
                        <span class="text-[10px] font-extrabold uppercase tracking-wider text-indigo-300">#0\u201323</span>
                        <span class="text-[10px] font-bold bg-black/30 px-1.5 py-0.5 rounded text-amber-300">24x</span>
                    </div>
                    <div class="text-xs sm:text-sm font-black text-white my-0.5">PICK POCKET</div>
                    <div id="bet-badge-NUMBERS" class="hidden px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black shadow">0</div>
                </button>

                <!-- HOLD & RELEASE SPIN BUTTON -->
                <button id="spin-btn" class="col-span-2 sm:col-span-1 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-slate-950 font-black p-2 flex flex-col justify-between items-center relative overflow-hidden spin-btn-glow shadow-lg active:scale-95 transition">
                    <div class="text-[10px] uppercase tracking-wider font-extrabold opacity-80">Hold & Release</div>
                    <div id="spin-btn-label" class="text-sm sm:text-base font-black tracking-tight">SPIN WHEEL</div>
                    <div class="w-full h-1.5 bg-black/25 rounded-full overflow-hidden mt-1">
                        <div id="spin-power-bar" class="power-bar-fill h-full bg-white w-0"></div>
                    </div>
                </button>
            </div>
        </div>
    </div>

    <script>
/* Shared play-chip accounting. Kept independent of the rendering code. */
(function (root) {
    'use strict';
    const KEY = 'roulette-club-v1';
    const LIMIT = 100000;
    const SHARK_LIMIT = 1500000;
    const BANK_PERIOD = 30 * 60000, SHARK_PERIOD = 5 * 60000, MARKET_COOLDOWN = 15 * 60000;
    const MAX = 1000000000;
    const symbols = ['7', '\u{1F48E}', 'BAR', '\u{1F514}', '\u{1F340}', '\u{1F352}'];
    const triples = [50, 25, 20, 15, 10, 5];
    const reelStrip = [0, 5, 3, 1, 4, 2, 0, 5, 4, 3, 5, 1];
    const emptyBets = () => ({ RED: 0, BLACK: 0, GREEN: 0, ODD: 0, EVEN: 0, numbers: {} });
    const sumBets = bets => ['RED', 'BLACK', 'GREEN', 'ODD', 'EVEN'].reduce((s, k) => s + bets[k], 0)
        + Object.values(bets.numbers).reduce((s, v) => s + v, 0);
    const integer = (n, max = MAX) => Number.isSafeInteger(n) && n >= 0 && n <= max;
    const cards = Object.freeze({
        seven: Object.freeze({ name: '\u4FDD\u5E95 777', factor: 35, multiplier: 50, reels: [0, 6, 0], symbol: '7 7 7' }),
        diamonds: Object.freeze({ name: '\u4FDD\u5E95\u4E09\u94BB\u77F3', factor: 18, multiplier: 25, reels: [3, 11, 3], symbol: '\u{1F48E} \u{1F48E} \u{1F48E}' }),
        bars: Object.freeze({ name: '\u4FDD\u5E95\u4E09 BAR', factor: 14, multiplier: 20, reels: [5, 5, 5], symbol: 'BAR BAR BAR' })
    });
    const economyDefaults = () => ({ sharkDebt: 0, bankInterestAt: null, sharkInterestAt: null, marketAvailableAt: 0, cards: [], armedCardId: null });
    const timestamp = value => value === null || (Number.isSafeInteger(value) && value >= 0);
    function growDebt(balance, rateBps, periods) {
        if (rateBps === 0) return balance;
        for (let i = 0; i < periods && balance < MAX; i++) balance = Math.min(MAX, balance + Math.ceil(balance * rateBps / 10000));
        return balance;
    }
    function validEconomy(user) {
        return integer(user.sharkDebt) && timestamp(user.bankInterestAt) && timestamp(user.sharkInterestAt) && timestamp(user.marketAvailableAt)
            && Array.isArray(user.cards) && user.cards.length <= 50
            && user.cards.every(card => card && typeof card.id === 'string' && Object.hasOwn(cards, card.type)
                && integer(card.stake, 1000000) && card.stake > 0)
            && new Set(user.cards.map(card => card.id)).size === user.cards.length
            && (user.armedCardId === null || user.cards.some(card => card.id === user.armedCardId));
    }
    function validateBets(bets) {
        return bets && ['RED', 'BLACK', 'GREEN', 'ODD', 'EVEN'].every(k => integer(bets[k]))
            && bets.numbers && typeof bets.numbers === 'object' && !Array.isArray(bets.numbers)
            && Object.entries(bets.numbers).every(([k, v]) => /^(?:[0-9]|1[0-9]|2[0-3])$/.test(k) && integer(v))
            && integer(sumBets(bets));
    }
    function profile(id, name) {
        return { id, name, balance: 1000, debt: 0, bets: emptyBets(), lastBets: null, history: [], pendingRoulette: false, ...economyDefaults() };
    }
    class CasinoEngine {
        constructor(storage, random, clock = () => Date.now(), { recoverRoulette = true } = {}) {
            this.storage = storage;
            this.now = clock;
            this.random = random || (() => {
                const a = new Uint32Array(1);
                root.crypto.getRandomValues(a);
                return a[0] / 4294967296;
            });
            this.lock = null;
            this.storageWarning = '';
            this.data = { version: 1, activeId: 'alex', users: [profile('alex', 'Alex'), profile('jamie', 'Jamie'), profile('taylor', 'Taylor')], ledger: [], loans: [] };
            try {
                const raw = storage && storage.getItem(KEY);
                if (raw) {
                    const saved = JSON.parse(raw);
                    if (Array.isArray(saved.users)) saved.users = saved.users.map(user => ({ ...economyDefaults(), ...user }));
                    saved.loans ??= [];
                    if (saved.version !== 1 || !Array.isArray(saved.users) || saved.users.length < 1 || saved.users.length > 12
                        || !Array.isArray(saved.ledger) || !Array.isArray(saved.loans) || saved.loans.length > 200 || !saved.loans.every(loan => this.validLoan(loan, saved.users)) || new Set(saved.loans.map(loan => loan.id)).size !== saved.loans.length || !saved.users.some(u => u.id === saved.activeId)
                        || new Set(saved.users.map(u => u.id)).size !== saved.users.length
                        || !saved.users.every(u => typeof u.id === 'string' && typeof u.name === 'string'
                            && u.name.trim().length > 0 && u.name.length <= 24 && Number.isSafeInteger(u.balance) && Math.abs(u.balance) <= MAX
                            && integer(u.debt) && validEconomy(u) && validateBets(u.bets)
                            && (u.lastBets === null || validateBets(u.lastBets)) && Array.isArray(u.history))) {
                        throw new Error('Invalid saved profiles');
                    }
                    this.data = saved;
                    this.data.ledger = saved.ledger.filter(t => t && typeof t.text === 'string' && typeof t.time === 'string').slice(0, 100);
                    for (const u of saved.users) {
                        delete u.bankRounds; delete u.sharkRounds;
                        u.history = u.history.filter(h => h && integer(h.num, 23) && ['GREEN', 'RED', 'BLACK'].includes(h.colorTag)).slice(0, 10);
                        if (u.pendingRoulette && recoverRoulette) {
                            u.balance += sumBets(u.bets);
                            u.bets = emptyBets();
                            u.pendingRoulette = false;
                            this.record(\`\${u.name}: interrupted roulette stake refunded.\`);
                        }
                    }
                }
            } catch {
                this.storageWarning = 'Saved profiles could not be read. This session starts with fresh local profiles.';
            }
            this.accrueInterest();
            this.save();
        }
        get active() { return this.data.users.find(u => u.id === this.data.activeId); }
        get availableCredit() { return Math.max(0, LIMIT - this.active.debt); }
        get availableSharkCredit() { return Math.max(0, SHARK_LIMIT - this.active.sharkDebt); }
        get canBorrowShark() { return !this.lock && this.availableCredit === 0 && this.active.balance <= 0 && sumBets(this.active.bets) === 0 && this.availableSharkCredit > 0; }
        get armedCard() { return this.active.cards.find(card => card.id === this.active.armedCardId) || null; }
        ensureIdle() {
            if (this.lock) throw new Error('Wait for the current spin to finish.');
            if (this.accrueInterest()) this.save();
        }
        amount(value, maximum = 1000000) {
            if (!Number.isSafeInteger(value) || value <= 0 || value > maximum) throw new Error('Enter a whole number from 1 to ' + maximum.toLocaleString() + '.');
            return value;
        }
        save() {
            this.accrueInterest();
            try { if (this.storage) this.storage.setItem(KEY, JSON.stringify(this.data)); }
            catch { this.storageWarning = 'Browser storage is unavailable. Keep this page open to retain this session.'; }
        }
        record(text) {
            this.data.ledger.unshift({ text, time: new Date().toISOString() });
            this.data.ledger = this.data.ledger.slice(0, 100);
        }
        switchUser(id) {
            this.ensureIdle();
            if (!this.data.users.some(u => u.id === id)) throw new Error('Choose an existing player.');
            this.data.activeId = id;
            this.save();
        }
        addUser(name) {
            this.ensureIdle();
            name = String(name).trim();
            if (!name || name.length > 24) throw new Error('Use a player name with 1\u201324 characters.');
            if (this.data.users.length >= 12) throw new Error('This table has room for 12 players.');
            if (this.data.users.some(u => u.name.toLowerCase() === name.toLowerCase())) throw new Error('That player name is already taken.');
            const u = profile(root.crypto.randomUUID(), name);
            this.data.users.push(u);
            this.data.activeId = u.id;
            this.record(\`\${name} joined with 1,000 starter chips.\`);
            this.save();
            return u;
        }
        validLoan(loan, users) {
            return loan && typeof loan.id === 'string' && typeof loan.lenderId === 'string' && typeof loan.borrowerId === 'string'
                && loan.lenderId !== loan.borrowerId && typeof loan.lenderName === 'string' && typeof loan.borrowerName === 'string'
                && integer(loan.principal, 1000000) && loan.principal > 0 && integer(loan.balance)
                && integer(loan.rateBps, 10000) && integer(loan.periodMs, 1440 * 60000) && loan.periodMs >= 60000 && loan.periodMs % 60000 === 0
                && timestamp(loan.createdAt) && timestamp(loan.interestAt)
                && ['pending', 'active', 'declined', 'cancelled', 'repaid'].includes(loan.status)
                && (!['pending', 'active'].includes(loan.status) || [loan.lenderId, loan.borrowerId].every(id => users.some(user => user.id === id)))
                && (loan.status !== 'active' || (loan.interestAt !== null && loan.balance > 0));
        }
        offerLoan(borrowerId, value, ratePercent, minutes = 10) {
            this.ensureIdle();
            const lender = this.active, borrower = this.data.users.find(user => user.id === borrowerId), principal = this.amount(value);
            if (!borrower || borrower === lender) throw new Error('\u8BF7\u9009\u62E9\u53E6\u4E00\u4F4D\u501F\u6B3E\u73A9\u5BB6\u3002');
            const rateBps = Math.round(ratePercent * 100);
            if (!Number.isFinite(ratePercent) || !integer(rateBps, 10000) || Math.abs(ratePercent * 100 - rateBps) > .000001) throw new Error('\u5229\u7387\u9700\u4E3A 0\u2013100%\uFF0C\u6700\u591A\u4E24\u4F4D\u5C0F\u6570\u3002');
            if (!integer(minutes, 1440) || minutes < 1) throw new Error('\u8BA1\u606F\u5468\u671F\u9700\u4E3A 1\u20131,440 \u5206\u949F\u3002');
            if (principal > lender.balance) throw new Error('\u51FA\u501F\u4EBA\u7684\u4F59\u989D\u4E0D\u8DB3\u3002');
            this.data.loans = this.data.loans.filter(loan => ['pending', 'active'].includes(loan.status) || this.data.loans.indexOf(loan) < 100);
            if (this.data.loans.length >= 200) throw new Error('\u501F\u6B3E\u534F\u8BAE\u6570\u91CF\u5DF2\u8FBE\u4E0A\u9650\uFF0C\u8BF7\u5148\u5904\u7406\u5F85\u786E\u8BA4\u534F\u8BAE\u3002');
            const loan = { id: root.crypto.randomUUID(), lenderId: lender.id, borrowerId, lenderName: lender.name, borrowerName: borrower.name,
                principal, balance: principal, rateBps, periodMs: minutes * 60000, status: 'pending', createdAt: this.now(), interestAt: null };
            this.data.loans.unshift(loan);
            this.record(\`\${lender.name} \u2192 \${borrower.name}: \u53D1\u8D77\u501F\u6B3E\u534F\u8BAE \${principal.toLocaleString()}\uFF0C\u6BCF \${minutes} \u5206\u949F \${ratePercent}%\uFF0C\u7B49\u5F85\u501F\u6B3E\u4EBA\u786E\u8BA4\u3002\`);
            this.save(); return loan;
        }
        respondLoan(id, accept) {
            this.ensureIdle();
            const loan = this.data.loans.find(item => item.id === id);
            if (!loan || loan.status !== 'pending' || loan.borrowerId !== this.active.id) throw new Error('\u53EA\u6709\u501F\u6B3E\u4EBA\u80FD\u786E\u8BA4\u8FD9\u4EFD\u5F85\u5904\u7406\u534F\u8BAE\u3002');
            if (!accept) { loan.status = 'declined'; this.record(\`\${loan.borrowerName} \u62D2\u7EDD\u4E86 \${loan.lenderName} \u7684\u501F\u6B3E\u534F\u8BAE\u3002\`); this.save(); return; }
            const lender = this.data.users.find(user => user.id === loan.lenderId), borrower = this.active;
            if (!lender || lender.balance < loan.principal) throw new Error('\u51FA\u501F\u4EBA\u5F53\u524D\u4F59\u989D\u4E0D\u8DB3\uFF0C\u5C1A\u672A\u6263\u6B3E\u3002');
            if (borrower.balance + loan.principal > MAX) throw new Error('\u501F\u6B3E\u4EBA\u94B1\u5305\u5DF2\u63A5\u8FD1\u4E0A\u9650\u3002');
            lender.balance -= loan.principal; borrower.balance += loan.principal;
            loan.status = 'active'; loan.interestAt = this.now();
            this.record(\`\${loan.borrowerName} \u5DF2\u63A5\u53D7\u534F\u8BAE\uFF0C\${loan.lenderName} \u8F6C\u5165 \${loan.principal.toLocaleString()}\u3002\`);
            this.save();
        }
        cancelLoan(id) {
            this.ensureIdle();
            const loan = this.data.loans.find(item => item.id === id);
            if (!loan || loan.status !== 'pending' || loan.lenderId !== this.active.id) throw new Error('\u53EA\u80FD\u64A4\u9500\u81EA\u5DF1\u53D1\u8D77\u7684\u5F85\u786E\u8BA4\u534F\u8BAE\u3002');
            loan.status = 'cancelled'; this.record(\`\${loan.lenderName} \u64A4\u9500\u4E86\u7ED9 \${loan.borrowerName} \u7684\u501F\u6B3E\u534F\u8BAE\u3002\`); this.save();
        }
        repayLoan(id, value) {
            this.ensureIdle();
            const loan = this.data.loans.find(item => item.id === id), amount = this.amount(value, MAX);
            if (!loan || loan.status !== 'active' || loan.borrowerId !== this.active.id) throw new Error('\u53EA\u80FD\u507F\u8FD8\u81EA\u5DF1\u7684\u6709\u6548\u501F\u6B3E\u3002');
            const lender = this.data.users.find(user => user.id === loan.lenderId), borrower = this.active;
            if (amount > loan.balance || amount > borrower.balance) throw new Error('\u8FD8\u6B3E\u8D85\u8FC7\u6B20\u6B3E\u6216\u94B1\u5305\u4F59\u989D\u3002');
            if (!lender || lender.balance + amount > MAX) throw new Error('\u51FA\u501F\u4EBA\u94B1\u5305\u5DF2\u63A5\u8FD1\u4E0A\u9650\u3002');
            borrower.balance -= amount; lender.balance += amount; loan.balance -= amount;
            if (loan.balance === 0) { loan.status = 'repaid'; loan.interestAt = null; }
            this.record(\`\${borrower.name} \u2192 \${lender.name}: \u507F\u8FD8\u73A9\u5BB6\u501F\u6B3E \${amount.toLocaleString()}\u3002\`); this.save();
        }
        deletePlayer(id) {
            this.ensureIdle();
            const user = this.data.users.find(item => item.id === id);
            if (!user) throw new Error('\u8BE5\u73A9\u5BB6\u4E0D\u5B58\u5728\u3002');
            if (this.data.users.length === 1) throw new Error('\u81F3\u5C11\u4FDD\u7559\u4E00\u540D\u73A9\u5BB6\u3002');
            if (user.debt || user.sharkDebt || sumBets(user.bets) || user.pendingRoulette || (user.blackjack && user.blackjack.phase !== 'settled')
                || this.data.loans.some(loan => ['pending', 'active'].includes(loan.status) && [loan.lenderId, loan.borrowerId].includes(id))) throw new Error('\u8BF7\u5148\u7ED3\u6E05\u6B20\u6B3E\u3001\u501F\u51FA\u6B3E\u3001\u5F85\u786E\u8BA4\u534F\u8BAE\u548C\u6E38\u620F\u4E0B\u6CE8\uFF0C\u518D\u5220\u9664\u73A9\u5BB6\u3002');
            this.data.users = this.data.users.filter(item => item.id !== id);
            if (this.data.activeId === id) this.data.activeId = this.data.users[0].id;
            this.record(\`\u5DF2\u5220\u9664\u73A9\u5BB6 \${user.name}\uFF0C\u5176\u94B1\u5305\u548C\u5361\u5305\u5DF2\u79FB\u9664\u3002\`); this.save();
        }
        adminAdjust(id, mode, value, reason = '') {
            this.ensureIdle();
            const user = this.data.users.find(item => item.id === id), amount = this.amount(value, MAX);
            if (!user || !['add', 'remove'].includes(mode)) throw new Error('\u8BF7\u9009\u62E9\u73A9\u5BB6\u53CA\u6709\u6548\u7684\u8C03\u6574\u65B9\u5F0F\u3002');
            if (typeof reason !== 'string' || reason.length > 120) throw new Error('\u5907\u6CE8\u6700\u591A 120 \u4E2A\u5B57\u7B26\u3002');
            const delta = mode === 'add' ? amount : -amount;
            if (user.balance + delta > MAX || user.balance + delta < 0) throw new Error('\u8C03\u6574\u540E\u4F59\u989D\u5FC5\u987B\u5728 0\u20131,000,000,000 \u4E4B\u95F4\u3002');
            user.balance += delta;
            this.record(\`\u7BA1\u7406\u5458 \xB7 \${user.name} \${mode === 'add' ? '\u589E\u52A0' : '\u6263\u9664'} \${amount.toLocaleString()} \u7B79\u7801\${reason.trim() ? ' \xB7 ' + reason.trim() : ''}\u3002\`);
            this.save();
        }
        transfer(id, value) {
            this.ensureIdle();
            const n = this.amount(value), from = this.active;
            const to = this.data.users.find(u => u.id === id);
            if (!to || to === from) throw new Error('Choose another player to receive the chips.');
            if (n > from.balance) throw new Error('Your wallet does not have enough chips.');
            if (to.balance + n > MAX) throw new Error('The receiving wallet has reached its chip limit.');
            from.balance -= n;
            to.balance += n;
            this.record(\`\${from.name} \u2192 \${to.name}: \${n.toLocaleString()} chips transferred.\`);
            this.save();
        }
        borrow(value) {
            this.ensureIdle();
            const n = this.amount(value), u = this.active;
            if (n > this.availableCredit) throw new Error(\`You can borrow up to \${this.availableCredit.toLocaleString()} more chips.\`);
            if (u.balance + n > MAX) throw new Error('Your wallet has reached its chip limit.');
            u.balance += n;
            if (u.debt === 0) u.bankInterestAt = this.now();
            u.debt += n;
            this.record(\`Bank \u2192 \${u.name}: borrowed \${n.toLocaleString()} chips.\`);
            this.save();
        }
        repay(value) {
            this.ensureIdle();
            const n = this.amount(value, MAX), u = this.active;
            if (n > u.debt) throw new Error('That amount is greater than your outstanding debt.');
            if (n > u.balance) throw new Error('Your wallet does not have enough chips to repay that amount.');
            u.balance -= n;
            u.debt -= n;
            if (u.debt === 0) u.bankInterestAt = null;
            this.record(\`\${u.name} \u2192 Bank: repaid \${n.toLocaleString()} chips.\`);
            this.save();
        }
        borrowShark(value) {
            this.ensureIdle();
            const n = this.amount(value, SHARK_LIMIT), user = this.active;
            if (!this.canBorrowShark) throw new Error('\u9AD8\u5229\u8D37\u4EC5\u5728\u94F6\u884C\u989D\u5EA6\u8017\u5C3D\u3001\u94B1\u5305 \u2264 0 \u4E14\u6CA1\u6709\u672A\u7ED3\u7B97\u4E0B\u6CE8\u65F6\u5F00\u653E\u3002');
            if (n > this.availableSharkCredit) throw new Error('\u9AD8\u5229\u8D37\u5269\u4F59\u989D\u5EA6\u4E0D\u8DB3\u3002');
            if (user.sharkDebt === 0) user.sharkInterestAt = this.now();
            user.balance += n; user.sharkDebt += n;
            this.record(\`\u9AD8\u5229\u8D37 \u2192 \${user.name}: \u501F\u5165 \${n.toLocaleString()}\uFF1B\u6BCF 5 \u5206\u949F\u8BA1\u606F 10%\u3002\`);
            this.save();
        }
        repayShark(value) {
            this.ensureIdle();
            const n = this.amount(value, MAX), user = this.active;
            if (n > user.sharkDebt) throw new Error('\u8FD8\u6B3E\u4E0D\u80FD\u8D85\u8FC7\u9AD8\u5229\u8D37\u6B20\u6B3E\u3002');
            if (n > user.balance) throw new Error('\u94B1\u5305\u4F59\u989D\u4E0D\u8DB3\u4EE5\u8FD8\u6B3E\u3002');
            user.balance -= n; user.sharkDebt -= n;
            if (user.sharkDebt === 0) user.sharkInterestAt = null;
            this.record(\`\${user.name} \u2192 \u9AD8\u5229\u8D37: \u507F\u8FD8 \${n.toLocaleString()}\u3002\`);
            this.save();
        }
        completeRound() { this.accrueInterest(); }
        accrueInterest() {
            const now = this.now(); let changed = false;
            const accrue = (target, debt, clock, period, rate, label) => {
                if (target[debt] <= 0) { if (target[clock] !== null) { target[clock] = null; changed = true; } return; }
                if (target[clock] === null) { target[clock] = now; changed = true; return; }
                const periods = Math.floor((now - target[clock]) / period);
                if (periods <= 0) return;
                const before = target[debt]; target[debt] = growDebt(before, rate, periods);
                target[clock] += periods * period; changed = true;
                if (target[debt] !== before) this.record(\`\${label} \xB7 \${periods} \u671F\u5229\u606F +\${(target[debt] - before).toLocaleString()}\uFF0C\u6B20\u6B3E \${target[debt].toLocaleString()}\u3002\`);
            };
            for (const user of this.data.users) {
                accrue(user, 'debt', 'bankInterestAt', BANK_PERIOD, 50, user.name + ' \xB7 \u94F6\u884C');
                accrue(user, 'sharkDebt', 'sharkInterestAt', SHARK_PERIOD, 1000, user.name + ' \xB7 \u9AD8\u5229\u8D37');
            }
            for (const loan of this.data.loans) if (loan.status === 'active') accrue(loan, 'balance', 'interestAt', loan.periodMs, loan.rateBps, loan.borrowerName + ' \u2192 ' + loan.lenderName);
            return changed;
        }
        buyCard(type, value) {
            this.ensureIdle();
            const item = Object.hasOwn(cards, type) ? cards[type] : null;
            if (!item) throw new Error('\u8BF7\u9009\u62E9\u6709\u6548\u7684\u9ED1\u5E02\u5361\u3002');
            const stake = this.amount(value), price = stake * item.factor, user = this.active;
            if (this.now() < user.marketAvailableAt) throw new Error('\u9ED1\u5E02\u8FDB\u8D27\u4E2D\uFF0C\u8BF7\u7B49\u5F85\u8D2D\u4E70\u51B7\u5374\u7ED3\u675F\u3002');
            if (user.cards.length >= 50) throw new Error('\u6700\u591A\u6301\u6709 50 \u5F20\u5361\uFF0C\u8BF7\u5148\u4F7F\u7528\u5DF2\u6709\u5361\u3002');
            if (price + stake > user.balance) throw new Error('\u4F59\u989D\u4E0D\u8DB3\uFF1A\u9700\u652F\u4ED8\u5361\u4EF7\uFF0C\u5E76\u7559\u8DB3\u4E00\u6B21\u7ED1\u5B9A\u4E0B\u6CE8\u7684\u7B79\u7801\u3002');
            const card = { id: root.crypto.randomUUID(), type, stake };
            user.balance -= price; user.cards.push(card);
            user.marketAvailableAt = this.now() + MARKET_COOLDOWN;
            this.record(\`\${user.name} \xB7 \u9ED1\u5E02\u8D2D\u4E70\${item.name}\uFF0C\u4EF7\u683C \${price.toLocaleString()}\uFF0C\u7ED1\u5B9A\u4E0B\u6CE8 \${stake.toLocaleString()}\u3002\`);
            this.save(); return card;
        }
        armCard(id) {
            this.ensureIdle();
            const card = this.active.cards.find(item => item.id === id);
            if (id !== null && !card) throw new Error('\u4F60\u6CA1\u6709\u8FD9\u5F20\u5361\u3002');
            if (card && card.stake > this.active.balance) throw new Error('\u4F59\u989D\u4E0D\u8DB3\u4EE5\u652F\u4ED8\u8BE5\u5361\u7ED1\u5B9A\u7684\u4E0B\u6CE8\u3002');
            this.active.armedCardId = id;
            this.save();
        }
        slotResult(reels, wager) {
            if (!Array.isArray(reels) || reels.length !== 3 || !reels.every(i => integer(i, 11))) throw new Error('Invalid reels.');
            const landed = reels.map(i => reelStrip[i]);
            const cherries = landed.filter(i => i === 5).length;
            const sevens = landed.filter(i => i === 0).length;
            const multiplier = landed.every(i => i === landed[0]) ? triples[landed[0]]
                : sevens === 2 ? 5 : cherries === 2 ? 2 : cherries === 1 ? 1 : 0;
            return { reels: [...reels], symbols: landed, multiplier, wager, payout: wager * multiplier, net: wager * (multiplier - 1) };
        }
        spinSlots(value, forcedIndices = null, { allIn = false, jackpot = false } = {}) {
            this.ensureIdle();
            const n = this.amount(value), u = this.active;
            const card = jackpot ? null : this.armedCard;
            if (card && n !== card.stake) throw new Error('\u5DF2\u88C5\u5907\u5361\u7ED1\u5B9A\u4E0B\u6CE8 ' + card.stake.toLocaleString() + '\uFF0C\u8BF7\u53D6\u6D88\u88C5\u5907\u540E\u66F4\u6539\u3002');
            if (allIn && n !== u.balance) throw new Error('All In must wager your whole wallet.');
            if (n > u.balance) throw new Error('Your wallet does not have enough chips for this spin.');
            if (u.balance + n * 49 > MAX) throw new Error('Your wallet is too close to its chip limit.');
            const reels = jackpot ? [0, 6, 0] : card ? cards[card.type].reels : forcedIndices === null ? Array.from({ length: 3 }, () => {
                const roll = this.random();
                if (!(roll >= 0 && roll < 1)) throw new Error('Could not generate a valid spin. Try again.');
                return Math.floor(roll * reelStrip.length);
            }) : forcedIndices;
            const result = this.slotResult(reels, n);
            u.balance += result.net;
            if (card) {
                u.cards = u.cards.filter(item => item.id !== card.id); u.armedCardId = null;
                result.cardName = cards[card.type].name;
                this.record(\`\${u.name} \xB7 \u5DF2\u6D88\u8017\${result.cardName}\uFF0C\u7ED1\u5B9A\u4E0B\u6CE8 \${n.toLocaleString()}\u3002\`);
            }
            this.record(\`\${u.name} \xB7 777\${forcedIndices === null ? '' : ' (forced jackpot)'}: wager \${n.toLocaleString()}, payout \${result.payout.toLocaleString()} (\${result.symbols.map(i => symbols[i]).join(' / ')}).\`);
            this.completeRound();
            this.lock = 'slots';
            this.save();
            return result;
        }
    }
    CasinoEngine.symbols = symbols;
    CasinoEngine.triples = triples;
    CasinoEngine.reelStrip = reelStrip;
    CasinoEngine.creditLimit = LIMIT;
    CasinoEngine.sharkLimit = SHARK_LIMIT;
    CasinoEngine.cards = cards;
    CasinoEngine.emptyBets = emptyBets;
    CasinoEngine.sumBets = sumBets;
    CasinoEngine.storageKey = KEY;
    root.CasinoEngine = CasinoEngine;
})(globalThis);

function bindCustomBet(prefix, engine, options) {
    const form = document.getElementById(prefix + '-form');
    const input = document.getElementById(prefix + '-amount');
    const button = document.getElementById(prefix + '-apply');
    form.addEventListener('submit', event => {
        event.preventDefault();
        try {
            if (options.locked()) throw new Error('Finish the current round before changing your bet.');
            const value = engine.amount(input.value.trim() === '' ? NaN : Number(input.value));
            if (value > engine.active.balance) throw new Error('Not enough chips. Lower your bet or visit the bank.');
            options.apply(value);
        } catch (error) { options.notify(error.message, true); }
    });
    return { update(locked) { input.disabled = locked; button.disabled = locked; } };
}

function bindJackpotShortcut(target, action) {
    let leftShift = false;
    target.addEventListener('keydown', event => {
        if (event.code === 'ShiftLeft') leftShift = true;
        if (!leftShift || !event.shiftKey || event.code !== 'KeyF' || event.repeat || event.isComposing
            || event.ctrlKey || event.altKey || event.metaKey
            || event.target?.closest?.('input, textarea, select, [contenteditable]:not([contenteditable="false"])')) return;
        if (action() === false) return;
        event.preventDefault(); event.stopImmediatePropagation();
    });
    target.addEventListener('keyup', event => { if (event.code === 'ShiftLeft') leftShift = false; });
    target.addEventListener('blur', () => { leftShift = false; });
}
function bestRouletteNumber(bets) {
    let best = 0, highest = -1;
    for (let number = 0; number < 24; number++) {
        const payout = (bets.numbers[number] || 0) * 24 + (number === 0 ? bets.GREEN * 24
            : number % 2 ? (bets.RED + bets.ODD) * 2 : (bets.BLACK + bets.EVEN) * 2);
        if (payout > highest) { highest = payout; best = number; }
    }
    return best;
}

function createLuckyInput(canvas, actions) {
    let pointer = null, startY = 0, started = 0, ratio = 0;
    function end(spin) {
        if (pointer === null) return;
        const id = pointer;
        pointer = null;
        actions.dragging(false);
        canvas.style.cursor = 'grab';
        if (canvas.hasPointerCapture(id)) canvas.releasePointerCapture(id);
        if (spin) actions.spin();
    }
    canvas.addEventListener('pointerdown', event => {
        if (pointer !== null || event.isPrimary === false || event.button !== 0 || !actions.canAct()) return;
        const rect = canvas.getBoundingClientRect();
        const hit = actions.hitTest((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1);
        if (!hit) return;
        event.preventDefault();
        if (hit.action === 'BET') actions.bet(hit.value);
        if (hit.action === 'SPIN_BUTTON') actions.spin();
        if (hit.action === 'JOYSTICK') {
            pointer = event.pointerId;
            startY = event.clientY;
            started = performance.now();
            ratio = 0;
            canvas.setPointerCapture(pointer);
            canvas.style.cursor = 'grabbing';
            actions.pull(0);
            actions.dragging(true);
        }
    });
    canvas.addEventListener('pointermove', event => {
        if (pointer !== event.pointerId) return;
        const distance = Math.max(85, Math.min(175, canvas.getBoundingClientRect().height * .3));
        ratio = Math.max(0, Math.min(1, (event.clientY - startY) / distance));
        actions.pull(ratio);
        if (ratio >= .98) end(true);
    });
    canvas.addEventListener('pointerup', event => {
        if (pointer !== event.pointerId) return;
        end(ratio >= .58 || (performance.now() - started < 230 && ratio < .18));
    });
    for (const name of ['pointercancel', 'lostpointercapture']) canvas.addEventListener(name, event => {
        if (pointer === event.pointerId) end(false);
    });
    window.addEventListener('blur', () => end(false));
    return { cancel: () => end(false) };
}
if (typeof module !== 'undefined') module.exports = createLuckyInput;

function createLuckyMachine(engine, callbacks, host) {\r
\r
    /* ============================================================================\r
       1. GAME STATE, BETTING TIERS & WEB AUDIO SYNTHESIZER\r
       ============================================================================ */\r
    const BET_TIERS = [10, 50, 100, 500, 1000, 'ALL_IN'];\r
    let credits = engine.active.balance;\r
    let visible = false, visualBalance = null, spinResult = null, frame = null;\r
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;\r
    let selectedBetMode = 100;\r
    let customBet = 100;\r
    let lastWinAmount = 0;\r
    let isSpinning = false;\r
    let isMuted = false;\r
\r
    function getActiveBetAmount() {\r
      if (engine.armedCard) return engine.armedCard.stake;\r
      if (selectedBetMode === 'CUSTOM') return customBet;\r
      if (selectedBetMode === 'ALL_IN') return Math.max(0, credits);\r
      return Math.min(credits, selectedBetMode);\r
    }\r
\r
    let audioCtx = null;\r
    function getAudioCtx() {\r
      if (!audioCtx) {\r
        const AC = window.AudioContext || window.webkitAudioContext;\r
        audioCtx = new AC();\r
      }\r
      if (audioCtx.state === 'suspended') audioCtx.resume();\r
      return audioCtx;\r
    }\r
\r
    function playSynthTone(freq, type = 'triangle', duration = 0.08, gainVal = 0.12) {\r
      if (isMuted || !visible) return;\r
      try {\r
        const ctx = getAudioCtx();\r
        const osc = ctx.createOscillator();\r
        const gain = ctx.createGain();\r
        osc.type = type;\r
        osc.frequency.setValueAtTime(freq, ctx.currentTime);\r
        gain.gain.setValueAtTime(gainVal, ctx.currentTime);\r
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);\r
        osc.connect(gain);\r
        gain.connect(ctx.destination);\r
        osc.start();\r
        osc.stop(ctx.currentTime + duration);\r
      } catch (e) {}\r
    }\r
\r
    function playSynthChord(freqs, type = 'triangle', duration = 0.18, gainVal = 0.11) {\r
      freqs.forEach((f, idx) => {\r
        setTimeout(() => playSynthTone(f, type, duration, gainVal), idx * 42);\r
      });\r
    }\r
\r
    function toggleMute() {\r
      isMuted = !isMuted;\r
      document.getElementById('muteBtn').textContent = isMuted ? '\u{1F507} Muted' : '\u{1F50A} SFX';\r
    }\r
\r
    function setStatus(text) {\r
      document.getElementById('statusTicker').textContent = text;\r
    }\r
\r
    /* ============================================================================\r
       2. THREE.JS RENDERER & PROCEDURAL STUDIO HDRI ENVIRONMENT (PMREMGenerator)\r
       ============================================================================ */\r
    const mount = document.getElementById('webgl-mount');\r
    const scene = new THREE.Scene();\r
\r
    // Crisp, close-up perspective camera so reels, buttons, and joystick are crystal clear\r
    const camera = new THREE.PerspectiveCamera(35, Math.max(1, host.clientWidth) / Math.max(1, host.clientHeight), 0.1, 100);\r
    const fitDistance = () => Math.max(11.5, 3.6 / (Math.tan(Math.PI * 35 / 360) * camera.aspect) + 2.5);\r
    const camTargetPos = new THREE.Vector3(0.68, 0.75, fitDistance());\r
    const camLookTarget = new THREE.Vector3(0.24, 0.08, 0.15);\r
    camera.position.copy(camTargetPos);\r
    camera.lookAt(camLookTarget);\r
\r
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });\r
    renderer.setSize(Math.max(1, host.clientWidth), Math.max(1, host.clientHeight));\r
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));\r
    renderer.shadowMap.enabled = true;\r
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;\r
    renderer.outputEncoding = THREE.sRGBEncoding;\r
    renderer.toneMapping = THREE.ACESFilmicToneMapping;\r
    renderer.toneMappingExposure = 0.95;\r
    mount.appendChild(renderer.domElement);\r
\r
    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();\r
\r
    // Build a procedural Studio HDRI Reflection Environment via PMREMGenerator\r
    // with balanced contrast so gold and gunmetal look rich without washing out\r
    function buildStudioEnvironment() {\r
      const pmremGenerator = new THREE.PMREMGenerator(renderer);\r
      pmremGenerator.compileCubemapShader();\r
\r
      const envScene = new THREE.Scene();\r
      envScene.background = new THREE.Color(0x06040a);\r
\r
      // Overhead studio softbox\r
      const topBox = new THREE.Mesh(\r
        new THREE.PlaneGeometry(20, 20),\r
        new THREE.MeshBasicMaterial({ color: 0xffe8b3, side: THREE.DoubleSide })\r
      );\r
      topBox.position.set(0, 12, 0);\r
      topBox.rotation.x = Math.PI / 2;\r
      envScene.add(topBox);\r
\r
      // Warm Las Vegas Gold Left Strip\r
      const leftStrip = new THREE.Mesh(\r
        new THREE.PlaneGeometry(16, 10),\r
        new THREE.MeshBasicMaterial({ color: 0xd4af37, side: THREE.DoubleSide })\r
      );\r
      leftStrip.position.set(-12, 3, 4);\r
      leftStrip.rotation.y = Math.PI / 2;\r
      envScene.add(leftStrip);\r
\r
      // Warm Amber Right Strip\r
      const rightStrip = new THREE.Mesh(\r
        new THREE.PlaneGeometry(16, 10),\r
        new THREE.MeshBasicMaterial({ color: 0xb45309, side: THREE.DoubleSide })\r
      );\r
      rightStrip.position.set(12, 3, 4);\r
      rightStrip.rotation.y = -Math.PI / 2;\r
      envScene.add(rightStrip);\r
\r
      // Subtle Cool Rim Accent\r
      const backStrip = new THREE.Mesh(\r
        new THREE.PlaneGeometry(18, 8),\r
        new THREE.MeshBasicMaterial({ color: 0x1e293b, side: THREE.DoubleSide })\r
      );\r
      backStrip.position.set(0, 6, -12);\r
      envScene.add(backStrip);\r
\r
      const envRT = pmremGenerator.fromScene(envScene, 0.04);\r
      scene.environment = envRT.texture;\r
      pmremGenerator.dispose();\r
    }\r
    buildStudioEnvironment();\r
\r
    // Direct Scene Lights \u2014 balanced for deep casino contrast with zero reel glare hotspot\r
    const ambientLight = new THREE.AmbientLight(0xfff5e4, 0.42);\r
    scene.add(ambientLight);\r
\r
    const keyLight = new THREE.DirectionalLight(0xffe8bf, 1.25);\r
    keyLight.position.set(5, 9, 6);\r
    keyLight.castShadow = true;\r
    keyLight.shadow.mapSize.width = 2048;\r
    keyLight.shadow.mapSize.height = 2048;\r
    keyLight.shadow.bias = -0.0005;\r
    scene.add(keyLight);\r
\r
    const fillLight = new THREE.DirectionalLight(0x93c5fd, 0.35);\r
    fillLight.position.set(-6, 3, 4);\r
    scene.add(fillLight);\r
\r
    const cabinetGlowLight = new THREE.PointLight(0xf59e0b, 0.9, 10);\r
    cabinetGlowLight.position.set(0, 2.5, 2.2);\r
    scene.add(cabinetGlowLight);\r
\r
    const leverHighlightLight = new THREE.PointLight(0xff3344, 1.1, 6);\r
    leverHighlightLight.position.set(3.0, 1.2, 2.2);\r
    scene.add(leverHighlightLight);\r
\r
    /* ============================================================================\r
       3. HIGH-CONTRAST CASINO PBR MATERIALS (DARK CHROME, 24K GOLD, OBSIDIAN-CRIMSON)\r
       ============================================================================ */\r
    const mirrorChromeMat = new THREE.MeshStandardMaterial({\r
      color: 0x3f3f46,\r
      metalness: 0.85,\r
      roughness: 0.2,\r
      envMapIntensity: 1.0\r
    });\r
\r
    const gold24kMat = new THREE.MeshStandardMaterial({\r
      color: 0xd4af37,\r
      metalness: 0.88,\r
      roughness: 0.22,\r
      envMapIntensity: 1.1\r
    });\r
\r
    const brushedObsidianMat = new THREE.MeshStandardMaterial({\r
      color: 0x0d0b14,\r
      metalness: 0.7,\r
      roughness: 0.35,\r
      envMapIntensity: 0.8\r
    });\r
\r
    const crimsonLacquerMat = new THREE.MeshStandardMaterial({\r
      color: 0x1a0509,\r
      metalness: 0.65,\r
      roughness: 0.35,\r
      envMapIntensity: 0.75\r
    });\r
\r
    const gunmetalDrumMat = new THREE.MeshStandardMaterial({\r
      color: 0x11131a,\r
      metalness: 0.8,\r
      roughness: 0.35,\r
      envMapIntensity: 0.6\r
    });\r
\r
    const rubberBootMat = new THREE.MeshStandardMaterial({\r
      color: 0x121216,\r
      metalness: 0.1,\r
      roughness: 0.75\r
    });\r
\r
    /* ============================================================================\r
       4. HIGH-DPI UPRIGHT VECTOR CASINO SYMBOL ARTWORK GENERATOR (512x340)\r
       ============================================================================ */\r
    const SYMBOL_DEFS = [\r
      { id: 'SEVEN',   name: 'LUCKY 777', mult: 50 },\r
      { id: 'DIAMOND', name: 'DIAMOND',   mult: 25 },\r
      { id: 'BAR',     name: 'TRIPLE BAR',mult: 20 },\r
      { id: 'BELL',    name: 'GOLD BELL', mult: 15 },\r
      { id: 'CLOVER',  name: 'CLOVER',    mult: 10 },\r
      { id: 'CHERRY',  name: 'CHERRIES',  mult: 5  }\r
    ];\r
    const SYM_BY_ID = {};\r
    SYMBOL_DEFS.forEach(s => { SYM_BY_ID[s.id] = s; });\r
\r
    // 12 stops per cylindrical drum\r
    const REEL_STRIP = [\r
      'SEVEN', 'CHERRY', 'BELL', 'DIAMOND',\r
      'CLOVER', 'BAR', 'SEVEN', 'CHERRY',\r
      'CLOVER', 'BELL', 'CHERRY', 'DIAMOND'\r
    ];\r
    const STOP_COUNT = REEL_STRIP.length; // 12\r
    const STOP_ANGLE = (Math.PI * 2) / STOP_COUNT;\r
\r
    const symbolTextureCache = {};\r
\r
    function drawStarSparkle(ctx, cx, cy, outerR, innerR, points = 4, color = '#ffffff') {\r
      ctx.save();\r
      ctx.beginPath();\r
      for (let i = 0; i < points * 2; i++) {\r
        const r = i % 2 === 0 ? outerR : innerR;\r
        const a = (i * Math.PI) / points;\r
        const x = cx + Math.cos(a) * r;\r
        const y = cy + Math.sin(a) * r;\r
        if (i === 0) ctx.moveTo(x, y);\r
        else ctx.lineTo(x, y);\r
      }\r
      ctx.closePath();\r
      ctx.fillStyle = color;\r
      ctx.fill();\r
      ctx.restore();\r
    }\r
\r
    function createHighDPISymbolTexture(symId) {\r
      if (symbolTextureCache[symId]) return symbolTextureCache[symId];\r
\r
      const W = 512;\r
      const H = 340;\r
      const c = document.createElement('canvas');\r
      c.width = W;\r
      c.height = H;\r
      const ctx = c.getContext('2d');\r
\r
      // Rich warm ivory/gold radial casino card background (#fffbeb to #fde68a)\r
      const bgGrad = ctx.createRadialGradient(W / 2, H / 2, 18, W / 2, H / 2, 285);\r
      bgGrad.addColorStop(0, '#fffbeb');\r
      bgGrad.addColorStop(0.7, '#fde68a');\r
      bgGrad.addColorStop(1, '#f59e0b');\r
      ctx.fillStyle = bgGrad;\r
      ctx.fillRect(0, 0, W, H);\r
\r
      // Subtle warm sunburst rays\r
      ctx.save();\r
      ctx.translate(W / 2, H / 2 - 12);\r
      ctx.fillStyle = 'rgba(217, 119, 6, 0.08)';\r
      for (let i = 0; i < 16; i++) {\r
        ctx.rotate((Math.PI * 2) / 16);\r
        ctx.beginPath();\r
        ctx.moveTo(0, 0);\r
        ctx.lineTo(320, -18);\r
        ctx.lineTo(320, 18);\r
        ctx.closePath();\r
        ctx.fill();\r
      }\r
      ctx.restore();\r
\r
      // Crisp inner & outer borders (#b45309)\r
      ctx.strokeStyle = '#78350f';\r
      ctx.lineWidth = 10;\r
      ctx.strokeRect(5, 5, W - 10, H - 10);\r
      ctx.strokeStyle = '#b45309';\r
      ctx.lineWidth = 4;\r
      ctx.strokeRect(14, 14, W - 28, H - 28);\r
\r
      // Upright Vector Artwork per Symbol\r
      if (symId === 'SEVEN') {\r
        const drawVegasSeven = (cx, cy, scale, angle) => {\r
          ctx.save();\r
          ctx.translate(cx, cy);\r
          ctx.rotate(angle);\r
          ctx.scale(scale, scale);\r
\r
          const define7Path = () => {\r
            ctx.beginPath();\r
            ctx.moveTo(-85, -95);\r
            ctx.lineTo(90, -95);\r
            ctx.lineTo(90, -48);\r
            ctx.bezierCurveTo(42, 0, 12, 55, -2, 105);\r
            ctx.lineTo(-58, 105);\r
            ctx.bezierCurveTo(-40, 45, -5, -12, 34, -52);\r
            ctx.lineTo(-85, -52);\r
            ctx.closePath();\r
          };\r
\r
          // 3D Extrusion Shadow\r
          ctx.save();\r
          ctx.translate(8, 12);\r
          define7Path();\r
          ctx.fillStyle = '#2a0404';\r
          ctx.fill();\r
          ctx.restore();\r
\r
          // Gold Metallic Outer Bevel\r
          define7Path();\r
          ctx.lineWidth = 18;\r
          ctx.lineJoin = 'round';\r
          ctx.strokeStyle = '#d97706';\r
          ctx.stroke();\r
\r
          // Crimson Candy Gradient Fill\r
          const redGrad = ctx.createLinearGradient(0, -95, 0, 105);\r
          redGrad.addColorStop(0, '#ff3b3b');\r
          redGrad.addColorStop(0.45, '#dc2626');\r
          redGrad.addColorStop(1, '#7f1d1d');\r
          ctx.fillStyle = redGrad;\r
          ctx.fill();\r
\r
          // Inner Gold Rim\r
          ctx.lineWidth = 4;\r
          ctx.strokeStyle = '#fef08a';\r
          ctx.stroke();\r
          ctx.restore();\r
        };\r
\r
        drawVegasSeven(145, 142, 0.68, -0.14);\r
        drawVegasSeven(367, 142, 0.68, 0.14);\r
        drawVegasSeven(256, 134, 0.96, 0);\r
\r
        drawStarSparkle(ctx, 180, 56, 22, 5, 4, '#ffffff');\r
        drawStarSparkle(ctx, 340, 68, 18, 4, 4, '#ffffff');\r
\r
        // Bottom Jackpot Ribbon\r
        ctx.fillStyle = '#450a0a';\r
        ctx.fillRect(96, 262, 320, 46);\r
        ctx.strokeStyle = '#facc15';\r
        ctx.lineWidth = 4;\r
        ctx.strokeRect(96, 262, 320, 46);\r
        ctx.font = '900 28px Orbitron, sans-serif';\r
        ctx.fillStyle = '#fef08a';\r
        ctx.textAlign = 'center';\r
        ctx.textBaseline = 'middle';\r
        ctx.fillText('JACKPOT 50\xD7', 256, 286);\r
      }\r
\r
      else if (symId === 'DIAMOND') {\r
        const cx = 256, cy = 136;\r
        ctx.save();\r
        ctx.fillStyle = 'rgba(3, 105, 161, 0.35)';\r
        ctx.beginPath();\r
        ctx.moveTo(cx - 78, cy - 68);\r
        ctx.lineTo(cx + 78, cy - 68);\r
        ctx.lineTo(cx + 118, cy - 18);\r
        ctx.lineTo(cx, cy + 104);\r
        ctx.lineTo(cx - 118, cy - 18);\r
        ctx.closePath();\r
        ctx.fill();\r
\r
        const dGrad = ctx.createLinearGradient(cx - 110, cy - 75, cx + 110, cy + 95);\r
        dGrad.addColorStop(0, '#38bdf8');\r
        dGrad.addColorStop(0.5, '#0284c7');\r
        dGrad.addColorStop(1, '#1e3a8a');\r
        ctx.fillStyle = dGrad;\r
        ctx.beginPath();\r
        ctx.moveTo(cx - 76, cy - 74);\r
        ctx.lineTo(cx + 76, cy - 74);\r
        ctx.lineTo(cx + 116, cy - 22);\r
        ctx.lineTo(cx, cy + 96);\r
        ctx.lineTo(cx - 116, cy - 22);\r
        ctx.closePath();\r
        ctx.fill();\r
        ctx.lineWidth = 5;\r
        ctx.strokeStyle = '#0c4a6e';\r
        ctx.stroke();\r
\r
        // Top Table Facet\r
        ctx.fillStyle = '#bae6fd';\r
        ctx.beginPath();\r
        ctx.moveTo(cx - 52, cy - 74);\r
        ctx.lineTo(cx + 52, cy - 74);\r
        ctx.lineTo(cx + 64, cy - 22);\r
        ctx.lineTo(cx - 64, cy - 22);\r
        ctx.closePath();\r
        ctx.fill();\r
\r
        // Bright Left Crown Facet\r
        ctx.fillStyle = '#e0f2fe';\r
        ctx.beginPath();\r
        ctx.moveTo(cx - 76, cy - 74);\r
        ctx.lineTo(cx - 52, cy - 74);\r
        ctx.lineTo(cx - 64, cy - 22);\r
        ctx.lineTo(cx - 116, cy - 22);\r
        ctx.closePath();\r
        ctx.fill();\r
\r
        // Center Lower Pavilion Facet\r
        ctx.fillStyle = '#0ea5e9';\r
        ctx.beginPath();\r
        ctx.moveTo(cx - 64, cy - 22);\r
        ctx.lineTo(cx + 64, cy - 22);\r
        ctx.lineTo(cx, cy + 96);\r
        ctx.closePath();\r
        ctx.fill();\r
\r
        ctx.strokeStyle = '#e0f2fe';\r
        ctx.lineWidth = 3;\r
        ctx.beginPath();\r
        ctx.moveTo(cx - 116, cy - 22);\r
        ctx.lineTo(cx + 116, cy - 22);\r
        ctx.moveTo(cx - 52, cy - 74);\r
        ctx.lineTo(cx - 64, cy - 22);\r
        ctx.lineTo(cx, cy + 96);\r
        ctx.lineTo(cx + 64, cy - 22);\r
        ctx.lineTo(cx + 52, cy - 74);\r
        ctx.stroke();\r
        ctx.restore();\r
\r
        ctx.font = '900 28px Orbitron, sans-serif';\r
        ctx.fillStyle = '#0c4a6e';\r
        ctx.textAlign = 'center';\r
        ctx.fillText('DIAMOND 25\xD7', 256, 294);\r
      }\r
\r
      else if (symId === 'BAR') {\r
        const barYPositions = [36, 112, 188];\r
        barYPositions.forEach((by) => {\r
          ctx.fillStyle = 'rgba(0,0,0,0.45)';\r
          ctx.fillRect(78, by + 6, 364, 60);\r
\r
          const rimG = ctx.createLinearGradient(74, by, 74, by + 60);\r
          rimG.addColorStop(0, '#fef08a');\r
          rimG.addColorStop(0.5, '#d97706');\r
          rimG.addColorStop(1, '#78350f');\r
          ctx.fillStyle = rimG;\r
          ctx.fillRect(74, by, 364, 60);\r
\r
          ctx.fillStyle = '#0f172a';\r
          ctx.fillRect(82, by + 6, 348, 48);\r
\r
          ctx.font = '900 42px Orbitron, sans-serif';\r
          ctx.fillStyle = '#fef08a';\r
          ctx.textAlign = 'center';\r
          ctx.textBaseline = 'middle';\r
          ctx.fillText('B A R', 256, by + 32);\r
\r
          [96, 416].forEach(rx => {\r
            ctx.beginPath();\r
            ctx.arc(rx, by + 30, 5, 0, Math.PI * 2);\r
            ctx.fillStyle = '#facc15';\r
            ctx.fill();\r
          });\r
        });\r
\r
        ctx.font = '900 26px Orbitron, sans-serif';\r
        ctx.fillStyle = '#451a03';\r
        ctx.textAlign = 'center';\r
        ctx.fillText('TRIPLE BAR 20\xD7', 256, 296);\r
      }\r
\r
      else if (symId === 'BELL') {\r
        const cx = 256, cy = 142;\r
        ctx.save();\r
\r
        ctx.beginPath();\r
        ctx.arc(cx, cy + 78, 22, 0, Math.PI * 2);\r
        ctx.fillStyle = '#78350f';\r
        ctx.fill();\r
        ctx.lineWidth = 4;\r
        ctx.strokeStyle = '#b45309';\r
        ctx.stroke();\r
\r
        ctx.beginPath();\r
        ctx.arc(cx, cy - 82, 22, Math.PI, 0);\r
        ctx.lineWidth = 12;\r
        ctx.strokeStyle = '#92400e';\r
        ctx.stroke();\r
\r
        ctx.beginPath();\r
        ctx.moveTo(cx - 52, cy - 72);\r
        ctx.quadraticCurveTo(cx, cy - 88, cx + 52, cy - 72);\r
        ctx.bezierCurveTo(cx + 68, cy - 10, cx + 95, cy + 45, cx + 114, cy + 68);\r
        ctx.lineTo(cx - 114, cy + 68);\r
        ctx.bezierCurveTo(cx - 95, cy + 45, cx - 68, cy - 10, cx - 52, cy - 72);\r
        ctx.closePath();\r
\r
        const bellGrad = ctx.createLinearGradient(cx - 100, cy, cx + 100, cy);\r
        bellGrad.addColorStop(0, '#92400e');\r
        bellGrad.addColorStop(0.3, '#fde047');\r
        bellGrad.addColorStop(0.55, '#d97706');\r
        bellGrad.addColorStop(0.82, '#fef08a');\r
        bellGrad.addColorStop(1, '#78350f');\r
        ctx.fillStyle = bellGrad;\r
        ctx.fill();\r
        ctx.lineWidth = 6;\r
        ctx.strokeStyle = '#78350f';\r
        ctx.stroke();\r
\r
        ctx.beginPath();\r
        ctx.moveTo(cx - 26, cy - 62);\r
        ctx.quadraticCurveTo(cx - 38, cy, cx - 62, cy + 54);\r
        ctx.lineWidth = 10;\r
        ctx.lineCap = 'round';\r
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';\r
        ctx.stroke();\r
        ctx.restore();\r
\r
        ctx.font = '900 28px Orbitron, sans-serif';\r
        ctx.fillStyle = '#78350f';\r
        ctx.textAlign = 'center';\r
        ctx.fillText('GOLD BELL 15\xD7', 256, 294);\r
      }\r
\r
      else if (symId === 'CLOVER') {\r
        const cx = 256, cy = 134;\r
        ctx.save();\r
\r
        ctx.beginPath();\r
        ctx.moveTo(cx, cy + 10);\r
        ctx.quadraticCurveTo(cx + 12, cy + 68, cx + 38, cy + 98);\r
        ctx.lineWidth = 14;\r
        ctx.lineCap = 'round';\r
        ctx.strokeStyle = '#14532d';\r
        ctx.stroke();\r
\r
        for (let i = 0; i < 4; i++) {\r
          ctx.save();\r
          ctx.translate(cx, cy);\r
          ctx.rotate((i * Math.PI) / 2 + Math.PI / 4);\r
\r
          ctx.beginPath();\r
          ctx.moveTo(0, 0);\r
          ctx.bezierCurveTo(-55, -25, -65, -92, -18, -98);\r
          ctx.bezierCurveTo(0, -100, 0, -78, 0, -78);\r
          ctx.bezierCurveTo(0, -78, 0, -100, 18, -98);\r
          ctx.bezierCurveTo(65, -92, 55, -25, 0, 0);\r
          ctx.closePath();\r
\r
          const leafG = ctx.createRadialGradient(0, -52, 5, 0, -52, 65);\r
          leafG.addColorStop(0, '#4ade80');\r
          leafG.addColorStop(0.55, '#15803d');\r
          leafG.addColorStop(1, '#052e16');\r
          ctx.fillStyle = leafG;\r
          ctx.fill();\r
          ctx.lineWidth = 5;\r
          ctx.strokeStyle = '#b45309';\r
          ctx.stroke();\r
\r
          ctx.beginPath();\r
          ctx.moveTo(0, -10);\r
          ctx.lineTo(0, -68);\r
          ctx.lineWidth = 3;\r
          ctx.strokeStyle = '#bbf7d0';\r
          ctx.stroke();\r
          ctx.restore();\r
        }\r
\r
        ctx.beginPath();\r
        ctx.arc(cx, cy, 14, 0, Math.PI * 2);\r
        ctx.fillStyle = '#f59e0b';\r
        ctx.fill();\r
        ctx.restore();\r
\r
        ctx.font = '900 28px Orbitron, sans-serif';\r
        ctx.fillStyle = '#14532d';\r
        ctx.textAlign = 'center';\r
        ctx.fillText('LUCKY CLOVER 10\xD7', 256, 294);\r
      }\r
\r
      else if (symId === 'CHERRY') {\r
        ctx.save();\r
\r
        ctx.beginPath();\r
        ctx.moveTo(188, 174);\r
        ctx.quadraticCurveTo(215, 75, 268, 44);\r
        ctx.quadraticCurveTo(295, 95, 326, 180);\r
        ctx.lineWidth = 10;\r
        ctx.lineCap = 'round';\r
        ctx.strokeStyle = '#15803d';\r
        ctx.stroke();\r
\r
        ctx.beginPath();\r
        ctx.moveTo(268, 44);\r
        ctx.quadraticCurveTo(325, 22, 352, 64);\r
        ctx.quadraticCurveTo(305, 84, 268, 44);\r
        ctx.fillStyle = '#16a34a';\r
        ctx.fill();\r
        ctx.lineWidth = 4;\r
        ctx.strokeStyle = '#14532d';\r
        ctx.stroke();\r
\r
        const drawCherryBall = (x, y, r) => {\r
          ctx.beginPath();\r
          ctx.arc(x + 5, y + 8, r, 0, Math.PI * 2);\r
          ctx.fillStyle = 'rgba(0,0,0,0.32)';\r
          ctx.fill();\r
\r
          const cg = ctx.createRadialGradient(x - r * 0.32, y - r * 0.32, 6, x, y, r);\r
          cg.addColorStop(0, '#fb7185');\r
          cg.addColorStop(0.3, '#e11d48');\r
          cg.addColorStop(0.78, '#9f1239');\r
          cg.addColorStop(1, '#4c0519');\r
\r
          ctx.beginPath();\r
          ctx.arc(x, y, r, 0, Math.PI * 2);\r
          ctx.fillStyle = cg;\r
          ctx.fill();\r
          ctx.lineWidth = 4;\r
          ctx.strokeStyle = '#4c0519';\r
          ctx.stroke();\r
\r
          ctx.beginPath();\r
          ctx.arc(x - r * 0.3, y - r * 0.3, r * 0.22, 0, Math.PI * 2);\r
          ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';\r
          ctx.fill();\r
        };\r
\r
        drawCherryBall(184, 184, 54);\r
        drawCherryBall(324, 188, 54);\r
        ctx.restore();\r
\r
        ctx.font = '900 26px Orbitron, sans-serif';\r
        ctx.fillStyle = '#881337';\r
        ctx.textAlign = 'center';\r
        ctx.fillText('CHERRY 5\xD7 / 2\xD7 / 1\xD7', 256, 294);\r
      }\r
\r
      const tex = new THREE.CanvasTexture(c);\r
      tex.encoding = THREE.sRGBEncoding;\r
      tex.anisotropy = maxAnisotropy;\r
      tex.needsUpdate = true;\r
      symbolTextureCache[symId] = tex;\r
      return tex;\r
    }\r
\r
    /* ============================================================================\r
       5. LAS VEGAS 3D CABINET CHASSIS, CHASING BULBS & 3D DIGITAL SCOREBOARD\r
       ============================================================================ */\r
    const cabinetGroup = new THREE.Group();\r
    scene.add(cabinetGroup);\r
\r
    // Reflective Dark Marble Casino Floor\r
    const floorMesh = new THREE.Mesh(\r
      new THREE.PlaneGeometry(45, 45),\r
      new THREE.MeshStandardMaterial({ color: 0x08060e, metalness: 0.7, roughness: 0.2 })\r
    );\r
    floorMesh.rotation.x = -Math.PI / 2;\r
    floorMesh.position.y = -2.65;\r
    floorMesh.receiveShadow = true;\r
    scene.add(floorMesh);\r
\r
    // 1. Lower Cabinet Pedestal & Recessed Stainless-Steel Coin Tray\r
    const pedestalMesh = new THREE.Mesh(new THREE.BoxGeometry(4.6, 1.35, 2.7), brushedObsidianMat);\r
    pedestalMesh.position.set(0, -1.95, 0);\r
    pedestalMesh.castShadow = true;\r
    pedestalMesh.receiveShadow = true;\r
    cabinetGroup.add(pedestalMesh);\r
\r
    // Chrome Coin Tray Basin at bottom front\r
    const trayOuter = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.32, 0.95), mirrorChromeMat);\r
    trayOuter.position.set(0, -2.35, 1.48);\r
    trayOuter.castShadow = true;\r
    cabinetGroup.add(trayOuter);\r
\r
    const trayInner = new THREE.Mesh(\r
      new THREE.BoxGeometry(3.26, 0.22, 0.76),\r
      new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.85, roughness: 0.25 })\r
    );\r
    trayInner.position.set(0, -2.28, 1.52);\r
    cabinetGroup.add(trayInner);\r
\r
    // Coin Chute Dispenser Slot\r
    const chuteSlot = new THREE.Mesh(\r
      new THREE.BoxGeometry(0.95, 0.22, 0.2),\r
      new THREE.MeshStandardMaterial({ color: 0x030305, roughness: 0.9 })\r
    );\r
    chuteSlot.position.set(0, -1.82, 1.34);\r
    cabinetGroup.add(chuteSlot);\r
\r
    // 2. Main Upper Cabinet Body\r
    const upperCabinet = new THREE.Mesh(new THREE.BoxGeometry(4.45, 3.1, 2.35), crimsonLacquerMat);\r
    upperCabinet.position.set(0, 0.25, -0.1);\r
    upperCabinet.castShadow = true;\r
    upperCabinet.receiveShadow = true;\r
    cabinetGroup.add(upperCabinet);\r
\r
    // Stepped Mirror-Chrome & 24K Gold Vertical Side Rails\r
    [-2.24, 2.24].forEach(xSide => {\r
      const chromeRail = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 3.2, 24), mirrorChromeMat);\r
      chromeRail.position.set(xSide, 0.25, 1.06);\r
      chromeRail.castShadow = true;\r
      cabinetGroup.add(chromeRail);\r
\r
      const goldAccentRail = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 3.15, 16), gold24kMat);\r
      goldAccentRail.position.set(xSide * 0.94, 0.25, 1.15);\r
      cabinetGroup.add(goldAccentRail);\r
    });\r
\r
    // Top & Bottom Heavy 24K Gold Moldings framing the Reel Window\r
    [-0.78, 1.18].forEach(yBar => {\r
      const molding = new THREE.Mesh(new THREE.BoxGeometry(4.52, 0.16, 0.36), gold24kMat);\r
      molding.position.set(0, yBar, 1.08);\r
      molding.castShadow = true;\r
      cabinetGroup.add(molding);\r
    });\r
\r
    // Deep Matte Obsidian Reel Bay Cavity (zero pink reflection behind the reels)\r
    const reelBayCavity = new THREE.Mesh(\r
      new THREE.BoxGeometry(4.12, 1.92, 1.45),\r
      new THREE.MeshStandardMaterial({ color: 0x050508, roughness: 0.9, metalness: 0.05 })\r
    );\r
    reelBayCavity.position.set(0, 0.2, 0.15);\r
    cabinetGroup.add(reelBayCavity);\r
\r
    // Chrome Internal Dividers between the 3 Reels\r
    [-0.66, 0.66].forEach(divX => {\r
      const dividerRing = new THREE.Mesh(\r
        new THREE.TorusGeometry(1.06, 0.025, 16, 48, Math.PI * 0.85),\r
        mirrorChromeMat\r
      );\r
      dividerRing.rotation.y = Math.PI / 2;\r
      dividerRing.rotation.z = -Math.PI * 0.425;\r
      dividerRing.position.set(divX, 0.2, 0.12);\r
      cabinetGroup.add(dividerRing);\r
    });\r
\r
    // Center Neon Payline Guide Bars & Left/Right Illuminated Payline Arrows\r
    const paylineLaserMat = new THREE.MeshStandardMaterial({\r
      color: 0xff2a2a,\r
      emissive: 0xff2222,\r
      emissiveIntensity: 1.8,\r
      roughness: 0.15\r
    });\r
\r
    // Thin top & bottom laser rails bracketing the center winning row so symbols aren't covered\r
    [-0.25, 0.65].forEach(py => {\r
      const laserLine = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 4.08, 12), paylineLaserMat);\r
      laserLine.rotation.z = Math.PI / 2;\r
      laserLine.position.set(0, py, 1.18);\r
      cabinetGroup.add(laserLine);\r
    });\r
\r
    // Left & Right 3D Payline Pointer Triangles\r
    [-2.02, 2.02].forEach((px, idx) => {\r
      const arrowGeo = new THREE.ConeGeometry(0.13, 0.24, 3);\r
      arrowGeo.rotateZ(idx === 0 ? -Math.PI / 2 : Math.PI / 2);\r
      const arrowMesh = new THREE.Mesh(arrowGeo, paylineLaserMat);\r
      arrowMesh.position.set(px, 0.2, 1.22);\r
      cabinetGroup.add(arrowMesh);\r
    });\r
\r
    // 3. Top Marquee Crown with 18 Animated 3D Chasing Light Bulbs\r
    function createVegasMarqueeTexture() {\r
      const c = document.createElement('canvas');\r
      c.width = 1024;\r
      c.height = 256;\r
      const ctx = c.getContext('2d');\r
\r
      const g = ctx.createLinearGradient(0, 0, 0, 256);\r
      g.addColorStop(0, '#3b0707');\r
      g.addColorStop(0.5, '#991b1b');\r
      g.addColorStop(1, '#260404');\r
      ctx.fillStyle = g;\r
      ctx.fillRect(0, 0, 1024, 256);\r
\r
      ctx.strokeStyle = '#fde047';\r
      ctx.lineWidth = 12;\r
      ctx.strokeRect(10, 10, 1004, 236);\r
\r
      ctx.font = '800 28px Orbitron, sans-serif';\r
      ctx.fillStyle = '#fde68a';\r
      ctx.textAlign = 'center';\r
      ctx.fillText('\u2605 LAS VEGAS CASINO DELUXE \u2605', 512, 54);\r
\r
      ctx.font = '900 122px Orbitron, sans-serif';\r
      ctx.shadowColor = '#facc15';\r
      ctx.shadowBlur = 24;\r
      ctx.fillStyle = '#fef08a';\r
      ctx.fillText('LUCKY 777', 512, 165);\r
\r
      const tex = new THREE.CanvasTexture(c);\r
      tex.encoding = THREE.sRGBEncoding;\r
      tex.anisotropy = maxAnisotropy;\r
      return tex;\r
    }\r
\r
    const marqueeBox = new THREE.Mesh(new THREE.BoxGeometry(4.35, 0.92, 1.35), gold24kMat);\r
    marqueeBox.position.set(0, 2.22, 0.25);\r
    marqueeBox.castShadow = true;\r
    cabinetGroup.add(marqueeBox);\r
\r
    const marqueeTex = createVegasMarqueeTexture();\r
    const marqueePanel = new THREE.Mesh(\r
      new THREE.PlaneGeometry(4.05, 0.72),\r
      new THREE.MeshStandardMaterial({\r
        map: marqueeTex,\r
        emissive: 0xffffff,\r
        emissiveMap: marqueeTex,\r
        emissiveIntensity: 0.85,\r
        roughness: 0.2\r
      })\r
    );\r
    marqueePanel.position.set(0, 2.22, 0.935);\r
    cabinetGroup.add(marqueePanel);\r
\r
    // 18 Chasing 3D Light Bulbs around the Marquee Bezel\r
    const marqueeBulbs = [];\r
    const bulbGeo = new THREE.SphereGeometry(0.052, 12, 12);\r
    for (let i = 0; i < 18; i++) {\r
      const bx = -1.95 + (i / 17) * 3.9;\r
      const bMat = new THREE.MeshStandardMaterial({\r
        color: 0xfef08a,\r
        emissive: i % 2 === 0 ? 0xfacc15 : 0xef4444,\r
        emissiveIntensity: 1.5,\r
        roughness: 0.1\r
      });\r
      const bulbTop = new THREE.Mesh(bulbGeo, bMat);\r
      bulbTop.position.set(bx, 2.63, 0.94);\r
      cabinetGroup.add(bulbTop);\r
      marqueeBulbs.push({ mat: bMat, idx: i });\r
    }\r
\r
    // 4. Integrated 3D Digital LED Scoreboard on the Cabinet Face\r
    const ledCanvas = document.createElement('canvas');\r
    ledCanvas.width = 1024;\r
    ledCanvas.height = 160;\r
    const ledCtx = ledCanvas.getContext('2d');\r
    const ledTexture = new THREE.CanvasTexture(ledCanvas);\r
    ledTexture.encoding = THREE.sRGBEncoding;\r
    ledTexture.anisotropy = maxAnisotropy;\r
\r
    function update3DScoreboardTexture() {\r
      ledCtx.fillStyle = '#05060b';\r
      ledCtx.fillRect(0, 0, 1024, 160);\r
\r
      ledCtx.strokeStyle = '#f59e0b';\r
      ledCtx.lineWidth = 6;\r
      ledCtx.strokeRect(4, 4, 1016, 152);\r
\r
      // Divider lines\r
      ledCtx.strokeStyle = 'rgba(245, 158, 11, 0.35)';\r
      ledCtx.beginPath();\r
      ledCtx.moveTo(340, 14);\r
      ledCtx.lineTo(340, 146);\r
      ledCtx.moveTo(682, 14);\r
      ledCtx.lineTo(682, 146);\r
      ledCtx.stroke();\r
\r
      ledCtx.textAlign = 'center';\r
      ledCtx.font = '700 22px Orbitron, sans-serif';\r
      ledCtx.fillStyle = '#fbbf24';\r
      ledCtx.fillText('CREDITS', 170, 40);\r
      ledCtx.fillText('ACTIVE BET', 512, 40);\r
      ledCtx.fillText('LAST WIN', 852, 40);\r
\r
      ledCtx.font = '900 54px Orbitron, sans-serif';\r
      // Credits Value\r
      ledCtx.fillStyle = '#4ade80';\r
      ledCtx.fillText(credits.toLocaleString(), 170, 110);\r
\r
      // Bet Value\r
      const betVal = getActiveBetAmount();\r
      ledCtx.fillStyle = selectedBetMode === 'ALL_IN' ? '#f87171' : '#fde047';\r
      ledCtx.fillText(\r
        selectedBetMode === 'ALL_IN' ? \`ALL (\${betVal})\` : betVal.toLocaleString(),\r
        512,\r
        110\r
      );\r
\r
      // Last Win Value\r
      ledCtx.fillStyle = '#38bdf8';\r
      ledCtx.fillText(lastWinAmount.toLocaleString(), 852, 110);\r
\r
      ledTexture.needsUpdate = true;\r
    }\r
\r
    const scoreboardBezel = new THREE.Mesh(new THREE.BoxGeometry(4.1, 0.44, 0.16), mirrorChromeMat);\r
    scoreboardBezel.position.set(0, -0.52, 1.15);\r
    cabinetGroup.add(scoreboardBezel);\r
\r
    const scoreboardScreen = new THREE.Mesh(\r
      new THREE.PlaneGeometry(3.96, 0.36),\r
      new THREE.MeshStandardMaterial({\r
        map: ledTexture,\r
        emissive: 0xffffff,\r
        emissiveMap: ledTexture,\r
        emissiveIntensity: 0.92,\r
        roughness: 0.15\r
      })\r
    );\r
    scoreboardScreen.position.set(0, -0.52, 1.235);\r
    cabinetGroup.add(scoreboardScreen);\r
\r
    /* ============================================================================\r
       6. UPRIGHT 3D CURVED CYLINDRICAL REEL DRUMS (CUSTOM BENT PLANE GEOMETRY)\r
       ============================================================================ */\r
    const reels = [];\r
    const REEL_X_COORDS = [-1.28, 0, 1.28];\r
    const REEL_RADIUS = 1.05;\r
    const REEL_WIDTH = 1.18;\r
\r
    // Create a single reusable curved tile geometry bent around the X-axis\r
    // so PlaneGeometry's standard UVs stay 100% UPRIGHT (never rotated 90 degrees!)\r
    function createCurvedReelTileGeometry() {\r
      const arcHeight = 2 * REEL_RADIUS * Math.sin(STOP_ANGLE / 2) * 0.98;\r
      const geo = new THREE.PlaneGeometry(REEL_WIDTH * 0.94, arcHeight, 1, 16);\r
      const pos = geo.attributes.position;\r
      const norm = geo.attributes.normal;\r
\r
      for (let i = 0; i < pos.count; i++) {\r
        const vx = pos.getX(i);\r
        const vy = pos.getY(i);\r
        const localTheta = (vy / (arcHeight / 2)) * (STOP_ANGLE / 2);\r
        pos.setXYZ(\r
          i,\r
          vx,\r
          Math.sin(localTheta) * REEL_RADIUS,\r
          Math.cos(localTheta) * REEL_RADIUS\r
        );\r
        norm.setXYZ(i, 0, Math.sin(localTheta), Math.cos(localTheta));\r
      }\r
      geo.computeVertexNormals();\r
      return geo;\r
    }\r
\r
    const sharedCurvedTileGeo = createCurvedReelTileGeometry();\r
\r
    REEL_X_COORDS.forEach((rx) => {\r
      const drumPivot = new THREE.Group();\r
      drumPivot.position.set(rx, 0.2, 0.12);\r
      cabinetGroup.add(drumPivot);\r
\r
      // Dark Gunmetal Inner Drum Core so no gaps ever appear between curved tiles\r
      const innerDrumCore = new THREE.Mesh(\r
        new THREE.CylinderGeometry(REEL_RADIUS * 0.98, REEL_RADIUS * 0.98, REEL_WIDTH, 48),\r
        gunmetalDrumMat\r
      );\r
      innerDrumCore.rotation.z = Math.PI / 2;\r
      drumPivot.add(innerDrumCore);\r
\r
      // Left & Right Brushed 24K Gold Outer Flange Rings\r
      [-REEL_WIDTH / 2 - 0.02, REEL_WIDTH / 2 + 0.02].forEach(sideX => {\r
        const flange = new THREE.Mesh(\r
          new THREE.CylinderGeometry(REEL_RADIUS * 1.015, REEL_RADIUS * 1.015, 0.04, 48),\r
          gold24kMat\r
        );\r
        flange.rotation.z = Math.PI / 2;\r
        flange.position.x = sideX;\r
        drumPivot.add(flange);\r
      });\r
\r
      // Mount 12 upright curved symbol segments around the drum circumference\r
      const segmentMeshes = [];\r
      REEL_STRIP.forEach((symId, idx) => {\r
        const tex = createHighDPISymbolTexture(symId);\r
        // Glare-free satin material so there is zero white specular hotspot on the reels\r
        const segMat = new THREE.MeshStandardMaterial({\r
          map: tex,\r
          roughness: 0.65,\r
          metalness: 0.05,\r
          envMapIntensity: 0.15,\r
          emissive: 0xffffff,\r
          emissiveMap: tex,\r
          emissiveIntensity: 0.28\r
        });\r
\r
        const segMesh = new THREE.Mesh(sharedCurvedTileGeo, segMat);\r
        // Position each stop at its angle around X-axis so idx=0 faces +Z upright\r
        segMesh.rotation.x = -idx * STOP_ANGLE;\r
        drumPivot.add(segMesh);\r
        segmentMeshes.push({ mesh: segMesh, mat: segMat, symId });\r
      });\r
\r
      reels.push({\r
        group: drumPivot,\r
        segments: segmentMeshes,\r
        angle: 0,\r
        targetStop: 0\r
      });\r
    });\r
\r
    /* ============================================================================\r
       7. SLANTED CHROME CONTROL DECK WITH 6 BACKLIT 3D BET BUTTONS + 3D SPIN BUTTON\r
       ============================================================================ */\r
    const deckGroup = new THREE.Group();\r
    deckGroup.position.set(0, -1.06, 1.48);\r
    deckGroup.rotation.x = 0.34;\r
    cabinetGroup.add(deckGroup);\r
\r
    // Chrome Deck Base & Gold Front Wrist Rest\r
    const deckBody = new THREE.Mesh(new THREE.BoxGeometry(4.56, 0.32, 1.08), brushedObsidianMat);\r
    deckBody.castShadow = true;\r
    deckGroup.add(deckBody);\r
\r
    const wristRail = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 4.58, 24), mirrorChromeMat);\r
    wristRail.rotation.z = Math.PI / 2;\r
    wristRail.position.set(0, 0.14, 0.54);\r
    deckGroup.add(wristRail);\r
\r
    const interactiveMeshes = [];\r
    const deckButtons3D = [];\r
\r
    function createAcrylicButtonTexture(text, bgHex, borderHex) {\r
      const c = document.createElement('canvas');\r
      c.width = 256;\r
      c.height = 144;\r
      const ctx = c.getContext('2d');\r
\r
      ctx.fillStyle = bgHex;\r
      ctx.fillRect(0, 0, 256, 144);\r
      ctx.strokeStyle = borderHex;\r
      ctx.lineWidth = 10;\r
      ctx.strokeRect(6, 6, 244, 132);\r
\r
      ctx.font = text.length > 4 ? '900 42px Orbitron, sans-serif' : '900 52px Orbitron, sans-serif';\r
      ctx.fillStyle = '#ffffff';\r
      ctx.textAlign = 'center';\r
      ctx.textBaseline = 'middle';\r
      ctx.fillText(text, 128, 74);\r
\r
      const tex = new THREE.CanvasTexture(c);\r
      tex.encoding = THREE.sRGBEncoding;\r
      tex.anisotropy = maxAnisotropy;\r
      return tex;\r
    }\r
\r
    // 6 Physical Bet Buttons (10, 50, 100, 500, 1000, ALL IN)\r
    BET_TIERS.forEach((tier, idx) => {\r
      const bx = -1.88 + idx * 0.61;\r
      const isAllIn = tier === 'ALL_IN';\r
      const label = isAllIn ? 'ALL IN' : String(tier);\r
      const tex = createAcrylicButtonTexture(\r
        label,\r
        isAllIn ? '#b91c1c' : '#d97706',\r
        '#fef08a'\r
      );\r
\r
      // Chrome Bezel Housing\r
      const bezel = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.14, 0.48), mirrorChromeMat);\r
      bezel.position.set(bx, 0.16, 0.02);\r
      deckGroup.add(bezel);\r
\r
      const capMat = new THREE.MeshStandardMaterial({\r
        map: tex,\r
        emissive: isAllIn ? 0xff2222 : 0xfacc15,\r
        emissiveMap: tex,\r
        emissiveIntensity: tier === 100 ? 0.95 : 0.25,\r
        roughness: 0.15\r
      });\r
\r
      const capMesh = new THREE.Mesh(new THREE.BoxGeometry(0.49, 0.14, 0.41), capMat);\r
      capMesh.position.set(bx, 0.23, 0.02);\r
      capMesh.userData = { action: 'BET', value: tier };\r
      deckGroup.add(capMesh);\r
\r
      deckButtons3D.push({ mesh: capMesh, mat: capMat, value: tier });\r
      interactiveMeshes.push(capMesh);\r
    });\r
\r
    // Large Glowing 3D SPIN Push-Button on the right of the Deck\r
    const spinBezel = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.36, 0.16, 28), gold24kMat);\r
    spinBezel.position.set(1.78, 0.17, 0.02);\r
    deckGroup.add(spinBezel);\r
\r
    const spinTex = createAcrylicButtonTexture('SPIN', '#16a34a', '#dcfce7');\r
    const spinCapMat = new THREE.MeshStandardMaterial({\r
      map: spinTex,\r
      emissive: 0x4ade80,\r
      emissiveMap: spinTex,\r
      emissiveIntensity: 0.85,\r
      roughness: 0.12\r
    });\r
    const spinCapMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.29, 0.29, 0.15, 28), spinCapMat);\r
    spinCapMesh.rotation.y = Math.PI / 2;\r
    spinCapMesh.position.set(1.78, 0.24, 0.02);\r
    spinCapMesh.userData = { action: 'SPIN_BUTTON' };\r
    deckGroup.add(spinCapMesh);\r
    interactiveMeshes.push(spinCapMesh);\r
\r
    /* ============================================================================\r
       8. HYPER-REALISTIC PULLABLE 3D MECHANICAL JOYSTICK / SLOT ARM\r
       ============================================================================ */\r
    const gearboxGroup = new THREE.Group();\r
    gearboxGroup.position.set(2.35, -0.08, 0.22);\r
    cabinetGroup.add(gearboxGroup);\r
\r
    // 1. Cast-Gold & Brushed-Chrome Rotary Ratchet Gearbox Housing bolted to cabinet\r
    const gearboxFlange = new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.46, 0.22, 32), gold24kMat);\r
    gearboxFlange.rotation.z = Math.PI / 2;\r
    gearboxFlange.castShadow = true;\r
    gearboxGroup.add(gearboxFlange);\r
\r
    const gearboxDrum = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.36, 0.42, 32), mirrorChromeMat);\r
    gearboxDrum.rotation.z = Math.PI / 2;\r
    gearboxDrum.position.x = 0.18;\r
    gearboxGroup.add(gearboxDrum);\r
\r
    // 6 Hex Bolts around Gearbox Flange\r
    for (let b = 0; b < 6; b++) {\r
      const ba = (b * Math.PI) / 3;\r
      const bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.26, 6), mirrorChromeMat);\r
      bolt.rotation.z = Math.PI / 2;\r
      bolt.position.set(0.02, Math.sin(ba) * 0.36, Math.cos(ba) * 0.36);\r
      gearboxGroup.add(bolt);\r
    }\r
\r
    // 2. 3D Curved LED Pull-Force Arc mounted right on the Gearbox side\r
    const pullArcLEDs = [];\r
    const arcLedGeo = new THREE.BoxGeometry(0.06, 0.045, 0.09);\r
    for (let i = 0; i < 10; i++) {\r
      // Arc from top (-20 deg) down to front (+75 deg)\r
      const angle = -0.2 + (i / 9) * 1.35;\r
      const ledColor = i < 4 ? 0x22c55e : i < 7 ? 0xfacc15 : 0xef4444;\r
      const ledMat = new THREE.MeshStandardMaterial({\r
        color: 0x1f2937,\r
        emissive: ledColor,\r
        emissiveIntensity: 0.08,\r
        roughness: 0.2\r
      });\r
      const ledMesh = new THREE.Mesh(arcLedGeo, ledMat);\r
      ledMesh.position.set(\r
        0.14,\r
        Math.cos(angle) * 0.54,\r
        Math.sin(angle) * 0.54\r
      );\r
      ledMesh.rotation.x = angle;\r
      gearboxGroup.add(ledMesh);\r
      pullArcLEDs.push({ mat: ledMat, threshold: (i + 1) / 10 });\r
    }\r
\r
    // 3. Rotating Lever Arm Pivot Group\r
    const leverPivot = new THREE.Group();\r
    leverPivot.position.set(0.36, 0, 0);\r
    gearboxGroup.add(leverPivot);\r
\r
    // Ribbed Black Rubber Accordion Dust Boot (5 stacked torus rings)\r
    const bootRings = [];\r
    for (let r = 0; r < 5; r++) {\r
      const ringRadius = 0.19 - r * 0.015;\r
      const ring = new THREE.Mesh(new THREE.TorusGeometry(ringRadius, 0.036, 14, 28), rubberBootMat);\r
      ring.rotation.x = Math.PI / 2;\r
      ring.position.y = 0.08 + r * 0.052;\r
      leverPivot.add(ring);\r
      bootRings.push(ring);\r
    }\r
\r
    // Tapered Mirror-Chrome Cylindrical Arm Shaft\r
    const armShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.068, 0.105, 1.95, 28), mirrorChromeMat);\r
    armShaft.position.set(0, 1.05, 0);\r
    armShaft.castShadow = true;\r
    armShaft.userData = { action: 'JOYSTICK' };\r
    leverPivot.add(armShaft);\r
    interactiveMeshes.push(armShaft);\r
\r
    // Knurled 24K Gold Middle Collar & Upper Neck Collar\r
    [0.52, 1.82].forEach(cy => {\r
      const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.115, 0.115, 0.12, 24), gold24kMat);\r
      collar.position.set(0, cy, 0);\r
      collar.userData = { action: 'JOYSTICK' };\r
      leverPivot.add(collar);\r
      interactiveMeshes.push(collar);\r
    });\r
\r
    // 4. Glossy Candy-Apple Red Clearcoat Ball-Top Handle with Inlaid Gold "777" Cap\r
    const ballHandleMat = new THREE.MeshPhysicalMaterial({\r
      color: 0xdc2626,\r
      emissive: 0x7f1d1d,\r
      emissiveIntensity: 0.32,\r
      roughness: 0.05,\r
      metalness: 0.15,\r
      clearcoat: 1.0,\r
      clearcoatRoughness: 0.03,\r
      envMapIntensity: 1.8\r
    });\r
\r
    const ballHandle = new THREE.Mesh(new THREE.SphereGeometry(0.36, 40, 40), ballHandleMat);\r
    ballHandle.position.set(0, 2.15, 0);\r
    ballHandle.castShadow = true;\r
    ballHandle.userData = { action: 'JOYSTICK' };\r
    leverPivot.add(ballHandle);\r
    interactiveMeshes.push(ballHandle);\r
\r
    // Equator 24K Gold Ring around the Joystick Ball\r
    const ballGoldBelt = new THREE.Mesh(new THREE.TorusGeometry(0.362, 0.024, 16, 40), gold24kMat);\r
    ballGoldBelt.rotation.x = Math.PI / 2;\r
    ballHandle.add(ballGoldBelt);\r
\r
    // Top Inlaid "777" Medallion Cap on the Ball Handle\r
    const capMedallion = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.04, 28), gold24kMat);\r
    capMedallion.position.set(0, 0.34, 0);\r
    ballHandle.add(capMedallion);\r
\r
    // Pulsing 3D Golden Grab-Halo Ring around Joystick Ball when idle\r
    const grabHaloMat = new THREE.MeshBasicMaterial({\r
      color: 0xfde047,\r
      transparent: true,\r
      opacity: 0.55,\r
      side: THREE.DoubleSide\r
    });\r
    const grabHaloRing = new THREE.Mesh(new THREE.RingGeometry(0.43, 0.48, 36), grabHaloMat);\r
    grabHaloRing.position.set(0, 2.15, 0);\r
    leverPivot.add(grabHaloRing);\r
\r
    /* ============================================================================\r
       9. JOYSTICK DRAG PHYSICS, SPRING RETURN & RAYCAST INTERACTION\r
       ============================================================================ */\r
    const ARM_REST_ANGLE = -0.14;       // Slight backward rest angle\r
    const ARM_MAX_PULL_ANGLE = 1.28;    // Full forward/downward pull (~80 degrees)\r
\r
    let isDraggingArm = false;\r
    let armPullRatio = 0;               // 0.0 to 1.0\r
    let armSpringVelocity = 0;\r
    let lastRatchetTooth = 0;\r
\r
    leverPivot.rotation.x = ARM_REST_ANGLE;\r
\r
    function syncArmVisuals(ratio) {\r
      const clamped = Math.max(0, Math.min(1, ratio));\r
      leverPivot.rotation.x = ARM_REST_ANGLE + clamped * (ARM_MAX_PULL_ANGLE - ARM_REST_ANGLE);\r
\r
      // Compress rubber dust boot slightly as arm bends forward\r
      bootRings.forEach((ring, idx) => {\r
        ring.position.z = clamped * idx * 0.014;\r
      });\r
\r
      // Light up the 3D LED Pull-Force Arc on the gearbox\r
      pullArcLEDs.forEach(led => {\r
        led.mat.emissiveIntensity = clamped >= led.threshold - 0.05 ? 1.8 : 0.08;\r
      });\r
\r
      // Update HTML Right-Side Tension Gauge\r
      const pct = Math.round(clamped * 100);\r
      document.getElementById('tensionFill').style.height = \`\${pct}%\`;\r
      document.getElementById('tensionPct').textContent = \`\${pct}%\`;\r
    }\r
\r
    const raycaster = new THREE.Raycaster();\r
    const pointerNDC = new THREE.Vector2();\r
    const input = createLuckyInput(renderer.domElement, {\r
      canAct: () => visible && !isSpinning && !callbacks.locked(),\r
      hitTest(x, y) {\r
        pointerNDC.set(x, y);\r
        scene.updateMatrixWorld(true);\r
        raycaster.setFromCamera(pointerNDC, camera);\r
        const hits = raycaster.intersectObjects(interactiveMeshes, false);\r
        return hits[0]?.object.userData;\r
      },\r
      bet: setBetMode,\r
      spin: () => QuickPullAndSpin(),\r
      dragging(value) { isDraggingArm = value; callbacks.changed(); },\r
      pull(ratio) {\r
        armPullRatio = ratio;\r
        armSpringVelocity = 0;\r
        syncArmVisuals(ratio);\r
        const tooth = Math.floor(ratio * 12);\r
        if (tooth !== lastRatchetTooth) {\r
          lastRatchetTooth = tooth;\r
          playSynthTone(170 + tooth * 28, 'sawtooth', 0.032, 0.12);\r
        }\r
      }\r
    });\r
\r
    async function QuickPullAndSpin(jackpot = false) {\r
      if (isSpinning || !visible || callbacks.locked()) return;\r
      armPullRatio = 1.0;\r
      syncArmVisuals(1.0);\r
      return executeReelSpin(jackpot);\r
    }\r
\r
    /* ============================================================================\r
       10. BETTING LOGIC, REEL SPIN PHYSICS & PAYOUT EVALUATION\r
       ============================================================================ */\r
    function setBetMode(mode) {\r
      if (isSpinning || !visible || callbacks.locked()) return;\r
      if (engine.armedCard) { callbacks.notify('\u8BF7\u5148\u53D6\u6D88\u88C5\u5907\u5361\u7247\uFF0C\u518D\u66F4\u6539\u7ED1\u5B9A\u4E0B\u6CE8\u3002', true); return; }\r
      selectedBetMode = mode;\r
\r
      if (mode === 'ALL_IN') {\r
        playSynthChord([220, 330, 440, 660], 'sawtooth', 0.2, 0.13);\r
        setStatus('\u{1F525} ALL IN ARMED! Every single credit is on the payline \u2014 pull the 3D joystick!');\r
      } else {\r
        playSynthTone(520, 'triangle', 0.06, 0.1);\r
        setStatus(\`Bet set to \${mode.toLocaleString()} credits. Pull the 3D joystick or click SPIN!\`);\r
      }\r
      refreshAllUI();\r
    }\r
\r
    function rebuyCredits() { if (!isSpinning && !isDraggingArm) callbacks.bank(); }\r
\r
    function refreshAllUI() {\r
      const activeBet = getActiveBetAmount();\r
      document.getElementById('lucky-custom-toggle').textContent = selectedBetMode === 'CUSTOM' ? 'Bet: ' + customBet.toLocaleString() + ' \xB7 Edit' : 'Custom bet';\r
      document.getElementById('uiCredits').textContent = credits.toLocaleString();\r
      document.getElementById('uiBet').textContent =\r
        selectedBetMode === 'ALL_IN'\r
          ? \`ALL IN (\${activeBet.toLocaleString()})\`\r
          : activeBet.toLocaleString();\r
      document.getElementById('uiWin').textContent = lastWinAmount.toLocaleString();\r
\r
      document.getElementById('rebuyBtn').classList.toggle('hidden', credits > 0);\r
      document.getElementById('uiSpinBtn').disabled = isSpinning || callbacks.locked() || credits <= 0;\r
\r
      // Sync HTML bet buttons\r
      document.querySelectorAll('.bet-btn').forEach(btn => {\r
        const val = btn.dataset.bet === 'ALL_IN' ? 'ALL_IN' : Number(btn.dataset.bet);\r
        btn.classList.toggle('active', val === selectedBetMode);\r
        btn.disabled = isSpinning || callbacks.locked() || !!engine.armedCard;\r
      });\r
\r
      // Sync 3D Physical Deck Buttons (depress active button & boost internal LED glow)\r
      deckButtons3D.forEach(b => {\r
        const active = engine.armedCard ? b.value === activeBet : b.value === selectedBetMode;\r
        b.mesh.position.y = active ? 0.19 : 0.23;\r
        b.mat.emissiveIntensity = active ? 1.15 : 0.25;\r
      });\r
\r
      // Update 3D Digital LED Scoreboard on the Cabinet\r
      update3DScoreboardTexture();\r
    }\r
\r
    function openBlackMarket() {\r
      if (isSpinning || !visible || callbacks.locked()) return;\r
      callbacks.market?.();\r
    }\r
\r
    async function executeReelSpin(jackpot = false) {\r
      if (isSpinning || !visible || callbacks.locked()) return;\r
\r
      const wager = getActiveBetAmount();\r
      try { spinResult = await engine.spinSlots(wager, null, { allIn: wager === engine.active.balance, jackpot }); }\r
      catch (error) { callbacks.notify(error.message, true); return; }\r
      const isAllInSpin = selectedBetMode === 'ALL_IN' || wager === credits;\r
      isSpinning = true;\r
      if (engine.remote) engine.lock = 'slots';\r
      visualBalance = engine.active.balance - spinResult.payout;\r
      credits = visualBalance;\r
      lastWinAmount = 0;\r
      callbacks.changed();\r
\r
      // Reset payline laser & segment emissive levels\r
      paylineLaserMat.color.setHex(0xff2a2a);\r
      paylineLaserMat.emissive.setHex(0xff2222);\r
      reels.forEach(r => r.segments.forEach(s => { s.mat.emissiveIntensity = 0.28; }));\r
\r
      // Depress 3D Spin button momentarily\r
      spinCapMesh.position.y = 0.19;\r
      setTimeout(() => { spinCapMesh.position.y = 0.24; }, 220);\r
\r
      refreshAllUI();\r
\r
      // Heavy mechanical latch clunk\r
      playSynthChord([135, 92, 280], 'sawtooth', 0.12, 0.18);\r
      setStatus(\r
        isAllInSpin\r
          ? \`\u{1F525} ALL IN (\${wager.toLocaleString()} CREDITS)! Reels rolling...\`\r
          : \`\u{1F3B0} Spinning for \${wager.toLocaleString()} credits...\`\r
      );\r
\r
      const chosenStops = spinResult.reels;\r
      const spinTimes = reducedMotion ? [0, 0, 0] : [1500, 2100, 2750];\r
      const extraTurns = [6, 8, 11];\r
\r
      reels.forEach((reel, rIdx) => {\r
        const stopIdx = chosenStops[rIdx];\r
        reel.targetStop = stopIdx;\r
\r
        const startRot = reel.angle;\r
        const baseFullTurns = Math.ceil(startRot / (Math.PI * 2)) * (Math.PI * 2);\r
        const targetRot = baseFullTurns + extraTurns[rIdx] * (Math.PI * 2) + stopIdx * STOP_ANGLE;\r
\r
        const duration = spinTimes[rIdx];\r
        const tStart = performance.now();\r
        let lastClickStep = Math.floor(startRot / STOP_ANGLE);\r
\r
        function updateReelSpin(now) {\r
          const elapsed = now - tStart;\r
          const t = duration === 0 ? 1 : Math.min(1, elapsed / duration);\r
\r
          // Authentic wind-up + mechanical overshoot bounce when locking into place\r
          let eased;\r
          if (t < 0.065) {\r
            eased = -0.014 * Math.sin((t / 0.065) * Math.PI);\r
          } else {\r
            const st = (t - 0.065) / 0.935;\r
            const c1 = 1.38;\r
            const c3 = c1 + 1;\r
            eased = 1 + c3 * Math.pow(st - 1, 3) + c1 * Math.pow(st - 1, 2);\r
          }\r
\r
          const currentRot = startRot + (targetRot - startRot) * eased;\r
          reel.group.rotation.x = currentRot;\r
\r
          const stepNow = Math.floor(currentRot / STOP_ANGLE);\r
          if (stepNow !== lastClickStep && t < 0.95) {\r
            lastClickStep = stepNow;\r
            playSynthTone(250 + rIdx * 45, 'sine', 0.022, 0.045);\r
          }\r
\r
          if (t < 1) {\r
            requestAnimationFrame(updateReelSpin);\r
          } else {\r
            reel.angle = targetRot % (Math.PI * 2);\r
            reel.group.rotation.x = reel.angle;\r
            // Solid mechanical drum stop thud\r
            playSynthTone(150 + rIdx * 55, 'triangle', 0.14, 0.24);\r
\r
            if (rIdx === 2) {\r
              evaluatePayline(chosenStops, wager);\r
            }\r
          }\r
        }\r
\r
        requestAnimationFrame(updateReelSpin);\r
      });\r
    }\r
\r
    function evaluatePayline(stops, wager) {\r
      const landedSyms = stops.map(idx => SYM_BY_ID[REEL_STRIP[idx]]);\r
      const [s0, s1, s2] = landedSyms;\r
\r
      let winMult = 0;\r
      let winningReels = [];\r
      let bannerMsg = '';\r
\r
      if (s0.id === s1.id && s1.id === s2.id) {\r
        winMult = s0.mult;\r
        winningReels = [0, 1, 2];\r
        bannerMsg = s0.id === 'SEVEN'\r
          ? \`\u{1F6A8} GRAND 777 VEGAS JACKPOT! \${winMult}\xD7 PAYOUT! \u{1F6A8}\`\r
          : \`\u2728 TRIPLE \${s0.name}! \${winMult}\xD7 PAYOUT! \u2728\`;\r
      } else if (landedSyms.filter(s => s.id === 'SEVEN').length === 2) {\r
        winMult = 5;\r
        winningReels = landedSyms.map((s, i) => (s.id === 'SEVEN' ? i : -1)).filter(i => i !== -1);\r
        bannerMsg = \`\u26A1 DOUBLE LUCKY 777s! 5\xD7 Payout!\`;\r
      } else {\r
        const cherryCount = landedSyms.filter(s => s.id === 'CHERRY').length;\r
        if (cherryCount === 2) {\r
          winMult = 2;\r
          winningReels = landedSyms.map((s, i) => (s.id === 'CHERRY' ? i : -1)).filter(i => i !== -1);\r
          bannerMsg = \`\u{1F352} Twin Cherries! 2\xD7 Payout!\`;\r
        } else if (cherryCount === 1) {\r
          winMult = 1;\r
          winningReels = landedSyms.map((s, i) => (s.id === 'CHERRY' ? i : -1)).filter(i => i !== -1);\r
          bannerMsg = \`\u{1F352} Single Cherry! 1\xD7 Bet Returned!\`;\r
        }\r
      }\r
\r
      if (winMult > 0) {\r
        const payout = wager * winMult;\r
        // The engine saved this payout before animation began.\r
        lastWinAmount = payout;\r
        setStatus(\`\${bannerMsg} (+\${payout.toLocaleString()} Credits!)\`);\r
\r
        // Turn Payline Laser Emerald Green\r
        paylineLaserMat.color.setHex(0x4ade80);\r
        paylineLaserMat.emissive.setHex(0x22c55e);\r
\r
        // Illuminate winning curved segments on the 3D drums\r
        winningReels.forEach(rIdx => {\r
          const stopIdx = stops[rIdx];\r
          reels[rIdx].segments[stopIdx].mat.emissiveIntensity = 1.05;\r
        });\r
\r
        const isJackpotOrBig = winMult >= 15 || payout >= 1000;\r
        playSynthChord(\r
          isJackpotOrBig\r
            ? [523.25, 659.25, 783.99, 1046.5, 1318.5, 1567.98]\r
            : [440, 554.37, 659.25, 880],\r
          'square',\r
          0.18,\r
          0.14\r
        );\r
        dispense3DCoins(isJackpotOrBig ? 75 : 28);\r
      } else {\r
        if (credits <= 0) {\r
          setStatus(\`No chips left. Open Players & Bank to transfer or borrow chips.\`);\r
        } else {\r
          setStatus(\`Result: \${s0.name} \xB7 \${s1.name} \xB7 \${s2.name} \u2014 Pull the 3D joystick again!\`);\r
        }\r
      }\r
\r
      credits = engine.active.balance;\r
      visualBalance = null;\r
      engine.lock = null;\r
      isSpinning = false;\r
      document.getElementById('lucky-accessible-result').textContent = landedSyms.map(s => s.name).join(', ') + '. Returned ' + spinResult.payout.toLocaleString() + ' chips.';\r
      spinResult = null;\r
      refreshAllUI();\r
      callbacks.changed();\r
    }\r
\r
    /* ============================================================================\r
       11. 3D GOLD COINS POURING INTO THE STAINLESS-STEEL COIN TRAY\r
       ============================================================================ */\r
    const coinGeo = new THREE.CylinderGeometry(0.13, 0.13, 0.032, 20);\r
    const activeCoins = [];\r
\r
    function dispense3DCoins(count) {\r
      if (reducedMotion) return;\r
      for (let i = 0; i < count; i++) {\r
        setTimeout(() => {\r
          if (!visible) return;\r
          const coinMesh = new THREE.Mesh(coinGeo, gold24kMat);\r
          // Spawn from the coin chute opening\r
          coinMesh.position.set(\r
            (Math.random() - 0.5) * 0.75,\r
            -1.82,\r
            1.38\r
          );\r
          coinMesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);\r
          coinMesh.castShadow = true;\r
          cabinetGroup.add(coinMesh);\r
\r
          if (i % 3 === 0) playSynthTone(1250 + Math.random() * 450, 'sine', 0.04, 0.05);\r
\r
          activeCoins.push({\r
            mesh: coinMesh,\r
            vx: (Math.random() - 0.5) * 0.06,\r
            vy: 0.04 + Math.random() * 0.08,\r
            vz: 0.04 + Math.random() * 0.07,\r
            rx: (Math.random() - 0.5) * 0.25,\r
            ry: (Math.random() - 0.5) * 0.25,\r
            bounces: 0,\r
            life: 0\r
          });\r
        }, i * 28);\r
      }\r
    }\r
\r
    /* ============================================================================\r
       12. CAMERA PRESETS & MAIN ANIMATION LOOP\r
       ============================================================================ */\r
    function setCameraView(view) {\r
      ['Play', 'Lever', 'Front'].forEach(v => {\r
        const btn = document.getElementById(\`cam\${v}\`);\r
        const active = v.toLowerCase() === view;\r
        btn.className = active\r
          ? 'px-3 py-1 rounded-full bg-amber-400 text-black font-bold transition'\r
          : 'px-3 py-1 rounded-full text-amber-200 hover:bg-white/10 transition';\r
      });\r
\r
      if (view === 'lever') {\r
        // Close-up angled focus on the 3D mechanical joystick & gearbox\r
        camTargetPos.set(2.35, 0.35, 5.15);\r
        camLookTarget.set(1.15, 0.15, 0.2);\r
      } else if (view === 'front') {\r
        // Dead-center straight-on casino view\r
        camTargetPos.set(0.3, 0.75, fitDistance());\r
        camLookTarget.set(0, 0.08, 0.15);\r
      } else {\r
        // Balanced Close-Up 3D Play view\r
        camTargetPos.set(0.68, 0.75, fitDistance());\r
        camLookTarget.set(0.24, 0.08, 0.15);\r
      }\r
    }\r
\r
    const clock = new THREE.Clock();\r
\r
    function animate() {\r
      if (!visible) { frame = null; return; }\r
      frame = requestAnimationFrame(animate);\r
      const elapsed = clock.getElapsedTime();\r
\r
      // Smooth camera interpolation\r
      camera.position.lerp(camTargetPos, 0.08);\r
      camera.lookAt(camLookTarget);\r
\r
      // Chasing Marquee Light Bulbs animation\r
      marqueeBulbs.forEach(b => {\r
        const wave = reducedMotion ? 0 : Math.sin(elapsed * 7 - b.idx * 0.65);\r
        b.mat.emissiveIntensity = isSpinning\r
          ? (wave > 0 ? 2.4 : 0.25)\r
          : 1.1 + 0.7 * wave;\r
      });\r
\r
      // Idle pulsing grab-halo around the 3D Joystick Ball\r
      if (!isDraggingArm && !isSpinning) {\r
        grabHaloRing.visible = true;\r
        const pulse = reducedMotion ? 1 : 1 + Math.sin(elapsed * 4) * 0.09;\r
        grabHaloRing.scale.set(pulse, pulse, 1);\r
        grabHaloMat.opacity = reducedMotion ? 0.35 : 0.35 + Math.sin(elapsed * 4) * 0.22;\r
        grabHaloRing.lookAt(camera.position);\r
      } else {\r
        grabHaloRing.visible = false;\r
      }\r
\r
      // Damped Harmonic Spring-Return Physics on the 3D Joystick Arm\r
      if (!isDraggingArm && armPullRatio > 0.0005) {\r
        const springAccel = -0.22 * armPullRatio;\r
        armSpringVelocity = (armSpringVelocity + springAccel) * 0.76;\r
        armPullRatio = Math.max(0, armPullRatio + armSpringVelocity);\r
        syncArmVisuals(armPullRatio);\r
      }\r
\r
      // Update 3D Gold Coins bouncing in the Coin Tray\r
      for (let i = activeCoins.length - 1; i >= 0; i--) {\r
        const c = activeCoins[i];\r
        c.life++;\r
        c.mesh.position.x += c.vx;\r
        c.mesh.position.y += c.vy;\r
        c.mesh.position.z += c.vz;\r
        c.vy -= 0.0065; // Gravity\r
        c.mesh.rotation.x += c.rx;\r
        c.mesh.rotation.y += c.ry;\r
\r
        // Bounce inside the stainless-steel coin tray floor\r
        if (c.mesh.position.y < -2.18) {\r
          c.mesh.position.y = -2.18;\r
          c.vy = -c.vy * 0.48;\r
          c.vx *= 0.78;\r
          c.vz *= 0.78;\r
          c.bounces++;\r
        }\r
\r
        if (c.life > 190) {\r
          cabinetGroup.remove(c.mesh);\r
          activeCoins.splice(i, 1);\r
        }\r
      }\r
\r
      renderer.render(scene, camera);\r
    }\r
\r
    window.addEventListener('resize', () => {\r
      if (!visible) return;\r
      camera.aspect = Math.max(1, host.clientWidth) / Math.max(1, host.clientHeight);\r
      camera.updateProjectionMatrix();\r
      setCameraView('play');\r
      renderer.setSize(Math.max(1, host.clientWidth), Math.max(1, host.clientHeight));\r
    });\r
\r
    refreshAllUI();\r
    const actions = {\r
      'rebuyCredits()': rebuyCredits, 'toggleMute()': toggleMute,\r
      'openBlackMarket()': openBlackMarket, 'QuickPullAndSpin()': () => QuickPullAndSpin(),\r
      "setCameraView('play')": () => setCameraView('play'),\r
      "setCameraView('lever')": () => setCameraView('lever'),\r
      "setCameraView('front')": () => setCameraView('front')\r
    };\r
    BET_TIERS.forEach(tier => { actions[typeof tier === 'number' ? \`setBetMode(\${tier})\` : "setBetMode('ALL_IN')"] = () => setBetMode(tier); });\r
    host.querySelectorAll('[data-machine-action]').forEach(button => {\r
      button.addEventListener('click', actions[button.dataset.machineAction]);\r
    });\r
    return {\r
      forceJackpot: () => QuickPullAndSpin(true),\r
      setCustomBet(value) {\r
        if (isSpinning || callbacks.locked()) return;\r
        if (engine.armedCard) { callbacks.notify('\u8BF7\u5148\u53D6\u6D88\u88C5\u5907\u5361\u7247\uFF0C\u518D\u66F4\u6539\u7ED1\u5B9A\u4E0B\u6CE8\u3002', true); return; }\r
        customBet = value; selectedBetMode = 'CUSTOM';\r
        setStatus('Custom bet: ' + value.toLocaleString() + ' chips. Pull the lever to spin.');\r
        refreshAllUI(); callbacks.changed();\r
      },\r
      spin: () => QuickPullAndSpin(),\r
      get dragging() { return isDraggingArm; },\r
      get displayBalance() { return visualBalance; },\r
      update() { credits = visualBalance ?? engine.active.balance; refreshAllUI(); },\r
      resetPlayer() { lastWinAmount = 0; selectedBetMode = 100; credits = engine.active.balance; refreshAllUI(); setStatus('Playing as ' + engine.active.name + '. Tap a bet button and pull the red lever.'); },\r
      setVisible(value) {\r
        visible = value;\r
        if (value) {\r
          camera.aspect = Math.max(1, host.clientWidth) / Math.max(1, host.clientHeight);\r
          camera.updateProjectionMatrix();\r
          renderer.setSize(Math.max(1, host.clientWidth), Math.max(1, host.clientHeight));\r
          setCameraView('play');\r
          if (frame === null) animate();\r
        } else {\r
          input.cancel();\r
          if (frame !== null) cancelAnimationFrame(frame);\r
          frame = null;\r
          activeCoins.forEach(c => cabinetGroup.remove(c.mesh));\r
          activeCoins.length = 0;\r
        }\r
      }\r
    };\r
\r
}\r

function createLucky777(engine, callbacks) {\r
    const host = document.getElementById('slots-view');\r
    const panels = document.getElementById('lucky-panels');\r
    const toggle = document.getElementById('lucky-panel-toggle');\r
    let machine = null, failed = false, visible = false;\r
    const customPanel = document.getElementById('lucky-custom-panel');\r
    const customToggle = document.getElementById('lucky-custom-toggle');\r
    const custom = bindCustomBet('lucky-custom', engine, {\r
        locked: () => !machine || callbacks.locked(), notify: callbacks.notify,\r
        apply(value) { machine.setCustomBet(value); customPanel.hidden = true; customToggle.setAttribute('aria-expanded', 'false'); }\r
    });\r
    customToggle.addEventListener('click', () => {\r
        customPanel.hidden = !customPanel.hidden;\r
        customToggle.setAttribute('aria-expanded', String(!customPanel.hidden));\r
        if (!customPanel.hidden) document.getElementById('lucky-custom-amount').focus();\r
    });\r
    window.addEventListener('keydown', event => {\r
        if (!visible || !machine || event.repeat || event.code !== 'Space' || event.ctrlKey || event.metaKey || event.altKey || event.target.closest('input, select, textarea, button, [contenteditable]')) return;\r
        event.preventDefault();\r
        event.stopImmediatePropagation();\r
        machine.spin();\r
    });\r
    toggle.addEventListener('click', () => {\r
        panels.hidden = !panels.hidden;\r
        toggle.textContent = panels.hidden ? 'Show controls' : 'Hide panels';\r
        toggle.setAttribute('aria-expanded', String(!panels.hidden));\r
    });\r
    return {\r
        forceJackpot() { if (visible && machine) return machine.forceJackpot(); },\r
        get dragging() { return machine?.dragging || false; },\r
        get displayBalance() { return machine?.displayBalance ?? null; },\r
        update(locked) { machine?.update(locked); custom.update(locked || !!engine.armedCard); customToggle.disabled = locked || !!engine.armedCard; },\r
        resetPlayer() { machine?.resetPlayer(); },\r
        setVisible(value) {\r
            visible = value;\r
            if (value && !machine && !failed) {\r
                try { machine = createLuckyMachine(engine, callbacks, host); }\r
                catch (error) {\r
                    failed = true;\r
                    document.getElementById('webgl-mount').replaceChildren();\r
                    const message = document.createElement('p');\r
                    message.className = 'machine-error';\r
                    message.textContent = 'The 3D machine could not load. Reload with an internet connection and WebGL enabled. Your chips are safe; Players & Bank is still available.';\r
                    host.appendChild(message);\r
                    toggle.hidden = true;\r
                    customToggle.hidden = true;\r
                    customPanel.hidden = true;\r
                    document.getElementById('lucky-touch-hint').hidden = true;\r
                }\r
            }\r
            machine?.setVisible(value);\r
        }\r
    };\r
}\r

(function (root) {
    'use strict';
    const cardValue = card => Math.min(card.rank, 10);
    const validCard = card => card && Number.isInteger(card.rank) && card.rank >= 1 && card.rank <= 13
        && Number.isInteger(card.suit) && card.suit >= 0 && card.suit <= 3;
    function score(cards) {
        let total = 0, aces = 0;
        for (const card of cards) { total += card.rank === 1 ? 11 : cardValue(card); if (card.rank === 1) aces++; }
        while (total > 21 && aces > 0) { total -= 10; aces--; }
        return { total, soft: aces > 0, blackjack: cards.length === 2 && total === 21, bust: total > 21 };
    }
    function makeShoe(random) {
        const cards = [];
        for (let deck = 0; deck < 6; deck++) for (let suit = 0; suit < 4; suit++) for (let rank = 1; rank <= 13; rank++) cards.push({ rank, suit });
        for (let i = cards.length - 1; i > 0; i--) {
            const roll = random();
            if (!(roll >= 0 && roll < 1)) throw new Error('The shoe could not be shuffled. Try again.');
            const j = Math.floor(roll * (i + 1)); [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        return cards;
    }
    function validRound(r, id) {
        if (!r || r.version !== 1 || r.ownerId !== id || !['player', 'dealer', 'settled'].includes(r.phase)
            || typeof r.id !== 'string' || !Array.isArray(r.shoe) || r.shoe.length > 312 || !r.shoe.every(validCard)
            || !Array.isArray(r.dealer) || r.dealer.length < 2 || r.dealer.length > 32 || !r.dealer.every(validCard)
            || !Array.isArray(r.hands) || r.hands.length < 1 || r.hands.length > 2
            || !Number.isInteger(r.activeHand) || r.activeHand < 0 || r.activeHand > r.hands.length) return false;
        if (!r.hands.every(h => Array.isArray(h.cards) && h.cards.length >= 2 && h.cards.length <= 32 && h.cards.every(validCard)
            && Number.isSafeInteger(h.bet) && h.bet >= 1 && h.bet <= 2000000
            && typeof h.split === 'boolean' && ['playing', 'stood', 'bust'].includes(h.status))) return false;
        if (r.phase === 'player' && r.hands[r.activeHand]?.status !== 'playing') return false;
        const counts = new Map();
        for (const c of [...r.shoe, ...r.dealer, ...r.hands.flatMap(h => h.cards)]) {
            const key = c.rank + ':' + c.suit; counts.set(key, (counts.get(key) || 0) + 1);
            if (counts.get(key) > 6) return false;
        }
        if (r.phase === 'settled' && (!r.result || !Number.isSafeInteger(r.result.payout) || r.result.payout < 0
            || !Number.isSafeInteger(r.result.wager) || !Array.isArray(r.result.hands)
            || r.result.hands.length !== r.hands.length
            || !r.result.hands.every(h => h && typeof h.label === 'string' && Number.isSafeInteger(h.payout) && h.payout >= 0)
            || !Number.isSafeInteger(r.result.net))) return false;
        return true;
    }
    class CasinoBlackjack {
        constructor(engine, options = {}) {
            this.engine = engine;
            this.shoeFactory = options.shoeFactory || (() => makeShoe(() => engine.random()));
            for (const user of engine.data.users) {
                if (user.blackjack && !validRound(user.blackjack, user.id)) {
                    user.blackjack = null;
                    engine.storageWarning = 'An unreadable saved blackjack hand was cleared. Your wallet and bank records were kept.';
                }
            }
            const pending = engine.data.users.find(u => u.blackjack && u.blackjack.phase !== 'settled');
            if (pending) { engine.data.activeId = pending.id; engine.lock = 'blackjack'; }
        }
        get round() { return this.engine.active.blackjack || null; }
        get pending() { return Boolean(this.round && this.round.phase !== 'settled'); }
        available() {
            const r = this.round, hand = r?.hands[r.activeHand];
            const play = Boolean(r && r.phase === 'player' && hand?.status === 'playing' && this.engine.lock === 'blackjack');
            return { hit: play, stand: play,
                double: play && hand.cards.length === 2 && this.engine.active.balance >= hand.bet,
                split: play && r.hands.length === 1 && hand.cards.length === 2
                    && cardValue(hand.cards[0]) === cardValue(hand.cards[1]) && this.engine.active.balance >= hand.bet };
        }
        _playing(action) {
            if (!this.available()[action]) throw new Error(action === 'double' || action === 'split'
                ? 'That move needs an eligible two-card hand and enough chips.' : 'Wait until it is your turn.');
            return this.round;
        }
        _draw(r) {
            if (!r.shoe.length) throw new Error('The shoe is empty.');
            return r.shoe.pop();
        }
        _save() { this.engine.save(); }
        start(value, { jackpot = false } = {}) {
            this.engine.ensureIdle();
            const bet = this.engine.amount(value), user = this.engine.active;
            if (bet > user.balance) throw new Error('Not enough chips. Lower your bet or visit the bank.');
            if (user.balance + bet * 4 > 1000000000) throw new Error('Your wallet is too close to its chip limit.');
            const previous = this.round;
            const shoe = jackpot ? makeShoe(() => .5) : previous && previous.shoe.length >= 52 ? [...previous.shoe] : this.shoeFactory();
            if (!Array.isArray(shoe) || shoe.length < 4 || !shoe.every(validCard)) throw new Error('The shoe could not be prepared.');
            if (jackpot) {
                const ordered = [1, 10, 13, 9].map(rank => shoe.splice(shoe.findIndex(card => card.rank === rank), 1)[0]);
                shoe.push(...ordered.reverse());
            }
            const r = { version: 1, id: root.crypto.randomUUID(), ownerId: user.id, phase: 'player', shoe,
                dealer: [], hands: [{ cards: [], bet, split: false, status: 'playing' }], activeHand: 0, result: null };
            r.hands[0].cards.push(this._draw(r)); r.dealer.push(this._draw(r));
            r.hands[0].cards.push(this._draw(r)); r.dealer.push(this._draw(r));
            user.balance -= bet;
            user.blackjack = r;
            this.engine.lock = 'blackjack';
            if (score(r.hands[0].cards).blackjack || score(r.dealer).blackjack) this._settle();
            else this._save();
            return r;
        }
        _advance() {
            const r = this.round;
            const next = r.hands.findIndex((h, i) => i >= r.activeHand && h.status === 'playing');
            if (next === -1) { r.activeHand = r.hands.length; r.phase = 'dealer'; }
            else r.activeHand = next;
        }
        hit() {
            const r = this._playing('hit'), hand = r.hands[r.activeHand];
            hand.cards.push(this._draw(r)); const value = score(hand.cards);
            if (value.total >= 21) { hand.status = value.bust ? 'bust' : 'stood'; this._advance(); }
            this._save(); return r;
        }
        stand() {
            const r = this._playing('stand'); r.hands[r.activeHand].status = 'stood'; this._advance();
            this._save(); return r;
        }
        double() {
            const r = this._playing('double'), hand = r.hands[r.activeHand];
            const card = this._draw(r);
            this.engine.active.balance -= hand.bet; hand.bet *= 2; hand.cards.push(card);
            hand.status = score(hand.cards).bust ? 'bust' : 'stood'; this._advance();
            this._save(); return r;
        }
        split() {
            const r = this._playing('split'), first = r.hands[0];
            if (r.shoe.length < 2) throw new Error('The shoe does not have enough cards to split.');
            const second = { cards: [first.cards.pop()], bet: first.bet, split: true, status: 'playing' };
            first.split = true;
            this.engine.active.balance -= first.bet;
            first.cards.push(this._draw(r)); second.cards.push(this._draw(r)); r.hands.push(second);
            const aces = first.cards[0].rank === 1;
            for (const hand of r.hands) if (aces || score(hand.cards).total === 21) hand.status = 'stood';
            this._advance(); this._save(); return r;
        }
        dealerStep() {
            const r = this.round;
            if (!r || r.phase !== 'dealer' || this.engine.lock !== 'blackjack') throw new Error('The dealer is not playing.');
            if (r.hands.every(h => score(h.cards).bust) || score(r.dealer).total >= 17) return this._settle();
            r.dealer.push(this._draw(r));
            if (score(r.dealer).total >= 17) return this._settle();
            this._save(); return r;
        }
        forceJackpot(value) {
            if (!this.pending) return this.start(value, { jackpot: true });
            const r = this.round;
            if (this.engine.lock !== 'blackjack') throw new Error('Wait for the current game to finish.');
            const maximum = r.hands.reduce((sum, hand) => sum + Math.floor(hand.bet * (!hand.split && hand.cards.length === 2 ? 2.5 : 2)), 0);
            if (this.engine.active.balance + maximum > 1000000000) throw new Error('Your wallet is too close to its chip limit.');
            r.shoe = makeShoe(() => .5);
            const take = rank => r.shoe.splice(r.shoe.findIndex(card => card.rank === rank), 1)[0];
            r.dealer = [take(10), take(9)];
            for (const hand of r.hands) {
                hand.cards = hand.cards.length === 2 ? [take(1), take(13)] : [take(1), take(5), take(5)];
                hand.status = 'stood';
            }
            r.activeHand = r.hands.length;
            return this._settle();
        }
        _settle() {
            const r = this.round;
            if (r.phase === 'settled') return r;
            const dealer = score(r.dealer);
            const hands = r.hands.map(hand => {
                const value = score(hand.cards), natural = !hand.split && value.blackjack;
                let multiplier = 0, label = 'Dealer wins';
                if (value.bust) label = 'Bust';
                else if (dealer.blackjack) { if (natural) { multiplier = 1; label = 'Push'; } }
                else if (natural) { multiplier = 2.5; label = 'Blackjack \xB7 3:2'; }
                else if (dealer.bust || value.total > dealer.total) { multiplier = 2; label = dealer.bust ? 'Dealer busts \xB7 You win' : 'You win'; }
                else if (value.total === dealer.total) { multiplier = 1; label = 'Push'; }
                // Wallets store whole chips; odd natural wagers round the half chip down.
                return { label, total: value.total, bet: hand.bet, payout: Math.floor(hand.bet * multiplier) };
            });
            const wager = r.hands.reduce((sum, h) => sum + h.bet, 0), payout = hands.reduce((sum, h) => sum + h.payout, 0);
            r.result = { hands, wager, payout, net: payout - wager, dealer: dealer.total };
            r.phase = 'settled';
            this.engine.active.balance += payout;
            this.engine.lock = null;
            this.engine.record(\`\${this.engine.active.name} \xB7 Blackjack: wager \${wager.toLocaleString()}, payout \${payout.toLocaleString()} (\${hands.map(h => h.label).join(' / ')}).\`);
            this.engine.completeRound();
            this._save(); return r;
        }
    }
    CasinoBlackjack.score = score;
    CasinoBlackjack.makeShoe = makeShoe;
    root.CasinoBlackjack = CasinoBlackjack;
})(globalThis);

// Hosted pages use server commands; the pure engines remain available for rules tests.
if (window.__CASINO_BOOTSTRAP__) {
    const LocalEngine = CasinoEngine, LocalBlackjack = CasinoBlackjack;
    class RemoteCasinoEngine extends LocalEngine {
        constructor() {
            super(null);
            this.remote = true; this.requestBusy = false; this.onChange = null;
            this.applySnapshot(window.__CASINO_BOOTSTRAP__);
            try { this.legacyPending = this.revision === 0 && Boolean(JSON.parse(localStorage.getItem('roulette-club-v1') || 'null')?.users?.length); } catch { this.legacyPending = false; }
            try { const selected = sessionStorage.getItem('club-selected-player'); if (this.data.users.some(user => user.id === selected)) this.data.activeId = selected; } catch {}
        }
        get lock() { return this.requestBusy ? 'network' : this.animationLock || (this.active?.blackjack && this.active.blackjack.phase !== 'settled' ? 'blackjack' : null); }
        set lock(value) { this.animationLock = value === 'blackjack' ? null : value; }
        save() {}
        accrueInterest() { return false; }
        applySnapshot(snapshot) {
            if (this.revision !== undefined && snapshot.revision < this.revision) return;
            const selected = this.revision !== undefined ? this.data?.activeId : null;
            if (selected && snapshot.data.users.some(user => user.id === selected)) snapshot.data.activeId = selected;
            const pending = snapshot.data.users.find(user => user.blackjack && user.blackjack.phase !== 'settled');
            if (pending) snapshot.data.activeId = pending.id;
            this.data = snapshot.data; this.revision = snapshot.revision; this.offset = snapshot.now - Date.now();
            if (this.revision > 0) this.legacyPending = false;
            this.now = () => Date.now() + this.offset;
            if (snapshot.auth) this.auth = snapshot.auth;
        }
        async send(command, args = [], {admin = false} = {}) {
            if (this.legacyPending && command !== 'import') throw new Error('\u68C0\u6D4B\u5230\u65E7\u5B58\u6863\uFF0C\u8BF7\u5148\u8FDB\u5165 ADMIN\uFF0C\u901A\u8FC7 Windows Hello \u9A8C\u8BC1\u5E76\u5BFC\u5165\u540E\u7EE7\u7EED\u3002');
            if (this.requestBusy) throw new Error('\u4E0A\u4E00\u9879\u64CD\u4F5C\u4ECD\u5728\u5904\u7406\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5\u3002');
            const id = crypto.randomUUID(), body = JSON.stringify({id,command,args,playerId:this.data.activeId});
            this.requestBusy = true; this.onChange?.();
            try {
                let response;
                for(let attempt=0;attempt<2;attempt++) {
                    try { response = await fetch('/api/command',{method:'POST',headers:{'Content-Type':'application/json'},body,credentials:'same-origin',signal:AbortSignal.timeout(15000)}); break; }
                    catch(error) { if(attempt===1) throw new Error('\u65E0\u6CD5\u8FDE\u63A5\u670D\u52A1\u5668\u3002\u8BF7\u5237\u65B0\u4EE5\u786E\u8BA4\u4F59\u989D\uFF0C\u64CD\u4F5C\u4E0D\u4F1A\u91CD\u590D\u5165\u8D26\u3002'); }
                }
                const data = await response.json();
                if(!response.ok) { if(response.status===403&&admin)this.auth={...(this.auth||{}),admin:false}; throw new Error(data.error || '\u64CD\u4F5C\u5931\u8D25\u3002'); }
                this.applySnapshot(data);
                return data.result;
            } finally { this.requestBusy = false; this.onChange?.(); }
        }
        async sync() {
            if(this.requestBusy||this.animationLock)return;
            const response=await fetch('/api/state?playerId='+encodeURIComponent(this.data.activeId),{credentials:'same-origin',cache:'no-store'});
            const value=await response.json();if(!response.ok)throw new Error(value.error||'\u8D26\u6237\u540C\u6B65\u5931\u8D25\u3002');
            this.applySnapshot(value);this.onChange?.();
        }
        switchUser(id) {
            this.ensureIdle(); if(!this.data.users.some(user=>user.id===id))throw new Error('\u8BF7\u9009\u62E9\u6709\u6548\u73A9\u5BB6\u3002');this.data.activeId=id;
            try {sessionStorage.setItem('club-selected-player',id);} catch {}
        }
        transfer(...args){return this.send('gift',args);}
        offerLoan(...args){return this.send('offerLoan',args);}
        respondLoan(...args){return this.send('respondLoan',args);}
        cancelLoan(...args){return this.send('cancelLoan',args);}
        repayLoan(...args){return this.send('repayLoan',args);}
        borrow(...args){return this.send('borrow',args);}
        repay(...args){return this.send('repay',args);}
        borrowShark(...args){return this.send('borrowShark',args);}
        repayShark(...args){return this.send('repayShark',args);}
        buyCard(...args){return this.send('buyCard',args);}
        armCard(...args){return this.send('armCard',args);}
        spinSlots(value, _forced, options={}){return this.send('slots',[value,options]);}
        addUser(...args){return this.send('addUser',args,{admin:true});}
        deletePlayer(...args){return this.send('deletePlayer',args,{admin:true});}
        adminAdjust(...args){return this.send('adminAdjust',args,{admin:true});}
        importLegacy(snapshot){return this.send('import',[snapshot],{admin:true});}
        rouletteBet(...args){return this.send('roulette.bet',args);}
        rouletteClear(){return this.send('roulette.clear');}
        rouletteRebet(){return this.send('roulette.rebet');}
        rouletteSpin(jackpot=false){return this.send('roulette.spin',[jackpot]);}
        rouletteRig(id){return this.send('roulette.rig',[id]);}
    }
    class RemoteCasinoBlackjack extends LocalBlackjack {
        start(value){return this.engine.send('blackjack',['start',value]);}
        hit(){return this.engine.send('blackjack',['hit']);}
        stand(){return this.engine.send('blackjack',['stand']);}
        double(){return this.engine.send('blackjack',['double']);}
        split(){return this.engine.send('blackjack',['split']);}
        dealerStep(){return this.engine.send('blackjack',['dealerStep']);}
        forceJackpot(value){return this.engine.send('blackjack',['forceJackpot',value]);}
    }
    window.CasinoEngine = RemoteCasinoEngine;
    window.CasinoBlackjack = RemoteCasinoBlackjack;
}

function createBlackjackScene(container) {
    'use strict';
    const T = window.THREE;
    if (!T) return null;
    const renderer = new T.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.outputEncoding = T.sRGBEncoding;
    renderer.toneMapping = T.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = T.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    const scene = new T.Scene(); scene.background = new T.Color(0x101318); scene.fog = new T.Fog(0x101318, 16, 32);
    const camera = new T.PerspectiveCamera(37, 1, 0.1, 60);
    let active = false, frame = null, overhead = false, currentRound = null;
    const materials = new Map(), cards = new Map(), chips = new T.Group(); scene.add(chips);
    const warm = new T.SpotLight(0xffe7ba, 1.65, 35, Math.PI / 4, 0.65, 1.2);
    warm.position.set(-3.5, 10, 4); warm.castShadow = true; warm.shadow.mapSize.set(2048, 2048);
    warm.shadow.bias = -0.0003; warm.shadow.normalBias = 0.025; scene.add(warm);
    scene.add(new T.HemisphereLight(0xc9d9e8, 0x25211a, 0.72));
    const fill = new T.DirectionalLight(0xe4eaff, 0.4); fill.position.set(5, 6, -5); scene.add(fill);
    const rim = new T.PointLight(0xffc577, 0.6, 15); rim.position.set(0, 3, -5); scene.add(rim);
    function texture(canvas) {
        const map = new T.CanvasTexture(canvas); map.encoding = T.sRGBEncoding;
        map.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy()); return map;
    }
    function canvas(width, height) { const c = document.createElement('canvas'); c.width = width; c.height = height; return c; }
    function grain(kind) {
        const c = canvas(512, 512), ctx = c.getContext('2d');
        ctx.fillStyle = kind === 'felt' ? '#145540' : '#42251c'; ctx.fillRect(0, 0, 512, 512);
        if (kind === 'felt') {
            for (let i = 0; i < 26000; i++) {
                ctx.fillStyle = Math.random() > .5 ? 'rgba(255,255,210,.04)' : 'rgba(0,12,8,.11)';
                ctx.fillRect(Math.random() * 512, Math.random() * 512, 1, 1 + Math.random() * 2);
            }
        } else {
            for (let i = 0; i < 500; i++) {
                const x = Math.random() * 512; ctx.beginPath(); ctx.moveTo(x, 0);
                ctx.bezierCurveTo(x + 35, 170, x - 35, 340, x + 5, 512);
                ctx.strokeStyle = i % 2 ? '#9c6a3b16' : '#160c0d55'; ctx.lineWidth = Math.random() * 3; ctx.stroke();
            }
        }
        const map = texture(c); map.wrapS = map.wrapT = T.RepeatWrapping;
        if (kind === 'felt') map.repeat.set(5, 5); return map;
    }
    const felt = grain('felt'), walnut = grain('wood');
    function mesh(geometry, material, x, y, z) {
        const object = new T.Mesh(geometry, material); object.position.set(x, y, z);
        object.castShadow = true; object.receiveShadow = true; scene.add(object); return object;
    }
    const wood = mesh(new T.CylinderGeometry(5.8, 5.65, .45, 128), new T.MeshStandardMaterial({ map: walnut, roughness: .32, metalness: .05 }), 0, -.24, 0); wood.scale.z = .62;
    const cloth = mesh(new T.CylinderGeometry(5.33, 5.33, .08, 128), new T.MeshStandardMaterial({ map: felt, bumpMap: felt, bumpScale: .025, roughness: 1 }), 0, .015, 0); cloth.scale.z = .6;
    const leather = mesh(new T.TorusGeometry(5.52, .255, 20, 128), new T.MeshStandardMaterial({ color: 0x251f20, roughness: .7, bumpMap: walnut, bumpScale: .035 }), 0, .045, 0);
    leather.rotation.x = -Math.PI / 2; leather.scale.y = .62;
    const brassMaterial = new T.MeshStandardMaterial({ color: 0xb99959, metalness: .85, roughness: .27 });
    for (const radius of [5.22, 5.79]) {
        const ring = mesh(new T.TorusGeometry(radius, .018, 8, 128), brassMaterial, 0, radius === 5.22 ? .07 : -.12, 0);
        ring.rotation.x = -Math.PI / 2; ring.scale.y = .62;
    }
    mesh(new T.CylinderGeometry(1.15, 1.65, 1, 48), new T.MeshStandardMaterial({ color: 0x272326, roughness: .4, metalness: .45 }), 0, -.95, 0);
    const floor = mesh(new T.PlaneGeometry(70, 70), new T.MeshStandardMaterial({ color: 0x13171b, roughness: .85 }), 0, -1.47, 0); floor.rotation.x = -Math.PI / 2;
    const print = canvas(1200, 340), ink = print.getContext('2d');
    ink.textAlign = 'center'; ink.fillStyle = '#d2ba7b'; ink.font = '26px Georgia'; ink.fillText('T H E   R E S E R V E', 600, 65);
    ink.font = 'bold 48px Georgia'; ink.fillText('BLACKJACK PAYS 3 TO 2', 600, 150);
    ink.fillStyle = '#c5c7a2'; ink.font = '24px Georgia'; ink.fillText('DEALER STANDS ON ALL 17s', 600, 220);
    ink.strokeStyle = '#d2ba7b66'; ink.lineWidth = 2; ink.beginPath(); ink.ellipse(600, 50, 560, 250, 0, .17, Math.PI - .17); ink.stroke();
    const printing = mesh(new T.PlaneGeometry(5.2, 1.48), new T.MeshBasicMaterial({ map: texture(print), transparent: true, depthWrite: false }), 0, .066, -.15); printing.rotation.x = -Math.PI / 2;
    const shoe = mesh(new T.BoxGeometry(1.13, .38, 1.7), new T.MeshStandardMaterial({ color: 0x262d31, metalness: .3, roughness: .24 }), 4.1, .26, -1.15); shoe.rotation.y = -.15;
    mesh(new T.BoxGeometry(1, .13, 1.38), new T.MeshStandardMaterial({ color: 0xeee6d7, roughness: .7 }), 4.1, .52, -1.15);
    const tray = mesh(new T.BoxGeometry(1.1, .12, 1.6), new T.MeshStandardMaterial({ color: 0x171d1d, metalness: .2, roughness: .35 }), -4.12, .12, -1.15); tray.rotation.y = .12;
    for (let i = 0; i < 5; i++) mesh(new T.BoxGeometry(.78, .015, 1.1), new T.MeshStandardMaterial({ color: 0x79303e, roughness: .7 }), -4.12 + i * .018, .2 + i * .018, -1.15);
    const suits = ['\u2660', '\u2665', '\u2666', '\u2663'];
    const ranks = ['', 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    function cardMap(card) {
        const key = card ? card.rank + ':' + card.suit : 'back';
        if (materials.has(key)) return materials.get(key);
        const c = canvas(384, 576), ctx = c.getContext('2d');
        ctx.fillStyle = '#f6f2e9'; ctx.fillRect(0, 0, 384, 576);
        ctx.strokeStyle = '#cec9bd'; ctx.lineWidth = 3; ctx.strokeRect(5, 5, 374, 566);
        if (!card) {
            ctx.fillStyle = '#662c39'; ctx.fillRect(18, 18, 348, 540); ctx.strokeStyle = '#dbc99b60'; ctx.lineWidth = 1;
            for (let i = -576; i < 960; i += 15) { ctx.beginPath(); ctx.moveTo(i, 18); ctx.lineTo(i + 540, 558); ctx.stroke(); ctx.beginPath(); ctx.moveTo(i, 18); ctx.lineTo(i - 540, 558); ctx.stroke(); }
            ctx.fillStyle = '#6f2f3d'; ctx.beginPath(); ctx.ellipse(192, 288, 100, 138, 0, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = '#d8c498'; ctx.lineWidth = 3; ctx.stroke();
            ctx.textAlign = 'center'; ctx.fillStyle = '#e9d9b0'; ctx.font = 'bold 68px Georgia'; ctx.fillText('R', 192, 306); ctx.font = '13px Georgia'; ctx.fillText('THE RESERVE', 192, 344);
        } else {
            const red = card.suit === 1 || card.suit === 2; ctx.fillStyle = red ? '#ae2733' : '#18222b';
            const corner = () => { ctx.textAlign = 'center'; ctx.font = 'bold 48px Georgia'; ctx.fillText(ranks[card.rank], 43, 65); ctx.font = '44px Georgia'; ctx.fillText(suits[card.suit], 43, 111); };
            corner(); ctx.save(); ctx.translate(384, 576); ctx.rotate(Math.PI); corner(); ctx.restore();
            if (card.rank === 1) { ctx.font = '160px Georgia'; ctx.textAlign = 'center'; ctx.fillText(suits[card.suit], 192, 340); }
            else if (card.rank > 10) {
                ctx.strokeStyle = red ? '#a92c3b' : '#2b3c58'; ctx.lineWidth = 8; ctx.strokeRect(94, 112, 196, 352);
                ctx.strokeStyle = '#c3a462'; ctx.lineWidth = 3; ctx.strokeRect(103, 121, 178, 334);
                ctx.font = 'bold 120px Georgia'; ctx.textAlign = 'center'; ctx.fillText(ranks[card.rank], 192, 294);
                ctx.font = '88px Georgia'; ctx.fillText(suits[card.suit], 192, 397);
            } else {
                const patterns = {
                    2:[[0,-1],[0,1]],3:[[0,-1],[0,0],[0,1]],4:[[-1,-1],[1,-1],[-1,1],[1,1]],
                    5:[[-1,-1],[1,-1],[0,0],[-1,1],[1,1]],6:[[-1,-1],[1,-1],[-1,0],[1,0],[-1,1],[1,1]],
                    7:[[-1,-1],[1,-1],[0,-.5],[-1,0],[1,0],[-1,1],[1,1]],
                    8:[[-1,-1],[1,-1],[0,-.5],[-1,0],[1,0],[0,.5],[-1,1],[1,1]],
                    9:[[-1,-1],[1,-1],[-1,-.33],[1,-.33],[0,0],[-1,.33],[1,.33],[-1,1],[1,1]],
                    10:[[-1,-1],[1,-1],[0,-.65],[-1,-.33],[1,-.33],[-1,.33],[1,.33],[0,.65],[-1,1],[1,1]]
                };
                ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.font = '60px Georgia';
                for (const [x,y] of patterns[card.rank]) { ctx.save(); ctx.translate(192 + x * 68, 288 + y * 150); if (y > 0) ctx.rotate(Math.PI); ctx.fillText(suits[card.suit], 0, 0); ctx.restore(); }
            }
        }
        const material = new T.MeshStandardMaterial({ map: texture(c), roughness: .64, metalness: 0 }); materials.set(key, material); return material;
    }
    const bodyGeometry = new T.BoxGeometry(.88, .018, 1.27), faceGeometry = new T.PlaneGeometry(.9, 1.29);
    const paper = new T.MeshStandardMaterial({ color: 0xe7e1d4, roughness: .8 });
    function createCard(card, hidden, delay) {
        const group = new T.Group();
        const body = new T.Mesh(bodyGeometry, paper); body.castShadow = true; group.add(body);
        const face = new T.Mesh(faceGeometry, cardMap(card)); face.rotation.x = -Math.PI / 2; face.position.y = .011; face.receiveShadow = true; group.add(face);
        const back = new T.Mesh(faceGeometry, cardMap(null)); back.rotation.x = Math.PI / 2; back.position.y = -.011; group.add(back);
        group.position.set(4.1, .65, -1.15); group.rotation.z = hidden ? Math.PI : 0;
        group.userData = { started: performance.now() + delay, from: group.position.clone(), target: new T.Vector3(), hidden, targetFlip: hidden ? Math.PI : 0, yaw: 0, face, faceKey: card.rank + ':' + card.suit };
        scene.add(group); return group;
    }
    const chipGeometry = new T.CylinderGeometry(.225, .225, .055, 40), chipMaps = new Map();
    function chipStack(value, x, z) {
        const denominations = [500,100,50,10], colors = ['#76518e','#292c31','#a33941','#276599'];
        let height = 0, remaining = value;
        denominations.forEach((denom, index) => {
            const count = Math.floor(remaining / denom); remaining %= denom;
            if (!chipMaps.has(denom)) {
                const c = canvas(128,128), ctx = c.getContext('2d'); ctx.fillStyle = colors[index]; ctx.fillRect(0,0,128,128);
                ctx.strokeStyle = '#f4eadd'; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(64,64,45,0,Math.PI*2); ctx.stroke();
                ctx.fillStyle = '#f4eadd'; ctx.textAlign = 'center'; ctx.font = 'bold 34px Georgia'; ctx.fillText(String(denom),64,76); chipMaps.set(denom,texture(c));
            }
            for (let i = 0; i < Math.min(count,10); i++) {
                const group = new T.Group(); group.position.set(x, .095 + height * .058, z);
                const edge = new T.Mesh(chipGeometry, new T.MeshStandardMaterial({ color: colors[index], roughness:.65 })); edge.castShadow = true; group.add(edge);
                const top = new T.Mesh(new T.CircleGeometry(.224,40),new T.MeshStandardMaterial({map:chipMaps.get(denom),roughness:.6})); top.rotation.x=-Math.PI/2; top.position.y=.029; group.add(top);
                for(let j=0;j<8;j++) { const notch=new T.Mesh(new T.BoxGeometry(.055,.057,.05),paper); const a=j*Math.PI/4; notch.position.set(Math.cos(a)*.21,0,Math.sin(a)*.21); notch.rotation.y=-a; group.add(notch); }
                chips.add(group); height++;
            }
        });
    }
    function clearChips() {
        while (chips.children.length) { const group=chips.children[0]; group.traverse(obj=>{ if(obj.isMesh) { if(obj.geometry!==chipGeometry) obj.geometry.dispose(); if(obj.material!==paper) obj.material.dispose(); } }); chips.remove(group); }
    }
    function sync(round, wager) {
        const changed = currentRound !== round?.id; currentRound = round?.id;
        if (changed) { for (const group of cards.values()) scene.remove(group); cards.clear(); }
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        function place(key, card, hidden, x, z, yaw, delay, stackIndex) {
            let group = cards.get(key);
            if (!group) { group=createCard(card,hidden,reduced?0:delay); if(reduced) group.userData.started-=1000; cards.set(key,group); }
            const faceKey=card.rank+':'+card.suit;
            if(group.userData.faceKey!==faceKey) {group.userData.face.material=cardMap(card);group.userData.faceKey=faceKey;}
            group.userData.target.set(x,.092+stackIndex*.014,z); group.userData.yaw=yaw; group.userData.targetFlip=hidden?Math.PI:0;
        }
        if (round) {
            round.dealer.forEach((card,index)=>place('d'+index,card,index===1&&round.phase==='player', (index-(round.dealer.length-1)/2)*.43,-1.35,(index-(round.dealer.length-1)/2)*-.035,changed?index*220+100:0,index));
            round.hands.forEach((hand,h)=> {
                const center=round.hands.length===1?0:(h===0?-1.75:1.75);
                const spacing=Math.min(.43,2.45/Math.max(1,hand.cards.length-1));
                hand.cards.forEach((card,index)=>place('p'+h+'-'+index,card,false,center+(index-(hand.cards.length-1)/2)*spacing,1.3+(h===0?0:.05),(index-(hand.cards.length-1)/2)*.035,changed?index*220:0,index));
            });
        }
        clearChips();
        if(round) round.hands.forEach((hand,h)=>chipStack(hand.bet,round.hands.length===1?0:(h===0?-1.75:1.75),2.3));
        else chipStack(wager,0,2.3);
    }
    function resize() {
        const width=container.clientWidth||900,height=container.clientHeight||450;
        renderer.setSize(width,height,false); camera.aspect=width/height;
        if(overhead) camera.position.set(0, camera.aspect<1.3?16:12.5,.01);
        else camera.position.set(0,camera.aspect<1.3?11.7:8.4,camera.aspect<1.3?12.7:9.3);
        camera.lookAt(0,0,0); camera.updateProjectionMatrix();
    }
    function animate(now) {
        frame=null; if(!active) return;
        for(const group of cards.values()) {
            const d=group.userData,t=Math.max(0,Math.min(1,(now-d.started)/520)),ease=1-Math.pow(1-t,3);
            group.position.lerpVectors(d.from,d.target,ease); group.position.y+=Math.sin(t*Math.PI)*.4;
            group.rotation.y+=(d.yaw-group.rotation.y)*.18; group.rotation.z+=(d.targetFlip-group.rotation.z)*.16;
        }
        renderer.render(scene,camera); frame=requestAnimationFrame(animate);
    }
    const observer=typeof ResizeObserver!=='undefined'?new ResizeObserver(resize):null; observer?.observe(container);
    window.addEventListener('resize',resize);
    resize();
    return { sync, resize,
        setVisible(value) { active=value; if(value) { resize(); if(frame===null) frame=requestAnimationFrame(animate); } else if(frame!==null) {cancelAnimationFrame(frame);frame=null;} },
        setOverhead(value) {overhead=value;resize();}
    };
}

function createBlackjackTable(engine, callbacks) {
    'use strict';
    const game = new CasinoBlackjack(engine), $ = id => document.getElementById(id);
    const host = $('blackjack-view'), reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const suits = ['\u2660','\u2665','\u2666','\u2663'], names = ['spades','hearts','diamonds','clubs'];
    const ranks = ['', 'A','2','3','4','5','6','7','8','9','10','J','Q','K'];
    let visible = false, animating = false, timer = null, scene = null, muted = false, audio = null, overhead = false;
    function tone(frequency, duration = .06, volume = .05) {
        if (muted || !visible) return;
        try {
            const Audio = window.AudioContext || window.webkitAudioContext;
            if (!Audio) return;
            audio ||= new Audio();
            if (audio.state === 'suspended') audio.resume();
            const oscillator = audio.createOscillator(), gain = audio.createGain();
            oscillator.type = 'triangle'; oscillator.frequency.setValueAtTime(frequency, audio.currentTime);
            gain.gain.setValueAtTime(volume, audio.currentTime); gain.gain.exponentialRampToValueAtTime(.001, audio.currentTime + duration);
            oscillator.connect(gain); gain.connect(audio.destination); oscillator.start(); oscillator.stop(audio.currentTime + duration);
        } catch { /* Audio availability does not affect a hand. */ }
    }
    function miniCard(card, hidden = false) {
        const el = document.createElement('span'); el.className = 'bj-mini-card' + (hidden ? ' back' : card.suit === 1 || card.suit === 2 ? ' red' : '');
        el.textContent = hidden ? 'R' : ranks[card.rank] + suits[card.suit];
        el.setAttribute('aria-label', hidden ? 'Face-down card' : ranks[card.rank] + ' of ' + names[card.suit]); return el;
    }
    function wager() { return Number($('bj-wager').value); }
    function update() {
        const r = game.round, ownTurn = r?.phase === 'player';
        const playing = r && r.phase !== 'settled', locked = Boolean(engine.lock) || animating;
        $('bj-seat-name').textContent = engine.active.name.toUpperCase() + ' \xB7 YOUR SEAT';
        $('bj-stake').textContent = (r ? r.hands.reduce((sum,h)=>sum+h.bet,0) : 0).toLocaleString() + ' \u20B5';
        const validBet = Number.isSafeInteger(wager()) && wager() >= 1 && wager() <= 1000000;
        $('bj-deal').disabled = locked || !validBet || wager() > engine.active.balance;
        $('bj-wager').setAttribute('aria-invalid', String(!validBet));
        $('bj-deal').firstChild.textContent = r?.phase === 'settled' ? 'DEAL AGAIN ' : 'DEAL CARDS ';
        $('bj-wager').disabled = locked;
        host.querySelectorAll('[data-bj-chip], .bj-step').forEach(button => {button.disabled=locked;});
        const moves=game.available();
        for(const action of ['hit','stand','double','split']) $('bj-'+action).disabled=animating||!moves[action];
        if (!r) {
            $('bj-turn').textContent='PLACE YOUR BET';
            $('bj-status').textContent=engine.active.balance<wager()?'Lower your bet or visit the bank to get more chips.':'Choose your chips, then deal yourself in.';
            $('bj-dealer-total').textContent='Waiting for the deal';
            $('bj-hands').replaceChildren(); $('bj-dealer-access').replaceChildren();
        } else {
            const dealerScore=CasinoBlackjack.score(ownTurn?[r.dealer[0]]:r.dealer);
            $('bj-dealer-total').textContent=ownTurn?dealerScore.total+' showing \xB7 hole card hidden':dealerScore.bust?'BUST \xB7 '+dealerScore.total:String(dealerScore.total);
            const label=document.createElement('span');label.textContent='Dealer';
            $('bj-dealer-access').replaceChildren(label,...r.dealer.map((card,i)=>miniCard(card,ownTurn&&i===1)));
            $('bj-hands').replaceChildren(...r.hands.map((hand,i)=>{
                const box=document.createElement('div');box.className='bj-hand-summary'+(ownTurn&&r.activeHand===i?' active':'');
                const header=document.createElement('header'),name=document.createElement('span'),value=document.createElement('strong');
                const total=CasinoBlackjack.score(hand.cards);
                name.textContent=(r.hands.length>1?'HAND '+(i+1):'YOUR HAND')+' \xB7 '+hand.bet.toLocaleString()+' \u20B5';
                value.textContent=(total.bust?'BUST \xB7 ':total.soft?'SOFT ':'')+total.total;
                header.append(name,value); const cards=document.createElement('div');cards.className='bj-mini-cards';cards.append(...hand.cards.map(c=>miniCard(c)));
                box.append(header,cards);
                if(r.phase==='settled') {const result=document.createElement('p');result.className='club-muted';result.textContent=r.result.hands[i].label+' \xB7 returned '+r.result.hands[i].payout.toLocaleString();box.append(result);}
                return box;
            }));
            if(animating&&r.phase==='settled') {$('bj-turn').textContent='AT THE TABLE';$('bj-status').textContent='Cards on the table\u2026';}
            else if(ownTurn) {$('bj-turn').textContent=r.hands.length>1?'YOUR TURN \xB7 HAND '+(r.activeHand+1):'YOUR TURN';$('bj-status').textContent=animating?'Dealing your cards\u2026':'Hit, stand, or make your next move.';}
            else if(r.phase==='dealer') {$('bj-turn').textContent='DEALER\u2019S TURN';$('bj-status').textContent='Dealer reveals the hole card and plays to 17.';}
            else {
                const result=r.result, net=result.net, summary=result.hands.map(h=>h.label).join(' / ');
                $('bj-turn').textContent=net>0?'YOU WIN':net===0?'PUSH \xB7 STAKE RETURNED':'ROUND COMPLETE';
                $('bj-status').textContent=summary+' \xB7 Net '+(net>=0?'+':'\u2212')+Math.abs(net).toLocaleString()+' chips';
            }
        }
        scene?.sync(r,Number.isFinite(wager())?wager():50);
        host.querySelectorAll('[data-go-bank]').forEach(button=>{button.disabled=Boolean(playing)||animating;});
    }
    function changed() { update(); callbacks.changed(); }
    function schedule(callback, delay) {
        if(timer!==null) clearTimeout(timer);
        timer=setTimeout(()=>{timer=null;return callback();},reduced.matches?0:delay);
    }
    function finishedMotion() {
        animating=false;
        if(game.round?.phase==='settled'&&game.round.result.net>0) tone(660,.16,.08);
        changed();
        if(game.round?.phase==='dealer') queueDealer();
    }
    function queueDealer() {
        if(!visible||timer!==null||game.round?.phase!=='dealer') return;
        animating=true; changed();
        schedule(async()=>{
            try {await game.dealerStep();tone(240,.05);changed();if(game.round.phase==='dealer') queueDealer();else schedule(finishedMotion,650);}
            catch(error) {animating=false;callbacks.notify(error.message,true);changed();}
        },800);
    }
    async function act(action) {
        if(!visible||animating) return;
        try {
            if(action==='deal') await game.start(wager()); else await game[action]();
            animating=true;tone(action==='deal'?160:260,.08);changed();
            schedule(finishedMotion,action==='deal'?1050:600);
        } catch(error) {callbacks.notify(error.message,true);update();}
    }
    async function forceJackpot() {
        if (!visible || animating) { callbacks.notify('Wait for the cards to finish moving.', true); return; }
        try {
            await game.forceJackpot(wager());
            animating = true; tone(660, .12); changed();
            schedule(finishedMotion, 1050);
        } catch (error) { callbacks.notify(error.message, true); update(); }
    }
    for(const action of ['hit','stand','double','split']) $('bj-'+action).addEventListener('click',()=>act(action));
    $('bj-deal').addEventListener('click',()=>act('deal'));
    function changeWager(delta) {
        if(engine.lock||animating) return;
        $('bj-wager').value=String(Math.max(1,Math.min(1000000,(Number.isFinite(wager())?wager():50)+delta)));tone(360,.04);update();
    }
    $('bj-bet-minus').addEventListener('click',()=>changeWager(-10));$('bj-bet-plus').addEventListener('click',()=>changeWager(10));
    host.querySelectorAll('[data-bj-chip]').forEach(button=>button.addEventListener('click',()=>changeWager(Number(button.dataset.bjChip))));
    $('bj-wager').addEventListener('change',update);
    $('bj-wager').addEventListener('input',update);
    $('bj-camera').addEventListener('click',()=>{overhead=!overhead;scene?.setOverhead(overhead);$('bj-camera').textContent=overhead?'View: Overhead':'View: Player';});
    $('bj-sound').addEventListener('click',()=>{muted=!muted;$('bj-sound').textContent=muted?'Sound: Off':'Sound: On';$('bj-sound').setAttribute('aria-pressed',String(muted));});
    window.addEventListener('keydown',event=>{
        if(!visible||event.repeat||event.altKey||event.ctrlKey||event.metaKey||event.target.closest('input, select, textarea, button, summary')) return;
        const action={h:'hit',s:'stand',d:'double',p:'split'}[event.key.toLowerCase()];
        if(action&&game.available()[action]) {event.preventDefault();event.stopImmediatePropagation();act(action);}
    });
    return { update, game, forceJackpot, get pending(){return game.pending;}, get animating(){return animating;},
        setVisible(value) {
            visible=value;
            if(value&&!scene) {
                try {scene=createBlackjackScene($('bj-scene'));}
                catch {scene=null;}
                if(!scene) {$('bj-render-note').hidden=false;$('bj-render-note').textContent='The 3D view is unavailable in this browser. Play using the cards and controls below.';}
            }
            scene?.setVisible(value);
            if(value){update();if(game.round?.phase==='dealer'&&!animating) queueDealer();}
        }
    };
}

function createEconomyUI(engine, callbacks) {
    const $ = id => document.getElementById(id), fmt = n => n.toLocaleString();
    let buyButtons = [];
    const remaining = ms => { const seconds = Math.max(0, Math.ceil(ms / 1000)); return Math.floor(seconds / 60) + ':' + String(seconds % 60).padStart(2, '0'); };
    function tick() {
        const user = engine.active, now = engine.now();
        $('bank-interest-progress').textContent = user.debt > 0 ? \`\u4E0B\u6B21\u8BA1\u606F \${remaining(user.bankInterestAt + 30 * 60000 - now)} \xB7 \u6BCF 30 \u5206\u949F 0.5%\u3002\` : '\u65E0\u6B20\u6B3E\uFF0C\u4E0D\u8BA1\u606F\u3002';
        $('shark-progress').textContent = user.sharkDebt > 0 ? \`\u4E0B\u6B21\u8BA1\u606F \${remaining(user.sharkInterestAt + 5 * 60000 - now)} \xB7 \u6BCF 5 \u5206\u949F 10%\u3002\` : '\u6BCF 5 \u5206\u949F\uFF0C\u672A\u8FD8\u6B20\u6B3E\u52A0 10%\u3002';
        const cooling = now < user.marketAvailableAt;
        $('market-cooldown').textContent = cooling ? '\u5546\u4EBA\u8FDB\u8D27\u4E2D \xB7 \u4E0B\u6B21\u8D2D\u4E70\u8FD8\u9700 ' + remaining(user.marketAvailableAt - now) : '\u5546\u4EBA\u5DF2\u5230\u8D27 \xB7 \u8D2D\u4E70\u540E\u51B7\u5374 15 \u5206\u949F';
        buyButtons.forEach(({button, blocked}) => { button.disabled = blocked || cooling; });
    }
    function element(tag, text, className) {
        const node = document.createElement(tag); node.textContent = text;
        if (className) node.className = className;
        return node;
    }
    function validStake() {
        const n = Number($('market-stake').value);
        return Number.isSafeInteger(n) && n > 0 && n <= 1000000 ? n : null;
    }
    function render() {
        const user = engine.active, locked = callbacks.locked(), stake = validStake();
        $('bank-borrow').disabled = locked || engine.availableCredit === 0;
        $('shark-panel').hidden = !engine.canBorrowShark && user.sharkDebt === 0;
        $('shark-offer').hidden = !engine.canBorrowShark;
        $('shark-repayment').hidden = user.sharkDebt === 0;
        $('shark-debt').textContent = fmt(user.sharkDebt);
        $('shark-credit').textContent = fmt(engine.availableSharkCredit);
        $('bank-total-debt').textContent = fmt(user.debt + user.sharkDebt);
        $('market-stake').disabled = locked;
        $('market-stake').setAttribute('aria-invalid', String(stake === null));
        buyButtons = [];
        $('market-catalog').replaceChildren(...Object.entries(CasinoEngine.cards).map(([type, item]) => {
            const card = element('article', '', 'club-card market-product');
            card.append(element('div', item.symbol, 'market-symbols'), element('h3', item.name));
            card.append(element('p', stake === null ? '\u8BF7\u8F93\u5165 1\u20131,000,000 \u7684\u6574\u6570\u4E0B\u6CE8\u3002' : \`\u5361\u4EF7 \${fmt(stake * item.factor)} \xB7 \u4F7F\u7528\u65F6\u53E6\u6263 \${fmt(stake)}\`, 'market-price'));
            card.append(element('p', stake === null ? '' : \`\u4FDD\u5E95\u8FD4\u56DE \${fmt(stake * item.multiplier)} \xB7 \u6263\u9664\u5361\u4EF7\u4E0E\u4E0B\u6CE8\u540E\u51C0\u8D5A \${fmt(stake * (item.multiplier - item.factor - 1))}\`, 'club-muted'));
            const button = element('button', '\u8D2D\u4E70\u6B64\u5361', 'club-action'); button.type = 'button';
            button.disabled = locked || stake === null || user.cards.length >= 50 || (stake !== null && stake * (item.factor + 1) > user.balance);
            buyButtons.push({button, blocked: button.disabled});
            button.addEventListener('click', () => callbacks.transact(() => engine.buyCard(type, validStake()), '\u5361\u7247\u5DF2\u653E\u5165\u5F53\u524D\u73A9\u5BB6\u7684\u5361\u5305\u3002'));
            card.append(button); return card;
        }));
        const rows = user.cards.map(card => {
            const row = element('div', '', 'market-card-row'), armed = user.armedCardId === card.id;
            row.append(element('span', \`\${CasinoEngine.cards[card.type].name} \xB7 \u7ED1\u5B9A \${fmt(card.stake)}\${armed ? ' \xB7 \u5DF2\u88C5\u5907' : ''}\`));
            const button = element('button', armed ? '\u53D6\u6D88\u88C5\u5907' : '\u88C5\u5907\u5E76\u524D\u5F80 777', 'club-action secondary');
            button.type = 'button'; button.disabled = locked || (!armed && card.stake > user.balance);
            button.addEventListener('click', async () => {
                if (await callbacks.transact(() => engine.armCard(armed ? null : card.id), armed ? '\u5DF2\u53D6\u6D88\u88C5\u5907\u3002' : '\u5DF2\u88C5\u5907\uFF0C\u4E0B\u4E00\u6B21 777 \u65CB\u8F6C\u4F7F\u7528\u6B64\u5361\u3002') && !armed) callbacks.playSlots();
            });
            row.append(button); return row;
        });
        $('market-inventory').replaceChildren(...(rows.length ? rows : [element('p', '\u5361\u5305\u8FD8\u662F\u7A7A\u7684\u3002', 'club-muted')]));
        const armed = engine.armedCard;
        $('lucky-armed-card').hidden = !armed;
        $('lucky-card-label').textContent = armed ? \`\${CasinoEngine.cards[armed.type].name} \xB7 \u4E0B\u4E00\u6B21\u4E0B\u6CE8 \${fmt(armed.stake)}\` : '';
        $('lucky-card-cancel').disabled = locked;
        tick();
    }
    $('market-stake').addEventListener('input', render);
    $('shark-borrow-form').addEventListener('submit', async event => {
        event.preventDefault();
        if (await callbacks.transact(() => engine.borrowShark(Number($('shark-borrow-amount').value)), '\u9AD8\u5229\u8D37\u5DF2\u5230\u8D26\uFF0C\u6B20\u6B3E\u53CA\u8BA1\u606F\u8FDB\u5EA6\u5DF2\u4FDD\u5B58\u3002')) $('shark-borrow-form').reset();
    });
    $('shark-repay-form').addEventListener('submit', async event => {
        event.preventDefault();
        if (await callbacks.transact(() => engine.repayShark(Number($('shark-repay-amount').value)), '\u9AD8\u5229\u8D37\u8FD8\u6B3E\u5DF2\u5165\u8D26\u3002')) $('shark-repay-form').reset();
    });
    $('lucky-card-cancel').addEventListener('click', () => callbacks.transact(() => engine.armCard(null), '\u5DF2\u53D6\u6D88\u88C5\u5907\u3002'));
    return { render, tick };
}

function createPlayerLoansUI(engine, callbacks) {
    const $ = id => document.getElementById(id), fmt = value => value.toLocaleString();
    const repaymentValues = new Map(); let clocks = [];
    const element = (tag, text, className) => { const node = document.createElement(tag); node.textContent = text; if (className) node.className = className; return node; };
    function button(text, action) {
        const node = element('button', text, 'club-action secondary'); node.type = 'button'; node.disabled = callbacks.locked(); node.addEventListener('click', action); return node;
    }
    function tick() {
        for (const {node, loan} of clocks) {
            const seconds = Math.max(0, Math.ceil((loan.interestAt + loan.periodMs - engine.now()) / 1000));
            node.textContent = \`\u4E0B\u6B21\u8BA1\u606F \${Math.floor(seconds / 60)}:\${String(seconds % 60).padStart(2,'0')} \xB7 \u5F53\u524D\u6B20\u6B3E \${fmt(loan.balance)}\`;
        }
    }
    function render() {
        const user = engine.active, locked = callbacks.locked(), selected = $('peer-loan-user').value;
        const options = engine.data.users.filter(person => person.id !== user.id).map(person => { const option = element('option', person.name); option.value = person.id; return option; });
        $('peer-loan-user').replaceChildren(...options);
        if (options.some(option => option.value === selected)) $('peer-loan-user').value = selected;
        $('peer-loan-user').disabled = locked || !options.length;
        for (const name of ['amount','rate','minutes']) $('peer-loan-' + name).disabled = locked;
        $('players-greeting').textContent = user.name + ' \xB7 \u73A9\u5BB6\u5F80\u6765'; $('players-wallet').textContent = fmt(user.balance);
        const loans = engine.data.loans.filter(loan => [loan.lenderId, loan.borrowerId].includes(user.id));
        $('peer-debt').textContent = fmt(loans.filter(loan => loan.status === 'active' && loan.borrowerId === user.id).reduce((sum, loan) => sum + loan.balance,0));
        $('peer-receivable').textContent = fmt(loans.filter(loan => loan.status === 'active' && loan.lenderId === user.id).reduce((sum, loan) => sum + loan.balance,0));
        clocks = [];
        const rows = loans.slice(0, 100).map(loan => {
            const row = element('article', '', 'peer-loan-row'), actions = element('div', '', 'club-actions');
            const state = {pending:'\u5F85\u501F\u6B3E\u4EBA\u786E\u8BA4',active:'\u501F\u6B3E\u4E2D',declined:'\u5DF2\u62D2\u7EDD',cancelled:'\u5DF2\u64A4\u9500',repaid:'\u5DF2\u8FD8\u6E05'}[loan.status];
            row.append(element('h4', loan.lenderName + ' \u2192 ' + loan.borrowerName + ' \xB7 ' + state));
            row.append(element('p', \`\u672C\u91D1 \${fmt(loan.principal)} \xB7 \u6BCF \${loan.periodMs / 60000} \u5206\u949F \${loan.rateBps / 100}% \xB7 \u786E\u8BA4\u540E\u6309\u73B0\u5B9E\u65F6\u95F4\u590D\u5229\u8BA1\u606F\uFF0C\u79BB\u7EBF\u4E5F\u8BA1\u606F\`, 'club-muted'));
            if (loan.status === 'pending') {
                if (loan.borrowerId === user.id) {
                    actions.append(button('\u63A5\u53D7\u6761\u6B3E\u5E76\u501F\u5165', () => callbacks.transact(() => engine.respondLoan(loan.id, true), '\u53CC\u65B9\u5DF2\u540C\u610F\uFF0C\u501F\u6B3E\u5DF2\u5230\u8D26\u3002')),
                        button('\u62D2\u7EDD', () => callbacks.transact(() => engine.respondLoan(loan.id, false), '\u5DF2\u62D2\u7EDD\u8BE5\u534F\u8BAE\u3002')));
                } else actions.append(button('\u64A4\u9500\u534F\u8BAE', () => callbacks.transact(() => engine.cancelLoan(loan.id), '\u5DF2\u64A4\u9500\u534F\u8BAE\u3002')));
            }
            if (loan.status === 'active') {
                const clock = element('p', '', 'club-muted'); row.append(clock); clocks.push({node:clock, loan});
                if (loan.borrowerId === user.id) {
                    const form = document.createElement('form'), input = document.createElement('input'), submit = element('button', '\u8FD8\u7ED9 ' + loan.lenderName, 'club-action');
                    form.className = 'peer-repay-form'; input.className = 'club-input'; input.type = 'number'; input.min = '1'; input.max = String(loan.balance); input.step = '1'; input.required = true;
                    input.setAttribute('aria-label', '\u507F\u8FD8\u7ED9 ' + loan.lenderName + ' \u7684\u91D1\u989D'); input.value = repaymentValues.get(loan.id) ?? String(Math.max(1, Math.min(loan.balance, user.balance)));
                    input.disabled = locked; submit.type = 'submit'; submit.disabled = locked;
                    input.addEventListener('input', () => repaymentValues.set(loan.id, input.value));
                    form.addEventListener('submit', async event => { event.preventDefault(); callbacks.transact(() => engine.repayLoan(loan.id, Number(input.value)), '\u8FD8\u6B3E\u5DF2\u8FDB\u5165\u51FA\u501F\u4EBA\u94B1\u5305\u3002'); });
                    form.append(input, submit); row.append(form);
                }
            }
            row.append(actions); return row;
        });
        $('peer-loan-list').replaceChildren(...(rows.length ? rows : [element('p','\u6682\u65E0\u501F\u6B3E\u534F\u8BAE\u3002','club-muted')])); tick();
    }
    $('peer-loan-form').addEventListener('submit', async event => {
        event.preventDefault();
        if (await callbacks.transact(() => engine.offerLoan($('peer-loan-user').value, Number($('peer-loan-amount').value), Number($('peer-loan-rate').value), Number($('peer-loan-minutes').value)), '\u534F\u8BAE\u5DF2\u53D1\u51FA\uFF0C\u8BF7\u5207\u6362\u5230\u501F\u6B3E\u73A9\u5BB6\u786E\u8BA4\u3002')) $('peer-loan-amount').value = '';
    });
    return { render, tick };
}

function createAdminUI(engine, callbacks) {
    const $=id=>document.getElementById(id);let auth=engine.auth||{enrolled:false,admin:false,canEnroll:false},working=false;
    let legacy=null;try{const raw=localStorage.getItem('roulette-club-v1');if(raw)legacy=JSON.parse(raw);}catch{}
    async function api(path,body) {
        const response=await fetch(path,{method:body===undefined?'GET':'POST',headers:body===undefined?{}:{'Content-Type':'application/json'},credentials:'same-origin',body:body===undefined?undefined:JSON.stringify(body)});
        const result=await response.json();if(!response.ok)throw new Error(result.error||'\u7BA1\u7406\u9A8C\u8BC1\u5931\u8D25\u3002');return result;
    }
    function render() {
        auth=engine.auth||auth;
        $('admin-login').hidden=auth.admin;$('admin-panel').hidden=!auth.admin;
        $('admin-enroll').hidden=!auth.canEnroll;$('admin-signin').hidden=!auth.enrolled;
        $('admin-enroll').disabled=working;$('admin-signin').disabled=working;
        $('admin-auth-status').textContent=working?'\u8BF7\u5B8C\u6210\u7CFB\u7EDF\u7684 Windows Hello \u63D0\u793A\u2026':!engine.remote?'\u7BA1\u7406\u5165\u53E3\u9700\u8981\u5728\u5DF2\u53D1\u5E03\u7F51\u7AD9\u4E2D\u6253\u5F00\u3002':auth.enrolled?'\u5DF2\u8BBE\u7F6E\u901A\u884C\u5BC6\u94A5\u3002\u9A8C\u8BC1\u540E\u624D\u80FD\u7BA1\u7406\u73A9\u5BB6\u3002':'\u4EC5\u7AD9\u70B9\u6240\u6709\u8005\u53EF\u9996\u6B21\u7ED1\u5B9A\u7BA1\u7406\u901A\u884C\u5BC6\u94A5\u3002';
        $('admin-legacy').hidden=!legacy||engine.revision!==0;
        $('club-migration-note').hidden=!engine.legacyPending||window.location.pathname==='/admin';
        const selected=$('admin-adjust-player').value;
        $('admin-adjust-player').replaceChildren(...engine.data.users.map(user=>{const option=document.createElement('option');option.value=user.id;option.textContent=user.name+' \xB7 '+user.balance.toLocaleString();return option;}));
        if(engine.data.users.some(user=>user.id===selected))$('admin-adjust-player').value=selected;
        document.querySelectorAll('[data-admin-action]').forEach(button=>button.disabled=working||!auth.admin||callbacks.locked());
    }
    async function authenticate(register) {
        if(!engine.remote){$('admin-message').textContent='\u8BF7\u4ECE\u5DF2\u53D1\u5E03\u7F51\u7AD9\u6253\u5F00\u7BA1\u7406\u5165\u53E3\u3002';return;}
        if(!window.PublicKeyCredential||!navigator.credentials){$('admin-message').textContent='\u5F53\u524D\u6D4F\u89C8\u5668\u4E0D\u652F\u6301\u901A\u884C\u5BC6\u94A5\u3002\u8BF7\u5728 Windows \u4E0A\u7528 Edge \u6216 Chrome \u6253\u5F00\u672C\u7AD9\u3002';return;}
        working=true;render();$('admin-message').textContent='';
        try{
            const kind=register?'register':'authenticate',optionsJSON=await api('/api/admin/'+kind+'/options',{});
            const result=register?await ClubPasskeys.startRegistration({optionsJSON}):await ClubPasskeys.startAuthentication({optionsJSON});
            await api('/api/admin/'+kind+'/verify',result);auth=await api('/api/admin/status');engine.auth=auth;
            await engine.sync();$('admin-message').textContent='\u7BA1\u7406\u5165\u53E3\u5DF2\u89E3\u9501\u3002';callbacks.changed();
        }catch(error){$('admin-message').textContent=error.name==='NotAllowedError'?'\u9A8C\u8BC1\u5DF2\u53D6\u6D88\u6216\u8D85\u65F6\uFF0C\u5C1A\u672A\u4FEE\u6539\u4EFB\u4F55\u8D26\u6237\u3002':error.message;}
        finally{working=false;render();}
    }
    $('admin-enroll').addEventListener('click',()=>authenticate(true));$('admin-signin').addEventListener('click',()=>authenticate(false));
    $('admin-lock').addEventListener('click',async()=>{try{await api('/api/admin/logout',{});auth={...auth,admin:false};engine.auth=auth;callbacks.changed();}catch(error){$('admin-message').textContent=error.message;}render();});
    $('admin-adjust-form').addEventListener('submit',async event=>{
        event.preventDefault();
        if(await callbacks.transact(()=>engine.adminAdjust($('admin-adjust-player').value,$('admin-adjust-mode').value,Number($('admin-adjust-amount').value),$('admin-adjust-reason').value),'\u7BA1\u7406\u5458\u4F59\u989D\u8C03\u6574\u5DF2\u4FDD\u5B58\u5E76\u8BB0\u5F55\u3002')){$('admin-adjust-amount').value='';$('admin-adjust-reason').value='';}
    });
    $('admin-import').addEventListener('click',async()=>{
        if(!legacy)return;
        if(await callbacks.transact(()=>engine.importLegacy(legacy),'\u65E7\u5B58\u6863\u5DF2\u5BFC\u5165\u670D\u52A1\u5668\uFF0C\u672C\u5730\u5907\u4EFD\u5DF2\u4FDD\u7559\u3002')){legacy=null;callbacks.changed();}
    });
    return {render,get unlocked(){return Boolean(auth.admin);}};
}

function createCasinoClub(roulette) {
    'use strict';
    let browserStorage;
    try { browserStorage = window.localStorage; } catch { /* Session mode is supported. */ }
    const engine = new CasinoEngine(browserStorage);
    if (!browserStorage && !engine.remote) engine.storageWarning = 'Browser storage is unavailable. This session is temporary.';
    for (const key of ['balance', 'bets', 'lastBets', 'history']) {
        Object.defineProperty(roulette, key, { configurable: true, enumerable: true,
            get: () => engine.active[key], set: value => { engine.active[key] = value; } });
    }
    let view = 'roulette', toastTimer, lucky, blackjack, customRoulette, economy, playerLoans, admin, pendingDelete = null;
    const $ = id => document.getElementById(id);
    const fmt = n => n.toLocaleString();
    const busy = () => Boolean(engine.lock);
    const viewLocked = () => busy() || roulette.isChargingSpin || roulette.isDraggingTurret || Boolean(blackjack?.animating) || Boolean(lucky?.dragging);
    function toast(message, error = false) {
        clearTimeout(toastTimer);
        $('club-toast').textContent = message;
        $('club-toast').dataset.error = String(error);
        $('club-toast').hidden = false;
        toastTimer = setTimeout(() => { $('club-toast').hidden = true; }, 5000);
    }
    function option(user) {
        const el = document.createElement('option');
        el.value = user.id;
        el.textContent = user.name;
        return el;
    }
    function render() {
        admin?.render();
        const u = engine.active;
        const selectedRecipient = $('transfer-user').value;
        $('club-user').replaceChildren(...engine.data.users.map(option));
        $('club-user').value = u.id;
        $('club-user').disabled = viewLocked();
        $('transfer-user').replaceChildren(...engine.data.users.filter(p => p.id !== u.id).map(option));
        if ([...$('transfer-user').options].some(o => o.value === selectedRecipient)) $('transfer-user').value = selectedRecipient;
        $('club-wallet').textContent = \`\${fmt(lucky?.displayBalance ?? u.balance)} \u20B5\`;
        $('bank-greeting').textContent = \`\${u.name}\u2019s wallet & bank\`;
        $('bank-wallet').textContent = fmt(u.balance);
        $('bank-debt').textContent = fmt(u.debt);
        $('bank-credit').textContent = fmt(engine.availableCredit);
        $('club-storage-note').textContent = engine.storageWarning;
        $('club-player-list').replaceChildren(...engine.data.users.map(p => {
            const row = document.createElement('div'); row.className = 'club-player';
            const avatar = document.createElement('span'); avatar.className = 'club-avatar'; avatar.textContent = p.name[0].toUpperCase();
            const data = document.createElement('div'); data.className = 'club-player-data';
            const name = document.createElement('div'); name.className = 'club-player-name'; name.textContent = p.name;
            const detail = document.createElement('div'); detail.className = 'club-player-detail';
            detail.textContent = \`\${fmt(p.balance)} chips \xB7 \${fmt(p.debt + p.sharkDebt)} debt\${CasinoEngine.sumBets(p.bets) ? \` \xB7 \${fmt(CasinoEngine.sumBets(p.bets))} on roulette\` : ''}\`;
            data.append(name, detail);
            const button = document.createElement('button'); button.type = 'button'; button.className = 'club-action secondary';
            button.textContent = p.id === u.id ? 'Playing' : 'Switch';
            button.disabled = p.id === u.id || viewLocked();
            button.addEventListener('click', () => switchPlayer(p.id));
            const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'club-action secondary danger';
            remove.textContent = pendingDelete === p.id ? '\u518D\u6B21\u70B9\u51FB\u786E\u8BA4\u6C38\u4E45\u5220\u9664\uFF08\u542B\u4F59\u989D\uFF09' : '\u5220\u9664';
            remove.disabled = viewLocked() || engine.data.users.length === 1 || !admin?.unlocked;
            remove.addEventListener('click', async () => {
                if (!admin?.unlocked) { toast('\u8BF7\u5148\u4F7F\u7528 Windows Hello \u89E3\u9501\u7BA1\u7406\u5165\u53E3\u3002',true); return; }
                if (pendingDelete !== p.id) { pendingDelete = p.id; render(); return; }
                if (await transact(() => engine.deletePlayer(p.id), '\u73A9\u5BB6\u5DF2\u5220\u9664\u3002')) {
                    pendingDelete = null; lucky.resetPlayer(); renderHistoryRibbon(); renderNumberModalGrid(); hideBanner(); render();
                }
            });
            row.append(avatar, data, button, remove); return row;
        }));
        const entries = engine.data.ledger.slice(0, 40).map(t => {
            const li = document.createElement('li'); const text = document.createElement('span'); text.textContent = t.text;
            const time = document.createElement('time'); time.dateTime = t.time;
            const date = new Date(t.time); time.textContent = Number.isNaN(date.getTime()) ? '' : date.toLocaleString();
            li.append(text, time); return li;
        });
        if (!entries.length) { const li = document.createElement('li'); li.textContent = 'Your table activity will appear here.'; entries.push(li); }
        $('club-ledger').replaceChildren(...entries);
        document.querySelectorAll('[data-idle-only]').forEach(el => { el.disabled = viewLocked(); });
        document.querySelectorAll('[data-view]').forEach(el => { el.disabled = viewLocked(); });
        lucky?.update(viewLocked());
        customRoulette?.update(viewLocked());
        blackjack?.update();
        document.querySelectorAll('#roulette-controls [data-bet], .chip-btn, #clear-bets-btn, #rebet-btn, #open-number-modal-btn, #spin-btn').forEach(el => { el.disabled = busy(); });
        economy?.render();
        playerLoans?.render();
    }
    function refresh() { engine.save(); render(); }
    function paintView() {
        $('number-modal').classList.add('hidden'); $('number-modal').classList.remove('flex');
        $('slots-view').hidden = view !== 'slots'; $('bank-view').hidden = view !== 'bank';
        $('market-view').hidden = view !== 'market';
        $('players-view').hidden = view !== 'players';
        $('admin-view').hidden = view !== 'admin';
        $('club-player-tabs').hidden = view === 'admin';
        lucky.setVisible(view === 'slots');
        $('blackjack-view').hidden = view !== 'blackjack';
        blackjack.setVisible(view === 'blackjack');
        document.querySelectorAll('[data-view]').forEach(b => b.setAttribute('aria-selected', String(b.dataset.view === view)));
        document.querySelectorAll('.club-roulette-hud, #roulette-controls, #hint-pill, #status-banner, #canvas-container').forEach(el => {
            if (view === 'roulette') el.style.removeProperty('display'); else el.style.display = 'none';
        });
        render();
    }
    function setView(next) {
        if (!['roulette', 'slots', 'blackjack', 'bank', 'market', 'players', 'admin'].includes(next)) return;
        if (viewLocked()) { toast('Finish the current round before changing tables.', true); return; }
        view = next;
        paintView();
        try { window.history.replaceState(null, '', '#' + view); } catch { /* Local file previews still work. */ }
    }
    function switchPlayer(id) {
        try {
            if (viewLocked()) throw new Error('Finish the current round before switching players.');
            engine.switchUser(id);
            updateBettingHUD(); renderHistoryRibbon(); renderNumberModalGrid(); hideBanner();
            lucky.resetPlayer();
            toast(\`Now playing as \${engine.active.name}.\`);
        } catch (e) { render(); toast(e.message, true); }
    }
    async function transact(action, success) {
        try {
            if (viewLocked()) throw new Error('Wait for the current round to finish.');
            await action(); updateBettingHUD(); toast(success);
            return true;
        } catch (e) { toast(e.message, true); return false; }
    }
    function init() {
        bindJackpotShortcut(window, () => {
            if (!['roulette', 'slots', 'blackjack'].includes(view)) return false;
            if (roulette.isChargingSpin || roulette.isDraggingTurret || lucky?.dragging) { toast('Release the controls before using the shortcut.', true); return; }
            if (view === 'blackjack') blackjack.forceJackpot();
            else if (view === 'roulette') forceRouletteJackpot();
            else if (!busy()) lucky.forceJackpot();
            else toast('Wait for this spin to finish, then use the shortcut again.', true);
        });
        economy = createEconomyUI(engine, { locked: viewLocked, transact, playSlots: () => setView('slots') });
        playerLoans = createPlayerLoansUI(engine, { locked: viewLocked, transact });
        customRoulette = bindCustomBet('roulette-custom', engine, {
            locked: viewLocked, notify: toast,
            apply(value) {
                roulette.selectedChip = value; roulette.customBet = true;
                document.querySelectorAll('.chip-btn').forEach(button => button.classList.remove('active'));
                $('roulette-custom-selected').textContent = 'Selected: ' + fmt(value) + ' chips per bet';
                toast('Custom chip set to ' + fmt(value) + '. Choose a category or number to place it.');
            }
        });
        blackjack = createBlackjackTable(engine, { changed: () => updateBettingHUD(), notify: toast });
        lucky = createLucky777(engine, {bank: () => setView('bank'), market: () => setView('market'),
            locked: viewLocked,
            changed: () => updateBettingHUD(),
            notify: toast
        });
        admin = createAdminUI(engine, {locked:viewLocked,transact,changed:()=>{lucky.resetPlayer();render();}});
        if(engine.remote) engine.onChange = render;
        document.querySelectorAll('[data-view]').forEach(b => b.addEventListener('click', () => setView(b.dataset.view)));
        document.querySelectorAll('[data-go-bank]').forEach(b => b.addEventListener('click', () => setView('bank')));
        $('club-user').addEventListener('change', e => switchPlayer(e.target.value));
        $('transfer-form').addEventListener('submit', async e => {
            e.preventDefault();
            if (await transact(() => engine.transfer($('transfer-user').value, Number($('transfer-amount').value)), 'Chips transferred successfully.')) $('transfer-form').reset();
        });
        $('bank-form').addEventListener('submit', async e => {
            e.preventDefault();
            const repay = e.submitter?.value === 'repay';
            if (await transact(() => engine[repay ? 'repay' : 'borrow'](Number($('bank-amount').value)), repay ? 'Debt repaid. Available credit updated.' : 'Borrowed chips added to your wallet.')) $('bank-form').reset();
        });
        $('player-form').addEventListener('submit', async e => {
            e.preventDefault();
            if (await transact(() => engine.addUser($('player-name').value), 'Player added with 1,000 starter chips.')) {
                $('player-form').reset(); renderHistoryRibbon(); renderNumberModalGrid(); hideBanner();
                lucky.resetPlayer();
            }
        });
        $('reset-chips-btn').textContent = 'Bank';
        $('reset-chips-btn').title = 'Borrow chips or repay your bank debt';
        $('reset-chips-btn').addEventListener('click', () => setView('bank'));
        // Space activates the focused UI normally, and controls the wheel only on the roulette table.
        window.addEventListener('keydown', e => {
            if (e.code === 'Space' && (view !== 'roulette' || e.target.closest('input, select, textarea, button'))) e.stopImmediatePropagation();
        });
        window.addEventListener('keyup', e => {
            if (e.code === 'Space' && (view !== 'roulette' || e.target.closest('input, select, textarea, button'))) e.stopImmediatePropagation();
        });
        document.querySelectorAll('[role="tab"]').forEach(tab => tab.addEventListener('keydown', e => {
            const tabs = [...document.querySelectorAll('[role="tab"]')];
            let i = tabs.indexOf(tab);
            if (e.key === 'ArrowRight') i = (i + 1) % tabs.length;
            else if (e.key === 'ArrowLeft') i = (i + tabs.length - 1) % tabs.length;
            else if (e.key === 'Home') i = 0;
            else if (e.key === 'End') i = tabs.length - 1;
            else return;
            e.preventDefault(); setView(tabs[i].dataset.view); tabs[i].focus();
        }));
        const requestedView = window.location.pathname === '/admin' ? 'admin' : window.location.hash.slice(1);
        if (requestedView === 'admin') view = 'admin';
        else if (blackjack.pending) view = 'blackjack';
        else if (['roulette', 'slots', 'blackjack', 'bank', 'market', 'players', 'admin'].includes(requestedView)) view = requestedView;
        paintView();
        let lastSync = 0;
        const tick = () => {
            if(engine.remote && !viewLocked() && Date.now()-lastSync >= 5000){lastSync=Date.now();engine.sync().catch(()=>{});}
            if (engine.accrueInterest()) { engine.save(); render(); }
            else { economy?.tick(); playerLoans?.tick(); }
        };
        setInterval(tick, 1000);
        window.addEventListener('focus', tick);
    }
    return { engine, get view() { return view; }, busy, refresh, render, init, toast };
}

    <\/script>
    <script>
        // ============================================================================
        // 1. SOUND ENGINE (Web Audio API Mechanical Clacks, Rim Roll, & Win Fanfare)
        // ============================================================================
        class RouletteSoundEngine {
            constructor() {
                this.ctx = null;
                this.enabled = true;
            }

            init() {
                if (!this.ctx) {
                    const AudioCtx = window.AudioContext || window.webkitAudioContext;
                    if (AudioCtx) this.ctx = new AudioCtx();
                }
                if (this.ctx && this.ctx.state === 'suspended') {
                    this.ctx.resume();
                }
            }

            playPocketClick(intensity = 1.0) {
                if (!this.enabled) return;
                this.init();
                if (!this.ctx) return;

                const now = this.ctx.currentTime;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                // Crisp wooden/metallic low-poly clack
                osc.type = 'triangle';
                const baseFreq = 520 + Math.random() * 140;
                osc.frequency.setValueAtTime(baseFreq, now);
                osc.frequency.exponentialRampToValueAtTime(110, now + 0.035);

                const vol = Math.min(0.35, Math.max(0.03, intensity * 0.28));
                gain.gain.setValueAtTime(vol, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now);
                osc.stop(now + 0.042);
            }

            playChipSound() {
                if (!this.enabled) return;
                this.init();
                if (!this.ctx) return;

                const now = this.ctx.currentTime;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(1400, now);
                osc.frequency.exponentialRampToValueAtTime(2200, now + 0.045);

                gain.gain.setValueAtTime(0.15, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now);
                osc.stop(now + 0.055);
            }

            playBallSettle() {
                if (!this.enabled) return;
                this.init();
                if (!this.ctx) return;

                const now = this.ctx.currentTime;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(240, now);
                osc.frequency.exponentialRampToValueAtTime(65, now + 0.14);

                gain.gain.setValueAtTime(0.35, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now);
                osc.stop(now + 0.16);
            }

            playWinSound(isBigWin = false) {
                if (!this.enabled) return;
                this.init();
                if (!this.ctx) return;

                const notes = isBigWin ? [523.25, 659.25, 783.99, 1046.5, 1318.5] : [523.25, 659.25, 783.99, 1046.5];
                notes.forEach((freq, idx) => {
                    const now = this.ctx.currentTime + idx * 0.08;
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(freq, now);

                    gain.gain.setValueAtTime(0.22, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

                    osc.connect(gain);
                    gain.connect(this.ctx.destination);
                    osc.start(now);
                    osc.stop(now + 0.36);
                });
            }

            playLoseSound() {
                if (!this.enabled) return;
                this.init();
                if (!this.ctx) return;

                const freqs = [310, 260];
                freqs.forEach((freq, idx) => {
                    const now = this.ctx.currentTime + idx * 0.14;
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    osc.type = 'sawtooth';
                    osc.frequency.setValueAtTime(freq, now);

                    gain.gain.setValueAtTime(0.08, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

                    osc.connect(gain);
                    gain.connect(this.ctx.destination);
                    osc.start(now);
                    osc.stop(now + 0.24);
                });
            }
        }

        const sfx = new RouletteSoundEngine();

        // ============================================================================
        // 2. GAME STATE & CONFIGURATION (24-Pocket Low-Poly Wheel)
        // ============================================================================
        const NUM_POCKETS = 24;
        // Pocket 0 is positioned at the ~2 o'clock angle in the initial resting wheel
        // Standard 24-pocket sequence
        const POCKETS = Array.from({ length: NUM_POCKETS }, (_, i) => {
            // In our wheel, index 0 is Green Zero (0).
            // Indices 1..23 alternate Odd (Red) and Even (Black/Dark).
            return {
                index: i,
                number: i,
                // Angle around the wheel in local wheel coordinates
                // Place index 0 at -Math.PI / 6 (approx 2 o'clock in screenshot!)
                localAngle: -Math.PI / 6 + (i * (Math.PI * 2 / NUM_POCKETS))
            };
        });

        const state = {
            imageMode: true, // true = 23 Red frames + 1 Green frame (matches screenshot!), false = Alternating Red & Black frames
            cameraMode: 'SCREENSHOT', // 'SCREENSHOT' | 'TOPDOWN'
            showNumberLabels: true,
            balance: 1000,
            selectedChip: 10,
            bets: {
                RED: 0,
                BLACK: 0,
                GREEN: 0,
                ODD: 0,
                EVEN: 0,
                numbers: {} //pocketNumber: amount
            },
            lastBets: null,
            history: [],

            // Physics & Wheel State
            phase: 'IDLE', // 'IDLE' | 'ORBITING' | 'DROPPING' | 'SETTLED'
            wheelAngle: 0,
            wheelAngularVel: 0,

            // Ball state: stored in world polar coordinates around wheel center
            // Initially resting in pocket #19 (top-left ~11 o'clock, matching the silver ball in the reference image!)
            ballAngle: -Math.PI / 6 + (19 * (Math.PI * 2 / NUM_POCKETS)),
            ballAngularVel: 0,
            ballRadius: 2.38,
            ballHeight: 0.42,
            ballRadialVel: 0,
            settledPocketIndex: 19,
            lastDividerIndex: -1,

            // Power button charging
            isChargingSpin: false,
            spinCharge: 0,

            // Direct 3D Turret Drag/Flick
            isDraggingTurret: false,
            dragLastAngle: 0,
            dragAngularVelSample: 0
        };

        const casino = createCasinoClub(state);
        casino.init();
        updateBettingHUD();
        renderHistoryRibbon();

        // Helper to determine pocket color according to active mode or logical roulette rules
        function getPocketVisualFrameColor(pocketIndex) {
            if (pocketIndex === 0) return 0x388e2c; // Bright Leaf Green at 2 o'clock
            if (state.imageMode) {
                return 0xd61f26; // Uncanny Screenshot Mode: all 23 other pocket frames are Crimson Red!
            } else {
                // Classic Mode: Odd is Crimson Red, Even is Charcoal Black
                return (pocketIndex % 2 === 1) ? 0xd61f26 : 0x26262c;
            }
        }

        // Logical winning category for bets
        function isRedPocket(num) {
            if (num === 0) return false;
            return num % 2 === 1;
        }
        function isBlackPocket(num) {
            if (num === 0) return false;
            return num % 2 === 0;
        }

        // ============================================================================
        // 3. THREE.JS 3D SCENE & LOW-POLY ROULETTE CONSTRUCTION
        // ============================================================================
        let scene, camera, renderer;
        let wheelGroup, rotatingAssembly, turretMesh, ballMesh;
        let pocketFrameMeshes = [];
        let pocketLabelSprites = [];
        let vrLaserLine, vrLaserDot, vrSecondaryLine;
        let turretPointLight, glowSprite;
        let raycaster = window.THREE ? new THREE.Raycaster() : null;
        let mouseNDC = window.THREE ? new THREE.Vector2(0, 0) : null;
        let interactivePlane = window.THREE ? new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.8) : null;

        // Camera orbital offset for smooth subtle mouse/touch inspection
        let camOrbitAzimuth = 0;
        let camOrbitElevation = 0;
        let isDraggingCamera = false;
        let prevPointer = { x: 0, y: 0 };

        function createRadialGlowTexture() {
            const canvas = document.createElement('canvas');
            canvas.width = 256;
            canvas.height = 256;
            const ctx = canvas.getContext('2d');
            const grad = ctx.createRadialGradient(128, 128, 6, 128, 128, 128);
            grad.addColorStop(0.0, 'rgba(255, 250, 210, 1.0)');
            grad.addColorStop(0.22, 'rgba(255, 210, 75, 0.85)');
            grad.addColorStop(0.55, 'rgba(245, 145, 20, 0.32)');
            grad.addColorStop(1.0, 'rgba(245, 145, 20, 0.0)');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, 256, 256);
            return new THREE.CanvasTexture(canvas);
        }

        function createPocketNumberSprite(number, isZero) {
            const canvas = document.createElement('canvas');
            canvas.width = 64;
            canvas.height = 64;
            const ctx = canvas.getContext('2d');

            ctx.fillStyle = isZero ? 'rgba(22, 163, 74, 0.9)' : (number % 2 === 1 ? 'rgba(185, 28, 28, 0.85)' : 'rgba(24, 24, 27, 0.9)');
            ctx.beginPath();
            ctx.arc(32, 32, 22, 0, Math.PI * 2);
            ctx.fill();

            ctx.lineWidth = 3;
            ctx.strokeStyle = 'rgba(253, 224, 71, 0.75)';
            ctx.stroke();

            ctx.fillStyle = '#ffffff';
            ctx.font = '900 24px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(String(number), 32, 33);

            const tex = new THREE.CanvasTexture(canvas);
            const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false });
            const sprite = new THREE.Sprite(mat);
            sprite.scale.set(0.34, 0.34, 1);
            return sprite;
        }

        function buildHalfRingGeometry(rInner1, rInner2, rOuter1, rOuter2, yBottom, yTop, startAngle, endAngle, segments) {
            // Creates a faceted low-poly half-bowl rim section with custom cross-section profile
            const geom = new THREE.BufferGeometry();
            const positions = [];
            const indices = [];

            // Cross section of rim has 4 profile vertices:
            // 0: inner bottom (rInner1, yBottom)
            // 1: inner top lip (rInner2, yTop)
            // 2: outer top bevel (rOuter1, yTop - 0.08)
            // 3: outer bottom base (rOuter2, yBottom - 0.35)
            const profile = [
                { r: rInner1, y: yBottom },
                { r: rInner2, y: yTop },
                { r: rOuter1, y: yTop - 0.08 },
                { r: rOuter2, y: yBottom - 0.35 }
            ];

            for (let i = 0; i <= segments; i++) {
                const t = i / segments;
                const theta = startAngle + t * (endAngle - startAngle);
                const cos = Math.cos(theta);
                const sin = Math.sin(theta);

                for (let p = 0; p < profile.length; p++) {
                    positions.push(
                        cos * profile[p].r,
                        profile[p].y,
                        sin * profile[p].r
                    );
                }
            }

            const stride = profile.length;
            for (let i = 0; i < segments; i++) {
                const base = i * stride;
                const next = (i + 1) * stride;
                for (let p = 0; p < stride - 1; p++) {
                    indices.push(base + p, next + p, base + p + 1);
                    indices.push(base + p + 1, next + p, next + p + 1);
                }
            }

            geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
            geom.setIndex(indices);
            geom.computeVertexNormals();
            return geom;
        }

        function build3DScene() {
            const container = document.getElementById('canvas-container');

            scene = new THREE.Scene();
            scene.background = new THREE.Color(0x282138); // Moody dark purple-indigo ambient backdrop from screenshot
            scene.fog = new THREE.FogExp2(0x282138, 0.032);

            camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100);
            updateCameraPosition();

            renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            container.appendChild(renderer.domElement);

            // --- LIGHTING (Warm Golden Center Glow + Soft Tabletop Studio Lights) ---
            const ambientLight = new THREE.AmbientLight(0xb8a8d8, 0.68);
            scene.add(ambientLight);

            const mainDirLight = new THREE.DirectionalLight(0xfff1d0, 0.72);
            mainDirLight.position.set(5, 11, 6);
            mainDirLight.castShadow = true;
            mainDirLight.shadow.mapSize.width = 1024;
            mainDirLight.shadow.mapSize.height = 1024;
            mainDirLight.shadow.bias = -0.001;
            scene.add(mainDirLight);

            // --- ENVIRONMENT: GREEN FELT TABLE, PLAYING CARD ON LEFT, GOLD/RED RAIL ON RIGHT ---
            buildTableEnvironment();

            // --- ROULETTE WHEEL ASSEMBLY ---
            wheelGroup = new THREE.Group();
            scene.add(wheelGroup);

            buildOuterSplitBowl();
            buildRotatingWheelInterior();
            buildSilverBall();
            buildVRLaserPointers();
        }

        function buildTableEnvironment() {
            // 1. Dark Emerald-Green Felt Table Surface (angled slightly like screenshot)
            const feltGeo = new THREE.BoxGeometry(11.5, 0.4, 11.5);
            const feltMat = new THREE.MeshStandardMaterial({
                color: 0x264830,
                roughness: 0.92,
                metalness: 0.05,
                flatShading: true
            });
            const feltMesh = new THREE.Mesh(feltGeo, feltMeshMat = feltMat);
            feltMesh.position.set(-1.1, -0.35, 0.6);
            feltMesh.rotation.y = 0.16;
            feltMesh.receiveShadow = true;
            scene.add(feltMesh);

            // Subtle dark burgundy table trim along the back-left edge of the green felt
            const leftTrimGeo = new THREE.BoxGeometry(11.6, 0.45, 0.35);
            const leftTrimMat = new THREE.MeshStandardMaterial({
                color: 0x4c1d30,
                roughness: 0.8,
                flatShading: true
            });
            const leftTrim = new THREE.Mesh(leftTrimGeo, leftTrimMat);
            leftTrim.position.set(-1.1, -0.32, -4.9);
            leftTrim.rotation.y = 0.16;
            scene.add(leftTrim);

            // 2. Playing Card resting to the left of the wheel (matching screenshot!)
            const cardGroup = new THREE.Group();
            // White card base
            const cardBaseGeo = new THREE.BoxGeometry(1.42, 0.03, 1.95);
            const cardBaseMat = new THREE.MeshStandardMaterial({
                color: 0xdbe2ea,
                roughness: 0.5,
                flatShading: true
            });
            const cardBase = new THREE.Mesh(cardBaseGeo, cardBaseMat);
            cardBase.castShadow = true;
            cardGroup.add(cardBase);

            // Dark charcoal/slate card back inset
            const cardBackGeo = new THREE.BoxGeometry(1.24, 0.034, 1.76);
            const cardBackMat = new THREE.MeshStandardMaterial({
                color: 0x464852,
                roughness: 0.65,
                flatShading: true
            });
            const cardBack = new THREE.Mesh(cardBackGeo, cardBackMat);
            cardGroup.add(cardBack);

            cardGroup.position.set(-4.65, -0.12, -0.25);
            cardGroup.rotation.y = 0.54;
            scene.add(cardGroup);

            // Small purple VR token/chip hint at bottom-left edge of screenshot
            const tokenGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.1, 12);
            const tokenMat = new THREE.MeshStandardMaterial({ color: 0x5b21b6, flatShading: true });
            const tokenMesh = new THREE.Mesh(tokenGeo, tokenMat);
            tokenMesh.position.set(-3.1, -0.1, 4.15);
            scene.add(tokenMesh);

            // 3. Right-Side Golden/Wooden Stepped Rail & Red Table Area (matching right side of screenshot!)
            const rightStructure = new THREE.Group();

            // Golden stepped rail frame
            const goldRailMat = new THREE.MeshStandardMaterial({
                color: 0xc8962e,
                roughness: 0.45,
                metalness: 0.25,
                flatShading: true
            });

            const railLong = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.55, 8.5), goldRailMat);
            railLong.position.set(4.15, 0.05, 0.8);
            rightStructure.add(railLong);

            const railInnerStep = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.35, 8.5), goldRailMat);
            railInnerStep.position.set(3.85, -0.05, 0.8);
            rightStructure.add(railInnerStep);

            const railTopCross = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.55, 0.45), goldRailMat);
            railTopCross.position.set(5.6, 0.05, -2.1);
            rightStructure.add(railTopCross);

            // Warm ochre/brown wood top header above the rail
            const woodMat = new THREE.MeshStandardMaterial({
                color: 0x85582a,
                roughness: 0.7,
                flatShading: true
            });
            const woodHeader = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.45, 1.3), woodMat);
            woodHeader.position.set(5.6, 0.12, -2.85);
            rightStructure.add(woodHeader);

            // Crimson red right-side table surface
            const rightRedFelt = new THREE.Mesh(
                new THREE.BoxGeometry(3.4, 0.35, 7.2),
                new THREE.MeshStandardMaterial({ color: 0x9e1c28, roughness: 0.8, flatShading: true })
            );
            rightRedFelt.position.set(5.9, -0.12, 1.8);
            rightStructure.add(rightRedFelt);

            rightStructure.rotation.y = 0.16;
            scene.add(rightStructure);
        }

        function buildOuterSplitBowl() {
            // The outer stationary roulette bowl is split down the middle!
            // Left half: Dark matte olive-charcoal with a thin gold inner trim lip.
            // Right half: Matte crimson red.
            const bowlGroup = new THREE.Group();

            // Split plane angle matching the screenshot (~100 degrees to ~280 degrees)
            const splitAngleTop = -Math.PI * 0.53; // ~11:30 o'clock
            const splitAngleBottom = Math.PI * 0.47; // ~5:30 o'clock
            const facetsPerHalf = 9; // 18-sided low-poly faceted bowl

            // 1. RIGHT HALF: Matte Crimson Red Outer Rim
            const redHalfGeo = buildHalfRingGeometry(
                2.82, 3.05, 4.02, 4.22,
                0.28, 0.82,
                splitAngleTop, splitAngleBottom,
                facetsPerHalf
            );
            const redRimMat = new THREE.MeshStandardMaterial({
                color: 0xd11925,
                roughness: 0.62,
                metalness: 0.08,
                flatShading: true,
                side: THREE.DoubleSide
            });
            const redHalfMesh = new THREE.Mesh(redHalfGeo, redRimMat);
            redHalfMesh.castShadow = true;
            redHalfMesh.receiveShadow = true;
            bowlGroup.add(redHalfMesh);

            // 2. LEFT HALF: Matte Dark Charcoal/Olive-Black Outer Rim
            const blackHalfGeo = buildHalfRingGeometry(
                2.82, 3.05, 4.02, 4.22,
                0.28, 0.82,
                splitAngleBottom, splitAngleTop + Math.PI * 2,
                facetsPerHalf
            );
            const blackRimMat = new THREE.MeshStandardMaterial({
                color: 0x35332a,
                roughness: 0.72,
                metalness: 0.1,
                flatShading: true,
                side: THREE.DoubleSide
            });
            const blackHalfMesh = new THREE.Mesh(blackHalfGeo, blackRimMat);
            blackHalfMesh.castShadow = true;
            blackHalfMesh.receiveShadow = true;
            bowlGroup.add(blackHalfMesh);

            // 3. Thin Golden Inner Lip Trim on the Left (Dark) Half (clearly visible in the screenshot!)
            const goldLipGeo = buildHalfRingGeometry(
                2.76, 2.94, 2.99, 2.82,
                0.24, 0.62,
                splitAngleBottom, splitAngleTop + Math.PI * 2,
                facetsPerHalf
            );
            const goldLipMat = new THREE.MeshStandardMaterial({
                color: 0xd9a13b,
                roughness: 0.4,
                metalness: 0.5,
                flatShading: true,
                side: THREE.DoubleSide
            });
            const goldLipMesh = new THREE.Mesh(goldLipGeo, goldLipMat);
            bowlGroup.add(goldLipMesh);

            // 4. Dark Recessed Outer Base Cylinder under the wheel
            const baseCylGeo = new THREE.CylinderGeometry(4.15, 4.0, 0.5, 18);
            const baseCylMat = new THREE.MeshStandardMaterial({
                color: 0x1a1721,
                roughness: 0.9,
                flatShading: true
            });
            const baseCyl = new THREE.Mesh(baseCylGeo, baseCylMat);
            baseCyl.position.y = -0.12;
            bowlGroup.add(baseCyl);

            wheelGroup.add(bowlGroup);
        }

        function buildRotatingWheelInterior() {
            rotatingAssembly = new THREE.Group();
            wheelGroup.add(rotatingAssembly);

            // 1. Dark Recessed Pocket Track Floor
            const trackFloorGeo = new THREE.CylinderGeometry(2.88, 2.88, 0.18, 24);
            const trackFloorMat = new THREE.MeshStandardMaterial({
                color: 0x1d1b27,
                roughness: 0.85,
                metalness: 0.15,
                flatShading: true
            });
            const trackFloor = new THREE.Mesh(trackFloorGeo, trackFloorMat);
            trackFloor.position.y = 0.15;
            trackFloor.receiveShadow = true;
            rotatingAssembly.add(trackFloor);

            // 2. Inner Raised Dark Cone/Platter (between pockets and golden turret)
            const innerConeGeo = new THREE.CylinderGeometry(1.78, 1.92, 0.34, 24);
            const innerConeMat = new THREE.MeshStandardMaterial({
                color: 0x332e2c,
                roughness: 0.55,
                metalness: 0.2,
                flatShading: true
            });
            const innerCone = new THREE.Mesh(innerConeGeo, innerConeMat);
            innerCone.position.y = 0.25;
            innerCone.receiveShadow = true;
            rotatingAssembly.add(innerCone);

            // 3. 24 Raised Low-Poly Rectangular Pocket Frames (with dark hollow center slot!)
            pocketFrameMeshes = [];
            pocketLabelSprites = [];

            for (let i = 0; i < NUM_POCKETS; i++) {
                const pocket = POCKETS[i];
                const frameGroup = new THREE.Group();

                const frameColor = getPocketVisualFrameColor(i);
                const frameMat = new THREE.MeshStandardMaterial({
                    color: frameColor,
                    roughness: 0.48,
                    metalness: 0.1,
                    flatShading: true
                });

                // Construct a 3D rectangular pocket frame with an open dark center slot
                // Outer radial length: ~0.78, width: ~0.42, height: ~0.16
                const sideWallGeo = new THREE.BoxGeometry(0.76, 0.15, 0.085);
                const leftWall = new THREE.Mesh(sideWallGeo, frameMat);
                leftWall.position.set(0, 0.08, -0.155);
                leftWall.castShadow = true;
                leftWall.receiveShadow = true;
                frameGroup.add(leftWall);

                const rightWall = new THREE.Mesh(sideWallGeo, frameMat);
                rightWall.position.set(0, 0.08, 0.155);
                rightWall.castShadow = true;
                rightWall.receiveShadow = true;
                frameGroup.add(rightWall);

                // Inner & outer end caps of the rectangular pocket frame
                const endWallGeo = new THREE.BoxGeometry(0.11, 0.15, 0.395);
                const innerWall = new THREE.Mesh(endWallGeo, frameMat);
                innerWall.position.set(-0.33, 0.08, 0);
                innerWall.castShadow = true;
                frameGroup.add(innerWall);

                const outerWall = new THREE.Mesh(endWallGeo, frameMat);
                outerWall.position.set(0.33, 0.08, 0);
                outerWall.castShadow = true;
                frameGroup.add(outerWall);

                // Dark recessed pocket bottom inside the frame
                const slotBottomGeo = new THREE.BoxGeometry(0.56, 0.04, 0.22);
                const slotBottomMat = new THREE.MeshStandardMaterial({
                    color: 0x16141f,
                    roughness: 0.9
                });
                const slotBottom = new THREE.Mesh(slotBottomGeo, slotBottomMat);
                slotBottom.position.set(0, 0.03, 0);
                frameGroup.add(slotBottom);

                // Position around the ring at radius 2.34
                const r = 2.34;
                frameGroup.position.set(
                    Math.cos(pocket.localAngle) * r,
                    0.23,
                    Math.sin(pocket.localAngle) * r
                );
                frameGroup.rotation.y = -pocket.localAngle;

                // Store material reference so we can toggle Image Mode vs Classic Mode smoothly
                frameGroup.userData = {
                    pocketIndex: i,
                    coloredMeshes: [leftWall, rightWall, innerWall, outerWall]
                };

                rotatingAssembly.add(frameGroup);
                pocketFrameMeshes.push(frameGroup);

                // Number label sprite floating subtly over the inner lip of each pocket
                const sprite = createPocketNumberSprite(pocket.number, i === 0);
                const labelR = 1.92;
                sprite.position.set(
                    Math.cos(pocket.localAngle) * labelR,
                    0.52,
                    Math.sin(pocket.localAngle) * labelR
                );
                rotatingAssembly.add(sprite);
                pocketLabelSprites.push(sprite);
            }

            // 4. GLOWING GOLDEN CENTER TURRET (4-Spoked Cross Handle + Warm Bloom Light)
            const turretGroup = new THREE.Group();
            const goldTurretMat = new THREE.MeshStandardMaterial({
                color: 0xffdf6b,
                emissive: 0xffaa11,
                emissiveIntensity: 0.72,
                roughness: 0.22,
                metalness: 0.75,
                flatShading: true
            });

            // Central vertical pillar/stem
            const stemGeo = new THREE.CylinderGeometry(0.24, 0.38, 0.95, 12);
            const stemMesh = new THREE.Mesh(stemGeo, goldTurretMat);
            stemMesh.position.y = 0.72;
            stemMesh.castShadow = true;
            turretGroup.add(stemMesh);

            // Top cap knob
            const knobGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.18, 12);
            const knobMesh = new THREE.Mesh(knobGeo, goldTurretMat);
            knobMesh.position.y = 1.24;
            turretGroup.add(knobMesh);

            // 4 Golden Cross Spokes (exactly like the glowing golden cross in the screenshot!)
            const barGeo1 = new THREE.BoxGeometry(2.35, 0.13, 0.15);
            const bar1 = new THREE.Mesh(barGeo1, goldTurretMat);
            bar1.position.y = 1.05;
            bar1.castShadow = true;
            turretGroup.add(bar1);

            const barGeo2 = new THREE.BoxGeometry(0.15, 0.13, 2.35);
            const bar2 = new THREE.Mesh(barGeo2, goldTurretMat);
            bar2.position.y = 1.05;
            bar2.castShadow = true;
            turretGroup.add(bar2);

            // Invisible hit cylinder around turret so grabbing/flicking the golden cross is effortless
            const hitGeo = new THREE.CylinderGeometry(1.45, 1.45, 1.4, 12);
            const hitMat = new THREE.MeshBasicMaterial({ visible: false });
            turretMesh = new THREE.Mesh(hitGeo, hitMat);
            turretMesh.position.y = 0.85;
            turretGroup.add(turretMesh);

            // Intense Golden Point Light at the base of the turret (radiating onto the inner platter)
            turretPointLight = new THREE.PointLight(0xffb733, 2.6, 5.5, 1.8);
            turretPointLight.position.set(0, 0.78, 0);
            turretGroup.add(turretPointLight);

            // Soft additive golden glow sprite at the center turret (recreates the screenshot bloom!)
            const glowMat = new THREE.SpriteMaterial({
                map: createRadialGlowTexture(),
                color: 0xffd24c,
                transparent: true,
                blending: THREE.AdditiveBlending,
                depthWrite: false
            });
            glowSprite = new THREE.Sprite(glowMat);
            glowSprite.scale.set(2.45, 2.45, 1);
            glowSprite.position.set(-0.08, 0.72, 0.12);
            turretGroup.add(glowSprite);

            // Rotate turret slightly so the 4 spokes match the angle in the reference image
            turretGroup.rotation.y = 0.12;

            rotatingAssembly.add(turretGroup);
        }

        function buildSilverBall() {
            const ballGeo = new THREE.SphereGeometry(0.135, 20, 20);
            const ballMat = new THREE.MeshStandardMaterial({
                color: 0xf1f5f9,
                roughness: 0.14,
                metalness: 0.92
            });
            ballMesh = new THREE.Mesh(ballGeo, ballMat);
            ballMesh.castShadow = true;
            wheelGroup.add(ballMesh);
            updateBall3DPosition();
        }

        function buildVRLaserPointers() {
            // 1. Primary white/grey VR controller ray coming from top-center down to the wheel
            const laserMat = new THREE.LineBasicMaterial({
                color: 0xcbd5e1,
                transparent: true,
                opacity: 0.55
            });
            const points = [
                new THREE.Vector3(-0.35, 5.2, -1.8),
                new THREE.Vector3(-0.62, 0.45, -1.55)
            ];
            const laserGeo = new THREE.BufferGeometry().setFromPoints(points);
            vrLaserLine = new THREE.Line(laserGeo, laserMat);
            scene.add(vrLaserLine);

            // Subtle glowing cursor tip where the VR ray touches the wheel
            const dotGeo = new THREE.SphereGeometry(0.055, 10, 10);
            const dotMat = new THREE.MeshBasicMaterial({
                color: 0xfef08a,
                transparent: true,
                opacity: 0.8
            });
            vrLaserDot = new THREE.Mesh(dotGeo, dotMat);
            vrLaserDot.position.copy(points[1]);
            scene.add(vrLaserDot);

            // 2. Secondary subtle cyan/teal background ray on the upper right (matching the screenshot!)
            const secMat = new THREE.LineBasicMaterial({
                color: 0x38bdf8,
                transparent: true,
                opacity: 0.35
            });
            const secPoints = [
                new THREE.Vector3(2.5, 5.5, -3.5),
                new THREE.Vector3(3.35, 0.85, -1.85)
            ];
            const secGeo = new THREE.BufferGeometry().setFromPoints(secPoints);
            vrSecondaryLine = new THREE.Line(secGeo, secMat);
            scene.add(vrSecondaryLine);
        }

        function updateBall3DPosition() {
            if (!ballMesh) return;
            ballMesh.position.set(
                Math.cos(state.ballAngle) * state.ballRadius,
                state.ballHeight,
                Math.sin(state.ballAngle) * state.ballRadius
            );
        }

        function updateCameraPosition() {
            if (!camera) return;
            if (state.cameraMode === 'SCREENSHOT') {
                // High-angle oblique perspective matching the reference image
                const basePos = new THREE.Vector3(-0.35, 6.55, 4.95);
                basePos.x += Math.sin(camOrbitAzimuth) * 1.2;
                basePos.y += camOrbitElevation * 1.0;
                camera.position.copy(basePos);
                camera.lookAt(0.05, 0.05, -0.15);
            } else {
                // Top-Down Overhead View
                camera.position.set(0, 9.2, 0.01);
                camera.lookAt(0, 0, 0);
            }
        }

        // ============================================================================
        // 4. PHYSICS & SPIN SIMULATION LOOP
        // ============================================================================
        function forceRouletteJackpot() {
            if (casino.engine.remote) {
                if(!window.THREE || !renderer){casino.toast('The 3D wheel is unavailable.',true);return;}
                if(casino.engine.animationLock==='roulette' && state.remoteSpin){
                    casino.engine.rouletteRig(state.remoteSpin.roundId).then(result => {
                        if(state.remoteSpin){state.remoteSpin=result;state.forcedPocketIndex=result.index;}
                        else {state.settledPocketIndex=result.index;renderHistoryRibbon();updateBettingHUD();showResultBanner(result.number,result.number===0?'GREEN':result.number%2?'RED':'BLACK',result.wager,result.payout);}
                    }).catch(error=>casino.toast(error.message,true));return;
                }
                if(casino.busy())return;
                const prepared = getTotalActiveBet()>0 ? Promise.resolve() : casino.engine.rouletteBet(0,getChipIncrement());
                prepared.then(() => {state.remoteJackpot=true;triggerSpin();}).catch(error=>casino.toast(error.message,true));return;
            }
            if (!window.THREE || !renderer) { casino.toast('The 3D wheel is unavailable.', true); return; }
            if (casino.engine.lock && casino.engine.lock !== 'roulette') return;
            if (getTotalActiveBet() === 0) placeNumberBet(0);
            if (getTotalActiveBet() === 0) { casino.toast('Not enough chips to place a bet.', true); return; }
            const winningNumber = bestRouletteNumber(state.bets);
            state.forcedPocketIndex = POCKETS.findIndex(pocket => pocket.number === winningNumber);
            if (casino.engine.lock !== 'roulette') triggerSpin();
        }

        function triggerSpin(powerNormalized = 0.75, direction = 1) {
            if (casino.engine.remote && !state.remoteSpin) {
                if(casino.busy())return;
                casino.engine.rouletteSpin(Boolean(state.remoteJackpot)).then(result => {
                    state.remoteJackpot = false; state.remoteSpin = result; state.forcedPocketIndex = result.index;
                    triggerSpin(powerNormalized,direction);
                }).catch(error => {state.remoteJackpot=false;casino.toast(error.message,true);});return;
            }
            if (casino.busy()) return;

            if (casino.busy() || casino.view !== 'roulette') return;
            casino.engine.lock = 'roulette';
            casino.engine.active.pendingRoulette = true;
            casino.refresh();
            sfx.init();
            hideBanner();

            // Clamp power between 0.35 and 1.25
            const p = Math.max(0.35, Math.min(1.25, powerNormalized));

            // Wheel spins clockwise (or in flick direction), ball launches counter-clockwise on upper rim
            state.wheelAngularVel = direction * (2.6 + p * 2.8 + Math.random() * 0.6);
            state.ballAngularVel = -direction * (9.5 + p * 6.5 + Math.random() * 1.8);

            state.ballRadius = 2.93; // Upper sloped track lip
            state.ballHeight = 0.64;
            state.phase = 'ORBITING';
            state.lastDividerIndex = -1;

            document.getElementById('hint-text').textContent = 'Ball orbiting rim... Watch it drop into the pockets!';
        }

        function updatePhysics(dt) {
            // Clamp delta time to avoid jumps on tab switch
            const step = Math.min(dt, 0.05);

            // Charge spin power bar if user is holding the spin button
            if (state.isChargingSpin) {
                state.spinCharge = (state.spinCharge + step * 1.15) % 1.0;
                const pct = Math.round((0.25 + state.spinCharge * 0.75) * 100);
                document.getElementById('spin-power-bar').style.width = \`\${pct}%\`;
            }

            // 1. Rotate the inner wheel assembly
            if (!state.isDraggingTurret) {
                state.wheelAngle += state.wheelAngularVel * step;
                // Gentle wheel bearing friction
                state.wheelAngularVel *= Math.pow(0.992, step * 60);
                if (Math.abs(state.wheelAngularVel) < 0.005 && state.phase === 'IDLE') {
                    state.wheelAngularVel = 0;
                }
            }
            rotatingAssembly.rotation.y = -state.wheelAngle;

            // Subtle pulsing of the golden center turret light
            const pulse = 2.5 + Math.sin(performance.now() * 0.005) * 0.25;
            if (turretPointLight) turretPointLight.intensity = pulse;

            // 2. Ball state machine
            const sliceAngle = (Math.PI * 2) / NUM_POCKETS;

            if (state.phase === 'IDLE' || state.phase === 'SETTLED') {
                // Ball stays nestled inside its current pocket and rotates with the wheel!
                const pocket = POCKETS[state.settledPocketIndex];
                state.ballAngle = state.wheelAngle + pocket.localAngle;
                state.ballRadius = 2.34;
                state.ballHeight = 0.34;
                updateBall3DPosition();
            } else if (state.phase === 'ORBITING') {
                state.ballAngle += state.ballAngularVel * step;
                // Rim friction slows ball down
                state.ballAngularVel *= Math.pow(0.984, step * 60);

                // Slight radial wobble as it slows
                const speed = Math.abs(state.ballAngularVel);
                state.ballRadius = 2.86 + Math.min(0.08, speed * 0.008);
                state.ballHeight = 0.56 + Math.min(0.08, speed * 0.008);

                // When ball slows enough, gravity pulls it down the slope into the pocket ring
                if (speed < 4.6) {
                    state.phase = 'DROPPING';
                }
                updateBall3DPosition();
            } else if (state.phase === 'DROPPING') {
                state.ballAngle += state.ballAngularVel * step;

                // Relative angular velocity between ball and spinning wheel pockets
                let relVel = state.ballAngularVel - state.wheelAngularVel;
                relVel *= Math.pow(0.962, step * 60);
                state.ballAngularVel = state.wheelAngularVel + relVel;

                // Move radially inward toward pocket radius (2.34)
                state.ballRadius += (2.34 - state.ballRadius) * Math.min(1, step * 5.5);

                // Detect passing over pocket frame dividers for mechanical clack audio & bounce!
                let relAngle = (state.ballAngle - state.wheelAngle) % (Math.PI * 2);
                if (relAngle < 0) relAngle += Math.PI * 2;

                // Shift by initial pocket offset (-Math.PI/6)
                let normalizedAngle = (relAngle + Math.PI / 6) % (Math.PI * 2);
                if (normalizedAngle < 0) normalizedAngle += Math.PI * 2;

                const currentPocketIdx = Math.floor((normalizedAngle + sliceAngle * 0.5) / sliceAngle) % NUM_POCKETS;
                if (currentPocketIdx !== state.lastDividerIndex) {
                    state.lastDividerIndex = currentPocketIdx;
                    const clackStrength = Math.min(1.0, Math.abs(relVel) / 5.0);
                    sfx.playPocketClick(clackStrength);
                }

                // Vertical bounce off the pocket frame walls
                const bounceWave = Math.abs(Math.sin(normalizedAngle * NUM_POCKETS * 0.5));
                const bounceAmp = Math.min(0.18, Math.abs(relVel) * 0.025);
                state.ballHeight = 0.34 + bounceWave * bounceAmp;

                // Magnetic pocket capture force when relative speed is low
                const targetLocalAngle = POCKETS[state.forcedPocketIndex ?? currentPocketIdx].localAngle;
                const targetWorldAngle = state.wheelAngle + targetLocalAngle;
                let angleDiff = Math.atan2(
                    Math.sin(targetWorldAngle - state.ballAngle),
                    Math.cos(targetWorldAngle - state.ballAngle)
                );

                if (Math.abs(relVel) < 1.35) {
                    state.ballAngle += angleDiff * Math.min(1, step * 9.0);
                }

                if (Math.abs(relVel) < 0.22 && Math.abs(angleDiff) < 0.08) {
                    const winningIndex = state.forcedPocketIndex ?? currentPocketIdx;
                    state.settledPocketIndex = winningIndex;
                    state.ballAngle = state.wheelAngle + POCKETS[winningIndex].localAngle;
                    state.forcedPocketIndex = null;
                    state.phase = 'SETTLED';
                    sfx.playBallSettle();
                    evaluateSpinOutcome(winningIndex);
                }

                updateBall3DPosition();
            }
        }

        // ============================================================================
        // 5. BETTING, PAYOUTS & UI UPDATES
        // ============================================================================
        function getTotalActiveBet() {
            let sum = state.bets.RED + state.bets.BLACK + state.bets.GREEN + state.bets.ODD + state.bets.EVEN;
            for (const k in state.bets.numbers) {
                sum += state.bets.numbers[k];
            }
            return sum;
        }

        function getChipIncrement() {
            if (state.customBet) {
                try {
                    const amount = casino.engine.amount(Number(state.selectedChip));
                    if (amount > state.balance) throw new Error('Not enough chips for your custom bet. Lower it or visit the bank.');
                    return amount;
                } catch (error) { casino.toast(error.message, true); return 0; }
            }
            if (state.selectedChip === 'ALL') return state.balance;
            return Math.min(state.balance, Number(state.selectedChip));
        }

        function placeCategoryBet(category) {
            if (casino.engine.remote) {
                if (casino.busy()) return;
                const amount = getChipIncrement(); if (amount <= 0) return;
                casino.engine.rouletteBet(category, amount).then(() => { sfx.playChipSound(); updateBettingHUD(); }).catch(error => casino.toast(error.message,true)); return;
            }
            if (casino.busy()) return;
            const amount = getChipIncrement();
            if (amount <= 0) return;

            state.balance -= amount;
            state.bets[category] += amount;
            sfx.playChipSound();
            updateBettingHUD();
        }

        function placeNumberBet(pocketNum) {
            if (casino.engine.remote) {
                if (casino.busy()) return;
                const amount = getChipIncrement(); if (amount <= 0) return;
                casino.engine.rouletteBet(pocketNum, amount).then(() => { sfx.playChipSound(); updateBettingHUD(); renderNumberModalGrid(); }).catch(error => casino.toast(error.message,true)); return;
            }
            if (casino.busy()) return;
            const amount = getChipIncrement();
            if (amount <= 0) return;

            state.balance -= amount;
            state.bets.numbers[pocketNum] = (state.bets.numbers[pocketNum] || 0) + amount;
            sfx.playChipSound();
            updateBettingHUD();
            renderNumberModalGrid();
        }

        function clearAllBets() {
            if (casino.engine.remote) { if(casino.busy())return; casino.engine.rouletteClear().then(() => {updateBettingHUD();renderNumberModalGrid();}).catch(error=>casino.toast(error.message,true)); return; }
            if (casino.busy()) return;
            const refund = getTotalActiveBet();
            if (refund === 0) return;

            state.balance += refund;
            state.bets = { RED: 0, BLACK: 0, GREEN: 0, ODD: 0, EVEN: 0, numbers: {} };
            sfx.playChipSound();
            updateBettingHUD();
            renderNumberModalGrid();
        }

        function rebetLast() {
            if (casino.engine.remote) { if(casino.busy())return; casino.engine.rouletteRebet().then(() => {updateBettingHUD();renderNumberModalGrid();}).catch(error=>casino.toast(error.message,true)); return; }
            if (casino.busy()) return;
            if (!state.lastBets) return;

            // First refund any currently placed bets
            state.balance += getTotalActiveBet();
            state.bets = { RED: 0, BLACK: 0, GREEN: 0, ODD: 0, EVEN: 0, numbers: {} };

            // Calculate total needed
            let needed = state.lastBets.RED + state.lastBets.BLACK + state.lastBets.GREEN + state.lastBets.ODD + state.lastBets.EVEN;
            for (const k in state.lastBets.numbers) {
                needed += state.lastBets.numbers[k];
            }

            if (needed <= 0 || needed > state.balance) {
                updateBettingHUD();
                return;
            }

            state.balance -= needed;
            state.bets = JSON.parse(JSON.stringify(state.lastBets));
            sfx.playChipSound();
            updateBettingHUD();
            renderNumberModalGrid();
        }

        function evaluateSpinOutcome(winningIndex) {
            if (casino.engine.remote && state.remoteSpin) {
                const result=state.remoteSpin;state.remoteSpin=null;casino.engine.lock=null;casino.engine.active.pendingRoulette=false;
                renderHistoryRibbon();updateBettingHUD();renderNumberModalGrid();
                showResultBanner(result.number,result.number===0?'GREEN':result.number%2?'RED':'BLACK',result.wager,result.payout);
                document.getElementById('hint-text').textContent='Spin complete!';return;
            }
            const winningPocket = POCKETS[winningIndex];
            const num = winningPocket.number;

            // Snapshot current bets for Rebet button before evaluating
            const totalWagered = getTotalActiveBet();
            if (totalWagered > 0) {
                state.lastBets = JSON.parse(JSON.stringify(state.bets));
            }

            let totalPayout = 0;

            // 1. Straight-up number bet (24x payout)
            if (state.bets.numbers[num]) {
                totalPayout += state.bets.numbers[num] * 24;
            }

            // 2. Green Zero bet (24x payout)
            if (num === 0 && state.bets.GREEN > 0) {
                totalPayout += state.bets.GREEN * 24;
            }

            // 3. Red / Black bets (2x payout)
            // Note: In Image Mode, all 23 non-zero frames are visually red, so if the player bet on RED in Image Mode OR if it's an Odd/Red pocket, let's check:
            // To make both modes rewarding and clear:
            // Odd numbers (1, 3, 5..23) are RED & ODD; Even numbers (2, 4, 6..22) are BLACK/DARK & EVEN.
            // PLUS in Image Mode, if a user only bet on RED (because of the 23 red frames meme!) and didn't bet on BLACK, we still honour standard Odd=Red / Even=Dark OR give a bonus! Wait\u2014let's make Red win on Odd pockets (1,3,5...) and Black/Dark win on Even pockets (2,4,6...) consistently for fair 2x payout, and highlight the winning pocket in 3D!
            if (isRedPocket(num) && state.bets.RED > 0) {
                totalPayout += state.bets.RED * 2;
            }
            if (isBlackPocket(num) && state.bets.BLACK > 0) {
                totalPayout += state.bets.BLACK * 2;
            }

            // 4. Odd / Even bets (2x payout)
            if (num !== 0 && num % 2 === 1 && state.bets.ODD > 0) {
                totalPayout += state.bets.ODD * 2;
            }
            if (num !== 0 && num % 2 === 0 && state.bets.EVEN > 0) {
                totalPayout += state.bets.EVEN * 2;
            }

            state.balance += totalPayout;
            casino.engine.lock = null;
            casino.engine.active.pendingRoulette = false;
            if (totalWagered > 0) casino.engine.completeRound();
            casino.engine.record(\`\${casino.engine.active.name} \xB7 Roulette \${num}: wager \${totalWagered.toLocaleString()}, payout \${totalPayout.toLocaleString()}.\`);

            // Record in history ribbon
            const colorTag = num === 0 ? 'GREEN' : (isRedPocket(num) ? 'RED' : 'BLACK');
            state.history.unshift({ num, colorTag });
            if (state.history.length > 10) state.history.pop();
            renderHistoryRibbon();

            // Clear bets after spin resolution
            state.bets = { RED: 0, BLACK: 0, GREEN: 0, ODD: 0, EVEN: 0, numbers: {} };
            updateBettingHUD();
            renderNumberModalGrid();

            // Display result banner
            showResultBanner(num, colorTag, totalWagered, totalPayout);

            document.getElementById('hint-text').textContent = 'Spin complete! Flick the golden cross or press SPIN for next round.';
        }

        function showResultBanner(num, colorTag, wagered, payout) {
            const banner = document.getElementById('status-banner');
            const title = document.getElementById('banner-title');
            const sub = document.getElementById('banner-subtitle');
            const badge = document.getElementById('banner-badge');

            const labelMap = {
                GREEN: 'GREEN ZERO',
                RED: 'RED / ODD',
                BLACK: state.imageMode ? 'DARK SLOT / EVEN' : 'BLACK / EVEN'
            };

            title.textContent = \`POCKET \${num} (\${labelMap[colorTag]})\`;

            if (payout > 0) {
                const net = payout - wagered;
                badge.textContent = payout >= wagered * 10 ? 'JACKPOT WIN!' : 'WINNER!';
                badge.className = 'px-3 py-0.5 rounded-full text-xs font-extrabold uppercase tracking-widest bg-emerald-500/25 text-emerald-300';
                sub.textContent = \`+\${payout.toLocaleString()} CHIPS PAID (NET \${net >= 0 ? '+' : '\u2212'}\${Math.abs(net).toLocaleString()})\`;
                sub.className = 'text-xs sm:text-sm font-extrabold text-emerald-400';
                sfx.playWinSound(payout >= wagered * 10);
            } else if (wagered > 0) {
                badge.textContent = 'NO WIN';
                badge.className = 'px-3 py-0.5 rounded-full text-xs font-extrabold uppercase tracking-widest bg-rose-500/25 text-rose-300';
                sub.textContent = \`-\${wagered.toLocaleString()} CHIPS\`;
                sub.className = 'text-xs sm:text-sm font-bold text-rose-400';
                sfx.playLoseSound();
            } else {
                badge.textContent = 'FREE SPIN RESULT';
                badge.className = 'px-3 py-0.5 rounded-full text-xs font-extrabold uppercase tracking-widest bg-amber-500/20 text-amber-300';
                sub.textContent = 'Place chips below to bet on the next spin!';
                sub.className = 'text-xs sm:text-sm font-medium text-slate-300';
            }

            banner.classList.remove('opacity-0', 'scale-95');
            banner.classList.add('opacity-100', 'scale-100');
        }

        function hideBanner() {
            const banner = document.getElementById('status-banner');
            banner.classList.remove('opacity-100', 'scale-100');
            banner.classList.add('opacity-0', 'scale-95');
        }

        function renderHistoryRibbon() {
            const container = document.getElementById('history-ribbon');
            if (state.history.length === 0) {
                container.innerHTML = \`<span class="text-xs text-slate-500 italic">No spins yet</span>\`;
                return;
            }
            container.innerHTML = state.history.map((item, idx) => {
                const bg = item.colorTag === 'GREEN'
                    ? 'bg-emerald-600 border-emerald-300'
                    : (item.colorTag === 'RED' ? 'bg-red-600 border-red-300' : 'bg-zinc-800 border-zinc-400');
                const ring = idx === 0 ? 'ring-2 ring-amber-400 scale-110' : 'opacity-85';
                return \`<div class="w-6 h-6 rounded-full \${bg} border text-[11px] font-black text-white flex items-center justify-center shadow \${ring}">\${item.num}</div>\`;
            }).join('');
        }

        function updateBettingHUD() {
            casino.refresh();
            document.getElementById('balance-display').textContent = state.balance.toLocaleString();
            document.getElementById('current-bet-display').textContent = getTotalActiveBet().toLocaleString();

            const categories = ['RED', 'BLACK', 'GREEN', 'ODD', 'EVEN'];
            categories.forEach(cat => {
                const badge = document.getElementById(\`bet-badge-\${cat}\`);
                const val = state.bets[cat];
                if (val > 0) {
                    badge.textContent = \`\${val.toLocaleString()} \u20B5\`;
                    badge.classList.remove('hidden');
                } else {
                    badge.classList.add('hidden');
                }
            });

            // Sum of straight-up number bets
            let numSum = 0;
            for (const k in state.bets.numbers) numSum += state.bets.numbers[k];
            const numBadge = document.getElementById('bet-badge-NUMBERS');
            if (numSum > 0) {
                numBadge.textContent = \`\${numSum.toLocaleString()} \u20B5\`;
                numBadge.classList.remove('hidden');
            } else {
                numBadge.classList.add('hidden');
            }
        }

        function renderNumberModalGrid() {
            const grid = document.getElementById('number-grid');
            grid.innerHTML = POCKETS.map(p => {
                const num = p.number;
                const betVal = state.bets.numbers[num] || 0;
                const bgClass = num === 0
                    ? 'from-emerald-600 to-emerald-800 border-emerald-400/50'
                    : (num % 2 === 1
                        ? 'from-red-600 to-red-800 border-red-400/50'
                        : 'from-zinc-700 to-zinc-900 border-zinc-400/40');
                return \`
                    <button data-pocket-num="\${num}" class="pocket-num-btn relative rounded-xl bg-gradient-to-b \${bgClass} border p-2.5 flex flex-col items-center justify-center hover:brightness-125 active:scale-95 transition shadow">
                        <span class="text-sm font-black text-white">\${num}</span>
                        <span class="text-[9px] uppercase font-bold text-white/70">\${num === 0 ? 'ZERO' : (num % 2 === 1 ? 'RED/ODD' : 'DARK/EVEN')}</span>
                        \${betVal > 0 ? \`<span class="mt-1 px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black">\${betVal}</span>\` : ''}
                    </button>
                \`;
            }).join('');

            grid.querySelectorAll('.pocket-num-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const n = Number(btn.getAttribute('data-pocket-num'));
                    placeNumberBet(n);
                });
            });
        }

        function updatePocketFrameColors() {
            pocketFrameMeshes.forEach((frameGroup, i) => {
                const hex = getPocketVisualFrameColor(i);
                frameGroup.userData.coloredMeshes.forEach(mesh => {
                    mesh.material.color.setHex(hex);
                });
            });
        }

        // ============================================================================
        // 6. POINTER / VR LASER & TURRET FLICK INTERACTION
        // ============================================================================
        function setupInteractions() {
            const container = document.getElementById('canvas-container');

            function updateLaserFromEvent(clientX, clientY) {
                mouseNDC.x = (clientX / window.innerWidth) * 2 - 1;
                mouseNDC.y = -(clientY / window.innerHeight) * 2 + 1;

                raycaster.setFromCamera(mouseNDC, camera);
                const hitPoint = new THREE.Vector3();
                if (raycaster.ray.intersectPlane(interactivePlane, hitPoint)) {
                    // Clamp laser target to table area
                    hitPoint.x = Math.max(-5, Math.min(5, hitPoint.x));
                    hitPoint.z = Math.max(-5, Math.min(5, hitPoint.z));

                    const positions = vrLaserLine.geometry.attributes.position.array;
                    positions[0] = -0.35;
                    positions[1] = 5.2;
                    positions[2] = -1.8;
                    positions[3] = hitPoint.x;
                    positions[4] = 0.45;
                    positions[5] = hitPoint.z;
                    vrLaserLine.geometry.attributes.position.needsUpdate = true;

                    vrLaserDot.position.set(hitPoint.x, 0.46, hitPoint.z);
                }
            }

            container.addEventListener('pointerdown', (e) => {
                updateLaserFromEvent(e.clientX, e.clientY);
                raycaster.setFromCamera(mouseNDC, camera);

                // Check if user clicked on the Golden Center Turret to grab/flick it
                const hits = raycaster.intersectObject(turretMesh, true);
                if (hits.length > 0 && !casino.busy()) {
                    state.isDraggingTurret = true;
                    const hitPt = hits[0].point;
                    state.dragLastAngle = Math.atan2(hitPt.z, hitPt.x);
                    state.dragAngularVelSample = 0;
                    container.style.cursor = 'grabbing';
                    return;
                }

                // Otherwise allow subtle camera angle orbit
                isDraggingCamera = true;
                prevPointer.x = e.clientX;
                prevPointer.y = e.clientY;
            });

            window.addEventListener('pointermove', (e) => {
                updateLaserFromEvent(e.clientX, e.clientY);

                if (state.isDraggingTurret) {
                    raycaster.setFromCamera(mouseNDC, camera);
                    const hitPoint = new THREE.Vector3();
                    if (raycaster.ray.intersectPlane(interactivePlane, hitPoint)) {
                        const curAngle = Math.atan2(hitPoint.z, hitPoint.x);
                        let delta = Math.atan2(
                            Math.sin(curAngle - state.dragLastAngle),
                            Math.cos(curAngle - state.dragLastAngle)
                        );
                        state.wheelAngle -= delta;
                        state.dragAngularVelSample = -delta * 45;
                        state.dragLastAngle = curAngle;
                        sfx.playPocketClick(0.25);
                    }
                    return;
                }

                if (isDraggingCamera && state.cameraMode === 'SCREENSHOT') {
                    const dx = (e.clientX - prevPointer.x) * 0.005;
                    const dy = (e.clientY - prevPointer.y) * 0.005;
                    camOrbitAzimuth = Math.max(-0.8, Math.min(0.8, camOrbitAzimuth - dx));
                    camOrbitElevation = Math.max(-0.5, Math.min(0.8, camOrbitElevation + dy));
                    prevPointer.x = e.clientX;
                    prevPointer.y = e.clientY;
                    updateCameraPosition();
                }
            });

            window.addEventListener('pointerup', () => {
                if (state.isDraggingTurret) {
                    state.isDraggingTurret = false;
                    container.style.cursor = 'crosshair';
                    const flickSpeed = Math.abs(state.dragAngularVelSample);
                    const dir = state.dragAngularVelSample >= 0 ? 1 : -1;
                    const power = Math.max(0.45, Math.min(1.2, flickSpeed / 4.5));
                    triggerSpin(power, dir);
                }
                isDraggingCamera = false;
            });

            // UI Controls Wiring
            document.getElementById('mode-toggle-btn').addEventListener('click', () => {
                state.imageMode = !state.imageMode;
                const label = document.getElementById('mode-label');
                const dot = document.getElementById('mode-dot');
                if (state.imageMode) {
                    label.textContent = 'Image Mode (23 Red Frames / 1 Green)';
                    dot.className = 'w-2.5 h-2.5 rounded-full bg-red-500';
                } else {
                    label.textContent = 'Classic Mode (Red & Black Frames)';
                    dot.className = 'w-2.5 h-2.5 rounded-full bg-amber-400';
                }
                updatePocketFrameColors();
                sfx.playChipSound();
            });

            document.getElementById('camera-toggle-btn').addEventListener('click', () => {
                state.cameraMode = state.cameraMode === 'SCREENSHOT' ? 'TOPDOWN' : 'SCREENSHOT';
                document.getElementById('camera-label').textContent =
                    state.cameraMode === 'SCREENSHOT' ? 'View: Screenshot Angle' : 'View: Top-Down';
                updateCameraPosition();
            });

            document.getElementById('labels-toggle-btn').addEventListener('click', () => {
                state.showNumberLabels = !state.showNumberLabels;
                document.getElementById('labels-label').textContent =
                    state.showNumberLabels ? '# Numbers: ON' : '# Numbers: OFF';
                pocketLabelSprites.forEach(s => { s.visible = state.showNumberLabels; });
            });

            document.getElementById('audio-toggle-btn').addEventListener('click', () => {
                sfx.enabled = !sfx.enabled;
                document.getElementById('audio-label').textContent = sfx.enabled ? '\u{1F50A} SFX' : '\u{1F507} Muted';
            });

            // Chip Selector Buttons
            document.querySelectorAll('.chip-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    document.querySelectorAll('.chip-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    const val = btn.getAttribute('data-chip');
                    state.selectedChip = val === 'ALL' ? 'ALL' : Number(val);
                    state.customBet = false;
                    document.getElementById('roulette-custom-selected').textContent = 'Selected: ' + (val === 'ALL' ? 'All In' : Number(val).toLocaleString()) + ' chips per bet';
                    sfx.playChipSound();
                });
            });

            // Category Bet Buttons
            document.querySelectorAll('#roulette-controls [data-bet]').forEach(btn => {
                btn.addEventListener('click', () => {
                    const cat = btn.getAttribute('data-bet');
                    placeCategoryBet(cat);
                });
            });

            // Number Picker Modal
            const numModal = document.getElementById('number-modal');
            document.getElementById('open-number-modal-btn').addEventListener('click', () => {
                renderNumberModalGrid();
                numModal.classList.remove('hidden');
                numModal.classList.add('flex');
            });
            document.getElementById('close-number-modal').addEventListener('click', () => {
                numModal.classList.add('hidden');
                numModal.classList.remove('flex');
            });

            // Reset Chips, Clear, Rebet


            document.getElementById('clear-bets-btn').addEventListener('click', clearAllBets);
            document.getElementById('rebet-btn').addEventListener('click', rebetLast);

            // Hold & Release Spin Button
            const spinBtn = document.getElementById('spin-btn');
            const startCharge = (e) => {
                e.preventDefault();
                if (casino.busy()) return;
                if (casino.view !== 'roulette') return;
                state.isChargingSpin = true;
                state.spinCharge = 0;
                document.getElementById('spin-btn-label').textContent = 'RELEASE!';
            };
            const releaseCharge = (e) => {
                e.preventDefault();
                if (!state.isChargingSpin) return;
                state.isChargingSpin = false;
                const power = 0.35 + state.spinCharge * 0.9;
                document.getElementById('spin-power-bar').style.width = '0%';
                document.getElementById('spin-btn-label').textContent = 'SPIN WHEEL';
                triggerSpin(power, 1);
            };

            spinBtn.addEventListener('pointerdown', startCharge);
            window.addEventListener('pointerup', releaseCharge);

            // Keyboard Spacebar support for spinning
            window.addEventListener('keydown', (e) => {
                if (e.code === 'Space' && !e.repeat && !state.isChargingSpin) {
                    startCharge(e);
                }
            });
            window.addEventListener('keyup', (e) => {
                if (e.code === 'Space' && state.isChargingSpin) {
                    releaseCharge(e);
                }
            });

            // Responsive Resize
            window.addEventListener('resize', () => {
                if (!camera || !renderer) return;
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
        }

        // ============================================================================
        // 7. MAIN ANIMATION LOOP
        // ============================================================================
        let lastTime = performance.now();

        function animate(now) {
            requestAnimationFrame(animate);
            const dt = (now - lastTime) / 1000;
            lastTime = now;

            if (casino.view === 'roulette') {
                updatePhysics(dt);
                renderer.render(scene, camera);
            }
        }

        window.onload = function () {
            if (!window.THREE) {
                casino.toast('The 3D wheel needs an internet connection. Players, bank and 777 are available.', true);
                return;
            }
            build3DScene();
            setupInteractions();
            updateBettingHUD();
            lastTime = performance.now();
            animate(lastTime);
        };
    <\/script>
</body>
</html>`;(function(t){"use strict";let e="roulette-club-v1",u=["7","\u{1F48E}","BAR","\u{1F514}","\u{1F340}","\u{1F352}"],d=[50,25,20,15,10,5],p=[0,5,3,1,4,2,0,5,4,3,5,1],h=()=>({RED:0,BLACK:0,GREEN:0,ODD:0,EVEN:0,numbers:{}}),g=$=>["RED","BLACK","GREEN","ODD","EVEN"].reduce((v,S)=>v+$[S],0)+Object.values($.numbers).reduce((v,S)=>v+S,0),w=($,v=1e9)=>Number.isSafeInteger($)&&$>=0&&$<=v,k=Object.freeze({seven:Object.freeze({name:"\u4FDD\u5E95 777",factor:35,multiplier:50,reels:[0,6,0],symbol:"7 7 7"}),diamonds:Object.freeze({name:"\u4FDD\u5E95\u4E09\u94BB\u77F3",factor:18,multiplier:25,reels:[3,11,3],symbol:"\u{1F48E} \u{1F48E} \u{1F48E}"}),bars:Object.freeze({name:"\u4FDD\u5E95\u4E09 BAR",factor:14,multiplier:20,reels:[5,5,5],symbol:"BAR BAR BAR"})}),M=()=>({sharkDebt:0,bankInterestAt:null,sharkInterestAt:null,marketAvailableAt:0,cards:[],armedCardId:null}),I=$=>$===null||Number.isSafeInteger($)&&$>=0;function D($,v,S){if(v===0)return $;for(let A=0;A<S&&$<1e9;A++)$=Math.min(1e9,$+Math.ceil($*v/1e4));return $}function Z($){return w($.sharkDebt)&&I($.bankInterestAt)&&I($.sharkInterestAt)&&I($.marketAvailableAt)&&Array.isArray($.cards)&&$.cards.length<=50&&$.cards.every(v=>v&&typeof v.id=="string"&&Object.hasOwn(k,v.type)&&w(v.stake,1e6)&&v.stake>0)&&new Set($.cards.map(v=>v.id)).size===$.cards.length&&($.armedCardId===null||$.cards.some(v=>v.id===$.armedCardId))}function fe($){return $&&["RED","BLACK","GREEN","ODD","EVEN"].every(v=>w($[v]))&&$.numbers&&typeof $.numbers=="object"&&!Array.isArray($.numbers)&&Object.entries($.numbers).every(([v,S])=>/^(?:[0-9]|1[0-9]|2[0-3])$/.test(v)&&w(S))&&w(g($))}function se($,v){return{id:$,name:v,balance:1e3,debt:0,bets:h(),lastBets:null,history:[],pendingRoulette:!1,...M()}}class te{constructor(v,S,A=()=>Date.now(),{recoverRoulette:O=!0}={}){this.storage=v,this.now=A,this.random=S||(()=>{let G=new Uint32Array(1);return t.crypto.getRandomValues(G),G[0]/4294967296}),this.lock=null,this.storageWarning="",this.data={version:1,activeId:"alex",users:[se("alex","Alex"),se("jamie","Jamie"),se("taylor","Taylor")],ledger:[],loans:[]};try{let G=v&&v.getItem(e);if(G){let P=JSON.parse(G);if(Array.isArray(P.users)&&(P.users=P.users.map(C=>({...M(),...C}))),P.loans??=[],P.version!==1||!Array.isArray(P.users)||P.users.length<1||P.users.length>12||!Array.isArray(P.ledger)||!Array.isArray(P.loans)||P.loans.length>200||!P.loans.every(C=>this.validLoan(C,P.users))||new Set(P.loans.map(C=>C.id)).size!==P.loans.length||!P.users.some(C=>C.id===P.activeId)||new Set(P.users.map(C=>C.id)).size!==P.users.length||!P.users.every(C=>typeof C.id=="string"&&typeof C.name=="string"&&C.name.trim().length>0&&C.name.length<=24&&Number.isSafeInteger(C.balance)&&Math.abs(C.balance)<=1e9&&w(C.debt)&&Z(C)&&fe(C.bets)&&(C.lastBets===null||fe(C.lastBets))&&Array.isArray(C.history)))throw new Error("Invalid saved profiles");this.data=P,this.data.ledger=P.ledger.filter(C=>C&&typeof C.text=="string"&&typeof C.time=="string").slice(0,100);for(let C of P.users)delete C.bankRounds,delete C.sharkRounds,C.history=C.history.filter(ce=>ce&&w(ce.num,23)&&["GREEN","RED","BLACK"].includes(ce.colorTag)).slice(0,10),C.pendingRoulette&&O&&(C.balance+=g(C.bets),C.bets=h(),C.pendingRoulette=!1,this.record(`${C.name}: interrupted roulette stake refunded.`))}}catch{this.storageWarning="Saved profiles could not be read. This session starts with fresh local profiles."}this.accrueInterest(),this.save()}get active(){return this.data.users.find(v=>v.id===this.data.activeId)}get availableCredit(){return Math.max(0,1e5-this.active.debt)}get availableSharkCredit(){return Math.max(0,15e5-this.active.sharkDebt)}get canBorrowShark(){return!this.lock&&this.availableCredit===0&&this.active.balance<=0&&g(this.active.bets)===0&&this.availableSharkCredit>0}get armedCard(){return this.active.cards.find(v=>v.id===this.active.armedCardId)||null}ensureIdle(){if(this.lock)throw new Error("Wait for the current spin to finish.");this.accrueInterest()&&this.save()}amount(v,S=1e6){if(!Number.isSafeInteger(v)||v<=0||v>S)throw new Error("Enter a whole number from 1 to "+S.toLocaleString()+".");return v}save(){this.accrueInterest();try{this.storage&&this.storage.setItem(e,JSON.stringify(this.data))}catch{this.storageWarning="Browser storage is unavailable. Keep this page open to retain this session."}}record(v){this.data.ledger.unshift({text:v,time:new Date().toISOString()}),this.data.ledger=this.data.ledger.slice(0,100)}switchUser(v){if(this.ensureIdle(),!this.data.users.some(S=>S.id===v))throw new Error("Choose an existing player.");this.data.activeId=v,this.save()}addUser(v){if(this.ensureIdle(),v=String(v).trim(),!v||v.length>24)throw new Error("Use a player name with 1\u201324 characters.");if(this.data.users.length>=12)throw new Error("This table has room for 12 players.");if(this.data.users.some(A=>A.name.toLowerCase()===v.toLowerCase()))throw new Error("That player name is already taken.");let S=se(t.crypto.randomUUID(),v);return this.data.users.push(S),this.data.activeId=S.id,this.record(`${v} joined with 1,000 starter chips.`),this.save(),S}validLoan(v,S){return v&&typeof v.id=="string"&&typeof v.lenderId=="string"&&typeof v.borrowerId=="string"&&v.lenderId!==v.borrowerId&&typeof v.lenderName=="string"&&typeof v.borrowerName=="string"&&w(v.principal,1e6)&&v.principal>0&&w(v.balance)&&w(v.rateBps,1e4)&&w(v.periodMs,1440*6e4)&&v.periodMs>=6e4&&v.periodMs%6e4===0&&I(v.createdAt)&&I(v.interestAt)&&["pending","active","declined","cancelled","repaid"].includes(v.status)&&(!["pending","active"].includes(v.status)||[v.lenderId,v.borrowerId].every(A=>S.some(O=>O.id===A)))&&(v.status!=="active"||v.interestAt!==null&&v.balance>0)}offerLoan(v,S,A,O=10){this.ensureIdle();let G=this.active,P=this.data.users.find(ye=>ye.id===v),C=this.amount(S);if(!P||P===G)throw new Error("\u8BF7\u9009\u62E9\u53E6\u4E00\u4F4D\u501F\u6B3E\u73A9\u5BB6\u3002");let ce=Math.round(A*100);if(!Number.isFinite(A)||!w(ce,1e4)||Math.abs(A*100-ce)>1e-6)throw new Error("\u5229\u7387\u9700\u4E3A 0\u2013100%\uFF0C\u6700\u591A\u4E24\u4F4D\u5C0F\u6570\u3002");if(!w(O,1440)||O<1)throw new Error("\u8BA1\u606F\u5468\u671F\u9700\u4E3A 1\u20131,440 \u5206\u949F\u3002");if(C>G.balance)throw new Error("\u51FA\u501F\u4EBA\u7684\u4F59\u989D\u4E0D\u8DB3\u3002");if(this.data.loans=this.data.loans.filter(ye=>["pending","active"].includes(ye.status)||this.data.loans.indexOf(ye)<100),this.data.loans.length>=200)throw new Error("\u501F\u6B3E\u534F\u8BAE\u6570\u91CF\u5DF2\u8FBE\u4E0A\u9650\uFF0C\u8BF7\u5148\u5904\u7406\u5F85\u786E\u8BA4\u534F\u8BAE\u3002");let me={id:t.crypto.randomUUID(),lenderId:G.id,borrowerId:v,lenderName:G.name,borrowerName:P.name,principal:C,balance:C,rateBps:ce,periodMs:O*6e4,status:"pending",createdAt:this.now(),interestAt:null};return this.data.loans.unshift(me),this.record(`${G.name} \u2192 ${P.name}: \u53D1\u8D77\u501F\u6B3E\u534F\u8BAE ${C.toLocaleString()}\uFF0C\u6BCF ${O} \u5206\u949F ${A}%\uFF0C\u7B49\u5F85\u501F\u6B3E\u4EBA\u786E\u8BA4\u3002`),this.save(),me}respondLoan(v,S){this.ensureIdle();let A=this.data.loans.find(P=>P.id===v);if(!A||A.status!=="pending"||A.borrowerId!==this.active.id)throw new Error("\u53EA\u6709\u501F\u6B3E\u4EBA\u80FD\u786E\u8BA4\u8FD9\u4EFD\u5F85\u5904\u7406\u534F\u8BAE\u3002");if(!S){A.status="declined",this.record(`${A.borrowerName} \u62D2\u7EDD\u4E86 ${A.lenderName} \u7684\u501F\u6B3E\u534F\u8BAE\u3002`),this.save();return}let O=this.data.users.find(P=>P.id===A.lenderId),G=this.active;if(!O||O.balance<A.principal)throw new Error("\u51FA\u501F\u4EBA\u5F53\u524D\u4F59\u989D\u4E0D\u8DB3\uFF0C\u5C1A\u672A\u6263\u6B3E\u3002");if(G.balance+A.principal>1e9)throw new Error("\u501F\u6B3E\u4EBA\u94B1\u5305\u5DF2\u63A5\u8FD1\u4E0A\u9650\u3002");O.balance-=A.principal,G.balance+=A.principal,A.status="active",A.interestAt=this.now(),this.record(`${A.borrowerName} \u5DF2\u63A5\u53D7\u534F\u8BAE\uFF0C${A.lenderName} \u8F6C\u5165 ${A.principal.toLocaleString()}\u3002`),this.save()}cancelLoan(v){this.ensureIdle();let S=this.data.loans.find(A=>A.id===v);if(!S||S.status!=="pending"||S.lenderId!==this.active.id)throw new Error("\u53EA\u80FD\u64A4\u9500\u81EA\u5DF1\u53D1\u8D77\u7684\u5F85\u786E\u8BA4\u534F\u8BAE\u3002");S.status="cancelled",this.record(`${S.lenderName} \u64A4\u9500\u4E86\u7ED9 ${S.borrowerName} \u7684\u501F\u6B3E\u534F\u8BAE\u3002`),this.save()}repayLoan(v,S){this.ensureIdle();let A=this.data.loans.find(C=>C.id===v),O=this.amount(S,1e9);if(!A||A.status!=="active"||A.borrowerId!==this.active.id)throw new Error("\u53EA\u80FD\u507F\u8FD8\u81EA\u5DF1\u7684\u6709\u6548\u501F\u6B3E\u3002");let G=this.data.users.find(C=>C.id===A.lenderId),P=this.active;if(O>A.balance||O>P.balance)throw new Error("\u8FD8\u6B3E\u8D85\u8FC7\u6B20\u6B3E\u6216\u94B1\u5305\u4F59\u989D\u3002");if(!G||G.balance+O>1e9)throw new Error("\u51FA\u501F\u4EBA\u94B1\u5305\u5DF2\u63A5\u8FD1\u4E0A\u9650\u3002");P.balance-=O,G.balance+=O,A.balance-=O,A.balance===0&&(A.status="repaid",A.interestAt=null),this.record(`${P.name} \u2192 ${G.name}: \u507F\u8FD8\u73A9\u5BB6\u501F\u6B3E ${O.toLocaleString()}\u3002`),this.save()}deletePlayer(v){this.ensureIdle();let S=this.data.users.find(A=>A.id===v);if(!S)throw new Error("\u8BE5\u73A9\u5BB6\u4E0D\u5B58\u5728\u3002");if(this.data.users.length===1)throw new Error("\u81F3\u5C11\u4FDD\u7559\u4E00\u540D\u73A9\u5BB6\u3002");if(S.debt||S.sharkDebt||g(S.bets)||S.pendingRoulette||S.blackjack&&S.blackjack.phase!=="settled"||this.data.loans.some(A=>["pending","active"].includes(A.status)&&[A.lenderId,A.borrowerId].includes(v)))throw new Error("\u8BF7\u5148\u7ED3\u6E05\u6B20\u6B3E\u3001\u501F\u51FA\u6B3E\u3001\u5F85\u786E\u8BA4\u534F\u8BAE\u548C\u6E38\u620F\u4E0B\u6CE8\uFF0C\u518D\u5220\u9664\u73A9\u5BB6\u3002");this.data.users=this.data.users.filter(A=>A.id!==v),this.data.activeId===v&&(this.data.activeId=this.data.users[0].id),this.record(`\u5DF2\u5220\u9664\u73A9\u5BB6 ${S.name}\uFF0C\u5176\u94B1\u5305\u548C\u5361\u5305\u5DF2\u79FB\u9664\u3002`),this.save()}adminAdjust(v,S,A,O=""){this.ensureIdle();let G=this.data.users.find(ce=>ce.id===v),P=this.amount(A,1e9);if(!G||!["add","remove"].includes(S))throw new Error("\u8BF7\u9009\u62E9\u73A9\u5BB6\u53CA\u6709\u6548\u7684\u8C03\u6574\u65B9\u5F0F\u3002");if(typeof O!="string"||O.length>120)throw new Error("\u5907\u6CE8\u6700\u591A 120 \u4E2A\u5B57\u7B26\u3002");let C=S==="add"?P:-P;if(G.balance+C>1e9||G.balance+C<0)throw new Error("\u8C03\u6574\u540E\u4F59\u989D\u5FC5\u987B\u5728 0\u20131,000,000,000 \u4E4B\u95F4\u3002");G.balance+=C,this.record(`\u7BA1\u7406\u5458 \xB7 ${G.name} ${S==="add"?"\u589E\u52A0":"\u6263\u9664"} ${P.toLocaleString()} \u7B79\u7801${O.trim()?" \xB7 "+O.trim():""}\u3002`),this.save()}transfer(v,S){this.ensureIdle();let A=this.amount(S),O=this.active,G=this.data.users.find(P=>P.id===v);if(!G||G===O)throw new Error("Choose another player to receive the chips.");if(A>O.balance)throw new Error("Your wallet does not have enough chips.");if(G.balance+A>1e9)throw new Error("The receiving wallet has reached its chip limit.");O.balance-=A,G.balance+=A,this.record(`${O.name} \u2192 ${G.name}: ${A.toLocaleString()} chips transferred.`),this.save()}borrow(v){this.ensureIdle();let S=this.amount(v),A=this.active;if(S>this.availableCredit)throw new Error(`You can borrow up to ${this.availableCredit.toLocaleString()} more chips.`);if(A.balance+S>1e9)throw new Error("Your wallet has reached its chip limit.");A.balance+=S,A.debt===0&&(A.bankInterestAt=this.now()),A.debt+=S,this.record(`Bank \u2192 ${A.name}: borrowed ${S.toLocaleString()} chips.`),this.save()}repay(v){this.ensureIdle();let S=this.amount(v,1e9),A=this.active;if(S>A.debt)throw new Error("That amount is greater than your outstanding debt.");if(S>A.balance)throw new Error("Your wallet does not have enough chips to repay that amount.");A.balance-=S,A.debt-=S,A.debt===0&&(A.bankInterestAt=null),this.record(`${A.name} \u2192 Bank: repaid ${S.toLocaleString()} chips.`),this.save()}borrowShark(v){this.ensureIdle();let S=this.amount(v,15e5),A=this.active;if(!this.canBorrowShark)throw new Error("\u9AD8\u5229\u8D37\u4EC5\u5728\u94F6\u884C\u989D\u5EA6\u8017\u5C3D\u3001\u94B1\u5305 \u2264 0 \u4E14\u6CA1\u6709\u672A\u7ED3\u7B97\u4E0B\u6CE8\u65F6\u5F00\u653E\u3002");if(S>this.availableSharkCredit)throw new Error("\u9AD8\u5229\u8D37\u5269\u4F59\u989D\u5EA6\u4E0D\u8DB3\u3002");A.sharkDebt===0&&(A.sharkInterestAt=this.now()),A.balance+=S,A.sharkDebt+=S,this.record(`\u9AD8\u5229\u8D37 \u2192 ${A.name}: \u501F\u5165 ${S.toLocaleString()}\uFF1B\u6BCF 5 \u5206\u949F\u8BA1\u606F 10%\u3002`),this.save()}repayShark(v){this.ensureIdle();let S=this.amount(v,1e9),A=this.active;if(S>A.sharkDebt)throw new Error("\u8FD8\u6B3E\u4E0D\u80FD\u8D85\u8FC7\u9AD8\u5229\u8D37\u6B20\u6B3E\u3002");if(S>A.balance)throw new Error("\u94B1\u5305\u4F59\u989D\u4E0D\u8DB3\u4EE5\u8FD8\u6B3E\u3002");A.balance-=S,A.sharkDebt-=S,A.sharkDebt===0&&(A.sharkInterestAt=null),this.record(`${A.name} \u2192 \u9AD8\u5229\u8D37: \u507F\u8FD8 ${S.toLocaleString()}\u3002`),this.save()}completeRound(){this.accrueInterest()}accrueInterest(){let v=this.now(),S=!1,A=(O,G,P,C,ce,me)=>{if(O[G]<=0){O[P]!==null&&(O[P]=null,S=!0);return}if(O[P]===null){O[P]=v,S=!0;return}let ye=Math.floor((v-O[P])/C);if(ye<=0)return;let Xe=O[G];O[G]=D(Xe,ce,ye),O[P]+=ye*C,S=!0,O[G]!==Xe&&this.record(`${me} \xB7 ${ye} \u671F\u5229\u606F +${(O[G]-Xe).toLocaleString()}\uFF0C\u6B20\u6B3E ${O[G].toLocaleString()}\u3002`)};for(let O of this.data.users)A(O,"debt","bankInterestAt",18e5,50,O.name+" \xB7 \u94F6\u884C"),A(O,"sharkDebt","sharkInterestAt",3e5,1e3,O.name+" \xB7 \u9AD8\u5229\u8D37");for(let O of this.data.loans)O.status==="active"&&A(O,"balance","interestAt",O.periodMs,O.rateBps,O.borrowerName+" \u2192 "+O.lenderName);return S}buyCard(v,S){this.ensureIdle();let A=Object.hasOwn(k,v)?k[v]:null;if(!A)throw new Error("\u8BF7\u9009\u62E9\u6709\u6548\u7684\u9ED1\u5E02\u5361\u3002");let O=this.amount(S),G=O*A.factor,P=this.active;if(this.now()<P.marketAvailableAt)throw new Error("\u9ED1\u5E02\u8FDB\u8D27\u4E2D\uFF0C\u8BF7\u7B49\u5F85\u8D2D\u4E70\u51B7\u5374\u7ED3\u675F\u3002");if(P.cards.length>=50)throw new Error("\u6700\u591A\u6301\u6709 50 \u5F20\u5361\uFF0C\u8BF7\u5148\u4F7F\u7528\u5DF2\u6709\u5361\u3002");if(G+O>P.balance)throw new Error("\u4F59\u989D\u4E0D\u8DB3\uFF1A\u9700\u652F\u4ED8\u5361\u4EF7\uFF0C\u5E76\u7559\u8DB3\u4E00\u6B21\u7ED1\u5B9A\u4E0B\u6CE8\u7684\u7B79\u7801\u3002");let C={id:t.crypto.randomUUID(),type:v,stake:O};return P.balance-=G,P.cards.push(C),P.marketAvailableAt=this.now()+9e5,this.record(`${P.name} \xB7 \u9ED1\u5E02\u8D2D\u4E70${A.name}\uFF0C\u4EF7\u683C ${G.toLocaleString()}\uFF0C\u7ED1\u5B9A\u4E0B\u6CE8 ${O.toLocaleString()}\u3002`),this.save(),C}armCard(v){this.ensureIdle();let S=this.active.cards.find(A=>A.id===v);if(v!==null&&!S)throw new Error("\u4F60\u6CA1\u6709\u8FD9\u5F20\u5361\u3002");if(S&&S.stake>this.active.balance)throw new Error("\u4F59\u989D\u4E0D\u8DB3\u4EE5\u652F\u4ED8\u8BE5\u5361\u7ED1\u5B9A\u7684\u4E0B\u6CE8\u3002");this.active.armedCardId=v,this.save()}slotResult(v,S){if(!Array.isArray(v)||v.length!==3||!v.every(C=>w(C,11)))throw new Error("Invalid reels.");let A=v.map(C=>p[C]),O=A.filter(C=>C===5).length,G=A.filter(C=>C===0).length,P=A.every(C=>C===A[0])?d[A[0]]:G===2?5:O===2?2:O===1?1:0;return{reels:[...v],symbols:A,multiplier:P,wager:S,payout:S*P,net:S*(P-1)}}spinSlots(v,S=null,{allIn:A=!1,jackpot:O=!1}={}){this.ensureIdle();let G=this.amount(v),P=this.active,C=O?null:this.armedCard;if(C&&G!==C.stake)throw new Error("\u5DF2\u88C5\u5907\u5361\u7ED1\u5B9A\u4E0B\u6CE8 "+C.stake.toLocaleString()+"\uFF0C\u8BF7\u53D6\u6D88\u88C5\u5907\u540E\u66F4\u6539\u3002");if(A&&G!==P.balance)throw new Error("All In must wager your whole wallet.");if(G>P.balance)throw new Error("Your wallet does not have enough chips for this spin.");if(P.balance+G*49>1e9)throw new Error("Your wallet is too close to its chip limit.");let ce=O?[0,6,0]:C?k[C.type].reels:S===null?Array.from({length:3},()=>{let ye=this.random();if(!(ye>=0&&ye<1))throw new Error("Could not generate a valid spin. Try again.");return Math.floor(ye*p.length)}):S,me=this.slotResult(ce,G);return P.balance+=me.net,C&&(P.cards=P.cards.filter(ye=>ye.id!==C.id),P.armedCardId=null,me.cardName=k[C.type].name,this.record(`${P.name} \xB7 \u5DF2\u6D88\u8017${me.cardName}\uFF0C\u7ED1\u5B9A\u4E0B\u6CE8 ${G.toLocaleString()}\u3002`)),this.record(`${P.name} \xB7 777${S===null?"":" (forced jackpot)"}: wager ${G.toLocaleString()}, payout ${me.payout.toLocaleString()} (${me.symbols.map(ye=>u[ye]).join(" / ")}).`),this.completeRound(),this.lock="slots",this.save(),me}}te.symbols=u,te.triples=d,te.reelStrip=p,te.creditLimit=1e5,te.sharkLimit=15e5,te.cards=k,te.emptyBets=h,te.sumBets=g,te.storageKey=e,t.CasinoEngine=te})(globalThis);(function(t){"use strict";let e=c=>Math.min(c.rank,10),r=c=>c&&Number.isInteger(c.rank)&&c.rank>=1&&c.rank<=13&&Number.isInteger(c.suit)&&c.suit>=0&&c.suit<=3;function n(c){let u=0,d=0;for(let p of c)u+=p.rank===1?11:e(p),p.rank===1&&d++;for(;u>21&&d>0;)u-=10,d--;return{total:u,soft:d>0,blackjack:c.length===2&&u===21,bust:u>21}}function o(c){let u=[];for(let d=0;d<6;d++)for(let p=0;p<4;p++)for(let h=1;h<=13;h++)u.push({rank:h,suit:p});for(let d=u.length-1;d>0;d--){let p=c();if(!(p>=0&&p<1))throw new Error("The shoe could not be shuffled. Try again.");let h=Math.floor(p*(d+1));[u[d],u[h]]=[u[h],u[d]]}return u}function i(c,u){if(!c||c.version!==1||c.ownerId!==u||!["player","dealer","settled"].includes(c.phase)||typeof c.id!="string"||!Array.isArray(c.shoe)||c.shoe.length>312||!c.shoe.every(r)||!Array.isArray(c.dealer)||c.dealer.length<2||c.dealer.length>32||!c.dealer.every(r)||!Array.isArray(c.hands)||c.hands.length<1||c.hands.length>2||!Number.isInteger(c.activeHand)||c.activeHand<0||c.activeHand>c.hands.length||!c.hands.every(p=>Array.isArray(p.cards)&&p.cards.length>=2&&p.cards.length<=32&&p.cards.every(r)&&Number.isSafeInteger(p.bet)&&p.bet>=1&&p.bet<=2e6&&typeof p.split=="boolean"&&["playing","stood","bust"].includes(p.status))||c.phase==="player"&&c.hands[c.activeHand]?.status!=="playing")return!1;let d=new Map;for(let p of[...c.shoe,...c.dealer,...c.hands.flatMap(h=>h.cards)]){let h=p.rank+":"+p.suit;if(d.set(h,(d.get(h)||0)+1),d.get(h)>6)return!1}return!(c.phase==="settled"&&(!c.result||!Number.isSafeInteger(c.result.payout)||c.result.payout<0||!Number.isSafeInteger(c.result.wager)||!Array.isArray(c.result.hands)||c.result.hands.length!==c.hands.length||!c.result.hands.every(p=>p&&typeof p.label=="string"&&Number.isSafeInteger(p.payout)&&p.payout>=0)||!Number.isSafeInteger(c.result.net)))}class a{constructor(u,d={}){this.engine=u,this.shoeFactory=d.shoeFactory||(()=>o(()=>u.random()));for(let h of u.data.users)h.blackjack&&!i(h.blackjack,h.id)&&(h.blackjack=null,u.storageWarning="An unreadable saved blackjack hand was cleared. Your wallet and bank records were kept.");let p=u.data.users.find(h=>h.blackjack&&h.blackjack.phase!=="settled");p&&(u.data.activeId=p.id,u.lock="blackjack")}get round(){return this.engine.active.blackjack||null}get pending(){return!!(this.round&&this.round.phase!=="settled")}available(){let u=this.round,d=u?.hands[u.activeHand],p=!!(u&&u.phase==="player"&&d?.status==="playing"&&this.engine.lock==="blackjack");return{hit:p,stand:p,double:p&&d.cards.length===2&&this.engine.active.balance>=d.bet,split:p&&u.hands.length===1&&d.cards.length===2&&e(d.cards[0])===e(d.cards[1])&&this.engine.active.balance>=d.bet}}_playing(u){if(!this.available()[u])throw new Error(u==="double"||u==="split"?"That move needs an eligible two-card hand and enough chips.":"Wait until it is your turn.");return this.round}_draw(u){if(!u.shoe.length)throw new Error("The shoe is empty.");return u.shoe.pop()}_save(){this.engine.save()}start(u,{jackpot:d=!1}={}){this.engine.ensureIdle();let p=this.engine.amount(u),h=this.engine.active;if(p>h.balance)throw new Error("Not enough chips. Lower your bet or visit the bank.");if(h.balance+p*4>1e9)throw new Error("Your wallet is too close to its chip limit.");let g=this.round,w=d?o(()=>.5):g&&g.shoe.length>=52?[...g.shoe]:this.shoeFactory();if(!Array.isArray(w)||w.length<4||!w.every(r))throw new Error("The shoe could not be prepared.");if(d){let M=[1,10,13,9].map(I=>w.splice(w.findIndex(D=>D.rank===I),1)[0]);w.push(...M.reverse())}let k={version:1,id:t.crypto.randomUUID(),ownerId:h.id,phase:"player",shoe:w,dealer:[],hands:[{cards:[],bet:p,split:!1,status:"playing"}],activeHand:0,result:null};return k.hands[0].cards.push(this._draw(k)),k.dealer.push(this._draw(k)),k.hands[0].cards.push(this._draw(k)),k.dealer.push(this._draw(k)),h.balance-=p,h.blackjack=k,this.engine.lock="blackjack",n(k.hands[0].cards).blackjack||n(k.dealer).blackjack?this._settle():this._save(),k}_advance(){let u=this.round,d=u.hands.findIndex((p,h)=>h>=u.activeHand&&p.status==="playing");d===-1?(u.activeHand=u.hands.length,u.phase="dealer"):u.activeHand=d}hit(){let u=this._playing("hit"),d=u.hands[u.activeHand];d.cards.push(this._draw(u));let p=n(d.cards);return p.total>=21&&(d.status=p.bust?"bust":"stood",this._advance()),this._save(),u}stand(){let u=this._playing("stand");return u.hands[u.activeHand].status="stood",this._advance(),this._save(),u}double(){let u=this._playing("double"),d=u.hands[u.activeHand],p=this._draw(u);return this.engine.active.balance-=d.bet,d.bet*=2,d.cards.push(p),d.status=n(d.cards).bust?"bust":"stood",this._advance(),this._save(),u}split(){let u=this._playing("split"),d=u.hands[0];if(u.shoe.length<2)throw new Error("The shoe does not have enough cards to split.");let p={cards:[d.cards.pop()],bet:d.bet,split:!0,status:"playing"};d.split=!0,this.engine.active.balance-=d.bet,d.cards.push(this._draw(u)),p.cards.push(this._draw(u)),u.hands.push(p);let h=d.cards[0].rank===1;for(let g of u.hands)(h||n(g.cards).total===21)&&(g.status="stood");return this._advance(),this._save(),u}dealerStep(){let u=this.round;if(!u||u.phase!=="dealer"||this.engine.lock!=="blackjack")throw new Error("The dealer is not playing.");return u.hands.every(d=>n(d.cards).bust)||n(u.dealer).total>=17?this._settle():(u.dealer.push(this._draw(u)),n(u.dealer).total>=17?this._settle():(this._save(),u))}forceJackpot(u){if(!this.pending)return this.start(u,{jackpot:!0});let d=this.round;if(this.engine.lock!=="blackjack")throw new Error("Wait for the current game to finish.");let p=d.hands.reduce((g,w)=>g+Math.floor(w.bet*(!w.split&&w.cards.length===2?2.5:2)),0);if(this.engine.active.balance+p>1e9)throw new Error("Your wallet is too close to its chip limit.");d.shoe=o(()=>.5);let h=g=>d.shoe.splice(d.shoe.findIndex(w=>w.rank===g),1)[0];d.dealer=[h(10),h(9)];for(let g of d.hands)g.cards=g.cards.length===2?[h(1),h(13)]:[h(1),h(5),h(5)],g.status="stood";return d.activeHand=d.hands.length,this._settle()}_settle(){let u=this.round;if(u.phase==="settled")return u;let d=n(u.dealer),p=u.hands.map(w=>{let k=n(w.cards),M=!w.split&&k.blackjack,I=0,D="Dealer wins";return k.bust?D="Bust":d.blackjack?M&&(I=1,D="Push"):M?(I=2.5,D="Blackjack \xB7 3:2"):d.bust||k.total>d.total?(I=2,D=d.bust?"Dealer busts \xB7 You win":"You win"):k.total===d.total&&(I=1,D="Push"),{label:D,total:k.total,bet:w.bet,payout:Math.floor(w.bet*I)}}),h=u.hands.reduce((w,k)=>w+k.bet,0),g=p.reduce((w,k)=>w+k.payout,0);return u.result={hands:p,wager:h,payout:g,net:g-h,dealer:d.total},u.phase="settled",this.engine.active.balance+=g,this.engine.lock=null,this.engine.record(`${this.engine.active.name} \xB7 Blackjack: wager ${h.toLocaleString()}, payout ${g.toLocaleString()} (${p.map(w=>w.label).join(" / ")}).`),this.engine.completeRound(),this._save(),u}}a.score=n,a.makeShoe=o,t.CasinoBlackjack=a})(globalThis);var ee={};Gt(ee,{fromBuffer:()=>ub,fromUTF8String:()=>pb,isBase64:()=>hb,isBase64URL:()=>mb,toBase64:()=>db,toBuffer:()=>lb,toUTF8String:()=>fb,trimPadding:()=>Wp});var $l="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Vp="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",Kp=t=>{let e=typeof Uint8Array>"u"?[]:new Uint8Array(256),r=$l.length;for(let n=0;n<r;n++)e[t.charCodeAt(n)]=n;return e},ib=Kp($l),sb=Kp(Vp),ab=/^[-A-Za-z0-9\-_]*$/,cb=/^[-A-Za-z0-9+/]*={0,3}$/,or={};or.toArrayBuffer=(t,e)=>{let r=t.length,n=t.length*.75,o,i=0,a,c,u,d;t[t.length-1]==="="&&(n--,t[t.length-2]==="="&&n--);let p=new ArrayBuffer(n),h=new Uint8Array(p),g=e?sb:ib;for(o=0;o<r;o+=4)a=g[t.charCodeAt(o)],c=g[t.charCodeAt(o+1)],u=g[t.charCodeAt(o+2)],d=g[t.charCodeAt(o+3)],h[i++]=a<<2|c>>4,h[i++]=(c&15)<<4|u>>2,h[i++]=(u&3)<<6|d&63;return p};or.fromArrayBuffer=(t,e)=>{let r=new Uint8Array(t),n,o="",i=r.length,a=e?Vp:$l;for(n=0;n<i;n+=3)o+=a[r[n]>>2],o+=a[(r[n]&3)<<4|r[n+1]>>4],o+=a[(r[n+1]&15)<<2|r[n+2]>>6],o+=a[r[n+2]&63];let c=i%3;return c===2?o=o.substring(0,o.length-1)+(e?"":"="):c===1&&(o=o.substring(0,o.length-2)+(e?"":"==")),o};or.toString=(t,e)=>new TextDecoder().decode(or.toArrayBuffer(t,e));or.fromString=(t,e)=>or.fromArrayBuffer(new TextEncoder().encode(t),e);or.validate=(t,e)=>{if(!(typeof t=="string"||t instanceof String))return!1;try{return e?ab.test(t):cb.test(t)}catch{return!1}};or.base64=or;var _r=or;function lb(t,e="base64url"){let r=_r.toArrayBuffer(t,e==="base64url");return new Uint8Array(r)}function ub(t,e="base64url"){let r=new Uint8Array(t);return _r.fromArrayBuffer(r.buffer,e==="base64url")}function db(t){let e=_r.toArrayBuffer(t,!0);return _r.fromArrayBuffer(e)}function pb(t){return _r.fromString(t,!0)}function fb(t){return _r.toString(t,!0)}function hb(t){return _r.validate(t,!1)}function mb(t){return t=Wp(t),_r.validate(t,!0)}function Wp(t){return t.replace(/=/g,"")}var Ye={};Gt(Ye,{decodeFirst:()=>Ob,encode:()=>Db});function Zo(t,e,r){if(e<24)return[e,1];let n=t.byteLength-r-1,o=new DataView(t.buffer,r+1),i,a=0;switch(e){case 24:{n>0&&(i=o.getUint8(0),a=2);break}case 25:{n>1&&(i=o.getUint16(0,!1),a=3);break}case 26:{n>3&&(i=o.getUint32(0,!1),a=5);break}case 27:{if(n>7){let c=o.getBigUint64(0,!1);if(c>=24n&&c<=Number.MAX_SAFE_INTEGER)return[Number(c),9]}break}}if(i&&i>=24)return[i,a];throw new Error("Length not supported or not well formed")}var za=0,es=1,Vl=2,Kl=3,Wl=4,Fl=5,zl=6,Fp=7;function ir(t,e){let r=t<<5;if(e<0)throw new Error("CBOR Data Item argument must not be negative");let n;if(typeof e=="number"){if(!Number.isInteger(e))throw new Error("CBOR Data Item argument must be an integer");n=BigInt(e)}else n=e;if(t==es){if(n==0n)throw new Error("CBOR Data Item argument cannot be zero when negative");n=n-1n}if(n>18446744073709551615n)throw new Error("CBOR number out of range");let o=new Uint8Array(8);return new DataView(o.buffer).setBigUint64(0,n,!1),n<=23?[r|o[7]]:n<=255?[r|24,o[7]]:n<=65535?[r|25,...o.slice(6)]:n<=4294967295?[r|26,...o.slice(4)]:[r|27,...o]}var ts=class{constructor(e,r){Object.defineProperty(this,"tagId",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"tagValue",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.tagId=e,this.tagValue=r}get tag(){return this.tagId}get value(){return this.tagValue}};function zp(t,e,r){return Zo(t,e,r)}function gb(t,e,r){let[n,o]=zp(t,e,r);return[-n-1,o]}function qp(t,e,r){let[n,o]=Zo(t,e,r),i=r+o;return[new Uint8Array(t.buffer.slice(i,i+n)),o+n]}var yb=new TextDecoder;function bb(t,e,r){let[n,o]=qp(t,e,r);return[yb.decode(n),o]}function wb(t,e,r){if(e===0)return[[],1];let[n,o]=Zo(t,e,r),i=o,a=[];for(let c=0;c<n;c++){if(t.byteLength-r-i<=0)throw new Error("array is not supported or well formed");let[d,p]=Fn(t,r+i);a.push(d),i+=p}return[a,i]}var qa="Map is not supported or well formed";function xb(t,e,r){if(e===0)return[new Map,1];let[n,o]=Zo(t,e,r),i=o,a=new Map;for(let c=0;c<n;c++){let u=t.byteLength-r-i;if(u<=0)throw new Error(qa);let[d,p]=Fn(t,r+i);if(i+=p,u-=p,u<=0)throw new Error(qa);if(typeof d!="string"&&typeof d!="number")throw new Error(qa);if(a.has(d))throw new Error(qa);let[h,g]=Fn(t,r+i);i+=g,a.set(d,h)}return[a,i]}function vb(t,e){if(e+3>t.byteLength)throw new Error("CBOR stream ended before end of Float 16");let r=t.getUint16(e+1,!1);if(r==31744)return[1/0,3];if(r==32256)return[NaN,3];if(r==64512)return[-1/0,3];throw new Error("Float16 data is unsupported")}function Ab(t,e){if(e+5>t.byteLength)throw new Error("CBOR stream ended before end of Float 32");return[t.getFloat32(e+1,!1),5]}function Eb(t,e){if(e+9>t.byteLength)throw new Error("CBOR stream ended before end of Float 64");return[t.getFloat64(e+1,!1),9]}function Sb(t,e,r){let[n,o]=Zo(t,e,r),[i,a]=Fn(t,r+o);return[new ts(n,i),o+a]}function Fn(t,e){if(e>=t.byteLength)throw new Error("CBOR stream ended before tag value");let r=t.getUint8(e),n=r>>5,o=r&31;switch(n){case za:return zp(t,o,e);case es:return gb(t,o,e);case Vl:return qp(t,o,e);case Kl:return bb(t,o,e);case Wl:return wb(t,o,e);case Fl:return xb(t,o,e);case zl:return Sb(t,o,e);case Fp:switch(o){case 20:return[!1,1];case 21:return[!0,1];case 22:return[null,1];case 23:return[void 0,1];case 25:return vb(t,e);case 26:return Ab(t,e);case 27:return Eb(t,e)}}throw new Error(`Unsupported or not well formed at ${e}`)}function kb(t){return t===!0?245:t===!1?244:t===null?246:247}function Cb(t){if(Math.fround(t)==t||!Number.isFinite(t)||Number.isNaN(t)){let e=new Uint8Array(5);return e[0]=250,new DataView(e.buffer).setFloat32(1,t,!1),e}else{let e=new Uint8Array(9);return e[0]=251,new DataView(e.buffer).setFloat64(1,t,!1),e}}function Tb(t){return typeof t=="number"?Number.isSafeInteger(t)?t<0?ir(es,Math.abs(t)):ir(za,t):[Cb(t)]:t<0n?ir(es,t*-1n):ir(za,t)}var Ib=new TextEncoder;function _b(t,e){e.push(...ir(Kl,t.length)),e.push(Ib.encode(t))}function Bb(t,e){e.push(...ir(Vl,t.length)),e.push(t)}function Rb(t,e){e.push(...ir(Wl,t.length));for(let r of t)rs(r,e)}function Mb(t,e){e.push(new Uint8Array(ir(Fl,t.size)));for(let[r,n]of t.entries())rs(r,e),rs(n,e)}function Pb(t,e){e.push(...ir(zl,t.tag)),rs(t.value,e)}function rs(t,e){if(typeof t=="boolean"||t===null||t==null){e.push(kb(t));return}if(typeof t=="number"||typeof t=="bigint"){e.push(...Tb(t));return}if(typeof t=="string"){_b(t,e);return}if(t instanceof Uint8Array){Bb(t,e);return}if(Array.isArray(t)){Rb(t,e);return}if(t instanceof Map){Mb(t,e);return}if(t instanceof ts){Pb(t,e);return}throw new Error("Not implemented")}function ql(t,e){if(t.byteLength===0||t.byteLength<=e||e<0)throw new Error("No data");return t instanceof Uint8Array?Fn(new DataView(t.buffer),e):t instanceof ArrayBuffer?Fn(new DataView(t),e):Fn(t,e)}function Xl(t){let e=[];rs(t,e);let r=0;for(let i of e)typeof i=="number"?r+=1:r+=i.length;let n=new Uint8Array(r),o=0;for(let i of e)typeof i=="number"?(n[o]=i,o+=1):(n.set(i,o),o+=i.length);return n}function Ob(t){let e=new Uint8Array(t),r=ql(e,0),[n]=r;return n}function Db(t){return Xl(t)}var ar={};Gt(ar,{digest:()=>Qp,getRandomValues:()=>Zp,verify:()=>oy});function Xp(t){let e=t.get(q.kty);return Xa(e)&&e===Je.OKP}function on(t){let e=t.get(q.kty);return Xa(e)&&e===Je.EC2}function ei(t){let e=t.get(q.kty);return Xa(e)&&e===Je.RSA}function Yp(t){let e=t.get(q.kty);return Xa(e)&&e===Je.AKP}var q;(function(t){t[t.kty=1]="kty",t[t.alg=3]="alg",t[t.crv=-1]="crv",t[t.x=-2]="x",t[t.y=-3]="y",t[t.n=-1]="n",t[t.e=-2]="e",t[t.pub=-1]="pub"})(q||(q={}));var Je;(function(t){t[t.OKP=1]="OKP",t[t.EC2=2]="EC2",t[t.RSA=3]="RSA",t[t.AKP=7]="AKP"})(Je||(Je={}));function Xa(t){return Object.values(Je).indexOf(t)>=0}var Ke;(function(t){t[t.P256=1]="P256",t[t.P384=2]="P384",t[t.P521=3]="P521",t[t.ED25519=6]="ED25519",t[t.SECP256K1=8]="SECP256K1"})(Ke||(Ke={}));function Jp(t){return Object.values(Ke).indexOf(t)>=0}var U;(function(t){t[t.ES256=-7]="ES256",t[t.EdDSA=-8]="EdDSA",t[t.ES384=-35]="ES384",t[t.ES512=-36]="ES512",t[t.PS256=-37]="PS256",t[t.PS384=-38]="PS384",t[t.PS512=-39]="PS512",t[t.ES256K=-47]="ES256K",t[t.ML_DSA_44=-48]="ML_DSA_44",t[t.ML_DSA_65=-49]="ML_DSA_65",t[t.ML_DSA_87=-50]="ML_DSA_87",t[t.RS256=-257]="RS256",t[t.RS384=-258]="RS384",t[t.RS512=-259]="RS512",t[t.RS1=-65535]="RS1"})(U||(U={}));function Et(t){return Object.values(U).indexOf(t)>=0}function Ya(t){return[U.ML_DSA_44,U.ML_DSA_65,U.ML_DSA_87].indexOf(t)>=0}function sn(t){if([U.RS1].indexOf(t)>=0)return"SHA-1";if([U.ES256,U.PS256,U.RS256].indexOf(t)>=0)return"SHA-256";if([U.ES384,U.PS384,U.RS384].indexOf(t)>=0)return"SHA-384";if([U.ES512,U.PS512,U.RS512,U.EdDSA].indexOf(t)>=0)return"SHA-512";throw new Error(`Could not map COSE alg value of ${t} to a WebCrypto hash alg name`)}var ns;function it(){return new Promise((e,r)=>{if(ns)return e(ns);let n=jb.stubThisGlobalThisCrypto();return n?(ns=n,e(ns)):r(new Yl)})}var Yl=class extends Error{constructor(){super("An instance of the Crypto API could not be located"),this.name="MissingWebCrypto"}},jb={stubThisGlobalThisCrypto:()=>globalThis.crypto,setCachedCrypto:t=>{ns=t}};async function Qp(t,e){let r=await it(),n=sn(e),o=await r.subtle.digest(n,t);return new Uint8Array(o)}async function Zp(t){return(await it()).getRandomValues(t),t}function Ja(t){let e=F.toHex(t);return[e.slice(0,8),e.slice(8,12),e.slice(12,16),e.slice(16,20),e.slice(20,32)].join("-")}function ti(t){let e=Ye.decodeFirst(t),r=Uint8Array.from([4]),n=e.get(q.x),o=e.get(q.y);if(!n)throw new Error("COSE public key was missing x");return o?F.concat([r,n,o]):F.concat([r,n])}function ef(t){return Hb.stubThis(Ye.decodeFirst(t))}var Hb={stubThis:t=>t};function Qa(t){let e=ee.toUTF8String(t),r=JSON.parse(e);return Ub.stubThis(r)}var Ub={stubThis:t=>t};function sr(t){return Gb.stubThis(Ye.decodeFirst(t))}var Gb={stubThis:t=>t};async function Za(){let t=new Uint8Array(32);return await ar.getRandomValues(t),$b.stubThis(t)}var $b={stubThis:t=>t};async function tf(){let t=new Uint8Array(32);return await ar.getRandomValues(t),Vb.stubThis(t)}var Vb={stubThis:t=>t};var pr={};Gt(pr,{Any:()=>lr,BaseBlock:()=>_e,BaseStringBlock:()=>as,BitString:()=>Kt,BmpString:()=>Qn,Boolean:()=>qn,CharacterString:()=>ao,Choice:()=>oi,Constructed:()=>Be,DATE:()=>ps,DEFAULT_MAX_CONTENT_LENGTH:()=>hf,DEFAULT_MAX_DEPTH:()=>pf,DEFAULT_MAX_NODES:()=>ff,DateTime:()=>hs,Duration:()=>ms,EndOfContent:()=>cs,Enumerated:()=>Xn,GeneralString:()=>so,GeneralizedTime:()=>co,GraphicString:()=>io,HexBlock:()=>dr,IA5String:()=>oo,Integer:()=>Nr,Null:()=>$t,NumericString:()=>eo,ObjectIdentifier:()=>Yn,OctetString:()=>Vt,Primitive:()=>Pr,PrintableString:()=>to,RawData:()=>tu,RelativeObjectIdentifier:()=>Jn,Repeated:()=>lo,Sequence:()=>We,Set:()=>Qe,TIME:()=>gs,TeletexString:()=>ro,TimeOfDay:()=>fs,UTCTime:()=>ln,UniversalString:()=>Zn,Utf8String:()=>kt,ValueBlock:()=>De,VideotexString:()=>no,ViewWriter:()=>ni,VisibleString:()=>cn,compareSchema:()=>Rr,fromBER:()=>Dr,verifySchema:()=>g0});var ae=Fa(Ql());function zn(t,e){let r=0;if(t.length===1)return t[0];for(let n=t.length-1;n>=0;n--)r+=t[t.length-1-n]*Math.pow(2,e*n);return r}function an(t,e,r=-1){let n=r,o=t,i=0,a=Math.pow(2,e);for(let c=1;c<8;c++){if(t<a){let u;if(n<0)u=new ArrayBuffer(c),i=c;else{if(n<c)return new ArrayBuffer(0);u=new ArrayBuffer(n),i=n}let d=new Uint8Array(u);for(let p=c-1;p>=0;p--){let h=Math.pow(2,p*e);d[i-p-1]=Math.floor(o/h),o-=d[i-p-1]*h}return u}a*=Math.pow(2,e)}return new ArrayBuffer(0)}function rc(...t){let e=0,r=0;for(let i of t)e+=i.length;let n=new ArrayBuffer(e),o=new Uint8Array(n);for(let i of t)o.set(i,r),r+=i.length;return o}function Zl(){let t=new Uint8Array(this.valueHex);if(this.valueHex.byteLength>=2){let c=t[0]===255&&t[1]&128,u=t[0]===0&&(t[1]&128)===0;(c||u)&&this.warnings.push("Needlessly long format")}let e=new ArrayBuffer(this.valueHex.byteLength),r=new Uint8Array(e);for(let c=0;c<this.valueHex.byteLength;c++)r[c]=0;r[0]=t[0]&128;let n=zn(r,8),o=new ArrayBuffer(this.valueHex.byteLength),i=new Uint8Array(o);for(let c=0;c<this.valueHex.byteLength;c++)i[c]=t[c];return i[0]&=127,zn(i,8)-n}function rf(t){let e=t<0?t*-1:t,r=128;for(let n=1;n<8;n++){if(e<=r){if(t<0){let a=r-e,c=an(a,8,n),u=new Uint8Array(c);return u[0]|=128,c}let o=an(e,8,n),i=new Uint8Array(o);if(i[0]&128){let a=o.slice(0),c=new Uint8Array(a);o=new ArrayBuffer(o.byteLength+1),i=new Uint8Array(o);for(let u=0;u<a.byteLength;u++)i[u+1]=c[u];i[0]=0}return o}r*=Math.pow(2,8)}return new ArrayBuffer(0)}function nf(t,e){if(t.byteLength!==e.byteLength)return!1;let r=new Uint8Array(t),n=new Uint8Array(e);for(let o=0;o<r.length;o++)if(r[o]!==n[o])return!1;return!0}function st(t,e){let r=t.toString(10);if(e<r.length)return"";let n=e-r.length,o=Array.from({length:n});for(let a=0;a<n;a++)o[a]="0";return o.join("").concat(r)}var av=Math.log(2);function nc(){if(typeof BigInt>"u")throw new Error("BigInt is not defined. Your environment doesn't implement BigInt.")}function ru(t){let e=0,r=0;for(let o=0;o<t.length;o++){let i=t[o];e+=i.byteLength}let n=new Uint8Array(e);for(let o=0;o<t.length;o++){let i=t[o];n.set(new Uint8Array(i),r),r+=i.byteLength}return n.buffer}function Or(t,e,r,n){return e instanceof Uint8Array?e.byteLength?r<0?(t.error="Wrong parameter: inputOffset less than zero",!1):n<0?(t.error="Wrong parameter: inputLength less than zero",!1):e.byteLength-r-n<0?(t.error="End of input reached before message was fully decoded (inconsistent offset and length values)",!1):!0:(t.error="Wrong parameter: inputBuffer has zero length",!1):(t.error="Wrong parameter: inputBuffer must be 'Uint8Array'",!1)}var ni=class{constructor(){this.items=[]}write(e){this.items.push(e)}final(){return ru(this.items)}},os=[new Uint8Array([1])],of="0123456789",eu="name",sf="valueHexView",Qb="isHexOnly",Zb="idBlock",e0="tagClass",t0="tagNumber",r0="isConstructed",n0="fromBER",o0="toBER",i0="local",at="",ur=new ArrayBuffer(0),bc=new Uint8Array(0),ss="EndOfContent",cf="OCTET STRING",lf="BIT STRING";function dr(t){var e;return e=class extends t{get valueHex(){return this.valueHexView.slice().buffer}set valueHex(n){this.valueHexView=new Uint8Array(n)}constructor(...n){var o;super(...n);let i=n[0]||{};this.isHexOnly=(o=i.isHexOnly)!==null&&o!==void 0?o:!1,this.valueHexView=i.valueHex?ae.BufferSourceConverter.toUint8Array(i.valueHex):bc}fromBER(n,o,i,a){let c=n instanceof ArrayBuffer?new Uint8Array(n):n;if(!Or(this,c,o,i))return-1;let u=o+i;return this.valueHexView=c.subarray(o,u),this.valueHexView.length?(this.blockLength=i,u):(this.warnings.push("Zero buffer length"),o)}toBER(n=!1){return this.isHexOnly?n?new ArrayBuffer(this.valueHexView.byteLength):this.valueHexView.byteLength===this.valueHexView.buffer.byteLength?this.valueHexView.buffer:this.valueHexView.slice().buffer:(this.error="Flag 'isHexOnly' is not set, abort",ur)}toJSON(){return{...super.toJSON(),isHexOnly:this.isHexOnly,valueHex:ae.Convert.ToHex(this.valueHexView)}}},e.NAME="hexBlock",e}var Mr=class{static blockName(){return this.NAME}get valueBeforeDecode(){return this.valueBeforeDecodeView.slice().buffer}set valueBeforeDecode(e){this.valueBeforeDecodeView=new Uint8Array(e)}constructor({blockLength:e=0,error:r=at,warnings:n=[],valueBeforeDecode:o=bc}={}){this.blockLength=e,this.error=r,this.warnings=n,this.valueBeforeDecodeView=ae.BufferSourceConverter.toUint8Array(o)}toJSON(){return{blockName:this.constructor.NAME,blockLength:this.blockLength,error:this.error,warnings:this.warnings,valueBeforeDecode:ae.Convert.ToHex(this.valueBeforeDecodeView)}}};Mr.NAME="baseBlock";var De=class extends Mr{fromBER(e,r,n,o){throw TypeError("User need to make a specific function in a class which extends 'ValueBlock'")}toBER(e,r){throw TypeError("User need to make a specific function in a class which extends 'ValueBlock'")}};De.NAME="valueBlock";var oc=class extends dr(Mr){constructor({idBlock:e={}}={}){var r,n,o,i;super(),e?(this.isHexOnly=(r=e.isHexOnly)!==null&&r!==void 0?r:!1,this.valueHexView=e.valueHex?ae.BufferSourceConverter.toUint8Array(e.valueHex):bc,this.tagClass=(n=e.tagClass)!==null&&n!==void 0?n:-1,this.tagNumber=(o=e.tagNumber)!==null&&o!==void 0?o:-1,this.isConstructed=(i=e.isConstructed)!==null&&i!==void 0?i:!1):(this.tagClass=-1,this.tagNumber=-1,this.isConstructed=!1)}toBER(e=!1){let r=0;switch(this.tagClass){case 1:r|=0;break;case 2:r|=64;break;case 3:r|=128;break;case 4:r|=192;break;default:return this.error="Unknown tag class",ur}if(this.isConstructed&&(r|=32),this.tagNumber<31&&!this.isHexOnly){let o=new Uint8Array(1);if(!e){let i=this.tagNumber;i&=31,r|=i,o[0]=r}return o.buffer}if(!this.isHexOnly){let o=an(this.tagNumber,7),i=new Uint8Array(o),a=o.byteLength,c=new Uint8Array(a+1);if(c[0]=r|31,!e){for(let u=0;u<a-1;u++)c[u+1]=i[u]|128;c[a]=i[a-1]}return c.buffer}let n=new Uint8Array(this.valueHexView.byteLength+1);if(n[0]=r|31,!e){let o=this.valueHexView;for(let i=0;i<o.length-1;i++)n[i+1]=o[i]|128;n[this.valueHexView.byteLength]=o[o.length-1]}return n.buffer}fromBER(e,r,n){let o=ae.BufferSourceConverter.toUint8Array(e);if(!Or(this,o,r,n))return-1;let i=o.subarray(r,r+n);if(i.length===0)return this.error="Zero buffer length",-1;switch(i[0]&192){case 0:this.tagClass=1;break;case 64:this.tagClass=2;break;case 128:this.tagClass=3;break;case 192:this.tagClass=4;break;default:return this.error="Unknown tag class",-1}this.isConstructed=(i[0]&32)===32,this.isHexOnly=!1;let c=i[0]&31;if(c!==31)this.tagNumber=c,this.blockLength=1;else{let u=0;for(;;){let p=u+1;if(p>=i.length)return this.error="End of input reached before message was fully decoded",-1;if(u++,(i[p]&128)===0)break}this.blockLength=u+1;let d=this.valueHexView=new Uint8Array(u);for(let p=0;p<u;p++)d[p]=i[p+1]&127;this.blockLength<=9?this.tagNumber=zn(d,7):(this.isHexOnly=!0,this.warnings.push("Tag too long, represented as hex-coded"))}if(this.tagClass===1&&this.isConstructed)switch(this.tagNumber){case 1:case 2:case 5:case 6:case 9:case 13:case 14:case 23:case 24:case 31:case 32:case 33:case 34:return this.error="Constructed encoding used for primitive type",-1}return r+this.blockLength}toJSON(){return{...super.toJSON(),tagClass:this.tagClass,tagNumber:this.tagNumber,isConstructed:this.isConstructed}}};oc.NAME="identificationBlock";var ic=class extends Mr{constructor({lenBlock:e={}}={}){var r,n,o;super(),this.isIndefiniteForm=(r=e.isIndefiniteForm)!==null&&r!==void 0?r:!1,this.longFormUsed=(n=e.longFormUsed)!==null&&n!==void 0?n:!1,this.length=(o=e.length)!==null&&o!==void 0?o:0}fromBER(e,r,n){let o=ae.BufferSourceConverter.toUint8Array(e);if(!Or(this,o,r,n))return-1;let i=o.subarray(r,r+n);if(i.length===0)return this.error="Zero buffer length",-1;if(i[0]===255)return this.error="Length block 0xFF is reserved by standard",-1;if(this.isIndefiniteForm=i[0]===128,this.isIndefiniteForm)return this.blockLength=1,r+this.blockLength;if(this.longFormUsed=!!(i[0]&128),this.longFormUsed===!1)return this.length=i[0],this.blockLength=1,r+this.blockLength;let a=i[0]&127;if(a>8)return this.error="Too big integer",-1;if(a+1>i.length)return this.error="End of input reached before message was fully decoded",-1;let c=r+1,u=o.subarray(c,c+a);return u[a-1]===0&&this.warnings.push("Needlessly long encoded length"),this.length=zn(u,8),this.longFormUsed&&this.length<=127&&this.warnings.push("Unnecessary usage of long length form"),this.blockLength=a+1,r+this.blockLength}toBER(e=!1){let r,n;if(this.length>127&&(this.longFormUsed=!0),this.isIndefiniteForm)return r=new ArrayBuffer(1),e===!1&&(n=new Uint8Array(r),n[0]=128),r;if(this.longFormUsed){let o=an(this.length,8);if(o.byteLength>127)return this.error="Too big length",ur;if(r=new ArrayBuffer(o.byteLength+1),e)return r;let i=new Uint8Array(o);n=new Uint8Array(r),n[0]=o.byteLength|128;for(let a=0;a<o.byteLength;a++)n[a+1]=i[a];return r}return r=new ArrayBuffer(1),e===!1&&(n=new Uint8Array(r),n[0]=this.length),r}toJSON(){return{...super.toJSON(),isIndefiniteForm:this.isIndefiniteForm,longFormUsed:this.longFormUsed,length:this.length}}};ic.NAME="lengthBlock";var V={},_e=class extends Mr{constructor({name:e=at,optional:r=!1,primitiveSchema:n,...o}={},i){super(o),this.name=e,this.optional=r,n&&(this.primitiveSchema=n),this.idBlock=new oc(o),this.lenBlock=new ic(o),this.valueBlock=i?new i(o):new De(o)}fromBER(e,r,n,o){let i=this.valueBlock.fromBER(e,r,this.lenBlock.isIndefiniteForm?n:this.lenBlock.length,o);return i===-1?(this.error=this.valueBlock.error,i):(this.idBlock.error.length||(this.blockLength+=this.idBlock.blockLength),this.lenBlock.error.length||(this.blockLength+=this.lenBlock.blockLength),this.valueBlock.error.length||(this.blockLength+=this.valueBlock.blockLength),i)}toBER(e,r){let n=r||new ni;r||uf(this);let o=this.idBlock.toBER(e);if(n.write(o),this.lenBlock.isIndefiniteForm)n.write(new Uint8Array([128]).buffer),this.valueBlock.toBER(e,n),n.write(new ArrayBuffer(2));else{let i=this.valueBlock.toBER(e);this.lenBlock.length=i.byteLength;let a=this.lenBlock.toBER(e);n.write(a),n.write(i)}return r?ur:n.final()}toJSON(){let e={...super.toJSON(),idBlock:this.idBlock.toJSON(),lenBlock:this.lenBlock.toJSON(),valueBlock:this.valueBlock.toJSON(),name:this.name,optional:this.optional};return this.primitiveSchema&&(e.primitiveSchema=this.primitiveSchema.toJSON()),e}toString(e="ascii"){return e==="ascii"?this.onAsciiEncoding():ae.Convert.ToHex(this.toBER())}onAsciiEncoding(){let e=this.constructor.NAME,r=ae.Convert.ToHex(this.valueBlock.valueBeforeDecodeView);return`${e} : ${r}`}isEqual(e){if(this===e)return!0;if(!(e instanceof this.constructor))return!1;let r=this.toBER(),n=e.toBER();return nf(r,n)}};_e.NAME="BaseBlock";function uf(t){var e;if(t instanceof V.Constructed)for(let r of t.valueBlock.value)uf(r)&&(t.lenBlock.isIndefiniteForm=!0);return!!(!((e=t.lenBlock)===null||e===void 0)&&e.isIndefiniteForm)}var as=class extends _e{getValue(){return this.valueBlock.value}setValue(e){this.valueBlock.value=e}constructor({value:e=at,...r}={},n){super(r,n),e&&this.fromString(e)}fromBER(e,r,n){let o=this.valueBlock.fromBER(e,r,this.lenBlock.isIndefiniteForm?n:this.lenBlock.length);return o===-1?(this.error=this.valueBlock.error,o):(this.fromBuffer(this.valueBlock.valueHexView),this.idBlock.error.length||(this.blockLength+=this.idBlock.blockLength),this.lenBlock.error.length||(this.blockLength+=this.lenBlock.blockLength),this.valueBlock.error.length||(this.blockLength+=this.valueBlock.blockLength),o)}onAsciiEncoding(){return`${this.constructor.NAME} : '${this.valueBlock.value}'`}};as.NAME="BaseStringBlock";var sc=class extends dr(De){constructor({isHexOnly:e=!0,...r}={}){super(r),this.isHexOnly=e}};sc.NAME="PrimitiveValueBlock";var df,Pr=class extends _e{constructor(e={}){super(e,sc),this.idBlock.isConstructed=!1}};df=Pr;V.Primitive=df;Pr.NAME="PRIMITIVE";var pf=100,ff=1e4,hf=16*1024*1024,s0="Maximum ASN.1 nesting depth exceeded",a0="Maximum ASN.1 node count exceeded",c0="Maximum ASN.1 content length exceeded";function ys(t={}){var e,r,n;return{depth:0,maxDepth:(e=t.maxDepth)!==null&&e!==void 0?e:pf,nodesCount:0,maxNodes:(r=t.maxNodes)!==null&&r!==void 0?r:ff,maxContentLength:(n=t.maxContentLength)!==null&&n!==void 0?n:hf}}function l0(t){let e=new _e({},De);return e.error=t,{offset:-1,result:e}}function u0(t){if(t.nodesCount+=1,t.nodesCount>t.maxNodes)return a0}function d0(t,e){if(t>e.maxContentLength)return c0}function nu(t,e,r,n){let o=n.depth+1;if(o>n.maxDepth)return l0(s0);n.depth=o;try{return wc(t,e,r,n)}finally{n.depth-=1}}function p0(t,e){if(t instanceof e)return t;let r=new e;return r.idBlock=t.idBlock,r.lenBlock=t.lenBlock,r.warnings=t.warnings,r.valueBeforeDecodeView=t.valueBeforeDecodeView,r}function wc(t,e=0,r=t.length,n=ys()){let o=e,i=new _e({},De),a=new Mr;if(!Or(a,t,e,r))return i.error=a.error,{offset:-1,result:i};if(!t.subarray(e,e+r).length)return i.error="Zero buffer length",{offset:-1,result:i};let u=u0(n);if(u)return i.error=u,{offset:-1,result:i};let d=i.idBlock.fromBER(t,e,r);if(i.idBlock.warnings.length&&i.warnings.concat(i.idBlock.warnings),d===-1)return i.error=i.idBlock.error,{offset:-1,result:i};if(e=d,r-=i.idBlock.blockLength,d=i.lenBlock.fromBER(t,e,r),i.lenBlock.warnings.length&&i.warnings.concat(i.lenBlock.warnings),d===-1)return i.error=i.lenBlock.error,{offset:-1,result:i};e=d,r-=i.lenBlock.blockLength;let p=i.lenBlock.isIndefiniteForm?r:i.lenBlock.length,h=d0(p,n);if(h)return i.error=h,{offset:-1,result:i};if(!i.idBlock.isConstructed&&i.lenBlock.isIndefiniteForm)return i.error="Indefinite length form used for primitive encoding form",{offset:-1,result:i};let g=_e;switch(i.idBlock.tagClass){case 1:if(i.idBlock.tagNumber>=37&&i.idBlock.isHexOnly===!1)return i.error="UNIVERSAL 37 and upper tags are reserved by ASN.1 standard",{offset:-1,result:i};switch(i.idBlock.tagNumber){case 0:if(i.idBlock.isConstructed&&i.lenBlock.length>0)return i.error="Type [UNIVERSAL 0] is reserved",{offset:-1,result:i};g=V.EndOfContent;break;case 1:g=V.Boolean;break;case 2:g=V.Integer;break;case 3:g=V.BitString;break;case 4:g=V.OctetString;break;case 5:g=V.Null;break;case 6:g=V.ObjectIdentifier;break;case 10:g=V.Enumerated;break;case 12:g=V.Utf8String;break;case 13:g=V.RelativeObjectIdentifier;break;case 14:g=V.TIME;break;case 15:return i.error="[UNIVERSAL 15] is reserved by ASN.1 standard",{offset:-1,result:i};case 16:g=V.Sequence;break;case 17:g=V.Set;break;case 18:g=V.NumericString;break;case 19:g=V.PrintableString;break;case 20:g=V.TeletexString;break;case 21:g=V.VideotexString;break;case 22:g=V.IA5String;break;case 23:g=V.UTCTime;break;case 24:g=V.GeneralizedTime;break;case 25:g=V.GraphicString;break;case 26:g=V.VisibleString;break;case 27:g=V.GeneralString;break;case 28:g=V.UniversalString;break;case 29:g=V.CharacterString;break;case 30:g=V.BmpString;break;case 31:g=V.DATE;break;case 32:g=V.TimeOfDay;break;case 33:g=V.DateTime;break;case 34:g=V.Duration;break;default:{let w=i.idBlock.isConstructed?new V.Constructed:new V.Primitive;w.idBlock=i.idBlock,w.lenBlock=i.lenBlock,w.warnings=i.warnings,i=w}}break;default:g=i.idBlock.isConstructed?V.Constructed:V.Primitive}return i=p0(i,g),d=i.fromBER(t,e,p,n),i.valueBeforeDecodeView=t.subarray(o,o+i.blockLength),{offset:d,result:i}}function Dr(t,e={}){if(!t.byteLength){let r=new _e({},De);return r.error="Input buffer has zero length",{offset:-1,result:r}}return wc(ae.BufferSourceConverter.toUint8Array(t).slice(),0,t.byteLength,ys(e))}function f0(t,e){return t?1:e}var cr=class extends De{constructor({value:e=[],isIndefiniteForm:r=!1,...n}={}){super(n),this.value=e,this.isIndefiniteForm=r}fromBER(e,r,n,o){let i=ae.BufferSourceConverter.toUint8Array(e),a=o??ys();if(!Or(this,i,r,n))return-1;if(this.valueBeforeDecodeView=i.subarray(r,r+n),this.valueBeforeDecodeView.length===0)return this.warnings.push("Zero buffer length"),r;let c=r;for(;f0(this.isIndefiniteForm,n)>0;){let u=nu(i,c,n,a);if(u.offset===-1)return this.error=u.result.error,this.warnings.concat(u.result.warnings),-1;if(c=u.offset,this.blockLength+=u.result.blockLength,n-=u.result.blockLength,this.value.push(u.result),this.isIndefiniteForm&&u.result.constructor.NAME===ss)break}return this.isIndefiniteForm&&(this.value[this.value.length-1].constructor.NAME===ss?this.value.pop():this.warnings.push("No EndOfContent block encoded")),c}toBER(e,r){let n=r||new ni;for(let o=0;o<this.value.length;o++)this.value[o].toBER(e,n);return r?ur:n.final()}toJSON(){let e={...super.toJSON(),isIndefiniteForm:this.isIndefiniteForm,value:[]};for(let r of this.value)e.value.push(r.toJSON());return e}};cr.NAME="ConstructedValueBlock";var mf,Be=class extends _e{constructor(e={}){super(e,cr),this.idBlock.isConstructed=!0}fromBER(e,r,n,o){this.valueBlock.isIndefiniteForm=this.lenBlock.isIndefiniteForm;let i=this.valueBlock.fromBER(e,r,this.lenBlock.isIndefiniteForm?n:this.lenBlock.length,o);return i===-1?(this.error=this.valueBlock.error,i):(this.idBlock.error.length||(this.blockLength+=this.idBlock.blockLength),this.lenBlock.error.length||(this.blockLength+=this.lenBlock.blockLength),this.valueBlock.error.length||(this.blockLength+=this.valueBlock.blockLength),i)}onAsciiEncoding(){let e=[];for(let n of this.valueBlock.value)e.push(n.toString("ascii").split(`
`).map(o=>`  ${o}`).join(`
`));let r=this.idBlock.tagClass===3?`[${this.idBlock.tagNumber}]`:this.constructor.NAME;return e.length?`${r} :
${e.join(`
`)}`:`${r} :`}};mf=Be;V.Constructed=mf;Be.NAME="CONSTRUCTED";var ac=class extends De{fromBER(e,r,n){return r}toBER(e){return ur}};ac.override="EndOfContentValueBlock";var gf,cs=class extends _e{constructor(e={}){super(e,ac),this.idBlock.tagClass=1,this.idBlock.tagNumber=0}};gf=cs;V.EndOfContent=gf;cs.NAME=ss;var yf,$t=class extends _e{constructor(e={}){super(e,De),this.idBlock.tagClass=1,this.idBlock.tagNumber=5}fromBER(e,r,n){return this.lenBlock.length>0&&this.warnings.push("Non-zero length of value block for Null type"),this.idBlock.error.length||(this.blockLength+=this.idBlock.blockLength),this.lenBlock.error.length||(this.blockLength+=this.lenBlock.blockLength),this.blockLength+=n,r+n>e.byteLength?(this.error="End of input reached before message was fully decoded (inconsistent offset and length values)",-1):r+n}toBER(e,r){let n=new ArrayBuffer(2);if(!e){let o=new Uint8Array(n);o[0]=5,o[1]=0}return r&&r.write(n),n}onAsciiEncoding(){return`${this.constructor.NAME}`}};yf=$t;V.Null=yf;$t.NAME="NULL";var cc=class extends dr(De){get value(){for(let e of this.valueHexView)if(e>0)return!0;return!1}set value(e){this.valueHexView[0]=e?255:0}constructor({value:e,...r}={}){super(r),r.valueHex?this.valueHexView=ae.BufferSourceConverter.toUint8Array(r.valueHex):this.valueHexView=new Uint8Array(1),e&&(this.value=e)}fromBER(e,r,n){let o=ae.BufferSourceConverter.toUint8Array(e);return Or(this,o,r,n)?(this.valueHexView=o.subarray(r,r+n),n>1&&this.warnings.push("Boolean value encoded in more then 1 octet"),this.isHexOnly=!0,Zl.call(this),this.blockLength=n,r+n):-1}toBER(){return this.valueHexView.slice()}toJSON(){return{...super.toJSON(),value:this.value}}};cc.NAME="BooleanValueBlock";var bf,qn=class extends _e{getValue(){return this.valueBlock.value}setValue(e){this.valueBlock.value=e}constructor(e={}){super(e,cc),this.idBlock.tagClass=1,this.idBlock.tagNumber=1}onAsciiEncoding(){return`${this.constructor.NAME} : ${this.getValue}`}};bf=qn;V.Boolean=bf;qn.NAME="BOOLEAN";var lc=class extends dr(cr){constructor({isConstructed:e=!1,...r}={}){super(r),this.isConstructed=e}fromBER(e,r,n,o){let i=0;if(this.isConstructed){if(this.isHexOnly=!1,i=cr.prototype.fromBER.call(this,e,r,n,o),i===-1)return i;for(let a=0;a<this.value.length;a++){let c=this.value[a].constructor.NAME;if(c===ss){if(this.isIndefiniteForm)break;return this.error="EndOfContent is unexpected, OCTET STRING may consists of OCTET STRINGs only",-1}if(c!==cf)return this.error="OCTET STRING may consists of OCTET STRINGs only",-1}}else this.isHexOnly=!0,i=super.fromBER(e,r,n),this.blockLength=n;return i}toBER(e,r){return this.isConstructed?cr.prototype.toBER.call(this,e,r):e?new ArrayBuffer(this.valueHexView.byteLength):this.valueHexView.slice().buffer}toJSON(){return{...super.toJSON(),isConstructed:this.isConstructed}}};lc.NAME="OctetStringValueBlock";var ou,Vt=class extends _e{constructor({idBlock:e={},lenBlock:r={},...n}={}){var o,i;(o=n.isConstructed)!==null&&o!==void 0||(n.isConstructed=!!(!((i=n.value)===null||i===void 0)&&i.length)),super({idBlock:{isConstructed:n.isConstructed,...e},lenBlock:{...r,isIndefiniteForm:!!n.isIndefiniteForm},...n},lc),this.idBlock.tagClass=1,this.idBlock.tagNumber=4}fromBER(e,r,n,o){if(this.valueBlock.isConstructed=this.idBlock.isConstructed,this.valueBlock.isIndefiniteForm=this.lenBlock.isIndefiniteForm,n===0)return this.idBlock.error.length===0&&(this.blockLength+=this.idBlock.blockLength),this.lenBlock.error.length===0&&(this.blockLength+=this.lenBlock.blockLength),r;if(!this.valueBlock.isConstructed){let a=(e instanceof ArrayBuffer?new Uint8Array(e):e).subarray(r,r+n);try{if(a.byteLength){let c=o??ys(),u=nu(a,0,a.byteLength,c);u.offset!==-1&&u.offset===n&&(this.valueBlock.value=[u.result])}}catch{}}return super.fromBER(e,r,n,o)}onAsciiEncoding(){if(this.valueBlock.isConstructed||this.valueBlock.value&&this.valueBlock.value.length)return Be.prototype.onAsciiEncoding.call(this);let e=this.constructor.NAME,r=ae.Convert.ToHex(this.valueBlock.valueHexView);return`${e} : ${r}`}getValue(){if(!this.idBlock.isConstructed)return this.valueBlock.valueHexView.slice().buffer;let e=[];for(let r of this.valueBlock.value)r instanceof ou&&e.push(r.valueBlock.valueHexView);return ae.BufferSourceConverter.concat(e)}};ou=Vt;V.OctetString=ou;Vt.NAME=cf;var uc=class extends dr(cr){constructor({unusedBits:e=0,isConstructed:r=!1,...n}={}){super(n),this.unusedBits=e,this.isConstructed=r,this.blockLength=this.valueHexView.byteLength}fromBER(e,r,n,o){if(!n)return r;let i=-1;if(this.isConstructed){if(i=cr.prototype.fromBER.call(this,e,r,n,o),i===-1)return i;for(let u of this.value){let d=u.constructor.NAME;if(d===ss){if(this.isIndefiniteForm)break;return this.error="EndOfContent is unexpected, BIT STRING may consists of BIT STRINGs only",-1}if(d!==lf)return this.error="BIT STRING may consists of BIT STRINGs only",-1;let p=u.valueBlock;if(this.unusedBits>0&&p.unusedBits>0)return this.error='Using of "unused bits" inside constructive BIT STRING allowed for least one only',-1;this.unusedBits=p.unusedBits}return i}let a=ae.BufferSourceConverter.toUint8Array(e);if(!Or(this,a,r,n))return-1;let c=a.subarray(r,r+n);if(this.unusedBits=c[0],this.unusedBits>7)return this.error="Unused bits for BitString must be in range 0-7",-1;if(!this.unusedBits){let u=c.subarray(1);try{if(u.byteLength){let d=o??ys(),p=nu(u,0,u.byteLength,d);p.offset!==-1&&p.offset===n-1&&(this.value=[p.result])}}catch{}}return this.valueHexView=c.subarray(1),this.blockLength=c.length,r+n}toBER(e,r){if(this.isConstructed)return cr.prototype.toBER.call(this,e,r);if(e)return new ArrayBuffer(this.valueHexView.byteLength+1);if(!this.valueHexView.byteLength){let o=new Uint8Array(1);return o[0]=0,o.buffer}let n=new Uint8Array(this.valueHexView.length+1);return n[0]=this.unusedBits,n.set(this.valueHexView,1),n.buffer}toJSON(){return{...super.toJSON(),unusedBits:this.unusedBits,isConstructed:this.isConstructed}}};uc.NAME="BitStringValueBlock";var wf,Kt=class extends _e{constructor({idBlock:e={},lenBlock:r={},...n}={}){var o,i;(o=n.isConstructed)!==null&&o!==void 0||(n.isConstructed=!!(!((i=n.value)===null||i===void 0)&&i.length)),super({idBlock:{isConstructed:n.isConstructed,...e},lenBlock:{...r,isIndefiniteForm:!!n.isIndefiniteForm},...n},uc),this.idBlock.tagClass=1,this.idBlock.tagNumber=3}fromBER(e,r,n,o){return this.valueBlock.isConstructed=this.idBlock.isConstructed,this.valueBlock.isIndefiniteForm=this.lenBlock.isIndefiniteForm,super.fromBER(e,r,n,o)}onAsciiEncoding(){if(this.valueBlock.isConstructed||this.valueBlock.value&&this.valueBlock.value.length)return Be.prototype.onAsciiEncoding.call(this);{let e=[],r=this.valueBlock.valueHexView;for(let a of r)e.push(a.toString(2).padStart(8,"0"));let n=e.join(""),o=this.constructor.NAME,i=n.substring(0,n.length-this.valueBlock.unusedBits);return`${o} : ${i}`}}};wf=Kt;V.BitString=wf;Kt.NAME=lf;var xf;function h0(t,e){let r=new Uint8Array([0]),n=new Uint8Array(t),o=new Uint8Array(e),i=n.slice(0),a=i.length-1,c=o.slice(0),u=c.length-1,d=0,p=u<a?a:u,h=0;for(let g=p;g>=0;g--,h++)!0===h<c.length?d=i[a-h]+c[u-h]+r[0]:d=i[a-h]+r[0],r[0]=d/10,!0===h>=i.length?i=rc(new Uint8Array([d%10]),i):i[a-h]=d%10;return r[0]>0&&(i=rc(r,i)),i}function af(t){if(t>=os.length)for(let e=os.length;e<=t;e++){let r=new Uint8Array([0]),n=os[e-1].slice(0);for(let o=n.length-1;o>=0;o--){let i=new Uint8Array([(n[o]<<1)+r[0]]);r[0]=i[0]/10,n[o]=i[0]%10}r[0]>0&&(n=rc(r,n)),os.push(n)}return os[t]}function m0(t,e){let r=0,n=new Uint8Array(t),o=new Uint8Array(e),i=n.slice(0),a=i.length-1,c=o.slice(0),u=c.length-1,d,p=0;for(let h=u;h>=0;h--,p++)d=i[a-p]-c[u-p]-r,!0===d<0?(r=1,i[a-p]=d+10):(r=0,i[a-p]=d);if(r>0)for(let h=a-u+1;h>=0;h--,p++)if(d=i[a-p]-r,d<0)r=1,i[a-p]=d+10;else{r=0,i[a-p]=d;break}return i.slice()}var ls=class extends dr(De){setValueHex(){this.valueHexView.length>=4?(this.warnings.push("Too big Integer for decoding, hex only"),this.isHexOnly=!0,this._valueDec=0):(this.isHexOnly=!1,this.valueHexView.length>0&&(this._valueDec=Zl.call(this)))}constructor({value:e,...r}={}){super(r),this._valueDec=0,r.valueHex&&this.setValueHex(),e!==void 0&&(this.valueDec=e)}set valueDec(e){this._valueDec=e,this.isHexOnly=!1,this.valueHexView=new Uint8Array(rf(e))}get valueDec(){return this._valueDec}fromDER(e,r,n,o=0){let i=this.fromBER(e,r,n);if(i===-1)return i;let a=this.valueHexView;return a[0]===0&&(a[1]&128)!==0?this.valueHexView=a.subarray(1):o!==0&&a.length<o&&(o-a.length>1&&(o=a.length+1),this.valueHexView=a.subarray(o-a.length)),i}toDER(e=!1){let r=this.valueHexView;switch(!0){case(r[0]&128)!==0:{let n=new Uint8Array(this.valueHexView.length+1);n[0]=0,n.set(r,1),this.valueHexView=n}break;case(r[0]===0&&(r[1]&128)===0):this.valueHexView=this.valueHexView.subarray(1);break}return this.toBER(e)}fromBER(e,r,n){let o=super.fromBER(e,r,n);return o===-1||this.setValueHex(),o}toBER(e){return e?new ArrayBuffer(this.valueHexView.length):this.valueHexView.slice().buffer}toJSON(){return{...super.toJSON(),valueDec:this.valueDec}}toString(){let e=this.valueHexView.length*8-1,r=new Uint8Array(this.valueHexView.length*8/3),n=0,o,i=this.valueHexView,a="",c=!1;for(let u=i.byteLength-1;u>=0;u--){o=i[u];for(let d=0;d<8;d++)(o&1)===1&&(n===e?(r=m0(af(n),r),a="-"):r=h0(r,af(n))),n++,o>>=1}for(let u=0;u<r.length;u++)r[u]&&(c=!0),c&&(a+=of.charAt(r[u]));return c===!1&&(a+=of.charAt(0)),a}};xf=ls;ls.NAME="IntegerValueBlock";Object.defineProperty(xf.prototype,"valueHex",{set:function(t){this.valueHexView=new Uint8Array(t),this.setValueHex()},get:function(){return this.valueHexView.slice().buffer}});var is,Nr=class extends _e{constructor(e={}){super(e,ls),this.idBlock.tagClass=1,this.idBlock.tagNumber=2}toBigInt(){return nc(),BigInt(this.valueBlock.toString())}static fromBigInt(e){nc();let r=BigInt(e),n=new ni,o=r.toString(16).replace(/^-/,""),i=new Uint8Array(ae.Convert.FromHex(o));if(r<0){let c=new Uint8Array(i.length+(i[0]&128?1:0));c[0]|=128;let d=BigInt(`0x${ae.Convert.ToHex(c)}`)+r,p=ae.BufferSourceConverter.toUint8Array(ae.Convert.FromHex(d.toString(16)));p[0]|=128,n.write(p)}else i[0]&128&&n.write(new Uint8Array([0])),n.write(i);return new is({valueHex:n.final()})}convertToDER(){let e=new is({valueHex:this.valueBlock.valueHexView});return e.valueBlock.toDER(),e}convertFromDER(){return new is({valueHex:this.valueBlock.valueHexView[0]===0?this.valueBlock.valueHexView.subarray(1):this.valueBlock.valueHexView})}onAsciiEncoding(){return`${this.constructor.NAME} : ${this.valueBlock.toString()}`}};is=Nr;V.Integer=is;Nr.NAME="INTEGER";var vf,Xn=class extends Nr{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=10}};vf=Xn;V.Enumerated=vf;Xn.NAME="ENUMERATED";var us=class extends dr(De){constructor({valueDec:e=-1,isFirstSid:r=!1,...n}={}){super(n),this.valueDec=e,this.isFirstSid=r}fromBER(e,r,n){if(!n)return r;let o=ae.BufferSourceConverter.toUint8Array(e);if(!Or(this,o,r,n))return-1;let i=o.subarray(r,r+n);this.valueHexView=new Uint8Array(n);for(let c=0;c<n&&(this.valueHexView[c]=i[c]&127,this.blockLength++,(i[c]&128)!==0);c++);let a=new Uint8Array(this.blockLength);for(let c=0;c<this.blockLength;c++)a[c]=this.valueHexView[c];return this.valueHexView=a,(i[this.blockLength-1]&128)!==0?(this.error="End of input reached before message was fully decoded",-1):(this.valueHexView[0]===0&&this.warnings.push("Needlessly long format of SID encoding"),this.blockLength<=8?this.valueDec=zn(this.valueHexView,7):(this.isHexOnly=!0,this.warnings.push("Too big SID for decoding, hex only")),r+this.blockLength)}set valueBigInt(e){nc();let r=BigInt(e).toString(2);for(;r.length%7;)r="0"+r;let n=new Uint8Array(r.length/7);for(let o=0;o<n.length;o++)n[o]=parseInt(r.slice(o*7,o*7+7),2)+(o+1<n.length?128:0);this.fromBER(n.buffer,0,n.length)}toBER(e){if(this.isHexOnly){if(e)return new ArrayBuffer(this.valueHexView.byteLength);let o=this.valueHexView,i=new Uint8Array(this.blockLength);for(let a=0;a<this.blockLength-1;a++)i[a]=o[a]|128;return i[this.blockLength-1]=o[this.blockLength-1],i.buffer}let r=an(this.valueDec,7);if(r.byteLength===0)return this.error="Error during encoding SID value",ur;let n=new Uint8Array(r.byteLength);if(!e){let o=new Uint8Array(r),i=r.byteLength-1;for(let a=0;a<i;a++)n[a]=o[a]|128;n[i]=o[i]}return n}toString(){let e="";if(this.isHexOnly)e=ae.Convert.ToHex(this.valueHexView);else if(this.isFirstSid){let r=this.valueDec;this.valueDec<=39?e="0.":this.valueDec<=79?(e="1.",r-=40):(e="2.",r-=80),e+=r.toString()}else e=this.valueDec.toString();return e}toJSON(){return{...super.toJSON(),valueDec:this.valueDec,isFirstSid:this.isFirstSid}}};us.NAME="sidBlock";var dc=class extends De{constructor({value:e=at,...r}={}){super(r),this.value=[],e&&this.fromString(e)}fromBER(e,r,n){let o=r;for(;n>0;){let i=new us;if(o=i.fromBER(e,o,n),o===-1)return this.blockLength=0,this.error=i.error,o;this.value.length===0&&(i.isFirstSid=!0),this.blockLength+=i.blockLength,n-=i.blockLength,this.value.push(i)}return o}toBER(e){let r=[];for(let n=0;n<this.value.length;n++){let o=this.value[n].toBER(e);if(o.byteLength===0)return this.error=this.value[n].error,ur;r.push(o)}return ru(r)}fromString(e){this.value=[];let r=0,n=0,o="",i=!1;do if(n=e.indexOf(".",r),n===-1?o=e.substring(r):o=e.substring(r,n),r=n+1,i){let a=this.value[0],c=0;switch(a.valueDec){case 0:break;case 1:c=40;break;case 2:c=80;break;default:this.value=[];return}let u=parseInt(o,10);if(isNaN(u))return;a.valueDec=u+c,i=!1}else{let a=new us;if(o>Number.MAX_SAFE_INTEGER){nc();let c=BigInt(o);a.valueBigInt=c}else if(a.valueDec=parseInt(o,10),isNaN(a.valueDec))return;this.value.length||(a.isFirstSid=!0,i=!0),this.value.push(a)}while(n!==-1)}toString(){let e="",r=!1;for(let n=0;n<this.value.length;n++){r=this.value[n].isHexOnly;let o=this.value[n].toString();n!==0&&(e=`${e}.`),r?(o=`{${o}}`,this.value[n].isFirstSid?e=`2.{${o} - 80}`:e+=o):e+=o}return e}toJSON(){let e={...super.toJSON(),value:this.toString(),sidArray:[]};for(let r=0;r<this.value.length;r++)e.sidArray.push(this.value[r].toJSON());return e}};dc.NAME="ObjectIdentifierValueBlock";var Af,Yn=class extends _e{getValue(){return this.valueBlock.toString()}setValue(e){this.valueBlock.fromString(e)}constructor(e={}){super(e,dc),this.idBlock.tagClass=1,this.idBlock.tagNumber=6}onAsciiEncoding(){return`${this.constructor.NAME} : ${this.valueBlock.toString()||"empty"}`}toJSON(){return{...super.toJSON(),value:this.getValue()}}};Af=Yn;V.ObjectIdentifier=Af;Yn.NAME="OBJECT IDENTIFIER";var ds=class extends dr(Mr){constructor({valueDec:e=0,...r}={}){super(r),this.valueDec=e}fromBER(e,r,n){if(n===0)return r;let o=ae.BufferSourceConverter.toUint8Array(e);if(!Or(this,o,r,n))return-1;let i=o.subarray(r,r+n);this.valueHexView=new Uint8Array(n);for(let c=0;c<n&&(this.valueHexView[c]=i[c]&127,this.blockLength++,(i[c]&128)!==0);c++);let a=new Uint8Array(this.blockLength);for(let c=0;c<this.blockLength;c++)a[c]=this.valueHexView[c];return this.valueHexView=a,(i[this.blockLength-1]&128)!==0?(this.error="End of input reached before message was fully decoded",-1):(this.valueHexView[0]===0&&this.warnings.push("Needlessly long format of SID encoding"),this.blockLength<=8?this.valueDec=zn(this.valueHexView,7):(this.isHexOnly=!0,this.warnings.push("Too big SID for decoding, hex only")),r+this.blockLength)}toBER(e){if(this.isHexOnly){if(e)return new ArrayBuffer(this.valueHexView.byteLength);let o=this.valueHexView,i=new Uint8Array(this.blockLength);for(let a=0;a<this.blockLength-1;a++)i[a]=o[a]|128;return i[this.blockLength-1]=o[this.blockLength-1],i.buffer}let r=an(this.valueDec,7);if(r.byteLength===0)return this.error="Error during encoding SID value",ur;let n=new Uint8Array(r.byteLength);if(!e){let o=new Uint8Array(r),i=r.byteLength-1;for(let a=0;a<i;a++)n[a]=o[a]|128;n[i]=o[i]}return n.buffer}toString(){let e="";return this.isHexOnly?e=ae.Convert.ToHex(this.valueHexView):e=this.valueDec.toString(),e}toJSON(){return{...super.toJSON(),valueDec:this.valueDec}}};ds.NAME="relativeSidBlock";var pc=class extends De{constructor({value:e=at,...r}={}){super(r),this.value=[],e&&this.fromString(e)}fromBER(e,r,n){let o=r;for(;n>0;){let i=new ds;if(o=i.fromBER(e,o,n),o===-1)return this.blockLength=0,this.error=i.error,o;this.blockLength+=i.blockLength,n-=i.blockLength,this.value.push(i)}return o}toBER(e,r){let n=[];for(let o=0;o<this.value.length;o++){let i=this.value[o].toBER(e);if(i.byteLength===0)return this.error=this.value[o].error,ur;n.push(i)}return ru(n)}fromString(e){this.value=[];let r=0,n=0,o="";do{n=e.indexOf(".",r),n===-1?o=e.substring(r):o=e.substring(r,n),r=n+1;let i=new ds;if(i.valueDec=parseInt(o,10),isNaN(i.valueDec))return!0;this.value.push(i)}while(n!==-1);return!0}toString(){let e="",r=!1;for(let n=0;n<this.value.length;n++){r=this.value[n].isHexOnly;let o=this.value[n].toString();n!==0&&(e=`${e}.`),r&&(o=`{${o}}`),e+=o}return e}toJSON(){let e={...super.toJSON(),value:this.toString(),sidArray:[]};for(let r=0;r<this.value.length;r++)e.sidArray.push(this.value[r].toJSON());return e}};pc.NAME="RelativeObjectIdentifierValueBlock";var Ef,Jn=class extends _e{getValue(){return this.valueBlock.toString()}setValue(e){this.valueBlock.fromString(e)}constructor(e={}){super(e,pc),this.idBlock.tagClass=1,this.idBlock.tagNumber=13}onAsciiEncoding(){return`${this.constructor.NAME} : ${this.valueBlock.toString()||"empty"}`}toJSON(){return{...super.toJSON(),value:this.getValue()}}};Ef=Jn;V.RelativeObjectIdentifier=Ef;Jn.NAME="RelativeObjectIdentifier";var Sf,We=class extends Be{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=16}};Sf=We;V.Sequence=Sf;We.NAME="SEQUENCE";var kf,Qe=class extends Be{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=17}};kf=Qe;V.Set=kf;Qe.NAME="SET";var fc=class extends dr(De){constructor({...e}={}){super(e),this.isHexOnly=!0,this.value=at}toJSON(){return{...super.toJSON(),value:this.value}}};fc.NAME="StringValueBlock";var hc=class extends fc{};hc.NAME="SimpleStringValueBlock";var Ze=class extends as{constructor({...e}={}){super(e,hc)}fromBuffer(e){this.valueBlock.value=String.fromCharCode.apply(null,ae.BufferSourceConverter.toUint8Array(e))}fromString(e){let r=e.length,n=this.valueBlock.valueHexView=new Uint8Array(r);for(let o=0;o<r;o++)n[o]=e.charCodeAt(o);this.valueBlock.value=e}};Ze.NAME="SIMPLE STRING";var mc=class extends Ze{fromBuffer(e){this.valueBlock.valueHexView=ae.BufferSourceConverter.toUint8Array(e);try{this.valueBlock.value=ae.Convert.ToUtf8String(e)}catch(r){this.warnings.push(`Error during "decodeURIComponent": ${r}, using raw string`),this.valueBlock.value=ae.Convert.ToBinary(e)}}fromString(e){this.valueBlock.valueHexView=new Uint8Array(ae.Convert.FromUtf8String(e)),this.valueBlock.value=e}};mc.NAME="Utf8StringValueBlock";var Cf,kt=class extends mc{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=12}};Cf=kt;V.Utf8String=Cf;kt.NAME="UTF8String";var gc=class extends Ze{fromBuffer(e){this.valueBlock.value=ae.Convert.ToUtf16String(e),this.valueBlock.valueHexView=ae.BufferSourceConverter.toUint8Array(e)}fromString(e){this.valueBlock.value=e,this.valueBlock.valueHexView=new Uint8Array(ae.Convert.FromUtf16String(e))}};gc.NAME="BmpStringValueBlock";var Tf,Qn=class extends gc{constructor({...e}={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=30}};Tf=Qn;V.BmpString=Tf;Qn.NAME="BMPString";var yc=class extends Ze{fromBuffer(e){let r=ArrayBuffer.isView(e)?e.slice().buffer:e.slice(0),n=new Uint8Array(r);for(let o=0;o<n.length;o+=4)n[o]=n[o+3],n[o+1]=n[o+2],n[o+2]=0,n[o+3]=0;this.valueBlock.value=String.fromCharCode.apply(null,new Uint32Array(r))}fromString(e){let r=e.length,n=this.valueBlock.valueHexView=new Uint8Array(r*4);for(let o=0;o<r;o++){let i=an(e.charCodeAt(o),8),a=new Uint8Array(i);if(a.length>4)continue;let c=4-a.length;for(let u=a.length-1;u>=0;u--)n[o*4+u+c]=a[u]}this.valueBlock.value=e}};yc.NAME="UniversalStringValueBlock";var If,Zn=class extends yc{constructor({...e}={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=28}};If=Zn;V.UniversalString=If;Zn.NAME="UniversalString";var _f,eo=class extends Ze{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=18}};_f=eo;V.NumericString=_f;eo.NAME="NumericString";var Bf,to=class extends Ze{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=19}};Bf=to;V.PrintableString=Bf;to.NAME="PrintableString";var Rf,ro=class extends Ze{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=20}};Rf=ro;V.TeletexString=Rf;ro.NAME="TeletexString";var Mf,no=class extends Ze{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=21}};Mf=no;V.VideotexString=Mf;no.NAME="VideotexString";var Pf,oo=class extends Ze{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=22}};Pf=oo;V.IA5String=Pf;oo.NAME="IA5String";var Nf,io=class extends Ze{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=25}};Nf=io;V.GraphicString=Nf;io.NAME="GraphicString";var Of,cn=class extends Ze{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=26}};Of=cn;V.VisibleString=Of;cn.NAME="VisibleString";var Df,so=class extends Ze{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=27}};Df=so;V.GeneralString=Df;so.NAME="GeneralString";var Lf,ao=class extends Ze{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=29}};Lf=ao;V.CharacterString=Lf;ao.NAME="CharacterString";var jf,ln=class extends cn{constructor({value:e,valueDate:r,...n}={}){if(super(n),this.year=0,this.month=0,this.day=0,this.hour=0,this.minute=0,this.second=0,e){this.fromString(e),this.valueBlock.valueHexView=new Uint8Array(e.length);for(let o=0;o<e.length;o++)this.valueBlock.valueHexView[o]=e.charCodeAt(o)}r&&(this.fromDate(r),this.valueBlock.valueHexView=new Uint8Array(this.toBuffer())),this.idBlock.tagClass=1,this.idBlock.tagNumber=23}fromBuffer(e){this.fromString(String.fromCharCode.apply(null,ae.BufferSourceConverter.toUint8Array(e)))}toBuffer(){let e=this.toString(),r=new ArrayBuffer(e.length),n=new Uint8Array(r);for(let o=0;o<e.length;o++)n[o]=e.charCodeAt(o);return r}fromDate(e){this.year=e.getUTCFullYear(),this.month=e.getUTCMonth()+1,this.day=e.getUTCDate(),this.hour=e.getUTCHours(),this.minute=e.getUTCMinutes(),this.second=e.getUTCSeconds()}toDate(){return new Date(Date.UTC(this.year,this.month-1,this.day,this.hour,this.minute,this.second))}fromString(e){let n=/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})Z/ig.exec(e);if(n===null){this.error="Wrong input string for conversion";return}let o=parseInt(n[1],10);o>=50?this.year=1900+o:this.year=2e3+o,this.month=parseInt(n[2],10),this.day=parseInt(n[3],10),this.hour=parseInt(n[4],10),this.minute=parseInt(n[5],10),this.second=parseInt(n[6],10)}toString(e="iso"){if(e==="iso"){let r=new Array(7);return r[0]=st(this.year<2e3?this.year-1900:this.year-2e3,2),r[1]=st(this.month,2),r[2]=st(this.day,2),r[3]=st(this.hour,2),r[4]=st(this.minute,2),r[5]=st(this.second,2),r[6]="Z",r.join("")}return super.toString(e)}onAsciiEncoding(){return`${this.constructor.NAME} : ${this.toDate().toISOString()}`}toJSON(){return{...super.toJSON(),year:this.year,month:this.month,day:this.day,hour:this.hour,minute:this.minute,second:this.second}}};jf=ln;V.UTCTime=jf;ln.NAME="UTCTime";var Hf,co=class extends ln{constructor(e={}){var r;super(e),(r=this.millisecond)!==null&&r!==void 0||(this.millisecond=0),this.idBlock.tagClass=1,this.idBlock.tagNumber=24}fromDate(e){super.fromDate(e),this.millisecond=e.getUTCMilliseconds()}toDate(){let e=Date.UTC(this.year,this.month-1,this.day,this.hour,this.minute,this.second,this.millisecond);return new Date(e)}fromString(e){let r=!1,n="",o="",i=0,a,c=0,u=0;if(e[e.length-1]==="Z")n=e.substring(0,e.length-1),r=!0;else{let h=new Number(e[e.length-1]);if(isNaN(h.valueOf()))throw new Error("Wrong input string for conversion");n=e}if(r){if(n.indexOf("+")!==-1)throw new Error("Wrong input string for conversion");if(n.indexOf("-")!==-1)throw new Error("Wrong input string for conversion")}else{let h=1,g=n.indexOf("+"),w="";if(g===-1&&(g=n.indexOf("-"),h=-1),g!==-1){if(w=n.substring(g+1),n=n.substring(0,g),w.length!==2&&w.length!==4)throw new Error("Wrong input string for conversion");let k=parseInt(w.substring(0,2),10);if(isNaN(k.valueOf()))throw new Error("Wrong input string for conversion");if(c=h*k,w.length===4){if(k=parseInt(w.substring(2,4),10),isNaN(k.valueOf()))throw new Error("Wrong input string for conversion");u=h*k}}}let d=n.indexOf(".");if(d===-1&&(d=n.indexOf(",")),d!==-1){let h=new Number(`0${n.substring(d)}`);if(isNaN(h.valueOf()))throw new Error("Wrong input string for conversion");i=h.valueOf(),o=n.substring(0,d)}else o=n;switch(!0){case o.length===8:if(a=/(\d{4})(\d{2})(\d{2})/ig,d!==-1)throw new Error("Wrong input string for conversion");break;case o.length===10:if(a=/(\d{4})(\d{2})(\d{2})(\d{2})/ig,d!==-1){let h=60*i;this.minute=Math.floor(h),h=60*(h-this.minute),this.second=Math.floor(h),h=1e3*(h-this.second),this.millisecond=Math.floor(h)}break;case o.length===12:if(a=/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/ig,d!==-1){let h=60*i;this.second=Math.floor(h),h=1e3*(h-this.second),this.millisecond=Math.floor(h)}break;case o.length===14:if(a=/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/ig,d!==-1){let h=1e3*i;this.millisecond=Math.floor(h)}break;default:throw new Error("Wrong input string for conversion")}let p=a.exec(o);if(p===null)throw new Error("Wrong input string for conversion");for(let h=1;h<p.length;h++)switch(h){case 1:this.year=parseInt(p[h],10);break;case 2:this.month=parseInt(p[h],10);break;case 3:this.day=parseInt(p[h],10);break;case 4:this.hour=parseInt(p[h],10)+c;break;case 5:this.minute=parseInt(p[h],10)+u;break;case 6:this.second=parseInt(p[h],10);break;default:throw new Error("Wrong input string for conversion")}if(r===!1){let h=new Date(this.year,this.month,this.day,this.hour,this.minute,this.second,this.millisecond);this.year=h.getUTCFullYear(),this.month=h.getUTCMonth(),this.day=h.getUTCDay(),this.hour=h.getUTCHours(),this.minute=h.getUTCMinutes(),this.second=h.getUTCSeconds(),this.millisecond=h.getUTCMilliseconds()}}toString(e="iso"){if(e==="iso"){let r=[];return r.push(st(this.year,4)),r.push(st(this.month,2)),r.push(st(this.day,2)),r.push(st(this.hour,2)),r.push(st(this.minute,2)),r.push(st(this.second,2)),this.millisecond!==0&&(r.push("."),r.push(st(this.millisecond,3))),r.push("Z"),r.join("")}return super.toString(e)}toJSON(){return{...super.toJSON(),millisecond:this.millisecond}}};Hf=co;V.GeneralizedTime=Hf;co.NAME="GeneralizedTime";var Uf,ps=class extends kt{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=31}};Uf=ps;V.DATE=Uf;ps.NAME="DATE";var Gf,fs=class extends kt{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=32}};Gf=fs;V.TimeOfDay=Gf;fs.NAME="TimeOfDay";var $f,hs=class extends kt{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=33}};$f=hs;V.DateTime=$f;hs.NAME="DateTime";var Vf,ms=class extends kt{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=34}};Vf=ms;V.Duration=Vf;ms.NAME="Duration";var Kf,gs=class extends kt{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=14}};Kf=gs;V.TIME=Kf;gs.NAME="TIME";var lr=class{constructor({name:e=at,optional:r=!1}={}){this.name=e,this.optional=r}},oi=class extends lr{constructor({value:e=[],...r}={}){super(r),this.value=e}},lo=class extends lr{constructor({value:e=new lr,local:r=!1,...n}={}){super(n),this.value=e,this.local=r}},tu=class{get data(){return this.dataView.slice().buffer}set data(e){this.dataView=ae.BufferSourceConverter.toUint8Array(e)}constructor({data:e=bc}={}){this.dataView=ae.BufferSourceConverter.toUint8Array(e)}fromBER(e,r,n){let o=r+n;return this.dataView=ae.BufferSourceConverter.toUint8Array(e).subarray(r,o),o}toBER(e){return this.dataView.slice().buffer}};function Rr(t,e,r){if(r instanceof oi){for(let i of r.value)if(Rr(t,e,i).verified)return{verified:!0,result:t};{let i={verified:!1,result:{error:"Wrong values for Choice type"}};return r.hasOwnProperty(eu)&&(i.name=r.name),i}}if(r instanceof lr)return r.hasOwnProperty(eu)&&(t[r.name]=e),{verified:!0,result:t};if(!(t instanceof Object))return{verified:!1,result:{error:"Wrong root object"}};if(!(e instanceof Object))return{verified:!1,result:{error:"Wrong ASN.1 data"}};if(!(r instanceof Object))return{verified:!1,result:{error:"Wrong ASN.1 schema"}};if(!(Zb in r))return{verified:!1,result:{error:"Wrong ASN.1 schema"}};if(!(n0 in r.idBlock))return{verified:!1,result:{error:"Wrong ASN.1 schema"}};if(!(o0 in r.idBlock))return{verified:!1,result:{error:"Wrong ASN.1 schema"}};let n=r.idBlock.toBER(!1);if(n.byteLength===0)return{verified:!1,result:{error:"Error encoding idBlock for ASN.1 schema"}};if(r.idBlock.fromBER(n,0,n.byteLength)===-1)return{verified:!1,result:{error:"Error decoding idBlock for ASN.1 schema"}};if(r.idBlock.hasOwnProperty(e0)===!1)return{verified:!1,result:{error:"Wrong ASN.1 schema"}};if(r.idBlock.tagClass!==e.idBlock.tagClass)return{verified:!1,result:t};if(r.idBlock.hasOwnProperty(t0)===!1)return{verified:!1,result:{error:"Wrong ASN.1 schema"}};if(r.idBlock.tagNumber!==e.idBlock.tagNumber)return{verified:!1,result:t};if(r.idBlock.hasOwnProperty(r0)===!1)return{verified:!1,result:{error:"Wrong ASN.1 schema"}};if(r.idBlock.isConstructed!==e.idBlock.isConstructed)return{verified:!1,result:t};if(!(Qb in r.idBlock))return{verified:!1,result:{error:"Wrong ASN.1 schema"}};if(r.idBlock.isHexOnly!==e.idBlock.isHexOnly)return{verified:!1,result:t};if(r.idBlock.isHexOnly){if(!(sf in r.idBlock))return{verified:!1,result:{error:"Wrong ASN.1 schema"}};let i=r.idBlock.valueHexView,a=e.idBlock.valueHexView;if(i.length!==a.length)return{verified:!1,result:t};for(let c=0;c<i.length;c++)if(i[c]!==a[1])return{verified:!1,result:t}}if(r.name&&(r.name=r.name.replace(/^\s+|\s+$/g,at),r.name&&(t[r.name]=e)),r instanceof V.Constructed){let i=0,a={verified:!1,result:{error:"Unknown error"}},c=r.valueBlock.value.length;if(c>0&&r.valueBlock.value[0]instanceof lo&&(c=e.valueBlock.value.length),c===0)return{verified:!0,result:t};if(e.valueBlock.value.length===0&&r.valueBlock.value.length!==0){let u=!0;for(let d=0;d<r.valueBlock.value.length;d++)u=u&&(r.valueBlock.value[d].optional||!1);return u?{verified:!0,result:t}:(r.name&&(r.name=r.name.replace(/^\s+|\s+$/g,at),r.name&&delete t[r.name]),t.error="Inconsistent object length",{verified:!1,result:t})}for(let u=0;u<c;u++)if(u-i>=e.valueBlock.value.length){if(r.valueBlock.value[u].optional===!1){let d={verified:!1,result:t};return t.error="Inconsistent length between ASN.1 data and schema",r.name&&(r.name=r.name.replace(/^\s+|\s+$/g,at),r.name&&(delete t[r.name],d.name=r.name)),d}}else if(r.valueBlock.value[0]instanceof lo){if(a=Rr(t,e.valueBlock.value[u],r.valueBlock.value[0].value),a.verified===!1)if(r.valueBlock.value[0].optional)i++;else return r.name&&(r.name=r.name.replace(/^\s+|\s+$/g,at),r.name&&delete t[r.name]),a;if(eu in r.valueBlock.value[0]&&r.valueBlock.value[0].name.length>0){let d={};i0 in r.valueBlock.value[0]&&r.valueBlock.value[0].local?d=e:d=t,typeof d[r.valueBlock.value[0].name]>"u"&&(d[r.valueBlock.value[0].name]=[]),d[r.valueBlock.value[0].name].push(e.valueBlock.value[u])}}else if(a=Rr(t,e.valueBlock.value[u-i],r.valueBlock.value[u]),a.verified===!1)if(r.valueBlock.value[u].optional)i++;else return r.name&&(r.name=r.name.replace(/^\s+|\s+$/g,at),r.name&&delete t[r.name]),a;if(a.verified===!1){let u={verified:!1,result:t};return r.name&&(r.name=r.name.replace(/^\s+|\s+$/g,at),r.name&&(delete t[r.name],u.name=r.name)),u}return{verified:!0,result:t}}if(r.primitiveSchema&&sf in e.valueBlock){let i=wc(e.valueBlock.valueHexView);if(i.offset===-1){let a={verified:!1,result:i.result};return r.name&&(r.name=r.name.replace(/^\s+|\s+$/g,at),r.name&&(delete t[r.name],a.name=r.name)),a}return Rr(t,i.result,r.primitiveSchema)}return{verified:!0,result:t}}function g0(t,e){if(!(e instanceof Object))return{verified:!1,result:{error:"Wrong ASN.1 schema type"}};let r=wc(ae.BufferSourceConverter.toUint8Array(t));return r.offset===-1?{verified:!1,result:r.result}:Rr(r.result,r.result,e)}var y0="[object ArrayBuffer]",b0="[object SharedArrayBuffer]";function Wf(t){return Object.prototype.toString.call(t)}function w0(t){if(ArrayBuffer.isView(t))return!0;if(!t||typeof t!="object")return!1;let e=t;return typeof e.byteOffset=="number"&&typeof e.byteLength=="number"&&vc(e.buffer)}function xc(t){return Wf(t)===y0}function Ff(t){return typeof SharedArrayBuffer<"u"&&Wf(t)===b0}function vc(t){return xc(t)||Ff(t)}function iu(t){return w0(t)}function fr(t){return vc(t)||iu(t)}function su(t){if(!fr(t))throw new TypeError("Expected ArrayBuffer, SharedArrayBuffer, or ArrayBufferView")}function Fe(t){return su(t),vc(t)?new Uint8Array(t):new Uint8Array(t.buffer,t.byteOffset,t.byteLength)}function he(t){if(su(t),xc(t))return t;let e=new ArrayBuffer(t.byteLength);return new Uint8Array(e).set(Fe(t)),e}function bs(t,e,r={}){let n=Fe(t),o=Fe(e);if(!r.constantTime&&n.byteLength!==o.byteLength)return!1;let i=Math.max(n.byteLength,o.byteLength),a=n.byteLength^o.byteLength;for(let c=0;c<i;c++)a|=(n[c]??0)^(o[c]??0);return a===0}var Lr={};Gt(Lr,{binary:()=>A0,decode:()=>Ec,encode:()=>Ac,is:()=>Xf});function Ac(t){let e=Fe(t),r="";for(let n of e)r+=String.fromCharCode(n);return r}function Ec(t){let e=new Uint8Array(t.length);for(let r=0;r<t.length;r++)e[r]=t.charCodeAt(r)&255;return e}function Xf(t){return typeof t=="string"}var A0={encode:Ac,decode:Ec,is:Xf};var Le={};Gt(Le,{decode:()=>cu,encode:()=>au,format:()=>eh,formats:()=>th,hex:()=>P0,is:()=>Qf,normalize:()=>ws,parse:()=>Zf});var E0=/^[0-9a-f]$/i,S0=[" ","	",`
`,"\r",":","-","."];function k0(t){return t.separators==="none"?[]:!t.separators||t.separators==="common"?S0:t.separators}function C0(t){if(!t)throw new TypeError("Hex separators must be non-empty strings")}function T0(t,e,r){for(let n of r)if(t.startsWith(n,e))return n}function I0(t){let e=/[A-F]/.test(t),r=/[a-f]/.test(t);return e&&!r?"upper":"lower"}function _0(t){let e=/\r\n|\n/.exec(t);if(e)return e[0]===`\r
`?`\r
`:`
`}function Yf(t){return t.replace(/[^0-9a-f]/gi,"")}function B0(t){let e=t.match(/[0-9A-Fa-f]+|[^0-9A-Fa-f]+/g)??[];if(e.length<3)return;let r=e.filter((a,c)=>c%2===0),n=e.filter((a,c)=>c%2===1),o=n[0];if(!o||n.some(a=>a!==o)||r.some(a=>a.length===0||a.length%2!==0))return;let i=r[0]?.length??0;if(i&&!r.slice(0,-1).some(a=>a.length!==i)&&!((r[r.length-1]?.length??0)>i))return{size:i/2,separator:o}}function R0(t){let e=t.trim(),r=/^0x/i.test(e)?"0x":"",n=r?e.slice(2):e,o=_0(n),i=n.split(/\r\n|\n/).filter(d=>d.length>0),a=i[0]?.trim()??"",c=B0(a),u={case:I0(e),prefix:r};if(c&&(u.group=c),o&&i.length>1){let d=Yf(i[0]??"").length/2;d>0&&i.slice(0,-1).every(p=>Yf(p).length/2===d)&&(u.line={bytesPerLine:d,separator:o})}return u}function M0(t,e){let r=e.allowPrefix??!0,n=[...k0(e)].sort((c,u)=>u.length-c.length);for(let c of n)C0(c);let o=t.trim();if(/^0x/i.test(o)){if(!r)throw new TypeError("Hexadecimal text must not include a 0x prefix");o=o.slice(2)}let i="",a=!1;for(let c=0;c<o.length;){let u=o[c]??"";if(E0.test(u)){i+=u,a=!1,c+=1;continue}let d=T0(o,c,n);if(!d)throw new TypeError("Input is not valid hexadecimal text");if(e.strict&&(a||i.length===0))throw new TypeError("Hexadecimal text contains misplaced separators");a=!0,c+=d.length}if(e.strict&&a&&i.length>0)throw new TypeError("Hexadecimal text must not end with a separator");if(i.length%2!==0){if(!e.allowOddLength)throw new TypeError("Hexadecimal text must contain an even number of characters");i=`0${i}`}return i.toLowerCase()}function Jf(t,e){if(!e)return t.join("");if(!Number.isInteger(e.size)||e.size<1)throw new RangeError("Hex group size must be a positive integer");let r=[];for(let n=0;n<t.length;n+=e.size)r.push(t.slice(n,n+e.size).join(""));return r.join(e.separator)}function ws(t,e={}){return M0(t,e)}function Qf(t,e={}){if(typeof t!="string")return!1;try{return ws(t,e),!0}catch{return!1}}function au(t,e={}){let r=Fe(t),n=e.case??"lower",o=Array.from(r,a=>{let c=a.toString(16).padStart(2,"0");return n==="upper"?c.toUpperCase():c}),i="";if(e.line){let a=e.line.bytesPerLine;if(!Number.isInteger(a)||a<1)throw new RangeError("Hex bytesPerLine must be a positive integer");let c=e.line.separator??`
`,u=[];for(let d=0;d<o.length;d+=a)u.push(Jf(o.slice(d,d+a),e.group));i=u.join(c)}else i=Jf(o,e.group);return`${e.prefix??""}${i}`}function cu(t,e={}){let r=ws(t,e),n=new Uint8Array(r.length/2);for(let o=0;o<r.length;o+=2)n[o/2]=Number.parseInt(r.slice(o,o+2),16);return n}function Zf(t,e={}){let r=ws(t,e);return{bytes:cu(r),format:R0(t),normalized:r}}function eh(t,e){return au(t,e)}var th={compact:Object.freeze({}),upper:Object.freeze({case:"upper"}),colon:Object.freeze({group:{size:1,separator:":"}}),colonUpper:Object.freeze({case:"upper",group:{size:1,separator:":"}}),groupsOf4:Object.freeze({group:{size:4,separator:" "}}),prefixed:Object.freeze({prefix:"0x"})},P0={encode:au,decode:cu,format:eh,formats:th,is:Qf,normalize:ws,parse:Zf};var un={};Gt(un,{decode:()=>nh,encode:()=>rh,utf8:()=>N0});function rh(t){return new TextEncoder().encode(t)}function nh(t){return new TextDecoder("utf-8",{fatal:!1}).decode(Fe(t))}var N0={encode:rh,decode:nh};var hr={};Gt(hr,{decode:()=>ih,encode:()=>oh,utf16:()=>O0});function oh(t,e={}){let r=new ArrayBuffer(t.length*2),n=new DataView(r);for(let o=0;o<t.length;o++)n.setUint16(o*2,t.charCodeAt(o),e.littleEndian??!1);return new Uint8Array(r)}function ih(t,e={}){let r=he(t),n=new DataView(r),o="";for(let i=0;i<r.byteLength;i+=2)o+=String.fromCharCode(n.getUint16(i,e.littleEndian??!1));return o}var O0={encode:oh,decode:ih};var Ct={};Gt(Ct,{base64:()=>dn,decode:()=>lh,encode:()=>ch,is:()=>lu,normalize:()=>Sc,pad:()=>ah});var D0=/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;function sh(){return globalThis.Buffer}function Sc(t){return t.replace(/[\n\r\t ]/g,"")}function ah(t){let e=t.length%4;return e?t+"=".repeat(4-e):t}function lu(t){if(typeof t!="string")return!1;let e=Sc(t);return e===""||D0.test(e)}function ch(t,e){let r=Fe(t),n=sh();return n?n.from(r).toString("base64"):btoa(Ac(r))}function lh(t,e){let r=Sc(t);if(!lu(r))throw new TypeError("Input is not valid Base64 text");let n=sh();return n?new Uint8Array(n.from(r,"base64")):Ec(atob(r))}var dn={encode:ch,decode:lh,is:lu,normalize:Sc,pad:ah};var Wt={};Gt(Wt,{base64url:()=>j0,decode:()=>dh,encode:()=>uh,is:()=>uu,normalize:()=>kc});var L0=/^[A-Za-z0-9_-]*$/;function kc(t){return t.replace(/[\n\r\t ]/g,"")}function uu(t){return typeof t=="string"&&L0.test(kc(t))}function uh(t,e){return dn.encode(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/g,"")}function dh(t,e){let r=kc(t);if(!uu(r))throw new TypeError("Input is not valid Base64Url text");return dn.decode(dn.pad(r.replace(/-/g,"+").replace(/_/g,"/")))}var j0={encode:uh,decode:dh,is:uu,normalize:kc};var H0=/^[A-Z0-9][A-Z0-9 ._-]*[A-Z0-9]$/i,ph=/-----BEGIN ([^-]+)-----([\s\S]*?)-----END \1-----/g;function fh(t){if(!H0.test(t))throw new TypeError(`Invalid PEM label '${t}'`)}function U0(t,e){let r=[];for(let n=0;n<t.length;n+=e)r.push(t.slice(n,n+e));return r}function G0(t){let r=t.trim().replace(/\r\n/g,`
`).split(`
`).map(i=>i.trim()).filter(Boolean),n={},o=0;for(;o<r.length;o++){let i=r[o],a=i.indexOf(":");if(a<=0)break;n[i.slice(0,a).trim()]=i.slice(a+1).trim()}return{headers:Object.keys(n).length?n:void 0,base64Lines:r.slice(o),base64Text:r.slice(o).join("")}}function $0(t){return/\r\n/.test(t)?`\r
`:`
`}function hh(t,e={}){let r=[],n=e.label,o;for(ph.lastIndex=0;o=ph.exec(t);){let i=o[1].trim();if(n&&i!==n)continue;fh(i);let a=G0(o[2]);r.push({label:i,data:dn.decode(a.base64Text),headers:a.headers,lineLength:a.base64Lines[0]?.length??64,newline:$0(o[0])})}if(e.strict&&r.length===0)throw new TypeError(n?`No PEM block with label '${n}' was found`:"No PEM blocks were found");return r}function Cc(t,e,r={}){fh(t);let n=r.lineLength??64;if(!Number.isInteger(n)||n<1)throw new RangeError("PEM lineLength must be a positive integer");let o=r.newline??`
`,i=[`-----BEGIN ${t}-----`];if(r.headers){for(let[a,c]of Object.entries(r.headers))i.push(`${a}: ${c}`);i.push("")}return i.push(...U0(dn.encode(e),n)),i.push(`-----END ${t}-----`),`${i.join(o)}${o}`}function mh(t,e={}){return hh(t,e).map(({lineLength:r,newline:n,...o})=>o)}function gh(t,e){let[r]=mh(t,{label:e,strict:!0});return r.data}function yh(t,e={}){let[r]=hh(t,{...e,strict:!0}),n={label:r.label,headers:r.headers,lineLength:r.lineLength,newline:r.newline};return{bytes:r.data,format:n,normalized:Cc(r.label,r.data,n)}}function bh(t,e){return Cc(e.label,t,e)}var xs={name:"pem",encode:(t,e)=>{if(!e?.label)throw new TypeError("PEM label is required");return Cc(e.label,t,e)},decode:(t,e)=>gh(t,e?.label),format:bh,is:t=>typeof t=="string"&&/-----BEGIN [^-]+-----/.test(t),parse:yh};function mr(t){return t.trim().toLowerCase()}function V0(t){return t instanceof Error?t:new Error(String(t))}function wh(t,e,r){for(let n of[r.name,...r.aliases??[]])t.delete(mr(n));e.delete(mr(r.name))}function du(t,e,r){let n=t[r];if(typeof n!="function")throw new Error(`Converter '${e}' does not support ${r}()`);return n}function K0(t,e,r){let n=mr(r.name||t),o=e.trim();if(!o)return 0;let i=!1;r.is&&(i=r.is(e));let a=!1;try{r.decode(e),a=!0}catch{a=!1}if(!i&&!a)return 0;switch(n){case"pem":return/-----BEGIN [^-]+-----/.test(e)?1:0;case"hex":{let c=o.replace(/^0x/i,"").replace(/[\s:.-]/g,"");return!c||/[^0-9a-f]/i.test(c)||c.length%2!==0?0:/^0x/i.test(o)||/[:\s.-]/.test(o)?.95:/[a-f]/.test(o)||/[A-F]/.test(o)?.8:.45}case"base64url":return/[-_]/.test(o)?.95:/=/.test(o)?.1:.6;case"base64":return/[+/=]/.test(o)?.9:.55;case"binary":case"utf8":case"utf16be":case"utf16le":return 0;default:return i&&a?.75:.5}}function pu(t=[]){let e=new Map,r=new Set,n={register(o,i={}){if(!o.name||!mr(o.name))throw new TypeError("Converter name is required");let a=[...new Set([o.name,...o.aliases??[]].map(mr))],c=new Set;for(let u of a){let d=e.get(u);if(d){if(!i.override)throw new Error(`Converter '${u}' is already registered`);c.add(d)}}for(let u of c)wh(e,r,u);for(let u of a)e.set(u,o);return r.add(mr(o.name)),this},unregister(o){let i=e.get(mr(o));return i?(wh(e,r,i),!0):!1},has(o){return e.has(mr(o))},get(o){let i=e.get(mr(o));if(!i)throw new Error(`Converter '${o}' is not registered`);return i},list(){return[...r].map(o=>this.get(o))},encode(o,i,a){return this.get(o).encode(i,a)},decode(o,i,a){return this.get(o).decode(i,a)},tryDecode(o,i,a){try{return{ok:!0,bytes:this.decode(o,i,a)}}catch(c){return{ok:!1,error:V0(c)}}},normalize(o,i,a){let c=this.get(o);return du(c,o,"normalize").call(c,i,a)},parse(o,i,a){let c=this.get(o);return du(c,o,"parse").call(c,i,a)},format(o,i,a){let c=this.get(o);return du(c,o,"format").call(c,i,a)},transcode(o,i){let a=this.decode(i.from,o,i.fromOptions);return this.encode(i.to,a,i.toOptions)},detect(o,i={}){let a=i.formats?.length?i.formats.map(u=>String(u)):this.list().map(u=>u.name).filter(u=>!["binary","utf8","utf16be","utf16le"].includes(mr(u))),c=new Map;for(let u of a){let d=this.get(u),p=K0(u,o,d);if(p<=0)continue;let h=d.name,g=c.get(h);(!g||p>g.confidence)&&c.set(h,{format:h,confidence:p})}return[...c.values()].sort((u,d)=>d.confidence-u.confidence)}};for(let o of t)n.register(o);return n}var xh={name:"binary",aliases:["latin1"],encode:Lr.encode,decode:Lr.decode,is:Lr.is},vh={name:"hex",encode:Le.encode,decode:Le.decode,format:Le.format,is:Le.is,normalize:Le.normalize,parse:Le.parse},Ah={name:"base64",aliases:["b64"],encode:Ct.encode,decode:Ct.decode,is:Ct.is,normalize:Ct.normalize},Eh={name:"base64url",aliases:["base64-url","b64url"],encode:Wt.encode,decode:Wt.decode,is:Wt.is,normalize:Wt.normalize},Sh={name:"utf8",aliases:["utf-8"],encode:t=>un.decode(t),decode:t=>un.encode(t),is:t=>typeof t=="string"},kh={name:"utf16be",aliases:["utf16","utf-16","utf-16be"],encode:t=>hr.decode(t),decode:t=>hr.encode(t),is:t=>typeof t=="string"},Ch={name:"utf16le",aliases:["utf-16le","ucs2","usc2"],encode:t=>hr.decode(t,{littleEndian:!0}),decode:t=>hr.encode(t,{littleEndian:!0}),is:t=>typeof t=="string"},Th=[xh,vh,Ah,Eh,Sh,kh,Ch,xs],gr=pu(Th);function fu(t,e,...r){return gr.encode(t,e,...r)}function hu(t,e,...r){return gr.decode(t,e,...r)}function W0(t,e,...r){return gr.tryDecode(t,e,...r)}function F0(t,e,...r){return gr.normalize(t,e,...r)}function z0(t,e,...r){return gr.parse(t,e,...r)}function q0(t,e,r){return gr.format(t,e,r)}function X0(t,e){return gr.transcode(t,e)}function Y0(t,e){return gr.detect(t,e)}function J0(t){return t.toLowerCase()}var Ih={encode:fu,decode:hu,tryDecode:W0,normalize:F0,parse:z0,format:q0,transcode:X0,detect:Y0,to(t,e,...r){return fu(t,e,...r)},from(t,e,...r){return hu(t,e,...r)},toString(t,e="utf8"){return fu(e,t)},fromString(t,e="utf8"){return J0(e)==="hex"?he(Le.decode(t,{allowOddLength:!0})):he(hu(e,t))},toBase64:Ct.encode,fromBase64:t=>he(Ct.decode(t)),toBase64Url:Wt.encode,fromBase64Url:t=>he(Wt.decode(t)),toHex:Le.encode,fromHex:t=>he(Le.decode(t,{allowOddLength:!0})),toBinary:Lr.encode,fromBinary:t=>he(Lr.decode(t)),toUtf8String:un.decode,fromUtf8String:t=>he(un.encode(t)),toUtf16String:(t,e=!1)=>hr.decode(t,{littleEndian:e}),fromUtf16String:(t,e=!1)=>he(hr.encode(t,{littleEndian:e})),isHex:Le.is,isBase64:Ct.is,isBase64Url:Wt.is,formatString:Ct.normalize};var m;(function(t){t[t.Sequence=0]="Sequence",t[t.Set=1]="Set",t[t.Choice=2]="Choice"})(m||(m={}));var f;(function(t){t[t.Any=1]="Any",t[t.Boolean=2]="Boolean",t[t.OctetString=3]="OctetString",t[t.BitString=4]="BitString",t[t.Integer=5]="Integer",t[t.Enumerated=6]="Enumerated",t[t.ObjectIdentifier=7]="ObjectIdentifier",t[t.Utf8String=8]="Utf8String",t[t.BmpString=9]="BmpString",t[t.UniversalString=10]="UniversalString",t[t.NumericString=11]="NumericString",t[t.PrintableString=12]="PrintableString",t[t.TeletexString=13]="TeletexString",t[t.VideotexString=14]="VideotexString",t[t.IA5String=15]="IA5String",t[t.GraphicString=16]="GraphicString",t[t.VisibleString=17]="VisibleString",t[t.GeneralString=18]="GeneralString",t[t.CharacterString=19]="CharacterString",t[t.UTCTime=20]="UTCTime",t[t.GeneralizedTime=21]="GeneralizedTime",t[t.DATE=22]="DATE",t[t.TimeOfDay=23]="TimeOfDay",t[t.DateTime=24]="DateTime",t[t.Duration=25]="Duration",t[t.TIME=26]="TIME",t[t.Null=27]="Null",t[t.RelativeObjectIdentifier=28]="RelativeObjectIdentifier"})(f||(f={}));var Tt=class{unusedBits=0;value=new ArrayBuffer(0);constructor(e,r=0){if(e)if(typeof e=="number")this.fromNumber(e);else if(fr(e))this.unusedBits=r,this.value=he(e);else throw TypeError("Unsupported type of 'params' argument for BitString")}fromASN(e){if(!(e instanceof Kt))throw new TypeError("Argument 'asn' is not instance of ASN.1 BitString");return this.unusedBits=e.valueBlock.unusedBits,this.value=he(e.valueBlock.valueHex),this}toASN(){return new Kt({unusedBits:this.unusedBits,valueHex:this.value})}toSchema(e){return new Kt({name:e})}toNumber(){let e="",r=new Uint8Array(this.value);for(let n of r)e+=n.toString(2).padStart(8,"0");return e=e.split("").reverse().join(""),this.unusedBits&&(e=e.slice(this.unusedBits).padStart(this.unusedBits,"0")),parseInt(e,2)}fromNumber(e){let r=e.toString(2),n=r.length+7>>3;this.unusedBits=(n<<3)-r.length;let o=new Uint8Array(n);r=r.padStart(n<<3,"0").split("").reverse().join("");let i=0;for(;i<n;)o[i]=parseInt(r.slice(i<<3,(i<<3)+8),2),i++;this.value=o.buffer}};var R=class{buffer;get byteLength(){return this.buffer.byteLength}get byteOffset(){return 0}constructor(e){typeof e=="number"?this.buffer=new ArrayBuffer(e):fr(e)?this.buffer=he(e):Array.isArray(e)?this.buffer=new Uint8Array(e).buffer:this.buffer=new ArrayBuffer(0)}fromASN(e){if(!(e instanceof Vt))throw new TypeError("Argument 'asn' is not instance of ASN.1 OctetString");return this.buffer=he(e.valueBlock.valueHex),this}toASN(){return new Vt({valueHex:this.buffer})}toSchema(e){return new Vt({name:e})}};var Q0={fromASN:t=>t instanceof $t?null:he(t.valueBeforeDecodeView),toASN:t=>{if(t===null)return new $t;let e=Dr(t,{maxDepth:1/0,maxNodes:1/0,maxContentLength:1/0});if(e.result.error)throw new Error(e.result.error);return e.result}},Z0={fromASN:t=>t.valueBlock.valueHexView.byteLength>=4?t.valueBlock.toString():t.valueBlock.valueDec,toASN:t=>new Nr({value:+t})},ew={fromASN:t=>t.valueBlock.valueDec,toASN:t=>new Xn({value:t})},le={fromASN:t=>he(t.valueBlock.valueHexView),toASN:t=>new Nr({valueHex:t})};var tw={fromASN:t=>he(t.valueBlock.valueHexView),toASN:t=>new Kt({valueHex:t})},rw={fromASN:t=>t.valueBlock.toString(),toASN:t=>new Yn({value:t})},nw={fromASN:t=>t.valueBlock.toString(),toASN:t=>new Jn({value:t})},ow={fromASN:t=>t.valueBlock.value,toASN:t=>new qn({value:t})},ii={fromASN:t=>he(t.valueBlock.valueHexView),toASN:t=>new Vt({valueHex:t})},_h={fromASN:t=>new R(t.getValue()),toASN:t=>t.toASN()};function It(t){return{fromASN:e=>e.valueBlock.value,toASN:e=>new t({value:e})}}var mu=It(kt),iw=It(Qn),sw=It(Zn),aw=It(eo),cw=It(to),lw=It(ro),uw=It(no),dw=It(oo),pw=It(io),fw=It(cn),hw=It(so),mw=It(ao),gw={fromASN:t=>t.toDate(),toASN:t=>new ln({valueDate:t})},yw={fromASN:t=>t.toDate(),toASN:t=>new co({valueDate:t})},bw={fromASN:()=>null,toASN:()=>new $t};function pn(t){switch(t){case f.Any:return Q0;case f.BitString:return tw;case f.BmpString:return iw;case f.Boolean:return ow;case f.CharacterString:return mw;case f.Enumerated:return ew;case f.GeneralString:return hw;case f.GeneralizedTime:return yw;case f.GraphicString:return pw;case f.IA5String:return dw;case f.Integer:return Z0;case f.Null:return bw;case f.NumericString:return aw;case f.ObjectIdentifier:return rw;case f.RelativeObjectIdentifier:return nw;case f.OctetString:return ii;case f.PrintableString:return cw;case f.TeletexString:return lw;case f.UTCTime:return gw;case f.UniversalString:return sw;case f.Utf8String:return mu;case f.VideotexString:return uw;case f.VisibleString:return fw;default:return null}}function _t(t){return typeof t=="function"&&t.prototype?t.prototype.toASN&&t.prototype.fromASN?!0:_t(t.prototype):!!(t&&typeof t=="object"&&"toASN"in t&&"fromASN"in t)}function yu(t){if(t){let e=Object.getPrototypeOf(t);return e?.prototype?.constructor===Array?!0:yu(e)}return!1}function Bh(t,e){if(!(t&&e)||t.byteLength!==e.byteLength)return!1;let r=new Uint8Array(t),n=new Uint8Array(e);for(let o=0;o<t.byteLength;o++)if(r[o]!==n[o])return!1;return!0}var Tc=class{items=new WeakMap;has(e){return this.items.has(e)}get(e,r=!1){let n=this.items.get(e);if(!n)throw new Error(`Cannot get schema for '${e.prototype.constructor.name}' target`);if(r&&!n.schema)throw new Error(`Schema '${e.prototype.constructor.name}' doesn't contain ASN.1 schema. Call 'AsnSchemaStorage.cache'.`);return n}cache(e){let r=this.get(e);r.schema||(r.schema=this.create(e,!0))}createDefault(e){let r={type:m.Sequence,items:{}},n=this.findParentSchema(e);return n&&(Object.assign(r,n),r.items=Object.assign({},r.items,n.items)),r}create(e,r){let n=this.items.get(e)||this.createDefault(e),o=[];for(let i in n.items){let a=n.items[i],c=r?i:"",u;if(typeof a.type=="number"){let p=f[a.type],h=pr[p];if(!h)throw new Error(`Cannot get ASN1 class by name '${p}'`);u=new h({name:c})}else _t(a.type)?u=new a.type().toSchema(c):a.optional?this.get(a.type).type===m.Choice?u=new lr({name:c}):(u=this.create(a.type,!1),u.name=c):u=new lr({name:c});let d=!!a.optional||a.defaultValue!==void 0;if(a.repeated){u.name="";let p=a.repeated==="set"?Qe:We;u=new p({name:"",value:[new lo({name:c,value:u})]})}if(a.context!==null&&a.context!==void 0)if(a.implicit)if(typeof a.type=="number"||_t(a.type)){let p=a.repeated?Be:Pr;o.push(new p({name:c,optional:d,idBlock:{tagClass:3,tagNumber:a.context}}))}else{this.cache(a.type);let p=!!a.repeated,h=p?u:this.get(a.type,!0).schema;h="valueBlock"in h?h.valueBlock.value:h.value,o.push(new Be({name:p?"":c,optional:d,idBlock:{tagClass:3,tagNumber:a.context},value:h}))}else o.push(new Be({optional:d,idBlock:{tagClass:3,tagNumber:a.context},value:[u]}));else u.optional=d,o.push(u)}switch(n.type){case m.Sequence:return new We({value:o,name:""});case m.Set:return new Qe({value:o,name:""});case m.Choice:return new oi({value:o,name:""});default:throw new Error("Unsupported ASN1 type in use")}}set(e,r){return this.items.set(e,r),this}findParentSchema(e){let r=Object.getPrototypeOf(e);return r?this.items.get(r)||this.findParentSchema(r):null}};var Re=new Tc;var b=t=>e=>{let r;Re.has(e)?r=Re.get(e):(r=Re.createDefault(e),Re.set(e,r)),Object.assign(r,t)};var l=t=>(e,r)=>{let n;Re.has(e.constructor)?n=Re.get(e.constructor):(n=Re.createDefault(e.constructor),Re.set(e.constructor,n));let o=Object.assign({},t);if(typeof o.type=="number"&&!o.converter){let i=pn(t.type);if(!i)throw new Error(`Cannot get default converter for property '${r}' of ${e.constructor.name}`);o.converter=i}o.raw=t.raw,n.items[r]=o};var fn=class extends Error{schemas=[]};var xe=class{static parse(e,r,n){let o=Dr(he(e),n?.berOptions);if(o.result.error)throw new Error(o.result.error);return this.fromASN(o.result,r,n)}static fromASN(e,r,n){try{if(_t(r))return new r().fromASN(e);let o=Re.get(r);Re.cache(r);let i=o.schema,a=this.handleChoiceTypes(e,o,r,i,n);if(a?.result)return a.result;a?.targetSchema&&(i=a.targetSchema);let c=this.handleSequenceTypes(e,o,r,i),u=new r;return yu(r)?this.handleArrayTypes(e,o,r,n):(this.processSchemaItems(o,c,u,n),u)}catch(o){throw o instanceof fn&&o.schemas.push(r.name),o}}static handleChoiceTypes(e,r,n,o,i){if(e.constructor===Be&&r.type===m.Choice&&e.idBlock.tagClass===3)for(let a in r.items){let c=r.items[a];if(c.context===e.idBlock.tagNumber&&c.implicit&&typeof c.type=="function"&&Re.has(c.type)){let u=Re.get(c.type);if(u&&u.type===m.Sequence){let d=new We;if("value"in e.valueBlock&&Array.isArray(e.valueBlock.value)&&"value"in d.valueBlock){d.valueBlock.value=e.valueBlock.value;let p=this.fromASN(d,c.type,i),h=new n;return h[a]=p,{result:h}}}}}else if(e.constructor===Be&&r.type!==m.Choice){let a=new Be({idBlock:{tagClass:3,tagNumber:e.idBlock.tagNumber},value:r.schema.valueBlock.value});for(let c in r.items)delete e[c];return{targetSchema:a}}return null}static handleSequenceTypes(e,r,n,o){if(r.type===m.Sequence){let i=Rr({},e,o);if(!i.verified)throw new fn(`Data does not match to ${n.name} ASN1 schema.${i.result.error?` ${i.result.error}`:""}`);return i}else{let i=Rr({},e,o);if(!i.verified)throw new fn(`Data does not match to ${n.name} ASN1 schema.${i.result.error?` ${i.result.error}`:""}`);return i}}static processRepeatedField(e,r,n){let o=e.slice(r);if(o.length===1&&o[0].constructor.name==="Sequence"){let i=o[0];i.valueBlock&&i.valueBlock.value&&Array.isArray(i.valueBlock.value)&&(o=i.valueBlock.value)}if(typeof n.type=="number"){let i=pn(n.type);if(!i)throw new Error(`No converter for ASN.1 type ${n.type}`);return o.filter(a=>a&&a.valueBlock).map(a=>{try{return i.fromASN(a)}catch{return}}).filter(a=>a!==void 0)}else return o.filter(i=>i&&i.valueBlock).map(i=>{try{return this.fromASN(i,n.type)}catch{return}}).filter(i=>i!==void 0)}static processPrimitiveField(e,r){let n=pn(r.type);if(!n)throw new Error(`No converter for ASN.1 type ${r.type}`);return n.fromASN(e)}static isOptionalChoiceField(e){return e.optional&&typeof e.type=="function"&&Re.has(e.type)&&Re.get(e.type).type===m.Choice}static processOptionalChoiceField(e,r){try{return{processed:!0,value:this.fromASN(e,r.type)}}catch(n){if(n instanceof fn&&/Wrong values for Choice type/.test(n.message))return{processed:!1};throw n}}static handleArrayTypes(e,r,n,o){if(!("value"in e.valueBlock&&Array.isArray(e.valueBlock.value)))throw new Error("Cannot get items from the ASN.1 parsed value. ASN.1 object is not constructed.");let i=r.itemType;if(typeof i=="number"){let a=pn(i);if(!a)throw new Error(`Cannot get default converter for array item of ${n.name} ASN1 schema`);return n.from(e.valueBlock.value,c=>a.fromASN(c))}else return n.from(e.valueBlock.value,a=>this.fromASN(a,i,o))}static processSchemaItems(e,r,n,o){for(let i in e.items){let a=r.result[i];if(!a)continue;let c=e.items[i],u=c.type,d;typeof u=="number"||_t(u)?d=this.processPrimitiveSchemaItem(a,c,u,o):d=this.processComplexSchemaItem(a,c,u,o),d&&typeof d=="object"&&"value"in d&&"raw"in d?(n[i]=d.value,n[`${i}Raw`]=d.raw):n[i]=d}}static processPrimitiveSchemaItem(e,r,n,o){let i=r.converter??(_t(n)?new n:null);if(!i)throw new Error("Converter is empty");return r.repeated?this.processRepeatedPrimitiveItem(e,r,i,o):this.processSinglePrimitiveItem(e,r,n,i,o)}static processRepeatedPrimitiveItem(e,r,n,o){if(r.implicit){let i=r.repeated==="sequence"?We:Qe,a=new i;a.valueBlock=e.valueBlock;let c=Dr(a.toBER(!1),o?.berOptions);if(c.offset===-1)throw new Error(`Cannot parse the child item. ${c.result.error}`);if(!("value"in c.result.valueBlock&&Array.isArray(c.result.valueBlock.value)))throw new Error("Cannot get items from the ASN.1 parsed value. ASN.1 object is not constructed.");let u=c.result.valueBlock.value;return Array.from(u,d=>n.fromASN(d))}else return Array.from(e,i=>n.fromASN(i))}static processSinglePrimitiveItem(e,r,n,o,i){let a=e;if(r.implicit){let c;if(_t(n))c=new n().toSchema("");else{let u=f[n],d=pr[u];if(!d)throw new Error(`Cannot get '${u}' class from asn1js module`);c=new d}c.valueBlock=a.valueBlock,a=Dr(c.toBER(!1),i?.berOptions).result}return o.fromASN(a)}static processComplexSchemaItem(e,r,n,o){if(r.repeated){if(!Array.isArray(e))throw new Error("Cannot get list of items from the ASN.1 parsed value. ASN.1 value should be iterable.");return Array.from(e,i=>this.fromASN(i,n,o))}else{let i=this.handleImplicitTagging(e,r,n);if(this.isOptionalChoiceField(r))try{return this.fromASN(i,n,o)}catch(a){if(a instanceof fn&&/Wrong values for Choice type/.test(a.message))return;throw a}else{let a=this.fromASN(i,n,o);return r.raw?{value:a,raw:e.valueBeforeDecodeView}:a}}}static handleImplicitTagging(e,r,n){if(r.implicit&&typeof r.context=="number"){let o=Re.get(n);if(o.type===m.Sequence){let i=new We;if("value"in e.valueBlock&&Array.isArray(e.valueBlock.value)&&"value"in i.valueBlock)return i.valueBlock.value=e.valueBlock.value,i}else if(o.type===m.Set){let i=new Qe;if("value"in e.valueBlock&&Array.isArray(e.valueBlock.value)&&"value"in i.valueBlock)return i.valueBlock.value=e.valueBlock.value,i}}return e}};var vs=class t{static serialize(e){return e instanceof _e?e.toBER(!1):this.toASN(e).toBER(!1)}static toASN(e){if(e&&typeof e=="object"&&_t(e))return e.toASN();if(!(e&&typeof e=="object"))throw new TypeError("Parameter 1 should be type of Object.");let r=e.constructor,n=Re.get(r);Re.cache(r);let o=[];if(n.itemType){if(!Array.isArray(e))throw new TypeError("Parameter 1 should be type of Array.");if(typeof n.itemType=="number"){let a=pn(n.itemType);if(!a)throw new Error(`Cannot get default converter for array item of ${r.name} ASN1 schema`);o=e.map(c=>a.toASN(c))}else o=e.map(a=>this.toAsnItem({type:n.itemType},"[]",r,a))}else for(let a in n.items){let c=n.items[a],u=e[a];if(u===void 0||c.defaultValue===u||typeof c.defaultValue=="object"&&typeof u=="object"&&Bh(this.serialize(c.defaultValue),this.serialize(u)))continue;let d=t.toAsnItem(c,a,r,u);if(typeof c.context=="number")if(c.implicit)if(!c.repeated&&(typeof c.type=="number"||_t(c.type))){let p={};p.valueHex=d instanceof $t?he(d.valueBeforeDecodeView):d.valueBlock.toBER(),o.push(new Pr({optional:c.optional,idBlock:{tagClass:3,tagNumber:c.context},...p}))}else o.push(new Be({optional:c.optional,idBlock:{tagClass:3,tagNumber:c.context},value:d.valueBlock.value}));else o.push(new Be({optional:c.optional,idBlock:{tagClass:3,tagNumber:c.context},value:[d]}));else c.repeated?o=o.concat(d):o.push(d)}let i;switch(n.type){case m.Sequence:i=new We({value:o});break;case m.Set:i=new Qe({value:o});break;case m.Choice:if(!o[0])throw new Error(`Schema '${r.name}' has wrong data. Choice cannot be empty.`);i=o[0];break}return i}static toAsnItem(e,r,n,o){let i;if(typeof e.type=="number"){let a=e.converter;if(!a)throw new Error(`Property '${r}' doesn't have converter for type ${f[e.type]} in schema '${n.name}'`);if(e.repeated){if(!Array.isArray(o))throw new TypeError("Parameter 'objProp' should be type of Array.");let c=Array.from(o,d=>a.toASN(d)),u=e.repeated==="sequence"?We:Qe;i=new u({value:c})}else i=a.toASN(o)}else if(e.repeated){if(!Array.isArray(o))throw new TypeError("Parameter 'objProp' should be type of Array.");let a=Array.from(o,u=>this.toASN(u)),c=e.repeated==="sequence"?We:Qe;i=new c({value:a})}else i=this.toASN(o);return i}};var j=class extends Array{constructor(e=[]){if(typeof e=="number")super(e);else{super();for(let r of e)this.push(r)}}};var B=class t{static serialize(e){return vs.serialize(e)}static parse(e,r,n){return xe.parse(e,r,n)}static toString(e,r){let n=fr(e)?he(e):t.serialize(e),o=Dr(n,r?.berOptions);if(o.offset===-1)throw new Error(`Cannot decode ASN.1 data. ${o.result.error}`);return o.result.toString()}};function s(t,e,r,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,r):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,r,n);else for(var c=t.length-1;c>=0;c--)(a=t[c])&&(i=(o<3?a(i):o>3?a(e,r,i):a(e,r))||i);return o>3&&i&&Object.defineProperty(e,r,i),i}function L(t,e,r,n){if(r==="a"&&!n)throw new TypeError("Private accessor was defined without a getter");if(typeof e=="function"?t!==e||!n:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return r==="m"?n:r==="a"?n.call(t):n?n.value:e.get(t)}function ie(t,e,r,n,o){if(n==="m")throw new TypeError("Private method is not writable");if(n==="a"&&!o)throw new TypeError("Private accessor was defined without a setter");if(typeof e=="function"?t!==e||!o:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return n==="a"?o.call(t,r):o?o.value=r:e.set(t,r),r}var As=class{static isIPv4(e){return/^(\d{1,3}\.){3}\d{1,3}$/.test(e)}static parseIPv4(e){let r=e.split(".");if(r.length!==4)throw new Error("Invalid IPv4 address");return r.map(n=>{let o=parseInt(n,10);if(isNaN(o)||o<0||o>255)throw new Error("Invalid IPv4 address part");return o})}static parseIPv6(e){let n=this.expandIPv6(e).split(":");if(n.length!==8)throw new Error("Invalid IPv6 address");return n.reduce((o,i)=>{let a=parseInt(i,16);if(isNaN(a)||a<0||a>65535)throw new Error("Invalid IPv6 address part");return o.push(a>>8&255),o.push(a&255),o},[])}static expandIPv6(e){if(!e.includes("::"))return e;let r=e.split("::");if(r.length>2)throw new Error("Invalid IPv6 address");let n=r[0]?r[0].split(":"):[],o=r[1]?r[1].split(":"):[],i=8-(n.length+o.length);if(i<0)throw new Error("Invalid IPv6 address");return[...n,...Array(i).fill("0"),...o].join(":")}static formatIPv6(e){let r=[];for(let n=0;n<16;n+=2)r.push((e[n]<<8|e[n+1]).toString(16));return this.compressIPv6(r.join(":"))}static compressIPv6(e){let r=e.split(":"),n=-1,o=0,i=-1,a=0;for(let c=0;c<r.length;c++)r[c]==="0"?(i===-1&&(i=c),a++):(a>o&&(n=i,o=a),i=-1,a=0);if(a>o&&(n=i,o=a),o>1){let c=r.slice(0,n).join(":"),u=r.slice(n+o).join(":");return`${c}::${u}`}return e}static parseCIDR(e){let[r,n]=e.split("/"),o=parseInt(n,10);if(this.isIPv4(r)){if(o<0||o>32)throw new Error("Invalid IPv4 prefix length");return[this.parseIPv4(r),o]}else{if(o<0||o>128)throw new Error("Invalid IPv6 prefix length");return[this.parseIPv6(r),o]}}static decodeIP(e){if(e.length===64&&parseInt(e,16)===0)return"::/0";if(e.length!==16)return e;let r=parseInt(e.slice(8),16).toString(2).split("").reduce((o,i)=>o+ +i,0),n=e.slice(0,8).replace(/(.{2})/g,o=>`${parseInt(o,16)}.`);return n=n.slice(0,-1),`${n}/${r}`}static toString(e){let r=new Uint8Array(e);if(r.length===4)return Array.from(r).join(".");if(r.length===16)return this.formatIPv6(r);if(r.length===8||r.length===32){let n=r.length/2,o=r.slice(0,n),i=r.slice(n);if(r.every(u=>u===0))return r.length===8?"0.0.0.0/0":"::/0";let c=i.reduce((u,d)=>u+(d.toString(2).match(/1/g)||[]).length,0);return r.length===8?`${Array.from(o).join(".")}/${c}`:`${this.formatIPv6(o)}/${c}`}return this.decodeIP(Le.encode(e))}static fromString(e){if(e.includes("/")){let[n,o]=this.parseCIDR(e),i=new Uint8Array(n.length),a=o;for(let u=0;u<i.length;u++)a>=8?(i[u]=255,a-=8):a>0&&(i[u]=255<<8-a,a=0);let c=new Uint8Array(n.length*2);return c.set(n,0),c.set(i,n.length),c.buffer}let r=this.isIPv4(e)?this.parseIPv4(e):this.parseIPv6(e);return new Uint8Array(r).buffer}};var bu,wu,xu,Me=class{teletexString;printableString;universalString;utf8String;bmpString;constructor(e={}){Object.assign(this,e)}toString(){return this.bmpString||this.printableString||this.teletexString||this.universalString||this.utf8String||""}};s([l({type:f.TeletexString})],Me.prototype,"teletexString",void 0);s([l({type:f.PrintableString})],Me.prototype,"printableString",void 0);s([l({type:f.UniversalString})],Me.prototype,"universalString",void 0);s([l({type:f.Utf8String})],Me.prototype,"utf8String",void 0);s([l({type:f.BmpString})],Me.prototype,"bmpString",void 0);Me=s([b({type:m.Choice})],Me);var si=class extends Me{ia5String;anyValue;constructor(e={}){super(e),Object.assign(this,e)}toString(){return this.ia5String||(this.anyValue?Le.encode(this.anyValue):super.toString())}};s([l({type:f.IA5String})],si.prototype,"ia5String",void 0);s([l({type:f.Any})],si.prototype,"anyValue",void 0);si=s([b({type:m.Choice})],si);var uo=class{type="";value=new si;constructor(e={}){Object.assign(this,e)}};s([l({type:f.ObjectIdentifier})],uo.prototype,"type",void 0);s([l({type:si})],uo.prototype,"value",void 0);var hn=bu=class extends j{constructor(e){super(e),Object.setPrototypeOf(this,bu.prototype)}};hn=bu=s([b({type:m.Set,itemType:uo})],hn);var vu=wu=class extends j{constructor(e){super(e),Object.setPrototypeOf(this,wu.prototype)}};vu=wu=s([b({type:m.Sequence,itemType:hn})],vu);var be=xu=class extends vu{constructor(e){super(e),Object.setPrototypeOf(this,xu.prototype)}};be=xu=s([b({type:m.Sequence})],be);var ww={fromASN:t=>As.toString(ii.fromASN(t)),toASN:t=>ii.toASN(As.fromString(t))},mn=class{typeId="";value=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};s([l({type:f.ObjectIdentifier})],mn.prototype,"typeId",void 0);s([l({type:f.Any,context:0})],mn.prototype,"value",void 0);var Es=class{nameAssigner;partyName=new Me;constructor(e={}){Object.assign(this,e)}};s([l({type:Me,optional:!0,context:0,implicit:!0})],Es.prototype,"nameAssigner",void 0);s([l({type:Me,context:1,implicit:!0})],Es.prototype,"partyName",void 0);var Q=class{otherName;rfc822Name;dNSName;x400Address;directoryName;ediPartyName;uniformResourceIdentifier;iPAddress;registeredID;constructor(e={}){Object.assign(this,e)}};s([l({type:mn,context:0,implicit:!0})],Q.prototype,"otherName",void 0);s([l({type:f.IA5String,context:1,implicit:!0})],Q.prototype,"rfc822Name",void 0);s([l({type:f.IA5String,context:2,implicit:!0})],Q.prototype,"dNSName",void 0);s([l({type:f.Any,context:3,implicit:!0})],Q.prototype,"x400Address",void 0);s([l({type:be,context:4,implicit:!1})],Q.prototype,"directoryName",void 0);s([l({type:Es,context:5})],Q.prototype,"ediPartyName",void 0);s([l({type:f.IA5String,context:6,implicit:!0})],Q.prototype,"uniformResourceIdentifier",void 0);s([l({type:f.OctetString,context:7,implicit:!0,converter:ww})],Q.prototype,"iPAddress",void 0);s([l({type:f.ObjectIdentifier,context:8,implicit:!0})],Q.prototype,"registeredID",void 0);Q=s([b({type:m.Choice})],Q);var gn="1.3.6.1.5.5.7",yn=`${gn}.1`,Rh=`${gn}.2`,po=`${gn}.3`,Ic=`${gn}.48`,WA=`${Rh}.1`,FA=`${Rh}.2`,Au=`${Ic}.1`,Eu=`${Ic}.2`,Su=`${Ic}.3`,ku=`${Ic}.5`,ne="2.5.29";var Cu,_c=`${yn}.1`,jr=class{accessMethod="";accessLocation=new Q;constructor(e={}){Object.assign(this,e)}};s([l({type:f.ObjectIdentifier})],jr.prototype,"accessMethod",void 0);s([l({type:Q})],jr.prototype,"accessLocation",void 0);var fo=Cu=class extends j{constructor(e){super(e),Object.setPrototypeOf(this,Cu.prototype)}};fo=Cu=s([b({type:m.Sequence,itemType:jr})],fo);var Ss=`${ne}.35`,ho=class extends R{},yr=class{keyIdentifier;authorityCertIssuer;authorityCertSerialNumber;constructor(e={}){e&&Object.assign(this,e)}};s([l({type:ho,context:0,optional:!0,implicit:!0})],yr.prototype,"keyIdentifier",void 0);s([l({type:Q,context:1,optional:!0,implicit:!0,repeated:"sequence"})],yr.prototype,"authorityCertIssuer",void 0);s([l({type:f.Integer,context:2,optional:!0,implicit:!0,converter:le})],yr.prototype,"authorityCertSerialNumber",void 0);var ai=`${ne}.19`,Hr=class{cA=!1;pathLenConstraint;constructor(e={}){Object.assign(this,e)}};s([l({type:f.Boolean,defaultValue:!1})],Hr.prototype,"cA",void 0);s([l({type:f.Integer,optional:!0})],Hr.prototype,"pathLenConstraint",void 0);var Tu,ve=Tu=class extends j{constructor(e){super(e),Object.setPrototypeOf(this,Tu.prototype)}};ve=Tu=s([b({type:m.Sequence,itemType:Q})],ve);var Iu,xw=`${ne}.29`,Mh=Iu=class extends ve{constructor(e){super(e),Object.setPrototypeOf(this,Iu.prototype)}};Mh=Iu=s([b({type:m.Sequence})],Mh);var _u,Rc=`${ne}.32`,EE=`${Rc}.0`,Ur=class{ia5String;visibleString;bmpString;utf8String;constructor(e={}){Object.assign(this,e)}toString(){return this.ia5String||this.visibleString||this.bmpString||this.utf8String||""}};s([l({type:f.IA5String})],Ur.prototype,"ia5String",void 0);s([l({type:f.VisibleString})],Ur.prototype,"visibleString",void 0);s([l({type:f.BmpString})],Ur.prototype,"bmpString",void 0);s([l({type:f.Utf8String})],Ur.prototype,"utf8String",void 0);Ur=s([b({type:m.Choice})],Ur);var ks=class{organization=new Ur;noticeNumbers=[];constructor(e={}){Object.assign(this,e)}};s([l({type:Ur})],ks.prototype,"organization",void 0);s([l({type:f.Integer,repeated:"sequence"})],ks.prototype,"noticeNumbers",void 0);var Cs=class{noticeRef;explicitText;constructor(e={}){Object.assign(this,e)}};s([l({type:ks,optional:!0})],Cs.prototype,"noticeRef",void 0);s([l({type:Ur,optional:!0})],Cs.prototype,"explicitText",void 0);var Bc=class{cPSuri;userNotice;constructor(e={}){Object.assign(this,e)}};s([l({type:f.IA5String})],Bc.prototype,"cPSuri",void 0);s([l({type:Cs})],Bc.prototype,"userNotice",void 0);Bc=s([b({type:m.Choice})],Bc);var Ts=class{policyQualifierId="";qualifier=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};s([l({type:f.ObjectIdentifier})],Ts.prototype,"policyQualifierId",void 0);s([l({type:f.Any})],Ts.prototype,"qualifier",void 0);var mo=class{policyIdentifier="";policyQualifiers;constructor(e={}){Object.assign(this,e)}};s([l({type:f.ObjectIdentifier})],mo.prototype,"policyIdentifier",void 0);s([l({type:Ts,repeated:"sequence",optional:!0})],mo.prototype,"policyQualifiers",void 0);var Is=_u=class extends j{constructor(e){super(e),Object.setPrototypeOf(this,_u.prototype)}};Is=_u=s([b({type:m.Sequence,itemType:mo})],Is);var RE=`${ne}.20`,_s=class{value;constructor(e=0){this.value=e}};s([l({type:f.Integer})],_s.prototype,"value",void 0);_s=s([b({type:m.Choice})],_s);var jE=`${ne}.27`,Ph=class extends _s{};Ph=s([b({type:m.Choice})],Ph);var Bu,Mc=`${ne}.31`,Ft;(function(t){t[t.unused=1]="unused",t[t.keyCompromise=2]="keyCompromise",t[t.cACompromise=4]="cACompromise",t[t.affiliationChanged=8]="affiliationChanged",t[t.superseded=16]="superseded",t[t.cessationOfOperation=32]="cessationOfOperation",t[t.certificateHold=64]="certificateHold",t[t.privilegeWithdrawn=128]="privilegeWithdrawn",t[t.aACompromise=256]="aACompromise"})(Ft||(Ft={}));var Bs=class extends Tt{toJSON(){let e=[],r=this.toNumber();return r&Ft.aACompromise&&e.push("aACompromise"),r&Ft.affiliationChanged&&e.push("affiliationChanged"),r&Ft.cACompromise&&e.push("cACompromise"),r&Ft.certificateHold&&e.push("certificateHold"),r&Ft.cessationOfOperation&&e.push("cessationOfOperation"),r&Ft.keyCompromise&&e.push("keyCompromise"),r&Ft.privilegeWithdrawn&&e.push("privilegeWithdrawn"),r&Ft.superseded&&e.push("superseded"),r&Ft.unused&&e.push("unused"),e}toString(){return`[${this.toJSON().join(", ")}]`}},Gr=class{fullName;nameRelativeToCRLIssuer;constructor(e={}){Object.assign(this,e)}};s([l({type:Q,context:0,repeated:"sequence",implicit:!0})],Gr.prototype,"fullName",void 0);s([l({type:hn,context:1,implicit:!0})],Gr.prototype,"nameRelativeToCRLIssuer",void 0);Gr=s([b({type:m.Choice})],Gr);var br=class{distributionPoint;reasons;cRLIssuer;constructor(e={}){Object.assign(this,e)}};s([l({type:Gr,context:0,optional:!0})],br.prototype,"distributionPoint",void 0);s([l({type:Bs,context:1,optional:!0,implicit:!0})],br.prototype,"reasons",void 0);s([l({type:Q,context:2,optional:!0,repeated:"sequence",implicit:!0})],br.prototype,"cRLIssuer",void 0);var bn=Bu=class extends j{constructor(e){super(e),Object.setPrototypeOf(this,Bu.prototype)}};bn=Bu=s([b({type:m.Sequence,itemType:br})],bn);var Ru,ZE=`${ne}.46`,Nh=Ru=class extends bn{constructor(e){super(e),Object.setPrototypeOf(this,Ru.prototype)}};Nh=Ru=s([b({type:m.Sequence,itemType:br})],Nh);var sS=`${ne}.28`,Bt=class t{static ONLY=!1;distributionPoint;onlyContainsUserCerts=t.ONLY;onlyContainsCACerts=t.ONLY;onlySomeReasons;indirectCRL=t.ONLY;onlyContainsAttributeCerts=t.ONLY;constructor(e={}){Object.assign(this,e)}};s([l({type:Gr,context:0,optional:!0})],Bt.prototype,"distributionPoint",void 0);s([l({type:f.Boolean,context:1,defaultValue:Bt.ONLY,implicit:!0})],Bt.prototype,"onlyContainsUserCerts",void 0);s([l({type:f.Boolean,context:2,defaultValue:Bt.ONLY,implicit:!0})],Bt.prototype,"onlyContainsCACerts",void 0);s([l({type:Bs,context:3,optional:!0,implicit:!0})],Bt.prototype,"onlySomeReasons",void 0);s([l({type:f.Boolean,context:4,defaultValue:Bt.ONLY,implicit:!0})],Bt.prototype,"indirectCRL",void 0);s([l({type:f.Boolean,context:5,defaultValue:Bt.ONLY,implicit:!0})],Bt.prototype,"onlyContainsAttributeCerts",void 0);var Mu=`${ne}.21`,Rs;(function(t){t[t.unspecified=0]="unspecified",t[t.keyCompromise=1]="keyCompromise",t[t.cACompromise=2]="cACompromise",t[t.affiliationChanged=3]="affiliationChanged",t[t.superseded=4]="superseded",t[t.cessationOfOperation=5]="cessationOfOperation",t[t.certificateHold=6]="certificateHold",t[t.removeFromCRL=8]="removeFromCRL",t[t.privilegeWithdrawn=9]="privilegeWithdrawn",t[t.aACompromise=10]="aACompromise"})(Rs||(Rs={}));var ci=class{reason=Rs.unspecified;constructor(e=Rs.unspecified){this.reason=e}toJSON(){return Rs[this.reason]}toString(){return this.toJSON()}};s([l({type:f.Enumerated})],ci.prototype,"reason",void 0);ci=s([b({type:m.Choice})],ci);var Pu,li=`${ne}.37`,go=Pu=class extends j{constructor(e){super(e),Object.setPrototypeOf(this,Pu.prototype)}};go=Pu=s([b({type:m.Sequence,itemType:f.ObjectIdentifier})],go);var yS=`${li}.0`,Oh=`${po}.1`,Dh=`${po}.2`,Lh=`${po}.3`,jh=`${po}.4`,Hh=`${po}.8`,Uh=`${po}.9`;var AS=`${ne}.54`,Nu=class{value;constructor(e=new ArrayBuffer(0)){this.value=e}};s([l({type:f.Integer,converter:le})],Nu.prototype,"value",void 0);Nu=s([b({type:m.Choice})],Nu);var Ou=`${ne}.24`,ui=class{value=new Date;constructor(e){e&&(this.value=e)}};s([l({type:f.GeneralizedTime})],ui.prototype,"value",void 0);ui=s([b({type:m.Choice})],ui);var Du,Lu=`${ne}.18`,Gh=Du=class extends ve{constructor(e){super(e),Object.setPrototypeOf(this,Du.prototype)}};Gh=Du=s([b({type:m.Sequence})],Gh);var Pc=`${ne}.15`,zt;(function(t){t[t.digitalSignature=1]="digitalSignature",t[t.nonRepudiation=2]="nonRepudiation",t[t.keyEncipherment=4]="keyEncipherment",t[t.dataEncipherment=8]="dataEncipherment",t[t.keyAgreement=16]="keyAgreement",t[t.keyCertSign=32]="keyCertSign",t[t.cRLSign=64]="cRLSign",t[t.encipherOnly=128]="encipherOnly",t[t.decipherOnly=256]="decipherOnly"})(zt||(zt={}));var di=class extends Tt{toJSON(){let e=this.toNumber(),r=[];return e&zt.cRLSign&&r.push("crlSign"),e&zt.dataEncipherment&&r.push("dataEncipherment"),e&zt.decipherOnly&&r.push("decipherOnly"),e&zt.digitalSignature&&r.push("digitalSignature"),e&zt.encipherOnly&&r.push("encipherOnly"),e&zt.keyAgreement&&r.push("keyAgreement"),e&zt.keyCertSign&&r.push("keyCertSign"),e&zt.keyEncipherment&&r.push("keyEncipherment"),e&zt.nonRepudiation&&r.push("nonRepudiation"),r}toString(){return`[${this.toJSON().join(", ")}]`}};var ju,VS=`${ne}.30`,pi=class{base=new Q;minimum=0;maximum;constructor(e={}){Object.assign(this,e)}};s([l({type:Q})],pi.prototype,"base",void 0);s([l({type:f.Integer,context:0,defaultValue:0,implicit:!0})],pi.prototype,"minimum",void 0);s([l({type:f.Integer,context:1,optional:!0,implicit:!0})],pi.prototype,"maximum",void 0);var Nc=ju=class extends j{constructor(e){super(e),Object.setPrototypeOf(this,ju.prototype)}};Nc=ju=s([b({type:m.Sequence,itemType:pi})],Nc);var Oc=class{permittedSubtrees;excludedSubtrees;constructor(e={}){Object.assign(this,e)}};s([l({type:Nc,context:0,optional:!0,implicit:!0})],Oc.prototype,"permittedSubtrees",void 0);s([l({type:Nc,context:1,optional:!0,implicit:!0})],Oc.prototype,"excludedSubtrees",void 0);var XS=`${ne}.36`,Dc=class{requireExplicitPolicy;inhibitPolicyMapping;constructor(e={}){Object.assign(this,e)}};s([l({type:f.Integer,context:0,implicit:!0,optional:!0,converter:le})],Dc.prototype,"requireExplicitPolicy",void 0);s([l({type:f.Integer,context:1,implicit:!0,optional:!0,converter:le})],Dc.prototype,"inhibitPolicyMapping",void 0);var Hu,ek=`${ne}.33`,Ms=class{issuerDomainPolicy="";subjectDomainPolicy="";constructor(e={}){Object.assign(this,e)}};s([l({type:f.ObjectIdentifier})],Ms.prototype,"issuerDomainPolicy",void 0);s([l({type:f.ObjectIdentifier})],Ms.prototype,"subjectDomainPolicy",void 0);var $h=Hu=class extends j{constructor(e){super(e),Object.setPrototypeOf(this,Hu.prototype)}};$h=Hu=s([b({type:m.Sequence,itemType:Ms})],$h);var Uu,hi=`${ne}.17`,fi=Uu=class extends ve{constructor(e){super(e),Object.setPrototypeOf(this,Uu.prototype)}};fi=Uu=s([b({type:m.Sequence})],fi);var Ue=class{type="";values=[];constructor(e={}){Object.assign(this,e)}};s([l({type:f.ObjectIdentifier})],Ue.prototype,"type",void 0);s([l({type:f.Any,repeated:"set"})],Ue.prototype,"values",void 0);var Gu,gk=`${ne}.9`,Vh=Gu=class extends j{constructor(e){super(e),Object.setPrototypeOf(this,Gu.prototype)}};Vh=Gu=s([b({type:m.Sequence,itemType:Ue})],Vh);var Lc=`${ne}.14`,ct=class extends ho{};var kk=`${ne}.16`,jc=class{notBefore;notAfter;constructor(e={}){Object.assign(this,e)}};s([l({type:f.GeneralizedTime,context:0,implicit:!0,optional:!0})],jc.prototype,"notBefore",void 0);s([l({type:f.GeneralizedTime,context:1,implicit:!0,optional:!0})],jc.prototype,"notAfter",void 0);var Ps;(function(t){t[t.keyUpdateAllowed=1]="keyUpdateAllowed",t[t.newExtensions=2]="newExtensions",t[t.pKIXCertificate=4]="pKIXCertificate"})(Ps||(Ps={}));var Hc=class extends Tt{toJSON(){let e=[],r=this.toNumber();return r&Ps.pKIXCertificate&&e.push("pKIXCertificate"),r&Ps.newExtensions&&e.push("newExtensions"),r&Ps.keyUpdateAllowed&&e.push("keyUpdateAllowed"),e}toString(){return`[${this.toJSON().join(", ")}]`}},Uc=class{entrustVers="";entrustInfoFlags=new Hc;constructor(e={}){Object.assign(this,e)}};s([l({type:f.GeneralString})],Uc.prototype,"entrustVers",void 0);s([l({type:Hc})],Uc.prototype,"entrustInfoFlags",void 0);var $u,Nk=`${yn}.11`,Kh=$u=class extends j{constructor(e){super(e),Object.setPrototypeOf(this,$u.prototype)}};Kh=$u=s([b({type:m.Sequence,itemType:jr})],Kh);var T=class t{algorithm="";parameters;constructor(e={}){Object.assign(this,e)}isEqual(e){return e instanceof t&&e.algorithm==this.algorithm&&(e.parameters&&this.parameters&&bs(e.parameters,this.parameters)||e.parameters===this.parameters)}};s([l({type:f.ObjectIdentifier})],T.prototype,"algorithm",void 0);s([l({type:f.Any,optional:!0})],T.prototype,"parameters",void 0);var je=class{algorithm=new T;subjectPublicKey=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};s([l({type:T})],je.prototype,"algorithm",void 0);s([l({type:f.BitString})],je.prototype,"subjectPublicKey",void 0);var Ee=class{utcTime;generalTime;constructor(e){if(e)if(typeof e=="string"||typeof e=="number"||e instanceof Date){let r=new Date(e);r.setMilliseconds(0),r.getUTCFullYear()>2049?this.generalTime=r:this.utcTime=r}else Object.assign(this,e)}getTime(){let e=this.utcTime||this.generalTime;if(!e)throw new Error("Cannot get time from CHOICE object");return e}};s([l({type:f.UTCTime})],Ee.prototype,"utcTime",void 0);s([l({type:f.GeneralizedTime})],Ee.prototype,"generalTime",void 0);Ee=s([b({type:m.Choice})],Ee);var wn=class{notBefore=new Ee(new Date);notAfter=new Ee(new Date);constructor(e){e&&(this.notBefore=new Ee(e.notBefore),this.notAfter=new Ee(e.notAfter))}};s([l({type:Ee})],wn.prototype,"notBefore",void 0);s([l({type:Ee})],wn.prototype,"notAfter",void 0);var Vu,et=class t{static CRITICAL=!1;extnID="";critical=t.CRITICAL;extnValue=new R;constructor(e={}){Object.assign(this,e)}};s([l({type:f.ObjectIdentifier})],et.prototype,"extnID",void 0);s([l({type:f.Boolean,defaultValue:et.CRITICAL})],et.prototype,"critical",void 0);s([l({type:R})],et.prototype,"extnValue",void 0);var Rt=Vu=class extends j{constructor(e){super(e),Object.setPrototypeOf(this,Vu.prototype)}};Rt=Vu=s([b({type:m.Sequence,itemType:et})],Rt);var $r;(function(t){t[t.v1=0]="v1",t[t.v2=1]="v2",t[t.v3=2]="v3"})($r||($r={}));var ze=class{version=$r.v1;serialNumber=new ArrayBuffer(0);signature=new T;issuer=new be;validity=new wn;subject=new be;subjectPublicKeyInfo=new je;issuerUniqueID;subjectUniqueID;extensions;constructor(e={}){Object.assign(this,e)}};s([l({type:f.Integer,context:0,defaultValue:$r.v1})],ze.prototype,"version",void 0);s([l({type:f.Integer,converter:le})],ze.prototype,"serialNumber",void 0);s([l({type:T})],ze.prototype,"signature",void 0);s([l({type:be})],ze.prototype,"issuer",void 0);s([l({type:wn})],ze.prototype,"validity",void 0);s([l({type:be})],ze.prototype,"subject",void 0);s([l({type:je})],ze.prototype,"subjectPublicKeyInfo",void 0);s([l({type:f.BitString,context:1,implicit:!0,optional:!0})],ze.prototype,"issuerUniqueID",void 0);s([l({type:f.BitString,context:2,implicit:!0,optional:!0})],ze.prototype,"subjectUniqueID",void 0);s([l({type:Rt,context:3,optional:!0})],ze.prototype,"extensions",void 0);var ke=class{tbsCertificate=new ze;tbsCertificateRaw;signatureAlgorithm=new T;signatureValue=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};s([l({type:ze,raw:!0})],ke.prototype,"tbsCertificate",void 0);s([l({type:T})],ke.prototype,"signatureAlgorithm",void 0);s([l({type:f.BitString})],ke.prototype,"signatureValue",void 0);var qt=class{userCertificate=new ArrayBuffer(0);revocationDate=new Ee;crlEntryExtensions;constructor(e={}){Object.assign(this,e)}};s([l({type:f.Integer,converter:le})],qt.prototype,"userCertificate",void 0);s([l({type:Ee})],qt.prototype,"revocationDate",void 0);s([l({type:et,optional:!0,repeated:"sequence"})],qt.prototype,"crlEntryExtensions",void 0);var gt=class{version;signature=new T;issuer=new be;thisUpdate=new Ee;nextUpdate;revokedCertificates;crlExtensions;constructor(e={}){Object.assign(this,e)}};s([l({type:f.Integer,optional:!0})],gt.prototype,"version",void 0);s([l({type:T})],gt.prototype,"signature",void 0);s([l({type:be})],gt.prototype,"issuer",void 0);s([l({type:Ee})],gt.prototype,"thisUpdate",void 0);s([l({type:Ee,optional:!0})],gt.prototype,"nextUpdate",void 0);s([l({type:qt,repeated:"sequence",optional:!0})],gt.prototype,"revokedCertificates",void 0);s([l({type:et,optional:!0,context:0,repeated:"sequence"})],gt.prototype,"crlExtensions",void 0);var xn=class{tbsCertList=new gt;tbsCertListRaw;signatureAlgorithm=new T;signature=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};s([l({type:gt,raw:!0})],xn.prototype,"tbsCertList",void 0);s([l({type:T})],xn.prototype,"signatureAlgorithm",void 0);s([l({type:f.BitString})],xn.prototype,"signature",void 0);var Fh={"2.5.4.6":"C","2.5.4.10":"O","2.5.4.11":"OU","2.5.4.3":"CN"};function mi(t){let e=xe.parse(t,ke),r=e.tbsCertificate,n={combined:""};r.issuer.forEach(([a])=>{let c=Fh[a.type];c&&(n[c]=a.value.toString())}),n.combined=zh(n);let o={combined:""};r.subject.forEach(([a])=>{let c=Fh[a.type];c&&(o[c]=a.value.toString())}),o.combined=zh(o);let i=!1;if(r.extensions)for(let a of r.extensions)a.extnID===ai&&(i=xe.parse(a.extnValue,Hr).cA);return{issuer:n,subject:o,version:r.version,basicConstraintsCA:i,notBefore:r.validity.notBefore.getTime(),notAfter:r.validity.notAfter.getTime(),parsedCertificate:e}}function zh(t){let e=[];return t.C&&e.push(t.C),t.O&&e.push(t.O),t.OU&&e.push(t.OU),t.CN&&e.push(t.CN),e.join(" : ")}var aL=Fa(Ku(),1);var _=Fa(Ql());var Xt=class{issuer=new be;serialNumber=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};s([l({type:be})],Xt.prototype,"issuer",void 0);s([l({type:f.Integer,converter:le})],Xt.prototype,"serialNumber",void 0);var yo=class{subjectKeyIdentifier;issuerAndSerialNumber;constructor(e={}){Object.assign(this,e)}};s([l({type:ct,context:0,implicit:!0})],yo.prototype,"subjectKeyIdentifier",void 0);s([l({type:Xt})],yo.prototype,"issuerAndSerialNumber",void 0);yo=s([b({type:m.Choice})],yo);var He;(function(t){t[t.v0=0]="v0",t[t.v1=1]="v1",t[t.v2=2]="v2",t[t.v3=3]="v3",t[t.v4=4]="v4",t[t.v5=5]="v5"})(He||(He={}));var bo=class extends T{};bo=s([b({type:m.Sequence})],bo);var Ns=class extends T{};Ns=s([b({type:m.Sequence})],Ns);var lt=class extends T{};lt=s([b({type:m.Sequence})],lt);var Os=class extends T{};Os=s([b({type:m.Sequence})],Os);var Xh=class extends T{};Xh=s([b({type:m.Sequence})],Xh);var Gc=class extends T{};Gc=s([b({type:m.Sequence})],Gc);var Yt=class{attrType="";attrValues=[];constructor(e={}){Object.assign(this,e)}};s([l({type:f.ObjectIdentifier})],Yt.prototype,"attrType",void 0);s([l({type:f.Any,repeated:"set"})],Yt.prototype,"attrValues",void 0);var Wu,ut=class{version=He.v0;sid=new yo;digestAlgorithm=new bo;signedAttrs;signedAttrsRaw;signatureAlgorithm=new Ns;signature=new R;unsignedAttrs;constructor(e={}){Object.assign(this,e)}};s([l({type:f.Integer})],ut.prototype,"version",void 0);s([l({type:yo})],ut.prototype,"sid",void 0);s([l({type:bo})],ut.prototype,"digestAlgorithm",void 0);s([l({type:Yt,repeated:"set",context:0,implicit:!0,optional:!0,raw:!0})],ut.prototype,"signedAttrs",void 0);s([l({type:Ns})],ut.prototype,"signatureAlgorithm",void 0);s([l({type:R})],ut.prototype,"signature",void 0);s([l({type:Yt,repeated:"set",context:1,implicit:!0,optional:!0})],ut.prototype,"unsignedAttrs",void 0);var Ds=Wu=class extends j{constructor(e){super(e),Object.setPrototypeOf(this,Wu.prototype)}};Ds=Wu=s([b({type:m.Set,itemType:ut})],Ds);var Yh=class extends ut{};Yh=s([b({type:m.Sequence})],Yh);var Jh=class extends Ee{};Jh=s([b({type:m.Choice})],Jh);var Ls=class{acIssuer=new Q;acSerial=0;attrs=[];constructor(e={}){Object.assign(this,e)}};s([l({type:Q})],Ls.prototype,"acIssuer",void 0);s([l({type:f.Integer})],Ls.prototype,"acSerial",void 0);s([l({type:Ue,repeated:"sequence"})],Ls.prototype,"attrs",void 0);var Fu,js=Fu=class extends j{constructor(e){super(e),Object.setPrototypeOf(this,Fu.prototype)}};js=Fu=s([b({type:m.Sequence,itemType:f.ObjectIdentifier})],js);var gi=class{pathLenConstraint;permittedAttrs;excludedAttrs;permitUnSpecified=!0;constructor(e={}){Object.assign(this,e)}};s([l({type:f.Integer,optional:!0})],gi.prototype,"pathLenConstraint",void 0);s([l({type:js,implicit:!0,context:0,optional:!0})],gi.prototype,"permittedAttrs",void 0);s([l({type:js,implicit:!0,context:1,optional:!0})],gi.prototype,"excludedAttrs",void 0);s([l({type:f.Boolean,defaultValue:!0})],gi.prototype,"permitUnSpecified",void 0);var Mt=class{issuer=new ve;serial=new ArrayBuffer(0);issuerUID=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};s([l({type:ve})],Mt.prototype,"issuer",void 0);s([l({type:f.Integer,converter:le})],Mt.prototype,"serial",void 0);s([l({type:f.BitString,optional:!0})],Mt.prototype,"issuerUID",void 0);var zu;(function(t){t[t.publicKey=0]="publicKey",t[t.publicKeyCert=1]="publicKeyCert",t[t.otherObjectTypes=2]="otherObjectTypes"})(zu||(zu={}));var Pt=class{digestedObjectType=zu.publicKey;otherObjectTypeID;digestAlgorithm=new T;objectDigest=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};s([l({type:f.Enumerated})],Pt.prototype,"digestedObjectType",void 0);s([l({type:f.ObjectIdentifier,optional:!0})],Pt.prototype,"otherObjectTypeID",void 0);s([l({type:T})],Pt.prototype,"digestAlgorithm",void 0);s([l({type:f.BitString})],Pt.prototype,"objectDigest",void 0);var wo=class{issuerName;baseCertificateID;objectDigestInfo;constructor(e={}){Object.assign(this,e)}};s([l({type:ve,optional:!0})],wo.prototype,"issuerName",void 0);s([l({type:Mt,context:0,implicit:!0,optional:!0})],wo.prototype,"baseCertificateID",void 0);s([l({type:Pt,context:1,implicit:!0,optional:!0})],wo.prototype,"objectDigestInfo",void 0);var xo=class{v1Form;v2Form;constructor(e={}){Object.assign(this,e)}};s([l({type:Q,repeated:"sequence"})],xo.prototype,"v1Form",void 0);s([l({type:wo,context:0,implicit:!0})],xo.prototype,"v2Form",void 0);xo=s([b({type:m.Choice})],xo);var vo=class{notBeforeTime=new Date;notAfterTime=new Date;constructor(e={}){Object.assign(this,e)}};s([l({type:f.GeneralizedTime})],vo.prototype,"notBeforeTime",void 0);s([l({type:f.GeneralizedTime})],vo.prototype,"notAfterTime",void 0);var vn=class{baseCertificateID;entityName;objectDigestInfo;constructor(e={}){Object.assign(this,e)}};s([l({type:Mt,implicit:!0,context:0,optional:!0})],vn.prototype,"baseCertificateID",void 0);s([l({type:ve,implicit:!0,context:1,optional:!0})],vn.prototype,"entityName",void 0);s([l({type:Pt,implicit:!0,context:2,optional:!0})],vn.prototype,"objectDigestInfo",void 0);var qu;(function(t){t[t.v2=1]="v2"})(qu||(qu={}));var dt=class{version=qu.v2;holder=new vn;issuer=new xo;signature=new T;serialNumber=new ArrayBuffer(0);attrCertValidityPeriod=new vo;attributes=[];issuerUniqueID;extensions;constructor(e={}){Object.assign(this,e)}};s([l({type:f.Integer})],dt.prototype,"version",void 0);s([l({type:vn})],dt.prototype,"holder",void 0);s([l({type:xo})],dt.prototype,"issuer",void 0);s([l({type:T})],dt.prototype,"signature",void 0);s([l({type:f.Integer,converter:le})],dt.prototype,"serialNumber",void 0);s([l({type:vo})],dt.prototype,"attrCertValidityPeriod",void 0);s([l({type:Ue,repeated:"sequence"})],dt.prototype,"attributes",void 0);s([l({type:f.BitString,optional:!0})],dt.prototype,"issuerUniqueID",void 0);s([l({type:Rt,optional:!0})],dt.prototype,"extensions",void 0);var Ao=class{acinfo=new dt;signatureAlgorithm=new T;signatureValue=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};s([l({type:dt})],Ao.prototype,"acinfo",void 0);s([l({type:T})],Ao.prototype,"signatureAlgorithm",void 0);s([l({type:f.BitString})],Ao.prototype,"signatureValue",void 0);var Hs;(function(t){t[t.unmarked=1]="unmarked",t[t.unclassified=2]="unclassified",t[t.restricted=4]="restricted",t[t.confidential=8]="confidential",t[t.secret=16]="secret",t[t.topSecret=32]="topSecret"})(Hs||(Hs={}));var yi=class extends Tt{};var bi=class{type="";value=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};s([l({type:f.ObjectIdentifier,implicit:!0,context:0})],bi.prototype,"type",void 0);s([l({type:f.Any,implicit:!0,context:1})],bi.prototype,"value",void 0);var Us=class{policyId="";classList=new yi(Hs.unclassified);securityCategories;constructor(e={}){Object.assign(this,e)}};s([l({type:f.ObjectIdentifier})],Us.prototype,"policyId",void 0);s([l({type:yi,defaultValue:new yi(Hs.unclassified)})],Us.prototype,"classList",void 0);s([l({type:bi,repeated:"set"})],Us.prototype,"securityCategories",void 0);var wi=class{cotets;oid;string;constructor(e={}){Object.assign(this,e)}};s([l({type:R})],wi.prototype,"cotets",void 0);s([l({type:f.ObjectIdentifier})],wi.prototype,"oid",void 0);s([l({type:f.Utf8String})],wi.prototype,"string",void 0);var $c=class{policyAuthority;values=[];constructor(e={}){Object.assign(this,e)}};s([l({type:ve,implicit:!0,context:0,optional:!0})],$c.prototype,"policyAuthority",void 0);s([l({type:wi,repeated:"sequence"})],$c.prototype,"values",void 0);var _I=`${yn}.4`,BI=`${yn}.6`,RI=`${yn}.10`,MI=`${ne}.55`,Gs=`${gn}.10`,PI=`${Gs}.1`,NI=`${Gs}.2`,OI=`${Gs}.3`,DI=`${Gs}.4`,LI=`${Gs}.6`,Xu="2.5.4",jI=`${Xu}.72`;var Yu,xi=class{targetCertificate=new Mt;targetName;certDigestInfo;constructor(e={}){Object.assign(this,e)}};s([l({type:Mt})],xi.prototype,"targetCertificate",void 0);s([l({type:Q,optional:!0})],xi.prototype,"targetName",void 0);s([l({type:Pt,optional:!0})],xi.prototype,"certDigestInfo",void 0);var vi=class{targetName;targetGroup;targetCert;constructor(e={}){Object.assign(this,e)}};s([l({type:Q,context:0,implicit:!0})],vi.prototype,"targetName",void 0);s([l({type:Q,context:1,implicit:!0})],vi.prototype,"targetGroup",void 0);s([l({type:xi,context:2,implicit:!0})],vi.prototype,"targetCert",void 0);vi=s([b({type:m.Choice})],vi);var Vc=Yu=class extends j{constructor(e){super(e),Object.setPrototypeOf(this,Yu.prototype)}};Vc=Yu=s([b({type:m.Sequence,itemType:vi})],Vc);var Ju,Qh=Ju=class extends j{constructor(e){super(e),Object.setPrototypeOf(this,Ju.prototype)}};Qh=Ju=s([b({type:m.Sequence,itemType:Vc})],Qh);var Kc=class{roleAuthority;roleName;constructor(e={}){Object.assign(this,e)}};s([l({type:ve,implicit:!0,context:0,optional:!0})],Kc.prototype,"roleAuthority",void 0);s([l({type:Q,implicit:!0,context:1})],Kc.prototype,"roleName",void 0);var $s=class{service=new Q;ident=new Q;authInfo;constructor(e={}){Object.assign(this,e)}};s([l({type:Q})],$s.prototype,"service",void 0);s([l({type:Q})],$s.prototype,"ident",void 0);s([l({type:R,optional:!0})],$s.prototype,"authInfo",void 0);var Qu,Vs=class{otherCertFormat="";otherCert=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};s([l({type:f.ObjectIdentifier})],Vs.prototype,"otherCertFormat",void 0);s([l({type:f.Any})],Vs.prototype,"otherCert",void 0);var An=class{certificate;v2AttrCert;other;constructor(e={}){Object.assign(this,e)}};s([l({type:ke})],An.prototype,"certificate",void 0);s([l({type:Ao,context:2,implicit:!0})],An.prototype,"v2AttrCert",void 0);s([l({type:Vs,context:3,implicit:!0})],An.prototype,"other",void 0);An=s([b({type:m.Choice})],An);var En=Qu=class extends j{constructor(e){super(e),Object.setPrototypeOf(this,Qu.prototype)}};En=Qu=s([b({type:m.Set,itemType:An})],En);var tt=class{contentType="";content=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};s([l({type:f.ObjectIdentifier})],tt.prototype,"contentType",void 0);s([l({type:f.Any,context:0})],tt.prototype,"content",void 0);var Eo=class{single;any;constructor(e={}){Object.assign(this,e)}};s([l({type:R})],Eo.prototype,"single",void 0);s([l({type:f.Any})],Eo.prototype,"any",void 0);Eo=s([b({type:m.Choice})],Eo);var So=class{eContentType="";eContent;constructor(e={}){Object.assign(this,e)}};s([l({type:f.ObjectIdentifier})],So.prototype,"eContentType",void 0);s([l({type:Eo,context:0,optional:!0})],So.prototype,"eContent",void 0);var Ks=class{value;constructedValue;constructor(e={}){Object.assign(this,e)}};s([l({type:R,context:0,implicit:!0,optional:!0})],Ks.prototype,"value",void 0);s([l({type:R,converter:_h,context:0,implicit:!0,optional:!0,repeated:"sequence"})],Ks.prototype,"constructedValue",void 0);Ks=s([b({type:m.Choice})],Ks);var Sn=class{contentType="";contentEncryptionAlgorithm=new Os;encryptedContent;constructor(e={}){Object.assign(this,e)}};s([l({type:f.ObjectIdentifier})],Sn.prototype,"contentType",void 0);s([l({type:Os})],Sn.prototype,"contentEncryptionAlgorithm",void 0);s([l({type:Ks,optional:!0})],Sn.prototype,"encryptedContent",void 0);var kn=class{keyAttrId="";keyAttr;constructor(e={}){Object.assign(this,e)}};s([l({type:f.ObjectIdentifier})],kn.prototype,"keyAttrId",void 0);s([l({type:f.Any,optional:!0})],kn.prototype,"keyAttr",void 0);var Zu,Ai=class{subjectKeyIdentifier=new ct;date;other;constructor(e={}){Object.assign(this,e)}};s([l({type:ct})],Ai.prototype,"subjectKeyIdentifier",void 0);s([l({type:f.GeneralizedTime,optional:!0})],Ai.prototype,"date",void 0);s([l({type:kn,optional:!0})],Ai.prototype,"other",void 0);var Ei=class{rKeyId;issuerAndSerialNumber;constructor(e={}){Object.assign(this,e)}};s([l({type:Ai,context:0,implicit:!0,optional:!0})],Ei.prototype,"rKeyId",void 0);s([l({type:Xt,optional:!0})],Ei.prototype,"issuerAndSerialNumber",void 0);Ei=s([b({type:m.Choice})],Ei);var Ws=class{rid=new Ei;encryptedKey=new R;constructor(e={}){Object.assign(this,e)}};s([l({type:Ei})],Ws.prototype,"rid",void 0);s([l({type:R})],Ws.prototype,"encryptedKey",void 0);var Wc=Zu=class extends j{constructor(e){super(e),Object.setPrototypeOf(this,Zu.prototype)}};Wc=Zu=s([b({type:m.Sequence,itemType:Ws})],Wc);var Fs=class{algorithm=new T;publicKey=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};s([l({type:T})],Fs.prototype,"algorithm",void 0);s([l({type:f.BitString})],Fs.prototype,"publicKey",void 0);var ko=class{subjectKeyIdentifier;originatorKey;issuerAndSerialNumber;constructor(e={}){Object.assign(this,e)}};s([l({type:ct,context:0,implicit:!0,optional:!0})],ko.prototype,"subjectKeyIdentifier",void 0);s([l({type:Fs,context:1,implicit:!0,optional:!0})],ko.prototype,"originatorKey",void 0);s([l({type:Xt,optional:!0})],ko.prototype,"issuerAndSerialNumber",void 0);ko=s([b({type:m.Choice})],ko);var Vr=class{version=He.v3;originator=new ko;ukm;keyEncryptionAlgorithm=new lt;recipientEncryptedKeys=new Wc;constructor(e={}){Object.assign(this,e)}};s([l({type:f.Integer})],Vr.prototype,"version",void 0);s([l({type:ko,context:0})],Vr.prototype,"originator",void 0);s([l({type:R,context:1,optional:!0})],Vr.prototype,"ukm",void 0);s([l({type:lt})],Vr.prototype,"keyEncryptionAlgorithm",void 0);s([l({type:Wc})],Vr.prototype,"recipientEncryptedKeys",void 0);var Si=class{subjectKeyIdentifier;issuerAndSerialNumber;constructor(e={}){Object.assign(this,e)}};s([l({type:ct,context:0,implicit:!0})],Si.prototype,"subjectKeyIdentifier",void 0);s([l({type:Xt})],Si.prototype,"issuerAndSerialNumber",void 0);Si=s([b({type:m.Choice})],Si);var Cn=class{version=He.v0;rid=new Si;keyEncryptionAlgorithm=new lt;encryptedKey=new R;constructor(e={}){Object.assign(this,e)}};s([l({type:f.Integer})],Cn.prototype,"version",void 0);s([l({type:Si})],Cn.prototype,"rid",void 0);s([l({type:lt})],Cn.prototype,"keyEncryptionAlgorithm",void 0);s([l({type:R})],Cn.prototype,"encryptedKey",void 0);var Co=class{keyIdentifier=new R;date;other;constructor(e={}){Object.assign(this,e)}};s([l({type:R})],Co.prototype,"keyIdentifier",void 0);s([l({type:f.GeneralizedTime,optional:!0})],Co.prototype,"date",void 0);s([l({type:kn,optional:!0})],Co.prototype,"other",void 0);var Tn=class{version=He.v4;kekid=new Co;keyEncryptionAlgorithm=new lt;encryptedKey=new R;constructor(e={}){Object.assign(this,e)}};s([l({type:f.Integer})],Tn.prototype,"version",void 0);s([l({type:Co})],Tn.prototype,"kekid",void 0);s([l({type:lt})],Tn.prototype,"keyEncryptionAlgorithm",void 0);s([l({type:R})],Tn.prototype,"encryptedKey",void 0);var In=class{version=He.v0;keyDerivationAlgorithm;keyEncryptionAlgorithm=new lt;encryptedKey=new R;constructor(e={}){Object.assign(this,e)}};s([l({type:f.Integer})],In.prototype,"version",void 0);s([l({type:Gc,context:0,optional:!0})],In.prototype,"keyDerivationAlgorithm",void 0);s([l({type:lt})],In.prototype,"keyEncryptionAlgorithm",void 0);s([l({type:R})],In.prototype,"encryptedKey",void 0);var zs=class{oriType="";oriValue=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};s([l({type:f.ObjectIdentifier})],zs.prototype,"oriType",void 0);s([l({type:f.Any})],zs.prototype,"oriValue",void 0);var Kr=class{ktri;kari;kekri;pwri;ori;constructor(e={}){Object.assign(this,e)}};s([l({type:Cn,optional:!0})],Kr.prototype,"ktri",void 0);s([l({type:Vr,context:1,implicit:!0,optional:!0})],Kr.prototype,"kari",void 0);s([l({type:Tn,context:2,implicit:!0,optional:!0})],Kr.prototype,"kekri",void 0);s([l({type:In,context:3,implicit:!0,optional:!0})],Kr.prototype,"pwri",void 0);s([l({type:zs,context:4,implicit:!0,optional:!0})],Kr.prototype,"ori",void 0);Kr=s([b({type:m.Choice})],Kr);var ed,qs=ed=class extends j{constructor(e){super(e),Object.setPrototypeOf(this,ed.prototype)}};qs=ed=s([b({type:m.Set,itemType:Kr})],qs);var td,Zh=`${gn}.16`,LB=`${Zh}.2`,jB=`${Zh}.4`,ki=class{otherRevInfoFormat="";otherRevInfo=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};s([l({type:f.ObjectIdentifier})],ki.prototype,"otherRevInfoFormat",void 0);s([l({type:f.Any})],ki.prototype,"otherRevInfo",void 0);var Fc=class{other=new ki;constructor(e={}){Object.assign(this,e)}};s([l({type:ki,context:1,implicit:!0})],Fc.prototype,"other",void 0);Fc=s([b({type:m.Choice})],Fc);var Ci=td=class extends j{constructor(e){super(e),Object.setPrototypeOf(this,td.prototype)}};Ci=td=s([b({type:m.Set,itemType:Fc})],Ci);var Ti=class{certs;crls;constructor(e={}){Object.assign(this,e)}};s([l({type:En,context:0,implicit:!0,optional:!0})],Ti.prototype,"certs",void 0);s([l({type:Ci,context:1,implicit:!0,optional:!0})],Ti.prototype,"crls",void 0);var rd,nd=rd=class extends j{constructor(e){super(e),Object.setPrototypeOf(this,rd.prototype)}};nd=rd=s([b({type:m.Set,itemType:Yt})],nd);var To=class{version=He.v0;originatorInfo;recipientInfos=new qs;encryptedContentInfo=new Sn;unprotectedAttrs;constructor(e={}){Object.assign(this,e)}};s([l({type:f.Integer})],To.prototype,"version",void 0);s([l({type:Ti,context:0,implicit:!0,optional:!0})],To.prototype,"originatorInfo",void 0);s([l({type:qs})],To.prototype,"recipientInfos",void 0);s([l({type:Sn})],To.prototype,"encryptedContentInfo",void 0);s([l({type:nd,context:1,implicit:!0,optional:!0})],To.prototype,"unprotectedAttrs",void 0);var em="1.2.840.113549.1.7.1",zc="1.2.840.113549.1.7.2";var od,qc=od=class extends j{constructor(e){super(e),Object.setPrototypeOf(this,od.prototype)}};qc=od=s([b({type:m.Set,itemType:bo})],qc);var Nt=class{version=He.v0;digestAlgorithms=new qc;encapContentInfo=new So;certificates;crls;signerInfos=new Ds;constructor(e={}){Object.assign(this,e)}};s([l({type:f.Integer})],Nt.prototype,"version",void 0);s([l({type:qc})],Nt.prototype,"digestAlgorithms",void 0);s([l({type:So})],Nt.prototype,"encapContentInfo",void 0);s([l({type:En,context:0,implicit:!0,optional:!0})],Nt.prototype,"certificates",void 0);s([l({type:Ci,context:1,implicit:!0,optional:!0})],Nt.prototype,"crls",void 0);s([l({type:Ds})],Nt.prototype,"signerInfos",void 0);var Wr="1.2.840.10045.2.1";var Xs="1.2.840.10045.4.1",Xc="1.2.840.10045.4.3.1",Io="1.2.840.10045.4.3.2",_o="1.2.840.10045.4.3.3",Bo="1.2.840.10045.4.3.4";var Ys="1.2.840.10045.3.1.7";var Js="1.3.132.0.34";var id="1.3.132.0.35";function Qs(t){return new T({algorithm:t})}var rm=Qs(Xs),NR=Qs(Xc),nm=Qs(Io),om=Qs(_o),im=Qs(Bo);var Zs=class{fieldType;parameters;constructor(e={}){Object.assign(this,e)}};s([l({type:f.ObjectIdentifier})],Zs.prototype,"fieldType",void 0);s([l({type:f.Any})],Zs.prototype,"parameters",void 0);Zs=s([b({type:m.Sequence})],Zs);var sd=class extends R{};var Ii=class{a;b;seed;constructor(e={}){Object.assign(this,e)}};s([l({type:f.OctetString})],Ii.prototype,"a",void 0);s([l({type:f.OctetString})],Ii.prototype,"b",void 0);s([l({type:f.BitString,optional:!0})],Ii.prototype,"seed",void 0);Ii=s([b({type:m.Sequence})],Ii);var ad;(function(t){t[t.ecpVer1=1]="ecpVer1"})(ad||(ad={}));var wr=class{version=ad.ecpVer1;fieldID;curve;base;order;cofactor;constructor(e={}){Object.assign(this,e)}};s([l({type:f.Integer})],wr.prototype,"version",void 0);s([l({type:Zs})],wr.prototype,"fieldID",void 0);s([l({type:Ii})],wr.prototype,"curve",void 0);s([l({type:sd})],wr.prototype,"base",void 0);s([l({type:f.Integer,converter:le})],wr.prototype,"order",void 0);s([l({type:f.Integer,optional:!0})],wr.prototype,"cofactor",void 0);wr=s([b({type:m.Sequence})],wr);var Ot=class{namedCurve;implicitCurve;specifiedCurve;constructor(e={}){Object.assign(this,e)}};s([l({type:f.ObjectIdentifier})],Ot.prototype,"namedCurve",void 0);s([l({type:f.Null})],Ot.prototype,"implicitCurve",void 0);s([l({type:wr})],Ot.prototype,"specifiedCurve",void 0);Ot=s([b({type:m.Choice})],Ot);var _i=class{version=1;privateKey=new R;parameters;publicKey;constructor(e={}){Object.assign(this,e)}};s([l({type:f.Integer})],_i.prototype,"version",void 0);s([l({type:R})],_i.prototype,"privateKey",void 0);s([l({type:Ot,context:0,optional:!0})],_i.prototype,"parameters",void 0);s([l({type:f.BitString,context:1,optional:!0})],_i.prototype,"publicKey",void 0);var Fr=class{r=new ArrayBuffer(0);s=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};s([l({type:f.Integer,converter:le})],Fr.prototype,"r",void 0);s([l({type:f.Integer,converter:le})],Fr.prototype,"s",void 0);var pt="1.2.840.113549.1.1",Dt=`${pt}.1`,sm=`${pt}.7`,am=`${pt}.9`,_n=`${pt}.10`,cm=`${pt}.2`,lm=`${pt}.4`,Bn=`${pt}.5`,um=`${pt}.14`;var Bi=`${pt}.11`,Rn=`${pt}.12`,Mn=`${pt}.13`,cd=`${pt}.15`,ld=`${pt}.16`,Ro="1.3.14.3.2.26",Yc="2.16.840.1.101.3.4.2.4",Mo="2.16.840.1.101.3.4.2.1",Po="2.16.840.1.101.3.4.2.2",No="2.16.840.1.101.3.4.2.3",dm="2.16.840.1.101.3.4.2.5",pm="2.16.840.1.101.3.4.2.6",fm="1.2.840.113549.2.2",hm="1.2.840.113549.2.5",Pn=`${pt}.8`;function Oe(t){return new T({algorithm:t,parameters:null})}var cM=Oe(fm),lM=Oe(hm),zr=Oe(Ro),uM=Oe(Yc),dM=Oe(Mo),pM=Oe(Po),fM=Oe(No),hM=Oe(dm),mM=Oe(pm),Jc=new T({algorithm:Pn,parameters:B.serialize(zr)}),ud=new T({algorithm:am,parameters:B.serialize(ii.toASN(new Uint8Array([218,57,163,238,94,107,75,13,50,85,191,239,149,96,24,144,175,216,7,9]).buffer))}),gM=Oe(Dt),yM=Oe(cm),bM=Oe(lm),wM=Oe(Bn),xM=Oe(cd),vM=Oe(ld),AM=Oe(Rn),EM=Oe(Mn),SM=Oe(cd),kM=Oe(ld);var Ri=class{hashAlgorithm=new T(zr);maskGenAlgorithm=new T({algorithm:Pn,parameters:B.serialize(zr)});pSourceAlgorithm=new T(ud);constructor(e={}){Object.assign(this,e)}};s([l({type:T,context:0,defaultValue:zr})],Ri.prototype,"hashAlgorithm",void 0);s([l({type:T,context:1,defaultValue:Jc})],Ri.prototype,"maskGenAlgorithm",void 0);s([l({type:T,context:2,defaultValue:ud})],Ri.prototype,"pSourceAlgorithm",void 0);var MM=new T({algorithm:sm,parameters:B.serialize(new Ri)});var xr=class{hashAlgorithm=new T(zr);maskGenAlgorithm=new T({algorithm:Pn,parameters:B.serialize(zr)});saltLength=20;trailerField=1;constructor(e={}){Object.assign(this,e)}};s([l({type:T,context:0,defaultValue:zr})],xr.prototype,"hashAlgorithm",void 0);s([l({type:T,context:1,defaultValue:Jc})],xr.prototype,"maskGenAlgorithm",void 0);s([l({type:f.Integer,context:2,defaultValue:20})],xr.prototype,"saltLength",void 0);s([l({type:f.Integer,context:3,defaultValue:1})],xr.prototype,"trailerField",void 0);var HM=new T({algorithm:_n,parameters:B.serialize(new xr)});var Oo=class{digestAlgorithm=new T;digest=new R;constructor(e={}){Object.assign(this,e)}};s([l({type:T})],Oo.prototype,"digestAlgorithm",void 0);s([l({type:R})],Oo.prototype,"digest",void 0);var dd,Mi=class{prime=new ArrayBuffer(0);exponent=new ArrayBuffer(0);coefficient=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};s([l({type:f.Integer,converter:le})],Mi.prototype,"prime",void 0);s([l({type:f.Integer,converter:le})],Mi.prototype,"exponent",void 0);s([l({type:f.Integer,converter:le})],Mi.prototype,"coefficient",void 0);var Qc=dd=class extends j{constructor(e){super(e),Object.setPrototypeOf(this,dd.prototype)}};Qc=dd=s([b({type:m.Sequence,itemType:Mi})],Qc);var Lt=class{version=0;modulus=new ArrayBuffer(0);publicExponent=new ArrayBuffer(0);privateExponent=new ArrayBuffer(0);prime1=new ArrayBuffer(0);prime2=new ArrayBuffer(0);exponent1=new ArrayBuffer(0);exponent2=new ArrayBuffer(0);coefficient=new ArrayBuffer(0);otherPrimeInfos;constructor(e={}){Object.assign(this,e)}};s([l({type:f.Integer})],Lt.prototype,"version",void 0);s([l({type:f.Integer,converter:le})],Lt.prototype,"modulus",void 0);s([l({type:f.Integer,converter:le})],Lt.prototype,"publicExponent",void 0);s([l({type:f.Integer,converter:le})],Lt.prototype,"privateExponent",void 0);s([l({type:f.Integer,converter:le})],Lt.prototype,"prime1",void 0);s([l({type:f.Integer,converter:le})],Lt.prototype,"prime2",void 0);s([l({type:f.Integer,converter:le})],Lt.prototype,"exponent1",void 0);s([l({type:f.Integer,converter:le})],Lt.prototype,"exponent2",void 0);s([l({type:f.Integer,converter:le})],Lt.prototype,"coefficient",void 0);s([l({type:Qc,optional:!0})],Lt.prototype,"otherPrimeInfos",void 0);var Nn=class{modulus=new ArrayBuffer(0);publicExponent=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};s([l({type:f.Integer,converter:le})],Nn.prototype,"modulus",void 0);s([l({type:f.Integer,converter:le})],Nn.prototype,"publicExponent",void 0);var pd;(function(t){t[t.Transient=0]="Transient",t[t.Singleton=1]="Singleton",t[t.ResolutionScoped=2]="ResolutionScoped",t[t.ContainerScoped=3]="ContainerScoped"})(pd||(pd={}));var Ge=pd;var fd=function(t,e){return fd=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,n){r.__proto__=n}||function(r,n){for(var o in n)n.hasOwnProperty(o)&&(r[o]=n[o])},fd(t,e)};function ea(t,e){fd(t,e);function r(){this.constructor=t}t.prototype=e===null?Object.create(e):(r.prototype=e.prototype,new r)}function mm(t,e,r,n){function o(i){return i instanceof r?i:new r(function(a){a(i)})}return new(r||(r=Promise))(function(i,a){function c(p){try{d(n.next(p))}catch(h){a(h)}}function u(p){try{d(n.throw(p))}catch(h){a(h)}}function d(p){p.done?i(p.value):o(p.value).then(c,u)}d((n=n.apply(t,e||[])).next())})}function gm(t,e){var r={label:0,sent:function(){if(i[0]&1)throw i[1];return i[1]},trys:[],ops:[]},n,o,i,a;return a={next:c(0),throw:c(1),return:c(2)},typeof Symbol=="function"&&(a[Symbol.iterator]=function(){return this}),a;function c(d){return function(p){return u([d,p])}}function u(d){if(n)throw new TypeError("Generator is already executing.");for(;r;)try{if(n=1,o&&(i=d[0]&2?o.return:d[0]?o.throw||((i=o.return)&&i.call(o),0):o.next)&&!(i=i.call(o,d[1])).done)return i;switch(o=0,i&&(d=[d[0]&2,i.value]),d[0]){case 0:case 1:i=d;break;case 4:return r.label++,{value:d[1],done:!1};case 5:r.label++,o=d[1],d=[0];continue;case 7:d=r.ops.pop(),r.trys.pop();continue;default:if(i=r.trys,!(i=i.length>0&&i[i.length-1])&&(d[0]===6||d[0]===2)){r=0;continue}if(d[0]===3&&(!i||d[1]>i[0]&&d[1]<i[3])){r.label=d[1];break}if(d[0]===6&&r.label<i[1]){r.label=i[1],i=d;break}if(i&&r.label<i[2]){r.label=i[2],r.ops.push(d);break}i[2]&&r.ops.pop(),r.trys.pop();continue}d=e.call(t,r)}catch(p){d=[6,p],o=0}finally{n=i=0}if(d[0]&5)throw d[1];return{value:d[0]?d[1]:void 0,done:!0}}}function ta(t){var e=typeof Symbol=="function"&&Symbol.iterator,r=e&&t[e],n=0;if(r)return r.call(t);if(t&&typeof t.length=="number")return{next:function(){return t&&n>=t.length&&(t=void 0),{value:t&&t[n++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function Pi(t,e){var r=typeof Symbol=="function"&&t[Symbol.iterator];if(!r)return t;var n=r.call(t),o,i=[],a;try{for(;(e===void 0||e-- >0)&&!(o=n.next()).done;)i.push(o.value)}catch(c){a={error:c}}finally{try{o&&!o.done&&(r=n.return)&&r.call(n)}finally{if(a)throw a.error}}return i}function vr(){for(var t=[],e=0;e<arguments.length;e++)t=t.concat(Pi(arguments[e]));return t}var Cw="injectionTokens";function hd(t){var e=Reflect.getMetadata("design:paramtypes",t)||[],r=Reflect.getOwnMetadata(Cw,t)||{};return Object.keys(r).forEach(function(n){e[+n]=r[n]}),e}function ra(t){return!!t.useClass}function Ni(t){return!!t.useFactory}var Zc=(function(){function t(e){this.wrap=e,this.reflectMethods=["get","getPrototypeOf","setPrototypeOf","getOwnPropertyDescriptor","defineProperty","has","set","deleteProperty","apply","construct","ownKeys"]}return t.prototype.createProxy=function(e){var r=this,n={},o=!1,i,a=function(){return o||(i=e(r.wrap()),o=!0),i};return new Proxy(n,this.createHandler(a))},t.prototype.createHandler=function(e){var r={},n=function(o){r[o]=function(){for(var i=[],a=0;a<arguments.length;a++)i[a]=arguments[a];i[0]=e();var c=Reflect[o];return c.apply(void 0,vr(i))}};return this.reflectMethods.forEach(n),r},t})();function On(t){return typeof t=="string"||typeof t=="symbol"}function md(t){return typeof t=="object"&&"token"in t&&"multiple"in t}function el(t){return typeof t=="object"&&"token"in t&&"transform"in t}function ym(t){return typeof t=="function"||t instanceof Zc}function Do(t){return!!t.useToken}function Lo(t){return t.useValue!=null}function bm(t){return ra(t)||Lo(t)||Do(t)||Ni(t)}var Tw=(function(){function t(){this._registryMap=new Map}return t.prototype.entries=function(){return this._registryMap.entries()},t.prototype.getAll=function(e){return this.ensure(e),this._registryMap.get(e)},t.prototype.get=function(e){this.ensure(e);var r=this._registryMap.get(e);return r[r.length-1]||null},t.prototype.set=function(e,r){this.ensure(e),this._registryMap.get(e).push(r)},t.prototype.setAll=function(e,r){this._registryMap.set(e,r)},t.prototype.has=function(e){return this.ensure(e),this._registryMap.get(e).length>0},t.prototype.clear=function(){this._registryMap.clear()},t.prototype.ensure=function(e){this._registryMap.has(e)||this._registryMap.set(e,[])},t})(),na=Tw;var Iw=(function(t){ea(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e})(na),wm=Iw;var _w=(function(){function t(){this.scopedResolutions=new Map}return t})(),oa=_w;function Bw(t,e){if(t===null)return"at position #"+e;var r=t.split(",")[e].trim();return'"'+r+'" at position #'+e}function Rw(t,e,r){return r===void 0&&(r="    "),vr([t],e.message.split(`
`).map(function(n){return r+n})).join(`
`)}function gd(t,e,r){var n=Pi(t.toString().match(/constructor\(([\w, ]+)\)/)||[],2),o=n[1],i=o===void 0?null:o,a=Bw(i,e);return Rw("Cannot inject the dependency "+a+' of "'+t.name+'" constructor. Reason:',r)}function xm(t){if(typeof t.dispose!="function")return!1;var e=t.dispose;return!(e.length>0)}var Mw=(function(t){ea(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e})(na);var Pw=(function(t){ea(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e})(na);var Nw=(function(){function t(){this.preResolution=new Mw,this.postResolution=new Pw}return t})(),vm=Nw;var yd=new Map,Ow=(function(){function t(e){this.parent=e,this._registry=new wm,this.interceptors=new vm,this.disposed=!1,this.disposables=new Set}return t.prototype.register=function(e,r,n){n===void 0&&(n={lifecycle:Ge.Transient}),this.ensureNotDisposed();var o;if(bm(r)?o=r:o={useClass:r},Do(o))for(var i=[e],a=o;a!=null;){var c=a.useToken;if(i.includes(c))throw new Error("Token registration cycle detected! "+vr(i,[c]).join(" -> "));i.push(c);var u=this._registry.get(c);u&&Do(u.provider)?a=u.provider:a=null}if((n.lifecycle===Ge.Singleton||n.lifecycle==Ge.ContainerScoped||n.lifecycle==Ge.ResolutionScoped)&&(Lo(o)||Ni(o)))throw new Error('Cannot use lifecycle "'+Ge[n.lifecycle]+'" with ValueProviders or FactoryProviders');return this._registry.set(e,{provider:o,options:n}),this},t.prototype.registerType=function(e,r){return this.ensureNotDisposed(),On(r)?this.register(e,{useToken:r}):this.register(e,{useClass:r})},t.prototype.registerInstance=function(e,r){return this.ensureNotDisposed(),this.register(e,{useValue:r})},t.prototype.registerSingleton=function(e,r){if(this.ensureNotDisposed(),On(e)){if(On(r))return this.register(e,{useToken:r},{lifecycle:Ge.Singleton});if(r)return this.register(e,{useClass:r},{lifecycle:Ge.Singleton});throw new Error('Cannot register a type name as a singleton without a "to" token')}var n=e;return r&&!On(r)&&(n=r),this.register(e,{useClass:n},{lifecycle:Ge.Singleton})},t.prototype.resolve=function(e,r,n){r===void 0&&(r=new oa),n===void 0&&(n=!1),this.ensureNotDisposed();var o=this.getRegistration(e);if(!o&&On(e)){if(n)return;throw new Error('Attempted to resolve unregistered dependency token: "'+e.toString()+'"')}if(this.executePreResolutionInterceptor(e,"Single"),o){var i=this.resolveRegistration(o,r);return this.executePostResolutionInterceptor(e,i,"Single"),i}if(ym(e)){var i=this.construct(e,r);return this.executePostResolutionInterceptor(e,i,"Single"),i}throw new Error("Attempted to construct an undefined constructor. Could mean a circular dependency problem. Try using `delay` function.")},t.prototype.executePreResolutionInterceptor=function(e,r){var n,o;if(this.interceptors.preResolution.has(e)){var i=[];try{for(var a=ta(this.interceptors.preResolution.getAll(e)),c=a.next();!c.done;c=a.next()){var u=c.value;u.options.frequency!="Once"&&i.push(u),u.callback(e,r)}}catch(d){n={error:d}}finally{try{c&&!c.done&&(o=a.return)&&o.call(a)}finally{if(n)throw n.error}}this.interceptors.preResolution.setAll(e,i)}},t.prototype.executePostResolutionInterceptor=function(e,r,n){var o,i;if(this.interceptors.postResolution.has(e)){var a=[];try{for(var c=ta(this.interceptors.postResolution.getAll(e)),u=c.next();!u.done;u=c.next()){var d=u.value;d.options.frequency!="Once"&&a.push(d),d.callback(e,r,n)}}catch(p){o={error:p}}finally{try{u&&!u.done&&(i=c.return)&&i.call(c)}finally{if(o)throw o.error}}this.interceptors.postResolution.setAll(e,a)}},t.prototype.resolveRegistration=function(e,r){if(this.ensureNotDisposed(),e.options.lifecycle===Ge.ResolutionScoped&&r.scopedResolutions.has(e))return r.scopedResolutions.get(e);var n=e.options.lifecycle===Ge.Singleton,o=e.options.lifecycle===Ge.ContainerScoped,i=n||o,a;return Lo(e.provider)?a=e.provider.useValue:Do(e.provider)?a=i?e.instance||(e.instance=this.resolve(e.provider.useToken,r)):this.resolve(e.provider.useToken,r):ra(e.provider)?a=i?e.instance||(e.instance=this.construct(e.provider.useClass,r)):this.construct(e.provider.useClass,r):Ni(e.provider)?a=e.provider.useFactory(this):a=this.construct(e.provider,r),e.options.lifecycle===Ge.ResolutionScoped&&r.scopedResolutions.set(e,a),a},t.prototype.resolveAll=function(e,r,n){var o=this;r===void 0&&(r=new oa),n===void 0&&(n=!1),this.ensureNotDisposed();var i=this.getAllRegistrations(e);if(!i&&On(e)){if(n)return[];throw new Error('Attempted to resolve unregistered dependency token: "'+e.toString()+'"')}if(this.executePreResolutionInterceptor(e,"All"),i){var a=i.map(function(u){return o.resolveRegistration(u,r)});return this.executePostResolutionInterceptor(e,a,"All"),a}var c=[this.construct(e,r)];return this.executePostResolutionInterceptor(e,c,"All"),c},t.prototype.isRegistered=function(e,r){return r===void 0&&(r=!1),this.ensureNotDisposed(),this._registry.has(e)||r&&(this.parent||!1)&&this.parent.isRegistered(e,!0)},t.prototype.reset=function(){this.ensureNotDisposed(),this._registry.clear(),this.interceptors.preResolution.clear(),this.interceptors.postResolution.clear()},t.prototype.clearInstances=function(){var e,r;this.ensureNotDisposed();try{for(var n=ta(this._registry.entries()),o=n.next();!o.done;o=n.next()){var i=Pi(o.value,2),a=i[0],c=i[1];this._registry.setAll(a,c.filter(function(u){return!Lo(u.provider)}).map(function(u){return u.instance=void 0,u}))}}catch(u){e={error:u}}finally{try{o&&!o.done&&(r=n.return)&&r.call(n)}finally{if(e)throw e.error}}},t.prototype.createChildContainer=function(){var e,r;this.ensureNotDisposed();var n=new t(this);try{for(var o=ta(this._registry.entries()),i=o.next();!i.done;i=o.next()){var a=Pi(i.value,2),c=a[0],u=a[1];u.some(function(d){var p=d.options;return p.lifecycle===Ge.ContainerScoped})&&n._registry.setAll(c,u.map(function(d){return d.options.lifecycle===Ge.ContainerScoped?{provider:d.provider,options:d.options}:d}))}}catch(d){e={error:d}}finally{try{i&&!i.done&&(r=o.return)&&r.call(o)}finally{if(e)throw e.error}}return n},t.prototype.beforeResolution=function(e,r,n){n===void 0&&(n={frequency:"Always"}),this.interceptors.preResolution.set(e,{callback:r,options:n})},t.prototype.afterResolution=function(e,r,n){n===void 0&&(n={frequency:"Always"}),this.interceptors.postResolution.set(e,{callback:r,options:n})},t.prototype.dispose=function(){return mm(this,void 0,void 0,function(){var e;return gm(this,function(r){switch(r.label){case 0:return this.disposed=!0,e=[],this.disposables.forEach(function(n){var o=n.dispose();o&&e.push(o)}),[4,Promise.all(e)];case 1:return r.sent(),[2]}})})},t.prototype.getRegistration=function(e){return this.isRegistered(e)?this._registry.get(e):this.parent?this.parent.getRegistration(e):null},t.prototype.getAllRegistrations=function(e){return this.isRegistered(e)?this._registry.getAll(e):this.parent?this.parent.getAllRegistrations(e):null},t.prototype.construct=function(e,r){var n=this;if(e instanceof Zc)return e.createProxy(function(i){return n.resolve(i,r)});var o=(function(){var i=yd.get(e);if(!i||i.length===0){if(e.length===0)return new e;throw new Error('TypeInfo not known for "'+e.name+'"')}var a=i.map(n.resolveParams(r,e));return new(e.bind.apply(e,vr([void 0],a)))})();return xm(o)&&this.disposables.add(o),o},t.prototype.resolveParams=function(e,r){var n=this;return function(o,i){var a,c,u;try{return md(o)?el(o)?o.multiple?(a=n.resolve(o.transform)).transform.apply(a,vr([n.resolveAll(o.token,new oa,o.isOptional)],o.transformArgs)):(c=n.resolve(o.transform)).transform.apply(c,vr([n.resolve(o.token,e,o.isOptional)],o.transformArgs)):o.multiple?n.resolveAll(o.token,new oa,o.isOptional):n.resolve(o.token,e,o.isOptional):el(o)?(u=n.resolve(o.transform,e)).transform.apply(u,vr([n.resolve(o.token,e)],o.transformArgs)):n.resolve(o,e)}catch(d){throw new Error(gd(r,i,d))}}},t.prototype.ensureNotDisposed=function(){if(this.disposed)throw new Error("This container has been disposed, you cannot interact with a disposed container")},t})(),ge=new Ow;function Dw(t){return function(e){yd.set(e,hd(e)),t&&t.token&&(Array.isArray(t.token)?t.token.forEach(function(r){ge.register(r,e)}):ge.register(t.token,e))}}var Ar=Dw;if(typeof Reflect>"u"||!Reflect.getMetadata)throw new Error(`tsyringe requires a reflect polyfill. Please add 'import "reflect-metadata"' to the top of your entry point.`);var wd,jo=class{attrId="";attrValues=[];constructor(e={}){Object.assign(e)}};s([l({type:f.ObjectIdentifier})],jo.prototype,"attrId",void 0);s([l({type:f.Any,repeated:"set"})],jo.prototype,"attrValues",void 0);var Am=wd=class extends j{constructor(e){super(e),Object.setPrototypeOf(this,wd.prototype)}};Am=wd=s([b({type:m.Sequence,itemType:jo})],Am);var xd,Em=xd=class extends j{constructor(e){super(e),Object.setPrototypeOf(this,xd.prototype)}};Em=xd=s([b({type:m.Sequence,itemType:tt})],Em);var Lw="1.2.840.113549",jw=`${Lw}.1`,Sm=`${jw}.12`,Oi=`${Sm}.1`,AN=`${Oi}.1`,EN=`${Oi}.2`,SN=`${Oi}.3`,kN=`${Oi}.4`,CN=`${Oi}.5`,TN=`${Oi}.6`,Ho=`${Sm}.10.1`;var BN=`${Ho}.1`,RN=`${Ho}.2`,MN=`${Ho}.3`,PN=`${Ho}.4`,NN=`${Ho}.5`,ON=`${Ho}.6`,tl="1.2.840.113549.1.9";var rl=class{certId="";certValue=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};s([l({type:f.ObjectIdentifier})],rl.prototype,"certId",void 0);s([l({type:f.Any,context:0})],rl.prototype,"certValue",void 0);var km=`${tl}.22`,UN=`${km}.1`,GN=`${km}.2`;var nl=class{crlId="";crltValue=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};s([l({type:f.ObjectIdentifier})],nl.prototype,"crlId",void 0);s([l({type:f.Any,context:0})],nl.prototype,"crltValue",void 0);var Hw=`${tl}.23`,FN=`${Hw}.1`;var ia=class extends R{},qr=class{encryptionAlgorithm=new T;encryptedData=new ia;constructor(e={}){Object.assign(this,e)}};s([l({type:T})],qr.prototype,"encryptionAlgorithm",void 0);s([l({type:ia})],qr.prototype,"encryptedData",void 0);var vd,Ad;(function(t){t[t.v1=0]="v1"})(Ad||(Ad={}));var ol=class extends R{},sa=vd=class extends j{constructor(e){super(e),Object.setPrototypeOf(this,vd.prototype)}};sa=vd=s([b({type:m.Sequence,itemType:Ue})],sa);var Dn=class{version=Ad.v1;privateKeyAlgorithm=new T;privateKey=new ol;attributes;constructor(e={}){Object.assign(this,e)}};s([l({type:f.Integer})],Dn.prototype,"version",void 0);s([l({type:T})],Dn.prototype,"privateKeyAlgorithm",void 0);s([l({type:ol})],Dn.prototype,"privateKey",void 0);s([l({type:sa,implicit:!0,context:0,optional:!0})],Dn.prototype,"attributes",void 0);var Cm=class extends Dn{};Cm=s([b({type:m.Sequence})],Cm);var Tm=class extends qr{};Tm=s([b({type:m.Sequence})],Tm);var il=class{secretTypeId="";secretValue=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};s([l({type:f.ObjectIdentifier})],il.prototype,"secretTypeId",void 0);s([l({type:f.Any,context:0})],il.prototype,"secretValue",void 0);var Ln=class{mac=new Oo;macSalt=new R;iterations=1;constructor(e={}){Object.assign(this,e)}};s([l({type:Oo})],Ln.prototype,"mac",void 0);s([l({type:R})],Ln.prototype,"macSalt",void 0);s([l({type:f.Integer,defaultValue:1})],Ln.prototype,"iterations",void 0);var Uo=class{version=3;authSafe=new tt;macData=new Ln;constructor(e={}){Object.assign(this,e)}};s([l({type:f.Integer})],Uo.prototype,"version",void 0);s([l({type:tt})],Uo.prototype,"authSafe",void 0);s([l({type:Ln,optional:!0})],Uo.prototype,"macData",void 0);var Ed,Di=class{bagId="";bagValue=new ArrayBuffer(0);bagAttributes;constructor(e={}){Object.assign(this,e)}};s([l({type:f.ObjectIdentifier})],Di.prototype,"bagId",void 0);s([l({type:f.Any,context:0})],Di.prototype,"bagValue",void 0);s([l({type:jo,repeated:"set",optional:!0})],Di.prototype,"bagAttributes",void 0);var Im=Ed=class extends j{constructor(e){super(e),Object.setPrototypeOf(this,Ed.prototype)}};Im=Ed=s([b({type:m.Sequence,itemType:Di})],Im);var Sd,kd,Cd,Ce="1.2.840.113549.1.9",qO=`${Ce}.0`,$m=`${Ce}.24`,ca=`${Ce}.25`,Vm=`${Ce}.26`,Km=`${Ce}.27`,XO=`${$m}.1`,YO=`${$m}.2`,JO=`${Ce}.1`,QO=`${Ce}.2`,ZO=`${Ce}.3`,e4=`${Ce}.4`,t4=`${Ce}.5`,r4=`${Ce}.6`,Nd=`${Ce}.7`,n4=`${Ce}.8`,o4=`${Ce}.9`,i4=`${Ce}.13`,la=`${Ce}.14`,s4=`${Ce}.15`,a4=`${Ce}.20`,c4=`${Ce}.21`;var l4=`${ca}.1`,u4=`${ca}.2`,d4=`${ca}.3`,p4=`${ca}.4`,f4=`${ca}.5`,ua="1.3.6.1.5.5.7.9",h4=`${ua}.1`,m4=`${ua}.2`,g4=`${ua}.3`,y4=`${ua}.4`,b4=`${ua}.5`,w4=`${Vm}.1`,x4=`${Vm}.2`,v4=`${Km}.1`,A4=`${Km}.2`,E4=`${Ce}.16`,S4=`${Ce}.22`,k4=`${Ce}.23`,C4=`${Xu}.65`,sl=class extends Me{ia5String;constructor(e={}){super(e)}toString(){return{}.toString(),this.ia5String||super.toString()}};s([l({type:f.IA5String})],sl.prototype,"ia5String",void 0);sl=s([b({type:m.Choice})],sl);var _m=class extends tt{};_m=s([b({type:m.Sequence})],_m);var Bm=class extends Uo{};Bm=s([b({type:m.Sequence})],Bm);var Rm=class extends qr{};Rm=s([b({type:m.Sequence})],Rm);var Td=class{value;constructor(e=""){this.value=e}toString(){return this.value}};s([l({type:f.IA5String})],Td.prototype,"value",void 0);Td=s([b({type:m.Choice})],Td);var Mm=class extends sl{};Mm=s([b({type:m.Choice})],Mm);var Pm=class extends Me{};Pm=s([b({type:m.Choice})],Pm);var Id=class{value;constructor(e=new Date){this.value=e}};s([l({type:f.GeneralizedTime})],Id.prototype,"value",void 0);Id=s([b({type:m.Choice})],Id);var Nm=class extends Me{};Nm=s([b({type:m.Choice})],Nm);var _d=class{value;constructor(e="M"){this.value=e}toString(){return this.value}};s([l({type:f.PrintableString})],_d.prototype,"value",void 0);_d=s([b({type:m.Choice})],_d);var al=class{value;constructor(e=""){this.value=e}toString(){return this.value}};s([l({type:f.PrintableString})],al.prototype,"value",void 0);al=s([b({type:m.Choice})],al);var Om=class extends al{};Om=s([b({type:m.Choice})],Om);var Dm=class extends Me{};Dm=s([b({type:m.Choice})],Dm);var Bd=class{value;constructor(e=""){this.value=e}toString(){return this.value}};s([l({type:f.ObjectIdentifier})],Bd.prototype,"value",void 0);Bd=s([b({type:m.Choice})],Bd);var Lm=class extends Ee{};Lm=s([b({type:m.Choice})],Lm);var Rd=class{value;constructor(e=0){this.value=e}toString(){return this.value.toString()}};s([l({type:f.Integer})],Rd.prototype,"value",void 0);Rd=s([b({type:m.Choice})],Rd);var jm=class extends ut{};jm=s([b({type:m.Sequence})],jm);var aa=class extends Me{};aa=s([b({type:m.Choice})],aa);var Hm=Sd=class extends Rt{constructor(e){super(e),Object.setPrototypeOf(this,Sd.prototype)}};Hm=Sd=s([b({type:m.Sequence})],Hm);var Um=kd=class extends j{constructor(e){super(e),Object.setPrototypeOf(this,kd.prototype)}};Um=kd=s([b({type:m.Set,itemType:Yt})],Um);var Md=class{value;constructor(e=""){this.value=e}toString(){return this.value}};s([l({type:f.BmpString})],Md.prototype,"value",void 0);Md=s([b({type:m.Choice})],Md);var Pd=class extends T{};Pd=s([b({type:m.Sequence})],Pd);var Gm=Cd=class extends j{constructor(e){super(e),Object.setPrototypeOf(this,Cd.prototype)}};Gm=Cd=s([b({type:m.Sequence,itemType:Pd})],Gm);var Od,Dd;var Wm=Od=class extends j{constructor(e){super(e),Object.setPrototypeOf(this,Od.prototype)}};Wm=Od=s([b({type:m.Sequence,itemType:T})],Wm);var Fm=Dd=class extends j{constructor(e){super(e),Object.setPrototypeOf(this,Dd.prototype)}};Fm=Dd=s([b({type:m.Sequence,itemType:f.BitString})],Fm);var Ld;var jd;(function(t){t[t.v1=0]="v1",t[t.v2=1]="v2"})(jd||(jd={}));var zm=class extends T{};zm=s([b({type:m.Sequence})],zm);var Jt=class{version=jd.v1;privateKeyAlgorithm=new T;privateKey=new ArrayBuffer(0);attributes;publicKey};s([l({type:f.Integer})],Jt.prototype,"version",void 0);s([l({type:T})],Jt.prototype,"privateKeyAlgorithm",void 0);s([l({type:f.OctetString})],Jt.prototype,"privateKey",void 0);s([l({type:sa,context:0,implicit:!0,optional:!0})],Jt.prototype,"attributes",void 0);s([l({type:f.BitString,context:1,implicit:!0,optional:!0})],Jt.prototype,"publicKey",void 0);Jt=s([b({type:m.Sequence})],Jt);var qm=class extends Jt{};qm=s([b({type:m.Sequence})],qm);var Xm=Ld=class extends j{constructor(e){super(e),Object.setPrototypeOf(this,Ld.prototype)}};Xm=Ld=s([b({type:m.Sequence,itemType:Jt})],Xm);var Hd,Ud;var Ym=class extends T{};Ym=s([b({type:m.Sequence})],Ym);var Jm=Hd=class extends j{constructor(e){super(e),Object.setPrototypeOf(this,Hd.prototype)}};Jm=Hd=s([b({type:m.Sequence,itemType:je})],Jm);var Qm=Ud=class extends j{constructor(e){super(e),Object.setPrototypeOf(this,Ud.prototype)}};Qm=Ud=s([b({type:m.Sequence,itemType:Jt})],Qm);var rt="2.16.840.1.101.3.4.3",Go=`${rt}.17`,$o=`${rt}.18`,Vo=`${rt}.19`,Gd=`${rt}.20`,$d=`${rt}.21`,Vd=`${rt}.22`,Kd=`${rt}.23`,Wd=`${rt}.24`,Fd=`${rt}.25`,zd=`${rt}.26`,qd=`${rt}.27`,Xd=`${rt}.28`,Yd=`${rt}.29`,Jd=`${rt}.30`,Qd=`${rt}.31`;var Zd,da=Zd=class extends j{constructor(e){super(e),Object.setPrototypeOf(this,Zd.prototype)}};da=Zd=s([b({type:m.Sequence,itemType:Ue})],da);var Er=class{version=0;subject=new be;subjectPKInfo=new je;attributes=new da;constructor(e={}){Object.assign(this,e)}};s([l({type:f.Integer})],Er.prototype,"version",void 0);s([l({type:be})],Er.prototype,"subject",void 0);s([l({type:je})],Er.prototype,"subjectPKInfo",void 0);s([l({type:da,implicit:!0,context:0,optional:!0})],Er.prototype,"attributes",void 0);var jn=class{certificationRequestInfo=new Er;certificationRequestInfoRaw;signatureAlgorithm=new T;signature=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};s([l({type:Er,raw:!0})],jn.prototype,"certificationRequestInfo",void 0);s([l({type:T})],jn.prototype,"signatureAlgorithm",void 0);s([l({type:f.BitString})],jn.prototype,"signature",void 0);var qo="crypto.algorithm",lp=class{getAlgorithms(){return ge.resolveAll(qo)}toAsnAlgorithm(e){let r={...e};r.hash&&typeof r.hash=="string"&&(r.hash={name:r.hash});for(let n of this.getAlgorithms()){let o=n.toAsnAlgorithm(r);if(o)return o}if(/^[0-9.]+$/.test(e.name)){let n=new T({algorithm:e.name});if("parameters"in e){let o=e;n.parameters=o.parameters}return n}throw new Error("Cannot convert WebCrypto algorithm to ASN.1 algorithm")}toWebAlgorithm(e){for(let n of this.getAlgorithms()){let o=n.toWebAlgorithm(e);if(o)return o}return{name:e.algorithm,parameters:e.parameters}}},Wo="crypto.algorithmProvider";ge.registerSingleton(Wo,lp);var dl,ht="1.3.36.3.3.2.8.1.1",Zm=`${ht}.1`,eg=`${ht}.2`,tg=`${ht}.3`,rg=`${ht}.4`,ng=`${ht}.5`,og=`${ht}.6`,ig=`${ht}.7`,sg=`${ht}.8`,ag=`${ht}.9`,cg=`${ht}.10`,lg=`${ht}.11`,ug=`${ht}.12`,dg=`${ht}.13`,pg=`${ht}.14`,fg="brainpoolP160r1",hg="brainpoolP160t1",mg="brainpoolP192r1",gg="brainpoolP192t1",yg="brainpoolP224r1",bg="brainpoolP224t1",wg="brainpoolP256r1",xg="brainpoolP256t1",vg="brainpoolP320r1",Ag="brainpoolP320t1",Eg="brainpoolP384r1",Sg="brainpoolP384t1",kg="brainpoolP512r1",Cg="brainpoolP512t1",Se="ECDSA",Ha=dl=class{toAsnAlgorithm(e){switch(e.name.toLowerCase()){case Se.toLowerCase():if("hash"in e)switch((typeof e.hash=="string"?e.hash:e.hash.name).toLowerCase()){case"sha-1":return rm;case"sha-256":return nm;case"sha-384":return om;case"sha-512":return im}else if("namedCurve"in e){let r="";switch(e.namedCurve){case"P-256":r=Ys;break;case"K-256":r=dl.SECP256K1;break;case"P-384":r=Js;break;case"P-521":r=id;break;case fg:r=Zm;break;case hg:r=eg;break;case mg:r=tg;break;case gg:r=rg;break;case yg:r=ng;break;case bg:r=og;break;case wg:r=ig;break;case xg:r=sg;break;case vg:r=ag;break;case Ag:r=cg;break;case Eg:r=lg;break;case Sg:r=ug;break;case kg:r=dg;break;case Cg:r=pg;break}if(r)return new T({algorithm:Wr,parameters:B.serialize(new Ot({namedCurve:r}))})}}return null}toWebAlgorithm(e){switch(e.algorithm){case Xs:return{name:Se,hash:{name:"SHA-1"}};case Io:return{name:Se,hash:{name:"SHA-256"}};case _o:return{name:Se,hash:{name:"SHA-384"}};case Bo:return{name:Se,hash:{name:"SHA-512"}};case Wr:{if(!e.parameters)throw new TypeError("Cannot get required parameters from EC algorithm");switch(B.parse(e.parameters,Ot).namedCurve){case Ys:return{name:Se,namedCurve:"P-256"};case dl.SECP256K1:return{name:Se,namedCurve:"K-256"};case Js:return{name:Se,namedCurve:"P-384"};case id:return{name:Se,namedCurve:"P-521"};case Zm:return{name:Se,namedCurve:fg};case eg:return{name:Se,namedCurve:hg};case tg:return{name:Se,namedCurve:mg};case rg:return{name:Se,namedCurve:gg};case ng:return{name:Se,namedCurve:yg};case og:return{name:Se,namedCurve:bg};case ig:return{name:Se,namedCurve:wg};case sg:return{name:Se,namedCurve:xg};case ag:return{name:Se,namedCurve:vg};case cg:return{name:Se,namedCurve:Ag};case lg:return{name:Se,namedCurve:Eg};case ug:return{name:Se,namedCurve:Sg};case dg:return{name:Se,namedCurve:kg};case pg:return{name:Se,namedCurve:Cg}}}}return null}};Ha.SECP256K1="1.3.132.0.10";Ha=dl=s([Ar()],Ha);ge.registerSingleton(qo,Ha);var Lg=Symbol("name"),jg=Symbol("value"),ue=class{constructor(e,r={},n=""){this[Lg]=e,this[jg]=n;for(let o in r)this[o]=r[o]}};ue.NAME=Lg;ue.VALUE=jg;var up=class{static toTextObject(e){let r=new ue("Algorithm Identifier",{},Qt.toString(e.algorithm));if(e.parameters)if(e.algorithm===Wr){let n=new Ha().toWebAlgorithm(e);n&&"namedCurve"in n?r["Named Curve"]=n.namedCurve:r.Parameters=e.parameters}else r.Parameters=e.parameters;return r}},Qt=class{static toString(e){let r=this.items[e];return r||e}};Qt.items={[Ro]:"sha1",[Yc]:"sha224",[Mo]:"sha256",[Po]:"sha384",[No]:"sha512",[Dt]:"rsaEncryption",[Bn]:"sha1WithRSAEncryption",[um]:"sha224WithRSAEncryption",[Bi]:"sha256WithRSAEncryption",[Rn]:"sha384WithRSAEncryption",[Mn]:"sha512WithRSAEncryption",[Wr]:"ecPublicKey",[Xs]:"ecdsaWithSHA1",[Xc]:"ecdsaWithSHA224",[Io]:"ecdsaWithSHA256",[_o]:"ecdsaWithSHA384",[Bo]:"ecdsaWithSHA512",[Oh]:"TLS WWW server authentication",[Dh]:"TLS WWW client authentication",[Lh]:"Code Signing",[jh]:"E-mail Protection",[Hh]:"Time Stamping",[Uh]:"OCSP Signing",[zc]:"Signed Data"};var Cr=class{static serialize(e){return this.serializeObj(e).join(`
`)}static pad(e=0){return"".padStart(2*e," ")}static serializeObj(e,r=0){let n=[],o=this.pad(r++),i="",a=e[ue.VALUE];a&&(i=` ${a}`),n.push(`${o}${e[ue.NAME]}:${i}`),o=this.pad(r);for(let c in e){if(typeof c=="symbol")continue;let u=e[c],d=c?`${c}: `:"";if(typeof u=="string"||typeof u=="number"||typeof u=="boolean")n.push(`${o}${d}${u}`);else if(u instanceof Date)n.push(`${o}${d}${u.toUTCString()}`);else if(Array.isArray(u))for(let p of u)p[ue.NAME]=c,n.push(...this.serializeObj(p,r));else if(u instanceof ue)u[ue.NAME]=c,n.push(...this.serializeObj(u,r));else if(_.BufferSourceConverter.isBufferSource(u))c?(n.push(`${o}${d}`),n.push(...this.serializeBufferSource(u,r+1))):n.push(...this.serializeBufferSource(u,r));else if("toTextObject"in u){let p=u.toTextObject();p[ue.NAME]=c,n.push(...this.serializeObj(p,r))}else throw new TypeError("Cannot serialize data in text format. Unsupported type.")}return n}static serializeBufferSource(e,r=0){let n=this.pad(r),o=_.BufferSourceConverter.toUint8Array(e),i=[];for(let a=0;a<o.length;){let c=[];for(let u=0;u<16&&a<o.length;u++){u===8&&c.push("");let d=o[a++].toString(16).padStart(2,"0");c.push(d)}i.push(`${n}${c.join(" ")}`)}return i}static serializeAlgorithm(e){return this.algorithmSerializer.toTextObject(e)}};Cr.oidSerializer=Qt;Cr.algorithmSerializer=up;var Li,ji,Yr=class t{get parseOptions(){return L(this,ji,"f")}get rawData(){return L(this,Li,"f")||ie(this,Li,B.serialize(this.asn),"f"),L(this,Li,"f")}constructor(...e){Li.set(this,void 0),ji.set(this,void 0),_.BufferSourceConverter.isBufferSource(e[0])?(ie(this,ji,e[2],"f"),this.asn=B.parse(e[0],e[1],e[2]),ie(this,Li,_.BufferSourceConverter.toArrayBuffer(e[0]),"f"),this.onInit(this.asn)):(ie(this,ji,e[1],"f"),this.asn=e[0],this.onInit(this.asn))}equal(e){return e instanceof t?(0,_.isEqual)(e.rawData,this.rawData):!1}toString(e="text"){switch(e){case"asn":return B.toString(this.rawData,L(this,ji,"f"));case"text":return Cr.serialize(this.toTextObject());case"hex":return _.Convert.ToHex(this.rawData);case"base64":return _.Convert.ToBase64(this.rawData);case"base64url":return _.Convert.ToBase64Url(this.rawData);default:throw TypeError("Argument 'format' is unsupported value")}}getTextName(){return this.constructor.NAME}toTextObject(){let e=this.toTextObjectEmpty();return e[""]=this.rawData,e}toTextObjectEmpty(e){return new ue(this.getTextName(),{},e)}};Li=new WeakMap,ji=new WeakMap;Yr.NAME="ASN";var Hg,Ua=class t{static isCryptoKeyPair(e){return e&&e.privateKey&&e.publicKey}static isCryptoKey(e){return e&&e.usages&&e.type&&e.algorithm&&e.extractable!==void 0}constructor(){this.items=new Map,this[Hg]="CryptoProvider",typeof self<"u"&&typeof crypto<"u"?this.set(t.DEFAULT,crypto):typeof global<"u"&&global.crypto&&global.crypto.subtle&&this.set(t.DEFAULT,global.crypto)}clear(){this.items.clear()}delete(e){return this.items.delete(e)}forEach(e,r){return this.items.forEach(e,r)}has(e){return this.items.has(e)}get size(){return this.items.size}entries(){return this.items.entries()}keys(){return this.items.keys()}values(){return this.items.values()}[Symbol.iterator](){return this.items[Symbol.iterator]()}get(e=t.DEFAULT){let r=this.items.get(e.toLowerCase());if(!r)throw new Error(`Cannot get Crypto by name '${e}'`);return r}set(e,r){if(typeof e=="string"){if(!r)throw new TypeError("Argument 'value' is required");this.items.set(e.toLowerCase(),r)}else this.items.set(t.DEFAULT,e);return this}};Hg=Symbol.toStringTag;Ua.DEFAULT="default";var nt=new Ua,kr={berOptions:{maxDepth:1/0,maxNodes:1/0,maxContentLength:1/0}};function Vw(t){let e=0;for(;e<t.length-1&&t[e]===0;)e++;let r=t.slice(e);if(r.length||(r=new Uint8Array([0])),r[0]>127){let n=new Uint8Array(r.length+1);n[0]=0,n.set(r,1),r=n}return r.buffer}function Ug(t){return Vw(_.BufferSourceConverter.toUint8Array(_.Convert.FromHex(t||"")))}function Gg(t){let e=_.BufferSourceConverter.toUint8Array(t);return e.length>1&&e[0]===0&&e[1]>127&&(e=e.slice(1)),_.Convert.ToHex(e)}var yt=class t extends Yr{constructor(...e){let r,n;_.BufferSourceConverter.isBufferSource(e[0])?(r=_.BufferSourceConverter.toArrayBuffer(e[0]),n=e[1]):(r=B.serialize(new et({extnID:e[0],critical:e[1],extnValue:new R(_.BufferSourceConverter.toArrayBuffer(e[2]))})),n=kr),super(r,et,n)}onInit(e){this.type=e.extnID,this.critical=e.critical,this.value=e.extnValue.buffer}toTextObject(){let e=this.toTextObjectWithoutValue();return e[""]=this.value,e}toTextObjectWithoutValue(){let e=this.toTextObjectEmpty(this.critical?"critical":void 0);return e[ue.NAME]===t.NAME&&(e[ue.NAME]=Qt.toString(this.type)),e}},Kw=/^[0-2](?:\.[1-9][0-9]*)+$/;function Ww(t){return new RegExp(Kw).test(t)}var fl=class{constructor(e={}){this.items={};for(let r in e)this.register(r,e[r])}get(e){return this.items[e]||null}findId(e){return Ww(e)?e:this.get(e)}register(e,r){this.items[e]=r,this.items[r]=e}},ft=new fl;ft.register("CN","2.5.4.3");ft.register("L","2.5.4.7");ft.register("ST","2.5.4.8");ft.register("O","2.5.4.10");ft.register("OU","2.5.4.11");ft.register("C","2.5.4.6");ft.register("DC","0.9.2342.19200300.100.1.25");ft.register("E","1.2.840.113549.1.9.1");ft.register("G","2.5.4.42");ft.register("I","2.5.4.43");ft.register("SN","2.5.4.4");ft.register("T","2.5.4.12");function Fw(t,e){return`\\${_.Convert.ToHex(_.Convert.FromUtf8String(e)).toUpperCase()}`}function zw(t){return t.replace(/([,+"\\<>;])/g,"\\$1").replace(/^([ #])/,"\\$1").replace(/([ ]$)/,"\\$1").replace(/([\r\n\t])/,Fw)}var Hn=class t{static isASCII(e){for(let r=0;r<e.length;r++)if(e.charCodeAt(r)>255)return!1;return!0}static isPrintableString(e){return/^[A-Za-z0-9 '()+,-./:=?]*$/g.test(e)}constructor(e,r={}){this.extraNames=new fl,this.asn=new be;for(let n in r)if(Object.prototype.hasOwnProperty.call(r,n)){let o=r[n];this.extraNames.register(n,o)}typeof e=="string"?this.asn=this.fromString(e):e instanceof be?this.asn=e:_.BufferSourceConverter.isBufferSource(e)?this.asn=B.parse(e,be):this.asn=this.fromJSON(e)}getField(e){let r=this.extraNames.findId(e)||ft.findId(e),n=[];for(let o of this.asn)for(let i of o)i.type===r&&n.push(i.value.toString());return n}getName(e){return this.extraNames.get(e)||ft.get(e)}toString(){return this.asn.map(e=>e.map(r=>{let n=this.getName(r.type)||r.type,o=r.value.anyValue?`#${_.Convert.ToHex(r.value.anyValue)}`:zw(r.value.toString());return`${n}=${o}`}).join("+")).join(", ")}toJSON(){var e;let r=[];for(let n of this.asn){let o={};for(let i of n){let a=this.getName(i.type)||i.type;(e=o[a])!==null&&e!==void 0||(o[a]=[]),o[a].push(i.value.anyValue?`#${_.Convert.ToHex(i.value.anyValue)}`:i.value.toString())}r.push(o)}return r}fromString(e){let r=new be,n=/(\d\.[\d.]*\d|[A-Za-z]+)=((?:"")|(?:".*?[^\\]")|(?:[^,+"\\](?=[,+]|$))|(?:[^,+].*?(?:[^\\][,+]))|(?:))([,+])?/g,o=null,i=",";for(;o=n.exec(`${e},`);){let[,a,c]=o,u=c[c.length-1];(u===","||u==="+")&&(c=c.slice(0,c.length-1),o[3]=u);let d=o[3];a=this.getTypeOid(a);let p=this.createAttribute(a,c);i==="+"?r[r.length-1].push(p):r.push(new hn([p])),i=d}return r}fromJSON(e){let r=new be;for(let n of e){let o=new hn;for(let i in n){let a=this.getTypeOid(i),c=n[i];for(let u of c){let d=this.createAttribute(a,u);o.push(d)}}r.push(o)}return r}getTypeOid(e){if(/[\d.]+/.test(e)||(e=this.getName(e)||""),!e)throw new Error(`Cannot get OID for name type '${e}'`);return e}createAttribute(e,r){let n=new uo({type:e});if(typeof r=="object")for(let o in r)switch(o){case"ia5String":n.value.ia5String=r[o];break;case"utf8String":n.value.utf8String=r[o];break;case"universalString":n.value.universalString=r[o];break;case"bmpString":n.value.bmpString=r[o];break;case"printableString":n.value.printableString=r[o];break}else if(r[0]==="#")n.value.anyValue=_.Convert.FromHex(r.slice(1));else{let o=this.processStringValue(r);e===this.getName("E")||e===this.getName("DC")?n.value.ia5String=o:t.isPrintableString(o)?n.value.printableString=o:n.value.utf8String=o}return n}processStringValue(e){let r=/"(.*?[^\\])?"/.exec(e);return r&&(e=r[1]),e.replace(/\\0a/gi,`
`).replace(/\\0d/gi,"\r").replace(/\\0g/gi,"	").replace(/\\(.)/g,"$1")}toArrayBuffer(){return B.serialize(this.asn)}async getThumbprint(e,r){let n,o="SHA-1";return e&&(typeof e=="object"&&"subtle"in e?n=e:(o=e,n=r)),n??(n=nt.get()),await n.subtle.digest(o,this.toArrayBuffer())}},$g="Cannot initialize GeneralName from ASN.1 data.",Tg=`${$g} Unsupported string format in use.`,qw=`${$g} Value doesn't match to GUID regular expression.`,Ig=/^([0-9a-f]{8})-?([0-9a-f]{4})-?([0-9a-f]{4})-?([0-9a-f]{4})-?([0-9a-f]{12})$/i,_g="1.3.6.1.4.1.311.25.1",Bg="1.3.6.1.4.1.311.20.2.3",ep="dns",tp="dn",rp="email",np="ip",op="url",ip="guid",sp="upn",cl="id",Sr=class extends Yr{constructor(...e){var r;let n,o;if(_.BufferSourceConverter.isBufferSource(e[0]))o=e[1],n=B.parse(e[0],Q,o);else if(typeof e[0]=="string")switch(o=kr,e[0]){case tp:{let i=new Hn(e[1]).toArrayBuffer(),a=B.parse(i,be,kr);n=new Q({directoryName:a});break}case ep:n=new Q({dNSName:e[1]});break;case rp:n=new Q({rfc822Name:e[1]});break;case ip:{let i=new RegExp(Ig,"i").exec(e[1]);if(!i)throw new Error("Cannot parse GUID value. Value doesn't match to regular expression");let a=i.slice(1).map((c,u)=>u<3?_.Convert.ToHex(new Uint8Array(_.Convert.FromHex(c)).reverse()):c).join("");n=new Q({otherName:new mn({typeId:_g,value:B.serialize(new R(_.Convert.FromHex(a)))})});break}case np:n=new Q({iPAddress:e[1]});break;case cl:n=new Q({registeredID:e[1]});break;case sp:{n=new Q({otherName:new mn({typeId:Bg,value:B.serialize(mu.toASN(e[1]))})});break}case op:n=new Q({uniformResourceIdentifier:e[1]});break;default:throw new Error("Cannot create GeneralName. Unsupported type of the name")}else n=e[0],o=(r=e[1])!==null&&r!==void 0?r:kr;super(n,o)}onInit(e){if(e.dNSName!=null)this.type=ep,this.value=e.dNSName;else if(e.rfc822Name!=null)this.type=rp,this.value=e.rfc822Name;else if(e.iPAddress!=null)this.type=np,this.value=e.iPAddress;else if(e.uniformResourceIdentifier!=null)this.type=op,this.value=e.uniformResourceIdentifier;else if(e.registeredID!=null)this.type=cl,this.value=e.registeredID;else if(e.directoryName!=null)this.type=tp,this.value=new Hn(e.directoryName).toString();else if(e.otherName!=null)if(e.otherName.typeId===_g){this.type=ip;let r=B.parse(e.otherName.value,R,this.parseOptions),n=new RegExp(Ig,"i").exec(_.Convert.ToHex(r));if(!n)throw new Error(qw);this.value=n.slice(1).map((o,i)=>i<3?_.Convert.ToHex(new Uint8Array(_.Convert.FromHex(o)).reverse()):o).join("-")}else if(e.otherName.typeId===Bg)this.type=sp,this.value=B.parse(e.otherName.value,Me,this.parseOptions).toString();else throw new Error(Tg);else throw new Error(Tg)}toJSON(){return{type:this.type,value:this.value}}toTextObject(){let e;switch(this.type){case tp:case ep:case ip:case np:case cl:case sp:case op:e=this.type.toUpperCase();break;case rp:e="Email";break;default:throw new Error("Unsupported GeneralName type")}let r=this.value;return this.type===cl&&(r=Qt.toString(r)),new ue(e,void 0,r)}},Jr=class extends Yr{constructor(e,r){let n,o=kr;if(e instanceof ve)n=e;else if(Array.isArray(e)){let i=[];for(let a of e)if(a instanceof Q)i.push(a);else{let c=B.parse(new Sr(a.type,a.value).rawData,Q,kr);i.push(c)}n=new ve(i)}else if(_.BufferSourceConverter.isBufferSource(e))n=B.parse(e,ve,r),o=r??{};else throw new Error("Cannot initialize GeneralNames. Incorrect incoming arguments");super(n,o)}onInit(e){let r=[];for(let n of e){let o=null;try{o=new Sr(n,this.parseOptions)}catch{continue}r.push(o)}this.items=r}toJSON(){return this.items.map(e=>e.toJSON())}toTextObject(){let e=super.toTextObjectEmpty();for(let r of this.items){let n=r.toTextObject(),o=e[n[ue.NAME]];Array.isArray(o)||(o=[],e[n[ue.NAME]]=o),o.push(n)}return e}};Jr.NAME="GeneralNames";var ja="-{5}",Ga="\\n",Xw=`[^${Ga}]+`,Yw=`${ja}BEGIN (${Xw}(?=${ja}))${ja}`,Jw=`${ja}END \\1${ja}`,Wi="\\n",Qw=`[^:${Ga}]+`,Zw=`(?:[^${Ga}]+${Wi}(?: +[^${Ga}]+${Wi})*)`,ex="[a-zA-Z0-9=+/]+",tx=`(?:${ex}${Wi})+`,Rg=`${Yw}${Wi}(?:((?:${Qw}: ${Zw})+))?${Wi}?(${tx})${Jw}`,rx=new RegExp(`[${Ga}]+`,"g"),$e=class{static isPem(e){return typeof e=="string"&&new RegExp(Rg,"g").test(e.replace(/\r/g,""))}static decodeWithHeaders(e){e=e.replace(/\r/g,"");let r=new RegExp(Rg,"g"),n=[],o=null;for(;o=r.exec(e);){let i=o[3].replace(rx,""),a={type:o[1],headers:[],rawData:_.Convert.FromBase64(i)},c=o[2];if(c){let u=c.split(new RegExp(Wi,"g")),d=null;for(let p of u){let[h,g]=p.split(/:(.*)/);if(g===void 0){if(!d)throw new Error("Cannot parse PEM string. Incorrect header value");d.value+=h.trim()}else d&&a.headers.push(d),d={key:h,value:g.trim()}}d&&a.headers.push(d)}n.push(a)}return n}static decode(e){return this.decodeWithHeaders(e).map(n=>n.rawData)}static decodeFirst(e){let r=this.decode(e);if(!r.length)throw new RangeError("PEM string doesn't contain any objects");return r[0]}static encode(e,r){if(Array.isArray(e)){let n=new Array;return r?e.forEach(o=>{if(!_.BufferSourceConverter.isBufferSource(o))throw new TypeError("Cannot encode array of BufferSource in PEM format. Not all items of the array are BufferSource");n.push(this.encodeStruct({type:r,rawData:_.BufferSourceConverter.toArrayBuffer(o)}))}):e.forEach(o=>{if(!("type"in o))throw new TypeError("Cannot encode array of PemStruct in PEM format. Not all items of the array are PemStrut");n.push(this.encodeStruct(o))}),n.join(`
`)}else{if(!r)throw new Error("Required argument 'tag' is missed");return this.encodeStruct({type:r,rawData:_.BufferSourceConverter.toArrayBuffer(e)})}}static encodeStruct(e){var r;let n=e.type.toLocaleUpperCase(),o=[];if(o.push(`-----BEGIN ${n}-----`),!((r=e.headers)===null||r===void 0)&&r.length){for(let a of e.headers)o.push(`${a.key}: ${a.value}`);o.push("")}let i=_.Convert.ToBase64(e.rawData);for(let a=0;a<i.length;a+=64)o.push(i.substring(a,a+64));return o.push(`-----END ${n}-----`),o.join(`
`)}};$e.CertificateTag="CERTIFICATE";$e.CrlTag="CRL";$e.CertificateRequestTag="CERTIFICATE REQUEST";$e.PublicKeyTag="PUBLIC KEY";$e.PrivateKeyTag="PRIVATE KEY";var jt=class t extends Yr{static isAsnEncoded(e){return _.BufferSourceConverter.isBufferSource(e)||typeof e=="string"}static toArrayBuffer(e){if(typeof e=="string"){if($e.isPem(e))return $e.decode(e)[0];if(_.Convert.isHex(e))return _.Convert.FromHex(e);if(_.Convert.isBase64(e))return _.Convert.FromBase64(e);if(_.Convert.isBase64Url(e))return _.Convert.FromBase64Url(e);throw new TypeError("Unsupported format of 'raw' argument. Must be one of DER, PEM, HEX, Base64, or Base4Url")}else{let r=_.BufferSourceConverter.toUint8Array(e);if(r.length>0&&r[0]===48)return _.BufferSourceConverter.toArrayBuffer(e);let n=_.Convert.ToBinary(e);if($e.isPem(n))return $e.decode(n)[0];if(_.Convert.isHex(n))return _.Convert.FromHex(n);if(_.Convert.isBase64(n))return _.Convert.FromBase64(n);if(_.Convert.isBase64Url(n))return _.Convert.FromBase64Url(n);throw new TypeError("Unsupported format of 'raw' argument. Must be one of DER, PEM, HEX, Base64, or Base4Url")}}constructor(...e){t.isAsnEncoded(e[0])?super(t.toArrayBuffer(e[0]),e[1],e[2]):super(e[0],e[1])}toString(e="pem"){return e==="pem"?$e.encode(this.rawData,this.tag):super.toString(e)}},Xr=class t extends jt{static async create(e,r=nt.get()){if(e instanceof t)return e;if(Ua.isCryptoKey(e)){if(e.type!=="public")throw new TypeError("Public key is required");let n=await r.subtle.exportKey("spki",e);return new t(n)}else{if(e.publicKey)return e.publicKey;if(_.BufferSourceConverter.isBufferSource(e))return new t(e);throw new TypeError("Unsupported PublicKeyType")}}constructor(e,r){jt.isAsnEncoded(e)?super(e,je,r):super(e,r),this.tag=$e.PublicKeyTag}async export(e,r,n){let o,i=["verify"],a={hash:"SHA-256",...this.algorithm};r?(a=e,i=r,o=n):o=e,o??(o=nt.get());let c=this.rawData,u=B.parse(this.rawData,je,this.parseOptions);return u.algorithm.algorithm===_n&&(c=nx(u,c)),o.subtle.importKey("spki",c,a,!0,i)}onInit(e){let r=ge.resolve(Wo),n=this.algorithm=r.toWebAlgorithm(e.algorithm);if(e.algorithm.algorithm===Dt){let o=B.parse(e.subjectPublicKey,Nn,this.parseOptions),i=_.BufferSourceConverter.toUint8Array(o.modulus);n.publicExponent=_.BufferSourceConverter.toUint8Array(o.publicExponent),n.modulusLength=(i[0]?i:i.slice(1)).byteLength<<3}}async getThumbprint(e,r){let n,o="SHA-1";return e&&(typeof e=="object"&&"subtle"in e?n=e:(o=e,n=r)),n??(n=nt.get()),await n.subtle.digest(o,this.rawData)}async getKeyIdentifier(e,r){let n,o="SHA-1";e&&(typeof e=="object"&&"subtle"in e?n=e:(o=e,n=r)),n??(n=nt.get());let i=B.parse(this.rawData,je,this.parseOptions);return await n.subtle.digest(o,i.subjectPublicKey)}toTextObject(){let e=this.toTextObjectEmpty(),r=B.parse(this.rawData,je,this.parseOptions);switch(e.Algorithm=Cr.serializeAlgorithm(r.algorithm),r.algorithm.algorithm){case Wr:e["EC Point"]=r.subjectPublicKey;break;case Dt:default:e["Raw Data"]=r.subjectPublicKey}return e}};function nx(t,e){return t.algorithm=new T({algorithm:Dt,parameters:null}),e=B.serialize(t),e}var Fo=class t extends yt{static async create(e,r=!1,n=nt.get()){if("name"in e&&"serialNumber"in e)return new t(e,r);let i=await(await Xr.create(e,n)).getKeyIdentifier(n);return new t(_.Convert.ToHex(i),r)}constructor(...e){if(_.BufferSourceConverter.isBufferSource(e[0]))super(e[0],e[1]);else if(typeof e[0]=="string"){let r=new yr({keyIdentifier:new ho(_.Convert.FromHex(e[0]))});super(Ss,e[1],B.serialize(r))}else{let r=e[0],n=r.name instanceof Jr?B.parse(r.name.rawData,ve,kr):r.name,o=new yr({authorityCertIssuer:n,authorityCertSerialNumber:_.Convert.FromHex(r.serialNumber)});super(Ss,e[1],B.serialize(o))}}onInit(e){super.onInit(e);let r=B.parse(e.extnValue,yr,this.parseOptions);r.keyIdentifier&&(this.keyId=_.Convert.ToHex(r.keyIdentifier)),(r.authorityCertIssuer||r.authorityCertSerialNumber)&&(this.certId={name:r.authorityCertIssuer||[],serialNumber:r.authorityCertSerialNumber?_.Convert.ToHex(r.authorityCertSerialNumber):""})}toTextObject(){let e=this.toTextObjectWithoutValue(),r=B.parse(this.value,yr,this.parseOptions);return r.authorityCertIssuer&&(e["Authority Issuer"]=new Jr(r.authorityCertIssuer).toTextObject()),r.authorityCertSerialNumber&&(e["Authority Serial Number"]=r.authorityCertSerialNumber),r.keyIdentifier&&(e[""]=r.keyIdentifier),e}};Fo.NAME="Authority Key Identifier";var hl=class extends yt{constructor(...e){if(_.BufferSourceConverter.isBufferSource(e[0])){super(e[0],e[1]);let r=B.parse(this.value,Hr,this.parseOptions);this.ca=r.cA,this.pathLength=r.pathLenConstraint}else{let r=new Hr({cA:e[0],pathLenConstraint:e[1]});super(ai,e[2],B.serialize(r)),this.ca=e[0],this.pathLength=e[1]}}toTextObject(){let e=this.toTextObjectWithoutValue();return this.ca&&(e.CA=this.ca),this.pathLength!==void 0&&(e["Path Length"]=this.pathLength),e}};hl.NAME="Basic Constraints";var Mg;(function(t){t.serverAuth="1.3.6.1.5.5.7.3.1",t.clientAuth="1.3.6.1.5.5.7.3.2",t.codeSigning="1.3.6.1.5.5.7.3.3",t.emailProtection="1.3.6.1.5.5.7.3.4",t.timeStamping="1.3.6.1.5.5.7.3.8",t.ocspSigning="1.3.6.1.5.5.7.3.9"})(Mg||(Mg={}));var ml=class extends yt{constructor(...e){if(_.BufferSourceConverter.isBufferSource(e[0])){super(e[0],e[1]);let r=B.parse(this.value,go,this.parseOptions);this.usages=r.map(n=>n)}else{let r=new go(e[0]);super(li,e[1],B.serialize(r)),this.usages=e[0]}}toTextObject(){let e=this.toTextObjectWithoutValue();return e[""]=this.usages.map(r=>Qt.toString(r)).join(", "),e}};ml.NAME="Extended Key Usages";var Pg;(function(t){t[t.digitalSignature=1]="digitalSignature",t[t.nonRepudiation=2]="nonRepudiation",t[t.keyEncipherment=4]="keyEncipherment",t[t.dataEncipherment=8]="dataEncipherment",t[t.keyAgreement=16]="keyAgreement",t[t.keyCertSign=32]="keyCertSign",t[t.cRLSign=64]="cRLSign",t[t.encipherOnly=128]="encipherOnly",t[t.decipherOnly=256]="decipherOnly"})(Pg||(Pg={}));var gl=class extends yt{constructor(...e){if(_.BufferSourceConverter.isBufferSource(e[0])){super(e[0],e[1]);let r=B.parse(this.value,di,this.parseOptions);this.usages=r.toNumber()}else{let r=new di(e[0]);super(Pc,e[1],B.serialize(r)),this.usages=e[0]}}toTextObject(){let e=this.toTextObjectWithoutValue(),r=B.parse(this.value,di,this.parseOptions);return e[""]=r.toJSON().join(", "),e}};gl.NAME="Key Usages";var zo=class t extends yt{static async create(e,r=!1,n=nt.get()){let i=await(await Xr.create(e,n)).getKeyIdentifier(n);return new t(_.Convert.ToHex(i),r)}constructor(...e){if(_.BufferSourceConverter.isBufferSource(e[0])){super(e[0],e[1]);let r=B.parse(this.value,ct,this.parseOptions);this.keyId=_.Convert.ToHex(r)}else{let r=typeof e[0]=="string"?_.Convert.FromHex(e[0]):e[0],n=new ct(r);super(Lc,e[1],B.serialize(n)),this.keyId=_.Convert.ToHex(r)}}toTextObject(){let e=this.toTextObjectWithoutValue(),r=B.parse(this.value,ct,this.parseOptions);return e[""]=r,e}};zo.NAME="Subject Key Identifier";var yl=class extends yt{constructor(...e){_.BufferSourceConverter.isBufferSource(e[0])?super(e[0],e[1]):super(hi,e[1],new Jr(e[0]||[]).rawData)}onInit(e){super.onInit(e);let r=B.parse(e.extnValue,fi,this.parseOptions);this.names=new Jr(r)}toTextObject(){let e=this.toTextObjectWithoutValue(),r=this.names.toTextObject();for(let n in r)e[n]=r[n];return e}};yl.NAME="Subject Alternative Name";var Ve=class{static register(e,r){this.items.set(e,r)}static create(e,r){let n=new yt(e,r),o=this.items.get(n.type);return o?new o(e,r):n}};Ve.items=new Map;var bl=class extends yt{constructor(...e){var r;if(_.BufferSourceConverter.isBufferSource(e[0])){super(e[0],e[1]);let n=B.parse(this.value,Is,this.parseOptions);this.policies=n.map(o=>o.policyIdentifier)}else{let n=e[0],o=(r=e[1])!==null&&r!==void 0?r:!1,i=new Is(n.map(a=>new mo({policyIdentifier:a})));super(Rc,o,B.serialize(i)),this.policies=n}}toTextObject(){let e=this.toTextObjectWithoutValue();return e.Policy=this.policies.map(r=>new ue("",{},Qt.toString(r))),e}};bl.NAME="Certificate Policies";Ve.register(Rc,bl);var Fi=class extends yt{constructor(...e){var r;if(_.BufferSourceConverter.isBufferSource(e[0]))super(e[0],e[1]);else if(Array.isArray(e[0])&&typeof e[0][0]=="string"){let o=e[0].map(a=>new br({distributionPoint:new Gr({fullName:[new Q({uniformResourceIdentifier:a})]})})),i=new bn(o);super(Mc,e[1],B.serialize(i))}else{let n=new bn(e[0]);super(Mc,e[1],B.serialize(n))}(r=this.distributionPoints)!==null&&r!==void 0||(this.distributionPoints=[])}onInit(e){super.onInit(e);let r=B.parse(e.extnValue,bn,this.parseOptions);this.distributionPoints=r}toTextObject(){let e=this.toTextObjectWithoutValue();return e["Distribution Point"]=this.distributionPoints.map(r=>{var n;let o=new ue("");return!((n=r.distributionPoint)===null||n===void 0)&&n.fullName&&(o[""]=r.distributionPoint.fullName.map(i=>new Sr(i).toString()).join(", ")),r.reasons&&(o.Reasons=r.reasons.toString()),r.cRLIssuer&&(o["CRL Issuer"]=r.cRLIssuer.map(i=>i.toString()).join(", ")),o}),e}};Fi.NAME="CRL Distribution Points";var wl=class extends yt{constructor(...e){var r,n,o,i;if(_.BufferSourceConverter.isBufferSource(e[0]))super(e[0],e[1]);else if(e[0]instanceof fo){let a=new fo(e[0]);super(_c,e[1],B.serialize(a))}else{let a=e[0],c=new fo;ul(c,a,Au,"ocsp"),ul(c,a,Eu,"caIssuers"),ul(c,a,Su,"timeStamping"),ul(c,a,ku,"caRepository"),super(_c,e[1],B.serialize(c))}(r=this.ocsp)!==null&&r!==void 0||(this.ocsp=[]),(n=this.caIssuers)!==null&&n!==void 0||(this.caIssuers=[]),(o=this.timeStamping)!==null&&o!==void 0||(this.timeStamping=[]),(i=this.caRepository)!==null&&i!==void 0||(this.caRepository=[])}onInit(e){super.onInit(e),this.ocsp=[],this.caIssuers=[],this.timeStamping=[],this.caRepository=[],B.parse(e.extnValue,fo,this.parseOptions).forEach(n=>{switch(n.accessMethod){case Au:this.ocsp.push(new Sr(n.accessLocation));break;case Eu:this.caIssuers.push(new Sr(n.accessLocation));break;case Su:this.timeStamping.push(new Sr(n.accessLocation));break;case ku:this.caRepository.push(new Sr(n.accessLocation));break}})}toTextObject(){let e=this.toTextObjectWithoutValue();return this.ocsp.length&&ll(e,"OCSP",this.ocsp),this.caIssuers.length&&ll(e,"CA Issuers",this.caIssuers),this.timeStamping.length&&ll(e,"Time Stamping",this.timeStamping),this.caRepository.length&&ll(e,"CA Repository",this.caRepository),e}};wl.NAME="Authority Info Access";function ll(t,e,r){if(r.length===1)t[e]=r[0].toTextObject();else{let n=new ue("");r.forEach((o,i)=>{let a=o.toTextObject(),c=`${a[ue.NAME]} ${i+1}`,u=n[c];Array.isArray(u)||(u=[],n[c]=u),u.push(a)}),t[e]=n}}function ul(t,e,r,n){let o=e[n];o&&(Array.isArray(o)?o:[o]).forEach(a=>{typeof a=="string"&&(a=new Sr("url",a)),t.push(new jr({accessMethod:r,accessLocation:B.parse(a.rawData,Q,kr)}))})}var xl=class extends yt{constructor(...e){_.BufferSourceConverter.isBufferSource(e[0])?super(e[0],e[1]):super(Lu,e[1],new Jr(e[0]||[]).rawData)}onInit(e){super.onInit(e);let r=B.parse(e.extnValue,ve,this.parseOptions);this.names=new Jr(r)}toTextObject(){let e=this.toTextObjectWithoutValue(),r=this.names.toTextObject();for(let n in r)e[n]=r[n];return e}};xl.NAME="Issuer Alternative Name";var zi=class t extends Yr{constructor(...e){let r,n;if(_.BufferSourceConverter.isBufferSource(e[0]))r=_.BufferSourceConverter.toArrayBuffer(e[0]),n=e[1];else{let o=e[0],i=Array.isArray(e[1])?e[1].map(a=>_.BufferSourceConverter.toArrayBuffer(a)):[];r=B.serialize(new Ue({type:o,values:i})),n=kr}super(r,Ue,n)}onInit(e){this.type=e.type,this.values=e.values}toTextObject(){let e=this.toTextObjectWithoutValue();return e.Value=this.values.map(r=>new ue("",{"":r})),e}toTextObjectWithoutValue(){let e=this.toTextObjectEmpty();return e[ue.NAME]===t.NAME&&(e[ue.NAME]=Qt.toString(this.type)),e}};zi.NAME="Attribute";var vl=class extends zi{constructor(...e){var r;if(_.BufferSourceConverter.isBufferSource(e[0]))super(e[0],e[1]);else{let n=new aa({printableString:e[0]});super(Nd,[B.serialize(n)])}(r=this.password)!==null&&r!==void 0||(this.password="")}onInit(e){if(super.onInit(e),this.values[0]){let r=B.parse(this.values[0],aa,this.parseOptions);this.password=r.toString()}}toTextObject(){let e=this.toTextObjectWithoutValue();return e[ue.VALUE]=this.password,e}};vl.NAME="Challenge Password";var $a=class extends zi{constructor(...e){var r;if(_.BufferSourceConverter.isBufferSource(e[0]))super(e[0],e[1]);else{let n=e[0],o=new Rt;for(let i of n)o.push(B.parse(i.rawData,et,kr));super(la,[B.serialize(o)])}(r=this.items)!==null&&r!==void 0||(this.items=[])}onInit(e){if(super.onInit(e),this.values[0]){let r=B.parse(this.values[0],Rt,this.parseOptions);this.items=r.map(n=>Ve.create(B.serialize(n),this.parseOptions))}}toTextObject(){let e=this.toTextObjectWithoutValue(),r=this.items.map(n=>n.toTextObject());for(let n of r)e[n[ue.NAME]]=n;return e}};$a.NAME="Extensions";var qi=class{static register(e,r){this.items.set(e,r)}static create(e,r){let n=new zi(e,r),o=this.items.get(n.type);return o?new o(e,r):n}};qi.items=new Map;var Va="crypto.signatureFormatter",dp=class{toAsnSignature(e,r){return _.BufferSourceConverter.toArrayBuffer(r)}toWebSignature(e,r){return _.BufferSourceConverter.toArrayBuffer(r)}},pl,pp=pl=class{static createPssParams(e,r){let n=pl.getHashAlgorithm(e);return n?new xr({hashAlgorithm:n,maskGenAlgorithm:new T({algorithm:Pn,parameters:B.serialize(n)}),saltLength:r}):null}static getHashAlgorithm(e){let r=ge.resolve(Wo);return typeof e=="string"?r.toAsnAlgorithm({name:e}):typeof e=="object"&&e&&"name"in e?r.toAsnAlgorithm(e):null}toAsnAlgorithm(e){switch(e.name.toLowerCase()){case"rsassa-pkcs1-v1_5":if("hash"in e){let r;if(typeof e.hash=="string")r=e.hash;else if(e.hash&&typeof e.hash=="object"&&"name"in e.hash&&typeof e.hash.name=="string")r=e.hash.name.toUpperCase();else throw new Error("Cannot get hash algorithm name");switch(r.toLowerCase()){case"sha-1":return new T({algorithm:Bn,parameters:null});case"sha-256":return new T({algorithm:Bi,parameters:null});case"sha-384":return new T({algorithm:Rn,parameters:null});case"sha-512":return new T({algorithm:Mn,parameters:null})}}else return new T({algorithm:Dt,parameters:null});break;case"rsa-pss":if("hash"in e){if(!("saltLength"in e&&typeof e.saltLength=="number"))throw new Error("Cannot get 'saltLength' from 'alg' argument");let r=pl.createPssParams(e.hash,e.saltLength);if(!r)throw new Error("Cannot create PSS parameters");return new T({algorithm:_n,parameters:B.serialize(r)})}else return new T({algorithm:_n,parameters:null})}return null}toWebAlgorithm(e){switch(e.algorithm){case Dt:return{name:"RSASSA-PKCS1-v1_5"};case Bn:return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-1"}};case Bi:return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-256"}};case Rn:return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-384"}};case Mn:return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-512"}};case _n:if(e.parameters){let r=B.parse(e.parameters,xr);return{name:"RSA-PSS",hash:ge.resolve(Wo).toWebAlgorithm(r.hashAlgorithm),saltLength:r.saltLength}}else return{name:"RSA-PSS"}}return null}};pp=pl=s([Ar()],pp);ge.registerSingleton(qo,pp);var fp=class{toAsnAlgorithm(e){switch(e.name.toLowerCase()){case"sha-1":return new T({algorithm:Ro});case"sha-256":return new T({algorithm:Mo});case"sha-384":return new T({algorithm:Po});case"sha-512":return new T({algorithm:No})}return null}toWebAlgorithm(e){switch(e.algorithm){case Ro:return{name:"SHA-1"};case Mo:return{name:"SHA-256"};case Po:return{name:"SHA-384"};case No:return{name:"SHA-512"}}return null}};fp=s([Ar()],fp);ge.registerSingleton(qo,fp);var Qr=class t{addPadding(e,r){let n=_.BufferSourceConverter.toUint8Array(r),o=new Uint8Array(e);return o.set(n,e-n.length),o.buffer}removePadding(e,r=!1){let n=_.BufferSourceConverter.toUint8Array(e);for(let o=0;o<n.length;o++)if(n[o]){n=n.slice(o);break}if(r&&n[0]>127){let o=new Uint8Array(n.length+1);return o.set(n,1),o.buffer}return n.buffer}toAsnSignature(e,r){if(e.name==="ECDSA"){let n=e.namedCurve,o=t.namedCurveSize.get(n)||t.defaultNamedCurveSize,i=new Fr,a=_.BufferSourceConverter.toUint8Array(r);return i.r=this.removePadding(a.slice(0,o),!0),i.s=this.removePadding(a.slice(o,o+o),!0),B.serialize(i)}return null}toWebSignature(e,r){if(e.name==="ECDSA"){let n=B.parse(r,Fr),o=e.namedCurve,i=t.namedCurveSize.get(o)||t.defaultNamedCurveSize,a=this.addPadding(i,this.removePadding(n.r)),c=this.addPadding(i,this.removePadding(n.s));return(0,_.combine)(a,c)}return null}};Qr.namedCurveSize=new Map;Qr.defaultNamedCurveSize=32;var ap="1.3.101.110",Ng="1.3.101.111",cp="1.3.101.112",Og="1.3.101.113",hp=class{toAsnAlgorithm(e){let r=null;switch(e.name.toLowerCase()){case"ed25519":r=cp;break;case"x25519":r=ap;break;case"eddsa":switch(e.namedCurve.toLowerCase()){case"ed25519":r=cp;break;case"ed448":r=Og;break}break;case"ecdh-es":switch(e.namedCurve.toLowerCase()){case"x25519":r=ap;break;case"x448":r=Ng;break}}return r?new T({algorithm:r}):null}toWebAlgorithm(e){switch(e.algorithm){case cp:return{name:"Ed25519"};case Og:return{name:"EdDSA",namedCurve:"Ed448"};case ap:return{name:"X25519"};case Ng:return{name:"ECDH-ES",namedCurve:"X448"}}return null}};hp=s([Ar()],hp);ge.registerSingleton(qo,hp);var mp=class{toAsnAlgorithm(e){let r=null;switch(e.name.toLowerCase()){case"ml-dsa-44":r=Go;break;case"ml-dsa-65":r=$o;break;case"ml-dsa-87":r=Vo;break}return r?new T({algorithm:r}):null}toWebAlgorithm(e){switch(e.algorithm){case Go:return{name:"ML-DSA-44"};case $o:return{name:"ML-DSA-65"};case Vo:return{name:"ML-DSA-87"}}return null}};mp=s([Ar()],mp);ge.registerSingleton(qo,mp);var gp=class{toAsnAlgorithm(e){let r=null;switch(e.name.toLowerCase()){case"slh-dsa-sha2-128s":r=Gd;break;case"slh-dsa-sha2-128f":r=$d;break;case"slh-dsa-sha2-192s":r=Vd;break;case"slh-dsa-sha2-192f":r=Kd;break;case"slh-dsa-sha2-256s":r=Wd;break;case"slh-dsa-sha2-256f":r=Fd;break;case"slh-dsa-shake-128s":r=zd;break;case"slh-dsa-shake-128f":r=qd;break;case"slh-dsa-shake-192s":r=Xd;break;case"slh-dsa-shake-192f":r=Yd;break;case"slh-dsa-shake-256s":r=Jd;break;case"slh-dsa-shake-256f":r=Qd;break}return r?new T({algorithm:r}):null}toWebAlgorithm(e){switch(e.algorithm){case Gd:return{name:"SLH-DSA-SHA2-128s"};case $d:return{name:"SLH-DSA-SHA2-128f"};case Vd:return{name:"SLH-DSA-SHA2-192s"};case Kd:return{name:"SLH-DSA-SHA2-192f"};case Wd:return{name:"SLH-DSA-SHA2-256s"};case Fd:return{name:"SLH-DSA-SHA2-256f"};case zd:return{name:"SLH-DSA-SHAKE-128s"};case qd:return{name:"SLH-DSA-SHAKE-128f"};case Xd:return{name:"SLH-DSA-SHAKE-192s"};case Yd:return{name:"SLH-DSA-SHAKE-192f"};case Jd:return{name:"SLH-DSA-SHAKE-256s"};case Qd:return{name:"SLH-DSA-SHAKE-256f"}}return null}};gp=s([Ar()],gp);ge.registerSingleton(qo,gp);var pa,fa,ha,ma,ga,ya,ba,Hi,yp=class extends jt{get subjectName(){return L(this,fa,"f")||ie(this,fa,new Hn(this.asn.certificationRequestInfo.subject),"f"),L(this,fa,"f")}get subject(){return L(this,ha,"f")||ie(this,ha,this.subjectName.toString(),"f"),L(this,ha,"f")}get signatureAlgorithm(){if(!L(this,ma,"f")){let e=ge.resolve(Wo);ie(this,ma,e.toWebAlgorithm(this.asn.signatureAlgorithm),"f")}return L(this,ma,"f")}get signature(){return L(this,ga,"f")||ie(this,ga,this.asn.signature,"f"),L(this,ga,"f")}get publicKey(){return L(this,ya,"f")||ie(this,ya,new Xr(this.asn.certificationRequestInfo.subjectPKInfo,this.parseOptions),"f"),L(this,ya,"f")}get attributes(){return L(this,ba,"f")||ie(this,ba,this.asn.certificationRequestInfo.attributes.map(e=>qi.create(B.serialize(e),this.parseOptions)),"f"),L(this,ba,"f")}get extensions(){if(!L(this,Hi,"f")){ie(this,Hi,[],"f");let e=this.getAttribute(la);e instanceof $a&&ie(this,Hi,e.items,"f")}return L(this,Hi,"f")}get tbs(){return L(this,pa,"f")||ie(this,pa,this.asn.certificationRequestInfoRaw||B.serialize(this.asn.certificationRequestInfo),"f"),L(this,pa,"f")}constructor(e,r){let n=jt.isAsnEncoded(e)?[e,jn,r]:[e,r];super(n[0],n[1],n[2]),pa.set(this,void 0),fa.set(this,void 0),ha.set(this,void 0),ma.set(this,void 0),ga.set(this,void 0),ya.set(this,void 0),ba.set(this,void 0),Hi.set(this,void 0),this.tag=$e.CertificateRequestTag}onInit(e){}getAttribute(e){for(let r of this.attributes)if(r.type===e)return r;return null}getAttributes(e){return this.attributes.filter(r=>r.type===e)}getExtension(e){for(let r of this.extensions)if(r.type===e)return r;return null}getExtensions(e){return this.extensions.filter(r=>r.type===e)}async verify(e=nt.get()){let r={...this.publicKey.algorithm,...this.signatureAlgorithm},n=await this.publicKey.export(r,["verify"],e),o=ge.resolveAll(Va).reverse(),i=null;for(let c of o)if(i=c.toWebSignature(r,this.signature),i)break;if(!i)throw Error("Cannot convert WebCrypto signature value to ASN.1 format");return await e.subtle.verify(this.signatureAlgorithm,n,i,this.tbs)}toTextObject(){let e=this.toTextObjectEmpty(),r=B.parse(this.rawData,jn,this.parseOptions),n=r.certificationRequestInfo,o=new ue("",{Version:`${$r[n.version]} (${n.version})`,Subject:this.subject,"Subject Public Key Info":this.publicKey});if(this.attributes.length){let i=new ue("");for(let a of this.attributes){let c=a.toTextObject();i[c[ue.NAME]]=c}o.Attributes=i}return e.Data=o,e.Signature=new ue("",{Algorithm:Cr.serializeAlgorithm(r.signatureAlgorithm),"":r.signature}),e}};pa=new WeakMap,fa=new WeakMap,ha=new WeakMap,ma=new WeakMap,ga=new WeakMap,ya=new WeakMap,ba=new WeakMap,Hi=new WeakMap;yp.NAME="PKCS#10 Certificate Request";var wa,xa,va,Aa,Ea,Sa,ka,Ca,Ta,Ia,Ui,_a,Zr=class extends jt{get publicKey(){return L(this,_a,"f")||ie(this,_a,new Xr(this.asn.tbsCertificate.subjectPublicKeyInfo,this.parseOptions),"f"),L(this,_a,"f")}get serialNumber(){return L(this,xa,"f")||ie(this,xa,Gg(this.asn.tbsCertificate.serialNumber),"f"),L(this,xa,"f")}get subjectName(){return L(this,va,"f")||ie(this,va,new Hn(this.asn.tbsCertificate.subject),"f"),L(this,va,"f")}get subject(){return L(this,Aa,"f")||ie(this,Aa,this.subjectName.toString(),"f"),L(this,Aa,"f")}get issuerName(){return L(this,Ea,"f")||ie(this,Ea,new Hn(this.asn.tbsCertificate.issuer),"f"),L(this,Ea,"f")}get issuer(){return L(this,Sa,"f")||ie(this,Sa,this.issuerName.toString(),"f"),L(this,Sa,"f")}get notBefore(){if(!L(this,ka,"f")){let e=this.asn.tbsCertificate.validity.notBefore.utcTime||this.asn.tbsCertificate.validity.notBefore.generalTime;if(!e)throw new Error("Cannot get 'notBefore' value");ie(this,ka,e,"f")}return L(this,ka,"f")}get notAfter(){if(!L(this,Ca,"f")){let e=this.asn.tbsCertificate.validity.notAfter.utcTime||this.asn.tbsCertificate.validity.notAfter.generalTime;if(!e)throw new Error("Cannot get 'notAfter' value");ie(this,Ca,e,"f")}return L(this,Ca,"f")}get signatureAlgorithm(){if(!L(this,Ta,"f")){let e=ge.resolve(Wo);ie(this,Ta,e.toWebAlgorithm(this.asn.signatureAlgorithm),"f")}return L(this,Ta,"f")}get signature(){return L(this,Ia,"f")||ie(this,Ia,this.asn.signatureValue,"f"),L(this,Ia,"f")}get extensions(){return L(this,Ui,"f")||(ie(this,Ui,[],"f"),this.asn.tbsCertificate.extensions&&ie(this,Ui,this.asn.tbsCertificate.extensions.map(e=>Ve.create(B.serialize(e),this.parseOptions)),"f")),L(this,Ui,"f")}get tbs(){return L(this,wa,"f")||ie(this,wa,this.asn.tbsCertificateRaw||B.serialize(this.asn.tbsCertificate),"f"),L(this,wa,"f")}constructor(e,r){let n=jt.isAsnEncoded(e)?[e,ke,r]:[e,r];super(n[0],n[1],n[2]),wa.set(this,void 0),xa.set(this,void 0),va.set(this,void 0),Aa.set(this,void 0),Ea.set(this,void 0),Sa.set(this,void 0),ka.set(this,void 0),Ca.set(this,void 0),Ta.set(this,void 0),Ia.set(this,void 0),Ui.set(this,void 0),_a.set(this,void 0),this.tag=$e.CertificateTag}onInit(e){}getExtension(e){for(let r of this.extensions)if(typeof e=="string"){if(r.type===e)return r}else if(r instanceof e)return r;return null}getExtensions(e){return this.extensions.filter(r=>typeof e=="string"?r.type===e:r instanceof e)}async verify(e={},r=nt.get()){let n,o,i=e.publicKey;try{if(!i)n={...this.publicKey.algorithm,...this.signatureAlgorithm},o=await this.publicKey.export(n,["verify"],r);else if("publicKey"in i)n={...i.publicKey.algorithm,...this.signatureAlgorithm},o=await i.publicKey.export(n,["verify"],r);else if(i instanceof Xr)n={...i.algorithm,...this.signatureAlgorithm},o=await i.export(n,["verify"],r);else if(_.BufferSourceConverter.isBufferSource(i)){let d=new Xr(i);n={...d.algorithm,...this.signatureAlgorithm},o=await d.export(n,["verify"],r)}else n={...i.algorithm,...this.signatureAlgorithm},o=i}catch{return!1}let a=ge.resolveAll(Va).reverse(),c=null;for(let d of a)if(c=d.toWebSignature(n,this.signature),c)break;if(!c)throw Error("Cannot convert ASN.1 signature value to WebCrypto format");let u=await r.subtle.verify(this.signatureAlgorithm,o,c,this.tbs);if(e.signatureOnly)return u;{let p=(e.date||new Date).getTime();return u&&this.notBefore.getTime()<p&&p<this.notAfter.getTime()}}async getThumbprint(e,r){let n,o="SHA-1";return e&&(typeof e=="object"&&"subtle"in e?n=e:(o=e,n=r)),n??(n=nt.get()),await n.subtle.digest(o,this.rawData)}async isSelfSigned(e=nt.get()){return this.subject===this.issuer&&await this.verify({signatureOnly:!0},e)}toTextObject(){let e=this.toTextObjectEmpty(),r=B.parse(this.rawData,ke,this.parseOptions),n=r.tbsCertificate,o=new ue("",{Version:`${$r[n.version]} (${n.version})`,"Serial Number":n.serialNumber,"Signature Algorithm":Cr.serializeAlgorithm(n.signature),Issuer:this.issuer,Validity:new ue("",{"Not Before":n.validity.notBefore.getTime(),"Not After":n.validity.notAfter.getTime()}),Subject:this.subject,"Subject Public Key Info":this.publicKey});if(n.issuerUniqueID&&(o["Issuer Unique ID"]=n.issuerUniqueID),n.subjectUniqueID&&(o["Subject Unique ID"]=n.subjectUniqueID),this.extensions.length){let i=new ue("");for(let a of this.extensions){let c=a.toTextObject();i[c[ue.NAME]]=c}o.Extensions=i}return e.Data=o,e.Signature=new ue("",{Algorithm:Cr.serializeAlgorithm(r.signatureAlgorithm),"":r.signatureValue}),e}};wa=new WeakMap,xa=new WeakMap,va=new WeakMap,Aa=new WeakMap,Ea=new WeakMap,Sa=new WeakMap,ka=new WeakMap,Ca=new WeakMap,Ta=new WeakMap,Ia=new WeakMap,Ui=new WeakMap,_a=new WeakMap;Zr.NAME="Certificate";var Ko,bp=class extends Array{constructor(e,r){if(super(),Ko.set(this,void 0),jt.isAsnEncoded(e))this.import(e,r);else if(e instanceof Zr)this.push(e);else if(Array.isArray(e))for(let n of e)this.push(n)}export(e){let r=new Nt;r.version=1,r.encapContentInfo.eContentType=em,r.encapContentInfo.eContent=new Eo({single:new R}),r.certificates=new En(this.map(i=>new An({certificate:B.parse(i.rawData,ke,L(this,Ko,"f"))})));let n=new tt({contentType:zc,content:B.serialize(r)}),o=B.serialize(n);return e==="raw"?o:this.toString(e)}import(e,r){let n=jt.toArrayBuffer(e),o=B.parse(n,tt,r);if(o.contentType!==zc)throw new TypeError("Cannot parse CMS package. Incoming data is not a SignedData object.");let i=B.parse(o.content,Nt,r),a=[];for(let c of i.certificates||[])c.certificate&&a.push(new Zr(c.certificate,r));this.clear();for(let c of a)this.push(c);ie(this,Ko,r,"f")}clear(){for(;this.pop(););}toString(e="pem"){let r=this.export("raw");switch(e){case"pem":return $e.encode(r,"CMS");case"pem-chain":return this.map(n=>n.toString("pem")).join(`
`);case"asn":return B.toString(r,L(this,Ko,"f"));case"hex":return _.Convert.ToHex(r);case"base64":return _.Convert.ToBase64(r);case"base64url":return _.Convert.ToBase64Url(r);case"text":return Cr.serialize(this.toTextObject());default:throw TypeError("Argument 'format' is unsupported value")}}toTextObject(){let e=B.parse(this.export("raw"),tt,L(this,Ko,"f")),r=B.parse(e.content,Nt,L(this,Ko,"f"));return new ue("X509Certificates",{"Content Type":Qt.toString(e.contentType),Content:new ue("",{Version:`${He[r.version]} (${r.version})`,Certificates:new ue("",{Certificate:this.map(o=>o.toTextObject())})})})}};Ko=new WeakMap;var Al=class{constructor(e={}){this.certificates=[],e.certificates&&(this.certificates=e.certificates)}async build(e,r=nt.get()){let n=new bp(e),o=e;for(;o=await this.findIssuer(o,r);){let i=await o.getThumbprint(r);for(let a of n){let c=await a.getThumbprint(r);if((0,_.isEqual)(i,c))throw new Error("Cannot build a certificate chain. Circular dependency.")}n.push(o)}return n}async findIssuer(e,r=nt.get()){if(!await e.isSelfSigned(r)){let n=e.getExtension(Ss);for(let o of this.certificates)if(o.subject===e.issuer){if(n){if(n.keyId){let i=o.getExtension(Lc);if(i&&i.keyId!==n.keyId)continue}else if(n.certId){let i=o.getExtension(hi);if(i&&!(n.certId.serialNumber===o.serialNumber&&(0,_.isEqual)(B.serialize(n.certId.name),B.serialize(i))))continue}}try{let i={...o.publicKey.algorithm,...e.signatureAlgorithm},a=await o.publicKey.export(i,["verify"],r);if(!await e.verify({publicKey:a,signatureOnly:!0},r))continue}catch{continue}return o}}return null}};var Ba,Ra,Gi,$i,Vi,Dg;(function(t){t[t.unspecified=0]="unspecified",t[t.keyCompromise=1]="keyCompromise",t[t.cACompromise=2]="cACompromise",t[t.affiliationChanged=3]="affiliationChanged",t[t.superseded=4]="superseded",t[t.cessationOfOperation=5]="cessationOfOperation",t[t.certificateHold=6]="certificateHold",t[t.removeFromCRL=8]="removeFromCRL",t[t.privilegeWithdrawn=9]="privilegeWithdrawn",t[t.aACompromise=10]="aACompromise"})(Dg||(Dg={}));var El=class extends Yr{get serialNumber(){return L(this,Ba,"f")||ie(this,Ba,Gg(this.asn.userCertificate),"f"),L(this,Ba,"f")}get revocationDate(){return L(this,Ra,"f")||ie(this,Ra,this.asn.revocationDate.getTime(),"f"),L(this,Ra,"f")}get reason(){return L(this,Gi,"f")===void 0&&this.extensions,L(this,Gi,"f")}get invalidity(){return L(this,$i,"f")===void 0&&this.extensions,L(this,$i,"f")}get extensions(){return L(this,Vi,"f")||(ie(this,Vi,[],"f"),this.asn.crlEntryExtensions&&ie(this,Vi,this.asn.crlEntryExtensions.map(e=>{let r=Ve.create(B.serialize(e),this.parseOptions);switch(r.type){case Mu:L(this,Gi,"f")===void 0&&ie(this,Gi,B.parse(r.value,ci,this.parseOptions).reason,"f");break;case Ou:L(this,$i,"f")===void 0&&ie(this,$i,B.parse(r.value,ui,this.parseOptions).value,"f");break}return r}),"f")),L(this,Vi,"f")}constructor(...e){let r,n;if(_.BufferSourceConverter.isBufferSource(e[0])?(r=_.BufferSourceConverter.toArrayBuffer(e[0]),n=e[1]):typeof e[0]=="string"?r=B.serialize(new qt({userCertificate:Ug(e[0]),revocationDate:new Ee(e[1]),crlEntryExtensions:e[2]})):e[0]instanceof qt&&(r=e[0],n=e[1]),!r)throw new TypeError("Cannot create X509CrlEntry instance. Wrong constructor arguments.");let o=r instanceof qt?[r,n]:[r,qt,n];super(o[0],o[1],o[2]),Ba.set(this,void 0),Ra.set(this,void 0),Gi.set(this,void 0),$i.set(this,void 0),Vi.set(this,void 0)}onInit(e){}};Ba=new WeakMap,Ra=new WeakMap,Gi=new WeakMap,$i=new WeakMap,Vi=new WeakMap;var Ma,Pa,Na,Oa,Da,La,Ki,Sl=class extends jt{get version(){return this.asn.tbsCertList.version}get signatureAlgorithm(){if(!L(this,Pa,"f")){let e=ge.resolve(Wo);ie(this,Pa,e.toWebAlgorithm(this.asn.signatureAlgorithm),"f")}return L(this,Pa,"f")}get signature(){return this.asn.signature}get issuer(){return this.issuerName.toString()}get issuerName(){return L(this,Na,"f")||ie(this,Na,new Hn(this.asn.tbsCertList.issuer),"f"),L(this,Na,"f")}get thisUpdate(){if(!L(this,Oa,"f")){let e=this.asn.tbsCertList.thisUpdate.getTime();if(!e)throw new Error("Cannot get 'thisUpdate' value");ie(this,Oa,e,"f")}return L(this,Oa,"f")}get nextUpdate(){var e;return L(this,Da,"f")===void 0&&ie(this,Da,((e=this.asn.tbsCertList.nextUpdate)===null||e===void 0?void 0:e.getTime())||void 0,"f"),L(this,Da,"f")}get entries(){var e;return L(this,La,"f")||ie(this,La,((e=this.asn.tbsCertList.revokedCertificates)===null||e===void 0?void 0:e.map(r=>new El(r,this.parseOptions)))||[],"f"),L(this,La,"f")}get extensions(){return L(this,Ki,"f")||(ie(this,Ki,[],"f"),this.asn.tbsCertList.crlExtensions&&ie(this,Ki,this.asn.tbsCertList.crlExtensions.map(e=>Ve.create(B.serialize(e),this.parseOptions)),"f")),L(this,Ki,"f")}get tbs(){return L(this,Ma,"f")||ie(this,Ma,this.asn.tbsCertListRaw||B.serialize(this.asn.tbsCertList),"f"),L(this,Ma,"f")}get tbsCertListSignatureAlgorithm(){return this.asn.tbsCertList.signature}get certListSignatureAlgorithm(){return this.asn.signatureAlgorithm}constructor(e,r){let n=jt.isAsnEncoded(e)?[e,xn,r]:[e,r];super(n[0],n[1],n[2]),this.tag=$e.CrlTag,Ma.set(this,void 0),Pa.set(this,void 0),Na.set(this,void 0),Oa.set(this,void 0),Da.set(this,void 0),La.set(this,void 0),Ki.set(this,void 0)}onInit(e){}getExtension(e){for(let r of this.extensions)if(typeof e=="string"){if(r.type===e)return r}else if(r instanceof e)return r;return null}getExtensions(e){return this.extensions.filter(r=>typeof e=="string"?r.type===e:r instanceof e)}async verify(e,r=nt.get()){if(!this.certListSignatureAlgorithm.isEqual(this.tbsCertListSignatureAlgorithm))throw new Error("algorithm identifier in the sequence tbsCertList and CertificateList mismatch");let n,o,i=e.publicKey;try{i instanceof Zr?(n={...i.publicKey.algorithm,...i.signatureAlgorithm},o=await i.publicKey.export(n,["verify"])):i instanceof Xr?(n={...i.algorithm,...this.signatureAlgorithm},o=await i.export(n,["verify"])):(n={...i.algorithm,...this.signatureAlgorithm},o=i)}catch{return!1}let a=ge.resolveAll(Va).reverse(),c=null;for(let u of a)if(c=u.toWebSignature(n,this.signature),c)break;if(!c)throw Error("Cannot convert ASN.1 signature value to WebCrypto format");return await r.subtle.verify(this.signatureAlgorithm,o,c,this.tbs)}async getThumbprint(e,r){let n,o="SHA-1";return e&&(typeof e=="object"&&"subtle"in e?n=e:(o=e,n=r)),n??(n=nt.get()),await n.subtle.digest(o,this.rawData)}findRevoked(e){let r=typeof e=="string"?e:e.serialNumber,n=Ug(r);for(let o of this.asn.tbsCertList.revokedCertificates||[])if(_.BufferSourceConverter.isEqual(o.userCertificate,n))return new El(B.serialize(o),this.parseOptions);return null}};Ma=new WeakMap,Pa=new WeakMap,Na=new WeakMap,Oa=new WeakMap,Da=new WeakMap,La=new WeakMap,Ki=new WeakMap;Ve.register(ai,hl);Ve.register(li,ml);Ve.register(Pc,gl);Ve.register(Lc,zo);Ve.register(Ss,Fo);Ve.register(hi,yl);Ve.register(Mc,Fi);Ve.register(_c,wl);Ve.register(Lu,xl);qi.register(Nd,vl);qi.register(la,$a);ge.registerSingleton(Va,dp);ge.registerSingleton(Va,Qr);Qr.namedCurveSize.set("P-256",32);Qr.namedCurveSize.set("K-256",32);Qr.namedCurveSize.set("P-384",48);Qr.namedCurveSize.set("P-521",66);function kl(t){return ox.stubThis(t)}var ox={stubThis:t=>globalThis.fetch(t)};var Vg={};async function Kg(t,e){if(!e)return!1;let{extensions:r}=t;if(!r)return!1;let{keyIdentifier:n,fromExtension:o}=await ix(e),i=t.extensions.find(u=>u instanceof Fo);if(o&&i?.keyId&&i.keyId!==n)throw new Error(`Certificate's AuthorityKeyIdentifier did not match issuer's SubjectKeyIdentifier "${n}"`);let a=r.find(u=>u instanceof Fi),c=[];if(a?.distributionPoints?.forEach(u=>{u.distributionPoint?.fullName?.forEach(d=>{d.uniformResourceIdentifier&&c.push(d.uniformResourceIdentifier)})}),!(c.length>0))return!1;for(let u of c){let d=`${n}|${u}`,p=Vg[d];if(p){let I=new Date;if(!p.nextUpdate||p.nextUpdate>I)return p.revokedCerts.indexOf(t.serialNumber)>=0}let h;try{h=await(await kl(u)).arrayBuffer()}catch{continue}let g;try{g=new Sl(h)}catch{continue}if(!await g.verify({publicKey:e.publicKey}))throw new Error(`CRL from ${u} failed signature verification against issuer "${e.subject}"`);let k=g.getExtension(Fo);if(o&&k?.keyId&&k.keyId!==n)throw new Error(`CRL from ${u} contained an AuthorityKeyIdentifier that did not match issuer's SubjectKeyIdentifier "${n}"`);if(g.nextUpdate&&(Vg[d]={revokedCerts:g.entries.map(I=>I.serialNumber),nextUpdate:g.nextUpdate}),g.findRevoked(t))return!0}return!1}async function ix(t){let e=t.extensions?.find(n=>n instanceof zo);return e?.keyId?{keyIdentifier:e.keyId,fromExtension:!0}:{keyIdentifier:(await zo.create(t.publicKey)).keyId,fromExtension:!1}}function Wg(t){let e;try{e=Ye.decodeFirst(t)}catch(r){let n=r;throw new Error(`Error decoding authenticator extensions: ${n.message}`)}return Fg(e)}function Fg(t){let e={};for(let[r,n]of t)n instanceof Map?e[r]=Fg(n):e[r]=n;return e}function Cl(t){if(t.byteLength<37)throw new Error(`Authenticator data was ${t.byteLength} bytes, expected at least 37 bytes`);let e=0,r=F.toDataView(t),n=t.slice(e,e+=32),o=t.slice(e,e+=1),i=o[0],a={up:!!(i&1),uv:!!(i&4),be:!!(i&8),bs:!!(i&16),at:!!(i&64),ed:!!(i&128),flagsInt:i},c=t.slice(e,e+4),u=r.getUint32(e,!1);e+=4;let d,p,h;if(a.at){d=t.slice(e,e+=16);let k=r.getUint16(e);e+=2,p=t.slice(e,e+=k);let M=F.fromHex("a301634f4b500327206745643235353139"),I=t.slice(e,e+M.byteLength),D=!1;F.areEqual(M,I)&&(D=!0,t[e]=164);let Z=Ye.decodeFirst(t.slice(e)),fe=Uint8Array.from(Ye.encode(Z));D&&(t[e]=163),h=fe,e+=fe.byteLength}let g,w;if(a.ed){let k=Ye.decodeFirst(t.slice(e));w=Uint8Array.from(Ye.encode(k)),g=Wg(w),e+=w.byteLength}if(t.byteLength>e)throw new Error("Leftover bytes detected while parsing authenticator data");return sx.stubThis({rpIdHash:n,flagsBuf:o,flags:a,counter:u,counterBuf:c,aaguid:d,credentialID:p,credentialPublicKey:h,extensionsData:g,extensionsDataBuffer:w})}var sx={stubThis:t=>t};function bt(t,e=-7){return typeof t=="string"&&(t=F.fromUTF8String(t)),ar.digest(t,e)}var AL=Fa(Ku(),1);function Xo(t){if([U.EdDSA].indexOf(t)>=0)return"Ed25519";if([U.ES256,U.ES384,U.ES512,U.ES256K].indexOf(t)>=0)return"ECDSA";if([U.RS256,U.RS384,U.RS512,U.RS1].indexOf(t)>=0)return"RSASSA-PKCS1-v1_5";if([U.PS256,U.PS384,U.PS512].indexOf(t)>=0)return"RSA-PSS";if([U.ML_DSA_44].indexOf(t)>=0)return"ML-DSA-44";if([U.ML_DSA_65].indexOf(t)>=0)return"ML-DSA-65";if([U.ML_DSA_87].indexOf(t)>=0)return"ML-DSA-87";throw new Error(`Could not map COSE alg value of ${t} to a WebCrypto key alg name`)}var Zt=class extends Error{constructor({message:e,code:r,cause:n}){super(e,{cause:n}),Object.defineProperty(this,"code",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.name="SimpleWebAuthnError",this.code=r}},Un=class extends Zt{constructor(e){let n=`This runtime's WebCrypto.subtle does not support use of ${Xo(e)}`;super({message:n,code:"RUNTIME_NO_PQC_SUPPORT"})}};async function qe(t,e=[]){if(e.length===0)return!0;let r=e.map(d=>{try{return new Zr(d)}catch(p){throw new Zt({message:`Could not parse trust anchor certificate:
${d}`,code:"CERTIFICATE_PATH_VERIFICATION_FAILED",cause:p})}}),n=[];for(let d=0;d<r.length;d++){let p=r[d];try{zg(p)}catch{continue}n.push(p)}if(n.length===0)throw new Zt({message:"No specified trust anchor was valid for verifying x5c",code:"CERTIFICATE_PATH_VERIFICATION_FAILED"});let o=t.map(d=>new Zr(d)),i=o[0],a=[];o.length>1&&(a=o.slice(1));let c=!0,u;for(let d of n)try{let p=o.concat([d]);if(new Set(p.map(Z=>Z.toString("pem"))).size!==p.length)throw new Zt({message:"Invalid certificate path: found duplicate certificates",code:"CERTIFICATE_PATH_VERIFICATION_FAILED"});let w=await new Al({certificates:[...a,d]}).build(i),M=w[w.length-1].equal(d),I=!1;if(!M&&w.length>1&&(I=await w[w.length-2].verify({publicKey:d.publicKey,signatureOnly:!0})),!(M||I))continue;I&&(w[w.length-1]=d),c=!1,u=w;break}catch(p){throw new Zt({message:"Unexpected error while validating certificate path",code:"CERTIFICATE_PATH_VERIFICATION_FAILED",cause:p})}if(u)for(let d=0;d<u.length;d++){let p=u[d];try{zg(p)}catch{throw new Zt({message:`Found certificate out of validity period:
${p.toString()}`,code:"CERTIFICATE_PATH_VERIFICATION_FAILED"})}let h;d<u.length-1?h=u[d+1]:await p.isSelfSigned()&&(h=p);try{await ax(p,h)}catch(g){throw new Zt({message:`The following certificate failed revocation status check
${p.toString()}`,code:"CERTIFICATE_PATH_VERIFICATION_FAILED",cause:g})}}else c=!0;if(c)throw new Zt({message:"x5c could not be chained to any specified trust anchor",code:"CERTIFICATE_PATH_VERIFICATION_FAILED"});return!0}async function ax(t,e){if(await Kg(t,e))throw new Error("Found revoked certificate in certificate path")}function zg(t){let{notBefore:e,notAfter:r}=t,n=new Date(Date.now());if(e>n||r<n)throw new Error("Certificate is not yet valid or expired")}function qg(t){let e;if(t===Io)e=U.ES256;else if(t===_o)e=U.ES384;else if(t===Bo)e=U.ES512;else if(t===Bi)e=U.RS256;else if(t===Rn)e=U.RS384;else if(t===Mn)e=U.RS512;else if(t===Bn)e=U.RS1;else if(t===Go)e=U.ML_DSA_44;else if(t===$o)e=U.ML_DSA_65;else if(t===Vo)e=U.ML_DSA_87;else throw new Error(`Unable to map X.509 signature algorithm ${t} to a COSE algorithm`);return e}function Tl(t){let e=new Map,r=xe.parse(t,ke),{tbsCertificate:n}=r,{subjectPublicKeyInfo:o}=n,i=o.algorithm.algorithm;if(i===Wr){if(!o.algorithm.parameters)throw new Error("Certificate public key was missing parameters (EC2)");let a=xe.parse(new Uint8Array(o.algorithm.parameters),Ot),c,u,{namedCurve:d}=a;if(d===Ys)c=U.ES256,u=Ke.P256;else if(d===Js)c=U.ES384,u=Ke.P384;else throw new Error(`Certificate public key contained unexpected namedCurve ${d} (EC2)`);let p=new Uint8Array(o.subjectPublicKey),h,g;if(p[0]===4){let k=1,M=(p.length-1)/2;h=p.slice(k,k+=M),g=p.slice(k)}else throw new Error('TODO: Figure out how to handle public keys in "compressed form"');let w=new Map;w.set(q.kty,Je.EC2),w.set(q.alg,c),w.set(q.crv,u),w.set(q.x,h),w.set(q.y,g),e=w}else if(i===Dt){let a=xe.parse(o.subjectPublicKey,Nn),c=new Map;c.set(q.kty,Je.RSA),c.set(q.alg,U.RS256),c.set(q.n,new Uint8Array(a.modulus)),c.set(q.e,new Uint8Array(a.publicExponent)),e=c}else if([Go,$o,Vo].indexOf(i)>=0){let a=new Map;a.set(q.kty,Je.AKP),a.set(q.alg,qg(i)),a.set(q.pub,new Uint8Array(o.subjectPublicKey)),e=a}else throw new Error(`Certificate public key contained unexpected algorithm ID ${i}`);return e}function wt(t){let{signature:e,data:r,credentialPublicKey:n,x509Certificate:o,hashAlgorithm:i}=t;if(!o&&!n)throw new Error('Must declare either "leafCert" or "credentialPublicKey"');if(o&&n)throw new Error('Must not declare both "leafCert" and "credentialPublicKey"');let a=new Map;return n?a=sr(n):o&&(a=Tl(o)),cx.stubThis(ar.verify({cosePublicKey:a,signature:e,data:r,shaHashOverride:i}))}var cx={stubThis:t=>t};function Xg(t){let e=t.split(".");return[JSON.parse(ee.toUTF8String(e[0])),JSON.parse(ee.toUTF8String(e[1])),e[2]]}function Yg(t){let e;if(t==="ES256")e=U.ES256;else if(t==="ES384")e=U.ES384;else if(t==="ES512")e=U.ES512;else if(t==="RS256")e=U.RS256;else if(t==="RS384")e=U.RS384;else if(t==="RS512")e=U.RS512;else throw new Error(`Unable to map JWS algorithm "${t}" to a COSE algorithm`);return e}async function Gn(t){let e=await it(),{keyData:r,algorithm:n}=t;return e.subtle.importKey("jwk",r,n,!1,["verify"])}async function Il(t){let{cosePublicKey:e,signature:r,data:n,shaHashOverride:o}=t,i=await it(),a=e.get(q.alg),c=e.get(q.crv),u=e.get(q.x),d=e.get(q.y);if(!a)throw new Error("Public key was missing alg (EC2)");if(!c)throw new Error("Public key was missing crv (EC2)");if(!u)throw new Error("Public key was missing x (EC2)");if(!d)throw new Error("Public key was missing y (EC2)");let p;if(c===Ke.P256)p="P-256";else if(c===Ke.P384)p="P-384";else if(c===Ke.P521)p="P-521";else throw new Error(`Unexpected COSE crv value of ${c} (EC2)`);let h={kty:"EC",crv:p,x:ee.fromBuffer(u),y:ee.fromBuffer(d),ext:!1},w=await Gn({keyData:h,algorithm:{name:"ECDSA",namedCurve:p}}),k=sn(a);o&&(k=sn(o));let M={name:"ECDSA",hash:{name:k}};return i.subtle.verify(M,w,r,n)}async function _l(t){let{cosePublicKey:e,signature:r,data:n,shaHashOverride:o}=t,i=await it(),a=e.get(q.alg),c=e.get(q.n),u=e.get(q.e);if(!a)throw new Error("Public key was missing alg (RSA)");if(!Et(a))throw new Error(`Public key had invalid alg ${a} (RSA)`);if(!c)throw new Error("Public key was missing n (RSA)");if(!u)throw new Error("Public key was missing e (RSA)");let d={kty:"RSA",alg:"",n:ee.fromBuffer(c),e:ee.fromBuffer(u),ext:!1},p={name:Xo(a),hash:{name:sn(a)}},h={name:Xo(a)};if(o&&(p.hash.name=sn(o)),p.name==="RSASSA-PKCS1-v1_5")p.hash.name==="SHA-256"?d.alg="RS256":p.hash.name==="SHA-384"?d.alg="RS384":p.hash.name==="SHA-512"?d.alg="RS512":p.hash.name==="SHA-1"&&(d.alg="RS1");else if(p.name==="RSA-PSS"){let w=0;p.hash.name==="SHA-256"?(d.alg="PS256",w=32):p.hash.name==="SHA-384"?(d.alg="PS384",w=48):p.hash.name==="SHA-512"&&(d.alg="PS512",w=64),h.saltLength=w}else throw new Error(`Unexpected RSA key algorithm ${a} (${p.name})`);let g=await Gn({keyData:d,algorithm:p});return i.subtle.verify(h,g,r,n)}function Jg(t,e){let[r,n,o]=t.split("."),i=Tl(e),a=F.fromUTF8String(`${r}.${n}`),c=ee.toBuffer(o),u=JSON.parse(ee.toUTF8String(r)),d=Yg(u.alg);if(on(i))return Il({data:a,signature:c,cosePublicKey:i,shaHashOverride:d});if(ei(i))return _l({data:a,signature:c,cosePublicKey:i,shaHashOverride:d});let p=i.get(q.kty);throw new Error(`JWT verification with public key of kty ${p} is not supported by this method`)}function Qg(t){let e=t.replace("-----BEGIN CERTIFICATE-----","").replace("-----END CERTIFICATE-----","").replace(/[\n ]/g,"");return ee.toBuffer(e,"base64")}async function Zg(t){let e=Xg(t),r=e[0],n=e[1],o=r.x5c.map(Pe);try{let g=xt.getRootCertificates({identifier:"mds"});await qe(o,g)}catch(g){let w=g;throw new Error("BLOB certificate path could not be validated",{cause:w})}let i=o[0];if(!await Jg(t,Qg(i)))throw new Error("BLOB signature could not be verified");let c=[];for(let g of n.entries)g.aaguid&&g.metadataStatement&&c.push(g.metadataStatement);let[u,d,p]=n.nextUpdate.split("-"),h=new Date(parseInt(u,10),parseInt(d,10)-1,parseInt(p,10));return{statements:c,parsedNextUpdate:h,payload:n}}async function ey(t){let{cosePublicKey:e,signature:r,data:n}=t,o=await it(),i=e.get(q.alg),a=e.get(q.pub);if(!i)throw new Error("Public key was missing alg (AKP)");if(!Et(i))throw new Error(`Public key had invalid alg ${i} (AKP)`);if(!a)throw new Error("Public key was missing pub (AKP)");let c=Xo(i),u={kty:"AKP",alg:c,pub:ee.fromBuffer(a),ext:!1},d;try{d=await Gn({keyData:u,algorithm:c})}catch(p){throw p.name==="NotSupportedError"?new Un(i):p}return o.subtle.verify(c,d,r,n)}async function ty(t){let{cosePublicKey:e,signature:r,data:n}=t,o=await it(),i=e.get(q.alg),a=e.get(q.crv),c=e.get(q.x);if(!i)throw new Error("Public key was missing alg (OKP)");if(!Et(i))throw new Error(`Public key had invalid alg ${i} (OKP)`);if(!a)throw new Error("Public key was missing crv (OKP)");if(!c)throw new Error("Public key was missing x (OKP)");let u;if(a===Ke.ED25519)u="Ed25519";else throw new Error(`Unexpected COSE crv value of ${a} (OKP)`);let d={kty:"OKP",crv:u,alg:"EdDSA",x:ee.fromBuffer(c),ext:!1},h=await Gn({keyData:d,algorithm:{name:u,namedCurve:u}}),g={name:u};return o.subtle.verify(g,h,r,n)}function ny(t,e){let r=xe.parse(t,Fr),n=new Uint8Array(r.r),o=new Uint8Array(r.s),i=lx(e),a=ry(n,i),c=ry(o,i);return F.concat([a,c])}function lx(t){switch(t){case Ke.P256:return 32;case Ke.P384:return 48;case Ke.P521:return 66;default:throw new Error(`Unexpected COSE crv value of ${t} (EC2)`)}}function ry(t,e){let r;if(t.length<e)r=new Uint8Array(e),r.set(t,e-t.length);else if(t.length===e)r=t;else if(t.length===e+1&&t[0]===0&&(t[1]&128)===128)r=t.subarray(1);else throw new Error(`Invalid signature component length ${t.length}, expected ${e}`);return r}function oy(t){let{cosePublicKey:e,signature:r,data:n,shaHashOverride:o}=t;if(on(e)){let a=e.get(q.crv);if(!Jp(a))throw new Error(`unknown COSE curve ${a}`);let c=ny(r,a);return Il({cosePublicKey:e,signature:c,data:n,shaHashOverride:o})}else{if(ei(e))return _l({cosePublicKey:e,signature:r,data:n,shaHashOverride:o});if(Xp(e))return ty({cosePublicKey:e,signature:r,data:n});if(Yp(e))return ey({cosePublicKey:e,signature:r,data:n})}let i=e.get(q.kty);throw new Error(`Signature verification with public key of kty ${i} is not supported by this method`)}var F={};Gt(F,{areEqual:()=>ux,concat:()=>fx,fromASCIIString:()=>gx,fromHex:()=>px,fromUTF8String:()=>mx,toDataView:()=>yx,toHex:()=>dx,toUTF8String:()=>hx});function ux(t,e){return t.length!=e.length?!1:t.every((r,n)=>r===e[n])}function dx(t){return Array.from(t,r=>r.toString(16).padStart(2,"0")).join("")}function px(t){if(!t)return Uint8Array.from([]);if(!(t.length!==0&&t.length%2===0&&!/[^a-fA-F0-9]/u.test(t)))throw new Error("Invalid hex string");let r=t.match(/.{1,2}/g)??[];return Uint8Array.from(r.map(n=>parseInt(n,16)))}function fx(t){let e=0,r=t.reduce((o,i)=>o+i.length,0),n=new Uint8Array(r);return t.forEach(o=>{n.set(o,e),e+=o.length}),n}function hx(t){return new globalThis.TextDecoder("utf-8").decode(t)}function mx(t){return new globalThis.TextEncoder().encode(t)}function gx(t){return Uint8Array.from(t.split("").map(e=>e.charCodeAt(0)))}function yx(t){return new DataView(t.buffer,t.byteOffset,t.length)}function Pe(t){let e;if(typeof t=="string")if(ee.isBase64URL(t))e=ee.toBase64(t);else if(ee.isBase64(t))e=t;else throw new Error("Certificate is not a valid base64 or base64url string");else e=ee.fromBuffer(t,"base64");let r="";for(let n=0;n<Math.ceil(e.length/64);n+=1){let o=64*n;r+=`${e.substr(o,64)}
`}return r=`-----BEGIN CERTIFICATE-----
${r}-----END CERTIFICATE-----
`,r}function iy(t){let e=globalThis.SubtleCrypto;if(typeof e.supports!="function")return!1;try{return e.supports("verify",t)}catch{return!1}}var sy=`-----BEGIN CERTIFICATE-----
MIIDdTCCAl2gAwIBAgILBAAAAAABFUtaw5QwDQYJKoZIhvcNAQEFBQAwVzELMAkG
A1UEBhMCQkUxGTAXBgNVBAoTEEdsb2JhbFNpZ24gbnYtc2ExEDAOBgNVBAsTB1Jv
b3QgQ0ExGzAZBgNVBAMTEkdsb2JhbFNpZ24gUm9vdCBDQTAeFw05ODA5MDExMjAw
MDBaFw0yODAxMjgxMjAwMDBaMFcxCzAJBgNVBAYTAkJFMRkwFwYDVQQKExBHbG9i
YWxTaWduIG52LXNhMRAwDgYDVQQLEwdSb290IENBMRswGQYDVQQDExJHbG9iYWxT
aWduIFJvb3QgQ0EwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDaDuaZ
jc6j40+Kfvvxi4Mla+pIH/EqsLmVEQS98GPR4mdmzxzdzxtIK+6NiY6arymAZavp
xy0Sy6scTHAHoT0KMM0VjU/43dSMUBUc71DuxC73/OlS8pF94G3VNTCOXkNz8kHp
1Wrjsok6Vjk4bwY8iGlbKk3Fp1S4bInMm/k8yuX9ifUSPJJ4ltbcdG6TRGHRjcdG
snUOhugZitVtbNV4FpWi6cgKOOvyJBNPc1STE4U6G7weNLWLBYy5d4ux2x8gkasJ
U26Qzns3dLlwR5EiUWMWea6xrkEmCMgZK9FGqkjWZCrXgzT/LCrBbBlDSgeF59N8
9iFo7+ryUp9/k5DPAgMBAAGjQjBAMA4GA1UdDwEB/wQEAwIBBjAPBgNVHRMBAf8E
BTADAQH/MB0GA1UdDgQWBBRge2YaRQ2XyolQL30EzTSo//z9SzANBgkqhkiG9w0B
AQUFAAOCAQEA1nPnfE920I2/7LqivjTFKDK1fPxsnCwrvQmeU79rXqoRSLblCKOz
yj1hTdNGCbM+w6DjY1Ub8rrvrTnhQ7k4o+YviiY776BQVvnGCv04zcQLcFGUl5gE
38NflNUVyRRBnMRddWQVDf9VMOyGj/8N7yy5Y0b2qvzfvGn9LhJIZJrglfCm7ymP
AbEVtQwdpf5pLGkkeB6zpxxxYu7KyJesF12KwvhHhm4qxFYxldBniYUr+WymXUad
DKqC5JlR3XC321Y9YeRq4VzW9v493kHMB65jUr9TU/Qr6cf9tveCX4XSQRjbgbME
HMUfpIBvFSDJ3gyICh3WZlXi/EjJKSZp4A==
-----END CERTIFICATE-----
`;var ay=`-----BEGIN CERTIFICATE-----
MIIFYDCCA0igAwIBAgIJAOj6GWMU0voYMA0GCSqGSIb3DQEBCwUAMBsxGTAXBgNV
BAUTEGY5MjAwOWU4NTNiNmIwNDUwHhcNMTYwNTI2MTYyODUyWhcNMjYwNTI0MTYy
ODUyWjAbMRkwFwYDVQQFExBmOTIwMDllODUzYjZiMDQ1MIICIjANBgkqhkiG9w0B
AQEFAAOCAg8AMIICCgKCAgEAr7bHgiuxpwHsK7Qui8xUFmOr75gvMsd/dTEDDJdS
Sxtf6An7xyqpRR90PL2abxM1dEqlXnf2tqw1Ne4Xwl5jlRfdnJLmN0pTy/4lj4/7
tv0Sk3iiKkypnEUtR6WfMgH0QZfKHM1+di+y9TFRtv6y//0rb+T+W8a9nsNL/ggj
nar86461qO0rOs2cXjp3kOG1FEJ5MVmFmBGtnrKpa73XpXyTqRxB/M0n1n/W9nGq
C4FSYa04T6N5RIZGBN2z2MT5IKGbFlbC8UrW0DxW7AYImQQcHtGl/m00QLVWutHQ
oVJYnFPlXTcHYvASLu+RhhsbDmxMgJJ0mcDpvsC4PjvB+TxywElgS70vE0XmLD+O
JtvsBslHZvPBKCOdT0MS+tgSOIfga+z1Z1g7+DVagf7quvmag8jfPioyKvxnK/Eg
sTUVi2ghzq8wm27ud/mIM7AY2qEORR8Go3TVB4HzWQgpZrt3i5MIlCaY504LzSRi
igHCzAPlHws+W0rB5N+er5/2pJKnfBSDiCiFAVtCLOZ7gLiMm0jhO2B6tUXHI/+M
RPjy02i59lINMRRev56GKtcd9qO/0kUJWdZTdA2XoS82ixPvZtXQpUpuL12ab+9E
aDK8Z4RHJYYfCT3Q5vNAXaiWQ+8PTWm2QgBR/bkwSWc+NpUFgNPN9PvQi8WEg5Um
AGMCAwEAAaOBpjCBozAdBgNVHQ4EFgQUNmHhAHyIBQlRi0RsR/8aTMnqTxIwHwYD
VR0jBBgwFoAUNmHhAHyIBQlRi0RsR/8aTMnqTxIwDwYDVR0TAQH/BAUwAwEB/zAO
BgNVHQ8BAf8EBAMCAYYwQAYDVR0fBDkwNzA1oDOgMYYvaHR0cHM6Ly9hbmRyb2lk
Lmdvb2dsZWFwaXMuY29tL2F0dGVzdGF0aW9uL2NybC8wDQYJKoZIhvcNAQELBQAD
ggIBACDIw41L3KlXG0aMiS//cqrG+EShHUGo8HNsw30W1kJtjn6UBwRM6jnmiwfB
Pb8VA91chb2vssAtX2zbTvqBJ9+LBPGCdw/E53Rbf86qhxKaiAHOjpvAy5Y3m00m
qC0w/Zwvju1twb4vhLaJ5NkUJYsUS7rmJKHHBnETLi8GFqiEsqTWpG/6ibYCv7rY
DBJDcR9W62BW9jfIoBQcxUCUJouMPH25lLNcDc1ssqvC2v7iUgI9LeoM1sNovqPm
QUiG9rHli1vXxzCyaMTjwftkJLkf6724DFhuKug2jITV0QkXvaJWF4nUaHOTNA4u
JU9WDvZLI1j83A+/xnAJUucIv/zGJ1AMH2boHqF8CY16LpsYgBt6tKxxWH00XcyD
CdW2KlBCeqbQPcsFmWyWugxdcekhYsAWyoSf818NUsZdBWBaR/OukXrNLfkQ79Iy
ZohZbvabO/X+MVT3rriAoKc8oE2Uws6DF+60PV7/WIPjNvXySdqspImSN78mflxD
qwLqRBYkA3I75qppLGG9rp7UCdRjxMl8ZDBld+7yvHVgt1cVzJx9xnyGCC23Uaic
MDSXYrB4I4WHXPGjxhZuCuPBLTdOLU8YRvMYdEvYebWHMpvwGCF6bAx3JBpIeOQ1
wDB5y0USicV3YgYGmi+NZfhA4URSh77Yd6uuJOJENRaNVTzk
-----END CERTIFICATE-----
`,cy=`-----BEGIN CERTIFICATE-----
MIIFHDCCAwSgAwIBAgIJANUP8luj8tazMA0GCSqGSIb3DQEBCwUAMBsxGTAXBgNV
BAUTEGY5MjAwOWU4NTNiNmIwNDUwHhcNMTkxMTIyMjAzNzU4WhcNMzQxMTE4MjAz
NzU4WjAbMRkwFwYDVQQFExBmOTIwMDllODUzYjZiMDQ1MIICIjANBgkqhkiG9w0B
AQEFAAOCAg8AMIICCgKCAgEAr7bHgiuxpwHsK7Qui8xUFmOr75gvMsd/dTEDDJdS
Sxtf6An7xyqpRR90PL2abxM1dEqlXnf2tqw1Ne4Xwl5jlRfdnJLmN0pTy/4lj4/7
tv0Sk3iiKkypnEUtR6WfMgH0QZfKHM1+di+y9TFRtv6y//0rb+T+W8a9nsNL/ggj
nar86461qO0rOs2cXjp3kOG1FEJ5MVmFmBGtnrKpa73XpXyTqRxB/M0n1n/W9nGq
C4FSYa04T6N5RIZGBN2z2MT5IKGbFlbC8UrW0DxW7AYImQQcHtGl/m00QLVWutHQ
oVJYnFPlXTcHYvASLu+RhhsbDmxMgJJ0mcDpvsC4PjvB+TxywElgS70vE0XmLD+O
JtvsBslHZvPBKCOdT0MS+tgSOIfga+z1Z1g7+DVagf7quvmag8jfPioyKvxnK/Eg
sTUVi2ghzq8wm27ud/mIM7AY2qEORR8Go3TVB4HzWQgpZrt3i5MIlCaY504LzSRi
igHCzAPlHws+W0rB5N+er5/2pJKnfBSDiCiFAVtCLOZ7gLiMm0jhO2B6tUXHI/+M
RPjy02i59lINMRRev56GKtcd9qO/0kUJWdZTdA2XoS82ixPvZtXQpUpuL12ab+9E
aDK8Z4RHJYYfCT3Q5vNAXaiWQ+8PTWm2QgBR/bkwSWc+NpUFgNPN9PvQi8WEg5Um
AGMCAwEAAaNjMGEwHQYDVR0OBBYEFDZh4QB8iAUJUYtEbEf/GkzJ6k8SMB8GA1Ud
IwQYMBaAFDZh4QB8iAUJUYtEbEf/GkzJ6k8SMA8GA1UdEwEB/wQFMAMBAf8wDgYD
VR0PAQH/BAQDAgIEMA0GCSqGSIb3DQEBCwUAA4ICAQBOMaBc8oumXb2voc7XCWnu
XKhBBK3e2KMGz39t7lA3XXRe2ZLLAkLM5y3J7tURkf5a1SutfdOyXAmeE6SRo83U
h6WszodmMkxK5GM4JGrnt4pBisu5igXEydaW7qq2CdC6DOGjG+mEkN8/TA6p3cno
L/sPyz6evdjLlSeJ8rFBH6xWyIZCbrcpYEJzXaUOEaxxXxgYz5/cTiVKN2M1G2ok
QBUIYSY6bjEL4aUN5cfo7ogP3UvliEo3Eo0YgwuzR2v0KR6C1cZqZJSTnghIC/vA
D32KdNQ+c3N+vl2OTsUVMC1GiWkngNx1OO1+kXW+YTnnTUOtOIswUP/Vqd5SYgAI
mMAfY8U9/iIgkQj6T2W6FsScy94IN9fFhE1UtzmLoBIuUFsVXJMTz+Jucth+IqoW
Fua9v1R93/k98p41pjtFX+H8DslVgfP097vju4KDlqN64xV1grw3ZLl4CiOe/A91
oeLm2UHOq6wn3esB4r2EIQKb6jTVGu5sYCcdWpXr0AUVqcABPdgL+H7qJguBw09o
jm6xNIrw2OocrDKsudk/okr/AwqEyPKw9WnMlQgLIKw1rODG2NvU9oR3GVGdMkUB
ZutL8VuFkERQGt6vQ2OCw0sV47VMkuYbacK/xyZFiRcrPJPb41zgbQj9XAEyLKCH
ex0SdDrx+tWUDqG8At2JHA==
-----END CERTIFICATE-----
`,ly=`
-----BEGIN CERTIFICATE-----
MIIFHDCCAwSgAwIBAgIJAMNrfES5rhgxMA0GCSqGSIb3DQEBCwUAMBsxGTAXBgNV
BAUTEGY5MjAwOWU4NTNiNmIwNDUwHhcNMjExMTE3MjMxMDQyWhcNMzYxMTEzMjMx
MDQyWjAbMRkwFwYDVQQFExBmOTIwMDllODUzYjZiMDQ1MIICIjANBgkqhkiG9w0B
AQEFAAOCAg8AMIICCgKCAgEAr7bHgiuxpwHsK7Qui8xUFmOr75gvMsd/dTEDDJdS
Sxtf6An7xyqpRR90PL2abxM1dEqlXnf2tqw1Ne4Xwl5jlRfdnJLmN0pTy/4lj4/7
tv0Sk3iiKkypnEUtR6WfMgH0QZfKHM1+di+y9TFRtv6y//0rb+T+W8a9nsNL/ggj
nar86461qO0rOs2cXjp3kOG1FEJ5MVmFmBGtnrKpa73XpXyTqRxB/M0n1n/W9nGq
C4FSYa04T6N5RIZGBN2z2MT5IKGbFlbC8UrW0DxW7AYImQQcHtGl/m00QLVWutHQ
oVJYnFPlXTcHYvASLu+RhhsbDmxMgJJ0mcDpvsC4PjvB+TxywElgS70vE0XmLD+O
JtvsBslHZvPBKCOdT0MS+tgSOIfga+z1Z1g7+DVagf7quvmag8jfPioyKvxnK/Eg
sTUVi2ghzq8wm27ud/mIM7AY2qEORR8Go3TVB4HzWQgpZrt3i5MIlCaY504LzSRi
igHCzAPlHws+W0rB5N+er5/2pJKnfBSDiCiFAVtCLOZ7gLiMm0jhO2B6tUXHI/+M
RPjy02i59lINMRRev56GKtcd9qO/0kUJWdZTdA2XoS82ixPvZtXQpUpuL12ab+9E
aDK8Z4RHJYYfCT3Q5vNAXaiWQ+8PTWm2QgBR/bkwSWc+NpUFgNPN9PvQi8WEg5Um
AGMCAwEAAaNjMGEwHQYDVR0OBBYEFDZh4QB8iAUJUYtEbEf/GkzJ6k8SMB8GA1Ud
IwQYMBaAFDZh4QB8iAUJUYtEbEf/GkzJ6k8SMA8GA1UdEwEB/wQFMAMBAf8wDgYD
VR0PAQH/BAQDAgIEMA0GCSqGSIb3DQEBCwUAA4ICAQBTNNZe5cuf8oiq+jV0itTG
zWVhSTjOBEk2FQvh11J3o3lna0o7rd8RFHnN00q4hi6TapFhh4qaw/iG6Xg+xOan
63niLWIC5GOPFgPeYXM9+nBb3zZzC8ABypYuCusWCmt6Tn3+Pjbz3MTVhRGXuT/T
QH4KGFY4PhvzAyXwdjTOCXID+aHud4RLcSySr0Fq/L+R8TWalvM1wJJPhyRjqRCJ
erGtfBagiALzvhnmY7U1qFcS0NCnKjoO7oFedKdWlZz0YAfu3aGCJd4KHT0MsGiL
Zez9WP81xYSrKMNEsDK+zK5fVzw6jA7cxmpXcARTnmAuGUeI7VVDhDzKeVOctf3a
0qQLwC+d0+xrETZ4r2fRGNw2YEs2W8Qj6oDcfPvq9JySe7pJ6wcHnl5EZ0lwc4xH
7Y4Dx9RA1JlfooLMw3tOdJZH0enxPXaydfAD3YifeZpFaUzicHeLzVJLt9dvGB0b
HQLE4+EqKFgOZv2EoP686DQqbVS1u+9k0p2xbMA105TBIk7npraa8VM0fnrRKi7w
lZKwdH+aNAyhbXRW9xsnODJ+g8eF452zvbiKKngEKirK5LGieoXBX7tZ9D1GNBH2
Ob3bKOwwIWdEFle/YF/h6zWgdeoaNGDqVBrLr2+0DtWoiB1aDEjLWl9FmyIUyUm7
mD/vFDkzF+wm7cyWpQpCVQ==
-----END CERTIFICATE-----
`,uy=`
-----BEGIN CERTIFICATE-----
MIIFHDCCAwSgAwIBAgIJAPHBcqaZ6vUdMA0GCSqGSIb3DQEBCwUAMBsxGTAXBgNV
BAUTEGY5MjAwOWU4NTNiNmIwNDUwHhcNMjIwMzIwMTgwNzQ4WhcNNDIwMzE1MTgw
NzQ4WjAbMRkwFwYDVQQFExBmOTIwMDllODUzYjZiMDQ1MIICIjANBgkqhkiG9w0B
AQEFAAOCAg8AMIICCgKCAgEAr7bHgiuxpwHsK7Qui8xUFmOr75gvMsd/dTEDDJdS
Sxtf6An7xyqpRR90PL2abxM1dEqlXnf2tqw1Ne4Xwl5jlRfdnJLmN0pTy/4lj4/7
tv0Sk3iiKkypnEUtR6WfMgH0QZfKHM1+di+y9TFRtv6y//0rb+T+W8a9nsNL/ggj
nar86461qO0rOs2cXjp3kOG1FEJ5MVmFmBGtnrKpa73XpXyTqRxB/M0n1n/W9nGq
C4FSYa04T6N5RIZGBN2z2MT5IKGbFlbC8UrW0DxW7AYImQQcHtGl/m00QLVWutHQ
oVJYnFPlXTcHYvASLu+RhhsbDmxMgJJ0mcDpvsC4PjvB+TxywElgS70vE0XmLD+O
JtvsBslHZvPBKCOdT0MS+tgSOIfga+z1Z1g7+DVagf7quvmag8jfPioyKvxnK/Eg
sTUVi2ghzq8wm27ud/mIM7AY2qEORR8Go3TVB4HzWQgpZrt3i5MIlCaY504LzSRi
igHCzAPlHws+W0rB5N+er5/2pJKnfBSDiCiFAVtCLOZ7gLiMm0jhO2B6tUXHI/+M
RPjy02i59lINMRRev56GKtcd9qO/0kUJWdZTdA2XoS82ixPvZtXQpUpuL12ab+9E
aDK8Z4RHJYYfCT3Q5vNAXaiWQ+8PTWm2QgBR/bkwSWc+NpUFgNPN9PvQi8WEg5Um
AGMCAwEAAaNjMGEwHQYDVR0OBBYEFDZh4QB8iAUJUYtEbEf/GkzJ6k8SMB8GA1Ud
IwQYMBaAFDZh4QB8iAUJUYtEbEf/GkzJ6k8SMA8GA1UdEwEB/wQFMAMBAf8wDgYD
VR0PAQH/BAQDAgIEMA0GCSqGSIb3DQEBCwUAA4ICAQB8cMqTllHc8U+qCrOlg3H7
174lmaCsbo/bJ0C17JEgMLb4kvrqsXZs01U3mB/qABg/1t5Pd5AORHARs1hhqGIC
W/nKMav574f9rZN4PC2ZlufGXb7sIdJpGiO9ctRhiLuYuly10JccUZGEHpHSYM2G
tkgYbZba6lsCPYAAP83cyDV+1aOkTf1RCp/lM0PKvmxYN10RYsK631jrleGdcdkx
oSK//mSQbgcWnmAEZrzHoF1/0gso1HZgIn0YLzVhLSA/iXCX4QT2h3J5z3znluKG
1nv8NQdxei2DIIhASWfu804CA96cQKTTlaae2fweqXjdN1/v2nqOhngNyz1361mF
mr4XmaKH/ItTwOe72NI9ZcwS1lVaCvsIkTDCEXdm9rCNPAY10iTunIHFXRh+7KPz
lHGewCq/8TOohBRn0/NNfh7uRslOSZ/xKbN9tMBtw37Z8d2vvnXq/YWdsm1+JLVw
n6yYD/yacNJBlwpddla8eaVMjsF6nBnIgQOf9zKSe06nSTqvgwUHosgOECZJZ1Eu
zbH4yswbt02tKtKEFhx+v+OTge/06V+jGsqTWLsfrOCNLuA8H++z+pUENmpqnnHo
vaI47gC+TNpkgYGkkBT6B/m/U01BuOBBTzhIlMEZq9qkDWuM2cA5kW5V3FJUcfHn
w1IdYIg2Wxg7yHcQZemFQg==
-----END CERTIFICATE-----
`;var dy=`-----BEGIN CERTIFICATE-----
MIICEjCCAZmgAwIBAgIQaB0BbHo84wIlpQGUKEdXcTAKBggqhkjOPQQDAzBLMR8w
HQYDVQQDDBZBcHBsZSBXZWJBdXRobiBSb290IENBMRMwEQYDVQQKDApBcHBsZSBJ
bmMuMRMwEQYDVQQIDApDYWxpZm9ybmlhMB4XDTIwMDMxODE4MjEzMloXDTQ1MDMx
NTAwMDAwMFowSzEfMB0GA1UEAwwWQXBwbGUgV2ViQXV0aG4gUm9vdCBDQTETMBEG
A1UECgwKQXBwbGUgSW5jLjETMBEGA1UECAwKQ2FsaWZvcm5pYTB2MBAGByqGSM49
AgEGBSuBBAAiA2IABCJCQ2pTVhzjl4Wo6IhHtMSAzO2cv+H9DQKev3//fG59G11k
xu9eI0/7o6V5uShBpe1u6l6mS19S1FEh6yGljnZAJ+2GNP1mi/YK2kSXIuTHjxA/
pcoRf7XkOtO4o1qlcaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUJtdk
2cV4wlpn0afeaxLQG2PxxtcwDgYDVR0PAQH/BAQDAgEGMAoGCCqGSM49BAMDA2cA
MGQCMFrZ+9DsJ1PW9hfNdBywZDsWDbWFp28it1d/5w2RPkRX3Bbn/UbDTNLx7Jr3
jAGGiQIwHFj+dJZYUJR786osByBelJYsVZd2GbHQu209b5RCmGQ21gpSAk9QZW4B
1bWeT0vT
-----END CERTIFICATE-----
`;var py=`-----BEGIN CERTIFICATE-----
MIIDXzCCAkegAwIBAgILBAAAAAABIVhTCKIwDQYJKoZIhvcNAQELBQAwTDEgMB4G
A1UECxMXR2xvYmFsU2lnbiBSb290IENBIC0gUjMxEzARBgNVBAoTCkdsb2JhbFNp
Z24xEzARBgNVBAMTCkdsb2JhbFNpZ24wHhcNMDkwMzE4MTAwMDAwWhcNMjkwMzE4
MTAwMDAwWjBMMSAwHgYDVQQLExdHbG9iYWxTaWduIFJvb3QgQ0EgLSBSMzETMBEG
A1UEChMKR2xvYmFsU2lnbjETMBEGA1UEAxMKR2xvYmFsU2lnbjCCASIwDQYJKoZI
hvcNAQEBBQADggEPADCCAQoCggEBAMwldpB5BngiFvXAg7aEyiie/QV2EcWtiHL8
RgJDx7KKnQRfJMsuS+FggkbhUqsMgUdwbN1k0ev1LKMPgj0MK66X17YUhhB5uzsT
gHeMCOFJ0mpiLx9e+pZo34knlTifBtc+ycsmWQ1z3rDI6SYOgxXG71uL0gRgykmm
KPZpO/bLyCiR5Z2KYVc3rHQU3HTgOu5yLy6c+9C7v/U9AOEGM+iCK65TpjoWc4zd
QQ4gOsC0p6Hpsk+QLjJg6VfLuQSSaGjlOCZgdbKfd/+RFO+uIEn8rUAVSNECMWEZ
XriX7613t2Saer9fwRPvm2L7DWzgVGkWqQPabumDk3F2xmmFghcCAwEAAaNCMEAw
DgYDVR0PAQH/BAQDAgEGMA8GA1UdEwEB/wQFMAMBAf8wHQYDVR0OBBYEFI/wS3+o
LkUkrk1Q+mOai97i3Ru8MA0GCSqGSIb3DQEBCwUAA4IBAQBLQNvAUKr+yAzv95ZU
RUm7lgAJQayzE4aGKAczymvmdLm6AC2upArT9fHxD4q/c2dKg8dEe3jgr25sbwMp
jjM5RcOO5LlXbKr8EpbsU8Yt5CRsuZRj+9xTaGdWPoO4zzUhw8lo/s7awlOqzJCK
6fBdRoyV3XpYKBovHd7NADdBj+1EbddTKJd+82cEHhXXipa0095MJ6RMG3NzdvQX
mcIfeg7jLQitChws/zyrVQ4PkX4268NXSb7hLi18YIvDQVETI53O9zJrlAGomecs
Mx86OyXShkDOOyyGeMlhLxS67ttVb9+E7gUJTb0o2HLO02JQZR7rkpeDMdmztcpH
WD9f
-----END CERTIFICATE-----
 `,fy=`-----BEGIN CERTIFICATE-----
MIIFWjCCA0KgAwIBAgISEdK7udcjGJ5AXwqdLdDfJWfRMA0GCSqGSIb3DQEBDAUA
MEYxCzAJBgNVBAYTAkJFMRkwFwYDVQQKExBHbG9iYWxTaWduIG52LXNhMRwwGgYD
VQQDExNHbG9iYWxTaWduIFJvb3QgUjQ2MB4XDTE5MDMyMDAwMDAwMFoXDTQ2MDMy
MDAwMDAwMFowRjELMAkGA1UEBhMCQkUxGTAXBgNVBAoTEEdsb2JhbFNpZ24gbnYt
c2ExHDAaBgNVBAMTE0dsb2JhbFNpZ24gUm9vdCBSNDYwggIiMA0GCSqGSIb3DQEB
AQUAA4ICDwAwggIKAoICAQCsrHQy6LNl5brtQyYdpokNRbopiLKkHWPd08EsCVeJ
OaFV6Wc0dwxu5FUdUiXSE2te4R2pt32JMl8Nnp8semNgQB+msLZ4j5lUlghYruQG
vGIFAha/r6gjA7aUD7xubMLL1aa7DOn2wQL7Id5m3RerdELv8HQvJfTqa1VbkNud
316HCkD7rRlr+/fKYIje2sGP1q7Vf9Q8g+7XFkyDRTNrJ9CG0Bwta/OrffGFqfUo
0q3v84RLHIf8E6M6cqJaESvWJ3En7YEtbWaBkoe0G1h6zD8K+kZPTXhc+CtI4wSE
y132tGqzZfxCnlEmIyDLPRT5ge1lFgBPGmSXZgjPjHvjK8Cd+RTyG/FWaha/LIWF
zXg4mutCagI0GIMXTpRW+LaCtfOW3T3zvn8gdz57GSNrLNRyc0NXfeD412lPFzYE
+cCQYDdF3uYM2HSNrpyibXRdQr4G9dlkbgIQrImwTDsHTUB+JMWKmIJ5jqSngiCN
I/onccnfxkF0oE32kRbcRoxfKWMxWXEM2G/CtjJ9++ZdU6Z+Ffy7dXxd7Pj2Fxzs
x2sZy/N78CsHpdlseVR2bJ0cpm4O6XkMqCNqo98bMDGfsVR7/mrLZqrcZdCinkqa
ByFrgY/bxFn63iLABJzjqls2k+g9vXqhnQt2sQvHnf3PmKgGwvgqo6GDoLclcqUC
4wIDAQABo0IwQDAOBgNVHQ8BAf8EBAMCAYYwDwYDVR0TAQH/BAUwAwEB/zAdBgNV
HQ4EFgQUA1yrc4GHqMywptWU4jaWSf8FmSwwDQYJKoZIhvcNAQEMBQADggIBAHx4
7PYCLLtbfpIrXTncvtgdokIzTfnvpCo7RGkerNlFo048p9gkUbJUHJNOxO97k4Vg
JuoJSOD1u8fpaNK7ajFxzHmuEajwmf3lH7wvqMxX63bEIaZHU1VNaL8FpO7XJqti
2kM3S+LGteWygxk6x9PbTZ4IevPuzz5i+6zoYMzRx6Fcg0XERczzF2sUyQQCPtIk
pnnpHs6i58FZFZ8d4kuaPp92CC1r2LpXFNqD6v6MVenQTqnMdzGxRBF6XLE+0xRF
FRhiJBPSy03OXIPBNvIQtQ6IbbjhVp+J3pZmOUdkLG5NrmJ7v2B0GbhWrJKsFjLt
rWhV/pi60zTe9Mlhww6G9kuEYO4Ne7UyWHmRVSyBQ7N0H3qqJZ4d16GLuc1CLgSk
ZoNNiTW2bKg2SnkheCLQQrzRQDGQob4Ez8pn7fXwgNNgyYMqIgXQBztSvwyeqiv5
u+YfjyW6hY0XHgL+XVAEV8/+LbzvXMAaq7afJMbfc2hIkCwU9D9SGuTSyxTDYWnP
4vkYxboznxSjBF25cfe1lNj2M8FawTSLfJvdkzrnE6JwYZ+vj+vYxXX4M2bUdGc6
N3ec592kD3ZDZopD8p/7DEJ4Y9HiD2971KE9dJeFt0g5QdYg/NA6s/rob8SKunE3
vouXsXgxT7PntgMTzlSdriVZzH81Xwj3QEUxeCp6
-----END CERTIFICATE-----
`;var wp=class{constructor(){Object.defineProperty(this,"pemCertificates",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_runtimeSupportsPQC",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.pemCertificates=new Map}setRootCertificates(e){let{identifier:r,certificates:n}=e,o=[];for(let i of n)i instanceof Uint8Array?o.push(Pe(i)):o.push(i);this.pemCertificates.set(r,o)}getRootCertificates(e){let{identifier:r}=e;return this.pemCertificates.get(r)??[]}runtimeSupportsPQC(){return this._runtimeSupportsPQC??=iy("ML-DSA-44"),this._runtimeSupportsPQC}},xt=new wp;xt.setRootCertificates({identifier:"android-key",certificates:[ay,cy,ly,uy]});xt.setRootCertificates({identifier:"android-safetynet",certificates:[sy]});xt.setRootCertificates({identifier:"apple",certificates:[dy]});xt.setRootCertificates({identifier:"mds",certificates:[py,fy]});var bx={residentKey:"preferred",userVerification:"preferred"};function xp(){return xt.runtimeSupportsPQC()?[U.ML_DSA_44,U.EdDSA,U.ES256,U.RS256]:[U.EdDSA,U.ES256,U.RS256]}async function hy(t){let{rpName:e,rpID:r,userName:n,userID:o,challenge:i=await Za(),userDisplayName:a="",timeout:c=6e4,attestationType:u="none",excludeCredentials:d=[],authenticatorSelection:p=bx,extensions:h,supportedAlgorithmIDs:g=xp(),preferredAuthenticatorType:w}=t,k=g.map(Z=>({alg:Z,type:"public-key"}));p.residentKey===void 0?p.requireResidentKey&&(p.residentKey="required"):p.requireResidentKey=p.residentKey==="required";let M=i;if(typeof M=="string"&&(M=F.fromUTF8String(M)),typeof o=="string")throw new Error("String values for `userID` are no longer supported. See https://simplewebauthn.dev/docs/advanced/server/custom-user-ids");let I=o;I||(I=await tf());let D=[];return w&&(w==="securityKey"?(D.push("security-key"),p.authenticatorAttachment="cross-platform"):w==="localDevice"?(D.push("client-device"),p.authenticatorAttachment="platform"):w==="remoteDevice"&&(D.push("hybrid"),p.authenticatorAttachment="cross-platform")),{challenge:ee.fromBuffer(M),rp:{name:e,id:r},user:{id:ee.fromBuffer(I),name:n,displayName:a},pubKeyCredParams:k,timeout:c,attestation:u,excludeCredentials:d.map(Z=>{if(!ee.isBase64URL(Z.id))throw new Error(`excludeCredential id "${Z.id}" is not a valid base64url string`);return{...Z,id:ee.trimPadding(Z.id),type:"public-key"}}),authenticatorSelection:p,extensions:{...h,credProps:!0},hints:D}}function Bl({be:t,bs:e}){let r=e,n="singleDevice";if(t&&(n="multiDevice"),n==="singleDevice"&&r)throw new vp("Single-device credential indicated that it was backed up, which should be impossible.");return{credentialDeviceType:n,credentialBackedUp:r}}var vp=class extends Error{constructor(e){super(e),this.name="InvalidBackupFlags"}};async function Rl(t,e){try{return await Promise.any(e.map(n=>new Promise((o,i)=>{bt(F.fromASCIIString(n)).then(a=>{F.areEqual(t,a)?o(n):i()})})))}catch(r){throw r.name==="AggregateError"?new Ap:r}}var Ap=class extends Error{constructor(){super("Unexpected RP ID hash"),this.name="UnexpectedRPIDHash"}};async function my(t){let{attStmt:e,clientDataHash:r,rpIdHash:n,credentialID:o,credentialPublicKey:i,aaguid:a,rootCertificates:c}=t,u=Uint8Array.from([0]),d=ti(i),p=F.concat([u,n,r,o,d]),h=e.get("sig"),g=e.get("x5c");if(!g)throw new Error("No attestation certificate provided in attestation statement (FIDOU2F)");if(!h)throw new Error("No attestation signature provided in attestation statement (FIDOU2F)");let w=Number.parseInt(F.toHex(a),16);if(w!==0)throw new Error(`AAGUID "${w}" was not expected value`);try{await qe(g.map(Pe),c)}catch(k){let M=k;throw new Error(`${M.message} (FIDOU2F)`)}return wt({signature:h,data:p,x509Certificate:g[0],hashAlgorithm:U.ES256})}var gy="1.3.6.1.4.1.45724.1.1.4";function Ml(t,e){if(!t)return!0;let r=t.find(a=>a.extnID===gy);if(!r)return!0;let n=xe.parse(r.extnValue,R),o=new Uint8Array(n.buffer);if(!F.areEqual(e,o)){let a=F.toHex(o),c=F.toHex(e);throw new Error(`Certificate extension id-fido-gen-ce-aaguid (${gy}) value of "${a}" was present but not equal to attestation statement AAGUID value of "${c}"`)}return!0}var Pl={debug(){},info(){},warn(){},error(){}};function yy(t){let e={...Pl};return t.debug&&(e.debug=t.debug),t.info&&(e.info=t.info),t.warn&&(e.warn=t.warn),t.error&&(e.error=t.error),e}var wx={url:"",no:0,nextUpdate:new Date(0)},xx="https://mds.fidoalliance.org/",vt;(function(t){t[t.DISABLED=0]="DISABLED",t[t.REFRESHING=1]="REFRESHING",t[t.READY=2]="READY"})(vt||(vt={}));var Ep=class{constructor(){Object.defineProperty(this,"mdsCache",{enumerable:!0,configurable:!0,writable:!0,value:{}}),Object.defineProperty(this,"statementCache",{enumerable:!0,configurable:!0,writable:!0,value:{}}),Object.defineProperty(this,"state",{enumerable:!0,configurable:!0,writable:!0,value:vt.DISABLED}),Object.defineProperty(this,"verificationMode",{enumerable:!0,configurable:!0,writable:!0,value:"strict"}),Object.defineProperty(this,"logger",{enumerable:!0,configurable:!0,writable:!0,value:Pl})}async initialize(e={}){this.statementCache={};let{mdsServers:r=[xx],statements:n,verificationMode:o,logger:i=Pl}=e;if(this.logger=yy(i),this.setState(vt.REFRESHING),n?.length){let a=0;n.forEach(c=>{c.aaguid&&(this.statementCache[c.aaguid]={entry:{metadataStatement:c,statusReports:[],timeOfLastStatusChange:"1970-01-01"},url:wx.url},a+=1)}),this.logger.info(`Cached ${a} local statements`)}if(r?.length){let a=Object.keys(this.statementCache).length,c=r.length;for(let p of r)try{let h={url:p,no:0,nextUpdate:new Date(0)},g=await this.downloadBlob(h);await this.verifyBlob(g,h)}catch(h){this.logger.error(`Could not download BLOB from ${p}:`,h),c-=1}let d=Object.keys(this.statementCache).length-a;this.logger.info(`Cached ${d} statements from ${c} metadata server(s)`)}o&&(this.verificationMode=o),this.setState(vt.READY)}async getStatement(e){if(this.state===vt.DISABLED||!e)return;e instanceof Uint8Array&&(e=Ja(e)),await this.pauseUntilReady();let r=this.statementCache[e];if(!r){if(this.verificationMode==="strict")throw new Error(`No metadata statement found for aaguid "${e}"`);return}if(r.url){let o=this.mdsCache[r.url];if(new Date>o.nextUpdate)try{this.setState(vt.REFRESHING);let a=await this.downloadBlob(o);await this.verifyBlob(a,o)}finally{this.setState(vt.READY)}}let{entry:n}=r;for(let o of n.statusReports){let{status:i}=o;if(i==="USER_VERIFICATION_BYPASS"||i==="ATTESTATION_KEY_COMPROMISE"||i==="USER_KEY_REMOTE_COMPROMISE"||i==="USER_KEY_PHYSICAL_COMPROMISE")throw new Error(`Detected compromised aaguid "${e}"`)}return n.metadataStatement}async downloadBlob(e){let{url:r}=e;return await(await kl(r)).text()}async verifyBlob(e,r){let{url:n,no:o}=r,{payload:i,parsedNextUpdate:a}=await Zg(e);if(i.no<=o)throw new Error(`Latest BLOB no. ${i.no} is not greater than previous no. ${o}`);for(let c of i.entries)c.aaguid&&(this.statementCache[c.aaguid]={entry:c,url:n});n?this.mdsCache[n]={...r,no:i.no,nextUpdate:a}:a<new Date&&this.logger.warn(`\u26A0\uFE0F This MDS blob (serial: ${i.no}) contains stale data as of ${a.toISOString()}. Please consider re-initializing MetadataService with a newer MDS blob.`)}pauseUntilReady(){return this.state===vt.READY?new Promise(r=>{r()}):new Promise((r,n)=>{let a=700,c=globalThis.setInterval(()=>{a<1?(clearInterval(c),n(`State did not become ready in ${7e4/1e3} seconds`)):this.state===vt.READY&&(clearInterval(c),r()),a-=1},100)})}setState(e){this.state=e,e===vt.DISABLED?this.logger.debug("MetadataService is DISABLED"):e===vt.REFRESHING?this.logger.debug("MetadataService is REFRESHING"):e===vt.READY&&this.logger.debug("MetadataService is READY")}},$n=new Ep;async function Vn({statement:t,credentialPublicKey:e,x5c:r,attestationStatementAlg:n}){let{authenticationAlgorithms:o,authenticatorGetInfo:i,attestationRootCertificates:a}=t,c=new Set;o.forEach(I=>{let D=by[I];D&&c.add(D)});let u=sr(e),d=u.get(q.kty),p=u.get(q.alg);if(!d)throw new Error("Credential public key was missing kty");if(!p)throw new Error("Credential public key was missing alg");if(!d)throw new Error("Credential public key was missing kty");let h={kty:d,alg:p};if(on(u)){let I=u.get(q.crv);h.crv=I}let g=!1;for(let I of c)if(I.alg===h.alg&&I.kty===h.kty&&((I.kty===Je.EC2||I.kty===Je.OKP)&&(I.crv,h.crv),g=!0),g)break;if(!g){let I=o.map(fe=>`'${fe}' (COSE info: ${wy(by[fe])})`),D=JSON.stringify(I,null,2).replace(/"/g,""),Z=wy(h);throw new Error(`Public key parameters ${Z} did not match any of the following metadata algorithms:
${D}`)}if(n!==void 0&&i?.algorithms!==void 0){let I=i.algorithms.map(D=>D.alg);if(I.indexOf(n)<0)throw new Error(`Attestation statement alg ${n} did not match one of ${I}`)}let w=r.map(Pe),k=a.map(Pe),M=!1;return w.length===1&&k.indexOf(w[0])>=0&&(M=!0),M||await qe(w,k),!0}var by={secp256r1_ecdsa_sha256_raw:{kty:2,alg:-7,crv:1},secp256r1_ecdsa_sha256_der:{kty:2,alg:-7,crv:1},rsassa_pss_sha256_raw:{kty:3,alg:-37},rsassa_pss_sha256_der:{kty:3,alg:-37},secp256k1_ecdsa_sha256_raw:{kty:2,alg:-47,crv:8},secp256k1_ecdsa_sha256_der:{kty:2,alg:-47,crv:8},rsassa_pss_sha384_raw:{kty:3,alg:-38},rsassa_pkcsv15_sha256_raw:{kty:3,alg:-257},rsassa_pkcsv15_sha384_raw:{kty:3,alg:-258},rsassa_pkcsv15_sha512_raw:{kty:3,alg:-259},rsassa_pkcsv15_sha1_raw:{kty:3,alg:-65535},secp384r1_ecdsa_sha384_raw:{kty:2,alg:-35,crv:2},secp512r1_ecdsa_sha256_raw:{kty:2,alg:-36,crv:3},ed25519_eddsa_sha512_raw:{kty:1,alg:-8,crv:6}};function wy(t){let{kty:e,alg:r,crv:n}=t,o="";return e!==Je.RSA?o=`{ kty: ${e}, alg: ${r}, crv: ${n} }`:o=`{ kty: ${e}, alg: ${r} }`,o}async function xy(t){let{attStmt:e,clientDataHash:r,authData:n,credentialPublicKey:o,aaguid:i,rootCertificates:a}=t,c=e.get("sig"),u=e.get("x5c"),d=e.get("alg");if(!c)throw new Error("No attestation signature provided in attestation statement (Packed)");if(!d)throw new Error("Attestation statement did not contain alg (Packed)");if(!Et(d))throw new Error(`Attestation statement contained invalid alg ${d} (Packed)`);let p=F.concat([n,r]),h=!1;if(u){let{subject:g,basicConstraintsCA:w,version:k,notBefore:M,notAfter:I,parsedCertificate:D}=mi(u[0]),{OU:Z,CN:fe,O:se,C:te}=g;if(Z!=="Authenticator Attestation")throw new Error('Certificate OU was not "Authenticator Attestation" (Packed|Full)');if(!fe)throw new Error("Certificate CN was empty (Packed|Full)");if(!se)throw new Error("Certificate O was empty (Packed|Full)");if(!te||te.length!==2)throw new Error("Certificate C was not two-character ISO 3166 code (Packed|Full)");if(w)throw new Error("Certificate basic constraints CA was not `false` (Packed|Full)");if(k!==2)throw new Error("Certificate version was not `3` (ASN.1 value of 2) (Packed|Full)");let $=new Date;if(M>$)throw new Error(`Certificate not good before "${M.toString()}" (Packed|Full)`);if($=new Date,I<$)throw new Error(`Certificate not good after "${I.toString()}" (Packed|Full)`);try{await Ml(D.tbsCertificate.extensions,i)}catch(S){let A=S;throw new Error(`${A.message} (Packed|Full)`)}let v=await $n.getStatement(i);if(v){if(v.attestationTypes.indexOf("basic_full")<0)throw new Error("Metadata does not indicate support for full attestations (Packed|Full)");try{await Vn({statement:v,credentialPublicKey:o,x5c:u,attestationStatementAlg:d})}catch(S){let A=S;throw new Error(`${A.message} (Packed|Full)`)}}else try{await qe(u.map(Pe),a)}catch(S){let A=S;throw new Error(`${A.message} (Packed|Full)`,{cause:A})}h=await wt({signature:c,data:p,x509Certificate:u[0],hashAlgorithm:d})}else h=await wt({signature:c,data:p,credentialPublicKey:o,hashAlgorithm:d});return h}async function vy(t){let{attStmt:e,clientDataHash:r,authData:n,aaguid:o,rootCertificates:i,verifyTimestampMS:a=!0,credentialPublicKey:c,attestationSafetyNetEnforceCTSCheck:u}=t,d=e.get("alg"),p=e.get("response");if(!e.get("ver"))throw new Error("No ver value in attestation (SafetyNet)");if(!p)throw new Error("No response was included in attStmt by authenticator (SafetyNet)");let w=F.toUTF8String(p).split("."),k=JSON.parse(ee.toUTF8String(w[0])),M=JSON.parse(ee.toUTF8String(w[1])),I=w[2],{nonce:D,ctsProfileMatch:Z,timestampMs:fe}=M;if(a){let ce=Date.now();if(fe>Date.now())throw new Error(`Payload timestamp "${fe}" was later than "${ce}" (SafetyNet)`);let me=fe+60*1e3;if(ce=Date.now(),me<ce)throw new Error(`Payload timestamp "${me}" has expired (SafetyNet)`)}let se=F.concat([n,r]),te=await bt(se),$=ee.fromBuffer(te,"base64");if(D!==$)throw new Error("Could not verify payload nonce (SafetyNet)");if(u&&!Z)throw new Error("Could not verify device integrity (SafetyNet)");let v=ee.toBuffer(k.x5c[0],"base64"),S=mi(v),{subject:A}=S;if(A.CN!=="attest.android.com")throw new Error('Certificate common name was not "attest.android.com" (SafetyNet)');let O=await $n.getStatement(o);if(O)try{await Vn({statement:O,credentialPublicKey:c,x5c:k.x5c,attestationStatementAlg:d})}catch(ce){let me=ce;throw new Error(`${me.message} (SafetyNet)`)}else try{await qe(k.x5c.map(Pe),i)}catch(ce){let me=ce;throw new Error(`${me.message} (SafetyNet)`)}let G=F.fromUTF8String(`${w[0]}.${w[1]}`),P=ee.toBuffer(I);return await wt({signature:P,data:G,x509Certificate:v,hashAlgorithm:d})}var Ay={196:"TPM_ST_RSP_COMMAND",32768:"TPM_ST_NULL",32769:"TPM_ST_NO_SESSIONS",32770:"TPM_ST_SESSIONS",32788:"TPM_ST_ATTEST_NV",32789:"TPM_ST_ATTEST_COMMAND_AUDIT",32790:"TPM_ST_ATTEST_SESSION_AUDIT",32791:"TPM_ST_ATTEST_CERTIFY",32792:"TPM_ST_ATTEST_QUOTE",32793:"TPM_ST_ATTEST_TIME",32794:"TPM_ST_ATTEST_CREATION",32801:"TPM_ST_CREATION",32802:"TPM_ST_VERIFIED",32803:"TPM_ST_AUTH_SECRET",32804:"TPM_ST_HASHCHECK",32805:"TPM_ST_AUTH_SIGNED",32809:"TPM_ST_FU_MANIFEST"},Tr={0:"TPM_ALG_ERROR",1:"TPM_ALG_RSA",4:"TPM_ALG_SHA",4:"TPM_ALG_SHA1",5:"TPM_ALG_HMAC",6:"TPM_ALG_AES",7:"TPM_ALG_MGF1",8:"TPM_ALG_KEYEDHASH",10:"TPM_ALG_XOR",11:"TPM_ALG_SHA256",12:"TPM_ALG_SHA384",13:"TPM_ALG_SHA512",16:"TPM_ALG_NULL",18:"TPM_ALG_SM3_256",19:"TPM_ALG_SM4",20:"TPM_ALG_RSASSA",21:"TPM_ALG_RSAES",22:"TPM_ALG_RSAPSS",23:"TPM_ALG_OAEP",24:"TPM_ALG_ECDSA",25:"TPM_ALG_ECDH",26:"TPM_ALG_ECDAA",27:"TPM_ALG_SM2",28:"TPM_ALG_ECSCHNORR",29:"TPM_ALG_ECMQV",32:"TPM_ALG_KDF1_SP800_56A",33:"TPM_ALG_KDF2",34:"TPM_ALG_KDF1_SP800_108",35:"TPM_ALG_ECC",37:"TPM_ALG_SYMCIPHER",38:"TPM_ALG_CAMELLIA",64:"TPM_ALG_CTR",65:"TPM_ALG_OFB",66:"TPM_ALG_CBC",67:"TPM_ALG_CFB",68:"TPM_ALG_ECB"},Ey={0:"TPM_ECC_NONE",1:"TPM_ECC_NIST_P192",2:"TPM_ECC_NIST_P224",3:"TPM_ECC_NIST_P256",4:"TPM_ECC_NIST_P384",5:"TPM_ECC_NIST_P521",16:"TPM_ECC_BN_P256",17:"TPM_ECC_BN_P638",32:"TPM_ECC_SM2_P256"},Sy={"id:414D4400":{name:"AMD",id:"AMD"},"id:414E5400":{name:"Ant Group",id:"ANT"},"id:41544D4C":{name:"Atmel",id:"ATML"},"id:4252434D":{name:"Broadcom",id:"BRCM"},"id:4353434F":{name:"Cisco",id:"CSCO"},"id:464C5953":{name:"Flyslice Technologies",id:"FLYS"},"id:524F4343":{name:"Fuzhou Rockchip",id:"ROCC"},"id:474F4F47":{name:"Google",id:"GOOG"},"id:48504900":{name:"HPI",id:"HPI"},"id:48504500":{name:"HPE",id:"HPE"},"id:48495349":{name:"Huawei",id:"HISI"},"id:49424D00":{name:"IBM",id:"IBM"},"id:49465800":{name:"Infineon",id:"IFX"},"id:494E5443":{name:"Intel",id:"INTC"},"id:4C454E00":{name:"Lenovo",id:"LEN"},"id:4D534654":{name:"Microsoft",id:"MSFT"},"id:4E534D20":{name:"National Semiconductor",id:"NSM"},"id:4E545A00":{name:"Nationz",id:"NTZ"},"id:4E534700":{name:"NSING",id:"NSG"},"id:4E544300":{name:"Nuvoton Technology",id:"NTC"},"id:51434F4D":{name:"Qualcomm",id:"QCOM"},"id:534D534E":{name:"Samsung",id:"SMSN"},"id:53454345":{name:"SecEdge",id:"SECE"},"id:534E5300":{name:"Sinosun",id:"SNS"},"id:534D5343":{name:"SMSC",id:"SMSC"},"id:53544D20":{name:"STMicroelectronics",id:"STM"},"id:54584E00":{name:"Texas Instruments",id:"TXN"},"id:57454300":{name:"Winbond",id:"WEC"},"id:5345414C":{name:"Wisekey",id:"SEAL"},"id:FFFFF1D0":{name:"FIDO Alliance",id:"FIDO"}},ky={TPM_ECC_NIST_P256:1,TPM_ECC_NIST_P384:2,TPM_ECC_NIST_P521:3,TPM_ECC_BN_P256:1,TPM_ECC_SM2_P256:1};function Cy(t){let e=0,r=F.toDataView(t),n=r.getUint32(e);e+=4;let o=r.getUint16(e);e+=2;let i=Ay[o],a=r.getUint16(e);e+=2;let c=t.slice(e,e+=a),u=r.getUint16(e);e+=2;let d=t.slice(e,e+=u),p=t.slice(e,e+=8),h=r.getUint32(e);e+=4;let g=r.getUint32(e);e+=4;let w=!!t.slice(e,e+=1),k={clock:p,resetCount:h,restartCount:g,safe:w},M=t.slice(e,e+=8),I=r.getUint16(e);e+=2;let D=t.slice(e,e+=I),Z=F.toDataView(D),fe=r.getUint16(e);e+=2;let se=t.slice(e,e+=fe),te={nameAlg:Tr[Z.getUint16(0)],nameAlgBuffer:D.slice(0,2),name:D,qualifiedName:se};return{magic:n,type:i,qualifiedSigner:c,extraData:d,clockInfo:k,firmwareVersion:M,attested:te}}function Ty(t){let e=0,r=F.toDataView(t),n=Tr[r.getUint16(e)];e+=2;let o=Tr[r.getUint16(e)];e+=2;let i=r.getUint32(e);e+=4;let a={fixedTPM:!!(i&1),stClear:!!(i&2),fixedParent:!!(i&8),sensitiveDataOrigin:!!(i&16),userWithAuth:!!(i&32),adminWithPolicy:!!(i&64),noDA:!!(i&512),encryptedDuplication:!!(i&1024),restricted:!!(i&32768),decrypt:!!(i&65536),signOrEncrypt:!!(i&131072)},c=r.getUint16(e);e+=2;let u=t.slice(e,e+=c),d={},p=Uint8Array.from([]);if(n==="TPM_ALG_RSA"){let h=Tr[r.getUint16(e)];e+=2;let g=Tr[r.getUint16(e)];e+=2;let w=r.getUint16(e);e+=2;let k=r.getUint32(e);e+=4,d.rsa={symmetric:h,scheme:g,keyBits:w,exponent:k};let M=r.getUint16(e);e+=2,p=t.slice(e,e+=M)}else if(n==="TPM_ALG_ECC"){let h=Tr[r.getUint16(e)];e+=2;let g=Tr[r.getUint16(e)];e+=2;let w=Ey[r.getUint16(e)];e+=2;let k=Tr[r.getUint16(e)];e+=2,d.ecc={symmetric:h,scheme:g,curveID:w,kdf:k};let M=r.getUint16(e);e+=2;let I=t.slice(e,e+=M),D=r.getUint16(e);e+=2;let Z=t.slice(e,e+=D);p=F.concat([I,Z])}else throw new Error(`Unexpected type "${n}" (TPM)`);return{type:n,nameAlg:o,objectAttributes:a,authPolicy:u,parameters:d,unique:p}}function Iy(t){let e=`id:${t.substring(3).toUpperCase()}`;return Sy[e]}async function _y(t){let{aaguid:e,attStmt:r,authData:n,credentialPublicKey:o,clientDataHash:i,rootCertificates:a}=t,c=r.get("ver"),u=r.get("sig"),d=r.get("alg"),p=r.get("x5c"),h=r.get("pubArea"),g=r.get("certInfo");if(c!=="2.0")throw new Error(`Unexpected ver "${c}", expected "2.0" (TPM)`);if(!u)throw new Error("No attestation signature provided in attestation statement (TPM)");if(!d)throw new Error("Attestation statement did not contain alg (TPM)");if(!Et(d))throw new Error(`Attestation statement contained invalid alg ${d} (TPM)`);if(!p)throw new Error("No attestation certificate provided in attestation statement (TPM)");if(!h)throw new Error("Attestation statement did not contain pubArea (TPM)");if(!g)throw new Error("Attestation statement did not contain certInfo (TPM)");let w=Ty(h),{unique:k,type:M,parameters:I}=w,D=sr(o);if(M==="TPM_ALG_RSA"){if(!ei(D))throw new Error(`Credential public key with kty ${D.get(q.kty)} did not match ${M}`);let re=D.get(q.n),mt=D.get(q.e);if(!re)throw new Error("COSE public key missing n (TPM|RSA)");if(!mt)throw new Error("COSE public key missing e (TPM|RSA)");if(!F.areEqual(k,re))throw new Error("PubArea unique is not same as credentialPublicKey (TPM|RSA)");if(!I.rsa)throw new Error("Parsed pubArea type is RSA, but missing parameters.rsa (TPM|RSA)");let rn=mt,nn=I.rsa.exponent||65537,Wn=rn[0]+(rn[1]<<8)+(rn[2]<<16);if(nn!==Wn)throw new Error(`Unexpected public key exp ${Wn}, expected ${nn} (TPM|RSA)`)}else if(M==="TPM_ALG_ECC"){if(!on(D))throw new Error(`Credential public key with kty ${D.get(q.kty)} did not match ${M}`);let re=D.get(q.crv),mt=D.get(q.x),rn=D.get(q.y);if(!re)throw new Error("COSE public key missing crv (TPM|ECC)");if(!mt)throw new Error("COSE public key missing x (TPM|ECC)");if(!rn)throw new Error("COSE public key missing y (TPM|ECC)");if(!F.areEqual(k,F.concat([mt,rn])))throw new Error("PubArea unique is not same as public key x and y (TPM|ECC)");if(!I.ecc)throw new Error("Parsed pubArea type is ECC, but missing parameters.ecc (TPM|ECC)");let nn=I.ecc.curveID,Wn=ky[nn];if(Wn!==re)throw new Error(`Public area key curve ID "${nn}" mapped to "${Wn}" which did not match public key crv of "${re}" (TPM|ECC)`)}else throw new Error(`Unsupported pubArea.type "${M}"`);let Z=Cy(g),{magic:fe,type:se,attested:te,extraData:$}=Z;if(fe!==4283712327)throw new Error(`Unexpected magic value "${fe}", expected "0xff544347" (TPM)`);if(se!=="TPM_ST_ATTEST_CERTIFY")throw new Error(`Unexpected type "${se}", expected "TPM_ST_ATTEST_CERTIFY" (TPM)`);let v=await bt(h,Ax(te.nameAlg)),S=F.concat([te.nameAlgBuffer,v]);if(!F.areEqual(te.name,S))throw new Error("Attested name comparison failed (TPM)");let A=F.concat([n,i]),O=await bt(A,d);if(!F.areEqual($,O))throw new Error("CertInfo extra data did not equal hashed attestation (TPM)");if(p.length<1)throw new Error("No certificates present in x5c array (TPM)");let G=mi(p[0]),{basicConstraintsCA:P,version:C,subject:ce,notAfter:me,notBefore:ye}=G;if(P)throw new Error("Certificate basic constraints CA was not `false` (TPM)");if(C!==2)throw new Error("Certificate version was not `3` (ASN.1 value of 2) (TPM)");if(ce.combined.length>0)throw new Error("Certificate subject was not empty (TPM)");let Xe=new Date;if(ye>Xe)throw new Error(`Certificate not good before "${ye.toString()}" (TPM)`);if(Xe=new Date,me<Xe)throw new Error(`Certificate not good after "${me.toString()}" (TPM)`);let ot=xe.parse(p[0],ke);if(!ot.tbsCertificate.extensions)throw new Error("Certificate was missing extensions (TPM)");let Ht,tr;if(ot.tbsCertificate.extensions.forEach(re=>{re.extnID===hi?Ht=xe.parse(re.extnValue,fi):re.extnID===li&&(tr=xe.parse(re.extnValue,go))}),!Ht)throw new Error("Certificate did not contain subjectAltName extension (TPM)");if(!Ht[0].directoryName?.[0].length)throw new Error("Certificate subjectAltName extension directoryName was empty (TPM)");let{tcgAtTpmManufacturer:Ae,tcgAtTpmModel:X,tcgAtTpmVersion:rr}=vx(Ht[0].directoryName);if(!Ae||!X||!rr)throw new Error("Certificate contained incomplete subjectAltName data (TPM)");if(!tr)throw new Error("Certificate did not contain ExtendedKeyUsage extension (TPM)");if(!Iy(Ae))throw new Error(`Could not match TPM manufacturer "${Ae}" (TPM)`);if(tr[0]!=="2.23.133.8.3")throw new Error(`Unexpected extKeyUsage "${tr[0]}", expected "2.23.133.8.3" (TPM)`);try{await Ml(ot.tbsCertificate.extensions,e)}catch(re){let mt=re;throw new Error(`${mt.message} (TPM)`)}let Jo=await $n.getStatement(e);if(Jo)try{await Vn({statement:Jo,credentialPublicKey:o,x5c:p,attestationStatementAlg:d})}catch(re){let mt=re;throw new Error(`${mt.message} (TPM)`)}else try{await qe(p.map(Pe),a)}catch(re){let mt=re;throw new Error(`${mt.message} (TPM)`)}return wt({signature:u,data:g,x509Certificate:p[0],hashAlgorithm:d})}function vx(t){let e="2.23.133.2.1",r="2.23.133.2.2",n="2.23.133.2.3",o,i,a;return t.forEach(c=>{c.forEach(u=>{u.type===e?o=u.value.toString():u.type===r?i=u.value.toString():u.type===n&&(a=u.value.toString())})}),{tcgAtTpmManufacturer:o,tcgAtTpmModel:i,tcgAtTpmVersion:a}}function Ax(t){if(t==="TPM_ALG_SHA256")return U.ES256;if(t==="TPM_ALG_SHA384")return U.ES384;if(t==="TPM_ALG_SHA512")return U.ES512;throw new Error(`Unexpected TPM attested name alg ${t}`)}var Sp,By="1.3.6.1.4.1.11129.2.1.17",kp;(function(t){t[t.verified=0]="verified",t[t.selfSigned=1]="selfSigned",t[t.unverified=2]="unverified",t[t.failed=3]="failed"})(kp||(kp={}));var Yo=class{verifiedBootKey=new R;deviceLocked=!1;verifiedBootState=kp.verified;verifiedBootHash;constructor(e={}){Object.assign(this,e)}};s([l({type:R})],Yo.prototype,"verifiedBootKey",void 0);s([l({type:f.Boolean})],Yo.prototype,"deviceLocked",void 0);s([l({type:f.Enumerated})],Yo.prototype,"verifiedBootState",void 0);s([l({type:R,optional:!0})],Yo.prototype,"verifiedBootHash",void 0);var Xi=Sp=class extends j{constructor(e){super(e),Object.setPrototypeOf(this,Sp.prototype)}};Xi=Sp=s([b({type:m.Set,itemType:f.Integer})],Xi);var Y=class{purpose;algorithm;keySize;digest;padding;ecCurve;rsaPublicExponent;mgfDigest;rollbackResistance;earlyBootOnly;activeDateTime;originationExpireDateTime;usageExpireDateTime;usageCountLimit;noAuthRequired;userAuthType;authTimeout;allowWhileOnBody;trustedUserPresenceRequired;trustedConfirmationRequired;unlockedDeviceRequired;allApplications;applicationId;creationDateTime;origin;rollbackResistant;rootOfTrust;osVersion;osPatchLevel;attestationApplicationId;attestationIdBrand;attestationIdDevice;attestationIdProduct;attestationIdSerial;attestationIdImei;attestationIdMeid;attestationIdManufacturer;attestationIdModel;vendorPatchLevel;bootPatchLevel;deviceUniqueAttestation;attestationIdSecondImei;moduleHash;constructor(e={}){Object.assign(this,e)}};s([l({context:1,type:Xi,optional:!0})],Y.prototype,"purpose",void 0);s([l({context:2,type:f.Integer,optional:!0})],Y.prototype,"algorithm",void 0);s([l({context:3,type:f.Integer,optional:!0})],Y.prototype,"keySize",void 0);s([l({context:5,type:Xi,optional:!0})],Y.prototype,"digest",void 0);s([l({context:6,type:Xi,optional:!0})],Y.prototype,"padding",void 0);s([l({context:10,type:f.Integer,optional:!0})],Y.prototype,"ecCurve",void 0);s([l({context:200,type:f.Integer,optional:!0})],Y.prototype,"rsaPublicExponent",void 0);s([l({context:203,type:Xi,optional:!0})],Y.prototype,"mgfDigest",void 0);s([l({context:303,type:f.Null,optional:!0})],Y.prototype,"rollbackResistance",void 0);s([l({context:305,type:f.Null,optional:!0})],Y.prototype,"earlyBootOnly",void 0);s([l({context:400,type:f.Integer,optional:!0})],Y.prototype,"activeDateTime",void 0);s([l({context:401,type:f.Integer,optional:!0})],Y.prototype,"originationExpireDateTime",void 0);s([l({context:402,type:f.Integer,optional:!0})],Y.prototype,"usageExpireDateTime",void 0);s([l({context:405,type:f.Integer,optional:!0})],Y.prototype,"usageCountLimit",void 0);s([l({context:503,type:f.Null,optional:!0})],Y.prototype,"noAuthRequired",void 0);s([l({context:504,type:f.Integer,optional:!0})],Y.prototype,"userAuthType",void 0);s([l({context:505,type:f.Integer,optional:!0})],Y.prototype,"authTimeout",void 0);s([l({context:506,type:f.Null,optional:!0})],Y.prototype,"allowWhileOnBody",void 0);s([l({context:507,type:f.Null,optional:!0})],Y.prototype,"trustedUserPresenceRequired",void 0);s([l({context:508,type:f.Null,optional:!0})],Y.prototype,"trustedConfirmationRequired",void 0);s([l({context:509,type:f.Null,optional:!0})],Y.prototype,"unlockedDeviceRequired",void 0);s([l({context:600,type:f.Null,optional:!0})],Y.prototype,"allApplications",void 0);s([l({context:601,type:R,optional:!0})],Y.prototype,"applicationId",void 0);s([l({context:701,type:f.Integer,optional:!0})],Y.prototype,"creationDateTime",void 0);s([l({context:702,type:f.Integer,optional:!0})],Y.prototype,"origin",void 0);s([l({context:703,type:f.Null,optional:!0})],Y.prototype,"rollbackResistant",void 0);s([l({context:704,type:Yo,optional:!0})],Y.prototype,"rootOfTrust",void 0);s([l({context:705,type:f.Integer,optional:!0})],Y.prototype,"osVersion",void 0);s([l({context:706,type:f.Integer,optional:!0})],Y.prototype,"osPatchLevel",void 0);s([l({context:709,type:R,optional:!0})],Y.prototype,"attestationApplicationId",void 0);s([l({context:710,type:R,optional:!0})],Y.prototype,"attestationIdBrand",void 0);s([l({context:711,type:R,optional:!0})],Y.prototype,"attestationIdDevice",void 0);s([l({context:712,type:R,optional:!0})],Y.prototype,"attestationIdProduct",void 0);s([l({context:713,type:R,optional:!0})],Y.prototype,"attestationIdSerial",void 0);s([l({context:714,type:R,optional:!0})],Y.prototype,"attestationIdImei",void 0);s([l({context:715,type:R,optional:!0})],Y.prototype,"attestationIdMeid",void 0);s([l({context:716,type:R,optional:!0})],Y.prototype,"attestationIdManufacturer",void 0);s([l({context:717,type:R,optional:!0})],Y.prototype,"attestationIdModel",void 0);s([l({context:718,type:f.Integer,optional:!0})],Y.prototype,"vendorPatchLevel",void 0);s([l({context:719,type:f.Integer,optional:!0})],Y.prototype,"bootPatchLevel",void 0);s([l({context:720,type:f.Null,optional:!0})],Y.prototype,"deviceUniqueAttestation",void 0);s([l({context:723,type:R,optional:!0})],Y.prototype,"attestationIdSecondImei",void 0);s([l({context:724,type:R,optional:!0})],Y.prototype,"moduleHash",void 0);var en;(function(t){t[t.software=0]="software",t[t.trustedEnvironment=1]="trustedEnvironment",t[t.strongBox=2]="strongBox"})(en||(en={}));var Yi;(function(t){t[t.KM2=1]="KM2",t[t.KM3=2]="KM3",t[t.KM4=3]="KM4",t[t.KM4_1=4]="KM4_1",t[t.keyMint1=100]="keyMint1",t[t.keyMint2=200]="keyMint2",t[t.keyMint3=300]="keyMint3",t[t.keyMint4=400]="keyMint4"})(Yi||(Yi={}));var At=class{attestationVersion=Yi.KM4;attestationSecurityLevel=en.software;keymasterVersion=0;keymasterSecurityLevel=en.software;attestationChallenge=new R;uniqueId=new R;softwareEnforced=new Y;teeEnforced=new Y;constructor(e={}){Object.assign(this,e)}};s([l({type:f.Integer})],At.prototype,"attestationVersion",void 0);s([l({type:f.Enumerated})],At.prototype,"attestationSecurityLevel",void 0);s([l({type:f.Integer})],At.prototype,"keymasterVersion",void 0);s([l({type:f.Enumerated})],At.prototype,"keymasterSecurityLevel",void 0);s([l({type:R})],At.prototype,"attestationChallenge",void 0);s([l({type:R})],At.prototype,"uniqueId",void 0);s([l({type:Y})],At.prototype,"softwareEnforced",void 0);s([l({type:Y})],At.prototype,"teeEnforced",void 0);var Ir=class t{attestationVersion=Yi.keyMint4;attestationSecurityLevel=en.software;keyMintVersion=0;keyMintSecurityLevel=en.software;attestationChallenge=new R;uniqueId=new R;softwareEnforced=new Y;hardwareEnforced=new Y;constructor(e={}){Object.assign(this,e)}toLegacyKeyDescription(){return new At({attestationVersion:this.attestationVersion,attestationSecurityLevel:this.attestationSecurityLevel,keymasterVersion:this.keyMintVersion,keymasterSecurityLevel:this.keyMintSecurityLevel,attestationChallenge:this.attestationChallenge,uniqueId:this.uniqueId,softwareEnforced:this.softwareEnforced,teeEnforced:this.hardwareEnforced})}static fromLegacyKeyDescription(e){return new t({attestationVersion:e.attestationVersion,attestationSecurityLevel:e.attestationSecurityLevel,keyMintVersion:e.keymasterVersion,keyMintSecurityLevel:e.keymasterSecurityLevel,attestationChallenge:e.attestationChallenge,uniqueId:e.uniqueId,softwareEnforced:e.softwareEnforced,hardwareEnforced:e.teeEnforced})}};s([l({type:f.Integer})],Ir.prototype,"attestationVersion",void 0);s([l({type:f.Enumerated})],Ir.prototype,"attestationSecurityLevel",void 0);s([l({type:f.Integer})],Ir.prototype,"keyMintVersion",void 0);s([l({type:f.Enumerated})],Ir.prototype,"keyMintSecurityLevel",void 0);s([l({type:R})],Ir.prototype,"attestationChallenge",void 0);s([l({type:R})],Ir.prototype,"uniqueId",void 0);s([l({type:Y})],Ir.prototype,"softwareEnforced",void 0);s([l({type:Y})],Ir.prototype,"hardwareEnforced",void 0);var Cp,Tp=class extends Y{};Tp=s([b({type:m.Choice})],Tp);var Ji=Cp=class extends j{constructor(e){super(e),Object.setPrototypeOf(this,Cp.prototype)}findProperty(e){let r=this.find(n=>n[e]!==void 0);if(r)return r[e]}};Ji=Cp=s([b({type:m.Sequence,itemType:Tp})],Ji);var er=class{attestationVersion=Yi.KM4;attestationSecurityLevel=en.software;keymasterVersion=0;keymasterSecurityLevel=en.software;attestationChallenge=new R;uniqueId=new R;softwareEnforced=new Ji;teeEnforced=new Ji;get keyMintVersion(){return this.keymasterVersion}set keyMintVersion(e){this.keymasterVersion=e}get keyMintSecurityLevel(){return this.keymasterSecurityLevel}set keyMintSecurityLevel(e){this.keymasterSecurityLevel=e}get hardwareEnforced(){return this.teeEnforced}set hardwareEnforced(e){this.teeEnforced=e}constructor(e={}){Object.assign(this,e)}};s([l({type:f.Integer})],er.prototype,"attestationVersion",void 0);s([l({type:f.Enumerated})],er.prototype,"attestationSecurityLevel",void 0);s([l({type:f.Integer})],er.prototype,"keymasterVersion",void 0);s([l({type:f.Enumerated})],er.prototype,"keymasterSecurityLevel",void 0);s([l({type:R})],er.prototype,"attestationChallenge",void 0);s([l({type:R})],er.prototype,"uniqueId",void 0);s([l({type:Ji})],er.prototype,"softwareEnforced",void 0);s([l({type:Ji})],er.prototype,"teeEnforced",void 0);var Ry=class extends er{constructor(e={}){"keymasterVersion"in e&&!("keyMintVersion"in e)&&(e.keyMintVersion=e.keymasterVersion),"keymasterSecurityLevel"in e&&!("keyMintSecurityLevel"in e)&&(e.keyMintSecurityLevel=e.keymasterSecurityLevel),"teeEnforced"in e&&!("hardwareEnforced"in e)&&(e.hardwareEnforced=e.teeEnforced),super(e)}};Ry=s([b({type:m.Sequence})],Ry);var Ka=class{packageName;version;constructor(e={}){Object.assign(this,e)}};s([l({type:f.OctetString})],Ka.prototype,"packageName",void 0);s([l({type:f.Integer})],Ka.prototype,"version",void 0);var Nl=class{packageInfos;signatureDigests;constructor(e={}){Object.assign(this,e)}};s([l({type:Ka,repeated:"set"})],Nl.prototype,"packageInfos",void 0);s([l({type:f.OctetString,repeated:"set"})],Nl.prototype,"signatureDigests",void 0);async function My(t){let{authData:e,clientDataHash:r,attStmt:n,credentialPublicKey:o,aaguid:i,rootCertificates:a}=t,c=n.get("x5c"),u=n.get("sig"),d=n.get("alg");if(!c)throw new Error("No attestation certificate provided in attestation statement (Android Key)");if(!u)throw new Error("No attestation signature provided in attestation statement (Android Key)");if(!d)throw new Error("Attestation statement did not contain alg (Android Key)");if(!Et(d))throw new Error(`Attestation statement contained invalid alg ${d} (Android Key)`);let p=xe.parse(c[0],ke),h=new Uint8Array(p.tbsCertificate.subjectPublicKeyInfo.subjectPublicKey),g=ti(o);if(!F.areEqual(g,h))throw new Error("Credential public key does not equal leaf cert public key (Android Key)");let w=p.tbsCertificate.extensions?.find(se=>se.extnID===By);if(!w)throw new Error("Certificate did not contain extKeyStore (Android Key)");let k=xe.parse(w.extnValue,At),{attestationChallenge:M,teeEnforced:I,softwareEnforced:D}=k;if(!F.areEqual(new Uint8Array(M.buffer),r))throw new Error("Attestation challenge was not equal to client data hash (Android Key)");if(I.allApplications!==void 0)throw new Error('teeEnforced contained "allApplications [600]" tag (Android Key)');if(D.allApplications!==void 0)throw new Error('teeEnforced contained "allApplications [600]" tag (Android Key)');let Z=await $n.getStatement(i);if(Z)try{await Vn({statement:Z,credentialPublicKey:o,x5c:c,attestationStatementAlg:d})}catch(se){let te=se;throw new Error(`${te.message} (Android Key)`,{cause:te})}else{let se=c.slice(0,-1).map(Pe),te=c.slice(-1).map(Pe);try{await qe(se,te)}catch($){let v=$;throw new Error(`${v.message} (Android Key)`,{cause:v})}if(a.length>0&&a.indexOf(te[0])<0)throw new Error("x5c root certificate was not a known root certificate (Android Key)")}let fe=F.concat([e,r]);return wt({signature:u,data:fe,x509Certificate:c[0],hashAlgorithm:d})}async function Py(t){let{attStmt:e,authData:r,clientDataHash:n,credentialPublicKey:o,rootCertificates:i}=t,a=e.get("x5c");if(!a)throw new Error("No attestation certificate provided in attestation statement (Apple)");try{await qe(a.map(Pe),i)}catch(I){let D=I;throw new Error(`${D.message} (Apple)`)}let c=xe.parse(a[0],ke),{extensions:u,subjectPublicKeyInfo:d}=c.tbsCertificate;if(!u)throw new Error("credCert missing extensions (Apple)");let p=u.find(I=>I.extnID==="1.2.840.113635.100.8.2");if(!p)throw new Error('credCert missing "1.2.840.113635.100.8.2" extension (Apple)');let h=F.concat([r,n]),g=await bt(h),w=new Uint8Array(p.extnValue.buffer).slice(6);if(!F.areEqual(g,w))throw new Error("credCert nonce was not expected value (Apple)");let k=ti(o),M=new Uint8Array(d.subjectPublicKey);if(!F.areEqual(k,M))throw new Error("Credential public key does not equal credCert public key (Apple)");return!0}async function Ny(t){let{response:e,expectedChallenge:r,expectedOrigin:n,expectedRPID:o,expectedType:i,requireUserPresence:a=!0,requireUserVerification:c=!0,supportedAlgorithmIDs:u=xp(),attestationSafetyNetEnforceCTSCheck:d=!0}=t,{id:p,rawId:h,type:g,response:w}=e;if(!p)throw new Error("Missing credential ID");if(p!==h)throw new Error("Credential ID was not base64url-encoded");if(g!=="public-key")throw new Error(`Unexpected credential type ${g}, expected "public-key"`);let k=Qa(w.clientDataJSON),{type:M,origin:I,challenge:D,tokenBinding:Z}=k;if(Array.isArray(i)){if(!i.includes(M)){let re=i.join(", ");throw new Error(`Unexpected registration response type "${M}", expected one of: ${re}`)}}else if(i){if(M!==i)throw new Error(`Unexpected registration response type "${M}", expected "${i}"`)}else if(M!=="webauthn.create")throw new Error(`Unexpected registration response type: ${M}`);if(typeof r=="function"){if(!await r(D))throw new Error(`Custom challenge verifier returned false for registration response challenge "${D}"`)}else if(D!==r)throw new Error(`Unexpected registration response challenge "${D}", expected "${r}"`);if(Array.isArray(n)){if(!n.includes(I))throw new Error(`Unexpected registration response origin "${I}", expected one of: ${n.join(", ")}`)}else if(I!==n)throw new Error(`Unexpected registration response origin "${I}", expected "${n}"`);if(Z){if(typeof Z!="object")throw new Error(`Unexpected value for TokenBinding "${Z}"`);if(["present","supported","not-supported"].indexOf(Z.status)<0)throw new Error(`Unexpected tokenBinding.status value of "${Z.status}"`)}let fe=ee.toBuffer(w.attestationObject),se=ef(fe),te=se.get("fmt"),$=se.get("authData"),v=se.get("attStmt"),S=Cl($),{aaguid:A,rpIdHash:O,flags:G,credentialID:P,counter:C,credentialPublicKey:ce,extensionsData:me}=S,ye;if(o){let re=[];typeof o=="string"?re=[o]:re=o,ye=await Rl(O,re)}if(a&&!G.up)throw new Error("User presence was required, but user was not present");if(c&&!G.uv)throw new Error("User verification was required, but user could not be verified");if(!P)throw new Error("No credential ID was provided by authenticator");if(!ce)throw new Error("No public key was provided by authenticator");if(!A)throw new Error("No AAGUID was present during registration");let ot=sr(ce).get(q.alg);if(typeof ot!="number")throw new Error("Credential public key was missing numeric alg");if(!u.includes(ot)){let re=u.join(", ");throw new Error(`Unexpected public key alg "${ot}", expected one of "${re}"`)}if(Ya(ot)&&!xt.runtimeSupportsPQC())throw new Un(ot);let Ht=await bt(ee.toBuffer(w.clientDataJSON)),tr=xt.getRootCertificates({identifier:te}),Ae={aaguid:A,attStmt:v,authData:$,clientDataHash:Ht,credentialID:P,credentialPublicKey:ce,rootCertificates:tr,rpIdHash:O,attestationSafetyNetEnforceCTSCheck:d},X=!1;if(te==="fido-u2f")X=await my(Ae);else if(te==="packed")X=await xy(Ae);else if(te==="android-safetynet")X=await vy(Ae);else if(te==="android-key")X=await My(Ae);else if(te==="tpm")X=await _y(Ae);else if(te==="apple")X=await Py(Ae);else if(te==="none"){if(v.size>0)throw new Error("None attestation had unexpected attestation statement");X=!0}else throw new Error(`Unsupported Attestation Format: ${te}`);if(!X)return{verified:!1};let{credentialDeviceType:rr,credentialBackedUp:Jo}=Bl(G);return{verified:!0,registrationInfo:{fmt:te,aaguid:Ja(A),credentialType:g,credential:{id:ee.fromBuffer(P),publicKey:ce,counter:C,transports:e.response.transports},attestationObject:fe,userVerified:G.uv,credentialDeviceType:rr,credentialBackedUp:Jo,origin:k.origin,rpID:ye,authenticatorExtensionResults:me}}}async function Oy(t){let{allowCredentials:e,challenge:r=await Za(),timeout:n=6e4,userVerification:o="preferred",extensions:i,rpID:a}=t,c=r;return typeof c=="string"&&(c=F.fromUTF8String(c)),{rpId:a,challenge:ee.fromBuffer(c),allowCredentials:e?.map(u=>{if(!ee.isBase64URL(u.id))throw new Error(`allowCredential id "${u.id}" is not a valid base64url string`);return{...u,id:ee.trimPadding(u.id),type:"public-key"}}),timeout:n,userVerification:o,extensions:i}}async function Dy(t){let{response:e,expectedChallenge:r,expectedOrigin:n,expectedRPID:o,expectedType:i,expectedTopOrigin:a,credential:c,requireUserVerification:u=!0,advancedFIDOConfig:d}=t,{id:p,rawId:h,type:g,response:w}=e;if(!p)throw new Error("Missing credential ID");if(p!==h)throw new Error("Credential ID was not base64url-encoded");if(g!=="public-key")throw new Error(`Unexpected credential type ${g}, expected "public-key"`);if(!e)throw new Error("Credential missing response");if(typeof w?.clientDataJSON!="string")throw new Error("Credential response clientDataJSON was not a string");let k=Qa(w.clientDataJSON),{type:M,origin:I,challenge:D,tokenBinding:Z,crossOrigin:fe,topOrigin:se}=k;if(Array.isArray(i)){if(!i.includes(M)){let Ae=i.join(", ");throw new Error(`Unexpected authentication response type "${M}", expected one of: ${Ae}`)}}else if(i){if(M!==i)throw new Error(`Unexpected authentication response type "${M}", expected "${i}"`)}else if(M!=="webauthn.get")throw new Error(`Unexpected authentication response type: ${M}`);if(typeof r=="function"){if(!await r(D))throw new Error(`Custom challenge verifier returned false for registration response challenge "${D}"`)}else if(D!==r)throw new Error(`Unexpected authentication response challenge "${D}", expected "${r}"`);if(fe){if(se){if(!a)throw new Error(`Detected cross-origin authentication response from top origin of "${se}", but a value for \`expectedTopOrigin\` was not specified when calling \`verifyAuthenticationResponse()\``);if(Array.isArray(a)){if(!a.includes(se)){let Ae=a.join(", ");throw new Error(`Unexpected cross-origin authentication response top origin of "${se}", expected one of: ${Ae}`)}}else if(se!==a)throw new Error(`Unexpected cross-origin authentication response top origin of "${se}", expected: ${a}`)}}else if(se)throw new Error(`Unexpected top origin of "${se}" within a non-cross-origin authentication response. This error should be reported to the browser vendor as a WebAuthn specification violation with a link to https://w3c.github.io/webauthn/#dom-collectedclientdata-toporigin`);if(Array.isArray(n)){if(!n.includes(I)){let Ae=n.join(", ");throw new Error(`Unexpected authentication response origin "${I}", expected one of: ${Ae}`)}}else if(I!==n)throw new Error(`Unexpected authentication response origin "${I}", expected "${n}"`);if(!ee.isBase64URL(w.authenticatorData))throw new Error("Credential response authenticatorData was not a base64url string");if(!ee.isBase64URL(w.signature))throw new Error("Credential response signature was not a base64url string");if(w.userHandle&&typeof w.userHandle!="string")throw new Error("Credential response userHandle was not a string");if(Z){if(typeof Z!="object")throw new Error("ClientDataJSON tokenBinding was not an object");if(["present","supported","notSupported"].indexOf(Z.status)<0)throw new Error(`Unexpected tokenBinding status ${Z.status}`)}let te=ee.toBuffer(w.authenticatorData),$=Cl(te),{rpIdHash:v,flags:S,counter:A,extensionsData:O}=$,G=[];typeof o=="string"?G=[o]:G=o;let P=await Rl(v,G);if(d!==void 0){let{userVerification:Ae}=d;if(Ae==="required"&&!S.uv)throw new Error("User verification required, but user could not be verified")}else{if(!S.up)throw new Error("User not present during authentication");if(u&&!S.uv)throw new Error("User verification required, but user could not be verified")}let C=await bt(ee.toBuffer(w.clientDataJSON)),ce=F.concat([te,C]),me=ee.toBuffer(w.signature);if((A>0||c.counter>0)&&A<=c.counter)throw new Error(`Response counter value ${A} was lower than expected ${c.counter}`);let Xe=sr(c.publicKey).get(q.alg);if(typeof Xe!="number")throw new Error("Credential public key was missing numeric alg");if(Ya(Xe)&&!xt.runtimeSupportsPQC())throw new Un(Xe);let{credentialDeviceType:ot,credentialBackedUp:Ht}=Bl(S);return{verified:await wt({signature:me,data:ce,credentialPublicKey:c.publicKey}),authenticationInfo:{newCounter:A,credentialID:c.id,userVerified:S.uv,credentialDeviceType:ot,credentialBackedUp:Ht,authenticatorExtensionResults:O,origin:k.origin,rpID:P}}}var tn=globalThis.CasinoEngine,Ex=globalThis.CasinoBlackjack,Ll="https://roulette-club-777-oct15.lonivxy.chatgpt.site",Ol=new URL(Ll).hostname,Dl="__Host-club-admin",Ly="__Host-club-challenge",jy=15*6e4,Kn=(t,e=200,r={})=>Response.json(t,{status:e,headers:{"Cache-Control":"no-store","X-Content-Type-Options":"nosniff",...r}}),oe=(t,e=400)=>{throw Object.assign(new Error(t),{status:e})},Rp=t=>btoa(String.fromCharCode(...t)).replaceAll("+","-").replaceAll("/","_").replaceAll("=",""),Sx=t=>Uint8Array.from(atob(t.replaceAll("-","+").replaceAll("_","/")),e=>e.charCodeAt(0)),Hy=()=>Rp(crypto.getRandomValues(new Uint8Array(32))),Qi=async t=>Rp(new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(t)))),Ip=(t,e,r)=>`${t}=${e}; Path=/; Max-Age=${r}; Secure; HttpOnly; SameSite=Strict`;function _p(t,e){return t.headers.get("cookie")?.split(";").map(r=>r.trim()).find(r=>r.startsWith(e+"="))?.slice(e.length+1)||""}function Wa(t){return t.headers.get("oai-authenticated-user-id")||oe("\u8BF7\u5148\u4F7F\u7528\u672C\u7AD9\u6240\u5C5E\u8D26\u53F7\u767B\u5F55\u3002",401)}function Bp(t){let e=new tn({getItem:()=>t,setItem(){}},void 0,()=>Date.now(),{recoverRoulette:!1});return e.storageWarning&&oe("\u670D\u52A1\u5668\u8D26\u6237\u6570\u636E\u6821\u9A8C\u5931\u8D25\u3002",500),e}function Uy(t){let e=0,r=-1;for(let n=0;n<24;n++){let o=Mp(t,n);o>r&&(r=o,e=n)}return e}function Mp(t,e){return(t.numbers[e]||0)*24+(e===0?t.GREEN*24:e%2?(t.RED+t.ODD)*2:(t.BLACK+t.EVEN)*2)}function kx(t,[e,r]){t.ensureIdle();let n=t.active,o=t.amount(r);o>n.balance&&oe("\u94B1\u5305\u4F59\u989D\u4E0D\u8DB3\u3002"),typeof e=="number"&&Number.isInteger(e)&&e>=0&&e<24?n.bets.numbers[e]=(n.bets.numbers[e]||0)+o:["RED","BLACK","GREEN","ODD","EVEN"].includes(e)?n.bets[e]+=o:oe("\u65E0\u6548\u7684\u8F6E\u76D8\u4E0B\u6CE8\u3002"),n.balance-=o}function Cx(t,e){t.ensureIdle();let r=t.active,n=tn.sumBets(r.bets);n||oe("\u8BF7\u5148\u653E\u7F6E\u7B79\u7801\u3002");let o=structuredClone(r.bets),i=e?Uy(o):Math.floor(t.random()*24),a=Mp(o,i);r.balance+a>1e9&&oe("\u94B1\u5305\u5DF2\u63A5\u8FD1\u4E0A\u9650\u3002"),r.balance+=a,r.lastBets=o,r.bets=tn.emptyBets();let c={roundId:crypto.randomUUID(),number:i,index:i,wager:n,payout:a,bets:o,rigged:!!e};return r.lastRoulette=c,r.history.unshift({num:i,colorTag:i===0?"GREEN":i%2?"RED":"BLACK"}),r.history=r.history.slice(0,10),t.record(`${r.name} \xB7 Roulette ${i}: wager ${n.toLocaleString()}, payout ${a.toLocaleString()}.`),c}async function Tx(t,e,r,n){(!Array.isArray(r)||r.length>5)&&oe("\u65E0\u6548\u7684\u64CD\u4F5C\u53C2\u6570\u3002");let o=new Ex(t),i={gift:"transfer",offerLoan:"offerLoan",respondLoan:"respondLoan",cancelLoan:"cancelLoan",repayLoan:"repayLoan",borrow:"borrow",repay:"repay",borrowShark:"borrowShark",repayShark:"repayShark",buyCard:"buyCard",armCard:"armCard"};if(Object.hasOwn(i,e))return t[i[e]](...r);if(["addUser","deletePlayer","adminAdjust","import"].includes(e)&&!n&&oe("\u8BF7\u5148\u901A\u8FC7 Windows Hello \u7BA1\u7406\u9A8C\u8BC1\u3002",403),["addUser","deletePlayer","adminAdjust"].includes(e))return t[e](...r);if(e==="slots")return r[1]&&typeof r[1]!="object"&&oe("\u65E0\u6548\u7684\u4E0B\u6CE8\u9009\u9879\u3002"),t.spinSlots(r[0],null,{allIn:!!r[1]?.allIn,jackpot:!!r[1]?.jackpot});if(e==="blackjack"){let[a,c]=r;return["start","hit","stand","double","split","dealerStep","forceJackpot"].includes(a)||oe("\u65E0\u6548\u7684\u4E8C\u5341\u4E00\u70B9\u64CD\u4F5C\u3002"),o[a](c)}if(e==="roulette.bet")return kx(t,r),null;if(e==="roulette.clear")return t.ensureIdle(),t.active.balance+=tn.sumBets(t.active.bets),t.active.bets=tn.emptyBets(),null;if(e==="roulette.rebet"){t.ensureIdle();let a=t.active;a.lastBets||oe("\u6CA1\u6709\u4E0A\u4E00\u8F6E\u4E0B\u6CE8\u3002");let c=tn.sumBets(a.lastBets),u=a.balance+tn.sumBets(a.bets);return c>u&&oe("\u4F59\u989D\u4E0D\u8DB3\u4EE5\u91CD\u590D\u4E0B\u6CE8\u3002"),a.balance=u-c,a.bets=structuredClone(a.lastBets),null}if(e==="roulette.spin")return Cx(t,!!r[0]);if(e==="roulette.rig"){t.ensureIdle();let a=t.active,c=a.lastRoulette;(!c||c.roundId!==r[0])&&oe("\u8FD9\u8F6E\u8F6E\u76D8\u5DF2\u7ECF\u7ED3\u675F\u3002");let u=Uy(c.bets),d=Mp(c.bets,u),p=d-c.payout;return a.balance+p>1e9&&oe("\u94B1\u5305\u5DF2\u63A5\u8FD1\u4E0A\u9650\u3002"),a.balance+=p,c.number=c.index=u,c.payout=d,c.rigged=!0,a.history[0]&&(a.history[0]={num:u,colorTag:u===0?"GREEN":u%2?"RED":"BLACK"}),p&&t.record(`${a.name} \xB7 Roulette jackpot adjustment +${p.toLocaleString()}.`),c}oe("\u672A\u77E5\u64CD\u4F5C\u3002",404)}function Gy({page:t="",webauthn:e={generateRegistrationOptions:hy,verifyRegistrationResponse:Ny,generateAuthenticationOptions:Oy,verifyAuthenticationResponse:Dy}}={}){async function r(d){let p=await d.prepare("SELECT snapshot, revision FROM casino_state WHERE id = ?").bind("club").first();if(!p){let h=Bp(JSON.stringify(new tn(null).data));await d.prepare("INSERT OR IGNORE INTO casino_state (id,snapshot,revision,last_op) VALUES (?,?,0,?)").bind("club",JSON.stringify(h.data),"initial").run(),p=await d.prepare("SELECT snapshot, revision FROM casino_state WHERE id = ?").bind("club").first()}return p}async function n(d,p){let h=_p(d,Dl);if(!h)return!1;let g=await p.prepare("SELECT actor,expires_at FROM admin_sessions WHERE id = ?").bind(await Qi(h)).first();return!!(g&&g.actor===Wa(d)&&g.expires_at>Date.now())}async function o(d,p){let h=await p.prepare("SELECT actor FROM admin_credential WHERE id = ?").bind("owner").first();return{enrolled:!!h,admin:await n(d,p),canEnroll:!h}}async function i(d,p){let h=Hy();return await p.prepare("INSERT INTO admin_sessions (id,actor,expires_at) VALUES (?,?,?)").bind(await Qi(h),Wa(d),Date.now()+jy).run(),Kn({ok:!0},200,{"Set-Cookie":Ip(Dl,h,jy/1e3)})}async function a(d,p,h){let g=Wa(d),w=await n(d,p),{id:k,command:M,args:I=[],playerId:D}=h;(typeof k!="string"||k.length<16||k.length>80||typeof M!="string")&&oe("\u65E0\u6548\u7684\u64CD\u4F5C\u7F16\u53F7\u3002");let Z=await Qi(JSON.stringify({operation:M,args:I,playerId:D}));for(let fe=0;fe<4;fe++){let se=await p.prepare("SELECT actor,payload,response FROM casino_operations WHERE id = ?").bind(k).first();if(se){(se.actor!==g||se.payload!==Z)&&oe("\u64CD\u4F5C\u7F16\u53F7\u5DF2\u88AB\u4F7F\u7528\u3002",409);let C=await c(d,p);return C.data.users.some(ce=>ce.id===D)&&(C.data.activeId=D),Kn({...C,result:JSON.parse(se.response).result})}let te=await r(p),$=Bp(te.snapshot);(typeof D!="string"||!$.data.users.some(C=>C.id===D))&&oe("\u8BF7\u9009\u62E9\u6709\u6548\u73A9\u5BB6\u3002"),$.data.activeId=D;let v=$.data.users.find(C=>C.blackjack&&C.blackjack.phase!=="settled");v&&v.id!==D&&oe("\u8BF7\u5148\u5B8C\u6210 "+v.name+" \u7684\u4E8C\u5341\u4E00\u70B9\u724C\u5C40\u3002",409);let S;if(M==="import"){w||oe("\u9700\u8981\u7BA1\u7406\u9A8C\u8BC1\u3002",403),te.revision!==0&&oe("\u670D\u52A1\u5668\u5DF2\u6709\u65B0\u8BB0\u5F55\uFF0C\u4E0D\u80FD\u8986\u76D6\u5BFC\u5165\u3002",409),(!I[0]||typeof I[0]!="object")&&oe("\u65E7\u5B58\u6863\u65E0\u6548\u3002");let C=JSON.stringify(I[0]),ce=new tn({getItem:()=>C,setItem(){}});ce.storageWarning&&oe("\u65E7\u5B58\u6863\u6821\u9A8C\u5931\u8D25\uFF0C\u5DF2\u4FDD\u7559\u539F\u6587\u4EF6\u3002"),$=ce,$.record("\u7BA1\u7406\u5458\u5BFC\u5165\u4E86\u6B64\u524D\u6D4F\u89C8\u5668\u7684\u73A9\u5BB6\u5B58\u6863\u3002"),S=null}else try{S=await Tx($,M,I,w)}catch(C){if(C.status)throw C;oe(C.message||"\u64CD\u4F5C\u672A\u5B8C\u6210\u3002")}$.save();let A=JSON.stringify($.data),O={data:$.data,revision:te.revision+1,result:S??null,now:Date.now()},G=JSON.stringify({result:O.result,revision:O.revision});if((await p.batch([p.prepare("UPDATE casino_state SET snapshot=?,revision=revision+1,last_op=? WHERE id=? AND revision=?").bind(A,k,"club",te.revision),p.prepare("INSERT INTO casino_operations (id,actor,payload,response,created_at) SELECT ?,?,?,?,? WHERE EXISTS (SELECT 1 FROM casino_state WHERE id=? AND last_op=?)").bind(k,g,Z,G,Date.now(),"club",k)]))[0].meta.changes===1)return Kn(O)}oe("\u5176\u4ED6\u64CD\u4F5C\u6B63\u5728\u66F4\u65B0\u8D26\u6237\uFF0C\u8BF7\u91CD\u8BD5\u3002",409)}async function c(d,p){for(let h=0;h<4;h++){let g=await r(p),w=Bp(g.snapshot),k=JSON.stringify(w.data);if(k!==g.snapshot){if(!(await p.prepare("UPDATE casino_state SET snapshot=?,revision=revision+1 WHERE id=? AND revision=?").bind(k,"club",g.revision).run()).meta.changes)continue;g.revision++}let M=new URL(d.url).searchParams.get("playerId");return M&&w.data.users.some(I=>I.id===M)&&(w.data.activeId=M),{data:w.data,revision:g.revision,now:Date.now(),auth:await o(d,p)}}oe("\u8D26\u6237\u6B63\u5728\u66F4\u65B0\uFF0C\u8BF7\u91CD\u8BD5\u3002",409)}async function u(d,p,h,g){let w=Wa(d),k=await p.prepare("SELECT * FROM admin_credential WHERE id = ?").bind("owner").first();if(h==="/api/admin/status")return Kn(await o(d,p));if(h==="/api/admin/logout")return await p.prepare("DELETE FROM admin_sessions WHERE id = ?").bind(await Qi(_p(d,Dl))).run(),Kn({ok:!0},200,{"Set-Cookie":Ip(Dl,"",0)});let M=h.includes("/register/")?"register":"authenticate";if(M==="register"&&k&&oe("\u7BA1\u7406\u901A\u884C\u5BC6\u94A5\u5DF2\u8BBE\u7F6E\uFF0C\u8BF7\u4F7F\u7528\u5DF2\u6709\u5BC6\u94A5\u767B\u5F55\u3002",403),k&&k.actor!==w&&oe("\u5F53\u524D\u8D26\u53F7\u4E0D\u662F\u6B64\u7AD9\u70B9\u7BA1\u7406\u5458\u3002",403),h.endsWith("/options")){await p.prepare("DELETE FROM admin_challenges WHERE expires_at <= ?").bind(Date.now()).run(),await p.prepare("DELETE FROM admin_sessions WHERE expires_at <= ?").bind(Date.now()).run(),M==="authenticate"&&!k&&oe("\u8BF7\u5148\u8BBE\u7F6E\u7BA1\u7406\u901A\u884C\u5BC6\u94A5\u3002"),(await p.prepare("SELECT COUNT(*) AS count FROM admin_challenges WHERE actor=? AND expires_at>?").bind(w,Date.now()).first()).count>=10&&oe("\u9A8C\u8BC1\u8BF7\u6C42\u8FC7\u4E8E\u9891\u7E41\uFF0C\u8BF7\u4E94\u5206\u949F\u540E\u91CD\u8BD5\u3002",429);let Z=M==="register"?await e.generateRegistrationOptions({rpName:"Roulette Club Admin",rpID:Ol,userName:"Club Administrator",userID:new TextEncoder().encode("club-owner"),attestationType:"none",authenticatorSelection:{authenticatorAttachment:"platform",residentKey:"required",userVerification:"required"},supportedAlgorithmIDs:[-7,-257]}):await e.generateAuthenticationOptions({rpID:Ol,userVerification:"required",allowCredentials:[{id:k.credential_id,transports:JSON.parse(k.transports)}]}),fe=Hy();return await p.prepare("INSERT INTO admin_challenges (id,actor,kind,challenge,expires_at) VALUES (?,?,?,?,?)").bind(await Qi(fe),w,M,Z.challenge,Date.now()+5*6e4).run(),Kn(Z,200,{"Set-Cookie":Ip(Ly,fe,300)})}h.endsWith("/verify")||oe("\u65E0\u6548\u7684\u9A8C\u8BC1\u8DEF\u5F84\u3002",404);let I=await p.prepare("DELETE FROM admin_challenges WHERE id=? AND actor=? AND kind=? AND expires_at>? RETURNING challenge").bind(await Qi(_p(d,Ly)),w,M,Date.now()).first();if(I||oe("\u9A8C\u8BC1\u5DF2\u8FC7\u671F\u6216\u5DF2\u4F7F\u7528\uFF0C\u8BF7\u91CD\u65B0\u5F00\u59CB\u3002",401),M==="register"){let D=await e.verifyRegistrationResponse({response:g,expectedChallenge:I.challenge,expectedOrigin:Ll,expectedRPID:Ol,requireUserVerification:!0,supportedAlgorithmIDs:[-7,-257]});D.verified||oe("\u901A\u884C\u5BC6\u94A5\u9A8C\u8BC1\u5931\u8D25\u3002",401);let Z=D.registrationInfo.credential;await p.prepare("INSERT INTO admin_credential (id,actor,credential_id,public_key,counter,transports) VALUES (?,?,?,?,?,?)").bind("owner",w,Z.id,Rp(Z.publicKey),Z.counter,JSON.stringify(Z.transports||["internal"])).run()}else{k||oe("\u672A\u8BBE\u7F6E\u901A\u884C\u5BC6\u94A5\u3002",401);let D=await e.verifyAuthenticationResponse({response:g,expectedChallenge:I.challenge,expectedOrigin:Ll,expectedRPID:Ol,requireUserVerification:!0,credential:{id:k.credential_id,publicKey:Sx(k.public_key),counter:k.counter,transports:JSON.parse(k.transports)}});D.verified||oe("\u901A\u884C\u5BC6\u94A5\u9A8C\u8BC1\u5931\u8D25\u3002",401),(await p.prepare("UPDATE admin_credential SET counter=? WHERE id=? AND counter=?").bind(D.authenticationInfo.newCounter,"owner",k.counter).run()).meta.changes||oe("\u9A8C\u8BC1\u8BA1\u6570\u5DF2\u66F4\u65B0\uFF0C\u8BF7\u91CD\u8BD5\u3002",409)}return i(d,p)}return{async fetch(d,p){try{let h=new URL(d.url),g=h.pathname;if(Wa(d),p.DB||oe("\u8D26\u6237\u6570\u636E\u5E93\u5C1A\u672A\u8FDE\u63A5\u3002",503),d.method==="POST"){(d.headers.get("origin")!==Ll||!d.headers.get("content-type")?.startsWith("application/json"))&&oe("\u8BF7\u6C42\u6765\u6E90\u6821\u9A8C\u5931\u8D25\u3002",403);let M=await d.text();M.length>1e6&&oe("\u8BF7\u6C42\u8FC7\u5927\u3002",413);let I;try{I=JSON.parse(M)}catch{oe("\u8BF7\u6C42\u5185\u5BB9\u65E0\u6548\u3002")}if(g==="/api/command")return await a(d,p.DB,I);if(/^\/api\/admin\/(register|authenticate)\/(options|verify)$/.test(g)||g==="/api/admin/logout")return await u(d,p.DB,g,I);oe("\u4E0D\u5B58\u5728\u7684\u63A5\u53E3\u3002",404)}if(d.method!=="GET"&&oe("\u4E0D\u652F\u6301\u7684\u8BF7\u6C42\u65B9\u5F0F\u3002",405),g==="/api/state")return Kn(await c(d,p.DB));if(g==="/api/admin/status")return await u(d,p.DB,g);if(g.startsWith("/api/")&&oe("\u4E0D\u5B58\u5728\u7684\u63A5\u53E3\u3002",404),!["/","/player","/admin","/index.html"].includes(g))return new Response("Not found",{status:404});let w=await c(d,p.DB),k=JSON.stringify(w).replaceAll("<","\\u003c");return new Response(t.replace("/* SERVER_BOOTSTRAP */",`window.__CASINO_BOOTSTRAP__=${k};`),{headers:{"Content-Type":"text/html;charset=utf-8","Cache-Control":"private, no-store","Permissions-Policy":"publickey-credentials-create=(self), publickey-credentials-get=(self)","X-Frame-Options":"SAMEORIGIN","X-Content-Type-Options":"nosniff"}})}catch(h){return Kn({error:h.status?h.message:"\u64CD\u4F5C\u672A\u5B8C\u6210\uFF0C\u8BF7\u5237\u65B0\u540E\u91CD\u8BD5\u3002"},h.status||400)}}}}var OH=Gy({page:$p});export{OH as default};
/*! Bundled license information:

pvtsutils/build/index.js:
  (*!
   * MIT License
   * 
   * Copyright (c) 2017-2024 Peculiar Ventures, LLC
   * 
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   * 
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   * 
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   * 
   *)

reflect-metadata/Reflect.js:
  (*! *****************************************************************************
  Copyright (C) Microsoft. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0
  
  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.
  
  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** *)

pvutils/build/utils.es.js:
  (*!
   Copyright (c) Peculiar Ventures, LLC
  *)

asn1js/build/index.es.js:
  (*!
   * Copyright (c) 2014, GMO GlobalSign
   * Copyright (c) 2015-2022, Peculiar Ventures
   * All rights reserved.
   * 
   * Author 2014-2019, Yury Strozhevsky
   * 
   * Redistribution and use in source and binary forms, with or without modification,
   * are permitted provided that the following conditions are met:
   * 
   * * Redistributions of source code must retain the above copyright notice, this
   *   list of conditions and the following disclaimer.
   * 
   * * Redistributions in binary form must reproduce the above copyright notice, this
   *   list of conditions and the following disclaimer in the documentation and/or
   *   other materials provided with the distribution.
   * 
   * * Neither the name of the copyright holder nor the names of its
   *   contributors may be used to endorse or promote products derived from
   *   this software without specific prior written permission.
   * 
   * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
   * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
   * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
   * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
   * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
   * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
   * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
   * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
   * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
   * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
   * 
   *)

tslib/tslib.es6.js:
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

@peculiar/x509/build/x509.es.js:
  (*!
   * MIT License
   * 
   * Copyright (c) Peculiar Ventures. All rights reserved.
   * 
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   * 
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   * 
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   * 
   *)
*/

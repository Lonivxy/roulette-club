var tb=Object.create;var Kl=Object.defineProperty;var rb=Object.getOwnPropertyDescriptor;var nb=Object.getOwnPropertyNames;var ob=Object.getPrototypeOf,ib=Object.prototype.hasOwnProperty;var an=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(e,r)=>(typeof require<"u"?require:e)[r]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});var Wl=(t,e)=>()=>{try{return e||t((e={exports:{}}).exports,e),e.exports}catch(r){throw e=0,r}},Kt=(t,e)=>{for(var r in e)Kl(t,r,{get:e[r],enumerable:!0})},ab=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of nb(e))!ib.call(t,o)&&o!==r&&Kl(t,o,{get:()=>e[o],enumerable:!(n=rb(e,o))||n.enumerable});return t};var na=(t,e,r)=>(r=t!=null?tb(ob(t)):{},ab(e||!t||!t.__esModule?Kl(r,"default",{value:t,enumerable:!0}):r,t));var ti=Wl(()=>{(function(t){"use strict";let e=BigInt(Number.MAX_SAFE_INTEGER);function r(S){if(typeof S=="bigint")return S;if(typeof S=="number"&&Number.isSafeInteger(S))return BigInt(S);if(typeof S=="string"&&/^-?\d+$/.test(S.trim()))return BigInt(S.trim());throw new Error("\u8BF7\u8F93\u5165\u5B8C\u6574\u7684\u6574\u6570\u7B79\u7801\u91D1\u989D\uFF08\u81F3\u5C11 1\uFF09\uFF0C\u4E0D\u652F\u6301\u5C0F\u6570\u6216\u79D1\u5B66\u8BA1\u6570\u6CD5\u3002")}let n=S=>S>=-e&&S<=e?Number(S):S,o=S=>n(r(S)),i=S=>typeof S=="bigint"||typeof S=="number"&&Number.isSafeInteger(S),a=(...S)=>n(S.reduce((x,L)=>x+r(L),0n)),c=(S,x)=>n(r(S)-r(x)),d=(S,x)=>n(r(S)*r(x));function u(S,x,L,Y=!1){let V=r(S)*r(x),ie=r(L);if(V<0n||ie<=0n)throw new Error("Invalid chip ratio.");return n((V+(Y&&V?ie-1n:0n))/ie)}let p=(S,x)=>r(S)<r(x)?-1:r(S)>r(x)?1:0,h=(S,x)=>p(S,x)<=0?S:x,m=(S,x)=>p(S,x)>=0?S:x;function k(S){let x=o(S);if(x<=0)throw new Error("\u8BF7\u8F93\u5165\u81F3\u5C11 1 \u7B79\u7801\u7684\u6574\u6570\u91D1\u989D\u3002");return x}let I=(S,x)=>x&&typeof x=="object"&&!Array.isArray(x)&&Object.keys(x).length===1&&typeof x.$chips=="string"&&/^-?\d+$/.test(x.$chips)?o(x.$chips):x,C=S=>JSON.stringify(S,(x,L)=>typeof L=="bigint"?{$chips:String(L)}:L),R=S=>JSON.parse(S,I);t.CasinoMoney={parse:o,positive:k,valid:i,add:a,sub:c,mul:d,ratio:u,compare:p,min:h,max:m,abs:S=>S<0?c(0,S):S,tryParse:S=>{try{return o(S)}catch{return null}},stringify:C,parseJSON:R,hydrate:S=>R(C(S))}})(globalThis)});var ru=Wl(ii=>{"use strict";var Fb="[object ArrayBuffer]",Rr=class t{static isArrayBuffer(e){return Object.prototype.toString.call(e)===Fb}static toArrayBuffer(e){return this.isArrayBuffer(e)?e:e.byteLength===e.buffer.byteLength||e.byteOffset===0&&e.byteLength===e.buffer.byteLength?e.buffer:this.toUint8Array(e.buffer).slice(e.byteOffset,e.byteOffset+e.byteLength).buffer}static toUint8Array(e){return this.toView(e,Uint8Array)}static toView(e,r){if(e.constructor===r)return e;if(this.isArrayBuffer(e))return new r(e);if(this.isArrayBufferView(e))return new r(e.buffer,e.byteOffset,e.byteLength);throw new TypeError("The provided value is not of type '(ArrayBuffer or ArrayBufferView)'")}static isBufferSource(e){return this.isArrayBufferView(e)||this.isArrayBuffer(e)}static isArrayBufferView(e){return ArrayBuffer.isView(e)||e&&this.isArrayBuffer(e.buffer)}static isEqual(e,r){let n=t.toUint8Array(e),o=t.toUint8Array(r);if(n.length!==o.byteLength)return!1;for(let i=0;i<n.length;i++)if(n[i]!==o[i])return!1;return!0}static concat(...e){let r;Array.isArray(e[0])&&!(e[1]instanceof Function)||Array.isArray(e[0])&&e[1]instanceof Function?r=e[0]:e[e.length-1]instanceof Function?r=e.slice(0,e.length-1):r=e;let n=0;for(let a of r)n+=a.byteLength;let o=new Uint8Array(n),i=0;for(let a of r){let c=this.toUint8Array(a);o.set(c,i),i+=c.length}return e[e.length-1]instanceof Function?this.toView(o,e[e.length-1]):o.buffer}},tu="string",qb=/^[0-9a-f\s]+$/i,Yb=/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/,Jb=/^[a-zA-Z0-9-_]+$/,nc=class{static fromString(e){let r=unescape(encodeURIComponent(e)),n=new Uint8Array(r.length);for(let o=0;o<r.length;o++)n[o]=r.charCodeAt(o);return n.buffer}static toString(e){let r=Rr.toUint8Array(e),n="";for(let i=0;i<r.length;i++)n+=String.fromCharCode(r[i]);return decodeURIComponent(escape(n))}},It=class{static toString(e,r=!1){let n=Rr.toArrayBuffer(e),o=new DataView(n),i="";for(let a=0;a<n.byteLength;a+=2){let c=o.getUint16(a,r);i+=String.fromCharCode(c)}return i}static fromString(e,r=!1){let n=new ArrayBuffer(e.length*2),o=new DataView(n);for(let i=0;i<e.length;i++)o.setUint16(i*2,e.charCodeAt(i),r);return n}},oc=class t{static isHex(e){return typeof e===tu&&qb.test(e)}static isBase64(e){return typeof e===tu&&Yb.test(e)}static isBase64Url(e){return typeof e===tu&&Jb.test(e)}static ToString(e,r="utf8"){let n=Rr.toUint8Array(e);switch(r.toLowerCase()){case"utf8":return this.ToUtf8String(n);case"binary":return this.ToBinary(n);case"hex":return this.ToHex(n);case"base64":return this.ToBase64(n);case"base64url":return this.ToBase64Url(n);case"utf16le":return It.toString(n,!0);case"utf16":case"utf16be":return It.toString(n);default:throw new Error(`Unknown type of encoding '${r}'`)}}static FromString(e,r="utf8"){if(!e)return new ArrayBuffer(0);switch(r.toLowerCase()){case"utf8":return this.FromUtf8String(e);case"binary":return this.FromBinary(e);case"hex":return this.FromHex(e);case"base64":return this.FromBase64(e);case"base64url":return this.FromBase64Url(e);case"utf16le":return It.fromString(e,!0);case"utf16":case"utf16be":return It.fromString(e);default:throw new Error(`Unknown type of encoding '${r}'`)}}static ToBase64(e){let r=Rr.toUint8Array(e);if(typeof btoa<"u"){let n=this.ToString(r,"binary");return btoa(n)}else return Buffer.from(r).toString("base64")}static FromBase64(e){let r=this.formatString(e);if(!r)return new ArrayBuffer(0);if(!t.isBase64(r))throw new TypeError("Argument 'base64Text' is not Base64 encoded");return typeof atob<"u"?this.FromBinary(atob(r)):new Uint8Array(Buffer.from(r,"base64")).buffer}static FromBase64Url(e){let r=this.formatString(e);if(!r)return new ArrayBuffer(0);if(!t.isBase64Url(r))throw new TypeError("Argument 'base64url' is not Base64Url encoded");return this.FromBase64(this.Base64Padding(r.replace(/\-/g,"+").replace(/\_/g,"/")))}static ToBase64Url(e){return this.ToBase64(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/\=/g,"")}static FromUtf8String(e,r=t.DEFAULT_UTF8_ENCODING){switch(r){case"ascii":return this.FromBinary(e);case"utf8":return nc.fromString(e);case"utf16":case"utf16be":return It.fromString(e);case"utf16le":case"usc2":return It.fromString(e,!0);default:throw new Error(`Unknown type of encoding '${r}'`)}}static ToUtf8String(e,r=t.DEFAULT_UTF8_ENCODING){switch(r){case"ascii":return this.ToBinary(e);case"utf8":return nc.toString(e);case"utf16":case"utf16be":return It.toString(e);case"utf16le":case"usc2":return It.toString(e,!0);default:throw new Error(`Unknown type of encoding '${r}'`)}}static FromBinary(e){let r=e.length,n=new Uint8Array(r);for(let o=0;o<r;o++)n[o]=e.charCodeAt(o);return n.buffer}static ToBinary(e){let r=Rr.toUint8Array(e),n="";for(let o=0;o<r.length;o++)n+=String.fromCharCode(r[o]);return n}static ToHex(e){let r=Rr.toUint8Array(e),n="",o=r.length;for(let i=0;i<o;i++){let a=r[i];a<16&&(n+="0"),n+=a.toString(16)}return n}static FromHex(e){let r=this.formatString(e);if(!r)return new ArrayBuffer(0);if(!t.isHex(r))throw new TypeError("Argument 'hexString' is not HEX encoded");r.length%2&&(r=`0${r}`);let n=new Uint8Array(r.length/2);for(let o=0;o<r.length;o=o+2){let i=r.slice(o,o+2);n[o/2]=parseInt(i,16)}return n.buffer}static ToUtf16String(e,r=!1){return It.toString(e,r)}static FromUtf16String(e,r=!1){return It.fromString(e,r)}static Base64Padding(e){let r=4-e.length%4;if(r<4)for(let n=0;n<r;n++)e+="=";return e}static formatString(e){return e?.replace(/[\n\r\t ]/g,"")||""}};oc.DEFAULT_UTF8_ENCODING="utf8";function Xb(t,...e){let r=arguments[0];for(let n=1;n<arguments.length;n++){let o=arguments[n];for(let i in o)r[i]=o[i]}return r}function Qb(...t){let e=t.map(o=>o.byteLength).reduce((o,i)=>o+i),r=new Uint8Array(e),n=0;return t.map(o=>new Uint8Array(o)).forEach(o=>{for(let i of o)r[n++]=i}),r.buffer}function Zb(t,e){if(!(t&&e)||t.byteLength!==e.byteLength)return!1;let r=new Uint8Array(t),n=new Uint8Array(e);for(let o=0;o<t.byteLength;o++)if(r[o]!==n[o])return!1;return!0}ii.BufferSourceConverter=Rr;ii.Convert=oc;ii.assign=Xb;ii.combine=Qb;ii.isEqual=Zb});var qu=Wl(()=>{var Xh;(function(t){(function(e){var r=typeof globalThis=="object"?globalThis:typeof global=="object"?global:typeof self=="object"?self:typeof this=="object"?this:c(),n=o(t);typeof r.Reflect<"u"&&(n=o(r.Reflect,n)),e(n,r),typeof r.Reflect>"u"&&(r.Reflect=t);function o(d,u){return function(p,h){Object.defineProperty(d,p,{configurable:!0,writable:!0,value:h}),u&&u(p,h)}}function i(){try{return Function("return this;")()}catch{}}function a(){try{return(0,eval)("(function() { return this; })()")}catch{}}function c(){return i()||a()}})(function(e,r){var n=Object.prototype.hasOwnProperty,o=typeof Symbol=="function",i=o&&typeof Symbol.toPrimitive<"u"?Symbol.toPrimitive:"@@toPrimitive",a=o&&typeof Symbol.iterator<"u"?Symbol.iterator:"@@iterator",c=typeof Object.create=="function",d={__proto__:[]}instanceof Array,u=!c&&!d,p={create:c?function(){return Vl(Object.create(null))}:d?function(){return Vl({__proto__:null})}:function(){return Vl({})},has:u?function(b,E){return n.call(b,E)}:function(b,E){return E in b},get:u?function(b,E){return n.call(b,E)?b[E]:void 0}:function(b,E){return b[E]}},h=Object.getPrototypeOf(Function),m=typeof Map=="function"&&typeof Map.prototype.entries=="function"?Map:Jy(),k=typeof Set=="function"&&typeof Set.prototype.entries=="function"?Set:Xy(),I=typeof WeakMap=="function"?WeakMap:Qy(),C=o?Symbol.for("@reflect-metadata:registry"):void 0,R=Fy(),S=qy(R);function x(b,E,_,U){if(Q(_)){if(!Lp(b))throw new TypeError;if(!jp(E))throw new TypeError;return j(b,E)}else{if(!Lp(b))throw new TypeError;if(!ae(E))throw new TypeError;if(!ae(U)&&!Q(U)&&!Ct(U))throw new TypeError;return Ct(U)&&(U=void 0),_=or(_),T(b,E,_,U)}}e("decorate",x);function L(b,E){function _(U,te){if(!ae(U))throw new TypeError;if(!Q(te)&&!Wy(te))throw new TypeError;me(b,E,U,te)}return _}e("metadata",L);function Y(b,E,_,U){if(!ae(_))throw new TypeError;return Q(U)||(U=or(U)),me(b,E,_,U)}e("defineMetadata",Y);function V(b,E,_){if(!ae(E))throw new TypeError;return Q(_)||(_=or(_)),B(b,E,_)}e("hasMetadata",V);function ie(b,E,_){if(!ae(E))throw new TypeError;return Q(_)||(_=or(_)),M(b,E,_)}e("hasOwnMetadata",ie);function ne(b,E,_){if(!ae(E))throw new TypeError;return Q(_)||(_=or(_)),be(b,E,_)}e("getMetadata",ne);function H(b,E,_){if(!ae(E))throw new TypeError;return Q(_)||(_=or(_)),ve(b,E,_)}e("getOwnMetadata",H);function g(b,E){if(!ae(b))throw new TypeError;return Q(E)||(E=or(E)),Ce(b,E)}e("getMetadataKeys",g);function A(b,E){if(!ae(b))throw new TypeError;return Q(E)||(E=or(E)),Te(b,E)}e("getOwnMetadataKeys",A);function v(b,E,_){if(!ae(E))throw new TypeError;if(Q(_)||(_=or(_)),!ae(E))throw new TypeError;Q(_)||(_=or(_));var U=ra(E,_,!1);return Q(U)?!1:U.OrdinaryDeleteMetadata(b,E,_)}e("deleteMetadata",v);function j(b,E){for(var _=b.length-1;_>=0;--_){var U=b[_],te=U(E);if(!Q(te)&&!Ct(te)){if(!jp(te))throw new TypeError;E=te}}return E}function T(b,E,_,U){for(var te=b.length-1;te>=0;--te){var Me=b[te],He=Me(E,_,U);if(!Q(He)&&!Ct(He)){if(!ae(He))throw new TypeError;U=He}}return U}function B(b,E,_){var U=M(b,E,_);if(U)return!0;var te=Gl(E);return Ct(te)?!1:B(b,te,_)}function M(b,E,_){var U=ra(E,_,!1);return Q(U)?!1:on(U.OrdinaryHasOwnMetadata(b,E,_))}function be(b,E,_){var U=M(b,E,_);if(U)return ve(b,E,_);var te=Gl(E);if(!Ct(te))return be(b,te,_)}function ve(b,E,_){var U=ra(E,_,!1);if(!Q(U))return U.OrdinaryGetOwnMetadata(b,E,_)}function me(b,E,_,U){var te=ra(_,U,!0);te.OrdinaryDefineOwnMetadata(b,E,_,U)}function Ce(b,E){var _=Te(b,E),U=Gl(b);if(U===null)return _;var te=Ce(U,E);if(te.length<=0)return _;if(_.length<=0)return te;for(var Me=new k,He=[],fe=0,K=_;fe<K.length;fe++){var F=K[fe],q=Me.has(F);q||(Me.add(F),He.push(F))}for(var X=0,he=te;X<he.length;X++){var F=he[X],q=Me.has(F);q||(Me.add(F),He.push(F))}return He}function Te(b,E){var _=ra(b,E,!1);return _?_.OrdinaryOwnMetadataKeys(b,E):[]}function ge(b){if(b===null)return 1;switch(typeof b){case"undefined":return 0;case"boolean":return 2;case"string":return 3;case"symbol":return 4;case"number":return 5;case"object":return b===null?1:6;default:return 6}}function Q(b){return b===void 0}function Ct(b){return b===null}function Zo(b){return typeof b=="symbol"}function ae(b){return typeof b=="object"?b!==null:typeof b=="function"}function bt(b,E){switch(ge(b)){case 0:return b;case 1:return b;case 2:return b;case 3:return b;case 4:return b;case 5:return b}var _=E===3?"string":E===5?"number":"default",U=Hp(b,i);if(U!==void 0){var te=U.call(b,_);if(ae(te))throw new TypeError;return te}return nn(b,_==="default"?"number":_)}function nn(b,E){if(E==="string"){var _=b.toString;if(ei(_)){var U=_.call(b);if(!ae(U))return U}var te=b.valueOf;if(ei(te)){var U=te.call(b);if(!ae(U))return U}}else{var te=b.valueOf;if(ei(te)){var U=te.call(b);if(!ae(U))return U}var Me=b.toString;if(ei(Me)){var U=Me.call(b);if(!ae(U))return U}}throw new TypeError}function on(b){return!!b}function Fn(b){return""+b}function or(b){var E=bt(b,3);return Zo(E)?E:Fn(E)}function Lp(b){return Array.isArray?Array.isArray(b):b instanceof Object?b instanceof Array:Object.prototype.toString.call(b)==="[object Array]"}function ei(b){return typeof b=="function"}function jp(b){return typeof b=="function"}function Wy(b){switch(ge(b)){case 3:return!0;case 4:return!0;default:return!1}}function $l(b,E){return b===E||b!==b&&E!==E}function Hp(b,E){var _=b[E];if(_!=null){if(!ei(_))throw new TypeError;return _}}function Up(b){var E=Hp(b,a);if(!ei(E))throw new TypeError;var _=E.call(b);if(!ae(_))throw new TypeError;return _}function $p(b){return b.value}function Gp(b){var E=b.next();return E.done?!1:E}function Vp(b){var E=b.return;E&&E.call(b)}function Gl(b){var E=Object.getPrototypeOf(b);if(typeof b!="function"||b===h||E!==h)return E;var _=b.prototype,U=_&&Object.getPrototypeOf(_);if(U==null||U===Object.prototype)return E;var te=U.constructor;return typeof te!="function"||te===b?E:te}function zy(){var b;!Q(C)&&typeof r.Reflect<"u"&&!(C in r.Reflect)&&typeof r.Reflect.defineMetadata=="function"&&(b=Yy(r.Reflect));var E,_,U,te=new I,Me={registerProvider:He,getProvider:K,setProvider:q};return Me;function He(X){if(!Object.isExtensible(Me))throw new Error("Cannot add provider to a frozen registry.");switch(!0){case b===X:break;case Q(E):E=X;break;case E===X:break;case Q(_):_=X;break;case _===X:break;default:U===void 0&&(U=new k),U.add(X);break}}function fe(X,he){if(!Q(E)){if(E.isProviderFor(X,he))return E;if(!Q(_)){if(_.isProviderFor(X,he))return E;if(!Q(U))for(var Ee=Up(U);;){var Pe=Gp(Ee);if(!Pe)return;var Vt=$p(Pe);if(Vt.isProviderFor(X,he))return Vp(Ee),Vt}}}if(!Q(b)&&b.isProviderFor(X,he))return b}function K(X,he){var Ee=te.get(X),Pe;return Q(Ee)||(Pe=Ee.get(he)),Q(Pe)&&(Pe=fe(X,he),Q(Pe)||(Q(Ee)&&(Ee=new m,te.set(X,Ee)),Ee.set(he,Pe))),Pe}function F(X){if(Q(X))throw new TypeError;return E===X||_===X||!Q(U)&&U.has(X)}function q(X,he,Ee){if(!F(Ee))throw new Error("Metadata provider not registered.");var Pe=K(X,he);if(Pe!==Ee){if(!Q(Pe))return!1;var Vt=te.get(X);Q(Vt)&&(Vt=new m,te.set(X,Vt)),Vt.set(he,Ee)}return!0}}function Fy(){var b;return!Q(C)&&ae(r.Reflect)&&Object.isExtensible(r.Reflect)&&(b=r.Reflect[C]),Q(b)&&(b=zy()),!Q(C)&&ae(r.Reflect)&&Object.isExtensible(r.Reflect)&&Object.defineProperty(r.Reflect,C,{enumerable:!1,configurable:!1,writable:!1,value:b}),b}function qy(b){var E=new I,_={isProviderFor:function(F,q){var X=E.get(F);return Q(X)?!1:X.has(q)},OrdinaryDefineOwnMetadata:He,OrdinaryHasOwnMetadata:te,OrdinaryGetOwnMetadata:Me,OrdinaryOwnMetadataKeys:fe,OrdinaryDeleteMetadata:K};return R.registerProvider(_),_;function U(F,q,X){var he=E.get(F),Ee=!1;if(Q(he)){if(!X)return;he=new m,E.set(F,he),Ee=!0}var Pe=he.get(q);if(Q(Pe)){if(!X)return;if(Pe=new m,he.set(q,Pe),!b.setProvider(F,q,_))throw he.delete(q),Ee&&E.delete(F),new Error("Wrong provider for target.")}return Pe}function te(F,q,X){var he=U(q,X,!1);return Q(he)?!1:on(he.has(F))}function Me(F,q,X){var he=U(q,X,!1);if(!Q(he))return he.get(F)}function He(F,q,X,he){var Ee=U(X,he,!0);Ee.set(F,q)}function fe(F,q){var X=[],he=U(F,q,!1);if(Q(he))return X;for(var Ee=he.keys(),Pe=Up(Ee),Vt=0;;){var Kp=Gp(Pe);if(!Kp)return X.length=Vt,X;var Zy=$p(Kp);try{X[Vt]=Zy}catch(eb){try{Vp(Pe)}finally{throw eb}}Vt++}}function K(F,q,X){var he=U(q,X,!1);if(Q(he)||!he.delete(F))return!1;if(he.size===0){var Ee=E.get(q);Q(Ee)||(Ee.delete(X),Ee.size===0&&E.delete(Ee))}return!0}}function Yy(b){var E=b.defineMetadata,_=b.hasOwnMetadata,U=b.getOwnMetadata,te=b.getOwnMetadataKeys,Me=b.deleteMetadata,He=new I,fe={isProviderFor:function(K,F){var q=He.get(K);return!Q(q)&&q.has(F)?!0:te(K,F).length?(Q(q)&&(q=new k,He.set(K,q)),q.add(F),!0):!1},OrdinaryDefineOwnMetadata:E,OrdinaryHasOwnMetadata:_,OrdinaryGetOwnMetadata:U,OrdinaryOwnMetadataKeys:te,OrdinaryDeleteMetadata:Me};return fe}function ra(b,E,_){var U=R.getProvider(b,E);if(!Q(U))return U;if(_){if(R.setProvider(b,E,S))return S;throw new Error("Illegal state.")}}function Jy(){var b={},E=[],_=(function(){function fe(K,F,q){this._index=0,this._keys=K,this._values=F,this._selector=q}return fe.prototype["@@iterator"]=function(){return this},fe.prototype[a]=function(){return this},fe.prototype.next=function(){var K=this._index;if(K>=0&&K<this._keys.length){var F=this._selector(this._keys[K],this._values[K]);return K+1>=this._keys.length?(this._index=-1,this._keys=E,this._values=E):this._index++,{value:F,done:!1}}return{value:void 0,done:!0}},fe.prototype.throw=function(K){throw this._index>=0&&(this._index=-1,this._keys=E,this._values=E),K},fe.prototype.return=function(K){return this._index>=0&&(this._index=-1,this._keys=E,this._values=E),{value:K,done:!0}},fe})(),U=(function(){function fe(){this._keys=[],this._values=[],this._cacheKey=b,this._cacheIndex=-2}return Object.defineProperty(fe.prototype,"size",{get:function(){return this._keys.length},enumerable:!0,configurable:!0}),fe.prototype.has=function(K){return this._find(K,!1)>=0},fe.prototype.get=function(K){var F=this._find(K,!1);return F>=0?this._values[F]:void 0},fe.prototype.set=function(K,F){var q=this._find(K,!0);return this._values[q]=F,this},fe.prototype.delete=function(K){var F=this._find(K,!1);if(F>=0){for(var q=this._keys.length,X=F+1;X<q;X++)this._keys[X-1]=this._keys[X],this._values[X-1]=this._values[X];return this._keys.length--,this._values.length--,$l(K,this._cacheKey)&&(this._cacheKey=b,this._cacheIndex=-2),!0}return!1},fe.prototype.clear=function(){this._keys.length=0,this._values.length=0,this._cacheKey=b,this._cacheIndex=-2},fe.prototype.keys=function(){return new _(this._keys,this._values,te)},fe.prototype.values=function(){return new _(this._keys,this._values,Me)},fe.prototype.entries=function(){return new _(this._keys,this._values,He)},fe.prototype["@@iterator"]=function(){return this.entries()},fe.prototype[a]=function(){return this.entries()},fe.prototype._find=function(K,F){if(!$l(this._cacheKey,K)){this._cacheIndex=-1;for(var q=0;q<this._keys.length;q++)if($l(this._keys[q],K)){this._cacheIndex=q;break}}return this._cacheIndex<0&&F&&(this._cacheIndex=this._keys.length,this._keys.push(K),this._values.push(void 0)),this._cacheIndex},fe})();return U;function te(fe,K){return fe}function Me(fe,K){return K}function He(fe,K){return[fe,K]}}function Xy(){var b=(function(){function E(){this._map=new m}return Object.defineProperty(E.prototype,"size",{get:function(){return this._map.size},enumerable:!0,configurable:!0}),E.prototype.has=function(_){return this._map.has(_)},E.prototype.add=function(_){return this._map.set(_,_),this},E.prototype.delete=function(_){return this._map.delete(_)},E.prototype.clear=function(){this._map.clear()},E.prototype.keys=function(){return this._map.keys()},E.prototype.values=function(){return this._map.keys()},E.prototype.entries=function(){return this._map.entries()},E.prototype["@@iterator"]=function(){return this.keys()},E.prototype[a]=function(){return this.keys()},E})();return b}function Qy(){var b=16,E=p.create(),_=U();return(function(){function K(){this._key=U()}return K.prototype.has=function(F){var q=te(F,!1);return q!==void 0?p.has(q,this._key):!1},K.prototype.get=function(F){var q=te(F,!1);return q!==void 0?p.get(q,this._key):void 0},K.prototype.set=function(F,q){var X=te(F,!0);return X[this._key]=q,this},K.prototype.delete=function(F){var q=te(F,!1);return q!==void 0?delete q[this._key]:!1},K.prototype.clear=function(){this._key=U()},K})();function U(){var K;do K="@@WeakMap@@"+fe();while(p.has(E,K));return E[K]=!0,K}function te(K,F){if(!n.call(K,_)){if(!F)return;Object.defineProperty(K,_,{value:p.create()})}return K[_]}function Me(K,F){for(var q=0;q<F;++q)K[q]=Math.random()*255|0;return K}function He(K){if(typeof Uint8Array=="function"){var F=new Uint8Array(K);return typeof crypto<"u"?crypto.getRandomValues(F):typeof msCrypto<"u"?msCrypto.getRandomValues(F):Me(F,K),F}return Me(new Array(K),K)}function fe(){var K=He(b);K[6]=K[6]&79|64,K[8]=K[8]&191|128;for(var F="",q=0;q<b;++q){var X=K[q];(q===4||q===6||q===8)&&(F+="-"),X<16&&(F+="0"),F+=X.toString(16).toLowerCase()}return F}}function Vl(b){return b.__=void 0,delete b.__,b}})})(Xh||(Xh={}))});var Wp=`<!DOCTYPE html>
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
#shark-panel { background: linear-gradient(125deg,#561020,#2d0914 75%); border-color: #ff526f80; box-shadow: inset 0 0 65px #ef204315,0 0 40px #a20d2626; color: #ffe3e8; }
#shark-panel .club-muted { color: #e7a7b4; }
#shark-panel .club-input { background: #23070f; border-color: #f2688266; }
#shark-panel .club-action { background: #e83f5f; border-color: #ff8a9f80; color: #fff6f7; box-shadow: 0 0 24px #ff2b5133; }
.shark-crisis[hidden],.club-recovery[hidden],#bank-recovery[hidden] { display: none !important; }
.shark-crisis { position: fixed; inset: 0; z-index: 10000; display: grid; place-items: center; padding: 24px; isolation: isolate; background: radial-gradient(ellipse at 50% 42%,#9f143b8c,#4a001be8 65%,#24000bf5); backdrop-filter: blur(9px); color: #fff0f3; }
.shark-crisis::before { content: ''; position: absolute; inset: 5%; z-index: -1; border-radius: 50%; background: radial-gradient(ellipse,#ff3d6a50,transparent 65%); filter: blur(35px); animation: shark-glow 5s ease-in-out infinite; pointer-events: none; }
.shark-crisis-card { position: relative; width: min(100%,560px); padding: clamp(30px,6vw,64px) clamp(24px,5vw,52px); text-align: center; border: 1px solid #ff788e70; border-radius: 28px; background: linear-gradient(145deg,#6e1028f5,#300611f5); box-shadow: 0 0 100px #fa255839,inset 0 0 50px #ff567012; }
.shark-crisis-eyebrow { margin: 0 0 24px; font-size: 11px; letter-spacing: .5em; color: #f1a1b4; }
.shark-crisis h2 { margin: 0 0 22px; font-size: clamp(40px,8vw,64px); font-weight: 900; letter-spacing: -.04em; text-shadow: 0 0 35px #ff7c9b80; }
.shark-crisis-card > p:not(.shark-crisis-eyebrow):not(.shark-crisis-terms) { font-size: clamp(16px,3vw,21px); color: #eab4c0; line-height: 1.8; }
.shark-crisis strong { color: #fff1f4; }
#shark-crisis-go { margin-top: 32px; padding: 17px 30px; width: 100%; border-radius: 12px; border: 1px solid #ffadbd; background: linear-gradient(135deg,#fc5474,#cc2447); color: white; font-size: 16px; font-weight: 800; cursor: pointer; box-shadow: 0 0 35px #ff3b6560; }
#shark-crisis-go span { margin-left: 18px; }
.shark-crisis-terms { margin: 18px 0 0; font-size: 11px; letter-spacing: .12em; color: #dd8fa2; }
.shark-crisis-active .club-view { box-shadow: inset 0 0 180px #d31c3f24; }
.club-recovery { position: fixed; z-index: 50; left: 50%; bottom: 16px; transform: translateX(-50%); display: flex; flex-wrap: wrap; justify-content: center; gap: 8px 18px; width: max-content; max-width: calc(100vw - 28px); padding: 12px 20px; border-radius: 12px; border: 1px solid #d54c6877; background: #350e1fee; box-shadow: 0 0 32px #d4194022; color: #e9b3c1; font-size: 11px; pointer-events: none; }
.club-recovery strong { font-size: 20px; color: #ff8fa5; margin-left: 7px; }
.club-recovery b { color: #fff0f4; }
body:has(.club-recovery:not([hidden])) #roulette-controls { bottom: 76px; }
.recovery-card { margin-top: 20px; background: #360e20; border-color: #e95b7c55; color: #f6c3d0; font-size: 13px; line-height: 1.7; }
@keyframes shark-glow { 0%,100% { opacity: .5; transform: scale(.92); } 50% { opacity: 1; transform: scale(1.06); } }
.account-directory,.account-overview { margin-top: 24px; }
.account-section-heading { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; }
.account-section-heading h3 { margin: 6px 0; }
.account-toolbar { display: grid; grid-template-columns: minmax(0,1fr) minmax(160px,230px); gap: 14px; margin-bottom: 18px; }
.account-table-wrap { max-width: 100%; overflow-x: auto; border: 1px solid #ffffff12; border-radius: 12px; }
.account-table { border-collapse: collapse; width: 100%; text-align: left; font-size: 12px; font-variant-numeric: tabular-nums; }
.account-table th { padding: 13px 14px; font-size: 10px; color: #b6a9c9; font-weight: 700; background: #0e0b1570; white-space: nowrap; }
.account-table td { padding: 14px; border-top: 1px solid #ffffff0c; color: #e6deee; white-space: nowrap; }
.account-table td:first-child { white-space: normal; min-width: 105px; max-width: 240px; overflow-wrap: anywhere; }
.account-table small { display: block; margin-top: 5px; color: #a99bb9; font-size: 10px; }
.account-table [data-negative="true"],.account-stat-row [data-negative="true"] { color: #ff94aa; }
.account-table button { padding: 7px 10px; font-size: 10px; }
.account-pagination { display: flex; gap: 12px; justify-content: center; align-items: center; margin-top: 16px; }
.account-pagination button { padding: 8px 13px; }
.account-stat-row { grid-template-columns: repeat(4,minmax(0,1fr)); margin: 16px 0 24px; }
.account-stat-row dd { font-size: clamp(16px,2.6vw,24px); overflow-wrap: anywhere; }
.forecast-heading { padding-top: 16px; border-top: 1px solid #ffffff12; }
.forecast-heading .club-field { margin-top: 0; }
.account-forecast-growth { color: #f3cd8d; font-size: 13px; margin-top: 16px; }
@media(max-width:700px) { .account-stat-row { grid-template-columns: repeat(2,minmax(0,1fr)); } .account-toolbar { grid-template-columns: 1fr; gap: 0; } .account-table td,.account-table th { padding: 11px; } }
@media(prefers-reduced-motion:reduce) { .shark-crisis::before { animation: none; } }
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

/* Full amounts stay readable even when wallets contain hundreds of digits. */
#club-wallet, #bank-wallet, #balance-display, .club-card, .club-table td, .club-table th { overflow-wrap:anywhere; min-width:0; }

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
.arcade-view { background: radial-gradient(ellipse at 20% 15%,#11333c,#141323 60%,#0a0c13); }
.dice-view { background: radial-gradient(ellipse at 25% 20%,#153d30,#171624 65%,#0b1012); }
.arcade-shell { max-width: 1240px; margin: auto; padding-bottom: 70px; }
.arcade-heading { display: flex; align-items: center; justify-content: space-between; gap: 20px; margin-bottom: 24px; }
.arcade-heading h2 { font-family: Orbitron,sans-serif; color: #f0e8d2; font-weight: 900; font-size: clamp(27px,4vw,45px); margin: 8px 0; }
.arcade-heading h2 span { font: 600 15px sans-serif; color: #9ac3c7; margin-left: 12px; }
.arcade-heading p { color: #9caebc; font-size: 12px; line-height: 1.7; }
.arcade-max { color: #8aaab1; font-size: 11px; text-align: right; white-space: nowrap; }
.arcade-max strong { display: block; color: #e7ca7e; font: 800 30px Orbitron,sans-serif; margin-top: 7px; }
.arcade-layout { display: grid; grid-template-columns: minmax(0,1.7fr) minmax(280px,1fr); gap: 22px; align-items: start; }
.arcade-machine { position: relative; border: 1px solid #58b7c236; border-radius: 24px; background: #090f1dcc; overflow: hidden; box-shadow: 0 18px 65px #0006,inset 0 0 70px #2ab1c208; }
.dice-machine { border-color: #c9ac653a; background: #091b17; }
.arcade-mount { width: 100%; height: clamp(360px,65vh,650px); touch-action: manipulation; }
.arcade-mount canvas { width: 100%; height: 100%; display: block; }
.arcade-machine-tip { margin: 0; padding: 0 12px 16px; text-align: center; color: #91a8ae; font-size: 10px; letter-spacing: .1em; }
.arcade-controls { background: #141524eF; }
.arcade-controls .club-field:first-child { margin-top: 10px; }
.arcade-quick { display: flex; gap: 7px; margin-top: 9px; }
.arcade-quick button { flex: 1; border: 1px solid #789ba835; background: #17304066; border-radius: 7px; color: #adcad1; padding: 8px 6px; font-size: 11px; cursor: pointer; }
.arcade-play { width: 100%; margin-top: 24px; padding: 15px; background: linear-gradient(120deg,#e9ce84,#c19c4e); font-size: 15px; }
.arcade-status { min-height: 36px; color: #a6b8c5; font-size: 12px; line-height: 1.65; margin: 17px 0 0; }
.arcade-result { font-size: 19px; font-weight: 800; color: #8be2c5; line-height: 1.6; min-height: 30px; font-variant-numeric: tabular-nums; }
.arcade-result[data-loss="true"] { color: #ef9baa; }
.arcade-rules { margin-top: 18px; padding-top: 16px; border-top: 1px solid #ffffff12; font-size: 11px; color: #899cac; line-height: 1.8; }
.arcade-rules summary { color: #c1cbd5; cursor: pointer; }
.arcade-rules ol { padding-left: 22px; columns: 2; }
.arcade-unavailable { position: absolute; inset: 35% 20px auto; padding: 20px; font-size: 13px; line-height: 1.8; text-align: center; color: #fecaca; background: #171322f0; }
.arcade-unavailable[hidden],#dice-target-field[hidden] { display: none !important; }
.arcade-recent { margin-top: 24px; }
.arcade-recent h3 { font-size: 11px; color: #8098a5; text-transform: uppercase; letter-spacing: .15em; }
.arcade-recent ol { display: flex; flex-wrap: wrap; gap: 9px; list-style: none; padding: 0; }
.arcade-recent li { padding: 11px 14px; border: 1px solid #87b4c22b; background: #101e2d; border-radius: 10px; font-size: 11px; color: #b1d4d5; }
.arcade-recent li[data-loss="true"] { color: #d8a0b1; border-color: #a4576a35; }
.club-tabs { overflow-x: auto; scrollbar-width: thin; }
.club-tabs button { white-space: nowrap; }
@media(min-width:901px) { #club-nav { gap: 10px; padding-left: 16px; padding-right: 16px; } .club-tabs button { padding-left: 9px; padding-right: 9px; } }
@media(max-width:780px) { .arcade-layout { grid-template-columns: 1fr; } .arcade-heading { gap: 10px; } .arcade-heading h2 span { display: block; margin: 10px 0 0; } .arcade-max strong { font-size: 24px; } .arcade-mount { height: min(70vh,560px); min-height: 350px; } .arcade-controls { padding: 20px; } .club-tabs button { flex: 0 0 auto; } }
.lottery-view { background:radial-gradient(ellipse at 15% 10%,#3c284d,#181522 60%,#100e17); }
.lottery-shell { max-width:1180px; margin:auto; padding-bottom:50px; }
.lottery-heading { display:flex; justify-content:space-between; align-items:center; gap:24px; margin-bottom:26px; }
.lottery-heading h2 { color:#f5e5bd; font-size:clamp(30px,5vw,48px); font-weight:900; margin:10px 0; }
.lottery-top-prize { color:#c2a96f; font-size:12px; text-align:right; }
.lottery-top-prize strong { display:block; color:#f3d58e; font:800 clamp(20px,3vw,32px) Orbitron,sans-serif; margin-top:8px; }
.lottery-layout { display:grid; grid-template-columns:minmax(0,1.2fr) minmax(320px,1fr); gap:24px; align-items:start; }
.lottery-prices { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:10px; margin:20px 0; }
.lottery-prices button { padding:16px 5px; border:1px solid #bc985f45; border-radius:12px; background:#241c2d; color:#dacba7; cursor:pointer; min-width:0; }
.lottery-prices button[aria-pressed="true"] { border-color:#f4cd77; background:#59402880; box-shadow:0 0 24px #d7a84b12; }
.lottery-prices span,.lottery-prices strong,.lottery-prices small { display:block; }
.lottery-prices span { font-size:12px; }.lottery-prices strong { font-size:clamp(14px,2.2vw,22px); margin:10px 0; }.lottery-prices small { font-size:10px; color:#b6a78e; }
.lottery-buy { width:100%; padding:15px; }.lottery-status { color:#bdb0cd; font-size:13px; line-height:1.7; min-height:44px; margin:16px 0; }
.lottery-ticket { padding:28px 20px; border:1px solid #d0ab664d; border-radius:16px; background:linear-gradient(135deg,#302037,#1c1626); text-align:center; overflow-wrap:anywhere; }
.lottery-ticket h3 { color:#e8d3a5; margin:12px 0; }.lottery-multiplier { display:block; font:900 clamp(32px,6vw,60px) Orbitron,sans-serif; color:#f0d18c; margin:24px 0; }
.lottery-result { color:#c4b6d4; line-height:1.8; font-size:14px; min-height:50px; }.lottery-ticket-id { color:#a091ae; font-size:10px; }
.lottery-ticket[data-state="drawing"] { animation:lottery-glow 1s ease-in-out infinite alternate; }.lottery-ticket[data-state="profit"] { border-color:#d6ba72; box-shadow:inset 0 0 40px #e0b34d12; }.lottery-ticket[data-state="loss"] .lottery-multiplier { color:#e9a0ad; }
#lottery-reveal[hidden] { display:none; }.lottery-rules table { width:100%; border-collapse:collapse; font-size:12px; font-variant-numeric:tabular-nums; }.lottery-rules th,.lottery-rules td { padding:11px 6px; text-align:right; border-bottom:1px solid #ffffff0d; }.lottery-rules th:first-child,.lottery-rules td:first-child { text-align:left; }.lottery-table-wrap { overflow-x:auto; }.lottery-rules th { color:#a79bb3; font-weight:500; }.lottery-rules tbody tr:first-child { color:#f0d18c; }.lottery-theory { color:#dbc99d; font-size:12px; line-height:1.8; margin-top:18px; }
.lottery-history { margin-top:24px; }.lottery-history ol { list-style:none; padding:0; display:grid; grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr)); gap:10px; }.lottery-history li { border:1px solid #d6ba7226; border-radius:10px; padding:14px; font-size:12px; color:#ddcba4; line-height:1.9; overflow-wrap:anywhere; }.lottery-history li[data-loss="true"] { color:#dca6b5; }.lottery-history time { display:block; color:#a698b3; font-size:10px; }
.lottery-prices button:focus-visible,.lottery-buy:focus-visible,#lottery-reveal:focus-visible { outline:3px solid #f0d18c; outline-offset:4px; }.lottery-prices button:disabled { opacity:.45; cursor:not-allowed; }
@keyframes lottery-glow { from { box-shadow:inset 0 0 20px #edca7a09; } to { box-shadow:inset 0 0 50px #edca7a25; } }
@media(max-width:800px) { .lottery-layout { grid-template-columns:1fr; }.lottery-heading { align-items:flex-start; }.lottery-top-prize { max-width:42%; }.lottery-prices strong { font-size:16px; } }
@media(prefers-reduced-motion:reduce) { .lottery-ticket[data-state="drawing"] { animation:none; } }

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
        <button id="tab-plinko" type="button" role="tab" aria-controls="plinko-view" aria-selected="false" data-view="plinko">Plinko \u5F39\u73E0</button>
        <button id="tab-dice" type="button" role="tab" aria-controls="dice-view" aria-selected="false" data-view="dice">\u9AB0\u5B9D</button>
        <button id="tab-lottery" type="button" role="tab" aria-controls="lottery-view" aria-selected="false" data-view="lottery">\u5F69\u7968</button>
        <button id="tab-bank" type="button" role="tab" aria-controls="bank-view" aria-selected="false" data-view="bank">\u94F6\u884C</button>
        <button id="tab-players" type="button" role="tab" aria-controls="players-view" aria-selected="false" data-view="players">\u73A9\u5BB6</button>
        <button id="tab-market" type="button" role="tab" aria-controls="market-view" aria-selected="false" data-view="market">\u9ED1\u5E02\u5546\u4EBA</button>
    </div>
    <div class="club-primary-links"><a href="/player">PLAYER</a><a href="/admin">ADMIN</a></div><div class="club-account"><span class="club-wallet" id="club-wallet">1,000 \u20B5</span><label for="club-user" class="sr-only">Active player</label><select id="club-user" class="club-select" aria-label="Active player"></select></div>
</nav>
<div id="club-migration-note" hidden>\u68C0\u6D4B\u5230\u6B64\u524D\u7684\u672C\u5730\u73A9\u5BB6\u5B58\u6863\u3002\u8BF7\u5148<a href="/admin">\u8FDB\u5165 ADMIN\uFF0C\u8BBE\u7F6E\u901A\u884C\u5BC6\u94A5\u5E76\u5BFC\u5165</a>\uFF0C\u4EE5\u4FDD\u7559\u539F\u6709\u4F59\u989D\u3001\u6B20\u6B3E\u548C\u5361\u5305\u3002</div>
<div id="shark-crisis" class="shark-crisis" role="alertdialog" aria-modal="true" aria-labelledby="shark-crisis-title" aria-describedby="shark-crisis-description" hidden>
  <div class="shark-crisis-card"><p class="shark-crisis-eyebrow">\u6700\u540E\u7684\u9009\u62E9</p><h2 id="shark-crisis-title">\u4F60\u6CA1\u94B1\u4E86!</h2><p id="shark-crisis-description">\u4F60\u73B0\u5728\u53EA\u80FD\u9009\u62E9 <strong>\u501F\u9AD8\u5229\u8D37</strong></p><button id="shark-crisis-go" type="button">\u70B9\u51FB\u524D\u5F80 <span aria-hidden="true">\u2192</span></button><p class="shark-crisis-terms">\u6BCF 3 \u5206\u949F \xB7 125% \u5229\u606F</p></div>
</div>
<aside id="club-recovery" class="club-recovery" role="status" aria-live="polite" hidden><span>\u8D1F\u6570\u6A21\u5F0F <strong id="recovery-deficit">-0</strong></span><span>\u672C\u5C40\u53EF\u7528 <b id="recovery-budget">10</b> \xB7 \u6BCF\u5C40\u51C0\u76C8\u5229\u81EA\u52A8\u62B5\u6263\uFF0C\u4E0B\u4E00\u5C40\u56FA\u5B9A 10</span></aside>
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

  <button id="lucky-panel-toggle" type="button" aria-controls="lucky-panels" aria-expanded="false">Show controls</button><button id="lucky-custom-toggle" type="button" aria-controls="lucky-custom-panel" aria-expanded="false">Custom bet</button><div id="lucky-custom-panel" hidden><form id="lucky-custom-form" class="custom-bet-form" novalidate><label for="lucky-custom-amount">Custom bet \xB7 Whole chips \xB7 no maximum</label><input id="lucky-custom-amount" type="text" pattern="[0-9]+" inputmode="numeric" value="100" required><button id="lucky-custom-apply" type="submit">Use amount</button></form></div><div id="lucky-armed-card" hidden><span id="lucky-card-label"></span><button id="lucky-card-cancel" type="button">\u53D6\u6D88\u88C5\u5907</button></div><p id="lucky-touch-hint">Tap a bet button \xB7 Pull the red lever</p><p id="lucky-accessible-result" class="lucky-sr-only" role="status" aria-live="polite"></p></section>
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
                <div class="bj-betting"><label for="bj-wager">CUSTOM BET / CHIPS</label><div class="bj-wager-row"><button type="button" id="bj-bet-minus" class="bj-step" aria-label="Decrease wager by 10">\u2212</button><input type="text" pattern="[0-9]+" id="bj-wager" inputmode="numeric" value="50" aria-label="Blackjack wager in chips"><button type="button" id="bj-bet-plus" class="bj-step" aria-label="Increase wager by 10">+</button></div><p class="club-muted">Enter any whole amount \xB7 Whole chips \xB7 no maximum</p><div class="bj-chips" aria-label="Add chips to your wager"><button type="button" data-bj-chip="10">10</button><button type="button" data-bj-chip="50">50</button><button type="button" data-bj-chip="100">100</button><button type="button" data-bj-chip="500">500</button></div></div>
                <div class="bj-moves"><button type="button" id="bj-deal" class="bj-deal">DEAL CARDS <span>\u2192</span></button><div class="bj-play-actions"><button type="button" id="bj-hit" disabled>HIT <kbd>H</kbd></button><button type="button" id="bj-stand" disabled>STAND <kbd>S</kbd></button><button type="button" id="bj-double" disabled>DOUBLE <kbd>D</kbd></button><button type="button" id="bj-split" disabled>SPLIT <kbd>P</kbd></button></div></div>
            </div>
            <details class="bj-rules"><summary>Table rules & payouts</summary><p>Blackjack pays 3:2. Other wins pay 1:1; ties return your stake. Dealer stands on all 17s, including soft 17, and checks for blackjack on the deal. Double on any first two cards, including after a split. Split equal-value cards once into two hands. Split aces receive one card each. A split-hand 21 pays 1:1. No insurance or surrender. Custom bets: \u81F3\u5C11 1 \xB7 \u65E0\u4E0A\u9650 whole chips. Odd blackjack wagers round half-chip payouts down.</p><p>Winnings are credited to your player wallet. Leave and return to resume an unfinished hand.</p></details>
        </div>
    </div>
</section>

<section id="plinko-view" class="club-view arcade-view" role="tabpanel" aria-labelledby="tab-plinko" hidden>
  <div class="arcade-shell"><header class="arcade-heading"><div><div class="club-eyebrow">\u65B0\u73A9\u6CD5 \xB7 12 \u5C42\u9489\u9635</div><h2>PLINKO <span>\u5F39\u73E0\u673A</span></h2><p>\u9009\u62E9\u843D\u7403\u53E3\uFF0C\u8BA9\u5F39\u73E0\u7A7F\u8FC7\u9489\u9635\uFF0C\u843D\u8FDB\u4E0D\u540C\u500D\u7387\u7684\u69FD\u4F4D\u3002</p></div><div class="arcade-max">\u6700\u9AD8 <strong>100\xD7</strong></div></header>
    <div class="arcade-layout"><div class="arcade-machine"><div id="plinko-mount" class="arcade-mount" aria-label="3D \u5F39\u73E0\u673A\uFF1A\u70B9\u51FB\u9876\u90E8\u843D\u7403\u53E3\u6295\u7403"></div><p id="plinko-unavailable" class="arcade-unavailable" hidden>3D \u753B\u9762\u4E0D\u53EF\u7528\u3002\u8BF7\u4F7F\u7528\u652F\u6301 WebGL \u7684\u6D4F\u89C8\u5668\uFF0C\u5176\u4ED6\u8D26\u6237\u529F\u80FD\u4ECD\u53EF\u4F7F\u7528\u3002</p><p class="arcade-machine-tip">\u70B9\u51FB\u9876\u90E8\u843D\u7403\u53E3\u6295\u7403 \xB7 \u6216\u6309 Space</p></div>
      <div class="arcade-controls club-card"><h3>\u6295\u4E00\u679A\u5F39\u73E0</h3><form id="plinko-form"><label for="plinko-wager" class="club-field">\u81EA\u5B9A\u4E49\u4E0B\u6CE8</label><input id="plinko-wager" type="text" pattern="[0-9]+" value="10" class="club-input" inputmode="numeric" required><div class="arcade-quick"><button type="button" data-arcade-chip="plinko:10">10</button><button type="button" data-arcade-chip="plinko:50">50</button><button type="button" data-arcade-chip="plinko:100">100</button><button type="button" data-arcade-chip="plinko:all">All In</button></div>
        <label for="plinko-risk" class="club-field">\u500D\u7387\u98CE\u9669</label><select id="plinko-risk" class="club-select"><option value="low">\u7A33\u5065 \xB7 \u6700\u9AD8 8\xD7</option><option value="medium" selected>\u8FDB\u53D6 \xB7 \u6700\u9AD8 25\xD7</option><option value="high">\u6781\u9650 \xB7 \u6700\u9AD8 100\xD7</option></select>
        <label for="plinko-lane" class="club-field">\u843D\u7403\u53E3</label><select id="plinko-lane" class="club-select"><option value="left">\u5DE6\u4FA7 \xB7 \u504F\u5411\u5DE6\u843D</option><option value="center" selected>\u4E2D\u95F4 \xB7 \u5DE6\u53F3\u5747\u8861</option><option value="right">\u53F3\u4FA7 \xB7 \u504F\u5411\u53F3\u843D</option></select>
        <button id="plinko-play" type="submit" class="club-action arcade-play">\u6295\u7403</button></form><p id="plinko-status" class="arcade-status" role="status">\u51C6\u5907\u6295\u7403\u3002</p><div id="plinko-result" class="arcade-result" aria-live="polite"></div>
        <details class="arcade-rules"><summary>\u500D\u7387\u4E0E\u6982\u7387</summary><p>\u69FD\u4F4D\u500D\u7387\u662F\u603B\u8FD4\u8FD8\uFF0C\u5305\u542B\u4E0B\u6CE8\u672C\u91D1\uFF0C\u8FD4\u8FD8\u5411\u4E0B\u53D6\u6574\u5230\u6574\u7B79\u7801\u3002\u5DE6\uFF0F\u4E2D\uFF0F\u53F3\u843D\u7403\u53E3\u6BCF\u5C42\u5411\u53F3\u7684\u6982\u7387\u4E3A 44%\uFF0F50%\uFF0F56%\u3002</p><ol id="plinko-odds"></ol><p id="plinko-theory"></p></details>
      </div></div><div class="arcade-recent"><h3>\u6700\u8FD1\u7684\u5F39\u73E0</h3><ol id="plinko-history"></ol></div>
  </div>
</section>
<section id="dice-view" class="club-view arcade-view dice-view" role="tabpanel" aria-labelledby="tab-dice" hidden>
  <div class="arcade-shell"><header class="arcade-heading"><div><div class="club-eyebrow">\u65B0\u73A9\u6CD5 \xB7 \u4E09\u679A\u9AB0\u5B50</div><h2>DICE <span>\u4E09\u9AB0\u9AB0\u5B9D</span></h2><p>\u62BC\u5927\u5C0F\u3001\u5355\u53CC\u3001\u56F4\u9AB0\uFF0C\u6216\u731C\u4E09\u679A\u9AB0\u5B50\u7684\u603B\u70B9\u6570\u3002</p></div><div class="arcade-max">\u6307\u5B9A\u70B9\u6570\u6700\u9AD8 <strong>61\xD7</strong></div></header>
    <div class="arcade-layout"><div class="arcade-machine dice-machine"><div id="dice-mount" class="arcade-mount" aria-label="3D \u9AB0\u5B9D\u684C\uFF1A\u70B9\u51FB\u684C\u9762\u63B7\u9AB0"></div><p id="dice-unavailable" class="arcade-unavailable" hidden>3D \u753B\u9762\u4E0D\u53EF\u7528\u3002\u8BF7\u4F7F\u7528\u652F\u6301 WebGL \u7684\u6D4F\u89C8\u5668\uFF0C\u5176\u4ED6\u8D26\u6237\u529F\u80FD\u4ECD\u53EF\u4F7F\u7528\u3002</p><p class="arcade-machine-tip">\u70B9\u51FB\u684C\u9762\u63B7\u9AB0 \xB7 \u6216\u6309 Space</p></div>
      <div class="arcade-controls club-card"><h3>\u9009\u62E9\u4F60\u7684\u4E0B\u6CE8</h3><form id="dice-form"><label for="dice-wager" class="club-field">\u81EA\u5B9A\u4E49\u4E0B\u6CE8</label><input id="dice-wager" type="text" pattern="[0-9]+" value="10" class="club-input" inputmode="numeric" required><div class="arcade-quick"><button type="button" data-arcade-chip="dice:10">10</button><button type="button" data-arcade-chip="dice:50">50</button><button type="button" data-arcade-chip="dice:100">100</button><button type="button" data-arcade-chip="dice:all">All In</button></div>
        <label for="dice-kind" class="club-field">\u62BC\u4EC0\u4E48</label><select id="dice-kind" class="club-select"><option value="small">\u5C0F \xB7 \u603B\u70B9\u6570 4\u201310 \xB7 2\xD7</option><option value="big">\u5927 \xB7 \u603B\u70B9\u6570 11\u201317 \xB7 2\xD7</option><option value="odd">\u5355 \xB7 \u603B\u70B9\u6570\u4E3A\u5947\u6570 \xB7 2\xD7</option><option value="even">\u53CC \xB7 \u603B\u70B9\u6570\u4E3A\u5076\u6570 \xB7 2\xD7</option><option value="triple">\u4EFB\u610F\u56F4\u9AB0 \xB7 \u4E09\u679A\u76F8\u540C \xB7 31\xD7</option><option value="sum">\u6307\u5B9A\u603B\u70B9\u6570 \xB7 \u6700\u9AD8 61\xD7</option></select>
        <div id="dice-target-field" hidden><label for="dice-target" class="club-field">\u4E09\u679A\u9AB0\u5B50\u7684\u603B\u70B9\u6570</label><select id="dice-target" class="club-select"></select></div>
        <button id="dice-play" type="submit" class="club-action arcade-play">\u63B7\u9AB0</button></form><p id="dice-status" class="arcade-status" role="status">\u51C6\u5907\u63B7\u9AB0\u3002</p><div id="dice-result" class="arcade-result" aria-live="polite"></div>
        <details class="arcade-rules"><summary>\u672C\u684C\u89C4\u5219</summary><p>\u6BCF\u679A\u9AB0\u5B50 1\u20136 \u70B9\uFF0C\u4E09\u679A\u72EC\u7ACB\u6295\u63B7\u3002\u5927\u5C0F\u3001\u5355\u53CC\u9047\u5230\u4EFB\u610F\u56F4\u9AB0\u5747\u8F93\uFF1B\u6307\u5B9A\u603B\u70B9\u6570\u53EA\u770B\u603B\u548C\u3002\u6BCF\u5C40\u9009\u62E9\u4E00\u79CD\u4E0B\u6CE8\u3002</p><p>\u500D\u7387\u4E3A\u542B\u672C\u91D1\u7684\u603B\u8FD4\u8FD8\uFF1A\u5927\u5C0F\uFF0F\u5355\u53CC 2\xD7\uFF0C\u4EFB\u610F\u56F4\u9AB0 31\xD7\uFF1B\u6307\u5B9A\u603B\u70B9\u6570\u7684\u500D\u7387\u663E\u793A\u5728\u9009\u9879\u4E2D\u3002</p></details>
      </div></div><div class="arcade-recent"><h3>\u6700\u8FD1\u7684\u9AB0\u5B50</h3><ol id="dice-history"></ol></div>
  </div>
</section>

<section id="lottery-view" class="club-view lottery-view" role="tabpanel" aria-labelledby="tab-lottery" hidden>
  <div class="lottery-shell">
    <header class="lottery-heading"><div><p class="club-eyebrow">LUCKY LOTTERY \xB7 \u5373\u4E70\u5373\u5F00</p><h2>\u5E78\u8FD0\u5F69\u7968</h2><p class="club-muted">\u9009\u4E00\u5F20\u7968\uFF0C\u8BA9\u5E78\u8FD0\u63ED\u6653\u3002\u6BCF\u5F20\u72EC\u7ACB\u5F00\u5956\uFF0C\u6700\u9AD8\u8FD4\u8FD8\u7968\u4EF7\u7684 100 \u500D\u3002</p></div><div class="lottery-top-prize">\u672C\u6863\u6700\u9AD8\u5956\u91D1<strong id="lottery-top-prize">100,000</strong></div></header>
    <div class="lottery-layout">
      <div class="lottery-purchase club-card">
        <h3>\u9009\u62E9\u7968\u4EF7</h3><div id="lottery-prices" class="lottery-prices" role="group" aria-label="\u5F69\u7968\u7968\u4EF7">
          <button type="button" data-lottery-price="1000" aria-pressed="true"><span>\u7ECF\u5178\u7968</span><strong>1,000</strong><small>\u6700\u9AD8 100,000</small></button>
          <button type="button" data-lottery-price="10000" aria-pressed="false"><span>\u9EC4\u91D1\u7968</span><strong>10,000</strong><small>\u6700\u9AD8 1,000,000</small></button>
          <button type="button" data-lottery-price="1000000" aria-pressed="false"><span>\u81F3\u5C0A\u7968</span><strong>1,000,000</strong><small>\u6700\u9AD8 100,000,000</small></button>
        </div>
        <p id="lottery-cost" class="club-muted">\u672C\u6B21\u7968\u4EF7 1,000 \u7B79\u7801 \xB7 \u8D2D\u7968\u540E\u7ACB\u5373\u7ED3\u7B97</p>
        <button id="lottery-buy" type="button" class="club-action lottery-buy">\u8D2D\u7968\u5E76\u5F00\u5956 \xB7 1,000</button>
        <p id="lottery-status" class="lottery-status" role="status" aria-live="polite">\u9009\u62E9\u7968\u4EF7\uFF0C\u51C6\u5907\u5F00\u5956\u3002</p>
        <div id="lottery-ticket" class="lottery-ticket" aria-busy="false" data-state="ready">
          <p class="club-eyebrow">LUCKY LOTTERY</p><h3 id="lottery-prize-name">\u4F60\u7684\u4E0B\u4E00\u4EFD\u5E78\u8FD0</h3><strong id="lottery-multiplier" class="lottery-multiplier">\u6700\u9AD8 100\xD7</strong>
          <p id="lottery-result" class="lottery-result" role="status" aria-live="polite">\u6240\u6709\u7968\u4EF7\u4F7F\u7528\u76F8\u540C\u4E2D\u5956\u6982\u7387\u3002</p>
          <p id="lottery-ticket-id" class="lottery-ticket-id"></p><button id="lottery-reveal" type="button" class="club-action secondary" hidden>\u7ACB\u5373\u63ED\u6653</button>
        </div>
      </div>
      <aside class="club-card lottery-rules"><h3>\u4E2D\u5956\u6982\u7387 & \u672C\u6863\u8FD4\u8FD8</h3><p class="club-muted">\u500D\u6570\u5305\u542B\u7968\u4EF7\u3002\u6BCF\u6B21\u8D2D\u7968\u53EA\u547D\u4E2D\u4E00\u6863\uFF0C\u5404\u6863\u6982\u7387\u56FA\u5B9A\uFF0C\u4E0D\u968F\u7968\u4EF7\u6539\u53D8\u3002</p>
        <div class="lottery-table-wrap"><table><thead><tr><th scope="col">\u8FD4\u8FD8\u500D\u6570</th><th scope="col">\u6982\u7387</th><th scope="col">\u5230\u8D26\u7B79\u7801</th></tr></thead><tbody id="lottery-odds"></tbody></table></div>
        <p id="lottery-theory" class="lottery-theory"></p><p class="club-muted">59.875% \u672A\u4E2D\u5956\uFF1A\u8FD4\u8FD8 0\uFF0C\u635F\u5931\u6574\u5F20\u7968\u4EF7\u30021\xD7 \u4E3A\u56DE\u672C\u3002\u8D1F\u6570\u6A21\u5F0F\u7684 10 \u7B79\u7801\u4E0D\u8DB3\u4EE5\u8D2D\u4E70\u6700\u4F4E\u6863\u5F69\u7968\u3002</p>
      </aside>
    </div>
    <section class="club-card lottery-history"><h3>\u5F53\u524D\u73A9\u5BB6\u7684\u5F69\u7968\u8BB0\u5F55</h3><p class="club-muted">\u4FDD\u7559\u6700\u8FD1 30 \u5F20\uFF0C\u5237\u65B0\u540E\u4ECD\u53EF\u67E5\u770B\u3002\u5956\u91D1\u5DF2\u81EA\u52A8\u8BA1\u5165\u94B1\u5305\u3002</p><ol id="lottery-history"></ol></section>
  </div>
</section>

<section id="market-view" class="club-view" role="tabpanel" aria-labelledby="tab-market" hidden>
    <div class="club-shell">
        <div class="club-eyebrow">The back room \xB7 \u9ED1\u5E02</div><h2 class="club-title">\u9ED1\u5E02\u5546\u4EBA</h2>
        <p class="club-muted">\u82B1\u9AD8\u4EF7\u4E70\u786E\u5B9A\u7684\u7ED3\u679C\u3002\u6BCF\u5F20\u5361\u53EA\u7528\u4E00\u6B21\uFF0C\u7ED1\u5B9A\u8D2D\u4E70\u65F6\u7684\u4E0B\u6CE8\u91D1\u989D\uFF1B\u88C5\u5907\u540E\uFF0C\u4E0B\u4E00\u6B21 777 \u65CB\u8F6C\u81EA\u52A8\u4F7F\u7528\u3002</p>
        <div class="market-terms"><strong>\u5361\u4EF7\u4E0D\u5305\u542B\u4E0B\u6CE8\u3002</strong> \u4F7F\u7528\u65F6\u4ECD\u9700\u652F\u4ED8\u7ED1\u5B9A\u4E0B\u6CE8\u3002\u4EF7\u683C\u4F4E\u4E8E\u4FDD\u5E95\u6D3E\u5F69\uFF0C\u80FD\u83B7\u5F97\u51C0\u6536\u76CA\uFF1B\u6BCF\u4F4D\u73A9\u5BB6\u8D2D\u4E70\u4EFB\u610F\u5361\u540E\u51B7\u5374 15 \u5206\u949F\uFF0C\u8D2D\u4E70\u65F6\u987B\u7559\u8DB3\u4E0B\u6CE8\u7B79\u7801\u3002</div>
        <label class="club-field" for="market-stake">\u5361\u7247\u7ED1\u5B9A\u4E0B\u6CE8 / \u7B79\u7801</label>
        <input id="market-stake" class="club-input market-stake" type="text" pattern="[0-9]+" value="100" inputmode="numeric" aria-describedby="market-price-note">
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
          <p class="club-muted">\u8D1F\u6570\u6A21\u5F0F\u4E0B\uFF0C\u589E\u52A0\u7B79\u7801\u5148\u62B5\u6263\u8D1F\u6570\uFF1B\u6263\u9664\u7B79\u7801\u589E\u52A0\u8D1F\u6570\u8BB0\u5F55\u3002\u6BCF\u5C40 10 \u7B79\u7801\u5E95\u91D1\u72EC\u7ACB\u4FDD\u7559\u3002</p>
          <label for="admin-adjust-player" class="club-field">\u76EE\u6807\u73A9\u5BB6</label><select id="admin-adjust-player" class="club-select" required></select>
          <label for="admin-adjust-mode" class="club-field">\u8C03\u6574\u65B9\u5F0F</label><select id="admin-adjust-mode" class="club-select"><option value="add">\u589E\u52A0\u7B79\u7801</option><option value="remove">\u6263\u9664\u7B79\u7801</option></select>
          <label for="admin-adjust-amount" class="club-field">\u91D1\u989D / \u7B79\u7801</label><input id="admin-adjust-amount" type="text" pattern="[0-9]+" class="club-input" inputmode="numeric" required>
          <label for="admin-adjust-reason" class="club-field">\u5907\u6CE8\uFF08\u53EF\u9009\uFF09</label><input id="admin-adjust-reason" class="club-input" type="text" maxlength="120" placeholder="\u4F8B\u5982\u5956\u52B1\u3001\u4FEE\u6B63\u4F59\u989D">
          <div class="club-actions"><button type="submit" class="club-action" data-admin-action>\u786E\u8BA4\u8C03\u6574\u5E76\u8BB0\u5F55</button></div>
        </form>
        <form id="player-form" class="club-card"><h3>\u6DFB\u52A0\u73A9\u5BB6</h3><p class="club-muted">\u65B0\u73A9\u5BB6\u521D\u59CB 1,000 \u7B79\u7801\uFF1B\u53EF\u518D\u901A\u8FC7\u4F59\u989D\u8C03\u6574\u4FEE\u6539\u3002\u73A9\u5BB6\u4FDD\u5B58\u5230\u6570\u636E\u5E93\uFF0C\u65E0\u56FA\u5B9A\u4EBA\u6570\u4E0A\u9650\u3002</p><label class="club-field" for="player-name">\u65B0\u73A9\u5BB6\u540D\u79F0</label><input id="player-name" class="club-input" type="text" maxlength="24" required placeholder="\u73A9\u5BB6\u540D\u79F0"><div class="club-actions"><button type="submit" class="club-action" data-admin-action>\u6DFB\u52A0\u73A9\u5BB6</button></div></form>
        <div class="club-card club-wide"><h3>\u73A9\u5BB6\u5217\u8868</h3><p class="club-muted">\u5220\u9664\u9700\u8981\u518D\u6B21\u786E\u8BA4\u3002\u5B58\u5728\u672A\u6E05\u6B20\u6B3E\u3001\u501F\u51FA\u6B3E\u3001\u5F85\u786E\u8BA4\u534F\u8BAE\u6216\u672A\u7ED3\u7B97\u6E38\u620F\u65F6\u987B\u5148\u5904\u7406\uFF0C\u6700\u540E\u4E00\u540D\u73A9\u5BB6\u4E0D\u80FD\u5220\u9664\u3002</p><label class="club-field" for="admin-player-search">\u641C\u7D22\u73A9\u5BB6</label><input type="search" id="admin-player-search" class="club-input" maxlength="80" placeholder="\u8F93\u5165\u540D\u79F0\u67E5\u627E\u73A9\u5BB6"><p id="admin-player-count" class="club-muted" role="status"></p><div class="club-account-list" id="club-player-list"></div><div class="account-pagination"><button type="button" id="admin-player-prev" class="club-action secondary">\u4E0A\u4E00\u9875</button><span id="admin-player-page" class="club-muted" role="status"></span><button type="button" id="admin-player-next" class="club-action secondary">\u4E0B\u4E00\u9875</button></div></div>
      </div>
    </div>
  </div>
</section>

<section id="players-view" class="club-view" role="tabpanel" aria-labelledby="tab-players" hidden>
  <div class="club-shell"><div class="club-eyebrow">Players \xB7 \u73A9\u5BB6</div><h2 id="players-greeting" class="club-title">\u73A9\u5BB6\u5F80\u6765</h2>
    <p class="club-muted">\u8D60\u9001\u76F4\u63A5\u5230\u8D26\uFF1B\u501F\u6B3E\u7531\u51FA\u501F\u4EBA\u8BBE\u5B9A\u6761\u6B3E\u3001\u501F\u6B3E\u4EBA\u786E\u8BA4\u540E\u624D\u8F6C\u8D26\u3002\u53CC\u65B9\u901A\u8FC7\u53F3\u4E0A\u89D2\u9009\u62E9\u73A9\u5BB6\u5206\u522B\u64CD\u4F5C\uFF1B\u8D26\u6237\u53D8\u66F4\u7531\u670D\u52A1\u5668\u4FDD\u5B58\u3002\u73A9\u5BB6\u7BA1\u7406\u4EC5\u5728 ADMIN \u5165\u53E3\u5F00\u653E\u3002</p>
    <dl class="club-stat-row"><div><dt>\u94B1\u5305</dt><dd id="players-wallet">0</dd></div><div><dt>\u6B20\u5176\u4ED6\u73A9\u5BB6</dt><dd id="peer-debt">0</dd></div><div><dt>\u5E94\u6536\u501F\u6B3E</dt><dd id="peer-receivable">0</dd></div></dl>
    <section class="club-card account-directory" aria-labelledby="directory-title"><div class="account-section-heading"><div><div class="club-eyebrow">\u8D26\u6237\u603B\u89C8</div><h3 id="directory-title">\u6240\u6709\u73A9\u5BB6</h3></div><span id="directory-count" class="club-muted" role="status"></span></div>
      <div class="account-toolbar"><div><label class="club-field" for="directory-search">\u641C\u7D22\u73A9\u5BB6</label><input id="directory-search" class="club-input" type="search" maxlength="80" placeholder="\u8F93\u5165\u73A9\u5BB6\u540D\u79F0"></div><div><label class="club-field" for="directory-sort">\u6392\u5E8F</label><select id="directory-sort" class="club-select"><option value="name">\u540D\u79F0</option><option value="cash">\u94B1\u5305\u4ECE\u9AD8\u5230\u4F4E</option><option value="net">\u51C0\u8D44\u4EA7\u4ECE\u9AD8\u5230\u4F4E</option><option value="debt">\u6B20\u6B3E\u4ECE\u9AD8\u5230\u4F4E</option></select></div></div>
      <div class="account-table-wrap"><table class="account-table"><thead><tr><th scope="col">\u73A9\u5BB6</th><th scope="col">\u94B1\u5305</th><th scope="col">\u5168\u90E8\u6B20\u6B3E</th><th scope="col">\u51C0\u8D44\u4EA7</th><th scope="col">\u64CD\u4F5C</th></tr></thead><tbody id="directory-rows"></tbody></table></div>
      <p id="directory-empty" class="club-muted" hidden>\u6CA1\u6709\u627E\u5230\u5339\u914D\u7684\u73A9\u5BB6\uFF0C\u8BF7\u6362\u4E2A\u540D\u79F0\u3002</p>
      <div class="account-pagination"><button type="button" id="directory-prev" class="club-action secondary">\u4E0A\u4E00\u9875</button><span id="directory-page" class="club-muted" role="status"></span><button type="button" id="directory-next" class="club-action secondary">\u4E0B\u4E00\u9875</button></div>
      <p class="club-muted">\u51C0\u8D44\u4EA7\u5305\u542B\u94B1\u5305\u3001\u672A\u7ED3\u7B97\u4E0B\u6CE8\u548C\u5E94\u6536\u501F\u6B3E\uFF0C\u6263\u9664\u94F6\u884C\u3001\u9AD8\u5229\u8D37\u3001\u73A9\u5BB6\u501F\u6B3E\u53CA\u8D1F\u6570\u8BB0\u5F55\u3002\u8D1F\u6570\u6A21\u5F0F\u7684 10 \u7B79\u7801\u5E95\u91D1\u548C\u5361\u5305\u4E0D\u8BA1\u5165\u8D44\u4EA7\u3002</p>
    </section>
    <div class="club-grid">
      <form id="transfer-form" class="club-card"><h3>\u8D60\u9001\u7B79\u7801</h3><p class="club-muted">\u8FD9\u662F\u8D60\u9001\uFF0C\u4E0D\u4EA7\u751F\u6B20\u6B3E\uFF0C\u786E\u8BA4\u8D60\u9001\u540E\u7ACB\u5373\u8F6C\u5165\u5BF9\u65B9\u94B1\u5305\u3002</p>
        <label class="club-field" for="transfer-user">\u6536\u6B3E\u73A9\u5BB6</label><select id="transfer-user" class="club-select" required></select>
        <label class="club-field" for="transfer-amount">\u8D60\u9001\u91D1\u989D</label><input id="transfer-amount" class="club-input" type="text" pattern="[0-9]+" inputmode="numeric" required placeholder="\u4F8B\u5982 100">
        <div class="club-actions"><button type="submit" class="club-action" data-idle-only>\u786E\u8BA4\u8D60\u9001 \u2192</button></div>
      </form>
      <form id="peer-loan-form" class="club-card"><h3>\u5411\u73A9\u5BB6\u51FA\u501F</h3><p class="club-muted">\u5F53\u524D\u73A9\u5BB6\u4E3A\u51FA\u501F\u4EBA\u3002\u8BBE\u5B9A\u91D1\u989D\u3001\u5468\u671F\u53CA\u5229\u7387\u540E\u53D1\u51FA\u534F\u8BAE\uFF1B\u5BF9\u65B9\u63A5\u53D7\u524D\u4E0D\u6263\u6B3E\u3001\u4E0D\u8BA1\u606F\u3002\u63A5\u53D7\u65F6\u91CD\u65B0\u68C0\u67E5\u53CC\u65B9\u4F59\u989D\u3002</p>
        <label class="club-field" for="peer-loan-user">\u501F\u6B3E\u4EBA</label><select id="peer-loan-user" class="club-select" required></select>
        <label class="club-field" for="peer-loan-amount">\u501F\u6B3E\u91D1\u989D</label><input id="peer-loan-amount" class="club-input" type="text" pattern="[0-9]+" required inputmode="numeric" placeholder="\u4F8B\u5982 1,000">
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
    <div id="bank-recovery" class="club-card recovery-card" hidden><h3>\u8D1F\u6570\u8BB0\u5F55 <strong id="bank-recovery-deficit">-0</strong></h3><p>\u6BCF\u5C40\u56FA\u5B9A 10 \u7B79\u7801\u3002\u51C0\u4E8F\u635F\u589E\u52A0\u8D1F\u6570\uFF0C\u51C0\u76C8\u5229\u5148\u62B5\u8D1F\u6570\uFF1B\u8FD8\u6E05\u540E\uFF0C\u591A\u51FA\u7684\u76C8\u5229\u548C 10 \u7B79\u7801\u5E95\u91D1\u6062\u590D\u4E3A\u6B63\u5E38\u4F59\u989D\u3002</p><p class="club-muted">\u8FD9\u91CC\u7684\u8D1F\u6570\u5355\u72EC\u8BB0\u8D26\uFF0C\u94F6\u884C\u4E0E\u9AD8\u5229\u8D37\u6B20\u6B3E\u4ECD\u7136\u4FDD\u7559\u300210 \u7B79\u7801\u5E95\u91D1\u4EC5\u53EF\u7528\u4E8E\u6E38\u620F\u3002</p></div>
    <section class="club-card account-overview" aria-labelledby="account-overview-title"><div class="club-eyebrow">\u5F53\u524D\u73A9\u5BB6</div><h3 id="account-overview-title">\u8D44\u4EA7\u4E0E\u8D1F\u503A</h3>
      <dl class="club-stat-row account-stat-row"><div><dt>\u51C0\u8D44\u4EA7</dt><dd id="summary-net">0</dd></div><div><dt>\u5168\u90E8\u6B20\u6B3E</dt><dd id="summary-liabilities">0</dd></div><div><dt>\u672A\u7ED3\u7B97\u4E0B\u6CE8</dt><dd id="summary-reserved">0</dd></div><div><dt>\u5E94\u6536\u501F\u6B3E</dt><dd id="summary-receivable">0</dd></div></dl>
      <div class="account-section-heading forecast-heading"><h3>\u5229\u606F\u9884\u89C8</h3><div><label class="club-field" for="forecast-minutes">\u9884\u89C8\u591A\u4E45\u4EE5\u540E</label><select id="forecast-minutes" class="club-select"><option value="3">3 \u5206\u949F\u540E</option><option value="10" selected>10 \u5206\u949F\u540E</option><option value="30">30 \u5206\u949F\u540E</option><option value="60">60 \u5206\u949F\u540E</option></select></div></div>
      <p class="club-muted">\u5047\u8BBE\u671F\u95F4\u6CA1\u6709\u501F\u6B3E\u3001\u8FD8\u6B3E\u6216\u6E38\u620F\u8F93\u8D62\u3002\u6309\u7167\u6BCF\u7B14\u501F\u6B3E\u5269\u4F59\u8BA1\u606F\u65F6\u95F4\u590D\u5229\u8BA1\u7B97\uFF1B\u5B9E\u9645\u6B20\u6B3E\u4EE5\u7ED3\u7B97\u65F6\u4E3A\u51C6\u3002</p>
      <div class="account-table-wrap"><table class="account-table"><thead><tr><th scope="col">\u9879\u76EE</th><th scope="col">\u73B0\u5728</th><th scope="col" id="forecast-heading">10 \u5206\u949F\u540E</th></tr></thead><tbody id="forecast-rows"></tbody></table></div>
      <p id="forecast-growth" class="account-forecast-growth" role="status"></p>
      <div class="club-actions"><button type="button" id="bank-repay-all" class="club-action secondary">\u4E00\u952E\u8FD8\u6E05\u94F6\u884C</button><button type="button" id="shark-repay-all" class="club-action secondary">\u4E00\u952E\u8FD8\u6E05\u9AD8\u5229\u8D37</button></div><p id="repay-all-help" class="club-muted"></p>
    </section>
    <div class="club-grid">
      <form id="bank-form" class="club-card club-wide"><h3>\u94F6\u884C\u501F\u6B3E\u4E0E\u8FD8\u6B3E</h3><p class="club-muted">\u501F\u6B3E\u989D\u5EA6 100,000\uFF1B\u6BCF 10 \u5206\u949F\uFF0C\u672A\u8FD8\u6B20\u6B3E\u52A0 15%\u3002\u8FD8\u6B3E\u6062\u590D\u53EF\u501F\u989D\u5EA6\u3002</p><p id="bank-interest-progress" class="club-muted"></p>
        <label class="club-field" for="bank-amount">\u91D1\u989D / \u7B79\u7801</label><input id="bank-amount" class="club-input" type="text" pattern="[0-9]+" inputmode="numeric" required placeholder="\u4F8B\u5982 500">
        <div class="club-actions"><button id="bank-borrow" type="submit" class="club-action" value="borrow" data-idle-only>\u5411\u94F6\u884C\u501F\u6B3E</button><button type="submit" class="club-action secondary" value="repay" data-idle-only>\u507F\u8FD8\u94F6\u884C\u6B20\u6B3E</button></div>
      </form>
      <div id="shark-panel" class="club-card shark-panel club-wide" hidden><div class="club-eyebrow">\u6700\u540E\u7684\u7B79\u7801</div><h3>\u9AD8\u5229\u8D37</h3><p class="club-muted">\u6700\u591A\u501F 1,500,000\uFF1B\u6BCF 3 \u5206\u949F\uFF0C\u672A\u8FD8\u6B20\u6B3E\u52A0 125%\u3002\u53EA\u6709\u94F6\u884C\u989D\u5EA6\u8017\u5C3D\u3001\u94B1\u5305 \u2264 0 \u4E14\u65E0\u672A\u7ED3\u7B97\u4E0B\u6CE8\u65F6\u5F00\u653E\u501F\u6B3E\u3002</p><p>\u9AD8\u5229\u8D37\u6B20\u6B3E\uFF1A<strong id="shark-debt">0</strong> \xB7 \u5269\u4F59\u989D\u5EA6\uFF1A<strong id="shark-credit">1,500,000</strong></p><p id="shark-progress" class="club-muted"></p>
        <div id="shark-offer" hidden><form id="shark-borrow-form"><label class="club-field" for="shark-borrow-amount">\u501F\u5165\u91D1\u989D</label><input id="shark-borrow-amount" class="club-input" type="number" min="1" max="1500000" step="1" required inputmode="numeric" placeholder="\u6700\u591A 1,500,000"><div class="club-actions"><button type="submit" class="club-action" data-idle-only>\u501F\u5165\u9AD8\u5229\u8D37 \xB7 \u6BCF 3 \u5206\u949F 125%</button></div></form></div>
        <div id="shark-repayment" hidden><form id="shark-repay-form"><label class="club-field" for="shark-repay-amount">\u507F\u8FD8\u9AD8\u5229\u8D37</label><input id="shark-repay-amount" class="club-input" type="text" pattern="[0-9]+" required inputmode="numeric" placeholder="\u8FD8\u6B3E\u91D1\u989D"><div class="club-actions"><button type="submit" class="club-action secondary" data-idle-only>\u507F\u8FD8\u9AD8\u5229\u8D37</button></div></form></div>
      </div>
      <div class="club-card club-wide"><div class="account-section-heading"><h3>\u8D26\u6237\u6D3B\u52A8</h3><button type="button" class="club-action secondary" id="activity-export">\u5BFC\u51FA\u7B5B\u9009\u8BB0\u5F55 CSV</button></div><label class="club-field" for="activity-search">\u641C\u7D22\u6D41\u6C34</label><input type="search" id="activity-search" class="club-input" maxlength="100" placeholder="\u73A9\u5BB6\u540D\u79F0\u3001\u6E38\u620F\u3001\u501F\u6B3E\u6216\u5907\u6CE8"><p id="activity-count" class="club-muted" role="status"></p><ol id="club-ledger" class="club-ledger" aria-label="Table activity"></ol></div>
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
                    <input id="roulette-custom-amount" type="text" pattern="[0-9]+" inputmode="numeric" placeholder="Amount" required aria-describedby="roulette-custom-selected">
                    <button id="roulette-custom-apply" type="submit">Use amount</button>
                    <span id="roulette-custom-selected">Whole chips \xB7 no maximum</span>
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
(function (root) {
    'use strict';
    const safe = BigInt(Number.MAX_SAFE_INTEGER);
    function big(value) {
        if (typeof value === 'bigint') return value;
        if (typeof value === 'number' && Number.isSafeInteger(value)) return BigInt(value);
        if (typeof value === 'string' && /^-?\\d+$/.test(value.trim())) return BigInt(value.trim());
        throw new Error('\u8BF7\u8F93\u5165\u5B8C\u6574\u7684\u6574\u6570\u7B79\u7801\u91D1\u989D\uFF08\u81F3\u5C11 1\uFF09\uFF0C\u4E0D\u652F\u6301\u5C0F\u6570\u6216\u79D1\u5B66\u8BA1\u6570\u6CD5\u3002');
    }
    const normalize = value => value >= -safe && value <= safe ? Number(value) : value;
    const parse = value => normalize(big(value));
    const valid = value => typeof value === 'bigint' || (typeof value === 'number' && Number.isSafeInteger(value));
    const add = (...values) => normalize(values.reduce((sum, value) => sum + big(value), 0n));
    const sub = (a, b) => normalize(big(a) - big(b));
    const mul = (a, b) => normalize(big(a) * big(b));
    function ratio(value, numerator, denominator, ceiling = false) {
        const product = big(value) * big(numerator), divisor = big(denominator);
        if (product < 0n || divisor <= 0n) throw new Error('Invalid chip ratio.');
        return normalize((product + (ceiling && product ? divisor - 1n : 0n)) / divisor);
    }
    const compare = (a, b) => big(a) < big(b) ? -1 : big(a) > big(b) ? 1 : 0;
    const min = (a, b) => compare(a, b) <= 0 ? a : b;
    const max = (a, b) => compare(a, b) >= 0 ? a : b;
    function positive(value) {
        const result = parse(value);
        if (result <= 0) throw new Error('\u8BF7\u8F93\u5165\u81F3\u5C11 1 \u7B79\u7801\u7684\u6574\u6570\u91D1\u989D\u3002');
        return result;
    }
    const revive = (_, value) => value && typeof value === 'object' && !Array.isArray(value)
        && Object.keys(value).length === 1 && typeof value.$chips === 'string' && /^-?\\d+$/.test(value.$chips)
        ? parse(value.$chips) : value;
    const stringify = value => JSON.stringify(value, (_, item) => typeof item === 'bigint' ? {$chips:String(item)} : item);
    const decode = text => JSON.parse(text, revive);
    root.CasinoMoney = { parse, positive, valid, add, sub, mul, ratio, compare, min, max,
        abs:value => value < 0 ? sub(0,value) : value,
        tryParse:value => {try {return parse(value);} catch {return null;}},
        stringify, parseJSON:decode, hydrate:value => decode(stringify(value)) };
})(globalThis);

(function (root) {
    'use strict';
    if (!root.CasinoMoney && typeof require === 'function') require('./money.js');
    const M = root.CasinoMoney, total = 10000000;
    const prices = Object.freeze([1000, 10000, 1000000]);
    // Ten million equally likely tickets represent every supplied percentage exactly.
    const tiers = Object.freeze([
        {weight:500, numerator:200, name:'\u7279\u7B49\u5956'},
        {weight:2000, numerator:100, name:'\u4E00\u7B49\u5956'},
        {weight:30000, numerator:20, name:'\u4E8C\u7B49\u5956'},
        {weight:60000, numerator:16, name:'\u4E09\u7B49\u5956'},
        {weight:120000, numerator:10, name:'\u56DB\u7B49\u5956'},
        {weight:250000, numerator:8, name:'\u4E94\u7B49\u5956'},
        {weight:350000, numerator:5, name:'\u516D\u7B49\u5956'},
        {weight:450000, numerator:4, name:'\u4E03\u7B49\u5956'},
        {weight:750000, numerator:3, name:'\u516B\u7B49\u5956'},
        {weight:2000000, numerator:2, name:'\u4FDD\u672C\u672B\u7B49\u5956'},
        {weight:5987500, numerator:0, name:'\u672A\u4E2D\u5956'}
    ].map(Object.freeze));
    function price(value) {
        const amount = M.positive(value);
        if (!prices.includes(amount)) throw new Error('\u5F69\u7968\u7968\u4EF7\u53EA\u80FD\u9009\u62E9 1,000\u300110,000 \u6216 1,000,000 \u7B79\u7801\u3002');
        return amount;
    }
    function fromTicket(value, ticket) {
        const wager = price(value);
        if (!Number.isInteger(ticket) || ticket < 0 || ticket >= total) throw new Error('\u5F69\u7968\u5F00\u5956\u7ED3\u679C\u65E0\u6548\u3002');
        let end = 0;
        const tier = tiers.findIndex(item => ticket < (end += item.weight)), item = tiers[tier];
        const payout = M.ratio(wager, item.numerator, 2);
        return {game:'lottery', ticket, tier, wager, multiplier:item.numerator / 2, payout, net:M.sub(payout,wager)};
    }
    function drawTicket(random) {
        // Rejection sampling avoids rounding/modulo bias for the rarest prizes.
        const range = 4294967296, limit = Math.floor(range / total) * total;
        for (let attempt = 0; attempt < 64; attempt++) {
            const roll = random();
            if (typeof roll !== 'number' || !(roll >= 0 && roll < 1)) throw new Error('\u65E0\u6CD5\u751F\u6210\u6709\u6548\u5F69\u7968\uFF0C\u8BF7\u91CD\u8BD5\u3002');
            const value = Math.floor(roll * range);
            if (value < limit) return value % total;
        }
        throw new Error('\u65E0\u6CD5\u751F\u6210\u6709\u6548\u5F69\u7968\uFF0C\u8BF7\u91CD\u8BD5\u3002');
    }
    function draw(value, random, jackpot = false) {
        const amount = price(value);
        return fromTicket(amount, jackpot ? 0 : drawTicket(random));
    }
    function validHistory(result) {
        try {
            if (!result || result.game !== 'lottery' || typeof result.id !== 'string' || typeof result.time !== 'string') return false;
            const expected = fromTicket(result.wager, result.ticket);
            return ['tier','multiplier','payout','net'].every(key => result[key] === expected[key]);
        } catch { return false; }
    }
    const expectedNumerator = tiers.reduce((sum,item) => sum + item.weight * item.numerator, 0);
    root.CasinoLottery = {prices, tiers, total, expectedNumerator, price, fromTicket, drawTicket, draw, validHistory};
})(globalThis);

(function(root) {
    'use strict';
    if (!root.CasinoMoney && typeof require === 'function') require('./money.js');
    const M = root.CasinoMoney;
    const rows = 12;
    const tables = Object.freeze({
        low:Object.freeze([800,400,200,140,110,70,40,70,110,140,200,400,800]),
        medium:Object.freeze([2500,800,300,150,100,60,20,60,100,150,300,800,2500]),
        high:Object.freeze([10000,1500,400,200,60,20,0,20,60,200,400,1500,10000])
    });
    const lanes = Object.freeze({left:.44,center:.5,right:.56});
    const sumReturns = Object.freeze({4:61,5:31,6:19,7:13,8:9,9:7,10:7,11:7,12:7,13:9,14:13,15:19,16:31,17:61});
    const wager = value => M.positive(value);
    const sample = random => {const n=random();if(!(n>=0&&n<1))throw new Error('\u65E0\u6CD5\u751F\u6210\u6709\u6548\u7ED3\u679C\uFF0C\u8BF7\u91CD\u8BD5\u3002');return n;};
    function plinkoSettings(risk,lane) {
        if(!Object.hasOwn(tables,risk)||!Object.hasOwn(lanes,lane))throw new Error('\u8BF7\u9009\u62E9\u6709\u6548\u7684\u98CE\u9669\u548C\u843D\u7403\u53E3\u3002');
        return {table:tables[risk],rightChance:lanes[lane]};
    }
    function plinkoResult(value,risk,lane,path) {
        value=wager(value);const {table}=plinkoSettings(risk,lane);
        if(!Array.isArray(path)||path.length!==rows||!path.every(bit=>bit===0||bit===1))throw new Error('\u5F39\u73E0\u8DEF\u5F84\u65E0\u6548\u3002');
        const pocket=path.reduce((sum,bit)=>sum+bit,0),multiplier=table[pocket]/100,payout=M.ratio(value,table[pocket],100);
        return {game:'plinko',wager:value,risk,lane,path:[...path],pocket,multiplier,payout,net:M.sub(payout,value)};
    }
    function plinko(value,risk,lane,random,jackpot=false) {
        const {rightChance}=plinkoSettings(risk,lane);wager(value);
        const path=Array.from({length:rows},()=>jackpot?(lane==='right'?1:0):Number(sample(random)<rightChance));
        return plinkoResult(value,risk,lane,path);
    }
    function pocketProbability(pocket,lane) {
        if(!Number.isInteger(pocket)||pocket<0||pocket>rows||!Object.hasOwn(lanes,lane))throw new Error('\u69FD\u4F4D\u65E0\u6548\u3002');
        let combinations=1;for(let i=1;i<=pocket;i++)combinations=combinations*(rows-i+1)/i;
        return combinations*lanes[lane]**pocket*(1-lanes[lane])**(rows-pocket);
    }
    function pathPoints(path,lane) {
        plinkoResult(1,'low',lane,path);let rights=0;
        const points=[{x:{left:-1.8,center:0,right:1.8}[lane],y:6.3},{x:0,y:5.22}];
        for(let i=1;i<=rows;i++){rights+=path[i-1];points.push({x:(rights-i/2)*.82,y:5.22-i*.72});}
        points.push({x:(rights-6)*.82,y:-4.05});return points;
    }
    function diceSettings(kind,target) {
        if(!['small','big','odd','even','triple','sum'].includes(kind))throw new Error('\u8BF7\u9009\u62E9\u6709\u6548\u7684\u9AB0\u5B9D\u4E0B\u6CE8\u3002');
        if(kind==='sum'&&(!Number.isInteger(target)||!Object.hasOwn(sumReturns,target)))throw new Error('\u6307\u5B9A\u603B\u70B9\u6570\u9700\u4E3A 4\u201317\u3002');
        return kind==='sum'?sumReturns[target]:kind==='triple'?31:2;
    }
    function diceResult(value,kind,target,faces) {
        value=wager(value);const maxReturn=diceSettings(kind,target);
        if(!Array.isArray(faces)||faces.length!==3||!faces.every(n=>Number.isInteger(n)&&n>=1&&n<=6))throw new Error('\u9AB0\u5B50\u7ED3\u679C\u65E0\u6548\u3002');
        const total=faces.reduce((sum,n)=>sum+n,0),triple=faces.every(n=>n===faces[0]);
        const won=kind==='triple'?triple:kind==='sum'?total===target:!triple&&(kind==='small'?total>=4&&total<=10:kind==='big'?total>=11&&total<=17:kind==='odd'?total%2===1:total%2===0);
        const multiplier=won?maxReturn:0,payout=M.mul(value,multiplier);
        return {game:'dice',wager:value,kind,target:kind==='sum'?target:null,dice:[...faces],total,triple,multiplier,payout,net:M.sub(payout,value)};
    }
    function dice(value,kind,target,random,jackpot=false) {
        diceSettings(kind,target);wager(value);let faces;
        if(jackpot){
            outer:for(let a=1;a<=6;a++)for(let b=1;b<=6;b++)for(let c=1;c<=6;c++)if(diceResult(value,kind,target,[a,b,c]).payout>0){faces=[a,b,c];break outer;}
        }else faces=Array.from({length:3},()=>1+Math.floor(sample(random)*6));
        return diceResult(value,kind,target,faces);
    }
    function diceRotation(face) {
        const rotations={1:{x:0,z:Math.PI/2},2:{x:0,z:0},3:{x:-Math.PI/2,z:0},4:{x:Math.PI/2,z:0},5:{x:0,z:Math.PI},6:{x:0,z:-Math.PI/2}};
        if(!Object.hasOwn(rotations,face))throw new Error('\u9AB0\u5B50\u70B9\u6570\u65E0\u6548\u3002');return rotations[face];
    }
    function validHistory(result) {
        try {
            if(!result||typeof result.id!=='string'||typeof result.time!=='string')return false;
            const expected=result.game==='plinko'?plinkoResult(result.wager,result.risk,result.lane,result.path):result.game==='dice'?diceResult(result.wager,result.kind,result.target,result.dice):null;
            return Boolean(expected&&result.payout===expected.payout&&result.net===expected.net&&result.multiplier===expected.multiplier&&(result.game!=='dice'||result.total===expected.total));
        }catch{return false;}
    }
    root.CasinoArcade={rows,tables,lanes,sumReturns,plinkoSettings,plinkoResult,plinko,pocketProbability,pathPoints,diceSettings,diceResult,dice,diceRotation,validHistory};
})(globalThis);

/* Shared play-chip accounting. Kept independent of the rendering code. */
(function (root) {
    'use strict';
    if (!root.CasinoMoney && typeof require === 'function') require('./money.js');
    const M = root.CasinoMoney;
    const KEY = 'roulette-club-v1';
    const LIMIT = 100000;
    const SHARK_LIMIT = 1500000;
    const BANK_PERIOD = 10 * 60000, SHARK_PERIOD = 3 * 60000, MARKET_COOLDOWN = 15 * 60000;
    const INTEREST_POLICY = 2;
    const DEBT_CAP = 1000000000;
    const symbols = ['7', '\u{1F48E}', 'BAR', '\u{1F514}', '\u{1F340}', '\u{1F352}'];
    const triples = [50, 25, 20, 15, 10, 5];
    const reelStrip = [0, 5, 3, 1, 4, 2, 0, 5, 4, 3, 5, 1];
    const emptyBets = () => ({ RED: 0, BLACK: 0, GREEN: 0, ODD: 0, EVEN: 0, numbers: {} });
    const sumBets = bets => M.add(...['RED', 'BLACK', 'GREEN', 'ODD', 'EVEN'].map(k => bets[k]), ...Object.values(bets.numbers));
    const integer = (n, max = null) => M.valid(n) && n >= 0 && (max === null || (typeof n === 'number' && n <= max));
    const cards = Object.freeze({
        seven: Object.freeze({ name: '\u4FDD\u5E95 777', factor: 35, multiplier: 50, reels: [0, 6, 0], symbol: '7 7 7' }),
        diamonds: Object.freeze({ name: '\u4FDD\u5E95\u4E09\u94BB\u77F3', factor: 18, multiplier: 25, reels: [3, 11, 3], symbol: '\u{1F48E} \u{1F48E} \u{1F48E}' }),
        bars: Object.freeze({ name: '\u4FDD\u5E95\u4E09 BAR', factor: 14, multiplier: 20, reels: [5, 5, 5], symbol: 'BAR BAR BAR' })
    });
    const economyDefaults = () => ({ sharkDebt: 0, bankInterestAt: null, sharkInterestAt: null, marketAvailableAt: 0, cards: [], armedCardId: null });
    const timestamp = value => value === null || (Number.isSafeInteger(value) && value >= 0);
    function growDebt(balance, rateBps, periods, ceiling = DEBT_CAP) {
        if (rateBps === 0) return balance;
        for (let i = 0; i < periods && (ceiling === null || balance < ceiling); i++) {
            balance = M.add(balance, M.ratio(balance, rateBps, 10000, true));
            if (ceiling !== null) balance = M.min(ceiling, balance);
        }
        return balance;
    }
    function validEconomy(user) {
        return integer(user.sharkDebt) && timestamp(user.bankInterestAt) && timestamp(user.sharkInterestAt) && timestamp(user.marketAvailableAt)
            && (user.recovery == null || (typeof user.recovery === 'object' && integer(user.recovery.deficit)))
            && Array.isArray(user.cards) && user.cards.length <= 50
            && user.cards.every(card => card && typeof card.id === 'string' && Object.hasOwn(cards, card.type)
                && integer(card.stake) && card.stake > 0)
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
                    const saved = M.parseJSON(raw);
                    if (Array.isArray(saved.users)) saved.users = saved.users.map(user => ({ ...economyDefaults(), ...user }));
                    saved.loans ??= [];
                    if (saved.version !== 1 || !Array.isArray(saved.users) || saved.users.length < 1
                        || !Array.isArray(saved.ledger) || !Array.isArray(saved.loans) || saved.loans.length > 200 || !saved.loans.every(loan => this.validLoan(loan, saved.users)) || new Set(saved.loans.map(loan => loan.id)).size !== saved.loans.length || !saved.users.some(u => u.id === saved.activeId)
                        || new Set(saved.users.map(u => u.id)).size !== saved.users.length
                        || !saved.users.every(u => typeof u.id === 'string' && typeof u.name === 'string'
                            && u.name.trim().length > 0 && u.name.length <= 24 && M.valid(u.balance)
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
                            u.balance = M.add(u.balance, sumBets(u.bets));
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
            for (const user of this.data.users) this.prepareRecovery(user);
            this.save();
        }
        get money() { return M; }
        get active() { return this.data.users.find(u => u.id === this.data.activeId); }
        get availableCredit() { return M.max(0, M.sub(LIMIT, this.active.debt)); }
        get availableSharkCredit() { return M.max(0, M.sub(SHARK_LIMIT, this.active.sharkDebt)); }
        get canBorrowShark() { return !this.lock && !this.active.recovery && this.availableCredit === 0 && this.active.balance <= 0 && sumBets(this.active.bets) === 0 && this.availableSharkCredit > 0; }
        get armedCard() { return this.active.cards.find(card => card.id === this.active.armedCardId) || null; }
        prepareRecovery(user = this.active) {
            if (!user || user.recovery || user.balance > 0 || !(user.sharkDebt > 0)
                || sumBets(user.bets) || user.pendingRoulette || (user.blackjack && user.blackjack.phase !== 'settled')) return false;
            user.recovery = { deficit: M.max(0, M.sub(0, user.balance)) }; user.balance = 10;
            this.record(\`\${user.name} \xB7 \u9AD8\u5229\u8D37\u7B79\u7801\u5DF2\u7528\u5C3D\uFF0C\u8FDB\u5165\u8D1F\u6570\u6A21\u5F0F\uFF1A-\${user.recovery.deficit.toLocaleString()}\uFF0C\u6BCF\u5C40\u53EF\u7528 10\u3002\`);
            return true;
        }
        ensureCashWallet(user = this.active) {
            if (user.recovery) throw new Error('\u8D1F\u6570\u6A21\u5F0F\u7684 10 \u7B79\u7801\u4EC5\u7528\u4E8E\u6E38\u620F\uFF0C\u4E0D\u80FD\u8D60\u9001\u3001\u51FA\u501F\u3001\u8D2D\u4E70\u6216\u8FD8\u6B3E\u3002\u76C8\u5229\u5148\u62B5\u6263\u8D1F\u6570\u3002');
        }
        recoveryNet(user, net) {
            const remaining = M.sub(user.recovery.deficit, net);
            if (net > 0 && remaining <= 0) { user.recovery = null; user.balance = M.sub(10, remaining); }
            else { user.recovery.deficit = M.max(0, remaining); user.balance = 10; }
        }
        credit(user, amount) {
            if (user.recovery) this.recoveryNet(user, amount);
            else user.balance = M.add(user.balance, amount);
        }
        ensureIdle() {
            if (this.lock) throw new Error('Wait for the current spin to finish.');
            if (this.accrueInterest()) this.save();
        }
        amount(value, maximum = null) {
            const amount = M.positive(value);
            if (maximum !== null && amount > maximum) throw new Error('Enter a whole number from 1 to ' + maximum.toLocaleString() + '.');
            return amount;
        }
        save() {
            this.accrueInterest();
            try { if (this.storage) this.storage.setItem(KEY, M.stringify(this.data)); }
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
                && integer(loan.principal) && loan.principal > 0 && integer(loan.balance)
                && integer(loan.rateBps, 10000) && integer(loan.periodMs, 1440 * 60000) && loan.periodMs >= 60000 && loan.periodMs % 60000 === 0
                && timestamp(loan.createdAt) && timestamp(loan.interestAt)
                && ['pending', 'active', 'declined', 'cancelled', 'repaid'].includes(loan.status)
                && (!['pending', 'active'].includes(loan.status) || [loan.lenderId, loan.borrowerId].every(id => users.some(user => user.id === id)))
                && (loan.status !== 'active' || (loan.interestAt !== null && loan.balance > 0));
        }
        offerLoan(borrowerId, value, ratePercent, minutes = 10) {
            this.ensureIdle();
            this.ensureCashWallet();
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
            this.ensureCashWallet(borrower); if (lender) this.ensureCashWallet(lender);
            if (!lender || lender.balance < loan.principal) throw new Error('\u51FA\u501F\u4EBA\u5F53\u524D\u4F59\u989D\u4E0D\u8DB3\uFF0C\u5C1A\u672A\u6263\u6B3E\u3002');
            lender.balance = M.sub(lender.balance, loan.principal); borrower.balance = M.add(borrower.balance, loan.principal);
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
            this.ensureCashWallet();
            const loan = this.data.loans.find(item => item.id === id);
            if (!loan || loan.status !== 'active' || loan.borrowerId !== this.active.id) throw new Error('\u53EA\u80FD\u507F\u8FD8\u81EA\u5DF1\u7684\u6709\u6548\u501F\u6B3E\u3002');
            const amount = this.amount(value === 'all' ? loan.balance : value);
            const lender = this.data.users.find(user => user.id === loan.lenderId), borrower = this.active;
            if (amount > loan.balance || amount > borrower.balance) throw new Error('\u8FD8\u6B3E\u8D85\u8FC7\u6B20\u6B3E\u6216\u94B1\u5305\u4F59\u989D\u3002');
            if (!lender) throw new Error('\u51FA\u501F\u4EBA\u4E0D\u5B58\u5728\u3002');
            borrower.balance = M.sub(borrower.balance, amount); this.credit(lender, amount); loan.balance = M.sub(loan.balance, amount);
            if (loan.balance === 0) { loan.status = 'repaid'; loan.interestAt = null; }
            this.record(\`\${borrower.name} \u2192 \${lender.name}: \u507F\u8FD8\u73A9\u5BB6\u501F\u6B3E \${amount.toLocaleString()}\u3002\`); this.save();
        }
        deletePlayer(id) {
            this.ensureIdle();
            const user = this.data.users.find(item => item.id === id);
            if (!user) throw new Error('\u8BE5\u73A9\u5BB6\u4E0D\u5B58\u5728\u3002');
            if (this.data.users.length === 1) throw new Error('\u81F3\u5C11\u4FDD\u7559\u4E00\u540D\u73A9\u5BB6\u3002');
            if (user.debt || user.sharkDebt || user.recovery?.deficit || sumBets(user.bets) || user.pendingRoulette || (user.blackjack && user.blackjack.phase !== 'settled')
                || this.data.loans.some(loan => ['pending', 'active'].includes(loan.status) && [loan.lenderId, loan.borrowerId].includes(id))) throw new Error('\u8BF7\u5148\u7ED3\u6E05\u6B20\u6B3E\u3001\u501F\u51FA\u6B3E\u3001\u5F85\u786E\u8BA4\u534F\u8BAE\u548C\u6E38\u620F\u4E0B\u6CE8\uFF0C\u518D\u5220\u9664\u73A9\u5BB6\u3002');
            this.data.users = this.data.users.filter(item => item.id !== id);
            if (this.data.activeId === id) this.data.activeId = this.data.users[0].id;
            this.record(\`\u5DF2\u5220\u9664\u73A9\u5BB6 \${user.name}\uFF0C\u5176\u94B1\u5305\u548C\u5361\u5305\u5DF2\u79FB\u9664\u3002\`); this.save();
        }
        adminAdjust(id, mode, value, reason = '') {
            this.ensureIdle();
            const user = this.data.users.find(item => item.id === id), amount = this.amount(value);
            if (!user || !['add', 'remove'].includes(mode)) throw new Error('\u8BF7\u9009\u62E9\u73A9\u5BB6\u53CA\u6709\u6548\u7684\u8C03\u6574\u65B9\u5F0F\u3002');
            if (typeof reason !== 'string' || reason.length > 120) throw new Error('\u5907\u6CE8\u6700\u591A 120 \u4E2A\u5B57\u7B26\u3002');
            const delta = mode === 'add' ? amount : M.sub(0, amount);
            if (user.recovery) {
                this.recoveryNet(user, delta);
            } else {
                if (M.add(user.balance, delta) < 0) throw new Error('\u6263\u9664\u91D1\u989D\u4E0D\u80FD\u8D85\u8FC7\u94B1\u5305\u4F59\u989D\u3002');
                user.balance = M.add(user.balance, delta);
            }
            this.record(\`\u7BA1\u7406\u5458 \xB7 \${user.name} \${mode === 'add' ? '\u589E\u52A0' : '\u6263\u9664'} \${amount.toLocaleString()} \u7B79\u7801\${reason.trim() ? ' \xB7 ' + reason.trim() : ''}\u3002\`);
            this.save();
        }
        transfer(id, value) {
            this.ensureIdle();
            this.ensureCashWallet();
            const n = this.amount(value), from = this.active;
            const to = this.data.users.find(u => u.id === id);
            if (!to || to === from) throw new Error('Choose another player to receive the chips.');
            if (n > from.balance) throw new Error('Your wallet does not have enough chips.');
            from.balance = M.sub(from.balance, n);
            this.credit(to, n);
            this.record(\`\${from.name} \u2192 \${to.name}: \${n.toLocaleString()} chips transferred.\`);
            this.save();
        }
        borrow(value) {
            this.ensureIdle();
            this.ensureCashWallet();
            const n = this.amount(value), u = this.active;
            if (n > this.availableCredit) throw new Error(\`You can borrow up to \${this.availableCredit.toLocaleString()} more chips.\`);
            u.balance = M.add(u.balance, n);
            if (u.debt === 0) { u.bankInterestAt = this.now(); u.bankInterestPolicy = INTEREST_POLICY; }
            u.debt = M.add(u.debt, n);
            this.record(\`Bank \u2192 \${u.name}: borrowed \${n.toLocaleString()} chips.\`);
            this.save();
        }
        repay(value) {
            this.ensureIdle();
            this.ensureCashWallet();
            const u = this.active, n = this.amount(value === 'all' ? u.debt : value);
            if (n > u.debt) throw new Error('That amount is greater than your outstanding debt.');
            if (n > u.balance) throw new Error('Your wallet does not have enough chips to repay that amount.');
            u.balance = M.sub(u.balance, n);
            u.debt = M.sub(u.debt, n);
            if (u.debt === 0) u.bankInterestAt = null;
            this.record(\`\${u.name} \u2192 Bank: repaid \${n.toLocaleString()} chips.\`);
            this.save();
        }
        borrowShark(value) {
            this.ensureIdle();
            const n = this.amount(value, SHARK_LIMIT), user = this.active;
            if (!this.canBorrowShark) throw new Error('\u9AD8\u5229\u8D37\u4EC5\u5728\u94F6\u884C\u989D\u5EA6\u8017\u5C3D\u3001\u94B1\u5305 \u2264 0 \u4E14\u6CA1\u6709\u672A\u7ED3\u7B97\u4E0B\u6CE8\u65F6\u5F00\u653E\u3002');
            if (n > this.availableSharkCredit) throw new Error('\u9AD8\u5229\u8D37\u5269\u4F59\u989D\u5EA6\u4E0D\u8DB3\u3002');
            if (user.sharkDebt === 0) { user.sharkInterestAt = this.now(); user.sharkInterestPolicy = INTEREST_POLICY; }
            user.balance = M.add(user.balance, n); user.sharkDebt = M.add(user.sharkDebt, n);
            this.record(\`\u9AD8\u5229\u8D37 \u2192 \${user.name}: \u501F\u5165 \${n.toLocaleString()}\uFF1B\u6BCF 3 \u5206\u949F\u8BA1\u606F 125%\u3002\`);
            this.save();
        }
        repayShark(value) {
            this.ensureIdle();
            this.ensureCashWallet();
            const user = this.active, n = this.amount(value === 'all' ? user.sharkDebt : value);
            if (n > user.sharkDebt) throw new Error('\u8FD8\u6B3E\u4E0D\u80FD\u8D85\u8FC7\u9AD8\u5229\u8D37\u6B20\u6B3E\u3002');
            if (n > user.balance) throw new Error('\u94B1\u5305\u4F59\u989D\u4E0D\u8DB3\u4EE5\u8FD8\u6B3E\u3002');
            user.balance = M.sub(user.balance, n); user.sharkDebt = M.sub(user.sharkDebt, n);
            if (user.sharkDebt === 0) user.sharkInterestAt = null;
            this.record(\`\${user.name} \u2192 \u9AD8\u5229\u8D37: \u507F\u8FD8 \${n.toLocaleString()}\u3002\`);
            this.save();
        }
        repayAll(kind, id) {
            if (kind === 'bank') return this.repay('all');
            if (kind === 'shark') return this.repayShark('all');
            if (kind === 'peer') return this.repayLoan(id, 'all');
            throw new Error('\u8BF7\u9009\u62E9\u94F6\u884C\u3001\u9AD8\u5229\u8D37\u6216\u4E00\u7B14\u73A9\u5BB6\u501F\u6B3E\u3002');
        }
        projectDebts(minutes, id = this.active.id) {
            if (!integer(minutes, 1440)) throw new Error('\u9884\u89C8\u65F6\u95F4\u9700\u4E3A 0\u20131,440 \u5206\u949F\u3002');
            const user = this.data.users.find(person => person.id === id);
            if (!user) throw new Error('\u8BF7\u9009\u62E9\u6709\u6548\u73A9\u5BB6\u3002');
            const now = this.now(), until = now + minutes * 60000;
            const projected = (debt, clock, period, rate, ceiling = DEBT_CAP) => growDebt(debt, rate, Math.max(0, Math.floor((until - (clock ?? now)) / period)), ceiling);
            const bank = projected(user.debt, user.bankInterestAt, BANK_PERIOD, 1500);
            const shark = projected(user.sharkDebt, user.sharkInterestAt, SHARK_PERIOD, 12500);
            const peer = this.data.loans.filter(loan => loan.status === 'active' && loan.borrowerId === id)
                .reduce((total, loan) => M.add(total, projected(loan.balance, loan.interestAt, loan.periodMs, loan.rateBps, null)), 0);
            const negative = user.recovery?.deficit || 0;
            return { bank, shark, peer, negative, total: M.add(bank, shark, peer, negative) };
        }
        completeRound(net = 0) {
            this.accrueInterest();
            const user = this.active;
            if (user.recovery) {
                this.recoveryNet(user, net);
                this.record(\`\${user.name} \xB7 \u8D1F\u6570\u6A21\u5F0F\u51C0\u8F93\u8D62 \${net >= 0 ? '+' : ''}\${net.toLocaleString()}\uFF1B\${user.recovery ? '\u8BB0\u5F55 -' + user.recovery.deficit.toLocaleString() + '\uFF0C\u4E0B\u4E00\u5C40\u53EF\u7528 10' : '\u5DF2\u8FD8\u6E05\u8D1F\u6570\uFF0C\u6062\u590D\u6B63\u5E38\u4F59\u989D ' + user.balance.toLocaleString()}\u3002\`);
            } else this.prepareRecovery(user);
        }
        accrueInterest() {
            const now = this.now(); let changed = false;
            const accrue = (target, debt, clock, period, rate, label, ceiling = DEBT_CAP) => {
                if (target[debt] <= 0) { if (target[clock] !== null) { target[clock] = null; changed = true; } return; }
                if (target[clock] === null) { target[clock] = now; changed = true; return; }
                const periods = Math.floor((now - target[clock]) / period);
                if (periods <= 0) return;
                const before = target[debt]; target[debt] = growDebt(before, rate, periods, ceiling);
                target[clock] += periods * period; changed = true;
                if (target[debt] !== before) this.record(\`\${label} \xB7 \${periods} \u671F\u5229\u606F +\${M.sub(target[debt], before).toLocaleString()}\uFF0C\u6B20\u6B3E \${target[debt].toLocaleString()}\u3002\`);
            };
            const account = (user, debt, clock, policy, period, rate, oldPeriod, oldRate, label) => {
                if (user[debt] > 0 && user[policy] !== INTEREST_POLICY) {
                    // Settle completed old periods once before starting the new schedule.
                    accrue(user, debt, clock, oldPeriod, oldRate, label);
                    user[policy] = INTEREST_POLICY;
                    user[clock] = Math.max(now, user[clock] ?? now);
                    changed = true;
                }
                accrue(user, debt, clock, period, rate, label);
            };
            for (const user of this.data.users) {
                account(user, 'debt', 'bankInterestAt', 'bankInterestPolicy', BANK_PERIOD, 1500, 30 * 60000, 50, user.name + ' \xB7 \u94F6\u884C');
                account(user, 'sharkDebt', 'sharkInterestAt', 'sharkInterestPolicy', SHARK_PERIOD, 12500, 5 * 60000, 1000, user.name + ' \xB7 \u9AD8\u5229\u8D37');
            }
            for (const loan of this.data.loans) if (loan.status === 'active') accrue(loan, 'balance', 'interestAt', loan.periodMs, loan.rateBps, loan.borrowerName + ' \u2192 ' + loan.lenderName, null);
            return changed;
        }
        buyCard(type, value) {
            this.ensureIdle();
            this.ensureCashWallet();
            const item = Object.hasOwn(cards, type) ? cards[type] : null;
            if (!item) throw new Error('\u8BF7\u9009\u62E9\u6709\u6548\u7684\u9ED1\u5E02\u5361\u3002');
            const stake = this.amount(value), price = M.mul(stake, item.factor), user = this.active;
            if (this.now() < user.marketAvailableAt) throw new Error('\u9ED1\u5E02\u8FDB\u8D27\u4E2D\uFF0C\u8BF7\u7B49\u5F85\u8D2D\u4E70\u51B7\u5374\u7ED3\u675F\u3002');
            if (user.cards.length >= 50) throw new Error('\u6700\u591A\u6301\u6709 50 \u5F20\u5361\uFF0C\u8BF7\u5148\u4F7F\u7528\u5DF2\u6709\u5361\u3002');
            if (M.add(price, stake) > user.balance) throw new Error('\u4F59\u989D\u4E0D\u8DB3\uFF1A\u9700\u652F\u4ED8\u5361\u4EF7\uFF0C\u5E76\u7559\u8DB3\u4E00\u6B21\u7ED1\u5B9A\u4E0B\u6CE8\u7684\u7B79\u7801\u3002');
            const card = { id: root.crypto.randomUUID(), type, stake };
            user.balance = M.sub(user.balance, price); user.cards.push(card);
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
        buyLottery(value, { jackpot = false } = {}) {
            this.ensureIdle();
            const price = root.CasinoLottery.price(value), user = this.active;
            if (price > user.balance) throw new Error('\u94B1\u5305\u4F59\u989D\u4E0D\u8DB3\u4EE5\u8D2D\u4E70\u8FD9\u6863\u5F69\u7968\u3002');
            const result = root.CasinoLottery.draw(price, this.random, jackpot);
            result.id = root.crypto.randomUUID(); result.time = new Date(this.now()).toISOString();
            result.walletAfterWager = M.sub(user.balance, price);
            user.balance = M.add(user.balance, result.net);
            user.lotteryHistory = [result, ...(Array.isArray(user.lotteryHistory) ? user.lotteryHistory.filter(root.CasinoLottery.validHistory) : [])].slice(0,30);
            this.record(\`\${user.name} \xB7 \u5F69\u7968 \xB7 \${root.CasinoLottery.tiers[result.tier].name}: \u7968\u4EF7 \${price.toLocaleString()}\uFF0C\u8FD4\u8FD8 \${result.payout.toLocaleString()}\uFF08\${result.multiplier}\xD7\uFF09\uFF0C\u51C0\u8F93\u8D62 \${result.net >= 0 ? '+' : ''}\${result.net.toLocaleString()}\u3002\`);
            this.completeRound(result.net); this.lock = 'lottery'; this.save(); return result;
        }
        playPlinko(value, risk = 'medium', lane = 'center', { jackpot = false } = {}) {
            this.ensureIdle();const n=this.amount(value),user=this.active;
            root.CasinoArcade.plinkoSettings(risk,lane);
            if(n>user.balance)throw new Error('\u94B1\u5305\u4F59\u989D\u4E0D\u8DB3\uFF0C\u8BF7\u964D\u4F4E\u4E0B\u6CE8\u6216\u524D\u5F80\u94F6\u884C\u3002');
            return this.finishArcade(root.CasinoArcade.plinko(n,risk,lane,this.random,jackpot),'Plinko');
        }
        playDice(value, kind = 'small', target = null, { jackpot = false } = {}) {
            this.ensureIdle();const n=this.amount(value),user=this.active;root.CasinoArcade.diceSettings(kind,target);
            if(n>user.balance)throw new Error('\u94B1\u5305\u4F59\u989D\u4E0D\u8DB3\uFF0C\u8BF7\u964D\u4F4E\u4E0B\u6CE8\u6216\u524D\u5F80\u94F6\u884C\u3002');
            return this.finishArcade(root.CasinoArcade.dice(n,kind,target,this.random,jackpot),'\u9AB0\u5B9D');
        }
        finishArcade(result,label) {
            const user=this.active;result.id=root.crypto.randomUUID();result.time=new Date(this.now()).toISOString();result.walletAfterWager=M.sub(user.balance,result.wager);
            user.balance=M.add(user.balance,result.net);
            user.arcadeHistory=[result,...(Array.isArray(user.arcadeHistory)?user.arcadeHistory.filter(root.CasinoArcade.validHistory):[])].slice(0,30);
            this.record(\`\${user.name} \xB7 \${label}\${result.game==='dice'?' '+result.dice.join(' \xB7 '):' '+result.risk+' / '+result.lane}: \u4E0B\u6CE8 \${result.wager.toLocaleString()}\uFF0C\u8FD4\u8FD8 \${result.payout.toLocaleString()}\uFF0C\u51C0\u8F93\u8D62 \${result.net>=0?'+':''}\${result.net.toLocaleString()}\u3002\`);
            this.completeRound(result.net);this.lock=result.game;this.save();return result;
        }
        slotResult(reels, wager) {
            if (!Array.isArray(reels) || reels.length !== 3 || !reels.every(i => integer(i, 11))) throw new Error('Invalid reels.');
            const landed = reels.map(i => reelStrip[i]);
            const cherries = landed.filter(i => i === 5).length;
            const sevens = landed.filter(i => i === 0).length;
            const multiplier = landed.every(i => i === landed[0]) ? triples[landed[0]]
                : sevens === 2 ? 5 : cherries === 2 ? 2 : cherries === 1 ? 1 : 0;
            return { reels: [...reels], symbols: landed, multiplier, wager, payout: M.mul(wager, multiplier), net: M.mul(wager, multiplier - 1) };
        }
        spinSlots(value, forcedIndices = null, { allIn = false, jackpot = false } = {}) {
            this.ensureIdle();
            const n = this.amount(value), u = this.active;
            const card = jackpot ? null : this.armedCard;
            if (card && n !== card.stake) throw new Error('\u5DF2\u88C5\u5907\u5361\u7ED1\u5B9A\u4E0B\u6CE8 ' + card.stake.toLocaleString() + '\uFF0C\u8BF7\u53D6\u6D88\u88C5\u5907\u540E\u66F4\u6539\u3002');
            if (allIn && n !== u.balance) throw new Error('All In must wager your whole wallet.');
            if (n > u.balance) throw new Error('Your wallet does not have enough chips for this spin.');
            const reels = jackpot ? [0, 6, 0] : card ? cards[card.type].reels : forcedIndices === null ? Array.from({ length: 3 }, () => {
                const roll = this.random();
                if (!(roll >= 0 && roll < 1)) throw new Error('Could not generate a valid spin. Try again.');
                return Math.floor(roll * reelStrip.length);
            }) : forcedIndices;
            const result = this.slotResult(reels, n);
            result.walletAfterWager = M.sub(u.balance, n);
            u.balance = M.add(u.balance, result.net);
            if (card) {
                u.cards = u.cards.filter(item => item.id !== card.id); u.armedCardId = null;
                result.cardName = cards[card.type].name;
                this.record(\`\${u.name} \xB7 \u5DF2\u6D88\u8017\${result.cardName}\uFF0C\u7ED1\u5B9A\u4E0B\u6CE8 \${n.toLocaleString()}\u3002\`);
            }
            this.record(\`\${u.name} \xB7 777\${forcedIndices === null ? '' : ' (forced jackpot)'}: wager \${n.toLocaleString()}, payout \${result.payout.toLocaleString()} (\${result.symbols.map(i => symbols[i]).join(' / ')}).\`);
            this.completeRound(result.net);
            this.lock = 'slots';
            this.save();
            return result;
        }
    }
    CasinoEngine.money = M;
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

(function(root) {
    'use strict';
    if (!root.CasinoMoney && typeof require === 'function') require('./money.js');
    const M = root.CasinoMoney;
    const normalize = value => String(value ?? '').normalize('NFKC').trim().toLocaleLowerCase();
    function summaries(data) {
        const rows = data.users.map(user => {
            const reserved = M.add(root.CasinoEngine.sumBets(user.bets), (user.blackjack && user.blackjack.phase !== 'settled' ? user.blackjack.hands.reduce((sum, hand) => M.add(sum, hand.bet), 0) : 0));
            const negative = user.recovery?.deficit || 0;
            return { id:user.id, name:user.name, cash:user.recovery ? 0 : user.balance, allowance:user.recovery ? user.balance : 0,
                recovery:Boolean(user.recovery), reserved, bank:user.debt, shark:user.sharkDebt, negative, peer:0, receivable:0 };
        });
        const byId = new Map(rows.map(row => [row.id, row]));
        for (const loan of data.loans) if (loan.status === 'active') {
            const lender = byId.get(loan.lenderId), borrower = byId.get(loan.borrowerId);
            if (lender) lender.receivable = M.add(lender.receivable, loan.balance);
            if (borrower) borrower.peer = M.add(borrower.peer, loan.balance);
        }
        for (const row of rows) {
            row.debt = M.add(row.bank, row.shark, row.peer, row.negative);
            row.net = M.sub(M.add(row.cash, (row.recovery ? 0 : row.reserved), row.receivable), row.debt);
        }
        return rows;
    }
    function selectPlayers(rows, {query='', sort='name', page=1, pageSize=20}={}) {
        const needle = normalize(query), filtered = rows.filter(row => normalize(row.name).includes(needle));
        const nameOrder = (a,b) => a.name.localeCompare(b.name, 'zh-CN', {numeric:true, sensitivity:'base'}) || a.id.localeCompare(b.id);
        filtered.sort(['cash','debt','net'].includes(sort) ? (a,b) => M.compare(b[sort],a[sort]) || nameOrder(a,b) : nameOrder);
        const size = Number.isInteger(pageSize) && pageSize > 0 && pageSize <= 100 ? pageSize : 20;
        const pages = Math.max(1, Math.ceil(filtered.length / size));
        const current = Math.min(pages, Math.max(1, Number.isInteger(page) ? page : 1));
        return {rows:filtered.slice((current-1)*size,current*size), page:current, pages, total:filtered.length};
    }
    function activity(entries, query='') {
        const needle = normalize(query);
        return entries.filter(entry => normalize(entry.text+' '+entry.time).includes(needle));
    }
    function activityCSV(entries) {
        const cell = value => {
            let text = String(value ?? '');
            if (/^[\\s]*[=+\\-@]/u.test(text) || /^[\\t\\r\\n]/.test(text)) text = "'"+text;
            return '"'+text.replaceAll('"','""')+'"';
        };
        return '\\uFEFF'+[['\u65F6\u95F4','\u8D26\u6237\u8BB0\u5F55'],...entries.map(entry=>[entry.time,entry.text])].map(row=>row.map(cell).join(',')).join('\\r\\n');
    }
    root.CasinoAccounts = { summaries, selectPlayers, activity, activityCSV };
})(globalThis);

function bindCustomBet(prefix, engine, options) {
    const form = document.getElementById(prefix + '-form');
    const input = document.getElementById(prefix + '-amount');
    const button = document.getElementById(prefix + '-apply');
    form.addEventListener('submit', event => {
        event.preventDefault();
        try {
            if (options.locked()) throw new Error('Finish the current round before changing your bet.');
            const value = engine.amount(input.value);
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
        const payout = CasinoEngine.money.add(CasinoEngine.money.mul(bets.numbers[number] || 0, 24), number === 0 ? CasinoEngine.money.mul(bets.GREEN, 24)
            : number % 2 ? CasinoEngine.money.mul(CasinoEngine.money.add(bets.RED, bets.ODD), 2) : CasinoEngine.money.mul(CasinoEngine.money.add(bets.BLACK, bets.EVEN), 2));
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
      if (selectedBetMode === 'ALL_IN') return engine.money.max(0, credits);\r
      return engine.money.min(credits, selectedBetMode);\r
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
      ledCtx.fillText(credits.toLocaleString(), 170, 110, 290);\r
\r
      // Bet Value\r
      const betVal = getActiveBetAmount();\r
      ledCtx.fillStyle = selectedBetMode === 'ALL_IN' ? '#f87171' : '#fde047';\r
      ledCtx.fillText(\r
        selectedBetMode === 'ALL_IN' ? \`ALL (\${betVal})\` : betVal.toLocaleString(),\r
        512,\r
        110,\r
        300\r
      );\r
\r
      // Last Win Value\r
      ledCtx.fillStyle = '#38bdf8';\r
      ledCtx.fillText(lastWinAmount.toLocaleString(), 852, 110, 290);\r
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
      visualBalance = spinResult.walletAfterWager ?? engine.money.sub(engine.active.balance, spinResult.payout);\r
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
        const payout = engine.money.mul(wager, winMult);\r
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
      resetPlayer() { lastWinAmount = 0; selectedBetMode = engine.active.recovery ? 10 : 100; credits = engine.active.balance; refreshAllUI(); setStatus('Playing as ' + engine.active.name + '. Tap a bet button and pull the red lever.'); },\r
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
    if (!root.CasinoMoney && typeof require === 'function') require('./money.js');
    const M = root.CasinoMoney;
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
            && M.valid(h.bet) && h.bet >= 1
            && typeof h.split === 'boolean' && ['playing', 'stood', 'bust'].includes(h.status))) return false;
        if (r.phase === 'player' && r.hands[r.activeHand]?.status !== 'playing') return false;
        const counts = new Map();
        for (const c of [...r.shoe, ...r.dealer, ...r.hands.flatMap(h => h.cards)]) {
            const key = c.rank + ':' + c.suit; counts.set(key, (counts.get(key) || 0) + 1);
            if (counts.get(key) > 6) return false;
        }
        if (r.phase === 'settled' && (!r.result || !M.valid(r.result.payout) || r.result.payout < 0
            || !M.valid(r.result.wager) || !Array.isArray(r.result.hands)
            || r.result.hands.length !== r.hands.length
            || !r.result.hands.every(h => h && typeof h.label === 'string' && M.valid(h.payout) && h.payout >= 0)
            || !M.valid(r.result.net))) return false;
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
            user.balance = M.sub(user.balance, bet);
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
            this.engine.active.balance = M.sub(this.engine.active.balance, hand.bet); hand.bet = M.mul(hand.bet, 2); hand.cards.push(card);
            hand.status = score(hand.cards).bust ? 'bust' : 'stood'; this._advance();
            this._save(); return r;
        }
        split() {
            const r = this._playing('split'), first = r.hands[0];
            if (r.shoe.length < 2) throw new Error('The shoe does not have enough cards to split.');
            const second = { cards: [first.cards.pop()], bet: first.bet, split: true, status: 'playing' };
            first.split = true;
            this.engine.active.balance = M.sub(this.engine.active.balance, first.bet);
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
                return { label, total: value.total, bet: hand.bet, payout: M.ratio(hand.bet, multiplier * 2, 2) };
            });
            const wager = r.hands.reduce((sum, h) => M.add(sum, h.bet), 0), payout = hands.reduce((sum, h) => M.add(sum, h.payout), 0);
            r.result = { hands, wager, payout, net: M.sub(payout, wager), dealer: dealer.total };
            r.phase = 'settled';
            this.engine.active.balance = M.add(this.engine.active.balance, payout);
            this.engine.lock = null;
            this.engine.record(\`\${this.engine.active.name} \xB7 Blackjack: wager \${wager.toLocaleString()}, payout \${payout.toLocaleString()} (\${hands.map(h => h.label).join(' / ')}).\`);
            this.engine.completeRound(r.result.net);
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
            try { this.legacyPending = this.revision === 0 && Boolean(this.money.parseJSON(localStorage.getItem('roulette-club-v1') || 'null')?.users?.length); } catch { this.legacyPending = false; }
            try { const selected = sessionStorage.getItem('club-selected-player'); if (this.data.users.some(user => user.id === selected)) this.data.activeId = selected; } catch {}
        }
        get lock() { return this.requestBusy ? 'network' : this.animationLock || (this.active?.blackjack && this.active.blackjack.phase !== 'settled' ? 'blackjack' : null); }
        set lock(value) { this.animationLock = value === 'blackjack' ? null : value; }
        save() {}
        accrueInterest() { return false; }
        applySnapshot(snapshot) {
            snapshot = this.money.hydrate(snapshot);
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
            const id = crypto.randomUUID(), body = this.money.stringify({id,command,args,playerId:this.data.activeId});
            this.requestBusy = true; this.onChange?.();
            try {
                let response;
                for(let attempt=0;attempt<2;attempt++) {
                    try { response = await fetch('/api/command',{method:'POST',headers:{'Content-Type':'application/json'},body,credentials:'same-origin',signal:AbortSignal.timeout(15000)}); break; }
                    catch(error) { if(attempt===1) throw new Error('\u65E0\u6CD5\u8FDE\u63A5\u670D\u52A1\u5668\u3002\u8BF7\u5237\u65B0\u4EE5\u786E\u8BA4\u4F59\u989D\uFF0C\u64CD\u4F5C\u4E0D\u4F1A\u91CD\u590D\u5165\u8D26\u3002'); }
                }
                const data = this.money.hydrate(await response.json());
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
        repayAll(...args){return this.send('repayAll',args);}
        buyCard(...args){return this.send('buyCard',args);}
        armCard(...args){return this.send('armCard',args);}
        spinSlots(value, _forced, options={}){return this.send('slots',[value,options]);}
        buyLottery(...args){return this.send('lottery',args);}
        playPlinko(...args){return this.send('plinko',args);}
        playDice(...args){return this.send('dice',args);}
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
        // The chip stack is a bounded visual illustration; accounting retains the full wager.
        let height = 0, remaining = Number(value > 100000 ? 100000 : value);
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
    function wager() { return engine.money.tryParse($('bj-wager').value); }
    function update() {
        const r = game.round, ownTurn = r?.phase === 'player';
        const playing = r && r.phase !== 'settled', locked = Boolean(engine.lock) || animating;
        $('bj-seat-name').textContent = engine.active.name.toUpperCase() + ' \xB7 YOUR SEAT';
        $('bj-stake').textContent = (r ? r.hands.reduce((sum,h)=>engine.money.add(sum,h.bet),0) : 0).toLocaleString() + ' \u20B5';
        const validBet = wager() !== null && wager() >= 1;
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
                $('bj-status').textContent=summary+' \xB7 Net '+(net>=0?'+':'\u2212')+engine.money.abs(net).toLocaleString()+' chips';
            }
        }
        scene?.sync(r,wager() !== null?wager():50);
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
        $('bj-wager').value=String(engine.money.max(1,engine.money.add(wager() !== null?wager():50,delta)));tone(360,.04);update();
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

function createArcadeScene(kind, container, callbacks) {
    'use strict';
    const T=window.THREE;if(!T)return null;
    const renderer=new T.WebGLRenderer({antialias:true,alpha:false,powerPreference:'low-power'});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.75));renderer.outputEncoding=T.sRGBEncoding;
    renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.25;
    renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    const scene=new T.Scene(),camera=new T.PerspectiveCamera(kind==='plinko'?40:35,1,.1,60);
    scene.background=new T.Color(kind==='plinko'?0x09131f:0x0b1e1a);
    camera.position.set(...(kind==='plinko'?[0,3,20]:[6,9,11]));camera.lookAt(0,kind==='plinko'?1:0,0);
    scene.add(new T.HemisphereLight(0xd7ecff,0x142125,1.0));
    const key=new T.DirectionalLight(0xffe5ba,1.7);key.position.set(-4,10,10);key.castShadow=true;key.shadow.mapSize.set(1024,1024);scene.add(key);
    const rim=new T.PointLight(kind==='plinko'?0x39d5d9:0xe7b65b,1.4,30);rim.position.set(5,4,5);scene.add(rim);
    const pink=new T.PointLight(0xe86b9c,.65,20);pink.position.set(-5,-2,5);scene.add(pink);
    const metal=new T.MeshStandardMaterial({color:0xae9863,metalness:.8,roughness:.25});
    const dark=new T.MeshStandardMaterial({color:0x122230,metalness:.45,roughness:.6});
    const textures=new Map();let active=false,frame=null,animation=null,optionsKey='',ball,pins=[],bins=[],launchers=[],dice=[];
    function box(w,h,d,material,x=0,y=0,z=0){const mesh=new T.Mesh(new T.BoxGeometry(w,h,d),material);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;scene.add(mesh);return mesh;}
    function textTexture(text,background='#183b4c',foreground='#f4e5bb'){
        const key=text+background+foreground;if(textures.has(key))return textures.get(key);
        const canvas=document.createElement('canvas');canvas.width=256;canvas.height=128;const ctx=canvas.getContext('2d');
        ctx.fillStyle=background;ctx.fillRect(0,0,256,128);ctx.fillStyle=foreground;ctx.font='bold 48px Arial';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text,128,66);
        const texture=new T.CanvasTexture(canvas);texture.encoding=T.sRGBEncoding;textures.set(key,texture);return texture;
    }
    function faceTexture(n){
        const key='dice'+n;if(textures.has(key))return textures.get(key);
        const canvas=document.createElement('canvas');canvas.width=canvas.height=256;const ctx=canvas.getContext('2d');
        ctx.fillStyle='#f4ebd8';ctx.fillRect(0,0,256,256);ctx.strokeStyle='#b6a58c';ctx.lineWidth=8;ctx.strokeRect(7,7,242,242);
        const positions={1:[[1,1]],2:[[0,0],[2,2]],3:[[0,0],[1,1],[2,2]],4:[[0,0],[2,0],[0,2],[2,2]],5:[[0,0],[2,0],[1,1],[0,2],[2,2]],6:[[0,0],[2,0],[0,1],[2,1],[0,2],[2,2]]};
        ctx.fillStyle=n===1?'#ae243d':'#182a2d';for(const [x,y] of positions[n]){ctx.beginPath();ctx.arc(63+x*65,63+y*65,20,0,Math.PI*2);ctx.fill();}
        const texture=new T.CanvasTexture(canvas);texture.encoding=T.sRGBEncoding;textures.set(key,texture);return texture;
    }
    if(kind==='plinko'){
        box(11.8,12,.4,dark,0,.9,-.4);box(.18,12.2,.65,metal,-5.9,.9,0);box(.18,12.2,.65,metal,5.9,.9,0);box(12,.18,.65,metal,0,7,0);box(12,.18,.65,metal,0,-5.1,0);
        for(let row=0;row<CasinoArcade.rows;row++){
            const line=[];for(let col=0;col<=row;col++){
                const material=new T.MeshStandardMaterial({color:0xb9d0d7,metalness:.9,roughness:.23,emissive:0x2db8c5,emissiveIntensity:0});
                const peg=new T.Mesh(new T.CylinderGeometry(.095,.115,.3,12),material);peg.rotation.x=Math.PI/2;peg.position.set((col-row/2)*.82,5-row*.72,.1);peg.castShadow=true;scene.add(peg);line.push(peg);
            }pins.push(line);
        }
        for(let i=0;i<=CasinoArcade.rows;i++){
            const edge=Math.abs(i-6),color=edge>=5?0xb27a35:edge>=3?0x96526a:0x205d6b;
            const material=new T.MeshStandardMaterial({color,metalness:.5,roughness:.4,emissive:color,emissiveIntensity:.2});
            const bin=box(.75,.75,.5,material,(i-6)*.82,-4.48,.05);
            const label=new T.Mesh(new T.PlaneGeometry(.72,.36),new T.MeshBasicMaterial({map:textTexture('1\xD7')}));label.position.set(bin.position.x,-4.44,.32);scene.add(label);bins.push({bin,label});
        }
        for(const [index,lane] of ['left','center','right'].entries()){
            const material=new T.MeshStandardMaterial({color:0x77d0d4,metalness:.65,roughness:.2,emissive:0x3ec4c8,emissiveIntensity:.1});
            const marker=new T.Mesh(new T.TorusGeometry(.27,.08,12,32),material);marker.position.set((index-1)*1.8,6.3,.2);marker.userData.lane=lane;scene.add(marker);launchers.push(marker);
        }
        ball=new T.Mesh(new T.SphereGeometry(.16,24,18),new T.MeshStandardMaterial({color:0xffdf8a,emissive:0xd58a28,emissiveIntensity:.5,metalness:.8,roughness:.13}));ball.visible=false;ball.castShadow=true;scene.add(ball);
    }else{
        const felt=new T.MeshStandardMaterial({color:0x104936,roughness:.95,metalness:0});
        box(9,.25,6,felt,0,-.2,0);box(9.4,.55,.22,metal,0,0,3);box(9.4,.55,.22,metal,0,0,-3);box(.22,.55,6.2,metal,-4.6,0,0);box(.22,.55,6.2,metal,4.6,0,0);
        const materials=[1,6,2,5,3,4].map(n=>new T.MeshStandardMaterial({map:faceTexture(n),metalness:.08,roughness:.32}));
        for(let i=0;i<3;i++){const cube=new T.Mesh(new T.BoxGeometry(1.25,1.25,1.25),materials);cube.position.set((i-1)*1.9,.65,0);cube.castShadow=true;cube.receiveShadow=true;scene.add(cube);dice.push(cube);}
        const label=new T.Mesh(new T.PlaneGeometry(5,.65),new T.MeshBasicMaterial({map:textTexture('DICE CLUB','#104936','#b8d6ac')}));label.rotation.x=-Math.PI/2;label.position.set(0,-.06,1.8);scene.add(label);
    }
    function resize(){
        const width=container.clientWidth||640,height=container.clientHeight||560;renderer.setSize(width,height,false);camera.aspect=width/height;
        if(kind==='plinko')camera.position.set(0,3,Math.max(20,6.5/(Math.tan(Math.PI/9)*camera.aspect)));
        else {const scale=Math.max(1,1.15/camera.aspect);camera.position.set(6*scale,9*scale,11*scale);}
        camera.lookAt(0,kind==='plinko'?1:0,0);camera.updateProjectionMatrix();
    }
    function updateOptions(risk='medium',lane='center'){
        if(kind!=='plinko')return;
        if(optionsKey===risk+lane)return;optionsKey=risk+lane;
        const table=CasinoArcade.tables[risk]||CasinoArcade.tables.medium;
        bins.forEach(({bin,label},i)=>{label.material.map=textTexture(table[i]/100+'\xD7',i===6?'#204e61':Math.abs(i-6)>=5?'#8b5428':'#58384b');label.material.needsUpdate=true;bin.material.emissiveIntensity=.2;});
        launchers.forEach(marker=>marker.material.emissiveIntensity=marker.userData.lane===lane?1.3:.1);
    }
    function settle(result){
        if(kind==='plinko'){ball.position.set((result.pocket-6)*.82,-4.05,.45);bins[result.pocket].bin.material.emissiveIntensity=1.4;}
        else result.dice.forEach((face,i)=>{const rotation=CasinoArcade.diceRotation(face);dice[i].rotation.set(rotation.x,0,rotation.z);dice[i].position.set((i-1)*1.9,.65,0);});
    }
    function draw(now){
        frame=null;if(!active)return;
        if(animation){
            const a=animation,t=Math.min(1,Math.max(0,(now-a.start)/a.duration));
            if(kind==='plinko'){
                const index=Math.min(a.points.length-2,Math.floor(t*(a.points.length-1))),fraction=t===1?1:t*(a.points.length-1)-index,p=a.points[index],q=a.points[index+1];
                const smooth=fraction*fraction*(3-2*fraction);ball.position.set(p.x+(q.x-p.x)*smooth,p.y+(q.y-p.y)*fraction+Math.sin(fraction*Math.PI)*.14,.45);
                for(const line of pins)for(const pin of line)pin.material.emissiveIntensity*=.88;
                if(index>=1&&index<=12){const rights=a.result.path.slice(0,index-1).reduce((s,n)=>s+n,0);pins[index-1][rights].material.emissiveIntensity=.8*(1-fraction);}
            }else{
                const ease=1-(1-t)**3;
                dice.forEach((cube,i)=>{const target=CasinoArcade.diceRotation(a.result.dice[i]);cube.rotation.set((Math.PI*6+target.x)*ease,Math.PI*4*ease,(Math.PI*4+target.z)*ease);cube.position.y=.65+Math.abs(Math.sin(t*Math.PI*(5+i)))*(1-t)*2;cube.position.z=Math.sin(t*Math.PI*3+i)*(1-t)*.6;});
            }
            if(t===1){animation=null;settle(a.result);a.done();}
        }
        try { renderer.render(scene,camera); } catch { stopAndFail(); }
        if(active)frame=requestAnimationFrame(draw);
    }
    function stopAndFail(){
        active=false;if(frame!==null){cancelAnimationFrame(frame);frame=null;}
        const current=animation;animation=null;if(current)current.done();callbacks.failed?.();
    }
    renderer.domElement.addEventListener('webglcontextlost',event=>{event.preventDefault();stopAndFail();});
    const raycaster=new T.Raycaster();
    renderer.domElement.addEventListener('pointerup',event=>{
        if(!active||animation||event.button!==0)return;
        if(kind==='dice'){callbacks.play();return;}
        const rect=renderer.domElement.getBoundingClientRect();raycaster.setFromCamera(new T.Vector2((event.clientX-rect.left)/rect.width*2-1,-(event.clientY-rect.top)/rect.height*2+1),camera);
        const hit=raycaster.intersectObjects(launchers)[0];if(hit){callbacks.selectLane(hit.object.userData.lane);callbacks.play();}
    });
    window.addEventListener('resize',resize);resize();updateOptions();
    return {
        updateOptions,
        setVisible(value){active=value;if(value){resize();if(frame===null)frame=requestAnimationFrame(draw);}else if(frame!==null){cancelAnimationFrame(frame);frame=null;}},
        play(result,duration,done){
            if(kind==='plinko'){ball.visible=true;ball.position.set(CasinoArcade.pathPoints(result.path,result.lane)[0].x,6.3,.45);bins.forEach(({bin})=>bin.material.emissiveIntensity=.2);}
            if(duration<=0){settle(result);done();return;}
            animation={result,duration,done,start:performance.now(),points:kind==='plinko'?CasinoArcade.pathPoints(result.path,result.lane):null};
        }
    };
}

function createArcadeGame(kind,engine,callbacks) {
    'use strict';
    const $=name=>document.getElementById(kind+'-'+name),fmt=value=>value.toLocaleString();
    let visible=false,scene=null,failed=false,pending=false,animating=false,lastPlayer=null,lastRecovery=false,visualBalance=null,runningId=null,oddsKey='';
    const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches||false;
    const inputs=kind==='plinko'?['wager','risk','lane']:['wager','kind','target'];
    const wagers=Array.from(document.querySelectorAll('[data-arcade-chip]')).filter(button=>button.dataset.arcadeChip.startsWith(kind+':'));
    function describe(result){return kind==='plinko'?\`\${result.multiplier}\xD7 \xB7 \u8FD4\u8FD8 \${fmt(result.payout)} \xB7 \u51C0\u8F93\u8D62 \${result.net>=0?'+':''}\${fmt(result.net)}\`:\`\${result.dice.join(' \xB7 ')} = \${result.total}\${result.triple?' \xB7 \u56F4\u9AB0':''} \xB7 \u8FD4\u8FD8 \${fmt(result.payout)} \xB7 \u51C0\u8F93\u8D62 \${result.net>=0?'+':''}\${fmt(result.net)}\`;}
    function update(){
        if(lastPlayer!==engine.active.id){lastPlayer=engine.active.id;$('wager').value='10';$('result').textContent='';$('status').textContent=kind==='plinko'?'\u9009\u62E9\u843D\u7403\u53E3\uFF0C\u51C6\u5907\u6295\u7403\u3002':'\u9009\u62E9\u4E0B\u6CE8\uFF0C\u51C6\u5907\u63B7\u9AB0\u3002';}
        if(engine.active.recovery&&!lastRecovery)$('wager').value='10';lastRecovery=Boolean(engine.active.recovery);
        const locked=callbacks.locked()||pending||animating,wager=engine.money.tryParse($('wager').value),valid=wager!==null&&wager>=1;
        inputs.forEach(name=>$(name).disabled=locked);wagers.forEach(button=>button.disabled=locked);
        $('wager').setAttribute('aria-invalid',String(!valid));$('play').disabled=locked||!scene||!valid||wager>engine.active.balance;
        if(kind==='plinko'){
            const risk=$('risk').value||'medium',lane=$('lane').value||'center';scene?.updateOptions(risk,lane);
            const key=risk+lane;if(key!==oddsKey){oddsKey=key;let expected=0;
                $('odds').replaceChildren(...CasinoArcade.tables[risk].map((value,i)=>{const probability=CasinoArcade.pocketProbability(i,lane);expected+=value/100*probability;const node=document.createElement('li');node.textContent=\`\u69FD \${i+1} \xB7 \${value/100}\xD7 \xB7 \${(probability*100).toFixed(3)}%\`;return node;}));
                $('theory').textContent=\`\u5F53\u524D\u7EC4\u5408\u7406\u8BBA\u8FD4\u8FD8\u7387 \${(expected*100).toFixed(2)}%\uFF0C\u5C0F\u989D\u4E0B\u6CE8\u6574\u7B79\u7801\u53D6\u6574\u540E\u53EF\u80FD\u7565\u4F4E\u3002\`;
            }
        }else $('target-field').hidden=$('kind').value!=='sum';
        const history=Array.isArray(engine.active.arcadeHistory)?engine.active.arcadeHistory:[];
        const recent=history.filter(result=>CasinoArcade.validHistory(result)&&result.id!==runningId&&result.game===kind).slice(0,6);
        $('history').replaceChildren(...(recent.length?recent.map(result=>{const li=document.createElement('li');li.textContent=describe(result);li.dataset.loss=String(result.net<0);return li;}):[Object.assign(document.createElement('li'),{textContent:'\u8FD8\u6CA1\u6709\u672C\u73A9\u6CD5\u7684\u8BB0\u5F55\u3002'})]));
    }
    async function play(jackpot=false){
        if(!visible||pending||animating||callbacks.locked())return;
        if(!scene){callbacks.notify('3D \u753B\u9762\u5C1A\u4E0D\u53EF\u7528\uFF0C\u8BF7\u68C0\u67E5\u6D4F\u89C8\u5668\u7684 WebGL \u652F\u6301\u3002',true);return;}
        const wager=$('wager').value;let result;
        pending=true;update();callbacks.changed();
        try {
            result=kind==='plinko'?await engine.playPlinko(wager,$('risk').value,$('lane').value,{jackpot}):await engine.playDice(wager,$('kind').value,$('kind').value==='sum'?Number($('target').value):null,{jackpot});
            pending=false;animating=true;visualBalance=result.walletAfterWager;runningId=result.id;engine.lock=kind;$('status').textContent=kind==='plinko'?'\u5F39\u73E0\u6B63\u5728\u7A7F\u8FC7\u9489\u9635\u2026':'\u9AB0\u5B50\u6B63\u5728\u6EDA\u52A8\u2026';$('result').textContent='';update();callbacks.changed();
            scene.play(result,reduced?0:kind==='plinko'?4200:2300,()=>{
                animating=false;visualBalance=null;runningId=null;engine.lock=null;$('result').textContent=describe(result);$('result').dataset.loss=String(result.net<0);
                $('status').textContent=engine.active.recovery?\`\u8D1F\u6570\u8BB0\u5F55 -\${fmt(engine.active.recovery.deficit)} \xB7 \u4E0B\u4E00\u5C40\u53EF\u7528 10\u3002\`:'\u672C\u5C40\u5DF2\u7ED3\u7B97\uFF0C\u53EF\u4EE5\u7EE7\u7EED\u4E0B\u6CE8\u3002';
                update();callbacks.changed();
            });
        }catch(error){pending=false;animating=false;visualBalance=null;runningId=null;engine.lock=null;update();callbacks.notify(result?'\u672C\u5C40\u5DF2\u7ED3\u7B97\uFF0C\u52A8\u753B\u672A\u80FD\u5B8C\u6210\u3002\u8BF7\u67E5\u770B\u6700\u8FD1\u8BB0\u5F55\u3002':error.message,true);callbacks.changed();}
    }
    $( 'form').addEventListener('submit',event=>{event.preventDefault();return play();});
    for(const name of inputs)$(name).addEventListener(name==='wager'?'input':'change',update);
    wagers.forEach(button=>button.addEventListener('click',()=>{const value=button.dataset.arcadeChip.split(':')[1];$('wager').value=String(value==='all'?engine.active.balance:Number(value));update();}));
    if(kind==='dice')$('target').replaceChildren(...Object.entries(CasinoArcade.sumReturns).map(([total,multiplier])=>{const option=document.createElement('option');option.value=total;option.textContent=\`\${total} \u70B9 \xB7 \${multiplier}\xD7\`;return option;}));
    window.addEventListener('keydown',event=>{
        if(!visible||event.repeat||event.code!=='Space'||event.ctrlKey||event.altKey||event.metaKey||event.shiftKey||event.target.closest('input,select,textarea,button,[contenteditable]'))return;
        event.preventDefault();event.stopImmediatePropagation();play();
    });
    return {
        update,forceJackpot:()=>play(true),get animating(){return pending||animating;},get displayBalance(){return visualBalance;},
        setVisible(value){visible=value;if(value&&!scene&&!failed){try{scene=createArcadeScene(kind,$('mount'),{play:()=>play(),selectLane:lane=>{$('lane').value=lane;update();},failed(){failed=true;scene=null;$('unavailable').hidden=false;update();callbacks.changed();}});if(!scene)throw new Error('WebGL unavailable');}catch{failed=true;$('mount').replaceChildren();$('unavailable').hidden=false;}}
            scene?.setVisible(value);update();}
    };
}

function createLotteryGame(engine, callbacks) {
    'use strict';
    const $ = name => document.getElementById('lottery-' + name), rules = CasinoLottery, M = engine.money;
    const prices = [...document.querySelectorAll('[data-lottery-price]')], fmt = value => value.toLocaleString();
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || false;
    let selected = rules.prices[0], visible = false, pending = false, animating = false, player = null, timer = null, runningId = null, visualBalance = null;
    function element(tag, text) { const node = document.createElement(tag); node.textContent = text; return node; }
    function describe(result) {
        return \`\u7968\u4EF7 \${fmt(result.wager)} \xB7 \${result.multiplier}\xD7 \xB7 \u8FD4\u8FD8 \${fmt(result.payout)} \xB7 \u51C0\u8F93\u8D62 \${result.net >= 0 ? '+' : ''}\${fmt(result.net)}\`;
    }
    function update() {
        if (player !== engine.active.id) { player = engine.active.id; selected = rules.prices[0]; $('status').textContent = '\u9009\u62E9\u7968\u4EF7\uFF0C\u51C6\u5907\u5F00\u5956\u3002'; }
        const locked = callbacks.locked() || pending || animating, affordable = engine.active.balance >= selected;
        prices.forEach(button => { button.disabled = locked; button.setAttribute('aria-pressed', String(Number(button.dataset.lotteryPrice) === selected)); });
        $('buy').disabled = locked || !affordable;
        $('buy').textContent = '\u8D2D\u7968\u5E76\u5F00\u5956 \xB7 ' + fmt(selected);
        $('cost').textContent = '\u672C\u6B21\u7968\u4EF7 ' + fmt(selected) + ' \u7B79\u7801 \xB7 \u8D2D\u7968\u540E\u7ACB\u5373\u7ED3\u7B97';
        $('top-prize').textContent = fmt(M.mul(selected,100));
        $('odds').replaceChildren(...rules.tiers.map(item => {
            const row = document.createElement('tr'), probability = (item.weight * 100 / rules.total).toFixed(5).replace(/\\.?0+$/, '');
            row.append(element('td', item.numerator / 2 + '\xD7'), element('td', probability + '%'), element('td', fmt(M.ratio(selected,item.numerator,2)))); return row;
        }));
        $('theory').textContent = '\u7406\u8BBA\u5E73\u5747\u8FD4\u8FD8\u7387 ' + (rules.expectedNumerator * 100 / (rules.total * 2)).toFixed(4).replace(/\\.?0+$/, '') + '% \xB7 \u6BCF\u5F20\u72EC\u7ACB\u968F\u673A\uFF0C\u7ED3\u679C\u4E0D\u4F1A\u56E0\u4E4B\u524D\u8F93\u8D62\u6539\u53D8\u3002';
        const history = (Array.isArray(engine.active.lotteryHistory) ? engine.active.lotteryHistory : []).filter(rules.validHistory).slice(0,30);
        const drawing = pending || animating, latest = history[0];
        $('ticket').setAttribute('aria-busy', String(drawing));
        $('reveal').hidden = !animating;
        if (drawing) {
            $('ticket').dataset.state = 'drawing'; $('prize-name').textContent = '\u5E78\u8FD0\u6B63\u5728\u63ED\u6653'; $('multiplier').textContent = '\u5F00\u5956\u4E2D\u2026';
            $('result').textContent = '\u7ED3\u679C\u5DF2\u63D0\u4EA4\uFF0C\u8BF7\u7A0D\u5019\u3002'; $('ticket-id').textContent = '';
        } else if (latest) {
            $('ticket').dataset.state = latest.net > 0 ? 'profit' : latest.net < 0 ? 'loss' : 'even';
            $('prize-name').textContent = rules.tiers[latest.tier].name; $('multiplier').textContent = latest.multiplier + '\xD7';
            $('result').textContent = describe(latest); $('ticket-id').textContent = '\u7968\u53F7 ' + latest.id;
        } else {
            $('ticket').dataset.state = 'ready'; $('prize-name').textContent = '\u4F60\u7684\u4E0B\u4E00\u4EFD\u5E78\u8FD0'; $('multiplier').textContent = '\u6700\u9AD8 100\xD7';
            $('result').textContent = '\u6240\u6709\u7968\u4EF7\u4F7F\u7528\u76F8\u540C\u4E2D\u5956\u6982\u7387\u3002'; $('ticket-id').textContent = '';
        }
        const recent = pending ? history.slice(1) : history.filter(result => result.id !== runningId);
        $('history').replaceChildren(...(recent.length ? recent.map(result => {
            const row = element('li', rules.tiers[result.tier].name + ' \xB7 ' + describe(result)); row.dataset.loss = String(result.net < 0);
            const time = element('time', new Date(result.time).toLocaleString()); time.dateTime = result.time; row.append(time); return row;
        }) : [element('li','\u8FD8\u6CA1\u6709\u5F69\u7968\u8BB0\u5F55\u3002')]));
        if (!locked && !affordable) $('status').textContent = engine.active.recovery ? '\u8D1F\u6570\u6A21\u5F0F\u6BCF\u5C40\u53EA\u6709 10 \u7B79\u7801\uFF0C\u6682\u65F6\u65E0\u6CD5\u8D2D\u4E70\u6700\u4F4E 1,000 \u7684\u5F69\u7968\u3002' : '\u5F53\u524D\u4F59\u989D\u4E0D\u8DB3\uFF0C\u8BF7\u9009\u62E9\u66F4\u4F4E\u7968\u4EF7\u6216\u524D\u5F80\u94F6\u884C\u3002';
    }
    function reveal() {
        if (!animating) return;
        if (timer !== null) clearTimeout(timer); timer = null;
        animating = false; runningId = null; visualBalance = null; engine.lock = null;
        $('status').textContent = '\u5F00\u5956\u5B8C\u6210\uFF0C\u5956\u91D1\u5DF2\u81EA\u52A8\u8BA1\u5165\u5F53\u524D\u73A9\u5BB6\u94B1\u5305\u3002';
        update(); callbacks.changed();
    }
    async function buy(jackpot = false) {
        if (!visible || pending || animating || callbacks.locked()) return;
        if (selected > engine.active.balance) { callbacks.notify('\u94B1\u5305\u4F59\u989D\u4E0D\u8DB3\u4EE5\u8D2D\u4E70\u8FD9\u6863\u5F69\u7968\u3002',true); return; }
        pending = true; visualBalance = M.sub(engine.active.balance,selected); $('status').textContent = '\u6B63\u5728\u8D2D\u7968\uFF0C\u8BF7\u7A0D\u5019\u2026'; update(); callbacks.changed();
        let result;
        try {
            result = await engine.buyLottery(selected,{jackpot}); pending = false; animating = true; runningId = result.id; engine.lock = 'lottery';
            $('status').textContent = '\u5F69\u7968\u5DF2\u8D2D\u4E70\uFF0C\u5373\u5C06\u63ED\u6653\u2026'; update(); callbacks.changed();
            if (reduced) reveal(); else timer = setTimeout(reveal,1800);
        } catch (error) {
            pending = false; animating = false; visualBalance = null; runningId = null;
            if (result) engine.lock = null;
            update(); callbacks.notify(result ? '\u672C\u5F20\u5F69\u7968\u5DF2\u7ED3\u7B97\uFF0C\u8BF7\u67E5\u770B\u5F69\u7968\u8BB0\u5F55\u3002' : error.message,true); callbacks.changed();
        }
    }
    prices.forEach(button => button.addEventListener('click', () => {
        if (callbacks.locked() || pending || animating) return;
        selected = rules.price(Number(button.dataset.lotteryPrice)); $('status').textContent = '\u5DF2\u9009\u62E9 ' + fmt(selected) + ' \u7B79\u7801\u5F69\u7968\u3002'; update();
    }));
    $('buy').addEventListener('click', () => buy()); $('reveal').addEventListener('click', reveal);
    window.addEventListener('keydown', event => {
        if (!visible || event.repeat || event.code !== 'Space' || event.ctrlKey || event.altKey || event.metaKey || event.shiftKey || event.target?.closest?.('input,select,textarea,button,[contenteditable]')) return;
        event.preventDefault(); event.stopImmediatePropagation(); if (animating) reveal(); else buy();
    });
    return {update, forceJackpot:() => buy(true), setVisible(value) { visible = value; update(); },
        get animating() { return pending || animating; }, get displayBalance() { return visualBalance; }};
}

function createEconomyUI(engine, callbacks) {
    const $ = id => document.getElementById(id), fmt = n => n.toLocaleString();
    let buyButtons = [];
    const remaining = ms => { const seconds = Math.max(0, Math.ceil(ms / 1000)); return Math.floor(seconds / 60) + ':' + String(seconds % 60).padStart(2, '0'); };
    function tick() {
        const user = engine.active, now = engine.now();
        $('bank-interest-progress').textContent = user.debt > 0 ? \`\u4E0B\u6B21\u8BA1\u606F \${remaining(user.bankInterestAt + 10 * 60000 - now)} \xB7 \u6BCF 10 \u5206\u949F 15%\u3002\` : '\u65E0\u6B20\u6B3E\uFF0C\u4E0D\u8BA1\u606F\u3002';
        $('shark-progress').textContent = user.sharkDebt > 0 ? \`\u4E0B\u6B21\u8BA1\u606F \${remaining(user.sharkInterestAt + 3 * 60000 - now)} \xB7 \u6BCF 3 \u5206\u949F 125%\u3002\` : '\u6BCF 3 \u5206\u949F\uFF0C\u672A\u8FD8\u6B20\u6B3E\u52A0 125%\u3002';
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
        const n = engine.money.tryParse($('market-stake').value);
        return n !== null && n > 0 ? n : null;
    }
    function render() {
        const user = engine.active, locked = callbacks.locked(), stake = validStake();
        $('bank-borrow').disabled = locked || Boolean(user.recovery) || engine.availableCredit === 0;
        $('shark-panel').hidden = !engine.canBorrowShark && user.sharkDebt === 0;
        $('shark-offer').hidden = !engine.canBorrowShark;
        $('shark-repayment').hidden = user.sharkDebt === 0;
        $('shark-debt').textContent = fmt(user.sharkDebt);
        $('shark-credit').textContent = fmt(engine.availableSharkCredit);
        $('bank-total-debt').textContent = fmt(engine.money.add(user.debt, user.sharkDebt));
        $('market-stake').disabled = locked;
        $('market-stake').setAttribute('aria-invalid', String(stake === null));
        buyButtons = [];
        $('market-catalog').replaceChildren(...Object.entries(CasinoEngine.cards).map(([type, item]) => {
            const card = element('article', '', 'club-card market-product');
            card.append(element('div', item.symbol, 'market-symbols'), element('h3', item.name));
            card.append(element('p', stake === null ? '\u8BF7\u8F93\u5165\u81F3\u5C11 1 \u7B79\u7801\u7684\u6574\u6570\u4E0B\u6CE8\uFF0C\u65E0\u4E0A\u9650\u3002' : \`\u5361\u4EF7 \${fmt(engine.money.mul(stake, item.factor))} \xB7 \u4F7F\u7528\u65F6\u53E6\u6263 \${fmt(stake)}\`, 'market-price'));
            card.append(element('p', stake === null ? '' : \`\u4FDD\u5E95\u8FD4\u56DE \${fmt(engine.money.mul(stake, item.multiplier))} \xB7 \u6263\u9664\u5361\u4EF7\u4E0E\u4E0B\u6CE8\u540E\u51C0\u8D5A \${fmt(engine.money.mul(stake, item.multiplier - item.factor - 1))}\`, 'club-muted'));
            const button = element('button', '\u8D2D\u4E70\u6B64\u5361', 'club-action'); button.type = 'button';
            button.disabled = locked || Boolean(user.recovery) || stake === null || user.cards.length >= 50 || (stake !== null && engine.money.mul(stake, item.factor + 1) > user.balance);
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
        if (await callbacks.transact(() => engine.borrowShark($('shark-borrow-amount').value), '\u9AD8\u5229\u8D37\u5DF2\u5230\u8D26\uFF0C\u6B20\u6B3E\u53CA\u8BA1\u606F\u8FDB\u5EA6\u5DF2\u4FDD\u5B58\u3002')) $('shark-borrow-form').reset();
    });
    $('shark-repay-form').addEventListener('submit', async event => {
        event.preventDefault();
        if (await callbacks.transact(() => engine.repayShark($('shark-repay-amount').value), '\u9AD8\u5229\u8D37\u8FD8\u6B3E\u5DF2\u5165\u8D26\u3002')) $('shark-repay-form').reset();
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
        $('peer-debt').textContent = fmt(loans.filter(loan => loan.status === 'active' && loan.borrowerId === user.id).reduce((sum, loan) => engine.money.add(sum, loan.balance),0));
        $('peer-receivable').textContent = fmt(loans.filter(loan => loan.status === 'active' && loan.lenderId === user.id).reduce((sum, loan) => engine.money.add(sum, loan.balance),0));
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
                    form.className = 'peer-repay-form'; input.className = 'club-input'; input.type = 'text'; input.inputMode = 'numeric'; input.pattern = '[0-9]+'; input.required = true;
                    input.setAttribute('aria-label', '\u507F\u8FD8\u7ED9 ' + loan.lenderName + ' \u7684\u91D1\u989D'); input.value = repaymentValues.get(loan.id) ?? String(engine.money.max(1, engine.money.min(loan.balance, user.balance)));
                    input.disabled = locked || Boolean(user.recovery); submit.type = 'submit'; submit.disabled = locked || Boolean(user.recovery);
                    input.addEventListener('input', () => repaymentValues.set(loan.id, input.value));
                    form.addEventListener('submit', async event => { event.preventDefault(); callbacks.transact(() => engine.repayLoan(loan.id, input.value), '\u8FD8\u6B3E\u5DF2\u8FDB\u5165\u51FA\u501F\u4EBA\u94B1\u5305\u3002'); });
                    form.append(input, submit); row.append(form);
                    const all = button('\u4E00\u952E\u8FD8\u6E05\u8FD9\u7B14', () => callbacks.transact(() => engine.repayAll('peer', loan.id), '\u8FD9\u7B14\u73A9\u5BB6\u501F\u6B3E\u5DF2\u5168\u90E8\u8FD8\u6E05\u3002'));
                    all.disabled = locked || Boolean(user.recovery) || user.balance < loan.balance; actions.append(all);
                }
            }
            row.append(actions); return row;
        });
        $('peer-loan-list').replaceChildren(...(rows.length ? rows : [element('p','\u6682\u65E0\u501F\u6B3E\u534F\u8BAE\u3002','club-muted')])); tick();
    }
    $('peer-loan-form').addEventListener('submit', async event => {
        event.preventDefault();
        if (await callbacks.transact(() => engine.offerLoan($('peer-loan-user').value, $('peer-loan-amount').value, Number($('peer-loan-rate').value), Number($('peer-loan-minutes').value)), '\u534F\u8BAE\u5DF2\u53D1\u51FA\uFF0C\u8BF7\u5207\u6362\u5230\u501F\u6B3E\u73A9\u5BB6\u786E\u8BA4\u3002')) $('peer-loan-amount').value = '';
    });
    return { render, tick };
}

function createDistressUI(engine, callbacks) {
    const $ = id => document.getElementById(id), overlay = $('shark-crisis'), go = $('shark-crisis-go');
    let bankAcknowledged = null, previousFocus = null;
    const inertNodes = new Map();
    function render(view) {
        const user = engine.active, recovery = user.recovery;
        const eligible = !recovery && engine.availableCredit === 0 && user.balance <= 0
            && CasinoEngine.sumBets(user.bets) === 0 && engine.availableSharkCredit > 0;
        const crisis = eligible && !callbacks.locked();
        if (!eligible || bankAcknowledged !== user.id || view !== 'bank') bankAcknowledged = null;
        const show = crisis && !(view === 'bank' && bankAcknowledged === user.id);
        const wasHidden = overlay.hidden;
        overlay.hidden = !show;
        if (show && wasHidden) {
            for (const node of document.body.children || []) if (node !== overlay) { inertNodes.set(node, node.inert); node.inert = true; }
        } else if (!show && !wasHidden) {
            for (const [node, inert] of inertNodes) node.inert = inert;
            inertNodes.clear();
        }
        document.body.classList.toggle('shark-crisis-active', eligible);
        $('club-recovery').hidden = !recovery;
        $('recovery-deficit').textContent = recovery ? '-' + recovery.deficit.toLocaleString() : '-0';
        $('recovery-budget').textContent = user.balance.toLocaleString();
        $('bank-recovery').hidden = !recovery;
        $('bank-recovery-deficit').textContent = recovery ? '-' + recovery.deficit.toLocaleString() : '-0';
        if (show && wasHidden) { previousFocus = document.activeElement; go.focus(); }
        if (!show && !wasHidden && previousFocus?.isConnected) previousFocus.focus();
    }
    go.addEventListener('click', () => {
        bankAcknowledged = engine.active.id;
        callbacks.openBank();
        $('shark-panel').scrollIntoView?.({ block: 'center', behavior: 'smooth' });
        $('shark-borrow-amount').focus();
    });
    overlay.addEventListener('keydown', event => {
        if (event.key === 'Tab' || event.key === 'Escape') { event.preventDefault(); go.focus(); }
    });
    return { render, get blocking() { return !overlay.hidden; } };
}

function createAccountUI(engine, callbacks) {
    const $ = id => document.getElementById(id), fmt = value => value.toLocaleString();
    let page = 1, forecastKey = '';
    function element(tag, text, className) {
        const node = document.createElement(tag); node.textContent = text;
        if (className) node.className = className;
        return node;
    }
    function tick() {
        const minutes = Number($('forecast-minutes').value || 10);
        const now = engine.projectDebts(0), later = engine.projectDebts(minutes);
        const key = engine.money.stringify([engine.active.id, minutes, now, later]);
        if (key === forecastKey) return;
        forecastKey = key;
        $('forecast-heading').textContent = minutes + ' \u5206\u949F\u540E';
        $('forecast-rows').replaceChildren(...[['bank','\u94F6\u884C'],['shark','\u9AD8\u5229\u8D37'],['peer','\u73A9\u5BB6\u501F\u6B3E'],['negative','\u8D1F\u6570\u8BB0\u5F55'],['total','\u5408\u8BA1']].map(([kind,label]) => {
            const row = document.createElement('tr'); row.append(element('th',label),element('td',fmt(now[kind])),element('td',fmt(later[kind])));
            row.children[0].setAttribute('scope','row'); return row;
        }));
        $('forecast-growth').textContent = \`\u672A\u6765 \${minutes} \u5206\u949F\u9884\u8BA1\u589E\u52A0 \${fmt(engine.money.sub(later.total,now.total))} \u7B79\u7801\u6B20\u6B3E\u3002\`;
    }
    function render() {
        const rows = CasinoAccounts.summaries(engine.data), current = rows.find(row => row.id === engine.active.id), locked = callbacks.locked();
        const selection = CasinoAccounts.selectPlayers(rows,{query:$('directory-search').value,sort:$('directory-sort').value,page});
        page = selection.page;
        $('directory-count').textContent = \`\${selection.total} \u4F4D\u5339\u914D \xB7 \u5171 \${rows.length} \u4F4D\u73A9\u5BB6\`;
        $('directory-empty').hidden = selection.total !== 0;
        $('directory-page').textContent = \`\${selection.page} / \${selection.pages}\`;
        $('directory-prev').disabled = page === 1; $('directory-next').disabled = page === selection.pages;
        $('directory-rows').replaceChildren(...selection.rows.map(player => {
            const row = document.createElement('tr'), name = element('td',player.name), cash = element('td',player.recovery ? '-'+fmt(player.negative) : fmt(player.cash));
            if (player.recovery) { cash.dataset.negative = 'true'; cash.append(element('small',\`\u53EF\u7528 \${fmt(player.allowance)} \xB7 \u8D1F\u6570\u6A21\u5F0F\`)); }
            else if (player.reserved) cash.append(element('small',\`\u53E6\u6709 \${fmt(player.reserved)} \u4E0B\u6CE8\u4E2D\`));
            const debt = element('td',fmt(player.debt)), net = element('td',fmt(player.net)), actions = document.createElement('td');
            net.dataset.negative = String(player.net < 0); net.append(element('small',\`\u5E94\u6536 \${fmt(player.receivable)}\`));
            const button = element('button',player.id===current.id?'\u5F53\u524D\u73A9\u5BB6':'\u5207\u6362','club-action secondary');
            button.type = 'button'; button.disabled = locked || player.id === current.id;
            button.addEventListener('click',()=>callbacks.switchPlayer(player.id)); actions.append(button);
            row.append(name,cash,debt,net,actions); return row;
        }));
        $('summary-net').textContent = fmt(current.net); $('summary-net').dataset.negative = String(current.net < 0);
        $('summary-liabilities').textContent = fmt(current.debt); $('summary-reserved').textContent = fmt(current.reserved); $('summary-receivable').textContent = fmt(current.receivable);
        const user = engine.active;
        $('bank-repay-all').disabled = locked || current.recovery || user.debt <= 0 || user.balance < user.debt;
        $('shark-repay-all').disabled = locked || current.recovery || user.sharkDebt <= 0 || user.balance < user.sharkDebt;
        $('repay-all-help').textContent = current.recovery ? '\u8D1F\u6570\u6A21\u5F0F\u5E95\u91D1\u4E0D\u80FD\u7528\u4E8E\u8FD8\u6B3E\u3002\u5148\u62B5\u6E05\u8D1F\u6570\uFF0C\u6062\u590D\u6B63\u5E38\u4F59\u989D\u3002' : '\u4F59\u989D\u8DB3\u591F\u65F6\u53EF\u4E00\u952E\u8FD8\u6E05\uFF1B\u670D\u52A1\u5668\u4F1A\u5148\u7ED3\u7B97\u5230\u671F\u5229\u606F\uFF0C\u518D\u6838\u5BF9\u6B20\u6B3E\u548C\u4F59\u989D\u3002';
        const entries = CasinoAccounts.activity(engine.data.ledger,$('activity-search').value);
        $('activity-count').textContent = \`\u5339\u914D \${entries.length} \u6761 \xB7 \u5F53\u524D\u4FDD\u7559\u6700\u8FD1 \${engine.data.ledger.length} \u6761\uFF08\u6700\u591A 100 \u6761\uFF09\`;
        $('activity-export').disabled = entries.length === 0;
        $('club-ledger').replaceChildren(...(entries.length ? entries.map(entry => {
            const row = document.createElement('li'), time = document.createElement('time'), date = new Date(entry.time);
            time.dateTime = entry.time; time.textContent = Number.isNaN(date.getTime()) ? entry.time : date.toLocaleString();
            row.append(element('span',entry.text),time); return row;
        }) : [element('li',engine.data.ledger.length?'\u6CA1\u6709\u5339\u914D\u7684\u8BB0\u5F55\uFF0C\u8BF7\u66F4\u6362\u5173\u952E\u8BCD\u3002':'\u8D26\u6237\u6D3B\u52A8\u4F1A\u663E\u793A\u5728\u8FD9\u91CC\u3002')]));
        tick();
    }
    for (const id of ['directory-search','directory-sort']) $(id).addEventListener(id.endsWith('search')?'input':'change',()=>{page=1;render();});
    $('directory-prev').addEventListener('click',()=>{page--;render();}); $('directory-next').addEventListener('click',()=>{page++;render();});
    $('activity-search').addEventListener('input',render); $('forecast-minutes').addEventListener('change',tick);
    $('bank-repay-all').addEventListener('click',()=>callbacks.transact(()=>engine.repayAll('bank'),'\u94F6\u884C\u6B20\u6B3E\u5DF2\u5168\u90E8\u8FD8\u6E05\u3002'));
    $('shark-repay-all').addEventListener('click',()=>callbacks.transact(()=>engine.repayAll('shark'),'\u9AD8\u5229\u8D37\u5DF2\u5168\u90E8\u8FD8\u6E05\u3002'));
    $('activity-export').addEventListener('click',()=>{
        let url, link;
        try {
            const entries = CasinoAccounts.activity(engine.data.ledger,$('activity-search').value);
            if (!entries.length) return;
            url = URL.createObjectURL(new Blob([CasinoAccounts.activityCSV(entries)],{type:'text/csv;charset=utf-8'}));
            link = document.createElement('a'); link.href = url; link.download = 'roulette-activity-'+Date.now()+'.csv';
            document.body.append(link); link.click(); callbacks.notify(\`\u5DF2\u5BFC\u51FA \${entries.length} \u6761\u7B5B\u9009\u8BB0\u5F55\u3002\`);
        } catch { callbacks.notify('\u5BFC\u51FA\u672A\u5B8C\u6210\uFF0C\u8BF7\u91CD\u65B0\u5C1D\u8BD5\u3002',true); }
        finally { link?.remove(); if(url)setTimeout(()=>URL.revokeObjectURL(url),1000); }
    });
    return {render,tick};
}

function createAdminUI(engine, callbacks) {
    const $=id=>document.getElementById(id);let auth=engine.auth||{enrolled:false,admin:false,canEnroll:false},working=false;
    let legacy=null;try{const raw=localStorage.getItem('roulette-club-v1');if(raw)legacy=engine.money.parseJSON(raw);}catch{}
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
        $('admin-adjust-player').replaceChildren(...engine.data.users.map(user=>{const option=document.createElement('option');option.value=user.id;option.textContent=user.name+' \xB7 '+(user.recovery?'-'+user.recovery.deficit.toLocaleString()+' \xB7 \u53EF\u7528 ':'')+user.balance.toLocaleString();return option;}));
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
        if(await callbacks.transact(()=>engine.adminAdjust($('admin-adjust-player').value,$('admin-adjust-mode').value,$('admin-adjust-amount').value,$('admin-adjust-reason').value),'\u7BA1\u7406\u5458\u4F59\u989D\u8C03\u6574\u5DF2\u4FDD\u5B58\u5E76\u8BB0\u5F55\u3002')){$('admin-adjust-amount').value='';$('admin-adjust-reason').value='';}
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
    let view = 'roulette', toastTimer, lucky, blackjack, plinko, dice, lottery, customRoulette, economy, playerLoans, accounts, admin, distress, adminPage = 1, recoveryPlayer = null, pendingDelete = null;
    const $ = id => document.getElementById(id);
    const fmt = n => n.toLocaleString();
    const busy = () => Boolean(engine.lock);
    const viewLocked = () => busy() || roulette.isChargingSpin || roulette.isDraggingTurret || Boolean(blackjack?.animating) || Boolean(lucky?.dragging) || Boolean(plinko?.animating) || Boolean(dice?.animating) || Boolean(lottery?.animating);
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
        if (u.recovery && recoveryPlayer !== u.id) {
            recoveryPlayer = u.id; roulette.selectedChip = 10; roulette.customBet = false;
            $('bj-wager').value = '10'; lucky?.resetPlayer();
            $('roulette-custom-selected').textContent = '\u8D1F\u6570\u6A21\u5F0F \xB7 \u672C\u5C40\u53EF\u7528 10 \u7B79\u7801';
        } else if (!u.recovery) recoveryPlayer = null;
        const selectedRecipient = $('transfer-user').value;
        $('club-user').replaceChildren(...engine.data.users.map(option));
        $('club-user').value = u.id;
        $('club-user').disabled = viewLocked();
        $('transfer-user').replaceChildren(...engine.data.users.filter(p => p.id !== u.id).map(option));
        if ([...$('transfer-user').options].some(o => o.value === selectedRecipient)) $('transfer-user').value = selectedRecipient;
        const visualWallet = (view === 'plinko' ? plinko?.displayBalance : view === 'dice' ? dice?.displayBalance : view === 'lottery' ? lottery?.displayBalance : lucky?.displayBalance) ?? u.balance;
        $('club-wallet').textContent = u.recovery ? \`-\${fmt(u.recovery.deficit)} \xB7 \u53EF\u7528 \${fmt(visualWallet)} \u20B5\` : \`\${fmt(visualWallet)} \u20B5\`;
        $('bank-greeting').textContent = \`\${u.name}\u2019s wallet & bank\`;
        $('bank-wallet').textContent = fmt(u.balance);
        $('bank-debt').textContent = fmt(u.debt);
        $('bank-credit').textContent = fmt(engine.availableCredit);
        $('club-storage-note').textContent = engine.storageWarning;
        const adminSelection = CasinoAccounts.selectPlayers(engine.data.users,{query:$('admin-player-search').value,page:adminPage});
        adminPage = adminSelection.page;
        $('admin-player-count').textContent = \`\${adminSelection.total} \u4F4D\u5339\u914D \xB7 \u5171 \${engine.data.users.length} \u4F4D\u73A9\u5BB6\`;
        $('admin-player-page').textContent = \`\${adminPage} / \${adminSelection.pages}\`;
        $('admin-player-prev').disabled = adminPage === 1; $('admin-player-next').disabled = adminPage === adminSelection.pages;
        $('club-player-list').replaceChildren(...adminSelection.rows.map(p => {
            const row = document.createElement('div'); row.className = 'club-player';
            const avatar = document.createElement('span'); avatar.className = 'club-avatar'; avatar.textContent = p.name[0].toUpperCase();
            const data = document.createElement('div'); data.className = 'club-player-data';
            const name = document.createElement('div'); name.className = 'club-player-name'; name.textContent = p.name;
            const detail = document.createElement('div'); detail.className = 'club-player-detail';
            detail.textContent = \`\${p.recovery ? '-' + fmt(p.recovery.deficit) + ' \xB7 \u53EF\u7528 ' : ''}\${fmt(p.balance)} chips \xB7 \${fmt(engine.money.add(p.debt, p.sharkDebt))} debt\${CasinoEngine.sumBets(p.bets) ? \` \xB7 \${fmt(CasinoEngine.sumBets(p.bets))} on roulette\` : ''}\`;
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
        if (!adminSelection.total) { const empty = document.createElement('p'); empty.textContent = '\u6CA1\u6709\u5339\u914D\u7684\u73A9\u5BB6\uFF0C\u8BF7\u66F4\u6362\u641C\u7D22\u540D\u79F0\u3002'; empty.className = 'club-muted'; $('club-player-list').append(empty); }
        document.querySelectorAll('[data-idle-only]').forEach(el => { el.disabled = viewLocked(); });
        document.querySelectorAll('#transfer-form button, #peer-loan-form button, #bank-form button, #shark-repay-form button').forEach(el => { el.disabled = viewLocked() || Boolean(u.recovery); });
        document.querySelectorAll('[data-view]').forEach(el => { el.disabled = viewLocked(); });
        lucky?.update(viewLocked());
        customRoulette?.update(viewLocked());
        blackjack?.update();
        plinko?.update();dice?.update();lottery?.update();
        document.querySelectorAll('#roulette-controls [data-bet], .chip-btn, #clear-bets-btn, #rebet-btn, #open-number-modal-btn, #spin-btn').forEach(el => { el.disabled = busy(); });
        economy?.render();
        playerLoans?.render();
        accounts?.render();
        distress?.render(view);
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
        $('plinko-view').hidden = view !== 'plinko';$('dice-view').hidden = view !== 'dice';
        plinko.setVisible(view === 'plinko');dice.setVisible(view === 'dice');
        $('lottery-view').hidden = view !== 'lottery'; lottery.setVisible(view === 'lottery');
        document.querySelectorAll('[data-view]').forEach(b => b.setAttribute('aria-selected', String(b.dataset.view === view)));
        document.querySelectorAll('.club-roulette-hud, #roulette-controls, #hint-pill, #status-banner, #canvas-container').forEach(el => {
            if (view === 'roulette') el.style.removeProperty('display'); else el.style.display = 'none';
        });
        render();
    }
    function setView(next) {
        if (!['roulette', 'slots', 'blackjack', 'plinko', 'dice', 'lottery', 'bank', 'market', 'players', 'admin'].includes(next)) return;
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
            if (distress?.blocking) return false;
            if (!['roulette', 'slots', 'blackjack', 'plinko', 'dice', 'lottery'].includes(view)) return false;
            if (roulette.isChargingSpin || roulette.isDraggingTurret || lucky?.dragging) { toast('Release the controls before using the shortcut.', true); return; }
            if (view === 'blackjack') blackjack.forceJackpot();
            else if (view === 'plinko') plinko.forceJackpot();
            else if (view === 'dice') dice.forceJackpot();
            else if (view === 'lottery') lottery.forceJackpot();
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
        plinko = createArcadeGame('plinko',engine,{locked:viewLocked,changed:()=>updateBettingHUD(),notify:toast});
        dice = createArcadeGame('dice',engine,{locked:viewLocked,changed:()=>updateBettingHUD(),notify:toast});
        lottery = createLotteryGame(engine,{locked:viewLocked,changed:()=>updateBettingHUD(),notify:toast});
        lucky = createLucky777(engine, {bank: () => setView('bank'), market: () => setView('market'),
            locked: viewLocked,
            changed: () => updateBettingHUD(),
            notify: toast
        });
        admin = createAdminUI(engine, {locked:viewLocked,transact,changed:()=>{lucky.resetPlayer();render();}});
        distress = createDistressUI(engine, {locked:viewLocked,openBank:()=>setView('bank')});
        accounts = createAccountUI(engine, {locked:viewLocked,transact,switchPlayer,notify:toast});
        if(engine.remote) engine.onChange = render;
        $('admin-player-search').addEventListener('input',()=>{adminPage=1;pendingDelete=null;render();});
        $('admin-player-prev').addEventListener('click',()=>{adminPage--;pendingDelete=null;render();});
        $('admin-player-next').addEventListener('click',()=>{adminPage++;pendingDelete=null;render();});
        document.querySelectorAll('[data-view]').forEach(b => b.addEventListener('click', () => setView(b.dataset.view)));
        document.querySelectorAll('[data-go-bank]').forEach(b => b.addEventListener('click', () => setView('bank')));
        $('club-user').addEventListener('change', e => switchPlayer(e.target.value));
        $('transfer-form').addEventListener('submit', async e => {
            e.preventDefault();
            if (await transact(() => engine.transfer($('transfer-user').value, $('transfer-amount').value), 'Chips transferred successfully.')) $('transfer-form').reset();
        });
        $('bank-form').addEventListener('submit', async e => {
            e.preventDefault();
            const repay = e.submitter?.value === 'repay';
            if (await transact(() => engine[repay ? 'repay' : 'borrow']($('bank-amount').value), repay ? 'Debt repaid. Available credit updated.' : 'Borrowed chips added to your wallet.')) $('bank-form').reset();
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
            if (distress?.blocking && e.code === 'Space') { e.preventDefault(); e.stopImmediatePropagation(); return; }
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
        else if (['roulette', 'slots', 'blackjack', 'plinko', 'dice', 'lottery', 'bank', 'market', 'players', 'admin'].includes(requestedView)) view = requestedView;
        paintView();
        let lastSync = 0;
        const tick = () => {
            if(engine.remote && !viewLocked() && Date.now()-lastSync >= 5000){lastSync=Date.now();engine.sync().catch(()=>{});}
            if (engine.accrueInterest()) { engine.save(); render(); }
            else { economy?.tick(); playerLoans?.tick(); accounts?.tick(); }
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
            let sum = CasinoEngine.money.add(state.bets.RED, state.bets.BLACK, state.bets.GREEN, state.bets.ODD, state.bets.EVEN);
            for (const k in state.bets.numbers) {
                sum = CasinoEngine.money.add(sum, state.bets.numbers[k]);
            }
            return sum;
        }

        function getChipIncrement() {
            if (state.customBet) {
                try {
                    const amount = casino.engine.amount(state.selectedChip);
                    if (amount > state.balance) throw new Error('Not enough chips for your custom bet. Lower it or visit the bank.');
                    return amount;
                } catch (error) { casino.toast(error.message, true); return 0; }
            }
            if (state.selectedChip === 'ALL') return state.balance;
            return CasinoEngine.money.min(state.balance, CasinoEngine.money.parse(state.selectedChip));
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

            state.balance = CasinoEngine.money.sub(state.balance, amount);
            state.bets[category] = CasinoEngine.money.add(state.bets[category], amount);
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

            state.balance = CasinoEngine.money.sub(state.balance, amount);
            state.bets.numbers[pocketNum] = CasinoEngine.money.add(state.bets.numbers[pocketNum] || 0, amount);
            sfx.playChipSound();
            updateBettingHUD();
            renderNumberModalGrid();
        }

        function clearAllBets() {
            if (casino.engine.remote) { if(casino.busy())return; casino.engine.rouletteClear().then(() => {updateBettingHUD();renderNumberModalGrid();}).catch(error=>casino.toast(error.message,true)); return; }
            if (casino.busy()) return;
            const refund = getTotalActiveBet();
            if (refund === 0) return;

            state.balance = CasinoEngine.money.add(state.balance, refund);
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
            state.balance = CasinoEngine.money.add(state.balance, getTotalActiveBet());
            state.bets = { RED: 0, BLACK: 0, GREEN: 0, ODD: 0, EVEN: 0, numbers: {} };

            // Calculate total needed
            let needed = CasinoEngine.money.add(state.lastBets.RED, state.lastBets.BLACK, state.lastBets.GREEN, state.lastBets.ODD, state.lastBets.EVEN);
            for (const k in state.lastBets.numbers) {
                needed = CasinoEngine.money.add(needed, state.lastBets.numbers[k]);
            }

            if (needed <= 0 || needed > state.balance) {
                updateBettingHUD();
                return;
            }

            state.balance = CasinoEngine.money.sub(state.balance, needed);
            state.bets = structuredClone(state.lastBets);
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
                state.lastBets = structuredClone(state.bets);
            }

            let totalPayout = 0;

            // 1. Straight-up number bet (24x payout)
            if (state.bets.numbers[num]) {
                totalPayout = CasinoEngine.money.add(totalPayout, CasinoEngine.money.mul(state.bets.numbers[num], 24));
            }

            // 2. Green Zero bet (24x payout)
            if (num === 0 && state.bets.GREEN > 0) {
                totalPayout = CasinoEngine.money.add(totalPayout, CasinoEngine.money.mul(state.bets.GREEN, 24));
            }

            // 3. Red / Black bets (2x payout)
            // Note: In Image Mode, all 23 non-zero frames are visually red, so if the player bet on RED in Image Mode OR if it's an Odd/Red pocket, let's check:
            // To make both modes rewarding and clear:
            // Odd numbers (1, 3, 5..23) are RED & ODD; Even numbers (2, 4, 6..22) are BLACK/DARK & EVEN.
            // PLUS in Image Mode, if a user only bet on RED (because of the 23 red frames meme!) and didn't bet on BLACK, we still honour standard Odd=Red / Even=Dark OR give a bonus! Wait\u2014let's make Red win on Odd pockets (1,3,5...) and Black/Dark win on Even pockets (2,4,6...) consistently for fair 2x payout, and highlight the winning pocket in 3D!
            if (isRedPocket(num) && state.bets.RED > 0) {
                totalPayout = CasinoEngine.money.add(totalPayout, CasinoEngine.money.mul(state.bets.RED, 2));
            }
            if (isBlackPocket(num) && state.bets.BLACK > 0) {
                totalPayout = CasinoEngine.money.add(totalPayout, CasinoEngine.money.mul(state.bets.BLACK, 2));
            }

            // 4. Odd / Even bets (2x payout)
            if (num !== 0 && num % 2 === 1 && state.bets.ODD > 0) {
                totalPayout = CasinoEngine.money.add(totalPayout, CasinoEngine.money.mul(state.bets.ODD, 2));
            }
            if (num !== 0 && num % 2 === 0 && state.bets.EVEN > 0) {
                totalPayout = CasinoEngine.money.add(totalPayout, CasinoEngine.money.mul(state.bets.EVEN, 2));
            }

            state.balance = CasinoEngine.money.add(state.balance, totalPayout);
            casino.engine.lock = null;
            casino.engine.active.pendingRoulette = false;
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

            if (totalWagered > 0) casino.engine.completeRound(CasinoEngine.money.sub(totalPayout, totalWagered));
            updateBettingHUD();
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
                const net = CasinoEngine.money.sub(payout, wagered);
                badge.textContent = payout >= CasinoEngine.money.mul(wagered, 10) ? 'JACKPOT WIN!' : 'WINNER!';
                badge.className = 'px-3 py-0.5 rounded-full text-xs font-extrabold uppercase tracking-widest bg-emerald-500/25 text-emerald-300';
                sub.textContent = \`+\${payout.toLocaleString()} CHIPS PAID (NET \${net >= 0 ? '+' : '\u2212'}\${CasinoEngine.money.abs(net).toLocaleString()})\`;
                sub.className = 'text-xs sm:text-sm font-extrabold text-emerald-400';
                sfx.playWinSound(payout >= CasinoEngine.money.mul(wagered, 10));
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
</html>`;var jH=na(ti(),1);(function(t){"use strict";!t.CasinoMoney&&typeof an=="function"&&ti();let e=t.CasinoMoney,r=1e7,n=Object.freeze([1e3,1e4,1e6]),o=Object.freeze([{weight:500,numerator:200,name:"\u7279\u7B49\u5956"},{weight:2e3,numerator:100,name:"\u4E00\u7B49\u5956"},{weight:3e4,numerator:20,name:"\u4E8C\u7B49\u5956"},{weight:6e4,numerator:16,name:"\u4E09\u7B49\u5956"},{weight:12e4,numerator:10,name:"\u56DB\u7B49\u5956"},{weight:25e4,numerator:8,name:"\u4E94\u7B49\u5956"},{weight:35e4,numerator:5,name:"\u516D\u7B49\u5956"},{weight:45e4,numerator:4,name:"\u4E03\u7B49\u5956"},{weight:75e4,numerator:3,name:"\u516B\u7B49\u5956"},{weight:2e6,numerator:2,name:"\u4FDD\u672C\u672B\u7B49\u5956"},{weight:5987500,numerator:0,name:"\u672A\u4E2D\u5956"}].map(Object.freeze));function i(h){let m=e.positive(h);if(!n.includes(m))throw new Error("\u5F69\u7968\u7968\u4EF7\u53EA\u80FD\u9009\u62E9 1,000\u300110,000 \u6216 1,000,000 \u7B79\u7801\u3002");return m}function a(h,m){let k=i(h);if(!Number.isInteger(m)||m<0||m>=r)throw new Error("\u5F69\u7968\u5F00\u5956\u7ED3\u679C\u65E0\u6548\u3002");let I=0,C=o.findIndex(x=>m<(I+=x.weight)),R=o[C],S=e.ratio(k,R.numerator,2);return{game:"lottery",ticket:m,tier:C,wager:k,multiplier:R.numerator/2,payout:S,net:e.sub(S,k)}}function c(h){let k=Math.floor(4294967296/r)*r;for(let I=0;I<64;I++){let C=h();if(typeof C!="number"||!(C>=0&&C<1))throw new Error("\u65E0\u6CD5\u751F\u6210\u6709\u6548\u5F69\u7968\uFF0C\u8BF7\u91CD\u8BD5\u3002");let R=Math.floor(C*4294967296);if(R<k)return R%r}throw new Error("\u65E0\u6CD5\u751F\u6210\u6709\u6548\u5F69\u7968\uFF0C\u8BF7\u91CD\u8BD5\u3002")}function d(h,m,k=!1){let I=i(h);return a(I,k?0:c(m))}function u(h){try{if(!h||h.game!=="lottery"||typeof h.id!="string"||typeof h.time!="string")return!1;let m=a(h.wager,h.ticket);return["tier","multiplier","payout","net"].every(k=>h[k]===m[k])}catch{return!1}}let p=o.reduce((h,m)=>h+m.weight*m.numerator,0);t.CasinoLottery={prices:n,tiers:o,total:r,expectedNumerator:p,price:i,fromTicket:a,drawTicket:c,draw:d,validHistory:u}})(globalThis);(function(t){"use strict";!t.CasinoMoney&&typeof an=="function"&&ti();let e=t.CasinoMoney,r=12,n=Object.freeze({low:Object.freeze([800,400,200,140,110,70,40,70,110,140,200,400,800]),medium:Object.freeze([2500,800,300,150,100,60,20,60,100,150,300,800,2500]),high:Object.freeze([1e4,1500,400,200,60,20,0,20,60,200,400,1500,1e4])}),o=Object.freeze({left:.44,center:.5,right:.56}),i=Object.freeze({4:61,5:31,6:19,7:13,8:9,9:7,10:7,11:7,12:7,13:9,14:13,15:19,16:31,17:61}),a=x=>e.positive(x),c=x=>{let L=x();if(!(L>=0&&L<1))throw new Error("\u65E0\u6CD5\u751F\u6210\u6709\u6548\u7ED3\u679C\uFF0C\u8BF7\u91CD\u8BD5\u3002");return L};function d(x,L){if(!Object.hasOwn(n,x)||!Object.hasOwn(o,L))throw new Error("\u8BF7\u9009\u62E9\u6709\u6548\u7684\u98CE\u9669\u548C\u843D\u7403\u53E3\u3002");return{table:n[x],rightChance:o[L]}}function u(x,L,Y,V){x=a(x);let{table:ie}=d(L,Y);if(!Array.isArray(V)||V.length!==r||!V.every(A=>A===0||A===1))throw new Error("\u5F39\u73E0\u8DEF\u5F84\u65E0\u6548\u3002");let ne=V.reduce((A,v)=>A+v,0),H=ie[ne]/100,g=e.ratio(x,ie[ne],100);return{game:"plinko",wager:x,risk:L,lane:Y,path:[...V],pocket:ne,multiplier:H,payout:g,net:e.sub(g,x)}}function p(x,L,Y,V,ie=!1){let{rightChance:ne}=d(L,Y);a(x);let H=Array.from({length:r},()=>ie?Y==="right"?1:0:+(c(V)<ne));return u(x,L,Y,H)}function h(x,L){if(!Number.isInteger(x)||x<0||x>r||!Object.hasOwn(o,L))throw new Error("\u69FD\u4F4D\u65E0\u6548\u3002");let Y=1;for(let V=1;V<=x;V++)Y=Y*(r-V+1)/V;return Y*o[L]**x*(1-o[L])**(r-x)}function m(x,L){u(1,"low",L,x);let Y=0,V=[{x:{left:-1.8,center:0,right:1.8}[L],y:6.3},{x:0,y:5.22}];for(let ie=1;ie<=r;ie++)Y+=x[ie-1],V.push({x:(Y-ie/2)*.82,y:5.22-ie*.72});return V.push({x:(Y-6)*.82,y:-4.05}),V}function k(x,L){if(!["small","big","odd","even","triple","sum"].includes(x))throw new Error("\u8BF7\u9009\u62E9\u6709\u6548\u7684\u9AB0\u5B9D\u4E0B\u6CE8\u3002");if(x==="sum"&&(!Number.isInteger(L)||!Object.hasOwn(i,L)))throw new Error("\u6307\u5B9A\u603B\u70B9\u6570\u9700\u4E3A 4\u201317\u3002");return x==="sum"?i[L]:x==="triple"?31:2}function I(x,L,Y,V){x=a(x);let ie=k(L,Y);if(!Array.isArray(V)||V.length!==3||!V.every(j=>Number.isInteger(j)&&j>=1&&j<=6))throw new Error("\u9AB0\u5B50\u7ED3\u679C\u65E0\u6548\u3002");let ne=V.reduce((j,T)=>j+T,0),H=V.every(j=>j===V[0]),A=(L==="triple"?H:L==="sum"?ne===Y:!H&&(L==="small"?ne>=4&&ne<=10:L==="big"?ne>=11&&ne<=17:L==="odd"?ne%2===1:ne%2===0))?ie:0,v=e.mul(x,A);return{game:"dice",wager:x,kind:L,target:L==="sum"?Y:null,dice:[...V],total:ne,triple:H,multiplier:A,payout:v,net:e.sub(v,x)}}function C(x,L,Y,V,ie=!1){k(L,Y),a(x);let ne;if(ie){e:for(let H=1;H<=6;H++)for(let g=1;g<=6;g++)for(let A=1;A<=6;A++)if(I(x,L,Y,[H,g,A]).payout>0){ne=[H,g,A];break e}}else ne=Array.from({length:3},()=>1+Math.floor(c(V)*6));return I(x,L,Y,ne)}function R(x){let L={1:{x:0,z:Math.PI/2},2:{x:0,z:0},3:{x:-Math.PI/2,z:0},4:{x:Math.PI/2,z:0},5:{x:0,z:Math.PI},6:{x:0,z:-Math.PI/2}};if(!Object.hasOwn(L,x))throw new Error("\u9AB0\u5B50\u70B9\u6570\u65E0\u6548\u3002");return L[x]}function S(x){try{if(!x||typeof x.id!="string"||typeof x.time!="string")return!1;let L=x.game==="plinko"?u(x.wager,x.risk,x.lane,x.path):x.game==="dice"?I(x.wager,x.kind,x.target,x.dice):null;return!!(L&&x.payout===L.payout&&x.net===L.net&&x.multiplier===L.multiplier&&(x.game!=="dice"||x.total===L.total))}catch{return!1}}t.CasinoArcade={rows:r,tables:n,lanes:o,sumReturns:i,plinkoSettings:d,plinkoResult:u,plinko:p,pocketProbability:h,pathPoints:m,diceSettings:k,diceResult:I,dice:C,diceRotation:R,validHistory:S}})(globalThis);(function(t){"use strict";!t.CasinoMoney&&typeof an=="function"&&ti();let e=t.CasinoMoney,r="roulette-club-v1",n=1e5,o=15e5,i=10*6e4,a=3*6e4,c=15*6e4,d=2,u=1e9,p=["7","\u{1F48E}","BAR","\u{1F514}","\u{1F340}","\u{1F352}"],h=[50,25,20,15,10,5],m=[0,5,3,1,4,2,0,5,4,3,5,1],k=()=>({RED:0,BLACK:0,GREEN:0,ODD:0,EVEN:0,numbers:{}}),I=H=>e.add(...["RED","BLACK","GREEN","ODD","EVEN"].map(g=>H[g]),...Object.values(H.numbers)),C=(H,g=null)=>e.valid(H)&&H>=0&&(g===null||typeof H=="number"&&H<=g),R=Object.freeze({seven:Object.freeze({name:"\u4FDD\u5E95 777",factor:35,multiplier:50,reels:[0,6,0],symbol:"7 7 7"}),diamonds:Object.freeze({name:"\u4FDD\u5E95\u4E09\u94BB\u77F3",factor:18,multiplier:25,reels:[3,11,3],symbol:"\u{1F48E} \u{1F48E} \u{1F48E}"}),bars:Object.freeze({name:"\u4FDD\u5E95\u4E09 BAR",factor:14,multiplier:20,reels:[5,5,5],symbol:"BAR BAR BAR"})}),S=()=>({sharkDebt:0,bankInterestAt:null,sharkInterestAt:null,marketAvailableAt:0,cards:[],armedCardId:null}),x=H=>H===null||Number.isSafeInteger(H)&&H>=0;function L(H,g,A,v=u){if(g===0)return H;for(let j=0;j<A&&(v===null||H<v);j++)H=e.add(H,e.ratio(H,g,1e4,!0)),v!==null&&(H=e.min(v,H));return H}function Y(H){return C(H.sharkDebt)&&x(H.bankInterestAt)&&x(H.sharkInterestAt)&&x(H.marketAvailableAt)&&(H.recovery==null||typeof H.recovery=="object"&&C(H.recovery.deficit))&&Array.isArray(H.cards)&&H.cards.length<=50&&H.cards.every(g=>g&&typeof g.id=="string"&&Object.hasOwn(R,g.type)&&C(g.stake)&&g.stake>0)&&new Set(H.cards.map(g=>g.id)).size===H.cards.length&&(H.armedCardId===null||H.cards.some(g=>g.id===H.armedCardId))}function V(H){return H&&["RED","BLACK","GREEN","ODD","EVEN"].every(g=>C(H[g]))&&H.numbers&&typeof H.numbers=="object"&&!Array.isArray(H.numbers)&&Object.entries(H.numbers).every(([g,A])=>/^(?:[0-9]|1[0-9]|2[0-3])$/.test(g)&&C(A))&&C(I(H))}function ie(H,g){return{id:H,name:g,balance:1e3,debt:0,bets:k(),lastBets:null,history:[],pendingRoulette:!1,...S()}}class ne{constructor(g,A,v=()=>Date.now(),{recoverRoulette:j=!0}={}){this.storage=g,this.now=v,this.random=A||(()=>{let T=new Uint32Array(1);return t.crypto.getRandomValues(T),T[0]/4294967296}),this.lock=null,this.storageWarning="",this.data={version:1,activeId:"alex",users:[ie("alex","Alex"),ie("jamie","Jamie"),ie("taylor","Taylor")],ledger:[],loans:[]};try{let T=g&&g.getItem(r);if(T){let B=e.parseJSON(T);if(Array.isArray(B.users)&&(B.users=B.users.map(M=>({...S(),...M}))),B.loans??=[],B.version!==1||!Array.isArray(B.users)||B.users.length<1||!Array.isArray(B.ledger)||!Array.isArray(B.loans)||B.loans.length>200||!B.loans.every(M=>this.validLoan(M,B.users))||new Set(B.loans.map(M=>M.id)).size!==B.loans.length||!B.users.some(M=>M.id===B.activeId)||new Set(B.users.map(M=>M.id)).size!==B.users.length||!B.users.every(M=>typeof M.id=="string"&&typeof M.name=="string"&&M.name.trim().length>0&&M.name.length<=24&&e.valid(M.balance)&&C(M.debt)&&Y(M)&&V(M.bets)&&(M.lastBets===null||V(M.lastBets))&&Array.isArray(M.history)))throw new Error("Invalid saved profiles");this.data=B,this.data.ledger=B.ledger.filter(M=>M&&typeof M.text=="string"&&typeof M.time=="string").slice(0,100);for(let M of B.users)delete M.bankRounds,delete M.sharkRounds,M.history=M.history.filter(be=>be&&C(be.num,23)&&["GREEN","RED","BLACK"].includes(be.colorTag)).slice(0,10),M.pendingRoulette&&j&&(M.balance=e.add(M.balance,I(M.bets)),M.bets=k(),M.pendingRoulette=!1,this.record(`${M.name}: interrupted roulette stake refunded.`))}}catch{this.storageWarning="Saved profiles could not be read. This session starts with fresh local profiles."}this.accrueInterest();for(let T of this.data.users)this.prepareRecovery(T);this.save()}get money(){return e}get active(){return this.data.users.find(g=>g.id===this.data.activeId)}get availableCredit(){return e.max(0,e.sub(n,this.active.debt))}get availableSharkCredit(){return e.max(0,e.sub(o,this.active.sharkDebt))}get canBorrowShark(){return!this.lock&&!this.active.recovery&&this.availableCredit===0&&this.active.balance<=0&&I(this.active.bets)===0&&this.availableSharkCredit>0}get armedCard(){return this.active.cards.find(g=>g.id===this.active.armedCardId)||null}prepareRecovery(g=this.active){return!g||g.recovery||g.balance>0||!(g.sharkDebt>0)||I(g.bets)||g.pendingRoulette||g.blackjack&&g.blackjack.phase!=="settled"?!1:(g.recovery={deficit:e.max(0,e.sub(0,g.balance))},g.balance=10,this.record(`${g.name} \xB7 \u9AD8\u5229\u8D37\u7B79\u7801\u5DF2\u7528\u5C3D\uFF0C\u8FDB\u5165\u8D1F\u6570\u6A21\u5F0F\uFF1A-${g.recovery.deficit.toLocaleString()}\uFF0C\u6BCF\u5C40\u53EF\u7528 10\u3002`),!0)}ensureCashWallet(g=this.active){if(g.recovery)throw new Error("\u8D1F\u6570\u6A21\u5F0F\u7684 10 \u7B79\u7801\u4EC5\u7528\u4E8E\u6E38\u620F\uFF0C\u4E0D\u80FD\u8D60\u9001\u3001\u51FA\u501F\u3001\u8D2D\u4E70\u6216\u8FD8\u6B3E\u3002\u76C8\u5229\u5148\u62B5\u6263\u8D1F\u6570\u3002")}recoveryNet(g,A){let v=e.sub(g.recovery.deficit,A);A>0&&v<=0?(g.recovery=null,g.balance=e.sub(10,v)):(g.recovery.deficit=e.max(0,v),g.balance=10)}credit(g,A){g.recovery?this.recoveryNet(g,A):g.balance=e.add(g.balance,A)}ensureIdle(){if(this.lock)throw new Error("Wait for the current spin to finish.");this.accrueInterest()&&this.save()}amount(g,A=null){let v=e.positive(g);if(A!==null&&v>A)throw new Error("Enter a whole number from 1 to "+A.toLocaleString()+".");return v}save(){this.accrueInterest();try{this.storage&&this.storage.setItem(r,e.stringify(this.data))}catch{this.storageWarning="Browser storage is unavailable. Keep this page open to retain this session."}}record(g){this.data.ledger.unshift({text:g,time:new Date().toISOString()}),this.data.ledger=this.data.ledger.slice(0,100)}switchUser(g){if(this.ensureIdle(),!this.data.users.some(A=>A.id===g))throw new Error("Choose an existing player.");this.data.activeId=g,this.save()}addUser(g){if(this.ensureIdle(),g=String(g).trim(),!g||g.length>24)throw new Error("Use a player name with 1\u201324 characters.");if(this.data.users.some(v=>v.name.toLowerCase()===g.toLowerCase()))throw new Error("That player name is already taken.");let A=ie(t.crypto.randomUUID(),g);return this.data.users.push(A),this.data.activeId=A.id,this.record(`${g} joined with 1,000 starter chips.`),this.save(),A}validLoan(g,A){return g&&typeof g.id=="string"&&typeof g.lenderId=="string"&&typeof g.borrowerId=="string"&&g.lenderId!==g.borrowerId&&typeof g.lenderName=="string"&&typeof g.borrowerName=="string"&&C(g.principal)&&g.principal>0&&C(g.balance)&&C(g.rateBps,1e4)&&C(g.periodMs,1440*6e4)&&g.periodMs>=6e4&&g.periodMs%6e4===0&&x(g.createdAt)&&x(g.interestAt)&&["pending","active","declined","cancelled","repaid"].includes(g.status)&&(!["pending","active"].includes(g.status)||[g.lenderId,g.borrowerId].every(v=>A.some(j=>j.id===v)))&&(g.status!=="active"||g.interestAt!==null&&g.balance>0)}offerLoan(g,A,v,j=10){this.ensureIdle(),this.ensureCashWallet();let T=this.active,B=this.data.users.find(me=>me.id===g),M=this.amount(A);if(!B||B===T)throw new Error("\u8BF7\u9009\u62E9\u53E6\u4E00\u4F4D\u501F\u6B3E\u73A9\u5BB6\u3002");let be=Math.round(v*100);if(!Number.isFinite(v)||!C(be,1e4)||Math.abs(v*100-be)>1e-6)throw new Error("\u5229\u7387\u9700\u4E3A 0\u2013100%\uFF0C\u6700\u591A\u4E24\u4F4D\u5C0F\u6570\u3002");if(!C(j,1440)||j<1)throw new Error("\u8BA1\u606F\u5468\u671F\u9700\u4E3A 1\u20131,440 \u5206\u949F\u3002");if(M>T.balance)throw new Error("\u51FA\u501F\u4EBA\u7684\u4F59\u989D\u4E0D\u8DB3\u3002");if(this.data.loans=this.data.loans.filter(me=>["pending","active"].includes(me.status)||this.data.loans.indexOf(me)<100),this.data.loans.length>=200)throw new Error("\u501F\u6B3E\u534F\u8BAE\u6570\u91CF\u5DF2\u8FBE\u4E0A\u9650\uFF0C\u8BF7\u5148\u5904\u7406\u5F85\u786E\u8BA4\u534F\u8BAE\u3002");let ve={id:t.crypto.randomUUID(),lenderId:T.id,borrowerId:g,lenderName:T.name,borrowerName:B.name,principal:M,balance:M,rateBps:be,periodMs:j*6e4,status:"pending",createdAt:this.now(),interestAt:null};return this.data.loans.unshift(ve),this.record(`${T.name} \u2192 ${B.name}: \u53D1\u8D77\u501F\u6B3E\u534F\u8BAE ${M.toLocaleString()}\uFF0C\u6BCF ${j} \u5206\u949F ${v}%\uFF0C\u7B49\u5F85\u501F\u6B3E\u4EBA\u786E\u8BA4\u3002`),this.save(),ve}respondLoan(g,A){this.ensureIdle();let v=this.data.loans.find(B=>B.id===g);if(!v||v.status!=="pending"||v.borrowerId!==this.active.id)throw new Error("\u53EA\u6709\u501F\u6B3E\u4EBA\u80FD\u786E\u8BA4\u8FD9\u4EFD\u5F85\u5904\u7406\u534F\u8BAE\u3002");if(!A){v.status="declined",this.record(`${v.borrowerName} \u62D2\u7EDD\u4E86 ${v.lenderName} \u7684\u501F\u6B3E\u534F\u8BAE\u3002`),this.save();return}let j=this.data.users.find(B=>B.id===v.lenderId),T=this.active;if(this.ensureCashWallet(T),j&&this.ensureCashWallet(j),!j||j.balance<v.principal)throw new Error("\u51FA\u501F\u4EBA\u5F53\u524D\u4F59\u989D\u4E0D\u8DB3\uFF0C\u5C1A\u672A\u6263\u6B3E\u3002");j.balance=e.sub(j.balance,v.principal),T.balance=e.add(T.balance,v.principal),v.status="active",v.interestAt=this.now(),this.record(`${v.borrowerName} \u5DF2\u63A5\u53D7\u534F\u8BAE\uFF0C${v.lenderName} \u8F6C\u5165 ${v.principal.toLocaleString()}\u3002`),this.save()}cancelLoan(g){this.ensureIdle();let A=this.data.loans.find(v=>v.id===g);if(!A||A.status!=="pending"||A.lenderId!==this.active.id)throw new Error("\u53EA\u80FD\u64A4\u9500\u81EA\u5DF1\u53D1\u8D77\u7684\u5F85\u786E\u8BA4\u534F\u8BAE\u3002");A.status="cancelled",this.record(`${A.lenderName} \u64A4\u9500\u4E86\u7ED9 ${A.borrowerName} \u7684\u501F\u6B3E\u534F\u8BAE\u3002`),this.save()}repayLoan(g,A){this.ensureIdle(),this.ensureCashWallet();let v=this.data.loans.find(M=>M.id===g);if(!v||v.status!=="active"||v.borrowerId!==this.active.id)throw new Error("\u53EA\u80FD\u507F\u8FD8\u81EA\u5DF1\u7684\u6709\u6548\u501F\u6B3E\u3002");let j=this.amount(A==="all"?v.balance:A),T=this.data.users.find(M=>M.id===v.lenderId),B=this.active;if(j>v.balance||j>B.balance)throw new Error("\u8FD8\u6B3E\u8D85\u8FC7\u6B20\u6B3E\u6216\u94B1\u5305\u4F59\u989D\u3002");if(!T)throw new Error("\u51FA\u501F\u4EBA\u4E0D\u5B58\u5728\u3002");B.balance=e.sub(B.balance,j),this.credit(T,j),v.balance=e.sub(v.balance,j),v.balance===0&&(v.status="repaid",v.interestAt=null),this.record(`${B.name} \u2192 ${T.name}: \u507F\u8FD8\u73A9\u5BB6\u501F\u6B3E ${j.toLocaleString()}\u3002`),this.save()}deletePlayer(g){this.ensureIdle();let A=this.data.users.find(v=>v.id===g);if(!A)throw new Error("\u8BE5\u73A9\u5BB6\u4E0D\u5B58\u5728\u3002");if(this.data.users.length===1)throw new Error("\u81F3\u5C11\u4FDD\u7559\u4E00\u540D\u73A9\u5BB6\u3002");if(A.debt||A.sharkDebt||A.recovery?.deficit||I(A.bets)||A.pendingRoulette||A.blackjack&&A.blackjack.phase!=="settled"||this.data.loans.some(v=>["pending","active"].includes(v.status)&&[v.lenderId,v.borrowerId].includes(g)))throw new Error("\u8BF7\u5148\u7ED3\u6E05\u6B20\u6B3E\u3001\u501F\u51FA\u6B3E\u3001\u5F85\u786E\u8BA4\u534F\u8BAE\u548C\u6E38\u620F\u4E0B\u6CE8\uFF0C\u518D\u5220\u9664\u73A9\u5BB6\u3002");this.data.users=this.data.users.filter(v=>v.id!==g),this.data.activeId===g&&(this.data.activeId=this.data.users[0].id),this.record(`\u5DF2\u5220\u9664\u73A9\u5BB6 ${A.name}\uFF0C\u5176\u94B1\u5305\u548C\u5361\u5305\u5DF2\u79FB\u9664\u3002`),this.save()}adminAdjust(g,A,v,j=""){this.ensureIdle();let T=this.data.users.find(be=>be.id===g),B=this.amount(v);if(!T||!["add","remove"].includes(A))throw new Error("\u8BF7\u9009\u62E9\u73A9\u5BB6\u53CA\u6709\u6548\u7684\u8C03\u6574\u65B9\u5F0F\u3002");if(typeof j!="string"||j.length>120)throw new Error("\u5907\u6CE8\u6700\u591A 120 \u4E2A\u5B57\u7B26\u3002");let M=A==="add"?B:e.sub(0,B);if(T.recovery)this.recoveryNet(T,M);else{if(e.add(T.balance,M)<0)throw new Error("\u6263\u9664\u91D1\u989D\u4E0D\u80FD\u8D85\u8FC7\u94B1\u5305\u4F59\u989D\u3002");T.balance=e.add(T.balance,M)}this.record(`\u7BA1\u7406\u5458 \xB7 ${T.name} ${A==="add"?"\u589E\u52A0":"\u6263\u9664"} ${B.toLocaleString()} \u7B79\u7801${j.trim()?" \xB7 "+j.trim():""}\u3002`),this.save()}transfer(g,A){this.ensureIdle(),this.ensureCashWallet();let v=this.amount(A),j=this.active,T=this.data.users.find(B=>B.id===g);if(!T||T===j)throw new Error("Choose another player to receive the chips.");if(v>j.balance)throw new Error("Your wallet does not have enough chips.");j.balance=e.sub(j.balance,v),this.credit(T,v),this.record(`${j.name} \u2192 ${T.name}: ${v.toLocaleString()} chips transferred.`),this.save()}borrow(g){this.ensureIdle(),this.ensureCashWallet();let A=this.amount(g),v=this.active;if(A>this.availableCredit)throw new Error(`You can borrow up to ${this.availableCredit.toLocaleString()} more chips.`);v.balance=e.add(v.balance,A),v.debt===0&&(v.bankInterestAt=this.now(),v.bankInterestPolicy=d),v.debt=e.add(v.debt,A),this.record(`Bank \u2192 ${v.name}: borrowed ${A.toLocaleString()} chips.`),this.save()}repay(g){this.ensureIdle(),this.ensureCashWallet();let A=this.active,v=this.amount(g==="all"?A.debt:g);if(v>A.debt)throw new Error("That amount is greater than your outstanding debt.");if(v>A.balance)throw new Error("Your wallet does not have enough chips to repay that amount.");A.balance=e.sub(A.balance,v),A.debt=e.sub(A.debt,v),A.debt===0&&(A.bankInterestAt=null),this.record(`${A.name} \u2192 Bank: repaid ${v.toLocaleString()} chips.`),this.save()}borrowShark(g){this.ensureIdle();let A=this.amount(g,o),v=this.active;if(!this.canBorrowShark)throw new Error("\u9AD8\u5229\u8D37\u4EC5\u5728\u94F6\u884C\u989D\u5EA6\u8017\u5C3D\u3001\u94B1\u5305 \u2264 0 \u4E14\u6CA1\u6709\u672A\u7ED3\u7B97\u4E0B\u6CE8\u65F6\u5F00\u653E\u3002");if(A>this.availableSharkCredit)throw new Error("\u9AD8\u5229\u8D37\u5269\u4F59\u989D\u5EA6\u4E0D\u8DB3\u3002");v.sharkDebt===0&&(v.sharkInterestAt=this.now(),v.sharkInterestPolicy=d),v.balance=e.add(v.balance,A),v.sharkDebt=e.add(v.sharkDebt,A),this.record(`\u9AD8\u5229\u8D37 \u2192 ${v.name}: \u501F\u5165 ${A.toLocaleString()}\uFF1B\u6BCF 3 \u5206\u949F\u8BA1\u606F 125%\u3002`),this.save()}repayShark(g){this.ensureIdle(),this.ensureCashWallet();let A=this.active,v=this.amount(g==="all"?A.sharkDebt:g);if(v>A.sharkDebt)throw new Error("\u8FD8\u6B3E\u4E0D\u80FD\u8D85\u8FC7\u9AD8\u5229\u8D37\u6B20\u6B3E\u3002");if(v>A.balance)throw new Error("\u94B1\u5305\u4F59\u989D\u4E0D\u8DB3\u4EE5\u8FD8\u6B3E\u3002");A.balance=e.sub(A.balance,v),A.sharkDebt=e.sub(A.sharkDebt,v),A.sharkDebt===0&&(A.sharkInterestAt=null),this.record(`${A.name} \u2192 \u9AD8\u5229\u8D37: \u507F\u8FD8 ${v.toLocaleString()}\u3002`),this.save()}repayAll(g,A){if(g==="bank")return this.repay("all");if(g==="shark")return this.repayShark("all");if(g==="peer")return this.repayLoan(A,"all");throw new Error("\u8BF7\u9009\u62E9\u94F6\u884C\u3001\u9AD8\u5229\u8D37\u6216\u4E00\u7B14\u73A9\u5BB6\u501F\u6B3E\u3002")}projectDebts(g,A=this.active.id){if(!C(g,1440))throw new Error("\u9884\u89C8\u65F6\u95F4\u9700\u4E3A 0\u20131,440 \u5206\u949F\u3002");let v=this.data.users.find(Ce=>Ce.id===A);if(!v)throw new Error("\u8BF7\u9009\u62E9\u6709\u6548\u73A9\u5BB6\u3002");let j=this.now(),T=j+g*6e4,B=(Ce,Te,ge,Q,Ct=u)=>L(Ce,Q,Math.max(0,Math.floor((T-(Te??j))/ge)),Ct),M=B(v.debt,v.bankInterestAt,i,1500),be=B(v.sharkDebt,v.sharkInterestAt,a,12500),ve=this.data.loans.filter(Ce=>Ce.status==="active"&&Ce.borrowerId===A).reduce((Ce,Te)=>e.add(Ce,B(Te.balance,Te.interestAt,Te.periodMs,Te.rateBps,null)),0),me=v.recovery?.deficit||0;return{bank:M,shark:be,peer:ve,negative:me,total:e.add(M,be,ve,me)}}completeRound(g=0){this.accrueInterest();let A=this.active;A.recovery?(this.recoveryNet(A,g),this.record(`${A.name} \xB7 \u8D1F\u6570\u6A21\u5F0F\u51C0\u8F93\u8D62 ${g>=0?"+":""}${g.toLocaleString()}\uFF1B${A.recovery?"\u8BB0\u5F55 -"+A.recovery.deficit.toLocaleString()+"\uFF0C\u4E0B\u4E00\u5C40\u53EF\u7528 10":"\u5DF2\u8FD8\u6E05\u8D1F\u6570\uFF0C\u6062\u590D\u6B63\u5E38\u4F59\u989D "+A.balance.toLocaleString()}\u3002`)):this.prepareRecovery(A)}accrueInterest(){let g=this.now(),A=!1,v=(T,B,M,be,ve,me,Ce=u)=>{if(T[B]<=0){T[M]!==null&&(T[M]=null,A=!0);return}if(T[M]===null){T[M]=g,A=!0;return}let Te=Math.floor((g-T[M])/be);if(Te<=0)return;let ge=T[B];T[B]=L(ge,ve,Te,Ce),T[M]+=Te*be,A=!0,T[B]!==ge&&this.record(`${me} \xB7 ${Te} \u671F\u5229\u606F +${e.sub(T[B],ge).toLocaleString()}\uFF0C\u6B20\u6B3E ${T[B].toLocaleString()}\u3002`)},j=(T,B,M,be,ve,me,Ce,Te,ge)=>{T[B]>0&&T[be]!==d&&(v(T,B,M,Ce,Te,ge),T[be]=d,T[M]=Math.max(g,T[M]??g),A=!0),v(T,B,M,ve,me,ge)};for(let T of this.data.users)j(T,"debt","bankInterestAt","bankInterestPolicy",i,1500,30*6e4,50,T.name+" \xB7 \u94F6\u884C"),j(T,"sharkDebt","sharkInterestAt","sharkInterestPolicy",a,12500,5*6e4,1e3,T.name+" \xB7 \u9AD8\u5229\u8D37");for(let T of this.data.loans)T.status==="active"&&v(T,"balance","interestAt",T.periodMs,T.rateBps,T.borrowerName+" \u2192 "+T.lenderName,null);return A}buyCard(g,A){this.ensureIdle(),this.ensureCashWallet();let v=Object.hasOwn(R,g)?R[g]:null;if(!v)throw new Error("\u8BF7\u9009\u62E9\u6709\u6548\u7684\u9ED1\u5E02\u5361\u3002");let j=this.amount(A),T=e.mul(j,v.factor),B=this.active;if(this.now()<B.marketAvailableAt)throw new Error("\u9ED1\u5E02\u8FDB\u8D27\u4E2D\uFF0C\u8BF7\u7B49\u5F85\u8D2D\u4E70\u51B7\u5374\u7ED3\u675F\u3002");if(B.cards.length>=50)throw new Error("\u6700\u591A\u6301\u6709 50 \u5F20\u5361\uFF0C\u8BF7\u5148\u4F7F\u7528\u5DF2\u6709\u5361\u3002");if(e.add(T,j)>B.balance)throw new Error("\u4F59\u989D\u4E0D\u8DB3\uFF1A\u9700\u652F\u4ED8\u5361\u4EF7\uFF0C\u5E76\u7559\u8DB3\u4E00\u6B21\u7ED1\u5B9A\u4E0B\u6CE8\u7684\u7B79\u7801\u3002");let M={id:t.crypto.randomUUID(),type:g,stake:j};return B.balance=e.sub(B.balance,T),B.cards.push(M),B.marketAvailableAt=this.now()+c,this.record(`${B.name} \xB7 \u9ED1\u5E02\u8D2D\u4E70${v.name}\uFF0C\u4EF7\u683C ${T.toLocaleString()}\uFF0C\u7ED1\u5B9A\u4E0B\u6CE8 ${j.toLocaleString()}\u3002`),this.save(),M}armCard(g){this.ensureIdle();let A=this.active.cards.find(v=>v.id===g);if(g!==null&&!A)throw new Error("\u4F60\u6CA1\u6709\u8FD9\u5F20\u5361\u3002");if(A&&A.stake>this.active.balance)throw new Error("\u4F59\u989D\u4E0D\u8DB3\u4EE5\u652F\u4ED8\u8BE5\u5361\u7ED1\u5B9A\u7684\u4E0B\u6CE8\u3002");this.active.armedCardId=g,this.save()}buyLottery(g,{jackpot:A=!1}={}){this.ensureIdle();let v=t.CasinoLottery.price(g),j=this.active;if(v>j.balance)throw new Error("\u94B1\u5305\u4F59\u989D\u4E0D\u8DB3\u4EE5\u8D2D\u4E70\u8FD9\u6863\u5F69\u7968\u3002");let T=t.CasinoLottery.draw(v,this.random,A);return T.id=t.crypto.randomUUID(),T.time=new Date(this.now()).toISOString(),T.walletAfterWager=e.sub(j.balance,v),j.balance=e.add(j.balance,T.net),j.lotteryHistory=[T,...Array.isArray(j.lotteryHistory)?j.lotteryHistory.filter(t.CasinoLottery.validHistory):[]].slice(0,30),this.record(`${j.name} \xB7 \u5F69\u7968 \xB7 ${t.CasinoLottery.tiers[T.tier].name}: \u7968\u4EF7 ${v.toLocaleString()}\uFF0C\u8FD4\u8FD8 ${T.payout.toLocaleString()}\uFF08${T.multiplier}\xD7\uFF09\uFF0C\u51C0\u8F93\u8D62 ${T.net>=0?"+":""}${T.net.toLocaleString()}\u3002`),this.completeRound(T.net),this.lock="lottery",this.save(),T}playPlinko(g,A="medium",v="center",{jackpot:j=!1}={}){this.ensureIdle();let T=this.amount(g),B=this.active;if(t.CasinoArcade.plinkoSettings(A,v),T>B.balance)throw new Error("\u94B1\u5305\u4F59\u989D\u4E0D\u8DB3\uFF0C\u8BF7\u964D\u4F4E\u4E0B\u6CE8\u6216\u524D\u5F80\u94F6\u884C\u3002");return this.finishArcade(t.CasinoArcade.plinko(T,A,v,this.random,j),"Plinko")}playDice(g,A="small",v=null,{jackpot:j=!1}={}){this.ensureIdle();let T=this.amount(g),B=this.active;if(t.CasinoArcade.diceSettings(A,v),T>B.balance)throw new Error("\u94B1\u5305\u4F59\u989D\u4E0D\u8DB3\uFF0C\u8BF7\u964D\u4F4E\u4E0B\u6CE8\u6216\u524D\u5F80\u94F6\u884C\u3002");return this.finishArcade(t.CasinoArcade.dice(T,A,v,this.random,j),"\u9AB0\u5B9D")}finishArcade(g,A){let v=this.active;return g.id=t.crypto.randomUUID(),g.time=new Date(this.now()).toISOString(),g.walletAfterWager=e.sub(v.balance,g.wager),v.balance=e.add(v.balance,g.net),v.arcadeHistory=[g,...Array.isArray(v.arcadeHistory)?v.arcadeHistory.filter(t.CasinoArcade.validHistory):[]].slice(0,30),this.record(`${v.name} \xB7 ${A}${g.game==="dice"?" "+g.dice.join(" \xB7 "):" "+g.risk+" / "+g.lane}: \u4E0B\u6CE8 ${g.wager.toLocaleString()}\uFF0C\u8FD4\u8FD8 ${g.payout.toLocaleString()}\uFF0C\u51C0\u8F93\u8D62 ${g.net>=0?"+":""}${g.net.toLocaleString()}\u3002`),this.completeRound(g.net),this.lock=g.game,this.save(),g}slotResult(g,A){if(!Array.isArray(g)||g.length!==3||!g.every(M=>C(M,11)))throw new Error("Invalid reels.");let v=g.map(M=>m[M]),j=v.filter(M=>M===5).length,T=v.filter(M=>M===0).length,B=v.every(M=>M===v[0])?h[v[0]]:T===2?5:j===2?2:j===1?1:0;return{reels:[...g],symbols:v,multiplier:B,wager:A,payout:e.mul(A,B),net:e.mul(A,B-1)}}spinSlots(g,A=null,{allIn:v=!1,jackpot:j=!1}={}){this.ensureIdle();let T=this.amount(g),B=this.active,M=j?null:this.armedCard;if(M&&T!==M.stake)throw new Error("\u5DF2\u88C5\u5907\u5361\u7ED1\u5B9A\u4E0B\u6CE8 "+M.stake.toLocaleString()+"\uFF0C\u8BF7\u53D6\u6D88\u88C5\u5907\u540E\u66F4\u6539\u3002");if(v&&T!==B.balance)throw new Error("All In must wager your whole wallet.");if(T>B.balance)throw new Error("Your wallet does not have enough chips for this spin.");let be=j?[0,6,0]:M?R[M.type].reels:A===null?Array.from({length:3},()=>{let me=this.random();if(!(me>=0&&me<1))throw new Error("Could not generate a valid spin. Try again.");return Math.floor(me*m.length)}):A,ve=this.slotResult(be,T);return ve.walletAfterWager=e.sub(B.balance,T),B.balance=e.add(B.balance,ve.net),M&&(B.cards=B.cards.filter(me=>me.id!==M.id),B.armedCardId=null,ve.cardName=R[M.type].name,this.record(`${B.name} \xB7 \u5DF2\u6D88\u8017${ve.cardName}\uFF0C\u7ED1\u5B9A\u4E0B\u6CE8 ${T.toLocaleString()}\u3002`)),this.record(`${B.name} \xB7 777${A===null?"":" (forced jackpot)"}: wager ${T.toLocaleString()}, payout ${ve.payout.toLocaleString()} (${ve.symbols.map(me=>p[me]).join(" / ")}).`),this.completeRound(ve.net),this.lock="slots",this.save(),ve}}ne.money=e,ne.symbols=p,ne.triples=h,ne.reelStrip=m,ne.creditLimit=n,ne.sharkLimit=o,ne.cards=R,ne.emptyBets=k,ne.sumBets=I,ne.storageKey=r,t.CasinoEngine=ne})(globalThis);(function(t){"use strict";!t.CasinoMoney&&typeof an=="function"&&ti();let e=t.CasinoMoney,r=d=>Math.min(d.rank,10),n=d=>d&&Number.isInteger(d.rank)&&d.rank>=1&&d.rank<=13&&Number.isInteger(d.suit)&&d.suit>=0&&d.suit<=3;function o(d){let u=0,p=0;for(let h of d)u+=h.rank===1?11:r(h),h.rank===1&&p++;for(;u>21&&p>0;)u-=10,p--;return{total:u,soft:p>0,blackjack:d.length===2&&u===21,bust:u>21}}function i(d){let u=[];for(let p=0;p<6;p++)for(let h=0;h<4;h++)for(let m=1;m<=13;m++)u.push({rank:m,suit:h});for(let p=u.length-1;p>0;p--){let h=d();if(!(h>=0&&h<1))throw new Error("The shoe could not be shuffled. Try again.");let m=Math.floor(h*(p+1));[u[p],u[m]]=[u[m],u[p]]}return u}function a(d,u){if(!d||d.version!==1||d.ownerId!==u||!["player","dealer","settled"].includes(d.phase)||typeof d.id!="string"||!Array.isArray(d.shoe)||d.shoe.length>312||!d.shoe.every(n)||!Array.isArray(d.dealer)||d.dealer.length<2||d.dealer.length>32||!d.dealer.every(n)||!Array.isArray(d.hands)||d.hands.length<1||d.hands.length>2||!Number.isInteger(d.activeHand)||d.activeHand<0||d.activeHand>d.hands.length||!d.hands.every(h=>Array.isArray(h.cards)&&h.cards.length>=2&&h.cards.length<=32&&h.cards.every(n)&&e.valid(h.bet)&&h.bet>=1&&typeof h.split=="boolean"&&["playing","stood","bust"].includes(h.status))||d.phase==="player"&&d.hands[d.activeHand]?.status!=="playing")return!1;let p=new Map;for(let h of[...d.shoe,...d.dealer,...d.hands.flatMap(m=>m.cards)]){let m=h.rank+":"+h.suit;if(p.set(m,(p.get(m)||0)+1),p.get(m)>6)return!1}return!(d.phase==="settled"&&(!d.result||!e.valid(d.result.payout)||d.result.payout<0||!e.valid(d.result.wager)||!Array.isArray(d.result.hands)||d.result.hands.length!==d.hands.length||!d.result.hands.every(h=>h&&typeof h.label=="string"&&e.valid(h.payout)&&h.payout>=0)||!e.valid(d.result.net)))}class c{constructor(u,p={}){this.engine=u,this.shoeFactory=p.shoeFactory||(()=>i(()=>u.random()));for(let m of u.data.users)m.blackjack&&!a(m.blackjack,m.id)&&(m.blackjack=null,u.storageWarning="An unreadable saved blackjack hand was cleared. Your wallet and bank records were kept.");let h=u.data.users.find(m=>m.blackjack&&m.blackjack.phase!=="settled");h&&(u.data.activeId=h.id,u.lock="blackjack")}get round(){return this.engine.active.blackjack||null}get pending(){return!!(this.round&&this.round.phase!=="settled")}available(){let u=this.round,p=u?.hands[u.activeHand],h=!!(u&&u.phase==="player"&&p?.status==="playing"&&this.engine.lock==="blackjack");return{hit:h,stand:h,double:h&&p.cards.length===2&&this.engine.active.balance>=p.bet,split:h&&u.hands.length===1&&p.cards.length===2&&r(p.cards[0])===r(p.cards[1])&&this.engine.active.balance>=p.bet}}_playing(u){if(!this.available()[u])throw new Error(u==="double"||u==="split"?"That move needs an eligible two-card hand and enough chips.":"Wait until it is your turn.");return this.round}_draw(u){if(!u.shoe.length)throw new Error("The shoe is empty.");return u.shoe.pop()}_save(){this.engine.save()}start(u,{jackpot:p=!1}={}){this.engine.ensureIdle();let h=this.engine.amount(u),m=this.engine.active;if(h>m.balance)throw new Error("Not enough chips. Lower your bet or visit the bank.");let k=this.round,I=p?i(()=>.5):k&&k.shoe.length>=52?[...k.shoe]:this.shoeFactory();if(!Array.isArray(I)||I.length<4||!I.every(n))throw new Error("The shoe could not be prepared.");if(p){let R=[1,10,13,9].map(S=>I.splice(I.findIndex(x=>x.rank===S),1)[0]);I.push(...R.reverse())}let C={version:1,id:t.crypto.randomUUID(),ownerId:m.id,phase:"player",shoe:I,dealer:[],hands:[{cards:[],bet:h,split:!1,status:"playing"}],activeHand:0,result:null};return C.hands[0].cards.push(this._draw(C)),C.dealer.push(this._draw(C)),C.hands[0].cards.push(this._draw(C)),C.dealer.push(this._draw(C)),m.balance=e.sub(m.balance,h),m.blackjack=C,this.engine.lock="blackjack",o(C.hands[0].cards).blackjack||o(C.dealer).blackjack?this._settle():this._save(),C}_advance(){let u=this.round,p=u.hands.findIndex((h,m)=>m>=u.activeHand&&h.status==="playing");p===-1?(u.activeHand=u.hands.length,u.phase="dealer"):u.activeHand=p}hit(){let u=this._playing("hit"),p=u.hands[u.activeHand];p.cards.push(this._draw(u));let h=o(p.cards);return h.total>=21&&(p.status=h.bust?"bust":"stood",this._advance()),this._save(),u}stand(){let u=this._playing("stand");return u.hands[u.activeHand].status="stood",this._advance(),this._save(),u}double(){let u=this._playing("double"),p=u.hands[u.activeHand],h=this._draw(u);return this.engine.active.balance=e.sub(this.engine.active.balance,p.bet),p.bet=e.mul(p.bet,2),p.cards.push(h),p.status=o(p.cards).bust?"bust":"stood",this._advance(),this._save(),u}split(){let u=this._playing("split"),p=u.hands[0];if(u.shoe.length<2)throw new Error("The shoe does not have enough cards to split.");let h={cards:[p.cards.pop()],bet:p.bet,split:!0,status:"playing"};p.split=!0,this.engine.active.balance=e.sub(this.engine.active.balance,p.bet),p.cards.push(this._draw(u)),h.cards.push(this._draw(u)),u.hands.push(h);let m=p.cards[0].rank===1;for(let k of u.hands)(m||o(k.cards).total===21)&&(k.status="stood");return this._advance(),this._save(),u}dealerStep(){let u=this.round;if(!u||u.phase!=="dealer"||this.engine.lock!=="blackjack")throw new Error("The dealer is not playing.");return u.hands.every(p=>o(p.cards).bust)||o(u.dealer).total>=17?this._settle():(u.dealer.push(this._draw(u)),o(u.dealer).total>=17?this._settle():(this._save(),u))}forceJackpot(u){if(!this.pending)return this.start(u,{jackpot:!0});let p=this.round;if(this.engine.lock!=="blackjack")throw new Error("Wait for the current game to finish.");p.shoe=i(()=>.5);let h=m=>p.shoe.splice(p.shoe.findIndex(k=>k.rank===m),1)[0];p.dealer=[h(10),h(9)];for(let m of p.hands)m.cards=m.cards.length===2?[h(1),h(13)]:[h(1),h(5),h(5)],m.status="stood";return p.activeHand=p.hands.length,this._settle()}_settle(){let u=this.round;if(u.phase==="settled")return u;let p=o(u.dealer),h=u.hands.map(I=>{let C=o(I.cards),R=!I.split&&C.blackjack,S=0,x="Dealer wins";return C.bust?x="Bust":p.blackjack?R&&(S=1,x="Push"):R?(S=2.5,x="Blackjack \xB7 3:2"):p.bust||C.total>p.total?(S=2,x=p.bust?"Dealer busts \xB7 You win":"You win"):C.total===p.total&&(S=1,x="Push"),{label:x,total:C.total,bet:I.bet,payout:e.ratio(I.bet,S*2,2)}}),m=u.hands.reduce((I,C)=>e.add(I,C.bet),0),k=h.reduce((I,C)=>e.add(I,C.payout),0);return u.result={hands:h,wager:m,payout:k,net:e.sub(k,m),dealer:p.total},u.phase="settled",this.engine.active.balance=e.add(this.engine.active.balance,k),this.engine.lock=null,this.engine.record(`${this.engine.active.name} \xB7 Blackjack: wager ${m.toLocaleString()}, payout ${k.toLocaleString()} (${h.map(I=>I.label).join(" / ")}).`),this.engine.completeRound(u.result.net),this._save(),u}}c.score=o,c.makeShoe=i,t.CasinoBlackjack=c})(globalThis);var oe={};Kt(oe,{fromBuffer:()=>fb,fromUTF8String:()=>mb,isBase64:()=>yb,isBase64URL:()=>bb,toBase64:()=>hb,toBuffer:()=>pb,toUTF8String:()=>gb,trimPadding:()=>qp});var zl="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",zp="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",Fp=t=>{let e=typeof Uint8Array>"u"?[]:new Uint8Array(256),r=zl.length;for(let n=0;n<r;n++)e[t.charCodeAt(n)]=n;return e},cb=Fp(zl),lb=Fp(zp),ub=/^[-A-Za-z0-9\-_]*$/,db=/^[-A-Za-z0-9+/]*={0,3}$/,ir={};ir.toArrayBuffer=(t,e)=>{let r=t.length,n=t.length*.75,o,i=0,a,c,d,u;t[t.length-1]==="="&&(n--,t[t.length-2]==="="&&n--);let p=new ArrayBuffer(n),h=new Uint8Array(p),m=e?lb:cb;for(o=0;o<r;o+=4)a=m[t.charCodeAt(o)],c=m[t.charCodeAt(o+1)],d=m[t.charCodeAt(o+2)],u=m[t.charCodeAt(o+3)],h[i++]=a<<2|c>>4,h[i++]=(c&15)<<4|d>>2,h[i++]=(d&3)<<6|u&63;return p};ir.fromArrayBuffer=(t,e)=>{let r=new Uint8Array(t),n,o="",i=r.length,a=e?zp:zl;for(n=0;n<i;n+=3)o+=a[r[n]>>2],o+=a[(r[n]&3)<<4|r[n+1]>>4],o+=a[(r[n+1]&15)<<2|r[n+2]>>6],o+=a[r[n+2]&63];let c=i%3;return c===2?o=o.substring(0,o.length-1)+(e?"":"="):c===1&&(o=o.substring(0,o.length-2)+(e?"":"==")),o};ir.toString=(t,e)=>new TextDecoder().decode(ir.toArrayBuffer(t,e));ir.fromString=(t,e)=>ir.fromArrayBuffer(new TextEncoder().encode(t),e);ir.validate=(t,e)=>{if(!(typeof t=="string"||t instanceof String))return!1;try{return e?ub.test(t):db.test(t)}catch{return!1}};ir.base64=ir;var Br=ir;function pb(t,e="base64url"){let r=Br.toArrayBuffer(t,e==="base64url");return new Uint8Array(r)}function fb(t,e="base64url"){let r=new Uint8Array(t);return Br.fromArrayBuffer(r.buffer,e==="base64url")}function hb(t){let e=Br.toArrayBuffer(t,!0);return Br.fromArrayBuffer(e)}function mb(t){return Br.fromString(t,!0)}function gb(t){return Br.toString(t,!0)}function yb(t){return Br.validate(t,!1)}function bb(t){return t=qp(t),Br.validate(t,!0)}function qp(t){return t.replace(/=/g,"")}var et={};Kt(et,{decodeFirst:()=>jb,encode:()=>Hb});function ri(t,e,r){if(e<24)return[e,1];let n=t.byteLength-r-1,o=new DataView(t.buffer,r+1),i,a=0;switch(e){case 24:{n>0&&(i=o.getUint8(0),a=2);break}case 25:{n>1&&(i=o.getUint16(0,!1),a=3);break}case 26:{n>3&&(i=o.getUint32(0,!1),a=5);break}case 27:{if(n>7){let c=o.getBigUint64(0,!1);if(c>=24n&&c<=Number.MAX_SAFE_INTEGER)return[Number(c),9]}break}}if(i&&i>=24)return[i,a];throw new Error("Length not supported or not well formed")}var Js=0,oa=1,Fl=2,ql=3,Yl=4,Jl=5,Xl=6,Yp=7;function ar(t,e){let r=t<<5;if(e<0)throw new Error("CBOR Data Item argument must not be negative");let n;if(typeof e=="number"){if(!Number.isInteger(e))throw new Error("CBOR Data Item argument must be an integer");n=BigInt(e)}else n=e;if(t==oa){if(n==0n)throw new Error("CBOR Data Item argument cannot be zero when negative");n=n-1n}if(n>18446744073709551615n)throw new Error("CBOR number out of range");let o=new Uint8Array(8);return new DataView(o.buffer).setBigUint64(0,n,!1),n<=23?[r|o[7]]:n<=255?[r|24,o[7]]:n<=65535?[r|25,...o.slice(6)]:n<=4294967295?[r|26,...o.slice(4)]:[r|27,...o]}var ia=class{constructor(e,r){Object.defineProperty(this,"tagId",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"tagValue",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.tagId=e,this.tagValue=r}get tag(){return this.tagId}get value(){return this.tagValue}};function Jp(t,e,r){return ri(t,e,r)}function vb(t,e,r){let[n,o]=Jp(t,e,r);return[-n-1,o]}function Xp(t,e,r){let[n,o]=ri(t,e,r),i=r+o;return[new Uint8Array(t.buffer.slice(i,i+n)),o+n]}var wb=new TextDecoder;function xb(t,e,r){let[n,o]=Xp(t,e,r);return[wb.decode(n),o]}function Ab(t,e,r){if(e===0)return[[],1];let[n,o]=ri(t,e,r),i=o,a=[];for(let c=0;c<n;c++){if(t.byteLength-r-i<=0)throw new Error("array is not supported or well formed");let[u,p]=qn(t,r+i);a.push(u),i+=p}return[a,i]}var Xs="Map is not supported or well formed";function Eb(t,e,r){if(e===0)return[new Map,1];let[n,o]=ri(t,e,r),i=o,a=new Map;for(let c=0;c<n;c++){let d=t.byteLength-r-i;if(d<=0)throw new Error(Xs);let[u,p]=qn(t,r+i);if(i+=p,d-=p,d<=0)throw new Error(Xs);if(typeof u!="string"&&typeof u!="number")throw new Error(Xs);if(a.has(u))throw new Error(Xs);let[h,m]=qn(t,r+i);i+=m,a.set(u,h)}return[a,i]}function kb(t,e){if(e+3>t.byteLength)throw new Error("CBOR stream ended before end of Float 16");let r=t.getUint16(e+1,!1);if(r==31744)return[1/0,3];if(r==32256)return[NaN,3];if(r==64512)return[-1/0,3];throw new Error("Float16 data is unsupported")}function Sb(t,e){if(e+5>t.byteLength)throw new Error("CBOR stream ended before end of Float 32");return[t.getFloat32(e+1,!1),5]}function Cb(t,e){if(e+9>t.byteLength)throw new Error("CBOR stream ended before end of Float 64");return[t.getFloat64(e+1,!1),9]}function Tb(t,e,r){let[n,o]=ri(t,e,r),[i,a]=qn(t,r+o);return[new ia(n,i),o+a]}function qn(t,e){if(e>=t.byteLength)throw new Error("CBOR stream ended before tag value");let r=t.getUint8(e),n=r>>5,o=r&31;switch(n){case Js:return Jp(t,o,e);case oa:return vb(t,o,e);case Fl:return Xp(t,o,e);case ql:return xb(t,o,e);case Yl:return Ab(t,o,e);case Jl:return Eb(t,o,e);case Xl:return Tb(t,o,e);case Yp:switch(o){case 20:return[!1,1];case 21:return[!0,1];case 22:return[null,1];case 23:return[void 0,1];case 25:return kb(t,e);case 26:return Sb(t,e);case 27:return Cb(t,e)}}throw new Error(`Unsupported or not well formed at ${e}`)}function Ib(t){return t===!0?245:t===!1?244:t===null?246:247}function _b(t){if(Math.fround(t)==t||!Number.isFinite(t)||Number.isNaN(t)){let e=new Uint8Array(5);return e[0]=250,new DataView(e.buffer).setFloat32(1,t,!1),e}else{let e=new Uint8Array(9);return e[0]=251,new DataView(e.buffer).setFloat64(1,t,!1),e}}function Bb(t){return typeof t=="number"?Number.isSafeInteger(t)?t<0?ar(oa,Math.abs(t)):ar(Js,t):[_b(t)]:t<0n?ar(oa,t*-1n):ar(Js,t)}var Rb=new TextEncoder;function Mb(t,e){e.push(...ar(ql,t.length)),e.push(Rb.encode(t))}function Pb(t,e){e.push(...ar(Fl,t.length)),e.push(t)}function Nb(t,e){e.push(...ar(Yl,t.length));for(let r of t)aa(r,e)}function Ob(t,e){e.push(new Uint8Array(ar(Jl,t.size)));for(let[r,n]of t.entries())aa(r,e),aa(n,e)}function Db(t,e){e.push(...ar(Xl,t.tag)),aa(t.value,e)}function aa(t,e){if(typeof t=="boolean"||t===null||t==null){e.push(Ib(t));return}if(typeof t=="number"||typeof t=="bigint"){e.push(...Bb(t));return}if(typeof t=="string"){Mb(t,e);return}if(t instanceof Uint8Array){Pb(t,e);return}if(Array.isArray(t)){Nb(t,e);return}if(t instanceof Map){Ob(t,e);return}if(t instanceof ia){Db(t,e);return}throw new Error("Not implemented")}function Ql(t,e){if(t.byteLength===0||t.byteLength<=e||e<0)throw new Error("No data");return t instanceof Uint8Array?qn(new DataView(t.buffer),e):t instanceof ArrayBuffer?qn(new DataView(t),e):qn(t,e)}function Zl(t){let e=[];aa(t,e);let r=0;for(let i of e)typeof i=="number"?r+=1:r+=i.length;let n=new Uint8Array(r),o=0;for(let i of e)typeof i=="number"?(n[o]=i,o+=1):(n.set(i,o),o+=i.length);return n}function jb(t){let e=new Uint8Array(t),r=Ql(e,0),[n]=r;return n}function Hb(t){return Zl(t)}var cr={};Kt(cr,{digest:()=>tf,getRandomValues:()=>rf,verify:()=>sy});function Qp(t){let e=t.get(Z.kty);return Qs(e)&&e===tt.OKP}function sn(t){let e=t.get(Z.kty);return Qs(e)&&e===tt.EC2}function ni(t){let e=t.get(Z.kty);return Qs(e)&&e===tt.RSA}function Zp(t){let e=t.get(Z.kty);return Qs(e)&&e===tt.AKP}var Z;(function(t){t[t.kty=1]="kty",t[t.alg=3]="alg",t[t.crv=-1]="crv",t[t.x=-2]="x",t[t.y=-3]="y",t[t.n=-1]="n",t[t.e=-2]="e",t[t.pub=-1]="pub"})(Z||(Z={}));var tt;(function(t){t[t.OKP=1]="OKP",t[t.EC2=2]="EC2",t[t.RSA=3]="RSA",t[t.AKP=7]="AKP"})(tt||(tt={}));function Qs(t){return Object.values(tt).indexOf(t)>=0}var Ye;(function(t){t[t.P256=1]="P256",t[t.P384=2]="P384",t[t.P521=3]="P521",t[t.ED25519=6]="ED25519",t[t.SECP256K1=8]="SECP256K1"})(Ye||(Ye={}));function ef(t){return Object.values(Ye).indexOf(t)>=0}var W;(function(t){t[t.ES256=-7]="ES256",t[t.EdDSA=-8]="EdDSA",t[t.ES384=-35]="ES384",t[t.ES512=-36]="ES512",t[t.PS256=-37]="PS256",t[t.PS384=-38]="PS384",t[t.PS512=-39]="PS512",t[t.ES256K=-47]="ES256K",t[t.ML_DSA_44=-48]="ML_DSA_44",t[t.ML_DSA_65=-49]="ML_DSA_65",t[t.ML_DSA_87=-50]="ML_DSA_87",t[t.RS256=-257]="RS256",t[t.RS384=-258]="RS384",t[t.RS512=-259]="RS512",t[t.RS1=-65535]="RS1"})(W||(W={}));function Tt(t){return Object.values(W).indexOf(t)>=0}function Zs(t){return[W.ML_DSA_44,W.ML_DSA_65,W.ML_DSA_87].indexOf(t)>=0}function cn(t){if([W.RS1].indexOf(t)>=0)return"SHA-1";if([W.ES256,W.PS256,W.RS256].indexOf(t)>=0)return"SHA-256";if([W.ES384,W.PS384,W.RS384].indexOf(t)>=0)return"SHA-384";if([W.ES512,W.PS512,W.RS512,W.EdDSA].indexOf(t)>=0)return"SHA-512";throw new Error(`Could not map COSE alg value of ${t} to a WebCrypto hash alg name`)}var sa;function ct(){return new Promise((e,r)=>{if(sa)return e(sa);let n=$b.stubThisGlobalThisCrypto();return n?(sa=n,e(sa)):r(new eu)})}var eu=class extends Error{constructor(){super("An instance of the Crypto API could not be located"),this.name="MissingWebCrypto"}},$b={stubThisGlobalThisCrypto:()=>globalThis.crypto,setCachedCrypto:t=>{sa=t}};async function tf(t,e){let r=await ct(),n=cn(e),o=await r.subtle.digest(n,t);return new Uint8Array(o)}async function rf(t){return(await ct()).getRandomValues(t),t}function ec(t){let e=J.toHex(t);return[e.slice(0,8),e.slice(8,12),e.slice(12,16),e.slice(16,20),e.slice(20,32)].join("-")}function oi(t){let e=et.decodeFirst(t),r=Uint8Array.from([4]),n=e.get(Z.x),o=e.get(Z.y);if(!n)throw new Error("COSE public key was missing x");return o?J.concat([r,n,o]):J.concat([r,n])}function nf(t){return Gb.stubThis(et.decodeFirst(t))}var Gb={stubThis:t=>t};function tc(t){let e=oe.toUTF8String(t),r=JSON.parse(e);return Vb.stubThis(r)}var Vb={stubThis:t=>t};function sr(t){return Kb.stubThis(et.decodeFirst(t))}var Kb={stubThis:t=>t};async function rc(){let t=new Uint8Array(32);return await cr.getRandomValues(t),Wb.stubThis(t)}var Wb={stubThis:t=>t};async function of(){let t=new Uint8Array(32);return await cr.getRandomValues(t),zb.stubThis(t)}var zb={stubThis:t=>t};var fr={};Kt(fr,{Any:()=>ur,BaseBlock:()=>Ne,BaseStringBlock:()=>da,BitString:()=>Ft,BmpString:()=>eo,Boolean:()=>Jn,CharacterString:()=>lo,Choice:()=>si,Constructed:()=>Oe,DATE:()=>ga,DEFAULT_MAX_CONTENT_LENGTH:()=>yf,DEFAULT_MAX_DEPTH:()=>mf,DEFAULT_MAX_NODES:()=>gf,DateTime:()=>ba,Duration:()=>va,EndOfContent:()=>pa,Enumerated:()=>Xn,GeneralString:()=>co,GeneralizedTime:()=>uo,GraphicString:()=>so,HexBlock:()=>pr,IA5String:()=>ao,Integer:()=>Or,Null:()=>Wt,NumericString:()=>ro,ObjectIdentifier:()=>Qn,OctetString:()=>zt,Primitive:()=>Nr,PrintableString:()=>no,RawData:()=>iu,RelativeObjectIdentifier:()=>Zn,Repeated:()=>po,Sequence:()=>Je,Set:()=>rt,TIME:()=>wa,TeletexString:()=>oo,TimeOfDay:()=>ya,UTCTime:()=>dn,UniversalString:()=>to,Utf8String:()=>_t,ValueBlock:()=>$e,VideotexString:()=>io,ViewWriter:()=>ai,VisibleString:()=>un,compareSchema:()=>Mr,fromBER:()=>Lr,verifySchema:()=>v0});var ue=na(ru());function Yn(t,e){let r=0;if(t.length===1)return t[0];for(let n=t.length-1;n>=0;n--)r+=t[t.length-1-n]*Math.pow(2,e*n);return r}function ln(t,e,r=-1){let n=r,o=t,i=0,a=Math.pow(2,e);for(let c=1;c<8;c++){if(t<a){let d;if(n<0)d=new ArrayBuffer(c),i=c;else{if(n<c)return new ArrayBuffer(0);d=new ArrayBuffer(n),i=n}let u=new Uint8Array(d);for(let p=c-1;p>=0;p--){let h=Math.pow(2,p*e);u[i-p-1]=Math.floor(o/h),o-=u[i-p-1]*h}return d}a*=Math.pow(2,e)}return new ArrayBuffer(0)}function ic(...t){let e=0,r=0;for(let i of t)e+=i.length;let n=new ArrayBuffer(e),o=new Uint8Array(n);for(let i of t)o.set(i,r),r+=i.length;return o}function nu(){let t=new Uint8Array(this.valueHex);if(this.valueHex.byteLength>=2){let c=t[0]===255&&t[1]&128,d=t[0]===0&&(t[1]&128)===0;(c||d)&&this.warnings.push("Needlessly long format")}let e=new ArrayBuffer(this.valueHex.byteLength),r=new Uint8Array(e);for(let c=0;c<this.valueHex.byteLength;c++)r[c]=0;r[0]=t[0]&128;let n=Yn(r,8),o=new ArrayBuffer(this.valueHex.byteLength),i=new Uint8Array(o);for(let c=0;c<this.valueHex.byteLength;c++)i[c]=t[c];return i[0]&=127,Yn(i,8)-n}function af(t){let e=t<0?t*-1:t,r=128;for(let n=1;n<8;n++){if(e<=r){if(t<0){let a=r-e,c=ln(a,8,n),d=new Uint8Array(c);return d[0]|=128,c}let o=ln(e,8,n),i=new Uint8Array(o);if(i[0]&128){let a=o.slice(0),c=new Uint8Array(a);o=new ArrayBuffer(o.byteLength+1),i=new Uint8Array(o);for(let d=0;d<a.byteLength;d++)i[d+1]=c[d];i[0]=0}return o}r*=Math.pow(2,8)}return new ArrayBuffer(0)}function sf(t,e){if(t.byteLength!==e.byteLength)return!1;let r=new Uint8Array(t),n=new Uint8Array(e);for(let o=0;o<r.length;o++)if(r[o]!==n[o])return!1;return!0}function lt(t,e){let r=t.toString(10);if(e<r.length)return"";let n=e-r.length,o=Array.from({length:n});for(let a=0;a<n;a++)o[a]="0";return o.join("").concat(r)}var gx=Math.log(2);function ac(){if(typeof BigInt>"u")throw new Error("BigInt is not defined. Your environment doesn't implement BigInt.")}function au(t){let e=0,r=0;for(let o=0;o<t.length;o++){let i=t[o];e+=i.byteLength}let n=new Uint8Array(e);for(let o=0;o<t.length;o++){let i=t[o];n.set(new Uint8Array(i),r),r+=i.byteLength}return n.buffer}function Dr(t,e,r,n){return e instanceof Uint8Array?e.byteLength?r<0?(t.error="Wrong parameter: inputOffset less than zero",!1):n<0?(t.error="Wrong parameter: inputLength less than zero",!1):e.byteLength-r-n<0?(t.error="End of input reached before message was fully decoded (inconsistent offset and length values)",!1):!0:(t.error="Wrong parameter: inputBuffer has zero length",!1):(t.error="Wrong parameter: inputBuffer must be 'Uint8Array'",!1)}var ai=class{constructor(){this.items=[]}write(e){this.items.push(e)}final(){return au(this.items)}},ca=[new Uint8Array([1])],cf="0123456789",ou="name",lf="valueHexView",t0="isHexOnly",r0="idBlock",n0="tagClass",o0="tagNumber",i0="isConstructed",a0="fromBER",s0="toBER",c0="local",ut="",dr=new ArrayBuffer(0),xc=new Uint8Array(0),ua="EndOfContent",df="OCTET STRING",pf="BIT STRING";function pr(t){var e;return e=class extends t{get valueHex(){return this.valueHexView.slice().buffer}set valueHex(n){this.valueHexView=new Uint8Array(n)}constructor(...n){var o;super(...n);let i=n[0]||{};this.isHexOnly=(o=i.isHexOnly)!==null&&o!==void 0?o:!1,this.valueHexView=i.valueHex?ue.BufferSourceConverter.toUint8Array(i.valueHex):xc}fromBER(n,o,i,a){let c=n instanceof ArrayBuffer?new Uint8Array(n):n;if(!Dr(this,c,o,i))return-1;let d=o+i;return this.valueHexView=c.subarray(o,d),this.valueHexView.length?(this.blockLength=i,d):(this.warnings.push("Zero buffer length"),o)}toBER(n=!1){return this.isHexOnly?n?new ArrayBuffer(this.valueHexView.byteLength):this.valueHexView.byteLength===this.valueHexView.buffer.byteLength?this.valueHexView.buffer:this.valueHexView.slice().buffer:(this.error="Flag 'isHexOnly' is not set, abort",dr)}toJSON(){return{...super.toJSON(),isHexOnly:this.isHexOnly,valueHex:ue.Convert.ToHex(this.valueHexView)}}},e.NAME="hexBlock",e}var Pr=class{static blockName(){return this.NAME}get valueBeforeDecode(){return this.valueBeforeDecodeView.slice().buffer}set valueBeforeDecode(e){this.valueBeforeDecodeView=new Uint8Array(e)}constructor({blockLength:e=0,error:r=ut,warnings:n=[],valueBeforeDecode:o=xc}={}){this.blockLength=e,this.error=r,this.warnings=n,this.valueBeforeDecodeView=ue.BufferSourceConverter.toUint8Array(o)}toJSON(){return{blockName:this.constructor.NAME,blockLength:this.blockLength,error:this.error,warnings:this.warnings,valueBeforeDecode:ue.Convert.ToHex(this.valueBeforeDecodeView)}}};Pr.NAME="baseBlock";var $e=class extends Pr{fromBER(e,r,n,o){throw TypeError("User need to make a specific function in a class which extends 'ValueBlock'")}toBER(e,r){throw TypeError("User need to make a specific function in a class which extends 'ValueBlock'")}};$e.NAME="valueBlock";var sc=class extends pr(Pr){constructor({idBlock:e={}}={}){var r,n,o,i;super(),e?(this.isHexOnly=(r=e.isHexOnly)!==null&&r!==void 0?r:!1,this.valueHexView=e.valueHex?ue.BufferSourceConverter.toUint8Array(e.valueHex):xc,this.tagClass=(n=e.tagClass)!==null&&n!==void 0?n:-1,this.tagNumber=(o=e.tagNumber)!==null&&o!==void 0?o:-1,this.isConstructed=(i=e.isConstructed)!==null&&i!==void 0?i:!1):(this.tagClass=-1,this.tagNumber=-1,this.isConstructed=!1)}toBER(e=!1){let r=0;switch(this.tagClass){case 1:r|=0;break;case 2:r|=64;break;case 3:r|=128;break;case 4:r|=192;break;default:return this.error="Unknown tag class",dr}if(this.isConstructed&&(r|=32),this.tagNumber<31&&!this.isHexOnly){let o=new Uint8Array(1);if(!e){let i=this.tagNumber;i&=31,r|=i,o[0]=r}return o.buffer}if(!this.isHexOnly){let o=ln(this.tagNumber,7),i=new Uint8Array(o),a=o.byteLength,c=new Uint8Array(a+1);if(c[0]=r|31,!e){for(let d=0;d<a-1;d++)c[d+1]=i[d]|128;c[a]=i[a-1]}return c.buffer}let n=new Uint8Array(this.valueHexView.byteLength+1);if(n[0]=r|31,!e){let o=this.valueHexView;for(let i=0;i<o.length-1;i++)n[i+1]=o[i]|128;n[this.valueHexView.byteLength]=o[o.length-1]}return n.buffer}fromBER(e,r,n){let o=ue.BufferSourceConverter.toUint8Array(e);if(!Dr(this,o,r,n))return-1;let i=o.subarray(r,r+n);if(i.length===0)return this.error="Zero buffer length",-1;switch(i[0]&192){case 0:this.tagClass=1;break;case 64:this.tagClass=2;break;case 128:this.tagClass=3;break;case 192:this.tagClass=4;break;default:return this.error="Unknown tag class",-1}this.isConstructed=(i[0]&32)===32,this.isHexOnly=!1;let c=i[0]&31;if(c!==31)this.tagNumber=c,this.blockLength=1;else{let d=0;for(;;){let p=d+1;if(p>=i.length)return this.error="End of input reached before message was fully decoded",-1;if(d++,(i[p]&128)===0)break}this.blockLength=d+1;let u=this.valueHexView=new Uint8Array(d);for(let p=0;p<d;p++)u[p]=i[p+1]&127;this.blockLength<=9?this.tagNumber=Yn(u,7):(this.isHexOnly=!0,this.warnings.push("Tag too long, represented as hex-coded"))}if(this.tagClass===1&&this.isConstructed)switch(this.tagNumber){case 1:case 2:case 5:case 6:case 9:case 13:case 14:case 23:case 24:case 31:case 32:case 33:case 34:return this.error="Constructed encoding used for primitive type",-1}return r+this.blockLength}toJSON(){return{...super.toJSON(),tagClass:this.tagClass,tagNumber:this.tagNumber,isConstructed:this.isConstructed}}};sc.NAME="identificationBlock";var cc=class extends Pr{constructor({lenBlock:e={}}={}){var r,n,o;super(),this.isIndefiniteForm=(r=e.isIndefiniteForm)!==null&&r!==void 0?r:!1,this.longFormUsed=(n=e.longFormUsed)!==null&&n!==void 0?n:!1,this.length=(o=e.length)!==null&&o!==void 0?o:0}fromBER(e,r,n){let o=ue.BufferSourceConverter.toUint8Array(e);if(!Dr(this,o,r,n))return-1;let i=o.subarray(r,r+n);if(i.length===0)return this.error="Zero buffer length",-1;if(i[0]===255)return this.error="Length block 0xFF is reserved by standard",-1;if(this.isIndefiniteForm=i[0]===128,this.isIndefiniteForm)return this.blockLength=1,r+this.blockLength;if(this.longFormUsed=!!(i[0]&128),this.longFormUsed===!1)return this.length=i[0],this.blockLength=1,r+this.blockLength;let a=i[0]&127;if(a>8)return this.error="Too big integer",-1;if(a+1>i.length)return this.error="End of input reached before message was fully decoded",-1;let c=r+1,d=o.subarray(c,c+a);return d[a-1]===0&&this.warnings.push("Needlessly long encoded length"),this.length=Yn(d,8),this.longFormUsed&&this.length<=127&&this.warnings.push("Unnecessary usage of long length form"),this.blockLength=a+1,r+this.blockLength}toBER(e=!1){let r,n;if(this.length>127&&(this.longFormUsed=!0),this.isIndefiniteForm)return r=new ArrayBuffer(1),e===!1&&(n=new Uint8Array(r),n[0]=128),r;if(this.longFormUsed){let o=ln(this.length,8);if(o.byteLength>127)return this.error="Too big length",dr;if(r=new ArrayBuffer(o.byteLength+1),e)return r;let i=new Uint8Array(o);n=new Uint8Array(r),n[0]=o.byteLength|128;for(let a=0;a<o.byteLength;a++)n[a+1]=i[a];return r}return r=new ArrayBuffer(1),e===!1&&(n=new Uint8Array(r),n[0]=this.length),r}toJSON(){return{...super.toJSON(),isIndefiniteForm:this.isIndefiniteForm,longFormUsed:this.longFormUsed,length:this.length}}};cc.NAME="lengthBlock";var z={},Ne=class extends Pr{constructor({name:e=ut,optional:r=!1,primitiveSchema:n,...o}={},i){super(o),this.name=e,this.optional=r,n&&(this.primitiveSchema=n),this.idBlock=new sc(o),this.lenBlock=new cc(o),this.valueBlock=i?new i(o):new $e(o)}fromBER(e,r,n,o){let i=this.valueBlock.fromBER(e,r,this.lenBlock.isIndefiniteForm?n:this.lenBlock.length,o);return i===-1?(this.error=this.valueBlock.error,i):(this.idBlock.error.length||(this.blockLength+=this.idBlock.blockLength),this.lenBlock.error.length||(this.blockLength+=this.lenBlock.blockLength),this.valueBlock.error.length||(this.blockLength+=this.valueBlock.blockLength),i)}toBER(e,r){let n=r||new ai;r||ff(this);let o=this.idBlock.toBER(e);if(n.write(o),this.lenBlock.isIndefiniteForm)n.write(new Uint8Array([128]).buffer),this.valueBlock.toBER(e,n),n.write(new ArrayBuffer(2));else{let i=this.valueBlock.toBER(e);this.lenBlock.length=i.byteLength;let a=this.lenBlock.toBER(e);n.write(a),n.write(i)}return r?dr:n.final()}toJSON(){let e={...super.toJSON(),idBlock:this.idBlock.toJSON(),lenBlock:this.lenBlock.toJSON(),valueBlock:this.valueBlock.toJSON(),name:this.name,optional:this.optional};return this.primitiveSchema&&(e.primitiveSchema=this.primitiveSchema.toJSON()),e}toString(e="ascii"){return e==="ascii"?this.onAsciiEncoding():ue.Convert.ToHex(this.toBER())}onAsciiEncoding(){let e=this.constructor.NAME,r=ue.Convert.ToHex(this.valueBlock.valueBeforeDecodeView);return`${e} : ${r}`}isEqual(e){if(this===e)return!0;if(!(e instanceof this.constructor))return!1;let r=this.toBER(),n=e.toBER();return sf(r,n)}};Ne.NAME="BaseBlock";function ff(t){var e;if(t instanceof z.Constructed)for(let r of t.valueBlock.value)ff(r)&&(t.lenBlock.isIndefiniteForm=!0);return!!(!((e=t.lenBlock)===null||e===void 0)&&e.isIndefiniteForm)}var da=class extends Ne{getValue(){return this.valueBlock.value}setValue(e){this.valueBlock.value=e}constructor({value:e=ut,...r}={},n){super(r,n),e&&this.fromString(e)}fromBER(e,r,n){let o=this.valueBlock.fromBER(e,r,this.lenBlock.isIndefiniteForm?n:this.lenBlock.length);return o===-1?(this.error=this.valueBlock.error,o):(this.fromBuffer(this.valueBlock.valueHexView),this.idBlock.error.length||(this.blockLength+=this.idBlock.blockLength),this.lenBlock.error.length||(this.blockLength+=this.lenBlock.blockLength),this.valueBlock.error.length||(this.blockLength+=this.valueBlock.blockLength),o)}onAsciiEncoding(){return`${this.constructor.NAME} : '${this.valueBlock.value}'`}};da.NAME="BaseStringBlock";var lc=class extends pr($e){constructor({isHexOnly:e=!0,...r}={}){super(r),this.isHexOnly=e}};lc.NAME="PrimitiveValueBlock";var hf,Nr=class extends Ne{constructor(e={}){super(e,lc),this.idBlock.isConstructed=!1}};hf=Nr;z.Primitive=hf;Nr.NAME="PRIMITIVE";var mf=100,gf=1e4,yf=16*1024*1024,l0="Maximum ASN.1 nesting depth exceeded",u0="Maximum ASN.1 node count exceeded",d0="Maximum ASN.1 content length exceeded";function xa(t={}){var e,r,n;return{depth:0,maxDepth:(e=t.maxDepth)!==null&&e!==void 0?e:mf,nodesCount:0,maxNodes:(r=t.maxNodes)!==null&&r!==void 0?r:gf,maxContentLength:(n=t.maxContentLength)!==null&&n!==void 0?n:yf}}function p0(t){let e=new Ne({},$e);return e.error=t,{offset:-1,result:e}}function f0(t){if(t.nodesCount+=1,t.nodesCount>t.maxNodes)return u0}function h0(t,e){if(t>e.maxContentLength)return d0}function su(t,e,r,n){let o=n.depth+1;if(o>n.maxDepth)return p0(l0);n.depth=o;try{return Ac(t,e,r,n)}finally{n.depth-=1}}function m0(t,e){if(t instanceof e)return t;let r=new e;return r.idBlock=t.idBlock,r.lenBlock=t.lenBlock,r.warnings=t.warnings,r.valueBeforeDecodeView=t.valueBeforeDecodeView,r}function Ac(t,e=0,r=t.length,n=xa()){let o=e,i=new Ne({},$e),a=new Pr;if(!Dr(a,t,e,r))return i.error=a.error,{offset:-1,result:i};if(!t.subarray(e,e+r).length)return i.error="Zero buffer length",{offset:-1,result:i};let d=f0(n);if(d)return i.error=d,{offset:-1,result:i};let u=i.idBlock.fromBER(t,e,r);if(i.idBlock.warnings.length&&i.warnings.concat(i.idBlock.warnings),u===-1)return i.error=i.idBlock.error,{offset:-1,result:i};if(e=u,r-=i.idBlock.blockLength,u=i.lenBlock.fromBER(t,e,r),i.lenBlock.warnings.length&&i.warnings.concat(i.lenBlock.warnings),u===-1)return i.error=i.lenBlock.error,{offset:-1,result:i};e=u,r-=i.lenBlock.blockLength;let p=i.lenBlock.isIndefiniteForm?r:i.lenBlock.length,h=h0(p,n);if(h)return i.error=h,{offset:-1,result:i};if(!i.idBlock.isConstructed&&i.lenBlock.isIndefiniteForm)return i.error="Indefinite length form used for primitive encoding form",{offset:-1,result:i};let m=Ne;switch(i.idBlock.tagClass){case 1:if(i.idBlock.tagNumber>=37&&i.idBlock.isHexOnly===!1)return i.error="UNIVERSAL 37 and upper tags are reserved by ASN.1 standard",{offset:-1,result:i};switch(i.idBlock.tagNumber){case 0:if(i.idBlock.isConstructed&&i.lenBlock.length>0)return i.error="Type [UNIVERSAL 0] is reserved",{offset:-1,result:i};m=z.EndOfContent;break;case 1:m=z.Boolean;break;case 2:m=z.Integer;break;case 3:m=z.BitString;break;case 4:m=z.OctetString;break;case 5:m=z.Null;break;case 6:m=z.ObjectIdentifier;break;case 10:m=z.Enumerated;break;case 12:m=z.Utf8String;break;case 13:m=z.RelativeObjectIdentifier;break;case 14:m=z.TIME;break;case 15:return i.error="[UNIVERSAL 15] is reserved by ASN.1 standard",{offset:-1,result:i};case 16:m=z.Sequence;break;case 17:m=z.Set;break;case 18:m=z.NumericString;break;case 19:m=z.PrintableString;break;case 20:m=z.TeletexString;break;case 21:m=z.VideotexString;break;case 22:m=z.IA5String;break;case 23:m=z.UTCTime;break;case 24:m=z.GeneralizedTime;break;case 25:m=z.GraphicString;break;case 26:m=z.VisibleString;break;case 27:m=z.GeneralString;break;case 28:m=z.UniversalString;break;case 29:m=z.CharacterString;break;case 30:m=z.BmpString;break;case 31:m=z.DATE;break;case 32:m=z.TimeOfDay;break;case 33:m=z.DateTime;break;case 34:m=z.Duration;break;default:{let k=i.idBlock.isConstructed?new z.Constructed:new z.Primitive;k.idBlock=i.idBlock,k.lenBlock=i.lenBlock,k.warnings=i.warnings,i=k}}break;default:m=i.idBlock.isConstructed?z.Constructed:z.Primitive}return i=m0(i,m),u=i.fromBER(t,e,p,n),i.valueBeforeDecodeView=t.subarray(o,o+i.blockLength),{offset:u,result:i}}function Lr(t,e={}){if(!t.byteLength){let r=new Ne({},$e);return r.error="Input buffer has zero length",{offset:-1,result:r}}return Ac(ue.BufferSourceConverter.toUint8Array(t).slice(),0,t.byteLength,xa(e))}function g0(t,e){return t?1:e}var lr=class extends $e{constructor({value:e=[],isIndefiniteForm:r=!1,...n}={}){super(n),this.value=e,this.isIndefiniteForm=r}fromBER(e,r,n,o){let i=ue.BufferSourceConverter.toUint8Array(e),a=o??xa();if(!Dr(this,i,r,n))return-1;if(this.valueBeforeDecodeView=i.subarray(r,r+n),this.valueBeforeDecodeView.length===0)return this.warnings.push("Zero buffer length"),r;let c=r;for(;g0(this.isIndefiniteForm,n)>0;){let d=su(i,c,n,a);if(d.offset===-1)return this.error=d.result.error,this.warnings.concat(d.result.warnings),-1;if(c=d.offset,this.blockLength+=d.result.blockLength,n-=d.result.blockLength,this.value.push(d.result),this.isIndefiniteForm&&d.result.constructor.NAME===ua)break}return this.isIndefiniteForm&&(this.value[this.value.length-1].constructor.NAME===ua?this.value.pop():this.warnings.push("No EndOfContent block encoded")),c}toBER(e,r){let n=r||new ai;for(let o=0;o<this.value.length;o++)this.value[o].toBER(e,n);return r?dr:n.final()}toJSON(){let e={...super.toJSON(),isIndefiniteForm:this.isIndefiniteForm,value:[]};for(let r of this.value)e.value.push(r.toJSON());return e}};lr.NAME="ConstructedValueBlock";var bf,Oe=class extends Ne{constructor(e={}){super(e,lr),this.idBlock.isConstructed=!0}fromBER(e,r,n,o){this.valueBlock.isIndefiniteForm=this.lenBlock.isIndefiniteForm;let i=this.valueBlock.fromBER(e,r,this.lenBlock.isIndefiniteForm?n:this.lenBlock.length,o);return i===-1?(this.error=this.valueBlock.error,i):(this.idBlock.error.length||(this.blockLength+=this.idBlock.blockLength),this.lenBlock.error.length||(this.blockLength+=this.lenBlock.blockLength),this.valueBlock.error.length||(this.blockLength+=this.valueBlock.blockLength),i)}onAsciiEncoding(){let e=[];for(let n of this.valueBlock.value)e.push(n.toString("ascii").split(`
`).map(o=>`  ${o}`).join(`
`));let r=this.idBlock.tagClass===3?`[${this.idBlock.tagNumber}]`:this.constructor.NAME;return e.length?`${r} :
${e.join(`
`)}`:`${r} :`}};bf=Oe;z.Constructed=bf;Oe.NAME="CONSTRUCTED";var uc=class extends $e{fromBER(e,r,n){return r}toBER(e){return dr}};uc.override="EndOfContentValueBlock";var vf,pa=class extends Ne{constructor(e={}){super(e,uc),this.idBlock.tagClass=1,this.idBlock.tagNumber=0}};vf=pa;z.EndOfContent=vf;pa.NAME=ua;var wf,Wt=class extends Ne{constructor(e={}){super(e,$e),this.idBlock.tagClass=1,this.idBlock.tagNumber=5}fromBER(e,r,n){return this.lenBlock.length>0&&this.warnings.push("Non-zero length of value block for Null type"),this.idBlock.error.length||(this.blockLength+=this.idBlock.blockLength),this.lenBlock.error.length||(this.blockLength+=this.lenBlock.blockLength),this.blockLength+=n,r+n>e.byteLength?(this.error="End of input reached before message was fully decoded (inconsistent offset and length values)",-1):r+n}toBER(e,r){let n=new ArrayBuffer(2);if(!e){let o=new Uint8Array(n);o[0]=5,o[1]=0}return r&&r.write(n),n}onAsciiEncoding(){return`${this.constructor.NAME}`}};wf=Wt;z.Null=wf;Wt.NAME="NULL";var dc=class extends pr($e){get value(){for(let e of this.valueHexView)if(e>0)return!0;return!1}set value(e){this.valueHexView[0]=e?255:0}constructor({value:e,...r}={}){super(r),r.valueHex?this.valueHexView=ue.BufferSourceConverter.toUint8Array(r.valueHex):this.valueHexView=new Uint8Array(1),e&&(this.value=e)}fromBER(e,r,n){let o=ue.BufferSourceConverter.toUint8Array(e);return Dr(this,o,r,n)?(this.valueHexView=o.subarray(r,r+n),n>1&&this.warnings.push("Boolean value encoded in more then 1 octet"),this.isHexOnly=!0,nu.call(this),this.blockLength=n,r+n):-1}toBER(){return this.valueHexView.slice()}toJSON(){return{...super.toJSON(),value:this.value}}};dc.NAME="BooleanValueBlock";var xf,Jn=class extends Ne{getValue(){return this.valueBlock.value}setValue(e){this.valueBlock.value=e}constructor(e={}){super(e,dc),this.idBlock.tagClass=1,this.idBlock.tagNumber=1}onAsciiEncoding(){return`${this.constructor.NAME} : ${this.getValue}`}};xf=Jn;z.Boolean=xf;Jn.NAME="BOOLEAN";var pc=class extends pr(lr){constructor({isConstructed:e=!1,...r}={}){super(r),this.isConstructed=e}fromBER(e,r,n,o){let i=0;if(this.isConstructed){if(this.isHexOnly=!1,i=lr.prototype.fromBER.call(this,e,r,n,o),i===-1)return i;for(let a=0;a<this.value.length;a++){let c=this.value[a].constructor.NAME;if(c===ua){if(this.isIndefiniteForm)break;return this.error="EndOfContent is unexpected, OCTET STRING may consists of OCTET STRINGs only",-1}if(c!==df)return this.error="OCTET STRING may consists of OCTET STRINGs only",-1}}else this.isHexOnly=!0,i=super.fromBER(e,r,n),this.blockLength=n;return i}toBER(e,r){return this.isConstructed?lr.prototype.toBER.call(this,e,r):e?new ArrayBuffer(this.valueHexView.byteLength):this.valueHexView.slice().buffer}toJSON(){return{...super.toJSON(),isConstructed:this.isConstructed}}};pc.NAME="OctetStringValueBlock";var cu,zt=class extends Ne{constructor({idBlock:e={},lenBlock:r={},...n}={}){var o,i;(o=n.isConstructed)!==null&&o!==void 0||(n.isConstructed=!!(!((i=n.value)===null||i===void 0)&&i.length)),super({idBlock:{isConstructed:n.isConstructed,...e},lenBlock:{...r,isIndefiniteForm:!!n.isIndefiniteForm},...n},pc),this.idBlock.tagClass=1,this.idBlock.tagNumber=4}fromBER(e,r,n,o){if(this.valueBlock.isConstructed=this.idBlock.isConstructed,this.valueBlock.isIndefiniteForm=this.lenBlock.isIndefiniteForm,n===0)return this.idBlock.error.length===0&&(this.blockLength+=this.idBlock.blockLength),this.lenBlock.error.length===0&&(this.blockLength+=this.lenBlock.blockLength),r;if(!this.valueBlock.isConstructed){let a=(e instanceof ArrayBuffer?new Uint8Array(e):e).subarray(r,r+n);try{if(a.byteLength){let c=o??xa(),d=su(a,0,a.byteLength,c);d.offset!==-1&&d.offset===n&&(this.valueBlock.value=[d.result])}}catch{}}return super.fromBER(e,r,n,o)}onAsciiEncoding(){if(this.valueBlock.isConstructed||this.valueBlock.value&&this.valueBlock.value.length)return Oe.prototype.onAsciiEncoding.call(this);let e=this.constructor.NAME,r=ue.Convert.ToHex(this.valueBlock.valueHexView);return`${e} : ${r}`}getValue(){if(!this.idBlock.isConstructed)return this.valueBlock.valueHexView.slice().buffer;let e=[];for(let r of this.valueBlock.value)r instanceof cu&&e.push(r.valueBlock.valueHexView);return ue.BufferSourceConverter.concat(e)}};cu=zt;z.OctetString=cu;zt.NAME=df;var fc=class extends pr(lr){constructor({unusedBits:e=0,isConstructed:r=!1,...n}={}){super(n),this.unusedBits=e,this.isConstructed=r,this.blockLength=this.valueHexView.byteLength}fromBER(e,r,n,o){if(!n)return r;let i=-1;if(this.isConstructed){if(i=lr.prototype.fromBER.call(this,e,r,n,o),i===-1)return i;for(let d of this.value){let u=d.constructor.NAME;if(u===ua){if(this.isIndefiniteForm)break;return this.error="EndOfContent is unexpected, BIT STRING may consists of BIT STRINGs only",-1}if(u!==pf)return this.error="BIT STRING may consists of BIT STRINGs only",-1;let p=d.valueBlock;if(this.unusedBits>0&&p.unusedBits>0)return this.error='Using of "unused bits" inside constructive BIT STRING allowed for least one only',-1;this.unusedBits=p.unusedBits}return i}let a=ue.BufferSourceConverter.toUint8Array(e);if(!Dr(this,a,r,n))return-1;let c=a.subarray(r,r+n);if(this.unusedBits=c[0],this.unusedBits>7)return this.error="Unused bits for BitString must be in range 0-7",-1;if(!this.unusedBits){let d=c.subarray(1);try{if(d.byteLength){let u=o??xa(),p=su(d,0,d.byteLength,u);p.offset!==-1&&p.offset===n-1&&(this.value=[p.result])}}catch{}}return this.valueHexView=c.subarray(1),this.blockLength=c.length,r+n}toBER(e,r){if(this.isConstructed)return lr.prototype.toBER.call(this,e,r);if(e)return new ArrayBuffer(this.valueHexView.byteLength+1);if(!this.valueHexView.byteLength){let o=new Uint8Array(1);return o[0]=0,o.buffer}let n=new Uint8Array(this.valueHexView.length+1);return n[0]=this.unusedBits,n.set(this.valueHexView,1),n.buffer}toJSON(){return{...super.toJSON(),unusedBits:this.unusedBits,isConstructed:this.isConstructed}}};fc.NAME="BitStringValueBlock";var Af,Ft=class extends Ne{constructor({idBlock:e={},lenBlock:r={},...n}={}){var o,i;(o=n.isConstructed)!==null&&o!==void 0||(n.isConstructed=!!(!((i=n.value)===null||i===void 0)&&i.length)),super({idBlock:{isConstructed:n.isConstructed,...e},lenBlock:{...r,isIndefiniteForm:!!n.isIndefiniteForm},...n},fc),this.idBlock.tagClass=1,this.idBlock.tagNumber=3}fromBER(e,r,n,o){return this.valueBlock.isConstructed=this.idBlock.isConstructed,this.valueBlock.isIndefiniteForm=this.lenBlock.isIndefiniteForm,super.fromBER(e,r,n,o)}onAsciiEncoding(){if(this.valueBlock.isConstructed||this.valueBlock.value&&this.valueBlock.value.length)return Oe.prototype.onAsciiEncoding.call(this);{let e=[],r=this.valueBlock.valueHexView;for(let a of r)e.push(a.toString(2).padStart(8,"0"));let n=e.join(""),o=this.constructor.NAME,i=n.substring(0,n.length-this.valueBlock.unusedBits);return`${o} : ${i}`}}};Af=Ft;z.BitString=Af;Ft.NAME=pf;var Ef;function y0(t,e){let r=new Uint8Array([0]),n=new Uint8Array(t),o=new Uint8Array(e),i=n.slice(0),a=i.length-1,c=o.slice(0),d=c.length-1,u=0,p=d<a?a:d,h=0;for(let m=p;m>=0;m--,h++)!0===h<c.length?u=i[a-h]+c[d-h]+r[0]:u=i[a-h]+r[0],r[0]=u/10,!0===h>=i.length?i=ic(new Uint8Array([u%10]),i):i[a-h]=u%10;return r[0]>0&&(i=ic(r,i)),i}function uf(t){if(t>=ca.length)for(let e=ca.length;e<=t;e++){let r=new Uint8Array([0]),n=ca[e-1].slice(0);for(let o=n.length-1;o>=0;o--){let i=new Uint8Array([(n[o]<<1)+r[0]]);r[0]=i[0]/10,n[o]=i[0]%10}r[0]>0&&(n=ic(r,n)),ca.push(n)}return ca[t]}function b0(t,e){let r=0,n=new Uint8Array(t),o=new Uint8Array(e),i=n.slice(0),a=i.length-1,c=o.slice(0),d=c.length-1,u,p=0;for(let h=d;h>=0;h--,p++)u=i[a-p]-c[d-p]-r,!0===u<0?(r=1,i[a-p]=u+10):(r=0,i[a-p]=u);if(r>0)for(let h=a-d+1;h>=0;h--,p++)if(u=i[a-p]-r,u<0)r=1,i[a-p]=u+10;else{r=0,i[a-p]=u;break}return i.slice()}var fa=class extends pr($e){setValueHex(){this.valueHexView.length>=4?(this.warnings.push("Too big Integer for decoding, hex only"),this.isHexOnly=!0,this._valueDec=0):(this.isHexOnly=!1,this.valueHexView.length>0&&(this._valueDec=nu.call(this)))}constructor({value:e,...r}={}){super(r),this._valueDec=0,r.valueHex&&this.setValueHex(),e!==void 0&&(this.valueDec=e)}set valueDec(e){this._valueDec=e,this.isHexOnly=!1,this.valueHexView=new Uint8Array(af(e))}get valueDec(){return this._valueDec}fromDER(e,r,n,o=0){let i=this.fromBER(e,r,n);if(i===-1)return i;let a=this.valueHexView;return a[0]===0&&(a[1]&128)!==0?this.valueHexView=a.subarray(1):o!==0&&a.length<o&&(o-a.length>1&&(o=a.length+1),this.valueHexView=a.subarray(o-a.length)),i}toDER(e=!1){let r=this.valueHexView;switch(!0){case(r[0]&128)!==0:{let n=new Uint8Array(this.valueHexView.length+1);n[0]=0,n.set(r,1),this.valueHexView=n}break;case(r[0]===0&&(r[1]&128)===0):this.valueHexView=this.valueHexView.subarray(1);break}return this.toBER(e)}fromBER(e,r,n){let o=super.fromBER(e,r,n);return o===-1||this.setValueHex(),o}toBER(e){return e?new ArrayBuffer(this.valueHexView.length):this.valueHexView.slice().buffer}toJSON(){return{...super.toJSON(),valueDec:this.valueDec}}toString(){let e=this.valueHexView.length*8-1,r=new Uint8Array(this.valueHexView.length*8/3),n=0,o,i=this.valueHexView,a="",c=!1;for(let d=i.byteLength-1;d>=0;d--){o=i[d];for(let u=0;u<8;u++)(o&1)===1&&(n===e?(r=b0(uf(n),r),a="-"):r=y0(r,uf(n))),n++,o>>=1}for(let d=0;d<r.length;d++)r[d]&&(c=!0),c&&(a+=cf.charAt(r[d]));return c===!1&&(a+=cf.charAt(0)),a}};Ef=fa;fa.NAME="IntegerValueBlock";Object.defineProperty(Ef.prototype,"valueHex",{set:function(t){this.valueHexView=new Uint8Array(t),this.setValueHex()},get:function(){return this.valueHexView.slice().buffer}});var la,Or=class extends Ne{constructor(e={}){super(e,fa),this.idBlock.tagClass=1,this.idBlock.tagNumber=2}toBigInt(){return ac(),BigInt(this.valueBlock.toString())}static fromBigInt(e){ac();let r=BigInt(e),n=new ai,o=r.toString(16).replace(/^-/,""),i=new Uint8Array(ue.Convert.FromHex(o));if(r<0){let c=new Uint8Array(i.length+(i[0]&128?1:0));c[0]|=128;let u=BigInt(`0x${ue.Convert.ToHex(c)}`)+r,p=ue.BufferSourceConverter.toUint8Array(ue.Convert.FromHex(u.toString(16)));p[0]|=128,n.write(p)}else i[0]&128&&n.write(new Uint8Array([0])),n.write(i);return new la({valueHex:n.final()})}convertToDER(){let e=new la({valueHex:this.valueBlock.valueHexView});return e.valueBlock.toDER(),e}convertFromDER(){return new la({valueHex:this.valueBlock.valueHexView[0]===0?this.valueBlock.valueHexView.subarray(1):this.valueBlock.valueHexView})}onAsciiEncoding(){return`${this.constructor.NAME} : ${this.valueBlock.toString()}`}};la=Or;z.Integer=la;Or.NAME="INTEGER";var kf,Xn=class extends Or{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=10}};kf=Xn;z.Enumerated=kf;Xn.NAME="ENUMERATED";var ha=class extends pr($e){constructor({valueDec:e=-1,isFirstSid:r=!1,...n}={}){super(n),this.valueDec=e,this.isFirstSid=r}fromBER(e,r,n){if(!n)return r;let o=ue.BufferSourceConverter.toUint8Array(e);if(!Dr(this,o,r,n))return-1;let i=o.subarray(r,r+n);this.valueHexView=new Uint8Array(n);for(let c=0;c<n&&(this.valueHexView[c]=i[c]&127,this.blockLength++,(i[c]&128)!==0);c++);let a=new Uint8Array(this.blockLength);for(let c=0;c<this.blockLength;c++)a[c]=this.valueHexView[c];return this.valueHexView=a,(i[this.blockLength-1]&128)!==0?(this.error="End of input reached before message was fully decoded",-1):(this.valueHexView[0]===0&&this.warnings.push("Needlessly long format of SID encoding"),this.blockLength<=8?this.valueDec=Yn(this.valueHexView,7):(this.isHexOnly=!0,this.warnings.push("Too big SID for decoding, hex only")),r+this.blockLength)}set valueBigInt(e){ac();let r=BigInt(e).toString(2);for(;r.length%7;)r="0"+r;let n=new Uint8Array(r.length/7);for(let o=0;o<n.length;o++)n[o]=parseInt(r.slice(o*7,o*7+7),2)+(o+1<n.length?128:0);this.fromBER(n.buffer,0,n.length)}toBER(e){if(this.isHexOnly){if(e)return new ArrayBuffer(this.valueHexView.byteLength);let o=this.valueHexView,i=new Uint8Array(this.blockLength);for(let a=0;a<this.blockLength-1;a++)i[a]=o[a]|128;return i[this.blockLength-1]=o[this.blockLength-1],i.buffer}let r=ln(this.valueDec,7);if(r.byteLength===0)return this.error="Error during encoding SID value",dr;let n=new Uint8Array(r.byteLength);if(!e){let o=new Uint8Array(r),i=r.byteLength-1;for(let a=0;a<i;a++)n[a]=o[a]|128;n[i]=o[i]}return n}toString(){let e="";if(this.isHexOnly)e=ue.Convert.ToHex(this.valueHexView);else if(this.isFirstSid){let r=this.valueDec;this.valueDec<=39?e="0.":this.valueDec<=79?(e="1.",r-=40):(e="2.",r-=80),e+=r.toString()}else e=this.valueDec.toString();return e}toJSON(){return{...super.toJSON(),valueDec:this.valueDec,isFirstSid:this.isFirstSid}}};ha.NAME="sidBlock";var hc=class extends $e{constructor({value:e=ut,...r}={}){super(r),this.value=[],e&&this.fromString(e)}fromBER(e,r,n){let o=r;for(;n>0;){let i=new ha;if(o=i.fromBER(e,o,n),o===-1)return this.blockLength=0,this.error=i.error,o;this.value.length===0&&(i.isFirstSid=!0),this.blockLength+=i.blockLength,n-=i.blockLength,this.value.push(i)}return o}toBER(e){let r=[];for(let n=0;n<this.value.length;n++){let o=this.value[n].toBER(e);if(o.byteLength===0)return this.error=this.value[n].error,dr;r.push(o)}return au(r)}fromString(e){this.value=[];let r=0,n=0,o="",i=!1;do if(n=e.indexOf(".",r),n===-1?o=e.substring(r):o=e.substring(r,n),r=n+1,i){let a=this.value[0],c=0;switch(a.valueDec){case 0:break;case 1:c=40;break;case 2:c=80;break;default:this.value=[];return}let d=parseInt(o,10);if(isNaN(d))return;a.valueDec=d+c,i=!1}else{let a=new ha;if(o>Number.MAX_SAFE_INTEGER){ac();let c=BigInt(o);a.valueBigInt=c}else if(a.valueDec=parseInt(o,10),isNaN(a.valueDec))return;this.value.length||(a.isFirstSid=!0,i=!0),this.value.push(a)}while(n!==-1)}toString(){let e="",r=!1;for(let n=0;n<this.value.length;n++){r=this.value[n].isHexOnly;let o=this.value[n].toString();n!==0&&(e=`${e}.`),r?(o=`{${o}}`,this.value[n].isFirstSid?e=`2.{${o} - 80}`:e+=o):e+=o}return e}toJSON(){let e={...super.toJSON(),value:this.toString(),sidArray:[]};for(let r=0;r<this.value.length;r++)e.sidArray.push(this.value[r].toJSON());return e}};hc.NAME="ObjectIdentifierValueBlock";var Sf,Qn=class extends Ne{getValue(){return this.valueBlock.toString()}setValue(e){this.valueBlock.fromString(e)}constructor(e={}){super(e,hc),this.idBlock.tagClass=1,this.idBlock.tagNumber=6}onAsciiEncoding(){return`${this.constructor.NAME} : ${this.valueBlock.toString()||"empty"}`}toJSON(){return{...super.toJSON(),value:this.getValue()}}};Sf=Qn;z.ObjectIdentifier=Sf;Qn.NAME="OBJECT IDENTIFIER";var ma=class extends pr(Pr){constructor({valueDec:e=0,...r}={}){super(r),this.valueDec=e}fromBER(e,r,n){if(n===0)return r;let o=ue.BufferSourceConverter.toUint8Array(e);if(!Dr(this,o,r,n))return-1;let i=o.subarray(r,r+n);this.valueHexView=new Uint8Array(n);for(let c=0;c<n&&(this.valueHexView[c]=i[c]&127,this.blockLength++,(i[c]&128)!==0);c++);let a=new Uint8Array(this.blockLength);for(let c=0;c<this.blockLength;c++)a[c]=this.valueHexView[c];return this.valueHexView=a,(i[this.blockLength-1]&128)!==0?(this.error="End of input reached before message was fully decoded",-1):(this.valueHexView[0]===0&&this.warnings.push("Needlessly long format of SID encoding"),this.blockLength<=8?this.valueDec=Yn(this.valueHexView,7):(this.isHexOnly=!0,this.warnings.push("Too big SID for decoding, hex only")),r+this.blockLength)}toBER(e){if(this.isHexOnly){if(e)return new ArrayBuffer(this.valueHexView.byteLength);let o=this.valueHexView,i=new Uint8Array(this.blockLength);for(let a=0;a<this.blockLength-1;a++)i[a]=o[a]|128;return i[this.blockLength-1]=o[this.blockLength-1],i.buffer}let r=ln(this.valueDec,7);if(r.byteLength===0)return this.error="Error during encoding SID value",dr;let n=new Uint8Array(r.byteLength);if(!e){let o=new Uint8Array(r),i=r.byteLength-1;for(let a=0;a<i;a++)n[a]=o[a]|128;n[i]=o[i]}return n.buffer}toString(){let e="";return this.isHexOnly?e=ue.Convert.ToHex(this.valueHexView):e=this.valueDec.toString(),e}toJSON(){return{...super.toJSON(),valueDec:this.valueDec}}};ma.NAME="relativeSidBlock";var mc=class extends $e{constructor({value:e=ut,...r}={}){super(r),this.value=[],e&&this.fromString(e)}fromBER(e,r,n){let o=r;for(;n>0;){let i=new ma;if(o=i.fromBER(e,o,n),o===-1)return this.blockLength=0,this.error=i.error,o;this.blockLength+=i.blockLength,n-=i.blockLength,this.value.push(i)}return o}toBER(e,r){let n=[];for(let o=0;o<this.value.length;o++){let i=this.value[o].toBER(e);if(i.byteLength===0)return this.error=this.value[o].error,dr;n.push(i)}return au(n)}fromString(e){this.value=[];let r=0,n=0,o="";do{n=e.indexOf(".",r),n===-1?o=e.substring(r):o=e.substring(r,n),r=n+1;let i=new ma;if(i.valueDec=parseInt(o,10),isNaN(i.valueDec))return!0;this.value.push(i)}while(n!==-1);return!0}toString(){let e="",r=!1;for(let n=0;n<this.value.length;n++){r=this.value[n].isHexOnly;let o=this.value[n].toString();n!==0&&(e=`${e}.`),r&&(o=`{${o}}`),e+=o}return e}toJSON(){let e={...super.toJSON(),value:this.toString(),sidArray:[]};for(let r=0;r<this.value.length;r++)e.sidArray.push(this.value[r].toJSON());return e}};mc.NAME="RelativeObjectIdentifierValueBlock";var Cf,Zn=class extends Ne{getValue(){return this.valueBlock.toString()}setValue(e){this.valueBlock.fromString(e)}constructor(e={}){super(e,mc),this.idBlock.tagClass=1,this.idBlock.tagNumber=13}onAsciiEncoding(){return`${this.constructor.NAME} : ${this.valueBlock.toString()||"empty"}`}toJSON(){return{...super.toJSON(),value:this.getValue()}}};Cf=Zn;z.RelativeObjectIdentifier=Cf;Zn.NAME="RelativeObjectIdentifier";var Tf,Je=class extends Oe{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=16}};Tf=Je;z.Sequence=Tf;Je.NAME="SEQUENCE";var If,rt=class extends Oe{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=17}};If=rt;z.Set=If;rt.NAME="SET";var gc=class extends pr($e){constructor({...e}={}){super(e),this.isHexOnly=!0,this.value=ut}toJSON(){return{...super.toJSON(),value:this.value}}};gc.NAME="StringValueBlock";var yc=class extends gc{};yc.NAME="SimpleStringValueBlock";var nt=class extends da{constructor({...e}={}){super(e,yc)}fromBuffer(e){this.valueBlock.value=String.fromCharCode.apply(null,ue.BufferSourceConverter.toUint8Array(e))}fromString(e){let r=e.length,n=this.valueBlock.valueHexView=new Uint8Array(r);for(let o=0;o<r;o++)n[o]=e.charCodeAt(o);this.valueBlock.value=e}};nt.NAME="SIMPLE STRING";var bc=class extends nt{fromBuffer(e){this.valueBlock.valueHexView=ue.BufferSourceConverter.toUint8Array(e);try{this.valueBlock.value=ue.Convert.ToUtf8String(e)}catch(r){this.warnings.push(`Error during "decodeURIComponent": ${r}, using raw string`),this.valueBlock.value=ue.Convert.ToBinary(e)}}fromString(e){this.valueBlock.valueHexView=new Uint8Array(ue.Convert.FromUtf8String(e)),this.valueBlock.value=e}};bc.NAME="Utf8StringValueBlock";var _f,_t=class extends bc{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=12}};_f=_t;z.Utf8String=_f;_t.NAME="UTF8String";var vc=class extends nt{fromBuffer(e){this.valueBlock.value=ue.Convert.ToUtf16String(e),this.valueBlock.valueHexView=ue.BufferSourceConverter.toUint8Array(e)}fromString(e){this.valueBlock.value=e,this.valueBlock.valueHexView=new Uint8Array(ue.Convert.FromUtf16String(e))}};vc.NAME="BmpStringValueBlock";var Bf,eo=class extends vc{constructor({...e}={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=30}};Bf=eo;z.BmpString=Bf;eo.NAME="BMPString";var wc=class extends nt{fromBuffer(e){let r=ArrayBuffer.isView(e)?e.slice().buffer:e.slice(0),n=new Uint8Array(r);for(let o=0;o<n.length;o+=4)n[o]=n[o+3],n[o+1]=n[o+2],n[o+2]=0,n[o+3]=0;this.valueBlock.value=String.fromCharCode.apply(null,new Uint32Array(r))}fromString(e){let r=e.length,n=this.valueBlock.valueHexView=new Uint8Array(r*4);for(let o=0;o<r;o++){let i=ln(e.charCodeAt(o),8),a=new Uint8Array(i);if(a.length>4)continue;let c=4-a.length;for(let d=a.length-1;d>=0;d--)n[o*4+d+c]=a[d]}this.valueBlock.value=e}};wc.NAME="UniversalStringValueBlock";var Rf,to=class extends wc{constructor({...e}={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=28}};Rf=to;z.UniversalString=Rf;to.NAME="UniversalString";var Mf,ro=class extends nt{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=18}};Mf=ro;z.NumericString=Mf;ro.NAME="NumericString";var Pf,no=class extends nt{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=19}};Pf=no;z.PrintableString=Pf;no.NAME="PrintableString";var Nf,oo=class extends nt{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=20}};Nf=oo;z.TeletexString=Nf;oo.NAME="TeletexString";var Of,io=class extends nt{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=21}};Of=io;z.VideotexString=Of;io.NAME="VideotexString";var Df,ao=class extends nt{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=22}};Df=ao;z.IA5String=Df;ao.NAME="IA5String";var Lf,so=class extends nt{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=25}};Lf=so;z.GraphicString=Lf;so.NAME="GraphicString";var jf,un=class extends nt{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=26}};jf=un;z.VisibleString=jf;un.NAME="VisibleString";var Hf,co=class extends nt{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=27}};Hf=co;z.GeneralString=Hf;co.NAME="GeneralString";var Uf,lo=class extends nt{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=29}};Uf=lo;z.CharacterString=Uf;lo.NAME="CharacterString";var $f,dn=class extends un{constructor({value:e,valueDate:r,...n}={}){if(super(n),this.year=0,this.month=0,this.day=0,this.hour=0,this.minute=0,this.second=0,e){this.fromString(e),this.valueBlock.valueHexView=new Uint8Array(e.length);for(let o=0;o<e.length;o++)this.valueBlock.valueHexView[o]=e.charCodeAt(o)}r&&(this.fromDate(r),this.valueBlock.valueHexView=new Uint8Array(this.toBuffer())),this.idBlock.tagClass=1,this.idBlock.tagNumber=23}fromBuffer(e){this.fromString(String.fromCharCode.apply(null,ue.BufferSourceConverter.toUint8Array(e)))}toBuffer(){let e=this.toString(),r=new ArrayBuffer(e.length),n=new Uint8Array(r);for(let o=0;o<e.length;o++)n[o]=e.charCodeAt(o);return r}fromDate(e){this.year=e.getUTCFullYear(),this.month=e.getUTCMonth()+1,this.day=e.getUTCDate(),this.hour=e.getUTCHours(),this.minute=e.getUTCMinutes(),this.second=e.getUTCSeconds()}toDate(){return new Date(Date.UTC(this.year,this.month-1,this.day,this.hour,this.minute,this.second))}fromString(e){let n=/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})Z/ig.exec(e);if(n===null){this.error="Wrong input string for conversion";return}let o=parseInt(n[1],10);o>=50?this.year=1900+o:this.year=2e3+o,this.month=parseInt(n[2],10),this.day=parseInt(n[3],10),this.hour=parseInt(n[4],10),this.minute=parseInt(n[5],10),this.second=parseInt(n[6],10)}toString(e="iso"){if(e==="iso"){let r=new Array(7);return r[0]=lt(this.year<2e3?this.year-1900:this.year-2e3,2),r[1]=lt(this.month,2),r[2]=lt(this.day,2),r[3]=lt(this.hour,2),r[4]=lt(this.minute,2),r[5]=lt(this.second,2),r[6]="Z",r.join("")}return super.toString(e)}onAsciiEncoding(){return`${this.constructor.NAME} : ${this.toDate().toISOString()}`}toJSON(){return{...super.toJSON(),year:this.year,month:this.month,day:this.day,hour:this.hour,minute:this.minute,second:this.second}}};$f=dn;z.UTCTime=$f;dn.NAME="UTCTime";var Gf,uo=class extends dn{constructor(e={}){var r;super(e),(r=this.millisecond)!==null&&r!==void 0||(this.millisecond=0),this.idBlock.tagClass=1,this.idBlock.tagNumber=24}fromDate(e){super.fromDate(e),this.millisecond=e.getUTCMilliseconds()}toDate(){let e=Date.UTC(this.year,this.month-1,this.day,this.hour,this.minute,this.second,this.millisecond);return new Date(e)}fromString(e){let r=!1,n="",o="",i=0,a,c=0,d=0;if(e[e.length-1]==="Z")n=e.substring(0,e.length-1),r=!0;else{let h=new Number(e[e.length-1]);if(isNaN(h.valueOf()))throw new Error("Wrong input string for conversion");n=e}if(r){if(n.indexOf("+")!==-1)throw new Error("Wrong input string for conversion");if(n.indexOf("-")!==-1)throw new Error("Wrong input string for conversion")}else{let h=1,m=n.indexOf("+"),k="";if(m===-1&&(m=n.indexOf("-"),h=-1),m!==-1){if(k=n.substring(m+1),n=n.substring(0,m),k.length!==2&&k.length!==4)throw new Error("Wrong input string for conversion");let I=parseInt(k.substring(0,2),10);if(isNaN(I.valueOf()))throw new Error("Wrong input string for conversion");if(c=h*I,k.length===4){if(I=parseInt(k.substring(2,4),10),isNaN(I.valueOf()))throw new Error("Wrong input string for conversion");d=h*I}}}let u=n.indexOf(".");if(u===-1&&(u=n.indexOf(",")),u!==-1){let h=new Number(`0${n.substring(u)}`);if(isNaN(h.valueOf()))throw new Error("Wrong input string for conversion");i=h.valueOf(),o=n.substring(0,u)}else o=n;switch(!0){case o.length===8:if(a=/(\d{4})(\d{2})(\d{2})/ig,u!==-1)throw new Error("Wrong input string for conversion");break;case o.length===10:if(a=/(\d{4})(\d{2})(\d{2})(\d{2})/ig,u!==-1){let h=60*i;this.minute=Math.floor(h),h=60*(h-this.minute),this.second=Math.floor(h),h=1e3*(h-this.second),this.millisecond=Math.floor(h)}break;case o.length===12:if(a=/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/ig,u!==-1){let h=60*i;this.second=Math.floor(h),h=1e3*(h-this.second),this.millisecond=Math.floor(h)}break;case o.length===14:if(a=/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/ig,u!==-1){let h=1e3*i;this.millisecond=Math.floor(h)}break;default:throw new Error("Wrong input string for conversion")}let p=a.exec(o);if(p===null)throw new Error("Wrong input string for conversion");for(let h=1;h<p.length;h++)switch(h){case 1:this.year=parseInt(p[h],10);break;case 2:this.month=parseInt(p[h],10);break;case 3:this.day=parseInt(p[h],10);break;case 4:this.hour=parseInt(p[h],10)+c;break;case 5:this.minute=parseInt(p[h],10)+d;break;case 6:this.second=parseInt(p[h],10);break;default:throw new Error("Wrong input string for conversion")}if(r===!1){let h=new Date(this.year,this.month,this.day,this.hour,this.minute,this.second,this.millisecond);this.year=h.getUTCFullYear(),this.month=h.getUTCMonth(),this.day=h.getUTCDay(),this.hour=h.getUTCHours(),this.minute=h.getUTCMinutes(),this.second=h.getUTCSeconds(),this.millisecond=h.getUTCMilliseconds()}}toString(e="iso"){if(e==="iso"){let r=[];return r.push(lt(this.year,4)),r.push(lt(this.month,2)),r.push(lt(this.day,2)),r.push(lt(this.hour,2)),r.push(lt(this.minute,2)),r.push(lt(this.second,2)),this.millisecond!==0&&(r.push("."),r.push(lt(this.millisecond,3))),r.push("Z"),r.join("")}return super.toString(e)}toJSON(){return{...super.toJSON(),millisecond:this.millisecond}}};Gf=uo;z.GeneralizedTime=Gf;uo.NAME="GeneralizedTime";var Vf,ga=class extends _t{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=31}};Vf=ga;z.DATE=Vf;ga.NAME="DATE";var Kf,ya=class extends _t{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=32}};Kf=ya;z.TimeOfDay=Kf;ya.NAME="TimeOfDay";var Wf,ba=class extends _t{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=33}};Wf=ba;z.DateTime=Wf;ba.NAME="DateTime";var zf,va=class extends _t{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=34}};zf=va;z.Duration=zf;va.NAME="Duration";var Ff,wa=class extends _t{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=14}};Ff=wa;z.TIME=Ff;wa.NAME="TIME";var ur=class{constructor({name:e=ut,optional:r=!1}={}){this.name=e,this.optional=r}},si=class extends ur{constructor({value:e=[],...r}={}){super(r),this.value=e}},po=class extends ur{constructor({value:e=new ur,local:r=!1,...n}={}){super(n),this.value=e,this.local=r}},iu=class{get data(){return this.dataView.slice().buffer}set data(e){this.dataView=ue.BufferSourceConverter.toUint8Array(e)}constructor({data:e=xc}={}){this.dataView=ue.BufferSourceConverter.toUint8Array(e)}fromBER(e,r,n){let o=r+n;return this.dataView=ue.BufferSourceConverter.toUint8Array(e).subarray(r,o),o}toBER(e){return this.dataView.slice().buffer}};function Mr(t,e,r){if(r instanceof si){for(let i of r.value)if(Mr(t,e,i).verified)return{verified:!0,result:t};{let i={verified:!1,result:{error:"Wrong values for Choice type"}};return r.hasOwnProperty(ou)&&(i.name=r.name),i}}if(r instanceof ur)return r.hasOwnProperty(ou)&&(t[r.name]=e),{verified:!0,result:t};if(!(t instanceof Object))return{verified:!1,result:{error:"Wrong root object"}};if(!(e instanceof Object))return{verified:!1,result:{error:"Wrong ASN.1 data"}};if(!(r instanceof Object))return{verified:!1,result:{error:"Wrong ASN.1 schema"}};if(!(r0 in r))return{verified:!1,result:{error:"Wrong ASN.1 schema"}};if(!(a0 in r.idBlock))return{verified:!1,result:{error:"Wrong ASN.1 schema"}};if(!(s0 in r.idBlock))return{verified:!1,result:{error:"Wrong ASN.1 schema"}};let n=r.idBlock.toBER(!1);if(n.byteLength===0)return{verified:!1,result:{error:"Error encoding idBlock for ASN.1 schema"}};if(r.idBlock.fromBER(n,0,n.byteLength)===-1)return{verified:!1,result:{error:"Error decoding idBlock for ASN.1 schema"}};if(r.idBlock.hasOwnProperty(n0)===!1)return{verified:!1,result:{error:"Wrong ASN.1 schema"}};if(r.idBlock.tagClass!==e.idBlock.tagClass)return{verified:!1,result:t};if(r.idBlock.hasOwnProperty(o0)===!1)return{verified:!1,result:{error:"Wrong ASN.1 schema"}};if(r.idBlock.tagNumber!==e.idBlock.tagNumber)return{verified:!1,result:t};if(r.idBlock.hasOwnProperty(i0)===!1)return{verified:!1,result:{error:"Wrong ASN.1 schema"}};if(r.idBlock.isConstructed!==e.idBlock.isConstructed)return{verified:!1,result:t};if(!(t0 in r.idBlock))return{verified:!1,result:{error:"Wrong ASN.1 schema"}};if(r.idBlock.isHexOnly!==e.idBlock.isHexOnly)return{verified:!1,result:t};if(r.idBlock.isHexOnly){if(!(lf in r.idBlock))return{verified:!1,result:{error:"Wrong ASN.1 schema"}};let i=r.idBlock.valueHexView,a=e.idBlock.valueHexView;if(i.length!==a.length)return{verified:!1,result:t};for(let c=0;c<i.length;c++)if(i[c]!==a[1])return{verified:!1,result:t}}if(r.name&&(r.name=r.name.replace(/^\s+|\s+$/g,ut),r.name&&(t[r.name]=e)),r instanceof z.Constructed){let i=0,a={verified:!1,result:{error:"Unknown error"}},c=r.valueBlock.value.length;if(c>0&&r.valueBlock.value[0]instanceof po&&(c=e.valueBlock.value.length),c===0)return{verified:!0,result:t};if(e.valueBlock.value.length===0&&r.valueBlock.value.length!==0){let d=!0;for(let u=0;u<r.valueBlock.value.length;u++)d=d&&(r.valueBlock.value[u].optional||!1);return d?{verified:!0,result:t}:(r.name&&(r.name=r.name.replace(/^\s+|\s+$/g,ut),r.name&&delete t[r.name]),t.error="Inconsistent object length",{verified:!1,result:t})}for(let d=0;d<c;d++)if(d-i>=e.valueBlock.value.length){if(r.valueBlock.value[d].optional===!1){let u={verified:!1,result:t};return t.error="Inconsistent length between ASN.1 data and schema",r.name&&(r.name=r.name.replace(/^\s+|\s+$/g,ut),r.name&&(delete t[r.name],u.name=r.name)),u}}else if(r.valueBlock.value[0]instanceof po){if(a=Mr(t,e.valueBlock.value[d],r.valueBlock.value[0].value),a.verified===!1)if(r.valueBlock.value[0].optional)i++;else return r.name&&(r.name=r.name.replace(/^\s+|\s+$/g,ut),r.name&&delete t[r.name]),a;if(ou in r.valueBlock.value[0]&&r.valueBlock.value[0].name.length>0){let u={};c0 in r.valueBlock.value[0]&&r.valueBlock.value[0].local?u=e:u=t,typeof u[r.valueBlock.value[0].name]>"u"&&(u[r.valueBlock.value[0].name]=[]),u[r.valueBlock.value[0].name].push(e.valueBlock.value[d])}}else if(a=Mr(t,e.valueBlock.value[d-i],r.valueBlock.value[d]),a.verified===!1)if(r.valueBlock.value[d].optional)i++;else return r.name&&(r.name=r.name.replace(/^\s+|\s+$/g,ut),r.name&&delete t[r.name]),a;if(a.verified===!1){let d={verified:!1,result:t};return r.name&&(r.name=r.name.replace(/^\s+|\s+$/g,ut),r.name&&(delete t[r.name],d.name=r.name)),d}return{verified:!0,result:t}}if(r.primitiveSchema&&lf in e.valueBlock){let i=Ac(e.valueBlock.valueHexView);if(i.offset===-1){let a={verified:!1,result:i.result};return r.name&&(r.name=r.name.replace(/^\s+|\s+$/g,ut),r.name&&(delete t[r.name],a.name=r.name)),a}return Mr(t,i.result,r.primitiveSchema)}return{verified:!0,result:t}}function v0(t,e){if(!(e instanceof Object))return{verified:!1,result:{error:"Wrong ASN.1 schema type"}};let r=Ac(ue.BufferSourceConverter.toUint8Array(t));return r.offset===-1?{verified:!1,result:r.result}:Mr(r.result,r.result,e)}var w0="[object ArrayBuffer]",x0="[object SharedArrayBuffer]";function qf(t){return Object.prototype.toString.call(t)}function A0(t){if(ArrayBuffer.isView(t))return!0;if(!t||typeof t!="object")return!1;let e=t;return typeof e.byteOffset=="number"&&typeof e.byteLength=="number"&&kc(e.buffer)}function Ec(t){return qf(t)===w0}function Yf(t){return typeof SharedArrayBuffer<"u"&&qf(t)===x0}function kc(t){return Ec(t)||Yf(t)}function lu(t){return A0(t)}function hr(t){return kc(t)||lu(t)}function uu(t){if(!hr(t))throw new TypeError("Expected ArrayBuffer, SharedArrayBuffer, or ArrayBufferView")}function Xe(t){return uu(t),kc(t)?new Uint8Array(t):new Uint8Array(t.buffer,t.byteOffset,t.byteLength)}function we(t){if(uu(t),Ec(t))return t;let e=new ArrayBuffer(t.byteLength);return new Uint8Array(e).set(Xe(t)),e}function Aa(t,e,r={}){let n=Xe(t),o=Xe(e);if(!r.constantTime&&n.byteLength!==o.byteLength)return!1;let i=Math.max(n.byteLength,o.byteLength),a=n.byteLength^o.byteLength;for(let c=0;c<i;c++)a|=(n[c]??0)^(o[c]??0);return a===0}var jr={};Kt(jr,{binary:()=>S0,decode:()=>Cc,encode:()=>Sc,is:()=>Qf});function Sc(t){let e=Xe(t),r="";for(let n of e)r+=String.fromCharCode(n);return r}function Cc(t){let e=new Uint8Array(t.length);for(let r=0;r<t.length;r++)e[r]=t.charCodeAt(r)&255;return e}function Qf(t){return typeof t=="string"}var S0={encode:Sc,decode:Cc,is:Qf};var Ge={};Kt(Ge,{decode:()=>pu,encode:()=>du,format:()=>nh,formats:()=>oh,hex:()=>D0,is:()=>th,normalize:()=>Ea,parse:()=>rh});var C0=/^[0-9a-f]$/i,T0=[" ","	",`
`,"\r",":","-","."];function I0(t){return t.separators==="none"?[]:!t.separators||t.separators==="common"?T0:t.separators}function _0(t){if(!t)throw new TypeError("Hex separators must be non-empty strings")}function B0(t,e,r){for(let n of r)if(t.startsWith(n,e))return n}function R0(t){let e=/[A-F]/.test(t),r=/[a-f]/.test(t);return e&&!r?"upper":"lower"}function M0(t){let e=/\r\n|\n/.exec(t);if(e)return e[0]===`\r
`?`\r
`:`
`}function Zf(t){return t.replace(/[^0-9a-f]/gi,"")}function P0(t){let e=t.match(/[0-9A-Fa-f]+|[^0-9A-Fa-f]+/g)??[];if(e.length<3)return;let r=e.filter((a,c)=>c%2===0),n=e.filter((a,c)=>c%2===1),o=n[0];if(!o||n.some(a=>a!==o)||r.some(a=>a.length===0||a.length%2!==0))return;let i=r[0]?.length??0;if(i&&!r.slice(0,-1).some(a=>a.length!==i)&&!((r[r.length-1]?.length??0)>i))return{size:i/2,separator:o}}function N0(t){let e=t.trim(),r=/^0x/i.test(e)?"0x":"",n=r?e.slice(2):e,o=M0(n),i=n.split(/\r\n|\n/).filter(u=>u.length>0),a=i[0]?.trim()??"",c=P0(a),d={case:R0(e),prefix:r};if(c&&(d.group=c),o&&i.length>1){let u=Zf(i[0]??"").length/2;u>0&&i.slice(0,-1).every(p=>Zf(p).length/2===u)&&(d.line={bytesPerLine:u,separator:o})}return d}function O0(t,e){let r=e.allowPrefix??!0,n=[...I0(e)].sort((c,d)=>d.length-c.length);for(let c of n)_0(c);let o=t.trim();if(/^0x/i.test(o)){if(!r)throw new TypeError("Hexadecimal text must not include a 0x prefix");o=o.slice(2)}let i="",a=!1;for(let c=0;c<o.length;){let d=o[c]??"";if(C0.test(d)){i+=d,a=!1,c+=1;continue}let u=B0(o,c,n);if(!u)throw new TypeError("Input is not valid hexadecimal text");if(e.strict&&(a||i.length===0))throw new TypeError("Hexadecimal text contains misplaced separators");a=!0,c+=u.length}if(e.strict&&a&&i.length>0)throw new TypeError("Hexadecimal text must not end with a separator");if(i.length%2!==0){if(!e.allowOddLength)throw new TypeError("Hexadecimal text must contain an even number of characters");i=`0${i}`}return i.toLowerCase()}function eh(t,e){if(!e)return t.join("");if(!Number.isInteger(e.size)||e.size<1)throw new RangeError("Hex group size must be a positive integer");let r=[];for(let n=0;n<t.length;n+=e.size)r.push(t.slice(n,n+e.size).join(""));return r.join(e.separator)}function Ea(t,e={}){return O0(t,e)}function th(t,e={}){if(typeof t!="string")return!1;try{return Ea(t,e),!0}catch{return!1}}function du(t,e={}){let r=Xe(t),n=e.case??"lower",o=Array.from(r,a=>{let c=a.toString(16).padStart(2,"0");return n==="upper"?c.toUpperCase():c}),i="";if(e.line){let a=e.line.bytesPerLine;if(!Number.isInteger(a)||a<1)throw new RangeError("Hex bytesPerLine must be a positive integer");let c=e.line.separator??`
`,d=[];for(let u=0;u<o.length;u+=a)d.push(eh(o.slice(u,u+a),e.group));i=d.join(c)}else i=eh(o,e.group);return`${e.prefix??""}${i}`}function pu(t,e={}){let r=Ea(t,e),n=new Uint8Array(r.length/2);for(let o=0;o<r.length;o+=2)n[o/2]=Number.parseInt(r.slice(o,o+2),16);return n}function rh(t,e={}){let r=Ea(t,e);return{bytes:pu(r),format:N0(t),normalized:r}}function nh(t,e){return du(t,e)}var oh={compact:Object.freeze({}),upper:Object.freeze({case:"upper"}),colon:Object.freeze({group:{size:1,separator:":"}}),colonUpper:Object.freeze({case:"upper",group:{size:1,separator:":"}}),groupsOf4:Object.freeze({group:{size:4,separator:" "}}),prefixed:Object.freeze({prefix:"0x"})},D0={encode:du,decode:pu,format:nh,formats:oh,is:th,normalize:Ea,parse:rh};var pn={};Kt(pn,{decode:()=>ah,encode:()=>ih,utf8:()=>L0});function ih(t){return new TextEncoder().encode(t)}function ah(t){return new TextDecoder("utf-8",{fatal:!1}).decode(Xe(t))}var L0={encode:ih,decode:ah};var mr={};Kt(mr,{decode:()=>ch,encode:()=>sh,utf16:()=>j0});function sh(t,e={}){let r=new ArrayBuffer(t.length*2),n=new DataView(r);for(let o=0;o<t.length;o++)n.setUint16(o*2,t.charCodeAt(o),e.littleEndian??!1);return new Uint8Array(r)}function ch(t,e={}){let r=we(t),n=new DataView(r),o="";for(let i=0;i<r.byteLength;i+=2)o+=String.fromCharCode(n.getUint16(i,e.littleEndian??!1));return o}var j0={encode:sh,decode:ch};var Bt={};Kt(Bt,{base64:()=>fn,decode:()=>ph,encode:()=>dh,is:()=>fu,normalize:()=>Tc,pad:()=>uh});var H0=/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;function lh(){return globalThis.Buffer}function Tc(t){return t.replace(/[\n\r\t ]/g,"")}function uh(t){let e=t.length%4;return e?t+"=".repeat(4-e):t}function fu(t){if(typeof t!="string")return!1;let e=Tc(t);return e===""||H0.test(e)}function dh(t,e){let r=Xe(t),n=lh();return n?n.from(r).toString("base64"):btoa(Sc(r))}function ph(t,e){let r=Tc(t);if(!fu(r))throw new TypeError("Input is not valid Base64 text");let n=lh();return n?new Uint8Array(n.from(r,"base64")):Cc(atob(r))}var fn={encode:dh,decode:ph,is:fu,normalize:Tc,pad:uh};var qt={};Kt(qt,{base64url:()=>$0,decode:()=>hh,encode:()=>fh,is:()=>hu,normalize:()=>Ic});var U0=/^[A-Za-z0-9_-]*$/;function Ic(t){return t.replace(/[\n\r\t ]/g,"")}function hu(t){return typeof t=="string"&&U0.test(Ic(t))}function fh(t,e){return fn.encode(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/g,"")}function hh(t,e){let r=Ic(t);if(!hu(r))throw new TypeError("Input is not valid Base64Url text");return fn.decode(fn.pad(r.replace(/-/g,"+").replace(/_/g,"/")))}var $0={encode:fh,decode:hh,is:hu,normalize:Ic};var G0=/^[A-Z0-9][A-Z0-9 ._-]*[A-Z0-9]$/i,mh=/-----BEGIN ([^-]+)-----([\s\S]*?)-----END \1-----/g;function gh(t){if(!G0.test(t))throw new TypeError(`Invalid PEM label '${t}'`)}function V0(t,e){let r=[];for(let n=0;n<t.length;n+=e)r.push(t.slice(n,n+e));return r}function K0(t){let r=t.trim().replace(/\r\n/g,`
`).split(`
`).map(i=>i.trim()).filter(Boolean),n={},o=0;for(;o<r.length;o++){let i=r[o],a=i.indexOf(":");if(a<=0)break;n[i.slice(0,a).trim()]=i.slice(a+1).trim()}return{headers:Object.keys(n).length?n:void 0,base64Lines:r.slice(o),base64Text:r.slice(o).join("")}}function W0(t){return/\r\n/.test(t)?`\r
`:`
`}function yh(t,e={}){let r=[],n=e.label,o;for(mh.lastIndex=0;o=mh.exec(t);){let i=o[1].trim();if(n&&i!==n)continue;gh(i);let a=K0(o[2]);r.push({label:i,data:fn.decode(a.base64Text),headers:a.headers,lineLength:a.base64Lines[0]?.length??64,newline:W0(o[0])})}if(e.strict&&r.length===0)throw new TypeError(n?`No PEM block with label '${n}' was found`:"No PEM blocks were found");return r}function _c(t,e,r={}){gh(t);let n=r.lineLength??64;if(!Number.isInteger(n)||n<1)throw new RangeError("PEM lineLength must be a positive integer");let o=r.newline??`
`,i=[`-----BEGIN ${t}-----`];if(r.headers){for(let[a,c]of Object.entries(r.headers))i.push(`${a}: ${c}`);i.push("")}return i.push(...V0(fn.encode(e),n)),i.push(`-----END ${t}-----`),`${i.join(o)}${o}`}function bh(t,e={}){return yh(t,e).map(({lineLength:r,newline:n,...o})=>o)}function vh(t,e){let[r]=bh(t,{label:e,strict:!0});return r.data}function wh(t,e={}){let[r]=yh(t,{...e,strict:!0}),n={label:r.label,headers:r.headers,lineLength:r.lineLength,newline:r.newline};return{bytes:r.data,format:n,normalized:_c(r.label,r.data,n)}}function xh(t,e){return _c(e.label,t,e)}var ka={name:"pem",encode:(t,e)=>{if(!e?.label)throw new TypeError("PEM label is required");return _c(e.label,t,e)},decode:(t,e)=>vh(t,e?.label),format:xh,is:t=>typeof t=="string"&&/-----BEGIN [^-]+-----/.test(t),parse:wh};function gr(t){return t.trim().toLowerCase()}function z0(t){return t instanceof Error?t:new Error(String(t))}function Ah(t,e,r){for(let n of[r.name,...r.aliases??[]])t.delete(gr(n));e.delete(gr(r.name))}function mu(t,e,r){let n=t[r];if(typeof n!="function")throw new Error(`Converter '${e}' does not support ${r}()`);return n}function F0(t,e,r){let n=gr(r.name||t),o=e.trim();if(!o)return 0;let i=!1;r.is&&(i=r.is(e));let a=!1;try{r.decode(e),a=!0}catch{a=!1}if(!i&&!a)return 0;switch(n){case"pem":return/-----BEGIN [^-]+-----/.test(e)?1:0;case"hex":{let c=o.replace(/^0x/i,"").replace(/[\s:.-]/g,"");return!c||/[^0-9a-f]/i.test(c)||c.length%2!==0?0:/^0x/i.test(o)||/[:\s.-]/.test(o)?.95:/[a-f]/.test(o)||/[A-F]/.test(o)?.8:.45}case"base64url":return/[-_]/.test(o)?.95:/=/.test(o)?.1:.6;case"base64":return/[+/=]/.test(o)?.9:.55;case"binary":case"utf8":case"utf16be":case"utf16le":return 0;default:return i&&a?.75:.5}}function gu(t=[]){let e=new Map,r=new Set,n={register(o,i={}){if(!o.name||!gr(o.name))throw new TypeError("Converter name is required");let a=[...new Set([o.name,...o.aliases??[]].map(gr))],c=new Set;for(let d of a){let u=e.get(d);if(u){if(!i.override)throw new Error(`Converter '${d}' is already registered`);c.add(u)}}for(let d of c)Ah(e,r,d);for(let d of a)e.set(d,o);return r.add(gr(o.name)),this},unregister(o){let i=e.get(gr(o));return i?(Ah(e,r,i),!0):!1},has(o){return e.has(gr(o))},get(o){let i=e.get(gr(o));if(!i)throw new Error(`Converter '${o}' is not registered`);return i},list(){return[...r].map(o=>this.get(o))},encode(o,i,a){return this.get(o).encode(i,a)},decode(o,i,a){return this.get(o).decode(i,a)},tryDecode(o,i,a){try{return{ok:!0,bytes:this.decode(o,i,a)}}catch(c){return{ok:!1,error:z0(c)}}},normalize(o,i,a){let c=this.get(o);return mu(c,o,"normalize").call(c,i,a)},parse(o,i,a){let c=this.get(o);return mu(c,o,"parse").call(c,i,a)},format(o,i,a){let c=this.get(o);return mu(c,o,"format").call(c,i,a)},transcode(o,i){let a=this.decode(i.from,o,i.fromOptions);return this.encode(i.to,a,i.toOptions)},detect(o,i={}){let a=i.formats?.length?i.formats.map(d=>String(d)):this.list().map(d=>d.name).filter(d=>!["binary","utf8","utf16be","utf16le"].includes(gr(d))),c=new Map;for(let d of a){let u=this.get(d),p=F0(d,o,u);if(p<=0)continue;let h=u.name,m=c.get(h);(!m||p>m.confidence)&&c.set(h,{format:h,confidence:p})}return[...c.values()].sort((d,u)=>u.confidence-d.confidence)}};for(let o of t)n.register(o);return n}var Eh={name:"binary",aliases:["latin1"],encode:jr.encode,decode:jr.decode,is:jr.is},kh={name:"hex",encode:Ge.encode,decode:Ge.decode,format:Ge.format,is:Ge.is,normalize:Ge.normalize,parse:Ge.parse},Sh={name:"base64",aliases:["b64"],encode:Bt.encode,decode:Bt.decode,is:Bt.is,normalize:Bt.normalize},Ch={name:"base64url",aliases:["base64-url","b64url"],encode:qt.encode,decode:qt.decode,is:qt.is,normalize:qt.normalize},Th={name:"utf8",aliases:["utf-8"],encode:t=>pn.decode(t),decode:t=>pn.encode(t),is:t=>typeof t=="string"},Ih={name:"utf16be",aliases:["utf16","utf-16","utf-16be"],encode:t=>mr.decode(t),decode:t=>mr.encode(t),is:t=>typeof t=="string"},_h={name:"utf16le",aliases:["utf-16le","ucs2","usc2"],encode:t=>mr.decode(t,{littleEndian:!0}),decode:t=>mr.encode(t,{littleEndian:!0}),is:t=>typeof t=="string"},Bh=[Eh,kh,Sh,Ch,Th,Ih,_h,ka],yr=gu(Bh);function yu(t,e,...r){return yr.encode(t,e,...r)}function bu(t,e,...r){return yr.decode(t,e,...r)}function q0(t,e,...r){return yr.tryDecode(t,e,...r)}function Y0(t,e,...r){return yr.normalize(t,e,...r)}function J0(t,e,...r){return yr.parse(t,e,...r)}function X0(t,e,r){return yr.format(t,e,r)}function Q0(t,e){return yr.transcode(t,e)}function Z0(t,e){return yr.detect(t,e)}function ev(t){return t.toLowerCase()}var Rh={encode:yu,decode:bu,tryDecode:q0,normalize:Y0,parse:J0,format:X0,transcode:Q0,detect:Z0,to(t,e,...r){return yu(t,e,...r)},from(t,e,...r){return bu(t,e,...r)},toString(t,e="utf8"){return yu(e,t)},fromString(t,e="utf8"){return ev(e)==="hex"?we(Ge.decode(t,{allowOddLength:!0})):we(bu(e,t))},toBase64:Bt.encode,fromBase64:t=>we(Bt.decode(t)),toBase64Url:qt.encode,fromBase64Url:t=>we(qt.decode(t)),toHex:Ge.encode,fromHex:t=>we(Ge.decode(t,{allowOddLength:!0})),toBinary:jr.encode,fromBinary:t=>we(jr.decode(t)),toUtf8String:pn.decode,fromUtf8String:t=>we(pn.encode(t)),toUtf16String:(t,e=!1)=>mr.decode(t,{littleEndian:e}),fromUtf16String:(t,e=!1)=>we(mr.encode(t,{littleEndian:e})),isHex:Ge.is,isBase64:Bt.is,isBase64Url:qt.is,formatString:Bt.normalize};var y;(function(t){t[t.Sequence=0]="Sequence",t[t.Set=1]="Set",t[t.Choice=2]="Choice"})(y||(y={}));var f;(function(t){t[t.Any=1]="Any",t[t.Boolean=2]="Boolean",t[t.OctetString=3]="OctetString",t[t.BitString=4]="BitString",t[t.Integer=5]="Integer",t[t.Enumerated=6]="Enumerated",t[t.ObjectIdentifier=7]="ObjectIdentifier",t[t.Utf8String=8]="Utf8String",t[t.BmpString=9]="BmpString",t[t.UniversalString=10]="UniversalString",t[t.NumericString=11]="NumericString",t[t.PrintableString=12]="PrintableString",t[t.TeletexString=13]="TeletexString",t[t.VideotexString=14]="VideotexString",t[t.IA5String=15]="IA5String",t[t.GraphicString=16]="GraphicString",t[t.VisibleString=17]="VisibleString",t[t.GeneralString=18]="GeneralString",t[t.CharacterString=19]="CharacterString",t[t.UTCTime=20]="UTCTime",t[t.GeneralizedTime=21]="GeneralizedTime",t[t.DATE=22]="DATE",t[t.TimeOfDay=23]="TimeOfDay",t[t.DateTime=24]="DateTime",t[t.Duration=25]="Duration",t[t.TIME=26]="TIME",t[t.Null=27]="Null",t[t.RelativeObjectIdentifier=28]="RelativeObjectIdentifier"})(f||(f={}));var Rt=class{unusedBits=0;value=new ArrayBuffer(0);constructor(e,r=0){if(e)if(typeof e=="number")this.fromNumber(e);else if(hr(e))this.unusedBits=r,this.value=we(e);else throw TypeError("Unsupported type of 'params' argument for BitString")}fromASN(e){if(!(e instanceof Ft))throw new TypeError("Argument 'asn' is not instance of ASN.1 BitString");return this.unusedBits=e.valueBlock.unusedBits,this.value=we(e.valueBlock.valueHex),this}toASN(){return new Ft({unusedBits:this.unusedBits,valueHex:this.value})}toSchema(e){return new Ft({name:e})}toNumber(){let e="",r=new Uint8Array(this.value);for(let n of r)e+=n.toString(2).padStart(8,"0");return e=e.split("").reverse().join(""),this.unusedBits&&(e=e.slice(this.unusedBits).padStart(this.unusedBits,"0")),parseInt(e,2)}fromNumber(e){let r=e.toString(2),n=r.length+7>>3;this.unusedBits=(n<<3)-r.length;let o=new Uint8Array(n);r=r.padStart(n<<3,"0").split("").reverse().join("");let i=0;for(;i<n;)o[i]=parseInt(r.slice(i<<3,(i<<3)+8),2),i++;this.value=o.buffer}};var D=class{buffer;get byteLength(){return this.buffer.byteLength}get byteOffset(){return 0}constructor(e){typeof e=="number"?this.buffer=new ArrayBuffer(e):hr(e)?this.buffer=we(e):Array.isArray(e)?this.buffer=new Uint8Array(e).buffer:this.buffer=new ArrayBuffer(0)}fromASN(e){if(!(e instanceof zt))throw new TypeError("Argument 'asn' is not instance of ASN.1 OctetString");return this.buffer=we(e.valueBlock.valueHex),this}toASN(){return new zt({valueHex:this.buffer})}toSchema(e){return new zt({name:e})}};var tv={fromASN:t=>t instanceof Wt?null:we(t.valueBeforeDecodeView),toASN:t=>{if(t===null)return new Wt;let e=Lr(t,{maxDepth:1/0,maxNodes:1/0,maxContentLength:1/0});if(e.result.error)throw new Error(e.result.error);return e.result}},rv={fromASN:t=>t.valueBlock.valueHexView.byteLength>=4?t.valueBlock.toString():t.valueBlock.valueDec,toASN:t=>new Or({value:+t})},nv={fromASN:t=>t.valueBlock.valueDec,toASN:t=>new Xn({value:t})},de={fromASN:t=>we(t.valueBlock.valueHexView),toASN:t=>new Or({valueHex:t})};var ov={fromASN:t=>we(t.valueBlock.valueHexView),toASN:t=>new Ft({valueHex:t})},iv={fromASN:t=>t.valueBlock.toString(),toASN:t=>new Qn({value:t})},av={fromASN:t=>t.valueBlock.toString(),toASN:t=>new Zn({value:t})},sv={fromASN:t=>t.valueBlock.value,toASN:t=>new Jn({value:t})},ci={fromASN:t=>we(t.valueBlock.valueHexView),toASN:t=>new zt({valueHex:t})},Mh={fromASN:t=>new D(t.getValue()),toASN:t=>t.toASN()};function Mt(t){return{fromASN:e=>e.valueBlock.value,toASN:e=>new t({value:e})}}var vu=Mt(_t),cv=Mt(eo),lv=Mt(to),uv=Mt(ro),dv=Mt(no),pv=Mt(oo),fv=Mt(io),hv=Mt(ao),mv=Mt(so),gv=Mt(un),yv=Mt(co),bv=Mt(lo),vv={fromASN:t=>t.toDate(),toASN:t=>new dn({valueDate:t})},wv={fromASN:t=>t.toDate(),toASN:t=>new uo({valueDate:t})},xv={fromASN:()=>null,toASN:()=>new Wt};function hn(t){switch(t){case f.Any:return tv;case f.BitString:return ov;case f.BmpString:return cv;case f.Boolean:return sv;case f.CharacterString:return bv;case f.Enumerated:return nv;case f.GeneralString:return yv;case f.GeneralizedTime:return wv;case f.GraphicString:return mv;case f.IA5String:return hv;case f.Integer:return rv;case f.Null:return xv;case f.NumericString:return uv;case f.ObjectIdentifier:return iv;case f.RelativeObjectIdentifier:return av;case f.OctetString:return ci;case f.PrintableString:return dv;case f.TeletexString:return pv;case f.UTCTime:return vv;case f.UniversalString:return lv;case f.Utf8String:return vu;case f.VideotexString:return fv;case f.VisibleString:return gv;default:return null}}function Pt(t){return typeof t=="function"&&t.prototype?t.prototype.toASN&&t.prototype.fromASN?!0:Pt(t.prototype):!!(t&&typeof t=="object"&&"toASN"in t&&"fromASN"in t)}function xu(t){if(t){let e=Object.getPrototypeOf(t);return e?.prototype?.constructor===Array?!0:xu(e)}return!1}function Ph(t,e){if(!(t&&e)||t.byteLength!==e.byteLength)return!1;let r=new Uint8Array(t),n=new Uint8Array(e);for(let o=0;o<t.byteLength;o++)if(r[o]!==n[o])return!1;return!0}var Bc=class{items=new WeakMap;has(e){return this.items.has(e)}get(e,r=!1){let n=this.items.get(e);if(!n)throw new Error(`Cannot get schema for '${e.prototype.constructor.name}' target`);if(r&&!n.schema)throw new Error(`Schema '${e.prototype.constructor.name}' doesn't contain ASN.1 schema. Call 'AsnSchemaStorage.cache'.`);return n}cache(e){let r=this.get(e);r.schema||(r.schema=this.create(e,!0))}createDefault(e){let r={type:y.Sequence,items:{}},n=this.findParentSchema(e);return n&&(Object.assign(r,n),r.items=Object.assign({},r.items,n.items)),r}create(e,r){let n=this.items.get(e)||this.createDefault(e),o=[];for(let i in n.items){let a=n.items[i],c=r?i:"",d;if(typeof a.type=="number"){let p=f[a.type],h=fr[p];if(!h)throw new Error(`Cannot get ASN1 class by name '${p}'`);d=new h({name:c})}else Pt(a.type)?d=new a.type().toSchema(c):a.optional?this.get(a.type).type===y.Choice?d=new ur({name:c}):(d=this.create(a.type,!1),d.name=c):d=new ur({name:c});let u=!!a.optional||a.defaultValue!==void 0;if(a.repeated){d.name="";let p=a.repeated==="set"?rt:Je;d=new p({name:"",value:[new po({name:c,value:d})]})}if(a.context!==null&&a.context!==void 0)if(a.implicit)if(typeof a.type=="number"||Pt(a.type)){let p=a.repeated?Oe:Nr;o.push(new p({name:c,optional:u,idBlock:{tagClass:3,tagNumber:a.context}}))}else{this.cache(a.type);let p=!!a.repeated,h=p?d:this.get(a.type,!0).schema;h="valueBlock"in h?h.valueBlock.value:h.value,o.push(new Oe({name:p?"":c,optional:u,idBlock:{tagClass:3,tagNumber:a.context},value:h}))}else o.push(new Oe({optional:u,idBlock:{tagClass:3,tagNumber:a.context},value:[d]}));else d.optional=u,o.push(d)}switch(n.type){case y.Sequence:return new Je({value:o,name:""});case y.Set:return new rt({value:o,name:""});case y.Choice:return new si({value:o,name:""});default:throw new Error("Unsupported ASN1 type in use")}}set(e,r){return this.items.set(e,r),this}findParentSchema(e){let r=Object.getPrototypeOf(e);return r?this.items.get(r)||this.findParentSchema(r):null}};var De=new Bc;var w=t=>e=>{let r;De.has(e)?r=De.get(e):(r=De.createDefault(e),De.set(e,r)),Object.assign(r,t)};var l=t=>(e,r)=>{let n;De.has(e.constructor)?n=De.get(e.constructor):(n=De.createDefault(e.constructor),De.set(e.constructor,n));let o=Object.assign({},t);if(typeof o.type=="number"&&!o.converter){let i=hn(t.type);if(!i)throw new Error(`Cannot get default converter for property '${r}' of ${e.constructor.name}`);o.converter=i}o.raw=t.raw,n.items[r]=o};var mn=class extends Error{schemas=[]};var ke=class{static parse(e,r,n){let o=Lr(we(e),n?.berOptions);if(o.result.error)throw new Error(o.result.error);return this.fromASN(o.result,r,n)}static fromASN(e,r,n){try{if(Pt(r))return new r().fromASN(e);let o=De.get(r);De.cache(r);let i=o.schema,a=this.handleChoiceTypes(e,o,r,i,n);if(a?.result)return a.result;a?.targetSchema&&(i=a.targetSchema);let c=this.handleSequenceTypes(e,o,r,i),d=new r;return xu(r)?this.handleArrayTypes(e,o,r,n):(this.processSchemaItems(o,c,d,n),d)}catch(o){throw o instanceof mn&&o.schemas.push(r.name),o}}static handleChoiceTypes(e,r,n,o,i){if(e.constructor===Oe&&r.type===y.Choice&&e.idBlock.tagClass===3)for(let a in r.items){let c=r.items[a];if(c.context===e.idBlock.tagNumber&&c.implicit&&typeof c.type=="function"&&De.has(c.type)){let d=De.get(c.type);if(d&&d.type===y.Sequence){let u=new Je;if("value"in e.valueBlock&&Array.isArray(e.valueBlock.value)&&"value"in u.valueBlock){u.valueBlock.value=e.valueBlock.value;let p=this.fromASN(u,c.type,i),h=new n;return h[a]=p,{result:h}}}}}else if(e.constructor===Oe&&r.type!==y.Choice){let a=new Oe({idBlock:{tagClass:3,tagNumber:e.idBlock.tagNumber},value:r.schema.valueBlock.value});for(let c in r.items)delete e[c];return{targetSchema:a}}return null}static handleSequenceTypes(e,r,n,o){if(r.type===y.Sequence){let i=Mr({},e,o);if(!i.verified)throw new mn(`Data does not match to ${n.name} ASN1 schema.${i.result.error?` ${i.result.error}`:""}`);return i}else{let i=Mr({},e,o);if(!i.verified)throw new mn(`Data does not match to ${n.name} ASN1 schema.${i.result.error?` ${i.result.error}`:""}`);return i}}static processRepeatedField(e,r,n){let o=e.slice(r);if(o.length===1&&o[0].constructor.name==="Sequence"){let i=o[0];i.valueBlock&&i.valueBlock.value&&Array.isArray(i.valueBlock.value)&&(o=i.valueBlock.value)}if(typeof n.type=="number"){let i=hn(n.type);if(!i)throw new Error(`No converter for ASN.1 type ${n.type}`);return o.filter(a=>a&&a.valueBlock).map(a=>{try{return i.fromASN(a)}catch{return}}).filter(a=>a!==void 0)}else return o.filter(i=>i&&i.valueBlock).map(i=>{try{return this.fromASN(i,n.type)}catch{return}}).filter(i=>i!==void 0)}static processPrimitiveField(e,r){let n=hn(r.type);if(!n)throw new Error(`No converter for ASN.1 type ${r.type}`);return n.fromASN(e)}static isOptionalChoiceField(e){return e.optional&&typeof e.type=="function"&&De.has(e.type)&&De.get(e.type).type===y.Choice}static processOptionalChoiceField(e,r){try{return{processed:!0,value:this.fromASN(e,r.type)}}catch(n){if(n instanceof mn&&/Wrong values for Choice type/.test(n.message))return{processed:!1};throw n}}static handleArrayTypes(e,r,n,o){if(!("value"in e.valueBlock&&Array.isArray(e.valueBlock.value)))throw new Error("Cannot get items from the ASN.1 parsed value. ASN.1 object is not constructed.");let i=r.itemType;if(typeof i=="number"){let a=hn(i);if(!a)throw new Error(`Cannot get default converter for array item of ${n.name} ASN1 schema`);return n.from(e.valueBlock.value,c=>a.fromASN(c))}else return n.from(e.valueBlock.value,a=>this.fromASN(a,i,o))}static processSchemaItems(e,r,n,o){for(let i in e.items){let a=r.result[i];if(!a)continue;let c=e.items[i],d=c.type,u;typeof d=="number"||Pt(d)?u=this.processPrimitiveSchemaItem(a,c,d,o):u=this.processComplexSchemaItem(a,c,d,o),u&&typeof u=="object"&&"value"in u&&"raw"in u?(n[i]=u.value,n[`${i}Raw`]=u.raw):n[i]=u}}static processPrimitiveSchemaItem(e,r,n,o){let i=r.converter??(Pt(n)?new n:null);if(!i)throw new Error("Converter is empty");return r.repeated?this.processRepeatedPrimitiveItem(e,r,i,o):this.processSinglePrimitiveItem(e,r,n,i,o)}static processRepeatedPrimitiveItem(e,r,n,o){if(r.implicit){let i=r.repeated==="sequence"?Je:rt,a=new i;a.valueBlock=e.valueBlock;let c=Lr(a.toBER(!1),o?.berOptions);if(c.offset===-1)throw new Error(`Cannot parse the child item. ${c.result.error}`);if(!("value"in c.result.valueBlock&&Array.isArray(c.result.valueBlock.value)))throw new Error("Cannot get items from the ASN.1 parsed value. ASN.1 object is not constructed.");let d=c.result.valueBlock.value;return Array.from(d,u=>n.fromASN(u))}else return Array.from(e,i=>n.fromASN(i))}static processSinglePrimitiveItem(e,r,n,o,i){let a=e;if(r.implicit){let c;if(Pt(n))c=new n().toSchema("");else{let d=f[n],u=fr[d];if(!u)throw new Error(`Cannot get '${d}' class from asn1js module`);c=new u}c.valueBlock=a.valueBlock,a=Lr(c.toBER(!1),i?.berOptions).result}return o.fromASN(a)}static processComplexSchemaItem(e,r,n,o){if(r.repeated){if(!Array.isArray(e))throw new Error("Cannot get list of items from the ASN.1 parsed value. ASN.1 value should be iterable.");return Array.from(e,i=>this.fromASN(i,n,o))}else{let i=this.handleImplicitTagging(e,r,n);if(this.isOptionalChoiceField(r))try{return this.fromASN(i,n,o)}catch(a){if(a instanceof mn&&/Wrong values for Choice type/.test(a.message))return;throw a}else{let a=this.fromASN(i,n,o);return r.raw?{value:a,raw:e.valueBeforeDecodeView}:a}}}static handleImplicitTagging(e,r,n){if(r.implicit&&typeof r.context=="number"){let o=De.get(n);if(o.type===y.Sequence){let i=new Je;if("value"in e.valueBlock&&Array.isArray(e.valueBlock.value)&&"value"in i.valueBlock)return i.valueBlock.value=e.valueBlock.value,i}else if(o.type===y.Set){let i=new rt;if("value"in e.valueBlock&&Array.isArray(e.valueBlock.value)&&"value"in i.valueBlock)return i.valueBlock.value=e.valueBlock.value,i}}return e}};var Sa=class t{static serialize(e){return e instanceof Ne?e.toBER(!1):this.toASN(e).toBER(!1)}static toASN(e){if(e&&typeof e=="object"&&Pt(e))return e.toASN();if(!(e&&typeof e=="object"))throw new TypeError("Parameter 1 should be type of Object.");let r=e.constructor,n=De.get(r);De.cache(r);let o=[];if(n.itemType){if(!Array.isArray(e))throw new TypeError("Parameter 1 should be type of Array.");if(typeof n.itemType=="number"){let a=hn(n.itemType);if(!a)throw new Error(`Cannot get default converter for array item of ${r.name} ASN1 schema`);o=e.map(c=>a.toASN(c))}else o=e.map(a=>this.toAsnItem({type:n.itemType},"[]",r,a))}else for(let a in n.items){let c=n.items[a],d=e[a];if(d===void 0||c.defaultValue===d||typeof c.defaultValue=="object"&&typeof d=="object"&&Ph(this.serialize(c.defaultValue),this.serialize(d)))continue;let u=t.toAsnItem(c,a,r,d);if(typeof c.context=="number")if(c.implicit)if(!c.repeated&&(typeof c.type=="number"||Pt(c.type))){let p={};p.valueHex=u instanceof Wt?we(u.valueBeforeDecodeView):u.valueBlock.toBER(),o.push(new Nr({optional:c.optional,idBlock:{tagClass:3,tagNumber:c.context},...p}))}else o.push(new Oe({optional:c.optional,idBlock:{tagClass:3,tagNumber:c.context},value:u.valueBlock.value}));else o.push(new Oe({optional:c.optional,idBlock:{tagClass:3,tagNumber:c.context},value:[u]}));else c.repeated?o=o.concat(u):o.push(u)}let i;switch(n.type){case y.Sequence:i=new Je({value:o});break;case y.Set:i=new rt({value:o});break;case y.Choice:if(!o[0])throw new Error(`Schema '${r.name}' has wrong data. Choice cannot be empty.`);i=o[0];break}return i}static toAsnItem(e,r,n,o){let i;if(typeof e.type=="number"){let a=e.converter;if(!a)throw new Error(`Property '${r}' doesn't have converter for type ${f[e.type]} in schema '${n.name}'`);if(e.repeated){if(!Array.isArray(o))throw new TypeError("Parameter 'objProp' should be type of Array.");let c=Array.from(o,u=>a.toASN(u)),d=e.repeated==="sequence"?Je:rt;i=new d({value:c})}else i=a.toASN(o)}else if(e.repeated){if(!Array.isArray(o))throw new TypeError("Parameter 'objProp' should be type of Array.");let a=Array.from(o,d=>this.toASN(d)),c=e.repeated==="sequence"?Je:rt;i=new c({value:a})}else i=this.toASN(o);return i}};var G=class extends Array{constructor(e=[]){if(typeof e=="number")super(e);else{super();for(let r of e)this.push(r)}}};var O=class t{static serialize(e){return Sa.serialize(e)}static parse(e,r,n){return ke.parse(e,r,n)}static toString(e,r){let n=hr(e)?we(e):t.serialize(e),o=Lr(n,r?.berOptions);if(o.offset===-1)throw new Error(`Cannot decode ASN.1 data. ${o.result.error}`);return o.result.toString()}};function s(t,e,r,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,r):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,r,n);else for(var c=t.length-1;c>=0;c--)(a=t[c])&&(i=(o<3?a(i):o>3?a(e,r,i):a(e,r))||i);return o>3&&i&&Object.defineProperty(e,r,i),i}function $(t,e,r,n){if(r==="a"&&!n)throw new TypeError("Private accessor was defined without a getter");if(typeof e=="function"?t!==e||!n:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return r==="m"?n:r==="a"?n.call(t):n?n.value:e.get(t)}function le(t,e,r,n,o){if(n==="m")throw new TypeError("Private method is not writable");if(n==="a"&&!o)throw new TypeError("Private accessor was defined without a setter");if(typeof e=="function"?t!==e||!o:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return n==="a"?o.call(t,r):o?o.value=r:e.set(t,r),r}var Ca=class{static isIPv4(e){return/^(\d{1,3}\.){3}\d{1,3}$/.test(e)}static parseIPv4(e){let r=e.split(".");if(r.length!==4)throw new Error("Invalid IPv4 address");return r.map(n=>{let o=parseInt(n,10);if(isNaN(o)||o<0||o>255)throw new Error("Invalid IPv4 address part");return o})}static parseIPv6(e){let n=this.expandIPv6(e).split(":");if(n.length!==8)throw new Error("Invalid IPv6 address");return n.reduce((o,i)=>{let a=parseInt(i,16);if(isNaN(a)||a<0||a>65535)throw new Error("Invalid IPv6 address part");return o.push(a>>8&255),o.push(a&255),o},[])}static expandIPv6(e){if(!e.includes("::"))return e;let r=e.split("::");if(r.length>2)throw new Error("Invalid IPv6 address");let n=r[0]?r[0].split(":"):[],o=r[1]?r[1].split(":"):[],i=8-(n.length+o.length);if(i<0)throw new Error("Invalid IPv6 address");return[...n,...Array(i).fill("0"),...o].join(":")}static formatIPv6(e){let r=[];for(let n=0;n<16;n+=2)r.push((e[n]<<8|e[n+1]).toString(16));return this.compressIPv6(r.join(":"))}static compressIPv6(e){let r=e.split(":"),n=-1,o=0,i=-1,a=0;for(let c=0;c<r.length;c++)r[c]==="0"?(i===-1&&(i=c),a++):(a>o&&(n=i,o=a),i=-1,a=0);if(a>o&&(n=i,o=a),o>1){let c=r.slice(0,n).join(":"),d=r.slice(n+o).join(":");return`${c}::${d}`}return e}static parseCIDR(e){let[r,n]=e.split("/"),o=parseInt(n,10);if(this.isIPv4(r)){if(o<0||o>32)throw new Error("Invalid IPv4 prefix length");return[this.parseIPv4(r),o]}else{if(o<0||o>128)throw new Error("Invalid IPv6 prefix length");return[this.parseIPv6(r),o]}}static decodeIP(e){if(e.length===64&&parseInt(e,16)===0)return"::/0";if(e.length!==16)return e;let r=parseInt(e.slice(8),16).toString(2).split("").reduce((o,i)=>o+ +i,0),n=e.slice(0,8).replace(/(.{2})/g,o=>`${parseInt(o,16)}.`);return n=n.slice(0,-1),`${n}/${r}`}static toString(e){let r=new Uint8Array(e);if(r.length===4)return Array.from(r).join(".");if(r.length===16)return this.formatIPv6(r);if(r.length===8||r.length===32){let n=r.length/2,o=r.slice(0,n),i=r.slice(n);if(r.every(d=>d===0))return r.length===8?"0.0.0.0/0":"::/0";let c=i.reduce((d,u)=>d+(u.toString(2).match(/1/g)||[]).length,0);return r.length===8?`${Array.from(o).join(".")}/${c}`:`${this.formatIPv6(o)}/${c}`}return this.decodeIP(Ge.encode(e))}static fromString(e){if(e.includes("/")){let[n,o]=this.parseCIDR(e),i=new Uint8Array(n.length),a=o;for(let d=0;d<i.length;d++)a>=8?(i[d]=255,a-=8):a>0&&(i[d]=255<<8-a,a=0);let c=new Uint8Array(n.length*2);return c.set(n,0),c.set(i,n.length),c.buffer}let r=this.isIPv4(e)?this.parseIPv4(e):this.parseIPv6(e);return new Uint8Array(r).buffer}};var Au,Eu,ku,Le=class{teletexString;printableString;universalString;utf8String;bmpString;constructor(e={}){Object.assign(this,e)}toString(){return this.bmpString||this.printableString||this.teletexString||this.universalString||this.utf8String||""}};s([l({type:f.TeletexString})],Le.prototype,"teletexString",void 0);s([l({type:f.PrintableString})],Le.prototype,"printableString",void 0);s([l({type:f.UniversalString})],Le.prototype,"universalString",void 0);s([l({type:f.Utf8String})],Le.prototype,"utf8String",void 0);s([l({type:f.BmpString})],Le.prototype,"bmpString",void 0);Le=s([w({type:y.Choice})],Le);var li=class extends Le{ia5String;anyValue;constructor(e={}){super(e),Object.assign(this,e)}toString(){return this.ia5String||(this.anyValue?Ge.encode(this.anyValue):super.toString())}};s([l({type:f.IA5String})],li.prototype,"ia5String",void 0);s([l({type:f.Any})],li.prototype,"anyValue",void 0);li=s([w({type:y.Choice})],li);var fo=class{type="";value=new li;constructor(e={}){Object.assign(this,e)}};s([l({type:f.ObjectIdentifier})],fo.prototype,"type",void 0);s([l({type:li})],fo.prototype,"value",void 0);var gn=Au=class extends G{constructor(e){super(e),Object.setPrototypeOf(this,Au.prototype)}};gn=Au=s([w({type:y.Set,itemType:fo})],gn);var Su=Eu=class extends G{constructor(e){super(e),Object.setPrototypeOf(this,Eu.prototype)}};Su=Eu=s([w({type:y.Sequence,itemType:gn})],Su);var Ae=ku=class extends Su{constructor(e){super(e),Object.setPrototypeOf(this,ku.prototype)}};Ae=ku=s([w({type:y.Sequence})],Ae);var Av={fromASN:t=>Ca.toString(ci.fromASN(t)),toASN:t=>ci.toASN(Ca.fromString(t))},yn=class{typeId="";value=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};s([l({type:f.ObjectIdentifier})],yn.prototype,"typeId",void 0);s([l({type:f.Any,context:0})],yn.prototype,"value",void 0);var Ta=class{nameAssigner;partyName=new Le;constructor(e={}){Object.assign(this,e)}};s([l({type:Le,optional:!0,context:0,implicit:!0})],Ta.prototype,"nameAssigner",void 0);s([l({type:Le,context:1,implicit:!0})],Ta.prototype,"partyName",void 0);var re=class{otherName;rfc822Name;dNSName;x400Address;directoryName;ediPartyName;uniformResourceIdentifier;iPAddress;registeredID;constructor(e={}){Object.assign(this,e)}};s([l({type:yn,context:0,implicit:!0})],re.prototype,"otherName",void 0);s([l({type:f.IA5String,context:1,implicit:!0})],re.prototype,"rfc822Name",void 0);s([l({type:f.IA5String,context:2,implicit:!0})],re.prototype,"dNSName",void 0);s([l({type:f.Any,context:3,implicit:!0})],re.prototype,"x400Address",void 0);s([l({type:Ae,context:4,implicit:!1})],re.prototype,"directoryName",void 0);s([l({type:Ta,context:5})],re.prototype,"ediPartyName",void 0);s([l({type:f.IA5String,context:6,implicit:!0})],re.prototype,"uniformResourceIdentifier",void 0);s([l({type:f.OctetString,context:7,implicit:!0,converter:Av})],re.prototype,"iPAddress",void 0);s([l({type:f.ObjectIdentifier,context:8,implicit:!0})],re.prototype,"registeredID",void 0);re=s([w({type:y.Choice})],re);var bn="1.3.6.1.5.5.7",vn=`${bn}.1`,Nh=`${bn}.2`,ho=`${bn}.3`,Rc=`${bn}.48`,eE=`${Nh}.1`,tE=`${Nh}.2`,Cu=`${Rc}.1`,Tu=`${Rc}.2`,Iu=`${Rc}.3`,_u=`${Rc}.5`,se="2.5.29";var Bu,Mc=`${vn}.1`,Hr=class{accessMethod="";accessLocation=new re;constructor(e={}){Object.assign(this,e)}};s([l({type:f.ObjectIdentifier})],Hr.prototype,"accessMethod",void 0);s([l({type:re})],Hr.prototype,"accessLocation",void 0);var mo=Bu=class extends G{constructor(e){super(e),Object.setPrototypeOf(this,Bu.prototype)}};mo=Bu=s([w({type:y.Sequence,itemType:Hr})],mo);var Ia=`${se}.35`,go=class extends D{},br=class{keyIdentifier;authorityCertIssuer;authorityCertSerialNumber;constructor(e={}){e&&Object.assign(this,e)}};s([l({type:go,context:0,optional:!0,implicit:!0})],br.prototype,"keyIdentifier",void 0);s([l({type:re,context:1,optional:!0,implicit:!0,repeated:"sequence"})],br.prototype,"authorityCertIssuer",void 0);s([l({type:f.Integer,context:2,optional:!0,implicit:!0,converter:de})],br.prototype,"authorityCertSerialNumber",void 0);var ui=`${se}.19`,Ur=class{cA=!1;pathLenConstraint;constructor(e={}){Object.assign(this,e)}};s([l({type:f.Boolean,defaultValue:!1})],Ur.prototype,"cA",void 0);s([l({type:f.Integer,optional:!0})],Ur.prototype,"pathLenConstraint",void 0);var Ru,Se=Ru=class extends G{constructor(e){super(e),Object.setPrototypeOf(this,Ru.prototype)}};Se=Ru=s([w({type:y.Sequence,itemType:re})],Se);var Mu,Ev=`${se}.29`,Oh=Mu=class extends Se{constructor(e){super(e),Object.setPrototypeOf(this,Mu.prototype)}};Oh=Mu=s([w({type:y.Sequence})],Oh);var Pu,Nc=`${se}.32`,ME=`${Nc}.0`,$r=class{ia5String;visibleString;bmpString;utf8String;constructor(e={}){Object.assign(this,e)}toString(){return this.ia5String||this.visibleString||this.bmpString||this.utf8String||""}};s([l({type:f.IA5String})],$r.prototype,"ia5String",void 0);s([l({type:f.VisibleString})],$r.prototype,"visibleString",void 0);s([l({type:f.BmpString})],$r.prototype,"bmpString",void 0);s([l({type:f.Utf8String})],$r.prototype,"utf8String",void 0);$r=s([w({type:y.Choice})],$r);var _a=class{organization=new $r;noticeNumbers=[];constructor(e={}){Object.assign(this,e)}};s([l({type:$r})],_a.prototype,"organization",void 0);s([l({type:f.Integer,repeated:"sequence"})],_a.prototype,"noticeNumbers",void 0);var Ba=class{noticeRef;explicitText;constructor(e={}){Object.assign(this,e)}};s([l({type:_a,optional:!0})],Ba.prototype,"noticeRef",void 0);s([l({type:$r,optional:!0})],Ba.prototype,"explicitText",void 0);var Pc=class{cPSuri;userNotice;constructor(e={}){Object.assign(this,e)}};s([l({type:f.IA5String})],Pc.prototype,"cPSuri",void 0);s([l({type:Ba})],Pc.prototype,"userNotice",void 0);Pc=s([w({type:y.Choice})],Pc);var Ra=class{policyQualifierId="";qualifier=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};s([l({type:f.ObjectIdentifier})],Ra.prototype,"policyQualifierId",void 0);s([l({type:f.Any})],Ra.prototype,"qualifier",void 0);var yo=class{policyIdentifier="";policyQualifiers;constructor(e={}){Object.assign(this,e)}};s([l({type:f.ObjectIdentifier})],yo.prototype,"policyIdentifier",void 0);s([l({type:Ra,repeated:"sequence",optional:!0})],yo.prototype,"policyQualifiers",void 0);var Ma=Pu=class extends G{constructor(e){super(e),Object.setPrototypeOf(this,Pu.prototype)}};Ma=Pu=s([w({type:y.Sequence,itemType:yo})],Ma);var UE=`${se}.20`,Pa=class{value;constructor(e=0){this.value=e}};s([l({type:f.Integer})],Pa.prototype,"value",void 0);Pa=s([w({type:y.Choice})],Pa);var FE=`${se}.27`,Dh=class extends Pa{};Dh=s([w({type:y.Choice})],Dh);var Nu,Oc=`${se}.31`,Yt;(function(t){t[t.unused=1]="unused",t[t.keyCompromise=2]="keyCompromise",t[t.cACompromise=4]="cACompromise",t[t.affiliationChanged=8]="affiliationChanged",t[t.superseded=16]="superseded",t[t.cessationOfOperation=32]="cessationOfOperation",t[t.certificateHold=64]="certificateHold",t[t.privilegeWithdrawn=128]="privilegeWithdrawn",t[t.aACompromise=256]="aACompromise"})(Yt||(Yt={}));var Na=class extends Rt{toJSON(){let e=[],r=this.toNumber();return r&Yt.aACompromise&&e.push("aACompromise"),r&Yt.affiliationChanged&&e.push("affiliationChanged"),r&Yt.cACompromise&&e.push("cACompromise"),r&Yt.certificateHold&&e.push("certificateHold"),r&Yt.cessationOfOperation&&e.push("cessationOfOperation"),r&Yt.keyCompromise&&e.push("keyCompromise"),r&Yt.privilegeWithdrawn&&e.push("privilegeWithdrawn"),r&Yt.superseded&&e.push("superseded"),r&Yt.unused&&e.push("unused"),e}toString(){return`[${this.toJSON().join(", ")}]`}},Gr=class{fullName;nameRelativeToCRLIssuer;constructor(e={}){Object.assign(this,e)}};s([l({type:re,context:0,repeated:"sequence",implicit:!0})],Gr.prototype,"fullName",void 0);s([l({type:gn,context:1,implicit:!0})],Gr.prototype,"nameRelativeToCRLIssuer",void 0);Gr=s([w({type:y.Choice})],Gr);var vr=class{distributionPoint;reasons;cRLIssuer;constructor(e={}){Object.assign(this,e)}};s([l({type:Gr,context:0,optional:!0})],vr.prototype,"distributionPoint",void 0);s([l({type:Na,context:1,optional:!0,implicit:!0})],vr.prototype,"reasons",void 0);s([l({type:re,context:2,optional:!0,repeated:"sequence",implicit:!0})],vr.prototype,"cRLIssuer",void 0);var wn=Nu=class extends G{constructor(e){super(e),Object.setPrototypeOf(this,Nu.prototype)}};wn=Nu=s([w({type:y.Sequence,itemType:vr})],wn);var Ou,ck=`${se}.46`,Lh=Ou=class extends wn{constructor(e){super(e),Object.setPrototypeOf(this,Ou.prototype)}};Lh=Ou=s([w({type:y.Sequence,itemType:vr})],Lh);var mk=`${se}.28`,Nt=class t{static ONLY=!1;distributionPoint;onlyContainsUserCerts=t.ONLY;onlyContainsCACerts=t.ONLY;onlySomeReasons;indirectCRL=t.ONLY;onlyContainsAttributeCerts=t.ONLY;constructor(e={}){Object.assign(this,e)}};s([l({type:Gr,context:0,optional:!0})],Nt.prototype,"distributionPoint",void 0);s([l({type:f.Boolean,context:1,defaultValue:Nt.ONLY,implicit:!0})],Nt.prototype,"onlyContainsUserCerts",void 0);s([l({type:f.Boolean,context:2,defaultValue:Nt.ONLY,implicit:!0})],Nt.prototype,"onlyContainsCACerts",void 0);s([l({type:Na,context:3,optional:!0,implicit:!0})],Nt.prototype,"onlySomeReasons",void 0);s([l({type:f.Boolean,context:4,defaultValue:Nt.ONLY,implicit:!0})],Nt.prototype,"indirectCRL",void 0);s([l({type:f.Boolean,context:5,defaultValue:Nt.ONLY,implicit:!0})],Nt.prototype,"onlyContainsAttributeCerts",void 0);var Du=`${se}.21`,Oa;(function(t){t[t.unspecified=0]="unspecified",t[t.keyCompromise=1]="keyCompromise",t[t.cACompromise=2]="cACompromise",t[t.affiliationChanged=3]="affiliationChanged",t[t.superseded=4]="superseded",t[t.cessationOfOperation=5]="cessationOfOperation",t[t.certificateHold=6]="certificateHold",t[t.removeFromCRL=8]="removeFromCRL",t[t.privilegeWithdrawn=9]="privilegeWithdrawn",t[t.aACompromise=10]="aACompromise"})(Oa||(Oa={}));var di=class{reason=Oa.unspecified;constructor(e=Oa.unspecified){this.reason=e}toJSON(){return Oa[this.reason]}toString(){return this.toJSON()}};s([l({type:f.Enumerated})],di.prototype,"reason",void 0);di=s([w({type:y.Choice})],di);var Lu,pi=`${se}.37`,bo=Lu=class extends G{constructor(e){super(e),Object.setPrototypeOf(this,Lu.prototype)}};bo=Lu=s([w({type:y.Sequence,itemType:f.ObjectIdentifier})],bo);var Ck=`${pi}.0`,jh=`${ho}.1`,Hh=`${ho}.2`,Uh=`${ho}.3`,$h=`${ho}.4`,Gh=`${ho}.8`,Vh=`${ho}.9`;var Rk=`${se}.54`,ju=class{value;constructor(e=new ArrayBuffer(0)){this.value=e}};s([l({type:f.Integer,converter:de})],ju.prototype,"value",void 0);ju=s([w({type:y.Choice})],ju);var Hu=`${se}.24`,fi=class{value=new Date;constructor(e){e&&(this.value=e)}};s([l({type:f.GeneralizedTime})],fi.prototype,"value",void 0);fi=s([w({type:y.Choice})],fi);var Uu,$u=`${se}.18`,Kh=Uu=class extends Se{constructor(e){super(e),Object.setPrototypeOf(this,Uu.prototype)}};Kh=Uu=s([w({type:y.Sequence})],Kh);var Dc=`${se}.15`,Jt;(function(t){t[t.digitalSignature=1]="digitalSignature",t[t.nonRepudiation=2]="nonRepudiation",t[t.keyEncipherment=4]="keyEncipherment",t[t.dataEncipherment=8]="dataEncipherment",t[t.keyAgreement=16]="keyAgreement",t[t.keyCertSign=32]="keyCertSign",t[t.cRLSign=64]="cRLSign",t[t.encipherOnly=128]="encipherOnly",t[t.decipherOnly=256]="decipherOnly"})(Jt||(Jt={}));var hi=class extends Rt{toJSON(){let e=this.toNumber(),r=[];return e&Jt.cRLSign&&r.push("crlSign"),e&Jt.dataEncipherment&&r.push("dataEncipherment"),e&Jt.decipherOnly&&r.push("decipherOnly"),e&Jt.digitalSignature&&r.push("digitalSignature"),e&Jt.encipherOnly&&r.push("encipherOnly"),e&Jt.keyAgreement&&r.push("keyAgreement"),e&Jt.keyCertSign&&r.push("keyCertSign"),e&Jt.keyEncipherment&&r.push("keyEncipherment"),e&Jt.nonRepudiation&&r.push("nonRepudiation"),r}toString(){return`[${this.toJSON().join(", ")}]`}};var Gu,Qk=`${se}.30`,mi=class{base=new re;minimum=0;maximum;constructor(e={}){Object.assign(this,e)}};s([l({type:re})],mi.prototype,"base",void 0);s([l({type:f.Integer,context:0,defaultValue:0,implicit:!0})],mi.prototype,"minimum",void 0);s([l({type:f.Integer,context:1,optional:!0,implicit:!0})],mi.prototype,"maximum",void 0);var Lc=Gu=class extends G{constructor(e){super(e),Object.setPrototypeOf(this,Gu.prototype)}};Lc=Gu=s([w({type:y.Sequence,itemType:mi})],Lc);var jc=class{permittedSubtrees;excludedSubtrees;constructor(e={}){Object.assign(this,e)}};s([l({type:Lc,context:0,optional:!0,implicit:!0})],jc.prototype,"permittedSubtrees",void 0);s([l({type:Lc,context:1,optional:!0,implicit:!0})],jc.prototype,"excludedSubtrees",void 0);var oS=`${se}.36`,Hc=class{requireExplicitPolicy;inhibitPolicyMapping;constructor(e={}){Object.assign(this,e)}};s([l({type:f.Integer,context:0,implicit:!0,optional:!0,converter:de})],Hc.prototype,"requireExplicitPolicy",void 0);s([l({type:f.Integer,context:1,implicit:!0,optional:!0,converter:de})],Hc.prototype,"inhibitPolicyMapping",void 0);var Vu,lS=`${se}.33`,Da=class{issuerDomainPolicy="";subjectDomainPolicy="";constructor(e={}){Object.assign(this,e)}};s([l({type:f.ObjectIdentifier})],Da.prototype,"issuerDomainPolicy",void 0);s([l({type:f.ObjectIdentifier})],Da.prototype,"subjectDomainPolicy",void 0);var Wh=Vu=class extends G{constructor(e){super(e),Object.setPrototypeOf(this,Vu.prototype)}};Wh=Vu=s([w({type:y.Sequence,itemType:Da})],Wh);var Ku,yi=`${se}.17`,gi=Ku=class extends Se{constructor(e){super(e),Object.setPrototypeOf(this,Ku.prototype)}};gi=Ku=s([w({type:y.Sequence})],gi);var We=class{type="";values=[];constructor(e={}){Object.assign(this,e)}};s([l({type:f.ObjectIdentifier})],We.prototype,"type",void 0);s([l({type:f.Any,repeated:"set"})],We.prototype,"values",void 0);var Wu,SS=`${se}.9`,zh=Wu=class extends G{constructor(e){super(e),Object.setPrototypeOf(this,Wu.prototype)}};zh=Wu=s([w({type:y.Sequence,itemType:We})],zh);var Uc=`${se}.14`,dt=class extends go{};var NS=`${se}.16`,$c=class{notBefore;notAfter;constructor(e={}){Object.assign(this,e)}};s([l({type:f.GeneralizedTime,context:0,implicit:!0,optional:!0})],$c.prototype,"notBefore",void 0);s([l({type:f.GeneralizedTime,context:1,implicit:!0,optional:!0})],$c.prototype,"notAfter",void 0);var La;(function(t){t[t.keyUpdateAllowed=1]="keyUpdateAllowed",t[t.newExtensions=2]="newExtensions",t[t.pKIXCertificate=4]="pKIXCertificate"})(La||(La={}));var Gc=class extends Rt{toJSON(){let e=[],r=this.toNumber();return r&La.pKIXCertificate&&e.push("pKIXCertificate"),r&La.newExtensions&&e.push("newExtensions"),r&La.keyUpdateAllowed&&e.push("keyUpdateAllowed"),e}toString(){return`[${this.toJSON().join(", ")}]`}},Vc=class{entrustVers="";entrustInfoFlags=new Gc;constructor(e={}){Object.assign(this,e)}};s([l({type:f.GeneralString})],Vc.prototype,"entrustVers",void 0);s([l({type:Gc})],Vc.prototype,"entrustInfoFlags",void 0);var zu,VS=`${vn}.11`,Fh=zu=class extends G{constructor(e){super(e),Object.setPrototypeOf(this,zu.prototype)}};Fh=zu=s([w({type:y.Sequence,itemType:Hr})],Fh);var P=class t{algorithm="";parameters;constructor(e={}){Object.assign(this,e)}isEqual(e){return e instanceof t&&e.algorithm==this.algorithm&&(e.parameters&&this.parameters&&Aa(e.parameters,this.parameters)||e.parameters===this.parameters)}};s([l({type:f.ObjectIdentifier})],P.prototype,"algorithm",void 0);s([l({type:f.Any,optional:!0})],P.prototype,"parameters",void 0);var Ve=class{algorithm=new P;subjectPublicKey=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};s([l({type:P})],Ve.prototype,"algorithm",void 0);s([l({type:f.BitString})],Ve.prototype,"subjectPublicKey",void 0);var Ie=class{utcTime;generalTime;constructor(e){if(e)if(typeof e=="string"||typeof e=="number"||e instanceof Date){let r=new Date(e);r.setMilliseconds(0),r.getUTCFullYear()>2049?this.generalTime=r:this.utcTime=r}else Object.assign(this,e)}getTime(){let e=this.utcTime||this.generalTime;if(!e)throw new Error("Cannot get time from CHOICE object");return e}};s([l({type:f.UTCTime})],Ie.prototype,"utcTime",void 0);s([l({type:f.GeneralizedTime})],Ie.prototype,"generalTime",void 0);Ie=s([w({type:y.Choice})],Ie);var xn=class{notBefore=new Ie(new Date);notAfter=new Ie(new Date);constructor(e){e&&(this.notBefore=new Ie(e.notBefore),this.notAfter=new Ie(e.notAfter))}};s([l({type:Ie})],xn.prototype,"notBefore",void 0);s([l({type:Ie})],xn.prototype,"notAfter",void 0);var Fu,ot=class t{static CRITICAL=!1;extnID="";critical=t.CRITICAL;extnValue=new D;constructor(e={}){Object.assign(this,e)}};s([l({type:f.ObjectIdentifier})],ot.prototype,"extnID",void 0);s([l({type:f.Boolean,defaultValue:ot.CRITICAL})],ot.prototype,"critical",void 0);s([l({type:D})],ot.prototype,"extnValue",void 0);var Ot=Fu=class extends G{constructor(e){super(e),Object.setPrototypeOf(this,Fu.prototype)}};Ot=Fu=s([w({type:y.Sequence,itemType:ot})],Ot);var Vr;(function(t){t[t.v1=0]="v1",t[t.v2=1]="v2",t[t.v3=2]="v3"})(Vr||(Vr={}));var Qe=class{version=Vr.v1;serialNumber=new ArrayBuffer(0);signature=new P;issuer=new Ae;validity=new xn;subject=new Ae;subjectPublicKeyInfo=new Ve;issuerUniqueID;subjectUniqueID;extensions;constructor(e={}){Object.assign(this,e)}};s([l({type:f.Integer,context:0,defaultValue:Vr.v1})],Qe.prototype,"version",void 0);s([l({type:f.Integer,converter:de})],Qe.prototype,"serialNumber",void 0);s([l({type:P})],Qe.prototype,"signature",void 0);s([l({type:Ae})],Qe.prototype,"issuer",void 0);s([l({type:xn})],Qe.prototype,"validity",void 0);s([l({type:Ae})],Qe.prototype,"subject",void 0);s([l({type:Ve})],Qe.prototype,"subjectPublicKeyInfo",void 0);s([l({type:f.BitString,context:1,implicit:!0,optional:!0})],Qe.prototype,"issuerUniqueID",void 0);s([l({type:f.BitString,context:2,implicit:!0,optional:!0})],Qe.prototype,"subjectUniqueID",void 0);s([l({type:Ot,context:3,optional:!0})],Qe.prototype,"extensions",void 0);var Be=class{tbsCertificate=new Qe;tbsCertificateRaw;signatureAlgorithm=new P;signatureValue=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};s([l({type:Qe,raw:!0})],Be.prototype,"tbsCertificate",void 0);s([l({type:P})],Be.prototype,"signatureAlgorithm",void 0);s([l({type:f.BitString})],Be.prototype,"signatureValue",void 0);var Xt=class{userCertificate=new ArrayBuffer(0);revocationDate=new Ie;crlEntryExtensions;constructor(e={}){Object.assign(this,e)}};s([l({type:f.Integer,converter:de})],Xt.prototype,"userCertificate",void 0);s([l({type:Ie})],Xt.prototype,"revocationDate",void 0);s([l({type:ot,optional:!0,repeated:"sequence"})],Xt.prototype,"crlEntryExtensions",void 0);var vt=class{version;signature=new P;issuer=new Ae;thisUpdate=new Ie;nextUpdate;revokedCertificates;crlExtensions;constructor(e={}){Object.assign(this,e)}};s([l({type:f.Integer,optional:!0})],vt.prototype,"version",void 0);s([l({type:P})],vt.prototype,"signature",void 0);s([l({type:Ae})],vt.prototype,"issuer",void 0);s([l({type:Ie})],vt.prototype,"thisUpdate",void 0);s([l({type:Ie,optional:!0})],vt.prototype,"nextUpdate",void 0);s([l({type:Xt,repeated:"sequence",optional:!0})],vt.prototype,"revokedCertificates",void 0);s([l({type:ot,optional:!0,context:0,repeated:"sequence"})],vt.prototype,"crlExtensions",void 0);var An=class{tbsCertList=new vt;tbsCertListRaw;signatureAlgorithm=new P;signature=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};s([l({type:vt,raw:!0})],An.prototype,"tbsCertList",void 0);s([l({type:P})],An.prototype,"signatureAlgorithm",void 0);s([l({type:f.BitString})],An.prototype,"signature",void 0);var Yh={"2.5.4.6":"C","2.5.4.10":"O","2.5.4.11":"OU","2.5.4.3":"CN"};function bi(t){let e=ke.parse(t,Be),r=e.tbsCertificate,n={combined:""};r.issuer.forEach(([a])=>{let c=Yh[a.type];c&&(n[c]=a.value.toString())}),n.combined=Jh(n);let o={combined:""};r.subject.forEach(([a])=>{let c=Yh[a.type];c&&(o[c]=a.value.toString())}),o.combined=Jh(o);let i=!1;if(r.extensions)for(let a of r.extensions)a.extnID===ui&&(i=ke.parse(a.extnValue,Ur).cA);return{issuer:n,subject:o,version:r.version,basicConstraintsCA:i,notBefore:r.validity.notBefore.getTime(),notAfter:r.validity.notAfter.getTime(),parsedCertificate:e}}function Jh(t){let e=[];return t.C&&e.push(t.C),t.O&&e.push(t.O),t.OU&&e.push(t.OU),t.CN&&e.push(t.CN),e.join(" : ")}var g8=na(qu(),1);var N=na(ru());var Qt=class{issuer=new Ae;serialNumber=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};s([l({type:Ae})],Qt.prototype,"issuer",void 0);s([l({type:f.Integer,converter:de})],Qt.prototype,"serialNumber",void 0);var vo=class{subjectKeyIdentifier;issuerAndSerialNumber;constructor(e={}){Object.assign(this,e)}};s([l({type:dt,context:0,implicit:!0})],vo.prototype,"subjectKeyIdentifier",void 0);s([l({type:Qt})],vo.prototype,"issuerAndSerialNumber",void 0);vo=s([w({type:y.Choice})],vo);var Ke;(function(t){t[t.v0=0]="v0",t[t.v1=1]="v1",t[t.v2=2]="v2",t[t.v3=3]="v3",t[t.v4=4]="v4",t[t.v5=5]="v5"})(Ke||(Ke={}));var wo=class extends P{};wo=s([w({type:y.Sequence})],wo);var ja=class extends P{};ja=s([w({type:y.Sequence})],ja);var pt=class extends P{};pt=s([w({type:y.Sequence})],pt);var Ha=class extends P{};Ha=s([w({type:y.Sequence})],Ha);var Qh=class extends P{};Qh=s([w({type:y.Sequence})],Qh);var Kc=class extends P{};Kc=s([w({type:y.Sequence})],Kc);var Zt=class{attrType="";attrValues=[];constructor(e={}){Object.assign(this,e)}};s([l({type:f.ObjectIdentifier})],Zt.prototype,"attrType",void 0);s([l({type:f.Any,repeated:"set"})],Zt.prototype,"attrValues",void 0);var Yu,ft=class{version=Ke.v0;sid=new vo;digestAlgorithm=new wo;signedAttrs;signedAttrsRaw;signatureAlgorithm=new ja;signature=new D;unsignedAttrs;constructor(e={}){Object.assign(this,e)}};s([l({type:f.Integer})],ft.prototype,"version",void 0);s([l({type:vo})],ft.prototype,"sid",void 0);s([l({type:wo})],ft.prototype,"digestAlgorithm",void 0);s([l({type:Zt,repeated:"set",context:0,implicit:!0,optional:!0,raw:!0})],ft.prototype,"signedAttrs",void 0);s([l({type:ja})],ft.prototype,"signatureAlgorithm",void 0);s([l({type:D})],ft.prototype,"signature",void 0);s([l({type:Zt,repeated:"set",context:1,implicit:!0,optional:!0})],ft.prototype,"unsignedAttrs",void 0);var Ua=Yu=class extends G{constructor(e){super(e),Object.setPrototypeOf(this,Yu.prototype)}};Ua=Yu=s([w({type:y.Set,itemType:ft})],Ua);var Zh=class extends ft{};Zh=s([w({type:y.Sequence})],Zh);var em=class extends Ie{};em=s([w({type:y.Choice})],em);var $a=class{acIssuer=new re;acSerial=0;attrs=[];constructor(e={}){Object.assign(this,e)}};s([l({type:re})],$a.prototype,"acIssuer",void 0);s([l({type:f.Integer})],$a.prototype,"acSerial",void 0);s([l({type:We,repeated:"sequence"})],$a.prototype,"attrs",void 0);var Ju,Ga=Ju=class extends G{constructor(e){super(e),Object.setPrototypeOf(this,Ju.prototype)}};Ga=Ju=s([w({type:y.Sequence,itemType:f.ObjectIdentifier})],Ga);var vi=class{pathLenConstraint;permittedAttrs;excludedAttrs;permitUnSpecified=!0;constructor(e={}){Object.assign(this,e)}};s([l({type:f.Integer,optional:!0})],vi.prototype,"pathLenConstraint",void 0);s([l({type:Ga,implicit:!0,context:0,optional:!0})],vi.prototype,"permittedAttrs",void 0);s([l({type:Ga,implicit:!0,context:1,optional:!0})],vi.prototype,"excludedAttrs",void 0);s([l({type:f.Boolean,defaultValue:!0})],vi.prototype,"permitUnSpecified",void 0);var Dt=class{issuer=new Se;serial=new ArrayBuffer(0);issuerUID=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};s([l({type:Se})],Dt.prototype,"issuer",void 0);s([l({type:f.Integer,converter:de})],Dt.prototype,"serial",void 0);s([l({type:f.BitString,optional:!0})],Dt.prototype,"issuerUID",void 0);var Xu;(function(t){t[t.publicKey=0]="publicKey",t[t.publicKeyCert=1]="publicKeyCert",t[t.otherObjectTypes=2]="otherObjectTypes"})(Xu||(Xu={}));var Lt=class{digestedObjectType=Xu.publicKey;otherObjectTypeID;digestAlgorithm=new P;objectDigest=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};s([l({type:f.Enumerated})],Lt.prototype,"digestedObjectType",void 0);s([l({type:f.ObjectIdentifier,optional:!0})],Lt.prototype,"otherObjectTypeID",void 0);s([l({type:P})],Lt.prototype,"digestAlgorithm",void 0);s([l({type:f.BitString})],Lt.prototype,"objectDigest",void 0);var xo=class{issuerName;baseCertificateID;objectDigestInfo;constructor(e={}){Object.assign(this,e)}};s([l({type:Se,optional:!0})],xo.prototype,"issuerName",void 0);s([l({type:Dt,context:0,implicit:!0,optional:!0})],xo.prototype,"baseCertificateID",void 0);s([l({type:Lt,context:1,implicit:!0,optional:!0})],xo.prototype,"objectDigestInfo",void 0);var Ao=class{v1Form;v2Form;constructor(e={}){Object.assign(this,e)}};s([l({type:re,repeated:"sequence"})],Ao.prototype,"v1Form",void 0);s([l({type:xo,context:0,implicit:!0})],Ao.prototype,"v2Form",void 0);Ao=s([w({type:y.Choice})],Ao);var Eo=class{notBeforeTime=new Date;notAfterTime=new Date;constructor(e={}){Object.assign(this,e)}};s([l({type:f.GeneralizedTime})],Eo.prototype,"notBeforeTime",void 0);s([l({type:f.GeneralizedTime})],Eo.prototype,"notAfterTime",void 0);var En=class{baseCertificateID;entityName;objectDigestInfo;constructor(e={}){Object.assign(this,e)}};s([l({type:Dt,implicit:!0,context:0,optional:!0})],En.prototype,"baseCertificateID",void 0);s([l({type:Se,implicit:!0,context:1,optional:!0})],En.prototype,"entityName",void 0);s([l({type:Lt,implicit:!0,context:2,optional:!0})],En.prototype,"objectDigestInfo",void 0);var Qu;(function(t){t[t.v2=1]="v2"})(Qu||(Qu={}));var ht=class{version=Qu.v2;holder=new En;issuer=new Ao;signature=new P;serialNumber=new ArrayBuffer(0);attrCertValidityPeriod=new Eo;attributes=[];issuerUniqueID;extensions;constructor(e={}){Object.assign(this,e)}};s([l({type:f.Integer})],ht.prototype,"version",void 0);s([l({type:En})],ht.prototype,"holder",void 0);s([l({type:Ao})],ht.prototype,"issuer",void 0);s([l({type:P})],ht.prototype,"signature",void 0);s([l({type:f.Integer,converter:de})],ht.prototype,"serialNumber",void 0);s([l({type:Eo})],ht.prototype,"attrCertValidityPeriod",void 0);s([l({type:We,repeated:"sequence"})],ht.prototype,"attributes",void 0);s([l({type:f.BitString,optional:!0})],ht.prototype,"issuerUniqueID",void 0);s([l({type:Ot,optional:!0})],ht.prototype,"extensions",void 0);var ko=class{acinfo=new ht;signatureAlgorithm=new P;signatureValue=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};s([l({type:ht})],ko.prototype,"acinfo",void 0);s([l({type:P})],ko.prototype,"signatureAlgorithm",void 0);s([l({type:f.BitString})],ko.prototype,"signatureValue",void 0);var Va;(function(t){t[t.unmarked=1]="unmarked",t[t.unclassified=2]="unclassified",t[t.restricted=4]="restricted",t[t.confidential=8]="confidential",t[t.secret=16]="secret",t[t.topSecret=32]="topSecret"})(Va||(Va={}));var wi=class extends Rt{};var xi=class{type="";value=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};s([l({type:f.ObjectIdentifier,implicit:!0,context:0})],xi.prototype,"type",void 0);s([l({type:f.Any,implicit:!0,context:1})],xi.prototype,"value",void 0);var Ka=class{policyId="";classList=new wi(Va.unclassified);securityCategories;constructor(e={}){Object.assign(this,e)}};s([l({type:f.ObjectIdentifier})],Ka.prototype,"policyId",void 0);s([l({type:wi,defaultValue:new wi(Va.unclassified)})],Ka.prototype,"classList",void 0);s([l({type:xi,repeated:"set"})],Ka.prototype,"securityCategories",void 0);var Ai=class{cotets;oid;string;constructor(e={}){Object.assign(this,e)}};s([l({type:D})],Ai.prototype,"cotets",void 0);s([l({type:f.ObjectIdentifier})],Ai.prototype,"oid",void 0);s([l({type:f.Utf8String})],Ai.prototype,"string",void 0);var Wc=class{policyAuthority;values=[];constructor(e={}){Object.assign(this,e)}};s([l({type:Se,implicit:!0,context:0,optional:!0})],Wc.prototype,"policyAuthority",void 0);s([l({type:Ai,repeated:"sequence"})],Wc.prototype,"values",void 0);var jI=`${vn}.4`,HI=`${vn}.6`,UI=`${vn}.10`,$I=`${se}.55`,Wa=`${bn}.10`,GI=`${Wa}.1`,VI=`${Wa}.2`,KI=`${Wa}.3`,WI=`${Wa}.4`,zI=`${Wa}.6`,Zu="2.5.4",FI=`${Zu}.72`;var ed,Ei=class{targetCertificate=new Dt;targetName;certDigestInfo;constructor(e={}){Object.assign(this,e)}};s([l({type:Dt})],Ei.prototype,"targetCertificate",void 0);s([l({type:re,optional:!0})],Ei.prototype,"targetName",void 0);s([l({type:Lt,optional:!0})],Ei.prototype,"certDigestInfo",void 0);var ki=class{targetName;targetGroup;targetCert;constructor(e={}){Object.assign(this,e)}};s([l({type:re,context:0,implicit:!0})],ki.prototype,"targetName",void 0);s([l({type:re,context:1,implicit:!0})],ki.prototype,"targetGroup",void 0);s([l({type:Ei,context:2,implicit:!0})],ki.prototype,"targetCert",void 0);ki=s([w({type:y.Choice})],ki);var zc=ed=class extends G{constructor(e){super(e),Object.setPrototypeOf(this,ed.prototype)}};zc=ed=s([w({type:y.Sequence,itemType:ki})],zc);var td,tm=td=class extends G{constructor(e){super(e),Object.setPrototypeOf(this,td.prototype)}};tm=td=s([w({type:y.Sequence,itemType:zc})],tm);var Fc=class{roleAuthority;roleName;constructor(e={}){Object.assign(this,e)}};s([l({type:Se,implicit:!0,context:0,optional:!0})],Fc.prototype,"roleAuthority",void 0);s([l({type:re,implicit:!0,context:1})],Fc.prototype,"roleName",void 0);var za=class{service=new re;ident=new re;authInfo;constructor(e={}){Object.assign(this,e)}};s([l({type:re})],za.prototype,"service",void 0);s([l({type:re})],za.prototype,"ident",void 0);s([l({type:D,optional:!0})],za.prototype,"authInfo",void 0);var rd,Fa=class{otherCertFormat="";otherCert=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};s([l({type:f.ObjectIdentifier})],Fa.prototype,"otherCertFormat",void 0);s([l({type:f.Any})],Fa.prototype,"otherCert",void 0);var kn=class{certificate;v2AttrCert;other;constructor(e={}){Object.assign(this,e)}};s([l({type:Be})],kn.prototype,"certificate",void 0);s([l({type:ko,context:2,implicit:!0})],kn.prototype,"v2AttrCert",void 0);s([l({type:Fa,context:3,implicit:!0})],kn.prototype,"other",void 0);kn=s([w({type:y.Choice})],kn);var Sn=rd=class extends G{constructor(e){super(e),Object.setPrototypeOf(this,rd.prototype)}};Sn=rd=s([w({type:y.Set,itemType:kn})],Sn);var it=class{contentType="";content=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};s([l({type:f.ObjectIdentifier})],it.prototype,"contentType",void 0);s([l({type:f.Any,context:0})],it.prototype,"content",void 0);var So=class{single;any;constructor(e={}){Object.assign(this,e)}};s([l({type:D})],So.prototype,"single",void 0);s([l({type:f.Any})],So.prototype,"any",void 0);So=s([w({type:y.Choice})],So);var Co=class{eContentType="";eContent;constructor(e={}){Object.assign(this,e)}};s([l({type:f.ObjectIdentifier})],Co.prototype,"eContentType",void 0);s([l({type:So,context:0,optional:!0})],Co.prototype,"eContent",void 0);var qa=class{value;constructedValue;constructor(e={}){Object.assign(this,e)}};s([l({type:D,context:0,implicit:!0,optional:!0})],qa.prototype,"value",void 0);s([l({type:D,converter:Mh,context:0,implicit:!0,optional:!0,repeated:"sequence"})],qa.prototype,"constructedValue",void 0);qa=s([w({type:y.Choice})],qa);var Cn=class{contentType="";contentEncryptionAlgorithm=new Ha;encryptedContent;constructor(e={}){Object.assign(this,e)}};s([l({type:f.ObjectIdentifier})],Cn.prototype,"contentType",void 0);s([l({type:Ha})],Cn.prototype,"contentEncryptionAlgorithm",void 0);s([l({type:qa,optional:!0})],Cn.prototype,"encryptedContent",void 0);var Tn=class{keyAttrId="";keyAttr;constructor(e={}){Object.assign(this,e)}};s([l({type:f.ObjectIdentifier})],Tn.prototype,"keyAttrId",void 0);s([l({type:f.Any,optional:!0})],Tn.prototype,"keyAttr",void 0);var nd,Si=class{subjectKeyIdentifier=new dt;date;other;constructor(e={}){Object.assign(this,e)}};s([l({type:dt})],Si.prototype,"subjectKeyIdentifier",void 0);s([l({type:f.GeneralizedTime,optional:!0})],Si.prototype,"date",void 0);s([l({type:Tn,optional:!0})],Si.prototype,"other",void 0);var Ci=class{rKeyId;issuerAndSerialNumber;constructor(e={}){Object.assign(this,e)}};s([l({type:Si,context:0,implicit:!0,optional:!0})],Ci.prototype,"rKeyId",void 0);s([l({type:Qt,optional:!0})],Ci.prototype,"issuerAndSerialNumber",void 0);Ci=s([w({type:y.Choice})],Ci);var Ya=class{rid=new Ci;encryptedKey=new D;constructor(e={}){Object.assign(this,e)}};s([l({type:Ci})],Ya.prototype,"rid",void 0);s([l({type:D})],Ya.prototype,"encryptedKey",void 0);var qc=nd=class extends G{constructor(e){super(e),Object.setPrototypeOf(this,nd.prototype)}};qc=nd=s([w({type:y.Sequence,itemType:Ya})],qc);var Ja=class{algorithm=new P;publicKey=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};s([l({type:P})],Ja.prototype,"algorithm",void 0);s([l({type:f.BitString})],Ja.prototype,"publicKey",void 0);var To=class{subjectKeyIdentifier;originatorKey;issuerAndSerialNumber;constructor(e={}){Object.assign(this,e)}};s([l({type:dt,context:0,implicit:!0,optional:!0})],To.prototype,"subjectKeyIdentifier",void 0);s([l({type:Ja,context:1,implicit:!0,optional:!0})],To.prototype,"originatorKey",void 0);s([l({type:Qt,optional:!0})],To.prototype,"issuerAndSerialNumber",void 0);To=s([w({type:y.Choice})],To);var Kr=class{version=Ke.v3;originator=new To;ukm;keyEncryptionAlgorithm=new pt;recipientEncryptedKeys=new qc;constructor(e={}){Object.assign(this,e)}};s([l({type:f.Integer})],Kr.prototype,"version",void 0);s([l({type:To,context:0})],Kr.prototype,"originator",void 0);s([l({type:D,context:1,optional:!0})],Kr.prototype,"ukm",void 0);s([l({type:pt})],Kr.prototype,"keyEncryptionAlgorithm",void 0);s([l({type:qc})],Kr.prototype,"recipientEncryptedKeys",void 0);var Ti=class{subjectKeyIdentifier;issuerAndSerialNumber;constructor(e={}){Object.assign(this,e)}};s([l({type:dt,context:0,implicit:!0})],Ti.prototype,"subjectKeyIdentifier",void 0);s([l({type:Qt})],Ti.prototype,"issuerAndSerialNumber",void 0);Ti=s([w({type:y.Choice})],Ti);var In=class{version=Ke.v0;rid=new Ti;keyEncryptionAlgorithm=new pt;encryptedKey=new D;constructor(e={}){Object.assign(this,e)}};s([l({type:f.Integer})],In.prototype,"version",void 0);s([l({type:Ti})],In.prototype,"rid",void 0);s([l({type:pt})],In.prototype,"keyEncryptionAlgorithm",void 0);s([l({type:D})],In.prototype,"encryptedKey",void 0);var Io=class{keyIdentifier=new D;date;other;constructor(e={}){Object.assign(this,e)}};s([l({type:D})],Io.prototype,"keyIdentifier",void 0);s([l({type:f.GeneralizedTime,optional:!0})],Io.prototype,"date",void 0);s([l({type:Tn,optional:!0})],Io.prototype,"other",void 0);var _n=class{version=Ke.v4;kekid=new Io;keyEncryptionAlgorithm=new pt;encryptedKey=new D;constructor(e={}){Object.assign(this,e)}};s([l({type:f.Integer})],_n.prototype,"version",void 0);s([l({type:Io})],_n.prototype,"kekid",void 0);s([l({type:pt})],_n.prototype,"keyEncryptionAlgorithm",void 0);s([l({type:D})],_n.prototype,"encryptedKey",void 0);var Bn=class{version=Ke.v0;keyDerivationAlgorithm;keyEncryptionAlgorithm=new pt;encryptedKey=new D;constructor(e={}){Object.assign(this,e)}};s([l({type:f.Integer})],Bn.prototype,"version",void 0);s([l({type:Kc,context:0,optional:!0})],Bn.prototype,"keyDerivationAlgorithm",void 0);s([l({type:pt})],Bn.prototype,"keyEncryptionAlgorithm",void 0);s([l({type:D})],Bn.prototype,"encryptedKey",void 0);var Xa=class{oriType="";oriValue=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};s([l({type:f.ObjectIdentifier})],Xa.prototype,"oriType",void 0);s([l({type:f.Any})],Xa.prototype,"oriValue",void 0);var Wr=class{ktri;kari;kekri;pwri;ori;constructor(e={}){Object.assign(this,e)}};s([l({type:In,optional:!0})],Wr.prototype,"ktri",void 0);s([l({type:Kr,context:1,implicit:!0,optional:!0})],Wr.prototype,"kari",void 0);s([l({type:_n,context:2,implicit:!0,optional:!0})],Wr.prototype,"kekri",void 0);s([l({type:Bn,context:3,implicit:!0,optional:!0})],Wr.prototype,"pwri",void 0);s([l({type:Xa,context:4,implicit:!0,optional:!0})],Wr.prototype,"ori",void 0);Wr=s([w({type:y.Choice})],Wr);var od,Qa=od=class extends G{constructor(e){super(e),Object.setPrototypeOf(this,od.prototype)}};Qa=od=s([w({type:y.Set,itemType:Wr})],Qa);var id,rm=`${bn}.16`,zB=`${rm}.2`,FB=`${rm}.4`,Ii=class{otherRevInfoFormat="";otherRevInfo=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};s([l({type:f.ObjectIdentifier})],Ii.prototype,"otherRevInfoFormat",void 0);s([l({type:f.Any})],Ii.prototype,"otherRevInfo",void 0);var Yc=class{other=new Ii;constructor(e={}){Object.assign(this,e)}};s([l({type:Ii,context:1,implicit:!0})],Yc.prototype,"other",void 0);Yc=s([w({type:y.Choice})],Yc);var _i=id=class extends G{constructor(e){super(e),Object.setPrototypeOf(this,id.prototype)}};_i=id=s([w({type:y.Set,itemType:Yc})],_i);var Bi=class{certs;crls;constructor(e={}){Object.assign(this,e)}};s([l({type:Sn,context:0,implicit:!0,optional:!0})],Bi.prototype,"certs",void 0);s([l({type:_i,context:1,implicit:!0,optional:!0})],Bi.prototype,"crls",void 0);var ad,sd=ad=class extends G{constructor(e){super(e),Object.setPrototypeOf(this,ad.prototype)}};sd=ad=s([w({type:y.Set,itemType:Zt})],sd);var _o=class{version=Ke.v0;originatorInfo;recipientInfos=new Qa;encryptedContentInfo=new Cn;unprotectedAttrs;constructor(e={}){Object.assign(this,e)}};s([l({type:f.Integer})],_o.prototype,"version",void 0);s([l({type:Bi,context:0,implicit:!0,optional:!0})],_o.prototype,"originatorInfo",void 0);s([l({type:Qa})],_o.prototype,"recipientInfos",void 0);s([l({type:Cn})],_o.prototype,"encryptedContentInfo",void 0);s([l({type:sd,context:1,implicit:!0,optional:!0})],_o.prototype,"unprotectedAttrs",void 0);var nm="1.2.840.113549.1.7.1",Jc="1.2.840.113549.1.7.2";var cd,Xc=cd=class extends G{constructor(e){super(e),Object.setPrototypeOf(this,cd.prototype)}};Xc=cd=s([w({type:y.Set,itemType:wo})],Xc);var jt=class{version=Ke.v0;digestAlgorithms=new Xc;encapContentInfo=new Co;certificates;crls;signerInfos=new Ua;constructor(e={}){Object.assign(this,e)}};s([l({type:f.Integer})],jt.prototype,"version",void 0);s([l({type:Xc})],jt.prototype,"digestAlgorithms",void 0);s([l({type:Co})],jt.prototype,"encapContentInfo",void 0);s([l({type:Sn,context:0,implicit:!0,optional:!0})],jt.prototype,"certificates",void 0);s([l({type:_i,context:1,implicit:!0,optional:!0})],jt.prototype,"crls",void 0);s([l({type:Ua})],jt.prototype,"signerInfos",void 0);var zr="1.2.840.10045.2.1";var Za="1.2.840.10045.4.1",Qc="1.2.840.10045.4.3.1",Bo="1.2.840.10045.4.3.2",Ro="1.2.840.10045.4.3.3",Mo="1.2.840.10045.4.3.4";var es="1.2.840.10045.3.1.7";var ts="1.3.132.0.34";var ld="1.3.132.0.35";function rs(t){return new P({algorithm:t})}var im=rs(Za),VR=rs(Qc),am=rs(Bo),sm=rs(Ro),cm=rs(Mo);var ns=class{fieldType;parameters;constructor(e={}){Object.assign(this,e)}};s([l({type:f.ObjectIdentifier})],ns.prototype,"fieldType",void 0);s([l({type:f.Any})],ns.prototype,"parameters",void 0);ns=s([w({type:y.Sequence})],ns);var ud=class extends D{};var Ri=class{a;b;seed;constructor(e={}){Object.assign(this,e)}};s([l({type:f.OctetString})],Ri.prototype,"a",void 0);s([l({type:f.OctetString})],Ri.prototype,"b",void 0);s([l({type:f.BitString,optional:!0})],Ri.prototype,"seed",void 0);Ri=s([w({type:y.Sequence})],Ri);var dd;(function(t){t[t.ecpVer1=1]="ecpVer1"})(dd||(dd={}));var wr=class{version=dd.ecpVer1;fieldID;curve;base;order;cofactor;constructor(e={}){Object.assign(this,e)}};s([l({type:f.Integer})],wr.prototype,"version",void 0);s([l({type:ns})],wr.prototype,"fieldID",void 0);s([l({type:Ri})],wr.prototype,"curve",void 0);s([l({type:ud})],wr.prototype,"base",void 0);s([l({type:f.Integer,converter:de})],wr.prototype,"order",void 0);s([l({type:f.Integer,optional:!0})],wr.prototype,"cofactor",void 0);wr=s([w({type:y.Sequence})],wr);var Ht=class{namedCurve;implicitCurve;specifiedCurve;constructor(e={}){Object.assign(this,e)}};s([l({type:f.ObjectIdentifier})],Ht.prototype,"namedCurve",void 0);s([l({type:f.Null})],Ht.prototype,"implicitCurve",void 0);s([l({type:wr})],Ht.prototype,"specifiedCurve",void 0);Ht=s([w({type:y.Choice})],Ht);var Mi=class{version=1;privateKey=new D;parameters;publicKey;constructor(e={}){Object.assign(this,e)}};s([l({type:f.Integer})],Mi.prototype,"version",void 0);s([l({type:D})],Mi.prototype,"privateKey",void 0);s([l({type:Ht,context:0,optional:!0})],Mi.prototype,"parameters",void 0);s([l({type:f.BitString,context:1,optional:!0})],Mi.prototype,"publicKey",void 0);var Fr=class{r=new ArrayBuffer(0);s=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};s([l({type:f.Integer,converter:de})],Fr.prototype,"r",void 0);s([l({type:f.Integer,converter:de})],Fr.prototype,"s",void 0);var mt="1.2.840.113549.1.1",Ut=`${mt}.1`,lm=`${mt}.7`,um=`${mt}.9`,Rn=`${mt}.10`,dm=`${mt}.2`,pm=`${mt}.4`,Mn=`${mt}.5`,fm=`${mt}.14`;var Pi=`${mt}.11`,Pn=`${mt}.12`,Nn=`${mt}.13`,pd=`${mt}.15`,fd=`${mt}.16`,Po="1.3.14.3.2.26",Zc="2.16.840.1.101.3.4.2.4",No="2.16.840.1.101.3.4.2.1",Oo="2.16.840.1.101.3.4.2.2",Do="2.16.840.1.101.3.4.2.3",hm="2.16.840.1.101.3.4.2.5",mm="2.16.840.1.101.3.4.2.6",gm="1.2.840.113549.2.2",ym="1.2.840.113549.2.5",On=`${mt}.8`;function Ue(t){return new P({algorithm:t,parameters:null})}var yM=Ue(gm),bM=Ue(ym),qr=Ue(Po),vM=Ue(Zc),wM=Ue(No),xM=Ue(Oo),AM=Ue(Do),EM=Ue(hm),kM=Ue(mm),el=new P({algorithm:On,parameters:O.serialize(qr)}),hd=new P({algorithm:um,parameters:O.serialize(ci.toASN(new Uint8Array([218,57,163,238,94,107,75,13,50,85,191,239,149,96,24,144,175,216,7,9]).buffer))}),SM=Ue(Ut),CM=Ue(dm),TM=Ue(pm),IM=Ue(Mn),_M=Ue(pd),BM=Ue(fd),RM=Ue(Pn),MM=Ue(Nn),PM=Ue(pd),NM=Ue(fd);var Ni=class{hashAlgorithm=new P(qr);maskGenAlgorithm=new P({algorithm:On,parameters:O.serialize(qr)});pSourceAlgorithm=new P(hd);constructor(e={}){Object.assign(this,e)}};s([l({type:P,context:0,defaultValue:qr})],Ni.prototype,"hashAlgorithm",void 0);s([l({type:P,context:1,defaultValue:el})],Ni.prototype,"maskGenAlgorithm",void 0);s([l({type:P,context:2,defaultValue:hd})],Ni.prototype,"pSourceAlgorithm",void 0);var $M=new P({algorithm:lm,parameters:O.serialize(new Ni)});var xr=class{hashAlgorithm=new P(qr);maskGenAlgorithm=new P({algorithm:On,parameters:O.serialize(qr)});saltLength=20;trailerField=1;constructor(e={}){Object.assign(this,e)}};s([l({type:P,context:0,defaultValue:qr})],xr.prototype,"hashAlgorithm",void 0);s([l({type:P,context:1,defaultValue:el})],xr.prototype,"maskGenAlgorithm",void 0);s([l({type:f.Integer,context:2,defaultValue:20})],xr.prototype,"saltLength",void 0);s([l({type:f.Integer,context:3,defaultValue:1})],xr.prototype,"trailerField",void 0);var qM=new P({algorithm:Rn,parameters:O.serialize(new xr)});var Lo=class{digestAlgorithm=new P;digest=new D;constructor(e={}){Object.assign(this,e)}};s([l({type:P})],Lo.prototype,"digestAlgorithm",void 0);s([l({type:D})],Lo.prototype,"digest",void 0);var md,Oi=class{prime=new ArrayBuffer(0);exponent=new ArrayBuffer(0);coefficient=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};s([l({type:f.Integer,converter:de})],Oi.prototype,"prime",void 0);s([l({type:f.Integer,converter:de})],Oi.prototype,"exponent",void 0);s([l({type:f.Integer,converter:de})],Oi.prototype,"coefficient",void 0);var tl=md=class extends G{constructor(e){super(e),Object.setPrototypeOf(this,md.prototype)}};tl=md=s([w({type:y.Sequence,itemType:Oi})],tl);var $t=class{version=0;modulus=new ArrayBuffer(0);publicExponent=new ArrayBuffer(0);privateExponent=new ArrayBuffer(0);prime1=new ArrayBuffer(0);prime2=new ArrayBuffer(0);exponent1=new ArrayBuffer(0);exponent2=new ArrayBuffer(0);coefficient=new ArrayBuffer(0);otherPrimeInfos;constructor(e={}){Object.assign(this,e)}};s([l({type:f.Integer})],$t.prototype,"version",void 0);s([l({type:f.Integer,converter:de})],$t.prototype,"modulus",void 0);s([l({type:f.Integer,converter:de})],$t.prototype,"publicExponent",void 0);s([l({type:f.Integer,converter:de})],$t.prototype,"privateExponent",void 0);s([l({type:f.Integer,converter:de})],$t.prototype,"prime1",void 0);s([l({type:f.Integer,converter:de})],$t.prototype,"prime2",void 0);s([l({type:f.Integer,converter:de})],$t.prototype,"exponent1",void 0);s([l({type:f.Integer,converter:de})],$t.prototype,"exponent2",void 0);s([l({type:f.Integer,converter:de})],$t.prototype,"coefficient",void 0);s([l({type:tl,optional:!0})],$t.prototype,"otherPrimeInfos",void 0);var Dn=class{modulus=new ArrayBuffer(0);publicExponent=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};s([l({type:f.Integer,converter:de})],Dn.prototype,"modulus",void 0);s([l({type:f.Integer,converter:de})],Dn.prototype,"publicExponent",void 0);var gd;(function(t){t[t.Transient=0]="Transient",t[t.Singleton=1]="Singleton",t[t.ResolutionScoped=2]="ResolutionScoped",t[t.ContainerScoped=3]="ContainerScoped"})(gd||(gd={}));var ze=gd;var yd=function(t,e){return yd=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,n){r.__proto__=n}||function(r,n){for(var o in n)n.hasOwnProperty(o)&&(r[o]=n[o])},yd(t,e)};function os(t,e){yd(t,e);function r(){this.constructor=t}t.prototype=e===null?Object.create(e):(r.prototype=e.prototype,new r)}function bm(t,e,r,n){function o(i){return i instanceof r?i:new r(function(a){a(i)})}return new(r||(r=Promise))(function(i,a){function c(p){try{u(n.next(p))}catch(h){a(h)}}function d(p){try{u(n.throw(p))}catch(h){a(h)}}function u(p){p.done?i(p.value):o(p.value).then(c,d)}u((n=n.apply(t,e||[])).next())})}function vm(t,e){var r={label:0,sent:function(){if(i[0]&1)throw i[1];return i[1]},trys:[],ops:[]},n,o,i,a;return a={next:c(0),throw:c(1),return:c(2)},typeof Symbol=="function"&&(a[Symbol.iterator]=function(){return this}),a;function c(u){return function(p){return d([u,p])}}function d(u){if(n)throw new TypeError("Generator is already executing.");for(;r;)try{if(n=1,o&&(i=u[0]&2?o.return:u[0]?o.throw||((i=o.return)&&i.call(o),0):o.next)&&!(i=i.call(o,u[1])).done)return i;switch(o=0,i&&(u=[u[0]&2,i.value]),u[0]){case 0:case 1:i=u;break;case 4:return r.label++,{value:u[1],done:!1};case 5:r.label++,o=u[1],u=[0];continue;case 7:u=r.ops.pop(),r.trys.pop();continue;default:if(i=r.trys,!(i=i.length>0&&i[i.length-1])&&(u[0]===6||u[0]===2)){r=0;continue}if(u[0]===3&&(!i||u[1]>i[0]&&u[1]<i[3])){r.label=u[1];break}if(u[0]===6&&r.label<i[1]){r.label=i[1],i=u;break}if(i&&r.label<i[2]){r.label=i[2],r.ops.push(u);break}i[2]&&r.ops.pop(),r.trys.pop();continue}u=e.call(t,r)}catch(p){u=[6,p],o=0}finally{n=i=0}if(u[0]&5)throw u[1];return{value:u[0]?u[1]:void 0,done:!0}}}function is(t){var e=typeof Symbol=="function"&&Symbol.iterator,r=e&&t[e],n=0;if(r)return r.call(t);if(t&&typeof t.length=="number")return{next:function(){return t&&n>=t.length&&(t=void 0),{value:t&&t[n++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function Di(t,e){var r=typeof Symbol=="function"&&t[Symbol.iterator];if(!r)return t;var n=r.call(t),o,i=[],a;try{for(;(e===void 0||e-- >0)&&!(o=n.next()).done;)i.push(o.value)}catch(c){a={error:c}}finally{try{o&&!o.done&&(r=n.return)&&r.call(n)}finally{if(a)throw a.error}}return i}function Ar(){for(var t=[],e=0;e<arguments.length;e++)t=t.concat(Di(arguments[e]));return t}var _v="injectionTokens";function bd(t){var e=Reflect.getMetadata("design:paramtypes",t)||[],r=Reflect.getOwnMetadata(_v,t)||{};return Object.keys(r).forEach(function(n){e[+n]=r[n]}),e}function as(t){return!!t.useClass}function Li(t){return!!t.useFactory}var rl=(function(){function t(e){this.wrap=e,this.reflectMethods=["get","getPrototypeOf","setPrototypeOf","getOwnPropertyDescriptor","defineProperty","has","set","deleteProperty","apply","construct","ownKeys"]}return t.prototype.createProxy=function(e){var r=this,n={},o=!1,i,a=function(){return o||(i=e(r.wrap()),o=!0),i};return new Proxy(n,this.createHandler(a))},t.prototype.createHandler=function(e){var r={},n=function(o){r[o]=function(){for(var i=[],a=0;a<arguments.length;a++)i[a]=arguments[a];i[0]=e();var c=Reflect[o];return c.apply(void 0,Ar(i))}};return this.reflectMethods.forEach(n),r},t})();function Ln(t){return typeof t=="string"||typeof t=="symbol"}function vd(t){return typeof t=="object"&&"token"in t&&"multiple"in t}function nl(t){return typeof t=="object"&&"token"in t&&"transform"in t}function wm(t){return typeof t=="function"||t instanceof rl}function jo(t){return!!t.useToken}function Ho(t){return t.useValue!=null}function xm(t){return as(t)||Ho(t)||jo(t)||Li(t)}var Bv=(function(){function t(){this._registryMap=new Map}return t.prototype.entries=function(){return this._registryMap.entries()},t.prototype.getAll=function(e){return this.ensure(e),this._registryMap.get(e)},t.prototype.get=function(e){this.ensure(e);var r=this._registryMap.get(e);return r[r.length-1]||null},t.prototype.set=function(e,r){this.ensure(e),this._registryMap.get(e).push(r)},t.prototype.setAll=function(e,r){this._registryMap.set(e,r)},t.prototype.has=function(e){return this.ensure(e),this._registryMap.get(e).length>0},t.prototype.clear=function(){this._registryMap.clear()},t.prototype.ensure=function(e){this._registryMap.has(e)||this._registryMap.set(e,[])},t})(),ss=Bv;var Rv=(function(t){os(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e})(ss),Am=Rv;var Mv=(function(){function t(){this.scopedResolutions=new Map}return t})(),cs=Mv;function Pv(t,e){if(t===null)return"at position #"+e;var r=t.split(",")[e].trim();return'"'+r+'" at position #'+e}function Nv(t,e,r){return r===void 0&&(r="    "),Ar([t],e.message.split(`
`).map(function(n){return r+n})).join(`
`)}function wd(t,e,r){var n=Di(t.toString().match(/constructor\(([\w, ]+)\)/)||[],2),o=n[1],i=o===void 0?null:o,a=Pv(i,e);return Nv("Cannot inject the dependency "+a+' of "'+t.name+'" constructor. Reason:',r)}function Em(t){if(typeof t.dispose!="function")return!1;var e=t.dispose;return!(e.length>0)}var Ov=(function(t){os(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e})(ss);var Dv=(function(t){os(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e})(ss);var Lv=(function(){function t(){this.preResolution=new Ov,this.postResolution=new Dv}return t})(),km=Lv;var xd=new Map,jv=(function(){function t(e){this.parent=e,this._registry=new Am,this.interceptors=new km,this.disposed=!1,this.disposables=new Set}return t.prototype.register=function(e,r,n){n===void 0&&(n={lifecycle:ze.Transient}),this.ensureNotDisposed();var o;if(xm(r)?o=r:o={useClass:r},jo(o))for(var i=[e],a=o;a!=null;){var c=a.useToken;if(i.includes(c))throw new Error("Token registration cycle detected! "+Ar(i,[c]).join(" -> "));i.push(c);var d=this._registry.get(c);d&&jo(d.provider)?a=d.provider:a=null}if((n.lifecycle===ze.Singleton||n.lifecycle==ze.ContainerScoped||n.lifecycle==ze.ResolutionScoped)&&(Ho(o)||Li(o)))throw new Error('Cannot use lifecycle "'+ze[n.lifecycle]+'" with ValueProviders or FactoryProviders');return this._registry.set(e,{provider:o,options:n}),this},t.prototype.registerType=function(e,r){return this.ensureNotDisposed(),Ln(r)?this.register(e,{useToken:r}):this.register(e,{useClass:r})},t.prototype.registerInstance=function(e,r){return this.ensureNotDisposed(),this.register(e,{useValue:r})},t.prototype.registerSingleton=function(e,r){if(this.ensureNotDisposed(),Ln(e)){if(Ln(r))return this.register(e,{useToken:r},{lifecycle:ze.Singleton});if(r)return this.register(e,{useClass:r},{lifecycle:ze.Singleton});throw new Error('Cannot register a type name as a singleton without a "to" token')}var n=e;return r&&!Ln(r)&&(n=r),this.register(e,{useClass:n},{lifecycle:ze.Singleton})},t.prototype.resolve=function(e,r,n){r===void 0&&(r=new cs),n===void 0&&(n=!1),this.ensureNotDisposed();var o=this.getRegistration(e);if(!o&&Ln(e)){if(n)return;throw new Error('Attempted to resolve unregistered dependency token: "'+e.toString()+'"')}if(this.executePreResolutionInterceptor(e,"Single"),o){var i=this.resolveRegistration(o,r);return this.executePostResolutionInterceptor(e,i,"Single"),i}if(wm(e)){var i=this.construct(e,r);return this.executePostResolutionInterceptor(e,i,"Single"),i}throw new Error("Attempted to construct an undefined constructor. Could mean a circular dependency problem. Try using `delay` function.")},t.prototype.executePreResolutionInterceptor=function(e,r){var n,o;if(this.interceptors.preResolution.has(e)){var i=[];try{for(var a=is(this.interceptors.preResolution.getAll(e)),c=a.next();!c.done;c=a.next()){var d=c.value;d.options.frequency!="Once"&&i.push(d),d.callback(e,r)}}catch(u){n={error:u}}finally{try{c&&!c.done&&(o=a.return)&&o.call(a)}finally{if(n)throw n.error}}this.interceptors.preResolution.setAll(e,i)}},t.prototype.executePostResolutionInterceptor=function(e,r,n){var o,i;if(this.interceptors.postResolution.has(e)){var a=[];try{for(var c=is(this.interceptors.postResolution.getAll(e)),d=c.next();!d.done;d=c.next()){var u=d.value;u.options.frequency!="Once"&&a.push(u),u.callback(e,r,n)}}catch(p){o={error:p}}finally{try{d&&!d.done&&(i=c.return)&&i.call(c)}finally{if(o)throw o.error}}this.interceptors.postResolution.setAll(e,a)}},t.prototype.resolveRegistration=function(e,r){if(this.ensureNotDisposed(),e.options.lifecycle===ze.ResolutionScoped&&r.scopedResolutions.has(e))return r.scopedResolutions.get(e);var n=e.options.lifecycle===ze.Singleton,o=e.options.lifecycle===ze.ContainerScoped,i=n||o,a;return Ho(e.provider)?a=e.provider.useValue:jo(e.provider)?a=i?e.instance||(e.instance=this.resolve(e.provider.useToken,r)):this.resolve(e.provider.useToken,r):as(e.provider)?a=i?e.instance||(e.instance=this.construct(e.provider.useClass,r)):this.construct(e.provider.useClass,r):Li(e.provider)?a=e.provider.useFactory(this):a=this.construct(e.provider,r),e.options.lifecycle===ze.ResolutionScoped&&r.scopedResolutions.set(e,a),a},t.prototype.resolveAll=function(e,r,n){var o=this;r===void 0&&(r=new cs),n===void 0&&(n=!1),this.ensureNotDisposed();var i=this.getAllRegistrations(e);if(!i&&Ln(e)){if(n)return[];throw new Error('Attempted to resolve unregistered dependency token: "'+e.toString()+'"')}if(this.executePreResolutionInterceptor(e,"All"),i){var a=i.map(function(d){return o.resolveRegistration(d,r)});return this.executePostResolutionInterceptor(e,a,"All"),a}var c=[this.construct(e,r)];return this.executePostResolutionInterceptor(e,c,"All"),c},t.prototype.isRegistered=function(e,r){return r===void 0&&(r=!1),this.ensureNotDisposed(),this._registry.has(e)||r&&(this.parent||!1)&&this.parent.isRegistered(e,!0)},t.prototype.reset=function(){this.ensureNotDisposed(),this._registry.clear(),this.interceptors.preResolution.clear(),this.interceptors.postResolution.clear()},t.prototype.clearInstances=function(){var e,r;this.ensureNotDisposed();try{for(var n=is(this._registry.entries()),o=n.next();!o.done;o=n.next()){var i=Di(o.value,2),a=i[0],c=i[1];this._registry.setAll(a,c.filter(function(d){return!Ho(d.provider)}).map(function(d){return d.instance=void 0,d}))}}catch(d){e={error:d}}finally{try{o&&!o.done&&(r=n.return)&&r.call(n)}finally{if(e)throw e.error}}},t.prototype.createChildContainer=function(){var e,r;this.ensureNotDisposed();var n=new t(this);try{for(var o=is(this._registry.entries()),i=o.next();!i.done;i=o.next()){var a=Di(i.value,2),c=a[0],d=a[1];d.some(function(u){var p=u.options;return p.lifecycle===ze.ContainerScoped})&&n._registry.setAll(c,d.map(function(u){return u.options.lifecycle===ze.ContainerScoped?{provider:u.provider,options:u.options}:u}))}}catch(u){e={error:u}}finally{try{i&&!i.done&&(r=o.return)&&r.call(o)}finally{if(e)throw e.error}}return n},t.prototype.beforeResolution=function(e,r,n){n===void 0&&(n={frequency:"Always"}),this.interceptors.preResolution.set(e,{callback:r,options:n})},t.prototype.afterResolution=function(e,r,n){n===void 0&&(n={frequency:"Always"}),this.interceptors.postResolution.set(e,{callback:r,options:n})},t.prototype.dispose=function(){return bm(this,void 0,void 0,function(){var e;return vm(this,function(r){switch(r.label){case 0:return this.disposed=!0,e=[],this.disposables.forEach(function(n){var o=n.dispose();o&&e.push(o)}),[4,Promise.all(e)];case 1:return r.sent(),[2]}})})},t.prototype.getRegistration=function(e){return this.isRegistered(e)?this._registry.get(e):this.parent?this.parent.getRegistration(e):null},t.prototype.getAllRegistrations=function(e){return this.isRegistered(e)?this._registry.getAll(e):this.parent?this.parent.getAllRegistrations(e):null},t.prototype.construct=function(e,r){var n=this;if(e instanceof rl)return e.createProxy(function(i){return n.resolve(i,r)});var o=(function(){var i=xd.get(e);if(!i||i.length===0){if(e.length===0)return new e;throw new Error('TypeInfo not known for "'+e.name+'"')}var a=i.map(n.resolveParams(r,e));return new(e.bind.apply(e,Ar([void 0],a)))})();return Em(o)&&this.disposables.add(o),o},t.prototype.resolveParams=function(e,r){var n=this;return function(o,i){var a,c,d;try{return vd(o)?nl(o)?o.multiple?(a=n.resolve(o.transform)).transform.apply(a,Ar([n.resolveAll(o.token,new cs,o.isOptional)],o.transformArgs)):(c=n.resolve(o.transform)).transform.apply(c,Ar([n.resolve(o.token,e,o.isOptional)],o.transformArgs)):o.multiple?n.resolveAll(o.token,new cs,o.isOptional):n.resolve(o.token,e,o.isOptional):nl(o)?(d=n.resolve(o.transform,e)).transform.apply(d,Ar([n.resolve(o.token,e)],o.transformArgs)):n.resolve(o,e)}catch(u){throw new Error(wd(r,i,u))}}},t.prototype.ensureNotDisposed=function(){if(this.disposed)throw new Error("This container has been disposed, you cannot interact with a disposed container")},t})(),xe=new jv;function Hv(t){return function(e){xd.set(e,bd(e)),t&&t.token&&(Array.isArray(t.token)?t.token.forEach(function(r){xe.register(r,e)}):xe.register(t.token,e))}}var Er=Hv;if(typeof Reflect>"u"||!Reflect.getMetadata)throw new Error(`tsyringe requires a reflect polyfill. Please add 'import "reflect-metadata"' to the top of your entry point.`);var Ed,Uo=class{attrId="";attrValues=[];constructor(e={}){Object.assign(e)}};s([l({type:f.ObjectIdentifier})],Uo.prototype,"attrId",void 0);s([l({type:f.Any,repeated:"set"})],Uo.prototype,"attrValues",void 0);var Sm=Ed=class extends G{constructor(e){super(e),Object.setPrototypeOf(this,Ed.prototype)}};Sm=Ed=s([w({type:y.Sequence,itemType:Uo})],Sm);var kd,Cm=kd=class extends G{constructor(e){super(e),Object.setPrototypeOf(this,kd.prototype)}};Cm=kd=s([w({type:y.Sequence,itemType:it})],Cm);var Uv="1.2.840.113549",$v=`${Uv}.1`,Tm=`${$v}.12`,ji=`${Tm}.1`,R4=`${ji}.1`,M4=`${ji}.2`,P4=`${ji}.3`,N4=`${ji}.4`,O4=`${ji}.5`,D4=`${ji}.6`,$o=`${Tm}.10.1`;var H4=`${$o}.1`,U4=`${$o}.2`,$4=`${$o}.3`,G4=`${$o}.4`,V4=`${$o}.5`,K4=`${$o}.6`,ol="1.2.840.113549.1.9";var il=class{certId="";certValue=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};s([l({type:f.ObjectIdentifier})],il.prototype,"certId",void 0);s([l({type:f.Any,context:0})],il.prototype,"certValue",void 0);var Im=`${ol}.22`,Y4=`${Im}.1`,J4=`${Im}.2`;var al=class{crlId="";crltValue=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};s([l({type:f.ObjectIdentifier})],al.prototype,"crlId",void 0);s([l({type:f.Any,context:0})],al.prototype,"crltValue",void 0);var Gv=`${ol}.23`,tN=`${Gv}.1`;var ls=class extends D{},Yr=class{encryptionAlgorithm=new P;encryptedData=new ls;constructor(e={}){Object.assign(this,e)}};s([l({type:P})],Yr.prototype,"encryptionAlgorithm",void 0);s([l({type:ls})],Yr.prototype,"encryptedData",void 0);var Sd,Cd;(function(t){t[t.v1=0]="v1"})(Cd||(Cd={}));var sl=class extends D{},us=Sd=class extends G{constructor(e){super(e),Object.setPrototypeOf(this,Sd.prototype)}};us=Sd=s([w({type:y.Sequence,itemType:We})],us);var jn=class{version=Cd.v1;privateKeyAlgorithm=new P;privateKey=new sl;attributes;constructor(e={}){Object.assign(this,e)}};s([l({type:f.Integer})],jn.prototype,"version",void 0);s([l({type:P})],jn.prototype,"privateKeyAlgorithm",void 0);s([l({type:sl})],jn.prototype,"privateKey",void 0);s([l({type:us,implicit:!0,context:0,optional:!0})],jn.prototype,"attributes",void 0);var _m=class extends jn{};_m=s([w({type:y.Sequence})],_m);var Bm=class extends Yr{};Bm=s([w({type:y.Sequence})],Bm);var cl=class{secretTypeId="";secretValue=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};s([l({type:f.ObjectIdentifier})],cl.prototype,"secretTypeId",void 0);s([l({type:f.Any,context:0})],cl.prototype,"secretValue",void 0);var Hn=class{mac=new Lo;macSalt=new D;iterations=1;constructor(e={}){Object.assign(this,e)}};s([l({type:Lo})],Hn.prototype,"mac",void 0);s([l({type:D})],Hn.prototype,"macSalt",void 0);s([l({type:f.Integer,defaultValue:1})],Hn.prototype,"iterations",void 0);var Go=class{version=3;authSafe=new it;macData=new Hn;constructor(e={}){Object.assign(this,e)}};s([l({type:f.Integer})],Go.prototype,"version",void 0);s([l({type:it})],Go.prototype,"authSafe",void 0);s([l({type:Hn,optional:!0})],Go.prototype,"macData",void 0);var Td,Hi=class{bagId="";bagValue=new ArrayBuffer(0);bagAttributes;constructor(e={}){Object.assign(this,e)}};s([l({type:f.ObjectIdentifier})],Hi.prototype,"bagId",void 0);s([l({type:f.Any,context:0})],Hi.prototype,"bagValue",void 0);s([l({type:Uo,repeated:"set",optional:!0})],Hi.prototype,"bagAttributes",void 0);var Rm=Td=class extends G{constructor(e){super(e),Object.setPrototypeOf(this,Td.prototype)}};Rm=Td=s([w({type:y.Sequence,itemType:Hi})],Rm);var Id,_d,Bd,Re="1.2.840.113549.1.9",nO=`${Re}.0`,Wm=`${Re}.24`,ps=`${Re}.25`,zm=`${Re}.26`,Fm=`${Re}.27`,oO=`${Wm}.1`,iO=`${Wm}.2`,aO=`${Re}.1`,sO=`${Re}.2`,cO=`${Re}.3`,lO=`${Re}.4`,uO=`${Re}.5`,dO=`${Re}.6`,jd=`${Re}.7`,pO=`${Re}.8`,fO=`${Re}.9`,hO=`${Re}.13`,fs=`${Re}.14`,mO=`${Re}.15`,gO=`${Re}.20`,yO=`${Re}.21`;var bO=`${ps}.1`,vO=`${ps}.2`,wO=`${ps}.3`,xO=`${ps}.4`,AO=`${ps}.5`,hs="1.3.6.1.5.5.7.9",EO=`${hs}.1`,kO=`${hs}.2`,SO=`${hs}.3`,CO=`${hs}.4`,TO=`${hs}.5`,IO=`${zm}.1`,_O=`${zm}.2`,BO=`${Fm}.1`,RO=`${Fm}.2`,MO=`${Re}.16`,PO=`${Re}.22`,NO=`${Re}.23`,OO=`${Zu}.65`,ll=class extends Le{ia5String;constructor(e={}){super(e)}toString(){return{}.toString(),this.ia5String||super.toString()}};s([l({type:f.IA5String})],ll.prototype,"ia5String",void 0);ll=s([w({type:y.Choice})],ll);var Mm=class extends it{};Mm=s([w({type:y.Sequence})],Mm);var Pm=class extends Go{};Pm=s([w({type:y.Sequence})],Pm);var Nm=class extends Yr{};Nm=s([w({type:y.Sequence})],Nm);var Rd=class{value;constructor(e=""){this.value=e}toString(){return this.value}};s([l({type:f.IA5String})],Rd.prototype,"value",void 0);Rd=s([w({type:y.Choice})],Rd);var Om=class extends ll{};Om=s([w({type:y.Choice})],Om);var Dm=class extends Le{};Dm=s([w({type:y.Choice})],Dm);var Md=class{value;constructor(e=new Date){this.value=e}};s([l({type:f.GeneralizedTime})],Md.prototype,"value",void 0);Md=s([w({type:y.Choice})],Md);var Lm=class extends Le{};Lm=s([w({type:y.Choice})],Lm);var Pd=class{value;constructor(e="M"){this.value=e}toString(){return this.value}};s([l({type:f.PrintableString})],Pd.prototype,"value",void 0);Pd=s([w({type:y.Choice})],Pd);var ul=class{value;constructor(e=""){this.value=e}toString(){return this.value}};s([l({type:f.PrintableString})],ul.prototype,"value",void 0);ul=s([w({type:y.Choice})],ul);var jm=class extends ul{};jm=s([w({type:y.Choice})],jm);var Hm=class extends Le{};Hm=s([w({type:y.Choice})],Hm);var Nd=class{value;constructor(e=""){this.value=e}toString(){return this.value}};s([l({type:f.ObjectIdentifier})],Nd.prototype,"value",void 0);Nd=s([w({type:y.Choice})],Nd);var Um=class extends Ie{};Um=s([w({type:y.Choice})],Um);var Od=class{value;constructor(e=0){this.value=e}toString(){return this.value.toString()}};s([l({type:f.Integer})],Od.prototype,"value",void 0);Od=s([w({type:y.Choice})],Od);var $m=class extends ft{};$m=s([w({type:y.Sequence})],$m);var ds=class extends Le{};ds=s([w({type:y.Choice})],ds);var Gm=Id=class extends Ot{constructor(e){super(e),Object.setPrototypeOf(this,Id.prototype)}};Gm=Id=s([w({type:y.Sequence})],Gm);var Vm=_d=class extends G{constructor(e){super(e),Object.setPrototypeOf(this,_d.prototype)}};Vm=_d=s([w({type:y.Set,itemType:Zt})],Vm);var Dd=class{value;constructor(e=""){this.value=e}toString(){return this.value}};s([l({type:f.BmpString})],Dd.prototype,"value",void 0);Dd=s([w({type:y.Choice})],Dd);var Ld=class extends P{};Ld=s([w({type:y.Sequence})],Ld);var Km=Bd=class extends G{constructor(e){super(e),Object.setPrototypeOf(this,Bd.prototype)}};Km=Bd=s([w({type:y.Sequence,itemType:Ld})],Km);var Hd,Ud;var qm=Hd=class extends G{constructor(e){super(e),Object.setPrototypeOf(this,Hd.prototype)}};qm=Hd=s([w({type:y.Sequence,itemType:P})],qm);var Ym=Ud=class extends G{constructor(e){super(e),Object.setPrototypeOf(this,Ud.prototype)}};Ym=Ud=s([w({type:y.Sequence,itemType:f.BitString})],Ym);var $d;var Gd;(function(t){t[t.v1=0]="v1",t[t.v2=1]="v2"})(Gd||(Gd={}));var Jm=class extends P{};Jm=s([w({type:y.Sequence})],Jm);var er=class{version=Gd.v1;privateKeyAlgorithm=new P;privateKey=new ArrayBuffer(0);attributes;publicKey};s([l({type:f.Integer})],er.prototype,"version",void 0);s([l({type:P})],er.prototype,"privateKeyAlgorithm",void 0);s([l({type:f.OctetString})],er.prototype,"privateKey",void 0);s([l({type:us,context:0,implicit:!0,optional:!0})],er.prototype,"attributes",void 0);s([l({type:f.BitString,context:1,implicit:!0,optional:!0})],er.prototype,"publicKey",void 0);er=s([w({type:y.Sequence})],er);var Xm=class extends er{};Xm=s([w({type:y.Sequence})],Xm);var Qm=$d=class extends G{constructor(e){super(e),Object.setPrototypeOf(this,$d.prototype)}};Qm=$d=s([w({type:y.Sequence,itemType:er})],Qm);var Vd,Kd;var Zm=class extends P{};Zm=s([w({type:y.Sequence})],Zm);var eg=Vd=class extends G{constructor(e){super(e),Object.setPrototypeOf(this,Vd.prototype)}};eg=Vd=s([w({type:y.Sequence,itemType:Ve})],eg);var tg=Kd=class extends G{constructor(e){super(e),Object.setPrototypeOf(this,Kd.prototype)}};tg=Kd=s([w({type:y.Sequence,itemType:er})],tg);var at="2.16.840.1.101.3.4.3",Vo=`${at}.17`,Ko=`${at}.18`,Wo=`${at}.19`,Wd=`${at}.20`,zd=`${at}.21`,Fd=`${at}.22`,qd=`${at}.23`,Yd=`${at}.24`,Jd=`${at}.25`,Xd=`${at}.26`,Qd=`${at}.27`,Zd=`${at}.28`,ep=`${at}.29`,tp=`${at}.30`,rp=`${at}.31`;var np,ms=np=class extends G{constructor(e){super(e),Object.setPrototypeOf(this,np.prototype)}};ms=np=s([w({type:y.Sequence,itemType:We})],ms);var kr=class{version=0;subject=new Ae;subjectPKInfo=new Ve;attributes=new ms;constructor(e={}){Object.assign(this,e)}};s([l({type:f.Integer})],kr.prototype,"version",void 0);s([l({type:Ae})],kr.prototype,"subject",void 0);s([l({type:Ve})],kr.prototype,"subjectPKInfo",void 0);s([l({type:ms,implicit:!0,context:0,optional:!0})],kr.prototype,"attributes",void 0);var Un=class{certificationRequestInfo=new kr;certificationRequestInfoRaw;signatureAlgorithm=new P;signature=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};s([l({type:kr,raw:!0})],Un.prototype,"certificationRequestInfo",void 0);s([l({type:P})],Un.prototype,"signatureAlgorithm",void 0);s([l({type:f.BitString})],Un.prototype,"signature",void 0);var Jo="crypto.algorithm",fp=class{getAlgorithms(){return xe.resolveAll(Jo)}toAsnAlgorithm(e){let r={...e};r.hash&&typeof r.hash=="string"&&(r.hash={name:r.hash});for(let n of this.getAlgorithms()){let o=n.toAsnAlgorithm(r);if(o)return o}if(/^[0-9.]+$/.test(e.name)){let n=new P({algorithm:e.name});if("parameters"in e){let o=e;n.parameters=o.parameters}return n}throw new Error("Cannot convert WebCrypto algorithm to ASN.1 algorithm")}toWebAlgorithm(e){for(let n of this.getAlgorithms()){let o=n.toWebAlgorithm(e);if(o)return o}return{name:e.algorithm,parameters:e.parameters}}},Fo="crypto.algorithmProvider";xe.registerSingleton(Fo,fp);var hl,yt="1.3.36.3.3.2.8.1.1",rg=`${yt}.1`,ng=`${yt}.2`,og=`${yt}.3`,ig=`${yt}.4`,ag=`${yt}.5`,sg=`${yt}.6`,cg=`${yt}.7`,lg=`${yt}.8`,ug=`${yt}.9`,dg=`${yt}.10`,pg=`${yt}.11`,fg=`${yt}.12`,hg=`${yt}.13`,mg=`${yt}.14`,gg="brainpoolP160r1",yg="brainpoolP160t1",bg="brainpoolP192r1",vg="brainpoolP192t1",wg="brainpoolP224r1",xg="brainpoolP224t1",Ag="brainpoolP256r1",Eg="brainpoolP256t1",kg="brainpoolP320r1",Sg="brainpoolP320t1",Cg="brainpoolP384r1",Tg="brainpoolP384t1",Ig="brainpoolP512r1",_g="brainpoolP512t1",_e="ECDSA",Vs=hl=class{toAsnAlgorithm(e){switch(e.name.toLowerCase()){case _e.toLowerCase():if("hash"in e)switch((typeof e.hash=="string"?e.hash:e.hash.name).toLowerCase()){case"sha-1":return im;case"sha-256":return am;case"sha-384":return sm;case"sha-512":return cm}else if("namedCurve"in e){let r="";switch(e.namedCurve){case"P-256":r=es;break;case"K-256":r=hl.SECP256K1;break;case"P-384":r=ts;break;case"P-521":r=ld;break;case gg:r=rg;break;case yg:r=ng;break;case bg:r=og;break;case vg:r=ig;break;case wg:r=ag;break;case xg:r=sg;break;case Ag:r=cg;break;case Eg:r=lg;break;case kg:r=ug;break;case Sg:r=dg;break;case Cg:r=pg;break;case Tg:r=fg;break;case Ig:r=hg;break;case _g:r=mg;break}if(r)return new P({algorithm:zr,parameters:O.serialize(new Ht({namedCurve:r}))})}}return null}toWebAlgorithm(e){switch(e.algorithm){case Za:return{name:_e,hash:{name:"SHA-1"}};case Bo:return{name:_e,hash:{name:"SHA-256"}};case Ro:return{name:_e,hash:{name:"SHA-384"}};case Mo:return{name:_e,hash:{name:"SHA-512"}};case zr:{if(!e.parameters)throw new TypeError("Cannot get required parameters from EC algorithm");switch(O.parse(e.parameters,Ht).namedCurve){case es:return{name:_e,namedCurve:"P-256"};case hl.SECP256K1:return{name:_e,namedCurve:"K-256"};case ts:return{name:_e,namedCurve:"P-384"};case ld:return{name:_e,namedCurve:"P-521"};case rg:return{name:_e,namedCurve:gg};case ng:return{name:_e,namedCurve:yg};case og:return{name:_e,namedCurve:bg};case ig:return{name:_e,namedCurve:vg};case ag:return{name:_e,namedCurve:wg};case sg:return{name:_e,namedCurve:xg};case cg:return{name:_e,namedCurve:Ag};case lg:return{name:_e,namedCurve:Eg};case ug:return{name:_e,namedCurve:kg};case dg:return{name:_e,namedCurve:Sg};case pg:return{name:_e,namedCurve:Cg};case fg:return{name:_e,namedCurve:Tg};case hg:return{name:_e,namedCurve:Ig};case mg:return{name:_e,namedCurve:_g}}}}return null}};Vs.SECP256K1="1.3.132.0.10";Vs=hl=s([Er()],Vs);xe.registerSingleton(Jo,Vs);var Ug=Symbol("name"),$g=Symbol("value"),pe=class{constructor(e,r={},n=""){this[Ug]=e,this[$g]=n;for(let o in r)this[o]=r[o]}};pe.NAME=Ug;pe.VALUE=$g;var hp=class{static toTextObject(e){let r=new pe("Algorithm Identifier",{},tr.toString(e.algorithm));if(e.parameters)if(e.algorithm===zr){let n=new Vs().toWebAlgorithm(e);n&&"namedCurve"in n?r["Named Curve"]=n.namedCurve:r.Parameters=e.parameters}else r.Parameters=e.parameters;return r}},tr=class{static toString(e){let r=this.items[e];return r||e}};tr.items={[Po]:"sha1",[Zc]:"sha224",[No]:"sha256",[Oo]:"sha384",[Do]:"sha512",[Ut]:"rsaEncryption",[Mn]:"sha1WithRSAEncryption",[fm]:"sha224WithRSAEncryption",[Pi]:"sha256WithRSAEncryption",[Pn]:"sha384WithRSAEncryption",[Nn]:"sha512WithRSAEncryption",[zr]:"ecPublicKey",[Za]:"ecdsaWithSHA1",[Qc]:"ecdsaWithSHA224",[Bo]:"ecdsaWithSHA256",[Ro]:"ecdsaWithSHA384",[Mo]:"ecdsaWithSHA512",[jh]:"TLS WWW server authentication",[Hh]:"TLS WWW client authentication",[Uh]:"Code Signing",[$h]:"E-mail Protection",[Gh]:"Time Stamping",[Vh]:"OCSP Signing",[Jc]:"Signed Data"};var Tr=class{static serialize(e){return this.serializeObj(e).join(`
`)}static pad(e=0){return"".padStart(2*e," ")}static serializeObj(e,r=0){let n=[],o=this.pad(r++),i="",a=e[pe.VALUE];a&&(i=` ${a}`),n.push(`${o}${e[pe.NAME]}:${i}`),o=this.pad(r);for(let c in e){if(typeof c=="symbol")continue;let d=e[c],u=c?`${c}: `:"";if(typeof d=="string"||typeof d=="number"||typeof d=="boolean")n.push(`${o}${u}${d}`);else if(d instanceof Date)n.push(`${o}${u}${d.toUTCString()}`);else if(Array.isArray(d))for(let p of d)p[pe.NAME]=c,n.push(...this.serializeObj(p,r));else if(d instanceof pe)d[pe.NAME]=c,n.push(...this.serializeObj(d,r));else if(N.BufferSourceConverter.isBufferSource(d))c?(n.push(`${o}${u}`),n.push(...this.serializeBufferSource(d,r+1))):n.push(...this.serializeBufferSource(d,r));else if("toTextObject"in d){let p=d.toTextObject();p[pe.NAME]=c,n.push(...this.serializeObj(p,r))}else throw new TypeError("Cannot serialize data in text format. Unsupported type.")}return n}static serializeBufferSource(e,r=0){let n=this.pad(r),o=N.BufferSourceConverter.toUint8Array(e),i=[];for(let a=0;a<o.length;){let c=[];for(let d=0;d<16&&a<o.length;d++){d===8&&c.push("");let u=o[a++].toString(16).padStart(2,"0");c.push(u)}i.push(`${n}${c.join(" ")}`)}return i}static serializeAlgorithm(e){return this.algorithmSerializer.toTextObject(e)}};Tr.oidSerializer=tr;Tr.algorithmSerializer=hp;var Ui,$i,Xr=class t{get parseOptions(){return $(this,$i,"f")}get rawData(){return $(this,Ui,"f")||le(this,Ui,O.serialize(this.asn),"f"),$(this,Ui,"f")}constructor(...e){Ui.set(this,void 0),$i.set(this,void 0),N.BufferSourceConverter.isBufferSource(e[0])?(le(this,$i,e[2],"f"),this.asn=O.parse(e[0],e[1],e[2]),le(this,Ui,N.BufferSourceConverter.toArrayBuffer(e[0]),"f"),this.onInit(this.asn)):(le(this,$i,e[1],"f"),this.asn=e[0],this.onInit(this.asn))}equal(e){return e instanceof t?(0,N.isEqual)(e.rawData,this.rawData):!1}toString(e="text"){switch(e){case"asn":return O.toString(this.rawData,$(this,$i,"f"));case"text":return Tr.serialize(this.toTextObject());case"hex":return N.Convert.ToHex(this.rawData);case"base64":return N.Convert.ToBase64(this.rawData);case"base64url":return N.Convert.ToBase64Url(this.rawData);default:throw TypeError("Argument 'format' is unsupported value")}}getTextName(){return this.constructor.NAME}toTextObject(){let e=this.toTextObjectEmpty();return e[""]=this.rawData,e}toTextObjectEmpty(e){return new pe(this.getTextName(),{},e)}};Ui=new WeakMap,$i=new WeakMap;Xr.NAME="ASN";var Gg,Ks=class t{static isCryptoKeyPair(e){return e&&e.privateKey&&e.publicKey}static isCryptoKey(e){return e&&e.usages&&e.type&&e.algorithm&&e.extractable!==void 0}constructor(){this.items=new Map,this[Gg]="CryptoProvider",typeof self<"u"&&typeof crypto<"u"?this.set(t.DEFAULT,crypto):typeof global<"u"&&global.crypto&&global.crypto.subtle&&this.set(t.DEFAULT,global.crypto)}clear(){this.items.clear()}delete(e){return this.items.delete(e)}forEach(e,r){return this.items.forEach(e,r)}has(e){return this.items.has(e)}get size(){return this.items.size}entries(){return this.items.entries()}keys(){return this.items.keys()}values(){return this.items.values()}[Symbol.iterator](){return this.items[Symbol.iterator]()}get(e=t.DEFAULT){let r=this.items.get(e.toLowerCase());if(!r)throw new Error(`Cannot get Crypto by name '${e}'`);return r}set(e,r){if(typeof e=="string"){if(!r)throw new TypeError("Argument 'value' is required");this.items.set(e.toLowerCase(),r)}else this.items.set(t.DEFAULT,e);return this}};Gg=Symbol.toStringTag;Ks.DEFAULT="default";var st=new Ks,Cr={berOptions:{maxDepth:1/0,maxNodes:1/0,maxContentLength:1/0}};function zv(t){let e=0;for(;e<t.length-1&&t[e]===0;)e++;let r=t.slice(e);if(r.length||(r=new Uint8Array([0])),r[0]>127){let n=new Uint8Array(r.length+1);n[0]=0,n.set(r,1),r=n}return r.buffer}function Vg(t){return zv(N.BufferSourceConverter.toUint8Array(N.Convert.FromHex(t||"")))}function Kg(t){let e=N.BufferSourceConverter.toUint8Array(t);return e.length>1&&e[0]===0&&e[1]>127&&(e=e.slice(1)),N.Convert.ToHex(e)}var wt=class t extends Xr{constructor(...e){let r,n;N.BufferSourceConverter.isBufferSource(e[0])?(r=N.BufferSourceConverter.toArrayBuffer(e[0]),n=e[1]):(r=O.serialize(new ot({extnID:e[0],critical:e[1],extnValue:new D(N.BufferSourceConverter.toArrayBuffer(e[2]))})),n=Cr),super(r,ot,n)}onInit(e){this.type=e.extnID,this.critical=e.critical,this.value=e.extnValue.buffer}toTextObject(){let e=this.toTextObjectWithoutValue();return e[""]=this.value,e}toTextObjectWithoutValue(){let e=this.toTextObjectEmpty(this.critical?"critical":void 0);return e[pe.NAME]===t.NAME&&(e[pe.NAME]=tr.toString(this.type)),e}},Fv=/^[0-2](?:\.[1-9][0-9]*)+$/;function qv(t){return new RegExp(Fv).test(t)}var gl=class{constructor(e={}){this.items={};for(let r in e)this.register(r,e[r])}get(e){return this.items[e]||null}findId(e){return qv(e)?e:this.get(e)}register(e,r){this.items[e]=r,this.items[r]=e}},gt=new gl;gt.register("CN","2.5.4.3");gt.register("L","2.5.4.7");gt.register("ST","2.5.4.8");gt.register("O","2.5.4.10");gt.register("OU","2.5.4.11");gt.register("C","2.5.4.6");gt.register("DC","0.9.2342.19200300.100.1.25");gt.register("E","1.2.840.113549.1.9.1");gt.register("G","2.5.4.42");gt.register("I","2.5.4.43");gt.register("SN","2.5.4.4");gt.register("T","2.5.4.12");function Yv(t,e){return`\\${N.Convert.ToHex(N.Convert.FromUtf8String(e)).toUpperCase()}`}function Jv(t){return t.replace(/([,+"\\<>;])/g,"\\$1").replace(/^([ #])/,"\\$1").replace(/([ ]$)/,"\\$1").replace(/([\r\n\t])/,Yv)}var $n=class t{static isASCII(e){for(let r=0;r<e.length;r++)if(e.charCodeAt(r)>255)return!1;return!0}static isPrintableString(e){return/^[A-Za-z0-9 '()+,-./:=?]*$/g.test(e)}constructor(e,r={}){this.extraNames=new gl,this.asn=new Ae;for(let n in r)if(Object.prototype.hasOwnProperty.call(r,n)){let o=r[n];this.extraNames.register(n,o)}typeof e=="string"?this.asn=this.fromString(e):e instanceof Ae?this.asn=e:N.BufferSourceConverter.isBufferSource(e)?this.asn=O.parse(e,Ae):this.asn=this.fromJSON(e)}getField(e){let r=this.extraNames.findId(e)||gt.findId(e),n=[];for(let o of this.asn)for(let i of o)i.type===r&&n.push(i.value.toString());return n}getName(e){return this.extraNames.get(e)||gt.get(e)}toString(){return this.asn.map(e=>e.map(r=>{let n=this.getName(r.type)||r.type,o=r.value.anyValue?`#${N.Convert.ToHex(r.value.anyValue)}`:Jv(r.value.toString());return`${n}=${o}`}).join("+")).join(", ")}toJSON(){var e;let r=[];for(let n of this.asn){let o={};for(let i of n){let a=this.getName(i.type)||i.type;(e=o[a])!==null&&e!==void 0||(o[a]=[]),o[a].push(i.value.anyValue?`#${N.Convert.ToHex(i.value.anyValue)}`:i.value.toString())}r.push(o)}return r}fromString(e){let r=new Ae,n=/(\d\.[\d.]*\d|[A-Za-z]+)=((?:"")|(?:".*?[^\\]")|(?:[^,+"\\](?=[,+]|$))|(?:[^,+].*?(?:[^\\][,+]))|(?:))([,+])?/g,o=null,i=",";for(;o=n.exec(`${e},`);){let[,a,c]=o,d=c[c.length-1];(d===","||d==="+")&&(c=c.slice(0,c.length-1),o[3]=d);let u=o[3];a=this.getTypeOid(a);let p=this.createAttribute(a,c);i==="+"?r[r.length-1].push(p):r.push(new gn([p])),i=u}return r}fromJSON(e){let r=new Ae;for(let n of e){let o=new gn;for(let i in n){let a=this.getTypeOid(i),c=n[i];for(let d of c){let u=this.createAttribute(a,d);o.push(u)}}r.push(o)}return r}getTypeOid(e){if(/[\d.]+/.test(e)||(e=this.getName(e)||""),!e)throw new Error(`Cannot get OID for name type '${e}'`);return e}createAttribute(e,r){let n=new fo({type:e});if(typeof r=="object")for(let o in r)switch(o){case"ia5String":n.value.ia5String=r[o];break;case"utf8String":n.value.utf8String=r[o];break;case"universalString":n.value.universalString=r[o];break;case"bmpString":n.value.bmpString=r[o];break;case"printableString":n.value.printableString=r[o];break}else if(r[0]==="#")n.value.anyValue=N.Convert.FromHex(r.slice(1));else{let o=this.processStringValue(r);e===this.getName("E")||e===this.getName("DC")?n.value.ia5String=o:t.isPrintableString(o)?n.value.printableString=o:n.value.utf8String=o}return n}processStringValue(e){let r=/"(.*?[^\\])?"/.exec(e);return r&&(e=r[1]),e.replace(/\\0a/gi,`
`).replace(/\\0d/gi,"\r").replace(/\\0g/gi,"	").replace(/\\(.)/g,"$1")}toArrayBuffer(){return O.serialize(this.asn)}async getThumbprint(e,r){let n,o="SHA-1";return e&&(typeof e=="object"&&"subtle"in e?n=e:(o=e,n=r)),n??(n=st.get()),await n.subtle.digest(o,this.toArrayBuffer())}},Wg="Cannot initialize GeneralName from ASN.1 data.",Bg=`${Wg} Unsupported string format in use.`,Xv=`${Wg} Value doesn't match to GUID regular expression.`,Rg=/^([0-9a-f]{8})-?([0-9a-f]{4})-?([0-9a-f]{4})-?([0-9a-f]{4})-?([0-9a-f]{12})$/i,Mg="1.3.6.1.4.1.311.25.1",Pg="1.3.6.1.4.1.311.20.2.3",op="dns",ip="dn",ap="email",sp="ip",cp="url",lp="guid",up="upn",dl="id",Sr=class extends Xr{constructor(...e){var r;let n,o;if(N.BufferSourceConverter.isBufferSource(e[0]))o=e[1],n=O.parse(e[0],re,o);else if(typeof e[0]=="string")switch(o=Cr,e[0]){case ip:{let i=new $n(e[1]).toArrayBuffer(),a=O.parse(i,Ae,Cr);n=new re({directoryName:a});break}case op:n=new re({dNSName:e[1]});break;case ap:n=new re({rfc822Name:e[1]});break;case lp:{let i=new RegExp(Rg,"i").exec(e[1]);if(!i)throw new Error("Cannot parse GUID value. Value doesn't match to regular expression");let a=i.slice(1).map((c,d)=>d<3?N.Convert.ToHex(new Uint8Array(N.Convert.FromHex(c)).reverse()):c).join("");n=new re({otherName:new yn({typeId:Mg,value:O.serialize(new D(N.Convert.FromHex(a)))})});break}case sp:n=new re({iPAddress:e[1]});break;case dl:n=new re({registeredID:e[1]});break;case up:{n=new re({otherName:new yn({typeId:Pg,value:O.serialize(vu.toASN(e[1]))})});break}case cp:n=new re({uniformResourceIdentifier:e[1]});break;default:throw new Error("Cannot create GeneralName. Unsupported type of the name")}else n=e[0],o=(r=e[1])!==null&&r!==void 0?r:Cr;super(n,o)}onInit(e){if(e.dNSName!=null)this.type=op,this.value=e.dNSName;else if(e.rfc822Name!=null)this.type=ap,this.value=e.rfc822Name;else if(e.iPAddress!=null)this.type=sp,this.value=e.iPAddress;else if(e.uniformResourceIdentifier!=null)this.type=cp,this.value=e.uniformResourceIdentifier;else if(e.registeredID!=null)this.type=dl,this.value=e.registeredID;else if(e.directoryName!=null)this.type=ip,this.value=new $n(e.directoryName).toString();else if(e.otherName!=null)if(e.otherName.typeId===Mg){this.type=lp;let r=O.parse(e.otherName.value,D,this.parseOptions),n=new RegExp(Rg,"i").exec(N.Convert.ToHex(r));if(!n)throw new Error(Xv);this.value=n.slice(1).map((o,i)=>i<3?N.Convert.ToHex(new Uint8Array(N.Convert.FromHex(o)).reverse()):o).join("-")}else if(e.otherName.typeId===Pg)this.type=up,this.value=O.parse(e.otherName.value,Le,this.parseOptions).toString();else throw new Error(Bg);else throw new Error(Bg)}toJSON(){return{type:this.type,value:this.value}}toTextObject(){let e;switch(this.type){case ip:case op:case lp:case sp:case dl:case up:case cp:e=this.type.toUpperCase();break;case ap:e="Email";break;default:throw new Error("Unsupported GeneralName type")}let r=this.value;return this.type===dl&&(r=tr.toString(r)),new pe(e,void 0,r)}},Qr=class extends Xr{constructor(e,r){let n,o=Cr;if(e instanceof Se)n=e;else if(Array.isArray(e)){let i=[];for(let a of e)if(a instanceof re)i.push(a);else{let c=O.parse(new Sr(a.type,a.value).rawData,re,Cr);i.push(c)}n=new Se(i)}else if(N.BufferSourceConverter.isBufferSource(e))n=O.parse(e,Se,r),o=r??{};else throw new Error("Cannot initialize GeneralNames. Incorrect incoming arguments");super(n,o)}onInit(e){let r=[];for(let n of e){let o=null;try{o=new Sr(n,this.parseOptions)}catch{continue}r.push(o)}this.items=r}toJSON(){return this.items.map(e=>e.toJSON())}toTextObject(){let e=super.toTextObjectEmpty();for(let r of this.items){let n=r.toTextObject(),o=e[n[pe.NAME]];Array.isArray(o)||(o=[],e[n[pe.NAME]]=o),o.push(n)}return e}};Qr.NAME="GeneralNames";var Gs="-{5}",Ws="\\n",Qv=`[^${Ws}]+`,Zv=`${Gs}BEGIN (${Qv}(?=${Gs}))${Gs}`,ew=`${Gs}END \\1${Gs}`,qi="\\n",tw=`[^:${Ws}]+`,rw=`(?:[^${Ws}]+${qi}(?: +[^${Ws}]+${qi})*)`,nw="[a-zA-Z0-9=+/]+",ow=`(?:${nw}${qi})+`,Ng=`${Zv}${qi}(?:((?:${tw}: ${rw})+))?${qi}?(${ow})${ew}`,iw=new RegExp(`[${Ws}]+`,"g"),Fe=class{static isPem(e){return typeof e=="string"&&new RegExp(Ng,"g").test(e.replace(/\r/g,""))}static decodeWithHeaders(e){e=e.replace(/\r/g,"");let r=new RegExp(Ng,"g"),n=[],o=null;for(;o=r.exec(e);){let i=o[3].replace(iw,""),a={type:o[1],headers:[],rawData:N.Convert.FromBase64(i)},c=o[2];if(c){let d=c.split(new RegExp(qi,"g")),u=null;for(let p of d){let[h,m]=p.split(/:(.*)/);if(m===void 0){if(!u)throw new Error("Cannot parse PEM string. Incorrect header value");u.value+=h.trim()}else u&&a.headers.push(u),u={key:h,value:m.trim()}}u&&a.headers.push(u)}n.push(a)}return n}static decode(e){return this.decodeWithHeaders(e).map(n=>n.rawData)}static decodeFirst(e){let r=this.decode(e);if(!r.length)throw new RangeError("PEM string doesn't contain any objects");return r[0]}static encode(e,r){if(Array.isArray(e)){let n=new Array;return r?e.forEach(o=>{if(!N.BufferSourceConverter.isBufferSource(o))throw new TypeError("Cannot encode array of BufferSource in PEM format. Not all items of the array are BufferSource");n.push(this.encodeStruct({type:r,rawData:N.BufferSourceConverter.toArrayBuffer(o)}))}):e.forEach(o=>{if(!("type"in o))throw new TypeError("Cannot encode array of PemStruct in PEM format. Not all items of the array are PemStrut");n.push(this.encodeStruct(o))}),n.join(`
`)}else{if(!r)throw new Error("Required argument 'tag' is missed");return this.encodeStruct({type:r,rawData:N.BufferSourceConverter.toArrayBuffer(e)})}}static encodeStruct(e){var r;let n=e.type.toLocaleUpperCase(),o=[];if(o.push(`-----BEGIN ${n}-----`),!((r=e.headers)===null||r===void 0)&&r.length){for(let a of e.headers)o.push(`${a.key}: ${a.value}`);o.push("")}let i=N.Convert.ToBase64(e.rawData);for(let a=0;a<i.length;a+=64)o.push(i.substring(a,a+64));return o.push(`-----END ${n}-----`),o.join(`
`)}};Fe.CertificateTag="CERTIFICATE";Fe.CrlTag="CRL";Fe.CertificateRequestTag="CERTIFICATE REQUEST";Fe.PublicKeyTag="PUBLIC KEY";Fe.PrivateKeyTag="PRIVATE KEY";var Gt=class t extends Xr{static isAsnEncoded(e){return N.BufferSourceConverter.isBufferSource(e)||typeof e=="string"}static toArrayBuffer(e){if(typeof e=="string"){if(Fe.isPem(e))return Fe.decode(e)[0];if(N.Convert.isHex(e))return N.Convert.FromHex(e);if(N.Convert.isBase64(e))return N.Convert.FromBase64(e);if(N.Convert.isBase64Url(e))return N.Convert.FromBase64Url(e);throw new TypeError("Unsupported format of 'raw' argument. Must be one of DER, PEM, HEX, Base64, or Base4Url")}else{let r=N.BufferSourceConverter.toUint8Array(e);if(r.length>0&&r[0]===48)return N.BufferSourceConverter.toArrayBuffer(e);let n=N.Convert.ToBinary(e);if(Fe.isPem(n))return Fe.decode(n)[0];if(N.Convert.isHex(n))return N.Convert.FromHex(n);if(N.Convert.isBase64(n))return N.Convert.FromBase64(n);if(N.Convert.isBase64Url(n))return N.Convert.FromBase64Url(n);throw new TypeError("Unsupported format of 'raw' argument. Must be one of DER, PEM, HEX, Base64, or Base4Url")}}constructor(...e){t.isAsnEncoded(e[0])?super(t.toArrayBuffer(e[0]),e[1],e[2]):super(e[0],e[1])}toString(e="pem"){return e==="pem"?Fe.encode(this.rawData,this.tag):super.toString(e)}},Jr=class t extends Gt{static async create(e,r=st.get()){if(e instanceof t)return e;if(Ks.isCryptoKey(e)){if(e.type!=="public")throw new TypeError("Public key is required");let n=await r.subtle.exportKey("spki",e);return new t(n)}else{if(e.publicKey)return e.publicKey;if(N.BufferSourceConverter.isBufferSource(e))return new t(e);throw new TypeError("Unsupported PublicKeyType")}}constructor(e,r){Gt.isAsnEncoded(e)?super(e,Ve,r):super(e,r),this.tag=Fe.PublicKeyTag}async export(e,r,n){let o,i=["verify"],a={hash:"SHA-256",...this.algorithm};r?(a=e,i=r,o=n):o=e,o??(o=st.get());let c=this.rawData,d=O.parse(this.rawData,Ve,this.parseOptions);return d.algorithm.algorithm===Rn&&(c=aw(d,c)),o.subtle.importKey("spki",c,a,!0,i)}onInit(e){let r=xe.resolve(Fo),n=this.algorithm=r.toWebAlgorithm(e.algorithm);if(e.algorithm.algorithm===Ut){let o=O.parse(e.subjectPublicKey,Dn,this.parseOptions),i=N.BufferSourceConverter.toUint8Array(o.modulus);n.publicExponent=N.BufferSourceConverter.toUint8Array(o.publicExponent),n.modulusLength=(i[0]?i:i.slice(1)).byteLength<<3}}async getThumbprint(e,r){let n,o="SHA-1";return e&&(typeof e=="object"&&"subtle"in e?n=e:(o=e,n=r)),n??(n=st.get()),await n.subtle.digest(o,this.rawData)}async getKeyIdentifier(e,r){let n,o="SHA-1";e&&(typeof e=="object"&&"subtle"in e?n=e:(o=e,n=r)),n??(n=st.get());let i=O.parse(this.rawData,Ve,this.parseOptions);return await n.subtle.digest(o,i.subjectPublicKey)}toTextObject(){let e=this.toTextObjectEmpty(),r=O.parse(this.rawData,Ve,this.parseOptions);switch(e.Algorithm=Tr.serializeAlgorithm(r.algorithm),r.algorithm.algorithm){case zr:e["EC Point"]=r.subjectPublicKey;break;case Ut:default:e["Raw Data"]=r.subjectPublicKey}return e}};function aw(t,e){return t.algorithm=new P({algorithm:Ut,parameters:null}),e=O.serialize(t),e}var qo=class t extends wt{static async create(e,r=!1,n=st.get()){if("name"in e&&"serialNumber"in e)return new t(e,r);let i=await(await Jr.create(e,n)).getKeyIdentifier(n);return new t(N.Convert.ToHex(i),r)}constructor(...e){if(N.BufferSourceConverter.isBufferSource(e[0]))super(e[0],e[1]);else if(typeof e[0]=="string"){let r=new br({keyIdentifier:new go(N.Convert.FromHex(e[0]))});super(Ia,e[1],O.serialize(r))}else{let r=e[0],n=r.name instanceof Qr?O.parse(r.name.rawData,Se,Cr):r.name,o=new br({authorityCertIssuer:n,authorityCertSerialNumber:N.Convert.FromHex(r.serialNumber)});super(Ia,e[1],O.serialize(o))}}onInit(e){super.onInit(e);let r=O.parse(e.extnValue,br,this.parseOptions);r.keyIdentifier&&(this.keyId=N.Convert.ToHex(r.keyIdentifier)),(r.authorityCertIssuer||r.authorityCertSerialNumber)&&(this.certId={name:r.authorityCertIssuer||[],serialNumber:r.authorityCertSerialNumber?N.Convert.ToHex(r.authorityCertSerialNumber):""})}toTextObject(){let e=this.toTextObjectWithoutValue(),r=O.parse(this.value,br,this.parseOptions);return r.authorityCertIssuer&&(e["Authority Issuer"]=new Qr(r.authorityCertIssuer).toTextObject()),r.authorityCertSerialNumber&&(e["Authority Serial Number"]=r.authorityCertSerialNumber),r.keyIdentifier&&(e[""]=r.keyIdentifier),e}};qo.NAME="Authority Key Identifier";var yl=class extends wt{constructor(...e){if(N.BufferSourceConverter.isBufferSource(e[0])){super(e[0],e[1]);let r=O.parse(this.value,Ur,this.parseOptions);this.ca=r.cA,this.pathLength=r.pathLenConstraint}else{let r=new Ur({cA:e[0],pathLenConstraint:e[1]});super(ui,e[2],O.serialize(r)),this.ca=e[0],this.pathLength=e[1]}}toTextObject(){let e=this.toTextObjectWithoutValue();return this.ca&&(e.CA=this.ca),this.pathLength!==void 0&&(e["Path Length"]=this.pathLength),e}};yl.NAME="Basic Constraints";var Og;(function(t){t.serverAuth="1.3.6.1.5.5.7.3.1",t.clientAuth="1.3.6.1.5.5.7.3.2",t.codeSigning="1.3.6.1.5.5.7.3.3",t.emailProtection="1.3.6.1.5.5.7.3.4",t.timeStamping="1.3.6.1.5.5.7.3.8",t.ocspSigning="1.3.6.1.5.5.7.3.9"})(Og||(Og={}));var bl=class extends wt{constructor(...e){if(N.BufferSourceConverter.isBufferSource(e[0])){super(e[0],e[1]);let r=O.parse(this.value,bo,this.parseOptions);this.usages=r.map(n=>n)}else{let r=new bo(e[0]);super(pi,e[1],O.serialize(r)),this.usages=e[0]}}toTextObject(){let e=this.toTextObjectWithoutValue();return e[""]=this.usages.map(r=>tr.toString(r)).join(", "),e}};bl.NAME="Extended Key Usages";var Dg;(function(t){t[t.digitalSignature=1]="digitalSignature",t[t.nonRepudiation=2]="nonRepudiation",t[t.keyEncipherment=4]="keyEncipherment",t[t.dataEncipherment=8]="dataEncipherment",t[t.keyAgreement=16]="keyAgreement",t[t.keyCertSign=32]="keyCertSign",t[t.cRLSign=64]="cRLSign",t[t.encipherOnly=128]="encipherOnly",t[t.decipherOnly=256]="decipherOnly"})(Dg||(Dg={}));var vl=class extends wt{constructor(...e){if(N.BufferSourceConverter.isBufferSource(e[0])){super(e[0],e[1]);let r=O.parse(this.value,hi,this.parseOptions);this.usages=r.toNumber()}else{let r=new hi(e[0]);super(Dc,e[1],O.serialize(r)),this.usages=e[0]}}toTextObject(){let e=this.toTextObjectWithoutValue(),r=O.parse(this.value,hi,this.parseOptions);return e[""]=r.toJSON().join(", "),e}};vl.NAME="Key Usages";var Yo=class t extends wt{static async create(e,r=!1,n=st.get()){let i=await(await Jr.create(e,n)).getKeyIdentifier(n);return new t(N.Convert.ToHex(i),r)}constructor(...e){if(N.BufferSourceConverter.isBufferSource(e[0])){super(e[0],e[1]);let r=O.parse(this.value,dt,this.parseOptions);this.keyId=N.Convert.ToHex(r)}else{let r=typeof e[0]=="string"?N.Convert.FromHex(e[0]):e[0],n=new dt(r);super(Uc,e[1],O.serialize(n)),this.keyId=N.Convert.ToHex(r)}}toTextObject(){let e=this.toTextObjectWithoutValue(),r=O.parse(this.value,dt,this.parseOptions);return e[""]=r,e}};Yo.NAME="Subject Key Identifier";var wl=class extends wt{constructor(...e){N.BufferSourceConverter.isBufferSource(e[0])?super(e[0],e[1]):super(yi,e[1],new Qr(e[0]||[]).rawData)}onInit(e){super.onInit(e);let r=O.parse(e.extnValue,gi,this.parseOptions);this.names=new Qr(r)}toTextObject(){let e=this.toTextObjectWithoutValue(),r=this.names.toTextObject();for(let n in r)e[n]=r[n];return e}};wl.NAME="Subject Alternative Name";var qe=class{static register(e,r){this.items.set(e,r)}static create(e,r){let n=new wt(e,r),o=this.items.get(n.type);return o?new o(e,r):n}};qe.items=new Map;var xl=class extends wt{constructor(...e){var r;if(N.BufferSourceConverter.isBufferSource(e[0])){super(e[0],e[1]);let n=O.parse(this.value,Ma,this.parseOptions);this.policies=n.map(o=>o.policyIdentifier)}else{let n=e[0],o=(r=e[1])!==null&&r!==void 0?r:!1,i=new Ma(n.map(a=>new yo({policyIdentifier:a})));super(Nc,o,O.serialize(i)),this.policies=n}}toTextObject(){let e=this.toTextObjectWithoutValue();return e.Policy=this.policies.map(r=>new pe("",{},tr.toString(r))),e}};xl.NAME="Certificate Policies";qe.register(Nc,xl);var Yi=class extends wt{constructor(...e){var r;if(N.BufferSourceConverter.isBufferSource(e[0]))super(e[0],e[1]);else if(Array.isArray(e[0])&&typeof e[0][0]=="string"){let o=e[0].map(a=>new vr({distributionPoint:new Gr({fullName:[new re({uniformResourceIdentifier:a})]})})),i=new wn(o);super(Oc,e[1],O.serialize(i))}else{let n=new wn(e[0]);super(Oc,e[1],O.serialize(n))}(r=this.distributionPoints)!==null&&r!==void 0||(this.distributionPoints=[])}onInit(e){super.onInit(e);let r=O.parse(e.extnValue,wn,this.parseOptions);this.distributionPoints=r}toTextObject(){let e=this.toTextObjectWithoutValue();return e["Distribution Point"]=this.distributionPoints.map(r=>{var n;let o=new pe("");return!((n=r.distributionPoint)===null||n===void 0)&&n.fullName&&(o[""]=r.distributionPoint.fullName.map(i=>new Sr(i).toString()).join(", ")),r.reasons&&(o.Reasons=r.reasons.toString()),r.cRLIssuer&&(o["CRL Issuer"]=r.cRLIssuer.map(i=>i.toString()).join(", ")),o}),e}};Yi.NAME="CRL Distribution Points";var Al=class extends wt{constructor(...e){var r,n,o,i;if(N.BufferSourceConverter.isBufferSource(e[0]))super(e[0],e[1]);else if(e[0]instanceof mo){let a=new mo(e[0]);super(Mc,e[1],O.serialize(a))}else{let a=e[0],c=new mo;fl(c,a,Cu,"ocsp"),fl(c,a,Tu,"caIssuers"),fl(c,a,Iu,"timeStamping"),fl(c,a,_u,"caRepository"),super(Mc,e[1],O.serialize(c))}(r=this.ocsp)!==null&&r!==void 0||(this.ocsp=[]),(n=this.caIssuers)!==null&&n!==void 0||(this.caIssuers=[]),(o=this.timeStamping)!==null&&o!==void 0||(this.timeStamping=[]),(i=this.caRepository)!==null&&i!==void 0||(this.caRepository=[])}onInit(e){super.onInit(e),this.ocsp=[],this.caIssuers=[],this.timeStamping=[],this.caRepository=[],O.parse(e.extnValue,mo,this.parseOptions).forEach(n=>{switch(n.accessMethod){case Cu:this.ocsp.push(new Sr(n.accessLocation));break;case Tu:this.caIssuers.push(new Sr(n.accessLocation));break;case Iu:this.timeStamping.push(new Sr(n.accessLocation));break;case _u:this.caRepository.push(new Sr(n.accessLocation));break}})}toTextObject(){let e=this.toTextObjectWithoutValue();return this.ocsp.length&&pl(e,"OCSP",this.ocsp),this.caIssuers.length&&pl(e,"CA Issuers",this.caIssuers),this.timeStamping.length&&pl(e,"Time Stamping",this.timeStamping),this.caRepository.length&&pl(e,"CA Repository",this.caRepository),e}};Al.NAME="Authority Info Access";function pl(t,e,r){if(r.length===1)t[e]=r[0].toTextObject();else{let n=new pe("");r.forEach((o,i)=>{let a=o.toTextObject(),c=`${a[pe.NAME]} ${i+1}`,d=n[c];Array.isArray(d)||(d=[],n[c]=d),d.push(a)}),t[e]=n}}function fl(t,e,r,n){let o=e[n];o&&(Array.isArray(o)?o:[o]).forEach(a=>{typeof a=="string"&&(a=new Sr("url",a)),t.push(new Hr({accessMethod:r,accessLocation:O.parse(a.rawData,re,Cr)}))})}var El=class extends wt{constructor(...e){N.BufferSourceConverter.isBufferSource(e[0])?super(e[0],e[1]):super($u,e[1],new Qr(e[0]||[]).rawData)}onInit(e){super.onInit(e);let r=O.parse(e.extnValue,Se,this.parseOptions);this.names=new Qr(r)}toTextObject(){let e=this.toTextObjectWithoutValue(),r=this.names.toTextObject();for(let n in r)e[n]=r[n];return e}};El.NAME="Issuer Alternative Name";var Ji=class t extends Xr{constructor(...e){let r,n;if(N.BufferSourceConverter.isBufferSource(e[0]))r=N.BufferSourceConverter.toArrayBuffer(e[0]),n=e[1];else{let o=e[0],i=Array.isArray(e[1])?e[1].map(a=>N.BufferSourceConverter.toArrayBuffer(a)):[];r=O.serialize(new We({type:o,values:i})),n=Cr}super(r,We,n)}onInit(e){this.type=e.type,this.values=e.values}toTextObject(){let e=this.toTextObjectWithoutValue();return e.Value=this.values.map(r=>new pe("",{"":r})),e}toTextObjectWithoutValue(){let e=this.toTextObjectEmpty();return e[pe.NAME]===t.NAME&&(e[pe.NAME]=tr.toString(this.type)),e}};Ji.NAME="Attribute";var kl=class extends Ji{constructor(...e){var r;if(N.BufferSourceConverter.isBufferSource(e[0]))super(e[0],e[1]);else{let n=new ds({printableString:e[0]});super(jd,[O.serialize(n)])}(r=this.password)!==null&&r!==void 0||(this.password="")}onInit(e){if(super.onInit(e),this.values[0]){let r=O.parse(this.values[0],ds,this.parseOptions);this.password=r.toString()}}toTextObject(){let e=this.toTextObjectWithoutValue();return e[pe.VALUE]=this.password,e}};kl.NAME="Challenge Password";var zs=class extends Ji{constructor(...e){var r;if(N.BufferSourceConverter.isBufferSource(e[0]))super(e[0],e[1]);else{let n=e[0],o=new Ot;for(let i of n)o.push(O.parse(i.rawData,ot,Cr));super(fs,[O.serialize(o)])}(r=this.items)!==null&&r!==void 0||(this.items=[])}onInit(e){if(super.onInit(e),this.values[0]){let r=O.parse(this.values[0],Ot,this.parseOptions);this.items=r.map(n=>qe.create(O.serialize(n),this.parseOptions))}}toTextObject(){let e=this.toTextObjectWithoutValue(),r=this.items.map(n=>n.toTextObject());for(let n of r)e[n[pe.NAME]]=n;return e}};zs.NAME="Extensions";var Xi=class{static register(e,r){this.items.set(e,r)}static create(e,r){let n=new Ji(e,r),o=this.items.get(n.type);return o?new o(e,r):n}};Xi.items=new Map;var Fs="crypto.signatureFormatter",mp=class{toAsnSignature(e,r){return N.BufferSourceConverter.toArrayBuffer(r)}toWebSignature(e,r){return N.BufferSourceConverter.toArrayBuffer(r)}},ml,gp=ml=class{static createPssParams(e,r){let n=ml.getHashAlgorithm(e);return n?new xr({hashAlgorithm:n,maskGenAlgorithm:new P({algorithm:On,parameters:O.serialize(n)}),saltLength:r}):null}static getHashAlgorithm(e){let r=xe.resolve(Fo);return typeof e=="string"?r.toAsnAlgorithm({name:e}):typeof e=="object"&&e&&"name"in e?r.toAsnAlgorithm(e):null}toAsnAlgorithm(e){switch(e.name.toLowerCase()){case"rsassa-pkcs1-v1_5":if("hash"in e){let r;if(typeof e.hash=="string")r=e.hash;else if(e.hash&&typeof e.hash=="object"&&"name"in e.hash&&typeof e.hash.name=="string")r=e.hash.name.toUpperCase();else throw new Error("Cannot get hash algorithm name");switch(r.toLowerCase()){case"sha-1":return new P({algorithm:Mn,parameters:null});case"sha-256":return new P({algorithm:Pi,parameters:null});case"sha-384":return new P({algorithm:Pn,parameters:null});case"sha-512":return new P({algorithm:Nn,parameters:null})}}else return new P({algorithm:Ut,parameters:null});break;case"rsa-pss":if("hash"in e){if(!("saltLength"in e&&typeof e.saltLength=="number"))throw new Error("Cannot get 'saltLength' from 'alg' argument");let r=ml.createPssParams(e.hash,e.saltLength);if(!r)throw new Error("Cannot create PSS parameters");return new P({algorithm:Rn,parameters:O.serialize(r)})}else return new P({algorithm:Rn,parameters:null})}return null}toWebAlgorithm(e){switch(e.algorithm){case Ut:return{name:"RSASSA-PKCS1-v1_5"};case Mn:return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-1"}};case Pi:return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-256"}};case Pn:return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-384"}};case Nn:return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-512"}};case Rn:if(e.parameters){let r=O.parse(e.parameters,xr);return{name:"RSA-PSS",hash:xe.resolve(Fo).toWebAlgorithm(r.hashAlgorithm),saltLength:r.saltLength}}else return{name:"RSA-PSS"}}return null}};gp=ml=s([Er()],gp);xe.registerSingleton(Jo,gp);var yp=class{toAsnAlgorithm(e){switch(e.name.toLowerCase()){case"sha-1":return new P({algorithm:Po});case"sha-256":return new P({algorithm:No});case"sha-384":return new P({algorithm:Oo});case"sha-512":return new P({algorithm:Do})}return null}toWebAlgorithm(e){switch(e.algorithm){case Po:return{name:"SHA-1"};case No:return{name:"SHA-256"};case Oo:return{name:"SHA-384"};case Do:return{name:"SHA-512"}}return null}};yp=s([Er()],yp);xe.registerSingleton(Jo,yp);var Zr=class t{addPadding(e,r){let n=N.BufferSourceConverter.toUint8Array(r),o=new Uint8Array(e);return o.set(n,e-n.length),o.buffer}removePadding(e,r=!1){let n=N.BufferSourceConverter.toUint8Array(e);for(let o=0;o<n.length;o++)if(n[o]){n=n.slice(o);break}if(r&&n[0]>127){let o=new Uint8Array(n.length+1);return o.set(n,1),o.buffer}return n.buffer}toAsnSignature(e,r){if(e.name==="ECDSA"){let n=e.namedCurve,o=t.namedCurveSize.get(n)||t.defaultNamedCurveSize,i=new Fr,a=N.BufferSourceConverter.toUint8Array(r);return i.r=this.removePadding(a.slice(0,o),!0),i.s=this.removePadding(a.slice(o,o+o),!0),O.serialize(i)}return null}toWebSignature(e,r){if(e.name==="ECDSA"){let n=O.parse(r,Fr),o=e.namedCurve,i=t.namedCurveSize.get(o)||t.defaultNamedCurveSize,a=this.addPadding(i,this.removePadding(n.r)),c=this.addPadding(i,this.removePadding(n.s));return(0,N.combine)(a,c)}return null}};Zr.namedCurveSize=new Map;Zr.defaultNamedCurveSize=32;var dp="1.3.101.110",Lg="1.3.101.111",pp="1.3.101.112",jg="1.3.101.113",bp=class{toAsnAlgorithm(e){let r=null;switch(e.name.toLowerCase()){case"ed25519":r=pp;break;case"x25519":r=dp;break;case"eddsa":switch(e.namedCurve.toLowerCase()){case"ed25519":r=pp;break;case"ed448":r=jg;break}break;case"ecdh-es":switch(e.namedCurve.toLowerCase()){case"x25519":r=dp;break;case"x448":r=Lg;break}}return r?new P({algorithm:r}):null}toWebAlgorithm(e){switch(e.algorithm){case pp:return{name:"Ed25519"};case jg:return{name:"EdDSA",namedCurve:"Ed448"};case dp:return{name:"X25519"};case Lg:return{name:"ECDH-ES",namedCurve:"X448"}}return null}};bp=s([Er()],bp);xe.registerSingleton(Jo,bp);var vp=class{toAsnAlgorithm(e){let r=null;switch(e.name.toLowerCase()){case"ml-dsa-44":r=Vo;break;case"ml-dsa-65":r=Ko;break;case"ml-dsa-87":r=Wo;break}return r?new P({algorithm:r}):null}toWebAlgorithm(e){switch(e.algorithm){case Vo:return{name:"ML-DSA-44"};case Ko:return{name:"ML-DSA-65"};case Wo:return{name:"ML-DSA-87"}}return null}};vp=s([Er()],vp);xe.registerSingleton(Jo,vp);var wp=class{toAsnAlgorithm(e){let r=null;switch(e.name.toLowerCase()){case"slh-dsa-sha2-128s":r=Wd;break;case"slh-dsa-sha2-128f":r=zd;break;case"slh-dsa-sha2-192s":r=Fd;break;case"slh-dsa-sha2-192f":r=qd;break;case"slh-dsa-sha2-256s":r=Yd;break;case"slh-dsa-sha2-256f":r=Jd;break;case"slh-dsa-shake-128s":r=Xd;break;case"slh-dsa-shake-128f":r=Qd;break;case"slh-dsa-shake-192s":r=Zd;break;case"slh-dsa-shake-192f":r=ep;break;case"slh-dsa-shake-256s":r=tp;break;case"slh-dsa-shake-256f":r=rp;break}return r?new P({algorithm:r}):null}toWebAlgorithm(e){switch(e.algorithm){case Wd:return{name:"SLH-DSA-SHA2-128s"};case zd:return{name:"SLH-DSA-SHA2-128f"};case Fd:return{name:"SLH-DSA-SHA2-192s"};case qd:return{name:"SLH-DSA-SHA2-192f"};case Yd:return{name:"SLH-DSA-SHA2-256s"};case Jd:return{name:"SLH-DSA-SHA2-256f"};case Xd:return{name:"SLH-DSA-SHAKE-128s"};case Qd:return{name:"SLH-DSA-SHAKE-128f"};case Zd:return{name:"SLH-DSA-SHAKE-192s"};case ep:return{name:"SLH-DSA-SHAKE-192f"};case tp:return{name:"SLH-DSA-SHAKE-256s"};case rp:return{name:"SLH-DSA-SHAKE-256f"}}return null}};wp=s([Er()],wp);xe.registerSingleton(Jo,wp);var gs,ys,bs,vs,ws,xs,As,Gi,xp=class extends Gt{get subjectName(){return $(this,ys,"f")||le(this,ys,new $n(this.asn.certificationRequestInfo.subject),"f"),$(this,ys,"f")}get subject(){return $(this,bs,"f")||le(this,bs,this.subjectName.toString(),"f"),$(this,bs,"f")}get signatureAlgorithm(){if(!$(this,vs,"f")){let e=xe.resolve(Fo);le(this,vs,e.toWebAlgorithm(this.asn.signatureAlgorithm),"f")}return $(this,vs,"f")}get signature(){return $(this,ws,"f")||le(this,ws,this.asn.signature,"f"),$(this,ws,"f")}get publicKey(){return $(this,xs,"f")||le(this,xs,new Jr(this.asn.certificationRequestInfo.subjectPKInfo,this.parseOptions),"f"),$(this,xs,"f")}get attributes(){return $(this,As,"f")||le(this,As,this.asn.certificationRequestInfo.attributes.map(e=>Xi.create(O.serialize(e),this.parseOptions)),"f"),$(this,As,"f")}get extensions(){if(!$(this,Gi,"f")){le(this,Gi,[],"f");let e=this.getAttribute(fs);e instanceof zs&&le(this,Gi,e.items,"f")}return $(this,Gi,"f")}get tbs(){return $(this,gs,"f")||le(this,gs,this.asn.certificationRequestInfoRaw||O.serialize(this.asn.certificationRequestInfo),"f"),$(this,gs,"f")}constructor(e,r){let n=Gt.isAsnEncoded(e)?[e,Un,r]:[e,r];super(n[0],n[1],n[2]),gs.set(this,void 0),ys.set(this,void 0),bs.set(this,void 0),vs.set(this,void 0),ws.set(this,void 0),xs.set(this,void 0),As.set(this,void 0),Gi.set(this,void 0),this.tag=Fe.CertificateRequestTag}onInit(e){}getAttribute(e){for(let r of this.attributes)if(r.type===e)return r;return null}getAttributes(e){return this.attributes.filter(r=>r.type===e)}getExtension(e){for(let r of this.extensions)if(r.type===e)return r;return null}getExtensions(e){return this.extensions.filter(r=>r.type===e)}async verify(e=st.get()){let r={...this.publicKey.algorithm,...this.signatureAlgorithm},n=await this.publicKey.export(r,["verify"],e),o=xe.resolveAll(Fs).reverse(),i=null;for(let c of o)if(i=c.toWebSignature(r,this.signature),i)break;if(!i)throw Error("Cannot convert WebCrypto signature value to ASN.1 format");return await e.subtle.verify(this.signatureAlgorithm,n,i,this.tbs)}toTextObject(){let e=this.toTextObjectEmpty(),r=O.parse(this.rawData,Un,this.parseOptions),n=r.certificationRequestInfo,o=new pe("",{Version:`${Vr[n.version]} (${n.version})`,Subject:this.subject,"Subject Public Key Info":this.publicKey});if(this.attributes.length){let i=new pe("");for(let a of this.attributes){let c=a.toTextObject();i[c[pe.NAME]]=c}o.Attributes=i}return e.Data=o,e.Signature=new pe("",{Algorithm:Tr.serializeAlgorithm(r.signatureAlgorithm),"":r.signature}),e}};gs=new WeakMap,ys=new WeakMap,bs=new WeakMap,vs=new WeakMap,ws=new WeakMap,xs=new WeakMap,As=new WeakMap,Gi=new WeakMap;xp.NAME="PKCS#10 Certificate Request";var Es,ks,Ss,Cs,Ts,Is,_s,Bs,Rs,Ms,Vi,Ps,en=class extends Gt{get publicKey(){return $(this,Ps,"f")||le(this,Ps,new Jr(this.asn.tbsCertificate.subjectPublicKeyInfo,this.parseOptions),"f"),$(this,Ps,"f")}get serialNumber(){return $(this,ks,"f")||le(this,ks,Kg(this.asn.tbsCertificate.serialNumber),"f"),$(this,ks,"f")}get subjectName(){return $(this,Ss,"f")||le(this,Ss,new $n(this.asn.tbsCertificate.subject),"f"),$(this,Ss,"f")}get subject(){return $(this,Cs,"f")||le(this,Cs,this.subjectName.toString(),"f"),$(this,Cs,"f")}get issuerName(){return $(this,Ts,"f")||le(this,Ts,new $n(this.asn.tbsCertificate.issuer),"f"),$(this,Ts,"f")}get issuer(){return $(this,Is,"f")||le(this,Is,this.issuerName.toString(),"f"),$(this,Is,"f")}get notBefore(){if(!$(this,_s,"f")){let e=this.asn.tbsCertificate.validity.notBefore.utcTime||this.asn.tbsCertificate.validity.notBefore.generalTime;if(!e)throw new Error("Cannot get 'notBefore' value");le(this,_s,e,"f")}return $(this,_s,"f")}get notAfter(){if(!$(this,Bs,"f")){let e=this.asn.tbsCertificate.validity.notAfter.utcTime||this.asn.tbsCertificate.validity.notAfter.generalTime;if(!e)throw new Error("Cannot get 'notAfter' value");le(this,Bs,e,"f")}return $(this,Bs,"f")}get signatureAlgorithm(){if(!$(this,Rs,"f")){let e=xe.resolve(Fo);le(this,Rs,e.toWebAlgorithm(this.asn.signatureAlgorithm),"f")}return $(this,Rs,"f")}get signature(){return $(this,Ms,"f")||le(this,Ms,this.asn.signatureValue,"f"),$(this,Ms,"f")}get extensions(){return $(this,Vi,"f")||(le(this,Vi,[],"f"),this.asn.tbsCertificate.extensions&&le(this,Vi,this.asn.tbsCertificate.extensions.map(e=>qe.create(O.serialize(e),this.parseOptions)),"f")),$(this,Vi,"f")}get tbs(){return $(this,Es,"f")||le(this,Es,this.asn.tbsCertificateRaw||O.serialize(this.asn.tbsCertificate),"f"),$(this,Es,"f")}constructor(e,r){let n=Gt.isAsnEncoded(e)?[e,Be,r]:[e,r];super(n[0],n[1],n[2]),Es.set(this,void 0),ks.set(this,void 0),Ss.set(this,void 0),Cs.set(this,void 0),Ts.set(this,void 0),Is.set(this,void 0),_s.set(this,void 0),Bs.set(this,void 0),Rs.set(this,void 0),Ms.set(this,void 0),Vi.set(this,void 0),Ps.set(this,void 0),this.tag=Fe.CertificateTag}onInit(e){}getExtension(e){for(let r of this.extensions)if(typeof e=="string"){if(r.type===e)return r}else if(r instanceof e)return r;return null}getExtensions(e){return this.extensions.filter(r=>typeof e=="string"?r.type===e:r instanceof e)}async verify(e={},r=st.get()){let n,o,i=e.publicKey;try{if(!i)n={...this.publicKey.algorithm,...this.signatureAlgorithm},o=await this.publicKey.export(n,["verify"],r);else if("publicKey"in i)n={...i.publicKey.algorithm,...this.signatureAlgorithm},o=await i.publicKey.export(n,["verify"],r);else if(i instanceof Jr)n={...i.algorithm,...this.signatureAlgorithm},o=await i.export(n,["verify"],r);else if(N.BufferSourceConverter.isBufferSource(i)){let u=new Jr(i);n={...u.algorithm,...this.signatureAlgorithm},o=await u.export(n,["verify"],r)}else n={...i.algorithm,...this.signatureAlgorithm},o=i}catch{return!1}let a=xe.resolveAll(Fs).reverse(),c=null;for(let u of a)if(c=u.toWebSignature(n,this.signature),c)break;if(!c)throw Error("Cannot convert ASN.1 signature value to WebCrypto format");let d=await r.subtle.verify(this.signatureAlgorithm,o,c,this.tbs);if(e.signatureOnly)return d;{let p=(e.date||new Date).getTime();return d&&this.notBefore.getTime()<p&&p<this.notAfter.getTime()}}async getThumbprint(e,r){let n,o="SHA-1";return e&&(typeof e=="object"&&"subtle"in e?n=e:(o=e,n=r)),n??(n=st.get()),await n.subtle.digest(o,this.rawData)}async isSelfSigned(e=st.get()){return this.subject===this.issuer&&await this.verify({signatureOnly:!0},e)}toTextObject(){let e=this.toTextObjectEmpty(),r=O.parse(this.rawData,Be,this.parseOptions),n=r.tbsCertificate,o=new pe("",{Version:`${Vr[n.version]} (${n.version})`,"Serial Number":n.serialNumber,"Signature Algorithm":Tr.serializeAlgorithm(n.signature),Issuer:this.issuer,Validity:new pe("",{"Not Before":n.validity.notBefore.getTime(),"Not After":n.validity.notAfter.getTime()}),Subject:this.subject,"Subject Public Key Info":this.publicKey});if(n.issuerUniqueID&&(o["Issuer Unique ID"]=n.issuerUniqueID),n.subjectUniqueID&&(o["Subject Unique ID"]=n.subjectUniqueID),this.extensions.length){let i=new pe("");for(let a of this.extensions){let c=a.toTextObject();i[c[pe.NAME]]=c}o.Extensions=i}return e.Data=o,e.Signature=new pe("",{Algorithm:Tr.serializeAlgorithm(r.signatureAlgorithm),"":r.signatureValue}),e}};Es=new WeakMap,ks=new WeakMap,Ss=new WeakMap,Cs=new WeakMap,Ts=new WeakMap,Is=new WeakMap,_s=new WeakMap,Bs=new WeakMap,Rs=new WeakMap,Ms=new WeakMap,Vi=new WeakMap,Ps=new WeakMap;en.NAME="Certificate";var zo,Ap=class extends Array{constructor(e,r){if(super(),zo.set(this,void 0),Gt.isAsnEncoded(e))this.import(e,r);else if(e instanceof en)this.push(e);else if(Array.isArray(e))for(let n of e)this.push(n)}export(e){let r=new jt;r.version=1,r.encapContentInfo.eContentType=nm,r.encapContentInfo.eContent=new So({single:new D}),r.certificates=new Sn(this.map(i=>new kn({certificate:O.parse(i.rawData,Be,$(this,zo,"f"))})));let n=new it({contentType:Jc,content:O.serialize(r)}),o=O.serialize(n);return e==="raw"?o:this.toString(e)}import(e,r){let n=Gt.toArrayBuffer(e),o=O.parse(n,it,r);if(o.contentType!==Jc)throw new TypeError("Cannot parse CMS package. Incoming data is not a SignedData object.");let i=O.parse(o.content,jt,r),a=[];for(let c of i.certificates||[])c.certificate&&a.push(new en(c.certificate,r));this.clear();for(let c of a)this.push(c);le(this,zo,r,"f")}clear(){for(;this.pop(););}toString(e="pem"){let r=this.export("raw");switch(e){case"pem":return Fe.encode(r,"CMS");case"pem-chain":return this.map(n=>n.toString("pem")).join(`
`);case"asn":return O.toString(r,$(this,zo,"f"));case"hex":return N.Convert.ToHex(r);case"base64":return N.Convert.ToBase64(r);case"base64url":return N.Convert.ToBase64Url(r);case"text":return Tr.serialize(this.toTextObject());default:throw TypeError("Argument 'format' is unsupported value")}}toTextObject(){let e=O.parse(this.export("raw"),it,$(this,zo,"f")),r=O.parse(e.content,jt,$(this,zo,"f"));return new pe("X509Certificates",{"Content Type":tr.toString(e.contentType),Content:new pe("",{Version:`${Ke[r.version]} (${r.version})`,Certificates:new pe("",{Certificate:this.map(o=>o.toTextObject())})})})}};zo=new WeakMap;var Sl=class{constructor(e={}){this.certificates=[],e.certificates&&(this.certificates=e.certificates)}async build(e,r=st.get()){let n=new Ap(e),o=e;for(;o=await this.findIssuer(o,r);){let i=await o.getThumbprint(r);for(let a of n){let c=await a.getThumbprint(r);if((0,N.isEqual)(i,c))throw new Error("Cannot build a certificate chain. Circular dependency.")}n.push(o)}return n}async findIssuer(e,r=st.get()){if(!await e.isSelfSigned(r)){let n=e.getExtension(Ia);for(let o of this.certificates)if(o.subject===e.issuer){if(n){if(n.keyId){let i=o.getExtension(Uc);if(i&&i.keyId!==n.keyId)continue}else if(n.certId){let i=o.getExtension(yi);if(i&&!(n.certId.serialNumber===o.serialNumber&&(0,N.isEqual)(O.serialize(n.certId.name),O.serialize(i))))continue}}try{let i={...o.publicKey.algorithm,...e.signatureAlgorithm},a=await o.publicKey.export(i,["verify"],r);if(!await e.verify({publicKey:a,signatureOnly:!0},r))continue}catch{continue}return o}}return null}};var Ns,Os,Ki,Wi,zi,Hg;(function(t){t[t.unspecified=0]="unspecified",t[t.keyCompromise=1]="keyCompromise",t[t.cACompromise=2]="cACompromise",t[t.affiliationChanged=3]="affiliationChanged",t[t.superseded=4]="superseded",t[t.cessationOfOperation=5]="cessationOfOperation",t[t.certificateHold=6]="certificateHold",t[t.removeFromCRL=8]="removeFromCRL",t[t.privilegeWithdrawn=9]="privilegeWithdrawn",t[t.aACompromise=10]="aACompromise"})(Hg||(Hg={}));var Cl=class extends Xr{get serialNumber(){return $(this,Ns,"f")||le(this,Ns,Kg(this.asn.userCertificate),"f"),$(this,Ns,"f")}get revocationDate(){return $(this,Os,"f")||le(this,Os,this.asn.revocationDate.getTime(),"f"),$(this,Os,"f")}get reason(){return $(this,Ki,"f")===void 0&&this.extensions,$(this,Ki,"f")}get invalidity(){return $(this,Wi,"f")===void 0&&this.extensions,$(this,Wi,"f")}get extensions(){return $(this,zi,"f")||(le(this,zi,[],"f"),this.asn.crlEntryExtensions&&le(this,zi,this.asn.crlEntryExtensions.map(e=>{let r=qe.create(O.serialize(e),this.parseOptions);switch(r.type){case Du:$(this,Ki,"f")===void 0&&le(this,Ki,O.parse(r.value,di,this.parseOptions).reason,"f");break;case Hu:$(this,Wi,"f")===void 0&&le(this,Wi,O.parse(r.value,fi,this.parseOptions).value,"f");break}return r}),"f")),$(this,zi,"f")}constructor(...e){let r,n;if(N.BufferSourceConverter.isBufferSource(e[0])?(r=N.BufferSourceConverter.toArrayBuffer(e[0]),n=e[1]):typeof e[0]=="string"?r=O.serialize(new Xt({userCertificate:Vg(e[0]),revocationDate:new Ie(e[1]),crlEntryExtensions:e[2]})):e[0]instanceof Xt&&(r=e[0],n=e[1]),!r)throw new TypeError("Cannot create X509CrlEntry instance. Wrong constructor arguments.");let o=r instanceof Xt?[r,n]:[r,Xt,n];super(o[0],o[1],o[2]),Ns.set(this,void 0),Os.set(this,void 0),Ki.set(this,void 0),Wi.set(this,void 0),zi.set(this,void 0)}onInit(e){}};Ns=new WeakMap,Os=new WeakMap,Ki=new WeakMap,Wi=new WeakMap,zi=new WeakMap;var Ds,Ls,js,Hs,Us,$s,Fi,Tl=class extends Gt{get version(){return this.asn.tbsCertList.version}get signatureAlgorithm(){if(!$(this,Ls,"f")){let e=xe.resolve(Fo);le(this,Ls,e.toWebAlgorithm(this.asn.signatureAlgorithm),"f")}return $(this,Ls,"f")}get signature(){return this.asn.signature}get issuer(){return this.issuerName.toString()}get issuerName(){return $(this,js,"f")||le(this,js,new $n(this.asn.tbsCertList.issuer),"f"),$(this,js,"f")}get thisUpdate(){if(!$(this,Hs,"f")){let e=this.asn.tbsCertList.thisUpdate.getTime();if(!e)throw new Error("Cannot get 'thisUpdate' value");le(this,Hs,e,"f")}return $(this,Hs,"f")}get nextUpdate(){var e;return $(this,Us,"f")===void 0&&le(this,Us,((e=this.asn.tbsCertList.nextUpdate)===null||e===void 0?void 0:e.getTime())||void 0,"f"),$(this,Us,"f")}get entries(){var e;return $(this,$s,"f")||le(this,$s,((e=this.asn.tbsCertList.revokedCertificates)===null||e===void 0?void 0:e.map(r=>new Cl(r,this.parseOptions)))||[],"f"),$(this,$s,"f")}get extensions(){return $(this,Fi,"f")||(le(this,Fi,[],"f"),this.asn.tbsCertList.crlExtensions&&le(this,Fi,this.asn.tbsCertList.crlExtensions.map(e=>qe.create(O.serialize(e),this.parseOptions)),"f")),$(this,Fi,"f")}get tbs(){return $(this,Ds,"f")||le(this,Ds,this.asn.tbsCertListRaw||O.serialize(this.asn.tbsCertList),"f"),$(this,Ds,"f")}get tbsCertListSignatureAlgorithm(){return this.asn.tbsCertList.signature}get certListSignatureAlgorithm(){return this.asn.signatureAlgorithm}constructor(e,r){let n=Gt.isAsnEncoded(e)?[e,An,r]:[e,r];super(n[0],n[1],n[2]),this.tag=Fe.CrlTag,Ds.set(this,void 0),Ls.set(this,void 0),js.set(this,void 0),Hs.set(this,void 0),Us.set(this,void 0),$s.set(this,void 0),Fi.set(this,void 0)}onInit(e){}getExtension(e){for(let r of this.extensions)if(typeof e=="string"){if(r.type===e)return r}else if(r instanceof e)return r;return null}getExtensions(e){return this.extensions.filter(r=>typeof e=="string"?r.type===e:r instanceof e)}async verify(e,r=st.get()){if(!this.certListSignatureAlgorithm.isEqual(this.tbsCertListSignatureAlgorithm))throw new Error("algorithm identifier in the sequence tbsCertList and CertificateList mismatch");let n,o,i=e.publicKey;try{i instanceof en?(n={...i.publicKey.algorithm,...i.signatureAlgorithm},o=await i.publicKey.export(n,["verify"])):i instanceof Jr?(n={...i.algorithm,...this.signatureAlgorithm},o=await i.export(n,["verify"])):(n={...i.algorithm,...this.signatureAlgorithm},o=i)}catch{return!1}let a=xe.resolveAll(Fs).reverse(),c=null;for(let d of a)if(c=d.toWebSignature(n,this.signature),c)break;if(!c)throw Error("Cannot convert ASN.1 signature value to WebCrypto format");return await r.subtle.verify(this.signatureAlgorithm,o,c,this.tbs)}async getThumbprint(e,r){let n,o="SHA-1";return e&&(typeof e=="object"&&"subtle"in e?n=e:(o=e,n=r)),n??(n=st.get()),await n.subtle.digest(o,this.rawData)}findRevoked(e){let r=typeof e=="string"?e:e.serialNumber,n=Vg(r);for(let o of this.asn.tbsCertList.revokedCertificates||[])if(N.BufferSourceConverter.isEqual(o.userCertificate,n))return new Cl(O.serialize(o),this.parseOptions);return null}};Ds=new WeakMap,Ls=new WeakMap,js=new WeakMap,Hs=new WeakMap,Us=new WeakMap,$s=new WeakMap,Fi=new WeakMap;qe.register(ui,yl);qe.register(pi,bl);qe.register(Dc,vl);qe.register(Uc,Yo);qe.register(Ia,qo);qe.register(yi,wl);qe.register(Oc,Yi);qe.register(Mc,Al);qe.register($u,El);Xi.register(jd,kl);Xi.register(fs,zs);xe.registerSingleton(Fs,mp);xe.registerSingleton(Fs,Zr);Zr.namedCurveSize.set("P-256",32);Zr.namedCurveSize.set("K-256",32);Zr.namedCurveSize.set("P-384",48);Zr.namedCurveSize.set("P-521",66);function Il(t){return sw.stubThis(t)}var sw={stubThis:t=>globalThis.fetch(t)};var zg={};async function Fg(t,e){if(!e)return!1;let{extensions:r}=t;if(!r)return!1;let{keyIdentifier:n,fromExtension:o}=await cw(e),i=t.extensions.find(d=>d instanceof qo);if(o&&i?.keyId&&i.keyId!==n)throw new Error(`Certificate's AuthorityKeyIdentifier did not match issuer's SubjectKeyIdentifier "${n}"`);let a=r.find(d=>d instanceof Yi),c=[];if(a?.distributionPoints?.forEach(d=>{d.distributionPoint?.fullName?.forEach(u=>{u.uniformResourceIdentifier&&c.push(u.uniformResourceIdentifier)})}),!(c.length>0))return!1;for(let d of c){let u=`${n}|${d}`,p=zg[u];if(p){let R=new Date;if(!p.nextUpdate||p.nextUpdate>R)return p.revokedCerts.indexOf(t.serialNumber)>=0}let h;try{h=await(await Il(d)).arrayBuffer()}catch{continue}let m;try{m=new Tl(h)}catch{continue}if(!await m.verify({publicKey:e.publicKey}))throw new Error(`CRL from ${d} failed signature verification against issuer "${e.subject}"`);let I=m.getExtension(qo);if(o&&I?.keyId&&I.keyId!==n)throw new Error(`CRL from ${d} contained an AuthorityKeyIdentifier that did not match issuer's SubjectKeyIdentifier "${n}"`);if(m.nextUpdate&&(zg[u]={revokedCerts:m.entries.map(R=>R.serialNumber),nextUpdate:m.nextUpdate}),m.findRevoked(t))return!0}return!1}async function cw(t){let e=t.extensions?.find(n=>n instanceof Yo);return e?.keyId?{keyIdentifier:e.keyId,fromExtension:!0}:{keyIdentifier:(await Yo.create(t.publicKey)).keyId,fromExtension:!1}}function qg(t){let e;try{e=et.decodeFirst(t)}catch(r){let n=r;throw new Error(`Error decoding authenticator extensions: ${n.message}`)}return Yg(e)}function Yg(t){let e={};for(let[r,n]of t)n instanceof Map?e[r]=Yg(n):e[r]=n;return e}function _l(t){if(t.byteLength<37)throw new Error(`Authenticator data was ${t.byteLength} bytes, expected at least 37 bytes`);let e=0,r=J.toDataView(t),n=t.slice(e,e+=32),o=t.slice(e,e+=1),i=o[0],a={up:!!(i&1),uv:!!(i&4),be:!!(i&8),bs:!!(i&16),at:!!(i&64),ed:!!(i&128),flagsInt:i},c=t.slice(e,e+4),d=r.getUint32(e,!1);e+=4;let u,p,h;if(a.at){u=t.slice(e,e+=16);let I=r.getUint16(e);e+=2,p=t.slice(e,e+=I);let C=J.fromHex("a301634f4b500327206745643235353139"),R=t.slice(e,e+C.byteLength),S=!1;J.areEqual(C,R)&&(S=!0,t[e]=164);let x=et.decodeFirst(t.slice(e)),L=Uint8Array.from(et.encode(x));S&&(t[e]=163),h=L,e+=L.byteLength}let m,k;if(a.ed){let I=et.decodeFirst(t.slice(e));k=Uint8Array.from(et.encode(I)),m=qg(k),e+=k.byteLength}if(t.byteLength>e)throw new Error("Leftover bytes detected while parsing authenticator data");return lw.stubThis({rpIdHash:n,flagsBuf:o,flags:a,counter:d,counterBuf:c,aaguid:u,credentialID:p,credentialPublicKey:h,extensionsData:m,extensionsDataBuffer:k})}var lw={stubThis:t=>t};function xt(t,e=-7){return typeof t=="string"&&(t=J.fromUTF8String(t)),cr.digest(t,e)}var R8=na(qu(),1);function Xo(t){if([W.EdDSA].indexOf(t)>=0)return"Ed25519";if([W.ES256,W.ES384,W.ES512,W.ES256K].indexOf(t)>=0)return"ECDSA";if([W.RS256,W.RS384,W.RS512,W.RS1].indexOf(t)>=0)return"RSASSA-PKCS1-v1_5";if([W.PS256,W.PS384,W.PS512].indexOf(t)>=0)return"RSA-PSS";if([W.ML_DSA_44].indexOf(t)>=0)return"ML-DSA-44";if([W.ML_DSA_65].indexOf(t)>=0)return"ML-DSA-65";if([W.ML_DSA_87].indexOf(t)>=0)return"ML-DSA-87";throw new Error(`Could not map COSE alg value of ${t} to a WebCrypto key alg name`)}var rr=class extends Error{constructor({message:e,code:r,cause:n}){super(e,{cause:n}),Object.defineProperty(this,"code",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.name="SimpleWebAuthnError",this.code=r}},Gn=class extends rr{constructor(e){let n=`This runtime's WebCrypto.subtle does not support use of ${Xo(e)}`;super({message:n,code:"RUNTIME_NO_PQC_SUPPORT"})}};async function Ze(t,e=[]){if(e.length===0)return!0;let r=e.map(u=>{try{return new en(u)}catch(p){throw new rr({message:`Could not parse trust anchor certificate:
${u}`,code:"CERTIFICATE_PATH_VERIFICATION_FAILED",cause:p})}}),n=[];for(let u=0;u<r.length;u++){let p=r[u];try{Jg(p)}catch{continue}n.push(p)}if(n.length===0)throw new rr({message:"No specified trust anchor was valid for verifying x5c",code:"CERTIFICATE_PATH_VERIFICATION_FAILED"});let o=t.map(u=>new en(u)),i=o[0],a=[];o.length>1&&(a=o.slice(1));let c=!0,d;for(let u of n)try{let p=o.concat([u]);if(new Set(p.map(x=>x.toString("pem"))).size!==p.length)throw new rr({message:"Invalid certificate path: found duplicate certificates",code:"CERTIFICATE_PATH_VERIFICATION_FAILED"});let k=await new Sl({certificates:[...a,u]}).build(i),C=k[k.length-1].equal(u),R=!1;if(!C&&k.length>1&&(R=await k[k.length-2].verify({publicKey:u.publicKey,signatureOnly:!0})),!(C||R))continue;R&&(k[k.length-1]=u),c=!1,d=k;break}catch(p){throw new rr({message:"Unexpected error while validating certificate path",code:"CERTIFICATE_PATH_VERIFICATION_FAILED",cause:p})}if(d)for(let u=0;u<d.length;u++){let p=d[u];try{Jg(p)}catch{throw new rr({message:`Found certificate out of validity period:
${p.toString()}`,code:"CERTIFICATE_PATH_VERIFICATION_FAILED"})}let h;u<d.length-1?h=d[u+1]:await p.isSelfSigned()&&(h=p);try{await uw(p,h)}catch(m){throw new rr({message:`The following certificate failed revocation status check
${p.toString()}`,code:"CERTIFICATE_PATH_VERIFICATION_FAILED",cause:m})}}else c=!0;if(c)throw new rr({message:"x5c could not be chained to any specified trust anchor",code:"CERTIFICATE_PATH_VERIFICATION_FAILED"});return!0}async function uw(t,e){if(await Fg(t,e))throw new Error("Found revoked certificate in certificate path")}function Jg(t){let{notBefore:e,notAfter:r}=t,n=new Date(Date.now());if(e>n||r<n)throw new Error("Certificate is not yet valid or expired")}function Xg(t){let e;if(t===Bo)e=W.ES256;else if(t===Ro)e=W.ES384;else if(t===Mo)e=W.ES512;else if(t===Pi)e=W.RS256;else if(t===Pn)e=W.RS384;else if(t===Nn)e=W.RS512;else if(t===Mn)e=W.RS1;else if(t===Vo)e=W.ML_DSA_44;else if(t===Ko)e=W.ML_DSA_65;else if(t===Wo)e=W.ML_DSA_87;else throw new Error(`Unable to map X.509 signature algorithm ${t} to a COSE algorithm`);return e}function Bl(t){let e=new Map,r=ke.parse(t,Be),{tbsCertificate:n}=r,{subjectPublicKeyInfo:o}=n,i=o.algorithm.algorithm;if(i===zr){if(!o.algorithm.parameters)throw new Error("Certificate public key was missing parameters (EC2)");let a=ke.parse(new Uint8Array(o.algorithm.parameters),Ht),c,d,{namedCurve:u}=a;if(u===es)c=W.ES256,d=Ye.P256;else if(u===ts)c=W.ES384,d=Ye.P384;else throw new Error(`Certificate public key contained unexpected namedCurve ${u} (EC2)`);let p=new Uint8Array(o.subjectPublicKey),h,m;if(p[0]===4){let I=1,C=(p.length-1)/2;h=p.slice(I,I+=C),m=p.slice(I)}else throw new Error('TODO: Figure out how to handle public keys in "compressed form"');let k=new Map;k.set(Z.kty,tt.EC2),k.set(Z.alg,c),k.set(Z.crv,d),k.set(Z.x,h),k.set(Z.y,m),e=k}else if(i===Ut){let a=ke.parse(o.subjectPublicKey,Dn),c=new Map;c.set(Z.kty,tt.RSA),c.set(Z.alg,W.RS256),c.set(Z.n,new Uint8Array(a.modulus)),c.set(Z.e,new Uint8Array(a.publicExponent)),e=c}else if([Vo,Ko,Wo].indexOf(i)>=0){let a=new Map;a.set(Z.kty,tt.AKP),a.set(Z.alg,Xg(i)),a.set(Z.pub,new Uint8Array(o.subjectPublicKey)),e=a}else throw new Error(`Certificate public key contained unexpected algorithm ID ${i}`);return e}function At(t){let{signature:e,data:r,credentialPublicKey:n,x509Certificate:o,hashAlgorithm:i}=t;if(!o&&!n)throw new Error('Must declare either "leafCert" or "credentialPublicKey"');if(o&&n)throw new Error('Must not declare both "leafCert" and "credentialPublicKey"');let a=new Map;return n?a=sr(n):o&&(a=Bl(o)),dw.stubThis(cr.verify({cosePublicKey:a,signature:e,data:r,shaHashOverride:i}))}var dw={stubThis:t=>t};function Qg(t){let e=t.split(".");return[JSON.parse(oe.toUTF8String(e[0])),JSON.parse(oe.toUTF8String(e[1])),e[2]]}function Zg(t){let e;if(t==="ES256")e=W.ES256;else if(t==="ES384")e=W.ES384;else if(t==="ES512")e=W.ES512;else if(t==="RS256")e=W.RS256;else if(t==="RS384")e=W.RS384;else if(t==="RS512")e=W.RS512;else throw new Error(`Unable to map JWS algorithm "${t}" to a COSE algorithm`);return e}async function Vn(t){let e=await ct(),{keyData:r,algorithm:n}=t;return e.subtle.importKey("jwk",r,n,!1,["verify"])}async function Rl(t){let{cosePublicKey:e,signature:r,data:n,shaHashOverride:o}=t,i=await ct(),a=e.get(Z.alg),c=e.get(Z.crv),d=e.get(Z.x),u=e.get(Z.y);if(!a)throw new Error("Public key was missing alg (EC2)");if(!c)throw new Error("Public key was missing crv (EC2)");if(!d)throw new Error("Public key was missing x (EC2)");if(!u)throw new Error("Public key was missing y (EC2)");let p;if(c===Ye.P256)p="P-256";else if(c===Ye.P384)p="P-384";else if(c===Ye.P521)p="P-521";else throw new Error(`Unexpected COSE crv value of ${c} (EC2)`);let h={kty:"EC",crv:p,x:oe.fromBuffer(d),y:oe.fromBuffer(u),ext:!1},k=await Vn({keyData:h,algorithm:{name:"ECDSA",namedCurve:p}}),I=cn(a);o&&(I=cn(o));let C={name:"ECDSA",hash:{name:I}};return i.subtle.verify(C,k,r,n)}async function Ml(t){let{cosePublicKey:e,signature:r,data:n,shaHashOverride:o}=t,i=await ct(),a=e.get(Z.alg),c=e.get(Z.n),d=e.get(Z.e);if(!a)throw new Error("Public key was missing alg (RSA)");if(!Tt(a))throw new Error(`Public key had invalid alg ${a} (RSA)`);if(!c)throw new Error("Public key was missing n (RSA)");if(!d)throw new Error("Public key was missing e (RSA)");let u={kty:"RSA",alg:"",n:oe.fromBuffer(c),e:oe.fromBuffer(d),ext:!1},p={name:Xo(a),hash:{name:cn(a)}},h={name:Xo(a)};if(o&&(p.hash.name=cn(o)),p.name==="RSASSA-PKCS1-v1_5")p.hash.name==="SHA-256"?u.alg="RS256":p.hash.name==="SHA-384"?u.alg="RS384":p.hash.name==="SHA-512"?u.alg="RS512":p.hash.name==="SHA-1"&&(u.alg="RS1");else if(p.name==="RSA-PSS"){let k=0;p.hash.name==="SHA-256"?(u.alg="PS256",k=32):p.hash.name==="SHA-384"?(u.alg="PS384",k=48):p.hash.name==="SHA-512"&&(u.alg="PS512",k=64),h.saltLength=k}else throw new Error(`Unexpected RSA key algorithm ${a} (${p.name})`);let m=await Vn({keyData:u,algorithm:p});return i.subtle.verify(h,m,r,n)}function ey(t,e){let[r,n,o]=t.split("."),i=Bl(e),a=J.fromUTF8String(`${r}.${n}`),c=oe.toBuffer(o),d=JSON.parse(oe.toUTF8String(r)),u=Zg(d.alg);if(sn(i))return Rl({data:a,signature:c,cosePublicKey:i,shaHashOverride:u});if(ni(i))return Ml({data:a,signature:c,cosePublicKey:i,shaHashOverride:u});let p=i.get(Z.kty);throw new Error(`JWT verification with public key of kty ${p} is not supported by this method`)}function ty(t){let e=t.replace("-----BEGIN CERTIFICATE-----","").replace("-----END CERTIFICATE-----","").replace(/[\n ]/g,"");return oe.toBuffer(e,"base64")}async function ry(t){let e=Qg(t),r=e[0],n=e[1],o=r.x5c.map(je);try{let m=Et.getRootCertificates({identifier:"mds"});await Ze(o,m)}catch(m){let k=m;throw new Error("BLOB certificate path could not be validated",{cause:k})}let i=o[0];if(!await ey(t,ty(i)))throw new Error("BLOB signature could not be verified");let c=[];for(let m of n.entries)m.aaguid&&m.metadataStatement&&c.push(m.metadataStatement);let[d,u,p]=n.nextUpdate.split("-"),h=new Date(parseInt(d,10),parseInt(u,10)-1,parseInt(p,10));return{statements:c,parsedNextUpdate:h,payload:n}}async function ny(t){let{cosePublicKey:e,signature:r,data:n}=t,o=await ct(),i=e.get(Z.alg),a=e.get(Z.pub);if(!i)throw new Error("Public key was missing alg (AKP)");if(!Tt(i))throw new Error(`Public key had invalid alg ${i} (AKP)`);if(!a)throw new Error("Public key was missing pub (AKP)");let c=Xo(i),d={kty:"AKP",alg:c,pub:oe.fromBuffer(a),ext:!1},u;try{u=await Vn({keyData:d,algorithm:c})}catch(p){throw p.name==="NotSupportedError"?new Gn(i):p}return o.subtle.verify(c,u,r,n)}async function oy(t){let{cosePublicKey:e,signature:r,data:n}=t,o=await ct(),i=e.get(Z.alg),a=e.get(Z.crv),c=e.get(Z.x);if(!i)throw new Error("Public key was missing alg (OKP)");if(!Tt(i))throw new Error(`Public key had invalid alg ${i} (OKP)`);if(!a)throw new Error("Public key was missing crv (OKP)");if(!c)throw new Error("Public key was missing x (OKP)");let d;if(a===Ye.ED25519)d="Ed25519";else throw new Error(`Unexpected COSE crv value of ${a} (OKP)`);let u={kty:"OKP",crv:d,alg:"EdDSA",x:oe.fromBuffer(c),ext:!1},h=await Vn({keyData:u,algorithm:{name:d,namedCurve:d}}),m={name:d};return o.subtle.verify(m,h,r,n)}function ay(t,e){let r=ke.parse(t,Fr),n=new Uint8Array(r.r),o=new Uint8Array(r.s),i=pw(e),a=iy(n,i),c=iy(o,i);return J.concat([a,c])}function pw(t){switch(t){case Ye.P256:return 32;case Ye.P384:return 48;case Ye.P521:return 66;default:throw new Error(`Unexpected COSE crv value of ${t} (EC2)`)}}function iy(t,e){let r;if(t.length<e)r=new Uint8Array(e),r.set(t,e-t.length);else if(t.length===e)r=t;else if(t.length===e+1&&t[0]===0&&(t[1]&128)===128)r=t.subarray(1);else throw new Error(`Invalid signature component length ${t.length}, expected ${e}`);return r}function sy(t){let{cosePublicKey:e,signature:r,data:n,shaHashOverride:o}=t;if(sn(e)){let a=e.get(Z.crv);if(!ef(a))throw new Error(`unknown COSE curve ${a}`);let c=ay(r,a);return Rl({cosePublicKey:e,signature:c,data:n,shaHashOverride:o})}else{if(ni(e))return Ml({cosePublicKey:e,signature:r,data:n,shaHashOverride:o});if(Qp(e))return oy({cosePublicKey:e,signature:r,data:n});if(Zp(e))return ny({cosePublicKey:e,signature:r,data:n})}let i=e.get(Z.kty);throw new Error(`Signature verification with public key of kty ${i} is not supported by this method`)}var J={};Kt(J,{areEqual:()=>fw,concat:()=>gw,fromASCIIString:()=>vw,fromHex:()=>mw,fromUTF8String:()=>bw,toDataView:()=>ww,toHex:()=>hw,toUTF8String:()=>yw});function fw(t,e){return t.length!=e.length?!1:t.every((r,n)=>r===e[n])}function hw(t){return Array.from(t,r=>r.toString(16).padStart(2,"0")).join("")}function mw(t){if(!t)return Uint8Array.from([]);if(!(t.length!==0&&t.length%2===0&&!/[^a-fA-F0-9]/u.test(t)))throw new Error("Invalid hex string");let r=t.match(/.{1,2}/g)??[];return Uint8Array.from(r.map(n=>parseInt(n,16)))}function gw(t){let e=0,r=t.reduce((o,i)=>o+i.length,0),n=new Uint8Array(r);return t.forEach(o=>{n.set(o,e),e+=o.length}),n}function yw(t){return new globalThis.TextDecoder("utf-8").decode(t)}function bw(t){return new globalThis.TextEncoder().encode(t)}function vw(t){return Uint8Array.from(t.split("").map(e=>e.charCodeAt(0)))}function ww(t){return new DataView(t.buffer,t.byteOffset,t.length)}function je(t){let e;if(typeof t=="string")if(oe.isBase64URL(t))e=oe.toBase64(t);else if(oe.isBase64(t))e=t;else throw new Error("Certificate is not a valid base64 or base64url string");else e=oe.fromBuffer(t,"base64");let r="";for(let n=0;n<Math.ceil(e.length/64);n+=1){let o=64*n;r+=`${e.substr(o,64)}
`}return r=`-----BEGIN CERTIFICATE-----
${r}-----END CERTIFICATE-----
`,r}function cy(t){let e=globalThis.SubtleCrypto;if(typeof e.supports!="function")return!1;try{return e.supports("verify",t)}catch{return!1}}var ly=`-----BEGIN CERTIFICATE-----
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
`;var uy=`-----BEGIN CERTIFICATE-----
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
`,dy=`-----BEGIN CERTIFICATE-----
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
`,py=`
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
`,fy=`
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
`;var hy=`-----BEGIN CERTIFICATE-----
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
`;var my=`-----BEGIN CERTIFICATE-----
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
 `,gy=`-----BEGIN CERTIFICATE-----
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
`;var Ep=class{constructor(){Object.defineProperty(this,"pemCertificates",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_runtimeSupportsPQC",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.pemCertificates=new Map}setRootCertificates(e){let{identifier:r,certificates:n}=e,o=[];for(let i of n)i instanceof Uint8Array?o.push(je(i)):o.push(i);this.pemCertificates.set(r,o)}getRootCertificates(e){let{identifier:r}=e;return this.pemCertificates.get(r)??[]}runtimeSupportsPQC(){return this._runtimeSupportsPQC??=cy("ML-DSA-44"),this._runtimeSupportsPQC}},Et=new Ep;Et.setRootCertificates({identifier:"android-key",certificates:[uy,dy,py,fy]});Et.setRootCertificates({identifier:"android-safetynet",certificates:[ly]});Et.setRootCertificates({identifier:"apple",certificates:[hy]});Et.setRootCertificates({identifier:"mds",certificates:[my,gy]});var xw={residentKey:"preferred",userVerification:"preferred"};function kp(){return Et.runtimeSupportsPQC()?[W.ML_DSA_44,W.EdDSA,W.ES256,W.RS256]:[W.EdDSA,W.ES256,W.RS256]}async function yy(t){let{rpName:e,rpID:r,userName:n,userID:o,challenge:i=await rc(),userDisplayName:a="",timeout:c=6e4,attestationType:d="none",excludeCredentials:u=[],authenticatorSelection:p=xw,extensions:h,supportedAlgorithmIDs:m=kp(),preferredAuthenticatorType:k}=t,I=m.map(x=>({alg:x,type:"public-key"}));p.residentKey===void 0?p.requireResidentKey&&(p.residentKey="required"):p.requireResidentKey=p.residentKey==="required";let C=i;if(typeof C=="string"&&(C=J.fromUTF8String(C)),typeof o=="string")throw new Error("String values for `userID` are no longer supported. See https://simplewebauthn.dev/docs/advanced/server/custom-user-ids");let R=o;R||(R=await of());let S=[];return k&&(k==="securityKey"?(S.push("security-key"),p.authenticatorAttachment="cross-platform"):k==="localDevice"?(S.push("client-device"),p.authenticatorAttachment="platform"):k==="remoteDevice"&&(S.push("hybrid"),p.authenticatorAttachment="cross-platform")),{challenge:oe.fromBuffer(C),rp:{name:e,id:r},user:{id:oe.fromBuffer(R),name:n,displayName:a},pubKeyCredParams:I,timeout:c,attestation:d,excludeCredentials:u.map(x=>{if(!oe.isBase64URL(x.id))throw new Error(`excludeCredential id "${x.id}" is not a valid base64url string`);return{...x,id:oe.trimPadding(x.id),type:"public-key"}}),authenticatorSelection:p,extensions:{...h,credProps:!0},hints:S}}function Pl({be:t,bs:e}){let r=e,n="singleDevice";if(t&&(n="multiDevice"),n==="singleDevice"&&r)throw new Sp("Single-device credential indicated that it was backed up, which should be impossible.");return{credentialDeviceType:n,credentialBackedUp:r}}var Sp=class extends Error{constructor(e){super(e),this.name="InvalidBackupFlags"}};async function Nl(t,e){try{return await Promise.any(e.map(n=>new Promise((o,i)=>{xt(J.fromASCIIString(n)).then(a=>{J.areEqual(t,a)?o(n):i()})})))}catch(r){throw r.name==="AggregateError"?new Cp:r}}var Cp=class extends Error{constructor(){super("Unexpected RP ID hash"),this.name="UnexpectedRPIDHash"}};async function by(t){let{attStmt:e,clientDataHash:r,rpIdHash:n,credentialID:o,credentialPublicKey:i,aaguid:a,rootCertificates:c}=t,d=Uint8Array.from([0]),u=oi(i),p=J.concat([d,n,r,o,u]),h=e.get("sig"),m=e.get("x5c");if(!m)throw new Error("No attestation certificate provided in attestation statement (FIDOU2F)");if(!h)throw new Error("No attestation signature provided in attestation statement (FIDOU2F)");let k=Number.parseInt(J.toHex(a),16);if(k!==0)throw new Error(`AAGUID "${k}" was not expected value`);try{await Ze(m.map(je),c)}catch(I){let C=I;throw new Error(`${C.message} (FIDOU2F)`)}return At({signature:h,data:p,x509Certificate:m[0],hashAlgorithm:W.ES256})}var vy="1.3.6.1.4.1.45724.1.1.4";function Ol(t,e){if(!t)return!0;let r=t.find(a=>a.extnID===vy);if(!r)return!0;let n=ke.parse(r.extnValue,D),o=new Uint8Array(n.buffer);if(!J.areEqual(e,o)){let a=J.toHex(o),c=J.toHex(e);throw new Error(`Certificate extension id-fido-gen-ce-aaguid (${vy}) value of "${a}" was present but not equal to attestation statement AAGUID value of "${c}"`)}return!0}var Dl={debug(){},info(){},warn(){},error(){}};function wy(t){let e={...Dl};return t.debug&&(e.debug=t.debug),t.info&&(e.info=t.info),t.warn&&(e.warn=t.warn),t.error&&(e.error=t.error),e}var Aw={url:"",no:0,nextUpdate:new Date(0)},Ew="https://mds.fidoalliance.org/",kt;(function(t){t[t.DISABLED=0]="DISABLED",t[t.REFRESHING=1]="REFRESHING",t[t.READY=2]="READY"})(kt||(kt={}));var Tp=class{constructor(){Object.defineProperty(this,"mdsCache",{enumerable:!0,configurable:!0,writable:!0,value:{}}),Object.defineProperty(this,"statementCache",{enumerable:!0,configurable:!0,writable:!0,value:{}}),Object.defineProperty(this,"state",{enumerable:!0,configurable:!0,writable:!0,value:kt.DISABLED}),Object.defineProperty(this,"verificationMode",{enumerable:!0,configurable:!0,writable:!0,value:"strict"}),Object.defineProperty(this,"logger",{enumerable:!0,configurable:!0,writable:!0,value:Dl})}async initialize(e={}){this.statementCache={};let{mdsServers:r=[Ew],statements:n,verificationMode:o,logger:i=Dl}=e;if(this.logger=wy(i),this.setState(kt.REFRESHING),n?.length){let a=0;n.forEach(c=>{c.aaguid&&(this.statementCache[c.aaguid]={entry:{metadataStatement:c,statusReports:[],timeOfLastStatusChange:"1970-01-01"},url:Aw.url},a+=1)}),this.logger.info(`Cached ${a} local statements`)}if(r?.length){let a=Object.keys(this.statementCache).length,c=r.length;for(let p of r)try{let h={url:p,no:0,nextUpdate:new Date(0)},m=await this.downloadBlob(h);await this.verifyBlob(m,h)}catch(h){this.logger.error(`Could not download BLOB from ${p}:`,h),c-=1}let u=Object.keys(this.statementCache).length-a;this.logger.info(`Cached ${u} statements from ${c} metadata server(s)`)}o&&(this.verificationMode=o),this.setState(kt.READY)}async getStatement(e){if(this.state===kt.DISABLED||!e)return;e instanceof Uint8Array&&(e=ec(e)),await this.pauseUntilReady();let r=this.statementCache[e];if(!r){if(this.verificationMode==="strict")throw new Error(`No metadata statement found for aaguid "${e}"`);return}if(r.url){let o=this.mdsCache[r.url];if(new Date>o.nextUpdate)try{this.setState(kt.REFRESHING);let a=await this.downloadBlob(o);await this.verifyBlob(a,o)}finally{this.setState(kt.READY)}}let{entry:n}=r;for(let o of n.statusReports){let{status:i}=o;if(i==="USER_VERIFICATION_BYPASS"||i==="ATTESTATION_KEY_COMPROMISE"||i==="USER_KEY_REMOTE_COMPROMISE"||i==="USER_KEY_PHYSICAL_COMPROMISE")throw new Error(`Detected compromised aaguid "${e}"`)}return n.metadataStatement}async downloadBlob(e){let{url:r}=e;return await(await Il(r)).text()}async verifyBlob(e,r){let{url:n,no:o}=r,{payload:i,parsedNextUpdate:a}=await ry(e);if(i.no<=o)throw new Error(`Latest BLOB no. ${i.no} is not greater than previous no. ${o}`);for(let c of i.entries)c.aaguid&&(this.statementCache[c.aaguid]={entry:c,url:n});n?this.mdsCache[n]={...r,no:i.no,nextUpdate:a}:a<new Date&&this.logger.warn(`\u26A0\uFE0F This MDS blob (serial: ${i.no}) contains stale data as of ${a.toISOString()}. Please consider re-initializing MetadataService with a newer MDS blob.`)}pauseUntilReady(){return this.state===kt.READY?new Promise(r=>{r()}):new Promise((r,n)=>{let a=700,c=globalThis.setInterval(()=>{a<1?(clearInterval(c),n(`State did not become ready in ${7e4/1e3} seconds`)):this.state===kt.READY&&(clearInterval(c),r()),a-=1},100)})}setState(e){this.state=e,e===kt.DISABLED?this.logger.debug("MetadataService is DISABLED"):e===kt.REFRESHING?this.logger.debug("MetadataService is REFRESHING"):e===kt.READY&&this.logger.debug("MetadataService is READY")}},Kn=new Tp;async function Wn({statement:t,credentialPublicKey:e,x5c:r,attestationStatementAlg:n}){let{authenticationAlgorithms:o,authenticatorGetInfo:i,attestationRootCertificates:a}=t,c=new Set;o.forEach(R=>{let S=xy[R];S&&c.add(S)});let d=sr(e),u=d.get(Z.kty),p=d.get(Z.alg);if(!u)throw new Error("Credential public key was missing kty");if(!p)throw new Error("Credential public key was missing alg");if(!u)throw new Error("Credential public key was missing kty");let h={kty:u,alg:p};if(sn(d)){let R=d.get(Z.crv);h.crv=R}let m=!1;for(let R of c)if(R.alg===h.alg&&R.kty===h.kty&&((R.kty===tt.EC2||R.kty===tt.OKP)&&(R.crv,h.crv),m=!0),m)break;if(!m){let R=o.map(L=>`'${L}' (COSE info: ${Ay(xy[L])})`),S=JSON.stringify(R,null,2).replace(/"/g,""),x=Ay(h);throw new Error(`Public key parameters ${x} did not match any of the following metadata algorithms:
${S}`)}if(n!==void 0&&i?.algorithms!==void 0){let R=i.algorithms.map(S=>S.alg);if(R.indexOf(n)<0)throw new Error(`Attestation statement alg ${n} did not match one of ${R}`)}let k=r.map(je),I=a.map(je),C=!1;return k.length===1&&I.indexOf(k[0])>=0&&(C=!0),C||await Ze(k,I),!0}var xy={secp256r1_ecdsa_sha256_raw:{kty:2,alg:-7,crv:1},secp256r1_ecdsa_sha256_der:{kty:2,alg:-7,crv:1},rsassa_pss_sha256_raw:{kty:3,alg:-37},rsassa_pss_sha256_der:{kty:3,alg:-37},secp256k1_ecdsa_sha256_raw:{kty:2,alg:-47,crv:8},secp256k1_ecdsa_sha256_der:{kty:2,alg:-47,crv:8},rsassa_pss_sha384_raw:{kty:3,alg:-38},rsassa_pkcsv15_sha256_raw:{kty:3,alg:-257},rsassa_pkcsv15_sha384_raw:{kty:3,alg:-258},rsassa_pkcsv15_sha512_raw:{kty:3,alg:-259},rsassa_pkcsv15_sha1_raw:{kty:3,alg:-65535},secp384r1_ecdsa_sha384_raw:{kty:2,alg:-35,crv:2},secp512r1_ecdsa_sha256_raw:{kty:2,alg:-36,crv:3},ed25519_eddsa_sha512_raw:{kty:1,alg:-8,crv:6}};function Ay(t){let{kty:e,alg:r,crv:n}=t,o="";return e!==tt.RSA?o=`{ kty: ${e}, alg: ${r}, crv: ${n} }`:o=`{ kty: ${e}, alg: ${r} }`,o}async function Ey(t){let{attStmt:e,clientDataHash:r,authData:n,credentialPublicKey:o,aaguid:i,rootCertificates:a}=t,c=e.get("sig"),d=e.get("x5c"),u=e.get("alg");if(!c)throw new Error("No attestation signature provided in attestation statement (Packed)");if(!u)throw new Error("Attestation statement did not contain alg (Packed)");if(!Tt(u))throw new Error(`Attestation statement contained invalid alg ${u} (Packed)`);let p=J.concat([n,r]),h=!1;if(d){let{subject:m,basicConstraintsCA:k,version:I,notBefore:C,notAfter:R,parsedCertificate:S}=bi(d[0]),{OU:x,CN:L,O:Y,C:V}=m;if(x!=="Authenticator Attestation")throw new Error('Certificate OU was not "Authenticator Attestation" (Packed|Full)');if(!L)throw new Error("Certificate CN was empty (Packed|Full)");if(!Y)throw new Error("Certificate O was empty (Packed|Full)");if(!V||V.length!==2)throw new Error("Certificate C was not two-character ISO 3166 code (Packed|Full)");if(k)throw new Error("Certificate basic constraints CA was not `false` (Packed|Full)");if(I!==2)throw new Error("Certificate version was not `3` (ASN.1 value of 2) (Packed|Full)");let ie=new Date;if(C>ie)throw new Error(`Certificate not good before "${C.toString()}" (Packed|Full)`);if(ie=new Date,R<ie)throw new Error(`Certificate not good after "${R.toString()}" (Packed|Full)`);try{await Ol(S.tbsCertificate.extensions,i)}catch(H){let g=H;throw new Error(`${g.message} (Packed|Full)`)}let ne=await Kn.getStatement(i);if(ne){if(ne.attestationTypes.indexOf("basic_full")<0)throw new Error("Metadata does not indicate support for full attestations (Packed|Full)");try{await Wn({statement:ne,credentialPublicKey:o,x5c:d,attestationStatementAlg:u})}catch(H){let g=H;throw new Error(`${g.message} (Packed|Full)`)}}else try{await Ze(d.map(je),a)}catch(H){let g=H;throw new Error(`${g.message} (Packed|Full)`,{cause:g})}h=await At({signature:c,data:p,x509Certificate:d[0],hashAlgorithm:u})}else h=await At({signature:c,data:p,credentialPublicKey:o,hashAlgorithm:u});return h}async function ky(t){let{attStmt:e,clientDataHash:r,authData:n,aaguid:o,rootCertificates:i,verifyTimestampMS:a=!0,credentialPublicKey:c,attestationSafetyNetEnforceCTSCheck:d}=t,u=e.get("alg"),p=e.get("response");if(!e.get("ver"))throw new Error("No ver value in attestation (SafetyNet)");if(!p)throw new Error("No response was included in attStmt by authenticator (SafetyNet)");let k=J.toUTF8String(p).split("."),I=JSON.parse(oe.toUTF8String(k[0])),C=JSON.parse(oe.toUTF8String(k[1])),R=k[2],{nonce:S,ctsProfileMatch:x,timestampMs:L}=C;if(a){let B=Date.now();if(L>Date.now())throw new Error(`Payload timestamp "${L}" was later than "${B}" (SafetyNet)`);let M=L+60*1e3;if(B=Date.now(),M<B)throw new Error(`Payload timestamp "${M}" has expired (SafetyNet)`)}let Y=J.concat([n,r]),V=await xt(Y),ie=oe.fromBuffer(V,"base64");if(S!==ie)throw new Error("Could not verify payload nonce (SafetyNet)");if(d&&!x)throw new Error("Could not verify device integrity (SafetyNet)");let ne=oe.toBuffer(I.x5c[0],"base64"),H=bi(ne),{subject:g}=H;if(g.CN!=="attest.android.com")throw new Error('Certificate common name was not "attest.android.com" (SafetyNet)');let A=await Kn.getStatement(o);if(A)try{await Wn({statement:A,credentialPublicKey:c,x5c:I.x5c,attestationStatementAlg:u})}catch(B){let M=B;throw new Error(`${M.message} (SafetyNet)`)}else try{await Ze(I.x5c.map(je),i)}catch(B){let M=B;throw new Error(`${M.message} (SafetyNet)`)}let v=J.fromUTF8String(`${k[0]}.${k[1]}`),j=oe.toBuffer(R);return await At({signature:j,data:v,x509Certificate:ne,hashAlgorithm:u})}var Sy={196:"TPM_ST_RSP_COMMAND",32768:"TPM_ST_NULL",32769:"TPM_ST_NO_SESSIONS",32770:"TPM_ST_SESSIONS",32788:"TPM_ST_ATTEST_NV",32789:"TPM_ST_ATTEST_COMMAND_AUDIT",32790:"TPM_ST_ATTEST_SESSION_AUDIT",32791:"TPM_ST_ATTEST_CERTIFY",32792:"TPM_ST_ATTEST_QUOTE",32793:"TPM_ST_ATTEST_TIME",32794:"TPM_ST_ATTEST_CREATION",32801:"TPM_ST_CREATION",32802:"TPM_ST_VERIFIED",32803:"TPM_ST_AUTH_SECRET",32804:"TPM_ST_HASHCHECK",32805:"TPM_ST_AUTH_SIGNED",32809:"TPM_ST_FU_MANIFEST"},Ir={0:"TPM_ALG_ERROR",1:"TPM_ALG_RSA",4:"TPM_ALG_SHA",4:"TPM_ALG_SHA1",5:"TPM_ALG_HMAC",6:"TPM_ALG_AES",7:"TPM_ALG_MGF1",8:"TPM_ALG_KEYEDHASH",10:"TPM_ALG_XOR",11:"TPM_ALG_SHA256",12:"TPM_ALG_SHA384",13:"TPM_ALG_SHA512",16:"TPM_ALG_NULL",18:"TPM_ALG_SM3_256",19:"TPM_ALG_SM4",20:"TPM_ALG_RSASSA",21:"TPM_ALG_RSAES",22:"TPM_ALG_RSAPSS",23:"TPM_ALG_OAEP",24:"TPM_ALG_ECDSA",25:"TPM_ALG_ECDH",26:"TPM_ALG_ECDAA",27:"TPM_ALG_SM2",28:"TPM_ALG_ECSCHNORR",29:"TPM_ALG_ECMQV",32:"TPM_ALG_KDF1_SP800_56A",33:"TPM_ALG_KDF2",34:"TPM_ALG_KDF1_SP800_108",35:"TPM_ALG_ECC",37:"TPM_ALG_SYMCIPHER",38:"TPM_ALG_CAMELLIA",64:"TPM_ALG_CTR",65:"TPM_ALG_OFB",66:"TPM_ALG_CBC",67:"TPM_ALG_CFB",68:"TPM_ALG_ECB"},Cy={0:"TPM_ECC_NONE",1:"TPM_ECC_NIST_P192",2:"TPM_ECC_NIST_P224",3:"TPM_ECC_NIST_P256",4:"TPM_ECC_NIST_P384",5:"TPM_ECC_NIST_P521",16:"TPM_ECC_BN_P256",17:"TPM_ECC_BN_P638",32:"TPM_ECC_SM2_P256"},Ty={"id:414D4400":{name:"AMD",id:"AMD"},"id:414E5400":{name:"Ant Group",id:"ANT"},"id:41544D4C":{name:"Atmel",id:"ATML"},"id:4252434D":{name:"Broadcom",id:"BRCM"},"id:4353434F":{name:"Cisco",id:"CSCO"},"id:464C5953":{name:"Flyslice Technologies",id:"FLYS"},"id:524F4343":{name:"Fuzhou Rockchip",id:"ROCC"},"id:474F4F47":{name:"Google",id:"GOOG"},"id:48504900":{name:"HPI",id:"HPI"},"id:48504500":{name:"HPE",id:"HPE"},"id:48495349":{name:"Huawei",id:"HISI"},"id:49424D00":{name:"IBM",id:"IBM"},"id:49465800":{name:"Infineon",id:"IFX"},"id:494E5443":{name:"Intel",id:"INTC"},"id:4C454E00":{name:"Lenovo",id:"LEN"},"id:4D534654":{name:"Microsoft",id:"MSFT"},"id:4E534D20":{name:"National Semiconductor",id:"NSM"},"id:4E545A00":{name:"Nationz",id:"NTZ"},"id:4E534700":{name:"NSING",id:"NSG"},"id:4E544300":{name:"Nuvoton Technology",id:"NTC"},"id:51434F4D":{name:"Qualcomm",id:"QCOM"},"id:534D534E":{name:"Samsung",id:"SMSN"},"id:53454345":{name:"SecEdge",id:"SECE"},"id:534E5300":{name:"Sinosun",id:"SNS"},"id:534D5343":{name:"SMSC",id:"SMSC"},"id:53544D20":{name:"STMicroelectronics",id:"STM"},"id:54584E00":{name:"Texas Instruments",id:"TXN"},"id:57454300":{name:"Winbond",id:"WEC"},"id:5345414C":{name:"Wisekey",id:"SEAL"},"id:FFFFF1D0":{name:"FIDO Alliance",id:"FIDO"}},Iy={TPM_ECC_NIST_P256:1,TPM_ECC_NIST_P384:2,TPM_ECC_NIST_P521:3,TPM_ECC_BN_P256:1,TPM_ECC_SM2_P256:1};function _y(t){let e=0,r=J.toDataView(t),n=r.getUint32(e);e+=4;let o=r.getUint16(e);e+=2;let i=Sy[o],a=r.getUint16(e);e+=2;let c=t.slice(e,e+=a),d=r.getUint16(e);e+=2;let u=t.slice(e,e+=d),p=t.slice(e,e+=8),h=r.getUint32(e);e+=4;let m=r.getUint32(e);e+=4;let k=!!t.slice(e,e+=1),I={clock:p,resetCount:h,restartCount:m,safe:k},C=t.slice(e,e+=8),R=r.getUint16(e);e+=2;let S=t.slice(e,e+=R),x=J.toDataView(S),L=r.getUint16(e);e+=2;let Y=t.slice(e,e+=L),V={nameAlg:Ir[x.getUint16(0)],nameAlgBuffer:S.slice(0,2),name:S,qualifiedName:Y};return{magic:n,type:i,qualifiedSigner:c,extraData:u,clockInfo:I,firmwareVersion:C,attested:V}}function By(t){let e=0,r=J.toDataView(t),n=Ir[r.getUint16(e)];e+=2;let o=Ir[r.getUint16(e)];e+=2;let i=r.getUint32(e);e+=4;let a={fixedTPM:!!(i&1),stClear:!!(i&2),fixedParent:!!(i&8),sensitiveDataOrigin:!!(i&16),userWithAuth:!!(i&32),adminWithPolicy:!!(i&64),noDA:!!(i&512),encryptedDuplication:!!(i&1024),restricted:!!(i&32768),decrypt:!!(i&65536),signOrEncrypt:!!(i&131072)},c=r.getUint16(e);e+=2;let d=t.slice(e,e+=c),u={},p=Uint8Array.from([]);if(n==="TPM_ALG_RSA"){let h=Ir[r.getUint16(e)];e+=2;let m=Ir[r.getUint16(e)];e+=2;let k=r.getUint16(e);e+=2;let I=r.getUint32(e);e+=4,u.rsa={symmetric:h,scheme:m,keyBits:k,exponent:I};let C=r.getUint16(e);e+=2,p=t.slice(e,e+=C)}else if(n==="TPM_ALG_ECC"){let h=Ir[r.getUint16(e)];e+=2;let m=Ir[r.getUint16(e)];e+=2;let k=Cy[r.getUint16(e)];e+=2;let I=Ir[r.getUint16(e)];e+=2,u.ecc={symmetric:h,scheme:m,curveID:k,kdf:I};let C=r.getUint16(e);e+=2;let R=t.slice(e,e+=C),S=r.getUint16(e);e+=2;let x=t.slice(e,e+=S);p=J.concat([R,x])}else throw new Error(`Unexpected type "${n}" (TPM)`);return{type:n,nameAlg:o,objectAttributes:a,authPolicy:d,parameters:u,unique:p}}function Ry(t){let e=`id:${t.substring(3).toUpperCase()}`;return Ty[e]}async function My(t){let{aaguid:e,attStmt:r,authData:n,credentialPublicKey:o,clientDataHash:i,rootCertificates:a}=t,c=r.get("ver"),d=r.get("sig"),u=r.get("alg"),p=r.get("x5c"),h=r.get("pubArea"),m=r.get("certInfo");if(c!=="2.0")throw new Error(`Unexpected ver "${c}", expected "2.0" (TPM)`);if(!d)throw new Error("No attestation signature provided in attestation statement (TPM)");if(!u)throw new Error("Attestation statement did not contain alg (TPM)");if(!Tt(u))throw new Error(`Attestation statement contained invalid alg ${u} (TPM)`);if(!p)throw new Error("No attestation certificate provided in attestation statement (TPM)");if(!h)throw new Error("Attestation statement did not contain pubArea (TPM)");if(!m)throw new Error("Attestation statement did not contain certInfo (TPM)");let k=By(h),{unique:I,type:C,parameters:R}=k,S=sr(o);if(C==="TPM_ALG_RSA"){if(!ni(S))throw new Error(`Credential public key with kty ${S.get(Z.kty)} did not match ${C}`);let ae=S.get(Z.n),bt=S.get(Z.e);if(!ae)throw new Error("COSE public key missing n (TPM|RSA)");if(!bt)throw new Error("COSE public key missing e (TPM|RSA)");if(!J.areEqual(I,ae))throw new Error("PubArea unique is not same as credentialPublicKey (TPM|RSA)");if(!R.rsa)throw new Error("Parsed pubArea type is RSA, but missing parameters.rsa (TPM|RSA)");let nn=bt,on=R.rsa.exponent||65537,Fn=nn[0]+(nn[1]<<8)+(nn[2]<<16);if(on!==Fn)throw new Error(`Unexpected public key exp ${Fn}, expected ${on} (TPM|RSA)`)}else if(C==="TPM_ALG_ECC"){if(!sn(S))throw new Error(`Credential public key with kty ${S.get(Z.kty)} did not match ${C}`);let ae=S.get(Z.crv),bt=S.get(Z.x),nn=S.get(Z.y);if(!ae)throw new Error("COSE public key missing crv (TPM|ECC)");if(!bt)throw new Error("COSE public key missing x (TPM|ECC)");if(!nn)throw new Error("COSE public key missing y (TPM|ECC)");if(!J.areEqual(I,J.concat([bt,nn])))throw new Error("PubArea unique is not same as public key x and y (TPM|ECC)");if(!R.ecc)throw new Error("Parsed pubArea type is ECC, but missing parameters.ecc (TPM|ECC)");let on=R.ecc.curveID,Fn=Iy[on];if(Fn!==ae)throw new Error(`Public area key curve ID "${on}" mapped to "${Fn}" which did not match public key crv of "${ae}" (TPM|ECC)`)}else throw new Error(`Unsupported pubArea.type "${C}"`);let x=_y(m),{magic:L,type:Y,attested:V,extraData:ie}=x;if(L!==4283712327)throw new Error(`Unexpected magic value "${L}", expected "0xff544347" (TPM)`);if(Y!=="TPM_ST_ATTEST_CERTIFY")throw new Error(`Unexpected type "${Y}", expected "TPM_ST_ATTEST_CERTIFY" (TPM)`);let ne=await xt(h,Sw(V.nameAlg)),H=J.concat([V.nameAlgBuffer,ne]);if(!J.areEqual(V.name,H))throw new Error("Attested name comparison failed (TPM)");let g=J.concat([n,i]),A=await xt(g,u);if(!J.areEqual(ie,A))throw new Error("CertInfo extra data did not equal hashed attestation (TPM)");if(p.length<1)throw new Error("No certificates present in x5c array (TPM)");let v=bi(p[0]),{basicConstraintsCA:j,version:T,subject:B,notAfter:M,notBefore:be}=v;if(j)throw new Error("Certificate basic constraints CA was not `false` (TPM)");if(T!==2)throw new Error("Certificate version was not `3` (ASN.1 value of 2) (TPM)");if(B.combined.length>0)throw new Error("Certificate subject was not empty (TPM)");let ve=new Date;if(be>ve)throw new Error(`Certificate not good before "${be.toString()}" (TPM)`);if(ve=new Date,M<ve)throw new Error(`Certificate not good after "${M.toString()}" (TPM)`);let me=ke.parse(p[0],Be);if(!me.tbsCertificate.extensions)throw new Error("Certificate was missing extensions (TPM)");let Ce,Te;if(me.tbsCertificate.extensions.forEach(ae=>{ae.extnID===yi?Ce=ke.parse(ae.extnValue,gi):ae.extnID===pi&&(Te=ke.parse(ae.extnValue,bo))}),!Ce)throw new Error("Certificate did not contain subjectAltName extension (TPM)");if(!Ce[0].directoryName?.[0].length)throw new Error("Certificate subjectAltName extension directoryName was empty (TPM)");let{tcgAtTpmManufacturer:ge,tcgAtTpmModel:Q,tcgAtTpmVersion:Ct}=kw(Ce[0].directoryName);if(!ge||!Q||!Ct)throw new Error("Certificate contained incomplete subjectAltName data (TPM)");if(!Te)throw new Error("Certificate did not contain ExtendedKeyUsage extension (TPM)");if(!Ry(ge))throw new Error(`Could not match TPM manufacturer "${ge}" (TPM)`);if(Te[0]!=="2.23.133.8.3")throw new Error(`Unexpected extKeyUsage "${Te[0]}", expected "2.23.133.8.3" (TPM)`);try{await Ol(me.tbsCertificate.extensions,e)}catch(ae){let bt=ae;throw new Error(`${bt.message} (TPM)`)}let Zo=await Kn.getStatement(e);if(Zo)try{await Wn({statement:Zo,credentialPublicKey:o,x5c:p,attestationStatementAlg:u})}catch(ae){let bt=ae;throw new Error(`${bt.message} (TPM)`)}else try{await Ze(p.map(je),a)}catch(ae){let bt=ae;throw new Error(`${bt.message} (TPM)`)}return At({signature:d,data:m,x509Certificate:p[0],hashAlgorithm:u})}function kw(t){let e="2.23.133.2.1",r="2.23.133.2.2",n="2.23.133.2.3",o,i,a;return t.forEach(c=>{c.forEach(d=>{d.type===e?o=d.value.toString():d.type===r?i=d.value.toString():d.type===n&&(a=d.value.toString())})}),{tcgAtTpmManufacturer:o,tcgAtTpmModel:i,tcgAtTpmVersion:a}}function Sw(t){if(t==="TPM_ALG_SHA256")return W.ES256;if(t==="TPM_ALG_SHA384")return W.ES384;if(t==="TPM_ALG_SHA512")return W.ES512;throw new Error(`Unexpected TPM attested name alg ${t}`)}var Ip,Py="1.3.6.1.4.1.11129.2.1.17",_p;(function(t){t[t.verified=0]="verified",t[t.selfSigned=1]="selfSigned",t[t.unverified=2]="unverified",t[t.failed=3]="failed"})(_p||(_p={}));var Qo=class{verifiedBootKey=new D;deviceLocked=!1;verifiedBootState=_p.verified;verifiedBootHash;constructor(e={}){Object.assign(this,e)}};s([l({type:D})],Qo.prototype,"verifiedBootKey",void 0);s([l({type:f.Boolean})],Qo.prototype,"deviceLocked",void 0);s([l({type:f.Enumerated})],Qo.prototype,"verifiedBootState",void 0);s([l({type:D,optional:!0})],Qo.prototype,"verifiedBootHash",void 0);var Qi=Ip=class extends G{constructor(e){super(e),Object.setPrototypeOf(this,Ip.prototype)}};Qi=Ip=s([w({type:y.Set,itemType:f.Integer})],Qi);var ee=class{purpose;algorithm;keySize;digest;padding;ecCurve;rsaPublicExponent;mgfDigest;rollbackResistance;earlyBootOnly;activeDateTime;originationExpireDateTime;usageExpireDateTime;usageCountLimit;noAuthRequired;userAuthType;authTimeout;allowWhileOnBody;trustedUserPresenceRequired;trustedConfirmationRequired;unlockedDeviceRequired;allApplications;applicationId;creationDateTime;origin;rollbackResistant;rootOfTrust;osVersion;osPatchLevel;attestationApplicationId;attestationIdBrand;attestationIdDevice;attestationIdProduct;attestationIdSerial;attestationIdImei;attestationIdMeid;attestationIdManufacturer;attestationIdModel;vendorPatchLevel;bootPatchLevel;deviceUniqueAttestation;attestationIdSecondImei;moduleHash;constructor(e={}){Object.assign(this,e)}};s([l({context:1,type:Qi,optional:!0})],ee.prototype,"purpose",void 0);s([l({context:2,type:f.Integer,optional:!0})],ee.prototype,"algorithm",void 0);s([l({context:3,type:f.Integer,optional:!0})],ee.prototype,"keySize",void 0);s([l({context:5,type:Qi,optional:!0})],ee.prototype,"digest",void 0);s([l({context:6,type:Qi,optional:!0})],ee.prototype,"padding",void 0);s([l({context:10,type:f.Integer,optional:!0})],ee.prototype,"ecCurve",void 0);s([l({context:200,type:f.Integer,optional:!0})],ee.prototype,"rsaPublicExponent",void 0);s([l({context:203,type:Qi,optional:!0})],ee.prototype,"mgfDigest",void 0);s([l({context:303,type:f.Null,optional:!0})],ee.prototype,"rollbackResistance",void 0);s([l({context:305,type:f.Null,optional:!0})],ee.prototype,"earlyBootOnly",void 0);s([l({context:400,type:f.Integer,optional:!0})],ee.prototype,"activeDateTime",void 0);s([l({context:401,type:f.Integer,optional:!0})],ee.prototype,"originationExpireDateTime",void 0);s([l({context:402,type:f.Integer,optional:!0})],ee.prototype,"usageExpireDateTime",void 0);s([l({context:405,type:f.Integer,optional:!0})],ee.prototype,"usageCountLimit",void 0);s([l({context:503,type:f.Null,optional:!0})],ee.prototype,"noAuthRequired",void 0);s([l({context:504,type:f.Integer,optional:!0})],ee.prototype,"userAuthType",void 0);s([l({context:505,type:f.Integer,optional:!0})],ee.prototype,"authTimeout",void 0);s([l({context:506,type:f.Null,optional:!0})],ee.prototype,"allowWhileOnBody",void 0);s([l({context:507,type:f.Null,optional:!0})],ee.prototype,"trustedUserPresenceRequired",void 0);s([l({context:508,type:f.Null,optional:!0})],ee.prototype,"trustedConfirmationRequired",void 0);s([l({context:509,type:f.Null,optional:!0})],ee.prototype,"unlockedDeviceRequired",void 0);s([l({context:600,type:f.Null,optional:!0})],ee.prototype,"allApplications",void 0);s([l({context:601,type:D,optional:!0})],ee.prototype,"applicationId",void 0);s([l({context:701,type:f.Integer,optional:!0})],ee.prototype,"creationDateTime",void 0);s([l({context:702,type:f.Integer,optional:!0})],ee.prototype,"origin",void 0);s([l({context:703,type:f.Null,optional:!0})],ee.prototype,"rollbackResistant",void 0);s([l({context:704,type:Qo,optional:!0})],ee.prototype,"rootOfTrust",void 0);s([l({context:705,type:f.Integer,optional:!0})],ee.prototype,"osVersion",void 0);s([l({context:706,type:f.Integer,optional:!0})],ee.prototype,"osPatchLevel",void 0);s([l({context:709,type:D,optional:!0})],ee.prototype,"attestationApplicationId",void 0);s([l({context:710,type:D,optional:!0})],ee.prototype,"attestationIdBrand",void 0);s([l({context:711,type:D,optional:!0})],ee.prototype,"attestationIdDevice",void 0);s([l({context:712,type:D,optional:!0})],ee.prototype,"attestationIdProduct",void 0);s([l({context:713,type:D,optional:!0})],ee.prototype,"attestationIdSerial",void 0);s([l({context:714,type:D,optional:!0})],ee.prototype,"attestationIdImei",void 0);s([l({context:715,type:D,optional:!0})],ee.prototype,"attestationIdMeid",void 0);s([l({context:716,type:D,optional:!0})],ee.prototype,"attestationIdManufacturer",void 0);s([l({context:717,type:D,optional:!0})],ee.prototype,"attestationIdModel",void 0);s([l({context:718,type:f.Integer,optional:!0})],ee.prototype,"vendorPatchLevel",void 0);s([l({context:719,type:f.Integer,optional:!0})],ee.prototype,"bootPatchLevel",void 0);s([l({context:720,type:f.Null,optional:!0})],ee.prototype,"deviceUniqueAttestation",void 0);s([l({context:723,type:D,optional:!0})],ee.prototype,"attestationIdSecondImei",void 0);s([l({context:724,type:D,optional:!0})],ee.prototype,"moduleHash",void 0);var tn;(function(t){t[t.software=0]="software",t[t.trustedEnvironment=1]="trustedEnvironment",t[t.strongBox=2]="strongBox"})(tn||(tn={}));var Zi;(function(t){t[t.KM2=1]="KM2",t[t.KM3=2]="KM3",t[t.KM4=3]="KM4",t[t.KM4_1=4]="KM4_1",t[t.keyMint1=100]="keyMint1",t[t.keyMint2=200]="keyMint2",t[t.keyMint3=300]="keyMint3",t[t.keyMint4=400]="keyMint4"})(Zi||(Zi={}));var St=class{attestationVersion=Zi.KM4;attestationSecurityLevel=tn.software;keymasterVersion=0;keymasterSecurityLevel=tn.software;attestationChallenge=new D;uniqueId=new D;softwareEnforced=new ee;teeEnforced=new ee;constructor(e={}){Object.assign(this,e)}};s([l({type:f.Integer})],St.prototype,"attestationVersion",void 0);s([l({type:f.Enumerated})],St.prototype,"attestationSecurityLevel",void 0);s([l({type:f.Integer})],St.prototype,"keymasterVersion",void 0);s([l({type:f.Enumerated})],St.prototype,"keymasterSecurityLevel",void 0);s([l({type:D})],St.prototype,"attestationChallenge",void 0);s([l({type:D})],St.prototype,"uniqueId",void 0);s([l({type:ee})],St.prototype,"softwareEnforced",void 0);s([l({type:ee})],St.prototype,"teeEnforced",void 0);var _r=class t{attestationVersion=Zi.keyMint4;attestationSecurityLevel=tn.software;keyMintVersion=0;keyMintSecurityLevel=tn.software;attestationChallenge=new D;uniqueId=new D;softwareEnforced=new ee;hardwareEnforced=new ee;constructor(e={}){Object.assign(this,e)}toLegacyKeyDescription(){return new St({attestationVersion:this.attestationVersion,attestationSecurityLevel:this.attestationSecurityLevel,keymasterVersion:this.keyMintVersion,keymasterSecurityLevel:this.keyMintSecurityLevel,attestationChallenge:this.attestationChallenge,uniqueId:this.uniqueId,softwareEnforced:this.softwareEnforced,teeEnforced:this.hardwareEnforced})}static fromLegacyKeyDescription(e){return new t({attestationVersion:e.attestationVersion,attestationSecurityLevel:e.attestationSecurityLevel,keyMintVersion:e.keymasterVersion,keyMintSecurityLevel:e.keymasterSecurityLevel,attestationChallenge:e.attestationChallenge,uniqueId:e.uniqueId,softwareEnforced:e.softwareEnforced,hardwareEnforced:e.teeEnforced})}};s([l({type:f.Integer})],_r.prototype,"attestationVersion",void 0);s([l({type:f.Enumerated})],_r.prototype,"attestationSecurityLevel",void 0);s([l({type:f.Integer})],_r.prototype,"keyMintVersion",void 0);s([l({type:f.Enumerated})],_r.prototype,"keyMintSecurityLevel",void 0);s([l({type:D})],_r.prototype,"attestationChallenge",void 0);s([l({type:D})],_r.prototype,"uniqueId",void 0);s([l({type:ee})],_r.prototype,"softwareEnforced",void 0);s([l({type:ee})],_r.prototype,"hardwareEnforced",void 0);var Bp,Rp=class extends ee{};Rp=s([w({type:y.Choice})],Rp);var ea=Bp=class extends G{constructor(e){super(e),Object.setPrototypeOf(this,Bp.prototype)}findProperty(e){let r=this.find(n=>n[e]!==void 0);if(r)return r[e]}};ea=Bp=s([w({type:y.Sequence,itemType:Rp})],ea);var nr=class{attestationVersion=Zi.KM4;attestationSecurityLevel=tn.software;keymasterVersion=0;keymasterSecurityLevel=tn.software;attestationChallenge=new D;uniqueId=new D;softwareEnforced=new ea;teeEnforced=new ea;get keyMintVersion(){return this.keymasterVersion}set keyMintVersion(e){this.keymasterVersion=e}get keyMintSecurityLevel(){return this.keymasterSecurityLevel}set keyMintSecurityLevel(e){this.keymasterSecurityLevel=e}get hardwareEnforced(){return this.teeEnforced}set hardwareEnforced(e){this.teeEnforced=e}constructor(e={}){Object.assign(this,e)}};s([l({type:f.Integer})],nr.prototype,"attestationVersion",void 0);s([l({type:f.Enumerated})],nr.prototype,"attestationSecurityLevel",void 0);s([l({type:f.Integer})],nr.prototype,"keymasterVersion",void 0);s([l({type:f.Enumerated})],nr.prototype,"keymasterSecurityLevel",void 0);s([l({type:D})],nr.prototype,"attestationChallenge",void 0);s([l({type:D})],nr.prototype,"uniqueId",void 0);s([l({type:ea})],nr.prototype,"softwareEnforced",void 0);s([l({type:ea})],nr.prototype,"teeEnforced",void 0);var Ny=class extends nr{constructor(e={}){"keymasterVersion"in e&&!("keyMintVersion"in e)&&(e.keyMintVersion=e.keymasterVersion),"keymasterSecurityLevel"in e&&!("keyMintSecurityLevel"in e)&&(e.keyMintSecurityLevel=e.keymasterSecurityLevel),"teeEnforced"in e&&!("hardwareEnforced"in e)&&(e.hardwareEnforced=e.teeEnforced),super(e)}};Ny=s([w({type:y.Sequence})],Ny);var qs=class{packageName;version;constructor(e={}){Object.assign(this,e)}};s([l({type:f.OctetString})],qs.prototype,"packageName",void 0);s([l({type:f.Integer})],qs.prototype,"version",void 0);var Ll=class{packageInfos;signatureDigests;constructor(e={}){Object.assign(this,e)}};s([l({type:qs,repeated:"set"})],Ll.prototype,"packageInfos",void 0);s([l({type:f.OctetString,repeated:"set"})],Ll.prototype,"signatureDigests",void 0);async function Oy(t){let{authData:e,clientDataHash:r,attStmt:n,credentialPublicKey:o,aaguid:i,rootCertificates:a}=t,c=n.get("x5c"),d=n.get("sig"),u=n.get("alg");if(!c)throw new Error("No attestation certificate provided in attestation statement (Android Key)");if(!d)throw new Error("No attestation signature provided in attestation statement (Android Key)");if(!u)throw new Error("Attestation statement did not contain alg (Android Key)");if(!Tt(u))throw new Error(`Attestation statement contained invalid alg ${u} (Android Key)`);let p=ke.parse(c[0],Be),h=new Uint8Array(p.tbsCertificate.subjectPublicKeyInfo.subjectPublicKey),m=oi(o);if(!J.areEqual(m,h))throw new Error("Credential public key does not equal leaf cert public key (Android Key)");let k=p.tbsCertificate.extensions?.find(Y=>Y.extnID===Py);if(!k)throw new Error("Certificate did not contain extKeyStore (Android Key)");let I=ke.parse(k.extnValue,St),{attestationChallenge:C,teeEnforced:R,softwareEnforced:S}=I;if(!J.areEqual(new Uint8Array(C.buffer),r))throw new Error("Attestation challenge was not equal to client data hash (Android Key)");if(R.allApplications!==void 0)throw new Error('teeEnforced contained "allApplications [600]" tag (Android Key)');if(S.allApplications!==void 0)throw new Error('teeEnforced contained "allApplications [600]" tag (Android Key)');let x=await Kn.getStatement(i);if(x)try{await Wn({statement:x,credentialPublicKey:o,x5c:c,attestationStatementAlg:u})}catch(Y){let V=Y;throw new Error(`${V.message} (Android Key)`,{cause:V})}else{let Y=c.slice(0,-1).map(je),V=c.slice(-1).map(je);try{await Ze(Y,V)}catch(ie){let ne=ie;throw new Error(`${ne.message} (Android Key)`,{cause:ne})}if(a.length>0&&a.indexOf(V[0])<0)throw new Error("x5c root certificate was not a known root certificate (Android Key)")}let L=J.concat([e,r]);return At({signature:d,data:L,x509Certificate:c[0],hashAlgorithm:u})}async function Dy(t){let{attStmt:e,authData:r,clientDataHash:n,credentialPublicKey:o,rootCertificates:i}=t,a=e.get("x5c");if(!a)throw new Error("No attestation certificate provided in attestation statement (Apple)");try{await Ze(a.map(je),i)}catch(R){let S=R;throw new Error(`${S.message} (Apple)`)}let c=ke.parse(a[0],Be),{extensions:d,subjectPublicKeyInfo:u}=c.tbsCertificate;if(!d)throw new Error("credCert missing extensions (Apple)");let p=d.find(R=>R.extnID==="1.2.840.113635.100.8.2");if(!p)throw new Error('credCert missing "1.2.840.113635.100.8.2" extension (Apple)');let h=J.concat([r,n]),m=await xt(h),k=new Uint8Array(p.extnValue.buffer).slice(6);if(!J.areEqual(m,k))throw new Error("credCert nonce was not expected value (Apple)");let I=oi(o),C=new Uint8Array(u.subjectPublicKey);if(!J.areEqual(I,C))throw new Error("Credential public key does not equal credCert public key (Apple)");return!0}async function Ly(t){let{response:e,expectedChallenge:r,expectedOrigin:n,expectedRPID:o,expectedType:i,requireUserPresence:a=!0,requireUserVerification:c=!0,supportedAlgorithmIDs:d=kp(),attestationSafetyNetEnforceCTSCheck:u=!0}=t,{id:p,rawId:h,type:m,response:k}=e;if(!p)throw new Error("Missing credential ID");if(p!==h)throw new Error("Credential ID was not base64url-encoded");if(m!=="public-key")throw new Error(`Unexpected credential type ${m}, expected "public-key"`);let I=tc(k.clientDataJSON),{type:C,origin:R,challenge:S,tokenBinding:x}=I;if(Array.isArray(i)){if(!i.includes(C)){let ae=i.join(", ");throw new Error(`Unexpected registration response type "${C}", expected one of: ${ae}`)}}else if(i){if(C!==i)throw new Error(`Unexpected registration response type "${C}", expected "${i}"`)}else if(C!=="webauthn.create")throw new Error(`Unexpected registration response type: ${C}`);if(typeof r=="function"){if(!await r(S))throw new Error(`Custom challenge verifier returned false for registration response challenge "${S}"`)}else if(S!==r)throw new Error(`Unexpected registration response challenge "${S}", expected "${r}"`);if(Array.isArray(n)){if(!n.includes(R))throw new Error(`Unexpected registration response origin "${R}", expected one of: ${n.join(", ")}`)}else if(R!==n)throw new Error(`Unexpected registration response origin "${R}", expected "${n}"`);if(x){if(typeof x!="object")throw new Error(`Unexpected value for TokenBinding "${x}"`);if(["present","supported","not-supported"].indexOf(x.status)<0)throw new Error(`Unexpected tokenBinding.status value of "${x.status}"`)}let L=oe.toBuffer(k.attestationObject),Y=nf(L),V=Y.get("fmt"),ie=Y.get("authData"),ne=Y.get("attStmt"),H=_l(ie),{aaguid:g,rpIdHash:A,flags:v,credentialID:j,counter:T,credentialPublicKey:B,extensionsData:M}=H,be;if(o){let ae=[];typeof o=="string"?ae=[o]:ae=o,be=await Nl(A,ae)}if(a&&!v.up)throw new Error("User presence was required, but user was not present");if(c&&!v.uv)throw new Error("User verification was required, but user could not be verified");if(!j)throw new Error("No credential ID was provided by authenticator");if(!B)throw new Error("No public key was provided by authenticator");if(!g)throw new Error("No AAGUID was present during registration");let me=sr(B).get(Z.alg);if(typeof me!="number")throw new Error("Credential public key was missing numeric alg");if(!d.includes(me)){let ae=d.join(", ");throw new Error(`Unexpected public key alg "${me}", expected one of "${ae}"`)}if(Zs(me)&&!Et.runtimeSupportsPQC())throw new Gn(me);let Ce=await xt(oe.toBuffer(k.clientDataJSON)),Te=Et.getRootCertificates({identifier:V}),ge={aaguid:g,attStmt:ne,authData:ie,clientDataHash:Ce,credentialID:j,credentialPublicKey:B,rootCertificates:Te,rpIdHash:A,attestationSafetyNetEnforceCTSCheck:u},Q=!1;if(V==="fido-u2f")Q=await by(ge);else if(V==="packed")Q=await Ey(ge);else if(V==="android-safetynet")Q=await ky(ge);else if(V==="android-key")Q=await Oy(ge);else if(V==="tpm")Q=await My(ge);else if(V==="apple")Q=await Dy(ge);else if(V==="none"){if(ne.size>0)throw new Error("None attestation had unexpected attestation statement");Q=!0}else throw new Error(`Unsupported Attestation Format: ${V}`);if(!Q)return{verified:!1};let{credentialDeviceType:Ct,credentialBackedUp:Zo}=Pl(v);return{verified:!0,registrationInfo:{fmt:V,aaguid:ec(g),credentialType:m,credential:{id:oe.fromBuffer(j),publicKey:B,counter:T,transports:e.response.transports},attestationObject:L,userVerified:v.uv,credentialDeviceType:Ct,credentialBackedUp:Zo,origin:I.origin,rpID:be,authenticatorExtensionResults:M}}}async function jy(t){let{allowCredentials:e,challenge:r=await rc(),timeout:n=6e4,userVerification:o="preferred",extensions:i,rpID:a}=t,c=r;return typeof c=="string"&&(c=J.fromUTF8String(c)),{rpId:a,challenge:oe.fromBuffer(c),allowCredentials:e?.map(d=>{if(!oe.isBase64URL(d.id))throw new Error(`allowCredential id "${d.id}" is not a valid base64url string`);return{...d,id:oe.trimPadding(d.id),type:"public-key"}}),timeout:n,userVerification:o,extensions:i}}async function Hy(t){let{response:e,expectedChallenge:r,expectedOrigin:n,expectedRPID:o,expectedType:i,expectedTopOrigin:a,credential:c,requireUserVerification:d=!0,advancedFIDOConfig:u}=t,{id:p,rawId:h,type:m,response:k}=e;if(!p)throw new Error("Missing credential ID");if(p!==h)throw new Error("Credential ID was not base64url-encoded");if(m!=="public-key")throw new Error(`Unexpected credential type ${m}, expected "public-key"`);if(!e)throw new Error("Credential missing response");if(typeof k?.clientDataJSON!="string")throw new Error("Credential response clientDataJSON was not a string");let I=tc(k.clientDataJSON),{type:C,origin:R,challenge:S,tokenBinding:x,crossOrigin:L,topOrigin:Y}=I;if(Array.isArray(i)){if(!i.includes(C)){let ge=i.join(", ");throw new Error(`Unexpected authentication response type "${C}", expected one of: ${ge}`)}}else if(i){if(C!==i)throw new Error(`Unexpected authentication response type "${C}", expected "${i}"`)}else if(C!=="webauthn.get")throw new Error(`Unexpected authentication response type: ${C}`);if(typeof r=="function"){if(!await r(S))throw new Error(`Custom challenge verifier returned false for registration response challenge "${S}"`)}else if(S!==r)throw new Error(`Unexpected authentication response challenge "${S}", expected "${r}"`);if(L){if(Y){if(!a)throw new Error(`Detected cross-origin authentication response from top origin of "${Y}", but a value for \`expectedTopOrigin\` was not specified when calling \`verifyAuthenticationResponse()\``);if(Array.isArray(a)){if(!a.includes(Y)){let ge=a.join(", ");throw new Error(`Unexpected cross-origin authentication response top origin of "${Y}", expected one of: ${ge}`)}}else if(Y!==a)throw new Error(`Unexpected cross-origin authentication response top origin of "${Y}", expected: ${a}`)}}else if(Y)throw new Error(`Unexpected top origin of "${Y}" within a non-cross-origin authentication response. This error should be reported to the browser vendor as a WebAuthn specification violation with a link to https://w3c.github.io/webauthn/#dom-collectedclientdata-toporigin`);if(Array.isArray(n)){if(!n.includes(R)){let ge=n.join(", ");throw new Error(`Unexpected authentication response origin "${R}", expected one of: ${ge}`)}}else if(R!==n)throw new Error(`Unexpected authentication response origin "${R}", expected "${n}"`);if(!oe.isBase64URL(k.authenticatorData))throw new Error("Credential response authenticatorData was not a base64url string");if(!oe.isBase64URL(k.signature))throw new Error("Credential response signature was not a base64url string");if(k.userHandle&&typeof k.userHandle!="string")throw new Error("Credential response userHandle was not a string");if(x){if(typeof x!="object")throw new Error("ClientDataJSON tokenBinding was not an object");if(["present","supported","notSupported"].indexOf(x.status)<0)throw new Error(`Unexpected tokenBinding status ${x.status}`)}let V=oe.toBuffer(k.authenticatorData),ie=_l(V),{rpIdHash:ne,flags:H,counter:g,extensionsData:A}=ie,v=[];typeof o=="string"?v=[o]:v=o;let j=await Nl(ne,v);if(u!==void 0){let{userVerification:ge}=u;if(ge==="required"&&!H.uv)throw new Error("User verification required, but user could not be verified")}else{if(!H.up)throw new Error("User not present during authentication");if(d&&!H.uv)throw new Error("User verification required, but user could not be verified")}let T=await xt(oe.toBuffer(k.clientDataJSON)),B=J.concat([V,T]),M=oe.toBuffer(k.signature);if((g>0||c.counter>0)&&g<=c.counter)throw new Error(`Response counter value ${g} was lower than expected ${c.counter}`);let ve=sr(c.publicKey).get(Z.alg);if(typeof ve!="number")throw new Error("Credential public key was missing numeric alg");if(Zs(ve)&&!Et.runtimeSupportsPQC())throw new Gn(ve);let{credentialDeviceType:me,credentialBackedUp:Ce}=Pl(H);return{verified:await At({signature:M,data:B,credentialPublicKey:c.publicKey}),authenticationInfo:{newCounter:g,credentialID:c.id,userVerified:H.uv,credentialDeviceType:me,credentialBackedUp:Ce,authenticatorExtensionResults:A,origin:I.origin,rpID:j}}}var ye=globalThis.CasinoMoney,rn=globalThis.CasinoEngine,Cw=globalThis.CasinoBlackjack,Ul="https://roulette-club-777-oct15.lonivxy.chatgpt.site",jl=new URL(Ul).hostname,Hl="__Host-club-admin",Uy="__Host-club-challenge",$y=15*6e4,zn=(t,e=200,r={})=>new Response(ye.stringify(t),{status:e,headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store","X-Content-Type-Options":"nosniff",...r}}),ce=(t,e=400)=>{throw Object.assign(new Error(t),{status:e})},Op=t=>btoa(String.fromCharCode(...t)).replaceAll("+","-").replaceAll("/","_").replaceAll("=",""),Tw=t=>Uint8Array.from(atob(t.replaceAll("-","+").replaceAll("_","/")),e=>e.charCodeAt(0)),Gy=()=>Op(crypto.getRandomValues(new Uint8Array(32))),ta=async t=>Op(new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(t)))),Mp=(t,e,r)=>`${t}=${e}; Path=/; Max-Age=${r}; Secure; HttpOnly; SameSite=Strict`;function Pp(t,e){return t.headers.get("cookie")?.split(";").map(r=>r.trim()).find(r=>r.startsWith(e+"="))?.slice(e.length+1)||""}function Ys(t){return t.headers.get("oai-authenticated-user-id")||ce("\u8BF7\u5148\u4F7F\u7528\u672C\u7AD9\u6240\u5C5E\u8D26\u53F7\u767B\u5F55\u3002",401)}function Np(t){let e=new rn({getItem:()=>t,setItem(){}},void 0,()=>Date.now(),{recoverRoulette:!1});return e.storageWarning&&ce("\u670D\u52A1\u5668\u8D26\u6237\u6570\u636E\u6821\u9A8C\u5931\u8D25\u3002",500),e}function Vy(t){let e=0,r=-1;for(let n=0;n<24;n++){let o=Dp(t,n);o>r&&(r=o,e=n)}return e}function Dp(t,e){return ye.add(ye.mul(t.numbers[e]||0,24),e===0?ye.mul(t.GREEN,24):e%2?ye.mul(ye.add(t.RED,t.ODD),2):ye.mul(ye.add(t.BLACK,t.EVEN),2))}function Iw(t,[e,r]){t.ensureIdle();let n=t.active,o=t.amount(r);o>n.balance&&ce("\u94B1\u5305\u4F59\u989D\u4E0D\u8DB3\u3002"),typeof e=="number"&&Number.isInteger(e)&&e>=0&&e<24?n.bets.numbers[e]=ye.add(n.bets.numbers[e]||0,o):["RED","BLACK","GREEN","ODD","EVEN"].includes(e)?n.bets[e]=ye.add(n.bets[e],o):ce("\u65E0\u6548\u7684\u8F6E\u76D8\u4E0B\u6CE8\u3002"),n.balance=ye.sub(n.balance,o)}function _w(t,e){t.ensureIdle();let r=t.active,n=rn.sumBets(r.bets);n||ce("\u8BF7\u5148\u653E\u7F6E\u7B79\u7801\u3002");let o=structuredClone(r.bets),i=e?Vy(o):Math.floor(t.random()*24),a=Dp(o,i),c=structuredClone(r.recovery||null);r.balance=ye.add(r.balance,a),r.lastBets=o,r.bets=rn.emptyBets(),r.pendingRoulette=!1;let d={roundId:crypto.randomUUID(),number:i,index:i,wager:n,payout:a,bets:o,rigged:!!e};return t.completeRound(ye.sub(a,n)),d.recoveryBefore=c,d.settlement={balance:r.balance,recovery:structuredClone(r.recovery||null)},r.lastRoulette=d,r.history.unshift({num:i,colorTag:i===0?"GREEN":i%2?"RED":"BLACK"}),r.history=r.history.slice(0,10),t.record(`${r.name} \xB7 Roulette ${i}: wager ${n.toLocaleString()}, payout ${a.toLocaleString()}.`),d}async function Bw(t,e,r,n){(!Array.isArray(r)||r.length>5)&&ce("\u65E0\u6548\u7684\u64CD\u4F5C\u53C2\u6570\u3002");let o=new Cw(t),i={gift:"transfer",offerLoan:"offerLoan",respondLoan:"respondLoan",cancelLoan:"cancelLoan",repayLoan:"repayLoan",repayAll:"repayAll",borrow:"borrow",repay:"repay",borrowShark:"borrowShark",repayShark:"repayShark",buyCard:"buyCard",armCard:"armCard"};if(Object.hasOwn(i,e))return t[i[e]](...r);if(["addUser","deletePlayer","adminAdjust","import"].includes(e)&&!n&&ce("\u8BF7\u5148\u901A\u8FC7 Windows Hello \u7BA1\u7406\u9A8C\u8BC1\u3002",403),["addUser","deletePlayer","adminAdjust"].includes(e))return t[e](...r);if(e==="lottery")return(r.length>2||r[1]!==void 0&&(!r[1]||typeof r[1]!="object"||Array.isArray(r[1])))&&ce("\u65E0\u6548\u7684\u5F69\u7968\u9009\u9879\u3002"),t.buyLottery(r[0],{jackpot:!!r[1]?.jackpot});if(e==="plinko")return t.playPlinko(...r);if(e==="dice")return t.playDice(...r);if(e==="slots")return r[1]&&typeof r[1]!="object"&&ce("\u65E0\u6548\u7684\u4E0B\u6CE8\u9009\u9879\u3002"),t.spinSlots(r[0],null,{allIn:!!r[1]?.allIn,jackpot:!!r[1]?.jackpot});if(e==="blackjack"){let[a,c]=r;return["start","hit","stand","double","split","dealerStep","forceJackpot"].includes(a)||ce("\u65E0\u6548\u7684\u4E8C\u5341\u4E00\u70B9\u64CD\u4F5C\u3002"),o[a](c)}if(e==="roulette.bet")return Iw(t,r),null;if(e==="roulette.clear")return t.ensureIdle(),t.active.balance=ye.add(t.active.balance,rn.sumBets(t.active.bets)),t.active.bets=rn.emptyBets(),null;if(e==="roulette.rebet"){t.ensureIdle();let a=t.active;a.lastBets||ce("\u6CA1\u6709\u4E0A\u4E00\u8F6E\u4E0B\u6CE8\u3002");let c=rn.sumBets(a.lastBets),d=ye.add(a.balance,rn.sumBets(a.bets));return c>d&&ce("\u4F59\u989D\u4E0D\u8DB3\u4EE5\u91CD\u590D\u4E0B\u6CE8\u3002"),a.balance=ye.sub(d,c),a.bets=structuredClone(a.lastBets),null}if(e==="roulette.spin")return _w(t,!!r[0]);if(e==="roulette.rig"){t.ensureIdle();let a=t.active,c=a.lastRoulette;(!c||c.roundId!==r[0])&&ce("\u8FD9\u8F6E\u8F6E\u76D8\u5DF2\u7ECF\u7ED3\u675F\u3002");let d=Vy(c.bets),u=Dp(c.bets,d),p=ye.sub(u,c.payout);return p&&(c.settlement&&(a.balance!==c.settlement.balance||ye.stringify(a.recovery||null)!==ye.stringify(c.settlement.recovery))&&ce("\u8D26\u6237\u5DF2\u53D1\u751F\u5176\u4ED6\u53D8\u52A8\uFF0C\u4E0D\u80FD\u518D\u8C03\u6574\u8FD9\u8F6E\u7ED3\u679C\u3002"),!c.recoveryBefore&&c.settlement?.recovery&&(a.recovery=null,a.balance=ye.sub(a.balance,10)),a.balance=ye.add(a.balance,p),c.number=c.index=d,c.payout=u,c.rigged=!0,t.completeRound(p),c.settlement={balance:a.balance,recovery:structuredClone(a.recovery||null)},a.history[0]&&(a.history[0]={num:d,colorTag:d===0?"GREEN":d%2?"RED":"BLACK"}),p&&t.record(`${a.name} \xB7 Roulette jackpot adjustment +${p.toLocaleString()}.`)),c}ce("\u672A\u77E5\u64CD\u4F5C\u3002",404)}function Ky({page:t="",webauthn:e={generateRegistrationOptions:yy,verifyRegistrationResponse:Ly,generateAuthenticationOptions:jy,verifyAuthenticationResponse:Hy}}={}){async function r(u){let p=await u.prepare("SELECT snapshot, revision FROM casino_state WHERE id = ?").bind("club").first();if(!p){let h=Np(ye.stringify(new rn(null).data));await u.prepare("INSERT OR IGNORE INTO casino_state (id,snapshot,revision,last_op) VALUES (?,?,0,?)").bind("club",ye.stringify(h.data),"initial").run(),p=await u.prepare("SELECT snapshot, revision FROM casino_state WHERE id = ?").bind("club").first()}return p}async function n(u,p){let h=Pp(u,Hl);if(!h)return!1;let m=await p.prepare("SELECT actor,expires_at FROM admin_sessions WHERE id = ?").bind(await ta(h)).first();return!!(m&&m.actor===Ys(u)&&m.expires_at>Date.now())}async function o(u,p){let h=await p.prepare("SELECT actor FROM admin_credential WHERE id = ?").bind("owner").first();return{enrolled:!!h,admin:await n(u,p),canEnroll:!h}}async function i(u,p){let h=Gy();return await p.prepare("INSERT INTO admin_sessions (id,actor,expires_at) VALUES (?,?,?)").bind(await ta(h),Ys(u),Date.now()+$y).run(),zn({ok:!0},200,{"Set-Cookie":Mp(Hl,h,$y/1e3)})}async function a(u,p,h){let m=Ys(u),k=await n(u,p),{id:I,command:C,args:R=[],playerId:S}=h;(typeof I!="string"||I.length<16||I.length>80||typeof C!="string")&&ce("\u65E0\u6548\u7684\u64CD\u4F5C\u7F16\u53F7\u3002");let x=await ta(ye.stringify({operation:C,args:R,playerId:S}));for(let L=0;L<4;L++){let Y=await p.prepare("SELECT actor,payload,response FROM casino_operations WHERE id = ?").bind(I).first();if(Y){(Y.actor!==m||Y.payload!==x)&&ce("\u64CD\u4F5C\u7F16\u53F7\u5DF2\u88AB\u4F7F\u7528\u3002",409);let T=await c(u,p);return T.data.users.some(B=>B.id===S)&&(T.data.activeId=S),zn({...T,result:ye.parseJSON(Y.response).result})}let V=await r(p),ie=Np(V.snapshot);(typeof S!="string"||!ie.data.users.some(T=>T.id===S))&&ce("\u8BF7\u9009\u62E9\u6709\u6548\u73A9\u5BB6\u3002"),ie.data.activeId=S;let ne=ie.data.users.find(T=>T.blackjack&&T.blackjack.phase!=="settled");ne&&ne.id!==S&&ce("\u8BF7\u5148\u5B8C\u6210 "+ne.name+" \u7684\u4E8C\u5341\u4E00\u70B9\u724C\u5C40\u3002",409);let H;if(C==="import"){k||ce("\u9700\u8981\u7BA1\u7406\u9A8C\u8BC1\u3002",403),V.revision!==0&&ce("\u670D\u52A1\u5668\u5DF2\u6709\u65B0\u8BB0\u5F55\uFF0C\u4E0D\u80FD\u8986\u76D6\u5BFC\u5165\u3002",409),(!R[0]||typeof R[0]!="object")&&ce("\u65E7\u5B58\u6863\u65E0\u6548\u3002");let T=ye.stringify(R[0]),B=new rn({getItem:()=>T,setItem(){}});B.storageWarning&&ce("\u65E7\u5B58\u6863\u6821\u9A8C\u5931\u8D25\uFF0C\u5DF2\u4FDD\u7559\u539F\u6587\u4EF6\u3002"),ie=B,ie.record("\u7BA1\u7406\u5458\u5BFC\u5165\u4E86\u6B64\u524D\u6D4F\u89C8\u5668\u7684\u73A9\u5BB6\u5B58\u6863\u3002"),H=null}else try{H=await Bw(ie,C,R,k)}catch(T){if(T.status)throw T;ce(T.message||"\u64CD\u4F5C\u672A\u5B8C\u6210\u3002")}ie.save();let g=ye.stringify(ie.data),A={data:ie.data,revision:V.revision+1,result:H??null,now:Date.now()},v=ye.stringify({result:A.result,revision:A.revision});if((await p.batch([p.prepare("UPDATE casino_state SET snapshot=?,revision=revision+1,last_op=? WHERE id=? AND revision=?").bind(g,I,"club",V.revision),p.prepare("INSERT INTO casino_operations (id,actor,payload,response,created_at) SELECT ?,?,?,?,? WHERE EXISTS (SELECT 1 FROM casino_state WHERE id=? AND last_op=?)").bind(I,m,x,v,Date.now(),"club",I)]))[0].meta.changes===1)return zn(A)}ce("\u5176\u4ED6\u64CD\u4F5C\u6B63\u5728\u66F4\u65B0\u8D26\u6237\uFF0C\u8BF7\u91CD\u8BD5\u3002",409)}async function c(u,p){for(let h=0;h<4;h++){let m=await r(p),k=Np(m.snapshot),I=ye.stringify(k.data);if(I!==m.snapshot){if(!(await p.prepare("UPDATE casino_state SET snapshot=?,revision=revision+1 WHERE id=? AND revision=?").bind(I,"club",m.revision).run()).meta.changes)continue;m.revision++}let C=new URL(u.url).searchParams.get("playerId");return C&&k.data.users.some(R=>R.id===C)&&(k.data.activeId=C),{data:k.data,revision:m.revision,now:Date.now(),auth:await o(u,p)}}ce("\u8D26\u6237\u6B63\u5728\u66F4\u65B0\uFF0C\u8BF7\u91CD\u8BD5\u3002",409)}async function d(u,p,h,m){let k=Ys(u),I=await p.prepare("SELECT * FROM admin_credential WHERE id = ?").bind("owner").first();if(h==="/api/admin/status")return zn(await o(u,p));if(h==="/api/admin/logout")return await p.prepare("DELETE FROM admin_sessions WHERE id = ?").bind(await ta(Pp(u,Hl))).run(),zn({ok:!0},200,{"Set-Cookie":Mp(Hl,"",0)});let C=h.includes("/register/")?"register":"authenticate";if(C==="register"&&I&&ce("\u7BA1\u7406\u901A\u884C\u5BC6\u94A5\u5DF2\u8BBE\u7F6E\uFF0C\u8BF7\u4F7F\u7528\u5DF2\u6709\u5BC6\u94A5\u767B\u5F55\u3002",403),I&&I.actor!==k&&ce("\u5F53\u524D\u8D26\u53F7\u4E0D\u662F\u6B64\u7AD9\u70B9\u7BA1\u7406\u5458\u3002",403),h.endsWith("/options")){await p.prepare("DELETE FROM admin_challenges WHERE expires_at <= ?").bind(Date.now()).run(),await p.prepare("DELETE FROM admin_sessions WHERE expires_at <= ?").bind(Date.now()).run(),C==="authenticate"&&!I&&ce("\u8BF7\u5148\u8BBE\u7F6E\u7BA1\u7406\u901A\u884C\u5BC6\u94A5\u3002"),(await p.prepare("SELECT COUNT(*) AS count FROM admin_challenges WHERE actor=? AND expires_at>?").bind(k,Date.now()).first()).count>=10&&ce("\u9A8C\u8BC1\u8BF7\u6C42\u8FC7\u4E8E\u9891\u7E41\uFF0C\u8BF7\u4E94\u5206\u949F\u540E\u91CD\u8BD5\u3002",429);let x=C==="register"?await e.generateRegistrationOptions({rpName:"Roulette Club Admin",rpID:jl,userName:"Club Administrator",userID:new TextEncoder().encode("club-owner"),attestationType:"none",authenticatorSelection:{authenticatorAttachment:"platform",residentKey:"required",userVerification:"required"},supportedAlgorithmIDs:[-7,-257]}):await e.generateAuthenticationOptions({rpID:jl,userVerification:"required",allowCredentials:[{id:I.credential_id,transports:JSON.parse(I.transports)}]}),L=Gy();return await p.prepare("INSERT INTO admin_challenges (id,actor,kind,challenge,expires_at) VALUES (?,?,?,?,?)").bind(await ta(L),k,C,x.challenge,Date.now()+5*6e4).run(),zn(x,200,{"Set-Cookie":Mp(Uy,L,300)})}h.endsWith("/verify")||ce("\u65E0\u6548\u7684\u9A8C\u8BC1\u8DEF\u5F84\u3002",404);let R=await p.prepare("DELETE FROM admin_challenges WHERE id=? AND actor=? AND kind=? AND expires_at>? RETURNING challenge").bind(await ta(Pp(u,Uy)),k,C,Date.now()).first();if(R||ce("\u9A8C\u8BC1\u5DF2\u8FC7\u671F\u6216\u5DF2\u4F7F\u7528\uFF0C\u8BF7\u91CD\u65B0\u5F00\u59CB\u3002",401),C==="register"){let S=await e.verifyRegistrationResponse({response:m,expectedChallenge:R.challenge,expectedOrigin:Ul,expectedRPID:jl,requireUserVerification:!0,supportedAlgorithmIDs:[-7,-257]});S.verified||ce("\u901A\u884C\u5BC6\u94A5\u9A8C\u8BC1\u5931\u8D25\u3002",401);let x=S.registrationInfo.credential;await p.prepare("INSERT INTO admin_credential (id,actor,credential_id,public_key,counter,transports) VALUES (?,?,?,?,?,?)").bind("owner",k,x.id,Op(x.publicKey),x.counter,JSON.stringify(x.transports||["internal"])).run()}else{I||ce("\u672A\u8BBE\u7F6E\u901A\u884C\u5BC6\u94A5\u3002",401);let S=await e.verifyAuthenticationResponse({response:m,expectedChallenge:R.challenge,expectedOrigin:Ul,expectedRPID:jl,requireUserVerification:!0,credential:{id:I.credential_id,publicKey:Tw(I.public_key),counter:I.counter,transports:JSON.parse(I.transports)}});S.verified||ce("\u901A\u884C\u5BC6\u94A5\u9A8C\u8BC1\u5931\u8D25\u3002",401),(await p.prepare("UPDATE admin_credential SET counter=? WHERE id=? AND counter=?").bind(S.authenticationInfo.newCounter,"owner",I.counter).run()).meta.changes||ce("\u9A8C\u8BC1\u8BA1\u6570\u5DF2\u66F4\u65B0\uFF0C\u8BF7\u91CD\u8BD5\u3002",409)}return i(u,p)}return{async fetch(u,p){try{let h=new URL(u.url),m=h.pathname;if(Ys(u),p.DB||ce("\u8D26\u6237\u6570\u636E\u5E93\u5C1A\u672A\u8FDE\u63A5\u3002",503),u.method==="POST"){(u.headers.get("origin")!==Ul||!u.headers.get("content-type")?.startsWith("application/json"))&&ce("\u8BF7\u6C42\u6765\u6E90\u6821\u9A8C\u5931\u8D25\u3002",403);let C=await u.text();C.length>1e6&&ce("\u8BF7\u6C42\u8FC7\u5927\u3002",413);let R;try{R=ye.parseJSON(C)}catch{ce("\u8BF7\u6C42\u5185\u5BB9\u65E0\u6548\u3002")}if(m==="/api/command")return await a(u,p.DB,R);if(/^\/api\/admin\/(register|authenticate)\/(options|verify)$/.test(m)||m==="/api/admin/logout")return await d(u,p.DB,m,R);ce("\u4E0D\u5B58\u5728\u7684\u63A5\u53E3\u3002",404)}if(u.method!=="GET"&&ce("\u4E0D\u652F\u6301\u7684\u8BF7\u6C42\u65B9\u5F0F\u3002",405),m==="/api/state")return zn(await c(u,p.DB));if(m==="/api/admin/status")return await d(u,p.DB,m);if(m.startsWith("/api/")&&ce("\u4E0D\u5B58\u5728\u7684\u63A5\u53E3\u3002",404),!["/","/player","/admin","/index.html"].includes(m))return new Response("Not found",{status:404});let k=await c(u,p.DB),I=ye.stringify(k).replaceAll("<","\\u003c");return new Response(t.replace("/* SERVER_BOOTSTRAP */",`window.__CASINO_BOOTSTRAP__=${I};`),{headers:{"Content-Type":"text/html;charset=utf-8","Cache-Control":"private, no-store","Permissions-Policy":"publickey-credentials-create=(self), publickey-credentials-get=(self)","X-Frame-Options":"SAMEORIGIN","X-Content-Type-Options":"nosniff"}})}catch(h){return zn({error:h.status?h.message:"\u64CD\u4F5C\u672A\u5B8C\u6210\uFF0C\u8BF7\u5237\u65B0\u540E\u91CD\u8BD5\u3002"},h.status||400)}}}}var FH=Ky({page:Wp});export{FH as default};
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

var qy=Object.create;var hd=Object.defineProperty;var Xy=Object.getOwnPropertyDescriptor;var Jy=Object.getOwnPropertyNames;var Yy=Object.getPrototypeOf,Qy=Object.prototype.hasOwnProperty;var fn=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(e,r)=>(typeof require<"u"?require:e)[r]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});var Zy=(t,e,r)=>()=>{if(r)throw r[0];try{return t&&(e=t(t=0)),e}catch(n){throw r=[n],n}};var gd=(t,e)=>()=>{try{return e||t((e={exports:{}}).exports,e),e.exports}catch(r){throw e=0,r}},Pt=(t,e)=>{for(var r in e)hd(t,r,{get:e[r],enumerable:!0})},e0=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of Jy(e))!Qy.call(t,i)&&i!==r&&hd(t,i,{get:()=>e[i],enumerable:!(n=Xy(e,i))||n.enumerable});return t};var ho=(t,e,r)=>(r=t!=null?qy(Yy(t)):{},e0(e||!t||!t.__esModule?hd(r,"default",{value:t,enumerable:!0}):r,t));var ai=gd(()=>{(function(t){"use strict";let e=BigInt(Number.MAX_SAFE_INTEGER);function r(v){if(typeof v=="bigint")return v;if(typeof v=="number"&&Number.isSafeInteger(v))return BigInt(v);if(typeof v=="string"&&/^-?\d+$/.test(v.trim()))return BigInt(v.trim());throw new Error("\u8BF7\u8F93\u5165\u5B8C\u6574\u7684\u6574\u6570\u7B79\u7801\u91D1\u989D\uFF08\u81F3\u5C11 1\uFF09\uFF0C\u4E0D\u652F\u6301\u5C0F\u6570\u6216\u79D1\u5B66\u8BA1\u6570\u6CD5\u3002")}let n=v=>v>=-e&&v<=e?Number(v):v,i=v=>n(r(v)),o=v=>typeof v=="bigint"||typeof v=="number"&&Number.isSafeInteger(v),a=(...v)=>n(v.reduce((y,k)=>y+r(k),0n)),s=(v,y)=>n(r(v)-r(y)),l=(v,y)=>n(r(v)*r(y));function d(v,y,k,R=!1){let O=r(v)*r(y),V=r(k);if(O<0n||V<=0n)throw new Error("Invalid chip ratio.");return n((O+(R&&O?V-1n:0n))/V)}let p=(v,y)=>r(v)<r(y)?-1:r(v)>r(y)?1:0,m=(v,y)=>p(v,y)<=0?v:y,g=(v,y)=>p(v,y)>=0?v:y;function C(v){let y=i(v);if(y<=0)throw new Error("\u8BF7\u8F93\u5165\u81F3\u5C11 1 \u7B79\u7801\u7684\u6574\u6570\u91D1\u989D\u3002");return y}let I=(v,y)=>y&&typeof y=="object"&&!Array.isArray(y)&&Object.keys(y).length===1&&typeof y.$chips=="string"&&/^-?\d+$/.test(y.$chips)?i(y.$chips):y,b=v=>JSON.stringify(v,(y,k)=>typeof k=="bigint"?{$chips:String(k)}:k),A=v=>JSON.parse(v,I);t.CasinoMoney={parse:i,positive:C,valid:o,add:a,sub:s,mul:l,ratio:d,compare:p,min:m,max:g,abs:v=>v<0?s(0,v):v,tryParse:v=>{try{return i(v)}catch{return null}},stringify:b,parseJSON:A,hydrate:v=>A(b(v))}})(globalThis)});var Cf={};Pt(Cf,{collections:()=>vc,emptyPlatform:()=>bd,loadPlatform:()=>wc,platformWrites:()=>Ea,rows:()=>Lr});async function wc(t){let e=await Promise.all(Object.entries(vc).map(async([n,[i]])=>[n,(await t.prepare(`SELECT id,body FROM ${i}`).all()).results])),r=await t.prepare("SELECT body FROM v2_meta WHERE id=?").bind("platform").first();return{meta:r?mn.parseJSON(r.body):null,...Object.fromEntries(e.map(([n,i])=>[n,Object.fromEntries(i.map(o=>[o.id,mn.parseJSON(o.body)]))])),events:[],journal:[],backups:[]}}function Aa(t,e,r,n,i,o){let a=["v2_events","v2_journal","v2_claims","v2_backups","v2_definition_versions"].includes(e),s=["id",...Object.keys(i),"body"],l=[r,...Object.values(i).map(d=>n[d]??null),mn.stringify(n)];return t.prepare(`INSERT INTO ${e} (${s.join(",")}) SELECT ${s.map(()=>"?").join(",")} WHERE EXISTS (SELECT 1 FROM casino_state WHERE id='club' AND last_op=?) ON CONFLICT(id) ${a?"DO NOTHING":"DO UPDATE SET "+s.slice(1).map(d=>`${d}=excluded.${d}`).join(",")}`).bind(...l,o)}function Ea(t,e,r,n){let i=[];mn.stringify(e.meta)!==mn.stringify(r.meta)&&i.push(Aa(t,"v2_meta","platform",r.meta,{},n));for(let[o,[a,s]]of Object.entries(vc)){for(let[l,d]of Object.entries(r[o]))mn.stringify(e[o][l])!==mn.stringify(d)&&i.push(Aa(t,a,l,d,s,n));for(let l of Object.keys(e[o]))Object.hasOwn(r[o],l)||i.push(t.prepare(`DELETE FROM ${a} WHERE id=? AND EXISTS (SELECT 1 FROM casino_state WHERE id='club' AND last_op=?)`).bind(l,n))}for(let o of r.events)i.push(Aa(t,"v2_events",o.id,o,{player_id:"playerId",kind:"kind",created_at:"createdAt"},n));for(let o of r.journal)i.push(Aa(t,"v2_journal",o.id,o,{player_id:"playerId",operation_id:"operationId",actor:"actor",kind:"kind",before:"before",after:"after",created_at:"createdAt"},n));for(let o of r.backups)i.push(Aa(t,"v2_backups",o.id,o,{created_at:"createdAt"},n));return i}function bd(){return{meta:null,...Object.fromEntries(Object.keys(vc).map(t=>[t,{}])),events:[],journal:[],backups:[]}}async function Lr(t,e,r="",n=[],i=100,o=0){if(!["v2_events","v2_journal","v2_backups"].includes(e))throw Error("Unsupported record query");return(await t.prepare(`SELECT body FROM ${e} ${r} ORDER BY created_at DESC,id LIMIT ? OFFSET ?`).bind(...n,i,o).all()).results.map(s=>mn.parseJSON(s.body))}var Ox,mn,vc,ka=Zy(()=>{Ox=ho(ai(),1),mn=globalThis.CasinoMoney,vc={profiles:["v2_profiles",{}],items:["v2_items",{}],accounts:["v2_accounts",{player_id:"playerId",role:"role",status:"status"}],progress:["v2_progress",{xp:"xp",games:"games"}],definitions:["v2_definitions",{kind:"kind",version:"version"}],versions:["v2_definition_versions",{}],inventory:["v2_inventory",{player_id:"playerId",item_id:"itemId"}],claims:["v2_claims",{player_id:"playerId",kind:"kind",created_at:"createdAt"}],clubs:["v2_clubs",{owner_id:"ownerId"}],memberships:["v2_memberships",{club_id:"clubId"}],invitations:["v2_invitations",{club_id:"clubId",target_id:"targetId"}],contributions:["v2_contributions",{club_id:"clubId",player_id:"playerId"}],stats:["v2_period_stats",{player_id:"playerId",period:"period",xp:"xp",games:"games"}],wallets:["v2_wallet_index",{visible:"visible",sign:"sign",magnitude:"magnitude",digits:"digits"}],sandbox:["v2_sandbox",{}]}});var Pd=gd(ko=>{"use strict";var F0="[object ArrayBuffer]",Hr=class t{static isArrayBuffer(e){return Object.prototype.toString.call(e)===F0}static toArrayBuffer(e){return this.isArrayBuffer(e)?e:e.byteLength===e.buffer.byteLength||e.byteOffset===0&&e.byteLength===e.buffer.byteLength?e.buffer:this.toUint8Array(e.buffer).slice(e.byteOffset,e.byteOffset+e.byteLength).buffer}static toUint8Array(e){return this.toView(e,Uint8Array)}static toView(e,r){if(e.constructor===r)return e;if(this.isArrayBuffer(e))return new r(e);if(this.isArrayBufferView(e))return new r(e.buffer,e.byteOffset,e.byteLength);throw new TypeError("The provided value is not of type '(ArrayBuffer or ArrayBufferView)'")}static isBufferSource(e){return this.isArrayBufferView(e)||this.isArrayBuffer(e)}static isArrayBufferView(e){return ArrayBuffer.isView(e)||e&&this.isArrayBuffer(e.buffer)}static isEqual(e,r){let n=t.toUint8Array(e),i=t.toUint8Array(r);if(n.length!==i.byteLength)return!1;for(let o=0;o<n.length;o++)if(n[o]!==i[o])return!1;return!0}static concat(...e){let r;Array.isArray(e[0])&&!(e[1]instanceof Function)||Array.isArray(e[0])&&e[1]instanceof Function?r=e[0]:e[e.length-1]instanceof Function?r=e.slice(0,e.length-1):r=e;let n=0;for(let a of r)n+=a.byteLength;let i=new Uint8Array(n),o=0;for(let a of r){let s=this.toUint8Array(a);i.set(s,o),o+=s.length}return e[e.length-1]instanceof Function?this.toView(i,e[e.length-1]):i.buffer}},Md="string",z0=/^[0-9a-f\s]+$/i,q0=/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/,X0=/^[a-zA-Z0-9-_]+$/,_c=class{static fromString(e){let r=unescape(encodeURIComponent(e)),n=new Uint8Array(r.length);for(let i=0;i<r.length;i++)n[i]=r.charCodeAt(i);return n.buffer}static toString(e){let r=Hr.toUint8Array(e),n="";for(let o=0;o<r.length;o++)n+=String.fromCharCode(r[o]);return decodeURIComponent(escape(n))}},Nt=class{static toString(e,r=!1){let n=Hr.toArrayBuffer(e),i=new DataView(n),o="";for(let a=0;a<n.byteLength;a+=2){let s=i.getUint16(a,r);o+=String.fromCharCode(s)}return o}static fromString(e,r=!1){let n=new ArrayBuffer(e.length*2),i=new DataView(n);for(let o=0;o<e.length;o++)i.setUint16(o*2,e.charCodeAt(o),r);return n}},Rc=class t{static isHex(e){return typeof e===Md&&z0.test(e)}static isBase64(e){return typeof e===Md&&q0.test(e)}static isBase64Url(e){return typeof e===Md&&X0.test(e)}static ToString(e,r="utf8"){let n=Hr.toUint8Array(e);switch(r.toLowerCase()){case"utf8":return this.ToUtf8String(n);case"binary":return this.ToBinary(n);case"hex":return this.ToHex(n);case"base64":return this.ToBase64(n);case"base64url":return this.ToBase64Url(n);case"utf16le":return Nt.toString(n,!0);case"utf16":case"utf16be":return Nt.toString(n);default:throw new Error(`Unknown type of encoding '${r}'`)}}static FromString(e,r="utf8"){if(!e)return new ArrayBuffer(0);switch(r.toLowerCase()){case"utf8":return this.FromUtf8String(e);case"binary":return this.FromBinary(e);case"hex":return this.FromHex(e);case"base64":return this.FromBase64(e);case"base64url":return this.FromBase64Url(e);case"utf16le":return Nt.fromString(e,!0);case"utf16":case"utf16be":return Nt.fromString(e);default:throw new Error(`Unknown type of encoding '${r}'`)}}static ToBase64(e){let r=Hr.toUint8Array(e);if(typeof btoa<"u"){let n=this.ToString(r,"binary");return btoa(n)}else return Buffer.from(r).toString("base64")}static FromBase64(e){let r=this.formatString(e);if(!r)return new ArrayBuffer(0);if(!t.isBase64(r))throw new TypeError("Argument 'base64Text' is not Base64 encoded");return typeof atob<"u"?this.FromBinary(atob(r)):new Uint8Array(Buffer.from(r,"base64")).buffer}static FromBase64Url(e){let r=this.formatString(e);if(!r)return new ArrayBuffer(0);if(!t.isBase64Url(r))throw new TypeError("Argument 'base64url' is not Base64Url encoded");return this.FromBase64(this.Base64Padding(r.replace(/\-/g,"+").replace(/\_/g,"/")))}static ToBase64Url(e){return this.ToBase64(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/\=/g,"")}static FromUtf8String(e,r=t.DEFAULT_UTF8_ENCODING){switch(r){case"ascii":return this.FromBinary(e);case"utf8":return _c.fromString(e);case"utf16":case"utf16be":return Nt.fromString(e);case"utf16le":case"usc2":return Nt.fromString(e,!0);default:throw new Error(`Unknown type of encoding '${r}'`)}}static ToUtf8String(e,r=t.DEFAULT_UTF8_ENCODING){switch(r){case"ascii":return this.ToBinary(e);case"utf8":return _c.toString(e);case"utf16":case"utf16be":return Nt.toString(e);case"utf16le":case"usc2":return Nt.toString(e,!0);default:throw new Error(`Unknown type of encoding '${r}'`)}}static FromBinary(e){let r=e.length,n=new Uint8Array(r);for(let i=0;i<r;i++)n[i]=e.charCodeAt(i);return n.buffer}static ToBinary(e){let r=Hr.toUint8Array(e),n="";for(let i=0;i<r.length;i++)n+=String.fromCharCode(r[i]);return n}static ToHex(e){let r=Hr.toUint8Array(e),n="",i=r.length;for(let o=0;o<i;o++){let a=r[o];a<16&&(n+="0"),n+=a.toString(16)}return n}static FromHex(e){let r=this.formatString(e);if(!r)return new ArrayBuffer(0);if(!t.isHex(r))throw new TypeError("Argument 'hexString' is not HEX encoded");r.length%2&&(r=`0${r}`);let n=new Uint8Array(r.length/2);for(let i=0;i<r.length;i=i+2){let o=r.slice(i,i+2);n[i/2]=parseInt(o,16)}return n.buffer}static ToUtf16String(e,r=!1){return Nt.toString(e,r)}static FromUtf16String(e,r=!1){return Nt.fromString(e,r)}static Base64Padding(e){let r=4-e.length%4;if(r<4)for(let n=0;n<r;n++)e+="=";return e}static formatString(e){return e?.replace(/[\n\r\t ]/g,"")||""}};Rc.DEFAULT_UTF8_ENCODING="utf8";function J0(t,...e){let r=arguments[0];for(let n=1;n<arguments.length;n++){let i=arguments[n];for(let o in i)r[o]=i[o]}return r}function Y0(...t){let e=t.map(i=>i.byteLength).reduce((i,o)=>i+o),r=new Uint8Array(e),n=0;return t.map(i=>new Uint8Array(i)).forEach(i=>{for(let o of i)r[n++]=o}),r.buffer}function Q0(t,e){if(!(t&&e)||t.byteLength!==e.byteLength)return!1;let r=new Uint8Array(t),n=new Uint8Array(e);for(let i=0;i<t.byteLength;i++)if(r[i]!==n[i])return!1;return!0}ko.BufferSourceConverter=Hr;ko.Convert=Rc;ko.assign=J0;ko.combine=Y0;ko.isEqual=Q0});var Su=gd(()=>{var Wh;(function(t){(function(e){var r=typeof globalThis=="object"?globalThis:typeof global=="object"?global:typeof self=="object"?self:typeof this=="object"?this:s(),n=i(t);typeof r.Reflect<"u"&&(n=i(r.Reflect,n)),e(n,r),typeof r.Reflect>"u"&&(r.Reflect=t);function i(l,d){return function(p,m){Object.defineProperty(l,p,{configurable:!0,writable:!0,value:m}),d&&d(p,m)}}function o(){try{return Function("return this;")()}catch{}}function a(){try{return(0,eval)("(function() { return this; })()")}catch{}}function s(){return o()||a()}})(function(e,r){var n=Object.prototype.hasOwnProperty,i=typeof Symbol=="function",o=i&&typeof Symbol.toPrimitive<"u"?Symbol.toPrimitive:"@@toPrimitive",a=i&&typeof Symbol.iterator<"u"?Symbol.iterator:"@@iterator",s=typeof Object.create=="function",l={__proto__:[]}instanceof Array,d=!s&&!l,p={create:s?function(){return md(Object.create(null))}:l?function(){return md({__proto__:null})}:function(){return md({})},has:d?function(S,_){return n.call(S,_)}:function(S,_){return _ in S},get:d?function(S,_){return n.call(S,_)?S[_]:void 0}:function(S,_){return S[_]}},m=Object.getPrototypeOf(Function),g=typeof Map=="function"&&typeof Map.prototype.entries=="function"?Map:Vy(),C=typeof Set=="function"&&typeof Set.prototype.entries=="function"?Set:Wy(),I=typeof WeakMap=="function"?WeakMap:Ky(),b=i?Symbol.for("@reflect-metadata:registry"):void 0,A=Uy(),v=$y(A);function y(S,_,D,K){if(te(D)){if(!gf(S))throw new TypeError;if(!bf(_))throw new TypeError;return M(S,_)}else{if(!gf(S))throw new TypeError;if(!re(_))throw new TypeError;if(!re(K)&&!te(K)&&!tt(K))throw new TypeError;return tt(K)&&(K=void 0),D=dr(D),B(S,_,D,K)}}e("decorate",y);function k(S,_){function D(K,ae){if(!re(K))throw new TypeError;if(!te(ae)&&!jy(ae))throw new TypeError;z(S,_,K,ae)}return D}e("metadata",k);function R(S,_,D,K){if(!re(D))throw new TypeError;return te(K)||(K=dr(K)),z(S,_,D,K)}e("defineMetadata",R);function O(S,_,D){if(!re(_))throw new TypeError;return te(D)||(D=dr(D)),L(S,_,D)}e("hasMetadata",O);function V(S,_,D){if(!re(_))throw new TypeError;return te(D)||(D=dr(D)),P(S,_,D)}e("hasOwnMetadata",V);function W(S,_,D){if(!re(_))throw new TypeError;return te(D)||(D=dr(D)),ge(S,_,D)}e("getMetadata",W);function N(S,_,D){if(!re(_))throw new TypeError;return te(D)||(D=dr(D)),ve(S,_,D)}e("getOwnMetadata",N);function h(S,_){if(!re(S))throw new TypeError;return te(_)||(_=dr(_)),de(S,_)}e("getMetadataKeys",h);function E(S,_){if(!re(S))throw new TypeError;return te(_)||(_=dr(_)),Se(S,_)}e("getOwnMetadataKeys",E);function w(S,_,D){if(!re(_))throw new TypeError;if(te(D)||(D=dr(D)),!re(_))throw new TypeError;te(D)||(D=dr(D));var K=xa(_,D,!1);return te(K)?!1:K.OrdinaryDeleteMetadata(S,_,D)}e("deleteMetadata",w);function M(S,_){for(var D=S.length-1;D>=0;--D){var K=S[D],ae=K(_);if(!te(ae)&&!tt(ae)){if(!bf(ae))throw new TypeError;_=ae}}return _}function B(S,_,D,K){for(var ae=S.length-1;ae>=0;--ae){var Le=S[ae],Ke=Le(_,D,K);if(!te(Ke)&&!tt(Ke)){if(!re(Ke))throw new TypeError;K=Ke}}return K}function L(S,_,D){var K=P(S,_,D);if(K)return!0;var ae=fd(_);return tt(ae)?!1:L(S,ae,D)}function P(S,_,D){var K=xa(_,D,!1);return te(K)?!1:pn(K.OrdinaryHasOwnMetadata(S,_,D))}function ge(S,_,D){var K=P(S,_,D);if(K)return ve(S,_,D);var ae=fd(_);if(!tt(ae))return ge(S,ae,D)}function ve(S,_,D){var K=xa(_,D,!1);if(!te(K))return K.OrdinaryGetOwnMetadata(S,_,D)}function z(S,_,D,K){var ae=xa(D,K,!0);ae.OrdinaryDefineOwnMetadata(S,_,D,K)}function de(S,_){var D=Se(S,_),K=fd(S);if(K===null)return D;var ae=de(K,_);if(ae.length<=0)return D;if(D.length<=0)return ae;for(var Le=new C,Ke=[],be=0,X=D;be<X.length;be++){var Q=X[be],Z=Le.has(Q);Z||(Le.add(Q),Ke.push(Q))}for(var ne=0,ye=ae;ne<ye.length;ne++){var Q=ye[ne],Z=Le.has(Q);Z||(Le.add(Q),Ke.push(Q))}return Ke}function Se(S,_){var D=xa(S,_,!1);return D?D.OrdinaryOwnMetadataKeys(S,_):[]}function we(S){if(S===null)return 1;switch(typeof S){case"undefined":return 0;case"boolean":return 2;case"string":return 3;case"symbol":return 4;case"number":return 5;case"object":return S===null?1:6;default:return 6}}function te(S){return S===void 0}function tt(S){return S===null}function Ae(S){return typeof S=="symbol"}function re(S){return typeof S=="object"?S!==null:typeof S=="function"}function We(S,_){switch(we(S)){case 0:return S;case 1:return S;case 2:return S;case 3:return S;case 4:return S;case 5:return S}var D=_===3?"string":_===5?"number":"default",K=yf(S,o);if(K!==void 0){var ae=K.call(S,D);if(re(ae))throw new TypeError;return ae}return Pe(S,D==="default"?"number":D)}function Pe(S,_){if(_==="string"){var D=S.toString;if(mo(D)){var K=D.call(S);if(!re(K))return K}var ae=S.valueOf;if(mo(ae)){var K=ae.call(S);if(!re(K))return K}}else{var ae=S.valueOf;if(mo(ae)){var K=ae.call(S);if(!re(K))return K}var Le=S.toString;if(mo(Le)){var K=Le.call(S);if(!re(K))return K}}throw new TypeError}function pn(S){return!!S}function ii(S){return""+S}function dr(S){var _=We(S,3);return Ae(_)?_:ii(_)}function gf(S){return Array.isArray?Array.isArray(S):S instanceof Object?S instanceof Array:Object.prototype.toString.call(S)==="[object Array]"}function mo(S){return typeof S=="function"}function bf(S){return typeof S=="function"}function jy(S){switch(we(S)){case 3:return!0;case 4:return!0;default:return!1}}function pd(S,_){return S===_||S!==S&&_!==_}function yf(S,_){var D=S[_];if(D!=null){if(!mo(D))throw new TypeError;return D}}function vf(S){var _=yf(S,a);if(!mo(_))throw new TypeError;var D=_.call(S);if(!re(D))throw new TypeError;return D}function wf(S){return S.value}function xf(S){var _=S.next();return _.done?!1:_}function Af(S){var _=S.return;_&&_.call(S)}function fd(S){var _=Object.getPrototypeOf(S);if(typeof S!="function"||S===m||_!==m)return _;var D=S.prototype,K=D&&Object.getPrototypeOf(D);if(K==null||K===Object.prototype)return _;var ae=K.constructor;return typeof ae!="function"||ae===S?_:ae}function Hy(){var S;!te(b)&&typeof r.Reflect<"u"&&!(b in r.Reflect)&&typeof r.Reflect.defineMetadata=="function"&&(S=Gy(r.Reflect));var _,D,K,ae=new I,Le={registerProvider:Ke,getProvider:X,setProvider:Z};return Le;function Ke(ne){if(!Object.isExtensible(Le))throw new Error("Cannot add provider to a frozen registry.");switch(!0){case S===ne:break;case te(_):_=ne;break;case _===ne:break;case te(D):D=ne;break;case D===ne:break;default:K===void 0&&(K=new C),K.add(ne);break}}function be(ne,ye){if(!te(_)){if(_.isProviderFor(ne,ye))return _;if(!te(D)){if(D.isProviderFor(ne,ye))return _;if(!te(K))for(var Te=vf(K);;){var je=xf(Te);if(!je)return;var Jt=wf(je);if(Jt.isProviderFor(ne,ye))return Af(Te),Jt}}}if(!te(S)&&S.isProviderFor(ne,ye))return S}function X(ne,ye){var Te=ae.get(ne),je;return te(Te)||(je=Te.get(ye)),te(je)&&(je=be(ne,ye),te(je)||(te(Te)&&(Te=new g,ae.set(ne,Te)),Te.set(ye,je))),je}function Q(ne){if(te(ne))throw new TypeError;return _===ne||D===ne||!te(K)&&K.has(ne)}function Z(ne,ye,Te){if(!Q(Te))throw new Error("Metadata provider not registered.");var je=X(ne,ye);if(je!==Te){if(!te(je))return!1;var Jt=ae.get(ne);te(Jt)&&(Jt=new g,ae.set(ne,Jt)),Jt.set(ye,Te)}return!0}}function Uy(){var S;return!te(b)&&re(r.Reflect)&&Object.isExtensible(r.Reflect)&&(S=r.Reflect[b]),te(S)&&(S=Hy()),!te(b)&&re(r.Reflect)&&Object.isExtensible(r.Reflect)&&Object.defineProperty(r.Reflect,b,{enumerable:!1,configurable:!1,writable:!1,value:S}),S}function $y(S){var _=new I,D={isProviderFor:function(Q,Z){var ne=_.get(Q);return te(ne)?!1:ne.has(Z)},OrdinaryDefineOwnMetadata:Ke,OrdinaryHasOwnMetadata:ae,OrdinaryGetOwnMetadata:Le,OrdinaryOwnMetadataKeys:be,OrdinaryDeleteMetadata:X};return A.registerProvider(D),D;function K(Q,Z,ne){var ye=_.get(Q),Te=!1;if(te(ye)){if(!ne)return;ye=new g,_.set(Q,ye),Te=!0}var je=ye.get(Z);if(te(je)){if(!ne)return;if(je=new g,ye.set(Z,je),!S.setProvider(Q,Z,D))throw ye.delete(Z),Te&&_.delete(Q),new Error("Wrong provider for target.")}return je}function ae(Q,Z,ne){var ye=K(Z,ne,!1);return te(ye)?!1:pn(ye.has(Q))}function Le(Q,Z,ne){var ye=K(Z,ne,!1);if(!te(ye))return ye.get(Q)}function Ke(Q,Z,ne,ye){var Te=K(ne,ye,!0);Te.set(Q,Z)}function be(Q,Z){var ne=[],ye=K(Q,Z,!1);if(te(ye))return ne;for(var Te=ye.keys(),je=vf(Te),Jt=0;;){var Ef=xf(je);if(!Ef)return ne.length=Jt,ne;var Fy=wf(Ef);try{ne[Jt]=Fy}catch(zy){try{Af(je)}finally{throw zy}}Jt++}}function X(Q,Z,ne){var ye=K(Z,ne,!1);if(te(ye)||!ye.delete(Q))return!1;if(ye.size===0){var Te=_.get(Z);te(Te)||(Te.delete(ne),Te.size===0&&_.delete(Te))}return!0}}function Gy(S){var _=S.defineMetadata,D=S.hasOwnMetadata,K=S.getOwnMetadata,ae=S.getOwnMetadataKeys,Le=S.deleteMetadata,Ke=new I,be={isProviderFor:function(X,Q){var Z=Ke.get(X);return!te(Z)&&Z.has(Q)?!0:ae(X,Q).length?(te(Z)&&(Z=new C,Ke.set(X,Z)),Z.add(Q),!0):!1},OrdinaryDefineOwnMetadata:_,OrdinaryHasOwnMetadata:D,OrdinaryGetOwnMetadata:K,OrdinaryOwnMetadataKeys:ae,OrdinaryDeleteMetadata:Le};return be}function xa(S,_,D){var K=A.getProvider(S,_);if(!te(K))return K;if(D){if(A.setProvider(S,_,v))return v;throw new Error("Illegal state.")}}function Vy(){var S={},_=[],D=(function(){function be(X,Q,Z){this._index=0,this._keys=X,this._values=Q,this._selector=Z}return be.prototype["@@iterator"]=function(){return this},be.prototype[a]=function(){return this},be.prototype.next=function(){var X=this._index;if(X>=0&&X<this._keys.length){var Q=this._selector(this._keys[X],this._values[X]);return X+1>=this._keys.length?(this._index=-1,this._keys=_,this._values=_):this._index++,{value:Q,done:!1}}return{value:void 0,done:!0}},be.prototype.throw=function(X){throw this._index>=0&&(this._index=-1,this._keys=_,this._values=_),X},be.prototype.return=function(X){return this._index>=0&&(this._index=-1,this._keys=_,this._values=_),{value:X,done:!0}},be})(),K=(function(){function be(){this._keys=[],this._values=[],this._cacheKey=S,this._cacheIndex=-2}return Object.defineProperty(be.prototype,"size",{get:function(){return this._keys.length},enumerable:!0,configurable:!0}),be.prototype.has=function(X){return this._find(X,!1)>=0},be.prototype.get=function(X){var Q=this._find(X,!1);return Q>=0?this._values[Q]:void 0},be.prototype.set=function(X,Q){var Z=this._find(X,!0);return this._values[Z]=Q,this},be.prototype.delete=function(X){var Q=this._find(X,!1);if(Q>=0){for(var Z=this._keys.length,ne=Q+1;ne<Z;ne++)this._keys[ne-1]=this._keys[ne],this._values[ne-1]=this._values[ne];return this._keys.length--,this._values.length--,pd(X,this._cacheKey)&&(this._cacheKey=S,this._cacheIndex=-2),!0}return!1},be.prototype.clear=function(){this._keys.length=0,this._values.length=0,this._cacheKey=S,this._cacheIndex=-2},be.prototype.keys=function(){return new D(this._keys,this._values,ae)},be.prototype.values=function(){return new D(this._keys,this._values,Le)},be.prototype.entries=function(){return new D(this._keys,this._values,Ke)},be.prototype["@@iterator"]=function(){return this.entries()},be.prototype[a]=function(){return this.entries()},be.prototype._find=function(X,Q){if(!pd(this._cacheKey,X)){this._cacheIndex=-1;for(var Z=0;Z<this._keys.length;Z++)if(pd(this._keys[Z],X)){this._cacheIndex=Z;break}}return this._cacheIndex<0&&Q&&(this._cacheIndex=this._keys.length,this._keys.push(X),this._values.push(void 0)),this._cacheIndex},be})();return K;function ae(be,X){return be}function Le(be,X){return X}function Ke(be,X){return[be,X]}}function Wy(){var S=(function(){function _(){this._map=new g}return Object.defineProperty(_.prototype,"size",{get:function(){return this._map.size},enumerable:!0,configurable:!0}),_.prototype.has=function(D){return this._map.has(D)},_.prototype.add=function(D){return this._map.set(D,D),this},_.prototype.delete=function(D){return this._map.delete(D)},_.prototype.clear=function(){this._map.clear()},_.prototype.keys=function(){return this._map.keys()},_.prototype.values=function(){return this._map.keys()},_.prototype.entries=function(){return this._map.entries()},_.prototype["@@iterator"]=function(){return this.keys()},_.prototype[a]=function(){return this.keys()},_})();return S}function Ky(){var S=16,_=p.create(),D=K();return(function(){function X(){this._key=K()}return X.prototype.has=function(Q){var Z=ae(Q,!1);return Z!==void 0?p.has(Z,this._key):!1},X.prototype.get=function(Q){var Z=ae(Q,!1);return Z!==void 0?p.get(Z,this._key):void 0},X.prototype.set=function(Q,Z){var ne=ae(Q,!0);return ne[this._key]=Z,this},X.prototype.delete=function(Q){var Z=ae(Q,!1);return Z!==void 0?delete Z[this._key]:!1},X.prototype.clear=function(){this._key=K()},X})();function K(){var X;do X="@@WeakMap@@"+be();while(p.has(_,X));return _[X]=!0,X}function ae(X,Q){if(!n.call(X,D)){if(!Q)return;Object.defineProperty(X,D,{value:p.create()})}return X[D]}function Le(X,Q){for(var Z=0;Z<Q;++Z)X[Z]=Math.random()*255|0;return X}function Ke(X){if(typeof Uint8Array=="function"){var Q=new Uint8Array(X);return typeof crypto<"u"?crypto.getRandomValues(Q):typeof msCrypto<"u"?msCrypto.getRandomValues(Q):Le(Q,X),Q}return Le(new Array(X),X)}function be(){var X=Ke(S);X[6]=X[6]&79|64,X[8]=X[8]&191|128;for(var Q="",Z=0;Z<S;++Z){var ne=X[Z];(Z===4||Z===6||Z===8)&&(Q+="-"),ne<16&&(Q+="0"),Q+=ne.toString(16).toLowerCase()}return Q}}function md(S){return S.__=void 0,delete S.__,S}})})(Wh||(Wh={}))});var kf=`<!DOCTYPE html>
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
.v2-nav { overflow:visible; display:flex; gap:5px; min-width:0; }.v2-nav details { position:relative; }.v2-nav summary { padding:10px 12px; color:#c4b8d0; font-size:12px; cursor:pointer; border-radius:8px; list-style:none; white-space:nowrap; }.v2-nav summary::after { content:'\u2304'; margin-left:8px; color:#a08c67; }.v2-nav details[data-active="true"] summary { color:#f4d995; background:#4a352d66; }.v2-nav .v2-nav-menu { position:absolute; top:100%; left:0; z-index:100; min-width:190px; padding:8px; background:#211b2d; border:1px solid #d9c18e33; border-radius:12px; box-shadow:0 18px 40px #0008; display:grid; gap:4px; }.v2-nav .v2-nav-menu button { width:100%; text-align:left; padding:11px 12px; }.v2-nav details:not([open]) .v2-nav-menu { display:none; }.v2-nav summary:focus-visible,.v2-nav button:focus-visible { outline:2px solid #e4ca8b; outline-offset:2px; }
.v2-shell { max-width:1160px; margin:auto; padding-bottom:60px; }.v2-heading { display:flex; justify-content:space-between; gap:20px; align-items:center; margin-bottom:26px; }.v2-heading h2 { color:#f5e6c7; font-size:clamp(27px,5vw,40px); font-weight:800; margin:10px 0; }.v2-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(min(100%,290px),1fr)); gap:18px; }.v2-card { min-width:0; }.v2-card h3 { color:#e4ce9b; }.v2-number { font-size:30px; font-weight:800; color:#f2d48b; overflow-wrap:anywhere; margin:16px 0; }.v2-muted { color:#aaa0b9; font-size:12px; line-height:1.9; }.v2-progress { width:100%; height:10px; margin:15px 0; accent-color:#d5b777; }.v2-row { display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:12px; padding:14px 0; border-bottom:1px solid #ffffff0e; }.v2-row:last-child { border-bottom:0; }.v2-row small { display:block; color:#a99bb4; font-size:11px; margin-top:6px; }.v2-card input,.v2-card select,.v2-card textarea { margin:7px 0 13px; }.v2-card label { display:block; color:#b6aac4; font-size:12px; line-height:1.8; }.v2-card textarea { min-height:90px; width:100%; resize:vertical; }.v2-card button:disabled { opacity:.4; cursor:not-allowed; }.v2-filters { display:flex; flex-wrap:wrap; gap:10px; margin:18px 0; }.v2-filters .club-input,.v2-filters .club-select { width:auto; flex:1 1 150px; }.v2-tabs { display:flex; flex-wrap:wrap; gap:8px; margin:20px 0; }.v2-pill { font-size:10px; padding:5px 8px; border:1px solid #a88f5e44; border-radius:20px; color:#ddc38d; }.v2-pill[data-rarity="epic"] { color:#d7adf3; border-color:#b88cce66; }.v2-pill[data-rarity="legendary"] { color:#f2cf77; border-color:#e4b95f99; }.v2-item { display:flex; flex-direction:column; gap:14px; }.v2-item .v2-actions { margin-top:auto; }.v2-item-preview { min-height:88px; display:grid; place-items:center; background:#130f1e; border:1px solid #d4b77944; border-radius:14px; color:#e8d3a2; font-size:19px; }.v2-item[data-rarity="epic"] .v2-item-preview { border-color:#b384cb66; }.v2-item[data-rarity="legendary"] .v2-item-preview { border-color:#edcd7e99; box-shadow:inset 0 0 25px #b9913520; }
.v2-profile-avatar { display:grid; place-items:center; width:88px; height:88px; margin:16px 0; border:3px solid #d9bd7b66; border-radius:22px; color:#f4de9f; font-size:36px; background:#2a2036; }.v2-profile-avatar[data-frame] { border-color:#e1c174; box-shadow:0 0 0 5px #d3ae5920; }.v2-profile[data-background] { background:radial-gradient(at top,#392345,#171120); }.v2-actions { display:flex; flex-wrap:wrap; gap:8px; margin-top:16px; }.v2-table-wrap { overflow-x:auto; }.v2-table { width:100%; border-collapse:collapse; font-size:12px; }.v2-table td,.v2-table th { text-align:left; padding:14px 12px; border-bottom:1px solid #ffffff10; overflow-wrap:anywhere; }.v2-table tr[data-self="true"] { background:#5c472b33; }.v2-table th { color:#a99cb5; font-weight:500; }.v2-table a { color:#e2c78b; }.v2-notice { padding:16px 20px; margin:18px 0; border:1px solid #d8b66d44; border-radius:12px; color:#dfc799; background:#35271e55; line-height:1.8; font-size:12px; }.v2-empty { text-align:center; padding:35px 20px; color:#a89ab7; font-size:13px; }.v2-sandbox-banner { position:fixed; z-index:80; bottom:18px; left:20px; right:20px; display:flex; align-items:center; flex-wrap:wrap; gap:10px 20px; padding:14px 20px; background:#3d2337f5; border:1px solid #dd99b7; border-radius:12px; color:#f0cfdf; font-size:12px; }.v2-sandbox-banner[hidden],.v2-admin-tools[hidden] { display:none; }.v2-dialog { width:min(90vw,440px); padding:28px; border:1px solid #d1b77466; border-radius:18px; background:#211a2c; color:#eee1cc; }.v2-dialog::backdrop { background:#05030bd4; backdrop-filter:blur(4px); }.v2-dialog h2 { font-size:20px; font-weight:800; }.v2-dialog p { font-size:14px; line-height:1.9; margin:18px 0; }.v2-log { max-height:380px; overflow:auto; font-size:11px; color:#b6aac5; line-height:1.9; }.v2-log li { padding:9px 0; border-bottom:1px solid #ffffff10; overflow-wrap:anywhere; }.v2-day-grid { display:grid; grid-template-columns:repeat(7,minmax(0,1fr)); gap:7px; margin:20px 0; }.v2-day { text-align:center; border:1px solid #a38c6433; border-radius:10px; padding:14px 4px; color:#ad9fbd; font-size:11px; }.v2-day strong { display:block; color:#e3cb95; font-size:17px; margin-top:8px; }.v2-day[data-current="true"] { border-color:#e2c17a; background:#6b542c33; }.v2-admin-tools { margin-top:22px; }.v2-setup-screen { position:fixed; inset:0; overflow:auto; z-index:20000; background:radial-gradient(at top,#39283f,#100e19 65%); color:#eee4d7; display:grid; align-items:center; padding:30px 18px; }.v2-setup-screen .v2-shell { width:min(100%,700px); }.v2-setup-screen h1 { font-size:34px; color:#f1d79a; margin:14px 0; }.v2-setup-mode > :not(.v2-setup-screen):not(script) { display:none!important; }.v2-check { display:flex!important; gap:10px; align-items:center; }.v2-check input { width:18px; height:18px; margin:0; }
@media(max-width:900px){.v2-nav summary { padding:9px 7px; font-size:11px; }.v2-nav summary::after { margin-left:4px; }.v2-nav details:last-child .v2-nav-menu { left:auto; right:0; }#club-nav:has(.v2-nav) { flex-wrap:wrap; gap:8px; }.v2-day-grid { grid-template-columns:repeat(4,minmax(0,1fr)); }.v2-heading { flex-wrap:wrap; }.v2-table td,.v2-table th { padding:12px 8px; }}
@media(prefers-reduced-motion:reduce){.v2-shell * { animation:none!important; transition:none!important; }}body[data-reduced-motion="true"] * { animation:none!important; transition:none!important; }

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
          <label for="admin-adjust-reason" class="club-field">\u8C03\u6574\u539F\u56E0\uFF08V2 \u5FC5\u586B\uFF09</label><input id="admin-adjust-reason" class="club-input" type="text" maxlength="120" placeholder="\u4F8B\u5982\u5956\u52B1\u3001\u4FEE\u6B63\u4F59\u989D">
          <div class="club-actions"><button type="submit" class="club-action" data-admin-action>\u786E\u8BA4\u8C03\u6574\u5E76\u8BB0\u5F55</button></div>
        </form>
        <form id="player-form" class="club-card"><h3>\u6DFB\u52A0\u73A9\u5BB6</h3><p class="club-muted">\u65B0\u73A9\u5BB6\u521D\u59CB 1,000 \u7B79\u7801\uFF1B\u53EF\u518D\u901A\u8FC7\u4F59\u989D\u8C03\u6574\u4FEE\u6539\u3002\u73A9\u5BB6\u4FDD\u5B58\u5230\u6570\u636E\u5E93\uFF0C\u65E0\u56FA\u5B9A\u4EBA\u6570\u4E0A\u9650\u3002</p><label class="club-field" for="player-name">\u65B0\u73A9\u5BB6\u540D\u79F0</label><input id="player-name" class="club-input" type="text" maxlength="24" required placeholder="\u73A9\u5BB6\u540D\u79F0"><div class="club-actions"><button type="submit" class="club-action" data-admin-action>\u6DFB\u52A0\u73A9\u5BB6</button></div></form>
        <div class="club-card club-wide"><h3>\u73A9\u5BB6\u5217\u8868</h3><p class="club-muted">\u5220\u9664\u9700\u8981\u518D\u6B21\u786E\u8BA4\u3002\u5B58\u5728\u672A\u6E05\u6B20\u6B3E\u3001\u501F\u51FA\u6B3E\u3001\u5F85\u786E\u8BA4\u534F\u8BAE\u6216\u672A\u7ED3\u7B97\u6E38\u620F\u65F6\u987B\u5148\u5904\u7406\uFF0C\u6700\u540E\u4E00\u540D\u73A9\u5BB6\u4E0D\u80FD\u5220\u9664\u3002</p><label class="club-field" for="admin-player-search">\u641C\u7D22\u73A9\u5BB6</label><input type="search" id="admin-player-search" class="club-input" maxlength="80" placeholder="\u8F93\u5165\u540D\u79F0\u67E5\u627E\u73A9\u5BB6"><p id="admin-player-count" class="club-muted" role="status"></p><div class="club-account-list" id="club-player-list"></div><div class="account-pagination"><button type="button" id="admin-player-prev" class="club-action secondary">\u4E0A\u4E00\u9875</button><span id="admin-player-page" class="club-muted" role="status"></span><button type="button" id="admin-player-next" class="club-action secondary">\u4E0B\u4E00\u9875</button></div></div>
      </div>
    </div>
  </div>
</section>
<aside id="v2-sandbox-banner" class="v2-sandbox-banner" hidden><strong>ADMIN SANDBOX \xB7 \u72EC\u7ACB\u6D4B\u8BD5\u4F59\u989D</strong><span>\u6D4B\u8BD5\u4E0D\u4F1A\u6539\u53D8\u6B63\u5F0F\u94B1\u5305\u3001\u5956\u52B1\u6216\u6392\u884C\u699C\u3002</span><button id="v2-sandbox-exit" type="button" class="club-action secondary">\u9000\u51FA\u6C99\u76D2</button></aside>
<div id="v2-feature-panels"></div>
<section id="v2-admin-tools" class="v2-admin-tools" hidden></section>
<dialog id="v2-confirm" class="v2-dialog" aria-labelledby="v2-confirm-title"><h2 id="v2-confirm-title">\u786E\u8BA4\u64CD\u4F5C</h2><p id="v2-confirm-text"></p><div class="club-actions"><button id="v2-confirm-cancel" type="button" class="club-action secondary">\u53D6\u6D88</button><button id="v2-confirm-yes" type="button" class="club-action">\u786E\u8BA4</button></div></dialog>

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
    const reducedMotion = Boolean(window.CasinoPreferences?.reducedMotion) || window.matchMedia('(prefers-reduced-motion: reduce)').matches;\r
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
      if (isMuted || !visible || window.CasinoPreferences?.sound === false) return;\r
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
            const scopedUsers = engine.isolatedPlayer ? [engine.active] : engine.data.users;
            for (const user of scopedUsers) {
                if (user.blackjack && !validRound(user.blackjack, user.id)) {
                    user.blackjack = null;
                    engine.storageWarning = 'An unreadable saved blackjack hand was cleared. Your wallet and bank records were kept.';
                }
            }
            const pending = scopedUsers.find(u => u.blackjack && u.blackjack.phase !== 'settled');
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
            this.platform = snapshot.platform; this.directory = snapshot.directory;
            this.mode = snapshot.platform?.mode || 'formal';
            if (this.revision !== undefined && snapshot.revision < this.revision) return;
            const selected = this.revision !== undefined ? this.data?.activeId : null;
            if (!snapshot.platform && selected && snapshot.data.users.some(user => user.id === selected)) snapshot.data.activeId = selected;
            const pending = snapshot.data.users.find(user => user.blackjack && user.blackjack.phase !== 'settled');
            if (pending) snapshot.data.activeId = pending.id;
            this.data = snapshot.data; this.revision = snapshot.revision; this.offset = snapshot.now - Date.now();
            if (this.revision > 0) this.legacyPending = false;
            this.now = () => Date.now() + this.offset;
            if (snapshot.auth) this.auth = snapshot.auth;
            if (!this.auth?.admin) this.adminPlayers = [];
        }
        async send(command, args = [], {admin = false} = {}) {
            if (this.legacyPending && command !== 'import') throw new Error('\u68C0\u6D4B\u5230\u65E7\u5B58\u6863\uFF0C\u8BF7\u5148\u8FDB\u5165 ADMIN\uFF0C\u901A\u8FC7 Windows Hello \u9A8C\u8BC1\u5E76\u5BFC\u5165\u540E\u7EE7\u7EED\u3002');
            if (this.requestBusy) throw new Error('\u4E0A\u4E00\u9879\u64CD\u4F5C\u4ECD\u5728\u5904\u7406\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5\u3002');
            const id = crypto.randomUUID(), body = this.money.stringify({id,command,args,playerId:this.data.activeId,...(this.platform?{mode:this.mode||'formal'}:{})});
            this.requestBusy = true; this.onChange?.();
            try {
                let response;
                for(let attempt=0;attempt<2;attempt++) {
                    try { response = await fetch('/api/command',{method:'POST',headers:{'Content-Type':'application/json',...(this.platform?{'X-Club-Protocol':'2'}:{})},body,credentials:'same-origin',signal:AbortSignal.timeout(15000)}); break; }
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
            const response=await fetch('/api/state?playerId='+encodeURIComponent(this.data.activeId)+'&mode='+(this.mode||'formal'),{credentials:'same-origin',cache:'no-store'});
            const value=await response.json();if(!response.ok)throw new Error(value.error||'\u8D26\u6237\u540C\u6B65\u5931\u8D25\u3002');
            this.applySnapshot(value);this.onChange?.();
        }
        async api(path) {
            const response=await fetch(path,{credentials:'same-origin',cache:'no-store'});
            const value=this.money.hydrate(await response.json());if(!response.ok)throw new Error(value.error||'\u8BF7\u6C42\u5931\u8D25\u3002');return value;
        }
        async setSandbox(enabled) {
            this.ensureIdle();const snapshot=await this.api('/api/state?mode='+(enabled?'sandbox':'formal'));this.applySnapshot(snapshot);this.onChange?.();
        }
        switchUser(id) {
            if(this.platform && id!==this.active.id)throw new Error('\u72EC\u7ACB\u8D26\u53F7\u53EA\u80FD\u64CD\u4F5C\u81EA\u5DF1\u7684\u73A9\u5BB6\u3002');
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
        if (muted || !visible || window.CasinoPreferences?.sound === false) return;
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
        timer=setTimeout(()=>{timer=null;return callback();},reduced.matches||window.CasinoPreferences?.reducedMotion?0:delay);
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
            scene.play(result,reduced||window.CasinoPreferences?.reducedMotion?0:kind==='plinko'?4200:2300,()=>{
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
            if (reduced||window.CasinoPreferences?.reducedMotion) reveal(); else timer = setTimeout(reveal,1800);
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
        const options = (engine.directory || engine.data.users).filter(person => person.id !== user.id).map(person => { const option = element('option', person.name); option.value = person.id; return option; });
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
        const summaries = CasinoAccounts.summaries(engine.data), current = summaries.find(row => row.id === engine.active.id), locked = callbacks.locked();
        const v2 = Boolean(engine.platform), rows = v2 ? engine.directory.map(p => ({id:p.id,name:p.name,cash:p.balance??0,privateBalance:p.balance===undefined})) : summaries;
        const selection = CasinoAccounts.selectPlayers(rows,{query:$('directory-search').value,sort:$('directory-sort').value,page});
        page = selection.page;
        $('directory-count').textContent = \`\${selection.total} \u4F4D\u5339\u914D \xB7 \u5171 \${rows.length} \u4F4D\u73A9\u5BB6\`;
        $('directory-empty').hidden = selection.total !== 0;
        $('directory-page').textContent = \`\${selection.page} / \${selection.pages}\`;
        $('directory-prev').disabled = page === 1; $('directory-next').disabled = page === selection.pages;
        $('directory-rows').replaceChildren(...selection.rows.map(player => {
            const row = document.createElement('tr'), name = element('td',player.name), cash = element('td',player.privateBalance ? '\u672A\u516C\u5F00' : player.recovery ? '-'+fmt(player.negative) : fmt(player.cash));
            if (player.recovery) { cash.dataset.negative = 'true'; cash.append(element('small',\`\u53EF\u7528 \${fmt(player.allowance)} \xB7 \u8D1F\u6570\u6A21\u5F0F\`)); }
            else if (player.reserved) cash.append(element('small',\`\u53E6\u6709 \${fmt(player.reserved)} \u4E0B\u6CE8\u4E2D\`));
            const debt = element('td',v2?'\u4EC5\u672C\u4EBA\u53EF\u89C1':fmt(player.debt)), net = element('td',v2?'\u4EC5\u672C\u4EBA\u53EF\u89C1':fmt(player.net)), actions = document.createElement('td');
            if(!v2){net.dataset.negative = String(player.net < 0); net.append(element('small',\`\u5E94\u6536 \${fmt(player.receivable)}\`));}
            const button = element('button',v2?'\u67E5\u770B\u8D44\u6599':player.id===current.id?'\u5F53\u524D\u73A9\u5BB6':'\u5207\u6362','club-action secondary');
            button.type = 'button'; button.disabled = locked || !v2 && player.id === current.id;
            button.addEventListener('click',()=>v2?callbacks.profile(player.id):callbacks.switchPlayer(player.id)); actions.append(button);
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
    if(engine.platform)for(const option of $('directory-sort').children)if(['net','debt'].includes(option.value))option.disabled=true;
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
        if(engine.platform){$('admin-adjust-reason').required=true;$('admin-adjust-reason').minLength=3;$('admin-import').hidden=true;}
        $('admin-login').hidden=auth.admin;$('admin-panel').hidden=!auth.admin;
        $('admin-enroll').hidden=!auth.canEnroll;$('admin-signin').hidden=!auth.enrolled;
        $('admin-enroll').disabled=working;$('admin-signin').disabled=working;
        $('admin-auth-status').textContent=working?'\u8BF7\u5B8C\u6210\u7CFB\u7EDF\u7684 Windows Hello \u63D0\u793A\u2026':!engine.remote?'\u7BA1\u7406\u5165\u53E3\u9700\u8981\u5728\u5DF2\u53D1\u5E03\u7F51\u7AD9\u4E2D\u6253\u5F00\u3002':auth.enrolled?'\u5DF2\u8BBE\u7F6E\u901A\u884C\u5BC6\u94A5\u3002\u9A8C\u8BC1\u540E\u624D\u80FD\u7BA1\u7406\u73A9\u5BB6\u3002':'\u4EC5\u7AD9\u70B9\u6240\u6709\u8005\u53EF\u9996\u6B21\u7ED1\u5B9A\u7BA1\u7406\u901A\u884C\u5BC6\u94A5\u3002';
        $('admin-legacy').hidden=!legacy||engine.revision!==0;
        $('club-migration-note').hidden=!engine.legacyPending||window.location.pathname==='/admin';
        const selected=$('admin-adjust-player').value;
        $('admin-adjust-player').replaceChildren(...(engine.adminPlayers || engine.data.users).map(user=>{const option=document.createElement('option');option.value=user.id;option.textContent=user.name+' \xB7 '+(user.recovery?'-'+user.recovery.deficit.toLocaleString()+' \xB7 \u53EF\u7528 ':'')+user.balance.toLocaleString();return option;}));
        if((engine.adminPlayers || engine.data.users).some(user=>user.id===selected))$('admin-adjust-player').value=selected;
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
        if(engine.platform && !await CasinoV2.confirm('\u786E\u8BA4\u8C03\u6574\u8BE5\u73A9\u5BB6\u4F59\u989D\uFF1F\u6B64\u64CD\u4F5C\u4F1A\u5199\u5165\u6C38\u4E45\u5BA1\u8BA1\u6D41\u6C34\u3002'))return;
        if(await callbacks.transact(()=>engine.adminAdjust($('admin-adjust-player').value,$('admin-adjust-mode').value,$('admin-adjust-amount').value,$('admin-adjust-reason').value),'\u7BA1\u7406\u5458\u4F59\u989D\u8C03\u6574\u5DF2\u4FDD\u5B58\u5E76\u8BB0\u5F55\u3002')){$('admin-adjust-amount').value='';$('admin-adjust-reason').value='';}
    });
    $('admin-import').addEventListener('click',async()=>{
        if(!legacy)return;
        if(await callbacks.transact(()=>engine.importLegacy(legacy),'\u65E7\u5B58\u6863\u5DF2\u5BFC\u5165\u670D\u52A1\u5668\uFF0C\u672C\u5730\u5907\u4EFD\u5DF2\u4FDD\u7559\u3002')){legacy=null;callbacks.changed();}
    });
    return {render,get unlocked(){return Boolean(auth.admin);}};
}

(function(root){
 'use strict';
 const groups=[
  {id:'games',name:'Games \u6E38\u620F',items:[['roulette','Roulette'],['slots','777 Slots'],['blackjack','Blackjack'],['plinko','Plinko \u5F39\u73E0'],['dice','\u9AB0\u5B9D'],['lottery','\u5F69\u7968']]},
  {id:'economy',name:'Economy \u7ECF\u6D4E',items:[['bank','\u94F6\u884C'],['market','\u9ED1\u5E02\u5546\u4EBA'],['inventory','\u6536\u85CF / Inventory']]},
  {id:'social',name:'Social \u793E\u4EA4',items:[['players','\u73A9\u5BB6\u5F80\u6765'],['leaderboard','\u6392\u884C\u699C'],['clubs','\u670B\u53CB\u4FF1\u4E50\u90E8']]},
  {id:'rewards',name:'Rewards \u5956\u52B1',items:[['rewards','\u6BCF\u65E5\u7B7E\u5230'],['quests','\u4EFB\u52A1 / Quests'],['achievements','\u6210\u5C31 / Achievements']]},
  {id:'account',name:'Account \u8D26\u6237',items:[['dashboard','PLAYER \u603B\u89C8'],['profile','\u4E2A\u4EBA\u8D44\u6599'],['settings','\u8BBE\u7F6E']]}];
 const views=['dashboard','profile','settings','inventory','leaderboard','clubs','rewards','quests','achievements'];
 const $=id=>document.getElementById(id),fmt=n=>n?.toLocaleString()??'\u2014';
 function el(tag,text='',className=''){const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(className)n.className=className;return n;}
 function button(label,action,disabled=false){const b=el('button',label,'club-action secondary');b.type='button';b.disabled=disabled;b.addEventListener('click',action);return b;}
 function card(title){const c=el('section','','club-card v2-card');if(title)c.append(el('h3',title));return c;}
 function message(parent,text){parent.append(el('p',text,'v2-muted'));}
 function input(form,label,value='',type='text'){const box=el('label',label),n=el('input','','club-input');n.type=type;n.value=String(value??'');box.append(n);form.append(box);return n;}
 function select(form,label,options,value){const box=el('label',label),n=el('select','','club-select');for(const [id,title]of options){const o=el('option',title);o.value=id;n.append(o);}if(value!==undefined)n.value=String(value);box.append(n);form.append(box);return n;}
 function check(form,label,value){const box=el('label',label,'v2-check'),n=el('input');n.type='checkbox';n.checked=Boolean(value);box.prepend(n);form.append(box);return n;}
 function progress(parent,value,max){const bar=el('progress','','v2-progress');bar.max=max||1;bar.value=Math.min(value,max||1);bar.setAttribute('aria-label',\`\${value} / \${max}\`);parent.append(bar);}
 async function confirmAction(text){const dialog=$('v2-confirm');$('v2-confirm-text').textContent=text;dialog.returnValue='cancel';return new Promise(resolve=>{const yes=()=>dialog.close('yes'),cancel=()=>dialog.close('cancel');dialog.addEventListener('close',()=>{$('v2-confirm-yes').removeEventListener('click',yes);$('v2-confirm-cancel').removeEventListener('click',cancel);resolve(dialog.returnValue==='yes');},{once:true});$('v2-confirm-yes').addEventListener('click',yes);$('v2-confirm-cancel').addEventListener('click',cancel);dialog.showModal();});}
 function download(value,name){const blob=new Blob([JSON.stringify(value,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=el('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
 function navigate(engine,callbacks){
  const nav=$('club-player-tabs');nav.classList.add('v2-nav');nav.removeAttribute('role');const existing=new Map([...nav.querySelectorAll('[data-view]')].map(n=>[n.dataset.view,n]));nav.replaceChildren();
  for(const group of groups){const details=el('details'),summary=el('summary',group.name),list=el('div','','v2-nav-menu');details.dataset.group=group.id;list.setAttribute('role','tablist');
   for(const [view,title]of group.items){const b=existing.get(view)||el('button',title);b.type='button';b.dataset.view=view;b.id='tab-'+view;b.setAttribute('role','tab');b.setAttribute('aria-selected','false');b.setAttribute('aria-controls',views.includes(view)?'v2-'+view+'-view':view==='roulette'?'canvas-container':view+'-view');
    b.addEventListener('click',()=>{details.open=false;});list.append(b);}
   details.append(summary,list);nav.append(details);details.addEventListener('toggle',()=>{if(details.open)for(const other of nav.querySelectorAll('details'))if(other!==details)other.open=false;});
   details.addEventListener('keydown',event=>{const buttons=[...list.querySelectorAll('button')].filter(b=>!b.disabled);if(event.key==='Escape'){details.open=false;summary.focus();event.preventDefault();return;}let index=buttons.indexOf(document.activeElement);if(event.key==='ArrowDown'||event.key==='ArrowRight')index=(index+1)%buttons.length;else if(event.key==='ArrowUp'||event.key==='ArrowLeft')index=(index+buttons.length-1)%buttons.length;else if(event.key==='Home')index=0;else if(event.key==='End')index=buttons.length-1;else return;event.preventDefault();details.open=true;buttons[index]?.focus();});
  }
  document.addEventListener('click',event=>{if(!nav.contains(event.target))for(const group of nav.querySelectorAll('details'))group.open=false;});
  for(const link of document.querySelectorAll('a[href="/admin"]'))link.hidden=!['owner','admin'].includes(engine.auth?.role);
 }
 function createOnboarding(roulette){
  const engine=new root.CasinoEngine();let current=engine.auth||{},checking=false;
  function init(){document.body.classList.add('v2-setup-mode');const screen=el('main','','v2-setup-screen'),shell=el('div','','v2-shell'),box=card('\u8D26\u6237\u7ED1\u5B9A');
   shell.append(el('p','ROULETTE CLUB V2','club-eyebrow'),el('h1','\u6B22\u8FCE\u56DE\u6765'),el('p','\u65E7\u73A9\u5BB6\u3001\u4F59\u989D\u4E0E\u6E38\u620F\u8BB0\u5F55\u5DF2\u4FDD\u7559\u3002\u72EC\u7ACB\u8D26\u53F7\u9700\u8981\u5148\u7ED1\u5B9A\u81EA\u5DF1\u7684\u73A9\u5BB6\u6863\u6848\u3002','v2-muted'),box);screen.append(shell);document.body.append(screen);
   const status=el('p','','v2-notice');box.append(status);
   const admin=['owner','admin'].includes(current.role);
   if(!admin){status.textContent='\u4F60\u5DF2\u767B\u5F55\u3002\u8BF7\u8BA9\u7BA1\u7406\u5458\u5C06\u5DF2\u6709\u73A9\u5BB6\u7ED1\u5B9A\u5230\u4F60\u7684\u8D26\u53F7\uFF1B\u7ED1\u5B9A\u540E\u672C\u9875\u4F1A\u81EA\u52A8\u8FDB\u5165\u6E38\u620F\u3002';const label=el('p','\u8D26\u53F7\u8BC6\u522B\u7801\uFF1A'+(current.actor||''),'v2-muted');box.append(label);setInterval(async()=>{try{const r=await fetch('/api/state',{credentials:'same-origin'}),v=await r.json();if(v.platform?.account?.playerId)window.location.reload();}catch{}},5000);return;}
   const auth=button(current.enrolled?'\u4F7F\u7528 Windows Hello \u9A8C\u8BC1':'\u8BBE\u7F6E Windows Hello',async()=>{
    if(checking)return;checking=true;auth.disabled=true;
    try{const kind=current.enrolled?'authenticate':'register',options=await api('/api/admin/'+kind+'/options',{}),response=kind==='register'?await ClubPasskeys.startRegistration({optionsJSON:options}):await ClubPasskeys.startAuthentication({optionsJSON:options});await api('/api/admin/'+kind+'/verify',response);await showProfiles();}
    catch(error){status.textContent=error.name==='NotAllowedError'?'\u7CFB\u7EDF\u9A8C\u8BC1\u5DF2\u53D6\u6D88\uFF0C\u73A9\u5BB6\u6570\u636E\u672A\u4FEE\u6539\u3002':error.message;}finally{checking=false;auth.disabled=false;}
   });box.append(auth);status.textContent='\u8BF7\u9A8C\u8BC1\u7BA1\u7406\u8EAB\u4EFD\uFF0C\u518D\u9009\u62E9\u5C5E\u4E8E\u4F60\u7684\u65E7\u73A9\u5BB6\u3002\u5176\u4ED6\u65E7\u73A9\u5BB6\u4ECD\u4F1A\u4FDD\u7559\uFF0C\u4E4B\u540E\u53EF\u9010\u4E00\u7ED1\u5B9A\u7ED9\u670B\u53CB\u3002';
   async function api(path,body){const response=await fetch(path,{method:body===undefined?'GET':'POST',credentials:'same-origin',headers:body?{'Content-Type':'application/json','X-Club-Protocol':'2'}:{},body:body?JSON.stringify(body):undefined});const result=await response.json();if(!response.ok)throw Error(result.error||'\u64CD\u4F5C\u5931\u8D25');return result;}
   async function showProfiles(){const data=await api('/api/admin/overview');auth.hidden=true;const form=el('form'),choice=select(form,'\u9009\u62E9\u5C5E\u4E8E\u4F60\u7684\u5DF2\u6709\u73A9\u5BB6',data.players.filter(u=>!data.accounts.some(a=>a.playerId===u.id)).map(u=>[u.id,u.name+' \xB7 '+fmt(engine.money.hydrate(u).balance)+' \u7B79\u7801']));
    const submit=el('button','\u7ED1\u5B9A\u5E76\u8FDB\u5165 PLAYER','club-action');submit.type='submit';form.append(submit);box.append(form);status.textContent='\u8BF7\u9009\u62E9\u672C\u4EBA\u73A9\u5BB6\uFF1B\u4E0D\u4F1A\u521B\u5EFA\u66FF\u4EE3\u5B58\u6863\uFF0C\u4E5F\u4E0D\u4F1A\u91CD\u7F6E\u4F59\u989D\u3002';
    form.addEventListener('submit',async event=>{event.preventDefault();submit.disabled=true;try{await api('/api/command',{id:crypto.randomUUID(),command:'admin.bind',args:[current.actor,choice.value],mode:'formal'});window.location.reload();}catch(error){status.textContent=error.message;submit.disabled=false;}});
   }
   if(current.admin)showProfiles().catch(error=>status.textContent=error.message);
  }
  return {engine,init,refresh(){},render(){},busy:()=>true,toast(){},get view(){return 'setup';}};
 }
 function createFeatures(engine,callbacks){
  let view='dashboard',publicId=null,lastKey='',loading=false,remote=null,adminData=null,adminRevision=-1,adminLoading=false,leaderMetric='xp',leaderPeriod='all',leaderQuery='',leaderPage=1,inventoryKind='all',inventoryRarity='all',inventoryOwned=true,itemPreview=null,questFilter='all',selectedDefinition=null,selectedItem=null;
  const rootNode=$('v2-feature-panels'),sections={};root.CasinoPreferences=engine.platform.profile?.settings||{};navigate(engine,callbacks);
  for(const name of views){const section=el('section','','club-view');section.id='v2-'+name+'-view';section.hidden=true;section.setAttribute('role','tabpanel');section.setAttribute('aria-labelledby','tab-'+name);const shell=el('div','','v2-shell');section.append(shell);rootNode.append(section);sections[name]=shell;}
  const adminRoot=$('v2-admin-tools');$('admin-panel').append(adminRoot);
  async function action(command,args=[],success='\u5DF2\u4FDD\u5B58\u3002',confirmation){
   if(callbacks.locked()){callbacks.notify('\u8BF7\u5148\u7B49\u5F85\u5F53\u524D\u64CD\u4F5C\u5B8C\u6210\u3002',true);return false;}
   if(confirmation&&!await confirmAction(confirmation))return false;
   try{await engine.send(command,args,{admin:command.startsWith('admin.')});remote=null;lastKey='';callbacks.changed();callbacks.notify(success);if(['clubs','leaderboard','profile'].includes(view))await load();return true;}catch(error){callbacks.notify(error.message,true);return false;}
  }
  function formSubmit(form,handler){form.addEventListener('submit',event=>{event.preventDefault();Promise.resolve(handler()).catch(error=>callbacks.notify(error.message,true));});}
  function heading(parent,title,subtitle){const h=el('header','','v2-heading'),left=el('div');left.append(el('p','ROULETTE CLUB \xB7 PLAYER','club-eyebrow'),el('h2',title));if(subtitle)message(left,subtitle);h.append(left);parent.append(h);}
  function row(parent,label,detail,control){const r=el('div','','v2-row'),description=el('div',label);if(detail)description.append(el('small',detail));r.append(description);if(control)r.append(control);parent.append(r);return r;}
  function tile(parent,label,value,detail){const c=card(label);c.append(el('div',fmt(value),'v2-number'));if(detail)message(c,detail);parent.append(c);return c;}
  function data(){return engine.platform||{};}
  function profile(parent){const own=!publicId||publicId===engine.active.id,p=data(),u=own?{id:engine.active.id,name:engine.active.name,...p.profile,xp:p.progress.xp,level:p.progress.level}:remote;
   if(!u){message(parent,'\u6B63\u5728\u8F7D\u5165\u8D44\u6599\u2026');return;}const c=card(u.name),avatar=el('div',u.avatar&&u.avatar!=='initial'?{star:'S',moon:'M',diamond:'D'}[u.avatar]||u.name[0]:u.name[0],'v2-profile-avatar');
   if(u.equipped?.frame)avatar.dataset.frame=u.equipped.frame;if(u.equipped?.background)c.dataset.background=u.equipped.background;c.classList.add('v2-profile');c.append(avatar);
   message(c,\`Lv. \${u.level||1} \xB7 \${fmt(u.xp||0)} XP\`);if(u.equipped?.title)message(c,p.items.find(i=>i.id===u.equipped.title)?.name||'');message(c,u.bio||'\u8FD8\u6CA1\u6709\u4E2A\u4EBA\u4ECB\u7ECD\u3002');
   const badges=el('div','','v2-tabs');for(const id of u.featuredBadges||[])badges.append(el('span',p.items.find(i=>i.id===id)?.name||id,'v2-pill'));c.append(badges);parent.append(c);
   if(!own){if(u.balance!==undefined)message(c,'\u516C\u5F00\u4F59\u989D '+fmt(u.balance));c.append(button('\u8FD4\u56DE\u6211\u7684\u8D44\u6599',()=>callbacks.setView('profile')));return;}
   const form=card('\u7F16\u8F91\u8D44\u6599'),name=input(form,'\u663E\u793A\u540D\u79F0',engine.active.name),bio=input(form,'\u4E2A\u4EBA\u4ECB\u7ECD',u.bio||''),avatarChoice=select(form,'\u5934\u50CF\u6837\u5F0F',[['initial','\u59D3\u540D\u9996\u5B57'],['star','\u661F\u5149 S'],['moon','\u6708\u591C M'],['diamond','\u94BB\u77F3 D']],u.avatar||'initial');name.maxLength=24;name.required=true;bio.maxLength=180;
   form.append(button('\u4FDD\u5B58\u8D44\u6599',()=>action('profile.update',[{name:name.value,bio:bio.value,avatar:avatarChoice.value}])));parent.append(form);
  }
  function dashboard(parent){const p=data(),prog=p.progress,cfg=p.definitions.find(d=>d.kind==='settings'),grid=el('div','','v2-grid');tile(grid,'\u6B63\u5F0F\u94B1\u5305',engine.active.recovery?0:engine.active.balance,'\u6CBF\u7528\u5DF2\u6709\u7B79\u7801\uFF0C\u975E\u73B0\u91D1\u8D44\u4EA7');tile(grid,'\u6210\u957F\u7B49\u7EA7','Lv. '+prog.level,fmt(prog.xp)+' XP');tile(grid,'V2 \u5B8C\u6210\u5BF9\u5C40',prog.games,'\u4E0D\u542B\u5386\u53F2\u8865\u7B97\u4E0E\u6C99\u76D2');tile(grid,'\u5DF2\u89E3\u9501\u6210\u5C31',Object.keys(prog.achievements).length);parent.append(grid);
   const c=card('\u4E0B\u4E00\u7B49\u7EA7'),floor=cfg.levelFactor*(prog.level-1)**2,next=cfg.levelFactor*prog.level**2;progress(c,prog.xp-floor,next-floor);message(c,\`\${fmt(prog.xp)} / \${fmt(next)} XP \xB7 \u8FD8\u9700 \${fmt(next-prog.xp)} XP\`);c.append(button('\u67E5\u770B\u4EFB\u52A1',()=>callbacks.setView('quests')),button('\u6BCF\u65E5\u7B7E\u5230',()=>callbacks.setView('rewards')));parent.append(c);
   if(p.maintenance)parent.append(el('p','\u53EA\u8BFB\u7EF4\u62A4\u5DF2\u5F00\u542F\uFF0C\u6682\u4E0D\u80FD\u4E0B\u6CE8\u3001\u8F6C\u8D26\u6216\u9886\u53D6\u5956\u52B1\u3002','v2-notice'));
  }
  function settings(parent){const p=data().profile,c=card('\u9690\u79C1\u548C\u504F\u597D');const visible=check(c,'\u5411\u6210\u5458\u5C55\u793A\u4F59\u989D\uFF0C\u5E76\u52A0\u5165\u4F59\u989D\u699C',p.walletVisible),sound=check(c,'\u5141\u8BB8\u6E38\u620F\u97F3\u6548',p.settings.sound),motion=check(c,'\u51CF\u5C11\u52A8\u6001\u6548\u679C',p.settings.reducedMotion);
   message(c,'\u6B20\u6B3E\u3001\u501F\u8D37\u660E\u7EC6\u3001\u5361\u5305\u548C\u79C1\u6709\u6E38\u620F\u8BB0\u5F55\u59CB\u7EC8\u53EA\u5411\u672C\u4EBA\u53CA\u6388\u6743\u7BA1\u7406\u5458\u5C55\u793A\u3002\u5173\u95ED\u4F59\u989D\u5C55\u793A\u540E\uFF0C\u670D\u52A1\u7AEF\u4E5F\u4F1A\u4ECE\u6210\u5458\u54CD\u5E94\u4E0E\u699C\u5355\u4E2D\u79FB\u9664\u4F59\u989D\u3002');c.append(button('\u4FDD\u5B58\u8BBE\u7F6E',()=>action('profile.settings',[{walletVisible:visible.checked,sound:sound.checked,reducedMotion:motion.checked}])));parent.append(c);}
  function rewards(parent){const p=data(),prog=p.progress,cfg=p.definitions.find(d=>d.kind==='settings'),c=card('\u4E03\u65E5\u7B7E\u5230'),calendar=el('div','','v2-day-grid'),claimed=prog.lastDaily===p.periods.day;
   cfg.dailyXP.forEach((xp,i)=>{const d=el('div','\u7B2C '+(i+1)+' \u5929','v2-day');d.dataset.current=String((prog.streak||1)===i+1);d.append(el('strong',xp+' XP'));calendar.append(d);});c.append(calendar);message(c,'\u65AD\u7B7E\u540E\u4ECE\u7B2C\u4E00\u5929\u91CD\u65B0\u5F00\u59CB\uFF1B\u7B2C\u4E03\u5929\u83B7\u5F97\u7EAA\u5FF5\u5FBD\u7AE0\u3002\u540C\u6B3E\u4E0D\u91CD\u590D\u751F\u6210\uFF0C\u4E0D\u5151\u6362\u7B79\u7801\u3002');
   c.append(button(claimed?'\u4ECA\u65E5\u5DF2\u9886\u53D6':'\u9886\u53D6\u4ECA\u65E5\u5956\u52B1',()=>action('reward.claim',[],'\u7B7E\u5230\u5956\u52B1\u5DF2\u5230\u8D26\u3002'),claimed));const countdown=el('p','','v2-muted');countdown.dataset.countdown=String(p.periods.nextDay);c.append(countdown);parent.append(c);}
  function quests(parent){const filters=el('div','','v2-tabs');for(const [kind,label]of [['all','\u5168\u90E8'],['day','\u6BCF\u65E5'],['week','\u6BCF\u5468'],['alltime','\u4E00\u6B21\u6027'],['event','\u6D3B\u52A8']])filters.append(button(label,()=>{questFilter=kind;lastKey='';render();}));parent.append(filters);const grid=el('div','','v2-grid');
   for(const q of data().quests.filter(q=>questFilter==='all'||q.period===(questFilter==='alltime'?'all':questFilter))){const c=card(q.name);message(c,\`\${fmt(q.progress)} / \${fmt(q.target)} \xB7 \u5956\u52B1 \${fmt(q.xp||0)} XP\`);progress(c,q.progress,q.target);if(q.endsAt){const t=el('p','','v2-muted');t.dataset.countdown=String(q.endsAt);c.append(t);}c.append(button(q.claimed?'\u5DF2\u9886\u53D6':'\u9886\u53D6\u5956\u52B1',()=>action('quest.claim',[q.id],'\u4EFB\u52A1\u5956\u52B1\u5DF2\u9886\u53D6\u3002'),q.claimed||q.progress<q.target));grid.append(c);}if(!grid.children.length)message(grid,'\u5F53\u524D\u6CA1\u6709\u8FD9\u7C7B\u4EFB\u52A1\u3002');parent.append(grid);}
  function achievements(parent){const p=data(),grid=el('div','','v2-grid');for(const d of p.definitions.filter(d=>d.kind==='achievement'&&(d.enabled||p.progress.achievements[d.id]))){const earned=p.progress.achievements[d.id],c=card(d.name),source=p.progress[d.period]||p.progress,values={games:source.games,types:Object.keys(source.types||source.gameTypes||{}).length,profile:Number(p.progress.profileCompleted),club:p.progress.clubsJoined,quests:p.progress.questsCompleted,items:p.inventory.length},amount=earned?d.target:Math.min(d.target,values[d.condition]||0);message(c,(d.category||'Achievements')+' \xB7 '+(earned?'\u5DF2\u89E3\u9501':'\u5C1A\u672A\u89E3\u9501'));message(c,\`\${fmt(amount)} / \${fmt(d.target)} \xB7 \${d.condition}\`);progress(c,amount,d.target);for(const id of d.itemIds||[])c.append(el('span',p.items.find(i=>i.id===id)?.name||id,'v2-pill'));if(earned)message(c,new Date(earned).toLocaleString());grid.append(c);}parent.append(grid);}
  function inventory(parent){const p=data(),controls=el('div','','v2-filters');select(controls,'\u5206\u7C7B',[['all','\u5168\u90E8'],['frame','\u5934\u50CF\u6846'],['badge','\u5FBD\u7AE0'],['title','\u79F0\u53F7'],['background','\u80CC\u666F'],['souvenir','\u7EAA\u5FF5\u54C1']],inventoryKind).addEventListener('change',event=>{inventoryKind=event.target.value;lastKey='';render();});select(controls,'\u7A00\u6709\u5EA6',[['all','\u5168\u90E8'],['common','\u666E\u901A'],['rare','\u7A00\u6709'],['epic','\u53F2\u8BD7'],['legendary','\u4F20\u8BF4']],inventoryRarity).addEventListener('change',event=>{inventoryRarity=event.target.value;lastKey='';render();});check(controls,'\u4EC5\u770B\u5DF2\u62E5\u6709',inventoryOwned).addEventListener('change',event=>{inventoryOwned=event.target.checked;lastKey='';render();});parent.append(controls);
   const grid=el('div','','v2-grid'),owned=new Map(p.inventory.map(i=>[i.itemId,i]));for(const item of [...p.items].filter(i=>(inventoryKind==='all'||i.kind===inventoryKind)&&(inventoryRarity==='all'||i.rarity===inventoryRarity)&&(!inventoryOwned||owned.has(i.id))).sort((a,b)=>a.name.localeCompare(b.name))){const c=card(item.name);c.classList.add('v2-item');c.dataset.rarity=item.rarity;c.append(el('div',item.name,'v2-item-preview'));const rarity=el('span',item.rarity,'v2-pill');rarity.dataset.rarity=item.rarity;c.append(rarity);message(c,item.description);const ownership=owned.get(item.id);message(c,ownership?'\u83B7\u5F97\u4E8E '+new Date(ownership.createdAt).toLocaleString()+' \xB7 '+ownership.source:'\u5C1A\u672A\u62E5\u6709');
    c.append(button('\u67E5\u770B / \u9884\u89C8',()=>{itemPreview=item;lastKey='';render();}));if(ownership&&item.enabled){if(['frame','title','background'].includes(item.kind)){const equipped=p.profile.equipped[item.kind]===item.id;c.append(button(equipped?'\u53D6\u6D88\u88C5\u5907':'\u88C5\u5907',()=>action('inventory.equip',[item.kind,equipped?null:item.id])));}else if(item.kind==='badge'){const featured=p.profile.featuredBadges.includes(item.id);c.append(button(featured?'\u53D6\u6D88\u5C55\u793A':'\u7CBE\u9009\u5C55\u793A',()=>action('inventory.equip',['badges',featured?p.profile.featuredBadges.filter(id=>id!==item.id):[...p.profile.featuredBadges,item.id]]),!featured&&p.profile.featuredBadges.length>=3));}}grid.append(c);}
   if(itemPreview){const preview=card('\u9884\u89C8 \xB7 '+itemPreview.name);preview.append(el('div',engine.active.name+' \xB7 '+itemPreview.name,'v2-item-preview'));message(preview,itemPreview.description);preview.append(button('\u5173\u95ED\u9884\u89C8',()=>{itemPreview=null;lastKey='';render();}));parent.append(preview);}if(!grid.children.length)message(grid,'\u6CA1\u6709\u7B26\u5408\u7B5B\u9009\u7684\u7269\u54C1\u3002');parent.append(grid);}
  async function load(){if(loading)return;loading=true;try{if(view==='leaderboard')remote=await engine.api(\`/api/leaderboards?metric=\${leaderMetric}&period=\${leaderPeriod}&page=\${leaderPage}&query=\${encodeURIComponent(leaderQuery)}\`);else if(view==='clubs')remote=await engine.api('/api/clubs');else if(view==='profile'&&publicId&&publicId!==engine.active.id)remote=await engine.api('/api/players/'+encodeURIComponent(publicId));}catch(error){callbacks.notify(error.message,true);remote={error:error.message};}finally{loading=false;lastKey='';render();}}
  function leaderboard(parent){const controls=el('div','','v2-filters');select(controls,'\u6392\u884C',[['xp','XP'],['wallet','\u4F59\u989D'],['games','\u5B8C\u6210\u5BF9\u5C40'],['achievements','\u6210\u5C31'],['activity','\u6D3B\u52A8']],leaderMetric).addEventListener('change',event=>{leaderMetric=event.target.value;leaderPage=1;remote=null;load();});select(controls,'\u65F6\u95F4',[['all','V2 \u7D2F\u8BA1'],['week','\u672C\u5468'],['month','\u672C\u6708']],leaderPeriod).addEventListener('change',event=>{leaderPeriod=event.target.value;leaderPage=1;remote=null;load();});const search=input(controls,'\u641C\u7D22\u73A9\u5BB6',leaderQuery,'search');search.addEventListener('change',()=>{leaderQuery=search.value;leaderPage=1;remote=null;load();});parent.append(controls);message(parent,leaderMetric==='wallet'?'\u5F53\u524D\u6B63\u5F0F\u4F59\u989D\uFF0C\u5305\u542B\u65E7\u4F59\u989D\u548C\u7BA1\u7406\u5458\u8C03\u6574\uFF1B\u672A\u516C\u5F00\u4F59\u989D\u7684\u73A9\u5BB6\u4E0D\u8FDB\u5165\u672C\u699C\u3002':'\u53EA\u7EDF\u8BA1 V2 \u6B63\u5F0F\u6D3B\u52A8\u3002\u76F8\u540C\u6570\u503C\u5E76\u5217\u6392\u540D\uFF1B\u6C99\u76D2\u4E0D\u8BA1\u5165\u3002');
   if(!remote){message(parent,'\u6B63\u5728\u8F7D\u5165\u6392\u884C\u699C\u2026');return;}if(remote.error){message(parent,remote.error);return;}const wrap=el('div','','v2-table-wrap'),table=el('table','','v2-table'),head=el('tr');for(const name of ['RANK','\u73A9\u5BB6','\u7B49\u7EA7','\u6570\u503C'])head.append(el('th',name));table.append(head);
   for(const item of remote.rows){const r=el('tr');r.dataset.self=String(item.id===engine.active.id);const name=el('td'),link=el('a',item.name);link.href='#profile/'+item.id;link.addEventListener('click',event=>{event.preventDefault();callbacks.setView('profile/'+item.id);});name.append(link);r.append(el('td','#'+item.rank),name,el('td','Lv. '+item.level),el('td',fmt(item.score)));table.append(r);}wrap.append(table);parent.append(wrap);const paging=el('div','','v2-actions');paging.append(button('\u4E0A\u4E00\u9875',()=>{leaderPage--;remote=null;load();},leaderPage<=1),el('span',\`\${remote.page} / \${remote.pages}\`,'v2-muted'),button('\u4E0B\u4E00\u9875',()=>{leaderPage++;remote=null;load();},leaderPage>=remote.pages));parent.append(paging);if(!remote.rows.length)message(parent,'\u6CA1\u6709\u5339\u914D\u73A9\u5BB6\u3002');}
  function clubs(parent){const result=remote||data().club;if(!result){message(parent,'\u6B63\u5728\u8F7D\u5165\u4FF1\u4E50\u90E8\u2026');return;}if(result.error){message(parent,result.error);return;}
   for(const invite of result.incoming||[]){const c=card('\u4FF1\u4E50\u90E8\u9080\u8BF7 \xB7 '+invite.clubName);message(c,'\u6709\u6548\u671F\u81F3 '+new Date(invite.expiresAt).toLocaleString());c.append(button('\u63A5\u53D7',()=>action('club.respond',[invite.id,true],'\u5DF2\u52A0\u5165\u4FF1\u4E50\u90E8\u3002')),button('\u62D2\u7EDD',()=>action('club.respond',[invite.id,false])));parent.append(c);}
   if(!result.club){const c=card('\u521B\u5EFA\u79C1\u6709\u4FF1\u4E50\u90E8'),name=input(c,'\u4FF1\u4E50\u90E8\u540D\u79F0'),description=input(c,'\u4ECB\u7ECD');name.maxLength=32;description.maxLength=200;c.append(button('\u521B\u5EFA',()=>action('club.create',[{name:name.value,description:description.value}],'\u4FF1\u4E50\u90E8\u5DF2\u521B\u5EFA\u3002')));message(c,'\u6BCF\u4EBA\u540C\u65F6\u53EA\u80FD\u52A0\u5165\u4E00\u4E2A\u4FF1\u4E50\u90E8\u3002\u4E5F\u53EF\u4EE5\u7B49\u5F85\u670B\u53CB\u53D1\u6765\u9080\u8BF7\u3002');parent.append(c);return;}
   const club=result.club,isOwner=club.ownerId===engine.active.id,c=card(club.name);message(c,club.description);message(c,isOwner?'\u4F60\u662F\u4FF1\u4E50\u90E8\u6240\u6709\u8005':'\u4F60\u662F\u4FF1\u4E50\u90E8\u6210\u5458');c.append(button('\u9000\u51FA\u4FF1\u4E50\u90E8',()=>action('club.leave',[],'\u5DF2\u9000\u51FA\u3002','\u786E\u8BA4\u9000\u51FA\u5F53\u524D\u4FF1\u4E50\u90E8\uFF1F\u8D21\u732E\u8BB0\u5F55\u4F1A\u4FDD\u7559\u3002')));parent.append(c);
   const challenge=card('\u672C\u5468\u56E2\u961F\u6311\u6218');progress(challenge,result.challenge.progress,result.challenge.target);message(challenge,\`\${result.challenge.progress} / \${result.challenge.target} \u5C40 \xB7 \u53C2\u4E0E\u6210\u5458\u53EF\u9886\u53D6 100 XP\`);challenge.append(button(result.challenge.claimed?'\u5DF2\u9886\u53D6':'\u9886\u53D6\u56E2\u961F\u5956\u52B1',()=>action('club.claim',[],'\u56E2\u961F\u5956\u52B1\u5DF2\u9886\u53D6\u3002'),result.challenge.claimed||result.challenge.progress<50||!result.challenge.participated));parent.append(challenge);
   const members=card('\u6210\u5458\u4E0E\u672C\u5468\u8D21\u732E');for(const member of result.members){const person=engine.directory.find(u=>u.id===member.id),count=result.leaderboard.find(u=>u.playerId===member.id)?.rounds||0,actions=el('div','','v2-actions');if(isOwner&&member.id!==engine.active.id)actions.append(button('\u8F6C\u79FB\u6240\u6709\u6743',()=>action('club.transfer',[member.id],'\u6240\u6709\u6743\u5DF2\u8F6C\u79FB\u3002','\u786E\u8BA4\u5C06\u4FF1\u4E50\u90E8\u4EA4\u7ED9 '+person?.name+'\uFF1F')),button('\u79FB\u9664',()=>action('club.remove',[member.id],'\u5DF2\u79FB\u9664\u6210\u5458\u3002','\u786E\u8BA4\u79FB\u9664\u8BE5\u6210\u5458\uFF1F')));row(members,person?.name||member.id,\`\${count} \u5C40\${club.ownerId===member.id?' \xB7 Owner':''}\`,actions);}parent.append(members);
   if(isOwner){const manage=card('\u4FF1\u4E50\u90E8\u7BA1\u7406'),name=input(manage,'\u540D\u79F0',club.name),description=input(manage,'\u4ECB\u7ECD',club.description);manage.append(button('\u4FDD\u5B58\u4ECB\u7ECD',()=>action('club.update',[{name:name.value,description:description.value}])));const recipient=select(manage,'\u9080\u8BF7\u670B\u53CB',engine.directory.filter(u=>!result.members.some(m=>m.id===u.id)).map(u=>[u.id,u.name]));manage.append(button('\u53D1\u9001\u9080\u8BF7',()=>action('club.invite',[recipient.value],'\u9080\u8BF7\u5DF2\u53D1\u9001\u3002'),!recipient.options.length));for(const invitation of result.outgoing||[])row(manage,engine.directory.find(u=>u.id===invitation.targetId)?.name||invitation.targetId,'\u9080\u8BF7\u5F85\u5904\u7406',button('\u64A4\u9500',()=>action('club.revoke',[invitation.id])));manage.append(button('\u5F52\u6863\u4FF1\u4E50\u90E8',()=>action('club.archive',[],'\u4FF1\u4E50\u90E8\u5DF2\u5F52\u6863\u3002','\u786E\u8BA4\u5F52\u6863\u4FF1\u4E50\u90E8\uFF1F\u9700\u8981\u5148\u79FB\u9664\u5176\u4ED6\u6210\u5458\u3002')));parent.append(manage);}
   const feed=card('\u4FF1\u4E50\u90E8\u52A8\u6001');for(const event of result.feed||[])row(feed,event.kind,new Date(event.createdAt).toLocaleString());if(!result.feed?.length)message(feed,'\u8FD8\u6CA1\u6709\u6D3B\u52A8\u8BB0\u5F55\u3002');parent.append(feed);
  }
  async function loadAdmin(){if(adminLoading||!engine.auth?.admin)return;adminLoading=true;try{adminData=await engine.api('/api/admin/overview');adminRevision=engine.revision;engine.adminPlayers=adminData.players;lastKey='';renderAdmin();callbacks.changed();}catch(error){callbacks.notify(error.message,true);}finally{adminLoading=false;}}
  function renderAdmin(){adminRoot.hidden=!engine.auth?.admin;if(!adminData||!engine.auth?.admin)return;adminRoot.replaceChildren();const head=card('ADMIN V2 \xB7 \u6743\u9650\u4E0E\u7CFB\u7EDF');message(head,'\u654F\u611F\u64CD\u4F5C\u9700\u8981\u89D2\u8272\u6743\u9650\u548C Windows Hello\u3002\u65E7\u73A9\u5BB6\u7531\u7BA1\u7406\u5458\u7ED1\u5B9A\uFF0C\u4E0D\u5F00\u653E\u81EA\u884C\u8BA4\u9886\u3002');head.append(button('\u8FDB\u5165\u72EC\u7ACB\u6C99\u76D2',async()=>{try{await engine.setSandbox(true);callbacks.setView('slots');callbacks.changed();}catch(e){callbacks.notify(e.message,true);}}));
   head.append(button(adminData.maintenance?'\u6062\u590D\u670D\u52A1':'\u5F00\u542F\u53EA\u8BFB\u7EF4\u62A4',()=>action('admin.maintenance',[!adminData.maintenance,adminData.maintenance?'owner resumes service':'owner starts maintenance'],'\u7EF4\u62A4\u72B6\u6001\u5DF2\u66F4\u65B0\u3002','\u786E\u8BA4\u5207\u6362\u7EF4\u62A4\u72B6\u6001\uFF1F')));
   head.append(button('\u4E0B\u8F7D\u4E00\u81F4\u6027\u5907\u4EFD',async()=>{try{const backup=await engine.api('/api/admin/backup');download(backup,'roulette-club-v2-backup-'+new Date().toISOString().slice(0,10)+'.json');callbacks.notify('\u5907\u4EFD\u5DF2\u4E0B\u8F7D\uFF0C\u8BF7\u4FDD\u5B58\u5728\u79C1\u5BC6\u4F4D\u7F6E\u3002');}catch(error){callbacks.notify(error.message,true);}}));message(head,'\u5BFC\u51FA\u524D\u5FC5\u987B\u5F00\u542F\u53EA\u8BFB\u7EF4\u62A4\u3002\u5907\u4EFD\u5305\u542B\u79C1\u4EBA\u8D44\u6599\uFF0C\u8BF7\u52FF\u516C\u5F00\u5206\u4EAB\u3002');adminRoot.append(head);
   const accounts=card('\u8D26\u53F7\u4E0E\u65E7\u73A9\u5BB6\u7ED1\u5B9A');message(accounts,'\u5148\u901A\u8FC7\u7AD9\u70B9\u5171\u4EAB\u529F\u80FD\u9080\u8BF7\u670B\u53CB\u3002\u670B\u53CB\u9996\u6B21\u767B\u5F55\u540E\uFF0C\u4F1A\u663E\u793A\u4E3A\u5F85\u7ED1\u5B9A\u8D26\u53F7\u3002');for(const a of adminData.accounts){const box=card(a.email||a.actor);message(box,\`\${a.role} \xB7 \${a.status} \xB7 \${adminData.players.find(p=>p.id===a.playerId)?.name||'\u672A\u7ED1\u5B9A'}\`);
    if(!a.playerId){const choice=select(box,'\u7ED1\u5B9A\u5DF2\u6709\u73A9\u5BB6',adminData.players.filter(u=>!adminData.accounts.some(other=>other.playerId===u.id)).map(u=>[u.id,u.name]));box.append(button('\u7ED1\u5B9A',()=>action('admin.bind',[a.actor,choice.value],'\u5DF2\u7ED1\u5B9A\u3002','\u786E\u8BA4\u5C06\u8BE5\u65E7\u73A9\u5BB6\u5206\u914D\u7ED9\u6B64\u8D26\u53F7\uFF1F')));}
    if(engine.auth.role==='owner'&&a.role!=='owner'){const role=select(box,'\u89D2\u8272',[['member','\u6210\u5458'],['admin','\u7BA1\u7406\u5458']],a.role),status=select(box,'\u72B6\u6001',[['active','\u542F\u7528'],['suspended','\u505C\u7528'],['pending','\u5F85\u7ED1\u5B9A']],a.status),reason=input(box,'\u4FEE\u6539\u539F\u56E0');box.append(button('\u4FDD\u5B58\u89D2\u8272 / \u72B6\u6001',()=>action('admin.account',[a.actor,role.value,status.value,reason.value],'\u8D26\u53F7\u5DF2\u66F4\u65B0\u3002','\u786E\u8BA4\u66F4\u6539\u8BE5\u8D26\u53F7\u7684\u6743\u9650\uFF1F')));}accounts.append(box);}adminRoot.append(accounts);
   const config=card('\u6210\u957F\u8BBE\u7F6E'),cfg=adminData.definitions.find(d=>d.kind==='settings'),game=input(config,'\u6BCF\u5C40 XP',cfg.gameXP,'number'),cap=input(config,'\u6BCF\u65E5\u5BF9\u5C40 XP \u4E0A\u9650',cfg.dailyGameCap,'number'),factor=input(config,'\u7B49\u7EA7\u95E8\u69DB\u7CFB\u6570',cfg.levelFactor,'number'),days=cfg.dailyXP.map((n,i)=>input(config,'\u7B2C '+(i+1)+' \u5929 XP',n,'number'));config.append(button('\u4FDD\u5B58\u6210\u957F\u914D\u7F6E',()=>action('admin.definition',[{...cfg,gameXP:Number(game.value),dailyGameCap:Number(cap.value),levelFactor:Number(factor.value),dailyXP:days.map(n=>Number(n.value))}])));adminRoot.append(config);
   const definitions=card('\u4EFB\u52A1\u4E0E\u6210\u5C31\u914D\u7F6E');for(const d of adminData.definitions.filter(d=>d.kind!=='settings'))row(definitions,d.name,\`\${d.kind} \xB7 v\${d.version} \xB7 \${d.enabled?'\u542F\u7528':'\u505C\u7528'}\`,button('\u7F16\u8F91',()=>{selectedDefinition=d;renderAdmin();}));definitions.append(button('\u65B0\u589E\u4EFB\u52A1',()=>{selectedDefinition={kind:'quest',period:'day',condition:'games',target:1,xp:20,enabled:true};renderAdmin();}),button('\u65B0\u589E\u6210\u5C31',()=>{selectedDefinition={kind:'achievement',period:'all',condition:'games',target:1,xp:0,enabled:true};renderAdmin();}));adminRoot.append(definitions);
   if(selectedDefinition){const d=selectedDefinition,f=card('\u7F16\u8F91 '+(d.name||'\u65B0\u5B9A\u4E49')),name=input(f,'\u540D\u79F0',d.name||''),period=select(f,'\u5468\u671F',[['day','\u6BCF\u65E5'],['week','\u6BCF\u5468'],['month','\u6BCF\u6708'],['all','\u4E00\u6B21\u6027'],['event','\u9650\u65F6\u6D3B\u52A8']],d.period),condition=select(f,'\u76EE\u6807',[['games','\u5B8C\u6210\u5BF9\u5C40'],['types','\u4E0D\u540C\u6E38\u620F\u6570'],['profile','\u5B8C\u5584\u8D44\u6599'],['club','\u52A0\u5165\u4FF1\u4E50\u90E8'],['quests','\u9886\u53D6\u4EFB\u52A1\u6570'],['items','\u6536\u85CF\u6570\u91CF']],d.condition),target=input(f,'\u76EE\u6807\u6570\u91CF',d.target,'number'),xp=input(f,'XP \u5956\u52B1',d.xp||0,'number'),item=select(f,'\u88C5\u9970\u5956\u52B1',[['','\u65E0'],...adminData.items.filter(i=>i.enabled).map(i=>[i.id,i.name])],d.itemIds?.[0]||''),enabled=check(f,'\u542F\u7528',d.enabled),start=input(f,'\u6D3B\u52A8\u5F00\u59CB\uFF08\u5317\u4EAC\u65F6\u95F4\uFF09',d.startsAt?new Date(d.startsAt+28800000).toISOString().slice(0,16):'','datetime-local'),end=input(f,'\u6D3B\u52A8\u7ED3\u675F\uFF08\u5317\u4EAC\u65F6\u95F4\uFF09',d.endsAt?new Date(d.endsAt+28800000).toISOString().slice(0,16):'','datetime-local');
    f.append(button('\u4FDD\u5B58\u5B9A\u4E49',async()=>{const value={...d,id:d.id||crypto.randomUUID(),name:name.value,period:period.value,condition:condition.value,target:Number(target.value),xp:Number(xp.value),itemIds:item.value?[item.value]:[],enabled:enabled.checked};if(period.value==='event'){value.startsAt=Date.parse(start.value+':00+08:00');value.endsAt=Date.parse(end.value+':00+08:00');}if(await action('admin.definition',[value])){selectedDefinition=null;await loadAdmin();}}),button('\u5173\u95ED\u7F16\u8F91',()=>{selectedDefinition=null;renderAdmin();}));adminRoot.append(f);}
   const items=card('\u6536\u85CF\u4E0E\u79F0\u53F7\u914D\u7F6E');for(const i of adminData.items)row(items,i.name,i.kind+' \xB7 '+i.rarity,button('\u7F16\u8F91',()=>{selectedItem=i;renderAdmin();}));items.append(button('\u65B0\u589E\u88C5\u9970\u54C1',()=>{selectedItem={kind:'badge',rarity:'common',enabled:true};renderAdmin();}));adminRoot.append(items);
   if(selectedItem){const i=selectedItem,f=card('\u7F16\u8F91\u88C5\u9970\u54C1'),name=input(f,'\u540D\u79F0',i.name||''),description=input(f,'\u63CF\u8FF0',i.description||''),kind=select(f,'\u5206\u7C7B',[['badge','\u5FBD\u7AE0'],['frame','\u5934\u50CF\u6846'],['title','\u79F0\u53F7'],['background','\u80CC\u666F'],['souvenir','\u7EAA\u5FF5\u54C1']],i.kind),rarity=select(f,'\u7A00\u6709\u5EA6',[['common','\u666E\u901A'],['rare','\u7A00\u6709'],['epic','\u53F2\u8BD7'],['legendary','\u4F20\u8BF4']],i.rarity),enabled=check(f,'\u542F\u7528',i.enabled);f.append(button('\u4FDD\u5B58\u7269\u54C1',async()=>{if(await action('admin.item',[{id:i.id||crypto.randomUUID(),name:name.value,description:description.value,kind:kind.value,rarity:rarity.value,enabled:enabled.checked}])){selectedItem=null;await loadAdmin();}}),button('\u5173\u95ED\u7F16\u8F91',()=>{selectedItem=null;renderAdmin();}));adminRoot.append(f);}
   const moderation=card('\u4FF1\u4E50\u90E8\u7BA1\u7406');for(const c of adminData.clubs.filter(c=>!c.archived)){const box=card(c.name),reason=input(box,'\u5F52\u6863\u539F\u56E0');box.append(button('\u5F52\u6863 / \u89E3\u9664\u6210\u5458',()=>action('admin.club',[c.id,reason.value],'\u4FF1\u4E50\u90E8\u5DF2\u5F52\u6863\u3002','\u786E\u8BA4\u5F52\u6863\u6B64\u4FF1\u4E50\u90E8\u5E76\u89E3\u9664\u5176\u6210\u5458\u5173\u7CFB\uFF1F')));moderation.append(box);}adminRoot.append(moderation);
   const journal=card('\u6C38\u4E45\u5BA1\u8BA1\u4E0E\u8C03\u6574\u8865\u507F'),list=el('ol','','v2-log');for(const e of adminData.journal){const li=el('li',\`\${new Date(e.createdAt).toLocaleString()} \xB7 \${e.actor} \xB7 \${e.kind} \xB7 \${e.asset}: \${e.before} \u2192 \${e.after} \xB7 \${e.reason||''}\`);if(e.kind==='adminAdjust'&&e.asset==='cash'){const reason=input(li,'\u8865\u507F\u539F\u56E0');li.append(button('\u5173\u8054\u8865\u507F',()=>action('admin.compensate',[e.id,reason.value],'\u5DF2\u8FFD\u52A0\u8865\u507F\u4EA4\u6613\u3002','\u786E\u8BA4\u8FFD\u52A0\u4E00\u7B14\u53CD\u5411\u8865\u507F\uFF1F\u539F\u6D41\u6C34\u4E0D\u4F1A\u88AB\u4FEE\u6539\u3002')));}list.append(li);}journal.append(list);message(journal,'\u8FD9\u91CC\u53EA\u5C55\u793A\u6700\u8FD1 100 \u6761\uFF1B\u5168\u90E8\u8BB0\u5F55\u4FDD\u5B58\u5728\u6C38\u4E45\u8D26\u672C\uFF0C\u5907\u4EFD\u5305\u542B\u5B8C\u6574\u8BB0\u5F55\u3002');adminRoot.append(journal);
   const logs=card('\u7CFB\u7EDF\u5065\u5EB7\u4E0E\u4E8B\u4EF6');message(logs,\`V2 \xB7 revision \${adminData.health.revision} \xB7 \u6570\u636E\u51C6\u5907 \${adminData.health.ready?'\u5B8C\u6210':'\u8FDB\u884C\u4E2D'}\`);const eventList=el('ol','','v2-log');for(const event of adminData.events)eventList.append(el('li',\`\${new Date(event.createdAt).toLocaleString()} \xB7 \${event.kind} \xB7 \${event.actor||event.playerId||'system'}\`));logs.append(eventList);logs.append(button('\u67E5\u770B\u8FD1 30 \u65E5\u7EDF\u8BA1',async()=>{try{const stats=await engine.api('/api/admin/analytics');const panel=card('\u8FD1 30 \u65E5\u7EDF\u8BA1');message(panel,'24 \u5C0F\u65F6\u6D3B\u8DC3\u73A9\u5BB6 '+stats.activePlayers24h);message(panel,stats.accounting);message(panel,\`\u7B79\u7801\u589E\u52A0 \${fmt(stats.cashIncreases)} \xB7 \u51CF\u5C11 \${fmt(stats.cashDecreases)}\`);for(const x of stats.events)row(panel,x.kind,String(x.count));for(const x of stats.claims)row(panel,'\u5956\u52B1 '+x.kind,String(x.count));logs.append(panel);}catch(e){callbacks.notify(e.message,true);}}));adminRoot.append(logs);
  }
  function tick(){for(const node of rootNode.querySelectorAll('[data-countdown]')){const seconds=Math.max(0,Math.ceil((Number(node.dataset.countdown)-engine.now())/1000));node.textContent=\`\u91CD\u7F6E / \u5230\u671F\u8FD8\u5269 \${Math.floor(seconds/3600)} \u65F6 \${Math.floor(seconds%3600/60)} \u5206 \${seconds%60} \u79D2\`;}}
  function render(){const p=data();$('v2-sandbox-banner').hidden=p.mode!=='sandbox';if(!engine.auth?.admin){adminRoot.hidden=true;adminData=null;engine.adminPlayers=[];}if(!p.progress)return;for(const id of Object.keys(p.progress.achievements))if(!seen.has(id)){seen.add(id);callbacks.notify('\u6210\u5C31\u89E3\u9501\uFF1A'+(p.definitions.find(d=>d.id===id)?.name||id));}root.CasinoPreferences=p.profile?.settings||{};document.body.dataset.reducedMotion=String(Boolean(p.profile?.settings.reducedMotion));$('v2-sandbox-banner').hidden=p.mode!=='sandbox';
   for(const d of $('club-player-tabs').querySelectorAll('details'))d.dataset.active=String(groups.find(g=>g.id===d.dataset.group)?.items.some(i=>i[0]===view));
   if(view==='admin'&&engine.auth.admin&&adminRevision!==engine.revision&&!adminLoading)loadAdmin();
   const key=engine.money.stringify([view,publicId,p,remote,inventoryKind,inventoryRarity,inventoryOwned,itemPreview,questFilter]);if(key===lastKey)return;lastKey=key;
   const parent=sections[view];if(!parent)return;const active=document.activeElement,selection=active&&parent.contains(active)?{index:[...parent.querySelectorAll('input,textarea,select')].indexOf(active),value:active.value,start:active.selectionStart,end:active.selectionEnd}:null;
   parent.replaceChildren();heading(parent,groups.flatMap(g=>g.items).find(i=>i[0]===view)?.[1]||view,'\u4EC5\u4F7F\u7528\u5F53\u524D\u8D26\u53F7\u53EF\u8BBF\u95EE\u7684\u6570\u636E\u3002');
   ({dashboard,profile,settings,rewards,quests,achievements,inventory,leaderboard,clubs})[view]?.(parent);tick();
   if(selection){const field=parent.querySelectorAll('input,textarea,select')[selection.index];if(field){field.value=selection.value;field.focus({preventScroll:true});if(typeof field.setSelectionRange==='function'&&selection.start!==null)try{field.setSelectionRange(selection.start,selection.end);}catch{}}}
  }
  $('v2-sandbox-exit').addEventListener('click',async()=>{if(callbacks.locked())return;try{await engine.setSandbox(false);lastKey='';callbacks.changed();}catch(e){callbacks.notify(e.message,true);}});
  let seen=new Set(Object.keys(data().progress?.achievements||{}));
  return {render,tick,confirm:confirmAction,paint(next,route){const prior=view,priorId=publicId;view=next;publicId=next==='profile'?route?.split('/')[1]||null:null;for(const [name,shell]of Object.entries(sections))shell.parentElement.hidden=name!==view;if(prior!==view||priorId!==publicId){lastKey='';remote=null;if(['leaderboard','clubs','profile'].includes(view))load();}render();},get views(){return views;}};
 }
 root.CasinoV2={groups,views,createFeatures,createOnboarding,confirm:confirmAction};
})(globalThis);

function createCasinoClub(roulette) {
    'use strict';
    let browserStorage;
    try { browserStorage = window.localStorage; } catch { /* Session mode is supported. */ }
    const engine = new CasinoEngine(browserStorage);
    if (engine.platform && !engine.platform.account.playerId) return CasinoV2.createOnboarding(roulette);
    const v2 = Boolean(engine.platform), directory = () => engine.directory || engine.data.users;
    if (!browserStorage && !engine.remote) engine.storageWarning = 'Browser storage is unavailable. This session is temporary.';
    for (const key of ['balance', 'bets', 'lastBets', 'history']) {
        Object.defineProperty(roulette, key, { configurable: true, enumerable: true,
            get: () => engine.active[key], set: value => { engine.active[key] = value; } });
    }
    let view = 'roulette', toastTimer, lucky, blackjack, plinko, dice, lottery, features, customRoulette, economy, playerLoans, accounts, admin, distress, adminPage = 1, recoveryPlayer = null, pendingDelete = null;
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
        $('transfer-user').replaceChildren(...directory().filter(p => p.id !== u.id).map(option));
        if ([...$('transfer-user').options].some(o => o.value === selectedRecipient)) $('transfer-user').value = selectedRecipient;
        const visualWallet = (view === 'plinko' ? plinko?.displayBalance : view === 'dice' ? dice?.displayBalance : view === 'lottery' ? lottery?.displayBalance : lucky?.displayBalance) ?? u.balance;
        $('club-wallet').textContent = u.recovery ? \`-\${fmt(u.recovery.deficit)} \xB7 \u53EF\u7528 \${fmt(visualWallet)} \u20B5\` : \`\${fmt(visualWallet)} \u20B5\`;
        $('bank-greeting').textContent = \`\${u.name}\u2019s wallet & bank\`;
        $('bank-wallet').textContent = fmt(u.balance);
        $('bank-debt').textContent = fmt(u.debt);
        $('bank-credit').textContent = fmt(engine.availableCredit);
        $('club-storage-note').textContent = engine.storageWarning;
        const adminSelection = CasinoAccounts.selectPlayers(v2 ? (engine.adminPlayers || []) : engine.data.users,{query:$('admin-player-search').value,page:adminPage});
        adminPage = adminSelection.page;
        $('admin-player-count').textContent = \`\${adminSelection.total} \u4F4D\u5339\u914D \xB7 \u5171 \${(v2 ? engine.adminPlayers || [] : engine.data.users).length} \u4F4D\u73A9\u5BB6\`;
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
            button.textContent = v2 ? '\u67E5\u770B\u8D44\u6599' : p.id === u.id ? 'Playing' : 'Switch';
            button.disabled = (!v2 && p.id === u.id) || viewLocked();
            button.addEventListener('click', () => v2 ? setView('profile/'+p.id) : switchPlayer(p.id));
            const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'club-action secondary danger';
            remove.textContent = pendingDelete === p.id ? (v2 ? '\u518D\u6B21\u70B9\u51FB\u786E\u8BA4\u5F52\u6863\uFF08\u4FDD\u7559\u5BA1\u8BA1\uFF09' : '\u518D\u6B21\u70B9\u51FB\u786E\u8BA4\u6C38\u4E45\u5220\u9664\uFF08\u542B\u4F59\u989D\uFF09') : (v2 ? '\u5F52\u6863' : '\u5220\u9664');
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
        features?.render();
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
        features?.paint(view, window.location.hash.slice(1));
        render();
    }
    function setView(next) {
        const route = next; next = next.split('/')[0];
        if (!['roulette', 'slots', 'blackjack', 'plinko', 'dice', 'lottery', 'bank', 'market', 'players', 'admin'].includes(next) && !(v2 && CasinoV2.views.includes(next))) return;
        if (engine.platform?.mode === 'sandbox' && !['roulette','slots','blackjack','plinko','dice','lottery','admin'].includes(next)) { toast('\u8BF7\u5148\u9000\u51FA\u7BA1\u7406\u5458\u6C99\u76D2\u3002',true); return; }
        if (viewLocked()) { toast('Finish the current round before changing tables.', true); return; }
        view = next;
        paintView();
        features?.paint(view, route);
        try { window.history.replaceState(null, '', '#' + route); } catch { /* Local file previews still work. */ }
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
        if (v2) features = CasinoV2.createFeatures(engine,{locked:viewLocked,changed:()=>updateBettingHUD(),notify:toast,setView});
        bindJackpotShortcut(window, () => {
            if (distress?.blocking) return false;
            if (!['roulette', 'slots', 'blackjack', 'plinko', 'dice', 'lottery'].includes(view)) return false;
            if (v2 && engine.platform.mode !== 'sandbox') { toast('\u7279\u6B8A\u5F00\u5956\u4EC5\u5728 ADMIN \u72EC\u7ACB\u6C99\u76D2\u5F00\u653E\u3002', true); return; }
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
        accounts = createAccountUI(engine, {locked:viewLocked,transact,switchPlayer,profile:id=>setView('profile/'+id),notify:toast});
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
        if (!v2) document.querySelectorAll('[role="tab"]').forEach(tab => tab.addEventListener('keydown', e => {
            const tabs = [...document.querySelectorAll('[role="tab"]')];
            let i = tabs.indexOf(tab);
            if (e.key === 'ArrowRight') i = (i + 1) % tabs.length;
            else if (e.key === 'ArrowLeft') i = (i + tabs.length - 1) % tabs.length;
            else if (e.key === 'Home') i = 0;
            else if (e.key === 'End') i = tabs.length - 1;
            else return;
            e.preventDefault(); setView(tabs[i].dataset.view); tabs[i].focus();
        }));
        const requestedView = window.location.pathname === '/admin' ? 'admin' : window.location.hash.slice(1).split('/')[0];
        if (requestedView === 'admin') view = 'admin';
        else if (blackjack.pending) view = 'blackjack';
        else if (['roulette', 'slots', 'blackjack', 'plinko', 'dice', 'lottery', 'bank', 'market', 'players', 'admin'].includes(requestedView) || v2 && CasinoV2.views.includes(requestedView)) view = requestedView;
        paintView();
        let lastSync = 0;
        const tick = () => {
            if(engine.remote && !viewLocked() && Date.now()-lastSync >= 5000){lastSync=Date.now();engine.sync().catch(()=>{});}
            if (engine.accrueInterest()) { engine.save(); render(); }
            else { economy?.tick(); playerLoans?.tick(); accounts?.tick(); features?.tick(); }
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
                if (!this.enabled || window.CasinoPreferences?.sound === false) return;
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
                if (!this.enabled || window.CasinoPreferences?.sound === false) return;
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
                if (!this.enabled || window.CasinoPreferences?.sound === false) return;
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
                if (!this.enabled || window.CasinoPreferences?.sound === false) return;
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
                if (!this.enabled || window.CasinoPreferences?.sound === false) return;
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
</html>`;var j=(t,e=400)=>{throw Object.assign(new Error(t),{status:e})};function oi(t,e,r,n=!1,i=!1){let o=t.accounts[e];return(!o||o.status!=="active")&&j("\u8D26\u53F7\u5C1A\u672A\u83B7\u9080\u3001\u5DF2\u505C\u7528\u6216\u5C1A\u672A\u5B8C\u6210\u7ED1\u5B9A\u3002",403),n?(!["owner","admin"].includes(o.role)||!i)&&j("\u9700\u8981\u6388\u6743\u7BA1\u7406\u5458\u53CA Windows Hello \u9A8C\u8BC1\u3002",403):(!o.playerId||r&&r!==o.playerId)&&j("\u53EA\u80FD\u64CD\u4F5C\u7ED1\u5B9A\u7ED9\u81EA\u5DF1\u7684\u73A9\u5BB6\u3002",403),o}function Sf(t,e,r){let n=t.users.find(i=>i.id===r.playerId);return{version:t.version,activeId:r.playerId,users:n?[structuredClone(n)]:[],loans:t.loans.filter(i=>[i.lenderId,i.borrowerId].includes(r.playerId)),ledger:[]}}function go(t,e){let r=e.profiles[t.id]||{},n=e.progress[t.id]||{};return{id:t.id,name:t.name,avatar:r.avatar||t.name[0],bio:r.bio||"",xp:n.xp||0,level:n.level||1,games:n.games||0,achievements:Object.keys(n.achievements||{}).length,equipped:r.equipped||{},featuredBadges:r.featuredBadges||[],...r.walletVisible!==!1?{balance:t.recovery?0:t.balance}:{}}}ka();function rt(t){let e=new Date(t+288e5),r=e.toISOString().slice(0,10),n=r.slice(0,7),i=Date.parse(r+"T00:00:00Z"),o=new Date(i-(e.getUTCDay()+6)%7*864e5).toISOString().slice(0,10);return{day:r,week:o,month:n,nextDay:i+864e5-288e5,nextWeek:Date.parse(o+"T00:00:00Z")+7*864e5-288e5,nextMonth:Date.UTC(e.getUTCFullYear(),e.getUTCMonth()+1,1)-288e5}}function Tf(t,e){let r=bd();r.meta={ownerActor:t,startedAt:e,maintenance:!1,version:2};let n=[["frame-starter","frame","\u521D\u89C1\u91D1\u8FB9","common"],["badge-week","badge","\u4E03\u65E5\u7EAA\u5FF5","rare"],["title-newcomer","title","Newcomer","common"],["title-explorer","title","Game Explorer","rare"],["badge-veteran","badge","\u767E\u5C40\u65C5\u4EBA","epic"],["background-night","background","\u7D2B\u591C","rare"],["souvenir-club","souvenir","\u670B\u53CB\u4FF1\u4E50\u90E8\u7EAA\u5FF5","legendary"]];for(let[o,a,s,l]of n)r.items[o]={id:o,kind:a,name:s,rarity:l,description:s+" \xB7 \u4EC5\u9650\u7AD9\u5185\u88C5\u9970\uFF0C\u65E0\u73B0\u91D1\u4EF7\u503C\u3002",enabled:!0};let i=[{id:"settings",kind:"settings",gameXP:5,dailyGameCap:100,levelFactor:100,dailyXP:[20,25,30,35,40,50,75]},{id:"daily-rounds",kind:"quest",period:"day",condition:"games",target:3,xp:40,name:"\u4ECA\u65E5\u4E09\u5C40"},{id:"daily-explore",kind:"quest",period:"day",condition:"types",target:2,xp:40,name:"\u63A2\u7D22\u4E24\u79CD\u73A9\u6CD5"},{id:"weekly-rounds",kind:"quest",period:"week",condition:"games",target:15,xp:200,name:"\u4E00\u5468\u5341\u4E94\u5C40"},{id:"weekly-explore",kind:"quest",period:"week",condition:"types",target:4,xp:150,name:"\u6BCF\u5468\u6E38\u620F\u63A2\u7D22"},{id:"profile-once",kind:"quest",period:"all",condition:"profile",target:1,xp:50,name:"\u8BA4\u8BC6\u4F60\u81EA\u5DF1"},{id:"club-once",kind:"quest",period:"all",condition:"club",target:1,xp:100,name:"\u52A0\u5165\u670B\u53CB\u5708"},{id:"first-round",kind:"achievement",period:"all",condition:"games",target:1,itemIds:["title-newcomer"],name:"Getting Started",category:"Getting Started"},{id:"game-explorer",kind:"achievement",period:"all",condition:"types",target:3,itemIds:["title-explorer"],name:"Game Explorer",category:"Game Explorer"},{id:"veteran",kind:"achievement",period:"all",condition:"games",target:100,itemIds:["badge-veteran"],name:"Veteran",category:"Activity Milestones"},{id:"collector",kind:"achievement",period:"all",condition:"items",target:4,itemIds:["background-night"],name:"Collector",category:"Collector"},{id:"social",kind:"achievement",period:"all",condition:"club",target:1,itemIds:["souvenir-club"],name:"Friends Club",category:"Social"},{id:"quest-master",kind:"achievement",period:"all",condition:"quests",target:10,itemIds:["badge-veteran"],name:"Quest Completion",category:"Quest Completion"}];for(let o of i)o.enabled=!0,o.version=1,r.definitions[o.id]=o,r.versions[o.id+":1"]=structuredClone(o);return r}function hn(t,e,r){t.profiles[e]??={id:e,walletVisible:!0,bio:"",avatar:"",settings:{sound:!0,reducedMotion:!1},equipped:{},featuredBadges:[],archived:!1},t.progress[e]??={id:e,xp:0,games:0,level:1,gameTypes:{},achievements:{},quests:{},questsCompleted:0,profileCompleted:!1,clubsJoined:0,lastDaily:null,streak:0};let n=e+":frame-starter";t.inventory[n]??={id:n,playerId:e,itemId:"frame-starter",createdAt:r,source:"welcome"},r0(t.progress[e],r)}function r0(t,e){let r=rt(e);for(let n of["day","week","month"])t[n]?.key!==r[n]&&(t[n]={key:r[n],games:0,types:{},gameXP:0})}function yd(t,e,r,n,i,o={}){t.events.push({id:e,playerId:r,kind:n,createdAt:i,...o})}function n0(t,e,r,n,i){(!Number.isSafeInteger(r)||r<0||r>1e4)&&j("XP \u5956\u52B1\u8D85\u51FA\u5141\u8BB8\u8303\u56F4\u3002");let o=t.progress[e];Number.isSafeInteger(o.xp+r)||j("XP \u8D85\u51FA\u53EF\u8868\u793A\u8303\u56F4\u3002"),o.xp+=r;let a=t.definitions.settings.levelFactor;o.level=1+Math.floor(Math.sqrt(o.xp/a));let s=rt(n);for(let l of["week","month","all"]){let d=l==="all"?"all":s[l],p=e+":"+l+":"+d,m=t.stats[p]??={id:p,playerId:e,period:l+":"+d,xp:0,games:0};m.xp+=r}r&&yd(t,"xp:"+i,e,"xp.granted",n,{xp:r,cause:i})}function bo(t,e,r,n,i,o,a,s={}){let l=e+":"+r;t.claims[l]&&j("\u8BE5\u5956\u52B1\u5DF2\u7ECF\u9886\u53D6\u3002",409);for(let d of o||[])(!t.items[d]||!t.items[d].enabled)&&j("\u5956\u52B1\u7269\u54C1\u4E0D\u5B58\u5728\u6216\u5DF2\u505C\u7528\u3002");t.claims[l]={id:l,playerId:e,kind:n,xp:i,createdAt:a,...s},n0(t,e,i||0,a,l);for(let d of o||[]){let p=e+":"+d;t.inventory[p]??={id:p,playerId:e,itemId:d,createdAt:a,source:n}}return t.claims[l]}function If(t,e,r,n){let i=e.period==="all"?null:t[e.period],o=i||t;return e.condition==="games"?o.games:e.condition==="types"?Object.keys(i?i.types:t.gameTypes).length:e.condition==="profile"?Number(t.profileCompleted):e.condition==="club"?t.clubsJoined:e.condition==="quests"?t.questsCompleted:e.condition==="items"?Object.values(r.inventory).filter(a=>a.playerId===n).length:0}function vd(t,e,r,n){let i=t.progress[e],o=r.period==="all"?"all":r.period==="event"?String(r.startsAt):rt(n)[r.period],a=i.quests[r.id];(!a||a.key!==o)&&(a={key:o,definition:structuredClone(r),progress:0,eventStats:{games:0,types:{}}},i.quests[r.id]=a);let s=a.definition;if(s.period==="event"&&(n<s.startsAt||n>=s.endsAt))return null;let l=s.period==="event"?s.condition==="types"?Object.keys(a.eventStats?.types||{}).length:a.eventStats?.games||0:If(i,s,t,e);return a.progress=Math.min(s.target,l),a}function gn(t,e,r){let n=t.progress[e];for(let i of Object.values(t.definitions).filter(o=>o.kind==="achievement"&&o.enabled))!n.achievements[i.id]&&If(n,i,t,e)>=i.target&&(bo(t,e,"achievement:"+i.id,"achievement",i.xp||0,i.itemIds||[],r,{definitionVersion:i.version}),n.achievements[i.id]=r,yd(t,"achievement:"+e+":"+i.id,e,"achievement.unlocked",r,{definitionId:i.id}));for(let i of Object.values(t.definitions).filter(o=>o.kind==="quest"&&o.enabled))vd(t,e,i,r)}function wd(t,e,r,n,i){if(hn(t,e,i),t.claims[e+":round:"+n])return!1;for(let p of Object.values(t.definitions).filter(m=>m.kind==="quest"&&m.enabled&&m.period==="event")){let m=vd(t,e,p,i);m&&(m.eventStats??={games:0,types:{}},m.eventStats.games++,m.eventStats.types[r]=!0)}let o=t.progress[e],a=t.definitions.settings,s=Math.max(0,Math.min(a.gameXP,a.dailyGameCap-o.day.gameXP));bo(t,e,"round:"+n,"round",s,[],i),o.day.gameXP+=s,o.games++,o.gameTypes[r]=!0;for(let p of["day","week","month"])o[p].games++,o[p].types[r]=!0;let l=rt(i);for(let p of["week","month","all"]){let m=p==="all"?"all":l[p],g=e+":"+p+":"+m,C=t.stats[g]??={id:g,playerId:e,period:p+":"+m,xp:0,games:0};C.games++}yd(t,n,e,"game.settled",i,{game:r});let d=t.memberships[e];if(d){let p=d.clubId+":"+l.week+":"+n;t.contributions[p]={id:p,playerId:e,clubId:d.clubId,week:l.week,createdAt:i,roundId:n}}return gn(t,e,i),!0}function _f(t,e,r){hn(t,e,r);let n=t.progress[e],i=rt(r).day,o=rt(r-864e5).day;n.lastDaily===i&&j("\u4ECA\u5929\u5DF2\u7ECF\u9886\u53D6\u7B7E\u5230\u5956\u52B1\u3002",409);let a=n.lastDaily===o?n.streak%7+1:1;(a===1||!n.dailySchedule)&&(n.dailySchedule=structuredClone(t.definitions.settings.dailyXP));let s=bo(t,e,"daily:"+i,"daily",n.dailySchedule[a-1],a===7?["badge-week"]:[],r,{streak:a});return n.lastDaily=i,n.streak=a,gn(t,e,r),s}function xd(t,e,r){return hn(t,e,r),Object.values(t.definitions).filter(n=>n.kind==="quest"&&n.enabled).map(n=>{let i=vd(t,e,n,r);if(!i)return null;let o=i.definition,a=o.period==="day"?rt(r).nextDay:o.period==="week"?rt(r).nextWeek:o.period==="month"?rt(r).nextMonth:o.period==="event"?o.endsAt:null;return{...o,key:i.key,progress:i.progress,endsAt:a,claimed:!!t.claims[e+":quest:"+n.id+":"+i.key]}}).filter(Boolean)}function Rf(t,e,r,n){let i=xd(t,e,n).find(a=>a.id===r);(!i||i.progress<i.target||i.endsAt&&n>=i.endsAt)&&j("\u4EFB\u52A1\u5C1A\u672A\u5B8C\u6210\u6216\u5DF2\u7ECF\u8FC7\u671F\u3002");let o=bo(t,e,"quest:"+i.id+":"+i.key,"quest",i.xp||0,i.itemIds||[],n,{definitionVersion:i.version});return t.progress[e].questsCompleted++,gn(t,e,n),o}var yo=(t,e,r=0)=>((typeof t!="string"||t.trim().length<r||t.trim().length>e)&&j("\u4FF1\u4E50\u90E8\u6587\u5B57\u957F\u5EA6\u65E0\u6548\u3002"),t.trim());function vo(t,e){let r=t.clubs[t.memberships[e]?.clubId];return(!r||r.ownerId!==e||r.archived)&&j("\u53EA\u6709\u4FF1\u4E50\u90E8\u6240\u6709\u8005\u53EF\u4EE5\u64CD\u4F5C\u3002",403),r}function si(t,e,r,n,i,o={}){t.events.push({id:crypto.randomUUID(),playerId:r,clubId:e,kind:n,createdAt:i,...o})}function Bf(t,e,r,n,i,o){let a=r.playerId;if(!(!n.startsWith("club.")&&n!=="admin.club")){if(n==="club.create"){t.memberships[a]&&j("\u6BCF\u540D\u73A9\u5BB6\u540C\u65F6\u53EA\u80FD\u52A0\u5165\u4E00\u4E2A\u4FF1\u4E50\u90E8\u3002");let s=i[0]||{},l={id:crypto.randomUUID(),name:yo(s.name,32,1),description:yo(s.description||"",200),icon:yo(s.icon||"initial",20),ownerId:a,createdAt:o,archived:!1};return t.clubs[l.id]=l,t.memberships[a]={id:a,clubId:l.id,joinedAt:o},t.progress[a].clubsJoined++,gn(t,a,o),si(t,l.id,a,"club.created",o),l}if(n==="club.invite"){let s=vo(t,a),l=i[0];(!e.data.users.some(p=>p.id===l)||t.profiles[l]?.archived||t.memberships[l]||l===a)&&j("\u8BE5\u73A9\u5BB6\u4E0D\u80FD\u63A5\u53D7\u9080\u8BF7\u3002"),Object.values(t.invitations).some(p=>p.clubId===s.id&&p.targetId===l&&p.status==="pending"&&p.expiresAt>o)&&j("\u5DF2\u7ECF\u5B58\u5728\u6709\u6548\u9080\u8BF7\u3002");let d={id:crypto.randomUUID(),clubId:s.id,targetId:l,inviterId:a,createdAt:o,expiresAt:o+7*864e5,status:"pending"};return t.invitations[d.id]=d,si(t,s.id,a,"club.invited",o,{target:l}),d}if(n==="club.respond"){let s=t.invitations[i[0]];return(!s||s.targetId!==a||s.status!=="pending"||s.expiresAt<=o||t.clubs[s.clubId]?.archived)&&j("\u9080\u8BF7\u5DF2\u8FC7\u671F\u3001\u64A4\u9500\u6216\u4E0D\u5C5E\u4E8E\u4F60\u3002",403),typeof i[1]!="boolean"&&j("\u8BF7\u9009\u62E9\u63A5\u53D7\u6216\u62D2\u7EDD\u3002"),i[1]&&t.memberships[a]&&j("\u8BF7\u5148\u9000\u51FA\u5F53\u524D\u4FF1\u4E50\u90E8\u3002"),s.status=i[1]?"accepted":"declined",i[1]&&(t.memberships[a]={id:a,clubId:s.clubId,joinedAt:o},t.progress[a].clubsJoined++,gn(t,a,o)),si(t,s.clubId,a,"club."+s.status,o),s}if(n==="club.revoke"){let s=vo(t,a),l=t.invitations[i[0]];return(!l||l.clubId!==s.id||l.status!=="pending")&&j("\u9080\u8BF7\u65E0\u6548\u3002"),l.status="revoked",l}if(n==="club.leave"){let s=t.memberships[a],l=t.clubs[s?.clubId];return l||j("\u5C1A\u672A\u52A0\u5165\u4FF1\u4E50\u90E8\u3002"),l.ownerId===a&&j("\u8BF7\u5148\u8F6C\u79FB\u6240\u6709\u6743\uFF0C\u6216\u5F52\u6863\u7A7A\u4FF1\u4E50\u90E8\u3002"),delete t.memberships[a],si(t,l.id,a,"club.left",o),{left:!0}}if(n==="club.transfer"){let s=vo(t,a),l=i[0];return(!l||l===a||t.memberships[l]?.clubId!==s.id)&&j("\u8BF7\u9009\u62E9\u5F53\u524D\u4FF1\u4E50\u90E8\u7684\u5176\u4ED6\u6210\u5458\u3002"),s.ownerId=l,si(t,s.id,a,"club.transferred",o,{target:l}),s}if(n==="club.remove"){let s=vo(t,a),l=i[0];return(l===a||t.memberships[l]?.clubId!==s.id)&&j("\u8BF7\u9009\u62E9\u5176\u4ED6\u6210\u5458\u3002"),delete t.memberships[l],si(t,s.id,a,"club.removed",o,{target:l}),{removed:l}}if(n==="club.update"){let s=vo(t,a),l=i[0]||{};return s.name=yo(l.name,32,1),s.description=yo(l.description||"",200),s.icon=yo(l.icon||"initial",20),s}if(n==="club.archive"||n==="admin.club"){let s=n==="admin.club"?t.clubs[i[0]]:vo(t,a);s||j("\u4FF1\u4E50\u90E8\u4E0D\u5B58\u5728\u3002"),n==="admin.club"?(typeof i[1]!="string"||i[1].trim().length<3)&&j("\u8BF7\u586B\u5199\u5904\u7406\u539F\u56E0\u3002"):Object.values(t.memberships).some(l=>l.clubId===s.id&&l.id!==a)&&j("\u5F52\u6863\u524D\u8BF7\u5148\u79FB\u9664\u5176\u4ED6\u6210\u5458\u3002"),s.archived=!0;for(let[l,d]of Object.entries(t.memberships))d.clubId===s.id&&delete t.memberships[l];for(let l of Object.values(t.invitations))l.clubId===s.id&&l.status==="pending"&&(l.status="revoked");return si(t,s.id,a,"club.archived",o),s}if(n==="club.claim"){let s=t.memberships[a]?.clubId,l=rt(o).week,d=Object.values(t.contributions).filter(p=>p.clubId===s&&p.week===l);return(!s||d.length<50||!d.some(p=>p.playerId===a))&&j("\u672C\u5468\u56E2\u961F\u6311\u6218\u5C1A\u672A\u5B8C\u6210\uFF0C\u6216\u4F60\u6CA1\u6709\u53C2\u4E0E\u3002"),bo(t,a,"club:"+s+":"+l,"club",100,[],o)}j("\u4FF1\u4E50\u90E8\u64CD\u4F5C\u65E0\u6548\u3002",404)}}function Sa(t,e,r){let n=t.memberships[e]?.clubId,i=t.clubs[n],o=rt(r).week,a=Object.values(t.invitations).filter(d=>d.targetId===e&&d.status==="pending"&&d.expiresAt>r&&!t.clubs[d.clubId]?.archived).map(d=>({...d,clubName:t.clubs[d.clubId].name}));if(!i)return{club:null,incoming:a};let s=Object.values(t.memberships).filter(d=>d.clubId===n),l=Object.values(t.contributions).filter(d=>d.clubId===n&&d.week===o);return{club:i,members:s,incoming:a,outgoing:i.ownerId===e?Object.values(t.invitations).filter(d=>d.clubId===n&&d.status==="pending"&&d.expiresAt>r):[],challenge:{week:o,target:50,progress:l.length,participated:l.some(d=>d.playerId===e),claimed:!!t.claims[e+":club:"+n+":"+o]},leaderboard:s.map(d=>({playerId:d.id,rounds:l.filter(p=>p.playerId===d.id).length})).sort((d,p)=>p.rounds-d.rounds||d.playerId.localeCompare(p.playerId))}}ka();var wo=globalThis.CasinoMoney,i0=t=>Math.max(1,Math.min(1e6,Number(t.searchParams.get("page"))||1));async function Mf(t,e,r,n,i){let o=new URL(t.url),a=oi(r,t.headers.get("oai-authenticated-user-id"),null),s=a.playerId,l=wo.parseJSON(n.snapshot),d=i0(o),p=20,m=l.users.filter(g=>!r.profiles[g.id]?.archived&&Object.values(r.accounts).some(C=>C.playerId===g.id&&C.status==="active"));if(o.pathname==="/api/players"){let g=(o.searchParams.get("query")||"").slice(0,100).normalize("NFKC").toLocaleLowerCase(),C=m.filter(I=>I.name.normalize("NFKC").toLocaleLowerCase().includes(g));return{rows:C.slice((d-1)*p,d*p).map(I=>go(I,r)),page:d,total:C.length,pages:Math.max(1,Math.ceil(C.length/p))}}if(o.pathname.startsWith("/api/players/")){let g=m.find(C=>C.id===decodeURIComponent(o.pathname.slice(13)));return g||j("\u73A9\u5BB6\u4E0D\u5B58\u5728\u3002",404),go(g,r)}if(o.pathname==="/api/transactions")return{rows:await Lr(e,"v2_journal","WHERE player_id=?",[s],p,(d-1)*p),page:d};if(o.pathname==="/api/clubs"){let g=Sa(r,s,Date.now());return g.club&&(g.feed=await Lr(e,"v2_events","WHERE json_extract(body,'$.clubId')=?",[g.club.id],30)),g}if(o.pathname.startsWith("/api/clubs/")){let g=decodeURIComponent(o.pathname.slice(11));r.memberships[s]?.clubId!==g&&j("\u4E0D\u662F\u8BE5\u4FF1\u4E50\u90E8\u6210\u5458\u3002",403);let C=Sa(r,s,Date.now());return C.feed=await Lr(e,"v2_events","WHERE json_extract(body,'$.clubId')=?",[g],30),C}if(o.pathname==="/api/leaderboards"){let g=o.searchParams.get("metric")||"xp",C=o.searchParams.get("period")||"all";(!["wallet","xp","games","achievements","activity"].includes(g)||!["all","week","month"].includes(C))&&j("\u6392\u884C\u699C\u7C7B\u578B\u65E0\u6548\u3002");let I,b,A,v=[],y="JOIN v2_accounts a ON a.player_id=w.id AND a.status='active' JOIN v2_profiles profile ON profile.id=w.id WHERE json_extract(profile.body,'$.archived')=0";if(g==="wallet")I=`SELECT w.id,w.sign,w.magnitude,w.digits,json_extract(w.body,'$.name') AS name,w.body FROM v2_wallet_index w ${y} AND w.visible=1`,b="sign DESC,CASE WHEN sign>=0 THEN magnitude END DESC,CASE WHEN sign>=0 THEN digits END DESC,CASE WHEN sign<0 THEN magnitude END ASC,CASE WHEN sign<0 THEN digits END ASC",A="NULL";else{let N=g==="activity"?"games":g;if(C!=="all"&&g!=="achievements"){let h=C+":"+rt(Date.now())[C];I=`SELECT w.id,json_extract(w.body,'$.name') AS name,COALESCE(s.${N},0) AS score FROM v2_wallet_index w JOIN v2_accounts a ON a.player_id=w.id AND a.status='active' JOIN v2_profiles profile ON profile.id=w.id LEFT JOIN v2_period_stats s ON s.player_id=w.id AND s.period=? WHERE json_extract(profile.body,'$.archived')=0`,v=[h]}else A=g==="achievements"?"(SELECT COUNT(*) FROM json_each(json_extract(prog.body,'$.achievements')))":"prog."+N,I=`SELECT w.id,json_extract(w.body,'$.name') AS name,${A} AS score FROM v2_wallet_index w JOIN v2_progress prog ON prog.id=w.id ${y}`;b="score DESC"}let k=(o.searchParams.get("query")||"").slice(0,100),R="%"+k.replaceAll("\\","\\\\").replaceAll("%","\\%").replaceAll("_","\\_")+"%",O=`WITH candidates AS (${I}),ranked AS (SELECT *,RANK() OVER (ORDER BY ${b}) AS place FROM candidates)`,V=(await e.prepare(O+" SELECT * FROM ranked WHERE name LIKE ? ESCAPE '\\' ORDER BY place,id LIMIT ? OFFSET ?").bind(...v,R,p,(d-1)*p).all()).results,W=await e.prepare(O+" SELECT COUNT(*) AS count FROM ranked WHERE name LIKE ? ESCAPE '\\'").bind(...v,R).first();return{rows:V.map(N=>({...go(l.users.find(h=>h.id===N.id),r),rank:N.place,score:g==="wallet"?wo.parse((N.sign<0?"-":"")+N.digits):N.score})),page:d,total:W.count,pages:Math.max(1,Math.ceil(W.count/p)),metric:g,period:g==="wallet"||g==="achievements"?"all":C}}if(o.pathname==="/api/admin/analytics"){oi(r,a.actor,null,!0,i);let g=Date.now()-30*864e5,C=(await e.prepare("SELECT kind,COUNT(*) AS count FROM v2_events WHERE created_at>=? GROUP BY kind").bind(g).all()).results,I=await e.prepare("SELECT COUNT(DISTINCT player_id) AS count FROM v2_events WHERE created_at>=? AND player_id IS NOT NULL").bind(Date.now()-864e5).first(),b=(await e.prepare("SELECT kind,COUNT(*) AS count FROM v2_claims WHERE kind!='round' AND created_at>=? GROUP BY kind").bind(g).all()).results,A=(await e.prepare("SELECT body FROM v2_journal WHERE kind NOT IN ('opening','gift','respondLoan','repayLoan') AND created_at>=?").bind(g).all()).results.map(k=>wo.parseJSON(k.body)).filter(k=>k.asset==="cash"),v=0,y=0;for(let k of A){let R=wo.parse(k.delta);R>0?v=wo.add(v,R):y=wo.sub(y,R)}return{window:"30 days",activePlayers24h:I.count,events:C,claims:b,cashIncreases:v,cashDecreases:y,accounting:"\u51C0\u7B79\u7801\u589E\u51CF\u53E3\u5F84\uFF1B\u6392\u9664\u671F\u521D\u548C\u73A9\u5BB6\u4E92\u8F6C\u3002"}}}(function(t){"use strict";!t.CasinoMoney&&typeof fn=="function"&&ai();let e=t.CasinoMoney,r="roulette-club-v1",n=1e5,i=15e5,o=10*6e4,a=3*6e4,s=15*6e4,l=2,d=1e9,p=["7","\u{1F48E}","BAR","\u{1F514}","\u{1F340}","\u{1F352}"],m=[50,25,20,15,10,5],g=[0,5,3,1,4,2,0,5,4,3,5,1],C=()=>({RED:0,BLACK:0,GREEN:0,ODD:0,EVEN:0,numbers:{}}),I=N=>e.add(...["RED","BLACK","GREEN","ODD","EVEN"].map(h=>N[h]),...Object.values(N.numbers)),b=(N,h=null)=>e.valid(N)&&N>=0&&(h===null||typeof N=="number"&&N<=h),A=Object.freeze({seven:Object.freeze({name:"\u4FDD\u5E95 777",factor:35,multiplier:50,reels:[0,6,0],symbol:"7 7 7"}),diamonds:Object.freeze({name:"\u4FDD\u5E95\u4E09\u94BB\u77F3",factor:18,multiplier:25,reels:[3,11,3],symbol:"\u{1F48E} \u{1F48E} \u{1F48E}"}),bars:Object.freeze({name:"\u4FDD\u5E95\u4E09 BAR",factor:14,multiplier:20,reels:[5,5,5],symbol:"BAR BAR BAR"})}),v=()=>({sharkDebt:0,bankInterestAt:null,sharkInterestAt:null,marketAvailableAt:0,cards:[],armedCardId:null}),y=N=>N===null||Number.isSafeInteger(N)&&N>=0;function k(N,h,E,w=d){if(h===0)return N;for(let M=0;M<E&&(w===null||N<w);M++)N=e.add(N,e.ratio(N,h,1e4,!0)),w!==null&&(N=e.min(w,N));return N}function R(N){return b(N.sharkDebt)&&y(N.bankInterestAt)&&y(N.sharkInterestAt)&&y(N.marketAvailableAt)&&(N.recovery==null||typeof N.recovery=="object"&&b(N.recovery.deficit))&&Array.isArray(N.cards)&&N.cards.length<=50&&N.cards.every(h=>h&&typeof h.id=="string"&&Object.hasOwn(A,h.type)&&b(h.stake)&&h.stake>0)&&new Set(N.cards.map(h=>h.id)).size===N.cards.length&&(N.armedCardId===null||N.cards.some(h=>h.id===N.armedCardId))}function O(N){return N&&["RED","BLACK","GREEN","ODD","EVEN"].every(h=>b(N[h]))&&N.numbers&&typeof N.numbers=="object"&&!Array.isArray(N.numbers)&&Object.entries(N.numbers).every(([h,E])=>/^(?:[0-9]|1[0-9]|2[0-3])$/.test(h)&&b(E))&&b(I(N))}function V(N,h){return{id:N,name:h,balance:1e3,debt:0,bets:C(),lastBets:null,history:[],pendingRoulette:!1,...v()}}class W{constructor(h,E,w=()=>Date.now(),{recoverRoulette:M=!0}={}){this.storage=h,this.now=w,this.random=E||(()=>{let B=new Uint32Array(1);return t.crypto.getRandomValues(B),B[0]/4294967296}),this.lock=null,this.storageWarning="",this.data={version:1,activeId:"alex",users:[V("alex","Alex"),V("jamie","Jamie"),V("taylor","Taylor")],ledger:[],loans:[]};try{let B=h&&h.getItem(r);if(B){let L=e.parseJSON(B);if(Array.isArray(L.users)&&(L.users=L.users.map(P=>({...v(),...P}))),L.loans??=[],L.version!==1||!Array.isArray(L.users)||L.users.length<1||!Array.isArray(L.ledger)||!Array.isArray(L.loans)||L.loans.length>200||!L.loans.every(P=>this.validLoan(P,L.users))||new Set(L.loans.map(P=>P.id)).size!==L.loans.length||!L.users.some(P=>P.id===L.activeId)||new Set(L.users.map(P=>P.id)).size!==L.users.length||!L.users.every(P=>typeof P.id=="string"&&typeof P.name=="string"&&P.name.trim().length>0&&P.name.length<=24&&e.valid(P.balance)&&b(P.debt)&&R(P)&&O(P.bets)&&(P.lastBets===null||O(P.lastBets))&&Array.isArray(P.history)))throw new Error("Invalid saved profiles");this.data=L,this.data.ledger=L.ledger.filter(P=>P&&typeof P.text=="string"&&typeof P.time=="string").slice(0,100);for(let P of L.users)delete P.bankRounds,delete P.sharkRounds,P.history=P.history.filter(ge=>ge&&b(ge.num,23)&&["GREEN","RED","BLACK"].includes(ge.colorTag)).slice(0,10),P.pendingRoulette&&M&&(P.balance=e.add(P.balance,I(P.bets)),P.bets=C(),P.pendingRoulette=!1,this.record(`${P.name}: interrupted roulette stake refunded.`))}}catch{this.storageWarning="Saved profiles could not be read. This session starts with fresh local profiles."}this.accrueInterest();for(let B of this.data.users)this.prepareRecovery(B);this.save()}get money(){return e}get active(){return this.data.users.find(h=>h.id===this.data.activeId)}get availableCredit(){return e.max(0,e.sub(n,this.active.debt))}get availableSharkCredit(){return e.max(0,e.sub(i,this.active.sharkDebt))}get canBorrowShark(){return!this.lock&&!this.active.recovery&&this.availableCredit===0&&this.active.balance<=0&&I(this.active.bets)===0&&this.availableSharkCredit>0}get armedCard(){return this.active.cards.find(h=>h.id===this.active.armedCardId)||null}prepareRecovery(h=this.active){return!h||h.recovery||h.balance>0||!(h.sharkDebt>0)||I(h.bets)||h.pendingRoulette||h.blackjack&&h.blackjack.phase!=="settled"?!1:(h.recovery={deficit:e.max(0,e.sub(0,h.balance))},h.balance=10,this.record(`${h.name} \xB7 \u9AD8\u5229\u8D37\u7B79\u7801\u5DF2\u7528\u5C3D\uFF0C\u8FDB\u5165\u8D1F\u6570\u6A21\u5F0F\uFF1A-${h.recovery.deficit.toLocaleString()}\uFF0C\u6BCF\u5C40\u53EF\u7528 10\u3002`),!0)}ensureCashWallet(h=this.active){if(h.recovery)throw new Error("\u8D1F\u6570\u6A21\u5F0F\u7684 10 \u7B79\u7801\u4EC5\u7528\u4E8E\u6E38\u620F\uFF0C\u4E0D\u80FD\u8D60\u9001\u3001\u51FA\u501F\u3001\u8D2D\u4E70\u6216\u8FD8\u6B3E\u3002\u76C8\u5229\u5148\u62B5\u6263\u8D1F\u6570\u3002")}recoveryNet(h,E){let w=e.sub(h.recovery.deficit,E);E>0&&w<=0?(h.recovery=null,h.balance=e.sub(10,w)):(h.recovery.deficit=e.max(0,w),h.balance=10)}credit(h,E){h.recovery?this.recoveryNet(h,E):h.balance=e.add(h.balance,E)}ensureIdle(){if(this.lock)throw new Error("Wait for the current spin to finish.");this.accrueInterest()&&this.save()}amount(h,E=null){let w=e.positive(h);if(E!==null&&w>E)throw new Error("Enter a whole number from 1 to "+E.toLocaleString()+".");return w}save(){this.accrueInterest();try{this.storage&&this.storage.setItem(r,e.stringify(this.data))}catch{this.storageWarning="Browser storage is unavailable. Keep this page open to retain this session."}}record(h){this.data.ledger.unshift({text:h,time:new Date().toISOString()}),this.data.ledger=this.data.ledger.slice(0,100)}switchUser(h){if(this.ensureIdle(),!this.data.users.some(E=>E.id===h))throw new Error("Choose an existing player.");this.data.activeId=h,this.save()}addUser(h){if(this.ensureIdle(),h=String(h).trim(),!h||h.length>24)throw new Error("Use a player name with 1\u201324 characters.");if(this.data.users.some(w=>w.name.toLowerCase()===h.toLowerCase()))throw new Error("That player name is already taken.");let E=V(t.crypto.randomUUID(),h);return this.data.users.push(E),this.data.activeId=E.id,this.record(`${h} joined with 1,000 starter chips.`),this.save(),E}validLoan(h,E){return h&&typeof h.id=="string"&&typeof h.lenderId=="string"&&typeof h.borrowerId=="string"&&h.lenderId!==h.borrowerId&&typeof h.lenderName=="string"&&typeof h.borrowerName=="string"&&b(h.principal)&&h.principal>0&&b(h.balance)&&b(h.rateBps,1e4)&&b(h.periodMs,1440*6e4)&&h.periodMs>=6e4&&h.periodMs%6e4===0&&y(h.createdAt)&&y(h.interestAt)&&["pending","active","declined","cancelled","repaid"].includes(h.status)&&(!["pending","active"].includes(h.status)||[h.lenderId,h.borrowerId].every(w=>E.some(M=>M.id===w)))&&(h.status!=="active"||h.interestAt!==null&&h.balance>0)}offerLoan(h,E,w,M=10){this.ensureIdle(),this.ensureCashWallet();let B=this.active,L=this.data.users.find(z=>z.id===h),P=this.amount(E);if(!L||L===B)throw new Error("\u8BF7\u9009\u62E9\u53E6\u4E00\u4F4D\u501F\u6B3E\u73A9\u5BB6\u3002");let ge=Math.round(w*100);if(!Number.isFinite(w)||!b(ge,1e4)||Math.abs(w*100-ge)>1e-6)throw new Error("\u5229\u7387\u9700\u4E3A 0\u2013100%\uFF0C\u6700\u591A\u4E24\u4F4D\u5C0F\u6570\u3002");if(!b(M,1440)||M<1)throw new Error("\u8BA1\u606F\u5468\u671F\u9700\u4E3A 1\u20131,440 \u5206\u949F\u3002");if(P>B.balance)throw new Error("\u51FA\u501F\u4EBA\u7684\u4F59\u989D\u4E0D\u8DB3\u3002");if(this.data.loans=this.data.loans.filter(z=>["pending","active"].includes(z.status)||this.data.loans.indexOf(z)<100),this.data.loans.length>=200)throw new Error("\u501F\u6B3E\u534F\u8BAE\u6570\u91CF\u5DF2\u8FBE\u4E0A\u9650\uFF0C\u8BF7\u5148\u5904\u7406\u5F85\u786E\u8BA4\u534F\u8BAE\u3002");let ve={id:t.crypto.randomUUID(),lenderId:B.id,borrowerId:h,lenderName:B.name,borrowerName:L.name,principal:P,balance:P,rateBps:ge,periodMs:M*6e4,status:"pending",createdAt:this.now(),interestAt:null};return this.data.loans.unshift(ve),this.record(`${B.name} \u2192 ${L.name}: \u53D1\u8D77\u501F\u6B3E\u534F\u8BAE ${P.toLocaleString()}\uFF0C\u6BCF ${M} \u5206\u949F ${w}%\uFF0C\u7B49\u5F85\u501F\u6B3E\u4EBA\u786E\u8BA4\u3002`),this.save(),ve}respondLoan(h,E){this.ensureIdle();let w=this.data.loans.find(L=>L.id===h);if(!w||w.status!=="pending"||w.borrowerId!==this.active.id)throw new Error("\u53EA\u6709\u501F\u6B3E\u4EBA\u80FD\u786E\u8BA4\u8FD9\u4EFD\u5F85\u5904\u7406\u534F\u8BAE\u3002");if(!E){w.status="declined",this.record(`${w.borrowerName} \u62D2\u7EDD\u4E86 ${w.lenderName} \u7684\u501F\u6B3E\u534F\u8BAE\u3002`),this.save();return}let M=this.data.users.find(L=>L.id===w.lenderId),B=this.active;if(this.ensureCashWallet(B),M&&this.ensureCashWallet(M),!M||M.balance<w.principal)throw new Error("\u51FA\u501F\u4EBA\u5F53\u524D\u4F59\u989D\u4E0D\u8DB3\uFF0C\u5C1A\u672A\u6263\u6B3E\u3002");M.balance=e.sub(M.balance,w.principal),B.balance=e.add(B.balance,w.principal),w.status="active",w.interestAt=this.now(),this.record(`${w.borrowerName} \u5DF2\u63A5\u53D7\u534F\u8BAE\uFF0C${w.lenderName} \u8F6C\u5165 ${w.principal.toLocaleString()}\u3002`),this.save()}cancelLoan(h){this.ensureIdle();let E=this.data.loans.find(w=>w.id===h);if(!E||E.status!=="pending"||E.lenderId!==this.active.id)throw new Error("\u53EA\u80FD\u64A4\u9500\u81EA\u5DF1\u53D1\u8D77\u7684\u5F85\u786E\u8BA4\u534F\u8BAE\u3002");E.status="cancelled",this.record(`${E.lenderName} \u64A4\u9500\u4E86\u7ED9 ${E.borrowerName} \u7684\u501F\u6B3E\u534F\u8BAE\u3002`),this.save()}repayLoan(h,E){this.ensureIdle(),this.ensureCashWallet();let w=this.data.loans.find(P=>P.id===h);if(!w||w.status!=="active"||w.borrowerId!==this.active.id)throw new Error("\u53EA\u80FD\u507F\u8FD8\u81EA\u5DF1\u7684\u6709\u6548\u501F\u6B3E\u3002");let M=this.amount(E==="all"?w.balance:E),B=this.data.users.find(P=>P.id===w.lenderId),L=this.active;if(M>w.balance||M>L.balance)throw new Error("\u8FD8\u6B3E\u8D85\u8FC7\u6B20\u6B3E\u6216\u94B1\u5305\u4F59\u989D\u3002");if(!B)throw new Error("\u51FA\u501F\u4EBA\u4E0D\u5B58\u5728\u3002");L.balance=e.sub(L.balance,M),this.credit(B,M),w.balance=e.sub(w.balance,M),w.balance===0&&(w.status="repaid",w.interestAt=null),this.record(`${L.name} \u2192 ${B.name}: \u507F\u8FD8\u73A9\u5BB6\u501F\u6B3E ${M.toLocaleString()}\u3002`),this.save()}deletePlayer(h){this.ensureIdle();let E=this.data.users.find(w=>w.id===h);if(!E)throw new Error("\u8BE5\u73A9\u5BB6\u4E0D\u5B58\u5728\u3002");if(this.data.users.length===1)throw new Error("\u81F3\u5C11\u4FDD\u7559\u4E00\u540D\u73A9\u5BB6\u3002");if(E.debt||E.sharkDebt||E.recovery?.deficit||I(E.bets)||E.pendingRoulette||E.blackjack&&E.blackjack.phase!=="settled"||this.data.loans.some(w=>["pending","active"].includes(w.status)&&[w.lenderId,w.borrowerId].includes(h)))throw new Error("\u8BF7\u5148\u7ED3\u6E05\u6B20\u6B3E\u3001\u501F\u51FA\u6B3E\u3001\u5F85\u786E\u8BA4\u534F\u8BAE\u548C\u6E38\u620F\u4E0B\u6CE8\uFF0C\u518D\u5220\u9664\u73A9\u5BB6\u3002");this.data.users=this.data.users.filter(w=>w.id!==h),this.data.activeId===h&&(this.data.activeId=this.data.users[0].id),this.record(`\u5DF2\u5220\u9664\u73A9\u5BB6 ${E.name}\uFF0C\u5176\u94B1\u5305\u548C\u5361\u5305\u5DF2\u79FB\u9664\u3002`),this.save()}adminAdjust(h,E,w,M=""){this.ensureIdle();let B=this.data.users.find(ge=>ge.id===h),L=this.amount(w);if(!B||!["add","remove"].includes(E))throw new Error("\u8BF7\u9009\u62E9\u73A9\u5BB6\u53CA\u6709\u6548\u7684\u8C03\u6574\u65B9\u5F0F\u3002");if(typeof M!="string"||M.length>120)throw new Error("\u5907\u6CE8\u6700\u591A 120 \u4E2A\u5B57\u7B26\u3002");let P=E==="add"?L:e.sub(0,L);if(B.recovery)this.recoveryNet(B,P);else{if(e.add(B.balance,P)<0)throw new Error("\u6263\u9664\u91D1\u989D\u4E0D\u80FD\u8D85\u8FC7\u94B1\u5305\u4F59\u989D\u3002");B.balance=e.add(B.balance,P)}this.record(`\u7BA1\u7406\u5458 \xB7 ${B.name} ${E==="add"?"\u589E\u52A0":"\u6263\u9664"} ${L.toLocaleString()} \u7B79\u7801${M.trim()?" \xB7 "+M.trim():""}\u3002`),this.save()}transfer(h,E){this.ensureIdle(),this.ensureCashWallet();let w=this.amount(E),M=this.active,B=this.data.users.find(L=>L.id===h);if(!B||B===M)throw new Error("Choose another player to receive the chips.");if(w>M.balance)throw new Error("Your wallet does not have enough chips.");M.balance=e.sub(M.balance,w),this.credit(B,w),this.record(`${M.name} \u2192 ${B.name}: ${w.toLocaleString()} chips transferred.`),this.save()}borrow(h){this.ensureIdle(),this.ensureCashWallet();let E=this.amount(h),w=this.active;if(E>this.availableCredit)throw new Error(`You can borrow up to ${this.availableCredit.toLocaleString()} more chips.`);w.balance=e.add(w.balance,E),w.debt===0&&(w.bankInterestAt=this.now(),w.bankInterestPolicy=l),w.debt=e.add(w.debt,E),this.record(`Bank \u2192 ${w.name}: borrowed ${E.toLocaleString()} chips.`),this.save()}repay(h){this.ensureIdle(),this.ensureCashWallet();let E=this.active,w=this.amount(h==="all"?E.debt:h);if(w>E.debt)throw new Error("That amount is greater than your outstanding debt.");if(w>E.balance)throw new Error("Your wallet does not have enough chips to repay that amount.");E.balance=e.sub(E.balance,w),E.debt=e.sub(E.debt,w),E.debt===0&&(E.bankInterestAt=null),this.record(`${E.name} \u2192 Bank: repaid ${w.toLocaleString()} chips.`),this.save()}borrowShark(h){this.ensureIdle();let E=this.amount(h,i),w=this.active;if(!this.canBorrowShark)throw new Error("\u9AD8\u5229\u8D37\u4EC5\u5728\u94F6\u884C\u989D\u5EA6\u8017\u5C3D\u3001\u94B1\u5305 \u2264 0 \u4E14\u6CA1\u6709\u672A\u7ED3\u7B97\u4E0B\u6CE8\u65F6\u5F00\u653E\u3002");if(E>this.availableSharkCredit)throw new Error("\u9AD8\u5229\u8D37\u5269\u4F59\u989D\u5EA6\u4E0D\u8DB3\u3002");w.sharkDebt===0&&(w.sharkInterestAt=this.now(),w.sharkInterestPolicy=l),w.balance=e.add(w.balance,E),w.sharkDebt=e.add(w.sharkDebt,E),this.record(`\u9AD8\u5229\u8D37 \u2192 ${w.name}: \u501F\u5165 ${E.toLocaleString()}\uFF1B\u6BCF 3 \u5206\u949F\u8BA1\u606F 125%\u3002`),this.save()}repayShark(h){this.ensureIdle(),this.ensureCashWallet();let E=this.active,w=this.amount(h==="all"?E.sharkDebt:h);if(w>E.sharkDebt)throw new Error("\u8FD8\u6B3E\u4E0D\u80FD\u8D85\u8FC7\u9AD8\u5229\u8D37\u6B20\u6B3E\u3002");if(w>E.balance)throw new Error("\u94B1\u5305\u4F59\u989D\u4E0D\u8DB3\u4EE5\u8FD8\u6B3E\u3002");E.balance=e.sub(E.balance,w),E.sharkDebt=e.sub(E.sharkDebt,w),E.sharkDebt===0&&(E.sharkInterestAt=null),this.record(`${E.name} \u2192 \u9AD8\u5229\u8D37: \u507F\u8FD8 ${w.toLocaleString()}\u3002`),this.save()}repayAll(h,E){if(h==="bank")return this.repay("all");if(h==="shark")return this.repayShark("all");if(h==="peer")return this.repayLoan(E,"all");throw new Error("\u8BF7\u9009\u62E9\u94F6\u884C\u3001\u9AD8\u5229\u8D37\u6216\u4E00\u7B14\u73A9\u5BB6\u501F\u6B3E\u3002")}projectDebts(h,E=this.active.id){if(!b(h,1440))throw new Error("\u9884\u89C8\u65F6\u95F4\u9700\u4E3A 0\u20131,440 \u5206\u949F\u3002");let w=this.data.users.find(de=>de.id===E);if(!w)throw new Error("\u8BF7\u9009\u62E9\u6709\u6548\u73A9\u5BB6\u3002");let M=this.now(),B=M+h*6e4,L=(de,Se,we,te,tt=d)=>k(de,te,Math.max(0,Math.floor((B-(Se??M))/we)),tt),P=L(w.debt,w.bankInterestAt,o,1500),ge=L(w.sharkDebt,w.sharkInterestAt,a,12500),ve=this.data.loans.filter(de=>de.status==="active"&&de.borrowerId===E).reduce((de,Se)=>e.add(de,L(Se.balance,Se.interestAt,Se.periodMs,Se.rateBps,null)),0),z=w.recovery?.deficit||0;return{bank:P,shark:ge,peer:ve,negative:z,total:e.add(P,ge,ve,z)}}completeRound(h=0){this.accrueInterest();let E=this.active;E.recovery?(this.recoveryNet(E,h),this.record(`${E.name} \xB7 \u8D1F\u6570\u6A21\u5F0F\u51C0\u8F93\u8D62 ${h>=0?"+":""}${h.toLocaleString()}\uFF1B${E.recovery?"\u8BB0\u5F55 -"+E.recovery.deficit.toLocaleString()+"\uFF0C\u4E0B\u4E00\u5C40\u53EF\u7528 10":"\u5DF2\u8FD8\u6E05\u8D1F\u6570\uFF0C\u6062\u590D\u6B63\u5E38\u4F59\u989D "+E.balance.toLocaleString()}\u3002`)):this.prepareRecovery(E)}accrueInterest(){let h=this.now(),E=!1,w=(B,L,P,ge,ve,z,de=d)=>{if(B[L]<=0){B[P]!==null&&(B[P]=null,E=!0);return}if(B[P]===null){B[P]=h,E=!0;return}let Se=Math.floor((h-B[P])/ge);if(Se<=0)return;let we=B[L];B[L]=k(we,ve,Se,de),B[P]+=Se*ge,E=!0,B[L]!==we&&this.record(`${z} \xB7 ${Se} \u671F\u5229\u606F +${e.sub(B[L],we).toLocaleString()}\uFF0C\u6B20\u6B3E ${B[L].toLocaleString()}\u3002`)},M=(B,L,P,ge,ve,z,de,Se,we)=>{B[L]>0&&B[ge]!==l&&(w(B,L,P,de,Se,we),B[ge]=l,B[P]=Math.max(h,B[P]??h),E=!0),w(B,L,P,ve,z,we)};for(let B of this.data.users)M(B,"debt","bankInterestAt","bankInterestPolicy",o,1500,30*6e4,50,B.name+" \xB7 \u94F6\u884C"),M(B,"sharkDebt","sharkInterestAt","sharkInterestPolicy",a,12500,5*6e4,1e3,B.name+" \xB7 \u9AD8\u5229\u8D37");for(let B of this.data.loans)B.status==="active"&&w(B,"balance","interestAt",B.periodMs,B.rateBps,B.borrowerName+" \u2192 "+B.lenderName,null);return E}buyCard(h,E){this.ensureIdle(),this.ensureCashWallet();let w=Object.hasOwn(A,h)?A[h]:null;if(!w)throw new Error("\u8BF7\u9009\u62E9\u6709\u6548\u7684\u9ED1\u5E02\u5361\u3002");let M=this.amount(E),B=e.mul(M,w.factor),L=this.active;if(this.now()<L.marketAvailableAt)throw new Error("\u9ED1\u5E02\u8FDB\u8D27\u4E2D\uFF0C\u8BF7\u7B49\u5F85\u8D2D\u4E70\u51B7\u5374\u7ED3\u675F\u3002");if(L.cards.length>=50)throw new Error("\u6700\u591A\u6301\u6709 50 \u5F20\u5361\uFF0C\u8BF7\u5148\u4F7F\u7528\u5DF2\u6709\u5361\u3002");if(e.add(B,M)>L.balance)throw new Error("\u4F59\u989D\u4E0D\u8DB3\uFF1A\u9700\u652F\u4ED8\u5361\u4EF7\uFF0C\u5E76\u7559\u8DB3\u4E00\u6B21\u7ED1\u5B9A\u4E0B\u6CE8\u7684\u7B79\u7801\u3002");let P={id:t.crypto.randomUUID(),type:h,stake:M};return L.balance=e.sub(L.balance,B),L.cards.push(P),L.marketAvailableAt=this.now()+s,this.record(`${L.name} \xB7 \u9ED1\u5E02\u8D2D\u4E70${w.name}\uFF0C\u4EF7\u683C ${B.toLocaleString()}\uFF0C\u7ED1\u5B9A\u4E0B\u6CE8 ${M.toLocaleString()}\u3002`),this.save(),P}armCard(h){this.ensureIdle();let E=this.active.cards.find(w=>w.id===h);if(h!==null&&!E)throw new Error("\u4F60\u6CA1\u6709\u8FD9\u5F20\u5361\u3002");if(E&&E.stake>this.active.balance)throw new Error("\u4F59\u989D\u4E0D\u8DB3\u4EE5\u652F\u4ED8\u8BE5\u5361\u7ED1\u5B9A\u7684\u4E0B\u6CE8\u3002");this.active.armedCardId=h,this.save()}buyLottery(h,{jackpot:E=!1}={}){this.ensureIdle();let w=t.CasinoLottery.price(h),M=this.active;if(w>M.balance)throw new Error("\u94B1\u5305\u4F59\u989D\u4E0D\u8DB3\u4EE5\u8D2D\u4E70\u8FD9\u6863\u5F69\u7968\u3002");let B=t.CasinoLottery.draw(w,this.random,E);return B.id=t.crypto.randomUUID(),B.time=new Date(this.now()).toISOString(),B.walletAfterWager=e.sub(M.balance,w),M.balance=e.add(M.balance,B.net),M.lotteryHistory=[B,...Array.isArray(M.lotteryHistory)?M.lotteryHistory.filter(t.CasinoLottery.validHistory):[]].slice(0,30),this.record(`${M.name} \xB7 \u5F69\u7968 \xB7 ${t.CasinoLottery.tiers[B.tier].name}: \u7968\u4EF7 ${w.toLocaleString()}\uFF0C\u8FD4\u8FD8 ${B.payout.toLocaleString()}\uFF08${B.multiplier}\xD7\uFF09\uFF0C\u51C0\u8F93\u8D62 ${B.net>=0?"+":""}${B.net.toLocaleString()}\u3002`),this.completeRound(B.net),this.lock="lottery",this.save(),B}playPlinko(h,E="medium",w="center",{jackpot:M=!1}={}){this.ensureIdle();let B=this.amount(h),L=this.active;if(t.CasinoArcade.plinkoSettings(E,w),B>L.balance)throw new Error("\u94B1\u5305\u4F59\u989D\u4E0D\u8DB3\uFF0C\u8BF7\u964D\u4F4E\u4E0B\u6CE8\u6216\u524D\u5F80\u94F6\u884C\u3002");return this.finishArcade(t.CasinoArcade.plinko(B,E,w,this.random,M),"Plinko")}playDice(h,E="small",w=null,{jackpot:M=!1}={}){this.ensureIdle();let B=this.amount(h),L=this.active;if(t.CasinoArcade.diceSettings(E,w),B>L.balance)throw new Error("\u94B1\u5305\u4F59\u989D\u4E0D\u8DB3\uFF0C\u8BF7\u964D\u4F4E\u4E0B\u6CE8\u6216\u524D\u5F80\u94F6\u884C\u3002");return this.finishArcade(t.CasinoArcade.dice(B,E,w,this.random,M),"\u9AB0\u5B9D")}finishArcade(h,E){let w=this.active;return h.id=t.crypto.randomUUID(),h.time=new Date(this.now()).toISOString(),h.walletAfterWager=e.sub(w.balance,h.wager),w.balance=e.add(w.balance,h.net),w.arcadeHistory=[h,...Array.isArray(w.arcadeHistory)?w.arcadeHistory.filter(t.CasinoArcade.validHistory):[]].slice(0,30),this.record(`${w.name} \xB7 ${E}${h.game==="dice"?" "+h.dice.join(" \xB7 "):" "+h.risk+" / "+h.lane}: \u4E0B\u6CE8 ${h.wager.toLocaleString()}\uFF0C\u8FD4\u8FD8 ${h.payout.toLocaleString()}\uFF0C\u51C0\u8F93\u8D62 ${h.net>=0?"+":""}${h.net.toLocaleString()}\u3002`),this.completeRound(h.net),this.lock=h.game,this.save(),h}slotResult(h,E){if(!Array.isArray(h)||h.length!==3||!h.every(P=>b(P,11)))throw new Error("Invalid reels.");let w=h.map(P=>g[P]),M=w.filter(P=>P===5).length,B=w.filter(P=>P===0).length,L=w.every(P=>P===w[0])?m[w[0]]:B===2?5:M===2?2:M===1?1:0;return{reels:[...h],symbols:w,multiplier:L,wager:E,payout:e.mul(E,L),net:e.mul(E,L-1)}}spinSlots(h,E=null,{allIn:w=!1,jackpot:M=!1}={}){this.ensureIdle();let B=this.amount(h),L=this.active,P=M?null:this.armedCard;if(P&&B!==P.stake)throw new Error("\u5DF2\u88C5\u5907\u5361\u7ED1\u5B9A\u4E0B\u6CE8 "+P.stake.toLocaleString()+"\uFF0C\u8BF7\u53D6\u6D88\u88C5\u5907\u540E\u66F4\u6539\u3002");if(w&&B!==L.balance)throw new Error("All In must wager your whole wallet.");if(B>L.balance)throw new Error("Your wallet does not have enough chips for this spin.");let ge=M?[0,6,0]:P?A[P.type].reels:E===null?Array.from({length:3},()=>{let z=this.random();if(!(z>=0&&z<1))throw new Error("Could not generate a valid spin. Try again.");return Math.floor(z*g.length)}):E,ve=this.slotResult(ge,B);return ve.walletAfterWager=e.sub(L.balance,B),L.balance=e.add(L.balance,ve.net),P&&(L.cards=L.cards.filter(z=>z.id!==P.id),L.armedCardId=null,ve.cardName=A[P.type].name,this.record(`${L.name} \xB7 \u5DF2\u6D88\u8017${ve.cardName}\uFF0C\u7ED1\u5B9A\u4E0B\u6CE8 ${B.toLocaleString()}\u3002`)),this.record(`${L.name} \xB7 777${E===null?"":" (forced jackpot)"}: wager ${B.toLocaleString()}, payout ${ve.payout.toLocaleString()} (${ve.symbols.map(z=>p[z]).join(" / ")}).`),this.completeRound(ve.net),this.lock="slots",this.save(),ve}}W.money=e,W.symbols=p,W.triples=m,W.reelStrip=g,W.creditLimit=n,W.sharkLimit=i,W.cards=A,W.emptyBets=C,W.sumBets=I,W.storageKey=r,t.CasinoEngine=W})(globalThis);ka();var ur=(t,e,r=0)=>((typeof t!="string"||t.trim().length<r||t.trim().length>e)&&j(`\u6587\u5B57\u957F\u5EA6\u5FC5\u987B\u4E3A ${r}\u2013${e}\u3002`),t.trim()),bn=(t,e,r)=>((!Number.isSafeInteger(t)||t<e||t>r)&&j("\u8BF7\u8F93\u5165\u6709\u6548\u6574\u6570\u3002"),t),Pf=(t,e)=>{(e.actor!==t.meta.ownerActor||e.role!=="owner")&&j("\u53EA\u6709\u7AD9\u70B9\u6240\u6709\u8005\u53EF\u4EE5\u6267\u884C\u6B64\u64CD\u4F5C\u3002",403)},Ad=t=>t.startsWith("admin.")||["adminAdjust","addUser","deletePlayer","import"].includes(t);function Of(t,e,r,n,i,o){let a=r.playerId;if(n==="reward.claim")return _f(t,a,o);if(n==="quest.claim")return Rf(t,a,ur(i[0],80,1),o);if(n==="profile.update"){let s=i[0];(!s||typeof s!="object"||Array.isArray(s))&&j("\u8D44\u6599\u683C\u5F0F\u65E0\u6548\u3002");let l=t.profiles[a];if(s.name!==void 0){let d=ur(s.name,24,1);e.data.users.some(p=>p.id!==a&&p.name.toLocaleLowerCase()===d.toLocaleLowerCase())&&j("\u73A9\u5BB6\u540D\u79F0\u5DF2\u88AB\u4F7F\u7528\u3002"),e.active.name=d}return s.bio!==void 0&&(l.bio=ur(s.bio,180)),s.avatar!==void 0&&(["initial","star","moon","diamond"].includes(s.avatar)||j("\u8BF7\u9009\u62E9\u9884\u8BBE\u5934\u50CF\u3002"),l.avatar=s.avatar),t.progress[a].profileCompleted=!0,gn(t,a,o),l}if(n==="profile.settings"){let s=i[0];(!s||typeof s!="object"||Array.isArray(s))&&j("\u8BBE\u7F6E\u683C\u5F0F\u65E0\u6548\u3002");let l=t.profiles[a];s.walletVisible!==void 0&&(typeof s.walletVisible!="boolean"&&j("\u4F59\u989D\u9690\u79C1\u8BBE\u7F6E\u65E0\u6548\u3002"),l.walletVisible=s.walletVisible);for(let d of["sound","reducedMotion"])s[d]!==void 0&&(typeof s[d]!="boolean"&&j("\u504F\u597D\u8BBE\u7F6E\u65E0\u6548\u3002"),l.settings[d]=s[d]);return l}if(n==="inventory.equip"){let[s,l]=i,d=t.profiles[a],p=(m,g)=>{(!t.inventory[a+":"+m]||t.items[m]?.kind!==g||!t.items[m]?.enabled)&&j("\u672A\u62E5\u6709\u8BE5\u7269\u54C1\u6216\u88C5\u5907\u7C7B\u578B\u4E0D\u5339\u914D\u3002",403)};if(s==="badges"){(!Array.isArray(l)||l.length>3||new Set(l).size!==l.length)&&j("\u6700\u591A\u5C55\u793A\u4E09\u4E2A\u4E0D\u540C\u5FBD\u7AE0\u3002");for(let m of l)p(m,"badge");d.featuredBadges=[...l]}else["frame","title","background"].includes(s)||j("\u88C5\u5907\u4F4D\u7F6E\u65E0\u6548\u3002"),l!==null&&p(l,s),d.equipped[s]=l;return d}if(n==="admin.bind"){let[s,l]=i,d=t.accounts[s],p=e.data.users.find(m=>m.id===l);return(!d||!p||t.profiles[l]?.archived)&&j("\u8BF7\u9009\u62E9\u5DF2\u767B\u5F55\u7684\u8D26\u53F7\u548C\u6709\u6548\u65E7\u73A9\u5BB6\u3002"),d.playerId&&d.playerId!==l&&j("\u8BE5\u8D26\u53F7\u5DF2\u7ECF\u7ED1\u5B9A\u5176\u4ED6\u73A9\u5BB6\u3002"),Object.values(t.accounts).some(m=>m.actor!==s&&m.playerId===l)&&j("\u8BE5\u73A9\u5BB6\u5DF2\u7ECF\u7ED1\u5B9A\u5176\u4ED6\u8D26\u53F7\u3002",409),d.role!=="member"&&r.role!=="owner"&&j("\u53EA\u6709\u6240\u6709\u8005\u53EF\u4EE5\u7ED1\u5B9A\u7BA1\u7406\u5458\u8D26\u53F7\u3002",403),d.playerId=l,d.status="active",hn(t,l,o),{actor:s,playerId:l}}if(n==="admin.account"){Pf(t,r);let[s,l,d,p]=i,m=t.accounts[s];return ur(p,120,3),(!m||s===t.meta.ownerActor||!["admin","member"].includes(l)||!["active","suspended","pending"].includes(d))&&j("\u8D26\u53F7\u72B6\u6001\u6216\u89D2\u8272\u65E0\u6548\uFF1B\u4E0D\u80FD\u4FEE\u6539\u6240\u6709\u8005\u3002"),d==="active"&&!m.playerId&&j("\u8BF7\u5148\u7ED1\u5B9A\u73A9\u5BB6\u3002"),m.role=l,m.status=d,{actor:s,role:l,status:d}}if(n==="admin.maintenance")return Pf(t,r),typeof i[0]!="boolean"&&j("\u7EF4\u62A4\u72B6\u6001\u65E0\u6548\u3002"),ur(i[1],120,3),t.meta.maintenance=i[0],{maintenance:i[0]};if(n==="admin.item"){let s=structuredClone(i[0]);return(!s||typeof s!="object")&&j("\u7269\u54C1\u65E0\u6548\u3002"),s.id=ur(s.id,80,1),s.name=ur(s.name,48,1),s.description=ur(s.description||"",300),(!["frame","badge","title","background","souvenir"].includes(s.kind)||!["common","rare","epic","legendary"].includes(s.rarity)||typeof s.enabled!="boolean")&&j("\u7269\u54C1\u5206\u7C7B\u6216\u7A00\u6709\u5EA6\u65E0\u6548\u3002"),t.items[s.id]&&t.items[s.id].kind!==s.kind&&j("\u5DF2\u6709\u7269\u54C1\u4E0D\u80FD\u6539\u53D8\u88C5\u5907\u7C7B\u578B\u3002"),t.items[s.id]=s,s}if(n==="admin.definition"){let s=structuredClone(i[0]);(!s||typeof s!="object")&&j("\u914D\u7F6E\u65E0\u6548\u3002"),s.id=ur(s.id,80,1),s.name=ur(s.name||s.id,60,1),(typeof s.enabled!="boolean"||!["settings","quest","achievement"].includes(s.kind))&&j("\u914D\u7F6E\u7C7B\u578B\u65E0\u6548\u3002"),s.kind==="settings"?(s.id!=="settings"&&j("\u914D\u7F6E\u6807\u8BC6\u65E0\u6548\u3002"),bn(s.gameXP,0,100),bn(s.dailyGameCap,0,1e3),bn(s.levelFactor,10,1e6),(!Array.isArray(s.dailyXP)||s.dailyXP.length!==7)&&j("\u7B7E\u5230\u9700\u8981\u4E03\u5929\u5956\u52B1\u3002"),s.dailyXP.forEach(d=>bn(d,0,1e4))):((!["day","week","month","all","event"].includes(s.period)||!["games","types","profile","club","quests","items"].includes(s.condition))&&j("\u4EFB\u52A1\u89C4\u5219\u65E0\u6548\u3002"),bn(s.target,1,1e6),bn(s.xp||0,0,1e4),s.period==="event"&&(bn(s.startsAt,0,Number.MAX_SAFE_INTEGER),bn(s.endsAt,s.startsAt+1,Number.MAX_SAFE_INTEGER)),s.itemIds!==void 0&&(!Array.isArray(s.itemIds)||s.itemIds.length>5||s.itemIds.some(d=>!t.items[d]))&&j("\u5956\u52B1\u7269\u54C1\u65E0\u6548\u3002"));let l=t.definitions[s.id];return l&&l.kind!==s.kind&&j("\u4E0D\u80FD\u6539\u53D8\u5DF2\u6709\u914D\u7F6E\u7684\u7C7B\u578B\u3002"),s.version=(l?.version||0)+1,t.definitions[s.id]=s,t.versions[s.id+":"+s.version]=structuredClone(s),s}}var Oe=globalThis.CasinoMoney,xc=globalThis.CasinoEngine,ci=(t,e=200,r={})=>new Response(Oe.stringify(t),{status:e,headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"private, no-store","X-Content-Type-Options":"nosniff",...r}}),Nf=async t=>{let e=new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(t)));return btoa(String.fromCharCode(...e)).replaceAll("+","-").replaceAll("/","_").replaceAll("=","")},o0=t=>t.headers.get("cookie")?.split(";").map(e=>e.trim()).find(e=>e.startsWith("__Host-club-admin="))?.slice(18)||"",Re=t=>t.headers.get("oai-authenticated-user-id")||j("\u8BF7\u5148\u767B\u5F55\u3002",401);function a0(t,e){let r=new xc({getItem:()=>t,setItem(){}},void 0,()=>e,{recoverRoulette:!1});return r.storageWarning&&j("\u5B58\u6863\u6821\u9A8C\u5931\u8D25\uFF0C\u672A\u4FEE\u6539\u65E7\u6570\u636E\u3002",500),r.isolatedPlayer=!0,r}function Df(t){return{cash:t.balance,bank:t.debt,shark:t.sharkDebt,negative:t.recovery?.deficit||0}}function Lf(t,e,r,n,i,o,a,s=""){for(let l of r.users){let d=e.users.find(g=>g.id===l.id),p=d?Df(d):{cash:0,bank:0,shark:0,negative:0},m=Df(l);for(let g of Object.keys(m))(!d||Oe.compare(p[g],m[g])!==0)&&t.journal.push({id:n+":"+l.id+":"+g,playerId:l.id,operationId:n,actor:i,kind:o,asset:g,before:String(p[g]),after:String(m[g]),delta:String(Oe.sub(m[g],p[g])),createdAt:a,reason:s})}for(let l of e.users)r.users.some(d=>d.id===l.id)||j("\u4E0D\u80FD\u7269\u7406\u5220\u9664\u6709\u5386\u53F2\u7684\u73A9\u5BB6\u3002")}function jf(t,e){for(let r of e.users){if(!t.profiles[r.id])continue;let n=r.recovery?0:r.balance,i=n<0,o=String(Oe.abs(n));t.wallets[r.id]={id:r.id,visible:t.profiles[r.id].walletVisible&&!t.profiles[r.id].archived?1:0,sign:n===0?0:i?-1:1,magnitude:o.length,digits:o,name:r.name}}}function Hf({page:t="",applyCommand:e,legacyFactory:r,bootstrapOwnerPrivate:n=!1,clock:i=()=>Date.now(),origin:o,extensions:a={}}){async function s(b,A,v,y){try{return await e(b,A,v,y)}catch(k){if(k.status)throw k;j(k.message||"\u6E38\u620F\u64CD\u4F5C\u65E0\u6548\u3002")}}async function l(b){let A=await b.prepare("SELECT snapshot,revision FROM casino_state WHERE id=?").bind("club").first();if(!A){let v=new xc(null);await b.prepare("INSERT OR IGNORE INTO casino_state (id,snapshot,revision,last_op) VALUES (?,?,0,?)").bind("club",Oe.stringify(v.data),"initial").run(),A=await b.prepare("SELECT snapshot,revision FROM casino_state WHERE id=?").bind("club").first()}return A}async function d(b,A){let v=o0(b);if(!v)return!1;let y=await A.prepare("SELECT actor,expires_at FROM admin_sessions WHERE id=?").bind(await Nf(v)).first();return!!(y&&y.actor===Re(b)&&y.expires_at>i())}async function p(b,A){for(let v=0;v<8;v++){let y=await l(A),k=await wc(A),R=i(),O=structuredClone(k);if(!O.meta){let B=(await A.prepare("SELECT actor FROM admin_credential WHERE id=?").bind("owner").first())?.actor||(n?Re(b):null);B||j("\u8BF7\u5148\u7531\u6240\u6709\u8005\u5B8C\u6210\u521D\u59CB\u5316\u3002",503),O=Tf(B,R),O.accounts[B]={id:B,actor:B,playerId:null,email:B===Re(b)&&b.headers.get("oai-authenticated-user-email")||"",role:"owner",status:"active",createdAt:R},O.backups.push({id:"pre-v2:"+crypto.randomUUID(),createdAt:R,kind:"pre-v2",legacy:{snapshot:y.snapshot,revision:y.revision}})}let V=Oe.parseJSON(y.snapshot),W=V.users.filter(M=>!O.profiles[M.id]).slice(0,5);for(let M of W)hn(O,M.id,R),Lf(O,{users:[]},{users:[M]},"opening:"+M.id,"system","opening",R);if(O.accounts[Re(b)]||(O.accounts[Re(b)]={id:Re(b),actor:Re(b),playerId:null,email:b.headers.get("oai-authenticated-user-email")||"",role:"member",status:"pending",createdAt:R}),jf(O,V),O.meta.ready=V.users.every(M=>O.profiles[M.id]),!Ea(A,k,O,"initializing").length)return{p:k,row:y};let h=crypto.randomUUID(),E=Ea(A,k,O,h);if((await A.batch([A.prepare("UPDATE casino_state SET revision=revision+1,last_op=? WHERE id=? AND revision=?").bind(h,"club",y.revision),...E]))[0].meta.changes)return y.revision++,O.meta.ready||j("\u6B63\u5728\u5B89\u5168\u5BFC\u5165\u65E7\u73A9\u5BB6\uFF0C\u8BF7\u7A0D\u540E\u5237\u65B0\u7EE7\u7EED\u3002",503),{p:await wc(A),row:y}}j("\u521D\u59CB\u5316\u6B63\u5FD9\uFF0C\u8BF7\u91CD\u8BD5\u3002",409)}async function m(b,A,v,y,k="formal"){let R=v.accounts[Re(b)];R?.status==="suspended"&&j("\u8D26\u53F7\u5DF2\u505C\u7528\u3002",403);let O=await d(b,A),V=Oe.parseJSON(y.snapshot),W=V.users.filter(M=>!v.profiles[M.id]?.archived&&Object.values(v.accounts).some(B=>B.playerId===M.id&&B.status==="active")).map(M=>go(M,v)),N={role:R?.role||"member",admin:O&&["owner","admin"].includes(R?.role),actor:Re(b),enrolled:!!await A.prepare("SELECT id FROM admin_credential WHERE id=?").bind(R?.role==="owner"?"owner":"admin:"+Re(b)).first(),canEnroll:["owner","admin"].includes(R?.role)};N.canEnroll=N.canEnroll&&!N.enrolled;let h=Sf(V,v,R),E=R.playerId?v.progress[R.playerId]:null;k==="sandbox"&&(oi(v,Re(b),null,!0,O),h=v.sandbox[Re(b)]?.data||g(),E=null),R.playerId&&k==="formal"&&(h.ledger=(await Lr(A,"v2_journal","WHERE player_id=?",[R.playerId],100)).map(M=>({time:new Date(M.createdAt).toISOString(),text:`${M.kind} \xB7 ${M.asset}: ${M.before} \u2192 ${M.after}${M.reason?" \xB7 "+M.reason:""}`})));let w={protocol:2,mode:k,account:{role:R.role,status:R.status,playerId:R.playerId},maintenance:v.meta.maintenance,startedAt:v.meta.startedAt,profile:R.playerId?v.profiles[R.playerId]:null,progress:E,definitions:Object.values(v.definitions),items:Object.values(v.items),inventory:Object.values(v.inventory).filter(M=>M.playerId===R.playerId),quests:R.playerId?xd(v,R.playerId,i()):[],periods:rt(i()),club:a.clubView?.(v,R.playerId,i())||null};return{data:h,directory:W,revision:y.revision,now:i(),auth:N,platform:w}}function g(){let b=new xc(null);return b.data.users=[b.data.users[0]],b.data.activeId=b.active.id,b.active.name="Sandbox",b.active.balance=1e5,b.data}async function C(b,A,v){(!v||typeof v!="object"||Array.isArray(v))&&j("\u8BF7\u6C42\u683C\u5F0F\u65E0\u6548\u3002");let{id:y,command:k,args:R=[],playerId:O,mode:V="formal"}=v;b.headers.get("X-Club-Protocol")!=="2"&&j("\u7AD9\u70B9\u5DF2\u5347\u7EA7\uFF0C\u8BF7\u5237\u65B0\u9875\u9762\u3002",409),(typeof y!="string"||y.length<16||y.length>80||typeof k!="string"||!Array.isArray(R)||R.length>5||!["formal","sandbox"].includes(V))&&j("\u64CD\u4F5C\u53C2\u6570\u65E0\u6548\u3002");let W=await Nf(Oe.stringify({operation:k,args:R,playerId:O,mode:V}));for(let N=0;N<6;N++){let{p:h,row:E}=await p(b,A),w=structuredClone(h),M=i(),B=await d(b,A),L=Ad(k)||V==="sandbox",P=oi(w,Re(b),O,L,B);w.meta.maintenance&&k!=="admin.maintenance"&&k!=="admin.bind"&&j("\u7EF4\u62A4\u671F\u95F4\u6682\u505C\u72B6\u6001\u4FEE\u6539\u3002",503),V==="formal"&&!L&&!P.playerId&&j("\u8BF7\u5148\u7ED1\u5B9A\u81EA\u5DF1\u7684\u73A9\u5BB6\u3002",403);let ge=await A.prepare("SELECT actor,payload,response FROM casino_operations WHERE id=?").bind(y).first();if(ge)return(ge.actor!==Re(b)||ge.payload!==W)&&j("\u64CD\u4F5C\u7F16\u53F7\u5DF2\u88AB\u4F7F\u7528\u3002",409),ci({...await m(b,A,w,E,V),result:Oe.parseJSON(ge.response).result});let ve=Oe.parseJSON(E.snapshot),z=a0(V==="sandbox"?Oe.stringify(w.sandbox[Re(b)]?.data||g()):E.snapshot,M);V==="formal"&&P.playerId&&(z.data.activeId=P.playerId);let de;if(V==="sandbox")["slots","lottery","plinko","dice","blackjack","roulette.bet","roulette.clear","roulette.rebet","roulette.spin","roulette.rig","sandbox.reset"].includes(k)||j("\u6C99\u76D2\u53EA\u652F\u6301\u6E38\u620F\u548C\u91CD\u7F6E\uFF0C\u4E0D\u80FD\u64CD\u4F5C\u6B63\u5F0F\u8D44\u4EA7\u3002",403),k==="sandbox.reset"?(z.active.balance=R.length?z.amount(R[0]):1e5,z.active.blackjack=null,z.active.bets=xc.emptyBets(),z.lock=null,de=null):de=await s(z,k,R,!0),w.sandbox[Re(b)]={id:Re(b),data:z.data};else{if((k==="roulette.rig"||k==="blackjack"&&R[0]==="forceJackpot"||R.some(Ae=>Ae&&typeof Ae=="object"&&Ae.jackpot)||k==="roulette.spin"&&R[0])&&j("\u7279\u6B8A\u5F00\u5956\u4EC5\u9650\u7BA1\u7406\u5458\u6C99\u76D2\u3002",403),["gift","offerLoan"].includes(k)&&!Object.values(w.accounts).some(Ae=>Ae.status==="active"&&Ae.playerId===R[0])&&j("\u76EE\u6807\u73A9\u5BB6\u5C1A\u672A\u7ED1\u5B9A\u6709\u6548\u6210\u5458\u3002"),k==="adminAdjust"&&(typeof R[3]!="string"||R[3].trim().length<3)&&j("\u4F59\u989D\u8C03\u6574\u5FC5\u987B\u586B\u5199\u81F3\u5C11\u4E09\u4E2A\u5B57\u7B26\u7684\u539F\u56E0\u3002"),k==="admin.compensate"){let Ae=await A.prepare("SELECT body FROM v2_journal WHERE id=?").bind(R[0]).first();(!Ae||typeof R[1]!="string"||R[1].trim().length<3)&&j("\u8BF7\u9009\u62E9\u539F\u8C03\u6574\u6D41\u6C34\u5E76\u586B\u5199\u539F\u56E0\u3002");let re=Oe.parseJSON(Ae.body);(re.kind!=="adminAdjust"||re.asset!=="cash")&&j("\u53EA\u80FD\u8865\u507F\u7BA1\u7406\u5458\u94B1\u5305\u8C03\u6574\u3002");let We=re.playerId+":compensation:"+re.id;w.claims[We]&&j("\u8BE5\u8C03\u6574\u5DF2\u7ECF\u8865\u507F\u3002",409);let Pe=Oe.sub(Oe.parse(re.before),Oe.parse(re.after));Pe===0&&j("\u8BE5\u8BB0\u5F55\u6CA1\u6709\u91D1\u989D\u53D8\u5316\u3002"),z.adminAdjust(re.playerId,Pe>0?"add":"remove",Oe.abs(Pe),R[1]),w.claims[We]={id:We,playerId:re.playerId,kind:"compensation",createdAt:M,source:re.id,reason:R[1]},de={source:re.id}}else if(k==="deletePlayer"){let Ae=z.data.users.find(Pe=>Pe.id===R[0]);Ae||j("\u73A9\u5BB6\u4E0D\u5B58\u5728\u3002");let re=structuredClone(z.data);z.deletePlayer(Ae.id),z.data=re,Object.values(w.accounts).some(Pe=>Pe.playerId===Ae.id&&Pe.role==="owner")&&j("\u4E0D\u80FD\u5F52\u6863\u6240\u6709\u8005\u7684\u73A9\u5BB6\u3002");let We=z.data.users.find(Pe=>Pe.id===Ae.id);We.balance=0,w.profiles[Ae.id].archived=!0;for(let Pe of Object.values(w.accounts))Pe.playerId===Ae.id&&(Pe.status="suspended");de=null}else k==="import"?j("V2 \u5DF2\u542F\u7528\uFF1B\u65E7\u5B58\u6863\u4E0D\u80FD\u8986\u76D6\u73B0\u6709\u6570\u636E\u5E93\u3002",409):(de=k==="system.sync"?null:Of(w,z,P,k,R,M),de===void 0&&a.action&&(de=a.action(w,z,P,k,R,M)),de===void 0&&(de=await s(z,k,R,L&&B)));for(let Ae of z.data.users)w.profiles[Ae.id]||hn(w,Ae.id,M);let tt=k==="blackjack"?z.active.blackjack:null;["slots","lottery","plinko","dice","roulette.spin"].includes(k)?wd(w,P.playerId,k==="roulette.spin"?"roulette":k,de?.roundId||de?.id||y,M):tt?.phase==="settled"&&!(ve.users.find(Ae=>Ae.id===P.playerId)?.blackjack?.id===tt.id&&ve.users.find(Ae=>Ae.id===P.playerId)?.blackjack?.phase==="settled")&&wd(w,P.playerId,"blackjack",tt.id,M),Lf(w,ve,z.data,y,Re(b),k,M,k==="adminAdjust"?R[3]:Ad(k)?String(R.at(-1)||""):""),jf(w,z.data)}w.events.push({id:"command:"+y,playerId:P.playerId||null,kind:V==="sandbox"?"sandbox.command":k,createdAt:M,actor:Re(b)});let Se=V==="sandbox"?E.snapshot:Oe.stringify(z.data),we=Oe.stringify({result:de??null});if((await A.batch([A.prepare("UPDATE casino_state SET snapshot=?,revision=revision+1,last_op=? WHERE id=? AND revision=?").bind(Se,y,"club",E.revision),...Ea(A,h,w,y),A.prepare("INSERT INTO casino_operations (id,actor,payload,response,created_at) SELECT ?,?,?,?,? WHERE EXISTS (SELECT 1 FROM casino_state WHERE id='club' AND last_op=?)").bind(y,Re(b),W,we,M,y)]))[0].meta.changes)return ci({...await m(b,A,w,{snapshot:Se,revision:E.revision+1},V),result:de??null})}j("\u8D26\u6237\u66F4\u65B0\u6B63\u5FD9\uFF0C\u8BF7\u91CD\u8BD5\u3002",409)}async function I(b,A){let{p:v,row:y}=await p(b,A),k=new URL(b.url),R=k.searchParams.get("mode")||"formal";if(k.pathname==="/api/state"||k.pathname==="/api/me"){let O=Oe.parseJSON(y.snapshot),V=i(),W=v.accounts[Re(b)],N=O.users.some(h=>h.debt>0&&(h.bankInterestAt===null||V-h.bankInterestAt>=6e5||h.bankInterestPolicy!==2)||h.sharkDebt>0&&(h.sharkInterestAt===null||V-h.sharkInterestAt>=18e4||h.sharkInterestPolicy!==2))||O.loans.some(h=>h.status==="active"&&V-h.interestAt>=h.periodMs);if(R==="formal"&&!v.meta.maintenance&&W?.status==="active"&&W.playerId&&N){let h=new Headers(b.headers);return h.set("X-Club-Protocol","2"),C(new Request(b,{headers:h}),A,{id:crypto.randomUUID(),command:"system.sync",args:[],playerId:W.playerId})}return ci(await m(b,A,v,y,R))}if(k.pathname.startsWith("/api/admin/")){let O=oi(v,Re(b),null,!0,await d(b,A));if(k.pathname==="/api/admin/overview")return ci({accounts:Object.values(v.accounts),players:Oe.parseJSON(y.snapshot).users,definitions:Object.values(v.definitions),items:Object.values(v.items),clubs:Object.values(v.clubs),maintenance:v.meta.maintenance,events:await Lr(A,"v2_events","",[],100),journal:await Lr(A,"v2_journal","",[],100),health:{version:2,revision:y.revision,ready:v.meta.ready}});if(k.pathname==="/api/admin/backup"){(O.role!=="owner"||!v.meta.maintenance)&&j("\u8BF7\u7531\u6240\u6709\u8005\u5148\u5F00\u542F\u53EA\u8BFB\u7EF4\u62A4\uFF0C\u518D\u5BFC\u51FA\u5907\u4EFD\u3002",409);let V=["casino_state","casino_operations","admin_credential","v2_meta",...Object.values((await Promise.resolve().then(()=>(ka(),Cf))).collections).map(([N])=>N),"v2_events","v2_journal","v2_backups"],W={};for(let N of V)W[N]=(await A.prepare(`SELECT * FROM ${N}`).all()).results;return ci({format:2,createdAt:i(),records:W})}}if(a.read){let O=await a.read(b,A,v,y,await d(b,A));if(O!==void 0)return ci(O)}j("\u63A5\u53E3\u4E0D\u5B58\u5728\u3002",404)}return{async fetch(b,A){try{let v=Re(b),y=new URL(b.url);if(A.DB||j("\u6570\u636E\u5E93\u672A\u8FDE\u63A5\u3002",503),y.pathname.startsWith("/api/admin/register/")||y.pathname.startsWith("/api/admin/authenticate/")||["/api/admin/status","/api/admin/logout"].includes(y.pathname)){let{p:W}=await p(b,A.DB),N=W.accounts[v];return(!["owner","admin"].includes(N?.role)||N.status!=="active")&&j("\u6CA1\u6709\u7BA1\u7406\u5458\u6743\u9650\u3002",403),r({credentialKey:N.role==="owner"?"owner":"admin:"+v}).fetch(b,A)}if(b.method==="POST"){(b.headers.get("origin")!==o||!b.headers.get("content-type")?.startsWith("application/json"))&&j("\u8BF7\u6C42\u6765\u6E90\u65E0\u6548\u3002",403);let W=await b.text();W.length>1e6&&j("\u8BF7\u6C42\u8FC7\u5927\u3002",413);let N;try{N=Oe.parseJSON(W)}catch{j("\u8BF7\u6C42\u5185\u5BB9\u65E0\u6548\u3002")}if(y.pathname==="/api/command")return await C(b,A.DB,N);j("\u63A5\u53E3\u4E0D\u5B58\u5728\u3002",404)}if(b.method!=="GET"&&j("\u8BF7\u6C42\u65B9\u5F0F\u4E0D\u652F\u6301\u3002",405),y.pathname.startsWith("/api/"))return await I(b,A.DB);if(!["/","/player","/admin","/index.html"].includes(y.pathname))return new Response("Not found",{status:404});let{p:k,row:R}=await p(b,A.DB),O=await m(b,A.DB,k,R),V=Oe.stringify(O).replaceAll("<","\\u003c");return new Response(t.replace("/* SERVER_BOOTSTRAP */",`window.__CASINO_BOOTSTRAP__=${V};`),{headers:{"Content-Type":"text/html;charset=utf-8","Cache-Control":"private, no-store","X-Frame-Options":"SAMEORIGIN","X-Content-Type-Options":"nosniff","Permissions-Policy":"publickey-credentials-create=(self), publickey-credentials-get=(self)"}})}catch(v){return ci({error:v.status?v.message:"\u64CD\u4F5C\u672A\u5B8C\u6210\uFF0C\u8BF7\u5237\u65B0\u91CD\u8BD5\u3002"},v.status||500)}}}}var c$=ho(ai(),1);(function(t){"use strict";!t.CasinoMoney&&typeof fn=="function"&&ai();let e=t.CasinoMoney,r=1e7,n=Object.freeze([1e3,1e4,1e6]),i=Object.freeze([{weight:500,numerator:200,name:"\u7279\u7B49\u5956"},{weight:2e3,numerator:100,name:"\u4E00\u7B49\u5956"},{weight:3e4,numerator:20,name:"\u4E8C\u7B49\u5956"},{weight:6e4,numerator:16,name:"\u4E09\u7B49\u5956"},{weight:12e4,numerator:10,name:"\u56DB\u7B49\u5956"},{weight:25e4,numerator:8,name:"\u4E94\u7B49\u5956"},{weight:35e4,numerator:5,name:"\u516D\u7B49\u5956"},{weight:45e4,numerator:4,name:"\u4E03\u7B49\u5956"},{weight:75e4,numerator:3,name:"\u516B\u7B49\u5956"},{weight:2e6,numerator:2,name:"\u4FDD\u672C\u672B\u7B49\u5956"},{weight:5987500,numerator:0,name:"\u672A\u4E2D\u5956"}].map(Object.freeze));function o(m){let g=e.positive(m);if(!n.includes(g))throw new Error("\u5F69\u7968\u7968\u4EF7\u53EA\u80FD\u9009\u62E9 1,000\u300110,000 \u6216 1,000,000 \u7B79\u7801\u3002");return g}function a(m,g){let C=o(m);if(!Number.isInteger(g)||g<0||g>=r)throw new Error("\u5F69\u7968\u5F00\u5956\u7ED3\u679C\u65E0\u6548\u3002");let I=0,b=i.findIndex(y=>g<(I+=y.weight)),A=i[b],v=e.ratio(C,A.numerator,2);return{game:"lottery",ticket:g,tier:b,wager:C,multiplier:A.numerator/2,payout:v,net:e.sub(v,C)}}function s(m){let C=Math.floor(4294967296/r)*r;for(let I=0;I<64;I++){let b=m();if(typeof b!="number"||!(b>=0&&b<1))throw new Error("\u65E0\u6CD5\u751F\u6210\u6709\u6548\u5F69\u7968\uFF0C\u8BF7\u91CD\u8BD5\u3002");let A=Math.floor(b*4294967296);if(A<C)return A%r}throw new Error("\u65E0\u6CD5\u751F\u6210\u6709\u6548\u5F69\u7968\uFF0C\u8BF7\u91CD\u8BD5\u3002")}function l(m,g,C=!1){let I=o(m);return a(I,C?0:s(g))}function d(m){try{if(!m||m.game!=="lottery"||typeof m.id!="string"||typeof m.time!="string")return!1;let g=a(m.wager,m.ticket);return["tier","multiplier","payout","net"].every(C=>m[C]===g[C])}catch{return!1}}let p=i.reduce((m,g)=>m+g.weight*g.numerator,0);t.CasinoLottery={prices:n,tiers:i,total:r,expectedNumerator:p,price:o,fromTicket:a,drawTicket:s,draw:l,validHistory:d}})(globalThis);(function(t){"use strict";!t.CasinoMoney&&typeof fn=="function"&&ai();let e=t.CasinoMoney,r=12,n=Object.freeze({low:Object.freeze([800,400,200,140,110,70,40,70,110,140,200,400,800]),medium:Object.freeze([2500,800,300,150,100,60,20,60,100,150,300,800,2500]),high:Object.freeze([1e4,1500,400,200,60,20,0,20,60,200,400,1500,1e4])}),i=Object.freeze({left:.44,center:.5,right:.56}),o=Object.freeze({4:61,5:31,6:19,7:13,8:9,9:7,10:7,11:7,12:7,13:9,14:13,15:19,16:31,17:61}),a=y=>e.positive(y),s=y=>{let k=y();if(!(k>=0&&k<1))throw new Error("\u65E0\u6CD5\u751F\u6210\u6709\u6548\u7ED3\u679C\uFF0C\u8BF7\u91CD\u8BD5\u3002");return k};function l(y,k){if(!Object.hasOwn(n,y)||!Object.hasOwn(i,k))throw new Error("\u8BF7\u9009\u62E9\u6709\u6548\u7684\u98CE\u9669\u548C\u843D\u7403\u53E3\u3002");return{table:n[y],rightChance:i[k]}}function d(y,k,R,O){y=a(y);let{table:V}=l(k,R);if(!Array.isArray(O)||O.length!==r||!O.every(E=>E===0||E===1))throw new Error("\u5F39\u73E0\u8DEF\u5F84\u65E0\u6548\u3002");let W=O.reduce((E,w)=>E+w,0),N=V[W]/100,h=e.ratio(y,V[W],100);return{game:"plinko",wager:y,risk:k,lane:R,path:[...O],pocket:W,multiplier:N,payout:h,net:e.sub(h,y)}}function p(y,k,R,O,V=!1){let{rightChance:W}=l(k,R);a(y);let N=Array.from({length:r},()=>V?R==="right"?1:0:+(s(O)<W));return d(y,k,R,N)}function m(y,k){if(!Number.isInteger(y)||y<0||y>r||!Object.hasOwn(i,k))throw new Error("\u69FD\u4F4D\u65E0\u6548\u3002");let R=1;for(let O=1;O<=y;O++)R=R*(r-O+1)/O;return R*i[k]**y*(1-i[k])**(r-y)}function g(y,k){d(1,"low",k,y);let R=0,O=[{x:{left:-1.8,center:0,right:1.8}[k],y:6.3},{x:0,y:5.22}];for(let V=1;V<=r;V++)R+=y[V-1],O.push({x:(R-V/2)*.82,y:5.22-V*.72});return O.push({x:(R-6)*.82,y:-4.05}),O}function C(y,k){if(!["small","big","odd","even","triple","sum"].includes(y))throw new Error("\u8BF7\u9009\u62E9\u6709\u6548\u7684\u9AB0\u5B9D\u4E0B\u6CE8\u3002");if(y==="sum"&&(!Number.isInteger(k)||!Object.hasOwn(o,k)))throw new Error("\u6307\u5B9A\u603B\u70B9\u6570\u9700\u4E3A 4\u201317\u3002");return y==="sum"?o[k]:y==="triple"?31:2}function I(y,k,R,O){y=a(y);let V=C(k,R);if(!Array.isArray(O)||O.length!==3||!O.every(M=>Number.isInteger(M)&&M>=1&&M<=6))throw new Error("\u9AB0\u5B50\u7ED3\u679C\u65E0\u6548\u3002");let W=O.reduce((M,B)=>M+B,0),N=O.every(M=>M===O[0]),E=(k==="triple"?N:k==="sum"?W===R:!N&&(k==="small"?W>=4&&W<=10:k==="big"?W>=11&&W<=17:k==="odd"?W%2===1:W%2===0))?V:0,w=e.mul(y,E);return{game:"dice",wager:y,kind:k,target:k==="sum"?R:null,dice:[...O],total:W,triple:N,multiplier:E,payout:w,net:e.sub(w,y)}}function b(y,k,R,O,V=!1){C(k,R),a(y);let W;if(V){e:for(let N=1;N<=6;N++)for(let h=1;h<=6;h++)for(let E=1;E<=6;E++)if(I(y,k,R,[N,h,E]).payout>0){W=[N,h,E];break e}}else W=Array.from({length:3},()=>1+Math.floor(s(O)*6));return I(y,k,R,W)}function A(y){let k={1:{x:0,z:Math.PI/2},2:{x:0,z:0},3:{x:-Math.PI/2,z:0},4:{x:Math.PI/2,z:0},5:{x:0,z:Math.PI},6:{x:0,z:-Math.PI/2}};if(!Object.hasOwn(k,y))throw new Error("\u9AB0\u5B50\u70B9\u6570\u65E0\u6548\u3002");return k[y]}function v(y){try{if(!y||typeof y.id!="string"||typeof y.time!="string")return!1;let k=y.game==="plinko"?d(y.wager,y.risk,y.lane,y.path):y.game==="dice"?I(y.wager,y.kind,y.target,y.dice):null;return!!(k&&y.payout===k.payout&&y.net===k.net&&y.multiplier===k.multiplier&&(y.game!=="dice"||y.total===k.total))}catch{return!1}}t.CasinoArcade={rows:r,tables:n,lanes:i,sumReturns:o,plinkoSettings:l,plinkoResult:d,plinko:p,pocketProbability:m,pathPoints:g,diceSettings:C,diceResult:I,dice:b,diceRotation:A,validHistory:v}})(globalThis);(function(t){"use strict";!t.CasinoMoney&&typeof fn=="function"&&ai();let e=t.CasinoMoney,r=l=>Math.min(l.rank,10),n=l=>l&&Number.isInteger(l.rank)&&l.rank>=1&&l.rank<=13&&Number.isInteger(l.suit)&&l.suit>=0&&l.suit<=3;function i(l){let d=0,p=0;for(let m of l)d+=m.rank===1?11:r(m),m.rank===1&&p++;for(;d>21&&p>0;)d-=10,p--;return{total:d,soft:p>0,blackjack:l.length===2&&d===21,bust:d>21}}function o(l){let d=[];for(let p=0;p<6;p++)for(let m=0;m<4;m++)for(let g=1;g<=13;g++)d.push({rank:g,suit:m});for(let p=d.length-1;p>0;p--){let m=l();if(!(m>=0&&m<1))throw new Error("The shoe could not be shuffled. Try again.");let g=Math.floor(m*(p+1));[d[p],d[g]]=[d[g],d[p]]}return d}function a(l,d){if(!l||l.version!==1||l.ownerId!==d||!["player","dealer","settled"].includes(l.phase)||typeof l.id!="string"||!Array.isArray(l.shoe)||l.shoe.length>312||!l.shoe.every(n)||!Array.isArray(l.dealer)||l.dealer.length<2||l.dealer.length>32||!l.dealer.every(n)||!Array.isArray(l.hands)||l.hands.length<1||l.hands.length>2||!Number.isInteger(l.activeHand)||l.activeHand<0||l.activeHand>l.hands.length||!l.hands.every(m=>Array.isArray(m.cards)&&m.cards.length>=2&&m.cards.length<=32&&m.cards.every(n)&&e.valid(m.bet)&&m.bet>=1&&typeof m.split=="boolean"&&["playing","stood","bust"].includes(m.status))||l.phase==="player"&&l.hands[l.activeHand]?.status!=="playing")return!1;let p=new Map;for(let m of[...l.shoe,...l.dealer,...l.hands.flatMap(g=>g.cards)]){let g=m.rank+":"+m.suit;if(p.set(g,(p.get(g)||0)+1),p.get(g)>6)return!1}return!(l.phase==="settled"&&(!l.result||!e.valid(l.result.payout)||l.result.payout<0||!e.valid(l.result.wager)||!Array.isArray(l.result.hands)||l.result.hands.length!==l.hands.length||!l.result.hands.every(m=>m&&typeof m.label=="string"&&e.valid(m.payout)&&m.payout>=0)||!e.valid(l.result.net)))}class s{constructor(d,p={}){this.engine=d,this.shoeFactory=p.shoeFactory||(()=>o(()=>d.random()));let m=d.isolatedPlayer?[d.active]:d.data.users;for(let C of m)C.blackjack&&!a(C.blackjack,C.id)&&(C.blackjack=null,d.storageWarning="An unreadable saved blackjack hand was cleared. Your wallet and bank records were kept.");let g=m.find(C=>C.blackjack&&C.blackjack.phase!=="settled");g&&(d.data.activeId=g.id,d.lock="blackjack")}get round(){return this.engine.active.blackjack||null}get pending(){return!!(this.round&&this.round.phase!=="settled")}available(){let d=this.round,p=d?.hands[d.activeHand],m=!!(d&&d.phase==="player"&&p?.status==="playing"&&this.engine.lock==="blackjack");return{hit:m,stand:m,double:m&&p.cards.length===2&&this.engine.active.balance>=p.bet,split:m&&d.hands.length===1&&p.cards.length===2&&r(p.cards[0])===r(p.cards[1])&&this.engine.active.balance>=p.bet}}_playing(d){if(!this.available()[d])throw new Error(d==="double"||d==="split"?"That move needs an eligible two-card hand and enough chips.":"Wait until it is your turn.");return this.round}_draw(d){if(!d.shoe.length)throw new Error("The shoe is empty.");return d.shoe.pop()}_save(){this.engine.save()}start(d,{jackpot:p=!1}={}){this.engine.ensureIdle();let m=this.engine.amount(d),g=this.engine.active;if(m>g.balance)throw new Error("Not enough chips. Lower your bet or visit the bank.");let C=this.round,I=p?o(()=>.5):C&&C.shoe.length>=52?[...C.shoe]:this.shoeFactory();if(!Array.isArray(I)||I.length<4||!I.every(n))throw new Error("The shoe could not be prepared.");if(p){let A=[1,10,13,9].map(v=>I.splice(I.findIndex(y=>y.rank===v),1)[0]);I.push(...A.reverse())}let b={version:1,id:t.crypto.randomUUID(),ownerId:g.id,phase:"player",shoe:I,dealer:[],hands:[{cards:[],bet:m,split:!1,status:"playing"}],activeHand:0,result:null};return b.hands[0].cards.push(this._draw(b)),b.dealer.push(this._draw(b)),b.hands[0].cards.push(this._draw(b)),b.dealer.push(this._draw(b)),g.balance=e.sub(g.balance,m),g.blackjack=b,this.engine.lock="blackjack",i(b.hands[0].cards).blackjack||i(b.dealer).blackjack?this._settle():this._save(),b}_advance(){let d=this.round,p=d.hands.findIndex((m,g)=>g>=d.activeHand&&m.status==="playing");p===-1?(d.activeHand=d.hands.length,d.phase="dealer"):d.activeHand=p}hit(){let d=this._playing("hit"),p=d.hands[d.activeHand];p.cards.push(this._draw(d));let m=i(p.cards);return m.total>=21&&(p.status=m.bust?"bust":"stood",this._advance()),this._save(),d}stand(){let d=this._playing("stand");return d.hands[d.activeHand].status="stood",this._advance(),this._save(),d}double(){let d=this._playing("double"),p=d.hands[d.activeHand],m=this._draw(d);return this.engine.active.balance=e.sub(this.engine.active.balance,p.bet),p.bet=e.mul(p.bet,2),p.cards.push(m),p.status=i(p.cards).bust?"bust":"stood",this._advance(),this._save(),d}split(){let d=this._playing("split"),p=d.hands[0];if(d.shoe.length<2)throw new Error("The shoe does not have enough cards to split.");let m={cards:[p.cards.pop()],bet:p.bet,split:!0,status:"playing"};p.split=!0,this.engine.active.balance=e.sub(this.engine.active.balance,p.bet),p.cards.push(this._draw(d)),m.cards.push(this._draw(d)),d.hands.push(m);let g=p.cards[0].rank===1;for(let C of d.hands)(g||i(C.cards).total===21)&&(C.status="stood");return this._advance(),this._save(),d}dealerStep(){let d=this.round;if(!d||d.phase!=="dealer"||this.engine.lock!=="blackjack")throw new Error("The dealer is not playing.");return d.hands.every(p=>i(p.cards).bust)||i(d.dealer).total>=17?this._settle():(d.dealer.push(this._draw(d)),i(d.dealer).total>=17?this._settle():(this._save(),d))}forceJackpot(d){if(!this.pending)return this.start(d,{jackpot:!0});let p=this.round;if(this.engine.lock!=="blackjack")throw new Error("Wait for the current game to finish.");p.shoe=o(()=>.5);let m=g=>p.shoe.splice(p.shoe.findIndex(C=>C.rank===g),1)[0];p.dealer=[m(10),m(9)];for(let g of p.hands)g.cards=g.cards.length===2?[m(1),m(13)]:[m(1),m(5),m(5)],g.status="stood";return p.activeHand=p.hands.length,this._settle()}_settle(){let d=this.round;if(d.phase==="settled")return d;let p=i(d.dealer),m=d.hands.map(I=>{let b=i(I.cards),A=!I.split&&b.blackjack,v=0,y="Dealer wins";return b.bust?y="Bust":p.blackjack?A&&(v=1,y="Push"):A?(v=2.5,y="Blackjack \xB7 3:2"):p.bust||b.total>p.total?(v=2,y=p.bust?"Dealer busts \xB7 You win":"You win"):b.total===p.total&&(v=1,y="Push"),{label:y,total:b.total,bet:I.bet,payout:e.ratio(I.bet,v*2,2)}}),g=d.hands.reduce((I,b)=>e.add(I,b.bet),0),C=m.reduce((I,b)=>e.add(I,b.payout),0);return d.result={hands:m,wager:g,payout:C,net:e.sub(C,g),dealer:p.total},d.phase="settled",this.engine.active.balance=e.add(this.engine.active.balance,C),this.engine.lock=null,this.engine.record(`${this.engine.active.name} \xB7 Blackjack: wager ${g.toLocaleString()}, payout ${C.toLocaleString()} (${m.map(I=>I.label).join(" / ")}).`),this.engine.completeRound(d.result.net),this._save(),d}}s.score=i,s.makeShoe=o,t.CasinoBlackjack=s})(globalThis);var ce={};Pt(ce,{fromBuffer:()=>p0,fromUTF8String:()=>m0,isBase64:()=>g0,isBase64URL:()=>b0,toBase64:()=>f0,toBuffer:()=>u0,toUTF8String:()=>h0,trimPadding:()=>Gf});var Ed="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Uf="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",$f=t=>{let e=typeof Uint8Array>"u"?[]:new Uint8Array(256),r=Ed.length;for(let n=0;n<r;n++)e[t.charCodeAt(n)]=n;return e},s0=$f(Ed),c0=$f(Uf),l0=/^[-A-Za-z0-9\-_]*$/,d0=/^[-A-Za-z0-9+/]*={0,3}$/,pr={};pr.toArrayBuffer=(t,e)=>{let r=t.length,n=t.length*.75,i,o=0,a,s,l,d;t[t.length-1]==="="&&(n--,t[t.length-2]==="="&&n--);let p=new ArrayBuffer(n),m=new Uint8Array(p),g=e?c0:s0;for(i=0;i<r;i+=4)a=g[t.charCodeAt(i)],s=g[t.charCodeAt(i+1)],l=g[t.charCodeAt(i+2)],d=g[t.charCodeAt(i+3)],m[o++]=a<<2|s>>4,m[o++]=(s&15)<<4|l>>2,m[o++]=(l&3)<<6|d&63;return p};pr.fromArrayBuffer=(t,e)=>{let r=new Uint8Array(t),n,i="",o=r.length,a=e?Uf:Ed;for(n=0;n<o;n+=3)i+=a[r[n]>>2],i+=a[(r[n]&3)<<4|r[n+1]>>4],i+=a[(r[n+1]&15)<<2|r[n+2]>>6],i+=a[r[n+2]&63];let s=o%3;return s===2?i=i.substring(0,i.length-1)+(e?"":"="):s===1&&(i=i.substring(0,i.length-2)+(e?"":"==")),i};pr.toString=(t,e)=>new TextDecoder().decode(pr.toArrayBuffer(t,e));pr.fromString=(t,e)=>pr.fromArrayBuffer(new TextEncoder().encode(t),e);pr.validate=(t,e)=>{if(!(typeof t=="string"||t instanceof String))return!1;try{return e?l0.test(t):d0.test(t)}catch{return!1}};pr.base64=pr;var jr=pr;function u0(t,e="base64url"){let r=jr.toArrayBuffer(t,e==="base64url");return new Uint8Array(r)}function p0(t,e="base64url"){let r=new Uint8Array(t);return jr.fromArrayBuffer(r.buffer,e==="base64url")}function f0(t){let e=jr.toArrayBuffer(t,!0);return jr.fromArrayBuffer(e)}function m0(t){return jr.fromString(t,!0)}function h0(t){return jr.toString(t,!0)}function g0(t){return jr.validate(t,!1)}function b0(t){return t=Gf(t),jr.validate(t,!0)}function Gf(t){return t.replace(/=/g,"")}var ct={};Pt(ct,{decodeFirst:()=>L0,encode:()=>j0});function xo(t,e,r){if(e<24)return[e,1];let n=t.byteLength-r-1,i=new DataView(t.buffer,r+1),o,a=0;switch(e){case 24:{n>0&&(o=i.getUint8(0),a=2);break}case 25:{n>1&&(o=i.getUint16(0,!1),a=3);break}case 26:{n>3&&(o=i.getUint32(0,!1),a=5);break}case 27:{if(n>7){let s=i.getBigUint64(0,!1);if(s>=24n&&s<=Number.MAX_SAFE_INTEGER)return[Number(s),9]}break}}if(o&&o>=24)return[o,a];throw new Error("Length not supported or not well formed")}var Ac=0,Ca=1,kd=2,Sd=3,Cd=4,Td=5,Id=6,Vf=7;function fr(t,e){let r=t<<5;if(e<0)throw new Error("CBOR Data Item argument must not be negative");let n;if(typeof e=="number"){if(!Number.isInteger(e))throw new Error("CBOR Data Item argument must be an integer");n=BigInt(e)}else n=e;if(t==Ca){if(n==0n)throw new Error("CBOR Data Item argument cannot be zero when negative");n=n-1n}if(n>18446744073709551615n)throw new Error("CBOR number out of range");let i=new Uint8Array(8);return new DataView(i.buffer).setBigUint64(0,n,!1),n<=23?[r|i[7]]:n<=255?[r|24,i[7]]:n<=65535?[r|25,...i.slice(6)]:n<=4294967295?[r|26,...i.slice(4)]:[r|27,...i]}var Ta=class{constructor(e,r){Object.defineProperty(this,"tagId",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"tagValue",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.tagId=e,this.tagValue=r}get tag(){return this.tagId}get value(){return this.tagValue}};function Wf(t,e,r){return xo(t,e,r)}function y0(t,e,r){let[n,i]=Wf(t,e,r);return[-n-1,i]}function Kf(t,e,r){let[n,i]=xo(t,e,r),o=r+i;return[new Uint8Array(t.buffer.slice(o,o+n)),i+n]}var v0=new TextDecoder;function w0(t,e,r){let[n,i]=Kf(t,e,r);return[v0.decode(n),i]}function x0(t,e,r){if(e===0)return[[],1];let[n,i]=xo(t,e,r),o=i,a=[];for(let s=0;s<n;s++){if(t.byteLength-r-o<=0)throw new Error("array is not supported or well formed");let[d,p]=li(t,r+o);a.push(d),o+=p}return[a,o]}var Ec="Map is not supported or well formed";function A0(t,e,r){if(e===0)return[new Map,1];let[n,i]=xo(t,e,r),o=i,a=new Map;for(let s=0;s<n;s++){let l=t.byteLength-r-o;if(l<=0)throw new Error(Ec);let[d,p]=li(t,r+o);if(o+=p,l-=p,l<=0)throw new Error(Ec);if(typeof d!="string"&&typeof d!="number")throw new Error(Ec);if(a.has(d))throw new Error(Ec);let[m,g]=li(t,r+o);o+=g,a.set(d,m)}return[a,o]}function E0(t,e){if(e+3>t.byteLength)throw new Error("CBOR stream ended before end of Float 16");let r=t.getUint16(e+1,!1);if(r==31744)return[1/0,3];if(r==32256)return[NaN,3];if(r==64512)return[-1/0,3];throw new Error("Float16 data is unsupported")}function k0(t,e){if(e+5>t.byteLength)throw new Error("CBOR stream ended before end of Float 32");return[t.getFloat32(e+1,!1),5]}function S0(t,e){if(e+9>t.byteLength)throw new Error("CBOR stream ended before end of Float 64");return[t.getFloat64(e+1,!1),9]}function C0(t,e,r){let[n,i]=xo(t,e,r),[o,a]=li(t,r+i);return[new Ta(n,o),i+a]}function li(t,e){if(e>=t.byteLength)throw new Error("CBOR stream ended before tag value");let r=t.getUint8(e),n=r>>5,i=r&31;switch(n){case Ac:return Wf(t,i,e);case Ca:return y0(t,i,e);case kd:return Kf(t,i,e);case Sd:return w0(t,i,e);case Cd:return x0(t,i,e);case Td:return A0(t,i,e);case Id:return C0(t,i,e);case Vf:switch(i){case 20:return[!1,1];case 21:return[!0,1];case 22:return[null,1];case 23:return[void 0,1];case 25:return E0(t,e);case 26:return k0(t,e);case 27:return S0(t,e)}}throw new Error(`Unsupported or not well formed at ${e}`)}function T0(t){return t===!0?245:t===!1?244:t===null?246:247}function I0(t){if(Math.fround(t)==t||!Number.isFinite(t)||Number.isNaN(t)){let e=new Uint8Array(5);return e[0]=250,new DataView(e.buffer).setFloat32(1,t,!1),e}else{let e=new Uint8Array(9);return e[0]=251,new DataView(e.buffer).setFloat64(1,t,!1),e}}function _0(t){return typeof t=="number"?Number.isSafeInteger(t)?t<0?fr(Ca,Math.abs(t)):fr(Ac,t):[I0(t)]:t<0n?fr(Ca,t*-1n):fr(Ac,t)}var R0=new TextEncoder;function B0(t,e){e.push(...fr(Sd,t.length)),e.push(R0.encode(t))}function M0(t,e){e.push(...fr(kd,t.length)),e.push(t)}function P0(t,e){e.push(...fr(Cd,t.length));for(let r of t)Ia(r,e)}function O0(t,e){e.push(new Uint8Array(fr(Td,t.size)));for(let[r,n]of t.entries())Ia(r,e),Ia(n,e)}function N0(t,e){e.push(...fr(Id,t.tag)),Ia(t.value,e)}function Ia(t,e){if(typeof t=="boolean"||t===null||t==null){e.push(T0(t));return}if(typeof t=="number"||typeof t=="bigint"){e.push(..._0(t));return}if(typeof t=="string"){B0(t,e);return}if(t instanceof Uint8Array){M0(t,e);return}if(Array.isArray(t)){P0(t,e);return}if(t instanceof Map){O0(t,e);return}if(t instanceof Ta){N0(t,e);return}throw new Error("Not implemented")}function _d(t,e){if(t.byteLength===0||t.byteLength<=e||e<0)throw new Error("No data");return t instanceof Uint8Array?li(new DataView(t.buffer),e):t instanceof ArrayBuffer?li(new DataView(t),e):li(t,e)}function Rd(t){let e=[];Ia(t,e);let r=0;for(let o of e)typeof o=="number"?r+=1:r+=o.length;let n=new Uint8Array(r),i=0;for(let o of e)typeof o=="number"?(n[i]=o,i+=1):(n.set(o,i),i+=o.length);return n}function L0(t){let e=new Uint8Array(t),r=_d(e,0),[n]=r;return n}function j0(t){return Rd(t)}var hr={};Pt(hr,{digest:()=>Xf,getRandomValues:()=>Jf,verify:()=>ey});function Ff(t){let e=t.get(ie.kty);return kc(e)&&e===lt.OKP}function yn(t){let e=t.get(ie.kty);return kc(e)&&e===lt.EC2}function Ao(t){let e=t.get(ie.kty);return kc(e)&&e===lt.RSA}function zf(t){let e=t.get(ie.kty);return kc(e)&&e===lt.AKP}var ie;(function(t){t[t.kty=1]="kty",t[t.alg=3]="alg",t[t.crv=-1]="crv",t[t.x=-2]="x",t[t.y=-3]="y",t[t.n=-1]="n",t[t.e=-2]="e",t[t.pub=-1]="pub"})(ie||(ie={}));var lt;(function(t){t[t.OKP=1]="OKP",t[t.EC2=2]="EC2",t[t.RSA=3]="RSA",t[t.AKP=7]="AKP"})(lt||(lt={}));function kc(t){return Object.values(lt).indexOf(t)>=0}var nt;(function(t){t[t.P256=1]="P256",t[t.P384=2]="P384",t[t.P521=3]="P521",t[t.ED25519=6]="ED25519",t[t.SECP256K1=8]="SECP256K1"})(nt||(nt={}));function qf(t){return Object.values(nt).indexOf(t)>=0}var J;(function(t){t[t.ES256=-7]="ES256",t[t.EdDSA=-8]="EdDSA",t[t.ES384=-35]="ES384",t[t.ES512=-36]="ES512",t[t.PS256=-37]="PS256",t[t.PS384=-38]="PS384",t[t.PS512=-39]="PS512",t[t.ES256K=-47]="ES256K",t[t.ML_DSA_44=-48]="ML_DSA_44",t[t.ML_DSA_65=-49]="ML_DSA_65",t[t.ML_DSA_87=-50]="ML_DSA_87",t[t.RS256=-257]="RS256",t[t.RS384=-258]="RS384",t[t.RS512=-259]="RS512",t[t.RS1=-65535]="RS1"})(J||(J={}));function Ot(t){return Object.values(J).indexOf(t)>=0}function Sc(t){return[J.ML_DSA_44,J.ML_DSA_65,J.ML_DSA_87].indexOf(t)>=0}function vn(t){if([J.RS1].indexOf(t)>=0)return"SHA-1";if([J.ES256,J.PS256,J.RS256].indexOf(t)>=0)return"SHA-256";if([J.ES384,J.PS384,J.RS384].indexOf(t)>=0)return"SHA-384";if([J.ES512,J.PS512,J.RS512,J.EdDSA].indexOf(t)>=0)return"SHA-512";throw new Error(`Could not map COSE alg value of ${t} to a WebCrypto hash alg name`)}var _a;function gt(){return new Promise((e,r)=>{if(_a)return e(_a);let n=U0.stubThisGlobalThisCrypto();return n?(_a=n,e(_a)):r(new Bd)})}var Bd=class extends Error{constructor(){super("An instance of the Crypto API could not be located"),this.name="MissingWebCrypto"}},U0={stubThisGlobalThisCrypto:()=>globalThis.crypto,setCachedCrypto:t=>{_a=t}};async function Xf(t,e){let r=await gt(),n=vn(e),i=await r.subtle.digest(n,t);return new Uint8Array(i)}async function Jf(t){return(await gt()).getRandomValues(t),t}function Cc(t){let e=ee.toHex(t);return[e.slice(0,8),e.slice(8,12),e.slice(12,16),e.slice(16,20),e.slice(20,32)].join("-")}function Eo(t){let e=ct.decodeFirst(t),r=Uint8Array.from([4]),n=e.get(ie.x),i=e.get(ie.y);if(!n)throw new Error("COSE public key was missing x");return i?ee.concat([r,n,i]):ee.concat([r,n])}function Yf(t){return $0.stubThis(ct.decodeFirst(t))}var $0={stubThis:t=>t};function Tc(t){let e=ce.toUTF8String(t),r=JSON.parse(e);return G0.stubThis(r)}var G0={stubThis:t=>t};function mr(t){return V0.stubThis(ct.decodeFirst(t))}var V0={stubThis:t=>t};async function Ic(){let t=new Uint8Array(32);return await hr.getRandomValues(t),W0.stubThis(t)}var W0={stubThis:t=>t};async function Qf(){let t=new Uint8Array(32);return await hr.getRandomValues(t),K0.stubThis(t)}var K0={stubThis:t=>t};var wr={};Pt(wr,{Any:()=>br,BaseBlock:()=>He,BaseStringBlock:()=>Pa,BitString:()=>Zt,BmpString:()=>hi,Boolean:()=>ui,CharacterString:()=>ki,Choice:()=>Co,Constructed:()=>Ue,DATE:()=>ja,DEFAULT_MAX_CONTENT_LENGTH:()=>dm,DEFAULT_MAX_DEPTH:()=>cm,DEFAULT_MAX_NODES:()=>lm,DateTime:()=>Ua,Duration:()=>$a,EndOfContent:()=>Oa,Enumerated:()=>pi,GeneralString:()=>Ei,GeneralizedTime:()=>Si,GraphicString:()=>Ai,HexBlock:()=>vr,IA5String:()=>xi,Integer:()=>Vr,Null:()=>Yt,NumericString:()=>bi,ObjectIdentifier:()=>fi,OctetString:()=>Qt,Primitive:()=>Gr,PrintableString:()=>yi,RawData:()=>Dd,RelativeObjectIdentifier:()=>mi,Repeated:()=>Ci,Sequence:()=>it,Set:()=>dt,TIME:()=>Ga,TeletexString:()=>vi,TimeOfDay:()=>Ha,UTCTime:()=>An,UniversalString:()=>gi,Utf8String:()=>Dt,ValueBlock:()=>ze,VideotexString:()=>wi,ViewWriter:()=>So,VisibleString:()=>xn,compareSchema:()=>Ur,fromBER:()=>Kr,verifySchema:()=>yv});var fe=ho(Pd());function di(t,e){let r=0;if(t.length===1)return t[0];for(let n=t.length-1;n>=0;n--)r+=t[t.length-1-n]*Math.pow(2,e*n);return r}function wn(t,e,r=-1){let n=r,i=t,o=0,a=Math.pow(2,e);for(let s=1;s<8;s++){if(t<a){let l;if(n<0)l=new ArrayBuffer(s),o=s;else{if(n<s)return new ArrayBuffer(0);l=new ArrayBuffer(n),o=n}let d=new Uint8Array(l);for(let p=s-1;p>=0;p--){let m=Math.pow(2,p*e);d[o-p-1]=Math.floor(i/m),i-=d[o-p-1]*m}return l}a*=Math.pow(2,e)}return new ArrayBuffer(0)}function Bc(...t){let e=0,r=0;for(let o of t)e+=o.length;let n=new ArrayBuffer(e),i=new Uint8Array(n);for(let o of t)i.set(o,r),r+=o.length;return i}function Od(){let t=new Uint8Array(this.valueHex);if(this.valueHex.byteLength>=2){let s=t[0]===255&&t[1]&128,l=t[0]===0&&(t[1]&128)===0;(s||l)&&this.warnings.push("Needlessly long format")}let e=new ArrayBuffer(this.valueHex.byteLength),r=new Uint8Array(e);for(let s=0;s<this.valueHex.byteLength;s++)r[s]=0;r[0]=t[0]&128;let n=di(r,8),i=new ArrayBuffer(this.valueHex.byteLength),o=new Uint8Array(i);for(let s=0;s<this.valueHex.byteLength;s++)o[s]=t[s];return o[0]&=127,di(o,8)-n}function Zf(t){let e=t<0?t*-1:t,r=128;for(let n=1;n<8;n++){if(e<=r){if(t<0){let a=r-e,s=wn(a,8,n),l=new Uint8Array(s);return l[0]|=128,s}let i=wn(e,8,n),o=new Uint8Array(i);if(o[0]&128){let a=i.slice(0),s=new Uint8Array(a);i=new ArrayBuffer(i.byteLength+1),o=new Uint8Array(i);for(let l=0;l<a.byteLength;l++)o[l+1]=s[l];o[0]=0}return i}r*=Math.pow(2,8)}return new ArrayBuffer(0)}function em(t,e){if(t.byteLength!==e.byteLength)return!1;let r=new Uint8Array(t),n=new Uint8Array(e);for(let i=0;i<r.length;i++)if(r[i]!==n[i])return!1;return!0}function bt(t,e){let r=t.toString(10);if(e<r.length)return"";let n=e-r.length,i=Array.from({length:n});for(let a=0;a<n;a++)i[a]="0";return i.join("").concat(r)}var L1=Math.log(2);function Mc(){if(typeof BigInt>"u")throw new Error("BigInt is not defined. Your environment doesn't implement BigInt.")}function Ld(t){let e=0,r=0;for(let i=0;i<t.length;i++){let o=t[i];e+=o.byteLength}let n=new Uint8Array(e);for(let i=0;i<t.length;i++){let o=t[i];n.set(new Uint8Array(o),r),r+=o.byteLength}return n.buffer}function Wr(t,e,r,n){return e instanceof Uint8Array?e.byteLength?r<0?(t.error="Wrong parameter: inputOffset less than zero",!1):n<0?(t.error="Wrong parameter: inputLength less than zero",!1):e.byteLength-r-n<0?(t.error="End of input reached before message was fully decoded (inconsistent offset and length values)",!1):!0:(t.error="Wrong parameter: inputBuffer has zero length",!1):(t.error="Wrong parameter: inputBuffer must be 'Uint8Array'",!1)}var So=class{constructor(){this.items=[]}write(e){this.items.push(e)}final(){return Ld(this.items)}},Ra=[new Uint8Array([1])],tm="0123456789",Nd="name",rm="valueHexView",ev="isHexOnly",tv="idBlock",rv="tagClass",nv="tagNumber",iv="isConstructed",ov="fromBER",av="toBER",sv="local",yt="",yr=new ArrayBuffer(0),zc=new Uint8Array(0),Ma="EndOfContent",im="OCTET STRING",om="BIT STRING";function vr(t){var e;return e=class extends t{get valueHex(){return this.valueHexView.slice().buffer}set valueHex(n){this.valueHexView=new Uint8Array(n)}constructor(...n){var i;super(...n);let o=n[0]||{};this.isHexOnly=(i=o.isHexOnly)!==null&&i!==void 0?i:!1,this.valueHexView=o.valueHex?fe.BufferSourceConverter.toUint8Array(o.valueHex):zc}fromBER(n,i,o,a){let s=n instanceof ArrayBuffer?new Uint8Array(n):n;if(!Wr(this,s,i,o))return-1;let l=i+o;return this.valueHexView=s.subarray(i,l),this.valueHexView.length?(this.blockLength=o,l):(this.warnings.push("Zero buffer length"),i)}toBER(n=!1){return this.isHexOnly?n?new ArrayBuffer(this.valueHexView.byteLength):this.valueHexView.byteLength===this.valueHexView.buffer.byteLength?this.valueHexView.buffer:this.valueHexView.slice().buffer:(this.error="Flag 'isHexOnly' is not set, abort",yr)}toJSON(){return{...super.toJSON(),isHexOnly:this.isHexOnly,valueHex:fe.Convert.ToHex(this.valueHexView)}}},e.NAME="hexBlock",e}var $r=class{static blockName(){return this.NAME}get valueBeforeDecode(){return this.valueBeforeDecodeView.slice().buffer}set valueBeforeDecode(e){this.valueBeforeDecodeView=new Uint8Array(e)}constructor({blockLength:e=0,error:r=yt,warnings:n=[],valueBeforeDecode:i=zc}={}){this.blockLength=e,this.error=r,this.warnings=n,this.valueBeforeDecodeView=fe.BufferSourceConverter.toUint8Array(i)}toJSON(){return{blockName:this.constructor.NAME,blockLength:this.blockLength,error:this.error,warnings:this.warnings,valueBeforeDecode:fe.Convert.ToHex(this.valueBeforeDecodeView)}}};$r.NAME="baseBlock";var ze=class extends $r{fromBER(e,r,n,i){throw TypeError("User need to make a specific function in a class which extends 'ValueBlock'")}toBER(e,r){throw TypeError("User need to make a specific function in a class which extends 'ValueBlock'")}};ze.NAME="valueBlock";var Pc=class extends vr($r){constructor({idBlock:e={}}={}){var r,n,i,o;super(),e?(this.isHexOnly=(r=e.isHexOnly)!==null&&r!==void 0?r:!1,this.valueHexView=e.valueHex?fe.BufferSourceConverter.toUint8Array(e.valueHex):zc,this.tagClass=(n=e.tagClass)!==null&&n!==void 0?n:-1,this.tagNumber=(i=e.tagNumber)!==null&&i!==void 0?i:-1,this.isConstructed=(o=e.isConstructed)!==null&&o!==void 0?o:!1):(this.tagClass=-1,this.tagNumber=-1,this.isConstructed=!1)}toBER(e=!1){let r=0;switch(this.tagClass){case 1:r|=0;break;case 2:r|=64;break;case 3:r|=128;break;case 4:r|=192;break;default:return this.error="Unknown tag class",yr}if(this.isConstructed&&(r|=32),this.tagNumber<31&&!this.isHexOnly){let i=new Uint8Array(1);if(!e){let o=this.tagNumber;o&=31,r|=o,i[0]=r}return i.buffer}if(!this.isHexOnly){let i=wn(this.tagNumber,7),o=new Uint8Array(i),a=i.byteLength,s=new Uint8Array(a+1);if(s[0]=r|31,!e){for(let l=0;l<a-1;l++)s[l+1]=o[l]|128;s[a]=o[a-1]}return s.buffer}let n=new Uint8Array(this.valueHexView.byteLength+1);if(n[0]=r|31,!e){let i=this.valueHexView;for(let o=0;o<i.length-1;o++)n[o+1]=i[o]|128;n[this.valueHexView.byteLength]=i[i.length-1]}return n.buffer}fromBER(e,r,n){let i=fe.BufferSourceConverter.toUint8Array(e);if(!Wr(this,i,r,n))return-1;let o=i.subarray(r,r+n);if(o.length===0)return this.error="Zero buffer length",-1;switch(o[0]&192){case 0:this.tagClass=1;break;case 64:this.tagClass=2;break;case 128:this.tagClass=3;break;case 192:this.tagClass=4;break;default:return this.error="Unknown tag class",-1}this.isConstructed=(o[0]&32)===32,this.isHexOnly=!1;let s=o[0]&31;if(s!==31)this.tagNumber=s,this.blockLength=1;else{let l=0;for(;;){let p=l+1;if(p>=o.length)return this.error="End of input reached before message was fully decoded",-1;if(l++,(o[p]&128)===0)break}this.blockLength=l+1;let d=this.valueHexView=new Uint8Array(l);for(let p=0;p<l;p++)d[p]=o[p+1]&127;this.blockLength<=9?this.tagNumber=di(d,7):(this.isHexOnly=!0,this.warnings.push("Tag too long, represented as hex-coded"))}if(this.tagClass===1&&this.isConstructed)switch(this.tagNumber){case 1:case 2:case 5:case 6:case 9:case 13:case 14:case 23:case 24:case 31:case 32:case 33:case 34:return this.error="Constructed encoding used for primitive type",-1}return r+this.blockLength}toJSON(){return{...super.toJSON(),tagClass:this.tagClass,tagNumber:this.tagNumber,isConstructed:this.isConstructed}}};Pc.NAME="identificationBlock";var Oc=class extends $r{constructor({lenBlock:e={}}={}){var r,n,i;super(),this.isIndefiniteForm=(r=e.isIndefiniteForm)!==null&&r!==void 0?r:!1,this.longFormUsed=(n=e.longFormUsed)!==null&&n!==void 0?n:!1,this.length=(i=e.length)!==null&&i!==void 0?i:0}fromBER(e,r,n){let i=fe.BufferSourceConverter.toUint8Array(e);if(!Wr(this,i,r,n))return-1;let o=i.subarray(r,r+n);if(o.length===0)return this.error="Zero buffer length",-1;if(o[0]===255)return this.error="Length block 0xFF is reserved by standard",-1;if(this.isIndefiniteForm=o[0]===128,this.isIndefiniteForm)return this.blockLength=1,r+this.blockLength;if(this.longFormUsed=!!(o[0]&128),this.longFormUsed===!1)return this.length=o[0],this.blockLength=1,r+this.blockLength;let a=o[0]&127;if(a>8)return this.error="Too big integer",-1;if(a+1>o.length)return this.error="End of input reached before message was fully decoded",-1;let s=r+1,l=i.subarray(s,s+a);return l[a-1]===0&&this.warnings.push("Needlessly long encoded length"),this.length=di(l,8),this.longFormUsed&&this.length<=127&&this.warnings.push("Unnecessary usage of long length form"),this.blockLength=a+1,r+this.blockLength}toBER(e=!1){let r,n;if(this.length>127&&(this.longFormUsed=!0),this.isIndefiniteForm)return r=new ArrayBuffer(1),e===!1&&(n=new Uint8Array(r),n[0]=128),r;if(this.longFormUsed){let i=wn(this.length,8);if(i.byteLength>127)return this.error="Too big length",yr;if(r=new ArrayBuffer(i.byteLength+1),e)return r;let o=new Uint8Array(i);n=new Uint8Array(r),n[0]=i.byteLength|128;for(let a=0;a<i.byteLength;a++)n[a+1]=o[a];return r}return r=new ArrayBuffer(1),e===!1&&(n=new Uint8Array(r),n[0]=this.length),r}toJSON(){return{...super.toJSON(),isIndefiniteForm:this.isIndefiniteForm,longFormUsed:this.longFormUsed,length:this.length}}};Oc.NAME="lengthBlock";var Y={},He=class extends $r{constructor({name:e=yt,optional:r=!1,primitiveSchema:n,...i}={},o){super(i),this.name=e,this.optional=r,n&&(this.primitiveSchema=n),this.idBlock=new Pc(i),this.lenBlock=new Oc(i),this.valueBlock=o?new o(i):new ze(i)}fromBER(e,r,n,i){let o=this.valueBlock.fromBER(e,r,this.lenBlock.isIndefiniteForm?n:this.lenBlock.length,i);return o===-1?(this.error=this.valueBlock.error,o):(this.idBlock.error.length||(this.blockLength+=this.idBlock.blockLength),this.lenBlock.error.length||(this.blockLength+=this.lenBlock.blockLength),this.valueBlock.error.length||(this.blockLength+=this.valueBlock.blockLength),o)}toBER(e,r){let n=r||new So;r||am(this);let i=this.idBlock.toBER(e);if(n.write(i),this.lenBlock.isIndefiniteForm)n.write(new Uint8Array([128]).buffer),this.valueBlock.toBER(e,n),n.write(new ArrayBuffer(2));else{let o=this.valueBlock.toBER(e);this.lenBlock.length=o.byteLength;let a=this.lenBlock.toBER(e);n.write(a),n.write(o)}return r?yr:n.final()}toJSON(){let e={...super.toJSON(),idBlock:this.idBlock.toJSON(),lenBlock:this.lenBlock.toJSON(),valueBlock:this.valueBlock.toJSON(),name:this.name,optional:this.optional};return this.primitiveSchema&&(e.primitiveSchema=this.primitiveSchema.toJSON()),e}toString(e="ascii"){return e==="ascii"?this.onAsciiEncoding():fe.Convert.ToHex(this.toBER())}onAsciiEncoding(){let e=this.constructor.NAME,r=fe.Convert.ToHex(this.valueBlock.valueBeforeDecodeView);return`${e} : ${r}`}isEqual(e){if(this===e)return!0;if(!(e instanceof this.constructor))return!1;let r=this.toBER(),n=e.toBER();return em(r,n)}};He.NAME="BaseBlock";function am(t){var e;if(t instanceof Y.Constructed)for(let r of t.valueBlock.value)am(r)&&(t.lenBlock.isIndefiniteForm=!0);return!!(!((e=t.lenBlock)===null||e===void 0)&&e.isIndefiniteForm)}var Pa=class extends He{getValue(){return this.valueBlock.value}setValue(e){this.valueBlock.value=e}constructor({value:e=yt,...r}={},n){super(r,n),e&&this.fromString(e)}fromBER(e,r,n){let i=this.valueBlock.fromBER(e,r,this.lenBlock.isIndefiniteForm?n:this.lenBlock.length);return i===-1?(this.error=this.valueBlock.error,i):(this.fromBuffer(this.valueBlock.valueHexView),this.idBlock.error.length||(this.blockLength+=this.idBlock.blockLength),this.lenBlock.error.length||(this.blockLength+=this.lenBlock.blockLength),this.valueBlock.error.length||(this.blockLength+=this.valueBlock.blockLength),i)}onAsciiEncoding(){return`${this.constructor.NAME} : '${this.valueBlock.value}'`}};Pa.NAME="BaseStringBlock";var Nc=class extends vr(ze){constructor({isHexOnly:e=!0,...r}={}){super(r),this.isHexOnly=e}};Nc.NAME="PrimitiveValueBlock";var sm,Gr=class extends He{constructor(e={}){super(e,Nc),this.idBlock.isConstructed=!1}};sm=Gr;Y.Primitive=sm;Gr.NAME="PRIMITIVE";var cm=100,lm=1e4,dm=16*1024*1024,cv="Maximum ASN.1 nesting depth exceeded",lv="Maximum ASN.1 node count exceeded",dv="Maximum ASN.1 content length exceeded";function Va(t={}){var e,r,n;return{depth:0,maxDepth:(e=t.maxDepth)!==null&&e!==void 0?e:cm,nodesCount:0,maxNodes:(r=t.maxNodes)!==null&&r!==void 0?r:lm,maxContentLength:(n=t.maxContentLength)!==null&&n!==void 0?n:dm}}function uv(t){let e=new He({},ze);return e.error=t,{offset:-1,result:e}}function pv(t){if(t.nodesCount+=1,t.nodesCount>t.maxNodes)return lv}function fv(t,e){if(t>e.maxContentLength)return dv}function jd(t,e,r,n){let i=n.depth+1;if(i>n.maxDepth)return uv(cv);n.depth=i;try{return qc(t,e,r,n)}finally{n.depth-=1}}function mv(t,e){if(t instanceof e)return t;let r=new e;return r.idBlock=t.idBlock,r.lenBlock=t.lenBlock,r.warnings=t.warnings,r.valueBeforeDecodeView=t.valueBeforeDecodeView,r}function qc(t,e=0,r=t.length,n=Va()){let i=e,o=new He({},ze),a=new $r;if(!Wr(a,t,e,r))return o.error=a.error,{offset:-1,result:o};if(!t.subarray(e,e+r).length)return o.error="Zero buffer length",{offset:-1,result:o};let l=pv(n);if(l)return o.error=l,{offset:-1,result:o};let d=o.idBlock.fromBER(t,e,r);if(o.idBlock.warnings.length&&o.warnings.concat(o.idBlock.warnings),d===-1)return o.error=o.idBlock.error,{offset:-1,result:o};if(e=d,r-=o.idBlock.blockLength,d=o.lenBlock.fromBER(t,e,r),o.lenBlock.warnings.length&&o.warnings.concat(o.lenBlock.warnings),d===-1)return o.error=o.lenBlock.error,{offset:-1,result:o};e=d,r-=o.lenBlock.blockLength;let p=o.lenBlock.isIndefiniteForm?r:o.lenBlock.length,m=fv(p,n);if(m)return o.error=m,{offset:-1,result:o};if(!o.idBlock.isConstructed&&o.lenBlock.isIndefiniteForm)return o.error="Indefinite length form used for primitive encoding form",{offset:-1,result:o};let g=He;switch(o.idBlock.tagClass){case 1:if(o.idBlock.tagNumber>=37&&o.idBlock.isHexOnly===!1)return o.error="UNIVERSAL 37 and upper tags are reserved by ASN.1 standard",{offset:-1,result:o};switch(o.idBlock.tagNumber){case 0:if(o.idBlock.isConstructed&&o.lenBlock.length>0)return o.error="Type [UNIVERSAL 0] is reserved",{offset:-1,result:o};g=Y.EndOfContent;break;case 1:g=Y.Boolean;break;case 2:g=Y.Integer;break;case 3:g=Y.BitString;break;case 4:g=Y.OctetString;break;case 5:g=Y.Null;break;case 6:g=Y.ObjectIdentifier;break;case 10:g=Y.Enumerated;break;case 12:g=Y.Utf8String;break;case 13:g=Y.RelativeObjectIdentifier;break;case 14:g=Y.TIME;break;case 15:return o.error="[UNIVERSAL 15] is reserved by ASN.1 standard",{offset:-1,result:o};case 16:g=Y.Sequence;break;case 17:g=Y.Set;break;case 18:g=Y.NumericString;break;case 19:g=Y.PrintableString;break;case 20:g=Y.TeletexString;break;case 21:g=Y.VideotexString;break;case 22:g=Y.IA5String;break;case 23:g=Y.UTCTime;break;case 24:g=Y.GeneralizedTime;break;case 25:g=Y.GraphicString;break;case 26:g=Y.VisibleString;break;case 27:g=Y.GeneralString;break;case 28:g=Y.UniversalString;break;case 29:g=Y.CharacterString;break;case 30:g=Y.BmpString;break;case 31:g=Y.DATE;break;case 32:g=Y.TimeOfDay;break;case 33:g=Y.DateTime;break;case 34:g=Y.Duration;break;default:{let C=o.idBlock.isConstructed?new Y.Constructed:new Y.Primitive;C.idBlock=o.idBlock,C.lenBlock=o.lenBlock,C.warnings=o.warnings,o=C}}break;default:g=o.idBlock.isConstructed?Y.Constructed:Y.Primitive}return o=mv(o,g),d=o.fromBER(t,e,p,n),o.valueBeforeDecodeView=t.subarray(i,i+o.blockLength),{offset:d,result:o}}function Kr(t,e={}){if(!t.byteLength){let r=new He({},ze);return r.error="Input buffer has zero length",{offset:-1,result:r}}return qc(fe.BufferSourceConverter.toUint8Array(t).slice(),0,t.byteLength,Va(e))}function hv(t,e){return t?1:e}var gr=class extends ze{constructor({value:e=[],isIndefiniteForm:r=!1,...n}={}){super(n),this.value=e,this.isIndefiniteForm=r}fromBER(e,r,n,i){let o=fe.BufferSourceConverter.toUint8Array(e),a=i??Va();if(!Wr(this,o,r,n))return-1;if(this.valueBeforeDecodeView=o.subarray(r,r+n),this.valueBeforeDecodeView.length===0)return this.warnings.push("Zero buffer length"),r;let s=r;for(;hv(this.isIndefiniteForm,n)>0;){let l=jd(o,s,n,a);if(l.offset===-1)return this.error=l.result.error,this.warnings.concat(l.result.warnings),-1;if(s=l.offset,this.blockLength+=l.result.blockLength,n-=l.result.blockLength,this.value.push(l.result),this.isIndefiniteForm&&l.result.constructor.NAME===Ma)break}return this.isIndefiniteForm&&(this.value[this.value.length-1].constructor.NAME===Ma?this.value.pop():this.warnings.push("No EndOfContent block encoded")),s}toBER(e,r){let n=r||new So;for(let i=0;i<this.value.length;i++)this.value[i].toBER(e,n);return r?yr:n.final()}toJSON(){let e={...super.toJSON(),isIndefiniteForm:this.isIndefiniteForm,value:[]};for(let r of this.value)e.value.push(r.toJSON());return e}};gr.NAME="ConstructedValueBlock";var um,Ue=class extends He{constructor(e={}){super(e,gr),this.idBlock.isConstructed=!0}fromBER(e,r,n,i){this.valueBlock.isIndefiniteForm=this.lenBlock.isIndefiniteForm;let o=this.valueBlock.fromBER(e,r,this.lenBlock.isIndefiniteForm?n:this.lenBlock.length,i);return o===-1?(this.error=this.valueBlock.error,o):(this.idBlock.error.length||(this.blockLength+=this.idBlock.blockLength),this.lenBlock.error.length||(this.blockLength+=this.lenBlock.blockLength),this.valueBlock.error.length||(this.blockLength+=this.valueBlock.blockLength),o)}onAsciiEncoding(){let e=[];for(let n of this.valueBlock.value)e.push(n.toString("ascii").split(`
`).map(i=>`  ${i}`).join(`
`));let r=this.idBlock.tagClass===3?`[${this.idBlock.tagNumber}]`:this.constructor.NAME;return e.length?`${r} :
${e.join(`
`)}`:`${r} :`}};um=Ue;Y.Constructed=um;Ue.NAME="CONSTRUCTED";var Dc=class extends ze{fromBER(e,r,n){return r}toBER(e){return yr}};Dc.override="EndOfContentValueBlock";var pm,Oa=class extends He{constructor(e={}){super(e,Dc),this.idBlock.tagClass=1,this.idBlock.tagNumber=0}};pm=Oa;Y.EndOfContent=pm;Oa.NAME=Ma;var fm,Yt=class extends He{constructor(e={}){super(e,ze),this.idBlock.tagClass=1,this.idBlock.tagNumber=5}fromBER(e,r,n){return this.lenBlock.length>0&&this.warnings.push("Non-zero length of value block for Null type"),this.idBlock.error.length||(this.blockLength+=this.idBlock.blockLength),this.lenBlock.error.length||(this.blockLength+=this.lenBlock.blockLength),this.blockLength+=n,r+n>e.byteLength?(this.error="End of input reached before message was fully decoded (inconsistent offset and length values)",-1):r+n}toBER(e,r){let n=new ArrayBuffer(2);if(!e){let i=new Uint8Array(n);i[0]=5,i[1]=0}return r&&r.write(n),n}onAsciiEncoding(){return`${this.constructor.NAME}`}};fm=Yt;Y.Null=fm;Yt.NAME="NULL";var Lc=class extends vr(ze){get value(){for(let e of this.valueHexView)if(e>0)return!0;return!1}set value(e){this.valueHexView[0]=e?255:0}constructor({value:e,...r}={}){super(r),r.valueHex?this.valueHexView=fe.BufferSourceConverter.toUint8Array(r.valueHex):this.valueHexView=new Uint8Array(1),e&&(this.value=e)}fromBER(e,r,n){let i=fe.BufferSourceConverter.toUint8Array(e);return Wr(this,i,r,n)?(this.valueHexView=i.subarray(r,r+n),n>1&&this.warnings.push("Boolean value encoded in more then 1 octet"),this.isHexOnly=!0,Od.call(this),this.blockLength=n,r+n):-1}toBER(){return this.valueHexView.slice()}toJSON(){return{...super.toJSON(),value:this.value}}};Lc.NAME="BooleanValueBlock";var mm,ui=class extends He{getValue(){return this.valueBlock.value}setValue(e){this.valueBlock.value=e}constructor(e={}){super(e,Lc),this.idBlock.tagClass=1,this.idBlock.tagNumber=1}onAsciiEncoding(){return`${this.constructor.NAME} : ${this.getValue}`}};mm=ui;Y.Boolean=mm;ui.NAME="BOOLEAN";var jc=class extends vr(gr){constructor({isConstructed:e=!1,...r}={}){super(r),this.isConstructed=e}fromBER(e,r,n,i){let o=0;if(this.isConstructed){if(this.isHexOnly=!1,o=gr.prototype.fromBER.call(this,e,r,n,i),o===-1)return o;for(let a=0;a<this.value.length;a++){let s=this.value[a].constructor.NAME;if(s===Ma){if(this.isIndefiniteForm)break;return this.error="EndOfContent is unexpected, OCTET STRING may consists of OCTET STRINGs only",-1}if(s!==im)return this.error="OCTET STRING may consists of OCTET STRINGs only",-1}}else this.isHexOnly=!0,o=super.fromBER(e,r,n),this.blockLength=n;return o}toBER(e,r){return this.isConstructed?gr.prototype.toBER.call(this,e,r):e?new ArrayBuffer(this.valueHexView.byteLength):this.valueHexView.slice().buffer}toJSON(){return{...super.toJSON(),isConstructed:this.isConstructed}}};jc.NAME="OctetStringValueBlock";var Hd,Qt=class extends He{constructor({idBlock:e={},lenBlock:r={},...n}={}){var i,o;(i=n.isConstructed)!==null&&i!==void 0||(n.isConstructed=!!(!((o=n.value)===null||o===void 0)&&o.length)),super({idBlock:{isConstructed:n.isConstructed,...e},lenBlock:{...r,isIndefiniteForm:!!n.isIndefiniteForm},...n},jc),this.idBlock.tagClass=1,this.idBlock.tagNumber=4}fromBER(e,r,n,i){if(this.valueBlock.isConstructed=this.idBlock.isConstructed,this.valueBlock.isIndefiniteForm=this.lenBlock.isIndefiniteForm,n===0)return this.idBlock.error.length===0&&(this.blockLength+=this.idBlock.blockLength),this.lenBlock.error.length===0&&(this.blockLength+=this.lenBlock.blockLength),r;if(!this.valueBlock.isConstructed){let a=(e instanceof ArrayBuffer?new Uint8Array(e):e).subarray(r,r+n);try{if(a.byteLength){let s=i??Va(),l=jd(a,0,a.byteLength,s);l.offset!==-1&&l.offset===n&&(this.valueBlock.value=[l.result])}}catch{}}return super.fromBER(e,r,n,i)}onAsciiEncoding(){if(this.valueBlock.isConstructed||this.valueBlock.value&&this.valueBlock.value.length)return Ue.prototype.onAsciiEncoding.call(this);let e=this.constructor.NAME,r=fe.Convert.ToHex(this.valueBlock.valueHexView);return`${e} : ${r}`}getValue(){if(!this.idBlock.isConstructed)return this.valueBlock.valueHexView.slice().buffer;let e=[];for(let r of this.valueBlock.value)r instanceof Hd&&e.push(r.valueBlock.valueHexView);return fe.BufferSourceConverter.concat(e)}};Hd=Qt;Y.OctetString=Hd;Qt.NAME=im;var Hc=class extends vr(gr){constructor({unusedBits:e=0,isConstructed:r=!1,...n}={}){super(n),this.unusedBits=e,this.isConstructed=r,this.blockLength=this.valueHexView.byteLength}fromBER(e,r,n,i){if(!n)return r;let o=-1;if(this.isConstructed){if(o=gr.prototype.fromBER.call(this,e,r,n,i),o===-1)return o;for(let l of this.value){let d=l.constructor.NAME;if(d===Ma){if(this.isIndefiniteForm)break;return this.error="EndOfContent is unexpected, BIT STRING may consists of BIT STRINGs only",-1}if(d!==om)return this.error="BIT STRING may consists of BIT STRINGs only",-1;let p=l.valueBlock;if(this.unusedBits>0&&p.unusedBits>0)return this.error='Using of "unused bits" inside constructive BIT STRING allowed for least one only',-1;this.unusedBits=p.unusedBits}return o}let a=fe.BufferSourceConverter.toUint8Array(e);if(!Wr(this,a,r,n))return-1;let s=a.subarray(r,r+n);if(this.unusedBits=s[0],this.unusedBits>7)return this.error="Unused bits for BitString must be in range 0-7",-1;if(!this.unusedBits){let l=s.subarray(1);try{if(l.byteLength){let d=i??Va(),p=jd(l,0,l.byteLength,d);p.offset!==-1&&p.offset===n-1&&(this.value=[p.result])}}catch{}}return this.valueHexView=s.subarray(1),this.blockLength=s.length,r+n}toBER(e,r){if(this.isConstructed)return gr.prototype.toBER.call(this,e,r);if(e)return new ArrayBuffer(this.valueHexView.byteLength+1);if(!this.valueHexView.byteLength){let i=new Uint8Array(1);return i[0]=0,i.buffer}let n=new Uint8Array(this.valueHexView.length+1);return n[0]=this.unusedBits,n.set(this.valueHexView,1),n.buffer}toJSON(){return{...super.toJSON(),unusedBits:this.unusedBits,isConstructed:this.isConstructed}}};Hc.NAME="BitStringValueBlock";var hm,Zt=class extends He{constructor({idBlock:e={},lenBlock:r={},...n}={}){var i,o;(i=n.isConstructed)!==null&&i!==void 0||(n.isConstructed=!!(!((o=n.value)===null||o===void 0)&&o.length)),super({idBlock:{isConstructed:n.isConstructed,...e},lenBlock:{...r,isIndefiniteForm:!!n.isIndefiniteForm},...n},Hc),this.idBlock.tagClass=1,this.idBlock.tagNumber=3}fromBER(e,r,n,i){return this.valueBlock.isConstructed=this.idBlock.isConstructed,this.valueBlock.isIndefiniteForm=this.lenBlock.isIndefiniteForm,super.fromBER(e,r,n,i)}onAsciiEncoding(){if(this.valueBlock.isConstructed||this.valueBlock.value&&this.valueBlock.value.length)return Ue.prototype.onAsciiEncoding.call(this);{let e=[],r=this.valueBlock.valueHexView;for(let a of r)e.push(a.toString(2).padStart(8,"0"));let n=e.join(""),i=this.constructor.NAME,o=n.substring(0,n.length-this.valueBlock.unusedBits);return`${i} : ${o}`}}};hm=Zt;Y.BitString=hm;Zt.NAME=om;var gm;function gv(t,e){let r=new Uint8Array([0]),n=new Uint8Array(t),i=new Uint8Array(e),o=n.slice(0),a=o.length-1,s=i.slice(0),l=s.length-1,d=0,p=l<a?a:l,m=0;for(let g=p;g>=0;g--,m++)!0===m<s.length?d=o[a-m]+s[l-m]+r[0]:d=o[a-m]+r[0],r[0]=d/10,!0===m>=o.length?o=Bc(new Uint8Array([d%10]),o):o[a-m]=d%10;return r[0]>0&&(o=Bc(r,o)),o}function nm(t){if(t>=Ra.length)for(let e=Ra.length;e<=t;e++){let r=new Uint8Array([0]),n=Ra[e-1].slice(0);for(let i=n.length-1;i>=0;i--){let o=new Uint8Array([(n[i]<<1)+r[0]]);r[0]=o[0]/10,n[i]=o[0]%10}r[0]>0&&(n=Bc(r,n)),Ra.push(n)}return Ra[t]}function bv(t,e){let r=0,n=new Uint8Array(t),i=new Uint8Array(e),o=n.slice(0),a=o.length-1,s=i.slice(0),l=s.length-1,d,p=0;for(let m=l;m>=0;m--,p++)d=o[a-p]-s[l-p]-r,!0===d<0?(r=1,o[a-p]=d+10):(r=0,o[a-p]=d);if(r>0)for(let m=a-l+1;m>=0;m--,p++)if(d=o[a-p]-r,d<0)r=1,o[a-p]=d+10;else{r=0,o[a-p]=d;break}return o.slice()}var Na=class extends vr(ze){setValueHex(){this.valueHexView.length>=4?(this.warnings.push("Too big Integer for decoding, hex only"),this.isHexOnly=!0,this._valueDec=0):(this.isHexOnly=!1,this.valueHexView.length>0&&(this._valueDec=Od.call(this)))}constructor({value:e,...r}={}){super(r),this._valueDec=0,r.valueHex&&this.setValueHex(),e!==void 0&&(this.valueDec=e)}set valueDec(e){this._valueDec=e,this.isHexOnly=!1,this.valueHexView=new Uint8Array(Zf(e))}get valueDec(){return this._valueDec}fromDER(e,r,n,i=0){let o=this.fromBER(e,r,n);if(o===-1)return o;let a=this.valueHexView;return a[0]===0&&(a[1]&128)!==0?this.valueHexView=a.subarray(1):i!==0&&a.length<i&&(i-a.length>1&&(i=a.length+1),this.valueHexView=a.subarray(i-a.length)),o}toDER(e=!1){let r=this.valueHexView;switch(!0){case(r[0]&128)!==0:{let n=new Uint8Array(this.valueHexView.length+1);n[0]=0,n.set(r,1),this.valueHexView=n}break;case(r[0]===0&&(r[1]&128)===0):this.valueHexView=this.valueHexView.subarray(1);break}return this.toBER(e)}fromBER(e,r,n){let i=super.fromBER(e,r,n);return i===-1||this.setValueHex(),i}toBER(e){return e?new ArrayBuffer(this.valueHexView.length):this.valueHexView.slice().buffer}toJSON(){return{...super.toJSON(),valueDec:this.valueDec}}toString(){let e=this.valueHexView.length*8-1,r=new Uint8Array(this.valueHexView.length*8/3),n=0,i,o=this.valueHexView,a="",s=!1;for(let l=o.byteLength-1;l>=0;l--){i=o[l];for(let d=0;d<8;d++)(i&1)===1&&(n===e?(r=bv(nm(n),r),a="-"):r=gv(r,nm(n))),n++,i>>=1}for(let l=0;l<r.length;l++)r[l]&&(s=!0),s&&(a+=tm.charAt(r[l]));return s===!1&&(a+=tm.charAt(0)),a}};gm=Na;Na.NAME="IntegerValueBlock";Object.defineProperty(gm.prototype,"valueHex",{set:function(t){this.valueHexView=new Uint8Array(t),this.setValueHex()},get:function(){return this.valueHexView.slice().buffer}});var Ba,Vr=class extends He{constructor(e={}){super(e,Na),this.idBlock.tagClass=1,this.idBlock.tagNumber=2}toBigInt(){return Mc(),BigInt(this.valueBlock.toString())}static fromBigInt(e){Mc();let r=BigInt(e),n=new So,i=r.toString(16).replace(/^-/,""),o=new Uint8Array(fe.Convert.FromHex(i));if(r<0){let s=new Uint8Array(o.length+(o[0]&128?1:0));s[0]|=128;let d=BigInt(`0x${fe.Convert.ToHex(s)}`)+r,p=fe.BufferSourceConverter.toUint8Array(fe.Convert.FromHex(d.toString(16)));p[0]|=128,n.write(p)}else o[0]&128&&n.write(new Uint8Array([0])),n.write(o);return new Ba({valueHex:n.final()})}convertToDER(){let e=new Ba({valueHex:this.valueBlock.valueHexView});return e.valueBlock.toDER(),e}convertFromDER(){return new Ba({valueHex:this.valueBlock.valueHexView[0]===0?this.valueBlock.valueHexView.subarray(1):this.valueBlock.valueHexView})}onAsciiEncoding(){return`${this.constructor.NAME} : ${this.valueBlock.toString()}`}};Ba=Vr;Y.Integer=Ba;Vr.NAME="INTEGER";var bm,pi=class extends Vr{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=10}};bm=pi;Y.Enumerated=bm;pi.NAME="ENUMERATED";var Da=class extends vr(ze){constructor({valueDec:e=-1,isFirstSid:r=!1,...n}={}){super(n),this.valueDec=e,this.isFirstSid=r}fromBER(e,r,n){if(!n)return r;let i=fe.BufferSourceConverter.toUint8Array(e);if(!Wr(this,i,r,n))return-1;let o=i.subarray(r,r+n);this.valueHexView=new Uint8Array(n);for(let s=0;s<n&&(this.valueHexView[s]=o[s]&127,this.blockLength++,(o[s]&128)!==0);s++);let a=new Uint8Array(this.blockLength);for(let s=0;s<this.blockLength;s++)a[s]=this.valueHexView[s];return this.valueHexView=a,(o[this.blockLength-1]&128)!==0?(this.error="End of input reached before message was fully decoded",-1):(this.valueHexView[0]===0&&this.warnings.push("Needlessly long format of SID encoding"),this.blockLength<=8?this.valueDec=di(this.valueHexView,7):(this.isHexOnly=!0,this.warnings.push("Too big SID for decoding, hex only")),r+this.blockLength)}set valueBigInt(e){Mc();let r=BigInt(e).toString(2);for(;r.length%7;)r="0"+r;let n=new Uint8Array(r.length/7);for(let i=0;i<n.length;i++)n[i]=parseInt(r.slice(i*7,i*7+7),2)+(i+1<n.length?128:0);this.fromBER(n.buffer,0,n.length)}toBER(e){if(this.isHexOnly){if(e)return new ArrayBuffer(this.valueHexView.byteLength);let i=this.valueHexView,o=new Uint8Array(this.blockLength);for(let a=0;a<this.blockLength-1;a++)o[a]=i[a]|128;return o[this.blockLength-1]=i[this.blockLength-1],o.buffer}let r=wn(this.valueDec,7);if(r.byteLength===0)return this.error="Error during encoding SID value",yr;let n=new Uint8Array(r.byteLength);if(!e){let i=new Uint8Array(r),o=r.byteLength-1;for(let a=0;a<o;a++)n[a]=i[a]|128;n[o]=i[o]}return n}toString(){let e="";if(this.isHexOnly)e=fe.Convert.ToHex(this.valueHexView);else if(this.isFirstSid){let r=this.valueDec;this.valueDec<=39?e="0.":this.valueDec<=79?(e="1.",r-=40):(e="2.",r-=80),e+=r.toString()}else e=this.valueDec.toString();return e}toJSON(){return{...super.toJSON(),valueDec:this.valueDec,isFirstSid:this.isFirstSid}}};Da.NAME="sidBlock";var Uc=class extends ze{constructor({value:e=yt,...r}={}){super(r),this.value=[],e&&this.fromString(e)}fromBER(e,r,n){let i=r;for(;n>0;){let o=new Da;if(i=o.fromBER(e,i,n),i===-1)return this.blockLength=0,this.error=o.error,i;this.value.length===0&&(o.isFirstSid=!0),this.blockLength+=o.blockLength,n-=o.blockLength,this.value.push(o)}return i}toBER(e){let r=[];for(let n=0;n<this.value.length;n++){let i=this.value[n].toBER(e);if(i.byteLength===0)return this.error=this.value[n].error,yr;r.push(i)}return Ld(r)}fromString(e){this.value=[];let r=0,n=0,i="",o=!1;do if(n=e.indexOf(".",r),n===-1?i=e.substring(r):i=e.substring(r,n),r=n+1,o){let a=this.value[0],s=0;switch(a.valueDec){case 0:break;case 1:s=40;break;case 2:s=80;break;default:this.value=[];return}let l=parseInt(i,10);if(isNaN(l))return;a.valueDec=l+s,o=!1}else{let a=new Da;if(i>Number.MAX_SAFE_INTEGER){Mc();let s=BigInt(i);a.valueBigInt=s}else if(a.valueDec=parseInt(i,10),isNaN(a.valueDec))return;this.value.length||(a.isFirstSid=!0,o=!0),this.value.push(a)}while(n!==-1)}toString(){let e="",r=!1;for(let n=0;n<this.value.length;n++){r=this.value[n].isHexOnly;let i=this.value[n].toString();n!==0&&(e=`${e}.`),r?(i=`{${i}}`,this.value[n].isFirstSid?e=`2.{${i} - 80}`:e+=i):e+=i}return e}toJSON(){let e={...super.toJSON(),value:this.toString(),sidArray:[]};for(let r=0;r<this.value.length;r++)e.sidArray.push(this.value[r].toJSON());return e}};Uc.NAME="ObjectIdentifierValueBlock";var ym,fi=class extends He{getValue(){return this.valueBlock.toString()}setValue(e){this.valueBlock.fromString(e)}constructor(e={}){super(e,Uc),this.idBlock.tagClass=1,this.idBlock.tagNumber=6}onAsciiEncoding(){return`${this.constructor.NAME} : ${this.valueBlock.toString()||"empty"}`}toJSON(){return{...super.toJSON(),value:this.getValue()}}};ym=fi;Y.ObjectIdentifier=ym;fi.NAME="OBJECT IDENTIFIER";var La=class extends vr($r){constructor({valueDec:e=0,...r}={}){super(r),this.valueDec=e}fromBER(e,r,n){if(n===0)return r;let i=fe.BufferSourceConverter.toUint8Array(e);if(!Wr(this,i,r,n))return-1;let o=i.subarray(r,r+n);this.valueHexView=new Uint8Array(n);for(let s=0;s<n&&(this.valueHexView[s]=o[s]&127,this.blockLength++,(o[s]&128)!==0);s++);let a=new Uint8Array(this.blockLength);for(let s=0;s<this.blockLength;s++)a[s]=this.valueHexView[s];return this.valueHexView=a,(o[this.blockLength-1]&128)!==0?(this.error="End of input reached before message was fully decoded",-1):(this.valueHexView[0]===0&&this.warnings.push("Needlessly long format of SID encoding"),this.blockLength<=8?this.valueDec=di(this.valueHexView,7):(this.isHexOnly=!0,this.warnings.push("Too big SID for decoding, hex only")),r+this.blockLength)}toBER(e){if(this.isHexOnly){if(e)return new ArrayBuffer(this.valueHexView.byteLength);let i=this.valueHexView,o=new Uint8Array(this.blockLength);for(let a=0;a<this.blockLength-1;a++)o[a]=i[a]|128;return o[this.blockLength-1]=i[this.blockLength-1],o.buffer}let r=wn(this.valueDec,7);if(r.byteLength===0)return this.error="Error during encoding SID value",yr;let n=new Uint8Array(r.byteLength);if(!e){let i=new Uint8Array(r),o=r.byteLength-1;for(let a=0;a<o;a++)n[a]=i[a]|128;n[o]=i[o]}return n.buffer}toString(){let e="";return this.isHexOnly?e=fe.Convert.ToHex(this.valueHexView):e=this.valueDec.toString(),e}toJSON(){return{...super.toJSON(),valueDec:this.valueDec}}};La.NAME="relativeSidBlock";var $c=class extends ze{constructor({value:e=yt,...r}={}){super(r),this.value=[],e&&this.fromString(e)}fromBER(e,r,n){let i=r;for(;n>0;){let o=new La;if(i=o.fromBER(e,i,n),i===-1)return this.blockLength=0,this.error=o.error,i;this.blockLength+=o.blockLength,n-=o.blockLength,this.value.push(o)}return i}toBER(e,r){let n=[];for(let i=0;i<this.value.length;i++){let o=this.value[i].toBER(e);if(o.byteLength===0)return this.error=this.value[i].error,yr;n.push(o)}return Ld(n)}fromString(e){this.value=[];let r=0,n=0,i="";do{n=e.indexOf(".",r),n===-1?i=e.substring(r):i=e.substring(r,n),r=n+1;let o=new La;if(o.valueDec=parseInt(i,10),isNaN(o.valueDec))return!0;this.value.push(o)}while(n!==-1);return!0}toString(){let e="",r=!1;for(let n=0;n<this.value.length;n++){r=this.value[n].isHexOnly;let i=this.value[n].toString();n!==0&&(e=`${e}.`),r&&(i=`{${i}}`),e+=i}return e}toJSON(){let e={...super.toJSON(),value:this.toString(),sidArray:[]};for(let r=0;r<this.value.length;r++)e.sidArray.push(this.value[r].toJSON());return e}};$c.NAME="RelativeObjectIdentifierValueBlock";var vm,mi=class extends He{getValue(){return this.valueBlock.toString()}setValue(e){this.valueBlock.fromString(e)}constructor(e={}){super(e,$c),this.idBlock.tagClass=1,this.idBlock.tagNumber=13}onAsciiEncoding(){return`${this.constructor.NAME} : ${this.valueBlock.toString()||"empty"}`}toJSON(){return{...super.toJSON(),value:this.getValue()}}};vm=mi;Y.RelativeObjectIdentifier=vm;mi.NAME="RelativeObjectIdentifier";var wm,it=class extends Ue{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=16}};wm=it;Y.Sequence=wm;it.NAME="SEQUENCE";var xm,dt=class extends Ue{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=17}};xm=dt;Y.Set=xm;dt.NAME="SET";var Gc=class extends vr(ze){constructor({...e}={}){super(e),this.isHexOnly=!0,this.value=yt}toJSON(){return{...super.toJSON(),value:this.value}}};Gc.NAME="StringValueBlock";var Vc=class extends Gc{};Vc.NAME="SimpleStringValueBlock";var ut=class extends Pa{constructor({...e}={}){super(e,Vc)}fromBuffer(e){this.valueBlock.value=String.fromCharCode.apply(null,fe.BufferSourceConverter.toUint8Array(e))}fromString(e){let r=e.length,n=this.valueBlock.valueHexView=new Uint8Array(r);for(let i=0;i<r;i++)n[i]=e.charCodeAt(i);this.valueBlock.value=e}};ut.NAME="SIMPLE STRING";var Wc=class extends ut{fromBuffer(e){this.valueBlock.valueHexView=fe.BufferSourceConverter.toUint8Array(e);try{this.valueBlock.value=fe.Convert.ToUtf8String(e)}catch(r){this.warnings.push(`Error during "decodeURIComponent": ${r}, using raw string`),this.valueBlock.value=fe.Convert.ToBinary(e)}}fromString(e){this.valueBlock.valueHexView=new Uint8Array(fe.Convert.FromUtf8String(e)),this.valueBlock.value=e}};Wc.NAME="Utf8StringValueBlock";var Am,Dt=class extends Wc{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=12}};Am=Dt;Y.Utf8String=Am;Dt.NAME="UTF8String";var Kc=class extends ut{fromBuffer(e){this.valueBlock.value=fe.Convert.ToUtf16String(e),this.valueBlock.valueHexView=fe.BufferSourceConverter.toUint8Array(e)}fromString(e){this.valueBlock.value=e,this.valueBlock.valueHexView=new Uint8Array(fe.Convert.FromUtf16String(e))}};Kc.NAME="BmpStringValueBlock";var Em,hi=class extends Kc{constructor({...e}={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=30}};Em=hi;Y.BmpString=Em;hi.NAME="BMPString";var Fc=class extends ut{fromBuffer(e){let r=ArrayBuffer.isView(e)?e.slice().buffer:e.slice(0),n=new Uint8Array(r);for(let i=0;i<n.length;i+=4)n[i]=n[i+3],n[i+1]=n[i+2],n[i+2]=0,n[i+3]=0;this.valueBlock.value=String.fromCharCode.apply(null,new Uint32Array(r))}fromString(e){let r=e.length,n=this.valueBlock.valueHexView=new Uint8Array(r*4);for(let i=0;i<r;i++){let o=wn(e.charCodeAt(i),8),a=new Uint8Array(o);if(a.length>4)continue;let s=4-a.length;for(let l=a.length-1;l>=0;l--)n[i*4+l+s]=a[l]}this.valueBlock.value=e}};Fc.NAME="UniversalStringValueBlock";var km,gi=class extends Fc{constructor({...e}={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=28}};km=gi;Y.UniversalString=km;gi.NAME="UniversalString";var Sm,bi=class extends ut{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=18}};Sm=bi;Y.NumericString=Sm;bi.NAME="NumericString";var Cm,yi=class extends ut{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=19}};Cm=yi;Y.PrintableString=Cm;yi.NAME="PrintableString";var Tm,vi=class extends ut{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=20}};Tm=vi;Y.TeletexString=Tm;vi.NAME="TeletexString";var Im,wi=class extends ut{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=21}};Im=wi;Y.VideotexString=Im;wi.NAME="VideotexString";var _m,xi=class extends ut{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=22}};_m=xi;Y.IA5String=_m;xi.NAME="IA5String";var Rm,Ai=class extends ut{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=25}};Rm=Ai;Y.GraphicString=Rm;Ai.NAME="GraphicString";var Bm,xn=class extends ut{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=26}};Bm=xn;Y.VisibleString=Bm;xn.NAME="VisibleString";var Mm,Ei=class extends ut{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=27}};Mm=Ei;Y.GeneralString=Mm;Ei.NAME="GeneralString";var Pm,ki=class extends ut{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=29}};Pm=ki;Y.CharacterString=Pm;ki.NAME="CharacterString";var Om,An=class extends xn{constructor({value:e,valueDate:r,...n}={}){if(super(n),this.year=0,this.month=0,this.day=0,this.hour=0,this.minute=0,this.second=0,e){this.fromString(e),this.valueBlock.valueHexView=new Uint8Array(e.length);for(let i=0;i<e.length;i++)this.valueBlock.valueHexView[i]=e.charCodeAt(i)}r&&(this.fromDate(r),this.valueBlock.valueHexView=new Uint8Array(this.toBuffer())),this.idBlock.tagClass=1,this.idBlock.tagNumber=23}fromBuffer(e){this.fromString(String.fromCharCode.apply(null,fe.BufferSourceConverter.toUint8Array(e)))}toBuffer(){let e=this.toString(),r=new ArrayBuffer(e.length),n=new Uint8Array(r);for(let i=0;i<e.length;i++)n[i]=e.charCodeAt(i);return r}fromDate(e){this.year=e.getUTCFullYear(),this.month=e.getUTCMonth()+1,this.day=e.getUTCDate(),this.hour=e.getUTCHours(),this.minute=e.getUTCMinutes(),this.second=e.getUTCSeconds()}toDate(){return new Date(Date.UTC(this.year,this.month-1,this.day,this.hour,this.minute,this.second))}fromString(e){let n=/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})Z/ig.exec(e);if(n===null){this.error="Wrong input string for conversion";return}let i=parseInt(n[1],10);i>=50?this.year=1900+i:this.year=2e3+i,this.month=parseInt(n[2],10),this.day=parseInt(n[3],10),this.hour=parseInt(n[4],10),this.minute=parseInt(n[5],10),this.second=parseInt(n[6],10)}toString(e="iso"){if(e==="iso"){let r=new Array(7);return r[0]=bt(this.year<2e3?this.year-1900:this.year-2e3,2),r[1]=bt(this.month,2),r[2]=bt(this.day,2),r[3]=bt(this.hour,2),r[4]=bt(this.minute,2),r[5]=bt(this.second,2),r[6]="Z",r.join("")}return super.toString(e)}onAsciiEncoding(){return`${this.constructor.NAME} : ${this.toDate().toISOString()}`}toJSON(){return{...super.toJSON(),year:this.year,month:this.month,day:this.day,hour:this.hour,minute:this.minute,second:this.second}}};Om=An;Y.UTCTime=Om;An.NAME="UTCTime";var Nm,Si=class extends An{constructor(e={}){var r;super(e),(r=this.millisecond)!==null&&r!==void 0||(this.millisecond=0),this.idBlock.tagClass=1,this.idBlock.tagNumber=24}fromDate(e){super.fromDate(e),this.millisecond=e.getUTCMilliseconds()}toDate(){let e=Date.UTC(this.year,this.month-1,this.day,this.hour,this.minute,this.second,this.millisecond);return new Date(e)}fromString(e){let r=!1,n="",i="",o=0,a,s=0,l=0;if(e[e.length-1]==="Z")n=e.substring(0,e.length-1),r=!0;else{let m=new Number(e[e.length-1]);if(isNaN(m.valueOf()))throw new Error("Wrong input string for conversion");n=e}if(r){if(n.indexOf("+")!==-1)throw new Error("Wrong input string for conversion");if(n.indexOf("-")!==-1)throw new Error("Wrong input string for conversion")}else{let m=1,g=n.indexOf("+"),C="";if(g===-1&&(g=n.indexOf("-"),m=-1),g!==-1){if(C=n.substring(g+1),n=n.substring(0,g),C.length!==2&&C.length!==4)throw new Error("Wrong input string for conversion");let I=parseInt(C.substring(0,2),10);if(isNaN(I.valueOf()))throw new Error("Wrong input string for conversion");if(s=m*I,C.length===4){if(I=parseInt(C.substring(2,4),10),isNaN(I.valueOf()))throw new Error("Wrong input string for conversion");l=m*I}}}let d=n.indexOf(".");if(d===-1&&(d=n.indexOf(",")),d!==-1){let m=new Number(`0${n.substring(d)}`);if(isNaN(m.valueOf()))throw new Error("Wrong input string for conversion");o=m.valueOf(),i=n.substring(0,d)}else i=n;switch(!0){case i.length===8:if(a=/(\d{4})(\d{2})(\d{2})/ig,d!==-1)throw new Error("Wrong input string for conversion");break;case i.length===10:if(a=/(\d{4})(\d{2})(\d{2})(\d{2})/ig,d!==-1){let m=60*o;this.minute=Math.floor(m),m=60*(m-this.minute),this.second=Math.floor(m),m=1e3*(m-this.second),this.millisecond=Math.floor(m)}break;case i.length===12:if(a=/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/ig,d!==-1){let m=60*o;this.second=Math.floor(m),m=1e3*(m-this.second),this.millisecond=Math.floor(m)}break;case i.length===14:if(a=/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/ig,d!==-1){let m=1e3*o;this.millisecond=Math.floor(m)}break;default:throw new Error("Wrong input string for conversion")}let p=a.exec(i);if(p===null)throw new Error("Wrong input string for conversion");for(let m=1;m<p.length;m++)switch(m){case 1:this.year=parseInt(p[m],10);break;case 2:this.month=parseInt(p[m],10);break;case 3:this.day=parseInt(p[m],10);break;case 4:this.hour=parseInt(p[m],10)+s;break;case 5:this.minute=parseInt(p[m],10)+l;break;case 6:this.second=parseInt(p[m],10);break;default:throw new Error("Wrong input string for conversion")}if(r===!1){let m=new Date(this.year,this.month,this.day,this.hour,this.minute,this.second,this.millisecond);this.year=m.getUTCFullYear(),this.month=m.getUTCMonth(),this.day=m.getUTCDay(),this.hour=m.getUTCHours(),this.minute=m.getUTCMinutes(),this.second=m.getUTCSeconds(),this.millisecond=m.getUTCMilliseconds()}}toString(e="iso"){if(e==="iso"){let r=[];return r.push(bt(this.year,4)),r.push(bt(this.month,2)),r.push(bt(this.day,2)),r.push(bt(this.hour,2)),r.push(bt(this.minute,2)),r.push(bt(this.second,2)),this.millisecond!==0&&(r.push("."),r.push(bt(this.millisecond,3))),r.push("Z"),r.join("")}return super.toString(e)}toJSON(){return{...super.toJSON(),millisecond:this.millisecond}}};Nm=Si;Y.GeneralizedTime=Nm;Si.NAME="GeneralizedTime";var Dm,ja=class extends Dt{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=31}};Dm=ja;Y.DATE=Dm;ja.NAME="DATE";var Lm,Ha=class extends Dt{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=32}};Lm=Ha;Y.TimeOfDay=Lm;Ha.NAME="TimeOfDay";var jm,Ua=class extends Dt{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=33}};jm=Ua;Y.DateTime=jm;Ua.NAME="DateTime";var Hm,$a=class extends Dt{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=34}};Hm=$a;Y.Duration=Hm;$a.NAME="Duration";var Um,Ga=class extends Dt{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=14}};Um=Ga;Y.TIME=Um;Ga.NAME="TIME";var br=class{constructor({name:e=yt,optional:r=!1}={}){this.name=e,this.optional=r}},Co=class extends br{constructor({value:e=[],...r}={}){super(r),this.value=e}},Ci=class extends br{constructor({value:e=new br,local:r=!1,...n}={}){super(n),this.value=e,this.local=r}},Dd=class{get data(){return this.dataView.slice().buffer}set data(e){this.dataView=fe.BufferSourceConverter.toUint8Array(e)}constructor({data:e=zc}={}){this.dataView=fe.BufferSourceConverter.toUint8Array(e)}fromBER(e,r,n){let i=r+n;return this.dataView=fe.BufferSourceConverter.toUint8Array(e).subarray(r,i),i}toBER(e){return this.dataView.slice().buffer}};function Ur(t,e,r){if(r instanceof Co){for(let o of r.value)if(Ur(t,e,o).verified)return{verified:!0,result:t};{let o={verified:!1,result:{error:"Wrong values for Choice type"}};return r.hasOwnProperty(Nd)&&(o.name=r.name),o}}if(r instanceof br)return r.hasOwnProperty(Nd)&&(t[r.name]=e),{verified:!0,result:t};if(!(t instanceof Object))return{verified:!1,result:{error:"Wrong root object"}};if(!(e instanceof Object))return{verified:!1,result:{error:"Wrong ASN.1 data"}};if(!(r instanceof Object))return{verified:!1,result:{error:"Wrong ASN.1 schema"}};if(!(tv in r))return{verified:!1,result:{error:"Wrong ASN.1 schema"}};if(!(ov in r.idBlock))return{verified:!1,result:{error:"Wrong ASN.1 schema"}};if(!(av in r.idBlock))return{verified:!1,result:{error:"Wrong ASN.1 schema"}};let n=r.idBlock.toBER(!1);if(n.byteLength===0)return{verified:!1,result:{error:"Error encoding idBlock for ASN.1 schema"}};if(r.idBlock.fromBER(n,0,n.byteLength)===-1)return{verified:!1,result:{error:"Error decoding idBlock for ASN.1 schema"}};if(r.idBlock.hasOwnProperty(rv)===!1)return{verified:!1,result:{error:"Wrong ASN.1 schema"}};if(r.idBlock.tagClass!==e.idBlock.tagClass)return{verified:!1,result:t};if(r.idBlock.hasOwnProperty(nv)===!1)return{verified:!1,result:{error:"Wrong ASN.1 schema"}};if(r.idBlock.tagNumber!==e.idBlock.tagNumber)return{verified:!1,result:t};if(r.idBlock.hasOwnProperty(iv)===!1)return{verified:!1,result:{error:"Wrong ASN.1 schema"}};if(r.idBlock.isConstructed!==e.idBlock.isConstructed)return{verified:!1,result:t};if(!(ev in r.idBlock))return{verified:!1,result:{error:"Wrong ASN.1 schema"}};if(r.idBlock.isHexOnly!==e.idBlock.isHexOnly)return{verified:!1,result:t};if(r.idBlock.isHexOnly){if(!(rm in r.idBlock))return{verified:!1,result:{error:"Wrong ASN.1 schema"}};let o=r.idBlock.valueHexView,a=e.idBlock.valueHexView;if(o.length!==a.length)return{verified:!1,result:t};for(let s=0;s<o.length;s++)if(o[s]!==a[1])return{verified:!1,result:t}}if(r.name&&(r.name=r.name.replace(/^\s+|\s+$/g,yt),r.name&&(t[r.name]=e)),r instanceof Y.Constructed){let o=0,a={verified:!1,result:{error:"Unknown error"}},s=r.valueBlock.value.length;if(s>0&&r.valueBlock.value[0]instanceof Ci&&(s=e.valueBlock.value.length),s===0)return{verified:!0,result:t};if(e.valueBlock.value.length===0&&r.valueBlock.value.length!==0){let l=!0;for(let d=0;d<r.valueBlock.value.length;d++)l=l&&(r.valueBlock.value[d].optional||!1);return l?{verified:!0,result:t}:(r.name&&(r.name=r.name.replace(/^\s+|\s+$/g,yt),r.name&&delete t[r.name]),t.error="Inconsistent object length",{verified:!1,result:t})}for(let l=0;l<s;l++)if(l-o>=e.valueBlock.value.length){if(r.valueBlock.value[l].optional===!1){let d={verified:!1,result:t};return t.error="Inconsistent length between ASN.1 data and schema",r.name&&(r.name=r.name.replace(/^\s+|\s+$/g,yt),r.name&&(delete t[r.name],d.name=r.name)),d}}else if(r.valueBlock.value[0]instanceof Ci){if(a=Ur(t,e.valueBlock.value[l],r.valueBlock.value[0].value),a.verified===!1)if(r.valueBlock.value[0].optional)o++;else return r.name&&(r.name=r.name.replace(/^\s+|\s+$/g,yt),r.name&&delete t[r.name]),a;if(Nd in r.valueBlock.value[0]&&r.valueBlock.value[0].name.length>0){let d={};sv in r.valueBlock.value[0]&&r.valueBlock.value[0].local?d=e:d=t,typeof d[r.valueBlock.value[0].name]>"u"&&(d[r.valueBlock.value[0].name]=[]),d[r.valueBlock.value[0].name].push(e.valueBlock.value[l])}}else if(a=Ur(t,e.valueBlock.value[l-o],r.valueBlock.value[l]),a.verified===!1)if(r.valueBlock.value[l].optional)o++;else return r.name&&(r.name=r.name.replace(/^\s+|\s+$/g,yt),r.name&&delete t[r.name]),a;if(a.verified===!1){let l={verified:!1,result:t};return r.name&&(r.name=r.name.replace(/^\s+|\s+$/g,yt),r.name&&(delete t[r.name],l.name=r.name)),l}return{verified:!0,result:t}}if(r.primitiveSchema&&rm in e.valueBlock){let o=qc(e.valueBlock.valueHexView);if(o.offset===-1){let a={verified:!1,result:o.result};return r.name&&(r.name=r.name.replace(/^\s+|\s+$/g,yt),r.name&&(delete t[r.name],a.name=r.name)),a}return Ur(t,o.result,r.primitiveSchema)}return{verified:!0,result:t}}function yv(t,e){if(!(e instanceof Object))return{verified:!1,result:{error:"Wrong ASN.1 schema type"}};let r=qc(fe.BufferSourceConverter.toUint8Array(t));return r.offset===-1?{verified:!1,result:r.result}:Ur(r.result,r.result,e)}var vv="[object ArrayBuffer]",wv="[object SharedArrayBuffer]";function $m(t){return Object.prototype.toString.call(t)}function xv(t){if(ArrayBuffer.isView(t))return!0;if(!t||typeof t!="object")return!1;let e=t;return typeof e.byteOffset=="number"&&typeof e.byteLength=="number"&&Jc(e.buffer)}function Xc(t){return $m(t)===vv}function Gm(t){return typeof SharedArrayBuffer<"u"&&$m(t)===wv}function Jc(t){return Xc(t)||Gm(t)}function Ud(t){return xv(t)}function xr(t){return Jc(t)||Ud(t)}function $d(t){if(!xr(t))throw new TypeError("Expected ArrayBuffer, SharedArrayBuffer, or ArrayBufferView")}function ot(t){return $d(t),Jc(t)?new Uint8Array(t):new Uint8Array(t.buffer,t.byteOffset,t.byteLength)}function Ee(t){if($d(t),Xc(t))return t;let e=new ArrayBuffer(t.byteLength);return new Uint8Array(e).set(ot(t)),e}function Wa(t,e,r={}){let n=ot(t),i=ot(e);if(!r.constantTime&&n.byteLength!==i.byteLength)return!1;let o=Math.max(n.byteLength,i.byteLength),a=n.byteLength^i.byteLength;for(let s=0;s<o;s++)a|=(n[s]??0)^(i[s]??0);return a===0}var Fr={};Pt(Fr,{binary:()=>kv,decode:()=>Qc,encode:()=>Yc,is:()=>Km});function Yc(t){let e=ot(t),r="";for(let n of e)r+=String.fromCharCode(n);return r}function Qc(t){let e=new Uint8Array(t.length);for(let r=0;r<t.length;r++)e[r]=t.charCodeAt(r)&255;return e}function Km(t){return typeof t=="string"}var kv={encode:Yc,decode:Qc,is:Km};var qe={};Pt(qe,{decode:()=>Vd,encode:()=>Gd,format:()=>Jm,formats:()=>Ym,hex:()=>Nv,is:()=>qm,normalize:()=>Ka,parse:()=>Xm});var Sv=/^[0-9a-f]$/i,Cv=[" ","	",`
`,"\r",":","-","."];function Tv(t){return t.separators==="none"?[]:!t.separators||t.separators==="common"?Cv:t.separators}function Iv(t){if(!t)throw new TypeError("Hex separators must be non-empty strings")}function _v(t,e,r){for(let n of r)if(t.startsWith(n,e))return n}function Rv(t){let e=/[A-F]/.test(t),r=/[a-f]/.test(t);return e&&!r?"upper":"lower"}function Bv(t){let e=/\r\n|\n/.exec(t);if(e)return e[0]===`\r
`?`\r
`:`
`}function Fm(t){return t.replace(/[^0-9a-f]/gi,"")}function Mv(t){let e=t.match(/[0-9A-Fa-f]+|[^0-9A-Fa-f]+/g)??[];if(e.length<3)return;let r=e.filter((a,s)=>s%2===0),n=e.filter((a,s)=>s%2===1),i=n[0];if(!i||n.some(a=>a!==i)||r.some(a=>a.length===0||a.length%2!==0))return;let o=r[0]?.length??0;if(o&&!r.slice(0,-1).some(a=>a.length!==o)&&!((r[r.length-1]?.length??0)>o))return{size:o/2,separator:i}}function Pv(t){let e=t.trim(),r=/^0x/i.test(e)?"0x":"",n=r?e.slice(2):e,i=Bv(n),o=n.split(/\r\n|\n/).filter(d=>d.length>0),a=o[0]?.trim()??"",s=Mv(a),l={case:Rv(e),prefix:r};if(s&&(l.group=s),i&&o.length>1){let d=Fm(o[0]??"").length/2;d>0&&o.slice(0,-1).every(p=>Fm(p).length/2===d)&&(l.line={bytesPerLine:d,separator:i})}return l}function Ov(t,e){let r=e.allowPrefix??!0,n=[...Tv(e)].sort((s,l)=>l.length-s.length);for(let s of n)Iv(s);let i=t.trim();if(/^0x/i.test(i)){if(!r)throw new TypeError("Hexadecimal text must not include a 0x prefix");i=i.slice(2)}let o="",a=!1;for(let s=0;s<i.length;){let l=i[s]??"";if(Sv.test(l)){o+=l,a=!1,s+=1;continue}let d=_v(i,s,n);if(!d)throw new TypeError("Input is not valid hexadecimal text");if(e.strict&&(a||o.length===0))throw new TypeError("Hexadecimal text contains misplaced separators");a=!0,s+=d.length}if(e.strict&&a&&o.length>0)throw new TypeError("Hexadecimal text must not end with a separator");if(o.length%2!==0){if(!e.allowOddLength)throw new TypeError("Hexadecimal text must contain an even number of characters");o=`0${o}`}return o.toLowerCase()}function zm(t,e){if(!e)return t.join("");if(!Number.isInteger(e.size)||e.size<1)throw new RangeError("Hex group size must be a positive integer");let r=[];for(let n=0;n<t.length;n+=e.size)r.push(t.slice(n,n+e.size).join(""));return r.join(e.separator)}function Ka(t,e={}){return Ov(t,e)}function qm(t,e={}){if(typeof t!="string")return!1;try{return Ka(t,e),!0}catch{return!1}}function Gd(t,e={}){let r=ot(t),n=e.case??"lower",i=Array.from(r,a=>{let s=a.toString(16).padStart(2,"0");return n==="upper"?s.toUpperCase():s}),o="";if(e.line){let a=e.line.bytesPerLine;if(!Number.isInteger(a)||a<1)throw new RangeError("Hex bytesPerLine must be a positive integer");let s=e.line.separator??`
`,l=[];for(let d=0;d<i.length;d+=a)l.push(zm(i.slice(d,d+a),e.group));o=l.join(s)}else o=zm(i,e.group);return`${e.prefix??""}${o}`}function Vd(t,e={}){let r=Ka(t,e),n=new Uint8Array(r.length/2);for(let i=0;i<r.length;i+=2)n[i/2]=Number.parseInt(r.slice(i,i+2),16);return n}function Xm(t,e={}){let r=Ka(t,e);return{bytes:Vd(r),format:Pv(t),normalized:r}}function Jm(t,e){return Gd(t,e)}var Ym={compact:Object.freeze({}),upper:Object.freeze({case:"upper"}),colon:Object.freeze({group:{size:1,separator:":"}}),colonUpper:Object.freeze({case:"upper",group:{size:1,separator:":"}}),groupsOf4:Object.freeze({group:{size:4,separator:" "}}),prefixed:Object.freeze({prefix:"0x"})},Nv={encode:Gd,decode:Vd,format:Jm,formats:Ym,is:qm,normalize:Ka,parse:Xm};var En={};Pt(En,{decode:()=>Zm,encode:()=>Qm,utf8:()=>Dv});function Qm(t){return new TextEncoder().encode(t)}function Zm(t){return new TextDecoder("utf-8",{fatal:!1}).decode(ot(t))}var Dv={encode:Qm,decode:Zm};var Ar={};Pt(Ar,{decode:()=>th,encode:()=>eh,utf16:()=>Lv});function eh(t,e={}){let r=new ArrayBuffer(t.length*2),n=new DataView(r);for(let i=0;i<t.length;i++)n.setUint16(i*2,t.charCodeAt(i),e.littleEndian??!1);return new Uint8Array(r)}function th(t,e={}){let r=Ee(t),n=new DataView(r),i="";for(let o=0;o<r.byteLength;o+=2)i+=String.fromCharCode(n.getUint16(o,e.littleEndian??!1));return i}var Lv={encode:eh,decode:th};var Lt={};Pt(Lt,{base64:()=>kn,decode:()=>oh,encode:()=>ih,is:()=>Wd,normalize:()=>Zc,pad:()=>nh});var jv=/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;function rh(){return globalThis.Buffer}function Zc(t){return t.replace(/[\n\r\t ]/g,"")}function nh(t){let e=t.length%4;return e?t+"=".repeat(4-e):t}function Wd(t){if(typeof t!="string")return!1;let e=Zc(t);return e===""||jv.test(e)}function ih(t,e){let r=ot(t),n=rh();return n?n.from(r).toString("base64"):btoa(Yc(r))}function oh(t,e){let r=Zc(t);if(!Wd(r))throw new TypeError("Input is not valid Base64 text");let n=rh();return n?new Uint8Array(n.from(r,"base64")):Qc(atob(r))}var kn={encode:ih,decode:oh,is:Wd,normalize:Zc,pad:nh};var er={};Pt(er,{base64url:()=>Uv,decode:()=>sh,encode:()=>ah,is:()=>Kd,normalize:()=>el});var Hv=/^[A-Za-z0-9_-]*$/;function el(t){return t.replace(/[\n\r\t ]/g,"")}function Kd(t){return typeof t=="string"&&Hv.test(el(t))}function ah(t,e){return kn.encode(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/g,"")}function sh(t,e){let r=el(t);if(!Kd(r))throw new TypeError("Input is not valid Base64Url text");return kn.decode(kn.pad(r.replace(/-/g,"+").replace(/_/g,"/")))}var Uv={encode:ah,decode:sh,is:Kd,normalize:el};var $v=/^[A-Z0-9][A-Z0-9 ._-]*[A-Z0-9]$/i,ch=/-----BEGIN ([^-]+)-----([\s\S]*?)-----END \1-----/g;function lh(t){if(!$v.test(t))throw new TypeError(`Invalid PEM label '${t}'`)}function Gv(t,e){let r=[];for(let n=0;n<t.length;n+=e)r.push(t.slice(n,n+e));return r}function Vv(t){let r=t.trim().replace(/\r\n/g,`
`).split(`
`).map(o=>o.trim()).filter(Boolean),n={},i=0;for(;i<r.length;i++){let o=r[i],a=o.indexOf(":");if(a<=0)break;n[o.slice(0,a).trim()]=o.slice(a+1).trim()}return{headers:Object.keys(n).length?n:void 0,base64Lines:r.slice(i),base64Text:r.slice(i).join("")}}function Wv(t){return/\r\n/.test(t)?`\r
`:`
`}function dh(t,e={}){let r=[],n=e.label,i;for(ch.lastIndex=0;i=ch.exec(t);){let o=i[1].trim();if(n&&o!==n)continue;lh(o);let a=Vv(i[2]);r.push({label:o,data:kn.decode(a.base64Text),headers:a.headers,lineLength:a.base64Lines[0]?.length??64,newline:Wv(i[0])})}if(e.strict&&r.length===0)throw new TypeError(n?`No PEM block with label '${n}' was found`:"No PEM blocks were found");return r}function tl(t,e,r={}){lh(t);let n=r.lineLength??64;if(!Number.isInteger(n)||n<1)throw new RangeError("PEM lineLength must be a positive integer");let i=r.newline??`
`,o=[`-----BEGIN ${t}-----`];if(r.headers){for(let[a,s]of Object.entries(r.headers))o.push(`${a}: ${s}`);o.push("")}return o.push(...Gv(kn.encode(e),n)),o.push(`-----END ${t}-----`),`${o.join(i)}${i}`}function uh(t,e={}){return dh(t,e).map(({lineLength:r,newline:n,...i})=>i)}function ph(t,e){let[r]=uh(t,{label:e,strict:!0});return r.data}function fh(t,e={}){let[r]=dh(t,{...e,strict:!0}),n={label:r.label,headers:r.headers,lineLength:r.lineLength,newline:r.newline};return{bytes:r.data,format:n,normalized:tl(r.label,r.data,n)}}function mh(t,e){return tl(e.label,t,e)}var Fa={name:"pem",encode:(t,e)=>{if(!e?.label)throw new TypeError("PEM label is required");return tl(e.label,t,e)},decode:(t,e)=>ph(t,e?.label),format:mh,is:t=>typeof t=="string"&&/-----BEGIN [^-]+-----/.test(t),parse:fh};function Er(t){return t.trim().toLowerCase()}function Kv(t){return t instanceof Error?t:new Error(String(t))}function hh(t,e,r){for(let n of[r.name,...r.aliases??[]])t.delete(Er(n));e.delete(Er(r.name))}function Fd(t,e,r){let n=t[r];if(typeof n!="function")throw new Error(`Converter '${e}' does not support ${r}()`);return n}function Fv(t,e,r){let n=Er(r.name||t),i=e.trim();if(!i)return 0;let o=!1;r.is&&(o=r.is(e));let a=!1;try{r.decode(e),a=!0}catch{a=!1}if(!o&&!a)return 0;switch(n){case"pem":return/-----BEGIN [^-]+-----/.test(e)?1:0;case"hex":{let s=i.replace(/^0x/i,"").replace(/[\s:.-]/g,"");return!s||/[^0-9a-f]/i.test(s)||s.length%2!==0?0:/^0x/i.test(i)||/[:\s.-]/.test(i)?.95:/[a-f]/.test(i)||/[A-F]/.test(i)?.8:.45}case"base64url":return/[-_]/.test(i)?.95:/=/.test(i)?.1:.6;case"base64":return/[+/=]/.test(i)?.9:.55;case"binary":case"utf8":case"utf16be":case"utf16le":return 0;default:return o&&a?.75:.5}}function zd(t=[]){let e=new Map,r=new Set,n={register(i,o={}){if(!i.name||!Er(i.name))throw new TypeError("Converter name is required");let a=[...new Set([i.name,...i.aliases??[]].map(Er))],s=new Set;for(let l of a){let d=e.get(l);if(d){if(!o.override)throw new Error(`Converter '${l}' is already registered`);s.add(d)}}for(let l of s)hh(e,r,l);for(let l of a)e.set(l,i);return r.add(Er(i.name)),this},unregister(i){let o=e.get(Er(i));return o?(hh(e,r,o),!0):!1},has(i){return e.has(Er(i))},get(i){let o=e.get(Er(i));if(!o)throw new Error(`Converter '${i}' is not registered`);return o},list(){return[...r].map(i=>this.get(i))},encode(i,o,a){return this.get(i).encode(o,a)},decode(i,o,a){return this.get(i).decode(o,a)},tryDecode(i,o,a){try{return{ok:!0,bytes:this.decode(i,o,a)}}catch(s){return{ok:!1,error:Kv(s)}}},normalize(i,o,a){let s=this.get(i);return Fd(s,i,"normalize").call(s,o,a)},parse(i,o,a){let s=this.get(i);return Fd(s,i,"parse").call(s,o,a)},format(i,o,a){let s=this.get(i);return Fd(s,i,"format").call(s,o,a)},transcode(i,o){let a=this.decode(o.from,i,o.fromOptions);return this.encode(o.to,a,o.toOptions)},detect(i,o={}){let a=o.formats?.length?o.formats.map(l=>String(l)):this.list().map(l=>l.name).filter(l=>!["binary","utf8","utf16be","utf16le"].includes(Er(l))),s=new Map;for(let l of a){let d=this.get(l),p=Fv(l,i,d);if(p<=0)continue;let m=d.name,g=s.get(m);(!g||p>g.confidence)&&s.set(m,{format:m,confidence:p})}return[...s.values()].sort((l,d)=>d.confidence-l.confidence)}};for(let i of t)n.register(i);return n}var gh={name:"binary",aliases:["latin1"],encode:Fr.encode,decode:Fr.decode,is:Fr.is},bh={name:"hex",encode:qe.encode,decode:qe.decode,format:qe.format,is:qe.is,normalize:qe.normalize,parse:qe.parse},yh={name:"base64",aliases:["b64"],encode:Lt.encode,decode:Lt.decode,is:Lt.is,normalize:Lt.normalize},vh={name:"base64url",aliases:["base64-url","b64url"],encode:er.encode,decode:er.decode,is:er.is,normalize:er.normalize},wh={name:"utf8",aliases:["utf-8"],encode:t=>En.decode(t),decode:t=>En.encode(t),is:t=>typeof t=="string"},xh={name:"utf16be",aliases:["utf16","utf-16","utf-16be"],encode:t=>Ar.decode(t),decode:t=>Ar.encode(t),is:t=>typeof t=="string"},Ah={name:"utf16le",aliases:["utf-16le","ucs2","usc2"],encode:t=>Ar.decode(t,{littleEndian:!0}),decode:t=>Ar.encode(t,{littleEndian:!0}),is:t=>typeof t=="string"},Eh=[gh,bh,yh,vh,wh,xh,Ah,Fa],kr=zd(Eh);function qd(t,e,...r){return kr.encode(t,e,...r)}function Xd(t,e,...r){return kr.decode(t,e,...r)}function zv(t,e,...r){return kr.tryDecode(t,e,...r)}function qv(t,e,...r){return kr.normalize(t,e,...r)}function Xv(t,e,...r){return kr.parse(t,e,...r)}function Jv(t,e,r){return kr.format(t,e,r)}function Yv(t,e){return kr.transcode(t,e)}function Qv(t,e){return kr.detect(t,e)}function Zv(t){return t.toLowerCase()}var kh={encode:qd,decode:Xd,tryDecode:zv,normalize:qv,parse:Xv,format:Jv,transcode:Yv,detect:Qv,to(t,e,...r){return qd(t,e,...r)},from(t,e,...r){return Xd(t,e,...r)},toString(t,e="utf8"){return qd(e,t)},fromString(t,e="utf8"){return Zv(e)==="hex"?Ee(qe.decode(t,{allowOddLength:!0})):Ee(Xd(e,t))},toBase64:Lt.encode,fromBase64:t=>Ee(Lt.decode(t)),toBase64Url:er.encode,fromBase64Url:t=>Ee(er.decode(t)),toHex:qe.encode,fromHex:t=>Ee(qe.decode(t,{allowOddLength:!0})),toBinary:Fr.encode,fromBinary:t=>Ee(Fr.decode(t)),toUtf8String:En.decode,fromUtf8String:t=>Ee(En.encode(t)),toUtf16String:(t,e=!1)=>Ar.decode(t,{littleEndian:e}),fromUtf16String:(t,e=!1)=>Ee(Ar.encode(t,{littleEndian:e})),isHex:qe.is,isBase64:Lt.is,isBase64Url:er.is,formatString:Lt.normalize};var x;(function(t){t[t.Sequence=0]="Sequence",t[t.Set=1]="Set",t[t.Choice=2]="Choice"})(x||(x={}));var f;(function(t){t[t.Any=1]="Any",t[t.Boolean=2]="Boolean",t[t.OctetString=3]="OctetString",t[t.BitString=4]="BitString",t[t.Integer=5]="Integer",t[t.Enumerated=6]="Enumerated",t[t.ObjectIdentifier=7]="ObjectIdentifier",t[t.Utf8String=8]="Utf8String",t[t.BmpString=9]="BmpString",t[t.UniversalString=10]="UniversalString",t[t.NumericString=11]="NumericString",t[t.PrintableString=12]="PrintableString",t[t.TeletexString=13]="TeletexString",t[t.VideotexString=14]="VideotexString",t[t.IA5String=15]="IA5String",t[t.GraphicString=16]="GraphicString",t[t.VisibleString=17]="VisibleString",t[t.GeneralString=18]="GeneralString",t[t.CharacterString=19]="CharacterString",t[t.UTCTime=20]="UTCTime",t[t.GeneralizedTime=21]="GeneralizedTime",t[t.DATE=22]="DATE",t[t.TimeOfDay=23]="TimeOfDay",t[t.DateTime=24]="DateTime",t[t.Duration=25]="Duration",t[t.TIME=26]="TIME",t[t.Null=27]="Null",t[t.RelativeObjectIdentifier=28]="RelativeObjectIdentifier"})(f||(f={}));var jt=class{unusedBits=0;value=new ArrayBuffer(0);constructor(e,r=0){if(e)if(typeof e=="number")this.fromNumber(e);else if(xr(e))this.unusedBits=r,this.value=Ee(e);else throw TypeError("Unsupported type of 'params' argument for BitString")}fromASN(e){if(!(e instanceof Zt))throw new TypeError("Argument 'asn' is not instance of ASN.1 BitString");return this.unusedBits=e.valueBlock.unusedBits,this.value=Ee(e.valueBlock.valueHex),this}toASN(){return new Zt({unusedBits:this.unusedBits,valueHex:this.value})}toSchema(e){return new Zt({name:e})}toNumber(){let e="",r=new Uint8Array(this.value);for(let n of r)e+=n.toString(2).padStart(8,"0");return e=e.split("").reverse().join(""),this.unusedBits&&(e=e.slice(this.unusedBits).padStart(this.unusedBits,"0")),parseInt(e,2)}fromNumber(e){let r=e.toString(2),n=r.length+7>>3;this.unusedBits=(n<<3)-r.length;let i=new Uint8Array(n);r=r.padStart(n<<3,"0").split("").reverse().join("");let o=0;for(;o<n;)i[o]=parseInt(r.slice(o<<3,(o<<3)+8),2),o++;this.value=i.buffer}};var G=class{buffer;get byteLength(){return this.buffer.byteLength}get byteOffset(){return 0}constructor(e){typeof e=="number"?this.buffer=new ArrayBuffer(e):xr(e)?this.buffer=Ee(e):Array.isArray(e)?this.buffer=new Uint8Array(e).buffer:this.buffer=new ArrayBuffer(0)}fromASN(e){if(!(e instanceof Qt))throw new TypeError("Argument 'asn' is not instance of ASN.1 OctetString");return this.buffer=Ee(e.valueBlock.valueHex),this}toASN(){return new Qt({valueHex:this.buffer})}toSchema(e){return new Qt({name:e})}};var ew={fromASN:t=>t instanceof Yt?null:Ee(t.valueBeforeDecodeView),toASN:t=>{if(t===null)return new Yt;let e=Kr(t,{maxDepth:1/0,maxNodes:1/0,maxContentLength:1/0});if(e.result.error)throw new Error(e.result.error);return e.result}},tw={fromASN:t=>t.valueBlock.valueHexView.byteLength>=4?t.valueBlock.toString():t.valueBlock.valueDec,toASN:t=>new Vr({value:+t})},rw={fromASN:t=>t.valueBlock.valueDec,toASN:t=>new pi({value:t})},me={fromASN:t=>Ee(t.valueBlock.valueHexView),toASN:t=>new Vr({valueHex:t})};var nw={fromASN:t=>Ee(t.valueBlock.valueHexView),toASN:t=>new Zt({valueHex:t})},iw={fromASN:t=>t.valueBlock.toString(),toASN:t=>new fi({value:t})},ow={fromASN:t=>t.valueBlock.toString(),toASN:t=>new mi({value:t})},aw={fromASN:t=>t.valueBlock.value,toASN:t=>new ui({value:t})},To={fromASN:t=>Ee(t.valueBlock.valueHexView),toASN:t=>new Qt({valueHex:t})},Sh={fromASN:t=>new G(t.getValue()),toASN:t=>t.toASN()};function Ht(t){return{fromASN:e=>e.valueBlock.value,toASN:e=>new t({value:e})}}var Jd=Ht(Dt),sw=Ht(hi),cw=Ht(gi),lw=Ht(bi),dw=Ht(yi),uw=Ht(vi),pw=Ht(wi),fw=Ht(xi),mw=Ht(Ai),hw=Ht(xn),gw=Ht(Ei),bw=Ht(ki),yw={fromASN:t=>t.toDate(),toASN:t=>new An({valueDate:t})},vw={fromASN:t=>t.toDate(),toASN:t=>new Si({valueDate:t})},ww={fromASN:()=>null,toASN:()=>new Yt};function Sn(t){switch(t){case f.Any:return ew;case f.BitString:return nw;case f.BmpString:return sw;case f.Boolean:return aw;case f.CharacterString:return bw;case f.Enumerated:return rw;case f.GeneralString:return gw;case f.GeneralizedTime:return vw;case f.GraphicString:return mw;case f.IA5String:return fw;case f.Integer:return tw;case f.Null:return ww;case f.NumericString:return lw;case f.ObjectIdentifier:return iw;case f.RelativeObjectIdentifier:return ow;case f.OctetString:return To;case f.PrintableString:return dw;case f.TeletexString:return uw;case f.UTCTime:return yw;case f.UniversalString:return cw;case f.Utf8String:return Jd;case f.VideotexString:return pw;case f.VisibleString:return hw;default:return null}}function Ut(t){return typeof t=="function"&&t.prototype?t.prototype.toASN&&t.prototype.fromASN?!0:Ut(t.prototype):!!(t&&typeof t=="object"&&"toASN"in t&&"fromASN"in t)}function Qd(t){if(t){let e=Object.getPrototypeOf(t);return e?.prototype?.constructor===Array?!0:Qd(e)}return!1}function Ch(t,e){if(!(t&&e)||t.byteLength!==e.byteLength)return!1;let r=new Uint8Array(t),n=new Uint8Array(e);for(let i=0;i<t.byteLength;i++)if(r[i]!==n[i])return!1;return!0}var rl=class{items=new WeakMap;has(e){return this.items.has(e)}get(e,r=!1){let n=this.items.get(e);if(!n)throw new Error(`Cannot get schema for '${e.prototype.constructor.name}' target`);if(r&&!n.schema)throw new Error(`Schema '${e.prototype.constructor.name}' doesn't contain ASN.1 schema. Call 'AsnSchemaStorage.cache'.`);return n}cache(e){let r=this.get(e);r.schema||(r.schema=this.create(e,!0))}createDefault(e){let r={type:x.Sequence,items:{}},n=this.findParentSchema(e);return n&&(Object.assign(r,n),r.items=Object.assign({},r.items,n.items)),r}create(e,r){let n=this.items.get(e)||this.createDefault(e),i=[];for(let o in n.items){let a=n.items[o],s=r?o:"",l;if(typeof a.type=="number"){let p=f[a.type],m=wr[p];if(!m)throw new Error(`Cannot get ASN1 class by name '${p}'`);l=new m({name:s})}else Ut(a.type)?l=new a.type().toSchema(s):a.optional?this.get(a.type).type===x.Choice?l=new br({name:s}):(l=this.create(a.type,!1),l.name=s):l=new br({name:s});let d=!!a.optional||a.defaultValue!==void 0;if(a.repeated){l.name="";let p=a.repeated==="set"?dt:it;l=new p({name:"",value:[new Ci({name:s,value:l})]})}if(a.context!==null&&a.context!==void 0)if(a.implicit)if(typeof a.type=="number"||Ut(a.type)){let p=a.repeated?Ue:Gr;i.push(new p({name:s,optional:d,idBlock:{tagClass:3,tagNumber:a.context}}))}else{this.cache(a.type);let p=!!a.repeated,m=p?l:this.get(a.type,!0).schema;m="valueBlock"in m?m.valueBlock.value:m.value,i.push(new Ue({name:p?"":s,optional:d,idBlock:{tagClass:3,tagNumber:a.context},value:m}))}else i.push(new Ue({optional:d,idBlock:{tagClass:3,tagNumber:a.context},value:[l]}));else l.optional=d,i.push(l)}switch(n.type){case x.Sequence:return new it({value:i,name:""});case x.Set:return new dt({value:i,name:""});case x.Choice:return new Co({value:i,name:""});default:throw new Error("Unsupported ASN1 type in use")}}set(e,r){return this.items.set(e,r),this}findParentSchema(e){let r=Object.getPrototypeOf(e);return r?this.items.get(r)||this.findParentSchema(r):null}};var $e=new rl;var T=t=>e=>{let r;$e.has(e)?r=$e.get(e):(r=$e.createDefault(e),$e.set(e,r)),Object.assign(r,t)};var u=t=>(e,r)=>{let n;$e.has(e.constructor)?n=$e.get(e.constructor):(n=$e.createDefault(e.constructor),$e.set(e.constructor,n));let i=Object.assign({},t);if(typeof i.type=="number"&&!i.converter){let o=Sn(t.type);if(!o)throw new Error(`Cannot get default converter for property '${r}' of ${e.constructor.name}`);i.converter=o}i.raw=t.raw,n.items[r]=i};var Cn=class extends Error{schemas=[]};var Ie=class{static parse(e,r,n){let i=Kr(Ee(e),n?.berOptions);if(i.result.error)throw new Error(i.result.error);return this.fromASN(i.result,r,n)}static fromASN(e,r,n){try{if(Ut(r))return new r().fromASN(e);let i=$e.get(r);$e.cache(r);let o=i.schema,a=this.handleChoiceTypes(e,i,r,o,n);if(a?.result)return a.result;a?.targetSchema&&(o=a.targetSchema);let s=this.handleSequenceTypes(e,i,r,o),l=new r;return Qd(r)?this.handleArrayTypes(e,i,r,n):(this.processSchemaItems(i,s,l,n),l)}catch(i){throw i instanceof Cn&&i.schemas.push(r.name),i}}static handleChoiceTypes(e,r,n,i,o){if(e.constructor===Ue&&r.type===x.Choice&&e.idBlock.tagClass===3)for(let a in r.items){let s=r.items[a];if(s.context===e.idBlock.tagNumber&&s.implicit&&typeof s.type=="function"&&$e.has(s.type)){let l=$e.get(s.type);if(l&&l.type===x.Sequence){let d=new it;if("value"in e.valueBlock&&Array.isArray(e.valueBlock.value)&&"value"in d.valueBlock){d.valueBlock.value=e.valueBlock.value;let p=this.fromASN(d,s.type,o),m=new n;return m[a]=p,{result:m}}}}}else if(e.constructor===Ue&&r.type!==x.Choice){let a=new Ue({idBlock:{tagClass:3,tagNumber:e.idBlock.tagNumber},value:r.schema.valueBlock.value});for(let s in r.items)delete e[s];return{targetSchema:a}}return null}static handleSequenceTypes(e,r,n,i){if(r.type===x.Sequence){let o=Ur({},e,i);if(!o.verified)throw new Cn(`Data does not match to ${n.name} ASN1 schema.${o.result.error?` ${o.result.error}`:""}`);return o}else{let o=Ur({},e,i);if(!o.verified)throw new Cn(`Data does not match to ${n.name} ASN1 schema.${o.result.error?` ${o.result.error}`:""}`);return o}}static processRepeatedField(e,r,n){let i=e.slice(r);if(i.length===1&&i[0].constructor.name==="Sequence"){let o=i[0];o.valueBlock&&o.valueBlock.value&&Array.isArray(o.valueBlock.value)&&(i=o.valueBlock.value)}if(typeof n.type=="number"){let o=Sn(n.type);if(!o)throw new Error(`No converter for ASN.1 type ${n.type}`);return i.filter(a=>a&&a.valueBlock).map(a=>{try{return o.fromASN(a)}catch{return}}).filter(a=>a!==void 0)}else return i.filter(o=>o&&o.valueBlock).map(o=>{try{return this.fromASN(o,n.type)}catch{return}}).filter(o=>o!==void 0)}static processPrimitiveField(e,r){let n=Sn(r.type);if(!n)throw new Error(`No converter for ASN.1 type ${r.type}`);return n.fromASN(e)}static isOptionalChoiceField(e){return e.optional&&typeof e.type=="function"&&$e.has(e.type)&&$e.get(e.type).type===x.Choice}static processOptionalChoiceField(e,r){try{return{processed:!0,value:this.fromASN(e,r.type)}}catch(n){if(n instanceof Cn&&/Wrong values for Choice type/.test(n.message))return{processed:!1};throw n}}static handleArrayTypes(e,r,n,i){if(!("value"in e.valueBlock&&Array.isArray(e.valueBlock.value)))throw new Error("Cannot get items from the ASN.1 parsed value. ASN.1 object is not constructed.");let o=r.itemType;if(typeof o=="number"){let a=Sn(o);if(!a)throw new Error(`Cannot get default converter for array item of ${n.name} ASN1 schema`);return n.from(e.valueBlock.value,s=>a.fromASN(s))}else return n.from(e.valueBlock.value,a=>this.fromASN(a,o,i))}static processSchemaItems(e,r,n,i){for(let o in e.items){let a=r.result[o];if(!a)continue;let s=e.items[o],l=s.type,d;typeof l=="number"||Ut(l)?d=this.processPrimitiveSchemaItem(a,s,l,i):d=this.processComplexSchemaItem(a,s,l,i),d&&typeof d=="object"&&"value"in d&&"raw"in d?(n[o]=d.value,n[`${o}Raw`]=d.raw):n[o]=d}}static processPrimitiveSchemaItem(e,r,n,i){let o=r.converter??(Ut(n)?new n:null);if(!o)throw new Error("Converter is empty");return r.repeated?this.processRepeatedPrimitiveItem(e,r,o,i):this.processSinglePrimitiveItem(e,r,n,o,i)}static processRepeatedPrimitiveItem(e,r,n,i){if(r.implicit){let o=r.repeated==="sequence"?it:dt,a=new o;a.valueBlock=e.valueBlock;let s=Kr(a.toBER(!1),i?.berOptions);if(s.offset===-1)throw new Error(`Cannot parse the child item. ${s.result.error}`);if(!("value"in s.result.valueBlock&&Array.isArray(s.result.valueBlock.value)))throw new Error("Cannot get items from the ASN.1 parsed value. ASN.1 object is not constructed.");let l=s.result.valueBlock.value;return Array.from(l,d=>n.fromASN(d))}else return Array.from(e,o=>n.fromASN(o))}static processSinglePrimitiveItem(e,r,n,i,o){let a=e;if(r.implicit){let s;if(Ut(n))s=new n().toSchema("");else{let l=f[n],d=wr[l];if(!d)throw new Error(`Cannot get '${l}' class from asn1js module`);s=new d}s.valueBlock=a.valueBlock,a=Kr(s.toBER(!1),o?.berOptions).result}return i.fromASN(a)}static processComplexSchemaItem(e,r,n,i){if(r.repeated){if(!Array.isArray(e))throw new Error("Cannot get list of items from the ASN.1 parsed value. ASN.1 value should be iterable.");return Array.from(e,o=>this.fromASN(o,n,i))}else{let o=this.handleImplicitTagging(e,r,n);if(this.isOptionalChoiceField(r))try{return this.fromASN(o,n,i)}catch(a){if(a instanceof Cn&&/Wrong values for Choice type/.test(a.message))return;throw a}else{let a=this.fromASN(o,n,i);return r.raw?{value:a,raw:e.valueBeforeDecodeView}:a}}}static handleImplicitTagging(e,r,n){if(r.implicit&&typeof r.context=="number"){let i=$e.get(n);if(i.type===x.Sequence){let o=new it;if("value"in e.valueBlock&&Array.isArray(e.valueBlock.value)&&"value"in o.valueBlock)return o.valueBlock.value=e.valueBlock.value,o}else if(i.type===x.Set){let o=new dt;if("value"in e.valueBlock&&Array.isArray(e.valueBlock.value)&&"value"in o.valueBlock)return o.valueBlock.value=e.valueBlock.value,o}}return e}};var za=class t{static serialize(e){return e instanceof He?e.toBER(!1):this.toASN(e).toBER(!1)}static toASN(e){if(e&&typeof e=="object"&&Ut(e))return e.toASN();if(!(e&&typeof e=="object"))throw new TypeError("Parameter 1 should be type of Object.");let r=e.constructor,n=$e.get(r);$e.cache(r);let i=[];if(n.itemType){if(!Array.isArray(e))throw new TypeError("Parameter 1 should be type of Array.");if(typeof n.itemType=="number"){let a=Sn(n.itemType);if(!a)throw new Error(`Cannot get default converter for array item of ${r.name} ASN1 schema`);i=e.map(s=>a.toASN(s))}else i=e.map(a=>this.toAsnItem({type:n.itemType},"[]",r,a))}else for(let a in n.items){let s=n.items[a],l=e[a];if(l===void 0||s.defaultValue===l||typeof s.defaultValue=="object"&&typeof l=="object"&&Ch(this.serialize(s.defaultValue),this.serialize(l)))continue;let d=t.toAsnItem(s,a,r,l);if(typeof s.context=="number")if(s.implicit)if(!s.repeated&&(typeof s.type=="number"||Ut(s.type))){let p={};p.valueHex=d instanceof Yt?Ee(d.valueBeforeDecodeView):d.valueBlock.toBER(),i.push(new Gr({optional:s.optional,idBlock:{tagClass:3,tagNumber:s.context},...p}))}else i.push(new Ue({optional:s.optional,idBlock:{tagClass:3,tagNumber:s.context},value:d.valueBlock.value}));else i.push(new Ue({optional:s.optional,idBlock:{tagClass:3,tagNumber:s.context},value:[d]}));else s.repeated?i=i.concat(d):i.push(d)}let o;switch(n.type){case x.Sequence:o=new it({value:i});break;case x.Set:o=new dt({value:i});break;case x.Choice:if(!i[0])throw new Error(`Schema '${r.name}' has wrong data. Choice cannot be empty.`);o=i[0];break}return o}static toAsnItem(e,r,n,i){let o;if(typeof e.type=="number"){let a=e.converter;if(!a)throw new Error(`Property '${r}' doesn't have converter for type ${f[e.type]} in schema '${n.name}'`);if(e.repeated){if(!Array.isArray(i))throw new TypeError("Parameter 'objProp' should be type of Array.");let s=Array.from(i,d=>a.toASN(d)),l=e.repeated==="sequence"?it:dt;o=new l({value:s})}else o=a.toASN(i)}else if(e.repeated){if(!Array.isArray(i))throw new TypeError("Parameter 'objProp' should be type of Array.");let a=Array.from(i,l=>this.toASN(l)),s=e.repeated==="sequence"?it:dt;o=new s({value:a})}else o=this.toASN(i);return o}};var q=class extends Array{constructor(e=[]){if(typeof e=="number")super(e);else{super();for(let r of e)this.push(r)}}};var $=class t{static serialize(e){return za.serialize(e)}static parse(e,r,n){return Ie.parse(e,r,n)}static toString(e,r){let n=xr(e)?Ee(e):t.serialize(e),i=Kr(n,r?.berOptions);if(i.offset===-1)throw new Error(`Cannot decode ASN.1 data. ${i.result.error}`);return i.result.toString()}};function c(t,e,r,n){var i=arguments.length,o=i<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,r):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(t,e,r,n);else for(var s=t.length-1;s>=0;s--)(a=t[s])&&(o=(i<3?a(o):i>3?a(e,r,o):a(e,r))||o);return i>3&&o&&Object.defineProperty(e,r,o),o}function F(t,e,r,n){if(r==="a"&&!n)throw new TypeError("Private accessor was defined without a getter");if(typeof e=="function"?t!==e||!n:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return r==="m"?n:r==="a"?n.call(t):n?n.value:e.get(t)}function pe(t,e,r,n,i){if(n==="m")throw new TypeError("Private method is not writable");if(n==="a"&&!i)throw new TypeError("Private accessor was defined without a setter");if(typeof e=="function"?t!==e||!i:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return n==="a"?i.call(t,r):i?i.value=r:e.set(t,r),r}var qa=class{static isIPv4(e){return/^(\d{1,3}\.){3}\d{1,3}$/.test(e)}static parseIPv4(e){let r=e.split(".");if(r.length!==4)throw new Error("Invalid IPv4 address");return r.map(n=>{let i=parseInt(n,10);if(isNaN(i)||i<0||i>255)throw new Error("Invalid IPv4 address part");return i})}static parseIPv6(e){let n=this.expandIPv6(e).split(":");if(n.length!==8)throw new Error("Invalid IPv6 address");return n.reduce((i,o)=>{let a=parseInt(o,16);if(isNaN(a)||a<0||a>65535)throw new Error("Invalid IPv6 address part");return i.push(a>>8&255),i.push(a&255),i},[])}static expandIPv6(e){if(!e.includes("::"))return e;let r=e.split("::");if(r.length>2)throw new Error("Invalid IPv6 address");let n=r[0]?r[0].split(":"):[],i=r[1]?r[1].split(":"):[],o=8-(n.length+i.length);if(o<0)throw new Error("Invalid IPv6 address");return[...n,...Array(o).fill("0"),...i].join(":")}static formatIPv6(e){let r=[];for(let n=0;n<16;n+=2)r.push((e[n]<<8|e[n+1]).toString(16));return this.compressIPv6(r.join(":"))}static compressIPv6(e){let r=e.split(":"),n=-1,i=0,o=-1,a=0;for(let s=0;s<r.length;s++)r[s]==="0"?(o===-1&&(o=s),a++):(a>i&&(n=o,i=a),o=-1,a=0);if(a>i&&(n=o,i=a),i>1){let s=r.slice(0,n).join(":"),l=r.slice(n+i).join(":");return`${s}::${l}`}return e}static parseCIDR(e){let[r,n]=e.split("/"),i=parseInt(n,10);if(this.isIPv4(r)){if(i<0||i>32)throw new Error("Invalid IPv4 prefix length");return[this.parseIPv4(r),i]}else{if(i<0||i>128)throw new Error("Invalid IPv6 prefix length");return[this.parseIPv6(r),i]}}static decodeIP(e){if(e.length===64&&parseInt(e,16)===0)return"::/0";if(e.length!==16)return e;let r=parseInt(e.slice(8),16).toString(2).split("").reduce((i,o)=>i+ +o,0),n=e.slice(0,8).replace(/(.{2})/g,i=>`${parseInt(i,16)}.`);return n=n.slice(0,-1),`${n}/${r}`}static toString(e){let r=new Uint8Array(e);if(r.length===4)return Array.from(r).join(".");if(r.length===16)return this.formatIPv6(r);if(r.length===8||r.length===32){let n=r.length/2,i=r.slice(0,n),o=r.slice(n);if(r.every(l=>l===0))return r.length===8?"0.0.0.0/0":"::/0";let s=o.reduce((l,d)=>l+(d.toString(2).match(/1/g)||[]).length,0);return r.length===8?`${Array.from(i).join(".")}/${s}`:`${this.formatIPv6(i)}/${s}`}return this.decodeIP(qe.encode(e))}static fromString(e){if(e.includes("/")){let[n,i]=this.parseCIDR(e),o=new Uint8Array(n.length),a=i;for(let l=0;l<o.length;l++)a>=8?(o[l]=255,a-=8):a>0&&(o[l]=255<<8-a,a=0);let s=new Uint8Array(n.length*2);return s.set(n,0),s.set(o,n.length),s.buffer}let r=this.isIPv4(e)?this.parseIPv4(e):this.parseIPv6(e);return new Uint8Array(r).buffer}};var Zd,eu,tu,Ge=class{teletexString;printableString;universalString;utf8String;bmpString;constructor(e={}){Object.assign(this,e)}toString(){return this.bmpString||this.printableString||this.teletexString||this.universalString||this.utf8String||""}};c([u({type:f.TeletexString})],Ge.prototype,"teletexString",void 0);c([u({type:f.PrintableString})],Ge.prototype,"printableString",void 0);c([u({type:f.UniversalString})],Ge.prototype,"universalString",void 0);c([u({type:f.Utf8String})],Ge.prototype,"utf8String",void 0);c([u({type:f.BmpString})],Ge.prototype,"bmpString",void 0);Ge=c([T({type:x.Choice})],Ge);var Io=class extends Ge{ia5String;anyValue;constructor(e={}){super(e),Object.assign(this,e)}toString(){return this.ia5String||(this.anyValue?qe.encode(this.anyValue):super.toString())}};c([u({type:f.IA5String})],Io.prototype,"ia5String",void 0);c([u({type:f.Any})],Io.prototype,"anyValue",void 0);Io=c([T({type:x.Choice})],Io);var Ti=class{type="";value=new Io;constructor(e={}){Object.assign(this,e)}};c([u({type:f.ObjectIdentifier})],Ti.prototype,"type",void 0);c([u({type:Io})],Ti.prototype,"value",void 0);var Tn=Zd=class extends q{constructor(e){super(e),Object.setPrototypeOf(this,Zd.prototype)}};Tn=Zd=c([T({type:x.Set,itemType:Ti})],Tn);var ru=eu=class extends q{constructor(e){super(e),Object.setPrototypeOf(this,eu.prototype)}};ru=eu=c([T({type:x.Sequence,itemType:Tn})],ru);var Ce=tu=class extends ru{constructor(e){super(e),Object.setPrototypeOf(this,tu.prototype)}};Ce=tu=c([T({type:x.Sequence})],Ce);var xw={fromASN:t=>qa.toString(To.fromASN(t)),toASN:t=>To.toASN(qa.fromString(t))},In=class{typeId="";value=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};c([u({type:f.ObjectIdentifier})],In.prototype,"typeId",void 0);c([u({type:f.Any,context:0})],In.prototype,"value",void 0);var Xa=class{nameAssigner;partyName=new Ge;constructor(e={}){Object.assign(this,e)}};c([u({type:Ge,optional:!0,context:0,implicit:!0})],Xa.prototype,"nameAssigner",void 0);c([u({type:Ge,context:1,implicit:!0})],Xa.prototype,"partyName",void 0);var se=class{otherName;rfc822Name;dNSName;x400Address;directoryName;ediPartyName;uniformResourceIdentifier;iPAddress;registeredID;constructor(e={}){Object.assign(this,e)}};c([u({type:In,context:0,implicit:!0})],se.prototype,"otherName",void 0);c([u({type:f.IA5String,context:1,implicit:!0})],se.prototype,"rfc822Name",void 0);c([u({type:f.IA5String,context:2,implicit:!0})],se.prototype,"dNSName",void 0);c([u({type:f.Any,context:3,implicit:!0})],se.prototype,"x400Address",void 0);c([u({type:Ce,context:4,implicit:!1})],se.prototype,"directoryName",void 0);c([u({type:Xa,context:5})],se.prototype,"ediPartyName",void 0);c([u({type:f.IA5String,context:6,implicit:!0})],se.prototype,"uniformResourceIdentifier",void 0);c([u({type:f.OctetString,context:7,implicit:!0,converter:xw})],se.prototype,"iPAddress",void 0);c([u({type:f.ObjectIdentifier,context:8,implicit:!0})],se.prototype,"registeredID",void 0);se=c([T({type:x.Choice})],se);var _n="1.3.6.1.5.5.7",Rn=`${_n}.1`,Th=`${_n}.2`,Ii=`${_n}.3`,nl=`${_n}.48`,xk=`${Th}.1`,Ak=`${Th}.2`,nu=`${nl}.1`,iu=`${nl}.2`,ou=`${nl}.3`,au=`${nl}.5`,le="2.5.29";var su,il=`${Rn}.1`,zr=class{accessMethod="";accessLocation=new se;constructor(e={}){Object.assign(this,e)}};c([u({type:f.ObjectIdentifier})],zr.prototype,"accessMethod",void 0);c([u({type:se})],zr.prototype,"accessLocation",void 0);var _i=su=class extends q{constructor(e){super(e),Object.setPrototypeOf(this,su.prototype)}};_i=su=c([T({type:x.Sequence,itemType:zr})],_i);var Ja=`${le}.35`,Ri=class extends G{},Sr=class{keyIdentifier;authorityCertIssuer;authorityCertSerialNumber;constructor(e={}){e&&Object.assign(this,e)}};c([u({type:Ri,context:0,optional:!0,implicit:!0})],Sr.prototype,"keyIdentifier",void 0);c([u({type:se,context:1,optional:!0,implicit:!0,repeated:"sequence"})],Sr.prototype,"authorityCertIssuer",void 0);c([u({type:f.Integer,context:2,optional:!0,implicit:!0,converter:me})],Sr.prototype,"authorityCertSerialNumber",void 0);var _o=`${le}.19`,qr=class{cA=!1;pathLenConstraint;constructor(e={}){Object.assign(this,e)}};c([u({type:f.Boolean,defaultValue:!1})],qr.prototype,"cA",void 0);c([u({type:f.Integer,optional:!0})],qr.prototype,"pathLenConstraint",void 0);var cu,_e=cu=class extends q{constructor(e){super(e),Object.setPrototypeOf(this,cu.prototype)}};_e=cu=c([T({type:x.Sequence,itemType:se})],_e);var lu,Aw=`${le}.29`,Ih=lu=class extends _e{constructor(e){super(e),Object.setPrototypeOf(this,lu.prototype)}};Ih=lu=c([T({type:x.Sequence})],Ih);var du,al=`${le}.32`,Zk=`${al}.0`,Xr=class{ia5String;visibleString;bmpString;utf8String;constructor(e={}){Object.assign(this,e)}toString(){return this.ia5String||this.visibleString||this.bmpString||this.utf8String||""}};c([u({type:f.IA5String})],Xr.prototype,"ia5String",void 0);c([u({type:f.VisibleString})],Xr.prototype,"visibleString",void 0);c([u({type:f.BmpString})],Xr.prototype,"bmpString",void 0);c([u({type:f.Utf8String})],Xr.prototype,"utf8String",void 0);Xr=c([T({type:x.Choice})],Xr);var Ya=class{organization=new Xr;noticeNumbers=[];constructor(e={}){Object.assign(this,e)}};c([u({type:Xr})],Ya.prototype,"organization",void 0);c([u({type:f.Integer,repeated:"sequence"})],Ya.prototype,"noticeNumbers",void 0);var Qa=class{noticeRef;explicitText;constructor(e={}){Object.assign(this,e)}};c([u({type:Ya,optional:!0})],Qa.prototype,"noticeRef",void 0);c([u({type:Xr,optional:!0})],Qa.prototype,"explicitText",void 0);var ol=class{cPSuri;userNotice;constructor(e={}){Object.assign(this,e)}};c([u({type:f.IA5String})],ol.prototype,"cPSuri",void 0);c([u({type:Qa})],ol.prototype,"userNotice",void 0);ol=c([T({type:x.Choice})],ol);var Za=class{policyQualifierId="";qualifier=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};c([u({type:f.ObjectIdentifier})],Za.prototype,"policyQualifierId",void 0);c([u({type:f.Any})],Za.prototype,"qualifier",void 0);var Bi=class{policyIdentifier="";policyQualifiers;constructor(e={}){Object.assign(this,e)}};c([u({type:f.ObjectIdentifier})],Bi.prototype,"policyIdentifier",void 0);c([u({type:Za,repeated:"sequence",optional:!0})],Bi.prototype,"policyQualifiers",void 0);var es=du=class extends q{constructor(e){super(e),Object.setPrototypeOf(this,du.prototype)}};es=du=c([T({type:x.Sequence,itemType:Bi})],es);var sS=`${le}.20`,ts=class{value;constructor(e=0){this.value=e}};c([u({type:f.Integer})],ts.prototype,"value",void 0);ts=c([T({type:x.Choice})],ts);var mS=`${le}.27`,_h=class extends ts{};_h=c([T({type:x.Choice})],_h);var uu,sl=`${le}.31`,tr;(function(t){t[t.unused=1]="unused",t[t.keyCompromise=2]="keyCompromise",t[t.cACompromise=4]="cACompromise",t[t.affiliationChanged=8]="affiliationChanged",t[t.superseded=16]="superseded",t[t.cessationOfOperation=32]="cessationOfOperation",t[t.certificateHold=64]="certificateHold",t[t.privilegeWithdrawn=128]="privilegeWithdrawn",t[t.aACompromise=256]="aACompromise"})(tr||(tr={}));var rs=class extends jt{toJSON(){let e=[],r=this.toNumber();return r&tr.aACompromise&&e.push("aACompromise"),r&tr.affiliationChanged&&e.push("affiliationChanged"),r&tr.cACompromise&&e.push("cACompromise"),r&tr.certificateHold&&e.push("certificateHold"),r&tr.cessationOfOperation&&e.push("cessationOfOperation"),r&tr.keyCompromise&&e.push("keyCompromise"),r&tr.privilegeWithdrawn&&e.push("privilegeWithdrawn"),r&tr.superseded&&e.push("superseded"),r&tr.unused&&e.push("unused"),e}toString(){return`[${this.toJSON().join(", ")}]`}},Jr=class{fullName;nameRelativeToCRLIssuer;constructor(e={}){Object.assign(this,e)}};c([u({type:se,context:0,repeated:"sequence",implicit:!0})],Jr.prototype,"fullName",void 0);c([u({type:Tn,context:1,implicit:!0})],Jr.prototype,"nameRelativeToCRLIssuer",void 0);Jr=c([T({type:x.Choice})],Jr);var Cr=class{distributionPoint;reasons;cRLIssuer;constructor(e={}){Object.assign(this,e)}};c([u({type:Jr,context:0,optional:!0})],Cr.prototype,"distributionPoint",void 0);c([u({type:rs,context:1,optional:!0,implicit:!0})],Cr.prototype,"reasons",void 0);c([u({type:se,context:2,optional:!0,repeated:"sequence",implicit:!0})],Cr.prototype,"cRLIssuer",void 0);var Bn=uu=class extends q{constructor(e){super(e),Object.setPrototypeOf(this,uu.prototype)}};Bn=uu=c([T({type:x.Sequence,itemType:Cr})],Bn);var pu,_S=`${le}.46`,Rh=pu=class extends Bn{constructor(e){super(e),Object.setPrototypeOf(this,pu.prototype)}};Rh=pu=c([T({type:x.Sequence,itemType:Cr})],Rh);var DS=`${le}.28`,$t=class t{static ONLY=!1;distributionPoint;onlyContainsUserCerts=t.ONLY;onlyContainsCACerts=t.ONLY;onlySomeReasons;indirectCRL=t.ONLY;onlyContainsAttributeCerts=t.ONLY;constructor(e={}){Object.assign(this,e)}};c([u({type:Jr,context:0,optional:!0})],$t.prototype,"distributionPoint",void 0);c([u({type:f.Boolean,context:1,defaultValue:$t.ONLY,implicit:!0})],$t.prototype,"onlyContainsUserCerts",void 0);c([u({type:f.Boolean,context:2,defaultValue:$t.ONLY,implicit:!0})],$t.prototype,"onlyContainsCACerts",void 0);c([u({type:rs,context:3,optional:!0,implicit:!0})],$t.prototype,"onlySomeReasons",void 0);c([u({type:f.Boolean,context:4,defaultValue:$t.ONLY,implicit:!0})],$t.prototype,"indirectCRL",void 0);c([u({type:f.Boolean,context:5,defaultValue:$t.ONLY,implicit:!0})],$t.prototype,"onlyContainsAttributeCerts",void 0);var fu=`${le}.21`,ns;(function(t){t[t.unspecified=0]="unspecified",t[t.keyCompromise=1]="keyCompromise",t[t.cACompromise=2]="cACompromise",t[t.affiliationChanged=3]="affiliationChanged",t[t.superseded=4]="superseded",t[t.cessationOfOperation=5]="cessationOfOperation",t[t.certificateHold=6]="certificateHold",t[t.removeFromCRL=8]="removeFromCRL",t[t.privilegeWithdrawn=9]="privilegeWithdrawn",t[t.aACompromise=10]="aACompromise"})(ns||(ns={}));var Ro=class{reason=ns.unspecified;constructor(e=ns.unspecified){this.reason=e}toJSON(){return ns[this.reason]}toString(){return this.toJSON()}};c([u({type:f.Enumerated})],Ro.prototype,"reason",void 0);Ro=c([T({type:x.Choice})],Ro);var mu,Bo=`${le}.37`,Mi=mu=class extends q{constructor(e){super(e),Object.setPrototypeOf(this,mu.prototype)}};Mi=mu=c([T({type:x.Sequence,itemType:f.ObjectIdentifier})],Mi);var zS=`${Bo}.0`,Bh=`${Ii}.1`,Mh=`${Ii}.2`,Ph=`${Ii}.3`,Oh=`${Ii}.4`,Nh=`${Ii}.8`,Dh=`${Ii}.9`;var QS=`${le}.54`,hu=class{value;constructor(e=new ArrayBuffer(0)){this.value=e}};c([u({type:f.Integer,converter:me})],hu.prototype,"value",void 0);hu=c([T({type:x.Choice})],hu);var gu=`${le}.24`,Mo=class{value=new Date;constructor(e){e&&(this.value=e)}};c([u({type:f.GeneralizedTime})],Mo.prototype,"value",void 0);Mo=c([T({type:x.Choice})],Mo);var bu,yu=`${le}.18`,Lh=bu=class extends _e{constructor(e){super(e),Object.setPrototypeOf(this,bu.prototype)}};Lh=bu=c([T({type:x.Sequence})],Lh);var cl=`${le}.15`,rr;(function(t){t[t.digitalSignature=1]="digitalSignature",t[t.nonRepudiation=2]="nonRepudiation",t[t.keyEncipherment=4]="keyEncipherment",t[t.dataEncipherment=8]="dataEncipherment",t[t.keyAgreement=16]="keyAgreement",t[t.keyCertSign=32]="keyCertSign",t[t.cRLSign=64]="cRLSign",t[t.encipherOnly=128]="encipherOnly",t[t.decipherOnly=256]="decipherOnly"})(rr||(rr={}));var Po=class extends jt{toJSON(){let e=this.toNumber(),r=[];return e&rr.cRLSign&&r.push("crlSign"),e&rr.dataEncipherment&&r.push("dataEncipherment"),e&rr.decipherOnly&&r.push("decipherOnly"),e&rr.digitalSignature&&r.push("digitalSignature"),e&rr.encipherOnly&&r.push("encipherOnly"),e&rr.keyAgreement&&r.push("keyAgreement"),e&rr.keyCertSign&&r.push("keyCertSign"),e&rr.keyEncipherment&&r.push("keyEncipherment"),e&rr.nonRepudiation&&r.push("nonRepudiation"),r}toString(){return`[${this.toJSON().join(", ")}]`}};var vu,v2=`${le}.30`,Oo=class{base=new se;minimum=0;maximum;constructor(e={}){Object.assign(this,e)}};c([u({type:se})],Oo.prototype,"base",void 0);c([u({type:f.Integer,context:0,defaultValue:0,implicit:!0})],Oo.prototype,"minimum",void 0);c([u({type:f.Integer,context:1,optional:!0,implicit:!0})],Oo.prototype,"maximum",void 0);var ll=vu=class extends q{constructor(e){super(e),Object.setPrototypeOf(this,vu.prototype)}};ll=vu=c([T({type:x.Sequence,itemType:Oo})],ll);var dl=class{permittedSubtrees;excludedSubtrees;constructor(e={}){Object.assign(this,e)}};c([u({type:ll,context:0,optional:!0,implicit:!0})],dl.prototype,"permittedSubtrees",void 0);c([u({type:ll,context:1,optional:!0,implicit:!0})],dl.prototype,"excludedSubtrees",void 0);var S2=`${le}.36`,ul=class{requireExplicitPolicy;inhibitPolicyMapping;constructor(e={}){Object.assign(this,e)}};c([u({type:f.Integer,context:0,implicit:!0,optional:!0,converter:me})],ul.prototype,"requireExplicitPolicy",void 0);c([u({type:f.Integer,context:1,implicit:!0,optional:!0,converter:me})],ul.prototype,"inhibitPolicyMapping",void 0);var wu,R2=`${le}.33`,is=class{issuerDomainPolicy="";subjectDomainPolicy="";constructor(e={}){Object.assign(this,e)}};c([u({type:f.ObjectIdentifier})],is.prototype,"issuerDomainPolicy",void 0);c([u({type:f.ObjectIdentifier})],is.prototype,"subjectDomainPolicy",void 0);var jh=wu=class extends q{constructor(e){super(e),Object.setPrototypeOf(this,wu.prototype)}};jh=wu=c([T({type:x.Sequence,itemType:is})],jh);var xu,Do=`${le}.17`,No=xu=class extends _e{constructor(e){super(e),Object.setPrototypeOf(this,xu.prototype)}};No=xu=c([T({type:x.Sequence})],No);var Ye=class{type="";values=[];constructor(e={}){Object.assign(this,e)}};c([u({type:f.ObjectIdentifier})],Ye.prototype,"type",void 0);c([u({type:f.Any,repeated:"set"})],Ye.prototype,"values",void 0);var Au,F2=`${le}.9`,Hh=Au=class extends q{constructor(e){super(e),Object.setPrototypeOf(this,Au.prototype)}};Hh=Au=c([T({type:x.Sequence,itemType:Ye})],Hh);var pl=`${le}.14`,vt=class extends Ri{};var tC=`${le}.16`,fl=class{notBefore;notAfter;constructor(e={}){Object.assign(this,e)}};c([u({type:f.GeneralizedTime,context:0,implicit:!0,optional:!0})],fl.prototype,"notBefore",void 0);c([u({type:f.GeneralizedTime,context:1,implicit:!0,optional:!0})],fl.prototype,"notAfter",void 0);var os;(function(t){t[t.keyUpdateAllowed=1]="keyUpdateAllowed",t[t.newExtensions=2]="newExtensions",t[t.pKIXCertificate=4]="pKIXCertificate"})(os||(os={}));var ml=class extends jt{toJSON(){let e=[],r=this.toNumber();return r&os.pKIXCertificate&&e.push("pKIXCertificate"),r&os.newExtensions&&e.push("newExtensions"),r&os.keyUpdateAllowed&&e.push("keyUpdateAllowed"),e}toString(){return`[${this.toJSON().join(", ")}]`}},hl=class{entrustVers="";entrustInfoFlags=new ml;constructor(e={}){Object.assign(this,e)}};c([u({type:f.GeneralString})],hl.prototype,"entrustVers",void 0);c([u({type:ml})],hl.prototype,"entrustInfoFlags",void 0);var Eu,dC=`${Rn}.11`,Uh=Eu=class extends q{constructor(e){super(e),Object.setPrototypeOf(this,Eu.prototype)}};Uh=Eu=c([T({type:x.Sequence,itemType:zr})],Uh);var H=class t{algorithm="";parameters;constructor(e={}){Object.assign(this,e)}isEqual(e){return e instanceof t&&e.algorithm==this.algorithm&&(e.parameters&&this.parameters&&Wa(e.parameters,this.parameters)||e.parameters===this.parameters)}};c([u({type:f.ObjectIdentifier})],H.prototype,"algorithm",void 0);c([u({type:f.Any,optional:!0})],H.prototype,"parameters",void 0);var Xe=class{algorithm=new H;subjectPublicKey=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};c([u({type:H})],Xe.prototype,"algorithm",void 0);c([u({type:f.BitString})],Xe.prototype,"subjectPublicKey",void 0);var Be=class{utcTime;generalTime;constructor(e){if(e)if(typeof e=="string"||typeof e=="number"||e instanceof Date){let r=new Date(e);r.setMilliseconds(0),r.getUTCFullYear()>2049?this.generalTime=r:this.utcTime=r}else Object.assign(this,e)}getTime(){let e=this.utcTime||this.generalTime;if(!e)throw new Error("Cannot get time from CHOICE object");return e}};c([u({type:f.UTCTime})],Be.prototype,"utcTime",void 0);c([u({type:f.GeneralizedTime})],Be.prototype,"generalTime",void 0);Be=c([T({type:x.Choice})],Be);var Mn=class{notBefore=new Be(new Date);notAfter=new Be(new Date);constructor(e){e&&(this.notBefore=new Be(e.notBefore),this.notAfter=new Be(e.notAfter))}};c([u({type:Be})],Mn.prototype,"notBefore",void 0);c([u({type:Be})],Mn.prototype,"notAfter",void 0);var ku,pt=class t{static CRITICAL=!1;extnID="";critical=t.CRITICAL;extnValue=new G;constructor(e={}){Object.assign(this,e)}};c([u({type:f.ObjectIdentifier})],pt.prototype,"extnID",void 0);c([u({type:f.Boolean,defaultValue:pt.CRITICAL})],pt.prototype,"critical",void 0);c([u({type:G})],pt.prototype,"extnValue",void 0);var Gt=ku=class extends q{constructor(e){super(e),Object.setPrototypeOf(this,ku.prototype)}};Gt=ku=c([T({type:x.Sequence,itemType:pt})],Gt);var Yr;(function(t){t[t.v1=0]="v1",t[t.v2=1]="v2",t[t.v3=2]="v3"})(Yr||(Yr={}));var at=class{version=Yr.v1;serialNumber=new ArrayBuffer(0);signature=new H;issuer=new Ce;validity=new Mn;subject=new Ce;subjectPublicKeyInfo=new Xe;issuerUniqueID;subjectUniqueID;extensions;constructor(e={}){Object.assign(this,e)}};c([u({type:f.Integer,context:0,defaultValue:Yr.v1})],at.prototype,"version",void 0);c([u({type:f.Integer,converter:me})],at.prototype,"serialNumber",void 0);c([u({type:H})],at.prototype,"signature",void 0);c([u({type:Ce})],at.prototype,"issuer",void 0);c([u({type:Mn})],at.prototype,"validity",void 0);c([u({type:Ce})],at.prototype,"subject",void 0);c([u({type:Xe})],at.prototype,"subjectPublicKeyInfo",void 0);c([u({type:f.BitString,context:1,implicit:!0,optional:!0})],at.prototype,"issuerUniqueID",void 0);c([u({type:f.BitString,context:2,implicit:!0,optional:!0})],at.prototype,"subjectUniqueID",void 0);c([u({type:Gt,context:3,optional:!0})],at.prototype,"extensions",void 0);var Ne=class{tbsCertificate=new at;tbsCertificateRaw;signatureAlgorithm=new H;signatureValue=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};c([u({type:at,raw:!0})],Ne.prototype,"tbsCertificate",void 0);c([u({type:H})],Ne.prototype,"signatureAlgorithm",void 0);c([u({type:f.BitString})],Ne.prototype,"signatureValue",void 0);var nr=class{userCertificate=new ArrayBuffer(0);revocationDate=new Be;crlEntryExtensions;constructor(e={}){Object.assign(this,e)}};c([u({type:f.Integer,converter:me})],nr.prototype,"userCertificate",void 0);c([u({type:Be})],nr.prototype,"revocationDate",void 0);c([u({type:pt,optional:!0,repeated:"sequence"})],nr.prototype,"crlEntryExtensions",void 0);var Ct=class{version;signature=new H;issuer=new Ce;thisUpdate=new Be;nextUpdate;revokedCertificates;crlExtensions;constructor(e={}){Object.assign(this,e)}};c([u({type:f.Integer,optional:!0})],Ct.prototype,"version",void 0);c([u({type:H})],Ct.prototype,"signature",void 0);c([u({type:Ce})],Ct.prototype,"issuer",void 0);c([u({type:Be})],Ct.prototype,"thisUpdate",void 0);c([u({type:Be,optional:!0})],Ct.prototype,"nextUpdate",void 0);c([u({type:nr,repeated:"sequence",optional:!0})],Ct.prototype,"revokedCertificates",void 0);c([u({type:pt,optional:!0,context:0,repeated:"sequence"})],Ct.prototype,"crlExtensions",void 0);var Pn=class{tbsCertList=new Ct;tbsCertListRaw;signatureAlgorithm=new H;signature=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};c([u({type:Ct,raw:!0})],Pn.prototype,"tbsCertList",void 0);c([u({type:H})],Pn.prototype,"signatureAlgorithm",void 0);c([u({type:f.BitString})],Pn.prototype,"signature",void 0);var Gh={"2.5.4.6":"C","2.5.4.10":"O","2.5.4.11":"OU","2.5.4.3":"CN"};function Lo(t){let e=Ie.parse(t,Ne),r=e.tbsCertificate,n={combined:""};r.issuer.forEach(([a])=>{let s=Gh[a.type];s&&(n[s]=a.value.toString())}),n.combined=Vh(n);let i={combined:""};r.subject.forEach(([a])=>{let s=Gh[a.type];s&&(i[s]=a.value.toString())}),i.combined=Vh(i);let o=!1;if(r.extensions)for(let a of r.extensions)a.extnID===_o&&(o=Ie.parse(a.extnValue,qr).cA);return{issuer:n,subject:i,version:r.version,basicConstraintsCA:o,notBefore:r.validity.notBefore.getTime(),notAfter:r.validity.notAfter.getTime(),parsedCertificate:e}}function Vh(t){let e=[];return t.C&&e.push(t.C),t.O&&e.push(t.O),t.OU&&e.push(t.OU),t.CN&&e.push(t.CN),e.join(" : ")}var L8=ho(Su(),1);var U=ho(Pd());var ir=class{issuer=new Ce;serialNumber=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};c([u({type:Ce})],ir.prototype,"issuer",void 0);c([u({type:f.Integer,converter:me})],ir.prototype,"serialNumber",void 0);var Pi=class{subjectKeyIdentifier;issuerAndSerialNumber;constructor(e={}){Object.assign(this,e)}};c([u({type:vt,context:0,implicit:!0})],Pi.prototype,"subjectKeyIdentifier",void 0);c([u({type:ir})],Pi.prototype,"issuerAndSerialNumber",void 0);Pi=c([T({type:x.Choice})],Pi);var Je;(function(t){t[t.v0=0]="v0",t[t.v1=1]="v1",t[t.v2=2]="v2",t[t.v3=3]="v3",t[t.v4=4]="v4",t[t.v5=5]="v5"})(Je||(Je={}));var Oi=class extends H{};Oi=c([T({type:x.Sequence})],Oi);var as=class extends H{};as=c([T({type:x.Sequence})],as);var wt=class extends H{};wt=c([T({type:x.Sequence})],wt);var ss=class extends H{};ss=c([T({type:x.Sequence})],ss);var Kh=class extends H{};Kh=c([T({type:x.Sequence})],Kh);var gl=class extends H{};gl=c([T({type:x.Sequence})],gl);var or=class{attrType="";attrValues=[];constructor(e={}){Object.assign(this,e)}};c([u({type:f.ObjectIdentifier})],or.prototype,"attrType",void 0);c([u({type:f.Any,repeated:"set"})],or.prototype,"attrValues",void 0);var Cu,xt=class{version=Je.v0;sid=new Pi;digestAlgorithm=new Oi;signedAttrs;signedAttrsRaw;signatureAlgorithm=new as;signature=new G;unsignedAttrs;constructor(e={}){Object.assign(this,e)}};c([u({type:f.Integer})],xt.prototype,"version",void 0);c([u({type:Pi})],xt.prototype,"sid",void 0);c([u({type:Oi})],xt.prototype,"digestAlgorithm",void 0);c([u({type:or,repeated:"set",context:0,implicit:!0,optional:!0,raw:!0})],xt.prototype,"signedAttrs",void 0);c([u({type:as})],xt.prototype,"signatureAlgorithm",void 0);c([u({type:G})],xt.prototype,"signature",void 0);c([u({type:or,repeated:"set",context:1,implicit:!0,optional:!0})],xt.prototype,"unsignedAttrs",void 0);var cs=Cu=class extends q{constructor(e){super(e),Object.setPrototypeOf(this,Cu.prototype)}};cs=Cu=c([T({type:x.Set,itemType:xt})],cs);var Fh=class extends xt{};Fh=c([T({type:x.Sequence})],Fh);var zh=class extends Be{};zh=c([T({type:x.Choice})],zh);var ls=class{acIssuer=new se;acSerial=0;attrs=[];constructor(e={}){Object.assign(this,e)}};c([u({type:se})],ls.prototype,"acIssuer",void 0);c([u({type:f.Integer})],ls.prototype,"acSerial",void 0);c([u({type:Ye,repeated:"sequence"})],ls.prototype,"attrs",void 0);var Tu,ds=Tu=class extends q{constructor(e){super(e),Object.setPrototypeOf(this,Tu.prototype)}};ds=Tu=c([T({type:x.Sequence,itemType:f.ObjectIdentifier})],ds);var jo=class{pathLenConstraint;permittedAttrs;excludedAttrs;permitUnSpecified=!0;constructor(e={}){Object.assign(this,e)}};c([u({type:f.Integer,optional:!0})],jo.prototype,"pathLenConstraint",void 0);c([u({type:ds,implicit:!0,context:0,optional:!0})],jo.prototype,"permittedAttrs",void 0);c([u({type:ds,implicit:!0,context:1,optional:!0})],jo.prototype,"excludedAttrs",void 0);c([u({type:f.Boolean,defaultValue:!0})],jo.prototype,"permitUnSpecified",void 0);var Vt=class{issuer=new _e;serial=new ArrayBuffer(0);issuerUID=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};c([u({type:_e})],Vt.prototype,"issuer",void 0);c([u({type:f.Integer,converter:me})],Vt.prototype,"serial",void 0);c([u({type:f.BitString,optional:!0})],Vt.prototype,"issuerUID",void 0);var Iu;(function(t){t[t.publicKey=0]="publicKey",t[t.publicKeyCert=1]="publicKeyCert",t[t.otherObjectTypes=2]="otherObjectTypes"})(Iu||(Iu={}));var Wt=class{digestedObjectType=Iu.publicKey;otherObjectTypeID;digestAlgorithm=new H;objectDigest=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};c([u({type:f.Enumerated})],Wt.prototype,"digestedObjectType",void 0);c([u({type:f.ObjectIdentifier,optional:!0})],Wt.prototype,"otherObjectTypeID",void 0);c([u({type:H})],Wt.prototype,"digestAlgorithm",void 0);c([u({type:f.BitString})],Wt.prototype,"objectDigest",void 0);var Ni=class{issuerName;baseCertificateID;objectDigestInfo;constructor(e={}){Object.assign(this,e)}};c([u({type:_e,optional:!0})],Ni.prototype,"issuerName",void 0);c([u({type:Vt,context:0,implicit:!0,optional:!0})],Ni.prototype,"baseCertificateID",void 0);c([u({type:Wt,context:1,implicit:!0,optional:!0})],Ni.prototype,"objectDigestInfo",void 0);var Di=class{v1Form;v2Form;constructor(e={}){Object.assign(this,e)}};c([u({type:se,repeated:"sequence"})],Di.prototype,"v1Form",void 0);c([u({type:Ni,context:0,implicit:!0})],Di.prototype,"v2Form",void 0);Di=c([T({type:x.Choice})],Di);var Li=class{notBeforeTime=new Date;notAfterTime=new Date;constructor(e={}){Object.assign(this,e)}};c([u({type:f.GeneralizedTime})],Li.prototype,"notBeforeTime",void 0);c([u({type:f.GeneralizedTime})],Li.prototype,"notAfterTime",void 0);var On=class{baseCertificateID;entityName;objectDigestInfo;constructor(e={}){Object.assign(this,e)}};c([u({type:Vt,implicit:!0,context:0,optional:!0})],On.prototype,"baseCertificateID",void 0);c([u({type:_e,implicit:!0,context:1,optional:!0})],On.prototype,"entityName",void 0);c([u({type:Wt,implicit:!0,context:2,optional:!0})],On.prototype,"objectDigestInfo",void 0);var _u;(function(t){t[t.v2=1]="v2"})(_u||(_u={}));var At=class{version=_u.v2;holder=new On;issuer=new Di;signature=new H;serialNumber=new ArrayBuffer(0);attrCertValidityPeriod=new Li;attributes=[];issuerUniqueID;extensions;constructor(e={}){Object.assign(this,e)}};c([u({type:f.Integer})],At.prototype,"version",void 0);c([u({type:On})],At.prototype,"holder",void 0);c([u({type:Di})],At.prototype,"issuer",void 0);c([u({type:H})],At.prototype,"signature",void 0);c([u({type:f.Integer,converter:me})],At.prototype,"serialNumber",void 0);c([u({type:Li})],At.prototype,"attrCertValidityPeriod",void 0);c([u({type:Ye,repeated:"sequence"})],At.prototype,"attributes",void 0);c([u({type:f.BitString,optional:!0})],At.prototype,"issuerUniqueID",void 0);c([u({type:Gt,optional:!0})],At.prototype,"extensions",void 0);var ji=class{acinfo=new At;signatureAlgorithm=new H;signatureValue=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};c([u({type:At})],ji.prototype,"acinfo",void 0);c([u({type:H})],ji.prototype,"signatureAlgorithm",void 0);c([u({type:f.BitString})],ji.prototype,"signatureValue",void 0);var us;(function(t){t[t.unmarked=1]="unmarked",t[t.unclassified=2]="unclassified",t[t.restricted=4]="restricted",t[t.confidential=8]="confidential",t[t.secret=16]="secret",t[t.topSecret=32]="topSecret"})(us||(us={}));var Ho=class extends jt{};var Uo=class{type="";value=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};c([u({type:f.ObjectIdentifier,implicit:!0,context:0})],Uo.prototype,"type",void 0);c([u({type:f.Any,implicit:!0,context:1})],Uo.prototype,"value",void 0);var ps=class{policyId="";classList=new Ho(us.unclassified);securityCategories;constructor(e={}){Object.assign(this,e)}};c([u({type:f.ObjectIdentifier})],ps.prototype,"policyId",void 0);c([u({type:Ho,defaultValue:new Ho(us.unclassified)})],ps.prototype,"classList",void 0);c([u({type:Uo,repeated:"set"})],ps.prototype,"securityCategories",void 0);var $o=class{cotets;oid;string;constructor(e={}){Object.assign(this,e)}};c([u({type:G})],$o.prototype,"cotets",void 0);c([u({type:f.ObjectIdentifier})],$o.prototype,"oid",void 0);c([u({type:f.Utf8String})],$o.prototype,"string",void 0);var bl=class{policyAuthority;values=[];constructor(e={}){Object.assign(this,e)}};c([u({type:_e,implicit:!0,context:0,optional:!0})],bl.prototype,"policyAuthority",void 0);c([u({type:$o,repeated:"sequence"})],bl.prototype,"values",void 0);var oR=`${Rn}.4`,aR=`${Rn}.6`,sR=`${Rn}.10`,cR=`${le}.55`,fs=`${_n}.10`,lR=`${fs}.1`,dR=`${fs}.2`,uR=`${fs}.3`,pR=`${fs}.4`,fR=`${fs}.6`,Ru="2.5.4",mR=`${Ru}.72`;var Bu,Go=class{targetCertificate=new Vt;targetName;certDigestInfo;constructor(e={}){Object.assign(this,e)}};c([u({type:Vt})],Go.prototype,"targetCertificate",void 0);c([u({type:se,optional:!0})],Go.prototype,"targetName",void 0);c([u({type:Wt,optional:!0})],Go.prototype,"certDigestInfo",void 0);var Vo=class{targetName;targetGroup;targetCert;constructor(e={}){Object.assign(this,e)}};c([u({type:se,context:0,implicit:!0})],Vo.prototype,"targetName",void 0);c([u({type:se,context:1,implicit:!0})],Vo.prototype,"targetGroup",void 0);c([u({type:Go,context:2,implicit:!0})],Vo.prototype,"targetCert",void 0);Vo=c([T({type:x.Choice})],Vo);var yl=Bu=class extends q{constructor(e){super(e),Object.setPrototypeOf(this,Bu.prototype)}};yl=Bu=c([T({type:x.Sequence,itemType:Vo})],yl);var Mu,qh=Mu=class extends q{constructor(e){super(e),Object.setPrototypeOf(this,Mu.prototype)}};qh=Mu=c([T({type:x.Sequence,itemType:yl})],qh);var vl=class{roleAuthority;roleName;constructor(e={}){Object.assign(this,e)}};c([u({type:_e,implicit:!0,context:0,optional:!0})],vl.prototype,"roleAuthority",void 0);c([u({type:se,implicit:!0,context:1})],vl.prototype,"roleName",void 0);var ms=class{service=new se;ident=new se;authInfo;constructor(e={}){Object.assign(this,e)}};c([u({type:se})],ms.prototype,"service",void 0);c([u({type:se})],ms.prototype,"ident",void 0);c([u({type:G,optional:!0})],ms.prototype,"authInfo",void 0);var Pu,hs=class{otherCertFormat="";otherCert=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};c([u({type:f.ObjectIdentifier})],hs.prototype,"otherCertFormat",void 0);c([u({type:f.Any})],hs.prototype,"otherCert",void 0);var Nn=class{certificate;v2AttrCert;other;constructor(e={}){Object.assign(this,e)}};c([u({type:Ne})],Nn.prototype,"certificate",void 0);c([u({type:ji,context:2,implicit:!0})],Nn.prototype,"v2AttrCert",void 0);c([u({type:hs,context:3,implicit:!0})],Nn.prototype,"other",void 0);Nn=c([T({type:x.Choice})],Nn);var Dn=Pu=class extends q{constructor(e){super(e),Object.setPrototypeOf(this,Pu.prototype)}};Dn=Pu=c([T({type:x.Set,itemType:Nn})],Dn);var ft=class{contentType="";content=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};c([u({type:f.ObjectIdentifier})],ft.prototype,"contentType",void 0);c([u({type:f.Any,context:0})],ft.prototype,"content",void 0);var Hi=class{single;any;constructor(e={}){Object.assign(this,e)}};c([u({type:G})],Hi.prototype,"single",void 0);c([u({type:f.Any})],Hi.prototype,"any",void 0);Hi=c([T({type:x.Choice})],Hi);var Ui=class{eContentType="";eContent;constructor(e={}){Object.assign(this,e)}};c([u({type:f.ObjectIdentifier})],Ui.prototype,"eContentType",void 0);c([u({type:Hi,context:0,optional:!0})],Ui.prototype,"eContent",void 0);var gs=class{value;constructedValue;constructor(e={}){Object.assign(this,e)}};c([u({type:G,context:0,implicit:!0,optional:!0})],gs.prototype,"value",void 0);c([u({type:G,converter:Sh,context:0,implicit:!0,optional:!0,repeated:"sequence"})],gs.prototype,"constructedValue",void 0);gs=c([T({type:x.Choice})],gs);var Ln=class{contentType="";contentEncryptionAlgorithm=new ss;encryptedContent;constructor(e={}){Object.assign(this,e)}};c([u({type:f.ObjectIdentifier})],Ln.prototype,"contentType",void 0);c([u({type:ss})],Ln.prototype,"contentEncryptionAlgorithm",void 0);c([u({type:gs,optional:!0})],Ln.prototype,"encryptedContent",void 0);var jn=class{keyAttrId="";keyAttr;constructor(e={}){Object.assign(this,e)}};c([u({type:f.ObjectIdentifier})],jn.prototype,"keyAttrId",void 0);c([u({type:f.Any,optional:!0})],jn.prototype,"keyAttr",void 0);var Ou,Wo=class{subjectKeyIdentifier=new vt;date;other;constructor(e={}){Object.assign(this,e)}};c([u({type:vt})],Wo.prototype,"subjectKeyIdentifier",void 0);c([u({type:f.GeneralizedTime,optional:!0})],Wo.prototype,"date",void 0);c([u({type:jn,optional:!0})],Wo.prototype,"other",void 0);var Ko=class{rKeyId;issuerAndSerialNumber;constructor(e={}){Object.assign(this,e)}};c([u({type:Wo,context:0,implicit:!0,optional:!0})],Ko.prototype,"rKeyId",void 0);c([u({type:ir,optional:!0})],Ko.prototype,"issuerAndSerialNumber",void 0);Ko=c([T({type:x.Choice})],Ko);var bs=class{rid=new Ko;encryptedKey=new G;constructor(e={}){Object.assign(this,e)}};c([u({type:Ko})],bs.prototype,"rid",void 0);c([u({type:G})],bs.prototype,"encryptedKey",void 0);var wl=Ou=class extends q{constructor(e){super(e),Object.setPrototypeOf(this,Ou.prototype)}};wl=Ou=c([T({type:x.Sequence,itemType:bs})],wl);var ys=class{algorithm=new H;publicKey=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};c([u({type:H})],ys.prototype,"algorithm",void 0);c([u({type:f.BitString})],ys.prototype,"publicKey",void 0);var $i=class{subjectKeyIdentifier;originatorKey;issuerAndSerialNumber;constructor(e={}){Object.assign(this,e)}};c([u({type:vt,context:0,implicit:!0,optional:!0})],$i.prototype,"subjectKeyIdentifier",void 0);c([u({type:ys,context:1,implicit:!0,optional:!0})],$i.prototype,"originatorKey",void 0);c([u({type:ir,optional:!0})],$i.prototype,"issuerAndSerialNumber",void 0);$i=c([T({type:x.Choice})],$i);var Qr=class{version=Je.v3;originator=new $i;ukm;keyEncryptionAlgorithm=new wt;recipientEncryptedKeys=new wl;constructor(e={}){Object.assign(this,e)}};c([u({type:f.Integer})],Qr.prototype,"version",void 0);c([u({type:$i,context:0})],Qr.prototype,"originator",void 0);c([u({type:G,context:1,optional:!0})],Qr.prototype,"ukm",void 0);c([u({type:wt})],Qr.prototype,"keyEncryptionAlgorithm",void 0);c([u({type:wl})],Qr.prototype,"recipientEncryptedKeys",void 0);var Fo=class{subjectKeyIdentifier;issuerAndSerialNumber;constructor(e={}){Object.assign(this,e)}};c([u({type:vt,context:0,implicit:!0})],Fo.prototype,"subjectKeyIdentifier",void 0);c([u({type:ir})],Fo.prototype,"issuerAndSerialNumber",void 0);Fo=c([T({type:x.Choice})],Fo);var Hn=class{version=Je.v0;rid=new Fo;keyEncryptionAlgorithm=new wt;encryptedKey=new G;constructor(e={}){Object.assign(this,e)}};c([u({type:f.Integer})],Hn.prototype,"version",void 0);c([u({type:Fo})],Hn.prototype,"rid",void 0);c([u({type:wt})],Hn.prototype,"keyEncryptionAlgorithm",void 0);c([u({type:G})],Hn.prototype,"encryptedKey",void 0);var Gi=class{keyIdentifier=new G;date;other;constructor(e={}){Object.assign(this,e)}};c([u({type:G})],Gi.prototype,"keyIdentifier",void 0);c([u({type:f.GeneralizedTime,optional:!0})],Gi.prototype,"date",void 0);c([u({type:jn,optional:!0})],Gi.prototype,"other",void 0);var Un=class{version=Je.v4;kekid=new Gi;keyEncryptionAlgorithm=new wt;encryptedKey=new G;constructor(e={}){Object.assign(this,e)}};c([u({type:f.Integer})],Un.prototype,"version",void 0);c([u({type:Gi})],Un.prototype,"kekid",void 0);c([u({type:wt})],Un.prototype,"keyEncryptionAlgorithm",void 0);c([u({type:G})],Un.prototype,"encryptedKey",void 0);var $n=class{version=Je.v0;keyDerivationAlgorithm;keyEncryptionAlgorithm=new wt;encryptedKey=new G;constructor(e={}){Object.assign(this,e)}};c([u({type:f.Integer})],$n.prototype,"version",void 0);c([u({type:gl,context:0,optional:!0})],$n.prototype,"keyDerivationAlgorithm",void 0);c([u({type:wt})],$n.prototype,"keyEncryptionAlgorithm",void 0);c([u({type:G})],$n.prototype,"encryptedKey",void 0);var vs=class{oriType="";oriValue=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};c([u({type:f.ObjectIdentifier})],vs.prototype,"oriType",void 0);c([u({type:f.Any})],vs.prototype,"oriValue",void 0);var Zr=class{ktri;kari;kekri;pwri;ori;constructor(e={}){Object.assign(this,e)}};c([u({type:Hn,optional:!0})],Zr.prototype,"ktri",void 0);c([u({type:Qr,context:1,implicit:!0,optional:!0})],Zr.prototype,"kari",void 0);c([u({type:Un,context:2,implicit:!0,optional:!0})],Zr.prototype,"kekri",void 0);c([u({type:$n,context:3,implicit:!0,optional:!0})],Zr.prototype,"pwri",void 0);c([u({type:vs,context:4,implicit:!0,optional:!0})],Zr.prototype,"ori",void 0);Zr=c([T({type:x.Choice})],Zr);var Nu,ws=Nu=class extends q{constructor(e){super(e),Object.setPrototypeOf(this,Nu.prototype)}};ws=Nu=c([T({type:x.Set,itemType:Zr})],ws);var Du,Xh=`${_n}.16`,fM=`${Xh}.2`,mM=`${Xh}.4`,zo=class{otherRevInfoFormat="";otherRevInfo=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};c([u({type:f.ObjectIdentifier})],zo.prototype,"otherRevInfoFormat",void 0);c([u({type:f.Any})],zo.prototype,"otherRevInfo",void 0);var xl=class{other=new zo;constructor(e={}){Object.assign(this,e)}};c([u({type:zo,context:1,implicit:!0})],xl.prototype,"other",void 0);xl=c([T({type:x.Choice})],xl);var qo=Du=class extends q{constructor(e){super(e),Object.setPrototypeOf(this,Du.prototype)}};qo=Du=c([T({type:x.Set,itemType:xl})],qo);var Xo=class{certs;crls;constructor(e={}){Object.assign(this,e)}};c([u({type:Dn,context:0,implicit:!0,optional:!0})],Xo.prototype,"certs",void 0);c([u({type:qo,context:1,implicit:!0,optional:!0})],Xo.prototype,"crls",void 0);var Lu,ju=Lu=class extends q{constructor(e){super(e),Object.setPrototypeOf(this,Lu.prototype)}};ju=Lu=c([T({type:x.Set,itemType:or})],ju);var Vi=class{version=Je.v0;originatorInfo;recipientInfos=new ws;encryptedContentInfo=new Ln;unprotectedAttrs;constructor(e={}){Object.assign(this,e)}};c([u({type:f.Integer})],Vi.prototype,"version",void 0);c([u({type:Xo,context:0,implicit:!0,optional:!0})],Vi.prototype,"originatorInfo",void 0);c([u({type:ws})],Vi.prototype,"recipientInfos",void 0);c([u({type:Ln})],Vi.prototype,"encryptedContentInfo",void 0);c([u({type:ju,context:1,implicit:!0,optional:!0})],Vi.prototype,"unprotectedAttrs",void 0);var Jh="1.2.840.113549.1.7.1",Al="1.2.840.113549.1.7.2";var Hu,El=Hu=class extends q{constructor(e){super(e),Object.setPrototypeOf(this,Hu.prototype)}};El=Hu=c([T({type:x.Set,itemType:Oi})],El);var Kt=class{version=Je.v0;digestAlgorithms=new El;encapContentInfo=new Ui;certificates;crls;signerInfos=new cs;constructor(e={}){Object.assign(this,e)}};c([u({type:f.Integer})],Kt.prototype,"version",void 0);c([u({type:El})],Kt.prototype,"digestAlgorithms",void 0);c([u({type:Ui})],Kt.prototype,"encapContentInfo",void 0);c([u({type:Dn,context:0,implicit:!0,optional:!0})],Kt.prototype,"certificates",void 0);c([u({type:qo,context:1,implicit:!0,optional:!0})],Kt.prototype,"crls",void 0);c([u({type:cs})],Kt.prototype,"signerInfos",void 0);var en="1.2.840.10045.2.1";var xs="1.2.840.10045.4.1",kl="1.2.840.10045.4.3.1",Wi="1.2.840.10045.4.3.2",Ki="1.2.840.10045.4.3.3",Fi="1.2.840.10045.4.3.4";var As="1.2.840.10045.3.1.7";var Es="1.3.132.0.34";var Uu="1.3.132.0.35";function ks(t){return new H({algorithm:t})}var Qh=ks(xs),d5=ks(kl),Zh=ks(Wi),eg=ks(Ki),tg=ks(Fi);var Ss=class{fieldType;parameters;constructor(e={}){Object.assign(this,e)}};c([u({type:f.ObjectIdentifier})],Ss.prototype,"fieldType",void 0);c([u({type:f.Any})],Ss.prototype,"parameters",void 0);Ss=c([T({type:x.Sequence})],Ss);var $u=class extends G{};var Jo=class{a;b;seed;constructor(e={}){Object.assign(this,e)}};c([u({type:f.OctetString})],Jo.prototype,"a",void 0);c([u({type:f.OctetString})],Jo.prototype,"b",void 0);c([u({type:f.BitString,optional:!0})],Jo.prototype,"seed",void 0);Jo=c([T({type:x.Sequence})],Jo);var Gu;(function(t){t[t.ecpVer1=1]="ecpVer1"})(Gu||(Gu={}));var Tr=class{version=Gu.ecpVer1;fieldID;curve;base;order;cofactor;constructor(e={}){Object.assign(this,e)}};c([u({type:f.Integer})],Tr.prototype,"version",void 0);c([u({type:Ss})],Tr.prototype,"fieldID",void 0);c([u({type:Jo})],Tr.prototype,"curve",void 0);c([u({type:$u})],Tr.prototype,"base",void 0);c([u({type:f.Integer,converter:me})],Tr.prototype,"order",void 0);c([u({type:f.Integer,optional:!0})],Tr.prototype,"cofactor",void 0);Tr=c([T({type:x.Sequence})],Tr);var Ft=class{namedCurve;implicitCurve;specifiedCurve;constructor(e={}){Object.assign(this,e)}};c([u({type:f.ObjectIdentifier})],Ft.prototype,"namedCurve",void 0);c([u({type:f.Null})],Ft.prototype,"implicitCurve",void 0);c([u({type:Tr})],Ft.prototype,"specifiedCurve",void 0);Ft=c([T({type:x.Choice})],Ft);var Yo=class{version=1;privateKey=new G;parameters;publicKey;constructor(e={}){Object.assign(this,e)}};c([u({type:f.Integer})],Yo.prototype,"version",void 0);c([u({type:G})],Yo.prototype,"privateKey",void 0);c([u({type:Ft,context:0,optional:!0})],Yo.prototype,"parameters",void 0);c([u({type:f.BitString,context:1,optional:!0})],Yo.prototype,"publicKey",void 0);var tn=class{r=new ArrayBuffer(0);s=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};c([u({type:f.Integer,converter:me})],tn.prototype,"r",void 0);c([u({type:f.Integer,converter:me})],tn.prototype,"s",void 0);var Et="1.2.840.113549.1.1",zt=`${Et}.1`,rg=`${Et}.7`,ng=`${Et}.9`,Gn=`${Et}.10`,ig=`${Et}.2`,og=`${Et}.4`,Vn=`${Et}.5`,ag=`${Et}.14`;var Qo=`${Et}.11`,Wn=`${Et}.12`,Kn=`${Et}.13`,Vu=`${Et}.15`,Wu=`${Et}.16`,zi="1.3.14.3.2.26",Sl="2.16.840.1.101.3.4.2.4",qi="2.16.840.1.101.3.4.2.1",Xi="2.16.840.1.101.3.4.2.2",Ji="2.16.840.1.101.3.4.2.3",sg="2.16.840.1.101.3.4.2.5",cg="2.16.840.1.101.3.4.2.6",lg="1.2.840.113549.2.2",dg="1.2.840.113549.2.5",Fn=`${Et}.8`;function Fe(t){return new H({algorithm:t,parameters:null})}var j5=Fe(lg),H5=Fe(dg),rn=Fe(zi),U5=Fe(Sl),$5=Fe(qi),G5=Fe(Xi),V5=Fe(Ji),W5=Fe(sg),K5=Fe(cg),Cl=new H({algorithm:Fn,parameters:$.serialize(rn)}),Ku=new H({algorithm:ng,parameters:$.serialize(To.toASN(new Uint8Array([218,57,163,238,94,107,75,13,50,85,191,239,149,96,24,144,175,216,7,9]).buffer))}),F5=Fe(zt),z5=Fe(ig),q5=Fe(og),X5=Fe(Vn),J5=Fe(Vu),Y5=Fe(Wu),Q5=Fe(Wn),Z5=Fe(Kn),eP=Fe(Vu),tP=Fe(Wu);var Zo=class{hashAlgorithm=new H(rn);maskGenAlgorithm=new H({algorithm:Fn,parameters:$.serialize(rn)});pSourceAlgorithm=new H(Ku);constructor(e={}){Object.assign(this,e)}};c([u({type:H,context:0,defaultValue:rn})],Zo.prototype,"hashAlgorithm",void 0);c([u({type:H,context:1,defaultValue:Cl})],Zo.prototype,"maskGenAlgorithm",void 0);c([u({type:H,context:2,defaultValue:Ku})],Zo.prototype,"pSourceAlgorithm",void 0);var cP=new H({algorithm:rg,parameters:$.serialize(new Zo)});var Ir=class{hashAlgorithm=new H(rn);maskGenAlgorithm=new H({algorithm:Fn,parameters:$.serialize(rn)});saltLength=20;trailerField=1;constructor(e={}){Object.assign(this,e)}};c([u({type:H,context:0,defaultValue:rn})],Ir.prototype,"hashAlgorithm",void 0);c([u({type:H,context:1,defaultValue:Cl})],Ir.prototype,"maskGenAlgorithm",void 0);c([u({type:f.Integer,context:2,defaultValue:20})],Ir.prototype,"saltLength",void 0);c([u({type:f.Integer,context:3,defaultValue:1})],Ir.prototype,"trailerField",void 0);var hP=new H({algorithm:Gn,parameters:$.serialize(new Ir)});var Yi=class{digestAlgorithm=new H;digest=new G;constructor(e={}){Object.assign(this,e)}};c([u({type:H})],Yi.prototype,"digestAlgorithm",void 0);c([u({type:G})],Yi.prototype,"digest",void 0);var Fu,ea=class{prime=new ArrayBuffer(0);exponent=new ArrayBuffer(0);coefficient=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};c([u({type:f.Integer,converter:me})],ea.prototype,"prime",void 0);c([u({type:f.Integer,converter:me})],ea.prototype,"exponent",void 0);c([u({type:f.Integer,converter:me})],ea.prototype,"coefficient",void 0);var Tl=Fu=class extends q{constructor(e){super(e),Object.setPrototypeOf(this,Fu.prototype)}};Tl=Fu=c([T({type:x.Sequence,itemType:ea})],Tl);var qt=class{version=0;modulus=new ArrayBuffer(0);publicExponent=new ArrayBuffer(0);privateExponent=new ArrayBuffer(0);prime1=new ArrayBuffer(0);prime2=new ArrayBuffer(0);exponent1=new ArrayBuffer(0);exponent2=new ArrayBuffer(0);coefficient=new ArrayBuffer(0);otherPrimeInfos;constructor(e={}){Object.assign(this,e)}};c([u({type:f.Integer})],qt.prototype,"version",void 0);c([u({type:f.Integer,converter:me})],qt.prototype,"modulus",void 0);c([u({type:f.Integer,converter:me})],qt.prototype,"publicExponent",void 0);c([u({type:f.Integer,converter:me})],qt.prototype,"privateExponent",void 0);c([u({type:f.Integer,converter:me})],qt.prototype,"prime1",void 0);c([u({type:f.Integer,converter:me})],qt.prototype,"prime2",void 0);c([u({type:f.Integer,converter:me})],qt.prototype,"exponent1",void 0);c([u({type:f.Integer,converter:me})],qt.prototype,"exponent2",void 0);c([u({type:f.Integer,converter:me})],qt.prototype,"coefficient",void 0);c([u({type:Tl,optional:!0})],qt.prototype,"otherPrimeInfos",void 0);var zn=class{modulus=new ArrayBuffer(0);publicExponent=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};c([u({type:f.Integer,converter:me})],zn.prototype,"modulus",void 0);c([u({type:f.Integer,converter:me})],zn.prototype,"publicExponent",void 0);var zu;(function(t){t[t.Transient=0]="Transient",t[t.Singleton=1]="Singleton",t[t.ResolutionScoped=2]="ResolutionScoped",t[t.ContainerScoped=3]="ContainerScoped"})(zu||(zu={}));var Qe=zu;var qu=function(t,e){return qu=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,n){r.__proto__=n}||function(r,n){for(var i in n)n.hasOwnProperty(i)&&(r[i]=n[i])},qu(t,e)};function Cs(t,e){qu(t,e);function r(){this.constructor=t}t.prototype=e===null?Object.create(e):(r.prototype=e.prototype,new r)}function ug(t,e,r,n){function i(o){return o instanceof r?o:new r(function(a){a(o)})}return new(r||(r=Promise))(function(o,a){function s(p){try{d(n.next(p))}catch(m){a(m)}}function l(p){try{d(n.throw(p))}catch(m){a(m)}}function d(p){p.done?o(p.value):i(p.value).then(s,l)}d((n=n.apply(t,e||[])).next())})}function pg(t,e){var r={label:0,sent:function(){if(o[0]&1)throw o[1];return o[1]},trys:[],ops:[]},n,i,o,a;return a={next:s(0),throw:s(1),return:s(2)},typeof Symbol=="function"&&(a[Symbol.iterator]=function(){return this}),a;function s(d){return function(p){return l([d,p])}}function l(d){if(n)throw new TypeError("Generator is already executing.");for(;r;)try{if(n=1,i&&(o=d[0]&2?i.return:d[0]?i.throw||((o=i.return)&&o.call(i),0):i.next)&&!(o=o.call(i,d[1])).done)return o;switch(i=0,o&&(d=[d[0]&2,o.value]),d[0]){case 0:case 1:o=d;break;case 4:return r.label++,{value:d[1],done:!1};case 5:r.label++,i=d[1],d=[0];continue;case 7:d=r.ops.pop(),r.trys.pop();continue;default:if(o=r.trys,!(o=o.length>0&&o[o.length-1])&&(d[0]===6||d[0]===2)){r=0;continue}if(d[0]===3&&(!o||d[1]>o[0]&&d[1]<o[3])){r.label=d[1];break}if(d[0]===6&&r.label<o[1]){r.label=o[1],o=d;break}if(o&&r.label<o[2]){r.label=o[2],r.ops.push(d);break}o[2]&&r.ops.pop(),r.trys.pop();continue}d=e.call(t,r)}catch(p){d=[6,p],i=0}finally{n=o=0}if(d[0]&5)throw d[1];return{value:d[0]?d[1]:void 0,done:!0}}}function Ts(t){var e=typeof Symbol=="function"&&Symbol.iterator,r=e&&t[e],n=0;if(r)return r.call(t);if(t&&typeof t.length=="number")return{next:function(){return t&&n>=t.length&&(t=void 0),{value:t&&t[n++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function ta(t,e){var r=typeof Symbol=="function"&&t[Symbol.iterator];if(!r)return t;var n=r.call(t),i,o=[],a;try{for(;(e===void 0||e-- >0)&&!(i=n.next()).done;)o.push(i.value)}catch(s){a={error:s}}finally{try{i&&!i.done&&(r=n.return)&&r.call(n)}finally{if(a)throw a.error}}return o}function _r(){for(var t=[],e=0;e<arguments.length;e++)t=t.concat(ta(arguments[e]));return t}var Iw="injectionTokens";function Xu(t){var e=Reflect.getMetadata("design:paramtypes",t)||[],r=Reflect.getOwnMetadata(Iw,t)||{};return Object.keys(r).forEach(function(n){e[+n]=r[n]}),e}function Is(t){return!!t.useClass}function ra(t){return!!t.useFactory}var Il=(function(){function t(e){this.wrap=e,this.reflectMethods=["get","getPrototypeOf","setPrototypeOf","getOwnPropertyDescriptor","defineProperty","has","set","deleteProperty","apply","construct","ownKeys"]}return t.prototype.createProxy=function(e){var r=this,n={},i=!1,o,a=function(){return i||(o=e(r.wrap()),i=!0),o};return new Proxy(n,this.createHandler(a))},t.prototype.createHandler=function(e){var r={},n=function(i){r[i]=function(){for(var o=[],a=0;a<arguments.length;a++)o[a]=arguments[a];o[0]=e();var s=Reflect[i];return s.apply(void 0,_r(o))}};return this.reflectMethods.forEach(n),r},t})();function qn(t){return typeof t=="string"||typeof t=="symbol"}function Ju(t){return typeof t=="object"&&"token"in t&&"multiple"in t}function _l(t){return typeof t=="object"&&"token"in t&&"transform"in t}function fg(t){return typeof t=="function"||t instanceof Il}function Qi(t){return!!t.useToken}function Zi(t){return t.useValue!=null}function mg(t){return Is(t)||Zi(t)||Qi(t)||ra(t)}var _w=(function(){function t(){this._registryMap=new Map}return t.prototype.entries=function(){return this._registryMap.entries()},t.prototype.getAll=function(e){return this.ensure(e),this._registryMap.get(e)},t.prototype.get=function(e){this.ensure(e);var r=this._registryMap.get(e);return r[r.length-1]||null},t.prototype.set=function(e,r){this.ensure(e),this._registryMap.get(e).push(r)},t.prototype.setAll=function(e,r){this._registryMap.set(e,r)},t.prototype.has=function(e){return this.ensure(e),this._registryMap.get(e).length>0},t.prototype.clear=function(){this._registryMap.clear()},t.prototype.ensure=function(e){this._registryMap.has(e)||this._registryMap.set(e,[])},t})(),_s=_w;var Rw=(function(t){Cs(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e})(_s),hg=Rw;var Bw=(function(){function t(){this.scopedResolutions=new Map}return t})(),Rs=Bw;function Mw(t,e){if(t===null)return"at position #"+e;var r=t.split(",")[e].trim();return'"'+r+'" at position #'+e}function Pw(t,e,r){return r===void 0&&(r="    "),_r([t],e.message.split(`
`).map(function(n){return r+n})).join(`
`)}function Yu(t,e,r){var n=ta(t.toString().match(/constructor\(([\w, ]+)\)/)||[],2),i=n[1],o=i===void 0?null:i,a=Mw(o,e);return Pw("Cannot inject the dependency "+a+' of "'+t.name+'" constructor. Reason:',r)}function gg(t){if(typeof t.dispose!="function")return!1;var e=t.dispose;return!(e.length>0)}var Ow=(function(t){Cs(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e})(_s);var Nw=(function(t){Cs(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e})(_s);var Dw=(function(){function t(){this.preResolution=new Ow,this.postResolution=new Nw}return t})(),bg=Dw;var Qu=new Map,Lw=(function(){function t(e){this.parent=e,this._registry=new hg,this.interceptors=new bg,this.disposed=!1,this.disposables=new Set}return t.prototype.register=function(e,r,n){n===void 0&&(n={lifecycle:Qe.Transient}),this.ensureNotDisposed();var i;if(mg(r)?i=r:i={useClass:r},Qi(i))for(var o=[e],a=i;a!=null;){var s=a.useToken;if(o.includes(s))throw new Error("Token registration cycle detected! "+_r(o,[s]).join(" -> "));o.push(s);var l=this._registry.get(s);l&&Qi(l.provider)?a=l.provider:a=null}if((n.lifecycle===Qe.Singleton||n.lifecycle==Qe.ContainerScoped||n.lifecycle==Qe.ResolutionScoped)&&(Zi(i)||ra(i)))throw new Error('Cannot use lifecycle "'+Qe[n.lifecycle]+'" with ValueProviders or FactoryProviders');return this._registry.set(e,{provider:i,options:n}),this},t.prototype.registerType=function(e,r){return this.ensureNotDisposed(),qn(r)?this.register(e,{useToken:r}):this.register(e,{useClass:r})},t.prototype.registerInstance=function(e,r){return this.ensureNotDisposed(),this.register(e,{useValue:r})},t.prototype.registerSingleton=function(e,r){if(this.ensureNotDisposed(),qn(e)){if(qn(r))return this.register(e,{useToken:r},{lifecycle:Qe.Singleton});if(r)return this.register(e,{useClass:r},{lifecycle:Qe.Singleton});throw new Error('Cannot register a type name as a singleton without a "to" token')}var n=e;return r&&!qn(r)&&(n=r),this.register(e,{useClass:n},{lifecycle:Qe.Singleton})},t.prototype.resolve=function(e,r,n){r===void 0&&(r=new Rs),n===void 0&&(n=!1),this.ensureNotDisposed();var i=this.getRegistration(e);if(!i&&qn(e)){if(n)return;throw new Error('Attempted to resolve unregistered dependency token: "'+e.toString()+'"')}if(this.executePreResolutionInterceptor(e,"Single"),i){var o=this.resolveRegistration(i,r);return this.executePostResolutionInterceptor(e,o,"Single"),o}if(fg(e)){var o=this.construct(e,r);return this.executePostResolutionInterceptor(e,o,"Single"),o}throw new Error("Attempted to construct an undefined constructor. Could mean a circular dependency problem. Try using `delay` function.")},t.prototype.executePreResolutionInterceptor=function(e,r){var n,i;if(this.interceptors.preResolution.has(e)){var o=[];try{for(var a=Ts(this.interceptors.preResolution.getAll(e)),s=a.next();!s.done;s=a.next()){var l=s.value;l.options.frequency!="Once"&&o.push(l),l.callback(e,r)}}catch(d){n={error:d}}finally{try{s&&!s.done&&(i=a.return)&&i.call(a)}finally{if(n)throw n.error}}this.interceptors.preResolution.setAll(e,o)}},t.prototype.executePostResolutionInterceptor=function(e,r,n){var i,o;if(this.interceptors.postResolution.has(e)){var a=[];try{for(var s=Ts(this.interceptors.postResolution.getAll(e)),l=s.next();!l.done;l=s.next()){var d=l.value;d.options.frequency!="Once"&&a.push(d),d.callback(e,r,n)}}catch(p){i={error:p}}finally{try{l&&!l.done&&(o=s.return)&&o.call(s)}finally{if(i)throw i.error}}this.interceptors.postResolution.setAll(e,a)}},t.prototype.resolveRegistration=function(e,r){if(this.ensureNotDisposed(),e.options.lifecycle===Qe.ResolutionScoped&&r.scopedResolutions.has(e))return r.scopedResolutions.get(e);var n=e.options.lifecycle===Qe.Singleton,i=e.options.lifecycle===Qe.ContainerScoped,o=n||i,a;return Zi(e.provider)?a=e.provider.useValue:Qi(e.provider)?a=o?e.instance||(e.instance=this.resolve(e.provider.useToken,r)):this.resolve(e.provider.useToken,r):Is(e.provider)?a=o?e.instance||(e.instance=this.construct(e.provider.useClass,r)):this.construct(e.provider.useClass,r):ra(e.provider)?a=e.provider.useFactory(this):a=this.construct(e.provider,r),e.options.lifecycle===Qe.ResolutionScoped&&r.scopedResolutions.set(e,a),a},t.prototype.resolveAll=function(e,r,n){var i=this;r===void 0&&(r=new Rs),n===void 0&&(n=!1),this.ensureNotDisposed();var o=this.getAllRegistrations(e);if(!o&&qn(e)){if(n)return[];throw new Error('Attempted to resolve unregistered dependency token: "'+e.toString()+'"')}if(this.executePreResolutionInterceptor(e,"All"),o){var a=o.map(function(l){return i.resolveRegistration(l,r)});return this.executePostResolutionInterceptor(e,a,"All"),a}var s=[this.construct(e,r)];return this.executePostResolutionInterceptor(e,s,"All"),s},t.prototype.isRegistered=function(e,r){return r===void 0&&(r=!1),this.ensureNotDisposed(),this._registry.has(e)||r&&(this.parent||!1)&&this.parent.isRegistered(e,!0)},t.prototype.reset=function(){this.ensureNotDisposed(),this._registry.clear(),this.interceptors.preResolution.clear(),this.interceptors.postResolution.clear()},t.prototype.clearInstances=function(){var e,r;this.ensureNotDisposed();try{for(var n=Ts(this._registry.entries()),i=n.next();!i.done;i=n.next()){var o=ta(i.value,2),a=o[0],s=o[1];this._registry.setAll(a,s.filter(function(l){return!Zi(l.provider)}).map(function(l){return l.instance=void 0,l}))}}catch(l){e={error:l}}finally{try{i&&!i.done&&(r=n.return)&&r.call(n)}finally{if(e)throw e.error}}},t.prototype.createChildContainer=function(){var e,r;this.ensureNotDisposed();var n=new t(this);try{for(var i=Ts(this._registry.entries()),o=i.next();!o.done;o=i.next()){var a=ta(o.value,2),s=a[0],l=a[1];l.some(function(d){var p=d.options;return p.lifecycle===Qe.ContainerScoped})&&n._registry.setAll(s,l.map(function(d){return d.options.lifecycle===Qe.ContainerScoped?{provider:d.provider,options:d.options}:d}))}}catch(d){e={error:d}}finally{try{o&&!o.done&&(r=i.return)&&r.call(i)}finally{if(e)throw e.error}}return n},t.prototype.beforeResolution=function(e,r,n){n===void 0&&(n={frequency:"Always"}),this.interceptors.preResolution.set(e,{callback:r,options:n})},t.prototype.afterResolution=function(e,r,n){n===void 0&&(n={frequency:"Always"}),this.interceptors.postResolution.set(e,{callback:r,options:n})},t.prototype.dispose=function(){return ug(this,void 0,void 0,function(){var e;return pg(this,function(r){switch(r.label){case 0:return this.disposed=!0,e=[],this.disposables.forEach(function(n){var i=n.dispose();i&&e.push(i)}),[4,Promise.all(e)];case 1:return r.sent(),[2]}})})},t.prototype.getRegistration=function(e){return this.isRegistered(e)?this._registry.get(e):this.parent?this.parent.getRegistration(e):null},t.prototype.getAllRegistrations=function(e){return this.isRegistered(e)?this._registry.getAll(e):this.parent?this.parent.getAllRegistrations(e):null},t.prototype.construct=function(e,r){var n=this;if(e instanceof Il)return e.createProxy(function(o){return n.resolve(o,r)});var i=(function(){var o=Qu.get(e);if(!o||o.length===0){if(e.length===0)return new e;throw new Error('TypeInfo not known for "'+e.name+'"')}var a=o.map(n.resolveParams(r,e));return new(e.bind.apply(e,_r([void 0],a)))})();return gg(i)&&this.disposables.add(i),i},t.prototype.resolveParams=function(e,r){var n=this;return function(i,o){var a,s,l;try{return Ju(i)?_l(i)?i.multiple?(a=n.resolve(i.transform)).transform.apply(a,_r([n.resolveAll(i.token,new Rs,i.isOptional)],i.transformArgs)):(s=n.resolve(i.transform)).transform.apply(s,_r([n.resolve(i.token,e,i.isOptional)],i.transformArgs)):i.multiple?n.resolveAll(i.token,new Rs,i.isOptional):n.resolve(i.token,e,i.isOptional):_l(i)?(l=n.resolve(i.transform,e)).transform.apply(l,_r([n.resolve(i.token,e)],i.transformArgs)):n.resolve(i,e)}catch(d){throw new Error(Yu(r,o,d))}}},t.prototype.ensureNotDisposed=function(){if(this.disposed)throw new Error("This container has been disposed, you cannot interact with a disposed container")},t})(),ke=new Lw;function jw(t){return function(e){Qu.set(e,Xu(e)),t&&t.token&&(Array.isArray(t.token)?t.token.forEach(function(r){ke.register(r,e)}):ke.register(t.token,e))}}var Rr=jw;if(typeof Reflect>"u"||!Reflect.getMetadata)throw new Error(`tsyringe requires a reflect polyfill. Please add 'import "reflect-metadata"' to the top of your entry point.`);var ep,eo=class{attrId="";attrValues=[];constructor(e={}){Object.assign(e)}};c([u({type:f.ObjectIdentifier})],eo.prototype,"attrId",void 0);c([u({type:f.Any,repeated:"set"})],eo.prototype,"attrValues",void 0);var yg=ep=class extends q{constructor(e){super(e),Object.setPrototypeOf(this,ep.prototype)}};yg=ep=c([T({type:x.Sequence,itemType:eo})],yg);var tp,vg=tp=class extends q{constructor(e){super(e),Object.setPrototypeOf(this,tp.prototype)}};vg=tp=c([T({type:x.Sequence,itemType:ft})],vg);var Hw="1.2.840.113549",Uw=`${Hw}.1`,wg=`${Uw}.12`,na=`${wg}.1`,QO=`${na}.1`,ZO=`${na}.2`,eN=`${na}.3`,tN=`${na}.4`,rN=`${na}.5`,nN=`${na}.6`,to=`${wg}.10.1`;var aN=`${to}.1`,sN=`${to}.2`,cN=`${to}.3`,lN=`${to}.4`,dN=`${to}.5`,uN=`${to}.6`,Rl="1.2.840.113549.1.9";var Bl=class{certId="";certValue=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};c([u({type:f.ObjectIdentifier})],Bl.prototype,"certId",void 0);c([u({type:f.Any,context:0})],Bl.prototype,"certValue",void 0);var xg=`${Rl}.22`,gN=`${xg}.1`,bN=`${xg}.2`;var Ml=class{crlId="";crltValue=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};c([u({type:f.ObjectIdentifier})],Ml.prototype,"crlId",void 0);c([u({type:f.Any,context:0})],Ml.prototype,"crltValue",void 0);var $w=`${Rl}.23`,AN=`${$w}.1`;var Bs=class extends G{},nn=class{encryptionAlgorithm=new H;encryptedData=new Bs;constructor(e={}){Object.assign(this,e)}};c([u({type:H})],nn.prototype,"encryptionAlgorithm",void 0);c([u({type:Bs})],nn.prototype,"encryptedData",void 0);var rp,np;(function(t){t[t.v1=0]="v1"})(np||(np={}));var Pl=class extends G{},Ms=rp=class extends q{constructor(e){super(e),Object.setPrototypeOf(this,rp.prototype)}};Ms=rp=c([T({type:x.Sequence,itemType:Ye})],Ms);var Xn=class{version=np.v1;privateKeyAlgorithm=new H;privateKey=new Pl;attributes;constructor(e={}){Object.assign(this,e)}};c([u({type:f.Integer})],Xn.prototype,"version",void 0);c([u({type:H})],Xn.prototype,"privateKeyAlgorithm",void 0);c([u({type:Pl})],Xn.prototype,"privateKey",void 0);c([u({type:Ms,implicit:!0,context:0,optional:!0})],Xn.prototype,"attributes",void 0);var Ag=class extends Xn{};Ag=c([T({type:x.Sequence})],Ag);var Eg=class extends nn{};Eg=c([T({type:x.Sequence})],Eg);var Ol=class{secretTypeId="";secretValue=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};c([u({type:f.ObjectIdentifier})],Ol.prototype,"secretTypeId",void 0);c([u({type:f.Any,context:0})],Ol.prototype,"secretValue",void 0);var Jn=class{mac=new Yi;macSalt=new G;iterations=1;constructor(e={}){Object.assign(this,e)}};c([u({type:Yi})],Jn.prototype,"mac",void 0);c([u({type:G})],Jn.prototype,"macSalt",void 0);c([u({type:f.Integer,defaultValue:1})],Jn.prototype,"iterations",void 0);var ro=class{version=3;authSafe=new ft;macData=new Jn;constructor(e={}){Object.assign(this,e)}};c([u({type:f.Integer})],ro.prototype,"version",void 0);c([u({type:ft})],ro.prototype,"authSafe",void 0);c([u({type:Jn,optional:!0})],ro.prototype,"macData",void 0);var ip,ia=class{bagId="";bagValue=new ArrayBuffer(0);bagAttributes;constructor(e={}){Object.assign(this,e)}};c([u({type:f.ObjectIdentifier})],ia.prototype,"bagId",void 0);c([u({type:f.Any,context:0})],ia.prototype,"bagValue",void 0);c([u({type:eo,repeated:"set",optional:!0})],ia.prototype,"bagAttributes",void 0);var kg=ip=class extends q{constructor(e){super(e),Object.setPrototypeOf(this,ip.prototype)}};kg=ip=c([T({type:x.Sequence,itemType:ia})],kg);var op,ap,sp,De="1.2.840.113549.1.9",kD=`${De}.0`,jg=`${De}.24`,Os=`${De}.25`,Hg=`${De}.26`,Ug=`${De}.27`,SD=`${jg}.1`,CD=`${jg}.2`,TD=`${De}.1`,ID=`${De}.2`,_D=`${De}.3`,RD=`${De}.4`,BD=`${De}.5`,MD=`${De}.6`,hp=`${De}.7`,PD=`${De}.8`,OD=`${De}.9`,ND=`${De}.13`,Ns=`${De}.14`,DD=`${De}.15`,LD=`${De}.20`,jD=`${De}.21`;var HD=`${Os}.1`,UD=`${Os}.2`,$D=`${Os}.3`,GD=`${Os}.4`,VD=`${Os}.5`,Ds="1.3.6.1.5.5.7.9",WD=`${Ds}.1`,KD=`${Ds}.2`,FD=`${Ds}.3`,zD=`${Ds}.4`,qD=`${Ds}.5`,XD=`${Hg}.1`,JD=`${Hg}.2`,YD=`${Ug}.1`,QD=`${Ug}.2`,ZD=`${De}.16`,eL=`${De}.22`,tL=`${De}.23`,rL=`${Ru}.65`,Nl=class extends Ge{ia5String;constructor(e={}){super(e)}toString(){return{}.toString(),this.ia5String||super.toString()}};c([u({type:f.IA5String})],Nl.prototype,"ia5String",void 0);Nl=c([T({type:x.Choice})],Nl);var Sg=class extends ft{};Sg=c([T({type:x.Sequence})],Sg);var Cg=class extends ro{};Cg=c([T({type:x.Sequence})],Cg);var Tg=class extends nn{};Tg=c([T({type:x.Sequence})],Tg);var cp=class{value;constructor(e=""){this.value=e}toString(){return this.value}};c([u({type:f.IA5String})],cp.prototype,"value",void 0);cp=c([T({type:x.Choice})],cp);var Ig=class extends Nl{};Ig=c([T({type:x.Choice})],Ig);var _g=class extends Ge{};_g=c([T({type:x.Choice})],_g);var lp=class{value;constructor(e=new Date){this.value=e}};c([u({type:f.GeneralizedTime})],lp.prototype,"value",void 0);lp=c([T({type:x.Choice})],lp);var Rg=class extends Ge{};Rg=c([T({type:x.Choice})],Rg);var dp=class{value;constructor(e="M"){this.value=e}toString(){return this.value}};c([u({type:f.PrintableString})],dp.prototype,"value",void 0);dp=c([T({type:x.Choice})],dp);var Dl=class{value;constructor(e=""){this.value=e}toString(){return this.value}};c([u({type:f.PrintableString})],Dl.prototype,"value",void 0);Dl=c([T({type:x.Choice})],Dl);var Bg=class extends Dl{};Bg=c([T({type:x.Choice})],Bg);var Mg=class extends Ge{};Mg=c([T({type:x.Choice})],Mg);var up=class{value;constructor(e=""){this.value=e}toString(){return this.value}};c([u({type:f.ObjectIdentifier})],up.prototype,"value",void 0);up=c([T({type:x.Choice})],up);var Pg=class extends Be{};Pg=c([T({type:x.Choice})],Pg);var pp=class{value;constructor(e=0){this.value=e}toString(){return this.value.toString()}};c([u({type:f.Integer})],pp.prototype,"value",void 0);pp=c([T({type:x.Choice})],pp);var Og=class extends xt{};Og=c([T({type:x.Sequence})],Og);var Ps=class extends Ge{};Ps=c([T({type:x.Choice})],Ps);var Ng=op=class extends Gt{constructor(e){super(e),Object.setPrototypeOf(this,op.prototype)}};Ng=op=c([T({type:x.Sequence})],Ng);var Dg=ap=class extends q{constructor(e){super(e),Object.setPrototypeOf(this,ap.prototype)}};Dg=ap=c([T({type:x.Set,itemType:or})],Dg);var fp=class{value;constructor(e=""){this.value=e}toString(){return this.value}};c([u({type:f.BmpString})],fp.prototype,"value",void 0);fp=c([T({type:x.Choice})],fp);var mp=class extends H{};mp=c([T({type:x.Sequence})],mp);var Lg=sp=class extends q{constructor(e){super(e),Object.setPrototypeOf(this,sp.prototype)}};Lg=sp=c([T({type:x.Sequence,itemType:mp})],Lg);var gp,bp;var $g=gp=class extends q{constructor(e){super(e),Object.setPrototypeOf(this,gp.prototype)}};$g=gp=c([T({type:x.Sequence,itemType:H})],$g);var Gg=bp=class extends q{constructor(e){super(e),Object.setPrototypeOf(this,bp.prototype)}};Gg=bp=c([T({type:x.Sequence,itemType:f.BitString})],Gg);var yp;var vp;(function(t){t[t.v1=0]="v1",t[t.v2=1]="v2"})(vp||(vp={}));var Vg=class extends H{};Vg=c([T({type:x.Sequence})],Vg);var ar=class{version=vp.v1;privateKeyAlgorithm=new H;privateKey=new ArrayBuffer(0);attributes;publicKey};c([u({type:f.Integer})],ar.prototype,"version",void 0);c([u({type:H})],ar.prototype,"privateKeyAlgorithm",void 0);c([u({type:f.OctetString})],ar.prototype,"privateKey",void 0);c([u({type:Ms,context:0,implicit:!0,optional:!0})],ar.prototype,"attributes",void 0);c([u({type:f.BitString,context:1,implicit:!0,optional:!0})],ar.prototype,"publicKey",void 0);ar=c([T({type:x.Sequence})],ar);var Wg=class extends ar{};Wg=c([T({type:x.Sequence})],Wg);var Kg=yp=class extends q{constructor(e){super(e),Object.setPrototypeOf(this,yp.prototype)}};Kg=yp=c([T({type:x.Sequence,itemType:ar})],Kg);var wp,xp;var Fg=class extends H{};Fg=c([T({type:x.Sequence})],Fg);var zg=wp=class extends q{constructor(e){super(e),Object.setPrototypeOf(this,wp.prototype)}};zg=wp=c([T({type:x.Sequence,itemType:Xe})],zg);var qg=xp=class extends q{constructor(e){super(e),Object.setPrototypeOf(this,xp.prototype)}};qg=xp=c([T({type:x.Sequence,itemType:ar})],qg);var mt="2.16.840.1.101.3.4.3",no=`${mt}.17`,io=`${mt}.18`,oo=`${mt}.19`,Ap=`${mt}.20`,Ep=`${mt}.21`,kp=`${mt}.22`,Sp=`${mt}.23`,Cp=`${mt}.24`,Tp=`${mt}.25`,Ip=`${mt}.26`,_p=`${mt}.27`,Rp=`${mt}.28`,Bp=`${mt}.29`,Mp=`${mt}.30`,Pp=`${mt}.31`;var Op,Ls=Op=class extends q{constructor(e){super(e),Object.setPrototypeOf(this,Op.prototype)}};Ls=Op=c([T({type:x.Sequence,itemType:Ye})],Ls);var Br=class{version=0;subject=new Ce;subjectPKInfo=new Xe;attributes=new Ls;constructor(e={}){Object.assign(this,e)}};c([u({type:f.Integer})],Br.prototype,"version",void 0);c([u({type:Ce})],Br.prototype,"subject",void 0);c([u({type:Xe})],Br.prototype,"subjectPKInfo",void 0);c([u({type:Ls,implicit:!0,context:0,optional:!0})],Br.prototype,"attributes",void 0);var Yn=class{certificationRequestInfo=new Br;certificationRequestInfoRaw;signatureAlgorithm=new H;signature=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};c([u({type:Br,raw:!0})],Yn.prototype,"certificationRequestInfo",void 0);c([u({type:H})],Yn.prototype,"signatureAlgorithm",void 0);c([u({type:f.BitString})],Yn.prototype,"signature",void 0);var uo="crypto.algorithm",Wp=class{getAlgorithms(){return ke.resolveAll(uo)}toAsnAlgorithm(e){let r={...e};r.hash&&typeof r.hash=="string"&&(r.hash={name:r.hash});for(let n of this.getAlgorithms()){let i=n.toAsnAlgorithm(r);if(i)return i}if(/^[0-9.]+$/.test(e.name)){let n=new H({algorithm:e.name});if("parameters"in e){let i=e;n.parameters=i.parameters}return n}throw new Error("Cannot convert WebCrypto algorithm to ASN.1 algorithm")}toWebAlgorithm(e){for(let n of this.getAlgorithms()){let i=n.toWebAlgorithm(e);if(i)return i}return{name:e.algorithm,parameters:e.parameters}}},so="crypto.algorithmProvider";ke.registerSingleton(so,Wp);var Ul,St="1.3.36.3.3.2.8.1.1",Xg=`${St}.1`,Jg=`${St}.2`,Yg=`${St}.3`,Qg=`${St}.4`,Zg=`${St}.5`,eb=`${St}.6`,tb=`${St}.7`,rb=`${St}.8`,nb=`${St}.9`,ib=`${St}.10`,ob=`${St}.11`,ab=`${St}.12`,sb=`${St}.13`,cb=`${St}.14`,lb="brainpoolP160r1",db="brainpoolP160t1",ub="brainpoolP192r1",pb="brainpoolP192t1",fb="brainpoolP224r1",mb="brainpoolP224t1",hb="brainpoolP256r1",gb="brainpoolP256t1",bb="brainpoolP320r1",yb="brainpoolP320t1",vb="brainpoolP384r1",wb="brainpoolP384t1",xb="brainpoolP512r1",Ab="brainpoolP512t1",Me="ECDSA",uc=Ul=class{toAsnAlgorithm(e){switch(e.name.toLowerCase()){case Me.toLowerCase():if("hash"in e)switch((typeof e.hash=="string"?e.hash:e.hash.name).toLowerCase()){case"sha-1":return Qh;case"sha-256":return Zh;case"sha-384":return eg;case"sha-512":return tg}else if("namedCurve"in e){let r="";switch(e.namedCurve){case"P-256":r=As;break;case"K-256":r=Ul.SECP256K1;break;case"P-384":r=Es;break;case"P-521":r=Uu;break;case lb:r=Xg;break;case db:r=Jg;break;case ub:r=Yg;break;case pb:r=Qg;break;case fb:r=Zg;break;case mb:r=eb;break;case hb:r=tb;break;case gb:r=rb;break;case bb:r=nb;break;case yb:r=ib;break;case vb:r=ob;break;case wb:r=ab;break;case xb:r=sb;break;case Ab:r=cb;break}if(r)return new H({algorithm:en,parameters:$.serialize(new Ft({namedCurve:r}))})}}return null}toWebAlgorithm(e){switch(e.algorithm){case xs:return{name:Me,hash:{name:"SHA-1"}};case Wi:return{name:Me,hash:{name:"SHA-256"}};case Ki:return{name:Me,hash:{name:"SHA-384"}};case Fi:return{name:Me,hash:{name:"SHA-512"}};case en:{if(!e.parameters)throw new TypeError("Cannot get required parameters from EC algorithm");switch($.parse(e.parameters,Ft).namedCurve){case As:return{name:Me,namedCurve:"P-256"};case Ul.SECP256K1:return{name:Me,namedCurve:"K-256"};case Es:return{name:Me,namedCurve:"P-384"};case Uu:return{name:Me,namedCurve:"P-521"};case Xg:return{name:Me,namedCurve:lb};case Jg:return{name:Me,namedCurve:db};case Yg:return{name:Me,namedCurve:ub};case Qg:return{name:Me,namedCurve:pb};case Zg:return{name:Me,namedCurve:fb};case eb:return{name:Me,namedCurve:mb};case tb:return{name:Me,namedCurve:hb};case rb:return{name:Me,namedCurve:gb};case nb:return{name:Me,namedCurve:bb};case ib:return{name:Me,namedCurve:yb};case ob:return{name:Me,namedCurve:vb};case ab:return{name:Me,namedCurve:wb};case sb:return{name:Me,namedCurve:xb};case cb:return{name:Me,namedCurve:Ab}}}}return null}};uc.SECP256K1="1.3.132.0.10";uc=Ul=c([Rr()],uc);ke.registerSingleton(uo,uc);var Pb=Symbol("name"),Ob=Symbol("value"),he=class{constructor(e,r={},n=""){this[Pb]=e,this[Ob]=n;for(let i in r)this[i]=r[i]}};he.NAME=Pb;he.VALUE=Ob;var Kp=class{static toTextObject(e){let r=new he("Algorithm Identifier",{},sr.toString(e.algorithm));if(e.parameters)if(e.algorithm===en){let n=new uc().toWebAlgorithm(e);n&&"namedCurve"in n?r["Named Curve"]=n.namedCurve:r.Parameters=e.parameters}else r.Parameters=e.parameters;return r}},sr=class{static toString(e){let r=this.items[e];return r||e}};sr.items={[zi]:"sha1",[Sl]:"sha224",[qi]:"sha256",[Xi]:"sha384",[Ji]:"sha512",[zt]:"rsaEncryption",[Vn]:"sha1WithRSAEncryption",[ag]:"sha224WithRSAEncryption",[Qo]:"sha256WithRSAEncryption",[Wn]:"sha384WithRSAEncryption",[Kn]:"sha512WithRSAEncryption",[en]:"ecPublicKey",[xs]:"ecdsaWithSHA1",[kl]:"ecdsaWithSHA224",[Wi]:"ecdsaWithSHA256",[Ki]:"ecdsaWithSHA384",[Fi]:"ecdsaWithSHA512",[Bh]:"TLS WWW server authentication",[Mh]:"TLS WWW client authentication",[Ph]:"Code Signing",[Oh]:"E-mail Protection",[Nh]:"Time Stamping",[Dh]:"OCSP Signing",[Al]:"Signed Data"};var Or=class{static serialize(e){return this.serializeObj(e).join(`
`)}static pad(e=0){return"".padStart(2*e," ")}static serializeObj(e,r=0){let n=[],i=this.pad(r++),o="",a=e[he.VALUE];a&&(o=` ${a}`),n.push(`${i}${e[he.NAME]}:${o}`),i=this.pad(r);for(let s in e){if(typeof s=="symbol")continue;let l=e[s],d=s?`${s}: `:"";if(typeof l=="string"||typeof l=="number"||typeof l=="boolean")n.push(`${i}${d}${l}`);else if(l instanceof Date)n.push(`${i}${d}${l.toUTCString()}`);else if(Array.isArray(l))for(let p of l)p[he.NAME]=s,n.push(...this.serializeObj(p,r));else if(l instanceof he)l[he.NAME]=s,n.push(...this.serializeObj(l,r));else if(U.BufferSourceConverter.isBufferSource(l))s?(n.push(`${i}${d}`),n.push(...this.serializeBufferSource(l,r+1))):n.push(...this.serializeBufferSource(l,r));else if("toTextObject"in l){let p=l.toTextObject();p[he.NAME]=s,n.push(...this.serializeObj(p,r))}else throw new TypeError("Cannot serialize data in text format. Unsupported type.")}return n}static serializeBufferSource(e,r=0){let n=this.pad(r),i=U.BufferSourceConverter.toUint8Array(e),o=[];for(let a=0;a<i.length;){let s=[];for(let l=0;l<16&&a<i.length;l++){l===8&&s.push("");let d=i[a++].toString(16).padStart(2,"0");s.push(d)}o.push(`${n}${s.join(" ")}`)}return o}static serializeAlgorithm(e){return this.algorithmSerializer.toTextObject(e)}};Or.oidSerializer=sr;Or.algorithmSerializer=Kp;var oa,aa,an=class t{get parseOptions(){return F(this,aa,"f")}get rawData(){return F(this,oa,"f")||pe(this,oa,$.serialize(this.asn),"f"),F(this,oa,"f")}constructor(...e){oa.set(this,void 0),aa.set(this,void 0),U.BufferSourceConverter.isBufferSource(e[0])?(pe(this,aa,e[2],"f"),this.asn=$.parse(e[0],e[1],e[2]),pe(this,oa,U.BufferSourceConverter.toArrayBuffer(e[0]),"f"),this.onInit(this.asn)):(pe(this,aa,e[1],"f"),this.asn=e[0],this.onInit(this.asn))}equal(e){return e instanceof t?(0,U.isEqual)(e.rawData,this.rawData):!1}toString(e="text"){switch(e){case"asn":return $.toString(this.rawData,F(this,aa,"f"));case"text":return Or.serialize(this.toTextObject());case"hex":return U.Convert.ToHex(this.rawData);case"base64":return U.Convert.ToBase64(this.rawData);case"base64url":return U.Convert.ToBase64Url(this.rawData);default:throw TypeError("Argument 'format' is unsupported value")}}getTextName(){return this.constructor.NAME}toTextObject(){let e=this.toTextObjectEmpty();return e[""]=this.rawData,e}toTextObjectEmpty(e){return new he(this.getTextName(),{},e)}};oa=new WeakMap,aa=new WeakMap;an.NAME="ASN";var Nb,pc=class t{static isCryptoKeyPair(e){return e&&e.privateKey&&e.publicKey}static isCryptoKey(e){return e&&e.usages&&e.type&&e.algorithm&&e.extractable!==void 0}constructor(){this.items=new Map,this[Nb]="CryptoProvider",typeof self<"u"&&typeof crypto<"u"?this.set(t.DEFAULT,crypto):typeof global<"u"&&global.crypto&&global.crypto.subtle&&this.set(t.DEFAULT,global.crypto)}clear(){this.items.clear()}delete(e){return this.items.delete(e)}forEach(e,r){return this.items.forEach(e,r)}has(e){return this.items.has(e)}get size(){return this.items.size}entries(){return this.items.entries()}keys(){return this.items.keys()}values(){return this.items.values()}[Symbol.iterator](){return this.items[Symbol.iterator]()}get(e=t.DEFAULT){let r=this.items.get(e.toLowerCase());if(!r)throw new Error(`Cannot get Crypto by name '${e}'`);return r}set(e,r){if(typeof e=="string"){if(!r)throw new TypeError("Argument 'value' is required");this.items.set(e.toLowerCase(),r)}else this.items.set(t.DEFAULT,e);return this}};Nb=Symbol.toStringTag;pc.DEFAULT="default";var ht=new pc,Pr={berOptions:{maxDepth:1/0,maxNodes:1/0,maxContentLength:1/0}};function Kw(t){let e=0;for(;e<t.length-1&&t[e]===0;)e++;let r=t.slice(e);if(r.length||(r=new Uint8Array([0])),r[0]>127){let n=new Uint8Array(r.length+1);n[0]=0,n.set(r,1),r=n}return r.buffer}function Db(t){return Kw(U.BufferSourceConverter.toUint8Array(U.Convert.FromHex(t||"")))}function Lb(t){let e=U.BufferSourceConverter.toUint8Array(t);return e.length>1&&e[0]===0&&e[1]>127&&(e=e.slice(1)),U.Convert.ToHex(e)}var Tt=class t extends an{constructor(...e){let r,n;U.BufferSourceConverter.isBufferSource(e[0])?(r=U.BufferSourceConverter.toArrayBuffer(e[0]),n=e[1]):(r=$.serialize(new pt({extnID:e[0],critical:e[1],extnValue:new G(U.BufferSourceConverter.toArrayBuffer(e[2]))})),n=Pr),super(r,pt,n)}onInit(e){this.type=e.extnID,this.critical=e.critical,this.value=e.extnValue.buffer}toTextObject(){let e=this.toTextObjectWithoutValue();return e[""]=this.value,e}toTextObjectWithoutValue(){let e=this.toTextObjectEmpty(this.critical?"critical":void 0);return e[he.NAME]===t.NAME&&(e[he.NAME]=sr.toString(this.type)),e}},Fw=/^[0-2](?:\.[1-9][0-9]*)+$/;function zw(t){return new RegExp(Fw).test(t)}var Gl=class{constructor(e={}){this.items={};for(let r in e)this.register(r,e[r])}get(e){return this.items[e]||null}findId(e){return zw(e)?e:this.get(e)}register(e,r){this.items[e]=r,this.items[r]=e}},kt=new Gl;kt.register("CN","2.5.4.3");kt.register("L","2.5.4.7");kt.register("ST","2.5.4.8");kt.register("O","2.5.4.10");kt.register("OU","2.5.4.11");kt.register("C","2.5.4.6");kt.register("DC","0.9.2342.19200300.100.1.25");kt.register("E","1.2.840.113549.1.9.1");kt.register("G","2.5.4.42");kt.register("I","2.5.4.43");kt.register("SN","2.5.4.4");kt.register("T","2.5.4.12");function qw(t,e){return`\\${U.Convert.ToHex(U.Convert.FromUtf8String(e)).toUpperCase()}`}function Xw(t){return t.replace(/([,+"\\<>;])/g,"\\$1").replace(/^([ #])/,"\\$1").replace(/([ ]$)/,"\\$1").replace(/([\r\n\t])/,qw)}var Qn=class t{static isASCII(e){for(let r=0;r<e.length;r++)if(e.charCodeAt(r)>255)return!1;return!0}static isPrintableString(e){return/^[A-Za-z0-9 '()+,-./:=?]*$/g.test(e)}constructor(e,r={}){this.extraNames=new Gl,this.asn=new Ce;for(let n in r)if(Object.prototype.hasOwnProperty.call(r,n)){let i=r[n];this.extraNames.register(n,i)}typeof e=="string"?this.asn=this.fromString(e):e instanceof Ce?this.asn=e:U.BufferSourceConverter.isBufferSource(e)?this.asn=$.parse(e,Ce):this.asn=this.fromJSON(e)}getField(e){let r=this.extraNames.findId(e)||kt.findId(e),n=[];for(let i of this.asn)for(let o of i)o.type===r&&n.push(o.value.toString());return n}getName(e){return this.extraNames.get(e)||kt.get(e)}toString(){return this.asn.map(e=>e.map(r=>{let n=this.getName(r.type)||r.type,i=r.value.anyValue?`#${U.Convert.ToHex(r.value.anyValue)}`:Xw(r.value.toString());return`${n}=${i}`}).join("+")).join(", ")}toJSON(){var e;let r=[];for(let n of this.asn){let i={};for(let o of n){let a=this.getName(o.type)||o.type;(e=i[a])!==null&&e!==void 0||(i[a]=[]),i[a].push(o.value.anyValue?`#${U.Convert.ToHex(o.value.anyValue)}`:o.value.toString())}r.push(i)}return r}fromString(e){let r=new Ce,n=/(\d\.[\d.]*\d|[A-Za-z]+)=((?:"")|(?:".*?[^\\]")|(?:[^,+"\\](?=[,+]|$))|(?:[^,+].*?(?:[^\\][,+]))|(?:))([,+])?/g,i=null,o=",";for(;i=n.exec(`${e},`);){let[,a,s]=i,l=s[s.length-1];(l===","||l==="+")&&(s=s.slice(0,s.length-1),i[3]=l);let d=i[3];a=this.getTypeOid(a);let p=this.createAttribute(a,s);o==="+"?r[r.length-1].push(p):r.push(new Tn([p])),o=d}return r}fromJSON(e){let r=new Ce;for(let n of e){let i=new Tn;for(let o in n){let a=this.getTypeOid(o),s=n[o];for(let l of s){let d=this.createAttribute(a,l);i.push(d)}}r.push(i)}return r}getTypeOid(e){if(/[\d.]+/.test(e)||(e=this.getName(e)||""),!e)throw new Error(`Cannot get OID for name type '${e}'`);return e}createAttribute(e,r){let n=new Ti({type:e});if(typeof r=="object")for(let i in r)switch(i){case"ia5String":n.value.ia5String=r[i];break;case"utf8String":n.value.utf8String=r[i];break;case"universalString":n.value.universalString=r[i];break;case"bmpString":n.value.bmpString=r[i];break;case"printableString":n.value.printableString=r[i];break}else if(r[0]==="#")n.value.anyValue=U.Convert.FromHex(r.slice(1));else{let i=this.processStringValue(r);e===this.getName("E")||e===this.getName("DC")?n.value.ia5String=i:t.isPrintableString(i)?n.value.printableString=i:n.value.utf8String=i}return n}processStringValue(e){let r=/"(.*?[^\\])?"/.exec(e);return r&&(e=r[1]),e.replace(/\\0a/gi,`
`).replace(/\\0d/gi,"\r").replace(/\\0g/gi,"	").replace(/\\(.)/g,"$1")}toArrayBuffer(){return $.serialize(this.asn)}async getThumbprint(e,r){let n,i="SHA-1";return e&&(typeof e=="object"&&"subtle"in e?n=e:(i=e,n=r)),n??(n=ht.get()),await n.subtle.digest(i,this.toArrayBuffer())}},jb="Cannot initialize GeneralName from ASN.1 data.",Eb=`${jb} Unsupported string format in use.`,Jw=`${jb} Value doesn't match to GUID regular expression.`,kb=/^([0-9a-f]{8})-?([0-9a-f]{4})-?([0-9a-f]{4})-?([0-9a-f]{4})-?([0-9a-f]{12})$/i,Sb="1.3.6.1.4.1.311.25.1",Cb="1.3.6.1.4.1.311.20.2.3",Np="dns",Dp="dn",Lp="email",jp="ip",Hp="url",Up="guid",$p="upn",Ll="id",Mr=class extends an{constructor(...e){var r;let n,i;if(U.BufferSourceConverter.isBufferSource(e[0]))i=e[1],n=$.parse(e[0],se,i);else if(typeof e[0]=="string")switch(i=Pr,e[0]){case Dp:{let o=new Qn(e[1]).toArrayBuffer(),a=$.parse(o,Ce,Pr);n=new se({directoryName:a});break}case Np:n=new se({dNSName:e[1]});break;case Lp:n=new se({rfc822Name:e[1]});break;case Up:{let o=new RegExp(kb,"i").exec(e[1]);if(!o)throw new Error("Cannot parse GUID value. Value doesn't match to regular expression");let a=o.slice(1).map((s,l)=>l<3?U.Convert.ToHex(new Uint8Array(U.Convert.FromHex(s)).reverse()):s).join("");n=new se({otherName:new In({typeId:Sb,value:$.serialize(new G(U.Convert.FromHex(a)))})});break}case jp:n=new se({iPAddress:e[1]});break;case Ll:n=new se({registeredID:e[1]});break;case $p:{n=new se({otherName:new In({typeId:Cb,value:$.serialize(Jd.toASN(e[1]))})});break}case Hp:n=new se({uniformResourceIdentifier:e[1]});break;default:throw new Error("Cannot create GeneralName. Unsupported type of the name")}else n=e[0],i=(r=e[1])!==null&&r!==void 0?r:Pr;super(n,i)}onInit(e){if(e.dNSName!=null)this.type=Np,this.value=e.dNSName;else if(e.rfc822Name!=null)this.type=Lp,this.value=e.rfc822Name;else if(e.iPAddress!=null)this.type=jp,this.value=e.iPAddress;else if(e.uniformResourceIdentifier!=null)this.type=Hp,this.value=e.uniformResourceIdentifier;else if(e.registeredID!=null)this.type=Ll,this.value=e.registeredID;else if(e.directoryName!=null)this.type=Dp,this.value=new Qn(e.directoryName).toString();else if(e.otherName!=null)if(e.otherName.typeId===Sb){this.type=Up;let r=$.parse(e.otherName.value,G,this.parseOptions),n=new RegExp(kb,"i").exec(U.Convert.ToHex(r));if(!n)throw new Error(Jw);this.value=n.slice(1).map((i,o)=>o<3?U.Convert.ToHex(new Uint8Array(U.Convert.FromHex(i)).reverse()):i).join("-")}else if(e.otherName.typeId===Cb)this.type=$p,this.value=$.parse(e.otherName.value,Ge,this.parseOptions).toString();else throw new Error(Eb);else throw new Error(Eb)}toJSON(){return{type:this.type,value:this.value}}toTextObject(){let e;switch(this.type){case Dp:case Np:case Up:case jp:case Ll:case $p:case Hp:e=this.type.toUpperCase();break;case Lp:e="Email";break;default:throw new Error("Unsupported GeneralName type")}let r=this.value;return this.type===Ll&&(r=sr.toString(r)),new he(e,void 0,r)}},sn=class extends an{constructor(e,r){let n,i=Pr;if(e instanceof _e)n=e;else if(Array.isArray(e)){let o=[];for(let a of e)if(a instanceof se)o.push(a);else{let s=$.parse(new Mr(a.type,a.value).rawData,se,Pr);o.push(s)}n=new _e(o)}else if(U.BufferSourceConverter.isBufferSource(e))n=$.parse(e,_e,r),i=r??{};else throw new Error("Cannot initialize GeneralNames. Incorrect incoming arguments");super(n,i)}onInit(e){let r=[];for(let n of e){let i=null;try{i=new Mr(n,this.parseOptions)}catch{continue}r.push(i)}this.items=r}toJSON(){return this.items.map(e=>e.toJSON())}toTextObject(){let e=super.toTextObjectEmpty();for(let r of this.items){let n=r.toTextObject(),i=e[n[he.NAME]];Array.isArray(i)||(i=[],e[n[he.NAME]]=i),i.push(n)}return e}};sn.NAME="GeneralNames";var dc="-{5}",fc="\\n",Yw=`[^${fc}]+`,Qw=`${dc}BEGIN (${Yw}(?=${dc}))${dc}`,Zw=`${dc}END \\1${dc}`,fa="\\n",ex=`[^:${fc}]+`,tx=`(?:[^${fc}]+${fa}(?: +[^${fc}]+${fa})*)`,rx="[a-zA-Z0-9=+/]+",nx=`(?:${rx}${fa})+`,Tb=`${Qw}${fa}(?:((?:${ex}: ${tx})+))?${fa}?(${nx})${Zw}`,ix=new RegExp(`[${fc}]+`,"g"),Ze=class{static isPem(e){return typeof e=="string"&&new RegExp(Tb,"g").test(e.replace(/\r/g,""))}static decodeWithHeaders(e){e=e.replace(/\r/g,"");let r=new RegExp(Tb,"g"),n=[],i=null;for(;i=r.exec(e);){let o=i[3].replace(ix,""),a={type:i[1],headers:[],rawData:U.Convert.FromBase64(o)},s=i[2];if(s){let l=s.split(new RegExp(fa,"g")),d=null;for(let p of l){let[m,g]=p.split(/:(.*)/);if(g===void 0){if(!d)throw new Error("Cannot parse PEM string. Incorrect header value");d.value+=m.trim()}else d&&a.headers.push(d),d={key:m,value:g.trim()}}d&&a.headers.push(d)}n.push(a)}return n}static decode(e){return this.decodeWithHeaders(e).map(n=>n.rawData)}static decodeFirst(e){let r=this.decode(e);if(!r.length)throw new RangeError("PEM string doesn't contain any objects");return r[0]}static encode(e,r){if(Array.isArray(e)){let n=new Array;return r?e.forEach(i=>{if(!U.BufferSourceConverter.isBufferSource(i))throw new TypeError("Cannot encode array of BufferSource in PEM format. Not all items of the array are BufferSource");n.push(this.encodeStruct({type:r,rawData:U.BufferSourceConverter.toArrayBuffer(i)}))}):e.forEach(i=>{if(!("type"in i))throw new TypeError("Cannot encode array of PemStruct in PEM format. Not all items of the array are PemStrut");n.push(this.encodeStruct(i))}),n.join(`
`)}else{if(!r)throw new Error("Required argument 'tag' is missed");return this.encodeStruct({type:r,rawData:U.BufferSourceConverter.toArrayBuffer(e)})}}static encodeStruct(e){var r;let n=e.type.toLocaleUpperCase(),i=[];if(i.push(`-----BEGIN ${n}-----`),!((r=e.headers)===null||r===void 0)&&r.length){for(let a of e.headers)i.push(`${a.key}: ${a.value}`);i.push("")}let o=U.Convert.ToBase64(e.rawData);for(let a=0;a<o.length;a+=64)i.push(o.substring(a,a+64));return i.push(`-----END ${n}-----`),i.join(`
`)}};Ze.CertificateTag="CERTIFICATE";Ze.CrlTag="CRL";Ze.CertificateRequestTag="CERTIFICATE REQUEST";Ze.PublicKeyTag="PUBLIC KEY";Ze.PrivateKeyTag="PRIVATE KEY";var Xt=class t extends an{static isAsnEncoded(e){return U.BufferSourceConverter.isBufferSource(e)||typeof e=="string"}static toArrayBuffer(e){if(typeof e=="string"){if(Ze.isPem(e))return Ze.decode(e)[0];if(U.Convert.isHex(e))return U.Convert.FromHex(e);if(U.Convert.isBase64(e))return U.Convert.FromBase64(e);if(U.Convert.isBase64Url(e))return U.Convert.FromBase64Url(e);throw new TypeError("Unsupported format of 'raw' argument. Must be one of DER, PEM, HEX, Base64, or Base4Url")}else{let r=U.BufferSourceConverter.toUint8Array(e);if(r.length>0&&r[0]===48)return U.BufferSourceConverter.toArrayBuffer(e);let n=U.Convert.ToBinary(e);if(Ze.isPem(n))return Ze.decode(n)[0];if(U.Convert.isHex(n))return U.Convert.FromHex(n);if(U.Convert.isBase64(n))return U.Convert.FromBase64(n);if(U.Convert.isBase64Url(n))return U.Convert.FromBase64Url(n);throw new TypeError("Unsupported format of 'raw' argument. Must be one of DER, PEM, HEX, Base64, or Base4Url")}}constructor(...e){t.isAsnEncoded(e[0])?super(t.toArrayBuffer(e[0]),e[1],e[2]):super(e[0],e[1])}toString(e="pem"){return e==="pem"?Ze.encode(this.rawData,this.tag):super.toString(e)}},on=class t extends Xt{static async create(e,r=ht.get()){if(e instanceof t)return e;if(pc.isCryptoKey(e)){if(e.type!=="public")throw new TypeError("Public key is required");let n=await r.subtle.exportKey("spki",e);return new t(n)}else{if(e.publicKey)return e.publicKey;if(U.BufferSourceConverter.isBufferSource(e))return new t(e);throw new TypeError("Unsupported PublicKeyType")}}constructor(e,r){Xt.isAsnEncoded(e)?super(e,Xe,r):super(e,r),this.tag=Ze.PublicKeyTag}async export(e,r,n){let i,o=["verify"],a={hash:"SHA-256",...this.algorithm};r?(a=e,o=r,i=n):i=e,i??(i=ht.get());let s=this.rawData,l=$.parse(this.rawData,Xe,this.parseOptions);return l.algorithm.algorithm===Gn&&(s=ox(l,s)),i.subtle.importKey("spki",s,a,!0,o)}onInit(e){let r=ke.resolve(so),n=this.algorithm=r.toWebAlgorithm(e.algorithm);if(e.algorithm.algorithm===zt){let i=$.parse(e.subjectPublicKey,zn,this.parseOptions),o=U.BufferSourceConverter.toUint8Array(i.modulus);n.publicExponent=U.BufferSourceConverter.toUint8Array(i.publicExponent),n.modulusLength=(o[0]?o:o.slice(1)).byteLength<<3}}async getThumbprint(e,r){let n,i="SHA-1";return e&&(typeof e=="object"&&"subtle"in e?n=e:(i=e,n=r)),n??(n=ht.get()),await n.subtle.digest(i,this.rawData)}async getKeyIdentifier(e,r){let n,i="SHA-1";e&&(typeof e=="object"&&"subtle"in e?n=e:(i=e,n=r)),n??(n=ht.get());let o=$.parse(this.rawData,Xe,this.parseOptions);return await n.subtle.digest(i,o.subjectPublicKey)}toTextObject(){let e=this.toTextObjectEmpty(),r=$.parse(this.rawData,Xe,this.parseOptions);switch(e.Algorithm=Or.serializeAlgorithm(r.algorithm),r.algorithm.algorithm){case en:e["EC Point"]=r.subjectPublicKey;break;case zt:default:e["Raw Data"]=r.subjectPublicKey}return e}};function ox(t,e){return t.algorithm=new H({algorithm:zt,parameters:null}),e=$.serialize(t),e}var co=class t extends Tt{static async create(e,r=!1,n=ht.get()){if("name"in e&&"serialNumber"in e)return new t(e,r);let o=await(await on.create(e,n)).getKeyIdentifier(n);return new t(U.Convert.ToHex(o),r)}constructor(...e){if(U.BufferSourceConverter.isBufferSource(e[0]))super(e[0],e[1]);else if(typeof e[0]=="string"){let r=new Sr({keyIdentifier:new Ri(U.Convert.FromHex(e[0]))});super(Ja,e[1],$.serialize(r))}else{let r=e[0],n=r.name instanceof sn?$.parse(r.name.rawData,_e,Pr):r.name,i=new Sr({authorityCertIssuer:n,authorityCertSerialNumber:U.Convert.FromHex(r.serialNumber)});super(Ja,e[1],$.serialize(i))}}onInit(e){super.onInit(e);let r=$.parse(e.extnValue,Sr,this.parseOptions);r.keyIdentifier&&(this.keyId=U.Convert.ToHex(r.keyIdentifier)),(r.authorityCertIssuer||r.authorityCertSerialNumber)&&(this.certId={name:r.authorityCertIssuer||[],serialNumber:r.authorityCertSerialNumber?U.Convert.ToHex(r.authorityCertSerialNumber):""})}toTextObject(){let e=this.toTextObjectWithoutValue(),r=$.parse(this.value,Sr,this.parseOptions);return r.authorityCertIssuer&&(e["Authority Issuer"]=new sn(r.authorityCertIssuer).toTextObject()),r.authorityCertSerialNumber&&(e["Authority Serial Number"]=r.authorityCertSerialNumber),r.keyIdentifier&&(e[""]=r.keyIdentifier),e}};co.NAME="Authority Key Identifier";var Vl=class extends Tt{constructor(...e){if(U.BufferSourceConverter.isBufferSource(e[0])){super(e[0],e[1]);let r=$.parse(this.value,qr,this.parseOptions);this.ca=r.cA,this.pathLength=r.pathLenConstraint}else{let r=new qr({cA:e[0],pathLenConstraint:e[1]});super(_o,e[2],$.serialize(r)),this.ca=e[0],this.pathLength=e[1]}}toTextObject(){let e=this.toTextObjectWithoutValue();return this.ca&&(e.CA=this.ca),this.pathLength!==void 0&&(e["Path Length"]=this.pathLength),e}};Vl.NAME="Basic Constraints";var Ib;(function(t){t.serverAuth="1.3.6.1.5.5.7.3.1",t.clientAuth="1.3.6.1.5.5.7.3.2",t.codeSigning="1.3.6.1.5.5.7.3.3",t.emailProtection="1.3.6.1.5.5.7.3.4",t.timeStamping="1.3.6.1.5.5.7.3.8",t.ocspSigning="1.3.6.1.5.5.7.3.9"})(Ib||(Ib={}));var Wl=class extends Tt{constructor(...e){if(U.BufferSourceConverter.isBufferSource(e[0])){super(e[0],e[1]);let r=$.parse(this.value,Mi,this.parseOptions);this.usages=r.map(n=>n)}else{let r=new Mi(e[0]);super(Bo,e[1],$.serialize(r)),this.usages=e[0]}}toTextObject(){let e=this.toTextObjectWithoutValue();return e[""]=this.usages.map(r=>sr.toString(r)).join(", "),e}};Wl.NAME="Extended Key Usages";var _b;(function(t){t[t.digitalSignature=1]="digitalSignature",t[t.nonRepudiation=2]="nonRepudiation",t[t.keyEncipherment=4]="keyEncipherment",t[t.dataEncipherment=8]="dataEncipherment",t[t.keyAgreement=16]="keyAgreement",t[t.keyCertSign=32]="keyCertSign",t[t.cRLSign=64]="cRLSign",t[t.encipherOnly=128]="encipherOnly",t[t.decipherOnly=256]="decipherOnly"})(_b||(_b={}));var Kl=class extends Tt{constructor(...e){if(U.BufferSourceConverter.isBufferSource(e[0])){super(e[0],e[1]);let r=$.parse(this.value,Po,this.parseOptions);this.usages=r.toNumber()}else{let r=new Po(e[0]);super(cl,e[1],$.serialize(r)),this.usages=e[0]}}toTextObject(){let e=this.toTextObjectWithoutValue(),r=$.parse(this.value,Po,this.parseOptions);return e[""]=r.toJSON().join(", "),e}};Kl.NAME="Key Usages";var lo=class t extends Tt{static async create(e,r=!1,n=ht.get()){let o=await(await on.create(e,n)).getKeyIdentifier(n);return new t(U.Convert.ToHex(o),r)}constructor(...e){if(U.BufferSourceConverter.isBufferSource(e[0])){super(e[0],e[1]);let r=$.parse(this.value,vt,this.parseOptions);this.keyId=U.Convert.ToHex(r)}else{let r=typeof e[0]=="string"?U.Convert.FromHex(e[0]):e[0],n=new vt(r);super(pl,e[1],$.serialize(n)),this.keyId=U.Convert.ToHex(r)}}toTextObject(){let e=this.toTextObjectWithoutValue(),r=$.parse(this.value,vt,this.parseOptions);return e[""]=r,e}};lo.NAME="Subject Key Identifier";var Fl=class extends Tt{constructor(...e){U.BufferSourceConverter.isBufferSource(e[0])?super(e[0],e[1]):super(Do,e[1],new sn(e[0]||[]).rawData)}onInit(e){super.onInit(e);let r=$.parse(e.extnValue,No,this.parseOptions);this.names=new sn(r)}toTextObject(){let e=this.toTextObjectWithoutValue(),r=this.names.toTextObject();for(let n in r)e[n]=r[n];return e}};Fl.NAME="Subject Alternative Name";var et=class{static register(e,r){this.items.set(e,r)}static create(e,r){let n=new Tt(e,r),i=this.items.get(n.type);return i?new i(e,r):n}};et.items=new Map;var zl=class extends Tt{constructor(...e){var r;if(U.BufferSourceConverter.isBufferSource(e[0])){super(e[0],e[1]);let n=$.parse(this.value,es,this.parseOptions);this.policies=n.map(i=>i.policyIdentifier)}else{let n=e[0],i=(r=e[1])!==null&&r!==void 0?r:!1,o=new es(n.map(a=>new Bi({policyIdentifier:a})));super(al,i,$.serialize(o)),this.policies=n}}toTextObject(){let e=this.toTextObjectWithoutValue();return e.Policy=this.policies.map(r=>new he("",{},sr.toString(r))),e}};zl.NAME="Certificate Policies";et.register(al,zl);var ma=class extends Tt{constructor(...e){var r;if(U.BufferSourceConverter.isBufferSource(e[0]))super(e[0],e[1]);else if(Array.isArray(e[0])&&typeof e[0][0]=="string"){let i=e[0].map(a=>new Cr({distributionPoint:new Jr({fullName:[new se({uniformResourceIdentifier:a})]})})),o=new Bn(i);super(sl,e[1],$.serialize(o))}else{let n=new Bn(e[0]);super(sl,e[1],$.serialize(n))}(r=this.distributionPoints)!==null&&r!==void 0||(this.distributionPoints=[])}onInit(e){super.onInit(e);let r=$.parse(e.extnValue,Bn,this.parseOptions);this.distributionPoints=r}toTextObject(){let e=this.toTextObjectWithoutValue();return e["Distribution Point"]=this.distributionPoints.map(r=>{var n;let i=new he("");return!((n=r.distributionPoint)===null||n===void 0)&&n.fullName&&(i[""]=r.distributionPoint.fullName.map(o=>new Mr(o).toString()).join(", ")),r.reasons&&(i.Reasons=r.reasons.toString()),r.cRLIssuer&&(i["CRL Issuer"]=r.cRLIssuer.map(o=>o.toString()).join(", ")),i}),e}};ma.NAME="CRL Distribution Points";var ql=class extends Tt{constructor(...e){var r,n,i,o;if(U.BufferSourceConverter.isBufferSource(e[0]))super(e[0],e[1]);else if(e[0]instanceof _i){let a=new _i(e[0]);super(il,e[1],$.serialize(a))}else{let a=e[0],s=new _i;Hl(s,a,nu,"ocsp"),Hl(s,a,iu,"caIssuers"),Hl(s,a,ou,"timeStamping"),Hl(s,a,au,"caRepository"),super(il,e[1],$.serialize(s))}(r=this.ocsp)!==null&&r!==void 0||(this.ocsp=[]),(n=this.caIssuers)!==null&&n!==void 0||(this.caIssuers=[]),(i=this.timeStamping)!==null&&i!==void 0||(this.timeStamping=[]),(o=this.caRepository)!==null&&o!==void 0||(this.caRepository=[])}onInit(e){super.onInit(e),this.ocsp=[],this.caIssuers=[],this.timeStamping=[],this.caRepository=[],$.parse(e.extnValue,_i,this.parseOptions).forEach(n=>{switch(n.accessMethod){case nu:this.ocsp.push(new Mr(n.accessLocation));break;case iu:this.caIssuers.push(new Mr(n.accessLocation));break;case ou:this.timeStamping.push(new Mr(n.accessLocation));break;case au:this.caRepository.push(new Mr(n.accessLocation));break}})}toTextObject(){let e=this.toTextObjectWithoutValue();return this.ocsp.length&&jl(e,"OCSP",this.ocsp),this.caIssuers.length&&jl(e,"CA Issuers",this.caIssuers),this.timeStamping.length&&jl(e,"Time Stamping",this.timeStamping),this.caRepository.length&&jl(e,"CA Repository",this.caRepository),e}};ql.NAME="Authority Info Access";function jl(t,e,r){if(r.length===1)t[e]=r[0].toTextObject();else{let n=new he("");r.forEach((i,o)=>{let a=i.toTextObject(),s=`${a[he.NAME]} ${o+1}`,l=n[s];Array.isArray(l)||(l=[],n[s]=l),l.push(a)}),t[e]=n}}function Hl(t,e,r,n){let i=e[n];i&&(Array.isArray(i)?i:[i]).forEach(a=>{typeof a=="string"&&(a=new Mr("url",a)),t.push(new zr({accessMethod:r,accessLocation:$.parse(a.rawData,se,Pr)}))})}var Xl=class extends Tt{constructor(...e){U.BufferSourceConverter.isBufferSource(e[0])?super(e[0],e[1]):super(yu,e[1],new sn(e[0]||[]).rawData)}onInit(e){super.onInit(e);let r=$.parse(e.extnValue,_e,this.parseOptions);this.names=new sn(r)}toTextObject(){let e=this.toTextObjectWithoutValue(),r=this.names.toTextObject();for(let n in r)e[n]=r[n];return e}};Xl.NAME="Issuer Alternative Name";var ha=class t extends an{constructor(...e){let r,n;if(U.BufferSourceConverter.isBufferSource(e[0]))r=U.BufferSourceConverter.toArrayBuffer(e[0]),n=e[1];else{let i=e[0],o=Array.isArray(e[1])?e[1].map(a=>U.BufferSourceConverter.toArrayBuffer(a)):[];r=$.serialize(new Ye({type:i,values:o})),n=Pr}super(r,Ye,n)}onInit(e){this.type=e.type,this.values=e.values}toTextObject(){let e=this.toTextObjectWithoutValue();return e.Value=this.values.map(r=>new he("",{"":r})),e}toTextObjectWithoutValue(){let e=this.toTextObjectEmpty();return e[he.NAME]===t.NAME&&(e[he.NAME]=sr.toString(this.type)),e}};ha.NAME="Attribute";var Jl=class extends ha{constructor(...e){var r;if(U.BufferSourceConverter.isBufferSource(e[0]))super(e[0],e[1]);else{let n=new Ps({printableString:e[0]});super(hp,[$.serialize(n)])}(r=this.password)!==null&&r!==void 0||(this.password="")}onInit(e){if(super.onInit(e),this.values[0]){let r=$.parse(this.values[0],Ps,this.parseOptions);this.password=r.toString()}}toTextObject(){let e=this.toTextObjectWithoutValue();return e[he.VALUE]=this.password,e}};Jl.NAME="Challenge Password";var mc=class extends ha{constructor(...e){var r;if(U.BufferSourceConverter.isBufferSource(e[0]))super(e[0],e[1]);else{let n=e[0],i=new Gt;for(let o of n)i.push($.parse(o.rawData,pt,Pr));super(Ns,[$.serialize(i)])}(r=this.items)!==null&&r!==void 0||(this.items=[])}onInit(e){if(super.onInit(e),this.values[0]){let r=$.parse(this.values[0],Gt,this.parseOptions);this.items=r.map(n=>et.create($.serialize(n),this.parseOptions))}}toTextObject(){let e=this.toTextObjectWithoutValue(),r=this.items.map(n=>n.toTextObject());for(let n of r)e[n[he.NAME]]=n;return e}};mc.NAME="Extensions";var ga=class{static register(e,r){this.items.set(e,r)}static create(e,r){let n=new ha(e,r),i=this.items.get(n.type);return i?new i(e,r):n}};ga.items=new Map;var hc="crypto.signatureFormatter",Fp=class{toAsnSignature(e,r){return U.BufferSourceConverter.toArrayBuffer(r)}toWebSignature(e,r){return U.BufferSourceConverter.toArrayBuffer(r)}},$l,zp=$l=class{static createPssParams(e,r){let n=$l.getHashAlgorithm(e);return n?new Ir({hashAlgorithm:n,maskGenAlgorithm:new H({algorithm:Fn,parameters:$.serialize(n)}),saltLength:r}):null}static getHashAlgorithm(e){let r=ke.resolve(so);return typeof e=="string"?r.toAsnAlgorithm({name:e}):typeof e=="object"&&e&&"name"in e?r.toAsnAlgorithm(e):null}toAsnAlgorithm(e){switch(e.name.toLowerCase()){case"rsassa-pkcs1-v1_5":if("hash"in e){let r;if(typeof e.hash=="string")r=e.hash;else if(e.hash&&typeof e.hash=="object"&&"name"in e.hash&&typeof e.hash.name=="string")r=e.hash.name.toUpperCase();else throw new Error("Cannot get hash algorithm name");switch(r.toLowerCase()){case"sha-1":return new H({algorithm:Vn,parameters:null});case"sha-256":return new H({algorithm:Qo,parameters:null});case"sha-384":return new H({algorithm:Wn,parameters:null});case"sha-512":return new H({algorithm:Kn,parameters:null})}}else return new H({algorithm:zt,parameters:null});break;case"rsa-pss":if("hash"in e){if(!("saltLength"in e&&typeof e.saltLength=="number"))throw new Error("Cannot get 'saltLength' from 'alg' argument");let r=$l.createPssParams(e.hash,e.saltLength);if(!r)throw new Error("Cannot create PSS parameters");return new H({algorithm:Gn,parameters:$.serialize(r)})}else return new H({algorithm:Gn,parameters:null})}return null}toWebAlgorithm(e){switch(e.algorithm){case zt:return{name:"RSASSA-PKCS1-v1_5"};case Vn:return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-1"}};case Qo:return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-256"}};case Wn:return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-384"}};case Kn:return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-512"}};case Gn:if(e.parameters){let r=$.parse(e.parameters,Ir);return{name:"RSA-PSS",hash:ke.resolve(so).toWebAlgorithm(r.hashAlgorithm),saltLength:r.saltLength}}else return{name:"RSA-PSS"}}return null}};zp=$l=c([Rr()],zp);ke.registerSingleton(uo,zp);var qp=class{toAsnAlgorithm(e){switch(e.name.toLowerCase()){case"sha-1":return new H({algorithm:zi});case"sha-256":return new H({algorithm:qi});case"sha-384":return new H({algorithm:Xi});case"sha-512":return new H({algorithm:Ji})}return null}toWebAlgorithm(e){switch(e.algorithm){case zi:return{name:"SHA-1"};case qi:return{name:"SHA-256"};case Xi:return{name:"SHA-384"};case Ji:return{name:"SHA-512"}}return null}};qp=c([Rr()],qp);ke.registerSingleton(uo,qp);var cn=class t{addPadding(e,r){let n=U.BufferSourceConverter.toUint8Array(r),i=new Uint8Array(e);return i.set(n,e-n.length),i.buffer}removePadding(e,r=!1){let n=U.BufferSourceConverter.toUint8Array(e);for(let i=0;i<n.length;i++)if(n[i]){n=n.slice(i);break}if(r&&n[0]>127){let i=new Uint8Array(n.length+1);return i.set(n,1),i.buffer}return n.buffer}toAsnSignature(e,r){if(e.name==="ECDSA"){let n=e.namedCurve,i=t.namedCurveSize.get(n)||t.defaultNamedCurveSize,o=new tn,a=U.BufferSourceConverter.toUint8Array(r);return o.r=this.removePadding(a.slice(0,i),!0),o.s=this.removePadding(a.slice(i,i+i),!0),$.serialize(o)}return null}toWebSignature(e,r){if(e.name==="ECDSA"){let n=$.parse(r,tn),i=e.namedCurve,o=t.namedCurveSize.get(i)||t.defaultNamedCurveSize,a=this.addPadding(o,this.removePadding(n.r)),s=this.addPadding(o,this.removePadding(n.s));return(0,U.combine)(a,s)}return null}};cn.namedCurveSize=new Map;cn.defaultNamedCurveSize=32;var Gp="1.3.101.110",Rb="1.3.101.111",Vp="1.3.101.112",Bb="1.3.101.113",Xp=class{toAsnAlgorithm(e){let r=null;switch(e.name.toLowerCase()){case"ed25519":r=Vp;break;case"x25519":r=Gp;break;case"eddsa":switch(e.namedCurve.toLowerCase()){case"ed25519":r=Vp;break;case"ed448":r=Bb;break}break;case"ecdh-es":switch(e.namedCurve.toLowerCase()){case"x25519":r=Gp;break;case"x448":r=Rb;break}}return r?new H({algorithm:r}):null}toWebAlgorithm(e){switch(e.algorithm){case Vp:return{name:"Ed25519"};case Bb:return{name:"EdDSA",namedCurve:"Ed448"};case Gp:return{name:"X25519"};case Rb:return{name:"ECDH-ES",namedCurve:"X448"}}return null}};Xp=c([Rr()],Xp);ke.registerSingleton(uo,Xp);var Jp=class{toAsnAlgorithm(e){let r=null;switch(e.name.toLowerCase()){case"ml-dsa-44":r=no;break;case"ml-dsa-65":r=io;break;case"ml-dsa-87":r=oo;break}return r?new H({algorithm:r}):null}toWebAlgorithm(e){switch(e.algorithm){case no:return{name:"ML-DSA-44"};case io:return{name:"ML-DSA-65"};case oo:return{name:"ML-DSA-87"}}return null}};Jp=c([Rr()],Jp);ke.registerSingleton(uo,Jp);var Yp=class{toAsnAlgorithm(e){let r=null;switch(e.name.toLowerCase()){case"slh-dsa-sha2-128s":r=Ap;break;case"slh-dsa-sha2-128f":r=Ep;break;case"slh-dsa-sha2-192s":r=kp;break;case"slh-dsa-sha2-192f":r=Sp;break;case"slh-dsa-sha2-256s":r=Cp;break;case"slh-dsa-sha2-256f":r=Tp;break;case"slh-dsa-shake-128s":r=Ip;break;case"slh-dsa-shake-128f":r=_p;break;case"slh-dsa-shake-192s":r=Rp;break;case"slh-dsa-shake-192f":r=Bp;break;case"slh-dsa-shake-256s":r=Mp;break;case"slh-dsa-shake-256f":r=Pp;break}return r?new H({algorithm:r}):null}toWebAlgorithm(e){switch(e.algorithm){case Ap:return{name:"SLH-DSA-SHA2-128s"};case Ep:return{name:"SLH-DSA-SHA2-128f"};case kp:return{name:"SLH-DSA-SHA2-192s"};case Sp:return{name:"SLH-DSA-SHA2-192f"};case Cp:return{name:"SLH-DSA-SHA2-256s"};case Tp:return{name:"SLH-DSA-SHA2-256f"};case Ip:return{name:"SLH-DSA-SHAKE-128s"};case _p:return{name:"SLH-DSA-SHAKE-128f"};case Rp:return{name:"SLH-DSA-SHAKE-192s"};case Bp:return{name:"SLH-DSA-SHAKE-192f"};case Mp:return{name:"SLH-DSA-SHAKE-256s"};case Pp:return{name:"SLH-DSA-SHAKE-256f"}}return null}};Yp=c([Rr()],Yp);ke.registerSingleton(uo,Yp);var js,Hs,Us,$s,Gs,Vs,Ws,sa,Qp=class extends Xt{get subjectName(){return F(this,Hs,"f")||pe(this,Hs,new Qn(this.asn.certificationRequestInfo.subject),"f"),F(this,Hs,"f")}get subject(){return F(this,Us,"f")||pe(this,Us,this.subjectName.toString(),"f"),F(this,Us,"f")}get signatureAlgorithm(){if(!F(this,$s,"f")){let e=ke.resolve(so);pe(this,$s,e.toWebAlgorithm(this.asn.signatureAlgorithm),"f")}return F(this,$s,"f")}get signature(){return F(this,Gs,"f")||pe(this,Gs,this.asn.signature,"f"),F(this,Gs,"f")}get publicKey(){return F(this,Vs,"f")||pe(this,Vs,new on(this.asn.certificationRequestInfo.subjectPKInfo,this.parseOptions),"f"),F(this,Vs,"f")}get attributes(){return F(this,Ws,"f")||pe(this,Ws,this.asn.certificationRequestInfo.attributes.map(e=>ga.create($.serialize(e),this.parseOptions)),"f"),F(this,Ws,"f")}get extensions(){if(!F(this,sa,"f")){pe(this,sa,[],"f");let e=this.getAttribute(Ns);e instanceof mc&&pe(this,sa,e.items,"f")}return F(this,sa,"f")}get tbs(){return F(this,js,"f")||pe(this,js,this.asn.certificationRequestInfoRaw||$.serialize(this.asn.certificationRequestInfo),"f"),F(this,js,"f")}constructor(e,r){let n=Xt.isAsnEncoded(e)?[e,Yn,r]:[e,r];super(n[0],n[1],n[2]),js.set(this,void 0),Hs.set(this,void 0),Us.set(this,void 0),$s.set(this,void 0),Gs.set(this,void 0),Vs.set(this,void 0),Ws.set(this,void 0),sa.set(this,void 0),this.tag=Ze.CertificateRequestTag}onInit(e){}getAttribute(e){for(let r of this.attributes)if(r.type===e)return r;return null}getAttributes(e){return this.attributes.filter(r=>r.type===e)}getExtension(e){for(let r of this.extensions)if(r.type===e)return r;return null}getExtensions(e){return this.extensions.filter(r=>r.type===e)}async verify(e=ht.get()){let r={...this.publicKey.algorithm,...this.signatureAlgorithm},n=await this.publicKey.export(r,["verify"],e),i=ke.resolveAll(hc).reverse(),o=null;for(let s of i)if(o=s.toWebSignature(r,this.signature),o)break;if(!o)throw Error("Cannot convert WebCrypto signature value to ASN.1 format");return await e.subtle.verify(this.signatureAlgorithm,n,o,this.tbs)}toTextObject(){let e=this.toTextObjectEmpty(),r=$.parse(this.rawData,Yn,this.parseOptions),n=r.certificationRequestInfo,i=new he("",{Version:`${Yr[n.version]} (${n.version})`,Subject:this.subject,"Subject Public Key Info":this.publicKey});if(this.attributes.length){let o=new he("");for(let a of this.attributes){let s=a.toTextObject();o[s[he.NAME]]=s}i.Attributes=o}return e.Data=i,e.Signature=new he("",{Algorithm:Or.serializeAlgorithm(r.signatureAlgorithm),"":r.signature}),e}};js=new WeakMap,Hs=new WeakMap,Us=new WeakMap,$s=new WeakMap,Gs=new WeakMap,Vs=new WeakMap,Ws=new WeakMap,sa=new WeakMap;Qp.NAME="PKCS#10 Certificate Request";var Ks,Fs,zs,qs,Xs,Js,Ys,Qs,Zs,ec,ca,tc,ln=class extends Xt{get publicKey(){return F(this,tc,"f")||pe(this,tc,new on(this.asn.tbsCertificate.subjectPublicKeyInfo,this.parseOptions),"f"),F(this,tc,"f")}get serialNumber(){return F(this,Fs,"f")||pe(this,Fs,Lb(this.asn.tbsCertificate.serialNumber),"f"),F(this,Fs,"f")}get subjectName(){return F(this,zs,"f")||pe(this,zs,new Qn(this.asn.tbsCertificate.subject),"f"),F(this,zs,"f")}get subject(){return F(this,qs,"f")||pe(this,qs,this.subjectName.toString(),"f"),F(this,qs,"f")}get issuerName(){return F(this,Xs,"f")||pe(this,Xs,new Qn(this.asn.tbsCertificate.issuer),"f"),F(this,Xs,"f")}get issuer(){return F(this,Js,"f")||pe(this,Js,this.issuerName.toString(),"f"),F(this,Js,"f")}get notBefore(){if(!F(this,Ys,"f")){let e=this.asn.tbsCertificate.validity.notBefore.utcTime||this.asn.tbsCertificate.validity.notBefore.generalTime;if(!e)throw new Error("Cannot get 'notBefore' value");pe(this,Ys,e,"f")}return F(this,Ys,"f")}get notAfter(){if(!F(this,Qs,"f")){let e=this.asn.tbsCertificate.validity.notAfter.utcTime||this.asn.tbsCertificate.validity.notAfter.generalTime;if(!e)throw new Error("Cannot get 'notAfter' value");pe(this,Qs,e,"f")}return F(this,Qs,"f")}get signatureAlgorithm(){if(!F(this,Zs,"f")){let e=ke.resolve(so);pe(this,Zs,e.toWebAlgorithm(this.asn.signatureAlgorithm),"f")}return F(this,Zs,"f")}get signature(){return F(this,ec,"f")||pe(this,ec,this.asn.signatureValue,"f"),F(this,ec,"f")}get extensions(){return F(this,ca,"f")||(pe(this,ca,[],"f"),this.asn.tbsCertificate.extensions&&pe(this,ca,this.asn.tbsCertificate.extensions.map(e=>et.create($.serialize(e),this.parseOptions)),"f")),F(this,ca,"f")}get tbs(){return F(this,Ks,"f")||pe(this,Ks,this.asn.tbsCertificateRaw||$.serialize(this.asn.tbsCertificate),"f"),F(this,Ks,"f")}constructor(e,r){let n=Xt.isAsnEncoded(e)?[e,Ne,r]:[e,r];super(n[0],n[1],n[2]),Ks.set(this,void 0),Fs.set(this,void 0),zs.set(this,void 0),qs.set(this,void 0),Xs.set(this,void 0),Js.set(this,void 0),Ys.set(this,void 0),Qs.set(this,void 0),Zs.set(this,void 0),ec.set(this,void 0),ca.set(this,void 0),tc.set(this,void 0),this.tag=Ze.CertificateTag}onInit(e){}getExtension(e){for(let r of this.extensions)if(typeof e=="string"){if(r.type===e)return r}else if(r instanceof e)return r;return null}getExtensions(e){return this.extensions.filter(r=>typeof e=="string"?r.type===e:r instanceof e)}async verify(e={},r=ht.get()){let n,i,o=e.publicKey;try{if(!o)n={...this.publicKey.algorithm,...this.signatureAlgorithm},i=await this.publicKey.export(n,["verify"],r);else if("publicKey"in o)n={...o.publicKey.algorithm,...this.signatureAlgorithm},i=await o.publicKey.export(n,["verify"],r);else if(o instanceof on)n={...o.algorithm,...this.signatureAlgorithm},i=await o.export(n,["verify"],r);else if(U.BufferSourceConverter.isBufferSource(o)){let d=new on(o);n={...d.algorithm,...this.signatureAlgorithm},i=await d.export(n,["verify"],r)}else n={...o.algorithm,...this.signatureAlgorithm},i=o}catch{return!1}let a=ke.resolveAll(hc).reverse(),s=null;for(let d of a)if(s=d.toWebSignature(n,this.signature),s)break;if(!s)throw Error("Cannot convert ASN.1 signature value to WebCrypto format");let l=await r.subtle.verify(this.signatureAlgorithm,i,s,this.tbs);if(e.signatureOnly)return l;{let p=(e.date||new Date).getTime();return l&&this.notBefore.getTime()<p&&p<this.notAfter.getTime()}}async getThumbprint(e,r){let n,i="SHA-1";return e&&(typeof e=="object"&&"subtle"in e?n=e:(i=e,n=r)),n??(n=ht.get()),await n.subtle.digest(i,this.rawData)}async isSelfSigned(e=ht.get()){return this.subject===this.issuer&&await this.verify({signatureOnly:!0},e)}toTextObject(){let e=this.toTextObjectEmpty(),r=$.parse(this.rawData,Ne,this.parseOptions),n=r.tbsCertificate,i=new he("",{Version:`${Yr[n.version]} (${n.version})`,"Serial Number":n.serialNumber,"Signature Algorithm":Or.serializeAlgorithm(n.signature),Issuer:this.issuer,Validity:new he("",{"Not Before":n.validity.notBefore.getTime(),"Not After":n.validity.notAfter.getTime()}),Subject:this.subject,"Subject Public Key Info":this.publicKey});if(n.issuerUniqueID&&(i["Issuer Unique ID"]=n.issuerUniqueID),n.subjectUniqueID&&(i["Subject Unique ID"]=n.subjectUniqueID),this.extensions.length){let o=new he("");for(let a of this.extensions){let s=a.toTextObject();o[s[he.NAME]]=s}i.Extensions=o}return e.Data=i,e.Signature=new he("",{Algorithm:Or.serializeAlgorithm(r.signatureAlgorithm),"":r.signatureValue}),e}};Ks=new WeakMap,Fs=new WeakMap,zs=new WeakMap,qs=new WeakMap,Xs=new WeakMap,Js=new WeakMap,Ys=new WeakMap,Qs=new WeakMap,Zs=new WeakMap,ec=new WeakMap,ca=new WeakMap,tc=new WeakMap;ln.NAME="Certificate";var ao,Zp=class extends Array{constructor(e,r){if(super(),ao.set(this,void 0),Xt.isAsnEncoded(e))this.import(e,r);else if(e instanceof ln)this.push(e);else if(Array.isArray(e))for(let n of e)this.push(n)}export(e){let r=new Kt;r.version=1,r.encapContentInfo.eContentType=Jh,r.encapContentInfo.eContent=new Hi({single:new G}),r.certificates=new Dn(this.map(o=>new Nn({certificate:$.parse(o.rawData,Ne,F(this,ao,"f"))})));let n=new ft({contentType:Al,content:$.serialize(r)}),i=$.serialize(n);return e==="raw"?i:this.toString(e)}import(e,r){let n=Xt.toArrayBuffer(e),i=$.parse(n,ft,r);if(i.contentType!==Al)throw new TypeError("Cannot parse CMS package. Incoming data is not a SignedData object.");let o=$.parse(i.content,Kt,r),a=[];for(let s of o.certificates||[])s.certificate&&a.push(new ln(s.certificate,r));this.clear();for(let s of a)this.push(s);pe(this,ao,r,"f")}clear(){for(;this.pop(););}toString(e="pem"){let r=this.export("raw");switch(e){case"pem":return Ze.encode(r,"CMS");case"pem-chain":return this.map(n=>n.toString("pem")).join(`
`);case"asn":return $.toString(r,F(this,ao,"f"));case"hex":return U.Convert.ToHex(r);case"base64":return U.Convert.ToBase64(r);case"base64url":return U.Convert.ToBase64Url(r);case"text":return Or.serialize(this.toTextObject());default:throw TypeError("Argument 'format' is unsupported value")}}toTextObject(){let e=$.parse(this.export("raw"),ft,F(this,ao,"f")),r=$.parse(e.content,Kt,F(this,ao,"f"));return new he("X509Certificates",{"Content Type":sr.toString(e.contentType),Content:new he("",{Version:`${Je[r.version]} (${r.version})`,Certificates:new he("",{Certificate:this.map(i=>i.toTextObject())})})})}};ao=new WeakMap;var Yl=class{constructor(e={}){this.certificates=[],e.certificates&&(this.certificates=e.certificates)}async build(e,r=ht.get()){let n=new Zp(e),i=e;for(;i=await this.findIssuer(i,r);){let o=await i.getThumbprint(r);for(let a of n){let s=await a.getThumbprint(r);if((0,U.isEqual)(o,s))throw new Error("Cannot build a certificate chain. Circular dependency.")}n.push(i)}return n}async findIssuer(e,r=ht.get()){if(!await e.isSelfSigned(r)){let n=e.getExtension(Ja);for(let i of this.certificates)if(i.subject===e.issuer){if(n){if(n.keyId){let o=i.getExtension(pl);if(o&&o.keyId!==n.keyId)continue}else if(n.certId){let o=i.getExtension(Do);if(o&&!(n.certId.serialNumber===i.serialNumber&&(0,U.isEqual)($.serialize(n.certId.name),$.serialize(o))))continue}}try{let o={...i.publicKey.algorithm,...e.signatureAlgorithm},a=await i.publicKey.export(o,["verify"],r);if(!await e.verify({publicKey:a,signatureOnly:!0},r))continue}catch{continue}return i}}return null}};var rc,nc,la,da,ua,Mb;(function(t){t[t.unspecified=0]="unspecified",t[t.keyCompromise=1]="keyCompromise",t[t.cACompromise=2]="cACompromise",t[t.affiliationChanged=3]="affiliationChanged",t[t.superseded=4]="superseded",t[t.cessationOfOperation=5]="cessationOfOperation",t[t.certificateHold=6]="certificateHold",t[t.removeFromCRL=8]="removeFromCRL",t[t.privilegeWithdrawn=9]="privilegeWithdrawn",t[t.aACompromise=10]="aACompromise"})(Mb||(Mb={}));var Ql=class extends an{get serialNumber(){return F(this,rc,"f")||pe(this,rc,Lb(this.asn.userCertificate),"f"),F(this,rc,"f")}get revocationDate(){return F(this,nc,"f")||pe(this,nc,this.asn.revocationDate.getTime(),"f"),F(this,nc,"f")}get reason(){return F(this,la,"f")===void 0&&this.extensions,F(this,la,"f")}get invalidity(){return F(this,da,"f")===void 0&&this.extensions,F(this,da,"f")}get extensions(){return F(this,ua,"f")||(pe(this,ua,[],"f"),this.asn.crlEntryExtensions&&pe(this,ua,this.asn.crlEntryExtensions.map(e=>{let r=et.create($.serialize(e),this.parseOptions);switch(r.type){case fu:F(this,la,"f")===void 0&&pe(this,la,$.parse(r.value,Ro,this.parseOptions).reason,"f");break;case gu:F(this,da,"f")===void 0&&pe(this,da,$.parse(r.value,Mo,this.parseOptions).value,"f");break}return r}),"f")),F(this,ua,"f")}constructor(...e){let r,n;if(U.BufferSourceConverter.isBufferSource(e[0])?(r=U.BufferSourceConverter.toArrayBuffer(e[0]),n=e[1]):typeof e[0]=="string"?r=$.serialize(new nr({userCertificate:Db(e[0]),revocationDate:new Be(e[1]),crlEntryExtensions:e[2]})):e[0]instanceof nr&&(r=e[0],n=e[1]),!r)throw new TypeError("Cannot create X509CrlEntry instance. Wrong constructor arguments.");let i=r instanceof nr?[r,n]:[r,nr,n];super(i[0],i[1],i[2]),rc.set(this,void 0),nc.set(this,void 0),la.set(this,void 0),da.set(this,void 0),ua.set(this,void 0)}onInit(e){}};rc=new WeakMap,nc=new WeakMap,la=new WeakMap,da=new WeakMap,ua=new WeakMap;var ic,oc,ac,sc,cc,lc,pa,Zl=class extends Xt{get version(){return this.asn.tbsCertList.version}get signatureAlgorithm(){if(!F(this,oc,"f")){let e=ke.resolve(so);pe(this,oc,e.toWebAlgorithm(this.asn.signatureAlgorithm),"f")}return F(this,oc,"f")}get signature(){return this.asn.signature}get issuer(){return this.issuerName.toString()}get issuerName(){return F(this,ac,"f")||pe(this,ac,new Qn(this.asn.tbsCertList.issuer),"f"),F(this,ac,"f")}get thisUpdate(){if(!F(this,sc,"f")){let e=this.asn.tbsCertList.thisUpdate.getTime();if(!e)throw new Error("Cannot get 'thisUpdate' value");pe(this,sc,e,"f")}return F(this,sc,"f")}get nextUpdate(){var e;return F(this,cc,"f")===void 0&&pe(this,cc,((e=this.asn.tbsCertList.nextUpdate)===null||e===void 0?void 0:e.getTime())||void 0,"f"),F(this,cc,"f")}get entries(){var e;return F(this,lc,"f")||pe(this,lc,((e=this.asn.tbsCertList.revokedCertificates)===null||e===void 0?void 0:e.map(r=>new Ql(r,this.parseOptions)))||[],"f"),F(this,lc,"f")}get extensions(){return F(this,pa,"f")||(pe(this,pa,[],"f"),this.asn.tbsCertList.crlExtensions&&pe(this,pa,this.asn.tbsCertList.crlExtensions.map(e=>et.create($.serialize(e),this.parseOptions)),"f")),F(this,pa,"f")}get tbs(){return F(this,ic,"f")||pe(this,ic,this.asn.tbsCertListRaw||$.serialize(this.asn.tbsCertList),"f"),F(this,ic,"f")}get tbsCertListSignatureAlgorithm(){return this.asn.tbsCertList.signature}get certListSignatureAlgorithm(){return this.asn.signatureAlgorithm}constructor(e,r){let n=Xt.isAsnEncoded(e)?[e,Pn,r]:[e,r];super(n[0],n[1],n[2]),this.tag=Ze.CrlTag,ic.set(this,void 0),oc.set(this,void 0),ac.set(this,void 0),sc.set(this,void 0),cc.set(this,void 0),lc.set(this,void 0),pa.set(this,void 0)}onInit(e){}getExtension(e){for(let r of this.extensions)if(typeof e=="string"){if(r.type===e)return r}else if(r instanceof e)return r;return null}getExtensions(e){return this.extensions.filter(r=>typeof e=="string"?r.type===e:r instanceof e)}async verify(e,r=ht.get()){if(!this.certListSignatureAlgorithm.isEqual(this.tbsCertListSignatureAlgorithm))throw new Error("algorithm identifier in the sequence tbsCertList and CertificateList mismatch");let n,i,o=e.publicKey;try{o instanceof ln?(n={...o.publicKey.algorithm,...o.signatureAlgorithm},i=await o.publicKey.export(n,["verify"])):o instanceof on?(n={...o.algorithm,...this.signatureAlgorithm},i=await o.export(n,["verify"])):(n={...o.algorithm,...this.signatureAlgorithm},i=o)}catch{return!1}let a=ke.resolveAll(hc).reverse(),s=null;for(let l of a)if(s=l.toWebSignature(n,this.signature),s)break;if(!s)throw Error("Cannot convert ASN.1 signature value to WebCrypto format");return await r.subtle.verify(this.signatureAlgorithm,i,s,this.tbs)}async getThumbprint(e,r){let n,i="SHA-1";return e&&(typeof e=="object"&&"subtle"in e?n=e:(i=e,n=r)),n??(n=ht.get()),await n.subtle.digest(i,this.rawData)}findRevoked(e){let r=typeof e=="string"?e:e.serialNumber,n=Db(r);for(let i of this.asn.tbsCertList.revokedCertificates||[])if(U.BufferSourceConverter.isEqual(i.userCertificate,n))return new Ql($.serialize(i),this.parseOptions);return null}};ic=new WeakMap,oc=new WeakMap,ac=new WeakMap,sc=new WeakMap,cc=new WeakMap,lc=new WeakMap,pa=new WeakMap;et.register(_o,Vl);et.register(Bo,Wl);et.register(cl,Kl);et.register(pl,lo);et.register(Ja,co);et.register(Do,Fl);et.register(sl,ma);et.register(il,ql);et.register(yu,Xl);ga.register(hp,Jl);ga.register(Ns,mc);ke.registerSingleton(hc,Fp);ke.registerSingleton(hc,cn);cn.namedCurveSize.set("P-256",32);cn.namedCurveSize.set("K-256",32);cn.namedCurveSize.set("P-384",48);cn.namedCurveSize.set("P-521",66);function ed(t){return ax.stubThis(t)}var ax={stubThis:t=>globalThis.fetch(t)};var Hb={};async function Ub(t,e){if(!e)return!1;let{extensions:r}=t;if(!r)return!1;let{keyIdentifier:n,fromExtension:i}=await sx(e),o=t.extensions.find(l=>l instanceof co);if(i&&o?.keyId&&o.keyId!==n)throw new Error(`Certificate's AuthorityKeyIdentifier did not match issuer's SubjectKeyIdentifier "${n}"`);let a=r.find(l=>l instanceof ma),s=[];if(a?.distributionPoints?.forEach(l=>{l.distributionPoint?.fullName?.forEach(d=>{d.uniformResourceIdentifier&&s.push(d.uniformResourceIdentifier)})}),!(s.length>0))return!1;for(let l of s){let d=`${n}|${l}`,p=Hb[d];if(p){let A=new Date;if(!p.nextUpdate||p.nextUpdate>A)return p.revokedCerts.indexOf(t.serialNumber)>=0}let m;try{m=await(await ed(l)).arrayBuffer()}catch{continue}let g;try{g=new Zl(m)}catch{continue}if(!await g.verify({publicKey:e.publicKey}))throw new Error(`CRL from ${l} failed signature verification against issuer "${e.subject}"`);let I=g.getExtension(co);if(i&&I?.keyId&&I.keyId!==n)throw new Error(`CRL from ${l} contained an AuthorityKeyIdentifier that did not match issuer's SubjectKeyIdentifier "${n}"`);if(g.nextUpdate&&(Hb[d]={revokedCerts:g.entries.map(A=>A.serialNumber),nextUpdate:g.nextUpdate}),g.findRevoked(t))return!0}return!1}async function sx(t){let e=t.extensions?.find(n=>n instanceof lo);return e?.keyId?{keyIdentifier:e.keyId,fromExtension:!0}:{keyIdentifier:(await lo.create(t.publicKey)).keyId,fromExtension:!1}}function $b(t){let e;try{e=ct.decodeFirst(t)}catch(r){let n=r;throw new Error(`Error decoding authenticator extensions: ${n.message}`)}return Gb(e)}function Gb(t){let e={};for(let[r,n]of t)n instanceof Map?e[r]=Gb(n):e[r]=n;return e}function td(t){if(t.byteLength<37)throw new Error(`Authenticator data was ${t.byteLength} bytes, expected at least 37 bytes`);let e=0,r=ee.toDataView(t),n=t.slice(e,e+=32),i=t.slice(e,e+=1),o=i[0],a={up:!!(o&1),uv:!!(o&4),be:!!(o&8),bs:!!(o&16),at:!!(o&64),ed:!!(o&128),flagsInt:o},s=t.slice(e,e+4),l=r.getUint32(e,!1);e+=4;let d,p,m;if(a.at){d=t.slice(e,e+=16);let I=r.getUint16(e);e+=2,p=t.slice(e,e+=I);let b=ee.fromHex("a301634f4b500327206745643235353139"),A=t.slice(e,e+b.byteLength),v=!1;ee.areEqual(b,A)&&(v=!0,t[e]=164);let y=ct.decodeFirst(t.slice(e)),k=Uint8Array.from(ct.encode(y));v&&(t[e]=163),m=k,e+=k.byteLength}let g,C;if(a.ed){let I=ct.decodeFirst(t.slice(e));C=Uint8Array.from(ct.encode(I)),g=$b(C),e+=C.byteLength}if(t.byteLength>e)throw new Error("Leftover bytes detected while parsing authenticator data");return cx.stubThis({rpIdHash:n,flagsBuf:i,flags:a,counter:l,counterBuf:s,aaguid:d,credentialID:p,credentialPublicKey:m,extensionsData:g,extensionsDataBuffer:C})}var cx={stubThis:t=>t};function It(t,e=-7){return typeof t=="string"&&(t=ee.fromUTF8String(t)),hr.digest(t,e)}var Q8=ho(Su(),1);function po(t){if([J.EdDSA].indexOf(t)>=0)return"Ed25519";if([J.ES256,J.ES384,J.ES512,J.ES256K].indexOf(t)>=0)return"ECDSA";if([J.RS256,J.RS384,J.RS512,J.RS1].indexOf(t)>=0)return"RSASSA-PKCS1-v1_5";if([J.PS256,J.PS384,J.PS512].indexOf(t)>=0)return"RSA-PSS";if([J.ML_DSA_44].indexOf(t)>=0)return"ML-DSA-44";if([J.ML_DSA_65].indexOf(t)>=0)return"ML-DSA-65";if([J.ML_DSA_87].indexOf(t)>=0)return"ML-DSA-87";throw new Error(`Could not map COSE alg value of ${t} to a WebCrypto key alg name`)}var cr=class extends Error{constructor({message:e,code:r,cause:n}){super(e,{cause:n}),Object.defineProperty(this,"code",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.name="SimpleWebAuthnError",this.code=r}},Zn=class extends cr{constructor(e){let n=`This runtime's WebCrypto.subtle does not support use of ${po(e)}`;super({message:n,code:"RUNTIME_NO_PQC_SUPPORT"})}};async function st(t,e=[]){if(e.length===0)return!0;let r=e.map(d=>{try{return new ln(d)}catch(p){throw new cr({message:`Could not parse trust anchor certificate:
${d}`,code:"CERTIFICATE_PATH_VERIFICATION_FAILED",cause:p})}}),n=[];for(let d=0;d<r.length;d++){let p=r[d];try{Vb(p)}catch{continue}n.push(p)}if(n.length===0)throw new cr({message:"No specified trust anchor was valid for verifying x5c",code:"CERTIFICATE_PATH_VERIFICATION_FAILED"});let i=t.map(d=>new ln(d)),o=i[0],a=[];i.length>1&&(a=i.slice(1));let s=!0,l;for(let d of n)try{let p=i.concat([d]);if(new Set(p.map(y=>y.toString("pem"))).size!==p.length)throw new cr({message:"Invalid certificate path: found duplicate certificates",code:"CERTIFICATE_PATH_VERIFICATION_FAILED"});let C=await new Yl({certificates:[...a,d]}).build(o),b=C[C.length-1].equal(d),A=!1;if(!b&&C.length>1&&(A=await C[C.length-2].verify({publicKey:d.publicKey,signatureOnly:!0})),!(b||A))continue;A&&(C[C.length-1]=d),s=!1,l=C;break}catch(p){throw new cr({message:"Unexpected error while validating certificate path",code:"CERTIFICATE_PATH_VERIFICATION_FAILED",cause:p})}if(l)for(let d=0;d<l.length;d++){let p=l[d];try{Vb(p)}catch{throw new cr({message:`Found certificate out of validity period:
${p.toString()}`,code:"CERTIFICATE_PATH_VERIFICATION_FAILED"})}let m;d<l.length-1?m=l[d+1]:await p.isSelfSigned()&&(m=p);try{await lx(p,m)}catch(g){throw new cr({message:`The following certificate failed revocation status check
${p.toString()}`,code:"CERTIFICATE_PATH_VERIFICATION_FAILED",cause:g})}}else s=!0;if(s)throw new cr({message:"x5c could not be chained to any specified trust anchor",code:"CERTIFICATE_PATH_VERIFICATION_FAILED"});return!0}async function lx(t,e){if(await Ub(t,e))throw new Error("Found revoked certificate in certificate path")}function Vb(t){let{notBefore:e,notAfter:r}=t,n=new Date(Date.now());if(e>n||r<n)throw new Error("Certificate is not yet valid or expired")}function Wb(t){let e;if(t===Wi)e=J.ES256;else if(t===Ki)e=J.ES384;else if(t===Fi)e=J.ES512;else if(t===Qo)e=J.RS256;else if(t===Wn)e=J.RS384;else if(t===Kn)e=J.RS512;else if(t===Vn)e=J.RS1;else if(t===no)e=J.ML_DSA_44;else if(t===io)e=J.ML_DSA_65;else if(t===oo)e=J.ML_DSA_87;else throw new Error(`Unable to map X.509 signature algorithm ${t} to a COSE algorithm`);return e}function rd(t){let e=new Map,r=Ie.parse(t,Ne),{tbsCertificate:n}=r,{subjectPublicKeyInfo:i}=n,o=i.algorithm.algorithm;if(o===en){if(!i.algorithm.parameters)throw new Error("Certificate public key was missing parameters (EC2)");let a=Ie.parse(new Uint8Array(i.algorithm.parameters),Ft),s,l,{namedCurve:d}=a;if(d===As)s=J.ES256,l=nt.P256;else if(d===Es)s=J.ES384,l=nt.P384;else throw new Error(`Certificate public key contained unexpected namedCurve ${d} (EC2)`);let p=new Uint8Array(i.subjectPublicKey),m,g;if(p[0]===4){let I=1,b=(p.length-1)/2;m=p.slice(I,I+=b),g=p.slice(I)}else throw new Error('TODO: Figure out how to handle public keys in "compressed form"');let C=new Map;C.set(ie.kty,lt.EC2),C.set(ie.alg,s),C.set(ie.crv,l),C.set(ie.x,m),C.set(ie.y,g),e=C}else if(o===zt){let a=Ie.parse(i.subjectPublicKey,zn),s=new Map;s.set(ie.kty,lt.RSA),s.set(ie.alg,J.RS256),s.set(ie.n,new Uint8Array(a.modulus)),s.set(ie.e,new Uint8Array(a.publicExponent)),e=s}else if([no,io,oo].indexOf(o)>=0){let a=new Map;a.set(ie.kty,lt.AKP),a.set(ie.alg,Wb(o)),a.set(ie.pub,new Uint8Array(i.subjectPublicKey)),e=a}else throw new Error(`Certificate public key contained unexpected algorithm ID ${o}`);return e}function _t(t){let{signature:e,data:r,credentialPublicKey:n,x509Certificate:i,hashAlgorithm:o}=t;if(!i&&!n)throw new Error('Must declare either "leafCert" or "credentialPublicKey"');if(i&&n)throw new Error('Must not declare both "leafCert" and "credentialPublicKey"');let a=new Map;return n?a=mr(n):i&&(a=rd(i)),dx.stubThis(hr.verify({cosePublicKey:a,signature:e,data:r,shaHashOverride:o}))}var dx={stubThis:t=>t};function Kb(t){let e=t.split(".");return[JSON.parse(ce.toUTF8String(e[0])),JSON.parse(ce.toUTF8String(e[1])),e[2]]}function Fb(t){let e;if(t==="ES256")e=J.ES256;else if(t==="ES384")e=J.ES384;else if(t==="ES512")e=J.ES512;else if(t==="RS256")e=J.RS256;else if(t==="RS384")e=J.RS384;else if(t==="RS512")e=J.RS512;else throw new Error(`Unable to map JWS algorithm "${t}" to a COSE algorithm`);return e}async function ei(t){let e=await gt(),{keyData:r,algorithm:n}=t;return e.subtle.importKey("jwk",r,n,!1,["verify"])}async function nd(t){let{cosePublicKey:e,signature:r,data:n,shaHashOverride:i}=t,o=await gt(),a=e.get(ie.alg),s=e.get(ie.crv),l=e.get(ie.x),d=e.get(ie.y);if(!a)throw new Error("Public key was missing alg (EC2)");if(!s)throw new Error("Public key was missing crv (EC2)");if(!l)throw new Error("Public key was missing x (EC2)");if(!d)throw new Error("Public key was missing y (EC2)");let p;if(s===nt.P256)p="P-256";else if(s===nt.P384)p="P-384";else if(s===nt.P521)p="P-521";else throw new Error(`Unexpected COSE crv value of ${s} (EC2)`);let m={kty:"EC",crv:p,x:ce.fromBuffer(l),y:ce.fromBuffer(d),ext:!1},C=await ei({keyData:m,algorithm:{name:"ECDSA",namedCurve:p}}),I=vn(a);i&&(I=vn(i));let b={name:"ECDSA",hash:{name:I}};return o.subtle.verify(b,C,r,n)}async function id(t){let{cosePublicKey:e,signature:r,data:n,shaHashOverride:i}=t,o=await gt(),a=e.get(ie.alg),s=e.get(ie.n),l=e.get(ie.e);if(!a)throw new Error("Public key was missing alg (RSA)");if(!Ot(a))throw new Error(`Public key had invalid alg ${a} (RSA)`);if(!s)throw new Error("Public key was missing n (RSA)");if(!l)throw new Error("Public key was missing e (RSA)");let d={kty:"RSA",alg:"",n:ce.fromBuffer(s),e:ce.fromBuffer(l),ext:!1},p={name:po(a),hash:{name:vn(a)}},m={name:po(a)};if(i&&(p.hash.name=vn(i)),p.name==="RSASSA-PKCS1-v1_5")p.hash.name==="SHA-256"?d.alg="RS256":p.hash.name==="SHA-384"?d.alg="RS384":p.hash.name==="SHA-512"?d.alg="RS512":p.hash.name==="SHA-1"&&(d.alg="RS1");else if(p.name==="RSA-PSS"){let C=0;p.hash.name==="SHA-256"?(d.alg="PS256",C=32):p.hash.name==="SHA-384"?(d.alg="PS384",C=48):p.hash.name==="SHA-512"&&(d.alg="PS512",C=64),m.saltLength=C}else throw new Error(`Unexpected RSA key algorithm ${a} (${p.name})`);let g=await ei({keyData:d,algorithm:p});return o.subtle.verify(m,g,r,n)}function zb(t,e){let[r,n,i]=t.split("."),o=rd(e),a=ee.fromUTF8String(`${r}.${n}`),s=ce.toBuffer(i),l=JSON.parse(ce.toUTF8String(r)),d=Fb(l.alg);if(yn(o))return nd({data:a,signature:s,cosePublicKey:o,shaHashOverride:d});if(Ao(o))return id({data:a,signature:s,cosePublicKey:o,shaHashOverride:d});let p=o.get(ie.kty);throw new Error(`JWT verification with public key of kty ${p} is not supported by this method`)}function qb(t){let e=t.replace("-----BEGIN CERTIFICATE-----","").replace("-----END CERTIFICATE-----","").replace(/[\n ]/g,"");return ce.toBuffer(e,"base64")}async function Xb(t){let e=Kb(t),r=e[0],n=e[1],i=r.x5c.map(Ve);try{let g=Rt.getRootCertificates({identifier:"mds"});await st(i,g)}catch(g){let C=g;throw new Error("BLOB certificate path could not be validated",{cause:C})}let o=i[0];if(!await zb(t,qb(o)))throw new Error("BLOB signature could not be verified");let s=[];for(let g of n.entries)g.aaguid&&g.metadataStatement&&s.push(g.metadataStatement);let[l,d,p]=n.nextUpdate.split("-"),m=new Date(parseInt(l,10),parseInt(d,10)-1,parseInt(p,10));return{statements:s,parsedNextUpdate:m,payload:n}}async function Jb(t){let{cosePublicKey:e,signature:r,data:n}=t,i=await gt(),o=e.get(ie.alg),a=e.get(ie.pub);if(!o)throw new Error("Public key was missing alg (AKP)");if(!Ot(o))throw new Error(`Public key had invalid alg ${o} (AKP)`);if(!a)throw new Error("Public key was missing pub (AKP)");let s=po(o),l={kty:"AKP",alg:s,pub:ce.fromBuffer(a),ext:!1},d;try{d=await ei({keyData:l,algorithm:s})}catch(p){throw p.name==="NotSupportedError"?new Zn(o):p}return i.subtle.verify(s,d,r,n)}async function Yb(t){let{cosePublicKey:e,signature:r,data:n}=t,i=await gt(),o=e.get(ie.alg),a=e.get(ie.crv),s=e.get(ie.x);if(!o)throw new Error("Public key was missing alg (OKP)");if(!Ot(o))throw new Error(`Public key had invalid alg ${o} (OKP)`);if(!a)throw new Error("Public key was missing crv (OKP)");if(!s)throw new Error("Public key was missing x (OKP)");let l;if(a===nt.ED25519)l="Ed25519";else throw new Error(`Unexpected COSE crv value of ${a} (OKP)`);let d={kty:"OKP",crv:l,alg:"EdDSA",x:ce.fromBuffer(s),ext:!1},m=await ei({keyData:d,algorithm:{name:l,namedCurve:l}}),g={name:l};return i.subtle.verify(g,m,r,n)}function Zb(t,e){let r=Ie.parse(t,tn),n=new Uint8Array(r.r),i=new Uint8Array(r.s),o=ux(e),a=Qb(n,o),s=Qb(i,o);return ee.concat([a,s])}function ux(t){switch(t){case nt.P256:return 32;case nt.P384:return 48;case nt.P521:return 66;default:throw new Error(`Unexpected COSE crv value of ${t} (EC2)`)}}function Qb(t,e){let r;if(t.length<e)r=new Uint8Array(e),r.set(t,e-t.length);else if(t.length===e)r=t;else if(t.length===e+1&&t[0]===0&&(t[1]&128)===128)r=t.subarray(1);else throw new Error(`Invalid signature component length ${t.length}, expected ${e}`);return r}function ey(t){let{cosePublicKey:e,signature:r,data:n,shaHashOverride:i}=t;if(yn(e)){let a=e.get(ie.crv);if(!qf(a))throw new Error(`unknown COSE curve ${a}`);let s=Zb(r,a);return nd({cosePublicKey:e,signature:s,data:n,shaHashOverride:i})}else{if(Ao(e))return id({cosePublicKey:e,signature:r,data:n,shaHashOverride:i});if(Ff(e))return Yb({cosePublicKey:e,signature:r,data:n});if(zf(e))return Jb({cosePublicKey:e,signature:r,data:n})}let o=e.get(ie.kty);throw new Error(`Signature verification with public key of kty ${o} is not supported by this method`)}var ee={};Pt(ee,{areEqual:()=>px,concat:()=>hx,fromASCIIString:()=>yx,fromHex:()=>mx,fromUTF8String:()=>bx,toDataView:()=>vx,toHex:()=>fx,toUTF8String:()=>gx});function px(t,e){return t.length!=e.length?!1:t.every((r,n)=>r===e[n])}function fx(t){return Array.from(t,r=>r.toString(16).padStart(2,"0")).join("")}function mx(t){if(!t)return Uint8Array.from([]);if(!(t.length!==0&&t.length%2===0&&!/[^a-fA-F0-9]/u.test(t)))throw new Error("Invalid hex string");let r=t.match(/.{1,2}/g)??[];return Uint8Array.from(r.map(n=>parseInt(n,16)))}function hx(t){let e=0,r=t.reduce((i,o)=>i+o.length,0),n=new Uint8Array(r);return t.forEach(i=>{n.set(i,e),e+=i.length}),n}function gx(t){return new globalThis.TextDecoder("utf-8").decode(t)}function bx(t){return new globalThis.TextEncoder().encode(t)}function yx(t){return Uint8Array.from(t.split("").map(e=>e.charCodeAt(0)))}function vx(t){return new DataView(t.buffer,t.byteOffset,t.length)}function Ve(t){let e;if(typeof t=="string")if(ce.isBase64URL(t))e=ce.toBase64(t);else if(ce.isBase64(t))e=t;else throw new Error("Certificate is not a valid base64 or base64url string");else e=ce.fromBuffer(t,"base64");let r="";for(let n=0;n<Math.ceil(e.length/64);n+=1){let i=64*n;r+=`${e.substr(i,64)}
`}return r=`-----BEGIN CERTIFICATE-----
${r}-----END CERTIFICATE-----
`,r}function ty(t){let e=globalThis.SubtleCrypto;if(typeof e.supports!="function")return!1;try{return e.supports("verify",t)}catch{return!1}}var ry=`-----BEGIN CERTIFICATE-----
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
`;var ny=`-----BEGIN CERTIFICATE-----
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
`,iy=`-----BEGIN CERTIFICATE-----
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
`,oy=`
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
`,ay=`
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
`;var sy=`-----BEGIN CERTIFICATE-----
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
`;var cy=`-----BEGIN CERTIFICATE-----
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
 `,ly=`-----BEGIN CERTIFICATE-----
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
`;var ef=class{constructor(){Object.defineProperty(this,"pemCertificates",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_runtimeSupportsPQC",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.pemCertificates=new Map}setRootCertificates(e){let{identifier:r,certificates:n}=e,i=[];for(let o of n)o instanceof Uint8Array?i.push(Ve(o)):i.push(o);this.pemCertificates.set(r,i)}getRootCertificates(e){let{identifier:r}=e;return this.pemCertificates.get(r)??[]}runtimeSupportsPQC(){return this._runtimeSupportsPQC??=ty("ML-DSA-44"),this._runtimeSupportsPQC}},Rt=new ef;Rt.setRootCertificates({identifier:"android-key",certificates:[ny,iy,oy,ay]});Rt.setRootCertificates({identifier:"android-safetynet",certificates:[ry]});Rt.setRootCertificates({identifier:"apple",certificates:[sy]});Rt.setRootCertificates({identifier:"mds",certificates:[cy,ly]});var wx={residentKey:"preferred",userVerification:"preferred"};function tf(){return Rt.runtimeSupportsPQC()?[J.ML_DSA_44,J.EdDSA,J.ES256,J.RS256]:[J.EdDSA,J.ES256,J.RS256]}async function dy(t){let{rpName:e,rpID:r,userName:n,userID:i,challenge:o=await Ic(),userDisplayName:a="",timeout:s=6e4,attestationType:l="none",excludeCredentials:d=[],authenticatorSelection:p=wx,extensions:m,supportedAlgorithmIDs:g=tf(),preferredAuthenticatorType:C}=t,I=g.map(y=>({alg:y,type:"public-key"}));p.residentKey===void 0?p.requireResidentKey&&(p.residentKey="required"):p.requireResidentKey=p.residentKey==="required";let b=o;if(typeof b=="string"&&(b=ee.fromUTF8String(b)),typeof i=="string")throw new Error("String values for `userID` are no longer supported. See https://simplewebauthn.dev/docs/advanced/server/custom-user-ids");let A=i;A||(A=await Qf());let v=[];return C&&(C==="securityKey"?(v.push("security-key"),p.authenticatorAttachment="cross-platform"):C==="localDevice"?(v.push("client-device"),p.authenticatorAttachment="platform"):C==="remoteDevice"&&(v.push("hybrid"),p.authenticatorAttachment="cross-platform")),{challenge:ce.fromBuffer(b),rp:{name:e,id:r},user:{id:ce.fromBuffer(A),name:n,displayName:a},pubKeyCredParams:I,timeout:s,attestation:l,excludeCredentials:d.map(y=>{if(!ce.isBase64URL(y.id))throw new Error(`excludeCredential id "${y.id}" is not a valid base64url string`);return{...y,id:ce.trimPadding(y.id),type:"public-key"}}),authenticatorSelection:p,extensions:{...m,credProps:!0},hints:v}}function od({be:t,bs:e}){let r=e,n="singleDevice";if(t&&(n="multiDevice"),n==="singleDevice"&&r)throw new rf("Single-device credential indicated that it was backed up, which should be impossible.");return{credentialDeviceType:n,credentialBackedUp:r}}var rf=class extends Error{constructor(e){super(e),this.name="InvalidBackupFlags"}};async function ad(t,e){try{return await Promise.any(e.map(n=>new Promise((i,o)=>{It(ee.fromASCIIString(n)).then(a=>{ee.areEqual(t,a)?i(n):o()})})))}catch(r){throw r.name==="AggregateError"?new nf:r}}var nf=class extends Error{constructor(){super("Unexpected RP ID hash"),this.name="UnexpectedRPIDHash"}};async function uy(t){let{attStmt:e,clientDataHash:r,rpIdHash:n,credentialID:i,credentialPublicKey:o,aaguid:a,rootCertificates:s}=t,l=Uint8Array.from([0]),d=Eo(o),p=ee.concat([l,n,r,i,d]),m=e.get("sig"),g=e.get("x5c");if(!g)throw new Error("No attestation certificate provided in attestation statement (FIDOU2F)");if(!m)throw new Error("No attestation signature provided in attestation statement (FIDOU2F)");let C=Number.parseInt(ee.toHex(a),16);if(C!==0)throw new Error(`AAGUID "${C}" was not expected value`);try{await st(g.map(Ve),s)}catch(I){let b=I;throw new Error(`${b.message} (FIDOU2F)`)}return _t({signature:m,data:p,x509Certificate:g[0],hashAlgorithm:J.ES256})}var py="1.3.6.1.4.1.45724.1.1.4";function sd(t,e){if(!t)return!0;let r=t.find(a=>a.extnID===py);if(!r)return!0;let n=Ie.parse(r.extnValue,G),i=new Uint8Array(n.buffer);if(!ee.areEqual(e,i)){let a=ee.toHex(i),s=ee.toHex(e);throw new Error(`Certificate extension id-fido-gen-ce-aaguid (${py}) value of "${a}" was present but not equal to attestation statement AAGUID value of "${s}"`)}return!0}var cd={debug(){},info(){},warn(){},error(){}};function fy(t){let e={...cd};return t.debug&&(e.debug=t.debug),t.info&&(e.info=t.info),t.warn&&(e.warn=t.warn),t.error&&(e.error=t.error),e}var xx={url:"",no:0,nextUpdate:new Date(0)},Ax="https://mds.fidoalliance.org/",Bt;(function(t){t[t.DISABLED=0]="DISABLED",t[t.REFRESHING=1]="REFRESHING",t[t.READY=2]="READY"})(Bt||(Bt={}));var of=class{constructor(){Object.defineProperty(this,"mdsCache",{enumerable:!0,configurable:!0,writable:!0,value:{}}),Object.defineProperty(this,"statementCache",{enumerable:!0,configurable:!0,writable:!0,value:{}}),Object.defineProperty(this,"state",{enumerable:!0,configurable:!0,writable:!0,value:Bt.DISABLED}),Object.defineProperty(this,"verificationMode",{enumerable:!0,configurable:!0,writable:!0,value:"strict"}),Object.defineProperty(this,"logger",{enumerable:!0,configurable:!0,writable:!0,value:cd})}async initialize(e={}){this.statementCache={};let{mdsServers:r=[Ax],statements:n,verificationMode:i,logger:o=cd}=e;if(this.logger=fy(o),this.setState(Bt.REFRESHING),n?.length){let a=0;n.forEach(s=>{s.aaguid&&(this.statementCache[s.aaguid]={entry:{metadataStatement:s,statusReports:[],timeOfLastStatusChange:"1970-01-01"},url:xx.url},a+=1)}),this.logger.info(`Cached ${a} local statements`)}if(r?.length){let a=Object.keys(this.statementCache).length,s=r.length;for(let p of r)try{let m={url:p,no:0,nextUpdate:new Date(0)},g=await this.downloadBlob(m);await this.verifyBlob(g,m)}catch(m){this.logger.error(`Could not download BLOB from ${p}:`,m),s-=1}let d=Object.keys(this.statementCache).length-a;this.logger.info(`Cached ${d} statements from ${s} metadata server(s)`)}i&&(this.verificationMode=i),this.setState(Bt.READY)}async getStatement(e){if(this.state===Bt.DISABLED||!e)return;e instanceof Uint8Array&&(e=Cc(e)),await this.pauseUntilReady();let r=this.statementCache[e];if(!r){if(this.verificationMode==="strict")throw new Error(`No metadata statement found for aaguid "${e}"`);return}if(r.url){let i=this.mdsCache[r.url];if(new Date>i.nextUpdate)try{this.setState(Bt.REFRESHING);let a=await this.downloadBlob(i);await this.verifyBlob(a,i)}finally{this.setState(Bt.READY)}}let{entry:n}=r;for(let i of n.statusReports){let{status:o}=i;if(o==="USER_VERIFICATION_BYPASS"||o==="ATTESTATION_KEY_COMPROMISE"||o==="USER_KEY_REMOTE_COMPROMISE"||o==="USER_KEY_PHYSICAL_COMPROMISE")throw new Error(`Detected compromised aaguid "${e}"`)}return n.metadataStatement}async downloadBlob(e){let{url:r}=e;return await(await ed(r)).text()}async verifyBlob(e,r){let{url:n,no:i}=r,{payload:o,parsedNextUpdate:a}=await Xb(e);if(o.no<=i)throw new Error(`Latest BLOB no. ${o.no} is not greater than previous no. ${i}`);for(let s of o.entries)s.aaguid&&(this.statementCache[s.aaguid]={entry:s,url:n});n?this.mdsCache[n]={...r,no:o.no,nextUpdate:a}:a<new Date&&this.logger.warn(`\u26A0\uFE0F This MDS blob (serial: ${o.no}) contains stale data as of ${a.toISOString()}. Please consider re-initializing MetadataService with a newer MDS blob.`)}pauseUntilReady(){return this.state===Bt.READY?new Promise(r=>{r()}):new Promise((r,n)=>{let a=700,s=globalThis.setInterval(()=>{a<1?(clearInterval(s),n(`State did not become ready in ${7e4/1e3} seconds`)):this.state===Bt.READY&&(clearInterval(s),r()),a-=1},100)})}setState(e){this.state=e,e===Bt.DISABLED?this.logger.debug("MetadataService is DISABLED"):e===Bt.REFRESHING?this.logger.debug("MetadataService is REFRESHING"):e===Bt.READY&&this.logger.debug("MetadataService is READY")}},ti=new of;async function ri({statement:t,credentialPublicKey:e,x5c:r,attestationStatementAlg:n}){let{authenticationAlgorithms:i,authenticatorGetInfo:o,attestationRootCertificates:a}=t,s=new Set;i.forEach(A=>{let v=my[A];v&&s.add(v)});let l=mr(e),d=l.get(ie.kty),p=l.get(ie.alg);if(!d)throw new Error("Credential public key was missing kty");if(!p)throw new Error("Credential public key was missing alg");if(!d)throw new Error("Credential public key was missing kty");let m={kty:d,alg:p};if(yn(l)){let A=l.get(ie.crv);m.crv=A}let g=!1;for(let A of s)if(A.alg===m.alg&&A.kty===m.kty&&((A.kty===lt.EC2||A.kty===lt.OKP)&&(A.crv,m.crv),g=!0),g)break;if(!g){let A=i.map(k=>`'${k}' (COSE info: ${hy(my[k])})`),v=JSON.stringify(A,null,2).replace(/"/g,""),y=hy(m);throw new Error(`Public key parameters ${y} did not match any of the following metadata algorithms:
${v}`)}if(n!==void 0&&o?.algorithms!==void 0){let A=o.algorithms.map(v=>v.alg);if(A.indexOf(n)<0)throw new Error(`Attestation statement alg ${n} did not match one of ${A}`)}let C=r.map(Ve),I=a.map(Ve),b=!1;return C.length===1&&I.indexOf(C[0])>=0&&(b=!0),b||await st(C,I),!0}var my={secp256r1_ecdsa_sha256_raw:{kty:2,alg:-7,crv:1},secp256r1_ecdsa_sha256_der:{kty:2,alg:-7,crv:1},rsassa_pss_sha256_raw:{kty:3,alg:-37},rsassa_pss_sha256_der:{kty:3,alg:-37},secp256k1_ecdsa_sha256_raw:{kty:2,alg:-47,crv:8},secp256k1_ecdsa_sha256_der:{kty:2,alg:-47,crv:8},rsassa_pss_sha384_raw:{kty:3,alg:-38},rsassa_pkcsv15_sha256_raw:{kty:3,alg:-257},rsassa_pkcsv15_sha384_raw:{kty:3,alg:-258},rsassa_pkcsv15_sha512_raw:{kty:3,alg:-259},rsassa_pkcsv15_sha1_raw:{kty:3,alg:-65535},secp384r1_ecdsa_sha384_raw:{kty:2,alg:-35,crv:2},secp512r1_ecdsa_sha256_raw:{kty:2,alg:-36,crv:3},ed25519_eddsa_sha512_raw:{kty:1,alg:-8,crv:6}};function hy(t){let{kty:e,alg:r,crv:n}=t,i="";return e!==lt.RSA?i=`{ kty: ${e}, alg: ${r}, crv: ${n} }`:i=`{ kty: ${e}, alg: ${r} }`,i}async function gy(t){let{attStmt:e,clientDataHash:r,authData:n,credentialPublicKey:i,aaguid:o,rootCertificates:a}=t,s=e.get("sig"),l=e.get("x5c"),d=e.get("alg");if(!s)throw new Error("No attestation signature provided in attestation statement (Packed)");if(!d)throw new Error("Attestation statement did not contain alg (Packed)");if(!Ot(d))throw new Error(`Attestation statement contained invalid alg ${d} (Packed)`);let p=ee.concat([n,r]),m=!1;if(l){let{subject:g,basicConstraintsCA:C,version:I,notBefore:b,notAfter:A,parsedCertificate:v}=Lo(l[0]),{OU:y,CN:k,O:R,C:O}=g;if(y!=="Authenticator Attestation")throw new Error('Certificate OU was not "Authenticator Attestation" (Packed|Full)');if(!k)throw new Error("Certificate CN was empty (Packed|Full)");if(!R)throw new Error("Certificate O was empty (Packed|Full)");if(!O||O.length!==2)throw new Error("Certificate C was not two-character ISO 3166 code (Packed|Full)");if(C)throw new Error("Certificate basic constraints CA was not `false` (Packed|Full)");if(I!==2)throw new Error("Certificate version was not `3` (ASN.1 value of 2) (Packed|Full)");let V=new Date;if(b>V)throw new Error(`Certificate not good before "${b.toString()}" (Packed|Full)`);if(V=new Date,A<V)throw new Error(`Certificate not good after "${A.toString()}" (Packed|Full)`);try{await sd(v.tbsCertificate.extensions,o)}catch(N){let h=N;throw new Error(`${h.message} (Packed|Full)`)}let W=await ti.getStatement(o);if(W){if(W.attestationTypes.indexOf("basic_full")<0)throw new Error("Metadata does not indicate support for full attestations (Packed|Full)");try{await ri({statement:W,credentialPublicKey:i,x5c:l,attestationStatementAlg:d})}catch(N){let h=N;throw new Error(`${h.message} (Packed|Full)`)}}else try{await st(l.map(Ve),a)}catch(N){let h=N;throw new Error(`${h.message} (Packed|Full)`,{cause:h})}m=await _t({signature:s,data:p,x509Certificate:l[0],hashAlgorithm:d})}else m=await _t({signature:s,data:p,credentialPublicKey:i,hashAlgorithm:d});return m}async function by(t){let{attStmt:e,clientDataHash:r,authData:n,aaguid:i,rootCertificates:o,verifyTimestampMS:a=!0,credentialPublicKey:s,attestationSafetyNetEnforceCTSCheck:l}=t,d=e.get("alg"),p=e.get("response");if(!e.get("ver"))throw new Error("No ver value in attestation (SafetyNet)");if(!p)throw new Error("No response was included in attStmt by authenticator (SafetyNet)");let C=ee.toUTF8String(p).split("."),I=JSON.parse(ce.toUTF8String(C[0])),b=JSON.parse(ce.toUTF8String(C[1])),A=C[2],{nonce:v,ctsProfileMatch:y,timestampMs:k}=b;if(a){let L=Date.now();if(k>Date.now())throw new Error(`Payload timestamp "${k}" was later than "${L}" (SafetyNet)`);let P=k+60*1e3;if(L=Date.now(),P<L)throw new Error(`Payload timestamp "${P}" has expired (SafetyNet)`)}let R=ee.concat([n,r]),O=await It(R),V=ce.fromBuffer(O,"base64");if(v!==V)throw new Error("Could not verify payload nonce (SafetyNet)");if(l&&!y)throw new Error("Could not verify device integrity (SafetyNet)");let W=ce.toBuffer(I.x5c[0],"base64"),N=Lo(W),{subject:h}=N;if(h.CN!=="attest.android.com")throw new Error('Certificate common name was not "attest.android.com" (SafetyNet)');let E=await ti.getStatement(i);if(E)try{await ri({statement:E,credentialPublicKey:s,x5c:I.x5c,attestationStatementAlg:d})}catch(L){let P=L;throw new Error(`${P.message} (SafetyNet)`)}else try{await st(I.x5c.map(Ve),o)}catch(L){let P=L;throw new Error(`${P.message} (SafetyNet)`)}let w=ee.fromUTF8String(`${C[0]}.${C[1]}`),M=ce.toBuffer(A);return await _t({signature:M,data:w,x509Certificate:W,hashAlgorithm:d})}var yy={196:"TPM_ST_RSP_COMMAND",32768:"TPM_ST_NULL",32769:"TPM_ST_NO_SESSIONS",32770:"TPM_ST_SESSIONS",32788:"TPM_ST_ATTEST_NV",32789:"TPM_ST_ATTEST_COMMAND_AUDIT",32790:"TPM_ST_ATTEST_SESSION_AUDIT",32791:"TPM_ST_ATTEST_CERTIFY",32792:"TPM_ST_ATTEST_QUOTE",32793:"TPM_ST_ATTEST_TIME",32794:"TPM_ST_ATTEST_CREATION",32801:"TPM_ST_CREATION",32802:"TPM_ST_VERIFIED",32803:"TPM_ST_AUTH_SECRET",32804:"TPM_ST_HASHCHECK",32805:"TPM_ST_AUTH_SIGNED",32809:"TPM_ST_FU_MANIFEST"},Nr={0:"TPM_ALG_ERROR",1:"TPM_ALG_RSA",4:"TPM_ALG_SHA",4:"TPM_ALG_SHA1",5:"TPM_ALG_HMAC",6:"TPM_ALG_AES",7:"TPM_ALG_MGF1",8:"TPM_ALG_KEYEDHASH",10:"TPM_ALG_XOR",11:"TPM_ALG_SHA256",12:"TPM_ALG_SHA384",13:"TPM_ALG_SHA512",16:"TPM_ALG_NULL",18:"TPM_ALG_SM3_256",19:"TPM_ALG_SM4",20:"TPM_ALG_RSASSA",21:"TPM_ALG_RSAES",22:"TPM_ALG_RSAPSS",23:"TPM_ALG_OAEP",24:"TPM_ALG_ECDSA",25:"TPM_ALG_ECDH",26:"TPM_ALG_ECDAA",27:"TPM_ALG_SM2",28:"TPM_ALG_ECSCHNORR",29:"TPM_ALG_ECMQV",32:"TPM_ALG_KDF1_SP800_56A",33:"TPM_ALG_KDF2",34:"TPM_ALG_KDF1_SP800_108",35:"TPM_ALG_ECC",37:"TPM_ALG_SYMCIPHER",38:"TPM_ALG_CAMELLIA",64:"TPM_ALG_CTR",65:"TPM_ALG_OFB",66:"TPM_ALG_CBC",67:"TPM_ALG_CFB",68:"TPM_ALG_ECB"},vy={0:"TPM_ECC_NONE",1:"TPM_ECC_NIST_P192",2:"TPM_ECC_NIST_P224",3:"TPM_ECC_NIST_P256",4:"TPM_ECC_NIST_P384",5:"TPM_ECC_NIST_P521",16:"TPM_ECC_BN_P256",17:"TPM_ECC_BN_P638",32:"TPM_ECC_SM2_P256"},wy={"id:414D4400":{name:"AMD",id:"AMD"},"id:414E5400":{name:"Ant Group",id:"ANT"},"id:41544D4C":{name:"Atmel",id:"ATML"},"id:4252434D":{name:"Broadcom",id:"BRCM"},"id:4353434F":{name:"Cisco",id:"CSCO"},"id:464C5953":{name:"Flyslice Technologies",id:"FLYS"},"id:524F4343":{name:"Fuzhou Rockchip",id:"ROCC"},"id:474F4F47":{name:"Google",id:"GOOG"},"id:48504900":{name:"HPI",id:"HPI"},"id:48504500":{name:"HPE",id:"HPE"},"id:48495349":{name:"Huawei",id:"HISI"},"id:49424D00":{name:"IBM",id:"IBM"},"id:49465800":{name:"Infineon",id:"IFX"},"id:494E5443":{name:"Intel",id:"INTC"},"id:4C454E00":{name:"Lenovo",id:"LEN"},"id:4D534654":{name:"Microsoft",id:"MSFT"},"id:4E534D20":{name:"National Semiconductor",id:"NSM"},"id:4E545A00":{name:"Nationz",id:"NTZ"},"id:4E534700":{name:"NSING",id:"NSG"},"id:4E544300":{name:"Nuvoton Technology",id:"NTC"},"id:51434F4D":{name:"Qualcomm",id:"QCOM"},"id:534D534E":{name:"Samsung",id:"SMSN"},"id:53454345":{name:"SecEdge",id:"SECE"},"id:534E5300":{name:"Sinosun",id:"SNS"},"id:534D5343":{name:"SMSC",id:"SMSC"},"id:53544D20":{name:"STMicroelectronics",id:"STM"},"id:54584E00":{name:"Texas Instruments",id:"TXN"},"id:57454300":{name:"Winbond",id:"WEC"},"id:5345414C":{name:"Wisekey",id:"SEAL"},"id:FFFFF1D0":{name:"FIDO Alliance",id:"FIDO"}},xy={TPM_ECC_NIST_P256:1,TPM_ECC_NIST_P384:2,TPM_ECC_NIST_P521:3,TPM_ECC_BN_P256:1,TPM_ECC_SM2_P256:1};function Ay(t){let e=0,r=ee.toDataView(t),n=r.getUint32(e);e+=4;let i=r.getUint16(e);e+=2;let o=yy[i],a=r.getUint16(e);e+=2;let s=t.slice(e,e+=a),l=r.getUint16(e);e+=2;let d=t.slice(e,e+=l),p=t.slice(e,e+=8),m=r.getUint32(e);e+=4;let g=r.getUint32(e);e+=4;let C=!!t.slice(e,e+=1),I={clock:p,resetCount:m,restartCount:g,safe:C},b=t.slice(e,e+=8),A=r.getUint16(e);e+=2;let v=t.slice(e,e+=A),y=ee.toDataView(v),k=r.getUint16(e);e+=2;let R=t.slice(e,e+=k),O={nameAlg:Nr[y.getUint16(0)],nameAlgBuffer:v.slice(0,2),name:v,qualifiedName:R};return{magic:n,type:o,qualifiedSigner:s,extraData:d,clockInfo:I,firmwareVersion:b,attested:O}}function Ey(t){let e=0,r=ee.toDataView(t),n=Nr[r.getUint16(e)];e+=2;let i=Nr[r.getUint16(e)];e+=2;let o=r.getUint32(e);e+=4;let a={fixedTPM:!!(o&1),stClear:!!(o&2),fixedParent:!!(o&8),sensitiveDataOrigin:!!(o&16),userWithAuth:!!(o&32),adminWithPolicy:!!(o&64),noDA:!!(o&512),encryptedDuplication:!!(o&1024),restricted:!!(o&32768),decrypt:!!(o&65536),signOrEncrypt:!!(o&131072)},s=r.getUint16(e);e+=2;let l=t.slice(e,e+=s),d={},p=Uint8Array.from([]);if(n==="TPM_ALG_RSA"){let m=Nr[r.getUint16(e)];e+=2;let g=Nr[r.getUint16(e)];e+=2;let C=r.getUint16(e);e+=2;let I=r.getUint32(e);e+=4,d.rsa={symmetric:m,scheme:g,keyBits:C,exponent:I};let b=r.getUint16(e);e+=2,p=t.slice(e,e+=b)}else if(n==="TPM_ALG_ECC"){let m=Nr[r.getUint16(e)];e+=2;let g=Nr[r.getUint16(e)];e+=2;let C=vy[r.getUint16(e)];e+=2;let I=Nr[r.getUint16(e)];e+=2,d.ecc={symmetric:m,scheme:g,curveID:C,kdf:I};let b=r.getUint16(e);e+=2;let A=t.slice(e,e+=b),v=r.getUint16(e);e+=2;let y=t.slice(e,e+=v);p=ee.concat([A,y])}else throw new Error(`Unexpected type "${n}" (TPM)`);return{type:n,nameAlg:i,objectAttributes:a,authPolicy:l,parameters:d,unique:p}}function ky(t){let e=`id:${t.substring(3).toUpperCase()}`;return wy[e]}async function Sy(t){let{aaguid:e,attStmt:r,authData:n,credentialPublicKey:i,clientDataHash:o,rootCertificates:a}=t,s=r.get("ver"),l=r.get("sig"),d=r.get("alg"),p=r.get("x5c"),m=r.get("pubArea"),g=r.get("certInfo");if(s!=="2.0")throw new Error(`Unexpected ver "${s}", expected "2.0" (TPM)`);if(!l)throw new Error("No attestation signature provided in attestation statement (TPM)");if(!d)throw new Error("Attestation statement did not contain alg (TPM)");if(!Ot(d))throw new Error(`Attestation statement contained invalid alg ${d} (TPM)`);if(!p)throw new Error("No attestation certificate provided in attestation statement (TPM)");if(!m)throw new Error("Attestation statement did not contain pubArea (TPM)");if(!g)throw new Error("Attestation statement did not contain certInfo (TPM)");let C=Ey(m),{unique:I,type:b,parameters:A}=C,v=mr(i);if(b==="TPM_ALG_RSA"){if(!Ao(v))throw new Error(`Credential public key with kty ${v.get(ie.kty)} did not match ${b}`);let re=v.get(ie.n),We=v.get(ie.e);if(!re)throw new Error("COSE public key missing n (TPM|RSA)");if(!We)throw new Error("COSE public key missing e (TPM|RSA)");if(!ee.areEqual(I,re))throw new Error("PubArea unique is not same as credentialPublicKey (TPM|RSA)");if(!A.rsa)throw new Error("Parsed pubArea type is RSA, but missing parameters.rsa (TPM|RSA)");let Pe=We,pn=A.rsa.exponent||65537,ii=Pe[0]+(Pe[1]<<8)+(Pe[2]<<16);if(pn!==ii)throw new Error(`Unexpected public key exp ${ii}, expected ${pn} (TPM|RSA)`)}else if(b==="TPM_ALG_ECC"){if(!yn(v))throw new Error(`Credential public key with kty ${v.get(ie.kty)} did not match ${b}`);let re=v.get(ie.crv),We=v.get(ie.x),Pe=v.get(ie.y);if(!re)throw new Error("COSE public key missing crv (TPM|ECC)");if(!We)throw new Error("COSE public key missing x (TPM|ECC)");if(!Pe)throw new Error("COSE public key missing y (TPM|ECC)");if(!ee.areEqual(I,ee.concat([We,Pe])))throw new Error("PubArea unique is not same as public key x and y (TPM|ECC)");if(!A.ecc)throw new Error("Parsed pubArea type is ECC, but missing parameters.ecc (TPM|ECC)");let pn=A.ecc.curveID,ii=xy[pn];if(ii!==re)throw new Error(`Public area key curve ID "${pn}" mapped to "${ii}" which did not match public key crv of "${re}" (TPM|ECC)`)}else throw new Error(`Unsupported pubArea.type "${b}"`);let y=Ay(g),{magic:k,type:R,attested:O,extraData:V}=y;if(k!==4283712327)throw new Error(`Unexpected magic value "${k}", expected "0xff544347" (TPM)`);if(R!=="TPM_ST_ATTEST_CERTIFY")throw new Error(`Unexpected type "${R}", expected "TPM_ST_ATTEST_CERTIFY" (TPM)`);let W=await It(m,kx(O.nameAlg)),N=ee.concat([O.nameAlgBuffer,W]);if(!ee.areEqual(O.name,N))throw new Error("Attested name comparison failed (TPM)");let h=ee.concat([n,o]),E=await It(h,d);if(!ee.areEqual(V,E))throw new Error("CertInfo extra data did not equal hashed attestation (TPM)");if(p.length<1)throw new Error("No certificates present in x5c array (TPM)");let w=Lo(p[0]),{basicConstraintsCA:M,version:B,subject:L,notAfter:P,notBefore:ge}=w;if(M)throw new Error("Certificate basic constraints CA was not `false` (TPM)");if(B!==2)throw new Error("Certificate version was not `3` (ASN.1 value of 2) (TPM)");if(L.combined.length>0)throw new Error("Certificate subject was not empty (TPM)");let ve=new Date;if(ge>ve)throw new Error(`Certificate not good before "${ge.toString()}" (TPM)`);if(ve=new Date,P<ve)throw new Error(`Certificate not good after "${P.toString()}" (TPM)`);let z=Ie.parse(p[0],Ne);if(!z.tbsCertificate.extensions)throw new Error("Certificate was missing extensions (TPM)");let de,Se;if(z.tbsCertificate.extensions.forEach(re=>{re.extnID===Do?de=Ie.parse(re.extnValue,No):re.extnID===Bo&&(Se=Ie.parse(re.extnValue,Mi))}),!de)throw new Error("Certificate did not contain subjectAltName extension (TPM)");if(!de[0].directoryName?.[0].length)throw new Error("Certificate subjectAltName extension directoryName was empty (TPM)");let{tcgAtTpmManufacturer:we,tcgAtTpmModel:te,tcgAtTpmVersion:tt}=Ex(de[0].directoryName);if(!we||!te||!tt)throw new Error("Certificate contained incomplete subjectAltName data (TPM)");if(!Se)throw new Error("Certificate did not contain ExtendedKeyUsage extension (TPM)");if(!ky(we))throw new Error(`Could not match TPM manufacturer "${we}" (TPM)`);if(Se[0]!=="2.23.133.8.3")throw new Error(`Unexpected extKeyUsage "${Se[0]}", expected "2.23.133.8.3" (TPM)`);try{await sd(z.tbsCertificate.extensions,e)}catch(re){let We=re;throw new Error(`${We.message} (TPM)`)}let Ae=await ti.getStatement(e);if(Ae)try{await ri({statement:Ae,credentialPublicKey:i,x5c:p,attestationStatementAlg:d})}catch(re){let We=re;throw new Error(`${We.message} (TPM)`)}else try{await st(p.map(Ve),a)}catch(re){let We=re;throw new Error(`${We.message} (TPM)`)}return _t({signature:l,data:g,x509Certificate:p[0],hashAlgorithm:d})}function Ex(t){let e="2.23.133.2.1",r="2.23.133.2.2",n="2.23.133.2.3",i,o,a;return t.forEach(s=>{s.forEach(l=>{l.type===e?i=l.value.toString():l.type===r?o=l.value.toString():l.type===n&&(a=l.value.toString())})}),{tcgAtTpmManufacturer:i,tcgAtTpmModel:o,tcgAtTpmVersion:a}}function kx(t){if(t==="TPM_ALG_SHA256")return J.ES256;if(t==="TPM_ALG_SHA384")return J.ES384;if(t==="TPM_ALG_SHA512")return J.ES512;throw new Error(`Unexpected TPM attested name alg ${t}`)}var af,Cy="1.3.6.1.4.1.11129.2.1.17",sf;(function(t){t[t.verified=0]="verified",t[t.selfSigned=1]="selfSigned",t[t.unverified=2]="unverified",t[t.failed=3]="failed"})(sf||(sf={}));var fo=class{verifiedBootKey=new G;deviceLocked=!1;verifiedBootState=sf.verified;verifiedBootHash;constructor(e={}){Object.assign(this,e)}};c([u({type:G})],fo.prototype,"verifiedBootKey",void 0);c([u({type:f.Boolean})],fo.prototype,"deviceLocked",void 0);c([u({type:f.Enumerated})],fo.prototype,"verifiedBootState",void 0);c([u({type:G,optional:!0})],fo.prototype,"verifiedBootHash",void 0);var ba=af=class extends q{constructor(e){super(e),Object.setPrototypeOf(this,af.prototype)}};ba=af=c([T({type:x.Set,itemType:f.Integer})],ba);var oe=class{purpose;algorithm;keySize;digest;padding;ecCurve;rsaPublicExponent;mgfDigest;rollbackResistance;earlyBootOnly;activeDateTime;originationExpireDateTime;usageExpireDateTime;usageCountLimit;noAuthRequired;userAuthType;authTimeout;allowWhileOnBody;trustedUserPresenceRequired;trustedConfirmationRequired;unlockedDeviceRequired;allApplications;applicationId;creationDateTime;origin;rollbackResistant;rootOfTrust;osVersion;osPatchLevel;attestationApplicationId;attestationIdBrand;attestationIdDevice;attestationIdProduct;attestationIdSerial;attestationIdImei;attestationIdMeid;attestationIdManufacturer;attestationIdModel;vendorPatchLevel;bootPatchLevel;deviceUniqueAttestation;attestationIdSecondImei;moduleHash;constructor(e={}){Object.assign(this,e)}};c([u({context:1,type:ba,optional:!0})],oe.prototype,"purpose",void 0);c([u({context:2,type:f.Integer,optional:!0})],oe.prototype,"algorithm",void 0);c([u({context:3,type:f.Integer,optional:!0})],oe.prototype,"keySize",void 0);c([u({context:5,type:ba,optional:!0})],oe.prototype,"digest",void 0);c([u({context:6,type:ba,optional:!0})],oe.prototype,"padding",void 0);c([u({context:10,type:f.Integer,optional:!0})],oe.prototype,"ecCurve",void 0);c([u({context:200,type:f.Integer,optional:!0})],oe.prototype,"rsaPublicExponent",void 0);c([u({context:203,type:ba,optional:!0})],oe.prototype,"mgfDigest",void 0);c([u({context:303,type:f.Null,optional:!0})],oe.prototype,"rollbackResistance",void 0);c([u({context:305,type:f.Null,optional:!0})],oe.prototype,"earlyBootOnly",void 0);c([u({context:400,type:f.Integer,optional:!0})],oe.prototype,"activeDateTime",void 0);c([u({context:401,type:f.Integer,optional:!0})],oe.prototype,"originationExpireDateTime",void 0);c([u({context:402,type:f.Integer,optional:!0})],oe.prototype,"usageExpireDateTime",void 0);c([u({context:405,type:f.Integer,optional:!0})],oe.prototype,"usageCountLimit",void 0);c([u({context:503,type:f.Null,optional:!0})],oe.prototype,"noAuthRequired",void 0);c([u({context:504,type:f.Integer,optional:!0})],oe.prototype,"userAuthType",void 0);c([u({context:505,type:f.Integer,optional:!0})],oe.prototype,"authTimeout",void 0);c([u({context:506,type:f.Null,optional:!0})],oe.prototype,"allowWhileOnBody",void 0);c([u({context:507,type:f.Null,optional:!0})],oe.prototype,"trustedUserPresenceRequired",void 0);c([u({context:508,type:f.Null,optional:!0})],oe.prototype,"trustedConfirmationRequired",void 0);c([u({context:509,type:f.Null,optional:!0})],oe.prototype,"unlockedDeviceRequired",void 0);c([u({context:600,type:f.Null,optional:!0})],oe.prototype,"allApplications",void 0);c([u({context:601,type:G,optional:!0})],oe.prototype,"applicationId",void 0);c([u({context:701,type:f.Integer,optional:!0})],oe.prototype,"creationDateTime",void 0);c([u({context:702,type:f.Integer,optional:!0})],oe.prototype,"origin",void 0);c([u({context:703,type:f.Null,optional:!0})],oe.prototype,"rollbackResistant",void 0);c([u({context:704,type:fo,optional:!0})],oe.prototype,"rootOfTrust",void 0);c([u({context:705,type:f.Integer,optional:!0})],oe.prototype,"osVersion",void 0);c([u({context:706,type:f.Integer,optional:!0})],oe.prototype,"osPatchLevel",void 0);c([u({context:709,type:G,optional:!0})],oe.prototype,"attestationApplicationId",void 0);c([u({context:710,type:G,optional:!0})],oe.prototype,"attestationIdBrand",void 0);c([u({context:711,type:G,optional:!0})],oe.prototype,"attestationIdDevice",void 0);c([u({context:712,type:G,optional:!0})],oe.prototype,"attestationIdProduct",void 0);c([u({context:713,type:G,optional:!0})],oe.prototype,"attestationIdSerial",void 0);c([u({context:714,type:G,optional:!0})],oe.prototype,"attestationIdImei",void 0);c([u({context:715,type:G,optional:!0})],oe.prototype,"attestationIdMeid",void 0);c([u({context:716,type:G,optional:!0})],oe.prototype,"attestationIdManufacturer",void 0);c([u({context:717,type:G,optional:!0})],oe.prototype,"attestationIdModel",void 0);c([u({context:718,type:f.Integer,optional:!0})],oe.prototype,"vendorPatchLevel",void 0);c([u({context:719,type:f.Integer,optional:!0})],oe.prototype,"bootPatchLevel",void 0);c([u({context:720,type:f.Null,optional:!0})],oe.prototype,"deviceUniqueAttestation",void 0);c([u({context:723,type:G,optional:!0})],oe.prototype,"attestationIdSecondImei",void 0);c([u({context:724,type:G,optional:!0})],oe.prototype,"moduleHash",void 0);var dn;(function(t){t[t.software=0]="software",t[t.trustedEnvironment=1]="trustedEnvironment",t[t.strongBox=2]="strongBox"})(dn||(dn={}));var ya;(function(t){t[t.KM2=1]="KM2",t[t.KM3=2]="KM3",t[t.KM4=3]="KM4",t[t.KM4_1=4]="KM4_1",t[t.keyMint1=100]="keyMint1",t[t.keyMint2=200]="keyMint2",t[t.keyMint3=300]="keyMint3",t[t.keyMint4=400]="keyMint4"})(ya||(ya={}));var Mt=class{attestationVersion=ya.KM4;attestationSecurityLevel=dn.software;keymasterVersion=0;keymasterSecurityLevel=dn.software;attestationChallenge=new G;uniqueId=new G;softwareEnforced=new oe;teeEnforced=new oe;constructor(e={}){Object.assign(this,e)}};c([u({type:f.Integer})],Mt.prototype,"attestationVersion",void 0);c([u({type:f.Enumerated})],Mt.prototype,"attestationSecurityLevel",void 0);c([u({type:f.Integer})],Mt.prototype,"keymasterVersion",void 0);c([u({type:f.Enumerated})],Mt.prototype,"keymasterSecurityLevel",void 0);c([u({type:G})],Mt.prototype,"attestationChallenge",void 0);c([u({type:G})],Mt.prototype,"uniqueId",void 0);c([u({type:oe})],Mt.prototype,"softwareEnforced",void 0);c([u({type:oe})],Mt.prototype,"teeEnforced",void 0);var Dr=class t{attestationVersion=ya.keyMint4;attestationSecurityLevel=dn.software;keyMintVersion=0;keyMintSecurityLevel=dn.software;attestationChallenge=new G;uniqueId=new G;softwareEnforced=new oe;hardwareEnforced=new oe;constructor(e={}){Object.assign(this,e)}toLegacyKeyDescription(){return new Mt({attestationVersion:this.attestationVersion,attestationSecurityLevel:this.attestationSecurityLevel,keymasterVersion:this.keyMintVersion,keymasterSecurityLevel:this.keyMintSecurityLevel,attestationChallenge:this.attestationChallenge,uniqueId:this.uniqueId,softwareEnforced:this.softwareEnforced,teeEnforced:this.hardwareEnforced})}static fromLegacyKeyDescription(e){return new t({attestationVersion:e.attestationVersion,attestationSecurityLevel:e.attestationSecurityLevel,keyMintVersion:e.keymasterVersion,keyMintSecurityLevel:e.keymasterSecurityLevel,attestationChallenge:e.attestationChallenge,uniqueId:e.uniqueId,softwareEnforced:e.softwareEnforced,hardwareEnforced:e.teeEnforced})}};c([u({type:f.Integer})],Dr.prototype,"attestationVersion",void 0);c([u({type:f.Enumerated})],Dr.prototype,"attestationSecurityLevel",void 0);c([u({type:f.Integer})],Dr.prototype,"keyMintVersion",void 0);c([u({type:f.Enumerated})],Dr.prototype,"keyMintSecurityLevel",void 0);c([u({type:G})],Dr.prototype,"attestationChallenge",void 0);c([u({type:G})],Dr.prototype,"uniqueId",void 0);c([u({type:oe})],Dr.prototype,"softwareEnforced",void 0);c([u({type:oe})],Dr.prototype,"hardwareEnforced",void 0);var cf,lf=class extends oe{};lf=c([T({type:x.Choice})],lf);var va=cf=class extends q{constructor(e){super(e),Object.setPrototypeOf(this,cf.prototype)}findProperty(e){let r=this.find(n=>n[e]!==void 0);if(r)return r[e]}};va=cf=c([T({type:x.Sequence,itemType:lf})],va);var lr=class{attestationVersion=ya.KM4;attestationSecurityLevel=dn.software;keymasterVersion=0;keymasterSecurityLevel=dn.software;attestationChallenge=new G;uniqueId=new G;softwareEnforced=new va;teeEnforced=new va;get keyMintVersion(){return this.keymasterVersion}set keyMintVersion(e){this.keymasterVersion=e}get keyMintSecurityLevel(){return this.keymasterSecurityLevel}set keyMintSecurityLevel(e){this.keymasterSecurityLevel=e}get hardwareEnforced(){return this.teeEnforced}set hardwareEnforced(e){this.teeEnforced=e}constructor(e={}){Object.assign(this,e)}};c([u({type:f.Integer})],lr.prototype,"attestationVersion",void 0);c([u({type:f.Enumerated})],lr.prototype,"attestationSecurityLevel",void 0);c([u({type:f.Integer})],lr.prototype,"keymasterVersion",void 0);c([u({type:f.Enumerated})],lr.prototype,"keymasterSecurityLevel",void 0);c([u({type:G})],lr.prototype,"attestationChallenge",void 0);c([u({type:G})],lr.prototype,"uniqueId",void 0);c([u({type:va})],lr.prototype,"softwareEnforced",void 0);c([u({type:va})],lr.prototype,"teeEnforced",void 0);var Ty=class extends lr{constructor(e={}){"keymasterVersion"in e&&!("keyMintVersion"in e)&&(e.keyMintVersion=e.keymasterVersion),"keymasterSecurityLevel"in e&&!("keyMintSecurityLevel"in e)&&(e.keyMintSecurityLevel=e.keymasterSecurityLevel),"teeEnforced"in e&&!("hardwareEnforced"in e)&&(e.hardwareEnforced=e.teeEnforced),super(e)}};Ty=c([T({type:x.Sequence})],Ty);var gc=class{packageName;version;constructor(e={}){Object.assign(this,e)}};c([u({type:f.OctetString})],gc.prototype,"packageName",void 0);c([u({type:f.Integer})],gc.prototype,"version",void 0);var ld=class{packageInfos;signatureDigests;constructor(e={}){Object.assign(this,e)}};c([u({type:gc,repeated:"set"})],ld.prototype,"packageInfos",void 0);c([u({type:f.OctetString,repeated:"set"})],ld.prototype,"signatureDigests",void 0);async function Iy(t){let{authData:e,clientDataHash:r,attStmt:n,credentialPublicKey:i,aaguid:o,rootCertificates:a}=t,s=n.get("x5c"),l=n.get("sig"),d=n.get("alg");if(!s)throw new Error("No attestation certificate provided in attestation statement (Android Key)");if(!l)throw new Error("No attestation signature provided in attestation statement (Android Key)");if(!d)throw new Error("Attestation statement did not contain alg (Android Key)");if(!Ot(d))throw new Error(`Attestation statement contained invalid alg ${d} (Android Key)`);let p=Ie.parse(s[0],Ne),m=new Uint8Array(p.tbsCertificate.subjectPublicKeyInfo.subjectPublicKey),g=Eo(i);if(!ee.areEqual(g,m))throw new Error("Credential public key does not equal leaf cert public key (Android Key)");let C=p.tbsCertificate.extensions?.find(R=>R.extnID===Cy);if(!C)throw new Error("Certificate did not contain extKeyStore (Android Key)");let I=Ie.parse(C.extnValue,Mt),{attestationChallenge:b,teeEnforced:A,softwareEnforced:v}=I;if(!ee.areEqual(new Uint8Array(b.buffer),r))throw new Error("Attestation challenge was not equal to client data hash (Android Key)");if(A.allApplications!==void 0)throw new Error('teeEnforced contained "allApplications [600]" tag (Android Key)');if(v.allApplications!==void 0)throw new Error('teeEnforced contained "allApplications [600]" tag (Android Key)');let y=await ti.getStatement(o);if(y)try{await ri({statement:y,credentialPublicKey:i,x5c:s,attestationStatementAlg:d})}catch(R){let O=R;throw new Error(`${O.message} (Android Key)`,{cause:O})}else{let R=s.slice(0,-1).map(Ve),O=s.slice(-1).map(Ve);try{await st(R,O)}catch(V){let W=V;throw new Error(`${W.message} (Android Key)`,{cause:W})}if(a.length>0&&a.indexOf(O[0])<0)throw new Error("x5c root certificate was not a known root certificate (Android Key)")}let k=ee.concat([e,r]);return _t({signature:l,data:k,x509Certificate:s[0],hashAlgorithm:d})}async function _y(t){let{attStmt:e,authData:r,clientDataHash:n,credentialPublicKey:i,rootCertificates:o}=t,a=e.get("x5c");if(!a)throw new Error("No attestation certificate provided in attestation statement (Apple)");try{await st(a.map(Ve),o)}catch(A){let v=A;throw new Error(`${v.message} (Apple)`)}let s=Ie.parse(a[0],Ne),{extensions:l,subjectPublicKeyInfo:d}=s.tbsCertificate;if(!l)throw new Error("credCert missing extensions (Apple)");let p=l.find(A=>A.extnID==="1.2.840.113635.100.8.2");if(!p)throw new Error('credCert missing "1.2.840.113635.100.8.2" extension (Apple)');let m=ee.concat([r,n]),g=await It(m),C=new Uint8Array(p.extnValue.buffer).slice(6);if(!ee.areEqual(g,C))throw new Error("credCert nonce was not expected value (Apple)");let I=Eo(i),b=new Uint8Array(d.subjectPublicKey);if(!ee.areEqual(I,b))throw new Error("Credential public key does not equal credCert public key (Apple)");return!0}async function Ry(t){let{response:e,expectedChallenge:r,expectedOrigin:n,expectedRPID:i,expectedType:o,requireUserPresence:a=!0,requireUserVerification:s=!0,supportedAlgorithmIDs:l=tf(),attestationSafetyNetEnforceCTSCheck:d=!0}=t,{id:p,rawId:m,type:g,response:C}=e;if(!p)throw new Error("Missing credential ID");if(p!==m)throw new Error("Credential ID was not base64url-encoded");if(g!=="public-key")throw new Error(`Unexpected credential type ${g}, expected "public-key"`);let I=Tc(C.clientDataJSON),{type:b,origin:A,challenge:v,tokenBinding:y}=I;if(Array.isArray(o)){if(!o.includes(b)){let re=o.join(", ");throw new Error(`Unexpected registration response type "${b}", expected one of: ${re}`)}}else if(o){if(b!==o)throw new Error(`Unexpected registration response type "${b}", expected "${o}"`)}else if(b!=="webauthn.create")throw new Error(`Unexpected registration response type: ${b}`);if(typeof r=="function"){if(!await r(v))throw new Error(`Custom challenge verifier returned false for registration response challenge "${v}"`)}else if(v!==r)throw new Error(`Unexpected registration response challenge "${v}", expected "${r}"`);if(Array.isArray(n)){if(!n.includes(A))throw new Error(`Unexpected registration response origin "${A}", expected one of: ${n.join(", ")}`)}else if(A!==n)throw new Error(`Unexpected registration response origin "${A}", expected "${n}"`);if(y){if(typeof y!="object")throw new Error(`Unexpected value for TokenBinding "${y}"`);if(["present","supported","not-supported"].indexOf(y.status)<0)throw new Error(`Unexpected tokenBinding.status value of "${y.status}"`)}let k=ce.toBuffer(C.attestationObject),R=Yf(k),O=R.get("fmt"),V=R.get("authData"),W=R.get("attStmt"),N=td(V),{aaguid:h,rpIdHash:E,flags:w,credentialID:M,counter:B,credentialPublicKey:L,extensionsData:P}=N,ge;if(i){let re=[];typeof i=="string"?re=[i]:re=i,ge=await ad(E,re)}if(a&&!w.up)throw new Error("User presence was required, but user was not present");if(s&&!w.uv)throw new Error("User verification was required, but user could not be verified");if(!M)throw new Error("No credential ID was provided by authenticator");if(!L)throw new Error("No public key was provided by authenticator");if(!h)throw new Error("No AAGUID was present during registration");let z=mr(L).get(ie.alg);if(typeof z!="number")throw new Error("Credential public key was missing numeric alg");if(!l.includes(z)){let re=l.join(", ");throw new Error(`Unexpected public key alg "${z}", expected one of "${re}"`)}if(Sc(z)&&!Rt.runtimeSupportsPQC())throw new Zn(z);let de=await It(ce.toBuffer(C.clientDataJSON)),Se=Rt.getRootCertificates({identifier:O}),we={aaguid:h,attStmt:W,authData:V,clientDataHash:de,credentialID:M,credentialPublicKey:L,rootCertificates:Se,rpIdHash:E,attestationSafetyNetEnforceCTSCheck:d},te=!1;if(O==="fido-u2f")te=await uy(we);else if(O==="packed")te=await gy(we);else if(O==="android-safetynet")te=await by(we);else if(O==="android-key")te=await Iy(we);else if(O==="tpm")te=await Sy(we);else if(O==="apple")te=await _y(we);else if(O==="none"){if(W.size>0)throw new Error("None attestation had unexpected attestation statement");te=!0}else throw new Error(`Unsupported Attestation Format: ${O}`);if(!te)return{verified:!1};let{credentialDeviceType:tt,credentialBackedUp:Ae}=od(w);return{verified:!0,registrationInfo:{fmt:O,aaguid:Cc(h),credentialType:g,credential:{id:ce.fromBuffer(M),publicKey:L,counter:B,transports:e.response.transports},attestationObject:k,userVerified:w.uv,credentialDeviceType:tt,credentialBackedUp:Ae,origin:I.origin,rpID:ge,authenticatorExtensionResults:P}}}async function By(t){let{allowCredentials:e,challenge:r=await Ic(),timeout:n=6e4,userVerification:i="preferred",extensions:o,rpID:a}=t,s=r;return typeof s=="string"&&(s=ee.fromUTF8String(s)),{rpId:a,challenge:ce.fromBuffer(s),allowCredentials:e?.map(l=>{if(!ce.isBase64URL(l.id))throw new Error(`allowCredential id "${l.id}" is not a valid base64url string`);return{...l,id:ce.trimPadding(l.id),type:"public-key"}}),timeout:n,userVerification:i,extensions:o}}async function My(t){let{response:e,expectedChallenge:r,expectedOrigin:n,expectedRPID:i,expectedType:o,expectedTopOrigin:a,credential:s,requireUserVerification:l=!0,advancedFIDOConfig:d}=t,{id:p,rawId:m,type:g,response:C}=e;if(!p)throw new Error("Missing credential ID");if(p!==m)throw new Error("Credential ID was not base64url-encoded");if(g!=="public-key")throw new Error(`Unexpected credential type ${g}, expected "public-key"`);if(!e)throw new Error("Credential missing response");if(typeof C?.clientDataJSON!="string")throw new Error("Credential response clientDataJSON was not a string");let I=Tc(C.clientDataJSON),{type:b,origin:A,challenge:v,tokenBinding:y,crossOrigin:k,topOrigin:R}=I;if(Array.isArray(o)){if(!o.includes(b)){let we=o.join(", ");throw new Error(`Unexpected authentication response type "${b}", expected one of: ${we}`)}}else if(o){if(b!==o)throw new Error(`Unexpected authentication response type "${b}", expected "${o}"`)}else if(b!=="webauthn.get")throw new Error(`Unexpected authentication response type: ${b}`);if(typeof r=="function"){if(!await r(v))throw new Error(`Custom challenge verifier returned false for registration response challenge "${v}"`)}else if(v!==r)throw new Error(`Unexpected authentication response challenge "${v}", expected "${r}"`);if(k){if(R){if(!a)throw new Error(`Detected cross-origin authentication response from top origin of "${R}", but a value for \`expectedTopOrigin\` was not specified when calling \`verifyAuthenticationResponse()\``);if(Array.isArray(a)){if(!a.includes(R)){let we=a.join(", ");throw new Error(`Unexpected cross-origin authentication response top origin of "${R}", expected one of: ${we}`)}}else if(R!==a)throw new Error(`Unexpected cross-origin authentication response top origin of "${R}", expected: ${a}`)}}else if(R)throw new Error(`Unexpected top origin of "${R}" within a non-cross-origin authentication response. This error should be reported to the browser vendor as a WebAuthn specification violation with a link to https://w3c.github.io/webauthn/#dom-collectedclientdata-toporigin`);if(Array.isArray(n)){if(!n.includes(A)){let we=n.join(", ");throw new Error(`Unexpected authentication response origin "${A}", expected one of: ${we}`)}}else if(A!==n)throw new Error(`Unexpected authentication response origin "${A}", expected "${n}"`);if(!ce.isBase64URL(C.authenticatorData))throw new Error("Credential response authenticatorData was not a base64url string");if(!ce.isBase64URL(C.signature))throw new Error("Credential response signature was not a base64url string");if(C.userHandle&&typeof C.userHandle!="string")throw new Error("Credential response userHandle was not a string");if(y){if(typeof y!="object")throw new Error("ClientDataJSON tokenBinding was not an object");if(["present","supported","notSupported"].indexOf(y.status)<0)throw new Error(`Unexpected tokenBinding status ${y.status}`)}let O=ce.toBuffer(C.authenticatorData),V=td(O),{rpIdHash:W,flags:N,counter:h,extensionsData:E}=V,w=[];typeof i=="string"?w=[i]:w=i;let M=await ad(W,w);if(d!==void 0){let{userVerification:we}=d;if(we==="required"&&!N.uv)throw new Error("User verification required, but user could not be verified")}else{if(!N.up)throw new Error("User not present during authentication");if(l&&!N.uv)throw new Error("User verification required, but user could not be verified")}let B=await It(ce.toBuffer(C.clientDataJSON)),L=ee.concat([O,B]),P=ce.toBuffer(C.signature);if((h>0||s.counter>0)&&h<=s.counter)throw new Error(`Response counter value ${h} was lower than expected ${s.counter}`);let ve=mr(s.publicKey).get(ie.alg);if(typeof ve!="number")throw new Error("Credential public key was missing numeric alg");if(Sc(ve)&&!Rt.runtimeSupportsPQC())throw new Zn(ve);let{credentialDeviceType:z,credentialBackedUp:de}=od(N);return{verified:await _t({signature:P,data:L,credentialPublicKey:s.publicKey}),authenticationInfo:{newCounter:h,credentialID:s.id,userVerified:N.uv,credentialDeviceType:z,credentialBackedUp:de,authenticatorExtensionResults:E,origin:I.origin,rpID:M}}}var xe=globalThis.CasinoMoney,un=globalThis.CasinoEngine,Sx=globalThis.CasinoBlackjack,yc="https://roulette-club-777-oct15.lonivxy.chatgpt.site",dd=new URL(yc).hostname,ud="__Host-club-admin",Py="__Host-club-challenge",Oy=15*6e4,ni=(t,e=200,r={})=>new Response(xe.stringify(t),{status:e,headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store","X-Content-Type-Options":"nosniff",...r}}),ue=(t,e=400)=>{throw Object.assign(new Error(t),{status:e})},ff=t=>btoa(String.fromCharCode(...t)).replaceAll("+","-").replaceAll("/","_").replaceAll("=",""),Cx=t=>Uint8Array.from(atob(t.replaceAll("-","+").replaceAll("_","/")),e=>e.charCodeAt(0)),Ny=()=>ff(crypto.getRandomValues(new Uint8Array(32))),wa=async t=>ff(new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(t)))),df=(t,e,r)=>`${t}=${e}; Path=/; Max-Age=${r}; Secure; HttpOnly; SameSite=Strict`;function uf(t,e){return t.headers.get("cookie")?.split(";").map(r=>r.trim()).find(r=>r.startsWith(e+"="))?.slice(e.length+1)||""}function bc(t){return t.headers.get("oai-authenticated-user-id")||ue("\u8BF7\u5148\u4F7F\u7528\u672C\u7AD9\u6240\u5C5E\u8D26\u53F7\u767B\u5F55\u3002",401)}function pf(t){let e=new un({getItem:()=>t,setItem(){}},void 0,()=>Date.now(),{recoverRoulette:!1});return e.storageWarning&&ue("\u670D\u52A1\u5668\u8D26\u6237\u6570\u636E\u6821\u9A8C\u5931\u8D25\u3002",500),e}function Ly(t){let e=0,r=-1;for(let n=0;n<24;n++){let i=mf(t,n);i>r&&(r=i,e=n)}return e}function mf(t,e){return xe.add(xe.mul(t.numbers[e]||0,24),e===0?xe.mul(t.GREEN,24):e%2?xe.mul(xe.add(t.RED,t.ODD),2):xe.mul(xe.add(t.BLACK,t.EVEN),2))}function Tx(t,[e,r]){t.ensureIdle();let n=t.active,i=t.amount(r);i>n.balance&&ue("\u94B1\u5305\u4F59\u989D\u4E0D\u8DB3\u3002"),typeof e=="number"&&Number.isInteger(e)&&e>=0&&e<24?n.bets.numbers[e]=xe.add(n.bets.numbers[e]||0,i):["RED","BLACK","GREEN","ODD","EVEN"].includes(e)?n.bets[e]=xe.add(n.bets[e],i):ue("\u65E0\u6548\u7684\u8F6E\u76D8\u4E0B\u6CE8\u3002"),n.balance=xe.sub(n.balance,i)}function Ix(t,e){t.ensureIdle();let r=t.active,n=un.sumBets(r.bets);n||ue("\u8BF7\u5148\u653E\u7F6E\u7B79\u7801\u3002");let i=structuredClone(r.bets),o=e?Ly(i):Math.floor(t.random()*24),a=mf(i,o),s=structuredClone(r.recovery||null);r.balance=xe.add(r.balance,a),r.lastBets=i,r.bets=un.emptyBets(),r.pendingRoulette=!1;let l={roundId:crypto.randomUUID(),number:o,index:o,wager:n,payout:a,bets:i,rigged:!!e};return t.completeRound(xe.sub(a,n)),l.recoveryBefore=s,l.settlement={balance:r.balance,recovery:structuredClone(r.recovery||null)},r.lastRoulette=l,r.history.unshift({num:o,colorTag:o===0?"GREEN":o%2?"RED":"BLACK"}),r.history=r.history.slice(0,10),t.record(`${r.name} \xB7 Roulette ${o}: wager ${n.toLocaleString()}, payout ${a.toLocaleString()}.`),l}async function Dy(t,e,r,n){(!Array.isArray(r)||r.length>5)&&ue("\u65E0\u6548\u7684\u64CD\u4F5C\u53C2\u6570\u3002");let i=new Sx(t),o={gift:"transfer",offerLoan:"offerLoan",respondLoan:"respondLoan",cancelLoan:"cancelLoan",repayLoan:"repayLoan",repayAll:"repayAll",borrow:"borrow",repay:"repay",borrowShark:"borrowShark",repayShark:"repayShark",buyCard:"buyCard",armCard:"armCard"};if(Object.hasOwn(o,e))return t[o[e]](...r);if(["addUser","deletePlayer","adminAdjust","import"].includes(e)&&!n&&ue("\u8BF7\u5148\u901A\u8FC7 Windows Hello \u7BA1\u7406\u9A8C\u8BC1\u3002",403),["addUser","deletePlayer","adminAdjust"].includes(e))return t[e](...r);if(e==="lottery")return(r.length>2||r[1]!==void 0&&(!r[1]||typeof r[1]!="object"||Array.isArray(r[1])))&&ue("\u65E0\u6548\u7684\u5F69\u7968\u9009\u9879\u3002"),t.buyLottery(r[0],{jackpot:!!r[1]?.jackpot});if(e==="plinko")return t.playPlinko(...r);if(e==="dice")return t.playDice(...r);if(e==="slots")return r[1]&&typeof r[1]!="object"&&ue("\u65E0\u6548\u7684\u4E0B\u6CE8\u9009\u9879\u3002"),t.spinSlots(r[0],null,{allIn:!!r[1]?.allIn,jackpot:!!r[1]?.jackpot});if(e==="blackjack"){let[a,s]=r;return["start","hit","stand","double","split","dealerStep","forceJackpot"].includes(a)||ue("\u65E0\u6548\u7684\u4E8C\u5341\u4E00\u70B9\u64CD\u4F5C\u3002"),i[a](s)}if(e==="roulette.bet")return Tx(t,r),null;if(e==="roulette.clear")return t.ensureIdle(),t.active.balance=xe.add(t.active.balance,un.sumBets(t.active.bets)),t.active.bets=un.emptyBets(),null;if(e==="roulette.rebet"){t.ensureIdle();let a=t.active;a.lastBets||ue("\u6CA1\u6709\u4E0A\u4E00\u8F6E\u4E0B\u6CE8\u3002");let s=un.sumBets(a.lastBets),l=xe.add(a.balance,un.sumBets(a.bets));return s>l&&ue("\u4F59\u989D\u4E0D\u8DB3\u4EE5\u91CD\u590D\u4E0B\u6CE8\u3002"),a.balance=xe.sub(l,s),a.bets=structuredClone(a.lastBets),null}if(e==="roulette.spin")return Ix(t,!!r[0]);if(e==="roulette.rig"){t.ensureIdle();let a=t.active,s=a.lastRoulette;(!s||s.roundId!==r[0])&&ue("\u8FD9\u8F6E\u8F6E\u76D8\u5DF2\u7ECF\u7ED3\u675F\u3002");let l=Ly(s.bets),d=mf(s.bets,l),p=xe.sub(d,s.payout);return p&&(s.settlement&&(a.balance!==s.settlement.balance||xe.stringify(a.recovery||null)!==xe.stringify(s.settlement.recovery))&&ue("\u8D26\u6237\u5DF2\u53D1\u751F\u5176\u4ED6\u53D8\u52A8\uFF0C\u4E0D\u80FD\u518D\u8C03\u6574\u8FD9\u8F6E\u7ED3\u679C\u3002"),!s.recoveryBefore&&s.settlement?.recovery&&(a.recovery=null,a.balance=xe.sub(a.balance,10)),a.balance=xe.add(a.balance,p),s.number=s.index=l,s.payout=d,s.rigged=!0,t.completeRound(p),s.settlement={balance:a.balance,recovery:structuredClone(a.recovery||null)},a.history[0]&&(a.history[0]={num:l,colorTag:l===0?"GREEN":l%2?"RED":"BLACK"}),p&&t.record(`${a.name} \xB7 Roulette jackpot adjustment +${p.toLocaleString()}.`)),s}ue("\u672A\u77E5\u64CD\u4F5C\u3002",404)}function hf({page:t="",webauthn:e={generateRegistrationOptions:dy,verifyRegistrationResponse:Ry,generateAuthenticationOptions:By,verifyAuthenticationResponse:My},v2:r=!1,bootstrapOwnerPrivate:n=!1,clock:i,credentialKey:o="owner",extensions:a={}}={}){if(r)return Hf({page:t,applyCommand:Dy,bootstrapOwnerPrivate:n,clock:i,origin:yc,extensions:{action:Bf,clubView:Sa,read:Mf,...a},legacyFactory:I=>hf({webauthn:e,...I})});async function s(I){let b=await I.prepare("SELECT snapshot, revision FROM casino_state WHERE id = ?").bind("club").first();if(!b){let A=pf(xe.stringify(new un(null).data));await I.prepare("INSERT OR IGNORE INTO casino_state (id,snapshot,revision,last_op) VALUES (?,?,0,?)").bind("club",xe.stringify(A.data),"initial").run(),b=await I.prepare("SELECT snapshot, revision FROM casino_state WHERE id = ?").bind("club").first()}return b}async function l(I,b){let A=uf(I,ud);if(!A)return!1;let v=await b.prepare("SELECT actor,expires_at FROM admin_sessions WHERE id = ?").bind(await wa(A)).first();return!!(v&&v.actor===bc(I)&&v.expires_at>Date.now())}async function d(I,b){let A=await b.prepare("SELECT actor FROM admin_credential WHERE id = ?").bind(o).first();return{enrolled:!!A,admin:await l(I,b),canEnroll:!A}}async function p(I,b){let A=Ny();return await b.prepare("INSERT INTO admin_sessions (id,actor,expires_at) VALUES (?,?,?)").bind(await wa(A),bc(I),Date.now()+Oy).run(),ni({ok:!0},200,{"Set-Cookie":df(ud,A,Oy/1e3)})}async function m(I,b,A){let v=bc(I),y=await l(I,b),{id:k,command:R,args:O=[],playerId:V}=A;(typeof k!="string"||k.length<16||k.length>80||typeof R!="string")&&ue("\u65E0\u6548\u7684\u64CD\u4F5C\u7F16\u53F7\u3002");let W=await wa(xe.stringify({operation:R,args:O,playerId:V}));for(let N=0;N<4;N++){let h=await b.prepare("SELECT actor,payload,response FROM casino_operations WHERE id = ?").bind(k).first();if(h){(h.actor!==v||h.payload!==W)&&ue("\u64CD\u4F5C\u7F16\u53F7\u5DF2\u88AB\u4F7F\u7528\u3002",409);let z=await g(I,b);return z.data.users.some(de=>de.id===V)&&(z.data.activeId=V),ni({...z,result:xe.parseJSON(h.response).result})}let E=await s(b),w=pf(E.snapshot);(typeof V!="string"||!w.data.users.some(z=>z.id===V))&&ue("\u8BF7\u9009\u62E9\u6709\u6548\u73A9\u5BB6\u3002"),w.data.activeId=V;let M=w.data.users.find(z=>z.blackjack&&z.blackjack.phase!=="settled");M&&M.id!==V&&ue("\u8BF7\u5148\u5B8C\u6210 "+M.name+" \u7684\u4E8C\u5341\u4E00\u70B9\u724C\u5C40\u3002",409);let B;if(R==="import"){y||ue("\u9700\u8981\u7BA1\u7406\u9A8C\u8BC1\u3002",403),E.revision!==0&&ue("\u670D\u52A1\u5668\u5DF2\u6709\u65B0\u8BB0\u5F55\uFF0C\u4E0D\u80FD\u8986\u76D6\u5BFC\u5165\u3002",409),(!O[0]||typeof O[0]!="object")&&ue("\u65E7\u5B58\u6863\u65E0\u6548\u3002");let z=xe.stringify(O[0]),de=new un({getItem:()=>z,setItem(){}});de.storageWarning&&ue("\u65E7\u5B58\u6863\u6821\u9A8C\u5931\u8D25\uFF0C\u5DF2\u4FDD\u7559\u539F\u6587\u4EF6\u3002"),w=de,w.record("\u7BA1\u7406\u5458\u5BFC\u5165\u4E86\u6B64\u524D\u6D4F\u89C8\u5668\u7684\u73A9\u5BB6\u5B58\u6863\u3002"),B=null}else try{B=await Dy(w,R,O,y)}catch(z){if(z.status)throw z;ue(z.message||"\u64CD\u4F5C\u672A\u5B8C\u6210\u3002")}w.save();let L=xe.stringify(w.data),P={data:w.data,revision:E.revision+1,result:B??null,now:Date.now()},ge=xe.stringify({result:P.result,revision:P.revision});if((await b.batch([b.prepare("UPDATE casino_state SET snapshot=?,revision=revision+1,last_op=? WHERE id=? AND revision=?").bind(L,k,"club",E.revision),b.prepare("INSERT INTO casino_operations (id,actor,payload,response,created_at) SELECT ?,?,?,?,? WHERE EXISTS (SELECT 1 FROM casino_state WHERE id=? AND last_op=?)").bind(k,v,W,ge,Date.now(),"club",k)]))[0].meta.changes===1)return ni(P)}ue("\u5176\u4ED6\u64CD\u4F5C\u6B63\u5728\u66F4\u65B0\u8D26\u6237\uFF0C\u8BF7\u91CD\u8BD5\u3002",409)}async function g(I,b){for(let A=0;A<4;A++){let v=await s(b),y=pf(v.snapshot),k=xe.stringify(y.data);if(k!==v.snapshot){if(!(await b.prepare("UPDATE casino_state SET snapshot=?,revision=revision+1 WHERE id=? AND revision=?").bind(k,"club",v.revision).run()).meta.changes)continue;v.revision++}let R=new URL(I.url).searchParams.get("playerId");return R&&y.data.users.some(O=>O.id===R)&&(y.data.activeId=R),{data:y.data,revision:v.revision,now:Date.now(),auth:await d(I,b)}}ue("\u8D26\u6237\u6B63\u5728\u66F4\u65B0\uFF0C\u8BF7\u91CD\u8BD5\u3002",409)}async function C(I,b,A,v){let y=bc(I),k=await b.prepare("SELECT * FROM admin_credential WHERE id = ?").bind(o).first();if(A==="/api/admin/status")return ni(await d(I,b));if(A==="/api/admin/logout")return await b.prepare("DELETE FROM admin_sessions WHERE id = ?").bind(await wa(uf(I,ud))).run(),ni({ok:!0},200,{"Set-Cookie":df(ud,"",0)});let R=A.includes("/register/")?"register":"authenticate";if(R==="register"&&k&&ue("\u7BA1\u7406\u901A\u884C\u5BC6\u94A5\u5DF2\u8BBE\u7F6E\uFF0C\u8BF7\u4F7F\u7528\u5DF2\u6709\u5BC6\u94A5\u767B\u5F55\u3002",403),k&&k.actor!==y&&ue("\u5F53\u524D\u8D26\u53F7\u4E0D\u662F\u6B64\u7AD9\u70B9\u7BA1\u7406\u5458\u3002",403),A.endsWith("/options")){await b.prepare("DELETE FROM admin_challenges WHERE expires_at <= ?").bind(Date.now()).run(),await b.prepare("DELETE FROM admin_sessions WHERE expires_at <= ?").bind(Date.now()).run(),R==="authenticate"&&!k&&ue("\u8BF7\u5148\u8BBE\u7F6E\u7BA1\u7406\u901A\u884C\u5BC6\u94A5\u3002"),(await b.prepare("SELECT COUNT(*) AS count FROM admin_challenges WHERE actor=? AND expires_at>?").bind(y,Date.now()).first()).count>=10&&ue("\u9A8C\u8BC1\u8BF7\u6C42\u8FC7\u4E8E\u9891\u7E41\uFF0C\u8BF7\u4E94\u5206\u949F\u540E\u91CD\u8BD5\u3002",429);let W=R==="register"?await e.generateRegistrationOptions({rpName:"Roulette Club Admin",rpID:dd,userName:"Club Administrator",userID:new TextEncoder().encode("club-owner"),attestationType:"none",authenticatorSelection:{authenticatorAttachment:"platform",residentKey:"required",userVerification:"required"},supportedAlgorithmIDs:[-7,-257]}):await e.generateAuthenticationOptions({rpID:dd,userVerification:"required",allowCredentials:[{id:k.credential_id,transports:JSON.parse(k.transports)}]}),N=Ny();return await b.prepare("INSERT INTO admin_challenges (id,actor,kind,challenge,expires_at) VALUES (?,?,?,?,?)").bind(await wa(N),y,R,W.challenge,Date.now()+5*6e4).run(),ni(W,200,{"Set-Cookie":df(Py,N,300)})}A.endsWith("/verify")||ue("\u65E0\u6548\u7684\u9A8C\u8BC1\u8DEF\u5F84\u3002",404);let O=await b.prepare("DELETE FROM admin_challenges WHERE id=? AND actor=? AND kind=? AND expires_at>? RETURNING challenge").bind(await wa(uf(I,Py)),y,R,Date.now()).first();if(O||ue("\u9A8C\u8BC1\u5DF2\u8FC7\u671F\u6216\u5DF2\u4F7F\u7528\uFF0C\u8BF7\u91CD\u65B0\u5F00\u59CB\u3002",401),R==="register"){let V=await e.verifyRegistrationResponse({response:v,expectedChallenge:O.challenge,expectedOrigin:yc,expectedRPID:dd,requireUserVerification:!0,supportedAlgorithmIDs:[-7,-257]});V.verified||ue("\u901A\u884C\u5BC6\u94A5\u9A8C\u8BC1\u5931\u8D25\u3002",401);let W=V.registrationInfo.credential;await b.prepare("INSERT INTO admin_credential (id,actor,credential_id,public_key,counter,transports) VALUES (?,?,?,?,?,?)").bind(o,y,W.id,ff(W.publicKey),W.counter,JSON.stringify(W.transports||["internal"])).run()}else{k||ue("\u672A\u8BBE\u7F6E\u901A\u884C\u5BC6\u94A5\u3002",401);let V=await e.verifyAuthenticationResponse({response:v,expectedChallenge:O.challenge,expectedOrigin:yc,expectedRPID:dd,requireUserVerification:!0,credential:{id:k.credential_id,publicKey:Cx(k.public_key),counter:k.counter,transports:JSON.parse(k.transports)}});V.verified||ue("\u901A\u884C\u5BC6\u94A5\u9A8C\u8BC1\u5931\u8D25\u3002",401),(await b.prepare("UPDATE admin_credential SET counter=? WHERE id=? AND counter=?").bind(V.authenticationInfo.newCounter,o,k.counter).run()).meta.changes||ue("\u9A8C\u8BC1\u8BA1\u6570\u5DF2\u66F4\u65B0\uFF0C\u8BF7\u91CD\u8BD5\u3002",409)}return p(I,b)}return{async fetch(I,b){try{let A=new URL(I.url),v=A.pathname;if(bc(I),b.DB||ue("\u8D26\u6237\u6570\u636E\u5E93\u5C1A\u672A\u8FDE\u63A5\u3002",503),I.method==="POST"){(I.headers.get("origin")!==yc||!I.headers.get("content-type")?.startsWith("application/json"))&&ue("\u8BF7\u6C42\u6765\u6E90\u6821\u9A8C\u5931\u8D25\u3002",403);let R=await I.text();R.length>1e6&&ue("\u8BF7\u6C42\u8FC7\u5927\u3002",413);let O;try{O=xe.parseJSON(R)}catch{ue("\u8BF7\u6C42\u5185\u5BB9\u65E0\u6548\u3002")}if(v==="/api/command")return await m(I,b.DB,O);if(/^\/api\/admin\/(register|authenticate)\/(options|verify)$/.test(v)||v==="/api/admin/logout")return await C(I,b.DB,v,O);ue("\u4E0D\u5B58\u5728\u7684\u63A5\u53E3\u3002",404)}if(I.method!=="GET"&&ue("\u4E0D\u652F\u6301\u7684\u8BF7\u6C42\u65B9\u5F0F\u3002",405),v==="/api/state")return ni(await g(I,b.DB));if(v==="/api/admin/status")return await C(I,b.DB,v);if(v.startsWith("/api/")&&ue("\u4E0D\u5B58\u5728\u7684\u63A5\u53E3\u3002",404),!["/","/player","/admin","/index.html"].includes(v))return new Response("Not found",{status:404});let y=await g(I,b.DB),k=xe.stringify(y).replaceAll("<","\\u003c");return new Response(t.replace("/* SERVER_BOOTSTRAP */",`window.__CASINO_BOOTSTRAP__=${k};`),{headers:{"Content-Type":"text/html;charset=utf-8","Cache-Control":"private, no-store","Permissions-Policy":"publickey-credentials-create=(self), publickey-credentials-get=(self)","X-Frame-Options":"SAMEORIGIN","X-Content-Type-Options":"nosniff"}})}catch(A){return ni({error:A.status?A.message:"\u64CD\u4F5C\u672A\u5B8C\u6210\uFF0C\u8BF7\u5237\u65B0\u540E\u91CD\u8BD5\u3002"},A.status||400)}}}}var b$=hf({page:kf});export{b$ as default};
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

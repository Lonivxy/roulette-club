var Yy=Object.create;var gd=Object.defineProperty;var Qy=Object.getOwnPropertyDescriptor;var Zy=Object.getOwnPropertyNames;var e0=Object.getPrototypeOf,t0=Object.prototype.hasOwnProperty;var gn=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(e,r)=>(typeof require<"u"?require:e)[r]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});var r0=(t,e,r)=>()=>{if(r)throw r[0];try{return t&&(e=t(t=0)),e}catch(n){throw r=[n],n}};var bd=(t,e)=>()=>{try{return e||t((e={exports:{}}).exports,e),e.exports}catch(r){throw e=0,r}},Dt=(t,e)=>{for(var r in e)gd(t,r,{get:e[r],enumerable:!0})},n0=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of Zy(e))!t0.call(t,i)&&i!==r&&gd(t,i,{get:()=>e[i],enumerable:!(n=Qy(e,i))||n.enumerable});return t};var yo=(t,e,r)=>(r=t!=null?Yy(e0(t)):{},n0(e||!t||!t.__esModule?gd(r,"default",{value:t,enumerable:!0}):r,t));var li=bd(()=>{(function(t){"use strict";let e=BigInt(Number.MAX_SAFE_INTEGER);function r(g){if(typeof g=="bigint")return g;if(typeof g=="number"&&Number.isSafeInteger(g))return BigInt(g);if(typeof g=="string"&&/^-?\d+$/.test(g.trim()))return BigInt(g.trim());throw new Error("\u8BF7\u8F93\u5165\u5B8C\u6574\u7684\u6574\u6570\u7B79\u7801\u91D1\u989D\uFF08\u81F3\u5C11 1\uFF09\uFF0C\u4E0D\u652F\u6301\u5C0F\u6570\u6216\u79D1\u5B66\u8BA1\u6570\u6CD5\u3002")}let n=g=>g>=-e&&g<=e?Number(g):g,i=g=>n(r(g)),o=g=>typeof g=="bigint"||typeof g=="number"&&Number.isSafeInteger(g),a=(...g)=>n(g.reduce((b,E)=>b+r(E),0n)),s=(g,b)=>n(r(g)-r(b)),l=(g,b)=>n(r(g)*r(b));function d(g,b,E,P=!1){let R=r(g)*r(b),D=r(E);if(R<0n||D<=0n)throw new Error("Invalid chip ratio.");return n((R+(P&&R?D-1n:0n))/D)}let p=(g,b)=>r(g)<r(b)?-1:r(g)>r(b)?1:0,m=(g,b)=>p(g,b)<=0?g:b,y=(g,b)=>p(g,b)>=0?g:b;function A(g){let b=i(g);if(b<=0)throw new Error("\u8BF7\u8F93\u5165\u81F3\u5C11 1 \u7B79\u7801\u7684\u6574\u6570\u91D1\u989D\u3002");return b}let T=(g,b)=>b&&typeof b=="object"&&!Array.isArray(b)&&Object.keys(b).length===1&&typeof b.$chips=="string"&&/^-?\d+$/.test(b.$chips)?i(b.$chips):b,k=g=>JSON.stringify(g,(b,E)=>typeof E=="bigint"?{$chips:String(E)}:E),O=g=>JSON.parse(g,T);t.CasinoMoney={parse:i,positive:A,valid:o,add:a,sub:s,mul:l,ratio:d,compare:p,min:m,max:y,abs:g=>g<0?s(0,g):g,tryParse:g=>{try{return i(g)}catch{return null}},stringify:k,parseJSON:O,hydrate:g=>O(k(g))}})(globalThis)});var Sf={};Dt(Sf,{collections:()=>xc,emptyPlatform:()=>yd,loadPlatform:()=>Ac,platformWrites:()=>ka,rows:()=>Ur});async function Ac(t,{actor:e,week:r}={}){let n=(await t.prepare("SELECT id,body FROM v2_accounts").all()).results,i=Object.fromEntries(n.map(l=>[l.id,Hr.parseJSON(l.body)])),o=i[e]?.playerId||"",a=await Promise.all(Object.entries(xc).map(async([l,[d]])=>l==="accounts"?[l,n]:l==="claims"&&e?[l,(await t.prepare("SELECT id,body FROM v2_claims WHERE player_id=? AND kind!='round'").bind(o).all()).results]:l==="contributions"&&r?[l,(await t.prepare("SELECT id,body FROM v2_contributions WHERE json_extract(body,'$.week')=?").bind(r).all()).results]:[l,(await t.prepare(`SELECT id,body FROM ${d}`).all()).results])),s=await t.prepare("SELECT body FROM v2_meta WHERE id=?").bind("platform").first();return{meta:s?Hr.parseJSON(s.body):null,...Object.fromEntries(a.map(([l,d])=>[l,Object.fromEntries(d.map(p=>[p.id,Hr.parseJSON(p.body)]))])),events:[],journal:[],backups:[]}}function Ea(t,e,r,n,i,o){let a=["v2_events","v2_journal","v2_claims","v2_backups","v2_definition_versions"].includes(e),s=["id",...Object.keys(i),"body"],l=[r,...Object.values(i).map(d=>n[d]??null),Hr.stringify(n)];return t.prepare(`INSERT INTO ${e} (${s.join(",")}) SELECT ${s.map(()=>"?").join(",")} WHERE EXISTS (SELECT 1 FROM casino_state WHERE id='club' AND last_op=?) ON CONFLICT(id) ${a?"DO NOTHING":"DO UPDATE SET "+s.slice(1).map(d=>`${d}=excluded.${d}`).join(",")}`).bind(...l,o)}function ka(t,e,r,n){let i=[];Hr.stringify(e.meta)!==Hr.stringify(r.meta)&&i.push(Ea(t,"v2_meta","platform",r.meta,{},n));for(let[o,[a,s]]of Object.entries(xc)){for(let[l,d]of Object.entries(r[o]))Hr.stringify(e[o][l])!==Hr.stringify(d)&&i.push(Ea(t,a,l,d,s,n));for(let l of Object.keys(e[o]))Object.hasOwn(r[o],l)||i.push(t.prepare(`DELETE FROM ${a} WHERE id=? AND EXISTS (SELECT 1 FROM casino_state WHERE id='club' AND last_op=?)`).bind(l,n))}for(let o of r.events)i.push(Ea(t,"v2_events",o.id,o,{player_id:"playerId",kind:"kind",created_at:"createdAt"},n));for(let o of r.journal)i.push(Ea(t,"v2_journal",o.id,o,{player_id:"playerId",operation_id:"operationId",actor:"actor",kind:"kind",before:"before",after:"after",created_at:"createdAt"},n));for(let o of r.backups)i.push(Ea(t,"v2_backups",o.id,o,{created_at:"createdAt"},n));return i}function yd(){return{meta:null,...Object.fromEntries(Object.keys(xc).map(t=>[t,{}])),events:[],journal:[],backups:[]}}async function Ur(t,e,r="",n=[],i=100,o=0){if(!["v2_events","v2_journal","v2_backups"].includes(e))throw Error("Unsupported record query");return(await t.prepare(`SELECT body FROM ${e} ${r} ORDER BY created_at DESC,id LIMIT ? OFFSET ?`).bind(...n,i,o).all()).results.map(s=>Hr.parseJSON(s.body))}var jx,Hr,xc,Sa=r0(()=>{jx=yo(li(),1),Hr=globalThis.CasinoMoney,xc={profiles:["v2_profiles",{}],items:["v2_items",{}],accounts:["v2_accounts",{player_id:"playerId",role:"role",status:"status"}],progress:["v2_progress",{xp:"xp",games:"games"}],definitions:["v2_definitions",{kind:"kind",version:"version"}],versions:["v2_definition_versions",{}],inventory:["v2_inventory",{player_id:"playerId",item_id:"itemId"}],claims:["v2_claims",{player_id:"playerId",kind:"kind",created_at:"createdAt"}],clubs:["v2_clubs",{owner_id:"ownerId"}],memberships:["v2_memberships",{club_id:"clubId"}],invitations:["v2_invitations",{club_id:"clubId",target_id:"targetId"}],contributions:["v2_contributions",{club_id:"clubId",player_id:"playerId"}],stats:["v2_period_stats",{player_id:"playerId",period:"period",xp:"xp",games:"games"}],wallets:["v2_wallet_index",{visible:"visible",sign:"sign",magnitude:"magnitude",digits:"digits"}],sandbox:["v2_sandbox",{}]}});var Pd=bd(Co=>{"use strict";var Y0="[object ArrayBuffer]",Vr=class t{static isArrayBuffer(e){return Object.prototype.toString.call(e)===Y0}static toArrayBuffer(e){return this.isArrayBuffer(e)?e:e.byteLength===e.buffer.byteLength||e.byteOffset===0&&e.byteLength===e.buffer.byteLength?e.buffer:this.toUint8Array(e.buffer).slice(e.byteOffset,e.byteOffset+e.byteLength).buffer}static toUint8Array(e){return this.toView(e,Uint8Array)}static toView(e,r){if(e.constructor===r)return e;if(this.isArrayBuffer(e))return new r(e);if(this.isArrayBufferView(e))return new r(e.buffer,e.byteOffset,e.byteLength);throw new TypeError("The provided value is not of type '(ArrayBuffer or ArrayBufferView)'")}static isBufferSource(e){return this.isArrayBufferView(e)||this.isArrayBuffer(e)}static isArrayBufferView(e){return ArrayBuffer.isView(e)||e&&this.isArrayBuffer(e.buffer)}static isEqual(e,r){let n=t.toUint8Array(e),i=t.toUint8Array(r);if(n.length!==i.byteLength)return!1;for(let o=0;o<n.length;o++)if(n[o]!==i[o])return!1;return!0}static concat(...e){let r;Array.isArray(e[0])&&!(e[1]instanceof Function)||Array.isArray(e[0])&&e[1]instanceof Function?r=e[0]:e[e.length-1]instanceof Function?r=e.slice(0,e.length-1):r=e;let n=0;for(let a of r)n+=a.byteLength;let i=new Uint8Array(n),o=0;for(let a of r){let s=this.toUint8Array(a);i.set(s,o),o+=s.length}return e[e.length-1]instanceof Function?this.toView(i,e[e.length-1]):i.buffer}},Md="string",Q0=/^[0-9a-f\s]+$/i,Z0=/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/,ev=/^[a-zA-Z0-9-_]+$/,Rc=class{static fromString(e){let r=unescape(encodeURIComponent(e)),n=new Uint8Array(r.length);for(let i=0;i<r.length;i++)n[i]=r.charCodeAt(i);return n.buffer}static toString(e){let r=Vr.toUint8Array(e),n="";for(let o=0;o<r.length;o++)n+=String.fromCharCode(r[o]);return decodeURIComponent(escape(n))}},Ht=class{static toString(e,r=!1){let n=Vr.toArrayBuffer(e),i=new DataView(n),o="";for(let a=0;a<n.byteLength;a+=2){let s=i.getUint16(a,r);o+=String.fromCharCode(s)}return o}static fromString(e,r=!1){let n=new ArrayBuffer(e.length*2),i=new DataView(n);for(let o=0;o<e.length;o++)i.setUint16(o*2,e.charCodeAt(o),r);return n}},Bc=class t{static isHex(e){return typeof e===Md&&Q0.test(e)}static isBase64(e){return typeof e===Md&&Z0.test(e)}static isBase64Url(e){return typeof e===Md&&ev.test(e)}static ToString(e,r="utf8"){let n=Vr.toUint8Array(e);switch(r.toLowerCase()){case"utf8":return this.ToUtf8String(n);case"binary":return this.ToBinary(n);case"hex":return this.ToHex(n);case"base64":return this.ToBase64(n);case"base64url":return this.ToBase64Url(n);case"utf16le":return Ht.toString(n,!0);case"utf16":case"utf16be":return Ht.toString(n);default:throw new Error(`Unknown type of encoding '${r}'`)}}static FromString(e,r="utf8"){if(!e)return new ArrayBuffer(0);switch(r.toLowerCase()){case"utf8":return this.FromUtf8String(e);case"binary":return this.FromBinary(e);case"hex":return this.FromHex(e);case"base64":return this.FromBase64(e);case"base64url":return this.FromBase64Url(e);case"utf16le":return Ht.fromString(e,!0);case"utf16":case"utf16be":return Ht.fromString(e);default:throw new Error(`Unknown type of encoding '${r}'`)}}static ToBase64(e){let r=Vr.toUint8Array(e);if(typeof btoa<"u"){let n=this.ToString(r,"binary");return btoa(n)}else return Buffer.from(r).toString("base64")}static FromBase64(e){let r=this.formatString(e);if(!r)return new ArrayBuffer(0);if(!t.isBase64(r))throw new TypeError("Argument 'base64Text' is not Base64 encoded");return typeof atob<"u"?this.FromBinary(atob(r)):new Uint8Array(Buffer.from(r,"base64")).buffer}static FromBase64Url(e){let r=this.formatString(e);if(!r)return new ArrayBuffer(0);if(!t.isBase64Url(r))throw new TypeError("Argument 'base64url' is not Base64Url encoded");return this.FromBase64(this.Base64Padding(r.replace(/\-/g,"+").replace(/\_/g,"/")))}static ToBase64Url(e){return this.ToBase64(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/\=/g,"")}static FromUtf8String(e,r=t.DEFAULT_UTF8_ENCODING){switch(r){case"ascii":return this.FromBinary(e);case"utf8":return Rc.fromString(e);case"utf16":case"utf16be":return Ht.fromString(e);case"utf16le":case"usc2":return Ht.fromString(e,!0);default:throw new Error(`Unknown type of encoding '${r}'`)}}static ToUtf8String(e,r=t.DEFAULT_UTF8_ENCODING){switch(r){case"ascii":return this.ToBinary(e);case"utf8":return Rc.toString(e);case"utf16":case"utf16be":return Ht.toString(e);case"utf16le":case"usc2":return Ht.toString(e,!0);default:throw new Error(`Unknown type of encoding '${r}'`)}}static FromBinary(e){let r=e.length,n=new Uint8Array(r);for(let i=0;i<r;i++)n[i]=e.charCodeAt(i);return n.buffer}static ToBinary(e){let r=Vr.toUint8Array(e),n="";for(let i=0;i<r.length;i++)n+=String.fromCharCode(r[i]);return n}static ToHex(e){let r=Vr.toUint8Array(e),n="",i=r.length;for(let o=0;o<i;o++){let a=r[o];a<16&&(n+="0"),n+=a.toString(16)}return n}static FromHex(e){let r=this.formatString(e);if(!r)return new ArrayBuffer(0);if(!t.isHex(r))throw new TypeError("Argument 'hexString' is not HEX encoded");r.length%2&&(r=`0${r}`);let n=new Uint8Array(r.length/2);for(let i=0;i<r.length;i=i+2){let o=r.slice(i,i+2);n[i/2]=parseInt(o,16)}return n.buffer}static ToUtf16String(e,r=!1){return Ht.toString(e,r)}static FromUtf16String(e,r=!1){return Ht.fromString(e,r)}static Base64Padding(e){let r=4-e.length%4;if(r<4)for(let n=0;n<r;n++)e+="=";return e}static formatString(e){return e?.replace(/[\n\r\t ]/g,"")||""}};Bc.DEFAULT_UTF8_ENCODING="utf8";function tv(t,...e){let r=arguments[0];for(let n=1;n<arguments.length;n++){let i=arguments[n];for(let o in i)r[o]=i[o]}return r}function rv(...t){let e=t.map(i=>i.byteLength).reduce((i,o)=>i+o),r=new Uint8Array(e),n=0;return t.map(i=>new Uint8Array(i)).forEach(i=>{for(let o of i)r[n++]=o}),r.buffer}function nv(t,e){if(!(t&&e)||t.byteLength!==e.byteLength)return!1;let r=new Uint8Array(t),n=new Uint8Array(e);for(let i=0;i<t.byteLength;i++)if(r[i]!==n[i])return!1;return!0}Co.BufferSourceConverter=Vr;Co.Convert=Bc;Co.assign=tv;Co.combine=rv;Co.isEqual=nv});var Su=bd(()=>{var Fh;(function(t){(function(e){var r=typeof globalThis=="object"?globalThis:typeof global=="object"?global:typeof self=="object"?self:typeof this=="object"?this:s(),n=i(t);typeof r.Reflect<"u"&&(n=i(r.Reflect,n)),e(n,r),typeof r.Reflect>"u"&&(r.Reflect=t);function i(l,d){return function(p,m){Object.defineProperty(l,p,{configurable:!0,writable:!0,value:m}),d&&d(p,m)}}function o(){try{return Function("return this;")()}catch{}}function a(){try{return(0,eval)("(function() { return this; })()")}catch{}}function s(){return o()||a()}})(function(e,r){var n=Object.prototype.hasOwnProperty,i=typeof Symbol=="function",o=i&&typeof Symbol.toPrimitive<"u"?Symbol.toPrimitive:"@@toPrimitive",a=i&&typeof Symbol.iterator<"u"?Symbol.iterator:"@@iterator",s=typeof Object.create=="function",l={__proto__:[]}instanceof Array,d=!s&&!l,p={create:s?function(){return hd(Object.create(null))}:l?function(){return hd({__proto__:null})}:function(){return hd({})},has:d?function(S,_){return n.call(S,_)}:function(S,_){return _ in S},get:d?function(S,_){return n.call(S,_)?S[_]:void 0}:function(S,_){return S[_]}},m=Object.getPrototypeOf(Function),y=typeof Map=="function"&&typeof Map.prototype.entries=="function"?Map:Fy(),A=typeof Set=="function"&&typeof Set.prototype.entries=="function"?Set:zy(),T=typeof WeakMap=="function"?WeakMap:qy(),k=i?Symbol.for("@reflect-metadata:registry"):void 0,O=Vy(),g=Wy(O);function b(S,_,L,K){if(Z(L)){if(!Ue(S))throw new TypeError;if(!gf(_))throw new TypeError;return H(S,_)}else{if(!Ue(S))throw new TypeError;if(!se(_))throw new TypeError;if(!se(K)&&!Z(K)&&!bt(K))throw new TypeError;return bt(K)&&(K=void 0),L=nt(L),I(S,_,L,K)}}e("decorate",b);function E(S,_){function L(K,oe){if(!se(K))throw new TypeError;if(!Z(oe)&&!$y(oe))throw new TypeError;ie(S,_,K,oe)}return L}e("metadata",E);function P(S,_,L,K){if(!se(L))throw new TypeError;return Z(K)||(K=nt(K)),ie(S,_,L,K)}e("defineMetadata",P);function R(S,_,L){if(!se(_))throw new TypeError;return Z(L)||(L=nt(L)),B(S,_,L)}e("hasMetadata",R);function D(S,_,L){if(!se(_))throw new TypeError;return Z(L)||(L=nt(L)),N(S,_,L)}e("hasOwnMetadata",D);function W(S,_,L){if(!se(_))throw new TypeError;return Z(L)||(L=nt(L)),pe(S,_,L)}e("getMetadata",W);function M(S,_,L){if(!se(_))throw new TypeError;return Z(L)||(L=nt(L)),fe(S,_,L)}e("getOwnMetadata",M);function h(S,_){if(!se(S))throw new TypeError;return Z(_)||(_=nt(_)),Ae(S,_)}e("getMetadataKeys",h);function w(S,_){if(!se(S))throw new TypeError;return Z(_)||(_=nt(_)),le(S,_)}e("getOwnMetadataKeys",w);function v(S,_,L){if(!se(_))throw new TypeError;if(Z(L)||(L=nt(L)),!se(_))throw new TypeError;Z(L)||(L=nt(L));var K=Aa(_,L,!1);return Z(K)?!1:K.OrdinaryDeleteMetadata(S,_,L)}e("deleteMetadata",v);function H(S,_){for(var L=S.length-1;L>=0;--L){var K=S[L],oe=K(_);if(!Z(oe)&&!bt(oe)){if(!gf(oe))throw new TypeError;_=oe}}return _}function I(S,_,L,K){for(var oe=S.length-1;oe>=0;--oe){var Le=S[oe],Ke=Le(_,L,K);if(!Z(Ke)&&!bt(Ke)){if(!se(Ke))throw new TypeError;K=Ke}}return K}function B(S,_,L){var K=N(S,_,L);if(K)return!0;var oe=md(_);return bt(oe)?!1:B(S,oe,L)}function N(S,_,L){var K=Aa(_,L,!1);return Z(K)?!1:Me(K.OrdinaryHasOwnMetadata(S,_,L))}function pe(S,_,L){var K=N(S,_,L);if(K)return fe(S,_,L);var oe=md(_);if(!bt(oe))return pe(S,oe,L)}function fe(S,_,L){var K=Aa(_,L,!1);if(!Z(K))return K.OrdinaryGetOwnMetadata(S,_,L)}function ie(S,_,L,K){var oe=Aa(L,K,!0);oe.OrdinaryDefineOwnMetadata(S,_,L,K)}function Ae(S,_){var L=le(S,_),K=md(S);if(K===null)return L;var oe=Ae(K,_);if(oe.length<=0)return L;if(L.length<=0)return oe;for(var Le=new A,Ke=[],we=0,q=L;we<q.length;we++){var Y=q[we],Q=Le.has(Y);Q||(Le.add(Y),Ke.push(Y))}for(var te=0,xe=oe;te<xe.length;te++){var Y=xe[te],Q=Le.has(Y);Q||(Le.add(Y),Ke.push(Y))}return Ke}function le(S,_){var L=Aa(S,_,!1);return L?L.OrdinaryOwnMetadataKeys(S,_):[]}function de(S){if(S===null)return 1;switch(typeof S){case"undefined":return 0;case"boolean":return 2;case"string":return 3;case"symbol":return 4;case"number":return 5;case"object":return S===null?1:6;default:return 6}}function Z(S){return S===void 0}function bt(S){return S===null}function si(S){return typeof S=="symbol"}function se(S){return typeof S=="object"?S!==null:typeof S=="function"}function Ye(S,_){switch(de(S)){case 0:return S;case 1:return S;case 2:return S;case 3:return S;case 4:return S;case 5:return S}var L=_===3?"string":_===5?"number":"default",K=bf(S,o);if(K!==void 0){var oe=K.call(S,L);if(se(oe))throw new TypeError;return oe}return ge(S,L==="default"?"number":L)}function ge(S,_){if(_==="string"){var L=S.toString;if(bo(L)){var K=L.call(S);if(!se(K))return K}var oe=S.valueOf;if(bo(oe)){var K=oe.call(S);if(!se(K))return K}}else{var oe=S.valueOf;if(bo(oe)){var K=oe.call(S);if(!se(K))return K}var Le=S.toString;if(bo(Le)){var K=Le.call(S);if(!se(K))return K}}throw new TypeError}function Me(S){return!!S}function yt(S){return""+S}function nt(S){var _=Ye(S,3);return si(_)?_:yt(_)}function Ue(S){return Array.isArray?Array.isArray(S):S instanceof Object?S instanceof Array:Object.prototype.toString.call(S)==="[object Array]"}function bo(S){return typeof S=="function"}function gf(S){return typeof S=="function"}function $y(S){switch(de(S)){case 3:return!0;case 4:return!0;default:return!1}}function fd(S,_){return S===_||S!==S&&_!==_}function bf(S,_){var L=S[_];if(L!=null){if(!bo(L))throw new TypeError;return L}}function yf(S){var _=bf(S,a);if(!bo(_))throw new TypeError;var L=_.call(S);if(!se(L))throw new TypeError;return L}function vf(S){return S.value}function wf(S){var _=S.next();return _.done?!1:_}function xf(S){var _=S.return;_&&_.call(S)}function md(S){var _=Object.getPrototypeOf(S);if(typeof S!="function"||S===m||_!==m)return _;var L=S.prototype,K=L&&Object.getPrototypeOf(L);if(K==null||K===Object.prototype)return _;var oe=K.constructor;return typeof oe!="function"||oe===S?_:oe}function Gy(){var S;!Z(k)&&typeof r.Reflect<"u"&&!(k in r.Reflect)&&typeof r.Reflect.defineMetadata=="function"&&(S=Ky(r.Reflect));var _,L,K,oe=new T,Le={registerProvider:Ke,getProvider:q,setProvider:Q};return Le;function Ke(te){if(!Object.isExtensible(Le))throw new Error("Cannot add provider to a frozen registry.");switch(!0){case S===te:break;case Z(_):_=te;break;case _===te:break;case Z(L):L=te;break;case L===te:break;default:K===void 0&&(K=new A),K.add(te);break}}function we(te,xe){if(!Z(_)){if(_.isProviderFor(te,xe))return _;if(!Z(L)){if(L.isProviderFor(te,xe))return _;if(!Z(K))for(var Ie=yf(K);;){var je=wf(Ie);if(!je)return;var er=vf(je);if(er.isProviderFor(te,xe))return xf(Ie),er}}}if(!Z(S)&&S.isProviderFor(te,xe))return S}function q(te,xe){var Ie=oe.get(te),je;return Z(Ie)||(je=Ie.get(xe)),Z(je)&&(je=we(te,xe),Z(je)||(Z(Ie)&&(Ie=new y,oe.set(te,Ie)),Ie.set(xe,je))),je}function Y(te){if(Z(te))throw new TypeError;return _===te||L===te||!Z(K)&&K.has(te)}function Q(te,xe,Ie){if(!Y(Ie))throw new Error("Metadata provider not registered.");var je=q(te,xe);if(je!==Ie){if(!Z(je))return!1;var er=oe.get(te);Z(er)&&(er=new y,oe.set(te,er)),er.set(xe,Ie)}return!0}}function Vy(){var S;return!Z(k)&&se(r.Reflect)&&Object.isExtensible(r.Reflect)&&(S=r.Reflect[k]),Z(S)&&(S=Gy()),!Z(k)&&se(r.Reflect)&&Object.isExtensible(r.Reflect)&&Object.defineProperty(r.Reflect,k,{enumerable:!1,configurable:!1,writable:!1,value:S}),S}function Wy(S){var _=new T,L={isProviderFor:function(Y,Q){var te=_.get(Y);return Z(te)?!1:te.has(Q)},OrdinaryDefineOwnMetadata:Ke,OrdinaryHasOwnMetadata:oe,OrdinaryGetOwnMetadata:Le,OrdinaryOwnMetadataKeys:we,OrdinaryDeleteMetadata:q};return O.registerProvider(L),L;function K(Y,Q,te){var xe=_.get(Y),Ie=!1;if(Z(xe)){if(!te)return;xe=new y,_.set(Y,xe),Ie=!0}var je=xe.get(Q);if(Z(je)){if(!te)return;if(je=new y,xe.set(Q,je),!S.setProvider(Y,Q,L))throw xe.delete(Q),Ie&&_.delete(Y),new Error("Wrong provider for target.")}return je}function oe(Y,Q,te){var xe=K(Q,te,!1);return Z(xe)?!1:Me(xe.has(Y))}function Le(Y,Q,te){var xe=K(Q,te,!1);if(!Z(xe))return xe.get(Y)}function Ke(Y,Q,te,xe){var Ie=K(te,xe,!0);Ie.set(Y,Q)}function we(Y,Q){var te=[],xe=K(Y,Q,!1);if(Z(xe))return te;for(var Ie=xe.keys(),je=yf(Ie),er=0;;){var Af=wf(je);if(!Af)return te.length=er,te;var Xy=vf(Af);try{te[er]=Xy}catch(Jy){try{xf(je)}finally{throw Jy}}er++}}function q(Y,Q,te){var xe=K(Q,te,!1);if(Z(xe)||!xe.delete(Y))return!1;if(xe.size===0){var Ie=_.get(Q);Z(Ie)||(Ie.delete(te),Ie.size===0&&_.delete(Ie))}return!0}}function Ky(S){var _=S.defineMetadata,L=S.hasOwnMetadata,K=S.getOwnMetadata,oe=S.getOwnMetadataKeys,Le=S.deleteMetadata,Ke=new T,we={isProviderFor:function(q,Y){var Q=Ke.get(q);return!Z(Q)&&Q.has(Y)?!0:oe(q,Y).length?(Z(Q)&&(Q=new A,Ke.set(q,Q)),Q.add(Y),!0):!1},OrdinaryDefineOwnMetadata:_,OrdinaryHasOwnMetadata:L,OrdinaryGetOwnMetadata:K,OrdinaryOwnMetadataKeys:oe,OrdinaryDeleteMetadata:Le};return we}function Aa(S,_,L){var K=O.getProvider(S,_);if(!Z(K))return K;if(L){if(O.setProvider(S,_,g))return g;throw new Error("Illegal state.")}}function Fy(){var S={},_=[],L=(function(){function we(q,Y,Q){this._index=0,this._keys=q,this._values=Y,this._selector=Q}return we.prototype["@@iterator"]=function(){return this},we.prototype[a]=function(){return this},we.prototype.next=function(){var q=this._index;if(q>=0&&q<this._keys.length){var Y=this._selector(this._keys[q],this._values[q]);return q+1>=this._keys.length?(this._index=-1,this._keys=_,this._values=_):this._index++,{value:Y,done:!1}}return{value:void 0,done:!0}},we.prototype.throw=function(q){throw this._index>=0&&(this._index=-1,this._keys=_,this._values=_),q},we.prototype.return=function(q){return this._index>=0&&(this._index=-1,this._keys=_,this._values=_),{value:q,done:!0}},we})(),K=(function(){function we(){this._keys=[],this._values=[],this._cacheKey=S,this._cacheIndex=-2}return Object.defineProperty(we.prototype,"size",{get:function(){return this._keys.length},enumerable:!0,configurable:!0}),we.prototype.has=function(q){return this._find(q,!1)>=0},we.prototype.get=function(q){var Y=this._find(q,!1);return Y>=0?this._values[Y]:void 0},we.prototype.set=function(q,Y){var Q=this._find(q,!0);return this._values[Q]=Y,this},we.prototype.delete=function(q){var Y=this._find(q,!1);if(Y>=0){for(var Q=this._keys.length,te=Y+1;te<Q;te++)this._keys[te-1]=this._keys[te],this._values[te-1]=this._values[te];return this._keys.length--,this._values.length--,fd(q,this._cacheKey)&&(this._cacheKey=S,this._cacheIndex=-2),!0}return!1},we.prototype.clear=function(){this._keys.length=0,this._values.length=0,this._cacheKey=S,this._cacheIndex=-2},we.prototype.keys=function(){return new L(this._keys,this._values,oe)},we.prototype.values=function(){return new L(this._keys,this._values,Le)},we.prototype.entries=function(){return new L(this._keys,this._values,Ke)},we.prototype["@@iterator"]=function(){return this.entries()},we.prototype[a]=function(){return this.entries()},we.prototype._find=function(q,Y){if(!fd(this._cacheKey,q)){this._cacheIndex=-1;for(var Q=0;Q<this._keys.length;Q++)if(fd(this._keys[Q],q)){this._cacheIndex=Q;break}}return this._cacheIndex<0&&Y&&(this._cacheIndex=this._keys.length,this._keys.push(q),this._values.push(void 0)),this._cacheIndex},we})();return K;function oe(we,q){return we}function Le(we,q){return q}function Ke(we,q){return[we,q]}}function zy(){var S=(function(){function _(){this._map=new y}return Object.defineProperty(_.prototype,"size",{get:function(){return this._map.size},enumerable:!0,configurable:!0}),_.prototype.has=function(L){return this._map.has(L)},_.prototype.add=function(L){return this._map.set(L,L),this},_.prototype.delete=function(L){return this._map.delete(L)},_.prototype.clear=function(){this._map.clear()},_.prototype.keys=function(){return this._map.keys()},_.prototype.values=function(){return this._map.keys()},_.prototype.entries=function(){return this._map.entries()},_.prototype["@@iterator"]=function(){return this.keys()},_.prototype[a]=function(){return this.keys()},_})();return S}function qy(){var S=16,_=p.create(),L=K();return(function(){function q(){this._key=K()}return q.prototype.has=function(Y){var Q=oe(Y,!1);return Q!==void 0?p.has(Q,this._key):!1},q.prototype.get=function(Y){var Q=oe(Y,!1);return Q!==void 0?p.get(Q,this._key):void 0},q.prototype.set=function(Y,Q){var te=oe(Y,!0);return te[this._key]=Q,this},q.prototype.delete=function(Y){var Q=oe(Y,!1);return Q!==void 0?delete Q[this._key]:!1},q.prototype.clear=function(){this._key=K()},q})();function K(){var q;do q="@@WeakMap@@"+we();while(p.has(_,q));return _[q]=!0,q}function oe(q,Y){if(!n.call(q,L)){if(!Y)return;Object.defineProperty(q,L,{value:p.create()})}return q[L]}function Le(q,Y){for(var Q=0;Q<Y;++Q)q[Q]=Math.random()*255|0;return q}function Ke(q){if(typeof Uint8Array=="function"){var Y=new Uint8Array(q);return typeof crypto<"u"?crypto.getRandomValues(Y):typeof msCrypto<"u"?msCrypto.getRandomValues(Y):Le(Y,q),Y}return Le(new Array(q),q)}function we(){var q=Ke(S);q[6]=q[6]&79|64,q[8]=q[8]&191|128;for(var Y="",Q=0;Q<S;++Q){var te=q[Q];(Q===4||Q===6||Q===8)&&(Y+="-"),te<16&&(Y+="0"),Y+=te.toString(16).toLowerCase()}return Y}}function hd(S){return S.__=void 0,delete S.__,S}})})(Fh||(Fh={}))});var Ef=`<!DOCTYPE html>
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
            if (this.revision !== undefined && snapshot.revision < this.revision) return;
            this.platform = snapshot.platform; this.directory = snapshot.directory;
            this.mode = snapshot.platform?.mode || 'formal';
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
            const mode=this.mode;
            const response=await fetch('/api/state?playerId='+encodeURIComponent(this.data.activeId)+'&mode='+(this.mode||'formal'),{credentials:'same-origin',cache:'no-store'});
            const value=await response.json();if(!response.ok)throw new Error(value.error||'\u8D26\u6237\u540C\u6B65\u5931\u8D25\u3002');
            if(this.requestBusy||this.mode!==mode)return;
            this.applySnapshot(value);this.onChange?.();
        }
        async api(path) {
            const response=await fetch(path,{credentials:'same-origin',cache:'no-store'});
            const value=this.money.hydrate(await response.json());if(!response.ok)throw new Error(value.error||'\u8BF7\u6C42\u5931\u8D25\u3002');return value;
        }
        async setSandbox(enabled) {
            this.ensureIdle();this.requestBusy=true;this.onChange?.();
            try{const snapshot=await this.api('/api/state?mode='+(enabled?'sandbox':'formal'));this.applySnapshot(snapshot);}
            finally{this.requestBusy=false;this.onChange?.();}
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
   const logs=card('\u7CFB\u7EDF\u5065\u5EB7\u4E0E\u4E8B\u4EF6');message(logs,\`V2 \xB7 revision \${adminData.health.revision} \xB7 \u6570\u636E\u51C6\u5907 \${adminData.health.ready?'\u5B8C\u6210':'\u8FDB\u884C\u4E2D'}\`);const eventList=el('ol','','v2-log');for(const event of adminData.events)eventList.append(el('li',\`\${new Date(event.createdAt).toLocaleString()} \xB7 \${event.kind} \xB7 \${event.actor||event.playerId||'system'}\`));logs.append(eventList);logs.append(button('\u67E5\u770B\u8FD1 30 \u65E5\u7EDF\u8BA1',async()=>{try{const stats=await engine.api('/api/admin/analytics');const panel=card('\u8FD1 30 \u65E5\u7EDF\u8BA1');message(panel,'24 \u5C0F\u65F6\u6D3B\u8DC3\u73A9\u5BB6 '+stats.activePlayers24h);row(panel,'\u5B8C\u6210\u5BF9\u5C40',fmt(stats.gameSettlements));row(panel,'\u7D2F\u8BA1\u4E0B\u6CE8 / \u8FD4\u8FD8',fmt(stats.wagered)+' / '+fmt(stats.returned));message(panel,stats.accounting);message(panel,\`\u7B79\u7801\u589E\u52A0 \${fmt(stats.cashIncreases)} \xB7 \u51CF\u5C11 \${fmt(stats.cashDecreases)}\`);for(const x of stats.events)row(panel,x.kind,String(x.count));for(const x of stats.claims)row(panel,'\u5956\u52B1 '+x.kind,x.count+' \u6B21 \xB7 '+fmt(x.xp)+' XP');for(const x of stats.items)row(panel,'\u88C5\u9970\u54C1 '+x.kind,fmt(x.count));logs.append(panel);}catch(e){callbacks.notify(e.message,true);}}));adminRoot.append(logs);
  }
  function tick(){for(const node of rootNode.querySelectorAll('[data-countdown]')){const seconds=Math.max(0,Math.ceil((Number(node.dataset.countdown)-engine.now())/1000));node.textContent=\`\u91CD\u7F6E / \u5230\u671F\u8FD8\u5269 \${Math.floor(seconds/3600)} \u65F6 \${Math.floor(seconds%3600/60)} \u5206 \${seconds%60} \u79D2\`;}}
  function render(){const p=data();for(const link of document.querySelectorAll('a[href="/admin"]'))link.hidden=!['owner','admin'].includes(engine.auth?.role);$('v2-sandbox-banner').hidden=p.mode!=='sandbox';if(!engine.auth?.admin){adminRoot.hidden=true;adminData=null;engine.adminPlayers=[];}if(!p.progress)return;for(const id of Object.keys(p.progress.achievements))if(!seen.has(id)){seen.add(id);callbacks.notify('\u6210\u5C31\u89E3\u9501\uFF1A'+(p.definitions.find(d=>d.id===id)?.name||id));}root.CasinoPreferences=p.profile?.settings||{};document.body.dataset.reducedMotion=String(Boolean(p.profile?.settings.reducedMotion));$('v2-sandbox-banner').hidden=p.mode!=='sandbox';
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
            remove.disabled = viewLocked() || !v2 && engine.data.users.length === 1 || !admin?.unlocked;
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
    function paintView(route = window.location.hash.slice(1)) {
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
        features?.paint(view, route);
        render();
    }
    function setView(next) {
        const route = next; next = next.split('/')[0];
        if (!['roulette', 'slots', 'blackjack', 'plinko', 'dice', 'lottery', 'bank', 'market', 'players', 'admin'].includes(next) && !(v2 && CasinoV2.views.includes(next))) return;
        if (engine.platform?.mode === 'sandbox' && !['roulette','slots','blackjack','plinko','dice','lottery','admin'].includes(next)) { toast('\u8BF7\u5148\u9000\u51FA\u7BA1\u7406\u5458\u6C99\u76D2\u3002',true); return; }
        if (viewLocked()) { toast('Finish the current round before changing tables.', true); return; }
        view = next;
        paintView(route);
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
</html>`;var j=(t,e=400)=>{throw Object.assign(new Error(t),{status:e})};function ci(t,e,r,n=!1,i=!1){let o=t.accounts[e];return(!o||o.status!=="active")&&j("\u8D26\u53F7\u5C1A\u672A\u83B7\u9080\u3001\u5DF2\u505C\u7528\u6216\u5C1A\u672A\u5B8C\u6210\u7ED1\u5B9A\u3002",403),n?(!["owner","admin"].includes(o.role)||!i)&&j("\u9700\u8981\u6388\u6743\u7BA1\u7406\u5458\u53CA Windows Hello \u9A8C\u8BC1\u3002",403):(!o.playerId||r&&r!==o.playerId)&&j("\u53EA\u80FD\u64CD\u4F5C\u7ED1\u5B9A\u7ED9\u81EA\u5DF1\u7684\u73A9\u5BB6\u3002",403),o}function kf(t,e,r){let n=t.users.find(i=>i.id===r.playerId);return{version:t.version,activeId:r.playerId,users:n?[structuredClone(n)]:[],loans:t.loans.filter(i=>[i.lenderId,i.borrowerId].includes(r.playerId)),ledger:[]}}function vo(t,e){let r=e.profiles[t.id]||{},n=e.progress[t.id]||{};return{id:t.id,name:t.name,avatar:r.avatar||t.name[0],bio:r.bio||"",xp:n.xp||0,level:n.level||1,games:n.games||0,achievements:Object.keys(n.achievements||{}).length,equipped:r.equipped||{},featuredBadges:r.featuredBadges||[],...r.walletVisible!==!1?{balance:t.recovery?0:t.balance}:{}}}Sa();function Qe(t){let e=new Date(t+288e5),r=e.toISOString().slice(0,10),n=r.slice(0,7),i=Date.parse(r+"T00:00:00Z"),o=new Date(i-(e.getUTCDay()+6)%7*864e5).toISOString().slice(0,10);return{day:r,week:o,month:n,nextDay:i+864e5-288e5,nextWeek:Date.parse(o+"T00:00:00Z")+7*864e5-288e5,nextMonth:Date.UTC(e.getUTCFullYear(),e.getUTCMonth()+1,1)-288e5}}function Cf(t,e){let r=yd();r.meta={ownerActor:t,startedAt:e,maintenance:!1,version:2};let n=[["frame-starter","frame","\u521D\u89C1\u91D1\u8FB9","common"],["badge-week","badge","\u4E03\u65E5\u7EAA\u5FF5","rare"],["title-newcomer","title","Newcomer","common"],["title-explorer","title","Game Explorer","rare"],["badge-veteran","badge","\u767E\u5C40\u65C5\u4EBA","epic"],["background-night","background","\u7D2B\u591C","rare"],["souvenir-club","souvenir","\u670B\u53CB\u4FF1\u4E50\u90E8\u7EAA\u5FF5","legendary"]];for(let[o,a,s,l]of n)r.items[o]={id:o,kind:a,name:s,rarity:l,description:s+" \xB7 \u4EC5\u9650\u7AD9\u5185\u88C5\u9970\uFF0C\u65E0\u73B0\u91D1\u4EF7\u503C\u3002",enabled:!0};let i=[{id:"settings",kind:"settings",gameXP:5,dailyGameCap:100,levelFactor:100,dailyXP:[20,25,30,35,40,50,75]},{id:"daily-rounds",kind:"quest",period:"day",condition:"games",target:3,xp:40,name:"\u4ECA\u65E5\u4E09\u5C40"},{id:"daily-explore",kind:"quest",period:"day",condition:"types",target:2,xp:40,name:"\u63A2\u7D22\u4E24\u79CD\u73A9\u6CD5"},{id:"weekly-rounds",kind:"quest",period:"week",condition:"games",target:15,xp:200,name:"\u4E00\u5468\u5341\u4E94\u5C40"},{id:"weekly-explore",kind:"quest",period:"week",condition:"types",target:4,xp:150,name:"\u6BCF\u5468\u6E38\u620F\u63A2\u7D22"},{id:"profile-once",kind:"quest",period:"all",condition:"profile",target:1,xp:50,name:"\u8BA4\u8BC6\u4F60\u81EA\u5DF1"},{id:"club-once",kind:"quest",period:"all",condition:"club",target:1,xp:100,name:"\u52A0\u5165\u670B\u53CB\u5708"},{id:"first-round",kind:"achievement",period:"all",condition:"games",target:1,itemIds:["title-newcomer"],name:"Getting Started",category:"Getting Started"},{id:"game-explorer",kind:"achievement",period:"all",condition:"types",target:3,itemIds:["title-explorer"],name:"Game Explorer",category:"Game Explorer"},{id:"veteran",kind:"achievement",period:"all",condition:"games",target:100,itemIds:["badge-veteran"],name:"Veteran",category:"Activity Milestones"},{id:"collector",kind:"achievement",period:"all",condition:"items",target:4,itemIds:["background-night"],name:"Collector",category:"Collector"},{id:"social",kind:"achievement",period:"all",condition:"club",target:1,itemIds:["souvenir-club"],name:"Friends Club",category:"Social"},{id:"quest-master",kind:"achievement",period:"all",condition:"quests",target:10,itemIds:["badge-veteran"],name:"Quest Completion",category:"Quest Completion"}];for(let o of i)o.enabled=!0,o.version=1,r.definitions[o.id]=o,r.versions[o.id+":1"]=structuredClone(o);return r}function bn(t,e,r){t.profiles[e]??={id:e,walletVisible:!0,bio:"",avatar:"",settings:{sound:!0,reducedMotion:!1},equipped:{},featuredBadges:[],archived:!1},t.progress[e]??={id:e,xp:0,games:0,level:1,gameTypes:{},achievements:{},quests:{},questsCompleted:0,profileCompleted:!1,clubsJoined:0,lastDaily:null,streak:0};let n=e+":frame-starter";t.inventory[n]??={id:n,playerId:e,itemId:"frame-starter",createdAt:r,source:"welcome"},o0(t.progress[e],r)}function o0(t,e){let r=Qe(e);for(let n of["day","week","month"])t[n]?.key!==r[n]&&(t[n]={key:r[n],games:0,types:{},gameXP:0})}function vd(t,e,r,n,i,o={}){t.events.push({id:e,playerId:r,kind:n,createdAt:i,...o})}function a0(t,e,r,n,i){(!Number.isSafeInteger(r)||r<0||r>1e4)&&j("XP \u5956\u52B1\u8D85\u51FA\u5141\u8BB8\u8303\u56F4\u3002");let o=t.progress[e];Number.isSafeInteger(o.xp+r)||j("XP \u8D85\u51FA\u53EF\u8868\u793A\u8303\u56F4\u3002"),o.xp+=r;let a=t.definitions.settings.levelFactor;o.level=1+Math.floor(Math.sqrt(o.xp/a));let s=Qe(n);for(let l of["week","month","all"]){let d=l==="all"?"all":s[l],p=e+":"+l+":"+d,m=t.stats[p]??={id:p,playerId:e,period:l+":"+d,xp:0,games:0};m.xp+=r}r&&vd(t,"xp:"+i,e,"xp.granted",n,{xp:r,cause:i})}function wo(t,e,r,n,i,o,a,s={}){let l=e+":"+r;t.claims[l]&&j("\u8BE5\u5956\u52B1\u5DF2\u7ECF\u9886\u53D6\u3002",409);for(let d of o||[])t.items[d]||j("\u5956\u52B1\u7269\u54C1\u4E0D\u5B58\u5728\u3002");t.claims[l]={id:l,playerId:e,kind:n,xp:i,createdAt:a,...s},a0(t,e,i||0,a,l);for(let d of o||[]){let p=e+":"+d;t.inventory[p]??={id:p,playerId:e,itemId:d,createdAt:a,source:n}}return t.claims[l]}function Tf(t,e,r,n){let i=e.period==="all"?null:t[e.period],o=i||t;return e.condition==="games"?o.games:e.condition==="types"?Object.keys(i?i.types:t.gameTypes).length:e.condition==="profile"?Number(t.profileCompleted):e.condition==="club"?t.clubsJoined:e.condition==="quests"?t.questsCompleted:e.condition==="items"?Object.values(r.inventory).filter(a=>a.playerId===n).length:0}function wd(t,e,r,n){let i=t.progress[e],o=r.period==="all"?"all":r.period==="event"?String(r.startsAt):Qe(n)[r.period],a=i.quests[r.id];(!a||a.key!==o)&&(a={key:o,definition:structuredClone(r),progress:0,eventStats:{games:0,types:{}}},i.quests[r.id]=a);let s=a.definition;if(s.period==="event"&&(n<s.startsAt||n>=s.endsAt))return null;let l=s.period==="event"?s.condition==="types"?Object.keys(a.eventStats?.types||{}).length:a.eventStats?.games||0:Tf(i,s,t,e);return a.progress=Math.min(s.target,l),a}function yn(t,e,r){let n=t.progress[e];for(let i of Object.values(t.definitions).filter(o=>o.kind==="achievement"&&o.enabled))!n.achievements[i.id]&&Tf(n,i,t,e)>=i.target&&(wo(t,e,"achievement:"+i.id,"achievement",i.xp||0,i.itemIds||[],r,{definitionVersion:i.version}),n.achievements[i.id]=r,vd(t,"achievement:"+e+":"+i.id,e,"achievement.unlocked",r,{definitionId:i.id}));for(let i of Object.values(t.definitions).filter(o=>o.kind==="quest"&&o.enabled))wd(t,e,i,r)}function If(t,e,r,n,i,o){if(bn(t,e,i),t.claims[e+":round:"+n])return!1;for(let m of Object.values(t.definitions).filter(y=>y.kind==="quest"&&y.enabled&&y.period==="event")){let y=wd(t,e,m,i);y&&(y.eventStats??={games:0,types:{}},y.eventStats.games++,y.eventStats.types[r]=!0)}let a=t.progress[e],s=t.definitions.settings,l=Math.max(0,Math.min(s.gameXP,s.dailyGameCap-a.day.gameXP));wo(t,e,"round:"+n,"round",l,[],i),a.day.gameXP+=l,a.games++,a.gameTypes[r]=!0;for(let m of["day","week","month"])a[m].games++,a[m].types[r]=!0;let d=Qe(i);for(let m of["week","month","all"]){let y=m==="all"?"all":d[m],A=e+":"+m+":"+y,T=t.stats[A]??={id:A,playerId:e,period:m+":"+y,xp:0,games:0};T.games++}vd(t,n,e,"game.settled",i,{game:r,...o?{wager:String(o.wager),payout:String(o.payout),net:String(s0(o))}:{},...t.memberships[e]?{clubId:t.memberships[e].clubId}:{}});let p=t.memberships[e];if(p){let m=p.clubId+":"+d.week+":"+n;t.contributions[m]={id:m,playerId:e,clubId:p.clubId,week:d.week,createdAt:i,roundId:n}}return yn(t,e,i),!0}function s0(t){return globalThis.CasinoMoney.sub(t.payout,t.wager)}function _f(t,e,r){bn(t,e,r);let n=t.progress[e],i=Qe(r).day,o=Qe(r-864e5).day;n.lastDaily===i&&j("\u4ECA\u5929\u5DF2\u7ECF\u9886\u53D6\u7B7E\u5230\u5956\u52B1\u3002",409);let a=n.lastDaily===o?n.streak%7+1:1;(a===1||!n.dailySchedule)&&(n.dailySchedule=structuredClone(t.definitions.settings.dailyXP));let s=wo(t,e,"daily:"+i,"daily",n.dailySchedule[a-1],a===7?["badge-week"]:[],r,{streak:a});return n.lastDaily=i,n.streak=a,yn(t,e,r),s}function xd(t,e,r){return bn(t,e,r),Object.values(t.definitions).filter(n=>n.kind==="quest"&&n.enabled).map(n=>{let i=wd(t,e,n,r);if(!i)return null;let o=i.definition,a=o.period==="day"?Qe(r).nextDay:o.period==="week"?Qe(r).nextWeek:o.period==="month"?Qe(r).nextMonth:o.period==="event"?o.endsAt:null;return{...o,key:i.key,progress:i.progress,endsAt:a,claimed:!!t.claims[e+":quest:"+n.id+":"+i.key]}}).filter(Boolean)}function Rf(t,e,r,n){let i=xd(t,e,n).find(a=>a.id===r);(!i||i.progress<i.target||i.endsAt&&n>=i.endsAt)&&j("\u4EFB\u52A1\u5C1A\u672A\u5B8C\u6210\u6216\u5DF2\u7ECF\u8FC7\u671F\u3002");let o=wo(t,e,"quest:"+i.id+":"+i.key,"quest",i.xp||0,i.itemIds||[],n,{definitionVersion:i.version});return t.progress[e].questsCompleted++,yn(t,e,n),o}var xo=(t,e,r=0)=>((typeof t!="string"||t.trim().length<r||t.trim().length>e)&&j("\u4FF1\u4E50\u90E8\u6587\u5B57\u957F\u5EA6\u65E0\u6548\u3002"),t.trim());function Ao(t,e){let r=t.clubs[t.memberships[e]?.clubId];return(!r||r.ownerId!==e||r.archived)&&j("\u53EA\u6709\u4FF1\u4E50\u90E8\u6240\u6709\u8005\u53EF\u4EE5\u64CD\u4F5C\u3002",403),r}function di(t,e,r,n,i,o={}){t.events.push({id:crypto.randomUUID(),playerId:r,clubId:e,kind:n,createdAt:i,...o})}function Bf(t,e,r,n,i,o){let a=r.playerId;if(!(!n.startsWith("club.")&&n!=="admin.club")){if(n==="club.create"){t.memberships[a]&&j("\u6BCF\u540D\u73A9\u5BB6\u540C\u65F6\u53EA\u80FD\u52A0\u5165\u4E00\u4E2A\u4FF1\u4E50\u90E8\u3002");let s=i[0]||{},l={id:crypto.randomUUID(),name:xo(s.name,32,1),description:xo(s.description||"",200),icon:xo(s.icon||"initial",20),ownerId:a,createdAt:o,archived:!1};return t.clubs[l.id]=l,t.memberships[a]={id:a,clubId:l.id,joinedAt:o},t.progress[a].clubsJoined++,yn(t,a,o),di(t,l.id,a,"club.created",o),l}if(n==="club.invite"){let s=Ao(t,a),l=i[0];(!e.data.users.some(p=>p.id===l)||t.profiles[l]?.archived||t.memberships[l]||l===a)&&j("\u8BE5\u73A9\u5BB6\u4E0D\u80FD\u63A5\u53D7\u9080\u8BF7\u3002"),Object.values(t.invitations).some(p=>p.clubId===s.id&&p.targetId===l&&p.status==="pending"&&p.expiresAt>o)&&j("\u5DF2\u7ECF\u5B58\u5728\u6709\u6548\u9080\u8BF7\u3002");let d={id:crypto.randomUUID(),clubId:s.id,targetId:l,inviterId:a,createdAt:o,expiresAt:o+7*864e5,status:"pending"};return t.invitations[d.id]=d,di(t,s.id,a,"club.invited",o,{target:l}),d}if(n==="club.respond"){let s=t.invitations[i[0]];return(!s||s.targetId!==a||s.status!=="pending"||s.expiresAt<=o||t.clubs[s.clubId]?.archived)&&j("\u9080\u8BF7\u5DF2\u8FC7\u671F\u3001\u64A4\u9500\u6216\u4E0D\u5C5E\u4E8E\u4F60\u3002",403),typeof i[1]!="boolean"&&j("\u8BF7\u9009\u62E9\u63A5\u53D7\u6216\u62D2\u7EDD\u3002"),i[1]&&t.memberships[a]&&j("\u8BF7\u5148\u9000\u51FA\u5F53\u524D\u4FF1\u4E50\u90E8\u3002"),s.status=i[1]?"accepted":"declined",i[1]&&(t.memberships[a]={id:a,clubId:s.clubId,joinedAt:o},t.progress[a].clubsJoined++,yn(t,a,o)),di(t,s.clubId,a,"club."+s.status,o),s}if(n==="club.revoke"){let s=Ao(t,a),l=t.invitations[i[0]];return(!l||l.clubId!==s.id||l.status!=="pending")&&j("\u9080\u8BF7\u65E0\u6548\u3002"),l.status="revoked",l}if(n==="club.leave"){let s=t.memberships[a],l=t.clubs[s?.clubId];return l||j("\u5C1A\u672A\u52A0\u5165\u4FF1\u4E50\u90E8\u3002"),l.ownerId===a&&j("\u8BF7\u5148\u8F6C\u79FB\u6240\u6709\u6743\uFF0C\u6216\u5F52\u6863\u7A7A\u4FF1\u4E50\u90E8\u3002"),delete t.memberships[a],di(t,l.id,a,"club.left",o),{left:!0}}if(n==="club.transfer"){let s=Ao(t,a),l=i[0];return(!l||l===a||t.memberships[l]?.clubId!==s.id)&&j("\u8BF7\u9009\u62E9\u5F53\u524D\u4FF1\u4E50\u90E8\u7684\u5176\u4ED6\u6210\u5458\u3002"),s.ownerId=l,di(t,s.id,a,"club.transferred",o,{target:l}),s}if(n==="club.remove"){let s=Ao(t,a),l=i[0];return(l===a||t.memberships[l]?.clubId!==s.id)&&j("\u8BF7\u9009\u62E9\u5176\u4ED6\u6210\u5458\u3002"),delete t.memberships[l],di(t,s.id,a,"club.removed",o,{target:l}),{removed:l}}if(n==="club.update"){let s=Ao(t,a),l=i[0]||{};return s.name=xo(l.name,32,1),s.description=xo(l.description||"",200),s.icon=xo(l.icon||"initial",20),s}if(n==="club.archive"||n==="admin.club"){let s=n==="admin.club"?t.clubs[i[0]]:Ao(t,a);s||j("\u4FF1\u4E50\u90E8\u4E0D\u5B58\u5728\u3002"),n==="admin.club"?(typeof i[1]!="string"||i[1].trim().length<3)&&j("\u8BF7\u586B\u5199\u5904\u7406\u539F\u56E0\u3002"):Object.values(t.memberships).some(l=>l.clubId===s.id&&l.id!==a)&&j("\u5F52\u6863\u524D\u8BF7\u5148\u79FB\u9664\u5176\u4ED6\u6210\u5458\u3002"),s.archived=!0;for(let[l,d]of Object.entries(t.memberships))d.clubId===s.id&&delete t.memberships[l];for(let l of Object.values(t.invitations))l.clubId===s.id&&l.status==="pending"&&(l.status="revoked");return di(t,s.id,a,"club.archived",o),s}if(n==="club.claim"){let s=t.memberships[a]?.clubId,l=Qe(o).week,d=Object.values(t.contributions).filter(p=>p.clubId===s&&p.week===l);return(!s||d.length<50||!d.some(p=>p.playerId===a))&&j("\u672C\u5468\u56E2\u961F\u6311\u6218\u5C1A\u672A\u5B8C\u6210\uFF0C\u6216\u4F60\u6CA1\u6709\u53C2\u4E0E\u3002"),wo(t,a,"club:"+s+":"+l,"club",100,[],o)}j("\u4FF1\u4E50\u90E8\u64CD\u4F5C\u65E0\u6548\u3002",404)}}function Ca(t,e,r){let n=t.memberships[e]?.clubId,i=t.clubs[n],o=Qe(r).week,a=Object.values(t.invitations).filter(p=>p.targetId===e&&p.status==="pending"&&p.expiresAt>r&&!t.clubs[p.clubId]?.archived).map(p=>({...p,clubName:t.clubs[p.clubId].name}));if(!i)return{club:null,incoming:a};let s=Object.values(t.memberships).filter(p=>p.clubId===n),l=Object.values(t.contributions).filter(p=>p.clubId===n&&p.week===o),d=s.map(p=>({playerId:p.id,rounds:l.filter(m=>m.playerId===p.id).length})).sort((p,m)=>m.rounds-p.rounds||p.playerId.localeCompare(m.playerId));return d.forEach((p,m)=>p.rank=m&&d[m-1].rounds===p.rounds?d[m-1].rank:m+1),{club:i,members:s,incoming:a,outgoing:i.ownerId===e?Object.values(t.invitations).filter(p=>p.clubId===n&&p.status==="pending"&&p.expiresAt>r):[],challenge:{week:o,target:50,progress:l.length,participated:l.some(p=>p.playerId===e),claimed:!!t.claims[e+":club:"+n+":"+o]},leaderboard:d}}Sa();var Lt=globalThis.CasinoMoney,c0=t=>Math.max(1,Math.min(1e6,Math.floor(Number(t.searchParams.get("page")))||1));async function Mf(t,e,r,n,i,o=Date.now()){let a=new URL(t.url),s=ci(r,t.headers.get("oai-authenticated-user-id"),null),l=s.playerId,d=Lt.parseJSON(n.snapshot),p=c0(a),m=20,y=d.users.filter(A=>!r.profiles[A.id]?.archived&&Object.values(r.accounts).some(T=>T.playerId===A.id&&T.status==="active"));if(a.pathname==="/api/players"){let A=(a.searchParams.get("query")||"").slice(0,100).normalize("NFKC").toLocaleLowerCase(),T=y.filter(k=>k.name.normalize("NFKC").toLocaleLowerCase().includes(A));return{rows:T.slice((p-1)*m,p*m).map(k=>vo(k,r)),page:p,total:T.length,pages:Math.max(1,Math.ceil(T.length/m))}}if(a.pathname.startsWith("/api/players/")){let A=y.find(T=>T.id===decodeURIComponent(a.pathname.slice(13)));return A||j("\u73A9\u5BB6\u4E0D\u5B58\u5728\u3002",404),vo(A,r)}if(a.pathname==="/api/transactions")return{rows:await Ur(e,"v2_journal","WHERE player_id=?",[l],m,(p-1)*m),page:p};if(a.pathname==="/api/clubs"){let A=Ca(r,l,o);return A.club&&(A.feed=await Ur(e,"v2_events","WHERE json_extract(body,'$.clubId')=?",[A.club.id],30)),A}if(a.pathname.startsWith("/api/clubs/")){let A=decodeURIComponent(a.pathname.slice(11));r.memberships[l]?.clubId!==A&&j("\u4E0D\u662F\u8BE5\u4FF1\u4E50\u90E8\u6210\u5458\u3002",403);let T=Ca(r,l,o);return T.feed=await Ur(e,"v2_events","WHERE json_extract(body,'$.clubId')=?",[A],30),T}if(a.pathname==="/api/leaderboards"){let A=a.searchParams.get("metric")||"xp",T=a.searchParams.get("period")||"all";(!["wallet","xp","games","achievements","activity"].includes(A)||!["all","week","month"].includes(T))&&j("\u6392\u884C\u699C\u7C7B\u578B\u65E0\u6548\u3002");let k,O,g,b=[],E="JOIN v2_accounts a ON a.player_id=w.id AND a.status='active' JOIN v2_profiles profile ON profile.id=w.id WHERE json_extract(profile.body,'$.archived')=0";if(A==="wallet")k=`SELECT w.id,w.sign,w.magnitude,w.digits,json_extract(w.body,'$.name') AS name,w.body FROM v2_wallet_index w ${E} AND w.visible=1`,O="sign DESC,CASE WHEN sign>=0 THEN magnitude END DESC,CASE WHEN sign>=0 THEN digits END DESC,CASE WHEN sign<0 THEN magnitude END ASC,CASE WHEN sign<0 THEN digits END ASC",g="NULL";else{let h=A==="activity"?"games":A;if(T!=="all"&&A!=="achievements"){let w=T+":"+Qe(o)[T];k=`SELECT w.id,json_extract(w.body,'$.name') AS name,COALESCE(s.${h},0) AS score FROM v2_wallet_index w JOIN v2_accounts a ON a.player_id=w.id AND a.status='active' JOIN v2_profiles profile ON profile.id=w.id LEFT JOIN v2_period_stats s ON s.player_id=w.id AND s.period=? WHERE json_extract(profile.body,'$.archived')=0`,b=[w]}else g=A==="achievements"?"(SELECT COUNT(*) FROM json_each(json_extract(prog.body,'$.achievements')))":"prog."+h,k=`SELECT w.id,json_extract(w.body,'$.name') AS name,${g} AS score FROM v2_wallet_index w JOIN v2_progress prog ON prog.id=w.id ${E}`;O="score DESC"}let P=(a.searchParams.get("query")||"").slice(0,100),R="%"+P.replaceAll("\\","\\\\").replaceAll("%","\\%").replaceAll("_","\\_")+"%",D=`WITH candidates AS (${k}),ranked AS (SELECT *,RANK() OVER (ORDER BY ${O}) AS place FROM candidates)`,W=(await e.prepare(D+" SELECT * FROM ranked WHERE name LIKE ? ESCAPE '\\' ORDER BY place,id LIMIT ? OFFSET ?").bind(...b,R,m,(p-1)*m).all()).results,M=await e.prepare(D+" SELECT COUNT(*) AS count FROM ranked WHERE name LIKE ? ESCAPE '\\'").bind(...b,R).first();return{rows:W.map(h=>({...vo(d.users.find(w=>w.id===h.id),r),rank:h.place,score:A==="wallet"?Lt.parse((h.sign<0?"-":"")+h.digits):h.score})),page:p,total:M.count,pages:Math.max(1,Math.ceil(M.count/m)),metric:A,period:A==="wallet"||A==="achievements"?"all":T}}if(a.pathname==="/api/admin/analytics"){ci(r,s.actor,null,!0,i);let A=o-30*864e5,T="kind NOT LIKE 'sandbox.%' AND kind NOT LIKE 'admin%' AND kind NOT LIKE 'security.%' AND kind!='system.sync'",k=(await e.prepare(`SELECT kind,COUNT(*) AS count FROM v2_events WHERE created_at>=? AND ${T} GROUP BY kind`).bind(A).all()).results,O=await e.prepare(`SELECT COUNT(DISTINCT player_id) AS count FROM v2_events WHERE created_at>=? AND player_id IS NOT NULL AND ${T}`).bind(o-864e5).first(),g=(await e.prepare("SELECT kind,COUNT(*) AS count,SUM(COALESCE(json_extract(body,'$.xp'),0)) AS xp FROM v2_claims WHERE kind!='compensation' AND created_at>=? GROUP BY kind").bind(A).all()).results,b=(await e.prepare("SELECT body FROM v2_journal WHERE kind NOT IN ('opening','gift','respondLoan','repayLoan') AND created_at>=?").bind(A).all()).results.map(w=>Lt.parseJSON(w.body)).filter(w=>["cash","reserved"].includes(w.asset)),E=new Map;for(let w of b)E.set(w.operationId,Lt.add(E.get(w.operationId)||0,Lt.parse(w.delta)));let P=0,R=0;for(let w of E.values())w>0?P=Lt.add(P,w):R=Lt.sub(R,w);let D=(await e.prepare("SELECT body FROM v2_events WHERE kind='game.settled' AND created_at>=?").bind(A).all()).results.map(w=>Lt.parseJSON(w.body)),W=0,M=0;for(let w of D)W=Lt.add(W,Lt.parse(w.wager||"0")),M=Lt.add(M,Lt.parse(w.payout||"0"));let h=(await e.prepare("SELECT json_extract(i.body,'$.kind') AS kind,COUNT(*) AS count FROM v2_inventory v JOIN v2_items i ON i.id=v.item_id WHERE json_extract(v.body,'$.createdAt')>=? GROUP BY json_extract(i.body,'$.kind')").bind(A).all()).results;return{window:"30 days",activePlayers24h:O.count,events:k,claims:g,items:h,gameSettlements:D.length,wagered:W,returned:M,cashIncreases:P,cashDecreases:R,accounting:"\u94B1\u5305\u4E0E\u4E0B\u6CE8\u5360\u7528\u5408\u8BA1\u7684\u6BCF\u64CD\u4F5C\u51C0\u589E\u51CF\uFF1B\u6392\u9664\u671F\u521D\u548C\u73A9\u5BB6\u4E92\u8F6C\u3002\u4E0B\u6CE8\u989D\u4E0E\u8FD4\u8FD8\u53E6\u5217\u3002"}}}(function(t){"use strict";!t.CasinoMoney&&typeof gn=="function"&&li();let e=t.CasinoMoney,r="roulette-club-v1",n=1e5,i=15e5,o=10*6e4,a=3*6e4,s=15*6e4,l=2,d=1e9,p=["7","\u{1F48E}","BAR","\u{1F514}","\u{1F340}","\u{1F352}"],m=[50,25,20,15,10,5],y=[0,5,3,1,4,2,0,5,4,3,5,1],A=()=>({RED:0,BLACK:0,GREEN:0,ODD:0,EVEN:0,numbers:{}}),T=M=>e.add(...["RED","BLACK","GREEN","ODD","EVEN"].map(h=>M[h]),...Object.values(M.numbers)),k=(M,h=null)=>e.valid(M)&&M>=0&&(h===null||typeof M=="number"&&M<=h),O=Object.freeze({seven:Object.freeze({name:"\u4FDD\u5E95 777",factor:35,multiplier:50,reels:[0,6,0],symbol:"7 7 7"}),diamonds:Object.freeze({name:"\u4FDD\u5E95\u4E09\u94BB\u77F3",factor:18,multiplier:25,reels:[3,11,3],symbol:"\u{1F48E} \u{1F48E} \u{1F48E}"}),bars:Object.freeze({name:"\u4FDD\u5E95\u4E09 BAR",factor:14,multiplier:20,reels:[5,5,5],symbol:"BAR BAR BAR"})}),g=()=>({sharkDebt:0,bankInterestAt:null,sharkInterestAt:null,marketAvailableAt:0,cards:[],armedCardId:null}),b=M=>M===null||Number.isSafeInteger(M)&&M>=0;function E(M,h,w,v=d){if(h===0)return M;for(let H=0;H<w&&(v===null||M<v);H++)M=e.add(M,e.ratio(M,h,1e4,!0)),v!==null&&(M=e.min(v,M));return M}function P(M){return k(M.sharkDebt)&&b(M.bankInterestAt)&&b(M.sharkInterestAt)&&b(M.marketAvailableAt)&&(M.recovery==null||typeof M.recovery=="object"&&k(M.recovery.deficit))&&Array.isArray(M.cards)&&M.cards.length<=50&&M.cards.every(h=>h&&typeof h.id=="string"&&Object.hasOwn(O,h.type)&&k(h.stake)&&h.stake>0)&&new Set(M.cards.map(h=>h.id)).size===M.cards.length&&(M.armedCardId===null||M.cards.some(h=>h.id===M.armedCardId))}function R(M){return M&&["RED","BLACK","GREEN","ODD","EVEN"].every(h=>k(M[h]))&&M.numbers&&typeof M.numbers=="object"&&!Array.isArray(M.numbers)&&Object.entries(M.numbers).every(([h,w])=>/^(?:[0-9]|1[0-9]|2[0-3])$/.test(h)&&k(w))&&k(T(M))}function D(M,h){return{id:M,name:h,balance:1e3,debt:0,bets:A(),lastBets:null,history:[],pendingRoulette:!1,...g()}}class W{constructor(h,w,v=()=>Date.now(),{recoverRoulette:H=!0}={}){this.storage=h,this.now=v,this.random=w||(()=>{let I=new Uint32Array(1);return t.crypto.getRandomValues(I),I[0]/4294967296}),this.lock=null,this.storageWarning="",this.data={version:1,activeId:"alex",users:[D("alex","Alex"),D("jamie","Jamie"),D("taylor","Taylor")],ledger:[],loans:[]};try{let I=h&&h.getItem(r);if(I){let B=e.parseJSON(I);if(Array.isArray(B.users)&&(B.users=B.users.map(N=>({...g(),...N}))),B.loans??=[],B.version!==1||!Array.isArray(B.users)||B.users.length<1||!Array.isArray(B.ledger)||!Array.isArray(B.loans)||B.loans.length>200||!B.loans.every(N=>this.validLoan(N,B.users))||new Set(B.loans.map(N=>N.id)).size!==B.loans.length||!B.users.some(N=>N.id===B.activeId)||new Set(B.users.map(N=>N.id)).size!==B.users.length||!B.users.every(N=>typeof N.id=="string"&&typeof N.name=="string"&&N.name.trim().length>0&&N.name.length<=24&&e.valid(N.balance)&&k(N.debt)&&P(N)&&R(N.bets)&&(N.lastBets===null||R(N.lastBets))&&Array.isArray(N.history)))throw new Error("Invalid saved profiles");this.data=B,this.data.ledger=B.ledger.filter(N=>N&&typeof N.text=="string"&&typeof N.time=="string").slice(0,100);for(let N of B.users)delete N.bankRounds,delete N.sharkRounds,N.history=N.history.filter(pe=>pe&&k(pe.num,23)&&["GREEN","RED","BLACK"].includes(pe.colorTag)).slice(0,10),N.pendingRoulette&&H&&(N.balance=e.add(N.balance,T(N.bets)),N.bets=A(),N.pendingRoulette=!1,this.record(`${N.name}: interrupted roulette stake refunded.`))}}catch{this.storageWarning="Saved profiles could not be read. This session starts with fresh local profiles."}this.accrueInterest();for(let I of this.data.users)this.prepareRecovery(I);this.save()}get money(){return e}get active(){return this.data.users.find(h=>h.id===this.data.activeId)}get availableCredit(){return e.max(0,e.sub(n,this.active.debt))}get availableSharkCredit(){return e.max(0,e.sub(i,this.active.sharkDebt))}get canBorrowShark(){return!this.lock&&!this.active.recovery&&this.availableCredit===0&&this.active.balance<=0&&T(this.active.bets)===0&&this.availableSharkCredit>0}get armedCard(){return this.active.cards.find(h=>h.id===this.active.armedCardId)||null}prepareRecovery(h=this.active){return!h||h.recovery||h.balance>0||!(h.sharkDebt>0)||T(h.bets)||h.pendingRoulette||h.blackjack&&h.blackjack.phase!=="settled"?!1:(h.recovery={deficit:e.max(0,e.sub(0,h.balance))},h.balance=10,this.record(`${h.name} \xB7 \u9AD8\u5229\u8D37\u7B79\u7801\u5DF2\u7528\u5C3D\uFF0C\u8FDB\u5165\u8D1F\u6570\u6A21\u5F0F\uFF1A-${h.recovery.deficit.toLocaleString()}\uFF0C\u6BCF\u5C40\u53EF\u7528 10\u3002`),!0)}ensureCashWallet(h=this.active){if(h.recovery)throw new Error("\u8D1F\u6570\u6A21\u5F0F\u7684 10 \u7B79\u7801\u4EC5\u7528\u4E8E\u6E38\u620F\uFF0C\u4E0D\u80FD\u8D60\u9001\u3001\u51FA\u501F\u3001\u8D2D\u4E70\u6216\u8FD8\u6B3E\u3002\u76C8\u5229\u5148\u62B5\u6263\u8D1F\u6570\u3002")}recoveryNet(h,w){let v=e.sub(h.recovery.deficit,w);w>0&&v<=0?(h.recovery=null,h.balance=e.sub(10,v)):(h.recovery.deficit=e.max(0,v),h.balance=10)}credit(h,w){h.recovery?this.recoveryNet(h,w):h.balance=e.add(h.balance,w)}ensureIdle(){if(this.lock)throw new Error("Wait for the current spin to finish.");this.accrueInterest()&&this.save()}amount(h,w=null){let v=e.positive(h);if(w!==null&&v>w)throw new Error("Enter a whole number from 1 to "+w.toLocaleString()+".");return v}save(){this.accrueInterest();try{this.storage&&this.storage.setItem(r,e.stringify(this.data))}catch{this.storageWarning="Browser storage is unavailable. Keep this page open to retain this session."}}record(h){this.data.ledger.unshift({text:h,time:new Date().toISOString()}),this.data.ledger=this.data.ledger.slice(0,100)}switchUser(h){if(this.ensureIdle(),!this.data.users.some(w=>w.id===h))throw new Error("Choose an existing player.");this.data.activeId=h,this.save()}addUser(h){if(this.ensureIdle(),h=String(h).trim(),!h||h.length>24)throw new Error("Use a player name with 1\u201324 characters.");if(this.data.users.some(v=>v.name.toLowerCase()===h.toLowerCase()))throw new Error("That player name is already taken.");let w=D(t.crypto.randomUUID(),h);return this.data.users.push(w),this.data.activeId=w.id,this.record(`${h} joined with 1,000 starter chips.`),this.save(),w}validLoan(h,w){return h&&typeof h.id=="string"&&typeof h.lenderId=="string"&&typeof h.borrowerId=="string"&&h.lenderId!==h.borrowerId&&typeof h.lenderName=="string"&&typeof h.borrowerName=="string"&&k(h.principal)&&h.principal>0&&k(h.balance)&&k(h.rateBps,1e4)&&k(h.periodMs,1440*6e4)&&h.periodMs>=6e4&&h.periodMs%6e4===0&&b(h.createdAt)&&b(h.interestAt)&&["pending","active","declined","cancelled","repaid"].includes(h.status)&&(!["pending","active"].includes(h.status)||[h.lenderId,h.borrowerId].every(v=>w.some(H=>H.id===v)))&&(h.status!=="active"||h.interestAt!==null&&h.balance>0)}offerLoan(h,w,v,H=10){this.ensureIdle(),this.ensureCashWallet();let I=this.active,B=this.data.users.find(ie=>ie.id===h),N=this.amount(w);if(!B||B===I)throw new Error("\u8BF7\u9009\u62E9\u53E6\u4E00\u4F4D\u501F\u6B3E\u73A9\u5BB6\u3002");let pe=Math.round(v*100);if(!Number.isFinite(v)||!k(pe,1e4)||Math.abs(v*100-pe)>1e-6)throw new Error("\u5229\u7387\u9700\u4E3A 0\u2013100%\uFF0C\u6700\u591A\u4E24\u4F4D\u5C0F\u6570\u3002");if(!k(H,1440)||H<1)throw new Error("\u8BA1\u606F\u5468\u671F\u9700\u4E3A 1\u20131,440 \u5206\u949F\u3002");if(N>I.balance)throw new Error("\u51FA\u501F\u4EBA\u7684\u4F59\u989D\u4E0D\u8DB3\u3002");if(this.data.loans=this.data.loans.filter(ie=>["pending","active"].includes(ie.status)||this.data.loans.indexOf(ie)<100),this.data.loans.length>=200)throw new Error("\u501F\u6B3E\u534F\u8BAE\u6570\u91CF\u5DF2\u8FBE\u4E0A\u9650\uFF0C\u8BF7\u5148\u5904\u7406\u5F85\u786E\u8BA4\u534F\u8BAE\u3002");let fe={id:t.crypto.randomUUID(),lenderId:I.id,borrowerId:h,lenderName:I.name,borrowerName:B.name,principal:N,balance:N,rateBps:pe,periodMs:H*6e4,status:"pending",createdAt:this.now(),interestAt:null};return this.data.loans.unshift(fe),this.record(`${I.name} \u2192 ${B.name}: \u53D1\u8D77\u501F\u6B3E\u534F\u8BAE ${N.toLocaleString()}\uFF0C\u6BCF ${H} \u5206\u949F ${v}%\uFF0C\u7B49\u5F85\u501F\u6B3E\u4EBA\u786E\u8BA4\u3002`),this.save(),fe}respondLoan(h,w){this.ensureIdle();let v=this.data.loans.find(B=>B.id===h);if(!v||v.status!=="pending"||v.borrowerId!==this.active.id)throw new Error("\u53EA\u6709\u501F\u6B3E\u4EBA\u80FD\u786E\u8BA4\u8FD9\u4EFD\u5F85\u5904\u7406\u534F\u8BAE\u3002");if(!w){v.status="declined",this.record(`${v.borrowerName} \u62D2\u7EDD\u4E86 ${v.lenderName} \u7684\u501F\u6B3E\u534F\u8BAE\u3002`),this.save();return}let H=this.data.users.find(B=>B.id===v.lenderId),I=this.active;if(this.ensureCashWallet(I),H&&this.ensureCashWallet(H),!H||H.balance<v.principal)throw new Error("\u51FA\u501F\u4EBA\u5F53\u524D\u4F59\u989D\u4E0D\u8DB3\uFF0C\u5C1A\u672A\u6263\u6B3E\u3002");H.balance=e.sub(H.balance,v.principal),I.balance=e.add(I.balance,v.principal),v.status="active",v.interestAt=this.now(),this.record(`${v.borrowerName} \u5DF2\u63A5\u53D7\u534F\u8BAE\uFF0C${v.lenderName} \u8F6C\u5165 ${v.principal.toLocaleString()}\u3002`),this.save()}cancelLoan(h){this.ensureIdle();let w=this.data.loans.find(v=>v.id===h);if(!w||w.status!=="pending"||w.lenderId!==this.active.id)throw new Error("\u53EA\u80FD\u64A4\u9500\u81EA\u5DF1\u53D1\u8D77\u7684\u5F85\u786E\u8BA4\u534F\u8BAE\u3002");w.status="cancelled",this.record(`${w.lenderName} \u64A4\u9500\u4E86\u7ED9 ${w.borrowerName} \u7684\u501F\u6B3E\u534F\u8BAE\u3002`),this.save()}repayLoan(h,w){this.ensureIdle(),this.ensureCashWallet();let v=this.data.loans.find(N=>N.id===h);if(!v||v.status!=="active"||v.borrowerId!==this.active.id)throw new Error("\u53EA\u80FD\u507F\u8FD8\u81EA\u5DF1\u7684\u6709\u6548\u501F\u6B3E\u3002");let H=this.amount(w==="all"?v.balance:w),I=this.data.users.find(N=>N.id===v.lenderId),B=this.active;if(H>v.balance||H>B.balance)throw new Error("\u8FD8\u6B3E\u8D85\u8FC7\u6B20\u6B3E\u6216\u94B1\u5305\u4F59\u989D\u3002");if(!I)throw new Error("\u51FA\u501F\u4EBA\u4E0D\u5B58\u5728\u3002");B.balance=e.sub(B.balance,H),this.credit(I,H),v.balance=e.sub(v.balance,H),v.balance===0&&(v.status="repaid",v.interestAt=null),this.record(`${B.name} \u2192 ${I.name}: \u507F\u8FD8\u73A9\u5BB6\u501F\u6B3E ${H.toLocaleString()}\u3002`),this.save()}deletePlayer(h){this.ensureIdle();let w=this.data.users.find(v=>v.id===h);if(!w)throw new Error("\u8BE5\u73A9\u5BB6\u4E0D\u5B58\u5728\u3002");if(this.data.users.length===1)throw new Error("\u81F3\u5C11\u4FDD\u7559\u4E00\u540D\u73A9\u5BB6\u3002");if(w.debt||w.sharkDebt||w.recovery?.deficit||T(w.bets)||w.pendingRoulette||w.blackjack&&w.blackjack.phase!=="settled"||this.data.loans.some(v=>["pending","active"].includes(v.status)&&[v.lenderId,v.borrowerId].includes(h)))throw new Error("\u8BF7\u5148\u7ED3\u6E05\u6B20\u6B3E\u3001\u501F\u51FA\u6B3E\u3001\u5F85\u786E\u8BA4\u534F\u8BAE\u548C\u6E38\u620F\u4E0B\u6CE8\uFF0C\u518D\u5220\u9664\u73A9\u5BB6\u3002");this.data.users=this.data.users.filter(v=>v.id!==h),this.data.activeId===h&&(this.data.activeId=this.data.users[0].id),this.record(`\u5DF2\u5220\u9664\u73A9\u5BB6 ${w.name}\uFF0C\u5176\u94B1\u5305\u548C\u5361\u5305\u5DF2\u79FB\u9664\u3002`),this.save()}adminAdjust(h,w,v,H=""){this.ensureIdle();let I=this.data.users.find(pe=>pe.id===h),B=this.amount(v);if(!I||!["add","remove"].includes(w))throw new Error("\u8BF7\u9009\u62E9\u73A9\u5BB6\u53CA\u6709\u6548\u7684\u8C03\u6574\u65B9\u5F0F\u3002");if(typeof H!="string"||H.length>120)throw new Error("\u5907\u6CE8\u6700\u591A 120 \u4E2A\u5B57\u7B26\u3002");let N=w==="add"?B:e.sub(0,B);if(I.recovery)this.recoveryNet(I,N);else{if(e.add(I.balance,N)<0)throw new Error("\u6263\u9664\u91D1\u989D\u4E0D\u80FD\u8D85\u8FC7\u94B1\u5305\u4F59\u989D\u3002");I.balance=e.add(I.balance,N)}this.record(`\u7BA1\u7406\u5458 \xB7 ${I.name} ${w==="add"?"\u589E\u52A0":"\u6263\u9664"} ${B.toLocaleString()} \u7B79\u7801${H.trim()?" \xB7 "+H.trim():""}\u3002`),this.save()}transfer(h,w){this.ensureIdle(),this.ensureCashWallet();let v=this.amount(w),H=this.active,I=this.data.users.find(B=>B.id===h);if(!I||I===H)throw new Error("Choose another player to receive the chips.");if(v>H.balance)throw new Error("Your wallet does not have enough chips.");H.balance=e.sub(H.balance,v),this.credit(I,v),this.record(`${H.name} \u2192 ${I.name}: ${v.toLocaleString()} chips transferred.`),this.save()}borrow(h){this.ensureIdle(),this.ensureCashWallet();let w=this.amount(h),v=this.active;if(w>this.availableCredit)throw new Error(`You can borrow up to ${this.availableCredit.toLocaleString()} more chips.`);v.balance=e.add(v.balance,w),v.debt===0&&(v.bankInterestAt=this.now(),v.bankInterestPolicy=l),v.debt=e.add(v.debt,w),this.record(`Bank \u2192 ${v.name}: borrowed ${w.toLocaleString()} chips.`),this.save()}repay(h){this.ensureIdle(),this.ensureCashWallet();let w=this.active,v=this.amount(h==="all"?w.debt:h);if(v>w.debt)throw new Error("That amount is greater than your outstanding debt.");if(v>w.balance)throw new Error("Your wallet does not have enough chips to repay that amount.");w.balance=e.sub(w.balance,v),w.debt=e.sub(w.debt,v),w.debt===0&&(w.bankInterestAt=null),this.record(`${w.name} \u2192 Bank: repaid ${v.toLocaleString()} chips.`),this.save()}borrowShark(h){this.ensureIdle();let w=this.amount(h,i),v=this.active;if(!this.canBorrowShark)throw new Error("\u9AD8\u5229\u8D37\u4EC5\u5728\u94F6\u884C\u989D\u5EA6\u8017\u5C3D\u3001\u94B1\u5305 \u2264 0 \u4E14\u6CA1\u6709\u672A\u7ED3\u7B97\u4E0B\u6CE8\u65F6\u5F00\u653E\u3002");if(w>this.availableSharkCredit)throw new Error("\u9AD8\u5229\u8D37\u5269\u4F59\u989D\u5EA6\u4E0D\u8DB3\u3002");v.sharkDebt===0&&(v.sharkInterestAt=this.now(),v.sharkInterestPolicy=l),v.balance=e.add(v.balance,w),v.sharkDebt=e.add(v.sharkDebt,w),this.record(`\u9AD8\u5229\u8D37 \u2192 ${v.name}: \u501F\u5165 ${w.toLocaleString()}\uFF1B\u6BCF 3 \u5206\u949F\u8BA1\u606F 125%\u3002`),this.save()}repayShark(h){this.ensureIdle(),this.ensureCashWallet();let w=this.active,v=this.amount(h==="all"?w.sharkDebt:h);if(v>w.sharkDebt)throw new Error("\u8FD8\u6B3E\u4E0D\u80FD\u8D85\u8FC7\u9AD8\u5229\u8D37\u6B20\u6B3E\u3002");if(v>w.balance)throw new Error("\u94B1\u5305\u4F59\u989D\u4E0D\u8DB3\u4EE5\u8FD8\u6B3E\u3002");w.balance=e.sub(w.balance,v),w.sharkDebt=e.sub(w.sharkDebt,v),w.sharkDebt===0&&(w.sharkInterestAt=null),this.record(`${w.name} \u2192 \u9AD8\u5229\u8D37: \u507F\u8FD8 ${v.toLocaleString()}\u3002`),this.save()}repayAll(h,w){if(h==="bank")return this.repay("all");if(h==="shark")return this.repayShark("all");if(h==="peer")return this.repayLoan(w,"all");throw new Error("\u8BF7\u9009\u62E9\u94F6\u884C\u3001\u9AD8\u5229\u8D37\u6216\u4E00\u7B14\u73A9\u5BB6\u501F\u6B3E\u3002")}projectDebts(h,w=this.active.id){if(!k(h,1440))throw new Error("\u9884\u89C8\u65F6\u95F4\u9700\u4E3A 0\u20131,440 \u5206\u949F\u3002");let v=this.data.users.find(Ae=>Ae.id===w);if(!v)throw new Error("\u8BF7\u9009\u62E9\u6709\u6548\u73A9\u5BB6\u3002");let H=this.now(),I=H+h*6e4,B=(Ae,le,de,Z,bt=d)=>E(Ae,Z,Math.max(0,Math.floor((I-(le??H))/de)),bt),N=B(v.debt,v.bankInterestAt,o,1500),pe=B(v.sharkDebt,v.sharkInterestAt,a,12500),fe=this.data.loans.filter(Ae=>Ae.status==="active"&&Ae.borrowerId===w).reduce((Ae,le)=>e.add(Ae,B(le.balance,le.interestAt,le.periodMs,le.rateBps,null)),0),ie=v.recovery?.deficit||0;return{bank:N,shark:pe,peer:fe,negative:ie,total:e.add(N,pe,fe,ie)}}completeRound(h=0){this.accrueInterest();let w=this.active;w.recovery?(this.recoveryNet(w,h),this.record(`${w.name} \xB7 \u8D1F\u6570\u6A21\u5F0F\u51C0\u8F93\u8D62 ${h>=0?"+":""}${h.toLocaleString()}\uFF1B${w.recovery?"\u8BB0\u5F55 -"+w.recovery.deficit.toLocaleString()+"\uFF0C\u4E0B\u4E00\u5C40\u53EF\u7528 10":"\u5DF2\u8FD8\u6E05\u8D1F\u6570\uFF0C\u6062\u590D\u6B63\u5E38\u4F59\u989D "+w.balance.toLocaleString()}\u3002`)):this.prepareRecovery(w)}accrueInterest(){let h=this.now(),w=!1,v=(I,B,N,pe,fe,ie,Ae=d)=>{if(I[B]<=0){I[N]!==null&&(I[N]=null,w=!0);return}if(I[N]===null){I[N]=h,w=!0;return}let le=Math.floor((h-I[N])/pe);if(le<=0)return;let de=I[B];I[B]=E(de,fe,le,Ae),I[N]+=le*pe,w=!0,I[B]!==de&&this.record(`${ie} \xB7 ${le} \u671F\u5229\u606F +${e.sub(I[B],de).toLocaleString()}\uFF0C\u6B20\u6B3E ${I[B].toLocaleString()}\u3002`)},H=(I,B,N,pe,fe,ie,Ae,le,de)=>{I[B]>0&&I[pe]!==l&&(v(I,B,N,Ae,le,de),I[pe]=l,I[N]=Math.max(h,I[N]??h),w=!0),v(I,B,N,fe,ie,de)};for(let I of this.data.users)H(I,"debt","bankInterestAt","bankInterestPolicy",o,1500,30*6e4,50,I.name+" \xB7 \u94F6\u884C"),H(I,"sharkDebt","sharkInterestAt","sharkInterestPolicy",a,12500,5*6e4,1e3,I.name+" \xB7 \u9AD8\u5229\u8D37");for(let I of this.data.loans)I.status==="active"&&v(I,"balance","interestAt",I.periodMs,I.rateBps,I.borrowerName+" \u2192 "+I.lenderName,null);return w}buyCard(h,w){this.ensureIdle(),this.ensureCashWallet();let v=Object.hasOwn(O,h)?O[h]:null;if(!v)throw new Error("\u8BF7\u9009\u62E9\u6709\u6548\u7684\u9ED1\u5E02\u5361\u3002");let H=this.amount(w),I=e.mul(H,v.factor),B=this.active;if(this.now()<B.marketAvailableAt)throw new Error("\u9ED1\u5E02\u8FDB\u8D27\u4E2D\uFF0C\u8BF7\u7B49\u5F85\u8D2D\u4E70\u51B7\u5374\u7ED3\u675F\u3002");if(B.cards.length>=50)throw new Error("\u6700\u591A\u6301\u6709 50 \u5F20\u5361\uFF0C\u8BF7\u5148\u4F7F\u7528\u5DF2\u6709\u5361\u3002");if(e.add(I,H)>B.balance)throw new Error("\u4F59\u989D\u4E0D\u8DB3\uFF1A\u9700\u652F\u4ED8\u5361\u4EF7\uFF0C\u5E76\u7559\u8DB3\u4E00\u6B21\u7ED1\u5B9A\u4E0B\u6CE8\u7684\u7B79\u7801\u3002");let N={id:t.crypto.randomUUID(),type:h,stake:H};return B.balance=e.sub(B.balance,I),B.cards.push(N),B.marketAvailableAt=this.now()+s,this.record(`${B.name} \xB7 \u9ED1\u5E02\u8D2D\u4E70${v.name}\uFF0C\u4EF7\u683C ${I.toLocaleString()}\uFF0C\u7ED1\u5B9A\u4E0B\u6CE8 ${H.toLocaleString()}\u3002`),this.save(),N}armCard(h){this.ensureIdle();let w=this.active.cards.find(v=>v.id===h);if(h!==null&&!w)throw new Error("\u4F60\u6CA1\u6709\u8FD9\u5F20\u5361\u3002");if(w&&w.stake>this.active.balance)throw new Error("\u4F59\u989D\u4E0D\u8DB3\u4EE5\u652F\u4ED8\u8BE5\u5361\u7ED1\u5B9A\u7684\u4E0B\u6CE8\u3002");this.active.armedCardId=h,this.save()}buyLottery(h,{jackpot:w=!1}={}){this.ensureIdle();let v=t.CasinoLottery.price(h),H=this.active;if(v>H.balance)throw new Error("\u94B1\u5305\u4F59\u989D\u4E0D\u8DB3\u4EE5\u8D2D\u4E70\u8FD9\u6863\u5F69\u7968\u3002");let I=t.CasinoLottery.draw(v,this.random,w);return I.id=t.crypto.randomUUID(),I.time=new Date(this.now()).toISOString(),I.walletAfterWager=e.sub(H.balance,v),H.balance=e.add(H.balance,I.net),H.lotteryHistory=[I,...Array.isArray(H.lotteryHistory)?H.lotteryHistory.filter(t.CasinoLottery.validHistory):[]].slice(0,30),this.record(`${H.name} \xB7 \u5F69\u7968 \xB7 ${t.CasinoLottery.tiers[I.tier].name}: \u7968\u4EF7 ${v.toLocaleString()}\uFF0C\u8FD4\u8FD8 ${I.payout.toLocaleString()}\uFF08${I.multiplier}\xD7\uFF09\uFF0C\u51C0\u8F93\u8D62 ${I.net>=0?"+":""}${I.net.toLocaleString()}\u3002`),this.completeRound(I.net),this.lock="lottery",this.save(),I}playPlinko(h,w="medium",v="center",{jackpot:H=!1}={}){this.ensureIdle();let I=this.amount(h),B=this.active;if(t.CasinoArcade.plinkoSettings(w,v),I>B.balance)throw new Error("\u94B1\u5305\u4F59\u989D\u4E0D\u8DB3\uFF0C\u8BF7\u964D\u4F4E\u4E0B\u6CE8\u6216\u524D\u5F80\u94F6\u884C\u3002");return this.finishArcade(t.CasinoArcade.plinko(I,w,v,this.random,H),"Plinko")}playDice(h,w="small",v=null,{jackpot:H=!1}={}){this.ensureIdle();let I=this.amount(h),B=this.active;if(t.CasinoArcade.diceSettings(w,v),I>B.balance)throw new Error("\u94B1\u5305\u4F59\u989D\u4E0D\u8DB3\uFF0C\u8BF7\u964D\u4F4E\u4E0B\u6CE8\u6216\u524D\u5F80\u94F6\u884C\u3002");return this.finishArcade(t.CasinoArcade.dice(I,w,v,this.random,H),"\u9AB0\u5B9D")}finishArcade(h,w){let v=this.active;return h.id=t.crypto.randomUUID(),h.time=new Date(this.now()).toISOString(),h.walletAfterWager=e.sub(v.balance,h.wager),v.balance=e.add(v.balance,h.net),v.arcadeHistory=[h,...Array.isArray(v.arcadeHistory)?v.arcadeHistory.filter(t.CasinoArcade.validHistory):[]].slice(0,30),this.record(`${v.name} \xB7 ${w}${h.game==="dice"?" "+h.dice.join(" \xB7 "):" "+h.risk+" / "+h.lane}: \u4E0B\u6CE8 ${h.wager.toLocaleString()}\uFF0C\u8FD4\u8FD8 ${h.payout.toLocaleString()}\uFF0C\u51C0\u8F93\u8D62 ${h.net>=0?"+":""}${h.net.toLocaleString()}\u3002`),this.completeRound(h.net),this.lock=h.game,this.save(),h}slotResult(h,w){if(!Array.isArray(h)||h.length!==3||!h.every(N=>k(N,11)))throw new Error("Invalid reels.");let v=h.map(N=>y[N]),H=v.filter(N=>N===5).length,I=v.filter(N=>N===0).length,B=v.every(N=>N===v[0])?m[v[0]]:I===2?5:H===2?2:H===1?1:0;return{reels:[...h],symbols:v,multiplier:B,wager:w,payout:e.mul(w,B),net:e.mul(w,B-1)}}spinSlots(h,w=null,{allIn:v=!1,jackpot:H=!1}={}){this.ensureIdle();let I=this.amount(h),B=this.active,N=H?null:this.armedCard;if(N&&I!==N.stake)throw new Error("\u5DF2\u88C5\u5907\u5361\u7ED1\u5B9A\u4E0B\u6CE8 "+N.stake.toLocaleString()+"\uFF0C\u8BF7\u53D6\u6D88\u88C5\u5907\u540E\u66F4\u6539\u3002");if(v&&I!==B.balance)throw new Error("All In must wager your whole wallet.");if(I>B.balance)throw new Error("Your wallet does not have enough chips for this spin.");let pe=H?[0,6,0]:N?O[N.type].reels:w===null?Array.from({length:3},()=>{let ie=this.random();if(!(ie>=0&&ie<1))throw new Error("Could not generate a valid spin. Try again.");return Math.floor(ie*y.length)}):w,fe=this.slotResult(pe,I);return fe.walletAfterWager=e.sub(B.balance,I),B.balance=e.add(B.balance,fe.net),N&&(B.cards=B.cards.filter(ie=>ie.id!==N.id),B.armedCardId=null,fe.cardName=O[N.type].name,this.record(`${B.name} \xB7 \u5DF2\u6D88\u8017${fe.cardName}\uFF0C\u7ED1\u5B9A\u4E0B\u6CE8 ${I.toLocaleString()}\u3002`)),this.record(`${B.name} \xB7 777${w===null?"":" (forced jackpot)"}: wager ${I.toLocaleString()}, payout ${fe.payout.toLocaleString()} (${fe.symbols.map(ie=>p[ie]).join(" / ")}).`),this.completeRound(fe.net),this.lock="slots",this.save(),fe}}W.money=e,W.symbols=p,W.triples=m,W.reelStrip=y,W.creditLimit=n,W.sharkLimit=i,W.cards=O,W.emptyBets=A,W.sumBets=T,W.storageKey=r,t.CasinoEngine=W})(globalThis);Sa();var $r=(t,e,r=0)=>((typeof t!="string"||t.trim().length<r||t.trim().length>e)&&j(`\u6587\u5B57\u957F\u5EA6\u5FC5\u987B\u4E3A ${r}\u2013${e}\u3002`),t.trim()),vn=(t,e,r)=>((!Number.isSafeInteger(t)||t<e||t>r)&&j("\u8BF7\u8F93\u5165\u6709\u6548\u6574\u6570\u3002"),t),Pf=t=>{let e=$r(t,80,1);return(!/^[a-zA-Z0-9_-]+$/.test(e)||["__proto__","prototype","constructor"].includes(e))&&j("\u914D\u7F6E\u6807\u8BC6\u65E0\u6548\u3002"),e},Of=(t,e)=>{(e.actor!==t.meta.ownerActor||e.role!=="owner")&&j("\u53EA\u6709\u7AD9\u70B9\u6240\u6709\u8005\u53EF\u4EE5\u6267\u884C\u6B64\u64CD\u4F5C\u3002",403)},Ad=t=>t.startsWith("admin.")||["adminAdjust","addUser","deletePlayer","import"].includes(t);function Nf(t,e,r,n,i,o){let a=r.playerId;if(n==="reward.claim")return _f(t,a,o);if(n==="quest.claim")return Rf(t,a,$r(i[0],80,1),o);if(n==="profile.update"){let s=i[0];(!s||typeof s!="object"||Array.isArray(s))&&j("\u8D44\u6599\u683C\u5F0F\u65E0\u6548\u3002");let l=t.profiles[a];if(s.name!==void 0){let d=$r(s.name,24,1);e.data.users.some(p=>p.id!==a&&p.name.toLocaleLowerCase()===d.toLocaleLowerCase())&&j("\u73A9\u5BB6\u540D\u79F0\u5DF2\u88AB\u4F7F\u7528\u3002"),e.active.name=d}return s.bio!==void 0&&(l.bio=$r(s.bio,180)),s.avatar!==void 0&&(["initial","star","moon","diamond"].includes(s.avatar)||j("\u8BF7\u9009\u62E9\u9884\u8BBE\u5934\u50CF\u3002"),l.avatar=s.avatar),t.progress[a].profileCompleted=!0,yn(t,a,o),l}if(n==="profile.settings"){let s=i[0];(!s||typeof s!="object"||Array.isArray(s))&&j("\u8BBE\u7F6E\u683C\u5F0F\u65E0\u6548\u3002");let l=t.profiles[a];s.walletVisible!==void 0&&(typeof s.walletVisible!="boolean"&&j("\u4F59\u989D\u9690\u79C1\u8BBE\u7F6E\u65E0\u6548\u3002"),l.walletVisible=s.walletVisible);for(let d of["sound","reducedMotion"])s[d]!==void 0&&(typeof s[d]!="boolean"&&j("\u504F\u597D\u8BBE\u7F6E\u65E0\u6548\u3002"),l.settings[d]=s[d]);return l}if(n==="inventory.equip"){let[s,l]=i,d=t.profiles[a],p=(m,y)=>{(!t.inventory[a+":"+m]||t.items[m]?.kind!==y||!t.items[m]?.enabled)&&j("\u672A\u62E5\u6709\u8BE5\u7269\u54C1\u6216\u88C5\u5907\u7C7B\u578B\u4E0D\u5339\u914D\u3002",403)};if(s==="badges"){(!Array.isArray(l)||l.length>3||new Set(l).size!==l.length)&&j("\u6700\u591A\u5C55\u793A\u4E09\u4E2A\u4E0D\u540C\u5FBD\u7AE0\u3002");for(let m of l)p(m,"badge");d.featuredBadges=[...l]}else["frame","title","background"].includes(s)||j("\u88C5\u5907\u4F4D\u7F6E\u65E0\u6548\u3002"),l!==null&&p(l,s),d.equipped[s]=l;return d}if(n==="admin.bind"){let[s,l]=i,d=t.accounts[s],p=e.data.users.find(m=>m.id===l);return(!d||!p||t.profiles[l]?.archived)&&j("\u8BF7\u9009\u62E9\u5DF2\u767B\u5F55\u7684\u8D26\u53F7\u548C\u6709\u6548\u65E7\u73A9\u5BB6\u3002"),d.playerId&&d.playerId!==l&&j("\u8BE5\u8D26\u53F7\u5DF2\u7ECF\u7ED1\u5B9A\u5176\u4ED6\u73A9\u5BB6\u3002"),Object.values(t.accounts).some(m=>m.actor!==s&&m.playerId===l)&&j("\u8BE5\u73A9\u5BB6\u5DF2\u7ECF\u7ED1\u5B9A\u5176\u4ED6\u8D26\u53F7\u3002",409),d.role!=="member"&&r.role!=="owner"&&j("\u53EA\u6709\u6240\u6709\u8005\u53EF\u4EE5\u7ED1\u5B9A\u7BA1\u7406\u5458\u8D26\u53F7\u3002",403),d.playerId=l,d.status="active",bn(t,l,o),{actor:s,playerId:l}}if(n==="admin.account"){Of(t,r);let[s,l,d,p]=i,m=t.accounts[s];return $r(p,120,3),(!m||s===t.meta.ownerActor||!["admin","member"].includes(l)||!["active","suspended","pending"].includes(d))&&j("\u8D26\u53F7\u72B6\u6001\u6216\u89D2\u8272\u65E0\u6548\uFF1B\u4E0D\u80FD\u4FEE\u6539\u6240\u6709\u8005\u3002"),d==="active"&&!m.playerId&&j("\u8BF7\u5148\u7ED1\u5B9A\u73A9\u5BB6\u3002"),m.role=l,m.status=d,{actor:s,role:l,status:d}}if(n==="admin.maintenance")return Of(t,r),typeof i[0]!="boolean"&&j("\u7EF4\u62A4\u72B6\u6001\u65E0\u6548\u3002"),$r(i[1],120,3),t.meta.maintenance=i[0],{maintenance:i[0]};if(n==="admin.item"){let s=structuredClone(i[0]);return(!s||typeof s!="object"||Array.isArray(s))&&j("\u7269\u54C1\u65E0\u6548\u3002"),s.id=Pf(s.id),s.name=$r(s.name,48,1),s.description=$r(s.description||"",300),(!["frame","badge","title","background","souvenir"].includes(s.kind)||!["common","rare","epic","legendary"].includes(s.rarity)||typeof s.enabled!="boolean")&&j("\u7269\u54C1\u5206\u7C7B\u6216\u7A00\u6709\u5EA6\u65E0\u6548\u3002"),t.items[s.id]&&t.items[s.id].kind!==s.kind&&j("\u5DF2\u6709\u7269\u54C1\u4E0D\u80FD\u6539\u53D8\u88C5\u5907\u7C7B\u578B\u3002"),t.items[s.id]=s,s}if(n==="admin.definition"){let s=structuredClone(i[0]);(!s||typeof s!="object"||Array.isArray(s))&&j("\u914D\u7F6E\u65E0\u6548\u3002"),s.id=Pf(s.id),s.name=$r(s.name||s.id,60,1),(typeof s.enabled!="boolean"||!["settings","quest","achievement"].includes(s.kind))&&j("\u914D\u7F6E\u7C7B\u578B\u65E0\u6548\u3002"),s.kind==="settings"?(s.id!=="settings"&&j("\u914D\u7F6E\u6807\u8BC6\u65E0\u6548\u3002"),vn(s.gameXP,0,100),vn(s.dailyGameCap,0,1e3),vn(s.levelFactor,10,1e6),(!Array.isArray(s.dailyXP)||s.dailyXP.length!==7)&&j("\u7B7E\u5230\u9700\u8981\u4E03\u5929\u5956\u52B1\u3002"),s.dailyXP.forEach(d=>vn(d,0,1e4))):((!["day","week","month","all","event"].includes(s.period)||!["games","types","profile","club","quests","items"].includes(s.condition))&&j("\u4EFB\u52A1\u89C4\u5219\u65E0\u6548\u3002"),vn(s.target,1,1e6),vn(s.xp||0,0,1e4),s.period==="event"&&(vn(s.startsAt,0,Number.MAX_SAFE_INTEGER),vn(s.endsAt,s.startsAt+1,Number.MAX_SAFE_INTEGER),["games","types"].includes(s.condition)||j("\u9650\u65F6\u4EFB\u52A1\u652F\u6301\u5B8C\u6210\u5BF9\u5C40\u6216\u4E0D\u540C\u6E38\u620F\u6570\u91CF\u3002")),s.kind==="achievement"&&s.period!=="all"&&j("\u6210\u5C31\u4F7F\u7528\u7D2F\u8BA1\u91CC\u7A0B\u7891\u89C4\u5219\u3002"),s.itemIds!==void 0&&(!Array.isArray(s.itemIds)||s.itemIds.length>5||s.itemIds.some(d=>!t.items[d]))&&j("\u5956\u52B1\u7269\u54C1\u65E0\u6548\u3002"));let l=t.definitions[s.id];if(l&&l.kind!==s.kind&&j("\u4E0D\u80FD\u6539\u53D8\u5DF2\u6709\u914D\u7F6E\u7684\u7C7B\u578B\u3002"),s.version=(l?.version||0)+1,l?.kind==="quest"&&(l.period!==s.period||s.period==="event"&&(l.startsAt!==s.startsAt||l.endsAt!==s.endsAt))&&j("\u5DF2\u6709\u4EFB\u52A1\u4E0D\u80FD\u66F4\u6539\u5468\u671F\u6216\u6D3B\u52A8\u65F6\u95F4\uFF1B\u8BF7\u521B\u5EFA\u65B0\u4EFB\u52A1\u3002"),s.kind==="settings")for(let d of Object.values(t.progress))d.level=1+Math.floor(Math.sqrt(d.xp/s.levelFactor));return t.definitions[s.id]=s,t.versions[s.id+":"+s.version]=structuredClone(s),s}}var Df={version:"7",dialect:"sqlite",entries:[{idx:0,version:"6",when:1792066289690,tag:"0000_sloppy_sasquatch",breakpoints:!0},{idx:1,version:"6",when:1792130898169,tag:"0001_little_calypso",breakpoints:!0},{idx:2,version:"6",when:1792133591879,tag:"0002_lyrical_hemingway",breakpoints:!0},{idx:3,version:"6",when:1792133787149,tag:"0003_tiny_vision",breakpoints:!0}]};var Ce=globalThis.CasinoMoney,Ta=globalThis.CasinoEngine,ui=(t,e=200,r={})=>new Response(Ce.stringify(t),{status:e,headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"private, no-store","X-Content-Type-Options":"nosniff",...r}}),Lf=async t=>{let e=new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(t)));return btoa(String.fromCharCode(...e)).replaceAll("+","-").replaceAll("/","_").replaceAll("=","")},d0=t=>t.headers.get("cookie")?.split(";").map(e=>e.trim()).find(e=>e.startsWith("__Host-club-admin="))?.slice(18)||"",_e=t=>t.headers.get("oai-authenticated-user-id")||j("\u8BF7\u5148\u767B\u5F55\u3002",401);function u0(t,e){let r=new Ta({getItem:()=>t,setItem(){}},void 0,()=>e,{recoverRoulette:!1});return r.storageWarning&&j("\u5B58\u6863\u6821\u9A8C\u5931\u8D25\uFF0C\u672A\u4FEE\u6539\u65E7\u6570\u636E\u3002",500),r.isolatedPlayer=!0,r}function jf(t){return{cash:t.balance,bank:t.debt,shark:t.sharkDebt,negative:t.recovery?.deficit||0,reserved:Ce.add(Ta.sumBets(t.bets),t.blackjack&&t.blackjack.phase!=="settled"?t.blackjack.hands.reduce((e,r)=>Ce.add(e,r.bet),0):0)}}function Hf(t,e,r,n,i,o,a,s=""){for(let l of r.users){let d=e.users.find(y=>y.id===l.id),p=d?jf(d):{cash:0,bank:0,shark:0,negative:0,reserved:0},m=jf(l);for(let y of Object.keys(m))(!d||Ce.compare(p[y],m[y])!==0)&&t.journal.push({id:n+":"+l.id+":"+y,playerId:l.id,operationId:n,actor:i,kind:o,asset:y,before:String(p[y]),after:String(m[y]),delta:String(Ce.sub(m[y],p[y])),createdAt:a,reason:s})}for(let l of e.users)r.users.some(d=>d.id===l.id)||j("\u4E0D\u80FD\u7269\u7406\u5220\u9664\u6709\u5386\u53F2\u7684\u73A9\u5BB6\u3002")}function Uf(t,e){for(let r of e.users){if(!t.profiles[r.id])continue;let n=r.recovery?0:r.balance,i=n<0,o=String(Ce.abs(n));t.wallets[r.id]={id:r.id,visible:t.profiles[r.id].walletVisible&&!t.profiles[r.id].archived?1:0,sign:n===0?0:i?-1:1,magnitude:o.length,digits:o,name:r.name}}}function $f({page:t="",applyCommand:e,legacyFactory:r,bootstrapOwnerPrivate:n=!1,clock:i=()=>Date.now(),origin:o,extensions:a={}}){async function s(g,b,E){if(!b||![401,403,429].includes(E))return;let P={id:crypto.randomUUID(),playerId:null,kind:E===429?"security.rate-limited":"security.denied",createdAt:i(),actor:g.headers.get("oai-authenticated-user-id")||"anonymous",path:new URL(g.url).pathname.slice(0,160),status:E};await b.prepare("INSERT INTO v2_events (id,player_id,kind,created_at,body) VALUES (?,NULL,?,?,?)").bind(P.id,P.kind,P.createdAt,Ce.stringify(P)).run()}async function l(g,b){let E=new URL(g.url).pathname,P=/\/api\/admin\/(register|authenticate)\//.test(E)?"passkey":g.method==="POST"?"write":"read",R=P==="passkey"?20:P==="write"?120:240;(await b.prepare("INSERT INTO v2_rate_limits (id,window,count) VALUES (?,?,1) ON CONFLICT(id) DO UPDATE SET window=excluded.window,count=CASE WHEN window=excluded.window THEN count+1 ELSE 1 END RETURNING count").bind(_e(g)+":"+P,Math.floor(i()/6e4)).first()).count>R&&j("\u8BF7\u6C42\u8FC7\u4E8E\u9891\u7E41\uFF0C\u8BF7\u4E00\u5206\u949F\u540E\u518D\u8BD5\u3002",429)}async function d(g,b,E,P){try{return await e(g,b,E,P)}catch(R){if(R.status)throw R;j(R.message||"\u6E38\u620F\u64CD\u4F5C\u65E0\u6548\u3002")}}async function p(g){let b=await g.prepare("SELECT snapshot,revision FROM casino_state WHERE id=?").bind("club").first();if(!b){let E=new Ta(null);await g.prepare("INSERT OR IGNORE INTO casino_state (id,snapshot,revision,last_op) VALUES (?,?,0,?)").bind("club",Ce.stringify(E.data),"initial").run(),b=await g.prepare("SELECT snapshot,revision FROM casino_state WHERE id=?").bind("club").first()}return b}async function m(g,b){let E=d0(g);if(!E)return!1;let P=await b.prepare("SELECT actor,expires_at FROM admin_sessions WHERE id=?").bind(await Lf(E)).first();return!!(P&&P.actor===_e(g)&&P.expires_at>i())}async function y(g,b){for(let E=0;E<8;E++){let P=i(),R={actor:_e(g),week:Qe(P).week},D=await p(b),W=await Ac(b,R),M=structuredClone(W);if(!M.meta){let pe=(await b.prepare("SELECT actor FROM admin_credential WHERE id=?").bind("owner").first())?.actor||(n?_e(g):null);pe||j("\u8BF7\u5148\u7531\u6240\u6709\u8005\u5B8C\u6210\u521D\u59CB\u5316\u3002",503),M=Cf(pe,P),M.accounts[pe]={id:pe,actor:pe,playerId:null,email:pe===_e(g)&&g.headers.get("oai-authenticated-user-email")||"",role:"owner",status:"active",createdAt:P},M.backups.push({id:"pre-v2:"+crypto.randomUUID(),createdAt:P,kind:"pre-v2",legacy:{snapshot:D.snapshot,revision:D.revision}})}let h=Ce.parseJSON(D.snapshot),w=h.users.filter(N=>!M.profiles[N.id]).slice(0,5);for(let N of w)bn(M,N.id,P),Hf(M,{users:[]},{users:[N]},"opening:"+N.id,"system","opening",P);if(M.accounts[_e(g)]||(M.accounts[_e(g)]={id:_e(g),actor:_e(g),playerId:null,email:g.headers.get("oai-authenticated-user-email")||"",role:"member",status:"pending",createdAt:P}),Uf(M,h),M.meta.ready=h.users.every(N=>M.profiles[N.id]),!ka(b,W,M,"initializing").length)return{p:W,row:D};let H=crypto.randomUUID(),I=ka(b,W,M,H);if((await b.batch([b.prepare("UPDATE casino_state SET revision=revision+1,last_op=? WHERE id=? AND revision=?").bind(H,"club",D.revision),...I]))[0].meta.changes)return D.revision++,M.meta.ready||j("\u6B63\u5728\u5B89\u5168\u5BFC\u5165\u65E7\u73A9\u5BB6\uFF0C\u8BF7\u7A0D\u540E\u5237\u65B0\u7EE7\u7EED\u3002",503),{p:await Ac(b,R),row:D}}j("\u521D\u59CB\u5316\u6B63\u5FD9\uFF0C\u8BF7\u91CD\u8BD5\u3002",409)}async function A(g,b,E,P,R="formal"){let D=E.accounts[_e(g)];D?.status==="suspended"&&j("\u8D26\u53F7\u5DF2\u505C\u7528\u3002",403);let W=await m(g,b),M=Ce.parseJSON(P.snapshot),h=M.users.filter(B=>!E.profiles[B.id]?.archived&&Object.values(E.accounts).some(N=>N.playerId===B.id&&N.status==="active")).map(B=>vo(B,E)),w={role:D?.role||"member",admin:W&&["owner","admin"].includes(D?.role),actor:_e(g),enrolled:!!await b.prepare("SELECT id FROM admin_credential WHERE id=?").bind(D?.role==="owner"?"owner":"admin:"+_e(g)).first(),canEnroll:["owner","admin"].includes(D?.role)};w.canEnroll=w.canEnroll&&!w.enrolled;let v=kf(M,E,D),H=D.playerId?E.progress[D.playerId]:null;R==="sandbox"&&(ci(E,_e(g),null,!0,W),v=E.sandbox[_e(g)]?.data||T(),H=null),D.playerId&&R==="formal"&&(v.ledger=(await Ur(b,"v2_journal","WHERE player_id=?",[D.playerId],100)).map(B=>({time:new Date(B.createdAt).toISOString(),text:`${B.kind} \xB7 ${B.asset}: ${B.before} \u2192 ${B.after}${B.reason?" \xB7 "+B.reason:""}`})));let I={protocol:2,mode:R,account:{role:D.role,status:D.status,playerId:D.playerId},maintenance:E.meta.maintenance,startedAt:E.meta.startedAt,profile:D.playerId?E.profiles[D.playerId]:null,progress:H,definitions:Object.values(E.definitions),items:Object.values(E.items),inventory:Object.values(E.inventory).filter(B=>B.playerId===D.playerId),quests:D.playerId?xd(E,D.playerId,i()):[],periods:Qe(i()),club:a.clubView?.(E,D.playerId,i())||null};return{data:v,directory:h,revision:P.revision,now:i(),auth:w,platform:I}}function T(){let g=new Ta(null);return g.data.users=[g.data.users[0]],g.data.activeId=g.active.id,g.active.name="Sandbox",g.active.balance=1e5,g.data}async function k(g,b,E){(!E||typeof E!="object"||Array.isArray(E))&&j("\u8BF7\u6C42\u683C\u5F0F\u65E0\u6548\u3002");let{id:P,command:R,args:D=[],playerId:W,mode:M="formal"}=E;g.headers.get("X-Club-Protocol")!=="2"&&j("\u7AD9\u70B9\u5DF2\u5347\u7EA7\uFF0C\u8BF7\u5237\u65B0\u9875\u9762\u3002",409),(typeof P!="string"||P.length<16||P.length>80||typeof R!="string"||!Array.isArray(D)||D.length>5||!["formal","sandbox"].includes(M))&&j("\u64CD\u4F5C\u53C2\u6570\u65E0\u6548\u3002");let h=await Lf(Ce.stringify({operation:R,args:D,playerId:W,mode:M}));for(let w=0;w<12;w++){let{p:v,row:H}=await y(g,b),I=structuredClone(v),B=i(),N=await m(g,b),pe=Ad(R)||M==="sandbox",fe=ci(I,_e(g),W,pe,N);I.meta.maintenance&&R!=="admin.maintenance"&&R!=="admin.bind"&&j("\u7EF4\u62A4\u671F\u95F4\u6682\u505C\u72B6\u6001\u4FEE\u6539\u3002",503),M==="formal"&&!pe&&!fe.playerId&&j("\u8BF7\u5148\u7ED1\u5B9A\u81EA\u5DF1\u7684\u73A9\u5BB6\u3002",403);let ie=await b.prepare("SELECT actor,payload,response FROM casino_operations WHERE id=?").bind(P).first();if(ie)return(ie.actor!==_e(g)||ie.payload!==h)&&j("\u64CD\u4F5C\u7F16\u53F7\u5DF2\u88AB\u4F7F\u7528\u3002",409),ui({...await A(g,b,I,H,M),result:Ce.parseJSON(ie.response).result});let Ae=Ce.parseJSON(H.snapshot),le=u0(M==="sandbox"?Ce.stringify(I.sandbox[_e(g)]?.data||T()):H.snapshot,B);M==="formal"&&fe.playerId&&(le.data.activeId=fe.playerId);let de;if(M==="sandbox")["slots","lottery","plinko","dice","blackjack","roulette.bet","roulette.clear","roulette.rebet","roulette.spin","roulette.rig","sandbox.reset"].includes(R)||j("\u6C99\u76D2\u53EA\u652F\u6301\u6E38\u620F\u548C\u91CD\u7F6E\uFF0C\u4E0D\u80FD\u64CD\u4F5C\u6B63\u5F0F\u8D44\u4EA7\u3002",403),R==="sandbox.reset"?(le.active.balance=D.length?le.amount(D[0]):1e5,le.active.blackjack=null,le.active.bets=Ta.emptyBets(),le.lock=null,de=null):de=await d(le,R,D,!0),I.sandbox[_e(g)]={id:_e(g),data:le.data};else{if((R==="roulette.rig"||R==="blackjack"&&D[0]==="forceJackpot"||D.some(ge=>ge&&typeof ge=="object"&&ge.jackpot)||R==="roulette.spin"&&D[0])&&j("\u7279\u6B8A\u5F00\u5956\u4EC5\u9650\u7BA1\u7406\u5458\u6C99\u76D2\u3002",403),["gift","offerLoan"].includes(R)&&!Object.values(I.accounts).some(ge=>ge.status==="active"&&ge.playerId===D[0])&&j("\u76EE\u6807\u73A9\u5BB6\u5C1A\u672A\u7ED1\u5B9A\u6709\u6548\u6210\u5458\u3002"),R==="adminAdjust"&&(typeof D[3]!="string"||D[3].trim().length<3)&&j("\u4F59\u989D\u8C03\u6574\u5FC5\u987B\u586B\u5199\u81F3\u5C11\u4E09\u4E2A\u5B57\u7B26\u7684\u539F\u56E0\u3002"),R==="admin.compensate"){let ge=await b.prepare("SELECT body FROM v2_journal WHERE id=?").bind(D[0]).first();(!ge||typeof D[1]!="string"||D[1].trim().length<3)&&j("\u8BF7\u9009\u62E9\u539F\u8C03\u6574\u6D41\u6C34\u5E76\u586B\u5199\u539F\u56E0\u3002");let Me=Ce.parseJSON(ge.body);(Me.kind!=="adminAdjust"||Me.asset!=="cash")&&j("\u53EA\u80FD\u8865\u507F\u7BA1\u7406\u5458\u94B1\u5305\u8C03\u6574\u3002");let yt=Me.playerId+":compensation:"+Me.id;(I.claims[yt]||await b.prepare("SELECT id FROM v2_claims WHERE id=?").bind(yt).first())&&j("\u8BE5\u8C03\u6574\u5DF2\u7ECF\u8865\u507F\u3002",409);let nt=Ce.sub(Ce.parse(Me.before),Ce.parse(Me.after));nt===0&&j("\u8BE5\u8BB0\u5F55\u6CA1\u6709\u91D1\u989D\u53D8\u5316\u3002"),await d(le,"adminAdjust",[Me.playerId,nt>0?"add":"remove",Ce.abs(nt),D[1]],!0),I.claims[yt]={id:yt,playerId:Me.playerId,kind:"compensation",createdAt:B,source:Me.id,reason:D[1]},de={source:Me.id}}else if(R==="deletePlayer"){let ge=le.data.users.find(Ue=>Ue.id===D[0]);(!ge||I.profiles[ge.id]?.archived)&&j("\u73A9\u5BB6\u4E0D\u5B58\u5728\u6216\u5DF2\u5F52\u6863\u3002"),Object.values(I.accounts).some(Ue=>Ue.playerId===ge.id&&Ue.role==="owner")&&j("\u4E0D\u80FD\u5F52\u6863\u6240\u6709\u8005\u7684\u73A9\u5BB6\u3002");let Me=I.clubs[I.memberships[ge.id]?.clubId];Me?.ownerId===ge.id&&Object.values(I.memberships).some(Ue=>Ue.clubId===Me.id&&Ue.id!==ge.id)&&j("\u8BF7\u5148\u8F6C\u79FB\u4FF1\u4E50\u90E8\u6240\u6709\u6743\uFF0C\u518D\u5F52\u6863\u8BE5\u73A9\u5BB6\u3002");let yt=structuredClone(le.data);await d(le,"deletePlayer",[ge.id],!0),le.data=yt,Me?.ownerId===ge.id?a.action?.(I,le,fe,"admin.club",[Me.id,"Player archived"],B):delete I.memberships[ge.id];for(let Ue of Object.values(I.invitations))Ue.status==="pending"&&(Ue.targetId===ge.id||Ue.inviterId===ge.id)&&(Ue.status="revoked");let nt=le.data.users.find(Ue=>Ue.id===ge.id);nt.balance=0,I.profiles[ge.id].archived=!0;for(let Ue of Object.values(I.accounts))Ue.playerId===ge.id&&(Ue.status="suspended");de=null}else R==="import"?j("V2 \u5DF2\u542F\u7528\uFF1B\u65E7\u5B58\u6863\u4E0D\u80FD\u8986\u76D6\u73B0\u6709\u6570\u636E\u5E93\u3002",409):(de=R==="system.sync"?null:Nf(I,le,fe,R,D,B),de===void 0&&a.action&&(de=a.action(I,le,fe,R,D,B)),de===void 0&&(de=await d(le,R,D,pe&&N)));for(let ge of le.data.users)I.profiles[ge.id]||bn(I,ge.id,B);let se=R==="blackjack"?le.active.blackjack:null,Ye=["slots","lottery","plinko","dice","roulette.spin"].includes(R)?de?.roundId||de?.id||P:se?.phase==="settled"&&!(Ae.users.find(ge=>ge.id===fe.playerId)?.blackjack?.id===se.id&&Ae.users.find(ge=>ge.id===fe.playerId)?.blackjack?.phase==="settled")?se.id:null;Ye&&(await b.prepare("SELECT id FROM v2_claims WHERE id=?").bind(fe.playerId+":round:"+Ye).first()&&j("\u8BE5\u5BF9\u5C40\u5DF2\u7ECF\u7ED3\u7B97\u3002",409),If(I,fe.playerId,R==="blackjack"?"blackjack":R==="roulette.spin"?"roulette":R,Ye,B,R==="blackjack"?se.result:de)),Hf(I,Ae,le.data,P,_e(g),R,B,R==="adminAdjust"?D[3]:Ad(R)?String(D.at(-1)||""):""),Uf(I,le.data)}I.events.push({id:"command:"+P,playerId:fe.playerId||null,kind:M==="sandbox"?"sandbox.command":R,createdAt:B,actor:_e(g)});let Z=M==="sandbox"?H.snapshot:Ce.stringify(le.data),bt=Ce.stringify({result:de??null});if((await b.batch([b.prepare("UPDATE casino_state SET snapshot=?,revision=revision+1,last_op=? WHERE id=? AND revision=?").bind(Z,P,"club",H.revision),...ka(b,v,I,P),b.prepare("INSERT INTO casino_operations (id,actor,payload,response,created_at) SELECT ?,?,?,?,? WHERE EXISTS (SELECT 1 FROM casino_state WHERE id='club' AND last_op=?)").bind(P,_e(g),h,bt,B,P)]))[0].meta.changes)return ui({...await A(g,b,I,{snapshot:Z,revision:H.revision+1},M),result:de??null})}j("\u8D26\u6237\u66F4\u65B0\u6B63\u5FD9\uFF0C\u8BF7\u91CD\u8BD5\u3002",409)}async function O(g,b){let{p:E,row:P}=await y(g,b),R=new URL(g.url),D=R.searchParams.get("mode")||"formal";if(R.pathname==="/api/state"||R.pathname==="/api/me"){let W=Ce.parseJSON(P.snapshot),M=i(),h=E.accounts[_e(g)],w=W.users.some(v=>v.debt>0&&(v.bankInterestAt===null||M-v.bankInterestAt>=6e5||v.bankInterestPolicy!==2)||v.sharkDebt>0&&(v.sharkInterestAt===null||M-v.sharkInterestAt>=18e4||v.sharkInterestPolicy!==2))||W.loans.some(v=>v.status==="active"&&M-v.interestAt>=v.periodMs);if(D==="formal"&&!E.meta.maintenance&&h?.status==="active"&&h.playerId&&w){let v=new Headers(g.headers);return v.set("X-Club-Protocol","2"),k(new Request(g,{headers:v}),b,{id:crypto.randomUUID(),command:"system.sync",args:[],playerId:h.playerId})}return ui(await A(g,b,E,P,D))}if(R.pathname.startsWith("/api/admin/")){let W=ci(E,_e(g),null,!0,await m(g,b));if(R.pathname==="/api/admin/overview")return ui({accounts:Object.values(E.accounts),players:Ce.parseJSON(P.snapshot).users,definitions:Object.values(E.definitions),items:Object.values(E.items),clubs:Object.values(E.clubs),maintenance:E.meta.maintenance,events:await Ur(b,"v2_events","",[],100),journal:await Ur(b,"v2_journal","",[],100),health:{version:2,revision:P.revision,ready:E.meta.ready}});if(R.pathname==="/api/admin/backup"){(W.role!=="owner"||!E.meta.maintenance)&&j("\u8BF7\u7531\u6240\u6709\u8005\u5148\u5F00\u542F\u53EA\u8BFB\u7EF4\u62A4\uFF0C\u518D\u5BFC\u51FA\u5907\u4EFD\u3002",409);let M=["casino_state","casino_operations","admin_credential","v2_meta",...Object.values((await Promise.resolve().then(()=>(Sa(),Sf))).collections).map(([v])=>v),"v2_events","v2_journal","v2_backups"],h={},w=await b.batch(M.map(v=>b.prepare(`SELECT * FROM ${v}`)));return M.forEach((v,H)=>h[v]=w[H].results),Ce.parseJSON(h.v2_meta.find(v=>v.id==="platform").body).maintenance||j("\u7EF4\u62A4\u72B6\u6001\u5DF2\u7ECF\u6539\u53D8\uFF0C\u8BF7\u91CD\u65B0\u5F00\u542F\u7EF4\u62A4\u540E\u5907\u4EFD\u3002",409),ui({format:2,createdAt:i(),migrations:Df.entries.map(v=>v.tag),records:h})}}if(a.read){let W=await a.read(g,b,E,P,await m(g,b),i());if(W!==void 0)return ui(W)}j("\u63A5\u53E3\u4E0D\u5B58\u5728\u3002",404)}return{async fetch(g,b){try{let E=_e(g),P=new URL(g.url);if(b.DB||j("\u6570\u636E\u5E93\u672A\u8FDE\u63A5\u3002",503),await l(g,b.DB),P.pathname.startsWith("/api/admin/register/")||P.pathname.startsWith("/api/admin/authenticate/")||["/api/admin/status","/api/admin/logout"].includes(P.pathname)){let{p:h}=await y(g,b.DB),w=h.accounts[E];(!["owner","admin"].includes(w?.role)||w.status!=="active")&&j("\u6CA1\u6709\u7BA1\u7406\u5458\u6743\u9650\u3002",403);let v=await r({credentialKey:w.role==="owner"?"owner":"admin:"+E}).fetch(g,b);return await s(g,b.DB,v.status),v}if(g.method==="POST"){(g.headers.get("origin")!==o||!g.headers.get("content-type")?.startsWith("application/json"))&&j("\u8BF7\u6C42\u6765\u6E90\u65E0\u6548\u3002",403);let h=await g.text();h.length>1e6&&j("\u8BF7\u6C42\u8FC7\u5927\u3002",413);let w;try{w=Ce.parseJSON(h)}catch{j("\u8BF7\u6C42\u5185\u5BB9\u65E0\u6548\u3002")}if(P.pathname==="/api/command")return await k(g,b.DB,w);j("\u63A5\u53E3\u4E0D\u5B58\u5728\u3002",404)}if(g.method!=="GET"&&j("\u8BF7\u6C42\u65B9\u5F0F\u4E0D\u652F\u6301\u3002",405),P.pathname.startsWith("/api/"))return await O(g,b.DB);if(!["/","/player","/admin","/index.html"].includes(P.pathname))return new Response("Not found",{status:404});let{p:R,row:D}=await y(g,b.DB),W=await A(g,b.DB,R,D),M=Ce.stringify(W).replaceAll("<","\\u003c");return new Response(t.replace("/* SERVER_BOOTSTRAP */",`window.__CASINO_BOOTSTRAP__=${M};`),{headers:{"Content-Type":"text/html;charset=utf-8","Cache-Control":"private, no-store","X-Frame-Options":"SAMEORIGIN","X-Content-Type-Options":"nosniff","Permissions-Policy":"publickey-credentials-create=(self), publickey-credentials-get=(self)"}})}catch(E){return await s(g,b.DB,E.status||500).catch(()=>{}),ui({error:E.status?E.message:"\u64CD\u4F5C\u672A\u5B8C\u6210\uFF0C\u8BF7\u5237\u65B0\u91CD\u8BD5\u3002"},E.status||500)}}}}var m$=yo(li(),1);(function(t){"use strict";!t.CasinoMoney&&typeof gn=="function"&&li();let e=t.CasinoMoney,r=1e7,n=Object.freeze([1e3,1e4,1e6]),i=Object.freeze([{weight:500,numerator:200,name:"\u7279\u7B49\u5956"},{weight:2e3,numerator:100,name:"\u4E00\u7B49\u5956"},{weight:3e4,numerator:20,name:"\u4E8C\u7B49\u5956"},{weight:6e4,numerator:16,name:"\u4E09\u7B49\u5956"},{weight:12e4,numerator:10,name:"\u56DB\u7B49\u5956"},{weight:25e4,numerator:8,name:"\u4E94\u7B49\u5956"},{weight:35e4,numerator:5,name:"\u516D\u7B49\u5956"},{weight:45e4,numerator:4,name:"\u4E03\u7B49\u5956"},{weight:75e4,numerator:3,name:"\u516B\u7B49\u5956"},{weight:2e6,numerator:2,name:"\u4FDD\u672C\u672B\u7B49\u5956"},{weight:5987500,numerator:0,name:"\u672A\u4E2D\u5956"}].map(Object.freeze));function o(m){let y=e.positive(m);if(!n.includes(y))throw new Error("\u5F69\u7968\u7968\u4EF7\u53EA\u80FD\u9009\u62E9 1,000\u300110,000 \u6216 1,000,000 \u7B79\u7801\u3002");return y}function a(m,y){let A=o(m);if(!Number.isInteger(y)||y<0||y>=r)throw new Error("\u5F69\u7968\u5F00\u5956\u7ED3\u679C\u65E0\u6548\u3002");let T=0,k=i.findIndex(b=>y<(T+=b.weight)),O=i[k],g=e.ratio(A,O.numerator,2);return{game:"lottery",ticket:y,tier:k,wager:A,multiplier:O.numerator/2,payout:g,net:e.sub(g,A)}}function s(m){let A=Math.floor(4294967296/r)*r;for(let T=0;T<64;T++){let k=m();if(typeof k!="number"||!(k>=0&&k<1))throw new Error("\u65E0\u6CD5\u751F\u6210\u6709\u6548\u5F69\u7968\uFF0C\u8BF7\u91CD\u8BD5\u3002");let O=Math.floor(k*4294967296);if(O<A)return O%r}throw new Error("\u65E0\u6CD5\u751F\u6210\u6709\u6548\u5F69\u7968\uFF0C\u8BF7\u91CD\u8BD5\u3002")}function l(m,y,A=!1){let T=o(m);return a(T,A?0:s(y))}function d(m){try{if(!m||m.game!=="lottery"||typeof m.id!="string"||typeof m.time!="string")return!1;let y=a(m.wager,m.ticket);return["tier","multiplier","payout","net"].every(A=>m[A]===y[A])}catch{return!1}}let p=i.reduce((m,y)=>m+y.weight*y.numerator,0);t.CasinoLottery={prices:n,tiers:i,total:r,expectedNumerator:p,price:o,fromTicket:a,drawTicket:s,draw:l,validHistory:d}})(globalThis);(function(t){"use strict";!t.CasinoMoney&&typeof gn=="function"&&li();let e=t.CasinoMoney,r=12,n=Object.freeze({low:Object.freeze([800,400,200,140,110,70,40,70,110,140,200,400,800]),medium:Object.freeze([2500,800,300,150,100,60,20,60,100,150,300,800,2500]),high:Object.freeze([1e4,1500,400,200,60,20,0,20,60,200,400,1500,1e4])}),i=Object.freeze({left:.44,center:.5,right:.56}),o=Object.freeze({4:61,5:31,6:19,7:13,8:9,9:7,10:7,11:7,12:7,13:9,14:13,15:19,16:31,17:61}),a=b=>e.positive(b),s=b=>{let E=b();if(!(E>=0&&E<1))throw new Error("\u65E0\u6CD5\u751F\u6210\u6709\u6548\u7ED3\u679C\uFF0C\u8BF7\u91CD\u8BD5\u3002");return E};function l(b,E){if(!Object.hasOwn(n,b)||!Object.hasOwn(i,E))throw new Error("\u8BF7\u9009\u62E9\u6709\u6548\u7684\u98CE\u9669\u548C\u843D\u7403\u53E3\u3002");return{table:n[b],rightChance:i[E]}}function d(b,E,P,R){b=a(b);let{table:D}=l(E,P);if(!Array.isArray(R)||R.length!==r||!R.every(w=>w===0||w===1))throw new Error("\u5F39\u73E0\u8DEF\u5F84\u65E0\u6548\u3002");let W=R.reduce((w,v)=>w+v,0),M=D[W]/100,h=e.ratio(b,D[W],100);return{game:"plinko",wager:b,risk:E,lane:P,path:[...R],pocket:W,multiplier:M,payout:h,net:e.sub(h,b)}}function p(b,E,P,R,D=!1){let{rightChance:W}=l(E,P);a(b);let M=Array.from({length:r},()=>D?P==="right"?1:0:+(s(R)<W));return d(b,E,P,M)}function m(b,E){if(!Number.isInteger(b)||b<0||b>r||!Object.hasOwn(i,E))throw new Error("\u69FD\u4F4D\u65E0\u6548\u3002");let P=1;for(let R=1;R<=b;R++)P=P*(r-R+1)/R;return P*i[E]**b*(1-i[E])**(r-b)}function y(b,E){d(1,"low",E,b);let P=0,R=[{x:{left:-1.8,center:0,right:1.8}[E],y:6.3},{x:0,y:5.22}];for(let D=1;D<=r;D++)P+=b[D-1],R.push({x:(P-D/2)*.82,y:5.22-D*.72});return R.push({x:(P-6)*.82,y:-4.05}),R}function A(b,E){if(!["small","big","odd","even","triple","sum"].includes(b))throw new Error("\u8BF7\u9009\u62E9\u6709\u6548\u7684\u9AB0\u5B9D\u4E0B\u6CE8\u3002");if(b==="sum"&&(!Number.isInteger(E)||!Object.hasOwn(o,E)))throw new Error("\u6307\u5B9A\u603B\u70B9\u6570\u9700\u4E3A 4\u201317\u3002");return b==="sum"?o[E]:b==="triple"?31:2}function T(b,E,P,R){b=a(b);let D=A(E,P);if(!Array.isArray(R)||R.length!==3||!R.every(H=>Number.isInteger(H)&&H>=1&&H<=6))throw new Error("\u9AB0\u5B50\u7ED3\u679C\u65E0\u6548\u3002");let W=R.reduce((H,I)=>H+I,0),M=R.every(H=>H===R[0]),w=(E==="triple"?M:E==="sum"?W===P:!M&&(E==="small"?W>=4&&W<=10:E==="big"?W>=11&&W<=17:E==="odd"?W%2===1:W%2===0))?D:0,v=e.mul(b,w);return{game:"dice",wager:b,kind:E,target:E==="sum"?P:null,dice:[...R],total:W,triple:M,multiplier:w,payout:v,net:e.sub(v,b)}}function k(b,E,P,R,D=!1){A(E,P),a(b);let W;if(D){e:for(let M=1;M<=6;M++)for(let h=1;h<=6;h++)for(let w=1;w<=6;w++)if(T(b,E,P,[M,h,w]).payout>0){W=[M,h,w];break e}}else W=Array.from({length:3},()=>1+Math.floor(s(R)*6));return T(b,E,P,W)}function O(b){let E={1:{x:0,z:Math.PI/2},2:{x:0,z:0},3:{x:-Math.PI/2,z:0},4:{x:Math.PI/2,z:0},5:{x:0,z:Math.PI},6:{x:0,z:-Math.PI/2}};if(!Object.hasOwn(E,b))throw new Error("\u9AB0\u5B50\u70B9\u6570\u65E0\u6548\u3002");return E[b]}function g(b){try{if(!b||typeof b.id!="string"||typeof b.time!="string")return!1;let E=b.game==="plinko"?d(b.wager,b.risk,b.lane,b.path):b.game==="dice"?T(b.wager,b.kind,b.target,b.dice):null;return!!(E&&b.payout===E.payout&&b.net===E.net&&b.multiplier===E.multiplier&&(b.game!=="dice"||b.total===E.total))}catch{return!1}}t.CasinoArcade={rows:r,tables:n,lanes:i,sumReturns:o,plinkoSettings:l,plinkoResult:d,plinko:p,pocketProbability:m,pathPoints:y,diceSettings:A,diceResult:T,dice:k,diceRotation:O,validHistory:g}})(globalThis);(function(t){"use strict";!t.CasinoMoney&&typeof gn=="function"&&li();let e=t.CasinoMoney,r=l=>Math.min(l.rank,10),n=l=>l&&Number.isInteger(l.rank)&&l.rank>=1&&l.rank<=13&&Number.isInteger(l.suit)&&l.suit>=0&&l.suit<=3;function i(l){let d=0,p=0;for(let m of l)d+=m.rank===1?11:r(m),m.rank===1&&p++;for(;d>21&&p>0;)d-=10,p--;return{total:d,soft:p>0,blackjack:l.length===2&&d===21,bust:d>21}}function o(l){let d=[];for(let p=0;p<6;p++)for(let m=0;m<4;m++)for(let y=1;y<=13;y++)d.push({rank:y,suit:m});for(let p=d.length-1;p>0;p--){let m=l();if(!(m>=0&&m<1))throw new Error("The shoe could not be shuffled. Try again.");let y=Math.floor(m*(p+1));[d[p],d[y]]=[d[y],d[p]]}return d}function a(l,d){if(!l||l.version!==1||l.ownerId!==d||!["player","dealer","settled"].includes(l.phase)||typeof l.id!="string"||!Array.isArray(l.shoe)||l.shoe.length>312||!l.shoe.every(n)||!Array.isArray(l.dealer)||l.dealer.length<2||l.dealer.length>32||!l.dealer.every(n)||!Array.isArray(l.hands)||l.hands.length<1||l.hands.length>2||!Number.isInteger(l.activeHand)||l.activeHand<0||l.activeHand>l.hands.length||!l.hands.every(m=>Array.isArray(m.cards)&&m.cards.length>=2&&m.cards.length<=32&&m.cards.every(n)&&e.valid(m.bet)&&m.bet>=1&&typeof m.split=="boolean"&&["playing","stood","bust"].includes(m.status))||l.phase==="player"&&l.hands[l.activeHand]?.status!=="playing")return!1;let p=new Map;for(let m of[...l.shoe,...l.dealer,...l.hands.flatMap(y=>y.cards)]){let y=m.rank+":"+m.suit;if(p.set(y,(p.get(y)||0)+1),p.get(y)>6)return!1}return!(l.phase==="settled"&&(!l.result||!e.valid(l.result.payout)||l.result.payout<0||!e.valid(l.result.wager)||!Array.isArray(l.result.hands)||l.result.hands.length!==l.hands.length||!l.result.hands.every(m=>m&&typeof m.label=="string"&&e.valid(m.payout)&&m.payout>=0)||!e.valid(l.result.net)))}class s{constructor(d,p={}){this.engine=d,this.shoeFactory=p.shoeFactory||(()=>o(()=>d.random()));let m=d.isolatedPlayer?[d.active]:d.data.users;for(let A of m)A.blackjack&&!a(A.blackjack,A.id)&&(A.blackjack=null,d.storageWarning="An unreadable saved blackjack hand was cleared. Your wallet and bank records were kept.");let y=m.find(A=>A.blackjack&&A.blackjack.phase!=="settled");y&&(d.data.activeId=y.id,d.lock="blackjack")}get round(){return this.engine.active.blackjack||null}get pending(){return!!(this.round&&this.round.phase!=="settled")}available(){let d=this.round,p=d?.hands[d.activeHand],m=!!(d&&d.phase==="player"&&p?.status==="playing"&&this.engine.lock==="blackjack");return{hit:m,stand:m,double:m&&p.cards.length===2&&this.engine.active.balance>=p.bet,split:m&&d.hands.length===1&&p.cards.length===2&&r(p.cards[0])===r(p.cards[1])&&this.engine.active.balance>=p.bet}}_playing(d){if(!this.available()[d])throw new Error(d==="double"||d==="split"?"That move needs an eligible two-card hand and enough chips.":"Wait until it is your turn.");return this.round}_draw(d){if(!d.shoe.length)throw new Error("The shoe is empty.");return d.shoe.pop()}_save(){this.engine.save()}start(d,{jackpot:p=!1}={}){this.engine.ensureIdle();let m=this.engine.amount(d),y=this.engine.active;if(m>y.balance)throw new Error("Not enough chips. Lower your bet or visit the bank.");let A=this.round,T=p?o(()=>.5):A&&A.shoe.length>=52?[...A.shoe]:this.shoeFactory();if(!Array.isArray(T)||T.length<4||!T.every(n))throw new Error("The shoe could not be prepared.");if(p){let O=[1,10,13,9].map(g=>T.splice(T.findIndex(b=>b.rank===g),1)[0]);T.push(...O.reverse())}let k={version:1,id:t.crypto.randomUUID(),ownerId:y.id,phase:"player",shoe:T,dealer:[],hands:[{cards:[],bet:m,split:!1,status:"playing"}],activeHand:0,result:null};return k.hands[0].cards.push(this._draw(k)),k.dealer.push(this._draw(k)),k.hands[0].cards.push(this._draw(k)),k.dealer.push(this._draw(k)),y.balance=e.sub(y.balance,m),y.blackjack=k,this.engine.lock="blackjack",i(k.hands[0].cards).blackjack||i(k.dealer).blackjack?this._settle():this._save(),k}_advance(){let d=this.round,p=d.hands.findIndex((m,y)=>y>=d.activeHand&&m.status==="playing");p===-1?(d.activeHand=d.hands.length,d.phase="dealer"):d.activeHand=p}hit(){let d=this._playing("hit"),p=d.hands[d.activeHand];p.cards.push(this._draw(d));let m=i(p.cards);return m.total>=21&&(p.status=m.bust?"bust":"stood",this._advance()),this._save(),d}stand(){let d=this._playing("stand");return d.hands[d.activeHand].status="stood",this._advance(),this._save(),d}double(){let d=this._playing("double"),p=d.hands[d.activeHand],m=this._draw(d);return this.engine.active.balance=e.sub(this.engine.active.balance,p.bet),p.bet=e.mul(p.bet,2),p.cards.push(m),p.status=i(p.cards).bust?"bust":"stood",this._advance(),this._save(),d}split(){let d=this._playing("split"),p=d.hands[0];if(d.shoe.length<2)throw new Error("The shoe does not have enough cards to split.");let m={cards:[p.cards.pop()],bet:p.bet,split:!0,status:"playing"};p.split=!0,this.engine.active.balance=e.sub(this.engine.active.balance,p.bet),p.cards.push(this._draw(d)),m.cards.push(this._draw(d)),d.hands.push(m);let y=p.cards[0].rank===1;for(let A of d.hands)(y||i(A.cards).total===21)&&(A.status="stood");return this._advance(),this._save(),d}dealerStep(){let d=this.round;if(!d||d.phase!=="dealer"||this.engine.lock!=="blackjack")throw new Error("The dealer is not playing.");return d.hands.every(p=>i(p.cards).bust)||i(d.dealer).total>=17?this._settle():(d.dealer.push(this._draw(d)),i(d.dealer).total>=17?this._settle():(this._save(),d))}forceJackpot(d){if(!this.pending)return this.start(d,{jackpot:!0});let p=this.round;if(this.engine.lock!=="blackjack")throw new Error("Wait for the current game to finish.");p.shoe=o(()=>.5);let m=y=>p.shoe.splice(p.shoe.findIndex(A=>A.rank===y),1)[0];p.dealer=[m(10),m(9)];for(let y of p.hands)y.cards=y.cards.length===2?[m(1),m(13)]:[m(1),m(5),m(5)],y.status="stood";return p.activeHand=p.hands.length,this._settle()}_settle(){let d=this.round;if(d.phase==="settled")return d;let p=i(d.dealer),m=d.hands.map(T=>{let k=i(T.cards),O=!T.split&&k.blackjack,g=0,b="Dealer wins";return k.bust?b="Bust":p.blackjack?O&&(g=1,b="Push"):O?(g=2.5,b="Blackjack \xB7 3:2"):p.bust||k.total>p.total?(g=2,b=p.bust?"Dealer busts \xB7 You win":"You win"):k.total===p.total&&(g=1,b="Push"),{label:b,total:k.total,bet:T.bet,payout:e.ratio(T.bet,g*2,2)}}),y=d.hands.reduce((T,k)=>e.add(T,k.bet),0),A=m.reduce((T,k)=>e.add(T,k.payout),0);return d.result={hands:m,wager:y,payout:A,net:e.sub(A,y),dealer:p.total},d.phase="settled",this.engine.active.balance=e.add(this.engine.active.balance,A),this.engine.lock=null,this.engine.record(`${this.engine.active.name} \xB7 Blackjack: wager ${y.toLocaleString()}, payout ${A.toLocaleString()} (${m.map(T=>T.label).join(" / ")}).`),this.engine.completeRound(d.result.net),this._save(),d}}s.score=i,s.makeShoe=o,t.CasinoBlackjack=s})(globalThis);var ce={};Dt(ce,{fromBuffer:()=>b0,fromUTF8String:()=>v0,isBase64:()=>x0,isBase64URL:()=>A0,toBase64:()=>y0,toBuffer:()=>g0,toUTF8String:()=>w0,trimPadding:()=>Wf});var Ed="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Gf="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",Vf=t=>{let e=typeof Uint8Array>"u"?[]:new Uint8Array(256),r=Ed.length;for(let n=0;n<r;n++)e[t.charCodeAt(n)]=n;return e},p0=Vf(Ed),f0=Vf(Gf),m0=/^[-A-Za-z0-9\-_]*$/,h0=/^[-A-Za-z0-9+/]*={0,3}$/,mr={};mr.toArrayBuffer=(t,e)=>{let r=t.length,n=t.length*.75,i,o=0,a,s,l,d;t[t.length-1]==="="&&(n--,t[t.length-2]==="="&&n--);let p=new ArrayBuffer(n),m=new Uint8Array(p),y=e?f0:p0;for(i=0;i<r;i+=4)a=y[t.charCodeAt(i)],s=y[t.charCodeAt(i+1)],l=y[t.charCodeAt(i+2)],d=y[t.charCodeAt(i+3)],m[o++]=a<<2|s>>4,m[o++]=(s&15)<<4|l>>2,m[o++]=(l&3)<<6|d&63;return p};mr.fromArrayBuffer=(t,e)=>{let r=new Uint8Array(t),n,i="",o=r.length,a=e?Gf:Ed;for(n=0;n<o;n+=3)i+=a[r[n]>>2],i+=a[(r[n]&3)<<4|r[n+1]>>4],i+=a[(r[n+1]&15)<<2|r[n+2]>>6],i+=a[r[n+2]&63];let s=o%3;return s===2?i=i.substring(0,i.length-1)+(e?"":"="):s===1&&(i=i.substring(0,i.length-2)+(e?"":"==")),i};mr.toString=(t,e)=>new TextDecoder().decode(mr.toArrayBuffer(t,e));mr.fromString=(t,e)=>mr.fromArrayBuffer(new TextEncoder().encode(t),e);mr.validate=(t,e)=>{if(!(typeof t=="string"||t instanceof String))return!1;try{return e?m0.test(t):h0.test(t)}catch{return!1}};mr.base64=mr;var Gr=mr;function g0(t,e="base64url"){let r=Gr.toArrayBuffer(t,e==="base64url");return new Uint8Array(r)}function b0(t,e="base64url"){let r=new Uint8Array(t);return Gr.fromArrayBuffer(r.buffer,e==="base64url")}function y0(t){let e=Gr.toArrayBuffer(t,!0);return Gr.fromArrayBuffer(e)}function v0(t){return Gr.fromString(t,!0)}function w0(t){return Gr.toString(t,!0)}function x0(t){return Gr.validate(t,!1)}function A0(t){return t=Wf(t),Gr.validate(t,!0)}function Wf(t){return t.replace(/=/g,"")}var lt={};Dt(lt,{decodeFirst:()=>G0,encode:()=>V0});function Eo(t,e,r){if(e<24)return[e,1];let n=t.byteLength-r-1,i=new DataView(t.buffer,r+1),o,a=0;switch(e){case 24:{n>0&&(o=i.getUint8(0),a=2);break}case 25:{n>1&&(o=i.getUint16(0,!1),a=3);break}case 26:{n>3&&(o=i.getUint32(0,!1),a=5);break}case 27:{if(n>7){let s=i.getBigUint64(0,!1);if(s>=24n&&s<=Number.MAX_SAFE_INTEGER)return[Number(s),9]}break}}if(o&&o>=24)return[o,a];throw new Error("Length not supported or not well formed")}var Ec=0,Ia=1,kd=2,Sd=3,Cd=4,Td=5,Id=6,Kf=7;function hr(t,e){let r=t<<5;if(e<0)throw new Error("CBOR Data Item argument must not be negative");let n;if(typeof e=="number"){if(!Number.isInteger(e))throw new Error("CBOR Data Item argument must be an integer");n=BigInt(e)}else n=e;if(t==Ia){if(n==0n)throw new Error("CBOR Data Item argument cannot be zero when negative");n=n-1n}if(n>18446744073709551615n)throw new Error("CBOR number out of range");let i=new Uint8Array(8);return new DataView(i.buffer).setBigUint64(0,n,!1),n<=23?[r|i[7]]:n<=255?[r|24,i[7]]:n<=65535?[r|25,...i.slice(6)]:n<=4294967295?[r|26,...i.slice(4)]:[r|27,...i]}var _a=class{constructor(e,r){Object.defineProperty(this,"tagId",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"tagValue",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.tagId=e,this.tagValue=r}get tag(){return this.tagId}get value(){return this.tagValue}};function Ff(t,e,r){return Eo(t,e,r)}function E0(t,e,r){let[n,i]=Ff(t,e,r);return[-n-1,i]}function zf(t,e,r){let[n,i]=Eo(t,e,r),o=r+i;return[new Uint8Array(t.buffer.slice(o,o+n)),i+n]}var k0=new TextDecoder;function S0(t,e,r){let[n,i]=zf(t,e,r);return[k0.decode(n),i]}function C0(t,e,r){if(e===0)return[[],1];let[n,i]=Eo(t,e,r),o=i,a=[];for(let s=0;s<n;s++){if(t.byteLength-r-o<=0)throw new Error("array is not supported or well formed");let[d,p]=pi(t,r+o);a.push(d),o+=p}return[a,o]}var kc="Map is not supported or well formed";function T0(t,e,r){if(e===0)return[new Map,1];let[n,i]=Eo(t,e,r),o=i,a=new Map;for(let s=0;s<n;s++){let l=t.byteLength-r-o;if(l<=0)throw new Error(kc);let[d,p]=pi(t,r+o);if(o+=p,l-=p,l<=0)throw new Error(kc);if(typeof d!="string"&&typeof d!="number")throw new Error(kc);if(a.has(d))throw new Error(kc);let[m,y]=pi(t,r+o);o+=y,a.set(d,m)}return[a,o]}function I0(t,e){if(e+3>t.byteLength)throw new Error("CBOR stream ended before end of Float 16");let r=t.getUint16(e+1,!1);if(r==31744)return[1/0,3];if(r==32256)return[NaN,3];if(r==64512)return[-1/0,3];throw new Error("Float16 data is unsupported")}function _0(t,e){if(e+5>t.byteLength)throw new Error("CBOR stream ended before end of Float 32");return[t.getFloat32(e+1,!1),5]}function R0(t,e){if(e+9>t.byteLength)throw new Error("CBOR stream ended before end of Float 64");return[t.getFloat64(e+1,!1),9]}function B0(t,e,r){let[n,i]=Eo(t,e,r),[o,a]=pi(t,r+i);return[new _a(n,o),i+a]}function pi(t,e){if(e>=t.byteLength)throw new Error("CBOR stream ended before tag value");let r=t.getUint8(e),n=r>>5,i=r&31;switch(n){case Ec:return Ff(t,i,e);case Ia:return E0(t,i,e);case kd:return zf(t,i,e);case Sd:return S0(t,i,e);case Cd:return C0(t,i,e);case Td:return T0(t,i,e);case Id:return B0(t,i,e);case Kf:switch(i){case 20:return[!1,1];case 21:return[!0,1];case 22:return[null,1];case 23:return[void 0,1];case 25:return I0(t,e);case 26:return _0(t,e);case 27:return R0(t,e)}}throw new Error(`Unsupported or not well formed at ${e}`)}function M0(t){return t===!0?245:t===!1?244:t===null?246:247}function P0(t){if(Math.fround(t)==t||!Number.isFinite(t)||Number.isNaN(t)){let e=new Uint8Array(5);return e[0]=250,new DataView(e.buffer).setFloat32(1,t,!1),e}else{let e=new Uint8Array(9);return e[0]=251,new DataView(e.buffer).setFloat64(1,t,!1),e}}function O0(t){return typeof t=="number"?Number.isSafeInteger(t)?t<0?hr(Ia,Math.abs(t)):hr(Ec,t):[P0(t)]:t<0n?hr(Ia,t*-1n):hr(Ec,t)}var N0=new TextEncoder;function D0(t,e){e.push(...hr(Sd,t.length)),e.push(N0.encode(t))}function L0(t,e){e.push(...hr(kd,t.length)),e.push(t)}function j0(t,e){e.push(...hr(Cd,t.length));for(let r of t)Ra(r,e)}function H0(t,e){e.push(new Uint8Array(hr(Td,t.size)));for(let[r,n]of t.entries())Ra(r,e),Ra(n,e)}function U0(t,e){e.push(...hr(Id,t.tag)),Ra(t.value,e)}function Ra(t,e){if(typeof t=="boolean"||t===null||t==null){e.push(M0(t));return}if(typeof t=="number"||typeof t=="bigint"){e.push(...O0(t));return}if(typeof t=="string"){D0(t,e);return}if(t instanceof Uint8Array){L0(t,e);return}if(Array.isArray(t)){j0(t,e);return}if(t instanceof Map){H0(t,e);return}if(t instanceof _a){U0(t,e);return}throw new Error("Not implemented")}function _d(t,e){if(t.byteLength===0||t.byteLength<=e||e<0)throw new Error("No data");return t instanceof Uint8Array?pi(new DataView(t.buffer),e):t instanceof ArrayBuffer?pi(new DataView(t),e):pi(t,e)}function Rd(t){let e=[];Ra(t,e);let r=0;for(let o of e)typeof o=="number"?r+=1:r+=o.length;let n=new Uint8Array(r),i=0;for(let o of e)typeof o=="number"?(n[i]=o,i+=1):(n.set(o,i),i+=o.length);return n}function G0(t){let e=new Uint8Array(t),r=_d(e,0),[n]=r;return n}function V0(t){return Rd(t)}var br={};Dt(br,{digest:()=>Yf,getRandomValues:()=>Qf,verify:()=>ry});function qf(t){let e=t.get(re.kty);return Sc(e)&&e===dt.OKP}function wn(t){let e=t.get(re.kty);return Sc(e)&&e===dt.EC2}function ko(t){let e=t.get(re.kty);return Sc(e)&&e===dt.RSA}function Xf(t){let e=t.get(re.kty);return Sc(e)&&e===dt.AKP}var re;(function(t){t[t.kty=1]="kty",t[t.alg=3]="alg",t[t.crv=-1]="crv",t[t.x=-2]="x",t[t.y=-3]="y",t[t.n=-1]="n",t[t.e=-2]="e",t[t.pub=-1]="pub"})(re||(re={}));var dt;(function(t){t[t.OKP=1]="OKP",t[t.EC2=2]="EC2",t[t.RSA=3]="RSA",t[t.AKP=7]="AKP"})(dt||(dt={}));function Sc(t){return Object.values(dt).indexOf(t)>=0}var it;(function(t){t[t.P256=1]="P256",t[t.P384=2]="P384",t[t.P521=3]="P521",t[t.ED25519=6]="ED25519",t[t.SECP256K1=8]="SECP256K1"})(it||(it={}));function Jf(t){return Object.values(it).indexOf(t)>=0}var X;(function(t){t[t.ES256=-7]="ES256",t[t.EdDSA=-8]="EdDSA",t[t.ES384=-35]="ES384",t[t.ES512=-36]="ES512",t[t.PS256=-37]="PS256",t[t.PS384=-38]="PS384",t[t.PS512=-39]="PS512",t[t.ES256K=-47]="ES256K",t[t.ML_DSA_44=-48]="ML_DSA_44",t[t.ML_DSA_65=-49]="ML_DSA_65",t[t.ML_DSA_87=-50]="ML_DSA_87",t[t.RS256=-257]="RS256",t[t.RS384=-258]="RS384",t[t.RS512=-259]="RS512",t[t.RS1=-65535]="RS1"})(X||(X={}));function jt(t){return Object.values(X).indexOf(t)>=0}function Cc(t){return[X.ML_DSA_44,X.ML_DSA_65,X.ML_DSA_87].indexOf(t)>=0}function xn(t){if([X.RS1].indexOf(t)>=0)return"SHA-1";if([X.ES256,X.PS256,X.RS256].indexOf(t)>=0)return"SHA-256";if([X.ES384,X.PS384,X.RS384].indexOf(t)>=0)return"SHA-384";if([X.ES512,X.PS512,X.RS512,X.EdDSA].indexOf(t)>=0)return"SHA-512";throw new Error(`Could not map COSE alg value of ${t} to a WebCrypto hash alg name`)}var Ba;function vt(){return new Promise((e,r)=>{if(Ba)return e(Ba);let n=K0.stubThisGlobalThisCrypto();return n?(Ba=n,e(Ba)):r(new Bd)})}var Bd=class extends Error{constructor(){super("An instance of the Crypto API could not be located"),this.name="MissingWebCrypto"}},K0={stubThisGlobalThisCrypto:()=>globalThis.crypto,setCachedCrypto:t=>{Ba=t}};async function Yf(t,e){let r=await vt(),n=xn(e),i=await r.subtle.digest(n,t);return new Uint8Array(i)}async function Qf(t){return(await vt()).getRandomValues(t),t}function Tc(t){let e=ee.toHex(t);return[e.slice(0,8),e.slice(8,12),e.slice(12,16),e.slice(16,20),e.slice(20,32)].join("-")}function So(t){let e=lt.decodeFirst(t),r=Uint8Array.from([4]),n=e.get(re.x),i=e.get(re.y);if(!n)throw new Error("COSE public key was missing x");return i?ee.concat([r,n,i]):ee.concat([r,n])}function Zf(t){return F0.stubThis(lt.decodeFirst(t))}var F0={stubThis:t=>t};function Ic(t){let e=ce.toUTF8String(t),r=JSON.parse(e);return z0.stubThis(r)}var z0={stubThis:t=>t};function gr(t){return q0.stubThis(lt.decodeFirst(t))}var q0={stubThis:t=>t};async function _c(){let t=new Uint8Array(32);return await br.getRandomValues(t),X0.stubThis(t)}var X0={stubThis:t=>t};async function em(){let t=new Uint8Array(32);return await br.getRandomValues(t),J0.stubThis(t)}var J0={stubThis:t=>t};var Ar={};Dt(Ar,{Any:()=>vr,BaseBlock:()=>He,BaseStringBlock:()=>Na,BitString:()=>nr,BmpString:()=>yi,Boolean:()=>mi,CharacterString:()=>Ti,Choice:()=>Io,Constructed:()=>$e,DATE:()=>Ua,DEFAULT_MAX_CONTENT_LENGTH:()=>pm,DEFAULT_MAX_DEPTH:()=>dm,DEFAULT_MAX_NODES:()=>um,DateTime:()=>Ga,Duration:()=>Va,EndOfContent:()=>Da,Enumerated:()=>hi,GeneralString:()=>Ci,GeneralizedTime:()=>Ii,GraphicString:()=>Si,HexBlock:()=>xr,IA5String:()=>ki,Integer:()=>zr,Null:()=>tr,NumericString:()=>wi,ObjectIdentifier:()=>gi,OctetString:()=>rr,Primitive:()=>Fr,PrintableString:()=>xi,RawData:()=>Dd,RelativeObjectIdentifier:()=>bi,Repeated:()=>_i,Sequence:()=>ot,Set:()=>ut,TIME:()=>Wa,TeletexString:()=>Ai,TimeOfDay:()=>$a,UTCTime:()=>kn,UniversalString:()=>vi,Utf8String:()=>Ut,ValueBlock:()=>ze,VideotexString:()=>Ei,ViewWriter:()=>To,VisibleString:()=>En,compareSchema:()=>Wr,fromBER:()=>Xr,verifySchema:()=>Ev});var be=yo(Pd());function fi(t,e){let r=0;if(t.length===1)return t[0];for(let n=t.length-1;n>=0;n--)r+=t[t.length-1-n]*Math.pow(2,e*n);return r}function An(t,e,r=-1){let n=r,i=t,o=0,a=Math.pow(2,e);for(let s=1;s<8;s++){if(t<a){let l;if(n<0)l=new ArrayBuffer(s),o=s;else{if(n<s)return new ArrayBuffer(0);l=new ArrayBuffer(n),o=n}let d=new Uint8Array(l);for(let p=s-1;p>=0;p--){let m=Math.pow(2,p*e);d[o-p-1]=Math.floor(i/m),i-=d[o-p-1]*m}return l}a*=Math.pow(2,e)}return new ArrayBuffer(0)}function Mc(...t){let e=0,r=0;for(let o of t)e+=o.length;let n=new ArrayBuffer(e),i=new Uint8Array(n);for(let o of t)i.set(o,r),r+=o.length;return i}function Od(){let t=new Uint8Array(this.valueHex);if(this.valueHex.byteLength>=2){let s=t[0]===255&&t[1]&128,l=t[0]===0&&(t[1]&128)===0;(s||l)&&this.warnings.push("Needlessly long format")}let e=new ArrayBuffer(this.valueHex.byteLength),r=new Uint8Array(e);for(let s=0;s<this.valueHex.byteLength;s++)r[s]=0;r[0]=t[0]&128;let n=fi(r,8),i=new ArrayBuffer(this.valueHex.byteLength),o=new Uint8Array(i);for(let s=0;s<this.valueHex.byteLength;s++)o[s]=t[s];return o[0]&=127,fi(o,8)-n}function tm(t){let e=t<0?t*-1:t,r=128;for(let n=1;n<8;n++){if(e<=r){if(t<0){let a=r-e,s=An(a,8,n),l=new Uint8Array(s);return l[0]|=128,s}let i=An(e,8,n),o=new Uint8Array(i);if(o[0]&128){let a=i.slice(0),s=new Uint8Array(a);i=new ArrayBuffer(i.byteLength+1),o=new Uint8Array(i);for(let l=0;l<a.byteLength;l++)o[l+1]=s[l];o[0]=0}return i}r*=Math.pow(2,8)}return new ArrayBuffer(0)}function rm(t,e){if(t.byteLength!==e.byteLength)return!1;let r=new Uint8Array(t),n=new Uint8Array(e);for(let i=0;i<r.length;i++)if(r[i]!==n[i])return!1;return!0}function wt(t,e){let r=t.toString(10);if(e<r.length)return"";let n=e-r.length,i=Array.from({length:n});for(let a=0;a<n;a++)i[a]="0";return i.join("").concat(r)}var V1=Math.log(2);function Pc(){if(typeof BigInt>"u")throw new Error("BigInt is not defined. Your environment doesn't implement BigInt.")}function Ld(t){let e=0,r=0;for(let i=0;i<t.length;i++){let o=t[i];e+=o.byteLength}let n=new Uint8Array(e);for(let i=0;i<t.length;i++){let o=t[i];n.set(new Uint8Array(o),r),r+=o.byteLength}return n.buffer}function qr(t,e,r,n){return e instanceof Uint8Array?e.byteLength?r<0?(t.error="Wrong parameter: inputOffset less than zero",!1):n<0?(t.error="Wrong parameter: inputLength less than zero",!1):e.byteLength-r-n<0?(t.error="End of input reached before message was fully decoded (inconsistent offset and length values)",!1):!0:(t.error="Wrong parameter: inputBuffer has zero length",!1):(t.error="Wrong parameter: inputBuffer must be 'Uint8Array'",!1)}var To=class{constructor(){this.items=[]}write(e){this.items.push(e)}final(){return Ld(this.items)}},Ma=[new Uint8Array([1])],nm="0123456789",Nd="name",im="valueHexView",ov="isHexOnly",av="idBlock",sv="tagClass",cv="tagNumber",lv="isConstructed",dv="fromBER",uv="toBER",pv="local",xt="",wr=new ArrayBuffer(0),qc=new Uint8Array(0),Oa="EndOfContent",am="OCTET STRING",sm="BIT STRING";function xr(t){var e;return e=class extends t{get valueHex(){return this.valueHexView.slice().buffer}set valueHex(n){this.valueHexView=new Uint8Array(n)}constructor(...n){var i;super(...n);let o=n[0]||{};this.isHexOnly=(i=o.isHexOnly)!==null&&i!==void 0?i:!1,this.valueHexView=o.valueHex?be.BufferSourceConverter.toUint8Array(o.valueHex):qc}fromBER(n,i,o,a){let s=n instanceof ArrayBuffer?new Uint8Array(n):n;if(!qr(this,s,i,o))return-1;let l=i+o;return this.valueHexView=s.subarray(i,l),this.valueHexView.length?(this.blockLength=o,l):(this.warnings.push("Zero buffer length"),i)}toBER(n=!1){return this.isHexOnly?n?new ArrayBuffer(this.valueHexView.byteLength):this.valueHexView.byteLength===this.valueHexView.buffer.byteLength?this.valueHexView.buffer:this.valueHexView.slice().buffer:(this.error="Flag 'isHexOnly' is not set, abort",wr)}toJSON(){return{...super.toJSON(),isHexOnly:this.isHexOnly,valueHex:be.Convert.ToHex(this.valueHexView)}}},e.NAME="hexBlock",e}var Kr=class{static blockName(){return this.NAME}get valueBeforeDecode(){return this.valueBeforeDecodeView.slice().buffer}set valueBeforeDecode(e){this.valueBeforeDecodeView=new Uint8Array(e)}constructor({blockLength:e=0,error:r=xt,warnings:n=[],valueBeforeDecode:i=qc}={}){this.blockLength=e,this.error=r,this.warnings=n,this.valueBeforeDecodeView=be.BufferSourceConverter.toUint8Array(i)}toJSON(){return{blockName:this.constructor.NAME,blockLength:this.blockLength,error:this.error,warnings:this.warnings,valueBeforeDecode:be.Convert.ToHex(this.valueBeforeDecodeView)}}};Kr.NAME="baseBlock";var ze=class extends Kr{fromBER(e,r,n,i){throw TypeError("User need to make a specific function in a class which extends 'ValueBlock'")}toBER(e,r){throw TypeError("User need to make a specific function in a class which extends 'ValueBlock'")}};ze.NAME="valueBlock";var Oc=class extends xr(Kr){constructor({idBlock:e={}}={}){var r,n,i,o;super(),e?(this.isHexOnly=(r=e.isHexOnly)!==null&&r!==void 0?r:!1,this.valueHexView=e.valueHex?be.BufferSourceConverter.toUint8Array(e.valueHex):qc,this.tagClass=(n=e.tagClass)!==null&&n!==void 0?n:-1,this.tagNumber=(i=e.tagNumber)!==null&&i!==void 0?i:-1,this.isConstructed=(o=e.isConstructed)!==null&&o!==void 0?o:!1):(this.tagClass=-1,this.tagNumber=-1,this.isConstructed=!1)}toBER(e=!1){let r=0;switch(this.tagClass){case 1:r|=0;break;case 2:r|=64;break;case 3:r|=128;break;case 4:r|=192;break;default:return this.error="Unknown tag class",wr}if(this.isConstructed&&(r|=32),this.tagNumber<31&&!this.isHexOnly){let i=new Uint8Array(1);if(!e){let o=this.tagNumber;o&=31,r|=o,i[0]=r}return i.buffer}if(!this.isHexOnly){let i=An(this.tagNumber,7),o=new Uint8Array(i),a=i.byteLength,s=new Uint8Array(a+1);if(s[0]=r|31,!e){for(let l=0;l<a-1;l++)s[l+1]=o[l]|128;s[a]=o[a-1]}return s.buffer}let n=new Uint8Array(this.valueHexView.byteLength+1);if(n[0]=r|31,!e){let i=this.valueHexView;for(let o=0;o<i.length-1;o++)n[o+1]=i[o]|128;n[this.valueHexView.byteLength]=i[i.length-1]}return n.buffer}fromBER(e,r,n){let i=be.BufferSourceConverter.toUint8Array(e);if(!qr(this,i,r,n))return-1;let o=i.subarray(r,r+n);if(o.length===0)return this.error="Zero buffer length",-1;switch(o[0]&192){case 0:this.tagClass=1;break;case 64:this.tagClass=2;break;case 128:this.tagClass=3;break;case 192:this.tagClass=4;break;default:return this.error="Unknown tag class",-1}this.isConstructed=(o[0]&32)===32,this.isHexOnly=!1;let s=o[0]&31;if(s!==31)this.tagNumber=s,this.blockLength=1;else{let l=0;for(;;){let p=l+1;if(p>=o.length)return this.error="End of input reached before message was fully decoded",-1;if(l++,(o[p]&128)===0)break}this.blockLength=l+1;let d=this.valueHexView=new Uint8Array(l);for(let p=0;p<l;p++)d[p]=o[p+1]&127;this.blockLength<=9?this.tagNumber=fi(d,7):(this.isHexOnly=!0,this.warnings.push("Tag too long, represented as hex-coded"))}if(this.tagClass===1&&this.isConstructed)switch(this.tagNumber){case 1:case 2:case 5:case 6:case 9:case 13:case 14:case 23:case 24:case 31:case 32:case 33:case 34:return this.error="Constructed encoding used for primitive type",-1}return r+this.blockLength}toJSON(){return{...super.toJSON(),tagClass:this.tagClass,tagNumber:this.tagNumber,isConstructed:this.isConstructed}}};Oc.NAME="identificationBlock";var Nc=class extends Kr{constructor({lenBlock:e={}}={}){var r,n,i;super(),this.isIndefiniteForm=(r=e.isIndefiniteForm)!==null&&r!==void 0?r:!1,this.longFormUsed=(n=e.longFormUsed)!==null&&n!==void 0?n:!1,this.length=(i=e.length)!==null&&i!==void 0?i:0}fromBER(e,r,n){let i=be.BufferSourceConverter.toUint8Array(e);if(!qr(this,i,r,n))return-1;let o=i.subarray(r,r+n);if(o.length===0)return this.error="Zero buffer length",-1;if(o[0]===255)return this.error="Length block 0xFF is reserved by standard",-1;if(this.isIndefiniteForm=o[0]===128,this.isIndefiniteForm)return this.blockLength=1,r+this.blockLength;if(this.longFormUsed=!!(o[0]&128),this.longFormUsed===!1)return this.length=o[0],this.blockLength=1,r+this.blockLength;let a=o[0]&127;if(a>8)return this.error="Too big integer",-1;if(a+1>o.length)return this.error="End of input reached before message was fully decoded",-1;let s=r+1,l=i.subarray(s,s+a);return l[a-1]===0&&this.warnings.push("Needlessly long encoded length"),this.length=fi(l,8),this.longFormUsed&&this.length<=127&&this.warnings.push("Unnecessary usage of long length form"),this.blockLength=a+1,r+this.blockLength}toBER(e=!1){let r,n;if(this.length>127&&(this.longFormUsed=!0),this.isIndefiniteForm)return r=new ArrayBuffer(1),e===!1&&(n=new Uint8Array(r),n[0]=128),r;if(this.longFormUsed){let i=An(this.length,8);if(i.byteLength>127)return this.error="Too big length",wr;if(r=new ArrayBuffer(i.byteLength+1),e)return r;let o=new Uint8Array(i);n=new Uint8Array(r),n[0]=i.byteLength|128;for(let a=0;a<i.byteLength;a++)n[a+1]=o[a];return r}return r=new ArrayBuffer(1),e===!1&&(n=new Uint8Array(r),n[0]=this.length),r}toJSON(){return{...super.toJSON(),isIndefiniteForm:this.isIndefiniteForm,longFormUsed:this.longFormUsed,length:this.length}}};Nc.NAME="lengthBlock";var J={},He=class extends Kr{constructor({name:e=xt,optional:r=!1,primitiveSchema:n,...i}={},o){super(i),this.name=e,this.optional=r,n&&(this.primitiveSchema=n),this.idBlock=new Oc(i),this.lenBlock=new Nc(i),this.valueBlock=o?new o(i):new ze(i)}fromBER(e,r,n,i){let o=this.valueBlock.fromBER(e,r,this.lenBlock.isIndefiniteForm?n:this.lenBlock.length,i);return o===-1?(this.error=this.valueBlock.error,o):(this.idBlock.error.length||(this.blockLength+=this.idBlock.blockLength),this.lenBlock.error.length||(this.blockLength+=this.lenBlock.blockLength),this.valueBlock.error.length||(this.blockLength+=this.valueBlock.blockLength),o)}toBER(e,r){let n=r||new To;r||cm(this);let i=this.idBlock.toBER(e);if(n.write(i),this.lenBlock.isIndefiniteForm)n.write(new Uint8Array([128]).buffer),this.valueBlock.toBER(e,n),n.write(new ArrayBuffer(2));else{let o=this.valueBlock.toBER(e);this.lenBlock.length=o.byteLength;let a=this.lenBlock.toBER(e);n.write(a),n.write(o)}return r?wr:n.final()}toJSON(){let e={...super.toJSON(),idBlock:this.idBlock.toJSON(),lenBlock:this.lenBlock.toJSON(),valueBlock:this.valueBlock.toJSON(),name:this.name,optional:this.optional};return this.primitiveSchema&&(e.primitiveSchema=this.primitiveSchema.toJSON()),e}toString(e="ascii"){return e==="ascii"?this.onAsciiEncoding():be.Convert.ToHex(this.toBER())}onAsciiEncoding(){let e=this.constructor.NAME,r=be.Convert.ToHex(this.valueBlock.valueBeforeDecodeView);return`${e} : ${r}`}isEqual(e){if(this===e)return!0;if(!(e instanceof this.constructor))return!1;let r=this.toBER(),n=e.toBER();return rm(r,n)}};He.NAME="BaseBlock";function cm(t){var e;if(t instanceof J.Constructed)for(let r of t.valueBlock.value)cm(r)&&(t.lenBlock.isIndefiniteForm=!0);return!!(!((e=t.lenBlock)===null||e===void 0)&&e.isIndefiniteForm)}var Na=class extends He{getValue(){return this.valueBlock.value}setValue(e){this.valueBlock.value=e}constructor({value:e=xt,...r}={},n){super(r,n),e&&this.fromString(e)}fromBER(e,r,n){let i=this.valueBlock.fromBER(e,r,this.lenBlock.isIndefiniteForm?n:this.lenBlock.length);return i===-1?(this.error=this.valueBlock.error,i):(this.fromBuffer(this.valueBlock.valueHexView),this.idBlock.error.length||(this.blockLength+=this.idBlock.blockLength),this.lenBlock.error.length||(this.blockLength+=this.lenBlock.blockLength),this.valueBlock.error.length||(this.blockLength+=this.valueBlock.blockLength),i)}onAsciiEncoding(){return`${this.constructor.NAME} : '${this.valueBlock.value}'`}};Na.NAME="BaseStringBlock";var Dc=class extends xr(ze){constructor({isHexOnly:e=!0,...r}={}){super(r),this.isHexOnly=e}};Dc.NAME="PrimitiveValueBlock";var lm,Fr=class extends He{constructor(e={}){super(e,Dc),this.idBlock.isConstructed=!1}};lm=Fr;J.Primitive=lm;Fr.NAME="PRIMITIVE";var dm=100,um=1e4,pm=16*1024*1024,fv="Maximum ASN.1 nesting depth exceeded",mv="Maximum ASN.1 node count exceeded",hv="Maximum ASN.1 content length exceeded";function Ka(t={}){var e,r,n;return{depth:0,maxDepth:(e=t.maxDepth)!==null&&e!==void 0?e:dm,nodesCount:0,maxNodes:(r=t.maxNodes)!==null&&r!==void 0?r:um,maxContentLength:(n=t.maxContentLength)!==null&&n!==void 0?n:pm}}function gv(t){let e=new He({},ze);return e.error=t,{offset:-1,result:e}}function bv(t){if(t.nodesCount+=1,t.nodesCount>t.maxNodes)return mv}function yv(t,e){if(t>e.maxContentLength)return hv}function jd(t,e,r,n){let i=n.depth+1;if(i>n.maxDepth)return gv(fv);n.depth=i;try{return Xc(t,e,r,n)}finally{n.depth-=1}}function vv(t,e){if(t instanceof e)return t;let r=new e;return r.idBlock=t.idBlock,r.lenBlock=t.lenBlock,r.warnings=t.warnings,r.valueBeforeDecodeView=t.valueBeforeDecodeView,r}function Xc(t,e=0,r=t.length,n=Ka()){let i=e,o=new He({},ze),a=new Kr;if(!qr(a,t,e,r))return o.error=a.error,{offset:-1,result:o};if(!t.subarray(e,e+r).length)return o.error="Zero buffer length",{offset:-1,result:o};let l=bv(n);if(l)return o.error=l,{offset:-1,result:o};let d=o.idBlock.fromBER(t,e,r);if(o.idBlock.warnings.length&&o.warnings.concat(o.idBlock.warnings),d===-1)return o.error=o.idBlock.error,{offset:-1,result:o};if(e=d,r-=o.idBlock.blockLength,d=o.lenBlock.fromBER(t,e,r),o.lenBlock.warnings.length&&o.warnings.concat(o.lenBlock.warnings),d===-1)return o.error=o.lenBlock.error,{offset:-1,result:o};e=d,r-=o.lenBlock.blockLength;let p=o.lenBlock.isIndefiniteForm?r:o.lenBlock.length,m=yv(p,n);if(m)return o.error=m,{offset:-1,result:o};if(!o.idBlock.isConstructed&&o.lenBlock.isIndefiniteForm)return o.error="Indefinite length form used for primitive encoding form",{offset:-1,result:o};let y=He;switch(o.idBlock.tagClass){case 1:if(o.idBlock.tagNumber>=37&&o.idBlock.isHexOnly===!1)return o.error="UNIVERSAL 37 and upper tags are reserved by ASN.1 standard",{offset:-1,result:o};switch(o.idBlock.tagNumber){case 0:if(o.idBlock.isConstructed&&o.lenBlock.length>0)return o.error="Type [UNIVERSAL 0] is reserved",{offset:-1,result:o};y=J.EndOfContent;break;case 1:y=J.Boolean;break;case 2:y=J.Integer;break;case 3:y=J.BitString;break;case 4:y=J.OctetString;break;case 5:y=J.Null;break;case 6:y=J.ObjectIdentifier;break;case 10:y=J.Enumerated;break;case 12:y=J.Utf8String;break;case 13:y=J.RelativeObjectIdentifier;break;case 14:y=J.TIME;break;case 15:return o.error="[UNIVERSAL 15] is reserved by ASN.1 standard",{offset:-1,result:o};case 16:y=J.Sequence;break;case 17:y=J.Set;break;case 18:y=J.NumericString;break;case 19:y=J.PrintableString;break;case 20:y=J.TeletexString;break;case 21:y=J.VideotexString;break;case 22:y=J.IA5String;break;case 23:y=J.UTCTime;break;case 24:y=J.GeneralizedTime;break;case 25:y=J.GraphicString;break;case 26:y=J.VisibleString;break;case 27:y=J.GeneralString;break;case 28:y=J.UniversalString;break;case 29:y=J.CharacterString;break;case 30:y=J.BmpString;break;case 31:y=J.DATE;break;case 32:y=J.TimeOfDay;break;case 33:y=J.DateTime;break;case 34:y=J.Duration;break;default:{let A=o.idBlock.isConstructed?new J.Constructed:new J.Primitive;A.idBlock=o.idBlock,A.lenBlock=o.lenBlock,A.warnings=o.warnings,o=A}}break;default:y=o.idBlock.isConstructed?J.Constructed:J.Primitive}return o=vv(o,y),d=o.fromBER(t,e,p,n),o.valueBeforeDecodeView=t.subarray(i,i+o.blockLength),{offset:d,result:o}}function Xr(t,e={}){if(!t.byteLength){let r=new He({},ze);return r.error="Input buffer has zero length",{offset:-1,result:r}}return Xc(be.BufferSourceConverter.toUint8Array(t).slice(),0,t.byteLength,Ka(e))}function wv(t,e){return t?1:e}var yr=class extends ze{constructor({value:e=[],isIndefiniteForm:r=!1,...n}={}){super(n),this.value=e,this.isIndefiniteForm=r}fromBER(e,r,n,i){let o=be.BufferSourceConverter.toUint8Array(e),a=i??Ka();if(!qr(this,o,r,n))return-1;if(this.valueBeforeDecodeView=o.subarray(r,r+n),this.valueBeforeDecodeView.length===0)return this.warnings.push("Zero buffer length"),r;let s=r;for(;wv(this.isIndefiniteForm,n)>0;){let l=jd(o,s,n,a);if(l.offset===-1)return this.error=l.result.error,this.warnings.concat(l.result.warnings),-1;if(s=l.offset,this.blockLength+=l.result.blockLength,n-=l.result.blockLength,this.value.push(l.result),this.isIndefiniteForm&&l.result.constructor.NAME===Oa)break}return this.isIndefiniteForm&&(this.value[this.value.length-1].constructor.NAME===Oa?this.value.pop():this.warnings.push("No EndOfContent block encoded")),s}toBER(e,r){let n=r||new To;for(let i=0;i<this.value.length;i++)this.value[i].toBER(e,n);return r?wr:n.final()}toJSON(){let e={...super.toJSON(),isIndefiniteForm:this.isIndefiniteForm,value:[]};for(let r of this.value)e.value.push(r.toJSON());return e}};yr.NAME="ConstructedValueBlock";var fm,$e=class extends He{constructor(e={}){super(e,yr),this.idBlock.isConstructed=!0}fromBER(e,r,n,i){this.valueBlock.isIndefiniteForm=this.lenBlock.isIndefiniteForm;let o=this.valueBlock.fromBER(e,r,this.lenBlock.isIndefiniteForm?n:this.lenBlock.length,i);return o===-1?(this.error=this.valueBlock.error,o):(this.idBlock.error.length||(this.blockLength+=this.idBlock.blockLength),this.lenBlock.error.length||(this.blockLength+=this.lenBlock.blockLength),this.valueBlock.error.length||(this.blockLength+=this.valueBlock.blockLength),o)}onAsciiEncoding(){let e=[];for(let n of this.valueBlock.value)e.push(n.toString("ascii").split(`
`).map(i=>`  ${i}`).join(`
`));let r=this.idBlock.tagClass===3?`[${this.idBlock.tagNumber}]`:this.constructor.NAME;return e.length?`${r} :
${e.join(`
`)}`:`${r} :`}};fm=$e;J.Constructed=fm;$e.NAME="CONSTRUCTED";var Lc=class extends ze{fromBER(e,r,n){return r}toBER(e){return wr}};Lc.override="EndOfContentValueBlock";var mm,Da=class extends He{constructor(e={}){super(e,Lc),this.idBlock.tagClass=1,this.idBlock.tagNumber=0}};mm=Da;J.EndOfContent=mm;Da.NAME=Oa;var hm,tr=class extends He{constructor(e={}){super(e,ze),this.idBlock.tagClass=1,this.idBlock.tagNumber=5}fromBER(e,r,n){return this.lenBlock.length>0&&this.warnings.push("Non-zero length of value block for Null type"),this.idBlock.error.length||(this.blockLength+=this.idBlock.blockLength),this.lenBlock.error.length||(this.blockLength+=this.lenBlock.blockLength),this.blockLength+=n,r+n>e.byteLength?(this.error="End of input reached before message was fully decoded (inconsistent offset and length values)",-1):r+n}toBER(e,r){let n=new ArrayBuffer(2);if(!e){let i=new Uint8Array(n);i[0]=5,i[1]=0}return r&&r.write(n),n}onAsciiEncoding(){return`${this.constructor.NAME}`}};hm=tr;J.Null=hm;tr.NAME="NULL";var jc=class extends xr(ze){get value(){for(let e of this.valueHexView)if(e>0)return!0;return!1}set value(e){this.valueHexView[0]=e?255:0}constructor({value:e,...r}={}){super(r),r.valueHex?this.valueHexView=be.BufferSourceConverter.toUint8Array(r.valueHex):this.valueHexView=new Uint8Array(1),e&&(this.value=e)}fromBER(e,r,n){let i=be.BufferSourceConverter.toUint8Array(e);return qr(this,i,r,n)?(this.valueHexView=i.subarray(r,r+n),n>1&&this.warnings.push("Boolean value encoded in more then 1 octet"),this.isHexOnly=!0,Od.call(this),this.blockLength=n,r+n):-1}toBER(){return this.valueHexView.slice()}toJSON(){return{...super.toJSON(),value:this.value}}};jc.NAME="BooleanValueBlock";var gm,mi=class extends He{getValue(){return this.valueBlock.value}setValue(e){this.valueBlock.value=e}constructor(e={}){super(e,jc),this.idBlock.tagClass=1,this.idBlock.tagNumber=1}onAsciiEncoding(){return`${this.constructor.NAME} : ${this.getValue}`}};gm=mi;J.Boolean=gm;mi.NAME="BOOLEAN";var Hc=class extends xr(yr){constructor({isConstructed:e=!1,...r}={}){super(r),this.isConstructed=e}fromBER(e,r,n,i){let o=0;if(this.isConstructed){if(this.isHexOnly=!1,o=yr.prototype.fromBER.call(this,e,r,n,i),o===-1)return o;for(let a=0;a<this.value.length;a++){let s=this.value[a].constructor.NAME;if(s===Oa){if(this.isIndefiniteForm)break;return this.error="EndOfContent is unexpected, OCTET STRING may consists of OCTET STRINGs only",-1}if(s!==am)return this.error="OCTET STRING may consists of OCTET STRINGs only",-1}}else this.isHexOnly=!0,o=super.fromBER(e,r,n),this.blockLength=n;return o}toBER(e,r){return this.isConstructed?yr.prototype.toBER.call(this,e,r):e?new ArrayBuffer(this.valueHexView.byteLength):this.valueHexView.slice().buffer}toJSON(){return{...super.toJSON(),isConstructed:this.isConstructed}}};Hc.NAME="OctetStringValueBlock";var Hd,rr=class extends He{constructor({idBlock:e={},lenBlock:r={},...n}={}){var i,o;(i=n.isConstructed)!==null&&i!==void 0||(n.isConstructed=!!(!((o=n.value)===null||o===void 0)&&o.length)),super({idBlock:{isConstructed:n.isConstructed,...e},lenBlock:{...r,isIndefiniteForm:!!n.isIndefiniteForm},...n},Hc),this.idBlock.tagClass=1,this.idBlock.tagNumber=4}fromBER(e,r,n,i){if(this.valueBlock.isConstructed=this.idBlock.isConstructed,this.valueBlock.isIndefiniteForm=this.lenBlock.isIndefiniteForm,n===0)return this.idBlock.error.length===0&&(this.blockLength+=this.idBlock.blockLength),this.lenBlock.error.length===0&&(this.blockLength+=this.lenBlock.blockLength),r;if(!this.valueBlock.isConstructed){let a=(e instanceof ArrayBuffer?new Uint8Array(e):e).subarray(r,r+n);try{if(a.byteLength){let s=i??Ka(),l=jd(a,0,a.byteLength,s);l.offset!==-1&&l.offset===n&&(this.valueBlock.value=[l.result])}}catch{}}return super.fromBER(e,r,n,i)}onAsciiEncoding(){if(this.valueBlock.isConstructed||this.valueBlock.value&&this.valueBlock.value.length)return $e.prototype.onAsciiEncoding.call(this);let e=this.constructor.NAME,r=be.Convert.ToHex(this.valueBlock.valueHexView);return`${e} : ${r}`}getValue(){if(!this.idBlock.isConstructed)return this.valueBlock.valueHexView.slice().buffer;let e=[];for(let r of this.valueBlock.value)r instanceof Hd&&e.push(r.valueBlock.valueHexView);return be.BufferSourceConverter.concat(e)}};Hd=rr;J.OctetString=Hd;rr.NAME=am;var Uc=class extends xr(yr){constructor({unusedBits:e=0,isConstructed:r=!1,...n}={}){super(n),this.unusedBits=e,this.isConstructed=r,this.blockLength=this.valueHexView.byteLength}fromBER(e,r,n,i){if(!n)return r;let o=-1;if(this.isConstructed){if(o=yr.prototype.fromBER.call(this,e,r,n,i),o===-1)return o;for(let l of this.value){let d=l.constructor.NAME;if(d===Oa){if(this.isIndefiniteForm)break;return this.error="EndOfContent is unexpected, BIT STRING may consists of BIT STRINGs only",-1}if(d!==sm)return this.error="BIT STRING may consists of BIT STRINGs only",-1;let p=l.valueBlock;if(this.unusedBits>0&&p.unusedBits>0)return this.error='Using of "unused bits" inside constructive BIT STRING allowed for least one only',-1;this.unusedBits=p.unusedBits}return o}let a=be.BufferSourceConverter.toUint8Array(e);if(!qr(this,a,r,n))return-1;let s=a.subarray(r,r+n);if(this.unusedBits=s[0],this.unusedBits>7)return this.error="Unused bits for BitString must be in range 0-7",-1;if(!this.unusedBits){let l=s.subarray(1);try{if(l.byteLength){let d=i??Ka(),p=jd(l,0,l.byteLength,d);p.offset!==-1&&p.offset===n-1&&(this.value=[p.result])}}catch{}}return this.valueHexView=s.subarray(1),this.blockLength=s.length,r+n}toBER(e,r){if(this.isConstructed)return yr.prototype.toBER.call(this,e,r);if(e)return new ArrayBuffer(this.valueHexView.byteLength+1);if(!this.valueHexView.byteLength){let i=new Uint8Array(1);return i[0]=0,i.buffer}let n=new Uint8Array(this.valueHexView.length+1);return n[0]=this.unusedBits,n.set(this.valueHexView,1),n.buffer}toJSON(){return{...super.toJSON(),unusedBits:this.unusedBits,isConstructed:this.isConstructed}}};Uc.NAME="BitStringValueBlock";var bm,nr=class extends He{constructor({idBlock:e={},lenBlock:r={},...n}={}){var i,o;(i=n.isConstructed)!==null&&i!==void 0||(n.isConstructed=!!(!((o=n.value)===null||o===void 0)&&o.length)),super({idBlock:{isConstructed:n.isConstructed,...e},lenBlock:{...r,isIndefiniteForm:!!n.isIndefiniteForm},...n},Uc),this.idBlock.tagClass=1,this.idBlock.tagNumber=3}fromBER(e,r,n,i){return this.valueBlock.isConstructed=this.idBlock.isConstructed,this.valueBlock.isIndefiniteForm=this.lenBlock.isIndefiniteForm,super.fromBER(e,r,n,i)}onAsciiEncoding(){if(this.valueBlock.isConstructed||this.valueBlock.value&&this.valueBlock.value.length)return $e.prototype.onAsciiEncoding.call(this);{let e=[],r=this.valueBlock.valueHexView;for(let a of r)e.push(a.toString(2).padStart(8,"0"));let n=e.join(""),i=this.constructor.NAME,o=n.substring(0,n.length-this.valueBlock.unusedBits);return`${i} : ${o}`}}};bm=nr;J.BitString=bm;nr.NAME=sm;var ym;function xv(t,e){let r=new Uint8Array([0]),n=new Uint8Array(t),i=new Uint8Array(e),o=n.slice(0),a=o.length-1,s=i.slice(0),l=s.length-1,d=0,p=l<a?a:l,m=0;for(let y=p;y>=0;y--,m++)!0===m<s.length?d=o[a-m]+s[l-m]+r[0]:d=o[a-m]+r[0],r[0]=d/10,!0===m>=o.length?o=Mc(new Uint8Array([d%10]),o):o[a-m]=d%10;return r[0]>0&&(o=Mc(r,o)),o}function om(t){if(t>=Ma.length)for(let e=Ma.length;e<=t;e++){let r=new Uint8Array([0]),n=Ma[e-1].slice(0);for(let i=n.length-1;i>=0;i--){let o=new Uint8Array([(n[i]<<1)+r[0]]);r[0]=o[0]/10,n[i]=o[0]%10}r[0]>0&&(n=Mc(r,n)),Ma.push(n)}return Ma[t]}function Av(t,e){let r=0,n=new Uint8Array(t),i=new Uint8Array(e),o=n.slice(0),a=o.length-1,s=i.slice(0),l=s.length-1,d,p=0;for(let m=l;m>=0;m--,p++)d=o[a-p]-s[l-p]-r,!0===d<0?(r=1,o[a-p]=d+10):(r=0,o[a-p]=d);if(r>0)for(let m=a-l+1;m>=0;m--,p++)if(d=o[a-p]-r,d<0)r=1,o[a-p]=d+10;else{r=0,o[a-p]=d;break}return o.slice()}var La=class extends xr(ze){setValueHex(){this.valueHexView.length>=4?(this.warnings.push("Too big Integer for decoding, hex only"),this.isHexOnly=!0,this._valueDec=0):(this.isHexOnly=!1,this.valueHexView.length>0&&(this._valueDec=Od.call(this)))}constructor({value:e,...r}={}){super(r),this._valueDec=0,r.valueHex&&this.setValueHex(),e!==void 0&&(this.valueDec=e)}set valueDec(e){this._valueDec=e,this.isHexOnly=!1,this.valueHexView=new Uint8Array(tm(e))}get valueDec(){return this._valueDec}fromDER(e,r,n,i=0){let o=this.fromBER(e,r,n);if(o===-1)return o;let a=this.valueHexView;return a[0]===0&&(a[1]&128)!==0?this.valueHexView=a.subarray(1):i!==0&&a.length<i&&(i-a.length>1&&(i=a.length+1),this.valueHexView=a.subarray(i-a.length)),o}toDER(e=!1){let r=this.valueHexView;switch(!0){case(r[0]&128)!==0:{let n=new Uint8Array(this.valueHexView.length+1);n[0]=0,n.set(r,1),this.valueHexView=n}break;case(r[0]===0&&(r[1]&128)===0):this.valueHexView=this.valueHexView.subarray(1);break}return this.toBER(e)}fromBER(e,r,n){let i=super.fromBER(e,r,n);return i===-1||this.setValueHex(),i}toBER(e){return e?new ArrayBuffer(this.valueHexView.length):this.valueHexView.slice().buffer}toJSON(){return{...super.toJSON(),valueDec:this.valueDec}}toString(){let e=this.valueHexView.length*8-1,r=new Uint8Array(this.valueHexView.length*8/3),n=0,i,o=this.valueHexView,a="",s=!1;for(let l=o.byteLength-1;l>=0;l--){i=o[l];for(let d=0;d<8;d++)(i&1)===1&&(n===e?(r=Av(om(n),r),a="-"):r=xv(r,om(n))),n++,i>>=1}for(let l=0;l<r.length;l++)r[l]&&(s=!0),s&&(a+=nm.charAt(r[l]));return s===!1&&(a+=nm.charAt(0)),a}};ym=La;La.NAME="IntegerValueBlock";Object.defineProperty(ym.prototype,"valueHex",{set:function(t){this.valueHexView=new Uint8Array(t),this.setValueHex()},get:function(){return this.valueHexView.slice().buffer}});var Pa,zr=class extends He{constructor(e={}){super(e,La),this.idBlock.tagClass=1,this.idBlock.tagNumber=2}toBigInt(){return Pc(),BigInt(this.valueBlock.toString())}static fromBigInt(e){Pc();let r=BigInt(e),n=new To,i=r.toString(16).replace(/^-/,""),o=new Uint8Array(be.Convert.FromHex(i));if(r<0){let s=new Uint8Array(o.length+(o[0]&128?1:0));s[0]|=128;let d=BigInt(`0x${be.Convert.ToHex(s)}`)+r,p=be.BufferSourceConverter.toUint8Array(be.Convert.FromHex(d.toString(16)));p[0]|=128,n.write(p)}else o[0]&128&&n.write(new Uint8Array([0])),n.write(o);return new Pa({valueHex:n.final()})}convertToDER(){let e=new Pa({valueHex:this.valueBlock.valueHexView});return e.valueBlock.toDER(),e}convertFromDER(){return new Pa({valueHex:this.valueBlock.valueHexView[0]===0?this.valueBlock.valueHexView.subarray(1):this.valueBlock.valueHexView})}onAsciiEncoding(){return`${this.constructor.NAME} : ${this.valueBlock.toString()}`}};Pa=zr;J.Integer=Pa;zr.NAME="INTEGER";var vm,hi=class extends zr{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=10}};vm=hi;J.Enumerated=vm;hi.NAME="ENUMERATED";var ja=class extends xr(ze){constructor({valueDec:e=-1,isFirstSid:r=!1,...n}={}){super(n),this.valueDec=e,this.isFirstSid=r}fromBER(e,r,n){if(!n)return r;let i=be.BufferSourceConverter.toUint8Array(e);if(!qr(this,i,r,n))return-1;let o=i.subarray(r,r+n);this.valueHexView=new Uint8Array(n);for(let s=0;s<n&&(this.valueHexView[s]=o[s]&127,this.blockLength++,(o[s]&128)!==0);s++);let a=new Uint8Array(this.blockLength);for(let s=0;s<this.blockLength;s++)a[s]=this.valueHexView[s];return this.valueHexView=a,(o[this.blockLength-1]&128)!==0?(this.error="End of input reached before message was fully decoded",-1):(this.valueHexView[0]===0&&this.warnings.push("Needlessly long format of SID encoding"),this.blockLength<=8?this.valueDec=fi(this.valueHexView,7):(this.isHexOnly=!0,this.warnings.push("Too big SID for decoding, hex only")),r+this.blockLength)}set valueBigInt(e){Pc();let r=BigInt(e).toString(2);for(;r.length%7;)r="0"+r;let n=new Uint8Array(r.length/7);for(let i=0;i<n.length;i++)n[i]=parseInt(r.slice(i*7,i*7+7),2)+(i+1<n.length?128:0);this.fromBER(n.buffer,0,n.length)}toBER(e){if(this.isHexOnly){if(e)return new ArrayBuffer(this.valueHexView.byteLength);let i=this.valueHexView,o=new Uint8Array(this.blockLength);for(let a=0;a<this.blockLength-1;a++)o[a]=i[a]|128;return o[this.blockLength-1]=i[this.blockLength-1],o.buffer}let r=An(this.valueDec,7);if(r.byteLength===0)return this.error="Error during encoding SID value",wr;let n=new Uint8Array(r.byteLength);if(!e){let i=new Uint8Array(r),o=r.byteLength-1;for(let a=0;a<o;a++)n[a]=i[a]|128;n[o]=i[o]}return n}toString(){let e="";if(this.isHexOnly)e=be.Convert.ToHex(this.valueHexView);else if(this.isFirstSid){let r=this.valueDec;this.valueDec<=39?e="0.":this.valueDec<=79?(e="1.",r-=40):(e="2.",r-=80),e+=r.toString()}else e=this.valueDec.toString();return e}toJSON(){return{...super.toJSON(),valueDec:this.valueDec,isFirstSid:this.isFirstSid}}};ja.NAME="sidBlock";var $c=class extends ze{constructor({value:e=xt,...r}={}){super(r),this.value=[],e&&this.fromString(e)}fromBER(e,r,n){let i=r;for(;n>0;){let o=new ja;if(i=o.fromBER(e,i,n),i===-1)return this.blockLength=0,this.error=o.error,i;this.value.length===0&&(o.isFirstSid=!0),this.blockLength+=o.blockLength,n-=o.blockLength,this.value.push(o)}return i}toBER(e){let r=[];for(let n=0;n<this.value.length;n++){let i=this.value[n].toBER(e);if(i.byteLength===0)return this.error=this.value[n].error,wr;r.push(i)}return Ld(r)}fromString(e){this.value=[];let r=0,n=0,i="",o=!1;do if(n=e.indexOf(".",r),n===-1?i=e.substring(r):i=e.substring(r,n),r=n+1,o){let a=this.value[0],s=0;switch(a.valueDec){case 0:break;case 1:s=40;break;case 2:s=80;break;default:this.value=[];return}let l=parseInt(i,10);if(isNaN(l))return;a.valueDec=l+s,o=!1}else{let a=new ja;if(i>Number.MAX_SAFE_INTEGER){Pc();let s=BigInt(i);a.valueBigInt=s}else if(a.valueDec=parseInt(i,10),isNaN(a.valueDec))return;this.value.length||(a.isFirstSid=!0,o=!0),this.value.push(a)}while(n!==-1)}toString(){let e="",r=!1;for(let n=0;n<this.value.length;n++){r=this.value[n].isHexOnly;let i=this.value[n].toString();n!==0&&(e=`${e}.`),r?(i=`{${i}}`,this.value[n].isFirstSid?e=`2.{${i} - 80}`:e+=i):e+=i}return e}toJSON(){let e={...super.toJSON(),value:this.toString(),sidArray:[]};for(let r=0;r<this.value.length;r++)e.sidArray.push(this.value[r].toJSON());return e}};$c.NAME="ObjectIdentifierValueBlock";var wm,gi=class extends He{getValue(){return this.valueBlock.toString()}setValue(e){this.valueBlock.fromString(e)}constructor(e={}){super(e,$c),this.idBlock.tagClass=1,this.idBlock.tagNumber=6}onAsciiEncoding(){return`${this.constructor.NAME} : ${this.valueBlock.toString()||"empty"}`}toJSON(){return{...super.toJSON(),value:this.getValue()}}};wm=gi;J.ObjectIdentifier=wm;gi.NAME="OBJECT IDENTIFIER";var Ha=class extends xr(Kr){constructor({valueDec:e=0,...r}={}){super(r),this.valueDec=e}fromBER(e,r,n){if(n===0)return r;let i=be.BufferSourceConverter.toUint8Array(e);if(!qr(this,i,r,n))return-1;let o=i.subarray(r,r+n);this.valueHexView=new Uint8Array(n);for(let s=0;s<n&&(this.valueHexView[s]=o[s]&127,this.blockLength++,(o[s]&128)!==0);s++);let a=new Uint8Array(this.blockLength);for(let s=0;s<this.blockLength;s++)a[s]=this.valueHexView[s];return this.valueHexView=a,(o[this.blockLength-1]&128)!==0?(this.error="End of input reached before message was fully decoded",-1):(this.valueHexView[0]===0&&this.warnings.push("Needlessly long format of SID encoding"),this.blockLength<=8?this.valueDec=fi(this.valueHexView,7):(this.isHexOnly=!0,this.warnings.push("Too big SID for decoding, hex only")),r+this.blockLength)}toBER(e){if(this.isHexOnly){if(e)return new ArrayBuffer(this.valueHexView.byteLength);let i=this.valueHexView,o=new Uint8Array(this.blockLength);for(let a=0;a<this.blockLength-1;a++)o[a]=i[a]|128;return o[this.blockLength-1]=i[this.blockLength-1],o.buffer}let r=An(this.valueDec,7);if(r.byteLength===0)return this.error="Error during encoding SID value",wr;let n=new Uint8Array(r.byteLength);if(!e){let i=new Uint8Array(r),o=r.byteLength-1;for(let a=0;a<o;a++)n[a]=i[a]|128;n[o]=i[o]}return n.buffer}toString(){let e="";return this.isHexOnly?e=be.Convert.ToHex(this.valueHexView):e=this.valueDec.toString(),e}toJSON(){return{...super.toJSON(),valueDec:this.valueDec}}};Ha.NAME="relativeSidBlock";var Gc=class extends ze{constructor({value:e=xt,...r}={}){super(r),this.value=[],e&&this.fromString(e)}fromBER(e,r,n){let i=r;for(;n>0;){let o=new Ha;if(i=o.fromBER(e,i,n),i===-1)return this.blockLength=0,this.error=o.error,i;this.blockLength+=o.blockLength,n-=o.blockLength,this.value.push(o)}return i}toBER(e,r){let n=[];for(let i=0;i<this.value.length;i++){let o=this.value[i].toBER(e);if(o.byteLength===0)return this.error=this.value[i].error,wr;n.push(o)}return Ld(n)}fromString(e){this.value=[];let r=0,n=0,i="";do{n=e.indexOf(".",r),n===-1?i=e.substring(r):i=e.substring(r,n),r=n+1;let o=new Ha;if(o.valueDec=parseInt(i,10),isNaN(o.valueDec))return!0;this.value.push(o)}while(n!==-1);return!0}toString(){let e="",r=!1;for(let n=0;n<this.value.length;n++){r=this.value[n].isHexOnly;let i=this.value[n].toString();n!==0&&(e=`${e}.`),r&&(i=`{${i}}`),e+=i}return e}toJSON(){let e={...super.toJSON(),value:this.toString(),sidArray:[]};for(let r=0;r<this.value.length;r++)e.sidArray.push(this.value[r].toJSON());return e}};Gc.NAME="RelativeObjectIdentifierValueBlock";var xm,bi=class extends He{getValue(){return this.valueBlock.toString()}setValue(e){this.valueBlock.fromString(e)}constructor(e={}){super(e,Gc),this.idBlock.tagClass=1,this.idBlock.tagNumber=13}onAsciiEncoding(){return`${this.constructor.NAME} : ${this.valueBlock.toString()||"empty"}`}toJSON(){return{...super.toJSON(),value:this.getValue()}}};xm=bi;J.RelativeObjectIdentifier=xm;bi.NAME="RelativeObjectIdentifier";var Am,ot=class extends $e{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=16}};Am=ot;J.Sequence=Am;ot.NAME="SEQUENCE";var Em,ut=class extends $e{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=17}};Em=ut;J.Set=Em;ut.NAME="SET";var Vc=class extends xr(ze){constructor({...e}={}){super(e),this.isHexOnly=!0,this.value=xt}toJSON(){return{...super.toJSON(),value:this.value}}};Vc.NAME="StringValueBlock";var Wc=class extends Vc{};Wc.NAME="SimpleStringValueBlock";var pt=class extends Na{constructor({...e}={}){super(e,Wc)}fromBuffer(e){this.valueBlock.value=String.fromCharCode.apply(null,be.BufferSourceConverter.toUint8Array(e))}fromString(e){let r=e.length,n=this.valueBlock.valueHexView=new Uint8Array(r);for(let i=0;i<r;i++)n[i]=e.charCodeAt(i);this.valueBlock.value=e}};pt.NAME="SIMPLE STRING";var Kc=class extends pt{fromBuffer(e){this.valueBlock.valueHexView=be.BufferSourceConverter.toUint8Array(e);try{this.valueBlock.value=be.Convert.ToUtf8String(e)}catch(r){this.warnings.push(`Error during "decodeURIComponent": ${r}, using raw string`),this.valueBlock.value=be.Convert.ToBinary(e)}}fromString(e){this.valueBlock.valueHexView=new Uint8Array(be.Convert.FromUtf8String(e)),this.valueBlock.value=e}};Kc.NAME="Utf8StringValueBlock";var km,Ut=class extends Kc{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=12}};km=Ut;J.Utf8String=km;Ut.NAME="UTF8String";var Fc=class extends pt{fromBuffer(e){this.valueBlock.value=be.Convert.ToUtf16String(e),this.valueBlock.valueHexView=be.BufferSourceConverter.toUint8Array(e)}fromString(e){this.valueBlock.value=e,this.valueBlock.valueHexView=new Uint8Array(be.Convert.FromUtf16String(e))}};Fc.NAME="BmpStringValueBlock";var Sm,yi=class extends Fc{constructor({...e}={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=30}};Sm=yi;J.BmpString=Sm;yi.NAME="BMPString";var zc=class extends pt{fromBuffer(e){let r=ArrayBuffer.isView(e)?e.slice().buffer:e.slice(0),n=new Uint8Array(r);for(let i=0;i<n.length;i+=4)n[i]=n[i+3],n[i+1]=n[i+2],n[i+2]=0,n[i+3]=0;this.valueBlock.value=String.fromCharCode.apply(null,new Uint32Array(r))}fromString(e){let r=e.length,n=this.valueBlock.valueHexView=new Uint8Array(r*4);for(let i=0;i<r;i++){let o=An(e.charCodeAt(i),8),a=new Uint8Array(o);if(a.length>4)continue;let s=4-a.length;for(let l=a.length-1;l>=0;l--)n[i*4+l+s]=a[l]}this.valueBlock.value=e}};zc.NAME="UniversalStringValueBlock";var Cm,vi=class extends zc{constructor({...e}={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=28}};Cm=vi;J.UniversalString=Cm;vi.NAME="UniversalString";var Tm,wi=class extends pt{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=18}};Tm=wi;J.NumericString=Tm;wi.NAME="NumericString";var Im,xi=class extends pt{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=19}};Im=xi;J.PrintableString=Im;xi.NAME="PrintableString";var _m,Ai=class extends pt{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=20}};_m=Ai;J.TeletexString=_m;Ai.NAME="TeletexString";var Rm,Ei=class extends pt{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=21}};Rm=Ei;J.VideotexString=Rm;Ei.NAME="VideotexString";var Bm,ki=class extends pt{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=22}};Bm=ki;J.IA5String=Bm;ki.NAME="IA5String";var Mm,Si=class extends pt{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=25}};Mm=Si;J.GraphicString=Mm;Si.NAME="GraphicString";var Pm,En=class extends pt{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=26}};Pm=En;J.VisibleString=Pm;En.NAME="VisibleString";var Om,Ci=class extends pt{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=27}};Om=Ci;J.GeneralString=Om;Ci.NAME="GeneralString";var Nm,Ti=class extends pt{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=29}};Nm=Ti;J.CharacterString=Nm;Ti.NAME="CharacterString";var Dm,kn=class extends En{constructor({value:e,valueDate:r,...n}={}){if(super(n),this.year=0,this.month=0,this.day=0,this.hour=0,this.minute=0,this.second=0,e){this.fromString(e),this.valueBlock.valueHexView=new Uint8Array(e.length);for(let i=0;i<e.length;i++)this.valueBlock.valueHexView[i]=e.charCodeAt(i)}r&&(this.fromDate(r),this.valueBlock.valueHexView=new Uint8Array(this.toBuffer())),this.idBlock.tagClass=1,this.idBlock.tagNumber=23}fromBuffer(e){this.fromString(String.fromCharCode.apply(null,be.BufferSourceConverter.toUint8Array(e)))}toBuffer(){let e=this.toString(),r=new ArrayBuffer(e.length),n=new Uint8Array(r);for(let i=0;i<e.length;i++)n[i]=e.charCodeAt(i);return r}fromDate(e){this.year=e.getUTCFullYear(),this.month=e.getUTCMonth()+1,this.day=e.getUTCDate(),this.hour=e.getUTCHours(),this.minute=e.getUTCMinutes(),this.second=e.getUTCSeconds()}toDate(){return new Date(Date.UTC(this.year,this.month-1,this.day,this.hour,this.minute,this.second))}fromString(e){let n=/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})Z/ig.exec(e);if(n===null){this.error="Wrong input string for conversion";return}let i=parseInt(n[1],10);i>=50?this.year=1900+i:this.year=2e3+i,this.month=parseInt(n[2],10),this.day=parseInt(n[3],10),this.hour=parseInt(n[4],10),this.minute=parseInt(n[5],10),this.second=parseInt(n[6],10)}toString(e="iso"){if(e==="iso"){let r=new Array(7);return r[0]=wt(this.year<2e3?this.year-1900:this.year-2e3,2),r[1]=wt(this.month,2),r[2]=wt(this.day,2),r[3]=wt(this.hour,2),r[4]=wt(this.minute,2),r[5]=wt(this.second,2),r[6]="Z",r.join("")}return super.toString(e)}onAsciiEncoding(){return`${this.constructor.NAME} : ${this.toDate().toISOString()}`}toJSON(){return{...super.toJSON(),year:this.year,month:this.month,day:this.day,hour:this.hour,minute:this.minute,second:this.second}}};Dm=kn;J.UTCTime=Dm;kn.NAME="UTCTime";var Lm,Ii=class extends kn{constructor(e={}){var r;super(e),(r=this.millisecond)!==null&&r!==void 0||(this.millisecond=0),this.idBlock.tagClass=1,this.idBlock.tagNumber=24}fromDate(e){super.fromDate(e),this.millisecond=e.getUTCMilliseconds()}toDate(){let e=Date.UTC(this.year,this.month-1,this.day,this.hour,this.minute,this.second,this.millisecond);return new Date(e)}fromString(e){let r=!1,n="",i="",o=0,a,s=0,l=0;if(e[e.length-1]==="Z")n=e.substring(0,e.length-1),r=!0;else{let m=new Number(e[e.length-1]);if(isNaN(m.valueOf()))throw new Error("Wrong input string for conversion");n=e}if(r){if(n.indexOf("+")!==-1)throw new Error("Wrong input string for conversion");if(n.indexOf("-")!==-1)throw new Error("Wrong input string for conversion")}else{let m=1,y=n.indexOf("+"),A="";if(y===-1&&(y=n.indexOf("-"),m=-1),y!==-1){if(A=n.substring(y+1),n=n.substring(0,y),A.length!==2&&A.length!==4)throw new Error("Wrong input string for conversion");let T=parseInt(A.substring(0,2),10);if(isNaN(T.valueOf()))throw new Error("Wrong input string for conversion");if(s=m*T,A.length===4){if(T=parseInt(A.substring(2,4),10),isNaN(T.valueOf()))throw new Error("Wrong input string for conversion");l=m*T}}}let d=n.indexOf(".");if(d===-1&&(d=n.indexOf(",")),d!==-1){let m=new Number(`0${n.substring(d)}`);if(isNaN(m.valueOf()))throw new Error("Wrong input string for conversion");o=m.valueOf(),i=n.substring(0,d)}else i=n;switch(!0){case i.length===8:if(a=/(\d{4})(\d{2})(\d{2})/ig,d!==-1)throw new Error("Wrong input string for conversion");break;case i.length===10:if(a=/(\d{4})(\d{2})(\d{2})(\d{2})/ig,d!==-1){let m=60*o;this.minute=Math.floor(m),m=60*(m-this.minute),this.second=Math.floor(m),m=1e3*(m-this.second),this.millisecond=Math.floor(m)}break;case i.length===12:if(a=/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/ig,d!==-1){let m=60*o;this.second=Math.floor(m),m=1e3*(m-this.second),this.millisecond=Math.floor(m)}break;case i.length===14:if(a=/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/ig,d!==-1){let m=1e3*o;this.millisecond=Math.floor(m)}break;default:throw new Error("Wrong input string for conversion")}let p=a.exec(i);if(p===null)throw new Error("Wrong input string for conversion");for(let m=1;m<p.length;m++)switch(m){case 1:this.year=parseInt(p[m],10);break;case 2:this.month=parseInt(p[m],10);break;case 3:this.day=parseInt(p[m],10);break;case 4:this.hour=parseInt(p[m],10)+s;break;case 5:this.minute=parseInt(p[m],10)+l;break;case 6:this.second=parseInt(p[m],10);break;default:throw new Error("Wrong input string for conversion")}if(r===!1){let m=new Date(this.year,this.month,this.day,this.hour,this.minute,this.second,this.millisecond);this.year=m.getUTCFullYear(),this.month=m.getUTCMonth(),this.day=m.getUTCDay(),this.hour=m.getUTCHours(),this.minute=m.getUTCMinutes(),this.second=m.getUTCSeconds(),this.millisecond=m.getUTCMilliseconds()}}toString(e="iso"){if(e==="iso"){let r=[];return r.push(wt(this.year,4)),r.push(wt(this.month,2)),r.push(wt(this.day,2)),r.push(wt(this.hour,2)),r.push(wt(this.minute,2)),r.push(wt(this.second,2)),this.millisecond!==0&&(r.push("."),r.push(wt(this.millisecond,3))),r.push("Z"),r.join("")}return super.toString(e)}toJSON(){return{...super.toJSON(),millisecond:this.millisecond}}};Lm=Ii;J.GeneralizedTime=Lm;Ii.NAME="GeneralizedTime";var jm,Ua=class extends Ut{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=31}};jm=Ua;J.DATE=jm;Ua.NAME="DATE";var Hm,$a=class extends Ut{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=32}};Hm=$a;J.TimeOfDay=Hm;$a.NAME="TimeOfDay";var Um,Ga=class extends Ut{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=33}};Um=Ga;J.DateTime=Um;Ga.NAME="DateTime";var $m,Va=class extends Ut{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=34}};$m=Va;J.Duration=$m;Va.NAME="Duration";var Gm,Wa=class extends Ut{constructor(e={}){super(e),this.idBlock.tagClass=1,this.idBlock.tagNumber=14}};Gm=Wa;J.TIME=Gm;Wa.NAME="TIME";var vr=class{constructor({name:e=xt,optional:r=!1}={}){this.name=e,this.optional=r}},Io=class extends vr{constructor({value:e=[],...r}={}){super(r),this.value=e}},_i=class extends vr{constructor({value:e=new vr,local:r=!1,...n}={}){super(n),this.value=e,this.local=r}},Dd=class{get data(){return this.dataView.slice().buffer}set data(e){this.dataView=be.BufferSourceConverter.toUint8Array(e)}constructor({data:e=qc}={}){this.dataView=be.BufferSourceConverter.toUint8Array(e)}fromBER(e,r,n){let i=r+n;return this.dataView=be.BufferSourceConverter.toUint8Array(e).subarray(r,i),i}toBER(e){return this.dataView.slice().buffer}};function Wr(t,e,r){if(r instanceof Io){for(let o of r.value)if(Wr(t,e,o).verified)return{verified:!0,result:t};{let o={verified:!1,result:{error:"Wrong values for Choice type"}};return r.hasOwnProperty(Nd)&&(o.name=r.name),o}}if(r instanceof vr)return r.hasOwnProperty(Nd)&&(t[r.name]=e),{verified:!0,result:t};if(!(t instanceof Object))return{verified:!1,result:{error:"Wrong root object"}};if(!(e instanceof Object))return{verified:!1,result:{error:"Wrong ASN.1 data"}};if(!(r instanceof Object))return{verified:!1,result:{error:"Wrong ASN.1 schema"}};if(!(av in r))return{verified:!1,result:{error:"Wrong ASN.1 schema"}};if(!(dv in r.idBlock))return{verified:!1,result:{error:"Wrong ASN.1 schema"}};if(!(uv in r.idBlock))return{verified:!1,result:{error:"Wrong ASN.1 schema"}};let n=r.idBlock.toBER(!1);if(n.byteLength===0)return{verified:!1,result:{error:"Error encoding idBlock for ASN.1 schema"}};if(r.idBlock.fromBER(n,0,n.byteLength)===-1)return{verified:!1,result:{error:"Error decoding idBlock for ASN.1 schema"}};if(r.idBlock.hasOwnProperty(sv)===!1)return{verified:!1,result:{error:"Wrong ASN.1 schema"}};if(r.idBlock.tagClass!==e.idBlock.tagClass)return{verified:!1,result:t};if(r.idBlock.hasOwnProperty(cv)===!1)return{verified:!1,result:{error:"Wrong ASN.1 schema"}};if(r.idBlock.tagNumber!==e.idBlock.tagNumber)return{verified:!1,result:t};if(r.idBlock.hasOwnProperty(lv)===!1)return{verified:!1,result:{error:"Wrong ASN.1 schema"}};if(r.idBlock.isConstructed!==e.idBlock.isConstructed)return{verified:!1,result:t};if(!(ov in r.idBlock))return{verified:!1,result:{error:"Wrong ASN.1 schema"}};if(r.idBlock.isHexOnly!==e.idBlock.isHexOnly)return{verified:!1,result:t};if(r.idBlock.isHexOnly){if(!(im in r.idBlock))return{verified:!1,result:{error:"Wrong ASN.1 schema"}};let o=r.idBlock.valueHexView,a=e.idBlock.valueHexView;if(o.length!==a.length)return{verified:!1,result:t};for(let s=0;s<o.length;s++)if(o[s]!==a[1])return{verified:!1,result:t}}if(r.name&&(r.name=r.name.replace(/^\s+|\s+$/g,xt),r.name&&(t[r.name]=e)),r instanceof J.Constructed){let o=0,a={verified:!1,result:{error:"Unknown error"}},s=r.valueBlock.value.length;if(s>0&&r.valueBlock.value[0]instanceof _i&&(s=e.valueBlock.value.length),s===0)return{verified:!0,result:t};if(e.valueBlock.value.length===0&&r.valueBlock.value.length!==0){let l=!0;for(let d=0;d<r.valueBlock.value.length;d++)l=l&&(r.valueBlock.value[d].optional||!1);return l?{verified:!0,result:t}:(r.name&&(r.name=r.name.replace(/^\s+|\s+$/g,xt),r.name&&delete t[r.name]),t.error="Inconsistent object length",{verified:!1,result:t})}for(let l=0;l<s;l++)if(l-o>=e.valueBlock.value.length){if(r.valueBlock.value[l].optional===!1){let d={verified:!1,result:t};return t.error="Inconsistent length between ASN.1 data and schema",r.name&&(r.name=r.name.replace(/^\s+|\s+$/g,xt),r.name&&(delete t[r.name],d.name=r.name)),d}}else if(r.valueBlock.value[0]instanceof _i){if(a=Wr(t,e.valueBlock.value[l],r.valueBlock.value[0].value),a.verified===!1)if(r.valueBlock.value[0].optional)o++;else return r.name&&(r.name=r.name.replace(/^\s+|\s+$/g,xt),r.name&&delete t[r.name]),a;if(Nd in r.valueBlock.value[0]&&r.valueBlock.value[0].name.length>0){let d={};pv in r.valueBlock.value[0]&&r.valueBlock.value[0].local?d=e:d=t,typeof d[r.valueBlock.value[0].name]>"u"&&(d[r.valueBlock.value[0].name]=[]),d[r.valueBlock.value[0].name].push(e.valueBlock.value[l])}}else if(a=Wr(t,e.valueBlock.value[l-o],r.valueBlock.value[l]),a.verified===!1)if(r.valueBlock.value[l].optional)o++;else return r.name&&(r.name=r.name.replace(/^\s+|\s+$/g,xt),r.name&&delete t[r.name]),a;if(a.verified===!1){let l={verified:!1,result:t};return r.name&&(r.name=r.name.replace(/^\s+|\s+$/g,xt),r.name&&(delete t[r.name],l.name=r.name)),l}return{verified:!0,result:t}}if(r.primitiveSchema&&im in e.valueBlock){let o=Xc(e.valueBlock.valueHexView);if(o.offset===-1){let a={verified:!1,result:o.result};return r.name&&(r.name=r.name.replace(/^\s+|\s+$/g,xt),r.name&&(delete t[r.name],a.name=r.name)),a}return Wr(t,o.result,r.primitiveSchema)}return{verified:!0,result:t}}function Ev(t,e){if(!(e instanceof Object))return{verified:!1,result:{error:"Wrong ASN.1 schema type"}};let r=Xc(be.BufferSourceConverter.toUint8Array(t));return r.offset===-1?{verified:!1,result:r.result}:Wr(r.result,r.result,e)}var kv="[object ArrayBuffer]",Sv="[object SharedArrayBuffer]";function Vm(t){return Object.prototype.toString.call(t)}function Cv(t){if(ArrayBuffer.isView(t))return!0;if(!t||typeof t!="object")return!1;let e=t;return typeof e.byteOffset=="number"&&typeof e.byteLength=="number"&&Yc(e.buffer)}function Jc(t){return Vm(t)===kv}function Wm(t){return typeof SharedArrayBuffer<"u"&&Vm(t)===Sv}function Yc(t){return Jc(t)||Wm(t)}function Ud(t){return Cv(t)}function Er(t){return Yc(t)||Ud(t)}function $d(t){if(!Er(t))throw new TypeError("Expected ArrayBuffer, SharedArrayBuffer, or ArrayBufferView")}function at(t){return $d(t),Yc(t)?new Uint8Array(t):new Uint8Array(t.buffer,t.byteOffset,t.byteLength)}function ke(t){if($d(t),Jc(t))return t;let e=new ArrayBuffer(t.byteLength);return new Uint8Array(e).set(at(t)),e}function Fa(t,e,r={}){let n=at(t),i=at(e);if(!r.constantTime&&n.byteLength!==i.byteLength)return!1;let o=Math.max(n.byteLength,i.byteLength),a=n.byteLength^i.byteLength;for(let s=0;s<o;s++)a|=(n[s]??0)^(i[s]??0);return a===0}var Jr={};Dt(Jr,{binary:()=>_v,decode:()=>Zc,encode:()=>Qc,is:()=>zm});function Qc(t){let e=at(t),r="";for(let n of e)r+=String.fromCharCode(n);return r}function Zc(t){let e=new Uint8Array(t.length);for(let r=0;r<t.length;r++)e[r]=t.charCodeAt(r)&255;return e}function zm(t){return typeof t=="string"}var _v={encode:Qc,decode:Zc,is:zm};var qe={};Dt(qe,{decode:()=>Vd,encode:()=>Gd,format:()=>Qm,formats:()=>Zm,hex:()=>Uv,is:()=>Jm,normalize:()=>za,parse:()=>Ym});var Rv=/^[0-9a-f]$/i,Bv=[" ","	",`
`,"\r",":","-","."];function Mv(t){return t.separators==="none"?[]:!t.separators||t.separators==="common"?Bv:t.separators}function Pv(t){if(!t)throw new TypeError("Hex separators must be non-empty strings")}function Ov(t,e,r){for(let n of r)if(t.startsWith(n,e))return n}function Nv(t){let e=/[A-F]/.test(t),r=/[a-f]/.test(t);return e&&!r?"upper":"lower"}function Dv(t){let e=/\r\n|\n/.exec(t);if(e)return e[0]===`\r
`?`\r
`:`
`}function qm(t){return t.replace(/[^0-9a-f]/gi,"")}function Lv(t){let e=t.match(/[0-9A-Fa-f]+|[^0-9A-Fa-f]+/g)??[];if(e.length<3)return;let r=e.filter((a,s)=>s%2===0),n=e.filter((a,s)=>s%2===1),i=n[0];if(!i||n.some(a=>a!==i)||r.some(a=>a.length===0||a.length%2!==0))return;let o=r[0]?.length??0;if(o&&!r.slice(0,-1).some(a=>a.length!==o)&&!((r[r.length-1]?.length??0)>o))return{size:o/2,separator:i}}function jv(t){let e=t.trim(),r=/^0x/i.test(e)?"0x":"",n=r?e.slice(2):e,i=Dv(n),o=n.split(/\r\n|\n/).filter(d=>d.length>0),a=o[0]?.trim()??"",s=Lv(a),l={case:Nv(e),prefix:r};if(s&&(l.group=s),i&&o.length>1){let d=qm(o[0]??"").length/2;d>0&&o.slice(0,-1).every(p=>qm(p).length/2===d)&&(l.line={bytesPerLine:d,separator:i})}return l}function Hv(t,e){let r=e.allowPrefix??!0,n=[...Mv(e)].sort((s,l)=>l.length-s.length);for(let s of n)Pv(s);let i=t.trim();if(/^0x/i.test(i)){if(!r)throw new TypeError("Hexadecimal text must not include a 0x prefix");i=i.slice(2)}let o="",a=!1;for(let s=0;s<i.length;){let l=i[s]??"";if(Rv.test(l)){o+=l,a=!1,s+=1;continue}let d=Ov(i,s,n);if(!d)throw new TypeError("Input is not valid hexadecimal text");if(e.strict&&(a||o.length===0))throw new TypeError("Hexadecimal text contains misplaced separators");a=!0,s+=d.length}if(e.strict&&a&&o.length>0)throw new TypeError("Hexadecimal text must not end with a separator");if(o.length%2!==0){if(!e.allowOddLength)throw new TypeError("Hexadecimal text must contain an even number of characters");o=`0${o}`}return o.toLowerCase()}function Xm(t,e){if(!e)return t.join("");if(!Number.isInteger(e.size)||e.size<1)throw new RangeError("Hex group size must be a positive integer");let r=[];for(let n=0;n<t.length;n+=e.size)r.push(t.slice(n,n+e.size).join(""));return r.join(e.separator)}function za(t,e={}){return Hv(t,e)}function Jm(t,e={}){if(typeof t!="string")return!1;try{return za(t,e),!0}catch{return!1}}function Gd(t,e={}){let r=at(t),n=e.case??"lower",i=Array.from(r,a=>{let s=a.toString(16).padStart(2,"0");return n==="upper"?s.toUpperCase():s}),o="";if(e.line){let a=e.line.bytesPerLine;if(!Number.isInteger(a)||a<1)throw new RangeError("Hex bytesPerLine must be a positive integer");let s=e.line.separator??`
`,l=[];for(let d=0;d<i.length;d+=a)l.push(Xm(i.slice(d,d+a),e.group));o=l.join(s)}else o=Xm(i,e.group);return`${e.prefix??""}${o}`}function Vd(t,e={}){let r=za(t,e),n=new Uint8Array(r.length/2);for(let i=0;i<r.length;i+=2)n[i/2]=Number.parseInt(r.slice(i,i+2),16);return n}function Ym(t,e={}){let r=za(t,e);return{bytes:Vd(r),format:jv(t),normalized:r}}function Qm(t,e){return Gd(t,e)}var Zm={compact:Object.freeze({}),upper:Object.freeze({case:"upper"}),colon:Object.freeze({group:{size:1,separator:":"}}),colonUpper:Object.freeze({case:"upper",group:{size:1,separator:":"}}),groupsOf4:Object.freeze({group:{size:4,separator:" "}}),prefixed:Object.freeze({prefix:"0x"})},Uv={encode:Gd,decode:Vd,format:Qm,formats:Zm,is:Jm,normalize:za,parse:Ym};var Sn={};Dt(Sn,{decode:()=>th,encode:()=>eh,utf8:()=>$v});function eh(t){return new TextEncoder().encode(t)}function th(t){return new TextDecoder("utf-8",{fatal:!1}).decode(at(t))}var $v={encode:eh,decode:th};var kr={};Dt(kr,{decode:()=>nh,encode:()=>rh,utf16:()=>Gv});function rh(t,e={}){let r=new ArrayBuffer(t.length*2),n=new DataView(r);for(let i=0;i<t.length;i++)n.setUint16(i*2,t.charCodeAt(i),e.littleEndian??!1);return new Uint8Array(r)}function nh(t,e={}){let r=ke(t),n=new DataView(r),i="";for(let o=0;o<r.byteLength;o+=2)i+=String.fromCharCode(n.getUint16(o,e.littleEndian??!1));return i}var Gv={encode:rh,decode:nh};var $t={};Dt($t,{base64:()=>Cn,decode:()=>sh,encode:()=>ah,is:()=>Wd,normalize:()=>el,pad:()=>oh});var Vv=/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;function ih(){return globalThis.Buffer}function el(t){return t.replace(/[\n\r\t ]/g,"")}function oh(t){let e=t.length%4;return e?t+"=".repeat(4-e):t}function Wd(t){if(typeof t!="string")return!1;let e=el(t);return e===""||Vv.test(e)}function ah(t,e){let r=at(t),n=ih();return n?n.from(r).toString("base64"):btoa(Qc(r))}function sh(t,e){let r=el(t);if(!Wd(r))throw new TypeError("Input is not valid Base64 text");let n=ih();return n?new Uint8Array(n.from(r,"base64")):Zc(atob(r))}var Cn={encode:ah,decode:sh,is:Wd,normalize:el,pad:oh};var ir={};Dt(ir,{base64url:()=>Kv,decode:()=>lh,encode:()=>ch,is:()=>Kd,normalize:()=>tl});var Wv=/^[A-Za-z0-9_-]*$/;function tl(t){return t.replace(/[\n\r\t ]/g,"")}function Kd(t){return typeof t=="string"&&Wv.test(tl(t))}function ch(t,e){return Cn.encode(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/g,"")}function lh(t,e){let r=tl(t);if(!Kd(r))throw new TypeError("Input is not valid Base64Url text");return Cn.decode(Cn.pad(r.replace(/-/g,"+").replace(/_/g,"/")))}var Kv={encode:ch,decode:lh,is:Kd,normalize:tl};var Fv=/^[A-Z0-9][A-Z0-9 ._-]*[A-Z0-9]$/i,dh=/-----BEGIN ([^-]+)-----([\s\S]*?)-----END \1-----/g;function uh(t){if(!Fv.test(t))throw new TypeError(`Invalid PEM label '${t}'`)}function zv(t,e){let r=[];for(let n=0;n<t.length;n+=e)r.push(t.slice(n,n+e));return r}function qv(t){let r=t.trim().replace(/\r\n/g,`
`).split(`
`).map(o=>o.trim()).filter(Boolean),n={},i=0;for(;i<r.length;i++){let o=r[i],a=o.indexOf(":");if(a<=0)break;n[o.slice(0,a).trim()]=o.slice(a+1).trim()}return{headers:Object.keys(n).length?n:void 0,base64Lines:r.slice(i),base64Text:r.slice(i).join("")}}function Xv(t){return/\r\n/.test(t)?`\r
`:`
`}function ph(t,e={}){let r=[],n=e.label,i;for(dh.lastIndex=0;i=dh.exec(t);){let o=i[1].trim();if(n&&o!==n)continue;uh(o);let a=qv(i[2]);r.push({label:o,data:Cn.decode(a.base64Text),headers:a.headers,lineLength:a.base64Lines[0]?.length??64,newline:Xv(i[0])})}if(e.strict&&r.length===0)throw new TypeError(n?`No PEM block with label '${n}' was found`:"No PEM blocks were found");return r}function rl(t,e,r={}){uh(t);let n=r.lineLength??64;if(!Number.isInteger(n)||n<1)throw new RangeError("PEM lineLength must be a positive integer");let i=r.newline??`
`,o=[`-----BEGIN ${t}-----`];if(r.headers){for(let[a,s]of Object.entries(r.headers))o.push(`${a}: ${s}`);o.push("")}return o.push(...zv(Cn.encode(e),n)),o.push(`-----END ${t}-----`),`${o.join(i)}${i}`}function fh(t,e={}){return ph(t,e).map(({lineLength:r,newline:n,...i})=>i)}function mh(t,e){let[r]=fh(t,{label:e,strict:!0});return r.data}function hh(t,e={}){let[r]=ph(t,{...e,strict:!0}),n={label:r.label,headers:r.headers,lineLength:r.lineLength,newline:r.newline};return{bytes:r.data,format:n,normalized:rl(r.label,r.data,n)}}function gh(t,e){return rl(e.label,t,e)}var qa={name:"pem",encode:(t,e)=>{if(!e?.label)throw new TypeError("PEM label is required");return rl(e.label,t,e)},decode:(t,e)=>mh(t,e?.label),format:gh,is:t=>typeof t=="string"&&/-----BEGIN [^-]+-----/.test(t),parse:hh};function Sr(t){return t.trim().toLowerCase()}function Jv(t){return t instanceof Error?t:new Error(String(t))}function bh(t,e,r){for(let n of[r.name,...r.aliases??[]])t.delete(Sr(n));e.delete(Sr(r.name))}function Fd(t,e,r){let n=t[r];if(typeof n!="function")throw new Error(`Converter '${e}' does not support ${r}()`);return n}function Yv(t,e,r){let n=Sr(r.name||t),i=e.trim();if(!i)return 0;let o=!1;r.is&&(o=r.is(e));let a=!1;try{r.decode(e),a=!0}catch{a=!1}if(!o&&!a)return 0;switch(n){case"pem":return/-----BEGIN [^-]+-----/.test(e)?1:0;case"hex":{let s=i.replace(/^0x/i,"").replace(/[\s:.-]/g,"");return!s||/[^0-9a-f]/i.test(s)||s.length%2!==0?0:/^0x/i.test(i)||/[:\s.-]/.test(i)?.95:/[a-f]/.test(i)||/[A-F]/.test(i)?.8:.45}case"base64url":return/[-_]/.test(i)?.95:/=/.test(i)?.1:.6;case"base64":return/[+/=]/.test(i)?.9:.55;case"binary":case"utf8":case"utf16be":case"utf16le":return 0;default:return o&&a?.75:.5}}function zd(t=[]){let e=new Map,r=new Set,n={register(i,o={}){if(!i.name||!Sr(i.name))throw new TypeError("Converter name is required");let a=[...new Set([i.name,...i.aliases??[]].map(Sr))],s=new Set;for(let l of a){let d=e.get(l);if(d){if(!o.override)throw new Error(`Converter '${l}' is already registered`);s.add(d)}}for(let l of s)bh(e,r,l);for(let l of a)e.set(l,i);return r.add(Sr(i.name)),this},unregister(i){let o=e.get(Sr(i));return o?(bh(e,r,o),!0):!1},has(i){return e.has(Sr(i))},get(i){let o=e.get(Sr(i));if(!o)throw new Error(`Converter '${i}' is not registered`);return o},list(){return[...r].map(i=>this.get(i))},encode(i,o,a){return this.get(i).encode(o,a)},decode(i,o,a){return this.get(i).decode(o,a)},tryDecode(i,o,a){try{return{ok:!0,bytes:this.decode(i,o,a)}}catch(s){return{ok:!1,error:Jv(s)}}},normalize(i,o,a){let s=this.get(i);return Fd(s,i,"normalize").call(s,o,a)},parse(i,o,a){let s=this.get(i);return Fd(s,i,"parse").call(s,o,a)},format(i,o,a){let s=this.get(i);return Fd(s,i,"format").call(s,o,a)},transcode(i,o){let a=this.decode(o.from,i,o.fromOptions);return this.encode(o.to,a,o.toOptions)},detect(i,o={}){let a=o.formats?.length?o.formats.map(l=>String(l)):this.list().map(l=>l.name).filter(l=>!["binary","utf8","utf16be","utf16le"].includes(Sr(l))),s=new Map;for(let l of a){let d=this.get(l),p=Yv(l,i,d);if(p<=0)continue;let m=d.name,y=s.get(m);(!y||p>y.confidence)&&s.set(m,{format:m,confidence:p})}return[...s.values()].sort((l,d)=>d.confidence-l.confidence)}};for(let i of t)n.register(i);return n}var yh={name:"binary",aliases:["latin1"],encode:Jr.encode,decode:Jr.decode,is:Jr.is},vh={name:"hex",encode:qe.encode,decode:qe.decode,format:qe.format,is:qe.is,normalize:qe.normalize,parse:qe.parse},wh={name:"base64",aliases:["b64"],encode:$t.encode,decode:$t.decode,is:$t.is,normalize:$t.normalize},xh={name:"base64url",aliases:["base64-url","b64url"],encode:ir.encode,decode:ir.decode,is:ir.is,normalize:ir.normalize},Ah={name:"utf8",aliases:["utf-8"],encode:t=>Sn.decode(t),decode:t=>Sn.encode(t),is:t=>typeof t=="string"},Eh={name:"utf16be",aliases:["utf16","utf-16","utf-16be"],encode:t=>kr.decode(t),decode:t=>kr.encode(t),is:t=>typeof t=="string"},kh={name:"utf16le",aliases:["utf-16le","ucs2","usc2"],encode:t=>kr.decode(t,{littleEndian:!0}),decode:t=>kr.encode(t,{littleEndian:!0}),is:t=>typeof t=="string"},Sh=[yh,vh,wh,xh,Ah,Eh,kh,qa],Cr=zd(Sh);function qd(t,e,...r){return Cr.encode(t,e,...r)}function Xd(t,e,...r){return Cr.decode(t,e,...r)}function Qv(t,e,...r){return Cr.tryDecode(t,e,...r)}function Zv(t,e,...r){return Cr.normalize(t,e,...r)}function ew(t,e,...r){return Cr.parse(t,e,...r)}function tw(t,e,r){return Cr.format(t,e,r)}function rw(t,e){return Cr.transcode(t,e)}function nw(t,e){return Cr.detect(t,e)}function iw(t){return t.toLowerCase()}var Ch={encode:qd,decode:Xd,tryDecode:Qv,normalize:Zv,parse:ew,format:tw,transcode:rw,detect:nw,to(t,e,...r){return qd(t,e,...r)},from(t,e,...r){return Xd(t,e,...r)},toString(t,e="utf8"){return qd(e,t)},fromString(t,e="utf8"){return iw(e)==="hex"?ke(qe.decode(t,{allowOddLength:!0})):ke(Xd(e,t))},toBase64:$t.encode,fromBase64:t=>ke($t.decode(t)),toBase64Url:ir.encode,fromBase64Url:t=>ke(ir.decode(t)),toHex:qe.encode,fromHex:t=>ke(qe.decode(t,{allowOddLength:!0})),toBinary:Jr.encode,fromBinary:t=>ke(Jr.decode(t)),toUtf8String:Sn.decode,fromUtf8String:t=>ke(Sn.encode(t)),toUtf16String:(t,e=!1)=>kr.decode(t,{littleEndian:e}),fromUtf16String:(t,e=!1)=>ke(kr.encode(t,{littleEndian:e})),isHex:qe.is,isBase64:$t.is,isBase64Url:ir.is,formatString:$t.normalize};var x;(function(t){t[t.Sequence=0]="Sequence",t[t.Set=1]="Set",t[t.Choice=2]="Choice"})(x||(x={}));var f;(function(t){t[t.Any=1]="Any",t[t.Boolean=2]="Boolean",t[t.OctetString=3]="OctetString",t[t.BitString=4]="BitString",t[t.Integer=5]="Integer",t[t.Enumerated=6]="Enumerated",t[t.ObjectIdentifier=7]="ObjectIdentifier",t[t.Utf8String=8]="Utf8String",t[t.BmpString=9]="BmpString",t[t.UniversalString=10]="UniversalString",t[t.NumericString=11]="NumericString",t[t.PrintableString=12]="PrintableString",t[t.TeletexString=13]="TeletexString",t[t.VideotexString=14]="VideotexString",t[t.IA5String=15]="IA5String",t[t.GraphicString=16]="GraphicString",t[t.VisibleString=17]="VisibleString",t[t.GeneralString=18]="GeneralString",t[t.CharacterString=19]="CharacterString",t[t.UTCTime=20]="UTCTime",t[t.GeneralizedTime=21]="GeneralizedTime",t[t.DATE=22]="DATE",t[t.TimeOfDay=23]="TimeOfDay",t[t.DateTime=24]="DateTime",t[t.Duration=25]="Duration",t[t.TIME=26]="TIME",t[t.Null=27]="Null",t[t.RelativeObjectIdentifier=28]="RelativeObjectIdentifier"})(f||(f={}));var Gt=class{unusedBits=0;value=new ArrayBuffer(0);constructor(e,r=0){if(e)if(typeof e=="number")this.fromNumber(e);else if(Er(e))this.unusedBits=r,this.value=ke(e);else throw TypeError("Unsupported type of 'params' argument for BitString")}fromASN(e){if(!(e instanceof nr))throw new TypeError("Argument 'asn' is not instance of ASN.1 BitString");return this.unusedBits=e.valueBlock.unusedBits,this.value=ke(e.valueBlock.valueHex),this}toASN(){return new nr({unusedBits:this.unusedBits,valueHex:this.value})}toSchema(e){return new nr({name:e})}toNumber(){let e="",r=new Uint8Array(this.value);for(let n of r)e+=n.toString(2).padStart(8,"0");return e=e.split("").reverse().join(""),this.unusedBits&&(e=e.slice(this.unusedBits).padStart(this.unusedBits,"0")),parseInt(e,2)}fromNumber(e){let r=e.toString(2),n=r.length+7>>3;this.unusedBits=(n<<3)-r.length;let i=new Uint8Array(n);r=r.padStart(n<<3,"0").split("").reverse().join("");let o=0;for(;o<n;)i[o]=parseInt(r.slice(o<<3,(o<<3)+8),2),o++;this.value=i.buffer}};var V=class{buffer;get byteLength(){return this.buffer.byteLength}get byteOffset(){return 0}constructor(e){typeof e=="number"?this.buffer=new ArrayBuffer(e):Er(e)?this.buffer=ke(e):Array.isArray(e)?this.buffer=new Uint8Array(e).buffer:this.buffer=new ArrayBuffer(0)}fromASN(e){if(!(e instanceof rr))throw new TypeError("Argument 'asn' is not instance of ASN.1 OctetString");return this.buffer=ke(e.valueBlock.valueHex),this}toASN(){return new rr({valueHex:this.buffer})}toSchema(e){return new rr({name:e})}};var ow={fromASN:t=>t instanceof tr?null:ke(t.valueBeforeDecodeView),toASN:t=>{if(t===null)return new tr;let e=Xr(t,{maxDepth:1/0,maxNodes:1/0,maxContentLength:1/0});if(e.result.error)throw new Error(e.result.error);return e.result}},aw={fromASN:t=>t.valueBlock.valueHexView.byteLength>=4?t.valueBlock.toString():t.valueBlock.valueDec,toASN:t=>new zr({value:+t})},sw={fromASN:t=>t.valueBlock.valueDec,toASN:t=>new hi({value:t})},ye={fromASN:t=>ke(t.valueBlock.valueHexView),toASN:t=>new zr({valueHex:t})};var cw={fromASN:t=>ke(t.valueBlock.valueHexView),toASN:t=>new nr({valueHex:t})},lw={fromASN:t=>t.valueBlock.toString(),toASN:t=>new gi({value:t})},dw={fromASN:t=>t.valueBlock.toString(),toASN:t=>new bi({value:t})},uw={fromASN:t=>t.valueBlock.value,toASN:t=>new mi({value:t})},_o={fromASN:t=>ke(t.valueBlock.valueHexView),toASN:t=>new rr({valueHex:t})},Th={fromASN:t=>new V(t.getValue()),toASN:t=>t.toASN()};function Vt(t){return{fromASN:e=>e.valueBlock.value,toASN:e=>new t({value:e})}}var Jd=Vt(Ut),pw=Vt(yi),fw=Vt(vi),mw=Vt(wi),hw=Vt(xi),gw=Vt(Ai),bw=Vt(Ei),yw=Vt(ki),vw=Vt(Si),ww=Vt(En),xw=Vt(Ci),Aw=Vt(Ti),Ew={fromASN:t=>t.toDate(),toASN:t=>new kn({valueDate:t})},kw={fromASN:t=>t.toDate(),toASN:t=>new Ii({valueDate:t})},Sw={fromASN:()=>null,toASN:()=>new tr};function Tn(t){switch(t){case f.Any:return ow;case f.BitString:return cw;case f.BmpString:return pw;case f.Boolean:return uw;case f.CharacterString:return Aw;case f.Enumerated:return sw;case f.GeneralString:return xw;case f.GeneralizedTime:return kw;case f.GraphicString:return vw;case f.IA5String:return yw;case f.Integer:return aw;case f.Null:return Sw;case f.NumericString:return mw;case f.ObjectIdentifier:return lw;case f.RelativeObjectIdentifier:return dw;case f.OctetString:return _o;case f.PrintableString:return hw;case f.TeletexString:return gw;case f.UTCTime:return Ew;case f.UniversalString:return fw;case f.Utf8String:return Jd;case f.VideotexString:return bw;case f.VisibleString:return ww;default:return null}}function Wt(t){return typeof t=="function"&&t.prototype?t.prototype.toASN&&t.prototype.fromASN?!0:Wt(t.prototype):!!(t&&typeof t=="object"&&"toASN"in t&&"fromASN"in t)}function Qd(t){if(t){let e=Object.getPrototypeOf(t);return e?.prototype?.constructor===Array?!0:Qd(e)}return!1}function Ih(t,e){if(!(t&&e)||t.byteLength!==e.byteLength)return!1;let r=new Uint8Array(t),n=new Uint8Array(e);for(let i=0;i<t.byteLength;i++)if(r[i]!==n[i])return!1;return!0}var nl=class{items=new WeakMap;has(e){return this.items.has(e)}get(e,r=!1){let n=this.items.get(e);if(!n)throw new Error(`Cannot get schema for '${e.prototype.constructor.name}' target`);if(r&&!n.schema)throw new Error(`Schema '${e.prototype.constructor.name}' doesn't contain ASN.1 schema. Call 'AsnSchemaStorage.cache'.`);return n}cache(e){let r=this.get(e);r.schema||(r.schema=this.create(e,!0))}createDefault(e){let r={type:x.Sequence,items:{}},n=this.findParentSchema(e);return n&&(Object.assign(r,n),r.items=Object.assign({},r.items,n.items)),r}create(e,r){let n=this.items.get(e)||this.createDefault(e),i=[];for(let o in n.items){let a=n.items[o],s=r?o:"",l;if(typeof a.type=="number"){let p=f[a.type],m=Ar[p];if(!m)throw new Error(`Cannot get ASN1 class by name '${p}'`);l=new m({name:s})}else Wt(a.type)?l=new a.type().toSchema(s):a.optional?this.get(a.type).type===x.Choice?l=new vr({name:s}):(l=this.create(a.type,!1),l.name=s):l=new vr({name:s});let d=!!a.optional||a.defaultValue!==void 0;if(a.repeated){l.name="";let p=a.repeated==="set"?ut:ot;l=new p({name:"",value:[new _i({name:s,value:l})]})}if(a.context!==null&&a.context!==void 0)if(a.implicit)if(typeof a.type=="number"||Wt(a.type)){let p=a.repeated?$e:Fr;i.push(new p({name:s,optional:d,idBlock:{tagClass:3,tagNumber:a.context}}))}else{this.cache(a.type);let p=!!a.repeated,m=p?l:this.get(a.type,!0).schema;m="valueBlock"in m?m.valueBlock.value:m.value,i.push(new $e({name:p?"":s,optional:d,idBlock:{tagClass:3,tagNumber:a.context},value:m}))}else i.push(new $e({optional:d,idBlock:{tagClass:3,tagNumber:a.context},value:[l]}));else l.optional=d,i.push(l)}switch(n.type){case x.Sequence:return new ot({value:i,name:""});case x.Set:return new ut({value:i,name:""});case x.Choice:return new Io({value:i,name:""});default:throw new Error("Unsupported ASN1 type in use")}}set(e,r){return this.items.set(e,r),this}findParentSchema(e){let r=Object.getPrototypeOf(e);return r?this.items.get(r)||this.findParentSchema(r):null}};var Ge=new nl;var C=t=>e=>{let r;Ge.has(e)?r=Ge.get(e):(r=Ge.createDefault(e),Ge.set(e,r)),Object.assign(r,t)};var u=t=>(e,r)=>{let n;Ge.has(e.constructor)?n=Ge.get(e.constructor):(n=Ge.createDefault(e.constructor),Ge.set(e.constructor,n));let i=Object.assign({},t);if(typeof i.type=="number"&&!i.converter){let o=Tn(t.type);if(!o)throw new Error(`Cannot get default converter for property '${r}' of ${e.constructor.name}`);i.converter=o}i.raw=t.raw,n.items[r]=i};var In=class extends Error{schemas=[]};var Re=class{static parse(e,r,n){let i=Xr(ke(e),n?.berOptions);if(i.result.error)throw new Error(i.result.error);return this.fromASN(i.result,r,n)}static fromASN(e,r,n){try{if(Wt(r))return new r().fromASN(e);let i=Ge.get(r);Ge.cache(r);let o=i.schema,a=this.handleChoiceTypes(e,i,r,o,n);if(a?.result)return a.result;a?.targetSchema&&(o=a.targetSchema);let s=this.handleSequenceTypes(e,i,r,o),l=new r;return Qd(r)?this.handleArrayTypes(e,i,r,n):(this.processSchemaItems(i,s,l,n),l)}catch(i){throw i instanceof In&&i.schemas.push(r.name),i}}static handleChoiceTypes(e,r,n,i,o){if(e.constructor===$e&&r.type===x.Choice&&e.idBlock.tagClass===3)for(let a in r.items){let s=r.items[a];if(s.context===e.idBlock.tagNumber&&s.implicit&&typeof s.type=="function"&&Ge.has(s.type)){let l=Ge.get(s.type);if(l&&l.type===x.Sequence){let d=new ot;if("value"in e.valueBlock&&Array.isArray(e.valueBlock.value)&&"value"in d.valueBlock){d.valueBlock.value=e.valueBlock.value;let p=this.fromASN(d,s.type,o),m=new n;return m[a]=p,{result:m}}}}}else if(e.constructor===$e&&r.type!==x.Choice){let a=new $e({idBlock:{tagClass:3,tagNumber:e.idBlock.tagNumber},value:r.schema.valueBlock.value});for(let s in r.items)delete e[s];return{targetSchema:a}}return null}static handleSequenceTypes(e,r,n,i){if(r.type===x.Sequence){let o=Wr({},e,i);if(!o.verified)throw new In(`Data does not match to ${n.name} ASN1 schema.${o.result.error?` ${o.result.error}`:""}`);return o}else{let o=Wr({},e,i);if(!o.verified)throw new In(`Data does not match to ${n.name} ASN1 schema.${o.result.error?` ${o.result.error}`:""}`);return o}}static processRepeatedField(e,r,n){let i=e.slice(r);if(i.length===1&&i[0].constructor.name==="Sequence"){let o=i[0];o.valueBlock&&o.valueBlock.value&&Array.isArray(o.valueBlock.value)&&(i=o.valueBlock.value)}if(typeof n.type=="number"){let o=Tn(n.type);if(!o)throw new Error(`No converter for ASN.1 type ${n.type}`);return i.filter(a=>a&&a.valueBlock).map(a=>{try{return o.fromASN(a)}catch{return}}).filter(a=>a!==void 0)}else return i.filter(o=>o&&o.valueBlock).map(o=>{try{return this.fromASN(o,n.type)}catch{return}}).filter(o=>o!==void 0)}static processPrimitiveField(e,r){let n=Tn(r.type);if(!n)throw new Error(`No converter for ASN.1 type ${r.type}`);return n.fromASN(e)}static isOptionalChoiceField(e){return e.optional&&typeof e.type=="function"&&Ge.has(e.type)&&Ge.get(e.type).type===x.Choice}static processOptionalChoiceField(e,r){try{return{processed:!0,value:this.fromASN(e,r.type)}}catch(n){if(n instanceof In&&/Wrong values for Choice type/.test(n.message))return{processed:!1};throw n}}static handleArrayTypes(e,r,n,i){if(!("value"in e.valueBlock&&Array.isArray(e.valueBlock.value)))throw new Error("Cannot get items from the ASN.1 parsed value. ASN.1 object is not constructed.");let o=r.itemType;if(typeof o=="number"){let a=Tn(o);if(!a)throw new Error(`Cannot get default converter for array item of ${n.name} ASN1 schema`);return n.from(e.valueBlock.value,s=>a.fromASN(s))}else return n.from(e.valueBlock.value,a=>this.fromASN(a,o,i))}static processSchemaItems(e,r,n,i){for(let o in e.items){let a=r.result[o];if(!a)continue;let s=e.items[o],l=s.type,d;typeof l=="number"||Wt(l)?d=this.processPrimitiveSchemaItem(a,s,l,i):d=this.processComplexSchemaItem(a,s,l,i),d&&typeof d=="object"&&"value"in d&&"raw"in d?(n[o]=d.value,n[`${o}Raw`]=d.raw):n[o]=d}}static processPrimitiveSchemaItem(e,r,n,i){let o=r.converter??(Wt(n)?new n:null);if(!o)throw new Error("Converter is empty");return r.repeated?this.processRepeatedPrimitiveItem(e,r,o,i):this.processSinglePrimitiveItem(e,r,n,o,i)}static processRepeatedPrimitiveItem(e,r,n,i){if(r.implicit){let o=r.repeated==="sequence"?ot:ut,a=new o;a.valueBlock=e.valueBlock;let s=Xr(a.toBER(!1),i?.berOptions);if(s.offset===-1)throw new Error(`Cannot parse the child item. ${s.result.error}`);if(!("value"in s.result.valueBlock&&Array.isArray(s.result.valueBlock.value)))throw new Error("Cannot get items from the ASN.1 parsed value. ASN.1 object is not constructed.");let l=s.result.valueBlock.value;return Array.from(l,d=>n.fromASN(d))}else return Array.from(e,o=>n.fromASN(o))}static processSinglePrimitiveItem(e,r,n,i,o){let a=e;if(r.implicit){let s;if(Wt(n))s=new n().toSchema("");else{let l=f[n],d=Ar[l];if(!d)throw new Error(`Cannot get '${l}' class from asn1js module`);s=new d}s.valueBlock=a.valueBlock,a=Xr(s.toBER(!1),o?.berOptions).result}return i.fromASN(a)}static processComplexSchemaItem(e,r,n,i){if(r.repeated){if(!Array.isArray(e))throw new Error("Cannot get list of items from the ASN.1 parsed value. ASN.1 value should be iterable.");return Array.from(e,o=>this.fromASN(o,n,i))}else{let o=this.handleImplicitTagging(e,r,n);if(this.isOptionalChoiceField(r))try{return this.fromASN(o,n,i)}catch(a){if(a instanceof In&&/Wrong values for Choice type/.test(a.message))return;throw a}else{let a=this.fromASN(o,n,i);return r.raw?{value:a,raw:e.valueBeforeDecodeView}:a}}}static handleImplicitTagging(e,r,n){if(r.implicit&&typeof r.context=="number"){let i=Ge.get(n);if(i.type===x.Sequence){let o=new ot;if("value"in e.valueBlock&&Array.isArray(e.valueBlock.value)&&"value"in o.valueBlock)return o.valueBlock.value=e.valueBlock.value,o}else if(i.type===x.Set){let o=new ut;if("value"in e.valueBlock&&Array.isArray(e.valueBlock.value)&&"value"in o.valueBlock)return o.valueBlock.value=e.valueBlock.value,o}}return e}};var Xa=class t{static serialize(e){return e instanceof He?e.toBER(!1):this.toASN(e).toBER(!1)}static toASN(e){if(e&&typeof e=="object"&&Wt(e))return e.toASN();if(!(e&&typeof e=="object"))throw new TypeError("Parameter 1 should be type of Object.");let r=e.constructor,n=Ge.get(r);Ge.cache(r);let i=[];if(n.itemType){if(!Array.isArray(e))throw new TypeError("Parameter 1 should be type of Array.");if(typeof n.itemType=="number"){let a=Tn(n.itemType);if(!a)throw new Error(`Cannot get default converter for array item of ${r.name} ASN1 schema`);i=e.map(s=>a.toASN(s))}else i=e.map(a=>this.toAsnItem({type:n.itemType},"[]",r,a))}else for(let a in n.items){let s=n.items[a],l=e[a];if(l===void 0||s.defaultValue===l||typeof s.defaultValue=="object"&&typeof l=="object"&&Ih(this.serialize(s.defaultValue),this.serialize(l)))continue;let d=t.toAsnItem(s,a,r,l);if(typeof s.context=="number")if(s.implicit)if(!s.repeated&&(typeof s.type=="number"||Wt(s.type))){let p={};p.valueHex=d instanceof tr?ke(d.valueBeforeDecodeView):d.valueBlock.toBER(),i.push(new Fr({optional:s.optional,idBlock:{tagClass:3,tagNumber:s.context},...p}))}else i.push(new $e({optional:s.optional,idBlock:{tagClass:3,tagNumber:s.context},value:d.valueBlock.value}));else i.push(new $e({optional:s.optional,idBlock:{tagClass:3,tagNumber:s.context},value:[d]}));else s.repeated?i=i.concat(d):i.push(d)}let o;switch(n.type){case x.Sequence:o=new ot({value:i});break;case x.Set:o=new ut({value:i});break;case x.Choice:if(!i[0])throw new Error(`Schema '${r.name}' has wrong data. Choice cannot be empty.`);o=i[0];break}return o}static toAsnItem(e,r,n,i){let o;if(typeof e.type=="number"){let a=e.converter;if(!a)throw new Error(`Property '${r}' doesn't have converter for type ${f[e.type]} in schema '${n.name}'`);if(e.repeated){if(!Array.isArray(i))throw new TypeError("Parameter 'objProp' should be type of Array.");let s=Array.from(i,d=>a.toASN(d)),l=e.repeated==="sequence"?ot:ut;o=new l({value:s})}else o=a.toASN(i)}else if(e.repeated){if(!Array.isArray(i))throw new TypeError("Parameter 'objProp' should be type of Array.");let a=Array.from(i,l=>this.toASN(l)),s=e.repeated==="sequence"?ot:ut;o=new s({value:a})}else o=this.toASN(i);return o}};var z=class extends Array{constructor(e=[]){if(typeof e=="number")super(e);else{super();for(let r of e)this.push(r)}}};var G=class t{static serialize(e){return Xa.serialize(e)}static parse(e,r,n){return Re.parse(e,r,n)}static toString(e,r){let n=Er(e)?ke(e):t.serialize(e),i=Xr(n,r?.berOptions);if(i.offset===-1)throw new Error(`Cannot decode ASN.1 data. ${i.result.error}`);return i.result.toString()}};function c(t,e,r,n){var i=arguments.length,o=i<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,r):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(t,e,r,n);else for(var s=t.length-1;s>=0;s--)(a=t[s])&&(o=(i<3?a(o):i>3?a(e,r,o):a(e,r))||o);return i>3&&o&&Object.defineProperty(e,r,o),o}function F(t,e,r,n){if(r==="a"&&!n)throw new TypeError("Private accessor was defined without a getter");if(typeof e=="function"?t!==e||!n:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return r==="m"?n:r==="a"?n.call(t):n?n.value:e.get(t)}function he(t,e,r,n,i){if(n==="m")throw new TypeError("Private method is not writable");if(n==="a"&&!i)throw new TypeError("Private accessor was defined without a setter");if(typeof e=="function"?t!==e||!i:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return n==="a"?i.call(t,r):i?i.value=r:e.set(t,r),r}var Ja=class{static isIPv4(e){return/^(\d{1,3}\.){3}\d{1,3}$/.test(e)}static parseIPv4(e){let r=e.split(".");if(r.length!==4)throw new Error("Invalid IPv4 address");return r.map(n=>{let i=parseInt(n,10);if(isNaN(i)||i<0||i>255)throw new Error("Invalid IPv4 address part");return i})}static parseIPv6(e){let n=this.expandIPv6(e).split(":");if(n.length!==8)throw new Error("Invalid IPv6 address");return n.reduce((i,o)=>{let a=parseInt(o,16);if(isNaN(a)||a<0||a>65535)throw new Error("Invalid IPv6 address part");return i.push(a>>8&255),i.push(a&255),i},[])}static expandIPv6(e){if(!e.includes("::"))return e;let r=e.split("::");if(r.length>2)throw new Error("Invalid IPv6 address");let n=r[0]?r[0].split(":"):[],i=r[1]?r[1].split(":"):[],o=8-(n.length+i.length);if(o<0)throw new Error("Invalid IPv6 address");return[...n,...Array(o).fill("0"),...i].join(":")}static formatIPv6(e){let r=[];for(let n=0;n<16;n+=2)r.push((e[n]<<8|e[n+1]).toString(16));return this.compressIPv6(r.join(":"))}static compressIPv6(e){let r=e.split(":"),n=-1,i=0,o=-1,a=0;for(let s=0;s<r.length;s++)r[s]==="0"?(o===-1&&(o=s),a++):(a>i&&(n=o,i=a),o=-1,a=0);if(a>i&&(n=o,i=a),i>1){let s=r.slice(0,n).join(":"),l=r.slice(n+i).join(":");return`${s}::${l}`}return e}static parseCIDR(e){let[r,n]=e.split("/"),i=parseInt(n,10);if(this.isIPv4(r)){if(i<0||i>32)throw new Error("Invalid IPv4 prefix length");return[this.parseIPv4(r),i]}else{if(i<0||i>128)throw new Error("Invalid IPv6 prefix length");return[this.parseIPv6(r),i]}}static decodeIP(e){if(e.length===64&&parseInt(e,16)===0)return"::/0";if(e.length!==16)return e;let r=parseInt(e.slice(8),16).toString(2).split("").reduce((i,o)=>i+ +o,0),n=e.slice(0,8).replace(/(.{2})/g,i=>`${parseInt(i,16)}.`);return n=n.slice(0,-1),`${n}/${r}`}static toString(e){let r=new Uint8Array(e);if(r.length===4)return Array.from(r).join(".");if(r.length===16)return this.formatIPv6(r);if(r.length===8||r.length===32){let n=r.length/2,i=r.slice(0,n),o=r.slice(n);if(r.every(l=>l===0))return r.length===8?"0.0.0.0/0":"::/0";let s=o.reduce((l,d)=>l+(d.toString(2).match(/1/g)||[]).length,0);return r.length===8?`${Array.from(i).join(".")}/${s}`:`${this.formatIPv6(i)}/${s}`}return this.decodeIP(qe.encode(e))}static fromString(e){if(e.includes("/")){let[n,i]=this.parseCIDR(e),o=new Uint8Array(n.length),a=i;for(let l=0;l<o.length;l++)a>=8?(o[l]=255,a-=8):a>0&&(o[l]=255<<8-a,a=0);let s=new Uint8Array(n.length*2);return s.set(n,0),s.set(o,n.length),s.buffer}let r=this.isIPv4(e)?this.parseIPv4(e):this.parseIPv6(e);return new Uint8Array(r).buffer}};var Zd,eu,tu,Ve=class{teletexString;printableString;universalString;utf8String;bmpString;constructor(e={}){Object.assign(this,e)}toString(){return this.bmpString||this.printableString||this.teletexString||this.universalString||this.utf8String||""}};c([u({type:f.TeletexString})],Ve.prototype,"teletexString",void 0);c([u({type:f.PrintableString})],Ve.prototype,"printableString",void 0);c([u({type:f.UniversalString})],Ve.prototype,"universalString",void 0);c([u({type:f.Utf8String})],Ve.prototype,"utf8String",void 0);c([u({type:f.BmpString})],Ve.prototype,"bmpString",void 0);Ve=c([C({type:x.Choice})],Ve);var Ro=class extends Ve{ia5String;anyValue;constructor(e={}){super(e),Object.assign(this,e)}toString(){return this.ia5String||(this.anyValue?qe.encode(this.anyValue):super.toString())}};c([u({type:f.IA5String})],Ro.prototype,"ia5String",void 0);c([u({type:f.Any})],Ro.prototype,"anyValue",void 0);Ro=c([C({type:x.Choice})],Ro);var Ri=class{type="";value=new Ro;constructor(e={}){Object.assign(this,e)}};c([u({type:f.ObjectIdentifier})],Ri.prototype,"type",void 0);c([u({type:Ro})],Ri.prototype,"value",void 0);var _n=Zd=class extends z{constructor(e){super(e),Object.setPrototypeOf(this,Zd.prototype)}};_n=Zd=c([C({type:x.Set,itemType:Ri})],_n);var ru=eu=class extends z{constructor(e){super(e),Object.setPrototypeOf(this,eu.prototype)}};ru=eu=c([C({type:x.Sequence,itemType:_n})],ru);var Te=tu=class extends ru{constructor(e){super(e),Object.setPrototypeOf(this,tu.prototype)}};Te=tu=c([C({type:x.Sequence})],Te);var Cw={fromASN:t=>Ja.toString(_o.fromASN(t)),toASN:t=>_o.toASN(Ja.fromString(t))},Rn=class{typeId="";value=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};c([u({type:f.ObjectIdentifier})],Rn.prototype,"typeId",void 0);c([u({type:f.Any,context:0})],Rn.prototype,"value",void 0);var Ya=class{nameAssigner;partyName=new Ve;constructor(e={}){Object.assign(this,e)}};c([u({type:Ve,optional:!0,context:0,implicit:!0})],Ya.prototype,"nameAssigner",void 0);c([u({type:Ve,context:1,implicit:!0})],Ya.prototype,"partyName",void 0);var ae=class{otherName;rfc822Name;dNSName;x400Address;directoryName;ediPartyName;uniformResourceIdentifier;iPAddress;registeredID;constructor(e={}){Object.assign(this,e)}};c([u({type:Rn,context:0,implicit:!0})],ae.prototype,"otherName",void 0);c([u({type:f.IA5String,context:1,implicit:!0})],ae.prototype,"rfc822Name",void 0);c([u({type:f.IA5String,context:2,implicit:!0})],ae.prototype,"dNSName",void 0);c([u({type:f.Any,context:3,implicit:!0})],ae.prototype,"x400Address",void 0);c([u({type:Te,context:4,implicit:!1})],ae.prototype,"directoryName",void 0);c([u({type:Ya,context:5})],ae.prototype,"ediPartyName",void 0);c([u({type:f.IA5String,context:6,implicit:!0})],ae.prototype,"uniformResourceIdentifier",void 0);c([u({type:f.OctetString,context:7,implicit:!0,converter:Cw})],ae.prototype,"iPAddress",void 0);c([u({type:f.ObjectIdentifier,context:8,implicit:!0})],ae.prototype,"registeredID",void 0);ae=c([C({type:x.Choice})],ae);var Bn="1.3.6.1.5.5.7",Mn=`${Bn}.1`,_h=`${Bn}.2`,Bi=`${Bn}.3`,il=`${Bn}.48`,Tk=`${_h}.1`,Ik=`${_h}.2`,nu=`${il}.1`,iu=`${il}.2`,ou=`${il}.3`,au=`${il}.5`,ue="2.5.29";var su,ol=`${Mn}.1`,Yr=class{accessMethod="";accessLocation=new ae;constructor(e={}){Object.assign(this,e)}};c([u({type:f.ObjectIdentifier})],Yr.prototype,"accessMethod",void 0);c([u({type:ae})],Yr.prototype,"accessLocation",void 0);var Mi=su=class extends z{constructor(e){super(e),Object.setPrototypeOf(this,su.prototype)}};Mi=su=c([C({type:x.Sequence,itemType:Yr})],Mi);var Qa=`${ue}.35`,Pi=class extends V{},Tr=class{keyIdentifier;authorityCertIssuer;authorityCertSerialNumber;constructor(e={}){e&&Object.assign(this,e)}};c([u({type:Pi,context:0,optional:!0,implicit:!0})],Tr.prototype,"keyIdentifier",void 0);c([u({type:ae,context:1,optional:!0,implicit:!0,repeated:"sequence"})],Tr.prototype,"authorityCertIssuer",void 0);c([u({type:f.Integer,context:2,optional:!0,implicit:!0,converter:ye})],Tr.prototype,"authorityCertSerialNumber",void 0);var Bo=`${ue}.19`,Qr=class{cA=!1;pathLenConstraint;constructor(e={}){Object.assign(this,e)}};c([u({type:f.Boolean,defaultValue:!1})],Qr.prototype,"cA",void 0);c([u({type:f.Integer,optional:!0})],Qr.prototype,"pathLenConstraint",void 0);var cu,Be=cu=class extends z{constructor(e){super(e),Object.setPrototypeOf(this,cu.prototype)}};Be=cu=c([C({type:x.Sequence,itemType:ae})],Be);var lu,Tw=`${ue}.29`,Rh=lu=class extends Be{constructor(e){super(e),Object.setPrototypeOf(this,lu.prototype)}};Rh=lu=c([C({type:x.Sequence})],Rh);var du,sl=`${ue}.32`,oS=`${sl}.0`,Zr=class{ia5String;visibleString;bmpString;utf8String;constructor(e={}){Object.assign(this,e)}toString(){return this.ia5String||this.visibleString||this.bmpString||this.utf8String||""}};c([u({type:f.IA5String})],Zr.prototype,"ia5String",void 0);c([u({type:f.VisibleString})],Zr.prototype,"visibleString",void 0);c([u({type:f.BmpString})],Zr.prototype,"bmpString",void 0);c([u({type:f.Utf8String})],Zr.prototype,"utf8String",void 0);Zr=c([C({type:x.Choice})],Zr);var Za=class{organization=new Zr;noticeNumbers=[];constructor(e={}){Object.assign(this,e)}};c([u({type:Zr})],Za.prototype,"organization",void 0);c([u({type:f.Integer,repeated:"sequence"})],Za.prototype,"noticeNumbers",void 0);var es=class{noticeRef;explicitText;constructor(e={}){Object.assign(this,e)}};c([u({type:Za,optional:!0})],es.prototype,"noticeRef",void 0);c([u({type:Zr,optional:!0})],es.prototype,"explicitText",void 0);var al=class{cPSuri;userNotice;constructor(e={}){Object.assign(this,e)}};c([u({type:f.IA5String})],al.prototype,"cPSuri",void 0);c([u({type:es})],al.prototype,"userNotice",void 0);al=c([C({type:x.Choice})],al);var ts=class{policyQualifierId="";qualifier=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};c([u({type:f.ObjectIdentifier})],ts.prototype,"policyQualifierId",void 0);c([u({type:f.Any})],ts.prototype,"qualifier",void 0);var Oi=class{policyIdentifier="";policyQualifiers;constructor(e={}){Object.assign(this,e)}};c([u({type:f.ObjectIdentifier})],Oi.prototype,"policyIdentifier",void 0);c([u({type:ts,repeated:"sequence",optional:!0})],Oi.prototype,"policyQualifiers",void 0);var rs=du=class extends z{constructor(e){super(e),Object.setPrototypeOf(this,du.prototype)}};rs=du=c([C({type:x.Sequence,itemType:Oi})],rs);var fS=`${ue}.20`,ns=class{value;constructor(e=0){this.value=e}};c([u({type:f.Integer})],ns.prototype,"value",void 0);ns=c([C({type:x.Choice})],ns);var wS=`${ue}.27`,Bh=class extends ns{};Bh=c([C({type:x.Choice})],Bh);var uu,cl=`${ue}.31`,or;(function(t){t[t.unused=1]="unused",t[t.keyCompromise=2]="keyCompromise",t[t.cACompromise=4]="cACompromise",t[t.affiliationChanged=8]="affiliationChanged",t[t.superseded=16]="superseded",t[t.cessationOfOperation=32]="cessationOfOperation",t[t.certificateHold=64]="certificateHold",t[t.privilegeWithdrawn=128]="privilegeWithdrawn",t[t.aACompromise=256]="aACompromise"})(or||(or={}));var is=class extends Gt{toJSON(){let e=[],r=this.toNumber();return r&or.aACompromise&&e.push("aACompromise"),r&or.affiliationChanged&&e.push("affiliationChanged"),r&or.cACompromise&&e.push("cACompromise"),r&or.certificateHold&&e.push("certificateHold"),r&or.cessationOfOperation&&e.push("cessationOfOperation"),r&or.keyCompromise&&e.push("keyCompromise"),r&or.privilegeWithdrawn&&e.push("privilegeWithdrawn"),r&or.superseded&&e.push("superseded"),r&or.unused&&e.push("unused"),e}toString(){return`[${this.toJSON().join(", ")}]`}},en=class{fullName;nameRelativeToCRLIssuer;constructor(e={}){Object.assign(this,e)}};c([u({type:ae,context:0,repeated:"sequence",implicit:!0})],en.prototype,"fullName",void 0);c([u({type:_n,context:1,implicit:!0})],en.prototype,"nameRelativeToCRLIssuer",void 0);en=c([C({type:x.Choice})],en);var Ir=class{distributionPoint;reasons;cRLIssuer;constructor(e={}){Object.assign(this,e)}};c([u({type:en,context:0,optional:!0})],Ir.prototype,"distributionPoint",void 0);c([u({type:is,context:1,optional:!0,implicit:!0})],Ir.prototype,"reasons",void 0);c([u({type:ae,context:2,optional:!0,repeated:"sequence",implicit:!0})],Ir.prototype,"cRLIssuer",void 0);var Pn=uu=class extends z{constructor(e){super(e),Object.setPrototypeOf(this,uu.prototype)}};Pn=uu=c([C({type:x.Sequence,itemType:Ir})],Pn);var pu,NS=`${ue}.46`,Mh=pu=class extends Pn{constructor(e){super(e),Object.setPrototypeOf(this,pu.prototype)}};Mh=pu=c([C({type:x.Sequence,itemType:Ir})],Mh);var GS=`${ue}.28`,Kt=class t{static ONLY=!1;distributionPoint;onlyContainsUserCerts=t.ONLY;onlyContainsCACerts=t.ONLY;onlySomeReasons;indirectCRL=t.ONLY;onlyContainsAttributeCerts=t.ONLY;constructor(e={}){Object.assign(this,e)}};c([u({type:en,context:0,optional:!0})],Kt.prototype,"distributionPoint",void 0);c([u({type:f.Boolean,context:1,defaultValue:Kt.ONLY,implicit:!0})],Kt.prototype,"onlyContainsUserCerts",void 0);c([u({type:f.Boolean,context:2,defaultValue:Kt.ONLY,implicit:!0})],Kt.prototype,"onlyContainsCACerts",void 0);c([u({type:is,context:3,optional:!0,implicit:!0})],Kt.prototype,"onlySomeReasons",void 0);c([u({type:f.Boolean,context:4,defaultValue:Kt.ONLY,implicit:!0})],Kt.prototype,"indirectCRL",void 0);c([u({type:f.Boolean,context:5,defaultValue:Kt.ONLY,implicit:!0})],Kt.prototype,"onlyContainsAttributeCerts",void 0);var fu=`${ue}.21`,os;(function(t){t[t.unspecified=0]="unspecified",t[t.keyCompromise=1]="keyCompromise",t[t.cACompromise=2]="cACompromise",t[t.affiliationChanged=3]="affiliationChanged",t[t.superseded=4]="superseded",t[t.cessationOfOperation=5]="cessationOfOperation",t[t.certificateHold=6]="certificateHold",t[t.removeFromCRL=8]="removeFromCRL",t[t.privilegeWithdrawn=9]="privilegeWithdrawn",t[t.aACompromise=10]="aACompromise"})(os||(os={}));var Mo=class{reason=os.unspecified;constructor(e=os.unspecified){this.reason=e}toJSON(){return os[this.reason]}toString(){return this.toJSON()}};c([u({type:f.Enumerated})],Mo.prototype,"reason",void 0);Mo=c([C({type:x.Choice})],Mo);var mu,Po=`${ue}.37`,Ni=mu=class extends z{constructor(e){super(e),Object.setPrototypeOf(this,mu.prototype)}};Ni=mu=c([C({type:x.Sequence,itemType:f.ObjectIdentifier})],Ni);var ZS=`${Po}.0`,Ph=`${Bi}.1`,Oh=`${Bi}.2`,Nh=`${Bi}.3`,Dh=`${Bi}.4`,Lh=`${Bi}.8`,jh=`${Bi}.9`;var i2=`${ue}.54`,hu=class{value;constructor(e=new ArrayBuffer(0)){this.value=e}};c([u({type:f.Integer,converter:ye})],hu.prototype,"value",void 0);hu=c([C({type:x.Choice})],hu);var gu=`${ue}.24`,Oo=class{value=new Date;constructor(e){e&&(this.value=e)}};c([u({type:f.GeneralizedTime})],Oo.prototype,"value",void 0);Oo=c([C({type:x.Choice})],Oo);var bu,yu=`${ue}.18`,Hh=bu=class extends Be{constructor(e){super(e),Object.setPrototypeOf(this,bu.prototype)}};Hh=bu=c([C({type:x.Sequence})],Hh);var ll=`${ue}.15`,ar;(function(t){t[t.digitalSignature=1]="digitalSignature",t[t.nonRepudiation=2]="nonRepudiation",t[t.keyEncipherment=4]="keyEncipherment",t[t.dataEncipherment=8]="dataEncipherment",t[t.keyAgreement=16]="keyAgreement",t[t.keyCertSign=32]="keyCertSign",t[t.cRLSign=64]="cRLSign",t[t.encipherOnly=128]="encipherOnly",t[t.decipherOnly=256]="decipherOnly"})(ar||(ar={}));var No=class extends Gt{toJSON(){let e=this.toNumber(),r=[];return e&ar.cRLSign&&r.push("crlSign"),e&ar.dataEncipherment&&r.push("dataEncipherment"),e&ar.decipherOnly&&r.push("decipherOnly"),e&ar.digitalSignature&&r.push("digitalSignature"),e&ar.encipherOnly&&r.push("encipherOnly"),e&ar.keyAgreement&&r.push("keyAgreement"),e&ar.keyCertSign&&r.push("keyCertSign"),e&ar.keyEncipherment&&r.push("keyEncipherment"),e&ar.nonRepudiation&&r.push("nonRepudiation"),r}toString(){return`[${this.toJSON().join(", ")}]`}};var vu,S2=`${ue}.30`,Do=class{base=new ae;minimum=0;maximum;constructor(e={}){Object.assign(this,e)}};c([u({type:ae})],Do.prototype,"base",void 0);c([u({type:f.Integer,context:0,defaultValue:0,implicit:!0})],Do.prototype,"minimum",void 0);c([u({type:f.Integer,context:1,optional:!0,implicit:!0})],Do.prototype,"maximum",void 0);var dl=vu=class extends z{constructor(e){super(e),Object.setPrototypeOf(this,vu.prototype)}};dl=vu=c([C({type:x.Sequence,itemType:Do})],dl);var ul=class{permittedSubtrees;excludedSubtrees;constructor(e={}){Object.assign(this,e)}};c([u({type:dl,context:0,optional:!0,implicit:!0})],ul.prototype,"permittedSubtrees",void 0);c([u({type:dl,context:1,optional:!0,implicit:!0})],ul.prototype,"excludedSubtrees",void 0);var B2=`${ue}.36`,pl=class{requireExplicitPolicy;inhibitPolicyMapping;constructor(e={}){Object.assign(this,e)}};c([u({type:f.Integer,context:0,implicit:!0,optional:!0,converter:ye})],pl.prototype,"requireExplicitPolicy",void 0);c([u({type:f.Integer,context:1,implicit:!0,optional:!0,converter:ye})],pl.prototype,"inhibitPolicyMapping",void 0);var wu,D2=`${ue}.33`,as=class{issuerDomainPolicy="";subjectDomainPolicy="";constructor(e={}){Object.assign(this,e)}};c([u({type:f.ObjectIdentifier})],as.prototype,"issuerDomainPolicy",void 0);c([u({type:f.ObjectIdentifier})],as.prototype,"subjectDomainPolicy",void 0);var Uh=wu=class extends z{constructor(e){super(e),Object.setPrototypeOf(this,wu.prototype)}};Uh=wu=c([C({type:x.Sequence,itemType:as})],Uh);var xu,jo=`${ue}.17`,Lo=xu=class extends Be{constructor(e){super(e),Object.setPrototypeOf(this,xu.prototype)}};Lo=xu=c([C({type:x.Sequence})],Lo);var Ze=class{type="";values=[];constructor(e={}){Object.assign(this,e)}};c([u({type:f.ObjectIdentifier})],Ze.prototype,"type",void 0);c([u({type:f.Any,repeated:"set"})],Ze.prototype,"values",void 0);var Au,Q2=`${ue}.9`,$h=Au=class extends z{constructor(e){super(e),Object.setPrototypeOf(this,Au.prototype)}};$h=Au=c([C({type:x.Sequence,itemType:Ze})],$h);var fl=`${ue}.14`,At=class extends Pi{};var sC=`${ue}.16`,ml=class{notBefore;notAfter;constructor(e={}){Object.assign(this,e)}};c([u({type:f.GeneralizedTime,context:0,implicit:!0,optional:!0})],ml.prototype,"notBefore",void 0);c([u({type:f.GeneralizedTime,context:1,implicit:!0,optional:!0})],ml.prototype,"notAfter",void 0);var ss;(function(t){t[t.keyUpdateAllowed=1]="keyUpdateAllowed",t[t.newExtensions=2]="newExtensions",t[t.pKIXCertificate=4]="pKIXCertificate"})(ss||(ss={}));var hl=class extends Gt{toJSON(){let e=[],r=this.toNumber();return r&ss.pKIXCertificate&&e.push("pKIXCertificate"),r&ss.newExtensions&&e.push("newExtensions"),r&ss.keyUpdateAllowed&&e.push("keyUpdateAllowed"),e}toString(){return`[${this.toJSON().join(", ")}]`}},gl=class{entrustVers="";entrustInfoFlags=new hl;constructor(e={}){Object.assign(this,e)}};c([u({type:f.GeneralString})],gl.prototype,"entrustVers",void 0);c([u({type:hl})],gl.prototype,"entrustInfoFlags",void 0);var Eu,gC=`${Mn}.11`,Gh=Eu=class extends z{constructor(e){super(e),Object.setPrototypeOf(this,Eu.prototype)}};Gh=Eu=c([C({type:x.Sequence,itemType:Yr})],Gh);var U=class t{algorithm="";parameters;constructor(e={}){Object.assign(this,e)}isEqual(e){return e instanceof t&&e.algorithm==this.algorithm&&(e.parameters&&this.parameters&&Fa(e.parameters,this.parameters)||e.parameters===this.parameters)}};c([u({type:f.ObjectIdentifier})],U.prototype,"algorithm",void 0);c([u({type:f.Any,optional:!0})],U.prototype,"parameters",void 0);var Xe=class{algorithm=new U;subjectPublicKey=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};c([u({type:U})],Xe.prototype,"algorithm",void 0);c([u({type:f.BitString})],Xe.prototype,"subjectPublicKey",void 0);var Pe=class{utcTime;generalTime;constructor(e){if(e)if(typeof e=="string"||typeof e=="number"||e instanceof Date){let r=new Date(e);r.setMilliseconds(0),r.getUTCFullYear()>2049?this.generalTime=r:this.utcTime=r}else Object.assign(this,e)}getTime(){let e=this.utcTime||this.generalTime;if(!e)throw new Error("Cannot get time from CHOICE object");return e}};c([u({type:f.UTCTime})],Pe.prototype,"utcTime",void 0);c([u({type:f.GeneralizedTime})],Pe.prototype,"generalTime",void 0);Pe=c([C({type:x.Choice})],Pe);var On=class{notBefore=new Pe(new Date);notAfter=new Pe(new Date);constructor(e){e&&(this.notBefore=new Pe(e.notBefore),this.notAfter=new Pe(e.notAfter))}};c([u({type:Pe})],On.prototype,"notBefore",void 0);c([u({type:Pe})],On.prototype,"notAfter",void 0);var ku,ft=class t{static CRITICAL=!1;extnID="";critical=t.CRITICAL;extnValue=new V;constructor(e={}){Object.assign(this,e)}};c([u({type:f.ObjectIdentifier})],ft.prototype,"extnID",void 0);c([u({type:f.Boolean,defaultValue:ft.CRITICAL})],ft.prototype,"critical",void 0);c([u({type:V})],ft.prototype,"extnValue",void 0);var Ft=ku=class extends z{constructor(e){super(e),Object.setPrototypeOf(this,ku.prototype)}};Ft=ku=c([C({type:x.Sequence,itemType:ft})],Ft);var tn;(function(t){t[t.v1=0]="v1",t[t.v2=1]="v2",t[t.v3=2]="v3"})(tn||(tn={}));var st=class{version=tn.v1;serialNumber=new ArrayBuffer(0);signature=new U;issuer=new Te;validity=new On;subject=new Te;subjectPublicKeyInfo=new Xe;issuerUniqueID;subjectUniqueID;extensions;constructor(e={}){Object.assign(this,e)}};c([u({type:f.Integer,context:0,defaultValue:tn.v1})],st.prototype,"version",void 0);c([u({type:f.Integer,converter:ye})],st.prototype,"serialNumber",void 0);c([u({type:U})],st.prototype,"signature",void 0);c([u({type:Te})],st.prototype,"issuer",void 0);c([u({type:On})],st.prototype,"validity",void 0);c([u({type:Te})],st.prototype,"subject",void 0);c([u({type:Xe})],st.prototype,"subjectPublicKeyInfo",void 0);c([u({type:f.BitString,context:1,implicit:!0,optional:!0})],st.prototype,"issuerUniqueID",void 0);c([u({type:f.BitString,context:2,implicit:!0,optional:!0})],st.prototype,"subjectUniqueID",void 0);c([u({type:Ft,context:3,optional:!0})],st.prototype,"extensions",void 0);var Ne=class{tbsCertificate=new st;tbsCertificateRaw;signatureAlgorithm=new U;signatureValue=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};c([u({type:st,raw:!0})],Ne.prototype,"tbsCertificate",void 0);c([u({type:U})],Ne.prototype,"signatureAlgorithm",void 0);c([u({type:f.BitString})],Ne.prototype,"signatureValue",void 0);var sr=class{userCertificate=new ArrayBuffer(0);revocationDate=new Pe;crlEntryExtensions;constructor(e={}){Object.assign(this,e)}};c([u({type:f.Integer,converter:ye})],sr.prototype,"userCertificate",void 0);c([u({type:Pe})],sr.prototype,"revocationDate",void 0);c([u({type:ft,optional:!0,repeated:"sequence"})],sr.prototype,"crlEntryExtensions",void 0);var _t=class{version;signature=new U;issuer=new Te;thisUpdate=new Pe;nextUpdate;revokedCertificates;crlExtensions;constructor(e={}){Object.assign(this,e)}};c([u({type:f.Integer,optional:!0})],_t.prototype,"version",void 0);c([u({type:U})],_t.prototype,"signature",void 0);c([u({type:Te})],_t.prototype,"issuer",void 0);c([u({type:Pe})],_t.prototype,"thisUpdate",void 0);c([u({type:Pe,optional:!0})],_t.prototype,"nextUpdate",void 0);c([u({type:sr,repeated:"sequence",optional:!0})],_t.prototype,"revokedCertificates",void 0);c([u({type:ft,optional:!0,context:0,repeated:"sequence"})],_t.prototype,"crlExtensions",void 0);var Nn=class{tbsCertList=new _t;tbsCertListRaw;signatureAlgorithm=new U;signature=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};c([u({type:_t,raw:!0})],Nn.prototype,"tbsCertList",void 0);c([u({type:U})],Nn.prototype,"signatureAlgorithm",void 0);c([u({type:f.BitString})],Nn.prototype,"signature",void 0);var Wh={"2.5.4.6":"C","2.5.4.10":"O","2.5.4.11":"OU","2.5.4.3":"CN"};function Ho(t){let e=Re.parse(t,Ne),r=e.tbsCertificate,n={combined:""};r.issuer.forEach(([a])=>{let s=Wh[a.type];s&&(n[s]=a.value.toString())}),n.combined=Kh(n);let i={combined:""};r.subject.forEach(([a])=>{let s=Wh[a.type];s&&(i[s]=a.value.toString())}),i.combined=Kh(i);let o=!1;if(r.extensions)for(let a of r.extensions)a.extnID===Bo&&(o=Re.parse(a.extnValue,Qr).cA);return{issuer:n,subject:i,version:r.version,basicConstraintsCA:o,notBefore:r.validity.notBefore.getTime(),notAfter:r.validity.notAfter.getTime(),parsedCertificate:e}}function Kh(t){let e=[];return t.C&&e.push(t.C),t.O&&e.push(t.O),t.OU&&e.push(t.OU),t.CN&&e.push(t.CN),e.join(" : ")}var V3=yo(Su(),1);var $=yo(Pd());var cr=class{issuer=new Te;serialNumber=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};c([u({type:Te})],cr.prototype,"issuer",void 0);c([u({type:f.Integer,converter:ye})],cr.prototype,"serialNumber",void 0);var Di=class{subjectKeyIdentifier;issuerAndSerialNumber;constructor(e={}){Object.assign(this,e)}};c([u({type:At,context:0,implicit:!0})],Di.prototype,"subjectKeyIdentifier",void 0);c([u({type:cr})],Di.prototype,"issuerAndSerialNumber",void 0);Di=c([C({type:x.Choice})],Di);var Je;(function(t){t[t.v0=0]="v0",t[t.v1=1]="v1",t[t.v2=2]="v2",t[t.v3=3]="v3",t[t.v4=4]="v4",t[t.v5=5]="v5"})(Je||(Je={}));var Li=class extends U{};Li=c([C({type:x.Sequence})],Li);var cs=class extends U{};cs=c([C({type:x.Sequence})],cs);var Et=class extends U{};Et=c([C({type:x.Sequence})],Et);var ls=class extends U{};ls=c([C({type:x.Sequence})],ls);var zh=class extends U{};zh=c([C({type:x.Sequence})],zh);var bl=class extends U{};bl=c([C({type:x.Sequence})],bl);var lr=class{attrType="";attrValues=[];constructor(e={}){Object.assign(this,e)}};c([u({type:f.ObjectIdentifier})],lr.prototype,"attrType",void 0);c([u({type:f.Any,repeated:"set"})],lr.prototype,"attrValues",void 0);var Cu,kt=class{version=Je.v0;sid=new Di;digestAlgorithm=new Li;signedAttrs;signedAttrsRaw;signatureAlgorithm=new cs;signature=new V;unsignedAttrs;constructor(e={}){Object.assign(this,e)}};c([u({type:f.Integer})],kt.prototype,"version",void 0);c([u({type:Di})],kt.prototype,"sid",void 0);c([u({type:Li})],kt.prototype,"digestAlgorithm",void 0);c([u({type:lr,repeated:"set",context:0,implicit:!0,optional:!0,raw:!0})],kt.prototype,"signedAttrs",void 0);c([u({type:cs})],kt.prototype,"signatureAlgorithm",void 0);c([u({type:V})],kt.prototype,"signature",void 0);c([u({type:lr,repeated:"set",context:1,implicit:!0,optional:!0})],kt.prototype,"unsignedAttrs",void 0);var ds=Cu=class extends z{constructor(e){super(e),Object.setPrototypeOf(this,Cu.prototype)}};ds=Cu=c([C({type:x.Set,itemType:kt})],ds);var qh=class extends kt{};qh=c([C({type:x.Sequence})],qh);var Xh=class extends Pe{};Xh=c([C({type:x.Choice})],Xh);var us=class{acIssuer=new ae;acSerial=0;attrs=[];constructor(e={}){Object.assign(this,e)}};c([u({type:ae})],us.prototype,"acIssuer",void 0);c([u({type:f.Integer})],us.prototype,"acSerial",void 0);c([u({type:Ze,repeated:"sequence"})],us.prototype,"attrs",void 0);var Tu,ps=Tu=class extends z{constructor(e){super(e),Object.setPrototypeOf(this,Tu.prototype)}};ps=Tu=c([C({type:x.Sequence,itemType:f.ObjectIdentifier})],ps);var Uo=class{pathLenConstraint;permittedAttrs;excludedAttrs;permitUnSpecified=!0;constructor(e={}){Object.assign(this,e)}};c([u({type:f.Integer,optional:!0})],Uo.prototype,"pathLenConstraint",void 0);c([u({type:ps,implicit:!0,context:0,optional:!0})],Uo.prototype,"permittedAttrs",void 0);c([u({type:ps,implicit:!0,context:1,optional:!0})],Uo.prototype,"excludedAttrs",void 0);c([u({type:f.Boolean,defaultValue:!0})],Uo.prototype,"permitUnSpecified",void 0);var zt=class{issuer=new Be;serial=new ArrayBuffer(0);issuerUID=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};c([u({type:Be})],zt.prototype,"issuer",void 0);c([u({type:f.Integer,converter:ye})],zt.prototype,"serial",void 0);c([u({type:f.BitString,optional:!0})],zt.prototype,"issuerUID",void 0);var Iu;(function(t){t[t.publicKey=0]="publicKey",t[t.publicKeyCert=1]="publicKeyCert",t[t.otherObjectTypes=2]="otherObjectTypes"})(Iu||(Iu={}));var qt=class{digestedObjectType=Iu.publicKey;otherObjectTypeID;digestAlgorithm=new U;objectDigest=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};c([u({type:f.Enumerated})],qt.prototype,"digestedObjectType",void 0);c([u({type:f.ObjectIdentifier,optional:!0})],qt.prototype,"otherObjectTypeID",void 0);c([u({type:U})],qt.prototype,"digestAlgorithm",void 0);c([u({type:f.BitString})],qt.prototype,"objectDigest",void 0);var ji=class{issuerName;baseCertificateID;objectDigestInfo;constructor(e={}){Object.assign(this,e)}};c([u({type:Be,optional:!0})],ji.prototype,"issuerName",void 0);c([u({type:zt,context:0,implicit:!0,optional:!0})],ji.prototype,"baseCertificateID",void 0);c([u({type:qt,context:1,implicit:!0,optional:!0})],ji.prototype,"objectDigestInfo",void 0);var Hi=class{v1Form;v2Form;constructor(e={}){Object.assign(this,e)}};c([u({type:ae,repeated:"sequence"})],Hi.prototype,"v1Form",void 0);c([u({type:ji,context:0,implicit:!0})],Hi.prototype,"v2Form",void 0);Hi=c([C({type:x.Choice})],Hi);var Ui=class{notBeforeTime=new Date;notAfterTime=new Date;constructor(e={}){Object.assign(this,e)}};c([u({type:f.GeneralizedTime})],Ui.prototype,"notBeforeTime",void 0);c([u({type:f.GeneralizedTime})],Ui.prototype,"notAfterTime",void 0);var Dn=class{baseCertificateID;entityName;objectDigestInfo;constructor(e={}){Object.assign(this,e)}};c([u({type:zt,implicit:!0,context:0,optional:!0})],Dn.prototype,"baseCertificateID",void 0);c([u({type:Be,implicit:!0,context:1,optional:!0})],Dn.prototype,"entityName",void 0);c([u({type:qt,implicit:!0,context:2,optional:!0})],Dn.prototype,"objectDigestInfo",void 0);var _u;(function(t){t[t.v2=1]="v2"})(_u||(_u={}));var St=class{version=_u.v2;holder=new Dn;issuer=new Hi;signature=new U;serialNumber=new ArrayBuffer(0);attrCertValidityPeriod=new Ui;attributes=[];issuerUniqueID;extensions;constructor(e={}){Object.assign(this,e)}};c([u({type:f.Integer})],St.prototype,"version",void 0);c([u({type:Dn})],St.prototype,"holder",void 0);c([u({type:Hi})],St.prototype,"issuer",void 0);c([u({type:U})],St.prototype,"signature",void 0);c([u({type:f.Integer,converter:ye})],St.prototype,"serialNumber",void 0);c([u({type:Ui})],St.prototype,"attrCertValidityPeriod",void 0);c([u({type:Ze,repeated:"sequence"})],St.prototype,"attributes",void 0);c([u({type:f.BitString,optional:!0})],St.prototype,"issuerUniqueID",void 0);c([u({type:Ft,optional:!0})],St.prototype,"extensions",void 0);var $i=class{acinfo=new St;signatureAlgorithm=new U;signatureValue=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};c([u({type:St})],$i.prototype,"acinfo",void 0);c([u({type:U})],$i.prototype,"signatureAlgorithm",void 0);c([u({type:f.BitString})],$i.prototype,"signatureValue",void 0);var fs;(function(t){t[t.unmarked=1]="unmarked",t[t.unclassified=2]="unclassified",t[t.restricted=4]="restricted",t[t.confidential=8]="confidential",t[t.secret=16]="secret",t[t.topSecret=32]="topSecret"})(fs||(fs={}));var $o=class extends Gt{};var Go=class{type="";value=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};c([u({type:f.ObjectIdentifier,implicit:!0,context:0})],Go.prototype,"type",void 0);c([u({type:f.Any,implicit:!0,context:1})],Go.prototype,"value",void 0);var ms=class{policyId="";classList=new $o(fs.unclassified);securityCategories;constructor(e={}){Object.assign(this,e)}};c([u({type:f.ObjectIdentifier})],ms.prototype,"policyId",void 0);c([u({type:$o,defaultValue:new $o(fs.unclassified)})],ms.prototype,"classList",void 0);c([u({type:Go,repeated:"set"})],ms.prototype,"securityCategories",void 0);var Vo=class{cotets;oid;string;constructor(e={}){Object.assign(this,e)}};c([u({type:V})],Vo.prototype,"cotets",void 0);c([u({type:f.ObjectIdentifier})],Vo.prototype,"oid",void 0);c([u({type:f.Utf8String})],Vo.prototype,"string",void 0);var yl=class{policyAuthority;values=[];constructor(e={}){Object.assign(this,e)}};c([u({type:Be,implicit:!0,context:0,optional:!0})],yl.prototype,"policyAuthority",void 0);c([u({type:Vo,repeated:"sequence"})],yl.prototype,"values",void 0);var uR=`${Mn}.4`,pR=`${Mn}.6`,fR=`${Mn}.10`,mR=`${ue}.55`,hs=`${Bn}.10`,hR=`${hs}.1`,gR=`${hs}.2`,bR=`${hs}.3`,yR=`${hs}.4`,vR=`${hs}.6`,Ru="2.5.4",wR=`${Ru}.72`;var Bu,Wo=class{targetCertificate=new zt;targetName;certDigestInfo;constructor(e={}){Object.assign(this,e)}};c([u({type:zt})],Wo.prototype,"targetCertificate",void 0);c([u({type:ae,optional:!0})],Wo.prototype,"targetName",void 0);c([u({type:qt,optional:!0})],Wo.prototype,"certDigestInfo",void 0);var Ko=class{targetName;targetGroup;targetCert;constructor(e={}){Object.assign(this,e)}};c([u({type:ae,context:0,implicit:!0})],Ko.prototype,"targetName",void 0);c([u({type:ae,context:1,implicit:!0})],Ko.prototype,"targetGroup",void 0);c([u({type:Wo,context:2,implicit:!0})],Ko.prototype,"targetCert",void 0);Ko=c([C({type:x.Choice})],Ko);var vl=Bu=class extends z{constructor(e){super(e),Object.setPrototypeOf(this,Bu.prototype)}};vl=Bu=c([C({type:x.Sequence,itemType:Ko})],vl);var Mu,Jh=Mu=class extends z{constructor(e){super(e),Object.setPrototypeOf(this,Mu.prototype)}};Jh=Mu=c([C({type:x.Sequence,itemType:vl})],Jh);var wl=class{roleAuthority;roleName;constructor(e={}){Object.assign(this,e)}};c([u({type:Be,implicit:!0,context:0,optional:!0})],wl.prototype,"roleAuthority",void 0);c([u({type:ae,implicit:!0,context:1})],wl.prototype,"roleName",void 0);var gs=class{service=new ae;ident=new ae;authInfo;constructor(e={}){Object.assign(this,e)}};c([u({type:ae})],gs.prototype,"service",void 0);c([u({type:ae})],gs.prototype,"ident",void 0);c([u({type:V,optional:!0})],gs.prototype,"authInfo",void 0);var Pu,bs=class{otherCertFormat="";otherCert=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};c([u({type:f.ObjectIdentifier})],bs.prototype,"otherCertFormat",void 0);c([u({type:f.Any})],bs.prototype,"otherCert",void 0);var Ln=class{certificate;v2AttrCert;other;constructor(e={}){Object.assign(this,e)}};c([u({type:Ne})],Ln.prototype,"certificate",void 0);c([u({type:$i,context:2,implicit:!0})],Ln.prototype,"v2AttrCert",void 0);c([u({type:bs,context:3,implicit:!0})],Ln.prototype,"other",void 0);Ln=c([C({type:x.Choice})],Ln);var jn=Pu=class extends z{constructor(e){super(e),Object.setPrototypeOf(this,Pu.prototype)}};jn=Pu=c([C({type:x.Set,itemType:Ln})],jn);var mt=class{contentType="";content=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};c([u({type:f.ObjectIdentifier})],mt.prototype,"contentType",void 0);c([u({type:f.Any,context:0})],mt.prototype,"content",void 0);var Gi=class{single;any;constructor(e={}){Object.assign(this,e)}};c([u({type:V})],Gi.prototype,"single",void 0);c([u({type:f.Any})],Gi.prototype,"any",void 0);Gi=c([C({type:x.Choice})],Gi);var Vi=class{eContentType="";eContent;constructor(e={}){Object.assign(this,e)}};c([u({type:f.ObjectIdentifier})],Vi.prototype,"eContentType",void 0);c([u({type:Gi,context:0,optional:!0})],Vi.prototype,"eContent",void 0);var ys=class{value;constructedValue;constructor(e={}){Object.assign(this,e)}};c([u({type:V,context:0,implicit:!0,optional:!0})],ys.prototype,"value",void 0);c([u({type:V,converter:Th,context:0,implicit:!0,optional:!0,repeated:"sequence"})],ys.prototype,"constructedValue",void 0);ys=c([C({type:x.Choice})],ys);var Hn=class{contentType="";contentEncryptionAlgorithm=new ls;encryptedContent;constructor(e={}){Object.assign(this,e)}};c([u({type:f.ObjectIdentifier})],Hn.prototype,"contentType",void 0);c([u({type:ls})],Hn.prototype,"contentEncryptionAlgorithm",void 0);c([u({type:ys,optional:!0})],Hn.prototype,"encryptedContent",void 0);var Un=class{keyAttrId="";keyAttr;constructor(e={}){Object.assign(this,e)}};c([u({type:f.ObjectIdentifier})],Un.prototype,"keyAttrId",void 0);c([u({type:f.Any,optional:!0})],Un.prototype,"keyAttr",void 0);var Ou,Fo=class{subjectKeyIdentifier=new At;date;other;constructor(e={}){Object.assign(this,e)}};c([u({type:At})],Fo.prototype,"subjectKeyIdentifier",void 0);c([u({type:f.GeneralizedTime,optional:!0})],Fo.prototype,"date",void 0);c([u({type:Un,optional:!0})],Fo.prototype,"other",void 0);var zo=class{rKeyId;issuerAndSerialNumber;constructor(e={}){Object.assign(this,e)}};c([u({type:Fo,context:0,implicit:!0,optional:!0})],zo.prototype,"rKeyId",void 0);c([u({type:cr,optional:!0})],zo.prototype,"issuerAndSerialNumber",void 0);zo=c([C({type:x.Choice})],zo);var vs=class{rid=new zo;encryptedKey=new V;constructor(e={}){Object.assign(this,e)}};c([u({type:zo})],vs.prototype,"rid",void 0);c([u({type:V})],vs.prototype,"encryptedKey",void 0);var xl=Ou=class extends z{constructor(e){super(e),Object.setPrototypeOf(this,Ou.prototype)}};xl=Ou=c([C({type:x.Sequence,itemType:vs})],xl);var ws=class{algorithm=new U;publicKey=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};c([u({type:U})],ws.prototype,"algorithm",void 0);c([u({type:f.BitString})],ws.prototype,"publicKey",void 0);var Wi=class{subjectKeyIdentifier;originatorKey;issuerAndSerialNumber;constructor(e={}){Object.assign(this,e)}};c([u({type:At,context:0,implicit:!0,optional:!0})],Wi.prototype,"subjectKeyIdentifier",void 0);c([u({type:ws,context:1,implicit:!0,optional:!0})],Wi.prototype,"originatorKey",void 0);c([u({type:cr,optional:!0})],Wi.prototype,"issuerAndSerialNumber",void 0);Wi=c([C({type:x.Choice})],Wi);var rn=class{version=Je.v3;originator=new Wi;ukm;keyEncryptionAlgorithm=new Et;recipientEncryptedKeys=new xl;constructor(e={}){Object.assign(this,e)}};c([u({type:f.Integer})],rn.prototype,"version",void 0);c([u({type:Wi,context:0})],rn.prototype,"originator",void 0);c([u({type:V,context:1,optional:!0})],rn.prototype,"ukm",void 0);c([u({type:Et})],rn.prototype,"keyEncryptionAlgorithm",void 0);c([u({type:xl})],rn.prototype,"recipientEncryptedKeys",void 0);var qo=class{subjectKeyIdentifier;issuerAndSerialNumber;constructor(e={}){Object.assign(this,e)}};c([u({type:At,context:0,implicit:!0})],qo.prototype,"subjectKeyIdentifier",void 0);c([u({type:cr})],qo.prototype,"issuerAndSerialNumber",void 0);qo=c([C({type:x.Choice})],qo);var $n=class{version=Je.v0;rid=new qo;keyEncryptionAlgorithm=new Et;encryptedKey=new V;constructor(e={}){Object.assign(this,e)}};c([u({type:f.Integer})],$n.prototype,"version",void 0);c([u({type:qo})],$n.prototype,"rid",void 0);c([u({type:Et})],$n.prototype,"keyEncryptionAlgorithm",void 0);c([u({type:V})],$n.prototype,"encryptedKey",void 0);var Ki=class{keyIdentifier=new V;date;other;constructor(e={}){Object.assign(this,e)}};c([u({type:V})],Ki.prototype,"keyIdentifier",void 0);c([u({type:f.GeneralizedTime,optional:!0})],Ki.prototype,"date",void 0);c([u({type:Un,optional:!0})],Ki.prototype,"other",void 0);var Gn=class{version=Je.v4;kekid=new Ki;keyEncryptionAlgorithm=new Et;encryptedKey=new V;constructor(e={}){Object.assign(this,e)}};c([u({type:f.Integer})],Gn.prototype,"version",void 0);c([u({type:Ki})],Gn.prototype,"kekid",void 0);c([u({type:Et})],Gn.prototype,"keyEncryptionAlgorithm",void 0);c([u({type:V})],Gn.prototype,"encryptedKey",void 0);var Vn=class{version=Je.v0;keyDerivationAlgorithm;keyEncryptionAlgorithm=new Et;encryptedKey=new V;constructor(e={}){Object.assign(this,e)}};c([u({type:f.Integer})],Vn.prototype,"version",void 0);c([u({type:bl,context:0,optional:!0})],Vn.prototype,"keyDerivationAlgorithm",void 0);c([u({type:Et})],Vn.prototype,"keyEncryptionAlgorithm",void 0);c([u({type:V})],Vn.prototype,"encryptedKey",void 0);var xs=class{oriType="";oriValue=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};c([u({type:f.ObjectIdentifier})],xs.prototype,"oriType",void 0);c([u({type:f.Any})],xs.prototype,"oriValue",void 0);var nn=class{ktri;kari;kekri;pwri;ori;constructor(e={}){Object.assign(this,e)}};c([u({type:$n,optional:!0})],nn.prototype,"ktri",void 0);c([u({type:rn,context:1,implicit:!0,optional:!0})],nn.prototype,"kari",void 0);c([u({type:Gn,context:2,implicit:!0,optional:!0})],nn.prototype,"kekri",void 0);c([u({type:Vn,context:3,implicit:!0,optional:!0})],nn.prototype,"pwri",void 0);c([u({type:xs,context:4,implicit:!0,optional:!0})],nn.prototype,"ori",void 0);nn=c([C({type:x.Choice})],nn);var Nu,As=Nu=class extends z{constructor(e){super(e),Object.setPrototypeOf(this,Nu.prototype)}};As=Nu=c([C({type:x.Set,itemType:nn})],As);var Du,Yh=`${Bn}.16`,vM=`${Yh}.2`,wM=`${Yh}.4`,Xo=class{otherRevInfoFormat="";otherRevInfo=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};c([u({type:f.ObjectIdentifier})],Xo.prototype,"otherRevInfoFormat",void 0);c([u({type:f.Any})],Xo.prototype,"otherRevInfo",void 0);var Al=class{other=new Xo;constructor(e={}){Object.assign(this,e)}};c([u({type:Xo,context:1,implicit:!0})],Al.prototype,"other",void 0);Al=c([C({type:x.Choice})],Al);var Jo=Du=class extends z{constructor(e){super(e),Object.setPrototypeOf(this,Du.prototype)}};Jo=Du=c([C({type:x.Set,itemType:Al})],Jo);var Yo=class{certs;crls;constructor(e={}){Object.assign(this,e)}};c([u({type:jn,context:0,implicit:!0,optional:!0})],Yo.prototype,"certs",void 0);c([u({type:Jo,context:1,implicit:!0,optional:!0})],Yo.prototype,"crls",void 0);var Lu,ju=Lu=class extends z{constructor(e){super(e),Object.setPrototypeOf(this,Lu.prototype)}};ju=Lu=c([C({type:x.Set,itemType:lr})],ju);var Fi=class{version=Je.v0;originatorInfo;recipientInfos=new As;encryptedContentInfo=new Hn;unprotectedAttrs;constructor(e={}){Object.assign(this,e)}};c([u({type:f.Integer})],Fi.prototype,"version",void 0);c([u({type:Yo,context:0,implicit:!0,optional:!0})],Fi.prototype,"originatorInfo",void 0);c([u({type:As})],Fi.prototype,"recipientInfos",void 0);c([u({type:Hn})],Fi.prototype,"encryptedContentInfo",void 0);c([u({type:ju,context:1,implicit:!0,optional:!0})],Fi.prototype,"unprotectedAttrs",void 0);var Qh="1.2.840.113549.1.7.1",El="1.2.840.113549.1.7.2";var Hu,kl=Hu=class extends z{constructor(e){super(e),Object.setPrototypeOf(this,Hu.prototype)}};kl=Hu=c([C({type:x.Set,itemType:Li})],kl);var Xt=class{version=Je.v0;digestAlgorithms=new kl;encapContentInfo=new Vi;certificates;crls;signerInfos=new ds;constructor(e={}){Object.assign(this,e)}};c([u({type:f.Integer})],Xt.prototype,"version",void 0);c([u({type:kl})],Xt.prototype,"digestAlgorithms",void 0);c([u({type:Vi})],Xt.prototype,"encapContentInfo",void 0);c([u({type:jn,context:0,implicit:!0,optional:!0})],Xt.prototype,"certificates",void 0);c([u({type:Jo,context:1,implicit:!0,optional:!0})],Xt.prototype,"crls",void 0);c([u({type:ds})],Xt.prototype,"signerInfos",void 0);var on="1.2.840.10045.2.1";var Es="1.2.840.10045.4.1",Sl="1.2.840.10045.4.3.1",zi="1.2.840.10045.4.3.2",qi="1.2.840.10045.4.3.3",Xi="1.2.840.10045.4.3.4";var ks="1.2.840.10045.3.1.7";var Ss="1.3.132.0.34";var Uu="1.3.132.0.35";function Cs(t){return new U({algorithm:t})}var eg=Cs(Es),g5=Cs(Sl),tg=Cs(zi),rg=Cs(qi),ng=Cs(Xi);var Ts=class{fieldType;parameters;constructor(e={}){Object.assign(this,e)}};c([u({type:f.ObjectIdentifier})],Ts.prototype,"fieldType",void 0);c([u({type:f.Any})],Ts.prototype,"parameters",void 0);Ts=c([C({type:x.Sequence})],Ts);var $u=class extends V{};var Qo=class{a;b;seed;constructor(e={}){Object.assign(this,e)}};c([u({type:f.OctetString})],Qo.prototype,"a",void 0);c([u({type:f.OctetString})],Qo.prototype,"b",void 0);c([u({type:f.BitString,optional:!0})],Qo.prototype,"seed",void 0);Qo=c([C({type:x.Sequence})],Qo);var Gu;(function(t){t[t.ecpVer1=1]="ecpVer1"})(Gu||(Gu={}));var _r=class{version=Gu.ecpVer1;fieldID;curve;base;order;cofactor;constructor(e={}){Object.assign(this,e)}};c([u({type:f.Integer})],_r.prototype,"version",void 0);c([u({type:Ts})],_r.prototype,"fieldID",void 0);c([u({type:Qo})],_r.prototype,"curve",void 0);c([u({type:$u})],_r.prototype,"base",void 0);c([u({type:f.Integer,converter:ye})],_r.prototype,"order",void 0);c([u({type:f.Integer,optional:!0})],_r.prototype,"cofactor",void 0);_r=c([C({type:x.Sequence})],_r);var Jt=class{namedCurve;implicitCurve;specifiedCurve;constructor(e={}){Object.assign(this,e)}};c([u({type:f.ObjectIdentifier})],Jt.prototype,"namedCurve",void 0);c([u({type:f.Null})],Jt.prototype,"implicitCurve",void 0);c([u({type:_r})],Jt.prototype,"specifiedCurve",void 0);Jt=c([C({type:x.Choice})],Jt);var Zo=class{version=1;privateKey=new V;parameters;publicKey;constructor(e={}){Object.assign(this,e)}};c([u({type:f.Integer})],Zo.prototype,"version",void 0);c([u({type:V})],Zo.prototype,"privateKey",void 0);c([u({type:Jt,context:0,optional:!0})],Zo.prototype,"parameters",void 0);c([u({type:f.BitString,context:1,optional:!0})],Zo.prototype,"publicKey",void 0);var an=class{r=new ArrayBuffer(0);s=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};c([u({type:f.Integer,converter:ye})],an.prototype,"r",void 0);c([u({type:f.Integer,converter:ye})],an.prototype,"s",void 0);var Ct="1.2.840.113549.1.1",Yt=`${Ct}.1`,ig=`${Ct}.7`,og=`${Ct}.9`,Wn=`${Ct}.10`,ag=`${Ct}.2`,sg=`${Ct}.4`,Kn=`${Ct}.5`,cg=`${Ct}.14`;var ea=`${Ct}.11`,Fn=`${Ct}.12`,zn=`${Ct}.13`,Vu=`${Ct}.15`,Wu=`${Ct}.16`,Ji="1.3.14.3.2.26",Cl="2.16.840.1.101.3.4.2.4",Yi="2.16.840.1.101.3.4.2.1",Qi="2.16.840.1.101.3.4.2.2",Zi="2.16.840.1.101.3.4.2.3",lg="2.16.840.1.101.3.4.2.5",dg="2.16.840.1.101.3.4.2.6",ug="1.2.840.113549.2.2",pg="1.2.840.113549.2.5",qn=`${Ct}.8`;function Fe(t){return new U({algorithm:t,parameters:null})}var W5=Fe(ug),K5=Fe(pg),sn=Fe(Ji),F5=Fe(Cl),z5=Fe(Yi),q5=Fe(Qi),X5=Fe(Zi),J5=Fe(lg),Y5=Fe(dg),Tl=new U({algorithm:qn,parameters:G.serialize(sn)}),Ku=new U({algorithm:og,parameters:G.serialize(_o.toASN(new Uint8Array([218,57,163,238,94,107,75,13,50,85,191,239,149,96,24,144,175,216,7,9]).buffer))}),Q5=Fe(Yt),Z5=Fe(ag),eP=Fe(sg),tP=Fe(Kn),rP=Fe(Vu),nP=Fe(Wu),iP=Fe(Fn),oP=Fe(zn),aP=Fe(Vu),sP=Fe(Wu);var ta=class{hashAlgorithm=new U(sn);maskGenAlgorithm=new U({algorithm:qn,parameters:G.serialize(sn)});pSourceAlgorithm=new U(Ku);constructor(e={}){Object.assign(this,e)}};c([u({type:U,context:0,defaultValue:sn})],ta.prototype,"hashAlgorithm",void 0);c([u({type:U,context:1,defaultValue:Tl})],ta.prototype,"maskGenAlgorithm",void 0);c([u({type:U,context:2,defaultValue:Ku})],ta.prototype,"pSourceAlgorithm",void 0);var mP=new U({algorithm:ig,parameters:G.serialize(new ta)});var Rr=class{hashAlgorithm=new U(sn);maskGenAlgorithm=new U({algorithm:qn,parameters:G.serialize(sn)});saltLength=20;trailerField=1;constructor(e={}){Object.assign(this,e)}};c([u({type:U,context:0,defaultValue:sn})],Rr.prototype,"hashAlgorithm",void 0);c([u({type:U,context:1,defaultValue:Tl})],Rr.prototype,"maskGenAlgorithm",void 0);c([u({type:f.Integer,context:2,defaultValue:20})],Rr.prototype,"saltLength",void 0);c([u({type:f.Integer,context:3,defaultValue:1})],Rr.prototype,"trailerField",void 0);var xP=new U({algorithm:Wn,parameters:G.serialize(new Rr)});var eo=class{digestAlgorithm=new U;digest=new V;constructor(e={}){Object.assign(this,e)}};c([u({type:U})],eo.prototype,"digestAlgorithm",void 0);c([u({type:V})],eo.prototype,"digest",void 0);var Fu,ra=class{prime=new ArrayBuffer(0);exponent=new ArrayBuffer(0);coefficient=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};c([u({type:f.Integer,converter:ye})],ra.prototype,"prime",void 0);c([u({type:f.Integer,converter:ye})],ra.prototype,"exponent",void 0);c([u({type:f.Integer,converter:ye})],ra.prototype,"coefficient",void 0);var Il=Fu=class extends z{constructor(e){super(e),Object.setPrototypeOf(this,Fu.prototype)}};Il=Fu=c([C({type:x.Sequence,itemType:ra})],Il);var Qt=class{version=0;modulus=new ArrayBuffer(0);publicExponent=new ArrayBuffer(0);privateExponent=new ArrayBuffer(0);prime1=new ArrayBuffer(0);prime2=new ArrayBuffer(0);exponent1=new ArrayBuffer(0);exponent2=new ArrayBuffer(0);coefficient=new ArrayBuffer(0);otherPrimeInfos;constructor(e={}){Object.assign(this,e)}};c([u({type:f.Integer})],Qt.prototype,"version",void 0);c([u({type:f.Integer,converter:ye})],Qt.prototype,"modulus",void 0);c([u({type:f.Integer,converter:ye})],Qt.prototype,"publicExponent",void 0);c([u({type:f.Integer,converter:ye})],Qt.prototype,"privateExponent",void 0);c([u({type:f.Integer,converter:ye})],Qt.prototype,"prime1",void 0);c([u({type:f.Integer,converter:ye})],Qt.prototype,"prime2",void 0);c([u({type:f.Integer,converter:ye})],Qt.prototype,"exponent1",void 0);c([u({type:f.Integer,converter:ye})],Qt.prototype,"exponent2",void 0);c([u({type:f.Integer,converter:ye})],Qt.prototype,"coefficient",void 0);c([u({type:Il,optional:!0})],Qt.prototype,"otherPrimeInfos",void 0);var Xn=class{modulus=new ArrayBuffer(0);publicExponent=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};c([u({type:f.Integer,converter:ye})],Xn.prototype,"modulus",void 0);c([u({type:f.Integer,converter:ye})],Xn.prototype,"publicExponent",void 0);var zu;(function(t){t[t.Transient=0]="Transient",t[t.Singleton=1]="Singleton",t[t.ResolutionScoped=2]="ResolutionScoped",t[t.ContainerScoped=3]="ContainerScoped"})(zu||(zu={}));var et=zu;var qu=function(t,e){return qu=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,n){r.__proto__=n}||function(r,n){for(var i in n)n.hasOwnProperty(i)&&(r[i]=n[i])},qu(t,e)};function Is(t,e){qu(t,e);function r(){this.constructor=t}t.prototype=e===null?Object.create(e):(r.prototype=e.prototype,new r)}function fg(t,e,r,n){function i(o){return o instanceof r?o:new r(function(a){a(o)})}return new(r||(r=Promise))(function(o,a){function s(p){try{d(n.next(p))}catch(m){a(m)}}function l(p){try{d(n.throw(p))}catch(m){a(m)}}function d(p){p.done?o(p.value):i(p.value).then(s,l)}d((n=n.apply(t,e||[])).next())})}function mg(t,e){var r={label:0,sent:function(){if(o[0]&1)throw o[1];return o[1]},trys:[],ops:[]},n,i,o,a;return a={next:s(0),throw:s(1),return:s(2)},typeof Symbol=="function"&&(a[Symbol.iterator]=function(){return this}),a;function s(d){return function(p){return l([d,p])}}function l(d){if(n)throw new TypeError("Generator is already executing.");for(;r;)try{if(n=1,i&&(o=d[0]&2?i.return:d[0]?i.throw||((o=i.return)&&o.call(i),0):i.next)&&!(o=o.call(i,d[1])).done)return o;switch(i=0,o&&(d=[d[0]&2,o.value]),d[0]){case 0:case 1:o=d;break;case 4:return r.label++,{value:d[1],done:!1};case 5:r.label++,i=d[1],d=[0];continue;case 7:d=r.ops.pop(),r.trys.pop();continue;default:if(o=r.trys,!(o=o.length>0&&o[o.length-1])&&(d[0]===6||d[0]===2)){r=0;continue}if(d[0]===3&&(!o||d[1]>o[0]&&d[1]<o[3])){r.label=d[1];break}if(d[0]===6&&r.label<o[1]){r.label=o[1],o=d;break}if(o&&r.label<o[2]){r.label=o[2],r.ops.push(d);break}o[2]&&r.ops.pop(),r.trys.pop();continue}d=e.call(t,r)}catch(p){d=[6,p],i=0}finally{n=o=0}if(d[0]&5)throw d[1];return{value:d[0]?d[1]:void 0,done:!0}}}function _s(t){var e=typeof Symbol=="function"&&Symbol.iterator,r=e&&t[e],n=0;if(r)return r.call(t);if(t&&typeof t.length=="number")return{next:function(){return t&&n>=t.length&&(t=void 0),{value:t&&t[n++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function na(t,e){var r=typeof Symbol=="function"&&t[Symbol.iterator];if(!r)return t;var n=r.call(t),i,o=[],a;try{for(;(e===void 0||e-- >0)&&!(i=n.next()).done;)o.push(i.value)}catch(s){a={error:s}}finally{try{i&&!i.done&&(r=n.return)&&r.call(n)}finally{if(a)throw a.error}}return o}function Br(){for(var t=[],e=0;e<arguments.length;e++)t=t.concat(na(arguments[e]));return t}var Pw="injectionTokens";function Xu(t){var e=Reflect.getMetadata("design:paramtypes",t)||[],r=Reflect.getOwnMetadata(Pw,t)||{};return Object.keys(r).forEach(function(n){e[+n]=r[n]}),e}function Rs(t){return!!t.useClass}function ia(t){return!!t.useFactory}var _l=(function(){function t(e){this.wrap=e,this.reflectMethods=["get","getPrototypeOf","setPrototypeOf","getOwnPropertyDescriptor","defineProperty","has","set","deleteProperty","apply","construct","ownKeys"]}return t.prototype.createProxy=function(e){var r=this,n={},i=!1,o,a=function(){return i||(o=e(r.wrap()),i=!0),o};return new Proxy(n,this.createHandler(a))},t.prototype.createHandler=function(e){var r={},n=function(i){r[i]=function(){for(var o=[],a=0;a<arguments.length;a++)o[a]=arguments[a];o[0]=e();var s=Reflect[i];return s.apply(void 0,Br(o))}};return this.reflectMethods.forEach(n),r},t})();function Jn(t){return typeof t=="string"||typeof t=="symbol"}function Ju(t){return typeof t=="object"&&"token"in t&&"multiple"in t}function Rl(t){return typeof t=="object"&&"token"in t&&"transform"in t}function hg(t){return typeof t=="function"||t instanceof _l}function to(t){return!!t.useToken}function ro(t){return t.useValue!=null}function gg(t){return Rs(t)||ro(t)||to(t)||ia(t)}var Ow=(function(){function t(){this._registryMap=new Map}return t.prototype.entries=function(){return this._registryMap.entries()},t.prototype.getAll=function(e){return this.ensure(e),this._registryMap.get(e)},t.prototype.get=function(e){this.ensure(e);var r=this._registryMap.get(e);return r[r.length-1]||null},t.prototype.set=function(e,r){this.ensure(e),this._registryMap.get(e).push(r)},t.prototype.setAll=function(e,r){this._registryMap.set(e,r)},t.prototype.has=function(e){return this.ensure(e),this._registryMap.get(e).length>0},t.prototype.clear=function(){this._registryMap.clear()},t.prototype.ensure=function(e){this._registryMap.has(e)||this._registryMap.set(e,[])},t})(),Bs=Ow;var Nw=(function(t){Is(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e})(Bs),bg=Nw;var Dw=(function(){function t(){this.scopedResolutions=new Map}return t})(),Ms=Dw;function Lw(t,e){if(t===null)return"at position #"+e;var r=t.split(",")[e].trim();return'"'+r+'" at position #'+e}function jw(t,e,r){return r===void 0&&(r="    "),Br([t],e.message.split(`
`).map(function(n){return r+n})).join(`
`)}function Yu(t,e,r){var n=na(t.toString().match(/constructor\(([\w, ]+)\)/)||[],2),i=n[1],o=i===void 0?null:i,a=Lw(o,e);return jw("Cannot inject the dependency "+a+' of "'+t.name+'" constructor. Reason:',r)}function yg(t){if(typeof t.dispose!="function")return!1;var e=t.dispose;return!(e.length>0)}var Hw=(function(t){Is(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e})(Bs);var Uw=(function(t){Is(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e})(Bs);var $w=(function(){function t(){this.preResolution=new Hw,this.postResolution=new Uw}return t})(),vg=$w;var Qu=new Map,Gw=(function(){function t(e){this.parent=e,this._registry=new bg,this.interceptors=new vg,this.disposed=!1,this.disposables=new Set}return t.prototype.register=function(e,r,n){n===void 0&&(n={lifecycle:et.Transient}),this.ensureNotDisposed();var i;if(gg(r)?i=r:i={useClass:r},to(i))for(var o=[e],a=i;a!=null;){var s=a.useToken;if(o.includes(s))throw new Error("Token registration cycle detected! "+Br(o,[s]).join(" -> "));o.push(s);var l=this._registry.get(s);l&&to(l.provider)?a=l.provider:a=null}if((n.lifecycle===et.Singleton||n.lifecycle==et.ContainerScoped||n.lifecycle==et.ResolutionScoped)&&(ro(i)||ia(i)))throw new Error('Cannot use lifecycle "'+et[n.lifecycle]+'" with ValueProviders or FactoryProviders');return this._registry.set(e,{provider:i,options:n}),this},t.prototype.registerType=function(e,r){return this.ensureNotDisposed(),Jn(r)?this.register(e,{useToken:r}):this.register(e,{useClass:r})},t.prototype.registerInstance=function(e,r){return this.ensureNotDisposed(),this.register(e,{useValue:r})},t.prototype.registerSingleton=function(e,r){if(this.ensureNotDisposed(),Jn(e)){if(Jn(r))return this.register(e,{useToken:r},{lifecycle:et.Singleton});if(r)return this.register(e,{useClass:r},{lifecycle:et.Singleton});throw new Error('Cannot register a type name as a singleton without a "to" token')}var n=e;return r&&!Jn(r)&&(n=r),this.register(e,{useClass:n},{lifecycle:et.Singleton})},t.prototype.resolve=function(e,r,n){r===void 0&&(r=new Ms),n===void 0&&(n=!1),this.ensureNotDisposed();var i=this.getRegistration(e);if(!i&&Jn(e)){if(n)return;throw new Error('Attempted to resolve unregistered dependency token: "'+e.toString()+'"')}if(this.executePreResolutionInterceptor(e,"Single"),i){var o=this.resolveRegistration(i,r);return this.executePostResolutionInterceptor(e,o,"Single"),o}if(hg(e)){var o=this.construct(e,r);return this.executePostResolutionInterceptor(e,o,"Single"),o}throw new Error("Attempted to construct an undefined constructor. Could mean a circular dependency problem. Try using `delay` function.")},t.prototype.executePreResolutionInterceptor=function(e,r){var n,i;if(this.interceptors.preResolution.has(e)){var o=[];try{for(var a=_s(this.interceptors.preResolution.getAll(e)),s=a.next();!s.done;s=a.next()){var l=s.value;l.options.frequency!="Once"&&o.push(l),l.callback(e,r)}}catch(d){n={error:d}}finally{try{s&&!s.done&&(i=a.return)&&i.call(a)}finally{if(n)throw n.error}}this.interceptors.preResolution.setAll(e,o)}},t.prototype.executePostResolutionInterceptor=function(e,r,n){var i,o;if(this.interceptors.postResolution.has(e)){var a=[];try{for(var s=_s(this.interceptors.postResolution.getAll(e)),l=s.next();!l.done;l=s.next()){var d=l.value;d.options.frequency!="Once"&&a.push(d),d.callback(e,r,n)}}catch(p){i={error:p}}finally{try{l&&!l.done&&(o=s.return)&&o.call(s)}finally{if(i)throw i.error}}this.interceptors.postResolution.setAll(e,a)}},t.prototype.resolveRegistration=function(e,r){if(this.ensureNotDisposed(),e.options.lifecycle===et.ResolutionScoped&&r.scopedResolutions.has(e))return r.scopedResolutions.get(e);var n=e.options.lifecycle===et.Singleton,i=e.options.lifecycle===et.ContainerScoped,o=n||i,a;return ro(e.provider)?a=e.provider.useValue:to(e.provider)?a=o?e.instance||(e.instance=this.resolve(e.provider.useToken,r)):this.resolve(e.provider.useToken,r):Rs(e.provider)?a=o?e.instance||(e.instance=this.construct(e.provider.useClass,r)):this.construct(e.provider.useClass,r):ia(e.provider)?a=e.provider.useFactory(this):a=this.construct(e.provider,r),e.options.lifecycle===et.ResolutionScoped&&r.scopedResolutions.set(e,a),a},t.prototype.resolveAll=function(e,r,n){var i=this;r===void 0&&(r=new Ms),n===void 0&&(n=!1),this.ensureNotDisposed();var o=this.getAllRegistrations(e);if(!o&&Jn(e)){if(n)return[];throw new Error('Attempted to resolve unregistered dependency token: "'+e.toString()+'"')}if(this.executePreResolutionInterceptor(e,"All"),o){var a=o.map(function(l){return i.resolveRegistration(l,r)});return this.executePostResolutionInterceptor(e,a,"All"),a}var s=[this.construct(e,r)];return this.executePostResolutionInterceptor(e,s,"All"),s},t.prototype.isRegistered=function(e,r){return r===void 0&&(r=!1),this.ensureNotDisposed(),this._registry.has(e)||r&&(this.parent||!1)&&this.parent.isRegistered(e,!0)},t.prototype.reset=function(){this.ensureNotDisposed(),this._registry.clear(),this.interceptors.preResolution.clear(),this.interceptors.postResolution.clear()},t.prototype.clearInstances=function(){var e,r;this.ensureNotDisposed();try{for(var n=_s(this._registry.entries()),i=n.next();!i.done;i=n.next()){var o=na(i.value,2),a=o[0],s=o[1];this._registry.setAll(a,s.filter(function(l){return!ro(l.provider)}).map(function(l){return l.instance=void 0,l}))}}catch(l){e={error:l}}finally{try{i&&!i.done&&(r=n.return)&&r.call(n)}finally{if(e)throw e.error}}},t.prototype.createChildContainer=function(){var e,r;this.ensureNotDisposed();var n=new t(this);try{for(var i=_s(this._registry.entries()),o=i.next();!o.done;o=i.next()){var a=na(o.value,2),s=a[0],l=a[1];l.some(function(d){var p=d.options;return p.lifecycle===et.ContainerScoped})&&n._registry.setAll(s,l.map(function(d){return d.options.lifecycle===et.ContainerScoped?{provider:d.provider,options:d.options}:d}))}}catch(d){e={error:d}}finally{try{o&&!o.done&&(r=i.return)&&r.call(i)}finally{if(e)throw e.error}}return n},t.prototype.beforeResolution=function(e,r,n){n===void 0&&(n={frequency:"Always"}),this.interceptors.preResolution.set(e,{callback:r,options:n})},t.prototype.afterResolution=function(e,r,n){n===void 0&&(n={frequency:"Always"}),this.interceptors.postResolution.set(e,{callback:r,options:n})},t.prototype.dispose=function(){return fg(this,void 0,void 0,function(){var e;return mg(this,function(r){switch(r.label){case 0:return this.disposed=!0,e=[],this.disposables.forEach(function(n){var i=n.dispose();i&&e.push(i)}),[4,Promise.all(e)];case 1:return r.sent(),[2]}})})},t.prototype.getRegistration=function(e){return this.isRegistered(e)?this._registry.get(e):this.parent?this.parent.getRegistration(e):null},t.prototype.getAllRegistrations=function(e){return this.isRegistered(e)?this._registry.getAll(e):this.parent?this.parent.getAllRegistrations(e):null},t.prototype.construct=function(e,r){var n=this;if(e instanceof _l)return e.createProxy(function(o){return n.resolve(o,r)});var i=(function(){var o=Qu.get(e);if(!o||o.length===0){if(e.length===0)return new e;throw new Error('TypeInfo not known for "'+e.name+'"')}var a=o.map(n.resolveParams(r,e));return new(e.bind.apply(e,Br([void 0],a)))})();return yg(i)&&this.disposables.add(i),i},t.prototype.resolveParams=function(e,r){var n=this;return function(i,o){var a,s,l;try{return Ju(i)?Rl(i)?i.multiple?(a=n.resolve(i.transform)).transform.apply(a,Br([n.resolveAll(i.token,new Ms,i.isOptional)],i.transformArgs)):(s=n.resolve(i.transform)).transform.apply(s,Br([n.resolve(i.token,e,i.isOptional)],i.transformArgs)):i.multiple?n.resolveAll(i.token,new Ms,i.isOptional):n.resolve(i.token,e,i.isOptional):Rl(i)?(l=n.resolve(i.transform,e)).transform.apply(l,Br([n.resolve(i.token,e)],i.transformArgs)):n.resolve(i,e)}catch(d){throw new Error(Yu(r,o,d))}}},t.prototype.ensureNotDisposed=function(){if(this.disposed)throw new Error("This container has been disposed, you cannot interact with a disposed container")},t})(),Se=new Gw;function Vw(t){return function(e){Qu.set(e,Xu(e)),t&&t.token&&(Array.isArray(t.token)?t.token.forEach(function(r){Se.register(r,e)}):Se.register(t.token,e))}}var Mr=Vw;if(typeof Reflect>"u"||!Reflect.getMetadata)throw new Error(`tsyringe requires a reflect polyfill. Please add 'import "reflect-metadata"' to the top of your entry point.`);var ep,no=class{attrId="";attrValues=[];constructor(e={}){Object.assign(e)}};c([u({type:f.ObjectIdentifier})],no.prototype,"attrId",void 0);c([u({type:f.Any,repeated:"set"})],no.prototype,"attrValues",void 0);var wg=ep=class extends z{constructor(e){super(e),Object.setPrototypeOf(this,ep.prototype)}};wg=ep=c([C({type:x.Sequence,itemType:no})],wg);var tp,xg=tp=class extends z{constructor(e){super(e),Object.setPrototypeOf(this,tp.prototype)}};xg=tp=c([C({type:x.Sequence,itemType:mt})],xg);var Ww="1.2.840.113549",Kw=`${Ww}.1`,Ag=`${Kw}.12`,oa=`${Ag}.1`,iN=`${oa}.1`,oN=`${oa}.2`,aN=`${oa}.3`,sN=`${oa}.4`,cN=`${oa}.5`,lN=`${oa}.6`,io=`${Ag}.10.1`;var pN=`${io}.1`,fN=`${io}.2`,mN=`${io}.3`,hN=`${io}.4`,gN=`${io}.5`,bN=`${io}.6`,Bl="1.2.840.113549.1.9";var Ml=class{certId="";certValue=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};c([u({type:f.ObjectIdentifier})],Ml.prototype,"certId",void 0);c([u({type:f.Any,context:0})],Ml.prototype,"certValue",void 0);var Eg=`${Bl}.22`,AN=`${Eg}.1`,EN=`${Eg}.2`;var Pl=class{crlId="";crltValue=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};c([u({type:f.ObjectIdentifier})],Pl.prototype,"crlId",void 0);c([u({type:f.Any,context:0})],Pl.prototype,"crltValue",void 0);var Fw=`${Bl}.23`,IN=`${Fw}.1`;var Ps=class extends V{},cn=class{encryptionAlgorithm=new U;encryptedData=new Ps;constructor(e={}){Object.assign(this,e)}};c([u({type:U})],cn.prototype,"encryptionAlgorithm",void 0);c([u({type:Ps})],cn.prototype,"encryptedData",void 0);var rp,np;(function(t){t[t.v1=0]="v1"})(np||(np={}));var Ol=class extends V{},Os=rp=class extends z{constructor(e){super(e),Object.setPrototypeOf(this,rp.prototype)}};Os=rp=c([C({type:x.Sequence,itemType:Ze})],Os);var Yn=class{version=np.v1;privateKeyAlgorithm=new U;privateKey=new Ol;attributes;constructor(e={}){Object.assign(this,e)}};c([u({type:f.Integer})],Yn.prototype,"version",void 0);c([u({type:U})],Yn.prototype,"privateKeyAlgorithm",void 0);c([u({type:Ol})],Yn.prototype,"privateKey",void 0);c([u({type:Os,implicit:!0,context:0,optional:!0})],Yn.prototype,"attributes",void 0);var kg=class extends Yn{};kg=c([C({type:x.Sequence})],kg);var Sg=class extends cn{};Sg=c([C({type:x.Sequence})],Sg);var Nl=class{secretTypeId="";secretValue=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};c([u({type:f.ObjectIdentifier})],Nl.prototype,"secretTypeId",void 0);c([u({type:f.Any,context:0})],Nl.prototype,"secretValue",void 0);var Qn=class{mac=new eo;macSalt=new V;iterations=1;constructor(e={}){Object.assign(this,e)}};c([u({type:eo})],Qn.prototype,"mac",void 0);c([u({type:V})],Qn.prototype,"macSalt",void 0);c([u({type:f.Integer,defaultValue:1})],Qn.prototype,"iterations",void 0);var oo=class{version=3;authSafe=new mt;macData=new Qn;constructor(e={}){Object.assign(this,e)}};c([u({type:f.Integer})],oo.prototype,"version",void 0);c([u({type:mt})],oo.prototype,"authSafe",void 0);c([u({type:Qn,optional:!0})],oo.prototype,"macData",void 0);var ip,aa=class{bagId="";bagValue=new ArrayBuffer(0);bagAttributes;constructor(e={}){Object.assign(this,e)}};c([u({type:f.ObjectIdentifier})],aa.prototype,"bagId",void 0);c([u({type:f.Any,context:0})],aa.prototype,"bagValue",void 0);c([u({type:no,repeated:"set",optional:!0})],aa.prototype,"bagAttributes",void 0);var Cg=ip=class extends z{constructor(e){super(e),Object.setPrototypeOf(this,ip.prototype)}};Cg=ip=c([C({type:x.Sequence,itemType:aa})],Cg);var op,ap,sp,De="1.2.840.113549.1.9",RD=`${De}.0`,Ug=`${De}.24`,Ds=`${De}.25`,$g=`${De}.26`,Gg=`${De}.27`,BD=`${Ug}.1`,MD=`${Ug}.2`,PD=`${De}.1`,OD=`${De}.2`,ND=`${De}.3`,DD=`${De}.4`,LD=`${De}.5`,jD=`${De}.6`,hp=`${De}.7`,HD=`${De}.8`,UD=`${De}.9`,$D=`${De}.13`,Ls=`${De}.14`,GD=`${De}.15`,VD=`${De}.20`,WD=`${De}.21`;var KD=`${Ds}.1`,FD=`${Ds}.2`,zD=`${Ds}.3`,qD=`${Ds}.4`,XD=`${Ds}.5`,js="1.3.6.1.5.5.7.9",JD=`${js}.1`,YD=`${js}.2`,QD=`${js}.3`,ZD=`${js}.4`,eL=`${js}.5`,tL=`${$g}.1`,rL=`${$g}.2`,nL=`${Gg}.1`,iL=`${Gg}.2`,oL=`${De}.16`,aL=`${De}.22`,sL=`${De}.23`,cL=`${Ru}.65`,Dl=class extends Ve{ia5String;constructor(e={}){super(e)}toString(){return{}.toString(),this.ia5String||super.toString()}};c([u({type:f.IA5String})],Dl.prototype,"ia5String",void 0);Dl=c([C({type:x.Choice})],Dl);var Tg=class extends mt{};Tg=c([C({type:x.Sequence})],Tg);var Ig=class extends oo{};Ig=c([C({type:x.Sequence})],Ig);var _g=class extends cn{};_g=c([C({type:x.Sequence})],_g);var cp=class{value;constructor(e=""){this.value=e}toString(){return this.value}};c([u({type:f.IA5String})],cp.prototype,"value",void 0);cp=c([C({type:x.Choice})],cp);var Rg=class extends Dl{};Rg=c([C({type:x.Choice})],Rg);var Bg=class extends Ve{};Bg=c([C({type:x.Choice})],Bg);var lp=class{value;constructor(e=new Date){this.value=e}};c([u({type:f.GeneralizedTime})],lp.prototype,"value",void 0);lp=c([C({type:x.Choice})],lp);var Mg=class extends Ve{};Mg=c([C({type:x.Choice})],Mg);var dp=class{value;constructor(e="M"){this.value=e}toString(){return this.value}};c([u({type:f.PrintableString})],dp.prototype,"value",void 0);dp=c([C({type:x.Choice})],dp);var Ll=class{value;constructor(e=""){this.value=e}toString(){return this.value}};c([u({type:f.PrintableString})],Ll.prototype,"value",void 0);Ll=c([C({type:x.Choice})],Ll);var Pg=class extends Ll{};Pg=c([C({type:x.Choice})],Pg);var Og=class extends Ve{};Og=c([C({type:x.Choice})],Og);var up=class{value;constructor(e=""){this.value=e}toString(){return this.value}};c([u({type:f.ObjectIdentifier})],up.prototype,"value",void 0);up=c([C({type:x.Choice})],up);var Ng=class extends Pe{};Ng=c([C({type:x.Choice})],Ng);var pp=class{value;constructor(e=0){this.value=e}toString(){return this.value.toString()}};c([u({type:f.Integer})],pp.prototype,"value",void 0);pp=c([C({type:x.Choice})],pp);var Dg=class extends kt{};Dg=c([C({type:x.Sequence})],Dg);var Ns=class extends Ve{};Ns=c([C({type:x.Choice})],Ns);var Lg=op=class extends Ft{constructor(e){super(e),Object.setPrototypeOf(this,op.prototype)}};Lg=op=c([C({type:x.Sequence})],Lg);var jg=ap=class extends z{constructor(e){super(e),Object.setPrototypeOf(this,ap.prototype)}};jg=ap=c([C({type:x.Set,itemType:lr})],jg);var fp=class{value;constructor(e=""){this.value=e}toString(){return this.value}};c([u({type:f.BmpString})],fp.prototype,"value",void 0);fp=c([C({type:x.Choice})],fp);var mp=class extends U{};mp=c([C({type:x.Sequence})],mp);var Hg=sp=class extends z{constructor(e){super(e),Object.setPrototypeOf(this,sp.prototype)}};Hg=sp=c([C({type:x.Sequence,itemType:mp})],Hg);var gp,bp;var Vg=gp=class extends z{constructor(e){super(e),Object.setPrototypeOf(this,gp.prototype)}};Vg=gp=c([C({type:x.Sequence,itemType:U})],Vg);var Wg=bp=class extends z{constructor(e){super(e),Object.setPrototypeOf(this,bp.prototype)}};Wg=bp=c([C({type:x.Sequence,itemType:f.BitString})],Wg);var yp;var vp;(function(t){t[t.v1=0]="v1",t[t.v2=1]="v2"})(vp||(vp={}));var Kg=class extends U{};Kg=c([C({type:x.Sequence})],Kg);var dr=class{version=vp.v1;privateKeyAlgorithm=new U;privateKey=new ArrayBuffer(0);attributes;publicKey};c([u({type:f.Integer})],dr.prototype,"version",void 0);c([u({type:U})],dr.prototype,"privateKeyAlgorithm",void 0);c([u({type:f.OctetString})],dr.prototype,"privateKey",void 0);c([u({type:Os,context:0,implicit:!0,optional:!0})],dr.prototype,"attributes",void 0);c([u({type:f.BitString,context:1,implicit:!0,optional:!0})],dr.prototype,"publicKey",void 0);dr=c([C({type:x.Sequence})],dr);var Fg=class extends dr{};Fg=c([C({type:x.Sequence})],Fg);var zg=yp=class extends z{constructor(e){super(e),Object.setPrototypeOf(this,yp.prototype)}};zg=yp=c([C({type:x.Sequence,itemType:dr})],zg);var wp,xp;var qg=class extends U{};qg=c([C({type:x.Sequence})],qg);var Xg=wp=class extends z{constructor(e){super(e),Object.setPrototypeOf(this,wp.prototype)}};Xg=wp=c([C({type:x.Sequence,itemType:Xe})],Xg);var Jg=xp=class extends z{constructor(e){super(e),Object.setPrototypeOf(this,xp.prototype)}};Jg=xp=c([C({type:x.Sequence,itemType:dr})],Jg);var ht="2.16.840.1.101.3.4.3",ao=`${ht}.17`,so=`${ht}.18`,co=`${ht}.19`,Ap=`${ht}.20`,Ep=`${ht}.21`,kp=`${ht}.22`,Sp=`${ht}.23`,Cp=`${ht}.24`,Tp=`${ht}.25`,Ip=`${ht}.26`,_p=`${ht}.27`,Rp=`${ht}.28`,Bp=`${ht}.29`,Mp=`${ht}.30`,Pp=`${ht}.31`;var Op,Hs=Op=class extends z{constructor(e){super(e),Object.setPrototypeOf(this,Op.prototype)}};Hs=Op=c([C({type:x.Sequence,itemType:Ze})],Hs);var Pr=class{version=0;subject=new Te;subjectPKInfo=new Xe;attributes=new Hs;constructor(e={}){Object.assign(this,e)}};c([u({type:f.Integer})],Pr.prototype,"version",void 0);c([u({type:Te})],Pr.prototype,"subject",void 0);c([u({type:Xe})],Pr.prototype,"subjectPKInfo",void 0);c([u({type:Hs,implicit:!0,context:0,optional:!0})],Pr.prototype,"attributes",void 0);var Zn=class{certificationRequestInfo=new Pr;certificationRequestInfoRaw;signatureAlgorithm=new U;signature=new ArrayBuffer(0);constructor(e={}){Object.assign(this,e)}};c([u({type:Pr,raw:!0})],Zn.prototype,"certificationRequestInfo",void 0);c([u({type:U})],Zn.prototype,"signatureAlgorithm",void 0);c([u({type:f.BitString})],Zn.prototype,"signature",void 0);var mo="crypto.algorithm",Wp=class{getAlgorithms(){return Se.resolveAll(mo)}toAsnAlgorithm(e){let r={...e};r.hash&&typeof r.hash=="string"&&(r.hash={name:r.hash});for(let n of this.getAlgorithms()){let i=n.toAsnAlgorithm(r);if(i)return i}if(/^[0-9.]+$/.test(e.name)){let n=new U({algorithm:e.name});if("parameters"in e){let i=e;n.parameters=i.parameters}return n}throw new Error("Cannot convert WebCrypto algorithm to ASN.1 algorithm")}toWebAlgorithm(e){for(let n of this.getAlgorithms()){let i=n.toWebAlgorithm(e);if(i)return i}return{name:e.algorithm,parameters:e.parameters}}},uo="crypto.algorithmProvider";Se.registerSingleton(uo,Wp);var $l,It="1.3.36.3.3.2.8.1.1",Yg=`${It}.1`,Qg=`${It}.2`,Zg=`${It}.3`,eb=`${It}.4`,tb=`${It}.5`,rb=`${It}.6`,nb=`${It}.7`,ib=`${It}.8`,ob=`${It}.9`,ab=`${It}.10`,sb=`${It}.11`,cb=`${It}.12`,lb=`${It}.13`,db=`${It}.14`,ub="brainpoolP160r1",pb="brainpoolP160t1",fb="brainpoolP192r1",mb="brainpoolP192t1",hb="brainpoolP224r1",gb="brainpoolP224t1",bb="brainpoolP256r1",yb="brainpoolP256t1",vb="brainpoolP320r1",wb="brainpoolP320t1",xb="brainpoolP384r1",Ab="brainpoolP384t1",Eb="brainpoolP512r1",kb="brainpoolP512t1",Oe="ECDSA",fc=$l=class{toAsnAlgorithm(e){switch(e.name.toLowerCase()){case Oe.toLowerCase():if("hash"in e)switch((typeof e.hash=="string"?e.hash:e.hash.name).toLowerCase()){case"sha-1":return eg;case"sha-256":return tg;case"sha-384":return rg;case"sha-512":return ng}else if("namedCurve"in e){let r="";switch(e.namedCurve){case"P-256":r=ks;break;case"K-256":r=$l.SECP256K1;break;case"P-384":r=Ss;break;case"P-521":r=Uu;break;case ub:r=Yg;break;case pb:r=Qg;break;case fb:r=Zg;break;case mb:r=eb;break;case hb:r=tb;break;case gb:r=rb;break;case bb:r=nb;break;case yb:r=ib;break;case vb:r=ob;break;case wb:r=ab;break;case xb:r=sb;break;case Ab:r=cb;break;case Eb:r=lb;break;case kb:r=db;break}if(r)return new U({algorithm:on,parameters:G.serialize(new Jt({namedCurve:r}))})}}return null}toWebAlgorithm(e){switch(e.algorithm){case Es:return{name:Oe,hash:{name:"SHA-1"}};case zi:return{name:Oe,hash:{name:"SHA-256"}};case qi:return{name:Oe,hash:{name:"SHA-384"}};case Xi:return{name:Oe,hash:{name:"SHA-512"}};case on:{if(!e.parameters)throw new TypeError("Cannot get required parameters from EC algorithm");switch(G.parse(e.parameters,Jt).namedCurve){case ks:return{name:Oe,namedCurve:"P-256"};case $l.SECP256K1:return{name:Oe,namedCurve:"K-256"};case Ss:return{name:Oe,namedCurve:"P-384"};case Uu:return{name:Oe,namedCurve:"P-521"};case Yg:return{name:Oe,namedCurve:ub};case Qg:return{name:Oe,namedCurve:pb};case Zg:return{name:Oe,namedCurve:fb};case eb:return{name:Oe,namedCurve:mb};case tb:return{name:Oe,namedCurve:hb};case rb:return{name:Oe,namedCurve:gb};case nb:return{name:Oe,namedCurve:bb};case ib:return{name:Oe,namedCurve:yb};case ob:return{name:Oe,namedCurve:vb};case ab:return{name:Oe,namedCurve:wb};case sb:return{name:Oe,namedCurve:xb};case cb:return{name:Oe,namedCurve:Ab};case lb:return{name:Oe,namedCurve:Eb};case db:return{name:Oe,namedCurve:kb}}}}return null}};fc.SECP256K1="1.3.132.0.10";fc=$l=c([Mr()],fc);Se.registerSingleton(mo,fc);var Nb=Symbol("name"),Db=Symbol("value"),ve=class{constructor(e,r={},n=""){this[Nb]=e,this[Db]=n;for(let i in r)this[i]=r[i]}};ve.NAME=Nb;ve.VALUE=Db;var Kp=class{static toTextObject(e){let r=new ve("Algorithm Identifier",{},ur.toString(e.algorithm));if(e.parameters)if(e.algorithm===on){let n=new fc().toWebAlgorithm(e);n&&"namedCurve"in n?r["Named Curve"]=n.namedCurve:r.Parameters=e.parameters}else r.Parameters=e.parameters;return r}},ur=class{static toString(e){let r=this.items[e];return r||e}};ur.items={[Ji]:"sha1",[Cl]:"sha224",[Yi]:"sha256",[Qi]:"sha384",[Zi]:"sha512",[Yt]:"rsaEncryption",[Kn]:"sha1WithRSAEncryption",[cg]:"sha224WithRSAEncryption",[ea]:"sha256WithRSAEncryption",[Fn]:"sha384WithRSAEncryption",[zn]:"sha512WithRSAEncryption",[on]:"ecPublicKey",[Es]:"ecdsaWithSHA1",[Sl]:"ecdsaWithSHA224",[zi]:"ecdsaWithSHA256",[qi]:"ecdsaWithSHA384",[Xi]:"ecdsaWithSHA512",[Ph]:"TLS WWW server authentication",[Oh]:"TLS WWW client authentication",[Nh]:"Code Signing",[Dh]:"E-mail Protection",[Lh]:"Time Stamping",[jh]:"OCSP Signing",[El]:"Signed Data"};var Dr=class{static serialize(e){return this.serializeObj(e).join(`
`)}static pad(e=0){return"".padStart(2*e," ")}static serializeObj(e,r=0){let n=[],i=this.pad(r++),o="",a=e[ve.VALUE];a&&(o=` ${a}`),n.push(`${i}${e[ve.NAME]}:${o}`),i=this.pad(r);for(let s in e){if(typeof s=="symbol")continue;let l=e[s],d=s?`${s}: `:"";if(typeof l=="string"||typeof l=="number"||typeof l=="boolean")n.push(`${i}${d}${l}`);else if(l instanceof Date)n.push(`${i}${d}${l.toUTCString()}`);else if(Array.isArray(l))for(let p of l)p[ve.NAME]=s,n.push(...this.serializeObj(p,r));else if(l instanceof ve)l[ve.NAME]=s,n.push(...this.serializeObj(l,r));else if($.BufferSourceConverter.isBufferSource(l))s?(n.push(`${i}${d}`),n.push(...this.serializeBufferSource(l,r+1))):n.push(...this.serializeBufferSource(l,r));else if("toTextObject"in l){let p=l.toTextObject();p[ve.NAME]=s,n.push(...this.serializeObj(p,r))}else throw new TypeError("Cannot serialize data in text format. Unsupported type.")}return n}static serializeBufferSource(e,r=0){let n=this.pad(r),i=$.BufferSourceConverter.toUint8Array(e),o=[];for(let a=0;a<i.length;){let s=[];for(let l=0;l<16&&a<i.length;l++){l===8&&s.push("");let d=i[a++].toString(16).padStart(2,"0");s.push(d)}o.push(`${n}${s.join(" ")}`)}return o}static serializeAlgorithm(e){return this.algorithmSerializer.toTextObject(e)}};Dr.oidSerializer=ur;Dr.algorithmSerializer=Kp;var sa,ca,dn=class t{get parseOptions(){return F(this,ca,"f")}get rawData(){return F(this,sa,"f")||he(this,sa,G.serialize(this.asn),"f"),F(this,sa,"f")}constructor(...e){sa.set(this,void 0),ca.set(this,void 0),$.BufferSourceConverter.isBufferSource(e[0])?(he(this,ca,e[2],"f"),this.asn=G.parse(e[0],e[1],e[2]),he(this,sa,$.BufferSourceConverter.toArrayBuffer(e[0]),"f"),this.onInit(this.asn)):(he(this,ca,e[1],"f"),this.asn=e[0],this.onInit(this.asn))}equal(e){return e instanceof t?(0,$.isEqual)(e.rawData,this.rawData):!1}toString(e="text"){switch(e){case"asn":return G.toString(this.rawData,F(this,ca,"f"));case"text":return Dr.serialize(this.toTextObject());case"hex":return $.Convert.ToHex(this.rawData);case"base64":return $.Convert.ToBase64(this.rawData);case"base64url":return $.Convert.ToBase64Url(this.rawData);default:throw TypeError("Argument 'format' is unsupported value")}}getTextName(){return this.constructor.NAME}toTextObject(){let e=this.toTextObjectEmpty();return e[""]=this.rawData,e}toTextObjectEmpty(e){return new ve(this.getTextName(),{},e)}};sa=new WeakMap,ca=new WeakMap;dn.NAME="ASN";var Lb,mc=class t{static isCryptoKeyPair(e){return e&&e.privateKey&&e.publicKey}static isCryptoKey(e){return e&&e.usages&&e.type&&e.algorithm&&e.extractable!==void 0}constructor(){this.items=new Map,this[Lb]="CryptoProvider",typeof self<"u"&&typeof crypto<"u"?this.set(t.DEFAULT,crypto):typeof global<"u"&&global.crypto&&global.crypto.subtle&&this.set(t.DEFAULT,global.crypto)}clear(){this.items.clear()}delete(e){return this.items.delete(e)}forEach(e,r){return this.items.forEach(e,r)}has(e){return this.items.has(e)}get size(){return this.items.size}entries(){return this.items.entries()}keys(){return this.items.keys()}values(){return this.items.values()}[Symbol.iterator](){return this.items[Symbol.iterator]()}get(e=t.DEFAULT){let r=this.items.get(e.toLowerCase());if(!r)throw new Error(`Cannot get Crypto by name '${e}'`);return r}set(e,r){if(typeof e=="string"){if(!r)throw new TypeError("Argument 'value' is required");this.items.set(e.toLowerCase(),r)}else this.items.set(t.DEFAULT,e);return this}};Lb=Symbol.toStringTag;mc.DEFAULT="default";var gt=new mc,Nr={berOptions:{maxDepth:1/0,maxNodes:1/0,maxContentLength:1/0}};function Jw(t){let e=0;for(;e<t.length-1&&t[e]===0;)e++;let r=t.slice(e);if(r.length||(r=new Uint8Array([0])),r[0]>127){let n=new Uint8Array(r.length+1);n[0]=0,n.set(r,1),r=n}return r.buffer}function jb(t){return Jw($.BufferSourceConverter.toUint8Array($.Convert.FromHex(t||"")))}function Hb(t){let e=$.BufferSourceConverter.toUint8Array(t);return e.length>1&&e[0]===0&&e[1]>127&&(e=e.slice(1)),$.Convert.ToHex(e)}var Rt=class t extends dn{constructor(...e){let r,n;$.BufferSourceConverter.isBufferSource(e[0])?(r=$.BufferSourceConverter.toArrayBuffer(e[0]),n=e[1]):(r=G.serialize(new ft({extnID:e[0],critical:e[1],extnValue:new V($.BufferSourceConverter.toArrayBuffer(e[2]))})),n=Nr),super(r,ft,n)}onInit(e){this.type=e.extnID,this.critical=e.critical,this.value=e.extnValue.buffer}toTextObject(){let e=this.toTextObjectWithoutValue();return e[""]=this.value,e}toTextObjectWithoutValue(){let e=this.toTextObjectEmpty(this.critical?"critical":void 0);return e[ve.NAME]===t.NAME&&(e[ve.NAME]=ur.toString(this.type)),e}},Yw=/^[0-2](?:\.[1-9][0-9]*)+$/;function Qw(t){return new RegExp(Yw).test(t)}var Vl=class{constructor(e={}){this.items={};for(let r in e)this.register(r,e[r])}get(e){return this.items[e]||null}findId(e){return Qw(e)?e:this.get(e)}register(e,r){this.items[e]=r,this.items[r]=e}},Tt=new Vl;Tt.register("CN","2.5.4.3");Tt.register("L","2.5.4.7");Tt.register("ST","2.5.4.8");Tt.register("O","2.5.4.10");Tt.register("OU","2.5.4.11");Tt.register("C","2.5.4.6");Tt.register("DC","0.9.2342.19200300.100.1.25");Tt.register("E","1.2.840.113549.1.9.1");Tt.register("G","2.5.4.42");Tt.register("I","2.5.4.43");Tt.register("SN","2.5.4.4");Tt.register("T","2.5.4.12");function Zw(t,e){return`\\${$.Convert.ToHex($.Convert.FromUtf8String(e)).toUpperCase()}`}function ex(t){return t.replace(/([,+"\\<>;])/g,"\\$1").replace(/^([ #])/,"\\$1").replace(/([ ]$)/,"\\$1").replace(/([\r\n\t])/,Zw)}var ei=class t{static isASCII(e){for(let r=0;r<e.length;r++)if(e.charCodeAt(r)>255)return!1;return!0}static isPrintableString(e){return/^[A-Za-z0-9 '()+,-./:=?]*$/g.test(e)}constructor(e,r={}){this.extraNames=new Vl,this.asn=new Te;for(let n in r)if(Object.prototype.hasOwnProperty.call(r,n)){let i=r[n];this.extraNames.register(n,i)}typeof e=="string"?this.asn=this.fromString(e):e instanceof Te?this.asn=e:$.BufferSourceConverter.isBufferSource(e)?this.asn=G.parse(e,Te):this.asn=this.fromJSON(e)}getField(e){let r=this.extraNames.findId(e)||Tt.findId(e),n=[];for(let i of this.asn)for(let o of i)o.type===r&&n.push(o.value.toString());return n}getName(e){return this.extraNames.get(e)||Tt.get(e)}toString(){return this.asn.map(e=>e.map(r=>{let n=this.getName(r.type)||r.type,i=r.value.anyValue?`#${$.Convert.ToHex(r.value.anyValue)}`:ex(r.value.toString());return`${n}=${i}`}).join("+")).join(", ")}toJSON(){var e;let r=[];for(let n of this.asn){let i={};for(let o of n){let a=this.getName(o.type)||o.type;(e=i[a])!==null&&e!==void 0||(i[a]=[]),i[a].push(o.value.anyValue?`#${$.Convert.ToHex(o.value.anyValue)}`:o.value.toString())}r.push(i)}return r}fromString(e){let r=new Te,n=/(\d\.[\d.]*\d|[A-Za-z]+)=((?:"")|(?:".*?[^\\]")|(?:[^,+"\\](?=[,+]|$))|(?:[^,+].*?(?:[^\\][,+]))|(?:))([,+])?/g,i=null,o=",";for(;i=n.exec(`${e},`);){let[,a,s]=i,l=s[s.length-1];(l===","||l==="+")&&(s=s.slice(0,s.length-1),i[3]=l);let d=i[3];a=this.getTypeOid(a);let p=this.createAttribute(a,s);o==="+"?r[r.length-1].push(p):r.push(new _n([p])),o=d}return r}fromJSON(e){let r=new Te;for(let n of e){let i=new _n;for(let o in n){let a=this.getTypeOid(o),s=n[o];for(let l of s){let d=this.createAttribute(a,l);i.push(d)}}r.push(i)}return r}getTypeOid(e){if(/[\d.]+/.test(e)||(e=this.getName(e)||""),!e)throw new Error(`Cannot get OID for name type '${e}'`);return e}createAttribute(e,r){let n=new Ri({type:e});if(typeof r=="object")for(let i in r)switch(i){case"ia5String":n.value.ia5String=r[i];break;case"utf8String":n.value.utf8String=r[i];break;case"universalString":n.value.universalString=r[i];break;case"bmpString":n.value.bmpString=r[i];break;case"printableString":n.value.printableString=r[i];break}else if(r[0]==="#")n.value.anyValue=$.Convert.FromHex(r.slice(1));else{let i=this.processStringValue(r);e===this.getName("E")||e===this.getName("DC")?n.value.ia5String=i:t.isPrintableString(i)?n.value.printableString=i:n.value.utf8String=i}return n}processStringValue(e){let r=/"(.*?[^\\])?"/.exec(e);return r&&(e=r[1]),e.replace(/\\0a/gi,`
`).replace(/\\0d/gi,"\r").replace(/\\0g/gi,"	").replace(/\\(.)/g,"$1")}toArrayBuffer(){return G.serialize(this.asn)}async getThumbprint(e,r){let n,i="SHA-1";return e&&(typeof e=="object"&&"subtle"in e?n=e:(i=e,n=r)),n??(n=gt.get()),await n.subtle.digest(i,this.toArrayBuffer())}},Ub="Cannot initialize GeneralName from ASN.1 data.",Sb=`${Ub} Unsupported string format in use.`,tx=`${Ub} Value doesn't match to GUID regular expression.`,Cb=/^([0-9a-f]{8})-?([0-9a-f]{4})-?([0-9a-f]{4})-?([0-9a-f]{4})-?([0-9a-f]{12})$/i,Tb="1.3.6.1.4.1.311.25.1",Ib="1.3.6.1.4.1.311.20.2.3",Np="dns",Dp="dn",Lp="email",jp="ip",Hp="url",Up="guid",$p="upn",jl="id",Or=class extends dn{constructor(...e){var r;let n,i;if($.BufferSourceConverter.isBufferSource(e[0]))i=e[1],n=G.parse(e[0],ae,i);else if(typeof e[0]=="string")switch(i=Nr,e[0]){case Dp:{let o=new ei(e[1]).toArrayBuffer(),a=G.parse(o,Te,Nr);n=new ae({directoryName:a});break}case Np:n=new ae({dNSName:e[1]});break;case Lp:n=new ae({rfc822Name:e[1]});break;case Up:{let o=new RegExp(Cb,"i").exec(e[1]);if(!o)throw new Error("Cannot parse GUID value. Value doesn't match to regular expression");let a=o.slice(1).map((s,l)=>l<3?$.Convert.ToHex(new Uint8Array($.Convert.FromHex(s)).reverse()):s).join("");n=new ae({otherName:new Rn({typeId:Tb,value:G.serialize(new V($.Convert.FromHex(a)))})});break}case jp:n=new ae({iPAddress:e[1]});break;case jl:n=new ae({registeredID:e[1]});break;case $p:{n=new ae({otherName:new Rn({typeId:Ib,value:G.serialize(Jd.toASN(e[1]))})});break}case Hp:n=new ae({uniformResourceIdentifier:e[1]});break;default:throw new Error("Cannot create GeneralName. Unsupported type of the name")}else n=e[0],i=(r=e[1])!==null&&r!==void 0?r:Nr;super(n,i)}onInit(e){if(e.dNSName!=null)this.type=Np,this.value=e.dNSName;else if(e.rfc822Name!=null)this.type=Lp,this.value=e.rfc822Name;else if(e.iPAddress!=null)this.type=jp,this.value=e.iPAddress;else if(e.uniformResourceIdentifier!=null)this.type=Hp,this.value=e.uniformResourceIdentifier;else if(e.registeredID!=null)this.type=jl,this.value=e.registeredID;else if(e.directoryName!=null)this.type=Dp,this.value=new ei(e.directoryName).toString();else if(e.otherName!=null)if(e.otherName.typeId===Tb){this.type=Up;let r=G.parse(e.otherName.value,V,this.parseOptions),n=new RegExp(Cb,"i").exec($.Convert.ToHex(r));if(!n)throw new Error(tx);this.value=n.slice(1).map((i,o)=>o<3?$.Convert.ToHex(new Uint8Array($.Convert.FromHex(i)).reverse()):i).join("-")}else if(e.otherName.typeId===Ib)this.type=$p,this.value=G.parse(e.otherName.value,Ve,this.parseOptions).toString();else throw new Error(Sb);else throw new Error(Sb)}toJSON(){return{type:this.type,value:this.value}}toTextObject(){let e;switch(this.type){case Dp:case Np:case Up:case jp:case jl:case $p:case Hp:e=this.type.toUpperCase();break;case Lp:e="Email";break;default:throw new Error("Unsupported GeneralName type")}let r=this.value;return this.type===jl&&(r=ur.toString(r)),new ve(e,void 0,r)}},un=class extends dn{constructor(e,r){let n,i=Nr;if(e instanceof Be)n=e;else if(Array.isArray(e)){let o=[];for(let a of e)if(a instanceof ae)o.push(a);else{let s=G.parse(new Or(a.type,a.value).rawData,ae,Nr);o.push(s)}n=new Be(o)}else if($.BufferSourceConverter.isBufferSource(e))n=G.parse(e,Be,r),i=r??{};else throw new Error("Cannot initialize GeneralNames. Incorrect incoming arguments");super(n,i)}onInit(e){let r=[];for(let n of e){let i=null;try{i=new Or(n,this.parseOptions)}catch{continue}r.push(i)}this.items=r}toJSON(){return this.items.map(e=>e.toJSON())}toTextObject(){let e=super.toTextObjectEmpty();for(let r of this.items){let n=r.toTextObject(),i=e[n[ve.NAME]];Array.isArray(i)||(i=[],e[n[ve.NAME]]=i),i.push(n)}return e}};un.NAME="GeneralNames";var pc="-{5}",hc="\\n",rx=`[^${hc}]+`,nx=`${pc}BEGIN (${rx}(?=${pc}))${pc}`,ix=`${pc}END \\1${pc}`,ha="\\n",ox=`[^:${hc}]+`,ax=`(?:[^${hc}]+${ha}(?: +[^${hc}]+${ha})*)`,sx="[a-zA-Z0-9=+/]+",cx=`(?:${sx}${ha})+`,_b=`${nx}${ha}(?:((?:${ox}: ${ax})+))?${ha}?(${cx})${ix}`,lx=new RegExp(`[${hc}]+`,"g"),tt=class{static isPem(e){return typeof e=="string"&&new RegExp(_b,"g").test(e.replace(/\r/g,""))}static decodeWithHeaders(e){e=e.replace(/\r/g,"");let r=new RegExp(_b,"g"),n=[],i=null;for(;i=r.exec(e);){let o=i[3].replace(lx,""),a={type:i[1],headers:[],rawData:$.Convert.FromBase64(o)},s=i[2];if(s){let l=s.split(new RegExp(ha,"g")),d=null;for(let p of l){let[m,y]=p.split(/:(.*)/);if(y===void 0){if(!d)throw new Error("Cannot parse PEM string. Incorrect header value");d.value+=m.trim()}else d&&a.headers.push(d),d={key:m,value:y.trim()}}d&&a.headers.push(d)}n.push(a)}return n}static decode(e){return this.decodeWithHeaders(e).map(n=>n.rawData)}static decodeFirst(e){let r=this.decode(e);if(!r.length)throw new RangeError("PEM string doesn't contain any objects");return r[0]}static encode(e,r){if(Array.isArray(e)){let n=new Array;return r?e.forEach(i=>{if(!$.BufferSourceConverter.isBufferSource(i))throw new TypeError("Cannot encode array of BufferSource in PEM format. Not all items of the array are BufferSource");n.push(this.encodeStruct({type:r,rawData:$.BufferSourceConverter.toArrayBuffer(i)}))}):e.forEach(i=>{if(!("type"in i))throw new TypeError("Cannot encode array of PemStruct in PEM format. Not all items of the array are PemStrut");n.push(this.encodeStruct(i))}),n.join(`
`)}else{if(!r)throw new Error("Required argument 'tag' is missed");return this.encodeStruct({type:r,rawData:$.BufferSourceConverter.toArrayBuffer(e)})}}static encodeStruct(e){var r;let n=e.type.toLocaleUpperCase(),i=[];if(i.push(`-----BEGIN ${n}-----`),!((r=e.headers)===null||r===void 0)&&r.length){for(let a of e.headers)i.push(`${a.key}: ${a.value}`);i.push("")}let o=$.Convert.ToBase64(e.rawData);for(let a=0;a<o.length;a+=64)i.push(o.substring(a,a+64));return i.push(`-----END ${n}-----`),i.join(`
`)}};tt.CertificateTag="CERTIFICATE";tt.CrlTag="CRL";tt.CertificateRequestTag="CERTIFICATE REQUEST";tt.PublicKeyTag="PUBLIC KEY";tt.PrivateKeyTag="PRIVATE KEY";var Zt=class t extends dn{static isAsnEncoded(e){return $.BufferSourceConverter.isBufferSource(e)||typeof e=="string"}static toArrayBuffer(e){if(typeof e=="string"){if(tt.isPem(e))return tt.decode(e)[0];if($.Convert.isHex(e))return $.Convert.FromHex(e);if($.Convert.isBase64(e))return $.Convert.FromBase64(e);if($.Convert.isBase64Url(e))return $.Convert.FromBase64Url(e);throw new TypeError("Unsupported format of 'raw' argument. Must be one of DER, PEM, HEX, Base64, or Base4Url")}else{let r=$.BufferSourceConverter.toUint8Array(e);if(r.length>0&&r[0]===48)return $.BufferSourceConverter.toArrayBuffer(e);let n=$.Convert.ToBinary(e);if(tt.isPem(n))return tt.decode(n)[0];if($.Convert.isHex(n))return $.Convert.FromHex(n);if($.Convert.isBase64(n))return $.Convert.FromBase64(n);if($.Convert.isBase64Url(n))return $.Convert.FromBase64Url(n);throw new TypeError("Unsupported format of 'raw' argument. Must be one of DER, PEM, HEX, Base64, or Base4Url")}}constructor(...e){t.isAsnEncoded(e[0])?super(t.toArrayBuffer(e[0]),e[1],e[2]):super(e[0],e[1])}toString(e="pem"){return e==="pem"?tt.encode(this.rawData,this.tag):super.toString(e)}},ln=class t extends Zt{static async create(e,r=gt.get()){if(e instanceof t)return e;if(mc.isCryptoKey(e)){if(e.type!=="public")throw new TypeError("Public key is required");let n=await r.subtle.exportKey("spki",e);return new t(n)}else{if(e.publicKey)return e.publicKey;if($.BufferSourceConverter.isBufferSource(e))return new t(e);throw new TypeError("Unsupported PublicKeyType")}}constructor(e,r){Zt.isAsnEncoded(e)?super(e,Xe,r):super(e,r),this.tag=tt.PublicKeyTag}async export(e,r,n){let i,o=["verify"],a={hash:"SHA-256",...this.algorithm};r?(a=e,o=r,i=n):i=e,i??(i=gt.get());let s=this.rawData,l=G.parse(this.rawData,Xe,this.parseOptions);return l.algorithm.algorithm===Wn&&(s=dx(l,s)),i.subtle.importKey("spki",s,a,!0,o)}onInit(e){let r=Se.resolve(uo),n=this.algorithm=r.toWebAlgorithm(e.algorithm);if(e.algorithm.algorithm===Yt){let i=G.parse(e.subjectPublicKey,Xn,this.parseOptions),o=$.BufferSourceConverter.toUint8Array(i.modulus);n.publicExponent=$.BufferSourceConverter.toUint8Array(i.publicExponent),n.modulusLength=(o[0]?o:o.slice(1)).byteLength<<3}}async getThumbprint(e,r){let n,i="SHA-1";return e&&(typeof e=="object"&&"subtle"in e?n=e:(i=e,n=r)),n??(n=gt.get()),await n.subtle.digest(i,this.rawData)}async getKeyIdentifier(e,r){let n,i="SHA-1";e&&(typeof e=="object"&&"subtle"in e?n=e:(i=e,n=r)),n??(n=gt.get());let o=G.parse(this.rawData,Xe,this.parseOptions);return await n.subtle.digest(i,o.subjectPublicKey)}toTextObject(){let e=this.toTextObjectEmpty(),r=G.parse(this.rawData,Xe,this.parseOptions);switch(e.Algorithm=Dr.serializeAlgorithm(r.algorithm),r.algorithm.algorithm){case on:e["EC Point"]=r.subjectPublicKey;break;case Yt:default:e["Raw Data"]=r.subjectPublicKey}return e}};function dx(t,e){return t.algorithm=new U({algorithm:Yt,parameters:null}),e=G.serialize(t),e}var po=class t extends Rt{static async create(e,r=!1,n=gt.get()){if("name"in e&&"serialNumber"in e)return new t(e,r);let o=await(await ln.create(e,n)).getKeyIdentifier(n);return new t($.Convert.ToHex(o),r)}constructor(...e){if($.BufferSourceConverter.isBufferSource(e[0]))super(e[0],e[1]);else if(typeof e[0]=="string"){let r=new Tr({keyIdentifier:new Pi($.Convert.FromHex(e[0]))});super(Qa,e[1],G.serialize(r))}else{let r=e[0],n=r.name instanceof un?G.parse(r.name.rawData,Be,Nr):r.name,i=new Tr({authorityCertIssuer:n,authorityCertSerialNumber:$.Convert.FromHex(r.serialNumber)});super(Qa,e[1],G.serialize(i))}}onInit(e){super.onInit(e);let r=G.parse(e.extnValue,Tr,this.parseOptions);r.keyIdentifier&&(this.keyId=$.Convert.ToHex(r.keyIdentifier)),(r.authorityCertIssuer||r.authorityCertSerialNumber)&&(this.certId={name:r.authorityCertIssuer||[],serialNumber:r.authorityCertSerialNumber?$.Convert.ToHex(r.authorityCertSerialNumber):""})}toTextObject(){let e=this.toTextObjectWithoutValue(),r=G.parse(this.value,Tr,this.parseOptions);return r.authorityCertIssuer&&(e["Authority Issuer"]=new un(r.authorityCertIssuer).toTextObject()),r.authorityCertSerialNumber&&(e["Authority Serial Number"]=r.authorityCertSerialNumber),r.keyIdentifier&&(e[""]=r.keyIdentifier),e}};po.NAME="Authority Key Identifier";var Wl=class extends Rt{constructor(...e){if($.BufferSourceConverter.isBufferSource(e[0])){super(e[0],e[1]);let r=G.parse(this.value,Qr,this.parseOptions);this.ca=r.cA,this.pathLength=r.pathLenConstraint}else{let r=new Qr({cA:e[0],pathLenConstraint:e[1]});super(Bo,e[2],G.serialize(r)),this.ca=e[0],this.pathLength=e[1]}}toTextObject(){let e=this.toTextObjectWithoutValue();return this.ca&&(e.CA=this.ca),this.pathLength!==void 0&&(e["Path Length"]=this.pathLength),e}};Wl.NAME="Basic Constraints";var Rb;(function(t){t.serverAuth="1.3.6.1.5.5.7.3.1",t.clientAuth="1.3.6.1.5.5.7.3.2",t.codeSigning="1.3.6.1.5.5.7.3.3",t.emailProtection="1.3.6.1.5.5.7.3.4",t.timeStamping="1.3.6.1.5.5.7.3.8",t.ocspSigning="1.3.6.1.5.5.7.3.9"})(Rb||(Rb={}));var Kl=class extends Rt{constructor(...e){if($.BufferSourceConverter.isBufferSource(e[0])){super(e[0],e[1]);let r=G.parse(this.value,Ni,this.parseOptions);this.usages=r.map(n=>n)}else{let r=new Ni(e[0]);super(Po,e[1],G.serialize(r)),this.usages=e[0]}}toTextObject(){let e=this.toTextObjectWithoutValue();return e[""]=this.usages.map(r=>ur.toString(r)).join(", "),e}};Kl.NAME="Extended Key Usages";var Bb;(function(t){t[t.digitalSignature=1]="digitalSignature",t[t.nonRepudiation=2]="nonRepudiation",t[t.keyEncipherment=4]="keyEncipherment",t[t.dataEncipherment=8]="dataEncipherment",t[t.keyAgreement=16]="keyAgreement",t[t.keyCertSign=32]="keyCertSign",t[t.cRLSign=64]="cRLSign",t[t.encipherOnly=128]="encipherOnly",t[t.decipherOnly=256]="decipherOnly"})(Bb||(Bb={}));var Fl=class extends Rt{constructor(...e){if($.BufferSourceConverter.isBufferSource(e[0])){super(e[0],e[1]);let r=G.parse(this.value,No,this.parseOptions);this.usages=r.toNumber()}else{let r=new No(e[0]);super(ll,e[1],G.serialize(r)),this.usages=e[0]}}toTextObject(){let e=this.toTextObjectWithoutValue(),r=G.parse(this.value,No,this.parseOptions);return e[""]=r.toJSON().join(", "),e}};Fl.NAME="Key Usages";var fo=class t extends Rt{static async create(e,r=!1,n=gt.get()){let o=await(await ln.create(e,n)).getKeyIdentifier(n);return new t($.Convert.ToHex(o),r)}constructor(...e){if($.BufferSourceConverter.isBufferSource(e[0])){super(e[0],e[1]);let r=G.parse(this.value,At,this.parseOptions);this.keyId=$.Convert.ToHex(r)}else{let r=typeof e[0]=="string"?$.Convert.FromHex(e[0]):e[0],n=new At(r);super(fl,e[1],G.serialize(n)),this.keyId=$.Convert.ToHex(r)}}toTextObject(){let e=this.toTextObjectWithoutValue(),r=G.parse(this.value,At,this.parseOptions);return e[""]=r,e}};fo.NAME="Subject Key Identifier";var zl=class extends Rt{constructor(...e){$.BufferSourceConverter.isBufferSource(e[0])?super(e[0],e[1]):super(jo,e[1],new un(e[0]||[]).rawData)}onInit(e){super.onInit(e);let r=G.parse(e.extnValue,Lo,this.parseOptions);this.names=new un(r)}toTextObject(){let e=this.toTextObjectWithoutValue(),r=this.names.toTextObject();for(let n in r)e[n]=r[n];return e}};zl.NAME="Subject Alternative Name";var rt=class{static register(e,r){this.items.set(e,r)}static create(e,r){let n=new Rt(e,r),i=this.items.get(n.type);return i?new i(e,r):n}};rt.items=new Map;var ql=class extends Rt{constructor(...e){var r;if($.BufferSourceConverter.isBufferSource(e[0])){super(e[0],e[1]);let n=G.parse(this.value,rs,this.parseOptions);this.policies=n.map(i=>i.policyIdentifier)}else{let n=e[0],i=(r=e[1])!==null&&r!==void 0?r:!1,o=new rs(n.map(a=>new Oi({policyIdentifier:a})));super(sl,i,G.serialize(o)),this.policies=n}}toTextObject(){let e=this.toTextObjectWithoutValue();return e.Policy=this.policies.map(r=>new ve("",{},ur.toString(r))),e}};ql.NAME="Certificate Policies";rt.register(sl,ql);var ga=class extends Rt{constructor(...e){var r;if($.BufferSourceConverter.isBufferSource(e[0]))super(e[0],e[1]);else if(Array.isArray(e[0])&&typeof e[0][0]=="string"){let i=e[0].map(a=>new Ir({distributionPoint:new en({fullName:[new ae({uniformResourceIdentifier:a})]})})),o=new Pn(i);super(cl,e[1],G.serialize(o))}else{let n=new Pn(e[0]);super(cl,e[1],G.serialize(n))}(r=this.distributionPoints)!==null&&r!==void 0||(this.distributionPoints=[])}onInit(e){super.onInit(e);let r=G.parse(e.extnValue,Pn,this.parseOptions);this.distributionPoints=r}toTextObject(){let e=this.toTextObjectWithoutValue();return e["Distribution Point"]=this.distributionPoints.map(r=>{var n;let i=new ve("");return!((n=r.distributionPoint)===null||n===void 0)&&n.fullName&&(i[""]=r.distributionPoint.fullName.map(o=>new Or(o).toString()).join(", ")),r.reasons&&(i.Reasons=r.reasons.toString()),r.cRLIssuer&&(i["CRL Issuer"]=r.cRLIssuer.map(o=>o.toString()).join(", ")),i}),e}};ga.NAME="CRL Distribution Points";var Xl=class extends Rt{constructor(...e){var r,n,i,o;if($.BufferSourceConverter.isBufferSource(e[0]))super(e[0],e[1]);else if(e[0]instanceof Mi){let a=new Mi(e[0]);super(ol,e[1],G.serialize(a))}else{let a=e[0],s=new Mi;Ul(s,a,nu,"ocsp"),Ul(s,a,iu,"caIssuers"),Ul(s,a,ou,"timeStamping"),Ul(s,a,au,"caRepository"),super(ol,e[1],G.serialize(s))}(r=this.ocsp)!==null&&r!==void 0||(this.ocsp=[]),(n=this.caIssuers)!==null&&n!==void 0||(this.caIssuers=[]),(i=this.timeStamping)!==null&&i!==void 0||(this.timeStamping=[]),(o=this.caRepository)!==null&&o!==void 0||(this.caRepository=[])}onInit(e){super.onInit(e),this.ocsp=[],this.caIssuers=[],this.timeStamping=[],this.caRepository=[],G.parse(e.extnValue,Mi,this.parseOptions).forEach(n=>{switch(n.accessMethod){case nu:this.ocsp.push(new Or(n.accessLocation));break;case iu:this.caIssuers.push(new Or(n.accessLocation));break;case ou:this.timeStamping.push(new Or(n.accessLocation));break;case au:this.caRepository.push(new Or(n.accessLocation));break}})}toTextObject(){let e=this.toTextObjectWithoutValue();return this.ocsp.length&&Hl(e,"OCSP",this.ocsp),this.caIssuers.length&&Hl(e,"CA Issuers",this.caIssuers),this.timeStamping.length&&Hl(e,"Time Stamping",this.timeStamping),this.caRepository.length&&Hl(e,"CA Repository",this.caRepository),e}};Xl.NAME="Authority Info Access";function Hl(t,e,r){if(r.length===1)t[e]=r[0].toTextObject();else{let n=new ve("");r.forEach((i,o)=>{let a=i.toTextObject(),s=`${a[ve.NAME]} ${o+1}`,l=n[s];Array.isArray(l)||(l=[],n[s]=l),l.push(a)}),t[e]=n}}function Ul(t,e,r,n){let i=e[n];i&&(Array.isArray(i)?i:[i]).forEach(a=>{typeof a=="string"&&(a=new Or("url",a)),t.push(new Yr({accessMethod:r,accessLocation:G.parse(a.rawData,ae,Nr)}))})}var Jl=class extends Rt{constructor(...e){$.BufferSourceConverter.isBufferSource(e[0])?super(e[0],e[1]):super(yu,e[1],new un(e[0]||[]).rawData)}onInit(e){super.onInit(e);let r=G.parse(e.extnValue,Be,this.parseOptions);this.names=new un(r)}toTextObject(){let e=this.toTextObjectWithoutValue(),r=this.names.toTextObject();for(let n in r)e[n]=r[n];return e}};Jl.NAME="Issuer Alternative Name";var ba=class t extends dn{constructor(...e){let r,n;if($.BufferSourceConverter.isBufferSource(e[0]))r=$.BufferSourceConverter.toArrayBuffer(e[0]),n=e[1];else{let i=e[0],o=Array.isArray(e[1])?e[1].map(a=>$.BufferSourceConverter.toArrayBuffer(a)):[];r=G.serialize(new Ze({type:i,values:o})),n=Nr}super(r,Ze,n)}onInit(e){this.type=e.type,this.values=e.values}toTextObject(){let e=this.toTextObjectWithoutValue();return e.Value=this.values.map(r=>new ve("",{"":r})),e}toTextObjectWithoutValue(){let e=this.toTextObjectEmpty();return e[ve.NAME]===t.NAME&&(e[ve.NAME]=ur.toString(this.type)),e}};ba.NAME="Attribute";var Yl=class extends ba{constructor(...e){var r;if($.BufferSourceConverter.isBufferSource(e[0]))super(e[0],e[1]);else{let n=new Ns({printableString:e[0]});super(hp,[G.serialize(n)])}(r=this.password)!==null&&r!==void 0||(this.password="")}onInit(e){if(super.onInit(e),this.values[0]){let r=G.parse(this.values[0],Ns,this.parseOptions);this.password=r.toString()}}toTextObject(){let e=this.toTextObjectWithoutValue();return e[ve.VALUE]=this.password,e}};Yl.NAME="Challenge Password";var gc=class extends ba{constructor(...e){var r;if($.BufferSourceConverter.isBufferSource(e[0]))super(e[0],e[1]);else{let n=e[0],i=new Ft;for(let o of n)i.push(G.parse(o.rawData,ft,Nr));super(Ls,[G.serialize(i)])}(r=this.items)!==null&&r!==void 0||(this.items=[])}onInit(e){if(super.onInit(e),this.values[0]){let r=G.parse(this.values[0],Ft,this.parseOptions);this.items=r.map(n=>rt.create(G.serialize(n),this.parseOptions))}}toTextObject(){let e=this.toTextObjectWithoutValue(),r=this.items.map(n=>n.toTextObject());for(let n of r)e[n[ve.NAME]]=n;return e}};gc.NAME="Extensions";var ya=class{static register(e,r){this.items.set(e,r)}static create(e,r){let n=new ba(e,r),i=this.items.get(n.type);return i?new i(e,r):n}};ya.items=new Map;var bc="crypto.signatureFormatter",Fp=class{toAsnSignature(e,r){return $.BufferSourceConverter.toArrayBuffer(r)}toWebSignature(e,r){return $.BufferSourceConverter.toArrayBuffer(r)}},Gl,zp=Gl=class{static createPssParams(e,r){let n=Gl.getHashAlgorithm(e);return n?new Rr({hashAlgorithm:n,maskGenAlgorithm:new U({algorithm:qn,parameters:G.serialize(n)}),saltLength:r}):null}static getHashAlgorithm(e){let r=Se.resolve(uo);return typeof e=="string"?r.toAsnAlgorithm({name:e}):typeof e=="object"&&e&&"name"in e?r.toAsnAlgorithm(e):null}toAsnAlgorithm(e){switch(e.name.toLowerCase()){case"rsassa-pkcs1-v1_5":if("hash"in e){let r;if(typeof e.hash=="string")r=e.hash;else if(e.hash&&typeof e.hash=="object"&&"name"in e.hash&&typeof e.hash.name=="string")r=e.hash.name.toUpperCase();else throw new Error("Cannot get hash algorithm name");switch(r.toLowerCase()){case"sha-1":return new U({algorithm:Kn,parameters:null});case"sha-256":return new U({algorithm:ea,parameters:null});case"sha-384":return new U({algorithm:Fn,parameters:null});case"sha-512":return new U({algorithm:zn,parameters:null})}}else return new U({algorithm:Yt,parameters:null});break;case"rsa-pss":if("hash"in e){if(!("saltLength"in e&&typeof e.saltLength=="number"))throw new Error("Cannot get 'saltLength' from 'alg' argument");let r=Gl.createPssParams(e.hash,e.saltLength);if(!r)throw new Error("Cannot create PSS parameters");return new U({algorithm:Wn,parameters:G.serialize(r)})}else return new U({algorithm:Wn,parameters:null})}return null}toWebAlgorithm(e){switch(e.algorithm){case Yt:return{name:"RSASSA-PKCS1-v1_5"};case Kn:return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-1"}};case ea:return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-256"}};case Fn:return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-384"}};case zn:return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-512"}};case Wn:if(e.parameters){let r=G.parse(e.parameters,Rr);return{name:"RSA-PSS",hash:Se.resolve(uo).toWebAlgorithm(r.hashAlgorithm),saltLength:r.saltLength}}else return{name:"RSA-PSS"}}return null}};zp=Gl=c([Mr()],zp);Se.registerSingleton(mo,zp);var qp=class{toAsnAlgorithm(e){switch(e.name.toLowerCase()){case"sha-1":return new U({algorithm:Ji});case"sha-256":return new U({algorithm:Yi});case"sha-384":return new U({algorithm:Qi});case"sha-512":return new U({algorithm:Zi})}return null}toWebAlgorithm(e){switch(e.algorithm){case Ji:return{name:"SHA-1"};case Yi:return{name:"SHA-256"};case Qi:return{name:"SHA-384"};case Zi:return{name:"SHA-512"}}return null}};qp=c([Mr()],qp);Se.registerSingleton(mo,qp);var pn=class t{addPadding(e,r){let n=$.BufferSourceConverter.toUint8Array(r),i=new Uint8Array(e);return i.set(n,e-n.length),i.buffer}removePadding(e,r=!1){let n=$.BufferSourceConverter.toUint8Array(e);for(let i=0;i<n.length;i++)if(n[i]){n=n.slice(i);break}if(r&&n[0]>127){let i=new Uint8Array(n.length+1);return i.set(n,1),i.buffer}return n.buffer}toAsnSignature(e,r){if(e.name==="ECDSA"){let n=e.namedCurve,i=t.namedCurveSize.get(n)||t.defaultNamedCurveSize,o=new an,a=$.BufferSourceConverter.toUint8Array(r);return o.r=this.removePadding(a.slice(0,i),!0),o.s=this.removePadding(a.slice(i,i+i),!0),G.serialize(o)}return null}toWebSignature(e,r){if(e.name==="ECDSA"){let n=G.parse(r,an),i=e.namedCurve,o=t.namedCurveSize.get(i)||t.defaultNamedCurveSize,a=this.addPadding(o,this.removePadding(n.r)),s=this.addPadding(o,this.removePadding(n.s));return(0,$.combine)(a,s)}return null}};pn.namedCurveSize=new Map;pn.defaultNamedCurveSize=32;var Gp="1.3.101.110",Mb="1.3.101.111",Vp="1.3.101.112",Pb="1.3.101.113",Xp=class{toAsnAlgorithm(e){let r=null;switch(e.name.toLowerCase()){case"ed25519":r=Vp;break;case"x25519":r=Gp;break;case"eddsa":switch(e.namedCurve.toLowerCase()){case"ed25519":r=Vp;break;case"ed448":r=Pb;break}break;case"ecdh-es":switch(e.namedCurve.toLowerCase()){case"x25519":r=Gp;break;case"x448":r=Mb;break}}return r?new U({algorithm:r}):null}toWebAlgorithm(e){switch(e.algorithm){case Vp:return{name:"Ed25519"};case Pb:return{name:"EdDSA",namedCurve:"Ed448"};case Gp:return{name:"X25519"};case Mb:return{name:"ECDH-ES",namedCurve:"X448"}}return null}};Xp=c([Mr()],Xp);Se.registerSingleton(mo,Xp);var Jp=class{toAsnAlgorithm(e){let r=null;switch(e.name.toLowerCase()){case"ml-dsa-44":r=ao;break;case"ml-dsa-65":r=so;break;case"ml-dsa-87":r=co;break}return r?new U({algorithm:r}):null}toWebAlgorithm(e){switch(e.algorithm){case ao:return{name:"ML-DSA-44"};case so:return{name:"ML-DSA-65"};case co:return{name:"ML-DSA-87"}}return null}};Jp=c([Mr()],Jp);Se.registerSingleton(mo,Jp);var Yp=class{toAsnAlgorithm(e){let r=null;switch(e.name.toLowerCase()){case"slh-dsa-sha2-128s":r=Ap;break;case"slh-dsa-sha2-128f":r=Ep;break;case"slh-dsa-sha2-192s":r=kp;break;case"slh-dsa-sha2-192f":r=Sp;break;case"slh-dsa-sha2-256s":r=Cp;break;case"slh-dsa-sha2-256f":r=Tp;break;case"slh-dsa-shake-128s":r=Ip;break;case"slh-dsa-shake-128f":r=_p;break;case"slh-dsa-shake-192s":r=Rp;break;case"slh-dsa-shake-192f":r=Bp;break;case"slh-dsa-shake-256s":r=Mp;break;case"slh-dsa-shake-256f":r=Pp;break}return r?new U({algorithm:r}):null}toWebAlgorithm(e){switch(e.algorithm){case Ap:return{name:"SLH-DSA-SHA2-128s"};case Ep:return{name:"SLH-DSA-SHA2-128f"};case kp:return{name:"SLH-DSA-SHA2-192s"};case Sp:return{name:"SLH-DSA-SHA2-192f"};case Cp:return{name:"SLH-DSA-SHA2-256s"};case Tp:return{name:"SLH-DSA-SHA2-256f"};case Ip:return{name:"SLH-DSA-SHAKE-128s"};case _p:return{name:"SLH-DSA-SHAKE-128f"};case Rp:return{name:"SLH-DSA-SHAKE-192s"};case Bp:return{name:"SLH-DSA-SHAKE-192f"};case Mp:return{name:"SLH-DSA-SHAKE-256s"};case Pp:return{name:"SLH-DSA-SHAKE-256f"}}return null}};Yp=c([Mr()],Yp);Se.registerSingleton(mo,Yp);var Us,$s,Gs,Vs,Ws,Ks,Fs,la,Qp=class extends Zt{get subjectName(){return F(this,$s,"f")||he(this,$s,new ei(this.asn.certificationRequestInfo.subject),"f"),F(this,$s,"f")}get subject(){return F(this,Gs,"f")||he(this,Gs,this.subjectName.toString(),"f"),F(this,Gs,"f")}get signatureAlgorithm(){if(!F(this,Vs,"f")){let e=Se.resolve(uo);he(this,Vs,e.toWebAlgorithm(this.asn.signatureAlgorithm),"f")}return F(this,Vs,"f")}get signature(){return F(this,Ws,"f")||he(this,Ws,this.asn.signature,"f"),F(this,Ws,"f")}get publicKey(){return F(this,Ks,"f")||he(this,Ks,new ln(this.asn.certificationRequestInfo.subjectPKInfo,this.parseOptions),"f"),F(this,Ks,"f")}get attributes(){return F(this,Fs,"f")||he(this,Fs,this.asn.certificationRequestInfo.attributes.map(e=>ya.create(G.serialize(e),this.parseOptions)),"f"),F(this,Fs,"f")}get extensions(){if(!F(this,la,"f")){he(this,la,[],"f");let e=this.getAttribute(Ls);e instanceof gc&&he(this,la,e.items,"f")}return F(this,la,"f")}get tbs(){return F(this,Us,"f")||he(this,Us,this.asn.certificationRequestInfoRaw||G.serialize(this.asn.certificationRequestInfo),"f"),F(this,Us,"f")}constructor(e,r){let n=Zt.isAsnEncoded(e)?[e,Zn,r]:[e,r];super(n[0],n[1],n[2]),Us.set(this,void 0),$s.set(this,void 0),Gs.set(this,void 0),Vs.set(this,void 0),Ws.set(this,void 0),Ks.set(this,void 0),Fs.set(this,void 0),la.set(this,void 0),this.tag=tt.CertificateRequestTag}onInit(e){}getAttribute(e){for(let r of this.attributes)if(r.type===e)return r;return null}getAttributes(e){return this.attributes.filter(r=>r.type===e)}getExtension(e){for(let r of this.extensions)if(r.type===e)return r;return null}getExtensions(e){return this.extensions.filter(r=>r.type===e)}async verify(e=gt.get()){let r={...this.publicKey.algorithm,...this.signatureAlgorithm},n=await this.publicKey.export(r,["verify"],e),i=Se.resolveAll(bc).reverse(),o=null;for(let s of i)if(o=s.toWebSignature(r,this.signature),o)break;if(!o)throw Error("Cannot convert WebCrypto signature value to ASN.1 format");return await e.subtle.verify(this.signatureAlgorithm,n,o,this.tbs)}toTextObject(){let e=this.toTextObjectEmpty(),r=G.parse(this.rawData,Zn,this.parseOptions),n=r.certificationRequestInfo,i=new ve("",{Version:`${tn[n.version]} (${n.version})`,Subject:this.subject,"Subject Public Key Info":this.publicKey});if(this.attributes.length){let o=new ve("");for(let a of this.attributes){let s=a.toTextObject();o[s[ve.NAME]]=s}i.Attributes=o}return e.Data=i,e.Signature=new ve("",{Algorithm:Dr.serializeAlgorithm(r.signatureAlgorithm),"":r.signature}),e}};Us=new WeakMap,$s=new WeakMap,Gs=new WeakMap,Vs=new WeakMap,Ws=new WeakMap,Ks=new WeakMap,Fs=new WeakMap,la=new WeakMap;Qp.NAME="PKCS#10 Certificate Request";var zs,qs,Xs,Js,Ys,Qs,Zs,ec,tc,rc,da,nc,fn=class extends Zt{get publicKey(){return F(this,nc,"f")||he(this,nc,new ln(this.asn.tbsCertificate.subjectPublicKeyInfo,this.parseOptions),"f"),F(this,nc,"f")}get serialNumber(){return F(this,qs,"f")||he(this,qs,Hb(this.asn.tbsCertificate.serialNumber),"f"),F(this,qs,"f")}get subjectName(){return F(this,Xs,"f")||he(this,Xs,new ei(this.asn.tbsCertificate.subject),"f"),F(this,Xs,"f")}get subject(){return F(this,Js,"f")||he(this,Js,this.subjectName.toString(),"f"),F(this,Js,"f")}get issuerName(){return F(this,Ys,"f")||he(this,Ys,new ei(this.asn.tbsCertificate.issuer),"f"),F(this,Ys,"f")}get issuer(){return F(this,Qs,"f")||he(this,Qs,this.issuerName.toString(),"f"),F(this,Qs,"f")}get notBefore(){if(!F(this,Zs,"f")){let e=this.asn.tbsCertificate.validity.notBefore.utcTime||this.asn.tbsCertificate.validity.notBefore.generalTime;if(!e)throw new Error("Cannot get 'notBefore' value");he(this,Zs,e,"f")}return F(this,Zs,"f")}get notAfter(){if(!F(this,ec,"f")){let e=this.asn.tbsCertificate.validity.notAfter.utcTime||this.asn.tbsCertificate.validity.notAfter.generalTime;if(!e)throw new Error("Cannot get 'notAfter' value");he(this,ec,e,"f")}return F(this,ec,"f")}get signatureAlgorithm(){if(!F(this,tc,"f")){let e=Se.resolve(uo);he(this,tc,e.toWebAlgorithm(this.asn.signatureAlgorithm),"f")}return F(this,tc,"f")}get signature(){return F(this,rc,"f")||he(this,rc,this.asn.signatureValue,"f"),F(this,rc,"f")}get extensions(){return F(this,da,"f")||(he(this,da,[],"f"),this.asn.tbsCertificate.extensions&&he(this,da,this.asn.tbsCertificate.extensions.map(e=>rt.create(G.serialize(e),this.parseOptions)),"f")),F(this,da,"f")}get tbs(){return F(this,zs,"f")||he(this,zs,this.asn.tbsCertificateRaw||G.serialize(this.asn.tbsCertificate),"f"),F(this,zs,"f")}constructor(e,r){let n=Zt.isAsnEncoded(e)?[e,Ne,r]:[e,r];super(n[0],n[1],n[2]),zs.set(this,void 0),qs.set(this,void 0),Xs.set(this,void 0),Js.set(this,void 0),Ys.set(this,void 0),Qs.set(this,void 0),Zs.set(this,void 0),ec.set(this,void 0),tc.set(this,void 0),rc.set(this,void 0),da.set(this,void 0),nc.set(this,void 0),this.tag=tt.CertificateTag}onInit(e){}getExtension(e){for(let r of this.extensions)if(typeof e=="string"){if(r.type===e)return r}else if(r instanceof e)return r;return null}getExtensions(e){return this.extensions.filter(r=>typeof e=="string"?r.type===e:r instanceof e)}async verify(e={},r=gt.get()){let n,i,o=e.publicKey;try{if(!o)n={...this.publicKey.algorithm,...this.signatureAlgorithm},i=await this.publicKey.export(n,["verify"],r);else if("publicKey"in o)n={...o.publicKey.algorithm,...this.signatureAlgorithm},i=await o.publicKey.export(n,["verify"],r);else if(o instanceof ln)n={...o.algorithm,...this.signatureAlgorithm},i=await o.export(n,["verify"],r);else if($.BufferSourceConverter.isBufferSource(o)){let d=new ln(o);n={...d.algorithm,...this.signatureAlgorithm},i=await d.export(n,["verify"],r)}else n={...o.algorithm,...this.signatureAlgorithm},i=o}catch{return!1}let a=Se.resolveAll(bc).reverse(),s=null;for(let d of a)if(s=d.toWebSignature(n,this.signature),s)break;if(!s)throw Error("Cannot convert ASN.1 signature value to WebCrypto format");let l=await r.subtle.verify(this.signatureAlgorithm,i,s,this.tbs);if(e.signatureOnly)return l;{let p=(e.date||new Date).getTime();return l&&this.notBefore.getTime()<p&&p<this.notAfter.getTime()}}async getThumbprint(e,r){let n,i="SHA-1";return e&&(typeof e=="object"&&"subtle"in e?n=e:(i=e,n=r)),n??(n=gt.get()),await n.subtle.digest(i,this.rawData)}async isSelfSigned(e=gt.get()){return this.subject===this.issuer&&await this.verify({signatureOnly:!0},e)}toTextObject(){let e=this.toTextObjectEmpty(),r=G.parse(this.rawData,Ne,this.parseOptions),n=r.tbsCertificate,i=new ve("",{Version:`${tn[n.version]} (${n.version})`,"Serial Number":n.serialNumber,"Signature Algorithm":Dr.serializeAlgorithm(n.signature),Issuer:this.issuer,Validity:new ve("",{"Not Before":n.validity.notBefore.getTime(),"Not After":n.validity.notAfter.getTime()}),Subject:this.subject,"Subject Public Key Info":this.publicKey});if(n.issuerUniqueID&&(i["Issuer Unique ID"]=n.issuerUniqueID),n.subjectUniqueID&&(i["Subject Unique ID"]=n.subjectUniqueID),this.extensions.length){let o=new ve("");for(let a of this.extensions){let s=a.toTextObject();o[s[ve.NAME]]=s}i.Extensions=o}return e.Data=i,e.Signature=new ve("",{Algorithm:Dr.serializeAlgorithm(r.signatureAlgorithm),"":r.signatureValue}),e}};zs=new WeakMap,qs=new WeakMap,Xs=new WeakMap,Js=new WeakMap,Ys=new WeakMap,Qs=new WeakMap,Zs=new WeakMap,ec=new WeakMap,tc=new WeakMap,rc=new WeakMap,da=new WeakMap,nc=new WeakMap;fn.NAME="Certificate";var lo,Zp=class extends Array{constructor(e,r){if(super(),lo.set(this,void 0),Zt.isAsnEncoded(e))this.import(e,r);else if(e instanceof fn)this.push(e);else if(Array.isArray(e))for(let n of e)this.push(n)}export(e){let r=new Xt;r.version=1,r.encapContentInfo.eContentType=Qh,r.encapContentInfo.eContent=new Gi({single:new V}),r.certificates=new jn(this.map(o=>new Ln({certificate:G.parse(o.rawData,Ne,F(this,lo,"f"))})));let n=new mt({contentType:El,content:G.serialize(r)}),i=G.serialize(n);return e==="raw"?i:this.toString(e)}import(e,r){let n=Zt.toArrayBuffer(e),i=G.parse(n,mt,r);if(i.contentType!==El)throw new TypeError("Cannot parse CMS package. Incoming data is not a SignedData object.");let o=G.parse(i.content,Xt,r),a=[];for(let s of o.certificates||[])s.certificate&&a.push(new fn(s.certificate,r));this.clear();for(let s of a)this.push(s);he(this,lo,r,"f")}clear(){for(;this.pop(););}toString(e="pem"){let r=this.export("raw");switch(e){case"pem":return tt.encode(r,"CMS");case"pem-chain":return this.map(n=>n.toString("pem")).join(`
`);case"asn":return G.toString(r,F(this,lo,"f"));case"hex":return $.Convert.ToHex(r);case"base64":return $.Convert.ToBase64(r);case"base64url":return $.Convert.ToBase64Url(r);case"text":return Dr.serialize(this.toTextObject());default:throw TypeError("Argument 'format' is unsupported value")}}toTextObject(){let e=G.parse(this.export("raw"),mt,F(this,lo,"f")),r=G.parse(e.content,Xt,F(this,lo,"f"));return new ve("X509Certificates",{"Content Type":ur.toString(e.contentType),Content:new ve("",{Version:`${Je[r.version]} (${r.version})`,Certificates:new ve("",{Certificate:this.map(i=>i.toTextObject())})})})}};lo=new WeakMap;var Ql=class{constructor(e={}){this.certificates=[],e.certificates&&(this.certificates=e.certificates)}async build(e,r=gt.get()){let n=new Zp(e),i=e;for(;i=await this.findIssuer(i,r);){let o=await i.getThumbprint(r);for(let a of n){let s=await a.getThumbprint(r);if((0,$.isEqual)(o,s))throw new Error("Cannot build a certificate chain. Circular dependency.")}n.push(i)}return n}async findIssuer(e,r=gt.get()){if(!await e.isSelfSigned(r)){let n=e.getExtension(Qa);for(let i of this.certificates)if(i.subject===e.issuer){if(n){if(n.keyId){let o=i.getExtension(fl);if(o&&o.keyId!==n.keyId)continue}else if(n.certId){let o=i.getExtension(jo);if(o&&!(n.certId.serialNumber===i.serialNumber&&(0,$.isEqual)(G.serialize(n.certId.name),G.serialize(o))))continue}}try{let o={...i.publicKey.algorithm,...e.signatureAlgorithm},a=await i.publicKey.export(o,["verify"],r);if(!await e.verify({publicKey:a,signatureOnly:!0},r))continue}catch{continue}return i}}return null}};var ic,oc,ua,pa,fa,Ob;(function(t){t[t.unspecified=0]="unspecified",t[t.keyCompromise=1]="keyCompromise",t[t.cACompromise=2]="cACompromise",t[t.affiliationChanged=3]="affiliationChanged",t[t.superseded=4]="superseded",t[t.cessationOfOperation=5]="cessationOfOperation",t[t.certificateHold=6]="certificateHold",t[t.removeFromCRL=8]="removeFromCRL",t[t.privilegeWithdrawn=9]="privilegeWithdrawn",t[t.aACompromise=10]="aACompromise"})(Ob||(Ob={}));var Zl=class extends dn{get serialNumber(){return F(this,ic,"f")||he(this,ic,Hb(this.asn.userCertificate),"f"),F(this,ic,"f")}get revocationDate(){return F(this,oc,"f")||he(this,oc,this.asn.revocationDate.getTime(),"f"),F(this,oc,"f")}get reason(){return F(this,ua,"f")===void 0&&this.extensions,F(this,ua,"f")}get invalidity(){return F(this,pa,"f")===void 0&&this.extensions,F(this,pa,"f")}get extensions(){return F(this,fa,"f")||(he(this,fa,[],"f"),this.asn.crlEntryExtensions&&he(this,fa,this.asn.crlEntryExtensions.map(e=>{let r=rt.create(G.serialize(e),this.parseOptions);switch(r.type){case fu:F(this,ua,"f")===void 0&&he(this,ua,G.parse(r.value,Mo,this.parseOptions).reason,"f");break;case gu:F(this,pa,"f")===void 0&&he(this,pa,G.parse(r.value,Oo,this.parseOptions).value,"f");break}return r}),"f")),F(this,fa,"f")}constructor(...e){let r,n;if($.BufferSourceConverter.isBufferSource(e[0])?(r=$.BufferSourceConverter.toArrayBuffer(e[0]),n=e[1]):typeof e[0]=="string"?r=G.serialize(new sr({userCertificate:jb(e[0]),revocationDate:new Pe(e[1]),crlEntryExtensions:e[2]})):e[0]instanceof sr&&(r=e[0],n=e[1]),!r)throw new TypeError("Cannot create X509CrlEntry instance. Wrong constructor arguments.");let i=r instanceof sr?[r,n]:[r,sr,n];super(i[0],i[1],i[2]),ic.set(this,void 0),oc.set(this,void 0),ua.set(this,void 0),pa.set(this,void 0),fa.set(this,void 0)}onInit(e){}};ic=new WeakMap,oc=new WeakMap,ua=new WeakMap,pa=new WeakMap,fa=new WeakMap;var ac,sc,cc,lc,dc,uc,ma,ed=class extends Zt{get version(){return this.asn.tbsCertList.version}get signatureAlgorithm(){if(!F(this,sc,"f")){let e=Se.resolve(uo);he(this,sc,e.toWebAlgorithm(this.asn.signatureAlgorithm),"f")}return F(this,sc,"f")}get signature(){return this.asn.signature}get issuer(){return this.issuerName.toString()}get issuerName(){return F(this,cc,"f")||he(this,cc,new ei(this.asn.tbsCertList.issuer),"f"),F(this,cc,"f")}get thisUpdate(){if(!F(this,lc,"f")){let e=this.asn.tbsCertList.thisUpdate.getTime();if(!e)throw new Error("Cannot get 'thisUpdate' value");he(this,lc,e,"f")}return F(this,lc,"f")}get nextUpdate(){var e;return F(this,dc,"f")===void 0&&he(this,dc,((e=this.asn.tbsCertList.nextUpdate)===null||e===void 0?void 0:e.getTime())||void 0,"f"),F(this,dc,"f")}get entries(){var e;return F(this,uc,"f")||he(this,uc,((e=this.asn.tbsCertList.revokedCertificates)===null||e===void 0?void 0:e.map(r=>new Zl(r,this.parseOptions)))||[],"f"),F(this,uc,"f")}get extensions(){return F(this,ma,"f")||(he(this,ma,[],"f"),this.asn.tbsCertList.crlExtensions&&he(this,ma,this.asn.tbsCertList.crlExtensions.map(e=>rt.create(G.serialize(e),this.parseOptions)),"f")),F(this,ma,"f")}get tbs(){return F(this,ac,"f")||he(this,ac,this.asn.tbsCertListRaw||G.serialize(this.asn.tbsCertList),"f"),F(this,ac,"f")}get tbsCertListSignatureAlgorithm(){return this.asn.tbsCertList.signature}get certListSignatureAlgorithm(){return this.asn.signatureAlgorithm}constructor(e,r){let n=Zt.isAsnEncoded(e)?[e,Nn,r]:[e,r];super(n[0],n[1],n[2]),this.tag=tt.CrlTag,ac.set(this,void 0),sc.set(this,void 0),cc.set(this,void 0),lc.set(this,void 0),dc.set(this,void 0),uc.set(this,void 0),ma.set(this,void 0)}onInit(e){}getExtension(e){for(let r of this.extensions)if(typeof e=="string"){if(r.type===e)return r}else if(r instanceof e)return r;return null}getExtensions(e){return this.extensions.filter(r=>typeof e=="string"?r.type===e:r instanceof e)}async verify(e,r=gt.get()){if(!this.certListSignatureAlgorithm.isEqual(this.tbsCertListSignatureAlgorithm))throw new Error("algorithm identifier in the sequence tbsCertList and CertificateList mismatch");let n,i,o=e.publicKey;try{o instanceof fn?(n={...o.publicKey.algorithm,...o.signatureAlgorithm},i=await o.publicKey.export(n,["verify"])):o instanceof ln?(n={...o.algorithm,...this.signatureAlgorithm},i=await o.export(n,["verify"])):(n={...o.algorithm,...this.signatureAlgorithm},i=o)}catch{return!1}let a=Se.resolveAll(bc).reverse(),s=null;for(let l of a)if(s=l.toWebSignature(n,this.signature),s)break;if(!s)throw Error("Cannot convert ASN.1 signature value to WebCrypto format");return await r.subtle.verify(this.signatureAlgorithm,i,s,this.tbs)}async getThumbprint(e,r){let n,i="SHA-1";return e&&(typeof e=="object"&&"subtle"in e?n=e:(i=e,n=r)),n??(n=gt.get()),await n.subtle.digest(i,this.rawData)}findRevoked(e){let r=typeof e=="string"?e:e.serialNumber,n=jb(r);for(let i of this.asn.tbsCertList.revokedCertificates||[])if($.BufferSourceConverter.isEqual(i.userCertificate,n))return new Zl(G.serialize(i),this.parseOptions);return null}};ac=new WeakMap,sc=new WeakMap,cc=new WeakMap,lc=new WeakMap,dc=new WeakMap,uc=new WeakMap,ma=new WeakMap;rt.register(Bo,Wl);rt.register(Po,Kl);rt.register(ll,Fl);rt.register(fl,fo);rt.register(Qa,po);rt.register(jo,zl);rt.register(cl,ga);rt.register(ol,Xl);rt.register(yu,Jl);ya.register(hp,Yl);ya.register(Ls,gc);Se.registerSingleton(bc,Fp);Se.registerSingleton(bc,pn);pn.namedCurveSize.set("P-256",32);pn.namedCurveSize.set("K-256",32);pn.namedCurveSize.set("P-384",48);pn.namedCurveSize.set("P-521",66);function td(t){return ux.stubThis(t)}var ux={stubThis:t=>globalThis.fetch(t)};var $b={};async function Gb(t,e){if(!e)return!1;let{extensions:r}=t;if(!r)return!1;let{keyIdentifier:n,fromExtension:i}=await px(e),o=t.extensions.find(l=>l instanceof po);if(i&&o?.keyId&&o.keyId!==n)throw new Error(`Certificate's AuthorityKeyIdentifier did not match issuer's SubjectKeyIdentifier "${n}"`);let a=r.find(l=>l instanceof ga),s=[];if(a?.distributionPoints?.forEach(l=>{l.distributionPoint?.fullName?.forEach(d=>{d.uniformResourceIdentifier&&s.push(d.uniformResourceIdentifier)})}),!(s.length>0))return!1;for(let l of s){let d=`${n}|${l}`,p=$b[d];if(p){let O=new Date;if(!p.nextUpdate||p.nextUpdate>O)return p.revokedCerts.indexOf(t.serialNumber)>=0}let m;try{m=await(await td(l)).arrayBuffer()}catch{continue}let y;try{y=new ed(m)}catch{continue}if(!await y.verify({publicKey:e.publicKey}))throw new Error(`CRL from ${l} failed signature verification against issuer "${e.subject}"`);let T=y.getExtension(po);if(i&&T?.keyId&&T.keyId!==n)throw new Error(`CRL from ${l} contained an AuthorityKeyIdentifier that did not match issuer's SubjectKeyIdentifier "${n}"`);if(y.nextUpdate&&($b[d]={revokedCerts:y.entries.map(O=>O.serialNumber),nextUpdate:y.nextUpdate}),y.findRevoked(t))return!0}return!1}async function px(t){let e=t.extensions?.find(n=>n instanceof fo);return e?.keyId?{keyIdentifier:e.keyId,fromExtension:!0}:{keyIdentifier:(await fo.create(t.publicKey)).keyId,fromExtension:!1}}function Vb(t){let e;try{e=lt.decodeFirst(t)}catch(r){let n=r;throw new Error(`Error decoding authenticator extensions: ${n.message}`)}return Wb(e)}function Wb(t){let e={};for(let[r,n]of t)n instanceof Map?e[r]=Wb(n):e[r]=n;return e}function rd(t){if(t.byteLength<37)throw new Error(`Authenticator data was ${t.byteLength} bytes, expected at least 37 bytes`);let e=0,r=ee.toDataView(t),n=t.slice(e,e+=32),i=t.slice(e,e+=1),o=i[0],a={up:!!(o&1),uv:!!(o&4),be:!!(o&8),bs:!!(o&16),at:!!(o&64),ed:!!(o&128),flagsInt:o},s=t.slice(e,e+4),l=r.getUint32(e,!1);e+=4;let d,p,m;if(a.at){d=t.slice(e,e+=16);let T=r.getUint16(e);e+=2,p=t.slice(e,e+=T);let k=ee.fromHex("a301634f4b500327206745643235353139"),O=t.slice(e,e+k.byteLength),g=!1;ee.areEqual(k,O)&&(g=!0,t[e]=164);let b=lt.decodeFirst(t.slice(e)),E=Uint8Array.from(lt.encode(b));g&&(t[e]=163),m=E,e+=E.byteLength}let y,A;if(a.ed){let T=lt.decodeFirst(t.slice(e));A=Uint8Array.from(lt.encode(T)),y=Vb(A),e+=A.byteLength}if(t.byteLength>e)throw new Error("Leftover bytes detected while parsing authenticator data");return fx.stubThis({rpIdHash:n,flagsBuf:i,flags:a,counter:l,counterBuf:s,aaguid:d,credentialID:p,credentialPublicKey:m,extensionsData:y,extensionsDataBuffer:A})}var fx={stubThis:t=>t};function Bt(t,e=-7){return typeof t=="string"&&(t=ee.fromUTF8String(t)),br.digest(t,e)}var i8=yo(Su(),1);function ho(t){if([X.EdDSA].indexOf(t)>=0)return"Ed25519";if([X.ES256,X.ES384,X.ES512,X.ES256K].indexOf(t)>=0)return"ECDSA";if([X.RS256,X.RS384,X.RS512,X.RS1].indexOf(t)>=0)return"RSASSA-PKCS1-v1_5";if([X.PS256,X.PS384,X.PS512].indexOf(t)>=0)return"RSA-PSS";if([X.ML_DSA_44].indexOf(t)>=0)return"ML-DSA-44";if([X.ML_DSA_65].indexOf(t)>=0)return"ML-DSA-65";if([X.ML_DSA_87].indexOf(t)>=0)return"ML-DSA-87";throw new Error(`Could not map COSE alg value of ${t} to a WebCrypto key alg name`)}var pr=class extends Error{constructor({message:e,code:r,cause:n}){super(e,{cause:n}),Object.defineProperty(this,"code",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.name="SimpleWebAuthnError",this.code=r}},ti=class extends pr{constructor(e){let n=`This runtime's WebCrypto.subtle does not support use of ${ho(e)}`;super({message:n,code:"RUNTIME_NO_PQC_SUPPORT"})}};async function ct(t,e=[]){if(e.length===0)return!0;let r=e.map(d=>{try{return new fn(d)}catch(p){throw new pr({message:`Could not parse trust anchor certificate:
${d}`,code:"CERTIFICATE_PATH_VERIFICATION_FAILED",cause:p})}}),n=[];for(let d=0;d<r.length;d++){let p=r[d];try{Kb(p)}catch{continue}n.push(p)}if(n.length===0)throw new pr({message:"No specified trust anchor was valid for verifying x5c",code:"CERTIFICATE_PATH_VERIFICATION_FAILED"});let i=t.map(d=>new fn(d)),o=i[0],a=[];i.length>1&&(a=i.slice(1));let s=!0,l;for(let d of n)try{let p=i.concat([d]);if(new Set(p.map(b=>b.toString("pem"))).size!==p.length)throw new pr({message:"Invalid certificate path: found duplicate certificates",code:"CERTIFICATE_PATH_VERIFICATION_FAILED"});let A=await new Ql({certificates:[...a,d]}).build(o),k=A[A.length-1].equal(d),O=!1;if(!k&&A.length>1&&(O=await A[A.length-2].verify({publicKey:d.publicKey,signatureOnly:!0})),!(k||O))continue;O&&(A[A.length-1]=d),s=!1,l=A;break}catch(p){throw new pr({message:"Unexpected error while validating certificate path",code:"CERTIFICATE_PATH_VERIFICATION_FAILED",cause:p})}if(l)for(let d=0;d<l.length;d++){let p=l[d];try{Kb(p)}catch{throw new pr({message:`Found certificate out of validity period:
${p.toString()}`,code:"CERTIFICATE_PATH_VERIFICATION_FAILED"})}let m;d<l.length-1?m=l[d+1]:await p.isSelfSigned()&&(m=p);try{await mx(p,m)}catch(y){throw new pr({message:`The following certificate failed revocation status check
${p.toString()}`,code:"CERTIFICATE_PATH_VERIFICATION_FAILED",cause:y})}}else s=!0;if(s)throw new pr({message:"x5c could not be chained to any specified trust anchor",code:"CERTIFICATE_PATH_VERIFICATION_FAILED"});return!0}async function mx(t,e){if(await Gb(t,e))throw new Error("Found revoked certificate in certificate path")}function Kb(t){let{notBefore:e,notAfter:r}=t,n=new Date(Date.now());if(e>n||r<n)throw new Error("Certificate is not yet valid or expired")}function Fb(t){let e;if(t===zi)e=X.ES256;else if(t===qi)e=X.ES384;else if(t===Xi)e=X.ES512;else if(t===ea)e=X.RS256;else if(t===Fn)e=X.RS384;else if(t===zn)e=X.RS512;else if(t===Kn)e=X.RS1;else if(t===ao)e=X.ML_DSA_44;else if(t===so)e=X.ML_DSA_65;else if(t===co)e=X.ML_DSA_87;else throw new Error(`Unable to map X.509 signature algorithm ${t} to a COSE algorithm`);return e}function nd(t){let e=new Map,r=Re.parse(t,Ne),{tbsCertificate:n}=r,{subjectPublicKeyInfo:i}=n,o=i.algorithm.algorithm;if(o===on){if(!i.algorithm.parameters)throw new Error("Certificate public key was missing parameters (EC2)");let a=Re.parse(new Uint8Array(i.algorithm.parameters),Jt),s,l,{namedCurve:d}=a;if(d===ks)s=X.ES256,l=it.P256;else if(d===Ss)s=X.ES384,l=it.P384;else throw new Error(`Certificate public key contained unexpected namedCurve ${d} (EC2)`);let p=new Uint8Array(i.subjectPublicKey),m,y;if(p[0]===4){let T=1,k=(p.length-1)/2;m=p.slice(T,T+=k),y=p.slice(T)}else throw new Error('TODO: Figure out how to handle public keys in "compressed form"');let A=new Map;A.set(re.kty,dt.EC2),A.set(re.alg,s),A.set(re.crv,l),A.set(re.x,m),A.set(re.y,y),e=A}else if(o===Yt){let a=Re.parse(i.subjectPublicKey,Xn),s=new Map;s.set(re.kty,dt.RSA),s.set(re.alg,X.RS256),s.set(re.n,new Uint8Array(a.modulus)),s.set(re.e,new Uint8Array(a.publicExponent)),e=s}else if([ao,so,co].indexOf(o)>=0){let a=new Map;a.set(re.kty,dt.AKP),a.set(re.alg,Fb(o)),a.set(re.pub,new Uint8Array(i.subjectPublicKey)),e=a}else throw new Error(`Certificate public key contained unexpected algorithm ID ${o}`);return e}function Mt(t){let{signature:e,data:r,credentialPublicKey:n,x509Certificate:i,hashAlgorithm:o}=t;if(!i&&!n)throw new Error('Must declare either "leafCert" or "credentialPublicKey"');if(i&&n)throw new Error('Must not declare both "leafCert" and "credentialPublicKey"');let a=new Map;return n?a=gr(n):i&&(a=nd(i)),hx.stubThis(br.verify({cosePublicKey:a,signature:e,data:r,shaHashOverride:o}))}var hx={stubThis:t=>t};function zb(t){let e=t.split(".");return[JSON.parse(ce.toUTF8String(e[0])),JSON.parse(ce.toUTF8String(e[1])),e[2]]}function qb(t){let e;if(t==="ES256")e=X.ES256;else if(t==="ES384")e=X.ES384;else if(t==="ES512")e=X.ES512;else if(t==="RS256")e=X.RS256;else if(t==="RS384")e=X.RS384;else if(t==="RS512")e=X.RS512;else throw new Error(`Unable to map JWS algorithm "${t}" to a COSE algorithm`);return e}async function ri(t){let e=await vt(),{keyData:r,algorithm:n}=t;return e.subtle.importKey("jwk",r,n,!1,["verify"])}async function id(t){let{cosePublicKey:e,signature:r,data:n,shaHashOverride:i}=t,o=await vt(),a=e.get(re.alg),s=e.get(re.crv),l=e.get(re.x),d=e.get(re.y);if(!a)throw new Error("Public key was missing alg (EC2)");if(!s)throw new Error("Public key was missing crv (EC2)");if(!l)throw new Error("Public key was missing x (EC2)");if(!d)throw new Error("Public key was missing y (EC2)");let p;if(s===it.P256)p="P-256";else if(s===it.P384)p="P-384";else if(s===it.P521)p="P-521";else throw new Error(`Unexpected COSE crv value of ${s} (EC2)`);let m={kty:"EC",crv:p,x:ce.fromBuffer(l),y:ce.fromBuffer(d),ext:!1},A=await ri({keyData:m,algorithm:{name:"ECDSA",namedCurve:p}}),T=xn(a);i&&(T=xn(i));let k={name:"ECDSA",hash:{name:T}};return o.subtle.verify(k,A,r,n)}async function od(t){let{cosePublicKey:e,signature:r,data:n,shaHashOverride:i}=t,o=await vt(),a=e.get(re.alg),s=e.get(re.n),l=e.get(re.e);if(!a)throw new Error("Public key was missing alg (RSA)");if(!jt(a))throw new Error(`Public key had invalid alg ${a} (RSA)`);if(!s)throw new Error("Public key was missing n (RSA)");if(!l)throw new Error("Public key was missing e (RSA)");let d={kty:"RSA",alg:"",n:ce.fromBuffer(s),e:ce.fromBuffer(l),ext:!1},p={name:ho(a),hash:{name:xn(a)}},m={name:ho(a)};if(i&&(p.hash.name=xn(i)),p.name==="RSASSA-PKCS1-v1_5")p.hash.name==="SHA-256"?d.alg="RS256":p.hash.name==="SHA-384"?d.alg="RS384":p.hash.name==="SHA-512"?d.alg="RS512":p.hash.name==="SHA-1"&&(d.alg="RS1");else if(p.name==="RSA-PSS"){let A=0;p.hash.name==="SHA-256"?(d.alg="PS256",A=32):p.hash.name==="SHA-384"?(d.alg="PS384",A=48):p.hash.name==="SHA-512"&&(d.alg="PS512",A=64),m.saltLength=A}else throw new Error(`Unexpected RSA key algorithm ${a} (${p.name})`);let y=await ri({keyData:d,algorithm:p});return o.subtle.verify(m,y,r,n)}function Xb(t,e){let[r,n,i]=t.split("."),o=nd(e),a=ee.fromUTF8String(`${r}.${n}`),s=ce.toBuffer(i),l=JSON.parse(ce.toUTF8String(r)),d=qb(l.alg);if(wn(o))return id({data:a,signature:s,cosePublicKey:o,shaHashOverride:d});if(ko(o))return od({data:a,signature:s,cosePublicKey:o,shaHashOverride:d});let p=o.get(re.kty);throw new Error(`JWT verification with public key of kty ${p} is not supported by this method`)}function Jb(t){let e=t.replace("-----BEGIN CERTIFICATE-----","").replace("-----END CERTIFICATE-----","").replace(/[\n ]/g,"");return ce.toBuffer(e,"base64")}async function Yb(t){let e=zb(t),r=e[0],n=e[1],i=r.x5c.map(We);try{let y=Pt.getRootCertificates({identifier:"mds"});await ct(i,y)}catch(y){let A=y;throw new Error("BLOB certificate path could not be validated",{cause:A})}let o=i[0];if(!await Xb(t,Jb(o)))throw new Error("BLOB signature could not be verified");let s=[];for(let y of n.entries)y.aaguid&&y.metadataStatement&&s.push(y.metadataStatement);let[l,d,p]=n.nextUpdate.split("-"),m=new Date(parseInt(l,10),parseInt(d,10)-1,parseInt(p,10));return{statements:s,parsedNextUpdate:m,payload:n}}async function Qb(t){let{cosePublicKey:e,signature:r,data:n}=t,i=await vt(),o=e.get(re.alg),a=e.get(re.pub);if(!o)throw new Error("Public key was missing alg (AKP)");if(!jt(o))throw new Error(`Public key had invalid alg ${o} (AKP)`);if(!a)throw new Error("Public key was missing pub (AKP)");let s=ho(o),l={kty:"AKP",alg:s,pub:ce.fromBuffer(a),ext:!1},d;try{d=await ri({keyData:l,algorithm:s})}catch(p){throw p.name==="NotSupportedError"?new ti(o):p}return i.subtle.verify(s,d,r,n)}async function Zb(t){let{cosePublicKey:e,signature:r,data:n}=t,i=await vt(),o=e.get(re.alg),a=e.get(re.crv),s=e.get(re.x);if(!o)throw new Error("Public key was missing alg (OKP)");if(!jt(o))throw new Error(`Public key had invalid alg ${o} (OKP)`);if(!a)throw new Error("Public key was missing crv (OKP)");if(!s)throw new Error("Public key was missing x (OKP)");let l;if(a===it.ED25519)l="Ed25519";else throw new Error(`Unexpected COSE crv value of ${a} (OKP)`);let d={kty:"OKP",crv:l,alg:"EdDSA",x:ce.fromBuffer(s),ext:!1},m=await ri({keyData:d,algorithm:{name:l,namedCurve:l}}),y={name:l};return i.subtle.verify(y,m,r,n)}function ty(t,e){let r=Re.parse(t,an),n=new Uint8Array(r.r),i=new Uint8Array(r.s),o=gx(e),a=ey(n,o),s=ey(i,o);return ee.concat([a,s])}function gx(t){switch(t){case it.P256:return 32;case it.P384:return 48;case it.P521:return 66;default:throw new Error(`Unexpected COSE crv value of ${t} (EC2)`)}}function ey(t,e){let r;if(t.length<e)r=new Uint8Array(e),r.set(t,e-t.length);else if(t.length===e)r=t;else if(t.length===e+1&&t[0]===0&&(t[1]&128)===128)r=t.subarray(1);else throw new Error(`Invalid signature component length ${t.length}, expected ${e}`);return r}function ry(t){let{cosePublicKey:e,signature:r,data:n,shaHashOverride:i}=t;if(wn(e)){let a=e.get(re.crv);if(!Jf(a))throw new Error(`unknown COSE curve ${a}`);let s=ty(r,a);return id({cosePublicKey:e,signature:s,data:n,shaHashOverride:i})}else{if(ko(e))return od({cosePublicKey:e,signature:r,data:n,shaHashOverride:i});if(qf(e))return Zb({cosePublicKey:e,signature:r,data:n});if(Xf(e))return Qb({cosePublicKey:e,signature:r,data:n})}let o=e.get(re.kty);throw new Error(`Signature verification with public key of kty ${o} is not supported by this method`)}var ee={};Dt(ee,{areEqual:()=>bx,concat:()=>wx,fromASCIIString:()=>Ex,fromHex:()=>vx,fromUTF8String:()=>Ax,toDataView:()=>kx,toHex:()=>yx,toUTF8String:()=>xx});function bx(t,e){return t.length!=e.length?!1:t.every((r,n)=>r===e[n])}function yx(t){return Array.from(t,r=>r.toString(16).padStart(2,"0")).join("")}function vx(t){if(!t)return Uint8Array.from([]);if(!(t.length!==0&&t.length%2===0&&!/[^a-fA-F0-9]/u.test(t)))throw new Error("Invalid hex string");let r=t.match(/.{1,2}/g)??[];return Uint8Array.from(r.map(n=>parseInt(n,16)))}function wx(t){let e=0,r=t.reduce((i,o)=>i+o.length,0),n=new Uint8Array(r);return t.forEach(i=>{n.set(i,e),e+=i.length}),n}function xx(t){return new globalThis.TextDecoder("utf-8").decode(t)}function Ax(t){return new globalThis.TextEncoder().encode(t)}function Ex(t){return Uint8Array.from(t.split("").map(e=>e.charCodeAt(0)))}function kx(t){return new DataView(t.buffer,t.byteOffset,t.length)}function We(t){let e;if(typeof t=="string")if(ce.isBase64URL(t))e=ce.toBase64(t);else if(ce.isBase64(t))e=t;else throw new Error("Certificate is not a valid base64 or base64url string");else e=ce.fromBuffer(t,"base64");let r="";for(let n=0;n<Math.ceil(e.length/64);n+=1){let i=64*n;r+=`${e.substr(i,64)}
`}return r=`-----BEGIN CERTIFICATE-----
${r}-----END CERTIFICATE-----
`,r}function ny(t){let e=globalThis.SubtleCrypto;if(typeof e.supports!="function")return!1;try{return e.supports("verify",t)}catch{return!1}}var iy=`-----BEGIN CERTIFICATE-----
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
`;var oy=`-----BEGIN CERTIFICATE-----
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
`,ay=`-----BEGIN CERTIFICATE-----
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
`,sy=`
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
`,cy=`
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
`;var ly=`-----BEGIN CERTIFICATE-----
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
`;var dy=`-----BEGIN CERTIFICATE-----
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
 `,uy=`-----BEGIN CERTIFICATE-----
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
`;var ef=class{constructor(){Object.defineProperty(this,"pemCertificates",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_runtimeSupportsPQC",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.pemCertificates=new Map}setRootCertificates(e){let{identifier:r,certificates:n}=e,i=[];for(let o of n)o instanceof Uint8Array?i.push(We(o)):i.push(o);this.pemCertificates.set(r,i)}getRootCertificates(e){let{identifier:r}=e;return this.pemCertificates.get(r)??[]}runtimeSupportsPQC(){return this._runtimeSupportsPQC??=ny("ML-DSA-44"),this._runtimeSupportsPQC}},Pt=new ef;Pt.setRootCertificates({identifier:"android-key",certificates:[oy,ay,sy,cy]});Pt.setRootCertificates({identifier:"android-safetynet",certificates:[iy]});Pt.setRootCertificates({identifier:"apple",certificates:[ly]});Pt.setRootCertificates({identifier:"mds",certificates:[dy,uy]});var Sx={residentKey:"preferred",userVerification:"preferred"};function tf(){return Pt.runtimeSupportsPQC()?[X.ML_DSA_44,X.EdDSA,X.ES256,X.RS256]:[X.EdDSA,X.ES256,X.RS256]}async function py(t){let{rpName:e,rpID:r,userName:n,userID:i,challenge:o=await _c(),userDisplayName:a="",timeout:s=6e4,attestationType:l="none",excludeCredentials:d=[],authenticatorSelection:p=Sx,extensions:m,supportedAlgorithmIDs:y=tf(),preferredAuthenticatorType:A}=t,T=y.map(b=>({alg:b,type:"public-key"}));p.residentKey===void 0?p.requireResidentKey&&(p.residentKey="required"):p.requireResidentKey=p.residentKey==="required";let k=o;if(typeof k=="string"&&(k=ee.fromUTF8String(k)),typeof i=="string")throw new Error("String values for `userID` are no longer supported. See https://simplewebauthn.dev/docs/advanced/server/custom-user-ids");let O=i;O||(O=await em());let g=[];return A&&(A==="securityKey"?(g.push("security-key"),p.authenticatorAttachment="cross-platform"):A==="localDevice"?(g.push("client-device"),p.authenticatorAttachment="platform"):A==="remoteDevice"&&(g.push("hybrid"),p.authenticatorAttachment="cross-platform")),{challenge:ce.fromBuffer(k),rp:{name:e,id:r},user:{id:ce.fromBuffer(O),name:n,displayName:a},pubKeyCredParams:T,timeout:s,attestation:l,excludeCredentials:d.map(b=>{if(!ce.isBase64URL(b.id))throw new Error(`excludeCredential id "${b.id}" is not a valid base64url string`);return{...b,id:ce.trimPadding(b.id),type:"public-key"}}),authenticatorSelection:p,extensions:{...m,credProps:!0},hints:g}}function ad({be:t,bs:e}){let r=e,n="singleDevice";if(t&&(n="multiDevice"),n==="singleDevice"&&r)throw new rf("Single-device credential indicated that it was backed up, which should be impossible.");return{credentialDeviceType:n,credentialBackedUp:r}}var rf=class extends Error{constructor(e){super(e),this.name="InvalidBackupFlags"}};async function sd(t,e){try{return await Promise.any(e.map(n=>new Promise((i,o)=>{Bt(ee.fromASCIIString(n)).then(a=>{ee.areEqual(t,a)?i(n):o()})})))}catch(r){throw r.name==="AggregateError"?new nf:r}}var nf=class extends Error{constructor(){super("Unexpected RP ID hash"),this.name="UnexpectedRPIDHash"}};async function fy(t){let{attStmt:e,clientDataHash:r,rpIdHash:n,credentialID:i,credentialPublicKey:o,aaguid:a,rootCertificates:s}=t,l=Uint8Array.from([0]),d=So(o),p=ee.concat([l,n,r,i,d]),m=e.get("sig"),y=e.get("x5c");if(!y)throw new Error("No attestation certificate provided in attestation statement (FIDOU2F)");if(!m)throw new Error("No attestation signature provided in attestation statement (FIDOU2F)");let A=Number.parseInt(ee.toHex(a),16);if(A!==0)throw new Error(`AAGUID "${A}" was not expected value`);try{await ct(y.map(We),s)}catch(T){let k=T;throw new Error(`${k.message} (FIDOU2F)`)}return Mt({signature:m,data:p,x509Certificate:y[0],hashAlgorithm:X.ES256})}var my="1.3.6.1.4.1.45724.1.1.4";function cd(t,e){if(!t)return!0;let r=t.find(a=>a.extnID===my);if(!r)return!0;let n=Re.parse(r.extnValue,V),i=new Uint8Array(n.buffer);if(!ee.areEqual(e,i)){let a=ee.toHex(i),s=ee.toHex(e);throw new Error(`Certificate extension id-fido-gen-ce-aaguid (${my}) value of "${a}" was present but not equal to attestation statement AAGUID value of "${s}"`)}return!0}var ld={debug(){},info(){},warn(){},error(){}};function hy(t){let e={...ld};return t.debug&&(e.debug=t.debug),t.info&&(e.info=t.info),t.warn&&(e.warn=t.warn),t.error&&(e.error=t.error),e}var Cx={url:"",no:0,nextUpdate:new Date(0)},Tx="https://mds.fidoalliance.org/",Ot;(function(t){t[t.DISABLED=0]="DISABLED",t[t.REFRESHING=1]="REFRESHING",t[t.READY=2]="READY"})(Ot||(Ot={}));var of=class{constructor(){Object.defineProperty(this,"mdsCache",{enumerable:!0,configurable:!0,writable:!0,value:{}}),Object.defineProperty(this,"statementCache",{enumerable:!0,configurable:!0,writable:!0,value:{}}),Object.defineProperty(this,"state",{enumerable:!0,configurable:!0,writable:!0,value:Ot.DISABLED}),Object.defineProperty(this,"verificationMode",{enumerable:!0,configurable:!0,writable:!0,value:"strict"}),Object.defineProperty(this,"logger",{enumerable:!0,configurable:!0,writable:!0,value:ld})}async initialize(e={}){this.statementCache={};let{mdsServers:r=[Tx],statements:n,verificationMode:i,logger:o=ld}=e;if(this.logger=hy(o),this.setState(Ot.REFRESHING),n?.length){let a=0;n.forEach(s=>{s.aaguid&&(this.statementCache[s.aaguid]={entry:{metadataStatement:s,statusReports:[],timeOfLastStatusChange:"1970-01-01"},url:Cx.url},a+=1)}),this.logger.info(`Cached ${a} local statements`)}if(r?.length){let a=Object.keys(this.statementCache).length,s=r.length;for(let p of r)try{let m={url:p,no:0,nextUpdate:new Date(0)},y=await this.downloadBlob(m);await this.verifyBlob(y,m)}catch(m){this.logger.error(`Could not download BLOB from ${p}:`,m),s-=1}let d=Object.keys(this.statementCache).length-a;this.logger.info(`Cached ${d} statements from ${s} metadata server(s)`)}i&&(this.verificationMode=i),this.setState(Ot.READY)}async getStatement(e){if(this.state===Ot.DISABLED||!e)return;e instanceof Uint8Array&&(e=Tc(e)),await this.pauseUntilReady();let r=this.statementCache[e];if(!r){if(this.verificationMode==="strict")throw new Error(`No metadata statement found for aaguid "${e}"`);return}if(r.url){let i=this.mdsCache[r.url];if(new Date>i.nextUpdate)try{this.setState(Ot.REFRESHING);let a=await this.downloadBlob(i);await this.verifyBlob(a,i)}finally{this.setState(Ot.READY)}}let{entry:n}=r;for(let i of n.statusReports){let{status:o}=i;if(o==="USER_VERIFICATION_BYPASS"||o==="ATTESTATION_KEY_COMPROMISE"||o==="USER_KEY_REMOTE_COMPROMISE"||o==="USER_KEY_PHYSICAL_COMPROMISE")throw new Error(`Detected compromised aaguid "${e}"`)}return n.metadataStatement}async downloadBlob(e){let{url:r}=e;return await(await td(r)).text()}async verifyBlob(e,r){let{url:n,no:i}=r,{payload:o,parsedNextUpdate:a}=await Yb(e);if(o.no<=i)throw new Error(`Latest BLOB no. ${o.no} is not greater than previous no. ${i}`);for(let s of o.entries)s.aaguid&&(this.statementCache[s.aaguid]={entry:s,url:n});n?this.mdsCache[n]={...r,no:o.no,nextUpdate:a}:a<new Date&&this.logger.warn(`\u26A0\uFE0F This MDS blob (serial: ${o.no}) contains stale data as of ${a.toISOString()}. Please consider re-initializing MetadataService with a newer MDS blob.`)}pauseUntilReady(){return this.state===Ot.READY?new Promise(r=>{r()}):new Promise((r,n)=>{let a=700,s=globalThis.setInterval(()=>{a<1?(clearInterval(s),n(`State did not become ready in ${7e4/1e3} seconds`)):this.state===Ot.READY&&(clearInterval(s),r()),a-=1},100)})}setState(e){this.state=e,e===Ot.DISABLED?this.logger.debug("MetadataService is DISABLED"):e===Ot.REFRESHING?this.logger.debug("MetadataService is REFRESHING"):e===Ot.READY&&this.logger.debug("MetadataService is READY")}},ni=new of;async function ii({statement:t,credentialPublicKey:e,x5c:r,attestationStatementAlg:n}){let{authenticationAlgorithms:i,authenticatorGetInfo:o,attestationRootCertificates:a}=t,s=new Set;i.forEach(O=>{let g=gy[O];g&&s.add(g)});let l=gr(e),d=l.get(re.kty),p=l.get(re.alg);if(!d)throw new Error("Credential public key was missing kty");if(!p)throw new Error("Credential public key was missing alg");if(!d)throw new Error("Credential public key was missing kty");let m={kty:d,alg:p};if(wn(l)){let O=l.get(re.crv);m.crv=O}let y=!1;for(let O of s)if(O.alg===m.alg&&O.kty===m.kty&&((O.kty===dt.EC2||O.kty===dt.OKP)&&(O.crv,m.crv),y=!0),y)break;if(!y){let O=i.map(E=>`'${E}' (COSE info: ${by(gy[E])})`),g=JSON.stringify(O,null,2).replace(/"/g,""),b=by(m);throw new Error(`Public key parameters ${b} did not match any of the following metadata algorithms:
${g}`)}if(n!==void 0&&o?.algorithms!==void 0){let O=o.algorithms.map(g=>g.alg);if(O.indexOf(n)<0)throw new Error(`Attestation statement alg ${n} did not match one of ${O}`)}let A=r.map(We),T=a.map(We),k=!1;return A.length===1&&T.indexOf(A[0])>=0&&(k=!0),k||await ct(A,T),!0}var gy={secp256r1_ecdsa_sha256_raw:{kty:2,alg:-7,crv:1},secp256r1_ecdsa_sha256_der:{kty:2,alg:-7,crv:1},rsassa_pss_sha256_raw:{kty:3,alg:-37},rsassa_pss_sha256_der:{kty:3,alg:-37},secp256k1_ecdsa_sha256_raw:{kty:2,alg:-47,crv:8},secp256k1_ecdsa_sha256_der:{kty:2,alg:-47,crv:8},rsassa_pss_sha384_raw:{kty:3,alg:-38},rsassa_pkcsv15_sha256_raw:{kty:3,alg:-257},rsassa_pkcsv15_sha384_raw:{kty:3,alg:-258},rsassa_pkcsv15_sha512_raw:{kty:3,alg:-259},rsassa_pkcsv15_sha1_raw:{kty:3,alg:-65535},secp384r1_ecdsa_sha384_raw:{kty:2,alg:-35,crv:2},secp512r1_ecdsa_sha256_raw:{kty:2,alg:-36,crv:3},ed25519_eddsa_sha512_raw:{kty:1,alg:-8,crv:6}};function by(t){let{kty:e,alg:r,crv:n}=t,i="";return e!==dt.RSA?i=`{ kty: ${e}, alg: ${r}, crv: ${n} }`:i=`{ kty: ${e}, alg: ${r} }`,i}async function yy(t){let{attStmt:e,clientDataHash:r,authData:n,credentialPublicKey:i,aaguid:o,rootCertificates:a}=t,s=e.get("sig"),l=e.get("x5c"),d=e.get("alg");if(!s)throw new Error("No attestation signature provided in attestation statement (Packed)");if(!d)throw new Error("Attestation statement did not contain alg (Packed)");if(!jt(d))throw new Error(`Attestation statement contained invalid alg ${d} (Packed)`);let p=ee.concat([n,r]),m=!1;if(l){let{subject:y,basicConstraintsCA:A,version:T,notBefore:k,notAfter:O,parsedCertificate:g}=Ho(l[0]),{OU:b,CN:E,O:P,C:R}=y;if(b!=="Authenticator Attestation")throw new Error('Certificate OU was not "Authenticator Attestation" (Packed|Full)');if(!E)throw new Error("Certificate CN was empty (Packed|Full)");if(!P)throw new Error("Certificate O was empty (Packed|Full)");if(!R||R.length!==2)throw new Error("Certificate C was not two-character ISO 3166 code (Packed|Full)");if(A)throw new Error("Certificate basic constraints CA was not `false` (Packed|Full)");if(T!==2)throw new Error("Certificate version was not `3` (ASN.1 value of 2) (Packed|Full)");let D=new Date;if(k>D)throw new Error(`Certificate not good before "${k.toString()}" (Packed|Full)`);if(D=new Date,O<D)throw new Error(`Certificate not good after "${O.toString()}" (Packed|Full)`);try{await cd(g.tbsCertificate.extensions,o)}catch(M){let h=M;throw new Error(`${h.message} (Packed|Full)`)}let W=await ni.getStatement(o);if(W){if(W.attestationTypes.indexOf("basic_full")<0)throw new Error("Metadata does not indicate support for full attestations (Packed|Full)");try{await ii({statement:W,credentialPublicKey:i,x5c:l,attestationStatementAlg:d})}catch(M){let h=M;throw new Error(`${h.message} (Packed|Full)`)}}else try{await ct(l.map(We),a)}catch(M){let h=M;throw new Error(`${h.message} (Packed|Full)`,{cause:h})}m=await Mt({signature:s,data:p,x509Certificate:l[0],hashAlgorithm:d})}else m=await Mt({signature:s,data:p,credentialPublicKey:i,hashAlgorithm:d});return m}async function vy(t){let{attStmt:e,clientDataHash:r,authData:n,aaguid:i,rootCertificates:o,verifyTimestampMS:a=!0,credentialPublicKey:s,attestationSafetyNetEnforceCTSCheck:l}=t,d=e.get("alg"),p=e.get("response");if(!e.get("ver"))throw new Error("No ver value in attestation (SafetyNet)");if(!p)throw new Error("No response was included in attStmt by authenticator (SafetyNet)");let A=ee.toUTF8String(p).split("."),T=JSON.parse(ce.toUTF8String(A[0])),k=JSON.parse(ce.toUTF8String(A[1])),O=A[2],{nonce:g,ctsProfileMatch:b,timestampMs:E}=k;if(a){let B=Date.now();if(E>Date.now())throw new Error(`Payload timestamp "${E}" was later than "${B}" (SafetyNet)`);let N=E+60*1e3;if(B=Date.now(),N<B)throw new Error(`Payload timestamp "${N}" has expired (SafetyNet)`)}let P=ee.concat([n,r]),R=await Bt(P),D=ce.fromBuffer(R,"base64");if(g!==D)throw new Error("Could not verify payload nonce (SafetyNet)");if(l&&!b)throw new Error("Could not verify device integrity (SafetyNet)");let W=ce.toBuffer(T.x5c[0],"base64"),M=Ho(W),{subject:h}=M;if(h.CN!=="attest.android.com")throw new Error('Certificate common name was not "attest.android.com" (SafetyNet)');let w=await ni.getStatement(i);if(w)try{await ii({statement:w,credentialPublicKey:s,x5c:T.x5c,attestationStatementAlg:d})}catch(B){let N=B;throw new Error(`${N.message} (SafetyNet)`)}else try{await ct(T.x5c.map(We),o)}catch(B){let N=B;throw new Error(`${N.message} (SafetyNet)`)}let v=ee.fromUTF8String(`${A[0]}.${A[1]}`),H=ce.toBuffer(O);return await Mt({signature:H,data:v,x509Certificate:W,hashAlgorithm:d})}var wy={196:"TPM_ST_RSP_COMMAND",32768:"TPM_ST_NULL",32769:"TPM_ST_NO_SESSIONS",32770:"TPM_ST_SESSIONS",32788:"TPM_ST_ATTEST_NV",32789:"TPM_ST_ATTEST_COMMAND_AUDIT",32790:"TPM_ST_ATTEST_SESSION_AUDIT",32791:"TPM_ST_ATTEST_CERTIFY",32792:"TPM_ST_ATTEST_QUOTE",32793:"TPM_ST_ATTEST_TIME",32794:"TPM_ST_ATTEST_CREATION",32801:"TPM_ST_CREATION",32802:"TPM_ST_VERIFIED",32803:"TPM_ST_AUTH_SECRET",32804:"TPM_ST_HASHCHECK",32805:"TPM_ST_AUTH_SIGNED",32809:"TPM_ST_FU_MANIFEST"},Lr={0:"TPM_ALG_ERROR",1:"TPM_ALG_RSA",4:"TPM_ALG_SHA",4:"TPM_ALG_SHA1",5:"TPM_ALG_HMAC",6:"TPM_ALG_AES",7:"TPM_ALG_MGF1",8:"TPM_ALG_KEYEDHASH",10:"TPM_ALG_XOR",11:"TPM_ALG_SHA256",12:"TPM_ALG_SHA384",13:"TPM_ALG_SHA512",16:"TPM_ALG_NULL",18:"TPM_ALG_SM3_256",19:"TPM_ALG_SM4",20:"TPM_ALG_RSASSA",21:"TPM_ALG_RSAES",22:"TPM_ALG_RSAPSS",23:"TPM_ALG_OAEP",24:"TPM_ALG_ECDSA",25:"TPM_ALG_ECDH",26:"TPM_ALG_ECDAA",27:"TPM_ALG_SM2",28:"TPM_ALG_ECSCHNORR",29:"TPM_ALG_ECMQV",32:"TPM_ALG_KDF1_SP800_56A",33:"TPM_ALG_KDF2",34:"TPM_ALG_KDF1_SP800_108",35:"TPM_ALG_ECC",37:"TPM_ALG_SYMCIPHER",38:"TPM_ALG_CAMELLIA",64:"TPM_ALG_CTR",65:"TPM_ALG_OFB",66:"TPM_ALG_CBC",67:"TPM_ALG_CFB",68:"TPM_ALG_ECB"},xy={0:"TPM_ECC_NONE",1:"TPM_ECC_NIST_P192",2:"TPM_ECC_NIST_P224",3:"TPM_ECC_NIST_P256",4:"TPM_ECC_NIST_P384",5:"TPM_ECC_NIST_P521",16:"TPM_ECC_BN_P256",17:"TPM_ECC_BN_P638",32:"TPM_ECC_SM2_P256"},Ay={"id:414D4400":{name:"AMD",id:"AMD"},"id:414E5400":{name:"Ant Group",id:"ANT"},"id:41544D4C":{name:"Atmel",id:"ATML"},"id:4252434D":{name:"Broadcom",id:"BRCM"},"id:4353434F":{name:"Cisco",id:"CSCO"},"id:464C5953":{name:"Flyslice Technologies",id:"FLYS"},"id:524F4343":{name:"Fuzhou Rockchip",id:"ROCC"},"id:474F4F47":{name:"Google",id:"GOOG"},"id:48504900":{name:"HPI",id:"HPI"},"id:48504500":{name:"HPE",id:"HPE"},"id:48495349":{name:"Huawei",id:"HISI"},"id:49424D00":{name:"IBM",id:"IBM"},"id:49465800":{name:"Infineon",id:"IFX"},"id:494E5443":{name:"Intel",id:"INTC"},"id:4C454E00":{name:"Lenovo",id:"LEN"},"id:4D534654":{name:"Microsoft",id:"MSFT"},"id:4E534D20":{name:"National Semiconductor",id:"NSM"},"id:4E545A00":{name:"Nationz",id:"NTZ"},"id:4E534700":{name:"NSING",id:"NSG"},"id:4E544300":{name:"Nuvoton Technology",id:"NTC"},"id:51434F4D":{name:"Qualcomm",id:"QCOM"},"id:534D534E":{name:"Samsung",id:"SMSN"},"id:53454345":{name:"SecEdge",id:"SECE"},"id:534E5300":{name:"Sinosun",id:"SNS"},"id:534D5343":{name:"SMSC",id:"SMSC"},"id:53544D20":{name:"STMicroelectronics",id:"STM"},"id:54584E00":{name:"Texas Instruments",id:"TXN"},"id:57454300":{name:"Winbond",id:"WEC"},"id:5345414C":{name:"Wisekey",id:"SEAL"},"id:FFFFF1D0":{name:"FIDO Alliance",id:"FIDO"}},Ey={TPM_ECC_NIST_P256:1,TPM_ECC_NIST_P384:2,TPM_ECC_NIST_P521:3,TPM_ECC_BN_P256:1,TPM_ECC_SM2_P256:1};function ky(t){let e=0,r=ee.toDataView(t),n=r.getUint32(e);e+=4;let i=r.getUint16(e);e+=2;let o=wy[i],a=r.getUint16(e);e+=2;let s=t.slice(e,e+=a),l=r.getUint16(e);e+=2;let d=t.slice(e,e+=l),p=t.slice(e,e+=8),m=r.getUint32(e);e+=4;let y=r.getUint32(e);e+=4;let A=!!t.slice(e,e+=1),T={clock:p,resetCount:m,restartCount:y,safe:A},k=t.slice(e,e+=8),O=r.getUint16(e);e+=2;let g=t.slice(e,e+=O),b=ee.toDataView(g),E=r.getUint16(e);e+=2;let P=t.slice(e,e+=E),R={nameAlg:Lr[b.getUint16(0)],nameAlgBuffer:g.slice(0,2),name:g,qualifiedName:P};return{magic:n,type:o,qualifiedSigner:s,extraData:d,clockInfo:T,firmwareVersion:k,attested:R}}function Sy(t){let e=0,r=ee.toDataView(t),n=Lr[r.getUint16(e)];e+=2;let i=Lr[r.getUint16(e)];e+=2;let o=r.getUint32(e);e+=4;let a={fixedTPM:!!(o&1),stClear:!!(o&2),fixedParent:!!(o&8),sensitiveDataOrigin:!!(o&16),userWithAuth:!!(o&32),adminWithPolicy:!!(o&64),noDA:!!(o&512),encryptedDuplication:!!(o&1024),restricted:!!(o&32768),decrypt:!!(o&65536),signOrEncrypt:!!(o&131072)},s=r.getUint16(e);e+=2;let l=t.slice(e,e+=s),d={},p=Uint8Array.from([]);if(n==="TPM_ALG_RSA"){let m=Lr[r.getUint16(e)];e+=2;let y=Lr[r.getUint16(e)];e+=2;let A=r.getUint16(e);e+=2;let T=r.getUint32(e);e+=4,d.rsa={symmetric:m,scheme:y,keyBits:A,exponent:T};let k=r.getUint16(e);e+=2,p=t.slice(e,e+=k)}else if(n==="TPM_ALG_ECC"){let m=Lr[r.getUint16(e)];e+=2;let y=Lr[r.getUint16(e)];e+=2;let A=xy[r.getUint16(e)];e+=2;let T=Lr[r.getUint16(e)];e+=2,d.ecc={symmetric:m,scheme:y,curveID:A,kdf:T};let k=r.getUint16(e);e+=2;let O=t.slice(e,e+=k),g=r.getUint16(e);e+=2;let b=t.slice(e,e+=g);p=ee.concat([O,b])}else throw new Error(`Unexpected type "${n}" (TPM)`);return{type:n,nameAlg:i,objectAttributes:a,authPolicy:l,parameters:d,unique:p}}function Cy(t){let e=`id:${t.substring(3).toUpperCase()}`;return Ay[e]}async function Ty(t){let{aaguid:e,attStmt:r,authData:n,credentialPublicKey:i,clientDataHash:o,rootCertificates:a}=t,s=r.get("ver"),l=r.get("sig"),d=r.get("alg"),p=r.get("x5c"),m=r.get("pubArea"),y=r.get("certInfo");if(s!=="2.0")throw new Error(`Unexpected ver "${s}", expected "2.0" (TPM)`);if(!l)throw new Error("No attestation signature provided in attestation statement (TPM)");if(!d)throw new Error("Attestation statement did not contain alg (TPM)");if(!jt(d))throw new Error(`Attestation statement contained invalid alg ${d} (TPM)`);if(!p)throw new Error("No attestation certificate provided in attestation statement (TPM)");if(!m)throw new Error("Attestation statement did not contain pubArea (TPM)");if(!y)throw new Error("Attestation statement did not contain certInfo (TPM)");let A=Sy(m),{unique:T,type:k,parameters:O}=A,g=gr(i);if(k==="TPM_ALG_RSA"){if(!ko(g))throw new Error(`Credential public key with kty ${g.get(re.kty)} did not match ${k}`);let se=g.get(re.n),Ye=g.get(re.e);if(!se)throw new Error("COSE public key missing n (TPM|RSA)");if(!Ye)throw new Error("COSE public key missing e (TPM|RSA)");if(!ee.areEqual(T,se))throw new Error("PubArea unique is not same as credentialPublicKey (TPM|RSA)");if(!O.rsa)throw new Error("Parsed pubArea type is RSA, but missing parameters.rsa (TPM|RSA)");let ge=Ye,Me=O.rsa.exponent||65537,yt=ge[0]+(ge[1]<<8)+(ge[2]<<16);if(Me!==yt)throw new Error(`Unexpected public key exp ${yt}, expected ${Me} (TPM|RSA)`)}else if(k==="TPM_ALG_ECC"){if(!wn(g))throw new Error(`Credential public key with kty ${g.get(re.kty)} did not match ${k}`);let se=g.get(re.crv),Ye=g.get(re.x),ge=g.get(re.y);if(!se)throw new Error("COSE public key missing crv (TPM|ECC)");if(!Ye)throw new Error("COSE public key missing x (TPM|ECC)");if(!ge)throw new Error("COSE public key missing y (TPM|ECC)");if(!ee.areEqual(T,ee.concat([Ye,ge])))throw new Error("PubArea unique is not same as public key x and y (TPM|ECC)");if(!O.ecc)throw new Error("Parsed pubArea type is ECC, but missing parameters.ecc (TPM|ECC)");let Me=O.ecc.curveID,yt=Ey[Me];if(yt!==se)throw new Error(`Public area key curve ID "${Me}" mapped to "${yt}" which did not match public key crv of "${se}" (TPM|ECC)`)}else throw new Error(`Unsupported pubArea.type "${k}"`);let b=ky(y),{magic:E,type:P,attested:R,extraData:D}=b;if(E!==4283712327)throw new Error(`Unexpected magic value "${E}", expected "0xff544347" (TPM)`);if(P!=="TPM_ST_ATTEST_CERTIFY")throw new Error(`Unexpected type "${P}", expected "TPM_ST_ATTEST_CERTIFY" (TPM)`);let W=await Bt(m,_x(R.nameAlg)),M=ee.concat([R.nameAlgBuffer,W]);if(!ee.areEqual(R.name,M))throw new Error("Attested name comparison failed (TPM)");let h=ee.concat([n,o]),w=await Bt(h,d);if(!ee.areEqual(D,w))throw new Error("CertInfo extra data did not equal hashed attestation (TPM)");if(p.length<1)throw new Error("No certificates present in x5c array (TPM)");let v=Ho(p[0]),{basicConstraintsCA:H,version:I,subject:B,notAfter:N,notBefore:pe}=v;if(H)throw new Error("Certificate basic constraints CA was not `false` (TPM)");if(I!==2)throw new Error("Certificate version was not `3` (ASN.1 value of 2) (TPM)");if(B.combined.length>0)throw new Error("Certificate subject was not empty (TPM)");let fe=new Date;if(pe>fe)throw new Error(`Certificate not good before "${pe.toString()}" (TPM)`);if(fe=new Date,N<fe)throw new Error(`Certificate not good after "${N.toString()}" (TPM)`);let ie=Re.parse(p[0],Ne);if(!ie.tbsCertificate.extensions)throw new Error("Certificate was missing extensions (TPM)");let Ae,le;if(ie.tbsCertificate.extensions.forEach(se=>{se.extnID===jo?Ae=Re.parse(se.extnValue,Lo):se.extnID===Po&&(le=Re.parse(se.extnValue,Ni))}),!Ae)throw new Error("Certificate did not contain subjectAltName extension (TPM)");if(!Ae[0].directoryName?.[0].length)throw new Error("Certificate subjectAltName extension directoryName was empty (TPM)");let{tcgAtTpmManufacturer:de,tcgAtTpmModel:Z,tcgAtTpmVersion:bt}=Ix(Ae[0].directoryName);if(!de||!Z||!bt)throw new Error("Certificate contained incomplete subjectAltName data (TPM)");if(!le)throw new Error("Certificate did not contain ExtendedKeyUsage extension (TPM)");if(!Cy(de))throw new Error(`Could not match TPM manufacturer "${de}" (TPM)`);if(le[0]!=="2.23.133.8.3")throw new Error(`Unexpected extKeyUsage "${le[0]}", expected "2.23.133.8.3" (TPM)`);try{await cd(ie.tbsCertificate.extensions,e)}catch(se){let Ye=se;throw new Error(`${Ye.message} (TPM)`)}let si=await ni.getStatement(e);if(si)try{await ii({statement:si,credentialPublicKey:i,x5c:p,attestationStatementAlg:d})}catch(se){let Ye=se;throw new Error(`${Ye.message} (TPM)`)}else try{await ct(p.map(We),a)}catch(se){let Ye=se;throw new Error(`${Ye.message} (TPM)`)}return Mt({signature:l,data:y,x509Certificate:p[0],hashAlgorithm:d})}function Ix(t){let e="2.23.133.2.1",r="2.23.133.2.2",n="2.23.133.2.3",i,o,a;return t.forEach(s=>{s.forEach(l=>{l.type===e?i=l.value.toString():l.type===r?o=l.value.toString():l.type===n&&(a=l.value.toString())})}),{tcgAtTpmManufacturer:i,tcgAtTpmModel:o,tcgAtTpmVersion:a}}function _x(t){if(t==="TPM_ALG_SHA256")return X.ES256;if(t==="TPM_ALG_SHA384")return X.ES384;if(t==="TPM_ALG_SHA512")return X.ES512;throw new Error(`Unexpected TPM attested name alg ${t}`)}var af,Iy="1.3.6.1.4.1.11129.2.1.17",sf;(function(t){t[t.verified=0]="verified",t[t.selfSigned=1]="selfSigned",t[t.unverified=2]="unverified",t[t.failed=3]="failed"})(sf||(sf={}));var go=class{verifiedBootKey=new V;deviceLocked=!1;verifiedBootState=sf.verified;verifiedBootHash;constructor(e={}){Object.assign(this,e)}};c([u({type:V})],go.prototype,"verifiedBootKey",void 0);c([u({type:f.Boolean})],go.prototype,"deviceLocked",void 0);c([u({type:f.Enumerated})],go.prototype,"verifiedBootState",void 0);c([u({type:V,optional:!0})],go.prototype,"verifiedBootHash",void 0);var va=af=class extends z{constructor(e){super(e),Object.setPrototypeOf(this,af.prototype)}};va=af=c([C({type:x.Set,itemType:f.Integer})],va);var ne=class{purpose;algorithm;keySize;digest;padding;ecCurve;rsaPublicExponent;mgfDigest;rollbackResistance;earlyBootOnly;activeDateTime;originationExpireDateTime;usageExpireDateTime;usageCountLimit;noAuthRequired;userAuthType;authTimeout;allowWhileOnBody;trustedUserPresenceRequired;trustedConfirmationRequired;unlockedDeviceRequired;allApplications;applicationId;creationDateTime;origin;rollbackResistant;rootOfTrust;osVersion;osPatchLevel;attestationApplicationId;attestationIdBrand;attestationIdDevice;attestationIdProduct;attestationIdSerial;attestationIdImei;attestationIdMeid;attestationIdManufacturer;attestationIdModel;vendorPatchLevel;bootPatchLevel;deviceUniqueAttestation;attestationIdSecondImei;moduleHash;constructor(e={}){Object.assign(this,e)}};c([u({context:1,type:va,optional:!0})],ne.prototype,"purpose",void 0);c([u({context:2,type:f.Integer,optional:!0})],ne.prototype,"algorithm",void 0);c([u({context:3,type:f.Integer,optional:!0})],ne.prototype,"keySize",void 0);c([u({context:5,type:va,optional:!0})],ne.prototype,"digest",void 0);c([u({context:6,type:va,optional:!0})],ne.prototype,"padding",void 0);c([u({context:10,type:f.Integer,optional:!0})],ne.prototype,"ecCurve",void 0);c([u({context:200,type:f.Integer,optional:!0})],ne.prototype,"rsaPublicExponent",void 0);c([u({context:203,type:va,optional:!0})],ne.prototype,"mgfDigest",void 0);c([u({context:303,type:f.Null,optional:!0})],ne.prototype,"rollbackResistance",void 0);c([u({context:305,type:f.Null,optional:!0})],ne.prototype,"earlyBootOnly",void 0);c([u({context:400,type:f.Integer,optional:!0})],ne.prototype,"activeDateTime",void 0);c([u({context:401,type:f.Integer,optional:!0})],ne.prototype,"originationExpireDateTime",void 0);c([u({context:402,type:f.Integer,optional:!0})],ne.prototype,"usageExpireDateTime",void 0);c([u({context:405,type:f.Integer,optional:!0})],ne.prototype,"usageCountLimit",void 0);c([u({context:503,type:f.Null,optional:!0})],ne.prototype,"noAuthRequired",void 0);c([u({context:504,type:f.Integer,optional:!0})],ne.prototype,"userAuthType",void 0);c([u({context:505,type:f.Integer,optional:!0})],ne.prototype,"authTimeout",void 0);c([u({context:506,type:f.Null,optional:!0})],ne.prototype,"allowWhileOnBody",void 0);c([u({context:507,type:f.Null,optional:!0})],ne.prototype,"trustedUserPresenceRequired",void 0);c([u({context:508,type:f.Null,optional:!0})],ne.prototype,"trustedConfirmationRequired",void 0);c([u({context:509,type:f.Null,optional:!0})],ne.prototype,"unlockedDeviceRequired",void 0);c([u({context:600,type:f.Null,optional:!0})],ne.prototype,"allApplications",void 0);c([u({context:601,type:V,optional:!0})],ne.prototype,"applicationId",void 0);c([u({context:701,type:f.Integer,optional:!0})],ne.prototype,"creationDateTime",void 0);c([u({context:702,type:f.Integer,optional:!0})],ne.prototype,"origin",void 0);c([u({context:703,type:f.Null,optional:!0})],ne.prototype,"rollbackResistant",void 0);c([u({context:704,type:go,optional:!0})],ne.prototype,"rootOfTrust",void 0);c([u({context:705,type:f.Integer,optional:!0})],ne.prototype,"osVersion",void 0);c([u({context:706,type:f.Integer,optional:!0})],ne.prototype,"osPatchLevel",void 0);c([u({context:709,type:V,optional:!0})],ne.prototype,"attestationApplicationId",void 0);c([u({context:710,type:V,optional:!0})],ne.prototype,"attestationIdBrand",void 0);c([u({context:711,type:V,optional:!0})],ne.prototype,"attestationIdDevice",void 0);c([u({context:712,type:V,optional:!0})],ne.prototype,"attestationIdProduct",void 0);c([u({context:713,type:V,optional:!0})],ne.prototype,"attestationIdSerial",void 0);c([u({context:714,type:V,optional:!0})],ne.prototype,"attestationIdImei",void 0);c([u({context:715,type:V,optional:!0})],ne.prototype,"attestationIdMeid",void 0);c([u({context:716,type:V,optional:!0})],ne.prototype,"attestationIdManufacturer",void 0);c([u({context:717,type:V,optional:!0})],ne.prototype,"attestationIdModel",void 0);c([u({context:718,type:f.Integer,optional:!0})],ne.prototype,"vendorPatchLevel",void 0);c([u({context:719,type:f.Integer,optional:!0})],ne.prototype,"bootPatchLevel",void 0);c([u({context:720,type:f.Null,optional:!0})],ne.prototype,"deviceUniqueAttestation",void 0);c([u({context:723,type:V,optional:!0})],ne.prototype,"attestationIdSecondImei",void 0);c([u({context:724,type:V,optional:!0})],ne.prototype,"moduleHash",void 0);var mn;(function(t){t[t.software=0]="software",t[t.trustedEnvironment=1]="trustedEnvironment",t[t.strongBox=2]="strongBox"})(mn||(mn={}));var wa;(function(t){t[t.KM2=1]="KM2",t[t.KM3=2]="KM3",t[t.KM4=3]="KM4",t[t.KM4_1=4]="KM4_1",t[t.keyMint1=100]="keyMint1",t[t.keyMint2=200]="keyMint2",t[t.keyMint3=300]="keyMint3",t[t.keyMint4=400]="keyMint4"})(wa||(wa={}));var Nt=class{attestationVersion=wa.KM4;attestationSecurityLevel=mn.software;keymasterVersion=0;keymasterSecurityLevel=mn.software;attestationChallenge=new V;uniqueId=new V;softwareEnforced=new ne;teeEnforced=new ne;constructor(e={}){Object.assign(this,e)}};c([u({type:f.Integer})],Nt.prototype,"attestationVersion",void 0);c([u({type:f.Enumerated})],Nt.prototype,"attestationSecurityLevel",void 0);c([u({type:f.Integer})],Nt.prototype,"keymasterVersion",void 0);c([u({type:f.Enumerated})],Nt.prototype,"keymasterSecurityLevel",void 0);c([u({type:V})],Nt.prototype,"attestationChallenge",void 0);c([u({type:V})],Nt.prototype,"uniqueId",void 0);c([u({type:ne})],Nt.prototype,"softwareEnforced",void 0);c([u({type:ne})],Nt.prototype,"teeEnforced",void 0);var jr=class t{attestationVersion=wa.keyMint4;attestationSecurityLevel=mn.software;keyMintVersion=0;keyMintSecurityLevel=mn.software;attestationChallenge=new V;uniqueId=new V;softwareEnforced=new ne;hardwareEnforced=new ne;constructor(e={}){Object.assign(this,e)}toLegacyKeyDescription(){return new Nt({attestationVersion:this.attestationVersion,attestationSecurityLevel:this.attestationSecurityLevel,keymasterVersion:this.keyMintVersion,keymasterSecurityLevel:this.keyMintSecurityLevel,attestationChallenge:this.attestationChallenge,uniqueId:this.uniqueId,softwareEnforced:this.softwareEnforced,teeEnforced:this.hardwareEnforced})}static fromLegacyKeyDescription(e){return new t({attestationVersion:e.attestationVersion,attestationSecurityLevel:e.attestationSecurityLevel,keyMintVersion:e.keymasterVersion,keyMintSecurityLevel:e.keymasterSecurityLevel,attestationChallenge:e.attestationChallenge,uniqueId:e.uniqueId,softwareEnforced:e.softwareEnforced,hardwareEnforced:e.teeEnforced})}};c([u({type:f.Integer})],jr.prototype,"attestationVersion",void 0);c([u({type:f.Enumerated})],jr.prototype,"attestationSecurityLevel",void 0);c([u({type:f.Integer})],jr.prototype,"keyMintVersion",void 0);c([u({type:f.Enumerated})],jr.prototype,"keyMintSecurityLevel",void 0);c([u({type:V})],jr.prototype,"attestationChallenge",void 0);c([u({type:V})],jr.prototype,"uniqueId",void 0);c([u({type:ne})],jr.prototype,"softwareEnforced",void 0);c([u({type:ne})],jr.prototype,"hardwareEnforced",void 0);var cf,lf=class extends ne{};lf=c([C({type:x.Choice})],lf);var xa=cf=class extends z{constructor(e){super(e),Object.setPrototypeOf(this,cf.prototype)}findProperty(e){let r=this.find(n=>n[e]!==void 0);if(r)return r[e]}};xa=cf=c([C({type:x.Sequence,itemType:lf})],xa);var fr=class{attestationVersion=wa.KM4;attestationSecurityLevel=mn.software;keymasterVersion=0;keymasterSecurityLevel=mn.software;attestationChallenge=new V;uniqueId=new V;softwareEnforced=new xa;teeEnforced=new xa;get keyMintVersion(){return this.keymasterVersion}set keyMintVersion(e){this.keymasterVersion=e}get keyMintSecurityLevel(){return this.keymasterSecurityLevel}set keyMintSecurityLevel(e){this.keymasterSecurityLevel=e}get hardwareEnforced(){return this.teeEnforced}set hardwareEnforced(e){this.teeEnforced=e}constructor(e={}){Object.assign(this,e)}};c([u({type:f.Integer})],fr.prototype,"attestationVersion",void 0);c([u({type:f.Enumerated})],fr.prototype,"attestationSecurityLevel",void 0);c([u({type:f.Integer})],fr.prototype,"keymasterVersion",void 0);c([u({type:f.Enumerated})],fr.prototype,"keymasterSecurityLevel",void 0);c([u({type:V})],fr.prototype,"attestationChallenge",void 0);c([u({type:V})],fr.prototype,"uniqueId",void 0);c([u({type:xa})],fr.prototype,"softwareEnforced",void 0);c([u({type:xa})],fr.prototype,"teeEnforced",void 0);var _y=class extends fr{constructor(e={}){"keymasterVersion"in e&&!("keyMintVersion"in e)&&(e.keyMintVersion=e.keymasterVersion),"keymasterSecurityLevel"in e&&!("keyMintSecurityLevel"in e)&&(e.keyMintSecurityLevel=e.keymasterSecurityLevel),"teeEnforced"in e&&!("hardwareEnforced"in e)&&(e.hardwareEnforced=e.teeEnforced),super(e)}};_y=c([C({type:x.Sequence})],_y);var yc=class{packageName;version;constructor(e={}){Object.assign(this,e)}};c([u({type:f.OctetString})],yc.prototype,"packageName",void 0);c([u({type:f.Integer})],yc.prototype,"version",void 0);var dd=class{packageInfos;signatureDigests;constructor(e={}){Object.assign(this,e)}};c([u({type:yc,repeated:"set"})],dd.prototype,"packageInfos",void 0);c([u({type:f.OctetString,repeated:"set"})],dd.prototype,"signatureDigests",void 0);async function Ry(t){let{authData:e,clientDataHash:r,attStmt:n,credentialPublicKey:i,aaguid:o,rootCertificates:a}=t,s=n.get("x5c"),l=n.get("sig"),d=n.get("alg");if(!s)throw new Error("No attestation certificate provided in attestation statement (Android Key)");if(!l)throw new Error("No attestation signature provided in attestation statement (Android Key)");if(!d)throw new Error("Attestation statement did not contain alg (Android Key)");if(!jt(d))throw new Error(`Attestation statement contained invalid alg ${d} (Android Key)`);let p=Re.parse(s[0],Ne),m=new Uint8Array(p.tbsCertificate.subjectPublicKeyInfo.subjectPublicKey),y=So(i);if(!ee.areEqual(y,m))throw new Error("Credential public key does not equal leaf cert public key (Android Key)");let A=p.tbsCertificate.extensions?.find(P=>P.extnID===Iy);if(!A)throw new Error("Certificate did not contain extKeyStore (Android Key)");let T=Re.parse(A.extnValue,Nt),{attestationChallenge:k,teeEnforced:O,softwareEnforced:g}=T;if(!ee.areEqual(new Uint8Array(k.buffer),r))throw new Error("Attestation challenge was not equal to client data hash (Android Key)");if(O.allApplications!==void 0)throw new Error('teeEnforced contained "allApplications [600]" tag (Android Key)');if(g.allApplications!==void 0)throw new Error('teeEnforced contained "allApplications [600]" tag (Android Key)');let b=await ni.getStatement(o);if(b)try{await ii({statement:b,credentialPublicKey:i,x5c:s,attestationStatementAlg:d})}catch(P){let R=P;throw new Error(`${R.message} (Android Key)`,{cause:R})}else{let P=s.slice(0,-1).map(We),R=s.slice(-1).map(We);try{await ct(P,R)}catch(D){let W=D;throw new Error(`${W.message} (Android Key)`,{cause:W})}if(a.length>0&&a.indexOf(R[0])<0)throw new Error("x5c root certificate was not a known root certificate (Android Key)")}let E=ee.concat([e,r]);return Mt({signature:l,data:E,x509Certificate:s[0],hashAlgorithm:d})}async function By(t){let{attStmt:e,authData:r,clientDataHash:n,credentialPublicKey:i,rootCertificates:o}=t,a=e.get("x5c");if(!a)throw new Error("No attestation certificate provided in attestation statement (Apple)");try{await ct(a.map(We),o)}catch(O){let g=O;throw new Error(`${g.message} (Apple)`)}let s=Re.parse(a[0],Ne),{extensions:l,subjectPublicKeyInfo:d}=s.tbsCertificate;if(!l)throw new Error("credCert missing extensions (Apple)");let p=l.find(O=>O.extnID==="1.2.840.113635.100.8.2");if(!p)throw new Error('credCert missing "1.2.840.113635.100.8.2" extension (Apple)');let m=ee.concat([r,n]),y=await Bt(m),A=new Uint8Array(p.extnValue.buffer).slice(6);if(!ee.areEqual(y,A))throw new Error("credCert nonce was not expected value (Apple)");let T=So(i),k=new Uint8Array(d.subjectPublicKey);if(!ee.areEqual(T,k))throw new Error("Credential public key does not equal credCert public key (Apple)");return!0}async function My(t){let{response:e,expectedChallenge:r,expectedOrigin:n,expectedRPID:i,expectedType:o,requireUserPresence:a=!0,requireUserVerification:s=!0,supportedAlgorithmIDs:l=tf(),attestationSafetyNetEnforceCTSCheck:d=!0}=t,{id:p,rawId:m,type:y,response:A}=e;if(!p)throw new Error("Missing credential ID");if(p!==m)throw new Error("Credential ID was not base64url-encoded");if(y!=="public-key")throw new Error(`Unexpected credential type ${y}, expected "public-key"`);let T=Ic(A.clientDataJSON),{type:k,origin:O,challenge:g,tokenBinding:b}=T;if(Array.isArray(o)){if(!o.includes(k)){let se=o.join(", ");throw new Error(`Unexpected registration response type "${k}", expected one of: ${se}`)}}else if(o){if(k!==o)throw new Error(`Unexpected registration response type "${k}", expected "${o}"`)}else if(k!=="webauthn.create")throw new Error(`Unexpected registration response type: ${k}`);if(typeof r=="function"){if(!await r(g))throw new Error(`Custom challenge verifier returned false for registration response challenge "${g}"`)}else if(g!==r)throw new Error(`Unexpected registration response challenge "${g}", expected "${r}"`);if(Array.isArray(n)){if(!n.includes(O))throw new Error(`Unexpected registration response origin "${O}", expected one of: ${n.join(", ")}`)}else if(O!==n)throw new Error(`Unexpected registration response origin "${O}", expected "${n}"`);if(b){if(typeof b!="object")throw new Error(`Unexpected value for TokenBinding "${b}"`);if(["present","supported","not-supported"].indexOf(b.status)<0)throw new Error(`Unexpected tokenBinding.status value of "${b.status}"`)}let E=ce.toBuffer(A.attestationObject),P=Zf(E),R=P.get("fmt"),D=P.get("authData"),W=P.get("attStmt"),M=rd(D),{aaguid:h,rpIdHash:w,flags:v,credentialID:H,counter:I,credentialPublicKey:B,extensionsData:N}=M,pe;if(i){let se=[];typeof i=="string"?se=[i]:se=i,pe=await sd(w,se)}if(a&&!v.up)throw new Error("User presence was required, but user was not present");if(s&&!v.uv)throw new Error("User verification was required, but user could not be verified");if(!H)throw new Error("No credential ID was provided by authenticator");if(!B)throw new Error("No public key was provided by authenticator");if(!h)throw new Error("No AAGUID was present during registration");let ie=gr(B).get(re.alg);if(typeof ie!="number")throw new Error("Credential public key was missing numeric alg");if(!l.includes(ie)){let se=l.join(", ");throw new Error(`Unexpected public key alg "${ie}", expected one of "${se}"`)}if(Cc(ie)&&!Pt.runtimeSupportsPQC())throw new ti(ie);let Ae=await Bt(ce.toBuffer(A.clientDataJSON)),le=Pt.getRootCertificates({identifier:R}),de={aaguid:h,attStmt:W,authData:D,clientDataHash:Ae,credentialID:H,credentialPublicKey:B,rootCertificates:le,rpIdHash:w,attestationSafetyNetEnforceCTSCheck:d},Z=!1;if(R==="fido-u2f")Z=await fy(de);else if(R==="packed")Z=await yy(de);else if(R==="android-safetynet")Z=await vy(de);else if(R==="android-key")Z=await Ry(de);else if(R==="tpm")Z=await Ty(de);else if(R==="apple")Z=await By(de);else if(R==="none"){if(W.size>0)throw new Error("None attestation had unexpected attestation statement");Z=!0}else throw new Error(`Unsupported Attestation Format: ${R}`);if(!Z)return{verified:!1};let{credentialDeviceType:bt,credentialBackedUp:si}=ad(v);return{verified:!0,registrationInfo:{fmt:R,aaguid:Tc(h),credentialType:y,credential:{id:ce.fromBuffer(H),publicKey:B,counter:I,transports:e.response.transports},attestationObject:E,userVerified:v.uv,credentialDeviceType:bt,credentialBackedUp:si,origin:T.origin,rpID:pe,authenticatorExtensionResults:N}}}async function Py(t){let{allowCredentials:e,challenge:r=await _c(),timeout:n=6e4,userVerification:i="preferred",extensions:o,rpID:a}=t,s=r;return typeof s=="string"&&(s=ee.fromUTF8String(s)),{rpId:a,challenge:ce.fromBuffer(s),allowCredentials:e?.map(l=>{if(!ce.isBase64URL(l.id))throw new Error(`allowCredential id "${l.id}" is not a valid base64url string`);return{...l,id:ce.trimPadding(l.id),type:"public-key"}}),timeout:n,userVerification:i,extensions:o}}async function Oy(t){let{response:e,expectedChallenge:r,expectedOrigin:n,expectedRPID:i,expectedType:o,expectedTopOrigin:a,credential:s,requireUserVerification:l=!0,advancedFIDOConfig:d}=t,{id:p,rawId:m,type:y,response:A}=e;if(!p)throw new Error("Missing credential ID");if(p!==m)throw new Error("Credential ID was not base64url-encoded");if(y!=="public-key")throw new Error(`Unexpected credential type ${y}, expected "public-key"`);if(!e)throw new Error("Credential missing response");if(typeof A?.clientDataJSON!="string")throw new Error("Credential response clientDataJSON was not a string");let T=Ic(A.clientDataJSON),{type:k,origin:O,challenge:g,tokenBinding:b,crossOrigin:E,topOrigin:P}=T;if(Array.isArray(o)){if(!o.includes(k)){let de=o.join(", ");throw new Error(`Unexpected authentication response type "${k}", expected one of: ${de}`)}}else if(o){if(k!==o)throw new Error(`Unexpected authentication response type "${k}", expected "${o}"`)}else if(k!=="webauthn.get")throw new Error(`Unexpected authentication response type: ${k}`);if(typeof r=="function"){if(!await r(g))throw new Error(`Custom challenge verifier returned false for registration response challenge "${g}"`)}else if(g!==r)throw new Error(`Unexpected authentication response challenge "${g}", expected "${r}"`);if(E){if(P){if(!a)throw new Error(`Detected cross-origin authentication response from top origin of "${P}", but a value for \`expectedTopOrigin\` was not specified when calling \`verifyAuthenticationResponse()\``);if(Array.isArray(a)){if(!a.includes(P)){let de=a.join(", ");throw new Error(`Unexpected cross-origin authentication response top origin of "${P}", expected one of: ${de}`)}}else if(P!==a)throw new Error(`Unexpected cross-origin authentication response top origin of "${P}", expected: ${a}`)}}else if(P)throw new Error(`Unexpected top origin of "${P}" within a non-cross-origin authentication response. This error should be reported to the browser vendor as a WebAuthn specification violation with a link to https://w3c.github.io/webauthn/#dom-collectedclientdata-toporigin`);if(Array.isArray(n)){if(!n.includes(O)){let de=n.join(", ");throw new Error(`Unexpected authentication response origin "${O}", expected one of: ${de}`)}}else if(O!==n)throw new Error(`Unexpected authentication response origin "${O}", expected "${n}"`);if(!ce.isBase64URL(A.authenticatorData))throw new Error("Credential response authenticatorData was not a base64url string");if(!ce.isBase64URL(A.signature))throw new Error("Credential response signature was not a base64url string");if(A.userHandle&&typeof A.userHandle!="string")throw new Error("Credential response userHandle was not a string");if(b){if(typeof b!="object")throw new Error("ClientDataJSON tokenBinding was not an object");if(["present","supported","notSupported"].indexOf(b.status)<0)throw new Error(`Unexpected tokenBinding status ${b.status}`)}let R=ce.toBuffer(A.authenticatorData),D=rd(R),{rpIdHash:W,flags:M,counter:h,extensionsData:w}=D,v=[];typeof i=="string"?v=[i]:v=i;let H=await sd(W,v);if(d!==void 0){let{userVerification:de}=d;if(de==="required"&&!M.uv)throw new Error("User verification required, but user could not be verified")}else{if(!M.up)throw new Error("User not present during authentication");if(l&&!M.uv)throw new Error("User verification required, but user could not be verified")}let I=await Bt(ce.toBuffer(A.clientDataJSON)),B=ee.concat([R,I]),N=ce.toBuffer(A.signature);if((h>0||s.counter>0)&&h<=s.counter)throw new Error(`Response counter value ${h} was lower than expected ${s.counter}`);let fe=gr(s.publicKey).get(re.alg);if(typeof fe!="number")throw new Error("Credential public key was missing numeric alg");if(Cc(fe)&&!Pt.runtimeSupportsPQC())throw new ti(fe);let{credentialDeviceType:ie,credentialBackedUp:Ae}=ad(M);return{verified:await Mt({signature:N,data:B,credentialPublicKey:s.publicKey}),authenticationInfo:{newCounter:h,credentialID:s.id,userVerified:M.uv,credentialDeviceType:ie,credentialBackedUp:Ae,authenticatorExtensionResults:w,origin:T.origin,rpID:H}}}var Ee=globalThis.CasinoMoney,hn=globalThis.CasinoEngine,Rx=globalThis.CasinoBlackjack,wc="https://roulette-club-777-oct15.lonivxy.chatgpt.site",ud=new URL(wc).hostname,pd="__Host-club-admin",Ny="__Host-club-challenge",Dy=15*6e4,oi=(t,e=200,r={})=>new Response(Ee.stringify(t),{status:e,headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store","X-Content-Type-Options":"nosniff",...r}}),me=(t,e=400)=>{throw Object.assign(new Error(t),{status:e})},ff=t=>btoa(String.fromCharCode(...t)).replaceAll("+","-").replaceAll("/","_").replaceAll("=",""),Ly=t=>Uint8Array.from(atob(t.replaceAll("-","+").replaceAll("_","/")),e=>e.charCodeAt(0)),jy=()=>ff(crypto.getRandomValues(new Uint8Array(32))),ai=async t=>ff(new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(t)))),df=(t,e,r)=>`${t}=${e}; Path=/; Max-Age=${r}; Secure; HttpOnly; SameSite=Strict`;function uf(t,e){return t.headers.get("cookie")?.split(";").map(r=>r.trim()).find(r=>r.startsWith(e+"="))?.slice(e.length+1)||""}function vc(t){return t.headers.get("oai-authenticated-user-id")||me("\u8BF7\u5148\u4F7F\u7528\u672C\u7AD9\u6240\u5C5E\u8D26\u53F7\u767B\u5F55\u3002",401)}function pf(t){let e=new hn({getItem:()=>t,setItem(){}},void 0,()=>Date.now(),{recoverRoulette:!1});return e.storageWarning&&me("\u670D\u52A1\u5668\u8D26\u6237\u6570\u636E\u6821\u9A8C\u5931\u8D25\u3002",500),e}function Uy(t){let e=0,r=-1;for(let n=0;n<24;n++){let i=mf(t,n);i>r&&(r=i,e=n)}return e}function mf(t,e){return Ee.add(Ee.mul(t.numbers[e]||0,24),e===0?Ee.mul(t.GREEN,24):e%2?Ee.mul(Ee.add(t.RED,t.ODD),2):Ee.mul(Ee.add(t.BLACK,t.EVEN),2))}function Bx(t,[e,r]){t.ensureIdle();let n=t.active,i=t.amount(r);i>n.balance&&me("\u94B1\u5305\u4F59\u989D\u4E0D\u8DB3\u3002"),typeof e=="number"&&Number.isInteger(e)&&e>=0&&e<24?n.bets.numbers[e]=Ee.add(n.bets.numbers[e]||0,i):["RED","BLACK","GREEN","ODD","EVEN"].includes(e)?n.bets[e]=Ee.add(n.bets[e],i):me("\u65E0\u6548\u7684\u8F6E\u76D8\u4E0B\u6CE8\u3002"),n.balance=Ee.sub(n.balance,i)}function Mx(t,e){t.ensureIdle();let r=t.active,n=hn.sumBets(r.bets);n||me("\u8BF7\u5148\u653E\u7F6E\u7B79\u7801\u3002");let i=structuredClone(r.bets),o=e?Uy(i):Math.floor(t.random()*24),a=mf(i,o),s=structuredClone(r.recovery||null);r.balance=Ee.add(r.balance,a),r.lastBets=i,r.bets=hn.emptyBets(),r.pendingRoulette=!1;let l={roundId:crypto.randomUUID(),number:o,index:o,wager:n,payout:a,bets:i,rigged:!!e};return t.completeRound(Ee.sub(a,n)),l.recoveryBefore=s,l.settlement={balance:r.balance,recovery:structuredClone(r.recovery||null)},r.lastRoulette=l,r.history.unshift({num:o,colorTag:o===0?"GREEN":o%2?"RED":"BLACK"}),r.history=r.history.slice(0,10),t.record(`${r.name} \xB7 Roulette ${o}: wager ${n.toLocaleString()}, payout ${a.toLocaleString()}.`),l}async function Hy(t,e,r,n){(!Array.isArray(r)||r.length>5)&&me("\u65E0\u6548\u7684\u64CD\u4F5C\u53C2\u6570\u3002");let i=new Rx(t),o={gift:"transfer",offerLoan:"offerLoan",respondLoan:"respondLoan",cancelLoan:"cancelLoan",repayLoan:"repayLoan",repayAll:"repayAll",borrow:"borrow",repay:"repay",borrowShark:"borrowShark",repayShark:"repayShark",buyCard:"buyCard",armCard:"armCard"};if(Object.hasOwn(o,e))return t[o[e]](...r);if(["addUser","deletePlayer","adminAdjust","import"].includes(e)&&!n&&me("\u8BF7\u5148\u901A\u8FC7 Windows Hello \u7BA1\u7406\u9A8C\u8BC1\u3002",403),["addUser","deletePlayer","adminAdjust"].includes(e))return t[e](...r);if(e==="lottery")return(r.length>2||r[1]!==void 0&&(!r[1]||typeof r[1]!="object"||Array.isArray(r[1])))&&me("\u65E0\u6548\u7684\u5F69\u7968\u9009\u9879\u3002"),t.buyLottery(r[0],{jackpot:!!r[1]?.jackpot});if(e==="plinko")return t.playPlinko(...r);if(e==="dice")return t.playDice(...r);if(e==="slots")return r[1]&&typeof r[1]!="object"&&me("\u65E0\u6548\u7684\u4E0B\u6CE8\u9009\u9879\u3002"),t.spinSlots(r[0],null,{allIn:!!r[1]?.allIn,jackpot:!!r[1]?.jackpot});if(e==="blackjack"){let[a,s]=r;return["start","hit","stand","double","split","dealerStep","forceJackpot"].includes(a)||me("\u65E0\u6548\u7684\u4E8C\u5341\u4E00\u70B9\u64CD\u4F5C\u3002"),i[a](s)}if(e==="roulette.bet")return Bx(t,r),null;if(e==="roulette.clear")return t.ensureIdle(),t.active.balance=Ee.add(t.active.balance,hn.sumBets(t.active.bets)),t.active.bets=hn.emptyBets(),null;if(e==="roulette.rebet"){t.ensureIdle();let a=t.active;a.lastBets||me("\u6CA1\u6709\u4E0A\u4E00\u8F6E\u4E0B\u6CE8\u3002");let s=hn.sumBets(a.lastBets),l=Ee.add(a.balance,hn.sumBets(a.bets));return s>l&&me("\u4F59\u989D\u4E0D\u8DB3\u4EE5\u91CD\u590D\u4E0B\u6CE8\u3002"),a.balance=Ee.sub(l,s),a.bets=structuredClone(a.lastBets),null}if(e==="roulette.spin")return Mx(t,!!r[0]);if(e==="roulette.rig"){t.ensureIdle();let a=t.active,s=a.lastRoulette;(!s||s.roundId!==r[0])&&me("\u8FD9\u8F6E\u8F6E\u76D8\u5DF2\u7ECF\u7ED3\u675F\u3002");let l=Uy(s.bets),d=mf(s.bets,l),p=Ee.sub(d,s.payout);return p&&(s.settlement&&(a.balance!==s.settlement.balance||Ee.stringify(a.recovery||null)!==Ee.stringify(s.settlement.recovery))&&me("\u8D26\u6237\u5DF2\u53D1\u751F\u5176\u4ED6\u53D8\u52A8\uFF0C\u4E0D\u80FD\u518D\u8C03\u6574\u8FD9\u8F6E\u7ED3\u679C\u3002"),!s.recoveryBefore&&s.settlement?.recovery&&(a.recovery=null,a.balance=Ee.sub(a.balance,10)),a.balance=Ee.add(a.balance,p),s.number=s.index=l,s.payout=d,s.rigged=!0,t.completeRound(p),s.settlement={balance:a.balance,recovery:structuredClone(a.recovery||null)},a.history[0]&&(a.history[0]={num:l,colorTag:l===0?"GREEN":l%2?"RED":"BLACK"}),p&&t.record(`${a.name} \xB7 Roulette jackpot adjustment +${p.toLocaleString()}.`)),s}me("\u672A\u77E5\u64CD\u4F5C\u3002",404)}function hf({page:t="",webauthn:e={generateRegistrationOptions:py,verifyRegistrationResponse:My,generateAuthenticationOptions:Py,verifyAuthenticationResponse:Oy},v2:r=!1,bootstrapOwnerPrivate:n=!1,clock:i,credentialKey:o="owner",extensions:a={}}={}){if(r)return $f({page:t,applyCommand:Hy,bootstrapOwnerPrivate:n,clock:i,origin:wc,extensions:{action:Bf,clubView:Ca,read:Mf,...a},legacyFactory:T=>hf({webauthn:e,...T})});async function s(T){let k=await T.prepare("SELECT snapshot, revision FROM casino_state WHERE id = ?").bind("club").first();if(!k){let O=pf(Ee.stringify(new hn(null).data));await T.prepare("INSERT OR IGNORE INTO casino_state (id,snapshot,revision,last_op) VALUES (?,?,0,?)").bind("club",Ee.stringify(O.data),"initial").run(),k=await T.prepare("SELECT snapshot, revision FROM casino_state WHERE id = ?").bind("club").first()}return k}async function l(T,k){let O=uf(T,pd);if(!O)return!1;let g=await k.prepare("SELECT actor,expires_at FROM admin_sessions WHERE id = ?").bind(await ai(O)).first();return!!(g&&g.actor===vc(T)&&g.expires_at>Date.now())}async function d(T,k){let O=await k.prepare("SELECT actor FROM admin_credential WHERE id = ?").bind(o).first();return{enrolled:!!O,admin:await l(T,k),canEnroll:!O}}async function p(T,k){let O=jy();return await k.prepare("INSERT INTO admin_sessions (id,actor,expires_at) VALUES (?,?,?)").bind(await ai(O),vc(T),Date.now()+Dy).run(),oi({ok:!0},200,{"Set-Cookie":df(pd,O,Dy/1e3)})}async function m(T,k,O){let g=vc(T),b=await l(T,k),{id:E,command:P,args:R=[],playerId:D}=O;(typeof E!="string"||E.length<16||E.length>80||typeof P!="string")&&me("\u65E0\u6548\u7684\u64CD\u4F5C\u7F16\u53F7\u3002");let W=await ai(Ee.stringify({operation:P,args:R,playerId:D}));for(let M=0;M<4;M++){let h=await k.prepare("SELECT actor,payload,response FROM casino_operations WHERE id = ?").bind(E).first();if(h){(h.actor!==g||h.payload!==W)&&me("\u64CD\u4F5C\u7F16\u53F7\u5DF2\u88AB\u4F7F\u7528\u3002",409);let ie=await y(T,k);return ie.data.users.some(Ae=>Ae.id===D)&&(ie.data.activeId=D),oi({...ie,result:Ee.parseJSON(h.response).result})}let w=await s(k),v=pf(w.snapshot);(typeof D!="string"||!v.data.users.some(ie=>ie.id===D))&&me("\u8BF7\u9009\u62E9\u6709\u6548\u73A9\u5BB6\u3002"),v.data.activeId=D;let H=v.data.users.find(ie=>ie.blackjack&&ie.blackjack.phase!=="settled");H&&H.id!==D&&me("\u8BF7\u5148\u5B8C\u6210 "+H.name+" \u7684\u4E8C\u5341\u4E00\u70B9\u724C\u5C40\u3002",409);let I;if(P==="import"){b||me("\u9700\u8981\u7BA1\u7406\u9A8C\u8BC1\u3002",403),w.revision!==0&&me("\u670D\u52A1\u5668\u5DF2\u6709\u65B0\u8BB0\u5F55\uFF0C\u4E0D\u80FD\u8986\u76D6\u5BFC\u5165\u3002",409),(!R[0]||typeof R[0]!="object")&&me("\u65E7\u5B58\u6863\u65E0\u6548\u3002");let ie=Ee.stringify(R[0]),Ae=new hn({getItem:()=>ie,setItem(){}});Ae.storageWarning&&me("\u65E7\u5B58\u6863\u6821\u9A8C\u5931\u8D25\uFF0C\u5DF2\u4FDD\u7559\u539F\u6587\u4EF6\u3002"),v=Ae,v.record("\u7BA1\u7406\u5458\u5BFC\u5165\u4E86\u6B64\u524D\u6D4F\u89C8\u5668\u7684\u73A9\u5BB6\u5B58\u6863\u3002"),I=null}else try{I=await Hy(v,P,R,b)}catch(ie){if(ie.status)throw ie;me(ie.message||"\u64CD\u4F5C\u672A\u5B8C\u6210\u3002")}v.save();let B=Ee.stringify(v.data),N={data:v.data,revision:w.revision+1,result:I??null,now:Date.now()},pe=Ee.stringify({result:N.result,revision:N.revision});if((await k.batch([k.prepare("UPDATE casino_state SET snapshot=?,revision=revision+1,last_op=? WHERE id=? AND revision=?").bind(B,E,"club",w.revision),k.prepare("INSERT INTO casino_operations (id,actor,payload,response,created_at) SELECT ?,?,?,?,? WHERE EXISTS (SELECT 1 FROM casino_state WHERE id=? AND last_op=?)").bind(E,g,W,pe,Date.now(),"club",E)]))[0].meta.changes===1)return oi(N)}me("\u5176\u4ED6\u64CD\u4F5C\u6B63\u5728\u66F4\u65B0\u8D26\u6237\uFF0C\u8BF7\u91CD\u8BD5\u3002",409)}async function y(T,k){for(let O=0;O<4;O++){let g=await s(k),b=pf(g.snapshot),E=Ee.stringify(b.data);if(E!==g.snapshot){if(!(await k.prepare("UPDATE casino_state SET snapshot=?,revision=revision+1 WHERE id=? AND revision=?").bind(E,"club",g.revision).run()).meta.changes)continue;g.revision++}let P=new URL(T.url).searchParams.get("playerId");return P&&b.data.users.some(R=>R.id===P)&&(b.data.activeId=P),{data:b.data,revision:g.revision,now:Date.now(),auth:await d(T,k)}}me("\u8D26\u6237\u6B63\u5728\u66F4\u65B0\uFF0C\u8BF7\u91CD\u8BD5\u3002",409)}async function A(T,k,O,g){let b=vc(T),E=await k.prepare("SELECT * FROM admin_credential WHERE id = ?").bind(o).first();if(O==="/api/admin/status")return oi(await d(T,k));if(O==="/api/admin/logout")return await k.prepare("DELETE FROM admin_sessions WHERE id = ?").bind(await ai(uf(T,pd))).run(),oi({ok:!0},200,{"Set-Cookie":df(pd,"",0)});let P=O.includes("/register/")?"register":"authenticate";if(P==="register"&&E&&me("\u7BA1\u7406\u901A\u884C\u5BC6\u94A5\u5DF2\u8BBE\u7F6E\uFF0C\u8BF7\u4F7F\u7528\u5DF2\u6709\u5BC6\u94A5\u767B\u5F55\u3002",403),E&&E.actor!==b&&me("\u5F53\u524D\u8D26\u53F7\u4E0D\u662F\u6B64\u7AD9\u70B9\u7BA1\u7406\u5458\u3002",403),O.endsWith("/options")){await k.prepare("DELETE FROM admin_challenges WHERE expires_at <= ?").bind(Date.now()).run(),await k.prepare("DELETE FROM admin_sessions WHERE expires_at <= ?").bind(Date.now()).run(),P==="authenticate"&&!E&&me("\u8BF7\u5148\u8BBE\u7F6E\u7BA1\u7406\u901A\u884C\u5BC6\u94A5\u3002"),(await k.prepare("SELECT COUNT(*) AS count FROM admin_challenges WHERE actor=? AND expires_at>?").bind(b,Date.now()).first()).count>=10&&me("\u9A8C\u8BC1\u8BF7\u6C42\u8FC7\u4E8E\u9891\u7E41\uFF0C\u8BF7\u4E94\u5206\u949F\u540E\u91CD\u8BD5\u3002",429);let W=P==="register"?await e.generateRegistrationOptions({rpName:"Roulette Club Admin",rpID:ud,userName:o==="owner"?"Club Owner":"Club Administrator "+(await ai(o)).slice(0,8),userID:o==="owner"?new TextEncoder().encode("club-owner"):Ly(await ai(o)),attestationType:"none",authenticatorSelection:{authenticatorAttachment:"platform",residentKey:"required",userVerification:"required"},supportedAlgorithmIDs:[-7,-257]}):await e.generateAuthenticationOptions({rpID:ud,userVerification:"required",allowCredentials:[{id:E.credential_id,transports:JSON.parse(E.transports)}]}),M=jy();return await k.prepare("INSERT INTO admin_challenges (id,actor,kind,challenge,expires_at) VALUES (?,?,?,?,?)").bind(await ai(M),b,P,W.challenge,Date.now()+5*6e4).run(),oi(W,200,{"Set-Cookie":df(Ny,M,300)})}O.endsWith("/verify")||me("\u65E0\u6548\u7684\u9A8C\u8BC1\u8DEF\u5F84\u3002",404);let R=await k.prepare("DELETE FROM admin_challenges WHERE id=? AND actor=? AND kind=? AND expires_at>? RETURNING challenge").bind(await ai(uf(T,Ny)),b,P,Date.now()).first();if(R||me("\u9A8C\u8BC1\u5DF2\u8FC7\u671F\u6216\u5DF2\u4F7F\u7528\uFF0C\u8BF7\u91CD\u65B0\u5F00\u59CB\u3002",401),P==="register"){let D=await e.verifyRegistrationResponse({response:g,expectedChallenge:R.challenge,expectedOrigin:wc,expectedRPID:ud,requireUserVerification:!0,supportedAlgorithmIDs:[-7,-257]});D.verified||me("\u901A\u884C\u5BC6\u94A5\u9A8C\u8BC1\u5931\u8D25\u3002",401);let W=D.registrationInfo.credential;await k.prepare("INSERT INTO admin_credential (id,actor,credential_id,public_key,counter,transports) VALUES (?,?,?,?,?,?)").bind(o,b,W.id,ff(W.publicKey),W.counter,JSON.stringify(W.transports||["internal"])).run()}else{E||me("\u672A\u8BBE\u7F6E\u901A\u884C\u5BC6\u94A5\u3002",401);let D=await e.verifyAuthenticationResponse({response:g,expectedChallenge:R.challenge,expectedOrigin:wc,expectedRPID:ud,requireUserVerification:!0,credential:{id:E.credential_id,publicKey:Ly(E.public_key),counter:E.counter,transports:JSON.parse(E.transports)}});D.verified||me("\u901A\u884C\u5BC6\u94A5\u9A8C\u8BC1\u5931\u8D25\u3002",401),(await k.prepare("UPDATE admin_credential SET counter=? WHERE id=? AND counter=?").bind(D.authenticationInfo.newCounter,o,E.counter).run()).meta.changes||me("\u9A8C\u8BC1\u8BA1\u6570\u5DF2\u66F4\u65B0\uFF0C\u8BF7\u91CD\u8BD5\u3002",409)}return p(T,k)}return{async fetch(T,k){try{let O=new URL(T.url),g=O.pathname;if(vc(T),k.DB||me("\u8D26\u6237\u6570\u636E\u5E93\u5C1A\u672A\u8FDE\u63A5\u3002",503),T.method==="POST"){(T.headers.get("origin")!==wc||!T.headers.get("content-type")?.startsWith("application/json"))&&me("\u8BF7\u6C42\u6765\u6E90\u6821\u9A8C\u5931\u8D25\u3002",403);let P=await T.text();P.length>1e6&&me("\u8BF7\u6C42\u8FC7\u5927\u3002",413);let R;try{R=Ee.parseJSON(P)}catch{me("\u8BF7\u6C42\u5185\u5BB9\u65E0\u6548\u3002")}if(g==="/api/command")return await m(T,k.DB,R);if(/^\/api\/admin\/(register|authenticate)\/(options|verify)$/.test(g)||g==="/api/admin/logout")return await A(T,k.DB,g,R);me("\u4E0D\u5B58\u5728\u7684\u63A5\u53E3\u3002",404)}if(T.method!=="GET"&&me("\u4E0D\u652F\u6301\u7684\u8BF7\u6C42\u65B9\u5F0F\u3002",405),g==="/api/state")return oi(await y(T,k.DB));if(g==="/api/admin/status")return await A(T,k.DB,g);if(g.startsWith("/api/")&&me("\u4E0D\u5B58\u5728\u7684\u63A5\u53E3\u3002",404),!["/","/player","/admin","/index.html"].includes(g))return new Response("Not found",{status:404});let b=await y(T,k.DB),E=Ee.stringify(b).replaceAll("<","\\u003c");return new Response(t.replace("/* SERVER_BOOTSTRAP */",`window.__CASINO_BOOTSTRAP__=${E};`),{headers:{"Content-Type":"text/html;charset=utf-8","Cache-Control":"private, no-store","Permissions-Policy":"publickey-credentials-create=(self), publickey-credentials-get=(self)","X-Frame-Options":"SAMEORIGIN","X-Content-Type-Options":"nosniff"}})}catch(O){return oi({error:O.status?O.message:"\u64CD\u4F5C\u672A\u5B8C\u6210\uFF0C\u8BF7\u5237\u65B0\u540E\u91CD\u8BD5\u3002"},O.status||400)}}}}var E$=hf({page:Ef});export{E$ as default};
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

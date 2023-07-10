import{s as q,n as D,c as ge,d as de,u as pe,g as be,e as ye}from"../chunks/scheduler.46401592.js";import{S as K,i as P,e as x,a as b,f as v,x as V,y as B,j as E,k as c,z as F,A as y,g as w,s as k,h as z,c as M,B as oe,d as O,p as fe,t as S,b as ce,r as X,C as ue,u as I,v as W,w as R,D as me,m as he,n as _e,E as we}from"../chunks/index.e4925500.js";function G(n){return(n==null?void 0:n.length)!==void 0?n:Array.from(n)}const ze=!0,Ke=Object.freeze(Object.defineProperty({__proto__:null,prerender:ze},Symbol.toStringTag,{value:"Module"})),Y=parseFloat;function J(n,e=";"){let t;if(Array.isArray(n))t=n.filter(r=>r);else{t=[];for(const r in n)n[r]&&t.push(`${r}:${n[r]}`)}return t.join(e)}function Ce(n,e,t,r){let i,o;const l="1em";let u,a,h,m="-.125em";const f="visible";return r&&(h="center",o="1.25em"),t&&(i=t),e&&(e=="lg"?(a="1.33333em",u=".75em",m="-.225em"):e=="xs"?a=".75em":e=="sm"?a=".875em":a=e.replace("x","em")),J([J({float:i,width:o,height:l,"line-height":u,"font-size":a,"text-align":h,"vertical-align":m,"transform-origin":"center",overflow:f}),n])}function Ee(n,e,t,r,i,o=1,l="",u=""){let a=1,h=1;return i&&(i=="horizontal"?a=-1:i=="vertical"?h=-1:a=h=-1),J([`translate(${Y(e)*o}${l},${Y(t)*o}${l})`,`scale(${a*Y(n)},${h*Y(n)})`,r&&`rotate(${r}${u})`]," ")}function $(n){let e,t,r,i,o,l,u,a;function h(s,d){return typeof s[10][4]=="string"?Me:ke}let m=h(n),f=m(n);return{c(){e=V("svg"),t=V("g"),r=V("g"),f.c(),this.h()},l(s){e=B(s,"svg",{id:!0,class:!0,style:!0,viewBox:!0,"aria-hidden":!0,role:!0,xmlns:!0});var d=E(e);t=B(d,"g",{transform:!0,"transform-origin":!0});var T=E(t);r=B(T,"g",{transform:!0});var A=E(r);f.l(A),A.forEach(v),T.forEach(v),d.forEach(v),this.h()},h(){c(r,"transform",n[12]),c(t,"transform",i="translate("+n[10][0]/2+" "+n[10][1]/2+")"),c(t,"transform-origin",o=n[10][0]/4+" 0"),c(e,"id",l=n[1]||void 0),c(e,"class",u="svelte-fa "+n[0]+" svelte-1cj2gr0"),c(e,"style",n[11]),c(e,"viewBox",a="0 0 "+n[10][0]+" "+n[10][1]),c(e,"aria-hidden","true"),c(e,"role","img"),c(e,"xmlns","http://www.w3.org/2000/svg"),F(e,"pulse",n[4]),F(e,"spin",n[3])},m(s,d){b(s,e,d),y(e,t),y(t,r),f.m(r,null)},p(s,d){m===(m=h(s))&&f?f.p(s,d):(f.d(1),f=m(s),f&&(f.c(),f.m(r,null))),d&4096&&c(r,"transform",s[12]),d&1024&&i!==(i="translate("+s[10][0]/2+" "+s[10][1]/2+")")&&c(t,"transform",i),d&1024&&o!==(o=s[10][0]/4+" 0")&&c(t,"transform-origin",o),d&2&&l!==(l=s[1]||void 0)&&c(e,"id",l),d&1&&u!==(u="svelte-fa "+s[0]+" svelte-1cj2gr0")&&c(e,"class",u),d&2048&&c(e,"style",s[11]),d&1024&&a!==(a="0 0 "+s[10][0]+" "+s[10][1])&&c(e,"viewBox",a),d&17&&F(e,"pulse",s[4]),d&9&&F(e,"spin",s[3])},d(s){s&&v(e),f.d()}}}function ke(n){let e,t,r,i,o,l,u,a,h,m;return{c(){e=V("path"),l=V("path"),this.h()},l(f){e=B(f,"path",{d:!0,fill:!0,"fill-opacity":!0,transform:!0}),E(e).forEach(v),l=B(f,"path",{d:!0,fill:!0,"fill-opacity":!0,transform:!0}),E(l).forEach(v),this.h()},h(){c(e,"d",t=n[10][4][0]),c(e,"fill",r=n[6]||n[2]||"currentColor"),c(e,"fill-opacity",i=n[9]!=!1?n[7]:n[8]),c(e,"transform",o="translate("+n[10][0]/-2+" "+n[10][1]/-2+")"),c(l,"d",u=n[10][4][1]),c(l,"fill",a=n[5]||n[2]||"currentColor"),c(l,"fill-opacity",h=n[9]!=!1?n[8]:n[7]),c(l,"transform",m="translate("+n[10][0]/-2+" "+n[10][1]/-2+")")},m(f,s){b(f,e,s),b(f,l,s)},p(f,s){s&1024&&t!==(t=f[10][4][0])&&c(e,"d",t),s&68&&r!==(r=f[6]||f[2]||"currentColor")&&c(e,"fill",r),s&896&&i!==(i=f[9]!=!1?f[7]:f[8])&&c(e,"fill-opacity",i),s&1024&&o!==(o="translate("+f[10][0]/-2+" "+f[10][1]/-2+")")&&c(e,"transform",o),s&1024&&u!==(u=f[10][4][1])&&c(l,"d",u),s&36&&a!==(a=f[5]||f[2]||"currentColor")&&c(l,"fill",a),s&896&&h!==(h=f[9]!=!1?f[8]:f[7])&&c(l,"fill-opacity",h),s&1024&&m!==(m="translate("+f[10][0]/-2+" "+f[10][1]/-2+")")&&c(l,"transform",m)},d(f){f&&(v(e),v(l))}}}function Me(n){let e,t,r,i;return{c(){e=V("path"),this.h()},l(o){e=B(o,"path",{d:!0,fill:!0,transform:!0}),E(e).forEach(v),this.h()},h(){c(e,"d",t=n[10][4]),c(e,"fill",r=n[2]||n[5]||"currentColor"),c(e,"transform",i="translate("+n[10][0]/-2+" "+n[10][1]/-2+")")},m(o,l){b(o,e,l)},p(o,l){l&1024&&t!==(t=o[10][4])&&c(e,"d",t),l&36&&r!==(r=o[2]||o[5]||"currentColor")&&c(e,"fill",r),l&1024&&i!==(i="translate("+o[10][0]/-2+" "+o[10][1]/-2+")")&&c(e,"transform",i)},d(o){o&&v(e)}}}function Oe(n){let e,t=n[10][4]&&$(n);return{c(){t&&t.c(),e=x()},l(r){t&&t.l(r),e=x()},m(r,i){t&&t.m(r,i),b(r,e,i)},p(r,[i]){r[10][4]?t?t.p(r,i):(t=$(r),t.c(),t.m(e.parentNode,e)):t&&(t.d(1),t=null)},i:D,o:D,d(r){r&&v(e),t&&t.d(r)}}}function Te(n,e,t){let{class:r=""}=e,{id:i=""}=e,{style:o=""}=e,{icon:l}=e,{size:u=""}=e,{color:a=""}=e,{fw:h=!1}=e,{pull:m=""}=e,{scale:f=1}=e,{translateX:s=0}=e,{translateY:d=0}=e,{rotate:T=""}=e,{flip:A=!1}=e,{spin:j=!1}=e,{pulse:N=!1}=e,{primaryColor:L=""}=e,{secondaryColor:C=""}=e,{primaryOpacity:g=1}=e,{secondaryOpacity:p=.4}=e,{swapOpacity:H=!1}=e,Q,U,Z;return n.$$set=_=>{"class"in _&&t(0,r=_.class),"id"in _&&t(1,i=_.id),"style"in _&&t(13,o=_.style),"icon"in _&&t(14,l=_.icon),"size"in _&&t(15,u=_.size),"color"in _&&t(2,a=_.color),"fw"in _&&t(16,h=_.fw),"pull"in _&&t(17,m=_.pull),"scale"in _&&t(18,f=_.scale),"translateX"in _&&t(19,s=_.translateX),"translateY"in _&&t(20,d=_.translateY),"rotate"in _&&t(21,T=_.rotate),"flip"in _&&t(22,A=_.flip),"spin"in _&&t(3,j=_.spin),"pulse"in _&&t(4,N=_.pulse),"primaryColor"in _&&t(5,L=_.primaryColor),"secondaryColor"in _&&t(6,C=_.secondaryColor),"primaryOpacity"in _&&t(7,g=_.primaryOpacity),"secondaryOpacity"in _&&t(8,p=_.secondaryOpacity),"swapOpacity"in _&&t(9,H=_.swapOpacity)},n.$$.update=()=>{n.$$.dirty&16384&&t(10,Q=l&&l.icon||[0,0,"",[],""]),n.$$.dirty&237568&&t(11,U=Ce(o,u,m,h)),n.$$.dirty&8126464&&t(12,Z=Ee(f,s,d,T,A,512))},[r,i,a,j,N,L,C,g,p,H,Q,U,Z,o,l,u,h,m,f,s,d,T,A]}class Ae extends K{constructor(e){super(),P(this,e,Te,Oe,q,{class:0,id:1,style:13,icon:14,size:15,color:2,fw:16,pull:17,scale:18,translateX:19,translateY:20,rotate:21,flip:22,spin:3,pulse:4,primaryColor:5,secondaryColor:6,primaryOpacity:7,secondaryOpacity:8,swapOpacity:9})}}const ve=Ae;var ee={prefix:"fas",iconName:"bars",icon:[448,512,["navicon"],"f0c9","M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"]},te={prefix:"fas",iconName:"x",icon:[384,512,[120],"58","M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"]};function le(n,e,t){const r=n.slice();return r[6]=e[t],r}function ne(n){let e,t,r="Evorp's Website",i,o,l,u,a,h;return l=new ve({props:{icon:n[2]}}),{c(){e=w("div"),t=w("a"),t.textContent=r,i=k(),o=w("button"),X(l.$$.fragment),this.h()},l(m){e=z(m,"DIV",{class:!0});var f=E(e);t=z(f,"A",{class:!0,href:!0,"data-svelte-h":!0}),ue(t)!=="svelte-6tejl2"&&(t.textContent=r),i=M(f),o=z(f,"BUTTON",{class:!0});var s=E(o);I(l.$$.fragment,s),s.forEach(v),f.forEach(v),this.h()},h(){c(t,"class","info-text link-hover svelte-1t92ta3"),c(t,"href","/"),c(o,"class","toggle info-text link-hover svelte-1t92ta3"),c(e,"class","mobile-navbar svelte-1t92ta3")},m(m,f){b(m,e,f),y(e,t),y(e,i),y(e,o),W(l,o,null),u=!0,a||(h=oe(o,"click",n[4]),a=!0)},p(m,f){const s={};f&4&&(s.icon=m[2]),l.$set(s)},i(m){u||(O(l.$$.fragment,m),u=!0)},o(m){S(l.$$.fragment,m),u=!1},d(m){m&&v(e),R(l),a=!1,h()}}}function re(n){let e,t=G(n[3]),r=[];for(let i=0;i<t.length;i+=1)r[i]=ie(le(n,t,i));return{c(){e=w("div");for(let i=0;i<r.length;i+=1)r[i].c();this.h()},l(i){e=z(i,"DIV",{class:!0});var o=E(e);for(let l=0;l<r.length;l+=1)r[l].l(o);o.forEach(v),this.h()},h(){c(e,"class","navbar svelte-1t92ta3")},m(i,o){b(i,e,o);for(let l=0;l<r.length;l+=1)r[l]&&r[l].m(e,null)},p(i,o){if(o&8){t=G(i[3]);let l;for(l=0;l<t.length;l+=1){const u=le(i,t,l);r[l]?r[l].p(u,o):(r[l]=ie(u),r[l].c(),r[l].m(e,null))}for(;l<r.length;l+=1)r[l].d(1);r.length=t.length}},d(i){i&&v(e),me(r,i)}}}function ie(n){let e,t=n[6].title+"",r;return{c(){e=w("a"),r=he(t),this.h()},l(i){e=z(i,"A",{class:!0,href:!0});var o=E(e);r=_e(o,t),o.forEach(v),this.h()},h(){c(e,"class","info-text link-hover svelte-1t92ta3"),c(e,"href",n[6].url)},m(i,o){b(i,e,o),y(e,r)},p:D,d(i){i&&v(e)}}}function je(n){let e,t,r,i,o;ge(n[5]);let l=n[0]<=900&&ne(n),u=(n[1]||n[0]>900)&&re(n);return{c(){e=w("nav"),l&&l.c(),t=k(),u&&u.c(),this.h()},l(a){e=z(a,"NAV",{class:!0});var h=E(e);l&&l.l(h),t=M(h),u&&u.l(h),h.forEach(v),this.h()},h(){c(e,"class","edges svelte-1t92ta3")},m(a,h){b(a,e,h),l&&l.m(e,null),y(e,t),u&&u.m(e,null),r=!0,i||(o=oe(window,"resize",n[5]),i=!0)},p(a,[h]){a[0]<=900?l?(l.p(a,h),h&1&&O(l,1)):(l=ne(a),l.c(),O(l,1),l.m(e,t)):l&&(fe(),S(l,1,1,()=>{l=null}),ce()),a[1]||a[0]>900?u?u.p(a,h):(u=re(a),u.c(),u.m(e,null)):u&&(u.d(1),u=null)},i(a){r||(O(l),r=!0)},o(a){S(l),r=!1},d(a){a&&v(e),l&&l.d(),u&&u.d(),i=!1,o()}}}function Ne(n,e,t){let r,i=!1,o=ee;const l=[{title:"Home",url:"/"},{title:"Faithful",url:"/faithful"},{title:"spunch bot",url:"/spunch-bot"},{title:"Commissions",url:"/commissions"},{title:"About",url:"/about"}];function u(){t(1,i=!i),t(2,o=o==te?ee:te)}function a(){t(0,r=window.innerWidth)}return[r,i,o,l,u,a]}class He extends K{constructor(e){super(),P(this,e,Ne,je,q,{})}}var Se={prefix:"fab",iconName:"steam",icon:[496,512,[],"f1b6","M496 256c0 137-111.2 248-248.4 248-113.8 0-209.6-76.3-239-180.4l95.2 39.3c6.4 32.1 34.9 56.4 68.9 56.4 39.2 0 71.9-32.4 70.2-73.5l84.5-60.2c52.1 1.3 95.8-40.9 95.8-93.5 0-51.6-42-93.5-93.7-93.5s-93.7 42-93.7 93.5v1.2L176.6 279c-15.5-.9-30.7 3.4-43.5 12.1L0 236.1C10.2 108.4 117.1 8 247.6 8 384.8 8 496 119 496 256zM155.7 384.3l-30.5-12.6a52.79 52.79 0 0 0 27.2 25.8c26.9 11.2 57.8-1.6 69-28.4 5.4-13 5.5-27.3.1-40.3-5.4-13-15.5-23.2-28.5-28.6-12.9-5.4-26.7-5.2-38.9-.6l31.5 13c19.8 8.2 29.2 30.9 20.9 50.7-8.3 19.9-31 29.2-50.8 21zm173.8-129.9c-34.4 0-62.4-28-62.4-62.3s28-62.3 62.4-62.3 62.4 28 62.4 62.3-27.9 62.3-62.4 62.3zm.1-15.6c25.9 0 46.9-21 46.9-46.8 0-25.9-21-46.8-46.9-46.8s-46.9 21-46.9 46.8c.1 25.8 21.1 46.8 46.9 46.8z"]},Le={prefix:"fab",iconName:"reddit",icon:[512,512,[],"f1a1","M201.5 305.5c-13.8 0-24.9-11.1-24.9-24.6 0-13.8 11.1-24.9 24.9-24.9 13.6 0 24.6 11.1 24.6 24.9 0 13.6-11.1 24.6-24.6 24.6zM504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-132.3-41.2c-9.4 0-17.7 3.9-23.8 10-22.4-15.5-52.6-25.5-86.1-26.6l17.4-78.3 55.4 12.5c0 13.6 11.1 24.6 24.6 24.6 13.8 0 24.9-11.3 24.9-24.9s-11.1-24.9-24.9-24.9c-9.7 0-18 5.8-22.1 13.8l-61.2-13.6c-3-.8-6.1 1.4-6.9 4.4l-19.1 86.4c-33.2 1.4-63.1 11.3-85.5 26.8-6.1-6.4-14.7-10.2-24.1-10.2-34.9 0-46.3 46.9-14.4 62.8-1.1 5-1.7 10.2-1.7 15.5 0 52.6 59.2 95.2 132 95.2 73.1 0 132.3-42.6 132.3-95.2 0-5.3-.6-10.8-1.9-15.8 31.3-16 19.8-62.5-14.9-62.5zM302.8 331c-18.2 18.2-76.1 17.9-93.6 0-2.2-2.2-6.1-2.2-8.3 0-2.5 2.5-2.5 6.4 0 8.6 22.8 22.8 87.3 22.8 110.2 0 2.5-2.2 2.5-6.1 0-8.6-2.2-2.2-6.1-2.2-8.3 0zm7.7-75c-13.6 0-24.6 11.1-24.6 24.9 0 13.6 11.1 24.6 24.6 24.6 13.8 0 24.9-11.1 24.9-24.6 0-13.8-11-24.9-24.9-24.9z"]},Ve={prefix:"fab",iconName:"github",icon:[496,512,[],"f09b","M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"]},Be={prefix:"fab",iconName:"youtube",icon:[576,512,[61802],"f167","M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"]},Fe={prefix:"fab",iconName:"twitter",icon:[512,512,[],"f099","M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"]},Ye={prefix:"fab",iconName:"tumblr",icon:[320,512,[],"f173","M309.8 480.3c-13.6 14.5-50 31.7-97.4 31.7-120.8 0-147-88.8-147-140.6v-144H17.9c-5.5 0-10-4.5-10-10v-68c0-7.2 4.5-13.6 11.3-16 62-21.8 81.5-76 84.3-117.1.8-11 6.5-16.3 16.1-16.3h70.9c5.5 0 10 4.5 10 10v115.2h83c5.5 0 10 4.4 10 9.9v81.7c0 5.5-4.5 10-10 10h-83.4V360c0 34.2 23.7 53.6 68 35.8 4.8-1.9 9-3.2 12.7-2.2 3.5.9 5.8 3.4 7.4 7.9l22 64.3c1.8 5 3.3 10.6-.4 14.5z"]};function ae(n,e,t){const r=n.slice();return r[1]=e[t],r}function se(n){let e,t,r,i=n[1].title+"",o,l,u;return t=new ve({props:{icon:n[1].icon}}),{c(){e=w("a"),X(t.$$.fragment),r=k(),o=he(i),l=k(),this.h()},l(a){e=z(a,"A",{class:!0,href:!0});var h=E(e);I(t.$$.fragment,h),r=M(h),o=_e(h,i),l=M(h),h.forEach(v),this.h()},h(){c(e,"class","info-text link-hover svelte-jcy2sm"),c(e,"href",n[1].url)},m(a,h){b(a,e,h),W(t,e,null),y(e,r),y(e,o),y(e,l),u=!0},p:D,i(a){u||(O(t.$$.fragment,a),u=!0)},o(a){S(t.$$.fragment,a),u=!1},d(a){a&&v(e),R(t)}}}function De(n){let e,t,r,i,o='<p class="info-text svelte-jcy2sm">This website was made using the <a href="https://kit.svelte.dev/" target="_blank" rel="noopener noreferrer" class="svelte-jcy2sm">SvelteKit</a> framework. View the source <a href="https://github.com/3vorp/3vorp.github.io" target="_blank" rel="noopener noreferrer" class="svelte-jcy2sm">here</a>!</p>',l,u=G(n[0]),a=[];for(let m=0;m<u.length;m+=1)a[m]=se(ae(n,u,m));const h=m=>S(a[m],1,1,()=>{a[m]=null});return{c(){e=w("footer"),t=w("div");for(let m=0;m<a.length;m+=1)a[m].c();r=k(),i=w("div"),i.innerHTML=o,this.h()},l(m){e=z(m,"FOOTER",{class:!0});var f=E(e);t=z(f,"DIV",{class:!0});var s=E(t);for(let d=0;d<a.length;d+=1)a[d].l(s);s.forEach(v),r=M(f),i=z(f,"DIV",{class:!0,"data-svelte-h":!0}),ue(i)!=="svelte-1yesa7p"&&(i.innerHTML=o),f.forEach(v),this.h()},h(){c(t,"class","footer-bar svelte-jcy2sm"),c(i,"class","bottom svelte-jcy2sm"),c(e,"class","svelte-jcy2sm")},m(m,f){b(m,e,f),y(e,t);for(let s=0;s<a.length;s+=1)a[s]&&a[s].m(t,null);y(e,r),y(e,i),l=!0},p(m,[f]){if(f&1){u=G(m[0]);let s;for(s=0;s<u.length;s+=1){const d=ae(m,u,s);a[s]?(a[s].p(d,f),O(a[s],1)):(a[s]=se(d),a[s].c(),O(a[s],1),a[s].m(t,null))}for(fe(),s=u.length;s<a.length;s+=1)h(s);ce()}},i(m){if(!l){for(let f=0;f<u.length;f+=1)O(a[f]);l=!0}},o(m){a=a.filter(Boolean);for(let f=0;f<a.length;f+=1)S(a[f]);l=!1},d(m){m&&v(e),me(a,m)}}}function Xe(n){return[[{title:"GitHub",url:"https://github.com/3vorp",icon:Ve},{title:"Twitter",url:"https://twitter.com/3vorp",icon:Fe},{title:"Reddit",url:"https://reddit.com/u/3vorp",icon:Le},{title:"Tumblr",url:"https://tumblr.com/evorp",icon:Ye},{title:"YouTube",url:"https://www.youtube.com/@evorp",icon:Be},{title:"Steam",url:"https://steamcommunity.com/id/3vorp/",icon:Se}]]}class Ie extends K{constructor(e){super(),P(this,e,Xe,De,q,{})}}function We(n){let e,t,r,i,o,l,u,a,h,m,f,s,d,T,A,j,N;d=new He({});const L=n[1].default,C=de(L,n,n[0],null);return j=new Ie({}),{c(){e=w("meta"),t=w("meta"),r=w("meta"),i=w("meta"),o=k(),l=w("meta"),u=k(),a=w("meta"),h=k(),m=w("meta"),f=k(),s=w("div"),X(d.$$.fragment),T=k(),C&&C.c(),A=k(),X(j.$$.fragment),this.h()},l(g){const p=we("svelte-1j6rlje",document.head);e=z(p,"META",{property:!0,content:!0}),t=z(p,"META",{property:!0,content:!0}),r=z(p,"META",{property:!0,content:!0}),i=z(p,"META",{property:!0,content:!0}),p.forEach(v),o=M(g),l=z(g,"META",{name:!0,content:!0}),u=M(g),a=z(g,"META",{property:!0,content:!0}),h=M(g),m=z(g,"META",{property:!0,content:!0}),f=M(g),s=z(g,"DIV",{class:!0});var H=E(s);I(d.$$.fragment,H),T=M(H),C&&C.l(H),A=M(H),I(j.$$.fragment,H),H.forEach(v),this.h()},h(){document.title="Evorp's Website",c(e,"property","og:type"),c(e,"content","website"),c(t,"property","og:title"),c(t,"content","Evorp's Website"),c(r,"property","og:description"),c(r,"content","idk at this point either"),c(i,"property","og:image"),c(i,"content","https://raw.githubusercontent.com/3vorp/3vorp.github.io/main/static/embed_banner.jpg"),c(l,"name","twitter:card"),c(l,"content","summary_large_image"),c(a,"property","twitter:description"),c(a,"content","idk at this point either"),c(m,"property","twitter:image"),c(m,"content","https://raw.githubusercontent.com/3vorp/3vorp.github.io/main/static/embed_banner.jpg"),c(s,"class","fix-footer svelte-cd73l2")},m(g,p){y(document.head,e),y(document.head,t),y(document.head,r),y(document.head,i),b(g,o,p),b(g,l,p),b(g,u,p),b(g,a,p),b(g,h,p),b(g,m,p),b(g,f,p),b(g,s,p),W(d,s,null),y(s,T),C&&C.m(s,null),y(s,A),W(j,s,null),N=!0},p(g,[p]){C&&C.p&&(!N||p&1)&&pe(C,L,g,g[0],N?ye(L,g[0],p,null):be(g[0]),null)},i(g){N||(O(d.$$.fragment,g),O(C,g),O(j.$$.fragment,g),N=!0)},o(g){S(d.$$.fragment,g),S(C,g),S(j.$$.fragment,g),N=!1},d(g){g&&(v(o),v(l),v(u),v(a),v(h),v(m),v(f),v(s)),v(e),v(t),v(r),v(i),R(d),C&&C.d(g),R(j)}}}function Re(n,e,t){let{$$slots:r={},$$scope:i}=e;return n.$$set=o=>{"$$scope"in o&&t(0,i=o.$$scope)},[i,r]}class Pe extends K{constructor(e){super(),P(this,e,Re,We,q,{})}}export{Pe as component,Ke as universal};

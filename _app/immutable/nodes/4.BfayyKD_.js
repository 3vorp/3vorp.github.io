import{s as j,a as $,n as x}from"../chunks/scheduler.Dw93JyHj.js";import{S as q,i as z,e as _,s as C,c as p,a as I,h as y,g as G,f as u,b as m,d as b,k as v,m as M}from"../chunks/index.DNoybo92.js";import{e as D}from"../chunks/each.D6YF6ztN.js";function E(o,e,n){const c=o.slice();return c[1]=e[n],c}function V(o){let e,n,c,l;return{c(){e=_("div"),n=_("img"),l=C(),this.h()},l(i){e=p(i,"DIV",{class:!0});var h=y(e);n=p(h,"IMG",{src:!0,alt:!0}),l=I(h),h.forEach(u),this.h()},h(){$(n.src,c=`commission/${o[1].src}`)||m(n,"src",c),m(n,"alt",o[1].alt||"commission image"),m(e,"class","img-cell")},m(i,h){b(i,e,h),v(e,n),v(e,l)},p:x,d(i){i&&u(e)}}}function P(o){let e,n,c,l,i,h="Past Commissions",k,g,d=D(o[0]),a=[];for(let t=0;t<d.length;t+=1)a[t]=V(E(o,d,t));return{c(){e=_("img"),c=C(),l=_("div"),i=_("h1"),i.textContent=h,k=C(),g=_("div");for(let t=0;t<a.length;t+=1)a[t].c();this.h()},l(t){e=p(t,"IMG",{src:!0,alt:!0,class:!0}),c=I(t),l=p(t,"DIV",{class:!0});var r=y(l);i=p(r,"H1",{align:!0,"data-svelte-h":!0}),G(i)!=="svelte-hel2j7"&&(i.textContent=h),k=I(r),g=p(r,"DIV",{class:!0});var s=y(g);for(let f=0;f<a.length;f+=1)a[f].l(s);s.forEach(u),r.forEach(u),this.h()},h(){$(e.src,n="banner/commissions.jpg")||m(e,"src",n),m(e,"alt","commission banner"),m(e,"class","banner-img"),m(i,"align","center"),m(g,"class","img-container svelte-hvodd6"),m(l,"class","padding-div")},m(t,r){b(t,e,r),b(t,c,r),b(t,l,r),v(l,i),v(l,k),v(l,g);for(let s=0;s<a.length;s+=1)a[s]&&a[s].m(g,null)},p(t,[r]){if(r&1){d=D(t[0]);let s;for(s=0;s<d.length;s+=1){const f=E(t,d,s);a[s]?a[s].p(f,r):(a[s]=V(f),a[s].c(),a[s].m(g,null))}for(;s<a.length;s+=1)a[s].d(1);a.length=d.length}},i:x,o:x,d(t){t&&(u(e),u(c),u(l)),M(a,t)}}}function S(o){return[[{src:"skull.gif",alt:"skull"},{src:"computer.png",alt:"computer"},{src:"dragon.png",alt:"dragon"},{src:"zombie.png",alt:"zombie"},{src:"cat.gif",alt:"cat"}]]}class B extends q{constructor(e){super(),z(this,e,S,P,j,{})}}export{B as component};

(this["webpackJsonplotr-api-sample-app"]=this["webpackJsonplotr-api-sample-app"]||[]).push([[0],{11:function(e,t,n){},14:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n.n(c),a=n(5),s=n.n(a),o=(n(11),n(3)),i=n.n(o),u=n(6),p=n(4),h=n(1),d=function(){var e=Object(c.useState)(),t=Object(p.a)(e,2),n=t[0],r=t[1],a=Object(c.useState)(),s=Object(p.a)(a,2),o=s[0],d=s[1];return Object(c.useEffect)((function(){var e={Accept:"application/json",Authorization:"Bearer yourapikey"};(function(){var t=Object(u.a)(i.a.mark((function t(){var n,c,a,s,o,u;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://the-one-api.dev/v2/quote",{headers:e});case 2:return n=t.sent,t.next=5,n.json();case 5:return c=t.sent,a=c.docs[Math.floor(Math.random()*c.docs.length)],r(a.dialog),t.next=10,fetch("https://the-one-api.dev/v2/character?_id="+a.character,{headers:e});case 10:return s=t.sent,t.next=13,s.json();case 13:o=t.sent,u=o.docs[0],d(u.name);case 16:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}})()()}),[]),Object(h.jsxs)("div",{children:[Object(h.jsx)("blockquote",{children:n}),Object(h.jsxs)("cite",{children:["- ",o]})]})};s.a.render(Object(h.jsx)(r.a.StrictMode,{children:Object(h.jsx)(d,{})}),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.ae7f4b00.chunk.js.map
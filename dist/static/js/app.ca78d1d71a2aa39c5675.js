webpackJsonp([1],{122:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("transition",{attrs:{name:"fade"}},[0!=t.buttonData.length?n("div",t._l(t.buttonDataFilter.length-1,function(e){return n("div",{key:e},[n("h2",[t._v(t._s(t.buttonData[e].title))]),t._v(" "),n("div",{staticClass:"button-box"},t._l(t.buttonDataFilter[e].button.length-1,function(a){return n("button",{key:a,on:{click:function(n){return t.playAudio(e,a)}}},[t._v("\n                    "+t._s(t.buttonDataFilter[e].button[a])+"\n                    ")])}),0),t._v(" "),n("hr")])}),0):t._e()]),t._v(" "),n("div",{attrs:{id:"footer"}},[n("div",{staticClass:"controlor"},[n("div",{staticClass:"inline-block"},[n("span",[t._v("現在の音声")]),t._v(" "),n("br"),t._v(" "),n("span",[t._v(t._s(t.nowPlaying))])]),t._v(" "),n("audio",{staticClass:"inline-block",attrs:{id:"ad",controls:""}}),t._v(" "),n("div",{staticClass:"inline-block"},[n("span",[t._v("次の音声")]),t._v(" "),n("br"),t._v(" "),n("span",[t._v(t._s(t.next))])])])])],1)},r=[],o={render:a,staticRenderFns:r};e.a=o},28:function(t,e,n){"use strict";e.a={name:"app"}},29:function(t,e,n){"use strict";e.a={name:"hello",data:function(){return{msg:"Welcome to Your Vue.js PWA"}}}},30:function(t,e,n){"use strict";var a=n(63);e.a={name:"MainPage",data:function(){return{audioQue:[null],buttonData:[],ad:new Audio,playFlag:!0,nowPlaying:"まだ入ってないよ",next:"次はまだ入ってないよ"}},created:function(){var t=this;a.a.get("api/button").then(function(e){t.buttonData=e.data.button})},mounted:function(){var t=this;this.ad=document.getElementById("ad"),this.ad.addEventListener("loadstart",function(){t.nowPlaying=t.audioTitle(t.ad.src),t.next=t.audioTitle(t.audioQue[0])}),this.ad.addEventListener("ended",function(){null==t.audioQue[0]?t.playFlag=!0:(t.ad.src=t.audioQue[0],t.audioQue.shift(),t.ad.play())})},methods:{playAudio:function(t,e){var n=this.buttonData[t],a=n.basepath,r=n.title,o=n.button[e];if(void 0==o)return 0;var i="static/"+a+"/"+r+"/"+o;console.log(i),this.playFlag?(this.ad.src=i,this.ad.play()):(this.audioQue.splice(this.audioQue.length-1,0,i),this.next=this.audioTitle(this.audioQue[0])),this.playFlag=!1},audioTitle:function(t){if(null==t)return"次はまだ入ってないよ";var e=decodeURIComponent(t);return e=e.split("/"),e[e.length-1]}},computed:{buttonDataFilter:function(){return this.buttonData.filter(function(t){return t.button.length>0})}}}},49:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(26),r=n(52),o=n(56);a.a.config.productionTip=!1,new a.a({el:"#app",router:o.a,template:"<App/>",components:{App:r.a}})},52:function(t,e,n){"use strict";function a(t){n(53)}var r=n(28),o=n(55),i=n(16),u=a,s=i(r.a,o.a,!1,u,null,null);e.a=s.exports},53:function(t,e){},55:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[t._m(0),t._v(" "),n("main",[n("router-view")],1)])},r=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("header",[n("span",[t._v("〇〇ボタンメーカー")])])}],o={render:a,staticRenderFns:r};e.a=o},56:function(t,e,n){"use strict";var a=n(26),r=n(57),o=(n(58),n(61));a.a.use(r.a),e.a=new r.a({mode:"history",routes:[{path:"/",name:"Main",component:o.a}]})},58:function(t,e,n){"use strict";function a(t){n(59)}var r=n(29),o=n(60),i=n(16),u=a,s=i(r.a,o.a,!1,u,null,null);s.exports},59:function(t,e){},60:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"hello"},[n("h1",[t._v(t._s(t.msg))]),t._v(" "),n("h2",[t._v("Essential Links")]),t._v(" "),t._m(0),t._v(" "),n("h2",[t._v("Ecosystem")]),t._v(" "),t._m(1)])},r=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",[n("li",[n("a",{attrs:{href:"https://vuejs.org",target:"_blank",rel:"noopener"}},[t._v("Core Docs")])]),t._v(" "),n("li",[n("a",{attrs:{href:"https://forum.vuejs.org",target:"_blank",rel:"noopener"}},[t._v("Forum")])]),t._v(" "),n("li",[n("a",{attrs:{href:"http://chat.vuejs.org/",target:"_blank",rel:"noopener"}},[t._v("Vue Community Chat")])]),t._v(" "),n("li",[n("a",{attrs:{href:"https://twitter.com/vuejs",target:"_blank",rel:"noopener"}},[t._v("Twitter")])]),t._v(" "),n("li",[n("a",{attrs:{href:"http://vuejs-templates.github.io/webpack/",target:"_blank",rel:"noopener"}},[t._v("Docs for This Template")])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",[n("li",[n("a",{attrs:{href:"http://router.vuejs.org/",target:"_blank",rel:"noopener"}},[t._v("vue-router")])]),t._v(" "),n("li",[n("a",{attrs:{href:"http://vuex.vuejs.org/",target:"_blank",rel:"noopener"}},[t._v("vuex")])]),t._v(" "),n("li",[n("a",{attrs:{href:"http://vue-loader.vuejs.org/",target:"_blank",rel:"noopener"}},[t._v("vue-loader")])]),t._v(" "),n("li",[n("a",{attrs:{href:"https://github.com/vuejs/awesome-vue",target:"_blank",rel:"noopener"}},[t._v("awesome-vue")])])])}],o={render:a,staticRenderFns:r};e.a=o},61:function(t,e,n){"use strict";function a(t){n(62)}var r=n(30),o=n(122),i=n(16),u=a,s=i(r.a,o.a,!1,u,"data-v-2c035e48",null);e.a=s.exports},62:function(t,e){},63:function(t,e,n){"use strict";var a=n(64),r=n.n(a),o=n(100),i=(n.n(o),n(102)),u=n.n(i),s=(n(121),function(t){return r.a.resolve(t)}),l=function(t){throw console.log(t),new Error("API error")},c=function(t){return t};e.a={get:function(t,e){var n=c(t);return u.a.get(n,{params:e}).then(s).catch(l)},post:function(t,e){var n=c(t);return u.a.post(n,e).then(s).catch(l)},put:function(t,e){var n=c(t);return u.a.put(n,e).then(s).catch(l)},delete:function(t,e){var n=c(t);return u.a.delete(n,{data:e}).then(s).catch(l)}}}},[49]);
//# sourceMappingURL=app.ca78d1d71a2aa39c5675.js.map
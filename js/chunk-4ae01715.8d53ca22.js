(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4ae01715"],{"3b96":function(e,t,s){"use strict";var a=s("7308"),r=s.n(a);r.a},7308:function(e,t,s){},"8f42":function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"p2"},[s("form",{staticClass:"v-fill flex-column",on:{submit:function(t){return t.preventDefault(),e.saveEntry(t)}}},[s("label",{staticClass:"primary font-2",attrs:{for:"feedUrl"}},[e._v("*Podcast feed url:")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.feedUrl,expression:"feedUrl"}],staticClass:"input m1-top m2-bottom",attrs:{name:"feedUrl",type:"url",placeholder:"web address"},domProps:{value:e.feedUrl},on:{input:function(t){t.target.composing||(e.feedUrl=t.target.value)}}}),s("label",{staticClass:"primary font-2",attrs:{for:"search"}},[e._v("Search iTunes")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.query,expression:"query"}],staticClass:"input m1-top",attrs:{name:"search",type:"text",placeholder:"podcast search"},domProps:{value:e.query},on:{input:[function(t){t.target.composing||(e.query=t.target.value)},e.search]}}),s("transition",{attrs:{name:"fade-in"}},[e.searchResults?s("div",{staticClass:"scrolly border-primary shadow-primary3 m1-h"},[0===e.searchResults.length?s("p",[e._v("No podcasts found on iTunes")]):e._e(),e._l(e.searchResults,(function(t){return s("div",{key:t.collectionId,staticClass:"podcast-result",class:{selected:e.selectedPodcast===t},on:{click:function(s){return e.podcastSelected(t)}}},[s("img",{staticClass:"podcast-image",attrs:{src:t.artworkUrl100}}),s("div",{staticClass:"podcast-description"},[s("p",{staticClass:"primary"},[e._v(e._s(t.collectionName))]),s("p",{staticClass:"muted font-2"},[e._v(e._s(t.artistName))])])])}))],2):e._e()]),s("button",{staticClass:"button add-button",attrs:{disabled:!e.feedUrl}},[e._v("Add")])],1)])},r=[],l=s("970e"),n={name:"AddPodcast",data:function(){return{query:null,searchResults:null,selectedPodcast:null,typeAheadTimer:null,feedUrl:null}},methods:{search:function(){var e=this;this.query.length>3&&(clearTimeout(this.typeAheadTimer),this.typeAheadTimer=setTimeout((function(){l["a"].searchPodcasts(e.query).then((function(t){e.searchResults=t.results}))}),700))},podcastSelected:function(e){this.feedUrl=e.feedUrl,this.selectedPodcast=e},saveEntry:function(){this.$emit("submit",{entryType:"podcast",details:{feedUrl:this.feedUrl}})}}},i=n,c=(s("3b96"),s("2877")),o=Object(c["a"])(i,a,r,!1,null,"4d5b184c",null);t["default"]=o.exports}}]);
//# sourceMappingURL=chunk-4ae01715.8d53ca22.js.map
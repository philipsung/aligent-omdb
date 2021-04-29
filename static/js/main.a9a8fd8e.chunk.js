(this.webpackJsonpaligent=this.webpackJsonpaligent||[]).push([[0],{12:function(e,t,c){},13:function(e,t,c){},17:function(e,t,c){"use strict";c.r(t);var s=c(1),n=c.n(s),i=c(6),r=c.n(i),a=(c(12),c(13),c(3)),o=c.n(a),l=c(4),u=c(2),j=c(7),d=c(0);function b(e){return e.movieDetails.Ratings?Object(d.jsx)("div",{id:"focused-movie--ratings",children:e.movieDetails.Ratings.map((function(e){return Object(d.jsxs)("div",{className:"rating",children:[Object(d.jsx)("p",{children:e.Value}),Object(d.jsx)("p",{children:e.Source})]})}))}):Object(d.jsx)("div",{children:Object(d.jsx)("p",{children:"Ratings not found for IMDb, Rotten Tomatoes, or Metacritic."})})}function m(e){var t=Object(s.useState)(),c=Object(u.a)(t,2),n=c[0],i=c[1],r=Object(s.useState)(),a=Object(u.a)(r,2),o=a[0],l=a[1],j=Object(s.useState)(!1),b=Object(u.a)(j,2),m=b[0],h=b[1];return Object(s.useEffect)((function(){if(!m){var e=localStorage.getItem("watchlist");h(!0),i(null!==e&&"undefined"!==e?function(e){var t=JSON.parse(e),c=[];for(var s in t)c.push(t[s]);return c}(localStorage.getItem("watchlist")):[])}}),[n,e.movieDetails]),Object(s.useEffect)((function(){n&&(void 0===n.find((function(t){return t.imdbID===e.movieDetails.imdbID}))?l(!1):l(!0));try{localStorage.setItem("watchlist",JSON.stringify(n))}catch(t){console.error(t)}}),[n,e.movieDetails]),Object(d.jsxs)("div",{id:"watchlist-buttons",children:[Object(d.jsxs)("button",{className:"watchlist-button",onClick:function(){console.log(n)},children:[Object(d.jsx)("i",{className:"far fa-bookmark"})," View"]}),o?Object(d.jsxs)("button",{className:"watchlist-button",onClick:function(t){i(n.filter((function(t){return t.imdbID!==e.movieDetails.imdbID})))},children:[Object(d.jsx)("i",{className:"far fa-bookmark"})," Remove"]}):Object(d.jsxs)("button",{className:"watchlist-button",onClick:function(){var t={Title:e.movieDetails.Title,imdbID:e.movieDetails.imdbID,Rated:e.movieDetails.Rated,Year:e.movieDetails.Year,Genre:e.movieDetails.Genre,Runtime:e.movieDetails.Runtime};i(n.concat(t))},children:[Object(d.jsx)("i",{className:"fas fa-plus"})," Add"]})]})}function h(e){var t=Object(s.useState)({}),c=Object(u.a)(t,2),n=c[0],i=c[1];return Object(s.useEffect)((function(){function t(){return(t=Object(l.a)(o.a.mark((function t(){var c,s,n;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(""===e.imdbID){t.next=15;break}return t.prev=1,c="http://www.omdbapi.com/?apikey=19bc8d19&i=".concat(e.imdbID),t.next=5,fetch(c);case 5:return s=t.sent,t.next=8,s.json();case 8:n=t.sent,i(Object(j.a)({},n)),t.next=15;break;case 12:t.prev=12,t.t0=t.catch(1),console.error(t.t0);case 15:case"end":return t.stop()}}),t,null,[[1,12]])})))).apply(this,arguments)}!function(){t.apply(this,arguments)}()}),[e.imdbID]),""!==e.imdbID?Object(d.jsxs)("div",{id:"focused-movie",children:[Object(d.jsxs)("div",{id:"focused-movie-top",children:[Object(d.jsx)("div",{id:"focused-movie--poster",children:Object(d.jsx)("img",{src:n.Poster,alt:n.Title+" Poster"})}),Object(d.jsx)("div",{id:"focused-movie--details",children:Object(d.jsxs)("div",{id:"position",children:[Object(d.jsx)("h1",{children:n.Title}),Object(d.jsxs)("p",{children:[Object(d.jsx)("span",{id:"focused-movie--rated",children:n.Rated}),Object(d.jsxs)("span",{children:[n.Year," \xb7 ",n.Genre," \xb7 ",n.Runtime]})]}),Object(d.jsxs)("p",{children:[Object(d.jsx)("strong",{children:"Stars:"})," ",n.Actors]}),Object(d.jsxs)("p",{children:[Object(d.jsx)("strong",{children:"Director:"})," ",n.Director]}),Object(d.jsxs)("p",{children:[Object(d.jsx)("strong",{children:"Production:"})," ",n.Production]}),Object(d.jsxs)("p",{children:[Object(d.jsx)("strong",{children:"Gross USA:"})," ",n.BoxOffice]}),Object(d.jsx)("p",{children:n.Awards})]})})]}),Object(d.jsx)("hr",{}),Object(d.jsx)("div",{id:"focused-movie--plot",children:Object(d.jsx)("p",{children:n.Plot})}),Object(d.jsx)("hr",{}),Object(d.jsx)(b,{movieDetails:n}),Object(d.jsx)(m,{movieDetails:n})]}):Object(d.jsx)("div",{children:"Search guide:"})}function O(e){var t=e.focus===e.movie.imdbID?"movieCard activeCard":"movieCard";return Object(d.jsxs)("div",{className:t,onClick:function(){return e.changeFocus(e.movie.imdbID)},children:[Object(d.jsx)("div",{className:"movieCard--poster",children:e.movie.Poster?Object(d.jsx)("img",{src:e.movie.Poster,alt:e.movie.Title+" poster"}):null}),Object(d.jsxs)("div",{className:"movieCard--details",children:[Object(d.jsx)("h3",{className:"movieCard--title",children:e.movie.Title}),Object(d.jsx)("p",{children:e.movie.Year})]})]},e.movie.imdbID)}function p(e){var t=Object(s.useRef)(),c=Object(s.useCallback)((function(c){t.current&&t.current.disconnect(),t.current=new IntersectionObserver((function(t){t[0].isIntersecting&&e.nextPage<e.pageLimit&&e.getNextPage()})),c&&t.current.observe(c)}),[e.pageLimit,e.nextPage]);return e.movies&&e.movies.length>0?Object(d.jsxs)("div",{id:"search-results-list",children:[Object(d.jsx)("div",{id:"search-results--counter",children:Object(d.jsxs)("p",{children:[e.movies.length," ",e.resultCount?Object(d.jsxs)("span",{children:[" / ",e.resultCount]}):null,"  RESULTS"]})}),e.movies.map((function(t){return Object(d.jsx)(O,{movie:t,focus:e.focus,changeFocus:e.changeFocus})})),Object(d.jsx)("div",{id:"search-results--bottom",ref:c})]}):Object(d.jsx)("div",{id:"search-results-list"})}function x(e){var t=Object(s.useState)(""),c=Object(u.a)(t,2),n=c[0],i=c[1];return Object(d.jsxs)("div",{id:"search-results",children:[Object(d.jsx)(p,{pageLimit:e.pageLimit,nextPage:e.nextPage,focus:n,resultCount:e.resultCount,movies:e.movies,getNextPage:e.getNextPage,changeFocus:function(e){i(e)}}),Object(d.jsx)("div",{id:"search-results-details",children:Object(d.jsx)(h,{imdbID:n})})]})}c(16);function f(){var e=Object(s.useState)(""),t=Object(u.a)(e,2),c=t[0],n=t[1],i=Object(s.useState)(""),r=Object(u.a)(i,2),a=r[0],j=r[1],b=Object(s.useState)(""),m=Object(u.a)(b,2),h=m[0],O=m[1],p=Object(s.useState)(""),f=Object(u.a)(p,2),v=f[0],g=f[1],y=(new Date).getFullYear(),S=Object(s.useState)([]),D=Object(u.a)(S,2),w=D[0],N=D[1],k=Object(s.useState)(1),C=Object(u.a)(k,2),I=C[0],P=C[1],R=Object(s.useState)(1),F=Object(u.a)(R,2),T=F[0],E=F[1],A=Object(s.useState)(-1),L=Object(u.a)(A,2),q=L[0],Y=L[1],M=Object(s.useState)(""),G=Object(u.a)(M,2),J=G[0],B=G[1];function U(e){if(e)return Array.from(new Set(e.map((function(e){return e.imdbID})))).map((function(t){return e.find((function(e){return e.imdbID===t}))}))}var V=function(){var e=Object(l.a)(o.a.mark((function e(t){var s,n,i;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),B(""),N([]),E(1),s={},e.prev=5,n="episode"===a?"https://www.omdbapi.com/?apikey=19bc8d19&t=".concat(c,"&season=").concat(v):"https://www.omdbapi.com/?apikey=19bc8d19&s=".concat(c,"&y=").concat(h,"&type=").concat(a,"&page=1"),e.next=9,fetch(n);case 9:return i=e.sent,e.next=12,i.json();case 12:s=e.sent,e.next=18;break;case 15:e.prev=15,e.t0=e.catch(5),console.error(e.t0);case 18:if("False"!==s.Response){e.next=23;break}return B("failed"),e.abrupt("return");case 23:Y(s.totalResults),E(Math.ceil(s.totalResults/10)),N(U("episode"===a?s.Episodes:s.Search)),P(2);case 27:case"end":return e.stop()}}),e,null,[[5,15]])})));return function(t){return e.apply(this,arguments)}}(),z=function(){var e=Object(l.a)(o.a.mark((function e(t){var s,n,i;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(s={},!(I>T)){e.next=3;break}return e.abrupt("return");case 3:return e.prev=3,n="https://www.omdbapi.com/?apikey=19bc8d19&s=".concat(c,"&y=").concat(h,"&type=").concat(a,"&page=").concat(I),e.next=7,fetch(n);case 7:return i=e.sent,e.next=10,i.json();case 10:s=e.sent,N(U(w.concat(s.Search))),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(3),console.error(e.t0);case 17:P(I+1);case 18:case"end":return e.stop()}}),e,null,[[3,14]])})));return function(t){return e.apply(this,arguments)}}();return Object(d.jsxs)(d.Fragment,{children:[Object(d.jsxs)("form",{className:"form",onSubmit:V,children:[Object(d.jsxs)("div",{id:"form-text",children:[Object(d.jsx)("label",{className:"search-label",htmlFor:"year",children:Object(d.jsx)("i",{className:"fas fa-search"})}),Object(d.jsx)("input",{className:"text-input",type:"text",name:"year",placeholder:"E.g. Parasite",onChange:function(e){return n(e.target.value)}})]}),Object(d.jsxs)("div",{id:"form-parameters",children:[Object(d.jsx)("div",{id:"form-parameters-left",children:"episode"!==a?Object(d.jsxs)(d.Fragment,{children:[" ",Object(d.jsx)("label",{className:"label-filter",htmlFor:"queryYear",children:"YEAR"}),Object(d.jsx)("input",{className:"year-input",type:"number",name:"queryYear",min:"1880",max:y,maxLength:"4",value:h,onChange:function(e){return O(e.target.value)}})]}):null}),Object(d.jsxs)("div",{id:"form-parameters-right",onChange:function(e){return j(e.target.value)},children:[Object(d.jsx)("label",{className:"label-filter",htmlFor:"queryType",children:"TYPE"}),Object(d.jsx)("input",{type:"radio",value:"",name:"queryType",defaultChecked:!0}),"Any",Object(d.jsx)("input",{type:"radio",value:"movie",name:"queryType"}),"Movies",Object(d.jsx)("input",{type:"radio",value:"series",name:"queryType"}),"Series",Object(d.jsx)("input",{type:"radio",value:"episode",name:"queryType"}),"Episodes"]}),"episode"===a?Object(d.jsxs)("div",{id:"season-input",children:[Object(d.jsx)("label",{className:"label-filter",htmlFor:"querySeason",children:"SEASON"}),Object(d.jsx)("input",{className:"form-season",type:"number",name:"querySeason",min:"1",maxLength:"3",value:v,onChange:function(e){return g(e.target.value)}})]}):null]}),Object(d.jsx)("input",{type:"submit",id:"form--submit"})]}),Object(d.jsx)(x,{pageLimit:T,nextPage:I,resultCount:q,movies:w,getNextPage:z}),"failed"===J?Object(d.jsx)("div",{id:"search-state",children:Object(d.jsx)("p",{children:"Search failed"})}):null]})}var v=function(){return Object(d.jsxs)("div",{className:"App",children:[Object(d.jsx)("header",{className:"App-header"}),Object(d.jsx)(f,{})]})},g=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,18)).then((function(t){var c=t.getCLS,s=t.getFID,n=t.getFCP,i=t.getLCP,r=t.getTTFB;c(e),s(e),n(e),i(e),r(e)}))};r.a.render(Object(d.jsx)(n.a.StrictMode,{children:Object(d.jsx)(v,{})}),document.getElementById("root")),g()}},[[17,1,2]]]);
//# sourceMappingURL=main.a9a8fd8e.chunk.js.map
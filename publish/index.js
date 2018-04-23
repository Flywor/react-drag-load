!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("prop-types"),require("react")):"function"==typeof define&&define.amd?define(["prop-types","react"],t):"object"==typeof exports?exports.index=t(require("prop-types"),require("react")):e.index=t(e.PropTypes,e.React)}(this,function(e,t){return function(e){function t(r){if(n[r])return n[r].exports;var a=n[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=3)}([function(e,t){},function(t,n){t.exports=e},function(e,n){e.exports=t},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(2),c=r(l),h=n(1),f=r(h);n(0);var u=function(e){function t(){var e,n,r,i;a(this,t);for(var o=arguments.length,l=Array(o),c=0;c<o;c++)l[c]=arguments[c];return n=r=s(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(l))),r.maxOver=50,r.scrollRate=.3,r.tStart=0,r.loadFlag=!1,r.refreshFlag=!1,r.nextFlag=!1,r.scrollFlag=!1,r.isTop=!1,r.haveData=!0,r.dataLength=0,r.hasNext=!0,i=n,s(r,i)}return i(t,e),o(t,[{key:"componentDidMount",value:function(){var e=this.drag,t=this.child,n=this.start,r=this.move,a=this.end,s=this.scroll;e.addEventListener("touchstart",n.bind(this),{passive:!1}),e.addEventListener("touchmove",r.bind(this),{passive:!1}),e.addEventListener("touchend",a.bind(this),{passive:!1}),t.addEventListener("scroll",s.bind(this),{passive:!1})}},{key:"scroll",value:function(){this.scrollFlag=!1}},{key:"start",value:function(e){var t=this.loadFlag,n=this.refreshIcon,r=this.loadNextIcon,a=this.drag,s=(this.tStart,this.child);t||((0===s.scrollTop||s.scrollHeight-s.offsetHeight<s.scrollTop+5)&&(this.scrollFlag=!0),n.className="",r.className="",this.tStart=e.touches[0].clientY,this.changeTransition(a,"none"))}},{key:"move",value:function(e){var t=this.loadFlag,n=this.maxOver,r=this.scrollRate,a=this.tStart,s=this.scrollFlag,i=this.hasNext,o=this.drag,l=this.child,c=this.refreshIcon,h=this.refreshTxt,f=this.loadNextIcon,u=this.loadNextTxt;if(!t&&this.haveData){var d=(a-e.touches[0].clientY)*r;0===l.scrollTop&&s?d<0?(e.preventDefault(),n<Math.abs(d)?(this.refreshFlag=!0,this.changeDeg(c,180),h.innerText="释放更新"):(this.refreshFlag=!1,this.changeDeg(c,0),h.innerText="下拉刷新"),this.changeY(o,""+Math.abs(d))):this.refreshFlag=!1:l.scrollHeight-l.offsetHeight<l.scrollTop+5&&s?d>0?(e.preventDefault(),i?n<Math.abs(d)?(this.nextFlag=!0,this.changeDeg(f,180),u.innerText="释放加载"):(this.nextFlag=!1,this.changeDeg(f,0),u.innerText="上拉加载"):(this.nextFlag=!1,u.innerText="已加载全部",f.className="nomore"),this.changeY(o,"-"+d)):this.nextFlag=!1:(this.refreshFlag=!1,this.nextFlag=!1)}}},{key:"end",value:function(e){var t=this.maxOver,n=this.loadFlag,r=this.refreshFlag,a=this.nextFlag,s=this.drag,i=this.refreshIcon,o=this.refreshTxt,l=this.loadNextIcon,c=this.loadNextTxt,h=this.props,f=h.refresh,u=h.loadNext;if(n)return void e.preventDefault();this.changeTransition(s,"330ms"),r&&"function"==typeof f?(this.refreshFlag=!1,this.changeY(s,""+t),this.doDragEnd(i,o,f,0)):a&&"function"==typeof u?(this.nextFlag=!1,this.changeY(s,"-"+t),this.doDragEnd(l,c,u,1)):this.changeY(s,0)}},{key:"doDragEnd",value:function(e,t,n,r){var a=this,s=this.drag;this.loadFlag=!0,e.className="loading",this.changeDeg(e,0),t.innerText="加载中",n().then(function(n){if(e.className="success",t.innerText="加载成功",1==r){a.changeY(s,0),a.loadFlag=!1;var i=a.props.children.props.children.length;return a.hasNext=i!==a.dataLength,void(a.hasNext&&(a.dataLength=i))}a.hasNext=!0,a.dataLength=0}).catch(function(n){e.className="error",t.innerText="加载失败"}).then(function(e){setTimeout(function(){a.changeY(s,0),setTimeout(function(){a.changeTransition(s,"none"),a.loadFlag=!1},330)},1e3)})}},{key:"changeY",value:function(e,t){var n="translate3d(0, "+t+"px, 0)";this.doTransform(e,n)}},{key:"changeDeg",value:function(e,t){var n="rotate("+t+"deg)";this.doTransform(e,n)}},{key:"doTransform",value:function(e,t){e.style.webkitTransform=t,e.style.MozTransform=t,e.style.msTransform=t,e.style.OTransform=t,e.style.transform=t}},{key:"changeTransition",value:function(e,t){e.style.webkitTransition=t,e.style.MozTransition=t,e.style.msTransition=t,e.style.OTransition=t,e.style.transition=t}},{key:"render",value:function(){var e=this,t=this.props,n=t.refresh,r=t.loadNext,a=t.children,s=a.props?a.props.children.length:a.length;return this.haveData=s>0,c.default.createElement("div",{className:"index__dragload___2XCbu"},c.default.createElement("div",{ref:function(t){e.drag=t},className:"index__drag___3PHTT"},c.default.createElement("div",{className:"index__refresh___2CKLL",style:{display:"function"==typeof n?"flex":"none"}},c.default.createElement("div",null,c.default.createElement("span",{ref:function(t){e.refreshIcon=t}}),c.default.createElement("label",{ref:function(t){e.refreshTxt=t}}))),c.default.createElement("div",{className:"index__items___3R1zt",ref:function(t){e.child=t}},this.haveData?a:c.default.createElement("div",{className:"index__noData___O3ESL"},"没有数据哦")),c.default.createElement("div",{className:"index__loadNext___2C7KC",style:{display:"function"==typeof r?"flex":"none"}},c.default.createElement("div",null,c.default.createElement("span",{ref:function(t){e.loadNextIcon=t}}),c.default.createElement("label",{ref:function(t){e.loadNextTxt=t}})))))}}]),t}(l.Component);u.propTypes={refresh:f.default.func,loadNext:f.default.func},u.defaultProps={refresh:void 0,loadNext:void 0},t.default=u}])});
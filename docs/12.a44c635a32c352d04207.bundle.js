(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{186:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var three__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(360),stats_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(361);__webpack_exports__.default=function(){var VIEWPORT_W=window.innerWidth,VIEWPORT_H=window.innerHeight,scene=new three__WEBPACK_IMPORTED_MODULE_0__.Scene,camera=new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(45,VIEWPORT_W/VIEWPORT_H,.1,1e3);camera.position.x=20,camera.position.y=0,camera.position.z=150;var renderer=new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer;renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_0__.Color(0)),renderer.setSize(VIEWPORT_W,VIEWPORT_H);var getTexture=function(){var canvasEl=document.createElement("canvas");canvasEl.width=32,canvasEl.height=32;var ctx=canvasEl.getContext("2d");ctx.translate(-81,-84),ctx.fillStyle="orange",ctx.beginPath(),ctx.moveTo(83,116),ctx.lineTo(83,102),ctx.bezierCurveTo(83,94,89,88,97,88),ctx.bezierCurveTo(105,88,111,94,111,102),ctx.lineTo(111,116),ctx.lineTo(106.333,111.333),ctx.lineTo(101.666,116),ctx.lineTo(97,111.333),ctx.lineTo(92.333,116),ctx.lineTo(87.666,111.333),ctx.lineTo(83,116),ctx.fill(),ctx.fillStyle="white",ctx.beginPath(),ctx.moveTo(91,96),ctx.bezierCurveTo(88,96,87,99,87,101),ctx.bezierCurveTo(87,103,88,106,91,106),ctx.bezierCurveTo(94,106,95,103,95,101),ctx.bezierCurveTo(95,99,94,96,91,96),ctx.moveTo(103,96),ctx.bezierCurveTo(100,96,99,99,99,101),ctx.bezierCurveTo(99,103,100,106,103,106),ctx.bezierCurveTo(106,106,107,103,107,101),ctx.bezierCurveTo(107,99,106,96,103,96),ctx.fill(),ctx.fillStyle="blue",ctx.beginPath(),ctx.arc(101,102,2,0,2*Math.PI,!0),ctx.fill(),ctx.beginPath(),ctx.arc(89,102,2,0,2*Math.PI,!0),ctx.fill();var texture=new three__WEBPACK_IMPORTED_MODULE_0__.CanvasTexture(canvasEl);return texture.needsUpdate=!0,texture};document.getElementById("WebGL-output").appendChild(renderer.domElement);var statsObj,stats=((statsObj=new stats_js__WEBPACK_IMPORTED_MODULE_1__).showPanel(0),statsObj.dom.style.position="absolute",statsObj.dom.style.left="0px",statsObj.dom.style.top="0px",document.getElementById("Stats-output").appendChild(statsObj.dom),statsObj),renderScene=function(){stats.update(),requestAnimationFrame(renderScene),renderer.render(scene,camera)};!function(){for(var material=new three__WEBPACK_IMPORTED_MODULE_0__.SpriteMaterial({map:getTexture(),color:16777215}),i=0;i<1500;i++){var sprite=new three__WEBPACK_IMPORTED_MODULE_0__.Sprite(material);sprite.position.set(500*Math.random()-250,500*Math.random()-250,500*Math.random()-250),sprite.scale.set(4,4,4),scene.add(sprite)}}(),renderScene()}},361:function(module,exports,__webpack_require__){var f;module.exports=((f=function(){function e(a){return c.appendChild(a.dom),a}function u(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",c.addEventListener("click",function(a){a.preventDefault(),u(++l%c.children.length)},!1);var k=(performance||Date).now(),g=k,a=0,r=e(new f.Panel("FPS","#0ff","#002")),h=e(new f.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var t=e(new f.Panel("MB","#f08","#201"));return u(0),{REVISION:16,dom:c,addPanel:e,showPanel:u,begin:function(){k=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();if(h.update(c-k,200),c>g+1e3&&(r.update(1e3*a/(c-g),100),g=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){k=this.end()},domElement:c,setMode:u}}).Panel=function(e,f,l){var c=1/0,k=0,g=Math.round,a=g(window.devicePixelRatio||1),r=80*a,h=48*a,t=3*a,v=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r,q.height=h,q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");return b.font="bold "+9*a+"px Helvetica,Arial,sans-serif",b.textBaseline="top",b.fillStyle=l,b.fillRect(0,0,r,h),b.fillStyle=f,b.fillText(e,t,v),b.fillRect(d,m,n,p),b.fillStyle=l,b.globalAlpha=.9,b.fillRect(d,m,n,p),{dom:q,update:function(h,w){c=Math.min(c,h),k=Math.max(k,h),b.fillStyle=l,b.globalAlpha=1,b.fillRect(0,0,r,m),b.fillStyle=f,b.fillText(g(h)+" "+e+" ("+g(c)+"-"+g(k)+")",t,v),b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p),b.fillRect(d+n-a,m,a,p),b.fillStyle=l,b.globalAlpha=.9,b.fillRect(d+n-a,m,a,g((1-h/w)*p))}}},f)}}]);
//# sourceMappingURL=12.a44c635a32c352d04207.bundle.js.map
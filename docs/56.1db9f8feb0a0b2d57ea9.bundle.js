(window.webpackJsonp=window.webpackJsonp||[]).push([[56],{269:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var three__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(698),stats_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(699),dat_gui__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(700);__webpack_exports__.default=function(){var VIEWPORT_W=window.innerWidth,VIEWPORT_H=window.innerHeight,scene=new three__WEBPACK_IMPORTED_MODULE_0__.Scene,camera=new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(45,window.innerWidth/window.innerHeight,.1,1e3);camera.position.set(0,12,20),camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0,0,0));var ambiLight=new three__WEBPACK_IMPORTED_MODULE_0__.AmbientLight(1315860);scene.add(ambiLight);var light=new three__WEBPACK_IMPORTED_MODULE_0__.DirectionalLight;light.position.set(0,30,20),scene.add(light);var renderer=new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer;renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_0__.Color(15658734)),renderer.setSize(VIEWPORT_W,VIEWPORT_H),renderer.shadowMap.enabled=!0,document.getElementById("WebGL-output").appendChild(renderer.domElement);var createMesh=function(geom,texFile){var texture=(new three__WEBPACK_IMPORTED_MODULE_0__.TextureLoader).load("./assets/tex/"+texFile);texture.wrapS=three__WEBPACK_IMPORTED_MODULE_0__.RepeatWrapping,texture.wrapT=three__WEBPACK_IMPORTED_MODULE_0__.RepeatWrapping,geom.computeVertexNormals();var mat=new three__WEBPACK_IMPORTED_MODULE_0__.MeshPhongMaterial;return mat.map=texture,new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(geom,mat)},sphere=createMesh(new three__WEBPACK_IMPORTED_MODULE_0__.SphereGeometry(5,20,20),"floor-wood.jpg");scene.add(sphere),sphere.position.x=7;var cube=createMesh(new three__WEBPACK_IMPORTED_MODULE_0__.BoxGeometry(6,6,6),"brick-wall.jpg");cube.position.x=-7,scene.add(cube);var controls={repeatX:1,repeatY:1,repeatWrapping:!0,wrapping:"repeat",updateRepeat:function(){var wrapping;cube.material.map.repeat.set(controls.repeatX,controls.repeatY),sphere.material.map.repeat.set(controls.repeatX,controls.repeatY),"repeat"===controls.wrapping?wrapping=three__WEBPACK_IMPORTED_MODULE_0__.RepeatWrapping:"mirrored repeat"===controls.wrapping?wrapping=three__WEBPACK_IMPORTED_MODULE_0__.MirroredRepeatWrapping:"clamp to edge"===controls.wrapping&&(wrapping=three__WEBPACK_IMPORTED_MODULE_0__.ClampToEdgeWrapping),cube.material.map.wrapS=wrapping,cube.material.map.wrapT=wrapping,sphere.material.map.wrapS=wrapping,sphere.material.map.wrapT=wrapping,cube.material.map.needsUpdate=!0,sphere.material.map.needsUpdate=!0}},gui=new dat_gui__WEBPACK_IMPORTED_MODULE_2__.a;gui.add(controls,"repeatX",-4,4).onChange(controls.updateRepeat),gui.add(controls,"repeatY",-4,4).onChange(controls.updateRepeat),gui.add(controls,"wrapping",["repeat","mirrored repeat","clamp to edge"]).onChange(controls.updateRepeat);var statsObj,stats=((statsObj=new stats_js__WEBPACK_IMPORTED_MODULE_1__).showPanel(0),statsObj.dom.style.position="absolute",statsObj.dom.style.left="0px",statsObj.dom.style.top="0px",document.getElementById("Stats-output").appendChild(statsObj.dom),statsObj);window.addEventListener("resize",(function(){camera.aspect=window.innerWidth/window.innerHeight,camera.updateProjectionMatrix(),renderer.setSize(window.innerWidth,window.innerHeight)}),!1);var step=0,renderScene=function(){stats.update(),step+=.01,cube.rotation.y=step,cube.rotation.x=step,sphere.rotation.y=step,sphere.rotation.x=step,requestAnimationFrame(renderScene),renderer.render(scene,camera)};renderScene()}},699:function(module,exports,__webpack_require__){var f;module.exports=((f=function(){function e(a){return c.appendChild(a.dom),a}function u(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",c.addEventListener("click",(function(a){a.preventDefault(),u(++l%c.children.length)}),!1);var k=(performance||Date).now(),g=k,a=0,r=e(new f.Panel("FPS","#0ff","#002")),h=e(new f.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var t=e(new f.Panel("MB","#f08","#201"));return u(0),{REVISION:16,dom:c,addPanel:e,showPanel:u,begin:function(){k=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();if(h.update(c-k,200),c>g+1e3&&(r.update(1e3*a/(c-g),100),g=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){k=this.end()},domElement:c,setMode:u}}).Panel=function(e,f,l){var c=1/0,k=0,g=Math.round,a=g(window.devicePixelRatio||1),r=80*a,h=48*a,t=3*a,v=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r,q.height=h,q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");return b.font="bold "+9*a+"px Helvetica,Arial,sans-serif",b.textBaseline="top",b.fillStyle=l,b.fillRect(0,0,r,h),b.fillStyle=f,b.fillText(e,t,v),b.fillRect(d,m,n,p),b.fillStyle=l,b.globalAlpha=.9,b.fillRect(d,m,n,p),{dom:q,update:function(h,w){c=Math.min(c,h),k=Math.max(k,h),b.fillStyle=l,b.globalAlpha=1,b.fillRect(0,0,r,m),b.fillStyle=f,b.fillText(g(h)+" "+e+" ("+g(c)+"-"+g(k)+")",t,v),b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p),b.fillRect(d+n-a,m,a,p),b.fillStyle=l,b.globalAlpha=.9,b.fillRect(d+n-a,m,a,g((1-h/w)*p))}}},f)}}]);
//# sourceMappingURL=56.1db9f8feb0a0b2d57ea9.bundle.js.map
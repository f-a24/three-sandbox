(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{252:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var three__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(598),stats_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(597),dat_gui__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(599),_node_modules_three_examples_jsm_utils_SceneUtils__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(600);__webpack_exports__.default=function(){var VIEWPORT_W=window.innerWidth,VIEWPORT_H=window.innerHeight,scene=new three__WEBPACK_IMPORTED_MODULE_0__.Scene,camera=new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(45,VIEWPORT_W/VIEWPORT_H,.1,1e3);camera.position.x=-20,camera.position.y=30,camera.position.z=40,camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(10,0,0));var renderer=new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer;renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_0__.Color(15658734)),renderer.setSize(VIEWPORT_W,VIEWPORT_H),renderer.shadowMap.enabled=!0;var createMesh=function(geom){var meshMaterial=new three__WEBPACK_IMPORTED_MODULE_0__.MeshNormalMaterial;meshMaterial.side=three__WEBPACK_IMPORTED_MODULE_0__.DoubleSide;var wireFrameMat=new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial;return wireFrameMat.wireframe=!0,_node_modules_three_examples_jsm_utils_SceneUtils__WEBPACK_IMPORTED_MODULE_3__.a.createMultiMaterialObject(geom,[meshMaterial,wireFrameMat])},circle=createMesh(new three__WEBPACK_IMPORTED_MODULE_0__.CircleGeometry(4,10,.3*Math.PI*2,.3*Math.PI*2));scene.add(circle);var spotLight=new three__WEBPACK_IMPORTED_MODULE_0__.SpotLight(16777215);spotLight.position.set(-40,60,-10),scene.add(spotLight),document.getElementById("WebGL-output").appendChild(renderer.domElement);var statsObj,stats=((statsObj=new stats_js__WEBPACK_IMPORTED_MODULE_1__).showPanel(0),statsObj.dom.style.position="absolute",statsObj.dom.style.left="0px",statsObj.dom.style.top="0px",document.getElementById("Stats-output").appendChild(statsObj.dom),statsObj),controls={radius:4,thetaStart:.3*Math.PI*2,thetaLength:.3*Math.PI*2,segments:10,redraw:function(){scene.remove(circle),circle=createMesh(new three__WEBPACK_IMPORTED_MODULE_0__.CircleGeometry(controls.radius,controls.segments,controls.thetaStart,controls.thetaLength)),scene.add(circle)}},gui=new dat_gui__WEBPACK_IMPORTED_MODULE_2__.a;gui.add(controls,"radius",0,40).onChange(controls.redraw),gui.add(controls,"segments",0,40).onChange(controls.redraw),gui.add(controls,"thetaStart",0,2*Math.PI).onChange(controls.redraw),gui.add(controls,"thetaLength",0,2*Math.PI).onChange(controls.redraw),window.addEventListener("resize",(function(){camera.aspect=window.innerWidth/window.innerHeight,camera.updateProjectionMatrix(),renderer.setSize(window.innerWidth,window.innerHeight)}),!1);var step=0,renderScene=function(){stats.update(),circle.rotation.y=step+=.01,requestAnimationFrame(renderScene),renderer.render(scene,camera)};renderScene()}},597:function(module,exports,__webpack_require__){var f;module.exports=((f=function(){function e(a){return c.appendChild(a.dom),a}function u(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",c.addEventListener("click",(function(a){a.preventDefault(),u(++l%c.children.length)}),!1);var k=(performance||Date).now(),g=k,a=0,r=e(new f.Panel("FPS","#0ff","#002")),h=e(new f.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var t=e(new f.Panel("MB","#f08","#201"));return u(0),{REVISION:16,dom:c,addPanel:e,showPanel:u,begin:function(){k=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();if(h.update(c-k,200),c>g+1e3&&(r.update(1e3*a/(c-g),100),g=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){k=this.end()},domElement:c,setMode:u}}).Panel=function(e,f,l){var c=1/0,k=0,g=Math.round,a=g(window.devicePixelRatio||1),r=80*a,h=48*a,t=3*a,v=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r,q.height=h,q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");return b.font="bold "+9*a+"px Helvetica,Arial,sans-serif",b.textBaseline="top",b.fillStyle=l,b.fillRect(0,0,r,h),b.fillStyle=f,b.fillText(e,t,v),b.fillRect(d,m,n,p),b.fillStyle=l,b.globalAlpha=.9,b.fillRect(d,m,n,p),{dom:q,update:function(h,w){c=Math.min(c,h),k=Math.max(k,h),b.fillStyle=l,b.globalAlpha=1,b.fillRect(0,0,r,m),b.fillStyle=f,b.fillText(g(h)+" "+e+" ("+g(c)+"-"+g(k)+")",t,v),b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p),b.fillRect(d+n-a,m,a,p),b.fillStyle=l,b.globalAlpha=.9,b.fillRect(d+n-a,m,a,g((1-h/w)*p))}}},f)},600:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return SceneUtils}));var _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(598),SceneUtils={createMultiMaterialObject:function(geometry,materials){for(var group=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Group,i=0,l=materials.length;i<l;i++)group.add(new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Mesh(geometry,materials[i]));return group},detach:function(child,parent,scene){console.warn("THREE.SceneUtils: detach() has been deprecated. Use scene.attach( child ) instead."),scene.attach(child)},attach:function(child,scene,parent){console.warn("THREE.SceneUtils: attach() has been deprecated. Use parent.attach( child ) instead."),parent.attach(child)}}}}]);
//# sourceMappingURL=24.53f8f83f2eec7c90b531.bundle.js.map
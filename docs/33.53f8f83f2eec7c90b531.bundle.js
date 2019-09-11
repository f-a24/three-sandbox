(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{262:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var three__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(598),stats_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(597),dat_gui__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(599),_node_modules_three_examples_jsm_utils_SceneUtils__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(600);__webpack_exports__.default=function(){var VIEWPORT_W=window.innerWidth,VIEWPORT_H=window.innerHeight,scene=new three__WEBPACK_IMPORTED_MODULE_0__.Scene,camera=new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(45,VIEWPORT_W/VIEWPORT_H,.1,1e3);camera.position.x=-20,camera.position.y=60,camera.position.z=60,camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(20,20,0));var renderer=new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer;renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_0__.Color(15658734)),renderer.setSize(VIEWPORT_W,VIEWPORT_H),renderer.shadowMap.enabled=!0;var drawShape=function(){var shape=new three__WEBPACK_IMPORTED_MODULE_0__.Shape;shape.moveTo(10,10),shape.lineTo(10,40),shape.bezierCurveTo(15,25,25,25,30,40),shape.splineThru([new three__WEBPACK_IMPORTED_MODULE_0__.Vector2(32,30),new three__WEBPACK_IMPORTED_MODULE_0__.Vector2(28,20),new three__WEBPACK_IMPORTED_MODULE_0__.Vector2(30,10)]),shape.quadraticCurveTo(20,15,10,10);var hole1=new three__WEBPACK_IMPORTED_MODULE_0__.Path;hole1.absellipse(16,24,2,3,0,2*Math.PI,!0,0),shape.holes.push(hole1);var hole2=new three__WEBPACK_IMPORTED_MODULE_0__.Path;hole2.absellipse(23,24,2,3,0,2*Math.PI,!0,0),shape.holes.push(hole2);var hole3=new three__WEBPACK_IMPORTED_MODULE_0__.Path;return hole3.absarc(20,16,2,0,Math.PI,!0),shape.holes.push(hole3),shape},createMesh=function(geom){geom.applyMatrix((new three__WEBPACK_IMPORTED_MODULE_0__.Matrix4).makeTranslation(-20,0,0));var meshMaterial=new three__WEBPACK_IMPORTED_MODULE_0__.MeshNormalMaterial({transparent:!0,opacity:.7}),wireFrameMat=new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial;return wireFrameMat.wireframe=!0,_node_modules_three_examples_jsm_utils_SceneUtils__WEBPACK_IMPORTED_MODULE_3__.a.createMultiMaterialObject(geom,[meshMaterial,wireFrameMat])},shape=createMesh(new three__WEBPACK_IMPORTED_MODULE_0__.ShapeGeometry(drawShape()));scene.add(shape),document.getElementById("WebGL-output").appendChild(renderer.domElement);var statsObj,stats=((statsObj=new stats_js__WEBPACK_IMPORTED_MODULE_1__).showPanel(0),statsObj.dom.style.position="absolute",statsObj.dom.style.left="0px",statsObj.dom.style.top="0px",document.getElementById("Stats-output").appendChild(statsObj.dom),statsObj),controls={amount:2,bevelThickness:2,bevelSize:.5,bevelEnabled:!0,bevelSegments:3,curveSegments:12,steps:1,asGeom:function(){scene.remove(shape);var options={amount:controls.amount,bevelThickness:controls.bevelThickness,bevelSize:controls.bevelSize,bevelSegments:controls.bevelSegments,bevelEnabled:controls.bevelEnabled,curveSegments:controls.curveSegments,steps:controls.steps};shape=createMesh(new three__WEBPACK_IMPORTED_MODULE_0__.ExtrudeGeometry(drawShape(),options)),scene.add(shape)}},gui=new dat_gui__WEBPACK_IMPORTED_MODULE_2__.a;gui.add(controls,"amount",0,20).onChange(controls.asGeom),gui.add(controls,"bevelThickness",0,10).onChange(controls.asGeom),gui.add(controls,"bevelSize",0,10).onChange(controls.asGeom),gui.add(controls,"bevelSegments",0,30).step(1).onChange(controls.asGeom),gui.add(controls,"bevelEnabled").onChange(controls.asGeom),gui.add(controls,"curveSegments",1,30).step(1).onChange(controls.asGeom),gui.add(controls,"steps",1,5).step(1).onChange(controls.asGeom),controls.asGeom(),window.addEventListener("resize",(function(){camera.aspect=window.innerWidth/window.innerHeight,camera.updateProjectionMatrix(),renderer.setSize(window.innerWidth,window.innerHeight)}),!1);var step=0,renderScene=function(){stats.update(),shape.rotation.y=step+=.01,requestAnimationFrame(renderScene),renderer.render(scene,camera)};renderScene()}},597:function(module,exports,__webpack_require__){var f;module.exports=((f=function(){function e(a){return c.appendChild(a.dom),a}function u(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",c.addEventListener("click",(function(a){a.preventDefault(),u(++l%c.children.length)}),!1);var k=(performance||Date).now(),g=k,a=0,r=e(new f.Panel("FPS","#0ff","#002")),h=e(new f.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var t=e(new f.Panel("MB","#f08","#201"));return u(0),{REVISION:16,dom:c,addPanel:e,showPanel:u,begin:function(){k=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();if(h.update(c-k,200),c>g+1e3&&(r.update(1e3*a/(c-g),100),g=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){k=this.end()},domElement:c,setMode:u}}).Panel=function(e,f,l){var c=1/0,k=0,g=Math.round,a=g(window.devicePixelRatio||1),r=80*a,h=48*a,t=3*a,v=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r,q.height=h,q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");return b.font="bold "+9*a+"px Helvetica,Arial,sans-serif",b.textBaseline="top",b.fillStyle=l,b.fillRect(0,0,r,h),b.fillStyle=f,b.fillText(e,t,v),b.fillRect(d,m,n,p),b.fillStyle=l,b.globalAlpha=.9,b.fillRect(d,m,n,p),{dom:q,update:function(h,w){c=Math.min(c,h),k=Math.max(k,h),b.fillStyle=l,b.globalAlpha=1,b.fillRect(0,0,r,m),b.fillStyle=f,b.fillText(g(h)+" "+e+" ("+g(c)+"-"+g(k)+")",t,v),b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p),b.fillRect(d+n-a,m,a,p),b.fillStyle=l,b.globalAlpha=.9,b.fillRect(d+n-a,m,a,g((1-h/w)*p))}}},f)},600:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return SceneUtils}));var _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(598),SceneUtils={createMultiMaterialObject:function(geometry,materials){for(var group=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Group,i=0,l=materials.length;i<l;i++)group.add(new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Mesh(geometry,materials[i]));return group},detach:function(child,parent,scene){console.warn("THREE.SceneUtils: detach() has been deprecated. Use scene.attach( child ) instead."),scene.attach(child)},attach:function(child,scene,parent){console.warn("THREE.SceneUtils: attach() has been deprecated. Use parent.attach( child ) instead."),parent.attach(child)}}}}]);
//# sourceMappingURL=33.53f8f83f2eec7c90b531.bundle.js.map
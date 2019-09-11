(window.webpackJsonp=window.webpackJsonp||[]).push([[57],{244:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var three__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(598),stats_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(597),dat_gui__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(599);__webpack_exports__.default=function(){var VIEWPORT_W=window.innerWidth,VIEWPORT_H=window.innerHeight,scene=new three__WEBPACK_IMPORTED_MODULE_0__.Scene,camera=new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(45,window.innerWidth/window.innerHeight,.1,1e3);camera.position.x=-20,camera.position.y=30,camera.position.z=40,camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(10,0,0));var webGLRenderer=new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer;webGLRenderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_0__.Color(15658734)),webGLRenderer.setSize(VIEWPORT_W,VIEWPORT_H),webGLRenderer.shadowMap.enabled=!0;var groundGeom=new three__WEBPACK_IMPORTED_MODULE_0__.PlaneGeometry(100,100,4,4),groundMesh=new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(groundGeom,new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({color:5592405}));groundMesh.rotation.x=-Math.PI/2,groundMesh.position.y=-20,scene.add(groundMesh);var sphereGeometry=new three__WEBPACK_IMPORTED_MODULE_0__.SphereGeometry(14,20,20),cubeGeometry=new three__WEBPACK_IMPORTED_MODULE_0__.BoxGeometry(15,15,15),planeGeometry=new three__WEBPACK_IMPORTED_MODULE_0__.PlaneGeometry(14,14,4,4),meshMaterial=new three__WEBPACK_IMPORTED_MODULE_0__.MeshLambertMaterial({color:7829503}),sphere=new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(sphereGeometry,meshMaterial),cube=new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(cubeGeometry,meshMaterial),plane=new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(planeGeometry,meshMaterial);sphere.position.x=0,sphere.position.y=3,sphere.position.z=2,cube.position.set(sphere.position.x,sphere.position.y,sphere.position.z),plane.position.set(sphere.position.x,sphere.position.y,sphere.position.z),scene.add(cube);var ambientLight=new three__WEBPACK_IMPORTED_MODULE_0__.AmbientLight(789516);scene.add(ambientLight);var spotLight=new three__WEBPACK_IMPORTED_MODULE_0__.SpotLight(16777215);spotLight.position.set(-30,60,60),spotLight.castShadow=!0,scene.add(spotLight),document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);var statsObj,stats=((statsObj=new stats_js__WEBPACK_IMPORTED_MODULE_1__).showPanel(0),statsObj.dom.style.position="absolute",statsObj.dom.style.left="0px",statsObj.dom.style.top="0px",document.getElementById("Stats-output").appendChild(statsObj.dom),statsObj),controls={rotationSpeed:.02,bouncingSpeed:.03,opacity:meshMaterial.opacity,transparent:meshMaterial.transparent,overdraw:meshMaterial.overdraw,visible:meshMaterial.visible,emissive:meshMaterial.emissive.getHex(),side:"front",color:meshMaterial.color.getStyle(),selectedMesh:"cube"},spGui=(new dat_gui__WEBPACK_IMPORTED_MODULE_2__.a).addFolder("Mesh");spGui.add(controls,"opacity",0,1).onChange((function(e){meshMaterial.opacity=e})),spGui.add(controls,"transparent").onChange((function(e){meshMaterial.transparent=e})),spGui.add(controls,"visible").onChange((function(e){meshMaterial.visible=e})),spGui.addColor(controls,"emissive").onChange((function(e){meshMaterial.emissive=new three__WEBPACK_IMPORTED_MODULE_0__.Color(e)})),spGui.add(controls,"side",["front","back","double"]).onChange((function(e){switch(console.log(e),e){case"front":meshMaterial.side=three__WEBPACK_IMPORTED_MODULE_0__.FrontSide;break;case"back":meshMaterial.side=three__WEBPACK_IMPORTED_MODULE_0__.BackSide;break;case"double":meshMaterial.side=three__WEBPACK_IMPORTED_MODULE_0__.DoubleSide}meshMaterial.needsUpdate=!0})),spGui.addColor(controls,"color").onChange((function(e){meshMaterial.color.setStyle(e)})),spGui.add(controls,"selectedMesh",["cube","sphere","plane"]).onChange((function(e){switch(scene.remove(plane),scene.remove(cube),scene.remove(sphere),e){case"cube":scene.add(cube);break;case"sphere":scene.add(sphere);break;case"plane":scene.add(plane)}})),window.addEventListener("resize",(function(){camera.aspect=window.innerWidth/window.innerHeight,camera.updateProjectionMatrix(),webGLRenderer.setSize(window.innerWidth,window.innerHeight)}),!1);var step=0,renderScene=function(){stats.update(),cube.rotation.y=step+=.01,plane.rotation.y=step,sphere.rotation.y=step,requestAnimationFrame(renderScene),webGLRenderer.render(scene,camera)};renderScene()}},597:function(module,exports,__webpack_require__){var f;module.exports=((f=function(){function e(a){return c.appendChild(a.dom),a}function u(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",c.addEventListener("click",(function(a){a.preventDefault(),u(++l%c.children.length)}),!1);var k=(performance||Date).now(),g=k,a=0,r=e(new f.Panel("FPS","#0ff","#002")),h=e(new f.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var t=e(new f.Panel("MB","#f08","#201"));return u(0),{REVISION:16,dom:c,addPanel:e,showPanel:u,begin:function(){k=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();if(h.update(c-k,200),c>g+1e3&&(r.update(1e3*a/(c-g),100),g=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){k=this.end()},domElement:c,setMode:u}}).Panel=function(e,f,l){var c=1/0,k=0,g=Math.round,a=g(window.devicePixelRatio||1),r=80*a,h=48*a,t=3*a,v=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r,q.height=h,q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");return b.font="bold "+9*a+"px Helvetica,Arial,sans-serif",b.textBaseline="top",b.fillStyle=l,b.fillRect(0,0,r,h),b.fillStyle=f,b.fillText(e,t,v),b.fillRect(d,m,n,p),b.fillStyle=l,b.globalAlpha=.9,b.fillRect(d,m,n,p),{dom:q,update:function(h,w){c=Math.min(c,h),k=Math.max(k,h),b.fillStyle=l,b.globalAlpha=1,b.fillRect(0,0,r,m),b.fillStyle=f,b.fillText(g(h)+" "+e+" ("+g(c)+"-"+g(k)+")",t,v),b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p),b.fillRect(d+n-a,m,a,p),b.fillStyle=l,b.globalAlpha=.9,b.fillRect(d+n-a,m,a,g((1-h/w)*p))}}},f)}}]);
//# sourceMappingURL=57.53f8f83f2eec7c90b531.bundle.js.map
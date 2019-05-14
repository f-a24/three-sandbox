(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{154:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var three__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(346),stats_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(347),dat_gui__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(348);__webpack_require__(352),__webpack_require__(353),__webpack_require__(354),__webpack_require__(355),__webpack_require__(356),__webpack_require__(357),__webpack_require__(358);__webpack_exports__.default=function(){var VIEWPORT_W=window.innerWidth,VIEWPORT_H=window.innerHeight,scene=new three__WEBPACK_IMPORTED_MODULE_0__.Scene,camera=new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(45,VIEWPORT_W/VIEWPORT_H,.1,1e3);camera.position.x=20,camera.position.y=30,camera.position.z=21,camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0,0,-30));var renderer=new three__WEBPACK_IMPORTED_MODULE_0__.WebGLDeferredRenderer({width:window.innerWidth,height:window.innerHeight,antialias:!0,cacheKeepAlive:!0}),planeGeometry=new three__WEBPACK_IMPORTED_MODULE_0__.PlaneGeometry(70,70,1,1),planeMaterial=new three__WEBPACK_IMPORTED_MODULE_0__.MeshPhongMaterial({color:16777215,specular:16777215,shininess:200}),plane=new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(planeGeometry,planeMaterial);plane.rotation.x=-.5*Math.PI,plane.position.x=0,plane.position.y=0,plane.position.z=0,scene.add(plane);var spotLight0=new three__WEBPACK_IMPORTED_MODULE_0__.SpotLight(13421772);spotLight0.position.set(-40,60,-10),spotLight0.intensity=.1,spotLight0.lookAt(plane.position),scene.add(spotLight0);var areaLight1=new three__WEBPACK_IMPORTED_MODULE_0__.RectAreaLight(16711680,3);areaLight1.position.set(-10,10,-35),areaLight1.rotation.set(-Math.PI/2,0,0),areaLight1.width=4,areaLight1.height=9.9,scene.add(areaLight1);var areaLight2=new three__WEBPACK_IMPORTED_MODULE_0__.RectAreaLight(65280,3);areaLight2.position.set(0,10,-35),areaLight2.rotation.set(-Math.PI/2,0,0),areaLight2.width=4,areaLight2.height=9.9,scene.add(areaLight2);var areaLight3=new three__WEBPACK_IMPORTED_MODULE_0__.RectAreaLight(255,3);areaLight3.position.set(10,10,-35),areaLight3.rotation.set(-Math.PI/2,0,0),areaLight3.width=4,areaLight3.height=9.9,scene.add(areaLight3);var planeGeometry1=new three__WEBPACK_IMPORTED_MODULE_0__.BoxGeometry(4,10,0),planeGeometry1Mat=new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({color:16711680}),plane1=new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(planeGeometry1,planeGeometry1Mat);plane1.position.copy(areaLight1.position),scene.add(plane1);var planeGeometry2=new three__WEBPACK_IMPORTED_MODULE_0__.BoxGeometry(4,10,0),planeGeometry2Mat=new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({color:65280}),plane2=new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(planeGeometry2,planeGeometry2Mat);plane2.position.copy(areaLight2.position),scene.add(plane2);var planeGeometry3=new three__WEBPACK_IMPORTED_MODULE_0__.BoxGeometry(4,10,0),planeGeometry3Mat=new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({color:255}),plane3=new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(planeGeometry3,planeGeometry3Mat);plane3.position.copy(areaLight3.position),scene.add(plane3),document.getElementById("WebGL-output").appendChild(renderer.domElement);var statsObj,stats=((statsObj=new stats_js__WEBPACK_IMPORTED_MODULE_1__).showPanel(0),statsObj.dom.style.position="absolute",statsObj.dom.style.left="0px",statsObj.dom.style.top="0px",document.getElementById("Stats-output").appendChild(statsObj.dom),statsObj),controls={rotationSpeed:.02,color1:16711680,intensity1:2,color2:65280,intensity2:2,color3:255,intensity3:2},gui=new dat_gui__WEBPACK_IMPORTED_MODULE_2__.a;gui.addColor(controls,"color1").onChange(function(e){areaLight1.color=new three__WEBPACK_IMPORTED_MODULE_0__.Color(e),planeGeometry1Mat.color=new three__WEBPACK_IMPORTED_MODULE_0__.Color(e),scene.remove(plane1),(plane1=new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(planeGeometry1,planeGeometry1Mat)).position.copy(areaLight1.position),scene.add(plane1)}),gui.add(controls,"intensity1",0,5).onChange(function(e){areaLight1.intensity=e}),gui.addColor(controls,"color2").onChange(function(e){areaLight2.color=new three__WEBPACK_IMPORTED_MODULE_0__.Color(e),planeGeometry2Mat.color=new three__WEBPACK_IMPORTED_MODULE_0__.Color(e),scene.remove(plane2),(plane2=new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(planeGeometry2,planeGeometry2Mat)).position.copy(areaLight2.position),scene.add(plane2)}),gui.add(controls,"intensity2",0,5).onChange(function(e){areaLight2.intensity=e}),gui.addColor(controls,"color3").onChange(function(e){areaLight3.color=new three__WEBPACK_IMPORTED_MODULE_0__.Color(e),planeGeometry3Mat.color=new three__WEBPACK_IMPORTED_MODULE_0__.Color(e),scene.remove(plane3),(plane3=new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(planeGeometry1,planeGeometry3Mat)).position.copy(areaLight3.position),scene.add(plane3)}),gui.add(controls,"intensity3",0,5).onChange(function(e){areaLight3.intensity=e}),window.addEventListener("resize",function(){camera.aspect=window.innerWidth/window.innerHeight,camera.updateProjectionMatrix(),renderer.setSize(window.innerWidth,window.innerHeight)},!1);var renderScene=function(){stats.update(),requestAnimationFrame(renderScene),renderer.render(scene,camera)};renderScene()}}}]);
//# sourceMappingURL=37.01c40c72991cf6a77925.bundle.js.map
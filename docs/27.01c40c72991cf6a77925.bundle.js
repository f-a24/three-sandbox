(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{142:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var three__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(346),stats_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(347),dat_gui__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(348);__webpack_exports__.default=function(){var VIEWPORT_W=window.innerWidth,VIEWPORT_H=window.innerHeight,scene=new three__WEBPACK_IMPORTED_MODULE_0__.Scene,camera=new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(45,VIEWPORT_W/VIEWPORT_H,.1,1e3);camera.position.x=-30,camera.position.y=40,camera.position.z=30,camera.lookAt(scene.position);var renderer=new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer;renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_0__.Color(15658734)),renderer.setSize(VIEWPORT_W,VIEWPORT_H),renderer.shadowMap.enabled=!0;var axes=new three__WEBPACK_IMPORTED_MODULE_0__.AxesHelper(20);scene.add(axes);var planeGeometry=new three__WEBPACK_IMPORTED_MODULE_0__.PlaneGeometry(60,20),planeMaterial=new three__WEBPACK_IMPORTED_MODULE_0__.MeshLambertMaterial({color:13421772}),plane=new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(planeGeometry,planeMaterial);plane.rotation.x=-.5*Math.PI,plane.position.x=15,plane.position.y=0,plane.position.z=0,plane.receiveShadow=!0,scene.add(plane);var cubeGeometry=new three__WEBPACK_IMPORTED_MODULE_0__.BoxGeometry(4,4,4),cubeMaterial=new three__WEBPACK_IMPORTED_MODULE_0__.MeshLambertMaterial({color:16711680}),cube=new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(cubeGeometry,cubeMaterial);cube.position.x=-4,cube.position.y=3,cube.position.z=0,cube.castShadow=!0,scene.add(cube);var sphereGeometry=new three__WEBPACK_IMPORTED_MODULE_0__.SphereGeometry(4,20,20),sphereMaterial=new three__WEBPACK_IMPORTED_MODULE_0__.MeshLambertMaterial({color:7829503}),sphere=new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(sphereGeometry,sphereMaterial);sphere.position.x=20,sphere.position.y=4,sphere.position.z=2,sphere.castShadow=!0,scene.add(sphere);var spotLight=new three__WEBPACK_IMPORTED_MODULE_0__.SpotLight(16777215);spotLight.position.set(-20,30,-5),spotLight.castShadow=!0,scene.add(spotLight),document.getElementById("WebGL-output").appendChild(renderer.domElement);var statsObj,stats=((statsObj=new stats_js__WEBPACK_IMPORTED_MODULE_1__).showPanel(0),statsObj.dom.style.position="absolute",statsObj.dom.style.left="0px",statsObj.dom.style.top="0px",document.getElementById("Stats-output").appendChild(statsObj.dom),statsObj),controls={rotationSpeed:.02,bouncingSpeed:.02},gui=new dat_gui__WEBPACK_IMPORTED_MODULE_2__.a;gui.add(controls,"rotationSpeed",0,.5),gui.add(controls,"bouncingSpeed",0,.5),window.addEventListener("resize",function(){camera.aspect=window.innerWidth/window.innerHeight,camera.updateProjectionMatrix(),renderer.setSize(window.innerWidth,window.innerHeight)},!1);var step=0,renderScene=function(){stats.update(),cube.rotation.x+=controls.rotationSpeed,cube.rotation.y+=controls.rotationSpeed,cube.rotation.z+=controls.rotationSpeed,step+=controls.bouncingSpeed,sphere.position.x=20+10*Math.cos(step),sphere.position.y=2+10*Math.abs(Math.sin(step)),requestAnimationFrame(renderScene),renderer.render(scene,camera)};renderScene()}}}]);
//# sourceMappingURL=27.01c40c72991cf6a77925.bundle.js.map
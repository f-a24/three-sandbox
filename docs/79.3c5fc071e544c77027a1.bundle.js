(window.webpackJsonp=window.webpackJsonp||[]).push([[79],{197:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var three__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(386),stats_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(385),_node_modules_three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(389);__webpack_require__(414);__webpack_exports__.default=function(){var VIEWPORT_W=window.innerWidth,VIEWPORT_H=window.innerHeight,scene=new three__WEBPACK_IMPORTED_MODULE_0__.Scene,camera=new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(45,VIEWPORT_W/VIEWPORT_H,.1,1e3);camera.position.x=30,camera.position.y=30,camera.position.z=30,camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0,0,0));var orbit=new _node_modules_three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_2__.a(camera),dir1=new three__WEBPACK_IMPORTED_MODULE_0__.DirectionalLight;dir1.position.set(-30,30,-30),scene.add(dir1);var dir2=new three__WEBPACK_IMPORTED_MODULE_0__.DirectionalLight;dir2.position.set(-30,30,30),scene.add(dir2);var dir3=new three__WEBPACK_IMPORTED_MODULE_0__.DirectionalLight;dir3.position.set(30,30,-30),scene.add(dir3);var spotLight=new three__WEBPACK_IMPORTED_MODULE_0__.SpotLight(16777215);spotLight.position.set(30,30,30),scene.add(spotLight);var renderer=new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer;renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_0__.Color(0)),renderer.setSize(VIEWPORT_W,VIEWPORT_H),renderer.shadowMap.enabled=!0,document.getElementById("WebGL-output").appendChild(renderer.domElement);var loader=new three__WEBPACK_IMPORTED_MODULE_0__.AWDLoader,group=new three__WEBPACK_IMPORTED_MODULE_0__.Object3D;loader.load("./assets/PolarBear.awd",function(model){model.traverse(function(child){child instanceof three__WEBPACK_IMPORTED_MODULE_0__.Mesh&&(child.material=new three__WEBPACK_IMPORTED_MODULE_0__.MeshLambertMaterial({color:11184810}))}),model.scale.set(.1,.1,.1),scene.add(model)});var statsObj,stats=((statsObj=new stats_js__WEBPACK_IMPORTED_MODULE_1__).showPanel(0),statsObj.dom.style.position="absolute",statsObj.dom.style.left="0px",statsObj.dom.style.top="0px",document.getElementById("Stats-output").appendChild(statsObj.dom),statsObj);window.addEventListener("resize",function(){camera.aspect=window.innerWidth/window.innerHeight,camera.updateProjectionMatrix(),renderer.setSize(window.innerWidth,window.innerHeight)},!1);var renderScene=function(){stats.update(),orbit.update(),group&&(group.rotation.y+=.006),requestAnimationFrame(renderScene),renderer.render(scene,camera)};renderScene()}}}]);
//# sourceMappingURL=79.3c5fc071e544c77027a1.bundle.js.map
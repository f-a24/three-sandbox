(window.webpackJsonp=window.webpackJsonp||[]).push([[129],{350:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var three__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(710),stats_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(711),chroma_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(724),_node_modules_three_examples_jsm_loaders_OBJLoader__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(721),_node_modules_three_examples_jsm_loaders_MTLLoader__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(722),_node_modules_three_examples_jsm_controls_FlyControls__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(757);__webpack_exports__.default=function(){var VIEWPORT_W=window.innerWidth,VIEWPORT_H=window.innerHeight,clock=new three__WEBPACK_IMPORTED_MODULE_0__.Clock,scene=new three__WEBPACK_IMPORTED_MODULE_0__.Scene,camera=new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(45,VIEWPORT_W/VIEWPORT_H,.1,1e3);camera.position.x=100,camera.position.y=100,camera.position.z=300,camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0,0,0));var renderer=new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer;renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_0__.Color(0)),renderer.setSize(VIEWPORT_W,VIEWPORT_H),renderer.shadowMap.enabled=!0;var flyControls=new _node_modules_three_examples_jsm_controls_FlyControls__WEBPACK_IMPORTED_MODULE_5__.a(camera);flyControls.movementSpeed=25,flyControls.domElement=document.querySelector("#WebGL-output"),flyControls.rollSpeed=Math.PI/24,flyControls.autoForward=!0,flyControls.dragToLook=!1;var ambientLight=new three__WEBPACK_IMPORTED_MODULE_0__.AmbientLight(3684408);scene.add(ambientLight);var spotLight=new three__WEBPACK_IMPORTED_MODULE_0__.SpotLight(16777215);spotLight.position.set(100,140,130),spotLight.intensity=2,scene.add(spotLight),document.getElementById("WebGL-output").appendChild(renderer.domElement);var mesh,setRandomColors=function(object,scale){var children=object.children;children&&children.length>0?children.forEach((function(e){setRandomColors(e,scale)})):object instanceof three__WEBPACK_IMPORTED_MODULE_0__.Mesh&&_setRandomColors(object.material,scale)},_setRandomColors=function(material,scale){material instanceof three__WEBPACK_IMPORTED_MODULE_0__.MultiMaterial?material.materials.forEach((function(mat){_setRandomColors(mat,scale)})):(material.color=new three__WEBPACK_IMPORTED_MODULE_0__.Color(scale(Math.random()).hex()),material.name&&0==material.name.indexOf("building")&&(material.emissive=new three__WEBPACK_IMPORTED_MODULE_0__.Color(4473924),material.transparent=!0,material.opacity=.8))},load=function(object){var scale=chroma_js__WEBPACK_IMPORTED_MODULE_2__.scale(["red","green","blue"]);setRandomColors(object,scale),mesh=object,scene.add(mesh)};(new three__WEBPACK_IMPORTED_MODULE_0__.TextureLoader).load("./assets/tex/metro01.jpg"),(new _node_modules_three_examples_jsm_loaders_MTLLoader__WEBPACK_IMPORTED_MODULE_4__.a).load("./assets/city.mtl",(function(materials){materials.preload();var objLoader=new _node_modules_three_examples_jsm_loaders_OBJLoader__WEBPACK_IMPORTED_MODULE_3__.a;objLoader.setMaterials(materials),objLoader.load("./assets/city.obj",load)}));var statsObj,stats=((statsObj=new stats_js__WEBPACK_IMPORTED_MODULE_1__).showPanel(0),statsObj.dom.style.position="absolute",statsObj.dom.style.left="0px",statsObj.dom.style.top="0px",document.getElementById("Stats-output").appendChild(statsObj.dom),statsObj);window.addEventListener("resize",(function(){camera.aspect=window.innerWidth/window.innerHeight,camera.updateProjectionMatrix(),renderer.setSize(window.innerWidth,window.innerHeight)}),!1);var renderScene=function(){stats.update();var delta=clock.getDelta();flyControls.update(delta),renderer.clear(),requestAnimationFrame(renderScene),renderer.render(scene,camera)};renderScene()}}}]);
//# sourceMappingURL=129.591c2c407b4691f5f6cc.bundle.js.map
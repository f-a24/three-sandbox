(window.webpackJsonp=window.webpackJsonp||[]).push([[91],{263:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var three__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(691),stats_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(690),dat_gui__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(692),_node_modules_three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(694),_node_modules_three_examples_jsm_utils_SceneUtils__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(693),_node_modules_three_examples_jsm_postprocessing_EffectComposer__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(708),_node_modules_three_examples_jsm_postprocessing_FilmPass__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(731),_node_modules_three_examples_jsm_postprocessing_RenderPass__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(702);__webpack_exports__.default=function(){var VIEWPORT_W=window.innerWidth,VIEWPORT_H=window.innerHeight,scene=new three__WEBPACK_IMPORTED_MODULE_0__.Scene,camera=new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(45,window.innerWidth/window.innerHeight,.1,1e3);camera.position.x=-10,camera.position.y=15,camera.position.z=25,camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0,0,0));var renderer=new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer;renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_0__.Color(0)),renderer.setSize(VIEWPORT_W,VIEWPORT_H),renderer.shadowMap.enabled=!0;var orbitControls=new _node_modules_three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_3__.a(camera);orbitControls.autoRotate=!1;var ambi=new three__WEBPACK_IMPORTED_MODULE_0__.AmbientLight(1579032);scene.add(ambi);var spotLight=new three__WEBPACK_IMPORTED_MODULE_0__.SpotLight(16777215);spotLight.position.set(550,100,550),spotLight.intensity=.6,scene.add(spotLight),document.getElementById("WebGL-output").appendChild(renderer.domElement);var renderPass=new _node_modules_three_examples_jsm_postprocessing_RenderPass__WEBPACK_IMPORTED_MODULE_7__.a(scene,camera),effectFilm=new _node_modules_three_examples_jsm_postprocessing_FilmPass__WEBPACK_IMPORTED_MODULE_6__.a(.8,.325,256,0);effectFilm.renderToScreen=!0;var composer=new _node_modules_three_examples_jsm_postprocessing_EffectComposer__WEBPACK_IMPORTED_MODULE_5__.a(renderer);composer.addPass(renderPass),composer.addPass(effectFilm);var geom,textureLoader,planetTexture,specularTexture,normalTexture,planetMaterial,sphere=(geom=new three__WEBPACK_IMPORTED_MODULE_0__.SphereGeometry(10,40,40),textureLoader=new three__WEBPACK_IMPORTED_MODULE_0__.TextureLoader,planetTexture=textureLoader.load("./assets/Earth.png"),specularTexture=textureLoader.load("./assets/EarthSpec.png"),normalTexture=textureLoader.load("./assets/EarthNormal.png"),(planetMaterial=new three__WEBPACK_IMPORTED_MODULE_0__.MeshPhongMaterial).specularMap=specularTexture,planetMaterial.specular=new three__WEBPACK_IMPORTED_MODULE_0__.Color(4474026),planetMaterial.normalMap=normalTexture,planetMaterial.map=planetTexture,_node_modules_three_examples_jsm_utils_SceneUtils__WEBPACK_IMPORTED_MODULE_4__.a.createMultiMaterialObject(geom,[planetMaterial]));scene.add(sphere);var clock=new three__WEBPACK_IMPORTED_MODULE_0__.Clock,controls={scanlinesCount:256,grayscale:!1,scanlinesIntensity:.3,noiseIntensity:.8,updateEffectFilm:function(){effectFilm.uniforms.grayscale.value=controls.grayscale,effectFilm.uniforms.nIntensity.value=controls.noiseIntensity,effectFilm.uniforms.sIntensity.value=controls.scanlinesIntensity,effectFilm.uniforms.sCount.value=controls.scanlinesCount}},gui=new dat_gui__WEBPACK_IMPORTED_MODULE_2__.a;gui.add(controls,"scanlinesIntensity",0,1).onChange(controls.updateEffectFilm),gui.add(controls,"noiseIntensity",0,3).onChange(controls.updateEffectFilm),gui.add(controls,"grayscale").onChange(controls.updateEffectFilm),gui.add(controls,"scanlinesCount",0,2048).step(1).onChange(controls.updateEffectFilm);var statsObj,stats=((statsObj=new stats_js__WEBPACK_IMPORTED_MODULE_1__).showPanel(0),statsObj.dom.style.position="absolute",statsObj.dom.style.left="0px",statsObj.dom.style.top="0px",document.getElementById("Stats-output").appendChild(statsObj.dom),statsObj);window.addEventListener("resize",(function(){camera.aspect=window.innerWidth/window.innerHeight,camera.updateProjectionMatrix(),renderer.setSize(window.innerWidth,window.innerHeight)}),!1);var renderScene=function(){stats.update(),orbitControls.update(),sphere.rotation.y+=.002,requestAnimationFrame(renderScene);var delta=clock.getDelta();composer.render(delta)};renderScene()}}}]);
//# sourceMappingURL=91.3cc1079fb8472c44bc5a.bundle.js.map
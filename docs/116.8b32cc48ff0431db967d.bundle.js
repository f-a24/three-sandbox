(window.webpackJsonp=window.webpackJsonp||[]).push([[116],{363:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var three__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(718),_node_modules_three_examples_jsm_loaders_MMDLoader__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(768),_node_modules_three_examples_jsm_animation_MMDAnimationHelper__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(776);window.Ammo=__webpack_require__(775)(),__webpack_exports__.default=function(){var VIEWPORT_W=window.innerWidth,VIEWPORT_H=window.innerHeight,clock=new three__WEBPACK_IMPORTED_MODULE_0__.Clock,scene=new three__WEBPACK_IMPORTED_MODULE_0__.Scene,camera=new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(45,VIEWPORT_W/VIEWPORT_H,1,2e3);camera.position.z=30,camera.lookAt(scene.position);var renderer=new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer({antialias:!0});renderer.setPixelRatio(window.devicePixelRatio),renderer.setSize(VIEWPORT_W,VIEWPORT_H),renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_0__.Color(16777215));var ambient=new three__WEBPACK_IMPORTED_MODULE_0__.AmbientLight(8947848);scene.add(ambient);var directionalLight=new three__WEBPACK_IMPORTED_MODULE_0__.DirectionalLight(6710886);directionalLight.position.set(-1,1,1).normalize(),scene.add(directionalLight);var mesh,helper=new _node_modules_three_examples_jsm_animation_MMDAnimationHelper__WEBPACK_IMPORTED_MODULE_2__.a;(new _node_modules_three_examples_jsm_loaders_MMDLoader__WEBPACK_IMPORTED_MODULE_1__.a).loadWithAnimation("model/kizunaai.pmx","vmds/dance.vmd",(function(pmx){(mesh=pmx.mesh).position.y=-10,scene.add(mesh),helper.add(mesh,{animation:pmx.animation,physics:!0})}),(function(xhr){if(xhr.lengthComputable){var percentComplete=xhr.loaded/xhr.total*100;console.log(Math.round(percentComplete)+"% downloaded")}}),(function(error){console.log("ERROR:",error)})),document.getElementById("WebGL-output").appendChild(renderer.domElement),window.addEventListener("resize",(function(){camera.aspect=VIEWPORT_W/VIEWPORT_H,camera.updateProjectionMatrix(),renderer.setSize(VIEWPORT_W,VIEWPORT_H)}),!1);var renderScene=function(){camera.lookAt(scene.position),helper.update(clock.getDelta()),requestAnimationFrame(renderScene),renderer.render(scene,camera)};renderScene();var copyright=document.createElement("span");copyright.innerHTML="© Kizuna AI",copyright.className="copyright",document.body.appendChild(copyright)}}}]);
//# sourceMappingURL=116.8b32cc48ff0431db967d.bundle.js.map
(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{187:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var three__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(360),stats_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(361),dat_gui__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(362);__webpack_exports__.default=function(){var VIEWPORT_W=window.innerWidth,VIEWPORT_H=window.innerHeight,scene=new three__WEBPACK_IMPORTED_MODULE_0__.Scene,camera=new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(45,VIEWPORT_W/VIEWPORT_H,.1,1e3);camera.position.x=20,camera.position.y=0,camera.position.z=150;var renderer=new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer;renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_0__.Color(0)),renderer.setSize(VIEWPORT_W,VIEWPORT_H);var cloud,getTexture=function(){var canvasEl=document.createElement("canvas");canvasEl.width=32,canvasEl.height=32;var ctx=canvasEl.getContext("2d");ctx.translate(-81,-84),ctx.fillStyle="orange",ctx.beginPath(),ctx.moveTo(83,116),ctx.lineTo(83,102),ctx.bezierCurveTo(83,94,89,88,97,88),ctx.bezierCurveTo(105,88,111,94,111,102),ctx.lineTo(111,116),ctx.lineTo(106.333,111.333),ctx.lineTo(101.666,116),ctx.lineTo(97,111.333),ctx.lineTo(92.333,116),ctx.lineTo(87.666,111.333),ctx.lineTo(83,116),ctx.fill(),ctx.fillStyle="white",ctx.beginPath(),ctx.moveTo(91,96),ctx.bezierCurveTo(88,96,87,99,87,101),ctx.bezierCurveTo(87,103,88,106,91,106),ctx.bezierCurveTo(94,106,95,103,95,101),ctx.bezierCurveTo(95,99,94,96,91,96),ctx.moveTo(103,96),ctx.bezierCurveTo(100,96,99,99,99,101),ctx.bezierCurveTo(99,103,100,106,103,106),ctx.bezierCurveTo(106,106,107,103,107,101),ctx.bezierCurveTo(107,99,106,96,103,96),ctx.fill(),ctx.fillStyle="blue",ctx.beginPath(),ctx.arc(101,102,2,0,2*Math.PI,!0),ctx.fill(),ctx.beginPath(),ctx.arc(89,102,2,0,2*Math.PI,!0),ctx.fill();var texture=new three__WEBPACK_IMPORTED_MODULE_0__.CanvasTexture(canvasEl);return texture.needsUpdate=!0,texture};document.getElementById("WebGL-output").appendChild(renderer.domElement);var controls={size:15,transparent:!0,opacity:.6,color:16777215,rotateSystem:!0,sizeAttenuation:!0,redraw:function(){scene.getObjectByName("pointcloud")&&scene.remove(scene.getObjectByName("pointcloud")),function(size,transparent,opacity,sizeAttenuation,color){for(var geom=new three__WEBPACK_IMPORTED_MODULE_0__.Geometry,material=new three__WEBPACK_IMPORTED_MODULE_0__.PointsMaterial({size:size,transparent:transparent,opacity:opacity,map:getTexture(),sizeAttenuation:sizeAttenuation,depthWrite:!1,color:color}),i=0;i<5e3;i++){var particle=new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(500*Math.random()-250,500*Math.random()-250,500*Math.random()-250);geom.vertices.push(particle)}(cloud=new three__WEBPACK_IMPORTED_MODULE_0__.Points(geom,material)).name="pointcloud",scene.add(cloud)}(controls.size,controls.transparent,controls.opacity,controls.sizeAttenuation,controls.color)}},gui=new dat_gui__WEBPACK_IMPORTED_MODULE_2__.a;gui.add(controls,"size",0,20).onChange(controls.redraw),gui.add(controls,"transparent").onChange(controls.redraw),gui.add(controls,"opacity",0,1).onChange(controls.redraw),gui.addColor(controls,"color").onChange(controls.redraw),gui.add(controls,"sizeAttenuation").onChange(controls.redraw),gui.add(controls,"rotateSystem");var statsObj,stats=((statsObj=new stats_js__WEBPACK_IMPORTED_MODULE_1__).showPanel(0),statsObj.dom.style.position="absolute",statsObj.dom.style.left="0px",statsObj.dom.style.top="0px",document.getElementById("Stats-output").appendChild(statsObj.dom),statsObj),step=0,renderScene=function(){stats.update(),controls.rotateSystem&&(step+=.01,cloud.rotation.x=step,cloud.rotation.z=step),requestAnimationFrame(renderScene),renderer.render(scene,camera)};controls.redraw(),renderScene()}}}]);
//# sourceMappingURL=52.a44c635a32c352d04207.bundle.js.map
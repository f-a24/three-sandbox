(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{185:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var three__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(344),stats_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(345),dat_gui__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(346);__webpack_exports__.default=function(){var VIEWPORT_W=window.innerWidth,VIEWPORT_H=window.innerHeight,scene=new three__WEBPACK_IMPORTED_MODULE_0__.Scene,camera=new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(45,VIEWPORT_W/VIEWPORT_H,.1,1e3);camera.position.x=20,camera.position.y=0,camera.position.z=150;var cloud,renderer=new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer;renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_0__.Color(0)),renderer.setSize(VIEWPORT_W,VIEWPORT_H);document.getElementById("WebGL-output").appendChild(renderer.domElement);var statsObj,stats=((statsObj=new stats_js__WEBPACK_IMPORTED_MODULE_1__).showPanel(0),statsObj.dom.style.position="absolute",statsObj.dom.style.left="0px",statsObj.dom.style.top="0px",document.getElementById("Stats-output").appendChild(statsObj.dom),statsObj),controls={size:4,transparent:!0,opacity:.6,vertexColors:!0,color:16777215,sizeAttenuation:!0,rotateSystem:!0,redraw:function(){scene.getObjectByName("particles")&&scene.remove(scene.getObjectByName("particles")),function(size,transparent,opacity,vertexColors,sizeAttenuation,color){for(var geom=new three__WEBPACK_IMPORTED_MODULE_0__.Geometry,material=new three__WEBPACK_IMPORTED_MODULE_0__.PointsMaterial({size:size,transparent:transparent,opacity:opacity,vertexColors:vertexColors?three__WEBPACK_IMPORTED_MODULE_0__.VertexColors:three__WEBPACK_IMPORTED_MODULE_0__.NoColors,sizeAttenuation:sizeAttenuation,color:color}),i=0;i<15e3;i++){var particle=new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(500*Math.random()-250,500*Math.random()-250,500*Math.random()-250);geom.vertices.push(particle);var color_1=new three__WEBPACK_IMPORTED_MODULE_0__.Color(65280);color_1.setHSL(color_1.getHSL({h:0,s:0,l:0}).h,color_1.getHSL({h:0,s:0,l:0}).s,Math.random()*color_1.getHSL({h:0,s:0,l:0}).l),geom.colors.push(color_1)}(cloud=new three__WEBPACK_IMPORTED_MODULE_0__.Points(geom,material)).name="particles",scene.add(cloud)}(controls.size,controls.transparent,controls.opacity,controls.vertexColors,controls.sizeAttenuation,controls.color)}},gui=new dat_gui__WEBPACK_IMPORTED_MODULE_2__.a;gui.add(controls,"size",0,10).onChange(controls.redraw),gui.add(controls,"transparent").onChange(controls.redraw),gui.add(controls,"opacity",0,1).onChange(controls.redraw),gui.add(controls,"vertexColors").onChange(controls.redraw),gui.addColor(controls,"color").onChange(controls.redraw),gui.add(controls,"sizeAttenuation").onChange(controls.redraw),gui.add(controls,"rotateSystem");var step=0,renderScene=function(){stats.update(),controls.rotateSystem&&(step+=.01,cloud.rotation.x=step,cloud.rotation.z=step),requestAnimationFrame(renderScene),renderer.render(scene,camera)};controls.redraw(),renderScene()}}}]);
//# sourceMappingURL=50.fc18eed1a7989718187a.bundle.js.map
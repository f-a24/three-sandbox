(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{184:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var three__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(363),stats_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(364),dat_gui__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(365),_utils_createMultiMaterialObject__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(366);__webpack_exports__.default=function(){var VIEWPORT_W=window.innerWidth,VIEWPORT_H=window.innerHeight,scene=new three__WEBPACK_IMPORTED_MODULE_0__.Scene,camera=new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(45,VIEWPORT_W/VIEWPORT_H,.1,1e3);camera.position.x=-30,camera.position.y=40,camera.position.z=50,camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(10,0,0));var renderer=new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer;renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_0__.Color(0)),renderer.setSize(VIEWPORT_W,VIEWPORT_H),renderer.shadowMap.enabled=!0;var knot,generateSprite=function(){var canvas=document.createElement("canvas");canvas.width=16,canvas.height=16;var context=canvas.getContext("2d"),gradient=context.createRadialGradient(canvas.width/2,canvas.height/2,0,canvas.width/2,canvas.height/2,canvas.width/2);gradient.addColorStop(0,"rgba(255,255,255,1)"),gradient.addColorStop(.2,"rgba(0,255,255,1)"),gradient.addColorStop(.4,"rgba(0,0,64,1)"),gradient.addColorStop(1,"rgba(0,0,0,1)"),context.fillStyle=gradient,context.fillRect(0,0,canvas.width,canvas.height);var texture=new three__WEBPACK_IMPORTED_MODULE_0__.Texture(canvas);return texture.needsUpdate=!0,texture};document.getElementById("WebGL-output").appendChild(renderer.domElement);var controls={radius:13,tube:1.7,radialSegments:156,tubularSegments:12,p:5,q:4,asParticles:!1,rotate:!1,redraw:function(){knot&&scene.remove(knot);var geom=new three__WEBPACK_IMPORTED_MODULE_0__.TorusKnotGeometry(controls.radius,controls.tube,Math.round(controls.radialSegments),Math.round(controls.tubularSegments),Math.round(controls.p),Math.round(controls.q));knot=controls.asParticles?function(geom){var material=new three__WEBPACK_IMPORTED_MODULE_0__.PointsMaterial({color:16777215,size:3,transparent:!0,blending:three__WEBPACK_IMPORTED_MODULE_0__.AdditiveBlending,map:generateSprite(),depthWrite:!1});return new three__WEBPACK_IMPORTED_MODULE_0__.Points(geom,material)}(geom):function(geom){var meshMaterial=new three__WEBPACK_IMPORTED_MODULE_0__.MeshNormalMaterial({});return meshMaterial.side=three__WEBPACK_IMPORTED_MODULE_0__.DoubleSide,Object(_utils_createMultiMaterialObject__WEBPACK_IMPORTED_MODULE_3__.a)(geom,[meshMaterial])}(geom),scene.add(knot)}},gui=new dat_gui__WEBPACK_IMPORTED_MODULE_2__.a;gui.add(controls,"radius",0,40).onChange(controls.redraw),gui.add(controls,"tube",0,40).onChange(controls.redraw),gui.add(controls,"radialSegments",0,400).step(1).onChange(controls.redraw),gui.add(controls,"tubularSegments",1,20).step(1).onChange(controls.redraw),gui.add(controls,"p",1,10).step(1).onChange(controls.redraw),gui.add(controls,"q",1,15).step(1).onChange(controls.redraw),gui.add(controls,"asParticles").onChange(controls.redraw),gui.add(controls,"rotate").onChange(controls.redraw);var statsObj,stats=((statsObj=new stats_js__WEBPACK_IMPORTED_MODULE_1__).showPanel(0),statsObj.dom.style.position="absolute",statsObj.dom.style.left="0px",statsObj.dom.style.top="0px",document.getElementById("Stats-output").appendChild(statsObj.dom),statsObj),step=0,renderScene=function(){stats.update(),controls.rotate&&(knot.rotation.y=step+=.01),requestAnimationFrame(renderScene),renderer.render(scene,camera)};controls.redraw(),renderScene()}},366:function(module,__webpack_exports__,__webpack_require__){"use strict";var three__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(363);__webpack_exports__.a=function(geometry,materials){var group=new three__WEBPACK_IMPORTED_MODULE_0__.Group;return materials.forEach(function(material){group.add(new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(geometry,material))}),group}}}]);
//# sourceMappingURL=31.5c7e7b0908d5d45295ef.bundle.js.map
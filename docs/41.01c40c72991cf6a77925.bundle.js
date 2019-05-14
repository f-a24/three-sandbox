(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{160:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var three__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(346),stats_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(347),dat_gui__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(348);__webpack_exports__.default=function(){var VIEWPORT_W=window.innerWidth,VIEWPORT_H=window.innerHeight,scene=new three__WEBPACK_IMPORTED_MODULE_0__.Scene,camera=new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(45,window.innerWidth/window.innerHeight,.1,1e3);camera.position.x=-20,camera.position.y=30,camera.position.z=40,camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(10,0,0));var webGLRenderer=new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer;webGLRenderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_0__.Color(15658734)),webGLRenderer.setSize(VIEWPORT_W,VIEWPORT_H),webGLRenderer.shadowMap.enabled=!0;var groundGeom=new three__WEBPACK_IMPORTED_MODULE_0__.PlaneGeometry(100,100,4,4),groundMesh=new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(groundGeom,new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({color:7829367}));groundMesh.rotation.x=-Math.PI/2,groundMesh.position.y=-20,scene.add(groundMesh);var sphereGeometry=new three__WEBPACK_IMPORTED_MODULE_0__.SphereGeometry(14,20,20),cubeGeometry=new three__WEBPACK_IMPORTED_MODULE_0__.BoxGeometry(15,15,15),planeGeometry=new three__WEBPACK_IMPORTED_MODULE_0__.PlaneGeometry(14,14,4,4),meshMaterial=new three__WEBPACK_IMPORTED_MODULE_0__.MeshNormalMaterial,sphere=new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(sphereGeometry,meshMaterial),cube=new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(cubeGeometry,meshMaterial),plane=new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(planeGeometry,meshMaterial);sphere.position.x=0,sphere.position.y=3,sphere.position.z=2;for(var f=0,fl=sphere.geometry.faces.length;f<fl;f++){var face=sphere.geometry.faces[f],centroid=new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0,0,0);centroid.add(sphere.geometry.vertices[face.a]),centroid.add(sphere.geometry.vertices[face.b]),centroid.add(sphere.geometry.vertices[face.c]),centroid.divideScalar(3);var arrow=new three__WEBPACK_IMPORTED_MODULE_0__.ArrowHelper(face.normal,centroid,2,3355647,.5,.5);sphere.add(arrow)}cube.position.set(sphere.position.x,sphere.position.y,sphere.position.z),plane.position.set(sphere.position.x,sphere.position.y,sphere.position.z),scene.add(cube);var ambientLight=new three__WEBPACK_IMPORTED_MODULE_0__.AmbientLight(789516);scene.add(ambientLight);var spotLight=new three__WEBPACK_IMPORTED_MODULE_0__.SpotLight(16777215);spotLight.position.set(-40,60,-10),spotLight.castShadow=!0,scene.add(spotLight),document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);var statsObj,stats=((statsObj=new stats_js__WEBPACK_IMPORTED_MODULE_1__).showPanel(0),statsObj.dom.style.position="absolute",statsObj.dom.style.left="0px",statsObj.dom.style.top="0px",document.getElementById("Stats-output").appendChild(statsObj.dom),statsObj),controls={rotationSpee:.02,bouncingSpeed:.03,opacity:meshMaterial.opacity,transparent:meshMaterial.transparent,visible:meshMaterial.visible,side:"front",wireframe:meshMaterial.wireframe,wireframeLinewidth:meshMaterial.wireframeLinewidth,selectedMesh:"cube",shading:"flat"},spGui=(new dat_gui__WEBPACK_IMPORTED_MODULE_2__.a).addFolder("Mesh");spGui.add(controls,"opacity",0,1).onChange(function(e){meshMaterial.opacity=e}),spGui.add(controls,"transparent").onChange(function(e){meshMaterial.transparent=e}),spGui.add(controls,"wireframe").onChange(function(e){meshMaterial.wireframe=e}),spGui.add(controls,"wireframeLinewidth",0,20).onChange(function(e){meshMaterial.wireframeLinewidth=e}),spGui.add(controls,"visible").onChange(function(e){meshMaterial.visible=e}),spGui.add(controls,"side",["front","back","double"]).onChange(function(e){switch(console.log(e),e){case"front":meshMaterial.side=three__WEBPACK_IMPORTED_MODULE_0__.FrontSide;break;case"back":meshMaterial.side=three__WEBPACK_IMPORTED_MODULE_0__.BackSide;break;case"double":meshMaterial.side=three__WEBPACK_IMPORTED_MODULE_0__.DoubleSide}meshMaterial.needsUpdate=!0}),spGui.add(controls,"shading",["flat","smooth"]).onChange(function(e){switch(e){case"flat":meshMaterial.flatShading=!0;break;case"smooth":meshMaterial.flatShading=!1}var oldPos=sphere.position.clone();switch(scene.remove(sphere),scene.remove(plane),scene.remove(cube),sphere=new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(sphere.geometry.clone(),meshMaterial),cube=new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(cube.geometry.clone(),meshMaterial),plane=new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(plane.geometry.clone(),meshMaterial),sphere.position.set(oldPos.x,oldPos.y,oldPos.z),cube.position.set(oldPos.x,oldPos.y,oldPos.z),plane.position.set(oldPos.x,oldPos.y,oldPos.z),controls.selectedMesh){case"cube":scene.add(cube);break;case"sphere":scene.add(sphere);break;case"plane":scene.add(plane)}meshMaterial.needsUpdate=!0,console.log(meshMaterial)}),spGui.add(controls,"selectedMesh",["cube","sphere","plane"]).onChange(function(e){switch(scene.remove(plane),scene.remove(cube),scene.remove(sphere),e){case"cube":scene.add(cube);break;case"sphere":scene.add(sphere);break;case"plane":scene.add(plane)}}),window.addEventListener("resize",function(){camera.aspect=window.innerWidth/window.innerHeight,camera.updateProjectionMatrix(),webGLRenderer.setSize(window.innerWidth,window.innerHeight)},!1);var step=0,renderScene=function(){stats.update(),cube.rotation.y=step+=.01,plane.rotation.y=step,sphere.rotation.y=step,requestAnimationFrame(renderScene),webGLRenderer.render(scene,camera)};renderScene()}}}]);
//# sourceMappingURL=41.01c40c72991cf6a77925.bundle.js.map
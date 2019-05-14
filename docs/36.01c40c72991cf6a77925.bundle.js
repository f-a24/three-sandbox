(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{153:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var three__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(346),stats_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(347),dat_gui__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(348);__webpack_exports__.default=function(){console.log(three__WEBPACK_IMPORTED_MODULE_0__);var VIEWPORT_W=window.innerWidth,VIEWPORT_H=window.innerHeight,scene=new three__WEBPACK_IMPORTED_MODULE_0__.Scene;scene.fog=new three__WEBPACK_IMPORTED_MODULE_0__.Fog(11184810,.01,200);var camera=new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(45,VIEWPORT_W/VIEWPORT_H,.1,1e3);camera.position.x=-20,camera.position.y=15,camera.position.z=45,camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(10,0,0));var renderer=new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer;renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_0__.Color(11184895)),renderer.setSize(VIEWPORT_W,VIEWPORT_H),renderer.shadowMap.enabled=!0;var textureGrass=(new three__WEBPACK_IMPORTED_MODULE_0__.TextureLoader).load("./assets/grasslight-big.jpg");textureGrass.wrapS=three__WEBPACK_IMPORTED_MODULE_0__.RepeatWrapping,textureGrass.wrapT=three__WEBPACK_IMPORTED_MODULE_0__.RepeatWrapping,textureGrass.repeat.set(4,4);var planeGeometry=new three__WEBPACK_IMPORTED_MODULE_0__.PlaneGeometry(1e3,200,20,20),planeMaterial=new three__WEBPACK_IMPORTED_MODULE_0__.MeshLambertMaterial({map:textureGrass}),plane=new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(planeGeometry,planeMaterial);plane.rotation.x=-.5*Math.PI,plane.position.x=15,plane.position.y=-5,plane.position.z=0,plane.receiveShadow=!0,scene.add(plane);var cubeGeometry=new three__WEBPACK_IMPORTED_MODULE_0__.BoxGeometry(4,4,4),cubeMaterial=new three__WEBPACK_IMPORTED_MODULE_0__.MeshLambertMaterial({color:16724787}),cube=new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(cubeGeometry,cubeMaterial);cube.position.x=-4,cube.position.y=3,cube.position.z=0,cube.castShadow=!0,scene.add(cube);var sphereGeometry=new three__WEBPACK_IMPORTED_MODULE_0__.SphereGeometry(4,25,25),sphereMaterial=new three__WEBPACK_IMPORTED_MODULE_0__.MeshLambertMaterial({color:7829503}),sphere=new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(sphereGeometry,sphereMaterial);sphere.position.x=10,sphere.position.y=5,sphere.position.z=10,sphere.castShadow=!0,scene.add(sphere);var spotLight0=new three__WEBPACK_IMPORTED_MODULE_0__.SpotLight(13421772);spotLight0.position.set(-40,60,-10),spotLight0.lookAt(plane.position),scene.add(spotLight0),(new three__WEBPACK_IMPORTED_MODULE_0__.Object3D).position.set(5,0,0);var hemiLight=new three__WEBPACK_IMPORTED_MODULE_0__.HemisphereLight(255,65280,.6);hemiLight.position.set(0,500,0),scene.add(hemiLight);var dirLight=new three__WEBPACK_IMPORTED_MODULE_0__.DirectionalLight("#ffffff");dirLight.position.set(30,10,-50),dirLight.castShadow=!0,dirLight.target=plane,dirLight.shadow.camera.near=.1,dirLight.shadow.camera.far=200,dirLight.shadow.camera.left=-50,dirLight.shadow.camera.right=50,dirLight.shadow.camera.top=50,dirLight.shadow.camera.bottom=-50,dirLight.shadow.mapSize.width=2048,dirLight.shadow.mapSize.height=2048,scene.add(dirLight),document.getElementById("WebGL-output").appendChild(renderer.domElement);var statsObj,stats=((statsObj=new stats_js__WEBPACK_IMPORTED_MODULE_1__).showPanel(0),statsObj.dom.style.position="absolute",statsObj.dom.style.left="0px",statsObj.dom.style.top="0px",document.getElementById("Stats-output").appendChild(statsObj.dom),statsObj),controls={rotationSpeed:.03,bouncingSpeed:.03,hemisphere:!0,color:65280,skyColor:255,intensity:.6},gui=new dat_gui__WEBPACK_IMPORTED_MODULE_2__.a;gui.add(controls,"hemisphere").onChange(function(e){hemiLight.intensity=e?controls.intensity:0}),gui.addColor(controls,"color").onChange(function(e){hemiLight.groundColor=new three__WEBPACK_IMPORTED_MODULE_0__.Color(e)}),gui.addColor(controls,"skyColor").onChange(function(e){hemiLight.color=new three__WEBPACK_IMPORTED_MODULE_0__.Color(e)}),gui.add(controls,"intensity",0,5).onChange(function(e){hemiLight.intensity=e}),window.addEventListener("resize",function(){camera.aspect=window.innerWidth/window.innerHeight,camera.updateProjectionMatrix(),renderer.setSize(window.innerWidth,window.innerHeight)},!1);var step=0,renderScene=function(){stats.update(),cube.rotation.x+=controls.rotationSpeed,cube.rotation.y+=controls.rotationSpeed,cube.rotation.z+=controls.rotationSpeed,step+=controls.bouncingSpeed,sphere.position.x=20+10*Math.cos(step),sphere.position.y=2+10*Math.abs(Math.sin(step)),requestAnimationFrame(renderScene),renderer.render(scene,camera)};renderScene()}}}]);
//# sourceMappingURL=36.01c40c72991cf6a77925.bundle.js.map
(window.webpackJsonp=window.webpackJsonp||[]).push([[83],{293:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var three__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(718),stats_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(719),dat_gui__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(720);__webpack_exports__.default=function(){console.log(three__WEBPACK_IMPORTED_MODULE_0__);var VIEWPORT_W=window.innerWidth,VIEWPORT_H=window.innerHeight,scene=new three__WEBPACK_IMPORTED_MODULE_0__.Scene;scene.fog=new three__WEBPACK_IMPORTED_MODULE_0__.Fog(11184810,.01,200);var camera=new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(45,VIEWPORT_W/VIEWPORT_H,.1,1e3);camera.position.x=-20,camera.position.y=15,camera.position.z=45,camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(10,0,0));var renderer=new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer;renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_0__.Color(11184895)),renderer.setSize(VIEWPORT_W,VIEWPORT_H),renderer.shadowMap.enabled=!0;var textureGrass=(new three__WEBPACK_IMPORTED_MODULE_0__.TextureLoader).load("./assets/grasslight-big.jpg");textureGrass.wrapS=three__WEBPACK_IMPORTED_MODULE_0__.RepeatWrapping,textureGrass.wrapT=three__WEBPACK_IMPORTED_MODULE_0__.RepeatWrapping,textureGrass.repeat.set(4,4);var planeGeometry=new three__WEBPACK_IMPORTED_MODULE_0__.PlaneGeometry(1e3,200,20,20),planeMaterial=new three__WEBPACK_IMPORTED_MODULE_0__.MeshLambertMaterial({map:textureGrass}),plane=new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(planeGeometry,planeMaterial);plane.rotation.x=-.5*Math.PI,plane.position.x=15,plane.position.y=-5,plane.position.z=0,plane.receiveShadow=!0,scene.add(plane);var cubeGeometry=new three__WEBPACK_IMPORTED_MODULE_0__.BoxGeometry(4,4,4),cubeMaterial=new three__WEBPACK_IMPORTED_MODULE_0__.MeshLambertMaterial({color:16724787}),cube=new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(cubeGeometry,cubeMaterial);cube.position.x=-4,cube.position.y=3,cube.position.z=0,cube.castShadow=!0,scene.add(cube);var sphereGeometry=new three__WEBPACK_IMPORTED_MODULE_0__.SphereGeometry(4,25,25),sphereMaterial=new three__WEBPACK_IMPORTED_MODULE_0__.MeshLambertMaterial({color:7829503}),sphere=new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(sphereGeometry,sphereMaterial);sphere.position.x=10,sphere.position.y=5,sphere.position.z=10,sphere.castShadow=!0,scene.add(sphere);var spotLight0=new three__WEBPACK_IMPORTED_MODULE_0__.SpotLight(13421772);spotLight0.position.set(-40,60,-10),spotLight0.lookAt(plane.position),scene.add(spotLight0),(new three__WEBPACK_IMPORTED_MODULE_0__.Object3D).position.set(5,0,0);var hemiLight=new three__WEBPACK_IMPORTED_MODULE_0__.HemisphereLight(255,65280,.6);hemiLight.position.set(0,500,0),scene.add(hemiLight);var dirLight=new three__WEBPACK_IMPORTED_MODULE_0__.DirectionalLight("#ffffff");dirLight.position.set(30,10,-50),dirLight.castShadow=!0,dirLight.target=plane,dirLight.shadow.camera.near=.1,dirLight.shadow.camera.far=200,dirLight.shadow.camera.left=-50,dirLight.shadow.camera.right=50,dirLight.shadow.camera.top=50,dirLight.shadow.camera.bottom=-50,dirLight.shadow.mapSize.width=2048,dirLight.shadow.mapSize.height=2048,scene.add(dirLight),document.getElementById("WebGL-output").appendChild(renderer.domElement);var statsObj,stats=((statsObj=new stats_js__WEBPACK_IMPORTED_MODULE_1__).showPanel(0),statsObj.dom.style.position="absolute",statsObj.dom.style.left="0px",statsObj.dom.style.top="0px",document.getElementById("Stats-output").appendChild(statsObj.dom),statsObj),controls={rotationSpeed:.03,bouncingSpeed:.03,hemisphere:!0,color:65280,skyColor:255,intensity:.6},gui=new dat_gui__WEBPACK_IMPORTED_MODULE_2__.a;gui.add(controls,"hemisphere").onChange((function(e){hemiLight.intensity=e?controls.intensity:0})),gui.addColor(controls,"color").onChange((function(e){hemiLight.groundColor=new three__WEBPACK_IMPORTED_MODULE_0__.Color(e)})),gui.addColor(controls,"skyColor").onChange((function(e){hemiLight.color=new three__WEBPACK_IMPORTED_MODULE_0__.Color(e)})),gui.add(controls,"intensity",0,5).onChange((function(e){hemiLight.intensity=e})),window.addEventListener("resize",(function(){camera.aspect=window.innerWidth/window.innerHeight,camera.updateProjectionMatrix(),renderer.setSize(window.innerWidth,window.innerHeight)}),!1);var step=0,renderScene=function(){stats.update(),cube.rotation.x+=controls.rotationSpeed,cube.rotation.y+=controls.rotationSpeed,cube.rotation.z+=controls.rotationSpeed,step+=controls.bouncingSpeed,sphere.position.x=20+10*Math.cos(step),sphere.position.y=2+10*Math.abs(Math.sin(step)),requestAnimationFrame(renderScene),renderer.render(scene,camera)};renderScene()}},719:function(module,exports,__webpack_require__){var f;module.exports=((f=function(){function e(a){return c.appendChild(a.dom),a}function u(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",c.addEventListener("click",(function(a){a.preventDefault(),u(++l%c.children.length)}),!1);var k=(performance||Date).now(),g=k,a=0,r=e(new f.Panel("FPS","#0ff","#002")),h=e(new f.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var t=e(new f.Panel("MB","#f08","#201"));return u(0),{REVISION:16,dom:c,addPanel:e,showPanel:u,begin:function(){k=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();if(h.update(c-k,200),c>g+1e3&&(r.update(1e3*a/(c-g),100),g=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){k=this.end()},domElement:c,setMode:u}}).Panel=function(e,f,l){var c=1/0,k=0,g=Math.round,a=g(window.devicePixelRatio||1),r=80*a,h=48*a,t=3*a,v=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r,q.height=h,q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");return b.font="bold "+9*a+"px Helvetica,Arial,sans-serif",b.textBaseline="top",b.fillStyle=l,b.fillRect(0,0,r,h),b.fillStyle=f,b.fillText(e,t,v),b.fillRect(d,m,n,p),b.fillStyle=l,b.globalAlpha=.9,b.fillRect(d,m,n,p),{dom:q,update:function(h,w){c=Math.min(c,h),k=Math.max(k,h),b.fillStyle=l,b.globalAlpha=1,b.fillRect(0,0,r,m),b.fillStyle=f,b.fillText(g(h)+" "+e+" ("+g(c)+"-"+g(k)+")",t,v),b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p),b.fillRect(d+n-a,m,a,p),b.fillStyle=l,b.globalAlpha=.9,b.fillRect(d+n-a,m,a,g((1-h/w)*p))}}},f)}}]);
//# sourceMappingURL=83.8b32cc48ff0431db967d.bundle.js.map
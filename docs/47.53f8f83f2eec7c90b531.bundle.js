(window.webpackJsonp=window.webpackJsonp||[]).push([[47],{233:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var three__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(598),stats_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(597),dat_gui__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(599);__webpack_exports__.default=function(){var VIEWPORT_W=window.innerWidth,VIEWPORT_H=window.innerHeight,stopMovingLight=!1,scene=new three__WEBPACK_IMPORTED_MODULE_0__.Scene,camera=new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(45,VIEWPORT_W/VIEWPORT_H,.1,1e3);camera.position.x=-35,camera.position.y=30,camera.position.z=25,camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(10,0,0));var renderer=new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer;renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_0__.Color(15658734)),renderer.setSize(VIEWPORT_W,VIEWPORT_H),renderer.shadowMap.enabled=!0,renderer.shadowMap.type=three__WEBPACK_IMPORTED_MODULE_0__.PCFShadowMap;var planeGeometry=new three__WEBPACK_IMPORTED_MODULE_0__.PlaneGeometry(60,20,1,1),planeMaterial=new three__WEBPACK_IMPORTED_MODULE_0__.MeshLambertMaterial({color:16777215}),plane=new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(planeGeometry,planeMaterial);plane.rotation.x=-.5*Math.PI,plane.position.x=15,plane.position.y=0,plane.position.z=0,plane.receiveShadow=!0,scene.add(plane);var cubeGeometry=new three__WEBPACK_IMPORTED_MODULE_0__.BoxGeometry(4,4,4),cubeMaterial=new three__WEBPACK_IMPORTED_MODULE_0__.MeshLambertMaterial({color:16724787}),cube=new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(cubeGeometry,cubeMaterial);cube.position.x=-4,cube.position.y=3,cube.position.z=0,cube.castShadow=!0,scene.add(cube);var sphereGeometry=new three__WEBPACK_IMPORTED_MODULE_0__.SphereGeometry(4,20,20),sphereMaterial=new three__WEBPACK_IMPORTED_MODULE_0__.MeshLambertMaterial({color:7829503}),sphere=new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(sphereGeometry,sphereMaterial);sphere.position.x=20,sphere.position.y=0,sphere.position.z=2,sphere.castShadow=!0,scene.add(sphere);var ambientLight=new three__WEBPACK_IMPORTED_MODULE_0__.AmbientLight("#1c1c1c");scene.add(ambientLight);var spotLight0=new three__WEBPACK_IMPORTED_MODULE_0__.SpotLight(13421772);spotLight0.position.set(-40,30,-10),spotLight0.lookAt(plane.position),scene.add(spotLight0),(new three__WEBPACK_IMPORTED_MODULE_0__.Object3D).position.set(5,0,0);var spotLight=new three__WEBPACK_IMPORTED_MODULE_0__.SpotLight("#ffffff");spotLight.position.set(-40,60,-10),spotLight.castShadow=!0,spotLight.shadow.camera.near=2,spotLight.shadow.camera.far=200,spotLight.shadow.camera.fov=30,spotLight.target=plane,spotLight.decay=1,spotLight.distance=0,spotLight.angle=.4,scene.add(spotLight);var cameraHelper=new three__WEBPACK_IMPORTED_MODULE_0__.CameraHelper(spotLight.shadow.camera);cameraHelper.visible=!1,scene.add(cameraHelper);var sphereLight=new three__WEBPACK_IMPORTED_MODULE_0__.SphereGeometry(.2),sphereLightMaterial=new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({color:11299877}),sphereLightMesh=new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(sphereLight,sphereLightMaterial);sphereLightMesh.castShadow=!0,sphereLightMesh.position.set(3,20,3),scene.add(sphereLightMesh),document.getElementById("WebGL-output").appendChild(renderer.domElement);var statsObj,stats=((statsObj=new stats_js__WEBPACK_IMPORTED_MODULE_1__).showPanel(0),statsObj.dom.style.position="absolute",statsObj.dom.style.left="0px",statsObj.dom.style.top="0px",document.getElementById("Stats-output").appendChild(statsObj.dom),statsObj),controls={rotationSpeed:.03,bouncingSpeed:.03,ambientColor:"#1c1c1c",pointColor:"#ffffff",intensity:1,decay:1,distance:0,penumbra:30,angle:.1,debug:!1,castShadow:!0,target:"Plane",stopMovingLight:!1},gui=new dat_gui__WEBPACK_IMPORTED_MODULE_2__.a;gui.addColor(controls,"ambientColor").onChange((function(e){ambientLight.color=new three__WEBPACK_IMPORTED_MODULE_0__.Color(e)})),gui.addColor(controls,"pointColor").onChange((function(e){spotLight.color=new three__WEBPACK_IMPORTED_MODULE_0__.Color(e)})),gui.add(controls,"angle",0,2*Math.PI).onChange((function(e){spotLight.angle=e})),gui.add(controls,"intensity",0,3).onChange((function(e){spotLight.intensity=e})),gui.add(controls,"decay",1,100).onChange((function(e){spotLight.decay=e})),gui.add(controls,"distance",0,100).onChange((function(e){spotLight.distance=e})),gui.add(controls,"penumbra",0,100).onChange((function(e){spotLight.penumbra=e})),gui.add(controls,"debug").onChange((function(e){cameraHelper.visible=e})),gui.add(controls,"castShadow").onChange((function(e){spotLight.castShadow=e})),gui.add(controls,"target",["Plane","Sphere","Cube"]).onChange((function(e){switch(console.log(e),e){case"Plane":spotLight.target=plane;break;case"Sphere":spotLight.target=sphere;break;case"Cube":spotLight.target=cube}})),gui.add(controls,"stopMovingLight").onChange((function(e){stopMovingLight=e})),window.addEventListener("resize",(function(){camera.aspect=window.innerWidth/window.innerHeight,camera.updateProjectionMatrix(),renderer.setSize(window.innerWidth,window.innerHeight)}),!1);var step=0,invert=1,phase=0,renderScene=function(){if(stats.update(),cube.rotation.x+=controls.rotationSpeed,cube.rotation.y+=controls.rotationSpeed,cube.rotation.z+=controls.rotationSpeed,step+=controls.bouncingSpeed,sphere.position.x=20+10*Math.cos(step),sphere.position.y=2+10*Math.abs(Math.sin(step)),!stopMovingLight){if(phase>2*Math.PI?(invert*=-1,phase-=2*Math.PI):phase+=controls.rotationSpeed,sphereLightMesh.position.z=7*Math.sin(phase),sphereLightMesh.position.x=14*Math.cos(phase),sphereLightMesh.position.y=10,invert<0){sphereLightMesh.position.x=invert*(sphereLightMesh.position.x-14)+14}spotLight.position.copy(sphereLightMesh.position)}requestAnimationFrame(renderScene),renderer.render(scene,camera)};renderScene()}},597:function(module,exports,__webpack_require__){var f;module.exports=((f=function(){function e(a){return c.appendChild(a.dom),a}function u(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",c.addEventListener("click",(function(a){a.preventDefault(),u(++l%c.children.length)}),!1);var k=(performance||Date).now(),g=k,a=0,r=e(new f.Panel("FPS","#0ff","#002")),h=e(new f.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var t=e(new f.Panel("MB","#f08","#201"));return u(0),{REVISION:16,dom:c,addPanel:e,showPanel:u,begin:function(){k=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();if(h.update(c-k,200),c>g+1e3&&(r.update(1e3*a/(c-g),100),g=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){k=this.end()},domElement:c,setMode:u}}).Panel=function(e,f,l){var c=1/0,k=0,g=Math.round,a=g(window.devicePixelRatio||1),r=80*a,h=48*a,t=3*a,v=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r,q.height=h,q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");return b.font="bold "+9*a+"px Helvetica,Arial,sans-serif",b.textBaseline="top",b.fillStyle=l,b.fillRect(0,0,r,h),b.fillStyle=f,b.fillText(e,t,v),b.fillRect(d,m,n,p),b.fillStyle=l,b.globalAlpha=.9,b.fillRect(d,m,n,p),{dom:q,update:function(h,w){c=Math.min(c,h),k=Math.max(k,h),b.fillStyle=l,b.globalAlpha=1,b.fillRect(0,0,r,m),b.fillStyle=f,b.fillText(g(h)+" "+e+" ("+g(c)+"-"+g(k)+")",t,v),b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p),b.fillRect(d+n-a,m,a,p),b.fillStyle=l,b.globalAlpha=.9,b.fillRect(d+n-a,m,a,g((1-h/w)*p))}}},f)}}]);
//# sourceMappingURL=47.53f8f83f2eec7c90b531.bundle.js.map
(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{283:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var three__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(715),stats_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(716),_node_modules_three_examples_jsm_controls_FirstPersonControls__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(766);__webpack_exports__.default=function(){var VIEWPORT_W=window.innerWidth,VIEWPORT_H=window.innerHeight,clock=new three__WEBPACK_IMPORTED_MODULE_0__.Clock,scene=new three__WEBPACK_IMPORTED_MODULE_0__.Scene;scene.fog=new three__WEBPACK_IMPORTED_MODULE_0__.FogExp2(0,.0035);var camera=new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(50,VIEWPORT_W/VIEWPORT_H,1,1e4);camera.position.set(-200,25,0),scene.add(camera);var listener1=new three__WEBPACK_IMPORTED_MODULE_0__.AudioListener;camera.add(listener1);var listener2=new three__WEBPACK_IMPORTED_MODULE_0__.AudioListener;camera.add(listener2);var listener3=new three__WEBPACK_IMPORTED_MODULE_0__.AudioListener;camera.add(listener3);var controls=new _node_modules_three_examples_jsm_controls_FirstPersonControls__WEBPACK_IMPORTED_MODULE_2__.a(camera);controls.movementSpeed=70,controls.lookSpeed=.15,controls.lookVertical=!1;var renderer=new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer({antialias:!0});renderer.setSize(VIEWPORT_W,VIEWPORT_H);var light=new three__WEBPACK_IMPORTED_MODULE_0__.DirectionalLight(16777215);light.position.set(0,.5,1).normalize(),scene.add(light),document.getElementById("WebGL-output").appendChild(renderer.domElement);var cube=new three__WEBPACK_IMPORTED_MODULE_0__.BoxGeometry(40,40,40),textureLoader=new three__WEBPACK_IMPORTED_MODULE_0__.TextureLoader,material1=new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({color:16777215,map:textureLoader.load("./assets/tex/cow.png")}),material_2=new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({color:16777215,map:textureLoader.load("./assets/tex/dog.jpg")}),material_3=new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({color:16777215,map:textureLoader.load("./assets/tex/cat.jpg")}),mesh1=new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(cube,material1);mesh1.position.set(0,20,100);var mesh2=new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(cube,material_2);mesh2.position.set(0,20,0);var mesh3=new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(cube,material_3);mesh3.position.set(0,20,-100),scene.add(mesh1),scene.add(mesh2),scene.add(mesh3);var consoleXHR=function(xhr){console.log(xhr.loaded/xhr.total*100+"% loaded")},consoleErr=function(){console.log("An error happened")},audioLoader=new three__WEBPACK_IMPORTED_MODULE_0__.AudioLoader,sound1=new three__WEBPACK_IMPORTED_MODULE_0__.PositionalAudio(listener1);audioLoader.load("./assets/cow.ogg",(function(audioBuffer){sound1.autoplay=!0,sound1.setBuffer(audioBuffer),sound1.setRefDistance(20),sound1.setLoop(!0),sound1.setRolloffFactor(2),sound1.play(),mesh1.add(sound1)}),consoleXHR,consoleErr);var sound2=new three__WEBPACK_IMPORTED_MODULE_0__.PositionalAudio(listener2);audioLoader.load("./assets/dog.ogg",(function(audioBuffer){sound2.autoplay=!0,sound2.setBuffer(audioBuffer),sound2.setRefDistance(20),sound2.setLoop(!0),sound2.setRolloffFactor(2),sound2.play(),mesh2.add(sound2)}),consoleXHR,consoleErr);var sound3=new three__WEBPACK_IMPORTED_MODULE_0__.PositionalAudio(listener3);audioLoader.load("./assets/cat.ogg",(function(audioBuffer){sound3.setBuffer(audioBuffer),sound3.setRefDistance(20),sound3.setLoop(!0),sound3.setRolloffFactor(2),sound3.play(),mesh3.add(sound3)}),consoleXHR,consoleErr);var helper=new three__WEBPACK_IMPORTED_MODULE_0__.GridHelper(500,10,4473924,4473924);helper.position.y=.1,scene.add(helper);var statsObj,stats=((statsObj=new stats_js__WEBPACK_IMPORTED_MODULE_1__).showPanel(0),statsObj.dom.style.position="absolute",statsObj.dom.style.left="0px",statsObj.dom.style.top="0px",document.getElementById("Stats-output").appendChild(statsObj.dom),statsObj);window.addEventListener("resize",(function(){camera.aspect=window.innerWidth/window.innerHeight,camera.updateProjectionMatrix(),renderer.setSize(window.innerWidth,window.innerHeight)}),!1);var renderScene=function(){stats.update();var delta=clock.getDelta();controls.update(delta),requestAnimationFrame(renderScene),renderer.render(scene,camera)};renderScene()}},716:function(module,exports,__webpack_require__){var f;module.exports=((f=function(){function e(a){return c.appendChild(a.dom),a}function u(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",c.addEventListener("click",(function(a){a.preventDefault(),u(++l%c.children.length)}),!1);var k=(performance||Date).now(),g=k,a=0,r=e(new f.Panel("FPS","#0ff","#002")),h=e(new f.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var t=e(new f.Panel("MB","#f08","#201"));return u(0),{REVISION:16,dom:c,addPanel:e,showPanel:u,begin:function(){k=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();if(h.update(c-k,200),c>g+1e3&&(r.update(1e3*a/(c-g),100),g=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){k=this.end()},domElement:c,setMode:u}}).Panel=function(e,f,l){var c=1/0,k=0,g=Math.round,a=g(window.devicePixelRatio||1),r=80*a,h=48*a,t=3*a,v=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r,q.height=h,q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");return b.font="bold "+9*a+"px Helvetica,Arial,sans-serif",b.textBaseline="top",b.fillStyle=l,b.fillRect(0,0,r,h),b.fillStyle=f,b.fillText(e,t,v),b.fillRect(d,m,n,p),b.fillStyle=l,b.globalAlpha=.9,b.fillRect(d,m,n,p),{dom:q,update:function(h,w){c=Math.min(c,h),k=Math.max(k,h),b.fillStyle=l,b.globalAlpha=1,b.fillRect(0,0,r,m),b.fillStyle=f,b.fillText(g(h)+" "+e+" ("+g(c)+"-"+g(k)+")",t,v),b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p),b.fillRect(d+n-a,m,a,p),b.fillStyle=l,b.globalAlpha=.9,b.fillRect(d+n-a,m,a,g((1-h/w)*p))}}},f)},766:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return FirstPersonControls}));var _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(715),FirstPersonControls=function(object,domElement){this.object=object,this.domElement=void 0!==domElement?domElement:document,this.enabled=!0,this.movementSpeed=1,this.lookSpeed=.005,this.lookVertical=!0,this.autoForward=!1,this.activeLook=!0,this.heightSpeed=!1,this.heightCoef=1,this.heightMin=0,this.heightMax=1,this.constrainVertical=!1,this.verticalMin=0,this.verticalMax=Math.PI,this.mouseDragOn=!1,this.autoSpeedFactor=0,this.mouseX=0,this.mouseY=0,this.moveForward=!1,this.moveBackward=!1,this.moveLeft=!1,this.moveRight=!1,this.viewHalfX=0,this.viewHalfY=0;var targetPosition,lat=0,lon=0,lookDirection=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector3,spherical=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Spherical,target=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector3;function contextmenu(event){event.preventDefault()}this.domElement!==document&&this.domElement.setAttribute("tabindex",-1),this.handleResize=function(){this.domElement===document?(this.viewHalfX=window.innerWidth/2,this.viewHalfY=window.innerHeight/2):(this.viewHalfX=this.domElement.offsetWidth/2,this.viewHalfY=this.domElement.offsetHeight/2)},this.onMouseDown=function(event){if(this.domElement!==document&&this.domElement.focus(),event.preventDefault(),event.stopPropagation(),this.activeLook)switch(event.button){case 0:this.moveForward=!0;break;case 2:this.moveBackward=!0}this.mouseDragOn=!0},this.onMouseUp=function(event){if(event.preventDefault(),event.stopPropagation(),this.activeLook)switch(event.button){case 0:this.moveForward=!1;break;case 2:this.moveBackward=!1}this.mouseDragOn=!1},this.onMouseMove=function(event){this.domElement===document?(this.mouseX=event.pageX-this.viewHalfX,this.mouseY=event.pageY-this.viewHalfY):(this.mouseX=event.pageX-this.domElement.offsetLeft-this.viewHalfX,this.mouseY=event.pageY-this.domElement.offsetTop-this.viewHalfY)},this.onKeyDown=function(event){switch(event.keyCode){case 38:case 87:this.moveForward=!0;break;case 37:case 65:this.moveLeft=!0;break;case 40:case 83:this.moveBackward=!0;break;case 39:case 68:this.moveRight=!0;break;case 82:this.moveUp=!0;break;case 70:this.moveDown=!0}},this.onKeyUp=function(event){switch(event.keyCode){case 38:case 87:this.moveForward=!1;break;case 37:case 65:this.moveLeft=!1;break;case 40:case 83:this.moveBackward=!1;break;case 39:case 68:this.moveRight=!1;break;case 82:this.moveUp=!1;break;case 70:this.moveDown=!1}},this.lookAt=function(x,y,z){return x.isVector3?target.copy(x):target.set(x,y,z),this.object.lookAt(target),setOrientation(this),this},this.update=(targetPosition=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector3,function update(delta){if(!1!==this.enabled){if(this.heightSpeed){var heightDelta=_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Math.clamp(this.object.position.y,this.heightMin,this.heightMax)-this.heightMin;this.autoSpeedFactor=delta*(heightDelta*this.heightCoef)}else this.autoSpeedFactor=0;var actualMoveSpeed=delta*this.movementSpeed;(this.moveForward||this.autoForward&&!this.moveBackward)&&this.object.translateZ(-(actualMoveSpeed+this.autoSpeedFactor)),this.moveBackward&&this.object.translateZ(actualMoveSpeed),this.moveLeft&&this.object.translateX(-actualMoveSpeed),this.moveRight&&this.object.translateX(actualMoveSpeed),this.moveUp&&this.object.translateY(actualMoveSpeed),this.moveDown&&this.object.translateY(-actualMoveSpeed);var actualLookSpeed=delta*this.lookSpeed;this.activeLook||(actualLookSpeed=0);var verticalLookRatio=1;this.constrainVertical&&(verticalLookRatio=Math.PI/(this.verticalMax-this.verticalMin)),lon-=this.mouseX*actualLookSpeed,this.lookVertical&&(lat-=this.mouseY*actualLookSpeed*verticalLookRatio),lat=Math.max(-85,Math.min(85,lat));var phi=_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Math.degToRad(90-lat),theta=_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Math.degToRad(lon);this.constrainVertical&&(phi=_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Math.mapLinear(phi,0,Math.PI,this.verticalMin,this.verticalMax));var position=this.object.position;targetPosition.setFromSphericalCoords(1,phi,theta).add(position),this.object.lookAt(targetPosition)}}),this.dispose=function(){this.domElement.removeEventListener("contextmenu",contextmenu,!1),this.domElement.removeEventListener("mousedown",_onMouseDown,!1),this.domElement.removeEventListener("mousemove",_onMouseMove,!1),this.domElement.removeEventListener("mouseup",_onMouseUp,!1),window.removeEventListener("keydown",_onKeyDown,!1),window.removeEventListener("keyup",_onKeyUp,!1)};var _onMouseMove=bind(this,this.onMouseMove),_onMouseDown=bind(this,this.onMouseDown),_onMouseUp=bind(this,this.onMouseUp),_onKeyDown=bind(this,this.onKeyDown),_onKeyUp=bind(this,this.onKeyUp);function bind(scope,fn){return function(){fn.apply(scope,arguments)}}function setOrientation(controls){var quaternion=controls.object.quaternion;lookDirection.set(0,0,-1).applyQuaternion(quaternion),spherical.setFromVector3(lookDirection),lat=90-_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Math.radToDeg(spherical.phi),lon=_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Math.radToDeg(spherical.theta)}this.domElement.addEventListener("contextmenu",contextmenu,!1),this.domElement.addEventListener("mousemove",_onMouseMove,!1),this.domElement.addEventListener("mousedown",_onMouseDown,!1),this.domElement.addEventListener("mouseup",_onMouseUp,!1),window.addEventListener("keydown",_onKeyDown,!1),window.addEventListener("keyup",_onKeyUp,!1),this.handleResize(),setOrientation(this)}}}]);
//# sourceMappingURL=24.9e01d65455ee9e771bf0.bundle.js.map
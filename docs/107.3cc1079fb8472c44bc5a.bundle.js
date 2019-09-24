(window.webpackJsonp=window.webpackJsonp||[]).push([[107],{345:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var three_module=__webpack_require__(691),stats_min=__webpack_require__(690),chroma=__webpack_require__(706),OBJLoader=__webpack_require__(697),MTLLoader=__webpack_require__(701),FirstPersonControls=function(object,domElement){this.object=object,this.domElement=void 0!==domElement?domElement:document,this.enabled=!0,this.movementSpeed=1,this.lookSpeed=.005,this.lookVertical=!0,this.autoForward=!1,this.activeLook=!0,this.heightSpeed=!1,this.heightCoef=1,this.heightMin=0,this.heightMax=1,this.constrainVertical=!1,this.verticalMin=0,this.verticalMax=Math.PI,this.autoSpeedFactor=0,this.mouseX=0,this.mouseY=0,this.moveForward=!1,this.moveBackward=!1,this.moveLeft=!1,this.moveRight=!1,this.mouseDragOn=!1,this.viewHalfX=0,this.viewHalfY=0;var targetPosition,lat=0,lon=0,lookDirection=new three_module.Vector3,spherical=new three_module.Spherical,target=new three_module.Vector3;function contextmenu(event){event.preventDefault()}this.domElement!==document&&this.domElement.setAttribute("tabindex",-1),this.handleResize=function(){this.domElement===document?(this.viewHalfX=window.innerWidth/2,this.viewHalfY=window.innerHeight/2):(this.viewHalfX=this.domElement.offsetWidth/2,this.viewHalfY=this.domElement.offsetHeight/2)},this.onMouseDown=function(event){if(this.domElement!==document&&this.domElement.focus(),event.preventDefault(),event.stopPropagation(),this.activeLook)switch(event.button){case 0:this.moveForward=!0;break;case 2:this.moveBackward=!0}this.mouseDragOn=!0},this.onMouseUp=function(event){if(event.preventDefault(),event.stopPropagation(),this.activeLook)switch(event.button){case 0:this.moveForward=!1;break;case 2:this.moveBackward=!1}this.mouseDragOn=!1},this.onMouseMove=function(event){this.domElement===document?(this.mouseX=event.pageX-this.viewHalfX,this.mouseY=event.pageY-this.viewHalfY):(this.mouseX=event.pageX-this.domElement.offsetLeft-this.viewHalfX,this.mouseY=event.pageY-this.domElement.offsetTop-this.viewHalfY)},this.onKeyDown=function(event){switch(event.keyCode){case 38:case 87:this.moveForward=!0;break;case 37:case 65:this.moveLeft=!0;break;case 40:case 83:this.moveBackward=!0;break;case 39:case 68:this.moveRight=!0;break;case 82:this.moveUp=!0;break;case 70:this.moveDown=!0}},this.onKeyUp=function(event){switch(event.keyCode){case 38:case 87:this.moveForward=!1;break;case 37:case 65:this.moveLeft=!1;break;case 40:case 83:this.moveBackward=!1;break;case 39:case 68:this.moveRight=!1;break;case 82:this.moveUp=!1;break;case 70:this.moveDown=!1}},this.lookAt=function(x,y,z){return x.isVector3?target.copy(x):target.set(x,y,z),this.object.lookAt(target),setOrientation(this),this},this.update=(targetPosition=new three_module.Vector3,function update(delta){if(!1!==this.enabled){if(this.heightSpeed){var heightDelta=three_module.Math.clamp(this.object.position.y,this.heightMin,this.heightMax)-this.heightMin;this.autoSpeedFactor=delta*(heightDelta*this.heightCoef)}else this.autoSpeedFactor=0;var actualMoveSpeed=delta*this.movementSpeed;(this.moveForward||this.autoForward&&!this.moveBackward)&&this.object.translateZ(-(actualMoveSpeed+this.autoSpeedFactor)),this.moveBackward&&this.object.translateZ(actualMoveSpeed),this.moveLeft&&this.object.translateX(-actualMoveSpeed),this.moveRight&&this.object.translateX(actualMoveSpeed),this.moveUp&&this.object.translateY(actualMoveSpeed),this.moveDown&&this.object.translateY(-actualMoveSpeed);var actualLookSpeed=delta*this.lookSpeed;this.activeLook||(actualLookSpeed=0);var verticalLookRatio=1;this.constrainVertical&&(verticalLookRatio=Math.PI/(this.verticalMax-this.verticalMin)),lon-=this.mouseX*actualLookSpeed,this.lookVertical&&(lat-=this.mouseY*actualLookSpeed*verticalLookRatio),lat=Math.max(-85,Math.min(85,lat));var phi=three_module.Math.degToRad(90-lat),theta=three_module.Math.degToRad(lon);this.constrainVertical&&(phi=three_module.Math.mapLinear(phi,0,Math.PI,this.verticalMin,this.verticalMax));var position=this.object.position;targetPosition.setFromSphericalCoords(1,phi,theta).add(position),this.object.lookAt(targetPosition)}}),this.dispose=function(){this.domElement.removeEventListener("contextmenu",contextmenu,!1),this.domElement.removeEventListener("mousedown",_onMouseDown,!1),this.domElement.removeEventListener("mousemove",_onMouseMove,!1),this.domElement.removeEventListener("mouseup",_onMouseUp,!1),window.removeEventListener("keydown",_onKeyDown,!1),window.removeEventListener("keyup",_onKeyUp,!1)};var _onMouseMove=bind(this,this.onMouseMove),_onMouseDown=bind(this,this.onMouseDown),_onMouseUp=bind(this,this.onMouseUp),_onKeyDown=bind(this,this.onKeyDown),_onKeyUp=bind(this,this.onKeyUp);function bind(scope,fn){return function(){fn.apply(scope,arguments)}}function setOrientation(controls){var quaternion=controls.object.quaternion;lookDirection.set(0,0,-1).applyQuaternion(quaternion),spherical.setFromVector3(lookDirection),lat=90-three_module.Math.radToDeg(spherical.phi),lon=three_module.Math.radToDeg(spherical.theta)}this.domElement.addEventListener("contextmenu",contextmenu,!1),this.domElement.addEventListener("mousemove",_onMouseMove,!1),this.domElement.addEventListener("mousedown",_onMouseDown,!1),this.domElement.addEventListener("mouseup",_onMouseUp,!1),window.addEventListener("keydown",_onKeyDown,!1),window.addEventListener("keyup",_onKeyUp,!1),this.handleResize(),setOrientation(this)};__webpack_exports__.default=function(){var VIEWPORT_W=window.innerWidth,VIEWPORT_H=window.innerHeight,clock=new three_module.Clock,scene=new three_module.Scene,camera=new three_module.PerspectiveCamera(45,VIEWPORT_W/VIEWPORT_H,.1,1e3);camera.position.x=100,camera.position.y=10,camera.position.z=10,camera.lookAt(new three_module.Vector3(0,0,0));var renderer=new three_module.WebGLRenderer;renderer.setClearColor(new three_module.Color(0)),renderer.setSize(VIEWPORT_W,VIEWPORT_H),renderer.shadowMap.enabled=!0;var camControls=new FirstPersonControls(camera);camControls.lookSpeed=.4,camControls.movementSpeed=20,camControls.lookVertical=!0,camControls.constrainVertical=!0,camControls.verticalMin=1,camControls.verticalMax=2;var ambientLight=new three_module.AmbientLight(3684408);scene.add(ambientLight);var spotLight=new three_module.SpotLight(16777215);spotLight.position.set(100,140,130),spotLight.intensity=2,scene.add(spotLight),document.getElementById("WebGL-output").appendChild(renderer.domElement);var mesh,setRandomColors=function(object,scale){var children=object.children;children&&children.length>0?children.forEach((function(e){setRandomColors(e,scale)})):object instanceof three_module.Mesh&&_setRandomColors(object.material,scale)},_setRandomColors=function(material,scale){material instanceof three_module.MultiMaterial?material.materials.forEach((function(mat){_setRandomColors(mat,scale)})):(material.color=new three_module.Color(scale(Math.random()).hex()),material.name&&0==material.name.indexOf("building")&&(material.emissive=new three_module.Color(4473924),material.transparent=!0,material.opacity=.8))},load=function(object){var scale=chroma.scale(["red","green","blue"]);setRandomColors(object,scale),mesh=object,scene.add(mesh)};(new three_module.TextureLoader).load("./assets/tex/metro01.jpg"),(new MTLLoader.a).load("./assets/city.mtl",(function(materials){materials.preload();var objLoader=new OBJLoader.a;objLoader.setMaterials(materials),objLoader.load("./assets/city.obj",load)}));var statsObj,stats=((statsObj=new stats_min).showPanel(0),statsObj.dom.style.position="absolute",statsObj.dom.style.left="0px",statsObj.dom.style.top="0px",document.getElementById("Stats-output").appendChild(statsObj.dom),statsObj);window.addEventListener("resize",(function(){camera.aspect=window.innerWidth/window.innerHeight,camera.updateProjectionMatrix(),renderer.setSize(window.innerWidth,window.innerHeight)}),!1);var renderScene=function(){stats.update();var delta=clock.getDelta();camControls.update(delta),renderer.clear(),requestAnimationFrame(renderScene),renderer.render(scene,camera)};renderScene()}}}]);
//# sourceMappingURL=107.3cc1079fb8472c44bc5a.bundle.js.map
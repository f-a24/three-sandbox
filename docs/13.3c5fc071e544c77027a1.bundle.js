(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{385:function(module,exports,__webpack_require__){var f;module.exports=((f=function(){function e(a){return c.appendChild(a.dom),a}function u(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",c.addEventListener("click",function(a){a.preventDefault(),u(++l%c.children.length)},!1);var k=(performance||Date).now(),g=k,a=0,r=e(new f.Panel("FPS","#0ff","#002")),h=e(new f.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var t=e(new f.Panel("MB","#f08","#201"));return u(0),{REVISION:16,dom:c,addPanel:e,showPanel:u,begin:function(){k=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();if(h.update(c-k,200),c>g+1e3&&(r.update(1e3*a/(c-g),100),g=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){k=this.end()},domElement:c,setMode:u}}).Panel=function(e,f,l){var c=1/0,k=0,g=Math.round,a=g(window.devicePixelRatio||1),r=80*a,h=48*a,t=3*a,v=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r,q.height=h,q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");return b.font="bold "+9*a+"px Helvetica,Arial,sans-serif",b.textBaseline="top",b.fillStyle=l,b.fillRect(0,0,r,h),b.fillStyle=f,b.fillText(e,t,v),b.fillRect(d,m,n,p),b.fillStyle=l,b.globalAlpha=.9,b.fillRect(d,m,n,p),{dom:q,update:function(h,w){c=Math.min(c,h),k=Math.max(k,h),b.fillStyle=l,b.globalAlpha=1,b.fillRect(0,0,r,m),b.fillStyle=f,b.fillText(g(h)+" "+e+" ("+g(c)+"-"+g(k)+")",t,v),b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p),b.fillRect(d+n-a,m,a,p),b.fillStyle=l,b.globalAlpha=.9,b.fillRect(d+n-a,m,a,g((1-h/w)*p))}}},f)},389:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",function(){return OrbitControls});var _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(386),OrbitControls=function(object,domElement){var offset,quat,quatInverse,lastPosition,lastQuaternion;this.object=object,this.domElement=void 0!==domElement?domElement:document,this.enabled=!0,this.target=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector3,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.25,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!1,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.enableKeys=!0,this.keys={LEFT:37,UP:38,RIGHT:39,BOTTOM:40},this.mouseButtons={LEFT:_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.MOUSE.LEFT,MIDDLE:_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.MOUSE.MIDDLE,RIGHT:_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.MOUSE.RIGHT},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this.getPolarAngle=function(){return spherical.phi},this.getAzimuthalAngle=function(){return spherical.theta},this.saveState=function(){scope.target0.copy(scope.target),scope.position0.copy(scope.object.position),scope.zoom0=scope.object.zoom},this.reset=function(){scope.target.copy(scope.target0),scope.object.position.copy(scope.position0),scope.object.zoom=scope.zoom0,scope.object.updateProjectionMatrix(),scope.dispatchEvent(changeEvent),scope.update(),state=STATE.NONE},this.update=(offset=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector3,quat=(new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Quaternion).setFromUnitVectors(object.up,new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector3(0,1,0)),quatInverse=quat.clone().inverse(),lastPosition=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector3,lastQuaternion=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Quaternion,function update(){var position=scope.object.position;return offset.copy(position).sub(scope.target),offset.applyQuaternion(quat),spherical.setFromVector3(offset),scope.autoRotate&&state===STATE.NONE&&rotateLeft(function getAutoRotationAngle(){return 2*Math.PI/60/60*scope.autoRotateSpeed}()),spherical.theta+=sphericalDelta.theta,spherical.phi+=sphericalDelta.phi,spherical.theta=Math.max(scope.minAzimuthAngle,Math.min(scope.maxAzimuthAngle,spherical.theta)),spherical.phi=Math.max(scope.minPolarAngle,Math.min(scope.maxPolarAngle,spherical.phi)),spherical.makeSafe(),spherical.radius*=scale,spherical.radius=Math.max(scope.minDistance,Math.min(scope.maxDistance,spherical.radius)),scope.target.add(panOffset),offset.setFromSpherical(spherical),offset.applyQuaternion(quatInverse),position.copy(scope.target).add(offset),scope.object.lookAt(scope.target),!0===scope.enableDamping?(sphericalDelta.theta*=1-scope.dampingFactor,sphericalDelta.phi*=1-scope.dampingFactor,panOffset.multiplyScalar(1-scope.dampingFactor)):(sphericalDelta.set(0,0,0),panOffset.set(0,0,0)),scale=1,!!(zoomChanged||lastPosition.distanceToSquared(scope.object.position)>EPS||8*(1-lastQuaternion.dot(scope.object.quaternion))>EPS)&&(scope.dispatchEvent(changeEvent),lastPosition.copy(scope.object.position),lastQuaternion.copy(scope.object.quaternion),zoomChanged=!1,!0)}),this.dispose=function(){scope.domElement.removeEventListener("contextmenu",onContextMenu,!1),scope.domElement.removeEventListener("mousedown",onMouseDown,!1),scope.domElement.removeEventListener("wheel",onMouseWheel,!1),scope.domElement.removeEventListener("touchstart",onTouchStart,!1),scope.domElement.removeEventListener("touchend",onTouchEnd,!1),scope.domElement.removeEventListener("touchmove",onTouchMove,!1),document.removeEventListener("mousemove",onMouseMove,!1),document.removeEventListener("mouseup",onMouseUp,!1),window.removeEventListener("keydown",onKeyDown,!1)};var scope=this,changeEvent={type:"change"},startEvent={type:"start"},endEvent={type:"end"},STATE={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_DOLLY_PAN:4},state=STATE.NONE,EPS=1e-6,spherical=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Spherical,sphericalDelta=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Spherical,scale=1,panOffset=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector3,zoomChanged=!1,rotateStart=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector2,rotateEnd=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector2,rotateDelta=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector2,panStart=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector2,panEnd=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector2,panDelta=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector2,dollyStart=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector2,dollyEnd=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector2,dollyDelta=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector2;function getZoomScale(){return Math.pow(.95,scope.zoomSpeed)}function rotateLeft(angle){sphericalDelta.theta-=angle}function rotateUp(angle){sphericalDelta.phi-=angle}var v,panLeft=(v=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector3,function panLeft(distance,objectMatrix){v.setFromMatrixColumn(objectMatrix,0),v.multiplyScalar(-distance),panOffset.add(v)}),panUp=function(){var v=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector3;return function panUp(distance,objectMatrix){!0===scope.screenSpacePanning?v.setFromMatrixColumn(objectMatrix,1):(v.setFromMatrixColumn(objectMatrix,0),v.crossVectors(scope.object.up,v)),v.multiplyScalar(distance),panOffset.add(v)}}(),pan=function(){var offset=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector3;return function pan(deltaX,deltaY){var element=scope.domElement===document?scope.domElement.body:scope.domElement;if(scope.object.isPerspectiveCamera){var position=scope.object.position;offset.copy(position).sub(scope.target);var targetDistance=offset.length();targetDistance*=Math.tan(scope.object.fov/2*Math.PI/180),panLeft(2*deltaX*targetDistance/element.clientHeight,scope.object.matrix),panUp(2*deltaY*targetDistance/element.clientHeight,scope.object.matrix)}else scope.object.isOrthographicCamera?(panLeft(deltaX*(scope.object.right-scope.object.left)/scope.object.zoom/element.clientWidth,scope.object.matrix),panUp(deltaY*(scope.object.top-scope.object.bottom)/scope.object.zoom/element.clientHeight,scope.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),scope.enablePan=!1)}}();function dollyIn(dollyScale){scope.object.isPerspectiveCamera?scale/=dollyScale:scope.object.isOrthographicCamera?(scope.object.zoom=Math.max(scope.minZoom,Math.min(scope.maxZoom,scope.object.zoom*dollyScale)),scope.object.updateProjectionMatrix(),zoomChanged=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),scope.enableZoom=!1)}function dollyOut(dollyScale){scope.object.isPerspectiveCamera?scale*=dollyScale:scope.object.isOrthographicCamera?(scope.object.zoom=Math.max(scope.minZoom,Math.min(scope.maxZoom,scope.object.zoom/dollyScale)),scope.object.updateProjectionMatrix(),zoomChanged=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),scope.enableZoom=!1)}function handleMouseDownPan(event){panStart.set(event.clientX,event.clientY)}function onMouseDown(event){if(!1!==scope.enabled){switch(event.preventDefault(),scope.domElement.focus?scope.domElement.focus():window.focus(),event.button){case scope.mouseButtons.LEFT:if(event.ctrlKey||event.metaKey||event.shiftKey){if(!1===scope.enablePan)return;handleMouseDownPan(event),state=STATE.PAN}else{if(!1===scope.enableRotate)return;!function handleMouseDownRotate(event){rotateStart.set(event.clientX,event.clientY)}(event),state=STATE.ROTATE}break;case scope.mouseButtons.MIDDLE:if(!1===scope.enableZoom)return;!function handleMouseDownDolly(event){dollyStart.set(event.clientX,event.clientY)}(event),state=STATE.DOLLY;break;case scope.mouseButtons.RIGHT:if(!1===scope.enablePan)return;handleMouseDownPan(event),state=STATE.PAN}state!==STATE.NONE&&(document.addEventListener("mousemove",onMouseMove,!1),document.addEventListener("mouseup",onMouseUp,!1),scope.dispatchEvent(startEvent))}}function onMouseMove(event){if(!1!==scope.enabled)switch(event.preventDefault(),state){case STATE.ROTATE:if(!1===scope.enableRotate)return;!function handleMouseMoveRotate(event){rotateEnd.set(event.clientX,event.clientY),rotateDelta.subVectors(rotateEnd,rotateStart).multiplyScalar(scope.rotateSpeed);var element=scope.domElement===document?scope.domElement.body:scope.domElement;rotateLeft(2*Math.PI*rotateDelta.x/element.clientHeight),rotateUp(2*Math.PI*rotateDelta.y/element.clientHeight),rotateStart.copy(rotateEnd),scope.update()}(event);break;case STATE.DOLLY:if(!1===scope.enableZoom)return;!function handleMouseMoveDolly(event){dollyEnd.set(event.clientX,event.clientY),dollyDelta.subVectors(dollyEnd,dollyStart),dollyDelta.y>0?dollyIn(getZoomScale()):dollyDelta.y<0&&dollyOut(getZoomScale()),dollyStart.copy(dollyEnd),scope.update()}(event);break;case STATE.PAN:if(!1===scope.enablePan)return;!function handleMouseMovePan(event){panEnd.set(event.clientX,event.clientY),panDelta.subVectors(panEnd,panStart).multiplyScalar(scope.panSpeed),pan(panDelta.x,panDelta.y),panStart.copy(panEnd),scope.update()}(event)}}function onMouseUp(event){!1!==scope.enabled&&(document.removeEventListener("mousemove",onMouseMove,!1),document.removeEventListener("mouseup",onMouseUp,!1),scope.dispatchEvent(endEvent),state=STATE.NONE)}function onMouseWheel(event){!1===scope.enabled||!1===scope.enableZoom||state!==STATE.NONE&&state!==STATE.ROTATE||(event.preventDefault(),event.stopPropagation(),scope.dispatchEvent(startEvent),function handleMouseWheel(event){event.deltaY<0?dollyOut(getZoomScale()):event.deltaY>0&&dollyIn(getZoomScale()),scope.update()}(event),scope.dispatchEvent(endEvent))}function onKeyDown(event){!1!==scope.enabled&&!1!==scope.enableKeys&&!1!==scope.enablePan&&function handleKeyDown(event){var needsUpdate=!1;switch(event.keyCode){case scope.keys.UP:pan(0,scope.keyPanSpeed),needsUpdate=!0;break;case scope.keys.BOTTOM:pan(0,-scope.keyPanSpeed),needsUpdate=!0;break;case scope.keys.LEFT:pan(scope.keyPanSpeed,0),needsUpdate=!0;break;case scope.keys.RIGHT:pan(-scope.keyPanSpeed,0),needsUpdate=!0}needsUpdate&&(event.preventDefault(),scope.update())}(event)}function onTouchStart(event){if(!1!==scope.enabled){switch(event.preventDefault(),event.touches.length){case 1:if(!1===scope.enableRotate)return;!function handleTouchStartRotate(event){rotateStart.set(event.touches[0].pageX,event.touches[0].pageY)}(event),state=STATE.TOUCH_ROTATE;break;case 2:if(!1===scope.enableZoom&&!1===scope.enablePan)return;!function handleTouchStartDollyPan(event){if(scope.enableZoom){var dx=event.touches[0].pageX-event.touches[1].pageX,dy=event.touches[0].pageY-event.touches[1].pageY,distance=Math.sqrt(dx*dx+dy*dy);dollyStart.set(0,distance)}if(scope.enablePan){var x=.5*(event.touches[0].pageX+event.touches[1].pageX),y=.5*(event.touches[0].pageY+event.touches[1].pageY);panStart.set(x,y)}}(event),state=STATE.TOUCH_DOLLY_PAN;break;default:state=STATE.NONE}state!==STATE.NONE&&scope.dispatchEvent(startEvent)}}function onTouchMove(event){if(!1!==scope.enabled)switch(event.preventDefault(),event.stopPropagation(),event.touches.length){case 1:if(!1===scope.enableRotate)return;if(state!==STATE.TOUCH_ROTATE)return;!function handleTouchMoveRotate(event){rotateEnd.set(event.touches[0].pageX,event.touches[0].pageY),rotateDelta.subVectors(rotateEnd,rotateStart).multiplyScalar(scope.rotateSpeed);var element=scope.domElement===document?scope.domElement.body:scope.domElement;rotateLeft(2*Math.PI*rotateDelta.x/element.clientHeight),rotateUp(2*Math.PI*rotateDelta.y/element.clientHeight),rotateStart.copy(rotateEnd),scope.update()}(event);break;case 2:if(!1===scope.enableZoom&&!1===scope.enablePan)return;if(state!==STATE.TOUCH_DOLLY_PAN)return;!function handleTouchMoveDollyPan(event){if(scope.enableZoom){var dx=event.touches[0].pageX-event.touches[1].pageX,dy=event.touches[0].pageY-event.touches[1].pageY,distance=Math.sqrt(dx*dx+dy*dy);dollyEnd.set(0,distance),dollyDelta.set(0,Math.pow(dollyEnd.y/dollyStart.y,scope.zoomSpeed)),dollyIn(dollyDelta.y),dollyStart.copy(dollyEnd)}if(scope.enablePan){var x=.5*(event.touches[0].pageX+event.touches[1].pageX),y=.5*(event.touches[0].pageY+event.touches[1].pageY);panEnd.set(x,y),panDelta.subVectors(panEnd,panStart).multiplyScalar(scope.panSpeed),pan(panDelta.x,panDelta.y),panStart.copy(panEnd)}scope.update()}(event);break;default:state=STATE.NONE}}function onTouchEnd(event){!1!==scope.enabled&&(scope.dispatchEvent(endEvent),state=STATE.NONE)}function onContextMenu(event){!1!==scope.enabled&&event.preventDefault()}scope.domElement.addEventListener("contextmenu",onContextMenu,!1),scope.domElement.addEventListener("mousedown",onMouseDown,!1),scope.domElement.addEventListener("wheel",onMouseWheel,!1),scope.domElement.addEventListener("touchstart",onTouchStart,!1),scope.domElement.addEventListener("touchend",onTouchEnd,!1),scope.domElement.addEventListener("touchmove",onTouchMove,!1),window.addEventListener("keydown",onKeyDown,!1),this.update()};OrbitControls.prototype=Object.create(_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.EventDispatcher.prototype),OrbitControls.prototype.constructor=OrbitControls,Object.defineProperties(OrbitControls.prototype,{center:{get:function(){return console.warn("THREE.OrbitControls: .center has been renamed to .target"),this.target}},noZoom:{get:function(){return console.warn("THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead."),!this.enableZoom},set:function(value){console.warn("THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead."),this.enableZoom=!value}},noRotate:{get:function(){return console.warn("THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead."),!this.enableRotate},set:function(value){console.warn("THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead."),this.enableRotate=!value}},noPan:{get:function(){return console.warn("THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead."),!this.enablePan},set:function(value){console.warn("THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead."),this.enablePan=!value}},noKeys:{get:function(){return console.warn("THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead."),!this.enableKeys},set:function(value){console.warn("THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead."),this.enableKeys=!value}},staticMoving:{get:function(){return console.warn("THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead."),!this.enableDamping},set:function(value){console.warn("THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead."),this.enableDamping=!value}},dynamicDampingFactor:{get:function(){return console.warn("THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead."),this.dampingFactor},set:function(value){console.warn("THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead."),this.dampingFactor=value}}})},417:function(module,exports,__webpack_require__){var THREE=__webpack_require__(386);THREE.BabylonLoader=function(manager){this.manager=void 0!==manager?manager:THREE.DefaultLoadingManager},THREE.BabylonLoader.prototype={constructor:THREE.BabylonLoader,load:function(url,onLoad,onProgress,onError){var scope=this,loader=new THREE.FileLoader(scope.manager);loader.setPath(scope.path),loader.load(url,function(text){onLoad(scope.parse(JSON.parse(text)))},onProgress,onError)},setPath:function(value){return this.path=value,this},parse:function(json){function parseGeometry(json){var geometry=new THREE.BufferGeometry,indices=json.indices,positions=json.positions,normals=json.normals,uvs=json.uvs;geometry.setIndex(indices);for(var j=2,jl=positions.length;j<jl;j+=3)positions[j]=-positions[j];if(geometry.addAttribute("position",new THREE.Float32BufferAttribute(positions,3)),normals){for(j=2,jl=normals.length;j<jl;j+=3)normals[j]=-normals[j];geometry.addAttribute("normal",new THREE.Float32BufferAttribute(normals,3))}uvs&&geometry.addAttribute("uv",new THREE.Float32BufferAttribute(uvs,2));var subMeshes=json.subMeshes;if(subMeshes)for(j=0,jl=subMeshes.length;j<jl;j++){var subMesh=subMeshes[j];geometry.addGroup(subMesh.indexStart,subMesh.indexCount)}return geometry}return function parseObjects(json,materials){for(var objects={},scene=new THREE.Scene,cameras=json.cameras,i=0,l=cameras.length;i<l;i++){var data=cameras[i],camera=new THREE.PerspectiveCamera(data.fov/Math.PI*180,1.33,data.minZ,data.maxZ);camera.name=data.name,camera.position.fromArray(data.position),data.rotation&&camera.rotation.fromArray(data.rotation),objects[data.id]=camera}var lights=json.lights;for(i=0,l=lights.length;i<l;i++){var light;switch((data=lights[i]).type){case 0:light=new THREE.PointLight;break;case 1:light=new THREE.DirectionalLight;break;case 2:light=new THREE.SpotLight;break;case 3:light=new THREE.HemisphereLight}light.name=data.name,data.position&&light.position.set(data.position[0],data.position[1],-data.position[2]),light.color.fromArray(data.diffuse),data.groundColor&&light.groundColor.fromArray(data.groundColor),data.intensity&&(light.intensity=data.intensity),objects[data.id]=light,scene.add(light)}var meshes=json.meshes;for(i=0,l=meshes.length;i<l;i++){var object;if((data=meshes[i]).indices){var geometry=parseGeometry(data);object=new THREE.Mesh(geometry,materials[data.materialId])}else object=new THREE.Group;object.name=data.name,object.position.set(data.position[0],data.position[1],-data.position[2]),object.rotation.fromArray(data.rotation),data.rotationQuaternion&&object.quaternion.fromArray(data.rotationQuaternion),object.scale.fromArray(data.scaling),data.parentId?objects[data.parentId].add(object):scene.add(object),objects[data.id]=object}return scene}(json,function parseMaterials(json){for(var materials={},i=0,l=json.materials.length;i<l;i++){var data=json.materials[i],material=new THREE.MeshPhongMaterial;material.name=data.name,material.color.fromArray(data.diffuse),material.emissive.fromArray(data.emissive),material.specular.fromArray(data.specular),material.shininess=data.specularPower,material.opacity=data.alpha,materials[data.id]=material}if(json.multiMaterials)for(i=0,l=json.multiMaterials.length;i<l;i++)data=json.multiMaterials[i],console.warn("THREE.BabylonLoader: Multi materials not yet supported."),materials[data.id]=new THREE.MeshPhongMaterial;return materials}(json))}}}}]);
//# sourceMappingURL=13.3c5fc071e544c77027a1.bundle.js.map
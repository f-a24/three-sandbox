(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{580:function(module,exports,__webpack_require__){var f;module.exports=((f=function(){function e(a){return c.appendChild(a.dom),a}function u(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",c.addEventListener("click",function(a){a.preventDefault(),u(++l%c.children.length)},!1);var k=(performance||Date).now(),g=k,a=0,r=e(new f.Panel("FPS","#0ff","#002")),h=e(new f.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var t=e(new f.Panel("MB","#f08","#201"));return u(0),{REVISION:16,dom:c,addPanel:e,showPanel:u,begin:function(){k=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();if(h.update(c-k,200),c>g+1e3&&(r.update(1e3*a/(c-g),100),g=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){k=this.end()},domElement:c,setMode:u}}).Panel=function(e,f,l){var c=1/0,k=0,g=Math.round,a=g(window.devicePixelRatio||1),r=80*a,h=48*a,t=3*a,v=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r,q.height=h,q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");return b.font="bold "+9*a+"px Helvetica,Arial,sans-serif",b.textBaseline="top",b.fillStyle=l,b.fillRect(0,0,r,h),b.fillStyle=f,b.fillText(e,t,v),b.fillRect(d,m,n,p),b.fillStyle=l,b.globalAlpha=.9,b.fillRect(d,m,n,p),{dom:q,update:function(h,w){c=Math.min(c,h),k=Math.max(k,h),b.fillStyle=l,b.globalAlpha=1,b.fillRect(0,0,r,m),b.fillStyle=f,b.fillText(g(h)+" "+e+" ("+g(c)+"-"+g(k)+")",t,v),b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p),b.fillRect(d+n-a,m,a,p),b.fillStyle=l,b.globalAlpha=.9,b.fillRect(d+n-a,m,a,g((1-h/w)*p))}}},f)},584:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",function(){return OrbitControls});var _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(581),OrbitControls=function(object,domElement){var offset,quat,quatInverse,lastPosition,lastQuaternion;this.object=object,this.domElement=void 0!==domElement?domElement:document,this.enabled=!0,this.target=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector3,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!1,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.enableKeys=!0,this.keys={LEFT:37,UP:38,RIGHT:39,BOTTOM:40},this.mouseButtons={LEFT:_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.MOUSE.ROTATE,MIDDLE:_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.MOUSE.DOLLY,RIGHT:_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.MOUSE.PAN},this.touches={ONE:_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.TOUCH.ROTATE,TWO:_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.TOUCH.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this.getPolarAngle=function(){return spherical.phi},this.getAzimuthalAngle=function(){return spherical.theta},this.saveState=function(){scope.target0.copy(scope.target),scope.position0.copy(scope.object.position),scope.zoom0=scope.object.zoom},this.reset=function(){scope.target.copy(scope.target0),scope.object.position.copy(scope.position0),scope.object.zoom=scope.zoom0,scope.object.updateProjectionMatrix(),scope.dispatchEvent(changeEvent),scope.update(),state=STATE.NONE},this.update=(offset=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector3,quat=(new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Quaternion).setFromUnitVectors(object.up,new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector3(0,1,0)),quatInverse=quat.clone().inverse(),lastPosition=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector3,lastQuaternion=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Quaternion,function update(){var position=scope.object.position;return offset.copy(position).sub(scope.target),offset.applyQuaternion(quat),spherical.setFromVector3(offset),scope.autoRotate&&state===STATE.NONE&&rotateLeft(function getAutoRotationAngle(){return 2*Math.PI/60/60*scope.autoRotateSpeed}()),scope.enableDamping?(spherical.theta+=sphericalDelta.theta*scope.dampingFactor,spherical.phi+=sphericalDelta.phi*scope.dampingFactor):(spherical.theta+=sphericalDelta.theta,spherical.phi+=sphericalDelta.phi),spherical.theta=Math.max(scope.minAzimuthAngle,Math.min(scope.maxAzimuthAngle,spherical.theta)),spherical.phi=Math.max(scope.minPolarAngle,Math.min(scope.maxPolarAngle,spherical.phi)),spherical.makeSafe(),spherical.radius*=scale,spherical.radius=Math.max(scope.minDistance,Math.min(scope.maxDistance,spherical.radius)),!0===scope.enableDamping?scope.target.addScaledVector(panOffset,scope.dampingFactor):scope.target.add(panOffset),offset.setFromSpherical(spherical),offset.applyQuaternion(quatInverse),position.copy(scope.target).add(offset),scope.object.lookAt(scope.target),!0===scope.enableDamping?(sphericalDelta.theta*=1-scope.dampingFactor,sphericalDelta.phi*=1-scope.dampingFactor,panOffset.multiplyScalar(1-scope.dampingFactor)):(sphericalDelta.set(0,0,0),panOffset.set(0,0,0)),scale=1,!!(zoomChanged||lastPosition.distanceToSquared(scope.object.position)>EPS||8*(1-lastQuaternion.dot(scope.object.quaternion))>EPS)&&(scope.dispatchEvent(changeEvent),lastPosition.copy(scope.object.position),lastQuaternion.copy(scope.object.quaternion),zoomChanged=!1,!0)}),this.dispose=function(){scope.domElement.removeEventListener("contextmenu",onContextMenu,!1),scope.domElement.removeEventListener("mousedown",onMouseDown,!1),scope.domElement.removeEventListener("wheel",onMouseWheel,!1),scope.domElement.removeEventListener("touchstart",onTouchStart,!1),scope.domElement.removeEventListener("touchend",onTouchEnd,!1),scope.domElement.removeEventListener("touchmove",onTouchMove,!1),document.removeEventListener("mousemove",onMouseMove,!1),document.removeEventListener("mouseup",onMouseUp,!1),window.removeEventListener("keydown",onKeyDown,!1)};var scope=this,changeEvent={type:"change"},startEvent={type:"start"},endEvent={type:"end"},STATE={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},state=STATE.NONE,EPS=1e-6,spherical=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Spherical,sphericalDelta=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Spherical,scale=1,panOffset=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector3,zoomChanged=!1,rotateStart=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector2,rotateEnd=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector2,rotateDelta=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector2,panStart=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector2,panEnd=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector2,panDelta=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector2,dollyStart=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector2,dollyEnd=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector2,dollyDelta=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector2;function getZoomScale(){return Math.pow(.95,scope.zoomSpeed)}function rotateLeft(angle){sphericalDelta.theta-=angle}function rotateUp(angle){sphericalDelta.phi-=angle}var v,panLeft=(v=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector3,function panLeft(distance,objectMatrix){v.setFromMatrixColumn(objectMatrix,0),v.multiplyScalar(-distance),panOffset.add(v)}),panUp=function(){var v=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector3;return function panUp(distance,objectMatrix){!0===scope.screenSpacePanning?v.setFromMatrixColumn(objectMatrix,1):(v.setFromMatrixColumn(objectMatrix,0),v.crossVectors(scope.object.up,v)),v.multiplyScalar(distance),panOffset.add(v)}}(),pan=function(){var offset=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector3;return function pan(deltaX,deltaY){var element=scope.domElement===document?scope.domElement.body:scope.domElement;if(scope.object.isPerspectiveCamera){var position=scope.object.position;offset.copy(position).sub(scope.target);var targetDistance=offset.length();targetDistance*=Math.tan(scope.object.fov/2*Math.PI/180),panLeft(2*deltaX*targetDistance/element.clientHeight,scope.object.matrix),panUp(2*deltaY*targetDistance/element.clientHeight,scope.object.matrix)}else scope.object.isOrthographicCamera?(panLeft(deltaX*(scope.object.right-scope.object.left)/scope.object.zoom/element.clientWidth,scope.object.matrix),panUp(deltaY*(scope.object.top-scope.object.bottom)/scope.object.zoom/element.clientHeight,scope.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),scope.enablePan=!1)}}();function dollyIn(dollyScale){scope.object.isPerspectiveCamera?scale/=dollyScale:scope.object.isOrthographicCamera?(scope.object.zoom=Math.max(scope.minZoom,Math.min(scope.maxZoom,scope.object.zoom*dollyScale)),scope.object.updateProjectionMatrix(),zoomChanged=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),scope.enableZoom=!1)}function dollyOut(dollyScale){scope.object.isPerspectiveCamera?scale*=dollyScale:scope.object.isOrthographicCamera?(scope.object.zoom=Math.max(scope.minZoom,Math.min(scope.maxZoom,scope.object.zoom/dollyScale)),scope.object.updateProjectionMatrix(),zoomChanged=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),scope.enableZoom=!1)}function handleMouseDownRotate(event){rotateStart.set(event.clientX,event.clientY)}function handleMouseDownPan(event){panStart.set(event.clientX,event.clientY)}function handleTouchStartRotate(event){if(1==event.touches.length)rotateStart.set(event.touches[0].pageX,event.touches[0].pageY);else{var x=.5*(event.touches[0].pageX+event.touches[1].pageX),y=.5*(event.touches[0].pageY+event.touches[1].pageY);rotateStart.set(x,y)}}function handleTouchStartPan(event){if(1==event.touches.length)panStart.set(event.touches[0].pageX,event.touches[0].pageY);else{var x=.5*(event.touches[0].pageX+event.touches[1].pageX),y=.5*(event.touches[0].pageY+event.touches[1].pageY);panStart.set(x,y)}}function handleTouchStartDolly(event){var dx=event.touches[0].pageX-event.touches[1].pageX,dy=event.touches[0].pageY-event.touches[1].pageY,distance=Math.sqrt(dx*dx+dy*dy);dollyStart.set(0,distance)}function handleTouchMoveRotate(event){if(1==event.touches.length)rotateEnd.set(event.touches[0].pageX,event.touches[0].pageY);else{var x=.5*(event.touches[0].pageX+event.touches[1].pageX),y=.5*(event.touches[0].pageY+event.touches[1].pageY);rotateEnd.set(x,y)}rotateDelta.subVectors(rotateEnd,rotateStart).multiplyScalar(scope.rotateSpeed);var element=scope.domElement===document?scope.domElement.body:scope.domElement;rotateLeft(2*Math.PI*rotateDelta.x/element.clientHeight),rotateUp(2*Math.PI*rotateDelta.y/element.clientHeight),rotateStart.copy(rotateEnd)}function handleTouchMovePan(event){if(1==event.touches.length)panEnd.set(event.touches[0].pageX,event.touches[0].pageY);else{var x=.5*(event.touches[0].pageX+event.touches[1].pageX),y=.5*(event.touches[0].pageY+event.touches[1].pageY);panEnd.set(x,y)}panDelta.subVectors(panEnd,panStart).multiplyScalar(scope.panSpeed),pan(panDelta.x,panDelta.y),panStart.copy(panEnd)}function handleTouchMoveDolly(event){var dx=event.touches[0].pageX-event.touches[1].pageX,dy=event.touches[0].pageY-event.touches[1].pageY,distance=Math.sqrt(dx*dx+dy*dy);dollyEnd.set(0,distance),dollyDelta.set(0,Math.pow(dollyEnd.y/dollyStart.y,scope.zoomSpeed)),dollyIn(dollyDelta.y),dollyStart.copy(dollyEnd)}function onMouseDown(event){if(!1!==scope.enabled){switch(event.preventDefault(),scope.domElement.focus?scope.domElement.focus():window.focus(),event.button){case 0:switch(scope.mouseButtons.LEFT){case _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.MOUSE.ROTATE:if(event.ctrlKey||event.metaKey||event.shiftKey){if(!1===scope.enablePan)return;handleMouseDownPan(event),state=STATE.PAN}else{if(!1===scope.enableRotate)return;handleMouseDownRotate(event),state=STATE.ROTATE}break;case _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.MOUSE.PAN:if(event.ctrlKey||event.metaKey||event.shiftKey){if(!1===scope.enableRotate)return;handleMouseDownRotate(event),state=STATE.ROTATE}else{if(!1===scope.enablePan)return;handleMouseDownPan(event),state=STATE.PAN}break;default:state=STATE.NONE}break;case 1:switch(scope.mouseButtons.MIDDLE){case _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.MOUSE.DOLLY:if(!1===scope.enableZoom)return;!function handleMouseDownDolly(event){dollyStart.set(event.clientX,event.clientY)}(event),state=STATE.DOLLY;break;default:state=STATE.NONE}break;case 2:switch(scope.mouseButtons.RIGHT){case _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.MOUSE.ROTATE:if(!1===scope.enableRotate)return;handleMouseDownRotate(event),state=STATE.ROTATE;break;case _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.MOUSE.PAN:if(!1===scope.enablePan)return;handleMouseDownPan(event),state=STATE.PAN;break;default:state=STATE.NONE}}state!==STATE.NONE&&(document.addEventListener("mousemove",onMouseMove,!1),document.addEventListener("mouseup",onMouseUp,!1),scope.dispatchEvent(startEvent))}}function onMouseMove(event){if(!1!==scope.enabled)switch(event.preventDefault(),state){case STATE.ROTATE:if(!1===scope.enableRotate)return;!function handleMouseMoveRotate(event){rotateEnd.set(event.clientX,event.clientY),rotateDelta.subVectors(rotateEnd,rotateStart).multiplyScalar(scope.rotateSpeed);var element=scope.domElement===document?scope.domElement.body:scope.domElement;rotateLeft(2*Math.PI*rotateDelta.x/element.clientHeight),rotateUp(2*Math.PI*rotateDelta.y/element.clientHeight),rotateStart.copy(rotateEnd),scope.update()}(event);break;case STATE.DOLLY:if(!1===scope.enableZoom)return;!function handleMouseMoveDolly(event){dollyEnd.set(event.clientX,event.clientY),dollyDelta.subVectors(dollyEnd,dollyStart),dollyDelta.y>0?dollyIn(getZoomScale()):dollyDelta.y<0&&dollyOut(getZoomScale()),dollyStart.copy(dollyEnd),scope.update()}(event);break;case STATE.PAN:if(!1===scope.enablePan)return;!function handleMouseMovePan(event){panEnd.set(event.clientX,event.clientY),panDelta.subVectors(panEnd,panStart).multiplyScalar(scope.panSpeed),pan(panDelta.x,panDelta.y),panStart.copy(panEnd),scope.update()}(event)}}function onMouseUp(event){!1!==scope.enabled&&(document.removeEventListener("mousemove",onMouseMove,!1),document.removeEventListener("mouseup",onMouseUp,!1),scope.dispatchEvent(endEvent),state=STATE.NONE)}function onMouseWheel(event){!1===scope.enabled||!1===scope.enableZoom||state!==STATE.NONE&&state!==STATE.ROTATE||(event.preventDefault(),event.stopPropagation(),scope.dispatchEvent(startEvent),function handleMouseWheel(event){event.deltaY<0?dollyOut(getZoomScale()):event.deltaY>0&&dollyIn(getZoomScale()),scope.update()}(event),scope.dispatchEvent(endEvent))}function onKeyDown(event){!1!==scope.enabled&&!1!==scope.enableKeys&&!1!==scope.enablePan&&function handleKeyDown(event){var needsUpdate=!1;switch(event.keyCode){case scope.keys.UP:pan(0,scope.keyPanSpeed),needsUpdate=!0;break;case scope.keys.BOTTOM:pan(0,-scope.keyPanSpeed),needsUpdate=!0;break;case scope.keys.LEFT:pan(scope.keyPanSpeed,0),needsUpdate=!0;break;case scope.keys.RIGHT:pan(-scope.keyPanSpeed,0),needsUpdate=!0}needsUpdate&&(event.preventDefault(),scope.update())}(event)}function onTouchStart(event){if(!1!==scope.enabled){switch(event.preventDefault(),event.touches.length){case 1:switch(scope.touches.ONE){case _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.TOUCH.ROTATE:if(!1===scope.enableRotate)return;handleTouchStartRotate(event),state=STATE.TOUCH_ROTATE;break;case _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.TOUCH.PAN:if(!1===scope.enablePan)return;handleTouchStartPan(event),state=STATE.TOUCH_PAN;break;default:state=STATE.NONE}break;case 2:switch(scope.touches.TWO){case _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.TOUCH.DOLLY_PAN:if(!1===scope.enableZoom&&!1===scope.enablePan)return;!function handleTouchStartDollyPan(event){scope.enableZoom&&handleTouchStartDolly(event),scope.enablePan&&handleTouchStartPan(event)}(event),state=STATE.TOUCH_DOLLY_PAN;break;case _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.TOUCH.DOLLY_ROTATE:if(!1===scope.enableZoom&&!1===scope.enableRotate)return;!function handleTouchStartDollyRotate(event){scope.enableZoom&&handleTouchStartDolly(event),scope.enableRotate&&handleTouchStartRotate(event)}(event),state=STATE.TOUCH_DOLLY_ROTATE;break;default:state=STATE.NONE}break;default:state=STATE.NONE}state!==STATE.NONE&&scope.dispatchEvent(startEvent)}}function onTouchMove(event){if(!1!==scope.enabled)switch(event.preventDefault(),event.stopPropagation(),state){case STATE.TOUCH_ROTATE:if(!1===scope.enableRotate)return;handleTouchMoveRotate(event),scope.update();break;case STATE.TOUCH_PAN:if(!1===scope.enablePan)return;handleTouchMovePan(event),scope.update();break;case STATE.TOUCH_DOLLY_PAN:if(!1===scope.enableZoom&&!1===scope.enablePan)return;!function handleTouchMoveDollyPan(event){scope.enableZoom&&handleTouchMoveDolly(event),scope.enablePan&&handleTouchMovePan(event)}(event),scope.update();break;case STATE.TOUCH_DOLLY_ROTATE:if(!1===scope.enableZoom&&!1===scope.enableRotate)return;!function handleTouchMoveDollyRotate(event){scope.enableZoom&&handleTouchMoveDolly(event),scope.enableRotate&&handleTouchMoveRotate(event)}(event),scope.update();break;default:state=STATE.NONE}}function onTouchEnd(event){!1!==scope.enabled&&(scope.dispatchEvent(endEvent),state=STATE.NONE)}function onContextMenu(event){!1!==scope.enabled&&event.preventDefault()}scope.domElement.addEventListener("contextmenu",onContextMenu,!1),scope.domElement.addEventListener("mousedown",onMouseDown,!1),scope.domElement.addEventListener("wheel",onMouseWheel,!1),scope.domElement.addEventListener("touchstart",onTouchStart,!1),scope.domElement.addEventListener("touchend",onTouchEnd,!1),scope.domElement.addEventListener("touchmove",onTouchMove,!1),window.addEventListener("keydown",onKeyDown,!1),this.update()};OrbitControls.prototype=Object.create(_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.EventDispatcher.prototype),OrbitControls.prototype.constructor=OrbitControls;var MapControls=function(object,domElement){OrbitControls.call(this,object,domElement),this.mouseButtons.LEFT=_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.MOUSE.PAN,this.mouseButtons.RIGHT=_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.MOUSE.ROTATE,this.touches.ONE=_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.TOUCH.PAN,this.touches.TWO=_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.TOUCH.DOLLY_ROTATE};(MapControls.prototype=Object.create(_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.EventDispatcher.prototype)).constructor=MapControls},605:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",function(){return AWDLoader});var _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(581),AWDLoader=function(){function Block(){this.id=0,this.data=null,this.namespace=0,this.flags=0}function AWDProperties(){}AWDProperties.prototype={set:function(key,value){this[key]=value},get:function(key,fallback){return this.hasOwnProperty(key)?this[key]:fallback}};var AWDLoader=function(manager){this.manager=void 0!==manager?manager:_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.DefaultLoadingManager,this.trunk=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Object3D,this.materialFactory=void 0,this._url="",this._baseDir="",this._data=void 0,this._ptr=0,this._version=[],this._streaming=!1,this._optimized_for_accuracy=!1,this._compression=0,this._bodylen=4294967295,this._blocks=[new Block],this._accuracyMatrix=!1,this._accuracyGeo=!1,this._accuracyProps=!1};return AWDLoader.prototype={constructor:AWDLoader,load:function(url,onLoad,onProgress,onError){var scope=this;this._url=url,this._baseDir=url.substr(0,url.lastIndexOf("/")+1);var loader=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.FileLoader(this.manager);loader.setPath(this.path),loader.setResponseType("arraybuffer"),loader.load(url,function(text){onLoad(scope.parse(text))},onProgress,onError)},setPath:function(value){return this.path=value,this},parse:function(data){var blen=data.byteLength;for(this._ptr=0,this._data=new DataView(data),this._parseHeader(),0!=this._compression&&console.error("compressed AWD not supported"),this._streaming||this._bodylen==data.byteLength-this._ptr||console.error("AWDLoader: body len does not match file length",this._bodylen,blen-this._ptr);this._ptr<blen;)this.parseNextBlock();return this.trunk},parseNextBlock:function(){var assetData,block,blockId=this.readU32(),ns=this.readU8(),type=this.readU8(),flags=this.readU8(),len=this.readU32();switch(type){case 1:assetData=this.parseMeshData();break;case 22:assetData=this.parseContainer();break;case 23:assetData=this.parseMeshInstance();break;case 81:assetData=this.parseMaterial();break;case 82:assetData=this.parseTexture();break;case 101:assetData=this.parseSkeleton();break;case 112:assetData=this.parseMeshPoseAnimation(!1);break;case 113:assetData=this.parseVertexAnimationSet();break;case 102:assetData=this.parseSkeletonPose();break;case 103:assetData=this.parseSkeletonAnimation();break;case 122:assetData=this.parseAnimatorSet();break;default:this._ptr+=len}this._blocks[blockId]=block=new Block,block.data=assetData,block.id=blockId,block.namespace=ns,block.flags=flags},_parseHeader:function(){var version=this._version;if(4282180!=(this.readU8()<<16|this.readU8()<<8|this.readU8()))throw new Error("AWDLoader - bad magic");version[0]=this.readU8(),version[1]=this.readU8();var flags=this.readU16();this._streaming=1==(1&flags),2===version[0]&&1===version[1]&&(this._accuracyMatrix=2==(2&flags),this._accuracyGeo=4==(4&flags),this._accuracyProps=8==(8&flags)),this._geoNrType=this._accuracyGeo?8:7,this._matrixNrType=this._accuracyMatrix?8:7,this._propsNrType=this._accuracyProps?8:7,this._optimized_for_accuracy=2==(2&flags),this._compression=this.readU8(),this._bodylen=this.readU32()},parseContainer:function(){var ctr=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Object3D,par_id=this.readU32(),mtx=this.parseMatrix4();return ctr.name=this.readUTF(),ctr.applyMatrix(mtx),(this._blocks[par_id].data||this.trunk).add(ctr),this.parseProperties({1:this._matrixNrType,2:this._matrixNrType,3:this._matrixNrType,4:4}),ctr.extra=this.parseUserAttributes(),ctr},parseMeshInstance:function(){var name,mesh,geometries,meshLen,meshes,par_id,data_id,mtx,materials,mat,mat_id,num_materials,i;for(par_id=this.readU32(),mtx=this.parseMatrix4(),name=this.readUTF(),data_id=this.readU32(),num_materials=this.readU16(),geometries=this.getBlock(data_id),materials=[],i=0;i<num_materials;i++)mat_id=this.readU32(),mat=this.getBlock(mat_id),materials.push(mat);if(meshes=[],(meshLen=geometries.length)>1)for(mesh=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Object3D,i=0;i<meshLen;i++){var sm=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Mesh(geometries[i]);meshes.push(sm),mesh.add(sm)}else mesh=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Mesh(geometries[0]),meshes.push(mesh);mesh.applyMatrix(mtx),mesh.name=name,(this.getBlock(par_id)||this.trunk).add(mesh);var matLen=materials.length,maxLen=Math.max(meshLen,matLen);for(i=0;i<maxLen;i++)meshes[i%meshLen].material=materials[i%matLen];return this.parseProperties(null),mesh.extra=this.parseUserAttributes(),mesh},parseMaterial:function(){var name,type,props,mat,attributes,num_methods;for(name=this.readUTF(),type=this.readU8(),num_methods=this.readU8(),props=this.parseProperties({1:3,2:23,11:21,12:7,13:21}),0;0<num_methods;)this.readU16(),this.parseProperties(null),this.parseUserAttributes();if(attributes=this.parseUserAttributes(),void 0!==this.materialFactory&&(mat=this.materialFactory(name)))return mat;if(mat=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.MeshPhongMaterial,1===type)mat.color.setHex(props.get(1,13421772));else if(2===type){var tex_addr=props.get(2,0);mat.map=this.getBlock(tex_addr)}return mat.extra=attributes,mat.alphaThreshold=props.get(12,0),mat.repeat=props.get(13,!1),mat},parseTexture:function(){var asset,data_len,name=this.readUTF();if(0===this.readU8()){data_len=this.readU32();var url=this.readUTFBytes(data_len);console.log(url),(asset=this.loadTexture(url)).userData={},asset.userData.name=name}return this.parseProperties(null),this.parseUserAttributes(),asset},loadTexture:function(url){var tex=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Texture;return new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.ImageLoader(this.manager).load(this._baseDir+url,function(image){tex.image=image,tex.needsUpdate=!0}),tex},parseSkeleton:function(){this.readUTF();var num_joints=this.readU16(),skeleton=[],joints_parsed=0;for(this.parseProperties(null);joints_parsed<num_joints;){var joint,ibp;this.readU16(),(joint=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Bone).parent=this.readU16()-1,joint.name=this.readUTF(),ibp=this.parseMatrix4(),joint.skinMatrix=ibp,this.parseProperties(null),this.parseUserAttributes(),skeleton.push(joint),joints_parsed++}return this.parseUserAttributes(),skeleton},parseSkeletonPose:function(){this.readUTF();var num_joints=this.readU16();this.parseProperties(null);for(var pose=[],joints_parsed=0;joints_parsed<num_joints;){var mtx_data;mtx_data=1===this.readU8()?this.parseMatrix4():new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Matrix4,pose[joints_parsed]=mtx_data,joints_parsed++}return this.parseUserAttributes(),pose},parseSkeletonAnimation:function(){this.readUTF();var frame_dur,pose_addr,pose,clip=[],num_frames=this.readU16();this.parseProperties(null);for(var frames_parsed=0;frames_parsed<num_frames;)pose_addr=this.readU32(),frame_dur=this.readU16(),pose=this._blocks[pose_addr].data,clip.push({pose:pose,duration:frame_dur}),frames_parsed++;if(0!==clip.length)return this.parseUserAttributes(),clip},parseVertexAnimationSet:function(){this.readUTF();for(var poseBlockAdress,num_frames=this.readU16(),frames_parsed=(this.parseProperties({1:5}),0),skeletonFrames=[];frames_parsed<num_frames;)poseBlockAdress=this.readU32(),skeletonFrames.push(this._blocks[poseBlockAdress].data),frames_parsed++;return this.parseUserAttributes(),skeletonFrames},parseAnimatorSet:function(){this.readUTF();var animSetBlockAdress,targetAnimationSet,type=this.readU16(),props=this.parseProperties({1:23});animSetBlockAdress=this.readU32();for(var targetMeshLength=this.readU16(),meshAdresses=[],i=0;i<targetMeshLength;i++)meshAdresses.push(this.readU32());this.readU16(),Boolean(this.readU8());this.parseUserAttributes(),this.parseUserAttributes();var thisAnimator,targetMeshes=[];for(i=0;i<meshAdresses.length;i++)targetMeshes.push(this._blocks[meshAdresses[i]].data);for(targetAnimationSet=this._blocks[animSetBlockAdress].data,1==type&&(thisAnimator={animationSet:targetAnimationSet,skeleton:this._blocks[props.get(1,0)].data}),i=0;i<targetMeshes.length;i++)targetMeshes[i].animator=thisAnimator;return thisAnimator},parseMeshData:function(){var geom,buffer,name=this.readUTF(),num_subs=this.readU16(),subs_parsed=0,geometries=[];for(this.parseProperties({1:this._geoNrType,2:this._geoNrType});subs_parsed<num_subs;){var sm_len,sm_end,attrib;for((geom=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.BufferGeometry).name=name,geometries.push(geom),sm_len=this.readU32(),sm_end=this._ptr+sm_len,this.parseProperties({1:this._geoNrType,2:this._geoNrType});this._ptr<sm_end;){var idx=0,str_type=this.readU8(),str_len=(this.readU8(),this.readU32()),str_end=str_len+this._ptr;if(1===str_type)for(buffer=new Float32Array(str_len/12*3),attrib=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.BufferAttribute(buffer,3),geom.addAttribute("position",attrib),idx=0;this._ptr<str_end;)buffer[idx]=-this.readF32(),buffer[idx+1]=this.readF32(),buffer[idx+2]=this.readF32(),idx+=3;else if(2===str_type)for(buffer=new Uint16Array(str_len/2),attrib=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.BufferAttribute(buffer,1),geom.setIndex(attrib),idx=0;this._ptr<str_end;)buffer[idx+1]=this.readU16(),buffer[idx]=this.readU16(),buffer[idx+2]=this.readU16(),idx+=3;else if(3===str_type)for(buffer=new Float32Array(str_len/8*2),attrib=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.BufferAttribute(buffer,2),geom.addAttribute("uv",attrib),idx=0;this._ptr<str_end;)buffer[idx]=this.readF32(),buffer[idx+1]=1-this.readF32(),idx+=2;else if(4===str_type)for(buffer=new Float32Array(str_len/12*3),attrib=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.BufferAttribute(buffer,3),geom.addAttribute("normal",attrib),idx=0;this._ptr<str_end;)buffer[idx]=-this.readF32(),buffer[idx+1]=this.readF32(),buffer[idx+2]=this.readF32(),idx+=3;else this._ptr=str_end}this.parseUserAttributes(),geom.computeBoundingSphere(),subs_parsed++}return this.parseUserAttributes(),geometries},parseMeshPoseAnimation:function(poseOnly){var num_submeshes,frames_parsed,subMeshParsed,str_len,str_end,geom,num_Streams,streamsParsed,props,num_frames=1,idx=0,clip={},streamtypes=[],geoAdress=(this.readUTF(),this.readU32()),mesh=this.getBlock(geoAdress);if(null!==mesh){for((geom=mesh.geometry).morphTargets=[],poseOnly||(num_frames=this.readU16()),num_submeshes=this.readU16(),num_Streams=this.readU16(),streamsParsed=0;streamsParsed<num_Streams;)streamtypes.push(this.readU16()),streamsParsed++;for(props=this.parseProperties({1:21,2:21}),clip.looping=props.get(1,!0),clip.stitchFinalFrame=props.get(2,!1),frames_parsed=0;frames_parsed<num_frames;){for(this.readU16(),subMeshParsed=0;subMeshParsed<num_submeshes;)for(streamsParsed=0,str_len=this.readU32(),str_end=this._ptr+str_len;streamsParsed<num_Streams;){if(1===streamtypes[streamsParsed]){var buffer=new Float32Array(str_len/4);for(geom.morphTargets.push({array:buffer}),idx=0;this._ptr<str_end;)buffer[idx]=this.readF32(),buffer[idx+1]=this.readF32(),buffer[idx+2]=this.readF32(),idx+=3;subMeshParsed++}else this._ptr=str_end;streamsParsed++}frames_parsed++}return this.parseUserAttributes(),null}console.log("parseMeshPoseAnimation target mesh not found at:",geoAdress)},getBlock:function(id){return this._blocks[id].data},parseMatrix4:function(){var mtx=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Matrix4,e=mtx.elements;return e[0]=this.readF32(),e[1]=this.readF32(),e[2]=this.readF32(),e[3]=0,e[4]=this.readF32(),e[5]=this.readF32(),e[6]=this.readF32(),e[7]=0,e[8]=this.readF32(),e[9]=this.readF32(),e[10]=this.readF32(),e[11]=0,e[12]=-this.readF32(),e[13]=this.readF32(),e[14]=this.readF32(),e[15]=1,mtx},parseProperties:function(expected){var list_len=this.readU32(),list_end=this._ptr+list_len,props=new AWDProperties;if(expected)for(;this._ptr<list_end;){var type,key=this.readU16(),len=this.readU32();expected.hasOwnProperty(key)?(type=expected[key],props.set(key,this.parseAttrValue(type,len))):this._ptr+=len}return props},parseUserAttributes:function(){return this._ptr=this.readU32()+this._ptr,null},parseAttrValue:function(type,len){var elem_len,read_func;switch(type){case 1:elem_len=1,read_func=this.readI8;break;case 2:elem_len=2,read_func=this.readI16;break;case 3:elem_len=4,read_func=this.readI32;break;case 21:case 4:elem_len=1,read_func=this.readU8;break;case 5:elem_len=2,read_func=this.readU16;break;case 6:case 23:elem_len=4,read_func=this.readU32;break;case 7:elem_len=4,read_func=this.readF32;break;case 8:elem_len=8,read_func=this.readF64;break;case 41:case 42:case 43:case 44:case 45:case 46:case 47:elem_len=8,read_func=this.readF64}if(elem_len<len){var list,num_read,num_elems;for(list=[],num_read=0,num_elems=len/elem_len;num_read<num_elems;)list.push(read_func.call(this)),num_read++;return list}return read_func.call(this)},readU8:function(){return this._data.getUint8(this._ptr++)},readI8:function(){return this._data.getInt8(this._ptr++)},readU16:function(){var a=this._data.getUint16(this._ptr,!0);return this._ptr+=2,a},readI16:function(){var a=this._data.getInt16(this._ptr,!0);return this._ptr+=2,a},readU32:function(){var a=this._data.getUint32(this._ptr,!0);return this._ptr+=4,a},readI32:function(){var a=this._data.getInt32(this._ptr,!0);return this._ptr+=4,a},readF32:function(){var a=this._data.getFloat32(this._ptr,!0);return this._ptr+=4,a},readF64:function(){var a=this._data.getFloat64(this._ptr,!0);return this._ptr+=8,a},readUTF:function(){var len=this.readU16();return this.readUTFBytes(len)},readUTFBytes:function(len){for(var out=[],c=0;out.length<len;){var c1=this._data.getUint8(this._ptr++,!0);if(c1<128)out[c++]=String.fromCharCode(c1);else if(c1>191&&c1<224){var c2=this._data.getUint8(this._ptr++,!0);out[c++]=String.fromCharCode((31&c1)<<6|63&c2)}else{c2=this._data.getUint8(this._ptr++,!0);var c3=this._data.getUint8(this._ptr++,!0);out[c++]=String.fromCharCode((15&c1)<<12|(63&c2)<<6|63&c3)}}return out.join("")}},AWDLoader}()}}]);
//# sourceMappingURL=16.e7e55a58b9a4506b6cad.bundle.js.map
(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{711:function(module,exports,__webpack_require__){var f;module.exports=((f=function(){function e(a){return c.appendChild(a.dom),a}function u(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",c.addEventListener("click",(function(a){a.preventDefault(),u(++l%c.children.length)}),!1);var k=(performance||Date).now(),g=k,a=0,r=e(new f.Panel("FPS","#0ff","#002")),h=e(new f.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var t=e(new f.Panel("MB","#f08","#201"));return u(0),{REVISION:16,dom:c,addPanel:e,showPanel:u,begin:function(){k=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();if(h.update(c-k,200),c>g+1e3&&(r.update(1e3*a/(c-g),100),g=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){k=this.end()},domElement:c,setMode:u}}).Panel=function(e,f,l){var c=1/0,k=0,g=Math.round,a=g(window.devicePixelRatio||1),r=80*a,h=48*a,t=3*a,v=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r,q.height=h,q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");return b.font="bold "+9*a+"px Helvetica,Arial,sans-serif",b.textBaseline="top",b.fillStyle=l,b.fillRect(0,0,r,h),b.fillStyle=f,b.fillText(e,t,v),b.fillRect(d,m,n,p),b.fillStyle=l,b.globalAlpha=.9,b.fillRect(d,m,n,p),{dom:q,update:function(h,w){c=Math.min(c,h),k=Math.max(k,h),b.fillStyle=l,b.globalAlpha=1,b.fillRect(0,0,r,m),b.fillStyle=f,b.fillText(g(h)+" "+e+" ("+g(c)+"-"+g(k)+")",t,v),b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p),b.fillRect(d+n-a,m,a,p),b.fillStyle=l,b.globalAlpha=.9,b.fillRect(d+n-a,m,a,g((1-h/w)*p))}}},f)},713:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return SceneUtils}));var _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(710),SceneUtils={createMultiMaterialObject:function(geometry,materials){for(var group=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Group,i=0,l=materials.length;i<l;i++)group.add(new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Mesh(geometry,materials[i]));return group},detach:function(child,parent,scene){console.warn("THREE.SceneUtils: detach() has been deprecated. Use scene.attach( child ) instead."),scene.attach(child)},attach:function(child,scene,parent){console.warn("THREE.SceneUtils: attach() has been deprecated. Use parent.attach( child ) instead."),parent.attach(child)}}},714:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return Pass}));var camera,geometry,FullScreenQuad,_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(710);function Pass(){this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}Object.assign(Pass.prototype,{setSize:function(){},render:function(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}}),Pass.FullScreenQuad=(camera=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.OrthographicCamera(-1,1,1,-1,0,1),geometry=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.PlaneBufferGeometry(2,2),FullScreenQuad=function(material){this._mesh=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Mesh(geometry,material)},Object.defineProperty(FullScreenQuad.prototype,"material",{get:function(){return this._mesh.material},set:function(value){this._mesh.material=value}}),Object.assign(FullScreenQuad.prototype,{render:function(renderer){renderer.render(this._mesh,camera)}}),FullScreenQuad)},715:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return OrbitControls}));var _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(710),OrbitControls=function(object,domElement){var offset,quat,quatInverse,lastPosition,lastQuaternion;this.object=object,this.domElement=void 0!==domElement?domElement:document,this.enabled=!0,this.target=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector3,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!1,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.enableKeys=!0,this.keys={LEFT:37,UP:38,RIGHT:39,BOTTOM:40},this.mouseButtons={LEFT:_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.MOUSE.ROTATE,MIDDLE:_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.MOUSE.DOLLY,RIGHT:_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.MOUSE.PAN},this.touches={ONE:_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.TOUCH.ROTATE,TWO:_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.TOUCH.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this.getPolarAngle=function(){return spherical.phi},this.getAzimuthalAngle=function(){return spherical.theta},this.saveState=function(){scope.target0.copy(scope.target),scope.position0.copy(scope.object.position),scope.zoom0=scope.object.zoom},this.reset=function(){scope.target.copy(scope.target0),scope.object.position.copy(scope.position0),scope.object.zoom=scope.zoom0,scope.object.updateProjectionMatrix(),scope.dispatchEvent(changeEvent),scope.update(),state=STATE.NONE},this.update=(offset=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector3,quat=(new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Quaternion).setFromUnitVectors(object.up,new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector3(0,1,0)),quatInverse=quat.clone().inverse(),lastPosition=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector3,lastQuaternion=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Quaternion,function update(){var position=scope.object.position;return offset.copy(position).sub(scope.target),offset.applyQuaternion(quat),spherical.setFromVector3(offset),scope.autoRotate&&state===STATE.NONE&&rotateLeft(function getAutoRotationAngle(){return 2*Math.PI/60/60*scope.autoRotateSpeed}()),scope.enableDamping?(spherical.theta+=sphericalDelta.theta*scope.dampingFactor,spherical.phi+=sphericalDelta.phi*scope.dampingFactor):(spherical.theta+=sphericalDelta.theta,spherical.phi+=sphericalDelta.phi),spherical.theta=Math.max(scope.minAzimuthAngle,Math.min(scope.maxAzimuthAngle,spherical.theta)),spherical.phi=Math.max(scope.minPolarAngle,Math.min(scope.maxPolarAngle,spherical.phi)),spherical.makeSafe(),spherical.radius*=scale,spherical.radius=Math.max(scope.minDistance,Math.min(scope.maxDistance,spherical.radius)),!0===scope.enableDamping?scope.target.addScaledVector(panOffset,scope.dampingFactor):scope.target.add(panOffset),offset.setFromSpherical(spherical),offset.applyQuaternion(quatInverse),position.copy(scope.target).add(offset),scope.object.lookAt(scope.target),!0===scope.enableDamping?(sphericalDelta.theta*=1-scope.dampingFactor,sphericalDelta.phi*=1-scope.dampingFactor,panOffset.multiplyScalar(1-scope.dampingFactor)):(sphericalDelta.set(0,0,0),panOffset.set(0,0,0)),scale=1,!!(zoomChanged||lastPosition.distanceToSquared(scope.object.position)>EPS||8*(1-lastQuaternion.dot(scope.object.quaternion))>EPS)&&(scope.dispatchEvent(changeEvent),lastPosition.copy(scope.object.position),lastQuaternion.copy(scope.object.quaternion),zoomChanged=!1,!0)}),this.dispose=function(){scope.domElement.removeEventListener("contextmenu",onContextMenu,!1),scope.domElement.removeEventListener("mousedown",onMouseDown,!1),scope.domElement.removeEventListener("wheel",onMouseWheel,!1),scope.domElement.removeEventListener("touchstart",onTouchStart,!1),scope.domElement.removeEventListener("touchend",onTouchEnd,!1),scope.domElement.removeEventListener("touchmove",onTouchMove,!1),document.removeEventListener("mousemove",onMouseMove,!1),document.removeEventListener("mouseup",onMouseUp,!1),window.removeEventListener("keydown",onKeyDown,!1)};var scope=this,changeEvent={type:"change"},startEvent={type:"start"},endEvent={type:"end"},STATE={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},state=STATE.NONE,EPS=1e-6,spherical=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Spherical,sphericalDelta=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Spherical,scale=1,panOffset=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector3,zoomChanged=!1,rotateStart=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector2,rotateEnd=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector2,rotateDelta=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector2,panStart=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector2,panEnd=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector2,panDelta=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector2,dollyStart=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector2,dollyEnd=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector2,dollyDelta=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector2;function getZoomScale(){return Math.pow(.95,scope.zoomSpeed)}function rotateLeft(angle){sphericalDelta.theta-=angle}function rotateUp(angle){sphericalDelta.phi-=angle}var v,panLeft=(v=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector3,function panLeft(distance,objectMatrix){v.setFromMatrixColumn(objectMatrix,0),v.multiplyScalar(-distance),panOffset.add(v)}),panUp=function(){var v=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector3;return function panUp(distance,objectMatrix){!0===scope.screenSpacePanning?v.setFromMatrixColumn(objectMatrix,1):(v.setFromMatrixColumn(objectMatrix,0),v.crossVectors(scope.object.up,v)),v.multiplyScalar(distance),panOffset.add(v)}}(),pan=function(){var offset=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector3;return function pan(deltaX,deltaY){var element=scope.domElement===document?scope.domElement.body:scope.domElement;if(scope.object.isPerspectiveCamera){var position=scope.object.position;offset.copy(position).sub(scope.target);var targetDistance=offset.length();targetDistance*=Math.tan(scope.object.fov/2*Math.PI/180),panLeft(2*deltaX*targetDistance/element.clientHeight,scope.object.matrix),panUp(2*deltaY*targetDistance/element.clientHeight,scope.object.matrix)}else scope.object.isOrthographicCamera?(panLeft(deltaX*(scope.object.right-scope.object.left)/scope.object.zoom/element.clientWidth,scope.object.matrix),panUp(deltaY*(scope.object.top-scope.object.bottom)/scope.object.zoom/element.clientHeight,scope.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),scope.enablePan=!1)}}();function dollyIn(dollyScale){scope.object.isPerspectiveCamera?scale/=dollyScale:scope.object.isOrthographicCamera?(scope.object.zoom=Math.max(scope.minZoom,Math.min(scope.maxZoom,scope.object.zoom*dollyScale)),scope.object.updateProjectionMatrix(),zoomChanged=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),scope.enableZoom=!1)}function dollyOut(dollyScale){scope.object.isPerspectiveCamera?scale*=dollyScale:scope.object.isOrthographicCamera?(scope.object.zoom=Math.max(scope.minZoom,Math.min(scope.maxZoom,scope.object.zoom/dollyScale)),scope.object.updateProjectionMatrix(),zoomChanged=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),scope.enableZoom=!1)}function handleMouseDownRotate(event){rotateStart.set(event.clientX,event.clientY)}function handleMouseDownPan(event){panStart.set(event.clientX,event.clientY)}function handleTouchStartRotate(event){if(1==event.touches.length)rotateStart.set(event.touches[0].pageX,event.touches[0].pageY);else{var x=.5*(event.touches[0].pageX+event.touches[1].pageX),y=.5*(event.touches[0].pageY+event.touches[1].pageY);rotateStart.set(x,y)}}function handleTouchStartPan(event){if(1==event.touches.length)panStart.set(event.touches[0].pageX,event.touches[0].pageY);else{var x=.5*(event.touches[0].pageX+event.touches[1].pageX),y=.5*(event.touches[0].pageY+event.touches[1].pageY);panStart.set(x,y)}}function handleTouchStartDolly(event){var dx=event.touches[0].pageX-event.touches[1].pageX,dy=event.touches[0].pageY-event.touches[1].pageY,distance=Math.sqrt(dx*dx+dy*dy);dollyStart.set(0,distance)}function handleTouchMoveRotate(event){if(1==event.touches.length)rotateEnd.set(event.touches[0].pageX,event.touches[0].pageY);else{var x=.5*(event.touches[0].pageX+event.touches[1].pageX),y=.5*(event.touches[0].pageY+event.touches[1].pageY);rotateEnd.set(x,y)}rotateDelta.subVectors(rotateEnd,rotateStart).multiplyScalar(scope.rotateSpeed);var element=scope.domElement===document?scope.domElement.body:scope.domElement;rotateLeft(2*Math.PI*rotateDelta.x/element.clientHeight),rotateUp(2*Math.PI*rotateDelta.y/element.clientHeight),rotateStart.copy(rotateEnd)}function handleTouchMovePan(event){if(1==event.touches.length)panEnd.set(event.touches[0].pageX,event.touches[0].pageY);else{var x=.5*(event.touches[0].pageX+event.touches[1].pageX),y=.5*(event.touches[0].pageY+event.touches[1].pageY);panEnd.set(x,y)}panDelta.subVectors(panEnd,panStart).multiplyScalar(scope.panSpeed),pan(panDelta.x,panDelta.y),panStart.copy(panEnd)}function handleTouchMoveDolly(event){var dx=event.touches[0].pageX-event.touches[1].pageX,dy=event.touches[0].pageY-event.touches[1].pageY,distance=Math.sqrt(dx*dx+dy*dy);dollyEnd.set(0,distance),dollyDelta.set(0,Math.pow(dollyEnd.y/dollyStart.y,scope.zoomSpeed)),dollyIn(dollyDelta.y),dollyStart.copy(dollyEnd)}function onMouseDown(event){if(!1!==scope.enabled){switch(event.preventDefault(),scope.domElement.focus?scope.domElement.focus():window.focus(),event.button){case 0:switch(scope.mouseButtons.LEFT){case _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.MOUSE.ROTATE:if(event.ctrlKey||event.metaKey||event.shiftKey){if(!1===scope.enablePan)return;handleMouseDownPan(event),state=STATE.PAN}else{if(!1===scope.enableRotate)return;handleMouseDownRotate(event),state=STATE.ROTATE}break;case _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.MOUSE.PAN:if(event.ctrlKey||event.metaKey||event.shiftKey){if(!1===scope.enableRotate)return;handleMouseDownRotate(event),state=STATE.ROTATE}else{if(!1===scope.enablePan)return;handleMouseDownPan(event),state=STATE.PAN}break;default:state=STATE.NONE}break;case 1:switch(scope.mouseButtons.MIDDLE){case _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.MOUSE.DOLLY:if(!1===scope.enableZoom)return;!function handleMouseDownDolly(event){dollyStart.set(event.clientX,event.clientY)}(event),state=STATE.DOLLY;break;default:state=STATE.NONE}break;case 2:switch(scope.mouseButtons.RIGHT){case _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.MOUSE.ROTATE:if(!1===scope.enableRotate)return;handleMouseDownRotate(event),state=STATE.ROTATE;break;case _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.MOUSE.PAN:if(!1===scope.enablePan)return;handleMouseDownPan(event),state=STATE.PAN;break;default:state=STATE.NONE}}state!==STATE.NONE&&(document.addEventListener("mousemove",onMouseMove,!1),document.addEventListener("mouseup",onMouseUp,!1),scope.dispatchEvent(startEvent))}}function onMouseMove(event){if(!1!==scope.enabled)switch(event.preventDefault(),state){case STATE.ROTATE:if(!1===scope.enableRotate)return;!function handleMouseMoveRotate(event){rotateEnd.set(event.clientX,event.clientY),rotateDelta.subVectors(rotateEnd,rotateStart).multiplyScalar(scope.rotateSpeed);var element=scope.domElement===document?scope.domElement.body:scope.domElement;rotateLeft(2*Math.PI*rotateDelta.x/element.clientHeight),rotateUp(2*Math.PI*rotateDelta.y/element.clientHeight),rotateStart.copy(rotateEnd),scope.update()}(event);break;case STATE.DOLLY:if(!1===scope.enableZoom)return;!function handleMouseMoveDolly(event){dollyEnd.set(event.clientX,event.clientY),dollyDelta.subVectors(dollyEnd,dollyStart),dollyDelta.y>0?dollyIn(getZoomScale()):dollyDelta.y<0&&dollyOut(getZoomScale()),dollyStart.copy(dollyEnd),scope.update()}(event);break;case STATE.PAN:if(!1===scope.enablePan)return;!function handleMouseMovePan(event){panEnd.set(event.clientX,event.clientY),panDelta.subVectors(panEnd,panStart).multiplyScalar(scope.panSpeed),pan(panDelta.x,panDelta.y),panStart.copy(panEnd),scope.update()}(event)}}function onMouseUp(event){!1!==scope.enabled&&(document.removeEventListener("mousemove",onMouseMove,!1),document.removeEventListener("mouseup",onMouseUp,!1),scope.dispatchEvent(endEvent),state=STATE.NONE)}function onMouseWheel(event){!1===scope.enabled||!1===scope.enableZoom||state!==STATE.NONE&&state!==STATE.ROTATE||(event.preventDefault(),event.stopPropagation(),scope.dispatchEvent(startEvent),function handleMouseWheel(event){event.deltaY<0?dollyOut(getZoomScale()):event.deltaY>0&&dollyIn(getZoomScale()),scope.update()}(event),scope.dispatchEvent(endEvent))}function onKeyDown(event){!1!==scope.enabled&&!1!==scope.enableKeys&&!1!==scope.enablePan&&function handleKeyDown(event){var needsUpdate=!1;switch(event.keyCode){case scope.keys.UP:pan(0,scope.keyPanSpeed),needsUpdate=!0;break;case scope.keys.BOTTOM:pan(0,-scope.keyPanSpeed),needsUpdate=!0;break;case scope.keys.LEFT:pan(scope.keyPanSpeed,0),needsUpdate=!0;break;case scope.keys.RIGHT:pan(-scope.keyPanSpeed,0),needsUpdate=!0}needsUpdate&&(event.preventDefault(),scope.update())}(event)}function onTouchStart(event){if(!1!==scope.enabled){switch(event.preventDefault(),event.touches.length){case 1:switch(scope.touches.ONE){case _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.TOUCH.ROTATE:if(!1===scope.enableRotate)return;handleTouchStartRotate(event),state=STATE.TOUCH_ROTATE;break;case _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.TOUCH.PAN:if(!1===scope.enablePan)return;handleTouchStartPan(event),state=STATE.TOUCH_PAN;break;default:state=STATE.NONE}break;case 2:switch(scope.touches.TWO){case _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.TOUCH.DOLLY_PAN:if(!1===scope.enableZoom&&!1===scope.enablePan)return;!function handleTouchStartDollyPan(event){scope.enableZoom&&handleTouchStartDolly(event),scope.enablePan&&handleTouchStartPan(event)}(event),state=STATE.TOUCH_DOLLY_PAN;break;case _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.TOUCH.DOLLY_ROTATE:if(!1===scope.enableZoom&&!1===scope.enableRotate)return;!function handleTouchStartDollyRotate(event){scope.enableZoom&&handleTouchStartDolly(event),scope.enableRotate&&handleTouchStartRotate(event)}(event),state=STATE.TOUCH_DOLLY_ROTATE;break;default:state=STATE.NONE}break;default:state=STATE.NONE}state!==STATE.NONE&&scope.dispatchEvent(startEvent)}}function onTouchMove(event){if(!1!==scope.enabled)switch(event.preventDefault(),event.stopPropagation(),state){case STATE.TOUCH_ROTATE:if(!1===scope.enableRotate)return;handleTouchMoveRotate(event),scope.update();break;case STATE.TOUCH_PAN:if(!1===scope.enablePan)return;handleTouchMovePan(event),scope.update();break;case STATE.TOUCH_DOLLY_PAN:if(!1===scope.enableZoom&&!1===scope.enablePan)return;!function handleTouchMoveDollyPan(event){scope.enableZoom&&handleTouchMoveDolly(event),scope.enablePan&&handleTouchMovePan(event)}(event),scope.update();break;case STATE.TOUCH_DOLLY_ROTATE:if(!1===scope.enableZoom&&!1===scope.enableRotate)return;!function handleTouchMoveDollyRotate(event){scope.enableZoom&&handleTouchMoveDolly(event),scope.enableRotate&&handleTouchMoveRotate(event)}(event),scope.update();break;default:state=STATE.NONE}}function onTouchEnd(event){!1!==scope.enabled&&(scope.dispatchEvent(endEvent),state=STATE.NONE)}function onContextMenu(event){!1!==scope.enabled&&event.preventDefault()}scope.domElement.addEventListener("contextmenu",onContextMenu,!1),scope.domElement.addEventListener("mousedown",onMouseDown,!1),scope.domElement.addEventListener("wheel",onMouseWheel,!1),scope.domElement.addEventListener("touchstart",onTouchStart,!1),scope.domElement.addEventListener("touchend",onTouchEnd,!1),scope.domElement.addEventListener("touchmove",onTouchMove,!1),window.addEventListener("keydown",onKeyDown,!1),this.update()};OrbitControls.prototype=Object.create(_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.EventDispatcher.prototype),OrbitControls.prototype.constructor=OrbitControls;var MapControls=function(object,domElement){OrbitControls.call(this,object,domElement),this.mouseButtons.LEFT=_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.MOUSE.PAN,this.mouseButtons.RIGHT=_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.MOUSE.ROTATE,this.touches.ONE=_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.TOUCH.PAN,this.touches.TWO=_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.TOUCH.DOLLY_ROTATE};(MapControls.prototype=Object.create(_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.EventDispatcher.prototype)).constructor=MapControls},716:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return CopyShader}));var CopyShader={uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:["varying vec2 vUv;","void main() {","\tvUv = uv;","\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );","}"].join("\n"),fragmentShader:["uniform float opacity;","uniform sampler2D tDiffuse;","varying vec2 vUv;","void main() {","\tvec4 texel = texture2D( tDiffuse, vUv );","\tgl_FragColor = opacity * texel;","}"].join("\n")}},717:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"b",(function(){return MaskPass})),__webpack_require__.d(__webpack_exports__,"a",(function(){return ClearMaskPass}));var _postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(714),MaskPass=function(scene,camera){_postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_0__.a.call(this),this.scene=scene,this.camera=camera,this.clear=!0,this.needsSwap=!1,this.inverse=!1};MaskPass.prototype=Object.assign(Object.create(_postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_0__.a.prototype),{constructor:MaskPass,render:function(renderer,writeBuffer,readBuffer){var writeValue,clearValue,context=renderer.getContext(),state=renderer.state;state.buffers.color.setMask(!1),state.buffers.depth.setMask(!1),state.buffers.color.setLocked(!0),state.buffers.depth.setLocked(!0),this.inverse?(writeValue=0,clearValue=1):(writeValue=1,clearValue=0),state.buffers.stencil.setTest(!0),state.buffers.stencil.setOp(context.REPLACE,context.REPLACE,context.REPLACE),state.buffers.stencil.setFunc(context.ALWAYS,writeValue,4294967295),state.buffers.stencil.setClear(clearValue),state.buffers.stencil.setLocked(!0),renderer.setRenderTarget(readBuffer),this.clear&&renderer.clear(),renderer.render(this.scene,this.camera),renderer.setRenderTarget(writeBuffer),this.clear&&renderer.clear(),renderer.render(this.scene,this.camera),state.buffers.color.setLocked(!1),state.buffers.depth.setLocked(!1),state.buffers.stencil.setLocked(!1),state.buffers.stencil.setFunc(context.EQUAL,1,4294967295),state.buffers.stencil.setOp(context.KEEP,context.KEEP,context.KEEP),state.buffers.stencil.setLocked(!0)}});var ClearMaskPass=function(){_postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_0__.a.call(this),this.needsSwap=!1};ClearMaskPass.prototype=Object.create(_postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_0__.a.prototype),Object.assign(ClearMaskPass.prototype,{render:function(renderer){renderer.state.buffers.stencil.setLocked(!1),renderer.state.buffers.stencil.setTest(!1)}})},718:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return ShaderPass}));var _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(710),_postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(714),ShaderPass=function(shader,textureID){_postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_1__.a.call(this),this.textureID=void 0!==textureID?textureID:"tDiffuse",shader instanceof _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.ShaderMaterial?(this.uniforms=shader.uniforms,this.material=shader):shader&&(this.uniforms=_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.UniformsUtils.clone(shader.uniforms),this.material=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.ShaderMaterial({defines:Object.assign({},shader.defines),uniforms:this.uniforms,vertexShader:shader.vertexShader,fragmentShader:shader.fragmentShader})),this.fsQuad=new _postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_1__.a.FullScreenQuad(this.material)};ShaderPass.prototype=Object.assign(Object.create(_postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_1__.a.prototype),{constructor:ShaderPass,render:function(renderer,writeBuffer,readBuffer){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=readBuffer.texture),this.fsQuad.material=this.material,this.renderToScreen?(renderer.setRenderTarget(null),this.fsQuad.render(renderer)):(renderer.setRenderTarget(writeBuffer),this.clear&&renderer.clear(renderer.autoClearColor,renderer.autoClearDepth,renderer.autoClearStencil),this.fsQuad.render(renderer))}})},719:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return EffectComposer}));var _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(710),_shaders_CopyShader_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(716),_postprocessing_ShaderPass_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(718),_postprocessing_MaskPass_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(717),EffectComposer=function(renderer,renderTarget){if(this.renderer=renderer,void 0===renderTarget){var parameters={minFilter:_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.LinearFilter,magFilter:_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.LinearFilter,format:_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.RGBAFormat,stencilBuffer:!1},size=renderer.getSize(new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector2);this._pixelRatio=renderer.getPixelRatio(),this._width=size.width,this._height=size.height,(renderTarget=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderTarget(this._width*this._pixelRatio,this._height*this._pixelRatio,parameters)).texture.name="EffectComposer.rt1"}else this._pixelRatio=1,this._width=renderTarget.width,this._height=renderTarget.height;this.renderTarget1=renderTarget,this.renderTarget2=renderTarget.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],void 0===_shaders_CopyShader_js__WEBPACK_IMPORTED_MODULE_1__.a&&console.error("THREE.EffectComposer relies on CopyShader"),void 0===_postprocessing_ShaderPass_js__WEBPACK_IMPORTED_MODULE_2__.a&&console.error("THREE.EffectComposer relies on ShaderPass"),this.copyPass=new _postprocessing_ShaderPass_js__WEBPACK_IMPORTED_MODULE_2__.a(_shaders_CopyShader_js__WEBPACK_IMPORTED_MODULE_1__.a),this.clock=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Clock};Object.assign(EffectComposer.prototype,{swapBuffers:function(){var tmp=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=tmp},addPass:function(pass){this.passes.push(pass),pass.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)},insertPass:function(pass,index){this.passes.splice(index,0,pass)},isLastEnabledPass:function(passIndex){for(var i=passIndex+1;i<this.passes.length;i++)if(this.passes[i].enabled)return!1;return!0},render:function(deltaTime){void 0===deltaTime&&(deltaTime=this.clock.getDelta());var pass,i,currentRenderTarget=this.renderer.getRenderTarget(),maskActive=!1,il=this.passes.length;for(i=0;i<il;i++)if(!1!==(pass=this.passes[i]).enabled){if(pass.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),pass.render(this.renderer,this.writeBuffer,this.readBuffer,deltaTime,maskActive),pass.needsSwap){if(maskActive){var context=this.renderer.getContext(),stencil=this.renderer.state.buffers.stencil;stencil.setFunc(context.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,deltaTime),stencil.setFunc(context.EQUAL,1,4294967295)}this.swapBuffers()}void 0!==_postprocessing_MaskPass_js__WEBPACK_IMPORTED_MODULE_3__.b&&(pass instanceof _postprocessing_MaskPass_js__WEBPACK_IMPORTED_MODULE_3__.b?maskActive=!0:pass instanceof _postprocessing_MaskPass_js__WEBPACK_IMPORTED_MODULE_3__.a&&(maskActive=!1))}this.renderer.setRenderTarget(currentRenderTarget)},reset:function(renderTarget){if(void 0===renderTarget){var size=this.renderer.getSize(new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector2);this._pixelRatio=this.renderer.getPixelRatio(),this._width=size.width,this._height=size.height,(renderTarget=this.renderTarget1.clone()).setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=renderTarget,this.renderTarget2=renderTarget.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2},setSize:function(width,height){this._width=width,this._height=height;var effectiveWidth=this._width*this._pixelRatio,effectiveHeight=this._height*this._pixelRatio;this.renderTarget1.setSize(effectiveWidth,effectiveHeight),this.renderTarget2.setSize(effectiveWidth,effectiveHeight);for(var i=0;i<this.passes.length;i++)this.passes[i].setSize(effectiveWidth,effectiveHeight)},setPixelRatio:function(pixelRatio){this._pixelRatio=pixelRatio,this.setSize(this._width,this._height)}});var camera,geometry,FullScreenQuad,Pass=function(){this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1};Object.assign(Pass.prototype,{setSize:function(){},render:function(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}}),Pass.FullScreenQuad=(camera=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.OrthographicCamera(-1,1,1,-1,0,1),geometry=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.PlaneBufferGeometry(2,2),FullScreenQuad=function(material){this._mesh=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Mesh(geometry,material)},Object.defineProperty(FullScreenQuad.prototype,"material",{get:function(){return this._mesh.material},set:function(value){this._mesh.material=value}}),Object.assign(FullScreenQuad.prototype,{render:function(renderer){renderer.render(this._mesh,camera)}}),FullScreenQuad)},720:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return RenderPass}));var _postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(714),RenderPass=function(scene,camera,overrideMaterial,clearColor,clearAlpha){_postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_0__.a.call(this),this.scene=scene,this.camera=camera,this.overrideMaterial=overrideMaterial,this.clearColor=clearColor,this.clearAlpha=void 0!==clearAlpha?clearAlpha:0,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1};RenderPass.prototype=Object.assign(Object.create(_postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_0__.a.prototype),{constructor:RenderPass,render:function(renderer,writeBuffer,readBuffer){var oldClearColor,oldClearAlpha,oldAutoClear=renderer.autoClear;renderer.autoClear=!1,this.scene.overrideMaterial=this.overrideMaterial,this.clearColor&&(oldClearColor=renderer.getClearColor().getHex(),oldClearAlpha=renderer.getClearAlpha(),renderer.setClearColor(this.clearColor,this.clearAlpha)),this.clearDepth&&renderer.clearDepth(),renderer.setRenderTarget(this.renderToScreen?null:readBuffer),this.clear&&renderer.clear(renderer.autoClearColor,renderer.autoClearDepth,renderer.autoClearStencil),renderer.render(this.scene,this.camera),this.clearColor&&renderer.setClearColor(oldClearColor,oldClearAlpha),this.scene.overrideMaterial=null,renderer.autoClear=oldAutoClear}})}}]);
//# sourceMappingURL=10.591c2c407b4691f5f6cc.bundle.js.map
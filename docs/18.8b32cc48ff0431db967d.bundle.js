(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{366:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var three_module=__webpack_require__(718),stats_min=__webpack_require__(719),dat_gui_module=__webpack_require__(720),chroma=__webpack_require__(733),EffectComposer=__webpack_require__(728),RenderPass=__webpack_require__(729),ShaderPass=__webpack_require__(727),HorizontalBlurShader={uniforms:{tDiffuse:{value:null},h:{value:1/512}},vertexShader:["varying vec2 vUv;","void main() {","\tvUv = uv;","\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );","}"].join("\n"),fragmentShader:["uniform sampler2D tDiffuse;","uniform float h;","varying vec2 vUv;","void main() {","\tvec4 sum = vec4( 0.0 );","\tsum += texture2D( tDiffuse, vec2( vUv.x - 4.0 * h, vUv.y ) ) * 0.051;","\tsum += texture2D( tDiffuse, vec2( vUv.x - 3.0 * h, vUv.y ) ) * 0.0918;","\tsum += texture2D( tDiffuse, vec2( vUv.x - 2.0 * h, vUv.y ) ) * 0.12245;","\tsum += texture2D( tDiffuse, vec2( vUv.x - 1.0 * h, vUv.y ) ) * 0.1531;","\tsum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;","\tsum += texture2D( tDiffuse, vec2( vUv.x + 1.0 * h, vUv.y ) ) * 0.1531;","\tsum += texture2D( tDiffuse, vec2( vUv.x + 2.0 * h, vUv.y ) ) * 0.12245;","\tsum += texture2D( tDiffuse, vec2( vUv.x + 3.0 * h, vUv.y ) ) * 0.0918;","\tsum += texture2D( tDiffuse, vec2( vUv.x + 4.0 * h, vUv.y ) ) * 0.051;","\tgl_FragColor = sum;","}"].join("\n")},VerticalBlurShader={uniforms:{tDiffuse:{value:null},v:{value:1/512}},vertexShader:["varying vec2 vUv;","void main() {","\tvUv = uv;","\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );","}"].join("\n"),fragmentShader:["uniform sampler2D tDiffuse;","uniform float v;","varying vec2 vUv;","void main() {","\tvec4 sum = vec4( 0.0 );","\tsum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 4.0 * v ) ) * 0.051;","\tsum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 3.0 * v ) ) * 0.0918;","\tsum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 2.0 * v ) ) * 0.12245;","\tsum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 1.0 * v ) ) * 0.1531;","\tsum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;","\tsum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 1.0 * v ) ) * 0.1531;","\tsum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 2.0 * v ) ) * 0.12245;","\tsum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 3.0 * v ) ) * 0.0918;","\tsum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 4.0 * v ) ) * 0.051;","\tgl_FragColor = sum;","}"].join("\n")},HorizontalTiltShiftShader={uniforms:{tDiffuse:{value:null},h:{value:1/512},r:{value:.35}},vertexShader:["varying vec2 vUv;","void main() {","\tvUv = uv;","\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );","}"].join("\n"),fragmentShader:["uniform sampler2D tDiffuse;","uniform float h;","uniform float r;","varying vec2 vUv;","void main() {","\tvec4 sum = vec4( 0.0 );","\tfloat hh = h * abs( r - vUv.y );","\tsum += texture2D( tDiffuse, vec2( vUv.x - 4.0 * hh, vUv.y ) ) * 0.051;","\tsum += texture2D( tDiffuse, vec2( vUv.x - 3.0 * hh, vUv.y ) ) * 0.0918;","\tsum += texture2D( tDiffuse, vec2( vUv.x - 2.0 * hh, vUv.y ) ) * 0.12245;","\tsum += texture2D( tDiffuse, vec2( vUv.x - 1.0 * hh, vUv.y ) ) * 0.1531;","\tsum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;","\tsum += texture2D( tDiffuse, vec2( vUv.x + 1.0 * hh, vUv.y ) ) * 0.1531;","\tsum += texture2D( tDiffuse, vec2( vUv.x + 2.0 * hh, vUv.y ) ) * 0.12245;","\tsum += texture2D( tDiffuse, vec2( vUv.x + 3.0 * hh, vUv.y ) ) * 0.0918;","\tsum += texture2D( tDiffuse, vec2( vUv.x + 4.0 * hh, vUv.y ) ) * 0.051;","\tgl_FragColor = sum;","}"].join("\n")},VerticalTiltShiftShader={uniforms:{tDiffuse:{value:null},v:{value:1/512},r:{value:.35}},vertexShader:["varying vec2 vUv;","void main() {","\tvUv = uv;","\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );","}"].join("\n"),fragmentShader:["uniform sampler2D tDiffuse;","uniform float v;","uniform float r;","varying vec2 vUv;","void main() {","\tvec4 sum = vec4( 0.0 );","\tfloat vv = v * abs( r - vUv.y );","\tsum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 4.0 * vv ) ) * 0.051;","\tsum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 3.0 * vv ) ) * 0.0918;","\tsum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 2.0 * vv ) ) * 0.12245;","\tsum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 1.0 * vv ) ) * 0.1531;","\tsum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;","\tsum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 1.0 * vv ) ) * 0.1531;","\tsum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 2.0 * vv ) ) * 0.12245;","\tsum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 3.0 * vv ) ) * 0.0918;","\tsum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 4.0 * vv ) ) * 0.051;","\tgl_FragColor = sum;","}"].join("\n")},TriangleBlurShader={uniforms:{texture:{value:null},delta:{value:new three_module.Vector2(1,1)}},vertexShader:["varying vec2 vUv;","void main() {","\tvUv = uv;","\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );","}"].join("\n"),fragmentShader:["#include <common>","#define ITERATIONS 10.0","uniform sampler2D texture;","uniform vec2 delta;","varying vec2 vUv;","void main() {","\tvec4 color = vec4( 0.0 );","\tfloat total = 0.0;","\tfloat offset = rand( vUv );","\tfor ( float t = -ITERATIONS; t <= ITERATIONS; t ++ ) {","\t\tfloat percent = ( t + offset - 0.5 ) / ITERATIONS;","\t\tfloat weight = 1.0 - abs( percent );","\t\tcolor += texture2D( texture, vUv + delta * percent ) * weight;","\t\ttotal += weight;","\t}","\tgl_FragColor = color / total;","}"].join("\n")},CopyShader=__webpack_require__(725);__webpack_exports__.default=function(){var VIEWPORT_W=window.innerWidth,VIEWPORT_H=window.innerHeight,scene=new three_module.Scene,camera=new three_module.PerspectiveCamera(45,window.innerWidth/window.innerHeight,.1,1e3);camera.position.set(30,30,30),camera.lookAt(new three_module.Vector3(0,0,0));var renderer=new three_module.WebGLRenderer;renderer.setClearColor(new three_module.Color(11184895)),renderer.setSize(VIEWPORT_W,VIEWPORT_H),renderer.shadowMap.enabled=!0;var dirLight=new three_module.DirectionalLight(16777215);dirLight.position.set(30,30,30),dirLight.intensity=.8,scene.add(dirLight);var spotLight=new three_module.SpotLight(16777215);spotLight.castShadow=!0,spotLight.position.set(-30,30,-100),spotLight.target.position.x=-10,spotLight.target.position.z=-10,spotLight.intensity=.6,spotLight.shadow.mapSize.width=4096,spotLight.shadow.mapSize.height=4096,spotLight.shadow.camera.fov=120,spotLight.shadow.camera.near=1,spotLight.shadow.camera.far=200,scene.add(spotLight),document.getElementById("WebGL-output").appendChild(renderer.domElement);var plane=new three_module.BoxGeometry(1600,1600,.1,40,40),textureLoader=new three_module.TextureLoader,cube=new three_module.Mesh(plane,new three_module.MeshPhongMaterial({color:16777215,map:textureLoader.load("./assets/tex/floor-wood.jpg"),normalScale:new three_module.Vector2(.6,.6)}));cube.material.map.wrapS=three_module.RepeatWrapping,cube.material.map.wrapT=three_module.RepeatWrapping,cube.rotation.x=Math.PI/2,cube.material.map.repeat.set(80,80),cube.receiveShadow=!0,cube.position.z=-150,cube.position.x=-150,scene.add(cube);for(var scale=chroma.scale(["white","blue"]),i=-25;i<5;i++)for(var j=-15;j<15;j++){var cube_1=new three_module.Mesh(new three_module.BoxGeometry(3,4,3),new three_module.MeshPhongMaterial({color:scale(Math.random()).hex(),opacity:.8,transparent:!0}));cube_1.position.x=8*i+3*(Math.random()-.5),cube_1.position.z=8*j+3*(Math.random()-.5),cube_1.position.y=2*(Math.random()-.5),cube_1.castShadow=!0,scene.add(cube_1)}var hBlur=new ShaderPass.a(HorizontalBlurShader);hBlur.enabled=!1,hBlur.uniforms.h.value=1/window.innerHeight;var vBlur=new ShaderPass.a(VerticalBlurShader);vBlur.enabled=!1,vBlur.uniforms.v.value=1/window.innerWidth;var hTilt=new ShaderPass.a(HorizontalTiltShiftShader);hTilt.enabled=!1,hTilt.uniforms.h.value=1/window.innerHeight;var vTilt=new ShaderPass.a(VerticalTiltShiftShader);vTilt.enabled=!1,vTilt.uniforms.v.value=1/window.innerWidth;var tri=new ShaderPass.a(TriangleBlurShader,"texture");tri.enabled=!1;var renderPass=new RenderPass.a(scene,camera),effectCopy=new ShaderPass.a(CopyShader.a);effectCopy.renderToScreen=!0;var composer=new EffectComposer.a(renderer);composer.addPass(renderPass),composer.addPass(hBlur),composer.addPass(vBlur),composer.addPass(vTilt),composer.addPass(hTilt),composer.addPass(tri),composer.addPass(effectCopy);var controls={hBlur:!1,vBlur:!1,hTilt:!1,vTilt:!1,triBlur:!1,hTiltR:.35,vTiltR:.35,deltaX:.05,deltaY:.05,onChange:function(){hBlur.enabled=controls.hBlur,vBlur.enabled=controls.vBlur,hTilt.enabled=controls.hTilt,hTilt.uniforms.r.value=controls.hTiltR,vTilt.enabled=controls.vTilt,vTilt.uniforms.r.value=controls.vTiltR,tri.enabled=controls.triBlur,tri.uniforms.delta.value=new three_module.Vector2(controls.deltaX,controls.deltaY)}},gui=new dat_gui_module.a;gui.add(controls,"hBlur").onChange(controls.onChange),gui.add(controls,"vBlur").onChange(controls.onChange),gui.add(controls,"hTilt").onChange(controls.onChange),gui.add(controls,"hTiltR",0,1).onChange(controls.onChange),gui.add(controls,"vTilt").onChange(controls.onChange),gui.add(controls,"vTiltR",0,1).onChange(controls.onChange),gui.add(controls,"triBlur").onChange(controls.onChange),gui.add(controls,"deltaX",0,.05).step(.001).onChange(controls.onChange),gui.add(controls,"deltaY",0,.05).step(.001).onChange(controls.onChange);var statsObj,stats=((statsObj=new stats_min).showPanel(0),statsObj.dom.style.position="absolute",statsObj.dom.style.left="0px",statsObj.dom.style.top="0px",document.getElementById("Stats-output").appendChild(statsObj.dom),statsObj);window.addEventListener("resize",(function(){camera.aspect=window.innerWidth/window.innerHeight,camera.updateProjectionMatrix(),renderer.setSize(window.innerWidth,window.innerHeight)}),!1);var renderScene=function(){stats.update(),requestAnimationFrame(renderScene),composer.render()};renderScene()}},722:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return Pass}));var camera,geometry,FullScreenQuad,_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(718);function Pass(){this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}Object.assign(Pass.prototype,{setSize:function(){},render:function(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}}),Pass.FullScreenQuad=(camera=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.OrthographicCamera(-1,1,1,-1,0,1),geometry=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.PlaneBufferGeometry(2,2),FullScreenQuad=function(material){this._mesh=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Mesh(geometry,material)},Object.defineProperty(FullScreenQuad.prototype,"material",{get:function(){return this._mesh.material},set:function(value){this._mesh.material=value}}),Object.assign(FullScreenQuad.prototype,{render:function(renderer){renderer.render(this._mesh,camera)}}),FullScreenQuad)},725:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return CopyShader}));var CopyShader={uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:["varying vec2 vUv;","void main() {","\tvUv = uv;","\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );","}"].join("\n"),fragmentShader:["uniform float opacity;","uniform sampler2D tDiffuse;","varying vec2 vUv;","void main() {","\tvec4 texel = texture2D( tDiffuse, vUv );","\tgl_FragColor = opacity * texel;","}"].join("\n")}},726:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"b",(function(){return MaskPass})),__webpack_require__.d(__webpack_exports__,"a",(function(){return ClearMaskPass}));var _postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(722),MaskPass=function(scene,camera){_postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_0__.a.call(this),this.scene=scene,this.camera=camera,this.clear=!0,this.needsSwap=!1,this.inverse=!1};MaskPass.prototype=Object.assign(Object.create(_postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_0__.a.prototype),{constructor:MaskPass,render:function(renderer,writeBuffer,readBuffer){var writeValue,clearValue,context=renderer.getContext(),state=renderer.state;state.buffers.color.setMask(!1),state.buffers.depth.setMask(!1),state.buffers.color.setLocked(!0),state.buffers.depth.setLocked(!0),this.inverse?(writeValue=0,clearValue=1):(writeValue=1,clearValue=0),state.buffers.stencil.setTest(!0),state.buffers.stencil.setOp(context.REPLACE,context.REPLACE,context.REPLACE),state.buffers.stencil.setFunc(context.ALWAYS,writeValue,4294967295),state.buffers.stencil.setClear(clearValue),state.buffers.stencil.setLocked(!0),renderer.setRenderTarget(readBuffer),this.clear&&renderer.clear(),renderer.render(this.scene,this.camera),renderer.setRenderTarget(writeBuffer),this.clear&&renderer.clear(),renderer.render(this.scene,this.camera),state.buffers.color.setLocked(!1),state.buffers.depth.setLocked(!1),state.buffers.stencil.setLocked(!1),state.buffers.stencil.setFunc(context.EQUAL,1,4294967295),state.buffers.stencil.setOp(context.KEEP,context.KEEP,context.KEEP),state.buffers.stencil.setLocked(!0)}});var ClearMaskPass=function(){_postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_0__.a.call(this),this.needsSwap=!1};ClearMaskPass.prototype=Object.create(_postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_0__.a.prototype),Object.assign(ClearMaskPass.prototype,{render:function(renderer){renderer.state.buffers.stencil.setLocked(!1),renderer.state.buffers.stencil.setTest(!1)}})},727:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return ShaderPass}));var _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(718),_postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(722),ShaderPass=function(shader,textureID){_postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_1__.a.call(this),this.textureID=void 0!==textureID?textureID:"tDiffuse",shader instanceof _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.ShaderMaterial?(this.uniforms=shader.uniforms,this.material=shader):shader&&(this.uniforms=_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.UniformsUtils.clone(shader.uniforms),this.material=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.ShaderMaterial({defines:Object.assign({},shader.defines),uniforms:this.uniforms,vertexShader:shader.vertexShader,fragmentShader:shader.fragmentShader})),this.fsQuad=new _postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_1__.a.FullScreenQuad(this.material)};ShaderPass.prototype=Object.assign(Object.create(_postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_1__.a.prototype),{constructor:ShaderPass,render:function(renderer,writeBuffer,readBuffer){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=readBuffer.texture),this.fsQuad.material=this.material,this.renderToScreen?(renderer.setRenderTarget(null),this.fsQuad.render(renderer)):(renderer.setRenderTarget(writeBuffer),this.clear&&renderer.clear(renderer.autoClearColor,renderer.autoClearDepth,renderer.autoClearStencil),this.fsQuad.render(renderer))}})},728:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return EffectComposer}));var _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(718),_shaders_CopyShader_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(725),_postprocessing_ShaderPass_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(727),_postprocessing_MaskPass_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(726),EffectComposer=function(renderer,renderTarget){if(this.renderer=renderer,void 0===renderTarget){var parameters={minFilter:_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.LinearFilter,magFilter:_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.LinearFilter,format:_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.RGBAFormat,stencilBuffer:!1},size=renderer.getSize(new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector2);this._pixelRatio=renderer.getPixelRatio(),this._width=size.width,this._height=size.height,(renderTarget=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderTarget(this._width*this._pixelRatio,this._height*this._pixelRatio,parameters)).texture.name="EffectComposer.rt1"}else this._pixelRatio=1,this._width=renderTarget.width,this._height=renderTarget.height;this.renderTarget1=renderTarget,this.renderTarget2=renderTarget.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],void 0===_shaders_CopyShader_js__WEBPACK_IMPORTED_MODULE_1__.a&&console.error("THREE.EffectComposer relies on CopyShader"),void 0===_postprocessing_ShaderPass_js__WEBPACK_IMPORTED_MODULE_2__.a&&console.error("THREE.EffectComposer relies on ShaderPass"),this.copyPass=new _postprocessing_ShaderPass_js__WEBPACK_IMPORTED_MODULE_2__.a(_shaders_CopyShader_js__WEBPACK_IMPORTED_MODULE_1__.a),this.clock=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Clock};Object.assign(EffectComposer.prototype,{swapBuffers:function(){var tmp=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=tmp},addPass:function(pass){this.passes.push(pass),pass.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)},insertPass:function(pass,index){this.passes.splice(index,0,pass)},isLastEnabledPass:function(passIndex){for(var i=passIndex+1;i<this.passes.length;i++)if(this.passes[i].enabled)return!1;return!0},render:function(deltaTime){void 0===deltaTime&&(deltaTime=this.clock.getDelta());var pass,i,currentRenderTarget=this.renderer.getRenderTarget(),maskActive=!1,il=this.passes.length;for(i=0;i<il;i++)if(!1!==(pass=this.passes[i]).enabled){if(pass.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),pass.render(this.renderer,this.writeBuffer,this.readBuffer,deltaTime,maskActive),pass.needsSwap){if(maskActive){var context=this.renderer.getContext(),stencil=this.renderer.state.buffers.stencil;stencil.setFunc(context.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,deltaTime),stencil.setFunc(context.EQUAL,1,4294967295)}this.swapBuffers()}void 0!==_postprocessing_MaskPass_js__WEBPACK_IMPORTED_MODULE_3__.b&&(pass instanceof _postprocessing_MaskPass_js__WEBPACK_IMPORTED_MODULE_3__.b?maskActive=!0:pass instanceof _postprocessing_MaskPass_js__WEBPACK_IMPORTED_MODULE_3__.a&&(maskActive=!1))}this.renderer.setRenderTarget(currentRenderTarget)},reset:function(renderTarget){if(void 0===renderTarget){var size=this.renderer.getSize(new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector2);this._pixelRatio=this.renderer.getPixelRatio(),this._width=size.width,this._height=size.height,(renderTarget=this.renderTarget1.clone()).setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=renderTarget,this.renderTarget2=renderTarget.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2},setSize:function(width,height){this._width=width,this._height=height;var effectiveWidth=this._width*this._pixelRatio,effectiveHeight=this._height*this._pixelRatio;this.renderTarget1.setSize(effectiveWidth,effectiveHeight),this.renderTarget2.setSize(effectiveWidth,effectiveHeight);for(var i=0;i<this.passes.length;i++)this.passes[i].setSize(effectiveWidth,effectiveHeight)},setPixelRatio:function(pixelRatio){this._pixelRatio=pixelRatio,this.setSize(this._width,this._height)}});var camera,geometry,FullScreenQuad,Pass=function(){this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1};Object.assign(Pass.prototype,{setSize:function(){},render:function(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}}),Pass.FullScreenQuad=(camera=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.OrthographicCamera(-1,1,1,-1,0,1),geometry=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.PlaneBufferGeometry(2,2),FullScreenQuad=function(material){this._mesh=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Mesh(geometry,material)},Object.defineProperty(FullScreenQuad.prototype,"material",{get:function(){return this._mesh.material},set:function(value){this._mesh.material=value}}),Object.assign(FullScreenQuad.prototype,{render:function(renderer){renderer.render(this._mesh,camera)}}),FullScreenQuad)},729:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return RenderPass}));var _postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(722),RenderPass=function(scene,camera,overrideMaterial,clearColor,clearAlpha){_postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_0__.a.call(this),this.scene=scene,this.camera=camera,this.overrideMaterial=overrideMaterial,this.clearColor=clearColor,this.clearAlpha=void 0!==clearAlpha?clearAlpha:0,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1};RenderPass.prototype=Object.assign(Object.create(_postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_0__.a.prototype),{constructor:RenderPass,render:function(renderer,writeBuffer,readBuffer){var oldClearColor,oldClearAlpha,oldAutoClear=renderer.autoClear;renderer.autoClear=!1,this.scene.overrideMaterial=this.overrideMaterial,this.clearColor&&(oldClearColor=renderer.getClearColor().getHex(),oldClearAlpha=renderer.getClearAlpha(),renderer.setClearColor(this.clearColor,this.clearAlpha)),this.clearDepth&&renderer.clearDepth(),renderer.setRenderTarget(this.renderToScreen?null:readBuffer),this.clear&&renderer.clear(renderer.autoClearColor,renderer.autoClearDepth,renderer.autoClearStencil),renderer.render(this.scene,this.camera),this.clearColor&&renderer.setClearColor(oldClearColor,oldClearAlpha),this.scene.overrideMaterial=null,renderer.autoClear=oldAutoClear}})}}]);
//# sourceMappingURL=18.8b32cc48ff0431db967d.bundle.js.map
(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{683:function(module,exports,__webpack_require__){var f;module.exports=((f=function(){function e(a){return c.appendChild(a.dom),a}function u(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",c.addEventListener("click",(function(a){a.preventDefault(),u(++l%c.children.length)}),!1);var k=(performance||Date).now(),g=k,a=0,r=e(new f.Panel("FPS","#0ff","#002")),h=e(new f.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var t=e(new f.Panel("MB","#f08","#201"));return u(0),{REVISION:16,dom:c,addPanel:e,showPanel:u,begin:function(){k=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();if(h.update(c-k,200),c>g+1e3&&(r.update(1e3*a/(c-g),100),g=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){k=this.end()},domElement:c,setMode:u}}).Panel=function(e,f,l){var c=1/0,k=0,g=Math.round,a=g(window.devicePixelRatio||1),r=80*a,h=48*a,t=3*a,v=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r,q.height=h,q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");return b.font="bold "+9*a+"px Helvetica,Arial,sans-serif",b.textBaseline="top",b.fillStyle=l,b.fillRect(0,0,r,h),b.fillStyle=f,b.fillText(e,t,v),b.fillRect(d,m,n,p),b.fillStyle=l,b.globalAlpha=.9,b.fillRect(d,m,n,p),{dom:q,update:function(h,w){c=Math.min(c,h),k=Math.max(k,h),b.fillStyle=l,b.globalAlpha=1,b.fillRect(0,0,r,m),b.fillStyle=f,b.fillText(g(h)+" "+e+" ("+g(c)+"-"+g(k)+")",t,v),b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p),b.fillRect(d+n-a,m,a,p),b.fillStyle=l,b.globalAlpha=.9,b.fillRect(d+n-a,m,a,g((1-h/w)*p))}}},f)},689:function(module,exports){(function(__webpack_amd_options__){module.exports=__webpack_amd_options__}).call(this,{})},690:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return LegacyJSONLoader}));var _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(684),LegacyJSONLoader=function(){function LegacyJSONLoader(manager){"boolean"==typeof manager&&(console.warn("THREE.JSONLoader: showStatus parameter has been removed from constructor."),manager=void 0),this.manager=void 0!==manager?manager:_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.DefaultLoadingManager,this.withCredentials=!1}return Object.assign(LegacyJSONLoader.prototype,{crossOrigin:"anonymous",load:function(url,onLoad,onProgress,onError){var scope=this,path=void 0===this.path?_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.LoaderUtils.extractUrlBase(url):this.path,loader=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.FileLoader(this.manager);loader.setPath(this.path),loader.setWithCredentials(this.withCredentials),loader.load(url,(function(text){var json=JSON.parse(text),metadata=json.metadata;if(void 0!==metadata){var type=metadata.type;if(void 0!==type&&"object"===type.toLowerCase())return void console.error("THREE.JSONLoader: "+url+" should be loaded with THREE.ObjectLoader instead.")}var object=scope.parse(json,path);onLoad(object.geometry,object.materials)}),onProgress,onError)},setPath:function(value){return this.path=value,this},setResourcePath:function(value){return this.resourcePath=value,this},setCrossOrigin:function(value){return this.crossOrigin=value,this},parse:function(){var _BlendingMode={NoBlending:_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.NoBlending,NormalBlending:_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.NormalBlending,AdditiveBlending:_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.AdditiveBlending,SubtractiveBlending:_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.SubtractiveBlending,MultiplyBlending:_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.MultiplyBlending,CustomBlending:_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.CustomBlending},_color=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Color,_textureLoader=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.TextureLoader,_materialLoader=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.MaterialLoader;function createMaterial(m,texturePath,crossOrigin){var textures={},json={uuid:_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Math.generateUUID(),type:"MeshLambertMaterial"};for(var name in m){var value=m[name];switch(name){case"DbgColor":case"DbgIndex":case"opticalDensity":case"illumination":break;case"DbgName":json.name=value;break;case"blending":json.blending=_BlendingMode[value];break;case"colorAmbient":case"mapAmbient":console.warn("THREE.Loader.createMaterial:",name,"is no longer supported.");break;case"colorDiffuse":json.color=_color.fromArray(value).getHex();break;case"colorSpecular":json.specular=_color.fromArray(value).getHex();break;case"colorEmissive":json.emissive=_color.fromArray(value).getHex();break;case"specularCoef":json.shininess=value;break;case"shading":"basic"===value.toLowerCase()&&(json.type="MeshBasicMaterial"),"phong"===value.toLowerCase()&&(json.type="MeshPhongMaterial"),"standard"===value.toLowerCase()&&(json.type="MeshStandardMaterial");break;case"mapDiffuse":json.map=loadTexture(value,m.mapDiffuseRepeat,m.mapDiffuseOffset,m.mapDiffuseWrap,m.mapDiffuseAnisotropy,textures,texturePath,crossOrigin);break;case"mapDiffuseRepeat":case"mapDiffuseOffset":case"mapDiffuseWrap":case"mapDiffuseAnisotropy":break;case"mapEmissive":json.emissiveMap=loadTexture(value,m.mapEmissiveRepeat,m.mapEmissiveOffset,m.mapEmissiveWrap,m.mapEmissiveAnisotropy,textures,texturePath,crossOrigin);break;case"mapEmissiveRepeat":case"mapEmissiveOffset":case"mapEmissiveWrap":case"mapEmissiveAnisotropy":break;case"mapLight":json.lightMap=loadTexture(value,m.mapLightRepeat,m.mapLightOffset,m.mapLightWrap,m.mapLightAnisotropy,textures,texturePath,crossOrigin);break;case"mapLightRepeat":case"mapLightOffset":case"mapLightWrap":case"mapLightAnisotropy":break;case"mapAO":json.aoMap=loadTexture(value,m.mapAORepeat,m.mapAOOffset,m.mapAOWrap,m.mapAOAnisotropy,textures,texturePath,crossOrigin);break;case"mapAORepeat":case"mapAOOffset":case"mapAOWrap":case"mapAOAnisotropy":break;case"mapBump":json.bumpMap=loadTexture(value,m.mapBumpRepeat,m.mapBumpOffset,m.mapBumpWrap,m.mapBumpAnisotropy,textures,texturePath,crossOrigin);break;case"mapBumpScale":json.bumpScale=value;break;case"mapBumpRepeat":case"mapBumpOffset":case"mapBumpWrap":case"mapBumpAnisotropy":break;case"mapNormal":json.normalMap=loadTexture(value,m.mapNormalRepeat,m.mapNormalOffset,m.mapNormalWrap,m.mapNormalAnisotropy,textures,texturePath,crossOrigin);break;case"mapNormalFactor":json.normalScale=value;break;case"mapNormalRepeat":case"mapNormalOffset":case"mapNormalWrap":case"mapNormalAnisotropy":break;case"mapSpecular":json.specularMap=loadTexture(value,m.mapSpecularRepeat,m.mapSpecularOffset,m.mapSpecularWrap,m.mapSpecularAnisotropy,textures,texturePath,crossOrigin);break;case"mapSpecularRepeat":case"mapSpecularOffset":case"mapSpecularWrap":case"mapSpecularAnisotropy":break;case"mapMetalness":json.metalnessMap=loadTexture(value,m.mapMetalnessRepeat,m.mapMetalnessOffset,m.mapMetalnessWrap,m.mapMetalnessAnisotropy,textures,texturePath,crossOrigin);break;case"mapMetalnessRepeat":case"mapMetalnessOffset":case"mapMetalnessWrap":case"mapMetalnessAnisotropy":break;case"mapRoughness":json.roughnessMap=loadTexture(value,m.mapRoughnessRepeat,m.mapRoughnessOffset,m.mapRoughnessWrap,m.mapRoughnessAnisotropy,textures,texturePath,crossOrigin);break;case"mapRoughnessRepeat":case"mapRoughnessOffset":case"mapRoughnessWrap":case"mapRoughnessAnisotropy":break;case"mapAlpha":json.alphaMap=loadTexture(value,m.mapAlphaRepeat,m.mapAlphaOffset,m.mapAlphaWrap,m.mapAlphaAnisotropy,textures,texturePath,crossOrigin);break;case"mapAlphaRepeat":case"mapAlphaOffset":case"mapAlphaWrap":case"mapAlphaAnisotropy":break;case"flipSided":json.side=_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.BackSide;break;case"doubleSided":json.side=_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.DoubleSide;break;case"transparency":console.warn("THREE.Loader.createMaterial: transparency has been renamed to opacity"),json.opacity=value;break;case"depthTest":case"depthWrite":case"colorWrite":case"opacity":case"reflectivity":case"transparent":case"visible":case"wireframe":json[name]=value;break;case"vertexColors":!0===value&&(json.vertexColors=_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.VertexColors),"face"===value&&(json.vertexColors=_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.FaceColors);break;default:console.error("THREE.Loader.createMaterial: Unsupported",name,value)}}return"MeshBasicMaterial"===json.type&&delete json.emissive,"MeshPhongMaterial"!==json.type&&delete json.specular,json.opacity<1&&(json.transparent=!0),_materialLoader.setTextures(textures),_materialLoader.parse(json)}function loadTexture(path,repeat,offset,wrap,anisotropy,textures,texturePath,crossOrigin){var texture,fullPath=texturePath+path,loader=_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Loader.Handlers.get(fullPath);null!==loader?texture=loader.load(fullPath):(_textureLoader.setCrossOrigin(crossOrigin),texture=_textureLoader.load(fullPath)),void 0!==repeat&&(texture.repeat.fromArray(repeat),1!==repeat[0]&&(texture.wrapS=_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.RepeatWrapping),1!==repeat[1]&&(texture.wrapT=_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.RepeatWrapping)),void 0!==offset&&texture.offset.fromArray(offset),void 0!==wrap&&("repeat"===wrap[0]&&(texture.wrapS=_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.RepeatWrapping),"mirror"===wrap[0]&&(texture.wrapS=_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.MirroredRepeatWrapping),"repeat"===wrap[1]&&(texture.wrapT=_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.RepeatWrapping),"mirror"===wrap[1]&&(texture.wrapT=_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.MirroredRepeatWrapping)),void 0!==anisotropy&&(texture.anisotropy=anisotropy);var uuid=_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Math.generateUUID();return textures[uuid]=texture,uuid}return function parse(json,path){void 0!==json.data&&(json=json.data),void 0!==json.scale?json.scale=1/json.scale:json.scale=1;var geometry=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Geometry;return function parseModel(json,geometry){function isBitSet(value,position){return value&1<<position}var i,j,fi,offset,zLength,colorIndex,normalIndex,uvIndex,materialIndex,type,isQuad,hasMaterial,hasFaceVertexUv,hasFaceNormal,hasFaceVertexNormal,hasFaceColor,hasFaceVertexColor,vertex,face,faceA,faceB,hex,normal,uvLayer,uv,u,v,faces=json.faces,vertices=json.vertices,normals=json.normals,colors=json.colors,scale=json.scale,nUvLayers=0;if(void 0!==json.uvs){for(i=0;i<json.uvs.length;i++)json.uvs[i].length&&nUvLayers++;for(i=0;i<nUvLayers;i++)geometry.faceVertexUvs[i]=[]}for(offset=0,zLength=vertices.length;offset<zLength;)(vertex=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector3).x=vertices[offset++]*scale,vertex.y=vertices[offset++]*scale,vertex.z=vertices[offset++]*scale,geometry.vertices.push(vertex);for(offset=0,zLength=faces.length;offset<zLength;)if(isQuad=isBitSet(type=faces[offset++],0),hasMaterial=isBitSet(type,1),hasFaceVertexUv=isBitSet(type,3),hasFaceNormal=isBitSet(type,4),hasFaceVertexNormal=isBitSet(type,5),hasFaceColor=isBitSet(type,6),hasFaceVertexColor=isBitSet(type,7),isQuad){if((faceA=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Face3).a=faces[offset],faceA.b=faces[offset+1],faceA.c=faces[offset+3],(faceB=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Face3).a=faces[offset+1],faceB.b=faces[offset+2],faceB.c=faces[offset+3],offset+=4,hasMaterial&&(materialIndex=faces[offset++],faceA.materialIndex=materialIndex,faceB.materialIndex=materialIndex),fi=geometry.faces.length,hasFaceVertexUv)for(i=0;i<nUvLayers;i++)for(uvLayer=json.uvs[i],geometry.faceVertexUvs[i][fi]=[],geometry.faceVertexUvs[i][fi+1]=[],j=0;j<4;j++)u=uvLayer[2*(uvIndex=faces[offset++])],v=uvLayer[2*uvIndex+1],uv=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector2(u,v),2!==j&&geometry.faceVertexUvs[i][fi].push(uv),0!==j&&geometry.faceVertexUvs[i][fi+1].push(uv);if(hasFaceNormal&&(normalIndex=3*faces[offset++],faceA.normal.set(normals[normalIndex++],normals[normalIndex++],normals[normalIndex]),faceB.normal.copy(faceA.normal)),hasFaceVertexNormal)for(i=0;i<4;i++)normalIndex=3*faces[offset++],normal=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector3(normals[normalIndex++],normals[normalIndex++],normals[normalIndex]),2!==i&&faceA.vertexNormals.push(normal),0!==i&&faceB.vertexNormals.push(normal);if(hasFaceColor&&(hex=colors[colorIndex=faces[offset++]],faceA.color.setHex(hex),faceB.color.setHex(hex)),hasFaceVertexColor)for(i=0;i<4;i++)hex=colors[colorIndex=faces[offset++]],2!==i&&faceA.vertexColors.push(new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Color(hex)),0!==i&&faceB.vertexColors.push(new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Color(hex));geometry.faces.push(faceA),geometry.faces.push(faceB)}else{if((face=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Face3).a=faces[offset++],face.b=faces[offset++],face.c=faces[offset++],hasMaterial&&(materialIndex=faces[offset++],face.materialIndex=materialIndex),fi=geometry.faces.length,hasFaceVertexUv)for(i=0;i<nUvLayers;i++)for(uvLayer=json.uvs[i],geometry.faceVertexUvs[i][fi]=[],j=0;j<3;j++)u=uvLayer[2*(uvIndex=faces[offset++])],v=uvLayer[2*uvIndex+1],uv=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector2(u,v),geometry.faceVertexUvs[i][fi].push(uv);if(hasFaceNormal&&(normalIndex=3*faces[offset++],face.normal.set(normals[normalIndex++],normals[normalIndex++],normals[normalIndex])),hasFaceVertexNormal)for(i=0;i<3;i++)normalIndex=3*faces[offset++],normal=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector3(normals[normalIndex++],normals[normalIndex++],normals[normalIndex]),face.vertexNormals.push(normal);if(hasFaceColor&&(colorIndex=faces[offset++],face.color.setHex(colors[colorIndex])),hasFaceVertexColor)for(i=0;i<3;i++)colorIndex=faces[offset++],face.vertexColors.push(new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Color(colors[colorIndex]));geometry.faces.push(face)}}(json,geometry),function parseSkin(json,geometry){var influencesPerVertex=void 0!==json.influencesPerVertex?json.influencesPerVertex:2;if(json.skinWeights)for(var i=0,l=json.skinWeights.length;i<l;i+=influencesPerVertex){var x=json.skinWeights[i],y=influencesPerVertex>1?json.skinWeights[i+1]:0,z=influencesPerVertex>2?json.skinWeights[i+2]:0,w=influencesPerVertex>3?json.skinWeights[i+3]:0;geometry.skinWeights.push(new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector4(x,y,z,w))}if(json.skinIndices)for(i=0,l=json.skinIndices.length;i<l;i+=influencesPerVertex){var a=json.skinIndices[i],b=influencesPerVertex>1?json.skinIndices[i+1]:0,c=influencesPerVertex>2?json.skinIndices[i+2]:0,d=influencesPerVertex>3?json.skinIndices[i+3]:0;geometry.skinIndices.push(new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector4(a,b,c,d))}geometry.bones=json.bones,geometry.bones&&geometry.bones.length>0&&(geometry.skinWeights.length!==geometry.skinIndices.length||geometry.skinIndices.length!==geometry.vertices.length)&&console.warn("When skinning, number of vertices ("+geometry.vertices.length+"), skinIndices ("+geometry.skinIndices.length+"), and skinWeights ("+geometry.skinWeights.length+") should match.")}(json,geometry),function parseMorphing(json,geometry){var scale=json.scale;if(void 0!==json.morphTargets)for(var i=0,l=json.morphTargets.length;i<l;i++){geometry.morphTargets[i]={},geometry.morphTargets[i].name=json.morphTargets[i].name,geometry.morphTargets[i].vertices=[];for(var dstVertices=geometry.morphTargets[i].vertices,srcVertices=json.morphTargets[i].vertices,v=0,vl=srcVertices.length;v<vl;v+=3){var vertex=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector3;vertex.x=srcVertices[v]*scale,vertex.y=srcVertices[v+1]*scale,vertex.z=srcVertices[v+2]*scale,dstVertices.push(vertex)}}if(void 0!==json.morphColors&&json.morphColors.length>0){console.warn('THREE.JSONLoader: "morphColors" no longer supported. Using them as face colors.');var faces=geometry.faces,morphColors=json.morphColors[0].colors;for(i=0,l=faces.length;i<l;i++)faces[i].color.fromArray(morphColors,3*i)}}(json,geometry),function parseAnimations(json,geometry){var outputAnimations=[],animations=[];void 0!==json.animation&&animations.push(json.animation),void 0!==json.animations&&(json.animations.length?animations=animations.concat(json.animations):animations.push(json.animations));for(var i=0;i<animations.length;i++){var clip=_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.AnimationClip.parseAnimation(animations[i],geometry.bones);clip&&outputAnimations.push(clip)}if(geometry.morphTargets){var morphAnimationClips=_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.AnimationClip.CreateClipsFromMorphTargetSequences(geometry.morphTargets,10);outputAnimations=outputAnimations.concat(morphAnimationClips)}outputAnimations.length>0&&(geometry.animations=outputAnimations)}(json,geometry),geometry.computeFaceNormals(),geometry.computeBoundingSphere(),void 0===json.materials||0===json.materials.length?{geometry:geometry}:{geometry:geometry,materials:function initMaterials(materials,texturePath,crossOrigin){for(var array=[],i=0;i<materials.length;++i)array[i]=createMaterial(materials[i],texturePath,crossOrigin);return array}(json.materials,this.resourcePath||path,this.crossOrigin)}}}()}),LegacyJSONLoader}()},693:function(module,__webpack_exports__,__webpack_require__){"use strict";(function(process,module){__webpack_require__.d(__webpack_exports__,"a",(function(){return TWEEN}));var _Group=function(){this._tweens={},this._tweensAddedDuringUpdate={}};_Group.prototype={getAll:function(){return Object.keys(this._tweens).map(function(t){return this._tweens[t]}.bind(this))},removeAll:function(){this._tweens={}},add:function(t){this._tweens[t.getId()]=t,this._tweensAddedDuringUpdate[t.getId()]=t},remove:function(t){delete this._tweens[t.getId()],delete this._tweensAddedDuringUpdate[t.getId()]},update:function(t,n){var e=Object.keys(this._tweens);if(0===e.length)return!1;for(t=void 0!==t?t:TWEEN.now();0<e.length;){this._tweensAddedDuringUpdate={};for(var i=0;i<e.length;i++){var r=this._tweens[e[i]];r&&!1===r.update(t)&&(r._isPlaying=!1,n||delete this._tweens[e[i]])}e=Object.keys(this._tweensAddedDuringUpdate)}return!0}};var t,i,TWEEN=new _Group;TWEEN.Group=_Group,TWEEN._nextId=0,TWEEN.nextId=function(){return TWEEN._nextId++},"undefined"==typeof self&&void 0!==process&&process.hrtime?TWEEN.now=function(){var t=process.hrtime();return 1e3*t[0]+t[1]/1e6}:"undefined"!=typeof self&&void 0!==self.performance&&void 0!==self.performance.now?TWEEN.now=self.performance.now.bind(self.performance):void 0!==Date.now?TWEEN.now=Date.now:TWEEN.now=function(){return(new Date).getTime()},TWEEN.Tween=function(t,n){this._object=t,this._valuesStart={},this._valuesEnd={},this._valuesStartRepeat={},this._duration=1e3,this._repeat=0,this._repeatDelayTime=void 0,this._yoyo=!1,this._isPlaying=!1,this._reversed=!1,this._delayTime=0,this._startTime=null,this._easingFunction=TWEEN.Easing.Linear.None,this._interpolationFunction=TWEEN.Interpolation.Linear,this._chainedTweens=[],this._onStartCallback=null,this._onStartCallbackFired=!1,this._onUpdateCallback=null,this._onCompleteCallback=null,this._onStopCallback=null,this._group=n||TWEEN,this._id=TWEEN.nextId()},TWEEN.Tween.prototype={getId:function(){return this._id},isPlaying:function(){return this._isPlaying},to:function(t,n){return this._valuesEnd=Object.create(t),void 0!==n&&(this._duration=n),this},duration:function(t){return this._duration=t,this},start:function(t){for(var n in this._group.add(this),this._isPlaying=!0,this._onStartCallbackFired=!1,this._startTime=void 0!==t?"string"==typeof t?TWEEN.now()+parseFloat(t):t:TWEEN.now(),this._startTime+=this._delayTime,this._valuesEnd){if(this._valuesEnd[n]instanceof Array){if(0===this._valuesEnd[n].length)continue;this._valuesEnd[n]=[this._object[n]].concat(this._valuesEnd[n])}void 0!==this._object[n]&&(this._valuesStart[n]=this._object[n],this._valuesStart[n]instanceof Array==0&&(this._valuesStart[n]*=1),this._valuesStartRepeat[n]=this._valuesStart[n]||0)}return this},stop:function(){return this._isPlaying&&(this._group.remove(this),this._isPlaying=!1,null!==this._onStopCallback&&this._onStopCallback(this._object),this.stopChainedTweens()),this},end:function(){return this.update(1/0),this},stopChainedTweens:function(){for(var t=0,n=this._chainedTweens.length;t<n;t++)this._chainedTweens[t].stop()},group:function(t){return this._group=t,this},delay:function(t){return this._delayTime=t,this},repeat:function(t){return this._repeat=t,this},repeatDelay:function(t){return this._repeatDelayTime=t,this},yoyo:function(t){return this._yoyo=t,this},easing:function(t){return this._easingFunction=t,this},interpolation:function(t){return this._interpolationFunction=t,this},chain:function(){return this._chainedTweens=arguments,this},onStart:function(t){return this._onStartCallback=t,this},onUpdate:function(t){return this._onUpdateCallback=t,this},onComplete:function(t){return this._onCompleteCallback=t,this},onStop:function(t){return this._onStopCallback=t,this},update:function(t){var n,e,i;if(t<this._startTime)return!0;for(n in!1===this._onStartCallbackFired&&(null!==this._onStartCallback&&this._onStartCallback(this._object),this._onStartCallbackFired=!0),e=(t-this._startTime)/this._duration,e=0===this._duration||1<e?1:e,i=this._easingFunction(e),this._valuesEnd)if(void 0!==this._valuesStart[n]){var r=this._valuesStart[n]||0,a=this._valuesEnd[n];a instanceof Array?this._object[n]=this._interpolationFunction(a,i):("string"==typeof a&&(a="+"===a.charAt(0)||"-"===a.charAt(0)?r+parseFloat(a):parseFloat(a)),"number"==typeof a&&(this._object[n]=r+(a-r)*i))}if(null!==this._onUpdateCallback&&this._onUpdateCallback(this._object),1!==e)return!0;if(0<this._repeat){for(n in isFinite(this._repeat)&&this._repeat--,this._valuesStartRepeat){if("string"==typeof this._valuesEnd[n]&&(this._valuesStartRepeat[n]=this._valuesStartRepeat[n]+parseFloat(this._valuesEnd[n])),this._yoyo){var s=this._valuesStartRepeat[n];this._valuesStartRepeat[n]=this._valuesEnd[n],this._valuesEnd[n]=s}this._valuesStart[n]=this._valuesStartRepeat[n]}return this._yoyo&&(this._reversed=!this._reversed),void 0!==this._repeatDelayTime?this._startTime=t+this._repeatDelayTime:this._startTime=t+this._delayTime,!0}null!==this._onCompleteCallback&&this._onCompleteCallback(this._object);for(var o=0,u=this._chainedTweens.length;o<u;o++)this._chainedTweens[o].start(this._startTime+this._duration);return!1}},TWEEN.Easing={Linear:{None:function(t){return t}},Quadratic:{In:function(t){return t*t},Out:function(t){return t*(2-t)},InOut:function(t){return(t*=2)<1?.5*t*t:-.5*(--t*(t-2)-1)}},Cubic:{In:function(t){return t*t*t},Out:function(t){return--t*t*t+1},InOut:function(t){return(t*=2)<1?.5*t*t*t:.5*((t-=2)*t*t+2)}},Quartic:{In:function(t){return t*t*t*t},Out:function(t){return 1- --t*t*t*t},InOut:function(t){return(t*=2)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)}},Quintic:{In:function(t){return t*t*t*t*t},Out:function(t){return--t*t*t*t*t+1},InOut:function(t){return(t*=2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)}},Sinusoidal:{In:function(t){return 1-Math.cos(t*Math.PI/2)},Out:function(t){return Math.sin(t*Math.PI/2)},InOut:function(t){return.5*(1-Math.cos(Math.PI*t))}},Exponential:{In:function(t){return 0===t?0:Math.pow(1024,t-1)},Out:function(t){return 1===t?1:1-Math.pow(2,-10*t)},InOut:function(t){return 0===t?0:1===t?1:(t*=2)<1?.5*Math.pow(1024,t-1):.5*(2-Math.pow(2,-10*(t-1)))}},Circular:{In:function(t){return 1-Math.sqrt(1-t*t)},Out:function(t){return Math.sqrt(1- --t*t)},InOut:function(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)}},Elastic:{In:function(t){return 0===t?0:1===t?1:-Math.pow(2,10*(t-1))*Math.sin(5*(t-1.1)*Math.PI)},Out:function(t){return 0===t?0:1===t?1:Math.pow(2,-10*t)*Math.sin(5*(t-.1)*Math.PI)+1},InOut:function(t){return 0===t?0:1===t?1:(t*=2)<1?-.5*Math.pow(2,10*(t-1))*Math.sin(5*(t-1.1)*Math.PI):.5*Math.pow(2,-10*(t-1))*Math.sin(5*(t-1.1)*Math.PI)+1}},Back:{In:function(t){return t*t*(2.70158*t-1.70158)},Out:function(t){return--t*t*(2.70158*t+1.70158)+1},InOut:function(t){var n=2.5949095;return(t*=2)<1?t*t*((1+n)*t-n)*.5:.5*((t-=2)*t*((1+n)*t+n)+2)}},Bounce:{In:function(t){return 1-TWEEN.Easing.Bounce.Out(1-t)},Out:function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},InOut:function(t){return t<.5?.5*TWEEN.Easing.Bounce.In(2*t):.5*TWEEN.Easing.Bounce.Out(2*t-1)+.5}}},TWEEN.Interpolation={Linear:function(t,n){var e=t.length-1,i=e*n,r=Math.floor(i),a=TWEEN.Interpolation.Utils.Linear;return n<0?a(t[0],t[1],i):1<n?a(t[e],t[e-1],e-i):a(t[r],t[e<r+1?e:r+1],i-r)},Bezier:function(t,n){for(var e=0,i=t.length-1,r=Math.pow,a=TWEEN.Interpolation.Utils.Bernstein,s=0;s<=i;s++)e+=r(1-n,i-s)*r(n,s)*t[s]*a(i,s);return e},CatmullRom:function(t,n){var e=t.length-1,i=e*n,r=Math.floor(i),a=TWEEN.Interpolation.Utils.CatmullRom;return t[0]===t[e]?(n<0&&(r=Math.floor(i=e*(1+n))),a(t[(r-1+e)%e],t[r],t[(r+1)%e],t[(r+2)%e],i-r)):n<0?t[0]-(a(t[0],t[0],t[1],t[1],-i)-t[0]):1<n?t[e]-(a(t[e],t[e],t[e-1],t[e-1],i-e)-t[e]):a(t[r?r-1:0],t[r],t[e<r+1?e:r+1],t[e<r+2?e:r+2],i-r)},Utils:{Linear:function(t,n,e){return(n-t)*e+t},Bernstein:function(t,n){var e=TWEEN.Interpolation.Utils.Factorial;return e(t)/e(n)/e(t-n)},Factorial:(i=[1],function(t){var n=1;if(i[t])return i[t];for(var e=t;1<e;e--)n*=e;return i[t]=n}),CatmullRom:function(t,n,e,i,r){var a=.5*(e-t),s=.5*(i-n),o=r*r;return(2*n-2*e+a+s)*(r*o)+(-3*n+3*e-2*a-s)*o+a*r+n}}},t=void 0,"function"==typeof define&&__webpack_require__(689)?define([],(function(){return TWEEN})):"object"==typeof exports?module.exports=TWEEN:void 0!==t&&(t.TWEEN=TWEEN)}).call(this,__webpack_require__(163),__webpack_require__(164)(module))}}]);
//# sourceMappingURL=9.3351f99d1a80c478576d.bundle.js.map
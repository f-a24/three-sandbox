(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{597:function(module,exports,__webpack_require__){var f;module.exports=((f=function(){function e(a){return c.appendChild(a.dom),a}function u(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",c.addEventListener("click",(function(a){a.preventDefault(),u(++l%c.children.length)}),!1);var k=(performance||Date).now(),g=k,a=0,r=e(new f.Panel("FPS","#0ff","#002")),h=e(new f.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var t=e(new f.Panel("MB","#f08","#201"));return u(0),{REVISION:16,dom:c,addPanel:e,showPanel:u,begin:function(){k=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();if(h.update(c-k,200),c>g+1e3&&(r.update(1e3*a/(c-g),100),g=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){k=this.end()},domElement:c,setMode:u}}).Panel=function(e,f,l){var c=1/0,k=0,g=Math.round,a=g(window.devicePixelRatio||1),r=80*a,h=48*a,t=3*a,v=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r,q.height=h,q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");return b.font="bold "+9*a+"px Helvetica,Arial,sans-serif",b.textBaseline="top",b.fillStyle=l,b.fillRect(0,0,r,h),b.fillStyle=f,b.fillText(e,t,v),b.fillRect(d,m,n,p),b.fillStyle=l,b.globalAlpha=.9,b.fillRect(d,m,n,p),{dom:q,update:function(h,w){c=Math.min(c,h),k=Math.max(k,h),b.fillStyle=l,b.globalAlpha=1,b.fillRect(0,0,r,m),b.fillStyle=f,b.fillText(g(h)+" "+e+" ("+g(c)+"-"+g(k)+")",t,v),b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p),b.fillRect(d+n-a,m,a,p),b.fillStyle=l,b.globalAlpha=.9,b.fillRect(d+n-a,m,a,g((1-h/w)*p))}}},f)},602:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return OBJLoader}));var _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(598),OBJLoader=function(){var object_pattern=/^[og]\s*(.+)?/,material_library_pattern=/^mtllib /,material_use_pattern=/^usemtl /;function ParserState(){var state={objects:[],object:{},vertices:[],normals:[],colors:[],uvs:[],materialLibraries:[],startObject:function(name,fromDeclaration){if(this.object&&!1===this.object.fromDeclaration)return this.object.name=name,void(this.object.fromDeclaration=!1!==fromDeclaration);var previousMaterial=this.object&&"function"==typeof this.object.currentMaterial?this.object.currentMaterial():void 0;if(this.object&&"function"==typeof this.object._finalize&&this.object._finalize(!0),this.object={name:name||"",fromDeclaration:!1!==fromDeclaration,geometry:{vertices:[],normals:[],colors:[],uvs:[]},materials:[],smooth:!0,startMaterial:function(name,libraries){var previous=this._finalize(!1);previous&&(previous.inherited||previous.groupCount<=0)&&this.materials.splice(previous.index,1);var material={index:this.materials.length,name:name||"",mtllib:Array.isArray(libraries)&&libraries.length>0?libraries[libraries.length-1]:"",smooth:void 0!==previous?previous.smooth:this.smooth,groupStart:void 0!==previous?previous.groupEnd:0,groupEnd:-1,groupCount:-1,inherited:!1,clone:function(index){var cloned={index:"number"==typeof index?index:this.index,name:this.name,mtllib:this.mtllib,smooth:this.smooth,groupStart:0,groupEnd:-1,groupCount:-1,inherited:!1};return cloned.clone=this.clone.bind(cloned),cloned}};return this.materials.push(material),material},currentMaterial:function(){if(this.materials.length>0)return this.materials[this.materials.length-1]},_finalize:function(end){var lastMultiMaterial=this.currentMaterial();if(lastMultiMaterial&&-1===lastMultiMaterial.groupEnd&&(lastMultiMaterial.groupEnd=this.geometry.vertices.length/3,lastMultiMaterial.groupCount=lastMultiMaterial.groupEnd-lastMultiMaterial.groupStart,lastMultiMaterial.inherited=!1),end&&this.materials.length>1)for(var mi=this.materials.length-1;mi>=0;mi--)this.materials[mi].groupCount<=0&&this.materials.splice(mi,1);return end&&0===this.materials.length&&this.materials.push({name:"",smooth:this.smooth}),lastMultiMaterial}},previousMaterial&&previousMaterial.name&&"function"==typeof previousMaterial.clone){var declared=previousMaterial.clone(0);declared.inherited=!0,this.object.materials.push(declared)}this.objects.push(this.object)},finalize:function(){this.object&&"function"==typeof this.object._finalize&&this.object._finalize(!0)},parseVertexIndex:function(value,len){var index=parseInt(value,10);return 3*(index>=0?index-1:index+len/3)},parseNormalIndex:function(value,len){var index=parseInt(value,10);return 3*(index>=0?index-1:index+len/3)},parseUVIndex:function(value,len){var index=parseInt(value,10);return 2*(index>=0?index-1:index+len/2)},addVertex:function(a,b,c){var src=this.vertices,dst=this.object.geometry.vertices;dst.push(src[a+0],src[a+1],src[a+2]),dst.push(src[b+0],src[b+1],src[b+2]),dst.push(src[c+0],src[c+1],src[c+2])},addVertexPoint:function(a){var src=this.vertices;this.object.geometry.vertices.push(src[a+0],src[a+1],src[a+2])},addVertexLine:function(a){var src=this.vertices;this.object.geometry.vertices.push(src[a+0],src[a+1],src[a+2])},addNormal:function(a,b,c){var src=this.normals,dst=this.object.geometry.normals;dst.push(src[a+0],src[a+1],src[a+2]),dst.push(src[b+0],src[b+1],src[b+2]),dst.push(src[c+0],src[c+1],src[c+2])},addColor:function(a,b,c){var src=this.colors,dst=this.object.geometry.colors;dst.push(src[a+0],src[a+1],src[a+2]),dst.push(src[b+0],src[b+1],src[b+2]),dst.push(src[c+0],src[c+1],src[c+2])},addUV:function(a,b,c){var src=this.uvs,dst=this.object.geometry.uvs;dst.push(src[a+0],src[a+1]),dst.push(src[b+0],src[b+1]),dst.push(src[c+0],src[c+1])},addUVLine:function(a){var src=this.uvs;this.object.geometry.uvs.push(src[a+0],src[a+1])},addFace:function(a,b,c,ua,ub,uc,na,nb,nc){var vLen=this.vertices.length,ia=this.parseVertexIndex(a,vLen),ib=this.parseVertexIndex(b,vLen),ic=this.parseVertexIndex(c,vLen);if(this.addVertex(ia,ib,ic),void 0!==ua&&""!==ua){var uvLen=this.uvs.length;ia=this.parseUVIndex(ua,uvLen),ib=this.parseUVIndex(ub,uvLen),ic=this.parseUVIndex(uc,uvLen),this.addUV(ia,ib,ic)}if(void 0!==na&&""!==na){var nLen=this.normals.length;ia=this.parseNormalIndex(na,nLen),ib=na===nb?ia:this.parseNormalIndex(nb,nLen),ic=na===nc?ia:this.parseNormalIndex(nc,nLen),this.addNormal(ia,ib,ic)}this.colors.length>0&&this.addColor(ia,ib,ic)},addPointGeometry:function(vertices){this.object.geometry.type="Points";for(var vLen=this.vertices.length,vi=0,l=vertices.length;vi<l;vi++)this.addVertexPoint(this.parseVertexIndex(vertices[vi],vLen))},addLineGeometry:function(vertices,uvs){this.object.geometry.type="Line";for(var vLen=this.vertices.length,uvLen=this.uvs.length,vi=0,l=vertices.length;vi<l;vi++)this.addVertexLine(this.parseVertexIndex(vertices[vi],vLen));var uvi=0;for(l=uvs.length;uvi<l;uvi++)this.addUVLine(this.parseUVIndex(uvs[uvi],uvLen))}};return state.startObject("",!1),state}function OBJLoader(manager){this.manager=void 0!==manager?manager:_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.DefaultLoadingManager,this.materials=null}return OBJLoader.prototype={constructor:OBJLoader,load:function(url,onLoad,onProgress,onError){var scope=this,loader=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.FileLoader(scope.manager);loader.setPath(this.path),loader.load(url,(function(text){onLoad(scope.parse(text))}),onProgress,onError)},setPath:function(value){return this.path=value,this},setMaterials:function(materials){return this.materials=materials,this},parse:function(text){console.time("OBJLoader");var state=new ParserState;-1!==text.indexOf("\r\n")&&(text=text.replace(/\r\n/g,"\n")),-1!==text.indexOf("\\\n")&&(text=text.replace(/\\\n/g,""));for(var lines=text.split("\n"),line="",lineFirstChar="",result=[],trimLeft="function"==typeof"".trimLeft,i=0,l=lines.length;i<l;i++)if(line=lines[i],0!==(line=trimLeft?line.trimLeft():line.trim()).length&&"#"!==(lineFirstChar=line.charAt(0)))if("v"===lineFirstChar){var data=line.split(/\s+/);switch(data[0]){case"v":state.vertices.push(parseFloat(data[1]),parseFloat(data[2]),parseFloat(data[3])),data.length>=7&&state.colors.push(parseFloat(data[4]),parseFloat(data[5]),parseFloat(data[6]));break;case"vn":state.normals.push(parseFloat(data[1]),parseFloat(data[2]),parseFloat(data[3]));break;case"vt":state.uvs.push(parseFloat(data[1]),parseFloat(data[2]))}}else if("f"===lineFirstChar){for(var vertexData=line.substr(1).trim().split(/\s+/),faceVertices=[],j=0,jl=vertexData.length;j<jl;j++){var vertex=vertexData[j];if(vertex.length>0){var vertexParts=vertex.split("/");faceVertices.push(vertexParts)}}var v1=faceVertices[0];for(j=1,jl=faceVertices.length-1;j<jl;j++){var v2=faceVertices[j],v3=faceVertices[j+1];state.addFace(v1[0],v2[0],v3[0],v1[1],v2[1],v3[1],v1[2],v2[2],v3[2])}}else if("l"===lineFirstChar){var lineParts=line.substring(1).trim().split(" "),lineVertices=[],lineUVs=[];if(-1===line.indexOf("/"))lineVertices=lineParts;else for(var li=0,llen=lineParts.length;li<llen;li++){var parts=lineParts[li].split("/");""!==parts[0]&&lineVertices.push(parts[0]),""!==parts[1]&&lineUVs.push(parts[1])}state.addLineGeometry(lineVertices,lineUVs)}else if("p"===lineFirstChar){var pointData=line.substr(1).trim().split(" ");state.addPointGeometry(pointData)}else if(null!==(result=object_pattern.exec(line))){var name=(" "+result[0].substr(1).trim()).substr(1);state.startObject(name)}else if(material_use_pattern.test(line))state.object.startMaterial(line.substring(7).trim(),state.materialLibraries);else if(material_library_pattern.test(line))state.materialLibraries.push(line.substring(7).trim());else{if("s"!==lineFirstChar){if("\0"===line)continue;throw new Error('THREE.OBJLoader: Unexpected line: "'+line+'"')}if((result=line.split(" ")).length>1){var value=result[1].trim().toLowerCase();state.object.smooth="0"!==value&&"off"!==value}else state.object.smooth=!0;(material=state.object.currentMaterial())&&(material.smooth=state.object.smooth)}state.finalize();var container=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Group;container.materialLibraries=[].concat(state.materialLibraries);for(i=0,l=state.objects.length;i<l;i++){var object=state.objects[i],geometry=object.geometry,materials=object.materials,isLine="Line"===geometry.type,isPoints="Points"===geometry.type,hasVertexColors=!1;if(0!==geometry.vertices.length){var buffergeometry=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.BufferGeometry;buffergeometry.addAttribute("position",new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Float32BufferAttribute(geometry.vertices,3)),geometry.normals.length>0?buffergeometry.addAttribute("normal",new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Float32BufferAttribute(geometry.normals,3)):buffergeometry.computeVertexNormals(),geometry.colors.length>0&&(hasVertexColors=!0,buffergeometry.addAttribute("color",new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Float32BufferAttribute(geometry.colors,3))),geometry.uvs.length>0&&buffergeometry.addAttribute("uv",new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Float32BufferAttribute(geometry.uvs,2));for(var mesh,createdMaterials=[],mi=0,miLen=materials.length;mi<miLen;mi++){var sourceMaterial=materials[mi],material=void 0;if(null!==this.materials)if(material=this.materials.create(sourceMaterial.name),!isLine||!material||material instanceof _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.LineBasicMaterial){if(isPoints&&material&&!(material instanceof _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.PointsMaterial)){var materialPoints=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.PointsMaterial({size:10,sizeAttenuation:!1});_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Material.prototype.copy.call(materialPoints,material),materialPoints.color.copy(material.color),materialPoints.map=material.map,materialPoints.lights=!1,material=materialPoints}}else{var materialLine=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.LineBasicMaterial;_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Material.prototype.copy.call(materialLine,material),materialLine.color.copy(material.color),materialLine.lights=!1,material=materialLine}material||((material=isLine?new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.LineBasicMaterial:isPoints?new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.PointsMaterial({size:1,sizeAttenuation:!1}):new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.MeshPhongMaterial).name=sourceMaterial.name),material.flatShading=!sourceMaterial.smooth,material.vertexColors=hasVertexColors?_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.VertexColors:_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.NoColors,createdMaterials.push(material)}if(createdMaterials.length>1){for(mi=0,miLen=materials.length;mi<miLen;mi++){sourceMaterial=materials[mi];buffergeometry.addGroup(sourceMaterial.groupStart,sourceMaterial.groupCount,mi)}mesh=isLine?new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.LineSegments(buffergeometry,createdMaterials):isPoints?new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Points(buffergeometry,createdMaterials):new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Mesh(buffergeometry,createdMaterials)}else mesh=isLine?new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.LineSegments(buffergeometry,createdMaterials[0]):isPoints?new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Points(buffergeometry,createdMaterials[0]):new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Mesh(buffergeometry,createdMaterials[0]);mesh.name=object.name,container.add(mesh)}}return console.timeEnd("OBJLoader"),container}},OBJLoader}()},606:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return MTLLoader}));var _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(598),MTLLoader=function(manager){this.manager=void 0!==manager?manager:_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.DefaultLoadingManager};MTLLoader.prototype={constructor:MTLLoader,crossOrigin:"anonymous",load:function(url,onLoad,onProgress,onError){var scope=this,path=void 0===this.path?_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.LoaderUtils.extractUrlBase(url):this.path,loader=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.FileLoader(this.manager);loader.setPath(this.path),loader.load(url,(function(text){onLoad(scope.parse(text,path))}),onProgress,onError)},setPath:function(path){return this.path=path,this},setResourcePath:function(path){return this.resourcePath=path,this},setTexturePath:function(path){return console.warn("THREE.MTLLoader: .setTexturePath() has been renamed to .setResourcePath()."),this.setResourcePath(path)},setCrossOrigin:function(value){return this.crossOrigin=value,this},setMaterialOptions:function(value){return this.materialOptions=value,this},parse:function(text,path){for(var lines=text.split("\n"),info={},delimiter_pattern=/\s+/,materialsInfo={},i=0;i<lines.length;i++){var line=lines[i];if(0!==(line=line.trim()).length&&"#"!==line.charAt(0)){var pos=line.indexOf(" "),key=pos>=0?line.substring(0,pos):line;key=key.toLowerCase();var value=pos>=0?line.substring(pos+1):"";if(value=value.trim(),"newmtl"===key)info={name:value},materialsInfo[value]=info;else if("ka"===key||"kd"===key||"ks"===key||"ke"===key){var ss=value.split(delimiter_pattern,3);info[key]=[parseFloat(ss[0]),parseFloat(ss[1]),parseFloat(ss[2])]}else info[key]=value}}var materialCreator=new MTLLoader.MaterialCreator(this.resourcePath||path,this.materialOptions);return materialCreator.setCrossOrigin(this.crossOrigin),materialCreator.setManager(this.manager),materialCreator.setMaterials(materialsInfo),materialCreator}},MTLLoader.MaterialCreator=function(baseUrl,options){this.baseUrl=baseUrl||"",this.options=options,this.materialsInfo={},this.materials={},this.materialsArray=[],this.nameLookup={},this.side=this.options&&this.options.side?this.options.side:_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.FrontSide,this.wrap=this.options&&this.options.wrap?this.options.wrap:_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.RepeatWrapping},MTLLoader.MaterialCreator.prototype={constructor:MTLLoader.MaterialCreator,crossOrigin:"anonymous",setCrossOrigin:function(value){return this.crossOrigin=value,this},setManager:function(value){this.manager=value},setMaterials:function(materialsInfo){this.materialsInfo=this.convert(materialsInfo),this.materials={},this.materialsArray=[],this.nameLookup={}},convert:function(materialsInfo){if(!this.options)return materialsInfo;var converted={};for(var mn in materialsInfo){var mat=materialsInfo[mn],covmat={};for(var prop in converted[mn]=covmat,mat){var save=!0,value=mat[prop],lprop=prop.toLowerCase();switch(lprop){case"kd":case"ka":case"ks":this.options&&this.options.normalizeRGB&&(value=[value[0]/255,value[1]/255,value[2]/255]),this.options&&this.options.ignoreZeroRGBs&&0===value[0]&&0===value[1]&&0===value[2]&&(save=!1)}save&&(covmat[lprop]=value)}}return converted},preload:function(){for(var mn in this.materialsInfo)this.create(mn)},getIndex:function(materialName){return this.nameLookup[materialName]},getAsArray:function(){var index=0;for(var mn in this.materialsInfo)this.materialsArray[index]=this.create(mn),this.nameLookup[mn]=index,index++;return this.materialsArray},create:function(materialName){return void 0===this.materials[materialName]&&this.createMaterial_(materialName),this.materials[materialName]},createMaterial_:function(materialName){var scope=this,mat=this.materialsInfo[materialName],params={name:materialName,side:this.side};function setMapForType(mapType,value){if(!params[mapType]){var texParams=scope.getTextureParams(value,params),map=scope.loadTexture(function resolveURL(baseUrl,url){return"string"!=typeof url||""===url?"":/^https?:\/\//i.test(url)?url:baseUrl+url}(scope.baseUrl,texParams.url));map.repeat.copy(texParams.scale),map.offset.copy(texParams.offset),map.wrapS=scope.wrap,map.wrapT=scope.wrap,params[mapType]=map}}for(var prop in mat){var n,value=mat[prop];if(""!==value)switch(prop.toLowerCase()){case"kd":params.color=(new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Color).fromArray(value);break;case"ks":params.specular=(new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Color).fromArray(value);break;case"ke":params.emissive=(new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Color).fromArray(value);break;case"map_kd":setMapForType("map",value);break;case"map_ks":setMapForType("specularMap",value);break;case"map_ke":setMapForType("emissiveMap",value);break;case"norm":setMapForType("normalMap",value);break;case"map_bump":case"bump":setMapForType("bumpMap",value);break;case"map_d":setMapForType("alphaMap",value),params.transparent=!0;break;case"ns":params.shininess=parseFloat(value);break;case"d":(n=parseFloat(value))<1&&(params.opacity=n,params.transparent=!0);break;case"tr":n=parseFloat(value),this.options&&this.options.invertTrProperty&&(n=1-n),n>0&&(params.opacity=1-n,params.transparent=!0)}}return this.materials[materialName]=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.MeshPhongMaterial(params),this.materials[materialName]},getTextureParams:function(value,matParams){var pos,texParams={scale:new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector2(1,1),offset:new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Vector2(0,0)},items=value.split(/\s+/);return(pos=items.indexOf("-bm"))>=0&&(matParams.bumpScale=parseFloat(items[pos+1]),items.splice(pos,2)),(pos=items.indexOf("-s"))>=0&&(texParams.scale.set(parseFloat(items[pos+1]),parseFloat(items[pos+2])),items.splice(pos,4)),(pos=items.indexOf("-o"))>=0&&(texParams.offset.set(parseFloat(items[pos+1]),parseFloat(items[pos+2])),items.splice(pos,4)),texParams.url=items.join(" ").trim(),texParams},loadTexture:function(url,mapping,onLoad,onProgress,onError){var texture,loader=_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Loader.Handlers.get(url),manager=void 0!==this.manager?this.manager:_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.DefaultLoadingManager;return null===loader&&(loader=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.TextureLoader(manager)),loader.setCrossOrigin&&loader.setCrossOrigin(this.crossOrigin),texture=loader.load(url,onLoad,onProgress,onError),void 0!==mapping&&(texture.mapping=mapping),texture}}}}]);
//# sourceMappingURL=2.53f8f83f2eec7c90b531.bundle.js.map
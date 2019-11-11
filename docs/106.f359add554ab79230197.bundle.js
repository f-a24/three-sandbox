(window.webpackJsonp=window.webpackJsonp||[]).push([[106],{370:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var three_module=__webpack_require__(718),stats_min=__webpack_require__(719),STLLoader=function(manager){three_module.Loader.call(this,manager)};STLLoader.prototype=Object.assign(Object.create(three_module.Loader.prototype),{constructor:STLLoader,load:function(url,onLoad,onProgress,onError){var scope=this,loader=new three_module.FileLoader(scope.manager);loader.setPath(scope.path),loader.setResponseType("arraybuffer"),loader.load(url,(function(text){try{onLoad(scope.parse(text))}catch(exception){onError&&onError(exception)}}),onProgress,onError)},parse:function(data){function matchDataViewAt(query,reader,offset){for(var i=0,il=query.length;i<il;i++)if(query[i]!==reader.getUint8(offset+i,!1))return!1;return!0}var binData=function ensureBinary(buffer){if("string"==typeof buffer){for(var array_buffer=new Uint8Array(buffer.length),i=0;i<buffer.length;i++)array_buffer[i]=255&buffer.charCodeAt(i);return array_buffer.buffer||array_buffer}return buffer}(data);return function isBinary(data){var reader;if(50,84+50*(reader=new DataView(data)).getUint32(80,!0)===reader.byteLength)return!0;for(var solid=[115,111,108,105,100],off=0;off<5;off++)if(matchDataViewAt(solid,reader,off))return!1;return!0}(binData)?function parseBinary(data){for(var r,g,b,colors,defaultR,defaultG,defaultB,alpha,reader=new DataView(data),faces=reader.getUint32(80,!0),hasColors=!1,index=0;index<70;index++)1129270351==reader.getUint32(index,!1)&&82==reader.getUint8(index+4)&&61==reader.getUint8(index+5)&&(hasColors=!0,colors=new Float32Array(3*faces*3),defaultR=reader.getUint8(index+6)/255,defaultG=reader.getUint8(index+7)/255,defaultB=reader.getUint8(index+8)/255,alpha=reader.getUint8(index+9)/255);for(var geometry=new three_module.BufferGeometry,vertices=new Float32Array(3*faces*3),normals=new Float32Array(3*faces*3),face=0;face<faces;face++){var start=84+50*face,normalX=reader.getFloat32(start,!0),normalY=reader.getFloat32(start+4,!0),normalZ=reader.getFloat32(start+8,!0);if(hasColors){var packedColor=reader.getUint16(start+48,!0);0==(32768&packedColor)?(r=(31&packedColor)/31,g=(packedColor>>5&31)/31,b=(packedColor>>10&31)/31):(r=defaultR,g=defaultG,b=defaultB)}for(var i=1;i<=3;i++){var vertexstart=start+12*i,componentIdx=3*face*3+3*(i-1);vertices[componentIdx]=reader.getFloat32(vertexstart,!0),vertices[componentIdx+1]=reader.getFloat32(vertexstart+4,!0),vertices[componentIdx+2]=reader.getFloat32(vertexstart+8,!0),normals[componentIdx]=normalX,normals[componentIdx+1]=normalY,normals[componentIdx+2]=normalZ,hasColors&&(colors[componentIdx]=r,colors[componentIdx+1]=g,colors[componentIdx+2]=b)}}return geometry.setAttribute("position",new three_module.BufferAttribute(vertices,3)),geometry.setAttribute("normal",new three_module.BufferAttribute(normals,3)),hasColors&&(geometry.setAttribute("color",new three_module.BufferAttribute(colors,3)),geometry.hasColors=!0,geometry.alpha=alpha),geometry}(binData):function parseASCII(data){for(var result,geometry=new three_module.BufferGeometry,patternSolid=/solid([\s\S]*?)endsolid/g,patternFace=/facet([\s\S]*?)endfacet/g,faceCounter=0,patternFloat=/[\s]+([+-]?(?:\d*)(?:\.\d*)?(?:[eE][+-]?\d+)?)/.source,patternVertex=new RegExp("vertex"+patternFloat+patternFloat+patternFloat,"g"),patternNormal=new RegExp("normal"+patternFloat+patternFloat+patternFloat,"g"),vertices=[],normals=[],normal=new three_module.Vector3,groupVertexes=[],groupCount=0,startVertex=0,endVertex=0;null!==(result=patternSolid.exec(data));){startVertex=endVertex;for(var solid=result[0];null!==(result=patternFace.exec(solid));){for(var vertexCountPerFace=0,normalCountPerFace=0,text=result[0];null!==(result=patternNormal.exec(text));)normal.x=parseFloat(result[1]),normal.y=parseFloat(result[2]),normal.z=parseFloat(result[3]),normalCountPerFace++;for(;null!==(result=patternVertex.exec(text));)vertices.push(parseFloat(result[1]),parseFloat(result[2]),parseFloat(result[3])),normals.push(normal.x,normal.y,normal.z),vertexCountPerFace++,endVertex++;1!==normalCountPerFace&&console.error("THREE.STLLoader: Something isn't right with the normal of face number "+faceCounter),3!==vertexCountPerFace&&console.error("THREE.STLLoader: Something isn't right with the vertices of face number "+faceCounter),faceCounter++}groupVertexes.push({startVertex:startVertex,endVertex:endVertex}),groupCount++}if(geometry.setAttribute("position",new three_module.Float32BufferAttribute(vertices,3)),geometry.setAttribute("normal",new three_module.Float32BufferAttribute(normals,3)),groupCount>0)for(var i=0;i<groupVertexes.length;i++)geometry.addGroup(groupVertexes[i].startVertex,groupVertexes[i].endVertex,i);return geometry}(function ensureString(buffer){return"string"!=typeof buffer?three_module.LoaderUtils.decodeText(new Uint8Array(buffer)):buffer}(data))}});__webpack_exports__.default=function(){var VIEWPORT_W=window.innerWidth,VIEWPORT_H=window.innerHeight,scene=new three_module.Scene,camera=new three_module.PerspectiveCamera(45,VIEWPORT_W/VIEWPORT_H,.1,1e3);camera.position.x=150,camera.position.y=150,camera.position.z=150,camera.lookAt(new three_module.Vector3(0,40,0));var renderer=new three_module.WebGLRenderer;renderer.setClearColor(new three_module.Color(0)),renderer.setSize(VIEWPORT_W,VIEWPORT_H),renderer.shadowMap.enabled=!0;var spotLight=new three_module.SpotLight(16777215);spotLight.position.set(150,150,150),scene.add(spotLight),document.getElementById("WebGL-output").appendChild(renderer.domElement);var loader=new STLLoader,group=new three_module.Object3D;loader.load("./assets/SolidHead_2_lowPoly_42k.stl",(function(geometry){var mat=new three_module.MeshLambertMaterial({color:7829503});(group=new three_module.Mesh(geometry,mat)).rotation.x=-.5*Math.PI,group.scale.set(.6,.6,.6),scene.add(group)}));var statsObj,stats=((statsObj=new stats_min).showPanel(0),statsObj.dom.style.position="absolute",statsObj.dom.style.left="0px",statsObj.dom.style.top="0px",document.getElementById("Stats-output").appendChild(statsObj.dom),statsObj);window.addEventListener("resize",(function(){camera.aspect=window.innerWidth/window.innerHeight,camera.updateProjectionMatrix(),renderer.setSize(window.innerWidth,window.innerHeight)}),!1);var renderScene=function(){stats.update(),group&&(group.rotation.z+=.006),requestAnimationFrame(renderScene),renderer.render(scene,camera)};renderScene()}},719:function(module,exports,__webpack_require__){var f;module.exports=((f=function(){function e(a){return c.appendChild(a.dom),a}function u(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",c.addEventListener("click",(function(a){a.preventDefault(),u(++l%c.children.length)}),!1);var k=(performance||Date).now(),g=k,a=0,r=e(new f.Panel("FPS","#0ff","#002")),h=e(new f.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var t=e(new f.Panel("MB","#f08","#201"));return u(0),{REVISION:16,dom:c,addPanel:e,showPanel:u,begin:function(){k=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();if(h.update(c-k,200),c>g+1e3&&(r.update(1e3*a/(c-g),100),g=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){k=this.end()},domElement:c,setMode:u}}).Panel=function(e,f,l){var c=1/0,k=0,g=Math.round,a=g(window.devicePixelRatio||1),r=80*a,h=48*a,t=3*a,v=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r,q.height=h,q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");return b.font="bold "+9*a+"px Helvetica,Arial,sans-serif",b.textBaseline="top",b.fillStyle=l,b.fillRect(0,0,r,h),b.fillStyle=f,b.fillText(e,t,v),b.fillRect(d,m,n,p),b.fillStyle=l,b.globalAlpha=.9,b.fillRect(d,m,n,p),{dom:q,update:function(h,w){c=Math.min(c,h),k=Math.max(k,h),b.fillStyle=l,b.globalAlpha=1,b.fillRect(0,0,r,m),b.fillStyle=f,b.fillText(g(h)+" "+e+" ("+g(c)+"-"+g(k)+")",t,v),b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p),b.fillRect(d+n-a,m,a,p),b.fillStyle=l,b.globalAlpha=.9,b.fillRect(d+n-a,m,a,g((1-h/w)*p))}}},f)}}]);
//# sourceMappingURL=106.f359add554ab79230197.bundle.js.map
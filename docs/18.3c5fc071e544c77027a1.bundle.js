(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{194:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var three__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(386),stats_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(385);__webpack_require__(411);__webpack_exports__.default=function(){var VIEWPORT_W=window.innerWidth,VIEWPORT_H=window.innerHeight,scene=new three__WEBPACK_IMPORTED_MODULE_0__.Scene,camera=new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(45,VIEWPORT_W/VIEWPORT_H,.1,1e3);camera.position.x=10,camera.position.y=10,camera.position.z=10,camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0,0,0));var renderer=new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer;renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_0__.Color(0)),renderer.setSize(VIEWPORT_W,VIEWPORT_H),renderer.shadowMap.enabled=!0;var spotLight=new three__WEBPACK_IMPORTED_MODULE_0__.SpotLight(16777215);spotLight.position.set(20,20,20),scene.add(spotLight),document.getElementById("WebGL-output").appendChild(renderer.domElement);var loader=new three__WEBPACK_IMPORTED_MODULE_0__.VTKLoader,group=new three__WEBPACK_IMPORTED_MODULE_0__.Object3D;loader.load("./assets/moai_fixed.vtk",function(geometry){geometry.computeFaceNormals(),geometry.computeVertexNormals();var mat=new three__WEBPACK_IMPORTED_MODULE_0__.MeshLambertMaterial({color:11206570});(group=new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(geometry,mat)).scale.set(9,9,9),scene.add(group)});var statsObj,stats=((statsObj=new stats_js__WEBPACK_IMPORTED_MODULE_1__).showPanel(0),statsObj.dom.style.position="absolute",statsObj.dom.style.left="0px",statsObj.dom.style.top="0px",document.getElementById("Stats-output").appendChild(statsObj.dom),statsObj);window.addEventListener("resize",function(){camera.aspect=window.innerWidth/window.innerHeight,camera.updateProjectionMatrix(),renderer.setSize(window.innerWidth,window.innerHeight)},!1);var renderScene=function(){stats.update(),group&&(group.rotation.y+=.006),requestAnimationFrame(renderScene),renderer.render(scene,camera)};renderScene()}},385:function(module,exports,__webpack_require__){var f;module.exports=((f=function(){function e(a){return c.appendChild(a.dom),a}function u(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",c.addEventListener("click",function(a){a.preventDefault(),u(++l%c.children.length)},!1);var k=(performance||Date).now(),g=k,a=0,r=e(new f.Panel("FPS","#0ff","#002")),h=e(new f.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var t=e(new f.Panel("MB","#f08","#201"));return u(0),{REVISION:16,dom:c,addPanel:e,showPanel:u,begin:function(){k=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();if(h.update(c-k,200),c>g+1e3&&(r.update(1e3*a/(c-g),100),g=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){k=this.end()},domElement:c,setMode:u}}).Panel=function(e,f,l){var c=1/0,k=0,g=Math.round,a=g(window.devicePixelRatio||1),r=80*a,h=48*a,t=3*a,v=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r,q.height=h,q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");return b.font="bold "+9*a+"px Helvetica,Arial,sans-serif",b.textBaseline="top",b.fillStyle=l,b.fillRect(0,0,r,h),b.fillStyle=f,b.fillText(e,t,v),b.fillRect(d,m,n,p),b.fillStyle=l,b.globalAlpha=.9,b.fillRect(d,m,n,p),{dom:q,update:function(h,w){c=Math.min(c,h),k=Math.max(k,h),b.fillStyle=l,b.globalAlpha=1,b.fillRect(0,0,r,m),b.fillStyle=f,b.fillText(g(h)+" "+e+" ("+g(c)+"-"+g(k)+")",t,v),b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p),b.fillRect(d+n-a,m,a,p),b.fillStyle=l,b.globalAlpha=.9,b.fillRect(d+n-a,m,a,g((1-h/w)*p))}}},f)},411:function(module,exports,__webpack_require__){var THREE=__webpack_require__(386);THREE.VTKLoader=function(manager){this.manager=void 0!==manager?manager:THREE.DefaultLoadingManager},Object.assign(THREE.VTKLoader.prototype,THREE.EventDispatcher.prototype,{load:function(url,onLoad,onProgress,onError){var scope=this,loader=new THREE.FileLoader(scope.manager);loader.setPath(scope.path),loader.setResponseType("arraybuffer"),loader.load(url,function(text){onLoad(scope.parse(text))},onProgress,onError)},setPath:function(value){return this.path=value,this},parse:function(data){function Int32Concat(first,second){var firstLength=first.length,result=new Int32Array(firstLength+second.length);return result.set(first),result.set(second,firstLength),result}function getStringFile(data){for(var stringFile="",charArray=new Uint8Array(data),i=0,len=charArray.length;len--;)stringFile+=String.fromCharCode(charArray[i++]);return stringFile}var meta=THREE.LoaderUtils.decodeText(new Uint8Array(data,0,250)).split("\n");return-1!==meta[0].indexOf("xml")?function parseXML(stringFile){function Base64toByteArray(b64){var i,j,l,tmp,placeHolders,arr,Arr="undefined"!=typeof Uint8Array?Uint8Array:Array,lookup=[],revLookup=[],code="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",len=code.length;for(i=0;i<len;i++)lookup[i]=code[i];for(i=0;i<len;++i)revLookup[code.charCodeAt(i)]=i;if(revLookup["-".charCodeAt(0)]=62,revLookup["_".charCodeAt(0)]=63,(len=b64.length)%4>0)throw new Error("Invalid string. Length must be a multiple of 4");arr=new Arr(3*len/4-(placeHolders="="===b64[len-2]?2:"="===b64[len-1]?1:0)),l=placeHolders>0?len-4:len;var L=0;for(i=0,j=0;i<l;i+=4,j+=3)tmp=revLookup[b64.charCodeAt(i)]<<18|revLookup[b64.charCodeAt(i+1)]<<12|revLookup[b64.charCodeAt(i+2)]<<6|revLookup[b64.charCodeAt(i+3)],arr[L++]=(16711680&tmp)>>16,arr[L++]=(65280&tmp)>>8,arr[L++]=255&tmp;return 2===placeHolders?(tmp=revLookup[b64.charCodeAt(i)]<<2|revLookup[b64.charCodeAt(i+1)]>>4,arr[L++]=255&tmp):1===placeHolders&&(tmp=revLookup[b64.charCodeAt(i)]<<10|revLookup[b64.charCodeAt(i+1)]<<4|revLookup[b64.charCodeAt(i+2)]>>2,arr[L++]=tmp>>8&255,arr[L++]=255&tmp),arr}function parseDataArray(ele,compressed){var first,second,firstLength,result,numBytes=0;if("UInt64"===json.attributes.header_type?numBytes=8:"UInt32"===json.attributes.header_type&&(numBytes=4),"binary"===ele.attributes.format&&compressed){var byteData,blocks,cSizeStart,headerSize,dataOffsets,currentOffset;if("Float32"===ele.attributes.type)var txt=new Float32Array;else"Int64"===ele.attributes.type&&(txt=new Int32Array);blocks=(byteData=Base64toByteArray(ele["#text"]))[0];for(var i=1;i<numBytes-1;i++)blocks|=byteData[i]<<i*numBytes;for(headerSize=(blocks+3)*numBytes,currentOffset=headerSize+=headerSize%3>0?3-headerSize%3:0,(dataOffsets=[]).push(currentOffset),cSizeStart=3*numBytes,i=0;i<blocks;i++){for(var currentBlockSize=byteData[i*numBytes+cSizeStart],j=1;j<numBytes-1;j++)currentBlockSize|=byteData[i*numBytes+cSizeStart+j]<<8*j;currentOffset+=currentBlockSize,dataOffsets.push(currentOffset)}for(i=0;i<dataOffsets.length-1;i++)content=(content=new Zlib.Inflate(byteData.slice(dataOffsets[i],dataOffsets[i+1]),{resize:!0,verify:!0}).decompress()).buffer,"Float32"===ele.attributes.type?(content=new Float32Array(content),second=content,firstLength=void 0,result=void 0,firstLength=(first=txt).length,(result=new Float32Array(firstLength+second.length)).set(first),result.set(second,firstLength),txt=result):"Int64"===ele.attributes.type&&(txt=Int32Concat(txt,content=new Int32Array(content)));delete ele["#text"],"Int64"===ele.attributes.type&&"binary"===ele.attributes.format&&(txt=txt.filter(function(el,idx){if(idx%2!=1)return!0}))}else{if("binary"!==ele.attributes.format||compressed)if(ele["#text"])var content=ele["#text"].split(/\s+/).filter(function(el){if(""!==el)return el});else content=new Int32Array(0).buffer;else content=(content=Base64toByteArray(ele["#text"])).slice(numBytes).buffer;delete ele["#text"],"Float32"===ele.attributes.type?txt=new Float32Array(content):"Int32"===ele.attributes.type?txt=new Int32Array(content):"Int64"===ele.attributes.type&&(txt=new Int32Array(content),"binary"===ele.attributes.format&&(txt=txt.filter(function(el,idx){if(idx%2!=1)return!0})))}return txt}var dom=null;if(window.DOMParser)try{dom=(new DOMParser).parseFromString(stringFile,"text/xml")}catch(e){dom=null}else{if(!window.ActiveXObject)throw new Error("Cannot parse xml string!");try{if((dom=new ActiveXObject("Microsoft.XMLDOM")).async=!1,!dom.loadXML())throw new Error(dom.parseError.reason+dom.parseError.srcText)}catch(e){dom=null}}var json=function xmlToJson(xml){var obj={};if(1===xml.nodeType){if(xml.attributes&&xml.attributes.length>0){obj.attributes={};for(var j=0;j<xml.attributes.length;j++){var attribute=xml.attributes.item(j);obj.attributes[attribute.nodeName]=attribute.nodeValue.trim()}}}else 3===xml.nodeType&&(obj=xml.nodeValue.trim());if(xml.hasChildNodes())for(var i=0;i<xml.childNodes.length;i++){var item=xml.childNodes.item(i),nodeName=item.nodeName;if(void 0===obj[nodeName])""!==(tmp=xmlToJson(item))&&(obj[nodeName]=tmp);else{if(void 0===obj[nodeName].push){var old=obj[nodeName];obj[nodeName]=[old]}var tmp;""!==(tmp=xmlToJson(item))&&obj[nodeName].push(tmp)}}return obj}(dom.documentElement),points=[],normals=[],indices=[];if(json.PolyData){for(var piece=json.PolyData.Piece,compressed=json.attributes.hasOwnProperty("compressor"),sections=["PointData","Points","Strips","Polys"],sectionIndex=0,numberOfSections=sections.length;sectionIndex<numberOfSections;){var section=piece[sections[sectionIndex]];if(section&&section.DataArray){if("[object Array]"===Object.prototype.toString.call(section.DataArray))var arr=section.DataArray;else arr=[section.DataArray];for(var dataArrayIndex=0,numberOfDataArrays=arr.length;dataArrayIndex<numberOfDataArrays;)"#text"in arr[dataArrayIndex]&&arr[dataArrayIndex]["#text"].length>0&&(arr[dataArrayIndex].text=parseDataArray(arr[dataArrayIndex],compressed)),dataArrayIndex++;switch(sections[sectionIndex]){case"PointData":var numberOfPoints=parseInt(piece.attributes.NumberOfPoints),normalsName=section.attributes.Normals;if(numberOfPoints>0)for(var i=0,len=arr.length;i<len;i++)if(normalsName===arr[i].attributes.Name){var components=arr[i].attributes.NumberOfComponents;(normals=new Float32Array(numberOfPoints*components)).set(arr[i].text,0)}break;case"Points":(numberOfPoints=parseInt(piece.attributes.NumberOfPoints))>0&&(components=section.DataArray.attributes.NumberOfComponents,(points=new Float32Array(numberOfPoints*components)).set(section.DataArray.text,0));break;case"Strips":var numberOfStrips=parseInt(piece.attributes.NumberOfStrips);if(numberOfStrips>0){var connectivity=new Int32Array(section.DataArray[0].text.length),offset=new Int32Array(section.DataArray[1].text.length);connectivity.set(section.DataArray[0].text,0),offset.set(section.DataArray[1].text,0);var size=numberOfStrips+connectivity.length;indices=new Uint32Array(3*size-9*numberOfStrips);var indicesIndex=0;for(i=0,len=numberOfStrips;i<len;i++){for(var strip=[],s=0,len1=offset[i],len0=0;s<len1-len0;s++)strip.push(connectivity[s]),i>0&&(len0=offset[i-1]);var j=0;for(len1=offset[i],len0=0;j<len1-len0-2;j++)j%2?(indices[indicesIndex++]=strip[j],indices[indicesIndex++]=strip[j+2],indices[indicesIndex++]=strip[j+1]):(indices[indicesIndex++]=strip[j],indices[indicesIndex++]=strip[j+1],indices[indicesIndex++]=strip[j+2]),i>0&&(len0=offset[i-1])}}break;case"Polys":var numberOfPolys=parseInt(piece.attributes.NumberOfPolys);if(numberOfPolys>0){connectivity=new Int32Array(section.DataArray[0].text.length),offset=new Int32Array(section.DataArray[1].text.length),connectivity.set(section.DataArray[0].text,0),offset.set(section.DataArray[1].text,0),size=numberOfPolys+connectivity.length,indices=new Uint32Array(3*size-9*numberOfPolys),indicesIndex=0;var connectivityIndex=0;for(i=0,len=numberOfPolys,len0=0;i<len;){var poly=[];for(s=0,len1=offset[i];s<len1-len0;)poly.push(connectivity[connectivityIndex++]),s++;for(j=1;j<len1-len0-1;)indices[indicesIndex++]=poly[0],indices[indicesIndex++]=poly[j],indices[indicesIndex++]=poly[j+1],j++;len0=offset[++i-1]}}}}sectionIndex++}var geometry=new THREE.BufferGeometry;return geometry.setIndex(new THREE.BufferAttribute(indices,1)),geometry.addAttribute("position",new THREE.BufferAttribute(points,3)),normals.length===points.length&&geometry.addAttribute("normal",new THREE.BufferAttribute(normals,3)),geometry}}(getStringFile(data)):meta[2].includes("ASCII")?function parseASCII(data){var result,indices=[],positions=[],colors=[],normals=[],pat3Floats=/(\-?\d+\.?[\d\-\+e]*)\s+(\-?\d+\.?[\d\-\+e]*)\s+(\-?\d+\.?[\d\-\+e]*)/g,patConnectivity=/^(\d+)\s+([\s\d]*)/,patPOINTS=/^POINTS /,patPOLYGONS=/^POLYGONS /,patTRIANGLE_STRIPS=/^TRIANGLE_STRIPS /,patPOINT_DATA=/^POINT_DATA[ ]+(\d+)/,patCELL_DATA=/^CELL_DATA[ ]+(\d+)/,patCOLOR_SCALARS=/^COLOR_SCALARS[ ]+(\w+)[ ]+3/,patNORMALS=/^NORMALS[ ]+(\w+)[ ]+(\w+)/,inPointsSection=!1,inPolygonsSection=!1,inTriangleStripSection=!1,inPointDataSection=!1,inCellDataSection=!1,inColorSection=!1,inNormalsSection=!1,lines=data.split("\n");for(var i in lines){var line=lines[i];if(inPointsSection)for(;null!==(result=pat3Floats.exec(line));){var x=parseFloat(result[1]),y=parseFloat(result[2]),z=parseFloat(result[3]);positions.push(x,y,z)}else if(inPolygonsSection){if(null!==(result=patConnectivity.exec(line))){var numVertices=parseInt(result[1]),inds=result[2].split(/\s+/);if(numVertices>=3)for(var i0=parseInt(inds[0]),k=1,j=0;j<numVertices-2;++j)i1=parseInt(inds[k]),i2=parseInt(inds[k+1]),indices.push(i0,i1,i2),k++}}else if(inTriangleStripSection){if(null!==(result=patConnectivity.exec(line))){var i1,i2;if(numVertices=parseInt(result[1]),inds=result[2].split(/\s+/),numVertices>=3)for(j=0;j<numVertices-2;j++)j%2==1?(i0=parseInt(inds[j]),i1=parseInt(inds[j+2]),i2=parseInt(inds[j+1]),indices.push(i0,i1,i2)):(i0=parseInt(inds[j]),i1=parseInt(inds[j+1]),i2=parseInt(inds[j+2]),indices.push(i0,i1,i2))}}else if(inPointDataSection||inCellDataSection)if(inColorSection)for(;null!==(result=pat3Floats.exec(line));){var r=parseFloat(result[1]),g=parseFloat(result[2]),b=parseFloat(result[3]);colors.push(r,g,b)}else if(inNormalsSection)for(;null!==(result=pat3Floats.exec(line));){var nx=parseFloat(result[1]),ny=parseFloat(result[2]),nz=parseFloat(result[3]);normals.push(nx,ny,nz)}null!==patPOLYGONS.exec(line)?(inPolygonsSection=!0,inPointsSection=!1,inTriangleStripSection=!1):null!==patPOINTS.exec(line)?(inPolygonsSection=!1,inPointsSection=!0,inTriangleStripSection=!1):null!==patTRIANGLE_STRIPS.exec(line)?(inPolygonsSection=!1,inPointsSection=!1,inTriangleStripSection=!0):null!==patPOINT_DATA.exec(line)?(inPointDataSection=!0,inPointsSection=!1,inPolygonsSection=!1,inTriangleStripSection=!1):null!==patCELL_DATA.exec(line)?(inCellDataSection=!0,inPointsSection=!1,inPolygonsSection=!1,inTriangleStripSection=!1):null!==patCOLOR_SCALARS.exec(line)?(inColorSection=!0,inNormalsSection=!1,inPointsSection=!1,inPolygonsSection=!1,inTriangleStripSection=!1):null!==patNORMALS.exec(line)&&(inNormalsSection=!0,inColorSection=!1,inPointsSection=!1,inPolygonsSection=!1,inTriangleStripSection=!1)}var geometry=new THREE.BufferGeometry;if(geometry.setIndex(indices),geometry.addAttribute("position",new THREE.Float32BufferAttribute(positions,3)),normals.length===positions.length&&geometry.addAttribute("normal",new THREE.Float32BufferAttribute(normals,3)),colors.length!==indices.length)colors.length===positions.length&&geometry.addAttribute("color",new THREE.Float32BufferAttribute(colors,3));else{var numTriangles=(geometry=geometry.toNonIndexed()).attributes.position.count/3;if(colors.length===3*numTriangles){var newColors=[];for(i=0;i<numTriangles;i++)r=colors[3*i+0],g=colors[3*i+1],b=colors[3*i+2],newColors.push(r,g,b),newColors.push(r,g,b),newColors.push(r,g,b);geometry.addAttribute("color",new THREE.Float32BufferAttribute(newColors,3))}}return geometry}(getStringFile(data)):function parseBinary(data){var count,pointIndex,i,numberOfPoints,s,state,line,buffer=new Uint8Array(data),dataView=new DataView(data),points=[],normals=[],indices=[],vtk=[],index=0;function findString(buffer,start){for(var index=start,c=buffer[index],s=[];10!==c;)s.push(String.fromCharCode(c)),c=buffer[++index];return{start:start,end:index,next:index+1,parsedString:s.join("")}}for(;;){if(0===(line=(state=findString(buffer,index)).parsedString).indexOf("POINTS")){for(vtk.push(line),count=4*(numberOfPoints=parseInt(line.split(" ")[1],10))*3,points=new Float32Array(3*numberOfPoints),pointIndex=state.next,i=0;i<numberOfPoints;i++)points[3*i]=dataView.getFloat32(pointIndex,!1),points[3*i+1]=dataView.getFloat32(pointIndex+4,!1),points[3*i+2]=dataView.getFloat32(pointIndex+8,!1),pointIndex+=12;state.next=state.next+count+1}else if(0===line.indexOf("TRIANGLE_STRIPS")){var numberOfStrips=parseInt(line.split(" ")[1],10);count=4*(size=parseInt(line.split(" ")[2],10)),indices=new Uint32Array(3*size-9*numberOfStrips);var indicesIndex=0;for(pointIndex=state.next,i=0;i<numberOfStrips;i++){var indexCount=dataView.getInt32(pointIndex,!1),strip=[];for(pointIndex+=4,s=0;s<indexCount;s++)strip.push(dataView.getInt32(pointIndex,!1)),pointIndex+=4;for(var j=0;j<indexCount-2;j++)j%2?(indices[indicesIndex++]=strip[j],indices[indicesIndex++]=strip[j+2],indices[indicesIndex++]=strip[j+1]):(indices[indicesIndex++]=strip[j],indices[indicesIndex++]=strip[j+1],indices[indicesIndex++]=strip[j+2])}state.next=state.next+count+1}else if(0===line.indexOf("POLYGONS")){var size;for(numberOfStrips=parseInt(line.split(" ")[1],10),count=4*(size=parseInt(line.split(" ")[2],10)),indices=new Uint32Array(3*size-9*numberOfStrips),indicesIndex=0,pointIndex=state.next,i=0;i<numberOfStrips;i++){for(indexCount=dataView.getInt32(pointIndex,!1),strip=[],pointIndex+=4,s=0;s<indexCount;s++)strip.push(dataView.getInt32(pointIndex,!1)),pointIndex+=4;for(j=1;j<indexCount-1;j++)indices[indicesIndex++]=strip[0],indices[indicesIndex++]=strip[j],indices[indicesIndex++]=strip[j+1]}state.next=state.next+count+1}else if(0===line.indexOf("POINT_DATA")){for(numberOfPoints=parseInt(line.split(" ")[1],10),state=findString(buffer,state.next),count=4*numberOfPoints*3,normals=new Float32Array(3*numberOfPoints),pointIndex=state.next,i=0;i<numberOfPoints;i++)normals[3*i]=dataView.getFloat32(pointIndex,!1),normals[3*i+1]=dataView.getFloat32(pointIndex+4,!1),normals[3*i+2]=dataView.getFloat32(pointIndex+8,!1),pointIndex+=12;state.next=state.next+count}if((index=state.next)>=buffer.byteLength)break}var geometry=new THREE.BufferGeometry;return geometry.setIndex(new THREE.BufferAttribute(indices,1)),geometry.addAttribute("position",new THREE.BufferAttribute(points,3)),normals.length===points.length&&geometry.addAttribute("normal",new THREE.BufferAttribute(normals,3)),geometry}(data)}})}}]);
//# sourceMappingURL=18.3c5fc071e544c77027a1.bundle.js.map
(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{385:function(module,exports,__webpack_require__){var f;module.exports=((f=function(){function e(a){return c.appendChild(a.dom),a}function u(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",c.addEventListener("click",function(a){a.preventDefault(),u(++l%c.children.length)},!1);var k=(performance||Date).now(),g=k,a=0,r=e(new f.Panel("FPS","#0ff","#002")),h=e(new f.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var t=e(new f.Panel("MB","#f08","#201"));return u(0),{REVISION:16,dom:c,addPanel:e,showPanel:u,begin:function(){k=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();if(h.update(c-k,200),c>g+1e3&&(r.update(1e3*a/(c-g),100),g=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){k=this.end()},domElement:c,setMode:u}}).Panel=function(e,f,l){var c=1/0,k=0,g=Math.round,a=g(window.devicePixelRatio||1),r=80*a,h=48*a,t=3*a,v=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r,q.height=h,q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");return b.font="bold "+9*a+"px Helvetica,Arial,sans-serif",b.textBaseline="top",b.fillStyle=l,b.fillRect(0,0,r,h),b.fillStyle=f,b.fillText(e,t,v),b.fillRect(d,m,n,p),b.fillStyle=l,b.globalAlpha=.9,b.fillRect(d,m,n,p),{dom:q,update:function(h,w){c=Math.min(c,h),k=Math.max(k,h),b.fillStyle=l,b.globalAlpha=1,b.fillRect(0,0,r,m),b.fillStyle=f,b.fillText(g(h)+" "+e+" ("+g(c)+"-"+g(k)+")",t,v),b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p),b.fillRect(d+n-a,m,a,p),b.fillStyle=l,b.globalAlpha=.9,b.fillRect(d+n-a,m,a,g((1-h/w)*p))}}},f)},422:function(module,exports,__webpack_require__){var THREE=__webpack_require__(386);THREE.CTMLoader=function(){},THREE.CTMLoader.prototype.constructor=THREE.CTMLoader,THREE.CTMLoader.prototype.loadParts=function(url,callback,parameters){parameters=parameters||{};var scope=this,xhr=new XMLHttpRequest,basePath=parameters.basePath?parameters.basePath:THREE.LoaderUtils.extractUrlBase(url);xhr.onreadystatechange=function(){if(4===xhr.readyState&&(200===xhr.status||0===xhr.status)){var jsonObject=JSON.parse(xhr.responseText),materials=[],geometries=[],counter=0;for(var i=0;i<jsonObject.materials.length;i++)materials[i]=THREE.Loader.prototype.createMaterial(jsonObject.materials[i],basePath);var partUrl=basePath+jsonObject.data,parametersPart={useWorker:parameters.useWorker,worker:parameters.worker,offsets:jsonObject.offsets};scope.load(partUrl,function callbackFinal(geometry){counter+=1,geometries.push(geometry),counter===jsonObject.offsets.length&&callback(geometries,materials)},parametersPart)}},xhr.open("GET",url,!0),xhr.setRequestHeader("Content-Type","text/plain"),xhr.send(null)},THREE.CTMLoader.prototype.load=function(url,callback,parameters){var scope=this,offsets=void 0!==(parameters=parameters||{}).offsets?parameters.offsets:[0],xhr=new XMLHttpRequest;xhr.onreadystatechange=function(){if(4===xhr.readyState)if(200===xhr.status||0===xhr.status){var binaryData=new Uint8Array(xhr.response),s=Date.now();if(parameters.useWorker){var worker=parameters.worker||new Worker("js/loaders/ctm/CTMWorker.js");worker.onmessage=function(event){for(var files=event.data,i=0;i<files.length;i++){var ctmFile=files[i],e1=Date.now();scope.createModel(ctmFile,callback);var e=Date.now();console.log("model load time [worker]: "+(e-e1)+" ms, total: "+(e-s))}},worker.postMessage({data:binaryData,offsets:offsets},[binaryData.buffer])}else for(var i=0;i<offsets.length;i++){var stream=new CTM.Stream(binaryData);stream.offset=offsets[i];var ctmFile=new CTM.File(stream);scope.createModel(ctmFile,callback)}}else console.error("Couldn't load ["+url+"] ["+xhr.status+"]");else 3===xhr.readyState||2===xhr.readyState&&xhr.getResponseHeader("Content-Length")},xhr.open("GET",url,!0),xhr.responseType="arraybuffer",xhr.send(null)},THREE.CTMLoader.prototype.createModel=function(file,callback){var Model=function(){THREE.BufferGeometry.call(this),this.materials=[];var uvs,colors,indices=file.body.indices,positions=file.body.vertices,normals=file.body.normals,uvMaps=file.body.uvMaps;void 0!==uvMaps&&uvMaps.length>0&&(uvs=uvMaps[0].uv);var attrMaps=file.body.attrMaps;void 0!==attrMaps&&attrMaps.length>0&&"Color"===attrMaps[0].name&&(colors=attrMaps[0].attr),this.setIndex(new THREE.BufferAttribute(indices,1)),this.addAttribute("position",new THREE.BufferAttribute(positions,3)),void 0!==normals&&this.addAttribute("normal",new THREE.BufferAttribute(normals,3)),void 0!==uvs&&this.addAttribute("uv",new THREE.BufferAttribute(uvs,2)),void 0!==colors&&this.addAttribute("color",new THREE.BufferAttribute(colors,4))};(Model.prototype=Object.create(THREE.BufferGeometry.prototype)).constructor=Model;var geometry=new Model;void 0===geometry.attributes.normal&&geometry.computeVertexNormals(),callback(geometry)}},423:function(module,exports,__webpack_require__){var buffer,bytes,ints,CTM=CTM||{};module.exports=CTM,CTM.CompressionMethod={RAW:5718354,MG1:3229517,MG2:3295053},CTM.Flags={NORMALS:1},CTM.File=function(stream){this.load(stream)},CTM.File.prototype.load=function(stream){this.header=new CTM.FileHeader(stream),this.body=new CTM.FileBody(this.header),this.getReader().read(stream,this.body)},CTM.File.prototype.getReader=function(){var reader;switch(this.header.compressionMethod){case CTM.CompressionMethod.RAW:reader=new CTM.ReaderRAW;break;case CTM.CompressionMethod.MG1:reader=new CTM.ReaderMG1;break;case CTM.CompressionMethod.MG2:reader=new CTM.ReaderMG2}return reader},CTM.FileHeader=function(stream){stream.readInt32(),this.fileFormat=stream.readInt32(),this.compressionMethod=stream.readInt32(),this.vertexCount=stream.readInt32(),this.triangleCount=stream.readInt32(),this.uvMapCount=stream.readInt32(),this.attrMapCount=stream.readInt32(),this.flags=stream.readInt32(),this.comment=stream.readString()},CTM.FileHeader.prototype.hasNormals=function(){return this.flags&CTM.Flags.NORMALS},CTM.FileBody=function(header){var i=3*header.triangleCount,v=3*header.vertexCount,n=header.hasNormals()?3*header.vertexCount:0,u=2*header.vertexCount,a=4*header.vertexCount,j=0,data=new ArrayBuffer(4*(i+v+n+u*header.uvMapCount+a*header.attrMapCount));if(this.indices=new Uint32Array(data,0,i),this.vertices=new Float32Array(data,4*i,v),header.hasNormals()&&(this.normals=new Float32Array(data,4*(i+v),n)),header.uvMapCount)for(this.uvMaps=[],j=0;j<header.uvMapCount;++j)this.uvMaps[j]={uv:new Float32Array(data,4*(i+v+n+j*u),u)};if(header.attrMapCount)for(this.attrMaps=[],j=0;j<header.attrMapCount;++j)this.attrMaps[j]={attr:new Float32Array(data,4*(i+v+n+u*header.uvMapCount+j*a),a)}},CTM.FileMG2Header=function(stream){stream.readInt32(),this.vertexPrecision=stream.readFloat32(),this.normalPrecision=stream.readFloat32(),this.lowerBoundx=stream.readFloat32(),this.lowerBoundy=stream.readFloat32(),this.lowerBoundz=stream.readFloat32(),this.higherBoundx=stream.readFloat32(),this.higherBoundy=stream.readFloat32(),this.higherBoundz=stream.readFloat32(),this.divx=stream.readInt32(),this.divy=stream.readInt32(),this.divz=stream.readInt32(),this.sizex=(this.higherBoundx-this.lowerBoundx)/this.divx,this.sizey=(this.higherBoundy-this.lowerBoundy)/this.divy,this.sizez=(this.higherBoundz-this.lowerBoundz)/this.divz},CTM.ReaderRAW=function(){},CTM.ReaderRAW.prototype.read=function(stream,body){this.readIndices(stream,body.indices),this.readVertices(stream,body.vertices),body.normals&&this.readNormals(stream,body.normals),body.uvMaps&&this.readUVMaps(stream,body.uvMaps),body.attrMaps&&this.readAttrMaps(stream,body.attrMaps)},CTM.ReaderRAW.prototype.readIndices=function(stream,indices){stream.readInt32(),stream.readArrayInt32(indices)},CTM.ReaderRAW.prototype.readVertices=function(stream,vertices){stream.readInt32(),stream.readArrayFloat32(vertices)},CTM.ReaderRAW.prototype.readNormals=function(stream,normals){stream.readInt32(),stream.readArrayFloat32(normals)},CTM.ReaderRAW.prototype.readUVMaps=function(stream,uvMaps){for(var i=0;i<uvMaps.length;++i)stream.readInt32(),uvMaps[i].name=stream.readString(),uvMaps[i].filename=stream.readString(),stream.readArrayFloat32(uvMaps[i].uv)},CTM.ReaderRAW.prototype.readAttrMaps=function(stream,attrMaps){for(var i=0;i<attrMaps.length;++i)stream.readInt32(),attrMaps[i].name=stream.readString(),stream.readArrayFloat32(attrMaps[i].attr)},CTM.ReaderMG1=function(){},CTM.ReaderMG1.prototype.read=function(stream,body){this.readIndices(stream,body.indices),this.readVertices(stream,body.vertices),body.normals&&this.readNormals(stream,body.normals),body.uvMaps&&this.readUVMaps(stream,body.uvMaps),body.attrMaps&&this.readAttrMaps(stream,body.attrMaps)},CTM.ReaderMG1.prototype.readIndices=function(stream,indices){stream.readInt32(),stream.readInt32();var interleaved=new CTM.InterleavedStream(indices,3);LZMA.decompress(stream,stream,interleaved,interleaved.data.length),CTM.restoreIndices(indices,indices.length)},CTM.ReaderMG1.prototype.readVertices=function(stream,vertices){stream.readInt32(),stream.readInt32();var interleaved=new CTM.InterleavedStream(vertices,1);LZMA.decompress(stream,stream,interleaved,interleaved.data.length)},CTM.ReaderMG1.prototype.readNormals=function(stream,normals){stream.readInt32(),stream.readInt32();var interleaved=new CTM.InterleavedStream(normals,3);LZMA.decompress(stream,stream,interleaved,interleaved.data.length)},CTM.ReaderMG1.prototype.readUVMaps=function(stream,uvMaps){for(var i=0;i<uvMaps.length;++i){stream.readInt32(),uvMaps[i].name=stream.readString(),uvMaps[i].filename=stream.readString(),stream.readInt32();var interleaved=new CTM.InterleavedStream(uvMaps[i].uv,2);LZMA.decompress(stream,stream,interleaved,interleaved.data.length)}},CTM.ReaderMG1.prototype.readAttrMaps=function(stream,attrMaps){for(var i=0;i<attrMaps.length;++i){stream.readInt32(),attrMaps[i].name=stream.readString(),stream.readInt32();var interleaved=new CTM.InterleavedStream(attrMaps[i].attr,4);LZMA.decompress(stream,stream,interleaved,interleaved.data.length)}},CTM.ReaderMG2=function(){},CTM.ReaderMG2.prototype.read=function(stream,body){this.MG2Header=new CTM.FileMG2Header(stream),this.readVertices(stream,body.vertices),this.readIndices(stream,body.indices),body.normals&&this.readNormals(stream,body),body.uvMaps&&this.readUVMaps(stream,body.uvMaps),body.attrMaps&&this.readAttrMaps(stream,body.attrMaps)},CTM.ReaderMG2.prototype.readVertices=function(stream,vertices){stream.readInt32(),stream.readInt32();var interleaved=new CTM.InterleavedStream(vertices,3);LZMA.decompress(stream,stream,interleaved,interleaved.data.length);var gridIndices=this.readGridIndices(stream,vertices);CTM.restoreVertices(vertices,this.MG2Header,gridIndices,this.MG2Header.vertexPrecision)},CTM.ReaderMG2.prototype.readGridIndices=function(stream,vertices){stream.readInt32(),stream.readInt32();var gridIndices=new Uint32Array(vertices.length/3),interleaved=new CTM.InterleavedStream(gridIndices,1);return LZMA.decompress(stream,stream,interleaved,interleaved.data.length),CTM.restoreGridIndices(gridIndices,gridIndices.length),gridIndices},CTM.ReaderMG2.prototype.readIndices=function(stream,indices){stream.readInt32(),stream.readInt32();var interleaved=new CTM.InterleavedStream(indices,3);LZMA.decompress(stream,stream,interleaved,interleaved.data.length),CTM.restoreIndices(indices,indices.length)},CTM.ReaderMG2.prototype.readNormals=function(stream,body){stream.readInt32(),stream.readInt32();var interleaved=new CTM.InterleavedStream(body.normals,3);LZMA.decompress(stream,stream,interleaved,interleaved.data.length);var smooth=CTM.calcSmoothNormals(body.indices,body.vertices);CTM.restoreNormals(body.normals,smooth,this.MG2Header.normalPrecision)},CTM.ReaderMG2.prototype.readUVMaps=function(stream,uvMaps){for(var i=0;i<uvMaps.length;++i){stream.readInt32(),uvMaps[i].name=stream.readString(),uvMaps[i].filename=stream.readString();var precision=stream.readFloat32();stream.readInt32();var interleaved=new CTM.InterleavedStream(uvMaps[i].uv,2);LZMA.decompress(stream,stream,interleaved,interleaved.data.length),CTM.restoreMap(uvMaps[i].uv,2,precision)}},CTM.ReaderMG2.prototype.readAttrMaps=function(stream,attrMaps){for(var i=0;i<attrMaps.length;++i){stream.readInt32(),attrMaps[i].name=stream.readString();var precision=stream.readFloat32();stream.readInt32();var interleaved=new CTM.InterleavedStream(attrMaps[i].attr,4);LZMA.decompress(stream,stream,interleaved,interleaved.data.length),CTM.restoreMap(attrMaps[i].attr,4,precision)}},CTM.restoreIndices=function(indices,len){var i=3;for(len>0&&(indices[2]+=indices[0],indices[1]+=indices[0]);i<len;i+=3)indices[i]+=indices[i-3],indices[i]===indices[i-3]?indices[i+1]+=indices[i-2]:indices[i+1]+=indices[i],indices[i+2]+=indices[i]},CTM.restoreGridIndices=function(gridIndices,len){for(var i=1;i<len;++i)gridIndices[i]+=gridIndices[i-1]},CTM.restoreVertices=function(vertices,grid,gridIndices,precision){for(var gridIdx,delta,x,y,z,intVertices=new Uint32Array(vertices.buffer,vertices.byteOffset,vertices.length),ydiv=grid.divx,zdiv=ydiv*grid.divy,prevGridIdx=2147483647,prevDelta=0,i=0,j=0,len=gridIndices.length;i<len;j+=3)x=gridIdx=gridIndices[i++],x-=~~((z=~~(x/zdiv))*zdiv),x-=~~((y=~~(x/ydiv))*ydiv),delta=intVertices[j],gridIdx===prevGridIdx&&(delta+=prevDelta),vertices[j]=grid.lowerBoundx+x*grid.sizex+precision*delta,vertices[j+1]=grid.lowerBoundy+y*grid.sizey+precision*intVertices[j+1],vertices[j+2]=grid.lowerBoundz+z*grid.sizez+precision*intVertices[j+2],prevGridIdx=gridIdx,prevDelta=delta},CTM.restoreNormals=function(normals,smooth,precision){for(var ro,phi,theta,sinPhi,nx,ny,nz,by,bz,len,intNormals=new Uint32Array(normals.buffer,normals.byteOffset,normals.length),i=0,k=normals.length,PI_DIV_2=1.5707963267948966;i<k;i+=3)ro=intNormals[i]*precision,0===(phi=intNormals[i+1])?(normals[i]=smooth[i]*ro,normals[i+1]=smooth[i+1]*ro,normals[i+2]=smooth[i+2]*ro):(theta=phi<=4?(intNormals[i+2]-2)*PI_DIV_2:(4*intNormals[i+2]/phi-2)*PI_DIV_2,phi*=precision*PI_DIV_2,nx=(sinPhi=ro*Math.sin(phi))*Math.cos(theta),ny=sinPhi*Math.sin(theta),nz=ro*Math.cos(phi),bz=smooth[i+1],by=smooth[i]-smooth[i+2],(len=Math.sqrt(2*bz*bz+by*by))>1e-20&&(by/=len,bz/=len),normals[i]=smooth[i]*nz+(smooth[i+1]*bz-smooth[i+2]*by)*ny-bz*nx,normals[i+1]=smooth[i+1]*nz-(smooth[i+2]+smooth[i])*bz*ny+by*nx,normals[i+2]=smooth[i+2]*nz+(smooth[i]*by+smooth[i+1]*bz)*ny+bz*nx)},CTM.restoreMap=function(map,count,precision){for(var delta,value,j,intMap=new Uint32Array(map.buffer,map.byteOffset,map.length),i=0,len=map.length;i<count;++i)for(delta=0,j=i;j<len;j+=count)delta+=1&(value=intMap[j])?-(value+1>>1):value>>1,map[j]=delta*precision},CTM.calcSmoothNormals=function(indices,vertices){var indx,indy,indz,nx,ny,nz,v1x,v1y,v1z,v2x,v2y,v2z,len,i,k,smooth=new Float32Array(vertices.length);for(i=0,k=indices.length;i<k;)indx=3*indices[i++],indy=3*indices[i++],indz=3*indices[i++],v1x=vertices[indy]-vertices[indx],v2x=vertices[indz]-vertices[indx],v1y=vertices[indy+1]-vertices[indx+1],v2y=vertices[indz+1]-vertices[indx+1],v1z=vertices[indy+2]-vertices[indx+2],nx=v1y*(v2z=vertices[indz+2]-vertices[indx+2])-v1z*v2y,ny=v1z*v2x-v1x*v2z,nz=v1x*v2y-v1y*v2x,(len=Math.sqrt(nx*nx+ny*ny+nz*nz))>1e-10&&(nx/=len,ny/=len,nz/=len),smooth[indx]+=nx,smooth[indx+1]+=ny,smooth[indx+2]+=nz,smooth[indy]+=nx,smooth[indy+1]+=ny,smooth[indy+2]+=nz,smooth[indz]+=nx,smooth[indz+1]+=ny,smooth[indz+2]+=nz;for(i=0,k=smooth.length;i<k;i+=3)(len=Math.sqrt(smooth[i]*smooth[i]+smooth[i+1]*smooth[i+1]+smooth[i+2]*smooth[i+2]))>1e-10&&(smooth[i]/=len,smooth[i+1]/=len,smooth[i+2]/=len);return smooth},CTM.isLittleEndian=(buffer=new ArrayBuffer(2),bytes=new Uint8Array(buffer),ints=new Uint16Array(buffer),bytes[0]=1,1===ints[0]),CTM.InterleavedStream=function(data,count){this.data=new Uint8Array(data.buffer,data.byteOffset,data.byteLength),this.offset=CTM.isLittleEndian?3:0,this.count=4*count,this.len=this.data.length},CTM.InterleavedStream.prototype.writeByte=function(value){this.data[this.offset]=value,this.offset+=this.count,this.offset>=this.len&&(this.offset-=this.len-4,this.offset>=this.count&&(this.offset-=this.count+(CTM.isLittleEndian?1:-1)))},CTM.Stream=function(data){this.data=data,this.offset=0},CTM.Stream.prototype.TWO_POW_MINUS23=Math.pow(2,-23),CTM.Stream.prototype.TWO_POW_MINUS126=Math.pow(2,-126),CTM.Stream.prototype.readByte=function(){return 255&this.data[this.offset++]},CTM.Stream.prototype.readInt32=function(){var i=this.readByte();return i|=this.readByte()<<8,(i|=this.readByte()<<16)|this.readByte()<<24},CTM.Stream.prototype.readFloat32=function(){var m=this.readByte();m+=this.readByte()<<8;var b1=this.readByte(),b2=this.readByte();m+=(127&b1)<<16;var e=(127&b2)<<1|(128&b1)>>>7,s=128&b2?-1:1;return 255===e?0!==m?NaN:s*(1/0):e>0?s*(1+m*this.TWO_POW_MINUS23)*Math.pow(2,e-127):0!==m?s*m*this.TWO_POW_MINUS126:0*s},CTM.Stream.prototype.readString=function(){var len=this.readInt32();return this.offset+=len,String.fromCharCode.apply(null,this.data.subarray(this.offset-len,this.offset))},CTM.Stream.prototype.readArrayInt32=function(array){for(var i=0,len=array.length;i<len;)array[i++]=this.readInt32();return array},CTM.Stream.prototype.readArrayFloat32=function(array){for(var i=0,len=array.length;i<len;)array[i++]=this.readFloat32();return array}},424:function(module,exports,__webpack_require__){var LZMA=LZMA||{};module.exports=LZMA,LZMA.OutWindow=function(){this._windowSize=0},LZMA.OutWindow.prototype.create=function(windowSize){this._buffer&&this._windowSize===windowSize||(this._buffer=[]),this._windowSize=windowSize,this._pos=0,this._streamPos=0},LZMA.OutWindow.prototype.flush=function(){var size=this._pos-this._streamPos;if(0!==size){for(;size--;)this._stream.writeByte(this._buffer[this._streamPos++]);this._pos>=this._windowSize&&(this._pos=0),this._streamPos=this._pos}},LZMA.OutWindow.prototype.releaseStream=function(){this.flush(),this._stream=null},LZMA.OutWindow.prototype.setStream=function(stream){this.releaseStream(),this._stream=stream},LZMA.OutWindow.prototype.init=function(solid){solid||(this._streamPos=0,this._pos=0)},LZMA.OutWindow.prototype.copyBlock=function(distance,len){var pos=this._pos-distance-1;for(pos<0&&(pos+=this._windowSize);len--;)pos>=this._windowSize&&(pos=0),this._buffer[this._pos++]=this._buffer[pos++],this._pos>=this._windowSize&&this.flush()},LZMA.OutWindow.prototype.putByte=function(b){this._buffer[this._pos++]=b,this._pos>=this._windowSize&&this.flush()},LZMA.OutWindow.prototype.getByte=function(distance){var pos=this._pos-distance-1;return pos<0&&(pos+=this._windowSize),this._buffer[pos]},LZMA.RangeDecoder=function(){},LZMA.RangeDecoder.prototype.setStream=function(stream){this._stream=stream},LZMA.RangeDecoder.prototype.releaseStream=function(){this._stream=null},LZMA.RangeDecoder.prototype.init=function(){var i=5;for(this._code=0,this._range=-1;i--;)this._code=this._code<<8|this._stream.readByte()},LZMA.RangeDecoder.prototype.decodeDirectBits=function(numTotalBits){for(var t,result=0,i=numTotalBits;i--;)this._range>>>=1,t=this._code-this._range>>>31,this._code-=this._range&t-1,result=result<<1|1-t,0==(4278190080&this._range)&&(this._code=this._code<<8|this._stream.readByte(),this._range<<=8);return result},LZMA.RangeDecoder.prototype.decodeBit=function(probs,index){var prob=probs[index],newBound=(this._range>>>11)*prob;return(2147483648^this._code)<(2147483648^newBound)?(this._range=newBound,probs[index]+=2048-prob>>>5,0==(4278190080&this._range)&&(this._code=this._code<<8|this._stream.readByte(),this._range<<=8),0):(this._range-=newBound,this._code-=newBound,probs[index]-=prob>>>5,0==(4278190080&this._range)&&(this._code=this._code<<8|this._stream.readByte(),this._range<<=8),1)},LZMA.initBitModels=function(probs,len){for(;len--;)probs[len]=1024},LZMA.BitTreeDecoder=function(numBitLevels){this._models=[],this._numBitLevels=numBitLevels},LZMA.BitTreeDecoder.prototype.init=function(){LZMA.initBitModels(this._models,1<<this._numBitLevels)},LZMA.BitTreeDecoder.prototype.decode=function(rangeDecoder){for(var m=1,i=this._numBitLevels;i--;)m=m<<1|rangeDecoder.decodeBit(this._models,m);return m-(1<<this._numBitLevels)},LZMA.BitTreeDecoder.prototype.reverseDecode=function(rangeDecoder){for(var bit,m=1,symbol=0,i=0;i<this._numBitLevels;++i)m=m<<1|(bit=rangeDecoder.decodeBit(this._models,m)),symbol|=bit<<i;return symbol},LZMA.reverseDecode2=function(models,startIndex,rangeDecoder,numBitLevels){for(var bit,m=1,symbol=0,i=0;i<numBitLevels;++i)m=m<<1|(bit=rangeDecoder.decodeBit(models,startIndex+m)),symbol|=bit<<i;return symbol},LZMA.LenDecoder=function(){this._choice=[],this._lowCoder=[],this._midCoder=[],this._highCoder=new LZMA.BitTreeDecoder(8),this._numPosStates=0},LZMA.LenDecoder.prototype.create=function(numPosStates){for(;this._numPosStates<numPosStates;++this._numPosStates)this._lowCoder[this._numPosStates]=new LZMA.BitTreeDecoder(3),this._midCoder[this._numPosStates]=new LZMA.BitTreeDecoder(3)},LZMA.LenDecoder.prototype.init=function(){var i=this._numPosStates;for(LZMA.initBitModels(this._choice,2);i--;)this._lowCoder[i].init(),this._midCoder[i].init();this._highCoder.init()},LZMA.LenDecoder.prototype.decode=function(rangeDecoder,posState){return 0===rangeDecoder.decodeBit(this._choice,0)?this._lowCoder[posState].decode(rangeDecoder):0===rangeDecoder.decodeBit(this._choice,1)?8+this._midCoder[posState].decode(rangeDecoder):16+this._highCoder.decode(rangeDecoder)},LZMA.Decoder2=function(){this._decoders=[]},LZMA.Decoder2.prototype.init=function(){LZMA.initBitModels(this._decoders,768)},LZMA.Decoder2.prototype.decodeNormal=function(rangeDecoder){var symbol=1;do{symbol=symbol<<1|rangeDecoder.decodeBit(this._decoders,symbol)}while(symbol<256);return 255&symbol},LZMA.Decoder2.prototype.decodeWithMatchByte=function(rangeDecoder,matchByte){var matchBit,bit,symbol=1;do{if(matchBit=matchByte>>7&1,matchByte<<=1,symbol=symbol<<1|(bit=rangeDecoder.decodeBit(this._decoders,(1+matchBit<<8)+symbol)),matchBit!==bit){for(;symbol<256;)symbol=symbol<<1|rangeDecoder.decodeBit(this._decoders,symbol);break}}while(symbol<256);return 255&symbol},LZMA.LiteralDecoder=function(){},LZMA.LiteralDecoder.prototype.create=function(numPosBits,numPrevBits){var i;if(!this._coders||this._numPrevBits!==numPrevBits||this._numPosBits!==numPosBits)for(this._numPosBits=numPosBits,this._posMask=(1<<numPosBits)-1,this._numPrevBits=numPrevBits,this._coders=[],i=1<<this._numPrevBits+this._numPosBits;i--;)this._coders[i]=new LZMA.Decoder2},LZMA.LiteralDecoder.prototype.init=function(){for(var i=1<<this._numPrevBits+this._numPosBits;i--;)this._coders[i].init()},LZMA.LiteralDecoder.prototype.getDecoder=function(pos,prevByte){return this._coders[((pos&this._posMask)<<this._numPrevBits)+((255&prevByte)>>>8-this._numPrevBits)]},LZMA.Decoder=function(){this._outWindow=new LZMA.OutWindow,this._rangeDecoder=new LZMA.RangeDecoder,this._isMatchDecoders=[],this._isRepDecoders=[],this._isRepG0Decoders=[],this._isRepG1Decoders=[],this._isRepG2Decoders=[],this._isRep0LongDecoders=[],this._posSlotDecoder=[],this._posDecoders=[],this._posAlignDecoder=new LZMA.BitTreeDecoder(4),this._lenDecoder=new LZMA.LenDecoder,this._repLenDecoder=new LZMA.LenDecoder,this._literalDecoder=new LZMA.LiteralDecoder,this._dictionarySize=-1,this._dictionarySizeCheck=-1,this._posSlotDecoder[0]=new LZMA.BitTreeDecoder(6),this._posSlotDecoder[1]=new LZMA.BitTreeDecoder(6),this._posSlotDecoder[2]=new LZMA.BitTreeDecoder(6),this._posSlotDecoder[3]=new LZMA.BitTreeDecoder(6)},LZMA.Decoder.prototype.setDictionarySize=function(dictionarySize){return!(dictionarySize<0)&&(this._dictionarySize!==dictionarySize&&(this._dictionarySize=dictionarySize,this._dictionarySizeCheck=Math.max(this._dictionarySize,1),this._outWindow.create(Math.max(this._dictionarySizeCheck,4096))),!0)},LZMA.Decoder.prototype.setLcLpPb=function(lc,lp,pb){var numPosStates=1<<pb;return!(lc>8||lp>4||pb>4)&&(this._literalDecoder.create(lp,lc),this._lenDecoder.create(numPosStates),this._repLenDecoder.create(numPosStates),this._posStateMask=numPosStates-1,!0)},LZMA.Decoder.prototype.init=function(){var i=4;for(this._outWindow.init(!1),LZMA.initBitModels(this._isMatchDecoders,192),LZMA.initBitModels(this._isRep0LongDecoders,192),LZMA.initBitModels(this._isRepDecoders,12),LZMA.initBitModels(this._isRepG0Decoders,12),LZMA.initBitModels(this._isRepG1Decoders,12),LZMA.initBitModels(this._isRepG2Decoders,12),LZMA.initBitModels(this._posDecoders,114),this._literalDecoder.init();i--;)this._posSlotDecoder[i].init();this._lenDecoder.init(),this._repLenDecoder.init(),this._posAlignDecoder.init(),this._rangeDecoder.init()},LZMA.Decoder.prototype.decode=function(inStream,outStream,outSize){var posState,decoder2,len,distance,posSlot,numDirectBits,state=0,rep0=0,rep1=0,rep2=0,rep3=0,nowPos64=0,prevByte=0;for(this._rangeDecoder.setStream(inStream),this._outWindow.setStream(outStream),this.init();outSize<0||nowPos64<outSize;)if(posState=nowPos64&this._posStateMask,0===this._rangeDecoder.decodeBit(this._isMatchDecoders,(state<<4)+posState))decoder2=this._literalDecoder.getDecoder(nowPos64++,prevByte),prevByte=state>=7?decoder2.decodeWithMatchByte(this._rangeDecoder,this._outWindow.getByte(rep0)):decoder2.decodeNormal(this._rangeDecoder),this._outWindow.putByte(prevByte),state=state<4?0:state-(state<10?3:6);else{if(1===this._rangeDecoder.decodeBit(this._isRepDecoders,state))len=0,0===this._rangeDecoder.decodeBit(this._isRepG0Decoders,state)?0===this._rangeDecoder.decodeBit(this._isRep0LongDecoders,(state<<4)+posState)&&(state=state<7?9:11,len=1):(0===this._rangeDecoder.decodeBit(this._isRepG1Decoders,state)?distance=rep1:(0===this._rangeDecoder.decodeBit(this._isRepG2Decoders,state)?distance=rep2:(distance=rep3,rep3=rep2),rep2=rep1),rep1=rep0,rep0=distance),0===len&&(len=2+this._repLenDecoder.decode(this._rangeDecoder,posState),state=state<7?8:11);else if(rep3=rep2,rep2=rep1,rep1=rep0,len=2+this._lenDecoder.decode(this._rangeDecoder,posState),state=state<7?7:10,(posSlot=this._posSlotDecoder[len<=5?len-2:3].decode(this._rangeDecoder))>=4){if(rep0=(2|1&posSlot)<<(numDirectBits=(posSlot>>1)-1),posSlot<14)rep0+=LZMA.reverseDecode2(this._posDecoders,rep0-posSlot-1,this._rangeDecoder,numDirectBits);else if(rep0+=this._rangeDecoder.decodeDirectBits(numDirectBits-4)<<4,(rep0+=this._posAlignDecoder.reverseDecode(this._rangeDecoder))<0){if(-1===rep0)break;return!1}}else rep0=posSlot;if(rep0>=nowPos64||rep0>=this._dictionarySizeCheck)return!1;this._outWindow.copyBlock(rep0,len),nowPos64+=len,prevByte=this._outWindow.getByte(0)}return this._outWindow.flush(),this._outWindow.releaseStream(),this._rangeDecoder.releaseStream(),!0},LZMA.Decoder.prototype.setDecoderProperties=function(properties){var value,lc,lp,pb,dictionarySize;return!(properties.size<5)&&(lc=(value=properties.readByte())%9,lp=(value=~~(value/9))%5,pb=~~(value/5),!!this.setLcLpPb(lc,lp,pb)&&(dictionarySize=properties.readByte(),dictionarySize|=properties.readByte()<<8,dictionarySize|=properties.readByte()<<16,dictionarySize+=16777216*properties.readByte(),this.setDictionarySize(dictionarySize)))},LZMA.decompress=function(properties,inStream,outStream,outSize){var decoder=new LZMA.Decoder;if(!decoder.setDecoderProperties(properties))throw"Incorrect stream properties";if(!decoder.decode(inStream,outStream,outSize))throw"Error in data stream";return!0}}}]);
//# sourceMappingURL=10.3c5fc071e544c77027a1.bundle.js.map
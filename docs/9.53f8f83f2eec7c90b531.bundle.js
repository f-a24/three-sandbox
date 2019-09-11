(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{227:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var three__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(598),stats_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(597),_node_modules_three_examples_jsm_geometries_ConvexGeometry__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(605),_node_modules_three_examples_jsm_utils_SceneUtils__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(600);__webpack_exports__.default=function(){var VIEWPORT_W=window.innerWidth,VIEWPORT_H=window.innerHeight,scene=new three__WEBPACK_IMPORTED_MODULE_0__.Scene,camera=new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(45,VIEWPORT_W/VIEWPORT_H,.1,1e3);scene.add(camera),camera.position.x=-50,camera.position.y=30,camera.position.z=20,camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(-10,0,0));var renderer=new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer;renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_0__.Color(15658734)),renderer.setSize(VIEWPORT_W,VIEWPORT_H),renderer.shadowMap.enabled=!0;var planeGeometry=new three__WEBPACK_IMPORTED_MODULE_0__.PlaneGeometry(60,40,1,1),planeMaterial=new three__WEBPACK_IMPORTED_MODULE_0__.MeshLambertMaterial({color:16777215}),plane=new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(planeGeometry,planeMaterial);plane.receiveShadow=!0,plane.rotation.x=-.5*Math.PI,plane.position.x=0,plane.position.y=0,plane.position.z=0,scene.add(plane);var ambientLight=new three__WEBPACK_IMPORTED_MODULE_0__.AmbientLight(592137);scene.add(ambientLight);var spotLight=new three__WEBPACK_IMPORTED_MODULE_0__.SpotLight(16777215);spotLight.position.set(-25,25,32),spotLight.castShadow=!0,scene.add(spotLight),function(argScene){var geoms=[];geoms.push(new three__WEBPACK_IMPORTED_MODULE_0__.CylinderGeometry(1,4,4)),geoms.push(new three__WEBPACK_IMPORTED_MODULE_0__.BoxGeometry(2,2,2)),geoms.push(new three__WEBPACK_IMPORTED_MODULE_0__.SphereGeometry(2)),geoms.push(new three__WEBPACK_IMPORTED_MODULE_0__.IcosahedronGeometry(4));var points=[new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(2,2,2),new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(2,2,-2),new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(-2,2,-2),new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(-2,2,2),new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(2,-2,2),new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(2,-2,-2),new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(-2,-2,-2),new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(-2,-2,2)];geoms.push(new _node_modules_three_examples_jsm_geometries_ConvexGeometry__WEBPACK_IMPORTED_MODULE_2__.a(points));for(var pts=[],angle=0;angle<Math.PI;angle+=.1)pts.push(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(3*Math.cos(angle),3*Math.sin(angle),0));geoms.push(new three__WEBPACK_IMPORTED_MODULE_0__.LatheGeometry(pts,12)),geoms.push(new three__WEBPACK_IMPORTED_MODULE_0__.OctahedronGeometry(3)),geoms.push(new three__WEBPACK_IMPORTED_MODULE_0__.ParametricGeometry((function(u,t,target){u*=Math.PI,t*=2*Math.PI;var x,y,z,phi=(u*=2)/2;x=.125*Math.cos(t)*Math.cos(phi)-.65*Math.sin(t)*Math.sin(phi),z=.125*Math.cos(t)*Math.sin(phi)+.65*Math.sin(t)*Math.cos(phi),y=(2.25+x)*Math.sin(u),x=(2.25+x)*Math.cos(u),target.set(x,y,z)}),20,10)),geoms.push(new three__WEBPACK_IMPORTED_MODULE_0__.TetrahedronGeometry(3)),geoms.push(new three__WEBPACK_IMPORTED_MODULE_0__.TorusGeometry(3,1,10,10)),geoms.push(new three__WEBPACK_IMPORTED_MODULE_0__.TorusKnotGeometry(3,.5,50,20));for(var j=0,i=0;i<geoms.length;i++){var materials=[new three__WEBPACK_IMPORTED_MODULE_0__.MeshPhongMaterial({color:16777215*Math.random(),flatShading:!0}),new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({color:0,wireframe:!0})],mesh=_node_modules_three_examples_jsm_utils_SceneUtils__WEBPACK_IMPORTED_MODULE_3__.a.createMultiMaterialObject(geoms[i],materials);mesh.traverse((function(e){e.castShadow=!0})),mesh.position.x=i%4*12-24,mesh.position.y=4,mesh.position.z=12*j-8,(i+1)%4==0&&j++,argScene.add(mesh)}}(scene),document.getElementById("WebGL-output").appendChild(renderer.domElement);var statsObj,stats=((statsObj=new stats_js__WEBPACK_IMPORTED_MODULE_1__).showPanel(0),statsObj.dom.style.position="absolute",statsObj.dom.style.left="0px",statsObj.dom.style.top="0px",document.getElementById("Stats-output").appendChild(statsObj.dom),statsObj),render=function(){stats.update(),requestAnimationFrame(render),renderer.render(scene,camera)};render()}},597:function(module,exports,__webpack_require__){var f;module.exports=((f=function(){function e(a){return c.appendChild(a.dom),a}function u(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",c.addEventListener("click",(function(a){a.preventDefault(),u(++l%c.children.length)}),!1);var k=(performance||Date).now(),g=k,a=0,r=e(new f.Panel("FPS","#0ff","#002")),h=e(new f.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var t=e(new f.Panel("MB","#f08","#201"));return u(0),{REVISION:16,dom:c,addPanel:e,showPanel:u,begin:function(){k=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();if(h.update(c-k,200),c>g+1e3&&(r.update(1e3*a/(c-g),100),g=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){k=this.end()},domElement:c,setMode:u}}).Panel=function(e,f,l){var c=1/0,k=0,g=Math.round,a=g(window.devicePixelRatio||1),r=80*a,h=48*a,t=3*a,v=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r,q.height=h,q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");return b.font="bold "+9*a+"px Helvetica,Arial,sans-serif",b.textBaseline="top",b.fillStyle=l,b.fillRect(0,0,r,h),b.fillStyle=f,b.fillText(e,t,v),b.fillRect(d,m,n,p),b.fillStyle=l,b.globalAlpha=.9,b.fillRect(d,m,n,p),{dom:q,update:function(h,w){c=Math.min(c,h),k=Math.max(k,h),b.fillStyle=l,b.globalAlpha=1,b.fillRect(0,0,r,m),b.fillStyle=f,b.fillText(g(h)+" "+e+" ("+g(c)+"-"+g(k)+")",t,v),b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p),b.fillRect(d+n-a,m,a,p),b.fillStyle=l,b.globalAlpha=.9,b.fillRect(d+n-a,m,a,g((1-h/w)*p))}}},f)},600:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return SceneUtils}));var _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(598),SceneUtils={createMultiMaterialObject:function(geometry,materials){for(var group=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Group,i=0,l=materials.length;i<l;i++)group.add(new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Mesh(geometry,materials[i]));return group},detach:function(child,parent,scene){console.warn("THREE.SceneUtils: detach() has been deprecated. Use scene.attach( child ) instead."),scene.attach(child)},attach:function(child,scene,parent){console.warn("THREE.SceneUtils: attach() has been deprecated. Use parent.attach( child ) instead."),parent.attach(child)}}},605:function(module,__webpack_exports__,__webpack_require__){"use strict";var three_module=__webpack_require__(598),ConvexHull_ConvexHull=function(){var line3,plane,closestPoint,triangle,Visible=0,v1=new three_module.Vector3;function ConvexHull(){this.tolerance=-1,this.faces=[],this.newFaces=[],this.assigned=new VertexList,this.unassigned=new VertexList,this.vertices=[]}function Face(){this.normal=new three_module.Vector3,this.midpoint=new three_module.Vector3,this.area=0,this.constant=0,this.outside=null,this.mark=Visible,this.edge=null}function HalfEdge(vertex,face){this.vertex=vertex,this.prev=null,this.next=null,this.twin=null,this.face=face}function VertexNode(point){this.point=point,this.prev=null,this.next=null,this.face=null}function VertexList(){this.head=null,this.tail=null}return Object.assign(ConvexHull.prototype,{setFromPoints:function(points){!0!==Array.isArray(points)&&console.error("THREE.ConvexHull: Points parameter is not an array."),points.length<4&&console.error("THREE.ConvexHull: The algorithm needs at least four points."),this.makeEmpty();for(var i=0,l=points.length;i<l;i++)this.vertices.push(new VertexNode(points[i]));return this.compute(),this},setFromObject:function(object){var points=[];return object.updateMatrixWorld(!0),object.traverse((function(node){var i,l,point,geometry=node.geometry;if(void 0!==geometry)if(geometry.isGeometry){var vertices=geometry.vertices;for(i=0,l=vertices.length;i<l;i++)(point=vertices[i].clone()).applyMatrix4(node.matrixWorld),points.push(point)}else if(geometry.isBufferGeometry){var attribute=geometry.attributes.position;if(void 0!==attribute)for(i=0,l=attribute.count;i<l;i++)(point=new three_module.Vector3).fromBufferAttribute(attribute,i).applyMatrix4(node.matrixWorld),points.push(point)}})),this.setFromPoints(points)},containsPoint:function(point){for(var faces=this.faces,i=0,l=faces.length;i<l;i++){if(faces[i].distanceToPoint(point)>this.tolerance)return!1}return!0},intersectRay:function(ray,target){for(var faces=this.faces,tNear=-1/0,tFar=1/0,i=0,l=faces.length;i<l;i++){var face=faces[i],vN=face.distanceToPoint(ray.origin),vD=face.normal.dot(ray.direction);if(vN>0&&vD>=0)return null;var t=0!==vD?-vN/vD:0;if(!(t<=0)&&(vD>0?tFar=Math.min(t,tFar):tNear=Math.max(t,tNear),tNear>tFar))return null}return tNear!==-1/0?ray.at(tNear,target):ray.at(tFar,target),target},intersectsRay:function(ray){return null!==this.intersectRay(ray,v1)},makeEmpty:function(){return this.faces=[],this.vertices=[],this},addVertexToFace:function(vertex,face){return vertex.face=face,null===face.outside?this.assigned.append(vertex):this.assigned.insertBefore(face.outside,vertex),face.outside=vertex,this},removeVertexFromFace:function(vertex,face){return vertex===face.outside&&(null!==vertex.next&&vertex.next.face===face?face.outside=vertex.next:face.outside=null),this.assigned.remove(vertex),this},removeAllVerticesFromFace:function(face){if(null!==face.outside){for(var start=face.outside,end=face.outside;null!==end.next&&end.next.face===face;)end=end.next;return this.assigned.removeSubList(start,end),start.prev=end.next=null,face.outside=null,start}},deleteFaceVertices:function(face,absorbingFace){var faceVertices=this.removeAllVerticesFromFace(face);if(void 0!==faceVertices)if(void 0===absorbingFace)this.unassigned.appendChain(faceVertices);else{var vertex=faceVertices;do{var nextVertex=vertex.next;absorbingFace.distanceToPoint(vertex.point)>this.tolerance?this.addVertexToFace(vertex,absorbingFace):this.unassigned.append(vertex),vertex=nextVertex}while(null!==vertex)}return this},resolveUnassignedPoints:function(newFaces){if(!1===this.unassigned.isEmpty()){var vertex=this.unassigned.first();do{for(var nextVertex=vertex.next,maxDistance=this.tolerance,maxFace=null,i=0;i<newFaces.length;i++){var face=newFaces[i];if(face.mark===Visible){var distance=face.distanceToPoint(vertex.point);if(distance>maxDistance&&(maxDistance=distance,maxFace=face),maxDistance>1e3*this.tolerance)break}}null!==maxFace&&this.addVertexToFace(vertex,maxFace),vertex=nextVertex}while(null!==vertex)}return this},computeExtremes:function(){var i,l,j,min=new three_module.Vector3,max=new three_module.Vector3,minVertices=[],maxVertices=[];for(i=0;i<3;i++)minVertices[i]=maxVertices[i]=this.vertices[0];for(min.copy(this.vertices[0].point),max.copy(this.vertices[0].point),i=0,l=this.vertices.length;i<l;i++){var vertex=this.vertices[i],point=vertex.point;for(j=0;j<3;j++)point.getComponent(j)<min.getComponent(j)&&(min.setComponent(j,point.getComponent(j)),minVertices[j]=vertex);for(j=0;j<3;j++)point.getComponent(j)>max.getComponent(j)&&(max.setComponent(j,point.getComponent(j)),maxVertices[j]=vertex)}return this.tolerance=3*Number.EPSILON*(Math.max(Math.abs(min.x),Math.abs(max.x))+Math.max(Math.abs(min.y),Math.abs(max.y))+Math.max(Math.abs(min.z),Math.abs(max.z))),{min:minVertices,max:maxVertices}},computeInitialHull:function computeInitialHull(){void 0===line3&&(line3=new three_module.Line3,plane=new three_module.Plane,closestPoint=new three_module.Vector3);var vertex,v0,v1,v2,v3,i,l,j,distance,vertices=this.vertices,extremes=this.computeExtremes(),min=extremes.min,max=extremes.max,maxDistance=0,index=0;for(i=0;i<3;i++)(distance=max[i].point.getComponent(i)-min[i].point.getComponent(i))>maxDistance&&(maxDistance=distance,index=i);for(v0=min[index],v1=max[index],maxDistance=0,line3.set(v0.point,v1.point),i=0,l=this.vertices.length;i<l;i++)(vertex=vertices[i])!==v0&&vertex!==v1&&(line3.closestPointToPoint(vertex.point,!0,closestPoint),(distance=closestPoint.distanceToSquared(vertex.point))>maxDistance&&(maxDistance=distance,v2=vertex));for(maxDistance=-1,plane.setFromCoplanarPoints(v0.point,v1.point,v2.point),i=0,l=this.vertices.length;i<l;i++)(vertex=vertices[i])!==v0&&vertex!==v1&&vertex!==v2&&(distance=Math.abs(plane.distanceToPoint(vertex.point)))>maxDistance&&(maxDistance=distance,v3=vertex);var faces=[];if(plane.distanceToPoint(v3.point)<0)for(faces.push(Face.create(v0,v1,v2),Face.create(v3,v1,v0),Face.create(v3,v2,v1),Face.create(v3,v0,v2)),i=0;i<3;i++)j=(i+1)%3,faces[i+1].getEdge(2).setTwin(faces[0].getEdge(j)),faces[i+1].getEdge(1).setTwin(faces[j+1].getEdge(0));else for(faces.push(Face.create(v0,v2,v1),Face.create(v3,v0,v1),Face.create(v3,v1,v2),Face.create(v3,v2,v0)),i=0;i<3;i++)j=(i+1)%3,faces[i+1].getEdge(2).setTwin(faces[0].getEdge((3-i)%3)),faces[i+1].getEdge(0).setTwin(faces[j+1].getEdge(1));for(i=0;i<4;i++)this.faces.push(faces[i]);for(i=0,l=vertices.length;i<l;i++)if((vertex=vertices[i])!==v0&&vertex!==v1&&vertex!==v2&&vertex!==v3){maxDistance=this.tolerance;var maxFace=null;for(j=0;j<4;j++)(distance=this.faces[j].distanceToPoint(vertex.point))>maxDistance&&(maxDistance=distance,maxFace=this.faces[j]);null!==maxFace&&this.addVertexToFace(vertex,maxFace)}return this},reindexFaces:function(){for(var activeFaces=[],i=0;i<this.faces.length;i++){var face=this.faces[i];face.mark===Visible&&activeFaces.push(face)}return this.faces=activeFaces,this},nextVertexToAdd:function(){if(!1===this.assigned.isEmpty()){var eyeVertex,maxDistance=0,eyeFace=this.assigned.first().face,vertex=eyeFace.outside;do{var distance=eyeFace.distanceToPoint(vertex.point);distance>maxDistance&&(maxDistance=distance,eyeVertex=vertex),vertex=vertex.next}while(null!==vertex&&vertex.face===eyeFace);return eyeVertex}},computeHorizon:function(eyePoint,crossEdge,face,horizon){var edge;this.deleteFaceVertices(face),face.mark=1,edge=null===crossEdge?crossEdge=face.getEdge(0):crossEdge.next;do{var twinEdge=edge.twin,oppositeFace=twinEdge.face;oppositeFace.mark===Visible&&(oppositeFace.distanceToPoint(eyePoint)>this.tolerance?this.computeHorizon(eyePoint,twinEdge,oppositeFace,horizon):horizon.push(edge)),edge=edge.next}while(edge!==crossEdge);return this},addAdjoiningFace:function(eyeVertex,horizonEdge){var face=Face.create(eyeVertex,horizonEdge.tail(),horizonEdge.head());return this.faces.push(face),face.getEdge(-1).setTwin(horizonEdge.twin),face.getEdge(0)},addNewFaces:function(eyeVertex,horizon){this.newFaces=[];for(var firstSideEdge=null,previousSideEdge=null,i=0;i<horizon.length;i++){var horizonEdge=horizon[i],sideEdge=this.addAdjoiningFace(eyeVertex,horizonEdge);null===firstSideEdge?firstSideEdge=sideEdge:sideEdge.next.setTwin(previousSideEdge),this.newFaces.push(sideEdge.face),previousSideEdge=sideEdge}return firstSideEdge.next.setTwin(previousSideEdge),this},addVertexToHull:function(eyeVertex){var horizon=[];return this.unassigned.clear(),this.removeVertexFromFace(eyeVertex,eyeVertex.face),this.computeHorizon(eyeVertex.point,null,eyeVertex.face,horizon),this.addNewFaces(eyeVertex,horizon),this.resolveUnassignedPoints(this.newFaces),this},cleanup:function(){return this.assigned.clear(),this.unassigned.clear(),this.newFaces=[],this},compute:function(){var vertex;for(this.computeInitialHull();void 0!==(vertex=this.nextVertexToAdd());)this.addVertexToHull(vertex);return this.reindexFaces(),this.cleanup(),this}}),Object.assign(Face,{create:function(a,b,c){var face=new Face,e0=new HalfEdge(a,face),e1=new HalfEdge(b,face),e2=new HalfEdge(c,face);return e0.next=e2.prev=e1,e1.next=e0.prev=e2,e2.next=e1.prev=e0,face.edge=e0,face.compute()}}),Object.assign(Face.prototype,{getEdge:function(i){for(var edge=this.edge;i>0;)edge=edge.next,i--;for(;i<0;)edge=edge.prev,i++;return edge},compute:function compute(){void 0===triangle&&(triangle=new three_module.Triangle);var a=this.edge.tail(),b=this.edge.head(),c=this.edge.next.head();return triangle.set(a.point,b.point,c.point),triangle.getNormal(this.normal),triangle.getMidpoint(this.midpoint),this.area=triangle.getArea(),this.constant=this.normal.dot(this.midpoint),this},distanceToPoint:function(point){return this.normal.dot(point)-this.constant}}),Object.assign(HalfEdge.prototype,{head:function(){return this.vertex},tail:function(){return this.prev?this.prev.vertex:null},length:function(){var head=this.head(),tail=this.tail();return null!==tail?tail.point.distanceTo(head.point):-1},lengthSquared:function(){var head=this.head(),tail=this.tail();return null!==tail?tail.point.distanceToSquared(head.point):-1},setTwin:function(edge){return this.twin=edge,edge.twin=this,this}}),Object.assign(VertexList.prototype,{first:function(){return this.head},last:function(){return this.tail},clear:function(){return this.head=this.tail=null,this},insertBefore:function(target,vertex){return vertex.prev=target.prev,vertex.next=target,null===vertex.prev?this.head=vertex:vertex.prev.next=vertex,target.prev=vertex,this},insertAfter:function(target,vertex){return vertex.prev=target,vertex.next=target.next,null===vertex.next?this.tail=vertex:vertex.next.prev=vertex,target.next=vertex,this},append:function(vertex){return null===this.head?this.head=vertex:this.tail.next=vertex,vertex.prev=this.tail,vertex.next=null,this.tail=vertex,this},appendChain:function(vertex){for(null===this.head?this.head=vertex:this.tail.next=vertex,vertex.prev=this.tail;null!==vertex.next;)vertex=vertex.next;return this.tail=vertex,this},remove:function(vertex){return null===vertex.prev?this.head=vertex.next:vertex.prev.next=vertex.next,null===vertex.next?this.tail=vertex.prev:vertex.next.prev=vertex.prev,this},removeSubList:function(a,b){return null===a.prev?this.head=b.next:a.prev.next=b.next,null===b.next?this.tail=a.prev:b.next.prev=a.prev,this},isEmpty:function(){return null===this.head}}),ConvexHull}();__webpack_require__.d(__webpack_exports__,"a",(function(){return ConvexGeometry}));var ConvexGeometry=function(points){three_module.Geometry.call(this),this.fromBufferGeometry(new ConvexBufferGeometry(points)),this.mergeVertices()};ConvexGeometry.prototype=Object.create(three_module.Geometry.prototype),ConvexGeometry.prototype.constructor=ConvexGeometry;var ConvexBufferGeometry=function(points){three_module.BufferGeometry.call(this);var vertices=[],normals=[];void 0===ConvexHull_ConvexHull&&console.error("THREE.ConvexBufferGeometry: ConvexBufferGeometry relies on ConvexHull");for(var faces=(new ConvexHull_ConvexHull).setFromPoints(points).faces,i=0;i<faces.length;i++){var face=faces[i],edge=face.edge;do{var point=edge.head().point;vertices.push(point.x,point.y,point.z),normals.push(face.normal.x,face.normal.y,face.normal.z),edge=edge.next}while(edge!==face.edge)}this.addAttribute("position",new three_module.Float32BufferAttribute(vertices,3)),this.addAttribute("normal",new three_module.Float32BufferAttribute(normals,3))};ConvexBufferGeometry.prototype=Object.create(three_module.BufferGeometry.prototype),ConvexBufferGeometry.prototype.constructor=ConvexBufferGeometry}}]);
//# sourceMappingURL=9.53f8f83f2eec7c90b531.bundle.js.map
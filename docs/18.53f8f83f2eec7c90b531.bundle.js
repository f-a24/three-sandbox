(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{228:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var three__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(598),stats_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(597),dat_gui__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(599),_node_modules_three_examples_jsm_utils_SceneUtils__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(600);__webpack_exports__.default=function(){var VIEWPORT_W=window.innerWidth,VIEWPORT_H=window.innerHeight,scene=new three__WEBPACK_IMPORTED_MODULE_0__.Scene,camera=new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(45,VIEWPORT_W/VIEWPORT_H,.1,1e3);scene.add(camera),camera.position.x=-20,camera.position.y=25,camera.position.z=20,camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(5,0,0));var renderer=new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer;renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_0__.Color(15658734)),renderer.setSize(VIEWPORT_W,VIEWPORT_H),renderer.shadowMap.enabled=!0;var planeGeometry=new three__WEBPACK_IMPORTED_MODULE_0__.PlaneGeometry(60,40,1,1),planeMaterial=new three__WEBPACK_IMPORTED_MODULE_0__.MeshLambertMaterial({color:16777215}),plane=new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(planeGeometry,planeMaterial);plane.receiveShadow=!0,plane.rotation.x=-.5*Math.PI,plane.position.x=0,plane.position.y=0,plane.position.z=0,scene.add(plane);var ambientLight=new three__WEBPACK_IMPORTED_MODULE_0__.AmbientLight(592137);scene.add(ambientLight);var spotLight=new three__WEBPACK_IMPORTED_MODULE_0__.SpotLight(16777215);spotLight.position.set(-20,30,5),spotLight.castShadow=!0,scene.add(spotLight);var geom=new three__WEBPACK_IMPORTED_MODULE_0__.Geometry;geom.vertices=[new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(1,3,1),new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(1,3,-1),new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(1,-1,1),new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(1,-1,-1),new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(-1,3,-1),new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(-1,3,1),new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(-1,-1,-1),new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(-1,-1,1)],geom.faces=[new three__WEBPACK_IMPORTED_MODULE_0__.Face3(0,2,1),new three__WEBPACK_IMPORTED_MODULE_0__.Face3(2,3,1),new three__WEBPACK_IMPORTED_MODULE_0__.Face3(4,6,5),new three__WEBPACK_IMPORTED_MODULE_0__.Face3(6,7,5),new three__WEBPACK_IMPORTED_MODULE_0__.Face3(4,5,1),new three__WEBPACK_IMPORTED_MODULE_0__.Face3(5,0,1),new three__WEBPACK_IMPORTED_MODULE_0__.Face3(7,6,2),new three__WEBPACK_IMPORTED_MODULE_0__.Face3(6,3,2),new three__WEBPACK_IMPORTED_MODULE_0__.Face3(5,7,0),new three__WEBPACK_IMPORTED_MODULE_0__.Face3(7,2,0),new three__WEBPACK_IMPORTED_MODULE_0__.Face3(1,3,4),new three__WEBPACK_IMPORTED_MODULE_0__.Face3(3,6,4)],geom.computeFaceNormals();var materials=[new three__WEBPACK_IMPORTED_MODULE_0__.MeshLambertMaterial({opacity:.6,color:4521796,transparent:!0}),new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({color:0,wireframe:!0})],mesh=_node_modules_three_examples_jsm_utils_SceneUtils__WEBPACK_IMPORTED_MODULE_3__.a.createMultiMaterialObject(geom,materials);mesh.children.forEach((function(e){e.castShadow=!0})),scene.add(mesh);var addControl=function(x,y,z){return{x:x,y:y,z:z}},controlPoints=[];controlPoints.push(addControl(3,5,3)),controlPoints.push(addControl(3,5,0)),controlPoints.push(addControl(3,0,3)),controlPoints.push(addControl(3,0,0)),controlPoints.push(addControl(0,5,0)),controlPoints.push(addControl(0,5,3)),controlPoints.push(addControl(0,0,0)),controlPoints.push(addControl(0,0,3));var gui=new dat_gui__WEBPACK_IMPORTED_MODULE_2__.a;gui.add({clone:function(){var clonedGeometry=mesh.children[0].geometry.clone(),materials=[new three__WEBPACK_IMPORTED_MODULE_0__.MeshLambertMaterial({opacity:.6,color:16729343,transparent:!0}),new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({color:0,wireframe:!0})],mesh2=_node_modules_three_examples_jsm_utils_SceneUtils__WEBPACK_IMPORTED_MODULE_3__.a.createMultiMaterialObject(clonedGeometry,materials);mesh2.children.forEach((function(e){e.castShadow=!0})),mesh2.translateX(5),mesh2.translateZ(5),mesh2.name="clone",scene.remove(scene.getObjectByName("clone")),scene.add(mesh2)}},"clone");for(var i=0;i<8;i++){var f1=gui.addFolder("Vertices "+(i+1));f1.add(controlPoints[i],"x",-10,10),f1.add(controlPoints[i],"y",-10,10),f1.add(controlPoints[i],"z",-10,10)}document.getElementById("WebGL-output").appendChild(renderer.domElement);var statsObj,stats=((statsObj=new stats_js__WEBPACK_IMPORTED_MODULE_1__).showPanel(0),statsObj.dom.style.position="absolute",statsObj.dom.style.left="0px",statsObj.dom.style.top="0px",document.getElementById("Stats-output").appendChild(statsObj.dom),statsObj),render=function(){stats.update(),mesh.children.forEach((function(e){for(var i=0;i<8;i++)e.geometry.vertices[i].set(controlPoints[i].x,controlPoints[i].y,controlPoints[i].z);e.geometry.verticesNeedUpdate=!0,e.geometry.computeFaceNormals()})),requestAnimationFrame(render),renderer.render(scene,camera)};render()}},597:function(module,exports,__webpack_require__){var f;module.exports=((f=function(){function e(a){return c.appendChild(a.dom),a}function u(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",c.addEventListener("click",(function(a){a.preventDefault(),u(++l%c.children.length)}),!1);var k=(performance||Date).now(),g=k,a=0,r=e(new f.Panel("FPS","#0ff","#002")),h=e(new f.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var t=e(new f.Panel("MB","#f08","#201"));return u(0),{REVISION:16,dom:c,addPanel:e,showPanel:u,begin:function(){k=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();if(h.update(c-k,200),c>g+1e3&&(r.update(1e3*a/(c-g),100),g=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){k=this.end()},domElement:c,setMode:u}}).Panel=function(e,f,l){var c=1/0,k=0,g=Math.round,a=g(window.devicePixelRatio||1),r=80*a,h=48*a,t=3*a,v=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r,q.height=h,q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");return b.font="bold "+9*a+"px Helvetica,Arial,sans-serif",b.textBaseline="top",b.fillStyle=l,b.fillRect(0,0,r,h),b.fillStyle=f,b.fillText(e,t,v),b.fillRect(d,m,n,p),b.fillStyle=l,b.globalAlpha=.9,b.fillRect(d,m,n,p),{dom:q,update:function(h,w){c=Math.min(c,h),k=Math.max(k,h),b.fillStyle=l,b.globalAlpha=1,b.fillRect(0,0,r,m),b.fillStyle=f,b.fillText(g(h)+" "+e+" ("+g(c)+"-"+g(k)+")",t,v),b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p),b.fillRect(d+n-a,m,a,p),b.fillStyle=l,b.globalAlpha=.9,b.fillRect(d+n-a,m,a,g((1-h/w)*p))}}},f)},600:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return SceneUtils}));var _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(598),SceneUtils={createMultiMaterialObject:function(geometry,materials){for(var group=new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Group,i=0,l=materials.length;i<l;i++)group.add(new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__.Mesh(geometry,materials[i]));return group},detach:function(child,parent,scene){console.warn("THREE.SceneUtils: detach() has been deprecated. Use scene.attach( child ) instead."),scene.attach(child)},attach:function(child,scene,parent){console.warn("THREE.SceneUtils: attach() has been deprecated. Use parent.attach( child ) instead."),parent.attach(child)}}}}]);
//# sourceMappingURL=18.53f8f83f2eec7c90b531.bundle.js.map
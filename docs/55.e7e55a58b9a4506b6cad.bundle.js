(window.webpackJsonp=window.webpackJsonp||[]).push([[55],{232:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var three__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(581),stats_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(580),dat_gui__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(582);__webpack_exports__.default=function(){var VIEWPORT_W=window.innerWidth,VIEWPORT_H=window.innerHeight,scene=new three__WEBPACK_IMPORTED_MODULE_0__.Scene;scene.overrideMaterial=new three__WEBPACK_IMPORTED_MODULE_0__.MeshDepthMaterial;var camera=new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(45,window.innerWidth/window.innerHeight,30,170);camera.position.x=-50,camera.position.y=40,camera.position.z=50,camera.lookAt(scene.position);var webGLRenderer=new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer;webGLRenderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_0__.Color(0)),webGLRenderer.setSize(VIEWPORT_W,VIEWPORT_H),webGLRenderer.shadowMap.enabled=!0,document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);var statsObj,stats=((statsObj=new stats_js__WEBPACK_IMPORTED_MODULE_1__).showPanel(0),statsObj.dom.style.position="absolute",statsObj.dom.style.left="0px",statsObj.dom.style.top="0px",document.getElementById("Stats-output").appendChild(statsObj.dom),statsObj),controls={cameraNear:camera.near,cameraFar:camera.far,rotationSpeed:.02,numberOfObjects:scene.children.length,removeCube:function(){var allChildren=scene.children,lastObject=allChildren[allChildren.length-1];lastObject instanceof three__WEBPACK_IMPORTED_MODULE_0__.Mesh&&(scene.remove(lastObject),controls.numberOfObjects=scene.children.length)},addCube:function(){var cubeSize=Math.ceil(3+3*Math.random()),cubeGeometry=new three__WEBPACK_IMPORTED_MODULE_0__.BoxGeometry(cubeSize,cubeSize,cubeSize),cubeMaterial=new three__WEBPACK_IMPORTED_MODULE_0__.MeshLambertMaterial({color:16777215*Math.random()});cubeMaterial=new three__WEBPACK_IMPORTED_MODULE_0__.MeshDepthMaterial;var cube=new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(cubeGeometry,cubeMaterial);cube.castShadow=!0,cube.position.x=-60+Math.round(100*Math.random()),cube.position.y=Math.round(10*Math.random()),cube.position.z=-100+Math.round(150*Math.random()),scene.add(cube),controls.numberOfObjects=scene.children.length},outputObjects:function(){console.log(scene.children)}},gui=new dat_gui__WEBPACK_IMPORTED_MODULE_2__.a;gui.add(controls,"rotationSpeed",0,.5),gui.add(controls,"addCube"),gui.add(controls,"removeCube"),gui.add(controls,"cameraNear",0,50).onChange(function(e){camera.near=e,camera.updateProjectionMatrix()}),gui.add(controls,"cameraFar",100,300).onChange(function(e){camera.far=e,camera.updateProjectionMatrix()});for(var i=0;i<10;i++)controls.addCube();window.addEventListener("resize",function(){camera.aspect=window.innerWidth/window.innerHeight,camera.updateProjectionMatrix(),webGLRenderer.setSize(window.innerWidth,window.innerHeight)},!1);var renderScene=function(){stats.update(),scene.traverse(function(e){e instanceof three__WEBPACK_IMPORTED_MODULE_0__.Mesh&&(e.rotation.x+=controls.rotationSpeed,e.rotation.y+=controls.rotationSpeed,e.rotation.z+=controls.rotationSpeed)}),requestAnimationFrame(renderScene),webGLRenderer.render(scene,camera)};renderScene()}},580:function(module,exports,__webpack_require__){var f;module.exports=((f=function(){function e(a){return c.appendChild(a.dom),a}function u(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",c.addEventListener("click",function(a){a.preventDefault(),u(++l%c.children.length)},!1);var k=(performance||Date).now(),g=k,a=0,r=e(new f.Panel("FPS","#0ff","#002")),h=e(new f.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var t=e(new f.Panel("MB","#f08","#201"));return u(0),{REVISION:16,dom:c,addPanel:e,showPanel:u,begin:function(){k=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();if(h.update(c-k,200),c>g+1e3&&(r.update(1e3*a/(c-g),100),g=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){k=this.end()},domElement:c,setMode:u}}).Panel=function(e,f,l){var c=1/0,k=0,g=Math.round,a=g(window.devicePixelRatio||1),r=80*a,h=48*a,t=3*a,v=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r,q.height=h,q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");return b.font="bold "+9*a+"px Helvetica,Arial,sans-serif",b.textBaseline="top",b.fillStyle=l,b.fillRect(0,0,r,h),b.fillStyle=f,b.fillText(e,t,v),b.fillRect(d,m,n,p),b.fillStyle=l,b.globalAlpha=.9,b.fillRect(d,m,n,p),{dom:q,update:function(h,w){c=Math.min(c,h),k=Math.max(k,h),b.fillStyle=l,b.globalAlpha=1,b.fillRect(0,0,r,m),b.fillStyle=f,b.fillText(g(h)+" "+e+" ("+g(c)+"-"+g(k)+")",t,v),b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p),b.fillRect(d+n-a,m,a,p),b.fillStyle=l,b.globalAlpha=.9,b.fillRect(d+n-a,m,a,g((1-h/w)*p))}}},f)}}]);
//# sourceMappingURL=55.e7e55a58b9a4506b6cad.bundle.js.map
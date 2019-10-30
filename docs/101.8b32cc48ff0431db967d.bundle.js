(window.webpackJsonp=window.webpackJsonp||[]).push([[101],{330:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var three__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(718),stats_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(719),dat_gui__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(720);__webpack_exports__.default=function(){var VIEWPORT_W=window.innerWidth,VIEWPORT_H=window.innerHeight,scene=new three__WEBPACK_IMPORTED_MODULE_0__.Scene,camera=new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(45,VIEWPORT_W/VIEWPORT_H,.1,200);camera.position.x=20,camera.position.y=40,camera.position.z=110,camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(20,30,0));var cloud,renderer=new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer;renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_0__.Color(0)),renderer.setSize(VIEWPORT_W,VIEWPORT_H);var velocities=[];document.getElementById("WebGL-output").appendChild(renderer.domElement);var controls={size:3,transparent:!0,opacity:.6,color:16777215,sizeAttenuation:!0,redraw:function(){scene.remove(scene.getObjectByName("particles1")),function(size,transparent,opacity,sizeAttenuation,color){for(var texture=(new three__WEBPACK_IMPORTED_MODULE_0__.TextureLoader).load("./assets/raindrop-1.png"),geom=new three__WEBPACK_IMPORTED_MODULE_0__.Geometry,material=new three__WEBPACK_IMPORTED_MODULE_0__.PointsMaterial({size:size,transparent:transparent,opacity:opacity,depthWrite:!1,map:texture,blending:three__WEBPACK_IMPORTED_MODULE_0__.AdditiveBlending,sizeAttenuation:sizeAttenuation,color:color}),i=0;i<1500;i++){var particle=new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(40*Math.random()-20,40*Math.random()*1.5,40*Math.random()-20);geom.vertices.push(particle),velocities.push({x:(Math.random()-.5)/3,y:.1+Math.random()/5})}(cloud=new three__WEBPACK_IMPORTED_MODULE_0__.Points(geom,material)).name="particles1",scene.add(cloud)}(controls.size,controls.transparent,controls.opacity,controls.sizeAttenuation,controls.color)}},gui=new dat_gui__WEBPACK_IMPORTED_MODULE_2__.a;gui.add(controls,"size",0,20).onChange(controls.redraw),gui.add(controls,"transparent").onChange(controls.redraw),gui.add(controls,"opacity",0,1).onChange(controls.redraw),gui.addColor(controls,"color").onChange(controls.redraw),gui.add(controls,"sizeAttenuation").onChange(controls.redraw);var statsObj,stats=((statsObj=new stats_js__WEBPACK_IMPORTED_MODULE_1__).showPanel(0),statsObj.dom.style.position="absolute",statsObj.dom.style.left="0px",statsObj.dom.style.top="0px",document.getElementById("Stats-output").appendChild(statsObj.dom),statsObj),renderScene=function(){stats.update(),cloud.geometry.vertices.forEach((function(v,i){v.y=v.y-velocities[i].y,v.x=v.x-velocities[i].x,v.y<=0&&(v.y=60),(v.x<=-20||v.x>=20)&&(velocities[i].x=-1*velocities[i].x)})),cloud.geometry.verticesNeedUpdate=!0,requestAnimationFrame(renderScene),renderer.render(scene,camera)};controls.redraw(),renderScene()}},719:function(module,exports,__webpack_require__){var f;module.exports=((f=function(){function e(a){return c.appendChild(a.dom),a}function u(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",c.addEventListener("click",(function(a){a.preventDefault(),u(++l%c.children.length)}),!1);var k=(performance||Date).now(),g=k,a=0,r=e(new f.Panel("FPS","#0ff","#002")),h=e(new f.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var t=e(new f.Panel("MB","#f08","#201"));return u(0),{REVISION:16,dom:c,addPanel:e,showPanel:u,begin:function(){k=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();if(h.update(c-k,200),c>g+1e3&&(r.update(1e3*a/(c-g),100),g=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){k=this.end()},domElement:c,setMode:u}}).Panel=function(e,f,l){var c=1/0,k=0,g=Math.round,a=g(window.devicePixelRatio||1),r=80*a,h=48*a,t=3*a,v=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r,q.height=h,q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");return b.font="bold "+9*a+"px Helvetica,Arial,sans-serif",b.textBaseline="top",b.fillStyle=l,b.fillRect(0,0,r,h),b.fillStyle=f,b.fillText(e,t,v),b.fillRect(d,m,n,p),b.fillStyle=l,b.globalAlpha=.9,b.fillRect(d,m,n,p),{dom:q,update:function(h,w){c=Math.min(c,h),k=Math.max(k,h),b.fillStyle=l,b.globalAlpha=1,b.fillRect(0,0,r,m),b.fillStyle=f,b.fillText(g(h)+" "+e+" ("+g(c)+"-"+g(k)+")",t,v),b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p),b.fillRect(d+n-a,m,a,p),b.fillStyle=l,b.globalAlpha=.9,b.fillRect(d+n-a,m,a,g((1-h/w)*p))}}},f)}}]);
//# sourceMappingURL=101.8b32cc48ff0431db967d.bundle.js.map
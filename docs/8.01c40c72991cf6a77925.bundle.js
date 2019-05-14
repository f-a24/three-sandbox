(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{156:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var three__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(346),stats_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(347);__webpack_exports__.default=function(){var VIEWPORT_W=window.innerWidth,VIEWPORT_H=window.innerHeight,scene=new three__WEBPACK_IMPORTED_MODULE_0__.Scene,camera=new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(45,window.innerWidth/window.innerHeight,.1,1e3);camera.position.x=-30,camera.position.y=40,camera.position.z=30,camera.lookAt(scene.position);var webGLRenderer=new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer;webGLRenderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_0__.Color(0)),webGLRenderer.setSize(VIEWPORT_W,VIEWPORT_H),webGLRenderer.shadowMap.enabled=!0;var ambientLight=new three__WEBPACK_IMPORTED_MODULE_0__.AmbientLight(789516);scene.add(ambientLight);var spotLight=new three__WEBPACK_IMPORTED_MODULE_0__.SpotLight(16777215);spotLight.position.set(-40,60,-10),spotLight.castShadow=!0,scene.add(spotLight);var points=function(a,b){var turtle=[0,0,0],points=[],rt=function(x){turtle[2]+=x},lt=function(x){turtle[2]-=x},fd=function(dist){points.push({x:turtle[0],y:turtle[1],z:5*Math.sin(0)});var dir=turtle[2]*(Math.PI/180);turtle[0]+=Math.cos(dir)*dist,turtle[1]+=Math.sin(dir)*dist,points.push({x:turtle[0],y:turtle[1],z:5*Math.sin(0)})},rg=function(st,ln,turtle){ln/=2.6457,--st>0&&(rg(st,ln,turtle),rt(60),gl(st,ln,turtle),rt(120),gl(st,ln,turtle),lt(60),rg(st,ln,turtle),lt(120),rg(st,ln,turtle),rg(st,ln,turtle),lt(60),gl(st,ln,turtle),rt(60)),0==st&&(fd(ln),rt(60),fd(ln),rt(120),fd(ln),lt(60),fd(ln),lt(120),fd(ln),fd(ln),lt(60),fd(ln),rt(60))},gl=function(st,ln,turtle){ln/=2.6457,--st>0&&(lt(60),rg(st,ln,turtle),rt(60),gl(st,ln,turtle),gl(st,ln,turtle),rt(120),gl(st,ln,turtle),rt(60),rg(st,ln,turtle),lt(120),rg(st,ln,turtle),lt(60),gl(st,ln,turtle)),0==st&&(lt(60),fd(ln),rt(60),fd(ln),fd(ln),rt(120),fd(ln),rt(60),fd(ln),lt(120),fd(ln),lt(60),fd(ln))};return rg(a,b,turtle),points}(4,60),lines=new three__WEBPACK_IMPORTED_MODULE_0__.Geometry,colors=[],i=0;points.forEach(function(e){lines.vertices.push(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(e.x,e.z,e.y)),colors[i]=new three__WEBPACK_IMPORTED_MODULE_0__.Color(16777215),colors[i].setHSL(e.x/100+.5,20*e.y/300,.8),i++}),lines.colors=colors;var material=new three__WEBPACK_IMPORTED_MODULE_0__.LineDashedMaterial({vertexColors:three__WEBPACK_IMPORTED_MODULE_0__.VertexColors,dashSize:2,gapSize:2,scale:.1}),line=new three__WEBPACK_IMPORTED_MODULE_0__.Line(lines,material);line.position.set(25,-30,-60),line.computeLineDistances(),scene.add(line),document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);var statsObj,stats=((statsObj=new stats_js__WEBPACK_IMPORTED_MODULE_1__).showPanel(0),statsObj.dom.style.position="absolute",statsObj.dom.style.left="0px",statsObj.dom.style.top="0px",document.getElementById("Stats-output").appendChild(statsObj.dom),statsObj);window.addEventListener("resize",function(){camera.aspect=window.innerWidth/window.innerHeight,camera.updateProjectionMatrix(),webGLRenderer.setSize(window.innerWidth,window.innerHeight)},!1);var step=0,renderScene=function(){stats.update(),line.rotation.z=step+=.01,requestAnimationFrame(renderScene),webGLRenderer.render(scene,camera)};renderScene()}},347:function(module,exports,__webpack_require__){var f;module.exports=((f=function(){function e(a){return c.appendChild(a.dom),a}function u(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",c.addEventListener("click",function(a){a.preventDefault(),u(++l%c.children.length)},!1);var k=(performance||Date).now(),g=k,a=0,r=e(new f.Panel("FPS","#0ff","#002")),h=e(new f.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var t=e(new f.Panel("MB","#f08","#201"));return u(0),{REVISION:16,dom:c,addPanel:e,showPanel:u,begin:function(){k=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();if(h.update(c-k,200),c>g+1e3&&(r.update(1e3*a/(c-g),100),g=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){k=this.end()},domElement:c,setMode:u}}).Panel=function(e,f,l){var c=1/0,k=0,g=Math.round,a=g(window.devicePixelRatio||1),r=80*a,h=48*a,t=3*a,v=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r,q.height=h,q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");return b.font="bold "+9*a+"px Helvetica,Arial,sans-serif",b.textBaseline="top",b.fillStyle=l,b.fillRect(0,0,r,h),b.fillStyle=f,b.fillText(e,t,v),b.fillRect(d,m,n,p),b.fillStyle=l,b.globalAlpha=.9,b.fillRect(d,m,n,p),{dom:q,update:function(h,w){c=Math.min(c,h),k=Math.max(k,h),b.fillStyle=l,b.globalAlpha=1,b.fillRect(0,0,r,m),b.fillStyle=f,b.fillText(g(h)+" "+e+" ("+g(c)+"-"+g(k)+")",t,v),b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p),b.fillRect(d+n-a,m,a,p),b.fillStyle=l,b.globalAlpha=.9,b.fillRect(d+n-a,m,a,g((1-h/w)*p))}}},f)}}]);
//# sourceMappingURL=8.01c40c72991cf6a77925.bundle.js.map
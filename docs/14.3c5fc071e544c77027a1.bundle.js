(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{195:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var three__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(386),stats_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(385);__webpack_require__(412);__webpack_exports__.default=function(){var VIEWPORT_W=window.innerWidth,VIEWPORT_H=window.innerHeight,scene=new three__WEBPACK_IMPORTED_MODULE_0__.Scene,camera=new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(45,VIEWPORT_W/VIEWPORT_H,.1,1e3);camera.position.x=6,camera.position.y=6,camera.position.z=6,camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0,0,0));var renderer=new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer;renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_0__.Color(0)),renderer.setSize(VIEWPORT_W,VIEWPORT_H),renderer.shadowMap.enabled=!0;var dir1=new three__WEBPACK_IMPORTED_MODULE_0__.DirectionalLight(.4);dir1.position.set(-30,30,-30),scene.add(dir1);var dir2=new three__WEBPACK_IMPORTED_MODULE_0__.DirectionalLight(.4);dir2.position.set(-30,30,30),scene.add(dir2);var dir3=new three__WEBPACK_IMPORTED_MODULE_0__.DirectionalLight(.4);dir3.position.set(30,30,-30),scene.add(dir3);var spotLight=new three__WEBPACK_IMPORTED_MODULE_0__.SpotLight(16777215);spotLight.position.set(30,30,30),scene.add(spotLight),document.getElementById("WebGL-output").appendChild(renderer.domElement);var loader=new three__WEBPACK_IMPORTED_MODULE_0__.PDBLoader,group=new three__WEBPACK_IMPORTED_MODULE_0__.Group;loader.load("./assets/aspirin.pdb",function(_a){var geometryAtoms=_a.geometryAtoms,geometryBonds=_a.geometryBonds,json=_a.json,atomsPositions=geometryAtoms.getAttribute("position"),bondsPositions=geometryBonds.getAttribute("position");json.atoms.forEach(function(atom,i){var sphere=new three__WEBPACK_IMPORTED_MODULE_0__.SphereGeometry(.2),material=new three__WEBPACK_IMPORTED_MODULE_0__.MeshPhongMaterial({color:new three__WEBPACK_IMPORTED_MODULE_0__.Color("rgb("+atom[3][0]+","+atom[3][1]+","+atom[3][2]+")")}),mesh=new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(sphere,material);mesh.position.set(atomsPositions.getX[i],atomsPositions.getY[i],atomsPositions.getZ[i]),group.add(mesh)});for(var j=0;j<json.bonds.length;j+=2){var path=new three__WEBPACK_IMPORTED_MODULE_0__.CatmullRomCurve3([new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(bondsPositions.getX[j],bondsPositions.getY[j],bondsPositions.getZ[j]),new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(bondsPositions.getX[j+1],bondsPositions.getY[j+1],bondsPositions.getZ[j+1])]),tube=new three__WEBPACK_IMPORTED_MODULE_0__.TubeGeometry(path,1,.04),material=new three__WEBPACK_IMPORTED_MODULE_0__.MeshPhongMaterial({color:13421772}),mesh=new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(tube,material);group.add(mesh)}scene.add(group)});var statsObj,stats=((statsObj=new stats_js__WEBPACK_IMPORTED_MODULE_1__).showPanel(0),statsObj.dom.style.position="absolute",statsObj.dom.style.left="0px",statsObj.dom.style.top="0px",document.getElementById("Stats-output").appendChild(statsObj.dom),statsObj);window.addEventListener("resize",function(){camera.aspect=window.innerWidth/window.innerHeight,camera.updateProjectionMatrix(),renderer.setSize(window.innerWidth,window.innerHeight)},!1);var renderScene=function(){stats.update(),group&&(group.rotation.y+=.006),requestAnimationFrame(renderScene),renderer.render(scene,camera)};renderScene()}},385:function(module,exports,__webpack_require__){var f;module.exports=((f=function(){function e(a){return c.appendChild(a.dom),a}function u(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",c.addEventListener("click",function(a){a.preventDefault(),u(++l%c.children.length)},!1);var k=(performance||Date).now(),g=k,a=0,r=e(new f.Panel("FPS","#0ff","#002")),h=e(new f.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var t=e(new f.Panel("MB","#f08","#201"));return u(0),{REVISION:16,dom:c,addPanel:e,showPanel:u,begin:function(){k=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();if(h.update(c-k,200),c>g+1e3&&(r.update(1e3*a/(c-g),100),g=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){k=this.end()},domElement:c,setMode:u}}).Panel=function(e,f,l){var c=1/0,k=0,g=Math.round,a=g(window.devicePixelRatio||1),r=80*a,h=48*a,t=3*a,v=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r,q.height=h,q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");return b.font="bold "+9*a+"px Helvetica,Arial,sans-serif",b.textBaseline="top",b.fillStyle=l,b.fillRect(0,0,r,h),b.fillStyle=f,b.fillText(e,t,v),b.fillRect(d,m,n,p),b.fillStyle=l,b.globalAlpha=.9,b.fillRect(d,m,n,p),{dom:q,update:function(h,w){c=Math.min(c,h),k=Math.max(k,h),b.fillStyle=l,b.globalAlpha=1,b.fillRect(0,0,r,m),b.fillStyle=f,b.fillText(g(h)+" "+e+" ("+g(c)+"-"+g(k)+")",t,v),b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p),b.fillRect(d+n-a,m,a,p),b.fillStyle=l,b.globalAlpha=.9,b.fillRect(d+n-a,m,a,g((1-h/w)*p))}}},f)},412:function(module,exports,__webpack_require__){var THREE=__webpack_require__(386);THREE.PDBLoader=function(manager){this.manager=void 0!==manager?manager:THREE.DefaultLoadingManager},THREE.PDBLoader.prototype={constructor:THREE.PDBLoader,load:function(url,onLoad,onProgress,onError){var scope=this,loader=new THREE.FileLoader(scope.manager);loader.setPath(scope.path),loader.load(url,function(text){onLoad(scope.parse(text))},onProgress,onError)},setPath:function(value){return this.path=value,this},parse:function(text){function trim(text){return text.replace(/^\s\s*/,"").replace(/\s\s*$/,"")}function capitalize(text){return text.charAt(0).toUpperCase()+text.substr(1).toLowerCase()}function parseBond(start,length){var eatom=parseInt(lines[i].substr(start,length));if(eatom){var h=function hash(s,e){return"s"+Math.min(s,e)+"e"+Math.max(s,e)}(satom,eatom);void 0===bhash[h]&&(bonds.push([satom-1,eatom-1,1]),bhash[h]=bonds.length-1)}}for(var x,y,z,index,e,CPK={h:[255,255,255],he:[217,255,255],li:[204,128,255],be:[194,255,0],b:[255,181,181],c:[144,144,144],n:[48,80,248],o:[255,13,13],f:[144,224,80],ne:[179,227,245],na:[171,92,242],mg:[138,255,0],al:[191,166,166],si:[240,200,160],p:[255,128,0],s:[255,255,48],cl:[31,240,31],ar:[128,209,227],k:[143,64,212],ca:[61,255,0],sc:[230,230,230],ti:[191,194,199],v:[166,166,171],cr:[138,153,199],mn:[156,122,199],fe:[224,102,51],co:[240,144,160],ni:[80,208,80],cu:[200,128,51],zn:[125,128,176],ga:[194,143,143],ge:[102,143,143],as:[189,128,227],se:[255,161,0],br:[166,41,41],kr:[92,184,209],rb:[112,46,176],sr:[0,255,0],y:[148,255,255],zr:[148,224,224],nb:[115,194,201],mo:[84,181,181],tc:[59,158,158],ru:[36,143,143],rh:[10,125,140],pd:[0,105,133],ag:[192,192,192],cd:[255,217,143],in:[166,117,115],sn:[102,128,128],sb:[158,99,181],te:[212,122,0],i:[148,0,148],xe:[66,158,176],cs:[87,23,143],ba:[0,201,0],la:[112,212,255],ce:[255,255,199],pr:[217,255,199],nd:[199,255,199],pm:[163,255,199],sm:[143,255,199],eu:[97,255,199],gd:[69,255,199],tb:[48,255,199],dy:[31,255,199],ho:[0,255,156],er:[0,230,117],tm:[0,212,82],yb:[0,191,56],lu:[0,171,36],hf:[77,194,255],ta:[77,166,255],w:[33,148,214],re:[38,125,171],os:[38,102,150],ir:[23,84,135],pt:[208,208,224],au:[255,209,35],hg:[184,184,208],tl:[166,84,77],pb:[87,89,97],bi:[158,79,181],po:[171,92,0],at:[117,79,69],rn:[66,130,150],fr:[66,0,102],ra:[0,125,0],ac:[112,171,250],th:[0,186,255],pa:[0,161,255],u:[0,143,255],np:[0,128,255],pu:[0,107,255],am:[84,92,242],cm:[120,92,227],bk:[138,79,227],cf:[161,54,212],es:[179,31,212],fm:[179,31,186],md:[179,13,166],no:[189,13,135],lr:[199,0,102],rf:[204,0,89],db:[209,0,79],sg:[217,0,69],bh:[224,0,56],hs:[230,0,46],mt:[235,0,38],ds:[235,0,38],rg:[235,0,38],cn:[235,0,38],uut:[235,0,38],uuq:[235,0,38],uup:[235,0,38],uuh:[235,0,38],uus:[235,0,38],uuo:[235,0,38]},atoms=[],bonds=[],histogram={},bhash={},lines=text.split("\n"),i=0,l=lines.length;i<l;i++)if("ATOM"===lines[i].substr(0,4)||"HETATM"===lines[i].substr(0,6))x=parseFloat(lines[i].substr(30,7)),y=parseFloat(lines[i].substr(38,7)),z=parseFloat(lines[i].substr(46,7)),index=parseInt(lines[i].substr(6,5))-1,""===(e=trim(lines[i].substr(76,2)).toLowerCase())&&(e=trim(lines[i].substr(12,2)).toLowerCase()),atoms[index]=[x,y,z,CPK[e],capitalize(e)],void 0===histogram[e]?histogram[e]=1:histogram[e]+=1;else if("CONECT"===lines[i].substr(0,6)){var satom=parseInt(lines[i].substr(6,5));parseBond(11,5),parseBond(16,5),parseBond(21,5),parseBond(26,5)}return function buildGeometry(){var i,l,build={geometryAtoms:new THREE.BufferGeometry,geometryBonds:new THREE.BufferGeometry,json:{atoms:atoms,bonds:bonds}},geometryAtoms=build.geometryAtoms,geometryBonds=build.geometryBonds,verticesAtoms=[],colorsAtoms=[],verticesBonds=[];for(i=0,l=atoms.length;i<l;i++){var atom=atoms[i],x=atom[0],y=atom[1],z=atom[2];verticesAtoms.push(x,y,z);var r=atom[3][0]/255,g=atom[3][1]/255,b=atom[3][2]/255;colorsAtoms.push(r,g,b)}for(i=0,l=bonds.length;i<l;i++){var bond=bonds[i],start=bond[0],end=bond[1];verticesBonds.push(verticesAtoms[3*start+0]),verticesBonds.push(verticesAtoms[3*start+1]),verticesBonds.push(verticesAtoms[3*start+2]),verticesBonds.push(verticesAtoms[3*end+0]),verticesBonds.push(verticesAtoms[3*end+1]),verticesBonds.push(verticesAtoms[3*end+2])}return geometryAtoms.addAttribute("position",new THREE.Float32BufferAttribute(verticesAtoms,3)),geometryAtoms.addAttribute("color",new THREE.Float32BufferAttribute(colorsAtoms,3)),geometryBonds.addAttribute("position",new THREE.Float32BufferAttribute(verticesBonds,3)),build}()}}}}]);
//# sourceMappingURL=14.3c5fc071e544c77027a1.bundle.js.map
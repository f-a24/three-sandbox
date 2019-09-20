(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{335:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var three_module=__webpack_require__(684),stats_min=__webpack_require__(683),dat_gui_module=__webpack_require__(685),__assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t},defaults={lines:12,length:7,width:5,radius:10,scale:1,corners:1,color:"#000",fadeColor:"transparent",animation:"spinner-line-fade-default",rotate:0,direction:1,speed:1,zIndex:2e9,className:"spinner",top:"50%",left:"50%",shadow:"0 0 1px transparent",position:"absolute"},Spinner=function(){function Spinner(opts){void 0===opts&&(opts={}),this.opts=__assign({},defaults,opts)}return Spinner.prototype.spin=function(target){return this.stop(),this.el=document.createElement("div"),this.el.className=this.opts.className,this.el.setAttribute("role","progressbar"),css(this.el,{position:this.opts.position,width:0,zIndex:this.opts.zIndex,left:this.opts.left,top:this.opts.top,transform:"scale("+this.opts.scale+")"}),target&&target.insertBefore(this.el,target.firstChild||null),function drawLines(el,opts){var borderRadius=Math.round(opts.corners*opts.width*500)/1e3+"px",shadow="none";!0===opts.shadow?shadow="0 2px 4px #000":"string"==typeof opts.shadow&&(shadow=opts.shadow);for(var shadows=function parseBoxShadow(boxShadow){for(var regex=/^\s*([a-zA-Z]+\s+)?(-?\d+(\.\d+)?)([a-zA-Z]*)\s+(-?\d+(\.\d+)?)([a-zA-Z]*)(.*)$/,shadows=[],_i=0,_a=boxShadow.split(",");_i<_a.length;_i++){var matches=_a[_i].match(regex);if(null!==matches){var x=+matches[2],y=+matches[5],xUnits=matches[4],yUnits=matches[7];0!==x||xUnits||(xUnits=yUnits),0!==y||yUnits||(yUnits=xUnits),xUnits===yUnits&&shadows.push({prefix:matches[1]||"",x:x,y:y,xUnits:xUnits,yUnits:yUnits,end:matches[8]})}}return shadows}(shadow),i=0;i<opts.lines;i++){var degrees=~~(360/opts.lines*i+opts.rotate),backgroundLine=css(document.createElement("div"),{position:"absolute",top:-opts.width/2+"px",width:opts.length+opts.width+"px",height:opts.width+"px",background:getColor(opts.fadeColor,i),borderRadius:borderRadius,transformOrigin:"left",transform:"rotate("+degrees+"deg) translateX("+opts.radius+"px)"}),delay=i*opts.direction/opts.lines/opts.speed;delay-=1/opts.speed;var line=css(document.createElement("div"),{width:"100%",height:"100%",background:getColor(opts.color,i),borderRadius:borderRadius,boxShadow:normalizeShadow(shadows,degrees),animation:1/opts.speed+"s linear "+delay+"s infinite "+opts.animation});backgroundLine.appendChild(line),el.appendChild(backgroundLine)}}(this.el,this.opts),this},Spinner.prototype.stop=function(){return this.el&&("undefined"!=typeof requestAnimationFrame?cancelAnimationFrame(this.animateId):clearTimeout(this.animateId),this.el.parentNode&&this.el.parentNode.removeChild(this.el),this.el=void 0),this},Spinner}();function css(el,props){for(var prop in props)el.style[prop]=props[prop];return el}function getColor(color,idx){return"string"==typeof color?color:color[idx%color.length]}function normalizeShadow(shadows,degrees){for(var normalized=[],_i=0,shadows_1=shadows;_i<shadows_1.length;_i++){var shadow=shadows_1[_i],xy=convertOffset(shadow.x,shadow.y,degrees);normalized.push(shadow.prefix+xy[0]+shadow.xUnits+" "+xy[1]+shadow.yUnits+shadow.end)}return normalized.join(", ")}function convertOffset(x,y,degrees){var radians=degrees*Math.PI/180,sin=Math.sin(radians),cos=Math.cos(radians);return[Math.round(1e3*(x*cos+y*sin))/1e3,Math.round(1e3*(-x*sin+y*cos))/1e3]}__webpack_require__(15),__webpack_require__(697),__webpack_require__(59),__webpack_require__(698);var THREE=__webpack_require__(684);(function(){var returning,__bind=function(fn,me){return function(){return fn.apply(me,arguments)}},__slice=[].slice,__hasProp={}.hasOwnProperty;returning=function(value,fn){return fn(),value},window.ThreeBSP=function(){function ThreeBSP(treeIsh,matrix){this.matrix=matrix,this.intersect=__bind(this.intersect,this),this.union=__bind(this.union,this),this.subtract=__bind(this.subtract,this),this.toGeometry=__bind(this.toGeometry,this),this.toMesh=__bind(this.toMesh,this),this.toTree=__bind(this.toTree,this),null==this.matrix&&(this.matrix=new THREE.Matrix4),this.tree=this.toTree(treeIsh)}return ThreeBSP.prototype.toTree=function(treeIsh){var geometry,i,polygons,_fn,_i,_len,_ref,_this=this;if(treeIsh instanceof ThreeBSP.Node)return treeIsh;for(polygons=[],_fn=function(face,i){var faceVertexUvs,idx,polygon,vIndex,vertex,_j,_len1,_ref1,_ref2;for(null==(faceVertexUvs=null==(_ref1=geometry.faceVertexUvs)?void 0:_ref1[0][i])&&(faceVertexUvs=[new THREE.Vector2,new THREE.Vector2,new THREE.Vector2,new THREE.Vector2]),polygon=new ThreeBSP.Polygon,vIndex=_j=0,_len1=(_ref2=["a","b","c","d"]).length;_j<_len1;vIndex=++_j)null!=(idx=face[_ref2[vIndex]])&&(vertex=geometry.vertices[idx],(vertex=new ThreeBSP.Vertex(vertex.x,vertex.y,vertex.z,face.vertexNormals[0],new THREE.Vector2(faceVertexUvs[vIndex].x,faceVertexUvs[vIndex].y))).applyMatrix4(_this.matrix),polygon.vertices.push(vertex));return polygons.push(polygon.calculateProperties())},i=_i=0,_len=(_ref=(geometry=treeIsh instanceof THREE.Geometry?treeIsh:treeIsh instanceof THREE.Mesh?(treeIsh.updateMatrix(),this.matrix=treeIsh.matrix.clone(),treeIsh.geometry):void 0).faces).length;_i<_len;i=++_i)_fn(_ref[i],i);return new ThreeBSP.Node(polygons)},ThreeBSP.prototype.toMesh=function(material){var geometry,mesh,_this=this;return null==material&&(material=new THREE.MeshNormalMaterial),geometry=this.toGeometry(),returning(mesh=new THREE.Mesh(geometry,material),(function(){return mesh.position.setFromMatrixPosition(_this.matrix),mesh.rotation.setFromRotationMatrix(_this.matrix)}))},ThreeBSP.prototype.toGeometry=function(){var geometry,matrix,_this=this;return matrix=(new THREE.Matrix4).getInverse(this.matrix),returning(geometry=new THREE.Geometry,(function(){var face,idx,polyVerts,polygon,v,vertUvs,verts,_i,_len,_ref,_results;for(_results=[],_i=0,_len=(_ref=_this.tree.allPolygons()).length;_i<_len;_i++)polygon=_ref[_i],polyVerts=function(){var _j,_len1,_ref1,_results1;for(_results1=[],_j=0,_len1=(_ref1=polygon.vertices).length;_j<_len1;_j++)v=_ref1[_j],_results1.push(v.clone().applyMatrix4(matrix));return _results1}(),_results.push(function(){var _j,_ref1,_results1;for(_results1=[],idx=_j=2,_ref1=polyVerts.length;2<=_ref1?_j<_ref1:_j>_ref1;idx=2<=_ref1?++_j:--_j)verts=[polyVerts[0],polyVerts[idx-1],polyVerts[idx]],vertUvs=function(){var _k,_len1,_ref2,_ref3,_results2;for(_results2=[],_k=0,_len1=verts.length;_k<_len1;_k++)v=verts[_k],_results2.push(new THREE.Vector2(null==(_ref2=v.uv)?void 0:_ref2.x,null==(_ref3=v.uv)?void 0:_ref3.y));return _results2}(),face=function(func,args,ctor){ctor.prototype=func.prototype;var child=new ctor,result=func.apply(child,args);return Object(result)===result?result:child}(THREE.Face3,__slice.call(function(){var _k,_len1,_results2;for(_results2=[],_k=0,_len1=verts.length;_k<_len1;_k++)v=verts[_k],_results2.push(geometry.vertices.push(v)-1);return _results2}()).concat([polygon.normal.clone()]),(function(){})),geometry.faces.push(face),_results1.push(geometry.faceVertexUvs[0].push(vertUvs));return _results1}());return _results}))},ThreeBSP.prototype.subtract=function(other){var them,us,_ref;return them=(_ref=[this.tree.clone(),other.tree.clone()])[1],(us=_ref[0]).invert().clipTo(them),them.clipTo(us).invert().clipTo(us).invert(),new ThreeBSP(us.build(them.allPolygons()).invert(),this.matrix)},ThreeBSP.prototype.union=function(other){var them,us,_ref;return them=(_ref=[this.tree.clone(),other.tree.clone()])[1],(us=_ref[0]).clipTo(them),them.clipTo(us).invert().clipTo(us).invert(),new ThreeBSP(us.build(them.allPolygons()),this.matrix)},ThreeBSP.prototype.intersect=function(other){var them,us,_ref;return us=(_ref=[this.tree.clone(),other.tree.clone()])[0],(them=_ref[1]).clipTo(us.invert()).invert().clipTo(us.clipTo(them)),new ThreeBSP(us.build(them.allPolygons()).invert(),this.matrix)},ThreeBSP}(),ThreeBSP.Vertex=function(_super){function Vertex(x,y,z,normal,uv){this.normal=null==normal?new THREE.Vector3:normal,this.uv=null==uv?new THREE.Vector2:uv,this.interpolate=__bind(this.interpolate,this),this.lerp=__bind(this.lerp,this),Vertex.__super__.constructor.call(this,x,y,z)}return function(child,parent){function ctor(){this.constructor=child}for(var key in parent)__hasProp.call(parent,key)&&(child[key]=parent[key]);ctor.prototype=parent.prototype,child.prototype=new ctor,child.__super__=parent.prototype}(Vertex,_super),Vertex.prototype.clone=function(){return new ThreeBSP.Vertex(this.x,this.y,this.z,this.normal.clone(),this.uv.clone())},Vertex.prototype.lerp=function(v,alpha){var _this=this;return returning(Vertex.__super__.lerp.apply(this,arguments),(function(){return _this.uv.add(v.uv.clone().sub(_this.uv).multiplyScalar(alpha)),_this.normal.lerp(v,alpha)}))},Vertex.prototype.interpolate=function(){var args,_ref;return args=1<=arguments.length?__slice.call(arguments,0):[],(_ref=this.clone()).lerp.apply(_ref,args)},Vertex}(THREE.Vector3),ThreeBSP.Polygon=function(){function Polygon(vertices,normal,w){this.vertices=null==vertices?[]:vertices,this.normal=normal,this.w=w,this.subdivide=__bind(this.subdivide,this),this.tessellate=__bind(this.tessellate,this),this.classifySide=__bind(this.classifySide,this),this.classifyVertex=__bind(this.classifyVertex,this),this.invert=__bind(this.invert,this),this.clone=__bind(this.clone,this),this.calculateProperties=__bind(this.calculateProperties,this),this.vertices.length&&this.calculateProperties()}return Polygon.prototype.calculateProperties=function(){var _this=this;return returning(this,(function(){var a,b,c,_ref;return a=(_ref=_this.vertices)[0],b=_ref[1],c=_ref[2],_this.normal=b.clone().sub(a).cross(c.clone().sub(a)).normalize(),_this.w=_this.normal.clone().dot(a)}))},Polygon.prototype.clone=function(){var v;return new ThreeBSP.Polygon(function(){var _i,_len,_ref,_results;for(_results=[],_i=0,_len=(_ref=this.vertices).length;_i<_len;_i++)v=_ref[_i],_results.push(v.clone());return _results}.call(this),this.normal.clone(),this.w)},Polygon.prototype.invert=function(){var _this=this;return returning(this,(function(){return _this.normal.multiplyScalar(-1),_this.w*=-1,_this.vertices.reverse()}))},Polygon.prototype.classifyVertex=function(vertex){var side;switch(side=this.normal.dot(vertex)-this.w,!1){case!(side<-1e-5):return 2;case!(side>1e-5):return 1;default:return 0}},Polygon.prototype.classifySide=function(polygon){var back,front,tally,_i,_len,_ref,_ref1,_this=this;for(front=(_ref=[0,0])[0],back=_ref[1],tally=function(v){switch(_this.classifyVertex(v)){case 1:return front+=1;case 2:return back+=1}},_i=0,_len=(_ref1=polygon.vertices).length;_i<_len;_i++)tally(_ref1[_i]);return 0<front&&0===back?1:0===front&&0<back?2:front===back&&0===back?0:3},Polygon.prototype.tessellate=function(poly){var b,count,f,i,polys,t,ti,tj,v,vi,vj,_i,_len,_ref,_ref1,_ref2;if(_ref={f:[],b:[],count:poly.vertices.length},f=_ref.f,b=_ref.b,count=_ref.count,3!==this.classifySide(poly))return[poly];for(i=_i=0,_len=(_ref1=poly.vertices).length;_i<_len;i=++_i)vi=_ref1[i],vj=poly.vertices[(i+1)%count],ti=(_ref2=function(){var _j,_len1,_ref2,_results;for(_results=[],_j=0,_len1=(_ref2=[vi,vj]).length;_j<_len1;_j++)v=_ref2[_j],_results.push(this.classifyVertex(v));return _results}.call(this))[0],tj=_ref2[1],2!==ti&&f.push(vi),1!==ti&&b.push(vi),3==(ti|tj)&&(t=(this.w-this.normal.dot(vi))/this.normal.dot(vj.clone().sub(vi)),v=vi.interpolate(vj,t),f.push(v),b.push(v));return returning(polys=[],(function(){if(3<=f.length&&polys.push(new ThreeBSP.Polygon(f)),3<=b.length)return polys.push(new ThreeBSP.Polygon(b))}))},Polygon.prototype.subdivide=function(polygon,coplanar_front,coplanar_back,front,back){var poly,side,_i,_len,_ref,_results;for(_results=[],_i=0,_len=(_ref=this.tessellate(polygon)).length;_i<_len;_i++)switch(poly=_ref[_i],side=this.classifySide(poly),side){case 1:_results.push(front.push(poly));break;case 2:_results.push(back.push(poly));break;case 0:0<this.normal.dot(poly.normal)?_results.push(coplanar_front.push(poly)):_results.push(coplanar_back.push(poly));break;default:throw new Error("BUG: Polygon of classification "+side+" in subdivision")}return _results},Polygon}(),ThreeBSP.Node=function(){function Node(polygons){this.clipTo=__bind(this.clipTo,this),this.clipPolygons=__bind(this.clipPolygons,this),this.invert=__bind(this.invert,this),this.allPolygons=__bind(this.allPolygons,this),this.isConvex=__bind(this.isConvex,this),this.build=__bind(this.build,this),this.clone=__bind(this.clone,this),this.polygons=[],null!=polygons&&polygons.length&&this.build(polygons)}return Node.prototype.clone=function(){var node,_this=this;return returning(node=new ThreeBSP.Node,(function(){var p,_ref,_ref1,_ref2;return node.divider=null==(_ref=_this.divider)?void 0:_ref.clone(),node.polygons=function(){var _i,_len,_ref1,_results;for(_results=[],_i=0,_len=(_ref1=this.polygons).length;_i<_len;_i++)p=_ref1[_i],_results.push(p.clone());return _results}.call(_this),node.front=null==(_ref1=_this.front)?void 0:_ref1.clone(),node.back=null==(_ref2=_this.back)?void 0:_ref2.clone()}))},Node.prototype.build=function(polygons){var _this=this;return returning(this,(function(){var poly,polys,side,sides,_i,_len,_results;for(sides={front:[],back:[]},null==_this.divider&&(_this.divider=polygons[0].clone()),_i=0,_len=polygons.length;_i<_len;_i++)poly=polygons[_i],_this.divider.subdivide(poly,_this.polygons,_this.polygons,sides.front,sides.back);for(side in _results=[],sides)__hasProp.call(sides,side)&&((polys=sides[side]).length?(null==_this[side]&&(_this[side]=new ThreeBSP.Node),_results.push(_this[side].build(polys))):_results.push(void 0));return _results}))},Node.prototype.isConvex=function(polys){var inner,outer,_i,_j,_len,_len1;for(_i=0,_len=polys.length;_i<_len;_i++)for(inner=polys[_i],_j=0,_len1=polys.length;_j<_len1;_j++)if(inner!==(outer=polys[_j])&&2!==outer.classifySide(inner))return!1;return!0},Node.prototype.allPolygons=function(){var _ref,_ref1;return this.polygons.slice().concat((null==(_ref1=this.front)?void 0:_ref1.allPolygons())||[]).concat((null==(_ref=this.back)?void 0:_ref.allPolygons())||[])},Node.prototype.invert=function(){var _this=this;return returning(this,(function(){var flipper,_i,_j,_len,_len1,_ref,_ref1,_ref2;for(_i=0,_len=(_ref=_this.polygons).length;_i<_len;_i++)_ref[_i].invert();for(_j=0,_len1=(_ref1=[_this.divider,_this.front,_this.back]).length;_j<_len1;_j++)null!=(flipper=_ref1[_j])&&flipper.invert();return _ref2=[_this.back,_this.front],_this.front=_ref2[0],_this.back=_ref2[1],_ref2}))},Node.prototype.clipPolygons=function(polygons){var back,front,poly,_i,_len;if(!this.divider)return polygons.slice();for(front=[],back=[],_i=0,_len=polygons.length;_i<_len;_i++)poly=polygons[_i],this.divider.subdivide(poly,front,back,front,back);return this.front&&(front=this.front.clipPolygons(front)),this.back&&(back=this.back.clipPolygons(back)),front.concat(this.back?back:[])},Node.prototype.clipTo=function(node){var _this=this;return returning(this,(function(){var _ref,_ref1;return _this.polygons=node.clipPolygons(_this.polygons),null!=(_ref=_this.front)&&_ref.clipTo(node),null==(_ref1=_this.back)?void 0:_ref1.clipTo(node)}))},Node}()}).call(void 0);__webpack_exports__.default=function(){var VIEWPORT_W=window.innerWidth,VIEWPORT_H=window.innerHeight,scene=new three_module.Scene,camera=new three_module.PerspectiveCamera(45,VIEWPORT_W/VIEWPORT_H,.1,1e3);camera.position.x=0,camera.position.y=20,camera.position.z=20,camera.lookAt(new three_module.Vector3(0,0,0));var renderer=new three_module.WebGLRenderer;renderer.setClearColor(new three_module.Color(10066329)),renderer.setSize(VIEWPORT_W,VIEWPORT_H),renderer.shadowMap.enabled=!0;var result,spinner,spotLight=new three_module.DirectionalLight(16777215);spotLight.position.set(-20,250,-50),spotLight.target.position.x=30,spotLight.target.position.y=-40,spotLight.target.position.z=-20,spotLight.intensity=.3;var redrawResult=function(){var target;target=document.getElementById("WebGL-output"),spinner=new Spinner({lines:13,length:20,width:10,radius:30,corners:1,rotate:0,direction:1,color:"#000",speed:1,trail:60,shadow:!1,hwaccel:!1,className:"spinner",zIndex:2e9,top:"50%",left:"50%"}).spin(target),setTimeout((function(){scene.remove(result);var resultBSP,sphere1BSP=new ThreeBSP(sphere1),sphere2BSP=new ThreeBSP(sphere2),cube2BSP=new ThreeBSP(cube);switch(controls.actionSphere){case"subtract":resultBSP=sphere1BSP.subtract(sphere2BSP);break;case"intersect":resultBSP=sphere1BSP.intersect(sphere2BSP);break;case"union":resultBSP=sphere1BSP.union(sphere2BSP)}switch(resultBSP||(resultBSP=sphere1BSP),controls.actionCube){case"subtract":resultBSP=resultBSP.subtract(cube2BSP);break;case"intersect":resultBSP=resultBSP.intersect(cube2BSP);break;case"union":resultBSP=resultBSP.union(cube2BSP)}"none"!==controls.actionCube&&"none"!==controls.actionSphere&&((result=resultBSP.toMesh()).geometry.computeFaceNormals(),result.geometry.computeVertexNormals(),scene.add(result)),function(spinner){spinner.stop()}(spinner)}),200)},createMesh=function(geom){(new three_module.MeshNormalMaterial).side=three_module.DoubleSide;var wireFrameMat=new three_module.MeshBasicMaterial({opacity:.5,wireframeLinewidth:.5});return wireFrameMat.wireframe=!0,new three_module.Mesh(geom,wireFrameMat)},sphere1=createMesh(new three_module.SphereGeometry(5,20,30));sphere1.position.x=-2;var sphere2=createMesh(new three_module.SphereGeometry(5,20,30));sphere2.position.set(3,0,0);var cube=createMesh(new three_module.BoxGeometry(5,5,5));cube.position.x=-7,scene.add(sphere1),scene.add(sphere2),scene.add(cube),document.getElementById("WebGL-output").appendChild(renderer.domElement);var statsObj,stats=((statsObj=new stats_min).showPanel(0),statsObj.dom.style.position="absolute",statsObj.dom.style.left="0px",statsObj.dom.style.top="0px",document.getElementById("Stats-output").appendChild(statsObj.dom),statsObj),controls={sphere1PosX:sphere1.position.x,sphere1PosY:sphere1.position.y,sphere1PosZ:sphere1.position.z,sphere1Scale:1,sphere2PosX:sphere2.position.x,sphere2PosY:sphere2.position.y,sphere2PosZ:sphere2.position.z,sphere2Scale:1,cubePosX:cube.position.x,cubePosY:cube.position.y,cubePosZ:cube.position.z,scaleX:1,scaleY:1,scaleZ:1,actionCube:"subtract",actionSphere:"subtract",showResult:function(){redrawResult()},hideWireframes:!1,rotateResult:!1},gui=new dat_gui_module.a,guiSphere1=gui.addFolder("Sphere1");guiSphere1.add(controls,"sphere1PosX",-15,15).onChange((function(){sphere1.position.set(controls.sphere1PosX,controls.sphere1PosY,controls.sphere1PosZ)})),guiSphere1.add(controls,"sphere1PosY",-15,15).onChange((function(){sphere1.position.set(controls.sphere1PosX,controls.sphere1PosY,controls.sphere1PosZ)})),guiSphere1.add(controls,"sphere1PosZ",-15,15).onChange((function(){sphere1.position.set(controls.sphere1PosX,controls.sphere1PosY,controls.sphere1PosZ)})),guiSphere1.add(controls,"sphere1Scale",0,10).onChange((function(e){sphere1.scale.set(e,e,e)}));var guiSphere2=gui.addFolder("Sphere2");guiSphere2.add(controls,"sphere2PosX",-15,15).onChange((function(){sphere2.position.set(controls.sphere2PosX,controls.sphere2PosY,controls.sphere2PosZ)})),guiSphere2.add(controls,"sphere2PosY",-15,15).onChange((function(){sphere2.position.set(controls.sphere2PosX,controls.sphere2PosY,controls.sphere2PosZ)})),guiSphere2.add(controls,"sphere2PosZ",-15,15).onChange((function(){sphere2.position.set(controls.sphere2PosX,controls.sphere2PosY,controls.sphere2PosZ)})),guiSphere2.add(controls,"sphere2Scale",0,10).onChange((function(e){sphere2.scale.set(e,e,e)})),guiSphere2.add(controls,"actionSphere",["subtract","intersect","union","none"]);var guiCube=gui.addFolder("cube");guiCube.add(controls,"cubePosX",-15,15).onChange((function(){cube.position.set(controls.cubePosX,controls.cubePosY,controls.cubePosZ)})),guiCube.add(controls,"cubePosY",-15,15).onChange((function(){cube.position.set(controls.cubePosX,controls.cubePosY,controls.cubePosZ)})),guiCube.add(controls,"cubePosZ",-15,15).onChange((function(){cube.position.set(controls.cubePosX,controls.cubePosY,controls.cubePosZ)})),guiCube.add(controls,"scaleX",0,10).onChange((function(e){cube.scale.x=e})),guiCube.add(controls,"scaleY",0,10).onChange((function(e){cube.scale.y=e})),guiCube.add(controls,"scaleZ",0,10).onChange((function(e){cube.scale.z=e})),guiCube.add(controls,"actionCube",["subtract","intersect","union","none"]),gui.add(controls,"showResult"),gui.add(controls,"rotateResult"),gui.add(controls,"hideWireframes").onChange((function(){controls.hideWireframes?(sphere1.material.visible=!1,sphere2.material.visible=!1,cube.material.visible=!1):(sphere1.material.visible=!0,sphere2.material.visible=!0,cube.material.visible=!0)})),window.addEventListener("resize",(function(){camera.aspect=window.innerWidth/window.innerHeight,camera.updateProjectionMatrix(),renderer.setSize(window.innerWidth,window.innerHeight)}),!1);var renderScene=function(){stats.update(),controls.rotateResult&&result&&(result.rotation.y+=.04,result.rotation.z-=.005),requestAnimationFrame(renderScene),renderer.render(scene,camera)};renderScene()}},683:function(module,exports,__webpack_require__){var f;module.exports=((f=function(){function e(a){return c.appendChild(a.dom),a}function u(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",c.addEventListener("click",(function(a){a.preventDefault(),u(++l%c.children.length)}),!1);var k=(performance||Date).now(),g=k,a=0,r=e(new f.Panel("FPS","#0ff","#002")),h=e(new f.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var t=e(new f.Panel("MB","#f08","#201"));return u(0),{REVISION:16,dom:c,addPanel:e,showPanel:u,begin:function(){k=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();if(h.update(c-k,200),c>g+1e3&&(r.update(1e3*a/(c-g),100),g=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){k=this.end()},domElement:c,setMode:u}}).Panel=function(e,f,l){var c=1/0,k=0,g=Math.round,a=g(window.devicePixelRatio||1),r=80*a,h=48*a,t=3*a,v=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r,q.height=h,q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");return b.font="bold "+9*a+"px Helvetica,Arial,sans-serif",b.textBaseline="top",b.fillStyle=l,b.fillRect(0,0,r,h),b.fillStyle=f,b.fillText(e,t,v),b.fillRect(d,m,n,p),b.fillStyle=l,b.globalAlpha=.9,b.fillRect(d,m,n,p),{dom:q,update:function(h,w){c=Math.min(c,h),k=Math.max(k,h),b.fillStyle=l,b.globalAlpha=1,b.fillRect(0,0,r,m),b.fillStyle=f,b.fillText(g(h)+" "+e+" ("+g(c)+"-"+g(k)+")",t,v),b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p),b.fillRect(d+n-a,m,a,p),b.fillStyle=l,b.globalAlpha=.9,b.fillRect(d+n-a,m,a,g((1-h/w)*p))}}},f)},697:function(module,exports,__webpack_require__){"use strict";var $=__webpack_require__(0),isArray=__webpack_require__(58),nativeReverse=[].reverse,test=[1,2];$({target:"Array",proto:!0,forced:String(test)===String(test.reverse())},{reverse:function reverse(){return isArray(this)&&(this.length=this.length),nativeReverse.call(this)}})},698:function(module,exports,__webpack_require__){"use strict";var $=__webpack_require__(0),createHTML=__webpack_require__(258);$({target:"String",proto:!0,forced:__webpack_require__(259)("sub")},{sub:function sub(){return createHTML(this,"sub","","")}})}}]);
//# sourceMappingURL=10.3351f99d1a80c478576d.bundle.js.map
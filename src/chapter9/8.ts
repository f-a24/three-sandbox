// import * as THREE from 'three';
// import * as Stats from 'stats.js';
// import * as dat from 'dat.gui';
// import { LegacyJSONLoader } from '../../node_modules/three/examples/jsm/loaders/deprecated/LegacyJSONLoader';
// LegacyJSONLoaderはr111で削除
//　https://github.com/mrdoob/three.js/pull/18625
// [TODO] 代替案を探してみる
// THREE.ObjectLoaderを使うっぽい

export default () => {
  alert(`LegacyJSONLoaderはr111で削除
  https://github.com/mrdoob/three.js/pull/18625
  `);
  // // 画面サイズ
  // const VIEWPORT_W = window.innerWidth;
  // const VIEWPORT_H = window.innerHeight;

  // /* scene */
  // const scene = new THREE.Scene();

  // /* camera */
  // const camera = new THREE.PerspectiveCamera(
  //   45,
  //   VIEWPORT_W / VIEWPORT_H,
  //   0.1,
  //   2000
  // );
  // camera.position.x = 250;
  // camera.position.y = 250;
  // camera.position.z = 350;
  // camera.lookAt(new THREE.Vector3(100, 50, 0));

  // /* renderer */
  // const renderer = new THREE.WebGLRenderer();
  // renderer.setClearColor(new THREE.Color(0xeeeeee));
  // renderer.setSize(VIEWPORT_W, VIEWPORT_H);
  // renderer.shadowMap.enabled = true;

  // // spotlight
  // const spotLight = new THREE.DirectionalLight(0xffffff);
  // spotLight.position.set(300, 200, 300);
  // spotLight.intensity = 1;
  // scene.add(spotLight);

  // document.getElementById('WebGL-output').appendChild(renderer.domElement);

  // let mixer: THREE.AnimationMixer;
  // let mesh: THREE.Mesh;
  // const frames = [] as THREE.Mesh[];
  // let currentMesh: THREE.Mesh;
  // const clock = new THREE.Clock();

  // const manager = new THREE.LoadingManager();
  // const loader = new LegacyJSONLoader(manager);
  // loader.load('./assets/horse.js', geometry => {
  //   geometry.computeVertexNormals();
  //   const mat = new THREE.MeshLambertMaterial({
  //     morphTargets: true
  //   });
  //   const mat2 = new THREE.MeshLambertMaterial({
  //     color: 0xffffff
  //   });
  //   mesh = new THREE.Mesh(geometry, mat);
  //   mesh.position.x = 200;
  //   scene.add(mesh);
  //   currentMesh = mesh.clone();
  //   currentMesh.position.x = -100;
  //   frames.push(currentMesh);
  //   (mesh.geometry as THREE.Geometry).morphTargets.forEach(e => {
  //     const geom = new THREE.Geometry();
  //     geom.vertices = e.vertices;
  //     geom.faces = geometry.faces;
  //     const morpMesh = new THREE.Mesh(geom, mat2);
  //     frames.push(morpMesh);
  //     morpMesh.position.x = -100;
  //   });
  //   mixer = new THREE.AnimationMixer(mesh);
  //   const clip = THREE.AnimationClip.CreateFromMorphTargetSequence(
  //     'gallop',
  //     geometry.morphTargets,
  //     30,
  //     false
  //   );
  //   const action = mixer.clipAction(clip);
  //   action.setDuration(1).play();
  //   showFrame(0);
  // });

  // const showFrame = (e: number) => {
  //   scene.remove(currentMesh);
  //   scene.add(frames[e]);
  //   currentMesh = frames[e];
  // };

  // const controls = {
  //   keyframe: 0
  // };

  // const gui = new dat.GUI();
  // gui
  //   .add(controls, 'keyframe', 0, 15)
  //   .step(1)
  //   .onChange((e: number) => {
  //     showFrame(e);
  //   });

  // /* stats */
  // const initStats = () => {
  //   const statsObj = new Stats();
  //   statsObj.showPanel(0);
  //   statsObj.dom.style.position = 'absolute';
  //   statsObj.dom.style.left = '0px';
  //   statsObj.dom.style.top = '0px';
  //   document.getElementById('Stats-output').appendChild(statsObj.dom);
  //   return statsObj;
  // };
  // const stats = initStats();

  // /* resize */
  // window.addEventListener(
  //   'resize',
  //   () => {
  //     camera.aspect = window.innerWidth / window.innerHeight;
  //     camera.updateProjectionMatrix();
  //     renderer.setSize(window.innerWidth, window.innerHeight);
  //   },
  //   false
  // );

  // /* render */
  // const renderScene = () => {
  //   stats.update();
  //   const delta = clock.getDelta();
  //   renderer.clear();
  //   if (mixer) {
  //     mixer.update(delta);
  //     mesh.rotation.y += 0.01;
  //   }
  //   requestAnimationFrame(renderScene);
  //   renderer.render(scene, camera);
  // };
  // renderScene();
};

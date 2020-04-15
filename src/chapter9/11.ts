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
  //   window.innerWidth / window.innerHeight,
  //   0.1,
  //   1000
  // );
  // camera.position.x = 0;
  // camera.position.y = 0;
  // camera.position.z = 4;
  // camera.lookAt(new THREE.Vector3(0, 0, 0));

  // /* renderer */
  // const renderer = new THREE.WebGLRenderer();
  // renderer.setClearColor(new THREE.Color(0xeeeeee));
  // renderer.setSize(VIEWPORT_W, VIEWPORT_H);
  // renderer.shadowMap.enabled = true;

  // const spotLight = new THREE.SpotLight(0xffffff);
  // spotLight.position.set(0, 50, 30);
  // spotLight.intensity = 2;
  // scene.add(spotLight);

  // document.getElementById('WebGL-output').appendChild(renderer.domElement);

  // let helper: THREE.SkeletonHelper;
  // let mixer: THREE.AnimationMixer;
  // let bonesClip: THREE.AnimationClip;

  // const manager = new THREE.LoadingManager();
  // const loader = new LegacyJSONLoader(manager);
  // loader.load('./assets/hand-2.js', (geometry, materials) => {
  //   const mat = new THREE.MeshLambertMaterial({
  //     color: 0xf0c8c9,
  //     skinning: true
  //   });
  //   const mesh = new THREE.SkinnedMesh(
  //     new THREE.BufferGeometry().fromGeometry(geometry),
  //     materials
  //   );
  //   mesh.rotation.x = 0.5 * Math.PI;
  //   mesh.rotation.z = 0.7 * Math.PI;
  //   scene.add(mesh);
  //   helper = new THREE.SkeletonHelper(mesh);
  //   helper.visible = false;
  //   scene.add(helper);

  //   mixer = new THREE.AnimationMixer(mesh);
  //   bonesClip = geometry.animations[0];
  //   const action = mixer.clipAction(bonesClip);
  //   action.play();
  // });

  // const controls = {
  //   showHelper: false
  // };
  // const gui = new dat.GUI();
  // gui.add(controls, 'showHelper', 0, 0.5).onChange((state: boolean) => {
  //   helper.visible = state;
  // });
  // const clock = new THREE.Clock();

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
  //   if (mixer) {
  //     mixer.update(delta);
  //     helper.update();
  //   }

  //   requestAnimationFrame(renderScene);
  //   renderer.render(scene, camera);
  // };
  // renderScene();
};

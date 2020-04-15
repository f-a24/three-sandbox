// import * as THREE from 'three';
// import * as Stats from 'stats.js';
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
  //   1000
  // );
  // camera.position.x = -30;
  // camera.position.y = 40;
  // camera.position.z = 50;
  // camera.lookAt(new THREE.Vector3(0, 10, 0));

  // /* renderer */
  // const renderer = new THREE.WebGLRenderer();
  // renderer.setClearColor(new THREE.Color(0xeeeeee));
  // renderer.setSize(VIEWPORT_W, VIEWPORT_H);
  // renderer.shadowMap.enabled = true;

  // // spotlight
  // const spotLight = new THREE.SpotLight(0xffffff);
  // spotLight.position.set(0, 50, 30);
  // spotLight.intensity = 2;
  // scene.add(spotLight);

  // document.getElementById('WebGL-output').appendChild(renderer.domElement);

  // let mesh: THREE.Mesh;
  // //   const loader = new THREE.JSONLoader();
  // const loader = new LegacyJSONLoader();
  // loader.load('./assets/misc_chair01.js', (geometry, materials) => {
  //   mesh = new THREE.Mesh(geometry, materials);
  //   mesh.scale.x = 15;
  //   mesh.scale.y = 15;
  //   mesh.scale.z = 15;
  //   scene.add(mesh);
  // });

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

  //   if (mesh) {
  //     mesh.rotation.y += 0.02;
  //   }

  //   requestAnimationFrame(renderScene);
  //   renderer.render(scene, camera);
  // };
  // renderScene();
};

// import * as THREE from 'three';
// import * as Stats from 'stats.js';
// import * as dat from 'dat.gui';
// import { LegacyJSONLoader } from '../../node_modules/three/examples/jsm/loaders/deprecated/LegacyJSONLoader';
// import { TWEEN } from '../../node_modules/three/examples/jsm/libs/tween.module.min.js';
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

  // let mesh: THREE.SkinnedMesh;
  // const tween = new TWEEN.Tween({ pos: -1 })
  //   .to({ pos: 0 }, 3000)
  //   .easing(TWEEN.Easing.Cubic.InOut)
  //   .yoyo(true)
  //   .repeat(Infinity)
  //   .onUpdate(({ pos }: { pos: number }) => {
  //     mesh.skeleton.bones[5].rotation.set(0, 0, pos);
  //     mesh.skeleton.bones[6].rotation.set(0, 0, pos);
  //     mesh.skeleton.bones[10].rotation.set(0, 0, pos);
  //     mesh.skeleton.bones[11].rotation.set(0, 0, pos);
  //     mesh.skeleton.bones[15].rotation.set(0, 0, pos);
  //     mesh.skeleton.bones[16].rotation.set(0, 0, pos);
  //     mesh.skeleton.bones[20].rotation.set(0, 0, pos);
  //     mesh.skeleton.bones[21].rotation.set(0, 0, pos);
  //     mesh.skeleton.bones[1].rotation.set(pos, 0, 0);
  //   });

  // const manager = new THREE.LoadingManager();
  // const loader = new LegacyJSONLoader(manager);
  // loader.load('./assets/hand-1.js', (geometry, materials) => {
  //   mesh = new THREE.SkinnedMesh(
  //     new THREE.BufferGeometry().fromGeometry(geometry),
  //     materials
  //   );
  //   const bones: THREE.Bone[] = [];
  //   geometry.bones.forEach((bone: any) => {
  //     const newBone = new THREE.Bone();
  //     newBone.position.set(bone.pos[0], bone.pos[1], bone.pos[2]);
  //     bones.push(newBone);
  //   });
  //   const skeleton = new THREE.Skeleton(bones);
  //   mesh.add(skeleton.bones[0]);
  //   mesh.bind(skeleton);
  //   mesh.rotation.x = 0.5 * Math.PI;
  //   mesh.rotation.z = 0.7 * Math.PI;
  //   scene.add(mesh);
  //   tween.start();
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
  //   TWEEN.update();

  //   requestAnimationFrame(renderScene);
  //   renderer.render(scene, camera);
  // };
  // renderScene();
};

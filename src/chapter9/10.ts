import * as THREE from 'three';
import * as Stats from 'stats.js';
import { LegacyJSONLoader } from '../../node_modules/three/examples/jsm/loaders/deprecated/LegacyJSONLoader';
import { TWEEN } from '../../node_modules/three/examples/jsm/libs/tween.module.min.js';

export default () => {
  // 画面サイズ
  const VIEWPORT_W = window.innerWidth;
  const VIEWPORT_H = window.innerHeight;

  /* scene */
  const scene = new THREE.Scene();

  /* camera */
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 4;
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  /* renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xeeeeee));
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);
  renderer.shadowMap.enabled = true;

  const planeGeometry = new THREE.PlaneGeometry(20, 20, 1, 1);
  const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);

  plane.rotation.x = -0.5 * Math.PI;
  plane.position.y = 0;
  plane.position.z = 0;
  scene.add(plane);

  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(0, 50, 30);
  spotLight.intensity = 2;
  scene.add(spotLight);

  document.getElementById('WebGL-output').appendChild(renderer.domElement);

  let mesh: THREE.SkinnedMesh;

  const onUpdate = function() {
    const { pos } = this;
    mesh.skeleton.bones[5].rotation.set(0, 0, pos);
    mesh.skeleton.bones[6].rotation.set(0, 0, pos);
    mesh.skeleton.bones[10].rotation.set(0, 0, pos);
    mesh.skeleton.bones[11].rotation.set(0, 0, pos);
    mesh.skeleton.bones[15].rotation.set(0, 0, pos);
    mesh.skeleton.bones[16].rotation.set(0, 0, pos);
    mesh.skeleton.bones[20].rotation.set(0, 0, pos);
    mesh.skeleton.bones[21].rotation.set(0, 0, pos);
    mesh.skeleton.bones[1].rotation.set(pos, 0, 0);
  };

  const tween = new TWEEN.Tween({ pos: -1 })
    .to({ pos: 0 }, 3000)
    .easing(TWEEN.Easing.Cubic.InOut)
    .yoyo(true)
    .repeat(Infinity)
    .onUpdate(onUpdate);

  const manager = new THREE.LoadingManager();
  const loader = new LegacyJSONLoader(manager);
  loader.load('./assets/hand-1.js', geometry => {
    const mat = new THREE.MeshLambertMaterial({
      color: 0xf0c8c9,
      skinning: true
    });
    mesh = new THREE.SkinnedMesh(
      new THREE.BufferGeometry().fromGeometry(geometry),
      mat
    );
    console.log(mesh);
    mesh.rotation.x = 0.5 * Math.PI;
    mesh.rotation.z = 0.7 * Math.PI;
    scene.add(mesh);
    tween.start();
  });

  /* stats */
  const initStats = () => {
    const statsObj = new Stats();
    statsObj.showPanel(0);
    statsObj.dom.style.position = 'absolute';
    statsObj.dom.style.left = '0px';
    statsObj.dom.style.top = '0px';
    document.getElementById('Stats-output').appendChild(statsObj.dom);
    return statsObj;
  };
  const stats = initStats();

  /* resize */
  window.addEventListener(
    'resize',
    () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    },
    false
  );

  /* render */
  const renderScene = () => {
    stats.update();
    TWEEN.update();

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  };
  renderScene();
};

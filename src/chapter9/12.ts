import * as THREE from 'three';
import * as Stats from 'stats.js';
import { ColladaLoader } from '../../node_modules/three/examples/jsm/loaders/ColladaLoader';

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
  camera.position.x = 400;
  camera.position.y = 50;
  camera.position.z = 150;
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  /* renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xeeeeee));
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);
  renderer.shadowMap.enabled = true;

  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(300, 500, 100);
  spotLight.intensity = 3;
  scene.add(spotLight);

  document.getElementById('WebGL-output').appendChild(renderer.domElement);

  let mixer: THREE.AnimationMixer;
  const loader = new ColladaLoader();
  loader.load('./assets/monster.dae', collada => {
    const child = collada.scene;
    scene.add(child);

    mixer = new THREE.AnimationMixer(child);
    mixer.clipAction(collada.animations[0]).play();

    child.scale.set(0.15, 0.15, 0.15);
    child.rotation.x = -0.5 * Math.PI;
    child.position.x = -100;
    child.position.y = -60;
  });

  const clock = new THREE.Clock();

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
    const delta = clock.getDelta();
    if (mixer) {
      mixer.update(delta);
    }

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  };
  renderScene();
};

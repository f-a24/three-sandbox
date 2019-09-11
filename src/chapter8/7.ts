import * as THREE from 'three';
import * as Stats from 'stats.js';
import { ColladaLoader } from '../../node_modules/three/examples/js/loaders/ColladaLoader';

export default () => {
  // 画面サイズ
  const VIEWPORT_W = window.innerWidth;
  const VIEWPORT_H = window.innerHeight;

  /* scene */
  const scene = new THREE.Scene();

  /* camera */
  const camera = new THREE.PerspectiveCamera(
    45,
    VIEWPORT_W / VIEWPORT_H,
    0.1,
    1000
  );
  camera.position.x = 150;
  camera.position.y = 150;
  camera.position.z = 150;
  camera.lookAt(new THREE.Vector3(0, 20, 0));

  /* renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xcccccc));
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);
  renderer.shadowMap.enabled = true;

  // spotlight
  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(150, 150, 150);
  spotLight.intensity = 2;
  scene.add(spotLight);

  document.getElementById('WebGL-output').appendChild(renderer.domElement);

  const loader = new ColladaLoader();
  let mesh: THREE.Mesh;
  loader.load('./assets/Truck_dae.dae', result => {
    mesh = result.scene.children[0].children[0].clone();
    mesh.scale.set(4, 4, 4);
    scene.add(mesh);
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

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  };
  renderScene();
};

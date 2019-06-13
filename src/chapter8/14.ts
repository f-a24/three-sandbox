import * as THREE from 'three';
import * as Stats from 'stats.js';
import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls';
import 'imports-loader?THREE=three!../../node_modules/three/examples/js/loaders/AssimpJSONLoader.js';

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
  camera.position.x = 30;
  camera.position.y = 30;
  camera.position.z = 30;
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  const orbit = new OrbitControls(camera);

  const dir1 = new THREE.DirectionalLight();
  dir1.position.set(-30, 30, -30);
  scene.add(dir1);

  const dir2 = new THREE.DirectionalLight();
  dir2.position.set(-30, 30, 30);
  scene.add(dir2);

  const dir3 = new THREE.DirectionalLight();
  dir3.position.set(30, 30, -30);
  scene.add(dir3);

  // spotlight
  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(30, 30, 30);
  scene.add(spotLight);

  /* renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);
  renderer.shadowMap.enabled = true;

  document.getElementById('WebGL-output').appendChild(renderer.domElement);

  const loader = new (THREE as any).AssimpJSONLoader();
  let group = new THREE.Object3D();
  loader.load('./assets/spider.obj.assimp.json', (model: THREE.Object3D) => {
    model.scale.set(0.1, 0.1, 0.1);
    scene.add(model);
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

    orbit.update();

    if (group) {
      group.rotation.y += 0.006;
    }

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  };
  renderScene();
};

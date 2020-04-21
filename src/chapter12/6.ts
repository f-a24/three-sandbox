import * as THREE from 'three';
import * as Stats from 'stats.js';
import { FirstPersonControls } from '../../node_modules/three/examples/jsm/controls/FirstPersonControls';

export default () => {
  // 画面サイズ
  const VIEWPORT_W = window.innerWidth;
  const VIEWPORT_H = window.innerHeight;

  const clock = new THREE.Clock();

  /* scene */
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000000, 0.0035);

  /* camera */
  const camera = new THREE.PerspectiveCamera(
    50,
    VIEWPORT_W / VIEWPORT_H,
    1,
    10000
  );
  camera.position.set(-200, 25, 0);
  scene.add(camera);

  const listener1 = new THREE.AudioListener();
  camera.add(listener1);
  const listener2 = new THREE.AudioListener();
  camera.add(listener2);
  const listener3 = new THREE.AudioListener();
  camera.add(listener3);

  const controls = new FirstPersonControls(camera);
  controls.movementSpeed = 70;
  controls.lookSpeed = 0.15;
  controls.lookVertical = false;

  /* renderer */
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);

  const light = new THREE.DirectionalLight(0xffffff);
  light.position.set(0, 0.5, 1).normalize();
  scene.add(light);

  document.getElementById('WebGL-output').appendChild(renderer.domElement);

  const cube = new THREE.BoxGeometry(40, 40, 40);
  const textureLoader = new THREE.TextureLoader();
  const material1 = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    map: textureLoader.load('./assets/tex/cow.png'),
  });
  const material_2 = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    map: textureLoader.load('./assets/tex/dog.jpg'),
  });
  const material_3 = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    map: textureLoader.load('./assets/tex/cat.jpg'),
  });

  const mesh1 = new THREE.Mesh(cube, material1);
  mesh1.position.set(0, 20, 100);

  const mesh2 = new THREE.Mesh(cube, material_2);
  mesh2.position.set(0, 20, 0);

  const mesh3 = new THREE.Mesh(cube, material_3);
  mesh3.position.set(0, 20, -100);

  scene.add(mesh1);
  scene.add(mesh2);
  scene.add(mesh3);

  const consoleXHR = (xhr: ProgressEvent<EventTarget>) => {
    console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
  };
  const consoleErr = () => {
    console.log('An error happened');
  };

  const audioLoader = new THREE.AudioLoader();
  const sound1 = new THREE.PositionalAudio(listener1);
  audioLoader.load(
    './assets/cow.ogg',
    (audioBuffer) => {
      sound1.autoplay = true;
      sound1.setBuffer(audioBuffer);
      sound1.setRefDistance(20);
      sound1.setLoop(true);
      sound1.setRolloffFactor(2);
      sound1.play();
      mesh1.add(sound1);
    },
    consoleXHR,
    consoleErr
  );

  const sound2 = new THREE.PositionalAudio(listener2);
  audioLoader.load(
    './assets/dog.ogg',
    (audioBuffer) => {
      sound2.autoplay = true;
      sound2.setBuffer(audioBuffer);
      sound2.setRefDistance(20);
      sound2.setLoop(true);
      sound2.setRolloffFactor(2);
      sound2.play();
      mesh2.add(sound2);
    },
    consoleXHR,
    consoleErr
  );

  const sound3 = new THREE.PositionalAudio(listener3);
  audioLoader.load(
    './assets/cat.ogg',
    (audioBuffer) => {
      sound3.setBuffer(audioBuffer);
      sound3.setRefDistance(20);
      sound3.setLoop(true);
      sound3.setRolloffFactor(2);
      sound3.play();
      mesh3.add(sound3);
    },
    consoleXHR,
    consoleErr
  );

  const helper = new THREE.GridHelper(500, 10, 0x444444, 0x444444);
  helper.position.y = 0.1;
  scene.add(helper);

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
    controls.update(delta);

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  };
  renderScene();
};

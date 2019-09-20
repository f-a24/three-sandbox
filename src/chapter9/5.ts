import * as THREE from 'three';
import * as Stats from 'stats.js';
import * as chroma from 'chroma-js';
import { OBJLoader } from '../../node_modules/three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from '../../node_modules/three/examples/jsm/loaders/MTLLoader';
import { FlyControls } from '../../node_modules/three/examples/jsm/controls/FlyControls';

export default () => {
  // 画面サイズ
  const VIEWPORT_W = window.innerWidth;
  const VIEWPORT_H = window.innerHeight;

  const clock = new THREE.Clock();

  /* scene */
  const scene = new THREE.Scene();

  /* camera */
  const camera = new THREE.PerspectiveCamera(
    45,
    VIEWPORT_W / VIEWPORT_H,
    0.1,
    1000
  );
  camera.position.x = 100;
  camera.position.y = 100;
  camera.position.z = 300;
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  /* renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);
  renderer.shadowMap.enabled = true;

  /* flyControls */
  const flyControls = new FlyControls(camera);
  flyControls.movementSpeed = 25;
  flyControls.domElement = document.querySelector(
    '#WebGL-output'
  ) as HTMLElement;
  flyControls.rollSpeed = Math.PI / 24;
  flyControls.autoForward = true;
  flyControls.dragToLook = false;

  // ambientLight
  const ambientLight = new THREE.AmbientLight(0x383838);
  scene.add(ambientLight);

  // spotlight
  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(100, 140, 130);
  spotLight.intensity = 2;
  scene.add(spotLight);

  document.getElementById('WebGL-output').appendChild(renderer.domElement);

  const setRandomColors = (
    object: THREE.Group | THREE.Mesh,
    scale: chroma.Scale<chroma.Color>
  ) => {
    const { children } = object;
    if (children && children.length > 0) {
      children.forEach((e: THREE.Mesh) => {
        setRandomColors(e, scale);
      });
    } else if (object instanceof THREE.Mesh) {
      _setRandomColors(object.material, scale);
    }
  };

  const _setRandomColors = (
    material: THREE.MultiMaterial | any,
    scale: chroma.Scale<chroma.Color>
  ) => {
    if (material instanceof THREE.MultiMaterial) {
      material.materials.forEach(mat => {
        _setRandomColors(mat, scale);
      });
    } else {
      material.color = new THREE.Color(scale(Math.random()).hex());
      if (material.name && material.name.indexOf('building') == 0) {
        material.emissive = new THREE.Color(0x444444);
        material.transparent = true;
        material.opacity = 0.8;
      }
    }
  };

  let mesh: THREE.Group;
  const load = (object: THREE.Group) => {
    const scale = chroma.scale(['red', 'green', 'blue']);
    setRandomColors(object, scale);
    mesh = object;
    scene.add(mesh);
  };

  const textureLoader = new THREE.TextureLoader();
  textureLoader.load('./assets/tex/metro01.jpg');
  const mtlLoader = new MTLLoader();
  // mtlLoader.setBaseUrl("./assets/models/"); // ← 型定義から削除する必要あり
  mtlLoader.load('./assets/city.mtl', materials => {
    materials.preload();
    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('./assets/city.obj', load);
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
    const delta = clock.getDelta();
    flyControls.update(delta);
    renderer.clear();
    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  };
  renderScene();
};

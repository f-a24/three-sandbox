import * as THREE from 'three';
import * as Stats from 'stats.js';
import { SceneUtils } from '../../node_modules/three/examples/jsm/utils/SceneUtils';
import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls';

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
  camera.position.x = -20;
  camera.position.y = 30;
  camera.position.z = 40;
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  /* renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);
  renderer.shadowMap.enabled = true;

  /* orbitControls */
  const orbitControls = new OrbitControls(camera);
  orbitControls.autoRotate = true;

  // ambientLight
  const ambiLight = new THREE.AmbientLight(0x111111);
  scene.add(ambiLight);

  // spotlight
  const spotLight = new THREE.DirectionalLight(0xffffff);
  spotLight.position.set(-20, 30, 40);
  spotLight.intensity = 1.5;
  scene.add(spotLight);

  document.getElementById('WebGL-output').appendChild(renderer.domElement);

  const createMesh = (geom: THREE.SphereGeometry) => {
    const textureLoader = new THREE.TextureLoader();
    const planetTexture = textureLoader.load('./assets/tex/mars_1k_color.jpg');
    const normalTexture = textureLoader.load('./assets/tex/mars_1k_normal.jpg');
    const planetMaterial = new THREE.MeshPhongMaterial({
      map: planetTexture,
      bumpMap: normalTexture
    });
    const wireFrameMat = new THREE.MeshBasicMaterial();
    wireFrameMat.wireframe = true;
    const mesh = SceneUtils.createMultiMaterialObject(geom, [planetMaterial]);
    return mesh;
  };

  const sphere = createMesh(new THREE.SphereGeometry(20, 40, 40));
  scene.add(sphere);

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
    orbitControls.update();
    renderer.clear();
    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  };
  renderScene();
};

import * as THREE from 'three';
import * as Stats from 'stats.js';
import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls';
import { SceneUtils } from '../../node_modules/three/examples/jsm/utils/SceneUtils';

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
  camera.position.set(15, 15, 15);
  camera.lookAt(scene.position);

  const orbit = new OrbitControls(camera);
  orbit.autoRotate = false;

  const ambi = new THREE.AmbientLight(0x3300000);
  scene.add(ambi);

  const spotLight = new THREE.DirectionalLight(0xffffff);
  spotLight.position.set(350, 350, 150);
  spotLight.intensity = 0.4;
  scene.add(spotLight);

  /* renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xeeeeee));
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);

  document.getElementById('WebGL-output').appendChild(renderer.domElement);

  const createMesh = (geom: THREE.SphereGeometry) => {
    const textureLoader = new THREE.TextureLoader();
    const planetTexture = textureLoader.load('./assets/tex/Earth.png');
    const specularTexture = textureLoader.load('./assets/tex/EarthSpec.png');
    const normalTexture = textureLoader.load('./assets/tex/EarthNormal.png');
    const planetMaterial = new THREE.MeshPhongMaterial();
    planetMaterial.specularMap = specularTexture;
    planetMaterial.specular = new THREE.Color(0xff0000);
    planetMaterial.shininess = 2;
    planetMaterial.normalMap = normalTexture;
    return SceneUtils.createMultiMaterialObject(geom, [planetMaterial]);
  };

  const sphere = createMesh(new THREE.SphereGeometry(10, 40, 40));
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
    orbit.update();

    sphere.rotation.y += 0.005;

    requestAnimationFrame(renderScene);
  };
  renderScene();
};

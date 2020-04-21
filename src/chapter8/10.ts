import * as THREE from 'three';
import * as Stats from 'stats.js';
import { VTKLoader } from '../../node_modules/three/examples/jsm/loaders/VTKLoader';

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
  camera.position.x = 10;
  camera.position.y = 10;
  camera.position.z = 10;
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  /* renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);
  renderer.shadowMap.enabled = true;

  // spotlight
  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(20, 20, 20);
  scene.add(spotLight);

  document.getElementById('WebGL-output').appendChild(renderer.domElement);

  const loader = new VTKLoader();
  let group = new THREE.Object3D();
  loader.load('./assets/moai_fixed.vtk', (geometry) => {
    // geometry.computeFaceNormals();
    geometry.computeVertexNormals();
    const mat = new THREE.MeshLambertMaterial({ color: 0xaaffaa });
    group = new THREE.Mesh(geometry, mat);
    group.scale.set(9, 9, 9);
    scene.add(group);
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

    if (group) {
      group.rotation.y += 0.006;
    }

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  };
  renderScene();
};

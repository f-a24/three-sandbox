import * as THREE from 'three';
import * as Stats from 'stats.js';
import { OBJLoader } from '../../node_modules/three/examples/jsm/loaders/OBJLoader';

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
  camera.position.x = 130;
  camera.position.y = 40;
  camera.position.z = 50;
  camera.lookAt(scene.position);
  scene.add(camera);

  /* renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xaaaaff));
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);
  renderer.shadowMap.enabled = true;

  // spotlight
  const spotLight = new THREE.DirectionalLight(0xffffff);
  spotLight.position.set(30, 40, 50);
  spotLight.intensity = 1;
  scene.add(spotLight);

  document.getElementById('WebGL-output').appendChild(renderer.domElement);

  let mesh: THREE.Group;
  const loader = new OBJLoader();
  loader.load('./assets/pinecone.obj', (loadedMesh) => {
    const material = new THREE.MeshLambertMaterial({ color: 0x5c3a21 });
    loadedMesh.children.forEach((child: THREE.Mesh) => {
      child.material = material;
      (child.geometry as THREE.Geometry).computeFaceNormals();
      child.geometry.computeVertexNormals();
    });
    mesh = loadedMesh;
    loadedMesh.scale.set(100, 100, 100);
    loadedMesh.rotation.x = -0.3;
    scene.add(loadedMesh);
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

    if (mesh) {
      mesh.rotation.y += 0.006;
      mesh.rotation.x += 0.006;
    }

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  };
  renderScene();
};

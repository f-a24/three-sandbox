import * as THREE from 'three';
import * as Stats from 'stats.js';

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
  camera.position.x = -20;
  camera.position.y = 20;
  camera.position.z = 30;
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  /* renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xeeeeee));
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);
  renderer.shadowMap.enabled = true;

  const ambientLight = new THREE.AmbientLight(0xcccccc);
  scene.add(ambientLight);

  document.getElementById('WebGL-output').appendChild(renderer.domElement);

  const groundGeom = new THREE.PlaneGeometry(95, 95, 1, 1);
  const textureLoader = new THREE.TextureLoader();
  const lm = textureLoader.load('./assets/tex/lm-1.png');
  const wood = textureLoader.load('./assets/tex/floor-wood.jpg');
  const groundMaterial = new THREE.MeshStandardMaterial({
    color: 0x777777,
    lightMap: lm,
    map: wood,
  });
  groundGeom.faceVertexUvs[1] = groundGeom.faceVertexUvs[0];

  const groundMesh = new THREE.Mesh(groundGeom, groundMaterial);
  groundMesh.rotation.x = -Math.PI / 2;
  groundMesh.position.y = 0;
  scene.add(groundMesh);

  const cubeGeometry = new THREE.BoxGeometry(12, 12, 12);
  const cubeGeometry2 = new THREE.BoxGeometry(6, 6, 6);
  const meshMaterial = new THREE.MeshBasicMaterial();
  meshMaterial.map = textureLoader.load('./assets/tex/stone.jpg');

  const cube = new THREE.Mesh(cubeGeometry, meshMaterial);
  const cube2 = new THREE.Mesh(cubeGeometry2, meshMaterial);
  cube.position.set(0.9, 6, -12);
  cube2.position.set(-13.2, 3, -6);
  scene.add(cube);
  scene.add(cube2);

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

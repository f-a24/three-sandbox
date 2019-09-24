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
  camera.position.x = 0;
  camera.position.y = 12;
  camera.position.z = 28;
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  /* renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xeeeeee));
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);
  renderer.shadowMap.enabled = true;

  const ambiLight = new THREE.AmbientLight(0x141414);
  scene.add(ambiLight);

  const light = new THREE.DirectionalLight();
  light.position.set(0, 30, 20);
  scene.add(light);

  document.getElementById('WebGL-output').appendChild(renderer.domElement);

  const createMesh = (geom: THREE.Geometry, imageFile: string) => {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(`./assets/tex/${imageFile}`);
    const mat = new THREE.MeshPhongMaterial();
    mat.map = texture;
    const mesh = new THREE.Mesh(geom, mat);
    return mesh;
  };

  const polyhedron = createMesh(
    new THREE.IcosahedronGeometry(5, 0),
    'metal-rust.jpg'
  );
  polyhedron.position.x = 12;
  scene.add(polyhedron);

  const sphere = createMesh(
    new THREE.SphereGeometry(5, 20, 20),
    'floor-wood.jpg'
  );
  scene.add(sphere);

  const cube = createMesh(new THREE.BoxGeometry(5, 5, 5), 'brick-wall.jpg');
  cube.position.x = -12;
  scene.add(cube);

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

  let step = 0;

  /* render */
  const renderScene = () => {
    stats.update();

    polyhedron.rotation.y = step += 0.01;
    polyhedron.rotation.x = step;
    cube.rotation.y = step;
    cube.rotation.x = step;
    sphere.rotation.y = step;
    sphere.rotation.x = step;

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  };
  renderScene();
};

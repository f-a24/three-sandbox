import * as THREE from 'three';
import * as Stats from 'stats.js';
import * as dat from 'dat.gui';
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
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.x = 0;
  camera.position.y = 5;
  camera.position.z = 33;
  camera.lookAt(scene.position);

  const orbit = new OrbitControls(camera);

  /* renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xeeeeee));
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);

  document.getElementById('WebGL-output').appendChild(renderer.domElement);

  const createCubeMap = () => {
    const path = './assets/tex/';
    const format = '.jpg';
    const urls = [
      `${path}posx${format}`,
      `${path}negx${format}`,
      `${path}posy${format}`,
      `${path}negy${format}`,
      `${path}posz${format}`,
      `${path}negz${format}`
    ];
    const cubeTextureLoader = new THREE.CubeTextureLoader();
    const textureCube = cubeTextureLoader.load(urls);
    return textureCube;
  };

  const textureCube = createCubeMap();
  textureCube.format = THREE.RGBFormat;

  const shader = THREE.ShaderLib.cube;
  shader.uniforms.tCube.value = textureCube;
  const material = new THREE.ShaderMaterial({
    fragmentShader: shader.fragmentShader,
    vertexShader: shader.vertexShader,
    uniforms: shader.uniforms,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  const skybox = new THREE.Mesh(
    new THREE.BoxGeometry(10000, 10000, 10000),
    material
  );
  scene.add(skybox);

  const cubeCamera = new THREE.CubeCamera(0.1, 20000, 256);
  scene.add(cubeCamera);

  const sphereGeometry = new THREE.SphereGeometry(4, 15, 15);
  const boxGeometry = new THREE.BoxGeometry(5, 5, 5);
  const cylinderGeometry = new THREE.CylinderGeometry(2, 4, 10, 20, 20, false);
  const dynamicEnvMaterial = new THREE.MeshBasicMaterial({
    envMap: textureCube,
    side: THREE.DoubleSide
  });
  const envMaterial = new THREE.MeshBasicMaterial({
    envMap: textureCube,
    side: THREE.DoubleSide
  });

  const sphere = new THREE.Mesh(sphereGeometry, dynamicEnvMaterial);
  sphere.name = 'sphere';
  scene.add(sphere);

  const cylinder = new THREE.Mesh(cylinderGeometry, envMaterial);
  cylinder.name = 'cylinder';
  cylinder.position.set(10, 0, 0);
  scene.add(cylinder);

  const cube = new THREE.Mesh(boxGeometry, envMaterial);
  cube.name = 'cube';
  cube.position.set(-10, 0, 0);
  scene.add(cube);

  const controls = {
    rotationSpeed: 0.005
  };
  const gui = new dat.GUI();
  gui.add(controls, 'rotationSpeed', -0.1, 0.1);

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

    renderer.render(scene, camera);
    scene.getObjectByName('cube').rotation.x += controls.rotationSpeed;
    scene.getObjectByName('cube').rotation.y += controls.rotationSpeed;
    scene.getObjectByName('cylinder').rotation.x += controls.rotationSpeed;

    requestAnimationFrame(renderScene);
  };
  renderScene();
};

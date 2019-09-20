import * as THREE from 'three';
import * as Stats from 'stats.js';
import * as dat from 'dat.gui';

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
  camera.position.x = -15;
  camera.position.y = 15;
  camera.position.z = 15;
  camera.lookAt(scene.position);

  /* renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xeeeeee));
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);

  const planeGeometry = new THREE.PlaneGeometry(20, 20, 1, 1);
  const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);

  plane.rotation.x = -0.5 * Math.PI;
  plane.position.y = 0;
  plane.position.z = 0;
  scene.add(plane);

  const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  const cubeMaterial = new THREE.MeshLambertMaterial({
    morphTargets: true,
    color: 0xff0000
  });

  const cubeTarget1 = new THREE.BoxGeometry(2, 10, 2);
  const cubeTarget2 = new THREE.BoxGeometry(8, 2, 8);

  cubeGeometry.morphTargets[0] = { name: 't1', vertices: cubeTarget2.vertices };
  cubeGeometry.morphTargets[1] = { name: 't2', vertices: cubeTarget1.vertices };

  const cube = new THREE.Mesh(
    new THREE.BufferGeometry().fromGeometry(cubeGeometry),
    cubeMaterial
  );
  cube.position.x = 0;
  cube.position.y = 3;
  cube.position.z = 0;

  scene.add(cube);

  const ambientLight = new THREE.AmbientLight(0x0c0c0c);
  scene.add(ambientLight);

  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-25, 25, 15);
  scene.add(spotLight);

  document.getElementById('WebGL-output').appendChild(renderer.domElement);

  const controls = {
    influence1: 0.01,
    influence2: 0.01,
    update: () => {
      cube.morphTargetInfluences[0] = controls.influence1;
      cube.morphTargetInfluences[1] = controls.influence2;
    }
  };

  const gui = new dat.GUI();
  gui.add(controls, 'influence1', 0, 1).onChange(controls.update);
  gui.add(controls, 'influence2', 0, 1).onChange(controls.update);

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

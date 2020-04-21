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

  camera.position.x = -30;
  camera.position.y = 30;
  camera.position.z = 30;
  camera.lookAt(scene.position);

  /* renderer */
  const webGLRenderer = new THREE.WebGLRenderer();
  webGLRenderer.setClearColor(new THREE.Color(0xeeeeee));
  webGLRenderer.setSize(VIEWPORT_W, VIEWPORT_H);
  webGLRenderer.shadowMap.enabled = false;

  const planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
  const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 0;
  plane.position.y = -2;
  plane.position.z = 0;
  scene.add(plane);

  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-40, 60, -10);
  spotLight.castShadow = true;
  scene.add(spotLight);

  document.getElementById('WebGL-output').appendChild(webGLRenderer.domElement);

  const group = new THREE.Group();
  const mats: THREE.MeshBasicMaterial[] = [];
  mats.push(new THREE.MeshBasicMaterial({ color: 0x009e60 }));
  mats.push(new THREE.MeshBasicMaterial({ color: 0x009e60 }));
  mats.push(new THREE.MeshBasicMaterial({ color: 0x0051ba }));
  mats.push(new THREE.MeshBasicMaterial({ color: 0x0051ba }));
  mats.push(new THREE.MeshBasicMaterial({ color: 0xffd500 }));
  mats.push(new THREE.MeshBasicMaterial({ color: 0xffd500 }));
  mats.push(new THREE.MeshBasicMaterial({ color: 0xff5800 }));
  mats.push(new THREE.MeshBasicMaterial({ color: 0xff5800 }));
  mats.push(new THREE.MeshBasicMaterial({ color: 0xc41e3a }));
  mats.push(new THREE.MeshBasicMaterial({ color: 0xc41e3a }));
  mats.push(new THREE.MeshBasicMaterial({ color: 0xffffff }));
  mats.push(new THREE.MeshBasicMaterial({ color: 0xffffff }));
  const faceMaterial = new THREE.MultiMaterial(mats);

  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      for (let z = 0; z < 3; z++) {
        const cubeGeom = new THREE.BoxGeometry(2.9, 2.9, 2.9);
        const cube = new THREE.Mesh(cubeGeom, faceMaterial);
        cube.position.set(x * 3 - 3, y * 3, z * 3 - 3);
        group.add(cube);
      }
    }
  }

  scene.add(group);

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

  /* gui */
  const controls = {
    rotationSpeed: 0.02,
    numberOfObjects: scene.children.length,
  };

  const gui = new dat.GUI();
  gui.add(controls, 'rotationSpeed', 0, 0.5);

  /* resize */
  window.addEventListener(
    'resize',
    () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    },
    false
  );

  /* render */
  let step = 0;
  const renderScene = () => {
    stats.update();

    group.rotation.y = step += controls.rotationSpeed;

    requestAnimationFrame(renderScene);
    webGLRenderer.render(scene, camera);
  };
  renderScene();
};

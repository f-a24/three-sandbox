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
    VIEWPORT_W / VIEWPORT_H,
    0.1,
    1000
  );
  camera.position.x = -25;
  camera.position.y = 30;
  camera.position.z = 25;
  camera.lookAt(new THREE.Vector3(10, 0, 0));

  /* renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xeeeeee));
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);
  renderer.shadowMap.enabled = true;

  /* plane */
  const planeGeometry = new THREE.PlaneGeometry(60, 20, 20, 20);
  const planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 15;
  plane.position.y = 0;
  plane.position.z = 0;
  plane.receiveShadow = true;
  scene.add(plane);

  /* cube */
  const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  const cubeMaterial = new THREE.MeshLambertMaterial({
    color: 0xff7777,
  });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.x = -4;
  cube.position.y = 3;
  cube.position.z = 0;
  cube.castShadow = true;
  scene.add(cube);

  /* sphere */
  const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
  const sphereMaterial = new THREE.MeshLambertMaterial({
    color: 0x7777ff,
  });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.x = 20;
  sphere.position.y = 0;
  sphere.position.z = 2;
  sphere.castShadow = true;
  scene.add(sphere);

  /* light */
  const ambiColor = '#0c0c0c';
  const ambientLight = new THREE.AmbientLight(ambiColor);
  scene.add(ambientLight);

  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-20, 30, -5);
  spotLight.castShadow = true;

  const pointColor = '#ccffcc';
  const pointLight = new THREE.PointLight(pointColor);
  pointLight.distance = 100;
  scene.add(pointLight);

  const sphereLight = new THREE.SphereGeometry(0.2);
  const sphereLightMaterial = new THREE.MeshBasicMaterial({ color: 0xac6c25 });
  const sphereLightMesh = new THREE.Mesh(sphereLight, sphereLightMaterial);
  sphereLightMesh.castShadow = true;
  sphereLightMesh.position.set(3, 0, 3);
  scene.add(sphereLightMesh);

  document.getElementById('WebGL-output').appendChild(renderer.domElement);

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
    rotationSpeed: 0.03,
    bouncingSpeed: 0.03,
    ambientColor: ambiColor,
    pointColor,
    intensity: 1,
    distance: 100,
    decay: 1,
  };
  const gui = new dat.GUI();

  gui
    .addColor(controls, 'ambientColor')
    .onChange((e: string | number | THREE.Color) => {
      ambientLight.color = new THREE.Color(e);
    });
  gui
    .addColor(controls, 'pointColor')
    .onChange((e: string | number | THREE.Color) => {
      pointLight.color = new THREE.Color(e);
    });
  gui.add(controls, 'intensity', 0, 3).onChange((e: number) => {
    pointLight.intensity = e;
  });
  gui.add(controls, 'distance', 0, 100).onChange((e: number) => {
    pointLight.distance = e;
  });
  gui.add(controls, 'decay', 1, 100).onChange((e: number) => {
    pointLight.decay = e;
  });

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
  let step = 0;
  let invert = 1;
  let phase = 0;
  const renderScene = () => {
    stats.update();
    cube.rotation.x += controls.rotationSpeed;
    cube.rotation.y += controls.rotationSpeed;
    cube.rotation.z += controls.rotationSpeed;

    step += controls.bouncingSpeed;
    sphere.position.x = 20 + 10 * Math.cos(step);
    sphere.position.y = 2 + 10 * Math.abs(Math.sin(step));

    if (phase > 2 * Math.PI) {
      invert *= -1;
      phase -= 2 * Math.PI;
    } else {
      phase += controls.rotationSpeed;
    }
    sphereLightMesh.position.z = +(7 * Math.sin(phase));
    sphereLightMesh.position.x = +(14 * Math.cos(phase));
    sphereLightMesh.position.y = 5;
    if (invert < 0) {
      const pivot = 14;
      sphereLightMesh.position.x =
        invert * (sphereLightMesh.position.x - pivot) + pivot;
    }
    pointLight.position.copy(sphereLightMesh.position);

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  };
  renderScene();
};

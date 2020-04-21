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
  camera.position.x = -35;
  camera.position.y = 30;
  camera.position.z = 25;
  camera.lookAt(new THREE.Vector3(10, 0, 0));

  /* renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xeeeeee));
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);
  renderer.shadowMap.enabled = true;

  /* plane */
  const planeGeometry = new THREE.PlaneGeometry(600, 200, 20, 20);
  const planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 15;
  plane.position.y = -5;
  plane.position.z = 0;
  plane.receiveShadow = true;
  scene.add(plane);

  /* cube */
  const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  const cubeMaterial = new THREE.MeshLambertMaterial({
    color: 0xff3333,
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
  const ambiColor = '#1c1c1c';
  const ambientLight = new THREE.AmbientLight(ambiColor);
  scene.add(ambientLight);

  const target = new THREE.Object3D();
  target.position.set(5, 0, 0);

  const pointColor = '#ff5808';
  const directionalLight = new THREE.DirectionalLight(pointColor);
  directionalLight.position.set(-40, 60, -10);
  directionalLight.castShadow = true;
  directionalLight.shadow.camera.near = 2;
  directionalLight.shadow.camera.far = 200;
  directionalLight.shadow.camera.left = -50;
  directionalLight.shadow.camera.right = 50;
  directionalLight.shadow.camera.top = 50;
  directionalLight.shadow.camera.bottom = -50;
  //   directionalLight.distance = 0;
  directionalLight.intensity = 0.5;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.mapSize.width = 1024;
  scene.add(directionalLight);

  const cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
  cameraHelper.visible = false;
  scene.add(cameraHelper);

  const sphereLight = new THREE.SphereGeometry(0.2);
  const sphereLightMaterial = new THREE.MeshBasicMaterial({ color: 0xac6c25 });
  const sphereLightMesh = new THREE.Mesh(sphereLight, sphereLightMaterial);
  sphereLightMesh.castShadow = true;
  sphereLightMesh.position.set(3, 20, 3);
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
    distance: 0,
    penumbra: 30,
    angle: 0.1,
    debug: false,
    castShadow: true,
    target: 'Plane',
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
      directionalLight.color = new THREE.Color(e);
    });
  //   gui.add(controls, 'angle', 0, Math.PI * 2).onChange((e: number) => {
  //     directionalLight.angle = e;
  //   });
  gui.add(controls, 'intensity', 0, 3).onChange((e: number) => {
    directionalLight.intensity = e;
  });
  //   gui.add(controls, 'distance', 0, 100).onChange((e: number) => {
  //     directionalLight.distance = e;
  //   });
  gui.add(controls, 'debug').onChange((e: boolean) => {
    cameraHelper.visible = e;
  });
  gui.add(controls, 'castShadow').onChange((e: boolean) => {
    directionalLight.castShadow = e;
  });
  gui
    .add(controls, 'target', ['Plane', 'Sphere', 'Cube'])
    .onChange((e: string) => {
      console.log(e);
      switch (e) {
        case 'Plane':
          directionalLight.target = plane;
          break;
        case 'Sphere':
          directionalLight.target = sphere;
          break;
        case 'Cube':
          directionalLight.target = cube;
          break;
      }
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
  const invert = 1;
  const phase = 0;
  const renderScene = () => {
    stats.update();
    cube.rotation.x += controls.rotationSpeed;
    cube.rotation.y += controls.rotationSpeed;
    cube.rotation.z += controls.rotationSpeed;

    step += controls.bouncingSpeed;
    sphere.position.x = 20 + 10 * Math.cos(step);
    sphere.position.y = 2 + 10 * Math.abs(Math.sin(step));

    sphereLightMesh.position.z = -8;
    sphereLightMesh.position.y = +(27 * Math.sin(step / 3));
    sphereLightMesh.position.x = 10 + 26 * Math.cos(step / 3);

    directionalLight.position.copy(sphereLightMesh.position);

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  };
  renderScene();
};

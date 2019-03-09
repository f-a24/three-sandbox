import * as THREE from 'three';
import * as Stats from 'stats.js';
import * as dat from 'dat.gui';

export default () => {
  // 画面サイズ
  const VIEWPORT_W = window.innerWidth;
  const VIEWPORT_H = window.innerHeight;

  let stopMovingLight = false;

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
  renderer.shadowMap.type = THREE.PCFShadowMap;

  /* plane */
  const planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
  const planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff
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
    color: 0xff3333
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
    color: 0x7777ff
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

  const spotLight0 = new THREE.SpotLight(0xcccccc);
  spotLight0.position.set(-40, 30, -10);
  spotLight0.lookAt(plane.position);
  scene.add(spotLight0);

  const target = new THREE.Object3D();
  target.position.set(5, 0, 0);

  const pointColor = '#ffffff';
  const spotLight = new THREE.SpotLight(pointColor);
  spotLight.position.set(-40, 60, -10);
  spotLight.castShadow = true;
  spotLight.shadow.camera.near = 2;
  spotLight.shadow.camera.far = 200;
  spotLight.shadow.camera.fov = 30;
  spotLight.target = plane;
  spotLight.decay = 1;
  spotLight.distance = 0;
  spotLight.angle = 0.4;
  scene.add(spotLight);

  const cameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
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
    pointColor: pointColor,
    intensity: 1,
    decay: 1,
    distance: 0,
    penumbra: 30,
    angle: 0.1,
    debug: false,
    castShadow: true,
    target: 'Plane',
    stopMovingLight: false
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
      spotLight.color = new THREE.Color(e);
    });
  gui.add(controls, 'angle', 0, Math.PI * 2).onChange((e: number) => {
    spotLight.angle = e;
  });
  gui.add(controls, 'intensity', 0, 3).onChange((e: number) => {
    spotLight.intensity = e;
  });
  gui.add(controls, 'decay', 1, 100).onChange((e: number) => {
    spotLight.decay = e;
  });
  gui.add(controls, 'distance', 0, 100).onChange((e: number) => {
    spotLight.distance = e;
  });
  gui.add(controls, 'penumbra', 0, 100).onChange((e: number) => {
    spotLight.penumbra = e;
  });
  gui.add(controls, 'debug').onChange((e: boolean) => {
    cameraHelper.visible = e;
  });
  gui.add(controls, 'castShadow').onChange((e: boolean) => {
    spotLight.castShadow = e;
  });
  gui
    .add(controls, 'target', ['Plane', 'Sphere', 'Cube'])
    .onChange((e: string) => {
      console.log(e);
      switch (e) {
        case 'Plane':
          spotLight.target = plane;
          break;
        case 'Sphere':
          spotLight.target = sphere;
          break;
        case 'Cube':
          spotLight.target = cube;
          break;
      }
    });
  gui.add(controls, 'stopMovingLight').onChange((e: boolean) => {
    stopMovingLight = e;
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

    if (!stopMovingLight) {
      if (phase > 2 * Math.PI) {
        invert = invert * -1;
        phase -= 2 * Math.PI;
      } else {
        phase += controls.rotationSpeed;
      }
      sphereLightMesh.position.z = +(7 * Math.sin(phase));
      sphereLightMesh.position.x = +(14 * Math.cos(phase));
      sphereLightMesh.position.y = 10;
      if (invert < 0) {
        const pivot = 14;
        sphereLightMesh.position.x =
          invert * (sphereLightMesh.position.x - pivot) + pivot;
      }
      spotLight.position.copy(sphereLightMesh.position);
    }

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  };
  renderScene();
};

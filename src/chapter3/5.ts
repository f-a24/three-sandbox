import * as THREE from 'three';
import * as Stats from 'stats.js';
import * as dat from 'dat.gui';

export default () => {
  // 画面サイズ
  const VIEWPORT_W = window.innerWidth;
  const VIEWPORT_H = window.innerHeight;

  /* scene */
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xaaaaaa, 0.01, 200);

  /* camera */
  const camera = new THREE.PerspectiveCamera(
    45,
    VIEWPORT_W / VIEWPORT_H,
    0.1,
    1000
  );
  camera.position.x = -20;
  camera.position.y = 15;
  camera.position.z = 45;
  camera.lookAt(new THREE.Vector3(10, 0, 0));

  /* renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xaaaaff));
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);
  renderer.shadowMap.enabled = true;

  /* texture */
  const textureLoader = new THREE.TextureLoader();
  const textureGrass = textureLoader.load('./assets/grasslight-big.jpg');
  textureGrass.wrapS = THREE.RepeatWrapping;
  textureGrass.wrapT = THREE.RepeatWrapping;
  textureGrass.repeat.set(4, 4);

  /* plane */
  const planeGeometry = new THREE.PlaneGeometry(1000, 200, 20, 20);
  const planeMaterial = new THREE.MeshLambertMaterial({ map: textureGrass });
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
    color: 0xff3333
  });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.x = -4;
  cube.position.y = 3;
  cube.position.z = 0;
  cube.castShadow = true;
  scene.add(cube);

  /* sphere */
  const sphereGeometry = new THREE.SphereGeometry(4, 25, 25);
  const sphereMaterial = new THREE.MeshLambertMaterial({
    color: 0x7777ff
  });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.x = 10;
  sphere.position.y = 5;
  sphere.position.z = 10;
  sphere.castShadow = true;
  scene.add(sphere);

  /* light */
  const spotLight0 = new THREE.SpotLight(0xcccccc);
  spotLight0.position.set(-40, 60, -10);
  spotLight0.lookAt(plane.position);
  scene.add(spotLight0);

  const target = new THREE.Object3D();
  target.position.set(5, 0, 0);

  const hemiLight = new THREE.HemisphereLight(0x0000ff, 0x00ff00, 0.6);
  hemiLight.position.set(0, 500, 0);
  scene.add(hemiLight);

  const pointColor = '#ffffff';
  const dirLight = new THREE.DirectionalLight(pointColor);
  dirLight.position.set(30, 10, -50);
  dirLight.castShadow = true;
  dirLight.target = plane;
  dirLight.shadow.camera.near = 0.1;
  dirLight.shadow.camera.far = 200;
  dirLight.shadow.camera.left = -50;
  dirLight.shadow.camera.right = 50;
  dirLight.shadow.camera.top = 50;
  dirLight.shadow.camera.bottom = -50;
  dirLight.shadow.mapSize.width = 2048;
  dirLight.shadow.mapSize.height = 2048;
  scene.add(dirLight);

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
    hemisphere: true,
    color: 0x00ff00,
    skyColor: 0x0000ff,
    intensity: 0.6
  };
  const gui = new dat.GUI();

  gui.add(controls, 'hemisphere').onChange((e: boolean) => {
    if (!e) {
      hemiLight.intensity = 0;
    } else {
      hemiLight.intensity = controls.intensity;
    }
  });
  gui
    .addColor(controls, 'color')
    .onChange((e: string | number | THREE.Color) => {
      hemiLight.groundColor = new THREE.Color(e);
    });
  gui
    .addColor(controls, 'skyColor')
    .onChange((e: string | number | THREE.Color) => {
      hemiLight.color = new THREE.Color(e);
    });
  gui.add(controls, 'intensity', 0, 5).onChange((e: number) => {
    hemiLight.intensity = e;
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
  const renderScene = () => {
    stats.update();
    cube.rotation.x += controls.rotationSpeed;
    cube.rotation.y += controls.rotationSpeed;
    cube.rotation.z += controls.rotationSpeed;

    step += controls.bouncingSpeed;
    sphere.position.x = 20 + 10 * Math.cos(step);
    sphere.position.y = 2 + 10 * Math.abs(Math.sin(step));

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  };
  renderScene();
};

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

  camera.position.x = -20;
  camera.position.y = 30;
  camera.position.z = 40;
  camera.lookAt(new THREE.Vector3(10, 0, 0));

  /* renderer */
  const webGLRenderer = new THREE.WebGLRenderer();
  webGLRenderer.setClearColor(new THREE.Color(0xeeeeee));
  webGLRenderer.setSize(VIEWPORT_W, VIEWPORT_H);
  webGLRenderer.shadowMap.enabled = true;

  const groundGeom = new THREE.PlaneGeometry(100, 100, 4, 4);
  const groundMesh = new THREE.Mesh(
    groundGeom,
    new THREE.MeshBasicMaterial({ color: 0x555555 })
  );
  groundMesh.rotation.x = -Math.PI / 2;
  groundMesh.position.y = -20;
  scene.add(groundMesh);

  const sphereGeometry = new THREE.SphereGeometry(14, 20, 20);
  const cubeGeometry = new THREE.BoxGeometry(15, 15, 15);
  const planeGeometry = new THREE.PlaneGeometry(14, 14, 4, 4);
  const meshMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff });
  const sphere = new THREE.Mesh(sphereGeometry, meshMaterial);
  const cube = new THREE.Mesh(cubeGeometry, meshMaterial);
  const plane = new THREE.Mesh(planeGeometry, meshMaterial);
  sphere.position.x = 0;
  sphere.position.y = 3;
  sphere.position.z = 2;
  cube.position.set(sphere.position.x, sphere.position.y, sphere.position.z);
  plane.position.set(sphere.position.x, sphere.position.y, sphere.position.z);
  scene.add(cube);

  const ambientLight = new THREE.AmbientLight(0x0c0c0c);
  scene.add(ambientLight);

  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-30, 60, 60);
  spotLight.castShadow = true;
  scene.add(spotLight);

  document.getElementById('WebGL-output').appendChild(webGLRenderer.domElement);

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
    bouncingSpeed: 0.03,
    opacity: meshMaterial.opacity,
    transparent: meshMaterial.transparent,
    visible: meshMaterial.visible,
    emissive: meshMaterial.emissive.getHex(),
    side: 'front',
    color: meshMaterial.color.getStyle(),
    selectedMesh: 'cube'
  };

  const gui = new dat.GUI();
  const spGui = gui.addFolder('Mesh');
  spGui.add(controls, 'opacity', 0, 1).onChange((e: number) => {
    meshMaterial.opacity = e;
  });
  spGui.add(controls, 'transparent').onChange((e: boolean) => {
    meshMaterial.transparent = e;
  });
  spGui.add(controls, 'visible').onChange((e: boolean) => {
    meshMaterial.visible = e;
  });
  spGui
    .addColor(controls, 'emissive')
    .onChange((e: string | number | THREE.Color) => {
      meshMaterial.emissive = new THREE.Color(e);
    });
  spGui
    .add(controls, 'side', ['front', 'back', 'double'])
    .onChange((e: 'front' | 'back' | 'double') => {
      console.log(e);
      switch (e) {
        case 'front':
          meshMaterial.side = THREE.FrontSide;
          break;
        case 'back':
          meshMaterial.side = THREE.BackSide;
          break;
        case 'double':
          meshMaterial.side = THREE.DoubleSide;
          break;
      }
      meshMaterial.needsUpdate = true;
    });
  spGui.addColor(controls, 'color').onChange((e: string) => {
    meshMaterial.color.setStyle(e);
  });
  spGui
    .add(controls, 'selectedMesh', ['cube', 'sphere', 'plane'])
    .onChange((e: 'cube' | 'sphere' | 'plane') => {
      scene.remove(plane);
      scene.remove(cube);
      scene.remove(sphere);
      switch (e) {
        case 'cube':
          scene.add(cube);
          break;
        case 'sphere':
          scene.add(sphere);
          break;
        case 'plane':
          scene.add(plane);
          break;
      }
    });

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

    cube.rotation.y = step += 0.01;
    plane.rotation.y = step;
    sphere.rotation.y = step;

    requestAnimationFrame(renderScene);
    webGLRenderer.render(scene, camera);
  };
  renderScene();
};

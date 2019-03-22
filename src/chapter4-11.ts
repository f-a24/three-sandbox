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

  const geometry = new THREE.TorusKnotGeometry(10, 3, 200, 20);
  const meshMaterial = new THREE.MeshStandardMaterial({ color: 0x7777ff });
  const mesh = new THREE.Mesh(geometry, meshMaterial);
  mesh.position.set(0, 3, 2);
  scene.add(mesh);

  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-0, 30, 60);
  spotLight.castShadow = true;
  spotLight.intensity = 0.6;
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
    overdraw: meshMaterial.overdraw,
    visible: meshMaterial.visible,
    roughness: meshMaterial.roughness,
    metalness: meshMaterial.metalness,
    side: 'front',
    shading: 'smooth',
    color: meshMaterial.color.getStyle()
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
  spGui.add(controls, 'roughness', 0, 1.0).onChange((e: number) => {
    meshMaterial.roughness = e;
  });
  spGui.add(controls, 'metalness', 0, 1.0).onChange((e: number) => {
    meshMaterial.metalness = e;
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
  spGui
    .add(controls, 'shading', ['flat', 'smooth'])
    .onChange((e: 'flat' | 'smooth') => {
      console.log(e);
      switch (e) {
        case 'flat':
          meshMaterial.flatShading = true;
          break;
        case 'smooth':
          meshMaterial.flatShading = false;
          break;
      }
      meshMaterial.needsUpdate = true;
      console.log(meshMaterial);
    });
  spGui.addColor(controls, 'color').onChange((e: string) => {
    meshMaterial.color.setStyle(e);
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

    mesh.rotation.y = step += 0.01;

    requestAnimationFrame(renderScene);
    webGLRenderer.render(scene, camera);
  };
  renderScene();
};

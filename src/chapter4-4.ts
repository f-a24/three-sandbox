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
    new THREE.MeshBasicMaterial({ color: 0x777777 })
  );
  groundMesh.rotation.x = -Math.PI / 2;
  groundMesh.position.y = -20;
  scene.add(groundMesh);

  const sphereGeometry = new THREE.SphereGeometry(14, 20, 20);
  const cubeGeometry = new THREE.BoxGeometry(15, 15, 15);
  const planeGeometry = new THREE.PlaneGeometry(14, 14, 4, 4);
  const meshMaterial = new THREE.MeshNormalMaterial();
  let sphere = new THREE.Mesh(sphereGeometry, meshMaterial);
  let cube = new THREE.Mesh(cubeGeometry, meshMaterial);
  let plane = new THREE.Mesh(planeGeometry, meshMaterial);
  sphere.position.x = 0;
  sphere.position.y = 3;
  sphere.position.z = 2;

  for (
    let f = 0, fl = (sphere.geometry as THREE.Geometry).faces.length;
    f < fl;
    f++
  ) {
    const face = (sphere.geometry as THREE.Geometry).faces[f];
    const centroid = new THREE.Vector3(0, 0, 0);
    centroid.add((sphere.geometry as THREE.Geometry).vertices[face.a]);
    centroid.add((sphere.geometry as THREE.Geometry).vertices[face.b]);
    centroid.add((sphere.geometry as THREE.Geometry).vertices[face.c]);
    centroid.divideScalar(3);
    const arrow = new THREE.ArrowHelper(
      face.normal,
      centroid,
      2,
      0x3333ff,
      0.5,
      0.5
    );
    sphere.add(arrow);
  }
  cube.position.set(sphere.position.x, sphere.position.y, sphere.position.z);
  plane.position.set(sphere.position.x, sphere.position.y, sphere.position.z);
  scene.add(cube);

  const ambientLight = new THREE.AmbientLight(0x0c0c0c);
  scene.add(ambientLight);

  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-40, 60, -10);
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
    rotationSpee: 0.02,
    bouncingSpeed: 0.03,
    opacity: meshMaterial.opacity,
    transparent: meshMaterial.transparent,
    visible: meshMaterial.visible,
    side: 'front',
    wireframe: meshMaterial.wireframe,
    wireframeLinewidth: meshMaterial.wireframeLinewidth,
    selectedMesh: 'cube',
    shading: 'flat'
  };

  const gui = new dat.GUI();
  const spGui = gui.addFolder('Mesh');
  spGui.add(controls, 'opacity', 0, 1).onChange((e: number) => {
    meshMaterial.opacity = e;
  });
  spGui.add(controls, 'transparent').onChange((e: boolean) => {
    meshMaterial.transparent = e;
  });
  spGui.add(controls, 'wireframe').onChange((e: boolean) => {
    meshMaterial.wireframe = e;
  });
  spGui.add(controls, 'wireframeLinewidth', 0, 20).onChange((e: number) => {
    meshMaterial.wireframeLinewidth = e;
  });
  spGui.add(controls, 'visible').onChange((e: boolean) => {
    meshMaterial.visible = e;
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
      switch (e) {
        case 'flat':
          meshMaterial.flatShading = true;
          break;
        case 'smooth':
          meshMaterial.flatShading = false;
          break;
      }
      const oldPos = sphere.position.clone();
      scene.remove(sphere);
      scene.remove(plane);
      scene.remove(cube);
      sphere = new THREE.Mesh(sphere.geometry.clone(), meshMaterial);
      cube = new THREE.Mesh(cube.geometry.clone(), meshMaterial);
      plane = new THREE.Mesh(plane.geometry.clone(), meshMaterial);
      sphere.position.set(oldPos.x, oldPos.y, oldPos.z);
      cube.position.set(oldPos.x, oldPos.y, oldPos.z);
      plane.position.set(oldPos.x, oldPos.y, oldPos.z);
      switch (controls.selectedMesh) {
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
      meshMaterial.needsUpdate = true;
      console.log(meshMaterial);
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

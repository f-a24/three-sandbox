import * as THREE from 'three';
import * as Stats from 'stats.js';
import * as dat from 'dat.gui';

import createMultiMaterialObject from '../utils/createMultiMaterialObject';

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
    30,
    170
  );

  camera.position.x = -50;
  camera.position.y = 40;
  camera.position.z = 50;
  camera.lookAt(scene.position);

  /* renderer */
  const webGLRenderer = new THREE.WebGLRenderer();
  webGLRenderer.sortObjects = false;
  webGLRenderer.setClearColor(new THREE.Color(0x00000));
  webGLRenderer.setSize(VIEWPORT_W, VIEWPORT_H);
  webGLRenderer.shadowMap.enabled = true;

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
    cameraNear: camera.near,
    cameraFar: camera.far,
    rotationSpeed: 0.02,
    numberOfObjects: scene.children.length,
    color: 0x00ff00,
    removeCube: () => {
      const allChildren = scene.children;
      const lastObject = allChildren[allChildren.length - 1];
      if (lastObject instanceof THREE.Mesh) {
        scene.remove(lastObject);
        controls.numberOfObjects = scene.children.length;
      }
    },
    addCube: () => {
      const cubeSize = Math.ceil(3 + Math.random() * 3);
      const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
      const cubeMaterial = new THREE.MeshDepthMaterial();
      const colorMaterial = new THREE.MeshBasicMaterial({
        color: controls.color,
        transparent: true,
        blending: THREE.MultiplyBlending
      });
      const cube = createMultiMaterialObject(cubeGeometry, [
        colorMaterial,
        cubeMaterial
      ]);
      cube.children[1].scale.set(0.99, 0.99, 0.99);
      cube.castShadow = true;
      cube.position.x = -60 + Math.round(Math.random() * 100);
      cube.position.y = Math.round(Math.random() * 10);
      cube.position.z = -100 + Math.round(Math.random() * 150);
      scene.add(cube);
      controls.numberOfObjects = scene.children.length;
    },
    outputObjects: () => {
      console.log(scene.children);
    }
  };

  const gui = new dat.GUI();
  gui.addColor(controls, 'color');
  gui.add(controls, 'rotationSpeed', 0, 0.5);
  gui.add(controls, 'addCube');
  gui.add(controls, 'removeCube');
  gui.add(controls, 'cameraNear', 0, 50).onChange((e: number) => {
    camera.near = e;
    camera.updateProjectionMatrix();
  });
  gui.add(controls, 'cameraFar', 100, 300).onChange((e: number) => {
    camera.far = e;
    camera.updateProjectionMatrix();
  });

  for (let i = 0; i < 10; i++) {
    controls.addCube();
  }

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
  const renderScene = () => {
    stats.update();

    scene.traverse((e: THREE.Mesh) => {
      if (e instanceof THREE.Mesh) {
        e.rotation.x += controls.rotationSpeed;
        e.rotation.y += controls.rotationSpeed;
        e.rotation.z += controls.rotationSpeed;
      }
    });

    requestAnimationFrame(renderScene);
    webGLRenderer.render(scene, camera);
  };
  renderScene();
};

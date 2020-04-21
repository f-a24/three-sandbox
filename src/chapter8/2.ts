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
    1,
    500
  );
  camera.position.x = 0;
  camera.position.y = 40;
  camera.position.z = 50;
  camera.lookAt(scene.position);

  /* renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);
  renderer.shadowMap.enabled = true;

  const cubeMaterial = new THREE.MeshNormalMaterial({
    transparent: true,
    opacity: 0.5,
  });

  const addcube = () => {
    const cubeSize = 1.0;
    const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    cube.position.x = -60 + Math.round(Math.random() * 100);
    cube.position.y = Math.round(Math.random() * 10);
    cube.position.z = -150 + Math.round(Math.random() * 175);
    return cube;
  };

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
    cameraNear: camera.near,
    cameraFar: camera.far,
    rotationSpeed: 0.02,
    combined: false,
    numberOfObjects: 500,
    addCube: addcube,
    outputObjects: () => {
      console.log(scene.children);
    },
    redraw: () => {
      const toRemove = [];
      scene.traverse((e) => {
        if (e instanceof THREE.Mesh) toRemove.push(e);
      });
      toRemove.forEach((e) => {
        scene.remove(e);
      });
      if (controls.combined) {
        const geometry = new THREE.Geometry();
        for (let i = 0; i < controls.numberOfObjects; i++) {
          const cubeMesh = addcube();
          cubeMesh.updateMatrix();
          geometry.merge(cubeMesh.geometry as THREE.Geometry, cubeMesh.matrix);
        }
        scene.add(new THREE.Mesh(geometry, cubeMaterial));
      } else {
        for (let i = 0; i < controls.numberOfObjects; i++) {
          scene.add(controls.addCube());
        }
      }
    },
  };

  const gui = new dat.GUI();
  gui.add(controls, 'numberOfObjects', 0, 20000);
  gui.add(controls, 'combined').onChange(controls.redraw);
  gui.add(controls, 'redraw');

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
  const step = 0.03;
  let rotation = 0;
  const renderScene = () => {
    rotation += 0.005;
    stats.update();

    camera.position.x = Math.sin(rotation) * 50;
    camera.position.z = Math.cos(rotation) * 50;
    camera.lookAt(scene.position);

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  };
  controls.redraw();
  renderScene();
};

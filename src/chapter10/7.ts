import * as THREE from 'three';
import * as Stats from 'stats.js';
import * as dat from 'dat.gui';
import { OBJLoader } from '../../node_modules/three/examples/jsm/loaders/OBJLoader';

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
  camera.position.set(-30, 40, 50);
  camera.lookAt(scene.position);

  const ambi = new THREE.AmbientLight(0x3300000);
  scene.add(ambi);

  const spotLight = new THREE.DirectionalLight(0xffffff);
  spotLight.position.set(350, 350, 150);
  spotLight.intensity = 0.4;
  scene.add(spotLight);

  /* renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xffffff));
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);
  renderer.shadowMap.enabled = true;

  document.getElementById('WebGL-output').appendChild(renderer.domElement);

  let mesh: THREE.Group;
  const textureLoader = new THREE.TextureLoader();
  const controls = {
    loadCube1: () => {
      const loader = new OBJLoader();
      loader.load('./assets/UVCube1.obj', geometry => {
        if (mesh) scene.remove(mesh);
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const texture = textureLoader.load('./assets/tex/ash_uvgrid01.jpg');
        material.map = texture;
        (geometry.children[0] as THREE.Mesh).material = material;
        mesh = geometry;
        geometry.scale.set(15, 15, 15);
        scene.add(geometry);
      });
    },
    loadCube2: () => {
      const loader = new OBJLoader();
      loader.load('./assets/UVCube2.obj', geometry => {
        if (mesh) scene.remove(mesh);
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const texture = textureLoader.load('./assets/tex/ash_uvgrid01.jpg');
        material.map = texture;
        (geometry.children[0] as THREE.Mesh).material = material;
        mesh = geometry;
        geometry.scale.set(15, 15, 15);
        geometry.rotation.x = -0.3;
        scene.add(geometry);
      });
    }
  };

  const gui = new dat.GUI();
  gui.add(controls, 'loadCube1');
  gui.add(controls, 'loadCube2');
  controls.loadCube1();

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
  const renderScene = () => {
    stats.update();

    if (mesh) {
      mesh.rotation.y += 0.006;
      mesh.rotation.x += 0.006;
    }

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  };
  renderScene();
};

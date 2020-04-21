import * as THREE from 'three';
import * as Stats from 'stats.js';
import { OBJLoader } from '../../node_modules/three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from '../../node_modules/three/examples/jsm/loaders/MTLLoader';

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
  camera.position.x = -30;
  camera.position.y = 40;
  camera.position.z = 50;
  camera.lookAt(new THREE.Vector3(0, 10, 0));

  /* renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xaaaaff));
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);
  renderer.shadowMap.enabled = true;

  // spotlight
  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(0, 40, 30);
  spotLight.intensity = 2;
  scene.add(spotLight);

  document.getElementById('WebGL-output').appendChild(renderer.domElement);

  let mesh: THREE.Group;

  const mtlLoader = new MTLLoader();
  mtlLoader.load('./assets/butterfly.mtl', (materials) => {
    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.materials;
    objLoader.load('./assets/butterfly.obj', (object) => {
      const wing2 = object.children[5] as THREE.Mesh;
      const wing1 = object.children[4] as THREE.Mesh;
      const wing1material = wing1.material as THREE.Material;
      const wing2material = wing2.material as THREE.Material;

      wing1material.opacity = 0.6;
      wing1material.transparent = true;
      wing1material.depthTest = false;
      wing1material.side = THREE.DoubleSide;

      wing2material.opacity = 0.6;
      wing2material.depthTest = false;
      wing2material.transparent = true;
      wing2material.side = THREE.DoubleSide;

      object.scale.set(140, 140, 140);
      mesh = object;
      scene.add(mesh);

      object.rotation.x = 0.2;
      object.rotation.y = -1.3;
    });
  });

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
    }

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  };
  renderScene();
};

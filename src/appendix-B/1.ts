import * as THREE from 'three';
// import 'imports-loader?THREE=three!../../node_modules/three/examples/js/libs/mmdparser.min.js';
// import 'imports-loader?THREE=three!../../node_modules/three/examples/js/loaders/TGALoader.js';
import { MMDLoader } from '../../node_modules/three/examples/jsm/loaders/MMDLoader';
// import { MMDParser } from '../../node_modules/three/examples/jsm/libs/mmdparser.module.js';

// (window as any).MMDParser = MMDParser;

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
    2000
  );
  camera.position.z = 30;
  camera.lookAt(scene.position);

  /* renderer */
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);
  renderer.setClearColor(new THREE.Color(0xffffff));

  const ambient = new THREE.AmbientLight(0x888888);
  scene.add(ambient);
  const directionalLight = new THREE.DirectionalLight(0x666666);
  directionalLight.position.set(-1, 1, 1).normalize();
  scene.add(directionalLight);

  let mesh: THREE.Mesh;
  const loader = new MMDLoader();

  loader.load(
    'model/kizunaai.pmx',
    (object: THREE.Mesh) => {
      mesh = object;
      mesh.position.y = -10;
      scene.add(mesh);
    },
    xhr => {
      if (xhr.lengthComputable) {
        const percentComplete = (xhr.loaded / xhr.total) * 100;
        console.log(`${Math.round(percentComplete)}% downloaded`);
      }
    },
    error => {
      console.log('ERROR:', error);
    }
  );

  document.getElementById('WebGL-output').appendChild(renderer.domElement);

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
    camera.lookAt(scene.position);

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  };
  renderScene();

  /* copyright */
  const copyright = document.createElement('span');
  copyright.innerHTML = '© Kizuna AI';
  copyright.className = 'copyright';
  document.body.appendChild(copyright);
};

import * as THREE from 'three';
import { MMDLoader } from '../../node_modules/three/examples/jsm/loaders/MMDLoader';
import { MMDAnimationHelper } from '../../node_modules/three/examples/jsm/animation/MMDAnimationHelper';

declare global {
  interface Window {
    Ammo: any;
  }
}
window.Ammo = require('../../node_modules/three/examples/js/libs/ammo.js')();

export default () => {
  // 画面サイズ
  const VIEWPORT_W = window.innerWidth;
  const VIEWPORT_H = window.innerHeight;

  const clock = new THREE.Clock();

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

  const onProgress = xhr => {
    if (xhr.lengthComputable) {
      const percentComplete = (xhr.loaded / xhr.total) * 100;
      console.log(`${Math.round(percentComplete)}% downloaded`);
    }
  };

  const onError = error => {
    console.log('ERROR:', error);
  };

  let mesh: THREE.SkinnedMesh;

  const helper = new MMDAnimationHelper();
  const loader = new MMDLoader();

  loader.loadWithAnimation(
    'model/kizunaai.pmx',
    'vmds/dance.vmd',
    pmx => {
      mesh = pmx.mesh;

      helper.add(mesh, {
        animation: pmx.animation,
        physics: true
      });
      loader.loadAnimation(
        'vmds/camera.vmd',
        camera,
        (cameraAnimation: THREE.AnimationClip) => {
          helper.add(camera, {
            animation: cameraAnimation
          });
          new THREE.AudioLoader().load(
            'audios/audio.mp3',
            (buffer: THREE.AudioBuffer) => {
              const listener = new THREE.AudioListener();
              const audio = new THREE.Audio(listener).setBuffer(buffer);
              listener.position.z = 1;
              helper.add(audio, { delayTime: 4 });
              scene.add(audio);
              scene.add(listener);
              scene.add(mesh);
            },
            onProgress,
            onError
          );
        },
        onProgress,
        onError
      );
    },
    onProgress,
    onError
  );

  document.getElementById('WebGL-output').appendChild(renderer.domElement);

  /* resize */
  window.addEventListener(
    'resize',
    () => {
      camera.aspect = VIEWPORT_W / VIEWPORT_H;
      camera.updateProjectionMatrix();
      renderer.setSize(VIEWPORT_W, VIEWPORT_H);
    },
    false
  );

  /* render */
  const renderScene = () => {
    camera.lookAt(scene.position);

    helper.update(clock.getDelta());
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

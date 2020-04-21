import * as THREE from 'three';
import * as Stats from 'stats.js';
import * as dat from 'dat.gui';
import { MD2Character } from '../../node_modules/three/examples/jsm/misc/MD2Character';

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
  camera.position.x = -50;
  camera.position.y = 40;
  camera.position.z = 60;
  camera.lookAt(new THREE.Vector3(0, 25, 0));

  /* renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xdddddd));
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);
  renderer.shadowMap.enabled = true;

  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-50, 70, 60);
  spotLight.intensity = 1;
  scene.add(spotLight);

  document.getElementById('WebGL-output').appendChild(renderer.domElement);

  const controls = {
    animations: 'crattack',
    playbackrate: 10,
  };
  const gui = new dat.GUI();
  const clock = new THREE.Clock();

  const character = new MD2Character();
  character.onLoadComplete = () => {
    const { animations } = character.meshBody.geometry as THREE.Geometry;
    const animLabels: string[] = [];
    animations.forEach(function (anim) {
      if (!anim.name.match(/\d{3}f$/)) {
        animLabels.push(anim.name);
      }
    });
    gui.add(controls, 'animations', animLabels).onChange(() => {
      character.setAnimation(controls.animations);
    });
    gui
      .add(controls, 'playbackrate', 1, 20)
      .step(1)
      .onChange(() => {
        character.setPlaybackRate(controls.playbackrate);
      });
    character.setAnimation(controls.animations);
    character.setPlaybackRate(controls.playbackrate);
  };
  character.loadParts({
    baseUrl: './assets/',
    body: 'ogro.md2',
    skins: ['skin.jpg'],
    weapons: [],
  });
  scene.add(character.root);

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
    const delta = clock.getDelta();
    character.update(delta);

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  };
  renderScene();
};

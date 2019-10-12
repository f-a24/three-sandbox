import * as THREE from 'three';
import * as Stats from 'stats.js';
import * as dat from 'dat.gui';
import * as chroma from 'chroma-js';
import { EffectComposer } from '../../node_modules/three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from '../../node_modules/three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from '../../node_modules/three/examples/jsm/postprocessing/ShaderPass';
import { BleachBypassShader } from '../../node_modules/three/examples/jsm/shaders/BleachBypassShader';
import { FreiChenShader } from '../../node_modules/three/examples/jsm/shaders/FreiChenShader';
import { FXAAShader } from '../../node_modules/three/examples/jsm/shaders/FXAAShader';
import { FocusShader } from '../../node_modules/three/examples/jsm/shaders/FocusShader';
import { CopyShader } from '../../node_modules/three/examples/jsm/shaders/CopyShader';

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
  camera.position.set(30, 30, 30);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  /* renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xaaaaff));
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);
  renderer.shadowMap.enabled = true;

  const dirLight = new THREE.DirectionalLight(0xffffff);
  dirLight.position.set(30, 30, 30);
  dirLight.intensity = 0.8;
  scene.add(dirLight);

  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.castShadow = true;
  spotLight.position.set(-30, 30, -100);
  spotLight.target.position.x = -10;
  spotLight.target.position.z = -10;
  spotLight.intensity = 0.6;
  spotLight.shadow.mapSize.width = 4096;
  spotLight.shadow.mapSize.height = 4096;
  spotLight.shadow.camera.fov = 120;
  spotLight.shadow.camera.near = 1;
  spotLight.shadow.camera.far = 200;
  scene.add(spotLight);

  document.getElementById('WebGL-output').appendChild(renderer.domElement);

  const plane = new THREE.BoxGeometry(1600, 1600, 0.1, 40, 40);
  const textureLoader = new THREE.TextureLoader();
  const cube = new THREE.Mesh(
    plane,
    new THREE.MeshPhongMaterial({
      color: 0xffffff,
      map: textureLoader.load('./assets/tex/floor-wood.jpg'),
      normalScale: new THREE.Vector2(0.6, 0.6)
    })
  );
  (cube.material as THREE.MeshPhongMaterial).map.wrapS = THREE.RepeatWrapping;
  (cube.material as THREE.MeshPhongMaterial).map.wrapT = THREE.RepeatWrapping;
  cube.rotation.x = Math.PI / 2;
  (cube.material as THREE.MeshPhongMaterial).map.repeat.set(80, 80);
  cube.receiveShadow = true;
  cube.position.z = -150;
  cube.position.x = -150;
  scene.add(cube);

  const range = 3;
  const stepX = 8;
  const stepZ = 8;
  const scale = chroma.scale(['white', 'blue']);
  for (let i = -25; i < 5; i++) {
    for (let j = -15; j < 15; j++) {
      const cube = new THREE.Mesh(
        new THREE.BoxGeometry(3, 4, 3),
        new THREE.MeshPhongMaterial({
          color: scale(Math.random()).hex(),
          opacity: 0.8,
          transparent: true
        })
      );
      cube.position.x = i * stepX + (Math.random() - 0.5) * range;
      cube.position.z = j * stepZ + (Math.random() - 0.5) * range;
      cube.position.y = (Math.random() - 0.5) * 2;
      cube.castShadow = true;
      scene.add(cube);
    }
  }

  const bleachFilter = new ShaderPass(BleachBypassShader);
  bleachFilter.enabled = false;

  /**
   * EdgeShader -> FreiChenShader
   * https://github.com/mrdoob/three.js/pull/11932/files
   */
  const edgeShader = new ShaderPass(FreiChenShader);
  edgeShader.enabled = false;

  const fxaaShader = new ShaderPass(FXAAShader);
  fxaaShader.enabled = false;

  const focusShader = new ShaderPass(FocusShader);
  focusShader.enabled = false;

  const renderPass = new RenderPass(scene, camera);
  const effectCopy = new ShaderPass(CopyShader);
  effectCopy.renderToScreen = true;

  const composer = new EffectComposer(renderer);
  composer.addPass(renderPass);
  composer.addPass(bleachFilter);
  composer.addPass(edgeShader);
  composer.addPass(fxaaShader);
  composer.addPass(focusShader);
  composer.addPass(effectCopy);

  const controls = {
    bleachOpacity: 1,
    bleach: false,
    edgeDetect: false,
    edgeAspect: 512,
    FXAA: false,
    focus: false,
    sampleDistance: 0.94,
    waveFactor: 0.00125,
    screenWidth: VIEWPORT_W,
    screenHeight: VIEWPORT_H,
    onChange: () => {
      bleachFilter.enabled = controls.bleach;
      (bleachFilter.uniforms as any).opacity.value = controls.bleachOpacity;
      edgeShader.enabled = controls.edgeDetect;
      (edgeShader.uniforms as any).aspect.value = new THREE.Vector2(
        controls.edgeAspect,
        controls.edgeAspect
      );
      fxaaShader.enabled = controls.FXAA;
      (fxaaShader.uniforms as any).resolution.value = new THREE.Vector2(
        1 / window.innerWidth,
        1 / window.innerHeight
      );
      focusShader.enabled = controls.focus;
      (focusShader.uniforms as any).screenWidth.value = controls.screenWidth;
      (focusShader.uniforms as any).screenHeight.value = controls.screenHeight;
      (focusShader.uniforms as any).waveFactor.value = controls.waveFactor;
      (focusShader.uniforms as any).sampleDistance.value =
        controls.sampleDistance;
    }
  };

  const gui = new dat.GUI();
  gui.add(controls, 'bleach').onChange(controls.onChange);
  gui.add(controls, 'bleachOpacity', 0, 2).onChange(controls.onChange);
  gui.add(controls, 'edgeDetect').onChange(controls.onChange);
  gui
    .add(controls, 'edgeAspect', 128, 2048)
    .step(128)
    .onChange(controls.onChange);
  gui.add(controls, 'FXAA').onChange(controls.onChange);
  gui.add(controls, 'focus').onChange(controls.onChange);
  gui
    .add(controls, 'sampleDistance', 0, 2)
    .step(0.01)
    .onChange(controls.onChange);
  gui
    .add(controls, 'waveFactor', 0, 0.005)
    .step(0.0001)
    .onChange(controls.onChange);

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

    requestAnimationFrame(renderScene);
    composer.render();
  };
  renderScene();
};

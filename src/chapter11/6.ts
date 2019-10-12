import * as THREE from 'three';
import * as Stats from 'stats.js';
import * as dat from 'dat.gui';
import * as chroma from 'chroma-js';
import { EffectComposer } from '../../node_modules/three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from '../../node_modules/three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from '../../node_modules/three/examples/jsm/postprocessing/ShaderPass';
import { HorizontalBlurShader } from '../../node_modules/three/examples/jsm/shaders/HorizontalBlurShader';
import { VerticalBlurShader } from '../../node_modules/three/examples/jsm/shaders/VerticalBlurShader';
import { HorizontalTiltShiftShader } from '../../node_modules/three/examples/jsm/shaders/HorizontalTiltShiftShader';
import { VerticalTiltShiftShader } from '../../node_modules/three/examples/jsm/shaders/VerticalTiltShiftShader';
import { TriangleBlurShader } from '../../node_modules/three/examples/jsm/shaders/TriangleBlurShader';
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

  const hBlur = new ShaderPass(HorizontalBlurShader);
  hBlur.enabled = false;
  (hBlur.uniforms as any).h.value = 1 / window.innerHeight;

  const vBlur = new ShaderPass(VerticalBlurShader);
  vBlur.enabled = false;
  (vBlur.uniforms as any).v.value = 1 / window.innerWidth;

  const hTilt = new ShaderPass(HorizontalTiltShiftShader);
  hTilt.enabled = false;
  (hTilt.uniforms as any).h.value = 1 / window.innerHeight;

  const vTilt = new ShaderPass(VerticalTiltShiftShader);
  vTilt.enabled = false;
  (vTilt.uniforms as any).v.value = 1 / window.innerWidth;

  const tri = new ShaderPass(TriangleBlurShader, 'texture');
  tri.enabled = false;

  const renderPass = new RenderPass(scene, camera);
  const effectCopy = new ShaderPass(CopyShader);
  effectCopy.renderToScreen = true;

  const composer = new EffectComposer(renderer);
  composer.addPass(renderPass);
  composer.addPass(hBlur);
  composer.addPass(vBlur);
  composer.addPass(vTilt);
  composer.addPass(hTilt);
  composer.addPass(tri);
  composer.addPass(effectCopy);

  const controls = {
    hBlur: false,
    vBlur: false,
    hTilt: false,
    vTilt: false,
    triBlur: false,
    hTiltR: 0.35,
    vTiltR: 0.35,
    deltaX: 0.05,
    deltaY: 0.05,
    onChange: () => {
      hBlur.enabled = controls.hBlur;
      vBlur.enabled = controls.vBlur;
      hTilt.enabled = controls.hTilt;
      (hTilt.uniforms as any).r.value = controls.hTiltR;
      vTilt.enabled = controls.vTilt;
      (vTilt.uniforms as any).r.value = controls.vTiltR;
      tri.enabled = controls.triBlur;
      (tri.uniforms as any).delta.value = new THREE.Vector2(
        controls.deltaX,
        controls.deltaY
      );
    }
  };

  const gui = new dat.GUI();
  gui.add(controls, 'hBlur').onChange(controls.onChange);
  gui.add(controls, 'vBlur').onChange(controls.onChange);
  gui.add(controls, 'hTilt').onChange(controls.onChange);
  gui.add(controls, 'hTiltR', 0, 1).onChange(controls.onChange);
  gui.add(controls, 'vTilt').onChange(controls.onChange);
  gui.add(controls, 'vTiltR', 0, 1).onChange(controls.onChange);
  gui.add(controls, 'triBlur').onChange(controls.onChange);
  gui
    .add(controls, 'deltaX', 0, 0.05)
    .step(0.001)
    .onChange(controls.onChange);
  gui
    .add(controls, 'deltaY', 0, 0.05)
    .step(0.001)
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

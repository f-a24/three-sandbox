import * as THREE from 'three';
import * as Stats from 'stats.js';
import * as dat from 'dat.gui';
import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls';
import { SceneUtils } from '../../node_modules/three/examples/jsm/utils/SceneUtils';
import { EffectComposer } from '../../node_modules/three/examples/jsm/postprocessing/EffectComposer';
import { FilmPass } from '../../node_modules/three/examples/jsm/postprocessing/FilmPass';
import { RenderPass } from '../../node_modules/three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from '../../node_modules/three/examples/jsm/postprocessing/ShaderPass';
import { CopyShader } from '../../node_modules/three/examples/jsm/shaders/CopyShader';
import { FilmShader } from '../../node_modules/three/examples/jsm/shaders/FilmShader';
import { BloomPass } from '../../node_modules/three/examples/jsm/postprocessing/BloomPass';
import { DotScreenPass } from '../../node_modules/three/examples/jsm/postprocessing/DotScreenPass';
import { TexturePass } from '../../node_modules/three/examples/jsm/postprocessing/TexturePass';

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
  camera.position.set(-10, 15, 25);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  /* renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);
  renderer.shadowMap.enabled = true;

  const orbitControls = new OrbitControls(camera);
  orbitControls.autoRotate = false;
  const clock = new THREE.Clock();

  const ambi = new THREE.AmbientLight(0x686868);
  scene.add(ambi);

  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(550, 100, 550);
  spotLight.intensity = 0.6;
  scene.add(spotLight);

  document.getElementById('WebGL-output').appendChild(renderer.domElement);

  const createMesh = (geom: THREE.SphereGeometry) => {
    const textureLoader = new THREE.TextureLoader();
    const planetTexture = textureLoader.load('./assets/Earth.png');
    const specularTexture = textureLoader.load('./assets/EarthSpec.png');
    const normalTexture = textureLoader.load('./assets/EarthNormal.png');
    const planetMaterial = new THREE.MeshPhongMaterial();
    planetMaterial.specularMap = specularTexture;
    planetMaterial.specular = new THREE.Color(0x4444aa);
    planetMaterial.normalMap = normalTexture;
    planetMaterial.map = planetTexture;
    return SceneUtils.createMultiMaterialObject(geom, [planetMaterial]);
  };

  const sphere = createMesh(new THREE.SphereGeometry(10, 40, 40));
  scene.add(sphere);

  const renderPass = new RenderPass(scene, camera);
  const effectCopy = new ShaderPass(CopyShader);
  effectCopy.renderToScreen = true;

  let bloomPass = new BloomPass(3, 25, 5.0, 256);
  const effectFilm = new FilmPass(0.8, 0.325, 256, 0);
  effectFilm.renderToScreen = true;

  const dotScreenPass = new DotScreenPass();

  const composer = new EffectComposer(renderer);
  composer.addPass(renderPass);
  composer.addPass(effectCopy);

  const renderScene = new TexturePass(composer.renderTarget2.texture);

  let composer1 = new EffectComposer(renderer);
  composer1.addPass(renderScene);
  composer1.addPass(dotScreenPass);
  composer1.addPass(effectCopy);

  const composer2 = new EffectComposer(renderer);
  composer2.addPass(renderScene);
  composer2.addPass(effectCopy);

  let composer3 = new EffectComposer(renderer);
  composer3.addPass(renderScene);
  composer3.addPass(bloomPass);
  composer3.addPass(effectCopy);

  const composer4 = new EffectComposer(renderer);
  composer4.addPass(renderScene);
  composer4.addPass(effectFilm);

  const controls = {
    scanlinesCount: 256,
    grayscale: false,
    scanlinesIntensity: 0.3,
    noiseIntensity: 0.8,

    strength: 3,
    kernelSize: 25,
    sigma: 5.0,
    resolution: 256,

    centerX: 0.5,
    centerY: 0.5,
    angle: 1.57,
    scale: 1,
    updateEffectFilm: () => {
      type uniformsType = typeof FilmShader.uniforms;
      (effectFilm.uniforms as uniformsType).grayscale.value =
        controls.grayscale;
      (effectFilm.uniforms as uniformsType).nIntensity.value =
        controls.noiseIntensity;
      (effectFilm.uniforms as uniformsType).sIntensity.value =
        controls.scanlinesIntensity;
      (effectFilm.uniforms as uniformsType).sCount.value =
        controls.scanlinesCount;
    },
    updateDotScreen: () => {
      const dotScreenPass = new DotScreenPass(
        new THREE.Vector2(controls.centerX, controls.centerY),
        controls.angle,
        controls.scale
      );
      composer1 = new EffectComposer(renderer);
      composer1.addPass(renderScene);
      composer1.addPass(dotScreenPass);
      composer1.addPass(effectCopy);
    },
    updateEffectBloom: () => {
      bloomPass = new BloomPass(
        controls.strength,
        controls.kernelSize,
        controls.sigma,
        controls.resolution
      );
      composer3 = new EffectComposer(renderer);
      composer3.addPass(renderScene);
      composer3.addPass(bloomPass);
      composer3.addPass(effectCopy);
    },
  };

  const gui = new dat.GUI();
  const bpFolder = gui.addFolder('BloomPass');
  bpFolder
    .add(controls, 'strength', 1, 10)
    .onChange(controls.updateEffectBloom);
  bpFolder
    .add(controls, 'kernelSize', 1, 100)
    .onChange(controls.updateEffectBloom);
  bpFolder.add(controls, 'sigma', 1, 10).onChange(controls.updateEffectBloom);
  bpFolder
    .add(controls, 'resolution', 0, 1024)
    .onChange(controls.updateEffectBloom);

  const fpFolder = gui.addFolder('FilmPass');
  fpFolder
    .add(controls, 'scanlinesIntensity', 0, 1)
    .onChange(controls.updateEffectFilm);
  fpFolder
    .add(controls, 'noiseIntensity', 0, 3)
    .onChange(controls.updateEffectFilm);
  fpFolder.add(controls, 'grayscale').onChange(controls.updateEffectFilm);
  fpFolder
    .add(controls, 'scanlinesCount', 0, 2048)
    .step(1)
    .onChange(controls.updateEffectFilm);

  const dsFolder = gui.addFolder('DotScreenPass');
  dsFolder.add(controls, 'centerX', 0, 1).onChange(controls.updateDotScreen);
  dsFolder.add(controls, 'centerY', 0, 1).onChange(controls.updateDotScreen);
  dsFolder.add(controls, 'angle', 0, 3.14).onChange(controls.updateDotScreen);
  dsFolder.add(controls, 'scale', 0, 10).onChange(controls.updateDotScreen);

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

  const width = VIEWPORT_W || 2;
  const height = VIEWPORT_H || 2;
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  /* render */
  const render = () => {
    stats.update();

    const delta = clock.getDelta();
    orbitControls.update();
    sphere.rotation.y += 0.002;

    requestAnimationFrame(render);
    renderer.autoClear = false;
    renderer.clear();
    renderer.setViewport(0, 0, 2 * halfWidth, 2 * halfHeight);
    composer.render(delta);

    renderer.setViewport(0, 0, halfWidth, halfHeight);
    composer1.render(delta);

    renderer.setViewport(halfWidth, 0, halfWidth, halfHeight);
    composer2.render(delta);

    renderer.setViewport(0, halfHeight, halfWidth, halfHeight);
    composer3.render(delta);

    renderer.setViewport(halfWidth, halfHeight, halfWidth, halfHeight);
    composer4.render(delta);
  };
  render();
};

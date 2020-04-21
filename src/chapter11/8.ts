import * as THREE from 'three';
import * as Stats from 'stats.js';
import * as dat from 'dat.gui';
import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls';
import { SceneUtils } from '../../node_modules/three/examples/jsm/utils/SceneUtils';
import { EffectComposer } from '../../node_modules/three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from '../../node_modules/three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from '../../node_modules/three/examples/jsm/postprocessing/ShaderPass';
import { CopyShader } from '../../node_modules/three/examples/jsm/shaders/CopyShader';

export default () => {
  type ShaderModule = {
    default: string;
  };

  const GrayScaleVertexShader: ShaderModule = require('./GrayScaleShader.vs');
  const GrayScaleFragmentShader: ShaderModule = require('./GrayScaleShader.fs');
  const BitVertexShader: ShaderModule = require('./BitShader.vs');
  const BitFragmentShader: ShaderModule = require('./BitShader.fs');

  const CustomGrayScaleShader = {
    uniforms: {
      tDiffuse: { type: 't', value: null },
      rPower: { type: 'f', value: 0.2126 },
      gPower: { type: 'f', value: 0.7152 },
      bPower: { type: 'f', value: 0.0722 },
    },
    vertexShader: GrayScaleVertexShader.default,
    fragmentShader: GrayScaleFragmentShader.default,
  };

  const CustomBitShader = {
    uniforms: {
      tDiffuse: { type: 't', value: null },
      bitSize: { type: 'i', value: 4 },
    },
    vertexShader: BitVertexShader.default,
    fragmentShader: BitFragmentShader.default,
  };

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

  const ambi = new THREE.AmbientLight(0x181818);
  scene.add(ambi);

  const spotLight = new THREE.DirectionalLight(0xffffff);
  spotLight.position.set(550, 100, 550);
  spotLight.intensity = 0.6;
  scene.add(spotLight);

  document.getElementById('WebGL-output').appendChild(renderer.domElement);

  const createMesh = (geom: THREE.SphereGeometry) => {
    const textureLoader = new THREE.TextureLoader();
    const planetTexture = textureLoader.load('./assets/tex/Earth.png');
    const specularTexture = textureLoader.load('./assets/tex/EarthSpec.png');
    const normalTexture = textureLoader.load('./assets/tex/EarthNormal.png');
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

  const shaderPass = new ShaderPass(CustomGrayScaleShader);
  shaderPass.enabled = false;

  const bitPass = new ShaderPass(CustomBitShader);
  bitPass.enabled = false;

  const composer = new EffectComposer(renderer);
  composer.addPass(renderPass);
  composer.addPass(shaderPass);
  composer.addPass(bitPass);
  composer.addPass(effectCopy);

  const controls = {
    grayScale: false,
    rPower: 0.2126,
    gPower: 0.7152,
    bPower: 0.0722,
    bitShader: false,
    bitSize: 8,
    updateEffectFilm: () => {
      shaderPass.enabled = controls.grayScale;
      (shaderPass.uniforms as any).rPower.value = controls.rPower;
      (shaderPass.uniforms as any).gPower.value = controls.gPower;
      (shaderPass.uniforms as any).bPower.value = controls.bPower;
    },
    updateBit: () => {
      bitPass.enabled = controls.bitShader;
      (bitPass.uniforms as any).bitSize.value = controls.bitSize;
    },
  };

  const gui = new dat.GUI();
  const grayMenu = gui.addFolder('gray scale');
  grayMenu.add(controls, 'grayScale').onChange(controls.updateEffectFilm);
  grayMenu.add(controls, 'rPower', 0, 1).onChange(controls.updateEffectFilm);
  grayMenu.add(controls, 'gPower', 0, 1).onChange(controls.updateEffectFilm);
  grayMenu.add(controls, 'bPower', 0, 1).onChange(controls.updateEffectFilm);

  const bitMenu = gui.addFolder('bit');
  bitMenu.add(controls, 'bitShader').onChange(controls.updateBit);
  bitMenu.add(controls, 'bitSize', 2, 24).step(1).onChange(controls.updateBit);

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
    orbitControls.update();
    sphere.rotation.y += 0.002;

    requestAnimationFrame(renderScene);
    composer.render(delta);
  };
  renderScene();
};

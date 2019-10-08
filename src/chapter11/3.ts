import * as THREE from 'three';
import * as Stats from 'stats.js';
import * as dat from 'dat.gui';
import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls';
import { SceneUtils } from '../../node_modules/three/examples/jsm/utils/SceneUtils';
import { EffectComposer } from '../../node_modules/three/examples/jsm/postprocessing/EffectComposer';
import { GlitchPass } from '../../node_modules/three/examples/jsm/postprocessing/GlitchPass';
import { RenderPass } from '../../node_modules/three/examples/jsm/postprocessing/RenderPass';

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

  const ambi = new THREE.AmbientLight(0x181818);
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

  const renderPass = new RenderPass(scene, camera);

  const effectGlitch = new GlitchPass(64);
  effectGlitch.renderToScreen = true;

  const composer = new EffectComposer(renderer);
  composer.addPass(renderPass);
  composer.addPass(effectGlitch);

  const sphere = createMesh(new THREE.SphereGeometry(10, 40, 40));
  scene.add(sphere);

  const clock = new THREE.Clock();

  const controls = {
    goWild: false,
    updateEffect: () => {
      effectGlitch.goWild = controls.goWild;
    }
  };
  const gui = new dat.GUI();
  gui.add(controls, 'goWild').onChange(controls.updateEffect);

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
    orbitControls.update();

    sphere.rotation.y += 0.002;

    requestAnimationFrame(renderScene);
    const delta = clock.getDelta();
    composer.render(delta);
  };
  renderScene();
};

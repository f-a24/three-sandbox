import * as THREE from 'three';
import * as Stats from 'stats.js';
import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls';
import { SceneUtils } from '../../node_modules/three/examples/jsm/utils/SceneUtils';
import { EffectComposer } from '../../node_modules/three/examples/jsm/postprocessing/EffectComposer';
import {
  ClearMaskPass,
  MaskPass
} from '../../node_modules/three/examples/jsm/postprocessing/MaskPass';
import { RenderPass } from '../../node_modules/three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from '../../node_modules/three/examples/jsm/postprocessing/ShaderPass';
import { CopyShader } from '../../node_modules/three/examples/jsm/shaders/CopyShader';
import { SepiaShader } from '../../node_modules/three/examples/jsm/shaders/SepiaShader';
import { ColorifyShader } from '../../node_modules/three/examples/jsm/shaders/ColorifyShader';

export default () => {
  // 画面サイズ
  const VIEWPORT_W = window.innerWidth;
  const VIEWPORT_H = window.innerHeight;

  /* scene */
  const sceneEarth = new THREE.Scene();
  const sceneMars = new THREE.Scene();
  const sceneBG = new THREE.Scene();

  /* camera */
  const camera = new THREE.PerspectiveCamera(
    45,
    VIEWPORT_W / VIEWPORT_H,
    0.1,
    1000
  );
  const cameraBG = new THREE.OrthographicCamera(
    -VIEWPORT_W,
    VIEWPORT_W,
    VIEWPORT_H,
    -VIEWPORT_H,
    -10000,
    10000
  );
  cameraBG.position.z = 50;
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
  const ambi2 = new THREE.AmbientLight(0x181818);
  sceneEarth.add(ambi);
  sceneMars.add(ambi2);

  const spotLight = new THREE.DirectionalLight(0xffffff);
  spotLight.position.set(550, 100, 550);
  spotLight.intensity = 0.6;

  const spotLight2 = new THREE.DirectionalLight(0xffffff);
  spotLight.position.set(550, 100, 550);
  spotLight.intensity = 0.6;

  sceneEarth.add(spotLight);
  sceneMars.add(spotLight2);

  document.getElementById('WebGL-output').appendChild(renderer.domElement);

  const textureLoader = new THREE.TextureLoader();
  const materialColor = new THREE.MeshBasicMaterial({
    map: textureLoader.load('./assets/tex/starry-deep-outer-space-galaxy.jpg'),
    depthTest: false
  });
  const bgPlane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), materialColor);
  bgPlane.position.z = -100;
  bgPlane.scale.set(window.innerWidth * 2, window.innerHeight * 2, 1);
  sceneBG.add(bgPlane);

  const createMarshMesh = (geom: THREE.SphereGeometry) => {
    const textureLoader = new THREE.TextureLoader();
    const planetTexture = textureLoader.load('./assets/tex/Mars_2k-050104.png');
    const normalTexture = textureLoader.load(
      './assets/tex/Mars-normalmap_2k.png'
    );
    const planetMaterial = new THREE.MeshPhongMaterial();
    planetMaterial.normalMap = normalTexture;
    planetMaterial.map = planetTexture;
    return SceneUtils.createMultiMaterialObject(geom, [planetMaterial]);
  };

  const createEarthMesh = (geom: THREE.SphereGeometry) => {
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

  const sphere = createEarthMesh(new THREE.SphereGeometry(10, 40, 40));
  sphere.position.x = -10;

  const sphere2 = createMarshMesh(new THREE.SphereGeometry(5, 40, 40));
  sphere2.position.x = 10;

  sceneEarth.add(sphere);
  sceneMars.add(sphere2);

  const bgPass = new RenderPass(sceneBG, cameraBG);
  const renderPass = new RenderPass(sceneEarth, camera);
  renderPass.clear = false;

  const renderPass2 = new RenderPass(sceneMars, camera);
  renderPass2.clear = false;

  const effectCopy = new ShaderPass(CopyShader);
  effectCopy.renderToScreen = true;

  const clearMask = new ClearMaskPass();
  const earthMask = new MaskPass(sceneEarth, camera);
  const marsMask = new MaskPass(sceneMars, camera);

  const effectSepia = new ShaderPass(SepiaShader);
  (effectSepia.uniforms as any).amount.value = 0.8;

  const effectColorify = new ShaderPass(ColorifyShader);
  (effectColorify.uniforms as any).color.value.setRGB(0.5, 0.5, 1);

  const composer = new EffectComposer(renderer);
  composer.renderTarget1.stencilBuffer = true;
  composer.renderTarget2.stencilBuffer = true;
  composer.addPass(bgPass);
  composer.addPass(renderPass);
  composer.addPass(renderPass2);
  composer.addPass(marsMask);
  composer.addPass(effectColorify);
  composer.addPass(clearMask);
  composer.addPass(earthMask);
  composer.addPass(effectSepia);
  composer.addPass(clearMask);
  composer.addPass(effectCopy);

  const clock = new THREE.Clock();

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
    renderer.autoClear = false;
    stats.update();
    orbitControls.update();

    sphere.rotation.y += 0.002;
    sphere2.rotation.y += 0.002;

    requestAnimationFrame(renderScene);
    const delta = clock.getDelta();
    composer.render(delta);
  };
  renderScene();
};

import * as THREE from 'three';
import * as Stats from 'stats.js';
import * as dat from 'dat.gui';
import { WebGLDeferredRenderer } from '../../node_modules/three/examples/jsm/renderers/WebGLDeferredRenderer';
import 'imports-loader?THREE=three!../../node_modules/three/examples/js/postprocessing/EffectComposer';
import 'imports-loader?THREE=three!../../node_modules/three/examples/js/shaders/CopyShader';
import 'imports-loader?THREE=three!../../node_modules/three/examples/js/postprocessing/RenderPass';
import 'imports-loader?THREE=three!../../node_modules/three/examples/js/postprocessing/ShaderPass';
import 'imports-loader?THREE=three!../../node_modules/three/examples/js/shaders/FXAAShader';
import 'imports-loader?THREE=three!../../node_modules/three/examples/js/lights/RectAreaLightUniformsLib';

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
  camera.position.x = 20;
  camera.position.y = 30;
  camera.position.z = 21;
  camera.lookAt(new THREE.Vector3(0, 0, -30));

  /* renderer */
  const renderer = new WebGLDeferredRenderer({
    width: window.innerWidth,
    height: window.innerHeight,
    antialias: true,
    cacheKeepAlive: true
  });

  /* plane */
  const planeGeometry = new THREE.PlaneGeometry(70, 70, 1, 1);
  const planeMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    specular: 0xffffff,
    shininess: 200
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 0;
  plane.position.y = 0;
  plane.position.z = 0;
  scene.add(plane);

  const spotLight0 = new THREE.SpotLight(0xcccccc);
  spotLight0.position.set(-40, 60, -10);
  spotLight0.intensity = 0.1;
  spotLight0.lookAt(plane.position);
  scene.add(spotLight0);

  const areaLight1 = new THREE.RectAreaLight(0xff0000, 3);
  areaLight1.position.set(-10, 10, -35);
  areaLight1.rotation.set(-Math.PI / 2, 0, 0);
  areaLight1.width = 4;
  areaLight1.height = 9.9;
  scene.add(areaLight1);

  const areaLight2 = new THREE.RectAreaLight(0x00ff00, 3);
  areaLight2.position.set(0, 10, -35);
  areaLight2.rotation.set(-Math.PI / 2, 0, 0);
  areaLight2.width = 4;
  areaLight2.height = 9.9;
  scene.add(areaLight2);

  const areaLight3 = new THREE.RectAreaLight(0x0000ff, 3);
  areaLight3.position.set(10, 10, -35);
  areaLight3.rotation.set(-Math.PI / 2, 0, 0);
  areaLight3.width = 4;
  areaLight3.height = 9.9;
  scene.add(areaLight3);

  const planeGeometry1 = new THREE.BoxGeometry(4, 10, 0);
  const planeGeometry1Mat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  let plane1 = new THREE.Mesh(planeGeometry1, planeGeometry1Mat);
  plane1.position.copy(areaLight1.position);
  scene.add(plane1);

  const planeGeometry2 = new THREE.BoxGeometry(4, 10, 0);
  const planeGeometry2Mat = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  let plane2 = new THREE.Mesh(planeGeometry2, planeGeometry2Mat);
  plane2.position.copy(areaLight2.position);
  scene.add(plane2);

  const planeGeometry3 = new THREE.BoxGeometry(4, 10, 0);
  const planeGeometry3Mat = new THREE.MeshBasicMaterial({ color: 0x0000ff });
  let plane3 = new THREE.Mesh(planeGeometry3, planeGeometry3Mat);
  plane3.position.copy(areaLight3.position);
  scene.add(plane3);

  document.getElementById('WebGL-output').appendChild(renderer.domElement);

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

  /* gui */
  const controls = {
    rotationSpeed: 0.02,
    color1: 0xff0000,
    intensity1: 2,
    color2: 0x00ff00,
    intensity2: 2,
    color3: 0x0000ff,
    intensity3: 2
  };
  const gui = new dat.GUI();
  gui
    .addColor(controls, 'color1')
    .onChange((e: string | number | THREE.Color) => {
      areaLight1.color = new THREE.Color(e);
      planeGeometry1Mat.color = new THREE.Color(e);
      scene.remove(plane1);
      plane1 = new THREE.Mesh(planeGeometry1, planeGeometry1Mat);
      plane1.position.copy(areaLight1.position);
      scene.add(plane1);
    });
  gui.add(controls, 'intensity1', 0, 5).onChange((e: number) => {
    areaLight1.intensity = e;
  });
  gui
    .addColor(controls, 'color2')
    .onChange((e: string | number | THREE.Color) => {
      areaLight2.color = new THREE.Color(e);
      planeGeometry2Mat.color = new THREE.Color(e);
      scene.remove(plane2);
      plane2 = new THREE.Mesh(planeGeometry2, planeGeometry2Mat);
      plane2.position.copy(areaLight2.position);
      scene.add(plane2);
    });
  gui.add(controls, 'intensity2', 0, 5).onChange((e: number) => {
    areaLight2.intensity = e;
  });
  gui
    .addColor(controls, 'color3')
    .onChange((e: string | number | THREE.Color) => {
      areaLight3.color = new THREE.Color(e);
      planeGeometry3Mat.color = new THREE.Color(e);
      scene.remove(plane3);
      plane3 = new THREE.Mesh(planeGeometry1, planeGeometry3Mat);
      plane3.position.copy(areaLight3.position);
      scene.add(plane3);
    });
  gui.add(controls, 'intensity3', 0, 5).onChange((e: number) => {
    areaLight3.intensity = e;
  });

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
    renderer.render(scene, camera);
  };
  renderScene();
};

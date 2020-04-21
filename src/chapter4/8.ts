import * as THREE from 'three';
import * as Stats from 'stats.js';

type ShaderModule = {
  default: string;
};

const vertShaderModule: ShaderModule = require('./8.vert');
const fragmentShader1: ShaderModule = require('./8-1.frag');
const fragmentShader2: ShaderModule = require('./8-2.frag');
const fragmentShader3: ShaderModule = require('./8-3.frag');
const fragmentShader4: ShaderModule = require('./8-4.frag');
const fragmentShader5: ShaderModule = require('./8-5.frag');
const fragmentShader6: ShaderModule = require('./8-6.frag');

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

  camera.position.x = 30;
  camera.position.y = 30;
  camera.position.z = 30;
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  /* renderer */
  const webGLRenderer = new THREE.WebGLRenderer();
  webGLRenderer.setClearColor(new THREE.Color(0x000000));
  webGLRenderer.setSize(VIEWPORT_W, VIEWPORT_H);
  webGLRenderer.shadowMap.enabled = true;

  const createMaterial = (vertShader: string, fragShader: string) => {
    const uniforms = {
      time: { type: 'f', value: 0.2 },
      scale: { type: 'f', value: 0.2 },
      alpha: { type: 'f', value: 0.6 },
      resolution: { type: 'v2', value: new THREE.Vector2() },
    };
    uniforms.resolution.value.x = window.innerWidth;
    uniforms.resolution.value.y = window.innerHeight;
    const meshMaterial = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: vertShader,
      fragmentShader: fragShader,
      transparent: true,
    });
    return meshMaterial;
  };

  const cubeGeometry = new THREE.BoxGeometry(20, 20, 20);

  const meshMaterial1 = createMaterial(
    vertShaderModule.default,
    fragmentShader1.default
  );
  const meshMaterial2 = createMaterial(
    vertShaderModule.default,
    fragmentShader2.default
  );
  const meshMaterial3 = createMaterial(
    vertShaderModule.default,
    fragmentShader3.default
  );
  const meshMaterial4 = createMaterial(
    vertShaderModule.default,
    fragmentShader4.default
  );
  const meshMaterial5 = createMaterial(
    vertShaderModule.default,
    fragmentShader5.default
  );
  const meshMaterial6 = createMaterial(
    vertShaderModule.default,
    fragmentShader6.default
  );
  const cube = new THREE.Mesh(cubeGeometry, [
    meshMaterial1,
    meshMaterial2,
    meshMaterial3,
    meshMaterial4,
    meshMaterial5,
    meshMaterial6,
  ]);
  // const cube = new THREE.Mesh(cubeGeometry, [
  //   meshMaterial2,
  //   meshMaterial2,
  //   meshMaterial1,
  //   meshMaterial1,
  //   meshMaterial1,
  //   meshMaterial1
  // ]);
  scene.add(cube);

  const ambientLight = new THREE.AmbientLight(0x0c0c0c);
  scene.add(ambientLight);

  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-40, 60, -10);
  spotLight.castShadow = true;
  scene.add(spotLight);

  document.getElementById('WebGL-output').appendChild(webGLRenderer.domElement);

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
      webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    },
    false
  );

  /* render */
  let step = 0;
  const renderScene = () => {
    stats.update();

    cube.rotation.y = step += 0.01;
    cube.rotation.x = step;
    cube.rotation.z = step;

    (cube.material as THREE.ShaderMaterial[]).forEach((m) => {
      m.uniforms.time.value += 0.01;
    });
    requestAnimationFrame(renderScene);
    webGLRenderer.render(scene, camera);
  };
  renderScene();
};

import * as THREE from 'three';
import * as Stats from 'stats.js';
import * as dat from 'dat.gui';

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
  camera.position.set(0, 1, 28);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  const ambiLight = new THREE.AmbientLight(0x141414);
  scene.add(ambiLight);

  const light = new THREE.DirectionalLight();
  light.position.set(0, 30, 20);
  scene.add(light);

  /* renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xeeeeee));
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);
  renderer.shadowMap.enabled = true;

  document.getElementById('WebGL-output').appendChild(renderer.domElement);

  const createVideoArea = () => {
    const video = document.createElement('video');

    video.src = './assets/Big_Buck_Bunny_small.ogv';
    video.controls = true;
    video.autoplay = true;

    video.width = 350;
    video.height = 350;

    video.style.position = 'fixed';
    video.style.left = '0';
    video.style.bottom = '0';

    return video;
  };
  const video = createVideoArea();
  document.body.appendChild(video);

  const createMesh = (geom: THREE.BoxGeometry) => {
    const texture = new THREE.VideoTexture(video);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;

    const materialArray = [];
    materialArray.push(new THREE.MeshBasicMaterial({ color: 0x0051ba }));
    materialArray.push(new THREE.MeshBasicMaterial({ color: 0x0051ba }));
    materialArray.push(new THREE.MeshBasicMaterial({ color: 0x0051ba }));
    materialArray.push(new THREE.MeshBasicMaterial({ color: 0x0051ba }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture }));
    materialArray.push(new THREE.MeshBasicMaterial({ color: 0xff51ba }));
    const faceMaterial = new THREE.MultiMaterial(materialArray);

    return new THREE.Mesh(geom, faceMaterial);
  };

  const cube = createMesh(new THREE.BoxGeometry(22, 16, 0.2));
  cube.position.y = 2;
  scene.add(cube);

  const controls = {
    showVideo: false,
    rotate: false,
    showCanvas: () => {
      if (controls.showVideo) {
        video.style.display = 'block';
      } else {
        video.style.display = 'none';
      }
    },
  };

  const gui = new dat.GUI();
  gui.add(controls, 'rotate');
  gui.add(controls, 'showVideo').onChange(controls.showCanvas);

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

    if (controls.rotate) {
      cube.rotation.x += -0.01;
      cube.rotation.y += -0.01;
      cube.rotation.z += -0.01;
    }

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  };
  renderScene();
};

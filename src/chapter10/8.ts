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
  camera.position.set(0, 12, 20);
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

  const createMesh = (geom, texFile) => {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(`./assets/tex/${texFile}`);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    geom.computeVertexNormals();

    const mat = new THREE.MeshPhongMaterial();
    mat.map = texture;
    return new THREE.Mesh(geom, mat);
  };

  const sphere = createMesh(
    new THREE.SphereGeometry(5, 20, 20),
    'floor-wood.jpg'
  );
  scene.add(sphere);
  sphere.position.x = 7;

  const cube = createMesh(new THREE.BoxGeometry(6, 6, 6), 'brick-wall.jpg');
  cube.position.x = -7;
  scene.add(cube);

  const controls = {
    repeatX: 1,
    repeatY: 1,
    repeatWrapping: true,
    wrapping: 'repeat',
    updateRepeat: () => {
      let wrapping: THREE.Wrapping;
      (cube.material as THREE.MeshPhongMaterial).map.repeat.set(
        controls.repeatX,
        controls.repeatY
      );
      (sphere.material as THREE.MeshPhongMaterial).map.repeat.set(
        controls.repeatX,
        controls.repeatY
      );
      if (controls.wrapping === 'repeat') {
        wrapping = THREE.RepeatWrapping;
      } else if (controls.wrapping === 'mirrored repeat') {
        wrapping = THREE.MirroredRepeatWrapping;
      } else if (controls.wrapping === 'clamp to edge') {
        wrapping = THREE.ClampToEdgeWrapping;
      }
      (cube.material as THREE.MeshPhongMaterial).map.wrapS = wrapping;
      (cube.material as THREE.MeshPhongMaterial).map.wrapT = wrapping;

      (sphere.material as THREE.MeshPhongMaterial).map.wrapS = wrapping;
      (sphere.material as THREE.MeshPhongMaterial).map.wrapT = wrapping;

      (cube.material as THREE.MeshPhongMaterial).map.needsUpdate = true;
      (sphere.material as THREE.MeshPhongMaterial).map.needsUpdate = true;
    }
  };

  const gui = new dat.GUI();
  gui.add(controls, 'repeatX', -4, 4).onChange(controls.updateRepeat);
  gui.add(controls, 'repeatY', -4, 4).onChange(controls.updateRepeat);
  gui
    .add(controls, 'wrapping', ['repeat', 'mirrored repeat', 'clamp to edge'])
    .onChange(controls.updateRepeat);

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

  let step = 0;

  /* render */
  const renderScene = () => {
    stats.update();
    step += 0.01;

    cube.rotation.y = step;
    cube.rotation.x = step;

    sphere.rotation.y = step;
    sphere.rotation.x = step;

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  };
  renderScene();
};

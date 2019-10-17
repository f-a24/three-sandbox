import * as THREE from 'three';
import * as chroma from 'chroma-js';
import * as dat from 'dat.gui';
import * as Stats from 'stats.js';
import 'imports-loader?THREE=three!../libs/physi';

export default () => {
  // 画面サイズ
  const VIEWPORT_W = window.innerWidth;
  const VIEWPORT_H = window.innerHeight;

  const scale = chroma.scale(['white', 'blue', 'red', 'yellow']);

  // physijs設定
  Physijs.scripts.worker = '../libs/physijs_worker.js';
  Physijs.scripts.ammo = '../libs/ammo.js';

  /* scene */
  const scene = new Physijs.Scene();
  scene.setGravity(new THREE.Vector3(0, -90, 0));

  /* camera */
  const camera = new THREE.PerspectiveCamera(
    35,
    VIEWPORT_W / VIEWPORT_H,
    1,
    1000
  );
  camera.position.set(80, 60, 80);
  camera.lookAt(new THREE.Vector3(10, 0, 10));
  scene.add(camera);

  /* renderer */
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);

  const light = new THREE.SpotLight(0xffffff);
  light.position.set(20, 100, 50);
  scene.add(light);

  document.getElementById('WebGL-output').appendChild(renderer.domElement);

  // Materials
  const textureLoader = new THREE.TextureLoader();
  const ground_material = Physijs.createMaterial(
    new THREE.MeshPhongMaterial({
      map: textureLoader.load('./assets/tex/floor-wood.jpg')
    }),
    0.9,
    0.6
  );
  (ground_material as any).map.wrapS = THREE.RepeatWrapping;
  (ground_material as any).map.wrapT = THREE.RepeatWrapping;
  (ground_material as any).map.repeat.set(4, 8);

  const ground = new Physijs.BoxMesh(
    new THREE.BoxGeometry(60, 1, 130),
    ground_material,
    0
  );
  ground.receiveShadow = true;

  const borderLeft = new Physijs.BoxMesh(
    new THREE.BoxGeometry(2, 6, 130),
    ground_material,
    0
  );
  borderLeft.position.x = -31;
  borderLeft.position.y = 2;
  ground.add(borderLeft);

  const borderRight = new Physijs.BoxMesh(
    new THREE.BoxGeometry(2, 6, 130),
    ground_material,
    0
  );
  borderRight.position.x = 31;
  borderRight.position.y = 2;
  ground.add(borderRight);

  const borderBottom = new Physijs.BoxMesh(
    new THREE.BoxGeometry(64, 6, 2),
    ground_material,
    0
  );
  borderBottom.position.z = 65;
  borderBottom.position.y = 2;
  ground.add(borderBottom);

  const borderTop = new Physijs.BoxMesh(
    new THREE.BoxGeometry(64, 6, 2),
    ground_material,
    0
  );
  borderTop.position.z = -65;
  borderTop.position.y = 2;
  ground.add(borderTop);
  scene.add(ground);

  let meshes = [];
  const controls = {
    cubeRestitution: 0.4,
    cubeFriction: 0.4,
    sphereRestitution: 0.9,
    sphereFriction: 0.1,
    clearMeshes: () => {
      meshes.forEach(e => {
        scene.remove(e);
      });
      meshes = [];
    },
    addSpheres: () => {
      const colorSphere = scale(Math.random()).hex();
      for (let i = 0; i < 5; i++) {
        const sphere = new Physijs.SphereMesh(
          new THREE.SphereGeometry(2, 20),
          Physijs.createMaterial(
            new THREE.MeshPhongMaterial({
              color: colorSphere,
              opacity: 0.8,
              transparent: true
            }),
            controls.sphereFriction,
            controls.sphereRestitution
          )
        );
        sphere.position.set(
          Math.random() * 50 - 25,
          20 + Math.random() * 5,
          Math.random() * 50 - 25
        );
        meshes.push(sphere);
        scene.add(sphere);
      }
    },
    addCubes: () => {
      const colorBox = scale(Math.random()).hex();
      for (let i = 0; i < 5; i++) {
        const box = new Physijs.BoxMesh(
          new THREE.BoxGeometry(4, 4, 4),
          Physijs.createMaterial(
            new THREE.MeshPhongMaterial({
              color: colorBox,
              opacity: 0.8,
              transparent: true
            }),
            controls.cubeFriction,
            controls.cubeRestitution
          )
        );
        box.position.set(
          Math.random() * 50 - 25,
          20 + Math.random() * 5,
          Math.random() * 50 - 25
        );
        box.rotation.set(
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2
        );
        meshes.push(box);
        scene.add(box);
      }
    }
  };

  const gui = new dat.GUI();
  gui.add(controls, 'cubeRestitution', 0, 1);
  gui.add(controls, 'cubeFriction', 0, 1);
  gui.add(controls, 'sphereRestitution', 0, 1);
  gui.add(controls, 'sphereFriction', 0, 1);
  gui.add(controls, 'addCubes');
  gui.add(controls, 'addSpheres');
  gui.add(controls, 'clearMeshes');

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

  let direction = 1;
  /* render */
  const renderScene = () => {
    stats.update();

    ground.rotation.x += 0.002 * direction;
    if (ground.rotation.x < -0.4) direction = 1;
    if (ground.rotation.x > 0.4) direction = -1;
    (ground as any).__dirtyRotation = true;

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
    scene.simulate(undefined, 1);
  };
  renderScene();
};

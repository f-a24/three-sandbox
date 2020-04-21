import * as THREE from 'three';
import * as chroma from 'chroma-js';
import * as dat from 'dat.gui';
import * as Stats from 'stats.js';
import 'imports-loader?THREE=three!../libs/physi';

export default () => {
  // 画面サイズ
  const VIEWPORT_W = window.innerWidth;
  const VIEWPORT_H = window.innerHeight;

  const scale = chroma.scale(['green', 'white']);

  // physijs設定
  Physijs.scripts.worker = './libs/physijs_worker.js';
  Physijs.scripts.ammo = '../libs/ammo.js';

  /* scene */
  const scene = new Physijs.Scene();
  scene.setGravity(new THREE.Vector3(0, -50, 0));

  /* camera */
  const camera = new THREE.PerspectiveCamera(
    35,
    VIEWPORT_W / VIEWPORT_H,
    1,
    1000
  );
  camera.position.set(50, 30, 50);
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

  const textureLoader = new THREE.TextureLoader();
  const groundMaterial = Physijs.createMaterial(
    new THREE.MeshPhongMaterial({
      map: textureLoader.load('./assets/tex/wood-2.jpg'),
    }),
    0.9,
    0.3
  );

  const ground = new Physijs.BoxMesh(
    new THREE.BoxGeometry(60, 1, 60),
    groundMaterial,
    0
  );
  const borderLeft = new Physijs.BoxMesh(
    new THREE.BoxGeometry(2, 3, 60),
    groundMaterial,
    0
  );
  borderLeft.position.x = -31;
  borderLeft.position.y = 2;
  ground.add(borderLeft);

  const borderRight = new Physijs.BoxMesh(
    new THREE.BoxGeometry(2, 3, 60),
    groundMaterial,
    0
  );
  borderRight.position.x = 31;
  borderRight.position.y = 2;
  ground.add(borderRight);

  const borderBottom = new Physijs.BoxMesh(
    new THREE.BoxGeometry(64, 3, 2),
    groundMaterial,
    0
  );
  borderBottom.position.z = 30;
  borderBottom.position.y = 2;
  ground.add(borderBottom);

  const borderTop = new Physijs.BoxMesh(
    new THREE.BoxGeometry(64, 3, 2),
    groundMaterial,
    0
  );
  borderTop.position.z = -30;
  borderTop.position.y = 2;
  ground.add(borderTop);
  scene.add(ground);

  const points = [];
  const r = 27;
  const cX = 0;
  const cY = 0;
  let circleOffset = 0;
  for (let i = 0; i < 1000; i += 6 + circleOffset) {
    circleOffset = 4.5 * (i / 360);
    const x = (r / 1440) * (1440 - i) * Math.cos(i * (Math.PI / 180)) + cX;
    const z = (r / 1440) * (1440 - i) * Math.sin(i * (Math.PI / 180)) + cY;
    const y = 0;
    points.push(new THREE.Vector3(x, y, z));
  }

  let stones: Physijs.BoxMesh[] = [];
  const controls = {
    gravityX: 0,
    gravityY: -50,
    gravityZ: 0,
    resetScene: () => {
      scene.setGravity(
        new THREE.Vector3(
          controls.gravityX,
          controls.gravityY,
          controls.gravityZ
        )
      );
      stones.forEach((st) => {
        scene.remove(st);
      });
      stones = [];
      points.forEach((point) => {
        const stoneGeom = new THREE.BoxGeometry(0.6, 6, 2);
        const stone = new Physijs.BoxMesh(
          stoneGeom,
          Physijs.createMaterial(
            new THREE.MeshPhongMaterial({
              color: scale(Math.random()).hex(),
              transparent: true,
              opacity: 0.8,
            })
          )
        );

        stone.position.copy(point);
        stone.lookAt(scene.position);
        (stone as any).__dirtyRotation = true;
        stone.position.y = 3.5;
        scene.add(stone);
        stones.push(stone);
      });
      stones[0].rotation.x = 0.2;
      (stones[0] as any).__dirtyRotation = true;
    },
  };

  const gui = new dat.GUI();
  gui.add(controls, 'gravityX', -100, 100);
  gui.add(controls, 'gravityY', -100, 100);
  gui.add(controls, 'gravityZ', -100, 100);
  gui.add(controls, 'resetScene');
  controls.resetScene();

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
    renderer.render(scene, camera);
    scene.simulate(undefined, 1);
  };
  renderScene();
};

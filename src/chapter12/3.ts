import * as THREE from 'three';
import * as chroma from 'chroma-js';
import * as dat from 'dat.gui';
import * as Stats from 'stats.js';
import 'imports-loader?THREE=three!../libs/physi';
import Perlin from '../libs/perlin.js';

export default () => {
  // 画面サイズ
  const VIEWPORT_W = window.innerWidth;
  const VIEWPORT_H = window.innerHeight;

  const scale = chroma.scale(['blue', 'white']);

  // physijs設定
  Physijs.scripts.worker = './libs/physijs_worker.js';
  Physijs.scripts.ammo = '../libs/ammo.js';

  /* scene */
  const scene = new Physijs.Scene({ fixedTimeStep: 1 / 60 });
  scene.setGravity(new THREE.Vector3(0, -20, 0));

  /* camera */
  const camera = new THREE.PerspectiveCamera(
    35,
    VIEWPORT_W / VIEWPORT_H,
    1,
    1000
  );
  camera.position.set(105, 85, 85);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  scene.add(camera);

  /* renderer */
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);

  const ambi = new THREE.AmbientLight(0x222222);
  scene.add(ambi);

  const light = new THREE.SpotLight(0xffffff);
  light.position.set(40, 50, 100);
  light.castShadow = true;
  light.shadow.camera.near = 10;
  light.shadow.camera.far = 200;
  light.intensity = 1.5;
  scene.add(light);

  document.getElementById('WebGL-output').appendChild(renderer.domElement);

  const getMaterial = () =>
    Physijs.createMaterial(
      new THREE.MeshLambertMaterial({
        color: scale(Math.random()).hex(),
      }),
      0.5,
      0.7
    );

  const setPosAndShade = (obj: Physijs.Mesh) => {
    obj.position.set(Math.random() * 20 - 45, 40, Math.random() * 20 - 5);
    obj.rotation.set(
      Math.random() * 2 * Math.PI,
      Math.random() * 2 * Math.PI,
      Math.random() * 2 * Math.PI
    );
    obj.castShadow = true;
  };

  let meshes: Physijs.Mesh[] = [];
  const controls = {
    addSphereMesh: () => {
      const sphere = new Physijs.SphereMesh(
        new THREE.SphereGeometry(3, 20),
        getMaterial()
      );
      setPosAndShade(sphere);
      meshes.push(sphere);
      scene.add(sphere);
    },
    addBoxMesh: () => {
      const cube = new Physijs.BoxMesh(
        new THREE.BoxGeometry(4, 2, 6),
        getMaterial()
      );
      setPosAndShade(cube);
      meshes.push(cube);
      scene.add(cube);
    },
    addCylinderMesh: () => {
      const cylinder = new Physijs.CylinderMesh(
        new THREE.CylinderGeometry(2, 2, 6),
        getMaterial()
      );
      setPosAndShade(cylinder);
      meshes.push(cylinder);
      scene.add(cylinder);
    },
    addConeMesh: () => {
      const cone = new Physijs.ConeMesh(
        new THREE.CylinderGeometry(0, 3, 7, 20, 10),
        getMaterial()
      );
      setPosAndShade(cone);
      meshes.push(cone);
      scene.add(cone);
    },
    addPlaneMesh: () => {
      const plane = new Physijs.PlaneMesh(
        new THREE.PlaneGeometry(5, 5, 10, 10),
        getMaterial()
      );
      setPosAndShade(plane);
      meshes.push(plane);
      scene.add(plane);
    },
    addCapsuleMesh: () => {
      const merged = new THREE.Geometry();
      const cyl = new THREE.CylinderGeometry(2, 2, 6);
      const top = new THREE.SphereGeometry(2);
      const bot = new THREE.SphereGeometry(2);

      const matrix1 = new THREE.Matrix4();
      matrix1.makeTranslation(0, 3, 0);
      top.applyMatrix4(matrix1);

      const matrix2 = new THREE.Matrix4();
      matrix2.makeTranslation(0, -3, 0);
      bot.applyMatrix4(matrix2);

      merged.merge(top);
      merged.merge(bot);
      merged.merge(cyl);

      const capsule = new Physijs.CapsuleMesh(merged, getMaterial());
      setPosAndShade(capsule);
      meshes.push(capsule);
      scene.add(capsule);
    },
    addConvexMesh: () => {
      const convex = new Physijs.ConvexMesh(
        new THREE.TorusKnotGeometry(0.5, 0.3, 64, 8, 2, 3),
        getMaterial()
      );
      setPosAndShade(convex);
      meshes.push(convex);
      scene.add(convex);
    },
    clearMeshes: () => {
      meshes.forEach((e) => {
        scene.remove(e);
      });
      meshes = [];
    },
  };

  const gui = new dat.GUI();
  gui.add(controls, 'addPlaneMesh');
  gui.add(controls, 'addBoxMesh');
  gui.add(controls, 'addSphereMesh');
  gui.add(controls, 'addCylinderMesh');
  gui.add(controls, 'addConeMesh');
  gui.add(controls, 'addCapsuleMesh');
  gui.add(controls, 'addConvexMesh');
  gui.add(controls, 'clearMeshes');

  const createHeightMap = (pn: any) => {
    const textureLoader = new THREE.TextureLoader();
    const groundMaterial = Physijs.createMaterial(
      new THREE.MeshLambertMaterial({
        map: textureLoader.load('./assets/tex/grasslight-big.jpg'),
      }),
      0.3,
      0.8
    );
    const groundGeometry = new THREE.PlaneGeometry(120, 100, 100, 100);
    for (let i = 0; i < groundGeometry.vertices.length; i++) {
      const vertex = groundGeometry.vertices[i];
      const value = pn.noise(vertex.x / 10, vertex.y / 10, 0);
      vertex.z = value * 10;
    }
    groundGeometry.computeFaceNormals();
    groundGeometry.computeVertexNormals();
    const ground = new Physijs.HeightfieldMesh(
      groundGeometry,
      groundMaterial,
      0,
      100,
      100
    );
    ground.rotation.x = Math.PI / -2;
    ground.rotation.y = 0.4;
    ground.receiveShadow = true;
    return ground;
  };

  const date = new Date();
  const pn = new Perlin(`rnd${date.getTime()}`);
  const map = createHeightMap(pn);
  scene.add(map);

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

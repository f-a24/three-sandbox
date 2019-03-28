import * as THREE from 'three';
import * as Stats from 'stats.js';
import * as dat from 'dat.gui';
// import 'imports-loader?THREE=three!../../node_modules/three/examples/js/ParametricGeometries';

// declare module 'three' {
//   const ParametricGeometries: {
//     [func: string]: (u: number, v: number, dest: THREE.Vector3) => void;
//   };
// }

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
  camera.position.x = -30;
  camera.position.y = 50;
  camera.position.z = 50;
  camera.lookAt(new THREE.Vector3(10, -20, 0));

  /* renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xeeeeee));
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);
  renderer.shadowMap.enabled = true;

  /* spotLight */
  const spotLight = new THREE.DirectionalLight(0xffffff);
  spotLight.position.set(-20, 250, -50);
  spotLight.target.position.x = 30;
  spotLight.target.position.y = -40;
  spotLight.target.position.z = -20;
  spotLight.intensity = 0.3;

  const klein = (u: number, v: number, dest: THREE.Vector3) => {
    u *= Math.PI;
    v *= 2 * Math.PI;
    u = u * 2;
    var x, y, z;
    if (u < Math.PI) {
      x =
        3 * Math.cos(u) * (1 + Math.sin(u)) +
        2 * (1 - Math.cos(u) / 2) * Math.cos(u) * Math.cos(v);
      z =
        -8 * Math.sin(u) -
        2 * (1 - Math.cos(u) / 2) * Math.sin(u) * Math.cos(v);
    } else {
      x =
        3 * Math.cos(u) * (1 + Math.sin(u)) +
        2 * (1 - Math.cos(u) / 2) * Math.cos(v + Math.PI);
      z = -8 * Math.sin(u);
    }
    y = -2 * (1 - Math.cos(u) / 2) * Math.sin(v);
    dest.set(x, y, z);
  };

  const radialWave = (u: number, v: number, dest: THREE.Vector3) => {
    const r = 50;
    const x = Math.sin(u) * r;
    const z = Math.sin(v / 2) * 2 * r;
    const y = (Math.sin(u * 4 * Math.PI) + Math.cos(v * 2 * Math.PI)) * 2.8;
    dest.set(x, y, z);
  };

  const createMesh = (geom: THREE.Geometry) => {
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(-25, 0, -25));
    const meshMaterial = new THREE.MeshPhongMaterial({
      specular: 0xaaaafff,
      color: 0x3399ff,
      shininess: 40,
      side: THREE.DoubleSide
    });
    meshMaterial.side = THREE.DoubleSide;
    const mesh = new THREE.Mesh(geom, meshMaterial);
    return mesh;
  };

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
  let parametricMesh: THREE.Mesh;
  const controls = {
    func: 'radialWave',
    slices: 120,
    stacks: 120,
    redraw: () => {
      scene.remove(parametricMesh);
      const func = controls.func === 'radialWave' ? radialWave : klein; // THREE.ParametricGeometries.klein
      parametricMesh = createMesh(
        new THREE.ParametricGeometry(func, controls.slices, controls.stacks)
      );
      scene.add(parametricMesh);
    }
  };
  const gui = new dat.GUI();
  gui.add(controls, 'func', ['klein', 'radialWave']).onChange(controls.redraw);
  gui
    .add(controls, 'slices', 10, 200)
    .step(5)
    .onChange(controls.redraw);
  gui
    .add(controls, 'stacks', 10, 200)
    .step(5)
    .onChange(controls.redraw);

  controls.redraw();

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
  let step = 0;
  const renderScene = () => {
    stats.update();

    parametricMesh.rotation.y = step += 0.01;
    parametricMesh.rotation.x = step;

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  };
  renderScene();
};

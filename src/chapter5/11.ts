import * as THREE from 'three';
import * as Stats from 'stats.js';
import * as dat from 'dat.gui';
import { SceneUtils } from '../../node_modules/three/examples/jsm/utils/SceneUtils';

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
  camera.position.y = 40;
  camera.position.z = 50;
  camera.lookAt(new THREE.Vector3(10, 0, 0));

  /* renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xeeeeee));
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);
  renderer.shadowMap.enabled = true;

  const createMesh = (geom: THREE.Geometry) => {
    const meshMaterial = new THREE.MeshNormalMaterial();
    meshMaterial.side = THREE.DoubleSide;
    const wireFrameMat = new THREE.MeshBasicMaterial();
    wireFrameMat.wireframe = true;
    const mesh = SceneUtils.createMultiMaterialObject(geom, [
      meshMaterial,
      wireFrameMat
    ]);
    return mesh;
  };

  /* polyhedron */
  let polyhedron = createMesh(new THREE.IcosahedronGeometry(10, 0));
  scene.add(polyhedron);

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
    radius: 10,
    detail: 0,
    type: 'Icosahedron',
    redraw: () => {
      scene.remove(polyhedron);
      switch (controls.type) {
        case 'Icosahedron':
          polyhedron = createMesh(
            new THREE.IcosahedronGeometry(controls.radius, controls.detail)
          );
          break;
        case 'Tetrahedron':
          polyhedron = createMesh(
            new THREE.TetrahedronGeometry(controls.radius, controls.detail)
          );
          break;
        case 'Octahedron':
          polyhedron = createMesh(
            new THREE.OctahedronGeometry(controls.radius, controls.detail)
          );
          break;
        case 'Dodecahedron':
          polyhedron = createMesh(
            new THREE.DodecahedronGeometry(controls.radius, controls.detail)
          );
          break;
        case 'Custom':
          const vertices = [1, 1, 1, -1, -1, 1, -1, 1, -1, 1, -1, -1];
          const indices = [2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1];
          polyhedron = createMesh(
            new THREE.PolyhedronGeometry(
              vertices,
              indices,
              controls.radius,
              controls.detail
            )
          );
          break;
      }
      scene.add(polyhedron);
    }
  };
  const gui = new dat.GUI();
  gui
    .add(controls, 'radius', 0, 40)
    .step(1)
    .onChange(controls.redraw);
  gui
    .add(controls, 'detail', 0, 3)
    .step(1)
    .onChange(controls.redraw);
  gui
    .add(controls, 'type', [
      'Icosahedron',
      'Tetrahedron',
      'Octahedron',
      'Dodecahedron',
      'Custom'
    ])
    .onChange(controls.redraw);

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

    polyhedron.rotation.y = step += 0.01;

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  };
  renderScene();
};

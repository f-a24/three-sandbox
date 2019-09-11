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
  camera.position.x = -20;
  camera.position.y = 60;
  camera.position.z = 60;
  camera.lookAt(new THREE.Vector3(20, 20, 0));

  /* renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xeeeeee));
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);
  renderer.shadowMap.enabled = true;

  const drawShape = () => {
    const shape = new THREE.Shape();
    shape.moveTo(10, 10);
    shape.lineTo(10, 40);
    shape.bezierCurveTo(15, 25, 25, 25, 30, 40);
    shape.splineThru([
      new THREE.Vector2(32, 30),
      new THREE.Vector2(28, 20),
      new THREE.Vector2(30, 10)
    ]);
    shape.quadraticCurveTo(20, 15, 10, 10);
    const hole1 = new THREE.Path();
    hole1.absellipse(16, 24, 2, 3, 0, Math.PI * 2, true, 0);
    shape.holes.push(hole1);
    const hole2 = new THREE.Path();
    hole2.absellipse(23, 24, 2, 3, 0, Math.PI * 2, true, 0);
    shape.holes.push(hole2);
    const hole3 = new THREE.Path();
    hole3.absarc(20, 16, 2, 0, Math.PI, true);
    shape.holes.push(hole3);
    return shape;
  };

  const createMesh = (geom: THREE.Geometry) => {
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(-20, 0, 0));
    const meshMaterial = new THREE.MeshNormalMaterial({
      transparent: true,
      opacity: 0.7
    });
    const wireFrameMat = new THREE.MeshBasicMaterial();
    wireFrameMat.wireframe = true;
    const mesh = SceneUtils.createMultiMaterialObject(geom, [
      meshMaterial,
      wireFrameMat
    ]);
    return mesh;
  };

  let shape = createMesh(new THREE.ShapeGeometry(drawShape()));
  scene.add(shape);

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
    amount: 2,
    bevelThickness: 2,
    bevelSize: 0.5,
    bevelEnabled: true,
    bevelSegments: 3,
    curveSegments: 12,
    steps: 1,
    asGeom: () => {
      scene.remove(shape);
      const options = {
        amount: controls.amount,
        bevelThickness: controls.bevelThickness,
        bevelSize: controls.bevelSize,
        bevelSegments: controls.bevelSegments,
        bevelEnabled: controls.bevelEnabled,
        curveSegments: controls.curveSegments,
        steps: controls.steps
      };
      shape = createMesh(new THREE.ExtrudeGeometry(drawShape(), options));
      scene.add(shape);
    }
  };
  const gui = new dat.GUI();
  gui.add(controls, 'amount', 0, 20).onChange(controls.asGeom);
  gui.add(controls, 'bevelThickness', 0, 10).onChange(controls.asGeom);
  gui.add(controls, 'bevelSize', 0, 10).onChange(controls.asGeom);
  gui
    .add(controls, 'bevelSegments', 0, 30)
    .step(1)
    .onChange(controls.asGeom);
  gui.add(controls, 'bevelEnabled').onChange(controls.asGeom);
  gui
    .add(controls, 'curveSegments', 1, 30)
    .step(1)
    .onChange(controls.asGeom);
  gui
    .add(controls, 'steps', 1, 5)
    .step(1)
    .onChange(controls.asGeom);

  controls.asGeom();

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

    shape.rotation.y = step += 0.01;

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  };
  renderScene();
};

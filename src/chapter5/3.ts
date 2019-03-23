import * as THREE from 'three';
import * as Stats from 'stats.js';
import * as dat from 'dat.gui';

import createMultiMaterialObject from '../utils/createMultiMaterialObject';

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
    const mesh = createMultiMaterialObject(geom, [meshMaterial, wireFrameMat]);
    return mesh;
  };
  /* torus */
  let torus = createMesh(new THREE.RingGeometry());
  scene.add(torus);

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
    innerRadius: 0,
    outerRadius: 50,
    thetaSegments: 8,
    phiSegments: 8,
    thetaStart: 0,
    thetaLength: Math.PI * 2,
    redraw: () => {
      scene.remove(torus);
      torus = createMesh(
        new THREE.RingGeometry(
          controls.innerRadius,
          controls.outerRadius,
          controls.thetaSegments,
          controls.phiSegments,
          controls.thetaStart,
          controls.thetaLength
        )
      );
      scene.add(torus);
    }
  };
  const gui = new dat.GUI();
  gui.add(controls, 'innerRadius', 0, 40).onChange(controls.redraw);
  gui.add(controls, 'outerRadius', 0, 100).onChange(controls.redraw);
  gui
    .add(controls, 'thetaSegments', 1, 40)
    .step(1)
    .onChange(controls.redraw);
  gui
    .add(controls, 'phiSegments', 1, 20)
    .step(1)
    .onChange(controls.redraw);
  gui.add(controls, 'thetaStart', 0, Math.PI * 2).onChange(controls.redraw);
  gui.add(controls, 'thetaLength', 0, Math.PI * 2).onChange(controls.redraw);

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

    torus.rotation.y = step += 0.01;

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  };
  renderScene();
};

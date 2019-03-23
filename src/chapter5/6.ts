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
  camera.position.x = -20;
  camera.position.y = 30;
  camera.position.z = 40;
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

  /* sphere */
  let sphere = createMesh(new THREE.SphereGeometry(4, 10, 10));
  scene.add(sphere);

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
    radius: ((sphere.children[0] as THREE.Mesh)
      .geometry as THREE.SphereGeometry).parameters.radius,
    widthSegments: ((sphere.children[0] as THREE.Mesh)
      .geometry as THREE.SphereGeometry).parameters.widthSegments,
    heightSegments: ((sphere.children[0] as THREE.Mesh)
      .geometry as THREE.SphereGeometry).parameters.heightSegments,
    phiStart: 0,
    phiLength: Math.PI * 2,
    thetaStart: 0,
    thetaLength: Math.PI,
    redraw: () => {
      scene.remove(sphere);
      sphere = createMesh(
        new THREE.SphereGeometry(
          controls.radius,
          controls.widthSegments,
          controls.heightSegments,
          controls.phiStart,
          controls.phiLength,
          controls.thetaStart,
          controls.thetaLength
        )
      );
      scene.add(sphere);
    }
  };
  const gui = new dat.GUI();
  gui.add(controls, 'radius', 0, 40).onChange(controls.redraw);
  gui.add(controls, 'widthSegments', 0, 20).onChange(controls.redraw);
  gui.add(controls, 'heightSegments', 0, 20).onChange(controls.redraw);
  gui.add(controls, 'phiStart', 0, 2 * Math.PI).onChange(controls.redraw);
  gui.add(controls, 'phiLength', 0, 2 * Math.PI).onChange(controls.redraw);
  gui.add(controls, 'thetaStart', 0, 2 * Math.PI).onChange(controls.redraw);
  gui.add(controls, 'thetaLength', 0, 2 * Math.PI).onChange(controls.redraw);

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

    sphere.rotation.y = step += 0.01;

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  };
  renderScene();
};

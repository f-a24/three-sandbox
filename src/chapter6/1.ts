import * as THREE from 'three';
import * as Stats from 'stats.js';
import * as dat from 'dat.gui';

import createMultiMaterialObject from '../utils/createMultiMaterialObject';
import { ConvexGeometry } from '../../node_modules/three/examples/jsm/geometries/ConvexGeometry';

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

  let spGroup: THREE.Group;
  let hullMesh: THREE.Group;
  const generatePoints = () => {
    const points = <THREE.Vector3[]>[];
    for (let i = 0; i < 20; i++) {
      const randomX = -15 + Math.round(Math.random() * 30);
      const randomY = -15 + Math.round(Math.random() * 30);
      const randomZ = -15 + Math.round(Math.random() * 30);
      points.push(new THREE.Vector3(randomX, randomY, randomZ));
    }
    spGroup = new THREE.Group();
    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      transparent: false
    });
    points.forEach(point => {
      const spGeom = new THREE.SphereGeometry(0.2);
      const spMesh = new THREE.Mesh(spGeom, material);
      spMesh.position.copy(point);
      spGroup.add(spMesh);
    });
    scene.add(spGroup);
    const hullGeometry: THREE.Geometry = new ConvexGeometry(points);
    hullMesh = createMesh(hullGeometry);
    scene.add(hullMesh);
  };

  const createMesh = (geom: THREE.Geometry) => {
    const meshMaterial = new THREE.MeshNormalMaterial();
    meshMaterial.side = THREE.DoubleSide;
    const wireFrameMat = new THREE.MeshBasicMaterial();
    wireFrameMat.wireframe = true;
    const mesh = createMultiMaterialObject(geom, [meshMaterial, wireFrameMat]);
    return mesh;
  };

  /* generatePoints */
  generatePoints();

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
    redraw: () => {
      scene.remove(spGroup);
      scene.remove(hullMesh);
      generatePoints();
    }
  };
  const gui = new dat.GUI();
  gui.add(controls, 'redraw');

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

    spGroup.rotation.y = step;
    hullMesh.rotation.y = step += 0.01;

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  };
  renderScene();
};

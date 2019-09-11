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

  let spGroup: THREE.Group;
  let latheMesh: THREE.Object3D;
  const generatePoints = (
    segments: number,
    phiStart: number,
    phiLength: number
  ) => {
    const points = <THREE.Vector2[]>[];
    const height = 5;
    const count = 30;
    for (let i = 0; i < count; i++) {
      points.push(
        new THREE.Vector2(
          (Math.sin(i * 0.2) + Math.cos(i * 0.3)) * height + 12,
          i - count + count / 2
        )
      );
    }
    spGroup = new THREE.Group();
    spGroup.rotation.y = -Math.PI / 2;
    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      transparent: false
    });
    points.forEach(point => {
      const spGeom = new THREE.SphereGeometry(0.2);
      const spMesh = new THREE.Mesh(spGeom, material);
      spMesh.position.set(point.x, point.y, 0);
      spGroup.add(spMesh);
    });
    scene.add(spGroup);
    const latheGeometry = new THREE.LatheGeometry(
      points,
      segments,
      phiStart,
      phiLength
    );
    latheMesh = createMesh(latheGeometry);
    scene.add(latheMesh);
  };

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

  /* generatePoints */
  generatePoints(12, 0, 2 * Math.PI);

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
    segments: 12,
    phiStart: 0,
    phiLength: 2 * Math.PI,
    redraw: () => {
      scene.remove(spGroup);
      scene.remove(latheMesh);
      generatePoints(controls.segments, controls.phiStart, controls.phiLength);
    }
  };
  const gui = new dat.GUI();
  gui
    .add(controls, 'segments', 0, 50)
    .step(1)
    .onChange(controls.redraw);
  gui.add(controls, 'phiStart', 0, 2 * Math.PI).onChange(controls.redraw);
  gui.add(controls, 'phiLength', 0, 2 * Math.PI).onChange(controls.redraw);

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

    spGroup.rotation.x = step;
    latheMesh.rotation.x = step += 0.01;

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  };
  renderScene();
};

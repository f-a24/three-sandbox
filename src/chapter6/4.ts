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
    const meshMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      transparent: true,
      opacity: 0.2
    });
    const wireFrameMat = new THREE.MeshBasicMaterial();
    wireFrameMat.wireframe = true;
    const mesh = createMultiMaterialObject(geom, [meshMaterial, wireFrameMat]);
    return mesh;
  };

  let spGroup: THREE.Object3D;
  let tubeMesh: THREE.Group;
  const generatePoints = (
    points: THREE.Vector3[],
    segments: number,
    radius: number,
    radiusSegments: number,
    closed: boolean
  ) => {
    spGroup = new THREE.Object3D();
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
    const tubeGeometry = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(points),
      segments,
      radius,
      radiusSegments,
      closed
    );
    tubeMesh = createMesh(tubeGeometry);
    scene.add(tubeMesh);
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
  const controls = {
    numberOfPoints: 5,
    segments: 64,
    radius: 1,
    radiusSegments: 8,
    closed: false,
    taper: 'no taper',
    points: [] as THREE.Vector3[],
    newPoints: () => {
      const points = [] as THREE.Vector3[];
      for (let i = 0; i < controls.numberOfPoints; i++) {
        const randomX = -20 + Math.round(Math.random() * 50);
        const randomY = -15 + Math.round(Math.random() * 40);
        const randomZ = -20 + Math.round(Math.random() * 40);
        points.push(new THREE.Vector3(randomX, randomY, randomZ));
      }
      controls.points = points;
      controls.redraw();
    },
    redraw: () => {
      scene.remove(spGroup);
      scene.remove(tubeMesh);
      generatePoints(
        controls.points,
        controls.segments,
        controls.radius,
        controls.radiusSegments,
        controls.closed
      );
    }
  };
  const gui = new dat.GUI();
  gui.add(controls, 'newPoints');
  gui
    .add(controls, 'numberOfPoints', 2, 15)
    .step(1)
    .onChange(controls.newPoints);
  gui
    .add(controls, 'segments', 0, 200)
    .step(1)
    .onChange(controls.redraw);
  gui.add(controls, 'radius', 0, 10).onChange(controls.redraw);
  gui
    .add(controls, 'radiusSegments', 0, 100)
    .step(1)
    .onChange(controls.redraw);
  gui.add(controls, 'closed').onChange(controls.redraw);

  controls.newPoints();

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
    tubeMesh.rotation.y = step += 0.01;

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  };
  renderScene();
};

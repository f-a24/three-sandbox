import * as THREE from 'three';
import * as Stats from 'stats.js';
import * as dat from 'dat.gui';

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
  camera.lookAt(new THREE.Vector3(-20, 0, 0));

  /* renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xeeeeee));
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);
  renderer.shadowMap.enabled = true;

  const createMesh = (geom: THREE.Geometry) => {
    const meshMaterial = new THREE.MeshBasicMaterial({
      vertexColors: true,
      wireframe: true,
      wireframeLinewidth: 2,
      color: 0xaaaaaa,
    });
    meshMaterial.side = THREE.DoubleSide;
    return new THREE.Mesh(geom, meshMaterial);
  };

  let knot = createMesh(new THREE.TorusKnotGeometry(10, 1, 64, 8, 2, 3));
  scene.add(knot);

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

  let loadedMesh: THREE.Mesh;

  /* gui */
  const controls = {
    radius: (knot.geometry as THREE.TorusKnotGeometry).parameters.radius,
    tube: 0.3,
    radialSegments: (knot.geometry as THREE.TorusKnotGeometry).parameters
      .radialSegments,
    tubularSegments: (knot.geometry as THREE.TorusKnotGeometry).parameters
      .tubularSegments,
    p: (knot.geometry as THREE.TorusKnotGeometry).parameters.p,
    q: (knot.geometry as THREE.TorusKnotGeometry).parameters.q,
    redraw: () => {
      scene.remove(knot);
      knot = createMesh(
        new THREE.TorusKnotGeometry(
          controls.radius,
          controls.tube,
          Math.round(controls.radialSegments),
          Math.round(controls.tubularSegments),
          Math.round(controls.p),
          Math.round(controls.q)
        )
      );
      scene.add(knot);
    },
    save: () => {
      const result = knot.toJSON();
      localStorage.setItem('json', JSON.stringify(result));
    },
    load: () => {
      scene.remove(loadedMesh);
      const json = localStorage.getItem('json');
      if (json) {
        const loadedGeometry = JSON.parse(json);
        const loader = new THREE.ObjectLoader();
        loadedMesh = loader.parse(loadedGeometry);
        loadedMesh.position.x -= 50;
        scene.add(loadedMesh);
      }
    },
  };

  const gui = new dat.GUI();
  const ioGui = gui.addFolder('Save & Load');
  ioGui.add(controls, 'save').onChange(controls.save);
  ioGui.add(controls, 'load').onChange(controls.load);
  const meshGui = gui.addFolder('mesh');
  meshGui.add(controls, 'radius', 0, 40).onChange(controls.redraw);
  meshGui.add(controls, 'tube', 0, 40).onChange(controls.redraw);
  meshGui
    .add(controls, 'radialSegments', 0, 400)
    .step(1)
    .onChange(controls.redraw);
  meshGui
    .add(controls, 'tubularSegments', 1, 20)
    .step(1)
    .onChange(controls.redraw);
  meshGui.add(controls, 'p', 1, 10).step(1).onChange(controls.redraw);
  meshGui.add(controls, 'q', 1, 15).step(1).onChange(controls.redraw);

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

    knot.rotation.y = step += 0.01;

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  };
  controls.redraw();
  renderScene();
};

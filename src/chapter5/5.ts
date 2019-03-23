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

  /* cube */
  let cube = createMesh(new THREE.BoxGeometry(10, 10, 10, 1, 1, 1));
  scene.add(cube);

  /* spotlight */
  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-40, 60, -10);
  scene.add(spotLight);

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
    width: ((cube.children[0] as THREE.Mesh).geometry as THREE.BoxGeometry)
      .parameters.width,
    height: ((cube.children[0] as THREE.Mesh).geometry as THREE.BoxGeometry)
      .parameters.height,
    depth: ((cube.children[0] as THREE.Mesh).geometry as THREE.BoxGeometry)
      .parameters.depth,
    widthSegments: ((cube.children[0] as THREE.Mesh)
      .geometry as THREE.BoxGeometry).parameters.widthSegments,
    heightSegments: ((cube.children[0] as THREE.Mesh)
      .geometry as THREE.BoxGeometry).parameters.heightSegments,
    depthSegments: ((cube.children[0] as THREE.Mesh)
      .geometry as THREE.BoxGeometry).parameters.depthSegments,
    redraw: () => {
      scene.remove(cube);
      cube = createMesh(
        new THREE.BoxGeometry(
          controls.width,
          controls.height,
          controls.depth,
          Math.round(controls.widthSegments),
          Math.round(controls.heightSegments),
          Math.round(controls.depthSegments)
        )
      );
      scene.add(cube);
    }
  };
  const gui = new dat.GUI();
  gui.add(controls, 'width', 0, 40).onChange(controls.redraw);
  gui.add(controls, 'height', 0, 40).onChange(controls.redraw);
  gui.add(controls, 'depth', 0, 40).onChange(controls.redraw);
  gui.add(controls, 'widthSegments', 0, 10).onChange(controls.redraw);
  gui.add(controls, 'heightSegments', 0, 10).onChange(controls.redraw);
  gui.add(controls, 'depthSegments', 0, 10).onChange(controls.redraw);

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

    cube.rotation.y = step += 0.01;

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  };
  renderScene();
};

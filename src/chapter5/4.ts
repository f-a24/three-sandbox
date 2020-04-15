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
  camera.position.y = 70;
  camera.position.z = 70;
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

  const createLine = (shape: THREE.Shape, spaced: boolean) =>
    !spaced
      ? new THREE.Line(
          shape.createPointsGeometry(10),
          new THREE.LineBasicMaterial({
            color: 0xff3333,
            linewidth: 2
          })
        )
      : new THREE.Line(
          shape.createSpacedPointsGeometry(3),
          new THREE.LineBasicMaterial({
            color: 0xff3333,
            linewidth: 2
          })
        );

  /* shape */
  let shape: THREE.Group | THREE.Line = createMesh(new THREE.ShapeGeometry(drawShape()));
  scene.add(shape);

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
    asGeom: () => {
      scene.remove(shape);
      shape = createMesh(new THREE.ShapeGeometry(drawShape()));
      scene.add(shape);
    },
    asPoints: () => {
      scene.remove(shape);
      shape = createLine(drawShape(), false);
      scene.add(shape);
    },
    asSpacedPoints: () => {
      scene.remove(shape);
      shape = createLine(drawShape(), true);
      scene.add(shape);
    }
  };
  const gui = new dat.GUI();
  gui.add(controls, 'asGeom');
  gui.add(controls, 'asPoints');
  gui.add(controls, 'asSpacedPoints');

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

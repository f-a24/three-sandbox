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
  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);
  renderer.shadowMap.enabled = true;

  const generateSprite = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const context = canvas.getContext('2d');
    const gradient = context.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      0,
      canvas.width / 2,
      canvas.height / 2,
      canvas.width / 2
    );
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.2, 'rgba(0,255,255,1)');
    gradient.addColorStop(0.4, 'rgba(0,0,64,1)');
    gradient.addColorStop(1, 'rgba(0,0,0,1)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  };

  const createPoints = (geom: THREE.Geometry) => {
    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 3,
      transparent: true,
      blending: THREE.AdditiveBlending,
      map: generateSprite(),
      depthWrite: false
    });
    return new THREE.Points(geom, material);
  };

  const createMesh = (geom: THREE.Geometry) => {
    const meshMaterial = new THREE.MeshNormalMaterial({});
    meshMaterial.side = THREE.DoubleSide;
    return SceneUtils.createMultiMaterialObject(geom, [meshMaterial]);
  };

  document.getElementById('WebGL-output').appendChild(renderer.domElement);

  let knot: THREE.Points | THREE.Object3D;
  const controls = {
    radius: 13,
    tube: 1.7,
    radialSegments: 156,
    tubularSegments: 12,
    p: 5,
    q: 4,
    asParticles: false,
    rotate: false,
    redraw: () => {
      if (knot) scene.remove(knot);
      const geom = new THREE.TorusKnotGeometry(
        controls.radius,
        controls.tube,
        Math.round(controls.radialSegments),
        Math.round(controls.tubularSegments),
        Math.round(controls.p),
        Math.round(controls.q)
      );
      knot = controls.asParticles ? createPoints(geom) : createMesh(geom);
      scene.add(knot);
    }
  };
  const gui = new dat.GUI();
  gui.add(controls, 'radius', 0, 40).onChange(controls.redraw);
  gui.add(controls, 'tube', 0, 40).onChange(controls.redraw);
  gui
    .add(controls, 'radialSegments', 0, 400)
    .step(1)
    .onChange(controls.redraw);
  gui
    .add(controls, 'tubularSegments', 1, 20)
    .step(1)
    .onChange(controls.redraw);
  gui
    .add(controls, 'p', 1, 10)
    .step(1)
    .onChange(controls.redraw);
  gui
    .add(controls, 'q', 1, 15)
    .step(1)
    .onChange(controls.redraw);
  gui.add(controls, 'asParticles').onChange(controls.redraw);
  gui.add(controls, 'rotate').onChange(controls.redraw);

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

  /* render */
  let step = 0;
  const renderScene = () => {
    stats.update();

    if (controls.rotate) {
      knot.rotation.y = step += 0.01;
    }

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  };
  controls.redraw();
  renderScene();
};

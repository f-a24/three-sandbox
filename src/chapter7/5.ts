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
  camera.position.x = 20;
  camera.position.y = 0;
  camera.position.z = 150;

  /* renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);

  /* context2d */
  const getTexture = () => {
    const canvasEl = document.createElement('canvas');
    canvasEl.width = 32;
    canvasEl.height = 32;
    const ctx = canvasEl.getContext('2d');

    // the body
    ctx.translate(-81, -84);
    ctx.fillStyle = 'orange';
    ctx.beginPath();
    ctx.moveTo(83, 116);
    ctx.lineTo(83, 102);
    ctx.bezierCurveTo(83, 94, 89, 88, 97, 88);
    ctx.bezierCurveTo(105, 88, 111, 94, 111, 102);
    ctx.lineTo(111, 116);
    ctx.lineTo(106.333, 111.333);
    ctx.lineTo(101.666, 116);
    ctx.lineTo(97, 111.333);
    ctx.lineTo(92.333, 116);
    ctx.lineTo(87.666, 111.333);
    ctx.lineTo(83, 116);
    ctx.fill();

    // the eyes
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(91, 96);
    ctx.bezierCurveTo(88, 96, 87, 99, 87, 101);
    ctx.bezierCurveTo(87, 103, 88, 106, 91, 106);
    ctx.bezierCurveTo(94, 106, 95, 103, 95, 101);
    ctx.bezierCurveTo(95, 99, 94, 96, 91, 96);
    ctx.moveTo(103, 96);
    ctx.bezierCurveTo(100, 96, 99, 99, 99, 101);
    ctx.bezierCurveTo(99, 103, 100, 106, 103, 106);
    ctx.bezierCurveTo(106, 106, 107, 103, 107, 101);
    ctx.bezierCurveTo(107, 99, 106, 96, 103, 96);
    ctx.fill();

    // the pupils
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(101, 102, 2, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(89, 102, 2, 0, Math.PI * 2, true);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvasEl);
    texture.needsUpdate = true;
    return texture;
  };

  let cloud: THREE.Points;
  const createPoints = (
    size: number,
    transparent: boolean,
    opacity: number,
    sizeAttenuation: boolean,
    color: number
  ) => {
    const geom = new THREE.Geometry();
    const material = new THREE.PointsMaterial({
      size: size,
      transparent: transparent,
      opacity: opacity,
      map: getTexture(),
      sizeAttenuation: sizeAttenuation,
      depthWrite: false,
      color: color
    });
    const range = 500;
    for (let i = 0; i < 5000; i++) {
      const particle = new THREE.Vector3(
        Math.random() * range - range / 2,
        Math.random() * range - range / 2,
        Math.random() * range - range / 2
      );
      geom.vertices.push(particle);
    }
    cloud = new THREE.Points(geom, material);
    cloud.name = 'pointcloud';
    scene.add(cloud);
  };

  document.getElementById('WebGL-output').appendChild(renderer.domElement);

  const controls = {
    size: 15,
    transparent: true,
    opacity: 0.6,
    color: 0xffffff,
    rotateSystem: true,
    sizeAttenuation: true,
    redraw: () => {
      if (scene.getObjectByName('pointcloud')) {
        scene.remove(scene.getObjectByName('pointcloud'));
      }
      createPoints(
        controls.size,
        controls.transparent,
        controls.opacity,
        controls.sizeAttenuation,
        controls.color
      );
    }
  };

  /* gui */
  const gui = new dat.GUI();
  gui.add(controls, 'size', 0, 20).onChange(controls.redraw);
  gui.add(controls, 'transparent').onChange(controls.redraw);
  gui.add(controls, 'opacity', 0, 1).onChange(controls.redraw);
  gui.addColor(controls, 'color').onChange(controls.redraw);
  gui.add(controls, 'sizeAttenuation').onChange(controls.redraw);
  gui.add(controls, 'rotateSystem');

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

    if (controls.rotateSystem) {
      step += 0.01;
      cloud.rotation.x = step;
      cloud.rotation.z = step;
    }

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  };
  controls.redraw();
  renderScene();
};

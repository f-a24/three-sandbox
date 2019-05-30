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

  let cloud: THREE.Points;
  const createParticles = (
    size: number,
    transparent: boolean,
    opacity: number,
    vertexColors: boolean,
    sizeAttenuation: boolean,
    color: string | number | THREE.Color
  ) => {
    const geom = new THREE.Geometry();
    const material = new THREE.PointsMaterial({
      size: size,
      transparent: transparent,
      opacity: opacity,
      vertexColors: vertexColors ? THREE.VertexColors : THREE.NoColors,
      sizeAttenuation: sizeAttenuation,
      color: color
    });
    const range = 500;
    for (let i = 0; i < 15000; i++) {
      const particle = new THREE.Vector3(
        Math.random() * range - range / 2,
        Math.random() * range - range / 2,
        Math.random() * range - range / 2
      );
      geom.vertices.push(particle);
      const color = new THREE.Color(0x00ff00);
      color.setHSL(
        color.getHSL({ h: 0, s: 0, l: 0 }).h,
        color.getHSL({ h: 0, s: 0, l: 0 }).s,
        Math.random() * color.getHSL({ h: 0, s: 0, l: 0 }).l
      );
      geom.colors.push(color);
    }
    cloud = new THREE.Points(geom, material);
    cloud.name = 'particles';
    scene.add(cloud);
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
    size: 4,
    transparent: true,
    opacity: 0.6,
    vertexColors: true,
    color: 0xffffff,
    sizeAttenuation: true,
    rotateSystem: true,
    redraw: () => {
      if (scene.getObjectByName('particles')) {
        scene.remove(scene.getObjectByName('particles'));
      }
      createParticles(
        controls.size,
        controls.transparent,
        controls.opacity,
        controls.vertexColors,
        controls.sizeAttenuation,
        controls.color
      );
    }
  };

  const gui = new dat.GUI();
  gui.add(controls, 'size', 0, 10).onChange(controls.redraw);
  gui.add(controls, 'transparent').onChange(controls.redraw);
  gui.add(controls, 'opacity', 0, 1).onChange(controls.redraw);
  gui.add(controls, 'vertexColors').onChange(controls.redraw);
  gui.addColor(controls, 'color').onChange(controls.redraw);
  gui.add(controls, 'sizeAttenuation').onChange(controls.redraw);
  gui.add(controls, 'rotateSystem');

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

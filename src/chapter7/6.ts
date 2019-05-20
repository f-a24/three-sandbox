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
    200
  );
  camera.position.x = 20;
  camera.position.y = 40;
  camera.position.z = 110;
  camera.lookAt(new THREE.Vector3(20, 30, 0));

  /* renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);

  let cloud: THREE.Points;
  const velocities: { x: number; y: number }[] = [];
  const createPoints = (
    size: number,
    transparent: boolean,
    opacity: number,
    sizeAttenuation: boolean,
    color: number
  ) => {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('./assets/raindrop-1.png');
    const geom = new THREE.Geometry();

    const material = new THREE.PointsMaterial({
      size: size,
      transparent: transparent,
      opacity: opacity,
      depthWrite: false,
      map: texture,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: sizeAttenuation,
      color: color
    });
    const range = 40;
    for (let i = 0; i < 1500; i++) {
      const particle = new THREE.Vector3(
        Math.random() * range - range / 2,
        Math.random() * range * 1.5,
        Math.random() * range - range / 2
      );
      geom.vertices.push(particle);
      velocities.push({
        x: (Math.random() - 0.5) / 3,
        y: 0.1 + Math.random() / 5
      });
    }
    cloud = new THREE.Points(geom, material);
    cloud.name = 'particles1';
    scene.add(cloud);
  };

  document.getElementById('WebGL-output').appendChild(renderer.domElement);

  const controls = {
    size: 3,
    transparent: true,
    opacity: 0.6,
    color: 0xffffff,
    sizeAttenuation: true,
    redraw: () => {
      scene.remove(scene.getObjectByName('particles1'));
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

    const vertices = (cloud.geometry as THREE.Geometry).vertices;
    vertices.forEach((v, i) => {
      v.y = v.y - velocities[i].y;
      v.x = v.x - velocities[i].x;
      if (v.y <= 0) v.y = 60;
      if (v.x <= -20 || v.x >= 20) velocities[i].x = velocities[i].x * -1;
    });
    (cloud.geometry as THREE.Geometry).verticesNeedUpdate = true;

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  };
  controls.redraw();
  renderScene();
};

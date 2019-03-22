import * as THREE from 'three';
import * as Stats from 'stats.js';

export default () => {
  // 画面サイズ
  const VIEWPORT_W = window.innerWidth;
  const VIEWPORT_H = window.innerHeight;

  /* scene */
  const scene = new THREE.Scene();

  /* camera */
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.x = -30;
  camera.position.y = 40;
  camera.position.z = 30;
  camera.lookAt(scene.position);

  /* renderer */
  const webGLRenderer = new THREE.WebGLRenderer();
  webGLRenderer.setClearColor(new THREE.Color(0x000000));
  webGLRenderer.setSize(VIEWPORT_W, VIEWPORT_H);
  webGLRenderer.shadowMap.enabled = true;

  const ambientLight = new THREE.AmbientLight(0x0c0c0c);
  scene.add(ambientLight);

  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-40, 60, -10);
  spotLight.castShadow = true;
  spotLight.intensity = 0.6;
  scene.add(spotLight);

  const gosper = (a: number, b: number) => {
    const turtle = [0, 0, 0];
    const points = [];
    const count = 0;
    const rt = (x: number) => {
      turtle[2] += x;
    };
    const lt = (x: number) => {
      turtle[2] -= x;
    };
    const fd = (dist: number) => {
      points.push({ x: turtle[0], y: turtle[1], z: Math.sin(count) * 5 });
      var dir = turtle[2] * (Math.PI / 180);
      turtle[0] += Math.cos(dir) * dist;
      turtle[1] += Math.sin(dir) * dist;
      points.push({ x: turtle[0], y: turtle[1], z: Math.sin(count) * 5 });
    };
    const rg = (st: number, ln: number, turtle: number[]) => {
      st--;
      ln = ln / 2.6457;
      if (st > 0) {
        rg(st, ln, turtle);
        rt(60);
        gl(st, ln, turtle);
        rt(120);
        gl(st, ln, turtle);
        lt(60);
        rg(st, ln, turtle);
        lt(120);
        rg(st, ln, turtle);
        rg(st, ln, turtle);
        lt(60);
        gl(st, ln, turtle);
        rt(60);
      }
      if (st == 0) {
        fd(ln);
        rt(60);
        fd(ln);
        rt(120);
        fd(ln);
        lt(60);
        fd(ln);
        lt(120);
        fd(ln);
        fd(ln);
        lt(60);
        fd(ln);
        rt(60);
      }
    };
    const gl = (st: number, ln: number, turtle: number[]) => {
      st--;
      ln = ln / 2.6457;
      if (st > 0) {
        lt(60);
        rg(st, ln, turtle);
        rt(60);
        gl(st, ln, turtle);
        gl(st, ln, turtle);
        rt(120);
        gl(st, ln, turtle);
        rt(60);
        rg(st, ln, turtle);
        lt(120);
        rg(st, ln, turtle);
        lt(60);
        gl(st, ln, turtle);
      }
      if (st == 0) {
        lt(60);
        fd(ln);
        rt(60);
        fd(ln);
        fd(ln);
        rt(120);
        fd(ln);
        rt(60);
        fd(ln);
        lt(120);
        fd(ln);
        lt(60);
        fd(ln);
      }
    };
    rg(a, b, turtle);
    return points;
  };

  const points = gosper(4, 60);

  const lines = new THREE.Geometry();
  const colors = [];
  let i = 0;
  points.forEach(function(e) {
    lines.vertices.push(new THREE.Vector3(e.x, e.z, e.y));
    colors[i] = new THREE.Color(0xffffff);
    colors[i].setHSL(e.x / 100 + 0.5, (e.y * 20) / 300, 0.8);
    i++;
  });
  lines.colors = colors;
  const material = new THREE.LineBasicMaterial({
    opacity: 1.0,
    linewidth: 1,
    vertexColors: THREE.VertexColors
  });
  const line = new THREE.Line(lines, material);
  line.position.set(25, -30, -60);
  scene.add(line);

  document.getElementById('WebGL-output').appendChild(webGLRenderer.domElement);

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

  /* resize */
  window.addEventListener(
    'resize',
    () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    },
    false
  );

  /* render */
  let step = 0;
  const renderScene = () => {
    stats.update();

    line.rotation.z = step += 0.01;

    requestAnimationFrame(renderScene);
    webGLRenderer.render(scene, camera);
  };
  renderScene();
};

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
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 12, 28);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  const ambiLight = new THREE.AmbientLight(0x141414);
  scene.add(ambiLight);

  const light = new THREE.DirectionalLight();
  light.position.set(0, 30, 20);
  scene.add(light);

  /* renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xbbbbbb));
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);
  renderer.shadowMap.enabled = true;

  document.getElementById('WebGL-output').appendChild(renderer.domElement);

  const createDrawArea = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 350;
    canvas.height = 350;

    canvas.style.position = 'fixed';
    canvas.style.left = '0';
    canvas.style.bottom = '0';
    canvas.style.backgroundColor = '#000';

    let drawing = false;
    let before_x = 0;
    let before_y = 0;

    canvas.addEventListener('mousemove', e => {
      if (!drawing) return;
      const {
        left,
        top
      } = (e.target as HTMLCanvasElement).getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(before_x, before_y);
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.closePath();
      before_x = x;
      before_y = y;
    });
    canvas.addEventListener('mousedown', e => {
      drawing = true;
      const {
        left,
        top
      } = (e.target as HTMLCanvasElement).getBoundingClientRect();
      before_x = e.clientX - left;
      before_y = e.clientY - top;
    });
    canvas.addEventListener('mouseup', () => {
      drawing = false;
    });
    canvas.addEventListener('mouseout', () => {
      drawing = false;
    });

    return canvas;
  };
  const canvas = createDrawArea();
  document.body.appendChild(canvas);

  const createMesh = (geom: THREE.BoxGeometry) => {
    const canvasMap = new THREE.Texture(canvas);
    const mat = new THREE.MeshPhongMaterial();
    mat.map = canvasMap;
    return new THREE.Mesh(geom, mat);
  };

  const cube = createMesh(new THREE.BoxGeometry(10, 10, 10));
  cube.position.x = 0;
  scene.add(cube);

  const controls = {
    showTexture: true,
    showCanvas: () => {
      if (controls.showTexture) {
        canvas.style.display = 'block';
      } else {
        canvas.style.display = 'none';
      }
    }
  };

  const gui = new dat.GUI();
  gui.add(controls, 'showTexture').onChange(controls.showCanvas);

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
      renderer.setSize(window.innerWidth, window.innerHeight);
    },
    false
  );

  /* render */
  const renderScene = () => {
    stats.update();

    cube.rotation.y += 0.01;
    cube.rotation.x += 0.01;
    (cube.material as THREE.MeshPhongMaterial).map.needsUpdate = true;

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  };
  renderScene();
};

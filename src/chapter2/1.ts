import * as THREE from 'three';
import * as Stats from 'stats.js';
import * as dat from 'dat.gui';

export default () => {
  // 画面サイズ
  const VIEWPORT_W = window.innerWidth;
  const VIEWPORT_H = window.innerHeight;

  /* scene */
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xffffff, 0.015, 100);
  scene.overrideMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
  });

  /* camera */
  const camera = new THREE.PerspectiveCamera(
    45,
    VIEWPORT_W / VIEWPORT_H,
    0.1,
    1000
  );
  scene.add(camera);
  camera.position.x = -30;
  camera.position.y = 40;
  camera.position.z = 30;
  camera.lookAt(scene.position);

  /* renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xeeeeee));
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);
  renderer.shadowMap.enabled = true;

  /* plane */
  const planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
  const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 0;
  plane.position.y = 0;
  plane.position.z = 0;
  scene.add(plane);

  /* ambientLight */
  const ambientLight = new THREE.AmbientLight(0x0c0c0c);
  scene.add(ambientLight);

  /* spotLight */
  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-20, 30, -5);
  spotLight.castShadow = true;
  scene.add(spotLight);

  document.getElementById('WebGL-output').appendChild(renderer.domElement);

  const controls = {
    rotationSpeed: 0.02,
    numberOfObjects: scene.children.length,
    removeCube() {
      const allChildren = scene.children;
      const lastObject = allChildren[allChildren.length - 1];
      if (lastObject instanceof THREE.Mesh) {
        scene.remove(lastObject);
        this.numberOfObjects = scene.children.length;
      }
    },
    addCube() {
      const cubeSize = Math.ceil(Math.random() * 3);
      const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
      const cubeMaterial = new THREE.MeshLambertMaterial({
        color: Math.random() * 0xffffff,
      });
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.castShadow = true;
      cube.name = `cube-${scene.children.length}`;
      cube.position.x =
        -30 + Math.round(Math.random() * planeGeometry.parameters.width);
      cube.position.y = Math.round(Math.random() * 5);
      cube.position.z =
        -20 + Math.round(Math.random() * planeGeometry.parameters.height);
      scene.add(cube);
      this.numberOfObjects = scene.children.length;
    },
    outputObjects() {
      console.log(scene.children);
    },
  };
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
  const gui = new dat.GUI();
  gui.add(controls, 'rotationSpeed', 0, 0.5);
  gui.add(controls, 'addCube');
  gui.add(controls, 'removeCube');
  gui.add(controls, 'outputObjects');
  gui.add(controls, 'numberOfObjects').listen();

  /* render */
  const render = () => {
    stats.update();
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh && obj !== plane) {
        obj.rotation.x += controls.rotationSpeed;
        obj.rotation.y += controls.rotationSpeed;
        obj.rotation.z += controls.rotationSpeed;
      }
    });
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  };
  render();
};

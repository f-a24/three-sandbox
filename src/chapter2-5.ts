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
  let camera:
    | THREE.OrthographicCamera
    | THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
    45,
    VIEWPORT_W / VIEWPORT_H,
    0.1,
    1000
  );
  scene.add(camera);
  camera.position.x = 120;
  camera.position.y = 60;
  camera.position.z = 180;

  /* renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xeeeeee));
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);
  renderer.shadowMap.enabled = true;

  /* plane */
  const planeGeometry = new THREE.PlaneGeometry(180, 180);
  const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 0;
  plane.position.y = 0;
  plane.position.z = 0;
  scene.add(plane);

  const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x00ee22 });
  for (let j = 0; j < planeGeometry.parameters.height / 5; j++) {
    for (let i = 0; i < planeGeometry.parameters.width / 5; i++) {
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.position.z = -(planeGeometry.parameters.height / 2) + 2 + j * 5;
      cube.position.x = -(planeGeometry.parameters.width / 2) + 2 + i * 5;
      cube.position.y = 2;
      scene.add(cube);
    }
  }

  const lookAtGeom = new THREE.SphereGeometry(2);
  const lookAtMesh = new THREE.Mesh(
    lookAtGeom,
    new THREE.MeshLambertMaterial({ color: 0xff0000 })
  );
  scene.add(lookAtMesh);

  /* directionalLight */
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
  directionalLight.position.set(-20, 40, 60);
  scene.add(directionalLight);

  /* ambientLight */
  const ambientLight = new THREE.AmbientLight(0x292929);
  scene.add(ambientLight);

  const controls = new function() {
    this.perspective = 'Perspective';
    this.switchCamera = function() {
      if (camera instanceof THREE.PerspectiveCamera) {
        camera = new THREE.OrthographicCamera(
          window.innerWidth / -16,
          window.innerWidth / 16,
          window.innerHeight / 16,
          window.innerHeight / -16,
          -200,
          500
        );
        camera.position.x = 120;
        camera.position.y = 60;
        camera.position.z = 180;
        camera.lookAt(scene.position);
        this.perspective = 'Orthographic';
      } else {
        camera = new THREE.PerspectiveCamera(
          45,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );
        camera.position.x = 120;
        camera.position.y = 60;
        camera.position.z = 180;
        camera.lookAt(scene.position);
        this.perspective = 'Perspective';
      }
    };
  }();

  const gui = new dat.GUI();
  gui.add(controls, 'switchCamera');
  gui.add(controls, 'perspective').listen();

  document.getElementById('WebGL-output').appendChild(renderer.domElement);

  /* stats */
  const stats = (() => {
    const statsObj = new Stats();
    statsObj.showPanel(0);
    statsObj.dom.style.position = 'absolute';
    statsObj.dom.style.left = '0px';
    statsObj.dom.style.top = '0px';

    document.getElementById('Stats-output').appendChild(statsObj.dom);

    return statsObj;
  })();

  /* render */
  let step = 0;
  const render = () => {
    stats.update();
    step += 0.02;
    if (camera instanceof THREE.Camera) {
      const x = 10 + 100 * Math.sin(step);
      camera.lookAt(new THREE.Vector3(x, 10, 0));
      lookAtMesh.position.copy(new THREE.Vector3(x, 10, 0));
    }
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  };
  render();
};

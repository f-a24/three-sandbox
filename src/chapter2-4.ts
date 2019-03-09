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
  spotLight.position.set(-20, 30, 10);
  spotLight.castShadow = true;
  scene.add(spotLight);

  const material = new THREE.MeshLambertMaterial({ color: 0x44ff44 });
  const geom = new THREE.BoxGeometry(5, 8, 3);
  const cube = new THREE.Mesh(geom, material);
  cube.position.y = 4;
  cube.castShadow = true;
  scene.add(cube);

  const controls = new function() {
    this.scaleX = 1;
    this.scaleY = 1;
    this.scaleZ = 1;
    this.positionX = 0;
    this.positionY = 4;
    this.positionZ = 0;
    this.rotationX = 0;
    this.rotationY = 0;
    this.rotationZ = 0;
    this.scale = 1;
    this.translateX = 0;
    this.translateY = 0;
    this.translateZ = 0;
    this.visible = true;
    this.translate = function() {
      cube.translateX(controls.translateX);
      cube.translateY(controls.translateY);
      cube.translateZ(controls.translateZ);
      controls.positionX = cube.position.x;
      controls.positionY = cube.position.y;
      controls.positionZ = cube.position.z;
    };
  }();
  const gui = new dat.GUI();
  const guiScale = gui.addFolder('scale');
  guiScale.add(controls, 'scaleX', 0, 5);
  guiScale.add(controls, 'scaleY', 0, 5);
  guiScale.add(controls, 'scaleZ', 0, 5);

  const guiPosition = gui.addFolder('position');
  const contX = guiPosition.add(controls, 'positionX', -10, 10);
  const contY = guiPosition.add(controls, 'positionY', -4, 20);
  const contZ = guiPosition.add(controls, 'positionZ', -10, 10);

  contX.listen();
  contX.onChange(() => {
    cube.position.x = controls.positionX;
  });
  contY.listen();
  contY.onChange(() => {
    cube.position.y = controls.positionY;
  });
  contZ.listen();
  contZ.onChange(() => {
    cube.position.z = controls.positionZ;
  });

  const guiRotation = gui.addFolder('rotation');
  guiRotation.add(controls, 'rotationX', -4, 4);
  guiRotation.add(controls, 'rotationY', -4, 4);
  guiRotation.add(controls, 'rotationZ', -4, 4);

  const guiTranslate = gui.addFolder('translate');
  guiTranslate.add(controls, 'translateX', -10, 10);
  guiTranslate.add(controls, 'translateY', -10, 10);
  guiTranslate.add(controls, 'translateZ', -10, 10);
  guiTranslate.add(controls, 'translate');

  gui.add(controls, 'visible');

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
  const render = () => {
    stats.update();
    cube.visible = controls.visible;
    cube.rotation.x = controls.rotationX;
    cube.rotation.y = controls.rotationY;
    cube.rotation.z = controls.rotationZ;
    cube.scale.set(controls.scaleX, controls.scaleY, controls.scaleZ);
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  };
  render();
};

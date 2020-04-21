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
  camera.position.x = 0;
  camera.position.y = 12;
  camera.position.z = 38;
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  /* renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xeeeeee));
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);
  renderer.shadowMap.enabled = true;

  const ambiLight = new THREE.AmbientLight(0x242424);
  scene.add(ambiLight);

  const light = new THREE.SpotLight();
  light.position.set(0, 30, 30);
  light.intensity = 1.2;
  scene.add(light);

  const directionalLight = new THREE.PointLight(0xff5808);
  scene.add(directionalLight);

  const sphereLight = new THREE.SphereGeometry(0.2);
  const sphereLightMaterial = new THREE.MeshBasicMaterial({ color: 0xac6c25 });
  const sphereLightMesh = new THREE.Mesh(sphereLight, sphereLightMaterial);
  sphereLightMesh.castShadow = true;
  sphereLightMesh.position.set(3, 3, 3);
  scene.add(sphereLightMesh);

  document.getElementById('WebGL-output').appendChild(renderer.domElement);

  const createMesh = (
    geom: THREE.Geometry,
    imageFile: string,
    normal?: string
  ) => {
    const textureLoader = new THREE.TextureLoader();
    if (normal) {
      const t = textureLoader.load(`./assets/tex/${imageFile}`);
      const m = textureLoader.load(`./assets/tex/${normal}`);
      const mat2 = new THREE.MeshPhongMaterial();
      mat2.map = t;
      mat2.normalMap = m;
      const mesh = new THREE.Mesh(geom, mat2);
      return mesh;
    }
    const t = textureLoader.load(`./assets/tex/${imageFile}`);
    const mat1 = new THREE.MeshPhongMaterial({
      map: t,
    });
    const mesh = new THREE.Mesh(geom, mat1);
    return mesh;
  };

  const sphere1 = createMesh(new THREE.BoxGeometry(15, 15, 15), 'plaster.jpg');
  sphere1.rotation.y = -0.5;
  sphere1.position.x = 12;
  scene.add(sphere1);

  const sphere2 = createMesh(
    new THREE.BoxGeometry(15, 15, 15),
    'plaster.jpg',
    'plaster-normal.jpg'
  );
  sphere2.rotation.y = 0.5;
  sphere2.position.x = -12;
  scene.add(sphere2);

  const textureLoader = new THREE.TextureLoader();
  const floorTex = textureLoader.load('./assets/tex/floor-wood.jpg');
  const plane = new THREE.Mesh(
    new THREE.BoxGeometry(200, 100, 0.1, 30),
    new THREE.MeshPhongMaterial({
      color: 0x3c3c3c,
      map: floorTex,
    })
  );
  plane.position.y = -7.5;
  plane.rotation.x = -0.5 * Math.PI;
  scene.add(plane);

  const controls = {
    bumpScale: 0.2,
    rotate: false,
    changeTexture: (e: string) => {
      const texture = textureLoader.load(`./assets/tex/${e}.jpg`);
      (sphere2.material as THREE.MeshPhongMaterial).map = texture;
      (sphere1.material as THREE.MeshPhongMaterial).map = texture;

      const normal = textureLoader.load(`./assets/tex/${e}-normal.jpg`);
      (sphere2.material as THREE.MeshPhongMaterial).normalMap = normal;
    },
    updateBump: (e: number) => {
      (sphere2.material as THREE.MeshPhongMaterial).normalScale.set(e, e);
    },
  };
  const gui = new dat.GUI();
  gui.add(controls, 'bumpScale', -2, 2).onChange(controls.updateBump);
  gui
    .add(controls, 'changeTexture', ['plaster', 'bathroom', 'metal-floor'])
    .onChange(controls.changeTexture);
  gui.add(controls, 'rotate');

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

  let invert = 1;
  let phase = 0;

  /* render */
  const renderScene = () => {
    stats.update();

    if (controls.rotate) {
      sphere1.rotation.y -= 0.01;
      sphere2.rotation.y += 0.01;
    }
    if (phase > 2 * Math.PI) {
      invert *= -1;
      phase -= 2 * Math.PI;
    } else {
      phase += 0.03;
    }
    sphereLightMesh.position.z = +(21 * Math.sin(phase));
    sphereLightMesh.position.x = -14 + 14 * Math.cos(phase);
    if (invert < 0) {
      const pivot = 0;
      sphereLightMesh.position.x =
        invert * (sphereLightMesh.position.x - pivot) + pivot;
    }
    directionalLight.position.copy(sphereLightMesh.position);

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  };
  renderScene();
};

import * as THREE from 'three';
import * as chroma from 'chroma-js';
import * as dat from 'dat.gui';
import * as Stats from 'stats.js';
import 'imports-loader?THREE=three!../libs/physi';

export default () => {
  // 画面サイズ
  const VIEWPORT_W = window.innerWidth;
  const VIEWPORT_H = window.innerHeight;

  const scale = chroma.scale(['white', 'blue', 'red', 'yellow']);

  // physijs設定
  Physijs.scripts.worker = './libs/physijs_worker.js';
  Physijs.scripts.ammo = '../libs/ammo.js';

  /* scene */
  const scene = new Physijs.Scene({ reportSize: 10, fixedTimeStep: 1 / 60 });
  scene.setGravity(new THREE.Vector3(0, -40, 0));

  /* camera */
  const camera = new THREE.PerspectiveCamera(
    35,
    VIEWPORT_W / VIEWPORT_H,
    1,
    1000
  );
  camera.position.set(90, 90, 90);
  camera.lookAt(new THREE.Vector3(30, 0, -20));
  scene.add(camera);

  /* renderer */
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.shadowMap.enabled = true;

  const light = new THREE.SpotLight(0xffffff);
  light.position.set(120, 70, 100);
  light.castShadow = true;
  light.shadow.camera.near = 10;
  light.shadow.camera.far = 200;
  light.shadow.mapSize.width = 1028;
  light.shadow.mapSize.height = 1028;
  scene.add(light);

  document.getElementById('WebGL-output').appendChild(renderer.domElement);

  const createGround = () => {
    const length = 120;
    const width = 120;
    // Materials
    const textureLoader = new THREE.TextureLoader();
    const ground_material = Physijs.createMaterial(
      new THREE.MeshPhongMaterial({
        map: textureLoader.load('./assets/tex/floor-wood.jpg')
      }),
      1,
      0.7
    );
    // Ground
    const ground = new Physijs.BoxMesh(
      new THREE.BoxGeometry(length, 1, width),
      ground_material,
      0
    );
    ground.receiveShadow = true;

    const borderLeft = new Physijs.BoxMesh(
      new THREE.BoxGeometry(2, 6, width),
      ground_material,
      0
    );
    borderLeft.position.x = (-1 * length) / 2 - 1;
    borderLeft.position.y = 2;
    borderLeft.receiveShadow = true;
    ground.add(borderLeft);

    const borderRight = new Physijs.BoxMesh(
      new THREE.BoxGeometry(2, 6, width),
      ground_material,
      0
    );
    borderRight.position.x = length / 2 + 1;
    borderRight.position.y = 2;
    borderRight.receiveShadow = true;
    ground.add(borderRight);

    const borderBottom = new Physijs.BoxMesh(
      new THREE.BoxGeometry(width - 1, 6, 2),
      ground_material,
      0
    );
    borderBottom.position.z = width / 2;
    borderBottom.position.y = 1.5;
    borderBottom.receiveShadow = true;
    ground.add(borderBottom);

    const borderTop = new Physijs.BoxMesh(
      new THREE.BoxGeometry(width, 6, 2),
      ground_material,
      0
    );
    borderTop.position.z = -width / 2;
    borderTop.position.y = 2;
    borderTop.receiveShadow = true;
    ground.position.x = 20;
    ground.position.z = -20;
    ground.add(borderTop);
    ground.receiveShadow = true;
    scene.add(ground);
  };

  const createWheel = (position: THREE.Vector3) => {
    const wheelMaterial = Physijs.createMaterial(
      new THREE.MeshLambertMaterial({
        color: 0x444444,
        opacity: 0.9,
        transparent: true
      }),
      1.0,
      0.5
    );
    const wheel_geometry = new THREE.CylinderGeometry(4, 4, 2, 10);
    const wheel = new Physijs.CylinderMesh(wheel_geometry, wheelMaterial, 100);
    wheel.rotation.x = Math.PI / 2;
    wheel.castShadow = true;
    wheel.position.copy(position);
    return wheel;
  };

  const createWheelConstraint = (
    wheel: THREE.Object3D,
    body: THREE.Object3D,
    position: THREE.Vector3
  ) => new Physijs.DOFConstraint(wheel, body, position);

  const createCar = () => {
    const car_material = Physijs.createMaterial(
      new THREE.MeshLambertMaterial({
        color: 0xff4444,
        opacity: 0.9,
        transparent: true
      }),
      0.5,
      0.5
    );

    const geom = new THREE.BoxGeometry(15, 4, 4);
    const body = new Physijs.BoxMesh(geom, car_material, 500);
    body.position.set(5, 5, 5);
    body.castShadow = true;
    scene.add(body);

    const fr = createWheel(new THREE.Vector3(0, 4, 10));
    const fl = createWheel(new THREE.Vector3(0, 4, 0));
    const rr = createWheel(new THREE.Vector3(10, 4, 10));
    const rl = createWheel(new THREE.Vector3(10, 4, 0));
    scene.add(fr);
    scene.add(fl);
    scene.add(rr);
    scene.add(rl);

    const frConstraint = createWheelConstraint(
      fr,
      body,
      new THREE.Vector3(0, 4, 8)
    );
    scene.addConstraint(frConstraint);
    const flConstraint = createWheelConstraint(
      fl,
      body,
      new THREE.Vector3(0, 4, 2)
    );
    scene.addConstraint(flConstraint);
    const rrConstraint = createWheelConstraint(
      rr,
      body,
      new THREE.Vector3(10, 4, 8)
    );
    scene.addConstraint(rrConstraint);
    const rlConstraint = createWheelConstraint(
      rl,
      body,
      new THREE.Vector3(10, 4, 2)
    );
    scene.addConstraint(rlConstraint);

    rrConstraint.setAngularLowerLimit(new THREE.Vector3(0, 0.5, 0.1));
    rrConstraint.setAngularUpperLimit(new THREE.Vector3(0, 0.5, 0));
    rlConstraint.setAngularLowerLimit(new THREE.Vector3(0, 0.5, 0.1));
    rlConstraint.setAngularUpperLimit(new THREE.Vector3(0, 0.5, 0.1));

    frConstraint.setAngularLowerLimit(new THREE.Vector3(0, 0, 0));
    frConstraint.setAngularUpperLimit(new THREE.Vector3(0, 0, 0));
    flConstraint.setAngularLowerLimit(new THREE.Vector3(0, 0, 0));
    flConstraint.setAngularUpperLimit(new THREE.Vector3(0, 0, 0));

    flConstraint.configureAngularMotor(2, 0.1, 0, -2, 1500);
    frConstraint.configureAngularMotor(2, 0.1, 0, -2, 1500);

    flConstraint.enableAngularMotor(2);
    frConstraint.enableAngularMotor(2);

    return {
      flConstraint,
      frConstraint,
      rlConstraint,
      rrConstraint
    };
  };

  createGround();
  const car = createCar();

  const controls = {
    velocity: -2,
    wheelAngle: 0.5,
    loosenXRight: 0,
    loosenXLeft: 0,
    changeVelocity: () => {
      car.flConstraint.configureAngularMotor(
        2,
        0.1,
        0,
        controls.velocity,
        15000
      );
      car.frConstraint.configureAngularMotor(
        2,
        0.1,
        0,
        controls.velocity,
        15000
      );
      car.flConstraint.enableAngularMotor(2);
      car.frConstraint.enableAngularMotor(2);
    },
    changeOrientation: () => {
      car.rrConstraint.setAngularLowerLimit(
        new THREE.Vector3(0, controls.wheelAngle, 0.1)
      );
      car.rrConstraint.setAngularUpperLimit(
        new THREE.Vector3(0, controls.wheelAngle, 0)
      );
      car.rlConstraint.setAngularLowerLimit(
        new THREE.Vector3(0, controls.wheelAngle, 0.1)
      );
      car.rlConstraint.setAngularUpperLimit(
        new THREE.Vector3(0, controls.wheelAngle, 0)
      );
    }
  };

  const gui = new dat.GUI();
  gui.add(controls, 'velocity', -10, 10).onChange(controls.changeVelocity);
  gui.add(controls, 'wheelAngle', -1, 1).onChange(controls.changeOrientation);
  gui
    .add(controls, 'loosenXRight', 0, 0.5)
    .step(0.01)
    .onChange(controls.changeOrientation);
  gui
    .add(controls, 'loosenXLeft', 0, 0.6)
    .step(-0.01)
    .onChange(controls.changeOrientation);

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

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
    scene.simulate(undefined, 1);
  };
  renderScene();
};

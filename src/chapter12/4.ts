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
  const scene = new Physijs.Scene({ fixedTimeStep: 1 / 60 });
  scene.setGravity(new THREE.Vector3(0, -10, 0));

  /* camera */
  const camera = new THREE.PerspectiveCamera(
    35,
    VIEWPORT_W / VIEWPORT_H,
    1,
    1000
  );
  camera.position.set(85, 65, 65);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  scene.add(camera);

  /* renderer */
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);
  renderer.shadowMap.enabled = true;

  /* light */
  const light = new THREE.SpotLight(0xffffff);
  light.position.set(20, 50, 50);
  light.castShadow = true;
  light.shadow.camera.near = 10;
  light.shadow.camera.far = 100;
  scene.add(light);

  document.getElementById('WebGL-output').appendChild(renderer.domElement);

  let ground_material: Physijs.Material;
  let ground: Physijs.BoxMesh;
  const createGround = () => {
    // Materials
    const textureLoader = new THREE.TextureLoader();
    ground_material = Physijs.createMaterial(
      new THREE.MeshPhongMaterial({
        map: textureLoader.load('./assets/tex/floor-wood.jpg')
      }),
      0.9,
      0.7
    );
    // Ground
    ground = new Physijs.BoxMesh(
      new THREE.BoxGeometry(60, 1, 65),
      ground_material,
      0
    );
    ground.receiveShadow = true;
    const borderLeft = new Physijs.BoxMesh(
      new THREE.BoxGeometry(2, 6, 65),
      ground_material,
      0
    );
    borderLeft.position.x = -31;
    borderLeft.position.y = 2;
    borderLeft.receiveShadow = true;
    ground.add(borderLeft);

    const borderRight = new Physijs.BoxMesh(
      new THREE.BoxGeometry(2, 6, 65),
      ground_material,
      0
    );
    borderRight.position.x = 31;
    borderRight.position.y = 2;
    borderRight.receiveShadow = true;
    ground.add(borderRight);

    const borderBottom = new Physijs.BoxMesh(
      new THREE.BoxGeometry(64, 6, 2),
      ground_material,
      0
    );
    borderBottom.position.z = 32;
    borderBottom.position.y = 1.5;
    borderBottom.receiveShadow = true;
    ground.add(borderBottom);

    const borderTop = new Physijs.BoxMesh(
      new THREE.BoxGeometry(64, 6, 2),
      ground_material,
      0
    );
    borderTop.position.z = -32;
    borderTop.position.y = 2;
    borderTop.receiveShadow = true;
    ground.add(borderTop);
    ground.receiveShadow = true;
    scene.add(ground);
  };

  const createConeTwist = () => {
    const baseMesh = new THREE.SphereGeometry(1);
    const armMesh = new THREE.BoxGeometry(2, 12, 3);
    const objectOne = new Physijs.BoxMesh(
      baseMesh,
      Physijs.createMaterial(
        new THREE.MeshPhongMaterial({
          color: 0x4444ff,
          transparent: true,
          opacity: 0.7
        }),
        0,
        0
      ),
      0
    );
    objectOne.position.z = 0;
    objectOne.position.x = 20;
    objectOne.position.y = 15.5;
    objectOne.castShadow = true;
    scene.add(objectOne);

    const objectTwo = new Physijs.SphereMesh(
      armMesh,
      Physijs.createMaterial(
        new THREE.MeshPhongMaterial({
          color: 0x4444ff,
          transparent: true,
          opacity: 0.7
        }),
        0,
        0
      ),
      10
    );
    objectTwo.position.z = 0;
    objectTwo.position.x = 20;
    objectTwo.position.y = 7.5;
    scene.add(objectTwo);
    objectTwo.castShadow = true;

    const constraint = new Physijs.ConeTwistConstraint(
      objectOne,
      objectTwo,
      objectOne.position
    );
    scene.addConstraint(constraint);

    constraint.setLimit(0.5 * Math.PI, 0.5 * Math.PI, 0.5 * Math.PI);
    constraint.setMaxMotorImpulse(1);
    constraint.setMotorTarget(new THREE.Vector3(0, 0, 0)); // desired rotation

    return constraint;
  };

  const createPointToPoint = () => {
    const obj1 = new THREE.SphereGeometry(2);
    const obj2 = new THREE.SphereGeometry(2);
    const objectOne = new Physijs.SphereMesh(
      obj1,
      Physijs.createMaterial(
        new THREE.MeshPhongMaterial({
          color: 0xff4444,
          transparent: true,
          opacity: 0.7
        }),
        0,
        0
      )
    );
    objectOne.position.z = -18;
    objectOne.position.x = -10;
    objectOne.position.y = 2;
    objectOne.castShadow = true;
    scene.add(objectOne);

    const objectTwo = new Physijs.SphereMesh(
      obj2,
      Physijs.createMaterial(
        new THREE.MeshPhongMaterial({
          color: 0xff4444,
          transparent: true,
          opacity: 0.7
        }),
        0,
        0
      )
    );
    objectTwo.position.z = -5;
    objectTwo.position.x = -20;
    objectTwo.position.y = 2;
    objectTwo.castShadow = true;
    scene.add(objectTwo);

    const constraint = new Physijs.PointConstraint(
      objectOne,
      objectTwo,
      objectTwo.position
    );
    scene.addConstraint(constraint);
  };

  const createSliderBottom = () => {
    const sliderCube = new THREE.BoxGeometry(12, 2, 2);
    const sliderMesh = new Physijs.BoxMesh(
      sliderCube,
      Physijs.createMaterial(
        new THREE.MeshPhongMaterial({
          color: 0x44ff44,
          opacity: 0.6,
          transparent: true
        }),
        0,
        0
      ),
      0.01
    );
    sliderMesh.position.z = 20;
    sliderMesh.position.x = 6;
    sliderMesh.position.y = 1.5;
    sliderMesh.castShadow = true;
    scene.add(sliderMesh);

    const constraint = new Physijs.SliderConstraint(
      sliderMesh,
      new THREE.Vector3(0, 0, 0) as any,
      new THREE.Vector3(0, 1, 0)
    );
    scene.addConstraint(constraint);
    constraint.setLimits(-10, 10, 0, 0);
    constraint.setRestitution(0.1, 0.1);
    return constraint;
  };
  const createSliderTop = () => {
    const sliderSphere = new THREE.BoxGeometry(7, 2, 7);
    const sliderMesh = new Physijs.BoxMesh(
      sliderSphere,
      Physijs.createMaterial(
        new THREE.MeshPhongMaterial({
          color: 0x44ff44,
          transparent: true,
          opacity: 0.5
        }),
        0,
        0
      ),
      10
    );
    sliderMesh.position.z = -15;
    sliderMesh.position.x = -20;
    sliderMesh.position.y = 1.5;
    scene.add(sliderMesh);
    sliderMesh.castShadow = true;

    const constraint = new Physijs.SliderConstraint(
      sliderMesh,
      new THREE.Vector3(-10, 0, 20) as any,
      new THREE.Vector3(Math.PI / 2, 0, 0)
    );
    scene.addConstraint(constraint);
    constraint.setLimits(-20, 10, 0.5, 0);
    constraint.setRestitution(0.2, 0.1);
    return constraint;
  };
  const createLeftFlipper = () => {
    const flipperLeft = new Physijs.BoxMesh(
      new THREE.BoxGeometry(12, 2, 2),
      Physijs.createMaterial(
        new THREE.MeshPhongMaterial({ opacity: 0.6, transparent: true })
      ),
      0.3
    );
    flipperLeft.position.x = -6;
    flipperLeft.position.y = 2;
    flipperLeft.position.z = 0;
    flipperLeft.castShadow = true;
    scene.add(flipperLeft);

    const flipperLeftPivot = new Physijs.SphereMesh(
      new THREE.BoxGeometry(1, 1, 1),
      ground_material,
      0
    );
    flipperLeftPivot.position.y = 1;
    flipperLeftPivot.position.x = -15;
    flipperLeftPivot.position.z = 0;
    flipperLeftPivot.rotation.y = 1.4;
    flipperLeftPivot.castShadow = true;
    scene.add(flipperLeftPivot);

    const constraint = new Physijs.HingeConstraint(
      flipperLeft,
      flipperLeftPivot,
      flipperLeftPivot.position,
      new THREE.Vector3(0, 1, 0)
    );
    scene.addConstraint(constraint);
    constraint.setLimits(-2.2, -0.6, 0.1, 0);

    return constraint;
  };

  const createRightFlipper = () => {
    const flipperright = new Physijs.BoxMesh(
      new THREE.BoxGeometry(12, 2, 2),
      Physijs.createMaterial(
        new THREE.MeshPhongMaterial({ opacity: 0.6, transparent: true })
      ),
      0.3
    );
    flipperright.position.x = 8;
    flipperright.position.y = 2;
    flipperright.position.z = 0;
    flipperright.castShadow = true;
    scene.add(flipperright);

    const flipperLeftPivot = new Physijs.SphereMesh(
      new THREE.BoxGeometry(1, 1, 1),
      ground_material,
      0
    );
    flipperLeftPivot.position.y = 2;
    flipperLeftPivot.position.x = 15;
    flipperLeftPivot.position.z = 0;
    flipperLeftPivot.rotation.y = 1.4;
    flipperLeftPivot.castShadow = true;
    scene.add(flipperLeftPivot);

    const constraint = new Physijs.HingeConstraint(
      flipperright,
      flipperLeftPivot,
      flipperLeftPivot.position,
      new THREE.Vector3(0, 1, 0)
    );
    scene.addConstraint(constraint);
    constraint.setLimits(-2.2, -0.6, 0.1, 0);

    return constraint;
  };

  let meshes = [];
  createGround();
  const flipperLeftConstraint = createLeftFlipper();
  const flipperRightConstraint = createRightFlipper();
  const sliderBottomConstraint = createSliderBottom();
  const sliderTopConstraint = createSliderTop();
  const coneTwistConstraint = createConeTwist();
  createPointToPoint();

  const controls = {
    enableMotor: false,
    acceleration: 2,
    velocity: -10,
    enableConeTwistMotor: false,
    motorTargetX: 0,
    motorTargetY: 0,
    motorTargetZ: 0,
    updateCone: () => {
      if (controls.enableConeTwistMotor) {
        coneTwistConstraint.enableMotor();
        coneTwistConstraint.setMotorTarget(
          new THREE.Vector3(
            controls.motorTargetX,
            controls.motorTargetY,
            controls.motorTargetZ
          )
        );
      } else {
        coneTwistConstraint.disableMotor();
      }
    },
    updateMotor: () => {
      if (controls.enableMotor) {
        flipperLeftConstraint.disableMotor();
        flipperLeftConstraint.enableAngularMotor(
          controls.velocity,
          controls.acceleration
        );
        flipperRightConstraint.disableMotor();
        flipperRightConstraint.enableAngularMotor(
          -1 * controls.velocity,
          controls.acceleration
        );
      } else {
        flipperLeftConstraint.disableMotor();
        flipperRightConstraint.disableMotor();
      }
    },
    sliderLeft: () => {
      sliderBottomConstraint.disableLinearMotor();
      sliderBottomConstraint.enableLinearMotor(
        controls.velocity,
        controls.acceleration
      );
      sliderTopConstraint.disableLinearMotor();
      sliderTopConstraint.enableLinearMotor(
        controls.velocity,
        controls.acceleration
      );
    },
    sliderRight: () => {
      sliderBottomConstraint.disableLinearMotor();
      sliderBottomConstraint.enableLinearMotor(
        -1 * controls.velocity,
        controls.acceleration
      );
      sliderTopConstraint.disableLinearMotor();
      sliderTopConstraint.enableLinearMotor(
        -1 * controls.velocity,
        controls.acceleration
      );
    },
    clearMeshes: () => {
      meshes.forEach(e => {
        scene.remove(e);
      });
      meshes = [];
    },
    addSpheres: () => {
      const colorSphere = scale(Math.random()).hex();
      for (let i = 0; i < 5; i++) {
        const box = new Physijs.SphereMesh(
          new THREE.SphereGeometry(2, 20),
          Physijs.createMaterial(
            new THREE.MeshPhongMaterial({
              color: colorSphere,
              opacity: 0.8,
              transparent: true
            })
          ),
          0.1
        );
        box.castShadow = true;
        box.receiveShadow = true;
        box.position.set(
          Math.random() * 50 - 25,
          20 + Math.random() * 5,
          Math.random() * 5
        );
        meshes.push(box);
        scene.add(box);
      }
    }
  };
  controls.updateMotor();

  const gui = new dat.GUI();
  const generalFolder = gui.addFolder('general');
  generalFolder
    .add(controls, 'acceleration', 0, 15)
    .onChange(controls.updateMotor);
  generalFolder
    .add(controls, 'velocity', -10, 10)
    .onChange(controls.updateMotor);

  const hingeFolder = gui.addFolder('hinge');
  hingeFolder.add(controls, 'enableMotor').onChange(controls.updateMotor);

  const sliderFolder = gui.addFolder('sliders');
  sliderFolder.add(controls, 'sliderLeft').onChange(controls.sliderLeft);
  sliderFolder.add(controls, 'sliderRight').onChange(controls.sliderRight);

  const coneTwistFolder = gui.addFolder('coneTwist');
  coneTwistFolder
    .add(controls, 'enableConeTwistMotor')
    .onChange(controls.updateCone);
  coneTwistFolder
    .add(controls, 'motorTargetX', -Math.PI / 2, Math.PI / 2)
    .onChange(controls.updateCone);
  coneTwistFolder
    .add(controls, 'motorTargetY', -Math.PI / 2, Math.PI / 2)
    .onChange(controls.updateCone);
  coneTwistFolder
    .add(controls, 'motorTargetZ', -Math.PI / 2, Math.PI / 2)
    .onChange(controls.updateCone);

  const spheresFolder = gui.addFolder('spheres');
  spheresFolder.add(controls, 'clearMeshes').onChange(controls.updateMotor);
  spheresFolder.add(controls, 'addSpheres').onChange(controls.updateMotor);

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
    (ground as any).__dirtyRotation = true;
    scene.simulate(undefined, 2);
  };
  renderScene();
};

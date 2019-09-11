import * as THREE from 'three';
import * as Stats from 'stats.js';
import * as dat from 'dat.gui';
import { Projector } from '../../node_modules/three/examples/jsm/renderers/Projector';

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
  camera.position.x = -30;
  camera.position.y = 40;
  camera.position.z = 30;
  camera.lookAt(scene.position);

  /* renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xeeeeee));
  renderer.setSize(window.innerWidth, window.innerHeight);

  // 無くても良さ気？
  // const projector = new (THREE as any).Projector();
  const projector = new Projector();
  const planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
  const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);

  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 15;
  plane.position.y = 0;
  plane.position.z = 0;

  scene.add(plane);

  const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

  cube.position.x = -9;
  cube.position.y = 3;
  cube.position.z = 0;

  scene.add(cube);

  const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
  const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

  sphere.position.x = 20;
  sphere.position.y = 0;
  sphere.position.z = 2;

  scene.add(sphere);

  const cylinderGeometry = new THREE.CylinderGeometry(2, 2, 20);
  const cylinderMaterial = new THREE.MeshLambertMaterial({ color: 0x77ff77 });
  const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
  cylinder.position.set(0, 0, 1);

  scene.add(cylinder);

  const ambientLight = new THREE.AmbientLight(0x0c0c0c);
  scene.add(ambientLight);

  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-40, 60, -10);
  scene.add(spotLight);

  document.getElementById('WebGL-output').appendChild(renderer.domElement);

  /* GUI */
  let tube: THREE.Mesh;
  const controls = {
    rotationSpeed: 0.02,
    bouncingSpeed: 0.03,
    scalingSpeed: 0.03,
    showRay: false
  };
  const gui = new dat.GUI();
  gui.add(controls, 'rotationSpeed', 0, 0.5);
  gui.add(controls, 'bouncingSpeed', 0, 0.5);
  gui.add(controls, 'scalingSpeed', 0, 0.5);
  gui.add(controls, 'showRay').onChange(() => {
    if (tube) scene.remove(tube);
  });

  document.addEventListener(
    'mousedown',
    e => {
      let vector = new THREE.Vector3(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1,
        0.5
      );
      vector = vector.unproject(camera);
      const raycaster = new THREE.Raycaster(
        camera.position,
        vector.sub(camera.position).normalize()
      );
      const intersects = raycaster.intersectObjects([sphere, cylinder, cube]);
      if (intersects.length > 0) {
        console.log(intersects[0]);
        ((intersects[0].object as THREE.Mesh)
          .material as THREE.Material).transparent = true;
        ((intersects[0].object as THREE.Mesh)
          .material as THREE.Material).opacity = 0.1;
      }
    },
    false
  );
  document.addEventListener(
    'mousemove',
    e => {
      if (controls.showRay) {
        let vector = new THREE.Vector3(
          (e.clientX / window.innerWidth) * 2 - 1,
          -(e.clientY / window.innerHeight) * 2 + 1,
          0.5
        );
        vector = vector.unproject(camera);
        const raycaster = new THREE.Raycaster(
          camera.position,
          vector.sub(camera.position).normalize()
        );
        const intersects = raycaster.intersectObjects([sphere, cylinder, cube]);
        if (intersects.length > 0) {
          const points = [];
          points.push(new THREE.Vector3(-30, 39.8, 30));
          points.push(intersects[0].point);
          const mat = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            transparent: true,
            opacity: 0.6
          });
          const tubeGeometry = new THREE.TubeGeometry(
            new THREE.CatmullRomCurve3(points),
            60,
            0.001
          );
          if (tube) scene.remove(tube);
          if (controls.showRay) {
            tube = new THREE.Mesh(tubeGeometry, mat);
            scene.add(tube);
          }
        }
      }
    },
    false
  );

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
  let scalingStep = 0;
  const renderScene = () => {
    stats.update();

    cube.rotation.x += controls.rotationSpeed;
    cube.rotation.y += controls.rotationSpeed;
    cube.rotation.z += controls.rotationSpeed;

    step += controls.bouncingSpeed;
    sphere.position.x = 20 + 10 * Math.cos(step);
    sphere.position.y = 2 + 10 * Math.abs(Math.sin(step));

    scalingStep += controls.scalingSpeed;
    const scaleX = Math.abs(Math.sin(scalingStep / 4));
    const scaleY = Math.abs(Math.cos(scalingStep / 5));
    const scaleZ = Math.abs(Math.sin(scalingStep / 7));
    cylinder.scale.set(scaleX, scaleY, scaleZ);

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  };
  renderScene();
};

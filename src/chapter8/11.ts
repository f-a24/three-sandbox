import * as THREE from 'three';
import * as Stats from 'stats.js';
import { PDBLoader } from '../../node_modules/three/examples/jsm/loaders/PDBLoader';

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
  camera.position.x = 6;
  camera.position.y = 6;
  camera.position.z = 6;
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  /* renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);
  renderer.shadowMap.enabled = true;

  const dir1 = new THREE.DirectionalLight(0.4);
  dir1.position.set(-30, 30, -30);
  scene.add(dir1);

  const dir2 = new THREE.DirectionalLight(0.4);
  dir2.position.set(-30, 30, 30);
  scene.add(dir2);

  const dir3 = new THREE.DirectionalLight(0.4);
  dir3.position.set(30, 30, -30);
  scene.add(dir3);

  // spotlight
  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(30, 30, 30);
  scene.add(spotLight);

  document.getElementById('WebGL-output').appendChild(renderer.domElement);

  const loader = new PDBLoader();
  const group = new THREE.Group();
  loader.load(
    './assets/aspirin.pdb',
    ({
      geometryAtoms,
      geometryBonds,
      json
    }: {
      geometryAtoms: THREE.BufferGeometry;
      geometryBonds: THREE.BufferGeometry;
      json: {
        atoms: [number, number, number, number[], string][];
        bonds: [number[]];
      };
    }) => {
      const atomsPositions = geometryAtoms.getAttribute('position');
      const bondsPositions = geometryBonds.getAttribute('position');
      json.atoms.forEach((atom, i) => {
        const sphere = new THREE.SphereGeometry(0.2);
        const material = new THREE.MeshPhongMaterial({
          color: new THREE.Color(
            `rgb(${atom[3][0]},${atom[3][1]},${atom[3][2]})`
          )
        });
        const mesh = new THREE.Mesh(sphere, material);
        mesh.position.set(
          atomsPositions.getX[i],
          atomsPositions.getY[i],
          atomsPositions.getZ[i]
        );
        group.add(mesh);
      });
      for (let j = 0; j < json.bonds.length; j += 2) {
        const path = new THREE.CatmullRomCurve3([
          new THREE.Vector3(
            bondsPositions.getX[j],
            bondsPositions.getY[j],
            bondsPositions.getZ[j]
          ),
          new THREE.Vector3(
            bondsPositions.getX[j + 1],
            bondsPositions.getY[j + 1],
            bondsPositions.getZ[j + 1]
          )
        ]);
        const tube = new THREE.TubeGeometry(path, 1, 0.04);
        const material = new THREE.MeshPhongMaterial({ color: 0xcccccc });
        const mesh = new THREE.Mesh(tube, material);
        group.add(mesh);
      }
      scene.add(group);
    }
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

    if (group) {
      group.rotation.y += 0.006;
    }

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  };
  renderScene();
};

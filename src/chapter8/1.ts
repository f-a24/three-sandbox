import * as THREE from 'three';
import * as Stats from 'stats.js';
import * as dat from 'dat.gui';
import createMultiMaterialObject from '../utils/createMultiMaterialObject';

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
  camera.position.x = 30;
  camera.position.y = 30;
  camera.position.z = 30;
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  /* renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xeeeeee));
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);
  renderer.shadowMap.enabled = true;

  const ground = new THREE.PlaneGeometry(100, 100, 50, 50);
  const groundMesh = createMultiMaterialObject(ground, [
    new THREE.MeshBasicMaterial({
      wireframe: true,
      overdraw: 1,
      color: 0x000000
    }),
    new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      transparent: true,
      opacity: 0.5
    })
  ]);
  groundMesh.rotation.x = -0.5 * Math.PI;
  scene.add(groundMesh);

  const createMesh = (geom: THREE.Geometry) => {
    const meshMaterial = new THREE.MeshNormalMaterial();
    meshMaterial.side = THREE.DoubleSide;
    const wireFrameMat = new THREE.MeshBasicMaterial();
    wireFrameMat.wireframe = true;
    return createMultiMaterialObject(geom, [meshMaterial, wireFrameMat]);
  };

  const setFromObject = (object: THREE.Group) => {
    const box = new THREE.Box3();
    const v1 = new THREE.Vector3();
    object.updateMatrixWorld(true);
    box.makeEmpty();
    object.traverse((node: THREE.Mesh) => {
      if (
        node.geometry !== undefined &&
        (node.geometry as THREE.Geometry).vertices !== undefined
      ) {
        const vertices = (node.geometry as THREE.Geometry).vertices;
        for (let i = 0, il = vertices.length; i < il; i++) {
          v1.copy(vertices[i]);
          v1.applyMatrix4(node.matrixWorld);
          box.expandByPoint(v1);
        }
      }
    });
    return box;
  };

  document.getElementById('WebGL-output').appendChild(renderer.domElement);

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

  let sphere: THREE.Group;
  let cube: THREE.Group;
  let group: THREE.Group;
  let bboxMesh: THREE.Mesh;

  /* gui */
  const controls = {
    cubePosX: 0,
    cubePosY: 3,
    cubePosZ: 10,
    spherePosX: 10,
    spherePosY: 5,
    spherePosZ: 0,
    groupPosX: 10,
    groupPosY: 5,
    groupPosZ: 0,
    grouping: false,
    rotate: false,
    groupScale: 1,
    cubeScale: 1,
    sphereScale: 1,
    redraw: () => {
      scene.remove(group);
      sphere = createMesh(new THREE.SphereGeometry(5, 10, 10));
      cube = createMesh(new THREE.BoxGeometry(6, 6, 6));
      sphere.position.set(
        controls.spherePosX,
        controls.spherePosY,
        controls.spherePosZ
      );
      cube.position.set(
        controls.cubePosX,
        controls.cubePosY,
        controls.cubePosZ
      );
      group = new THREE.Group();
      group.add(sphere);
      group.add(cube);
      scene.add(group);
      controls.positionBoundingBox();
      const arrow = new THREE.ArrowHelper(
        new THREE.Vector3(0, 1, 0),
        group.position,
        10,
        0x0000ff
      );
      scene.add(arrow);
    },
    positionBoundingBox: () => {
      scene.remove(bboxMesh);
      const box = setFromObject(group);
      const width = box.max.x - box.min.x;
      const height = box.max.y - box.min.y;
      const depth = box.max.z - box.min.z;
      const bbox = new THREE.BoxGeometry(width, height, depth);
      bboxMesh = new THREE.Mesh(
        bbox,
        new THREE.MeshBasicMaterial({
          color: 0x000000,
          vertexColors: THREE.VertexColors,
          wireframeLinewidth: 2,
          wireframe: true
        })
      );
      bboxMesh.position.x = (box.min.x + box.max.x) / 2;
      bboxMesh.position.y = (box.min.y + box.max.y) / 2;
      bboxMesh.position.z = (box.min.z + box.max.z) / 2;
    }
  };

  const gui = new dat.GUI();
  const sphereFolder = gui.addFolder('sphere');
  sphereFolder.add(controls, 'spherePosX', -20, 20).onChange((e: number) => {
    sphere.position.x = e;
    controls.positionBoundingBox();
  });
  sphereFolder.add(controls, 'spherePosZ', -20, 20).onChange((e: number) => {
    sphere.position.z = e;
    controls.positionBoundingBox();
  });
  sphereFolder.add(controls, 'spherePosY', -20, 20).onChange((e: number) => {
    sphere.position.y = e;
    controls.positionBoundingBox();
  });
  sphereFolder.add(controls, 'sphereScale', 0, 3).onChange((e: number) => {
    sphere.scale.set(e, e, e);
    controls.positionBoundingBox();
  });

  const cubeFolder = gui.addFolder('cube');
  cubeFolder.add(controls, 'cubePosX', -20, 20).onChange((e: number) => {
    cube.position.x = e;
    controls.positionBoundingBox();
  });
  cubeFolder.add(controls, 'cubePosZ', -20, 20).onChange((e: number) => {
    cube.position.z = e;
    controls.positionBoundingBox();
  });
  cubeFolder.add(controls, 'cubePosY', -20, 20).onChange((e: number) => {
    cube.position.y = e;
    controls.positionBoundingBox();
  });
  cubeFolder.add(controls, 'cubeScale', 0, 3).onChange((e: number) => {
    cube.scale.set(e, e, e);
    controls.positionBoundingBox();
  });

  const groupFolder = gui.addFolder('group');
  groupFolder.add(controls, 'groupPosX', -20, 20).onChange((e: number) => {
    group.position.x = e;
    controls.positionBoundingBox();
  });
  groupFolder.add(controls, 'groupPosZ', -20, 20).onChange((e: number) => {
    group.position.z = e;
    controls.positionBoundingBox();
  });
  groupFolder.add(controls, 'groupPosY', -20, 20).onChange((e: number) => {
    group.position.y = e;
    controls.positionBoundingBox();
  });
  groupFolder.add(controls, 'groupScale', 0, 3).onChange((e: number) => {
    group.scale.set(e, e, e);
    controls.positionBoundingBox();
  });
  gui.add(controls, 'grouping');
  gui.add(controls, 'rotate');

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
  let step = 0.03;
  const renderScene = () => {
    stats.update();

    if (controls.grouping && controls.rotate) {
      group.rotation.y += step;
    }
    if (controls.rotate && !controls.grouping) {
      sphere.rotation.y += step;
      cube.rotation.y += step;
    }

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  };
  controls.redraw();
  renderScene();
};

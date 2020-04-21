import * as THREE from 'three';
import * as Stats from 'stats.js';
import * as dat from 'dat.gui';
import { Spinner } from 'spin.js';
import 'imports-loader?THREE=three!../libs/ThreeBSP';

declare const ThreeBSP: (mesh: THREE.Mesh) => void;

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
  camera.position.x = 0;
  camera.position.y = 20;
  camera.position.z = 20;
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  /* renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0x999999));
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);
  renderer.shadowMap.enabled = true;

  /* spotLight */
  const spotLight = new THREE.DirectionalLight(0xffffff);
  spotLight.position.set(-20, 250, -50);
  spotLight.target.position.x = 30;
  spotLight.target.position.y = -40;
  spotLight.target.position.z = -20;
  spotLight.intensity = 0.3;

  let result: THREE.Mesh;
  let spinner: Spinner;

  const showSpinner = () => {
    const opts = {
      lines: 13,
      length: 20,
      width: 10,
      radius: 30,
      corners: 1,
      rotate: 0,
      direction: 1,
      color: '#000',
      speed: 1,
      trail: 60,
      shadow: false,
      hwaccel: false,
      className: 'spinner',
      zIndex: 2e9,
      top: '50%',
      left: '50%',
    };
    const target = document.getElementById('WebGL-output');
    spinner = new Spinner(opts).spin(target);
    return spinner;
  };
  const hideSpinner = (spinner: Spinner) => {
    spinner.stop();
  };

  const redrawResult = () => {
    showSpinner();
    setTimeout(() => {
      scene.remove(result);
      const sphere1BSP = new ThreeBSP(sphere1);
      const sphere2BSP = new ThreeBSP(sphere2);
      const cube2BSP = new ThreeBSP(cube);
      let resultBSP;
      switch (controls.actionSphere) {
        case 'subtract':
          resultBSP = sphere1BSP.subtract(sphere2BSP);
          break;
        case 'intersect':
          resultBSP = sphere1BSP.intersect(sphere2BSP);
          break;
        case 'union':
          resultBSP = sphere1BSP.union(sphere2BSP);
          break;
        case 'none':
      }
      if (!resultBSP) resultBSP = sphere1BSP;
      switch (controls.actionCube) {
        case 'subtract':
          resultBSP = resultBSP.subtract(cube2BSP);
          break;
        case 'intersect':
          resultBSP = resultBSP.intersect(cube2BSP);
          break;
        case 'union':
          resultBSP = resultBSP.union(cube2BSP);
          break;
        case 'none':
      }
      if (controls.actionCube !== 'none' && controls.actionSphere !== 'none') {
        result = resultBSP.toMesh();
        (result.geometry as THREE.Geometry).computeFaceNormals();
        result.geometry.computeVertexNormals();
        scene.add(result);
      }
      hideSpinner(spinner);
    }, 200);
  };

  const createMesh = (geom: THREE.Geometry) => {
    const meshMaterial = new THREE.MeshNormalMaterial();
    meshMaterial.side = THREE.DoubleSide;
    const wireFrameMat = new THREE.MeshBasicMaterial({
      opacity: 0.5,
      wireframeLinewidth: 0.5,
    });
    wireFrameMat.wireframe = true;
    const mesh = new THREE.Mesh(geom, wireFrameMat);
    return mesh;
  };

  const sphere1 = createMesh(new THREE.SphereGeometry(5, 20, 30));
  sphere1.position.x = -2;
  const sphere2 = createMesh(new THREE.SphereGeometry(5, 20, 30));
  sphere2.position.set(3, 0, 0);
  const cube = createMesh(new THREE.BoxGeometry(5, 5, 5));
  cube.position.x = -7;

  scene.add(sphere1);
  scene.add(sphere2);
  scene.add(cube);

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

  /* gui */
  const controls = {
    sphere1PosX: sphere1.position.x,
    sphere1PosY: sphere1.position.y,
    sphere1PosZ: sphere1.position.z,
    sphere1Scale: 1,
    sphere2PosX: sphere2.position.x,
    sphere2PosY: sphere2.position.y,
    sphere2PosZ: sphere2.position.z,
    sphere2Scale: 1,
    cubePosX: cube.position.x,
    cubePosY: cube.position.y,
    cubePosZ: cube.position.z,
    scaleX: 1,
    scaleY: 1,
    scaleZ: 1,
    actionCube: 'subtract',
    actionSphere: 'subtract',
    showResult: () => {
      redrawResult();
    },
    hideWireframes: false,
    rotateResult: false,
  };

  const gui = new dat.GUI();
  const guiSphere1 = gui.addFolder('Sphere1');
  guiSphere1.add(controls, 'sphere1PosX', -15, 15).onChange(() => {
    sphere1.position.set(
      controls.sphere1PosX,
      controls.sphere1PosY,
      controls.sphere1PosZ
    );
  });
  guiSphere1.add(controls, 'sphere1PosY', -15, 15).onChange(() => {
    sphere1.position.set(
      controls.sphere1PosX,
      controls.sphere1PosY,
      controls.sphere1PosZ
    );
  });
  guiSphere1.add(controls, 'sphere1PosZ', -15, 15).onChange(() => {
    sphere1.position.set(
      controls.sphere1PosX,
      controls.sphere1PosY,
      controls.sphere1PosZ
    );
  });
  guiSphere1.add(controls, 'sphere1Scale', 0, 10).onChange((e: number) => {
    sphere1.scale.set(e, e, e);
  });
  const guiSphere2 = gui.addFolder('Sphere2');
  guiSphere2.add(controls, 'sphere2PosX', -15, 15).onChange(() => {
    sphere2.position.set(
      controls.sphere2PosX,
      controls.sphere2PosY,
      controls.sphere2PosZ
    );
  });
  guiSphere2.add(controls, 'sphere2PosY', -15, 15).onChange(() => {
    sphere2.position.set(
      controls.sphere2PosX,
      controls.sphere2PosY,
      controls.sphere2PosZ
    );
  });
  guiSphere2.add(controls, 'sphere2PosZ', -15, 15).onChange(() => {
    sphere2.position.set(
      controls.sphere2PosX,
      controls.sphere2PosY,
      controls.sphere2PosZ
    );
  });
  guiSphere2.add(controls, 'sphere2Scale', 0, 10).onChange((e: number) => {
    sphere2.scale.set(e, e, e);
  });
  guiSphere2.add(controls, 'actionSphere', [
    'subtract',
    'intersect',
    'union',
    'none',
  ]);
  const guiCube = gui.addFolder('cube');
  guiCube.add(controls, 'cubePosX', -15, 15).onChange(() => {
    cube.position.set(controls.cubePosX, controls.cubePosY, controls.cubePosZ);
  });
  guiCube.add(controls, 'cubePosY', -15, 15).onChange(() => {
    cube.position.set(controls.cubePosX, controls.cubePosY, controls.cubePosZ);
  });
  guiCube.add(controls, 'cubePosZ', -15, 15).onChange(() => {
    cube.position.set(controls.cubePosX, controls.cubePosY, controls.cubePosZ);
  });
  guiCube.add(controls, 'scaleX', 0, 10).onChange((e: number) => {
    cube.scale.x = e;
  });
  guiCube.add(controls, 'scaleY', 0, 10).onChange((e: number) => {
    cube.scale.y = e;
  });
  guiCube.add(controls, 'scaleZ', 0, 10).onChange((e: number) => {
    cube.scale.z = e;
  });
  guiCube.add(controls, 'actionCube', [
    'subtract',
    'intersect',
    'union',
    'none',
  ]);
  gui.add(controls, 'showResult');
  gui.add(controls, 'rotateResult');
  gui.add(controls, 'hideWireframes').onChange(() => {
    if (controls.hideWireframes) {
      (sphere1.material as THREE.Material).visible = false;
      (sphere2.material as THREE.Material).visible = false;
      (cube.material as THREE.Material).visible = false;
    } else {
      (sphere1.material as THREE.Material).visible = true;
      (sphere2.material as THREE.Material).visible = true;
      (cube.material as THREE.Material).visible = true;
    }
  });

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

    if (controls.rotateResult && result) {
      result.rotation.y += 0.04;
      result.rotation.z -= 0.005;
    }
    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  };
  renderScene();
};

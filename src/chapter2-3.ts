import * as THREE from 'three';
import * as Stats from 'stats.js';
import * as dat from 'dat.gui';
import createMultiMaterialObject from './createMultiMaterialObject';

export default () => {
  // 画面サイズ
  const VIEWPORT_W = window.innerWidth;
  const VIEWPORT_H = window.innerHeight;

  /* scene */
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xffffff, 0.015, 100);
  scene.overrideMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff
  });

  /* camera */
  const camera = new THREE.PerspectiveCamera(
    45,
    VIEWPORT_W / VIEWPORT_H,
    0.1,
    1000
  );
  scene.add(camera);
  camera.position.x = -20;
  camera.position.y = 25;
  camera.position.z = 20;
  camera.lookAt(new THREE.Vector3(5, 0, 0));

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
  const ambientLight = new THREE.AmbientLight(0x090909);
  scene.add(ambientLight);

  /* spotLight */
  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-20, 30, 5);
  spotLight.castShadow = true;
  scene.add(spotLight);

  const step = 0;
  const vertices = [
    new THREE.Vector3(1, 3, 1),
    new THREE.Vector3(1, 3, -1),
    new THREE.Vector3(1, -1, 1),
    new THREE.Vector3(1, -1, -1),
    new THREE.Vector3(-1, 3, -1),
    new THREE.Vector3(-1, 3, 1),
    new THREE.Vector3(-1, -1, -1),
    new THREE.Vector3(-1, -1, 1)
  ];

  const faces = [
    new THREE.Face3(0, 2, 1),
    new THREE.Face3(2, 3, 1),
    new THREE.Face3(4, 6, 5),
    new THREE.Face3(6, 7, 5),
    new THREE.Face3(4, 5, 1),
    new THREE.Face3(5, 0, 1),
    new THREE.Face3(7, 6, 2),
    new THREE.Face3(6, 3, 2),
    new THREE.Face3(5, 7, 0),
    new THREE.Face3(7, 2, 0),
    new THREE.Face3(1, 3, 4),
    new THREE.Face3(3, 6, 4)
  ];

  const geom = new THREE.Geometry();
  geom.vertices = vertices;
  geom.faces = faces;
  geom.computeFaceNormals();

  const materials = [
    new THREE.MeshLambertMaterial({
      opacity: 0.6,
      color: 0x44ff44,
      transparent: true
    }),
    new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true })
  ];

  const mesh = createMultiMaterialObject(geom, materials);
  mesh.children.forEach(e => {
    e.castShadow = true;
  });

  scene.add(mesh);

  function addControl(x, y, z) {
    const controls = new function() {
      this.x = x;
      this.y = y;
      this.z = z;
    }();
    return controls;
  }

  const controlPoints = [];
  controlPoints.push(addControl(3, 5, 3));
  controlPoints.push(addControl(3, 5, 0));
  controlPoints.push(addControl(3, 0, 3));
  controlPoints.push(addControl(3, 0, 0));
  controlPoints.push(addControl(0, 5, 0));
  controlPoints.push(addControl(0, 5, 3));
  controlPoints.push(addControl(0, 0, 0));
  controlPoints.push(addControl(0, 0, 3));

  const gui = new dat.GUI();
  gui.add(
    {
      clone: () => {
        const clonedGeometry = (mesh
          .children[0] as THREE.Mesh).geometry.clone();
        const materials = [
          new THREE.MeshLambertMaterial({
            opacity: 0.6,
            color: 0xff44ff,
            transparent: true
          }),
          new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true })
        ];
        const mesh2 = createMultiMaterialObject(clonedGeometry, materials);
        mesh2.children.forEach(function(e) {
          e.castShadow = true;
        });
        mesh2.translateX(5);
        mesh2.translateZ(5);
        mesh2.name = 'clone';
        scene.remove(scene.getObjectByName('clone'));
        scene.add(mesh2);
      }
    },
    'clone'
  );

  for (var i = 0; i < 8; i++) {
    const f1 = gui.addFolder('Vertices ' + (i + 1));
    f1.add(controlPoints[i], 'x', -10, 10);
    f1.add(controlPoints[i], 'y', -10, 10);
    f1.add(controlPoints[i], 'z', -10, 10);
  }

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
    mesh.children.forEach(function(e) {
      for (var i = 0; i < 8; i++) {
        ((e as THREE.Mesh).geometry as THREE.Geometry).vertices[i].set(
          controlPoints[i].x,
          controlPoints[i].y,
          controlPoints[i].z
        );
      }
      ((e as THREE.Mesh).geometry as THREE.Geometry).verticesNeedUpdate = true;
      ((e as THREE.Mesh).geometry as THREE.Geometry).computeFaceNormals();
    });
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  };
  render();
};

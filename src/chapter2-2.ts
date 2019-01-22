import * as THREE from 'three';
import * as Stats from 'stats.js';
import 'imports-loader?THREE=three!../node_modules/three/examples/js/QuickHull';
import 'imports-loader?THREE=three!../node_modules/three/examples/js/geometries/ConvexGeometry';
// import 'imports-loader?THREE=three!../node_modules/three/examples/js/utils/SceneUtils';

declare module 'three' {
  function ConvexGeometry(points: THREE.Vector3[]): void;
}

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
  camera.position.x = -50;
  camera.position.y = 30;
  camera.position.z = 20;
  camera.lookAt(new THREE.Vector3(-10, 0, 0));

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
  spotLight.position.set(-25, 25, 32);
  spotLight.castShadow = true;
  scene.add(spotLight);

  (argScene => {
    const geoms = [];
    geoms.push(new THREE.CylinderGeometry(1, 4, 4));
    geoms.push(new THREE.BoxGeometry(2, 2, 2));
    geoms.push(new THREE.SphereGeometry(2));
    geoms.push(new THREE.IcosahedronGeometry(4));
    const points = [
      new THREE.Vector3(2, 2, 2),
      new THREE.Vector3(2, 2, -2),
      new THREE.Vector3(-2, 2, -2),
      new THREE.Vector3(-2, 2, 2),
      new THREE.Vector3(2, -2, 2),
      new THREE.Vector3(2, -2, -2),
      new THREE.Vector3(-2, -2, -2),
      new THREE.Vector3(-2, -2, 2)
    ];
    geoms.push(new THREE.ConvexGeometry(points));

    const pts = [];
    const detail = 0.1;
    const radius = 3;
    for (let angle = 0.0; angle < Math.PI; angle += detail) {
      pts.push(
        new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0)
      );
    }
    geoms.push(new THREE.LatheGeometry(pts, 12));
    geoms.push(new THREE.OctahedronGeometry(3));
    geoms.push(
      new THREE.ParametricGeometry(
        (u, t, target) => {
          u *= Math.PI;
          t *= 2 * Math.PI;
          u = u * 2;
          const phi = u / 2;
          const major = 2.25;
          const a = 0.125;
          const b = 0.65;
          let x;
          let y;
          let z;

          x = a * Math.cos(t) * Math.cos(phi) - b * Math.sin(t) * Math.sin(phi);
          z = a * Math.cos(t) * Math.sin(phi) + b * Math.sin(t) * Math.cos(phi);
          y = (major + x) * Math.sin(u);
          x = (major + x) * Math.cos(u);

          target.set(x, y, z);
        },
        20,
        10
      )
    );
    geoms.push(new THREE.TetrahedronGeometry(3));
    geoms.push(new THREE.TorusGeometry(3, 1, 10, 10));
    geoms.push(new THREE.TorusKnotGeometry(3, 0.5, 50, 20));

    let j = 0;
    for (let i = 0; i < geoms.length; i++) {
      const cubeMaterial = new THREE.MeshLambertMaterial({
        wireframe: true,
        color: Math.random() * 0xffffff
      });

      const materials = [
        new THREE.MeshPhongMaterial({
          color: Math.random() * 0xffffff,
          flatShading: true
        }),
        new THREE.MeshBasicMaterial({
          color: 0x000000,
          wireframe: true
        })
      ];

      // const mesh = THREE.SceneUtils.createMultiMaterialObject(
      //   geoms[i],
      //   materials
      // );
      const mesh = ((geometry, materials) => {
        const group = new THREE.Group();
        materials.forEach(material => {
          group.add(new THREE.Mesh(geometry, material));
        });
        return group;
      })(geoms[i], materials);
      mesh.traverse(e => {
        e.castShadow = true;
      });
      mesh.position.x = -24 + (i % 4) * 12;
      mesh.position.y = 4;
      mesh.position.z = -8 + j * 12;

      if ((i + 1) % 4 === 0) j++;
      argScene.add(mesh);
    }
  })(scene);
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
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  };
  render();
};

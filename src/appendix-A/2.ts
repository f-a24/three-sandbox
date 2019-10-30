import * as THREE from 'three';
import { WEBVR } from '../../node_modules/three/examples/jsm/vr/WebVR';
import { SceneUtils } from '../../node_modules/three/examples/jsm/utils/SceneUtils';

export default () => {
  // if (WEBVR.isLatestAvailable() === false) {
  //     document.body.appendChild(WEBVR.getMessage());
  // }

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
  camera.position.x = 8;
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  /* renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);
  renderer.shadowMap.enabled = true;

  const raycaster = new THREE.Raycaster();
  let selectedDebri: THREE.Mesh;

  const createEarthMesh = (geom: THREE.Geometry) => {
    const textureLoader = new THREE.TextureLoader();
    const planetTexture = textureLoader.load('./assets/Earth.png');
    const specularTexture = textureLoader.load('./assets/EarthSpec.png');
    const normalTexture = textureLoader.load('./assets/EarthNormal.png');
    const planetMaterial = new THREE.MeshPhongMaterial();

    planetMaterial.specularMap = specularTexture;
    planetMaterial.specular = new THREE.Color(0x4444aa);
    planetMaterial.shininess = 5;
    planetMaterial.normalMap = normalTexture;
    planetMaterial.normalScale = new THREE.Vector2(5, 5);
    planetMaterial.map = planetTexture;

    return SceneUtils.createMultiMaterialObject(geom, [planetMaterial]);
  };

  const createAirMesh = (geom: THREE.Geometry) => {
    const planetMaterial = new THREE.MeshPhongMaterial();
    planetMaterial.side = THREE.BackSide;
    planetMaterial.transparent = true;
    planetMaterial.opacity = 0.2;
    planetMaterial.color = new THREE.Color(0xffffff);
    return SceneUtils.createMultiMaterialObject(geom, [planetMaterial]);
  };

  const createMoonMesh = (geom: THREE.Geometry) => {
    const textureLoader = new THREE.TextureLoader();
    const planetTexture = textureLoader.load('./assets/Moon.png');
    const normalTexture = textureLoader.load('./assets/Mars-normalmap_2k.png');
    const planetMaterial = new THREE.MeshPhongMaterial();
    planetMaterial.normalMap = normalTexture;
    planetMaterial.normalScale = new THREE.Vector2(5, 5);
    planetMaterial.map = planetTexture;
    planetMaterial.specularMap = planetTexture;
    planetMaterial.specular = new THREE.Color(0x444400);
    planetMaterial.shininess = 0;
    return new THREE.Mesh(geom, planetMaterial);
  };

  const createStarPoints = (
    num: number,
    size: number,
    center: THREE.Vector3,
    radius: number,
    red?: boolean
  ) => {
    const geom = new THREE.Geometry();
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(
      red ? './assets/lensflare0.png' : './assets/lensflare0_white.png'
    );
    const material = new THREE.PointsMaterial({ size, map: texture });
    for (let i = 0; i < num; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.random() * 2 * Math.PI;
      const r = radius * (1.5 + Math.random() / 10);
      const particle = new THREE.Vector3(
        r * Math.sin(theta) * Math.cos(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(theta)
      );
      geom.vertices.push(particle);
    }
    return new THREE.Points(geom, material);
  };

  const putDebriRandom = (
    mesh: THREE.Mesh,
    limitRadius: number,
    center: THREE.Vector3
  ) => {
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.random() * 2 * Math.PI;
    const r = limitRadius * 2 + Math.random() / 100;
    mesh.position.set(
      center.x + r * Math.sin(theta) * Math.cos(phi),
      center.y + r * Math.sin(theta) * Math.sin(phi),
      center.z + r * Math.cos(theta)
    );
  };

  const createDebri = (limitRadius: number, center: THREE.Vector3) => {
    const geom = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial();
    material.color = new THREE.Color(Math.random() * 0xffffff);
    material.emissive = new THREE.Color(0x333333);
    material.specular = new THREE.Color(0x4444aa);
    material.shininess = 100;
    const mesh = new THREE.Mesh(geom, material);
    putDebriRandom(mesh, limitRadius, center);
    mesh.rotation.x = Math.random() * 2 * Math.PI;
    mesh.rotation.y = Math.random() * 2 * Math.PI;
    mesh.rotation.z = Math.random() * 2 * Math.PI;

    return {
      mesh,
      drotx: (Math.random() - 0.5) / 10,
      droty: (Math.random() - 0.5) / 10,
      drotz: (Math.random() - 0.5) / 10
    };
  };

  const removeSelectedDebri = (limitRadius: number, center: THREE.Vector3) => {
    if (selectedDebri) {
      putDebriRandom(selectedDebri, limitRadius, center);
      deselectDebri();
    }
  };

  const deselectDebri = () => {
    if (selectedDebri) {
      (selectedDebri.material as THREE.MeshLambertMaterial).emissive.setHex(
        0x333333
      );
      selectedDebri.scale.set(1, 1, 1);
    }
    selectedDebri = null;
  };

  const selectDebri = () => {
    raycaster.setFromCamera({ x: 0, y: 0 }, camera);
    const intersects = raycaster.intersectObjects(earthAndDebris);
    if (intersects.length === 0) {
      deselectDebri();
    } else {
      for (let i = 0; i < intersects.length; i++) {
        const debri = intersects[i].object as THREE.Mesh;
        if (debri === earth) {
          console.log(debri === earth);
          break;
        }
        if (selectedDebri !== debri) {
          deselectDebri();
          selectedDebri = debri;
          (debri.material as THREE.MeshLambertMaterial).emissive.setHex(
            0xff3333
          );
          debri.scale.set(2, 2, 2);
          break;
        }
      }
    }
  };

  /* earth */
  const earth = createEarthMesh(new THREE.SphereGeometry(10, 80, 80));
  earth.position.y = -10;
  scene.add(earth);

  /* air */
  const air = createAirMesh(new THREE.SphereGeometry(10.1, 80, 80));
  air.position.copy(earth.position);
  scene.add(air);

  /* moon */
  const moon = createMoonMesh(new THREE.SphereGeometry(5, 20, 20));
  moon.position.x = -50;
  earth.add(moon);

  /* stars */
  const pos = earth.position;
  const rad = Math.abs(moon.position.x);
  earth.add(createStarPoints(100, 5, pos, rad, true));
  earth.add(createStarPoints(500, 3, pos, rad));
  earth.add(createStarPoints(2000, 2, pos, rad));

  /* debris */
  const earthAndDebris = [earth];
  const debris: {
    mesh: THREE.Mesh;
    drotx: number;
    droty: number;
    drotz: number;
  }[] = [];
  for (let i = 0; i < 30; i++) {
    const debri = createDebri(10.2, earth.position);
    earth.add(debri.mesh);
    debris.push(debri);
    const earthGroup = new THREE.Group();
    earthGroup.add(debri.mesh);
    earthAndDebris.push(earthGroup);
  }

  const ambi = new THREE.AmbientLight(0x181818);
  scene.add(ambi);

  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(100, 0, 150);
  earth.add(directionalLight);

  const directionalBackLight = new THREE.DirectionalLight(0xffffff);
  directionalBackLight.position.copy(
    directionalLight.position.clone().negate()
  );
  directionalBackLight.intensity = 0.7;
  earth.add(directionalBackLight);

  document.getElementById('WebGL-output').appendChild(renderer.domElement);

  document.body.appendChild(WEBVR.createButton(renderer, undefined));

  renderer.domElement.addEventListener('click', function() {
    if (
      !(document as any).mozFullScreen &&
      !(document as any).webkitIsFullScreen
    ) {
      const canvas = renderer.domElement;
      const requestFullScreen =
        (canvas as any).mozRequestFullScreen ||
        (canvas as any).webkitRequestFullScreen;
      requestFullScreen.bind(canvas)();
    } else {
      removeSelectedDebri(10.2, earth.position);
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
    debris.forEach(({ mesh, drotx, droty, drotz }) => {
      mesh.rotation.x += drotx;
      mesh.rotation.y += droty;
      mesh.rotation.z += drotz;
    });

    selectDebri();
    earth.rotation.z -= 0.001;

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  };
  renderScene();
};

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
    VIEWPORT_W / VIEWPORT_H,
    0.1,
    200
  );
  camera.position.x = 20;
  camera.position.y = 40;
  camera.position.z = 110;
  camera.lookAt(new THREE.Vector3(20, 30, 0));

  /* renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);

  const velocities: { x: number; y: number; z: number }[] = [];
  const createPoints = (
    name: string,
    texture: THREE.Texture,
    size: number,
    transparent: boolean,
    opacity: number,
    sizeAttenuation: boolean,
    color: number
  ) => {
    const geom = new THREE.Geometry();
    const newColor = new THREE.Color(color);
    newColor.setHSL(
      newColor.getHSL({} as THREE.HSL).h,
      newColor.getHSL({} as THREE.HSL).s,
      Math.random() * newColor.getHSL({} as THREE.HSL).l
    );
    const material = new THREE.PointsMaterial({
      size: size,
      transparent: transparent,
      opacity: opacity,
      map: texture,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: sizeAttenuation,
      color: color
    });

    const range = 40;
    for (let i = 0; i < 50; i++) {
      const particle = new THREE.Vector3(
        Math.random() * range - range / 2,
        Math.random() * range * 1.5,
        Math.random() * range - range / 2
      );
      velocities.push({
        x: (Math.random() - 0.5) / 3,
        y: 0.1 + Math.random() / 5,
        z: (Math.random() - 0.5) / 3
      });
      geom.vertices.push(particle);
    }
    const system = new THREE.Points(geom, material);
    system.name = name;
    return system;
  };

  const createMultiPoints = (
    size: number,
    transparent: boolean,
    opacity: number,
    sizeAttenuation: boolean,
    color: number
  ) => {
    const textureLoader = new THREE.TextureLoader();
    const texture1 = textureLoader.load('./assets/snowflake1.png');
    const texture2 = textureLoader.load('./assets/snowflake2.png');
    const texture3 = textureLoader.load('./assets/snowflake3.png');
    const texture4 = textureLoader.load('./assets/snowflake5.png');
    scene.add(
      createPoints(
        'system1',
        texture1,
        size,
        transparent,
        opacity,
        sizeAttenuation,
        color
      )
    );
    scene.add(
      createPoints(
        'system2',
        texture2,
        size,
        transparent,
        opacity,
        sizeAttenuation,
        color
      )
    );
    scene.add(
      createPoints(
        'system3',
        texture3,
        size,
        transparent,
        opacity,
        sizeAttenuation,
        color
      )
    );
    scene.add(
      createPoints(
        'system4',
        texture4,
        size,
        transparent,
        opacity,
        sizeAttenuation,
        color
      )
    );
  };

  document.getElementById('WebGL-output').appendChild(renderer.domElement);

  const controls = {
    size: 10,
    transparent: true,
    opacity: 0.6,
    color: 0xffffff,
    sizeAttenuation: true,
    redraw: () => {
      const toRemove = [];
      scene.children.forEach(child => {
        if (child instanceof THREE.Points) {
          toRemove.push(child);
        }
      });
      toRemove.forEach(function(child) {
        scene.remove(child);
      });
      createMultiPoints(
        controls.size,
        controls.transparent,
        controls.opacity,
        controls.sizeAttenuation,
        controls.color
      );
    }
  };

  /* gui */
  const gui = new dat.GUI();
  gui.add(controls, 'size', 0, 20).onChange(controls.redraw);
  gui.add(controls, 'transparent').onChange(controls.redraw);
  gui.add(controls, 'opacity', 0, 1).onChange(controls.redraw);
  gui.addColor(controls, 'color').onChange(controls.redraw);
  gui.add(controls, 'sizeAttenuation').onChange(controls.redraw);

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
  const renderScene = () => {
    stats.update();

    scene.children.forEach(child => {
      if (child instanceof THREE.Points) {
        const vertices = (child.geometry as THREE.Geometry).vertices;
        vertices.forEach((v, i) => {
          v.x = v.x - velocities[i].x;
          v.y = v.y - velocities[i].y;
          v.z = v.z - velocities[i].z;
          if (v.x <= -20 || v.x >= 20) velocities[i].x = velocities[i].x * -1;
          if (v.y <= 0) v.y = 60;
          if (v.z <= -20 || v.z >= 20) velocities[i].z = velocities[i].z * -1;
        });
        (child.geometry as THREE.Geometry).verticesNeedUpdate = true;
      }
    });

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  };
  controls.redraw();
  renderScene();
};

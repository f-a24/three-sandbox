import * as THREE from 'three';
import * as Stats from 'stats.js';
import * as dat from 'dat.gui';

export default () => {
  // 画面サイズ
  const VIEWPORT_W = window.innerWidth;
  const VIEWPORT_H = window.innerHeight;

  /* scene */
  const scene = new THREE.Scene();
  const sceneOrtho = new THREE.Scene();

  /* camera */
  const camera = new THREE.PerspectiveCamera(
    45,
    VIEWPORT_W / VIEWPORT_H,
    0.1,
    250
  );
  const cameraOrtho = new THREE.OrthographicCamera(
    0,
    VIEWPORT_W,
    VIEWPORT_H,
    0,
    -10,
    10
  );
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 50;

  /* renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);

  const material = new THREE.MeshNormalMaterial();
  const geom = new THREE.SphereGeometry(15, 20, 20);
  const mesh = new THREE.Mesh(geom, material);
  scene.add(mesh);

  const getTexture = () => {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('./assets/sprite-sheet.png');
    return texture;
  };

  const velocityX: number[] = [];
  const createSprite = (
    size: number,
    transparent: boolean,
    opacity: number,
    color: number,
    spriteNumber: number
  ) => {
    const spriteMaterial = new THREE.SpriteMaterial({
      opacity,
      color,
      transparent,
      map: getTexture(),
    });
    spriteMaterial.map.offset = new THREE.Vector2(0.2 * spriteNumber, 0);
    spriteMaterial.map.repeat = new THREE.Vector2(1 / 5, 1);
    spriteMaterial.depthTest = false;
    spriteMaterial.blending = THREE.AdditiveBlending;

    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(size, size, size);
    sprite.position.set(100, 50, -10);
    velocityX.push(5);
    sceneOrtho.add(sprite);
  };

  document.getElementById('WebGL-output').appendChild(renderer.domElement);

  const controls = {
    size: 150,
    sprite: 0,
    transparent: true,
    opacity: 0.6,
    color: 0xffffff,
    rotateSystem: true,
    redraw: () => {
      sceneOrtho.children.forEach((child) => {
        if (child instanceof THREE.Sprite) sceneOrtho.remove(child);
      });
      createSprite(
        controls.size,
        controls.transparent,
        controls.opacity,
        controls.color,
        controls.sprite
      );
    },
  };

  /* gui */
  const gui = new dat.GUI();
  gui.add(controls, 'sprite', 0, 4).step(1).onChange(controls.redraw);
  gui.add(controls, 'size', 0, 120).onChange(controls.redraw);
  gui.add(controls, 'transparent').onChange(controls.redraw);
  gui.add(controls, 'opacity', 0, 1).onChange(controls.redraw);
  gui.addColor(controls, 'color').onChange(controls.redraw);

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
  const renderScene = () => {
    stats.update();

    camera.position.y = Math.sin((step += 0.01)) * 20;
    sceneOrtho.children.forEach((e, i) => {
      if (e instanceof THREE.Sprite) {
        e.position.x = e.position.x + velocityX[i];
        if (e.position.x > window.innerWidth) {
          velocityX[i] = -5;
          controls.sprite = (controls.sprite + 1) % 5;
          e.material.map.offset.set((1 / 5) * controls.sprite, 0);
        }
        if (e.position.x < 0) {
          velocityX[i] = 5;
        }
      }
    });

    requestAnimationFrame(renderScene);

    renderer.render(scene, camera);
    renderer.autoClear = false;
    renderer.render(sceneOrtho, cameraOrtho);
  };
  controls.redraw();
  renderScene();
};

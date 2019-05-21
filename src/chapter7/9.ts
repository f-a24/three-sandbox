import * as THREE from 'three';
import * as Stats from 'stats.js';

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
  camera.position.x = 20;
  camera.position.y = 0;
  camera.position.z = 150;

  /* renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);

  let group: THREE.Group;
  const createSprites = () => {
    group = new THREE.Group();
    const range = 200;
    for (let i = 0; i < 400; i++) {
      group.add(createSprite(10, false, 0.6, 0xffffff, i % 5, range));
    }
    scene.add(group);
  };

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
    spriteNumber: number,
    range: number
  ) => {
    const spriteMaterial = new THREE.SpriteMaterial({
      opacity: opacity,
      color: color,
      transparent: transparent,
      map: getTexture()
    });
    spriteMaterial.map.offset = new THREE.Vector2(0.2 * spriteNumber, 0);
    spriteMaterial.map.repeat = new THREE.Vector2(1 / 5, 1);
    spriteMaterial.depthTest = false;
    spriteMaterial.blending = THREE.AdditiveBlending;

    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(size, size, size);
    sprite.position.set(
      Math.random() * range - range / 2,
      Math.random() * range - range / 2,
      Math.random() * range - range / 2
    );
    velocityX.push(5);
    return sprite;
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

  /* render */
  let step = 0;
  const renderScene = () => {
    stats.update();

    step += 0.01;
    group.rotation.x = step;

    requestAnimationFrame(renderScene);

    renderer.render(scene, camera);
  };
  createSprites();
  renderScene();
};

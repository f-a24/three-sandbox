import * as THREE from 'three';
import * as Stats from 'stats.js';
import * as TWEEN from '@tweenjs/tween.js';
import 'imports-loader?THREE=three!../../node_modules/three/examples/js/loaders/PLYLoader.js';

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
  camera.position.x = 10;
  camera.position.y = 10;
  camera.position.z = 10;
  camera.lookAt(new THREE.Vector3(0, -2, 0));

  /* renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);
  renderer.shadowMap.enabled = true;

  // spotlight
  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(20, 20, 20);
  scene.add(spotLight);

  document.getElementById('WebGL-output').appendChild(renderer.domElement);

  let pointCloud: THREE.Points;
  let loadedGeometry: THREE.BufferGeometry;

  const posSrc = { pos: 1 };
  const tween = new TWEEN.Tween(posSrc).to({ pos: 0 }, 5000);
  tween.easing(TWEEN.Easing.Sinusoidal.InOut);
  const tweenBack = new TWEEN.Tween(posSrc).to({ pos: 1 }, 5000);
  tweenBack.easing(TWEEN.Easing.Sinusoidal.InOut);
  tween.chain(tweenBack);
  tweenBack.chain(tween);

  const onUpdate = ({ pos }) => {
    const position = loadedGeometry.getAttribute('position');
    const array = position.array as number[];
    const vertexPositions = [] as number[][];
    for (let i = 0; i < array.length - 1; i += 3) {
      vertexPositions.push([
        array[i],
        (array[i + 1] + 3.22544) * pos - 3.22544,
        array[i + 2]
      ]);
    }
    const vertices = new Float32Array(vertexPositions.flat());
    (pointCloud.geometry as THREE.BufferGeometry).addAttribute(
      'position',
      new THREE.BufferAttribute(vertices, 3)
    );

    // let count = 0;
    // loadedGeometry.vertices.forEach(function(e) {
    //   const newY = (e.y + 3.22544) * pos - 3.22544;
    //   (pointCloud.geometry as THREE.Geometry).vertices[count++].set(
    //     e.x,
    //     newY,
    //     e.z
    //   );
    // });
    // pointCloud.position.needsUpdate = true;
  };
  tween.onUpdate(onUpdate);
  tweenBack.onUpdate(onUpdate);

  const generateSprite = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const context = canvas.getContext('2d');
    const gradient = context.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      0,
      canvas.width / 2,
      canvas.height / 2,
      canvas.width / 2
    );
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.2, 'rgba(0,255,255,1)');
    gradient.addColorStop(0.4, 'rgba(0,0,64,1)');
    gradient.addColorStop(1, 'rgba(0,0,0,1)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  };

  const loader = new (THREE as any).PLYLoader();
  loader.load('./assets/test.ply', (geometry: THREE.BufferGeometry) => {
    loadedGeometry = geometry.clone();
    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.4,
      opacity: 0.6,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      map: generateSprite()
    });
    pointCloud = new THREE.Points(geometry, material);
    tween.start();
    scene.add(pointCloud);
  });

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
    TWEEN.update();
    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  };
  renderScene();
};

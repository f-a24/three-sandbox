import * as THREE from 'three';
import * as dat from 'dat.gui';
// import 'imports-loader?THREE=three!../../node_modules/three/examples/js/libs/mmdparser.min.js';
// import 'imports-loader?THREE=three!../../node_modules/three/examples/js/libs/ammo.js';
import 'imports-loader?THREE=three!../../node_modules/three/examples/js/loaders/TGALoader.js';
import 'imports-loader?THREE=three!../../node_modules/three/examples/js/loaders/MMDLoader.js';
import 'imports-loader?THREE=three!../../node_modules/three/examples/js/animation/CCDIKSolver.js';
import 'imports-loader?THREE=three!../../node_modules/three/examples/js/animation/MMDPhysics.js';
import 'imports-loader?THREE=three!../../node_modules/three/examples/js/animation/MMDAnimationHelper.js';

(window as any).MMDParser = require('../../node_modules/three/examples/js/libs/mmdparser.min.js');
(window as any).Ammo = require('../../node_modules/three/examples/js/libs/ammo.js')();

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
    1,
    2000
  );
  camera.position.z = 50;
  camera.lookAt(scene.position);

  /* renderer */
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);
  renderer.setClearColor(new THREE.Color(0xffffff));

  const ambient = new THREE.AmbientLight(0x888888);
  scene.add(ambient);
  const directionalLight = new THREE.DirectionalLight(0x666666);
  directionalLight.position.set(-1, 1, 1).normalize();
  scene.add(directionalLight);

  /* GUI */
  const initGui = () => {
    const gui = new dat.GUI();
    const dictionary = mesh.morphTargetDictionary;
    const controls = {} as { [key: string]: any };
    const keys = [];
    const files = { default: -1 };

    const poses = gui.addFolder('Poses');
    const morphs = gui.addFolder('Morphs');

    const getBaseName = (s: string) => s.slice(s.lastIndexOf('/') + 1);

    const onChangeMorph = () => {
      keys.forEach((key, i) => {
        mesh.morphTargetInfluences[i] = controls[key];
      });
    };

    const onChangePose = () => {
      const index = parseInt(controls.pose);
      if (index === -1) {
        (mesh as any).pose();
      } else {
        helper.pose(mesh, vpds[index]);
      }
    };

    controls.pose = -1;
    vpdFiles.forEach((file, i) => {
      controls[getBaseName(file)] = false;
      files[getBaseName(file)] = i;
    });
    poses.add(controls, 'pose', files).onChange(onChangePose);

    Object.keys(dictionary).forEach(key => {
      controls[key] = 0.0;
      keys.push(key);
      morphs.add(controls, key, 0.0, 1.0, 0.01).onChange(onChangeMorph);
    });

    onChangeMorph();
    onChangePose();

    poses.open();
    morphs.open();
  };

  const onProgress = xhr => {
    if (xhr.lengthComputable) {
      const percentComplete = (xhr.loaded / xhr.total) * 100;
      console.log(Math.round(percentComplete) + '% downloaded');
    }
  };

  const onError = error => {
    console.log('ERROR:', error);
  };

  let mesh: THREE.Mesh;
  const vpds = [];

  //   const helper = new (THREE as any).MMDHelper(renderer);
  const helper = new (THREE as any).MMDAnimationHelper();
  const loader = new (THREE as any).MMDLoader();

  const vpdFiles = [
    'vpds/01.vpd',
    'vpds/02.vpd',
    'vpds/03.vpd',
    'vpds/04.vpd',
    'vpds/05.vpd',
    'vpds/06.vpd',
    'vpds/07.vpd',
    'vpds/08.vpd',
    'vpds/09.vpd',
    'vpds/10.vpd',
    'vpds/11.vpd'
  ];

  loader.load(
    'model/kizunaai.pmx',
    (object: THREE.Mesh) => {
      mesh = object;
      mesh.position.y = -10;
      scene.add(mesh);
      let vpdIndex = 0;
      const loadVpd = () => {
        const vpdFile = vpdFiles[vpdIndex];
        loader.loadVPD(
          vpdFile,
          false,
          vpd => {
            vpds.push(vpd);
            vpdIndex++;
            if (vpdIndex < vpdFiles.length) {
              loadVpd();
            } else {
              initGui();
            }
          },
          onProgress,
          onError
        );
      };
      loadVpd();
    },
    onProgress,
    onError
  );

  document.getElementById('WebGL-output').appendChild(renderer.domElement);

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
    camera.lookAt(scene.position);

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  };
  renderScene();

  /* copyright */
  const copyright = document.createElement('span');
  copyright.innerHTML = '© Kizuna AI';
  copyright.className = 'copyright';
  document.body.appendChild(copyright);
};

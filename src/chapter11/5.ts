import * as THREE from 'three';
import * as Stats from 'stats.js';
import * as dat from 'dat.gui';
import { MTLLoader } from '../../node_modules/three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from '../../node_modules/three/examples/jsm/loaders/OBJLoader';
import { EffectComposer } from '../../node_modules/three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from '../../node_modules/three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from '../../node_modules/three/examples/jsm/postprocessing/ShaderPass';
import { MirrorShader } from '../../node_modules/three/examples/jsm/shaders/MirrorShader';
import { HueSaturationShader } from '../../node_modules/three/examples/jsm/shaders/HueSaturationShader';
import { VignetteShader } from '../../node_modules/three/examples/jsm/shaders/VignetteShader';
import { ColorCorrectionShader } from '../../node_modules/three/examples/jsm/shaders/ColorCorrectionShader';
import { RGBShiftShader } from '../../node_modules/three/examples/jsm/shaders/RGBShiftShader';
import { BrightnessContrastShader } from '../../node_modules/three/examples/jsm/shaders/BrightnessContrastShader';
import { ColorifyShader } from '../../node_modules/three/examples/jsm/shaders/ColorifyShader';
import { SepiaShader } from '../../node_modules/three/examples/jsm/shaders/SepiaShader';
import { KaleidoShader } from '../../node_modules/three/examples/jsm/shaders/KaleidoShader';
import { LuminosityShader } from '../../node_modules/three/examples/jsm/shaders/LuminosityShader';
import { TechnicolorShader } from '../../node_modules/three/examples/jsm/shaders/TechnicolorShader';
import { UnpackDepthRGBAShader } from '../../node_modules/three/examples/jsm/shaders/UnpackDepthRGBAShader';
import { CopyShader } from '../../node_modules/three/examples/jsm/shaders/CopyShader';

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
  camera.position.set(20, 30, 40);
  camera.lookAt(new THREE.Vector3(-15, -10, -25));

  /* renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xaaaaff));
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);
  renderer.shadowMap.enabled = true;

  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.castShadow = true;
  spotLight.position.set(0, 60, 50);
  spotLight.intensity = 1;
  spotLight.shadow.mapSize.width = 2048;
  spotLight.shadow.mapSize.height = 2048;
  spotLight.shadow.camera.fov = 120;
  spotLight.shadow.camera.near = 1;
  spotLight.shadow.camera.far = 1000;
  scene.add(spotLight);

  const ambiLight = new THREE.AmbientLight(0x444444);
  scene.add(ambiLight);

  document.getElementById('WebGL-output').appendChild(renderer.domElement);

  const plane = new THREE.BoxGeometry(1600, 1600, 0.1, 40, 40);
  const textureLoader = new THREE.TextureLoader();
  const cube = new THREE.Mesh(
    plane,
    new THREE.MeshPhongMaterial({
      color: 0xffffff,
      map: textureLoader.load('./assets/tex/plaster-diffuse.jpg'),
      normalMap: textureLoader.load('./assets/tex/plaster-normal.jpg'),
      normalScale: new THREE.Vector2(0.6, 0.6),
    })
  );
  (cube.material as THREE.MeshPhongMaterial).map.wrapS = THREE.RepeatWrapping;
  (cube.material as THREE.MeshPhongMaterial).map.wrapT = THREE.RepeatWrapping;
  (cube.material as THREE.MeshPhongMaterial).normalMap.wrapS =
    THREE.RepeatWrapping;
  (cube.material as THREE.MeshPhongMaterial).normalMap.wrapT =
    THREE.RepeatWrapping;
  cube.rotation.x = Math.PI / 2;
  (cube.material as THREE.MeshPhongMaterial).map.repeat.set(80, 80);
  cube.receiveShadow = true;
  cube.position.z = -150;
  cube.position.x = -150;
  scene.add(cube);

  const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(30, 10, 2),
    new THREE.MeshPhongMaterial({ color: 0xff0000 })
  );
  cube1.position.x = -15;
  cube1.position.y = 5;
  cube1.position.z = 15;
  cube1.castShadow = true;
  scene.add(cube1);

  const cube2 = cube1.clone();
  cube2.material = (cube1.material as THREE.Material).clone();
  (cube2.material as THREE.MeshPhongMaterial).color = new THREE.Color(0x00ff00);
  cube2.position.z = 5;
  cube2.position.x = -20;
  scene.add(cube2);

  const cube3 = cube1.clone();
  cube3.material = (cube1.material as THREE.Material).clone();
  (cube3.material as THREE.MeshPhongMaterial).color = new THREE.Color(0x0000ff);
  cube3.position.z = -8;
  cube3.position.x = -25;
  scene.add(cube3);

  let mesh: THREE.Group;
  const mtlLoader = new MTLLoader();
  mtlLoader.load('./assets/LibertStatue.mtl', (materials) => {
    materials.preload();
    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('./assets/LibertStatue.obj', (object) => {
      object.children.forEach((e) => {
        e.castShadow = true;
      });
      object.scale.set(20, 20, 20);
      mesh = object;
      mesh.position.x = 15;
      mesh.position.z = 5;
      scene.add(object);
    });
  });

  const mirror = new ShaderPass(MirrorShader);
  mirror.enabled = false;

  const hue = new ShaderPass(HueSaturationShader);
  hue.enabled = false;

  const vignette = new ShaderPass(VignetteShader);
  vignette.enabled = false;

  const colorCorrection = new ShaderPass(ColorCorrectionShader);
  colorCorrection.enabled = false;

  const rgbShift = new ShaderPass(RGBShiftShader);
  rgbShift.enabled = false;

  const brightness = new ShaderPass(BrightnessContrastShader);
  (brightness.uniforms as any).brightness.value = 0;
  (brightness.uniforms as any).contrast.value = 0;
  brightness.enabled = false;
  (brightness.uniforms as any).brightness.value = 0;
  (brightness.uniforms as any).contrast.value = 0;

  const colorify = new ShaderPass(ColorifyShader);
  (colorify.uniforms as any).color.value = new THREE.Color(0xffffff);
  colorify.enabled = false;

  const sepia = new ShaderPass(SepiaShader);
  (sepia.uniforms as any).amount.value = 1;
  sepia.enabled = false;

  const kal = new ShaderPass(KaleidoShader);
  kal.enabled = false;

  const lum = new ShaderPass(LuminosityShader);
  lum.enabled = false;

  const techni = new ShaderPass(TechnicolorShader);
  techni.enabled = false;

  const unpack = new ShaderPass(UnpackDepthRGBAShader);
  unpack.enabled = false;

  const renderPass = new RenderPass(scene, camera);
  const effectCopy = new ShaderPass(CopyShader);
  effectCopy.renderToScreen = true;

  const composer = new EffectComposer(renderer);
  composer.addPass(renderPass);
  composer.addPass(brightness);
  composer.addPass(sepia);
  composer.addPass(mirror);
  composer.addPass(colorify);
  composer.addPass(colorCorrection);
  composer.addPass(rgbShift);
  composer.addPass(vignette);
  composer.addPass(hue);
  composer.addPass(kal);
  composer.addPass(lum);
  composer.addPass(techni);
  composer.addPass(unpack);
  composer.addPass(effectCopy);

  const enableShader = (shader?: ShaderPass) => {
    for (let i = 1; i < composer.passes.length - 1; i++) {
      composer.passes[i].enabled = composer.passes[i] === shader;
    }
  };

  const controls = {
    brightness: 0.01,
    contrast: 0.01,
    select: 'none',
    color: 0xffffff,
    amount: 1,
    powRGB_R: 2,
    mulRGB_R: 1,
    powRGB_G: 2,
    mulRGB_G: 1,
    powRGB_B: 2,
    mulRGB_B: 1,
    rgbAmount: 0.005,
    angle: 0.0,
    side: 1,
    offset: 1,
    darkness: 1,
    hue: 0.01,
    saturation: 0.01,
    kalAngle: 0,
    kalSides: 6,
    rotate: false,
    switchShader: () => {
      switch (controls.select) {
        case 'none': {
          enableShader();
          break;
        }
        case 'colorify': {
          enableShader(colorify);
          break;
        }
        case 'brightness': {
          enableShader(brightness);
          break;
        }
        case 'sepia': {
          enableShader(sepia);
          break;
        }
        case 'colorCorrection': {
          enableShader(colorCorrection);
          break;
        }
        case 'rgbShift': {
          enableShader(rgbShift);
          break;
        }
        case 'mirror': {
          enableShader(mirror);
          break;
        }
        case 'vignette': {
          enableShader(vignette);
          break;
        }
        case 'hueAndSaturation': {
          enableShader(hue);
          break;
        }
        case 'kaleidoscope': {
          enableShader(kal);
          break;
        }
        case 'luminosity': {
          enableShader(lum);
          break;
        }
        case 'technicolor': {
          enableShader(techni);
          break;
        }
        case 'unpackDepth': {
          enableShader(unpack);
          break;
        }
      }
    },
    changeBrightness: () => {
      (brightness.uniforms as any).brightness.value = controls.brightness;
      (brightness.uniforms as any).contrast.value = controls.contrast;
    },
    changeColor: () => {
      (brightness.uniforms as any).color.value = new THREE.Color(
        controls.color
      );
    },
    changeSepia: () => {
      (sepia.uniforms as any).amount.value = controls.amount;
    },
    changeCorrection: () => {
      (colorCorrection.uniforms as any).mulRGB.value = new THREE.Vector3(
        controls.mulRGB_R,
        controls.mulRGB_G,
        controls.mulRGB_B
      );
      (colorCorrection.uniforms as any).powRGB.value = new THREE.Vector3(
        controls.powRGB_R,
        controls.powRGB_G,
        controls.powRGB_B
      );
    },
    changeRGBShifter: () => {
      (rgbShift.uniforms as any).amount.value = controls.rgbAmount;
      (rgbShift.uniforms as any).angle.value = controls.angle;
    },
    changeMirror: () => {
      (mirror.uniforms as any).side.value = controls.side;
    },
    changeVignette: () => {
      (vignette.uniforms as any).darkness.value = controls.darkness;
      (vignette.uniforms as any).offset.value = controls.offset;
    },
    changeHue: () => {
      (hue.uniforms as any).hue.value = controls.hue;
      (hue.uniforms as any).saturation.value = controls.saturation;
    },
    changeKal: () => {
      (kal.uniforms as any).sides.value = controls.kalSides;
      (kal.uniforms as any).angle.value = controls.kalAngle;
    },
  };

  const gui = new dat.GUI();
  gui
    .add(controls, 'select', [
      'none',
      'colorify',
      'brightness',
      'sepia',
      'colorCorrection',
      'rgbShift',
      'mirror',
      'vignette',
      'hueAndSaturation',
      'kaleidoscope',
      'luminosity',
      'technicolor',
    ])
    .onChange(controls.switchShader);
  gui.add(controls, 'rotate');

  const bnFolder = gui.addFolder('Brightness');
  bnFolder
    .add(controls, 'brightness', -1, 1)
    .onChange(controls.changeBrightness);
  bnFolder.add(controls, 'contrast', -1, 1).onChange(controls.changeBrightness);

  const clFolder = gui.addFolder('Colorify');
  clFolder.addColor(controls, 'color').onChange(controls.changeColor);

  const colFolder = gui.addFolder('Color Correction');
  colFolder.add(controls, 'powRGB_R', 0, 5).onChange(controls.changeCorrection);
  colFolder.add(controls, 'powRGB_G', 0, 5).onChange(controls.changeCorrection);
  colFolder.add(controls, 'powRGB_B', 0, 5).onChange(controls.changeCorrection);
  colFolder.add(controls, 'mulRGB_R', 0, 5).onChange(controls.changeCorrection);
  colFolder.add(controls, 'mulRGB_G', 0, 5).onChange(controls.changeCorrection);
  colFolder.add(controls, 'mulRGB_B', 0, 5).onChange(controls.changeCorrection);

  const sepiaFolder = gui.addFolder('Sepia');
  sepiaFolder
    .add(controls, 'amount', 0, 2)
    .step(0.1)
    .onChange(controls.changeSepia);

  const shiftFolder = gui.addFolder('RGB Shift');
  shiftFolder
    .add(controls, 'rgbAmount', 0, 0.1)
    .step(0.001)
    .onChange(controls.changeRGBShifter);
  shiftFolder
    .add(controls, 'angle', 0, 3.14)
    .step(0.001)
    .onChange(controls.changeRGBShifter);

  const mirrorFolder = gui.addFolder('mirror');
  mirrorFolder
    .add(controls, 'side', 0, 3)
    .step(1)
    .onChange(controls.changeMirror);

  const vignetteFolder = gui.addFolder('vignette');
  vignetteFolder
    .add(controls, 'darkness', 0, 2)
    .onChange(controls.changeVignette);
  vignetteFolder
    .add(controls, 'offset', 0, 2)
    .onChange(controls.changeVignette);

  const hueAndSat = gui.addFolder('hue and saturation');
  hueAndSat.add(controls, 'hue', -1, 1).step(0.01).onChange(controls.changeHue);
  hueAndSat
    .add(controls, 'saturation', -1, 1)
    .step(0.01)
    .onChange(controls.changeHue);

  const kalMenu = gui.addFolder('Kaleidoscope');
  kalMenu
    .add(controls, 'kalAngle', -2 * Math.PI, 2 * Math.PI)
    .onChange(controls.changeKal);
  kalMenu.add(controls, 'kalSides', 2, 20).onChange(controls.changeKal);

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

    if (controls.rotate) {
      if (mesh) mesh.rotation.y += 0.01;
      cube1.rotation.y += 0.01;
      cube2.rotation.y += 0.01;
      cube3.rotation.y += 0.01;
    }
    requestAnimationFrame(renderScene);
    composer.render();
  };
  renderScene();
};

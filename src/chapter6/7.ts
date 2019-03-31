import * as THREE from 'three';
import * as Stats from 'stats.js';
import * as dat from 'dat.gui';

export default () => {
  // 画面サイズ
  const VIEWPORT_W = window.innerWidth;
  const VIEWPORT_H = window.innerHeight;

  const fonts = {} as { [font: string]: THREE.Font };
  const fontLoader = new THREE.FontLoader();
  fontLoader.load(
    './assets/helvetiker_regular.typeface.js',
    (helvetiker: THREE.Font) => {
      fonts['helvetiker'] = helvetiker;
      fontLoader.load(
        './assets/optimer_regular.typeface.js',
        (optimer: THREE.Font) => {
          fonts['optimer'] = optimer;

          /* scene */
          const scene = new THREE.Scene();

          /* camera */
          const camera = new THREE.PerspectiveCamera(
            45,
            VIEWPORT_W / VIEWPORT_H,
            0.1,
            1000
          );
          camera.position.x = 100;
          camera.position.y = 300;
          camera.position.z = 600;
          camera.lookAt(new THREE.Vector3(400, 0, -300));

          /* renderer */
          const renderer = new THREE.WebGLRenderer();
          renderer.setClearColor(new THREE.Color(0xeeeeee));
          renderer.setSize(VIEWPORT_W, VIEWPORT_H);
          renderer.shadowMap.enabled = true;

          /* dirLight */
          const dirLight = new THREE.DirectionalLight();
          dirLight.position.set(25, 23, 15);
          scene.add(dirLight);

          const dirLight2 = new THREE.DirectionalLight();
          dirLight2.position.set(-25, 23, 15);
          scene.add(dirLight2);

          document
            .getElementById('WebGL-output')
            .appendChild(renderer.domElement);

          const createMesh = (geom: THREE.TextGeometry) => {
            const meshMaterial = new THREE.MeshPhongMaterial({
              specular: 0xffffff,
              color: 0xff6666,
              shininess: 100
            });
            const plane = new THREE.Mesh(geom, meshMaterial);
            return plane;
          };

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

          let text1: THREE.Mesh;
          let text2: THREE.Mesh;

          /* gui */
          const controls = {
            size: 90,
            height: 90,
            bevelThickness: 2,
            bevelSize: 0.5,
            bevelEnabled: true,
            bevelSegments: 3,
            curveSegments: 12,
            steps: 1,
            font: 'helvetiker',
            weight: 'normal',
            asGeom: () => {
              scene.remove(text1);
              scene.remove(text2);
              const options = {
                size: controls.size,
                height: controls.height,
                weight: controls.weight,
                font: fonts[controls.font],
                bevelThickness: controls.bevelThickness,
                bevelSize: controls.bevelSize,
                bevelSegments: controls.bevelSegments,
                bevelEnabled: controls.bevelEnabled,
                curveSegments: controls.curveSegments,
                steps: controls.steps
              };
              text1 = createMesh(new THREE.TextGeometry('Learning', options));
              text1.position.z = -100;
              text1.position.y = 100;
              scene.add(text1);
              text2 = createMesh(new THREE.TextGeometry('Three.js', options));
              scene.add(text2);
            }
          };

          const gui = new dat.GUI();
          gui.add(controls, 'size', 0, 200).onChange(controls.asGeom);
          gui.add(controls, 'height', 0, 200).onChange(controls.asGeom);
          gui
            .add(controls, 'font', ['optimer', 'helvetiker'])
            .onChange(controls.asGeom);
          gui.add(controls, 'bevelThickness', 0, 10).onChange(controls.asGeom);
          gui.add(controls, 'bevelSize', 0, 10).onChange(controls.asGeom);
          gui
            .add(controls, 'bevelSegments', 0, 30)
            .step(1)
            .onChange(controls.asGeom);
          gui.add(controls, 'bevelEnabled').onChange(controls.asGeom);
          gui
            .add(controls, 'curveSegments', 1, 30)
            .step(1)
            .onChange(controls.asGeom);
          gui
            .add(controls, 'steps', 1, 5)
            .step(1)
            .onChange(controls.asGeom);

          controls.asGeom();

          /* render */
          const renderScene = () => {
            stats.update();

            requestAnimationFrame(renderScene);
            renderer.render(scene, camera);
          };
          renderScene();
        }
      );
    }
  );
};

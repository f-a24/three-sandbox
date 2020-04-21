import * as THREE from 'three';

const material1aVert = require('./material1a.vert');
const material1aFrag = require('./material1a.frag');
const material1bVert = require('./material1b.vert');
const material1bFrag = require('./material1b.frag');
const elementVert = require('./element.vert');
const elementFrag = require('./element.frag');

const Lensflare = function () {
  THREE.Mesh.call(
    this,
    Lensflare.Geometry,
    new THREE.MeshBasicMaterial({ opacity: 0, transparent: true })
  );

  this.type = 'Lensflare';
  this.frustumCulled = false;
  this.renderOrder = Infinity;

  //

  const positionScreen = new THREE.Vector3();
  const positionView = new THREE.Vector3();

  // textures

  const tempMap = new THREE.DataTexture(
    new Uint8Array(16 * 16 * 3),
    16,
    16,
    THREE.RGBFormat
  );
  tempMap.minFilter = THREE.NearestFilter;
  tempMap.magFilter = THREE.NearestFilter;
  tempMap.wrapS = THREE.ClampToEdgeWrapping;
  tempMap.wrapT = THREE.ClampToEdgeWrapping;
  tempMap.needsUpdate = true;

  const occlusionMap = new THREE.DataTexture(
    new Uint8Array(16 * 16 * 3),
    16,
    16,
    THREE.RGBFormat
  );
  occlusionMap.minFilter = THREE.NearestFilter;
  occlusionMap.magFilter = THREE.NearestFilter;
  occlusionMap.wrapS = THREE.ClampToEdgeWrapping;
  occlusionMap.wrapT = THREE.ClampToEdgeWrapping;
  occlusionMap.needsUpdate = true;

  // material

  const geometry = Lensflare.Geometry;

  const material1a = new THREE.RawShaderMaterial({
    uniforms: {
      scale: { value: null },
      screenPosition: { value: null },
    },
    vertexShader: material1aVert.default,
    fragmentShader: material1aFrag.default,
    depthTest: true,
    depthWrite: false,
    transparent: false,
  });

  const material1b = new THREE.RawShaderMaterial({
    uniforms: {
      map: { value: tempMap },
      scale: { value: null },
      screenPosition: { value: null },
    },
    vertexShader: material1bVert.default,
    fragmentShader: material1bFrag.default,
    depthTest: false,
    depthWrite: false,
    transparent: false,
  });

  // the following object is used for occlusionMap generation

  const mesh1 = new THREE.Mesh(geometry, material1a);

  //

  const elements = [];

  const shader = LensflareElement.Shader;

  const material2 = new THREE.RawShaderMaterial({
    uniforms: {
      map: { value: null },
      occlusionMap: { value: occlusionMap },
      color: { value: new THREE.Color(0xffffff) },
      scale: { value: new THREE.Vector2() },
      screenPosition: { value: new THREE.Vector3() },
    },
    vertexShader: shader.vertexShader,
    fragmentShader: shader.fragmentShader,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false,
  });

  const mesh2 = new THREE.Mesh(geometry, material2);

  this.addElement = function (element) {
    elements.push(element);
  };

  //

  const scale = new THREE.Vector2();
  const screenPositionPixels = new THREE.Vector2();
  const validArea = new THREE.Box2();
  const viewport = new THREE.Vector4();

  this.onBeforeRender = function (renderer, scene, camera) {
    renderer.getCurrentViewport(viewport);

    const invAspect = viewport.w / viewport.z;
    const halfViewportWidth = viewport.z / 2.0;
    const halfViewportHeight = viewport.w / 2.0;

    const size = 16 / viewport.w;
    scale.set(size * invAspect, size);

    validArea.min.set(viewport.x, viewport.y);
    validArea.max.set(
      viewport.x + (viewport.z - 16),
      viewport.y + (viewport.w - 16)
    );

    // calculate position in screen space

    positionView.setFromMatrixPosition(this.matrixWorld);
    positionView.applyMatrix4(camera.matrixWorldInverse);

    if (positionView.z > 0) return; // lensflare is behind the camera

    positionScreen.copy(positionView).applyMatrix4(camera.projectionMatrix);

    // horizontal and vertical coordinate of the lower left corner of the pixels to copy

    screenPositionPixels.x =
      viewport.x + positionScreen.x * halfViewportWidth + halfViewportWidth - 8;
    screenPositionPixels.y =
      viewport.y +
      positionScreen.y * halfViewportHeight +
      halfViewportHeight -
      8;

    // screen cull

    if (validArea.containsPoint(screenPositionPixels)) {
      // save current RGB to temp texture

      renderer.copyFramebufferToTexture(screenPositionPixels, tempMap);

      // render pink quad

      const { uniforms } = material1a;
      uniforms.scale.value = scale;
      uniforms.screenPosition.value = positionScreen;

      renderer.renderBufferDirect(
        camera,
        null,
        geometry,
        material1a,
        mesh1,
        null
      );

      // copy result to occlusionMap

      renderer.copyFramebufferToTexture(screenPositionPixels, occlusionMap);

      // restore graphics

      // const uniforms = material1b.uniforms;
      // uniforms['scale'].value = scale;
      // uniforms['screenPosition'].value = positionScreen;

      renderer.renderBufferDirect(
        camera,
        null,
        geometry,
        material1b,
        mesh1,
        null
      );

      // render elements

      const vecX = -positionScreen.x * 2;
      const vecY = -positionScreen.y * 2;

      for (let i = 0, l = elements.length; i < l; i++) {
        const element = elements[i];

        const { uniforms } = material2;

        uniforms.color.value.copy(element.color);
        uniforms.map.value = element.texture;
        uniforms.screenPosition.value.x =
          positionScreen.x + vecX * element.distance;
        uniforms.screenPosition.value.y =
          positionScreen.y + vecY * element.distance;

        const size = element.size / viewport.w;
        const invAspect = viewport.w / viewport.z;

        uniforms.scale.value.set(size * invAspect, size);

        // material2.uniformsNeedUpdate = true;

        renderer.renderBufferDirect(
          camera,
          null,
          geometry,
          material2,
          mesh2,
          null
        );
      }
    }
  };

  this.dispose = function () {
    material1a.dispose();
    material1b.dispose();
    material2.dispose();

    tempMap.dispose();
    occlusionMap.dispose();

    for (let i = 0, l = elements.length; i < l; i++) {
      elements[i].texture.dispose();
    }
  };
};

Lensflare.prototype = Object.create(THREE.Mesh.prototype);
Lensflare.prototype.constructor = Lensflare;
Lensflare.prototype.isLensflare = true;

//

const LensflareElement = function (
  texture: THREE.Texture,
  size?: number,
  distance?: number,
  color?: THREE.Color
) {
  this.texture = texture;
  this.size = size || 1;
  this.distance = distance || 0;
  this.color = color || new THREE.Color(0xffffff);
};

LensflareElement.Shader = {
  uniforms: {
    map: { value: null },
    occlusionMap: { value: null },
    color: { value: null },
    scale: { value: null },
    screenPosition: { value: null },
  },
  vertexShader: elementVert.default,
  fragmentShader: elementFrag.default,
};

Lensflare.Geometry = (function () {
  const geometry = new THREE.BufferGeometry();

  const float32Array = new Float32Array([
    -1,
    -1,
    0,
    0,
    0,
    1,
    -1,
    0,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    -1,
    1,
    0,
    0,
    1,
  ]);

  const interleavedBuffer = new THREE.InterleavedBuffer(float32Array, 5);

  geometry.setIndex([0, 1, 2, 0, 2, 3]);
  geometry.addAttribute(
    'position',
    new THREE.InterleavedBufferAttribute(interleavedBuffer, 3, 0, false)
  );
  geometry.addAttribute(
    'uv',
    new THREE.InterleavedBufferAttribute(interleavedBuffer, 2, 3, false)
  );

  return geometry;
})();

export { Lensflare, LensflareElement };

# 初めての Three.js【メモ】

TypeScript x Webpack での挑戦

## 7 章　パーティクル、スプライト、ポイントクラウド

### ハマったところ

- 4 で THREE.CanvasRenderer や THREE.SpriteCanvasMaterial がない
  - THREE.SpriteMaterial に{map: THREE.CanvasTexture}で試したらいけた！
    - 05b-program-based-sprites-webgl.html にありました…

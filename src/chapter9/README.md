# 初めての Three.js【メモ】

TypeScript x Webpack での挑戦

## 9 章　アニメーションとカメラの移動

### ハマったところ

- THREE.Projector has been moved to /examples/js/renderers/Projector.js
  - Projector.js 無くても問題なさ気？
- PLYLoader のコールバック関数の引数は THREE.BufferGeometry なので vertices の変換が必要

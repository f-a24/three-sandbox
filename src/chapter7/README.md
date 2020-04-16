# 初めての Three.js【メモ】

TypeScript x Webpack での挑戦

## 7 章　パーティクル、スプライト、ポイントクラウド

 - THREE.Sprite
  - 2次元の正方形
  - THREE.Meshと同じようなディスク
  - 大量だとパフォーマンス上の問題が発生しやすい
 - THREE.Points
  - THREE.Geometryに追加して使用

どちらもcanvasや画像をテクスチャとして貼り付け可能

### ハマったところ

- 4 で THREE.CanvasRenderer や THREE.SpriteCanvasMaterial がない
  - THREE.SpriteMaterial に{map: THREE.CanvasTexture}で試したらいけた！
    - 05b-program-based-sprites-webgl.html にありました…

# 初めての Three.js【メモ】

TypeScript x Webpack での挑戦

## 6 章　高度なジオメトリとブーリアン演算

### ハマったところ

- THREE.ParametricGeometry の第一引数は func(u: number, v: number, dest: THREE.Vector3)で結果 dest に set する関数
  - klein は examples/js/ParametricGeometries にある
- THREE.MeshPhongMaterial 効いてない？

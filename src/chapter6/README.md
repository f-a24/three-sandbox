# 初めての Three.js【メモ】

TypeScript x Webpack での挑戦

## 6 章　高度なジオメトリとブーリアン演算

| ジオメトリ         | 説明 |
| :----------------- | :--- |
| ConvexGeometry     | 一群の座標を含む凸包  |
| LatheGeometry      | 滑らかな曲線ををもとにした3次元形状     |
| ExtrudeGeometry    | 2次元形状から3次元のオブジェクトを作成     |
| TubeGeometry       | 3次元のスプライン曲線に沿って押し出されたチューブ     |
| ParametricGeometry | 方程式に基づいてジオメトリを作成     |
| TextGeometry       | 3Dテキスト     |

- ThreeBSP.jsを使うとブーリアン操作が簡単に可能
- ThreeBSP.jsの3つの機能
  - intersect -> 2つのジオメトリが交差した部分をもとに新しいジオメトリを作成
  - union     -> 2つのジオメトリを統合してひとつのジオメトリを作成
  - subtract  -> unionの逆で最初のジオメトリから重なった部分を取り除いて新しいジオメトリを作成

### ハマったところ

- THREE.ParametricGeometry の第一引数は func(u: number, v: number, dest: THREE.Vector3)で結果 dest に set する関数
  - klein は examples/js/ParametricGeometries にある
- THREE.MeshPhongMaterial 効いてない？
- r113でObject3D.applyMatrix()がObject3D.applyMatrix4()になった
- d3-threeD.jsがTypeScriptやESModule対応していなかったので書き換え(utils/d3-threeD)
- ThreeBSP.jsがTypeScriptやESModule対応していなかったのでimports-loaderで対応
  - 後でTypeScriptに書き換えてみる
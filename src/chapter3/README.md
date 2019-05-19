# 初めての Three.js【メモ】

TypeScript x Webpack での挑戦

## 3 章　光源

- WebGL 自体にはライトのサポートは組み込まれてなく、Three.js を使わないはシェーダープログラムを自分で書かなければならない

- Three.js で利用できるライト

| ライト                | 説明                                                                                                                     |
| :-------------------- | :----------------------------------------------------------------------------------------------------------------------- |
| THREE.AmbientLight    | このライトの色がシーン内のオブジェクトの色に追加される                                                                   |
| THREE.PointLight      | 光がすべての方向に発散する空間内の一点（影を落とすことは出来ない）                                                       |
| THREE.SpotLight       | 円錐状の影響範囲を持つ（影を落とすことができる）                                                                         |
| THREE.DirectionLight  | 無限遠光源とも呼ばれ、光線はそれぞれ平行であるように見える（影を落とすことができる）                                     |
| THREE.HemisphereLight | 表面の反射と遠くに向かうに連れ徐々に輝きを失う空のように、より自然な見た目の屋外での光を実現（影を落とすことは出来ない） |
| THREE.LensFlare       | 光源ではないがシーン内のライトにレンズフレア効果を追加                                                                   |

- 基本的なライト（AmbientLight、PointLight、SpotLight、DirectionLight）は THREE.Light を継承し共通の機能を持つ

| ライト    | プロパティ | 説明                                       |
| :-------- | :--------- | :----------------------------------------- |
| SpotLight | angle      | 光線の幅                                   |
|           | castShadow | true で影を落とす                          |
|           | color      | ライトの色                                 |
|           | decay      | ライトからの距離に応じて光が減衰する量     |
|           | distance   | ライトの光が届く距離                       |
|           | intensity  | 単位面積当たりの光の輝きの強さ             |
|           | position   | シーン内でのライトの位置                   |
| SpotLight | penumbra   | 光の強さがどのくらい急速に減衰するか決定   |
|           | power      | 光源の発する光の強さ（intensity から計算） |
| SpotLight | target     | ライトの向き                               |
|           | visible    | true で点灯、false で消灯                  |

| 影のプロパティ                 | 説明                                                                               |
| :----------------------------- | :--------------------------------------------------------------------------------- |
| shadow.bias                    | 指定した距離だけ影の位置を影が落ちるオブジェクトの奥または手前に移動               |
| shadow.aspect                  | 影を表示する領域の縦横比を指定                                                     |
| shadow.far                     | どの程度の距離まで影が作成されるか決定                                             |
| shadow.fov                     | どの程度大きな視野を使用するか指定                                                 |
| shadow.near                    | ライトからどの程度の距離だけ離れた点から影を生成するべきか指定                     |
| shadow.mapSize.(width・height) | 影を生成するために何ピクセル使用するか指定（滑らかにみえないときはこの値を増やす） |

- THREE.LensFlare のコンストラクタ引数

| 引数     | 説明                         |
| :------- | :--------------------------- |
| texture  | フレアの形を決定する画像     |
| size     | フレアの大きさをピクセル指定 |
| distance | 光源からカメラまでの距離     |
| blending | フレアのための画像を複数指定 |
| color    | フレアの色                   |

- THREE.LensFlare.add()でアーチファクト追加

### ハマったところ

- THREE.Object3D や THREE.Mesh の position プロパティに THREE.Vector3 代入するとエラー

```js
// Typeエラー？
target.position = new THREE.Vector3(5, 0, 0);
// こっちだと上手くいく
target.position.set(5, 0, 0);
```

- THREE.DirectionalLight にないプロパティ

  - distance
  - angle
  - shadow.camera.fov

- THREE にないプロパティ（examples にあるもの）

  - WebGLDeferredRenderer（examples）
    - import-loader & 型拡張で対応
  - FilmicOperator（？）
    - 見当たらないので除外
  - AreaLight（ → RectAreaLight？）
  - LensFlare（/examples/js/objects/Lensflare.js に移動）

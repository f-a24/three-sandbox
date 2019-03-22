# 初めての Three.js【メモ】

TypeScript x Webpack での挑戦

## 1 章　初めての 3D シーン作成

基本

| オブジェクト | 説明                                                 |
| :----------- | :--------------------------------------------------- |
| scene        | 表示したい物体と光源を保持して変更を監視するコンテナ |
| camera       | シーンを描画する時に何が見えるか決定                 |
| renderer     | camera の角度に基づき scene がどのように見えるか決定 |
| geometry     | 平面や立体などの物体（plane、sphere、cube）          |
| material     | 物体の見た目                                         |
| light        | 光源                                                 |

基本的なマテリアル(THREE.MeshBasicMaterial)は光源に一切反応しない

以下のマテリアルが Three.js で光源を計算に含めるもの

- MeshLambertMaterial
- MeshPhongMaterial
- MeshStandardMaterial

影の描画は大きな計算コストがかかるのでデフォルトは無効化

有効化

```js
renderer.shadowMap.enabled = true;
// 物体ごとの設定も必要
plane.receiveShadow = true;
cube.castShadow = true;
// 光源にも必要（すべての光源が影を落とせるわけではない）
spotLight.castShadow = true;
```

アニメーションはブラウザが出来る限り滑らかかつ効率的に  
描画することを保証する`requestAnimationFrame`を使用

- stats.js 　 → 　 1 秒ごとのフレーム数を示してくれるライブラリ
- dat.GUI 　 → 　単純な UI コンポーネントを簡単に作成するライブラリ

## 2 章　シーンの基本要素

シーンに必要な３コンポーネント

- カメラ
- ライト
- オブジェクト

THREE.Scene

- オブジェクトの配列ではなくノードを木構造で保持
- THREE.Scene 自身も THREE.Object3D を継承
- THREE.Object3D は children プロパティに子要素を保持することができる
- THREE.Object3D を継承しているオブジェクトもすべて子要素を持つことができる

| シーンに関係するよく利用される関数 | 説明                                             |
| :--------------------------------- | :----------------------------------------------- |
| THREE.Scene.add                    | オブジェクトをシーンに追加                       |
| THREE.Scene.remove                 | オブジェクトをシーンから削除                     |
| THREE.Scene.children               | シーン内のすべての子要素リストを取得             |
| THREE.Scene.getObjectByName        | 名前を使用しシーンから特定のオブジェクトを取得   |
| THREE.Scene.traverse()             | 子要素の全てに何か処理を加えたいとき使用         |
| THREE.Scene.fog                    | シーン全体にフォグ効果(霧)を追加                 |
| overrideMaterial                   | シーン内の全てのオブジェクトが同じマテリアル使用 |

- オブジェクトの形状（geometry）と見た目（material）を定義して、メッシュ（mesh）でまとめることで、シーンに追加できる
- ジオメトリは基本的に頂点群（3D 空間での座標の集合）とそれらの点をつないでまとめた数多くの面

  - 立方体の場合
    - 角が 8 つあり、それぞれ x、y、z 座標で定義
    - 頂点群（vertics）、頂点（vertex）と呼ばれる
    - Three.js では面（face）は常に 3 つの頂点からなる三角形になる
    - 立方体の各面(四角形)は 2 つの三角形で構成

- Three.js が提供するジオメトリを使うか、vertices プロパティと faces プロパティを使用して手作業でジオメトリを構築する
- ```js
  new THREE.Face3(0, 2, 1); // vertices配列内の0、2、1番目の点を使用して作られる三角形の面
  ```
- 三角形の面を作る`THREE.Face3`は定義される際の順序によって Three.js が正面か裏面か判断するので使用する頂点の順序には注意
- vertices プロパティと faces プロパティを代入し、THREE.Geometry インスタンスを作成したら最後に computeFaceNormals()を呼び出し、各面に対する法線ベクトルを計算する必要がある
- ワイヤーフレームはマテリアルを重ねる以外にも THREE.WireframeHelper(mesh, 0x000000)を scene に追加でも表示可能
  - @types に定義されてない(+ example にある？)ので今回は未使用
- メッシュの基本的なプロパティ

| 関数・プロパティ | 説明                                                                                                                                                                    |
| :--------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| position         | 親要素からの相対位置を指定（多くの場合は THREE.Scene か THREE.Group が親要素）                                                                                          |
| rotaition        | 任意の軸回りの回転をラジアン値で設定（Three.js は特定の軸回りに回転する関数 rotateX()、rotateY()、rotateZ()も提供）                                                     |
| scale            | x、ｙ、z 軸を基準に拡大縮小                                                                                                                                             |
| translateX       | x 軸上の指定した量だけ現在の位置から相対移動                                                                                                                            |
| translateY       | y 軸上の指定した量だけ現在の位置から相対移動                                                                                                                            |
| translateZ       | z 軸上の指定した量だけ現在の位置から相対移動（translate 系の関数は`translateOnAxis(axis, distance)`を使用して指定した軸上でメッシュを distance だけ移動することも可能） |
| visible          | false の場合、描画しない                                                                                                                                                |

- Three.js には平行投影(Orthographic)カメラと透視投影(Perspective)カメラがある

  - 透視投影は自然な見た目で遠方にある物体ほど小さく描画

    | 引数   | 説明                                                            |
    | :----- | :-------------------------------------------------------------- |
    | fov    | Field Of View(視野)の略でカメラの位置から見える範囲を角度で指定 |
    | aspect | 描画される出力領域の縦横比                                      |
    | near   | カメラのどのくらい近くから描画されるかを指定                    |
    | far    | カメラからどのぐらい遠くまで見えるか指定                        |
    | zoom   | ズームイン・ズームアウトに使用                                  |

  - 平行投影は全ての物体が同じサイズで描画（例：シムシティ４）

    | 引数   | 説明                                             |
    | :----- | :----------------------------------------------- |
    | left   | 描画される領域の左境界                           |
    | right  | 描画される領域の右境界                           |
    | top    | 描画される上限                                   |
    | bottom | 描画される下限                                   |
    | near   | カメラの位置を基準にこの点より向こうが描画される |
    | far    | カメラの位置を基準にこの点までが描画される       |
    | zoom   | ズームイン・ズームアウトに使用                   |

  - ```js
    // カメラの視点変更
    camera.lookAt(new THREE.Vector(x, y, z));
    // カメラの視線をシーン内の特定のメッシュに向ける
    camera.lookAt(mesh.postion);
    ```

### ハマったところ

- example にあって import が面倒

  - THREE.ConvexGeometry
  - THREE.SceneUtils.createMultiMaterialObject

    - import-loader & 型拡張で対応

- 効いてないっぽい（バグ？設定ミス？）
  - THREE.MeshPhongMaterial
    - **scene.overrideMaterial プロパティが設定されていただけでした…**

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
  - FilmicOperator（？）
  - AreaLight（ → RectAreaLight？）
  - LensFlare（/examples/js/objects/Lensflare.js に移動）

## 4 章　マテリアル

- マテリアルは THREE.Geometry と組み合わせて THREE.Mesh を構成するもの

| マテリアル           | 説明                                                                                                   |
| :------------------- | :----------------------------------------------------------------------------------------------------- |
| MeshBasicMaterial    | 単純な色を設定                                                                                         |
| MeshDepthMaterial    | カメラからの距離を使用して色を決定                                                                     |
| MeshNormalMaterial   | 面の色をその法線ベクトルに従って決定                                                                   |
| MultiMaterial        | それぞれの面に独自の設定                                                                               |
| MeshLambertMaterial  | 光を鈍く反射する光沢のあまりないオブジェクトの作成に利用                                               |
| MeshPhongMaterial    | 光沢のあるオブジェクトの作成に利用                                                                     |
| MeshStandardMaterial | 簡易的な物理ベースレンダリングを使用                                                                   |
| ShaderMaterial       | 独自のシェーダープログラムを指定し、頂点をどのように配置して各ピクセルにどのように色を付けるか直接制御 |
| LineBasicMaterial    | THREE.Line ジオメトリで利用でき、色の付いた線を作成                                                    |
| LineDashMaterial     | 点線の効果も作成                                                                                       |

- マテリアル共通プロパティ

  - 基本的なプロパティ

  | プロパティ     | 説明                                                                                                                                                         |
  | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | id             | マテリアルの特定や作成時の代入に使用。0 から始まり 1 ずつ増加する                                                                                            |
  | uuid           | 内部的に使用される一意になる ID                                                                                                                              |
  | name           | 名前を設定                                                                                                                                                   |
  | opacity        | transparent と合わせて使用し、透明度を定義する。範囲は 0 ～ 1                                                                                                |
  | transparent    | true に設定すると透明度が有効になる                                                                                                                          |
  | overdraw       | ポリゴンが少しだけ大きく描画される。※THREE.CanvasRenderer 削除されたので使用しない？                                                                         |
  | vidible        | 可視か不可視か設定。false だと描画されない                                                                                                                   |
  | side           | ジオメトリの裏表どちら側にマテリアルを適用するか指定。デフォルトは THREE.FrontSide(正面：外側)。THREE.BackSide(裏側：内側)、THREE.DoubleSide(両側)も指定可能 |
  | clippingPlanes | THREE.Plane 配列の設定で平面の法線側で切り取られた領域に限られる。デフォルトは空配列                                                                         |
  | clipShadows    | clippingPlanes が影にも影響を与えるかどうか指定。デフォルトは false                                                                                          |
  | needsUpdate    | true で新しく設定されたプロパティでマテリアルのキャッシュを更新                                                                                              |

  - ブレンディングプロパティ

  | プロパティ         | 説明                                                                                                  |
  | :----------------- | :---------------------------------------------------------------------------------------------------- |
  | blending           | マテリアルと背景をどのように混ぜ合わせるか指定。通常は THREE.NormalBlending(一番上のレイヤーだけ描画) |
  | blendSrc           | オブジェクト(元：source)をどのように背景(宛先：desination) に混ぜ合わせるか指定                       |
  | blendDst           | 背景(宛先：desination)をブレンディングにどのように使用するか指定                                      |
  | blendEquation      | blendSrc と blendDst をどのように使用するか指定。デフォルトは足し合わせる(THREE.AddEquation)          |
  | blendSrcAlpha      | blendSrc 値と同様だがアルファ値のみに適用                                                             |
  | blendDstAlpha      | blendDst 値と同様だがアルファ値のみに適用                                                             |
  | blendEquationAlpha | blendEquation 値と同様だがアルファ値のみに適用                                                        |

  - 高度なプロパティ

  | プロパティ          | 説明                                                        |
  | :------------------ | :---------------------------------------------------------- |
  | depthTest           | ピクセルの深度をピクセルの値を決定するために使用            |
  | depthWrite          | マテリアルが WebGL の深度バッファに影響を与えるかどうか設定 |
  | polygonOffset       | POLYGON_OFFSET_FILL を制御                                  |
  | polygonOffsetFactor | 〃                                                          |
  | polygonOffsetUnits  | 〃                                                          |
  | alphaTest           | 透明度に関係するアーチファクトのいくつかを解決              |

- 単純なマテリアル（MeshBasicMaterial, MeshDepthMaterial, MeshNormalMaterial, MultiMaterial）
  - MeshBasicMaterial
  - MeshDepthMaterial
  - MeshNormalMaterial
  - MultiMaterial

### ハマったところ

- r98 で CanvasRenderer が削除されている
  - https://twitter.com/mrdoob/status/1058022036038148096
- THREE.MeshFaceMaterial が削除されている
  - 代わりに material 配列を使用
  - https://threejs.org/docs/#api/en/deprecated/DeprecatedLis

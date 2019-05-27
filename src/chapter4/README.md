# 初めての Three.js【メモ】

TypeScript x Webpack での挑戦

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

- **単純なマテリアル（MeshBasicMaterial, MeshDepthMaterial, MeshNormalMaterial, MultiMaterial）**

  - MeshBasicMaterial

  | プロパティ         | 説明                                                                                                    |
  | :----------------- | :------------------------------------------------------------------------------------------------------ |
  | color              | マテリアルの色を設定                                                                                    |
  | wireframe          | マテリアルをワイヤーフレームとして描画                                                                  |
  | wireframeLinewidth | ワイヤーフレームが有効の場合、ワイヤーフレームのワイヤーの太さを設定                                    |
  | wireframeLinecap   | ワイヤーフレームが有効の場合、線の終端を butt、round、square から設定(WebGLRenderer では未サポート)     |
  | wireframeLinejoin  | ワイヤーフレームが有効の場合、線の結合部分を round、bevel、miter から設定(WebGLRenderer では未サポート) |
  | vertexColors       | それぞれの頂点に適用される色を個別に設定                                                                |
  | fog                | グローバルな fog 設定の影響を受けるかどうか指定                                                         |

  - MeshDepthMaterial

  | プロパティ         | 説明                                                                 |
  | :----------------- | :------------------------------------------------------------------- |
  | wireframe          | マテリアルをワイヤーフレームとして描画                               |
  | wireframeLinewidth | ワイヤーフレームが有効の場合、ワイヤーフレームのワイヤーの太さを設定 |

  - MeshNormalMaterial

  | プロパティ         | 説明                                                                 |
  | :----------------- | :------------------------------------------------------------------- |
  | wireframe          | マテリアルをワイヤーフレームとして描画                               |
  | wireframeLinewidth | ワイヤーフレームが有効の場合、ワイヤーフレームのワイヤーの太さを設定 |

  - MultiMaterial

- **高度なマテリアル（MeshLambertMaterial, MeshPhongMaterial, MeshStandardMaterial, ShaderMaterial）**

  - MeshLambertMaterial

  | プロパティ | 説明                 |
  | :--------- | :------------------- |
  | emissive   | マテリアルが発する色 |

  - MeshPhongMaterial

  | プロパティ | 説明                                                     |
  | :--------- | :------------------------------------------------------- |
  | emissive   | マテリアルが発する色                                     |
  | specular   | マテリアルにどのくらい光沢があるかと、その光沢の色を指定 |
  | shininess  | 反射するハイライトがどのくらい明るいか指定               |
  | shading    | シェーディングがどのように適用されるか定義               |

  - MeshStandardMaterial

  | プロパティ   | 説明                                             |
  | :----------- | :----------------------------------------------- |
  | metalness    | 金属性、光をどの程度どのような色で反射するか決定 |
  | metalnessMap | metalness をより細かく指定するテクスチャ         |
  | roughness    | 表面の粗さ、光沢の度合いを指定                   |
  | roughnessMap | roughness をより細かく指定するテクスチャ         |

  - ShaderMaterial

  | プロパティ         | 説明                                                                 |
  | :----------------- | :------------------------------------------------------------------- |
  | wireframe          | マテリアルをワイヤーフレームとして描画                               |
  | wireframeLinewidth | ワイヤーフレームが有効の場合、ワイヤーフレームのワイヤーの太さを設定 |
  | linewidth          | 描画される線の太さを指定                                             |
  | shading            | シェーディングがどのように適用されるか定義                           |
  | vertexColors       | それぞれの頂点に適用される色を個別に設定                             |
  | fog                | グローバルな fog 設定の影響を受けるかどうか指定                      |

  | 特殊なプロパティ | 説明                                                                                           |
  | :--------------- | :--------------------------------------------------------------------------------------------- |
  | fragmentShader   | 受け取ったピクセルの色を指定、フラグメントシェーダープログラムを文字列で渡す                   |
  | vertexShader     | 頂点の位置を変更、頂点シェーダープログラムを文字列で渡す                                       |
  | uniforms         | シェーダーに情報を送ることができ、頂点シェーダーとフラグメントシェーダーの両方に同じ情報を送信 |
  | defines          | #defines に変換され、シェーダープログラムにグローバル変数を追加                                |
  | attributes       | 頂点シェーダーとフラグメントシェーダーの呼び出しごとに異なる値を設定                           |
  | lights           | ライトのデータをシェーダーに渡すかどうか指定                                                   |

* **ラインジオメトリで利用できるマテリアル（LineBasicMaterial, LineDashedMaterial）**

  - LineBasicMaterial

  | プロパティ   | 説明                                                                      |
  | :----------- | :------------------------------------------------------------------------ |
  | color        | 線の色を指定（vertexColors を指定すると無視）                             |
  | linewidth    | 線の幅を指定                                                              |
  | linecap      | 線の終端を butt、round、square から設定(WebGLRenderer では未サポート)     |
  | linejoin     | 線の結合部分を round、bevel、miter から設定(WebGLRenderer では未サポート) |
  | vertexColors | それぞれの頂点に適用される色を個別に設定                                  |
  | fog          | グローバルな fog 設定の影響を受けるかどうか指定                           |

  - LineDashedMaterial

  | プロパティ | 説明                           |
  | :--------- | :----------------------------- |
  | scale      | dashSize と gapSize を拡大縮小 |
  | dashSize   | 点の長さ                       |
  | gapSize    | 点間の長さ                     |

### ハマったところ

- r98 で CanvasRenderer が削除されている
  - https://twitter.com/mrdoob/status/1058022036038148096
- THREE.MeshFaceMaterial が削除されている
  - 代わりに material 配列を使用
  - https://threejs.org/docs/#api/en/deprecated/DeprecatedLis
- computeLineDistances()は lines(THREE.Geometry)ではなく line(THREE.Line)
- THREE.LineDashedMaterial のオプション vertexColors は boolean ではなく THREE.VertexColors(THREE.Colors)

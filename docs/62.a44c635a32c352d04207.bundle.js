(window.webpackJsonp=window.webpackJsonp||[]).push([[62],{352:function(module,exports){module.exports="# 初めての Three.js【メモ】\r\n\r\nTypeScript x Webpack での挑戦\r\n\r\n## 2 章　シーンの基本要素\r\n\r\nシーンに必要な３コンポーネント\r\n\r\n- カメラ\r\n- ライト\r\n- オブジェクト\r\n\r\nTHREE.Scene\r\n\r\n- オブジェクトの配列ではなくノードを木構造で保持\r\n- THREE.Scene 自身も THREE.Object3D を継承\r\n- THREE.Object3D は children プロパティに子要素を保持することができる\r\n- THREE.Object3D を継承しているオブジェクトもすべて子要素を持つことができる\r\n\r\n| シーンに関係するよく利用される関数 | 説明                                             |\r\n| :--------------------------------- | :----------------------------------------------- |\r\n| THREE.Scene.add                    | オブジェクトをシーンに追加                       |\r\n| THREE.Scene.remove                 | オブジェクトをシーンから削除                     |\r\n| THREE.Scene.children               | シーン内のすべての子要素リストを取得             |\r\n| THREE.Scene.getObjectByName        | 名前を使用しシーンから特定のオブジェクトを取得   |\r\n| THREE.Scene.traverse()             | 子要素の全てに何か処理を加えたいとき使用         |\r\n| THREE.Scene.fog                    | シーン全体にフォグ効果(霧)を追加                 |\r\n| overrideMaterial                   | シーン内の全てのオブジェクトが同じマテリアル使用 |\r\n\r\n- オブジェクトの形状（geometry）と見た目（material）を定義して、メッシュ（mesh）でまとめることで、シーンに追加できる\r\n- ジオメトリは基本的に頂点群（3D 空間での座標の集合）とそれらの点をつないでまとめた数多くの面\r\n\r\n  - 立方体の場合\r\n    - 角が 8 つあり、それぞれ x、y、z 座標で定義\r\n    - 頂点群（vertics）、頂点（vertex）と呼ばれる\r\n    - Three.js では面（face）は常に 3 つの頂点からなる三角形になる\r\n    - 立方体の各面(四角形)は 2 つの三角形で構成\r\n\r\n- Three.js が提供するジオメトリを使うか、vertices プロパティと faces プロパティを使用して手作業でジオメトリを構築する\r\n- ```js\r\n  new THREE.Face3(0, 2, 1); // vertices配列内の0、2、1番目の点を使用して作られる三角形の面\r\n  ```\r\n- 三角形の面を作る`THREE.Face3`は定義される際の順序によって Three.js が正面か裏面か判断するので使用する頂点の順序には注意\r\n- vertices プロパティと faces プロパティを代入し、THREE.Geometry インスタンスを作成したら最後に computeFaceNormals()を呼び出し、各面に対する法線ベクトルを計算する必要がある\r\n- ワイヤーフレームはマテリアルを重ねる以外にも THREE.WireframeHelper(mesh, 0x000000)を scene に追加でも表示可能\r\n  - @types に定義されてない(+ example にある？)ので今回は未使用\r\n- メッシュの基本的なプロパティ\r\n\r\n| 関数・プロパティ | 説明                                                                                                                                                                    |\r\n| :--------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |\r\n| position         | 親要素からの相対位置を指定（多くの場合は THREE.Scene か THREE.Group が親要素）                                                                                          |\r\n| rotaition        | 任意の軸回りの回転をラジアン値で設定（Three.js は特定の軸回りに回転する関数 rotateX()、rotateY()、rotateZ()も提供）                                                     |\r\n| scale            | x、ｙ、z 軸を基準に拡大縮小                                                                                                                                             |\r\n| translateX       | x 軸上の指定した量だけ現在の位置から相対移動                                                                                                                            |\r\n| translateY       | y 軸上の指定した量だけ現在の位置から相対移動                                                                                                                            |\r\n| translateZ       | z 軸上の指定した量だけ現在の位置から相対移動（translate 系の関数は`translateOnAxis(axis, distance)`を使用して指定した軸上でメッシュを distance だけ移動することも可能） |\r\n| visible          | false の場合、描画しない                                                                                                                                                |\r\n\r\n- Three.js には平行投影(Orthographic)カメラと透視投影(Perspective)カメラがある\r\n\r\n  - 透視投影は自然な見た目で遠方にある物体ほど小さく描画\r\n\r\n    | 引数   | 説明                                                            |\r\n    | :----- | :-------------------------------------------------------------- |\r\n    | fov    | Field Of View(視野)の略でカメラの位置から見える範囲を角度で指定 |\r\n    | aspect | 描画される出力領域の縦横比                                      |\r\n    | near   | カメラのどのくらい近くから描画されるかを指定                    |\r\n    | far    | カメラからどのぐらい遠くまで見えるか指定                        |\r\n    | zoom   | ズームイン・ズームアウトに使用                                  |\r\n\r\n  - 平行投影は全ての物体が同じサイズで描画（例：シムシティ４）\r\n\r\n    | 引数   | 説明                                             |\r\n    | :----- | :----------------------------------------------- |\r\n    | left   | 描画される領域の左境界                           |\r\n    | right  | 描画される領域の右境界                           |\r\n    | top    | 描画される上限                                   |\r\n    | bottom | 描画される下限                                   |\r\n    | near   | カメラの位置を基準にこの点より向こうが描画される |\r\n    | far    | カメラの位置を基準にこの点までが描画される       |\r\n    | zoom   | ズームイン・ズームアウトに使用                   |\r\n\r\n  - ```js\r\n    // カメラの視点変更\r\n    camera.lookAt(new THREE.Vector(x, y, z));\r\n    // カメラの視線をシーン内の特定のメッシュに向ける\r\n    camera.lookAt(mesh.postion);\r\n    ```\r\n\r\n### ハマったところ\r\n\r\n- example にあって import が面倒\r\n\r\n  - THREE.ConvexGeometry\r\n  - THREE.SceneUtils.createMultiMaterialObject\r\n\r\n    - import-loader & 型拡張で対応\r\n\r\n- 効いてないっぽい（バグ？設定ミス？）\r\n  - THREE.MeshPhongMaterial\r\n    - **scene.overrideMaterial プロパティが設定されていただけでした…**\r\n"}}]);
//# sourceMappingURL=62.a44c635a32c352d04207.bundle.js.map
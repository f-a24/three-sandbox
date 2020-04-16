# 初めての Three.js【メモ】

TypeScript x Webpack での挑戦

## 9 章　アニメーションとカメラの移動

### 基本のアニメーション

- アニメーションにはrequestAnimationFrameを使用
- オブジェクトがクリックされたかどうかの判定はTHREE.Raycasterを使用
- Tween.jsを使うeasingなどが簡単に使用できる

### カメラの移動

|主なカメラコントロール|説明|
|:--|:--|
|FirstPersonControls|一人称視点のシューティングゲームのような動作|
|FlyControls|フライトシミュレーターのような動作|
|TrackballControls|最もよく利用されていてシーン内を簡単に移動、パン、ズームできる|
|OrbitControls|特定のシーンを回る軌道上の衛星をシミュレート|

|その他のカメラコントロール|説明|
|:--|:--|
|DeviceOrientationControls|デバイスの向きや傾きに基づいてカメラの動きを制御|
|DragControls|オブジェクトをドラッグ移動できるコントロールを表示|
|PointerLockControls|マウスカーソルの動きをシーンが描画されているDOM要素上に制限する簡単なコントロール|
|TransformControls|Three.jsエディタによって使用されている内部的なコントロール|

※experimental/CameraControlsをあとでチェック

THREE.Clockは経過時間を正確に計算し、特殊な処理を起動したりレンダリングループを確実に実行するために使用

### モーフィングとスキンメッシュアニメーション

- モーフターゲット
  - 変形したメッシュを定義
  - ターゲットは全ての頂点座標を保持

- スケルタルアニメーション
  - ボーンを定義
  - ボーンを移動すると関連付けられている頂点群も移動

### 外部アニメーションの読み込み

- この辺はThree.jsのバージョンによってサポートしているファイルフォーマット（loader）が変わってくるので省略
- 詳しくは公式ドキュメントを参照

### ハマったところ

- THREE.Projector has been moved to /examples/js/renderers/Projector.js
  - Projector.js 無くても問題なさ気？
- PLYLoader のコールバック関数の引数は THREE.BufferGeometry なので vertices の変換が必要

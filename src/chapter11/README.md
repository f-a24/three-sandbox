# 初めての Three.js【メモ】

TypeScript x Webpack での挑戦

## 11 章　カスタムシェーダーとポストプロセス

### ポストプロセッシングに必要な設定
 1. THREE.EffectComposerを作成
 1. シーン描画後にポストプロセッシングを適用できるようにTHREE.EffectComposerを設定
 1. 描画ループ内でTHREE.EffectComposerを使用してシーン描画、パスが適用された結果を表示

### ポストプロセッシングパス

|Three.jsで利用できる主なパス|説明|
|:--|:--|
|THREE.BloomPass|光が暗い部分に漏れ出るようなエフェクト|
|THREE.DotScreenPass|画面全体を黒いドットの重なりで表現|
|THREE.FilmPass|走査線や歪みを適用してテレビの画面をシミュレート|
|THREE.GlitchPass|ランダムな感覚で電子的なグリッチをスクリーンに表示|
|THREE.MaskPass|現在の画像にマスクを適用できるにする|
|THREE.RenderPass|渡されたシーンとカメラに基づいてシーンを描画|
|THREE.SavePass|現在の描画内容のコピーが作成されて後で利用できる|
|THREE.ShaderPass|独自シェーダーを渡して高度なもしくは独自のポストプロセッシングパスを使えるようにする|
|THREE.TexturePass|現在のコンポーザーの状態をテクスチャに保存して、他のEffectComposerインスタンスの入力として使用できるようにする|

|単純なシェーダー|説明|
|:--|:--|
|THREE.MirrorShader|画面の一部に対してミラーエフェクトを作成|
|THREE.HueSaturationShader|色の色相と彩度を変更|
|THREE.VignetteShader|画像の中心を囲むような暗い境界（ビネットエフェクト）を表示|
|THREE.ColorCorrectionShader|色の分布を変更|
|THREE.RGBShiftShader|色を赤緑青に分解|
|THREE.BrightnessContrastShader|画像の明度とコントラストを変更|
|THREE.ColorifyShader|画面に色の付いたオーバーレイを適用|
|THREE.SepiaShader|画面にセピアのようなエフェクトを適用|
|THREE.KaleidoShader|万華鏡のようなエフェクトを追加|
|THREE.LuminosityShader|明度が見えるようになるエフェクト|
|THREE.TechnicolorShader|古い映画のような見た目になる二色法テクニカラーエフェクトを模擬|

|ブラーシェーダー||
|:--|:--|
|THREE.HorizontalBlurShader|ブラーエフェクトを適用|
|THREE.VerticalBlurShader|〃|
|THREE.HorizontalTiltShiftShader|ティルトシフトエフェクトを再生成|
|THREE.VerticalTiltShiftShader|〃|
|THREE.TriangleBlurShader|三角フィルタを使用したブラーエフェクト|

|高度なエフェクトシェーダー||
|:--|:--|
|THREE.BleachBypassShader|画像に銀残しのようなオーバーレイ（ブリーチバイパスエフェクト）を適用|
|THREE.FreiChenShader※|画像のエッジを検出してその部分をハイライト|
|THREE.FXAAShader|アンチエイリアスエフェクトを適用|
|THREE.FocusShader|中央をシャープに周辺にブラーをかけて描画|

※. 書籍ではEdgeShaderと記載してあるが名前が変更されている  
https://github.com/mrdoob/three.js/pull/11932

### 独自ポストプロセッシングシェーダー

- ポストプロセッシングに必要なのはフラグメントシェーダーのみ
- 頂点シェーダーはThree.jsが提供しているものをそのまま利用可能
- GPUは通常複数のシェーダーパイプラインをサポート
  - ある頂点シェーダーの処理中に他のシェーダーが複数並列に実行されることがある
  - フラグメントシェーダーの実行中も

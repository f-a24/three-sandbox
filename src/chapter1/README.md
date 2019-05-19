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

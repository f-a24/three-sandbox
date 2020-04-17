# 初めての Three.js【メモ】

TypeScript x Webpack での挑戦

## 12 章　物理演算と立体音響

- Physi.jsは物理エンジン（ammo.js）を扱いやすくするラッパー
  - 物理シミュレーションはCPU負荷が高いのでバックグラウンドスレッド（WebWorker）で計算
  - Cannon.jsを利用するブランチもある
- THREE.PositionalAudioで立体音響も可能

※ 物理演算に関しては公式サンプルがammo.jsを使っているのでそちらも後で試してみる

### ハマったところ

- physijs で使用する ammo.js は physijs 同梱の example じゃないとエラー
- 参考リポジトリの physijs_worker.js じゃないとエラー（constraint がないとかで）
  https://github.com/oreilly-japan/learning-three-js-2e-ja-support/blob/master/libs/physijs_worker.js
- THREE.Audio の load ではなく THREE.AudioLoader を使えとのこと
  THREE.Audio: .load has been deprecated. Use THREE.AudioLoader instead.

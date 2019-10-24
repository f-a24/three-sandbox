# 初めての Three.js【メモ】

TypeScript x Webpack での挑戦

## 12 章　物理演算と立体音響

### ハマったところ

- physijs で使用する ammo.js は physijs 同梱の example じゃないとエラー
- 参考リポジトリの physijs_worker.js じゃないとエラー（constraint がないとかで）
  https://github.com/oreilly-japan/learning-three-js-2e-ja-support/blob/master/libs/physijs_worker.js
- THREE.Audio の load ではなく THREE.AudioLoader を使えとのこと
  THREE.Audio: .load has been deprecated. Use THREE.AudioLoader instead.

# 初めての Three.js【メモ】

TypeScript x Webpack での挑戦

## 付録 B THREE.MMDLoader による 3D モデルの制御

### ハマったところ

- THREE.MMDLoader 内で MMDParser（mmdparser.min.js）を使っているが imports-loader でうまく読み込まれず…
  - window.MMDParser = require('mmdparser.min.js')でごまかした
- THREE.MMDLoader.setDefaultTexturePath()がない
- THREE.MMDHelper がない
  - THREE.MMDAnimationHelper になっているっぽい
- THREE.MMDPhysics 内で Ammo（ammo.js）を使っているが imports-loader でうまく読み込まれず…
  - window.Ammo = require('ammo.js')でもうまくいかず…
    - can't resolve 'fs'みたいなエラーが出るため、webpack.config.js に node: { fs: 'empty' }を設定
    - window.Ammo = require('ammo.js')()で成功
- THREE.AudioBufferが削除（確か消したの俺）
  - 標準のAudioBuffer使って
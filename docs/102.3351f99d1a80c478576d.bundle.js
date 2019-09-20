(window.webpackJsonp=window.webpackJsonp||[]).push([[102],{682:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_exports__.default="# 初めての Three.js【メモ】\r\n\r\nTypeScript x Webpack での挑戦\r\n\r\n## 付録 B THREE.MMDLoader による 3D モデルの制御\r\n\r\n### ハマったところ\r\n\r\n- THREE.MMDLoader 内で MMDParser（mmdparser.min.js）を使っているが imports-loader でうまく読み込まれず…\r\n  - window.MMDParser = require('mmdparser.min.js')でごまかした\r\n- THREE.MMDLoader.setDefaultTexturePath()がない\r\n- THREE.MMDHelper がない\r\n  - THREE.MMDAnimationHelper になっているっぽい\r\n- THREE.MMDPhysics 内で Ammo（ammo.js）を使っているが imports-loader でうまく読み込まれず…\r\n  - window.Ammo = require('ammo.js')でもうまくいかず…\r\n    - can't resolve 'fs'みたいなエラーが出るため、webpack.config.js に node: { fs: 'empty' }を設定\r\n    - window.Ammo = require('ammo.js')()で成功\r\n"}}]);
//# sourceMappingURL=102.3351f99d1a80c478576d.bundle.js.map
(window.webpackJsonp=window.webpackJsonp||[]).push([[158],{694:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_exports__.default="#define GLSLIFY 1\nuniform float rPower;\nuniform float gPower;\nuniform float bPower;\n\nuniform sampler2D tDiffuse;\n\nvarying vec2 vUv;\n\nvoid main() {\n    vec4 texel = texture2D(tDiffuse, vUv);\n    float gray = texel.r * rPower + texel.g * gPower + texel.b * bPower;\n    gl_FragColor = vec4(vec3(gray), texel.w);\n}\n"}}]);
//# sourceMappingURL=158.65c5b6ed6f5a0a577471.bundle.js.map
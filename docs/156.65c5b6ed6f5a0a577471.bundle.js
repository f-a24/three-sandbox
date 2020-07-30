(window.webpackJsonp=window.webpackJsonp||[]).push([[156],{696:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_exports__.default="#define GLSLIFY 1\nuniform int bitSize;\n\nuniform sampler2D tDiffuse;\n\nvarying vec2 vUv;\n\nvoid main() {\n    vec4 texel = texture2D(tDiffuse, vUv);\n    float n = pow(float(bitSize), 2.0);\n    float newR = floor(texel.r * n) / n;\n    float newG = floor(texel.g * n) / n;\n    float newB = floor(texel.b * n) / n;\n    gl_FragColor = vec4( vec3(newR,newG,newB), 1.0);\n}\n"}}]);
//# sourceMappingURL=156.65c5b6ed6f5a0a577471.bundle.js.map
(window.webpackJsonp=window.webpackJsonp||[]).push([[57],{345:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_exports__.default="#define GLSLIFY 1\nuniform float time;\n\nvoid main()\n{\nvec3 posChanged = position;\nposChanged.x = posChanged.x*(abs(sin(time*1.0)));\nposChanged.y = posChanged.y*(abs(cos(time*1.0)));\nposChanged.z = posChanged.z*(abs(sin(time*1.0)));\n//gl_Position = projectionMatrix * modelViewMatrix * vec4(position*(abs(sin(time)/2.0)+0.5),1.0);\ngl_Position = projectionMatrix * modelViewMatrix * vec4(posChanged,1.0);\n}\n"}}]);
//# sourceMappingURL=57.01c40c72991cf6a77925.bundle.js.map
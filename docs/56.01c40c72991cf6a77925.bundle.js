(window.webpackJsonp=window.webpackJsonp||[]).push([[56],{344:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_exports__.default="#define GLSLIFY 1\nuniform float time;\nuniform vec2 resolution;\n\nvoid main( void )\n{\n\nvec2 uPos = ( gl_FragCoord.xy / resolution.xy );//normalize wrt y axis\n//suPos -= vec2((resolution.x/resolution.y)/2.0, 0.0);//shift origin to center\n\nuPos.x -= 1.0;\nuPos.y -= 0.5;\n\nvec3 color = vec3(0.0);\nfloat vertColor = 2.0;\nfor( float i = 0.0; i < 15.0; ++i )\n{\nfloat t = time * (0.9);\n\nuPos.y += sin( uPos.x*i + t+i/2.0 ) * 0.1;\nfloat fTemp = abs(1.0 / uPos.y / 100.0);\nvertColor += fTemp;\ncolor += vec3( fTemp*(10.0-i)/10.0, fTemp*i/10.0, pow(fTemp,1.5)*1.5 );\n}\n\nvec4 color_final = vec4(color, 1.0);\ngl_FragColor = color_final;\n}\n"}}]);
//# sourceMappingURL=56.01c40c72991cf6a77925.bundle.js.map
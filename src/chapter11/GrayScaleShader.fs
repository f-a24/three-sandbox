uniform float rPower;
uniform float gPower;
uniform float bPower;

uniform sampler2D tDiffuse;

varying vec2 vUv;

void main() {
    vec4 texel = texture2D(tDiffuse, vUv);
    float gray = texel.r * rPower + texel.g * gPower + texel.b * bPower;
    gl_FragColor = vec4(vec3(gray), texel.w);
}

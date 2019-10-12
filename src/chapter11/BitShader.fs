uniform int bitSize;

uniform sampler2D tDiffuse;

varying vec2 vUv;

void main() {
    vec4 texel = texture2D(tDiffuse, vUv);
    float n = pow(float(bitSize), 2.0);
    float newR = floor(texel.r * n) / n;
    float newG = floor(texel.g * n) / n;
    float newB = floor(texel.b * n) / n;
    gl_FragColor = vec4( vec3(newR,newG,newB), 1.0);
}

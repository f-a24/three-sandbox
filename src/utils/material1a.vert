precision highp float;

uniform vec3 screenPosition;
uniform vec2 scale;

attribute vec3 position;

void main() {
    gl_Position = vec4( position.xy * scale + screenPosition.xy, screenPosition.z, 1.0 );
}

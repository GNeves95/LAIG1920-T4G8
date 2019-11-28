#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

varying vec2 vTextureCoord;
varying vec3 vertex;

uniform float timeFactor;

void main() {
	gl_Position = vec4(aVertexPosition, 1.0);
	vTextureCoord = aTextureCoord;
}
#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float timeFactor;

varying vec3 vertex;

void main() {

	vec4 texture = texture2D(uSampler, vTextureCoord);

	float distX = (0.6 - abs(vTextureCoord.x));
	float disty = (0.5 - abs(vTextureCoord.y));
	float totalDist = 1.0 - 2.0*sqrt(distX*distX + disty*disty);

	disty = 1.0 - (0.5 - vTextureCoord.y);

	if(mod(vTextureCoord.y*100.0-timeFactor, 4.0) > 3.2){
		texture = vec4(texture.rgb+0.5,1.0);
	}

	texture = vec4(texture.rgb * (totalDist), 1.0);

	gl_FragColor = texture;
}
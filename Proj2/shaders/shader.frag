#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

void main() {

	//vec4 color = texture2D(uSampler, vTextureCoord);
    
    //color = vec4(0.0,0.0,1.0,1.0);

	gl_FragColor = vec4(0.0,0.0,1.0,1.0);
}
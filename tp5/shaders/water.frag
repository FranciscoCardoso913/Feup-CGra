#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;

void main() {
	vec4 color = texture2D(uSampler, vTextureCoord);
	vec4 filter = texture2D(uSampler2, vec2(0.0,0.1)+vTextureCoord);

	
	float b = filter.b +0.4;
	if ( b>1.0)
		b = 1.0;
	color.rgb = color.rgb* b;
	gl_FragColor = color;
}
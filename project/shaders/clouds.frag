#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float timeFactor;

void main() {

    // Sample the base texture
    vec4 baseColor = texture2D(uSampler, vTextureCoord);
    
    // Sample the cloud texture
    vec4 cloudColor = texture2D(uSampler2, vec2(mod(vTextureCoord.x + timeFactor*0.002, 1.0), vTextureCoord.y));
    
    
    vec4 finalColor;
    // If color is black ignore the cloud texture
    if ( cloudColor.b >= 0.2) { 
        // Calculate the final color depending on the level of white if the cloud texture
        finalColor = mix(baseColor, cloudColor, cloudColor.b);
    } else {
        finalColor = baseColor;
    }

    gl_FragColor = finalColor;
}
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
    
    // Combine the textures: apply the cloud texture only to the upper part of the sphere and only if the blue component is >= 0.2
    
    vec4 finalColor;
    if ( cloudColor.b >= 0.2) { // Adjust this threshold to control where clouds start
        finalColor = mix(baseColor, cloudColor, cloudColor.b);
    } else {
        finalColor = baseColor;
    }

    gl_FragColor = finalColor;
}
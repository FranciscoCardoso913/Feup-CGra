#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec2 vCloudTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;

void main() {
    // Sample the base texture
    vec4 baseColor = texture2D(uSampler, vTextureCoord);
    
    // Sample the cloud texture
    vec4 cloudColor = texture2D(uSampler2, vCloudTextureCoord);
    
    // Combine the textures: apply the cloud texture only to the upper part of the sphere and only if the blue component is >= 0.2
    
    vec4 finalColor;
    if ( cloudColor.b >= 0.2) { // Adjust this threshold to control where clouds start
        finalColor = mix(baseColor, cloudColor, cloudColor.a);
    } else {
        finalColor = baseColor;
    }

    gl_FragColor = finalColor;
}

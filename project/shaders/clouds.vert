attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying vec2 vTextureCoord;
varying vec2 vCloudTextureCoord;

uniform float timeFactor;

void main() {
    // Pass the base texture coordinate to the fragment shader
    vTextureCoord = aTextureCoord;
    
    // Calculate the cloud texture coordinate with time-based offset
    // Use mod to wrap the texture coordinates
    vCloudTextureCoord = mod(aTextureCoord + vec2(timeFactor * 0.01, 0.0), 1.0);
    // vCloudTextureCoord = aTextureCoord + vec2(timeFactor * 0.01, 0.0); // Without wrap
    
    // Set the position of the vertex
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
}

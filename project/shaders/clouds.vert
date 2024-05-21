attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying vec2 vTextureCoord;


void main() {
    // Pass the base texture coordinate to the fragment shader
    vTextureCoord = aTextureCoord;
    
    // Set the position of the vertex
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
}
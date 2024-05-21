// grass.vert
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uPMatrix;
uniform mat4 uMVMatrix;
uniform float uTime;

varying highp vec2 vTextureCoord;
varying highp vec3 vLighting;
varying vec4 vVertexPosition;

void main(void) {

    // Calculate the variation of the grass curvature depending on the time
    float expVarying =  ( sin(uTime ));

    // Calculate the new position
    vec3 newPosition = aVertexPosition;
    newPosition.x = newPosition.x*expVarying;

    vTextureCoord = aTextureCoord;

    // Recalculate the normals and the light
    highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);
    highp vec3 directionalLightColor = vec3(1, 1, 1);
    highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));

    highp float directional = max(dot(aVertexNormal, directionalVector), 0.0);
    vLighting = ambientLight + (directionalLightColor * directional);

    gl_Position = uPMatrix * uMVMatrix * vec4(newPosition, 1.0);

    vVertexPosition = gl_Position;
}

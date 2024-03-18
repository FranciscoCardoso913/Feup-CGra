import {CGFobject, CGFappearance} from '../../../../lib/CGF.js';

/**
 * MyTriangle 
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangle extends CGFobject {
	constructor(scene, texCoords ) {
		super(scene);
		this.texCoords = texCoords
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-1, -1, 0,	//0
			1, -1, 0,	//1
			-1, 1, 0,	//2
			-1, -1, 0,	//0
			1, -1, 0,	//1
			-1, 1, 0,	//2
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			2, 1, 0,
            3, 4, 5,
		];

        this.normals = [
			0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,

        ]

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

	
}

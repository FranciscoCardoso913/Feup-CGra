import {CGFobject} from '../../../lib/CGF.js';
/**
 * MyQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPetal extends CGFobject {
	constructor(scene, curvature=0) {
		super(scene);
		this.curvature = curvature;
		this.initBuffers();
	}
	
	initBuffers() {
		// Both of the triangles form a leaf with a length of 1
		this.vertices = [
			0,0,0,
			0.866, 0, 0.5,
			0.866, 0, -0.5,
			1.732,Math.sin(this.curvature),0, // Since the leaf has length 1, we can just use sin to get the curvature 
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0,1,2,
			2,1,0,
			2,3,1,
			1,3,2
		];

		// Making it so the leaf canals in the texture are aligned with the leaf
		this.texCoords = [
			0.5, 1,
			0.75, 0.75,
			0.25, 0.75,
			0.5, 0.5
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}


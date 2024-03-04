import {CGFobject, CGFappearance} from '../lib/CGF.js';
/**
 * MyParallelogram 
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyParallelogram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
		this.initMaterials();
	}
	
	initBuffers() {
		this.vertices = [
			0, 0, 0,	//0
			1, 1, 0,	//1
			2, 0, 0,	//2
			3, 1, 0,	//3
			0, 0, 0,	//0
			1, 1, 0,	//1
			2, 0, 0,	//2
			3, 1, 0,	//3
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 2, 1,
			1, 2, 3,

            4, 5, 6,
            5, 7, 6,

		];

        this.normals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
        ]
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

	initMaterials() {
		this.material = new CGFappearance(this.scene);
		this.material.setAmbient(0.5, 0.5, 0, 1);      // Set ambient color to yellow
		this.material.setDiffuse(0.8, 0.8, 0, 1);      // Set diffuse color to yellow
		this.material.setSpecular(0.5, 0.5, 0, 1);     // Set specular color to yellow (you can adjust this if needed)
		this.material.setShininess(10.0);
	}

	display() {
        this.material.apply();
        super.display();
    }
	
}


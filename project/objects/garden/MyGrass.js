import {CGFobject} from '../../../lib/CGF.js';

/**
 * Grass object
 */
export class MyGrass extends CGFobject {
    /**
     * Constructor
     * @param {*} scene 
     * @param {*} stacks number of stacks of the grass
     */
	constructor(scene,stacks) {
		super(scene);
        this.stacks = stacks;
        this.exp=1; // Exp used to calculate the curvature of the grass
        this.direction = Math.random()*Math.PI/4 - Math.PI/8; // Random direction
		this.initBuffers();
	}

    getExp(){
        return this.exp;
    }
    getDirection(){
        return this.direction;
    }
    /**
     * Init the Grass
     */
	initBuffers() {
		// Generate vertices, normals, and texCoords
		this.vertices = [];
        this.indices = []
		this.normals = [];
		this.texCoords = [];
        // Generates an exponent to calculate the curvature of the grass
        this.exp =  2+ Math.random()*2
        // Steps to increase in the grass height
        let d_h= 1/this.stacks;

        // Creates a triangle with stripes
        for(let i=0; i<= this.stacks;i++){
            let r = Math.pow(i*d_h-0.2,this.exp); // calculate the x using y^exp
            this.vertices.push(r,i*d_h,1-i*d_h); 
            this.vertices.push(r,i*d_h,-1+i*d_h);

            this.normals.push(r,i*d_h,1-i*d_h);
            this.normals.push(r,i*d_h,-1+i*d_h);

            this.texCoords.push(i*d_h,i*d_h);
            this.texCoords.push(1-i*d_h,i*d_h);
        }
        // Calculate the indeces (double sided)
        for(let i=0; i<this.stacks;i++){
            let j=i*2;
            this.indices.push(j,j+1,j+3); // left right top-right
            this.indices.push(j,j+3,j+2); // left top-right top-left

            this.indices.push(j+3,j+1,j); // top-right right left
            this.indices.push(j+2,j+3,j); // top-left top-right left
        }
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
}



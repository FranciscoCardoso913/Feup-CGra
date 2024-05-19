import {CGFobject} from '../../../lib/CGF.js';

export class MyGrass extends CGFobject {
	constructor(scene,stacks) {
		super(scene);
        this.stacks = stacks;
        this.exp=1;
        this.direction = Math.random()*Math.PI/4 - Math.PI/8;
		this.initBuffers();
	}
    getExp(){
        return this.exp;
    }
    getDirection(){
        return this.direction;
    }
	initBuffers() {
		// Generate vertices, normals, and texCoords
		this.vertices = [];
        this.indices = []
		this.normals = [];
		this.texCoords = [];
        this.exp =  2+ Math.random()*2
        let d_h= 1/this.stacks;

        for(let i=0; i<= this.stacks;i++){
            let r = Math.pow(i*d_h-0.2,this.exp);
            this.vertices.push(r,i*d_h,1-i*d_h)
            this.vertices.push(r,i*d_h,-1+i*d_h)

            this.normals.push(r,i*d_h,1-i*d_h)
            this.normals.push(r,i*d_h,-1+i*d_h)
            this.texCoords.push(i*d_h,i*d_h)
            this.texCoords.push(1-i*d_h,i*d_h)
        }

        for(let i=0; i<this.stacks;i++){
            let j=i*2;
            this.indices.push(j,j+1,j+3);
            this.indices.push(j,j+3,j+2);

            this.indices.push(j+3,j+1,j);
            this.indices.push(j+2,j+3,j);
        }


		


		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
}



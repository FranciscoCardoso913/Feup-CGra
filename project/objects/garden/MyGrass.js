import {CGFobject} from '../../../lib/CGF.js';

export class MyGrass extends CGFobject {
	constructor(scene,stacks) {
		super(scene);
        this.stacks = stacks;
		this.initBuffers();
	}
	initBuffers() {
		// Generate vertices, normals, and texCoords
		this.vertices = [];
        this.indices = []
		this.normals = [];
		this.texCoords = [];
        let exp = 1+ Math.random()*2
        let d_h= 1/this.stacks;

        for(let i=0; i<= this.stacks;i++){
            this.vertices.push(Math.pow(i*d_h/1.5,exp),i*d_h,1-i*d_h)
            this.vertices.push(Math.pow(i*d_h/1.5,exp),i*d_h,-1+i*d_h)

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



import {CGFobject} from '../../../lib/CGF.js';

export class MySphere extends CGFobject {
	constructor(scene, stacks, slices, isSemiSphere = false) {
		super(scene);
		this.stacks = stacks ;
        this.slices = slices ;
		this.isSemiSphere = isSemiSphere;
		this.initBuffers();
	}
	initBuffers() {
		// Generate vertices, normals, and texCoords
		this.vertices = [];
		this.normals = [];
		this.texCoords = [];

		const beta = this.isSemiSphere? (Math.PI )/this.slices : (Math.PI*2 ) / this.slices ; 
        const alfa = (Math.PI/2) / this.stacks;

        for (let i=0; i <= this.stacks *2;i++){

            for(let j =0; j<= this.slices; j++){
				let ang = j*beta;
				let ang2 =  i*alfa;
                this.vertices.push(Math.sin(ang)*Math.sin(ang2),Math.cos(ang2),Math.cos(ang)*Math.sin(ang2));
				this.texCoords.push( j/(this.slices +1 ), i/(this.stacks*2 +1));
				this.normals.push(Math.sin(ang)*Math.sin(ang2),Math.cos(ang2),Math.cos(ang)*Math.sin(ang2))
            }

        }


		
        console.log(this.vertices);

		// Generating indices
		this.indices = [];

		for (let i=1; i < this.stacks*2 -1;i++){

			for (let j=0; j < this.slices;j++){
				this.indices.push(i*(this.slices+1) + j); // Bottom left
				
				this.indices.push(((i+1))*(this.slices+1) + j); // Top
				this.indices.push(i*(this.slices+1) + ((j+1))); // Bottom Right
				
				
				this.indices.push(i*(this.slices +1) + ((j+1)));
				this.indices.push(((i+1))*(this.slices +1) + j);
				this.indices.push(((i+1))*(this.slices +1) + ((j+1)));
				
				
				
			}
		}

		for (let j=0; j < this.slices;j++){
			this.indices.push(j); // Bottom left
			this.indices.push((this.slices+1) + j); // Top
			this.indices.push((this.slices+1) + j+1); // Bottom Right

			this.indices.push((this.slices+1)*this.stacks*2 -j); // Bottom left
			this.indices.push((this.slices+1)*(this.stacks*2 -1) + j+1); // Bottom Right
			this.indices.push((this.slices+1)*(this.stacks*2 -1) + j); // Top

		}




		console.log(this.indices);


		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
}



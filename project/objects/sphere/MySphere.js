import {CGFobject} from '../../../lib/CGF.js';

export class MySphere extends CGFobject {
	constructor(scene, stacks, slices) {
		super(scene);
		this.stacks = stacks ;
        this.slices = slices ;
		this.initBuffers();
	}
	initBuffers() {
		// Generate vertices, normals, and texCoords
		this.vertices = [];
		//this.normals = [];
		//this.texCoords = [];
		const beta = (Math.PI*2) / this.slices; 
        const alfa = (Math.PI/2) / this.stacks;
        let ang2 =0
        for (let i=0; i <= this.stacks;i++){
            let height = Math.sin(ang2);
            let radius = Math.cos(ang2);
            let ang = 0;
            for(let j =0; j< this.slices; j++){
                this.vertices.push(...[radius*Math.cos(ang),height,radius*Math.sin(ang)]);
                ang += beta;
            }
            ang2 += alfa;
        }
		ang2 = 0;
        for (let i=0; i <= this.stacks;i++){
            let height = Math.sin(ang2);
            let radius = Math.cos(ang2);
            let ang = 0;
            for(let j =0; j< this.slices; j++){
                this.vertices.push(...[radius*Math.cos(ang),height,radius*Math.sin(ang)]);
                ang -= beta
            }
            ang2 -= alfa;
        }
		
        console.log(this.vertices);



		
		// Generating indices
		this.indices = [];

		for (let i=0; i <= this.stacks;i++){

			for (let j=0; j < this.slices;j++){
				this.indices.push(i*this.slices + j);
				this.indices.push(((i+1)%(this.stacks+1))*this.slices + j);
				this.indices.push(i*this.slices + ((j+1)%(this.slices)));
				
				
				this.indices.push(i*this.slices + ((j+1)%(this.slices)));
				this.indices.push(((i+1)%(this.stacks+1))*this.slices + ((j+1)%(this.slices)));
				this.indices.push(((i+1)%(this.stacks+1))*this.slices + j);
				
				
			}
		}

		for (let i=this.stacks; i <= this.stacks*2;i++){

			for (let j=0; j < this.slices;j++){
				this.indices.push(i*this.slices + j);
				this.indices.push(((i+1)%(this.stacks*2+2))*this.slices + j);
				this.indices.push(i*this.slices + ((j+1)%(this.slices)));
				
				
				this.indices.push(i*this.slices + ((j+1)%(this.slices)));
				this.indices.push(((i+1)%(this.stacks*2+2))*this.slices + ((j+1)%(this.slices)));
				this.indices.push(((i+1)%(this.stacks*2+2))*this.slices + j);
				
				
			}
		}

		console.log(this.indices);


/*
		var ind = 0;
		for (var j = 0; j < this.nrDivs; j++) {
			for (var i = 0; i <= this.nrDivs; i++) {
				this.indices.push(ind);
				this.indices.push(ind + this.nrDivs + 1);
				ind++;
			}
			if (j + 1 < this.nrDivs) {
				this.indices.push(ind + this.nrDivs);
				this.indices.push(ind);
			}
		}*/
		this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
		this.initGLBuffers();
	};

	setFillMode() { 
		this.primitiveType=this.scene.gl.TRIANGLE_STRIP;
	};

	setLineMode() 
	{ 
		this.primitiveType=this.scene.gl.LINES;
	};

}



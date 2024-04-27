import {CGFobject} from '../../lib/CGF.js';

export class MyRock extends CGFobject {
	constructor(scene, texture,flatness =Math.random() * 0.5 + 0.3 ) {
		super(scene);
		this.texture = texture;
		this.flatness = flatness;
		this.stacks = 10 ;
        this.slices = 10 ;
		this.initBuffers();
	}
	initBuffers() {
		// Generate vertices, normals, and texCoords
		this.vertices = [];
		this.normals = [];
		this.texCoords = [];

		const beta =(Math.PI*2 ) / this.slices ; 
        const alfa = (Math.PI/2) / this.stacks;
        const roughness = 0.3;

        let stack_t =  (Math.random() )*roughness;
        for (let i=0; i <= this.stacks *2;i++){
            let slice_t =  (Math.random() )*roughness + 0.7;
            let slice_vt = slice_t;

            for(let j =0; j<= this.slices; j++){
				let ang = j*beta;
				let ang2 =  i*alfa;
                if(i ==0 || i == this.stacks*2)
                    this.vertices.push(Math.sin(ang)*Math.sin(ang2) *stack_t,Math.cos(ang2)*stack_t ,Math.cos(ang)*Math.sin(ang2)* stack_t);
                else if(j == this.slices)
                    this.vertices.push(Math.sin(ang)*Math.sin(ang2) *slice_vt,Math.cos(ang2) *slice_vt ,Math.cos(ang)*Math.sin(ang2)* slice_vt);
                else
                    this.vertices.push(Math.sin(ang)*Math.sin(ang2) *slice_t,Math.cos(ang2) *slice_t ,Math.cos(ang)*Math.sin(ang2) *slice_t);
				this.texCoords.push( j/(this.slices  ), i/(this.stacks*2 ));
				this.normals.push(Math.sin(ang )*Math.sin(ang2 ),Math.cos(ang2),Math.cos(ang)*Math.sin(ang2));
                slice_t =  (Math.random() )*roughness +0.7;
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

		for (let j=0; j <= this.slices;j++){

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

	display(){
		this.scene.pushMatrix();
        this.scene.appearance.setTexture(this.texture);
        this.scene.appearance.setTextureWrap('REPEAT', 'REPEAT');
		this.scene.scale(1, this.flatness, 1);
        this.scene.appearance.apply();
        super.display();
        this.scene.setDefaultAppearance();

    }
}





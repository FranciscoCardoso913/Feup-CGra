import {CGFobject} from '../../../lib/CGF.js';
import { MyRock } from './MyRock.js';

export class MyRockPiramid extends CGFobject {
	constructor(scene,stacks,texture,  bl, rocks_size = 1 ) {
		super(scene);
		this.bl = bl ;
        this.stacks= stacks;
		this.texture =  texture;
		this.rocks_size = rocks_size;
		this.rocks = []
		this.positions = [];
		this.initBuffers();
	}
	initBuffers() {
        this.rock= new MyRock(this.scene,this.texture);


	};

	display(){
        let x= this.bl[0];
        let y= this.bl[1];
		this.scene.pushMatrix()
		this.scene.scale(this.rocks_size, this.rocks_size, this.rocks_size);
		for(let k=0; k< this.stacks; k++)
			for(let i=0; i< 2*(this.stacks-k) +1; i++)
				for(let j=0; j< 2*(this.stacks-k)+1;j++){
					this.scene.pushMatrix()
					this.scene.translate(x+ (this.rocks_size*i +k)*1.5, 0.9*k*this.rocks_size,y+(this.rocks_size*j+ k)*1.5)
					this.rock.display()
					this.scene.popMatrix()

				}

        
		
		
	
	this.scene.popMatrix()
	}
}



import {CGFobject} from '../../lib/CGF.js';
import { MyRock } from './MyRock.js';

export class MyRockSet extends CGFobject {
	constructor(scene,texture,  bl, tr, nrocks= 1, rocks_size = 1 ) {
		super(scene);
		this.bl = bl ;
        this.tr = tr ;
		this.nrocks = nrocks;
		this.texture =  texture;
		this.rocks_size = rocks_size;
		this.rocks = []
		this.positions = [];
		this.initBuffers();
		console.log(this.positions)
	}
	initBuffers() {
		let bl_x,bl_y, tr_x, tr_y,height, width, vw, vh, max_number;
		bl_x = this.bl[0];
		bl_y = this.bl[1];
		tr_x = this.tr[0];
		tr_y = this.tr[1];
		height = tr_y - bl_y;
		width = tr_x -bl_x;
		vw = (width/ (this.rocks_size)) /2;
		vh = (height / (this.rocks_size))/2;
		max_number = Math.floor(vw*vh);
		this.nrocks = max_number< this.nrocks? max_number: this.nrocks;
		let ocupied_spaces = [];
		while (this.nrocks>0){
			let pos = Math.floor( Math.random() * max_number);
			if(!ocupied_spaces.includes(pos)){
				let pos_y = Math.floor( pos / vw);
				let pos_x = pos % vw;
				ocupied_spaces.push(pos);
				this.positions.push([pos_x*2, 0, pos_y*2]);
				this.rocks.push(new MyRock(this.scene, this.texture))
				this.nrocks-= 1;
			}
		}


		//this.primitiveType = this.scene.gl.TRIANGLES;
		//this.initGLBuffers();
	};

	display(){
		let idx = 0;
		this.scene.pushMatrix()
		this.scene.scale(this.rocks_size, this.rocks_size, this.rocks_size);
		this.positions.forEach((value)=> {
			// console.log(value)
			this.scene.pushMatrix();
			this.scene.translate(...value);
			this.rocks[idx].display();
			
			this.scene.popMatrix();
			idx+=1;
		}
		
		
	)
	console.log(idx)
	
	this.scene.popMatrix()
	}
}



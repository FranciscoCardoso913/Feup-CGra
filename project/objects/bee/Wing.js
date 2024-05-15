import {CGFobject} from '../../../lib/CGF.js';
import { MySphere } from '../MySphere.js';
import { MyCylinder } from '../geometric/MyCylinder.js';

export class Wing extends CGFobject {
	constructor(scene, texture) {
		super(scene);
        this.texture = texture;
		this.initBuffers();
	}
	initBuffers() {
		this.spere = new MySphere(this.scene, 20,20);
        

	};

   
    display(){
        this.scene.pushMatrix()
        this.texture.apply()
        this.scene.scale(0.4,0.05,0.8);
        this.scene.translate(0,0,0.9);
        this.spere.display();
        this.scene.popMatrix()
        this.scene.pushMatrix()
        this.scene.translate(0.2,0,0);
        this.scene.scale(0.4,0.05,0.7);
        this.scene.translate(0,0,0.9);
        this.spere.display();
        this.scene.popMatrix();
    }
}



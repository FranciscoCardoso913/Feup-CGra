import {CGFobject} from '../../../lib/CGF.js';
import { MySphere } from '../MySphere.js';
import { MyCylinder } from '../geometric/MyCylinder.js';

export class Antenna extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.spere = new MySphere(this.scene, 20,20);
        this.cylinder = new MyCylinder(this.scene, 10,10);

	};

   
    display(){
        this.scene.pushMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.025, 0.15, 0.025);
        this.scene.translate(0,0,0);
        this.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0.15,0);
        this.scene.rotate(Math.PI/4, 0,0,1)
        this.scene.scale(0.025, 0.35, 0.025);
        this.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0.15,0);
        this.scene.scale(0.025, 0.025, 0.025);
        this.spere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.25,0.4,0);
        this.scene.scale(0.025, 0.025, 0.025);
        this.spere.display();
        this.scene.popMatrix();



        this.scene.popMatrix();
    }
}



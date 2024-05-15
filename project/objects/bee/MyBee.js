import {CGFobject} from '../../../lib/CGF.js';
import { MySphere } from '../MySphere.js';

export class MyBee extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.spere = new MySphere(this.scene, 20,20);


	};

    displayHead(){
        this.scene.pushMatrix();
        this.spere.display();
        this.scene.popMatrix();
    }
    displayTorso(){
        this.scene.pushMatrix();
        this.spere.display();
        this.scene.popMatrix();
    }
    displayAbdomen(){
        this.scene.pushMatrix();
        this.spere.display();
        this.scene.popMatrix();
    }
    displayEye(){
        this.scene.pushMatrix();
        this.spere.display();
        this.scene.popMatrix();
    }

    display(){
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/6.0,0,0,1);
        this.scene.scale(0.6,1,1);
        
        this.displayHead();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1,0,0)
        this.scene.scale(0.8,0.9,1);
        this.displayAbdomen();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2.5,-0.5,0)
        this.scene.rotate(-Math.PI/6.0,0,0,1);
        
        this.scene.scale(1.3,0.8,0.8);
        this.displayTorso();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.4,0.5,0.4)
        this.scene.rotate(-Math.PI/6.0,0,0,1);
        this.scene.scale(0.1,0.3,0.3);
        this.displayEye();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.4,0.5,-0.4)
        this.scene.rotate(-Math.PI/6.0,0,0,1);
        this.scene.scale(0.1,0.3,0.3);
        this.displayEye();
        this.scene.popMatrix();
    }
}



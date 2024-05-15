import {CGFobject} from '../../../lib/CGF.js';
import { MySphere } from '../MySphere.js';
import { Antenna } from './Antenna.js';

export class MyBee extends CGFobject {
	constructor(scene, textures) {
		super(scene);
        this.textures = textures;
		this.initBuffers();
	}
	initBuffers() {
		this.spere = new MySphere(this.scene, 20,20);
        this.antenna = new Antenna(this.scene);

	};

    displayHead(){
        this.scene.pushMatrix();
        
        this.scene.appearance.setTexture(this.textures[0]);
        this.scene.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.scene.appearance.apply();
        this.spere.display();
        this.scene.popMatrix();
    }
    displayTorso(){
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2,0,0,1 )
        this.scene.appearance.setTexture(this.textures[1]);
        this.scene.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.scene.appearance.apply();
        this.spere.display();
        this.scene.popMatrix();
    }
    displayAbdomen(){
        this.scene.pushMatrix();
        this.scene.appearance.setTexture(this.textures[0]);
        this.scene.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.scene.appearance.apply();
        this.spere.display();
        this.scene.popMatrix();
    }
    displayEye(){
        this.scene.pushMatrix();
        this.scene.appearance.setTexture(this.textures[2]);
        this.scene.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.scene.appearance.apply();
        this.spere.display();
        this.scene.popMatrix();
    }
    displayAntenna(){
        this.scene.pushMatrix();
        this.scene.appearance.setTexture(this.textures[3]);
        this.scene.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.scene.appearance.apply();
        this.antenna.display();
        this.scene.popMatrix();
    }

    display(){
        
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/6.0,0,0,1);
        this.scene.scale(0.7,1,1);
        
        this.displayHead();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1.2,0,0)
        this.scene.scale(0.9,0.9,1);
        this.displayAbdomen();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2.5,-0.5,0)
        this.scene.rotate(-Math.PI/6.0,0,0,1);
        
        this.scene.scale(1.3,0.8,0.8);
        this.displayTorso();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.4,0.3,0.7);
        this.scene.rotate(Math.PI/6,0,1,0);
        this.scene.rotate(Math.PI/6.0,1,0,0);
        this.scene.rotate(-Math.PI/6.0,0,0,1);
        this.scene.scale(0.1,0.4,0.3);
        this.displayEye();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.4,0.3,-0.7)
        this.scene.rotate(-Math.PI/6,0,1,0);
        this.scene.rotate(-Math.PI/6.0,1,0,0);
        this.scene.rotate(-Math.PI/6.0,0,0,1);
        
        this.scene.scale(0.1,0.4,0.3);
        this.displayEye();
        this.scene.popMatrix();
        

        this.scene.pushMatrix();
        this.scene.translate(-0,0.8,0.4);
        this.scene.rotate(Math.PI/4, 0,1,1)
        this.displayAntenna();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0,0.8,-0.4);
        this.scene.rotate(Math.PI/4, 0,0,1)
        this.scene.rotate(-Math.PI/4, 0,1,0)
        this.displayAntenna();
        this.scene.popMatrix();
    }
}



import {CGFobject} from '../lib/CGF.js';
import {MyQuad} from './MyQuad.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {

        this.quad = new MyQuad(this.scene); //Positive face parallel to xz (A,B,C,D)

	}
    changeColor() {
        this.scene.setAmbient(0.7, 0.25, 0, 1);         // Maroon has RGB values (128, 0, 0), but normalized to (0.5, 0, 0)
        this.scene.setDiffuse(0.3, 0.2, 0.2, 1);  // Adjusted to a slightly reddish hue for maroon
        this.scene.setSpecular(0.5, 0, 0);        // Same as ambient for maroon
        this.scene.setShininess(10);
    }
    display(){
        this.changeColor()
        this.scene.pushMatrix()
        this.scene.scale(7,7,1)
        this.scene.translate(0,0,-0.51)
        this.scene.pushMatrix()

        this.scene.translate(0,0,0.5)
        this.quad.display()
        this.scene.popMatrix(); 
        this.scene.pushMatrix();

        this.scene.translate(0,0,-0.5)
        this.scene.rotate(Math.PI, 0,1,0);
        this.quad.display();
        this.scene.popMatrix(); 
        this.scene.pushMatrix();

        this.scene.translate(0,0.5,0);
        this.scene.rotate(-Math.PI/2, 1,0,0)
        this.quad.display();
        this.scene.popMatrix(); 
        this.scene.pushMatrix();

        this.scene.translate(0,-0.5,0);
        this.scene.rotate(Math.PI/2, 1,0,0)
        this.quad.display();
        this.scene.popMatrix(); 
        this.scene.pushMatrix();

        this.scene.translate(0.5,0,0);
        this.scene.rotate(Math.PI/2, 0,1,0)
        this.quad.display();
        this.scene.popMatrix(); 
        this.scene.pushMatrix();

        this.scene.translate(-0.5,0,0);
        this.scene.rotate(-Math.PI/2, 0,1,0)
        this.quad.display();
        this.scene.popMatrix(); 
        this.scene.popMatrix();

        this.scene.setDefaultAppearance()
    }


    
}


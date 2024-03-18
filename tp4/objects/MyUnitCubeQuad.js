import {CGFobject, CGFtexture, CGFappearance} from '../../lib/CGF.js';
import {MyQuad} from './MyQuad.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene, top = null, front =null, right =null, back =null, left =null, bottom =null ) {
		super(scene);
        this.topText = top;
        this.frontText = front;
        this.rightText = right;
        this.leftText = left;
        this.backtext = back;
        this.bottomText = bottom;
        this.initMaterial();
		this.initBuffers();
        
	}
	
	initBuffers() {

        this.quad = new MyQuad(this.scene); //Positive face parallel to xz (A,B,C,D)

	}
    initMaterial() {
        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(0.7, 0.25, 0, 1);         // Maroon has RGB values (128, 0, 0), but normalized to (0.5, 0, 0)
        this.material.setDiffuse(0.3, 0.2, 0.2, 1);  // Adjusted to a slightly reddish hue for maroon
        this.material.setSpecular(0.7, 0.25, 0,1);        // Same as ambient for maroon
        this.material.setShininess(10);
    }
    display(){
        this.material.apply();

        this.scene.pushMatrix()
        this.scene.pushMatrix()

        this.scene.translate(0,0,0.5)
        if(this.frontText) this.material.setTexture(this.frontText);
        this.quad.display()
        this.scene.popMatrix(); 
        this.scene.pushMatrix();

        this.scene.translate(0,0,-0.5)
        this.scene.rotate(Math.PI, 0,1,0);
        if(this.backtext) this.material.setTexture(this.backtext);
        this.quad.display();
        this.scene.popMatrix(); 
        this.scene.pushMatrix();

        this.scene.translate(0,0.5,0);
        this.scene.rotate(-Math.PI/2, 1,0,0)
        if(this.topText) this.material.setTexture(this.topText);
        this.quad.display();
        this.scene.popMatrix(); 
        this.scene.pushMatrix();

        this.scene.translate(0,-0.5,0);
        this.scene.rotate(Math.PI/2, 1,0,0)
        if(this.bottomText) this.material.setTexture(this.bottomText);
        this.quad.display();
        this.scene.popMatrix(); 
        this.scene.pushMatrix();

        this.scene.translate(0.5,0,0);
        this.scene.rotate(Math.PI/2, 0,1,0)
        if(this.rightText) this.material.setTexture(this.rightText);
        this.quad.display();
        this.scene.popMatrix(); 
        this.scene.pushMatrix();

        this.scene.translate(-0.5,0,0);
        this.scene.rotate(-Math.PI/2, 0,1,0)
        if(this.leftText) this.material.setTexture(this.leftText);
        this.quad.display();
        this.scene.popMatrix(); 
        this.scene.popMatrix();

        this.scene.setDefaultAppearance()
    }


    
}


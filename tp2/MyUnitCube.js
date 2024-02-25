import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			0.5, 0.5, 0.5,    // Vertice A - idx 0
            0.5, 0.5,-0.5,    // Vertice B - idx 1
            -0.5, 0.5, -0.5,  // Vertice C - idx 2
            -0.5, 0.5,0.5,    // Vertice D - idx 3
			0.5, -0.5, 0.5,   // Vertice E - idx 4
            0.5, -0.5,-0.5,   // Vertice F - idx 5
            -0.5, -0.5, -0.5, // Vertice G - idx 6
            -0.5, -0.5,0.5,   // Vertice H - idx 7

		];

		
		this.indices = [

            // Counter-clockwise to positive faces and clockwise to negative faces

            // Positive face parallel to xz (A,B,C,D)
			0, 1, 2,
			2, 3, 0,

            // Negative face parallel to xz (E,F,G,H)
            6, 5, 4,
            4, 7, 6,

            // Positive face parallel to yz (A, B, F, E)
            0, 4, 5,
            5, 1, 0,

            // Negative face parallel to yz (D, C, H, G)
            6, 7, 3,
            3, 2, 6,

            // Positive face parallel to xy (A, D, H, E)
            0, 3, 7,
            7, 4, 0,
            
            // Negative face parallel to xy (B, C, G, F)
            6, 2, 1,
            1, 5, 6


		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
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
        super.display()
        this.scene.setDefaultAppearance()
        this.scene.popMatrix()
    }


    
}


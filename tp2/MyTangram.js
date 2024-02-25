import {CGFobject} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initPieces();
	}
	
	initPieces() {
        this.diamond = new MyDiamond(this.scene);
        this.triangle = new MyTriangle(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);
        this.triangleBig = new MyTriangleBig(this.scene);
        this.triangleBig2 = new MyTriangleBig(this.scene);
        this.triangleSmall = new MyTriangleSmall(this.scene);
        this.triangleSmall2 = new MyTriangleSmall(this.scene);
	}

    display() {
      
        this.scene.pushMatrix();
        // ---- BEGIN Primitive drawing section
        this.scene.multMatrix([
            1,0,0,0,
            0,1,0,0,
            0,0,1,0,
            -1,1,0,1
        ]);
        this.diamond.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(1,0,0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.triangle.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(-1,2,0);
        this.scene.scale(1,-1,1);
        this.parallelogram.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(0,-1,0);
        this.triangleBig.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(-2,0,0);
        this.scene.rotate(-Math.PI / 2,0,0,1); 
        this.triangleSmall.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(0,-1,0);
        this.scene.scale(1,-1,1);
        this.triangleBig2.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(0,2,0);
        this.scene.rotate(-Math.PI/4, 0,0,1);
        this.scene.translate(-1,0,0);
        this.triangleSmall2.display();


        // ---- END Primitive drawing section
    }
}


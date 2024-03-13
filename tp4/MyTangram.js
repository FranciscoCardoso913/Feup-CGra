import {CGFobject,CGFappearance} from '../lib/CGF.js';
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
        this.initMaterials();
	}
	
	initPieces() {
        this.diamond = new MyDiamond(this.scene);
        this.triangle = new MyTriangle(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);
        this.triangleBig = new MyTriangleBig(this.scene);
        this.triangleSmall = new MyTriangleSmall(this.scene);
	}
    initMaterials (){

        //Green Color
        this.material = new CGFappearance(this.scene)
        this.material.setAmbient(0.1, 0.1, 0.1, 1);
        this.material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.material.setSpecular(0.1, 0.1, 0.1, 1);
        this.material.setShininess(10.0)
        this.material.loadTexture('images/tangram.png');

        
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
        this.material.apply();
        this.diamond.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        
        // Pink Triangle
        this.scene.translate(1,0,0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.triangle.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
       
        // Yellow Parallelogram
        this.scene.translate(-1,2,0);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.parallelogram.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();


        // Red triangle
        this.scene.translate(-2,0,0);
        this.scene.rotate(-Math.PI / 2,0,0,1); 
        this.triangleSmall.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();

        // Orange triangle
        this.scene.translate(0,-1,0);
        this.scene.rotate(-Math.PI, 0, 0, 1 );
        this.triangleBig.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();

        // Blue triangle
        this.scene.translate(0,-1,0);
        this.triangleBig.texCoords = [
            0,0,
            0.5, 0.5,
            0, 1,
            0,0,
            0.5, 0.5,
            0, 1,
        ]
        this.triangleBig.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();

        // Purple triangle
        this.scene.translate(0,2,0);
        this.scene.rotate(-Math.PI/4, 0,0,1);
        this.scene.translate(-1,0,0);
        this.triangleSmall.display();
        this.scene.popMatrix()


        // ---- END Primitive drawing section
    }

   enableNormalViz(){
       this.diamond.enableNormalViz();
       this.triangle.enableNormalViz();
       this.parallelogram.enableNormalViz();
       this.triangleBig.enableNormalViz();
       this.triangleSmall.enableNormalViz();
   }

   disableNormalViz(){
       this.diamond.disableNormalViz();
       this.triangle.disableNormalViz();
       this.parallelogram.disableNormalViz();
       this.triangleBig.disableNormalViz();
       this.triangleSmall.disableNormalViz();
   }
}


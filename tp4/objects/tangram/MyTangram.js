import {CGFobject,CGFappearance, CGFtexture} from '../../../lib/CGF.js';
import { MyDiamond } from "./pieces/MyDiamond.js";
import { MyTriangle } from "./pieces/MyTriangle.js";
import { MyParallelogram } from "./pieces/MyParallelogram.js";
import { MyTriangleSmall } from "./pieces/MyTriangleSmall.js";
import { MyTriangleBig } from "./pieces/MyTriangleBig.js";
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
        this.initTextures();
		this.initPieces();
        this.initMaterials();
	}
	
	initPieces() {
        this.diamond = new MyDiamond(this.scene, this.diamondText);
        this.triangle = new MyTriangle(this.scene, this.triangletext);
        this.parallelogram = new MyParallelogram(this.scene, this.parallelogramText);
        this.topTriangleBig = new MyTriangleBig(this.scene, this.topTriangleBigText);
        this.bottomTriangleBig = new MyTriangleBig(this.scene, this.bottomTriangleBigText);
        this.topTriangleSmall = new MyTriangleSmall(this.scene, this.topTriangleSmallText);
        this.bottomTriangleSmall = new MyTriangleSmall(this.scene, this.bottomTriangleSmallText);
	}
    initMaterials (){
        this.texture = new CGFtexture(this.scene, 'images/tangram.png');
        //Green Color
        this.material = new CGFappearance(this.scene)
        this.material.setAmbient(0.1, 0.1, 0.1, 1);
        this.material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.material.setSpecular(0.1, 0.1, 0.1, 1);
        this.material.setShininess(10.0)
        this.material.setTexture(this.texture)
        
    }
    initTextures(){
        this.diamondText =  [
            0, 0.5,
            0.25, 0.75,
            0.25, 0.25,
            0.5, 0.5,
            0, 0.5,
            0.25, 0.75,
            0.25, 0.25,
            0.5, 0.5,
        ];

        this.triangletext =  [
            0, 1,
            0.5, 1,
            0, 0.5,
            0, 1,
            0.5, 1,
            0, 0.5,
        ];

        this.parallelogramText = [
			1,1,
			0.75, 0.75,
			0.5, 1,
			0.25, 0.75,
			1,1,
			0.75, 0.75,
			0.5, 1,
			0.25, 0.75
		];
        this.bottomTriangleBigText = [
			1,1,
			0.5, 0.5,
			1,0,
			1,1,
			0.5, 0.5,
			1,0,
		];
        this.topTriangleBigText = [
            1, 0,
            0.5, 0.5,
            0,0,
            1, 0,
            0.5, 0.5,
            0,0,
        ];
        this.bottomTriangleSmallText = [
            0.25, 0.75,
            0.75, 0.75,
            0.5,0.5,
            0.25, 0.75,
            0.75, 0.75,
            0.5,0.5,
        ];
        this.topTriangleSmallText = [
                0.0, 0.0,
                0.0, 0.5,
                0.25,0.25,
                0.0, 0.0,
                0.0, 0.5,
                0.25,0.25,
        ];

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
        this.bottomTriangleSmall.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();

        // Orange triangle
        this.scene.translate(0,-1,0);
        this.scene.rotate(-Math.PI, 0, 0, 1 );


        this.bottomTriangleBig.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();

        // Blue triangle
        this.scene.translate(0,-1,0);
        
        this.topTriangleBig.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        // Purple triangle
        this.scene.translate(0,2,0);
        this.scene.rotate(-Math.PI/4, 0,0,1);
        this.scene.translate(-1,0,0);

        this.topTriangleSmall.display();
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


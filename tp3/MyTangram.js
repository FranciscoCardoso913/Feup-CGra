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

        //Purple Color
        this.purple = new CGFappearance(this.scene)
        this.purple.setAmbient(138/255, 43/255, 226/255, 1);     
		this.purple.setDiffuse(0, 0, 0, 1);    
		this.purple.setSpecular(1, 1, 1, 1);    
		this.purple.setShininess(10.0);

        //Green Color
        this.green = new CGFappearance(this.scene)
        this.green.setAmbient(0, 1, 0, 1);     
		this.green.setDiffuse(0, 0, 0, 1);    
		this.green.setSpecular(0.8, 0.8, 0.8, 1);    
		this.green.setShininess(10.0);

        //Red Color
        this.red = new CGFappearance(this.scene)
        this.red.setAmbient(1, 27/255, 27/255, 1);     
		this.red.setDiffuse(0, 0, 0, 1);    
		this.red.setSpecular(0.8, 0.8, 0.8, 1);    
		this.red.setShininess(10.0);

        //Yellow Color
        this.yellow = new CGFappearance(this.scene)
        this.yellow.setAmbient(1, 1, 0, 1);     
		this.yellow.setDiffuse(0, 0, 0, 1);    
		this.yellow.setSpecular(0.8, 0.8, 0.8, 1);    
		this.yellow.setShininess(10.0);

        //Blue Color
        this.blue = new CGFappearance(this.scene)
        this.blue.setAmbient(0, 155/255, 1, 1);     
		this.blue.setDiffuse(0, 0, 0, 1);    
		this.blue.setSpecular(0.8, 0.8, 0.8, 1);    
		this.blue.setShininess(10.0);

        //Pink Color
        this.pink = new CGFappearance(this.scene)
        this.pink.setAmbient(1, 155/255, 207/255, 1);     
		this.pink.setDiffuse(0, 0, 0, 1);    
		this.pink.setSpecular(0.8, 0.8, 0.8, 1);    
		this.pink.setShininess(10.0);

        //Orange Color
        this.orange = new CGFappearance(this.scene)
        this.orange.setAmbient(1, 155/255, 0, 1);     
		this.orange.setDiffuse(0, 0, 0, 1);    
		this.orange.setSpecular(0.8, 0.8, 0.8, 1);    
		this.orange.setShininess(10.0);
        
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
        this.scene.customMaterial.apply();
        this.diamond.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        
        // Pink Triangle
        this.scene.translate(1,0,0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.pink.apply();
        this.triangle.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
       
        // Yellow Parallelogram
        this.scene.translate(-1,2,0);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.yellow.apply();
        this.parallelogram.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();

        // Blue triangle
        this.scene.translate(0,-1,0);
        this.blue.apply();
        this.triangleBig.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();

        // Red triangle
        this.scene.translate(-2,0,0);
        this.scene.rotate(-Math.PI / 2,0,0,1); 
        this.red.apply();
        this.triangleSmall.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();

        // Orange triangle
        this.scene.translate(0,-1,0);
        this.scene.rotate(-Math.PI, 0, 0, 1 );
        this.orange.apply();
        this.triangleBig.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();

        // Purple triangle
        this.scene.translate(0,2,0);
        this.scene.rotate(-Math.PI/4, 0,0,1);
        this.scene.translate(-1,0,0);
        this.purple.apply();
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


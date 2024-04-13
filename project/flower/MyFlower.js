import { CGFobject } from "../../lib/CGF.js";
import { MyPetal } from "./MyPetal.js";
import { MyReceptacle } from "./MyReceptacle.js";
import { MyStem } from "./MyStem.js";
/**
 * MyQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFlower extends CGFobject {
  constructor(scene) {
    super(scene);
    this.initBuffers();
  }

  initBuffers() {

	this.vertices = []
	this.indices = []

    this.petal = new MyPetal(this.scene);
    this.receptacle = new MyReceptacle(this.scene, 30);
    this.stem = new MyStem(this.scene, 1, 30);
    this.n_petals = 10;
    //The defined indices (and corresponding vertices)
    //will be read in groups of three to draw triangles
    this.primitiveType = this.scene.gl.TRIANGLES;

    this.initGLBuffers();
  }

  display() {
	
    // PETALS
    const angle = 2 * Math.PI / this.n_petals; 

    for (let i = 0; i < this.n_petals; i++) {
      this.scene.pushMatrix();
      this.scene.rotate(i * angle, 0, 1, 0);
      this.scene.translate(0.5, 0,0);
      this.petal.display();
      this.scene.popMatrix();
    }

    // RECEPTACLE
    this.scene.pushMatrix();
    this.scene.scale(0.5, 1, 0.5);
    this.receptacle.display();
    this.scene.popMatrix();

    //STEM
    this.scene.pushMatrix();
    let stemHeight = 3;
    this.scene.translate(0,-stemHeight,0);
    this.scene.scale(0.2,stemHeight,0.2);
    this.stem.display();
    this.scene.popMatrix();
  }
}

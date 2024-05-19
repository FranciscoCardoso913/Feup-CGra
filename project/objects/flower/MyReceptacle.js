import { CGFobject } from "../../../lib/CGF.js";
import { MySphere } from "../MySphere.js";
/**
 * MyPyramid
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
 */
export class MyReceptacle extends CGFobject {
  constructor(scene, smoothness, slices=10) {
    super(scene);
    this.smoothness = smoothness;
    this.slices = slices;
    this.sphere = new MySphere(this.scene, this.slices, this.smoothness, true);
    this.initBuffers();
  }
  initBuffers() {
    this.vertices = [];
    this.indices = [];  
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
  /**
   * Called when user interacts with GUI to change object's complexity.
   * @param {integer} complexity - changes number of slices
   */

  display() {
    super.display();
    this.sphere.display();
  }
}

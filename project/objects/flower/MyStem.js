import { CGFobject } from "../../../lib/CGF.js";
/**
 * MyPyramid
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
 */
export class MyStem extends CGFobject {
  constructor(scene, height, smoothness, stacks) {
    super(scene);
    this.height = height;
    this.smoothness = smoothness;
    this.stacks = stacks;
    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];

    let alphaang = (2 * Math.PI) / this.smoothness;
    let d = this.height / this.stacks;
    

    for (let j = 0; j <= this.stacks; j++){
      for (let i = 0; i < this.smoothness; i++) {
        let ang = i * alphaang;
        let x = Math.cos(ang);
        let z = Math.sin(ang);

        this.vertices.push(x, d*j, z);

        this.normals.push(x, 0, z);
      }
    }

    for (let i = 0; i < this.smoothness * this.stacks; i++){
        this.indices.push(i + this.smoothness + 1, i+1, i);
        this.indices.push(i , i + this.smoothness, i+ this.smoothness+1);
    }
    this.indices.push(this.smoothness, 0, this.smoothness - 1);
    this.indices.push(this.smoothness * this.stacks + this.smoothness, this.smoothness * this.stacks + this.smoothness - 1, this.smoothness * this.stacks);

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
  /**
   * Called when user interacts with GUI to change object's complexity.
   * @param {integer} complexity - changes number of slices
   */

  display() {
    super.display();
  }
}

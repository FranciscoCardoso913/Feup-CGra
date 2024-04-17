import { CGFobject } from "../../../lib/CGF.js";
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
    this.initBuffers();
  }
  initBuffers() {
    let ang = 0;
    let alphaAng = (2 * Math.PI) / this.smoothness;
    ang += alphaAng;

    this.vertices = [0, 0, 0, 1, 0, 0, Math.cos(ang), 0, Math.sin(ang)];

    this.indices = [0, 1, 2, 2, 1, 0];

    this.normals = [0, 1, 0, 1, 0, 0, Math.cos(ang), 0, Math.sin(ang)];

    for (let i = 2; i < this.smoothness; i++) {
      let sa = Math.sin(i * ang);
      let ca = Math.cos(i * ang);

      this.vertices.push(ca, 0, sa);
      this.indices.push(0, i, i + 1);
      this.indices.push(i + 1, i, 0);
      this.normals.push(ca, 0, sa);
    }

    this.indices.push(0, 1, this.smoothness);
    this.indices.push(this.smoothness, 1, 0);

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

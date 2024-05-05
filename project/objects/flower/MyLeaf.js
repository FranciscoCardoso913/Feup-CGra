import { CGFobject } from "../../../lib/CGF.js";
/**
 * MyPyramid
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 */
export class MyLeaf extends CGFobject {
  constructor(scene, height) {
    super(scene);
    this.height = height;
    this.smoothness = 5;
    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    let alphaang = (2 * Math.PI) / this.smoothness;
    let d = this.height;

    for (let j = 0; j <= 1; j++) {
      for (let i = 0; i < this.smoothness; i++) {
        let ang = i * alphaang;
        let x = Math.cos(ang) * 0.1;
        let z = Math.sin(ang) * 0.1;

        this.vertices.push(x, d * j, z);

        this.texCoords.push(0.5, i / this.smoothness);

        this.normals.push(x, 0, z);
      }
    }

    for (let i = 0; i < this.smoothness -1; i++) {
      this.indices.push(i + this.smoothness + 1, i + 1, i);
      this.indices.push(i, i + this.smoothness, i + this.smoothness + 1);
    }
    this.indices.push(this.smoothness, 0, this.smoothness - 1);
    this.indices.push(this.smoothness + this.smoothness - 1 , this.smoothness, this.smoothness - 1);

    this.vertices.push(0, d, 0);
    this.texCoords.push(0,0);
    for (let i = 0; i < this.smoothness; i++) {
      this.indices.push(this.smoothness + i, this.vertices.length/3 - 1, this.smoothness + i + 1);
    }
    this.indices.push(this.smoothness * 2 - 1, this.vertices.length/3 - 1, this.smoothness);

    this.vertices.push(0,0,0);
    this.vertices.push(0.4*d, 1.5*d, 0);
    this.vertices.push(-0.4*d, 1.5*d, 0);
    this.vertices.push(0,3*d,0);

    this.texCoords.push(0.5,1);
    this.texCoords.push(1, 0.5);
    this.texCoords.push(0, 0.5);
    this.texCoords.push(0,0);
    
    let l = this.vertices.length / 3;
    console.log(l)
    l = l -4;

    this.indices.push(l, l+1, l+2);
    this.indices.push(l+2, l+1, l);
    this.indices.push(l+2, l+1, l+3);
    this.indices.push(l+3, l+1, l+2);
  
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

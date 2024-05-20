import { CGFobject } from "../../../lib/CGF.js";
/**
 * MyPyramid
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 */
export class MyLeaf extends CGFobject {
  constructor(scene, height, texture){
    super(scene);
    this.height = height;
    this.smoothness = 5; // Complexity of the leaf's cylinder that connects to the stem
    this.texture = texture;
    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    // CYLINDER
    // Angle to increment in each iteration
    let alphaang = (2 * Math.PI) / this.smoothness;
    let d = this.height;

    // This creates the vertices for a top or bottom face of the cylinder per iteration, connecting both faces at the end
    for (let j = 0; j <= 1; j++) {
      for (let i = 0; i < this.smoothness; i++) {
        let ang = i * alphaang;
        let x = Math.cos(ang) * 0.1;
        let z = Math.sin(ang) * 0.1;

        this.vertices.push(x, d * j, z);

        // We use texCoords starting at 0.5 to give us a better color of the cylinder
        this.texCoords.push(0.5, i / this.smoothness);

        this.normals.push(x, 0, z);
      }
    }

    // Connecting the sides of the cylinder
    for (let i = 0; i < this.smoothness -1; i++) {
      this.indices.push(i + this.smoothness + 1, i + 1, i);
      this.indices.push(i, i + this.smoothness, i + this.smoothness + 1);
    }
    // Closing the cylinder (by drawing some final triangles in the sides)
    this.indices.push(this.smoothness, 0, this.smoothness - 1);
    this.indices.push(this.smoothness + this.smoothness - 1 , this.smoothness, this.smoothness - 1);

    // Draw the top face of the cylinder (face that will connect to the leaf)
    this.vertices.push(0, d, 0);
    this.texCoords.push(0,0);
    for (let i = 0; i < this.smoothness; i++) {
      this.indices.push(this.smoothness + i, this.vertices.length/3 - 1, this.smoothness + i + 1);
    }
    this.indices.push(this.smoothness * 2 - 1, this.vertices.length/3 - 1, this.smoothness);

    // LEAF
    // All multiplications by integer literals are just to acheive a certain desired shape
    // Follows same logic as leaves, two triangles forming a leaf
    this.vertices.push(0,0,0);
    this.vertices.push(0.4*d, 1.5*d, 0);
    this.vertices.push(-0.4*d, 1.5*d, 0);
    this.vertices.push(0,3*d,0);

    this.texCoords.push(0.5,1);
    this.texCoords.push(1, 0.5);
    this.texCoords.push(0, 0.5);
    this.texCoords.push(0,0);
    
    let l = this.vertices.length / 3;
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

  // Display the leaf
  display() {
    this.scene.appearance.setTexture(this.texture);
    this.scene.appearance.setTextureWrap("REPEAT", "REPEAT");
    this.scene.appearance.setColor(0.4, 1, 0, 1);
    this.scene.appearance.apply();
    super.display();
  }
}

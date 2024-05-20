import { CGFobject, CGFappearance, CGFtexture } from "../../../lib/CGF.js";
import { MyLeaf } from "./MyLeaf.js";
/**
 * MyPyramid
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
 */
export class MyStem extends CGFobject {
  constructor(scene, height, smoothness, stacks, radius, leaf_texture) {
    super(scene);
    this.height = height;
    this.smoothness = smoothness;
    this.stacks = stacks;
    this.radius = radius;

    // Sets the leaf size appropriate to the stem's proportions
    this.leaf_scale_factor = ((this.height * 1.0 / 2.0) * 0.8) / this.height;

    // This array will store the points where the leaves will be placed
    this.connection_points = [];

    // This array will store the angles of rotation for each leaf around the stem
    this.leaf_angles = [];

    this.leaf = new MyLeaf(scene, 1, leaf_texture);
    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    let alphaang = (2 * Math.PI) / this.smoothness;
    let d = this.height / this.stacks;

    // Used to alternate the texture coordinates between the bottom or the top of the texture
    let texCoordVertical = false;

    for (let j = 0; j <= this.stacks; j++){
      // Generates random angles for the stem, except for the top, making sure it lines up with the center of the receptacle
      let random_angle_x = j != this.stacks ? Math.random() * (Math.PI / 2) : Math.PI / 2;
      let random_angle_z = j != this.stacks ? Math.random() * (Math.PI / 2) : 0;

      // Used to get the center point of the stem at each connection point
      let max_x = -1000;
      let min_x = 1000;
      let max_z = -1000;
      let min_z = 1000;

      for (let i = 0; i < this.smoothness; i++) {
        let ang = i * alphaang;
        let x = Math.cos(ang) + Math.cos(random_angle_x);
        let z = Math.sin(ang) + Math.sin(random_angle_z);


        max_x = Math.max(max_x, x);
        min_x = Math.min(min_x, x);
        max_z = Math.max(max_z, z);
        min_z = Math.min(min_z, z);

        this.vertices.push(x, d*j, z);

        // Uses ang/2 in order to make the texture continuity around the stem look perfect
        // For half of the cylinder, it goes from 0 to 1, and for the other half, it goes from 1 to 0
        // texCoordVertical is used to alternate between the top and the bottom of the texture
        this.texCoords.push(Math.sin(ang / 2), texCoordVertical ? 0 : 1);
        
        this.normals.push(x, 0, z);
      }
      // Middle point of the stem
      let middle_x = max_x - min_x;
      let middle_z = max_z - min_z; 

      // Switches for next iteration
      texCoordVertical = !texCoordVertical;

     // Adds the connection points for the leaves, except for the top and bottom of the stem 
      if (j != 0 && j != this.stacks) this.connection_points.push(middle_x,j * d,middle_z);
    }

    // Generates the indices for the stem
    for (let i = 0; i < this.smoothness * this.stacks - 1; i++){
        this.indices.push(i + this.smoothness + 1, i+1, i);
        this.indices.push(i , i + this.smoothness, i+ this.smoothness+1);
    }

    // Adds missing triangles' indices
    this.indices.push(this.smoothness, 0, this.smoothness - 1);
    this.indices.push(this.smoothness * this.stacks - 1, this.smoothness * (this.stacks + 1) - 1, this.smoothness * this.stacks);
    
    // Generates random angles for the leaves
    for (let i = 0; i < this.connection_points.length; i++){
      this.leaf_angles.push(Math.random() * Math.PI * 2);
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    console.log(this.connection_points);
    this.initGLBuffers();
  }
  /**
   * Called when user interacts with GUI to change object's complexity.
   * @param {integer} complexity - changes number of slices
   */

  display() {
    super.display();
    this.scene.popMatrix();    

    for (let i = 0; i+2 < this.connection_points.length; i+=3){
      this.scene.pushMatrix();
      // Translates the leaf into the correct position
      // Knowing the bottom of the leaf's cylinder is at 0,0,0
      this.scene.translate(this.connection_points[i] * this.leaf_scale_factor * this.radius, -(this.height-this.connection_points[i+1]), this.connection_points[i+2] * this.leaf_scale_factor * this.radius);

      // Rotates the leaf to the correct position around the stem
      this.scene.rotate(this.leaf_angles[i], 0, 1, 0);

      // Rotates the leaf to make it angle out of the stem
      this.scene.rotate(Math.PI/7, 0, 0, 1);

      // Scales the leaf to meet the stem's proportions
      this.scene.scale(this.leaf_scale_factor, this.leaf_scale_factor, this.leaf_scale_factor);

      this.leaf.display();
      this.scene.popMatrix();
    }

    this.scene.pushMatrix();
  }
}

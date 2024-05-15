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
  constructor(scene, height, smoothness, stacks, radius) {
    super(scene);
    this.height = height;
    this.smoothness = smoothness;
    this.stacks = stacks;
    this.radius = radius;
    this.leaf_scale_factor = ((this.height * 1.0 / 2.0) * 0.8) / this.height;
    this.connection_points = [];
    this.leaf_angles = [];
    this.leaf = new MyLeaf(scene, 1);
    this.leaf_material = new CGFappearance(this.scene);
    this.leaf_texture = new CGFtexture(this.scene, "images/leaf.jpg");
    this.leaf_material.setColor(0.4, 1, 0, 1);
    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    let alphaang = (2 * Math.PI) / this.smoothness;
    let d = this.height / this.stacks;
    let texCoordVertical = false;

    for (let j = 0; j <= this.stacks; j++){
      let random_angle_x = j != this.stacks ? Math.random() * (Math.PI / 2) : 0;
      let random_angle_z = j != this.stacks ? Math.random() * (Math.PI / 2) : 0;
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

        this.texCoords.push(Math.sin(ang / 2), texCoordVertical ? 0 : 1);
        
        this.normals.push(x, 0, z);
      }
      let middle_x = max_x - min_x;
      let middle_z = max_z - min_z; 

      texCoordVertical = !texCoordVertical;

       if (j != 0 && j != this.stacks) this.connection_points.push(middle_x,j * d,middle_z);
    }

    for (let i = 0; i < this.smoothness * this.stacks - 1; i++){
        this.indices.push(i + this.smoothness + 1, i+1, i);
        this.indices.push(i , i + this.smoothness, i+ this.smoothness+1);
    }

    this.indices.push(this.smoothness, 0, this.smoothness - 1);
    this.indices.push(this.smoothness * this.stacks - 1, this.smoothness * (this.stacks + 1) - 1, this.smoothness * this.stacks);
    
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
      this.scene.translate(this.connection_points[i] * this.leaf_scale_factor * this.radius, -(this.height-this.connection_points[i+1]), this.connection_points[i+2] * this.leaf_scale_factor * this.radius);
      this.scene.rotate(this.leaf_angles[i], 0, 1, 0);
      this.scene.rotate(Math.PI/7, 0, 0, 1);
      this.scene.scale(this.leaf_scale_factor, this.leaf_scale_factor, this.leaf_scale_factor);
      
      this.leaf_material.setTexture(this.leaf_texture);
      this.leaf_material.setTextureWrap("REPEAT", "REPEAT");
      this.leaf_material.apply();

      this.leaf.display();
      this.scene.popMatrix();
    }

    this.scene.pushMatrix();
  }
}

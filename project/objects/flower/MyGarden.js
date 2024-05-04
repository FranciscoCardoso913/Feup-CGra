import { CGFobject } from "../../../lib/CGF.js";
import { MyFlower } from "./MyFlower.js";

export class MyGarden extends CGFobject {
  constructor(scene, cols, rows) {
    super(scene);
    this.cols = cols;
    this.rows = rows;
    this.garden = [];
    this.generateGarden();
  }

  generateGarden(){
    for (let i = 0; i < this.cols; i++) {
      let toAppend = [];
      for (let j = 0; j < this.rows; j++) {
       let flower = new MyFlower(
          this.scene,
          0,
          0,
          Math.floor(Math.random() * 3) + 5,
          Math.random() * 0.1 + 0.12,
          Math.floor(Math.random() * 5) + 4,
          Math.floor(Math.random() * 5) + 5,
          [0, 255, 0, 255],
          [255, 0, 0, 255],
          0.05,
          -0.1
        );
        toAppend.push(flower);
      }
      console.log(toAppend);
      this.garden.push(toAppend);
    }

  }

  /**
   * Called when user interacts with GUI to change object's complexity.
   * @param {integer} complexity - changes number of slices
   */

  display() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.scene.pushMatrix();
        this.scene.translate(i*6 - (this.cols * 6) / 2, 0, j*6 - (this.cols * 6) / 2);
        this.garden[i][j].display();
        this.scene.popMatrix();
      }
    }
  }
}

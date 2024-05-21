import { CGFobject } from "../../../lib/CGF.js";
import { MyFlower } from "./MyFlower.js";

export class MyGarden extends CGFobject {
  constructor(
    scene,
    cols,
    rows,
    petal_textures,
    receptacle_textures,
    stem_textures,
    leaf_textures,
    pollen_texture
  ) {
    super(scene);
    this.cols = cols;
    this.rows = rows;
    this.garden = [];
    this.petal_textures = petal_textures;
    this.receptacle_textures = receptacle_textures;
    this.stem_textures = stem_textures;
    this.leaf_textures = leaf_textures;
    this.pollen_texture = pollen_texture;
    this.pollen_coords = [];
    this.single_run = true;
    this.generateGarden();
  }

  // Generate a matrix of flowers with certain randomness
  generateGarden() {
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
          -0.1,
          this.petal_textures,
          this.receptacle_textures,
          this.stem_textures,
          this.leaf_textures,
          this.pollen_texture
        );
        toAppend.push(flower);
      }
      this.garden.push(toAppend);
    }
  }

  /**
   * Called when user interacts with GUI to change object's complexity.
   * @param {integer} complexity - changes number of slices
   */

  // Display the garden
  display() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.scene.pushMatrix();
        this.scene.translate(
          i * 6 - (this.cols * 6) / 2,
          0,
          j * 6 - (this.cols * 6) / 2
        );
        // Only add the pollen_coords if it's the first run
        if (this.single_run)
          this.pollen_coords.push([
            i * 6 - (this.cols * 6) / 2,
            0.4,
            j * 6 - (this.cols * 6) / 2,
            i,
            j,
          ]);

        this.garden[i][j].display();
        this.scene.popMatrix();
      }
    }
    this.single_run = false;
  }
}

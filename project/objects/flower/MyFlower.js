import { CGFappearance, CGFobject, CGFtexture } from "../../../lib/CGF.js";
import { MyPollen } from "../MyPollen.js";
import { MyPetal } from "./MyPetal.js";
import { MyReceptacle } from "./MyReceptacle.js";
import { MyStem } from "./MyStem.js";
/**
 * MyQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFlower extends CGFobject {
  constructor(
    scene,
    outer_radius,
    inner_radius,
    n_petals,
    stem_radius,
    stem_height,
    stem_stacks,
    stem_color,
    petal_color,
    petal_angle_min,
    petal_angle_max,
    textures
  ) {
    super(scene);
    this.outer_radius = outer_radius;

    // random between 1.5 and 3.5 inclusive
    if (this.outer_radius == 0) this.outer_radius = Math.random() * 2 + 1.5;

    this.inner_radius = inner_radius;

    // If inner_radius is not defined, it will be 1/5 of the outer_radius
    if (this.inner_radius == 0)
      this.inner_radius = (this.outer_radius * 1.0) / 5;

    this.textures = textures;
    this.n_petals = n_petals;
    this.stem_radius = stem_radius;
    this.stem_height = stem_height;
    this.stem_stacks = stem_stacks;
    this.stem_color = stem_color;
    this.petal_color = petal_color;
    this.petal_angle_min = petal_angle_min;
    this.petal_angle_max = petal_angle_max;

    // This creates a predefined random angle of rotation for each petal between petal_angle_min and petal_angle_max
    this.random_petal_rotations = new Array(this.n_petals);
    for (let i = 0; i < this.n_petals; i++)
      this.random_petal_rotations[i] =
        Math.random() * (this.petal_angle_max - this.petal_angle_min) +
        this.petal_angle_min;

    // This creates a random angle for the pollen
    this.pollen_angle = Math.random() * Math.PI;

    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [];
    this.indices = [];

    this.petal = new MyPetal(this.scene, 10);
    this.receptacle = new MyReceptacle(this.scene, 100);
    this.stem = new MyStem(
      this.scene,
      this.stem_height,
      30,
      this.stem_stacks,
      this.stem_radius, 
      this.textures[4]
    );
    this.pollen = new MyPollen(this.scene, this.textures[3]);
    //The defined indices (and corresponding vertices)
    //will be read in groups of three to draw triangles
    this.primitiveType = this.scene.gl.TRIANGLES;

    this.initGLBuffers();
  }

  draw_petals() {
    // Divide the circle into n_petals parts to get each individual angle
    const angle = (2 * Math.PI) / this.n_petals;

    for (let i = 0; i < this.n_petals; i++) {
      this.scene.pushMatrix();

      // Rotate the petal to the correct position
      this.scene.rotate(i * angle, 0, 1, 0);
      this.scene.rotate(this.random_petal_rotations[i], 0, 0, 1);

      // Translate the petal to the correct position
      this.scene.translate(this.inner_radius, 0, 0);

      // Scale the petal to meet the outer radius
      let outerScaleFactor = (this.outer_radius - this.inner_radius) / 2;
      this.scene.scale(outerScaleFactor, 1, outerScaleFactor / 1.4);

      this.scene.appearance.setTexture(this.textures[1]);
      this.scene.appearance.setTextureWrap("REPEAT", "REPEAT");
      this.scene.appearance.setColor(
        this.petal_color[0] / 255,
        this.petal_color[1] / 255,
        this.petal_color[2] / 255,
        this.petal_color[3] / 255
      );
      this.scene.appearance.apply();
      this.petal.display();
      this.scene.popMatrix();
    }
  }

  draw_receptacle() {
    this.scene.pushMatrix();

    // Scale to meet the inner radius
    this.scene.scale(this.inner_radius, 0.4, this.inner_radius);

    // Rotate into correct position
    this.scene.rotate(Math.PI / 2, 0, 0, 1);

    this.scene.appearance.setTexture(this.textures[2]);
    this.scene.appearance.setColor(1, 1, 1, 1);
    this.scene.appearance.setTextureWrap("REPEAT", "REPEAT");
    this.scene.appearance.apply();
    this.receptacle.display();

    // Rotate to draw the bottom half of the receptacle
    this.scene.rotate(-Math.PI, 0, 0, 1);
    // Flatten it
    this.scene.scale(0.5, 1, 1);

    this.receptacle.display();
    this.scene.popMatrix();
  }

  draw_pollen() {
    this.scene.pushMatrix();

    // Translate to the top of the receptacle
    this.scene.translate(0, 0.4, 0);
    // Rotate to the random angle
    this.scene.rotate(this.pollen_angle, 0, 1, 0);
    // Check it isn't null before displaying (eg. if the bee has taken the pollen)
    if (this.pollen != null) this.pollen.display();
    this.scene.popMatrix();
  }

  draw_stem() {
    this.scene.pushMatrix();

    // Translate to meet at the bottom of the receptacle
    this.scene.translate(0, -this.stem_height - 0.16, 0);
    // Scale to meet the stem radius
    this.scene.scale(this.stem_radius, 1, this.stem_radius);

    this.scene.appearance.setTexture(this.textures[0]);
    this.scene.appearance.setColor(
      this.stem_color[0] / 255,
      this.stem_color[1] / 255,
      this.stem_color[2] / 255,
      this.stem_color[3] / 255
    );
    this.scene.appearance.setTextureWrap("MIRROR", "MIRROR");
    this.scene.appearance.apply();

    this.stem.display();
    this.scene.popMatrix();
  }

  // Displays the flower by drawing all its components
  display() {
    this.draw_petals();
    this.draw_receptacle();
    this.draw_pollen();
    this.draw_stem();
  }
}

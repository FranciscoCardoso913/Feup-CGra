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
    petal_angle_max
  ) {
    super(scene);
    this.outer_radius = outer_radius;

    // random between 1.5 and 3.5 inclusive
    if (this.outer_radius == 0) this.outer_radius = Math.random() * 2 + 1.5;

    this.inner_radius = inner_radius;

    if (this.inner_radius == 0)
      this.inner_radius = (this.outer_radius * 1.0) / 5;

    this.n_petals = n_petals;
    this.stem_radius = stem_radius;
    this.stem_height = stem_height;
    this.stem_stacks = stem_stacks;
    this.stem_color = stem_color;
    this.petal_color = petal_color;
    this.petal_angle_min = petal_angle_min;
    this.petal_angle_max = petal_angle_max;

    this.stem_material = new CGFappearance(this.scene);
    this.stem_texture = new CGFtexture(this.scene, "images/stem.jpg");
    this.stem_material.setColor(
      stem_color[0] / 255,
      stem_color[1] / 255,
      stem_color[2] / 255,
      stem_color[3] / 255
    );

    this.petal_material = new CGFappearance(this.scene);
    this.petal_texture = new CGFtexture(this.scene, "images/petal.jpg");
    this.petal_material.setColor(
      petal_color[0] / 255,
      petal_color[1] / 255,
      petal_color[2] / 255,
      petal_color[3] / 255
    );

    this.receptacle_material = new CGFappearance(this.scene);
    this.receptacle_texture = new CGFtexture(this.scene, "images/receptacle.png");
    this.receptacle_material.setColor(1, 1, 1, 1);

    this.random_petal_rotations = new Array(this.n_petals);
    for (let i = 0; i < this.n_petals; i++)
      this.random_petal_rotations[i] =
        Math.random() * (this.petal_angle_max - this.petal_angle_min) +
        this.petal_angle_min;

    this.pollen_angle = Math.random() * Math.PI;

    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [];
    this.indices = [];

    this.petal = new MyPetal(this.scene, 10);
    this.receptacle = new MyReceptacle(this.scene, 100);
    this.stem = new MyStem(this.scene, this.stem_height, 30, this.stem_stacks, this.stem_radius);
    this.pollen = new MyPollen(this.scene);
    //The defined indices (and corresponding vertices)
    //will be read in groups of three to draw triangles
    this.primitiveType = this.scene.gl.TRIANGLES;

    this.initGLBuffers();
  }

  draw_petals() {
    // PETALS
    const angle = (2 * Math.PI) / this.n_petals;

    for (let i = 0; i < this.n_petals; i++) {
      this.scene.pushMatrix();

      this.scene.rotate(i * angle, 0, 1, 0);
      this.scene.rotate(this.random_petal_rotations[i], 0, 0, 1);
      this.scene.translate(this.inner_radius, 0, 0);

      let outerScaleFactor = (this.outer_radius - this.inner_radius) / 2;
      this.scene.scale(outerScaleFactor, 1, outerScaleFactor / 1.4);

      this.petal_material.setTexture(this.petal_texture);
      this.petal_material.setTextureWrap("REPEAT", "REPEAT");
      this.petal_material.apply();
      this.petal.display();
      this.scene.popMatrix();
    }
  }

  draw_receptacle() {
    // RECEPTACLE
    this.scene.pushMatrix();

    this.scene.scale(this.inner_radius, 0.4, this.inner_radius);
    this.scene.rotate(Math.PI / 2, 0, 0, 1);

    this.receptacle_material.setTexture(this.receptacle_texture);
    this.receptacle_material.setTextureWrap("REPEAT", "REPEAT");
    this.receptacle_material.apply();
    this.receptacle.display();

    this.scene.rotate(-Math.PI, 0, 0, 1);
    this.scene.scale(0.5, 1, 1);

    this.receptacle_material.apply();
    this.receptacle.display();
    this.scene.popMatrix();
  }

  draw_pollen(){
    this.scene.pushMatrix();
    this.scene.translate(0, 0.4, 0);
    this.scene.rotate(this.pollen_angle, 0, 1, 0);
    this.pollen.display();
    this.scene.popMatrix();
  }

  draw_stem() {
    //STEM
    this.scene.pushMatrix();

    this.scene.translate(0, -this.stem_height, 0);
    this.scene.scale(this.stem_radius, 1, this.stem_radius);

    this.stem_material.setTexture(this.stem_texture);
    this.stem_material.setTextureWrap("MIRROR", "MIRROR");
    this.stem_material.apply();

    this.stem.display();
    this.scene.popMatrix();
  }

  //2.5 outer radius, n_petals, 0.5 inner radius, 0.2 cylinder radius, 1 cylinder, 1 cylinder height, default color
  display() {
    this.draw_petals();
    this.draw_receptacle();
    this.draw_pollen();
    this.draw_stem();
  }
}

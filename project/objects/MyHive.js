import { CGFappearance, CGFobject, CGFtexture } from "../../lib/CGF.js";
import { MySphere } from "./MySphere.js";

export class MyHive extends CGFobject {
  constructor(scene) {
    super(scene);
    this.scene = scene;
    this.sphere = new MySphere(scene, 10, 10, true, false);
    this.pollens = [];
    this.ang = Math.PI / 8;

    this.initBuffers();
  }
  initBuffers() {
    this.texture = new CGFtexture(this.scene, "images/hive.jpg");
    this.appearance = new CGFappearance(this.scene);
    this.appearance.setAmbient(0.5, 0.5, 0.5, 1);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap("REPEAT", "REPEAT");

    // This is the black material for the hole
    this.hole = new CGFappearance(this.scene);
    this.hole.setAmbient(0, 0, 0, 1);
    this.hole.setDiffuse(0, 0, 0, 1);
    this.hole.setSpecular(0, 0, 0, 1);
  }

  display() {
    // Setting the hive in the correct position
    this.scene.pushMatrix();
    this.scene.translate(0, -1, 12);
    this.scene.scale(2, 2, 2);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);

    // Displaying the top part of the hive with the texture
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI / 4, 0, 1, 0);
    this.scene.rotate(Math.PI / 2, 0, 0, 1);
    this.scene.scale(1.5, 1.0, 1.0);
    this.appearance.apply();
    this.sphere.display();

    // Displaying the bottom part of the hive with the texture
    this.scene.rotate((-5 * Math.PI) / 4, 1, 0, 0);
    this.scene.rotate(Math.PI, 0, 0, 1);
    this.scene.scale(0.2, 1.0, 1.0);
    this.sphere.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    // Displaying the hole of the hive
    this.scene.translate(0.965, 0.03, 0);
    this.scene.rotate(0.1, 0, 0, 1);
    this.scene.rotate(Math.PI / 2, 0, 0, 1);
    this.scene.scale(0.7, 0.05, 0.4);

    this.hole.apply();
    this.sphere.display();
    this.scene.popMatrix();


    for (let i = 0; i < this.pollens.length; i++) {
      if (i > 4) break;
      this.scene.pushMatrix();
      this.scene.rotate(Math.PI / 7 - (i - 1) * Math.PI / 7,0,1,0);
      this.scene.translate(1.25,0.2,0);
      this.scene.scale(1.5,1.5,1.5);
      this.pollens[i].display();
      this.scene.popMatrix();
    }

    this.scene.popMatrix();
  }
}

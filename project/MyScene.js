import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MyGarden } from "./objects/flower/MyGarden.js";
import { MyPanorama } from "./objects/MyPanorama.js";
import { MySphere } from "./objects/MySphere.js";
import { MyBee } from "./objects/bee/MyBee.js";
import { MyGrass } from "./objects/garden/MyGrass.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);

    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.setUpdatePeriod(50); // **at least** 50 ms between animations

    this.appStartTime = Date.now(); // current time in milisecs

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this, 30);
    this.garden = new MyGarden(this, 7, 7);
    this.sphere = new MySphere(this, 30, 60, true);
    this.grass = new MyGrass(this, 40);

    this.speedFactor= 0.1;
    this.beeScaleFactor = 1;
    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;

    this.enableTextures(true);

    this.texture = new CGFtexture(this, "images/panorama4.jpg");
    this.beeHead = new CGFtexture(this, "images/head_fur.jpg");
    this.beeBody = new CGFtexture(this, "images/bee_fur.jpg");
    this.beeEye = new CGFtexture(this, "images/bee_eyes.jpg");
    this.beeAntenna = new CGFtexture(this, "images/fur.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');
    this.beeWing = new CGFappearance(this);
    this.beeWing.setAmbient(0.4, 0.4, 0.4, 0.4);
    this.beeWing.setDiffuse(0.6, 0.6, 0.6, 0.5);
    this.beeWing.setSpecular(0, 0, 0, 0);
    this.beeWing.setEmission(0, 0, 0, 0);
    this.panorama = new MyPanorama(this, this.texture);
    this.fov = 1.8;

    this.bee = new MyBee(this, [this.beeHead, this.beeBody, this.beeEye, this.beeAntenna, this.beeWing]);

    this.gl.depthFunc(this.gl.LEQUAL);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    this.gl.enable(this.gl.BLEND);


  }
  initLights() {
    this.lights[0].setPosition(15, 5, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].setAmbient(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      1.8,
      0.1,
      1000,
      vec3.fromValues(50, 10, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  updateFov() {
    this.camera.fov = this.fov;
  }
  setDefaultAppearance() {
    this.appearance.setTexture()
    this.appearance.apply()
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);

  }

  update(t) {
    this.checkKeys()
    //#region Ex.2 
    // Continuous animation based on current time and app start time 
    var timeSinceAppStart = (t - this.appStartTime) / 1000.0;

    this.yBee = 3 + Math.sin(timeSinceAppStart * Math.PI * 2);
    this.bee.update(timeSinceAppStart);
  }
  checkKeys() {

    if (this.gui.isKeyPressed("KeyW")) {

      this.bee.accelerate(100*this.speedFactor)

    }

    if (this.gui.isKeyPressed("KeyS")) {

      this.bee.accelerate(-60)

    }

    if (this.gui.isKeyPressed("KeyA")) {

      this.bee.turn(Math.PI/16)

    }

    if (this.gui.isKeyPressed("KeyD")) {

      this.bee.turn(-Math.PI/16)

    }

    if (this.gui.isKeyPressed("KeyR")) {

      this.bee.reset()

    }

  }

  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();
    this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
    // Draw axis
    if (this.displayAxis) this.axis.display();

    // ---- BEGIN Primitive drawing section
  
    this.pushMatrix()
    this.scale(1,2,0.1)
    this.translate(1,2,0.1)
    this.grass.display()
    this.popMatrix()
    
    // this.scale(2,2,2);
    this.panorama.display()
    this.setDefaultAppearance()

 
    this.pushMatrix();
    this.translate(0, this.yBee, 0);
    //this.bee.scaleBee(this.beeScaleFactor);
    this.bee.display();
    this.popMatrix();
    

    



    /*
    this.pushMatrix();
    this.appearance.apply();
    this.translate(0,-100,0);
    this.scale(400,400,400);
    this.rotate(-Math.PI/2.0,1,0,0);
    this.plane.display();
    this.popMatrix();
    */

    //GARDEN
    //this.garden.display();

    //this.sphere.enableNormalViz()
    // ---- END Primitive drawing section
  }
}

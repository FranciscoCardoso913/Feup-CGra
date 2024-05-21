import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MyGarden } from "./objects/flower/MyGarden.js";
import { MyPanorama } from "./objects/MyPanorama.js";
import { MySphere } from "./objects/MySphere.js";
import { MyFlower } from "./objects/flower/MyFlower.js";
import { MyRock } from "./objects/rock/MyRock.js";
import { MyRockPiramid } from "./objects/rock/MyRockPiramid.js";
import { MyRockSet } from "./objects/rock/MyRockSet.js";
import { MyBee } from "./objects/bee/MyBee.js";
import { GrassGarden } from "./objects/garden/GrassGarden.js";

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

    this.panorameTexture = new CGFtexture(this, "images/panorama4.jpg");
    this.groundTexture = new CGFtexture(this, "images/terrain.jpg");
    this.rockTexture =  new CGFtexture(this, "images/rock.jpg");

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this,100,0,10,0,10);
    //this.flower = new MyFlower(this);
    this.rock = new MyRock(this, this.rockTexture);
    this.sphere = new MySphere(this, 10, 10);
    this.panorama = new MyPanorama(this, this.panorameTexture);
    this.rockSet = new MyRockSet(this,this.rockTexture,[-10,0],[60,-100],40);
    this.rockPiramid= new MyRockPiramid(this, 5, this.rockTexture, [25,-50])
    //this.garden = new MyGarden(this, 7, 7);
   

    this.speedFactor= 0.1;
    this.beeScaleFactor = 1;
    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;

    this.enableTextures(true);

    this.texture = new CGFtexture(this, "images/panorama4.jpg");
    this.planeTexture = new CGFtexture(this, "images/grass.jpg");
    this.beeHead = new CGFtexture(this, "images/head_fur.jpg");
    this.beeBody = new CGFtexture(this, "images/bee_fur.jpg");
    this.beeEye = new CGFtexture(this, "images/bee_eyes.jpg");
    this.beeAntenna = new CGFtexture(this, "images/fur.jpg");
    this.grassTexture = new CGFtexture(this, "images/grass.jpg");
    this.cloudsTexture = new CGFtexture(this, "images/clouds_map.jpg")
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.groundTexture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');
    this.beeWing = new CGFappearance(this);
    this.beeWing.setAmbient(0.4, 0.4, 0.4, 0.1);
    this.beeWing.setDiffuse(0.6, 0.6, 0.6, 0.1);
    this.beeWing.setSpecular(0, 0, 0, 0);
    this.beeWing.setEmission(0, 0, 0, 0);
    this.grassShader = new CGFshader(this.gl, "shaders/grass.vert", "shaders/grass.frag");
    this.cloudShader = new CGFshader(this.gl, "shaders/clouds.vert", "shaders/clouds.frag");
    this.cloudShader.setUniformsValues({ uSampler2: 1, timeFactor: 0 });

    
    this.panorama = new MyPanorama(this, this.texture);
    this.fov = 1.8;

    this.garden = new GrassGarden(this, 0,0, this.grassTexture, 3);
    this.bee = new MyBee(this, [this.beeHead, this.beeBody, this.beeEye, this.beeAntenna, this.beeWing]);

    this.gl.depthFunc(this.gl.LEQUAL);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    this.gl.enable(this.gl.BLEND);


  }
  initLights() {
    // Light 0
    
    this.lights[0].setPosition(15, 100, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].setAmbient(0.5, 0.5, 0.5, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  
    // Light 1
    this.lights[1].setPosition(-15, 100, 5, 1);
    this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[1].setAmbient(0.5, 0.5, 0.5, 1.0);
    this.lights[1].enable();
    this.lights[1].update();
  
    // Light 2
    this.lights[2].setPosition(0, 100, -15, 1);
    this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[2].setAmbient(0.5, 0.5, 0.5, 1.0);
    this.lights[2].enable();
    this.lights[2].update();
  
    // Add more lights if needed
    // Ensure the array this.lights has been correctly sized and initialized
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
    this.setAmbient(1.0, 1.0, 1.0, 1.0);
    this.setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.setSpecular(1.0, 1.0, 1.0, 1.0);
    this.setShininess(10.0);

  }

  update(t) {
    this.checkKeys()
    //#region Ex.2 
    // Continuous animation based on current time and app start time 
    var timeSinceAppStart = (t - this.appStartTime) / 1000.0;

    this.yBee = 3 + Math.sin(timeSinceAppStart * Math.PI * 2);
    this.bee.update(timeSinceAppStart);
    this.grassShader.setUniformsValues({ uTime: Math.PI/3*(Date.now()-this.garden.time)/1000.0})
    this.cloudShader.setUniformsValues({ uSampler2: 1, timeFactor: timeSinceAppStart });
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
  
 
    this.appearance.setTexture(this.planeTexture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');
    this.appearance.apply()
    this.pushMatrix();
    this.appearance.apply();
    this.translate(0,-10,0);
    this.scale(400,400,400);
    this.rotate(-Math.PI/2.0,1,0,0);
    this.plane.display();
    this.popMatrix();
    this.pushMatrix()
    this.translate(0,-10,0);
    this.rockSet.display()
    this.rockPiramid.display()
    this.popMatrix()
    this.cloudsTexture.bind(1)
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');
    this.appearance.apply();
    this.setActiveShader(this.cloudShader);
    this.panorama.display();
    this.setDefaultAppearance();
    this.pushMatrix();
    this.translate(0,-10,0);
    this.setActiveShader(this.grassShader);
    this.garden.display();
    this.setActiveShader(this.defaultShader);
    this.popMatrix();
 
    this.pushMatrix();
    this.translate(0, this.yBee, 0);
    this.bee.display();
    this.popMatrix();

    //this.plane.enableNormalViz()
    

    


    

    //GARDEN
    //this.garden.display();

    //this.sphere.enableNormalViz()
    // ---- END Primitive drawing section
  }
}

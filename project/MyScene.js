import {
  CGFscene,
  CGFcamera,
  CGFaxis,
  CGFappearance,
  CGFshader,
  CGFtexture,
} from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MyGarden } from "./objects/flower/MyGarden.js";
import { MyPanorama } from "./objects/MyPanorama.js";
import { MyHive } from "./objects/MyHive.js";
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
    this.enableTextures(true);
    
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    
    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    this.gl.enable(this.gl.BLEND);
    
    // TEXTURES ////////////////////////////////////////////////////////////////
    this.stem_texture_1 = new CGFtexture(this, "images/stem.jpg");
    this.stem_texture_2 = new CGFtexture(this, "images/stem2.png");
    this.petal_texture_1 = new CGFtexture(this, "images/petal.jpg");
    this.petal_texture_2 = new CGFtexture(this, "images/petal2.png");
    this.receptacle_texture_1 = new CGFtexture(this, "images/receptacle.png");
    this.receptacle_texture_2 = new CGFtexture(this, "images/receptacle2.png");
    this.pollen_texture = new CGFtexture(this, "images/pollen.jpg");
    this.leaf_texture_1 = new CGFtexture(this, "images/leaf.jpg");
    this.leaf_texture_2 = new CGFtexture(this, "images/leaf2.png");

    this.hive_texture = new CGFtexture(this, "images/hive.jpg");

    this.texture = new CGFtexture(this, "images/panorama.jpg");

    this.planeTexture = new CGFtexture(this, "images/plane.png");

    this.beeHead = new CGFtexture(this, "images/head_fur.jpg");
    this.beeBody = new CGFtexture(this, "images/bee_fur.jpg");
    this.beeEye = new CGFtexture(this, "images/bee_eyes.jpg");
    this.beeAntenna = new CGFtexture(this, "images/fur.jpg");
    this.beeWing = new CGFappearance(this);
    this.beeWing.setAmbient(0.4, 0.4, 0.4, 0.1);
    this.beeWing.setDiffuse(0.6, 0.6, 0.6, 0.1);
    this.beeWing.setSpecular(0, 0, 0, 0);
    this.beeWing.setEmission(0, 0, 0, 0);

    this.grassTexture = new CGFtexture(this, "images/grass.png");

    this.cloudsTexture = new CGFtexture(this, "images/clouds_map.jpg")

    this.groundTexture = new CGFtexture(this, "images/terrain.jpg");
    
    this.rockTexture =  new CGFtexture(this, "images/rock.jpg");
    
    this.worldTexture = new CGFtexture(this, "images/earth.jpg")
    
    this.appearance = new CGFappearance(this);
    ////////////////////////////////////////////////////////////////////////////
    
    // SHADERS /////////////////////////////////////////////////////////////////
    this.grassShader = new CGFshader(this.gl, "shaders/grass.vert", "shaders/grass.frag");
    this.cloudShader = new CGFshader(this.gl, "shaders/clouds.vert", "shaders/clouds.frag");
    this.cloudShader.setUniformsValues({ uSampler2: 1, timeFactor: 0 });
    ////////////////////////////////////////////////////////////////////////////

    // OBJECTS ///////////////////////////////////////////////////////////////// 
    this.axis = new CGFaxis(this);
    this.hive = new MyHive(this);
    this.plane = new MyPlane(this,100,0,10,0,10);
    this.panorama = new MyPanorama(this, this.panorameTexture);
    this.rockSet = new MyRockSet(this,this.rockTexture,[-43,0],[60,-100],40);
    this.rockPiramid= new MyRockPiramid(this, 5, this.rockTexture, [-8,-50])
    this.garden = new MyGarden(
      this,
      4,
      4,
      10,
      30,
      [this.petal_texture_1, this.petal_texture_2],
      [this.receptacle_texture_1, this.receptacle_texture_2],
      [this.stem_texture_1, this.stem_texture_2],
      [this.leaf_texture_1, this.leaf_texture_2],
      this.pollen_texture
    );
    this.panorama = new MyPanorama(this, this.texture);
    this.bee = new MyBee(
      this,
      [this.beeHead, this.beeBody, this.beeEye, this.beeAntenna, this.beeWing],
      this.garden.pollen_coords,
      [-0.5,-4,-40.7]
    );
    this.grassGarden = new GrassGarden(this, -31,0, this.grassTexture, 10);
    ////////////////////////////////////////////////////////////////////////////
    
    // OBJECT USED VARIABLES ////////////////////////////////////////////////// 
    this.speedFactor = 1;
    this.beeScaleFactor = 1;
    this.setUpdatePeriod(50); // **at least** 50 ms between animations
    
    this.appStartTime = Date.now(); // current time in milisecs
    this.displayAxis = true;
    this.scaleFactor = 1;
    this.fov = 1.8;

    this.gardenCols = 4;
    this.gardenRows = 4;
    ////////////////////////////////////////////////////////////////////////////
  }
  initLights() {
    // Light 0
    
    this.lights[0].setPosition(15, 100, 5, 1);
    this.lights[0].setDiffuse(0.5, 0.5, 0.5, 1.0);
    this.lights[0].setAmbient(0.5, 0.5, 0.5, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  
    // Light 1
    this.lights[1].setPosition(-15, 100, 5, 1);
    this.lights[1].setDiffuse(0.5, 0.5, 0.5, 1.0);
    this.lights[1].setAmbient(0.5, 0.5, 0.5, 1.0);
    this.lights[1].enable();
    this.lights[1].update();
  
    // Light 2
    this.lights[2].setPosition(0, 100, -15, 1);
    this.lights[2].setDiffuse(0.5, 0.5, 0.5, 1.0);
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
    this.appearance.setColor(1, 1, 1, 1);
    this.appearance.apply();
  }
  updateGarden(){
    this.garden = new MyGarden(
      this,
      this.gardenCols,
      this.gardenRows,
      10,
      30,
      [this.petal_texture_1, this.petal_texture_2],
      [this.receptacle_texture_1, this.receptacle_texture_2],
      [this.stem_texture_1, this.stem_texture_2],
      [this.leaf_texture_1, this.leaf_texture_2],
      this.pollen_texture
    );
    this.bee.pollen_coords = this.garden.pollen_coords;
  }

  update(t) {
    this.checkKeys();
    //#region Ex.2
    // Continuous animation based on current time and app start time
    var timeSinceAppStart = (t - this.appStartTime) / 1000.0;

    this.bee.update(timeSinceAppStart);
    this.grassShader.setUniformsValues({ uTime: Math.PI/3*(Date.now()-this.grassGarden.time)/1000.0})
    this.cloudShader.setUniformsValues({ uSampler2: 1, timeFactor: timeSinceAppStart });
  }
  checkKeys() {
    if (this.gui.isKeyPressed("KeyR")) {
      this.bee.reset();
    } else {
      if (this.gui.isKeyPressed("KeyF")) {
        this.bee.descend();
      }
      if (this.gui.isKeyPressed("KeyB")) {
        this.bee.goToPollen();
      }
      if (this.gui.isKeyPressed("KeyP")) {
        this.bee.pickUpPollen();
      }
      if (this.gui.isKeyPressed("KeyO")) {
        this.bee.dropInHive();
      } else {
        if (this.gui.isKeyPressed("KeyW")) {
          this.bee.accelerate(200 * this.speedFactor);
        }

        if (this.gui.isKeyPressed("KeyS")) {
          this.bee.accelerate(-400 * this.speedFactor);
        }

        if (this.gui.isKeyPressed("KeyA")) {
          this.bee.turn(Math.PI / 16);
        }

        if (this.gui.isKeyPressed("KeyD")) {
          this.bee.turn(-Math.PI / 16);
        }
      }
    }
  }

  display() {
    // ---- BEGIN Background, camera and axis setup
    this.gl.clearColor(0.0, 0.0, 0.0, 0.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
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
    
    // Primitive drawing section ////////////////////////////////////////////////////////////////
    // PLANE ////////////////////////////////////////////////////////////////////////////////////
    this.appearance.setTexture(this.planeTexture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');
    this.appearance.apply()

    this.pushMatrix();
    this.translate(0,-10,0);
    this.scale(400,400,400);
    this.rotate(-Math.PI/2.0,1,0,0);
    this.plane.display();
    this.popMatrix();
    //////////////////////////////////////////////////////////////////////////////////////////////

    // GARDEN ////////////////////////////////////////////////////////////////////////////////////
    this.garden.display()
    this.setDefaultAppearance()
    //////////////////////////////////////////////////////////////////////////////////////////////

    // ROCKS /////////////////////////////////////////////////////////////////////////////////////
    this.pushMatrix()
    this.translate(0,-10,0);
    this.rockSet.display()
    this.rockPiramid.display()
    this.popMatrix()
    //////////////////////////////////////////////////////////////////////////////////////////////

    // CLOUDS && PANORAMA ////////////////////////////////////////////////////////////////////////
    this.cloudsTexture.bind(1)
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');
    this.appearance.apply();
    this.setActiveShader(this.cloudShader);

    this.panorama.display();
    
    this.setDefaultAppearance();
    //////////////////////////////////////////////////////////////////////////////////////////////
    
    // GRASS GARDEN //////////////////////////////////////////////////////////////////////////////
    this.pushMatrix();
    this.setActiveShader(this.grassShader);

    this.translate(0,-10,0);
    this.grassGarden.display();

    this.setActiveShader(this.defaultShader);
    this.popMatrix();
    //////////////////////////////////////////////////////////////////////////////////////////////

    // HIVE //////////////////////////////////////////////////////////////////////////////////////
    this.pushMatrix();
    this.translate(-0.5,-5.3,-42.7);
    this.appearance.setTexture(this.hive_texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');
    this.appearance.setAmbient(0.5, 0.5, 0.5, 1);
    this.appearance.apply();
    this.hive.display();
    this.popMatrix();

    this.setDefaultAppearance();
    //////////////////////////////////////////////////////////////////////////////////////////////

    // BEE ///////////////////////////////////////////////////////////////////////////////////////
    this.bee.display();
    //////////////////////////////////////////////////////////////////////////////////////////////
  }
}

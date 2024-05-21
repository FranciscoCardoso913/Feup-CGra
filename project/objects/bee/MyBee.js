import { CGFobject } from "../../../lib/CGF.js";
import { MySphere } from "../MySphere.js";
import { MyCone } from "../geometric/MyCone.js";
import { Antenna } from "./Antenna.js";
import { Wing } from "./Wing.js";

export class MyBee extends CGFobject {
  constructor(scene, textures, pollen_coords, hive_coords) {
    super(scene);
    this.scaleBeeFactor = 1;
    this.textures = textures;
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.direction = 0;
    this.maxV = 600;
    this.norm = 0;
    this.v = [0, 0, 0]; //(x,y,z)
    this.pollen = null;
    this.pollen_coords = pollen_coords;
    this.hive_coords = hive_coords;
    this.lastUpdate = Date.now();
    this.height = 3;
    
    // State flags
    this.isOnFlower = false;
    this.blockAnimation = false;
    this.blockMovement = false;
    this.ascend = false;
    this.descent = false;

    this.initBuffers();
  }
  initBuffers() {
    this.spere = new MySphere(this.scene, 20, 20);
    this.antenna = new Antenna(this.scene);
    this.cone = new MyCone(this.scene, 20, 20);
    this.wing = new Wing(this.scene, this.textures[4]);
    this.time = 0;
  }

  // Sorts the pollen grains by distance to the bee
  sortPollen() {
    this.pollen_coords.sort((a, b) => {
      const distanceA = Math.sqrt(
        Math.pow(this.x - a[0], 2) +
          Math.pow(this.y - a[1], 2) +
          Math.pow(this.z - a[2], 2)
      );
      const distanceB = Math.sqrt(
        Math.pow(this.x - b[0], 2) +
          Math.pow(this.y - b[1], 2) +
          Math.pow(this.z - b[2], 2)
      );
      return distanceA - distanceB;
    });
  }

  // Calculates a trajectory to a target point
  // Uses linear interpolation to animate the bee's movement
  calcTrajectory(pollen, targetVY = 0, targetVX = 0, targetVZ = 0) {
    const startTime = Date.now();
    const endTime = startTime + 1200; // 1.2 seconds
    const targetX =
      pollen[0] + Math.cos(this.direction) * 0.5 * this.scaleBeeFactor;
    const targetY = pollen[1] + 0.5 * this.scaleBeeFactor;
    const targetZ =
      pollen[2] - Math.sin(this.direction) * 0.5 * this.scaleBeeFactor;

    const update = () => {
      const now = Date.now();
      // If we've reached the end of the descent or the target position, update the values
      if (now >= endTime || (this.x == targetX && this.z == targetZ)) {
        // We've reached the end of the descent
        this.x = targetX;
        this.y = targetY;
        this.z = targetZ;
        this.v = [0, 0, 0];
        this.norm = 0; // Reset the velocity, makes the bee stop

        // Distinguish descent to flower from descent to hive
        if (this.pollen != null ){
          if (this.isOnFlower) this.isOnFlower = false;
          else{
            this.scene.hive.pollens.push(this.pollen);
            this.pollen = null;
          }
          this.ascend = true;
        }

      } else {
        // Calculate the percentage of the descent that has elapsed
        const t = (now - startTime) / (endTime - startTime);

        // Use lerp to calculate the current values
        // The division by 7 and 6 is to make the movement smoother
        this.x = this.x + (t * (targetX - this.x)) / 7;
        this.y = this.y + (t * (targetY - this.y)) / 7;
        this.z = this.z + (t * (targetZ - this.z)) / 7;
        this.v[0] = this.v[0] + (t * (targetVX - this.v[0])) / 6;
        this.v[2] = this.v[2] + (t * (targetVZ - this.v[2])) / 6;
      }

      // If we haven't reached the end of the descent, update again on the next frame
      if (now < endTime && !(this.x == targetX && this.z == targetZ)) {
        requestAnimationFrame(update);
      }
    };

    // Start the update loop
    update();
  }

  // Resets the bee's position and state, along with its velocity
  reset(x) {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.v = [0, 0, 0];
    this.lastUpdate = Date.now();
    this.direction = 0;
    this.norm = 0;
    this.ascend = false;
    this.isOnFlower = false;
    this.blockAnimation = false;
    this.blockMovement = false;
  }

  // Updates the bee's position
  update(time) {
    this.time = time;
    if (this.descent){
        this.y -= 0.2;
        if (this.y <= -4){
            this.v = [0,0,0];
            this.norm = 0;
            this.descent = false;
        }
        if(this.checkFlowerCollision(1)){
            this.x = this.pollen_coords[0][0];
            this.y = this.pollen_coords[0][1] + 0.5;
            this.z = this.pollen_coords[0][2];
            this.v = [0,0,0];
            this.norm = 0;
            this.descent = false;
            this.isOnFlower = true;
        }

    }
    else{
        this.y = this.ascend ? this.y + 0.2 : this.y; //Check if the bee is ascending, therefore not using the sinusoidal function
    
        // If the bee has reached the top of the ascent, in a position corresponding to the sinusoidal function, reset the flags
        if (this.ascend && this.y >= this.height + Math.sin(time * Math.PI * 2)) {
          this.ascend = false;
          this.isOnFlower = false;
          this.blockAnimation = false;
          this.blockMovement = false;
        }
    
        // If the blockAnimation flag is set, don't update the bee's Y position
        this.y = this.blockAnimation ? this.y : this.height + Math.sin(time * Math.PI * 2);
    }
  }

  // Accelerates the bee in the direction it is facing, with a value of x
  accelerate(x) {
    if (this.blockMovement) return;
    if(this.norm ==0 && x > 0) this.norm = 3;
    this.norm += x * ((Date.now() - this.lastUpdate) / 1000.0);
    if (this.norm > this.maxV) this.norm = this.maxV;
    if (this.norm < 0) this.norm = 0;
    this.v[0] = this.norm * Math.cos(this.direction);
    this.v[2] = -this.norm * Math.sin(this.direction);
  }

  descend(){
    if (this.pollen != null) return;
    this.blockAnimation = true;
    this.blockMovement = true;
    this.descent = true;
  }

  checkFlowerCollision(range) {
    this.sortPollen();
    let localPollen = this.pollen_coords[0];
    let distance = Math.sqrt(
      Math.pow(this.x - localPollen[0], 2) +
        Math.pow(this.y - localPollen[1], 2) +
        Math.pow(this.z - localPollen[2], 2)
    );

    return distance < range;
  }

  // Moves the bee to the nearest pollen grain
  goToPollen() {
    if (this.pollen != null) return;
    this.isOnFlower = true;
    this.blockAnimation = true;
    this.blockMovement = true;
    this.sortPollen(); // Sort the pollen grains by distance to the bee
    let pollen = this.pollen_coords[0];
    // Calculate the angle to the pollen grain
    this.direction =
      Math.atan2(-(pollen[2] - this.z), pollen[0] - this.x) % (2 * Math.PI);
    this.calcTrajectory(pollen); // Move the bee to the pollen grain
  }

  // Picks up the pollen grain from the flower and starts ascending
  pickUpPollen() {
    this.sortPollen(); // Sort the pollen grains by distance to the bee
    let localPollen = this.pollen_coords[0];
    if (!this.isOnFlower) {
        this.ascend = true;
        return;
    }
    if (this.pollen == null) {
      this.pollen =
      this.scene.garden.garden[localPollen[3]][localPollen[4]].pollen; // Get the pollen grain
      
      this.scene.garden.garden[localPollen[3]][localPollen[4]].pollen = null; // Remove the pollen grain from the flower
    }
    this.ascend = true;
  }

  // Drops the pollen grain in the hive
  dropInHive() {
    if (this.pollen == null) return;
    this.blockAnimation = true;
    this.blockMovement = true;
    this.direction = // Calculate the angle to the hive
      Math.atan2(-(this.hive_coords[2] - this.z), this.hive_coords[0] - this.x) %
      (2 * Math.PI);
    
    this.calcTrajectory(this.hive_coords, 0, 0, 0); // Move the bee to the hive
  }

  // Rotates the bee by x radians 
  turn(x) {
    if (this.blockMovement) return;
    this.direction += x;
    this.accelerate(0);
  }

  // Updates the bee's position based on its velocity
  calcPos() {
    this.x += this.v[0] * ((Date.now() - this.lastUpdate) / 1000.0);
    this.z += this.v[2] * ((Date.now() - this.lastUpdate) / 1000.0);
    this.lastUpdate = Date.now();
  }

  displayHead() {
    this.scene.pushMatrix();

    this.scene.appearance.setTexture(this.textures[0]);
    this.scene.appearance.setTextureWrap("REPEAT", "REPEAT");
    this.scene.appearance.apply();
    this.spere.display();
    this.scene.popMatrix();
  }
  displayTorso() {
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI / 2, 0, 0, 1);
    this.scene.appearance.setTexture(this.textures[1]);
    this.scene.appearance.setTextureWrap("REPEAT", "REPEAT");
    this.scene.appearance.apply();
    this.spere.display();
    this.scene.popMatrix();
  }
  displayAbdomen() {
    this.scene.pushMatrix();
    this.scene.appearance.setTexture(this.textures[0]);
    this.scene.appearance.setTextureWrap("REPEAT", "REPEAT");
    this.scene.appearance.apply();
    this.spere.display();
    this.scene.popMatrix();
  }
  displayEye() {
    this.scene.pushMatrix();
    this.scene.appearance.setTexture(this.textures[2]);
    this.scene.appearance.setTextureWrap("REPEAT", "REPEAT");
    this.scene.appearance.apply();
    this.spere.display();
    this.scene.popMatrix();
  }
  displayAntenna() {
    this.scene.pushMatrix();
    this.scene.appearance.setTexture(this.textures[3]);
    this.scene.appearance.setTextureWrap("REPEAT", "REPEAT");
    this.scene.appearance.apply();
    this.antenna.display();
    this.scene.popMatrix();
  }

  displayPollen() {
    if (this.pollen != null) {
      this.scene.pushMatrix();
      this.scene.scale(2, 2, 2);
      this.scene.translate(0.32, -0.3, 0);
      this.pollen.display();
      this.scene.popMatrix();
    }
  }

  display() {
   
    this.calcPos();

    this.scene.pushMatrix();
    this.scene.translate(this.x, this.y, this.z);
    this.scene.rotate(this.direction, 0, 1, 0);

    this.scene.rotate(Math.PI, 0, 1, 0);

    this.scene.scale(
      this.scene.beeScaleFactor,
      this.scene.beeScaleFactor,
      this.scene.beeScaleFactor
    );

    let ang = (Math.PI / 4) * Math.sin(this.time * Math.PI * 8);

    this.scene.pushMatrix();
    this.scene.rotate(-Math.PI / 6.0, 0, 0, 1);
    this.scene.scale(0.35, 0.5, 0.5);
    this.displayHead();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0.6, 0, 0);
    this.scene.scale(0.45, 0.45, 0.5);
    this.displayAbdomen();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(1.25, -0.25, 0);
    this.scene.rotate(-Math.PI / 6.0, 0, 0, 1);

    this.scene.scale(0.65, 0.4, 0.4);
    this.displayTorso();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-0.2, 0.15, 0.35);
    this.scene.rotate(Math.PI / 6, 0, 1, 0);
    this.scene.rotate(Math.PI / 6.0, 1, 0, 0);
    this.scene.rotate(-Math.PI / 6.0, 0, 0, 1);
    this.scene.scale(0.05, 0.2, 0.15);
    this.displayEye();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-0.2, 0.15, -0.35);
    this.scene.rotate(-Math.PI / 6, 0, 1, 0);
    this.scene.rotate(-Math.PI / 6.0, 1, 0, 0);
    this.scene.rotate(-Math.PI / 6.0, 0, 0, 1);

    this.scene.scale(0.05, 0.2, 0.15);
    this.displayEye();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-0, 0.4, 0.2);
    this.scene.rotate(Math.PI / 4, 0, 1, 1);
    this.displayAntenna();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-0, 0.4, -0.2);
    this.scene.rotate(Math.PI / 4, 0, 0, 1);
    this.scene.rotate(-Math.PI / 4, 0, 1, 0);
    this.displayAntenna();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0.6, -0.4, 0.2);
    this.scene.rotate(Math.PI, -0.05, 0, 0.5);
    this.displayAntenna();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0.25, -0.2, -0.15);
    this.scene.rotate(Math.PI, 0.05, 0, 0.5);
    this.displayAntenna();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0.25, -0.2, 0.15);
    this.scene.rotate(Math.PI, -0.05, 0, 0.5);
    this.displayAntenna();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0.5, -0.4, -0.2);
    this.scene.rotate(Math.PI, 0.1, 0, 1);
    this.displayAntenna();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0.85, -0.35, 0.15);
    this.scene.rotate(Math.PI, -0.05, 0, 0.5);
    this.displayAntenna();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0.85, -0.35, -0.15);
    this.scene.rotate(Math.PI, 0.05, 0, 0.5);
    this.displayAntenna();
    this.scene.popMatrix();

    this.displayPollen();

    this.scene.pushMatrix();
    this.scene.translate(1.75, -0.525, 0);
    this.scene.rotate((-4 * Math.PI) / 6.0, 0, 0, 1);
    this.scene.scale(0.05, 0.25, 0.05);
    this.cone.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0.5, 0.3, 0.4);
    this.scene.rotate(ang, 1, 0, 0);
    this.wing.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0.5, 0.3, -0.4);
    this.scene.scale(1, 1, -1);
    this.scene.rotate(ang, 1, 0, 0);
    this.wing.display();
    this.scene.popMatrix();

    this.scene.popMatrix();
  }
}

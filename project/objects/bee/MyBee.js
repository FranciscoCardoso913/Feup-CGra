import {CGFobject} from '../../../lib/CGF.js';
import { MySphere } from '../MySphere.js';
import { MyCone } from '../geometric/MyCone.js';
import { Antenna } from './Antenna.js';
import { Wing } from './Wing.js';

export class MyBee extends CGFobject {
	constructor(scene, textures) {
		super(scene);
        this.scaleBeeFactor=1;
        this.textures = textures;
        this.x=0;
        this.y=0;
        this.z=0;
        this.direction= 0;
        this.maxV = 60;
        this.norm= 0;
        this.v=[0,0,0];//(x,y,z)
        this.lastUpdate =Date.now();
		this.initBuffers();
	}
	initBuffers() {
		this.spere = new MySphere(this.scene, 20,20);
        this.antenna = new Antenna(this.scene);
        this.cone = new MyCone(this.scene, 20, 20);
        this.wing = new Wing(this.scene, this.textures[4]);
        this.time = 0;
	};

    reset(x){
        this.x=0;
        this.z=0;
        this.v=[0,0,0];
        this.lastUpdate= Date.now();
        this.direction=0;
        this.norm=0;

    }

    update(time){
        this.time = time;
    }

    accelerate(x){

        if(x>0 && this.norm==0) this.norm=5;// Min velocity
        this.norm+=x*((Date.now()- this.lastUpdate)/ 1000.0); // calc new velocity
        if( this.norm > this.maxV) this.norm = this.maxV; // Max velocity
        if(this.norm<0) this.norm= 0; //Do not go backwards
        this.v[0] = this.norm* Math.cos(this.direction); // calc velocity in x
        this.v[2] = -this.norm* Math.sin(this.direction); // calc velocity in z
    }
    turn(x){
        this.direction+=x;
        this.accelerate(0);
    }
    calcPos(){
        this.x+= this.v[0]*((Date.now()- this.lastUpdate)/ 1000.0);
        this.z+= this.v[2]*((Date.now()- this.lastUpdate)/ 1000.0);
        this.lastUpdate = Date.now();
    }


    displayHead(){
        this.scene.pushMatrix();
        
        this.scene.appearance.setTexture(this.textures[0]);
        this.scene.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.scene.appearance.apply();
        this.spere.display();
        this.scene.popMatrix();
    }
    displayTorso(){
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2,0,0,1 )
        this.scene.appearance.setTexture(this.textures[1]);
        this.scene.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.scene.appearance.apply();
        this.spere.display();
        this.scene.popMatrix();
    }
    displayAbdomen(){
        this.scene.pushMatrix();
        this.scene.appearance.setTexture(this.textures[0]);
        this.scene.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.scene.appearance.apply();
        this.spere.display();
        this.scene.popMatrix();
    }
    displayEye(){
        this.scene.pushMatrix();
        this.scene.appearance.setTexture(this.textures[2]);
        this.scene.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.scene.appearance.apply();
        this.spere.display();
        this.scene.popMatrix();
    }
    displayAntenna(){
        this.scene.pushMatrix();
        this.scene.appearance.setTexture(this.textures[3]);
        this.scene.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.scene.appearance.apply();
        this.antenna.display();
        this.scene.popMatrix();
    }


    display(){

        
        this.calcPos();
        
        this.scene.pushMatrix()
        this.scene.translate(this.x,this.y,this.z)
        this.scene.rotate(this.direction, 0,1,0)

        this.scene.rotate(Math.PI,0,1,0)
    
        this.scene.scale(this.scene.beeScaleFactor,this.scene.beeScaleFactor,this.scene.beeScaleFactor);


        let ang = (Math.PI/4 )* Math.sin(this.time*Math.PI*8);

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/6.0,0,0,1);
        this.scene.scale(0.35,0.5,0.5);
        this.displayHead();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.6,0,0)
        this.scene.scale(0.45,0.45,0.5);
        this.displayAbdomen();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1.25,-0.25,0)
        this.scene.rotate(-Math.PI/6.0,0,0,1);
        
        this.scene.scale(0.65,0.4,0.4);
        this.displayTorso();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.2,0.15,0.35);
        this.scene.rotate(Math.PI/6,0,1,0);
        this.scene.rotate(Math.PI/6.0,1,0,0);
        this.scene.rotate(-Math.PI/6.0,0,0,1);
        this.scene.scale(0.05,0.2,0.15);
        this.displayEye();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.2,0.15,-0.35)
        this.scene.rotate(-Math.PI/6,0,1,0);
        this.scene.rotate(-Math.PI/6.0,1,0,0);
        this.scene.rotate(-Math.PI/6.0,0,0,1);
        
        this.scene.scale(0.05,0.2,0.15);
        this.displayEye();
        this.scene.popMatrix();
        

        this.scene.pushMatrix();
        this.scene.translate(-0,0.4,0.2);
        this.scene.rotate(Math.PI/4, 0,1,1)
        this.displayAntenna();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0,0.4,-0.2);
        this.scene.rotate(Math.PI/4, 0,0,1)
        this.scene.rotate(-Math.PI/4, 0,1,0)
        this.displayAntenna();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.6,-0.4,0.2);
        this.scene.rotate(Math.PI, -0.05,0,0.5)
        this.displayAntenna();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.25,-0.2,-0.15);
        this.scene.rotate(Math.PI, 0.05,0,0.5)
        this.displayAntenna();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.25,-0.2,0.15);
        this.scene.rotate(Math.PI, -0.05,0,0.5)
        this.displayAntenna();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.5,-0.4,-0.2);
        this.scene.rotate(Math.PI, 0.1,0,1)
        this.displayAntenna();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.85,-0.35,0.15);
        this.scene.rotate(Math.PI, -0.05,0,0.5)
        this.displayAntenna();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.85,-0.35,-0.15);
        this.scene.rotate(Math.PI, 0.05,0,0.5)
        this.displayAntenna();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1.75,-0.525,0);
        this.scene.rotate(-4*Math.PI/6.0,0,0,1);
        this.scene.scale(0.05,0.25,0.05);
        this.cone.display();
        this.scene.popMatrix();

        this.scene.pushMatrix()
        this.scene.translate(0.5,0.3,0.3)
        this.scene.rotate(ang, 1,0,0)
        this.wing.display()
        this.scene.popMatrix()

        this.scene.pushMatrix()
        this.scene.translate(0.5,0.3,-0.3)
        this.scene.scale(1,1,-1)
        this.scene.rotate(ang, 1,0,0)
        this.wing.display()
        this.scene.popMatrix()


        this.scene.popMatrix()

    }
}



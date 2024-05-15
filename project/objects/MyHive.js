import {CGFappearance, CGFobject, CGFtexture} from '../../lib/CGF.js';
import { MySphere } from './MySphere.js';

export class MyHive extends CGFobject {
	constructor(scene) {
        super(scene);
        this.scene = scene;
        this.sphere = new MySphere(scene, 10, 10, false, false);

		this.initBuffers();
	}
	initBuffers() {
        this.texture = new CGFtexture(this.scene, "images/hive.jpg");
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(0.5, 0.5, 0.5, 1);
        this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
	};

    display(){
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 0, 0, 1);  
        this.scene.scale(1.0,1.5,1.0);
        this.appearance.apply();
        this.sphere.display();
        this.scene.popMatrix();
    }
}
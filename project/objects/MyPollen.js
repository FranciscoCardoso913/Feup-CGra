import {CGFappearance, CGFobject, CGFtexture} from '../../lib/CGF.js';
import { MySphere } from './MySphere.js';

export class MyPollen extends CGFobject {
	constructor(scene, texture) {
        super(scene);
        this.scene = scene;
        this.sphere = new MySphere(scene, 10, 10, false, false);
        this.texture = texture;

		this.initBuffers();
	}
	initBuffers() {
	};

    display(){
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 0, 0, 1);  
        this.scene.scale(1.0,1.5,1.0);
        this.scene.scale(0.1, 0.1, 0.1);
        this.scene.appearance.setAmbient(0.5, 0.5, 0.5, 1);
        this.scene.appearance.setTexture(this.texture);
        this.scene.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.scene.appearance.apply();
        this.sphere.display();
        this.scene.popMatrix();
    }
}
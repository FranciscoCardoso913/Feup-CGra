import {CGFappearance, CGFobject, CGFtexture} from '../../lib/CGF.js';
import { MySphere } from './MySphere.js';

export class MyHive extends CGFobject {
	constructor(scene) {
        super(scene);
        this.scene = scene;
        this.sphere = new MySphere(scene, 10, 10, true, false);

		this.initBuffers();
	}
	initBuffers() {
        this.texture = new CGFtexture(this.scene, "images/hive.jpg");
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(0.5, 0.5, 0.5, 1);
        this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');

        this.hole = new CGFappearance(this.scene);
        this.hole.setAmbient(0,0,0,1);
        this.hole.setDiffuse(0,0,0,1);
        this.hole.setSpecular(0,0,0,1);
	};

    display(){
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.scale(1.5,1.0,1.0);
        this.appearance.apply();
        this.sphere.display();
        
        this.scene.rotate(-5 *Math.PI / 4, 1, 0, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.scale(0.2, 1.0, 1.0);
        this.sphere.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0.965,0.03,0);
        this.scene.rotate(0.1, 0, 0, 1);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.scale(0.7,0.05,0.4);
        
        this.hole.apply();
        this.sphere.display();
        this.scene.popMatrix();
    }
}
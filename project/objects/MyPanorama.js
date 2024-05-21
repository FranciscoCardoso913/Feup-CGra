import {CGFobject} from '../../lib/CGF.js';
import { MySphere } from './MySphere.js';

export class MyPanorama extends CGFobject {
	constructor(scene, texture) {
		super(scene);
        this.texture = texture;
		this.initBuffers();
	}
	initBuffers() {
		// Generate vertices, normals, and texCoords
		this.sphere = new MySphere(this.scene, 30,60,false, true);
	};

    display(){
        this.scene.pushMatrix();
        this.scene.translate(this.scene.camera.position[0],this.scene.camera.position[1],this.scene.camera.position[2])
        this.scene.scale(200,200,200);
        this.sphere.display();
        this.scene.popMatrix();
        this.scene.setDefaultAppearance();

    }
}



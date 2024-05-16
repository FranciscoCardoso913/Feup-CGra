import {CGFobject} from '../../../lib/CGF.js';
import { MyGrass } from './MyGrass.js';

export class GrassGarden extends CGFobject {
	constructor(scene,x,y,number, texture) {
		super(scene);
        this.x = x;
        this.y = y;
        this.number = number;
        this.texture= texture;
		this.initBuffers();
	}
	initBuffers() {
		
        this.grass = new MyGrass(this.scene, 5);
	};

    display(){
        this.scene.appearance.setTexture(this.texture);
        this.scene.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.scene.appearance.apply();
        this.scene.pushMatrix()
        this.scene.scale(1,2,0.1)
        this.scene.translate(1,2,0.1)
        this.grass.display()
        this.scene.popMatrix()

    }
}



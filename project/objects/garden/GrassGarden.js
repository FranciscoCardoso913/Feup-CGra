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
		this.randoms=[]
        for(let j=0; j<50;j++)
            for(let i=0; i< 50;i++)
                this.randoms.push(Math.random()*360)
            
        this.grass = new MyGrass(this.scene, 5);
	};

    display(){
        this.scene.appearance.setTexture(this.texture);
        this.scene.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.scene.appearance.apply();
        this.scene.pushMatrix()
        //this.scene.scale(1,2,0.1)
        //this.scene.translate(1,2,0.1)
        //this.grass.display()
        this.scene.popMatrix()
        
        for(let j=0; j<50;j++)
            for(let i=0; i< 50;i++){
                let r= this.randoms[i*j]
                this.scene.pushMatrix()
                this.scene.translate(i,0,j)
                this.scene.rotate(r,0,1,0)
                this.scene.scale(1,2,0.1)
                this.grass.display()
                this.scene.popMatrix()
            }

    }
}



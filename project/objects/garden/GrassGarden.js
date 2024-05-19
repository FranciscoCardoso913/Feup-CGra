import {CGFobject} from '../../../lib/CGF.js';
import { MyGrass } from './MyGrass.js';

export class GrassGarden extends CGFobject {
	constructor(scene,x,y, texture, density=1) {
		super(scene);
        this.x = x;
        this.y = y;
        this.texture= texture;
        this.time=Date.now();
        this.density= density>5?5:density;
		this.initBuffers();
	}
	initBuffers() {
		this.randoms=[]
        this.pos =[];
        this.occupied = []
        for(let j=0; j<50;j++)
            for(let i=0; i< 50;i++)
                for(let k = 0; k< this.density; k++)
                    this.randoms.push(new MyGrass(this.scene, 4))

        for(let x = 0; x<5;x++){
            let aux =[]
            for(let y=0; y<5;y++)
                aux.push(0);
            this.occupied.push(aux);
        }

        for(let k = 0; k< this.density; k++){
            let x = Math.floor(Math.random()*5);
            let y = Math.floor(Math.random()*5);
        
            if(this.occupied[x][y]==0){
                this.pos.push([x/5,y/5]);
                this.occupied[x,y]=1;
            }
            else k--;
        }
                
            
        this.grass = new MyGrass(this.scene, 3);
	};

    display(){
        this.scene.appearance.setTexture(this.texture);
        this.scene.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.scene.appearance.apply();
        this.scene.pushMatrix()
        this.scene.translate(this.x, 0, this.y)

        let n=0;
        for(let j=0; j<50;j++)
            for(let i=0; i< 50;i++){
                
                for(let k=0; k<this.density;k++){
                let r= this.randoms[i*j]
                this.scene.pushMatrix()
                this.scene.translate(i + this.pos[k][0],0,j +this.pos[k][1])
                this.scene.rotate(r.getDirection(),0,1,0)
                
                this.scene.scale(1,2,0.1);

                n++;
                r.display()
                this.scene.popMatrix()
            }
        }
        //console.log(n)
        this.scene.popMatrix()


    }
}



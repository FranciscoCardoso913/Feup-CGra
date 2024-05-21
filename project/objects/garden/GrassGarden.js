import {CGFobject} from '../../../lib/CGF.js';
import { MyGrass } from './MyGrass.js';

/**
 * 50x50 garden with grass
 */
export class GrassGarden extends CGFobject {
    /**
     * Constructor
     * @param {*} scene Scene where the garden will be display
     * @param {*} x x position if the garden
     * @param {*} y y position of the garden
     * @param {*} texture texture if the grass
     * @param {*} density number of grass per 1x1 block
     */
	constructor(scene,x,y, texture, density=1) {
		super(scene);
        this.x = x;
        this.y = y;
        this.texture= texture;
        this.time=Date.now();
        this.density= density>5?5:density;
		this.initBuffers();
	}
    /**
     * Init the garden
     */
	initBuffers() {
		this.randoms=[] // array for the grass
        this.pos =[]; // array for the positions of the grass
        this.occupied = [] // aux matrix for the positions that are occupied
        //Create the grass
        for(let j=0; j<50;j++)
            for(let i=0; i< 50;i++)
                for(let k = 0; k< this.density; k++)
                    this.randoms.push(new MyGrass(this.scene, 4))

        // init an matrix at 0
        for(let x = 0; x<5;x++){
            let aux =[]
            for(let y=0; y<5;y++)
                aux.push(0);
            this.occupied.push(aux);
        }
        // Generates random positions for the grass
        for(let k = 0; k< this.density; k++){
            let x = Math.floor(Math.random()*5);
            let y = Math.floor(Math.random()*5);
        
            if(this.occupied[x][y]==0){
                this.pos.push([x/5,y/5]);
                this.occupied[x,y]=1;
            }
            else k--;
        }
	};
    /**
     * Display the garden
     */
    display(){
        this.scene.appearance.setTexture(this.texture);
        this.scene.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.scene.appearance.apply();
        this.scene.pushMatrix()
        this.scene.translate(this.x, 0, this.y)
        // Display the grass in the positions
        for(let j=0; j<50;j++)
            for(let i=0; i< 50;i++){
                for(let k=0; k<this.density;k++){
                let r= this.randoms[i*j]
                this.scene.pushMatrix()
                this.scene.translate(i + this.pos[k][0],0,j +this.pos[k][1])
                this.scene.rotate(r.getDirection(),0,1,0)
                this.scene.scale(1,2,0.1);
                r.display()
                this.scene.popMatrix()
            }
        }
        this.scene.popMatrix();
    }
}



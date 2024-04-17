import {CGFobject} from '../../../lib/CGF.js';
/**
* MyPyramid
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyStem extends CGFobject {

    constructor(scene, height, smoothness) {
        super(scene);
        this.height = height;
        this.smoothness = smoothness;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        let alphaang = (2 * Math.PI) / this.smoothness;

        for (let i = 0; i < this.smoothness; i++) {
            let ang = i * alphaang;
            let x = Math.cos(ang);
            let z = Math.sin(ang);

            this.vertices.push(x, 0, z);
            this.vertices.push(x, this.height, z);

            let m = this.smoothness * 2;
            this.indices.push( (2*i)%m , (2*i+1)%m, (2*i+2)%m);
            this.indices.push( (2*i+1)%m, (2*i+3)%m, (2*i+2)%m);

            this.normals.push(x, 0, z);
            this.normals.push(x, 0, z);
        }


        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */

    display(){
        super.display();
    }

}



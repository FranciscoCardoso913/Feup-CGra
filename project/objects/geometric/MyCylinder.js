import {CGFobject} from '../../../lib/CGF.js';
/**
* MyPyramid
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyCylinder extends CGFobject {

    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;
        let d = 1/this.stacks;

        for(let j = 0; j<= this.stacks;j++ ){

            for(var i = 0; i <= this.slices; i++){
 

                var sa=Math.sin(ang);
                var ca=Math.cos(ang);

                //this.vertices.push(ca, -sa, 0.5); // A
                this.vertices.push(ca, d*(j), sa ); // C


                // triangle normal computed by cross product of two edges
                var normal= [
                    ca,
                    0,
                    sa
                ];

                this.normals.push(...normal);
                this.texCoords.push(i/this.slices, j/this.stacks);
                ang+=alphaAng;
            }
        }

        for(let j = 0; j< this.stacks;j++ ){

            for(var i = 0; i < this.slices; i++){
                this.indices.push(i+(this.slices+1)*(j+1),i+(this.slices+1)*j+1,i+(this.slices+1)*j);
                this.indices.push(i+(this.slices+1)*(j+1)+1,i+(this.slices+1)*j+1,i+(this.slices+1)*(j+1));
            }
        }


        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */

        display(){
        this.scene.pushMatrix()
        //this.scene.rotate(Math.PI/2, 1, 0, 0);
        super.display();
        this.scene.popMatrix();
    }

}



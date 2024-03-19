import {CGFobject} from '../../lib/CGF.js';
/**
* MyPyramid
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyPrism extends CGFobject {

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

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;
        let d = 1/this.stacks;

        for(let j = 0; j< this.stacks;j++ ){

            for(var i = 0; i < this.slices; i++){
                // All vertices have to be declared for a given face
                // even if they are shared with others, as the normals 
                // in each face will be different

                var sa=Math.sin(ang);
                var saa=Math.sin(ang+alphaAng);
                var ca=Math.cos(ang);
                var caa=Math.cos(ang+alphaAng);

                this.vertices.push(ca, -sa, 0.5); // A
                this.vertices.push(caa, -saa, 0.5); //B


                this.vertices.push(ca, -sa, 0.5-d*(j+1)); // C
                this.vertices.push(caa, -saa, 0.5-d*(j+1) ); // D



                // triangle normal computed by cross product of two edges
                var normal= [
                    saa-sa,
                    caa-ca,
                    0
                ];

                this.normals.push(...normal);
                this.normals.push(...normal);
                this.normals.push(...normal);
                this.normals.push(...normal);
                
                let s = j*4*this.slices ;
                this.indices.push( (4*i) +s , (4*i+1)+s , (4*i+2)+s);
                this.indices.push( (4*i+1)+s , (4*i+3)+s , (4*i+2)+s);

                ang+=alphaAng;
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
    display(){
        this.scene.pushMatrix()
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        super.display();
        this.scene.popMatrix();
    }

}



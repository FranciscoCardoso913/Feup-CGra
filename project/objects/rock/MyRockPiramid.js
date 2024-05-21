import {CGFobject} from '../../../lib/CGF.js';
import { MyRock } from './MyRock.js';

export class MyRockPiramid extends CGFobject {
    /**
    * MyRockPiramid
    * @constructor
    * @param scene - Reference to MyScene object
    * @param stacks - Number of layers in the pyramid
    * @param texture - Texture to be applied to the rocks
    * @param bl - Base location of the pyramid [x, y]
    * @param rocks_size - Size of each rock, defaults to 1
    */
    constructor(scene, stacks, texture, bl, rocks_size = 1) {
        super(scene);  // Call the parent class constructor
        this.bl = bl;  // Store the base location
        this.stacks = stacks;  // Store the number of layers
        this.texture = texture;  // Store the texture
        this.rocks_size = rocks_size;  // Store the size of each rock
        this.rocks = [];  // Array to store rock objects (not used here, but could be useful for future extensions)
        this.positions = [];  // Array to store rock positions (not used here, but could be useful for future extensions)
        this.initBuffers();  // Initialize buffers
    }

    /**
     * Initializes the buffers needed for the rock pyramid.
     */
    initBuffers() {
        this.rock = new MyRock(this.scene, this.texture);  // Create a new MyRock instance
    }

    /**
     * Displays the rock pyramid.
     */
    display() {
        let x = this.bl[0];  // Base location x-coordinate
        let y = this.bl[1];  // Base location y-coordinate

        this.scene.pushMatrix();  // Save the current transformation matrix
        this.scene.scale(this.rocks_size, this.rocks_size, this.rocks_size);  // Scale the entire pyramid

        // Iterate through each layer (stack) of the pyramid
        for (let k = 0; k < this.stacks; k++) {
            // Iterate through each position in the current layer
            for (let i = 0; i < 2 * (this.stacks - k) + 1; i++) {
                for (let j = 0; j < 2 * (this.stacks - k) + 1; j++) {
                    this.scene.pushMatrix();  // Save the current transformation matrix
                    // Translate to the position of the current rock
                    this.scene.translate(x + (this.rocks_size * i + k) * 1.5, 0.8 * k * this.rocks_size, y + (this.rocks_size * j + k) * 1.5);
                    this.rock.display();  // Display the rock
                    this.scene.popMatrix();  // Restore the transformation matrix
                }
            }
        }

        this.scene.popMatrix();  // Restore the transformation matrix
    }
}

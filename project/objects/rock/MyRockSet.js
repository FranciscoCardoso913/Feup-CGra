import {CGFobject} from '../../../lib/CGF.js';
import { MyRock } from './MyRock.js';

export class MyRockSet extends CGFobject {
    /**
    * MyRockSet
    * @constructor
    * @param scene - Reference to MyScene object
    * @param texture - Texture to be applied to the rocks
    * @param bl - Bottom-left corner of the area [x, y]
    * @param tr - Top-right corner of the area [x, y]
    * @param nrocks - Number of rocks to generate, defaults to 1
    * @param rocks_size - Size of each rock, defaults to 1
    */
    constructor(scene, texture, bl, tr, nrocks = 1, rocks_size = 1) {
        super(scene);  // Call the parent class constructor
        this.bl = bl;  // Bottom-left corner coordinates
        this.tr = tr;  // Top-right corner coordinates
        this.nrocks = nrocks;  // Number of rocks to generate
        this.texture = texture;  // Texture for the rocks
        this.rocks_size = rocks_size;  // Size of each rock
        this.rocks = [];  // Array to store rock objects
        this.positions = [];  // Array to store positions of the rocks
        this.initBuffers();  // Initialize the buffers
    }

    /**
     * Initializes the buffers and positions the rocks randomly within the specified area.
     */
    initBuffers() {
        let bl_x = this.bl[0];
        let bl_y = this.bl[1];
        let tr_x = this.tr[0];
        let tr_y = this.tr[1];
        let height = Math.abs(tr_y - bl_y);
        let width = Math.abs(tr_x - bl_x);
        let vw = (width / this.rocks_size) / 2;
        let vh = (height / this.rocks_size) / 2;
        let max_number = Math.floor(vw * vh);

        // Adjust the number of rocks to fit within the area if necessary
        this.nrocks = Math.min(max_number, this.nrocks);

        let occupied_spaces = [];
        while (this.nrocks > 0) {
            let pos = Math.floor(Math.random() * max_number);
            if (!occupied_spaces.includes(pos)) {
                let pos_y = Math.floor(pos / vw);
                let pos_x = pos % vw;
                occupied_spaces.push(pos);
                this.positions.push([pos_x * 2, 0, pos_y * 2]);
                this.rocks.push(new MyRock(this.scene, this.texture));
                this.nrocks -= 1;
            }
        }
    }

    /**
     * Displays the rock set.
     */
    display() {
        let idx = 0;
        let min_x = Math.min(this.bl[0], this.tr[0]);
        let min_y = Math.min(this.bl[1], this.tr[1]);
        
        this.scene.pushMatrix();  // Save the current transformation matrix
        this.scene.translate(min_x, 0, min_y);  // Translate to the bottom-left corner of the area
        this.scene.scale(this.rocks_size, this.rocks_size, this.rocks_size);  // Scale the rocks

        // Iterate through the positions and display each rock
        this.positions.forEach((value) => {
            this.scene.pushMatrix();  // Save the current transformation matrix
            this.scene.translate(...value);  // Translate to the position of the current rock
            this.rocks[idx].display();  // Display the rock
            this.scene.popMatrix();  // Restore the transformation matrix
            idx += 1;
        });

        this.scene.popMatrix();  // Restore the transformation matrix
    }
}

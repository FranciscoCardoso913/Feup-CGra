import {CGFobject} from '../../../lib/CGF.js';

export class MyRock extends CGFobject {
    /**
    * MyRock
    * @constructor
    * @param scene - Reference to MyScene object
    * @param texture - Texture to be applied to the rock
    * @param flatness - Optional parameter to determine the flatness of the rock, defaults to a random value between 0.3 and 0.8
    */
    constructor(scene, texture, flatness = Math.random() * 0.5 + 0.3) {
        super(scene);  // Call the parent class constructor
        this.texture = texture;  // Store the texture
        this.flatness = flatness;  // Store the flatness
        this.stacks = 10;  // Number of divisions along the Y axis
        this.slices = 10;  // Number of divisions around the Y axis
        this.initBuffers();  // Initialize the buffers
    }

    /**
     * Initializes the buffers needed for the rock.
     */
    initBuffers() {
        // Arrays to hold the vertices, normals, and texture coordinates
        this.vertices = [];
        this.normals = [];
        this.texCoords = [];

        // Angle increments for slices and stacks
        const beta = (Math.PI * 2) / this.slices; 
        const alfa = (Math.PI / 2) / this.stacks;
        const roughness = 0.3;  // Roughness factor to add randomness

        // Iterate through stacks and slices to generate vertices, normals, and texture coordinates
        for (let i = 0; i <= this.stacks * 2; i++) {
            let stack_t = (Math.random()) * roughness;
            let slice_t = (Math.random()) * roughness + 0.7;

            for (let j = 0; j <= this.slices; j++) {
                let ang = j * beta;
                let ang2 = i * alfa;

                // Determine the vertex coordinates based on stack and slice
                if (i == 0 || i == this.stacks * 2) {
                    this.vertices.push(Math.sin(ang) * Math.sin(ang2) * stack_t, Math.cos(ang2) * stack_t, Math.cos(ang) * Math.sin(ang2) * stack_t);
                } else if (j == this.slices) {
                    this.vertices.push(Math.sin(ang) * Math.sin(ang2) * slice_t, Math.cos(ang2) * slice_t, Math.cos(ang) * Math.sin(ang2) * slice_t);
                } else {
                    this.vertices.push(Math.sin(ang) * Math.sin(ang2) * slice_t, Math.cos(ang2) * slice_t, Math.cos(ang) * Math.sin(ang2) * slice_t);
                }

                // Store texture coordinates and normals
                this.texCoords.push(j / this.slices, i / (this.stacks * 2));
                this.normals.push(Math.sin(ang) * Math.sin(ang2), Math.cos(ang2), Math.cos(ang) * Math.sin(ang2));

                // Randomize the next slice thickness
                slice_t = (Math.random()) * roughness + 0.7;
            }
        }

        // Array to hold the indices for the triangles
        this.indices = [];

        // Generate indices for the internal stacks
        for (let i = 1; i < this.stacks * 2 - 1; i++) {
            for (let j = 0; j < this.slices; j++) {
                this.indices.push(i * (this.slices + 1) + j); // Bottom left
                this.indices.push(((i + 1)) * (this.slices + 1) + j); // Top
                this.indices.push(i * (this.slices + 1) + ((j + 1))); // Bottom Right

                this.indices.push(i * (this.slices + 1) + ((j + 1)));
                this.indices.push(((i + 1)) * (this.slices + 1) + j);
                this.indices.push(((i + 1)) * (this.slices + 1) + ((j + 1)));
            }
        }

        // Generate indices for the top and bottom caps
        for (let j = 0; j <= this.slices; j++) {
            // Bottom cap
            this.indices.push(j); // Bottom left
            this.indices.push((this.slices + 1) + j); // Top
            this.indices.push((this.slices + 1) + j + 1); // Bottom Right

            // Top cap
            this.indices.push((this.slices + 1) * this.stacks * 2 - j); // Bottom left
            this.indices.push((this.slices + 1) * (this.stacks * 2 - 1) + j + 1); // Bottom Right
            this.indices.push((this.slices + 1) * (this.stacks * 2 - 1) + j); // Top
        }

        // Set the primitive type to TRIANGLES and initialize the WebGL buffers
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    /**
     * Displays the rock object, applying transformations and texture.
     */
    display() {
        this.scene.pushMatrix();  // Save the current transformation matrix
        this.scene.appearance.setTexture(this.texture);  // Set the rock texture
        this.scene.appearance.setTextureWrap('REPEAT', 'REPEAT');  // Set texture wrapping
        this.scene.scale(1, this.flatness, 1);  // Scale the rock based on its flatness
        this.scene.translate(0, 1, 0);  // Translate the rock upwards
        this.scene.appearance.apply();  // Apply the appearance settings
        super.display();  // Call the parent class display method to render the rock
        this.scene.setDefaultAppearance();  // Reset to default appearance
        this.scene.popMatrix();  // Restore the transformation matrix
    }
}

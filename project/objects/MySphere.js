import {CGFobject} from '../../lib/CGF.js';

/**
 * Sphere Object
 */
export class MySphere extends CGFobject {
	/**
	 * Constructor of the sphere
	 * @param {*} scene The scene where the sphere will be display
	 * @param {*} stacks the number of stacks 
	 * @param {*} slices the number of slices
	 * @param {*} isSemiSphere Indicates if should be a semi sphere or a sphere
	 * @param {*} isInverted Indicates the sphere should be seen from the outside or from the inside
	 */
	constructor(scene, stacks, slices, isSemiSphere = false, isInverted = false) {
		super(scene);
		this.stacks = stacks ;
        this.slices = slices ;
		this.isSemiSphere = isSemiSphere;
		this.isInverted = isInverted;
		this.initBuffers();
	}
/**
 * Initializes the buffers for the sphere using polar coordinates
 */
initBuffers() {
    // Initialize arrays to hold vertices, normals, and texture coordinates
    this.vertices = [];
    this.normals = [];
    this.texCoords = [];

    // Determine the step sizes for slices and stacks
    const beta = this.isSemiSphere ? (Math.PI) / this.slices : (Math.PI * 2) / this.slices; 
    const alfa = (Math.PI / 2) / this.stacks;

    // Generate vertices, normals, and texture coordinates
    for (let i = 0.0; i <= this.stacks * 2; i++) {
        for (let j = 0.0; j <= this.slices; j++) {
            let ang = j * beta;
            let ang2 = i * alfa;
            // Calculate vertex positions
            this.vertices.push(Math.sin(ang) * Math.sin(ang2), Math.cos(ang2), Math.cos(ang) * Math.sin(ang2));
            // Calculate texture coordinates
            this.texCoords.push(j / (this.slices), i / (this.stacks * 2));
            // Calculate normals, invert if needed
            if (this.isInverted) {
                this.normals.push(-Math.sin(ang) * Math.sin(ang2), -Math.cos(ang2), -Math.cos(ang) * Math.sin(ang2));
            } else {
                this.normals.push(Math.sin(ang) * Math.sin(ang2), Math.cos(ang2), Math.cos(ang) * Math.sin(ang2));
            }
        }
    }

    // Initialize array to hold the indices
    this.indices = [];

    // Generate indices for the sphere's faces
    for (let i = 1; i <= this.stacks * 2 - 1; i++) {
        for (let j = 0; j < this.slices; j++) {
            // Push indices for the two triangles that form each quad
            this.indices.push(i * (this.slices + 1) + j); // Bottom left

            if (this.isInverted) {
                this.indices.push(i * (this.slices + 1) + (j + 1)); // Bottom right
                this.indices.push((i + 1) * (this.slices + 1) + j); // Top left
            } else {
                this.indices.push((i + 1) * (this.slices + 1) + j); // Top left
                this.indices.push(i * (this.slices + 1) + (j + 1)); // Bottom right
            }

            this.indices.push(i * (this.slices + 1) + (j + 1)); // Bottom right

            if (this.isInverted) {
                this.indices.push((i + 1) * (this.slices + 1) + (j + 1)); // Top right
                this.indices.push((i + 1) * (this.slices + 1) + j); // Top left
            } else {
                this.indices.push((i + 1) * (this.slices + 1) + j); // Top left
                this.indices.push((i + 1) * (this.slices + 1) + (j + 1)); // Top right
            }
        }
    }

    // Generate indices for the top and bottom caps
    for (let j = 0; j < this.slices; j++) {
        // Bottom cap
        this.indices.push(j); // Bottom left
        if (this.isInverted) {
            this.indices.push((this.slices + 1) + j + 1); // Bottom right
            this.indices.push((this.slices + 1) + j); // Top left
        } else {
            this.indices.push((this.slices + 1) + j); // Top left
            this.indices.push((this.slices + 1) + j + 1); // Bottom right
        }

        // Top cap
        this.indices.push((this.slices + 1) * (this.stacks * 2 + 1) - j - 1); // Bottom left
        if (this.isInverted) {
            this.indices.push((this.slices + 1) * (this.stacks * 2) - j - 1); // Bottom right
            this.indices.push((this.slices + 1) * (this.stacks * 2) - j); // Top left
        } else {
            this.indices.push((this.slices + 1) * (this.stacks * 2) - j); // Top left
            this.indices.push((this.slices + 1) * (this.stacks * 2) - j - 1); // Bottom right
        }
    }

    // Set the primitive type and initialize WebGL buffers
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
}

}



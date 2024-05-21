# Project

## How to run

## Controls

## Implementation

### Sky-Sphere

A sky-sphere is a sphere rendered from the inside, simulating the view of the terrain up to the horizon and the sky above.

#### Creating a sphere

In order to create a sky-sphere we first need to create a sphere. For that we have implemented the class `Mysphere`.

##### Functionality

The MySphere class offers the following functionalities:

-   Creates a sphere centered at the origin, with its central axis aligned with the Y-axis and a unit radius.
-   Allows customization of the number of "slices" around the Y-axis and "stacks" from the equator to the poles, providing a detailed control over the sphere's smoothness.
-   Employs an efficient algorithm to generate vertices, normals, and texture coordinates for the sphere's surface.
-   Handles the creation of triangles for the sphere's top and bottom caps, ensuring proper rendering.
-   Supports the option to create a semi-sphere or a full sphere.
-   Allows rendering the sphere from the inside (sky view) or outside (regular view) by inverting normals.

##### Usage

```js
import { MySphere } from './MySphere.js';
const sphere = new MySphere(scene, stacks, slices, isSemiSphere?, isInverted?);
sphere.display();
```

#### Adding panoramas

Having the `MySphere` class we now need to create  a class to simulate the panorama effect for that we create the class `MyPanorama`.

##### Constructor:

- Takes a CGFtexture object representing the panoramic image (equirectangular format) as input.
- Internally creates an inverted MySphere object with a high number of slices and stacks for a smooth appearance.
- Sets the material of the sphere to have only an emissive component, suitable for displaying the panorama effectively.

##### Display

- Applies a translation to position the sphere at the camera's location, creating the illusion of being surrounded by the panorama.
- Scales the sphere to a large radius (e.g., 200 units) to encompass the scene.
- Display MySphere object to render the panorama.

![Panorama](screenshots/project-t07g07-1_2.png)

#### FOV

In this part we also added a Slider in the GUI to change the FOV of the camara.

Low POV
![Panorama](screenshots/project-t07g07-1_1.png)

High POV
![Panorama](screenshots/project-t07g07-1_1.png)

---
### Flowers

#### Modelling a flower

#### Parameterizing the flower

#### Randomness and diversity in the flower

#### Textures on the flowers
---
### Rocks and Boulders

This section involves creating a collection of stones  of various sizes. These stones are generated using a MyRock class, which modifies vertices to create random and natural-looking protrusions and indentations. Additionally, a MyRockSet class arranges multiple rocks randomly into a grid, and a MyRockPiramid class stacks rocks in a pyramid shape.

##### MyRock

Similar to the `MySphere `

##### MyRockSet

##### MyRockPiramide


---
### Bee

#### Modeling the bee
#### Animating the bee
#### Controlling the bee
---
### Pollen and Hive
---
### Shaders and animation
#### Shaping the grass
#### Waving the grass
---
### Additional developments - Sky
---


# CG 2023/2024

## Group T07G07

## TP 1 Notes

We began by analyzing the code and understanding how the library worked, as well as how to create objects using only triangles.

- For Exercise 1.1, we created the file "MyTriangle.js" following the structure provided in the given "MyDiamond.js" file to define the MyTriangle class. We then set the vertices as (-1,-1,0), (1,-1,0), and (-1,1,0) to form the intended triangle shape. The indices were defined in a counter-clockwise order to ensure proper coloring on the correct side.

- In Exercise 1.2, we emulated the diamond example by defining a variable displayTriangle in MyScene.js to control the visibility of the triangle. In that same file, we used an if statement, checking the value of that variable, in order to toggle the triangle's visibility by encapsulating the display() function in it. Finally, we added a checkbox element in the GUI in MyInterface.js, targeting the boolean variable created.

- For Exercise 1.3, we decomposed the parallelogram into triangles, resulting in two triangles: one with vertices (0,0,0),(2,0,0),(1,1,0) and another with vertices (1,1,0),(2,0,0),(3,1,0). Following the same process as in Exercise 1.1, we defined the four vertices and the corresponding indices for each triangle, ensuring they were ordered correctly to achieve the desired final result. To enable double-sided visibility, we duplicated the indices for each triangle and arranged them in a clockwise order, thereby making them double-sided.

- In Exercise 1.4, we replicated the approach from Exercise 1.2, this time with a variable named displayParallelogram.

<br>

- For Exercise 2, leveraging our understanding from Exercise 1, we created two classes: MyTriangleSmall and MyTriangleBig. These classes represent two double-sided triangles, with the small triangle having vertices (-1,0,0),(0,1,0),(1,0,0) and the large triangle having vertices (-2,0,0),(0,2,0),(2,0,0).

![Screenshot 1](tp1/screenshots/cg-t07g07-tp1-1.png)

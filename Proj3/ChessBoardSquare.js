/**
 * MzRectangle
 * @constructor
 * @param scene - Reference to MyScene object
 * @param x - Scale of rectangle in X
 * @param z - Scale of rectangle in Z
 */
class ChessBoardSquare extends CGFobject {
	constructor(scene, white, x, z) {
		super(scene);
		this.x = x;
		this.z = z;
        this.white = white;

		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			this.x, 0, this.z,	        //0
			this.x+1, 0, this.z,	    //1
			this.x, 0, this.z + 1,	    //2
			this.x+1, 0, this.z + 1 	//3
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 2, 1,
			2, 3, 1
		];

		//Facing Z positive
		this.normals = [
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
			0, 1, 0
		];
		
		/*
		Texture coords (s,t)
		+----------> s
        |
        |
		|
		v
        t
        */

		this.texCoords = [
			0, 1,
			1, 1,
			0, 0,
			1, 0
		]
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

	/**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the rectangle
	 * @param {Array} coords - Array of texture coordinates
	 */
	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}


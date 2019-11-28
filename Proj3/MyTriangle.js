/**
 * MyRectangle
 * @constructor
 * @param scene - Reference to MyScene object
 * @param x - Scale of triangle in X
 * @param y - Scale of triangle in Y
 * @param z - Scale of triangle in Z
 */
class MyTriangle extends CGFobject {
	constructor(scene, id, x1, x2, x3, y1, y2, y3, z1, z2, z3) {
		super(scene);
		this.x1 = x1;
        this.x2 = x2;
        this.x3 = x3;
		this.y1 = y1;
        this.y2 = y2;
        this.y3 = y3;
        this.z1 = z1;
        this.z2 = z2;
        this.z3 = z3;

		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			this.x1, this.y1, this.z1,	//0
			this.x2, this.y2, this.z2,	//1
			this.x3, this.y3, this.z3	//2
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
        ];
        
        //auxiliary calculus
        var ux, uy, uz, vx, vy, vz, nx, ny, nz;

        ux = this.x2 - this.x1;
        uy = this.y2 - this.y1;
        uz = this.z2 - this.z1;

        vy = this.y3 - this.y1;
        vx = this.x3 - this.x1;
        vz = this.z3 - this.z1;

        nx = uy*vz - uz*vy;
        ny = uz*vx - ux*vz;
        nz = ux*vy - uy*vx;

        var length = Math.sqrt(nx*nx + ny*ny + nz*nz);


		//Facing Z positive
		this.normals = [
			nx/length, ny/length, nz/length,
			nx/length, ny/length, nz/length,
			nx/length, ny/length, nz/length
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

        //auxiliary calculus
        var a, b, c, cosa, sinb;

        a = Math.sqrt((this.x1-this.x3)*(this.x1-this.x3)+(this.y1-this.y3)*(this.y1-this.y3)+(this.z1-this.z3)*(this.z1-this.z3));
        b = Math.sqrt((this.x2-this.x1)*(this.x2-this.x1)+(this.y2-this.y1)*(this.y2-this.y1)+(this.z2-this.z1)*(this.z2-this.z1));
        c = Math.sqrt((this.x3-this.x2)*(this.x3-this.x2)+(this.y3-this.y2)*(this.y3-this.y2)+(this.z3-this.z2)*(this.z3-this.z2));

        //cosa = (-(a*a) + b*b + c*c)/(2*b*c);
        var cosb = ((a*a) - b*b + c*c)/(2*a*c);
       //cosy = ((a*a) + b*b - c*c)/(2*a*b);

       sinb = Math.sqrt(1-(cosb * cosb));


		this.texCoords = [
			c-a*cosb, 1-a*sinb, 
			0, 1,
			c, 1
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


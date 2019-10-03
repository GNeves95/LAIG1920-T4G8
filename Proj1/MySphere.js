/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 * @param radius - Sphere radius
 * @param slices - Number of divisions around
 * @param stacks - Number of divisions along height
 */
class MySphere extends CGFobject {
	constructor(scene, id, slices, stacks, r) {
		super(scene);
		this.slices = slices;
		this.stacks = stacks;
        this.r = r;

		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [];
		this.indices = [];
        this.normals = [];
        
        // x = r.cos(theta).cos(phi)
        // y = r.cos(theta).sin(phi)
        // z = r.sin(theta)
        //delta phi = 2*pi/slices
        //delta theta = pi/(2*stacks)
        // nx = cos(theta).cos(phi)
        // ny = cos(theta).sin(phi)
        // nz = sin(theta)
		
        var phi = (2*Math.PI)/this.slices;
        var theta = Math.PI/(2*this.stacks);

        for (var i = 0; i < this.stacks; i++){
            var currTheta = theta*i;
            for (var j = 0; j < this.slices; j++){
                var currPhi = phi*j;

                var nx = Math.cos(currTheta)*Math.cos(currPhi);
                var ny = Math.cos(currTheta)*Math.sin(currPhi);
                var nz = Math.sin(currTheta);

                var x = this.r*nx;
                var y = this.r*ny;
                var z = this.r*nz;

                this.vertices.push(x,y,z);
                this.normals.push(nx,ny,nz);
            }
        }
        this.vertices.push(0,0,this.r);
        this.normals.push(0,0,1);

        for (var i = this.slices; i < this.stacks*this.slices; i++){
            this.vertices.push(this.vertices[3*i],this.vertices[3*i + 1], -this.vertices[3*i + 2]);
            this.normals.push(this.normals[3*i],this.normals[3*i + 1], -this.normals[3*i + 2]);
        }

        this.vertices.push(0,0,-this.r);
        this.normals.push(0,0,-1);
        
        //Need to fix indices calculation
		for (i = 0; i < this.slices*(this.stacks-1) ; i++) {
			this.indices.push(i, i+1, i+1+this.slices);
			this.indices.push(i+1+this.slices, i+this.slices, i);
        }
        
		for (i = 0; i < this.slices*(this.stacks-1) ; i++) {
            var aux1 = this.slices*this.stacks + i;
            var aux2 = this.slices*this.stacks + i + 1;
            var aux3 = this.slices*this.stacks + i + 1 + this.slices;
            var aux4 = this.slices*this.stacks + i + this.slices;
			this.indices.push(aux3, aux2, aux1);
			this.indices.push(aux1, aux4, aux3);
		}


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


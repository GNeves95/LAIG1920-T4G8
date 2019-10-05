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
        this.texCoords = [];
        
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
        var deltaX = 1/this.stacks;
        var deltaY = 1/this.slices;

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
                this.texCoords.push(0.5+(i*deltaX), j*deltaY);

                this.vertices.push(x,y,z);
                this.normals.push(nx,ny,nz);
            }
        }
        this.vertices.push(0,0,this.r);
        this.normals.push(0,0,1);
        this.texCoords.push(1, 1);

        for (var i = this.slices; i < this.stacks*this.slices; i++){
            this.vertices.push(this.vertices[3*i],this.vertices[3*i + 1], -this.vertices[3*i + 2]);
            this.normals.push(this.normals[3*i],this.normals[3*i + 1], -this.normals[3*i + 2]);
            
            this.texCoords.push(0.5-(i*deltaX), j*deltaY);
        }

        this.vertices.push(0,0,-this.r);
        this.normals.push(0,0,-1);
        this.texCoords.push(0,0);

        for (i = 0; i < this.stacks - 1; i++) {
            for (j = 0; j < this.slices - 1; j++) {
                this.indices.push(i*this.slices + j, i*this.slices + j + 1, (i + 1)*this.slices + j + 1);
                this.indices.push((i + 1)*this.slices + j + 1, (i + 1)*this.slices + j, i*this.slices + j);
            }
            this.indices.push((i + 1)*this.slices - 1, i*this.slices, (i+1)*this.slices);
            this.indices.push((i + 1)*this.slices, (i + 2)*this.slices - 1, (i + 1)*this.slices - 1);
        }

        for (i = 0; i < this.slices - 1; i++) {
            this.indices.push(this.slices*(this.stacks - 1) + i, this.slices*(this.stacks - 1) + i + 1, this.slices*this.stacks);
        }

        this.indices.push(this.slices*this.stacks - 1, this.slices*(this.stacks - 1), this.slices*this.stacks);

        var base = this.slices*this.stacks + 1;

        for (i = 0; i < this.slices - 1; i++) {
            this.indices.push(i + 1, i, base + i);
            this.indices.push(base + i, base + i + 1, i + 1);
        }
        this.indices.push(0, this.slices - 1, base + this.slices - 1);
        this.indices.push(base + this.slices - 1, base, 0);

        for (i = 0; i < this.stacks - 2; i++) {
            for (j = 0; j < this.slices - 1; j++) {
                this.indices.push(base + ((i + 1)*this.slices + j + 1), base + (i*this.slices + j + 1), (i*this.slices + j) + base);
                this.indices.push(base + (i*this.slices + j), base + ((i + 1)*this.slices + j), base + ((i + 1)*this.slices + j + 1));
            }
            this.indices.push(((i+1)*this.slices) + base, (i*this.slices) + base, ((i + 1)*this.slices - 1) + base);
            this.indices.push(((i + 1)*this.slices - 1) + base, ((i + 2)*this.slices - 1) + base, ((i + 1)*this.slices) + base);
        }

        for (i = 0; i < this.slices - 1; i++) {
            this.indices.push((this.slices*(this.stacks - 1)) + base, (this.slices*(this.stacks - 2) + i + 1) + base, (this.slices*(this.stacks - 2) + i) + base);
        }

        this.indices.push((this.vertices.length/3) - 1, (this.vertices.length/3) - this.slices - 1, (this.vertices.length/3) - 2);

        // Calculate texture from half of the image up, then down

        //this.texCoords = [];

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


/**
 * MyTorus
 * @constructor
 * @param scene - Reference to MyScene object
 * @param inner - Inner radius
 * @param outer - Outer radius
 * @param slices - Number of divisions along height
 * @param loops - Number of divisions along height
 */
class MyTorus extends CGFobject {
	constructor(scene, id, inner, outer, slices, loops) {
        super(scene);
        this.inner = inner;
        this.outer = outer;
		this.slices = slices;
		this.loops = loops;

		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [];
		this.indices = [];
        this.normals = [];
        this.texCoords = [];
		
        var phi = (2*Math.PI)/this.loops;
        var theta = (2*Math.PI)/this.slices;
        var deltaX = 1/this.loops;
        var deltaY = 1/this.slices;

        for (var i = 0; i < this.loops; i++){
            var currTheta = theta*i;
            for (var j = 0; j < this.slices; j++){
                var currPhi = phi*j;

                var nx = Math.cos(currTheta)*Math.cos(currPhi);
                var ny = Math.cos(currTheta)*Math.sin(currPhi);
                var nz = Math.sin(currTheta);

                var x = (this.outer + this.inner * Math.cos(currTheta))*Math.cos(currPhi);
                var y = (this.outer + this.inner * Math.cos(currTheta))*Math.sin(currPhi);
                var z = this.inner * Math.sin(currTheta);

                this.texCoords.push(i*deltaX, j*deltaY);

                this.vertices.push(x,y,z);
                this.normals.push(nx,ny,nz);
            }
        }

        for (i = 0; i < this.loops-1; i++) {
            for (j = 0; j < this.slices-1; j++) {
                this.indices.push((i*this.slices)+j, (i*this.slices)+j + 1,((i + 1)*this.slices)+j + 1,);
                this.indices.push(((i+1)*this.slices) + j + 1, ((i+1)*this.slices) + j, (i*this.slices)+j);
            }
            this.indices.push(((i+1)*this.slices) - 1, (i*this.slices), ((i+1)*this.slices));
            this.indices.push(((i+1)*this.slices), ((i+2)*this.slices) - 1, ((i+1)*this.slices)-1);
        }

        for(i = 0; i < this.slices - 1; i++){
            this.indices.push((this.loops-1)*this.slices + i, (this.loops-1)*this.slices + i + 1, 1 + i);
            this.indices.push(1 + i, 0 + i, (this.loops-1)*this.slices + i);
        }

        this.indices.push(this.loops*this.slices-1, (this.loops-1)*this.slices, 0);
        this.indices.push(0, this.slices - 1, (this.loops)*this.slices - 1);

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


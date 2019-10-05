/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of divisions around
 * @param stacks - Number of divisions along height
 */
class MyCylinder extends CGFobject {
	constructor(scene, id, slices, stacks, height, r1, r2) {
		super(scene);
		this.slices = slices;
		this.stacks = stacks;
		this.height = height;
        this.r1 = r1;
        this.r2 = r2;

		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];
		
		var angulo = 0;
		var x = 0;
		var normal = 0;
		var teta = (2 * Math.PI)/this.slices;

		var desiredZ = this.height;
		var mainZ = desiredZ / this.stacks;
		var z = 0;
        var z2 = 0;
        
        var diffGirth = (this.r1 - this.r2)/this.stacks;

		for (var j = 0; j < this.stacks + 1 ; j++) {

			z = mainZ * j;
            z2 = z + mainZ;
            var currGirth = this.r1-(diffGirth*j);

			for (var i = 0; i < this.slices ; i++) {

				normal = i * teta;
				
				this.vertices.push(currGirth * Math.cos(angulo),currGirth * Math.sin(angulo), z);

				this.normals.push(Math.cos(normal), Math.sin(normal), 0);

				this.texCoords.push(i*(1/this.slices), j*(1/this.stacks));
				
				angulo = angulo + teta;
			}
			
		}
		
		for (i = 0; i < this.stacks ; i++) {
			for (j = 0; j < this.slices ; j++) {
				if (j==this.slices-1) {
					this.indices.push(x,x-(this.slices-1),x+this.slices);
					this.indices.push(x+1,x+this.slices,x-(this.slices-1));
				} else {
					this.indices.push(x,x+1,x+this.slices);
					this.indices.push(x+1+this.slices,this.slices+x,x+1);
				}
				x+=1;
			}
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


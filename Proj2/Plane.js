
/** Represents a plane with nrDivs divisions along both axis, with center at (0,0) */
class Plane extends CGFobject{
	constructor(scene, nPartsU, nPartsV) {
		super(scene);
		this.nPartsU = nPartsU;
		this.nPartsV = nPartsV;

		this.initBuffers();
	}
	initBuffers() {
		// Generate vertices, normals, and texCoords
		this.vertices = [];
		this.normals = [];
		this.texCoords = [];
		//var yCoord = 0.5;
//
		//for (var j = 0; j <= this.nPartsU; j++) {
		//	var xCoord = -0.5;
		//	for (var i = 0; i <= this.nPartsV; i++) {
		//		this.vertices.push(xCoord, yCoord, 0);
		//		this.normals.push(0, 0, 1);
		//		this.texCoords.push(this.minS + i * this.q, this.minT + j * this.w);
		//		xCoord += this.patchLength;
		//	}
		//	yCoord -= this.patchLength;
		//}
		//// Generating indices
		//this.indices = [];
//
		//var ind = 0;
		//for (var j = 0; j < this.nrDivs; j++) {
		//	for (var i = 0; i <= this.nrDivs; i++) {
		//		this.indices.push(ind);
		//		this.indices.push(ind + this.nrDivs + 1);
		//		ind++;
		//	}
		//	if (j + 1 < this.nrDivs) {
		//		this.indices.push(ind + this.nrDivs);
		//		this.indices.push(ind);
		//	}
		//}
		//this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
		this.initGLBuffers();
	}

	setFillMode() { 
		this.primitiveType=this.scene.gl.TRIANGLE_STRIP;
	}

	setLineMode() 
	{ 
		this.primitiveType=this.scene.gl.LINES;
	};

}



class ManPiece extends CGFobject{
    constructor(scene, id, white,x,y,z, obj)
    {
        super(scene);
        this.id = id;
        this.white = white;
        this.x = x;
        this.y = y;
        this.z = z;
        this.destx = x;
        this.desty = y;
        this.destz = z;

		this.vertices = obj.vertices;
		this.indices = obj.indices;
        this.normals = obj.normals;
        this.texCoords = obj.texCoords;

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
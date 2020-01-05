class MyButton extends CGFobject {
    constructor(scene, id, white, x, y, z, texture) {
        super(scene);
        this.id = id;
        this.white = white;
        this.x = x;
        this.y = y;
        this.z = z;
        this.destx = x;
        this.desty = y;
        this.destz = z;
        this.texture = texture;
        this.scene = scene;

        this.lSide = new MyRectangle(scene, 'lSide' + id, 0, 0.5, 0, 0.5);
        this.rSide = new MyRectangle(scene, 'rSide' + id, 0, 0.5, 0, 0.5);
        this.front = new MyRectangle(scene, 'front' + id, 0, 1, 0, 0.5);
        this.top = new MyRectangle(scene, 'top' + id, 0, 1, 0, 0.5);
        this.bottom = new MyRectangle(scene, 'bottom' + id, 0, 1, 0, 0.5);

        this.primitiveType = this.scene.gl.TRIANGLES;
        //this.initGLBuffers();
    }
    
    display(){
        var transfMa = mat4.create();

        // Left
        this.scene.pushMatrix();
        var transfMa = mat4.create();
        transfMa = mat4.translate(transfMa, transfMa, [0, 0, 0]);
        transfMa = mat4.rotateY(transfMa, transfMa, DEGREE_TO_RAD * 90);
        this.scene.multMatrix(transfMa);
        //this.texture.bind();
        this.lSide.display();
        //this.texture.unbind();
        this.scene.popMatrix();

        // Front
        this.scene.pushMatrix();
        var transfMa = mat4.create();
        transfMa = mat4.translate(transfMa, transfMa, [0, 0, -0.5]);
        transfMa = mat4.rotateY(transfMa, transfMa, DEGREE_TO_RAD * 180);
        this.scene.multMatrix(transfMa);
        this.texture.bind();
        this.front.display();
        this.texture.unbind();
        this.scene.popMatrix();

        // Right
        this.scene.pushMatrix();
        var transfMa = mat4.create();
        transfMa = mat4.translate(transfMa, transfMa, [-1.0, 0, -0.5]);
        transfMa = mat4.rotateY(transfMa, transfMa, DEGREE_TO_RAD * -90);
        this.scene.multMatrix(transfMa);
        //this.texture.bind();
        this.rSide.display();
        //this.texture.unbind();
        this.scene.popMatrix();

        // Top
        this.scene.pushMatrix();
        var transfMa = mat4.create();
        transfMa = mat4.translate(transfMa, transfMa, [0, 0.5, -0.5]);
        transfMa = mat4.rotateY(transfMa, transfMa, DEGREE_TO_RAD * 180);
        transfMa = mat4.rotateX(transfMa, transfMa, DEGREE_TO_RAD * -90);
        this.scene.multMatrix(transfMa);
        //this.texture.bind();
        this.top.display();
        //this.texture.unbind();
        this.scene.popMatrix();

        // Bottom
        this.scene.pushMatrix();
        var transfMa = mat4.create();
        transfMa = mat4.translate(transfMa, transfMa, [0, 0, 0]);
        transfMa = mat4.rotateY(transfMa, transfMa, DEGREE_TO_RAD * 180);
        transfMa = mat4.rotateX(transfMa, transfMa, DEGREE_TO_RAD * 90);
        this.scene.multMatrix(transfMa);
        //this.texture.bind();
        this.bottom.display();
        //this.texture.unbind();
        this.scene.popMatrix();
    }
}
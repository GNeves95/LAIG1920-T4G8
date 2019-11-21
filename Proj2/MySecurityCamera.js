
class MySecurityCamera extends CGFobject {
    constructor(scene, rttText){
        super(scene);

        this.rectangle = new MyRectangle(this.scene, 'SecurityCamera', 0.5, 1, -0.5, -1);
        this.rttText = rttText;

        this.shader = new CGFshader(this.scene.gl, "shaders/shader.vert", "shaders/shader.frag");
    }

    display(){
        this.scene.setActiveShader(this.shader);
        this.rttText.bind(0);
        this.rectangle.display();
        this.rttText.unbind();
        this.scene.setActiveShader(this.scene.defaultShader);
    }
}
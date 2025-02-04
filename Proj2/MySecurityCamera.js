
class MySecurityCamera extends CGFobject {
    constructor(scene, rttText){
        super(scene);

        this.rttText = rttText;
        this.rectangle = new MyRectangle2(this.scene, 'SecurityCamera', 0.5, 1, -0.5, -1);
        this.shader = new CGFshader(this.scene.gl, "shaders/shader.vert", "shaders/shader.frag");
        this.shader.setUniformsValues({ uSampler: 0, timeFactor: 0 });
    }

    update(t){
        this.shader.setUniformsValues({timeFactor: t});
    }

    display(){
        this.scene.setActiveShader(this.shader);
        this.rttText.bind(0);
        this.rectangle.display();
        this.rttText.unbind(0);
        this.scene.setActiveShader(this.scene.defaultShader);
    }
}
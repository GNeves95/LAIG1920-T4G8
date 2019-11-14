class KeyframeAnimation extends Animation{
    constructor(scene, id, segments) {
        super(scene, id);
        this.segments = segments;
        this.P = [];
        this.O = [];
        this.S = [];
        this.Ma = mat4.create(); //matriz local de animação, que deve ser calculada a cada instante com base na interpolação das três transformações geométricas de acordo com os dois quadros chave, entre os quais esse instante se encontra
        this.Instant = 0;
    }

    update(deltaT) {
        this.Instant += deltaT;
    }

    apply() {
        if(this.Instant >= this.segments[this.segments.length-1]["instant"]){
            var ident = mat4.create();
            var lastP = this.segments[this.segments.length-1][P];
            ident = mat4.translate(ident, ident, lastP);
        }
    }
}
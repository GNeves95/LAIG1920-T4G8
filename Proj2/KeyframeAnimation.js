class KeyframeAnimation extends Animation{
    constructor(scene, segments) {
        super(scene);
        this.segments = segments;
        this.P = [0,0,0];
        this.O = [0,0,0];
        this.S = [1,1,1];
        this.Ma = mat4.create(); //matriz local de animação, que deve ser calculada a cada instante com base na interpolação das três transformações geométricas de acordo com os dois quadros chave, entre os quais esse instante se encontra
        this.Instant = 0;
    }

    update(deltaT) {
        this.Instant += deltaT;
    }

    getCurrTrans(){
        if(this.Instant >= this.segments[this.segments.length-1]["instant"]){
            this.P = this.segments[this.segments.length-1]["P"];
            this.O = this.segments[this.segments.length-1]["O"];
            this.S = this.segments[this.segments.length-1]["S"];
            
            return ;
        }
        for(var i = 0; i < this.segments.length; i ++){
            if(this.segments[i]["instant"] > this.Instant){
                if(i > 0){
                    var currDelta = (this.Instant-this.segments[i-1]["instant"]);
                    var delta = (this.segments[i]["instant"]-this.segments[i-1]["instant"])
                    var ratio = currDelta / delta;

                    this.P[0] = this.segments[i-1]["P"][0] + ratio*(this.segments[i]["P"][0]-this.segments[i-1]["P"][0]);
                    this.P[1] = this.segments[i-1]["P"][1] + ratio*(this.segments[i]["P"][1]-this.segments[i-1]["P"][1]);
                    this.P[2] = this.segments[i-1]["P"][2] + ratio*(this.segments[i]["P"][2]-this.segments[i-1]["P"][2]);

                    this.O[0] = this.segments[i-1]["O"][0] + ratio*(this.segments[i]["O"][0]-this.segments[i-1]["O"][0]);
                    this.O[1] = this.segments[i-1]["O"][1] + ratio*(this.segments[i]["O"][1]-this.segments[i-1]["O"][1]);
                    this.O[2] = this.segments[i-1]["O"][2] + ratio*(this.segments[i]["O"][2]-this.segments[i-1]["O"][2]);

                    this.S[0] = this.segments[i-1]["S"][0] + ratio*(this.segments[i]["S"][0]-this.segments[i-1]["S"][0]);
                    this.S[1] = this.segments[i-1]["S"][1] + ratio*(this.segments[i]["S"][1]-this.segments[i-1]["S"][1]);
                    this.S[2] = this.segments[i-1]["S"][2] + ratio*(this.segments[i]["S"][2]-this.segments[i-1]["S"][2]);
                }
                else {
                    var ratio = this.Instant / this.segments[i]["instant"];

                    this.P[0] += ratio*(this.segments[i]["P"][0]);
                    this.P[1] += ratio*(this.segments[i]["P"][1]);
                    this.P[2] += ratio*(this.segments[i]["P"][2]);

                    this.O[0] += ratio*(this.segments[i]["O"][0]);
                    this.O[1] += ratio*(this.segments[i]["O"][1]);
                    this.O[2] += ratio*(this.segments[i]["O"][2]);

                    this.S[0] += ratio*(this.segments[i]["S"][0]);
                    this.S[1] += ratio*(this.segments[i]["S"][1]);
                    this.S[2] += ratio*(this.segments[i]["S"][2]);
                }

                return ;
            }
        }
    }

    apply() {
        this.getCurrTrans();

        var ident = mat4.create();
        ident = mat4.translate(ident, ident, this.P);
        ident = mat4.rotateX(ident, ident, this.O[0]);
        ident = mat4.rotateY(ident, ident, this.O[1]);
        ident = mat4.rotateZ(ident, ident, this.O[2]);
        ident = mat4.scale(ident, ident, this.S);
        
        this.Ma = ident;
    }
}
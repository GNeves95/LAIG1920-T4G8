class KeyframeAnimation {
    constructor(scene, id, Mn, Ma, Instant) {
        super(scene, id);
        this.Mn = Mn; //matriz de transformações geométricas resultante da multiplicação da matriz que é recebida do nó ascendente, pela matriz própria do nó
        this.Ma = Ma; //matriz local de animação, que deve ser calculada a cada instante com base na interpolação das três transformações geométricas de acordo com os dois quadros chave, entre os quais esse instante se encontra
        this.Instant = Instant;
    }

    update() {

    }

    apply() {
        
    }
}
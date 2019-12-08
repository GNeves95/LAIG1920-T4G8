class ChessPiece extends CGFobject{
    constructor(scene, id, white,x,y)
    {
        super(scene);
        this.id = id;
        this.white = white;
        this.x = x;
        this.y = y;
    }
    display(){};
    getPossibleMoves(){};
    canMoveTo(x,y){};
    move(x,y){};
}
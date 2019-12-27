class ChessPawn extends ChessPiece {
    constructor(scene, id, white, x, y, z, obj) {
        super(scene, id, white, x, y, z, obj);
    }

    getPossibleMoves(){
        moves = [];
        if(white == 1){
            moves.push[x, z-1];
            if(z == 6)
                moves.push[x, z-2];
        }
        else{
            moves.push[x, z+1];
            if(z == 1)
                moves.push[x, z+2];
        }
    }
}
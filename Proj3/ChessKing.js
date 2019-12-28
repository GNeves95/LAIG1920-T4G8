class ChessKing extends ChessPiece {
    constructor(scene, id, white, x, y, z, obj) {
        super(scene, id, white, x, y, z, obj);
    }

    getPossibleMoves(){
        var moves = [];

        if (this.x > 0){
            moves.push([this.x - 1, this.z]);
            if (this.z > 0) {
                moves.push([this.x - 1, this.z - 1]);
                moves.push([this.x, this.z - 1]);
            }
            if (this.z < 7) {
                moves.push([this.x - 1, this.z + 1]);
                moves.push([this.x, this.z + 1]);
            }
        }

        if (this.x < 7){
            moves.push([this.x + 1, this.z]);
            if (this.z > 0) {
                moves.push([this.x + 1, this.z - 1]);
                moves.push([this.x, this.z - 1]);
            }
            if (this.z < 7) {
                moves.push([this.x + 1, this.z + 1]);
                moves.push([this.x, this.z + 1]);
            }
        }
        
        return moves;
    }

}
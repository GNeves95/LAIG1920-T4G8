class ChessPawn extends ChessPiece {
    constructor(scene, id, white, x, y, z, obj) {
        super(scene, id, white, x, y, z, obj);
    }

    getPossibleMoves() {
        var moves = [];
        if (this.white == 1) {
            moves.push([this.x, this.z + 1]);
            if (this.z == 1)
                moves.push([this.x, this.z + 2]);
        }
        else {
            moves.push([this.x, this.z - 1]);
            if (this.z == 6)
                moves.push([this.x, this.z - 2]);
        }
        return moves;
    }
}
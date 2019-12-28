class ChessKnight extends ChessPiece {
    constructor(scene, id, white, x, y, z, obj) {
        super(scene, id, white, x, y, z, obj);
    }

    getPossibleMoves() {
        var moves = [];

        if (this.x > 1) {
            if (this.z > 0)
                moves.push([this.x - 2, this.z - 1]);
            if (this.z < 7)
                moves.push([this.x - 2, this.z + 1]);
        }
        if (this.x > 0) {
            if (this.z > 1)
                moves.push([this.x - 1, this.z - 2]);
            if (this.z < 6)
                moves.push([this.x - 1, this.z + 2]);
        }
        if (this.x < 6) {
            if (this.z > 0)
                moves.push([this.x + 2, this.z - 1]);
            if (this.z < 7)
                moves.push([this.x + 2, this.z + 1]);
        }
        if (this.x < 7) {
            if (this.z > 1)
                moves.push([this.x + 1, this.z - 2]);
            if (this.z < 6)
                moves.push([this.x + 1, this.z + 2]);
        }
        return moves;
    }
}
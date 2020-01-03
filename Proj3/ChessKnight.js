class ChessKnight extends ChessPiece {
    constructor(scene, id, white, x, y, z, obj) {
        super(scene, id, white, x, y, z, obj);
    }

    getPossibleMoves(board2D) {
        var moves = [];

        if (this.x > 1) {
            if (this.z > 0)
                if (board2D[(this.z - 1) * 8 + this.x - 2][1] == ' ' || (board2D[(this.z - 1) * 8 + this.x - 2][1] == 'b' && this.white) || (board2D[(this.z - 1) * 8 + this.x - 2][1] == 'w' && !this.white)) moves.push([this.x - 2, this.z - 1]);
            if (this.z < 7)
                if (board2D[(this.z + 1) * 8 + this.x - 2][1] == ' ' || (board2D[(this.z + 1) * 8 + this.x - 2][1] == 'b' && this.white) || (board2D[(this.z + 1) * 8 + this.x - 2][1] == 'w' && !this.white)) moves.push([this.x - 2, this.z + 1]);
        }
        if (this.x > 0) {
            if (this.z > 1)
                if (board2D[(this.z - 2) * 8 + this.x - 1][1] == ' ' || (board2D[(this.z - 2) * 8 + this.x - 1][1] == 'b' && this.white) || (board2D[(this.z - 2) * 8 + this.x - 1][1] == 'w' && !this.white)) moves.push([this.x - 1, this.z - 2]);
            if (this.z < 6)
                if (board2D[(this.z + 2) * 8 + this.x - 1][1] == ' ' || (board2D[(this.z + 2) * 8 + this.x - 1][1] == 'b' && this.white) || (board2D[(this.z + 2) * 8 + this.x - 1][1] == 'w' && !this.white)) moves.push([this.x - 1, this.z + 2]);
        }
        if (this.x < 6) {
            if (this.z > 0)
                if (board2D[(this.z - 1) * 8 + this.x + 2][1] == ' ' || (board2D[(this.z - 1) * 8 + this.x + 2][1] == 'b' && this.white) || (board2D[(this.z - 1) * 8 + this.x + 2][1] == 'w' && !this.white)) moves.push([this.x + 2, this.z - 1]);
            if (this.z < 7)
                if (board2D[(this.z + 1) * 8 + this.x + 2][1] == ' ' || (board2D[(this.z + 1) * 8 + this.x + 2][1] == 'b' && this.white) || (board2D[(this.z + 1) * 8 + this.x + 2][1] == 'w' && !this.white)) moves.push([this.x + 2, this.z + 1]);
        }
        if (this.x < 7) {
            if (this.z > 1)
                if (board2D[(this.z - 2) * 8 + this.x + 1][1] == ' ' || (board2D[(this.z - 2) * 8 + this.x + 1][1] == 'b' && this.white) || (board2D[(this.z - 2) * 8 + this.x + 1][1] == 'w' && !this.white)) moves.push([this.x + 1, this.z - 2]);
            if (this.z < 6)
                if (board2D[(this.z + 2) * 8 + this.x + 1][1] == ' ' || (board2D[(this.z + 2) * 8 + this.x + 1][1] == 'b' && this.white) || (board2D[(this.z + 2) * 8 + this.x + 1][1] == 'w' && !this.white)) moves.push([this.x + 1, this.z + 2]);
        }
        return moves;
    }
}
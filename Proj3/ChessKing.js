class ChessKing extends ChessPiece {
    constructor(scene, id, white, x, y, z, obj) {
        super(scene, id, white, x, y, z, obj);
    }

    getPossibleMoves(board2D) {
        var moves = [];

        if (this.x > 0) {
            if (board2D[this.z * 8 + this.x - 1] == '  ' || (board2D[this.z * 8 + this.x - 1][1] == 'b' && this.white) || (board2D[this.z * 8 + this.x - 1][1] == 'w' && !this.white)) moves.push([this.x - 1, this.z]);
            if (this.z > 0) {
                if (board2D[(this.z - 1) * 8 + this.x - 1] == '  ' || (board2D[(this.z - 1) * 8 + this.x - 1][1] == 'b' && this.white) || (board2D[(this.z - 1) * 8 + this.x - 1][1] == 'w' && !this.white)) moves.push([this.x - 1, this.z - 1]);
                if (board2D[(this.z - 1) * 8 + this.x][1] == ' ' || (board2D[(this.z - 1) * 8 + this.x][1] == 'b' && this.white) || (board2D[(this.z - 1) * 8 + this.x][1] == 'w' && !this.white)) moves.push([this.x, this.z - 1]);
            }
            if (this.z < 7) {
                if (board2D[(this.z + 1) * 8 + this.x - 1] == '  ' || (board2D[(this.z + 1) * 8 + this.x - 1][1] == 'b' && this.white) || (board2D[(this.z + 1) * 8 + this.x - 1][1] == 'w' && !this.white)) moves.push([this.x - 1, this.z + 1]);
                if (board2D[(this.z + 1) * 8 + this.x][1] == ' ' || (board2D[(this.z + 1) * 8 + this.x][1] == 'b' && this.white) || (board2D[(this.z + 1) * 8 + this.x][1] == 'w' && !this.white)) moves.push([this.x, this.z + 1]);
            }
        }

        if (this.x < 7) {
            if (board2D[this.z * 8 + this.x + 1] == '  ' || (board2D[this.z * 8 + this.x + 1][1] == 'b' && this.white) || (board2D[this.z * 8 + this.x + 1][1] == 'w' && !this.white)) moves.push([this.x + 1, this.z]);
            if (this.z > 0) {
                if (board2D[(this.z - 1) * 8 + this.x + 1] == '  ' || (board2D[(this.z - 1) * 8 + this.x + 1][1] == 'b' && this.white) || (board2D[(this.z - 1) * 8 + this.x + 1][1] == 'w' && !this.white)) moves.push([this.x + 1, this.z - 1]);
                if (board2D[(this.z - 1) * 8 + this.x][1] == ' ' || (board2D[(this.z - 1) * 8 + this.x][1] == 'b' && this.white) || (board2D[(this.z - 1) * 8 + this.x][1] == 'w' && !this.white)) moves.push([this.x, this.z - 1]);
            }
            if (this.z < 7) {
                if (board2D[(this.z + 1) * 8 + this.x + 1] == '  ' || (board2D[(this.z + 1) * 8 + this.x + 1][1] == 'b' && this.white) || (board2D[(this.z + 1) * 8 + this.x + 1][1] == 'w' && !this.white)) moves.push([this.x + 1, this.z + 1]);
                if (board2D[(this.z + 1) * 8 + this.x][1] == ' ' || (board2D[(this.z + 1) * 8 + this.x][1] == 'b' && this.white) || (board2D[(this.z + 1) * 8 + this.x][1] == 'w' && !this.white)) moves.push([this.x, this.z + 1]);
            }
        }

        return moves;
    }

}
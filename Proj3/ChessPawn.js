class ChessPawn extends ChessPiece {
    constructor(scene, id, white, x, y, z, obj) {
        super(scene, id, white, x, y, z, obj);
    }

    getPossibleMoves(board2D) {
        var moves = [];
        if (this.white == 1) {
            if (board2D[(this.z + 1) * 8 + this.x][1] == ' ') moves.push([this.x, this.z + 1]);
            if (board2D[(this.z + 1) * 8 + this.x + 1][1] == 'b' && this.x < 7) moves.push([this.x + 1, this.z + 1]);
            if (board2D[(this.z + 1) * 8 + this.x - 1][1] == 'b' && this.x > 0) moves.push([this.x - 1, this.z + 1]);
            if (this.z == 1)
                if (board2D[(this.z + 1) * 8 + this.x][1] == ' ' && board2D[(this.z + 2) * 8 + this.x][1] == ' ') moves.push([this.x, this.z + 2]);
        }
        else {
            if (board2D[(this.z - 1) * 8 + this.x][1] == ' ') moves.push([this.x, this.z - 1]);
            if (board2D[(this.z - 1) * 8 + this.x + 1][1] == 'w' && this.x < 7) moves.push([this.x + 1, this.z - 1]);
            if (board2D[(this.z - 1) * 8 + this.x - 1][1] == 'w' && this.x > 0) moves.push([this.x - 1, this.z - 1]);
            if (this.z == 6)
                if (board2D[(this.z - 1) * 8 + this.x][1] == ' ' && board2D[(this.z - 2) * 8 + this.x][1] == ' ') moves.push([this.x, this.z - 2]);
        }
        return moves;
    }
}
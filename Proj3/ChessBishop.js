class ChessBishop extends ChessPiece {
    constructor(scene, id, white, x, y, z, obj) {
        super(scene, id, white, x, y, z, obj);
    }

    getPossibleMoves(board2D) {
        //bispo está no [2, y, 0]
        var moves = [];
        var temp_x = this.x;
        var temp_z = this.z;
        while (temp_x < 7 && temp_z < 7) {
            temp_x++;
            temp_z++;
            if (board2D[temp_z * 8 + temp_x] == '  ') {
                moves.push([temp_x, temp_z]);
            } else {
                if ((this.white && board2D[temp_z * 8 + temp_x][1] == 'b') || (!this.white && board2D[temp_z * 8 + temp_x][1] == 'w')) {
                    moves.push([temp_x, temp_z]);
                }
                break;
            }
        }
        temp_x = this.x;
        temp_z = this.z;
        while (temp_x < 7 && temp_z > 0) {
            temp_x++;
            temp_z--;

            if (board2D[temp_z * 8 + temp_x] == '  ') {
                moves.push([temp_x, temp_z]);
            } else {
                if ((this.white && board2D[temp_z * 8 + temp_x][1] == 'b') || (!this.white && board2D[temp_z * 8 + temp_x][1] == 'w')) {
                    moves.push([temp_x, temp_z]);
                }
                break;
            }
        }
        temp_x = this.x;
        temp_z = this.z;
        while (temp_x > 0 && temp_z < 7) {
            temp_x--;
            temp_z++;

            if (board2D[temp_z * 8 + temp_x] == '  ') {
                moves.push([temp_x, temp_z]);
            } else {
                if ((this.white && board2D[temp_z * 8 + temp_x][1] == 'b') || (!this.white && board2D[temp_z * 8 + temp_x][1] == 'w')) {
                    moves.push([temp_x, temp_z]);
                }
                break;
            }
        }
        temp_x = this.x;
        temp_z = this.z;
        while (temp_x > 0 && temp_z > 0) {
            temp_x--;
            temp_z--;

            if (board2D[temp_z * 8 + temp_x] == '  ') {
                moves.push([temp_x, temp_z]);
            } else {
                if ((this.white && board2D[temp_z * 8 + temp_x][1] == 'b') || (!this.white && board2D[temp_z * 8 + temp_x][1] == 'w')) {
                    moves.push([temp_x, temp_z]);
                }
                break;
            }
        }
        return moves;
    }
}
class ChessRook extends ChessPiece {
    constructor(scene, id, white, x, y, z, obj) {
        super(scene, id, white, x, y, z, obj);
    }

    getPossibleMoves(){
        var moves = [];
        var temp_x = this.x;
        var temp_z = this.z;

        while(temp_z > 0){
            temp_z--;
            moves.push([temp_x, temp_z]);
        }
        temp_z = z;
        while(temp_z < 7){
            temp_z++;
            moves.push([temp_x, temp_z]);
        }
        temp_z = z;
        while(temp_x > 0){
            temp_x--;
            moves.push([temp_x, temp_z]);
        }
        temp_x = x;
        while(temp_x < 7){
            temp_x++;
            moves.push([temp_x, temp_z]);
        }

        return moves;
    }
}
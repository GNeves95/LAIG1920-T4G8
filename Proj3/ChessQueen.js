class ChessQueen extends ChessPiece {
    constructor(scene, id, white, x, y, z, obj) {
        super(scene, id, white, x, y, z, obj);
    }

    getPossibleMoves(){
        moves = [];
        var temp_x = x;
        var temp_z = z;

        //Bishop
         moves = [];
        var temp_x = x;
        var temp_z = z;
        while(temp_x < 7 && temp_z < 7){
            temp_x++;
            temp_z++;
            moves.push[temp_x, temp_z];
        }
        temp_x = x;
        temp_z = z;
        while(temp_x < 7 && temp_z > 0){
            temp_x++;
            temp_z--;
            moves.push[temp_x, temp_z];
            }
        temp_x = x;
        temp_z = z;
        while(temp_x > 0 && temp_z < 7){
            temp_x--;
            temp_z++;
            moves.push[temp_x, temp_z];
        }
        temp_x = x;
        temp_z = z;
        while(temp_x > 0 && temp_z > 0){
            temp_x--;
            temp_z--;
            moves.push[temp_x, temp_z];
        }

        //Rook
        var temp_x = x;
        var temp_z = z;

        while(temp_z > 0){
            temp_z--;
            moves.push[temp_x, temp_z];
        }
        temp_z = z;
        while(temp_z < 7){
            temp_z++;
            moves.push[temp_x, temp_z];
        }
        temp_z = z;
        while(temp_x > 0){
            temp_x--;
            moves.push[temp_x, temp_z];
        }
        temp_x = x;
        while(temp_x < 7){
            temp_x++;
            moves.push[temp_x, temp_z];
        }

    }

}